use std::task::{Context, Poll};
use actix_service::{Service, Transform};
use actix_web::dev::{ServiceRequest, ServiceResponse};
use actix_web::{web, Error, http, HttpResponse};
use futures::future::{Either, ok, Ready, IntoStream};
use crate::fittler::visit_global_variable::VISIT_PATH;
use std::ops::Deref;
use crate::blog::handler::blog_handler::{BlogHandler, BlogHandlerTrait};
use crate::config::alias::ConnectionPool;
use crate::model::config::Config;
use chrono::{Local/*, NaiveDateTime*/};
use log::{/*error, */info/*, warn*/};
use futures::{StreamExt, FutureExt};


pub struct Views;

impl<S, B> Transform<S> for Views
    where
        S: Service<Request=ServiceRequest, Response=ServiceResponse<B>, Error=Error>,
        S::Future: 'static,
{
    type Request = ServiceRequest;
    type Response = ServiceResponse<B>;
    type Error = Error;
    type InitError = ();
    type Transform = ViewsMiddleware<S>;
    type Future = Ready<Result<Self::Transform, Self::InitError>>;

    fn new_transform(&self, service: S) -> Self::Future {
        ok(ViewsMiddleware { service })
    }
}

pub struct ViewsMiddleware<S> {
    service: S,
}


impl<S, B> Service for ViewsMiddleware<S>
    where
        S: Service<Request=ServiceRequest, Response=ServiceResponse<B>, Error=Error>,
        S::Future: 'static,
{
    type Request = ServiceRequest;
    type Response = ServiceResponse<B>;
    type Error = Error;
    type Future = Either<S::Future, Ready<Result<Self::Response, Self::Error>>>;

    fn poll_ready(&mut self, cx: &mut Context) -> Poll<Result<(), Self::Error>> {
        self.service.poll_ready(cx)
    }

    fn call(&mut self, mut req: ServiceRequest) -> Self::Future {
        info!("ViewsMiddleware.........");

        let url = req.uri().path();
        let pool = req.app_data::<ConnectionPool>().expect("过滤器Views中获取数据库连接池失败！");
        let mut vec = VISIT_PATH.clone();


        futures::executor::block_on(async {
            use futures::future::FutureExt;
            use futures::stream::{self, StreamExt};
            use futures::future;

            let fetches = futures::stream::iter(
                vec.into_iter().filter(|visit_path| url.ends_with(visit_path)).map(|visit_path| {
                    async move {
                        let blog_handler = BlogHandler(pool.clone());
                        info!("访问的url:{}", visit_path);
                        let config = Config {
                            id: 0,
                            url: visit_path.to_string(),
                            visit_times: 1,
                            updated_at: Local::now().naive_local(),
                        };

                        blog_handler.blog_visit(config).await;
                        ()
                    }
                })
            ).buffer_unordered(2).collect::<Vec<()>>();
            info!("Waiting...");
            fetches.await;
        });


        return Either::Left(self.service.call(req));
    }
}