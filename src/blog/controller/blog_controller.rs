//use json::JsonValue;
use actix_identity::Identity;
use actix_multipart::Multipart;
use actix_web::{Error, get, HttpRequest, HttpResponse, Responder, Result, web::{self, /*Data,*/ Json, Path}};
use async_std::prelude::*;
use futures::TryStreamExt;
//use actix_web::http::{StatusCode};
use log::{error, info/*, warn*/};
use serde_json::json;
use uuid::Uuid;

use crate::auth::handler::auth_handler::{AuthHandler, IUser};
use crate::blog::handler::blog_handler::{BlogHandler, BlogHandlerTrait};
use crate::blog::req::blog_req::{BlogDeleteReq, BlogEidtReq, BlogListReq, GetBlogMkDownReq, Info};
use crate::config::alias::ConnectionPool;
use crate::model::blog_item::BlogItem;
use crate::model::user::{SigninUser, SignupUser};
use crate::utils::claims::{/*Claims,*/ UserToken};
use crate::utils::claims;
use crate::utils::result_msg::ResultMsg;

//use sqlx::mysql::{MySqlPool};

/*use serde_json::json;*/
//注册
pub async fn blog_signup(signup_user: Json<SignupUser>, pool: ConnectionPool) -> impl Responder {
    let msg = SignupUser {
        username: signup_user.username.clone(),
        email: signup_user.email.clone(),
        password: signup_user.password.clone(),
        confirm_password: signup_user.confirm_password.clone(),
    };

    let auth_handler = AuthHandler(pool);
    match auth_handler.user_add(msg).await {
        Ok(res) => {
            info!(" res: {}", res);
            ResultMsg::new().msg("ok").data(res)
        }
        Err(e) => {
            error!(" error: {:?}", e);
            ResultMsg::new().code(400).msg(e.to_string())
        }
    }
}

//登录
pub async fn blog_signin(id: Identity, signin_user: Json<SigninUser>, pool: ConnectionPool) -> impl Responder {
    let form = SigninUser {
        username: signin_user.username.clone(),
        password: signin_user.password.clone(),

    };


    // use chrono::{DateTime, Duration, Utc};
    // use jsonwebtoken::{encode, EncodingKey, Header};
    let auth_handler = AuthHandler(pool);
    match auth_handler.user_query(&form.username).await {
        Ok(user) => {
            info!("ok: {:?}", user);
            let token = UserToken {
                username: user.clone().user_name.unwrap()
            };


            let token = claims::create_token(&token);

            match token {
                Ok(t) => {
                    println!("token:{}", t);
                    id.remember(t.to_owned());
                    ResultMsg::new().msg("ok").data(user)
                }
                Err(e) => {
                    error!(" error: {:?}", e);
                    ResultMsg::new().code(400).msg(e.to_string())
                }
            }
        }
        Err(e) => {
            error!(" error: {:?}", e);
            ResultMsg::new().code(400).msg(e.to_string())
        }
    }
}


//博客保存
pub async fn blog_save(id: Identity, blog_item: Json<BlogItem>, pool: ConnectionPool) -> impl Responder {
    let data = BlogItem {
        blogid: String::from(""),
        userid: blog_item.userid.clone(),
        content: blog_item.content.clone(),
        content_html: blog_item.content_html.clone(),
        title: blog_item.title.clone(),
        blog_moudle: blog_item.blog_moudle.clone(),
    };


    let mut login_user_name = String::from("");
    if let Some(token) = id.identity() {
        info!("token{}", &token);

        match claims::decode_token(&token) {
            Ok(token_data) => {
                info!("token_data");
                login_user_name.push_str(token_data.trim())
            }

            Err(e) => {
                info!("Unauthorized:{:?}", e);
                login_user_name.push_str("")
            }
        }
    } else {
        info!("error{:?}", id.identity());
    }
    if login_user_name.is_empty() {
        return ResultMsg::new().code(400).msg("当前用户未登录,请重新登录!");
    }


    let blog_handler = BlogHandler(pool);
    match blog_handler.blog_save(data).await {
        Ok(res) => {
            info!("ok: {:?}", res);
            ResultMsg::new().msg("ok").data(res)
        }
        Err(e) => {
            error!(" error: {:?}", e);
            ResultMsg::new().code(400).msg(e.to_string())
        }
    }
}


//博客列表
pub async fn public_blog_list_content(id: Identity, blog_list_req: Json<BlogListReq>, pool: ConnectionPool) -> impl Responder {
    // info! {"identity{:?}", id.identity()};



    if let Some(token) = id.identity() {
        info!("token{}", &token);

        match claims::decode_token(&token) {
            Ok(token_data) => {
                info!("token_data:{:?}", token_data);
            }

            Err(e) => {
                info!("Unauthorized:{:?}", e);
            }
        }
    } else {
        info!("error{:?}", id.identity());
    }


    let data = BlogListReq {
        page: blog_list_req.page.clone(),
        blog_moudle: blog_list_req.blog_moudle.clone(),
    };

    let blog_handler = BlogHandler(pool);

    match blog_handler.blog_page_list(data).await {
        Ok(res) => {
            info!("ok: {:?}", res);
            ResultMsg::new().msg("ok").data(res)
        }
        Err(e) => {
            error!(" error: {:?}", e);
            ResultMsg::new().code(400).msg(e.to_string())
        }
    }
}

pub async fn get_edit_mkdown((item, pool): (Json<GetBlogMkDownReq>, ConnectionPool)) -> impl Responder {
    if item.bid.is_empty() {
        //return   ResultMsg::new().code(400).data(json!({"success": "false","content": ""}))
        return ResultMsg::new().code(400).msg("bid不能为空!");
    }


    let blog_handler = BlogHandler(pool);

    match blog_handler.get_edit_mkdown(item.into_inner()).await {
        Ok(t) => {
            info!("ok: {:?}", t);
            ResultMsg::new().msg("ok").data(t)
        }
        Err(e) => {
            error!(" error: {:?}", e);
            ResultMsg::new().code(400).msg(e.to_string())
        }
    }
}

pub async fn get_blog_mkdown((info, item, _req): (Path<(String)>, Json<GetBlogMkDownReq>, HttpRequest), pool: ConnectionPool) -> impl Responder {
    let module_name = info.into_inner();
    info!("module_name:{:?}", module_name);

    if item.bid.is_empty() {
        //return   ResultMsg::new().code(400).data(json!({"success": "false","content": ""}))
        return ResultMsg::new().code(400).msg("bid不能为空!");
    }


    let blog_handler = BlogHandler(pool);

    match blog_handler.get_blog_mkdown(item.into_inner()).await {
        Ok(t) => {
            info!("ok: {:?}", t);
            ResultMsg::new().msg("ok").data(t)
        }
        Err(e) => {
            error!(" error: {:?}", e);
            ResultMsg::new().code(400).msg(e.to_string())
        }
    }
}


pub async fn blog_edit_save((blog_eidt_req, pool): (Json<BlogEidtReq>, ConnectionPool)) -> impl Responder {
    let data = BlogEidtReq {
        id: blog_eidt_req.id.clone(),
        blogid: blog_eidt_req.blogid.clone(),
        userid: blog_eidt_req.userid.clone(),
        content: blog_eidt_req.content.clone(),
        content_html: blog_eidt_req.content_html.clone(),
        title: blog_eidt_req.title.clone(),
        blog_moudle: blog_eidt_req.blog_moudle.clone(),
    };
    let blog_handler = BlogHandler(pool);

    match blog_handler.blog_edit_save(data).await {
        Ok(r) => {
            info!("ok: {:?}", r);
            ResultMsg::new().msg(r).data(())
        }
        Err(e) => {
            error!(" error: {:?}", e);
            ResultMsg::new().code(400).msg(e.to_string())
        }
    }
}


pub async fn blog_delete((id, blog_delete_req, pool): (Identity, Json<BlogDeleteReq>, ConnectionPool)) -> impl Responder {
    let mut flag = String::from("");

    if let Some(token) = id.identity() {
        info!("token{}", &token);

        match claims::decode_token(&token) {
            Ok(token_data) =>
                {
                    info!("token_data");
                    flag.push_str(token_data.trim())
                }

            Err(e) => {
                info!("Unauthorized:{:?}", e);
                flag.push_str("")
            }
        }
    } else {
        info!("error{:?}", id.identity());
    }

    if flag.is_empty() {
        return ResultMsg::new().code(400).msg("token已过期,请重新登录!");
    } else {
        let blog_handler = BlogHandler(pool);

        match blog_handler.blog_delete(blog_delete_req.into_inner()).await {
            Ok(t) => {
                info!("ok: {:?}", t);
                ResultMsg::new().msg(t).data(())
            }
            Err(e) => {
                error!(" error: {:?}", e);
                ResultMsg::new().code(400).msg(e.to_string())
            }
        }
    }
}


pub async fn save_file(mut payload: Multipart, web::Query(info): web::Query<Info>) -> Result<HttpResponse, Error> {
    let _guid = &info.guid;
    let my_uuid = Uuid::new_v4();
    let my_uuid = my_uuid.to_string().replace("-", "").to_uppercase();
    let userid = String::from("admin");
    let file_type: String = String::from("png");
    let mut file_path = String::from("static/");
    file_path.push_str(&userid);
    file_path.push_str("/images");
    file_path.push_str("/");
    file_path.push_str(&my_uuid);
    file_path.push_str(".");
    file_path.push_str(&file_type);
    info!("sss{:?}", &file_path);

    while let Ok(Some(mut field)) = payload.try_next().await {
        let mut f = async_std::fs::File::create(&file_path).await?;

        // Field in turn is stream of *Bytes* object
        while let Some(chunk) = field.next().await {
            let data = chunk.unwrap();
            f.write_all(&data).await?;
        }
    }
    Ok(HttpResponse::Ok().json(json!({"success": 1,"message": "上传成功", "url":file_path})))
}

