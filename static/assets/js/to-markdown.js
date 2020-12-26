!function(e) {
    if ("object" == typeof exports && "undefined" != typeof module)
        module.exports = e();
    else if ("function" == typeof define && define.amd)
        define([], e);
    else {
        var n;
        n = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this,
            n.toMarkdown = e()
    }
}(function() {
    return function e(n, t, r) {
        function o(a, c) {
            if (!t[a]) {
                if (!n[a]) {
                    var l = "function" == typeof require && require;
                    if (!c && l)
                        return l(a, !0);
                    if (i)
                        return i(a, !0);
                    var u = new Error("Cannot find module '" + a + "'");
                    throw u.code = "MODULE_NOT_FOUND",
                        u
                }
                var f = t[a] = {
                    exports: {}
                };
                n[a][0].call(f.exports, function(e) {
                    var t = n[a][1][e];
                    return o(t ? t : e)
                }, f, f.exports, e, n, t, r)
            }
            return t[a].exports
        }
        for (var i = "function" == typeof require && require, a = 0; a < r.length; a++)
            o(r[a]);
        return o
    }({
        1: [function(e, n, t) {
            "use strict";
            function r(e) {
                return b.indexOf(e.nodeName.toLowerCase()) !== -1
            }
            function o(e) {
                return y.indexOf(e.nodeName.toLowerCase()) !== -1
            }
            function i(e) {
                var n = (new v).parseFromString(e, "text/html");
                return N(n.documentElement, r),
                    n
            }
            function a(e) {
                for (var n, t, r, o = [e], i = []; o.length > 0; )
                    for (n = o.shift(),
                             i.push(n),
                             t = n.childNodes,
                             r = 0; r < t.length; r++)
                        1 === t[r].nodeType && o.push(t[r]);
                return i.shift(),
                    i
            }
            function c(e) {
                for (var n = "", t = 0; t < e.childNodes.length; t++)
                    if (1 === e.childNodes[t].nodeType)
                        n += e.childNodes[t]._replacement;
                    else {
                        if (3 !== e.childNodes[t].nodeType)
                            continue;
                        n += e.childNodes[t].data
                    }
                return n
            }
            function l(e, n) {
                return e.cloneNode(!1).outerHTML.replace("><", ">" + n + "<")
            }
            function u(e, n) {
                if ("string" == typeof n)
                    return n === e.nodeName.toLowerCase();
                if (Array.isArray(n))
                    return n.indexOf(e.nodeName.toLowerCase()) !== -1;
                if ("function" == typeof n)
                    return n.call(p, e);
                throw new TypeError("`filter` needs to be a string, array, or function")
            }
            function f(e, n) {
                var t, o, i;
                return "left" === e ? (t = n.previousSibling,
                    o = / $/) : (t = n.nextSibling,
                    o = /^ /),
                t && (3 === t.nodeType ? i = o.test(t.nodeValue) : 1 !== t.nodeType || r(t) || (i = o.test(t.textContent))),
                    i
            }
            function d(e, n) {
                var t = ""
                    , o = "";
                if (!r(e)) {
                    var i = /^[ \r\n\t]/.test(n)
                        , a = /[ \r\n\t]$/.test(n);
                    i && !f("left", e) && (t = " "),
                    a && !f("right", e) && (o = " ")
                }
                return {
                    leading: t,
                    trailing: o
                }
            }
            function s(e) {
                var n, t = c(e);
                if (!o(e) && !/A|TH|TD/.test(e.nodeName) && /^\s*$/i.test(t))
                    return void (e._replacement = "");
                for (var r = 0; r < m.length; r++) {
                    var i = m[r];
                    if (u(e, i.filter)) {
                        if ("function" != typeof i.replacement)
                            throw new TypeError("`replacement` needs to be a function that returns a string");
                        var a = d(e, t);
                        (a.leading || a.trailing) && (t = t.trim()),
                            n = a.leading + i.replacement.call(p, t, e) + a.trailing;
                        break
                    }
                }
                e._replacement = n
            }
            var p, m, h = e("./lib/md-converters"), g = e("./lib/gfm-converters"), v = e("./lib/html-parser"), N = e("collapse-whitespace"), b = ["address", "article", "aside", "audio", "blockquote", "body", "canvas", "center", "dd", "dir", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "html", "isindex", "li", "main", "menu", "nav", "noframes", "noscript", "ol", "output", "p", "pre", "section", "table", "tbody", "td", "tfoot", "th", "thead", "tr", "ul"], y = ["area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"];
            p = function(e, n) {
                if (n = n || {},
                "string" != typeof e)
                    throw new TypeError(e + " is not a string");
                if ("" === e)
                    return "";
                e = e.replace(/(\d+)\. /g, "$1\\. ");
                var t, r = i(e).body, o = a(r);
                m = h.slice(0),
                n.gfm && (m = g.concat(m)),
                n.converters && (m = n.converters.concat(m));
                for (var l = o.length - 1; l >= 0; l--)
                    s(o[l]);
                return t = c(r),
                    t.replace(/^[\t\r\n]+|[\t\r\n\s]+$/g, "").replace(/\n\s+\n/g, "\n\n").replace(/\n{3,}/g, "\n\n")
            }
                ,
                p.isBlock = r,
                p.isVoid = o,
                p.outer = l,
                n.exports = p
        }
            , {
                "./lib/gfm-converters": 2,
                "./lib/html-parser": 3,
                "./lib/md-converters": 4,
                "collapse-whitespace": 7
            }],
        2: [function(e, n, t) {
            "use strict";
            function r(e, n) {
                var t = Array.prototype.indexOf.call(n.parentNode.childNodes, n)
                    , r = " ";
                return 0 === t && (r = "| "),
                r + e + " |"
            }
            var o = /highlight highlight-(\S+)/;
            n.exports = [{
                filter: "br",
                replacement: function() {
                    return "\n"
                }
            }, {
                filter: ["del", "s", "strike"],
                replacement: function(e) {
                    return "~~" + e + "~~"
                }
            }, {
                filter: function(e) {
                    return "checkbox" === e.type && "LI" === e.parentNode.nodeName
                },
                replacement: function(e, n) {
                    return (n.checked ? "[x]" : "[ ]") + " "
                }
            }, {
                filter: ["th", "td"],
                replacement: function(e, n) {
                    return r(e, n)
                }
            }, {
                filter: "tr",
                replacement: function(e, n) {
                    var t = ""
                        , o = {
                        left: ":--",
                        right: "--:",
                        center: ":-:"
                    };
                    if ("THEAD" === n.parentNode.nodeName)
                        for (var i = 0; i < n.childNodes.length; i++) {
                            var a = n.childNodes[i].attributes.align
                                , c = "---";
                            a && (c = o[a.value] || c),
                                t += r(c, n.childNodes[i])
                        }
                    return "\n" + e + (t ? "\n" + t : "")
                }
            }, {
                filter: "table",
                replacement: function(e) {
                    return "\n\n" + e + "\n\n"
                }
            }, {
                filter: ["thead", "tbody", "tfoot"],
                replacement: function(e) {
                    return e
                }
            }, {
                filter: function(e) {
                    return "PRE" === e.nodeName && e.firstChild && "CODE" === e.firstChild.nodeName
                },
                replacement: function(e, n) {
                    return "\n\n```\n" + n.firstChild.textContent + "\n```\n\n"
                }
            }, {
                filter: function(e) {
                    return "PRE" === e.nodeName && "DIV" === e.parentNode.nodeName && o.test(e.parentNode.className)
                },
                replacement: function(e, n) {
                    var t = n.parentNode.className.match(o)[1];
                    return "\n\n```" + t + "\n" + n.textContent + "\n```\n\n"
                }
            }, {
                filter: function(e) {
                    return "DIV" === e.nodeName && o.test(e.className)
                },
                replacement: function(e) {
                    return "\n\n" + e + "\n\n"
                }
            }]
        }
            , {}],
        3: [function(e, n, t) {
            function r() {
                var e = a.DOMParser
                    , n = !1;
                try {
                    (new e).parseFromString("", "text/html") && (n = !0)
                } catch (t) {}
                return n
            }
            function o() {
                var n = function() {};
                if ("undefined" == typeof document) {
                    var t = e("jsdom");
                    n.prototype.parseFromString = function(e) {
                        return t.jsdom(e, {
                            features: {
                                FetchExternalResources: [],
                                ProcessExternalResources: !1
                            }
                        })
                    }
                } else
                    i() ? n.prototype.parseFromString = function(e) {
                            var n = new window.ActiveXObject("htmlfile");
                            return n.designMode = "on",
                                n.open(),
                                n.write(e),
                                n.close(),
                                n
                        }
                        : n.prototype.parseFromString = function(e) {
                            var n = document.implementation.createHTMLDocument("");
                            return n.open(),
                                n.write(e),
                                n.close(),
                                n
                        }
                    ;
                return n
            }
            function i() {
                var e = !1;
                try {
                    document.implementation.createHTMLDocument("").open()
                } catch (n) {
                    window.ActiveXObject && (e = !0)
                }
                return e
            }
            var a = "undefined" != typeof window ? window : this;
            n.exports = r() ? a.DOMParser : o()
        }
            , {
                jsdom: 6
            }],
        4: [function(e, n, t) {
            "use strict";
            n.exports = [{
                filter: "p",
                replacement: function(e) {
                    return "\n\n" + e + "\n\n"
                }
            }, {
                filter: "br",
                replacement: function() {
                    return "  \n"
                }
            }, {
                filter: ["h1", "h2", "h3", "h4", "h5", "h6"],
                replacement: function(e, n) {
                    for (var t = n.nodeName.charAt(1), r = "", o = 0; o < t; o++)
                        r += "#";
                    return "\n\n" + r + " " + e + "\n\n"
                }
            }, {
                filter: "hr",
                replacement: function() {
                    return "\n\n* * *\n\n"
                }
            }, {
                filter: ["em", "i"],
                replacement: function(e) {
                    return "_" + e + "_"
                }
            }, {
                filter: ["strong", "b"],
                replacement: function(e) {
                    return "**" + e + "**"
                }
            }, {
                filter: function(e) {
                    var n = e.previousSibling || e.nextSibling
                        , t = "PRE" === e.parentNode.nodeName && !n;
                    return "CODE" === e.nodeName && !t
                },
                replacement: function(e) {
                    return "`" + e + "`"
                }
            }, {
                filter: function(e) {
                    return "A" === e.nodeName && e.getAttribute("href")
                },
                replacement: function(e, n) {
                    var t = n.title ? ' "' + n.title + '"' : "";
                    return "[" + e + "](" + n.getAttribute("href") + t + ")"
                }
            }, {
                filter: "img",
                replacement: function(e, n) {
                    var t = n.alt || ""
                        , r = n.getAttribute("src") || ""
                        , o = n.title || ""
                        , i = o ? ' "' + o + '"' : "";
                    return r ? "![" + t + "](" + r + i + ")" : ""
                }
            }, {
                filter: function(e) {
                    return "PRE" === e.nodeName && "CODE" === e.firstChild.nodeName
                },
                replacement: function(e, n) {
                    return "\n\n    " + n.firstChild.textContent.replace(/\n/g, "\n    ") + "\n\n"
                }
            }, {
                filter: "blockquote",
                replacement: function(e) {
                    return e = e.trim(),
                        e = e.replace(/\n{3,}/g, "\n\n"),
                        e = e.replace(/^/gm, "> "),
                    "\n\n" + e + "\n\n"
                }
            }, {
                filter: "li",
                replacement: function(e, n) {
                    e = e.replace(/^\s+/, "").replace(/\n/gm, "\n    ");
                    var t = "*   "
                        , r = n.parentNode
                        , o = Array.prototype.indexOf.call(r.children, n) + 1;
                    return t = /ol/i.test(r.nodeName) ? o + ".  " : "*   ",
                    t + e
                }
            }, {
                filter: ["ul", "ol"],
                replacement: function(e, n) {
                    for (var t = [], r = 0; r < n.childNodes.length; r++)
                        t.push(n.childNodes[r]._replacement);
                    return /li/i.test(n.parentNode.nodeName) ? "\n" + t.join("\n") : "\n\n" + t.join("\n") + "\n\n"
                }
            }, {
                filter: function(e) {
                    return this.isBlock(e)
                },
                replacement: function(e, n) {
                    return "\n\n" + this.outer(n, e) + "\n\n"
                }
            }, {
                filter: function() {
                    return !0
                },
                replacement: function(e, n) {
                    return this.outer(n, e)
                }
            }]
        }
            , {}],
        5: [function(e, n, t) {
            n.exports = ["address", "article", "aside", "audio", "blockquote", "canvas", "dd", "div", "dl", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "main", "nav", "noscript", "ol", "output", "p", "pre", "section", "table", "tfoot", "ul", "video"]
        }
            , {}],
        6: [function(e, n, t) {}
            , {}],
        7: [function(e, n, t) {
            "use strict";
            function r(e) {
                return !(!e || !u[e.nodeName])
            }
            function o(e) {
                return !(!e || !l[e.nodeName])
            }
            function i(e, n) {
                if (e.firstChild && "PRE" !== e.nodeName) {
                    "function" != typeof n && (n = r);
                    for (var t = null, i = !1, l = null, u = c(l, e); u !== e; ) {
                        if (3 === u.nodeType) {
                            var f = u.data.replace(/[ \r\n\t]+/g, " ");
                            if (t && !/ $/.test(t.data) || i || " " !== f[0] || (f = f.substr(1)),
                                !f) {
                                u = a(u);
                                continue
                            }
                            u.data = f,
                                t = u
                        } else {
                            if (1 !== u.nodeType) {
                                u = a(u);
                                continue
                            }
                            n(u) || "BR" === u.nodeName ? (t && (t.data = t.data.replace(/ $/, "")),
                                t = null,
                                i = !1) : o(u) && (t = null,
                                i = !0)
                        }
                        var d = c(l, u);
                        l = u,
                            u = d
                    }
                    t && (t.data = t.data.replace(/ $/, ""),
                    t.data || a(t))
                }
            }
            function a(e) {
                var n = e.nextSibling || e.parentNode;
                return e.parentNode.removeChild(e),
                    n
            }
            function c(e, n) {
                return e && e.parentNode === n || "PRE" === n.nodeName ? n.nextSibling || n.parentNode : n.firstChild || n.nextSibling || n.parentNode
            }
            var l = e("void-elements");
            Object.keys(l).forEach(function(e) {
                l[e.toUpperCase()] = 1
            });
            var u = {};
            e("block-elements").forEach(function(e) {
                u[e.toUpperCase()] = 1
            }),
                n.exports = i
        }
            , {
                "block-elements": 5,
                "void-elements": 8
            }],
        8: [function(e, n, t) {
            n.exports = {
                area: !0,
                base: !0,
                br: !0,
                col: !0,
                embed: !0,
                hr: !0,
                img: !0,
                input: !0,
                keygen: !0,
                link: !0,
                menuitem: !0,
                meta: !0,
                param: !0,
                source: !0,
                track: !0,
                wbr: !0
            }
        }
            , {}]
    }, {}, [1])(1)
});
