!function(t, e) {
    "function" == typeof define && define.amd ? define(["tether"], e) : "object" == typeof exports ? module.exports = e(require("tether")) : t.Shepherd = e(t.Tether)
}(this, function(t) {
    "use strict";
    function e(t, e) {
        if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function")
    }
    function n(t, e) {
        if ("function" != typeof e && null !== e)
            throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    function i(t) {
        return "undefined" == typeof t
    }
    function r(t) {
        return t && t.constructor === Array
    }
    function o(t) {
        return t && t.constructor === Object
    }
    function s(t) {
        return "object" == typeof t
    }
    function h(t) {
        var e = document.createElement("div");
        return e.innerHTML = t,
            e.children[0]
    }
    function c(t, e) {
        var n = void 0;
        return i(t.matches) ? i(t.matchesSelector) ? i(t.msMatchesSelector) ? i(t.webkitMatchesSelector) ? i(t.mozMatchesSelector) ? i(t.oMatchesSelector) || (n = t.oMatchesSelector) : n = t.mozMatchesSelector : n = t.webkitMatchesSelector : n = t.msMatchesSelector : n = t.matchesSelector : n = t.matches,
            n.call(t, e)
    }
    function l(t) {
        if (s(t))
            return t.hasOwnProperty("element") && t.hasOwnProperty("on") ? t : null;
        var e = S.exec(t);
        if (!e)
            return null;
        var n = e[2];
        return "[" === n[0] && (n = n.substring(1, n.length - 1)),
            {
                element: e[1],
                on: n
            }
    }
    function a(t, e) {
        if (null === t || i(t))
            return t;
        if (s(t))
            return t;
        for (var n = t.split(" "), r = {}, o = e.length - 1, h = n.length - 1; h >= 0; h--) {
            if (0 === o) {
                r[e[o]] = n.slice(0, h + 1).join(" ");
                break
            }
            r[e[o]] = n[h],
                o--
        }
        return r
    }
    var u = function() {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var i = e[n];
                i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                "value"in i && (i.writable = !0),
                    Object.defineProperty(t, i.key, i)
            }
        }
        return function(e, n, i) {
            return n && t(e.prototype, n),
            i && t(e, i),
                e
        }
    }()
        , d = function(t, e, n) {
        for (var i = !0; i; ) {
            var r = t
                , o = e
                , s = n;
            i = !1,
            null === r && (r = Function.prototype);
            var h = Object.getOwnPropertyDescriptor(r, o);
            if (void 0 !== h) {
                if ("value"in h)
                    return h.value;
                var c = h.get;
                if (void 0 === c)
                    return;
                return c.call(s)
            }
            var l = Object.getPrototypeOf(r);
            if (null === l)
                return;
            t = l,
                e = o,
                n = s,
                i = !0,
                h = l = void 0
        }
    }
        , p = t.Utils
        , f = p.Evented
        , v = p.addClass
        , m = p.extend
        , y = p.hasClass
        , g = p.removeClass
        , b = p.uniqueId
        , w = new f
        , k = {
        "top right": "bottom left",
        "top left": "bottom right",
        "top center": "bottom center",
        "middle right": "middle left",
        "middle left": "middle right",
        "middle center": "middle center",
        "bottom left": "top right",
        "bottom right": "top left",
        "bottom center": "top center",
        top: "bottom center",
        left: "middle right",
        right: "middle left",
        bottom: "top center",
        center: "middle center",
        middle: "middle center"
    }
        , S = /^(.+) (top|left|right|bottom|center|\[[a-z ]+\])$/
        , O = function(s) {
        function p(t, n) {
            return e(this, p),
                d(Object.getPrototypeOf(p.prototype), "constructor", this).call(this, t, n),
                this.tour = t,
                this.bindMethods(),
                this.setOptions(n),
                this
        }
        return n(p, s),
            u(p, [{
                key: "bindMethods",
                value: function() {
                    var t = this
                        , e = ["_show", "show", "hide", "isOpen", "cancel", "complete", "scrollTo", "destroy", "render"];
                    e.map(function(e) {
                        t[e] = t[e].bind(t)
                    })
                }
            }, {
                key: "setOptions",
                value: function() {
                    var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
                    this.options = t,
                        this.destroy(),
                        this.id = this.options.id || this.id || "step-" + b();
                    var e = this.options.when;
                    if (e)
                        for (var n in e)
                            if ({}.hasOwnProperty.call(e, n)) {
                                var s = e[n];
                                this.on(n, s, this)
                            }
                    var h = JSON.stringify(this.options.buttons)
                        , c = i(h) || "true" === h
                        , l = "{}" === h || "[]" === h || "null" === h || "false" === h
                        , a = !c && r(this.options.buttons)
                        , u = !c && o(this.options.buttons);
                    c ? this.options.buttons = [{
                        text: "Next",
                        action: this.tour.next,
                        classes: "btn"
                    }] : !l && u ? this.options.buttons = [this.options.buttons] : !l && a || (this.options.buttons = !1)
                }
            }, {
                key: "getTour",
                value: function() {
                    return this.tour
                }
            }, {
                key: "bindAdvance",
                value: function() {
                    var t = this
                        , e = a(this.options.advanceOn, ["selector", "event"])
                        , n = e.event
                        , r = e.selector
                        , o = function(e) {
                        t.isOpen() && (i(r) ? t.el && e.target === t.el && t.tour.next() : c(e.target, r) && t.tour.next())
                    };
                    document.body.addEventListener(n, o),
                        this.on("destroy", function() {
                            return document.body.removeEventListener(n, o)
                        })
                }
            }, {
                key: "getAttachTo",
                value: function() {
                    var t = l(this.options.attachTo) || {}
                        , e = m({}, t);
                    return "string" == typeof t.element && (e.element = document.querySelector(t.element),
                    e.element || console.error("The element for this Shepherd step was not found " + t.element)),
                        e
                }
            }, {
                key: "setupTether",
                value: function() {
                    if (i(t))
                        throw new Error("Using the attachment feature of Shepherd requires the Tether library");
                    var e = this.getAttachTo()
                        , n = k[e.on] || k.right;
                    i(e.element) && (e.element = "viewport",
                        n = "middle center");
                    var r = {
                        classPrefix: "shepherd",
                        element: this.el,
                        constraints: [{
                            to: "window",
                            pin: !0,
                            attachment: "together"
                        }],
                        target: e.element,
                        offset: e.offset || "0 0",
                        attachment: n
                    };
                    this.tether && this.tether.destroy(),
                        this.tether = new t(m(r, this.options.tetherOptions))
                }
            }, {
                key: "show",
                value: function() {
                    var t = this;
                    if (!i(this.options.beforeShowPromise)) {
                        var e = this.options.beforeShowPromise();
                        if (!i(e))
                            return e.then(function() {
                                return t._show()
                            })
                    }
                    this._show()
                }
            }, {
                key: "_show",
                value: function() {
                    var t = this;
                    this.trigger("before-show"),
                    this.el || this.render(),
                        v(this.el, "shepherd-open"),
                        document.body.setAttribute("data-shepherd-step", this.id),
                        this.setupTether(),
                    this.options.scrollTo && setTimeout(function() {
                        t.scrollTo()
                    }),
                        this.trigger("show")
                }
            }, {
                key: "hide",
                value: function() {
                    this.trigger("before-hide"),
                        g(this.el, "shepherd-open"),
                        document.body.removeAttribute("data-shepherd-step"),
                    this.tether && this.tether.destroy(),
                        this.tether = null,
                        this.trigger("hide")
                }
            }, {
                key: "isOpen",
                value: function() {
                    return this.el && y(this.el, "shepherd-open")
                }
            }, {
                key: "cancel",
                value: function() {
                    this.tour.cancel(),
                        this.trigger("cancel")
                }
            }, {
                key: "complete",
                value: function() {
                    this.tour.complete(),
                        this.trigger("complete")
                }
            }, {
                key: "scrollTo",
                value: function() {
                    var t = this.getAttachTo()
                        , e = t.element;
                    i(this.options.scrollToHandler) ? i(e) || e.scrollIntoView() : this.options.scrollToHandler(e)
                }
            }, {
                key: "destroy",
                value: function() {
                    !i(this.el) && this.el.parentNode && (this.el.parentNode.removeChild(this.el),
                        delete this.el),
                    this.tether && this.tether.destroy(),
                        this.tether = null,
                        this.trigger("destroy")
                }
            }, {
                key: "render",
                value: function() {
                    var t = this;
                    i(this.el) || this.destroy(),
                        this.el = h("<div class='shepherd-step " + (this.options.classes || "") + "' data-id='" + this.id + "' " + (this.options.idAttribute ? 'id="' + this.options.idAttribute + '"' : "") + "></div>");
                    var e = document.createElement("div");
                    e.className = "shepherd-content",
                        this.el.appendChild(e);
                    var n = document.createElement("header");
                    if (e.appendChild(n),
                    this.options.title && (n.innerHTML += "<h3 class='shepherd-title'>" + this.options.title + "</h3>",
                        this.el.className += " shepherd-has-title"),
                        this.options.showCancelLink) {
                        var r = h("<a href class='shepherd-cancel-link'>✕</a>");
                        n.appendChild(r),
                            this.el.className += " shepherd-has-cancel-link",
                            this.bindCancelLink(r)
                    }
                    i(this.options.text) || !function() {
                        var n = h("<div class='shepherd-text'></div>")
                            , i = t.options.text;
                        "function" == typeof i && (i = i.call(t, n)),
                            i instanceof HTMLElement ? n.appendChild(i) : ("string" == typeof i && (i = [i]),
                                i.map(function(t) {
                                    n.innerHTML += "<p>" + t + "</p>"
                                })),
                            e.appendChild(n)
                    }(),
                    this.options.buttons && !function() {
                        var n = document.createElement("footer")
                            , i = h("<ul class='shepherd-buttons'></ul>");
                        t.options.buttons.map(function(e) {
                            var n = h("<li><a class='shepherd-button " + (e.classes || "") + "'>" + e.text + "</a>");
                            i.appendChild(n),
                                t.bindButtonEvents(e, n.querySelector("a"))
                        }),
                            n.appendChild(i),
                            e.appendChild(n)
                    }(),
                        document.body.appendChild(this.el),
                        this.setupTether(),
                    this.options.advanceOn && this.bindAdvance()
                }
            }, {
                key: "bindCancelLink",
                value: function(t) {
                    var e = this;
                    t.addEventListener("click", function(t) {
                        t.preventDefault(),
                            e.cancel()
                    })
                }
            }, {
                key: "bindButtonEvents",
                value: function(t, e) {
                    var n = this;
                    t.events = t.events || {},
                    i(t.action) || (t.events.click = t.action);
                    for (var r in t.events)
                        if ({}.hasOwnProperty.call(t.events, r)) {
                            var o = t.events[r];
                            "string" == typeof o && !function() {
                                var t = o;
                                o = function() {
                                    return n.tour.show(t)
                                }
                            }(),
                                e.addEventListener(r, o)
                        }
                    this.on("destroy", function() {
                        for (var n in t.events)
                            if ({}.hasOwnProperty.call(t.events, n)) {
                                var i = t.events[n];
                                e.removeEventListener(n, i)
                            }
                    })
                }
            }]),
            p
    }(f)
        , T = function(t) {
        function r() {
            var t = this
                , n = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
            e(this, r),
                d(Object.getPrototypeOf(r.prototype), "constructor", this).call(this, n),
                this.bindMethods(),
                this.options = n,
                this.steps = this.options.steps || [];
            var i = ["complete", "cancel", "hide", "start", "show", "active", "inactive"];
            return i.map(function(e) {
                !function(e) {
                    t.on(e, function(n) {
                        n = n || {},
                            n.tour = t,
                            w.trigger(e, n)
                    })
                }(e)
            }),
                this
        }
        return n(r, t),
            u(r, [{
                key: "bindMethods",
                value: function() {
                    var t = this
                        , e = ["next", "back", "cancel", "complete", "hide"];
                    e.map(function(e) {
                        t[e] = t[e].bind(t)
                    })
                }
            }, {
                key: "addStep",
                value: function(t, e) {
                    return i(e) && (e = t),
                        e instanceof O ? e.tour = this : ("string" != typeof t && "number" != typeof t || (e.id = t.toString()),
                            e = m({}, this.options.defaults, e),
                            e = new O(this,e)),
                        this.steps.push(e),
                        this
                }
            }, {
                key: "removeStep",
                value: function(t) {
                    for (var e = this.getCurrentStep(), n = 0; n < this.steps.length; ++n) {
                        var i = this.steps[n];
                        if (i.id === t) {
                            i.isOpen() && i.hide(),
                                i.destroy(),
                                this.steps.splice(n, 1);
                            break
                        }
                    }
                    e && e.id === t && (this.currentStep = void 0,
                        this.steps.length ? this.show(0) : this.hide())
                }
            }, {
                key: "getById",
                value: function(t) {
                    for (var e = 0; e < this.steps.length; ++e) {
                        var n = this.steps[e];
                        if (n.id === t)
                            return n
                    }
                }
            }, {
                key: "getCurrentStep",
                value: function() {
                    return this.currentStep
                }
            }, {
                key: "next",
                value: function() {
                    var t = this.steps.indexOf(this.currentStep);
                    t === this.steps.length - 1 ? (this.hide(t),
                        this.trigger("complete"),
                        this.done()) : this.show(t + 1, !0)
                }
            }, {
                key: "back",
                value: function() {
                    var t = this.steps.indexOf(this.currentStep);
                    this.show(t - 1, !1)
                }
            }, {
                key: "cancel",
                value: function() {
                    this.currentStep && this.currentStep.hide(),
                        this.trigger("cancel"),
                        this.done()
                }
            }, {
                key: "complete",
                value: function() {
                    this.currentStep && this.currentStep.hide(),
                        this.trigger("complete"),
                        this.done()
                }
            }, {
                key: "hide",
                value: function() {
                    this.currentStep && this.currentStep.hide(),
                        this.trigger("hide"),
                        this.done()
                }
            }, {
                key: "done",
                value: function() {
                    w.activeTour = null,
                        g(document.body, "shepherd-active"),
                        this.trigger("inactive", {
                            tour: this
                        })
                }
            }, {
                key: "show",
                value: function() {
                    var t = arguments.length <= 0 || void 0 === arguments[0] ? 0 : arguments[0]
                        , e = arguments.length <= 1 || void 0 === arguments[1] || arguments[1];
                    this.currentStep ? this.currentStep.hide() : (v(document.body, "shepherd-active"),
                        this.trigger("active", {
                            tour: this
                        })),
                        w.activeTour = this;
                    var n = void 0;
                    if (n = "string" == typeof t ? this.getById(t) : this.steps[t])
                        if (i(n.options.showOn) || n.options.showOn())
                            this.trigger("show", {
                                step: n,
                                previous: this.currentStep
                            }),
                            this.currentStep && this.currentStep.hide(),
                                this.currentStep = n,
                                n.show();
                        else {
                            var r = this.steps.indexOf(n)
                                , o = e ? r + 1 : r - 1;
                            this.show(o, e)
                        }
                }
            }, {
                key: "start",
                value: function() {
                    this.trigger("start"),
                        this.currentStep = null,
                        this.next()
                }
            }]),
            r
    }(f);
    return m(w, {
        Tour: T,
        Step: O,
        Evented: f
    }),
        w
});
