/*!qinglongWeb-1.0.0 2017-09-21*/ ! function(a, b) {
	"object" == typeof exports && "object" == typeof module ? module.exports = b() : "function" == typeof define && define.amd ? define([], b) : "object" == typeof exports ? exports.echarts = b() : a.echarts = b()
}(this, function() {
		return function(a) {
				function b(d) {
					if(c[d]) return c[d].exports;
					var e = c[d] = {
						exports: {},
						id: d,
						loaded: !1
					};
					return a[d].call(e.exports, e, e.exports, b), e.loaded = !0, e.exports
				}
				var c = {};
				return b.m = a, b.c = c, b.p = "", b(0)
			}([function(a, b, c) {
						a.exports = c(2), c(112), c(106), c(116), c(32)
					}, function(a, b) {
						function c(a) {
							if(null == a || "object" != typeof a) return a;
							var b = a,
								d = O.call(a);
							if("[object Array]" === d) {
								b = [];
								for(var e = 0, f = a.length; f > e; e++) b[e] = c(a[e])
							} else if(N[d]) {
								var g = a.constructor;
								if(a.constructor.from) b = g.from(a);
								else {
									b = new g(a.length);
									for(var e = 0, f = a.length; f > e; e++) b[e] = c(a[e])
								}
							} else if(!M[d] && !I(a) && !z(a)) {
								b = {};
								for(var h in a) a.hasOwnProperty(h) && (b[h] = c(a[h]))
							}
							return b
						}

						function d(a, b, e) {
							if(!x(b) || !x(a)) return e ? c(b) : a;
							for(var f in b)
								if(b.hasOwnProperty(f)) {
									var g = a[f],
										h = b[f];
									!x(h) || !x(g) || u(h) || u(g) || z(h) || z(g) || y(h) || y(g) || I(h) || I(g) ? !e && f in a || (a[f] = c(b[f], !0)) : d(g, h, e)
								}
							return a
						}

						function e(a, b) {
							for(var c = a[0], e = 1, f = a.length; f > e; e++) c = d(c, a[e], b);
							return c
						}

						function f(a, b) {
							for(var c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
							return a
						}

						function g(a, b, c) {
							for(var d in b) b.hasOwnProperty(d) && (c ? null != b[d] : null == a[d]) && (a[d] = b[d]);
							return a
						}

						function h() {
							return document.createElement("canvas")
						}

						function i() {
							return L || (L = Y.createCanvas().getContext("2d")), L
						}

						function j(a, b) {
							if(a) {
								if(a.indexOf) return a.indexOf(b);
								for(var c = 0, d = a.length; d > c; c++)
									if(a[c] === b) return c
							}
							return -1
						}

						function k(a, b) {
							function c() {}
							var d = a.prototype;
							c.prototype = b.prototype, a.prototype = new c;
							for(var e in d) a.prototype[e] = d[e];
							a.prototype.constructor = a, a.superClass = b
						}

						function l(a, b, c) {
							a = "prototype" in a ? a.prototype : a, b = "prototype" in b ? b.prototype : b, g(a, b, c)
						}

						function m(a) {
							return a ? "string" != typeof a && "number" == typeof a.length : void 0
						}

						function n(a, b, c) {
							if(a && b)
								if(a.forEach && a.forEach === Q) a.forEach(b, c);
								else if(a.length === +a.length)
								for(var d = 0, e = a.length; e > d; d++) b.call(c, a[d], d, a);
							else
								for(var f in a) a.hasOwnProperty(f) && b.call(c, a[f], f, a)
						}

						function o(a, b, c) {
							if(a && b) {
								if(a.map && a.map === T) return a.map(b, c);
								for(var d = [], e = 0, f = a.length; f > e; e++) d.push(b.call(c, a[e], e, a));
								return d
							}
						}

						function p(a, b, c, d) {
							if(a && b) {
								if(a.reduce && a.reduce === U) return a.reduce(b, c, d);
								for(var e = 0, f = a.length; f > e; e++) c = b.call(d, c, a[e], e, a);
								return c
							}
						}

						function q(a, b, c) {
							if(a && b) {
								if(a.filter && a.filter === R) return a.filter(b, c);
								for(var d = [], e = 0, f = a.length; f > e; e++) b.call(c, a[e], e, a) && d.push(a[e]);
								return d
							}
						}

						function r(a, b, c) {
							if(a && b)
								for(var d = 0, e = a.length; e > d; d++)
									if(b.call(c, a[d], d, a)) return a[d]
						}

						function s(a, b) {
							var c = S.call(arguments, 2);
							return function() {
								return a.apply(b, c.concat(S.call(arguments)))
							}
						}

						function t(a) {
							var b = S.call(arguments, 1);
							return function() {
								return a.apply(this, b.concat(S.call(arguments)))
							}
						}

						function u(a) {
							return "[object Array]" === O.call(a)
						}

						function v(a) {
							return "function" == typeof a
						}

						function w(a) {
							return "[object String]" === O.call(a)
						}

						function x(a) {
							var b = typeof a;
							return "function" === b || !!a && "object" == b
						}

						function y(a) {
							return !!M[O.call(a)]
						}

						function z(a) {
							return "object" == typeof a && "number" == typeof a.nodeType && "object" == typeof a.ownerDocument
						}

						function A(a) {
							return a !== a
						}

						function B(a) {
							for(var b = 0, c = arguments.length; c > b; b++)
								if(null != arguments[b]) return arguments[b]
						}

						function C(a, b) {
							return null != a ? a : b
						}

						function D(a, b, c) {
							return null != a ? a : null != b ? b : c
						}

						function E() {
							return Function.call.apply(S, arguments)
						}

						function F(a) {
							if("number" == typeof a) return [a, a, a, a];
							var b = a.length;
							return 2 === b ? [a[0], a[1], a[0], a[1]] : 3 === b ? [a[0], a[1], a[2], a[1]] : a
						}

						function G(a, b) {
							if(!a) throw new Error(b)
						}

						function H(a) {
							a[V] = !0
						}

						function I(a) {
							return a[V]
						}

						function J(a) {
							a && n(a, function(a, b) {
								this.set(b, a)
							}, this)
						}

						function K(a) {
							return new J(a)
						}
						var L, M = {
								"[object Function]": 1,
								"[object RegExp]": 1,
								"[object Date]": 1,
								"[object Error]": 1,
								"[object CanvasGradient]": 1,
								"[object CanvasPattern]": 1,
								"[object Image]": 1,
								"[object Canvas]": 1
							},
							N = {
								"[object Int8Array]": 1,
								"[object Uint8Array]": 1,
								"[object Uint8ClampedArray]": 1,
								"[object Int16Array]": 1,
								"[object Uint16Array]": 1,
								"[object Int32Array]": 1,
								"[object Uint32Array]": 1,
								"[object Float32Array]": 1,
								"[object Float64Array]": 1
							},
							O = Object.prototype.toString,
							P = Array.prototype,
							Q = P.forEach,
							R = P.filter,
							S = P.slice,
							T = P.map,
							U = P.reduce,
							V = "__ec_primitive__",
							W = "_ec_",
							X = 4;
						J.prototype = {
							constructor: J,
							get: function(a) {
								return this[W + a]
							},
							set: function(a, b) {
								return this[W + a] = b, b
							},
							each: function(a, b) {
								void 0 !== b && (a = s(a, b));
								for(var c in this) this.hasOwnProperty(c) && a(this[c], c.slice(X))
							},
							removeKey: function(a) {
								delete this[W + a]
							}
						};
						var Y = {
							inherits: k,
							mixin: l,
							clone: c,
							merge: d,
							mergeAll: e,
							extend: f,
							defaults: g,
							getContext: i,
							createCanvas: h,
							indexOf: j,
							slice: E,
							find: r,
							isArrayLike: m,
							each: n,
							map: o,
							reduce: p,
							filter: q,
							bind: s,
							curry: t,
							isArray: u,
							isString: w,
							isObject: x,
							isFunction: v,
							isBuiltInObject: y,
							isDom: z,
							eqNaN: A,
							retrieve: B,
							retrieve2: C,
							retrieve3: D,
							assert: G,
							setAsPrimitive: H,
							createHashMap: K,
							normalizeCssArray: F,
							noop: function() {}
						};
						a.exports = Y
					}, function(a, b, c) {
						function d(a) {
							return function(b, c, d) {
								b = b && b.toLowerCase(), N.prototype[a].call(this, b, c, d)
							}
						}

						function e() {
							N.call(this)
						}

						function f(a, b, c) {
							function d(a, b) {
								return a.prio - b.prio
							}
							c = c || {}, "string" == typeof b && (b = ja[b]), this.id, this.group, this._dom = a;
							var f = this._zr = K.init(a, {
								renderer: c.renderer || "canvas",
								devicePixelRatio: c.devicePixelRatio,
								width: c.width,
								height: c.height
							});
							this._throttledZrFlush = J.throttle(L.bind(f.flush, f), 17);
							var b = L.clone(b);
							b && C(b, !0), this._theme = b, this._chartsViews = [], this._chartsMap = {}, this._componentsViews = [], this._componentsMap = {}, this._coordSysMgr = new A, this._api = v(this), N.call(this), this._messageCenter = new e, this._initEvents(), this.resize = L.bind(this.resize, this), this._pendingActions = [], O(ia, d), O(fa, d), f.animation.on("frame", this._onframe, this), L.setAsPrimitive(this)
						}

						function g(a, b, c) {
							var d, e = this._model,
								f = this._coordSysMgr.getCoordinateSystems();
							b = I.parseFinder(e, b);
							for(var g = 0; g < f.length; g++) {
								var h = f[g];
								if(h[a] && null != (d = h[a](e, b, c))) return d
							}
						}

						function h(a, b, c, d, e) {
							function f(d) {
								d && d.__alive && d[b] && d[b](d.__model, g, a._api, c)
							}
							var g = a._model;
							if(!d) return void P(a._componentsViews.concat(a._chartsViews), f);
							var h = {};
							h[d + "Id"] = c[d + "Id"], h[d + "Index"] = c[d + "Index"], h[d + "Name"] = c[d + "Name"];
							var i = {
								mainType: d,
								query: h
							};
							e && (i.subType = e), g && g.eachComponent(i, function(b, c) {
								f(a["series" === d ? "_chartsMap" : "_componentsMap"][b.__viewId])
							}, a)
						}

						function i(a, b) {
							var c = a.type,
								d = a.escapeConnect,
								e = da[c],
								f = e.actionInfo,
								g = (f.update || "update").split(":"),
								i = g.pop();
							g = null != g[0] && Q(g[0]), this[Y] = !0;
							var j = [a],
								k = !1;
							a.batch && (k = !0, j = L.map(a.batch, function(b) {
								return b = L.defaults(L.extend({}, b), a), b.batch = null, b
							}));
							var l, m = [],
								n = "highlight" === c || "downplay" === c;
							P(j, function(a) {
								l = e.action(a, this._model, this._api), l = l || L.extend({}, a), l.type = f.event || l.type, m.push(l), n ? h(this, i, a, "series") : g && h(this, i, a, g.main, g.sub)
							}, this), "none" === i || n || g || (this[$] ? (ba.prepareAndUpdate.call(this, a), this[$] = !1) : ba[i].call(this, a)), l = k ? {
								type: f.event || c,
								escapeConnect: d,
								batch: m
							} : m[0], this[Y] = !1, !b && this._messageCenter.trigger(l.type, l)
						}

						function j(a) {
							for(var b = this._pendingActions; b.length;) {
								var c = b.shift();
								i.call(this, c, a)
							}
						}

						function k(a) {
							!a && this.trigger("updated")
						}

						function l(a, b, c) {
							var d = this._api;
							P(this._componentsViews, function(e) {
								var f = e.__model;
								e[a](f, b, d, c), u(f, e)
							}, this), b.eachSeries(function(e, f) {
								var g = this._chartsMap[e.__viewId];
								g[a](e, b, d, c), u(e, g), t(e, g)
							}, this), s(this._zr, b), P(ha, function(a) {
								a(b, d)
							})
						}

						function m(a, b) {
							for(var c = "component" === a, d = c ? this._componentsViews : this._chartsViews, e = c ? this._componentsMap : this._chartsMap, f = this._zr, g = 0; g < d.length; g++) d[g].__alive = !1;
							b[c ? "eachComponent" : "eachSeries"](function(a, g) {
								if(c) {
									if("series" === a) return
								} else g = a;
								var h = "_ec_" + g.id + "_" + g.type,
									i = e[h];
								if(!i) {
									var j = Q(g.type),
										k = c ? F.getClass(j.main, j.sub) : G.getClass(j.sub);
									if(!k) return;
									i = new k, i.init(b, this._api), e[h] = i, d.push(i), f.add(i.group)
								}
								g.__viewId = i.__id = h, i.__alive = !0, i.__model = g, i.group.__ecComponentInfo = {
									mainType: g.mainType,
									index: g.componentIndex
								}
							}, this);
							for(var g = 0; g < d.length;) {
								var h = d[g];
								h.__alive ? g++ : (f.remove(h.group), h.dispose(b, this._api), d.splice(g, 1), delete e[h.__id], h.__id = h.group.__ecComponentInfo = null)
							}
						}

						function n(a, b) {
							P(fa, function(c) {
								c.func(a, b)
							})
						}

						function o(a) {
							var b = {};
							a.eachSeries(function(a) {
								var c = a.get("stack"),
									d = a.getData();
								if(c && "list" === d.type) {
									var e = b[c];
									b.hasOwnProperty(c) && e && (d.stackedOn = e), b[c] = d
								}
							})
						}

						function p(a, b) {
							var c = this._api;
							P(ia, function(d) {
								d.isLayout && d.func(a, c, b)
							})
						}

						function q(a, b, c) {
							var d = this._api;
							a.clearColorPalette(), a.eachSeries(function(a) {
								a.clearColorPalette()
							}), P(ia, function(e) {
								(!c || !e.isLayout) && e.func(a, d, b)
							})
						}

						function r(a, b) {
							var c = this._api;
							P(this._componentsViews, function(d) {
								var e = d.__model;
								d.render(e, a, c, b), u(e, d)
							}, this), P(this._chartsViews, function(a) {
								a.__alive = !1
							}, this), a.eachSeries(function(d, e) {
								var f = this._chartsMap[d.__viewId];
								f.__alive = !0, f.render(d, a, c, b), f.group.silent = !!d.get("silent"), u(d, f), t(d, f)
							}, this), s(this._zr, a), P(this._chartsViews, function(b) {
								b.__alive || b.remove(a, c)
							}, this)
						}

						function s(a, b) {
							var c = a.storage,
								d = 0;
							c.traverse(function(a) {
								a.isGroup || d++
							}), d > b.get("hoverLayerThreshold") && !x.node && c.traverse(function(a) {
								a.isGroup || (a.useHoverLayer = !0)
							})
						}

						function t(a, b) {
							var c = 0;
							b.group.traverse(function(a) {
								"group" === a.type || a.ignore || c++
							});
							var d = +a.get("progressive"),
								e = c > a.get("progressiveThreshold") && d && !x.node;
							e && b.group.traverse(function(a) {
									a.isGroup || (a.progressive = e ? Math.floor(c++/d):-1,e&&a.stopAnimation(!0))});var f=a.get("blendMode")||null;b.group.traverse(function(a){a.isGroup||a.setStyle("blend",f)})}function u(a,b){var c=a.get("z"),d=a.get("zlevel");b.group.traverse(function(a){"group"!==a.type&&(null!=c&&(a.z=c),null!=d&&(a.zlevel=d))})}function v(a){var b=a._coordSysMgr;return L.extend(new z(a),{getCoordinateSystems:L.bind(b.getCoordinateSystems,b),getComponentByElement:function(b){for(;b;){var c=b.__ecComponentInfo;if(null!=c)return a._model.getComponent(c.mainType,c.index);b=b.parent}}})}function w(a){function b(a,b){for(var c=0;c<a.length;c++){var d=a[c];d[f]=b}}var c=0,d=1,e=2,f="__connectUpdateStatus";L.each(ea,function(g,h){a._messageCenter.on(h,function(g){if(ma[a.group]&&a[f]!==c){if(g&&g.escapeConnect)return;var h=a.makeActionFromEvent(g),i=[];L.each(la,function(b){b!==a&&b.group===a.group&&i.push(b)}),b(i,c),P(i,function(a){a[f]!==d&&a.dispatchAction(h)}),b(i,e)}})})}var x=c(10),y=c(143),z=c(105),A=c(26),B=c(144),C=c(151),D=c(13),E=c(17),F=c(67),G=c(30),H=c(3),I=c(5),J=c(37),K=c(92),L=c(1),M=c(22),N=c(23),O=c(52),P=L.each,Q=D.parseClassType,R=1e3,S=5e3,T=1e3,U=2e3,V=3e3,W=4e3,X=5e3,Y="__flagInMainProcess",Z="__hasGradientOrPatternBg",$="__optionUpdated",_=/ ^ [a - zA - Z0 - 9 _] + $ / ; e.prototype.on = d("on"), e.prototype.off = d("off"), e.prototype.one = d("one"), L.mixin(e, N);
										var aa = f.prototype; aa._onframe = function() {
											if(this[$]) {
												var a = this[$].silent;
												this[Y] = !0, ba.prepareAndUpdate.call(this), this[Y] = !1, this[$] = !1, j.call(this, a), k.call(this, a)
											}
										}, aa.getDom = function() {
											return this._dom
										}, aa.getZr = function() {
											return this._zr
										}, aa.setOption = function(a, b, c) {
											var d;
											if(L.isObject(b) && (c = b.lazyUpdate, d = b.silent, b = b.notMerge), this[Y] = !0, !this._model || b) {
												var e = new B(this._api),
													f = this._theme,
													g = this._model = new y(null, null, f, e);
												g.init(null, null, f, e)
											}
											this._model.setOption(a, ga), c ? (this[$] = {
												silent: d
											}, this[Y] = !1) : (ba.prepareAndUpdate.call(this), this._zr.flush(), this[$] = !1, this[Y] = !1, j.call(this, d), k.call(this, d))
										}, aa.setTheme = function() {
											console.log("ECharts#setTheme() is DEPRECATED in ECharts 3.0")
										}, aa.getModel = function() {
											return this._model
										}, aa.getOption = function() {
											return this._model && this._model.getOption()
										}, aa.getWidth = function() {
											return this._zr.getWidth()
										}, aa.getHeight = function() {
											return this._zr.getHeight()
										}, aa.getDevicePixelRatio = function() {
											return this._zr.painter.dpr || window.devicePixelRatio || 1
										}, aa.getRenderedCanvas = function(a) {
											if(x.canvasSupported) {
												a = a || {}, a.pixelRatio = a.pixelRatio || 1, a.backgroundColor = a.backgroundColor || this._model.get("backgroundColor");
												var b = this._zr,
													c = b.storage.getDisplayList();
												return L.each(c, function(a) {
													a.stopAnimation(!0)
												}), b.painter.getRenderedCanvas(a)
											}
										}, aa.getDataURL = function(a) {
											a = a || {};
											var b = a.excludeComponents,
												c = this._model,
												d = [],
												e = this;
											P(b, function(a) {
												c.eachComponent({
													mainType: a
												}, function(a) {
													var b = e._componentsMap[a.__viewId];
													b.group.ignore || (d.push(b), b.group.ignore = !0)
												})
											});
											var f = this.getRenderedCanvas(a).toDataURL("image/" + (a && a.type || "png"));
											return P(d, function(a) {
												a.group.ignore = !1
											}), f
										}, aa.getConnectedDataURL = function(a) {
											if(x.canvasSupported) {
												var b = this.group,
													c = Math.min,
													d = Math.max,
													e = 1 / 0;
												if(ma[b]) {
													var f = e,
														g = e,
														h = -e,
														i = -e,
														j = [],
														k = a && a.pixelRatio || 1;
													L.each(la, function(e, k) {
														if(e.group === b) {
															var l = e.getRenderedCanvas(L.clone(a)),
																m = e.getDom().getBoundingClientRect();
															f = c(m.left, f), g = c(m.top, g), h = d(m.right, h), i = d(m.bottom, i), j.push({
																dom: l,
																left: m.left,
																top: m.top
															})
														}
													}), f *= k, g *= k, h *= k, i *= k;
													var l = h - f,
														m = i - g,
														n = L.createCanvas();
													n.width = l, n.height = m;
													var o = K.init(n);
													return P(j, function(a) {
														var b = new H.Image({
															style: {
																x: a.left * k - f,
																y: a.top * k - g,
																image: a.dom
															}
														});
														o.add(b)
													}), o.refreshImmediately(), n.toDataURL("image/" + (a && a.type || "png"))
												}
												return this.getDataURL(a)
											}
										}, aa.convertToPixel = L.curry(g, "convertToPixel"), aa.convertFromPixel = L.curry(g, "convertFromPixel"), aa.containPixel = function(a, b) {
											var c, d = this._model;
											return a = I.parseFinder(d, a), L.each(a, function(a, d) {
												d.indexOf("Models") >= 0 && L.each(a, function(a) {
													var e = a.coordinateSystem;
													if(e && e.containPoint) c |= !!e.containPoint(b);
													else if("seriesModels" === d) {
														var f = this._chartsMap[a.__viewId];
														f && f.containPoint && (c |= f.containPoint(b, a))
													}
												}, this)
											}, this), !!c
										}, aa.getVisual = function(a, b) {
											var c = this._model;
											a = I.parseFinder(c, a, {
												defaultMainType: "series"
											});
											var d = a.seriesModel,
												e = d.getData(),
												f = a.hasOwnProperty("dataIndexInside") ? a.dataIndexInside : a.hasOwnProperty("dataIndex") ? e.indexOfRawIndex(a.dataIndex) : null;
											return null != f ? e.getItemVisual(f, b) : e.getVisual(b)
										}, aa.getViewOfComponentModel = function(a) {
											return this._componentsMap[a.__viewId]
										}, aa.getViewOfSeriesModel = function(a) {
											return this._chartsMap[a.__viewId]
										};
										var ba = {
											update: function(a) {
												var b = this._model,
													c = this._api,
													d = this._coordSysMgr,
													e = this._zr;
												if(b) {
													b.restoreData(), d.create(this._model, this._api), n.call(this, b, c), o.call(this, b), d.update(b, c), q.call(this, b, a), r.call(this, b, a);
													var f = b.get("backgroundColor") || "transparent",
														g = e.painter;
													if(g.isSingleCanvas && g.isSingleCanvas()) e.configLayer(0, {
														clearColor: f
													});
													else {
														if(!x.canvasSupported) {
															var h = M.parse(f);
															f = M.stringify(h, "rgb"), 0 === h[3] && (f = "transparent")
														}
														f.colorStops || f.image ? (e.configLayer(0, {
															clearColor: f
														}), this[Z] = !0, this._dom.style.background = "transparent") : (this[Z] && e.configLayer(0, {
															clearColor: null
														}), this[Z] = !1, this._dom.style.background = f)
													}
													P(ha, function(a) {
														a(b, c)
													})
												}
											},
											updateView: function(a) {
												var b = this._model;
												b && (b.eachSeries(function(a) {
													a.getData().clearAllVisual()
												}), q.call(this, b, a), l.call(this, "updateView", b, a))
											},
											updateVisual: function(a) {
												var b = this._model;
												b && (b.eachSeries(function(a) {
													a.getData().clearAllVisual()
												}), q.call(this, b, a, !0), l.call(this, "updateVisual", b, a))
											},
											updateLayout: function(a) {
												var b = this._model;
												b && (p.call(this, b, a), l.call(this, "updateLayout", b, a))
											},
											prepareAndUpdate: function(a) {
												var b = this._model;
												m.call(this, "component", b), m.call(this, "chart", b), ba.update.call(this, a)
											}
										}; aa.resize = function(a) {
											this[Y] = !0, this._zr.resize(a);
											var b = this._model && this._model.resetOption("media"),
												c = b ? "prepareAndUpdate" : "update";
											ba[c].call(this), this._loadingFX && this._loadingFX.resize(), this[Y] = !1;
											var d = a && a.silent;
											j.call(this, d), k.call(this, d)
										}, aa.showLoading = function(a, b) {
											if(L.isObject(a) && (b = a, a = ""), a = a || "default", this.hideLoading(), ka[a]) {
												var c = ka[a](this._api, b),
													d = this._zr;
												this._loadingFX = c, d.add(c)
											}
										}, aa.hideLoading = function() {
											this._loadingFX && this._zr.remove(this._loadingFX), this._loadingFX = null
										}, aa.makeActionFromEvent = function(a) {
											var b = L.extend({}, a);
											return b.type = ea[a.type], b
										}, aa.dispatchAction = function(a, b) {
											if(L.isObject(b) || (b = {
													silent: !!b
												}), da[a.type] && this._model) {
												if(this[Y]) return void this._pendingActions.push(a);
												i.call(this, a, b.silent), b.flush ? this._zr.flush(!0) : b.flush !== !1 && x.browser.weChat && this._throttledZrFlush(), j.call(this, b.silent), k.call(this, b.silent)
											}
										}, aa.on = d("on"), aa.off = d("off"), aa.one = d("one");
										var ca = ["click", "dblclick", "mouseover", "mouseout", "mousemove", "mousedown", "mouseup", "globalout", "contextmenu"]; aa._initEvents = function() {
											P(ca, function(a) {
												this._zr.on(a, function(b) {
													var c, d = this.getModel(),
														e = b.target;
													if("globalout" === a) c = {};
													else if(e && null != e.dataIndex) {
														var f = e.dataModel || d.getSeriesByIndex(e.seriesIndex);
														c = f && f.getDataParams(e.dataIndex, e.dataType) || {}
													} else e && e.eventData && (c = L.extend({}, e.eventData));
													c && (c.event = b, c.type = a, this.trigger(a, c))
												}, this)
											}, this), P(ea, function(a, b) {
												this._messageCenter.on(b, function(a) {
													this.trigger(b, a)
												}, this)
											}, this)
										}, aa.isDisposed = function() {
											return this._disposed
										}, aa.clear = function() {
											this.setOption({
												series: []
											}, !0)
										}, aa.dispose = function() {
											if(!this._disposed) {
												this._disposed = !0;
												var a = this._api,
													b = this._model;
												P(this._componentsViews, function(c) {
													c.dispose(b, a)
												}), P(this._chartsViews, function(c) {
													c.dispose(b, a)
												}), this._zr.dispose(), delete la[this.id]
											}
										}, L.mixin(f, N);
										var da = {}, ea = {}, fa = [], ga = [], ha = [], ia = [], ja = {}, ka = {}, la = {}, ma = {}, na = new Date - 0, oa = new Date - 0, pa = "_echarts_instance_", qa = {
											version: "3.7.1",
											dependencies: {
												zrender: "3.6.1"
											}
										}; qa.init = function(a, b, c) {
											var d = qa.getInstanceByDom(a);
											if(d) return d;
											var e = new f(a, b, c);
											return e.id = "ec_" + na++, la[e.id] = e, a.setAttribute ? a.setAttribute(pa, e.id) : a[pa] = e.id, w(e), e
										}, qa.connect = function(a) {
											if(L.isArray(a)) {
												var b = a;
												a = null, L.each(b, function(b) {
													null != b.group && (a = b.group)
												}), a = a || "g_" + oa++, L.each(b, function(b) {
													b.group = a
												})
											}
											return ma[a] = !0, a
										}, qa.disConnect = function(a) {
											ma[a] = !1
										}, qa.disconnect = qa.disConnect, qa.dispose = function(a) {
											"string" == typeof a ? a = la[a] : a instanceof f || (a = qa.getInstanceByDom(a)), a instanceof f && !a.isDisposed() && a.dispose()
										}, qa.getInstanceByDom = function(a) {
											var b;
											return b = a.getAttribute ? a.getAttribute(pa) : a[pa], la[b]
										}, qa.getInstanceById = function(a) {
											return la[a]
										}, qa.registerTheme = function(a, b) {
											ja[a] = b
										}, qa.registerPreprocessor = function(a) {
											ga.push(a)
										}, qa.registerProcessor = function(a, b) {
											"function" == typeof a && (b = a, a = R), fa.push({
												prio: a,
												func: b
											})
										}, qa.registerPostUpdate = function(a) {
											ha.push(a)
										}, qa.registerAction = function(a, b, c) {
											"function" == typeof b && (c = b, b = "");
											var d = L.isObject(a) ? a.type : [a, a = {
												event: b
											}][0];
											a.event = (a.event || d).toLowerCase(), b = a.event, L.assert(_.test(d) && _.test(b)), da[d] || (da[d] = {
												action: c,
												actionInfo: a
											}), ea[b] = d
										}, qa.registerCoordinateSystem = function(a, b) {
											A.register(a, b)
										}, qa.getCoordinateSystemDimensions = function(a) {
											var b = A.get(a);
											return b ? b.getDimensionsInfo ? b.getDimensionsInfo() : b.dimensions.slice() : void 0
										}, qa.registerLayout = function(a, b) {
											"function" == typeof a && (b = a, a = T), ia.push({
												prio: a,
												func: b,
												isLayout: !0
											})
										}, qa.registerVisual = function(a, b) {
											"function" == typeof a && (b = a, a = V), ia.push({
												prio: a,
												func: b
											})
										}, qa.registerLoading = function(a, b) {
											ka[a] = b
										}, qa.extendComponentModel = function(a) {
											return D.extend(a)
										}, qa.extendComponentView = function(a) {
											return F.extend(a)
										}, qa.extendSeriesModel = function(a) {
											return E.extend(a)
										}, qa.extendChartView = function(a) {
											return G.extend(a)
										}, qa.setCanvasCreator = function(a) {
											L.createCanvas = a
										}, qa.registerVisual(U, c(157)), qa.registerPreprocessor(C), qa.registerLoading("default", c(142)), qa.registerAction({
											type: "highlight",
											event: "highlight",
											update: "highlight"
										}, L.noop), qa.registerAction({
											type: "downplay",
											event: "downplay",
											update: "downplay"
										}, L.noop), qa.zrender = K, qa.List = c(14), qa.Model = c(11), qa.Axis = c(33), qa.graphic = c(3), qa.number = c(4), qa.format = c(7), qa.throttle = J.throttle, qa.matrix = c(19), qa.vector = c(6), qa.color = c(22), qa.util = {}, P(["map", "each", "filter", "indexOf", "inherits", "reduce", "filter", "bind", "curry", "isArray", "isString", "isObject", "isFunction", "extend", "defaults", "clone", "merge"], function(a) {
											qa.util[a] = L[a]
										}), qa.helper = c(141), qa.PRIORITY = {
											PROCESSOR: {
												FILTER: R,
												STATISTIC: S
											},
											VISUAL: {
												LAYOUT: T,
												GLOBAL: U,
												CHART: V,
												COMPONENT: W,
												BRUSH: X
											}
										}, a.exports = qa
									}, function(a, b, c) {
										"use strict";

										function d(a) {
											return null != a && "none" != a
										}

										function e(a) {
											return "string" == typeof a ? z.lift(a, -.1) : a
										}

										function f(a) {
											if(a.__hoverStlDirty) {
												var b = a.style.stroke,
													c = a.style.fill,
													f = a.__hoverStl;
												f.fill = f.fill || (d(c) ? e(c) : null), f.stroke = f.stroke || (d(b) ? e(b) : null);
												var g = {};
												for(var h in f) null != f[h] && (g[h] = a.style[h]);
												a.__normalStl = g, a.__hoverStlDirty = !1
											}
										}

										function g(a) {
											if(!a.__isHover) {
												if(f(a), a.useHoverLayer) a.__zr && a.__zr.addHover(a, a.__hoverStl);
												else {
													var b = a.style,
														c = b.insideRollbackOpt;
													c && u(b), b.extendFrom(a.__hoverStl), c && (t(b, b.insideOriginalTextPosition, c), null == b.textFill && (b.textFill = c.autoColor)), a.dirty(!1), a.z2 += 1
												}
												a.__isHover = !0
											}
										}

										function h(a) {
											if(a.__isHover) {
												var b = a.__normalStl;
												a.useHoverLayer ? a.__zr && a.__zr.removeHover(a) : (b && a.setStyle(b), a.z2 -= 1), a.__isHover = !1
											}
										}

										function i(a) {
											"group" === a.type ? a.traverse(function(a) {
												"group" !== a.type && g(a)
											}) : g(a)
										}

										function j(a) {
											"group" === a.type ? a.traverse(function(a) {
												"group" !== a.type && h(a)
											}) : h(a)
										}

										function k(a, b) {
											a.__hoverStl = a.hoverStyle || b || {}, a.__hoverStlDirty = !0, a.__isHover && f(a)
										}

										function l(a) {
											this.__hoverSilentOnTouch && a.zrByTouch || !this.__isEmphasis && i(this)
										}

										function m(a) {
											this.__hoverSilentOnTouch && a.zrByTouch || !this.__isEmphasis && j(this)
										}

										function n() {
											this.__isEmphasis = !0, i(this)
										}

										function o() {
											this.__isEmphasis = !1, j(this)
										}

										function p(a, b, c, d) {
											if(c = c || H, c.isRectText) {
												var e = b.getShallow("position") || (d ? null : "inside");
												"outside" === e && (e = "top"), a.textPosition = e, a.textOffset = b.getShallow("offset");
												var f = b.getShallow("rotate");
												null != f && (f *= Math.PI / 180), a.textRotation = f, a.textDistance = w.retrieve2(b.getShallow("distance"), d ? null : 5)
											}
											var g, h = b.ecModel,
												i = h && h.option.textStyle,
												j = q(b);
											if(j) {
												g = {};
												for(var k in j)
													if(j.hasOwnProperty(k)) {
														var l = b.getModel(["rich", k]);
														r(g[k] = {}, l, i, c, d)
													}
											}
											return a.rich = g, r(a, b, i, c, d, !0), c.forceRich && !c.textStyle && (c.textStyle = {}), a
										}

										function q(a) {
											for(var b; a && a !== a.ecModel;) {
												var c = (a.option || H).rich;
												if(c) {
													b = b || {};
													for(var d in c) c.hasOwnProperty(d) && (b[d] = 1)
												}
												a = a.parentModel
											}
											return b
										}

										function r(a, b, c, d, e, f) {
											if(c = !e && c || H, a.textFill = s(b.getShallow("color"), d) || c.color, a.textStroke = s(b.getShallow("textBorderColor"), d) || c.textBorderColor, a.textLineWidth = w.retrieve2(b.getShallow("textBorderWidth"), c.textBorderWidth), !e) {
												if(f) {
													var g = a.textPosition;
													a.insideRollback = t(a, g, d), a.insideOriginalTextPosition = g, a.insideRollbackOpt = d
												}
												null == a.textFill && (a.textFill = d.autoColor)
											}
											a.fontStyle = b.getShallow("fontStyle") || c.fontStyle, a.fontWeight = b.getShallow("fontWeight") || c.fontWeight, a.fontSize = b.getShallow("fontSize") || c.fontSize, a.fontFamily = b.getShallow("fontFamily") || c.fontFamily, a.textAlign = b.getShallow("align"), a.textVerticalAlign = b.getShallow("verticalAlign") || b.getShallow("baseline"), a.textLineHeight = b.getShallow("lineHeight"), a.textWidth = b.getShallow("width"), a.textHeight = b.getShallow("height"), a.textTag = b.getShallow("tag"), f && d.disableBox || (a.textBackgroundColor = s(b.getShallow("backgroundColor"), d), a.textPadding = b.getShallow("padding"), a.textBorderColor = s(b.getShallow("borderColor"), d), a.textBorderWidth = b.getShallow("borderWidth"), a.textBorderRadius = b.getShallow("borderRadius"), a.textBoxShadowColor = b.getShallow("shadowColor"), a.textBoxShadowBlur = b.getShallow("shadowBlur"), a.textBoxShadowOffsetX = b.getShallow("shadowOffsetX"), a.textBoxShadowOffsetY = b.getShallow("shadowOffsetY")), a.textShadowColor = b.getShallow("textShadowColor") || c.textShadowColor, a.textShadowBlur = b.getShallow("textShadowBlur") || c.textShadowBlur, a.textShadowOffsetX = b.getShallow("textShadowOffsetX") || c.textShadowOffsetX, a.textShadowOffsetY = b.getShallow("textShadowOffsetY") || c.textShadowOffsetY
										}

										function s(a, b) {
											return "auto" !== a ? a : b && b.autoColor ? b.autoColor : null
										}

										function t(a, b, c) {
											var d, e = c.useInsideStyle;
											return null == a.textFill && e !== !1 && (e === !0 || c.isRectText && b && "string" == typeof b && b.indexOf("inside") >= 0) && (d = {
												textFill: null,
												textStroke: a.textStroke,
												textLineWidth: a.textLineWidth
											}, a.textFill = "#fff", null == a.textStroke && (a.textStroke = c.autoColor, null == a.textLineWidth && (a.textLineWidth = 2))), d
										}

										function u(a) {
											var b = a.insideRollback;
											b && (a.textFill = b.textFill, a.textStroke = b.textStroke, a.textLineWidth = b.textLineWidth)
										}

										function v(a, b, c, d, e, f) {
											"function" == typeof e && (f = e, e = null);
											var g = d && d.isAnimationEnabled();
											if(g) {
												var h = a ? "Update" : "",
													i = d.getShallow("animationDuration" + h),
													j = d.getShallow("animationEasing" + h),
													k = d.getShallow("animationDelay" + h);
												"function" == typeof k && (k = k(e, d.getAnimationDelayParams ? d.getAnimationDelayParams(b, e) : null)), "function" == typeof i && (i = i(e)), i > 0 ? b.animateTo(c, i, k || 0, j, f, !!f) : (b.stopAnimation(), b.attr(c), f && f())
											} else b.stopAnimation(), b.attr(c), f && f()
										}
										var w = c(1),
											x = c(185),
											y = c(8),
											z = c(22),
											A = c(19),
											B = c(6),
											C = c(60),
											D = c(12),
											E = Math.round,
											F = Math.max,
											G = Math.min,
											H = {},
											I = {};
										I.Group = c(36), I.Image = c(55), I.Text = c(90), I.Circle = c(176), I.Sector = c(182), I.Ring = c(181), I.Polygon = c(178), I.Polyline = c(179), I.Rect = c(180), I.Line = c(177), I.BezierCurve = c(175), I.Arc = c(174), I.CompoundPath = c(170), I.LinearGradient = c(104), I.RadialGradient = c(171), I.BoundingRect = D, I.extendShape = function(a) {
											return y.extend(a)
										}, I.extendPath = function(a, b) {
											return x.extendFromString(a, b)
										}, I.makePath = function(a, b, c, d) {
											var e = x.createFromString(a, b),
												f = e.getBoundingRect();
											if(c) {
												var g = f.width / f.height;
												if("center" === d) {
													var h, i = c.height * g;
													i <= c.width ? h = c.height : (i = c.width, h = i / g);
													var j = c.x + c.width / 2,
														k = c.y + c.height / 2;
													c.x = j - i / 2, c.y = k - h / 2, c.width = i, c.height = h
												}
												I.resizePath(e, c)
											}
											return e
										}, I.mergePath = x.mergePath, I.resizePath = function(a, b) {
											if(a.applyTransform) {
												var c = a.getBoundingRect(),
													d = c.calculateTransform(b);
												a.applyTransform(d)
											}
										}, I.subPixelOptimizeLine = function(a) {
											var b = a.shape,
												c = a.style.lineWidth;
											return E(2 * b.x1) === E(2 * b.x2) && (b.x1 = b.x2 = J(b.x1, c, !0)), E(2 * b.y1) === E(2 * b.y2) && (b.y1 = b.y2 = J(b.y1, c, !0)), a
										}, I.subPixelOptimizeRect = function(a) {
											var b = a.shape,
												c = a.style.lineWidth,
												d = b.x,
												e = b.y,
												f = b.width,
												g = b.height;
											return b.x = J(b.x, c, !0), b.y = J(b.y, c, !0), b.width = Math.max(J(d + f, c, !1) - b.x, 0 === f ? 0 : 1), b.height = Math.max(J(e + g, c, !1) - b.y, 0 === g ? 0 : 1), a
										};
										var J = I.subPixelOptimize = function(a, b, c) {
											var d = E(2 * a);
											return(d + E(b)) % 2 === 0 ? d / 2 : (d + (c ? 1 : -1)) / 2
										};
										I.setHoverStyle = function(a, b, c) {
											a.__hoverSilentOnTouch = c && c.hoverSilentOnTouch, "group" === a.type ? a.traverse(function(a) {
												"group" !== a.type && k(a, b)
											}) : k(a, b), a.on("mouseover", l).on("mouseout", m), a.on("emphasis", n).on("normal", o)
										}, I.setLabelStyle = function(a, b, c, d, e, f, g) {
											e = e || H;
											var h = e.labelFetcher,
												i = e.labelDataIndex,
												j = e.labelDimIndex,
												k = c.getShallow("show"),
												l = d.getShallow("show"),
												m = k || l ? w.retrieve2(h ? h.getFormattedLabel(i, "normal", null, j) : null, e.defaultText) : null,
												n = k ? m : null,
												o = l ? w.retrieve2(h ? h.getFormattedLabel(i, "emphasis", null, j) : null, m) : null;
											null == n && null == o || (K(a, c, f, e), K(b, d, g, e, !0)), a.text = n, b.text = o
										};
										var K = I.setTextStyle = function(a, b, c, d, e) {
											return p(a, b, d, e), c && w.extend(a, c), a.host && a.host.dirty && a.host.dirty(!1), a
										};
										I.setText = function(a, b, c) {
											var d, e = {
												isRectText: !0
											};
											c === !1 ? d = !0 : e.autoColor = c, p(a, b, e, d), a.host && a.host.dirty && a.host.dirty(!1)
										}, I.getFont = function(a, b) {
											var c = b || b.getModel("textStyle");
											return [a.fontStyle || c && c.getShallow("fontStyle") || "", a.fontWeight || c && c.getShallow("fontWeight") || "", (a.fontSize || c && c.getShallow("fontSize") || 12) + "px", a.fontFamily || c && c.getShallow("fontFamily") || "sans-serif"].join(" ")
										}, I.updateProps = function(a, b, c, d, e) {
											v(!0, a, b, c, d, e)
										}, I.initProps = function(a, b, c, d, e) {
											v(!1, a, b, c, d, e)
										}, I.getTransform = function(a, b) {
											for(var c = A.identity([]); a && a !== b;) A.mul(c, a.getLocalTransform(), c), a = a.parent;
											return c
										}, I.applyTransform = function(a, b, c) {
											return b && !w.isArrayLike(b) && (b = C.getLocalTransform(b)), c && (b = A.invert([], b)), B.applyTransform([], a, b)
										}, I.transformDirection = function(a, b, c) {
											var d = 0 === b[4] || 0 === b[5] || 0 === b[0] ? 1 : Math.abs(2 * b[4] / b[0]),
												e = 0 === b[4] || 0 === b[5] || 0 === b[2] ? 1 : Math.abs(2 * b[4] / b[2]),
												f = ["left" === a ? -d : "right" === a ? d : 0, "top" === a ? -e : "bottom" === a ? e : 0];
											return f = I.applyTransform(f, b, c), Math.abs(f[0]) > Math.abs(f[1]) ? f[0] > 0 ? "right" : "left" : f[1] > 0 ? "bottom" : "top"
										}, I.groupTransition = function(a, b, c, d) {
											function e(a) {
												var b = {};
												return a.traverse(function(a) {
													!a.isGroup && a.anid && (b[a.anid] = a)
												}), b
											}

											function f(a) {
												var b = {
													position: B.clone(a.position),
													rotation: a.rotation
												};
												return a.shape && (b.shape = w.extend({}, a.shape)), b
											}
											if(a && b) {
												var g = e(a);
												b.traverse(function(a) {
													if(!a.isGroup && a.anid) {
														var b = g[a.anid];
														if(b) {
															var d = f(a);
															a.attr(f(b)), I.updateProps(a, d, c, a.dataIndex)
														}
													}
												})
											}
										}, I.clipPointsByRect = function(a, b) {
											return w.map(a, function(a) {
												var c = a[0];
												c = F(c, b.x), c = G(c, b.x + b.width);
												var d = a[1];
												return d = F(d, b.y), d = G(d, b.y + b.height), [c, d]
											})
										}, I.clipRectByRect = function(a, b) {
											var c = F(a.x, b.x),
												d = G(a.x + a.width, b.x + b.width),
												e = F(a.y, b.y),
												f = G(a.y + a.height, b.y + b.height);
											return d >= c && f >= e ? {
												x: c,
												y: e,
												width: d - c,
												height: f - e
											} : void 0
										}, I.createIcon = function(a, b, c) {
											b = w.extend({
												rectHover: !0
											}, b);
											var d = b.style = {
												strokeNoScale: !0
											};
											return c = c || {
												x: -1,
												y: -1,
												width: 2,
												height: 2
											}, a ? 0 === a.indexOf("image://") ? (d.image = a.slice(8), w.defaults(d, c), new I.Image(b)) : I.makePath(a.replace("path://", ""), b, c, "center") : void 0
										}, a.exports = I
									}, function(a, b, c) {
										function d(a) {
											return a.replace(/^\s+/, "").replace(/\s+$/, "")
										}

										function e(a) {
											return Math.floor(Math.log(a) / Math.LN10)
										}
										var f = c(1),
											g = {},
											h = 1e-4;
										g.linearMap = function(a, b, c, d) {
											var e = b[1] - b[0],
												f = c[1] - c[0];
											if(0 === e) return 0 === f ? c[0] : (c[0] + c[1]) / 2;
											if(d)
												if(e > 0) {
													if(a <= b[0]) return c[0];
													if(a >= b[1]) return c[1]
												} else {
													if(a >= b[0]) return c[0];
													if(a <= b[1]) return c[1]
												}
											else {
												if(a === b[0]) return c[0];
												if(a === b[1]) return c[1]
											}
											return(a - b[0]) / e * f + c[0]
										}, g.parsePercent = function(a, b) {
											switch(a) {
												case "center":
												case "middle":
													a = "50%";
													break;
												case "left":
												case "top":
													a = "0%";
													break;
												case "right":
												case "bottom":
													a = "100%"
											}
											return "string" == typeof a ? d(a).match(/%$/) ? parseFloat(a) / 100 * b : parseFloat(a) : null == a ? NaN : +a
										}, g.round = function(a, b, c) {
											return null == b && (b = 10), b = Math.min(Math.max(0, b), 20), a = (+a).toFixed(b), c ? a : +a
										}, g.asc = function(a) {
											return a.sort(function(a, b) {
												return a - b
											}), a
										}, g.getPrecision = function(a) {
											if(a = +a, isNaN(a)) return 0;
											for(var b = 1, c = 0; Math.round(a * b) / b !== a;) b *= 10, c++;
											return c
										}, g.getPrecisionSafe = function(a) {
											var b = a.toString(),
												c = b.indexOf("e");
											if(c > 0) {
												var d = +b.slice(c + 1);
												return 0 > d ? -d : 0
											}
											var e = b.indexOf(".");
											return 0 > e ? 0 : b.length - 1 - e
										}, g.getPixelPrecision = function(a, b) {
											var c = Math.log,
												d = Math.LN10,
												e = Math.floor(c(a[1] - a[0]) / d),
												f = Math.round(c(Math.abs(b[1] - b[0])) / d),
												g = Math.min(Math.max(-e + f, 0), 20);
											return isFinite(g) ? g : 20
										}, g.getPercentWithPrecision = function(a, b, c) {
											if(!a[b]) return 0;
											var d = f.reduce(a, function(a, b) {
												return a + (isNaN(b) ? 0 : b)
											}, 0);
											if(0 === d) return 0;
											for(var e = Math.pow(10, c), g = f.map(a, function(a) {
													return(isNaN(a) ? 0 : a) / d * e * 100
												}), h = 100 * e, i = f.map(g, function(a) {
													return Math.floor(a)
												}), j = f.reduce(i, function(a, b) {
													return a + b
												}, 0), k = f.map(g, function(a, b) {
													return a - i[b]
												}); h > j;) {
												for(var l = Number.NEGATIVE_INFINITY, m = null, n = 0, o = k.length; o > n; ++n) k[n] > l && (l = k[n], m = n);
												++i[m], k[m] = 0, ++j
											}
											return i[b] / e
										}, g.MAX_SAFE_INTEGER = 9007199254740991, g.remRadian = function(a) {
											var b = 2 * Math.PI;
											return(a % b + b) % b
										}, g.isRadianAroundZero = function(a) {
											return a > -h && h > a
										};
										var i = /^(?:(\d{4})(?:[-\/](\d{1,2})(?:[-\/](\d{1,2})(?:[T ](\d{1,2})(?::(\d\d)(?::(\d\d)(?:[.,](\d+))?)?)?(Z|[\+\-]\d\d:?\d\d)?)?)?)?)?$/;
										g.getTimezoneOffset = function() {
											return(new Date).getTimezoneOffset()
										}, g.parseDate = function(a) {
											if(a instanceof Date) return a;
											if("string" == typeof a) {
												var b = i.exec(a);
												if(!b) return new Date(NaN);
												var c = g.getTimezoneOffset(),
													d = b[8] ? "Z" === b[8].toUpperCase() ? c : 60 * +b[8].slice(0, 3) + c : 0;
												return new Date(+b[1], +(b[2] || 1) - 1, +b[3] || 1, +b[4] || 0, +(b[5] || 0) - d, +b[6] || 0, +b[7] || 0)
											}
											return null == a ? new Date(NaN) : new Date(Math.round(a))
										}, g.quantity = function(a) {
											return Math.pow(10, e(a))
										}, g.nice = function(a, b) {
											var c, d = e(a),
												f = Math.pow(10, d),
												g = a / f;
											return c = b ? 1.5 > g ? 1 : 2.5 > g ? 2 : 4 > g ? 3 : 7 > g ? 5 : 10 : 1 > g ? 1 : 2 > g ? 2 : 3 > g ? 3 : 5 > g ? 5 : 10, a = c * f, d >= -20 ? +a.toFixed(0 > d ? -d : 0) : a
										}, g.reformIntervals = function(a) {
											function b(a, c, d) {
												return a.interval[d] < c.interval[d] || a.interval[d] === c.interval[d] && (a.close[d] - c.close[d] === (d ? -1 : 1) || !d && b(a, c, 1))
											}
											a.sort(function(a, c) {
												return b(a, c, 0) ? -1 : 1
											});
											for(var c = -(1 / 0), d = 1, e = 0; e < a.length;) {
												for(var f = a[e].interval, g = a[e].close, h = 0; 2 > h; h++) f[h] <= c && (f[h] = c, g[h] = h ? 1 : 1 - d), c = f[h], d = g[h];
												f[0] === f[1] && g[0] * g[1] !== 1 ? a.splice(e, 1) : e++
											}
											return a
										}, g.isNumeric = function(a) {
											return a - parseFloat(a) >= 0
										}, a.exports = g
									}, function(a, b, c) {
										function d(a, b) {
											return a && a.hasOwnProperty(b)
										}
										var e = c(7),
											f = c(4),
											g = c(11),
											h = c(1),
											i = h.each,
											j = h.isObject,
											k = {};
										k.normalizeToArray = function(a) {
											return a instanceof Array ? a : null == a ? [] : [a]
										}, k.defaultEmphasis = function(a, b) {
											if(a)
												for(var c = a.emphasis = a.emphasis || {}, d = a.normal = a.normal || {}, e = 0, f = b.length; f > e; e++) {
													var g = b[e];
													!c.hasOwnProperty(g) && d.hasOwnProperty(g) && (c[g] = d[g]);
												}
										}, k.TEXT_STYLE_OPTIONS = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "rich", "tag", "color", "textBorderColor", "textBorderWidth", "width", "height", "lineHeight", "align", "verticalAlign", "baseline", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY", "textShadowColor", "textShadowBlur", "textShadowOffsetX", "textShadowOffsetY", "backgroundColor", "borderColor", "borderWidth", "borderRadius", "padding"], k.getDataItemValue = function(a) {
											return a && (null == a.value ? a : a.value)
										}, k.isDataItemOption = function(a) {
											return j(a) && !(a instanceof Array)
										}, k.converDataValue = function(a, b) {
											var c = b && b.type;
											return "ordinal" === c ? a : ("time" === c && "number" != typeof a && null != a && "-" !== a && (a = +f.parseDate(a)), null == a || "" === a ? NaN : +a)
										}, k.createDataFormatModel = function(a, b) {
											var c = new g;
											return h.mixin(c, k.dataFormatMixin), c.seriesIndex = b.seriesIndex, c.name = b.name || "", c.mainType = b.mainType, c.subType = b.subType, c.getData = function() {
												return a
											}, c
										}, k.dataFormatMixin = {
											getDataParams: function(a, b) {
												var c = this.getData(b),
													d = this.getRawValue(a, b),
													f = c.getRawIndex(a),
													g = c.getName(a, !0),
													h = c.getRawDataItem(a),
													i = c.getItemVisual(a, "color");
												return {
													componentType: this.mainType,
													componentSubType: this.subType,
													seriesType: "series" === this.mainType ? this.subType : null,
													seriesIndex: this.seriesIndex,
													seriesId: this.id,
													seriesName: this.name,
													name: g,
													dataIndex: f,
													data: h,
													dataType: b,
													value: d,
													color: i,
													marker: e.getTooltipMarker(i),
													$vars: ["seriesName", "name", "value"]
												}
											},
											getFormattedLabel: function(a, b, c, d, f) {
												b = b || "normal";
												var g = this.getData(c),
													h = g.getItemModel(a),
													i = this.getDataParams(a, c);
												null != d && i.value instanceof Array && (i.value = i.value[d]);
												var j = h.get([f || "label", b, "formatter"]);
												return "function" == typeof j ? (i.status = b, j(i)) : "string" == typeof j ? e.formatTpl(j, i) : void 0
											},
											getRawValue: function(a, b) {
												var c = this.getData(b),
													d = c.getRawDataItem(a);
												return null != d ? !j(d) || d instanceof Array ? d : d.value : void 0
											},
											formatTooltip: h.noop
										}, k.mappingToExists = function(a, b) {
											b = (b || []).slice();
											var c = h.map(a || [], function(a, b) {
												return {
													exist: a
												}
											});
											return i(b, function(a, d) {
												if(j(a)) {
													for(var e = 0; e < c.length; e++)
														if(!c[e].option && null != a.id && c[e].exist.id === a.id + "") return c[e].option = a, void(b[d] = null);
													for(var e = 0; e < c.length; e++) {
														var f = c[e].exist;
														if(!(c[e].option || null != f.id && null != a.id || null == a.name || k.isIdInner(a) || k.isIdInner(f) || f.name !== a.name + "")) return c[e].option = a, void(b[d] = null)
													}
												}
											}), i(b, function(a, b) {
												if(j(a)) {
													for(var d = 0; d < c.length; d++) {
														var e = c[d].exist;
														if(!c[d].option && !k.isIdInner(e) && null == a.id) {
															c[d].option = a;
															break
														}
													}
													d >= c.length && c.push({
														option: a
													})
												}
											}), c
										}, k.makeIdAndName = function(a) {
											var b = h.createHashMap();
											i(a, function(a, c) {
												var d = a.exist;
												d && b.set(d.id, a)
											}), i(a, function(a, c) {
												var d = a.option;
												h.assert(!d || null == d.id || !b.get(d.id) || b.get(d.id) === a, "id duplicates: " + (d && d.id)), d && null != d.id && b.set(d.id, a), !a.keyInfo && (a.keyInfo = {})
											}), i(a, function(a, c) {
												var d = a.exist,
													e = a.option,
													f = a.keyInfo;
												if(j(e)) {
													if(f.name = null != e.name ? e.name + "" : d ? d.name : "\x00-", d) f.id = d.id;
													else if(null != e.id) f.id = e.id + "";
													else {
														var g = 0;
														do f.id = "\x00" + f.name + "\x00" + g++; while (b.get(f.id))
													}
													b.set(f.id, a)
												}
											})
										}, k.isIdInner = function(a) {
											return j(a) && a.id && 0 === (a.id + "").indexOf("\x00_ec_\x00")
										}, k.compressBatches = function(a, b) {
											function c(a, b, c) {
												for(var d = 0, e = a.length; e > d; d++)
													for(var f = a[d].seriesId, g = k.normalizeToArray(a[d].dataIndex), h = c && c[f], i = 0, j = g.length; j > i; i++) {
														var l = g[i];
														h && h[l] ? h[l] = null : (b[f] || (b[f] = {}))[l] = 1
													}
											}

											function d(a, b) {
												var c = [];
												for(var e in a)
													if(a.hasOwnProperty(e) && null != a[e])
														if(b) c.push(+e);
														else {
															var f = d(a[e], !0);
															f.length && c.push({
																seriesId: e,
																dataIndex: f
															})
														}
												return c
											}
											var e = {},
												f = {};
											return c(a || [], e), c(b || [], f, e), [d(e), d(f)]
										}, k.queryDataIndex = function(a, b) {
											return null != b.dataIndexInside ? b.dataIndexInside : null != b.dataIndex ? h.isArray(b.dataIndex) ? h.map(b.dataIndex, function(b) {
												return a.indexOfRawIndex(b)
											}) : a.indexOfRawIndex(b.dataIndex) : null != b.name ? h.isArray(b.name) ? h.map(b.name, function(b) {
												return a.indexOfName(b)
											}) : a.indexOfName(b.name) : void 0
										}, k.makeGetter = function() {
											var a = 0;
											return function() {
												var b = "\x00__ec_prop_getter_" + a++;
												return function(a) {
													return a[b] || (a[b] = {})
												}
											}
										}(), k.parseFinder = function(a, b, c) {
											if(h.isString(b)) {
												var e = {};
												e[b + "Index"] = 0, b = e
											}
											var f = c && c.defaultMainType;
											!f || d(b, f + "Index") || d(b, f + "Id") || d(b, f + "Name") || (b[f + "Index"] = 0);
											var g = {};
											return i(b, function(d, e) {
												var d = b[e];
												if("dataIndex" === e || "dataIndexInside" === e) return void(g[e] = d);
												var f = e.match(/^(\w+)(Index|Id|Name)$/) || [],
													i = f[1],
													j = (f[2] || "").toLowerCase();
												if(!(!i || !j || null == d || "index" === j && "none" === d || c && c.includeMainTypes && h.indexOf(c.includeMainTypes, i) < 0)) {
													var k = {
														mainType: i
													};
													"index" === j && "all" === d || (k[j] = d);
													var l = a.queryComponents(k);
													g[i + "Models"] = l, g[i + "Model"] = l[0]
												}
											}), g
										}, k.dataDimToCoordDim = function(a, b) {
											var c = a.dimensions;
											b = a.getDimension(b);
											for(var d = 0; d < c.length; d++) {
												var e = a.getDimensionInfo(c[d]);
												if(e.name === b) return e.coordDim
											}
										}, k.coordDimToDataDim = function(a, b) {
											var c = [];
											return i(a.dimensions, function(d) {
												var e = a.getDimensionInfo(d);
												e.coordDim === b && (c[e.coordDimIndex] = e.name)
											}), c
										}, k.otherDimToDataDim = function(a, b) {
											var c = [];
											return i(a.dimensions, function(d) {
												var e = a.getDimensionInfo(d),
													f = e.otherDims,
													g = f[b];
												null != g && g !== !1 && (c[g] = e.name)
											}), c
										}, a.exports = k
									}, function(a, b) {
										var c = "undefined" == typeof Float32Array ? Array : Float32Array,
											d = {
												create: function(a, b) {
													var d = new c(2);
													return null == a && (a = 0), null == b && (b = 0), d[0] = a, d[1] = b, d
												},
												copy: function(a, b) {
													return a[0] = b[0], a[1] = b[1], a
												},
												clone: function(a) {
													var b = new c(2);
													return b[0] = a[0], b[1] = a[1], b
												},
												set: function(a, b, c) {
													return a[0] = b, a[1] = c, a
												},
												add: function(a, b, c) {
													return a[0] = b[0] + c[0], a[1] = b[1] + c[1], a
												},
												scaleAndAdd: function(a, b, c, d) {
													return a[0] = b[0] + c[0] * d, a[1] = b[1] + c[1] * d, a
												},
												sub: function(a, b, c) {
													return a[0] = b[0] - c[0], a[1] = b[1] - c[1], a
												},
												len: function(a) {
													return Math.sqrt(this.lenSquare(a))
												},
												lenSquare: function(a) {
													return a[0] * a[0] + a[1] * a[1]
												},
												mul: function(a, b, c) {
													return a[0] = b[0] * c[0], a[1] = b[1] * c[1], a
												},
												div: function(a, b, c) {
													return a[0] = b[0] / c[0], a[1] = b[1] / c[1], a
												},
												dot: function(a, b) {
													return a[0] * b[0] + a[1] * b[1]
												},
												scale: function(a, b, c) {
													return a[0] = b[0] * c, a[1] = b[1] * c, a
												},
												normalize: function(a, b) {
													var c = d.len(b);
													return 0 === c ? (a[0] = 0, a[1] = 0) : (a[0] = b[0] / c, a[1] = b[1] / c), a
												},
												distance: function(a, b) {
													return Math.sqrt((a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1]))
												},
												distanceSquare: function(a, b) {
													return(a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1])
												},
												negate: function(a, b) {
													return a[0] = -b[0], a[1] = -b[1], a
												},
												lerp: function(a, b, c, d) {
													return a[0] = b[0] + d * (c[0] - b[0]), a[1] = b[1] + d * (c[1] - b[1]), a
												},
												applyTransform: function(a, b, c) {
													var d = b[0],
														e = b[1];
													return a[0] = c[0] * d + c[2] * e + c[4], a[1] = c[1] * d + c[3] * e + c[5], a
												},
												min: function(a, b, c) {
													return a[0] = Math.min(b[0], c[0]), a[1] = Math.min(b[1], c[1]), a
												},
												max: function(a, b, c) {
													return a[0] = Math.max(b[0], c[0]), a[1] = Math.max(b[1], c[1]), a
												}
											};
										d.length = d.len, d.lengthSquare = d.lenSquare, d.dist = d.distance, d.distSquare = d.distanceSquare, a.exports = d
									}, function(a, b, c) {
										var d = c(1),
											e = c(4),
											f = c(16),
											g = {};
										g.addCommas = function(a) {
											return isNaN(a) ? "-" : (a = (a + "").split("."), a[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,") + (a.length > 1 ? "." + a[1] : ""))
										}, g.toCamelCase = function(a, b) {
											return a = (a || "").toLowerCase().replace(/-(.)/g, function(a, b) {
												return b.toUpperCase()
											}), b && a && (a = a.charAt(0).toUpperCase() + a.slice(1)), a
										}, g.normalizeCssArray = d.normalizeCssArray;
										var h = g.encodeHTML = function(a) {
												return String(a).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
											},
											i = ["a", "b", "c", "d", "e", "f", "g"],
											j = function(a, b) {
												return "{" + a + (null == b ? "" : b) + "}"
											};
										g.formatTpl = function(a, b, c) {
											d.isArray(b) || (b = [b]);
											var e = b.length;
											if(!e) return "";
											for(var f = b[0].$vars || [], g = 0; g < f.length; g++) {
												var k = i[g],
													l = j(k, 0);
												a = a.replace(j(k), c ? h(l) : l)
											}
											for(var m = 0; e > m; m++)
												for(var n = 0; n < f.length; n++) {
													var l = b[m][f[n]];
													a = a.replace(j(i[n], m), c ? h(l) : l)
												}
											return a
										}, g.formatTplSimple = function(a, b, c) {
											return d.each(b, function(b, d) {
												a = a.replace("{" + d + "}", c ? h(b) : b)
											}), a
										}, g.getTooltipMarker = function(a, b) {
											return a ? '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + g.encodeHTML(a) + ";" + (b || "") + '"></span>' : ""
										};
										var k = function(a) {
											return 10 > a ? "0" + a : a
										};
										g.formatTime = function(a, b, c) {
											"week" !== a && "month" !== a && "quarter" !== a && "half-year" !== a && "year" !== a || (a = "MM-dd\nyyyy");
											var d = e.parseDate(b),
												f = c ? "UTC" : "",
												g = d["get" + f + "FullYear"](),
												h = d["get" + f + "Month"]() + 1,
												i = d["get" + f + "Date"](),
												j = d["get" + f + "Hours"](),
												l = d["get" + f + "Minutes"](),
												m = d["get" + f + "Seconds"]();
											return a = a.replace("MM", k(h)).replace("M", h).replace("yyyy", g).replace("yy", g % 100).replace("dd", k(i)).replace("d", i).replace("hh", k(j)).replace("h", j).replace("mm", k(l)).replace("m", l).replace("ss", k(m)).replace("s", m)
										}, g.capitalFirst = function(a) {
											return a ? a.charAt(0).toUpperCase() + a.substr(1) : a
										}, g.truncateText = f.truncateText, g.getTextRect = f.getBoundingRect, a.exports = g
									}, function(a, b, c) {
										function d(a) {
											e.call(this, a), this.path = null
										}
										var e = c(38),
											f = c(1),
											g = c(27),
											h = c(167),
											i = c(74),
											j = i.prototype.getCanvasPattern,
											k = Math.abs,
											l = new g(!0);
										d.prototype = {
											constructor: d,
											type: "path",
											__dirtyPath: !0,
											strokeContainThreshold: 5,
											brush: function(a, b) {
												var c = this.style,
													d = this.path || l,
													e = c.hasStroke(),
													f = c.hasFill(),
													g = c.fill,
													h = c.stroke,
													i = f && !!g.colorStops,
													k = e && !!h.colorStops,
													m = f && !!g.image,
													n = e && !!h.image;
												if(c.bind(a, this, b), this.setTransform(a), this.__dirty) {
													var o;
													i && (o = o || this.getBoundingRect(), this._fillGradient = c.getGradient(a, g, o)), k && (o = o || this.getBoundingRect(), this._strokeGradient = c.getGradient(a, h, o))
												}
												i ? a.fillStyle = this._fillGradient : m && (a.fillStyle = j.call(g, a)), k ? a.strokeStyle = this._strokeGradient : n && (a.strokeStyle = j.call(h, a));
												var p = c.lineDash,
													q = c.lineDashOffset,
													r = !!a.setLineDash,
													s = this.getGlobalScale();
												d.setScale(s[0], s[1]), this.__dirtyPath || p && !r && e ? (d.beginPath(a), p && !r && (d.setLineDash(p), d.setLineDashOffset(q)), this.buildPath(d, this.shape, !1), this.path && (this.__dirtyPath = !1)) : (a.beginPath(), this.path.rebuildPath(a)), f && d.fill(a), p && r && (a.setLineDash(p), a.lineDashOffset = q), e && d.stroke(a), p && r && a.setLineDash([]), this.restoreTransform(a), null != c.text && this.drawRectText(a, this.getBoundingRect())
											},
											buildPath: function(a, b, c) {},
											createPathProxy: function() {
												this.path = new g
											},
											getBoundingRect: function() {
												var a = this._rect,
													b = this.style,
													c = !a;
												if(c) {
													var d = this.path;
													d || (d = this.path = new g), this.__dirtyPath && (d.beginPath(), this.buildPath(d, this.shape, !1)), a = d.getBoundingRect()
												}
												if(this._rect = a, b.hasStroke()) {
													var e = this._rectWithStroke || (this._rectWithStroke = a.clone());
													if(this.__dirty || c) {
														e.copy(a);
														var f = b.lineWidth,
															h = b.strokeNoScale ? this.getLineScale() : 1;
														b.hasFill() || (f = Math.max(f, this.strokeContainThreshold || 4)), h > 1e-10 && (e.width += f / h, e.height += f / h, e.x -= f / h / 2, e.y -= f / h / 2)
													}
													return e
												}
												return a
											},
											contain: function(a, b) {
												var c = this.transformCoordToLocal(a, b),
													d = this.getBoundingRect(),
													e = this.style;
												if(a = c[0], b = c[1], d.contain(a, b)) {
													var f = this.path.data;
													if(e.hasStroke()) {
														var g = e.lineWidth,
															i = e.strokeNoScale ? this.getLineScale() : 1;
														if(i > 1e-10 && (e.hasFill() || (g = Math.max(g, this.strokeContainThreshold)), h.containStroke(f, g / i, a, b))) return !0
													}
													if(e.hasFill()) return h.contain(f, a, b)
												}
												return !1
											},
											dirty: function(a) {
												null == a && (a = !0), a && (this.__dirtyPath = a, this._rect = null), this.__dirty = !0, this.__zr && this.__zr.refresh(), this.__clipTarget && this.__clipTarget.dirty()
											},
											animateShape: function(a) {
												return this.animate("shape", a)
											},
											attrKV: function(a, b) {
												"shape" === a ? (this.setShape(b), this.__dirtyPath = !0, this._rect = null) : e.prototype.attrKV.call(this, a, b)
											},
											setShape: function(a, b) {
												var c = this.shape;
												if(c) {
													if(f.isObject(a))
														for(var d in a) a.hasOwnProperty(d) && (c[d] = a[d]);
													else c[a] = b;
													this.dirty(!0)
												}
												return this
											},
											getLineScale: function() {
												var a = this.transform;
												return a && k(a[0] - 1) > 1e-10 && k(a[3] - 1) > 1e-10 ? Math.sqrt(k(a[0] * a[3] - a[2] * a[1])) : 1
											}
										}, d.extend = function(a) {
											var b = function(b) {
												d.call(this, b), a.style && this.style.extendFrom(a.style, !1);
												var c = a.shape;
												if(c) {
													this.shape = this.shape || {};
													var e = this.shape;
													for(var f in c) !e.hasOwnProperty(f) && c.hasOwnProperty(f) && (e[f] = c[f])
												}
												a.init && a.init.call(this, b)
											};
											f.inherits(b, d);
											for(var c in a) "style" !== c && "shape" !== c && (b.prototype[c] = a[c]);
											return b
										}, f.inherits(d, e), a.exports = d
									}, function(a, b, c) {
										"use strict";

										function d(a, b, c, d, e) {
											var f = 0,
												g = 0;
											null == d && (d = 1 / 0), null == e && (e = 1 / 0);
											var h = 0;
											b.eachChild(function(i, j) {
												var k, l, m = i.position,
													n = i.getBoundingRect(),
													o = b.childAt(j + 1),
													p = o && o.getBoundingRect();
												if("horizontal" === a) {
													var q = n.width + (p ? -p.x + n.x : 0);
													k = f + q, k > d || i.newline ? (f = 0, k = q, g += h + c, h = n.height) : h = Math.max(h, n.height)
												} else {
													var r = n.height + (p ? -p.y + n.y : 0);
													l = g + r, l > e || i.newline ? (f += h + c, g = 0, l = r, h = n.width) : h = Math.max(h, n.width)
												}
												i.newline || (m[0] = f, m[1] = g, "horizontal" === a ? f = k + c : g = l + c)
											})
										}
										var e = c(1),
											f = c(12),
											g = c(4),
											h = c(7),
											i = g.parsePercent,
											j = e.each,
											k = {},
											l = k.LOCATION_PARAMS = ["left", "right", "top", "bottom", "width", "height"],
											m = k.HV_NAMES = [
												["width", "left", "right"],
												["height", "top", "bottom"]
											];
										k.box = d, k.vbox = e.curry(d, "vertical"), k.hbox = e.curry(d, "horizontal"), k.getAvailableSize = function(a, b, c) {
											var d = b.width,
												e = b.height,
												f = i(a.x, d),
												g = i(a.y, e),
												j = i(a.x2, d),
												k = i(a.y2, e);
											return(isNaN(f) || isNaN(parseFloat(a.x))) && (f = 0), (isNaN(j) || isNaN(parseFloat(a.x2))) && (j = d), (isNaN(g) || isNaN(parseFloat(a.y))) && (g = 0), (isNaN(k) || isNaN(parseFloat(a.y2))) && (k = e), c = h.normalizeCssArray(c || 0), {
												width: Math.max(j - f - c[1] - c[3], 0),
												height: Math.max(k - g - c[0] - c[2], 0)
											}
										}, k.getLayoutRect = function(a, b, c) {
											c = h.normalizeCssArray(c || 0);
											var d = b.width,
												e = b.height,
												g = i(a.left, d),
												j = i(a.top, e),
												k = i(a.right, d),
												l = i(a.bottom, e),
												m = i(a.width, d),
												n = i(a.height, e),
												o = c[2] + c[0],
												p = c[1] + c[3],
												q = a.aspect;
											switch(isNaN(m) && (m = d - k - p - g), isNaN(n) && (n = e - l - o - j), null != q && (isNaN(m) && isNaN(n) && (q > d / e ? m = .8 * d : n = .8 * e), isNaN(m) && (m = q * n), isNaN(n) && (n = m / q)), isNaN(g) && (g = d - k - m - p), isNaN(j) && (j = e - l - n - o), a.left || a.right) {
												case "center":
													g = d / 2 - m / 2 - c[3];
													break;
												case "right":
													g = d - m - p
											}
											switch(a.top || a.bottom) {
												case "middle":
												case "center":
													j = e / 2 - n / 2 - c[0];
													break;
												case "bottom":
													j = e - n - o
											}
											g = g || 0, j = j || 0, isNaN(m) && (m = d - p - g - (k || 0)), isNaN(n) && (n = e - o - j - (l || 0));
											var r = new f(g + c[3], j + c[0], m, n);
											return r.margin = c, r
										}, k.positionElement = function(a, b, c, d, g) {
											var h = !g || !g.hv || g.hv[0],
												i = !g || !g.hv || g.hv[1],
												j = g && g.boundingMode || "all";
											if(h || i) {
												var l;
												if("raw" === j) l = "group" === a.type ? new f(0, 0, +b.width || 0, +b.height || 0) : a.getBoundingRect();
												else if(l = a.getBoundingRect(), a.needLocalTransform()) {
													var m = a.getLocalTransform();
													l = l.clone(), l.applyTransform(m)
												}
												b = k.getLayoutRect(e.defaults({
													width: l.width,
													height: l.height
												}, b), c, d);
												var n = a.position,
													o = h ? b.x - l.x : 0,
													p = i ? b.y - l.y : 0;
												a.attr("position", "raw" === j ? [o, p] : [n[0] + o, n[1] + p])
											}
										}, k.sizeCalculable = function(a, b) {
											return null != a[m[b][0]] || null != a[m[b][1]] && null != a[m[b][2]]
										}, k.mergeLayoutParam = function(a, b, c) {
											function d(c, d) {
												var e = {},
													h = 0,
													k = {},
													l = 0,
													m = 2;
												if(j(c, function(b) {
														k[b] = a[b]
													}), j(c, function(a) {
														f(b, a) && (e[a] = k[a] = b[a]), g(e, a) && h++, g(k, a) && l++
													}), i[d]) return g(b, c[1]) ? k[c[2]] = null : g(b, c[2]) && (k[c[1]] = null), k;
												if(l !== m && h) {
													if(h >= m) return e;
													for(var n = 0; n < c.length; n++) {
														var o = c[n];
														if(!f(e, o) && f(a, o)) {
															e[o] = a[o];
															break
														}
													}
													return e
												}
												return k
											}

											function f(a, b) {
												return a.hasOwnProperty(b)
											}

											function g(a, b) {
												return null != a[b] && "auto" !== a[b]
											}

											function h(a, b, c) {
												j(a, function(a) {
													b[a] = c[a]
												})
											}!e.isObject(c) && (c = {});
											var i = c.ignoreSize;
											!e.isArray(i) && (i = [i, i]);
											var k = d(m[0], 0),
												l = d(m[1], 1);
											h(m[0], a, k), h(m[1], a, l)
										}, k.getLayoutParams = function(a) {
											return k.copyLayoutParams({}, a)
										}, k.copyLayoutParams = function(a, b) {
											return b && a && j(l, function(c) {
												b.hasOwnProperty(c) && (a[c] = b[c])
											}), a
										}, a.exports = k
									}, function(a, b) {
										function c(a) {
											var b = {},
												c = {},
												d = a.match(/Firefox\/([\d.]+)/),
												e = a.match(/MSIE\s([\d.]+)/) || a.match(/Trident\/.+?rv:(([\d.]+))/),
												f = a.match(/Edge\/([\d.]+)/),
												g = /micromessenger/i.test(a);
											return d && (c.firefox = !0, c.version = d[1]), e && (c.ie = !0, c.version = e[1]), f && (c.edge = !0, c.version = f[1]), g && (c.weChat = !0), {
												browser: c,
												os: b,
												node: !1,
												canvasSupported: !!document.createElement("canvas").getContext,
												touchEventsSupported: "ontouchstart" in window && !c.ie && !c.edge,
												pointerEventsSupported: "onpointerdown" in window && (c.edge || c.ie && c.version >= 11)
											}
										}
										var d = {};
										d = "undefined" == typeof navigator ? {
											browser: {},
											os: {},
											node: !0,
											canvasSupported: !0
										} : c(navigator.userAgent), a.exports = d
									}, function(a, b, c) {
										function d(a, b, c) {
											this.parentModel = b, this.ecModel = c, this.option = a
										}

										function e(a, b, c) {
											for(var d = 0; d < b.length && (!b[d] || (a = a && "object" == typeof a ? a[b[d]] : null, null != a)); d++);
											return null == a && c && (a = c.get(b)), a
										}

										function f(a, b) {
											var c = h.get(a, "getParent");
											return c ? c.call(a, b) : a.parentModel
										}
										var g = c(1),
											h = c(15),
											i = c(10);
										d.prototype = {
											constructor: d,
											init: null,
											mergeOption: function(a) {
												g.merge(this.option, a, !0)
											},
											get: function(a, b) {
												return null == a ? this.option : e(this.option, this.parsePath(a), !b && f(this, a))
											},
											getShallow: function(a, b) {
												var c = this.option,
													d = null == c ? c : c[a],
													e = !b && f(this, a);
												return null == d && e && (d = e.getShallow(a)), d
											},
											getModel: function(a, b) {
												var c, g = null == a ? this.option : e(this.option, a = this.parsePath(a));
												return b = b || (c = f(this, a)) && c.getModel(a), new d(g, b, this.ecModel)
											},
											isEmpty: function() {
												return null == this.option
											},
											restoreData: function() {},
											clone: function() {
												var a = this.constructor;
												return new a(g.clone(this.option))
											},
											setReadOnly: function(a) {
												h.setReadOnly(this, a)
											},
											parsePath: function(a) {
												return "string" == typeof a && (a = a.split(".")), a
											},
											customizeGetParent: function(a) {
												h.set(this, "getParent", a)
											},
											isAnimationEnabled: function() {
												if(!i.node) {
													if(null != this.option.animation) return !!this.option.animation;
													if(this.parentModel) return this.parentModel.isAnimationEnabled()
												}
											}
										}, h.enableClassExtend(d);
										var j = g.mixin;
										j(d, c(149)), j(d, c(146)), j(d, c(150)), j(d, c(148)), a.exports = d
									}, function(a, b, c) {
										"use strict";

										function d(a, b, c, d) {
											0 > c && (a += c, c = -c), 0 > d && (b += d, d = -d), this.x = a, this.y = b, this.width = c, this.height = d
										}
										var e = c(6),
											f = c(19),
											g = e.applyTransform,
											h = Math.min,
											i = Math.max;
										d.prototype = {
											constructor: d,
											union: function(a) {
												var b = h(a.x, this.x),
													c = h(a.y, this.y);
												this.width = i(a.x + a.width, this.x + this.width) - b, this.height = i(a.y + a.height, this.y + this.height) - c, this.x = b, this.y = c
											},
											applyTransform: function() {
												var a = [],
													b = [],
													c = [],
													d = [];
												return function(e) {
													if(e) {
														a[0] = c[0] = this.x, a[1] = d[1] = this.y, b[0] = d[0] = this.x + this.width, b[1] = c[1] = this.y + this.height, g(a, a, e), g(b, b, e), g(c, c, e), g(d, d, e), this.x = h(a[0], b[0], c[0], d[0]), this.y = h(a[1], b[1], c[1], d[1]);
														var f = i(a[0], b[0], c[0], d[0]),
															j = i(a[1], b[1], c[1], d[1]);
														this.width = f - this.x, this.height = j - this.y
													}
												}
											}(),
											calculateTransform: function(a) {
												var b = this,
													c = a.width / b.width,
													d = a.height / b.height,
													e = f.create();
												return f.translate(e, e, [-b.x, -b.y]), f.scale(e, e, [c, d]), f.translate(e, e, [a.x, a.y]), e
											},
											intersect: function(a) {
												if(!a) return !1;
												a instanceof d || (a = d.create(a));
												var b = this,
													c = b.x,
													e = b.x + b.width,
													f = b.y,
													g = b.y + b.height,
													h = a.x,
													i = a.x + a.width,
													j = a.y,
													k = a.y + a.height;
												return !(h > e || c > i || j > g || f > k)
											},
											contain: function(a, b) {
												var c = this;
												return a >= c.x && a <= c.x + c.width && b >= c.y && b <= c.y + c.height
											},
											clone: function() {
												return new d(this.x, this.y, this.width, this.height)
											},
											copy: function(a) {
												this.x = a.x, this.y = a.y, this.width = a.width, this.height = a.height
											},
											plain: function() {
												return {
													x: this.x,
													y: this.y,
													width: this.width,
													height: this.height
												}
											}
										}, d.create = function(a) {
											return new d(a.x, a.y, a.width, a.height)
										}, a.exports = d
									}, function(a, b, c) {
										function d(a) {
											var b = [];
											return f.each(k.getClassesByMainType(a), function(a) {
												g.apply(b, a.prototype.dependencies || [])
											}), f.map(b, function(a) {
												return i.parseClassType(a).main
											})
										}
										var e = c(11),
											f = c(1),
											g = Array.prototype.push,
											h = c(50),
											i = c(15),
											j = c(9),
											k = e.extend({
												type: "component",
												id: "",
												name: "",
												mainType: "",
												subType: "",
												componentIndex: 0,
												defaultOption: null,
												ecModel: null,
												dependentModels: [],
												uid: null,
												layoutMode: null,
												$constructor: function(a, b, c, d) {
													e.call(this, a, b, c, d), this.uid = h.getUID("componentModel")
												},
												init: function(a, b, c, d) {
													this.mergeDefaultAndTheme(a, c)
												},
												mergeDefaultAndTheme: function(a, b) {
													var c = this.layoutMode,
														d = c ? j.getLayoutParams(a) : {},
														e = b.getTheme();
													f.merge(a, e.get(this.mainType)), f.merge(a, this.getDefaultOption()), c && j.mergeLayoutParam(a, d, c)
												},
												mergeOption: function(a, b) {
													f.merge(this.option, a, !0);
													var c = this.layoutMode;
													c && j.mergeLayoutParam(this.option, a, c)
												},
												optionUpdated: function(a, b) {},
												getDefaultOption: function() {
													if(!i.hasOwn(this, "__defaultOption")) {
														for(var a = [], b = this.constructor; b;) {
															var c = b.prototype.defaultOption;
															c && a.push(c), b = b.superClass
														}
														for(var d = {}, e = a.length - 1; e >= 0; e--) d = f.merge(d, a[e], !0);
														i.set(this, "__defaultOption", d)
													}
													return i.get(this, "__defaultOption")
												},
												getReferringComponents: function(a) {
													return this.ecModel.queryComponents({
														mainType: a,
														index: this.get(a + "Index", !0),
														id: this.get(a + "Id", !0)
													})
												}
											});
										i.enableClassManagement(k, {
											registerWhenExtend: !0
										}), h.enableSubTypeDefaulter(k), h.enableTopologicalTravel(k, d), f.mixin(k, c(147)), a.exports = k
									}, function(a, b, c) {
										(function(b) {
											function d(a, b) {
												o.each(r.concat(b.__wrappedMethods || []), function(c) {
													b.hasOwnProperty(c) && (a[c] = b[c])
												}), a.__wrappedMethods = b.__wrappedMethods
											}

											function e(a) {
												this._array = a || []
											}

											function f(a) {
												return o.isArray(a) || (a = [a]), a
											}

											function g(a, b) {
												var c = a.dimensions,
													e = new s(o.map(c, a.getDimensionInfo, a), a.hostModel);
												d(e, a);
												for(var f = e._storage = {}, g = a._storage, h = 0; h < c.length; h++) {
													var i = c[h],
														j = g[i];
													o.indexOf(b, i) >= 0 ? f[i] = new j.constructor(g[i].length) : f[i] = g[i]
												}
												return e
											}
											var h = "undefined",
												i = "undefined" == typeof window ? b : window,
												j = typeof i.Float64Array === h ? Array : i.Float64Array,
												k = typeof i.Int32Array === h ? Array : i.Int32Array,
												l = {
													"float": j,
													"int": k,
													ordinal: Array,
													number: Array,
													time: Array
												},
												m = c(11),
												n = c(44),
												o = c(1),
												p = c(5),
												q = o.isObject,
												r = ["stackedOn", "hasItemOption", "_nameList", "_idList", "_rawData"];
											e.prototype.pure = !1, e.prototype.count = function() {
												return this._array.length
											}, e.prototype.getItem = function(a) {
												return this._array[a]
											};
											var s = function(a, b) {
													a = a || ["x", "y"];
													for(var c = {}, d = [], e = 0; e < a.length; e++) {
														var f, g = {};
														"string" == typeof a[e] ? (f = a[e], g = {
															name: f,
															coordDim: f,
															coordDimIndex: 0,
															stackable: !1,
															type: "number"
														}) : (g = a[e], f = g.name, g.type = g.type || "number", g.coordDim || (g.coordDim = f, g.coordDimIndex = 0)), g.otherDims = g.otherDims || {}, d.push(f), c[f] = g
													}
													this.dimensions = d, this._dimensionInfos = c, this.hostModel = b, this.dataType, this.indices = [], this._storage = {}, this._nameList = [], this._idList = [], this._optionModels = [], this.stackedOn = null, this._visual = {}, this._layout = {}, this._itemVisuals = [], this._itemLayouts = [], this._graphicEls = [], this._rawData, this._extent
												},
												t = s.prototype;
											t.type = "list", t.hasItemOption = !0, t.getDimension = function(a) {
												return isNaN(a) || (a = this.dimensions[a] || a), a
											}, t.getDimensionInfo = function(a) {
												return o.clone(this._dimensionInfos[this.getDimension(a)])
											}, t.initData = function(a, b, c) {
												a = a || [];
												var d = o.isArray(a);
												d && (a = new e(a)), this._rawData = a;
												var f, g = this._storage = {},
													h = this.indices = [],
													i = this.dimensions,
													j = this._dimensionInfos,
													k = a.count(),
													m = [],
													n = {};
												b = b || [];
												for(var q = 0; q < i.length; q++) {
													var r = j[i[q]];
													0 === r.otherDims.itemName && (f = q);
													var s = l[r.type];
													g[i[q]] = new s(k)
												}
												var t = this;
												c || (t.hasItemOption = !1), c = c || function(a, b, c, d) {
													var e = p.getDataItemValue(a);
													return p.isDataItemOption(a) && (t.hasItemOption = !0), p.converDataValue(e instanceof Array ? e[d] : e, j[b])
												};
												for(var q = 0; k > q; q++) {
													for(var u = a.getItem(q), v = 0; v < i.length; v++) {
														var w = i[v],
															x = g[w];
														x[q] = c(u, w, q, v)
													}
													h.push(q)
												}
												for(var q = 0; k > q; q++) {
													var u = a.getItem(q);
													!b[q] && u && (null != u.name ? b[q] = u.name : null != f && (b[q] = g[i[f]][q]));
													var y = b[q] || "",
														z = u && u.id;
													!z && y && (n[y] = n[y] || 0, z = y, n[y] > 0 && (z += "__ec__" + n[y]), n[y]++), z && (m[q] = z)
												}
												this._nameList = b, this._idList = m
											}, t.count = function() {
												return this.indices.length
											}, t.get = function(a, b, c) {
												var d = this._storage,
													e = this.indices[b];
												if(null == e || !d[a]) return NaN;
												var f = d[a][e];
												if(c) {
													var g = this._dimensionInfos[a];
													if(g && g.stackable)
														for(var h = this.stackedOn; h;) {
															var i = h.get(a, b);
															(f >= 0 && i > 0 || 0 >= f && 0 > i) && (f += i), h = h.stackedOn
														}
												}
												return f
											}, t.getValues = function(a, b, c) {
												var d = [];
												o.isArray(a) || (c = b, b = a, a = this.dimensions);
												for(var e = 0, f = a.length; f > e; e++) d.push(this.get(a[e], b, c));
												return d
											}, t.hasValue = function(a) {
												for(var b = this.dimensions, c = this._dimensionInfos, d = 0, e = b.length; e > d; d++)
													if("ordinal" !== c[b[d]].type && isNaN(this.get(b[d], a))) return !1;
												return !0
											}, t.getDataExtent = function(a, b, c) {
												a = this.getDimension(a);
												var d = this._storage[a],
													e = this.getDimensionInfo(a);
												b = e && e.stackable && b;
												var f, g = (this._extent || (this._extent = {}))[a + !!b];
												if(g) return g;
												if(d) {
													for(var h = 1 / 0, i = -(1 / 0), j = 0, k = this.count(); k > j; j++) f = this.get(a, j, b), c && !c(f, a, j) || (h > f && (h = f), f > i && (i = f));
													return this._extent[a + !!b] = [h, i]
												}
												return [1 / 0, -(1 / 0)]
											}, t.getSum = function(a, b) {
												var c = this._storage[a],
													d = 0;
												if(c)
													for(var e = 0, f = this.count(); f > e; e++) {
														var g = this.get(a, e, b);
														isNaN(g) || (d += g)
													}
												return d
											}, t.indexOf = function(a, b) {
												var c = this._storage,
													d = c[a],
													e = this.indices;
												if(d)
													for(var f = 0, g = e.length; g > f; f++) {
														var h = e[f];
														if(d[h] === b) return f
													}
												return -1
											}, t.indexOfName = function(a) {
												for(var b = this.indices, c = this._nameList, d = 0, e = b.length; e > d; d++) {
													var f = b[d];
													if(c[f] === a) return d
												}
												return -1
											}, t.indexOfRawIndex = function(a) {
												var b = this.indices,
													c = b[a];
												if(null != c && c === a) return a;
												for(var d = 0, e = b.length - 1; e >= d;) {
													var f = (d + e) / 2 | 0;
													if(b[f] < a) d = f + 1;
													else {
														if(!(b[f] > a)) return f;
														e = f - 1
													}
												}
												return -1
											}, t.indicesOfNearest = function(a, b, c, d) {
												var e = this._storage,
													f = e[a],
													g = [];
												if(!f) return g;
												null == d && (d = 1 / 0);
												for(var h = Number.MAX_VALUE, i = -1, j = 0, k = this.count(); k > j; j++) {
													var l = b - this.get(a, j, c),
														m = Math.abs(l);
													d >= l && h >= m && ((h > m || l >= 0 && 0 > i) && (h = m, i = l, g.length = 0), g.push(j))
												}
												return g
											}, t.getRawIndex = function(a) {
												var b = this.indices[a];
												return null == b ? -1 : b
											}, t.getRawDataItem = function(a) {
												return this._rawData.getItem(this.getRawIndex(a))
											}, t.getName = function(a) {
												return this._nameList[this.indices[a]] || ""
											}, t.getId = function(a) {
												return this._idList[this.indices[a]] || this.getRawIndex(a) + ""
											}, t.each = function(a, b, c, d) {
												"function" == typeof a && (d = c, c = b, b = a, a = []), a = o.map(f(a), this.getDimension, this);
												var e = [],
													g = a.length,
													h = this.indices;
												d = d || this;
												for(var i = 0; i < h.length; i++) switch(g) {
													case 0:
														b.call(d, i);
														break;
													case 1:
														b.call(d, this.get(a[0], i, c), i);
														break;
													case 2:
														b.call(d, this.get(a[0], i, c), this.get(a[1], i, c), i);
														break;
													default:
														for(var j = 0; g > j; j++) e[j] = this.get(a[j], i, c);
														e[j] = i, b.apply(d, e)
												}
											}, t.filterSelf = function(a, b, c, d) {
												"function" == typeof a && (d = c, c = b, b = a, a = []), a = o.map(f(a), this.getDimension, this);
												var e = [],
													g = [],
													h = a.length,
													i = this.indices;
												d = d || this;
												for(var j = 0; j < i.length; j++) {
													var k;
													if(h)
														if(1 === h) k = b.call(d, this.get(a[0], j, c), j);
														else {
															for(var l = 0; h > l; l++) g[l] = this.get(a[l], j, c);
															g[l] = j, k = b.apply(d, g)
														}
													else k = b.call(d, j);
													k && e.push(i[j])
												}
												return this.indices = e, this._extent = {}, this
											}, t.mapArray = function(a, b, c, d) {
												"function" == typeof a && (d = c, c = b, b = a, a = []);
												var e = [];
												return this.each(a, function() {
													e.push(b && b.apply(this, arguments))
												}, c, d), e
											}, t.map = function(a, b, c, d) {
												a = o.map(f(a), this.getDimension, this);
												var e = g(this, a),
													h = e.indices = this.indices,
													i = e._storage,
													j = [];
												return this.each(a, function() {
													var c = arguments[arguments.length - 1],
														d = b && b.apply(this, arguments);
													if(null != d) {
														"number" == typeof d && (j[0] = d, d = j);
														for(var e = 0; e < d.length; e++) {
															var f = a[e],
																g = i[f],
																k = h[c];
															g && (g[k] = d[e])
														}
													}
												}, c, d), e
											}, t.downSample = function(a, b, c, d) {
												for(var e = g(this, [a]), f = this._storage, h = e._storage, i = this.indices, j = e.indices = [], k = [], l = [], m = Math.floor(1 / b), n = h[a], o = this.count(), p = 0; p < f[a].length; p++) h[a][p] = f[a][p];
												for(var p = 0; o > p; p += m) {
													m > o - p && (m = o - p, k.length = m);
													for(var q = 0; m > q; q++) {
														var r = i[p + q];
														k[q] = n[r], l[q] = r
													}
													var s = c(k),
														r = l[d(k, s) || 0];
													n[r] = s, j.push(r)
												}
												return e
											}, t.getItemModel = function(a) {
												var b = this.hostModel;
												return a = this.indices[a], new m(this._rawData.getItem(a), b, b && b.ecModel)
											}, t.diff = function(a) {
												var b, c = this._idList,
													d = a && a._idList,
													e = "e\x00\x00";
												return new n(a ? a.indices : [], this.indices, function(a) {
													return null != (b = d[a]) ? b : e + a
												}, function(a) {
													return null != (b = c[a]) ? b : e + a
												})
											}, t.getVisual = function(a) {
												var b = this._visual;
												return b && b[a]
											}, t.setVisual = function(a, b) {
												if(q(a))
													for(var c in a) a.hasOwnProperty(c) && this.setVisual(c, a[c]);
												else this._visual = this._visual || {}, this._visual[a] = b
											}, t.setLayout = function(a, b) {
												if(q(a))
													for(var c in a) a.hasOwnProperty(c) && this.setLayout(c, a[c]);
												else this._layout[a] = b
											}, t.getLayout = function(a) {
												return this._layout[a]
											}, t.getItemLayout = function(a) {
												return this._itemLayouts[a]
											}, t.setItemLayout = function(a, b, c) {
												this._itemLayouts[a] = c ? o.extend(this._itemLayouts[a] || {}, b) : b
											}, t.clearItemLayouts = function() {
												this._itemLayouts.length = 0
											}, t.getItemVisual = function(a, b, c) {
												var d = this._itemVisuals[a],
													e = d && d[b];
												return null != e || c ? e : this.getVisual(b)
											}, t.setItemVisual = function(a, b, c) {
												var d = this._itemVisuals[a] || {};
												if(this._itemVisuals[a] = d, q(b))
													for(var e in b) b.hasOwnProperty(e) && (d[e] = b[e]);
												else d[b] = c
											}, t.clearAllVisual = function() {
												this._visual = {}, this._itemVisuals = []
											};
											var u = function(a) {
												a.seriesIndex = this.seriesIndex, a.dataIndex = this.dataIndex, a.dataType = this.dataType
											};
											t.setItemGraphicEl = function(a, b) {
												var c = this.hostModel;
												b && (b.dataIndex = a, b.dataType = this.dataType, b.seriesIndex = c && c.seriesIndex, "group" === b.type && b.traverse(u, b)), this._graphicEls[a] = b
											}, t.getItemGraphicEl = function(a) {
												return this._graphicEls[a]
											}, t.eachItemGraphicEl = function(a, b) {
												o.each(this._graphicEls, function(c, d) {
													c && a && a.call(b, c, d)
												})
											}, t.cloneShallow = function() {
												var a = o.map(this.dimensions, this.getDimensionInfo, this),
													b = new s(a, this.hostModel);
												return b._storage = this._storage, d(b, this), b.indices = this.indices.slice(), this._extent && (b._extent = o.extend({}, this._extent)), b
											}, t.wrapMethod = function(a, b) {
												var c = this[a];
												"function" == typeof c && (this.__wrappedMethods = this.__wrappedMethods || [], this.__wrappedMethods.push(a), this[a] = function() {
													var a = c.apply(this, arguments);
													return b.apply(this, [a].concat(o.slice(arguments)))
												})
											}, t.TRANSFERABLE_METHODS = ["cloneShallow", "downSample", "map"], t.CHANGABLE_METHODS = ["filterSelf"], a.exports = s
										}).call(b, function() {
											return this
										}())
									}, function(a, b, c) {
										function d(a) {
											g.assert(/^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)?$/.test(a), 'componentType "' + a + '" illegal')
										}

										function e(a, b) {
											var c = g.slice(arguments, 2);
											return this.superClass.prototype[b].apply(a, c)
										}

										function f(a, b, c) {
											return this.superClass.prototype[b].apply(a, c)
										}
										var g = c(1),
											h = {},
											i = ".",
											j = "___EC__COMPONENT__CONTAINER___",
											k = "\x00ec_\x00";
										h.set = function(a, b, c) {
											return a[k + b] = c
										}, h.get = function(a, b) {
											return a[k + b]
										}, h.hasOwn = function(a, b) {
											return a.hasOwnProperty(k + b)
										};
										var l = h.parseClassType = function(a) {
											var b = {
												main: "",
												sub: ""
											};
											return a && (a = a.split(i), b.main = a[0] || "", b.sub = a[1] || ""), b
										};
										h.enableClassExtend = function(a, b) {
											a.$constructor = a, a.extend = function(a) {
												var b = this,
													c = function() {
														a.$constructor ? a.$constructor.apply(this, arguments) : b.apply(this, arguments)
													};
												return g.extend(c.prototype, a), c.extend = this.extend, c.superCall = e, c.superApply = f, g.inherits(c, this), c.superClass = b, c
											}
										}, h.enableClassManagement = function(a, b) {
											function c(a) {
												var b = e[a.main];
												return b && b[j] || (b = e[a.main] = {}, b[j] = !0), b
											}
											b = b || {};
											var e = {};
											if(a.registerClass = function(a, b) {
													if(b)
														if(d(b), b = l(b), b.sub) {
															if(b.sub !== j) {
																var f = c(b);
																f[b.sub] = a
															}
														} else e[b.main] = a;
													return a
												}, a.getClass = function(a, b, c) {
													var d = e[a];
													if(d && d[j] && (d = b ? d[b] : null), c && !d) throw new Error(b ? "Component " + a + "." + (b || "") + " not exists. Load it first." : a + ".type should be specified.");
													return d
												}, a.getClassesByMainType = function(a) {
													a = l(a);
													var b = [],
														c = e[a.main];
													return c && c[j] ? g.each(c, function(a, c) {
														c !== j && b.push(a)
													}) : b.push(c), b
												}, a.hasClass = function(a) {
													return a = l(a), !!e[a.main]
												}, a.getAllClassMainTypes = function() {
													var a = [];
													return g.each(e, function(b, c) {
														a.push(c)
													}), a
												}, a.hasSubTypes = function(a) {
													a = l(a);
													var b = e[a.main];
													return b && b[j]
												}, a.parseClassType = l, b.registerWhenExtend) {
												var f = a.extend;
												f && (a.extend = function(b) {
													var c = f.call(this, b);
													return a.registerClass(c, b.type)
												})
											}
											return a
										}, h.setReadOnly = function(a, b) {}, a.exports = h
									}, function(a, b, c) {
										function d(a, b) {
											b = b || B;
											var c = a + ":" + b;
											if(x[c]) return x[c];
											for(var d = (a + "").split("\n"), e = 0, f = 0, g = d.length; g > f; f++) e = Math.max(E.measureText(d[f], b).width, e);
											return y > z && (y = 0, x = {}), y++, x[c] = e, e
										}

										function e(a, b, c, d, e, h, i) {
											return h ? g(a, b, c, d, e, h, i) : f(a, b, c, d, e, i)
										}

										function f(a, b, c, e, f, g) {
											var j = q(a, b, f, g),
												k = d(a, b);
											f && (k += f[1] + f[3]);
											var l = j.outerHeight,
												m = h(0, k, c),
												n = i(0, l, e),
												o = new v(m, n, k, l);
											return o.lineHeight = j.lineHeight, o
										}

										function g(a, b, c, d, e, f, g) {
											var j = r(a, {
													rich: f,
													truncate: g,
													font: b,
													textAlign: c,
													textPadding: e
												}),
												k = j.outerWidth,
												l = j.outerHeight,
												m = h(0, k, c),
												n = i(0, l, d);
											return new v(m, n, k, l)
										}

										function h(a, b, c) {
											return "right" === c ? a -= b : "center" === c && (a -= b / 2), a
										}

										function i(a, b, c) {
											return "middle" === c ? a -= b / 2 : "bottom" === c && (a -= b), a
										}

										function j(a, b, c) {
											var d = b.x,
												e = b.y,
												f = b.height,
												g = b.width,
												h = f / 2,
												i = "left",
												j = "top";
											switch(a) {
												case "left":
													d -= c, e += h, i = "right", j = "middle";
													break;
												case "right":
													d += c + g, e += h, j = "middle";
													break;
												case "top":
													d += g / 2, e -= c, i = "center", j = "bottom";
													break;
												case "bottom":
													d += g / 2, e += f + c, i = "center";
													break;
												case "inside":
													d += g / 2, e += h, i = "center", j = "middle";
													break;
												case "insideLeft":
													d += c, e += h, j = "middle";
													break;
												case "insideRight":
													d += g - c, e += h, i = "right", j = "middle";
													break;
												case "insideTop":
													d += g / 2, e += c, i = "center";
													break;
												case "insideBottom":
													d += g / 2, e += f - c, i = "center", j = "bottom";
													break;
												case "insideTopLeft":
													d += c, e += c;
													break;
												case "insideTopRight":
													d += g - c, e += c, i = "right";
													break;
												case "insideBottomLeft":
													d += c, e += f - c, j = "bottom";
													break;
												case "insideBottomRight":
													d += g - c, e += f - c, i = "right", j = "bottom"
											}
											return {
												x: d,
												y: e,
												textAlign: i,
												textVerticalAlign: j
											}
										}

										function k(a, b, c, d, e) {
											if(!b) return "";
											var f = (a + "").split("\n");
											e = l(b, c, d, e);
											for(var g = 0, h = f.length; h > g; g++) f[g] = m(f[g], e);
											return f.join("\n")
										}

										function l(a, b, c, e) {
											e = u.extend({}, e), e.font = b;
											var c = C(c, "...");
											e.maxIterations = C(e.maxIterations, 2);
											var f = e.minChar = C(e.minChar, 0);
											e.cnCharWidth = d("国", b);
											var g = e.ascCharWidth = d("a", b);
											e.placeholder = C(e.placeholder, "");
											for(var h = a = Math.max(0, a - 1), i = 0; f > i && h >= g; i++) h -= g;
											var j = d(c);
											return j > h && (c = "", j = 0), h = a - j, e.ellipsis = c, e.ellipsisWidth = j, e.contentWidth = h, e.containerWidth = a, e
										}

										function m(a, b) {
											var c = b.containerWidth,
												e = b.font,
												f = b.contentWidth;
											if(!c) return "";
											var g = d(a, e);
											if(c >= g) return a;
											for(var h = 0;; h++) {
												if(f >= g || h >= b.maxIterations) {
													a += b.ellipsis;
													break
												}
												var i = 0 === h ? n(a, f, b.ascCharWidth, b.cnCharWidth) : g > 0 ? Math.floor(a.length * f / g) : 0;
												a = a.substr(0, i), g = d(a, e)
											}
											return "" === a && (a = b.placeholder), a
										}

										function n(a, b, c, d) {
											for(var e = 0, f = 0, g = a.length; g > f && b > e; f++) {
												var h = a.charCodeAt(f);
												e += h >= 0 && 127 >= h ? c : d
											}
											return f
										}

										function o(a) {
											return d("国", a)
										}

										function p(a, b) {
											var c = u.getContext();
											return c.font = b || B, c.measureText(a)
										}

										function q(a, b, c, d) {
											null != a && (a += "");
											var e = o(b),
												f = a ? a.split("\n") : [],
												g = f.length * e,
												h = g;
											if(c && (h += c[0] + c[2]), a && d) {
												var i = d.outerHeight,
													j = d.outerWidth;
												if(null != i && h > i) a = "", f = [];
												else if(null != j)
													for(var k = l(j - (c ? c[1] + c[3] : 0), b, d.ellipsis, {
															minChar: d.minChar,
															placeholder: d.placeholder
														}), n = 0, p = f.length; p > n; n++) f[n] = m(f[n], k)
											}
											return {
												lines: f,
												height: g,
												outerHeight: h,
												lineHeight: e
											}
										}

										function r(a, b) {
											var c = {
												lines: [],
												width: 0,
												height: 0
											};
											if(null != a && (a += ""), !a) return c;
											for(var d, e = A.lastIndex = 0; null != (d = A.exec(a));) {
												var f = d.index;
												f > e && s(c, a.substring(e, f)), s(c, d[2], d[1]), e = A.lastIndex
											}
											e < a.length && s(c, a.substring(e, a.length));
											var g = c.lines,
												h = 0,
												i = 0,
												j = [],
												l = b.textPadding,
												m = b.truncate,
												n = m && m.outerWidth,
												o = m && m.outerHeight;
											l && (null != n && (n -= l[1] + l[3]), null != o && (o -= l[0] + l[2]));
											for(var p = 0; p < g.length; p++) {
												for(var q = g[p], r = 0, t = 0, u = 0; u < q.tokens.length; u++) {
													var v = q.tokens[u],
														x = v.styleName && b.rich[v.styleName] || {},
														y = v.textPadding = x.textPadding,
														z = v.font = x.font || b.font,
														B = v.textHeight = C(x.textHeight, E.getLineHeight(z));
													if(y && (B += y[0] + y[2]), v.height = B, v.lineHeight = D(x.textLineHeight, b.textLineHeight, B), v.textAlign = x && x.textAlign || b.textAlign, v.textVerticalAlign = x && x.textVerticalAlign || "middle", null != o && h + v.lineHeight > o) return {
														lines: [],
														width: 0,
														height: 0
													};
													v.textWidth = E.getWidth(v.text, z);
													var F = x.textWidth,
														G = null == F || "auto" === F;
													if("string" == typeof F && "%" === F.charAt(F.length - 1)) v.percentWidth = F, j.push(v), F = 0;
													else {
														if(G) {
															F = v.textWidth;
															var H = x.textBackgroundColor,
																I = H && H.image;
															I && (I = w.findExistImage(I), w.isImageReady(I) && (F = Math.max(F, I.width * B / I.height)))
														}
														var J = y ? y[1] + y[3] : 0;
														F += J;
														var K = null != n ? n - t : null;
														null != K && F > K && (!G || J > K ? (v.text = "", v.textWidth = F = 0) : (v.text = k(v.text, K - J, z, m.ellipsis, {
															minChar: m.minChar
														}), v.textWidth = E.getWidth(v.text, z), F = v.textWidth + J))
													}
													t += v.width = F, x && (r = Math.max(r, v.lineHeight))
												}
												q.width = t, q.lineHeight = r, h += r, i = Math.max(i, t)
											}
											c.outerWidth = c.width = C(b.textWidth, i), c.outerHeight = c.height = C(b.textHeight, h), l && (c.outerWidth += l[1] + l[3], c.outerHeight += l[0] + l[2]);
											for(var p = 0; p < j.length; p++) {
												var v = j[p],
													L = v.percentWidth;
												v.width = parseInt(L, 10) / 100 * i
											}
											return c
										}

										function s(a, b, c) {
											for(var d = "" === b, e = b.split("\n"), f = a.lines, g = 0; g < e.length; g++) {
												var h = e[g],
													i = {
														styleName: c,
														text: h,
														isLineHolder: !h && !d
													};
												if(g) f.push({
													tokens: [i]
												});
												else {
													var j = (f[f.length - 1] || (f[0] = {
															tokens: []
														})).tokens,
														k = j.length;
													1 === k && j[0].isLineHolder ? j[0] = i : (h || !k || d) && j.push(i)
												}
											}
										}

										function t(a) {
											return(a.fontSize || a.fontFamily) && [a.fontStyle, a.fontWeight, (a.fontSize || 12) + "px", a.fontFamily || "sans-serif"].join(" ") || a.textFont || a.font
										}
										var u = c(1),
											v = c(12),
											w = c(53),
											x = {},
											y = 0,
											z = 5e3,
											A = /\{([a-zA-Z0-9_]+)\|([^}]*)\}/g,
											B = "12px sans-serif",
											C = u.retrieve2,
											D = u.retrieve3,
											E = {
												getWidth: d,
												getBoundingRect: e,
												adjustTextPositionOnRect: j,
												truncateText: k,
												measureText: p,
												getLineHeight: o,
												parsePlainText: q,
												parseRichText: r,
												adjustTextX: h,
												adjustTextY: i,
												makeFont: t,
												DEFAULT_FONT: B
											};
										a.exports = E
									}, function(a, b, c) {
										"use strict";
										var d = c(1),
											e = c(7),
											f = c(15),
											g = c(5),
											h = c(13),
											i = c(64),
											j = c(10),
											k = c(9),
											l = f.set,
											m = f.get,
											n = e.encodeHTML,
											o = e.addCommas,
											p = h.extend({
												type: "series.__base__",
												seriesIndex: 0,
												coordinateSystem: null,
												defaultOption: null,
												legendDataProvider: null,
												visualColorAccessPath: "itemStyle.normal.color",
												layoutMode: null,
												init: function(a, b, c, d) {
													this.seriesIndex = this.componentIndex, this.mergeDefaultAndTheme(a, c);
													var e = this.getInitialData(a, c);
													l(this, "dataBeforeProcessed", e), this.restoreData()
												},
												mergeDefaultAndTheme: function(a, b) {
													var c = this.layoutMode,
														e = c ? k.getLayoutParams(a) : {},
														f = this.subType;
													h.hasClass(f) && (f += "Series"), d.merge(a, b.getTheme().get(this.subType)), d.merge(a, this.getDefaultOption()), g.defaultEmphasis(a.label, ["show"]), this.fillDataTextStyle(a.data), c && k.mergeLayoutParam(a, e, c)
												},
												mergeOption: function(a, b) {
													a = d.merge(this.option, a, !0), this.fillDataTextStyle(a.data);
													var c = this.layoutMode;
													c && k.mergeLayoutParam(this.option, a, c);
													var e = this.getInitialData(a, b);
													e && (l(this, "data", e), l(this, "dataBeforeProcessed", e.cloneShallow()))
												},
												fillDataTextStyle: function(a) {
													if(a)
														for(var b = ["show"], c = 0; c < a.length; c++) a[c] && a[c].label && g.defaultEmphasis(a[c].label, b)
												},
												getInitialData: function() {},
												getData: function(a) {
													var b = m(this, "data");
													return null == a ? b : b.getLinkedData(a)
												},
												setData: function(a) {
													l(this, "data", a)
												},
												getRawData: function() {
													return m(this, "dataBeforeProcessed")
												},
												coordDimToDataDim: function(a) {
													return g.coordDimToDataDim(this.getData(), a)
												},
												dataDimToCoordDim: function(a) {
													return g.dataDimToCoordDim(this.getData(), a)
												},
												getBaseAxis: function() {
													var a = this.coordinateSystem;
													return a && a.getBaseAxis && a.getBaseAxis()
												},
												formatTooltip: function(a, b, c) {
													function f(c) {
														function f(a, c) {
															var d = h.getDimensionInfo(c);
															if(d && d.otherDims.tooltip !== !1) {
																var f = d.type,
																	g = (i ? "- " + (d.tooltipName || d.name) + ": " : "") + ("ordinal" === f ? a + "" : "time" === f ? b ? "" : e.formatTime("yyyy/MM/dd hh:mm:ss", a) : o(a));
																g && j.push(n(g))
															}
														}
														var i = d.reduce(c, function(a, b, c) {
																var d = h.getDimensionInfo(c);
																return a |= d && d.tooltip !== !1 && null != d.tooltipName
															}, 0),
															j = [],
															k = g.otherDimToDataDim(h, "tooltip");
														return k.length ? d.each(k, function(b) {
															f(h.get(b, a), b)
														}) : d.each(c, f), (i ? "<br/>" : "") + j.join(i ? "<br/>" : ", ")
													}
													var h = m(this, "data"),
														i = this.getRawValue(a),
														j = d.isArray(i) ? f(i) : n(o(i)),
														k = h.getName(a),
														l = h.getItemVisual(a, "color");
													d.isObject(l) && l.colorStops && (l = (l.colorStops[0] || {}).color), l = l || "transparent";
													var p = e.getTooltipMarker(l),
														q = this.name;
													return "\x00-" === q && (q = ""), q = q ? n(q) + (b ? ": " : "<br/>") : "", b ? p + q + j : q + p + (k ? n(k) + ": " + j : j)
												},
												isAnimationEnabled: function() {
													if(j.node) return !1;
													var a = this.getShallow("animation");
													return a && this.getData().count() > this.getShallow("animationThreshold") && (a = !1), a
												},
												restoreData: function() {
													l(this, "data", m(this, "dataBeforeProcessed").cloneShallow())
												},
												getColorFromPalette: function(a, b) {
													var c = this.ecModel,
														d = i.getColorFromPalette.call(this, a, b);
													return d || (d = c.getColorFromPalette(a, b)), d
												},
												getAxisTooltipData: null,
												getTooltipPosition: null
											});
										d.mixin(p, g.dataFormatMixin), d.mixin(p, i), a.exports = p
									}, function(a, b, c) {
										var d = c(155),
											e = c(45);
										c(156), c(154);
										var f = c(34),
											g = c(4),
											h = c(1),
											i = c(16),
											j = {};
										j.getScaleExtent = function(a, b) {
											var c, d, e, f = a.type,
												i = b.getMin(),
												j = b.getMax(),
												k = null != i,
												l = null != j,
												m = a.getExtent();
											return "ordinal" === f ? c = (b.get("data") || []).length : (d = b.get("boundaryGap"), h.isArray(d) || (d = [d || 0, d || 0]), "boolean" == typeof d[0] && (d = [0, 0]), d[0] = g.parsePercent(d[0], 1), d[1] = g.parsePercent(d[1], 1), e = m[1] - m[0] || Math.abs(m[0])), null == i && (i = "ordinal" === f ? c ? 0 : NaN : m[0] - d[0] * e), null == j && (j = "ordinal" === f ? c ? c - 1 : NaN : m[1] + d[1] * e), "dataMin" === i ? i = m[0] : "function" == typeof i && (i = i({
												min: m[0],
												max: m[1]
											})), "dataMax" === j ? j = m[1] : "function" == typeof j && (j = j({
												min: m[0],
												max: m[1]
											})), (null == i || !isFinite(i)) && (i = NaN), (null == j || !isFinite(j)) && (j = NaN), a.setBlank(h.eqNaN(i) || h.eqNaN(j)), b.getNeedCrossZero() && (i > 0 && j > 0 && !k && (i = 0), 0 > i && 0 > j && !l && (j = 0)), [i, j]
										}, j.niceScaleExtent = function(a, b) {
											var c = j.getScaleExtent(a, b),
												d = null != b.getMin(),
												e = null != b.getMax(),
												f = b.get("splitNumber");
											"log" === a.type && (a.base = b.get("logBase"));
											var g = a.type;
											a.setExtent(c[0], c[1]), a.niceExtent({
												splitNumber: f,
												fixMin: d,
												fixMax: e,
												minInterval: "interval" === g || "time" === g ? b.get("minInterval") : null,
												maxInterval: "interval" === g || "time" === g ? b.get("maxInterval") : null
											});
											var h = b.get("interval");
											null != h && a.setInterval && a.setInterval(h)
										}, j.createScaleByModel = function(a, b) {
											if(b = b || a.get("type")) switch(b) {
												case "category":
													return new d(a.getCategories(), [1 / 0, -(1 / 0)]);
												case "value":
													return new e;
												default:
													return(f.getClass(b) || e).create(a)
											}
										}, j.ifAxisCrossZero = function(a) {
											var b = a.scale.getExtent(),
												c = b[0],
												d = b[1];
											return !(c > 0 && d > 0 || 0 > c && 0 > d)
										}, j.getAxisLabelInterval = function(a, b, c, d) {
											var e, f = 0,
												g = 0,
												h = 1;
											b.length > 40 && (h = Math.floor(b.length / 40));
											for(var j = 0; j < a.length; j += h) {
												var k = a[j],
													l = i.getBoundingRect(b[j], c, "center", "top");
												l[d ? "x" : "y"] += k, l[d ? "width" : "height"] *= 1.3, e ? e.intersect(l) ? (g++, f = Math.max(f, g)) : (e.union(l), g = 0) : e = l.clone()
											}
											return 0 === f && h > 1 ? h : (f + 1) * h - 1
										}, j.getFormattedLabels = function(a, b) {
											var c = a.scale,
												d = c.getTicksLabels(),
												e = c.getTicks();
											return "string" == typeof b ? (b = function(a) {
												return function(b) {
													return a.replace("{value}", null != b ? b : "")
												}
											}(b), h.map(d, b)) : "function" == typeof b ? h.map(e, function(c, d) {
												return b(j.getAxisRawValue(a, c), d)
											}, this) : d
										}, j.getAxisRawValue = function(a, b) {
											return "category" === a.type ? a.scale.getLabel(b) : b
										}, a.exports = j
									}, function(a, b) {
										var c = "undefined" == typeof Float32Array ? Array : Float32Array,
											d = {
												create: function() {
													var a = new c(6);
													return d.identity(a), a
												},
												identity: function(a) {
													return a[0] = 1, a[1] = 0, a[2] = 0, a[3] = 1, a[4] = 0, a[5] = 0, a
												},
												copy: function(a, b) {
													return a[0] = b[0], a[1] = b[1], a[2] = b[2], a[3] = b[3], a[4] = b[4], a[5] = b[5], a
												},
												mul: function(a, b, c) {
													var d = b[0] * c[0] + b[2] * c[1],
														e = b[1] * c[0] + b[3] * c[1],
														f = b[0] * c[2] + b[2] * c[3],
														g = b[1] * c[2] + b[3] * c[3],
														h = b[0] * c[4] + b[2] * c[5] + b[4],
														i = b[1] * c[4] + b[3] * c[5] + b[5];
													return a[0] = d, a[1] = e, a[2] = f, a[3] = g, a[4] = h, a[5] = i, a
												},
												translate: function(a, b, c) {
													return a[0] = b[0], a[1] = b[1], a[2] = b[2], a[3] = b[3], a[4] = b[4] + c[0], a[5] = b[5] + c[1], a
												},
												rotate: function(a, b, c) {
													var d = b[0],
														e = b[2],
														f = b[4],
														g = b[1],
														h = b[3],
														i = b[5],
														j = Math.sin(c),
														k = Math.cos(c);
													return a[0] = d * k + g * j, a[1] = -d * j + g * k, a[2] = e * k + h * j, a[3] = -e * j + k * h, a[4] = k * f + j * i, a[5] = k * i - j * f, a
												},
												scale: function(a, b, c) {
													var d = c[0],
														e = c[1];
													return a[0] = b[0] * d, a[1] = b[1] * e, a[2] = b[2] * d, a[3] = b[3] * e, a[4] = b[4] * d, a[5] = b[5] * e, a
												},
												invert: function(a, b) {
													var c = b[0],
														d = b[2],
														e = b[4],
														f = b[1],
														g = b[3],
														h = b[5],
														i = c * g - f * d;
													return i ? (i = 1 / i, a[0] = g * i, a[1] = -f * i, a[2] = -d * i, a[3] = c * i, a[4] = (d * h - g * e) * i, a[5] = (f * e - c * h) * i, a) : null
												}
											};
										a.exports = d
									}, function(a, b, c) {
										"use strict";

										function d(a) {
											return a > -w && w > a
										}

										function e(a) {
											return a > w || -w > a
										}

										function f(a, b, c, d, e) {
											var f = 1 - e;
											return f * f * (f * a + 3 * e * b) + e * e * (e * d + 3 * f * c)
										}

										function g(a, b, c, d, e) {
											var f = 1 - e;
											return 3 * (((b - a) * f + 2 * (c - b) * e) * f + (d - c) * e * e)
										}

										function h(a, b, c, e, f, g) {
											var h = e + 3 * (b - c) - a,
												i = 3 * (c - 2 * b + a),
												j = 3 * (b - a),
												k = a - f,
												l = i * i - 3 * h * j,
												m = i * j - 9 * h * k,
												n = j * j - 3 * i * k,
												o = 0;
											if(d(l) && d(m))
												if(d(i)) g[0] = 0;
												else {
													var p = -j / i;
													p >= 0 && 1 >= p && (g[o++] = p)
												}
											else {
												var q = m * m - 4 * l * n;
												if(d(q)) {
													var r = m / l,
														p = -i / h + r,
														s = -r / 2;
													p >= 0 && 1 >= p && (g[o++] = p), s >= 0 && 1 >= s && (g[o++] = s)
												} else if(q > 0) {
													var t = v(q),
														w = l * i + 1.5 * h * (-m + t),
														x = l * i + 1.5 * h * (-m - t);
													w = 0 > w ? -u(-w, z) : u(w, z), x = 0 > x ? -u(-x, z) : u(x, z);
													var p = (-i - (w + x)) / (3 * h);
													p >= 0 && 1 >= p && (g[o++] = p)
												} else {
													var A = (2 * l * i - 3 * h * m) / (2 * v(l * l * l)),
														B = Math.acos(A) / 3,
														C = v(l),
														D = Math.cos(B),
														p = (-i - 2 * C * D) / (3 * h),
														s = (-i + C * (D + y * Math.sin(B))) / (3 * h),
														E = (-i + C * (D - y * Math.sin(B))) / (3 * h);
													p >= 0 && 1 >= p && (g[o++] = p), s >= 0 && 1 >= s && (g[o++] = s), E >= 0 && 1 >= E && (g[o++] = E)
												}
											}
											return o
										}

										function i(a, b, c, f, g) {
											var h = 6 * c - 12 * b + 6 * a,
												i = 9 * b + 3 * f - 3 * a - 9 * c,
												j = 3 * b - 3 * a,
												k = 0;
											if(d(i)) {
												if(e(h)) {
													var l = -j / h;
													l >= 0 && 1 >= l && (g[k++] = l)
												}
											} else {
												var m = h * h - 4 * i * j;
												if(d(m)) g[0] = -h / (2 * i);
												else if(m > 0) {
													var n = v(m),
														l = (-h + n) / (2 * i),
														o = (-h - n) / (2 * i);
													l >= 0 && 1 >= l && (g[k++] = l), o >= 0 && 1 >= o && (g[k++] = o)
												}
											}
											return k
										}

										function j(a, b, c, d, e, f) {
											var g = (b - a) * e + a,
												h = (c - b) * e + b,
												i = (d - c) * e + c,
												j = (h - g) * e + g,
												k = (i - h) * e + h,
												l = (k - j) * e + j;
											f[0] = a, f[1] = g, f[2] = j, f[3] = l, f[4] = l, f[5] = k, f[6] = i, f[7] = d
										}

										function k(a, b, c, d, e, g, h, i, j, k, l) {
											var m, n, o, p, q, r = .005,
												s = 1 / 0;
											A[0] = j, A[1] = k;
											for(var u = 0; 1 > u; u += .05) B[0] = f(a, c, e, h, u), B[1] = f(b, d, g, i, u), p = t(A, B), s > p && (m = u, s = p);
											s = 1 / 0;
											for(var w = 0; 32 > w && !(x > r); w++) n = m - r, o = m + r, B[0] = f(a, c, e, h, n), B[1] = f(b, d, g, i, n), p = t(B, A), n >= 0 && s > p ? (m = n, s = p) : (C[0] = f(a, c, e, h, o), C[1] = f(b, d, g, i, o), q = t(C, A), 1 >= o && s > q ? (m = o, s = q) : r *= .5);
											return l && (l[0] = f(a, c, e, h, m), l[1] = f(b, d, g, i, m)), v(s)
										}

										function l(a, b, c, d) {
											var e = 1 - d;
											return e * (e * a + 2 * d * b) + d * d * c
										}

										function m(a, b, c, d) {
											return 2 * ((1 - d) * (b - a) + d * (c - b))
										}

										function n(a, b, c, f, g) {
											var h = a - 2 * b + c,
												i = 2 * (b - a),
												j = a - f,
												k = 0;
											if(d(h)) {
												if(e(i)) {
													var l = -j / i;
													l >= 0 && 1 >= l && (g[k++] = l)
												}
											} else {
												var m = i * i - 4 * h * j;
												if(d(m)) {
													var l = -i / (2 * h);
													l >= 0 && 1 >= l && (g[k++] = l)
												} else if(m > 0) {
													var n = v(m),
														l = (-i + n) / (2 * h),
														o = (-i - n) / (2 * h);
													l >= 0 && 1 >= l && (g[k++] = l), o >= 0 && 1 >= o && (g[k++] = o)
												}
											}
											return k
										}

										function o(a, b, c) {
											var d = a + c - 2 * b;
											return 0 === d ? .5 : (a - b) / d
										}

										function p(a, b, c, d, e) {
											var f = (b - a) * d + a,
												g = (c - b) * d + b,
												h = (g - f) * d + f;
											e[0] = a, e[1] = f, e[2] = h, e[3] = h, e[4] = g, e[5] = c
										}

										function q(a, b, c, d, e, f, g, h, i) {
											var j, k = .005,
												m = 1 / 0;
											A[0] = g, A[1] = h;
											for(var n = 0; 1 > n; n += .05) {
												B[0] = l(a, c, e, n), B[1] = l(b, d, f, n);
												var o = t(A, B);
												m > o && (j = n, m = o)
											}
											m = 1 / 0;
											for(var p = 0; 32 > p && !(x > k); p++) {
												var q = j - k,
													r = j + k;
												B[0] = l(a, c, e, q), B[1] = l(b, d, f, q);
												var o = t(B, A);
												if(q >= 0 && m > o) j = q, m = o;
												else {
													C[0] = l(a, c, e, r), C[1] = l(b, d, f, r);
													var s = t(C, A);
													1 >= r && m > s ? (j = r, m = s) : k *= .5
												}
											}
											return i && (i[0] = l(a, c, e, j), i[1] = l(b, d, f, j)), v(m)
										}
										var r = c(6),
											s = r.create,
											t = r.distSquare,
											u = Math.pow,
											v = Math.sqrt,
											w = 1e-8,
											x = 1e-4,
											y = v(3),
											z = 1 / 3,
											A = s(),
											B = s(),
											C = s();
										a.exports = {
											cubicAt: f,
											cubicDerivativeAt: g,
											cubicRootAt: h,
											cubicExtrema: i,
											cubicSubdivide: j,
											cubicProjectPoint: k,
											quadraticAt: l,
											quadraticDerivativeAt: m,
											quadraticRootAt: n,
											quadraticExtremum: o,
											quadraticSubdivide: p,
											quadraticProjectPoint: q
										}
									}, function(a, b, c) {
										"use strict";

										function d(a) {
											return a.getBoundingClientRect ? a.getBoundingClientRect() : {
												left: 0,
												top: 0
											}
										}

										function e(a, b, c, d) {
											return c = c || {}, d || !k.canvasSupported ? f(a, b, c) : k.browser.firefox && null != b.layerX && b.layerX !== b.offsetX ? (c.zrX = b.layerX, c.zrY = b.layerY) : null != b.offsetX ? (c.zrX = b.offsetX, c.zrY = b.offsetY) : f(a, b, c), c
										}

										function f(a, b, c) {
											var e = d(a);
											c.zrX = b.clientX - e.left, c.zrY = b.clientY - e.top
										}

										function g(a, b, c) {
											if(b = b || window.event, null != b.zrX) return b;
											var d = b.type,
												f = d && d.indexOf("touch") >= 0;
											if(f) {
												var g = "touchend" != d ? b.targetTouches[0] : b.changedTouches[0];
												g && e(a, g, b, c)
											} else e(a, b, b, c), b.zrDelta = b.wheelDelta ? b.wheelDelta / 120 : -(b.detail || 0) / 3;
											return b
										}

										function h(a, b, c) {
											l ? a.addEventListener(b, c) : a.attachEvent("on" + b, c)
										}

										function i(a, b, c) {
											l ? a.removeEventListener(b, c) : a.detachEvent("on" + b, c)
										}
										var j = c(23),
											k = c(10),
											l = "undefined" != typeof window && !!window.addEventListener,
											m = l ? function(a) {
												a.preventDefault(), a.stopPropagation(), a.cancelBubble = !0
											} : function(a) {
												a.returnValue = !1, a.cancelBubble = !0
											};
										a.exports = {
											clientToLocal: e,
											normalizeEvent: g,
											addEventListener: h,
											removeEventListener: i,
											stop: m,
											Dispatcher: j
										}
									}, function(a, b, c) {
										function d(a) {
											return a = Math.round(a), 0 > a ? 0 : a > 255 ? 255 : a
										}

										function e(a) {
											return a = Math.round(a), 0 > a ? 0 : a > 360 ? 360 : a
										}

										function f(a) {
											return 0 > a ? 0 : a > 1 ? 1 : a
										}

										function g(a) {
											return d(a.length && "%" === a.charAt(a.length - 1) ? parseFloat(a) / 100 * 255 : parseInt(a, 10))
										}

										function h(a) {
											return f(a.length && "%" === a.charAt(a.length - 1) ? parseFloat(a) / 100 : parseFloat(a))
										}

										function i(a, b, c) {
											return 0 > c ? c += 1 : c > 1 && (c -= 1), 1 > 6 * c ? a + (b - a) * c * 6 : 1 > 2 * c ? b : 2 > 3 * c ? a + (b - a) * (2 / 3 - c) * 6 : a
										}

										function j(a, b, c) {
											return a + (b - a) * c
										}

										function k(a, b, c, d, e) {
											return a[0] = b, a[1] = c, a[2] = d, a[3] = e, a
										}

										function l(a, b) {
											return a[0] = b[0], a[1] = b[1], a[2] = b[2], a[3] = b[3], a
										}

										function m(a, b) {
											A && l(A, b), A = z.put(a, A || b.slice())
										}

										function n(a, b) {
											if(a) {
												b = b || [];
												var c = z.get(a);
												if(c) return l(b, c);
												a += "";
												var d = a.replace(/ /g, "").toLowerCase();
												if(d in y) return l(b, y[d]), m(a, b), b;
												if("#" !== d.charAt(0)) {
													var e = d.indexOf("("),
														f = d.indexOf(")");
													if(-1 !== e && f + 1 === d.length) {
														var i = d.substr(0, e),
															j = d.substr(e + 1, f - (e + 1)).split(","),
															n = 1;
														switch(i) {
															case "rgba":
																if(4 !== j.length) return void k(b, 0, 0, 0, 1);
																n = h(j.pop());
															case "rgb":
																return 3 !== j.length ? void k(b, 0, 0, 0, 1) : (k(b, g(j[0]), g(j[1]), g(j[2]), n), m(a, b), b);
															case "hsla":
																return 4 !== j.length ? void k(b, 0, 0, 0, 1) : (j[3] = h(j[3]), o(j, b), m(a, b), b);
															case "hsl":
																return 3 !== j.length ? void k(b, 0, 0, 0, 1) : (o(j, b), m(a, b), b);
															default:
																return
														}
													}
													k(b, 0, 0, 0, 1)
												} else {
													if(4 === d.length) {
														var p = parseInt(d.substr(1), 16);
														return p >= 0 && 4095 >= p ? (k(b, (3840 & p) >> 4 | (3840 & p) >> 8, 240 & p | (240 & p) >> 4, 15 & p | (15 & p) << 4, 1), m(a, b), b) : void k(b, 0, 0, 0, 1)
													}
													if(7 === d.length) {
														var p = parseInt(d.substr(1), 16);
														return p >= 0 && 16777215 >= p ? (k(b, (16711680 & p) >> 16, (65280 & p) >> 8, 255 & p, 1), m(a, b), b) : void k(b, 0, 0, 0, 1)
													}
												}
											}
										}

										function o(a, b) {
											var c = (parseFloat(a[0]) % 360 + 360) % 360 / 360,
												e = h(a[1]),
												f = h(a[2]),
												g = .5 >= f ? f * (e + 1) : f + e - f * e,
												j = 2 * f - g;
											return b = b || [], k(b, d(255 * i(j, g, c + 1 / 3)), d(255 * i(j, g, c)), d(255 * i(j, g, c - 1 / 3)), 1), 4 === a.length && (b[3] = a[3]), b
										}

										function p(a) {
											if(a) {
												var b, c, d = a[0] / 255,
													e = a[1] / 255,
													f = a[2] / 255,
													g = Math.min(d, e, f),
													h = Math.max(d, e, f),
													i = h - g,
													j = (h + g) / 2;
												if(0 === i) b = 0, c = 0;
												else {
													c = .5 > j ? i / (h + g) : i / (2 - h - g);
													var k = ((h - d) / 6 + i / 2) / i,
														l = ((h - e) / 6 + i / 2) / i,
														m = ((h - f) / 6 + i / 2) / i;
													d === h ? b = m - l : e === h ? b = 1 / 3 + k - m : f === h && (b = 2 / 3 + l - k), 0 > b && (b += 1), b > 1 && (b -= 1)
												}
												var n = [360 * b, c, j];
												return null != a[3] && n.push(a[3]), n
											}
										}

										function q(a, b) {
											var c = n(a);
											if(c) {
												for(var d = 0; 3 > d; d++) 0 > b ? c[d] = c[d] * (1 - b) | 0 : c[d] = (255 - c[d]) * b + c[d] | 0;
												return w(c, 4 === c.length ? "rgba" : "rgb")
											}
										}

										function r(a, b) {
											var c = n(a);
											return c ? ((1 << 24) + (c[0] << 16) + (c[1] << 8) + +c[2]).toString(16).slice(1) : void 0
										}

										function s(a, b, c) {
											if(b && b.length && a >= 0 && 1 >= a) {
												c = c || [];
												var e = a * (b.length - 1),
													g = Math.floor(e),
													h = Math.ceil(e),
													i = b[g],
													k = b[h],
													l = e - g;
												return c[0] = d(j(i[0], k[0], l)), c[1] = d(j(i[1], k[1], l)), c[2] = d(j(i[2], k[2], l)), c[3] = f(j(i[3], k[3], l)), c
											}
										}

										function t(a, b, c) {
											if(b && b.length && a >= 0 && 1 >= a) {
												var e = a * (b.length - 1),
													g = Math.floor(e),
													h = Math.ceil(e),
													i = n(b[g]),
													k = n(b[h]),
													l = e - g,
													m = w([d(j(i[0], k[0], l)), d(j(i[1], k[1], l)), d(j(i[2], k[2], l)), f(j(i[3], k[3], l))], "rgba");
												return c ? {
													color: m,
													leftIndex: g,
													rightIndex: h,
													value: e
												} : m
											}
										}

										function u(a, b, c, d) {
											return(a = n(a)) ? (a = p(a), null != b && (a[0] = e(b)), null != c && (a[1] = h(c)), null != d && (a[2] = h(d)), w(o(a), "rgba")) : void 0
										}

										function v(a, b) {
											return a = n(a), a && null != b ? (a[3] = f(b), w(a, "rgba")) : void 0
										}

										function w(a, b) {
											if(a && a.length) {
												var c = a[0] + "," + a[1] + "," + a[2];
												return "rgba" !== b && "hsva" !== b && "hsla" !== b || (c += "," + a[3]), b + "(" + c + ")"
											}
										}
										var x = c(72),
											y = {
												transparent: [0, 0, 0, 0],
												aliceblue: [240, 248, 255, 1],
												antiquewhite: [250, 235, 215, 1],
												aqua: [0, 255, 255, 1],
												aquamarine: [127, 255, 212, 1],
												azure: [240, 255, 255, 1],
												beige: [245, 245, 220, 1],
												bisque: [255, 228, 196, 1],
												black: [0, 0, 0, 1],
												blanchedalmond: [255, 235, 205, 1],
												blue: [0, 0, 255, 1],
												blueviolet: [138, 43, 226, 1],
												brown: [165, 42, 42, 1],
												burlywood: [222, 184, 135, 1],
												cadetblue: [95, 158, 160, 1],
												chartreuse: [127, 255, 0, 1],
												chocolate: [210, 105, 30, 1],
												coral: [255, 127, 80, 1],
												cornflowerblue: [100, 149, 237, 1],
												cornsilk: [255, 248, 220, 1],
												crimson: [220, 20, 60, 1],
												cyan: [0, 255, 255, 1],
												darkblue: [0, 0, 139, 1],
												darkcyan: [0, 139, 139, 1],
												darkgoldenrod: [184, 134, 11, 1],
												darkgray: [169, 169, 169, 1],
												darkgreen: [0, 100, 0, 1],
												darkgrey: [169, 169, 169, 1],
												darkkhaki: [189, 183, 107, 1],
												darkmagenta: [139, 0, 139, 1],
												darkolivegreen: [85, 107, 47, 1],
												darkorange: [255, 140, 0, 1],
												darkorchid: [153, 50, 204, 1],
												darkred: [139, 0, 0, 1],
												darksalmon: [233, 150, 122, 1],
												darkseagreen: [143, 188, 143, 1],
												darkslateblue: [72, 61, 139, 1],
												darkslategray: [47, 79, 79, 1],
												darkslategrey: [47, 79, 79, 1],
												darkturquoise: [0, 206, 209, 1],
												darkviolet: [148, 0, 211, 1],
												deeppink: [255, 20, 147, 1],
												deepskyblue: [0, 191, 255, 1],
												dimgray: [105, 105, 105, 1],
												dimgrey: [105, 105, 105, 1],
												dodgerblue: [30, 144, 255, 1],
												firebrick: [178, 34, 34, 1],
												floralwhite: [255, 250, 240, 1],
												forestgreen: [34, 139, 34, 1],
												fuchsia: [255, 0, 255, 1],
												gainsboro: [220, 220, 220, 1],
												ghostwhite: [248, 248, 255, 1],
												gold: [255, 215, 0, 1],
												goldenrod: [218, 165, 32, 1],
												gray: [128, 128, 128, 1],
												green: [0, 128, 0, 1],
												greenyellow: [173, 255, 47, 1],
												grey: [128, 128, 128, 1],
												honeydew: [240, 255, 240, 1],
												hotpink: [255, 105, 180, 1],
												indianred: [205, 92, 92, 1],
												indigo: [75, 0, 130, 1],
												ivory: [255, 255, 240, 1],
												khaki: [240, 230, 140, 1],
												lavender: [230, 230, 250, 1],
												lavenderblush: [255, 240, 245, 1],
												lawngreen: [124, 252, 0, 1],
												lemonchiffon: [255, 250, 205, 1],
												lightblue: [173, 216, 230, 1],
												lightcoral: [240, 128, 128, 1],
												lightcyan: [224, 255, 255, 1],
												lightgoldenrodyellow: [250, 250, 210, 1],
												lightgray: [211, 211, 211, 1],
												lightgreen: [144, 238, 144, 1],
												lightgrey: [211, 211, 211, 1],
												lightpink: [255, 182, 193, 1],
												lightsalmon: [255, 160, 122, 1],
												lightseagreen: [32, 178, 170, 1],
												lightskyblue: [135, 206, 250, 1],
												lightslategray: [119, 136, 153, 1],
												lightslategrey: [119, 136, 153, 1],
												lightsteelblue: [176, 196, 222, 1],
												lightyellow: [255, 255, 224, 1],
												lime: [0, 255, 0, 1],
												limegreen: [50, 205, 50, 1],
												linen: [250, 240, 230, 1],
												magenta: [255, 0, 255, 1],
												maroon: [128, 0, 0, 1],
												mediumaquamarine: [102, 205, 170, 1],
												mediumblue: [0, 0, 205, 1],
												mediumorchid: [186, 85, 211, 1],
												mediumpurple: [147, 112, 219, 1],
												mediumseagreen: [60, 179, 113, 1],
												mediumslateblue: [123, 104, 238, 1],
												mediumspringgreen: [0, 250, 154, 1],
												mediumturquoise: [72, 209, 204, 1],
												mediumvioletred: [199, 21, 133, 1],
												midnightblue: [25, 25, 112, 1],
												mintcream: [245, 255, 250, 1],
												mistyrose: [255, 228, 225, 1],
												moccasin: [255, 228, 181, 1],
												navajowhite: [255, 222, 173, 1],
												navy: [0, 0, 128, 1],
												oldlace: [253, 245, 230, 1],
												olive: [128, 128, 0, 1],
												olivedrab: [107, 142, 35, 1],
												orange: [255, 165, 0, 1],
												orangered: [255, 69, 0, 1],
												orchid: [218, 112, 214, 1],
												palegoldenrod: [238, 232, 170, 1],
												palegreen: [152, 251, 152, 1],
												paleturquoise: [175, 238, 238, 1],
												palevioletred: [219, 112, 147, 1],
												papayawhip: [255, 239, 213, 1],
												peachpuff: [255, 218, 185, 1],
												peru: [205, 133, 63, 1],
												pink: [255, 192, 203, 1],
												plum: [221, 160, 221, 1],
												powderblue: [176, 224, 230, 1],
												purple: [128, 0, 128, 1],
												red: [255, 0, 0, 1],
												rosybrown: [188, 143, 143, 1],
												royalblue: [65, 105, 225, 1],
												saddlebrown: [139, 69, 19, 1],
												salmon: [250, 128, 114, 1],
												sandybrown: [244, 164, 96, 1],
												seagreen: [46, 139, 87, 1],
												seashell: [255, 245, 238, 1],
												sienna: [160, 82, 45, 1],
												silver: [192, 192, 192, 1],
												skyblue: [135, 206, 235, 1],
												slateblue: [106, 90, 205, 1],
												slategray: [112, 128, 144, 1],
												slategrey: [112, 128, 144, 1],
												snow: [255, 250, 250, 1],
												springgreen: [0, 255, 127, 1],
												steelblue: [70, 130, 180, 1],
												tan: [210, 180, 140, 1],
												teal: [0, 128, 128, 1],
												thistle: [216, 191, 216, 1],
												tomato: [255, 99, 71, 1],
												turquoise: [64, 224, 208, 1],
												violet: [238, 130, 238, 1],
												wheat: [245, 222, 179, 1],
												white: [255, 255, 255, 1],
												whitesmoke: [245, 245, 245, 1],
												yellow: [255, 255, 0, 1],
												yellowgreen: [154, 205, 50, 1]
											},
											z = new x(20),
											A = null;
										a.exports = {
											parse: n,
											lift: q,
											toHex: r,
											fastMapToColor: s,
											mapToColor: t,
											modifyHSL: u,
											modifyAlpha: v,
											stringify: w
										}
									}, function(a, b) {
										var c = Array.prototype.slice,
											d = function() {
												this._$handlers = {}
											};
										d.prototype = {
											constructor: d,
											one: function(a, b, c) {
												var d = this._$handlers;
												if(!b || !a) return this;
												d[a] || (d[a] = []);
												for(var e = 0; e < d[a].length; e++)
													if(d[a][e].h === b) return this;
												return d[a].push({
													h: b,
													one: !0,
													ctx: c || this
												}), this
											},
											on: function(a, b, c) {
												var d = this._$handlers;
												if(!b || !a) return this;
												d[a] || (d[a] = []);
												for(var e = 0; e < d[a].length; e++)
													if(d[a][e].h === b) return this;
												return d[a].push({
													h: b,
													one: !1,
													ctx: c || this
												}), this
											},
											isSilent: function(a) {
												var b = this._$handlers;
												return b[a] && b[a].length
											},
											off: function(a, b) {
												var c = this._$handlers;
												if(!a) return this._$handlers = {}, this;
												if(b) {
													if(c[a]) {
														for(var d = [], e = 0, f = c[a].length; f > e; e++) c[a][e].h != b && d.push(c[a][e]);
														c[a] = d
													}
													c[a] && 0 === c[a].length && delete c[a]
												} else delete c[a];
												return this
											},
											trigger: function(a) {
												if(this._$handlers[a]) {
													var b = arguments,
														d = b.length;
													d > 3 && (b = c.call(b, 1));
													for(var e = this._$handlers[a], f = e.length, g = 0; f > g;) {
														switch(d) {
															case 1:
																e[g].h.call(e[g].ctx);
																break;
															case 2:
																e[g].h.call(e[g].ctx, b[1]);
																break;
															case 3:
																e[g].h.call(e[g].ctx, b[1], b[2]);
																break;
															default:
																e[g].h.apply(e[g].ctx, b)
														}
														e[g].one ? (e.splice(g, 1), f--) : g++
													}
												}
												return this
											},
											triggerWithContext: function(a) {
												if(this._$handlers[a]) {
													var b = arguments,
														d = b.length;
													d > 4 && (b = c.call(b, 1, b.length - 1));
													for(var e = b[b.length - 1], f = this._$handlers[a], g = f.length, h = 0; g > h;) {
														switch(d) {
															case 1:
																f[h].h.call(e);
																break;
															case 2:
																f[h].h.call(e, b[1]);
																break;
															case 3:
																f[h].h.call(e, b[1], b[2]);
																break;
															default:
																f[h].h.apply(e, b)
														}
														f[h].one ? (f.splice(h, 1), g--) : h++
													}
												}
												return this
											}
										}, a.exports = d
									}, function(a, b, c) {
										"use strict";
										var d = c(3),
											e = c(12),
											f = d.extendShape({
												type: "triangle",
												shape: {
													cx: 0,
													cy: 0,
													width: 0,
													height: 0
												},
												buildPath: function(a, b) {
													var c = b.cx,
														d = b.cy,
														e = b.width / 2,
														f = b.height / 2;
													a.moveTo(c, d - f), a.lineTo(c + e, d + f), a.lineTo(c - e, d + f), a.closePath()
												}
											}),
											g = d.extendShape({
												type: "diamond",
												shape: {
													cx: 0,
													cy: 0,
													width: 0,
													height: 0
												},
												buildPath: function(a, b) {
													var c = b.cx,
														d = b.cy,
														e = b.width / 2,
														f = b.height / 2;
													a.moveTo(c, d - f), a.lineTo(c + e, d), a.lineTo(c, d + f), a.lineTo(c - e, d), a.closePath()
												}
											}),
											h = d.extendShape({
												type: "pin",
												shape: {
													x: 0,
													y: 0,
													width: 0,
													height: 0
												},
												buildPath: function(a, b) {
													var c = b.x,
														d = b.y,
														e = b.width / 5 * 3,
														f = Math.max(e, b.height),
														g = e / 2,
														h = g * g / (f - g),
														i = d - f + g + h,
														j = Math.asin(h / g),
														k = Math.cos(j) * g,
														l = Math.sin(j),
														m = Math.cos(j);
													a.arc(c, i, g, Math.PI - j, 2 * Math.PI + j);
													var n = .6 * g,
														o = .7 * g;
													a.bezierCurveTo(c + k - l * n, i + h + m * n, c, d - o, c, d), a.bezierCurveTo(c, d - o, c - k + l * n, i + h + m * n, c - k, i + h), a.closePath()
												}
											}),
											i = d.extendShape({
												type: "arrow",
												shape: {
													x: 0,
													y: 0,
													width: 0,
													height: 0
												},
												buildPath: function(a, b) {
													var c = b.height,
														d = b.width,
														e = b.x,
														f = b.y,
														g = d / 3 * 2;
													a.moveTo(e, f), a.lineTo(e + g, f + c), a.lineTo(e, f + c / 4 * 3), a.lineTo(e - g, f + c), a.lineTo(e, f), a.closePath()
												}
											}),
											j = {
												line: d.Line,
												rect: d.Rect,
												roundRect: d.Rect,
												square: d.Rect,
												circle: d.Circle,
												diamond: g,
												pin: h,
												arrow: i,
												triangle: f
											},
											k = {
												line: function(a, b, c, d, e) {
													e.x1 = a, e.y1 = b + d / 2, e.x2 = a + c, e.y2 = b + d / 2
												},
												rect: function(a, b, c, d, e) {
													e.x = a, e.y = b, e.width = c, e.height = d
												},
												roundRect: function(a, b, c, d, e) {
													e.x = a, e.y = b, e.width = c, e.height = d, e.r = Math.min(c, d) / 4
												},
												square: function(a, b, c, d, e) {
													var f = Math.min(c, d);
													e.x = a, e.y = b, e.width = f, e.height = f
												},
												circle: function(a, b, c, d, e) {
													e.cx = a + c / 2, e.cy = b + d / 2, e.r = Math.min(c, d) / 2
												},
												diamond: function(a, b, c, d, e) {
													e.cx = a + c / 2, e.cy = b + d / 2, e.width = c, e.height = d
												},
												pin: function(a, b, c, d, e) {
													e.x = a + c / 2, e.y = b + d / 2, e.width = c, e.height = d
												},
												arrow: function(a, b, c, d, e) {
													e.x = a + c / 2, e.y = b + d / 2, e.width = c, e.height = d
												},
												triangle: function(a, b, c, d, e) {
													e.cx = a + c / 2, e.cy = b + d / 2, e.width = c, e.height = d
												}
											},
											l = {};
										for(var m in j) j.hasOwnProperty(m) && (l[m] = new j[m]);
										var n = d.extendShape({
												type: "symbol",
												shape: {
													symbolType: "",
													x: 0,
													y: 0,
													width: 0,
													height: 0
												},
												beforeBrush: function() {
													var a = this.style,
														b = this.shape;
													"pin" === b.symbolType && "inside" === a.textPosition && (a.textPosition = ["50%", "40%"], a.textAlign = "center", a.textVerticalAlign = "middle")
												},
												buildPath: function(a, b, c) {
													var d = b.symbolType,
														e = l[d];
													"none" !== b.symbolType && (e || (d = "rect", e = l[d]), k[d](b.x, b.y, b.width, b.height, e.shape), e.buildPath(a, e.shape, c))
												}
											}),
											o = function(a) {
												if("image" !== this.type) {
													var b = this.style,
														c = this.shape;
													c && "line" === c.symbolType ? b.stroke = a : this.__isEmptyBrush ? (b.stroke = a, b.fill = "#fff") : (b.fill && (b.fill = a), b.stroke && (b.stroke = a)), this.dirty(!1)
												}
											},
											p = {
												createSymbol: function(a, b, c, f, g, h) {
													var i = 0 === a.indexOf("empty");
													i && (a = a.substr(5, 1).toLowerCase() + a.substr(6));
													var j;
													return j = 0 === a.indexOf("image://") ? new d.Image({
														style: {
															image: a.slice(8),
															x: b,
															y: c,
															width: f,
															height: g
														}
													}) : 0 === a.indexOf("path://") ? d.makePath(a.slice(7), {}, new e(b, c, f, g)) : new n({
														shape: {
															symbolType: a,
															x: b,
															y: c,
															width: f,
															height: g
														}
													}), j.__isEmptyBrush = i, j.setColor = o, j.setColor(h), j
												}
											};
										a.exports = p
									}, function(a, b, c) {
										function d(a, b, c) {
											function d(a, b, c) {
												l[b] ? a.otherDims[b] = c : (a.coordDim = b, a.coordDimIndex = c, q.set(b, !0))
											}

											function g(a, b, c) {
												if(c || null != b.get(a)) {
													for(var d = 0; null != b.get(a + d);) d++;
													a += d
												}
												return b.set(a, !0), a
											}
											b = b || [], c = c || {}, a = (a || []).slice();
											var n = (c.dimsDef || []).slice(),
												o = f.createHashMap(c.encodeDef),
												p = f.createHashMap(),
												q = f.createHashMap(),
												r = [],
												s = c.dimCount;
											if(null == s) {
												var t = e(b[0]);
												s = Math.max(f.isArray(t) && t.length || 1, a.length, n.length), h(a, function(a) {
													var b = a.dimsDef;
													b && (s = Math.max(s, b.length))
												})
											}
											for(var u = 0; s > u; u++) {
												var v = i(n[u]) ? {
														name: n[u]
													} : n[u] || {},
													w = v.name,
													x = r[u] = {
														otherDims: {}
													};
												null != w && null == p.get(w) && (x.name = x.tooltipName = w, p.set(w, u)), null != v.type && (x.type = v.type)
											}
											o.each(function(a, b) {
												a = o.set(b, k(a).slice()), h(a, function(c, e) {
													i(c) && (c = p.get(c)), null != c && s > c && (a[e] = c, d(r[c], b, e))
												})
											});
											var y = 0;
											h(a, function(a, b) {
												var c, a, e, g;
												i(a) ? (c = a, a = {}) : (c = a.name, a = f.clone(a), e = a.dimsDef, g = a.otherDims, a.name = a.coordDim = a.coordDimIndex = a.dimsDef = a.otherDims = null);
												var l = k(o.get(c));
												if(!l.length)
													for(var m = 0; m < (e && e.length || 1); m++) {
														for(; y < r.length && null != r[y].coordDim;) y++;
														y < r.length && l.push(y++)
													}
												h(l, function(b, f) {
													var h = r[b];
													d(j(h, a), c, f), null == h.name && e && (h.name = h.tooltipName = e[f]), g && j(h.otherDims, g)
												})
											});
											for(var z = c.extraPrefix || "value", A = 0; s > A; A++) {
												var x = r[A] = r[A] || {},
													B = x.coordDim;
												null == B && (x.coordDim = g(z, q, c.extraFromZero), x.coordDimIndex = 0, x.isExtraCoord = !0), null == x.name && (x.name = g(x.coordDim, p)), null == x.type && m(b, A) && (x.type = "ordinal")
											}
											return r
										}

										function e(a) {
											return f.isArray(a) ? a : f.isObject(a) ? a.value : a
										}
										var f = c(1),
											g = c(5),
											h = f.each,
											i = f.isString,
											j = f.defaults,
											k = g.normalizeToArray,
											l = {
												tooltip: 1,
												label: 1,
												itemName: 1
											},
											m = d.guessOrdinal = function(a, b) {
												for(var c = 0, d = a.length; d > c; c++) {
													var g = e(a[c]);
													if(!f.isArray(g)) return !1;
													var g = g[b];
													if(null != g && isFinite(g) && "" !== g) return !1;
													if(i(g) && "-" !== g) return !0
												}
												return !1
											};
										a.exports = d
									}, function(a, b, c) {
										"use strict";

										function d() {
											this._coordinateSystems = []
										}
										var e = c(1),
											f = {};
										d.prototype = {
											constructor: d,
											create: function(a, b) {
												var c = [];
												e.each(f, function(d, e) {
													var f = d.create(a, b);
													c = c.concat(f || [])
												}), this._coordinateSystems = c
											},
											update: function(a, b) {
												e.each(this._coordinateSystems, function(c) {
													c.update && c.update(a, b)
												})
											},
											getCoordinateSystems: function() {
												return this._coordinateSystems.slice()
											}
										}, d.register = function(a, b) {
											f[a] = b
										}, d.get = function(a) {
											return f[a]
										}, a.exports = d
									}, function(a, b, c) {
										"use strict";
										var d = c(20),
											e = c(6),
											f = c(89),
											g = c(12),
											h = c(35).devicePixelRatio,
											i = {
												M: 1,
												L: 2,
												C: 3,
												Q: 4,
												A: 5,
												Z: 6,
												R: 7
											},
											j = [],
											k = [],
											l = [],
											m = [],
											n = Math.min,
											o = Math.max,
											p = Math.cos,
											q = Math.sin,
											r = Math.sqrt,
											s = Math.abs,
											t = "undefined" != typeof Float32Array,
											u = function(a) {
												this._saveData = !a, this._saveData && (this.data = []), this._ctx = null
											};
										u.prototype = {
											constructor: u,
											_xi: 0,
											_yi: 0,
											_x0: 0,
											_y0: 0,
											_ux: 0,
											_uy: 0,
											_len: 0,
											_lineDash: null,
											_dashOffset: 0,
											_dashIdx: 0,
											_dashSum: 0,
											setScale: function(a, b) {
												this._ux = s(1 / h / a) || 0, this._uy = s(1 / h / b) || 0
											},
											getContext: function() {
												return this._ctx
											},
											beginPath: function(a) {
												return this._ctx = a, a && a.beginPath(), a && (this.dpr = a.dpr), this._saveData && (this._len = 0), this._lineDash && (this._lineDash = null, this._dashOffset = 0), this
											},
											moveTo: function(a, b) {
												return this.addData(i.M, a, b), this._ctx && this._ctx.moveTo(a, b), this._x0 = a, this._y0 = b, this._xi = a, this._yi = b, this
											},
											lineTo: function(a, b) {
												var c = s(a - this._xi) > this._ux || s(b - this._yi) > this._uy || this._len < 5;
												return this.addData(i.L, a, b), this._ctx && c && (this._needsDash() ? this._dashedLineTo(a, b) : this._ctx.lineTo(a, b)), c && (this._xi = a, this._yi = b), this
											},
											bezierCurveTo: function(a, b, c, d, e, f) {
												return this.addData(i.C, a, b, c, d, e, f), this._ctx && (this._needsDash() ? this._dashedBezierTo(a, b, c, d, e, f) : this._ctx.bezierCurveTo(a, b, c, d, e, f)), this._xi = e, this._yi = f, this
											},
											quadraticCurveTo: function(a, b, c, d) {
												return this.addData(i.Q, a, b, c, d), this._ctx && (this._needsDash() ? this._dashedQuadraticTo(a, b, c, d) : this._ctx.quadraticCurveTo(a, b, c, d)), this._xi = c, this._yi = d, this
											},
											arc: function(a, b, c, d, e, f) {
												return this.addData(i.A, a, b, c, c, d, e - d, 0, f ? 0 : 1), this._ctx && this._ctx.arc(a, b, c, d, e, f), this._xi = p(e) * c + a, this._yi = q(e) * c + a, this
											},
											arcTo: function(a, b, c, d, e) {
												return this._ctx && this._ctx.arcTo(a, b, c, d, e), this
											},
											rect: function(a, b, c, d) {
												return this._ctx && this._ctx.rect(a, b, c, d), this.addData(i.R, a, b, c, d), this
											},
											closePath: function() {
												this.addData(i.Z);
												var a = this._ctx,
													b = this._x0,
													c = this._y0;
												return a && (this._needsDash() && this._dashedLineTo(b, c), a.closePath()), this._xi = b, this._yi = c, this
											},
											fill: function(a) {
												a && a.fill(), this.toStatic()
											},
											stroke: function(a) {
												a && a.stroke(), this.toStatic()
											},
											setLineDash: function(a) {
												if(a instanceof Array) {
													this._lineDash = a, this._dashIdx = 0;
													for(var b = 0, c = 0; c < a.length; c++) b += a[c];
													this._dashSum = b
												}
												return this
											},
											setLineDashOffset: function(a) {
												return this._dashOffset = a, this
											},
											len: function() {
												return this._len
											},
											setData: function(a) {
												var b = a.length;
												this.data && this.data.length == b || !t || (this.data = new Float32Array(b));
												for(var c = 0; b > c; c++) this.data[c] = a[c];
												this._len = b
											},
											appendPath: function(a) {
												a instanceof Array || (a = [a]);
												for(var b = a.length, c = 0, d = this._len, e = 0; b > e; e++) c += a[e].len();
												t && this.data instanceof Float32Array && (this.data = new Float32Array(d + c));
												for(var e = 0; b > e; e++)
													for(var f = a[e].data, g = 0; g < f.length; g++) this.data[d++] = f[g];
												this._len = d
											},
											addData: function(a) {
												if(this._saveData) {
													var b = this.data;
													this._len + arguments.length > b.length && (this._expandData(), b = this.data);
													for(var c = 0; c < arguments.length; c++) b[this._len++] = arguments[c];
													this._prevCmd = a
												}
											},
											_expandData: function() {
												if(!(this.data instanceof Array)) {
													for(var a = [], b = 0; b < this._len; b++) a[b] = this.data[b];
													this.data = a
												}
											},
											_needsDash: function() {
												return this._lineDash
											},
											_dashedLineTo: function(a, b) {
												var c, d, e = this._dashSum,
													f = this._dashOffset,
													g = this._lineDash,
													h = this._ctx,
													i = this._xi,
													j = this._yi,
													k = a - i,
													l = b - j,
													m = r(k * k + l * l),
													p = i,
													q = j,
													s = g.length;
												for(k /= m, l /= m, 0 > f && (f = e + f), f %= e, p -= f * k, q -= f * l; k > 0 && a >= p || 0 > k && p >= a || 0 == k && (l > 0 && b >= q || 0 > l && q >= b);) d = this._dashIdx, c = g[d], p += k * c, q += l * c, this._dashIdx = (d + 1) % s, k > 0 && i > p || 0 > k && p > i || l > 0 && j > q || 0 > l && q > j || h[d % 2 ? "moveTo" : "lineTo"](k >= 0 ? n(p, a) : o(p, a), l >= 0 ? n(q, b) : o(q, b));
												k = p - a, l = q - b, this._dashOffset = -r(k * k + l * l)
											},
											_dashedBezierTo: function(a, b, c, e, f, g) {
												var h, i, j, k, l, m = this._dashSum,
													n = this._dashOffset,
													o = this._lineDash,
													p = this._ctx,
													q = this._xi,
													s = this._yi,
													t = d.cubicAt,
													u = 0,
													v = this._dashIdx,
													w = o.length,
													x = 0;
												for(0 > n && (n = m + n), n %= m, h = 0; 1 > h; h += .1) i = t(q, a, c, f, h + .1) - t(q, a, c, f, h),
													j = t(s, b, e, g, h + .1) - t(s, b, e, g, h), u += r(i * i + j * j);
												for(; w > v && (x += o[v], !(x > n)); v++);
												for(h = (x - n) / u; 1 >= h;) k = t(q, a, c, f, h), l = t(s, b, e, g, h), v % 2 ? p.moveTo(k, l) : p.lineTo(k, l), h += o[v] / u, v = (v + 1) % w;
												v % 2 !== 0 && p.lineTo(f, g), i = f - k, j = g - l, this._dashOffset = -r(i * i + j * j)
											},
											_dashedQuadraticTo: function(a, b, c, d) {
												var e = c,
													f = d;
												c = (c + 2 * a) / 3, d = (d + 2 * b) / 3, a = (this._xi + 2 * a) / 3, b = (this._yi + 2 * b) / 3, this._dashedBezierTo(a, b, c, d, e, f)
											},
											toStatic: function() {
												var a = this.data;
												a instanceof Array && (a.length = this._len, t && (this.data = new Float32Array(a)))
											},
											getBoundingRect: function() {
												j[0] = j[1] = l[0] = l[1] = Number.MAX_VALUE, k[0] = k[1] = m[0] = m[1] = -Number.MAX_VALUE;
												for(var a = this.data, b = 0, c = 0, d = 0, h = 0, n = 0; n < a.length;) {
													var o = a[n++];
													switch(1 == n && (b = a[n], c = a[n + 1], d = b, h = c), o) {
														case i.M:
															d = a[n++], h = a[n++], b = d, c = h, l[0] = d, l[1] = h, m[0] = d, m[1] = h;
															break;
														case i.L:
															f.fromLine(b, c, a[n], a[n + 1], l, m), b = a[n++], c = a[n++];
															break;
														case i.C:
															f.fromCubic(b, c, a[n++], a[n++], a[n++], a[n++], a[n], a[n + 1], l, m), b = a[n++], c = a[n++];
															break;
														case i.Q:
															f.fromQuadratic(b, c, a[n++], a[n++], a[n], a[n + 1], l, m), b = a[n++], c = a[n++];
															break;
														case i.A:
															var r = a[n++],
																s = a[n++],
																t = a[n++],
																u = a[n++],
																v = a[n++],
																w = a[n++] + v,
																x = (a[n++], 1 - a[n++]);
															1 == n && (d = p(v) * t + r, h = q(v) * u + s), f.fromArc(r, s, t, u, v, w, x, l, m), b = p(w) * t + r, c = q(w) * u + s;
															break;
														case i.R:
															d = b = a[n++], h = c = a[n++];
															var y = a[n++],
																z = a[n++];
															f.fromLine(d, h, d + y, h + z, l, m);
															break;
														case i.Z:
															b = d, c = h
													}
													e.min(j, j, l), e.max(k, k, m)
												}
												return 0 === n && (j[0] = j[1] = k[0] = k[1] = 0), new g(j[0], j[1], k[0] - j[0], k[1] - j[1])
											},
											rebuildPath: function(a) {
												for(var b, c, d, e, f, g, h = this.data, j = this._ux, k = this._uy, l = this._len, m = 0; l > m;) {
													var n = h[m++];
													switch(1 == m && (d = h[m], e = h[m + 1], b = d, c = e), n) {
														case i.M:
															b = d = h[m++], c = e = h[m++], a.moveTo(d, e);
															break;
														case i.L:
															f = h[m++], g = h[m++], (s(f - d) > j || s(g - e) > k || m === l - 1) && (a.lineTo(f, g), d = f, e = g);
															break;
														case i.C:
															a.bezierCurveTo(h[m++], h[m++], h[m++], h[m++], h[m++], h[m++]), d = h[m - 2], e = h[m - 1];
															break;
														case i.Q:
															a.quadraticCurveTo(h[m++], h[m++], h[m++], h[m++]), d = h[m - 2], e = h[m - 1];
															break;
														case i.A:
															var o = h[m++],
																r = h[m++],
																t = h[m++],
																u = h[m++],
																v = h[m++],
																w = h[m++],
																x = h[m++],
																y = h[m++],
																z = t > u ? t : u,
																A = t > u ? 1 : t / u,
																B = t > u ? u / t : 1,
																C = Math.abs(t - u) > .001,
																D = v + w;
															C ? (a.translate(o, r), a.rotate(x), a.scale(A, B), a.arc(0, 0, z, v, D, 1 - y), a.scale(1 / A, 1 / B), a.rotate(-x), a.translate(-o, -r)) : a.arc(o, r, z, v, D, 1 - y), 1 == m && (b = p(v) * t + o, c = q(v) * u + r), d = p(D) * t + o, e = q(D) * u + r;
															break;
														case i.R:
															b = d = h[m], c = e = h[m + 1], a.rect(h[m++], h[m++], h[m++], h[m++]);
															break;
														case i.Z:
															a.closePath(), d = b, e = c
													}
												}
											}
										}, u.CMD = i, a.exports = u
									}, function(a, b, c) {
										"use strict";

										function d(a) {
											for(var b = 0; b < a.length && null == a[b];) b++;
											return a[b]
										}

										function e(a) {
											var b = d(a);
											return null != b && !l.isArray(o(b))
										}

										function f(a, b, c) {
											a = a || [];
											var d = b.get("coordinateSystem"),
												f = q[d],
												g = n.get(d),
												h = {
													encodeDef: b.get("encode"),
													dimsDef: b.get("dimensions")
												},
												r = f && f(a, b, c, h),
												s = r && r.dimensions;
											s || (s = g && (g.getDimensionsInfo ? g.getDimensionsInfo() : g.dimensions.slice()) || ["x", "y"], s = k(s, a, h));
											var t = r ? r.categoryIndex : -1,
												u = new j(s, b),
												v = i(r, a),
												w = {},
												x = t >= 0 && e(a) ? function(a, b, c, d) {
													return m.isDataItemOption(a) && (u.hasItemOption = !0), d === t ? c : p(o(a), s[d])
												} : function(a, b, c, d) {
													var e = o(a),
														f = p(e && e[d], s[d]);
													m.isDataItemOption(a) && (u.hasItemOption = !0);
													var g = r && r.categoryAxesModels;
													return g && g[b] && "string" == typeof f && (w[b] = w[b] || g[b].getCategories(), f = l.indexOf(w[b], f), 0 > f && !isNaN(f) && (f = +f)), f
												};
											return u.hasItemOption = !1, u.initData(a, v, x), u
										}

										function g(a) {
											return "category" !== a && "time" !== a
										}

										function h(a) {
											return "category" === a ? "ordinal" : "time" === a ? "time" : "float"
										}

										function i(a, b) {
											var c, d = [],
												e = a && a.dimensions[a.categoryIndex];
											if(e && (c = a.categoryAxesModels[e.name]), c) {
												var f = c.getCategories();
												if(f) {
													var g = b.length;
													if(l.isArray(b[0]) && b[0].length > 1) {
														d = [];
														for(var h = 0; g > h; h++) d[h] = f[b[h][a.categoryIndex || 0]]
													} else d = f.slice(0)
												}
											}
											return d
										}
										var j = c(14),
											k = c(25),
											l = c(1),
											m = c(5),
											n = c(26),
											o = m.getDataItemValue,
											p = m.converDataValue,
											q = {
												cartesian2d: function(a, b, c, d) {
													var e = l.map(["xAxis", "yAxis"], function(a) {
															return c.queryComponents({
																mainType: a,
																index: b.get(a + "Index"),
																id: b.get(a + "Id")
															})[0]
														}),
														f = e[0],
														i = e[1],
														j = f.get("type"),
														m = i.get("type"),
														n = [{
															name: "x",
															type: h(j),
															stackable: g(j)
														}, {
															name: "y",
															type: h(m),
															stackable: g(m)
														}],
														o = "category" === j,
														p = "category" === m;
													n = k(n, a, d);
													var q = {};
													return o && (q.x = f), p && (q.y = i), {
														dimensions: n,
														categoryIndex: o ? 0 : p ? 1 : -1,
														categoryAxesModels: q
													}
												},
												singleAxis: function(a, b, c, d) {
													var e = c.queryComponents({
															mainType: "singleAxis",
															index: b.get("singleAxisIndex"),
															id: b.get("singleAxisId")
														})[0],
														f = e.get("type"),
														i = "category" === f,
														j = [{
															name: "single",
															type: h(f),
															stackable: g(f)
														}];
													j = k(j, a, d);
													var l = {};
													return i && (l.single = e), {
														dimensions: j,
														categoryIndex: i ? 0 : -1,
														categoryAxesModels: l
													}
												},
												polar: function(a, b, c, d) {
													var e = c.queryComponents({
															mainType: "polar",
															index: b.get("polarIndex"),
															id: b.get("polarId")
														})[0],
														f = e.findAxisModel("angleAxis"),
														i = e.findAxisModel("radiusAxis"),
														j = i.get("type"),
														l = f.get("type"),
														m = [{
															name: "radius",
															type: h(j),
															stackable: g(j)
														}, {
															name: "angle",
															type: h(l),
															stackable: g(l)
														}],
														n = "category" === l,
														o = "category" === j;
													m = k(m, a, d);
													var p = {};
													return o && (p.radius = i), n && (p.angle = f), {
														dimensions: m,
														categoryIndex: n ? 1 : o ? 0 : -1,
														categoryAxesModels: p
													}
												},
												geo: function(a, b, c, d) {
													return {
														dimensions: k([{
															name: "lng"
														}, {
															name: "lat"
														}], a, d)
													}
												}
											};
										a.exports = f
									}, , function(a, b, c) {
										function d() {
											this.group = new g, this.uid = h.getUID("viewChart")
										}

										function e(a, b) {
											if(a && (a.trigger(b), "group" === a.type))
												for(var c = 0; c < a.childCount(); c++) e(a.childAt(c), b)
										}

										function f(a, b, c) {
											var d = j.queryDataIndex(a, b);
											null != d ? k.each(j.normalizeToArray(d), function(b) {
												e(a.getItemGraphicEl(b), c)
											}) : a.eachItemGraphicEl(function(a) {
												e(a, c)
											})
										}
										var g = c(36),
											h = c(50),
											i = c(15),
											j = c(5),
											k = c(1);
										d.prototype = {
											type: "chart",
											init: function(a, b) {},
											render: function(a, b, c, d) {},
											highlight: function(a, b, c, d) {
												f(a.getData(), d, "emphasis")
											},
											downplay: function(a, b, c, d) {
												f(a.getData(), d, "normal")
											},
											remove: function(a, b) {
												this.group.removeAll()
											},
											dispose: function() {}
										};
										var l = d.prototype;
										l.updateView = l.updateLayout = l.updateVisual = function(a, b, c, d) {
											this.render(a, b, c, d)
										}, i.enableClassExtend(d, ["dispose"]), i.enableClassManagement(d, {
											registerWhenExtend: !0
										}), a.exports = d
									}, function(a, b, c) {
										var d = c(1);
										a.exports = function(a) {
											for(var b = 0; b < a.length; b++) a[b][1] || (a[b][1] = a[b][0]);
											return function(b, c) {
												for(var e = {}, f = 0; f < a.length; f++) {
													var g = a[f][1];
													if(!(b && d.indexOf(b, g) >= 0 || c && d.indexOf(c, g) < 0)) {
														var h = this.getShallow(g);
														null != h && (e[a[f][0]] = h)
													}
												}
												return e
											}
										}
									}, function(a, b, c) {
										"use strict";
										var d = c(3),
											e = c(1),
											f = c(2);
										c(59), c(121), f.extendComponentView({
											type: "grid",
											render: function(a, b) {
												this.group.removeAll(), a.get("show") && this.group.add(new d.Rect({
													shape: a.coordinateSystem.getRect(),
													style: e.defaults({
														fill: a.get("backgroundColor")
													}, a.getItemStyle()),
													silent: !0,
													z2: -1
												}))
											}
										}), f.registerPreprocessor(function(a) {
											a.xAxis && a.yAxis && !a.grid && (a.grid = {})
										})
									}, function(a, b, c) {
										function d(a, b) {
											var c = a[1] - a[0],
												d = b,
												e = c / d / 2;
											a[0] += e, a[1] -= e
										}
										var e = c(4),
											f = e.linearMap,
											g = c(1),
											h = c(18),
											i = [0, 1],
											j = function(a, b, c) {
												this.dim = a, this.scale = b, this._extent = c || [0, 0], this.inverse = !1, this.onBand = !1, this._labelInterval
											};
										j.prototype = {
											constructor: j,
											contain: function(a) {
												var b = this._extent,
													c = Math.min(b[0], b[1]),
													d = Math.max(b[0], b[1]);
												return a >= c && d >= a
											},
											containData: function(a) {
												return this.contain(this.dataToCoord(a))
											},
											getExtent: function() {
												return this._extent.slice()
											},
											getPixelPrecision: function(a) {
												return e.getPixelPrecision(a || this.scale.getExtent(), this._extent)
											},
											setExtent: function(a, b) {
												var c = this._extent;
												c[0] = a, c[1] = b
											},
											dataToCoord: function(a, b) {
												var c = this._extent,
													e = this.scale;
												return a = e.normalize(a), this.onBand && "ordinal" === e.type && (c = c.slice(), d(c, e.count())), f(a, i, c, b)
											},
											coordToData: function(a, b) {
												var c = this._extent,
													e = this.scale;
												this.onBand && "ordinal" === e.type && (c = c.slice(), d(c, e.count()));
												var g = f(a, c, i, b);
												return this.scale.scale(g)
											},
											pointToData: function(a, b) {},
											getTicksCoords: function(a) {
												if(this.onBand && !a) {
													for(var b = this.getBands(), c = [], d = 0; d < b.length; d++) c.push(b[d][0]);
													return b[d - 1] && c.push(b[d - 1][1]), c
												}
												return g.map(this.scale.getTicks(), this.dataToCoord, this)
											},
											getLabelsCoords: function() {
												return g.map(this.scale.getTicks(), this.dataToCoord, this)
											},
											getBands: function() {
												for(var a = this.getExtent(), b = [], c = this.scale.count(), d = a[0], e = a[1], f = e - d, g = 0; c > g; g++) b.push([f * g / c + d, f * (g + 1) / c + d]);
												return b
											},
											getBandWidth: function() {
												var a = this._extent,
													b = this.scale.getExtent(),
													c = b[1] - b[0] + (this.onBand ? 1 : 0);
												0 === c && (c = 1);
												var d = Math.abs(a[1] - a[0]);
												return Math.abs(d) / c
											},
											getLabelInterval: function() {
												var a = this._labelInterval;
												if(!a) {
													var b = this.model,
														c = b.getModel("axisLabel"),
														d = c.get("interval");
													"category" !== this.type || "auto" !== d ? a = "auto" === d ? 0 : d : this.isHorizontal && (a = h.getAxisLabelInterval(g.map(this.scale.getTicks(), this.dataToCoord, this), b.getFormattedLabels(), c.getFont(), this.isHorizontal())), this._labelInterval = a
												}
												return a
											}
										}, a.exports = j
									}, function(a, b, c) {
										function d(a) {
											this._setting = a || {}, this._extent = [1 / 0, -(1 / 0)], this._interval = 0, this.init && this.init.apply(this, arguments)
										}
										var e = c(15),
											f = d.prototype;
										f.parse = function(a) {
											return a
										}, f.getSetting = function(a) {
											return this._setting[a]
										}, f.contain = function(a) {
											var b = this._extent;
											return a >= b[0] && a <= b[1]
										}, f.normalize = function(a) {
											var b = this._extent;
											return b[1] === b[0] ? .5 : (a - b[0]) / (b[1] - b[0])
										}, f.scale = function(a) {
											var b = this._extent;
											return a * (b[1] - b[0]) + b[0]
										}, f.unionExtent = function(a) {
											var b = this._extent;
											a[0] < b[0] && (b[0] = a[0]), a[1] > b[1] && (b[1] = a[1])
										}, f.unionExtentFromData = function(a, b) {
											this.unionExtent(a.getDataExtent(b, !0))
										}, f.getExtent = function() {
											return this._extent.slice()
										}, f.setExtent = function(a, b) {
											var c = this._extent;
											isNaN(a) || (c[0] = a), isNaN(b) || (c[1] = b)
										}, f.getTicksLabels = function() {
											for(var a = [], b = this.getTicks(), c = 0; c < b.length; c++) a.push(this.getLabel(b[c]));
											return a
										}, f.isBlank = function() {
											return this._isBlank
										}, f.setBlank = function(a) {
											this._isBlank = a
										}, e.enableClassExtend(d), e.enableClassManagement(d, {
											registerWhenExtend: !0
										}), a.exports = d
									}, function(a, b) {
										var c = 1;
										"undefined" != typeof window && (c = Math.max(window.devicePixelRatio || 1, 1));
										var d = {
											debugMode: 0,
											devicePixelRatio: c
										};
										a.exports = d
									}, function(a, b, c) {
										var d = c(1),
											e = c(68),
											f = c(12),
											g = function(a) {
												a = a || {}, e.call(this, a);
												for(var b in a) a.hasOwnProperty(b) && (this[b] = a[b]);
												this._children = [], this.__storage = null, this.__dirty = !0
											};
										g.prototype = {
											constructor: g,
											isGroup: !0,
											type: "group",
											silent: !1,
											children: function() {
												return this._children.slice()
											},
											childAt: function(a) {
												return this._children[a]
											},
											childOfName: function(a) {
												for(var b = this._children, c = 0; c < b.length; c++)
													if(b[c].name === a) return b[c]
											},
											childCount: function() {
												return this._children.length
											},
											add: function(a) {
												return a && a !== this && a.parent !== this && (this._children.push(a), this._doAdd(a)), this
											},
											addBefore: function(a, b) {
												if(a && a !== this && a.parent !== this && b && b.parent === this) {
													var c = this._children,
														d = c.indexOf(b);
													d >= 0 && (c.splice(d, 0, a), this._doAdd(a))
												}
												return this
											},
											_doAdd: function(a) {
												a.parent && a.parent.remove(a), a.parent = this;
												var b = this.__storage,
													c = this.__zr;
												b && b !== a.__storage && (b.addToStorage(a), a instanceof g && a.addChildrenToStorage(b)), c && c.refresh()
											},
											remove: function(a) {
												var b = this.__zr,
													c = this.__storage,
													e = this._children,
													f = d.indexOf(e, a);
												return 0 > f ? this : (e.splice(f, 1), a.parent = null, c && (c.delFromStorage(a), a instanceof g && a.delChildrenFromStorage(c)), b && b.refresh(), this)
											},
											removeAll: function() {
												var a, b, c = this._children,
													d = this.__storage;
												for(b = 0; b < c.length; b++) a = c[b], d && (d.delFromStorage(a), a instanceof g && a.delChildrenFromStorage(d)), a.parent = null;
												return c.length = 0, this
											},
											eachChild: function(a, b) {
												for(var c = this._children, d = 0; d < c.length; d++) {
													var e = c[d];
													a.call(b, e, d)
												}
												return this
											},
											traverse: function(a, b) {
												for(var c = 0; c < this._children.length; c++) {
													var d = this._children[c];
													a.call(b, d), "group" === d.type && d.traverse(a, b)
												}
												return this
											},
											addChildrenToStorage: function(a) {
												for(var b = 0; b < this._children.length; b++) {
													var c = this._children[b];
													a.addToStorage(c), c instanceof g && c.addChildrenToStorage(a)
												}
											},
											delChildrenFromStorage: function(a) {
												for(var b = 0; b < this._children.length; b++) {
													var c = this._children[b];
													a.delFromStorage(c), c instanceof g && c.delChildrenFromStorage(a)
												}
											},
											dirty: function() {
												return this.__dirty = !0, this.__zr && this.__zr.refresh(), this
											},
											getBoundingRect: function(a) {
												for(var b = null, c = new f(0, 0, 0, 0), d = a || this._children, e = [], g = 0; g < d.length; g++) {
													var h = d[g];
													if(!h.ignore && !h.invisible) {
														var i = h.getBoundingRect(),
															j = h.getLocalTransform(e);
														j ? (c.copy(i), c.applyTransform(j), b = b || c.clone(), b.union(c)) : (b = b || i.clone(), b.union(i))
													}
												}
												return b || c
											}
										}, d.inherits(g, e), a.exports = g
									}, function(a, b) {
										var c = {},
											d = "\x00__throttleOriginMethod",
											e = "\x00__throttleRate",
											f = "\x00__throttleType";
										c.throttle = function(a, b, c) {
											function d() {
												k = (new Date).getTime(), l = null, a.apply(g, h || [])
											}
											var e, f, g, h, i, j = 0,
												k = 0,
												l = null;
											b = b || 0;
											var m = function() {
												e = (new Date).getTime(), g = this, h = arguments;
												var a = i || b,
													m = i || c;
												i = null, f = e - (m ? j : k) - a, clearTimeout(l), m ? l = setTimeout(d, a) : f >= 0 ? d() : l = setTimeout(d, -f), j = e
											};
											return m.clear = function() {
												l && (clearTimeout(l), l = null)
											}, m.debounceNextCall = function(a) {
												i = a
											}, m
										}, c.createOrUpdate = function(a, b, g, h) {
											var i = a[b];
											if(i) {
												var j = i[d] || i,
													k = i[f],
													l = i[e];
												if(l !== g || k !== h) {
													if(null == g || !h) return a[b] = j;
													i = a[b] = c.throttle(j, g, "debounce" === h), i[d] = j, i[f] = h, i[e] = g
												}
												return i
											}
										}, c.clear = function(a, b) {
											var c = a[b];
											c && c[d] && (a[b] = c[d])
										}, a.exports = c
									}, function(a, b, c) {
										function d(a) {
											a = a || {}, g.call(this, a);
											for(var b in a) a.hasOwnProperty(b) && "style" !== b && (this[b] = a[b]);
											this.style = new f(a.style, this), this._rect = null, this.__clipPaths = []
										}
										var e = c(1),
											f = c(75),
											g = c(68),
											h = c(91);
										d.prototype = {
											constructor: d,
											type: "displayable",
											__dirty: !0,
											invisible: !1,
											z: 0,
											z2: 0,
											zlevel: 0,
											draggable: !1,
											dragging: !1,
											silent: !1,
											culling: !1,
											cursor: "pointer",
											rectHover: !1,
											progressive: -1,
											beforeBrush: function(a) {},
											afterBrush: function(a) {},
											brush: function(a, b) {},
											getBoundingRect: function() {},
											contain: function(a, b) {
												return this.rectContain(a, b)
											},
											traverse: function(a, b) {
												a.call(b, this)
											},
											rectContain: function(a, b) {
												var c = this.transformCoordToLocal(a, b),
													d = this.getBoundingRect();
												return d.contain(c[0], c[1])
											},
											dirty: function() {
												this.__dirty = !0, this._rect = null, this.__zr && this.__zr.refresh()
											},
											animateStyle: function(a) {
												return this.animate("style", a)
											},
											attrKV: function(a, b) {
												"style" !== a ? g.prototype.attrKV.call(this, a, b) : this.style.set(b)
											},
											setStyle: function(a, b) {
												return this.style.set(a, b), this.dirty(!1), this
											},
											useStyle: function(a) {
												return this.style = new f(a, this), this.dirty(!1), this
											}
										}, e.inherits(d, g), e.mixin(d, h), a.exports = d
									}, function(a, b) {
										var c = function(a) {
											this.colorStops = a || []
										};
										c.prototype = {
											constructor: c,
											addColorStop: function(a, b) {
												this.colorStops.push({
													offset: a,
													color: b
												})
											}
										}, a.exports = c
									}, function(a, b, c) {
										function d(a) {
											if(a) {
												a.font = q.makeFont(a);
												var b = a.textAlign;
												"middle" === b && (b = "center"), a.textAlign = null == b || w[b] ? b : "left";
												var c = a.textVerticalAlign || a.textBaseline;
												"center" === c && (c = "middle"), a.textVerticalAlign = null == c || x[c] ? c : "top";
												var d = a.textPadding;
												d && (a.textPadding = r.normalizeCssArray(a.textPadding))
											}
										}

										function e(a, b, c, d, e) {
											var f = n(b, "font", d.font || q.DEFAULT_FONT),
												g = d.textPadding,
												i = a.__textCotentBlock;
											i && !a.__dirty || (i = a.__textCotentBlock = q.parsePlainText(c, f, g, d.truncate));
											var l = i.outerHeight,
												o = i.lines,
												r = i.lineHeight,
												s = m(l, d, e),
												t = s.baseX,
												u = s.baseY,
												v = s.textAlign,
												w = s.textVerticalAlign;
											h(b, d, e, t, u);
											var x = q.adjustTextY(u, l, w),
												y = t,
												B = x,
												C = j(d);
											if(C || g) {
												var D = q.getWidth(c, f),
													E = D;
												g && (E += g[1] + g[3]);
												var F = q.adjustTextX(t, E, v);
												C && k(a, b, d, F, x, E, l), g && (y = p(t, v, g), B += g[0])
											}
											n(b, "textAlign", v || "left"), n(b, "textBaseline", "middle"), n(b, "shadowBlur", d.textShadowBlur || 0), n(b, "shadowColor", d.textShadowColor || "transparent"), n(b, "shadowOffsetX", d.textShadowOffsetX || 0), n(b, "shadowOffsetY", d.textShadowOffsetY || 0), B += r / 2;
											var G = d.textLineWidth,
												H = z(d.textStroke, G),
												I = A(d.textFill);
											H && (n(b, "lineWidth", G), n(b, "strokeStyle", H)), I && n(b, "fillStyle", I);
											for(var J = 0; J < o.length; J++) H && b.strokeText(o[J], y, B), I && b.fillText(o[J], y, B), B += r
										}

										function f(a, b, c, d, e) {
											var f = a.__textCotentBlock;
											f && !a.__dirty || (f = a.__textCotentBlock = q.parseRichText(c, d)), g(a, b, f, d, e)
										}

										function g(a, b, c, d, e) {
											var f = c.width,
												g = c.outerWidth,
												l = c.outerHeight,
												n = d.textPadding,
												o = m(l, d, e),
												p = o.baseX,
												r = o.baseY,
												s = o.textAlign,
												t = o.textVerticalAlign;
											h(b, d, e, p, r);
											var u = q.adjustTextX(p, g, s),
												v = q.adjustTextY(r, l, t),
												w = u,
												x = v;
											n && (w += n[3], x += n[0]);
											var y = w + f;
											j(d) && k(a, b, d, u, v, g, l);
											for(var z = 0; z < c.lines.length; z++) {
												for(var A, B = c.lines[z], C = B.tokens, D = C.length, E = B.lineHeight, F = B.width, G = 0, H = w, I = y, J = D - 1; D > G && (A = C[G], !A.textAlign || "left" === A.textAlign);) i(a, b, A, d, E, x, H, "left"), F -= A.width, H += A.width, G++;
												for(; J >= 0 && (A = C[J], "right" === A.textAlign);) i(a, b, A, d, E, x, I, "right"), F -= A.width, I -= A.width, J--;
												for(H += (f - (H - w) - (y - I) - F) / 2; J >= G;) A = C[G], i(a, b, A, d, E, x, H + A.width / 2, "center"), H += A.width, G++;
												x += E
											}
										}

										function h(a, b, c, d, e) {
											if(c && b.textRotation) {
												var f = b.textOrigin;
												"center" === f ? (d = c.width / 2 + c.x, e = c.height / 2 + c.y) : f && (d = f[0] + c.x, e = f[1] + c.y), a.translate(d, e), a.rotate(-b.textRotation), a.translate(-d, -e)
											}
										}

										function i(a, b, c, d, e, f, g, h) {
											var i = d.rich[c.styleName] || {},
												l = c.textVerticalAlign,
												m = f + e / 2;
											"top" === l ? m = f + c.height / 2 : "bottom" === l && (m = f + e - c.height / 2), !c.isLineHolder && j(i) && k(a, b, i, "right" === h ? g - c.width : "center" === h ? g - c.width / 2 : g, m - c.height / 2, c.width, c.height);
											var o = c.textPadding;
											o && (g = p(g, h, o), m -= c.height / 2 - o[2] - c.textHeight / 2), n(b, "shadowBlur", u(i.textShadowBlur, d.textShadowBlur, 0)), n(b, "shadowColor", i.textShadowColor || d.textShadowColor || "transparent"), n(b, "shadowOffsetX", u(i.textShadowOffsetX, d.textShadowOffsetX, 0)), n(b, "shadowOffsetY", u(i.textShadowOffsetY, d.textShadowOffsetY, 0)), n(b, "textAlign", h), n(b, "textBaseline", "middle"), n(b, "font", c.font || q.DEFAULT_FONT);
											var r = z(i.textStroke || d.textStroke, t),
												s = A(i.textFill || d.textFill),
												t = v(i.textLineWidth, d.textLineWidth);
											r && (n(b, "lineWidth", t), n(b, "strokeStyle", r), b.strokeText(c.text, g, m)), s && (n(b, "fillStyle", s), b.fillText(c.text, g, m))
										}

										function j(a) {
											return a.textBackgroundColor || a.textBorderWidth && a.textBorderColor
										}

										function k(a, b, c, d, e, f, g) {
											var h = c.textBackgroundColor,
												i = c.textBorderWidth,
												j = c.textBorderColor,
												k = r.isString(h);
											if(n(b, "shadowBlur", c.textBoxShadowBlur || 0), n(b, "shadowColor", c.textBoxShadowColor || "transparent"), n(b, "shadowOffsetX", c.textBoxShadowOffsetX || 0), n(b, "shadowOffsetY", c.textBoxShadowOffsetY || 0), k || i && j) {
												b.beginPath();
												var m = c.textBorderRadius;
												m ? s.buildPath(b, {
													x: d,
													y: e,
													width: f,
													height: g,
													r: m
												}) : b.rect(d, e, f, g), b.closePath()
											}
											if(k) n(b, "fillStyle", h), b.fill();
											else if(r.isObject(h)) {
												var o = h.image;
												o = t.createOrUpdateImage(o, null, a, l, h), o && t.isImageReady(o) && b.drawImage(o, d, e, f, g)
											}
											i && j && (n(b, "lineWidth", i), n(b, "strokeStyle", j), b.stroke())
										}

										function l(a, b) {
											b.image = a
										}

										function m(a, b, c) {
											var d = b.x || 0,
												e = b.y || 0,
												f = b.textAlign,
												g = b.textVerticalAlign;
											if(c) {
												var h = b.textPosition;
												if(h instanceof Array) d = c.x + o(h[0], c.width), e = c.y + o(h[1], c.height);
												else {
													var i = q.adjustTextPositionOnRect(h, c, b.textDistance);
													d = i.x, e = i.y, f = f || i.textAlign, g = g || i.textVerticalAlign
												}
												var j = b.textOffset;
												j && (d += j[0], e += j[1])
											}
											return {
												baseX: d,
												baseY: e,
												textAlign: f,
												textVerticalAlign: g
											}
										}

										function n(a, b, c) {
											return a[b] = a.__currentValues[b] = c, a[b]
										}

										function o(a, b) {
											return "string" == typeof a ? a.lastIndexOf("%") >= 0 ? parseFloat(a) / 100 * b : parseFloat(a) : a
										}

										function p(a, b, c) {
											return "right" === b ? a - c[1] : "center" === b ? a + c[3] / 2 - c[1] / 2 : a + c[3]
										}
										var q = c(16),
											r = c(1),
											s = c(78),
											t = c(53),
											u = r.retrieve3,
											v = r.retrieve2,
											w = {
												left: 1,
												right: 1,
												center: 1
											},
											x = {
												top: 1,
												bottom: 1,
												middle: 1
											},
											y = {};
										y.normalizeTextStyle = function(a) {
											return d(a), r.each(a.rich, d), a
										}, y.renderText = function(a, b, c, d, g) {
											d.rich ? f(a, b, c, d, g) : e(a, b, c, d, g)
										};
										var z = y.getStroke = function(a, b) {
												return null == a || 0 >= b || "transparent" === a || "none" === a ? null : a.image || a.colorStops ? "#000" : a
											},
											A = y.getFill = function(a) {
												return null == a || "none" === a ? null : a.image || a.colorStops ? "#000" : a
											};
										y.needDrawText = function(a, b) {
											return null != a && (a || b.textBackgroundColor || b.textBorderWidth && b.textBorderColor || b.textPadding)
										}, a.exports = y
									}, function(a, b, c) {
										function d(a) {
											var b = {
												componentType: a.mainType
											};
											return b[a.mainType + "Index"] = a.componentIndex, b
										}

										function e(a, b, c, d) {
											var e, f, g = n(c - a.rotation),
												h = d[0] > d[1],
												i = "start" === b && !h || "start" !== b && h;
											return o(g - t / 2) ? (f = i ? "bottom" : "top", e = "center") : o(g - 1.5 * t) ? (f = i ? "top" : "bottom", e = "center") : (f = "middle", e = 1.5 * t > g && g > t / 2 ? i ? "left" : "right" : i ? "right" : "left"), {
												rotation: g,
												textAlign: e,
												textVerticalAlign: f
											}
										}

										function f(a) {
											var b = a.get("tooltip");
											return a.get("silent") || !(a.get("triggerEvent") || b && b.show)
										}

										function g(a, b) {
											var c = a.get("axisLabel.showMinLabel"),
												d = a.get("axisLabel.showMaxLabel"),
												e = b[0],
												f = b[1],
												g = b[b.length - 1],
												i = b[b.length - 2];
											c === !1 ? e.ignore = !0 : null != a.getMin() && h(e, f) && (c ? f.ignore = !0 : e.ignore = !0), d === !1 ? g.ignore = !0 : null != a.getMax() && h(i, g) && (d ? i.ignore = !0 : g.ignore = !0)
										}

										function h(a, b, c) {
											var d = a && a.getBoundingRect().clone(),
												e = b && b.getBoundingRect().clone();
											if(d && e) {
												var f = q.identity([]);
												return q.rotate(f, f, -a.rotation), d.applyTransform(q.mul([], f, a.getLocalTransform())), e.applyTransform(q.mul([], f, b.getLocalTransform())), d.intersect(e)
											}
										}
										var i = c(1),
											j = c(7),
											k = c(3),
											l = c(11),
											m = c(4),
											n = m.remRadian,
											o = m.isRadianAroundZero,
											p = c(6),
											q = c(19),
											r = p.applyTransform,
											s = i.retrieve,
											t = Math.PI,
											u = function(a, b) {
												this.opt = b, this.axisModel = a, i.defaults(b, {
													labelOffset: 0,
													nameDirection: 1,
													tickDirection: 1,
													labelDirection: 1,
													silent: !0
												}), this.group = new k.Group;
												var c = new k.Group({
													position: b.position.slice(),
													rotation: b.rotation
												});
												c.updateTransform(), this._transform = c.transform, this._dumbGroup = c
											};
										u.prototype = {
											constructor: u,
											hasBuilder: function(a) {
												return !!v[a]
											},
											add: function(a) {
												v[a].call(this)
											},
											getGroup: function() {
												return this.group
											}
										};
										var v = {
												axisLine: function() {
													var a = this.opt,
														b = this.axisModel;
													if(b.get("axisLine.show")) {
														var c = this.axisModel.axis.getExtent(),
															d = this._transform,
															e = [c[0], 0],
															f = [c[1], 0];
														d && (r(e, e, d), r(f, f, d)), this.group.add(new k.Line(k.subPixelOptimizeLine({
															anid: "line",
															shape: {
																x1: e[0],
																y1: e[1],
																x2: f[0],
																y2: f[1]
															},
															style: i.extend({
																lineCap: "round"
															}, b.getModel("axisLine.lineStyle").getLineStyle()),
															strokeContainThreshold: a.strokeContainThreshold || 5,
															silent: !0,
															z2: 1
														})))
													}
												},
												axisTick: function() {
													var a = this.axisModel,
														b = a.axis;
													if(a.get("axisTick.show") && !b.scale.isBlank())
														for(var c = a.getModel("axisTick"), d = this.opt, e = c.getModel("lineStyle"), f = c.get("length"), g = y(c, d.labelInterval), h = b.getTicksCoords(c.get("alignWithLabel")), j = b.scale.getTicks(), l = [], m = [], n = this._transform, o = 0; o < h.length; o++)
															if(!x(b, o, g)) {
																var p = h[o];
																l[0] = p, l[1] = 0, m[0] = p, m[1] = d.tickDirection * f, n && (r(l, l, n), r(m, m, n)), this.group.add(new k.Line(k.subPixelOptimizeLine({
																	anid: "tick_" + j[o],
																	shape: {
																		x1: l[0],
																		y1: l[1],
																		x2: m[0],
																		y2: m[1]
																	},
																	style: i.defaults(e.getLineStyle(), {
																		stroke: a.get("axisLine.lineStyle.color")
																	}),
																	z2: 2,
																	silent: !0
																})))
															}
												},
												axisLabel: function() {
													var a = this.opt,
														b = this.axisModel,
														c = b.axis,
														e = s(a.axisLabelShow, b.get("axisLabel.show"));
													if(e && !c.scale.isBlank()) {
														var h = b.getModel("axisLabel"),
															j = h.get("margin"),
															m = c.scale.getTicks(),
															n = b.getFormattedLabels(),
															o = (s(a.labelRotate, h.get("rotate")) || 0) * t / 180,
															p = w(a.rotation, o, a.labelDirection),
															q = b.get("data"),
															r = [],
															u = f(b),
															v = b.get("triggerEvent");
														i.each(m, function(e, f) {
															if(!x(c, f, a.labelInterval)) {
																var g = h;
																q && q[e] && q[e].textStyle && (g = new l(q[e].textStyle, h, b.ecModel));
																var i = g.getTextColor() || b.get("axisLine.lineStyle.color"),
																	m = c.dataToCoord(e),
																	o = [m, a.labelOffset + a.labelDirection * j],
																	s = c.scale.getLabel(e),
																	t = new k.Text({
																		anid: "label_" + e,
																		position: o,
																		rotation: p.rotation,
																		silent: u,
																		z2: 10
																	});
																k.setTextStyle(t.style, g, {
																	text: n[f],
																	textAlign: g.getShallow("align", !0) || p.textAlign,
																	textVerticalAlign: g.getShallow("verticalAlign", !0) || g.getShallow("baseline", !0) || p.textVerticalAlign,
																	textFill: "function" == typeof i ? i("category" === c.type ? s : "value" === c.type ? e + "" : e, f) : i
																}), v && (t.eventData = d(b), t.eventData.targetType = "axisLabel", t.eventData.value = s), this._dumbGroup.add(t), t.updateTransform(), r.push(t), this.group.add(t), t.decomposeTransform()
															}
														}, this), g(b, r)
													}
												},
												axisName: function() {
													var a = this.opt,
														b = this.axisModel,
														c = s(a.axisName, b.get("name"));
													if(c) {
														var g, h = b.get("nameLocation"),
															l = a.nameDirection,
															m = b.getModel("nameTextStyle"),
															n = b.get("nameGap") || 0,
															o = this.axisModel.axis.getExtent(),
															p = o[0] > o[1] ? -1 : 1,
															q = ["start" === h ? o[0] - p * n : "end" === h ? o[1] + p * n : (o[0] + o[1]) / 2, "middle" === h ? a.labelOffset + l * n : 0],
															r = b.get("nameRotate");
														null != r && (r = r * t / 180);
														var u;
														"middle" === h ? g = w(a.rotation, null != r ? r : a.rotation, l) : (g = e(a, h, r || 0, o), u = a.axisNameAvailableWidth, null != u && (u = Math.abs(u / Math.sin(g.rotation)), !isFinite(u) && (u = null)));
														var v = m.getFont(),
															x = b.get("nameTruncate", !0) || {},
															y = x.ellipsis,
															z = s(a.nameTruncateMaxWidth, x.maxWidth, u),
															A = null != y && null != z ? j.truncateText(c, z, v, y, {
																minChar: 2,
																placeholder: x.placeholder
															}) : c,
															B = b.get("tooltip", !0),
															C = b.mainType,
															D = {
																componentType: C,
																name: c,
																$vars: ["name"]
															};
														D[C + "Index"] = b.componentIndex;
														var E = new k.Text({
															anid: "name",
															__fullText: c,
															__truncatedText: A,
															position: q,
															rotation: g.rotation,
															silent: f(b),
															z2: 1,
															tooltip: B && B.show ? i.extend({
																content: c,
																formatter: function() {
																	return c
																},
																formatterParams: D
															}, B) : null
														});
														k.setTextStyle(E.style, m, {
															text: A,
															textFont: v,
															textFill: m.getTextColor() || b.get("axisLine.lineStyle.color"),
															textAlign: g.textAlign,
															textVerticalAlign: g.textVerticalAlign
														}), b.get("triggerEvent") && (E.eventData = d(b), E.eventData.targetType = "axisName", E.eventData.name = c), this._dumbGroup.add(E), E.updateTransform(), this.group.add(E), E.decomposeTransform()
													}
												}
											},
											w = u.innerTextLayout = function(a, b, c) {
												var d, e, f = n(b - a);
												return o(f) ? (e = c > 0 ? "top" : "bottom", d = "center") : o(f - t) ? (e = c > 0 ? "bottom" : "top", d = "center") : (e = "middle", d = f > 0 && t > f ? c > 0 ? "right" : "left" : c > 0 ? "left" : "right"), {
													rotation: f,
													textAlign: d,
													textVerticalAlign: e
												}
											},
											x = u.ifIgnoreOnTick = function(a, b, c) {
												var d, e = a.scale;
												return "ordinal" === e.type && ("function" == typeof c ? (d = e.getTicks()[b], !c(d, e.getLabel(d))) : b % (c + 1))
											},
											y = u.getInterval = function(a, b) {
												var c = a.get("interval");
												return null != c && "auto" != c || (c = b), c
											};
										a.exports = u
									}, function(a, b, c) {
										function d(a, b, c, d, h, i) {
											var j = g.getAxisPointerClass(a.axisPointerClass);
											if(j) {
												var k = f.getAxisPointerModel(b);
												k ? (a._axisPointer || (a._axisPointer = new j)).render(b, k, d, i) : e(a, d)
											}
										}

										function e(a, b, c) {
											var d = a._axisPointer;
											d && d.dispose(b, c), a._axisPointer = null
										}
										var f = c(47),
											g = c(2).extendComponentView({
												type: "axis",
												_axisPointer: null,
												axisPointerClass: null,
												render: function(a, b, c, e) {
													this.axisPointerClass && f.fixValue(a), g.superApply(this, "render", arguments), d(this, a, b, c, e, !0)
												},
												updateAxisPointer: function(a, b, c, e, f) {
													d(this, a, b, c, e, !1)
												},
												remove: function(a, b) {
													var c = this._axisPointer;
													c && c.remove(b), g.superApply(this, "remove", arguments)
												},
												dispose: function(a, b) {
													e(this, b), g.superApply(this, "dispose", arguments)
												}
											}),
											h = [];
										g.registerAxisPointerClass = function(a, b) {
											h[a] = b
										}, g.getAxisPointerClass = function(a) {
											return a && h[a]
										}, a.exports = g
									}, function(a, b, c) {
										function d(a) {
											return e.isObject(a) && null != a.value ? a.value : a + ""
										}
										var e = c(1),
											f = c(18);
										a.exports = {
											getFormattedLabels: function() {
												return f.getFormattedLabels(this.axis, this.get("axisLabel.formatter"))
											},
											getCategories: function() {
												return "category" === this.get("type") && e.map(this.get("data"), d)
											},
											getMin: function(a) {
												var b = this.option,
													c = a || null == b.rangeStart ? b.min : b.rangeStart;
												return this.axis && null != c && "dataMin" !== c && "function" != typeof c && !e.eqNaN(c) && (c = this.axis.scale.parse(c)), c
											},
											getMax: function(a) {
												var b = this.option,
													c = a || null == b.rangeEnd ? b.max : b.rangeEnd;
												return this.axis && null != c && "dataMax" !== c && "function" != typeof c && !e.eqNaN(c) && (c = this.axis.scale.parse(c)), c
											},
											getNeedCrossZero: function() {
												var a = this.option;
												return null == a.rangeStart && null == a.rangeEnd && !a.scale
											},
											getCoordSysModel: e.noop,
											setRange: function(a, b) {
												this.option.rangeStart = a, this.option.rangeEnd = b
											},
											resetRange: function() {
												this.option.rangeStart = this.option.rangeEnd = null
											}
										}
									}, function(a, b) {
										"use strict";

										function c(a) {
											return a
										}

										function d(a, b, d, e, f) {
											this._old = a, this._new = b, this._oldKeyGetter = d || c, this._newKeyGetter = e || c, this.context = f
										}

										function e(a, b, c, d, e) {
											for(var f = 0; f < a.length; f++) {
												var g = "_ec_" + e[d](a[f], f),
													h = b[g];
												null == h ? (c.push(g), b[g] = f) : (h.length || (b[g] = h = [h]), h.push(f))
											}
										}
										d.prototype = {
											constructor: d,
											add: function(a) {
												return this._add = a, this
											},
											update: function(a) {
												return this._update = a, this
											},
											remove: function(a) {
												return this._remove = a, this
											},
											execute: function() {
												var a, b = this._old,
													c = this._new,
													d = {},
													f = {},
													g = [],
													h = [];
												for(e(b, d, g, "_oldKeyGetter", this), e(c, f, h, "_newKeyGetter", this), a = 0; a < b.length; a++) {
													var i = g[a],
														j = f[i];
													if(null != j) {
														var k = j.length;
														k ? (1 === k && (f[i] = null), j = j.unshift()) : f[i] = null, this._update && this._update(j, a)
													} else this._remove && this._remove(a)
												}
												for(var a = 0; a < h.length; a++) {
													var i = h[a];
													if(f.hasOwnProperty(i)) {
														var j = f[i];
														if(null == j) continue;
														if(j.length)
															for(var l = 0, k = j.length; k > l; l++) this._add && this._add(j[l]);
														else this._add && this._add(j)
													}
												}
											}
										}, a.exports = d
									}, function(a, b, c) {
										var d = c(4),
											e = c(7),
											f = c(34),
											g = c(66),
											h = d.round,
											i = f.extend({
												type: "interval",
												_interval: 0,
												_intervalPrecision: 2,
												setExtent: function(a, b) {
													var c = this._extent;
													isNaN(a) || (c[0] = parseFloat(a)), isNaN(b) || (c[1] = parseFloat(b))
												},
												unionExtent: function(a) {
													var b = this._extent;
													a[0] < b[0] && (b[0] = a[0]), a[1] > b[1] && (b[1] = a[1]), i.prototype.setExtent.call(this, b[0], b[1])
												},
												getInterval: function() {
													return this._interval
												},
												setInterval: function(a) {
													this._interval = a, this._niceExtent = this._extent.slice(), this._intervalPrecision = g.getIntervalPrecision(a)
												},
												getTicks: function() {
													return g.intervalScaleGetTicks(this._interval, this._extent, this._niceExtent, this._intervalPrecision)
												},
												getTicksLabels: function() {
													for(var a = [], b = this.getTicks(), c = 0; c < b.length; c++) a.push(this.getLabel(b[c]));
													return a
												},
												getLabel: function(a, b) {
													if(null == a) return "";
													var c = b && b.precision;
													return null == c ? c = d.getPrecisionSafe(a) || 0 : "auto" === c && (c = this._intervalPrecision), a = h(a, c, !0), e.addCommas(a)
												},
												niceTicks: function(a, b, c) {
													a = a || 5;
													var d = this._extent,
														e = d[1] - d[0];
													if(isFinite(e)) {
														0 > e && (e = -e, d.reverse());
														var f = g.intervalScaleNiceTicks(d, a, b, c);
														this._intervalPrecision = f.intervalPrecision, this._interval = f.interval, this._niceExtent = f.niceTickExtent
													}
												},
												niceExtent: function(a) {
													var b = this._extent;
													if(b[0] === b[1])
														if(0 !== b[0]) {
															var c = b[0];
															a.fixMax ? b[0] -= c / 2 : (b[1] += c / 2, b[0] -= c / 2)
														} else b[1] = 1;
													var d = b[1] - b[0];
													isFinite(d) || (b[0] = 0, b[1] = 1), this.niceTicks(a.splitNumber, a.minInterval, a.maxInterval);
													var e = this._interval;
													a.fixMin || (b[0] = h(Math.floor(b[0] / e) * e)), a.fixMax || (b[1] = h(Math.ceil(b[1] / e) * e))
												}
											});
										i.create = function() {
											return new i
										}, a.exports = i
									}, function(a, b, c) {
										function d(a) {
											this.group = new f.Group, this._symbolCtor = a || g
										}

										function e(a, b, c) {
											var d = a.getItemLayout(b);
											return d && !isNaN(d[0]) && !isNaN(d[1]) && !(c && c(b)) && "none" !== a.getItemVisual(b, "symbol")
										}
										var f = c(3),
											g = c(56),
											h = d.prototype;
										h.updateData = function(a, b) {
											var c = this.group,
												d = a.hostModel,
												g = this._data,
												h = this._symbolCtor,
												i = {
													itemStyle: d.getModel("itemStyle.normal").getItemStyle(["color"]),
													hoverItemStyle: d.getModel("itemStyle.emphasis").getItemStyle(),
													symbolRotate: d.get("symbolRotate"),
													symbolOffset: d.get("symbolOffset"),
													hoverAnimation: d.get("hoverAnimation"),
													labelModel: d.getModel("label.normal"),
													hoverLabelModel: d.getModel("label.emphasis"),
													cursorStyle: d.get("cursor")
												};
											a.diff(g).add(function(d) {
												var f = a.getItemLayout(d);
												if(e(a, d, b)) {
													var g = new h(a, d, i);
													g.attr("position", f), a.setItemGraphicEl(d, g), c.add(g)
												}
											}).update(function(j, k) {
												var l = g.getItemGraphicEl(k),
													m = a.getItemLayout(j);
												return e(a, j, b) ? (l ? (l.updateData(a, j, i), f.updateProps(l, {
													position: m
												}, d)) : (l = new h(a, j), l.attr("position", m)), c.add(l), void a.setItemGraphicEl(j, l)) : void c.remove(l)
											}).remove(function(a) {
												var b = g.getItemGraphicEl(a);
												b && b.fadeOut(function() {
													c.remove(b)
												})
											}).execute(), this._data = a
										}, h.updateLayout = function() {
											var a = this._data;
											a && a.eachItemGraphicEl(function(b, c) {
												var d = a.getItemLayout(c);
												b.attr("position", d)
											})
										}, h.remove = function(a) {
											var b = this.group,
												c = this._data;
											c && (a ? c.eachItemGraphicEl(function(a) {
												a.fadeOut(function() {
													b.remove(a)
												})
											}) : b.removeAll())
										}, a.exports = d
									}, function(a, b, c) {
										function d(a, b, c) {
											var d = b.getComponent("tooltip"),
												f = b.getComponent("axisPointer"),
												h = f.get("link", !0) || [],
												j = [];
											l(c.getCoordinateSystems(), function(c) {
												function k(d, k, l) {
													var m = l.model.getModel("axisPointer", f),
														n = m.get("show");
													if(n && ("auto" !== n || d || i(m))) {
														null == k && (k = m.get("triggerTooltip")), m = d ? e(l, r, f, b, d, k) : m;
														var q = m.get("snap"),
															s = o(l.model),
															t = k || q || "category" === l.type,
															u = a.axesInfo[s] = {
																key: s,
																axis: l,
																coordSys: c,
																axisPointerModel: m,
																triggerTooltip: k,
																involveSeries: t,
																snap: q,
																useHandle: i(m),
																seriesModels: []
															};
														p[s] = u, a.seriesInvolved |= t;
														var v = g(h, l);
														if(null != v) {
															var w = j[v] || (j[v] = {
																axesInfo: {}
															});
															w.axesInfo[s] = u, w.mapper = h[v].mapper, u.linkGroup = w
														}
													}
												}
												if(c.axisPointerEnabled) {
													var n = o(c.model),
														p = a.coordSysAxesInfo[n] = {};
													a.coordSysMap[n] = c;
													var q = c.model,
														r = q.getModel("tooltip", d);
													if(l(c.getAxes(), m(k, !1, null)), c.getTooltipAxes && d && r.get("show")) {
														var s = "axis" === r.get("trigger"),
															t = "cross" === r.get("axisPointer.type"),
															u = c.getTooltipAxes(r.get("axisPointer.axis"));
														(s || t) && l(u.baseAxes, m(k, !t || "cross", s)), t && l(u.otherAxes, m(k, "cross", !1))
													}
												}
											})
										}

										function e(a, b, c, d, e, f) {
											var g = b.getModel("axisPointer"),
												h = {};
											l(["type", "snap", "lineStyle", "shadowStyle", "label", "animation", "animationDurationUpdate", "animationEasingUpdate", "z"], function(a) {
												h[a] = j.clone(g.get(a))
											}), h.snap = "category" !== a.type && !!f, "cross" === g.get("type") && (h.type = "line");
											var i = h.label || (h.label = {});
											if(null == i.show && (i.show = !1), "cross" === e && (i.show = !0, !f)) {
												var m = h.lineStyle = g.get("crossStyle");
												m && j.defaults(i, m.textStyle)
											}
											return a.model.getModel("axisPointer", new k(h, c, d))
										}

										function f(a, b) {
											b.eachSeries(function(b) {
												var c = b.coordinateSystem,
													d = b.get("tooltip.trigger", !0),
													e = b.get("tooltip.show", !0);
												c && "none" !== d && d !== !1 && "item" !== d && e !== !1 && b.get("axisPointer.show", !0) !== !1 && l(a.coordSysAxesInfo[o(c.model)], function(a) {
													var d = a.axis;
													c.getAxis(d.dim) === d && (a.seriesModels.push(b), null == a.seriesDataCount && (a.seriesDataCount = 0), a.seriesDataCount += b.getData().count())
												})
											}, this)
										}

										function g(a, b) {
											for(var c = b.model, d = b.dim, e = 0; e < a.length; e++) {
												var f = a[e] || {};
												if(h(f[d + "AxisId"], c.id) || h(f[d + "AxisIndex"], c.componentIndex) || h(f[d + "AxisName"], c.name)) return e
											}
										}

										function h(a, b) {
											return "all" === a || j.isArray(a) && j.indexOf(a, b) >= 0 || a === b
										}

										function i(a) {
											return !!a.get("handle.show")
										}
										var j = c(1),
											k = c(11),
											l = j.each,
											m = j.curry,
											n = {};
										n.collect = function(a, b) {
											var c = {
												axesInfo: {},
												seriesInvolved: !1,
												coordSysAxesInfo: {},
												coordSysMap: {}
											};
											return d(c, a, b), c.seriesInvolved && f(c, a), c
										}, n.fixValue = function(a) {
											var b = n.getAxisInfo(a);
											if(b) {
												var c = b.axisPointerModel,
													d = b.axis.scale,
													e = c.option,
													f = c.get("status"),
													g = c.get("value");
												null != g && (g = d.parse(g));
												var h = i(c);
												null == f && (e.status = h ? "show" : "hide");
												var j = d.getExtent().slice();
												j[0] > j[1] && j.reverse(), (null == g || g > j[1]) && (g = j[1]), g < j[0] && (g = j[0]), e.value = g, h && (e.status = b.axis.scale.isBlank() ? "hide" : "show")
											}
										}, n.getAxisInfo = function(a) {
											var b = (a.ecModel.getComponent("axisPointer") || {}).coordSysAxesInfo;
											return b && b.axesInfo[o(a)]
										}, n.getAxisPointerModel = function(a) {
											var b = n.getAxisInfo(a);
											return b && b.axisPointerModel
										};
										var o = n.makeKey = function(a) {
											return a.type + "||" + a.id
										};
										a.exports = n
									}, , , function(a, b, c) {
										var d = c(1),
											e = c(15),
											f = e.parseClassType,
											g = 0,
											h = {},
											i = "_";
										h.getUID = function(a) {
											return [a || "", g++, Math.random()].join(i)
										}, h.enableSubTypeDefaulter = function(a) {
											var b = {};
											return a.registerSubTypeDefaulter = function(a, c) {
												a = f(a), b[a.main] = c
											}, a.determineSubType = function(c, d) {
												var e = d.type;
												if(!e) {
													var g = f(c).main;
													a.hasSubTypes(c) && b[g] && (e = b[g](d))
												}
												return e
											}, a
										}, h.enableTopologicalTravel = function(a, b) {
											function c(a) {
												var c = {},
													g = [];
												return d.each(a, function(h) {
													var i = e(c, h),
														j = i.originalDeps = b(h),
														k = f(j, a);
													i.entryCount = k.length, 0 === i.entryCount && g.push(h), d.each(k, function(a) {
														d.indexOf(i.predecessor, a) < 0 && i.predecessor.push(a);
														var b = e(c, a);
														d.indexOf(b.successor, a) < 0 && b.successor.push(h)
													})
												}), {
													graph: c,
													noEntryList: g
												}
											}

											function e(a, b) {
												return a[b] || (a[b] = {
													predecessor: [],
													successor: []
												}), a[b]
											}

											function f(a, b) {
												var c = [];
												return d.each(a, function(a) {
													d.indexOf(b, a) >= 0 && c.push(a)
												}), c
											}
											a.topologicalTravel = function(a, b, e, f) {
												function g(a) {
													j[a].entryCount--, 0 === j[a].entryCount && k.push(a)
												}

												function h(a) {
													l[a] = !0, g(a)
												}
												if(a.length) {
													var i = c(b),
														j = i.graph,
														k = i.noEntryList,
														l = {};
													for(d.each(a, function(a) {
															l[a] = !0
														}); k.length;) {
														var m = k.pop(),
															n = j[m],
															o = !!l[m];
														o && (e.call(f, m, n.originalDeps.slice()), delete l[m]), d.each(n.successor, o ? h : g)
													}
													d.each(l, function() {
														throw new Error("Circle dependency may exists")
													})
												}
											}
										}, a.exports = h
									}, function(a, b) {
										a.exports = function(a, b, c, d, e) {
											d.eachRawSeriesByType(a, function(a) {
												var e = a.getData(),
													f = a.get("symbol") || b,
													g = a.get("symbolSize");
												e.setVisual({
													legendSymbol: c || f,
													symbol: f,
													symbolSize: g
												}), d.isSeriesFiltered(a) || ("function" == typeof g && e.each(function(b) {
													var c = a.getRawValue(b),
														d = a.getDataParams(b);
													e.setItemVisual(b, "symbolSize", g(c, d))
												}), e.each(function(a) {
													var b = e.getItemModel(a),
														c = b.getShallow("symbol", !0),
														d = b.getShallow("symbolSize", !0);
													null != c && e.setItemVisual(a, "symbol", c), null != d && e.setItemVisual(a, "symbolSize", d)
												}))
											})
										}
									}, function(a, b) {
										function c(a) {
											for(var b = 0; a >= k;) b |= 1 & a, a >>= 1;
											return a + b
										}

										function d(a, b, c, d) {
											var f = b + 1;
											if(f === c) return 1;
											if(d(a[f++], a[b]) < 0) {
												for(; c > f && d(a[f], a[f - 1]) < 0;) f++;
												e(a, b, f)
											} else
												for(; c > f && d(a[f], a[f - 1]) >= 0;) f++;
											return f - b
										}

										function e(a, b, c) {
											for(c--; c > b;) {
												var d = a[b];
												a[b++] = a[c], a[c--] = d
											}
										}

										function f(a, b, c, d, e) {
											for(d === b && d++; c > d; d++) {
												for(var f, g = a[d], h = b, i = d; i > h;) f = h + i >>> 1, e(g, a[f]) < 0 ? i = f : h = f + 1;
												var j = d - h;
												switch(j) {
													case 3:
														a[h + 3] = a[h + 2];
													case 2:
														a[h + 2] = a[h + 1];
													case 1:
														a[h + 1] = a[h];
														break;
													default:
														for(; j > 0;) a[h + j] = a[h + j - 1], j--
												}
												a[h] = g
											}
										}

										function g(a, b, c, d, e, f) {
											var g = 0,
												h = 0,
												i = 1;
											if(f(a, b[c + e]) > 0) {
												for(h = d - e; h > i && f(a, b[c + e + i]) > 0;) g = i, i = (i << 1) + 1, 0 >= i && (i = h);
												i > h && (i = h), g += e, i += e
											} else {
												for(h = e + 1; h > i && f(a, b[c + e - i]) <= 0;) g = i, i = (i << 1) + 1, 0 >= i && (i = h);
												i > h && (i = h);
												var j = g;
												g = e - i, i = e - j
											}
											for(g++; i > g;) {
												var k = g + (i - g >>> 1);
												f(a, b[c + k]) > 0 ? g = k + 1 : i = k
											}
											return i
										}

										function h(a, b, c, d, e, f) {
											var g = 0,
												h = 0,
												i = 1;
											if(f(a, b[c + e]) < 0) {
												for(h = e + 1; h > i && f(a, b[c + e - i]) < 0;) g = i, i = (i << 1) + 1, 0 >= i && (i = h);
												i > h && (i = h);
												var j = g;
												g = e - i, i = e - j
											} else {
												for(h = d - e; h > i && f(a, b[c + e + i]) >= 0;) g = i, i = (i << 1) + 1, 0 >= i && (i = h);
												i > h && (i = h), g += e, i += e
											}
											for(g++; i > g;) {
												var k = g + (i - g >>> 1);
												f(a, b[c + k]) < 0 ? i = k : g = k + 1
											}
											return i
										}

										function i(a, b) {
											function c(a, b) {
												k[s] = a, n[s] = b, s += 1
											}

											function d() {
												for(; s > 1;) {
													var a = s - 2;
													if(a >= 1 && n[a - 1] <= n[a] + n[a + 1] || a >= 2 && n[a - 2] <= n[a] + n[a - 1]) n[a - 1] < n[a + 1] && a--;
													else if(n[a] > n[a + 1]) break;
													f(a)
												}
											}

											function e() {
												for(; s > 1;) {
													var a = s - 2;
													a > 0 && n[a - 1] < n[a + 1] && a--, f(a)
												}
											}

											function f(c) {
												var d = k[c],
													e = n[c],
													f = k[c + 1],
													l = n[c + 1];
												n[c] = e + l, c === s - 3 && (k[c + 1] = k[c + 2], n[c + 1] = n[c + 2]), s--;
												var m = h(a[f], a, d, e, 0, b);
												d += m, e -= m, 0 !== e && (l = g(a[d + e - 1], a, f, l, l - 1, b), 0 !== l && (l >= e ? i(d, e, f, l) : j(d, e, f, l)))
											}

											function i(c, d, e, f) {
												var i = 0;
												for(i = 0; d > i; i++) t[i] = a[c + i];
												var j = 0,
													k = e,
													m = c;
												if(a[m++] = a[k++], 0 !== --f) {
													if(1 === d) {
														for(i = 0; f > i; i++) a[m + i] = a[k + i];
														return void(a[m + f] = t[j])
													}
													for(var n, p, q, r = o;;) {
														n = 0, p = 0, q = !1;
														do
															if(b(a[k], t[j]) < 0) {
																if(a[m++] = a[k++], p++, n = 0, 0 === --f) {
																	q = !0;
																	break
																}
															} else if(a[m++] = t[j++], n++, p = 0, 1 === --d) {
															q = !0;
															break
														} while (r > (n | p));
														if(q) break;
														do {
															if(n = h(a[k], t, j, d, 0, b), 0 !== n) {
																for(i = 0; n > i; i++) a[m + i] = t[j + i];
																if(m += n, j += n, d -= n, 1 >= d) {
																	q = !0;
																	break
																}
															}
															if(a[m++] = a[k++], 0 === --f) {
																q = !0;
																break
															}
															if(p = g(t[j], a, k, f, 0, b), 0 !== p) {
																for(i = 0; p > i; i++) a[m + i] = a[k + i];
																if(m += p, k += p, f -= p, 0 === f) {
																	q = !0;
																	break
																}
															}
															if(a[m++] = t[j++], 1 === --d) {
																q = !0;
																break
															}
															r--
														} while (n >= l || p >= l);
														if(q) break;
														0 > r && (r = 0), r += 2
													}
													if(o = r, 1 > o && (o = 1), 1 === d) {
														for(i = 0; f > i; i++) a[m + i] = a[k + i];
														a[m + f] = t[j]
													} else {
														if(0 === d) throw new Error;
														for(i = 0; d > i; i++) a[m + i] = t[j + i]
													}
												} else
													for(i = 0; d > i; i++) a[m + i] = t[j + i]
											}

											function j(c, d, e, f) {
												var i = 0;
												for(i = 0; f > i; i++) t[i] = a[e + i];
												var j = c + d - 1,
													k = f - 1,
													m = e + f - 1,
													n = 0,
													p = 0;
												if(a[m--] = a[j--], 0 !== --d) {
													if(1 === f) {
														for(m -= d, j -= d, p = m + 1, n = j + 1, i = d - 1; i >= 0; i--) a[p + i] = a[n + i];
														return void(a[m] = t[k])
													}
													for(var q = o;;) {
														var r = 0,
															s = 0,
															u = !1;
														do
															if(b(t[k], a[j]) < 0) {
																if(a[m--] = a[j--], r++, s = 0, 0 === --d) {
																	u = !0;
																	break
																}
															} else if(a[m--] = t[k--], s++, r = 0, 1 === --f) {
															u = !0;
															break
														} while (q > (r | s));
														if(u) break;
														do {
															if(r = d - h(t[k], a, c, d, d - 1, b), 0 !== r) {
																for(m -= r, j -= r, d -= r, p = m + 1, n = j + 1, i = r - 1; i >= 0; i--) a[p + i] = a[n + i];
																if(0 === d) {
																	u = !0;
																	break
																}
															}
															if(a[m--] = t[k--], 1 === --f) {
																u = !0;
																break
															}
															if(s = f - g(a[j], t, 0, f, f - 1, b), 0 !== s) {
																for(m -= s, k -= s, f -= s, p = m + 1, n = k + 1, i = 0; s > i; i++) a[p + i] = t[n + i];
																if(1 >= f) {
																	u = !0;
																	break
																}
															}
															if(a[m--] = a[j--], 0 === --d) {
																u = !0;
																break
															}
															q--
														} while (r >= l || s >= l);
														if(u) break;
														0 > q && (q = 0), q += 2
													}
													if(o = q, 1 > o && (o = 1), 1 === f) {
														for(m -= d, j -= d, p = m + 1, n = j + 1, i = d - 1; i >= 0; i--) a[p + i] = a[n + i];
														a[m] = t[k]
													} else {
														if(0 === f) throw new Error;
														for(n = m - (f - 1), i = 0; f > i; i++) a[n + i] = t[i]
													}
												} else
													for(n = m - (f - 1), i = 0; f > i; i++) a[n + i] = t[i]
											}
											var k, n, o = l,
												p = 0,
												q = m,
												r = 0,
												s = 0;
											p = a.length, 2 * m > p && (q = p >>> 1);
											var t = [];
											r = 120 > p ? 5 : 1542 > p ? 10 : 119151 > p ? 19 : 40, k = [], n = [], this.mergeRuns = d, this.forceMergeRuns = e, this.pushRun = c
										}

										function j(a, b, e, g) {
											e || (e = 0), g || (g = a.length);
											var h = g - e;
											if(!(2 > h)) {
												var j = 0;
												if(k > h) return j = d(a, e, g, b), void f(a, e, g, e + j, b);
												var l = new i(a, b),
													m = c(h);
												do {
													if(j = d(a, e, g, b), m > j) {
														var n = h;
														n > m && (n = m), f(a, e, e + n, e + j, b), j = n
													}
													l.pushRun(e, j), l.mergeRuns(), h -= j, e += j
												} while (0 !== h);
												l.forceMergeRuns()
											}
										}
										var k = 32,
											l = 7,
											m = 256;
										a.exports = j
									}, function(a, b, c) {
										function d() {
											var a = this.__cachedImgObj;
											this.onload = this.__cachedImgObj = null;
											for(var b = 0; b < a.pending.length; b++) {
												var c = a.pending[b],
													d = c.cb;
												d && d(this, c.cbPayload), c.hostEl.dirty()
											}
											a.pending.length = 0
										}
										var e = c(72),
											f = new e(50),
											g = {};
										g.findExistImage = function(a) {
											if("string" == typeof a) {
												var b = f.get(a);
												return b && b.image
											}
											return a
										}, g.createOrUpdateImage = function(a, b, c, e, g) {
											if(a) {
												if("string" == typeof a) {
													if(b && b.__zrImageSrc === a || !c) return b;
													var i = f.get(a),
														j = {
															hostEl: c,
															cb: e,
															cbPayload: g
														};
													return i ? (b = i.image, !h(b) && i.pending.push(j)) : (!b && (b = new Image), b.onload = d, f.put(a, b.__cachedImgObj = {
														image: b,
														pending: [j]
													}), b.src = b.__zrImageSrc = a), b
												}
												return a
											}
											return b
										};
										var h = g.isImageReady = function(a) {
											return a && a.width && a.height
										};
										a.exports = g
									}, function(a, b, c) {
										var d = c(35);
										a.exports = function() {
											if(0 !== d.debugMode)
												if(1 == d.debugMode)
													for(var a in arguments) throw new Error(arguments[a]);
												else if(d.debugMode > 1)
												for(var a in arguments) console.log(arguments[a])
										}
									}, function(a, b, c) {
										function d(a) {
											e.call(this, a)
										}
										var e = c(38),
											f = c(12),
											g = c(1),
											h = c(53);
										d.prototype = {
											constructor: d,
											type: "image",
											brush: function(a, b) {
												var c = this.style,
													d = c.image;
												c.bind(a, this, b);
												var e = this._image = h.createOrUpdateImage(d, this._image, this);
												if(e && h.isImageReady(e)) {
													var f = c.x || 0,
														g = c.y || 0,
														i = c.width,
														j = c.height,
														k = e.width / e.height;
													if(null == i && null != j ? i = j * k : null == j && null != i ? j = i / k : null == i && null == j && (i = e.width, j = e.height), this.setTransform(a), c.sWidth && c.sHeight) {
														var l = c.sx || 0,
															m = c.sy || 0;
														a.drawImage(e, l, m, c.sWidth, c.sHeight, f, g, i, j)
													} else if(c.sx && c.sy) {
														var l = c.sx,
															m = c.sy,
															n = i - l,
															o = j - m;
														a.drawImage(e, l, m, n, o, f, g, i, j)
													} else a.drawImage(e, f, g, i, j);
													this.restoreTransform(a), null != c.text && this.drawRectText(a, this.getBoundingRect())
												}
											},
											getBoundingRect: function() {
												var a = this.style;
												return this._rect || (this._rect = new f(a.x || 0, a.y || 0, a.width || 0, a.height || 0)), this._rect
											}
										}, g.inherits(d, e), a.exports = d
									}, function(a, b, c) {
										function d(a, b) {
											var c = a.getItemVisual(b, "symbolSize");
											return c instanceof Array ? c.slice() : [+c, +c]
										}

										function e(a) {
											return [a[0] / 2, a[1] / 2]
										}

										function f(a, b, c) {
											j.Group.call(this), this.updateData(a, b, c)
										}

										function g(a, b) {
											this.parent.drift(a, b)
										}
										var h = c(1),
											i = c(24),
											j = c(3),
											k = c(4),
											l = c(96),
											m = f.prototype;
										m._createSymbol = function(a, b, c, d) {
											this.removeAll();
											var f = b.hostModel,
												h = b.getItemVisual(c, "color"),
												k = i.createSymbol(a, -1, -1, 2, 2, h);
											k.attr({
												z2: 100,
												culling: !0,
												scale: [0, 0]
											}), k.drift = g, j.initProps(k, {
												scale: e(d)
											}, f, c), this._symbolType = a, this.add(k)
										}, m.stopSymbolAnimation = function(a) {
											this.childAt(0).stopAnimation(a)
										}, m.getSymbolPath = function() {
											return this.childAt(0)
										}, m.getScale = function() {
											return this.childAt(0).scale
										}, m.highlight = function() {
											this.childAt(0).trigger("emphasis")
										}, m.downplay = function() {
											this.childAt(0).trigger("normal")
										}, m.setZ = function(a, b) {
											var c = this.childAt(0);
											c.zlevel = a, c.z = b
										}, m.setDraggable = function(a) {
											var b = this.childAt(0);
											b.draggable = a, b.cursor = a ? "move" : "pointer"
										}, m.updateData = function(a, b, c) {
											this.silent = !1;
											var f = a.getItemVisual(b, "symbol") || "circle",
												g = a.hostModel,
												h = d(a, b);
											if(f !== this._symbolType) this._createSymbol(f, a, b, h);
											else {
												var i = this.childAt(0);
												i.silent = !1, j.updateProps(i, {
													scale: e(h)
												}, g, b)
											}
											this._updateCommon(a, b, h, c), this._seriesModel = g
										};
										var n = ["itemStyle", "normal"],
											o = ["itemStyle", "emphasis"],
											p = ["label", "normal"],
											q = ["label", "emphasis"];
										m._updateCommon = function(a, b, c, d) {
											var f = this.childAt(0),
												g = a.hostModel,
												i = a.getItemVisual(b, "color");
											"image" !== f.type && f.useStyle({
												strokeNoScale: !0
											}), d = d || null;
											var m = d && d.itemStyle,
												r = d && d.hoverItemStyle,
												s = d && d.symbolRotate,
												t = d && d.symbolOffset,
												u = d && d.labelModel,
												v = d && d.hoverLabelModel,
												w = d && d.hoverAnimation,
												x = d && d.cursorStyle;
											if(!d || a.hasItemOption) {
												var y = a.getItemModel(b);
												m = y.getModel(n).getItemStyle(["color"]), r = y.getModel(o).getItemStyle(), s = y.getShallow("symbolRotate"), t = y.getShallow("symbolOffset"), u = y.getModel(p), v = y.getModel(q), w = y.getShallow("hoverAnimation"), x = y.getShallow("cursor")
											} else r = h.extend({}, r);
											var z = f.style;
											f.attr("rotation", (s || 0) * Math.PI / 180 || 0), t && f.attr("position", [k.parsePercent(t[0], c[0]), k.parsePercent(t[1], c[1])]), x && f.attr("cursor", x), f.setColor(i), f.setStyle(m);
											var A = a.getItemVisual(b, "opacity");
											null != A && (z.opacity = A);
											var B = l.findLabelValueDim(a);
											null != B && j.setLabelStyle(z, r, u, v, {
												labelFetcher: g,
												labelDataIndex: b,
												defaultText: a.get(B, b),
												isRectText: !0,
												autoColor: i
											}), f.off("mouseover").off("mouseout").off("emphasis").off("normal"), f.hoverStyle = r, j.setHoverStyle(f);
											var C = e(c);
											if(w && g.isAnimationEnabled()) {
												var D = function() {
														var a = C[1] / C[0];
														this.animateTo({
															scale: [Math.max(1.1 * C[0], C[0] + 3), Math.max(1.1 * C[1], C[1] + 3 * a)]
														}, 400, "elasticOut")
													},
													E = function() {
														this.animateTo({
															scale: C
														}, 400, "elasticOut")
													};
												f.on("mouseover", D).on("mouseout", E).on("emphasis", D).on("normal", E)
											}
										}, m.fadeOut = function(a) {
											var b = this.childAt(0);
											this.silent = b.silent = !0, b.style.text = null, j.updateProps(b, {
												scale: [0, 0]
											}, this._seriesModel, this.dataIndex, a)
										}, h.inherits(f, j.Group), a.exports = f
									}, , , function(a, b, c) {
										function d(a, b, c) {
											return a.getCoordSysModel() === b
										}

										function e(a) {
											var b, c = a.model,
												d = c.getFormattedLabels(),
												e = c.getModel("axisLabel"),
												f = 1,
												g = d.length;
											g > 40 && (f = Math.ceil(g / 40));
											for(var h = 0; g > h; h += f)
												if(!a.isLabelIgnored(h)) {
													var i = e.getTextRect(d[h]);
													b ? b.union(i) : b = i
												}
											return b
										}

										function f(a, b, c) {
											this._coordsMap = {}, this._coordsList = [], this._axesMap = {}, this._axesList = [], this._initCartesian(a, b, c), this.model = a
										}

										function g(a, b, c) {
											var d = a[b];
											if(c.onZero) {
												var e = c.onZeroAxisIndex;
												if(null != e) {
													var f = d[e];
													return void(f && h(f) && (c.onZero = !1))
												}
												for(var g in d)
													if(d.hasOwnProperty(g)) {
														var f = d[g];
														if(f && !h(f)) {
															e = +g;
															break
														}
													}
												null == e && (c.onZero = !1), c.onZeroAxisIndex = e
											}
										}

										function h(a) {
											return "category" === a.type || "time" === a.type || !r(a)
										}

										function i(a, b) {
											var c = a.getExtent(),
												d = c[0] + c[1];
											a.toGlobalCoord = "x" === a.dim ? function(a) {
												return a + b
											} : function(a) {
												return d - a + b
											}, a.toLocalCoord = "x" === a.dim ? function(a) {
												return a - b
											} : function(a) {
												return d - a + b
											}
										}

										function j(a, b) {
											return n.map(u, function(b) {
												var c = a.getReferringComponents(b)[0];
												return c
											})
										}

										function k(a) {
											return "cartesian2d" === a.get("coordinateSystem")
										}
										var l = c(9),
											m = c(18),
											n = c(1),
											o = c(139),
											p = c(137),
											q = n.each,
											r = m.ifAxisCrossZero,
											s = m.niceScaleExtent;
										c(140);
										var t = f.prototype;
										t.type = "grid", t.axisPointerEnabled = !0, t.getRect = function() {
											return this._rect
										}, t.update = function(a, b) {
											var c = this._axesMap;
											this._updateScale(a, this.model), q(c.x, function(a) {
												s(a.scale, a.model)
											}), q(c.y, function(a) {
												s(a.scale, a.model)
											}), q(c.x, function(a) {
												g(c, "y", a)
											}), q(c.y, function(a) {
												g(c, "x", a)
											}), this.resize(this.model, b)
										}, t.resize = function(a, b, c) {
											function d() {
												q(g, function(a) {
													var b = a.isHorizontal(),
														c = b ? [0, f.width] : [0, f.height],
														d = a.inverse ? 1 : 0;
													a.setExtent(c[d], c[1 - d]), i(a, b ? f.x : f.y)
												})
											}
											var f = l.getLayoutRect(a.getBoxLayoutParams(), {
												width: b.getWidth(),
												height: b.getHeight()
											});
											this._rect = f;
											var g = this._axesList;
											d(), !c && a.get("containLabel") && (q(g, function(a) {
												if(!a.model.get("axisLabel.inside")) {
													var b = e(a);
													if(b) {
														var c = a.isHorizontal() ? "height" : "width",
															d = a.model.get("axisLabel.margin");
														f[c] -= b[c] + d, "top" === a.position ? f.y += b.height + d : "left" === a.position && (f.x += b.width + d)
													}
												}
											}), d())
										}, t.getAxis = function(a, b) {
											var c = this._axesMap[a];
											if(null != c) {
												if(null == b)
													for(var d in c)
														if(c.hasOwnProperty(d)) return c[d];
												return c[b]
											}
										}, t.getAxes = function() {
											return this._axesList.slice()
										}, t.getCartesian = function(a, b) {
											if(null != a && null != b) {
												var c = "x" + a + "y" + b;
												return this._coordsMap[c]
											}
											n.isObject(a) && (b = a.yAxisIndex, a = a.xAxisIndex);
											for(var d = 0, e = this._coordsList; d < e.length; d++)
												if(e[d].getAxis("x").index === a || e[d].getAxis("y").index === b) return e[d]
										}, t.getCartesians = function() {
											return this._coordsList.slice()
										}, t.convertToPixel = function(a, b, c) {
											var d = this._findConvertTarget(a, b);
											return d.cartesian ? d.cartesian.dataToPoint(c) : d.axis ? d.axis.toGlobalCoord(d.axis.dataToCoord(c)) : null
										}, t.convertFromPixel = function(a, b, c) {
											var d = this._findConvertTarget(a, b);
											return d.cartesian ? d.cartesian.pointToData(c) : d.axis ? d.axis.coordToData(d.axis.toLocalCoord(c)) : null
										}, t._findConvertTarget = function(a, b) {
											var c, d, e = b.seriesModel,
												f = b.xAxisModel || e && e.getReferringComponents("xAxis")[0],
												g = b.yAxisModel || e && e.getReferringComponents("yAxis")[0],
												h = b.gridModel,
												i = this._coordsList;
											if(e) c = e.coordinateSystem, n.indexOf(i, c) < 0 && (c = null);
											else if(f && g) c = this.getCartesian(f.componentIndex, g.componentIndex);
											else if(f) d = this.getAxis("x", f.componentIndex);
											else if(g) d = this.getAxis("y", g.componentIndex);
											else if(h) {
												var j = h.coordinateSystem;
												j === this && (c = this._coordsList[0])
											}
											return {
												cartesian: c,
												axis: d
											}
										}, t.containPoint = function(a) {
											var b = this._coordsList[0];
											return b ? b.containPoint(a) : void 0
										}, t._initCartesian = function(a, b, c) {
											function e(c) {
												return function(e, i) {
													if(d(e, a, b)) {
														var j = e.get("position");
														"x" === c ? "top" !== j && "bottom" !== j && (j = "bottom", f[j] && (j = "top" === j ? "bottom" : "top")) : "left" !== j && "right" !== j && (j = "left", f[j] && (j = "left" === j ? "right" : "left")), f[j] = !0;
														var k = new p(c, m.createScaleByModel(e), [0, 0], e.get("type"), j),
															l = "category" === k.type;
														k.onBand = l && e.get("boundaryGap"), k.inverse = e.get("inverse"), k.onZero = e.get("axisLine.onZero"), k.onZeroAxisIndex = e.get("axisLine.onZeroAxisIndex"), e.axis = k, k.model = e, k.grid = this, k.index = i, this._axesList.push(k), g[c][i] = k, h[c]++
													}
												}
											}
											var f = {
													left: !1,
													right: !1,
													top: !1,
													bottom: !1
												},
												g = {
													x: {},
													y: {}
												},
												h = {
													x: 0,
													y: 0
												};
											return b.eachComponent("xAxis", e("x"), this), b.eachComponent("yAxis", e("y"), this), h.x && h.y ? (this._axesMap = g, void q(g.x, function(b, c) {
												q(g.y, function(d, e) {
													var f = "x" + c + "y" + e,
														g = new o(f);
													g.grid = this, g.model = a, this._coordsMap[f] = g, this._coordsList.push(g), g.addAxis(b), g.addAxis(d)
												}, this)
											}, this)) : (this._axesMap = {}, void(this._axesList = []))
										}, t._updateScale = function(a, b) {
											function c(a, b, c) {
												q(c.coordDimToDataDim(b.dim), function(c) {
													b.scale.unionExtentFromData(a, c)
												})
											}
											n.each(this._axesList, function(a) {
												a.scale.setExtent(1 / 0, -(1 / 0))
											}), a.eachSeries(function(e) {
												if(k(e)) {
													var f = j(e, a),
														g = f[0],
														h = f[1];
													if(!d(g, b, a) || !d(h, b, a)) return;
													var i = this.getCartesian(g.componentIndex, h.componentIndex),
														l = e.getData(),
														m = i.getAxis("x"),
														n = i.getAxis("y");
													"list" === l.type && (c(l, m, e), c(l, n, e))
												}
											}, this)
										}, t.getTooltipAxes = function(a) {
											var b = [],
												c = [];
											return q(this.getCartesians(), function(d) {
												var e = null != a && "auto" !== a ? d.getAxis(a) : d.getBaseAxis(),
													f = d.getOtherAxis(e);
												n.indexOf(b, e) < 0 && b.push(e), n.indexOf(c, f) < 0 && c.push(f)
											}), {
												baseAxes: b,
												otherAxes: c
											}
										};
										var u = ["xAxis", "yAxis"];
										f.create = function(a, b) {
											var c = [];
											return a.eachComponent("grid", function(d, e) {
												var g = new f(d, a, b);
												g.name = "grid_" + e, g.resize(d, b, !0), d.coordinateSystem = g, c.push(g)
											}), a.eachSeries(function(b) {
												if(k(b)) {
													var c = j(b, a),
														d = c[0],
														e = c[1],
														f = d.getCoordSysModel(),
														g = f.coordinateSystem;
													b.coordinateSystem = g.getCartesian(d.componentIndex, e.componentIndex)
												}
											}), c
										}, f.dimensions = f.prototype.dimensions = o.prototype.dimensions, c(26).register("cartesian2d", f), a.exports = f
									}, function(a, b, c) {
										"use strict";

										function d(a) {
											return a > h || -h > a
										}
										var e = c(19),
											f = c(6),
											g = e.identity,
											h = 5e-5,
											i = function(a) {
												a = a || {}, a.position || (this.position = [0, 0]), null == a.rotation && (this.rotation = 0), a.scale || (this.scale = [1, 1]), this.origin = this.origin || null
											},
											j = i.prototype;
										j.transform = null, j.needLocalTransform = function() {
											return d(this.rotation) || d(this.position[0]) || d(this.position[1]) || d(this.scale[0] - 1) || d(this.scale[1] - 1)
										}, j.updateTransform = function() {
											var a = this.parent,
												b = a && a.transform,
												c = this.needLocalTransform(),
												d = this.transform;
											return c || b ? (d = d || e.create(), c ? this.getLocalTransform(d) : g(d), b && (c ? e.mul(d, a.transform, d) : e.copy(d, a.transform)), this.transform = d, this.invTransform = this.invTransform || e.create(), void e.invert(this.invTransform, d)) : void(d && g(d))
										}, j.getLocalTransform = function(a) {
											return i.getLocalTransform(this, a)
										}, j.setTransform = function(a) {
											var b = this.transform,
												c = a.dpr || 1;
											b ? a.setTransform(c * b[0], c * b[1], c * b[2], c * b[3], c * b[4], c * b[5]) : a.setTransform(c, 0, 0, c, 0, 0)
										}, j.restoreTransform = function(a) {
											var b = a.dpr || 1;
											a.setTransform(b, 0, 0, b, 0, 0)
										};
										var k = [];
										j.decomposeTransform = function() {
											if(this.transform) {
												var a = this.parent,
													b = this.transform;
												a && a.transform && (e.mul(k, a.invTransform, b), b = k);
												var c = b[0] * b[0] + b[1] * b[1],
													f = b[2] * b[2] + b[3] * b[3],
													g = this.position,
													h = this.scale;
												d(c - 1) && (c = Math.sqrt(c)), d(f - 1) && (f = Math.sqrt(f)), b[0] < 0 && (c = -c), b[3] < 0 && (f = -f), g[0] = b[4], g[1] = b[5], h[0] = c, h[1] = f, this.rotation = Math.atan2(-b[1] / f, b[0] / c)
											}
										}, j.getGlobalScale = function() {
											var a = this.transform;
											if(!a) return [1, 1];
											var b = Math.sqrt(a[0] * a[0] + a[1] * a[1]),
												c = Math.sqrt(a[2] * a[2] + a[3] * a[3]);
											return a[0] < 0 && (b = -b), a[3] < 0 && (c = -c), [b, c]
										}, j.transformCoordToLocal = function(a, b) {
											var c = [a, b],
												d = this.invTransform;
											return d && f.applyTransform(c, c, d), c
										}, j.transformCoordToGlobal = function(a, b) {
											var c = [a, b],
												d = this.transform;
											return d && f.applyTransform(c, c, d), c
										}, i.getLocalTransform = function(a, b) {
											b = b || [], g(b);
											var c = a.origin,
												d = a.scale || [1, 1],
												f = a.rotation || 0,
												h = a.position || [0, 0];
											return c && (b[4] -= c[0], b[5] -= c[1]), e.scale(b, b, d), f && e.rotate(b, b, f), c && (b[4] += c[0], b[5] += c[1]), b[4] += h[0], b[5] += h[1], b
										}, a.exports = i
									}, function(a, b, c) {
										var d = c(100),
											e = c(1),
											f = c(13),
											g = c(9),
											h = ["value", "category", "time", "log"];
										a.exports = function(a, b, c, i) {
											e.each(h, function(f) {
												b.extend({
													type: a + "Axis." + f,
													mergeDefaultAndTheme: function(b, d) {
														var h = this.layoutMode,
															i = h ? g.getLayoutParams(b) : {},
															j = d.getTheme();
														e.merge(b, j.get(f + "Axis")), e.merge(b, this.getDefaultOption()), b.type = c(a, b), h && g.mergeLayoutParam(b, i, h)
													},
													defaultOption: e.mergeAll([{}, d[f + "Axis"], i], !0)
												})
											}), f.registerSubTypeDefaulter(a + "Axis", e.curry(c, a))
										}
									}, function(a, b, c) {
										"use strict";

										function d(a, b) {
											return b.type || (b.data ? "category" : "value")
										}
										var e = c(13),
											f = c(1),
											g = c(61),
											h = e.extend({
												type: "cartesian2dAxis",
												axis: null,
												init: function() {
													h.superApply(this, "init", arguments), this.resetRange()
												},
												mergeOption: function() {
													h.superApply(this, "mergeOption", arguments), this.resetRange()
												},
												restoreData: function() {
													h.superApply(this, "restoreData", arguments), this.resetRange()
												},
												getCoordSysModel: function() {
													return this.ecModel.queryComponents({
														mainType: "grid",
														index: this.option.gridIndex,
														id: this.option.gridId
													})[0]
												}
											});
										f.merge(h.prototype, c(43));
										var i = {
											offset: 0
										};
										g("x", h, d, i), g("y", h, d, i), a.exports = h
									}, function(a, b) {
										a.exports = function(a, b) {
											b.eachSeriesByType(a, function(a) {
												var b = a.getData(),
													c = a.coordinateSystem;
												if(c) {
													for(var d = [], e = c.dimensions, f = 0; f < e.length; f++) d.push(a.coordDimToDataDim(c.dimensions[f])[0]);
													1 === d.length ? b.each(d[0], function(a, d) {
														b.setItemLayout(d, isNaN(a) ? [NaN, NaN] : c.dataToPoint(a))
													}) : 2 === d.length && b.each(d, function(a, d, e) {
														b.setItemLayout(e, isNaN(a) || isNaN(d) ? [NaN, NaN] : c.dataToPoint([a, d]))
													}, !0)
												}
											})
										}
									}, function(a, b, c) {
										var d = c(15),
											e = d.set,
											f = d.get;
										a.exports = {
											clearColorPalette: function() {
												e(this, "colorIdx", 0), e(this, "colorNameMap", {})
											},
											getColorFromPalette: function(a, b) {
												b = b || this;
												var c = f(b, "colorIdx") || 0,
													d = f(b, "colorNameMap") || e(b, "colorNameMap", {});
												if(d.hasOwnProperty(a)) return d[a];
												var g = this.get("color", !0) || [];
												if(g.length) {
													var h = g[c];
													return a && (d[a] = h), e(b, "colorIdx", (c + 1) % g.length), h
												}
											}
										}
									}, function(a, b) {
										a.exports = function(a, b) {
											var c = b.findComponents({
												mainType: "legend"
											});
											c && c.length && b.eachSeriesByType(a, function(a) {
												var b = a.getData();
												b.filterSelf(function(a) {
													for(var d = b.getName(a), e = 0; e < c.length; e++)
														if(!c[e].isSelected(d)) return !1;
													return !0
												}, this)
											}, this)
										}
									}, function(a, b, c) {
										function d(a, b, c) {
											a[b] = Math.max(Math.min(a[b], c[1]), c[0])
										}
										var e = c(4),
											f = e.round,
											g = {};
										g.intervalScaleNiceTicks = function(a, b, c, d) {
											var h = {},
												i = a[1] - a[0],
												j = h.interval = e.nice(i / b, !0);
											null != c && c > j && (j = h.interval = c), null != d && j > d && (j = h.interval = d);
											var k = h.intervalPrecision = g.getIntervalPrecision(j),
												l = h.niceTickExtent = [f(Math.ceil(a[0] / j) * j, k), f(Math.floor(a[1] / j) * j, k)];
											return g.fixExtent(l, a), h
										}, g.getIntervalPrecision = function(a) {
											return e.getPrecisionSafe(a) + 2
										}, g.fixExtent = function(a, b) {
											!isFinite(a[0]) && (a[0] = b[0]), !isFinite(a[1]) && (a[1] = b[1]), d(a, 0, b), d(a, 1, b), a[0] > a[1] && (a[0] = a[1])
										}, g.intervalScaleGetTicks = function(a, b, c, d) {
											var e = [];
											if(!a) return e;
											var g = 1e4;
											b[0] < c[0] && e.push(b[0]);
											for(var h = c[0]; h <= c[1] && (e.push(h), h = f(h + a, d), h !== e[e.length - 1]);)
												if(e.length > g) return [];
											return b[1] > (e.length ? e[e.length - 1] : c[1]) && e.push(b[1]), e
										}, a.exports = g
									}, function(a, b, c) {
										var d = c(36),
											e = c(50),
											f = c(15),
											g = function() {
												this.group = new d, this.uid = e.getUID("viewComponent")
											};
										g.prototype = {
											constructor: g,
											init: function(a, b) {},
											render: function(a, b, c, d) {},
											dispose: function() {}
										};
										var h = g.prototype;
										h.updateView = h.updateLayout = h.updateVisual = function(a, b, c, d) {}, f.enableClassExtend(g), f.enableClassManagement(g, {
											registerWhenExtend: !0
										}), a.exports = g
									}, function(a, b, c) {
										"use strict";
										var d = c(73),
											e = c(23),
											f = c(60),
											g = c(183),
											h = c(1),
											i = function(a) {
												f.call(this, a), e.call(this, a), g.call(this, a), this.id = a.id || d()
											};
										i.prototype = {
											type: "element",
											name: "",
											__zr: null,
											ignore: !1,
											clipPath: null,
											drift: function(a, b) {
												switch(this.draggable) {
													case "horizontal":
														b = 0;
														break;
													case "vertical":
														a = 0
												}
												var c = this.transform;
												c || (c = this.transform = [1, 0, 0, 1, 0, 0]), c[4] += a, c[5] += b, this.decomposeTransform(), this.dirty(!1)
											},
											beforeUpdate: function() {},
											afterUpdate: function() {},
											update: function() {
												this.updateTransform()
											},
											traverse: function(a, b) {},
											attrKV: function(a, b) {
												if("position" === a || "scale" === a || "origin" === a) {
													if(b) {
														var c = this[a];
														c || (c = this[a] = []), c[0] = b[0], c[1] = b[1]
													}
												} else this[a] = b
											},
											hide: function() {
												this.ignore = !0, this.__zr && this.__zr.refresh()
											},
											show: function() {
												this.ignore = !1, this.__zr && this.__zr.refresh()
											},
											attr: function(a, b) {
												if("string" == typeof a) this.attrKV(a, b);
												else if(h.isObject(a))
													for(var c in a) a.hasOwnProperty(c) && this.attrKV(c, a[c]);
												return this.dirty(!1), this
											},
											setClipPath: function(a) {
												var b = this.__zr;
												b && a.addSelfToZr(b), this.clipPath && this.clipPath !== a && this.removeClipPath(), this.clipPath = a, a.__zr = b, a.__clipTarget = this, this.dirty(!1)
											},
											removeClipPath: function() {
												var a = this.clipPath;
												a && (a.__zr && a.removeSelfFromZr(a.__zr), a.__zr = null, a.__clipTarget = null, this.clipPath = null, this.dirty(!1))
											},
											addSelfToZr: function(a) {
												this.__zr = a;
												var b = this.animators;
												if(b)
													for(var c = 0; c < b.length; c++) a.animation.addAnimator(b[c]);
												this.clipPath && this.clipPath.addSelfToZr(a)
											},
											removeSelfFromZr: function(a) {
												this.__zr = null;
												var b = this.animators;
												if(b)
													for(var c = 0; c < b.length; c++) a.animation.removeAnimator(b[c]);
												this.clipPath && this.clipPath.removeSelfFromZr(a)
											}
										}, h.mixin(i, g), h.mixin(i, f), h.mixin(i, e), a.exports = i
									}, function(a, b, c) {
										function d(a, b) {
											return a[b]
										}

										function e(a, b, c) {
											a[b] = c
										}

										function f(a, b, c) {
											return(b - a) * c + a
										}

										function g(a, b, c) {
											return c > .5 ? b : a
										}

										function h(a, b, c, d, e) {
											var g = a.length;
											if(1 == e)
												for(var h = 0; g > h; h++) d[h] = f(a[h], b[h], c);
											else
												for(var i = g && a[0].length, h = 0; g > h; h++)
													for(var j = 0; i > j; j++) d[h][j] = f(a[h][j], b[h][j], c)
										}

										function i(a, b, c) {
											var d = a.length,
												e = b.length;
											if(d !== e) {
												var f = d > e;
												if(f) a.length = e;
												else
													for(var g = d; e > g; g++) a.push(1 === c ? b[g] : u.call(b[g]))
											}
											for(var h = a[0] && a[0].length, g = 0; g < a.length; g++)
												if(1 === c) isNaN(a[g]) && (a[g] = b[g]);
												else
													for(var i = 0; h > i; i++) isNaN(a[g][i]) && (a[g][i] = b[g][i])
										}

										function j(a, b, c) {
											if(a === b) return !0;
											var d = a.length;
											if(d !== b.length) return !1;
											if(1 === c) {
												for(var e = 0; d > e; e++)
													if(a[e] !== b[e]) return !1
											} else
												for(var f = a[0].length, e = 0; d > e; e++)
													for(var g = 0; f > g; g++)
														if(a[e][g] !== b[e][g]) return !1;
											return !0
										}

										function k(a, b, c, d, e, f, g, h, i) {
											var j = a.length;
											if(1 == i)
												for(var k = 0; j > k; k++) h[k] = l(a[k], b[k], c[k], d[k], e, f, g);
											else
												for(var m = a[0].length, k = 0; j > k; k++)
													for(var n = 0; m > n; n++) h[k][n] = l(a[k][n], b[k][n], c[k][n], d[k][n], e, f, g)
										}

										function l(a, b, c, d, e, f, g) {
											var h = .5 * (c - a),
												i = .5 * (d - b);
											return(2 * (b - c) + h + i) * g + (-3 * (b - c) - 2 * h - i) * f + h * e + b
										}

										function m(a) {
											if(t(a)) {
												var b = a.length;
												if(t(a[0])) {
													for(var c = [], d = 0; b > d; d++) c.push(u.call(a[d]));
													return c
												}
												return u.call(a)
											}
											return a
										}

										function n(a) {
											return a[0] = Math.floor(a[0]), a[1] = Math.floor(a[1]), a[2] = Math.floor(a[2]), "rgba(" + a.join(",") + ")"
										}

										function o(a) {
											var b = a[a.length - 1].value;
											return t(b && b[0]) ? 2 : 1
										}

										function p(a, b, c, d, e, m) {
											var p = a._getter,
												s = a._setter,
												u = "spline" === b,
												v = d.length;
											if(v) {
												var w, x = d[0].value,
													y = t(x),
													z = !1,
													A = !1,
													B = y ? o(d) : 0;
												d.sort(function(a, b) {
													return a.time - b.time
												}), w = d[v - 1].time;
												for(var C = [], D = [], E = d[0].value, F = !0, G = 0; v > G; G++) {
													C.push(d[G].time / w);
													var H = d[G].value;
													if(y && j(H, E, B) || !y && H === E || (F = !1), E = H, "string" == typeof H) {
														var I = r.parse(H);
														I ? (H = I, z = !0) : A = !0
													}
													D.push(H)
												}
												if(m || !F) {
													for(var J = D[v - 1], G = 0; v - 1 > G; G++) y ? i(D[G], J, B) : !isNaN(D[G]) || isNaN(J) || A || z || (D[G] = J);
													y && i(p(a._target, e), J, B);
													var K, L, M, N, O, P, Q = 0,
														R = 0;
													if(z) var S = [0, 0, 0, 0];
													var T = function(a, b) {
															var c;
															if(0 > b) c = 0;
															else if(R > b) {
																for(K = Math.min(Q + 1, v - 1), c = K; c >= 0 && !(C[c] <= b); c--);
																c = Math.min(c, v - 2)
															} else {
																for(c = Q; v > c && !(C[c] > b); c++);
																c = Math.min(c - 1, v - 2)
															}
															Q = c, R = b;
															var d = C[c + 1] - C[c];
															if(0 !== d)
																if(L = (b - C[c]) / d, u)
																	if(N = D[c], M = D[0 === c ? c : c - 1], O = D[c > v - 2 ? v - 1 : c + 1], P = D[c > v - 3 ? v - 1 : c + 2], y) k(M, N, O, P, L, L * L, L * L * L, p(a, e), B);
																	else {
																		var i;
																		if(z) i = k(M, N, O, P, L, L * L, L * L * L, S, 1), i = n(S);
																		else {
																			if(A) return g(N, O, L);
																			i = l(M, N, O, P, L, L * L, L * L * L)
																		}
																		s(a, e, i)
																	}
															else if(y) h(D[c], D[c + 1], L, p(a, e), B);
															else {
																var i;
																if(z) h(D[c], D[c + 1], L, S, 1), i = n(S);
																else {
																	if(A) return g(D[c], D[c + 1], L);
																	i = f(D[c], D[c + 1], L)
																}
																s(a, e, i)
															}
														},
														U = new q({
															target: a._target,
															life: w,
															loop: a._loop,
															delay: a._delay,
															onframe: T,
															ondestroy: c
														});
													return b && "spline" !== b && (U.easing = b), U
												}
											}
										}
										var q = c(163),
											r = c(22),
											s = c(1),
											t = s.isArrayLike,
											u = Array.prototype.slice,
											v = function(a, b, c, f) {
												this._tracks = {}, this._target = a, this._loop = b || !1, this._getter = c || d, this._setter = f || e, this._clipCount = 0, this._delay = 0, this._doneList = [], this._onframeList = [], this._clipList = []
											};
										v.prototype = {
											when: function(a, b) {
												var c = this._tracks;
												for(var d in b)
													if(b.hasOwnProperty(d)) {
														if(!c[d]) {
															c[d] = [];
															var e = this._getter(this._target, d);
															if(null == e) continue;
															0 !== a && c[d].push({
																time: 0,
																value: m(e)
															})
														}
														c[d].push({
															time: a,
															value: b[d]
														})
													}
												return this
											},
											during: function(a) {
												return this._onframeList.push(a), this
											},
											pause: function() {
												for(var a = 0; a < this._clipList.length; a++) this._clipList[a].pause();
												this._paused = !0
											},
											resume: function() {
												for(var a = 0; a < this._clipList.length; a++) this._clipList[a].resume();
												this._paused = !1
											},
											isPaused: function() {
												return !!this._paused
											},
											_doneCallback: function() {
												this._tracks = {}, this._clipList.length = 0;
												for(var a = this._doneList, b = a.length, c = 0; b > c; c++) a[c].call(this)
											},
											start: function(a, b) {
												var c, d = this,
													e = 0,
													f = function() {
														e--, e || d._doneCallback()
													};
												for(var g in this._tracks)
													if(this._tracks.hasOwnProperty(g)) {
														var h = p(this, a, f, this._tracks[g], g, b);
														h && (this._clipList.push(h), e++, this.animation && this.animation.addClip(h), c = h)
													}
												if(c) {
													var i = c.onframe;
													c.onframe = function(a, b) {
														i(a, b);
														for(var c = 0; c < d._onframeList.length; c++) d._onframeList[c](a, b)
													}
												}
												return e || this._doneCallback(), this
											},
											stop: function(a) {
												for(var b = this._clipList, c = this.animation, d = 0; d < b.length; d++) {
													var e = b[d];
													a && e.onframe(this._target, 1), c && c.removeClip(e)
												}
												b.length = 0
											},
											delay: function(a) {
												return this._delay = a, this
											},
											done: function(a) {
												return a && this._doneList.push(a), this
											},
											getClips: function() {
												return this._clipList
											}
										}, a.exports = v
									}, function(a, b) {
										a.exports = "undefined" != typeof window && (window.requestAnimationFrame && window.requestAnimationFrame.bind(window) || window.msRequestAnimationFrame && window.msRequestAnimationFrame.bind(window) || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame) || function(a) {
											setTimeout(a, 16)
										}
									}, function(a, b) {
										var c = 2 * Math.PI;
										a.exports = {
											normalizeRadian: function(a) {
												return a %= c, 0 > a && (a += c), a
											}
										}
									}, function(a, b) {
										var c = function() {
												this.head = null, this.tail = null, this._len = 0
											},
											d = c.prototype;
										d.insert = function(a) {
											var b = new e(a);
											return this.insertEntry(b), b
										}, d.insertEntry = function(a) {
											this.head ? (this.tail.next = a, a.prev = this.tail, a.next = null, this.tail = a) : this.head = this.tail = a, this._len++
										}, d.remove = function(a) {
											var b = a.prev,
												c = a.next;
											b ? b.next = c : this.head = c, c ? c.prev = b : this.tail = b, a.next = a.prev = null, this._len--
										}, d.len = function() {
											return this._len
										}, d.clear = function() {
											this.head = this.tail = null, this._len = 0
										};
										var e = function(a) {
												this.value = a, this.next, this.prev
											},
											f = function(a) {
												this._list = new c, this._map = {}, this._maxSize = a || 10, this._lastRemovedEntry = null
											},
											g = f.prototype;
										g.put = function(a, b) {
											var c = this._list,
												d = this._map,
												f = null;
											if(null == d[a]) {
												var g = c.len(),
													h = this._lastRemovedEntry;
												if(g >= this._maxSize && g > 0) {
													var i = c.head;
													c.remove(i), delete d[i.key], f = i.value, this._lastRemovedEntry = i
												}
												h ? h.value = b : h = new e(b), h.key = a, c.insertEntry(h), d[a] = h
											}
											return f
										}, g.get = function(a) {
											var b = this._map[a],
												c = this._list;
											return null != b ? (b !== c.tail && (c.remove(b), c.insertEntry(b)), b.value) : void 0
										}, g.clear = function() {
											this._list.clear(), this._map = {}
										}, a.exports = f
									}, function(a, b) {
										var c = 2311;
										a.exports = function() {
											return c++
										}
									}, function(a, b) {
										var c = function(a, b) {
											this.image = a, this.repeat = b, this.type = "pattern"
										};
										c.prototype.getCanvasPattern = function(a) {
											return a.createPattern(this.image, this.repeat || "repeat")
										}, a.exports = c
									}, function(a, b, c) {
										function d(a, b, c) {
											var d = null == b.x ? 0 : b.x,
												e = null == b.x2 ? 1 : b.x2,
												f = null == b.y ? 0 : b.y,
												g = null == b.y2 ? 0 : b.y2;
											b.global || (d = d * c.width + c.x, e = e * c.width + c.x, f = f * c.height + c.y, g = g * c.height + c.y);
											var h = a.createLinearGradient(d, f, e, g);
											return h
										}

										function e(a, b, c) {
											var d = c.width,
												e = c.height,
												f = Math.min(d, e),
												g = null == b.x ? .5 : b.x,
												h = null == b.y ? .5 : b.y,
												i = null == b.r ? .5 : b.r;
											b.global || (g = g * d + c.x, h = h * e + c.y, i *= f);
											var j = a.createRadialGradient(g, h, 0, g, h, i);
											return j
										}
										var f = (c(40), [
												["shadowBlur", 0],
												["shadowOffsetX", 0],
												["shadowOffsetY", 0],
												["shadowColor", "#000"],
												["lineCap", "butt"],
												["lineJoin", "miter"],
												["miterLimit", 10]
											]),
											g = function(a, b) {
												this.extendFrom(a, !1), this.host = b
											};
										g.prototype = {
											constructor: g,
											host: null,
											fill: "#000",
											stroke: null,
											opacity: 1,
											lineDash: null,
											lineDashOffset: 0,
											shadowBlur: 0,
											shadowOffsetX: 0,
											shadowOffsetY: 0,
											lineWidth: 1,
											strokeNoScale: !1,
											text: null,
											font: null,
											textFont: null,
											fontStyle: null,
											fontWeight: null,
											fontSize: null,
											fontFamily: null,
											textTag: null,
											textFill: "#000",
											textStroke: null,
											textWidth: null,
											textHeight: null,
											textLineWidth: 0,
											textLineHeight: null,
											textPosition: "inside",
											textRect: null,
											textOffset: null,
											textAlign: null,
											textVerticalAlign: null,
											textDistance: 5,
											textShadowColor: "transparent",
											textShadowBlur: 0,
											textShadowOffsetX: 0,
											textShadowOffsetY: 0,
											textBoxShadowColor: "transparent",
											textBoxShadowBlur: 0,
											textBoxShadowOffsetX: 0,
											textBoxShadowOffsetY: 0,
											transformText: !1,
											textRotation: 0,
											textOrigin: null,
											textBackgroundColor: null,
											textBorderColor: null,
											textBorderWidth: 0,
											textBorderRadius: 0,
											textPadding: null,
											rich: null,
											truncate: null,
											blend: null,
											bind: function(a, b, c) {
												for(var d = this, e = c && c.style, g = !e, h = 0; h < f.length; h++) {
													var i = f[h],
														j = i[0];
													(g || d[j] !== e[j]) && (a[j] = d[j] || i[1])
												}
												if((g || d.fill !== e.fill) && (a.fillStyle = d.fill), (g || d.stroke !== e.stroke) && (a.strokeStyle = d.stroke), (g || d.opacity !== e.opacity) && (a.globalAlpha = null == d.opacity ? 1 : d.opacity), (g || d.blend !== e.blend) && (a.globalCompositeOperation = d.blend || "source-over"), this.hasStroke()) {
													var k = d.lineWidth;
													a.lineWidth = k / (this.strokeNoScale && b && b.getLineScale ? b.getLineScale() : 1)
												}
											},
											hasFill: function() {
												var a = this.fill;
												return null != a && "none" !== a
											},
											hasStroke: function() {
												var a = this.stroke;
												return null != a && "none" !== a && this.lineWidth > 0
											},
											extendFrom: function(a, b) {
												if(a)
													for(var c in a) !a.hasOwnProperty(c) || b !== !0 && (b === !1 ? this.hasOwnProperty(c) : null == a[c]) || (this[c] = a[c])
											},
											set: function(a, b) {
												"string" == typeof a ? this[a] = b : this.extendFrom(a, !0)
											},
											clone: function() {
												var a = new this.constructor;
												return a.extendFrom(this, !0), a
											},
											getGradient: function(a, b, c) {
												for(var f = "radial" === b.type ? e : d, g = f(a, b, c), h = b.colorStops, i = 0; i < h.length; i++) g.addColorStop(h[i].offset, h[i].color);
												return g
											}
										};
										for(var h = g.prototype, i = 0; i < f.length; i++) {
											var j = f[i];
											j[0] in h || (h[j[0]] = j[1])
										}
										g.getGradient = h.getGradient, a.exports = g
									}, function(a, b, c) {
										var d = c(10),
											e = [
												["shadowBlur", 0],
												["shadowColor", "#000"],
												["shadowOffsetX", 0],
												["shadowOffsetY", 0]
											];
										a.exports = function(a) {
											return d.browser.ie && d.browser.version >= 11 ? function() {
												var b, c = this.__clipPaths,
													d = this.style;
												if(c)
													for(var f = 0; f < c.length; f++) {
														var g = c[f],
															h = g && g.shape,
															i = g && g.type;
														if(h && ("sector" === i && h.startAngle === h.endAngle || "rect" === i && (!h.width || !h.height))) {
															for(var j = 0; j < e.length; j++) e[j][2] = d[e[j][0]], d[e[j][0]] = e[j][1];
															b = !0;
															break
														}
													}
												if(a.apply(this, arguments), b)
													for(var j = 0; j < e.length; j++) d[e[j][0]] = e[j][2]
											} : a
										}
									}, function(a, b, c) {
										var d = c(173),
											e = c(172);
										a.exports = {
											buildPath: function(a, b, c) {
												var f = b.points,
													g = b.smooth;
												if(f && f.length >= 2) {
													if(g && "spline" !== g) {
														var h = e(f, g, c, b.smoothConstraint);
														a.moveTo(f[0][0], f[0][1]);
														for(var i = f.length, j = 0;
															(c ? i : i - 1) > j; j++) {
															var k = h[2 * j],
																l = h[2 * j + 1],
																m = f[(j + 1) % i];
															a.bezierCurveTo(k[0], k[1], l[0], l[1], m[0], m[1])
														}
													} else {
														"spline" === g && (f = d(f, c)), a.moveTo(f[0][0], f[0][1]);
														for(var j = 1, n = f.length; n > j; j++) a.lineTo(f[j][0], f[j][1])
													}
													c && a.closePath()
												}
											}
										}
									}, function(a, b) {
										a.exports = {
											buildPath: function(a, b) {
												var c, d, e, f, g = b.x,
													h = b.y,
													i = b.width,
													j = b.height,
													k = b.r;
												0 > i && (g += i, i = -i), 0 > j && (h += j, j = -j), "number" == typeof k ? c = d = e = f = k : k instanceof Array ? 1 === k.length ? c = d = e = f = k[0] : 2 === k.length ? (c = e = k[0], d = f = k[1]) : 3 === k.length ? (c = k[0], d = f = k[1], e = k[2]) : (c = k[0], d = k[1], e = k[2], f = k[3]) : c = d = e = f = 0;
												var l;
												c + d > i && (l = c + d, c *= i / l, d *= i / l), e + f > i && (l = e + f, e *= i / l, f *= i / l), d + e > j && (l = d + e, d *= j / l, e *= j / l), c + f > j && (l = c + f, c *= j / l, f *= j / l), a.moveTo(g + c, h), a.lineTo(g + i - d, h), 0 !== d && a.quadraticCurveTo(g + i, h, g + i, h + d), a.lineTo(g + i, h + j - e), 0 !== e && a.quadraticCurveTo(g + i, h + j, g + i - e, h + j), a.lineTo(g + f, h + j), 0 !== f && a.quadraticCurveTo(g, h + j, g, h + j - f), a.lineTo(g, h + c), 0 !== c && a.quadraticCurveTo(g, h, g + c, h)
											}
										}
									}, function(a, b, c) {
										var d = c(1),
											e = {};
										e.layout = function(a, b, c) {
											c = c || {};
											var e = a.coordinateSystem,
												f = b.axis,
												g = {},
												h = f.position,
												i = f.onZero ? "onZero" : h,
												j = f.dim,
												k = e.getRect(),
												l = [k.x, k.x + k.width, k.y, k.y + k.height],
												m = {
													left: 0,
													right: 1,
													top: 0,
													bottom: 1,
													onZero: 2
												},
												n = b.get("offset") || 0,
												o = "x" === j ? [l[2] - n, l[3] + n] : [l[0] - n, l[1] + n];
											if(f.onZero) {
												var p = e.getAxis("x" === j ? "y" : "x", f.onZeroAxisIndex),
													q = p.toGlobalCoord(p.dataToCoord(0));
												o[m.onZero] = Math.max(Math.min(q, o[1]), o[0])
											}
											g.position = ["y" === j ? o[m[i]] : l[0], "x" === j ? o[m[i]] : l[3]], g.rotation = Math.PI / 2 * ("x" === j ? 0 : 1);
											var r = {
												top: -1,
												bottom: 1,
												left: -1,
												right: 1
											};
											g.labelDirection = g.tickDirection = g.nameDirection = r[h], g.labelOffset = f.onZero ? o[m[h]] - o[m.onZero] : 0, b.get("axisTick.inside") && (g.tickDirection = -g.tickDirection), d.retrieve(c.labelInside, b.get("axisLabel.inside")) && (g.labelDirection = -g.labelDirection);
											var s = b.get("axisLabel.rotate");
											return g.labelRotate = "top" === i ? -s : s, g.labelInterval = f.getLabelInterval(), g.z2 = 1, g
										}, a.exports = e
									}, , , function(a, b, c) {
										var d = c(1);
										a.exports = {
											updateSelectedMap: function(a) {
												this._targetList = a.slice(), this._selectTargetMap = d.reduce(a || [], function(a, b) {
													return a.set(b.name, b), a
												}, d.createHashMap())
											},
											select: function(a, b) {
												var c = null != b ? this._targetList[b] : this._selectTargetMap.get(a),
													d = this.get("selectedMode");
												"single" === d && this._selectTargetMap.each(function(a) {
													a.selected = !1
												}), c && (c.selected = !0)
											},
											unSelect: function(a, b) {
												var c = null != b ? this._targetList[b] : this._selectTargetMap.get(a);
												c && (c.selected = !1)
											},
											toggleSelected: function(a, b) {
												var c = null != b ? this._targetList[b] : this._selectTargetMap.get(a);
												return null != c ? (this[c.selected ? "unSelect" : "select"](a, b), c.selected) : void 0
											},
											isSelected: function(a, b) {
												var c = null != b ? this._targetList[b] : this._selectTargetMap.get(a);
												return c && c.selected
											}
										}
									}, , , , function(a, b, c) {
										"use strict";

										function d(a) {
											return a.get("stack") || m + a.seriesIndex
										}

										function e(a) {
											return a.dim + a.index
										}

										function f(a, b) {
											var c = [],
												d = a.axis,
												e = "axis0";
											if("category" === d.type) {
												for(var f = d.getBandWidth(), g = 0; g < a.count; g++) c.push(j.defaults({
													bandWidth: f,
													axisKey: e,
													stackId: m + g
												}, a));
												for(var i = h(c, b), k = [], g = 0; g < a.count; g++) {
													var l = i[e][m + g];
													l.offsetCenter = l.offset + l.width / 2, k.push(l)
												}
												return k
											}
										}

										function g(a, b) {
											var c = j.map(a, function(a) {
												var b = a.getData(),
													c = a.coordinateSystem,
													f = c.getBaseAxis(),
													g = f.getExtent(),
													h = "category" === f.type ? f.getBandWidth() : Math.abs(g[1] - g[0]) / b.count(),
													i = l(a.get("barWidth"), h),
													j = l(a.get("barMaxWidth"), h),
													k = a.get("barGap"),
													m = a.get("barCategoryGap");
												return {
													bandWidth: h,
													barWidth: i,
													barMaxWidth: j,
													barGap: k,
													barCategoryGap: m,
													axisKey: e(f),
													stackId: d(a)
												}
											});
											return h(c, b)
										}

										function h(a, b) {
											var c = {};
											j.each(a, function(a, b) {
												var d = a.axisKey,
													e = a.bandWidth,
													f = c[d] || {
														bandWidth: e,
														remainedWidth: e,
														autoWidthCount: 0,
														categoryGap: "20%",
														gap: "30%",
														stacks: {}
													},
													g = f.stacks;
												c[d] = f;
												var h = a.stackId;
												g[h] || f.autoWidthCount++, g[h] = g[h] || {
													width: 0,
													maxWidth: 0
												};
												var i = a.barWidth;
												i && !g[h].width && (g[h].width = i, i = Math.min(f.remainedWidth, i), f.remainedWidth -= i);
												var j = a.barMaxWidth;
												j && (g[h].maxWidth = j);
												var k = a.barGap;
												null != k && (f.gap = k);
												var l = a.barCategoryGap;
												null != l && (f.categoryGap = l)
											});
											var d = {};
											return j.each(c, function(a, b) {
												d[b] = {};
												var c = a.stacks,
													e = a.bandWidth,
													f = l(a.categoryGap, e),
													g = l(a.gap, 1),
													h = a.remainedWidth,
													i = a.autoWidthCount,
													k = (h - f) / (i + (i - 1) * g);
												k = Math.max(k, 0), j.each(c, function(a, b) {
													var c = a.maxWidth;
													c && k > c && (c = Math.min(c, h), a.width && (c = Math.min(c, a.width)), h -= c, a.width = c, i--)
												}), k = (h - f) / (i + (i - 1) * g), k = Math.max(k, 0);
												var m, n = 0;
												j.each(c, function(a, b) {
													a.width || (a.width = k), m = a, n += a.width * (1 + g)
												}), m && (n -= m.width * g);
												var o = -n / 2;
												j.each(c, function(a, c) {
													d[b][c] = d[b][c] || {
														offset: o,
														width: a.width
													}, o += a.width * (1 + g)
												})
											}), d
										}

										function i(a, b, c) {
											var f = g(j.filter(b.getSeriesByType(a), function(a) {
													return !b.isSeriesFiltered(a) && a.coordinateSystem && "cartesian2d" === a.coordinateSystem.type
												})),
												h = {},
												i = {};
											b.eachSeriesByType(a, function(a) {
												if("cartesian2d" === a.coordinateSystem.type) {
													var b = a.getData(),
														c = a.coordinateSystem,
														g = c.getBaseAxis(),
														j = d(a),
														k = f[e(g)][j],
														l = k.offset,
														m = k.width,
														n = c.getOtherAxis(g),
														o = a.get("barMinHeight") || 0,
														p = g.onZero ? n.toGlobalCoord(n.dataToCoord(0)) : n.getGlobalExtent()[0],
														q = [a.coordDimToDataDim("x")[0], a.coordDimToDataDim("y")[0]],
														r = b.mapArray(q, function(a, b) {
															return c.dataToPoint([a, b])
														}, !0);
													h[j] = h[j] || [], i[j] = i[j] || [], b.setLayout({
														offset: l,
														size: m
													}), b.each(a.coordDimToDataDim(n.dim)[0], function(a, c) {
														if(!isNaN(a)) {
															h[j][c] || (h[j][c] = {
																p: p,
																n: p
															}, i[j][c] = {
																p: p,
																n: p
															});
															var d, e, f, g, k = a >= 0 ? "p" : "n",
																q = r[c],
																s = h[j][c][k],
																t = i[j][c][k];
															n.isHorizontal() ? (d = s, e = q[1] + l, f = q[0] - t, g = m, i[j][c][k] += f, Math.abs(f) < o && (f = (0 > f ? -1 : 1) * o), h[j][c][k] += f) : (d = q[0] + l, e = s, f = m, g = q[1] - t, i[j][c][k] += g, Math.abs(g) < o && (g = (0 >= g ? -1 : 1) * o), h[j][c][k] += g), b.setItemLayout(c, {
																x: d,
																y: e,
																width: f,
																height: g
															})
														}
													}, !0)
												}
											}, this)
										}
										var j = c(1),
											k = c(4),
											l = k.parsePercent,
											m = "__ec_stack_";
										i.getLayoutOnAxis = f, a.exports = i
									}, , function(a, b) {
										a.exports = function(a, b) {
											var c = {};
											b.eachRawSeriesByType(a, function(a) {
												var d = a.getRawData(),
													e = {};
												if(!b.isSeriesFiltered(a)) {
													var f = a.getData();
													f.each(function(a) {
														var b = f.getRawIndex(a);
														e[b] = a
													}), d.each(function(b) {
														var g = e[b],
															h = null != g && f.getItemVisual(g, "color", !0);
														if(h) d.setItemVisual(b, "color", h);
														else {
															var i = d.getItemModel(b),
																j = i.get("itemStyle.normal.color") || a.getColorFromPalette(d.getName(b), c);
															d.setItemVisual(b, "color", j), null != g && f.setItemVisual(g, "color", j)
														}
													})
												}
											})
										}
									}, function(a, b, c) {
										var d = c(6),
											e = c(20),
											f = {},
											g = Math.min,
											h = Math.max,
											i = Math.sin,
											j = Math.cos,
											k = d.create(),
											l = d.create(),
											m = d.create(),
											n = 2 * Math.PI;
										f.fromPoints = function(a, b, c) {
											if(0 !== a.length) {
												var d, e = a[0],
													f = e[0],
													i = e[0],
													j = e[1],
													k = e[1];
												for(d = 1; d < a.length; d++) e = a[d], f = g(f, e[0]), i = h(i, e[0]), j = g(j, e[1]), k = h(k, e[1]);
												b[0] = f, b[1] = j, c[0] = i, c[1] = k
											}
										}, f.fromLine = function(a, b, c, d, e, f) {
											e[0] = g(a, c), e[1] = g(b, d), f[0] = h(a, c), f[1] = h(b, d)
										};
										var o = [],
											p = [];
										f.fromCubic = function(a, b, c, d, f, i, j, k, l, m) {
											var n, q = e.cubicExtrema,
												r = e.cubicAt,
												s = q(a, c, f, j, o);
											for(l[0] = 1 / 0, l[1] = 1 / 0, m[0] = -(1 / 0), m[1] = -(1 / 0), n = 0; s > n; n++) {
												var t = r(a, c, f, j, o[n]);
												l[0] = g(t, l[0]), m[0] = h(t, m[0])
											}
											for(s = q(b, d, i, k, p), n = 0; s > n; n++) {
												var u = r(b, d, i, k, p[n]);
												l[1] = g(u, l[1]), m[1] = h(u, m[1])
											}
											l[0] = g(a, l[0]), m[0] = h(a, m[0]), l[0] = g(j, l[0]), m[0] = h(j, m[0]), l[1] = g(b, l[1]), m[1] = h(b, m[1]), l[1] = g(k, l[1]), m[1] = h(k, m[1])
										}, f.fromQuadratic = function(a, b, c, d, f, i, j, k) {
											var l = e.quadraticExtremum,
												m = e.quadraticAt,
												n = h(g(l(a, c, f), 1), 0),
												o = h(g(l(b, d, i), 1), 0),
												p = m(a, c, f, n),
												q = m(b, d, i, o);
											j[0] = g(a, f, p), j[1] = g(b, i, q), k[0] = h(a, f, p), k[1] = h(b, i, q)
										}, f.fromArc = function(a, b, c, e, f, g, h, o, p) {
											var q = d.min,
												r = d.max,
												s = Math.abs(f - g);
											if(1e-4 > s % n && s > 1e-4) return o[0] = a - c, o[1] = b - e, p[0] = a + c, void(p[1] = b + e);
											if(k[0] = j(f) * c + a, k[1] = i(f) * e + b, l[0] = j(g) * c + a, l[1] = i(g) * e + b, q(o, k, l), r(p, k, l), f %= n, 0 > f && (f += n), g %= n, 0 > g && (g += n), f > g && !h ? g += n : g > f && h && (f += n), h) {
												var t = g;
												g = f, f = t
											}
											for(var u = 0; g > u; u += Math.PI / 2) u > f && (m[0] = j(u) * c + a, m[1] = i(u) * e + b, q(o, m, o), r(p, m, p))
										}, a.exports = f
									}, function(a, b, c) {
										var d = c(38),
											e = c(1),
											f = c(16),
											g = c(40),
											h = function(a) {
												d.call(this, a)
											};
										h.prototype = {
											constructor: h,
											type: "text",
											brush: function(a, b) {
												var c = this.style;
												this.__dirty && g.normalizeTextStyle(c, !0), c.fill = c.stroke = c.shadowBlur = c.shadowColor = c.shadowOffsetX = c.shadowOffsetY = null;
												var d = c.text;
												null != d && (d += ""), c.bind(a, this, b), g.needDrawText(d, c) && (this.setTransform(a), g.renderText(this, a, d, c), this.restoreTransform(a))
											},
											getBoundingRect: function() {
												var a = this.style;
												if(this.__dirty && g.normalizeTextStyle(a, !0), !this._rect) {
													var b = a.text;
													null != b ? b += "" : b = "";
													var c = f.getBoundingRect(a.text + "", a.font, a.textAlign, a.textVerticalAlign, a.textPadding, a.rich);
													if(c.x += a.x || 0, c.y += a.y || 0, g.getStroke(a.textStroke, a.textLineWidth)) {
														var d = a.textLineWidth;
														c.x -= d / 2, c.y -= d / 2, c.width += d, c.height += d
													}
													this._rect = c
												}
												return this._rect
											}
										}, e.inherits(h, d), a.exports = h
									}, function(a, b, c) {
										var d = c(40),
											e = c(12),
											f = new e,
											g = function() {};
										g.prototype = {
											constructor: g,
											drawRectText: function(a, b) {
												var c = this.style;
												b = c.textRect || b, this.__dirty && d.normalizeTextStyle(c, !0);
												var e = c.text;
												if(null != e && (e += ""), d.needDrawText(e, c)) {
													a.save();
													var g = this.transform;
													c.transformText ? this.setTransform(a) : g && (f.copy(b), f.applyTransform(g), b = f), d.renderText(this, a, e, c, b), a.restore()
												}
											}
										}, a.exports = g
									}, function(a, b, c) {
										function d(a) {
											delete n[a]
										}
										var e = c(73),
											f = c(10),
											g = c(1),
											h = c(158),
											i = c(161),
											j = c(162),
											k = c(169),
											l = !f.canvasSupported,
											m = {
												canvas: c(160)
											},
											n = {},
											o = {};
										o.version = "3.6.1", o.init = function(a, b) {
											var c = new p(e(), a, b);
											return n[c.id] = c, c
										}, o.dispose = function(a) {
											if(a) a.dispose();
											else {
												for(var b in n) n.hasOwnProperty(b) && n[b].dispose();
												n = {}
											}
											return o
										}, o.getInstance = function(a) {
											return n[a]
										}, o.registerPainter = function(a, b) {
											m[a] = b
										};
										var p = function(a, b, c) {
											c = c || {}, this.dom = b, this.id = a;
											var d = this,
												e = new i,
												n = c.renderer;
											if(l) {
												if(!m.vml) throw new Error("You need to require 'zrender/vml/vml' to support IE8");
												n = "vml"
											} else n && m[n] || (n = "canvas");
											var o = new m[n](b, e, c);
											this.storage = e, this.painter = o;
											var p = f.node ? null : new k(o.getViewportRoot());
											this.handler = new h(e, o, p, o.root), this.animation = new j({
												stage: {
													update: g.bind(this.flush, this)
												}
											}), this.animation.start(), this._needsRefresh;
											var q = e.delFromStorage,
												r = e.addToStorage;
											e.delFromStorage = function(a) {
												q.call(e, a), a && a.removeSelfFromZr(d)
											}, e.addToStorage = function(a) {
												r.call(e, a), a.addSelfToZr(d)
											}
										};
										p.prototype = {
											constructor: p,
											getId: function() {
												return this.id
											},
											add: function(a) {
												this.storage.addRoot(a), this._needsRefresh = !0
											},
											remove: function(a) {
												this.storage.delRoot(a), this._needsRefresh = !0
											},
											configLayer: function(a, b) {
												this.painter.configLayer(a, b), this._needsRefresh = !0
											},
											refreshImmediately: function() {
												this._needsRefresh = !1, this.painter.refresh(), this._needsRefresh = !1
											},
											refresh: function() {
												this._needsRefresh = !0
											},
											flush: function() {
												this._needsRefresh && this.refreshImmediately(), this._needsRefreshHover && this.refreshHoverImmediately()
											},
											addHover: function(a, b) {
												this.painter.addHover && (this.painter.addHover(a, b), this.refreshHover())
											},
											removeHover: function(a) {
												this.painter.removeHover && (this.painter.removeHover(a), this.refreshHover())
											},
											clearHover: function() {
												this.painter.clearHover && (this.painter.clearHover(), this.refreshHover())
											},
											refreshHover: function() {
												this._needsRefreshHover = !0
											},
											refreshHoverImmediately: function() {
												this._needsRefreshHover = !1, this.painter.refreshHover && this.painter.refreshHover()
											},
											resize: function(a) {
												a = a || {}, this.painter.resize(a.width, a.height), this.handler.resize()
											},
											clearAnimation: function() {
												this.animation.clear()
											},
											getWidth: function() {
												return this.painter.getWidth()
											},
											getHeight: function() {
												return this.painter.getHeight()
											},
											pathToImage: function(a, b) {
												return this.painter.pathToImage(a, b)
											},
											setCursorStyle: function(a) {
												this.handler.setCursorStyle(a)
											},
											findHover: function(a, b) {
												return this.handler.findHover(a, b)
											},
											on: function(a, b, c) {
												this.handler.on(a, b, c)
											},
											off: function(a, b) {
												this.handler.off(a, b)
											},
											trigger: function(a, b) {
												this.handler.trigger(a, b)
											},
											clear: function() {
												this.storage.delRoot(), this.painter.clear()
											},
											dispose: function() {
												this.animation.stop(), this.clear(), this.storage.dispose(), this.painter.dispose(), this.handler.dispose(), this.animation = this.storage = this.painter = this.handler = null, d(this.id)
											}
										}, a.exports = o
									}, function(a, b, c) {
										var d = c(2),
											e = c(1);
										a.exports = function(a, b) {
											e.each(b, function(b) {
												b.update = "updateView", d.registerAction(b, function(c, d) {
													var e = {};
													return d.eachComponent({
														mainType: "series",
														subType: a,
														query: c
													}, function(a) {
														a[b.method] && a[b.method](c.name, c.dataIndex);
														var d = a.getData();
														d.each(function(b) {
															var c = d.getName(b);
															e[c] = a.isSelected(c) || !1
														})
													}), {
														name: c.name,
														selected: e
													}
												})
											})
										}
									}, function(a, b, c) {
										"use strict";
										var d = c(17),
											e = c(28);
										a.exports = d.extend({
											type: "series.__base_bar__",
											getInitialData: function(a, b) {
												return e(a.data, this, b)
											},
											getMarkerPosition: function(a) {
												var b = this.coordinateSystem;
												if(b) {
													var c = b.dataToPoint(a, !0),
														d = this.getData(),
														e = d.getLayout("offset"),
														f = d.getLayout("size"),
														g = b.getBaseAxis().isHorizontal() ? 0 : 1;
													return c[g] += e + f / 2, c
												}
												return [NaN, NaN]
											},
											defaultOption: {
												zlevel: 0,
												z: 2,
												coordinateSystem: "cartesian2d",
												legendHoverLink: !0,
												barMinHeight: 0,
												barMinAngle: 0,
												itemStyle: {
													normal: {},
													emphasis: {}
												}
											}
										})
									}, function(a, b, c) {
										function d(a, b) {
											"outside" === a.textPosition && (a.textPosition = b)
										}
										var e = c(3),
											f = {};
										f.setLabel = function(a, b, c, f, g, h, i) {
											var j = c.getModel("label.normal"),
												k = c.getModel("label.emphasis");
											e.setLabelStyle(a, b, j, k, {
												labelFetcher: g,
												labelDataIndex: h,
												defaultText: g.getRawValue(h),
												isRectText: !0,
												autoColor: f
											}), d(a), d(b)
										}, a.exports = f
									}, function(a, b, c) {
										var d = c(5),
											e = {};
										e.findLabelValueDim = function(a) {
											var b, c = d.otherDimToDataDim(a, "label");
											if(c.length) b = c[0];
											else
												for(var e, f = a.dimensions.slice(); f.length && (b = f.pop(), e = a.getDimensionInfo(b).type, "ordinal" === e || "time" === e););
											return b
										}, a.exports = e
									}, function(a, b, c) {
										function d(a) {
											return isNaN(a[0]) || isNaN(a[1])
										}

										function e(a, b, c, e, f, g, i, q, r, s, t) {
											for(var u = 0, v = c, w = 0; e > w; w++) {
												var x = b[v];
												if(v >= f || 0 > v) break;
												if(d(x)) {
													if(t) {
														v += g;
														continue
													}
													break
												}
												if(v === c) a[g > 0 ? "moveTo" : "lineTo"](x[0], x[1]), m(o, x);
												else if(r > 0) {
													var y = v + g,
														z = b[y];
													if(t)
														for(; z && d(b[y]);) y += g, z = b[y];
													var A = .5,
														B = b[u],
														z = b[y];
													if(!z || d(z)) m(p, x);
													else {
														d(z) && !t && (z = x), h.sub(n, z, B);
														var C, D;
														if("x" === s || "y" === s) {
															var E = "x" === s ? 0 : 1;
															C = Math.abs(x[E] - B[E]), D = Math.abs(x[E] - z[E])
														} else C = h.dist(x, B), D = h.dist(x, z);
														A = D / (D + C), l(p, x, n, -r * (1 - A))
													}
													j(o, o, q), k(o, o, i), j(p, p, q), k(p, p, i), a.bezierCurveTo(o[0], o[1], p[0], p[1], x[0], x[1]), l(o, x, n, r * A)
												} else a.lineTo(x[0], x[1]);
												u = v, v += g
											}
											return w
										}

										function f(a, b) {
											var c = [1 / 0, 1 / 0],
												d = [-(1 / 0), -(1 / 0)];
											if(b)
												for(var e = 0; e < a.length; e++) {
													var f = a[e];
													f[0] < c[0] && (c[0] = f[0]), f[1] < c[1] && (c[1] = f[1]), f[0] > d[0] && (d[0] = f[0]), f[1] > d[1] && (d[1] = f[1])
												}
											return {
												min: b ? c : d,
												max: b ? d : c
											}
										}
										var g = c(8),
											h = c(6),
											i = c(76),
											j = h.min,
											k = h.max,
											l = h.scaleAndAdd,
											m = h.copy,
											n = [],
											o = [],
											p = [];
										a.exports = {
											Polyline: g.extend({
												type: "ec-polyline",
												shape: {
													points: [],
													smooth: 0,
													smoothConstraint: !0,
													smoothMonotone: null,
													connectNulls: !1
												},
												style: {
													fill: null,
													stroke: "#000"
												},
												brush: i(g.prototype.brush),
												buildPath: function(a, b) {
													var c = b.points,
														g = 0,
														h = c.length,
														i = f(c, b.smoothConstraint);
													if(b.connectNulls) {
														for(; h > 0 && d(c[h - 1]); h--);
														for(; h > g && d(c[g]); g++);
													}
													for(; h > g;) g += e(a, c, g, h, h, 1, i.min, i.max, b.smooth, b.smoothMonotone, b.connectNulls) + 1
												}
											}),
											Polygon: g.extend({
												type: "ec-polygon",
												shape: {
													points: [],
													stackedOnPoints: [],
													smooth: 0,
													stackedOnSmooth: 0,
													smoothConstraint: !0,
													smoothMonotone: null,
													connectNulls: !1
												},
												brush: i(g.prototype.brush),
												buildPath: function(a, b) {
													var c = b.points,
														g = b.stackedOnPoints,
														h = 0,
														i = c.length,
														j = b.smoothMonotone,
														k = f(c, b.smoothConstraint),
														l = f(g, b.smoothConstraint);
													if(b.connectNulls) {
														for(; i > 0 && d(c[i - 1]); i--);
														for(; i > h && d(c[h]); h++);
													}
													for(; i > h;) {
														var m = e(a, c, h, i, i, 1, k.min, k.max, b.smooth, j, b.connectNulls);
														e(a, g, h + m - 1, m, i, -1, l.min, l.max, b.stackedOnSmooth, j, b.connectNulls), h += m + 1, a.closePath()
													}
												}
											})
										}
									}, , , function(a, b, c) {
										var d = c(1),
											e = {
												show: !0,
												zlevel: 0,
												z: 0,
												inverse: !1,
												name: "",
												nameLocation: "end",
												nameRotate: null,
												nameTruncate: {
													maxWidth: null,
													ellipsis: "...",
													placeholder: "."
												},
												nameTextStyle: {},
												nameGap: 15,
												silent: !1,
												triggerEvent: !1,
												tooltip: {
													show: !1
												},
												axisPointer: {},
												axisLine: {
													show: !0,
													onZero: !0,
													onZeroAxisIndex: null,
													lineStyle: {
														color: "#333",
														width: 1,
														type: "solid"
													}
												},
												axisTick: {
													show: !0,
													inside: !1,
													length: 5,
													lineStyle: {
														width: 1
													}
												},
												axisLabel: {
													show: !0,
													inside: !1,
													rotate: 0,
													showMinLabel: null,
													showMaxLabel: null,
													margin: 8,
													fontSize: 12
												},
												splitLine: {
													show: !0,
													lineStyle: {
														color: ["#ccc"],
														width: 1,
														type: "solid"
													}
												},
												splitArea: {
													show: !1,
													areaStyle: {
														color: ["rgba(250,250,250,0.3)", "rgba(200,200,200,0.3)"]
													}
												}
											},
											f = d.merge({
												boundaryGap: !0,
												splitLine: {
													show: !1
												},
												axisTick: {
													alignWithLabel: !1,
													interval: "auto"
												},
												axisLabel: {
													interval: "auto"
												}
											}, e),
											g = d.merge({
												boundaryGap: [0, 0],
												splitNumber: 5
											}, e),
											h = d.defaults({
												scale: !0,
												min: "dataMin",
												max: "dataMax"
											}, g),
											i = d.defaults({
												scale: !0,
												logBase: 10
											}, g);
										a.exports = {
											categoryAxis: f,
											valueAxis: g,
											timeAxis: h,
											logAxis: i
										}
									}, function(a, b) {
										a.exports = {
											containStroke: function(a, b, c, d, e, f, g) {
												if(0 === e) return !1;
												var h = e,
													i = 0,
													j = a;
												if(g > b + h && g > d + h || b - h > g && d - h > g || f > a + h && f > c + h || a - h > f && c - h > f) return !1;
												if(a === c) return Math.abs(f - a) <= h / 2;
												i = (b - d) / (a - c), j = (a * d - c * b) / (a - c);
												var k = i * f - g + j,
													l = k * k / (i * i + 1);
												return h / 2 * h / 2 >= l
											}
										}
									}, function(a, b, c) {
										var d = c(20);
										a.exports = {
											containStroke: function(a, b, c, e, f, g, h, i, j) {
												if(0 === h) return !1;
												var k = h;
												if(j > b + k && j > e + k && j > g + k || b - k > j && e - k > j && g - k > j || i > a + k && i > c + k && i > f + k || a - k > i && c - k > i && f - k > i) return !1;
												var l = d.quadraticProjectPoint(a, b, c, e, f, g, i, j, null);
												return k / 2 >= l
											}
										}
									}, function(a, b) {
										a.exports = function(a, b, c, d, e, f) {
											if(f > b && f > d || b > f && d > f) return 0;
											if(d === b) return 0;
											var g = b > d ? 1 : -1,
												h = (f - b) / (d - b);
											1 !== h && 0 !== h || (g = b > d ? .5 : -.5);
											var i = h * (c - a) + a;
											return i > e ? g : 0
										}
									}, function(a, b, c) {
										"use strict";
										var d = c(1),
											e = c(39),
											f = function(a, b, c, d, f, g) {
												this.x = null == a ? 0 : a, this.y = null == b ? 0 : b, this.x2 = null == c ? 1 : c, this.y2 = null == d ? 0 : d, this.type = "linear", this.global = g || !1, e.call(this, f)
											};
										f.prototype = {
											constructor: f
										}, d.inherits(f, e), a.exports = f
									}, function(a, b, c) {
										"use strict";

										function d(a) {
											e.each(f, function(b) {
												this[b] = e.bind(a[b], a)
											}, this)
										}
										var e = c(1),
											f = ["getDom", "getZr", "getWidth", "getHeight", "getDevicePixelRatio", "dispatchAction", "isDisposed", "on", "off", "getDataURL", "getConnectedDataURL", "getModel", "getOption", "getViewOfComponentModel", "getViewOfSeriesModel"];
										a.exports = d
									}, function(a, b, c) {
										var d = c(1);
										c(59), c(107), c(108);
										var e = c(86),
											f = c(2);
										f.registerLayout(d.curry(e, "bar")), f.registerVisual(function(a) {
											a.eachSeriesByType("bar", function(a) {
												var b = a.getData();
												b.setVisual("legendSymbol", "roundRect")
											})
										}), c(32)
									}, function(a, b, c) {
										a.exports = c(94).extend({
											type: "series.bar",
											dependencies: ["grid", "polar"],
											brushSelector: "rect"
										})
									}, function(a, b, c) {
										"use strict";

										function d(a, b, c) {
											c.style.text = null, i.updateProps(c, {
												shape: {
													width: 0
												}
											}, b, a, function() {
												c.parent && c.parent.remove(c)
											})
										}

										function e(a, b, c) {
											c.style.text = null, i.updateProps(c, {
												shape: {
													r: c.shape.r0
												}
											}, b, a, function() {
												c.parent && c.parent.remove(c)
											})
										}

										function f(a, b, c, d, e, f, g, k) {
											var l = b.getItemVisual(c, "color"),
												m = b.getItemVisual(c, "opacity"),
												n = d.getModel("itemStyle.normal"),
												o = d.getModel("itemStyle.emphasis").getBarItemStyle();
											k || a.setShape("r", n.get("barBorderRadius") || 0), a.useStyle(h.defaults({
												fill: l,
												opacity: m
											}, n.getBarItemStyle()));
											var p = d.getShallow("cursor");
											p && a.attr("cursor", p);
											var q = g ? e.height > 0 ? "bottom" : "top" : e.width > 0 ? "left" : "right";
											k || j.setLabel(a.style, o, d, l, f, c, q), i.setHoverStyle(a, o)
										}

										function g(a, b) {
											var c = a.get(k) || 0;
											return Math.min(c, Math.abs(b.width), Math.abs(b.height))
										}
										var h = c(1),
											i = c(3),
											j = c(95),
											k = ["itemStyle", "normal", "barBorderWidth"];
										h.extend(c(11).prototype, c(109));
										var l = c(2).extendChartView({
												type: "bar",
												render: function(a, b, c) {
													var d = a.get("coordinateSystem");
													return "cartesian2d" !== d && "polar" !== d || this._render(a, b, c), this.group
												},
												dispose: h.noop,
												_render: function(a, b, c) {
													var g, h = this.group,
														j = a.getData(),
														k = this._data,
														l = a.coordinateSystem,
														o = l.getBaseAxis();
													"cartesian2d" === l.type ? g = o.isHorizontal() : "polar" === l.type && (g = "angle" === o.dim);
													var p = a.isAnimationEnabled() ? a : null;
													j.diff(k).add(function(b) {
														if(j.hasValue(b)) {
															var c = j.getItemModel(b),
																d = n[l.type](j, b, c),
																e = m[l.type](j, b, c, d, g, p);
															j.setItemGraphicEl(b, e), h.add(e), f(e, j, b, c, d, a, g, "polar" === l.type)
														}
													}).update(function(b, c) {
														var d = k.getItemGraphicEl(c);
														if(!j.hasValue(b)) return void h.remove(d);
														var e = j.getItemModel(b),
															o = n[l.type](j, b, e);
														d ? i.updateProps(d, {
															shape: o
														}, p, b) : d = m[l.type](j, b, e, o, g, p, !0), j.setItemGraphicEl(b, d), h.add(d), f(d, j, b, e, o, a, g, "polar" === l.type)
													}).remove(function(a) {
														var b = k.getItemGraphicEl(a);
														"cartesian2d" === l.type ? b && d(a, p, b) : b && e(a, p, b)
													}).execute(), this._data = j
												},
												remove: function(a, b) {
													var c = this.group,
														f = this._data;
													a.get("animation") ? f && f.eachItemGraphicEl(function(b) {
														"sector" === b.type ? e(b.dataIndex, a, b) : d(b.dataIndex, a, b)
													}) : c.removeAll()
												}
											}),
											m = {
												cartesian2d: function(a, b, c, d, e, f, g) {
													var j = new i.Rect({
														shape: h.extend({}, d)
													});
													if(f) {
														var k = j.shape,
															l = e ? "height" : "width",
															m = {};
														k[l] = 0, m[l] = d[l], i[g ? "updateProps" : "initProps"](j, {
															shape: m
														}, f, b)
													}
													return j
												},
												polar: function(a, b, c, d, e, f, g) {
													var j = new i.Sector({
														shape: h.extend({}, d)
													});
													if(f) {
														var k = j.shape,
															l = e ? "r" : "endAngle",
															m = {};
														k[l] = e ? 0 : d.startAngle, m[l] = d[l], i[g ? "updateProps" : "initProps"](j, {
															shape: m
														}, f, b)
													}
													return j
												}
											},
											n = {
												cartesian2d: function(a, b, c) {
													var d = a.getItemLayout(b),
														e = g(c, d),
														f = d.width > 0 ? 1 : -1,
														h = d.height > 0 ? 1 : -1;
													return {
														x: d.x + f * e / 2,
														y: d.y + h * e / 2,
														width: d.width - f * e,
														height: d.height - h * e
													}
												},
												polar: function(a, b, c) {
													var d = a.getItemLayout(b);
													return {
														cx: d.cx,
														cy: d.cy,
														r0: d.r0,
														r: d.r,
														startAngle: d.startAngle,
														endAngle: d.endAngle
													}
												}
											};
										a.exports = l
									}, function(a, b, c) {
										var d = c(31)([
											["fill", "color"],
											["stroke", "borderColor"],
											["lineWidth", "borderWidth"],
											["stroke", "barBorderColor"],
											["lineWidth", "barBorderWidth"],
											["opacity"],
											["shadowBlur"],
											["shadowOffsetX"],
											["shadowOffsetY"],
											["shadowColor"]
										]);
										a.exports = {
											getBarItemStyle: function(a) {
												var b = d.call(this, a);
												if(this.getBorderLineDash) {
													var c = this.getBorderLineDash();
													c && (b.lineDash = c)
												}
												return b
											}
										}
									}, , , function(a, b, c) {
										var d = c(1),
											e = c(2),
											f = e.PRIORITY;
										c(113), c(114), e.registerVisual(d.curry(c(51), "line", "circle", "line")), e.registerLayout(d.curry(c(63), "line")), e.registerProcessor(f.PROCESSOR.STATISTIC, d.curry(c(153), "line")), c(32)
									}, function(a, b, c) {
										"use strict";
										var d = c(28),
											e = c(17);
										a.exports = e.extend({
											type: "series.line",
											dependencies: ["grid", "polar"],
											getInitialData: function(a, b) {
												return d(a.data, this, b)
											},
											defaultOption: {
												zlevel: 0,
												z: 2,
												coordinateSystem: "cartesian2d",
												legendHoverLink: !0,
												hoverAnimation: !0,
												clipOverflow: !0,
												label: {
													normal: {
														position: "top"
													}
												},
												lineStyle: {
													normal: {
														width: 2,
														type: "solid"
													}
												},
												step: !1,
												smooth: !1,
												smoothMonotone: null,
												symbol: "emptyCircle",
												symbolSize: 4,
												symbolRotate: null,
												showSymbol: !0,
												showAllSymbol: !1,
												connectNulls: !1,
												sampling: "none",
												animationEasing: "linear",
												progressive: 0,
												hoverLayerThreshold: 1 / 0
											}
										})
									}, function(a, b, c) {
										"use strict";

										function d(a, b) {
											if(a.length === b.length) {
												for(var c = 0; c < a.length; c++) {
													var d = a[c],
														e = b[c];
													if(d[0] !== e[0] || d[1] !== e[1]) return
												}
												return !0
											}
										}

										function e(a) {
											return "number" == typeof a ? a : a ? .3 : 0
										}

										function f(a) {
											var b = a.getGlobalExtent();
											if(a.onBand) {
												var c = a.getBandWidth() / 2 - 1,
													d = b[1] > b[0] ? 1 : -1;
												b[0] += d * c, b[1] -= d * c
											}
											return b
										}

										function g(a) {
											return a >= 0 ? 1 : -1
										}

										function h(a, b) {
											var c = a.getBaseAxis(),
												d = a.getOtherAxis(c),
												e = c.onZero ? 0 : d.scale.getExtent()[0],
												f = d.dim,
												h = "x" === f || "radius" === f ? 1 : 0;
											return b.mapArray([f], function(d, i) {
												for(var j, k = b.stackedOn; k && g(k.get(f, i)) === g(d);) {
													j = k;
													break
												}
												var l = [];
												return l[h] = b.get(c.dim, i), l[1 - h] = j ? j.get(f, i, !0) : e, a.dataToPoint(l)
											}, !0)
										}

										function i(a, b, c) {
											var d = f(a.getAxis("x")),
												e = f(a.getAxis("y")),
												g = a.getBaseAxis().isHorizontal(),
												h = Math.min(d[0], d[1]),
												i = Math.min(e[0], e[1]),
												j = Math.max(d[0], d[1]) - h,
												k = Math.max(e[0], e[1]) - i,
												l = c.get("lineStyle.normal.width") || 2,
												m = c.get("clipOverflow") ? l / 2 : Math.max(j, k);
											g ? (i -= m, k += 2 * m) : (h -= m, j += 2 * m);
											var n = new r.Rect({
												shape: {
													x: h,
													y: i,
													width: j,
													height: k
												}
											});
											return b && (n.shape[g ? "width" : "height"] = 0, r.initProps(n, {
												shape: {
													width: j,
													height: k
												}
											}, c)), n
										}

										function j(a, b, c) {
											var d = a.getAngleAxis(),
												e = a.getRadiusAxis(),
												f = e.getExtent(),
												g = d.getExtent(),
												h = Math.PI / 180,
												i = new r.Sector({
													shape: {
														cx: a.cx,
														cy: a.cy,
														r0: f[0],
														r: f[1],
														startAngle: -g[0] * h,
														endAngle: -g[1] * h,
														clockwise: d.inverse
													}
												});
											return b && (i.shape.endAngle = -g[0] * h, r.initProps(i, {
												shape: {
													endAngle: -g[1] * h
												}
											}, c)), i
										}

										function k(a, b, c) {
											return "polar" === a.type ? j(a, b, c) : i(a, b, c)
										}

										function l(a, b, c) {
											for(var d = b.getBaseAxis(), e = "x" === d.dim || "radius" === d.dim ? 0 : 1, f = [], g = 0; g < a.length - 1; g++) {
												var h = a[g + 1],
													i = a[g];
												f.push(i);
												var j = [];
												switch(c) {
													case "end":
														j[e] = h[e], j[1 - e] = i[1 - e], f.push(j);
														break;
													case "middle":
														var k = (i[e] + h[e]) / 2,
															l = [];
														j[e] = l[e] = k, j[1 - e] = i[1 - e], l[1 - e] = h[1 - e], f.push(j), f.push(l);
														break;
													default:
														j[e] = i[e], j[1 - e] = h[1 - e], f.push(j)
												}
											}
											return a[g] && f.push(a[g]), f
										}

										function m(a, b) {
											var c = a.getVisual("visualMeta");
											if(c && c.length && a.count()) {
												for(var d, e = c.length - 1; e >= 0; e--)
													if(c[e].dimension < 2) {
														d = c[e];
														break
													}
												if(d && "cartesian2d" === b.type) {
													var f = d.dimension,
														g = a.dimensions[f],
														h = b.getAxis(g),
														i = n.map(d.stops, function(a) {
															return {
																coord: h.toGlobalCoord(h.dataToCoord(a.value)),
																color: a.color
															}
														}),
														j = i.length,
														k = d.outerColors.slice();
													j && i[0].coord > i[j - 1].coord && (i.reverse(), k.reverse());
													var l = 10,
														m = i[0].coord - l,
														o = i[j - 1].coord + l,
														p = o - m;
													if(.001 > p) return "transparent";
													n.each(i, function(a) {
														a.offset = (a.coord - m) / p
													}), i.push({
														offset: j ? i[j - 1].offset : .5,
														color: k[1] || "transparent"
													}), i.unshift({
														offset: j ? i[0].offset : .5,
														color: k[0] || "transparent"
													});
													var q = new r.LinearGradient(0, 0, 0, 0, i, !0);
													return q[g] = m, q[g + "2"] = o, q
												}
											}
										}
										var n = c(1),
											o = c(46),
											p = c(56),
											q = c(115),
											r = c(3),
											s = c(5),
											t = c(97),
											u = c(30);
										a.exports = u.extend({
											type: "line",
											init: function() {
												var a = new r.Group,
													b = new o;
												this.group.add(b.group), this._symbolDraw = b, this._lineGroup = a
											},
											render: function(a, b, c) {
												var f = a.coordinateSystem,
													g = this.group,
													i = a.getData(),
													j = a.getModel("lineStyle.normal"),
													o = a.getModel("areaStyle.normal"),
													p = i.mapArray(i.getItemLayout, !0),
													q = "polar" === f.type,
													r = this._coordSys,
													s = this._symbolDraw,
													t = this._polyline,
													u = this._polygon,
													v = this._lineGroup,
													w = a.get("animation"),
													x = !o.isEmpty(),
													y = h(f, i),
													z = a.get("showSymbol"),
													A = z && !q && !a.get("showAllSymbol") && this._getSymbolIgnoreFunc(i, f),
													B = this._data;
												B && B.eachItemGraphicEl(function(a, b) {
													a.__temp && (g.remove(a), B.setItemGraphicEl(b, null))
												}), z || s.remove(), g.add(v);
												var C = !q && a.get("step");
												t && r.type === f.type && C === this._step ? (x && !u ? u = this._newPolygon(p, y, f, w) : u && !x && (v.remove(u), u = this._polygon = null), v.setClipPath(k(f, !1, a)), z && s.updateData(i, A), i.eachItemGraphicEl(function(a) {
													a.stopAnimation(!0)
												}), d(this._stackedOnPoints, y) && d(this._points, p) || (w ? this._updateAnimation(i, y, f, c, C) : (C && (p = l(p, f, C), y = l(y, f, C)), t.setShape({
													points: p
												}), u && u.setShape({
													points: p,
													stackedOnPoints: y
												})))) : (z && s.updateData(i, A), C && (p = l(p, f, C), y = l(y, f, C)), t = this._newPolyline(p, f, w), x && (u = this._newPolygon(p, y, f, w)), v.setClipPath(k(f, !0, a)));
												var D = m(i, f) || i.getVisual("color");
												t.useStyle(n.defaults(j.getLineStyle(), {
													fill: "none",
													stroke: D,
													lineJoin: "bevel"
												}));
												var E = a.get("smooth");
												if(E = e(a.get("smooth")), t.setShape({
														smooth: E,
														smoothMonotone: a.get("smoothMonotone"),
														connectNulls: a.get("connectNulls")
													}), u) {
													var F = i.stackedOn,
														G = 0;
													if(u.useStyle(n.defaults(o.getAreaStyle(), {
															fill: D,
															opacity: .7,
															lineJoin: "bevel"
														})), F) {
														var H = F.hostModel;
														G = e(H.get("smooth"))
													}
													u.setShape({
														smooth: E,
														stackedOnSmooth: G,
														smoothMonotone: a.get("smoothMonotone"),
														connectNulls: a.get("connectNulls")
													})
												}
												this._data = i, this._coordSys = f, this._stackedOnPoints = y, this._points = p, this._step = C
											},
											dispose: function() {},
											highlight: function(a, b, c, d) {
												var e = a.getData(),
													f = s.queryDataIndex(e, d);
												if(!(f instanceof Array) && null != f && f >= 0) {
													var g = e.getItemGraphicEl(f);
													if(!g) {
														var h = e.getItemLayout(f);
														if(!h) return;
														g = new p(e, f), g.position = h, g.setZ(a.get("zlevel"), a.get("z")), g.ignore = isNaN(h[0]) || isNaN(h[1]), g.__temp = !0, e.setItemGraphicEl(f, g), g.stopSymbolAnimation(!0), this.group.add(g)
													}
													g.highlight()
												} else u.prototype.highlight.call(this, a, b, c, d)
											},
											downplay: function(a, b, c, d) {
												var e = a.getData(),
													f = s.queryDataIndex(e, d);
												if(null != f && f >= 0) {
													var g = e.getItemGraphicEl(f);
													g && (g.__temp ? (e.setItemGraphicEl(f, null), this.group.remove(g)) : g.downplay())
												} else u.prototype.downplay.call(this, a, b, c, d)
											},
											_newPolyline: function(a) {
												var b = this._polyline;
												return b && this._lineGroup.remove(b), b = new t.Polyline({
													shape: {
														points: a
													},
													silent: !0,
													z2: 10
												}), this._lineGroup.add(b), this._polyline = b, b
											},
											_newPolygon: function(a, b) {
												var c = this._polygon;
												return c && this._lineGroup.remove(c), c = new t.Polygon({
													shape: {
														points: a,
														stackedOnPoints: b
													},
													silent: !0
												}), this._lineGroup.add(c), this._polygon = c, c
											},
											_getSymbolIgnoreFunc: function(a, b) {
												var c = b.getAxesByScale("ordinal")[0];
												return c && c.isLabelIgnored ? n.bind(c.isLabelIgnored, c) : void 0
											},
											_updateAnimation: function(a, b, c, d, e) {
												var f = this._polyline,
													g = this._polygon,
													h = a.hostModel,
													i = q(this._data, a, this._stackedOnPoints, b, this._coordSys, c),
													j = i.current,
													k = i.stackedOnCurrent,
													m = i.next,
													n = i.stackedOnNext;
												e && (j = l(i.current, c, e), k = l(i.stackedOnCurrent, c, e), m = l(i.next, c, e), n = l(i.stackedOnNext, c, e)), f.shape.__points = i.current, f.shape.points = j, r.updateProps(f, {
													shape: {
														points: m
													}
												}, h), g && (g.setShape({
													points: j,
													stackedOnPoints: k
												}), r.updateProps(g, {
													shape: {
														points: m,
														stackedOnPoints: n
													}
												}, h));
												for(var o = [], p = i.status, s = 0; s < p.length; s++) {
													var t = p[s].cmd;
													if("=" === t) {
														var u = a.getItemGraphicEl(p[s].idx1);
														u && o.push({
															el: u,
															ptIdx: s
														})
													}
												}
												f.animators && f.animators.length && f.animators[0].during(function() {
													for(var a = 0; a < o.length; a++) {
														var b = o[a].el;
														b.attr("position", f.shape.__points[o[a].ptIdx])
													}
												})
											},
											remove: function(a) {
												var b = this.group,
													c = this._data;
												this._lineGroup.removeAll(), this._symbolDraw.remove(!0), c && c.eachItemGraphicEl(function(a, d) {
													a.__temp && (b.remove(a), c.setItemGraphicEl(d, null))
												}), this._polyline = this._polygon = this._coordSys = this._points = this._stackedOnPoints = this._data = null
											}
										})
									}, function(a, b) {
										function c(a) {
											return a >= 0 ? 1 : -1
										}

										function d(a, b, d) {
											for(var e, f = a.getBaseAxis(), g = a.getOtherAxis(f), h = f.onZero ? 0 : g.scale.getExtent()[0], i = g.dim, j = "x" === i || "radius" === i ? 1 : 0, k = b.stackedOn, l = b.get(i, d); k && c(k.get(i, d)) === c(l);) {
												e = k;
												break
											}
											var m = [];
											return m[j] = b.get(f.dim, d), m[1 - j] = e ? e.get(i, d, !0) : h, a.dataToPoint(m)
										}

										function e(a, b) {
											var c = [];
											return b.diff(a).add(function(a) {
												c.push({
													cmd: "+",
													idx: a
												})
											}).update(function(a, b) {
												c.push({
													cmd: "=",
													idx: b,
													idx1: a
												})
											}).remove(function(a) {
												c.push({
													cmd: "-",
													idx: a
												})
											}).execute(), c
										}
										a.exports = function(a, b, c, f, g, h) {
											for(var i = e(a, b), j = [], k = [], l = [], m = [], n = [], o = [], p = [], q = h.dimensions, r = 0; r < i.length; r++) {
												var s = i[r],
													t = !0;
												switch(s.cmd) {
													case "=":
														var u = a.getItemLayout(s.idx),
															v = b.getItemLayout(s.idx1);
														(isNaN(u[0]) || isNaN(u[1])) && (u = v.slice()), j.push(u), k.push(v), l.push(c[s.idx]), m.push(f[s.idx1]), p.push(b.getRawIndex(s.idx1));
														break;
													case "+":
														var w = s.idx;
														j.push(g.dataToPoint([b.get(q[0], w, !0), b.get(q[1], w, !0)])),
															k.push(b.getItemLayout(w).slice()), l.push(d(g, b, w)), m.push(f[w]), p.push(b.getRawIndex(w));
														break;
													case "-":
														var w = s.idx,
															x = a.getRawIndex(w);
														x !== w ? (j.push(a.getItemLayout(w)), k.push(h.dataToPoint([a.get(q[0], w, !0), a.get(q[1], w, !0)])), l.push(c[w]), m.push(d(h, a, w)), p.push(x)) : t = !1
												}
												t && (n.push(s), o.push(o.length))
											}
											o.sort(function(a, b) {
												return p[a] - p[b]
											});
											for(var y = [], z = [], A = [], B = [], C = [], r = 0; r < o.length; r++) {
												var w = o[r];
												y[r] = j[w], z[r] = k[w], A[r] = l[w], B[r] = m[w], C[r] = n[w]
											}
											return {
												current: y,
												next: z,
												stackedOnCurrent: A,
												stackedOnNext: B,
												status: C
											}
										}
									}, function(a, b, c) {
										var d = c(1),
											e = c(2);
										c(117), c(118), c(93)("pie", [{
											type: "pieToggleSelect",
											event: "pieselectchanged",
											method: "toggleSelected"
										}, {
											type: "pieSelect",
											event: "pieselected",
											method: "select"
										}, {
											type: "pieUnSelect",
											event: "pieunselected",
											method: "unSelect"
										}]), e.registerVisual(d.curry(c(88), "pie")), e.registerLayout(d.curry(c(120), "pie")), e.registerProcessor(d.curry(c(65), "pie"))
									}, function(a, b, c) {
										"use strict";
										var d = c(14),
											e = c(1),
											f = c(5),
											g = c(4),
											h = c(25),
											i = c(82),
											j = c(2).extendSeriesModel({
												type: "series.pie",
												init: function(a) {
													j.superApply(this, "init", arguments), this.legendDataProvider = function() {
														return this.getRawData()
													}, this.updateSelectedMap(a.data), this._defaultLabelLine(a)
												},
												mergeOption: function(a) {
													j.superCall(this, "mergeOption", a), this.updateSelectedMap(this.option.data)
												},
												getInitialData: function(a, b) {
													var c = h(["value"], a.data),
														e = new d(c, this);
													return e.initData(a.data), e
												},
												getDataParams: function(a) {
													var b = this.getData(),
														c = j.superCall(this, "getDataParams", a),
														d = [];
													return b.each("value", function(a) {
														d.push(a)
													}), c.percent = g.getPercentWithPrecision(d, a, b.hostModel.get("percentPrecision")), c.$vars.push("percent"), c
												},
												_defaultLabelLine: function(a) {
													f.defaultEmphasis(a.labelLine, ["show"]);
													var b = a.labelLine.normal,
														c = a.labelLine.emphasis;
													b.show = b.show && a.label.normal.show, c.show = c.show && a.label.emphasis.show
												},
												defaultOption: {
													zlevel: 0,
													z: 2,
													legendHoverLink: !0,
													hoverAnimation: !0,
													center: ["50%", "50%"],
													radius: [0, "75%"],
													clockwise: !0,
													startAngle: 90,
													minAngle: 0,
													selectedOffset: 10,
													avoidLabelOverlap: !0,
													percentPrecision: 2,
													stillShowZeroSum: !0,
													label: {
														normal: {
															rotate: !1,
															show: !0,
															position: "outer"
														},
														emphasis: {}
													},
													labelLine: {
														normal: {
															show: !0,
															length: 15,
															length2: 15,
															smooth: !1,
															lineStyle: {
																width: 1,
																type: "solid"
															}
														}
													},
													itemStyle: {
														normal: {
															borderWidth: 1
														},
														emphasis: {}
													},
													animationType: "expansion",
													animationEasing: "cubicOut",
													data: []
												}
											});
										e.mixin(j, i), a.exports = j
									}, function(a, b, c) {
										function d(a, b, c, d) {
											var f = b.getData(),
												g = this.dataIndex,
												h = f.getName(g),
												i = b.get("selectedOffset");
											d.dispatchAction({
												type: "pieToggleSelect",
												from: a,
												name: h,
												seriesId: b.id
											}), f.each(function(a) {
												e(f.getItemGraphicEl(a), f.getItemLayout(a), b.isSelected(f.getName(a)), i, c)
											})
										}

										function e(a, b, c, d, e) {
											var f = (b.startAngle + b.endAngle) / 2,
												g = Math.cos(f),
												h = Math.sin(f),
												i = c ? d : 0,
												j = [g * i, h * i];
											e ? a.animate().when(200, {
												position: j
											}).start("bounceOut") : a.attr("position", j)
										}

										function f(a, b) {
											function c() {
												f.ignore = f.hoverIgnore, h.ignore = h.hoverIgnore
											}

											function d() {
												f.ignore = f.normalIgnore, h.ignore = h.normalIgnore
											}
											g.Group.call(this);
											var e = new g.Sector({
													z2: 2
												}),
												f = new g.Polyline,
												h = new g.Text;
											this.add(e), this.add(f), this.add(h), this.updateData(a, b, !0), this.on("emphasis", c).on("normal", d).on("mouseover", c).on("mouseout", d)
										}
										var g = c(3),
											h = c(1),
											i = f.prototype;
										i.updateData = function(a, b, c) {
											function d() {
												i.stopAnimation(!0), i.animateTo({
													shape: {
														r: l.r + 10
													}
												}, 300, "elasticOut")
											}

											function f() {
												i.stopAnimation(!0), i.animateTo({
													shape: {
														r: l.r
													}
												}, 300, "elasticOut")
											}
											var i = this.childAt(0),
												j = a.hostModel,
												k = a.getItemModel(b),
												l = a.getItemLayout(b),
												m = h.extend({}, l);
											if(m.label = null, c) {
												i.setShape(m);
												var n = j.getShallow("animationType");
												"scale" === n ? (i.shape.r = l.r0, g.initProps(i, {
													shape: {
														r: l.r
													}
												}, j, b)) : (i.shape.endAngle = l.startAngle, g.updateProps(i, {
													shape: {
														endAngle: l.endAngle
													}
												}, j, b))
											} else g.updateProps(i, {
												shape: m
											}, j, b);
											var o = k.getModel("itemStyle"),
												p = a.getItemVisual(b, "color");
											i.useStyle(h.defaults({
												lineJoin: "bevel",
												fill: p
											}, o.getModel("normal").getItemStyle())), i.hoverStyle = o.getModel("emphasis").getItemStyle();
											var q = k.getShallow("cursor");
											q && i.attr("cursor", q), e(this, a.getItemLayout(b), k.get("selected"), j.get("selectedOffset"), j.get("animation")), i.off("mouseover").off("mouseout").off("emphasis").off("normal"), k.get("hoverAnimation") && j.isAnimationEnabled() && i.on("mouseover", d).on("mouseout", f).on("emphasis", d).on("normal", f), this._updateLabel(a, b), g.setHoverStyle(this)
										}, i._updateLabel = function(a, b) {
											var c = this.childAt(1),
												d = this.childAt(2),
												e = a.hostModel,
												f = a.getItemModel(b),
												h = a.getItemLayout(b),
												i = h.label,
												j = a.getItemVisual(b, "color");
											g.updateProps(c, {
												shape: {
													points: i.linePoints || [
														[i.x, i.y],
														[i.x, i.y],
														[i.x, i.y]
													]
												}
											}, e, b), g.updateProps(d, {
												style: {
													x: i.x,
													y: i.y
												}
											}, e, b), d.attr({
												rotation: i.rotation,
												origin: [i.x, i.y],
												z2: 10
											});
											var k = f.getModel("label.normal"),
												l = f.getModel("label.emphasis"),
												m = f.getModel("labelLine.normal"),
												n = f.getModel("labelLine.emphasis"),
												j = a.getItemVisual(b, "color");
											g.setLabelStyle(d.style, d.hoverStyle = {}, k, l, {
												labelFetcher: a.hostModel,
												labelDataIndex: b,
												defaultText: a.getName(b),
												autoColor: j,
												useInsideStyle: !!i.inside
											}, {
												textAlign: i.textAlign,
												textVerticalAlign: i.verticalAlign,
												opacity: a.getItemVisual(b, "opacity")
											}), d.ignore = d.normalIgnore = !k.get("show"), d.hoverIgnore = !l.get("show"), c.ignore = c.normalIgnore = !m.get("show"), c.hoverIgnore = !n.get("show"), c.setStyle({
												stroke: j,
												opacity: a.getItemVisual(b, "opacity")
											}), c.setStyle(m.getModel("lineStyle").getLineStyle()), c.hoverStyle = n.getModel("lineStyle").getLineStyle();
											var o = m.get("smooth");
											o && o === !0 && (o = .4), c.setShape({
												smooth: o
											})
										}, h.inherits(f, g.Group);
										var j = c(30).extend({
											type: "pie",
											init: function() {
												var a = new g.Group;
												this._sectorGroup = a
											},
											render: function(a, b, c, e) {
												if(!e || e.from !== this.uid) {
													var g = a.getData(),
														i = this._data,
														j = this.group,
														k = b.get("animation"),
														l = !i,
														m = a.get("animationType"),
														n = h.curry(d, this.uid, a, k, c),
														o = a.get("selectedMode");
													if(g.diff(i).add(function(a) {
															var b = new f(g, a);
															l && "scale" !== m && b.eachChild(function(a) {
																a.stopAnimation(!0)
															}), o && b.on("click", n), g.setItemGraphicEl(a, b), j.add(b)
														}).update(function(a, b) {
															var c = i.getItemGraphicEl(b);
															c.updateData(g, a), c.off("click"), o && c.on("click", n), j.add(c), g.setItemGraphicEl(a, c)
														}).remove(function(a) {
															var b = i.getItemGraphicEl(a);
															j.remove(b)
														}).execute(), k && l && g.count() > 0 && "scale" !== m) {
														var p = g.getItemLayout(0),
															q = Math.max(c.getWidth(), c.getHeight()) / 2,
															r = h.bind(j.removeClipPath, j);
														j.setClipPath(this._createClipPath(p.cx, p.cy, q, p.startAngle, p.clockwise, r, a))
													}
													this._data = g
												}
											},
											dispose: function() {},
											_createClipPath: function(a, b, c, d, e, f, h) {
												var i = new g.Sector({
													shape: {
														cx: a,
														cy: b,
														r0: 0,
														r: c,
														startAngle: d,
														endAngle: d,
														clockwise: e
													}
												});
												return g.initProps(i, {
													shape: {
														endAngle: d + (e ? 1 : -1) * Math.PI * 2
													}
												}, h, f), i
											},
											containPoint: function(a, b) {
												var c = b.getData(),
													d = c.getItemLayout(0);
												if(d) {
													var e = a[0] - d.cx,
														f = a[1] - d.cy,
														g = Math.sqrt(e * e + f * f);
													return g <= d.r && g >= d.r0
												}
											}
										});
										a.exports = j
									}, function(a, b, c) {
										"use strict";

										function d(a, b, c, d, e, f, g) {
											function h(b, c, d, e) {
												for(var f = b; c > f; f++)
													if(a[f].y += d, f > b && c > f + 1 && a[f + 1].y > a[f].y + a[f].height) return void i(f, d / 2);
												i(c - 1, d / 2)
											}

											function i(b, c) {
												for(var d = b; d >= 0 && (a[d].y -= c, !(d > 0 && a[d].y > a[d - 1].y + a[d - 1].height)); d--);
											}

											function j(a, b, c, d, e, f) {
												for(var g = f > 0 ? b ? Number.MAX_VALUE : 0 : b ? Number.MAX_VALUE : 0, h = 0, i = a.length; i > h; h++)
													if("center" !== a[h].position) {
														var j = Math.abs(a[h].y - d),
															k = a[h].len,
															l = a[h].len2,
															m = e + k > j ? Math.sqrt((e + k + l) * (e + k + l) - j * j) : Math.abs(a[h].x - c);
														b && m >= g && (m = g - 10), !b && g >= m && (m = g + 10), a[h].x = c + m * f, g = m
													}
											}
											a.sort(function(a, b) {
												return a.y - b.y
											});
											for(var k, l = 0, m = a.length, n = [], o = [], p = 0; m > p; p++) k = a[p].y - l, 0 > k && h(p, m, -k, e), l = a[p].y + a[p].height;
											0 > g - l && i(m - 1, l - g);
											for(var p = 0; m > p; p++) a[p].y >= c ? o.push(a[p]) : n.push(a[p]);
											j(n, !1, b, c, d, e), j(o, !0, b, c, d, e)
										}

										function e(a, b, c, e, f, g) {
											for(var h = [], i = [], j = 0; j < a.length; j++) a[j].x < b ? h.push(a[j]) : i.push(a[j]);
											d(i, b, c, e, 1, f, g), d(h, b, c, e, -1, f, g);
											for(var j = 0; j < a.length; j++) {
												var k = a[j].linePoints;
												if(k) {
													var l = k[1][0] - k[2][0];
													a[j].x < b ? k[2][0] = a[j].x + 3 : k[2][0] = a[j].x - 3, k[1][1] = k[2][1] = a[j].y, k[1][0] = k[2][0] + l
												}
											}
										}
										var f = c(16);
										a.exports = function(a, b, c, d) {
											var g, h, i = a.getData(),
												j = [],
												k = !1;
											i.each(function(c) {
												var d, e, l, m, n = i.getItemLayout(c),
													o = i.getItemModel(c),
													p = o.getModel("label.normal"),
													q = p.get("position") || o.get("label.emphasis.position"),
													r = o.getModel("labelLine.normal"),
													s = r.get("length"),
													t = r.get("length2"),
													u = (n.startAngle + n.endAngle) / 2,
													v = Math.cos(u),
													w = Math.sin(u);
												g = n.cx, h = n.cy;
												var x = "inside" === q || "inner" === q;
												if("center" === q) d = n.cx, e = n.cy, m = "center";
												else {
													var y = (x ? (n.r + n.r0) / 2 * v : n.r * v) + g,
														z = (x ? (n.r + n.r0) / 2 * w : n.r * w) + h;
													if(d = y + 3 * v, e = z + 3 * w, !x) {
														var A = y + v * (s + b - n.r),
															B = z + w * (s + b - n.r),
															C = A + (0 > v ? -1 : 1) * t,
															D = B;
														d = C + (0 > v ? -5 : 5), e = D, l = [
															[y, z],
															[A, B],
															[C, D]
														]
													}
													m = x ? "center" : v > 0 ? "left" : "right"
												}
												var E = p.getFont(),
													F = p.get("rotate") ? 0 > v ? -u + Math.PI : -u : 0,
													G = a.getFormattedLabel(c, "normal") || i.getName(c),
													H = f.getBoundingRect(G, E, m, "top");
												k = !!F, n.label = {
													x: d,
													y: e,
													position: q,
													height: H.height,
													len: s,
													len2: t,
													linePoints: l,
													textAlign: m,
													verticalAlign: "middle",
													rotation: F,
													inside: x
												}, x || j.push(n.label)
											}), !k && a.get("avoidLabelOverlap") && e(j, g, h, b, c, d)
										}
									}, function(a, b, c) {
										var d = c(4),
											e = d.parsePercent,
											f = c(119),
											g = c(1),
											h = 2 * Math.PI,
											i = Math.PI / 180;
										a.exports = function(a, b, c, j) {
											b.eachSeriesByType(a, function(a) {
												var b = a.get("center"),
													j = a.get("radius");
												g.isArray(j) || (j = [0, j]), g.isArray(b) || (b = [b, b]);
												var k = c.getWidth(),
													l = c.getHeight(),
													m = Math.min(k, l),
													n = e(b[0], k),
													o = e(b[1], l),
													p = e(j[0], m / 2),
													q = e(j[1], m / 2),
													r = a.getData(),
													s = -a.get("startAngle") * i,
													t = a.get("minAngle") * i,
													u = 0;
												r.each("value", function(a) {
													!isNaN(a) && u++
												});
												var v = r.getSum("value"),
													w = Math.PI / (v || u) * 2,
													x = a.get("clockwise"),
													y = a.get("roseType"),
													z = a.get("stillShowZeroSum"),
													A = r.getDataExtent("value");
												A[0] = 0;
												var B = h,
													C = 0,
													D = s,
													E = x ? 1 : -1;
												if(r.each("value", function(a, b) {
														var c;
														if(isNaN(a)) return void r.setItemLayout(b, {
															angle: NaN,
															startAngle: NaN,
															endAngle: NaN,
															clockwise: x,
															cx: n,
															cy: o,
															r0: p,
															r: y ? NaN : q
														});
														c = "area" !== y ? 0 === v && z ? w : a * w : h / u, t > c ? (c = t, B -= t) : C += a;
														var e = D + E * c;
														r.setItemLayout(b, {
															angle: c,
															startAngle: D,
															endAngle: e,
															clockwise: x,
															cx: n,
															cy: o,
															r0: p,
															r: y ? d.linearMap(a, A, [p, q]) : q
														}), D = e
													}, !0), h > B && u)
													if(.001 >= B) {
														var F = h / u;
														r.each("value", function(a, b) {
															if(!isNaN(a)) {
																var c = r.getItemLayout(b);
																c.angle = F, c.startAngle = s + E * b * F, c.endAngle = s + E * (b + 1) * F
															}
														})
													} else w = B / C, D = s, r.each("value", function(a, b) {
														if(!isNaN(a)) {
															var c = r.getItemLayout(b),
																d = c.angle === t ? t : a * w;
															c.startAngle = D, c.endAngle = D + E * d, D += E * d
														}
													});
												f(a, q, k, l)
											})
										}
									}, function(a, b, c) {
										"use strict";
										c(62), c(122)
									}, function(a, b, c) {
										var d = c(1),
											e = c(3),
											f = c(41),
											g = c(42),
											h = c(79),
											i = f.ifIgnoreOnTick,
											j = f.getInterval,
											k = ["axisLine", "axisLabel", "axisTick", "axisName"],
											l = ["splitArea", "splitLine"],
											m = g.extend({
												type: "cartesianAxis",
												axisPointerClass: "CartesianAxisPointer",
												render: function(a, b, c, g) {
													this.group.removeAll();
													var i = this._axisGroup;
													if(this._axisGroup = new e.Group, this.group.add(this._axisGroup), a.get("show")) {
														var j = a.getCoordSysModel(),
															n = h.layout(j, a),
															o = new f(a, n);
														d.each(k, o.add, o), this._axisGroup.add(o.getGroup()), d.each(l, function(b) {
															a.get(b + ".show") && this["_" + b](a, j, n.labelInterval)
														}, this), e.groupTransition(i, this._axisGroup, a), m.superCall(this, "render", a, b, c, g)
													}
												},
												_splitLine: function(a, b, c) {
													var f = a.axis;
													if(!f.scale.isBlank()) {
														var g = a.getModel("splitLine"),
															h = g.getModel("lineStyle"),
															k = h.get("color"),
															l = j(g, c);
														k = d.isArray(k) ? k : [k];
														for(var m = b.coordinateSystem.getRect(), n = f.isHorizontal(), o = 0, p = f.getTicksCoords(), q = f.scale.getTicks(), r = [], s = [], t = h.getLineStyle(), u = 0; u < p.length; u++)
															if(!i(f, u, l)) {
																var v = f.toGlobalCoord(p[u]);
																n ? (r[0] = v, r[1] = m.y, s[0] = v, s[1] = m.y + m.height) : (r[0] = m.x, r[1] = v, s[0] = m.x + m.width, s[1] = v);
																var w = o++ % k.length;
																this._axisGroup.add(new e.Line(e.subPixelOptimizeLine({
																	anid: "line_" + q[u],
																	shape: {
																		x1: r[0],
																		y1: r[1],
																		x2: s[0],
																		y2: s[1]
																	},
																	style: d.defaults({
																		stroke: k[w]
																	}, t),
																	silent: !0
																})))
															}
													}
												},
												_splitArea: function(a, b, c) {
													var f = a.axis;
													if(!f.scale.isBlank()) {
														var g = a.getModel("splitArea"),
															h = g.getModel("areaStyle"),
															k = h.get("color"),
															l = b.coordinateSystem.getRect(),
															m = f.getTicksCoords(),
															n = f.scale.getTicks(),
															o = f.toGlobalCoord(m[0]),
															p = f.toGlobalCoord(m[0]),
															q = 0,
															r = j(g, c),
															s = h.getAreaStyle();
														k = d.isArray(k) ? k : [k];
														for(var t = 1; t < m.length; t++)
															if(!i(f, t, r)) {
																var u, v, w, x, y = f.toGlobalCoord(m[t]);
																f.isHorizontal() ? (u = o, v = l.y, w = y - u, x = l.height) : (u = l.x, v = p, w = l.width, x = y - v);
																var z = q++ % k.length;
																this._axisGroup.add(new e.Rect({
																	anid: "area_" + n[t],
																	shape: {
																		x: u,
																		y: v,
																		width: w,
																		height: x
																	},
																	style: d.defaults({
																		fill: k[z]
																	}, s),
																	silent: !0
																})), o = u + w, p = v + x
															}
													}
												}
											});
										m.extend({
											type: "xAxis"
										}), m.extend({
											type: "yAxis"
										})
									}, , , , , , , , , , , , , , , function(a, b, c) {
										var d = c(1),
											e = c(33),
											f = function(a, b, c, d, f) {
												e.call(this, a, b, c), this.type = d || "value", this.position = f || "bottom"
											};
										f.prototype = {
											constructor: f,
											index: 0,
											onZero: !1,
											model: null,
											isHorizontal: function() {
												var a = this.position;
												return "top" === a || "bottom" === a
											},
											getGlobalExtent: function(a) {
												var b = this.getExtent();
												return b[0] = this.toGlobalCoord(b[0]), b[1] = this.toGlobalCoord(b[1]), a && b[0] > b[1] && b.reverse(), b
											},
											getOtherAxis: function() {
												this.grid.getOtherAxis()
											},
											isLabelIgnored: function(a) {
												if("category" === this.type) {
													var b = this.getLabelInterval();
													return "function" == typeof b && !b(a, this.scale.getLabel(a)) || a % (b + 1)
												}
											},
											pointToData: function(a, b) {
												return this.coordToData(this.toLocalCoord(a["x" === this.dim ? 0 : 1]), b)
											},
											toLocalCoord: null,
											toGlobalCoord: null
										}, d.inherits(f, e), a.exports = f
									}, function(a, b, c) {
										"use strict";

										function d(a) {
											return this._axes[a]
										}
										var e = c(1),
											f = function(a) {
												this._axes = {}, this._dimList = [], this.name = a || ""
											};
										f.prototype = {
											constructor: f,
											type: "cartesian",
											getAxis: function(a) {
												return this._axes[a]
											},
											getAxes: function() {
												return e.map(this._dimList, d, this)
											},
											getAxesByScale: function(a) {
												return a = a.toLowerCase(), e.filter(this.getAxes(), function(b) {
													return b.scale.type === a
												})
											},
											addAxis: function(a) {
												var b = a.dim;
												this._axes[b] = a, this._dimList.push(b)
											},
											dataToCoord: function(a) {
												return this._dataCoordConvert(a, "dataToCoord")
											},
											coordToData: function(a) {
												return this._dataCoordConvert(a, "coordToData")
											},
											_dataCoordConvert: function(a, b) {
												for(var c = this._dimList, d = a instanceof Array ? [] : {}, e = 0; e < c.length; e++) {
													var f = c[e],
														g = this._axes[f];
													d[f] = g[b](a[f])
												}
												return d
											}
										}, a.exports = f
									}, function(a, b, c) {
										"use strict";

										function d(a) {
											f.call(this, a)
										}
										var e = c(1),
											f = c(138);
										d.prototype = {
											constructor: d,
											type: "cartesian2d",
											dimensions: ["x", "y"],
											getBaseAxis: function() {
												return this.getAxesByScale("ordinal")[0] || this.getAxesByScale("time")[0] || this.getAxis("x")
											},
											containPoint: function(a) {
												var b = this.getAxis("x"),
													c = this.getAxis("y");
												return b.contain(b.toLocalCoord(a[0])) && c.contain(c.toLocalCoord(a[1]))
											},
											containData: function(a) {
												return this.getAxis("x").containData(a[0]) && this.getAxis("y").containData(a[1])
											},
											dataToPoint: function(a, b) {
												var c = this.getAxis("x"),
													d = this.getAxis("y");
												return [c.toGlobalCoord(c.dataToCoord(a[0], b)), d.toGlobalCoord(d.dataToCoord(a[1], b))]
											},
											pointToData: function(a, b) {
												var c = this.getAxis("x"),
													d = this.getAxis("y");
												return [c.coordToData(c.toLocalCoord(a[0]), b), d.coordToData(d.toLocalCoord(a[1]), b)]
											},
											getOtherAxis: function(a) {
												return this.getAxis("x" === a.dim ? "y" : "x")
											}
										}, e.inherits(d, f), a.exports = d
									}, function(a, b, c) {
										"use strict";
										c(62);
										var d = c(13);
										a.exports = d.extend({
											type: "grid",
											dependencies: ["xAxis", "yAxis"],
											layoutMode: "box",
											coordinateSystem: null,
											defaultOption: {
												show: !1,
												zlevel: 0,
												z: 0,
												left: "10%",
												top: 60,
												right: "10%",
												bottom: 60,
												containLabel: !1,
												backgroundColor: "rgba(0,0,0,0)",
												borderWidth: 1,
												borderColor: "#ccc"
											}
										})
									}, function(a, b, c) {
										var d = c(28),
											e = c(24),
											f = c(18),
											g = c(43),
											h = c(11),
											i = c(1);
										a.exports = {
											createList: function(a) {
												var b = a.get("data");
												return d(b, a, a.ecModel)
											},
											completeDimensions: c(25),
											createSymbol: e.createSymbol,
											createScale: function(a, b) {
												var c = b;
												b instanceof h || (c = new h(b), i.mixin(c, g));
												var d = f.createScaleByModel(c);
												return d.setExtent(a[0], a[1]), f.niceScaleExtent(d, c), d
											},
											mixinAxisModelCommonMethods: function(a) {
												i.mixin(a, g)
											}
										}
									}, function(a, b, c) {
										var d = c(3),
											e = c(1),
											f = Math.PI;
										a.exports = function(a, b) {
											b = b || {}, e.defaults(b, {
												text: "loading",
												color: "#c23531",
												textColor: "#000",
												maskColor: "rgba(255, 255, 255, 0.8)",
												zlevel: 0
											});
											var c = new d.Rect({
													style: {
														fill: b.maskColor
													},
													zlevel: b.zlevel,
													z: 1e4
												}),
												g = new d.Arc({
													shape: {
														startAngle: -f / 2,
														endAngle: -f / 2 + .1,
														r: 10
													},
													style: {
														stroke: b.color,
														lineCap: "round",
														lineWidth: 5
													},
													zlevel: b.zlevel,
													z: 10001
												}),
												h = new d.Rect({
													style: {
														fill: "none",
														text: b.text,
														textPosition: "right",
														textDistance: 10,
														textFill: b.textColor
													},
													zlevel: b.zlevel,
													z: 10001
												});
											g.animateShape(!0).when(1e3, {
												endAngle: 3 * f / 2
											}).start("circularInOut"), g.animateShape(!0).when(1e3, {
												startAngle: 3 * f / 2
											}).delay(300).start("circularInOut");
											var i = new d.Group;
											return i.add(g), i.add(h), i.add(c), i.resize = function() {
												var b = a.getWidth() / 2,
													d = a.getHeight() / 2;
												g.setShape({
													cx: b,
													cy: d
												});
												var e = g.shape.r;
												h.setShape({
													x: b - e,
													y: d - e,
													width: 2 * e,
													height: 2 * e
												}), c.setShape({
													x: 0,
													y: 0,
													width: a.getWidth(),
													height: a.getHeight()
												})
											}, i.resize(), i
										}
									}, function(a, b, c) {
										function d(a, b) {
											k.each(b, function(b, c) {
												t.hasClass(c) || ("object" == typeof b ? a[c] = a[c] ? k.merge(a[c], b, !1) : k.clone(b) : null == a[c] && (a[c] = b))
											})
										}

										function e(a) {
											a = a, this.option = {}, this.option[v] = 1, this._componentsMap = k.createHashMap({
												series: []
											}), this._seriesIndices = null, d(a, this._theme.option), k.merge(a, u, !1), this.mergeOption(a)
										}

										function f(a, b) {
											k.isArray(b) || (b = b ? [b] : []);
											var c = {};
											return n(b, function(b) {
												c[b] = (a.get(b) || []).slice()
											}), c
										}

										function g(a, b, c) {
											var d = b.type ? b.type : c ? c.subType : t.determineSubType(a, b);
											return d
										}

										function h(a) {
											return p(a, function(a) {
												return a.componentIndex
											}) || []
										}

										function i(a, b) {
											return b.hasOwnProperty("subType") ? o(a, function(a) {
												return a.subType === b.subType
											}) : a
										}

										function j(a) {}
										var k = c(1),
											l = c(5),
											m = c(11),
											n = k.each,
											o = k.filter,
											p = k.map,
											q = k.isArray,
											r = k.indexOf,
											s = k.isObject,
											t = c(13),
											u = c(145),
											v = "\x00_ec_inner",
											w = m.extend({
												constructor: w,
												init: function(a, b, c, d) {
													c = c || {}, this.option = null, this._theme = new m(c), this._optionManager = d
												},
												setOption: function(a, b) {
													k.assert(!(v in a), "please use chart.getOption()"), this._optionManager.setOption(a, b), this.resetOption(null)
												},
												resetOption: function(a) {
													var b = !1,
														c = this._optionManager;
													if(!a || "recreate" === a) {
														var d = c.mountOption("recreate" === a);
														this.option && "recreate" !== a ? (this.restoreData(), this.mergeOption(d)) : e.call(this, d), b = !0
													}
													if("timeline" !== a && "media" !== a || this.restoreData(), !a || "recreate" === a || "timeline" === a) {
														var f = c.getTimelineOption(this);
														f && (this.mergeOption(f), b = !0)
													}
													if(!a || "recreate" === a || "media" === a) {
														var g = c.getMediaOption(this, this._api);
														g.length && n(g, function(a) {
															this.mergeOption(a, b = !0)
														}, this)
													}
													return b
												},
												mergeOption: function(a) {
													function b(b, e) {
														var i = l.normalizeToArray(a[b]),
															j = l.mappingToExists(d.get(b), i);
														l.makeIdAndName(j), n(j, function(a, c) {
															var d = a.option;
															s(d) && (a.keyInfo.mainType = b, a.keyInfo.subType = g(b, d, a.exist))
														});
														var m = f(d, e);
														c[b] = [], d.set(b, []), n(j, function(a, e) {
															var f = a.exist,
																g = a.option;
															if(k.assert(s(g) || f, "Empty component definition"), g) {
																var h = t.getClass(b, a.keyInfo.subType, !0);
																if(f && f instanceof h) f.name = a.keyInfo.name, f.mergeOption(g, this), f.optionUpdated(g, !1);
																else {
																	var i = k.extend({
																		dependentModels: m,
																		componentIndex: e
																	}, a.keyInfo);
																	f = new h(g, this, this, i), k.extend(f, i), f.init(g, this, this, i), f.optionUpdated(null, !0)
																}
															} else f.mergeOption({}, this), f.optionUpdated({}, !1);
															d.get(b)[e] = f, c[b][e] = f.option
														}, this), "series" === b && (this._seriesIndices = h(d.get("series")))
													}
													var c = this.option,
														d = this._componentsMap,
														e = [];
													n(a, function(a, b) {
														null != a && (t.hasClass(b) ? e.push(b) : c[b] = null == c[b] ? k.clone(a) : k.merge(c[b], a, !0))
													}), t.topologicalTravel(e, t.getAllClassMainTypes(), b, this), this._seriesIndices = this._seriesIndices || []
												},
												getOption: function() {
													var a = k.clone(this.option);
													return n(a, function(b, c) {
														if(t.hasClass(c)) {
															for(var b = l.normalizeToArray(b), d = b.length - 1; d >= 0; d--) l.isIdInner(b[d]) && b.splice(d, 1);
															a[c] = b
														}
													}), delete a[v], a
												},
												getTheme: function() {
													return this._theme
												},
												getComponent: function(a, b) {
													var c = this._componentsMap.get(a);
													return c ? c[b || 0] : void 0
												},
												queryComponents: function(a) {
													var b = a.mainType;
													if(!b) return [];
													var c = a.index,
														d = a.id,
														e = a.name,
														f = this._componentsMap.get(b);
													if(!f || !f.length) return [];
													var g;
													if(null != c) q(c) || (c = [c]), g = o(p(c, function(a) {
														return f[a]
													}), function(a) {
														return !!a
													});
													else if(null != d) {
														var h = q(d);
														g = o(f, function(a) {
															return h && r(d, a.id) >= 0 || !h && a.id === d
														})
													} else if(null != e) {
														var j = q(e);
														g = o(f, function(a) {
															return j && r(e, a.name) >= 0 || !j && a.name === e
														})
													} else g = f.slice();
													return i(g, a)
												},
												findComponents: function(a) {
													function b(a) {
														var b = e + "Index",
															c = e + "Id",
															d = e + "Name";
														return !a || null == a[b] && null == a[c] && null == a[d] ? null : {
															mainType: e,
															index: a[b],
															id: a[c],
															name: a[d]
														}
													}

													function c(b) {
														return a.filter ? o(b, a.filter) : b
													}
													var d = a.query,
														e = a.mainType,
														f = b(d),
														g = f ? this.queryComponents(f) : this._componentsMap.get(e);
													return c(i(g, a))
												},
												eachComponent: function(a, b, c) {
													var d = this._componentsMap;
													if("function" == typeof a) c = b, b = a, d.each(function(a, d) {
														n(a, function(a, e) {
															b.call(c, d, a, e)
														})
													});
													else if(k.isString(a)) n(d.get(a), b, c);
													else if(s(a)) {
														var e = this.findComponents(a);
														n(e, b, c)
													}
												},
												getSeriesByName: function(a) {
													var b = this._componentsMap.get("series");
													return o(b, function(b) {
														return b.name === a
													})
												},
												getSeriesByIndex: function(a) {
													return this._componentsMap.get("series")[a]
												},
												getSeriesByType: function(a) {
													var b = this._componentsMap.get("series");
													return o(b, function(b) {
														return b.subType === a
													})
												},
												getSeries: function() {
													return this._componentsMap.get("series").slice()
												},
												eachSeries: function(a, b) {
													j(this), n(this._seriesIndices, function(c) {
														var d = this._componentsMap.get("series")[c];
														a.call(b, d, c)
													}, this)
												},
												eachRawSeries: function(a, b) {
													n(this._componentsMap.get("series"), a, b)
												},
												eachSeriesByType: function(a, b, c) {
													j(this), n(this._seriesIndices, function(d) {
														var e = this._componentsMap.get("series")[d];
														e.subType === a && b.call(c, e, d)
													}, this)
												},
												eachRawSeriesByType: function(a, b, c) {
													return n(this.getSeriesByType(a), b, c)
												},
												isSeriesFiltered: function(a) {
													return j(this), k.indexOf(this._seriesIndices, a.componentIndex) < 0
												},
												getCurrentSeriesIndices: function() {
													return(this._seriesIndices || []).slice()
												},
												filterSeries: function(a, b) {
													j(this);
													var c = o(this._componentsMap.get("series"), a, b);
													this._seriesIndices = h(c)
												},
												restoreData: function() {
													var a = this._componentsMap;
													this._seriesIndices = h(a.get("series"));
													var b = [];
													a.each(function(a, c) {
														b.push(c)
													}), t.topologicalTravel(b, t.getAllClassMainTypes(), function(b, c) {
														n(a.get(b), function(a) {
															a.restoreData()
														})
													})
												}
											});
										k.mixin(w, c(64)), a.exports = w
									}, function(a, b, c) {
										function d(a) {
											this._api = a, this._timelineOptions = [], this._mediaList = [], this._mediaDefault, this._currentMediaIndices = [], this._optionBackup, this._newBaseOption
										}

										function e(a, b, c) {
											var d, e, f = [],
												g = [],
												h = a.timeline;
											if(a.baseOption && (e = a.baseOption), (h || a.options) && (e = e || {}, f = (a.options || []).slice()), a.media) {
												e = e || {};
												var i = a.media;
												m(i, function(a) {
													a && a.option && (a.query ? g.push(a) : d || (d = a))
												})
											}
											return e || (e = a), e.timeline || (e.timeline = h), m([e].concat(f).concat(j.map(g, function(a) {
												return a.option
											})), function(a) {
												m(b, function(b) {
													b(a, c)
												})
											}), {
												baseOption: e,
												timelineOptions: f,
												mediaDefault: d,
												mediaList: g
											}
										}

										function f(a, b, c) {
											var d = {
													width: b,
													height: c,
													aspectratio: b / c
												},
												e = !0;
											return j.each(a, function(a, b) {
												var c = b.match(q);
												if(c && c[1] && c[2]) {
													var f = c[1],
														h = c[2].toLowerCase();
													g(d[h], a, f) || (e = !1)
												}
											}), e
										}

										function g(a, b, c) {
											return "min" === c ? a >= b : "max" === c ? b >= a : a === b
										}

										function h(a, b) {
											return a.join(",") === b.join(",")
										}

										function i(a, b) {
											b = b || {}, m(b, function(b, c) {
												if(null != b) {
													var d = a[c];
													if(l.hasClass(c)) {
														b = k.normalizeToArray(b), d = k.normalizeToArray(d);
														var e = k.mappingToExists(d, b);
														a[c] = o(e, function(a) {
															return a.option && a.exist ? p(a.exist, a.option, !0) : a.exist || a.option
														})
													} else a[c] = p(d, b, !0)
												}
											})
										}
										var j = c(1),
											k = c(5),
											l = c(13),
											m = j.each,
											n = j.clone,
											o = j.map,
											p = j.merge,
											q = /^(min|max)?(.+)$/;
										d.prototype = {
											constructor: d,
											setOption: function(a, b) {
												a = n(a, !0);
												var c = this._optionBackup,
													d = e.call(this, a, b, !c);
												this._newBaseOption = d.baseOption, c ? (i(c.baseOption, d.baseOption), d.timelineOptions.length && (c.timelineOptions = d.timelineOptions), d.mediaList.length && (c.mediaList = d.mediaList), d.mediaDefault && (c.mediaDefault = d.mediaDefault)) : this._optionBackup = d
											},
											mountOption: function(a) {
												var b = this._optionBackup;
												return this._timelineOptions = o(b.timelineOptions, n), this._mediaList = o(b.mediaList, n), this._mediaDefault = n(b.mediaDefault), this._currentMediaIndices = [], n(a ? b.baseOption : this._newBaseOption)
											},
											getTimelineOption: function(a) {
												var b, c = this._timelineOptions;
												if(c.length) {
													var d = a.getComponent("timeline");
													d && (b = n(c[d.getCurrentIndex()], !0))
												}
												return b
											},
											getMediaOption: function(a) {
												var b = this._api.getWidth(),
													c = this._api.getHeight(),
													d = this._mediaList,
													e = this._mediaDefault,
													g = [],
													i = [];
												if(!d.length && !e) return i;
												for(var j = 0, k = d.length; k > j; j++) f(d[j].query, b, c) && g.push(j);
												return !g.length && e && (g = [-1]), g.length && !h(g, this._currentMediaIndices) && (i = o(g, function(a) {
													return n(-1 === a ? e.option : d[a].option)
												})), this._currentMediaIndices = g, i
											}
										}, a.exports = d
									}, function(a, b) {
										var c = "";
										"undefined" != typeof navigator && (c = navigator.platform || ""), a.exports = {
											color: ["#c23531", "#2f4554", "#61a0a8", "#d48265", "#91c7ae", "#749f83", "#ca8622", "#bda29a", "#6e7074", "#546570", "#c4ccd3"],
											textStyle: {
												fontFamily: c.match(/^Win/) ? "Microsoft YaHei" : "sans-serif",
												fontSize: 12,
												fontStyle: "normal",
												fontWeight: "normal"
											},
											blendMode: null,
											animation: "auto",
											animationDuration: 1e3,
											animationDurationUpdate: 300,
											animationEasing: "exponentialOut",
											animationEasingUpdate: "cubicOut",
											animationThreshold: 2e3,
											progressiveThreshold: 3e3,
											progressive: 400,
											hoverLayerThreshold: 3e3,
											useUTC: !1
										}
									}, function(a, b, c) {
										a.exports = {
											getAreaStyle: c(31)([
												["fill", "color"],
												["shadowBlur"],
												["shadowOffsetX"],
												["shadowOffsetY"],
												["opacity"],
												["shadowColor"]
											])
										}
									}, function(a, b) {
										a.exports = {
											getBoxLayoutParams: function() {
												return {
													left: this.get("left"),
													top: this.get("top"),
													right: this.get("right"),
													bottom: this.get("bottom"),
													width: this.get("width"),
													height: this.get("height")
												}
											}
										}
									}, function(a, b, c) {
										var d = c(31)([
											["fill", "color"],
											["stroke", "borderColor"],
											["lineWidth", "borderWidth"],
											["opacity"],
											["shadowBlur"],
											["shadowOffsetX"],
											["shadowOffsetY"],
											["shadowColor"],
											["textPosition"],
											["textAlign"]
										]);
										a.exports = {
											getItemStyle: function(a, b) {
												var c = d.call(this, a, b),
													e = this.getBorderLineDash();
												return e && (c.lineDash = e), c
											},
											getBorderLineDash: function() {
												var a = this.get("borderType");
												return "solid" === a || null == a ? null : "dashed" === a ? [5, 5] : [1, 1]
											}
										}
									}, function(a, b, c) {
										var d = c(31)([
											["lineWidth", "width"],
											["stroke", "color"],
											["opacity"],
											["shadowBlur"],
											["shadowOffsetX"],
											["shadowOffsetY"],
											["shadowColor"]
										]);
										a.exports = {
											getLineStyle: function(a) {
												var b = d.call(this, a),
													c = this.getLineDash(b.lineWidth);
												return c && (b.lineDash = c), b
											},
											getLineDash: function(a) {
												null == a && (a = 1);
												var b = this.get("type"),
													c = Math.max(a, 2),
													d = 4 * a;
												return "solid" === b || null == b ? null : "dashed" === b ? [d, d] : [c, c]
											}
										}
									}, function(a, b, c) {
										var d = c(16),
											e = c(3),
											f = ["textStyle", "color"];
										a.exports = {
											getTextColor: function(a) {
												var b = this.ecModel;
												return this.getShallow("color") || (!a && b ? b.get(f) : null)
											},
											getFont: function() {
												return e.getFont({
													fontStyle: this.getShallow("fontStyle"),
													fontWeight: this.getShallow("fontWeight"),
													fontSize: this.getShallow("fontSize"),
													fontFamily: this.getShallow("fontFamily")
												}, this.ecModel)
											},
											getTextRect: function(a) {
												return d.getBoundingRect(a, this.getFont(), this.getShallow("align"), this.getShallow("verticalAlign") || this.getShallow("baseline"), this.getShallow("padding"), this.getShallow("rich"), this.getShallow("truncateText"))
											}
										}
									}, function(a, b, c) {
										function d(a, b) {
											b = b.split(",");
											for(var c = a, d = 0; d < b.length && (c = c && c[b[d]], null != c); d++);
											return c
										}

										function e(a, b, c, d) {
											b = b.split(",");
											for(var e, f = a, g = 0; g < b.length - 1; g++) e = b[g], null == f[e] && (f[e] = {}), f = f[e];
											(d || null == f[b[g]]) && (f[b[g]] = c)
										}

										function f(a) {
											l(i, function(b) {
												b[0] in a && !(b[1] in a) && (a[b[1]] = a[b[0]])
											})
										}
										var g = c(1),
											h = c(152),
											i = [
												["x", "left"],
												["y", "top"],
												["x2", "right"],
												["y2", "bottom"]
											],
											j = ["grid", "geo", "parallel", "legend", "toolbox", "title", "visualMap", "dataZoom", "timeline"],
											k = ["bar", "boxplot", "candlestick", "chord", "effectScatter", "funnel", "gauge", "lines", "graph", "heatmap", "line", "map", "parallel", "pie", "radar", "sankey", "scatter", "treemap"],
											l = g.each;
										a.exports = function(a, b) {
											h(a, b);
											var c = a.series;
											l(g.isArray(c) ? c : [c], function(a) {
												if(g.isObject(a)) {
													var b = a.type;
													if("pie" !== b && "gauge" !== b || null != a.clockWise && (a.clockwise = a.clockWise), "gauge" === b) {
														var c = d(a, "pointer.color");
														null != c && e(a, "itemStyle.normal.color", c)
													}
													for(var h = 0; h < k.length; h++)
														if(k[h] === a.type) {
															f(a);
															break
														}
												}
											}), a.dataRange && (a.visualMap = a.dataRange), l(j, function(b) {
												var c = a[b];
												c && (g.isArray(c) || (c = [c]), l(c, function(a) {
													f(a)
												}))
											})
										}
									}, function(a, b, c) {
										function d(a) {
											var b = a && a.itemStyle;
											if(b)
												for(var c = 0, d = n.length; d > c; c++) {
													var e = n[c],
														f = b.normal,
														g = b.emphasis;
													f && f[e] && (a[e] = a[e] || {}, a[e].normal ? j.merge(a[e].normal, f[e]) : a[e].normal = f[e], f[e] = null), g && g[e] && (a[e] = a[e] || {}, a[e].emphasis ? j.merge(a[e].emphasis, g[e]) : a[e].emphasis = g[e], g[e] = null)
												}
										}

										function e(a, b) {
											var c = m(a) && a[b],
												d = m(c) && c.textStyle;
											if(d)
												for(var e = 0, f = k.TEXT_STYLE_OPTIONS.length; f > e; e++) {
													var b = k.TEXT_STYLE_OPTIONS[e];
													d.hasOwnProperty(b) && (c[b] = d[b])
												}
										}

										function f(a) {
											m(a) && (e(a, "normal"), e(a, "emphasis"))
										}

										function g(a) {
											if(m(a)) {
												d(a), f(a.label), f(a.upperLabel), f(a.edgeLabel);
												var b = a.markPoint;
												d(b), f(b && b.label);
												var c = a.markLine;
												d(a.markLine), f(c && c.label);
												var g = a.markArea;
												f(g && g.label), e(a, "axisLabel"), e(a, "title"), e(a, "detail");
												var h = a.data;
												if(h) {
													for(var i = 0; i < h.length; i++) d(h[i]), f(h[i] && h[i].label);
													var b = a.markPoint;
													if(b && b.data)
														for(var k = b.data, i = 0; i < k.length; i++) d(k[i]), f(k[i] && k[i].label);
													var c = a.markLine;
													if(c && c.data)
														for(var l = c.data, i = 0; i < l.length; i++) j.isArray(l[i]) ? (d(l[i][0]), f(l[i][0] && l[i][0].label), d(l[i][1]), f(l[i][1] && l[i][1].label)) : (d(l[i]), f(l[i] && l[i].label))
												}
											}
										}

										function h(a) {
											return j.isArray(a) ? a : a ? [a] : []
										}

										function i(a) {
											return(j.isArray(a) ? a[0] : a) || {}
										}
										var j = c(1),
											k = c(5),
											l = j.each,
											m = j.isObject,
											n = ["areaStyle", "lineStyle", "nodeStyle", "linkStyle", "chordStyle", "label", "labelLine"];
										a.exports = function(a, b) {
											l(h(a.series), function(a) {
												m(a) && g(a)
											});
											var c = ["xAxis", "yAxis", "radiusAxis", "angleAxis", "singleAxis", "parallelAxis", "radar"];
											b && c.push("valueAxis", "categoryAxis", "logAxis", "timeAxis"), l(c, function(b) {
												l(h(a[b]), function(a) {
													a && (e(a, "axisLabel"), e(a.axisPointer, "label"))
												})
											}), l(h(a.parallel), function(a) {
												var b = a && a.parallelAxisDefault;
												e(b, "axisLabel"), e(b && b.axisPointer, "label")
											}), l(h(a.calendar), function(a) {
												e(a, "dayLabel"), e(a, "monthLabel"), e(a, "yearLabel")
											}), l(h(a.radar), function(a) {
												e(a, "name")
											}), l(h(a.geo), function(a) {
												m(a) && (f(a.label), l(h(a.regions), function(a) {
													f(a.label)
												}))
											}), f(i(a.timeline).label), e(i(a.axisPointer), "label"), e(i(a.tooltip).axisPointer, "label")
										}
									}, function(a, b) {
										var c = {
												average: function(a) {
													for(var b = 0, c = 0, d = 0; d < a.length; d++) isNaN(a[d]) || (b += a[d], c++);
													return 0 === c ? NaN : b / c
												},
												sum: function(a) {
													for(var b = 0, c = 0; c < a.length; c++) b += a[c] || 0;
													return b
												},
												max: function(a) {
													for(var b = -(1 / 0), c = 0; c < a.length; c++) a[c] > b && (b = a[c]);
													return b
												},
												min: function(a) {
													for(var b = 1 / 0, c = 0; c < a.length; c++) a[c] < b && (b = a[c]);
													return b
												},
												nearest: function(a) {
													return a[0]
												}
											},
											d = function(a, b) {
												return Math.round(a.length / 2)
											};
										a.exports = function(a, b, e) {
											b.eachSeriesByType(a, function(a) {
												var b = a.getData(),
													e = a.get("sampling"),
													f = a.coordinateSystem;
												if("cartesian2d" === f.type && e) {
													var g = f.getBaseAxis(),
														h = f.getOtherAxis(g),
														i = g.getExtent(),
														j = i[1] - i[0],
														k = Math.round(b.count() / j);
													if(k > 1) {
														var l;
														"string" == typeof e ? l = c[e] : "function" == typeof e && (l = e), l && (b = b.downSample(h.dim, 1 / k, l, d), a.setData(b))
													}
												}
											}, this)
										}
									}, function(a, b, c) {
										function d(a, b) {
											return l(a, k(b))
										}
										var e = c(1),
											f = c(34),
											g = c(4),
											h = c(45),
											i = f.prototype,
											j = h.prototype,
											k = g.getPrecisionSafe,
											l = g.round,
											m = Math.floor,
											n = Math.ceil,
											o = Math.pow,
											p = Math.log,
											q = f.extend({
												type: "log",
												base: 10,
												$constructor: function() {
													f.apply(this, arguments), this._originalScale = new h
												},
												getTicks: function() {
													var a = this._originalScale,
														b = this._extent,
														c = a.getExtent();
													return e.map(j.getTicks.call(this), function(e) {
														var f = g.round(o(this.base, e));
														return f = e === b[0] && a.__fixMin ? d(f, c[0]) : f, f = e === b[1] && a.__fixMax ? d(f, c[1]) : f
													}, this)
												},
												getLabel: j.getLabel,
												scale: function(a) {
													return a = i.scale.call(this, a), o(this.base, a)
												},
												setExtent: function(a, b) {
													var c = this.base;
													a = p(a) / p(c), b = p(b) / p(c), j.setExtent.call(this, a, b)
												},
												getExtent: function() {
													var a = this.base,
														b = i.getExtent.call(this);
													b[0] = o(a, b[0]), b[1] = o(a, b[1]);
													var c = this._originalScale,
														e = c.getExtent();
													return c.__fixMin && (b[0] = d(b[0], e[0])), c.__fixMax && (b[1] = d(b[1], e[1])), b
												},
												unionExtent: function(a) {
													this._originalScale.unionExtent(a);
													var b = this.base;
													a[0] = p(a[0]) / p(b), a[1] = p(a[1]) / p(b), i.unionExtent.call(this, a)
												},
												unionExtentFromData: function(a, b) {
													this.unionExtent(a.getDataExtent(b, !0, function(a) {
														return a > 0
													}))
												},
												niceTicks: function(a) {
													a = a || 10;
													var b = this._extent,
														c = b[1] - b[0];
													if(!(c === 1 / 0 || 0 >= c)) {
														var d = g.quantity(c),
															e = a / c * d;
														for(.5 >= e && (d *= 10); !isNaN(d) && Math.abs(d) < 1 && Math.abs(d) > 0;) d *= 10;
														var f = [g.round(n(b[0] / d) * d), g.round(m(b[1] / d) * d)];
														this._interval = d, this._niceExtent = f
													}
												},
												niceExtent: function(a) {
													j.niceExtent.call(this, a);
													var b = this._originalScale;
													b.__fixMin = a.fixMin, b.__fixMax = a.fixMax
												}
											});
										e.each(["contain", "normalize"], function(a) {
											q.prototype[a] = function(b) {
												return b = p(b) / p(this.base), i[a].call(this, b)
											}
										}), q.create = function() {
											return new q
										}, a.exports = q
									}, function(a, b, c) {
										var d = c(1),
											e = c(34),
											f = e.prototype,
											g = e.extend({
												type: "ordinal",
												init: function(a, b) {
													this._data = a, this._extent = b || [0, a.length - 1]
												},
												parse: function(a) {
													return "string" == typeof a ? d.indexOf(this._data, a) : Math.round(a)
												},
												contain: function(a) {
													return a = this.parse(a), f.contain.call(this, a) && null != this._data[a]
												},
												normalize: function(a) {
													return f.normalize.call(this, this.parse(a))
												},
												scale: function(a) {
													return Math.round(f.scale.call(this, a))
												},
												getTicks: function() {
													for(var a = [], b = this._extent, c = b[0]; c <= b[1];) a.push(c), c++;
													return a
												},
												getLabel: function(a) {
													return this._data[a]
												},
												count: function() {
													return this._extent[1] - this._extent[0] + 1
												},
												unionExtentFromData: function(a, b) {
													this.unionExtent(a.getDataExtent(b, !1))
												},
												niceTicks: d.noop,
												niceExtent: d.noop
											});
										g.create = function() {
											return new g
										}, a.exports = g
									}, function(a, b, c) {
										var d = c(1),
											e = c(4),
											f = c(7),
											g = c(66),
											h = c(45),
											i = h.prototype,
											j = Math.ceil,
											k = Math.floor,
											l = 1e3,
											m = 60 * l,
											n = 60 * m,
											o = 24 * n,
											p = function(a, b, c, d) {
												for(; d > c;) {
													var e = c + d >>> 1;
													a[e][2] < b ? c = e + 1 : d = e
												}
												return c
											},
											q = h.extend({
												type: "time",
												getLabel: function(a) {
													var b = this._stepLvl,
														c = new Date(a);
													return f.formatTime(b[0], c, this.getSetting("useUTC"))
												},
												niceExtent: function(a) {
													var b = this._extent;
													if(b[0] === b[1] && (b[0] -= o, b[1] += o), b[1] === -(1 / 0) && b[0] === 1 / 0) {
														var c = new Date;
														b[1] = new Date(c.getFullYear(), c.getMonth(), c.getDate()), b[0] = b[1] - o
													}
													this.niceTicks(a.splitNumber, a.minInterval, a.maxInterval);
													var d = this._interval;
													a.fixMin || (b[0] = e.round(k(b[0] / d) * d)), a.fixMax || (b[1] = e.round(j(b[1] / d) * d))
												},
												niceTicks: function(a, b, c) {
													var d = this.getSetting("useUTC") ? 0 : 60 * e.getTimezoneOffset() * 1e3;
													a = a || 10;
													var f = this._extent,
														h = f[1] - f[0],
														i = h / a;
													null != b && b > i && (i = b), null != c && i > c && (i = c);
													var l = r.length,
														m = p(r, i, 0, l),
														n = r[Math.min(m, l - 1)],
														o = n[2];
													if("year" === n[0]) {
														var q = h / o,
															s = e.nice(q / a, !0);
														o *= s
													}
													var t = [Math.round(j((f[0] - d) / o) * o + d), Math.round(k((f[1] - d) / o) * o + d)];
													g.fixExtent(t, f), this._stepLvl = n, this._interval = o, this._niceExtent = t
												},
												parse: function(a) {
													return +e.parseDate(a)
												}
											});
										d.each(["contain", "normalize"], function(a) {
											q.prototype[a] = function(b) {
												return i[a].call(this, this.parse(b))
											}
										});
										var r = [
											["hh:mm:ss", 1, l],
											["hh:mm:ss", 5, 5 * l],
											["hh:mm:ss", 10, 10 * l],
											["hh:mm:ss", 15, 15 * l],
											["hh:mm:ss", 30, 30 * l],
											["hh:mm\nMM-dd", 1, m],
											["hh:mm\nMM-dd", 5, 5 * m],
											["hh:mm\nMM-dd", 10, 10 * m],
											["hh:mm\nMM-dd", 15, 15 * m],
											["hh:mm\nMM-dd", 30, 30 * m],
											["hh:mm\nMM-dd", 1, n],
											["hh:mm\nMM-dd", 2, 2 * n],
											["hh:mm\nMM-dd", 6, 6 * n],
											["hh:mm\nMM-dd", 12, 12 * n],
											["MM-dd\nyyyy", 1, o],
											["week", 7, 7 * o],
											["month", 1, 31 * o],
											["quarter", 3, 380 * o / 4],
											["half-year", 6, 380 * o / 2],
											["year", 1, 380 * o]
										];
										q.create = function(a) {
											return new q({
												useUTC: a.ecModel.get("useUTC")
											})
										}, a.exports = q
									}, function(a, b, c) {
										var d = c(39);
										a.exports = function(a) {
											function b(b) {
												var c = (b.visualColorAccessPath || "itemStyle.normal.color").split("."),
													e = b.getData(),
													f = b.get(c) || b.getColorFromPalette(b.get("name"));
												e.setVisual("color", f), a.isSeriesFiltered(b) || ("function" != typeof f || f instanceof d || e.each(function(a) {
													e.setItemVisual(a, "color", f(b.getDataParams(a)))
												}), e.each(function(a) {
													var b = e.getItemModel(a),
														d = b.get(c, !0);
													null != d && e.setItemVisual(a, "color", d)
												}))
											}
											a.eachRawSeries(b)
										}
									}, function(a, b, c) {
										"use strict";

										function d(a, b, c) {
											return {
												type: a,
												event: c,
												target: b.target,
												topTarget: b.topTarget,
												cancelBubble: !1,
												offsetX: c.zrX,
												offsetY: c.zrY,
												gestureEvent: c.gestureEvent,
												pinchX: c.pinchX,
												pinchY: c.pinchY,
												pinchScale: c.pinchScale,
												wheelDelta: c.zrDelta,
												zrByTouch: c.zrByTouch
											}
										}

										function e() {}

										function f(a, b, c) {
											if(a[a.rectHover ? "rectContain" : "contain"](b, c)) {
												for(var d, e = a; e;) {
													if(e.clipPath && !e.clipPath.contain(b, c)) return !1;
													e.silent && (d = !0), e = e.parent
												}
												return !d || j
											}
											return !1
										}
										var g = c(1),
											h = c(184),
											i = c(23),
											j = "silent";
										e.prototype.dispose = function() {};
										var k = ["click", "dblclick", "mousewheel", "mouseout", "mouseup", "mousedown", "mousemove", "contextmenu"],
											l = function(a, b, c, d) {
												i.call(this), this.storage = a, this.painter = b, this.painterRoot = d, c = c || new e, this.proxy = c, c.handler = this, this._hovered = {}, this._lastTouchMoment, this._lastX, this._lastY, h.call(this), g.each(k, function(a) {
													c.on && c.on(a, this[a], this)
												}, this)
											};
										l.prototype = {
											constructor: l,
											mousemove: function(a) {
												var b = a.zrX,
													c = a.zrY,
													d = this._hovered,
													e = d.target;
												e && !e.__zr && (d = this.findHover(d.x, d.y), e = d.target);
												var f = this._hovered = this.findHover(b, c),
													g = f.target,
													h = this.proxy;
												h.setCursor && h.setCursor(g ? g.cursor : "default"), e && g !== e && this.dispatchToElement(d, "mouseout", a), this.dispatchToElement(f, "mousemove", a), g && g !== e && this.dispatchToElement(f, "mouseover", a)
											},
											mouseout: function(a) {
												this.dispatchToElement(this._hovered, "mouseout", a);
												var b, c = a.toElement || a.relatedTarget;
												do c = c && c.parentNode; while (c && 9 != c.nodeType && !(b = c === this.painterRoot));
												!b && this.trigger("globalout", {
													event: a
												})
											},
											resize: function(a) {
												this._hovered = {}
											},
											dispatch: function(a, b) {
												var c = this[a];
												c && c.call(this, b)
											},
											dispose: function() {
												this.proxy.dispose(), this.storage = this.proxy = this.painter = null
											},
											setCursorStyle: function(a) {
												var b = this.proxy;
												b.setCursor && b.setCursor(a)
											},
											dispatchToElement: function(a, b, c) {
												a = a || {};
												var e = a.target;
												if(!e || !e.silent) {
													for(var f = "on" + b, g = d(b, a, c); e && (e[f] && (g.cancelBubble = e[f].call(e, g)), e.trigger(b, g), e = e.parent, !g.cancelBubble););
													g.cancelBubble || (this.trigger(b, g), this.painter && this.painter.eachOtherLayer(function(a) {
														"function" == typeof a[f] && a[f].call(a, g), a.trigger && a.trigger(b, g)
													}))
												}
											},
											findHover: function(a, b, c) {
												for(var d = this.storage.getDisplayList(), e = {
														x: a,
														y: b
													}, g = d.length - 1; g >= 0; g--) {
													var h;
													if(d[g] !== c && !d[g].ignore && (h = f(d[g], a, b)) && (!e.topTarget && (e.topTarget = d[g]), h !== j)) {
														e.target = d[g];
														break
													}
												}
												return e
											}
										}, g.each(["click", "mousedown", "mouseup", "mousewheel", "dblclick", "contextmenu"], function(a) {
											l.prototype[a] = function(b) {
												var c = this.findHover(b.zrX, b.zrY),
													d = c.target;
												if("mousedown" === a) this._downel = d, this._upel = d;
												else if("mosueup" === a) this._upel = d;
												else if("click" === a && this._downel !== this._upel) return;
												this.dispatchToElement(c, a, b)
											}
										}), g.mixin(l, i), g.mixin(l, h), a.exports = l
									}, function(a, b, c) {
										function d() {
											return !1
										}

										function e(a, b, c, d) {
											var e = document.createElement(b),
												f = c.getWidth(),
												g = c.getHeight(),
												h = e.style;
											return h.position = "absolute", h.left = 0, h.top = 0, h.width = f + "px", h.height = g + "px", e.width = f * d, e.height = g * d, e.setAttribute("data-zr-dom-id", a), e
										}
										var f = c(1),
											g = c(35),
											h = c(75),
											i = c(74),
											j = function(a, b, c) {
												var h;
												c = c || g.devicePixelRatio, "string" == typeof a ? h = e(a, "canvas", b, c) : f.isObject(a) && (h = a, a = h.id), this.id = a, this.dom = h;
												var i = h.style;
												i && (h.onselectstart = d, i["-webkit-user-select"] = "none", i["user-select"] = "none", i["-webkit-touch-callout"] = "none", i["-webkit-tap-highlight-color"] = "rgba(0,0,0,0)", i.padding = 0, i.margin = 0, i["border-width"] = 0), this.domBack = null, this.ctxBack = null, this.painter = b, this.config = null, this.clearColor = 0, this.motionBlur = !1, this.lastFrameAlpha = .7, this.dpr = c
											};
										j.prototype = {
											constructor: j,
											elCount: 0,
											__dirty: !0,
											initContext: function() {
												this.ctx = this.dom.getContext("2d"), this.ctx.__currentValues = {}, this.ctx.dpr = this.dpr
											},
											createBackBuffer: function() {
												var a = this.dpr;
												this.domBack = e("back-" + this.id, "canvas", this.painter, a), this.ctxBack = this.domBack.getContext("2d"), this.ctxBack.__currentValues = {}, 1 != a && this.ctxBack.scale(a, a)
											},
											resize: function(a, b) {
												var c = this.dpr,
													d = this.dom,
													e = d.style,
													f = this.domBack;
												e.width = a + "px", e.height = b + "px", d.width = a * c, d.height = b * c, f && (f.width = a * c, f.height = b * c, 1 != c && this.ctxBack.scale(c, c))
											},
											clear: function(a) {
												var b = this.dom,
													c = this.ctx,
													d = b.width,
													e = b.height,
													f = this.clearColor,
													g = this.motionBlur && !a,
													j = this.lastFrameAlpha,
													k = this.dpr;
												if(g && (this.domBack || this.createBackBuffer(), this.ctxBack.globalCompositeOperation = "copy", this.ctxBack.drawImage(b, 0, 0, d / k, e / k)), c.clearRect(0, 0, d, e), f) {
													var l;
													f.colorStops ? (l = f.__canvasGradient || h.getGradient(c, f, {
														x: 0,
														y: 0,
														width: d,
														height: e
													}), f.__canvasGradient = l) : f.image && (l = i.prototype.getCanvasPattern.call(f, c)), c.save(), c.fillStyle = l || f, c.fillRect(0, 0, d, e), c.restore()
												}
												if(g) {
													var m = this.domBack;
													c.save(), c.globalAlpha = j, c.drawImage(m, 0, 0, d, e), c.restore()
												}
											}
										}, a.exports = j
									}, function(a, b, c) {
										"use strict";

										function d(a) {
											return parseInt(a, 10)
										}

										function e(a) {
											return !!a && (!!a.__builtin__ || "function" == typeof a.resize && "function" == typeof a.refresh)
										}

										function f(a) {
											a.__unusedCount++
										}

										function g(a) {
											1 == a.__unusedCount && a.clear()
										}

										function h(a, b, c) {
											return t.copy(a.getBoundingRect()), a.transform && t.applyTransform(a.transform), u.width = b, u.height = c, !t.intersect(u)
										}

										function i(a, b) {
											if(a == b) return !1;
											if(!a || !b || a.length !== b.length) return !0;
											for(var c = 0; c < a.length; c++)
												if(a[c] !== b[c]) return !0
										}

										function j(a, b) {
											for(var c = 0; c < a.length; c++) {
												var d = a[c];
												d.setTransform(b), b.beginPath(), d.buildPath(b, d.shape), b.clip(), d.restoreTransform(b)
											}
										}

										function k(a, b) {
											var c = document.createElement("div");
											return c.style.cssText = ["position:relative", "overflow:hidden", "width:" + a + "px", "height:" + b + "px", "padding:0", "margin:0", "border-width:0"].join(";") + ";", c
										}
										var l = c(35),
											m = c(1),
											n = c(54),
											o = c(12),
											p = c(52),
											q = c(159),
											r = c(70),
											s = 5,
											t = new o(0, 0, 0, 0),
											u = new o(0, 0, 0, 0),
											v = function(a, b, c) {
												var d = !a.nodeName || "CANVAS" === a.nodeName.toUpperCase();
												this._opts = c = m.extend({}, c || {}), this.dpr = c.devicePixelRatio || l.devicePixelRatio, this._singleCanvas = d, this.root = a;
												var e = a.style;
												e && (e["-webkit-tap-highlight-color"] = "transparent", e["-webkit-user-select"] = e["user-select"] = e["-webkit-touch-callout"] = "none", a.innerHTML = ""), this.storage = b;
												var f = this._zlevelList = [],
													g = this._layers = {};
												if(this._layerConfig = {}, d) {
													null != c.width && (a.width = c.width), null != c.height && (a.height = c.height);
													var h = a.width,
														i = a.height;
													this._width = h, this._height = i;
													var j = new q(a, this, 1);
													j.initContext(), g[0] = j, f.push(0), this._domRoot = a
												} else {
													this._width = this._getSize(0), this._height = this._getSize(1);
													var n = this._domRoot = k(this._width, this._height);
													a.appendChild(n)
												}
												this._progressiveLayers = [], this._hoverlayer, this._hoverElements = []
											};
										v.prototype = {
											constructor: v,
											isSingleCanvas: function() {
												return this._singleCanvas
											},
											getViewportRoot: function() {
												return this._domRoot
											},
											getViewportRootOffset: function() {
												var a = this.getViewportRoot();
												return a ? {
													offsetLeft: a.offsetLeft || 0,
													offsetTop: a.offsetTop || 0
												} : void 0
											},
											refresh: function(a) {
												var b = this.storage.getDisplayList(!0),
													c = this._zlevelList;
												this._paintList(b, a);
												for(var d = 0; d < c.length; d++) {
													var e = c[d],
														f = this._layers[e];
													!f.__builtin__ && f.refresh && f.refresh()
												}
												return this.refreshHover(), this._progressiveLayers.length && this._startProgessive(), this
											},
											addHover: function(a, b) {
												if(!a.__hoverMir) {
													var c = new a.constructor({
														style: a.style,
														shape: a.shape
													});
													c.__from = a, a.__hoverMir = c, c.setStyle(b), this._hoverElements.push(c)
												}
											},
											removeHover: function(a) {
												var b = a.__hoverMir,
													c = this._hoverElements,
													d = m.indexOf(c, b);
												d >= 0 && c.splice(d, 1), a.__hoverMir = null
											},
											clearHover: function(a) {
												for(var b = this._hoverElements, c = 0; c < b.length; c++) {
													var d = b[c].__from;
													d && (d.__hoverMir = null)
												}
												b.length = 0
											},
											refreshHover: function() {
												var a = this._hoverElements,
													b = a.length,
													c = this._hoverlayer;
												if(c && c.clear(), b) {
													p(a, this.storage.displayableSortFunc), c || (c = this._hoverlayer = this.getLayer(1e5));
													var d = {};
													c.ctx.save();
													for(var e = 0; b > e;) {
														var f = a[e],
															g = f.__from;
														g && g.__zr ? (e++, g.invisible || (f.transform = g.transform, f.invTransform = g.invTransform, f.__clipPaths = g.__clipPaths, this._doPaintEl(f, c, !0, d))) : (a.splice(e, 1), g.__hoverMir = null, b--)
													}
													c.ctx.restore()
												}
											},
											_startProgessive: function() {
												function a() {
													c === b._progressiveToken && b.storage && (b._doPaintList(b.storage.getDisplayList()), b._furtherProgressive ? (b._progress++, r(a)) : b._progressiveToken = -1)
												}
												var b = this;
												if(b._furtherProgressive) {
													var c = b._progressiveToken = +new Date;
													b._progress++, r(a)
												}
											},
											_clearProgressive: function() {
												this._progressiveToken = -1, this._progress = 0, m.each(this._progressiveLayers, function(a) {
													a.__dirty && a.clear()
												})
											},
											_paintList: function(a, b) {
												null == b && (b = !1), this._updateLayerStatus(a), this._clearProgressive(), this.eachBuiltinLayer(f), this._doPaintList(a, b), this.eachBuiltinLayer(g)
											},
											_doPaintList: function(a, b) {
												function c(a) {
													var b = f.dpr || 1;
													f.save(), f.globalAlpha = 1, f.shadowBlur = 0, d.__dirty = !0, f.setTransform(1, 0, 0, 1, 0, 0), f.drawImage(a.dom, 0, 0, k * b, l * b), f.restore()
												}
												for(var d, e, f, g, h, i, j = 0, k = this._width, l = this._height, o = this._progress, p = 0, q = a.length; q > p; p++) {
													var r = a[p],
														t = this._singleCanvas ? 0 : r.zlevel,
														u = r.__frame;
													if(0 > u && h && (c(h), h = null), e !== t && (f && f.restore(), g = {}, e = t, d = this.getLayer(e), d.__builtin__ || n("ZLevel " + e + " has been used by unkown layer " + d.id), f = d.ctx, f.save(), d.__unusedCount = 0, (d.__dirty || b) && d.clear()), d.__dirty || b) {
														if(u >= 0) {
															if(!h) {
																if(h = this._progressiveLayers[Math.min(j++, s - 1)], h.ctx.save(), h.renderScope = {}, h && h.__progress > h.__maxProgress) {
																	p = h.__nextIdxNotProg - 1;
																	continue
																}
																i = h.__progress, h.__dirty || (o = i), h.__progress = o + 1
															}
															u === o && this._doPaintEl(r, h, !0, h.renderScope)
														} else this._doPaintEl(r, d, b, g);
														r.__dirty = !1
													}
												}
												h && c(h), f && f.restore(), this._furtherProgressive = !1, m.each(this._progressiveLayers, function(a) {
													a.__maxProgress >= a.__progress && (this._furtherProgressive = !0)
												}, this)
											},
											_doPaintEl: function(a, b, c, d) {
												var e = b.ctx,
													f = a.transform;
												if((b.__dirty || c) && !a.invisible && 0 !== a.style.opacity && (!f || f[0] || f[3]) && (!a.culling || !h(a, this._width, this._height))) {
													var g = a.__clipPaths;
													(d.prevClipLayer !== b || i(g, d.prevElClipPaths)) && (d.prevElClipPaths && (d.prevClipLayer.ctx.restore(), d.prevClipLayer = d.prevElClipPaths = null, d.prevEl = null), g && (e.save(), j(g, e), d.prevClipLayer = b, d.prevElClipPaths = g)), a.beforeBrush && a.beforeBrush(e), a.brush(e, d.prevEl || null), d.prevEl = a, a.afterBrush && a.afterBrush(e)
												}
											},
											getLayer: function(a) {
												if(this._singleCanvas) return this._layers[0];
												var b = this._layers[a];
												return b || (b = new q("zr_" + a, this, this.dpr), b.__builtin__ = !0, this._layerConfig[a] && m.merge(b, this._layerConfig[a], !0), this.insertLayer(a, b), b.initContext()), b
											},
											insertLayer: function(a, b) {
												var c = this._layers,
													d = this._zlevelList,
													f = d.length,
													g = null,
													h = -1,
													i = this._domRoot;
												if(c[a]) return void n("ZLevel " + a + " has been used already");
												if(!e(b)) return void n("Layer of zlevel " + a + " is not valid");
												if(f > 0 && a > d[0]) {
													for(h = 0; f - 1 > h && !(d[h] < a && d[h + 1] > a); h++);
													g = c[d[h]]
												}
												if(d.splice(h + 1, 0, a), c[a] = b, !b.virtual)
													if(g) {
														var j = g.dom;
														j.nextSibling ? i.insertBefore(b.dom, j.nextSibling) : i.appendChild(b.dom)
													} else i.firstChild ? i.insertBefore(b.dom, i.firstChild) : i.appendChild(b.dom)
											},
											eachLayer: function(a, b) {
												var c, d, e = this._zlevelList;
												for(d = 0; d < e.length; d++) c = e[d], a.call(b, this._layers[c], c)
											},
											eachBuiltinLayer: function(a, b) {
												var c, d, e, f = this._zlevelList;
												for(e = 0; e < f.length; e++) d = f[e], c = this._layers[d], c.__builtin__ && a.call(b, c, d)
											},
											eachOtherLayer: function(a, b) {
												var c, d, e, f = this._zlevelList;
												for(e = 0; e < f.length; e++) d = f[e], c = this._layers[d], c.__builtin__ || a.call(b, c, d)
											},
											getLayers: function() {
												return this._layers
											},
											_updateLayerStatus: function(a) {
												var b = this._layers,
													c = this._progressiveLayers,
													d = {},
													e = {};
												this.eachBuiltinLayer(function(a, b) {
													d[b] = a.elCount, a.elCount = 0, a.__dirty = !1
												}), m.each(c, function(a, b) {
													e[b] = a.elCount, a.elCount = 0, a.__dirty = !1
												});
												for(var f, g, h = 0, i = 0, j = 0, k = a.length; k > j; j++) {
													var l = a[j],
														n = this._singleCanvas ? 0 : l.zlevel,
														o = b[n],
														p = l.progressive;
													if(o && (o.elCount++, o.__dirty = o.__dirty || l.__dirty), p >= 0) {
														g !== p && (g = p, i++);
														var r = l.__frame = i - 1;
														if(!f) {
															var t = Math.min(h, s - 1);
															f = c[t], f || (f = c[t] = new q("progressive", this, this.dpr), f.initContext()), f.__maxProgress = 0
														}
														f.__dirty = f.__dirty || l.__dirty, f.elCount++, f.__maxProgress = Math.max(f.__maxProgress, r), f.__maxProgress >= f.__progress && (o.__dirty = !0)
													} else l.__frame = -1, f && (f.__nextIdxNotProg = j, h++, f = null)
												}
												f && (h++, f.__nextIdxNotProg = j), this.eachBuiltinLayer(function(a, b) {
													d[b] !== a.elCount && (a.__dirty = !0)
												}), c.length = Math.min(h, s), m.each(c, function(a, b) {
													e[b] !== a.elCount && (l.__dirty = !0), a.__dirty && (a.__progress = 0)
												})
											},
											clear: function() {
												return this.eachBuiltinLayer(this._clearLayer), this
											},
											_clearLayer: function(a) {
												a.clear()
											},
											configLayer: function(a, b) {
												if(b) {
													var c = this._layerConfig;
													c[a] ? m.merge(c[a], b, !0) : c[a] = b;
													var d = this._layers[a];
													d && m.merge(d, c[a], !0)
												}
											},
											delLayer: function(a) {
												var b = this._layers,
													c = this._zlevelList,
													d = b[a];
												d && (d.dom.parentNode.removeChild(d.dom), delete b[a], c.splice(m.indexOf(c, a), 1))
											},
											resize: function(a, b) {
												var c = this._domRoot;
												c.style.display = "none";
												var d = this._opts;
												if(null != a && (d.width = a), null != b && (d.height = b), a = this._getSize(0), b = this._getSize(1), c.style.display = "", this._width != a || b != this._height) {
													c.style.width = a + "px", c.style.height = b + "px";
													for(var e in this._layers) this._layers.hasOwnProperty(e) && this._layers[e].resize(a, b);
													m.each(this._progressiveLayers, function(c) {
														c.resize(a, b)
													}), this.refresh(!0)
												}
												return this._width = a, this._height = b, this
											},
											clearLayer: function(a) {
												var b = this._layers[a];
												b && b.clear()
											},
											dispose: function() {
												this.root.innerHTML = "", this.root = this.storage = this._domRoot = this._layers = null
											},
											getRenderedCanvas: function(a) {
												function b(a, b) {
													var d = g._zlevelList;
													null == a && (a = -(1 / 0));
													for(var e, f = 0; f < d.length; f++) {
														var h = d[f],
															i = g._layers[h];
														if(!i.__builtin__ && h > a && b > h) {
															e = i;
															break
														}
													}
													e && e.renderToCanvas && (c.ctx.save(), e.renderToCanvas(c.ctx), c.ctx.restore())
												}
												if(a = a || {}, this._singleCanvas) return this._layers[0].dom;
												var c = new q("image", this, a.pixelRatio || this.dpr);
												c.initContext(), c.clearColor = a.backgroundColor, c.clear();
												for(var d, e = this.storage.getDisplayList(!0), f = {}, g = this, h = 0; h < e.length; h++) {
													var i = e[h];
													i.zlevel !== d && (b(d, i.zlevel), d = i.zlevel), this._doPaintEl(i, c, !0, f)
												}
												return b(d, 1 / 0), c.dom
											},
											getWidth: function() {
												return this._width
											},
											getHeight: function() {
												return this._height
											},
											_getSize: function(a) {
												var b = this._opts,
													c = ["width", "height"][a],
													e = ["clientWidth", "clientHeight"][a],
													f = ["paddingLeft", "paddingTop"][a],
													g = ["paddingRight", "paddingBottom"][a];
												if(null != b[c] && "auto" !== b[c]) return parseFloat(b[c]);
												var h = this.root,
													i = document.defaultView.getComputedStyle(h);
												return(h[e] || d(i[c]) || d(h.style[c])) - (d(i[f]) || 0) - (d(i[g]) || 0) | 0
											},
											pathToImage: function(a, b) {
												b = b || this.dpr;
												var d = document.createElement("canvas"),
													e = d.getContext("2d"),
													f = a.getBoundingRect(),
													g = a.style,
													h = g.shadowBlur,
													i = g.shadowOffsetX,
													j = g.shadowOffsetY,
													k = g.hasStroke() ? g.lineWidth : 0,
													l = Math.max(k / 2, -i + h),
													m = Math.max(k / 2, i + h),
													n = Math.max(k / 2, -j + h),
													o = Math.max(k / 2, j + h),
													p = f.width + l + m,
													q = f.height + n + o;
												d.width = p * b, d.height = q * b, e.scale(b, b), e.clearRect(0, 0, p, q), e.dpr = b;
												var r = {
													position: a.position,
													rotation: a.rotation,
													scale: a.scale
												};
												a.position = [l - f.x, n - f.y], a.rotation = 0, a.scale = [1, 1], a.updateTransform(), a && a.brush(e);
												var s = c(55),
													t = new s({
														style: {
															x: 0,
															y: 0,
															image: d
														}
													});
												return null != r.position && (t.position = a.position = r.position), null != r.rotation && (t.rotation = a.rotation = r.rotation), null != r.scale && (t.scale = a.scale = r.scale), t
											}
										}, a.exports = v
									}, function(a, b, c) {
										"use strict";

										function d(a, b) {
											return a.zlevel === b.zlevel ? a.z === b.z ? a.z2 - b.z2 : a.z - b.z : a.zlevel - b.zlevel
										}
										var e = c(1),
											f = c(10),
											g = c(36),
											h = c(52),
											i = function() {
												this._roots = [], this._displayList = [], this._displayListLen = 0
											};
										i.prototype = {
											constructor: i,
											traverse: function(a, b) {
												for(var c = 0; c < this._roots.length; c++) this._roots[c].traverse(a, b)
											},
											getDisplayList: function(a, b) {
												return b = b || !1, a && this.updateDisplayList(b), this._displayList
											},
											updateDisplayList: function(a) {
												this._displayListLen = 0;
												for(var b = this._roots, c = this._displayList, e = 0, g = b.length; g > e; e++) this._updateAndAddDisplayable(b[e], null, a);
												c.length = this._displayListLen, f.canvasSupported && h(c, d)
											},
											_updateAndAddDisplayable: function(a, b, c) {
												if(!a.ignore || c) {
													a.beforeUpdate(), a.__dirty && a.update(), a.afterUpdate();
													var d = a.clipPath;
													if(d) {
														b = b ? b.slice() : [];
														for(var e = d, f = a; e;) e.parent = f, e.updateTransform(), b.push(e), f = e, e = e.clipPath
													}
													if(a.isGroup) {
														for(var g = a._children, h = 0; h < g.length; h++) {
															var i = g[h];
															a.__dirty && (i.__dirty = !0), this._updateAndAddDisplayable(i, b, c)
														}
														a.__dirty = !1
													} else a.__clipPaths = b, this._displayList[this._displayListLen++] = a
												}
											},
											addRoot: function(a) {
												a.__storage !== this && (a instanceof g && a.addChildrenToStorage(this), this.addToStorage(a), this._roots.push(a))
											},
											delRoot: function(a) {
												if(null == a) {
													for(var b = 0; b < this._roots.length; b++) {
														var c = this._roots[b];
														c instanceof g && c.delChildrenFromStorage(this)
													}
													return this._roots = [], this._displayList = [], void(this._displayListLen = 0)
												}
												if(a instanceof Array)
													for(var b = 0, d = a.length; d > b; b++) this.delRoot(a[b]);
												else {
													var f = e.indexOf(this._roots, a);
													f >= 0 && (this.delFromStorage(a), this._roots.splice(f, 1), a instanceof g && a.delChildrenFromStorage(this))
												}
											},
											addToStorage: function(a) {
												return a.__storage = this, a.dirty(!1), this
											},
											delFromStorage: function(a) {
												return a && (a.__storage = null), this
											},
											dispose: function() {
												this._renderList = this._roots = null
											},
											displayableSortFunc: d
										}, a.exports = i
									}, function(a, b, c) {
										"use strict";
										var d = c(1),
											e = c(21).Dispatcher,
											f = c(70),
											g = c(69),
											h = function(a) {
												a = a || {}, this.stage = a.stage || {}, this.onframe = a.onframe || function() {}, this._clips = [], this._running = !1, this._time, this._pausedTime, this._pauseStart, this._paused = !1, e.call(this)
											};
										h.prototype = {
											constructor: h,
											addClip: function(a) {
												this._clips.push(a)
											},
											addAnimator: function(a) {
												a.animation = this;
												for(var b = a.getClips(), c = 0; c < b.length; c++) this.addClip(b[c])
											},
											removeClip: function(a) {
												var b = d.indexOf(this._clips, a);
												b >= 0 && this._clips.splice(b, 1)
											},
											removeAnimator: function(a) {
												for(var b = a.getClips(), c = 0; c < b.length; c++) this.removeClip(b[c]);
												a.animation = null
											},
											_update: function() {
												for(var a = (new Date).getTime() - this._pausedTime, b = a - this._time, c = this._clips, d = c.length, e = [], f = [], g = 0; d > g; g++) {
													var h = c[g],
														i = h.step(a, b);
													i && (e.push(i), f.push(h))
												}
												for(var g = 0; d > g;) c[g]._needsRemove ? (c[g] = c[d - 1], c.pop(), d--) : g++;
												d = e.length;
												for(var g = 0; d > g; g++) f[g].fire(e[g]);
												this._time = a, this.onframe(b), this.trigger("frame", b), this.stage.update && this.stage.update()
											},
											_startLoop: function() {
												function a() {
													b._running && (f(a), !b._paused && b._update())
												}
												var b = this;
												this._running = !0, f(a)
											},
											start: function() {
												this._time = (new Date).getTime(), this._pausedTime = 0, this._startLoop()
											},
											stop: function() {
												this._running = !1
											},
											pause: function() {
												this._paused || (this._pauseStart = (new Date).getTime(), this._paused = !0)
											},
											resume: function() {
												this._paused && (this._pausedTime += (new Date).getTime() - this._pauseStart, this._paused = !1)
											},
											clear: function() {
												this._clips = []
											},
											animate: function(a, b) {
												b = b || {};
												var c = new g(a, b.loop, b.getter, b.setter);
												return this.addAnimator(c), c
											}
										}, d.mixin(h, e), a.exports = h
									}, function(a, b, c) {
										function d(a) {
											this._target = a.target, this._life = a.life || 1e3, this._delay = a.delay || 0, this._initialized = !1, this.loop = null != a.loop && a.loop, this.gap = a.gap || 0, this.easing = a.easing || "Linear", this.onframe = a.onframe, this.ondestroy = a.ondestroy, this.onrestart = a.onrestart, this._pausedTime = 0, this._paused = !1
										}
										var e = c(164);
										d.prototype = {
											constructor: d,
											step: function(a, b) {
												if(this._initialized || (this._startTime = a + this._delay, this._initialized = !0), this._paused) return void(this._pausedTime += b);
												var c = (a - this._startTime - this._pausedTime) / this._life;
												if(!(0 > c)) {
													c = Math.min(c, 1);
													var d = this.easing,
														f = "string" == typeof d ? e[d] : d,
														g = "function" == typeof f ? f(c) : c;
													return this.fire("frame", g), 1 == c ? this.loop ? (this.restart(a), "restart") : (this._needsRemove = !0, "destroy") : null
												}
											},
											restart: function(a) {
												var b = (a - this._startTime - this._pausedTime) % this._life;
												this._startTime = a - b + this.gap, this._pausedTime = 0, this._needsRemove = !1
											},
											fire: function(a, b) {
												a = "on" + a, this[a] && this[a](this._target, b)
											},
											pause: function() {
												this._paused = !0
											},
											resume: function() {
												this._paused = !1
											}
										}, a.exports = d
									}, function(a, b) {
										var c = {
											linear: function(a) {
												return a
											},
											quadraticIn: function(a) {
												return a * a
											},
											quadraticOut: function(a) {
												return a * (2 - a)
											},
											quadraticInOut: function(a) {
												return(a *= 2) < 1 ? .5 * a * a : -.5 * (--a * (a - 2) - 1)
											},
											cubicIn: function(a) {
												return a * a * a
											},
											cubicOut: function(a) {
												return --a * a * a + 1
											},
											cubicInOut: function(a) {
												return(a *= 2) < 1 ? .5 * a * a * a : .5 * ((a -= 2) * a * a + 2)
											},
											quarticIn: function(a) {
												return a * a * a * a
											},
											quarticOut: function(a) {
												return 1 - --a * a * a * a
											},
											quarticInOut: function(a) {
												return(a *= 2) < 1 ? .5 * a * a * a * a : -.5 * ((a -= 2) * a * a * a - 2)
											},
											quinticIn: function(a) {
												return a * a * a * a * a
											},
											quinticOut: function(a) {
												return --a * a * a * a * a + 1
											},
											quinticInOut: function(a) {
												return(a *= 2) < 1 ? .5 * a * a * a * a * a : .5 * ((a -= 2) * a * a * a * a + 2)
											},
											sinusoidalIn: function(a) {
												return 1 - Math.cos(a * Math.PI / 2)
											},
											sinusoidalOut: function(a) {
												return Math.sin(a * Math.PI / 2)
											},
											sinusoidalInOut: function(a) {
												return .5 * (1 - Math.cos(Math.PI * a))
											},
											exponentialIn: function(a) {
												return 0 === a ? 0 : Math.pow(1024, a - 1)
											},
											exponentialOut: function(a) {
												return 1 === a ? 1 : 1 - Math.pow(2, -10 * a)
											},
											exponentialInOut: function(a) {
												return 0 === a ? 0 : 1 === a ? 1 : (a *= 2) < 1 ? .5 * Math.pow(1024, a - 1) : .5 * (-Math.pow(2, -10 * (a - 1)) + 2)
											},
											circularIn: function(a) {
												return 1 - Math.sqrt(1 - a * a)
											},
											circularOut: function(a) {
												return Math.sqrt(1 - --a * a)
											},
											circularInOut: function(a) {
												return(a *= 2) < 1 ? -.5 * (Math.sqrt(1 - a * a) - 1) : .5 * (Math.sqrt(1 - (a -= 2) * a) + 1)
											},
											elasticIn: function(a) {
												var b, c = .1,
													d = .4;
												return 0 === a ? 0 : 1 === a ? 1 : (!c || 1 > c ? (c = 1, b = d / 4) : b = d * Math.asin(1 / c) / (2 * Math.PI), -(c * Math.pow(2, 10 * (a -= 1)) * Math.sin((a - b) * (2 * Math.PI) / d)))
											},
											elasticOut: function(a) {
												var b, c = .1,
													d = .4;
												return 0 === a ? 0 : 1 === a ? 1 : (!c || 1 > c ? (c = 1, b = d / 4) : b = d * Math.asin(1 / c) / (2 * Math.PI), c * Math.pow(2, -10 * a) * Math.sin((a - b) * (2 * Math.PI) / d) + 1)
											},
											elasticInOut: function(a) {
												var b, c = .1,
													d = .4;
												return 0 === a ? 0 : 1 === a ? 1 : (!c || 1 > c ? (c = 1, b = d / 4) : b = d * Math.asin(1 / c) / (2 * Math.PI), (a *= 2) < 1 ? -.5 * (c * Math.pow(2, 10 * (a -= 1)) * Math.sin((a - b) * (2 * Math.PI) / d)) : c * Math.pow(2, -10 * (a -= 1)) * Math.sin((a - b) * (2 * Math.PI) / d) * .5 + 1)
											},
											backIn: function(a) {
												var b = 1.70158;
												return a * a * ((b + 1) * a - b)
											},
											backOut: function(a) {
												var b = 1.70158;
												return --a * a * ((b + 1) * a + b) + 1
											},
											backInOut: function(a) {
												var b = 2.5949095;
												return(a *= 2) < 1 ? .5 * (a * a * ((b + 1) * a - b)) : .5 * ((a -= 2) * a * ((b + 1) * a + b) + 2)
											},
											bounceIn: function(a) {
												return 1 - c.bounceOut(1 - a)
											},
											bounceOut: function(a) {
												return 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375
											},
											bounceInOut: function(a) {
												return .5 > a ? .5 * c.bounceIn(2 * a) : .5 * c.bounceOut(2 * a - 1) + .5
											}
										};
										a.exports = c
									}, function(a, b, c) {
										var d = c(71).normalizeRadian,
											e = 2 * Math.PI;
										a.exports = {
											containStroke: function(a, b, c, f, g, h, i, j, k) {
												if(0 === i) return !1;
												var l = i;
												j -= a, k -= b;
												var m = Math.sqrt(j * j + k * k);
												if(m - l > c || c > m + l) return !1;
												if(Math.abs(f - g) % e < 1e-4) return !0;
												if(h) {
													var n = f;
													f = d(g), g = d(n)
												} else f = d(f), g = d(g);
												f > g && (g += e);
												var o = Math.atan2(k, j);
												return 0 > o && (o += e), o >= f && g >= o || o + e >= f && g >= o + e
											}
										}
									}, function(a, b, c) {
										var d = c(20);
										a.exports = {
											containStroke: function(a, b, c, e, f, g, h, i, j, k, l) {
												if(0 === j) return !1;
												var m = j;
												if(l > b + m && l > e + m && l > g + m && l > i + m || b - m > l && e - m > l && g - m > l && i - m > l || k > a + m && k > c + m && k > f + m && k > h + m || a - m > k && c - m > k && f - m > k && h - m > k) return !1;
												var n = d.cubicProjectPoint(a, b, c, e, f, g, h, i, k, l, null);
												return m / 2 >= n
											}
										}
									}, function(a, b, c) {
										"use strict";

										function d(a, b) {
											return Math.abs(a - b) < t
										}

										function e() {
											var a = v[0];
											v[0] = v[1], v[1] = a
										}

										function f(a, b, c, d, f, g, h, i, j, k) {
											if(k > b && k > d && k > g && k > i || b > k && d > k && g > k && i > k) return 0;
											var l = p.cubicRootAt(b, d, g, i, k, u);
											if(0 === l) return 0;
											for(var m, n, o = 0, q = -1, r = 0; l > r; r++) {
												var s = u[r],
													t = 0 === s || 1 === s ? .5 : 1,
													w = p.cubicAt(a, c, f, h, s);
												j > w || (0 > q && (q = p.cubicExtrema(b, d, g, i, v), v[1] < v[0] && q > 1 && e(), m = p.cubicAt(b, d, g, i, v[0]), q > 1 && (n = p.cubicAt(b, d, g, i, v[1]))), o += 2 == q ? s < v[0] ? b > m ? t : -t : s < v[1] ? m > n ? t : -t : n > i ? t : -t : s < v[0] ? b > m ? t : -t : m > i ? t : -t)
											}
											return o
										}

										function g(a, b, c, d, e, f, g, h) {
											if(h > b && h > d && h > f || b > h && d > h && f > h) return 0;
											var i = p.quadraticRootAt(b, d, f, h, u);
											if(0 === i) return 0;
											var j = p.quadraticExtremum(b, d, f);
											if(j >= 0 && 1 >= j) {
												for(var k = 0, l = p.quadraticAt(b, d, f, j), m = 0; i > m; m++) {
													var n = 0 === u[m] || 1 === u[m] ? .5 : 1,
														o = p.quadraticAt(a, c, e, u[m]);
													g > o || (k += u[m] < j ? b > l ? n : -n : l > f ? n : -n)
												}
												return k
											}
											var n = 0 === u[0] || 1 === u[0] ? .5 : 1,
												o = p.quadraticAt(a, c, e, u[0]);
											return g > o ? 0 : b > f ? n : -n
										}

										function h(a, b, c, d, e, f, g, h) {
											if(h -= b, h > c || -c > h) return 0;
											var i = Math.sqrt(c * c - h * h);
											u[0] = -i, u[1] = i;
											var j = Math.abs(d - e);
											if(1e-4 > j) return 0;
											if(1e-4 > j % s) {
												d = 0, e = s;
												var k = f ? 1 : -1;
												return g >= u[0] + a && g <= u[1] + a ? k : 0
											}
											if(f) {
												var i = d;
												d = o(e), e = o(i)
											} else d = o(d), e = o(e);
											d > e && (e += s);
											for(var l = 0, m = 0; 2 > m; m++) {
												var n = u[m];
												if(n + a > g) {
													var p = Math.atan2(h, n),
														k = f ? 1 : -1;
													0 > p && (p = s + p), (p >= d && e >= p || p + s >= d && e >= p + s) && (p > Math.PI / 2 && p < 1.5 * Math.PI && (k = -k), l += k)
												}
											}
											return l
										}

										function i(a, b, c, e, i) {
											for(var k = 0, o = 0, p = 0, s = 0, t = 0, u = 0; u < a.length;) {
												var v = a[u++];
												switch(v === j.M && u > 1 && (c || (k += q(o, p, s, t, e, i))), 1 == u && (o = a[u], p = a[u + 1], s = o, t = p), v) {
													case j.M:
														s = a[u++], t = a[u++], o = s, p = t;
														break;
													case j.L:
														if(c) {
															if(r(o, p, a[u], a[u + 1], b, e, i)) return !0
														} else k += q(o, p, a[u], a[u + 1], e, i) || 0;
														o = a[u++], p = a[u++];
														break;
													case j.C:
														if(c) {
															if(l.containStroke(o, p, a[u++], a[u++], a[u++], a[u++], a[u], a[u + 1], b, e, i)) return !0
														} else k += f(o, p, a[u++], a[u++], a[u++], a[u++], a[u], a[u + 1], e, i) || 0;
														o = a[u++], p = a[u++];
														break;
													case j.Q:
														if(c) {
															if(m.containStroke(o, p, a[u++], a[u++], a[u], a[u + 1], b, e, i)) return !0
														} else k += g(o, p, a[u++], a[u++], a[u], a[u + 1], e, i) || 0;
														o = a[u++], p = a[u++];
														break;
													case j.A:
														var w = a[u++],
															x = a[u++],
															y = a[u++],
															z = a[u++],
															A = a[u++],
															B = a[u++],
															C = (a[u++], 1 - a[u++]),
															D = Math.cos(A) * y + w,
															E = Math.sin(A) * z + x;
														u > 1 ? k += q(o, p, D, E, e, i) : (s = D, t = E);
														var F = (e - w) * z / y + w;
														if(c) {
															if(n.containStroke(w, x, z, A, A + B, C, b, F, i)) return !0
														} else k += h(w, x, z, A, A + B, C, F, i);
														o = Math.cos(A + B) * y + w, p = Math.sin(A + B) * z + x;
														break;
													case j.R:
														s = o = a[u++], t = p = a[u++];
														var G = a[u++],
															H = a[u++],
															D = s + G,
															E = t + H;
														if(c) {
															if(r(s, t, D, t, b, e, i) || r(D, t, D, E, b, e, i) || r(D, E, s, E, b, e, i) || r(s, E, s, t, b, e, i)) return !0
														} else k += q(D, t, D, E, e, i), k += q(s, E, s, t, e, i);
														break;
													case j.Z:
														if(c) {
															if(r(o, p, s, t, b, e, i)) return !0
														} else k += q(o, p, s, t, e, i);
														o = s, p = t
												}
											}
											return c || d(p, t) || (k += q(o, p, s, t, e, i) || 0), 0 !== k
										}
										var j = c(27).CMD,
											k = c(101),
											l = c(166),
											m = c(102),
											n = c(165),
											o = c(71).normalizeRadian,
											p = c(20),
											q = c(103),
											r = k.containStroke,
											s = 2 * Math.PI,
											t = 1e-4,
											u = [-1, -1, -1],
											v = [-1, -1];
										a.exports = {
											contain: function(a, b, c) {
												return i(a, 0, !1, b, c)
											},
											containStroke: function(a, b, c, d) {
												return i(a, b, !0, c, d)
											}
										}
									}, function(a, b, c) {
										"use strict";

										function d(a) {
											var b = a[1][0] - a[0][0],
												c = a[1][1] - a[0][1];
											return Math.sqrt(b * b + c * c)
										}

										function e(a) {
											return [(a[0][0] + a[1][0]) / 2, (a[0][1] + a[1][1]) / 2]
										}
										var f = c(21),
											g = function() {
												this._track = []
											};
										g.prototype = {
											constructor: g,
											recognize: function(a, b, c) {
												return this._doTrack(a, b, c), this._recognize(a)
											},
											clear: function() {
												return this._track.length = 0, this
											},
											_doTrack: function(a, b, c) {
												var d = a.touches;
												if(d) {
													for(var e = {
															points: [],
															touches: [],
															target: b,
															event: a
														}, g = 0, h = d.length; h > g; g++) {
														var i = d[g],
															j = f.clientToLocal(c, i, {});
														e.points.push([j.zrX, j.zrY]), e.touches.push(i)
													}
													this._track.push(e)
												}
											},
											_recognize: function(a) {
												for(var b in h)
													if(h.hasOwnProperty(b)) {
														var c = h[b](this._track, a);
														if(c) return c
													}
											}
										};
										var h = {
											pinch: function(a, b) {
												var c = a.length;
												if(c) {
													var f = (a[c - 1] || {}).points,
														g = (a[c - 2] || {}).points || f;
													if(g && g.length > 1 && f && f.length > 1) {
														var h = d(f) / d(g);
														!isFinite(h) && (h = 1), b.pinchScale = h;
														var i = e(f);
														return b.pinchX = i[0], b.pinchY = i[1], {
															type: "pinch",
															target: a[0].target,
															event: b
														}
													}
												}
											}
										};
										a.exports = g
									}, function(a, b, c) {
										function d(a) {
											return "mousewheel" === a && m.browser.firefox ? "DOMMouseScroll" : a
										}

										function e(a, b, c) {
											var d = a._gestureMgr;
											"start" === c && d.clear();
											var e = d.recognize(b, a.handler.findHover(b.zrX, b.zrY, null).target, a.dom);
											if("end" === c && d.clear(), e) {
												var f = e.type;
												b.gestureEvent = f, a.handler.dispatchToElement({
													target: e.target
												}, f, e.event)
											}
										}

										function f(a) {
											a._touching = !0, clearTimeout(a._touchTimer), a._touchTimer = setTimeout(function() {
												a._touching = !1
											}, 700)
										}

										function g(a) {
											var b = a.pointerType;
											return "pen" === b || "touch" === b
										}

										function h(a) {
											function b(a, b) {
												return function() {
													return b._touching ? void 0 : a.apply(b, arguments)
												}
											}
											k.each(t, function(b) {
												a._handlers[b] = k.bind(w[b], a)
											}), k.each(v, function(b) {
												a._handlers[b] = k.bind(w[b], a)
											}), k.each(s, function(c) {
												a._handlers[c] = b(w[c], a)
											})
										}

										function i(a) {
											function b(b, c) {
												k.each(b, function(b) {
													o(a, d(b), c._handlers[b])
												}, c)
											}
											l.call(this), this.dom = a, this._touching = !1, this._touchTimer, this._gestureMgr = new n, this._handlers = {}, h(this), m.pointerEventsSupported ? b(v, this) : (m.touchEventsSupported && b(t, this), b(s, this))
										}
										var j = c(21),
											k = c(1),
											l = c(23),
											m = c(10),
											n = c(168),
											o = j.addEventListener,
											p = j.removeEventListener,
											q = j.normalizeEvent,
											r = 300,
											s = ["click", "dblclick", "mousewheel", "mouseout", "mouseup", "mousedown", "mousemove", "contextmenu"],
											t = ["touchstart", "touchend", "touchmove"],
											u = {
												pointerdown: 1,
												pointerup: 1,
												pointermove: 1,
												pointerout: 1
											},
											v = k.map(s, function(a) {
												var b = a.replace("mouse", "pointer");
												return u[b] ? b : a
											}),
											w = {
												mousemove: function(a) {
													a = q(this.dom, a), this.trigger("mousemove", a)
												},
												mouseout: function(a) {
													a = q(this.dom, a);
													var b = a.toElement || a.relatedTarget;
													if(b != this.dom)
														for(; b && 9 != b.nodeType;) {
															if(b === this.dom) return;
															b = b.parentNode
														}
													this.trigger("mouseout", a)
												},
												touchstart: function(a) {
													a = q(this.dom, a), a.zrByTouch = !0, this._lastTouchMoment = new Date, e(this, a, "start"), w.mousemove.call(this, a), w.mousedown.call(this, a), f(this)
												},
												touchmove: function(a) {
													a = q(this.dom, a), a.zrByTouch = !0, e(this, a, "change"), w.mousemove.call(this, a), f(this)
												},
												touchend: function(a) {
													a = q(this.dom, a), a.zrByTouch = !0, e(this, a, "end"), w.mouseup.call(this, a), +new Date - this._lastTouchMoment < r && w.click.call(this, a), f(this)
												},
												pointerdown: function(a) {
													w.mousedown.call(this, a)
												},
												pointermove: function(a) {
													g(a) || w.mousemove.call(this, a)
												},
												pointerup: function(a) {
													w.mouseup.call(this, a)
												},
												pointerout: function(a) {
													g(a) || w.mouseout.call(this, a)
												}
											};
										k.each(["click", "mousedown", "mouseup", "mousewheel", "dblclick", "contextmenu"], function(a) {
											w[a] = function(b) {
												b = q(this.dom, b), this.trigger(a, b)
											}
										});
										var x = i.prototype;
										x.dispose = function() {
											for(var a = s.concat(t), b = 0; b < a.length; b++) {
												var c = a[b];
												p(this.dom, d(c), this._handlers[c])
											}
										}, x.setCursor = function(a) {
											this.dom.style.cursor = a || "default"
										}, k.mixin(i, l), a.exports = i
									}, function(a, b, c) {
										var d = c(8);
										a.exports = d.extend({
											type: "compound",
											shape: {
												paths: null
											},
											_updatePathDirty: function() {
												for(var a = this.__dirtyPath, b = this.shape.paths, c = 0; c < b.length; c++) a = a || b[c].__dirtyPath;
												this.__dirtyPath = a, this.__dirty = this.__dirty || a
											},
											beforeBrush: function() {
												this._updatePathDirty();
												for(var a = this.shape.paths || [], b = this.getGlobalScale(), c = 0; c < a.length; c++) a[c].path || a[c].createPathProxy(), a[c].path.setScale(b[0], b[1])
											},
											buildPath: function(a, b) {
												for(var c = b.paths || [], d = 0; d < c.length; d++) c[d].buildPath(a, c[d].shape, !0)
											},
											afterBrush: function() {
												for(var a = this.shape.paths, b = 0; b < a.length; b++) a[b].__dirtyPath = !1
											},
											getBoundingRect: function() {
												return this._updatePathDirty(), d.prototype.getBoundingRect.call(this)
											}
										})
									}, function(a, b, c) {
										"use strict";
										var d = c(1),
											e = c(39),
											f = function(a, b, c, d, f) {
												this.x = null == a ? .5 : a, this.y = null == b ? .5 : b, this.r = null == c ? .5 : c, this.type = "radial", this.global = f || !1, e.call(this, d)
											};
										f.prototype = {
											constructor: f
										}, d.inherits(f, e), a.exports = f
									}, function(a, b, c) {
										var d = c(6),
											e = d.min,
											f = d.max,
											g = d.scale,
											h = d.distance,
											i = d.add;
										a.exports = function(a, b, c, j) {
											var k, l, m, n, o = [],
												p = [],
												q = [],
												r = [];
											if(j) {
												m = [1 / 0, 1 / 0], n = [-(1 / 0), -(1 / 0)];
												for(var s = 0, t = a.length; t > s; s++) e(m, m, a[s]), f(n, n, a[s]);
												e(m, m, j[0]), f(n, n, j[1])
											}
											for(var s = 0, t = a.length; t > s; s++) {
												var u = a[s];
												if(c) k = a[s ? s - 1 : t - 1], l = a[(s + 1) % t];
												else {
													if(0 === s || s === t - 1) {
														o.push(d.clone(a[s]));
														continue
													}
													k = a[s - 1], l = a[s + 1]
												}
												d.sub(p, l, k), g(p, p, b);
												var v = h(u, k),
													w = h(u, l),
													x = v + w;
												0 !== x && (v /= x, w /= x), g(q, p, -v), g(r, p, w);
												var y = i([], u, q),
													z = i([], u, r);
												j && (f(y, y, m), e(y, y, n), f(z, z, m), e(z, z, n)), o.push(y), o.push(z)
											}
											return c && o.push(o.shift()), o
										}
									}, function(a, b, c) {
										function d(a, b, c, d, e, f, g) {
											var h = .5 * (c - a),
												i = .5 * (d - b);
											return(2 * (b - c) + h + i) * g + (-3 * (b - c) - 2 * h - i) * f + h * e + b
										}
										var e = c(6);
										a.exports = function(a, b) {
											for(var c = a.length, f = [], g = 0, h = 1; c > h; h++) g += e.distance(a[h - 1], a[h]);
											var i = g / 2;
											i = c > i ? c : i;
											for(var h = 0; i > h; h++) {
												var j, k, l, m = h / (i - 1) * (b ? c : c - 1),
													n = Math.floor(m),
													o = m - n,
													p = a[n % c];
												b ? (j = a[(n - 1 + c) % c], k = a[(n + 1) % c], l = a[(n + 2) % c]) : (j = a[0 === n ? n : n - 1], k = a[n > c - 2 ? c - 1 : n + 1], l = a[n > c - 3 ? c - 1 : n + 2]);
												var q = o * o,
													r = o * q;
												f.push([d(j[0], p[0], k[0], l[0], o, q, r), d(j[1], p[1], k[1], l[1], o, q, r)])
											}
											return f
										}
									}, function(a, b, c) {
										a.exports = c(8).extend({
											type: "arc",
											shape: {
												cx: 0,
												cy: 0,
												r: 0,
												startAngle: 0,
												endAngle: 2 * Math.PI,
												clockwise: !0
											},
											style: {
												stroke: "#000",
												fill: null
											},
											buildPath: function(a, b) {
												var c = b.cx,
													d = b.cy,
													e = Math.max(b.r, 0),
													f = b.startAngle,
													g = b.endAngle,
													h = b.clockwise,
													i = Math.cos(f),
													j = Math.sin(f);
												a.moveTo(i * e + c, j * e + d), a.arc(c, d, e, f, g, !h)
											}
										})
									}, function(a, b, c) {
										"use strict";

										function d(a, b, c) {
											var d = a.cpx2,
												e = a.cpy2;
											return null === d || null === e ? [(c ? l : j)(a.x1, a.cpx1, a.cpx2, a.x2, b), (c ? l : j)(a.y1, a.cpy1, a.cpy2, a.y2, b)] : [(c ? k : i)(a.x1, a.cpx1, a.x2, b), (c ? k : i)(a.y1, a.cpy1, a.y2, b)]
										}
										var e = c(20),
											f = c(6),
											g = e.quadraticSubdivide,
											h = e.cubicSubdivide,
											i = e.quadraticAt,
											j = e.cubicAt,
											k = e.quadraticDerivativeAt,
											l = e.cubicDerivativeAt,
											m = [];
										a.exports = c(8).extend({
											type: "bezier-curve",
											shape: {
												x1: 0,
												y1: 0,
												x2: 0,
												y2: 0,
												cpx1: 0,
												cpy1: 0,
												percent: 1
											},
											style: {
												stroke: "#000",
												fill: null
											},
											buildPath: function(a, b) {
												var c = b.x1,
													d = b.y1,
													e = b.x2,
													f = b.y2,
													i = b.cpx1,
													j = b.cpy1,
													k = b.cpx2,
													l = b.cpy2,
													n = b.percent;
												0 !== n && (a.moveTo(c, d), null == k || null == l ? (1 > n && (g(c, i, e, n, m), i = m[1], e = m[2], g(d, j, f, n, m), j = m[1], f = m[2]), a.quadraticCurveTo(i, j, e, f)) : (1 > n && (h(c, i, k, e, n, m), i = m[1], k = m[2], e = m[3], h(d, j, l, f, n, m), j = m[1], l = m[2], f = m[3]), a.bezierCurveTo(i, j, k, l, e, f)))
											},
											pointAt: function(a) {
												return d(this.shape, a, !1)
											},
											tangentAt: function(a) {
												var b = d(this.shape, a, !0);
												return f.normalize(b, b)
											}
										})
									}, function(a, b, c) {
										"use strict";
										a.exports = c(8).extend({
											type: "circle",
											shape: {
												cx: 0,
												cy: 0,
												r: 0
											},
											buildPath: function(a, b, c) {
												c && a.moveTo(b.cx + b.r, b.cy), a.arc(b.cx, b.cy, b.r, 0, 2 * Math.PI, !0)
											}
										})
									}, function(a, b, c) {
										a.exports = c(8).extend({
											type: "line",
											shape: {
												x1: 0,
												y1: 0,
												x2: 0,
												y2: 0,
												percent: 1
											},
											style: {
												stroke: "#000",
												fill: null
											},
											buildPath: function(a, b) {
												var c = b.x1,
													d = b.y1,
													e = b.x2,
													f = b.y2,
													g = b.percent;
												0 !== g && (a.moveTo(c, d), 1 > g && (e = c * (1 - g) + e * g, f = d * (1 - g) + f * g), a.lineTo(e, f))
											},
											pointAt: function(a) {
												var b = this.shape;
												return [b.x1 * (1 - a) + b.x2 * a, b.y1 * (1 - a) + b.y2 * a]
											}
										})
									}, function(a, b, c) {
										var d = c(77);
										a.exports = c(8).extend({
											type: "polygon",
											shape: {
												points: null,
												smooth: !1,
												smoothConstraint: null
											},
											buildPath: function(a, b) {
												d.buildPath(a, b, !0)
											}
										})
									}, function(a, b, c) {
										var d = c(77);
										a.exports = c(8).extend({
											type: "polyline",
											shape: {
												points: null,
												smooth: !1,
												smoothConstraint: null
											},
											style: {
												stroke: "#000",
												fill: null
											},
											buildPath: function(a, b) {
												d.buildPath(a, b, !1)
											}
										})
									}, function(a, b, c) {
										var d = c(78);
										a.exports = c(8).extend({
											type: "rect",
											shape: {
												r: 0,
												x: 0,
												y: 0,
												width: 0,
												height: 0
											},
											buildPath: function(a, b) {
												var c = b.x,
													e = b.y,
													f = b.width,
													g = b.height;
												b.r ? d.buildPath(a, b) : a.rect(c, e, f, g), a.closePath()
											}
										})
									}, function(a, b, c) {
										a.exports = c(8).extend({
											type: "ring",
											shape: {
												cx: 0,
												cy: 0,
												r: 0,
												r0: 0
											},
											buildPath: function(a, b) {
												var c = b.cx,
													d = b.cy,
													e = 2 * Math.PI;
												a.moveTo(c + b.r, d), a.arc(c, d, b.r, 0, e, !1), a.moveTo(c + b.r0, d), a.arc(c, d, b.r0, 0, e, !0)
											}
										})
									}, function(a, b, c) {
										var d = c(8),
											e = c(76);
										a.exports = d.extend({
											type: "sector",
											shape: {
												cx: 0,
												cy: 0,
												r0: 0,
												r: 0,
												startAngle: 0,
												endAngle: 2 * Math.PI,
												clockwise: !0
											},
											brush: e(d.prototype.brush),
											buildPath: function(a, b) {
												var c = b.cx,
													d = b.cy,
													e = Math.max(b.r0 || 0, 0),
													f = Math.max(b.r, 0),
													g = b.startAngle,
													h = b.endAngle,
													i = b.clockwise,
													j = Math.cos(g),
													k = Math.sin(g);
												a.moveTo(j * e + c, k * e + d), a.lineTo(j * f + c, k * f + d), a.arc(c, d, f, g, h, !i), a.lineTo(Math.cos(h) * e + c, Math.sin(h) * e + d), 0 !== e && a.arc(c, d, e, h, g, i), a.closePath()
											}
										})
									}, function(a, b, c) {
										"use strict";
										var d = c(69),
											e = c(1),
											f = e.isString,
											g = e.isFunction,
											h = e.isObject,
											i = c(54),
											j = function() {
												this.animators = []
											};
										j.prototype = {
											constructor: j,
											animate: function(a, b) {
												var c, f = !1,
													g = this,
													h = this.__zr;
												if(a) {
													var j = a.split("."),
														k = g;
													f = "shape" === j[0];
													for(var l = 0, m = j.length; m > l; l++) k && (k = k[j[l]]);
													k && (c = k)
												} else c = g;
												if(!c) return void i('Property "' + a + '" is not existed in element ' + g.id);
												var n = g.animators,
													o = new d(c, b);
												return o.during(function(a) {
													g.dirty(f)
												}).done(function() {
													n.splice(e.indexOf(n, o), 1)
												}), n.push(o), h && h.animation.addAnimator(o), o
											},
											stopAnimation: function(a) {
												for(var b = this.animators, c = b.length, d = 0; c > d; d++) b[d].stop(a);
												return b.length = 0, this
											},
											animateTo: function(a, b, c, d, e, h) {
												function i() {
													k--, k || e && e()
												}
												f(c) ? (e = d, d = c, c = 0) : g(d) ? (e = d, d = "linear", c = 0) : g(c) ? (e = c, c = 0) : g(b) ? (e = b, b = 500) : b || (b = 500), this.stopAnimation(), this._animateToShallow("", this, a, b, c, d, e);
												var j = this.animators.slice(),
													k = j.length;
												k || e && e();
												for(var l = 0; l < j.length; l++) j[l].done(i).start(d, h)
											},
											_animateToShallow: function(a, b, c, d, f) {
												var g = {},
													i = 0;
												for(var j in c)
													if(c.hasOwnProperty(j))
														if(null != b[j]) h(c[j]) && !e.isArrayLike(c[j]) ? this._animateToShallow(a ? a + "." + j : j, b[j], c[j], d, f) : (g[j] = c[j], i++);
														else if(null != c[j])
													if(a) {
														var k = {};
														k[a] = {}, k[a][j] = c[j], this.attr(k)
													} else this.attr(j, c[j]);
												return i > 0 && this.animate(a, !1).when(null == d ? 500 : d, g).delay(f || 0), this
											}
										}, a.exports = j
									}, function(a, b) {
										function c() {
											this.on("mousedown", this._dragStart, this), this.on("mousemove", this._drag, this), this.on("mouseup", this._dragEnd, this), this.on("globalout", this._dragEnd, this)
										}

										function d(a, b) {
											return {
												target: a,
												topTarget: b && b.topTarget
											}
										}
										c.prototype = {
											constructor: c,
											_dragStart: function(a) {
												var b = a.target;
												b && b.draggable && (this._draggingTarget = b, b.dragging = !0, this._x = a.offsetX, this._y = a.offsetY, this.dispatchToElement(d(b, a), "dragstart", a.event))
											},
											_drag: function(a) {
												var b = this._draggingTarget;
												if(b) {
													var c = a.offsetX,
														e = a.offsetY,
														f = c - this._x,
														g = e - this._y;
													this._x = c, this._y = e, b.drift(f, g, a), this.dispatchToElement(d(b, a), "drag", a.event);
													var h = this.findHover(c, e, b).target,
														i = this._dropTarget;
													this._dropTarget = h, b !== h && (i && h !== i && this.dispatchToElement(d(i, a), "dragleave", a.event), h && h !== i && this.dispatchToElement(d(h, a), "dragenter", a.event))
												}
											},
											_dragEnd: function(a) {
												var b = this._draggingTarget;
												b && (b.dragging = !1), this.dispatchToElement(d(b, a), "dragend", a.event), this._dropTarget && this.dispatchToElement(d(this._dropTarget, a), "drop", a.event), this._draggingTarget = null, this._dropTarget = null
											}
										}, a.exports = c
									}, function(a, b, c) {
										function d(a, b, c, d, e, f, g, h, i, j, o) {
											var r = i * (n / 180),
												s = m(r) * (a - c) / 2 + l(r) * (b - d) / 2,
												t = -1 * l(r) * (a - c) / 2 + m(r) * (b - d) / 2,
												u = s * s / (g * g) + t * t / (h * h);
											u > 1 && (g *= k(u), h *= k(u));
											var v = (e === f ? -1 : 1) * k((g * g * (h * h) - g * g * (t * t) - h * h * (s * s)) / (g * g * (t * t) + h * h * (s * s))) || 0,
												w = v * g * t / h,
												x = v * -h * s / g,
												y = (a + c) / 2 + m(r) * w - l(r) * x,
												z = (b + d) / 2 + l(r) * w + m(r) * x,
												A = q([1, 0], [(s - w) / g, (t - x) / h]),
												B = [(s - w) / g, (t - x) / h],
												C = [(-1 * s - w) / g, (-1 * t - x) / h],
												D = q(B, C);
											p(B, C) <= -1 && (D = n), p(B, C) >= 1 && (D = 0), 0 === f && D > 0 && (D -= 2 * n), 1 === f && 0 > D && (D += 2 * n), o.addData(j, y, z, g, h, A, D, r, f)
										}

										function e(a) {
											if(!a) return [];
											var b, c = a.replace(/-/g, " -").replace(/  /g, " ").replace(/ /g, ",").replace(/,,/g, ",");
											for(b = 0; b < j.length; b++) c = c.replace(new RegExp(j[b], "g"), "|" + j[b]);
											var e, f = c.split("|"),
												g = 0,
												i = 0,
												k = new h,
												l = h.CMD;
											for(b = 1; b < f.length; b++) {
												var m, n = f[b],
													o = n.charAt(0),
													p = 0,
													q = n.slice(1).replace(/e,-/g, "e-").split(",");
												q.length > 0 && "" === q[0] && q.shift();
												for(var r = 0; r < q.length; r++) q[r] = parseFloat(q[r]);
												for(; p < q.length && !isNaN(q[p]) && !isNaN(q[0]);) {
													var s, t, u, v, w, x, y, z = g,
														A = i;
													switch(o) {
														case "l":
															g += q[p++], i += q[p++], m = l.L, k.addData(m, g, i);
															break;
														case "L":
															g = q[p++], i = q[p++], m = l.L, k.addData(m, g, i);
															break;
														case "m":
															g += q[p++], i += q[p++], m = l.M, k.addData(m, g, i), o = "l";
															break;
														case "M":
															g = q[p++], i = q[p++], m = l.M, k.addData(m, g, i), o = "L";
															break;
														case "h":
															g += q[p++], m = l.L, k.addData(m, g, i);
															break;
														case "H":
															g = q[p++], m = l.L, k.addData(m, g, i);
															break;
														case "v":
															i += q[p++], m = l.L, k.addData(m, g, i);
															break;
														case "V":
															i = q[p++], m = l.L, k.addData(m, g, i);
															break;
														case "C":
															m = l.C, k.addData(m, q[p++], q[p++], q[p++], q[p++], q[p++], q[p++]), g = q[p - 2], i = q[p - 1];
															break;
														case "c":
															m = l.C, k.addData(m, q[p++] + g, q[p++] + i, q[p++] + g, q[p++] + i, q[p++] + g, q[p++] + i), g += q[p - 2], i += q[p - 1];
															break;
														case "S":
															s = g, t = i;
															var B = k.len(),
																C = k.data;
															e === l.C && (s += g - C[B - 4], t += i - C[B - 3]), m = l.C, z = q[p++], A = q[p++], g = q[p++], i = q[p++], k.addData(m, s, t, z, A, g, i);
															break;
														case "s":
															s = g, t = i;
															var B = k.len(),
																C = k.data;
															e === l.C && (s += g - C[B - 4], t += i - C[B - 3]), m = l.C, z = g + q[p++], A = i + q[p++], g += q[p++], i += q[p++], k.addData(m, s, t, z, A, g, i);
															break;
														case "Q":
															z = q[p++], A = q[p++], g = q[p++], i = q[p++], m = l.Q, k.addData(m, z, A, g, i);
															break;
														case "q":
															z = q[p++] + g, A = q[p++] + i, g += q[p++], i += q[p++], m = l.Q, k.addData(m, z, A, g, i);
															break;
														case "T":
															s = g, t = i;
															var B = k.len(),
																C = k.data;
															e === l.Q && (s += g - C[B - 4], t += i - C[B - 3]), g = q[p++], i = q[p++], m = l.Q, k.addData(m, s, t, g, i);
															break;
														case "t":
															s = g, t = i;
															var B = k.len(),
																C = k.data;
															e === l.Q && (s += g - C[B - 4], t += i - C[B - 3]), g += q[p++], i += q[p++], m = l.Q, k.addData(m, s, t, g, i);
															break;
														case "A":
															u = q[p++], v = q[p++], w = q[p++], x = q[p++], y = q[p++], z = g, A = i, g = q[p++], i = q[p++], m = l.A, d(z, A, g, i, x, y, u, v, w, m, k);
															break;
														case "a":
															u = q[p++], v = q[p++], w = q[p++], x = q[p++], y = q[p++], z = g, A = i, g += q[p++], i += q[p++], m = l.A, d(z, A, g, i, x, y, u, v, w, m, k)
													}
												}
												"z" !== o && "Z" !== o || (m = l.Z, k.addData(m)), e = m
											}
											return k.toStatic(), k
										}

										function f(a, b) {
											var c = e(a);
											return b = b || {}, b.buildPath = function(a) {
												if(a.setData) {
													a.setData(c.data);
													var b = a.getContext();
													b && a.rebuildPath(b)
												} else {
													var b = a;
													c.rebuildPath(b)
												}
											}, b.applyTransform = function(a) {
												i(c, a), this.dirty(!0)
											}, b
										}
										var g = c(8),
											h = c(27),
											i = c(186),
											j = ["m", "M", "l", "L", "v", "V", "h", "H", "z", "Z", "c", "C", "q", "Q", "t", "T", "s", "S", "a", "A"],
											k = Math.sqrt,
											l = Math.sin,
											m = Math.cos,
											n = Math.PI,
											o = function(a) {
												return Math.sqrt(a[0] * a[0] + a[1] * a[1])
											},
											p = function(a, b) {
												return(a[0] * b[0] + a[1] * b[1]) / (o(a) * o(b))
											},
											q = function(a, b) {
												return(a[0] * b[1] < a[1] * b[0] ? -1 : 1) * Math.acos(p(a, b))
											};
										a.exports = {
											createFromString: function(a, b) {
												return new g(f(a, b))
											},
											extendFromString: function(a, b) {
												return g.extend(f(a, b))
											},
											mergePath: function(a, b) {
												for(var c = [], d = a.length, e = 0; d > e; e++) {
													var f = a[e];
													f.path || f.createPathProxy(), f.__dirtyPath && f.buildPath(f.path, f.shape, !0), c.push(f.path)
												}
												var h = new g(b);
												return h.createPathProxy(), h.buildPath = function(a) {
													a.appendPath(c);
													var b = a.getContext();
													b && a.rebuildPath(b)
												}, h
											}
										}
									}, function(a, b, c) {
										function d(a, b) {
											var c, d, f, k, l, m, n = a.data,
												o = e.M,
												p = e.C,
												q = e.L,
												r = e.R,
												s = e.A,
												t = e.Q;
											for(f = 0, k = 0; f < n.length;) {
												switch(c = n[f++], k = f, d = 0, c) {
													case o:
														d = 1;
														break;
													case q:
														d = 1;
														break;
													case p:
														d = 3;
														break;
													case t:
														d = 2;
														break;
													case s:
														var u = b[4],
															v = b[5],
															w = i(b[0] * b[0] + b[1] * b[1]),
															x = i(b[2] * b[2] + b[3] * b[3]),
															y = j(-b[1] / x, b[0] / w);
														n[f] *= w, n[f++] += u, n[f] *= x, n[f++] += v, n[f++] *= w, n[f++] *= x, n[f++] += y, n[f++] += y, f += 2, k = f;
														break;
													case r:
														m[0] = n[f++], m[1] = n[f++], g(m, m, b), n[k++] = m[0], n[k++] = m[1], m[0] += n[f++], m[1] += n[f++], g(m, m, b), n[k++] = m[0], n[k++] = m[1]
												}
												for(l = 0; d > l; l++) {
													var m = h[l];
													m[0] = n[f++], m[1] = n[f++], g(m, m, b), n[k++] = m[0], n[k++] = m[1]
												}
											}
										}
										var e = c(27).CMD,
											f = c(6),
											g = f.applyTransform,
											h = [
												[],
												[],
												[]
											],
											i = Math.sqrt,
											j = Math.atan2;
										a.exports = d
									}])
							});