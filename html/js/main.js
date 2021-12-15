!(function() {
    "use strict";
    var e = [],
        t = [],
        n = [],
        o = [{
                name: "ga",
                q: e,
                checker: setInterval(r(e), 500)
            },
            {
                name: "fb",
                q: t,
                checker: setInterval(r(t), 500)
            },
            {
                name: "linkedin",
                q: n,
                checker: setInterval(r(n), 500)
            },
        ];


    function r(e) {
        if (void 0 !== window.razorpayAnalytics && [e].length) {
            var t = [].concat(e);
            (arguments[0] = []), i(t);
        }
    }

    function p(e) {
        if (e instanceof NodeList) {
            for (var t = [], n = 0; n < e.length; n++) t.push(e[n]);
            return t;
        }
    }

    function m(e) {
        void 0 === e && (e = window.location.href);
        var t = {};
        return (
            e.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(e, n, o) {
                t[n] = o;
            }),
            t
        );
    }

    function R(e) {
        var t = null;

        return v(t);
    }
    var N = function() {
        (this.commonProperties = {}), (this.eventQueue = []);
    };

    (N.prototype.pushEvents = function(e) {

    });
    var X = new N(),
        q = ($(document.body).attr("id"), $(".main-container").attr("id"), m(), $("#topbar-container.banner-lake, #thirdwatch-top-banner.banner-lake")),
        D = q.children("a"),
        z = q.find("button a"),
        H = (q.find(".container .nomob .timer"), q.find(".container button"), q.find(".container .nomob .banner-text")),
        F = (q.find(".container .mob .banner-text"), q.find(".banner-content"), q.find(".placeholder-banner-container"), $("section.product-suite .container .wrapper-product > div:not(:first)")),
        O = function() {
            var e = {},
                t = {};
            F.each(function(n) {
                var o = $(this).find("a"),
                    i = $(this).find("a h3.npl-title"),
                    a = o.attr("id") || i.text(),
                    r = $(this)[0].closest("[data-fold-order]").getAttribute("data-fold-order");
                if (a) {
                    var s = $(this)[0],
                        c = "card" + (n + 1) + "_" + a.replace(" ", "_");
                    window.addEventListener(
                            "scroll",
                            u(function() {
                                return (function(t, n) {
                                    t && n && h(t) && !e[n] && (X.pushEvents({
                                        event_name: "website.display_newproducts",
                                        event_type: "success",
                                        properties: {
                                            ID: n
                                        }
                                    }), (e[n] = !0));
                                })(s, c);
                            }, 100)
                        ),
                        $(this).on("click", function() {
                            X.pushEvents({
                                event_name: "website.click_newproduct_card",
                                event_type: "initiated",
                                properties: {
                                    ID: c,
                                    title: i.text(),
                                    redirectUrl: o.attr("href"),
                                    redirect_url: "" + location.hostname + o.attr("href"),
                                    page_fold: r
                                },
                            });
                        }),
                        $(this).on("mouseenter", function() {
                            t[c] ||
                                (X.pushEvents({
                                        event_name: "website.hover_newproducts",
                                        event_type: "success",
                                        properties: {
                                            ID: c,
                                            title: i.text(),
                                            redirectUrl: o.attr("href"),
                                            redirect_url: "" + location.hostname + o.attr("href"),
                                            page_fold: r
                                        },
                                    }),
                                    (t[c] = !0));
                        });
                }
            });
        };


    var re = document.getElementsByTagName("title")[0].innerText,
        se = (window.razorpayAnalytics && razorpayAnalytics.utils.getCookie("midExists")) || !1;
    !(function() {
        var e = {
            nullHover: function(e) {
                n() || ((e = o(e)), this.log('User unintentionally hovered above "%s"', e), this.send({
                    action: "Hover - Nav Category (null)",
                    label: e
                }));
            },
            navItemClick: function(e) {
                n() || ((e = o(e)), this.log('User clicked on "%s" while it is open.', e), this.send({
                    action: "Click - Nav Category",
                    label: e
                }));
            },
            userStayedOnMenu: function(e, t, i) {
                n() || t < 0.5 || (i && ((e = o(e)), (i = o(i)), this.log('User stayed on "%s" section for %f seconds. (%s)', e, t, i), this.send({
                    action: "Hover - Nav Box (out direction)",
                    label: e + " - " + i,
                    value: t
                })));
            },
            userClicksOnMenu: function(e) {
                this.stopRecord(e, "inside"), (e = o(e)), this.log("User clicked a link in %s menu.", e), this.sendTagRecording("navigation_item_clicked");
            },
            calculateDirection: function(e, t) {
                var n = e.clientX,
                    o = e.clientY;
                return n <= t.left ? "left" : n >= t.right ? "right" : o <= t.top ? "top" : o >= t.bottom ? "bottom" : "inside";
            },
            _items: ["products", "develop", "resources"],
            _timings: {},
            _listeners: {},
            _entrySemaphore: {},
            enteredMenu: function(e) {
                this._entrySemaphore[e] = !0;
            },
            exitedMenu: function(e) {
                this._entrySemaphore[e] = !1;
            },
            didEnter: function(e) {
                return this._entrySemaphore[e] || !1;
            },
            startRecord: function(e) {
                if (!n() && !this.isRecording(e)) {
                    this.stopRecord(e), this.enteredMenu(e);
                    var t = this;
                    (this._timings[e] = 0),
                    (this._listeners[e] = setInterval(function() {
                        t._timings[e] += 0.5;
                    }, 500)),
                    this.sendTagRecording("navigation_category_hovered");
                }
            },
            isRecording: function(e) {
                return this._listeners[e] && this._timings[e] > 1;
            },
            stopRecord: function(e, t) {
                if (!n())
                    if (e && e.length) {
                        var o = this._listeners[e];
                        o && clearInterval(o);
                        var i = this._timings[e];
                        i && this.userStayedOnMenu(e, i, t), (this._listeners[e] = null), (this._timings[e] = null);
                    } else
                        this._items.forEach(function(e) {
                            return stopRecord(e);
                        });
            },
            log: function() {
                location.host.indexOf("localhost") > -1 && console.info.apply(console, arguments);
            },
            send: function(e) {
                window.rzpAnalytics && (this.log(e), window.rzpAnalytics({
                    eventCategory: e.category || "Website - Navigation",
                    eventAction: e.action || void 0,
                    eventLabel: e.label || void 0,
                    eventValue: e.value || void 0
                }));
            },
            sendTagRecording: function(e) {
                "function" == typeof window.hj && (window.hj("trigger", e), window.hj("tagRecording", [e]));
            },
        };

        function t(e) {
            if (
                ((this.nav = document.querySelector(e)),
                    this.nav &&
                    ((this.items = p(document.querySelectorAll(".nav-menu"))),
                        (this.list = document.querySelector(e + " ul")),
                        (this.line = document.querySelector(e + " .nav-line")),
                        (this.itemBounds = []),
                        (this.lineTransition = this.line ? this.line.style.transition : ""),
                        (this.lineAnimation = this.line ? this.line.style.animation : ""),
                        (this.mobileBackdrop = document.querySelector(".backdrop.mob")),
                        (this.hamMenu = document.querySelector("#ham-menu")),
                        (this.hadCursor = !1),
                        (this.classes = {
                            OPEN_CLASS: "opened",
                            ACTIVE_CLASS: "active",
                            INACTIVE_CLASS: "inactive",
                            MOB_OPEN_CLASS: "open-nav",
                            BUTTON_INPUT_CLASS: "active"
                        }),
                        window.MSInputMethodContext && document.documentMode && !n()))
            ) {
                var t = document.querySelector(".nav1 .sub"),
                    o = document.querySelector(".nav1 .column:nth-child(1)"),
                    i = document.querySelector(".nav1 .column:nth-child(2)"),
                    a = document.querySelector(".nav2 .sub"),
                    r = document.querySelector(".nav3 .sub");
                t && a && r && ((t.style.width = "1080px"), (a.style.width = "545px"), (r.style.width = "474px"), (o.style.width = i.style.width = "440px"));
            }
        }

        function n() {
            return window.innerWidth < 1024;
        }

        function o(e) {
            return e && e.length ? e.charAt(0).toUpperCase() + e.substr(1) : "";
        }

        function i(e, t) {
            return (" " + e.className + " ").indexOf(" " + t + " ") > -1;
        }

        function a(e, t) {
            e.classList ? e.classList.add(t) : i(e, t) || (e.className += " " + t);
        }

        function r(e, t) {
            if (e.classList) e.classList.remove(t);
            else if (i(e, t)) {
                var n = new RegExp("(\\s|^)" + t + "(\\s|$)");
                e.className = e.className.replace(n, " ");
            }
        }
        t.prototype = {
            init: function() {
                var t = this,
                    o = this.items,
                    s = this.hamMenu,
                    c = this.mobileBackdrop,
                    l = this.animateLine,
                    d = this.hasParent,
                    u = this.classes,
                    m = u.ACTIVE_CLASS,
                    v = u.OPEN_CLASS,
                    f = u.MOB_OPEN_CLASS,
                    g = u.INACTIVE_CLASS,
                    h = this.nav;
                setTimeout(function() {
                        r(h, "loading"),
                            a(h, "loaded"),
                            p(h.querySelectorAll(".sub")).forEach(function(e) {
                                return (e.style.animationDuration = "");
                            });
                    }, 100),
                    this.calculateBounds();

                function b() {
                    document.querySelectorAll(".nav-menu.active").forEach(function(e) {
                        e.classList.add("inactive"), e.classList.remove("active");
                    });
                }
                o.forEach(function(o) {
                        var s = function(s, c) {
                            if ((a(h, v), n())) {
                                if (i(s, m)) return void(c || (r(s, m), a(s, g), (s.style.maxHeight = "")));
                                var d = h.querySelector("li." + m);
                                d && (r(d, m), a(s, g), (d.style.maxHeight = ""));
                                var u = s.querySelector(".sub");
                                if (u) {
                                    var p = 128 + u.getBoundingClientRect().height;
                                    s.style.maxHeight = p + "px";
                                }
                                a(s, m), r(s, g);
                            } else a(o, m), r(o, g), e.startRecord(o.dataset.navItemId), l.call(t, s, h.hadCursor);
                        };
                        o.addEventListener("click", function(t) {
                                var i;
                                (i =
                                    (
                                        t.path ||
                                        (function(e) {
                                            for (var t = []; e;) t.push(e), (e = e.parentElement);
                                            return t;
                                        })(t.target)
                                    )
                                    .filter(function(e) {
                                        return e instanceof HTMLElement;
                                    })
                                    .map(function(e) {
                                        return e.tagName.toLowerCase();
                                    })
                                    .indexOf("a") > -1),
                                n() ? s(t.currentTarget, i) : i && e.userClicksOnMenu(o.dataset.navItemId);
                            }),
                            o.querySelector("span").addEventListener("click", function() {
                                e.navItemClick(o.dataset.navItemId);
                            }),
                            o.addEventListener("mouseenter", function() {
                                n() ||
                                    (h.hadCursor ?
                                        s(o) :
                                        (function(e, t, n, o) {
                                            if (e) {
                                                var i = o || 200,
                                                    a = !1;
                                                e.addEventListener("mouseleave", function t() {
                                                        (a = !0), e.removeEventListener("mouseleave", t);
                                                    }),
                                                    setTimeout(function() {
                                                        a ? "function" == typeof n && n() : "function" == typeof t && t();
                                                    }, i);
                                            }
                                        })(
                                            o,
                                            function() {
                                                l.call(t, o, !1), s(o);
                                            },
                                            function() {
                                                e.nullHover(o.dataset.navItemId);
                                            }
                                        ));
                            }),
                            o.addEventListener("mouseleave", function(t) {
                                if (!n()) {
                                    (h.hadCursor = (function(e) {
                                        return e instanceof HTMLElement ? !!e.querySelector(":hover") : !!document.querySelector(e + ":hover");
                                    })(".nav-menu")),
                                    r(h, v);
                                    var s = t.currentTarget;
                                    d(s, o) ||
                                        (r(s, m),
                                            a(s, g),
                                            setTimeout(function() {
                                                if (!i(s, m)) {
                                                    var n = o.querySelector(".sub") ? o.querySelector(".sub").getBoundingClientRect() : "",
                                                        a = e.calculateDirection(t, n),
                                                        r = h.querySelector(".nav-menu.active");
                                                    r && r !== s && (a = r.dataset.navItemId), e.stopRecord(s.dataset.navItemId, a);
                                                }
                                            }, 150));
                                }
                            });
                    }),
                    document.querySelectorAll("#nav .explore-button").forEach(function(e) {
                        return e.addEventListener("click", function(t) {
                            t.stopPropagation(),
                                b(),
                                document.querySelector(e.dataset.targetNav).classList.add("active"),
                                document.querySelector(e.dataset.targetNav).classList.remove("inactive"),
                                (document.querySelector(e.dataset.targetNav).querySelector(".sub").scrollTop = 0);
                        });
                    }),
                    s &&
                    s.addEventListener("click", function() {
                        var e = document.body;
                        i(e, f) ?
                            r(e, f) :
                            (b(),
                                a(e, f),
                                c.addEventListener("mouseup", function t(n) {
                                    r(e, f), c.removeEventListener("mouseup", t);
                                }));
                    }),
                    this.setupSignInEvents();
            },
            hasParent: function(e, t) {
                if (e) {
                    for (; e.parentElement !== document.body;) {
                        if (e.parentElement === t) return !0;
                        e = e.parentElement;
                    }
                    return !1;
                }
            },
            calculateBounds: function() {
                var e = this.itemBounds,
                    t = this.items;
                (e.length = 0),
                t.forEach(function(t) {
                    var n = t.dataset.navItemId;
                    e[n] = t.getBoundingClientRect();
                });
            },
            animateLine: function(e, t) {
                var n = this.line,
                    o = this.lineTransition,
                    i = this.lineAnimation,
                    a = this.list;
                if (n) {
                    t || ((n.style.transition = "none"), (n.style.animation = "none"));
                    var r = a.getBoundingClientRect().left,
                        s = e.getBoundingClientRect();
                    (n.style.width = s.width - 36 + "px"),
                    (n.style.opacity = 1),
                    (n.style.left = s.left - r + 18 + "px"),
                    t ||
                        setTimeout(function() {
                            (n.style.transition = o), (n.style.animation = i);
                        }, 0);
                }
            },
            onResize: function() {
                this.calculateBounds();
            },
            setupSignInEvents: function() {
                var e = document.querySelector("#nav-signin"),
                    t = document.querySelector("#nav-signin-top-nav");
                e &&
                    e.addEventListener("click", function() {
                        X.pushEvents({
                            event_name: "login.website_login",
                            event_type: "initiated",
                            properties: {
                                position: window.innerWidth < 1024 ? "Hamburger Menu - Mobile" : "Top Nav - Desktop"
                            }
                        });
                    }),
                    t &&
                    t.addEventListener("click", function() {
                        X.pushEvents({
                            event_name: "login.website_login",
                            event_type: "initiated",
                            properties: {
                                position: "Top Bar - Mobile"
                            }
                        });
                    });
            },
        };

        function c() {
            var e = new t("#nav");
            document.querySelectorAll("#nav .nav-link").forEach(function(e) {
                    e.addEventListener("click", function() {
                        X.pushEvents({
                            event_name: "website.top_nav_link",
                            event_type: "clicked",
                            properties: {
                                label: e.dataset.lyticsLabel.replace(" v1.1", ""),
                                title: re,
                                midExists: se,
                                version: 1.1,
                                device_type: n() ? "mweb" : "dweb"
                            }
                        });
                    });
                }),
                document.querySelectorAll("nav .container ul .nav-category").forEach(function(e) {
                    e.addEventListener("mouseover", function(t) {
                        X.pushEvents({
                            event_name: "website.top_nav_menu",
                            event_type: "viewed",
                            properties: {
                                label: e.innerText,
                                title: re,
                                midExists: se,
                                version: 1.1,
                                device_type: n() ? "mweb" : "dweb"
                            }
                        });
                    });
                }),
                setTimeout(function() {
                    document.querySelector("#nav") && (document.querySelector("#nav").style.transition = "0.3s transform");
                }, 500),
                e.nav &&
                (X.pushEvents({
                        event_name: "website.top_nav_bar",
                        event_type: "viewed",
                        properties: {
                            version: 1.1
                        },
                        device_type: n() ? "mweb" : "dweb"
                    }),
                    e.init(),
                    $(window).on("resize", function() {
                        e.onResize();
                    }));
        }
        $(window).ready(function() {
                c();
            }),
            $(".subscribe-form")
            .submit(function(e) {
                e.preventDefault();
                var t = $(this),
                    n = t.find("button"),
                    o = n.html(),
                    i = $(this).find('input[name="email"]'),
                    a = $(this).attr("data-action"),
                    r = i.val();
                n.prop("disabled", "true").html("Please Wait...").removeClass("action-success"),
                    $(this).find('input[name="ref_url"]').remove(),
                    $(this).append('<input type="hidden" name="ref_url" value="' + window.location.href + '" /> '),
                    $.ajax({
                        method: "get",
                        url: a,
                        data: $(this).serialize(),
                        complete: function(e) {
                            n.prop("disabled", !1).html(o),
                                e.responseJSON &&
                                "success" === e.responseJSON.status &&
                                (n.html(o.replace("Subscribed", "Subscribe").replace("Subscribe", "Subscribed")),
                                    n.find("i").removeClass("i-arrow-foward").addClass("i-tick"),
                                    n.addClass("action-success"),
                                    i.attr("placeholder", r),
                                    t[0].reset());
                        },
                    });
            })
            .not(".focus")
            .find("input")
            .focus(function() {
                $(this).parent().addClass("focus");
            })
            .blur(function() {
                $(this).parent().removeClass("focus");
            });
    })();




})();
//# sourceMappingURL=x-main.js.map