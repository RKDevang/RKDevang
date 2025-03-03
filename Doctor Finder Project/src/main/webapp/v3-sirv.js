/*window.Sirv || (() => {
	"use strict";
	var t, e, s, o, n = {
			1302: (t, e, i) => {
				i.d(e, {
					A: () => wt
				});
				var s = i(4248),
					o = i(1532),
					n = i(7678),
					a = i(388),
					h = i(2112),
					r = i(9060);
				const l = class {
					constructor(t) {
						this.$J_TYPE = "event.custom", this.magicEvent = "event" === t.$J_TYPE ? t : t.magicEvent, this.type = this.magicEvent.type, this._target = null, this.x = this.magicEvent.oe.x, this.y = this.magicEvent.oe.y, this.timeStamp = this.magicEvent.oe.timeStamp, this.relatedTarget = this.magicEvent.related, this.isQueueStopped = this.magicEvent.isQueueStopped, this.events = []
					}
					get originEvent() {
						return this.magicEvent.originEvent
					}
					pushToEvents(t) {
						const e = t;
						this.events.push(e)
					}
					stop() {
						return this.stopDistribution().stopDefaults()
					}
					stopDistribution() {
						return this.events.forEach((t => {
							try {
								t.stopDistribution()
							} catch (t) {}
						})), this
					}
					stopDefaults() {
						return this.events.forEach((t => {
							try {
								t.stopDefaults()
							} catch (t) {}
						})), this
					}
					stopQueue() {
						return this.isQueueStopped = () => !0, this.magicEvent.stopQueue(), this
					}
					get clientXY() {
						return {
							x: this.clientX || this.magicEvent.oe.clientX,
							y: this.clientY || this.magicEvent.oe.clientY
						}
					}
					get pageXY() {
						return {
							x: this.x,
							y: this.y
						}
					}
					get target() {
						return this._target || this.magicEvent.oe.target
					}
					get related() {
						return this.relatedTarget
					}
					get button() {
						return this.magicEvent.button
					}
					get originalTarget() {
						if (this.events.length > 0) return this.events[0].target
					}
					isTouchEvent() {
						return this.magicEvent.isTouchEvent()
					}
					isPrimaryTouch() {
						return this.magicEvent.isPrimaryTouch()
					}
					get primaryTouch() {
						return this.magicEvent.primaryTouch
					}
					get primaryTouchId() {
						return this.magicEvent.primaryTouchId
					}
				};
				class d extends l {
					constructor(t, e) {
						super(t), ({
							x: this.x,
							y: this.y
						} = t.pageXY), this.type = "btnclick", this.clientX = t.oe.clientX, this.clientY = t.oe.clientY, this._target = e.node, this.pushToEvents(t)
					}
				}
				const c = {
						threshold: 300,
						button: 1
					},
					p = function(t) {
						t.stopDefaults()
					},
					u = function(t) {
						const e = this.fetch("event:btnclick:options");
						if ("dblclick" !== t.type && t.button !== e.button) return;
						if (this.fetch("event:btnclick:ignore")) return void this.del("event:btnclick:ignore");
						let i;
						if ("mousedown" === t.type) i = new d(t, this), this.store("event:btnclick:btnclickEvent", i);
						else if ("mouseup" === t.type) {
							if (i = this.fetch("event:btnclick:btnclickEvent"), !i) return;
							const s = t.pageXY;
							this.del("event:btnclick:btnclickEvent"), i.pushToEvents(t), t.timeStamp - i.timeStamp <= e.threshold && Math.sqrt(Math.pow(s.x - i.x, 2) + Math.pow(s.y - i.y, 2)) <= 5 && this.callEvent("btnclick", i), wt(document).callEvent("mouseup", t)
						} else "dblclick" === t.type && (i = new d(t, this), this.callEvent("btnclick", i))
					},
					m = {
						add: function(t) {
							this.store("event:btnclick:options", Object.assign({}, c, t || {})), this.addEvent(["mousedown", "mouseup"], u, 1).addEvent("click", p, 1)
						},
						remove: function() {
							this.removeEvent(["mousedown", "mouseup"], u).removeEvent("click", p)
						}
					};
				class g extends l {
					constructor(t, e) {
						super(t), ({
							x: this.x,
							y: this.y
						} = t.pageXY), this.type = "dblbtnclick", this.clientX = t.clientX, this.clientY = t.clientY, this._target = e.node, this.timedout = !1, this.tm = null, this.pushToEvents(t)
					}
				}
				const v = {
						threshold: 200
					},
					f = function(t) {
						let e = this.fetch("event:dblbtnclick:event");
						if (e) clearTimeout(e.tm), this.del("event:dblbtnclick:event"), e.timedout || (e.pushToEvents(t), t.stopQueue().stop(), this.callEvent("dblbtnclick", e));
						else {
							const i = this.fetch("event:dblbtnclick:options");
							e = new g(t, this), e.tm = setTimeout((() => {
								e.timedout = !0, t.isQueueStopped = () => !1, this.callEvent("btnclick", t), this.del("event:dblbtnclick:event")
							}), i.threshold + 10), this.store("event:dblbtnclick:event", e), t.stopQueue()
						}
					},
					y = {
						add: function(t) {
							this.store("event:dblbtnclick:options", Object.assign({}, v, t || {})), this.addEvent("btnclick", f, 1)
						},
						remove: function() {
							this.removeEvent("btnclick", f)
						}
					};
				class S extends l {
					constructor(t, e) {
						super(t);
						const i = t.primaryTouch;
						this.type = "tap", this.id = i.pointerId || i.identifier, this.x = i.pageX, this.y = i.pageY, this.pageX = i.pageX, this.pageY = i.pageY, this.clientX = i.clientX, this.clientY = i.clientY, this._target = e.node, this.pushToEvents(t)
					}
					get button() {
						return 0
					}
				}
				const w = function(t) {
						t.stopDefaults()
					},
					b = function(t) {
						t.isPrimaryTouch() ? (this.store("event:tap:event", new S(t, this)), this.store("event:btnclick:ignore", !0)) : this.del("event:tap:event")
					},
					A = function(t) {
						const e = this.fetch("event:tap:event");
						e && t.isPrimaryTouch() && (this.del("event:tap:event"), e.id === t.primaryTouchId && t.timeStamp - e.timeStamp <= 200 && Math.sqrt(Math.pow(t.primaryTouch.pageX - e.x, 2) + Math.pow(t.primaryTouch.pageY - e.y, 2)) <= 10 && (this.del("event:btnclick:btnclickEvent"), t.stop(), e.pushToEvents(t), this.callEvent("tap", e)))
					},
					x = {
						add: function(t) {
							this.addEvent(["touchstart", "pointerdown"], b, 1).addEvent(["touchend", "pointerup"], A, 1).addEvent("click", w, 1)
						},
						remove: function() {
							this.removeEvent(["touchstart", "pointerdown"], b).removeEvent(["touchend", "pointerup"], A).removeEvent("click", w)
						}
					};
				class z extends l {
					constructor(t, e) {
						super(t), this.type = "dbltap", this.x = t.x, this.y = t.y, this.clientX = t.clientX, this.clientY = t.clientY, this._target = e.node, this.timedout = !1, this.tm = null, this.pushToEvents(t)
					}
				}
				const C = {
						threshold: 300
					},
					I = function(t) {
						let e = this.fetch("event:dbltap:event");
						if (e) clearTimeout(e.tm), this.del("event:dbltap:event"), e.timedout || (e.pushToEvents(t), t.stopQueue().stop(), this.callEvent("dbltap", e));
						else {
							const i = this.fetch("event:dbltap:options");
							e = new z(t, this), e.tm = setTimeout((() => {
								e.timedout = !0, t.isQueueStopped = () => !1, this.callEvent("tap", t)
							}), i.threshold + 10), this.store("event:dbltap:event", e), t.stopQueue()
						}
					},
					E = {
						add: function(t) {
							this.store("event:dbltap:options", Object.assign(JSON.parse(JSON.stringify(C)), t || {})), this.addEvent("tap", I, 1)
						},
						remove: function() {
							this.removeEvent("tap", I)
						}
					};
				class P extends l {
					constructor(t, e, i) {
						super(t), ({
							x: this.x,
							y: this.y
						} = t.pageXY), this.type = "mousedrag", this.clientX = t.clientX, this.clientY = t.clientY, this._target = e.node, this.state = i, this.dragged = !1, this.pushToEvents(t)
					}
				}
				const N = function(t) {
						if (1 !== t.button) return;
						const e = new P(t, this, "dragstart");
						this.store("event:mousedrag:dragstart", e)
					},
					O = function(t) {
						let e = this.fetch("event:mousedrag:dragstart");
						e && (t.stopDefaults(), e = new P(t, this, "dragend"), this.del("event:mousedrag:dragstart"), this.callEvent("mousedrag", e))
					},
					T = function(t) {
						let e = this.fetch("event:mousedrag:dragstart");
						e && (t.stopDefaults(), e.dragged || (e.dragged = !0, this.callEvent("mousedrag", e)), e = new P(t, this, "dragmove"), this.callEvent("mousedrag", e))
					},
					D = {
						add: function() {
							const t = T.bind(this),
								e = O.bind(this);
							this.addEvent("mousedown", N, 1).addEvent("mouseup", O, 1), wt(document).addEvent("mousemove", t, 1).addEvent("mouseup", e, 1), this.store("event:mousedrag:listeners:document:move", t), this.store("event:mousedrag:listeners:document:end", e)
						},
						remove: function() {
							const t = () => {};
							this.removeEvent("mousedown", N).removeEvent("mouseup", O), wt(document).removeEvent("mousemove", this.fetch("event:mousedrag:listeners:document:move") || t).removeEvent("mouseup", this.fetch("event:mousedrag:listeners:document:end") || t), this.del("event:mousedrag:listeners:document:move").del("event:mousedrag:listeners:document:end")
						}
					};
				let M, k, _ = "wheel";
				"onwheel" in document || (_ = "mousewheel");
				class L extends l {
					constructor(t, e, i, s, o, n, a) {
						super(t), ({
							x: this.x,
							y: this.y
						} = t.pageXY), this.type = "mousescroll", this._target = e.node, this.delta = i || 0, this.deltaX = s || 0, this.deltaY = o || 0, this.deltaZ = n || 0, this.deltaFactor = a || 0, this.deltaMode = t.deltaMode || 0, this.isMouse = !1, this.pushToEvents(t)
					}
				}
				const F = () => {
						M = null
					},
					B = function(t) {
						let e = 0,
							i = 0;
						const s = t.originEvent;
						if (s.detail && (i = -1 * t.detail), void 0 !== s.wheelDelta && (i = s.wheelDelta), void 0 !== s.wheelDeltaY && (i = s.wheelDeltaY), void 0 !== s.wheelDeltaX && (e = -1 * s.wheelDeltaX), s.deltaY && (i = -1 * s.deltaY), s.deltaX && (e = s.deltaX), 0 === i && 0 === e) return;
						let n = 0 === i ? e : i;
						const a = Math.max(Math.abs(i), Math.abs(e));
						(!M || a < M) && (M = a);
						const h = n > 0 ? Math.floor : Math.ceil;
						n = h(n / M), e = h(e / M), i = h(i / M), k && clearTimeout(k), k = setTimeout(F, 200);
						const r = new L(t, this, n, e, i, 0, M);
						var l, d;
						r.isMouse = (l = M, d = s.deltaMode || 0, l > 50 || 1 === d && !("win" === o.A.platform && l < 1) || l % 12 == 0 || l % 4.000244140625 == 0), this.callEvent("mousescroll", r)
					},
					R = {
						add: function() {
							this.addEvent(_, B, 1)
						},
						remove: function() {
							this.removeEvent(_, B, 1)
						}
					};
				let H = null;
				const U = (t, e) => {
						const i = e.x - t.x,
							s = e.y - t.y;
						return Math.sqrt(i * i + s * s)
					},
					j = (t, e) => {
						let i;
						const s = t.originEvent;
						return s.targetTouches && s.changedTouches ? (i = s.targetTouches ? s.targetTouches : s.changedTouches, i = Array.prototype.slice.call(i)) : (i = [], e && e.forEach((t => {
							i.push(t)
						}))), i
					},
					V = (t, e, i) => !(!t.pointerId || "touch" !== t.pointerType || i && !e.has(t.pointerId) || (e.set(t.pointerId, t), 0)),
					$ = t => t.pointerId && "touch" === t.pointerType ? t.pointerId : t.identifier,
					W = (t, e) => {
						let i = !1;
						for (let s = 0; s < t.length && 2 !== e.length; s++) {
							const o = $(t[s]);
							e.includes(o) || (e.push(o), i = !0)
						}
						return i
					},
					Z = (t, e) => {
						let i = !1;
						if (e) {
							const s = (t => t.map((t => $(t))))(t);
							for (let t = 0; t < e.length; t++)
								if (!s.includes(e[t])) {
									e.splice(t, 1), i = !0;
									break
								}
						}
						return i
					},
					X = (t, e) => {
						const i = [];
						for (let s = 0; s < t.length && (!e.includes($(t[s])) || (i.push(t[s]), 2 !== i.length)); s++);
						return i
					},
					G = t => {
						const e = t.fetch("event:pinch:target");
						e && e.removeEvent(["touchend"], t.fetch("event:pinch:listeners:document:end")), t.del("event:pinch:target")
					},
					Y = t => {
						const e = t.fetch("event:pinch:cache");
						e && e.clear(), t.del("event:pinch:cache")
					};
				class q extends l {
					constructor(t, e, i, s) {
						super(t), this.type = "pinch", this._target = e.node, this.state = i, this.x = s.x, this.y = s.y, this.scale = s.scale, this.space = s.space, this.zoom = s.zoom, this.state = i, this.centerPoint = s.centerPoint, this.points = s.points, this.pushToEvents(t)
					}
				}
				const Q = {
						x: 0,
						y: 0,
						space: 0,
						scale: 1,
						zoom: 0,
						startSpace: 0,
						startScale: 1,
						started: !1,
						dragged: !1,
						points: [],
						centerPoint: {
							x: 0,
							y: 0
						}
					},
					J = (t, e) => {
						const i = e.space;
						t.length > 1 ? (e.space = ((t, e) => {
							const i = Array.prototype.slice.call(t),
								s = Math.abs(i[1].pageX - i[0].pageX),
								o = Math.abs(i[1].pageY - i[0].pageY),
								n = Math.min(i[1].pageX, i[0].pageX) + s / 2,
								a = Math.min(i[1].pageY, i[0].pageY) + o / 2;
							let h = 0;
							return e.points = [i[0], i[1]], h = Math.pow(U({
								x: i[0].pageX,
								y: i[0].pageY
							}, {
								x: i[1].pageX,
								y: i[1].pageY
							}), 2), e.centerPoint = {
								x: n,
								y: a
							}, e.x = e.centerPoint.x, e.y = e.centerPoint.y, h
						})(t, e), e.startSpace || (e.startSpace = e.space), i > e.space ? e.zoom = -1 : i < e.space ? e.zoom = 1 : e.zoom = 0, e.scale = e.space / H) : e.points = []
					},
					K = function(t) {
						let e, i = this.fetch("event:pinch:variables");
						const s = this.fetch("event:pinch:cache"),
							o = this.fetch("event:pinch:activepoints");
						if (i || (i = JSON.parse(JSON.stringify(Q))), i.started) {
							if (t.pointerId && !V(t, s, !0)) return;
							t.stop(), J(X(j(t, s), o), i), e = new q(t, this, "pinchmove", i), this.callEvent("pinch", e)
						}
					},
					tt = function(t) {
						let e, i, s = this.fetch("event:pinch:cache"),
							o = this.fetch("event:pinch:activepoints");
						if ("mouse" === t.pointerType) return;
						o || (o = [], this.store("event:pinch:activepoints", o)), s || (s = new Map, this.store("event:pinch:cache", s)), this.fetch("event:pinch:target") || (this.store("event:pinch:target", wt(t.target)), wt(t.target).addEvent(["touchend"], this.fetch("event:pinch:listeners:document:end"), 1)), V(t, s);
						const n = j(t, s);
						W(n, o), 2 === n.length && (e = this.fetch("event:pinch:pinchstart"), i = this.fetch("event:pinch:variables"), i || (i = JSON.parse(JSON.stringify(Q))), J(X(n, o), i), e || (e = new q(t, this, "pinchstart", i), this.store("event:pinch:pinchstart", e), this.store("event:pinch:variables", i), H = i.space, this.callEvent("pinch", e), i.started = !0))
					},
					et = function(t) {
						const e = this.fetch("event:pinch:cache");
						if ("mouse" === t.pointerType || t.pointerId && (!e || !e.has(t.pointerId))) return;
						let i = this.fetch("event:pinch:pinchstart");
						const s = this.fetch("event:pinch:variables"),
							o = this.fetch("event:pinch:activepoints"),
							n = j(t, e);
						((t, e) => {
							t.pointerId && "touch" === t.pointerType && e && e.has(t.pointerId) && e.delete(t.pointerId)
						})(t, e);
						const a = Z(n, o);
						if (!(i && s && s.started && a && o)) return;
						a && W(n, o);
						let h = "pinchend";
						n.length > 1 ? h = "pinchresize" : (this.del("event:pinch:pinchstart").del("event:pinch:variables").del("event:pinch:activepoints"), Y(this), G(this)), J(X(n, o), s), i = new q(t, this, h, s), this.callEvent("pinch", i)
					},
					it = {
						add: function(t) {
							H || (H = (() => {
								const t = wt(window).size;
								return t.width = Math.min(t.width, t.height), t.height = t.width, Math.pow(U({
									x: 0,
									y: 0
								}, {
									x: t.width,
									y: t.height
								}), 2)
							})());
							const e = K.bind(this),
								i = et.bind(this);
							this.addEvent(["touchstart", "pointerdown"], tt, 1).addEvent(["pointerup"], et, 1).addEvent(["touchmove", "pointermove"], K, 1), this.store("event:pinch:listeners:document:move", e), this.store("event:pinch:listeners:document:end", i), wt(document).addEvent("pointermove", e, 1).addEvent("pointerup", i, 1)
						},
						remove: function() {
							this.removeEvent(["touchstart", "pointerdown"], tt).removeEvent(["pointerup"], et).removeEvent(["touchmove", "pointermove"], K);
							const t = () => {};
							wt(document).removeEvent("pointermove", this.fetch("event:pinch:listeners:document:move") || t, 1).removeEvent("pointerup", this.fetch("event:pinch:listeners:document:end") || t, 1), this.del("event:pinch:listeners:document:move").del("event:pinch:listeners:document:end"), G(this), Y(this), this.del("event:pinch:variables").del("event:pinch:activepoints").del("event:pinch:pinchstart")
						}
					};
				class st extends l {
					constructor(t, e, i) {
						super(t);
						const s = t.primaryTouch;
						this.type = "touchdrag", this.id = s.pointerId || s.identifier, this.clientX = s.clientX, this.clientY = s.clientY, this.pageX = s.pageX, this.pageY = s.pageY, this.x = s.pageX, this.y = s.pageY, this._target = e.node, this.state = i, this.dragged = !1, this.pushToEvents(t)
					}
					get button() {
						return 0
					}
				}
				const ot = function(t) {
						if (!t.isPrimaryTouch()) return;
						const e = new st(t, this, "dragstart");
						this.store("event:touchdrag:dragstart", e)
					},
					nt = function(t) {
						let e = this.fetch("event:touchdrag:dragstart");
						e && e.dragged && e.id === t.primaryTouchId && (e = new st(t, this, "dragend"), this.del("event:touchdrag:dragstart"), this.callEvent("touchdrag", e))
					},
					at = function(t) {
						let e = this.fetch("event:touchdrag:dragstart");
						e && t.isPrimaryTouch() && (e.id === t.primaryTouchId ? (!e.dragged && Math.sqrt(Math.pow(t.primaryTouch.pageX - e.x, 2) + Math.pow(t.primaryTouch.pageY - e.y, 2)) > 10 && (e.dragged = !0, this.callEvent("touchdrag", e)), e.dragged && (e = new st(t, this, "dragmove"), this.callEvent("touchdrag", e))) : this.del("event:touchdrag:dragstart"))
					},
					ht = {
						btnclick: m,
						dblbtnclick: y,
						tap: x,
						dbltap: E,
						mousedrag: D,
						mousescroll: R,
						pinch: it,
						touchdrag: {
							add: function() {
								const t = at.bind(this),
									e = nt.bind(this);
								this.addEvent(["touchstart", "pointerdown"], ot, 1).addEvent(["touchend", "pointerup"], nt, 1).addEvent(["touchmove", "pointermove"], at, 1), this.store("event:touchdrag:listeners:document:move", t), this.store("event:touchdrag:listeners:document:end", e), wt(document).addEvent("pointermove", t, 1).addEvent("pointerup", e, 1)
							},
							remove: function() {
								const t = () => {};
								this.removeEvent(["touchstart", "pointerdown"], ot).removeEvent(["touchend", "pointerup"], nt).removeEvent(["touchmove", "pointermove"], at), wt(document).removeEvent("pointermove", this.fetch("event:touchdrag:listeners:document:move") || t, 1).removeEvent("pointerup", this.fetch("event:touchdrag:listeners:document:end") || t, 1), this.del("event:touchdrag:listeners:document:move").del("event:touchdrag:listeners:document:end")
							}
						}
					},
					rt = class {
						constructor(t) {
							this.node = t, this.$J_UUID = (0, n.A)(this), this.$J_TYPE = null, this.$J_EXT = () => {}, s.O3.set(this.node, this)
						}
						fetch(t, e) {
							var i;
							const s = (0, a.c7)(this.$J_UUID);
							return s.has(t) || void 0 === e || s.set(t, e), null != (i = s.get(t)) ? i : null
						}
						store(t, e) {
							return (0, a.c7)(this.$J_UUID).set(t, e), this
						}
						del(t) {
							return (0, a.c7)(this.$J_UUID).delete(t), this
						}
						addEvent(t, e, i, n) {
							if (void 0 === n && (n = {}), Array.isArray(t)) return t.forEach((t => {
								this.addEvent(t, e, i, n)
							})), this;
							const a = s.xW[t] || t;
							if (!a || !e || !(0, r.A)(a) || "function" !== (0, h.A)(e)) return this;
							if ("domready" === a && o.A.ready) return e(), this;
							i = parseInt(i || 50, 10), e.$J_EUID || (e.$J_EUID = Math.floor(Math.random() * +new Date));
							const l = this.fetch("_EVENTS_", {});
							let d = l[a];
							d || (d = [], l[a] = d, ht[a] ? ht[a].add.call(this, n) : (d.handle = t => {
								t = Object.assign(t || window.e, {
									$J_TYPE: "event"
								}), this.callEvent(a, wt(t))
							}, this.node.addEventListener(a, d.handle, n)));
							const c = {
								type: a,
								fn: e,
								priority: i,
								euid: e.$J_EUID
							};
							return d.push(c), d.sort(((t, e) => t.priority - e.priority)), this
						}
						removeEvent() {
							for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++) e[i] = arguments[i];
							const o = e.length > 1 ? e[1] : -100;
							if (Array.isArray(e[0])) return e[0].forEach((t => {
								this.removeEvent(t, o)
							})), this;
							const n = s.xW[e[0]] || e[0],
								a = this.fetch("_EVENTS_", {});
							if (!(n && (0, r.A)(n) && a && a[n])) return this;
							const h = a[n] || [];
							for (let t = 0; t < h.length; t++) {
								const e = h[t];
								(-100 === o || o && o.$J_EUID === e.euid) && h.splice(t--, 1)
							}
							return 0 === h.length && (ht[n] ? ht[n].remove.call(this) : this.node.removeEventListener(n, h.handle, !1), delete a[n]), this
						}
						callEvent(t, e) {
							const i = this.fetch("_EVENTS_", {}),
								o = s.xW[t] || t;
							if (o && (0, r.A)(o) && i && i[o]) {
								try {
									e && e.type || (e = Object.assign(e || {}, {
										type: o
									}))
								} catch (t) {}
								void 0 === e.timeStamp && (e.timeStamp = Date.now());
								const t = i[o] || [];
								for (let i = 0; i < t.length && (!e.isQueueStopped || !e.isQueueStopped()); i++) t[i].fn.call(this, e)
							}
						}
						clearEvents() {
							const t = this.fetch("_EVENTS_");
							return t ? (Object.keys(t).forEach((t => {
								this.removeEvent(t)
							})), this.del("_EVENTS_"), this) : this
						}
					},
					lt = class extends rt {
						constructor(t) {
							super(t), this.$J_TYPE = "magicjs-" + (t === window ? "window" : "document")
						}
						get size() {
							return o.A.touchScreen ? {
								width: window.innerWidth,
								height: window.innerHeight
							} : {
								width: o.A.doc.clientWidth,
								height: o.A.doc.clientHeight
							}
						}
						get scroll() {
							return {
								x: window.pageXOffset || o.A.doc.scrollLeft,
								y: window.pageYOffset || o.A.doc.scrollTop
							}
						}
						get fullSize() {
							return {
								width: Math.max(o.A.doc.scrollWidth, this.size.width),
								height: Math.max(o.A.doc.scrollHeight, this.size.height)
							}
						}
					},
					dt = t => {
						if (!(t in document.documentElement.style)) {
							const e = o.A.cssDomPrefix + t.charAt(0).toUpperCase() + t.slice(1);
							if (e in document.documentElement.style) return e
						}
						return t
					};
				var ct = i(5197);
				const pt = /^(border(Top|Bottom|Left|Right)Width)|((padding|margin)(Top|Bottom|Left|Right))$/,
					ut = {},
					mt = {
						aspectRatio: !0,
						fontWeight: !0,
						lineHeight: !0,
						opacity: !0,
						zIndex: !0,
						zoom: !0
					},
					gt = /\S+/g,
					vt = t => Array.isArray(t) ? t : (0, r.A)(t) && t.match(gt) || [],
					ft = class extends rt {
						constructor(t) {
							super(t), this.$J_TYPE = "magicjs-element"
						}
						requestFullScreen() {
							o.A.fullScreen.capable && !document.requestFullScreen ? o.A.fullScreen.request(this.node) : this.node.requestFullScreen(this.node)
						}
						addClass(t) {
							const e = vt(t);
							return e.length && this.node.classList.add(...e), this
						}
						removeClass(t) {
							const e = vt(t);
							return e.length && this.node.classList.remove(...e), this
						}
						getCss(t) {
							const e = (0, ct.A)(t);
							ut[e] || (ut[e] = dt(e)), t = ut[e];
							let i = ((t, e) => {
								const i = window.getComputedStyle(t, null);
								return i ? i.getPropertyValue(e) || i[e] : null
							})(this.node, t);
							if ("auto" === i && (i = null), null !== i) {
								if ("opacity" === t) return i ? parseFloat(i) : 1;
								pt.test(t) && (i = parseInt(i, 10) ? i : "0px")
							}
							return i
						}
						setCssProp(t, e) {
							const i = (0, ct.A)(t);
							try {
								ut[i] || (ut[i] = dt(i)), t = ut[i], this.node.style[t] = e + ("number" !== (0, h.A)(e) || mt[i] ? "" : "px")
							} catch (t) {}
							return this
						}
						setCss(t) {
							return Object.entries(t).forEach((t => {
								this.setCssProp(...t)
							})), this
						}
						getStyles() {
							for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++) e[i] = arguments[i];
							return Object.fromEntries(e.map((t => [t, this.getCss(t)])))
						}
						setProps(t) {
							return Object.entries(t).forEach((t => {
								t[1] = "" + t[1], "class" === t[0] ? this.addClass(t[1]) : this.node.setAttribute(...t)
							})), this
						}
						get size() {
							return {
								width: this.node.offsetWidth,
								height: this.node.offsetHeight
							}
						}
						render() {
							return this.size
						}
						getInnerSize(t) {
							const e = this.size;
							return e.width -= parseFloat(this.getCss("border-left-width") || 0) + parseFloat(this.getCss("border-right-width") || 0), e.height -= parseFloat(this.getCss("border-top-width") || 0) + parseFloat(this.getCss("border-bottom-width") || 0), t || (e.width -= parseFloat(this.getCss("padding-left") || 0) + parseFloat(this.getCss("padding-right") || 0), e.height -= parseFloat(this.getCss("padding-top") || 0) + parseFloat(this.getCss("padding-bottom") || 0)), e
						}
						get scroll() {
							return {
								top: this.node.scrollTop,
								left: this.node.scrollLeft
							}
						}
						get fullScroll() {
							let t = this.node;
							const e = {
								top: 0,
								left: 0
							};
							do {
								e.left += t.scrollLeft || 0, e.top += t.scrollTop || 0, t = t.parentNode
							} while (t);
							return e
						}
						get position() {
							const t = this.node.getBoundingClientRect(),
								e = wt(document).scroll,
								i = o.A.doc;
							return {
								top: t.top + e.y - i.clientTop,
								left: t.left + e.x - i.clientLeft
							}
						}
						get rect() {
							const t = this.position,
								e = this.size;
							return {
								top: t.top,
								bottom: t.top + e.height,
								left: t.left,
								right: t.left + e.width
							}
						}
						changeContent(t) {
							try {
								this.node.innerHTML = t
							} catch (e) {
								this.node.innerText = t
							}
							return this
						}
						remove() {
							return this.node.remove(), this
						}
						kill() {
							return Array.from(this.node.childNodes).forEach((t => {
								3 !== t.nodeType && 8 !== t.nodeType && wt(t).kill()
							})), s.O3.delete(this.node), this.remove(), this.clearEvents(), (0, a.uH)(this.$J_UUID), null
						}
						append(t, e) {
							void 0 === e && (e = "bottom");
							const i = this.node.firstChild;
							return t = wt(t), "top" === e && i ? this.node.insertBefore(t.node, i) : this.node.appendChild(t.node || t), this
						}
						appendTo(t, e) {
							return wt(t).append(this, e), this
						}
						get tagName() {
							return this.node.tagName.toLowerCase()
						}
						attr(t, e) {
							let i = this;
							return null != e ? this.node.setAttribute(t, e) : (i = this.node.getAttribute(t), i && (0, r.A)(i) && "" !== i.trim() || (i = null)), i
						}
						removeAttr(t) {
							return this.node.removeAttribute(t), this
						}
						hasClass(t) {
							return this.node.classList.contains(t)
						}
						hasAttribute(t) {
							return this.node.hasAttribute(t)
						}
					},
					yt = class {
						constructor(t) {
							this.oe = t, this.$J_TYPE = "event", this.isQueueStopped = () => !1, this.type = this.oe.type, this.timeStamp = this.oe.timeStamp, this.propertyName = this.oe.propertyName, this.pointerType = this.oe.pointerType
						}
						get originEvent() {
							return this.oe
						}
						stop() {
							return this.stopDistribution().stopDefaults()
						}
						stopDistribution() {
							return this.oe.stopPropagation ? this.oe.stopPropagation() : this.oe.cancelBubble = !0, this
						}
						stopDefaults() {
							return this.oe.preventDefault ? this.oe.preventDefault() : this.oe.returnValue = !1, this
						}
						stopQueue() {
							return this.isQueueStopped = () => !0, this
						}
						get clientXY() {
							let t, e = {
								x: 0,
								y: 0
							};
							return t = /touch/i.test(this.type) ? this.oe.changedTouches[0] : this.oe, t && (e = {
								x: t.clientX,
								y: t.clientY
							}), e
						}
						get pageXY() {
							let t = this.oe;
							return /touch/i.test(this.type) && (t = this.oe.changedTouches[0]), t ? {
								x: t.pageX || t.clientX + o.A.doc.scrollLeft,
								y: t.pageY || t.clientY + o.A.doc.scrollTop
							} : {
								x: 0,
								y: 0
							}
						}
						get target() {
							let t = this.oe.target;
							for (t || (t = this.oe.srcElement); t && 3 === t.nodeType;) t = t.parentNode;
							return t
						}
						get related() {
							let t = null;
							switch (this.type) {
								case "mouseover":
								case "pointerover":
								case "MSPointerOver":
									t = this.oe.relatedTarget, t || (t = this.oe.fromElement);
									break;
								case "mouseout":
								case "pointerout":
								case "MSPointerOut":
									t = this.oe.relatedTarget, t || (t = this.oe.toElement);
									break;
								default:
									return t
							}
							try {
								for (; t && 3 === t.nodeType;) t = t.parentNode
							} catch (e) {
								t = null
							}
							return t
						}
						get button() {
							let t = this.oe.which;
							return this.oe.which || void 0 === this.oe.button || (t = 1 & this.oe.button ? 1 : 2 & this.oe.button ? 3 : 4 & this.oe.button ? 2 : 0), t
						}
						isTouchEvent() {
							return this.oe.pointerType && ("touch" === this.oe.pointerType || this.oe.pointerType === this.oe.MSPOINTER_TYPE_TOUCH) || /touch/i.test(this.type)
						}
						isPrimaryTouch() {
							return this.oe.pointerType ? ("touch" === this.oe.pointerType || this.oe.MSPOINTER_TYPE_TOUCH === this.oe.pointerType) && this.oe.isPrimary : this.oe instanceof window.TouchEvent && 1 === this.oe.changedTouches.length && (!this.oe.targetTouches.length || this.oe.targetTouches[0].identifier === this.oe.changedTouches[0].identifier)
						}
						get primaryTouch() {
							let t = null;
							return this.oe.pointerType ? !this.oe.isPrimary || "touch" !== this.oe.pointerType && this.oe.MSPOINTER_TYPE_TOUCH !== this.oe.pointerType || (t = this.oe) : this.oe instanceof window.TouchEvent && (t = this.oe.changedTouches[0]), t
						}
						get primaryTouchId() {
							let t = null;
							return this.oe.pointerType ? !this.oe.isPrimary || "touch" !== this.oe.pointerType && this.oe.MSPOINTER_TYPE_TOUCH !== this.oe.pointerType || (t = this.oe.pointerId) : this.oe instanceof window.TouchEvent && (t = this.oe.changedTouches[0].identifier), t
						}
					},
					St = t => {
						let e = t;
						switch ((0, h.A)(t)) {
							case "string":
								{
									const i = document.getElementById(t);
									e = i ? St(i) : null;
									break
								}
							case "window":
							case "document":
								e = s.O3.has(t) ? s.O3.get(t) : new lt(t);
								break;
							case "element":
								e = s.O3.has(t) ? s.O3.get(t) : new ft(t);
								break;
							case "event":
								e = new yt(t)
						}
						return e
					},
					wt = St
			},
			427: (t, e, i) => {
				i.d(e, {
					A: () => o
				});
				var s = i(1302);
				const o = (t, e, i) => (0, s.A)(document.createElement(t)).setProps(e || {}).setCss(i || {})
			},
			7678: (t, e, i) => {
				i.d(e, {
					A: () => o
				});
				let s = 0;
				const o = t => (t.$J_UUID || (t.$J_UUID = ++s), t.$J_UUID)
			},
			5197: (t, e, i) => {
				i.d(e, {
					A: () => s
				});
				const s = t => t.replace(/-\D/g, (t => t.charAt(1).toUpperCase()))
			},
			6488: (t, e, i) => {
				i.d(e, {
					A: () => y
				});
				var s = i(4248),
					o = i(7678),
					n = i(388),
					a = i(2112),
					h = i(1302),
					r = i(427),
					l = i(9060),
					d = i(1532);
				const c = d.A.constructableStylesheets ? (t, e, i, o) => {
						if (i || (i = s.y1), !s.XB.has(i)) {
							var n;
							const t = new CSSStyleSheet;
							s.XB.set(i, t), null != (n = o) && n.adoptedStyleSheets || (o = document), o.adoptedStyleSheets = [...o.adoptedStyleSheets, t]
						}(0, l.A)(e) || (e = Object.entries(e).map((t => t[0] + ":" + t[1])).join(";"));
						const a = s.XB.get(i);
						return a.insertRule(t + "{" + e + "}"), a.cssRules.length - 1
					} : (t, e, i, o) => {
						i || (i = s.y1);
						let n = document.head || document.body;
						o && (n = (0, h.A)(o).node || o);
						let a = (0, h.A)(n.querySelector("#" + i));
						a || (a = (0, r.A)("style").attr("id", i).attr("type", "text/css"), n.insertBefore(a.node, n.firstChild));
						const d = a.node.sheet || a.node.styleSheet;
						return (0, l.A)(e) || (e = Object.entries(e).map((t => t[0] + ":" + t[1])).join(";")), d.insertRule(t + " {" + e + "}", d.cssRules.length)
					},
					p = d.A.constructableStylesheets ? (t, e) => !!s.XB.has(t) && (s.XB.get(t).deleteRule(e), !0) : (t, e) => {
						const i = (0, h.A)(t);
						"element" === (0, a.A)(i) && (i.sheet || i.styleSheet).deleteRule(e)
					},
					u = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (t => {
						const e = 16 * Math.random() | 0;
						return ("x" === t ? e : 3 & e | 8).toString(16)
					})).toUpperCase(),
					m = t => new URL(t, document.baseURI).href,
					g = t => {
						let e = 0;
						const i = t.length;
						for (let s = 0; s < i; ++s) e = 31 * e + t.charCodeAt(s), e %= 4294967296;
						return e
					};
				var v = i(5197),
					f = i(1382);
				const y = {
					$uuid: o.A,
					getStorage: n.c7,
					typeOf: a.A,
					$: h.A,
					$new: r.A,
					addCSS: c,
					removeCSS: p,
					generateUUID: u,
					getAbsoluteURL: m,
					getHashCode: g,
					camelize: v.A,
					isObject: f.A,
					isString: l.A,
					DPPX: s.de,
					W: (0, h.A)(window),
					D: (0, h.A)(document),
					U: void 0
				}
			},
			1382: (t, e, i) => {
				i.d(e, {
					A: () => s
				});
				const s = t => null !== t && "object" == typeof t && t.constructor === Object
			},
			9060: (t, e, i) => {
				i.d(e, {
					A: () => s
				});
				const s = t => "string" == typeof t || t instanceof window.String
			},
			388: (t, e, i) => {
				i.d(e, {
					c7: () => o,
					uH: () => n
				});
				const s = new Map,
					o = t => (s.has(t) || s.set(t, new Map), s.get(t)),
					n = t => {
						s.has(t) && s.delete(t)
					}
			},
			2112: (t, e, i) => {
				i.d(e, {
					A: () => s
				});
				const s = t => {
					if (null == t) return !1;
					if (t.$J_TYPE) return t.$J_TYPE;
					if (t.nodeType) {
						if (1 === t.nodeType) return "element";
						if (3 === t.nodeType) return "textnode"
					}
					return t === window ? "window" : t === document ? "document" : t instanceof window.Array ? "array" : t instanceof window.Function ? "function" : t instanceof window.String ? "string" : t === window.event || t.constructor == window.Event || t.constructor == window.MouseEvent || t.constructor == window.UIEvent || t.constructor == window.KeyboardEvent || t.constructor == window.KeyEvent ? "event" : t instanceof window.Date ? "date" : t instanceof window.RegExp ? "regexp" : t.length && t.item ? "collection" : t.length && t.callee ? "arguments" : typeof t
				}
			},
			1532: (t, e, i) => {
				i.d(e, {
					A: () => c
				});
				var s = i(1302),
					o = i(427),
					n = i(4248);
				const a = navigator.userAgent.toLowerCase(),
					h = a.match(/(webkit|gecko)\/(\d+\.?\d*)/i),
					r = a.match(/(edge|opr)\/(\d+\.?\d*)/i) || a.match(/(crios|chrome|safari|firefox|opera|opr)\/(\d+\.?\d*)/i),
					l = a.match(/version\/(\d+\.?\d*)/i),
					d = new class {
						constructor() {
							this._magicClasses = [], this._features = {
								fullScreen: !!(document.fullscreenEnabled || document.msFullscreenEnabled || document.webkitFullScreenEnabled || document.webkitFullscreenEnabled)
							}, this._touchScreen = "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0, this._mobile = !!a.match(/(android|bb\d+|meego).+|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/), this._engine = (() => {
								let t = "unknown";
								return h && h[1] ? t = h[1].toLowerCase() : null !== window.mozInnerScreenY ? t = "gecko" : null !== window.WebKitPoint && (t = "webkit"), t
							})(), this._androidBrowser = !1, this._version = h && h[2] ? parseFloat(h[2]) : 0, this._uaName = r && r[1] ? r[1].toLowerCase() : "", this._uaVersion = r && r[2] ? parseFloat(r[2]) : 0, this._cssPrefix = "", this._cssDomPrefix = "", this._domPrefix = "", this._platform = (() => {
								let t;
								return a.match(/ip(?:ad|od|hone)/) ? t = "ios" : (t = a.match(/(?:webos|android)/), t || (t = navigator.platform.match(/mac|win|linux/i), t || (t = ["other"])), t = t[0].toLowerCase()), t
							})(), this._scrollbarsWidth = 0, this._ready = !1, this._constructableStylesheets = (() => {
								try {
									return !!(new CSSStyleSheet).replace
								} catch (t) {
									return !1
								}
							})(), this.calculate()
						}
						calculate() {
							"gecko" === this._engine && (this._version = r && r[2] ? parseFloat(r[2]) : 0), r && "crios" === r[1] && (this._uaName = "chrome"), "safari" === this._uaName && l && l[1] && (this._uaVersion = parseFloat(l[1])), "android" === this._platform && this.webkit && l && l[1] && (this._androidBrowser = !0);
							const t = {
								gecko: ["-moz-", "Moz", "moz"],
								webkit: ["-webkit-", "Webkit", "webkit"]
							}[this._engine] || ["", "", ""];
							this._cssPrefix = t[0], this._cssDomPrefix = t[1], this._domPrefix = t[2], !this._mobile && "mac" === this._platform && this._touchScreen && (this._mobile = !0, this._platform = "ios"), this._magicClasses.push(this._platform + "-magic"), this._mobile && this._magicClasses.push("mobile-magic"), this._androidBrowser && this._magicClasses.push("android-browser-magic"), this._magicClasses.push("svg-magic"), document.documentElement.classList.add(...this._magicClasses);
							try {
								document.documentElement.setAttribute("data-magic-ua", this.uaName), document.documentElement.setAttribute("data-magic-ua-ver", this.uaVersion), document.documentElement.setAttribute("data-magic-engine", this.engine), document.documentElement.setAttribute("data-magic-engine-ver", this.version)
							} catch (t) {}
							window.navigator.pointerEnabled || ["down", "up", "move", "over", "out"].forEach((t => {
								const e = "pointer" + t;
								n.xW[e] = "edge" === this.uaName ? e : -1
							}))
						}
						get features() {
							return this._features
						}
						get touchScreen() {
							return this._touchScreen
						}
						get mobile() {
							return this._mobile
						}
						get engine() {
							return this._engine
						}
						get version() {
							return this._version
						}
						get uaName() {
							return this._uaName
						}
						get uaVersion() {
							return this._uaVersion
						}
						get cssPrefix() {
							return this._cssPrefix
						}
						get cssDomPrefix() {
							return this._cssDomPrefix
						}
						get domPrefix() {
							return this._domPrefix
						}
						get platform() {
							return this._platform
						}
						get scrollbarsWidth() {
							return this._scrollbarsWidth
						}
						get doc() {
							return document.documentElement
						}
						get ready() {
							return this._ready
						}
						get webkit() {
							return "webkit" === this._engine
						}
						get gecko() {
							return "gecko" === this._engine
						}
						get androidBrowser() {
							return this._androidBrowser
						}
						get constructableStylesheets() {
							return this._constructableStylesheets
						}
						onready() {
							if (!this._ready) {
								this._ready = !0;
								try {
									const t = (0, o.A)("div").setCss({
										width: 100,
										height: 100,
										overflow: "scroll",
										position: "absolute",
										top: -9999
									}).appendTo(document.body);
									this._scrollbarsWidth = t.node.offsetWidth - t.node.clientWidth, t.remove()
								} catch (t) {}(0, s.A)(document).callEvent("domready")
							}
						}
					};
				(() => {
					const t = {
						capable: d.features.fullScreen,
						enabled: () => !!(document.fullscreenElement || document[d.domPrefix + "FullscreenElement"] || document.fullScreen || document.webkitIsFullScreen || document[d.domPrefix + "FullScreen"]),
						request: (e, i) => {
							i || (i = {}), t.capable && !i.windowFullscreen ? (t.onchange = e => {
								t.enabled() ? i.onEnter && i.onEnter() : ((0, s.A)(document).removeEvent(t.changeEventName, t.onchange), i.onExit && i.onExit())
							}, (0, s.A)(document).addEvent(t.changeEventName, t.onchange), t.onerror = e => {
								i.fallback && i.fallback(), (0, s.A)(document).removeEvent(t.errorEventName, t.onerror)
							}, (0, s.A)(document).addEvent(t.errorEventName, t.onerror), (t => {
								(t.requestFullscreen || t[d.domPrefix + "RequestFullscreen"] || t[d.domPrefix + "RequestFullScreen"] || (() => {})).call(t)
							})((0, s.A)(e).node)) : i.fallback && i.fallback()
						},
						cancel: document.exitFullscreen || document.cancelFullScreen || document[d.domPrefix + "ExitFullscreen"] || document[d.domPrefix + "CancelFullScreen"] || (() => {}),
						changeEventName: (document.exitFullscreen ? "" : d.domPrefix) + "fullscreenchange",
						errorEventName: (document.exitFullscreen ? "" : d.domPrefix) + "fullscreenerror",
						prefix: d.domPrefix,
						activeElement: null
					};
					d.fullScreen = t
				})();
				const c = d
			},
			4248: (t, e, i) => {
				i.d(e, {
					O3: () => s,
					XB: () => a,
					de: () => n,
					xW: () => h,
					y1: () => o
				});
				const s = new WeakMap,
					o = "mjs-" + Math.floor(Math.random() * (new Date).getTime()),
					n = window.devicePixelRatio >= 2 ? 2 : 1,
					a = new Map,
					h = {}
			},
			7741: (t, e, s) => {
				s.d(e, {
					A: () => x
				});
				var o = s(6488),
					n = s(1532),
					a = s(1302),
					h = s(2112),
					r = s(9060);
				const l = {
						linear: "linear",
						sineIn: "easeInSine",
						sineOut: "easeOutSine",
						expoIn: "easeInExpo",
						expoOut: "easeOutExpo",
						quadIn: "easeInQuad",
						quadOut: "easeOutQuad",
						cubicIn: "easeInCubic",
						cubicOut: "easeOutCubic",
						backIn: "easeInBack",
						backOut: "easeOutBack",
						elasticIn: (t, e) => (e = e || [], Math.pow(2, 10 * --t) * Math.cos(20 * t * Math.PI * (e[0] || 1) / 3)),
						elasticOut: (t, e) => 1 - l.elasticIn(1 - t, e),
						bounceIn: t => {
							for (let e = 0, i = 1;; e += i, i /= 2)
								if (t >= (7 - 4 * e) / 11) return i * i - Math.pow((11 - 6 * e - 11 * t) / 4, 2)
						},
						bounceOut: t => 1 - l.bounceIn(1 - t),
						none: t => 0
					},
					d = {
						INIT: 0,
						STARTED: 1,
						PLAYING: 2,
						PAUSED: 3,
						ENDED: 4
					};
				class c {
					constructor(t, e) {
						this.styles = null, this.cubicBezier = null, this.easeFn = null, this.state = d.INIT, this.pStyles = [], this.alternate = !1, this.continuous = !1, this.startTime = null, this.finishTime = null, this.pausedTime = 0, this.options = {
							fps: 60,
							duration: 600,
							transition: "ease",
							cycles: 1,
							direction: "normal",
							onStart: () => {},
							onComplete: () => {},
							onBeforeRender: () => {},
							onAfterRender: () => {},
							forceAnimation: !1,
							roundCss: !1
						}, this.els = [], Array.isArray(t) || (t = [t]), t.forEach((t => {
							t && this.els.push((0, a.A)(t))
						})), this.options = Object.assign(this.options, e), this.timer = !1, this.setTransition(this.options.transition), (0, r.A)(this.options.cycles) && (this.options.cycles = "infinite" === this.options.cycles ? 1 / 0 : parseInt(this.options.cycles, 10) || 1)
					}
					static getTransition() {
						return l
					}
					setTransition(t) {
						this.options.transition = t, this.easeFn = c.cubicBezierAtTime;
						const e = l[this.options.transition] || this.options.transition;
						"function" === (0, h.A)(e) ? this.easeFn = e: this.cubicBezier = this.parseCubicBezier(e) || this.parseCubicBezier("ease")
					}
					start(t) {
						const e = /%$/;
						if (this.state === d.PLAYING) return this;
						this.state = d.STARTED, this.cycle = 0, this.alternate = ["alternate", "alternate-reverse"].includes(this.options.direction), this.continuous = ["continuous", "continuous-reverse"].includes(this.options.direction), t || (t = {}), Array.isArray(t) || (t = [t]), this.styles = t;
						const i = this.styles.length;
						this.pStyles = new Array(i);
						for (let t = 0; t < i; t++) {
							this.pStyles[t] = {};
							for (const i in this.styles[t]) e.test(this.styles[t][i][0]) && (this.pStyles[i] = !0), ["reverse", "alternate-reverse", "continuous-reverse"].includes(this.options.direction) && this.styles[t][i].reverse()
						}
						return this.calcTime(), this.options.onStart(), 0 === this.options.duration ? (this.render(1), this.options.onComplete(this.els.length < 2 ? this.els[0] : this.els)) : this.startAnimation(), this
					}
					stopAnimation() {
						this.timer && (this.options.forceAnimation ? clearInterval(this.timer) : (0, a.A)(window).node.cancelAnimationFrame.call((0, a.A)(window).node, this.timer), this.timer = !1)
					}
					resume() {
						return this.state !== d.PAUSED || (this.calcTime(), this.pausedTime = 0, this.startAnimation()), this
					}
					pause() {
						return [d.PAUSED, d.ENDED].includes(this.state) || (this.pausedTime = Date.now() - this.startTime, this.stopAnimation(), this.state = d.PAUSED), this
					}
					isPlaying() {
						return this.state === d.PLAYING
					}
					isPaused() {
						return this.state === d.PAUSED
					}
					stop(t) {
						return [d.INIT, d.ENDED].includes(this.state) || (this.stopAnimation(), this.state = d.ENDED, t && (this.render(1), this.options.onComplete(this.els.length < 2 ? this.els[0] : this.els))), this
					}
					startAnimation() {
						this.options.forceAnimation ? this.timer = setInterval((() => {
							this.loop()
						}), Math.round(1e3 / this.options.fps)) : this.timer = (0, a.A)(window).node.requestAnimationFrame.call((0, a.A)(window).node, this.loop.bind(this)), this.state = d.PLAYING
					}
					calcTime() {
						this.startTime = Date.now() - this.pausedTime, this.finishTime = this.startTime + this.options.duration
					}
					loop() {
						const t = Date.now(),
							e = (t - this.startTime) / this.options.duration,
							i = Math.floor(e);
						if (t >= this.finishTime && i >= this.options.cycles) return this.stopAnimation(), this.render(1), this.options.onComplete(this.els.length < 2 ? this.els[0] : this.els), this;
						if (this.alternate && this.cycle < i)
							for (let t = 0, e = this.styles.length; t < e; t++)
								for (const e in this.styles[t]) this.styles[t][e].reverse();
						this.cycle = i, this.options.forceAnimation || (this.timer = (0, a.A)(window).node.requestAnimationFrame.call((0, a.A)(window).node, this.loop.bind(this))), this.render((this.continuous ? i : 0) + this.easeFn(e % 1, this.options.duration, this.cubicBezier))
					}
					render(t) {
						const e = [],
							i = this.els.length;
						for (let s = 0; s < i; s++) e.push(this.renderOverLoad(t, this.els[s], this.styles[s], this.pStyles[s]));
						let s = this.els,
							o = e;
						i < 2 && (s = this.els[0], o = e[0]), this.options.onBeforeRender(o, s), this.set(e), this.options.onAfterRender(o, s)
					}
					renderOverLoad(t, e, i, s) {
						const o = {};
						return Object.entries(i).forEach((e => {
							const [i, n] = e;
							"opacity" === i ? o[i] = Math.round(100 * this.calc(n[0], n[1], t)) / 100 : (o[i] = this.calc(n[0], n[1], t), s[i] && (o[i] += "%"))
						})), o
					}
					calc(t, e, i) {
						return t = parseFloat(t), ((e = parseFloat(e)) - t) * i + t
					}
					set(t) {
						for (let e = 0, i = this.els.length; e < i; e++) this.els[e].setCss(t[e]);
						return this
					}
					parseCubicBezier(t) {
						let e = null;
						if (Array.isArray(t) && 4 === t.length) return t;
						if (!(0, r.A)(t)) return null;
						switch (t) {
							case "linear":
								e = [0, 0, 1, 1];
								break;
							case "ease":
								e = [.25, .1, .25, 1];
								break;
							case "ease-in":
								e = [.42, 0, 1, 1];
								break;
							case "ease-out":
								e = [0, 0, .58, 1];
								break;
							case "ease-in-out":
								e = [.42, 0, .58, 1];
								break;
							default:
								if ((t = t.replace(/\s/g, "")).match(/^cubic-bezier\((?:-?[0-9\.]{0,}[0-9]{1,},){3}(?:-?[0-9\.]{0,}[0-9]{1,})\)$/)) {
									e = t.replace(/^cubic-bezier\s*\(|\)$/g, "").split(",");
									for (let t = e.length - 1; t >= 0; t--) e[t] = parseFloat(e[t])
								}
						}
						return e
					}
					static cubicBezierAtTime(t, e, i) {
						let s = 0,
							o = 0,
							n = 0,
							a = 0,
							h = 0,
							r = 0;
						const l = t => ((s * t + o) * t + n) * t,
							d = t => (3 * s * t + 2 * o) * t + n;
						return n = 3 * i[0], o = 3 * (i[2] - i[0]) - n, s = 1 - n - o, r = 3 * i[1], h = 3 * (i[3] - i[1]) - r, a = 1 - r - h, c = t, p = (t => 1 / (200 * t))(e), (t => ((a * t + h) * t + r) * t)(((t, e) => {
							let i, s, o, n, a, h;
							const r = t => t >= 0 ? t : 0 - t;
							for (o = t, h = 0; h < 8; h++) {
								if (n = l(o) - t, r(n) < e) return o;
								if (a = d(o), r(a) < 1e-6) break;
								o -= n / a
							}
							if (i = 0, s = 1, o = t, o < i) return i;
							if (o > s) return s;
							for (; i < s;) {
								if (n = l(o), r(n - t) < e) return o;
								t > n ? i = o : s = o, o = .5 * (s - i) + i
							}
							return o
						})(c, p));
						var c, p
					}
				}
				const p = c;
				var u = s(5197),
					m = s(1382);
				let g = null;
				const v = {
						boolean: 1,
						array: 2,
						number: 3,
						function: 4,
						url: 5,
						string: 100
					},
					f = {
						boolean: (t, e, i) => {
							if ("boolean" !== (0, h.A)(e)) {
								if (i || !(0, r.A)(e)) return !1;
								if (!/^(true|false)$/.test(e)) return !1;
								e = !e.replace(/true/i, "").trim()
							}
							return !(t.hasOwnProperty("enum") && !t.enum.includes(e) || (g = e, 0))
						},
						url: (t, e, i) => !(!(0, r.A)(e) || !(t => /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i.test(t))(e)) && (!t.hasOwnProperty("enum") || t.enum.includes(e)),
						string: (t, e, i) => !(!(0, r.A)(e) || t.hasOwnProperty("enum") && !t.enum.includes(e) || (g = "" + e, 0)),
						number: (t, e, i) => {
							let s = parseFloat(e);
							if (isNaN(s)) return !1;
							if (isNaN(t.minimum) && (t.minimum = Number.NEGATIVE_INFINITY), isNaN(t.maximum) && (t.maximum = Number.POSITIVE_INFINITY), (0, r.A)(e) && /^\s*\d+\s*\/\s*\d+\s*$/.test(e)) {
								const t = e.split("/");
								if (s = 1 === t.length ? parseFloat(t[0]) : parseFloat(t[0]) / parseFloat(t[1]), isNaN(s)) return !1
							}
							if (t.hasOwnProperty("enum") && !t.enum.includes(s)) return !1;
							if (t.minimum > s || s > t.maximum) return !1;
							const o = (0, r.A)(e) && e.endsWith("%");
							return g = o ? e : s, !0
						},
						array: (t, e, i) => {
							if ((0, r.A)(e)) try {
								e = JSON.parse(e.replace(/'/g, '"'))
							} catch (t) {
								return !1
							}
							return !!Array.isArray(e) && (g = e, !0)
						},
						function: (t, e, i) => "function" === (0, h.A)(e) && (g = e, !0)
					},
					y = (t, e, i) => {
						const s = t.hasOwnProperty("oneOf") ? t.oneOf : [t];
						return !!Array.isArray(s) && s.some((t => f[t.type](t, e, i)))
					},
					S = t => {
						const e = {},
							i = (t, s) => {
								Object.entries(t).forEach((t => {
									const [o, n] = t, a = s.slice(0);
									!(0, m.A)(n) || (t => Object.keys(t).some((t => "default" === t)))(n) ? (a.push(o), e[a.join(".")] = n) : (a.push(o), i(n, a))
								}))
							};
						return i(t, []), e
					},
					w = t => {
						const e = {};
						return Object.entries(t).forEach((t => {
							((t, i) => {
								let s = e;
								const o = t.length;
								"" === t[o - 1].trim() && t.splice(o - 1, 1), t.forEach(((t, e) => {
									e === o - 1 ? s[t] = i : (s[t] || (s[t] = {}), s = s[t])
								}))
							})(t[0].split("."), t[1])
						})), e
					},
					b = t => (0, u.A)((t + "").trim()),
					A = class {
						constructor(t) {
							this.schema = {}, this.options = {}, this.parseSchema(t)
						}
						parseSchema(t, e) {
							t = S(t), Object.entries(t).forEach((s => {
								const [o, n] = s, a = b(o);
								if (!this.schema.hasOwnProperty(a) || e) {
									if (this.schema[a] = (t => {
											if (t.hasOwnProperty("oneOf")) {
												const e = t.oneOf.length;
												for (let i = 0; i < e; i++)
													for (let s = i + 1; s < e; s++)
														if (v[t.oneOf[i].type] > v[t.oneOf[s].type]) {
															const e = t.oneOf[i];
															t.oneOf[i] = t.oneOf[s], t.oneOf[s] = e
														}
											}
											return t
										})(n), !(t => {
											const e = t.hasOwnProperty("oneOf") ? t.oneOf : [t];
											if (!Array.isArray(e)) return !1;
											for (let t = e.length - 1; t >= 0; t--) {
												if (!e[t].type || !v.hasOwnProperty(e[t].type)) return !1;
												if (void 0 !== e[t].enum) {
													if (!Array.isArray(e[t].enum)) return !1;
													for (let i = e[t].enum.length - 1; i >= 0; i--)
														if (!f[e[t].type]({
																type: e[t].type
															}, e[t].enum[i], !0)) return !1
												}
											}
											return !(t.hasOwnProperty("default") && !y(t, t.default, !0))
										})(this.schema[a])) throw "Incorrect definition of the '" + i + "' parameter in " + t;
									void 0 !== this.options[a] && this.checkValue(a, this.options[a]) || (this.options[a] = void 0)
								}
							}))
						}
						set(t, e) {
							t = b(t), (0, r.A)(e) && (e = e.trim()), this.schema.hasOwnProperty(t) && (g = e, y(this.schema[t], e) && (this.options[t] = g))
						}
						get(t) {
							if (t = b(t), this.schema.hasOwnProperty(t)) return void 0 !== this.options[t] && null !== this.options[t] ? this.options[t] : this.schema[t].default
						}
						fromJSON(t) {
							t = S(t);
							for (const e in t) this.set(e, t[e])
						}
						getJSON() {
							const t = Object.assign({}, this.options);
							return Object.keys(t).forEach((e => {
								void 0 === t[e] && void 0 !== this.schema[e].default && (t[e] = this.schema[e].default)
							})), w(t)
						}
						fromString(t, e) {
							const i = {};
							return e || (e = {}), t.split(";").forEach((t => {
								var s;
								s = t.trim(), Object.entries(e).find((t => {
									let [e, o] = t;
									return !(!o.test || !o.test(s) || (i[e] || (i[e] = ""), i[e] += s + ";", 0))
								})) || (t = t.split(":"), this.set(t.shift().trim(), t.join(":")))
							})), i
						}
						checkValue(t, e) {
							return t = b(t), (0, r.A)(e) && (e = e.trim()), !(!this.schema.hasOwnProperty(t) || (g = e, !y(this.schema[t], e)))
						}
						clearOption(t) {
							t = b(t), this.exists(t) && (this.options[t] = void 0)
						}
						exists(t) {
							return t = b(t), this.schema.hasOwnProperty(t)
						}
						isset(t) {
							return t = b(t), this.exists(t) && void 0 !== this.options[t]
						}
						remove(t) {
							t = b(t), this.exists(t) && (delete this.options[t], delete this.schema[t])
						}
					};
				"interactive" === document.readyState || "complete" === document.readyState ? setTimeout((() => n.A.onready()), 0) : ((0, a.A)(document).addEvent("readystatechange", (t => {
					"interactive" !== t.target.readyState && "complete" !== t.target.readyState || n.A.onready()
				})), (0, a.A)(document).addEvent("DOMContentLoaded", (() => {
					n.A.onready()
				})), (0, a.A)(window).addEvent("load", (() => {
					n.A.onready()
				})));
				const x = Object.assign(o.A, {
					browser: n.A,
					FX: p,
					Options: A
				})
			},
			2689: (t, e, i) => {
				i.a(t, (async(t, s) => {
					try {
						i.d(e, {
							A: () => c
						});
						var o = i(7817),
							n = t([o]);
						o = (n.then ? (await n)() : n)[0];
						const a = t => {
								console.log("sirv.js: The method Sirv" + t + ".refresh() is deprecated. \r\n         Use Sirv" + t + ".stop() and Sirv" + t + ".start() instead.")
							},
							h = (t, e) => o.A.eventManager.addEvent(t, e),
							r = (t, e) => o.A.eventManager.removeEvent(t, e),
							l = {
								start: (t, e) => {
									o.A.start(t, e, "image", !0)
								},
								stop: (t, e) => {
									o.A.stop(t, e, "image")
								},
								getInstance: (t, e) => {
									let i = null;
									return o.A.getInstance && (i = o.A.getInstance(t, "image", e)), i
								},
								refresh: () => {
									a(".image")
								},
								on: (t, e) => h(t, e),
								off: (t, e) => r(t, e)
							},
							d = {
								start: (t, e) => {
									o.A.start(t, e, "viewer", !0)
								},
								stop: (t, e) => {
									o.A.stop(t, e, "viewer")
								},
								getInstance: (t, e) => {
									let i = null;
									return o.A.getInstance && (i = o.A.getInstance(t, "viewer", e)), i
								},
								refresh: () => {
									a(".viewer")
								},
								on: (t, e) => h(t, e),
								off: (t, e) => r(t, e),
								filters: {
									add: (t, e) => {
										o.A.addFilterCallback(t, e)
									},
									remove: t => {
										o.A.removeFilterCallback(t)
									},
									removeAll: () => {
										o.A.removeAllFilterCallback()
									}
								}
							},
							c = {
								version: "v3.18.6",
								build: "9ec11ec8",
								options: {},
								lazyimage: l,
								viewer: d,
								start: (t, e) => {
									o.A.start(t, e, null, !0)
								},
								stop: (t, e) => {
									o.A.stop(t, e)
								},
								getInstance: (t, e, i) => {
									let s = null;
									return o.A.getInstance && (s = ("lazyimage" === e ? l : d).getInstance(t, i)), s
								},
								refresh: () => {
									a("")
								},
								on: h,
								off: r,
								whenReady: t => t(),
								whenLoaded: t => t()
							};
						s()
					} catch (t) {
						s(t)
					}
				}))
			},
			8630: (t, e, i) => {
				i.d(e, {
					A: () => n
				});
				var s = i(7741);
				const o = {
						desktop: () => window.matchMedia("(pointer:fine) and ((orientation: landscape) and (min-device-width: 1024px))").matches,
						tablet: () => window.matchMedia("(pointer:coarse) and (min-device-width: 744px) and (max-device-width: 1400px)").matches,
						phone: () => window.matchMedia("(pointer:coarse) and (min-device-width: 320px) and (max-device-width: 960px)").matches
					},
					n = class {
						constructor(t) {
							this.breakpoints = t
						}
						searchOptions(t) {
							var e;
							const i = this.breakpoints.filter((e => {
								if (e.match) {
									if (s.A.isString(e.match)) try {
										return window.matchMedia(e.match).matches
									} catch (t) {
										return console.error("Sirv: " + t), !0
									}
									if ("function" === s.A.typeOf(e.match)) try {
										return e.match(t)
									} catch (t) {
										return console.error("Sirv: " + t), !0
									}
									if (s.A.isObject(e.match)) {
										let i = !0,
											s = !0,
											n = e.match.device;
										n && (Array.isArray(n) || (n = [n]), i = n.some((t => !o[t] || o[t]())));
										let a = e.match.width;
										return a && (Array.isArray(a) || (a = [0, a]), s = a[0] <= t && t <= a[1]), i && s
									}
									return !0
								}
								return !0
							}));
							return i.length > 1 && i.sort(((t, e) => {
								if (!t.match && e.match) return -1;
								if (t.match && !e.match) return 1;
								const i = "function" === s.A.typeOf(t.match),
									o = "function" === s.A.typeOf(e.match);
								if (i && !o) return -1;
								if (!i && o) return 1;
								const n = s.A.isString(t.match),
									a = s.A.isString(e.match);
								if (n && !a) return -1;
								if (!n && a) return 1;
								const h = s.A.isObject(t.match),
									r = s.A.isObject(e.match);
								if (h && r) {
									if (t.match.device && !e.match.device) return -1;
									if (!t.match.device && e.match.device) return 1;
									if (t.match.width && !e.match.width) return -1;
									if (!t.match.width && e.match.width) return 1;
									if (t.match.width && e.match.width) {
										const i = Array.isArray(t.match.width),
											s = Array.isArray(e.match.width);
										return i && !s ? -1 : !i && s ? 1 : i && s ? t.match.width[1] - t.match.width[0] - (e.match.width[1] - e.match.width[0]) : t.match.width - e.match.width
									}
									return 0
								}
								return 0
							})), (null == (e = i[0]) ? void 0 : e.options) || {}
						}
					}
			},





			8761: (t, e, i) => {
				i.d(e, {
					A: () => r
				});
				var s = i(7985),
					o = i(7741),
					n = i(2084),
					a = i(511);
				class h extends s.A {
					constructor(t, e, i) {
						super(), this.defaultSchema = i, this._options = e, this.instanceNode = o.A.$(t), this.instanceUrl = this.instanceNode.attr("data-src") || this.instanceNode.attr("src") || this.instanceNode.attr("data-bg-src"), this.option = null, this.ready = !1, this.id = this.instanceNode.attr("data-id") || this.instanceNode.attr("id"), this.ariaLabelId = a.Mu + "-al-" + (0, n.A)(), this.isStartedFullInit = !1, this.isStarted = !1, this.destroyed = !1, this.referrerPolicy = this.instanceNode.attr("data-referrerpolicy") || this.instanceNode.attr("referrerpolicy") || "no-referrer-when-downgrade", this.instanceOptions = this.makeOptions(), this.createOptionFunction(), this.api = {
							isReady: () => this.ready,
							resize: () => this.resize(),
							getOptions: () => Object.freeze(this.options)
						}
					}
					updateOptions() {
						this.instanceOptions = this.makeOptions()
					}
					setOptions(t, e, i, s, o) {
						return t.fromJSON(e), t.fromString(i), t.fromString(s), o && o.forEach((e => t.fromJSON(e))), t
					}
					makeGlobalOptions(t) {
						const e = this._options.options;
						return this.setOptions(t, e.common.common, e.local.common, this.instanceNode.attr("data-options") || "", e.breakpoints)
					}
					makeMobileOptions(t) {
						const e = this._options.options;
						return this.setOptions(t, e.common.mobile, e.local.mobile, this.instanceNode.attr("data-mobile-options") || "")
					}
					makeOptions() {
						let t = new o.A.Options(this.defaultSchema);
						return t = this.makeGlobalOptions(t), o.A.browser.touchScreen && o.A.browser.mobile && !this._options.hasBreakpoints && (t = this.makeMobileOptions(t)), t
					}
					getOptionsForStartFullInit(t) {
						t && (this._options.options = t, this.instanceOptions = this.makeOptions(), this.createOptionFunction())
					}
					get options() {
						return this.instanceOptions.getJSON()
					}
					resize() {
						return !!this.ready && this.onResize()
					}
					onResize() {
						return !0
					}
					get imageClassContainer() {
						return {}
					}
					checkImage(t, e) {
						let i;
						const s = this.imageClassContainer;
						return i = e ? s.isExist(t) : s.isLoaded(t), i
					}
					createOptionFunction() {
						var t = this;
						this.option = function() {
							return arguments.length > 1 ? t.instanceOptions.set(arguments.length <= 0 ? void 0 : arguments[0], arguments.length <= 1 ? void 0 : arguments[1]) : t.instanceOptions.get(arguments.length <= 0 ? void 0 : arguments[0])
						}
					}
					startFullInit(t) {
						this.destroyed || this.isStartedFullInit || (this.isStartedFullInit = !0, this.getOptionsForStartFullInit(t))
					}
					get originImageUrl() {
						return null
					}
					run() {
						return !this.isStarted && (this.isStarted = !0, !0)
					}
					done() {
						this.ready = !0
					}
					destroy() {
						this.destroyed = !0, this.isStarted = !1, this.ready = !1, this.isStartedFullInit = !1, this.instanceNode = null, super.destroy()
					}
				}
				const r = h
			},
			4331: (t, e, i) => {
				i.d(e, {
					A: () => h
				});
				var s = i(538),
					o = i(7741);
				const n = (t, e) => {
					console.warn("sirv.js: The " + t + " method is deprecated and will be removed. \r\n           Use " + e + " instead.")
				};
				class a extends s.A {
					constructor(t, e, i) {
						super(t, e, i), this.hotspots = null, this.hotspotsData = this.parseDataHotspotAttr(), this.api = Object.assign(this.api, {
							addHotspot: t => {
								this.hotspots && (n(".addHotspot()", ".hotspots.add()"), this.hotspots.api.add(t), this.isInView && this.isSlideShown && this.hotspots.showNeededElements())
							},
							removeHotspot: t => {
								this.hotspots && (n(".removeHotspot()", ".hotspots.remove()"), this.hotspots.api.remove(t))
							},
							removeAllHotspots: () => {
								this.hotspots && (n(".removeAllHotspots()", ".hotspots.removeAll()"), this.hotspots.api.removeAll())
							},
							getHotspots: () => this.hotspots ? (n(".getHotspots()", ".hotspots.list()"), this.hotspots.api.list()) : []
						})
					}
					parseDataHotspotAttr() {
						const t = this.instanceNode.attr("data-hotspots");
						if (!t) return [];
						try {
							return JSON.parse(t)
						} catch (e) {
							if (window[t]) return window[t]
						}
						return []
					}
					createHotspotsClass(t) {
						if (!t) return;
						this.hotspots = new t, this.hotspots.parentClass = this, this.on("hotspotActivate", (t => {
							t.stopAll(), this.onHotspotActivate(t.data), this.sendEvent("hotspotOpened")
						})), this.on("hotspotDeactivate", (t => {
							t.stopAll(), this.onHotspotDeactivate(t.data), this.sendEvent("hotspotClosed")
						})), this.api = Object.assign(this.api, {
							hotspots: this.hotspots.api
						});
						const e = this;
						this.api.hotspots.add = t => {
							if (t) {
								let i = null;
								if (!e.hotspots.api.list().length) {
									const t = this.getParentContainer();
									i = e.hotspots.getRightBoundengClientRect(this.getContainerForBoundengClientRect()), e.hotspots.appendTo(t)
								}
								e.hotspots.addHotspot(t), e.hotspots.containerSize = i, e.hotspots.showAll(), e.isInView && e.isSlideShown && e.hotspots.showNeededElements()
							}
						}
					}
					getContainerForBoundengClientRect() {
						return this.getParentContainer()
					}
					createHotspots() {
						var t;
						let e = this.instanceNode;
						"img" === e.tagName && (e = o.A.$(e.node.parentNode)), null != (t = this.hotspotsData) && t.length && (this.hotspots.appendTo(e), this.hotspots.createHotspots(this.hotspotsData)), this.nativeFullscreen && this.hotspots.changeBoxContainerParent(!0), this.hotspots.showAll()
					}
					done() {
						this.ready || this.destroyed || !this.hotspots || this.createHotspots(), super.done()
					}
					getParentContainer() {
						let t = this.instanceNode;
						return "img" === t.tagName && (t = o.A.$(t.node.parentNode)), t
					}
					onHotspotActivate(t) {}
					onHotspotDeactivate(t) {}
					onStartActions() {
						this.hotspots && this.isInView && this.isSlideShown && this.hotspots.showNeededElements(), super.onStartActions()
					}
					onStopActions() {
						this.hotspots && this.hotspots.hideActiveHotspotBox(!0), super.onStopActions()
					}
					onBeforeFullscreenIn(t) {
						this.hotspots && (this.hotspots.hideActiveHotspotBox(), this.nativeFullscreen && this.hotspots.changeBoxContainerParent(!0))
					}
					onBeforeFullscreenOut(t) {
						this.hotspots && (this.hotspots.hideActiveHotspotBox(), this.nativeFullscreen && this.hotspots.changeBoxContainerParent())
					}
					onAfterFullscreenOut(t) {
						this.hotspots && this.isInView && this.isSlideShown && this.hotspots.showNeededElements()
					}
					destroy() {
						this.hotspots && this.hotspots.destroy(), this.hotspots = null, this.off("hotspotActivate"), this.off("hotspotDeactivate"), super.destroy()
					}
				}
				const h = a
			},
			538: (t, e, i) => {
				i.d(e, {
					A: () => d
				});
				var s = i(8761);
				const o = class {
					constructor() {
						this.started = !1, this.callbacks = []
					}
					wait(t) {
						this.started ? t() : this.callbacks.push(t)
					}
					start() {
						this.started || (this.started = !0, this.callbacks.forEach((t => t())))
					}
					destroy() {
						this.callbacks = []
					}
				};
				var n = i(7741),
					a = i(511),
					h = i(757);
				const r = t => new Error("This method '" + t + "' is not implemented.");
				class l extends s.A {
					constructor(t, e, i) {
						super(t, e, i), this.type = a.mo.NONE, this.always = e.always, this.quality = e.quality, this.hdQuality = e.hdQuality, this.isHDQualitySet = e.isHDQualitySet, this.isFullscreenEnabled = e.isFullscreen, this.goToFullscreen = e.goToFullscreen, this.nativeFullscreen = e.nativeFullscreen, this.layout = e.layout, this.aspectratio = e.aspectratio, this.dataAlt = null, this.dataDescription = null, this.isSlideShown = !1, this.isInView = !1, this.preload = !1, this.firstSlideAhead = !1, this.infoSize = null, this.pinchCloud = null, this.onLoad = !1, this.waitToStart = new o, this.waitGettingInfo = new o, this.gettingInfoPromise = null, this.fullscreenState = a.a0.CLOSED, this.baseUrl = (0, h.dc)(this.instanceUrl.replace(a.Cu, "$1")), this.queryParams = this.instanceUrl.replace(a.Cu, "$2"), this.on("stats", (t => {
							t.data.component = a.tm[this.type]
						}))
					}
					updateOptions() {
						this.always = this._options.always, this.quality = this._options.quality, this.hdQuality = this._options.hdQuality, this.isHDQualitySet = this._options.isHDQualitySet, this.isFullscreenEnabled = this._options.isFullscreen, this.goToFullscreen = this._options.goToFullscreen, this.nativeFullscreen = this._options.nativeFullscreen, this.layout = this._options.layout, super.updateOptions()
					}
					sendEvent(t, e) {
						e || (e = {}), e.event || (e.event = {}), e.id = this.id, e.url = this.instanceUrl, e.event.timestamp = Date.now(), e.event.type = a.tm[this.type] + ":" + t, this.emit("componentEvent", {
							data: {
								type: t,
								data: e
							}
						})
					}
					canFullscreen() {
						return !0
					}
					onBeforeStartActions() {}
					onStartActions() {}
					onStopActions() {}
					onAfterStopActions() {}
					onInView(t) {}
					onBeforeFullscreenIn(t) {}
					onAfterFullscreenIn(t) {}
					onBeforeFullscreenOut(t) {}
					onAfterFullscreenOut(t) {}
					onMouseAction(t) {}
					onSecondSelectorClick() {}
					onStopContext() {}
					loadContent() {
						return !0
					}
					getSelectorProportion() {
						return Promise.resolve({
							size: {
								width: 500,
								height: 500
							}
						})
					}
					loadThumbnail() {
						return !this.destroyed && (this.waitToStart.start(), !0)
					}
					startGettingInfo() {
						return !this.destroyed && (this.waitGettingInfo.start(), !0)
					}
					startFullInit(t, e) {
						this.isStartedFullInit || (super.startFullInit(t), this.always = e.always, this.dataAlt = this.instanceNode.attr("data-alt"), this.dataDescription = this.instanceNode.attr("data-description"), this.setEvents())
					}
					isFullscreenActionEnded() {
						return [a.a0.CLOSED, a.a0.OPENED].includes(this.fullscreenState)
					}
					setEvents() {
						this.on("beforeStartActions", (t => {
							t.stop(), this.onBeforeStartActions()
						})), this.on("startActions", (t => {
							t.stop(), this.isSlideShown = !0, this.onStartActions(t.who)
						})), this.on("stopActions", (t => {
							t.stop(), this.isSlideShown = !1, this.onStopActions()
						})), this.on("afterStopActions", (t => {
							t.stop(), this.onAfterStopActions()
						})), this.on("inView", (t => {
							t.stop(), this.onInView(t.data), this.isInView = t.data
						})), this.on("beforeFullscreenIn", (t => {
							t.stop(), this.fullscreenState === a.a0.OPENED || this.destroyed || (this.fullscreenState = a.a0.OPENING, this.onBeforeFullscreenIn(t.data))
						})), this.on("afterFullscreenIn", (t => {
							t.stop(), this.destroyed || (this.fullscreenState = a.a0.OPENED, this.onAfterFullscreenIn(t.data))
						})), this.on("beforeFullscreenOut", (t => {
							t.stop(), this.fullscreenState === a.a0.CLOSED || this.destroyed || (this.fullscreenState = a.a0.CLOSING, this.onBeforeFullscreenOut(t.data))
						})), this.on("afterFullscreenOut", (t => {
							t.stop(), this.destroyed || (this.fullscreenState = a.a0.CLOSED, this.onAfterFullscreenOut(t.data))
						})), this.on("resize", (t => {
							t.stop(), this.onResize()
						}))
					}
					getSelectorImgUrl(t) {
						return Promise.reject(r("getSelectorImgUrl"))
					}
					getInfoSize() {
						return Promise.reject(r("getInfoSize"))
					}
					get alt() {
						return this.dataAlt || this.dataDescription
					}
					run(t, e, i) {
						const s = super.run();
						return s && (this.isSlideShown = t, this.preload = e, this.firstSlideAhead = i, this.firstSlideAhead || this.waitToStart.start()), s
					}
					getThumbnailData() {
						return {
							src: null
						}
					}
					getSocialButtonData(t) {
						const e = t;
						return (this.infoSize.width < t.width || this.infoSize.height < t.height) && (e.width = this.infoSize.width, e.height = this.infoSize.height), this.getThumbnailData(e).src
					}
					createPinchEvent(t) {
						const e = {
							isAdded: !1,
							pinch: !1,
							scale: 0,
							block: !1,
							onPinchStart: t => {},
							onPinchResize: t => {},
							onPinchMove: t => {},
							onPinchEnd: t => {
								e.pinch && (e.pinch = !1, this.sendEvent("pinchEnd")), e.block = !1
							},
							handler: t => {
								switch (t.state) {
									case "pinchstart":
										e.onPinchStart(t);
										break;
									case "pinchresize":
										e.onPinchResize(t);
										break;
									case "pinchmove":
										e.onPinchMove(t);
										break;
									case "pinchend":
										e.onPinchEnd(t)
								}
								e.pinch && t.stop()
							},
							addEvent: () => {
								!e.isAdded && n.A.browser.touchScreen && (t.addEvent("pinch", e.handler), e.isAdded = !0)
							},
							removeEvent: () => {
								e.isAdded && (t.removeEvent("pinch", e.handler), e.isAdded = !1, e.block = !1, e.pinch = !1)
							}
						};
						e.addEvent(), this.pinchCloud = e
					}
					done() {
						super.done(), this.createPinchEvent(), this.on("stopContext", (t => {
							t.stop(), this.onStopContext()
						})), this.on("secondSelectorClick", (t => {
							t.stopAll(), this.onSecondSelectorClick()
						})), this.on("mouseAction", (t => {
							t.stop(), this.onMouseAction(t.data.type)
						})), this.on("dragEvent", (t => {
							t.stop(), this.pinchCloud && ("dragstart" === t.data.type ? this.pinchCloud.removeEvent() : "dragend" === t.data.type && this.pinchCloud.addEvent())
						})), this.sendEvent("ready")
					}
					sendContentLoadedEvent() {
						this.onLoad || (this.onLoad = !0, this.sendEvent("contentLoaded"))
					}
					destroy() {
						this.off("stats"), this.off("beforeStartActions"), this.off("startActions"), this.off("stopActions"), this.off("afterStopActions"), this.off("inView"), this.off("resize"), this.off("stopContext"), this.off("secondSelectorClick"), this.off("mouseAction"), this.off("dragEvent"), this.off("beforeFullscreenIn"), this.off("afterFullscreenIn"), this.off("beforeFullscreenOut"), this.off("afterFullscreenOut"), this.pinchCloud = null, this.isSlideShown = !1, super.destroy(), this.waitGettingInfo.destroy(), this.waitGettingInfo = null, this.waitToStart.destroy(), this.waitToStart = null, this.gettingInfoPromise = null
					}
				}
				const d = l
			},
			3435: (t, e, i) => {
				i.d(e, {
					A: () => h
				});
				var s = i(4331),
					o = i(4791),
					n = i(511);
				class a extends s.A {
					constructor(t, e, i) {
						super(t, e, i), this.zoom = null, this.upscale = !1, this.defaultZoomOptions = {}, this.zoomContainer = this.instanceNode, this.zoomClassName = n.Mu + "-zoomed-in", this.api = Object.assign(this.api, {
							zoomIn: t => this.zoomIn(t),
							zoomOut: t => this.zoomOut(t),
							isZoomed: () => this.isZoomed()
						})
					}
					setDefaultZoomOptions() {
						this.defaultZoomOptions = {
							test: !1,
							upscale: this.upscale,
							smoothing: !0
						}
					}
					createZoom(t, e) {
						if (!this.destroyed) {
							let t = Object.assign({}, this.defaultZoomOptions);
							return e && (t = Object.assign(t, e)), this.zoom = new o.A(this.instanceNode, t), this.zoom.parentClass = this, this.zoom.setFullscreenState(this.isFullscreenEnabled ? this.fullscreenState : n.a0.OPENED), t
						}
						return null
					}
					onZoomGetImage(t) {
						t.data.exactSize = !0, t.data.maxSize = !1, t.data.round = !1, t.data.callbackData = {
							lens: !0,
							indexX: t.data.indexX,
							indexY: t.data.indexY,
							level: t.data.level,
							number: t.data.number,
							map: t.data.map
						}
					}
					onZoomCancelLoadingOfTiles(t) {
						t.data.callbackData || (t.data.callbackData = {}), t.data.callbackData.lens = !0
					}
					onZoomBeforeShow(t) {}
					onZoomShown(t) {}
					onZoomHidden(t) {}
					setZoomEvents() {
						this.zoom && (this.on("zoomGetImage", (t => {
							t.stopAll(), this.onZoomGetImage(t)
						})), this.on("zoomCancelLoadingOfTiles", (t => {
							t.stopAll(), this.onZoomCancelLoadingOfTiles(t)
						})), this.on("zoomBeforeShow", (t => {
							t.stopAll(), this.onZoomBeforeShow(t)
						})), this.on("zoomShown", (t => {
							t.stopAll(), this.onZoomShown(t)
						})), this.on("zoomHidden", (t => {
							t.stopAll(), this.onZoomHidden(t)
						})), this.on("zoomClick", (t => {
							t.stopAll(), this.goToFullscreen && this.fullscreenState === n.a0.CLOSED && 1 === this.zoom.getZoomData() && (this.zoom.hide(!0), this.emit("goToFullscreen"))
						})))
					}
					onAfterFullscreenIn(t) {
						var e;
						null == (e = this.zoom) || e.setFullscreenState(n.a0.OPENED), super.onAfterFullscreenIn(t)
					}
					onAfterFullscreenOut(t) {
						var e;
						null == (e = this.zoom) || e.setFullscreenState(n.a0.CLOSED), super.onAfterFullscreenOut(t)
					}
					zoomIn() {
						return this.ready
					}
					zoomOut() {
						return this.ready
					}
					getZoomData() {
						return this.ready && this.zoom ? this.zoom.getZoomData() : 0
					}
					isZoomed() {
						return !(!this.ready || !this.zoom) && (this.zoom.shown || this.zoom.showing)
					}
					get zoomable() {
						return !1
					}
					clearZoom() {
						this.zoom && (this.zoom.destroy(), this.off("zoomGetImage"), this.off("zoomCancelLoadingOfTiles"), this.off("zoomBeforeShow"), this.off("zoomShown"), this.off("zoomHidden"), this.zoom = null)
					}
					destroy() {
						this.clearZoom(), super.destroy()
					}
				}
				const h = a
			},
			9513: (t, e, i) => {
				i.d(e, {
					A: () => o
				});
				var s = i(7741);
				const o = class {
					constructor(t, e) {
						this.target = t, this.conext = null, this.overlay = null, this.items = {}, this.data = e, this.active = !1, this.showBind = null, this.hideBind = null, this.hideOnScrollBind = null, this.context = null, this._position = {
							top: null,
							left: null
						}, this._fullScreenBox = null, this.setup(e || [])
					}
					get position() {
						return {
							top: this._position.top,
							left: this._position.left
						}
					}
					isExist(t) {
						return !!this.items[t]
					}
					setup(t) {
						this.context = s.A.$new("ul").addClass("sirv-contextmenu").addEvent(["contextmenu", "dragstart", "selectstart"], (t => {
							t.stop()
						})), t.forEach((t => {
							this.addItem(t)
						})), this.hideFX = new s.A.FX(this.context, {
							duration: 200,
							onComplete: () => {
								this.context.remove()
							}
						}), this.overlay = s.A.$new("div").addClass("sirv-contextmenu-overlay").addEvent(["click", "contextmenu"], this.hide.bind(this)).addEvent("mousescroll", (t => {
							t.stop(), t.events[0].stop().stopQueue()
						})), this.hideBind = s.A.$((t => {
							this.active && (t.stop(), 27 === t.originEvent.keyCode && this.hide())
						})).bind(this), s.A.$(window).addEvent("keydown", this.hideBind, 1), this.hideOnScrollBind = s.A.$((t => {
							this.active && this.hide()
						})).bind(this), s.A.$(window).addEvent("scroll", this.hideOnScrollBind)
					}
					addItem(t) {
						const e = this,
							i = s.A.$new("li").appendTo(this.context);
						t.separator ? i.addClass("menu-separator") : t.label && (i.append(document.createTextNode(t.label)), "function" === s.A.typeOf(t.action) && i.addEvent("btnclick", (s => {
							s.stop(), i.attr("disabled") || (e.hide(), t.action.call(t.action, e.position))
						})));
						const o = t.id || "item-" + Math.floor(Math.random() * Date.now());
						this.items[o] = i
					}
					buildMenu() {
						let t = !1;
						return this.data.forEach((e => {
							("function" == typeof e.hidden ? e.hidden() : e.hidden) ? this.hideItem(e.id): (this.showItem(e.id), ("function" == typeof e.disabled ? e.disabled() : e.disabled) ? this.disableItem(e.id) : this.enableItem(e.id), t = !0)
						})), t
					}
					hideItem(t) {
						s.A.$(this.items[t]).setCss({
							display: "none"
						})
					}
					showItem(t) {
						s.A.$(this.items[t]).setCss({
							display: ""
						})
					}
					disableItem(t) {
						s.A.$(this.items[t]).attr("disabled", !0)
					}
					enableItem(t) {
						s.A.$(this.items[t]).removeAttr("disabled")
					}
					show(t) {
						let e = document.body;
						this.hideFX.stop(), s.A.browser.fullScreen.enabled() && this._fullScreenBox && (e = this._fullScreenBox), this.overlay.appendTo(e), this.context.setCss({
							top: -1e4
						}).appendTo(e);
						const i = t.clientXY;
						let o = i.x,
							n = i.y;
						const a = t.pageXY;
						this._position.top = a.y, this._position.left = a.x;
						const h = (t => {
								const e = s.A.$(window).size,
									i = s.A.$(window).scroll;
								return {
									left: t = t || 0,
									right: e.width - t,
									top: t,
									bottom: e.height - t,
									x: i.x,
									y: i.y
								}
							})(5),
							r = this.context.size;
						h.right < o + r.width && (o -= r.width), h.bottom < n + r.height && (n = h.bottom - r.height), this.context.setCss({
							top: n,
							left: o,
							display: "block",
							opacity: 1
						}), this.active = !0
					}
					hide(t) {
						if (this.active && (this.overlay.remove(), this.hideFX.start({
								opacity: [1, 0]
							}), this.active = !1, t && (t.stopDefaults(), "contextmenu" === t.type))) {
							const e = t.pageXY,
								i = this.target.rect;
							i.left <= e.x && i.right >= e.x && i.top <= e.y && i.bottom >= e.y && this.show(t)
						}
					}
					set fullScreenBox(t) {
						this._fullScreenBox = t
					}
					destroy() {
						s.A.$(window).removeEvent("keydown", this.hideBind).removeEvent("scroll", this.hideOnScrollBind);
						try {
							this.context.kill()
						} catch (t) {}
						try {
							this.overlay.kill()
						} catch (t) {}
					}
				}
			},


			7985: (t, e, i) => {
				i.d(e, {
					A: () => a
				});
				const s = class {
					constructor(t, e, i) {
						this.type = t, this._direction = e, this.propagation = !0, this.nextCalls = !0, this.emptyEvent = !0, this.data = Object.assign(i, {
							eventType: this.type,
							eventDirection: this._direction,
							stopEmptyEvent: this.stopEmptyEvent.bind(this),
							stopPropagation: this.stopPropagation.bind(this),
							stopNextCalls: this.stopNextCalls.bind(this),
							stop: this.stop.bind(this),
							stopAll: this.stopAll.bind(this)
						})
					}
					copyData() {
						const t = Object.assign({}, this.data);
						return delete t.eventDirection, delete t.stopEmptyEvent, delete t.stopPropagation, delete t.stopNextCalls, delete t.stop, delete t.stopAll, t
					}
					get customData() {
						return this.data
					}
					get direction() {
						return this._direction
					}
					get emptyEventStopped() {
						return !this.emptyEvent
					}
					get propagationStopped() {
						return !this.propagation
					}
					get nextCallsStopped() {
						return !this.nextCalls
					}
					stopEmptyEvent() {
						this.emptyEvent = !1
					}
					stopPropagation() {
						this.propagation = !1
					}
					stopNextCalls() {
						this.nextCalls = !1
					}
					stop() {
						this.stopPropagation(), this.stopEmptyEvent()
					}
					stopAll() {
						this.stop(), this.stopNextCalls()
					}
				};
				var o = i(6488);
				const n = (t, e) => (o.A.isString(t) ? "" === (t = t.trim()) && (t = e) : t = e, t),
					a = class {
						constructor() {
							this.__parent = null, this.__childs = [], this.__subscribers = {}, this.__NAME_OF_EMPTY_EVENT = "__empty__"
						}
						__setChild(t) {
							this.__childs.push(t)
						}
						__removeChild(t) {
							const e = this.__childs.indexOf(t); - 1 !== e && this.__childs.splice(e, 1)
						}
						set parentClass(t) {
							this.__parent = t, this.__parent.__setChild(this)
						}
						__removeParent() {
							this.__parent && (this.__parent.__removeChild(this), this.__parent = null)
						}
						__callNext(t) {
							t.propagationStopped || ("up" === t.direction ? this.__parent && this.__parent.__next(t) : this.__childs.forEach((e => {
								e.__next(t)
							})))
						}
						__next(t) {
							const e = this.__subscribers[t.type];
							if (t = new s(t.type, t.direction, t.copyData()), e)
								for (let i = 0, s = e.length; i < s && (e[i](t.customData, t, this), !t.nextCallsStopped); i++);
							if (Object.prototype.hasOwnProperty.call(this.__subscribers, this.__NAME_OF_EMPTY_EVENT) && !t.emptyEventStopped)
								for (let e = 0, i = this.__subscribers[this.__NAME_OF_EMPTY_EVENT].length; e < i; e++) this.__subscribers[this.__NAME_OF_EMPTY_EVENT][e](t.customData);
							this.__callNext(t)
						}
						emit(t, e) {
							e && o.A.isObject(e) || (o.A.isObject(t) ? (e = t, t = null) : e = {}), t = n(t, this.__NAME_OF_EMPTY_EVENT), this.__callNext(new s(t, "up", e))
						}
						broadcast(t, e) {
							e && o.A.isObject(e) || (o.A.isObject(t) ? (e = t, t = null) : e = {}), t = n(t, this.__NAME_OF_EMPTY_EVENT), this.__callNext(new s(t, "down", e))
						}
						on(t, e) {
							const i = this;
							return "function" === o.A.typeOf(t) && (e = t, t = null), e ? (t = n(t, this.__NAME_OF_EMPTY_EVENT), this.__subscribers[t] || (this.__subscribers[t] = []), this.__subscribers[t].push(e), () => i.off(t, e)) : null
						}
						off(t, e) {
							let i;
							"function" === o.A.typeOf(t) && (e = t, t = null), t = n(t, this.__NAME_OF_EMPTY_EVENT), e ? Object.prototype.hasOwnProperty.call(this.__subscribers, t) && (i = this.__subscribers[t].indexOf(e), -1 !== i && this.__subscribers[t].splice(i, 1)) : delete this.__subscribers[t]
						}
						destroy() {
							this.__removeParent(), this.__childs = [], this.__subscribers = {}
						}
					}
			},
			5051: (t, e, i) => {
				i.d(e, {
					A: () => h
				});
				var s = i(7741),
					o = i(7985),
					n = i(757);
				class a extends o.A {
					constructor(t) {
						super(), this.items = t, this.stopInstance = null, this.events = {
							lazyimage: {},
							viewer: {},
							spin: {},
							zoom: {},
							image: {},
							video: {},
							model: {}
						}, this.reversedEvents = [], this.addEvents()
					}
					static eventsNameParser(t) {
						let e = null;
						return s.A.isString(t) && (e = t.split(":").map((t => t.trim())).filter((t => "" !== t)), /sirv/i.test(e[0]) && e.shift(), e.length < 2 && (e = null)), e
					}
					static triggerCustomEvent(t, e, i, s, o) {
						void 0 === s && (s = !0), void 0 === o && (o = !0);
						const n = new CustomEvent(t, {
							bubbles: s,
							cancelable: o,
							detail: i
						});
						n && e.node.dispatchEvent(n)
					}
					addReverseEvent(t, e, i) {
						this.reversedEvents.push({
							eventName: t,
							componentName: i,
							callback: e
						})
					}
					callReverseCallback(t, e, i) {
						let s = !1;
						for (let o = 0, n = this.reversedEvents.length; o < n; o++)
							if (this.reversedEvents[o].componentName === t && this.reversedEvents[o].eventName === e) {
								this.reversedEvents[o].callback(i), this.reversedEvents.splice(o, 1), s = !0;
								break
							}
						return s
					}
					addStopInstanceCB(t) {
						this.stopInstance = t
					}
					addEvents() {
						this.on("destroy", (t => {
							t.stopAll(), this.stopInstance && this.stopInstance(t.data.node, "viewer")
						})), this.on("imagePublicEvent", (t => {
							if (t.stopAll(), !this.callReverseCallback("lazyimage", t.data.type, t.data.image)) {
								a.triggerCustomEvent("sirv:lazyimage:" + t.data.type, t.data.node, Object.assign({}, t.data.image));
								const e = this.events.lazyimage[t.data.type];
								e && e.forEach((e => {
									e(t.data.image)
								}))
							}
						})), this.on("viewerPublicEvent", (t => {
							let e, i, s;
							t.stopAll();
							let o = "viewer";
							if ("componentEvent" === t.data.slider.type ? (i = t.data.type, s = Object.assign({}, t.data.slide[t.data.slide.component]), o = t.data.slide.component, t.data.node && (e = t.data.componentEventData.node), Object.entries(t.data.componentEventData).forEach((e => {
									let [i, o] = e;
									"node" === i ? t.data.node && (s[i] = o.node) : "type" !== i && (s[i] = o)
								}))) : (i = t.data.slider.type, "ready" === i && n.Rw.remove(), t.data.node && (e = t.data.node), t.data.slider && (s = t.data.slider, "sendStats" === i && (s.statsData = t.data.event)), ["beforeSlideIn", "beforeSlideOut", "afterSlideIn", "afterSlideOut", "enableItem", "disableItem", "thumbnailClick", "thumbnailHover"].includes(i) && (s = t.data.slide)), !this.callReverseCallback(o, i, s)) {
								e && a.triggerCustomEvent("sirv:" + o + ":" + i, e, Object.assign({}, s));
								const t = this.events[o][i];
								t && t.forEach((t => {
									t(s)
								}))
							}
						})), this.on((t => {
							t.stopAll()
						}))
					}
					addEvent(t, e) {
						let i = () => !1;
						const s = a.eventsNameParser(t);
						if (s && this.events[s[0]] && e) {
							if (this.events[s[0]][s[1]] || (this.events[s[0]][s[1]] = []), this.events[s[0]][s[1]].push(e), ["ready", "init", "onLoad"].includes(s[1])) {
								const t = "lazyimage" === s[0] ? "image" : "viewer";
								("viewer" === t && "onLoad" !== s[1] || "onLoad" === s[1] && "image" === t) && setTimeout((() => {
									this.items[t].forEach((t => {
										t.checkReadiness(s[1], s[0]) && (this.addReverseEvent(s[1], e, s[0]), t.sendEvent(s[1], s[0]))
									}))
								}), 0)
							}
							i = () => this.removeEvent(t, e)
						}
						return i
					}
					removeEvent(t, e) {
						const i = a.eventsNameParser(t);
						if (i && this.events[i[0]] && this.events[i[0]][i[1]]) {
							if (!e) return delete this.events[i[0]][i[1]], !0; {
								const t = this.events[i[0]][i[1]].indexOf(e);
								if (t >= 0) return this.events[i[0]][i[1]].splice(t, 1), !0
							}
						}
						return !1
					}
				}
				const h = a
			},
			2326: (t, e, i) => {
				i.d(e, {
					A: () => o
				});
				var s = i(6488);
				i(757).ms.addCssModule("Hint", ".sirv-hint{-webkit-font-smoothing:antialiased;display:inline-block;left:0;opacity:0;pointer-events:none;position:absolute;text-align:center;top:50%;transform:translate3d(0,-50%,1px);transition:opacity .3s linear;width:100%;z-index:42}.sirv-hint.show{opacity:1}.sirv-hint-message{background:#373a3ccc;border-radius:2px;color:#fff;display:inline-block;font:normal 16px/1.5 Lucida Grande,Lucida Sans Unicode,Verdana,Helvetica Neue,Arial,Helvetica,sans-serif;padding:.35em 1.5em;position:relative;text-decoration:none}");
				const o = class {
					constructor(t, e) {
						this.parent = s.A.$(t), this.options = Object.assign({
							html: "hint",
							showClass: "show",
							additionalClass: [],
							autohide: 3500
						}, e || {}), this.instanceNode = s.A.$new("div").addClass("sirv-hint"), this.hintContainer = s.A.$new("span").addClass("sirv-hint-message"), this.inDoc = !1, this.isShown = !1, this.timer = null, this.instanceNode.addClass(...this.options.additionalClass), this.hintContainer.node.innerHTML = this.options.html, this.instanceNode.append(this.hintContainer)
					}
					get autoHideTime() {
						return this.options.autohide
					}
					get actionTime() {
						let t = 0,
							e = this.instanceNode.getCss("transition");
						try {
							e = e.split(" ")[1]
						} catch (t) {
							e = 0
						}
						return e && (e = e.trim(), /m?s$/.test(e) && (/s$/.test(e) ? (t = parseFloat(e), t *= 1e3) : t = parseInt(e, 10))), t
					}
					get movingTime() {
						return this.autoHideTime + this.actionTime
					}
					append() {
						this.inDoc || (this.inDoc = !0, this.parent.append(this.instanceNode))
					}
					removeEvent() {
						this.instanceNode.removeEvent("transitionend")
					}
					show() {
						this.append(), clearTimeout(this.timer), this.timer = null, this.instanceNode.render(), this.removeEvent(), this.instanceNode.addClass(this.options.showClass), this.isShown = !0, this.options.autohide && (this.timer = setTimeout((() => {
							this.hide()
						}), this.options.autohide))
					}
					hide() {
						this.inDoc && (this.removeEvent(), clearTimeout(this.timer), this.timer = null, this.instanceNode.addEvent("transitionend", (t => {
							t.stop(), this.removeEvent(), this.inDoc = !1, this.instanceNode.remove()
						})), this.instanceNode.removeClass(this.options.showClass), this.isShown = !1)
					}
					destroy() {
						this.instanceNode.setCssProp("transitionend", "none"), this.hide(), this.removeEvent(), this.hintContainer.remove(), this.hintContainer.node.innerHTML = "", this.instanceNode.remove(), this.inDoc = !1
					}
				}
			},
			4120: (t, e, i) => {
				i.d(e, {
					A: () => p
				});
				var s = i(7985),
					o = i(2308),
					n = i(7741),
					a = i(757);
				const h = i(511).Mu + "-hotspot-pointer",
					r = h + "--active",
					l = "sirv-hotspot-tooltip";
				a.ms.addCssModule("Hotspot", '@charset "UTF-8";.smv-hotspot-pointer{height:0;pointer-events:auto;position:absolute;width:0;z-index:11}.sirv-hotspot-pointer{cursor:pointer;height:20px;transform:translate(-50%,-50%);width:20px}.sirv-hotspot-pointer.pulsating-point{background-image:none}.sirv-hotspot-pointer.pulsating-point:after,.sirv-hotspot-pointer.pulsating-point:before{border-radius:100%;content:"";display:inline-block;height:100%;left:0;position:absolute;top:0;transform-origin:50% 50%;width:100%}.sirv-hotspot-pointer.pulsating-point:before{background-color:#ff0;opacity:.6;overflow:hidden;transition:opacity .2s ease-in,transform .1s ease-out}.sirv-hotspot-pointer.pulsating-point:after{animation:pulsating-point-pulsate 3s ease-out infinite;border:1px solid #ff0;box-sizing:border-box;opacity:0;pointer-events:none}.sirv-hotspot-pointer.pulsating-point:active:before{transform:scale(.875)}.sirv-hotspot-pointer.pulsating-point:active:after{animation:pulsating-point-stop-pulsate .3s}@media (any-hover:hover){.sirv-hotspot-pointer.pulsating-point:hover:before{cursor:pointer;opacity:.8}.sirv-hotspot-pointer.pulsating-point:hover:after{animation:none}}.smv-hotspot-pointer--active .sirv-hotspot-pointer.pulsating-point:before{opacity:1}.smv-hotspot-pointer--active .sirv-hotspot-pointer.pulsating-point:after{animation:none}.smv .smv-slides-box .smv-slides .smv-slide .smv-content .sirv-hotspot-container{pointer-events:none;position:absolute!important}.smv .smv-slides-box .smv-slides .smv-slide .smv-content .sirv-hotspot-container.sirv-hotspot-overwrite-pointer-event{pointer-events:auto!important}@keyframes pulsating-point-pulsate{0%{opacity:.8;transform:scale(1)}45%{opacity:0;transform:scale(1.75)}}@keyframes pulsating-point-stop-pulsate{0%{opacity:.4}to{opacity:0;transform:scale(2)}}.sirv-hotspot-tooltip{-webkit-font-smoothing:antialiased;background-color:#fff;border:1px solid #efefef;border-collapse:initial;border-radius:4px;box-shadow:0 5px 10px 2px #0000001a;display:block;font:normal 12px/1.42857 Lucida Grande,Lucida Sans Unicode,Verdana,Helvetica Neue,Arial,Helvetica,sans-serif;opacity:0;padding:8px 24px;pointer-events:none;position:absolute;transition:opacity .15s linear 0s;z-index:9999999999}.sirv-hotspot-tooltip--default{background-color:#31333dc2;border:0;color:#eee;margin-top:-8px;padding:6px 9px;transform:translate(-50%,-100%)}.sirv-hotspot-tooltip--default:after{border-color:#31333dc2 #0000 #0000;border-style:solid;border-width:8px 8px 0;content:"";height:0;left:50%;position:absolute;top:100%;transform:translateX(-50%);width:0}.sirv-hotspot-tooltip--balloon{margin-top:-40px;transform:translate(-40px,-100%)}.sirv-hotspot-tooltip--balloon:after{border-color:#0000 #fff #0000 #0000;border-style:solid;border-width:0 15px 40px 0;content:"";height:0;left:24px;position:absolute;top:100%;width:0}.sirv-hotspot-tooltip.sirv-hotspot-tooltip-visible{opacity:1;transition-delay:.1s}.sirv-hotspot-box{box-sizing:border-box;display:flex;max-height:100vh;max-width:100vw;padding:10px;position:absolute;transition:opacity .15s linear 0s;z-index:9999999999}.sirv-hotspot-box.sirv-hotspot-box-out-of-width{left:0!important;right:0!important}.sirv-hotspot-box.sirv-hotspot-box-out-of-height{bottom:0!important;top:0!important}.sirv-hotspot-box .sirv-hotspot-box-wrapper{background:#fff;border:1px solid #efefef;border-collapse:initial;border-radius:4px;box-shadow:0 5px 10px 2px #0000001a;box-sizing:border-box;display:flex;font-size:16px!important;line-height:100%;max-height:inherit;max-width:inherit;overflow:hidden;padding:22px;position:relative;text-align:left}.sirv-hotspot-box .sirv-hotspot-box-content{height:calc(100% + 2px);left:0;max-height:inherit;max-width:inherit;overflow:auto;top:0;width:100%}.sirv-hotspot-box .sirv-hotspot-close-button{speak:none;-webkit-font-smoothing:antialiased;color:#888;cursor:pointer;font:normal 22px/1 Arial,monospace;height:24px;position:absolute;right:2px;text-align:center;top:2px;width:24px}.sirv-hotspot-box .sirv-hotspot-close-button:before{-webkit-font-smoothing:inherit!important;color:inherit!important;content:"×";display:inline;font:inherit!important;position:static;vertical-align:middle}');
				const d = {
					AUTO: 0,
					VISIBLE: 1
				};
				class c extends s.A {
					constructor(t, e, i) {
						super(), this.container = t, this.hotspotData = e, this._id = i, this.box = null, this.boxContainer = document.body, this.baseBoxSize = null, this.tooltip = null, this.version = 1, this.pointer = n.A.$new("div").addClass(h), this.hotspotSettings = {}, this.dX = 1, this.dY = 1, this.isActive = !1, this.isDisabled = !1, this.isPointerInDoc = !1, this.isTtShown = !1, this.isShown = !1, this.isBoxContent = !1, this.tooltipState = d.AUTO, this.boxState = d.AUTO, this.init()
					}
					isTooltipShown() {
						return this.isTtShown
					}
					isBoxActivated() {
						return this.isActive
					}
					isBoxAlwaysVisible() {
						return this.boxState === d.VISIBLE
					}
					isTooltipAlwaysVisible() {
						return this.tooltipState === d.VISIBLE
					}
					init() {
						this.setVersion(), this.parseHotspotData(), this.createBlocks(), this.addEvents(), this.createBox()
					}
					setVersion() {
						(this.hotspotData.style || this.hotspotData.tooltip || this.hotspotData.box && this.hotspotData.box.content) && (this.version = 2)
					}
					parseHotspotData() {
						Object.keys(this.hotspotData).forEach((t => this.hotspotSettings[t] = this.hotspotData[t])), this.hotspotSettings.pointerPositionPercentage = {
							top: (0, o.A)("" + this.hotspotSettings.pointer.y),
							left: (0, o.A)("" + this.hotspotSettings.pointer.x)
						}
					}
					createBlocks() {
						var t, e;
						const i = null == (t = this.hotspotSettings) || null == (e = t.pointer) ? void 0 : e.template;
						if (i) this.pointer.node.innerHTML = i;
						else {
							var s, o, a, h;
							const t = n.A.$new("div").addClass("pulsating-point").addClass("sirv-hotspot-pointer").addClass("hotspot-pointer"),
								e = null != (s = null == (o = this.hotspotSettings) || null == (a = o.pointer) ? void 0 : a.style) ? s : null == (h = this.hotspotSettings) ? void 0 : h.style;
							e && t.addClass(e), this.pointer.append(t)
						}
						var r, d, c, p;
						this.pointer.attr("data-spot-id", this._id), this.version > 1 && this.hotspotSettings.tooltip && this.hotspotSettings.tooltip.content && (this.tooltip = n.A.$new("div").addClass(l).changeContent(this.hotspotSettings.tooltip.content), null != (r = this.hotspotSettings) && null != (d = r.tooltip) && d.style && this.tooltip.addClass(null == (c = this.hotspotSettings) || null == (p = c.tooltip) ? void 0 : p.style))
					}
					setTooltipPosition() {
						if (this.tooltip) {
							let t = this.pointer.rect;
							const e = {
								top: 0,
								left: 0
							};
							e.top = this.hotspotSettings.tooltip.style ? t.top : t.bottom, e.left = this.hotspotSettings.tooltip.style ? (t.left + t.right) / 2 : t.right, "body" !== n.A.$(this.boxContainer).tagName && (t = this.pointer.node.getBoundingClientRect(), e.top = this.hotspotSettings.tooltip.style ? t.top - this.container.node.getBoundingClientRect().top : t.bottom - this.container.node.getBoundingClientRect().top, e.left = this.hotspotSettings.tooltip.style ? t.left - this.container.node.getBoundingClientRect().left + t.width / 2 : t.left - this.container.node.getBoundingClientRect().left + t.width), this.tooltip.setCss(e)
						}
					}
					showTooltip() {
						this.isTtShown || this.isDisabled || !this.tooltip || (this.isTtShown = !0, this.setTooltipPosition(), this.tooltip.appendTo(this.boxContainer).addClass(l + "-visible"), this.emit("hotspotTooltipShown", {
							data: {
								hotspot: this
							}
						}))
					}
					hideTooltip() {
						this.isTtShown && this.tooltip && (this.isTtShown = !1, this.tooltip.removeClass(l + "-visible"), this.isActive || this.pointer.removeClass(r), this.emit("hotspotTooltipHidden", {
							data: {
								hotspot: this
							}
						}))
					}
					addEvents() {
						let t;
						this.pointer.addEvent(["click", "mousedown"], (t => {
							t.stop()
						})), this.pointer.addEvent(["btnclick", "tap"], (t => 3 === t.button || (this.hotspotSettings.link ? (t.stop(), setTimeout((() => {
							window.open(this.hotspotSettings.link)
						}))) : this.isBoxContent ? (t.stop(), this.isActive ? this.hideBox() : this.showBox()) : this.tooltip && "tap" === t.type && (this.isTtShown ? this.hideTooltip() : (this.showTooltip(), this.pointer.addClass(r))), !1))), "edge" === n.A.browser.uaName && this.pointer.addEvent("mousedown", (t => {
							t.stopDistribution()
						})), this.hotspotSettings.tooltip && this.hotspotSettings.tooltip.content && (this.pointer.addEvent("mouseenter", (t => {
							this.isActive || this.showTooltip()
						})), this.pointer.addEvent("mouseleave", (() => {
							this.tooltipState !== d.VISIBLE && this.hideTooltip()
						}))), n.A.$(window).addEvent("resize", (e => {
							clearTimeout(t), t = setTimeout((() => {
								if (this.isActive) {
									const t = this.hotspotSettings;
									t && this.box.setCss(this.getBoxPosition(t))
								}
							}), 42)
						}))
					}
					createBox() {
						var t, e;
						let i = null;
						var s, o;
						if (this.version > 1 && this.hotspotSettings.box && this.hotspotSettings.box.content ? i = this.hotspotSettings.box.content : this.hotspotSettings.data && (i = this.hotspotSettings.data), this.box = n.A.$new("div").addClass("sirv-hotspot-box"), null != (t = this.hotspotSettings) && null != (e = t.box) && e.style && this.box.addClass(null == (s = this.hotspotSettings) || null == (o = s.box) ? void 0 : o.style), i) {
							this.isBoxContent = !0;
							const t = n.A.$new("div").addClass("sirv-hotspot-box-wrapper").append(n.A.$new("div").addEvent(["btnclick", "tap"], (t => {
									this.boxState !== d.VISIBLE && (t.stop(), this.hideBox(!0))
								})).addClass("sirv-hotspot-close-button")),
								e = n.A.$new("div").addClass("sirv-hotspot-box-content").changeContent(i + "").addEvent("click", (t => {
									t.stopDistribution()
								}));
							t.append(e), this.box.append(t)
						}
						this.box.setCss({
							top: "-10000px",
							left: "-10000px",
							position: "absolute",
							opacity: 0
						})
					}
					getBoxPosition(t) {
						const e = {
							top: 0,
							left: 0,
							transform: ""
						};
						if (t && t.box) {
							const i = t.box.x,
								s = t.box.y;
							if (this.hotspotSettings.box.fixed) {
								const t = this.container.rect;
								if ("body" !== n.A.$(this.boxContainer).tagName) {
									switch (s) {
										case "top":
											e.top = 0;
											break;
										case "bottom":
											e.top = t.bottom - t.top, e.transform += " translateY(-100%)";
											break;
										case "center":
											e.top = (t.bottom - t.top + 0) / 2, e.transform += " translateY(-50%)";
											break;
										default:
											e.top = 0 + (parseFloat(s) || 0)
									}
									switch (i) {
										case "left":
											e.left = 0;
											break;
										case "right":
											e.left = t.right - t.left, e.transform += " translateX(-100%)";
											break;
										case "center":
											e.left = (t.right - t.left) / 2, e.transform += " translateX(-50%)";
											break;
										default:
											e.left = t.left + (parseFloat(i) || 0)
									}
								} else {
									switch (s) {
										case "top":
											e.top = t.top;
											break;
										case "bottom":
											e.top = t.bottom, e.transform += " translateY(-100%)";
											break;
										case "center":
											e.top = (t.top + t.bottom) / 2, e.transform += " translateY(-50%)";
											break;
										default:
											e.top = t.top + (parseFloat(s) || 0)
									}
									switch (i) {
										case "left":
											e.left = t.left;
											break;
										case "right":
											e.left = t.right, e.transform += " translateX(-100%)";
											break;
										case "center":
											e.left = (t.left + t.right) / 2, e.transform += " translateX(-50%)";
											break;
										default:
											e.left = t.left + (parseFloat(i) || 0)
									}
								}
							} else {
								const t = this.pointer.position;
								e.left = t.left + (parseFloat(i) || 0), e.top = t.top + (parseFloat(s) || 0)
							}
						}
						return e
					}
					setBoxPosition() {
						let t = {
							transform: ""
						};
						t = this.getBoxPosition(this.hotspotSettings), this.box.setCssProp("position", ""), this.box.setCss(t), this.box.render()
					}
					showBox() {
						this.isActive || this.isDisabled || (this.tooltip && this.tooltipState === d.AUTO && this.tooltip.removeClass(l + "-visible"), this.box.setCss({
							opacity: 0
						}), this.box.appendTo(this.boxContainer), this.setBaseBoxSize(this.box.size), this.setBoxPosition(), this.box.setCss({
							opacity: 1
						}), this.pointer.addClass(r), this.isActive = !0, this.emit("hotspotActivate", {
							data: {
								hotspot: this
							}
						}))
					}
					hideBox(t) {
						if (this.isActive) {
							if (t) return this.box && this.box.setCssProp("opacity", 0), setTimeout((() => {
								this.hideBox()
							}), 300), this._id;
							this.box && (this.pointer.removeClass(r), this.box.remove()), this.isActive = !1, this.emit("hotspotDeactivate", {
								data: {
									hotspot: this
								}
							})
						}
					}
					changeBoxContainer(t) {
						this.boxContainer = null != t ? t : document.body
					}
					setBaseBoxSize(t, e) {
						(t && e || !this.baseBoxSize) && (this.baseBoxSize = {
							width: t.width,
							height: t.height
						})
					}
					setHotspotSettings(t) {
						for (const e in t)({}).hasOwnProperty.call(t, e) && (this.hotspotSettings[e] = t[e])
					}
					getHotspotSettings(t) {
						return this.hotspotSettings
					}
					setAspectRatio(t, e) {
						this.dX = t, this.dY = e
					}
					setPointerPosition() {
						const t = this.hotspotSettings;
						t && this.pointer.setCss({
							top: t.pointerPositionPercentage.top ? t.pointer.y : Math.ceil(t.pointer.y * this.dY),
							left: t.pointerPositionPercentage.left ? t.pointer.x : Math.ceil(t.pointer.x * this.dX)
						})
					}
					showPointer() {
						this.hotspotSettings && !this.isDisabled ? (this.setPointerPosition(), this.isPointerInDoc || (this.isPointerInDoc = !0, this.pointer.appendTo(this.container))) : this.hidePointer()
					}
					hidePointer() {
						this.isPointerInDoc && (this.isPointerInDoc = !1, this.pointer.remove())
					}
					isHotspotShown() {
						return this.isShown
					}
					show() {
						this.isDisabled || this.isShown || (this.isShown = !0, this.showPointer(), this.boxState === d.SHOW && this.showBox(), this.tooltipState === d.SHOW && this.showTooltip())
					}
					hide() {
						this.isShown && (this.isShown = !1, this.hideBox(), this.hideTooltip(), this.hidePointer())
					}
					isEnabled() {
						return !this.isDisabled
					}
					enable() {
						this.isDisabled && (this.isDisabled = !1)
					}
					disable() {
						this.isDisabled || (this.isDisabled = !0, this.hide())
					}
					get id() {
						return this._id
					}
					set id(t) {
						this._id = t
					}
					get boxSize() {
						var t, e;
						return null != (t = null == (e = this.box) ? void 0 : e.size) ? t : {
							width: 0,
							height: 0
						}
					}
					setState(t, e) {
						this.boxState !== t.popup && (this.boxState = t.popup, t.popup === d.VISIBLE ? e || this.showBox() : this.hideBox()), this.tooltipState !== t.tooltip && (this.tooltipState = t.tooltip, t.tooltip === d.VISIBLE ? e || this.showTooltip() : this.hideTooltip())
					}
					rewriteAttrPointer(t) {
						this.pointer.attr("data-spot-id", t || this._id)
					}
					getHotspotPointer() {
						return this.pointer.node
					}
					destroy() {
						this.hideBox(), this.hideTooltip(), this.hotspotData = null, this.container = null, this._id = null, this.pointer.clearEvents(), this.tooltip && this.tooltip.clearEvents(), this.pointer.remove(), this.box = null, this.boxContainer = null, this.baseBoxSize = null, this.tooltip = null, this.version = null, this.pointer = null, this.hotspotSettings = null, this.isActive = !1, this.isDisabled = !1, this.isPointerInDoc = !1, this.isTtShown = !1, super.destroy()
					}
				}
				const p = c
			},
			183: (t, e, i) => {
				i.r(e), i.d(e, {
					default: () => r
				});
				var s = i(4120),
					o = i(7985),
					n = i(7741);
				const a = "sirv-hotspot-overwrite-pointer-event";
				class h extends o.A {
					constructor() {
						super(), this.container = n.A.$new("div").addClass("sirv-hotspot-container"), this.hotspots = [], this.activeHotspots = [], this.shownTooltips = [], this._originImageSize = {
							width: 0,
							height: 0
						}, this._instanceComponentNode = null, this.api = {
							add: this.addHotspot.bind(this),
							remove: this.removeHotspot.bind(this),
							removeAll: this.removeAllHotspots.bind(this),
							list: () => this.hotspots.map((t => t.getHotspotPointer())),
							setVisibility: this.setStateById.bind(this),
							enable: this.enable.bind(this),
							disable: this.disable.bind(this)
						}, this.addEvents()
					}
					set originImageSize(t) {
						this._originImageSize = {
							width: t.width,
							height: t.height
						}
					}
					appendTo(t) {
						this.container.appendTo(t)
					}
					set instanceComponentNode(t) {
						this.hotspots.length || (this._instanceComponentNode = t)
					}
					set containerSize(t) {
						if (!this.hotspots.length || !t) return;
						const e = this.getRightBoundengClientRect();
						this.container.setCss({
							top: t.top - e.top,
							left: t.left - e.left,
							width: 100 * t.width / e.width + "%",
							height: 100 * t.height / e.height + "%"
						});
						const i = this.container.size,
							s = i.width / this._originImageSize.width,
							o = i.height / this._originImageSize.height;
						this.hotspots.forEach((t => t.setAspectRatio(s, o)))
					}
					overridePointerEvent(t) {
						t && (t.isBoxAlwaysVisible() || t.isTooltipAlwaysVisible()) || this.container.addClass(a)
					}
					removeOverridePointerEvent(t) {
						t && t.length && t.filter((t => !t.isBoxAlwaysVisible() && !t.isTooltipAlwaysVisible())).length || this.container.removeClass(a)
					}
					getActiveHotspot(t) {
						return this.activeHotspots.find((e => e.id === t))
					}
					getShownTooltips(t) {
						return this.shownTooltips.find((e => e.id === t))
					}
					addEvents() {
						this.on("hotspotActivate", (t => {
							t.stopEmptyEvent(), this.getActiveHotspot(t.data.hotspot.id) || (this.activeHotspots.forEach((t => {
								t.isBoxAlwaysVisible() || t.hideBox(!0)
							})), this.activeHotspots.push(t.data.hotspot), this.overridePointerEvent(t.data.hotspot), t.data.id = t.data.hotspot.id, delete t.data.hotspot)
						})), this.on("hotspotDeactivate", (t => {
							t.stopEmptyEvent();
							const e = this.getActiveHotspot(t.data.hotspot.id);
							e && (this.activeHotspots = this.activeHotspots.filter((t => t.id !== e.id)), this.removeOverridePointerEvent(this.activeHotspots)), t.data.id = t.data.hotspot.id, delete t.data.hotspot
						})), this.on("hotspotTooltipShown", (t => {
							t.stopAll(), this.getShownTooltips(t.data.hotspot.id) || (n.A.browser.mobile && this.shownTooltips.forEach((t => {
								t.isTooltipAlwaysVisible() || t.hideTooltip(!0)
							})), this.shownTooltips.push(t.data.hotspot), n.A.browser.mobile && (this.overridePointerEvent(t.data.hotspot), this.emit("hotspotActivate", {
								data: {
									id: t.data.hotspot.id
								}
							})))
						})), this.on("hotspotTooltipHidden", (t => {
							t.stopAll();
							const e = this.getShownTooltips(t.data.hotspot.id);
							e && (this.shownTooltips = this.shownTooltips.filter((t => t.id !== e.id)), n.A.browser.mobile && this.removeOverridePointerEvent(this.shownTooltips), n.A.browser.mobile && this.emit("hotspotDeactivate", {
								data: {
									id: t.data.hotspot.id
								}
							}))
						})), this.clickFn = t => {
							this.activeHotspots.forEach((t => {
								t.isBoxAlwaysVisible() || t.hideBox(!0)
							})), this.shownTooltips.forEach((t => {
								t.isTooltipAlwaysVisible() || t.hideTooltip(!0)
							}))
						}, n.A.$(document).addEvent("click", this.clickFn)
					}
					isHotspotActivated() {
						return this.activeHotspots.length > 0
					}
					get hotspotData() {
						return this.hotspots.map((t => t.hotspotData))
					}
					createHotspots(t) {
						t && t.length && t.forEach((t => {
							this.createHotspot(t, this.hotspots.length)
						}))
					}
					createHotspot(t, e) {
						const i = new s.A(this.container, t, e);
						i.parentClass = this, this.hotspots.push(i)
					}
					addHotspot(t) {
						Array.isArray(t) || (t = [t]), this.createHotspots(t, this.hotspots.length)
					}
					getRightBoundengClientRect(t) {
						return this.hotspots.length ? this.container.node.parentNode.getBoundingClientRect() : this._instanceComponentNode ? this._instanceComponentNode.node.getBoundingClientRect() : t.node.getBoundingClientRect()
					}
					changeBoxContainerParent(t) {
						const e = t ? this.container : null;
						this.hotspots.forEach((t => {
							t.changeBoxContainer(e)
						}))
					}
					hideActiveHotspotBox(t) {
						const e = this.activeHotspots.length || this.shownTooltips.length;
						return this.activeHotspots.forEach((e => {
							e.hideBox(t)
						})), this.shownTooltips.forEach((t => {
							t.hideTooltip()
						})), e
					}
					show(t) {
						const e = this.hotspots[t];
						e && e.show()
					}
					showAll() {
						this.hotspots.forEach((t => {
							t.show()
						}))
					}
					hide(t) {
						const e = this.hotspots[t];
						e && e.hide()
					}
					hideAll() {
						this.hotspots.forEach((t => {
							t.hide()
						}))
					}
					enable(t) {
						const e = this.hotspots[t];
						e && (e.enable(), e.show())
					}
					disable(t) {
						this.hotspots[t] && this.hotspots[t].disable()
					}
					enableAll() {
						this.hotspots.forEach((t => {
							t.enable(), t.show()
						}))
					}
					disableAll() {
						this.hotspots.forEach((t => {
							t.disable()
						}))
					}
					showNeededElements() {
						this.hotspots.forEach((t => {
							t.isEnabled() && t.isHotspotShown() && (t.isBoxAlwaysVisible() && (t.isBoxActivated() && t.setBoxPosition(), t.showBox()), t.isTooltipAlwaysVisible() && (t.isTooltipShown() && t.setTooltipPosition(), t.showTooltip()))
						}))
					}
					removeHotspot(t) {
						const e = this.hotspots[t];
						e && (e.disable(), e.destroy(), this.removeByIndex(t), this.hotspots.length || this.container.remove())
					}
					removeAllHotspots() {
						for (let t = this.hotspots.length - 1; t >= 0; t--) this.removeHotspot(t)
					}
					removeByIndex(t) {
						this.hotspots.splice(t, 1), (this.hotspots.length > 0 && 0 === t || t > 0 && t <= this.hotspots.length - 1) && this.rewriteHotspotIndex(t)
					}
					rewriteHotspotIndex(t) {
						for (let e = t, i = this.hotspots.length; e < i; e++) this.hotspots[e].id = e, this.hotspots[e].rewriteAttrPointer()
					}
					setStateById(t, e) {
						this.hotspots[t] && this.hotspots[t].setState(e)
					}
					destroy() {
						n.A.$(document).removeEvent("click", this.clickFn), this.hotspots.forEach((t => {
							t.destroy()
						})), this.container = null, this.activeHotspots = [], this.shownTooltips = [], this._instanceComponentNode = null, this.off("hotspotActivate"), this.off("hotspotDeactivate"), this.off("hotspotTooltipShown"), this.off("hotspotTooltipHidden"), this.hotspots = [], super.destroy()
					}
				}
				const r = h
			},
			9383: (t, e, i) => {
				i.r(e), i.d(e, {
					default: () => h
				});
				var s = i(183),
					o = i(2308),
					n = i(7746);
				class a extends s.default {
					constructor() {
						super(), this.options = {
							rows: 1,
							columns: 36,
							rowsRevers: !1,
							columnsRevers: !1,
							originImageSize: {}
						}, this.row = null, this.col = null, this.hotspotsSettings = []
					}
					set Options(t) {
						this.options = Object.assign(this.options, t || {})
					}
					get frameIndex() {
						let t;
						return t = this.options.rowsRevers && this.options.columnsRevers ? (this.options.rows - this.row - 1) * this.options.columns + (this.options.columns - this.col) : this.options.rowsRevers ? (this.options.rows - this.row - 1) * this.options.columns + this.col + 1 : this.options.columnsRevers ? this.row * this.options.columns + (this.options.columns - this.col) : this.row * this.options.columns + this.col + 1, t
					}
					createHotspotsSettings(t) {
						let e = !0;
						for (let i = 0, s = t.length; i < s; i++) {
							const s = new Map;
							Object.entries(t[i].frames).forEach((n => {
								let [a, h] = n;
								const r = h;
								r.pointerPositionPercentage = {
									top: (0, o.A)("" + h.pointer.y),
									left: (0, o.A)("" + h.pointer.x)
								}, Object.entries(t[i]).forEach((t => {
									let [i, s] = t;
									"frames" !== i && ("data" !== i || e) && ("pointer" === i ? Object.assign(r[i], s) : r[i] = s, e = !1)
								})), s.set(parseInt(a, 10), r)
							})), this.hotspotsSettings.push(s), e = !0
						}
					}
					get hotspotData() {
						return this.hotspotsSettings.map((t => {
							let e = {};
							return t.forEach(((t, i) => {
								e = (0, n.A)(e, ((t, e) => {
									if (t.style || t.tooltip || null != t && t.box.content) {
										const i = {};
										return i[e] = {
											pointer: t.pointer
										}, {
											box: t.box,
											frames: i,
											style: t.style,
											tooltip: t.tooltip
										}
									}
									const i = {
										frames: {}
									};
									return t.data && (i.data = t.data), i.frames[e] = {
										box: t.box,
										pointer: t.pointer
									}, i
								})(t, i))
							})), e
						}))
					}
					createHotspots(t) {
						Array.isArray(t) || (t = [t]), this.createHotspotsSettings(t);
						const e = this.startHotspotSettings;
						super.createHotspots(e), this.hotspotsSettings.forEach(((t, e) => {
							const i = t.get(this.frameIndex),
								s = this.hotspots[e];
							i && s.isEnabled() && (s.setHotspotSettings(i), s.setPointerPosition())
						}))
					}
					addHotspot(t) {
						Array.isArray(t) || (t = [t]), this.createHotspotsSettings(t);
						const e = this.startHotspotSettings;
						super.createHotspots(e.slice(e.length - t.length)), this.updateAndShow()
					}
					get startHotspotSettings() {
						const t = [];
						return this.hotspotsSettings.forEach((e => {
							let i = null;
							e.entries().next().value && (i = e.entries().next().value[1]), i && t.push(i)
						})), t
					}
					setFramePosition(t, e) {
						this.row = t, this.col = e
					}
					updateAndShow() {
						const t = this.frameIndex;
						this.hotspotsSettings.forEach(((e, i) => {
							const s = e.get(t),
								o = this.hotspots[i];
							s && o.isEnabled() ? (o.setHotspotSettings(s), o.isHotspotShown() ? (o.setPointerPosition(), this.showNeededElements(), o.isBoxAlwaysVisible() && (o.setBaseBoxSize(o.boxSize), o.setBoxPosition()), o.isTooltipAlwaysVisible() && o.setTooltipPosition()) : this.show(i)) : this.hide(i)
						}))
					}
					hideNeededElements(t) {
						this.activeHotspots.forEach((e => {
							e.isBoxAlwaysVisible() || e.hideBox(t)
						})), this.shownTooltips.forEach((e => {
							e.isTooltipAlwaysVisible() && e.hideTooltip(t)
						}))
					}
					changeHotspotsPosition(t, e) {
						this.row === t && this.col === e || (this.setFramePosition(t, e), this.updateAndShow())
					}
					showAll() {
						const t = this.frameIndex;
						this.hotspotsSettings.forEach(((e, i) => {
							e.get(t) && this.show(i)
						}))
					}
					enable(t) {
						if (this.hotspotsSettings[t]) {
							const e = this.hotspots[t];
							e.enable(), this.hotspotsSettings[t].get(this.frameIndex) && e.show()
						}
					}
					setStateById(t, e) {
						this.hotspots[t] && this.hotspots[t].setState(e, !this.hotspotsSettings[t].get(this.frameIndex))
					}
					removeHotspot(t) {
						this.hotspots[t] && (this.hotspotsSettings.splice(t, 1), super.removeHotspot(t))
					}
					destroy() {
						super.destroy(), this.options = null, this.row = null, this.col = null, this.hotspotsSettings = null
					}
				}
				const h = a
			},
			4791: (t, e, i) => {
				i.d(e, {
					A: () => ot
				});
				var s = i(7741);
				const o = class {
						constructor(t) {
							this.pn = s.A.$(t);
							const e = "sirv-zoom";
							var i;
							this.cnv = s.A.$new("div"), this.cnv.addClass(e), this.node = s.A.$new("div").setCss({
								opacity: 0
							}), this.node.addClass(e + "-wrapper"), this.zoomWrapper = s.A.$new("div").addClass("sirv-zoom-image-wrapper"), this.zoom = (i = this.pn, s.A.$(s.A.$(i).node.getElementsByTagName("img")[0] || s.A.$(i).node.getElementsByTagName("canvas")[0] || i)), this.lens = document.body, this.isBody = !0, this.lastCursorClass = null, this.image = null, this.perspective = "", s.A.browser.mobile && "ios" === s.A.browser.platform && (this.perspective = "perspective(1000px) ")
						}
						get hash() {
							return this.image ? this.image.$J_UUID + "" || this.image.attr("src") : null
						}
						get parentSize() {
							return this.pn.size
						}
						get parentPostion() {
							return this.pn.position
						}
						get zoomSize() {
							return this.zoom.size
						}
						get parentBoundaries() {
							return this.cnv.node.parentNode ? this.cnv.node.getBoundingClientRect() : null
						}
						addScrollEvent(t) {
							s.A.$(window).addEvent("scroll", t)
						}
						removeScrollEvent(t) {
							t ? s.A.$(window).removeEvent("scroll", t) : s.A.$(window).removeEvent("scroll")
						}
						addClassToWrapper(t) {
							this.node.addClass("sirv-" + t + "-zoom")
						}
						addEventToMainContainer(t, e) {
							this.cnv.addEvent(t, e)
						}
						removeEventFromMainContainer() {
							for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++) e[i] = arguments[i];
							this.cnv.removeEvent(e)
						}
						addEventToWrapper(t, e) {
							this.node.addEvent(t, e)
						}
						removeEventFromWrapper() {
							for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++) e[i] = arguments[i];
							this.node.removeEvent(e)
						}
						addMouseoutEvent(t) {
							this.addEventToWrapper("mouseout", (e => {
								let i = e.related;
								if (i) {
									for (; i && i !== this.node.node && i !== this.lens.node;) i = i.parentNode;
									this.node.node !== i && t(e)
								}
							}))
						}
						set lensContainer(t) {
							t || (t = s.A.$(document.body)), this.isBody = s.A.$(t) === s.A.$(document.body), this.lens = s.A.$(t)
						}
						toggleCursorClass(t) {
							t !== this.lastCursorClass && (this.lastCursorClass && (this.cnv.removeClass(this.lastCursorClass), this.lastCursorClass = null), t && (this.cnv.addClass(t), this.lastCursorClass = t))
						}
						setImagePosition(t, e) {
							this.image && this.zoomWrapper.setCssProp("transform", this.perspective + "translate3d(" + t.x + "px, " + t.y + "px, 0) scale(" + e.x + ", " + e.y + ")")
						}
						addStartCss() {
							this.lensStyle = {
								opacity: 0,
								transform: "scale(0)"
							}
						}
						appendNodes(t, e) {
							this.cnv.addEvent("contextmenu", (t => {
								t.stopDefaults()
							})), this.image = s.A.$(t), this.image.setCss({
								width: e.width,
								height: e.height
							}), s.A.browser.mobile || this.image.addEvent("mousedown", (t => {
								t.stopDefaults()
							})), this.zoomWrapper.append(this.image), this.node.append(this.zoomWrapper), this.node.appendTo(this.cnv), this.cnv.appendTo(this.lens, !1)
						}
						set eventNodePositionSize(t) {
							let e = t.position.top,
								i = t.position.left;
							if (!this.isBody) {
								const t = this.lens.position;
								e -= t.top, i -= t.left
							}
							this.cnv.setCss({
								top: e,
								left: i,
								width: t.size.width,
								height: t.size.height
							})
						}
						set lensStyle(t) {
							this.node.setCss(t)
						}
						set lensPosition(t) {
							this.lensStyle = {
								top: t.top,
								left: t.left
							}
						}
						set lensSize(t) {
							this.lensStyle = {
								width: t.width,
								height: t.height
							}
						}
						setLensCss(t, e, i) {
							this.lensPosition = t, this.lensSize = e, this.lensStyle = {
								opacity: 1,
								transform: "scale(1)",
								transition: i || "none"
							}
						}
						setImageSize(t, e, i) {
							this.zoomWrapper.setCss({
								top: 0,
								left: 0,
								width: e.width,
								height: e.height,
								transformOrigin: "50% 50%",
								transform: this.perspective + "translate3d(" + t.x + "px, " + t.y + "px, 0) scale(" + i.x + ", " + i.y + ")"
							}), this.zoomWrapper.render(), this.image.setCss({
								width: "100%",
								height: "100%"
							}), this.image.render()
						}
						clearCss() {
							this.node.setCss({
								transition: "",
								opacity: "",
								transform: ""
							}), this.node.removeAttr("style"), this.image && this.image.setCss({
								width: "",
								height: ""
							}), this.zoomWrapper.setCss({
								top: "",
								left: "",
								width: "",
								height: "",
								transition: "",
								transform: ""
							})
						}
						clearDOM() {
							this.image && (this.image.remove(), this.image = null), this.zoomWrapper.remove(), this.node.remove(), this.cnv.remove()
						}
						removeEvents() {
							this.cnv.clearEvents(), this.image && this.image.clearEvents(), this.node.clearEvents()
						}
						get boundaries() {
							return this.cnv.node.getBoundingClientRect()
						}
						destroy() {
							this.image && (this.image.remove(), this.image = null), this.zoomWrapper.remove(), this.node.remove(), this.cnv.remove()
						}
					},
					n = class extends o {
						constructor(t) {
							super(t), this.mouseMoveHandler = null
						}
						getContainerForMap() {
							return this.node
						}
						addStartCss() {
							super.addStartCss(), this.node.addEvent("mousescroll", (t => {
								t.stop()
							})), this.lensStyle = {
								opacity: 0,
								transform: "scale(1)"
							}
						}
						removeDragstart() {
							this.node.del("event:mousedrag:dragstart")
						}
						addEventsCanvasClass(t) {
							this.cnv.addClass(t)
						}
						removeEventsCanvasClass(t) {
							this.cnv.removeClass(t)
						}
						getContainerSize() {
							return this.node.size
						}
						getContainerPosition() {
							return this.node.position
						}
						addGlobalEvent(t) {
							this.mouseMoveHandler || (this.mouseMoveHandler = t, s.A.$(document).addEvent("mousemove", t))
						}
						removeGlobalEvent() {
							this.mouseMoveHandler && (s.A.$(document).removeEvent("mousemove", this.mouseMoveHandler), this.mouseMoveHandler = null)
						}
						removeEvents() {
							super.removeEvents(), this.removeGlobalEvent()
						}
					},
					a = class {
						constructor(t, e) {
							this.p = s.A.$(t), this.c = s.A.$new("div"), this.c.addClass(e + "-deepzoom")
						}
						get container() {
							return this.c
						}
						show() {
							this.p.append(this.c)
						}
						hide() {
							this.c.remove()
						}
						destroy() {
							this.c.remove(), this.c = null
						}
					},
					h = class {
						constructor(t, e) {
							this.p = s.A.$(t), this.dppx = e, this.w = s.A.$new("div"), this.cvs = s.A.$new("canvas"), this.ctx = this.cvs.node.getContext("2d"), this.w.append(this.cvs)
						}
						set index(t) {
							this.w.attr("z-index" + (t + 1))
						}
						append() {
							this.p.append(this.w)
						}
						show() {
							this.w.setCssProp("display", "")
						}
						hide() {
							this.w.setCssProp("display", "none")
						}
						clear() {
							this.ctx.clearRect(0, 0, this.cvs.node.width, this.cvs.node.height)
						}
						draw(t, e, i, s) {
							this.ctx.setTransform(1, 0, 0, 1, 0, 0), this.clear(), this.ctx.setTransform(t, 0, 0, e, i, s)
						}
						drawTile(t, e, i) {
							"edge" === s.A.browser.uaName ? this.dppx > 1 ? this.ctx.drawImage(t.node, 0, 0, e.width, e.height, i.x, i.y, e.width, e.height) : this.ctx.drawImage(t.node, i.x, i.y, e.width, e.height) : this.ctx.drawImage(t.node, 0, 0, e.width, e.height, i.x, i.y, e.width, e.height)
						}
						set canvasSize(t) {
							this.cvs.setCss(t), this.cvs.attr("width", t.width * this.dppx), this.cvs.attr("height", t.height * this.dppx)
						}
						destroy() {
							this.cvs.remove(), this.w.remove()
						}
					};
				class r {
					constructor(t) {
						this.isInner = t.inner, this.rows = t.lengthOfRow, this.cols = t.lengthOfColumn, this.size = {
							width: t.cameraWidth,
							height: t.cameraHeight
						}, this.bMapS = {
							width: t.mapWidth,
							height: t.mapHeight
						}, this.bTileS = {
							width: t.tileWidth,
							height: t.tileHeight
						}, this.bScale = {
							x: t.scaleX,
							y: t.scaleY
						}, this.mapS = {
							width: this.bMapS.width,
							height: this.bMapS.height
						}, this.tileS = {
							width: this.bTileS.width,
							height: this.bTileS.height
						}, this.baseLastTileSize = {
							width: this.bMapS.width - (this.cols - 1) * this.bTileS.width,
							height: this.bMapS.height - (this.rows - 1) * this.bTileS.height
						}, this.lastTileSize = {
							width: this.baseLastTileSize.width,
							height: this.baseLastTileSize.height
						}, this.position = {
							x: 0,
							y: 0
						}, this.lastCorrectionPosition = {
							x: 0,
							y: 0
						}, this.scale = {
							x: 0,
							y: 0
						}, this.lastScale = 0, this.lastGlobaslScale = 0, this.count = {
							x: 0,
							y: 0
						}, this.calcCount(), this.shownTiles = {
							startX: 0,
							countX: this.count.x,
							startY: 0,
							countY: this.count.y
						}
					}
					static getTileIndex(t, e) {
						return Math.floor(t / e)
					}
					static getTileSize(t, e) {
						return t * e
					}
					get x() {
						return this.position.x
					}
					get y() {
						return this.position.y
					}
					get width() {
						return this.size.width
					}
					get height() {
						return this.size.height
					}
					get mapWidth() {
						return this.mapS.width
					}
					get mapHeight() {
						return this.mapS.height
					}
					get shownTilesX() {
						return this.shownTiles.startX
					}
					get shownTilesY() {
						return this.shownTiles.startY
					}
					get shownTilesWidth() {
						return this.shownTiles.countX
					}
					get shownTilesHeight() {
						return this.shownTiles.countY
					}
					get scaleX() {
						return this.scale.x
					}
					get scaleY() {
						return this.scale.y
					}
					set mapWidth(t) {
						null != t && (this.mapS.width = t)
					}
					set mapHeight(t) {
						null != t && (this.mapS.height = t)
					}
					checkTile(t, e) {
						const i = this.shownTiles;
						return i.startX <= t && i.startY <= e && i.startX + i.countX > t && i.startY + i.countY > e
					}
					calcCount() {
						this.count = {
							x: Math.ceil(this.size.width / this.tileS.width) + 1,
							y: Math.ceil(this.size.height / this.tileS.height) + 1
						}
					}
					findShownTiles() {
						const t = this.position,
							e = this.tileS;
						let i = 0,
							s = 0,
							o = this.count.x,
							n = this.count.y;
						t.x < 0 && (i = r.getTileIndex(Math.abs(t.x), e.width)), t.y < 0 && (s = r.getTileIndex(Math.abs(t.y), e.height)), i + o > this.cols && (o = this.cols - i), s + n > this.rows && (n = this.rows - s), this.shownTiles = {
							startX: i,
							countX: o,
							startY: s,
							countY: n
						}
					}
					calcTileSize() {
						this.tileS.width = r.getTileSize(this.bTileS.width, this.scale.x), this.tileS.height = r.getTileSize(this.bTileS.height, this.scale.y), this.lastTileSize.width = r.getTileSize(this.baseLastTileSize.width, this.scale.x), this.lastTileSize.height = r.getTileSize(this.baseLastTileSize.height, this.scale.y)
					}
					calcData(t) {
						this.lastScale !== this.scale.x && (this.calcTileSize(), this.calcCount(), this.mapS.width = this.tileS.width * (this.cols - 1) + this.lastTileSize.width, this.mapS.height = this.tileS.height * (this.rows - 1) + this.lastTileSize.height, this.lastCorrectionPosition.x = (this.bMapS.width * this.bScale.x - this.mapS.width) / 2, this.lastCorrectionPosition.y = (this.bMapS.height * this.bScale.y - this.mapS.height) / 2, this.lastScale = this.scale.x), this.position.x = t.x + this.lastCorrectionPosition.x, this.position.y = t.y + this.lastCorrectionPosition.y
					}
					action(t, e) {
						this.lastGlobaslScale !== e.x && (this.lastScale = this.scale.x, this.scale.x = e.x * this.bScale.x, this.scale.y = e.y * this.bScale.y, this.lastGlobaslScale = e.x), this.calcData(t), this.findShownTiles()
					}
					resize(t) {
						this.size.width = t.width, this.size.height = t.height, this.calcCount(), this.findShownTiles()
					}
					destroy() {
						this.shownTiles = []
					}
				}
				const l = r;
				var d = i(7985);
				const c = 0,
					p = 1,
					u = 2;
				class m extends d.A {
					constructor(t) {
						super(), this.id = t.id, this.index = {
							x: t.indexX,
							y: t.indexY
						}, this.position = {
							x: t.x,
							y: t.y
						}, this.size = {
							width: t.width,
							height: t.height
						}, this.storage = t.storage, this.state = c, this.node = null, this.storage.has(this.id) && (this.node = this.storage.get(this.id), this.state = u)
					}
					get loaded() {
						return this.state === u
					}
					addImageToStorage() {
						this.storage.has(this.id) || this.storage.set(this.id, this.node)
					}
					load() {
						this.state === c && (this.state = p, this.emit("getTile", {
							data: {
								indexX: this.index.x,
								indexY: this.index.y,
								number: this.id
							}
						}))
					}
					cancelLoading() {
						this.state === p && (this.state = c, this.emit("zoomCancelLoadingOfTiles", {
							data: {
								indexX: this.index.x,
								indexY: this.index.y,
								number: this.id
							}
						}))
					}
					set image(t) {
						this.state !== u && (this.state = u, this.node = s.A.$(t), this.addImageToStorage())
					}
					destroy() {
						this.cancelLoading(), this.storage = null, super.destroy()
					}
				}
				const g = m,
					v = new Map,
					f = (t, e) => t / e;
				class y extends d.A {
					constructor(t, e) {
						super(), this.view = t, this.id = e.id, this.dppx = e.dppx, this.size = {
							width: e.width,
							height: e.height
						}, this.mSize = {
							width: e.maxWidth,
							height: e.maxHeight
						}, this.tSize = {
							width: e.tileWidth,
							height: e.tileHeight
						}, this.tileImageSize = {
							width: e.tileImageWidth,
							height: e.tileImageHeight
						}, this.layerSize = {
							width: e.layerWidth,
							height: e.layerHeight
						}, this.hash = e.hash + "-" + this.size.width + "x" + this.size.height, v.has(this.hash) || v.set(this.hash, new Map), this.scaleFactor = {
							x: (this.mSize.width - this.size.width) / this.size.width + 1,
							y: (this.mSize.height - this.size.height) / this.size.height + 1
						}, this.maxDisplayedSize = {
							width: e.maxDisplayedWidth,
							height: e.maxDisplayedHeight
						}, this.minDisplayedSize = {
							width: e.minDisplayedWidth,
							height: e.minDisplayedHeight
						}, this.globalScale = {
							x: 1,
							y: 1
						}, this.globalPosition = {
							x: 0,
							y: 0
						}, this.view.index = this.id, this.lensSize = {
							width: e.viewPortWidth,
							height: e.viewPortHeight
						}, this.isAdded = !1, this.isShown = !1, this.isDisplayed = !1, this.tiles = this.calcTiles(), this.tileCount = this.tiles.length * this.tiles[0].length, this.loadedTiles = 0, this.camera = new l({
							inner: e.inner,
							scaleX: this.scaleFactor.x,
							scaleY: this.scaleFactor.y,
							cameraWidth: e.viewPortWidth,
							cameraHeight: e.viewPortHeight,
							mapWidth: this.size.width,
							mapHeight: this.size.height,
							tileWidth: f(this.tileImageSize.width, this.dppx),
							tileHeight: f(this.tileImageSize.height, this.dppx),
							lengthOfRow: this.tiles.length,
							lengthOfColumn: this.tiles[0].length
						})
					}
					addEvents() {
						const t = this.tileImageSize;
						this.on("getTile", (e => {
							e.data.width = this.size.width, e.data.height = this.size.height, e.data.level = this.id, e.data.imageSettings = {
								tile: {
									width: t.width,
									height: t.height,
									number: e.data.number
								}
							}, this.dppx > 1 && (e.data.dppx = this.dppx)
						})), this.on("zoomCancelLoadingOfTiles", (e => {
							e.data.width = this.size.width, e.data.height = this.size.height, e.data.imageSettings = {
								tile: {
									width: t.width,
									height: t.height,
									number: e.data.number
								}
							}
						}))
					}
					cancelLoadingOfTiles() {
						this.tiles.forEach((t => {
							t.forEach((t => {
								t.cancelLoading()
							}))
						}))
					}
					set image(t) {
						const e = this.tiles[t.indexY][t.indexX];
						e.loaded || (this.loadedTiles += 1), e.image = t.node, this.isShown && this.camera.checkTile(t.indexX, t.indexY) && this.drawTile(e)
					}
					append() {
						!this.isAdded && this.isShown && (this.isAdded = !0, this.addEvents(), this.view.append())
					}
					calcTiles() {
						const t = [],
							e = this.tileImageSize,
							i = Math.ceil(this.layerSize.width / e.width),
							s = Math.ceil(this.layerSize.height / e.height);
						for (let o = 0; o < s; o++) {
							const n = [];
							for (let t = 0; t < i; t++) {
								const a = new g({
									y: o * e.height,
									x: t * e.width,
									indexX: t,
									indexY: o,
									id: o * i + t,
									width: t !== i - 1 ? e.width : this.layerSize.width - t * e.width,
									height: o !== s - 1 ? e.height : this.layerSize.height - o * e.height,
									storage: v.get(this.hash)
								});
								a.parentClass = this, n.push(a)
							}
							t.push(n)
						}
						return t
					}
					correctDPPXPosition(t, e, i) {
						let s = t;
						if (this.dppx > 1) {
							const o = e / 2;
							s = Math.abs(t - o) / (i / 100), s = o * this.dppx - i * this.dppx / 100 * s
						}
						return s
					}
					draw() {
						const t = this.camera;
						this.isShown && (this.view.draw(t.scaleX, t.scaleY, this.correctDPPXPosition(t.x, t.width, t.mapWidth), this.correctDPPXPosition(t.y, t.height, t.mapHeight)), this.eachTile((t => {
							this.drawTile(t)
						})))
					}
					drawTile(t) {
						t && t.loaded && this.view.drawTile(t.node, t.size, t.position)
					}
					eachTile(t) {
						const e = this.camera;
						for (let i = 0, s = e.shownTilesHeight; i < s; i++)
							for (let s = 0, o = e.shownTilesWidth; s < o; s++) t(this.tiles[e.shownTilesY + i][e.shownTilesX + s])
					}
					checkSize() {
						const t = this.isShown,
							e = this.camera,
							i = e.mapWidth <= this.maxDisplayedSize.width,
							s = e.mapHeight <= this.maxDisplayedSize.height,
							o = e.mapWidth > this.minDisplayedSize.width,
							n = e.mapHeight > this.minDisplayedSize.height;
						this.isShown = o && n, this.isDisplayed = i && s && o && n, t !== this.isShown && (this.isShown ? this.view.show() : this.view.hide(), this.isShown || this.cancelLoadingOfTiles())
					}
					action(t, e) {
						this.globalPosition.x = t.x, this.globalPosition.y = t.y, this.globalScale.x = e.x, this.globalScale.y = e.y, this.camera.action(this.globalPosition, this.globalScale), (this.camera.mapWidth > this.mSize.width || this.camera.mapHeight > this.mSize.height) && (this.camera.mapWidth = this.mSize.width, this.camera.mapHeight = this.mSize.height), this.checkSize(), this.append(), this.draw()
					}
					loadImages() {
						this.isShown && this.isDisplayed && this.loadedTiles !== this.tileCount && this.eachTile((t => {
							t.load()
						}))
					}
					set lensSize(t) {
						this.view.canvasSize = t
					}
					resize(t) {
						this.lensSize = t, this.camera.resize(t), this.action(this.globalPosition, this.globalScale)
					}
					destroy() {
						this.off("getTile"), this.off("zoomCancelLoadingOfTiles"), this.isShown = !1, this.camera.destroy(), this.tiles.forEach((t => {
							t.forEach((t => {
								t.destroy()
							}))
						})), super.destroy()
					}
				}
				const S = y;
				var w = i(511);
				const b = {
						canZoom: w.Mu + "-cursor-zoom",
						zoomIn: w.Mu + "-cursor-zoom-in",
						zoomOut: w.Mu + "-cursor-zoom-out",
						drag: w.Mu + "-cursor-dragging",
						hidden: w.Mu + "-cursor-hidden"
					},
					A = ["mousedrag", "touchdrag"],
					x = "edge" === s.A.browser.uaName ? "pointerup" : "touchend",
					z = "edge" === s.A.browser.uaName ? "pointermove" : "mousemove",
					C = (t, e) => t / 100 * e,
					I = (t, e) => t / e * 100,
					E = (t, e) => (t - e) / 2,
					P = (t, e, i, s) => (t > e && (t = e), t + i < s && (t = s - i), t),
					N = (t, e) => e / t;
				var O = i(3274),
					T = i(1298);
				class D extends d.A {
					constructor(t, e) {
						super(), this.view = t, this.options = Object.assign({
							tiles: !0,
							inner: !0,
							tileSize: {
								width: 256,
								height: 256
							},
							minZoomFactor: 100,
							upscale: !1
						}, e), this._hash = null, this.setDefaultVars()
					}
					static convertScaleToSize(t, e) {
						return {
							width: (0, T.A)(t.width * e.x, 2),
							height: (0, T.A)(t.height * e.y, 2)
						}
					}
					set hash(t) {
						this._hash = "" + s.A.getHashCode(t)
					}
					setDefaultVars() {
						this.isShown = !1, this.originSize = {
							width: 0,
							height: 0
						}, this._maxSize = {
							width: 0,
							height: 0
						}, this._minSize = {
							width: 0,
							height: 0
						}, this._lensSize = {
							width: 0,
							height: 0
						}, this.currentSize = {
							width: 0,
							height: 0
						}, this.levels = [], this.on("getTile", (t => {
							this.options.tiles || (delete t.data.imageSettings.tile, delete t.data.number)
						}))
					}
					createLevels() {
						const t = (t, e) => e < 1.5 ? t : t * s.A.DPPX,
							e = this._maxSize,
							i = this._minSize;
						if (!this.levels.length && e.width - i.width > this.options.minZoomFactor) {
							let s = [];
							if (this.options.inner) {
								if (s = ((t, e) => {
										let i = Math.max(1, Math.round(Math.log(Math.max(e.width / t.width, e.height / t.height)) / Math.LN2)),
											{
												width: s,
												height: o
											} = e;
										const n = [];
										for (; i > 0;) i -= 1, n.push({
											width: s,
											height: o
										}), s = Math.trunc(s / 2), o = Math.trunc(o / 2);
										return n
									})(i, e), !this.options.tiles) {
									const t = (0, O.A)(s[0].width, this.originSize.width, this.options.upscale);
									t > 1 && t < 2 && (s[0] = this.originSize)
								}
							} else s.push({
								width: e.width,
								height: e.height
							});
							let o = this.options.tileSize;
							for (let n = 0, a = s.length; n < a; n++) {
								this.options.tiles || (o = s[n]);
								const r = n + 1 < a - 1 ? s[n + 1] : i,
									l = n - 1 >= 0 ? s[n - 1] : e,
									d = (0, O.A)(s[n].width, this.originSize.width, this.options.upscale),
									c = new h(this.view.container, d),
									p = new S(c, {
										id: a - n,
										hash: this._hash,
										dppx: d,
										inner: this.options.inner,
										width: s[n].width,
										height: s[n].height,
										maxWidth: this._maxSize.width,
										maxHeight: this._maxSize.height,
										layerWidth: Math.round(s[n].width * d),
										layerHeight: Math.round(s[n].height * d),
										maxDisplayedWidth: s[n].width + C(l.width - s[n].width, 50),
										maxDisplayedHeight: s[n].height + C(l.height - s[n].height, 50),
										minDisplayedWidth: r.width + C(s[n].width - r.width, 50),
										minDisplayedHeight: r.height + C(s[n].height - r.height, 50),
										tileWidth: o.width,
										tileHeight: o.height,
										tileImageWidth: t(o.width, d),
										tileImageHeight: t(o.height, d),
										viewPortWidth: this._lensSize.width,
										viewPortHeight: this._lensSize.height
									});
								p.parentClass = this, this.levels.push({
									view: c,
									controller: p
								})
							}
							this.levels.reverse()
						}
					}
					getCurrentShownLevel() {
						let t = null;
						const e = this.levels.length;
						if (this.isShown)
							for (let i = e - 1; i >= 0; i--)
								if (this.levels[i].controller.isShown) {
									t = this.levels[i].controller;
									break
								}
						return t
					}
					getScale(t, e) {
						const i = this.getCurrentShownLevel();
						let s;
						const o = this.levels.length;
						switch (t) {
							case "zoomin":
								s = e ? 1 : i ? this.currentSize.width < i.size.width ? N(this._maxSize.width, i.size.width) : i.id !== o ? N(this._maxSize.width, this.levels[i.id].controller.size.width) : N(this._maxSize.width, this.levels[o - 1].controller.size.width) : N(this._maxSize.width, this.levels[0].controller.size.width);
								break;
							case "zoomout":
								s = i ? this.currentSize.width > i.size.width ? N(this._maxSize.width, i.size.width) : i.id > 1 ? N(this._maxSize.width, this.levels[i.id - 2].controller.size.width) : N(this._maxSize.width, this._minSize.width) : N(this._maxSize.width, this._minSize.width)
						}
						return s
					}
					show() {
						return this.isShown || (this.isShown = !0, this.view.show()), this
					}
					hide() {
						return this.isShown && (this.isShown = !1, this.view.hide(), this.levels.forEach((t => {
							t.view.destroy(), t.controller.destroy()
						})), this.setDefaultVars()), this
					}
					action(t, e) {
						return this.isShown && (this.currentSize = D.convertScaleToSize(this._maxSize, e), this.levels.forEach((i => {
							i.controller.action(t, e)
						}))), this
					}
					set lensSize(t) {
						this._lensSize.width = t.width, this._lensSize.height = t.height
					}
					set minSize(t) {
						this._minSize.width = t.width, this._minSize.height = t.height
					}
					set maxSize(t) {
						this._maxSize.width = t.width, this._maxSize.height = t.height, this.originSize.width = t.originWidth, this.originSize.height = t.originHeight, this.createLevels()
					}
					loadImages() {
						this.isShown && this.levels.forEach((t => {
							t.controller.loadImages()
						}))
					}
					set image(t) {
						this.isShown && (this.levels[t.level - 1].controller.image = t)
					}
					resize() {
						this.isShown && this.levels.forEach((t => {
							t.controller.resize(this._lensSize)
						}))
					}
					destroy() {
						this.hide(), this.off("getTile"), this.off("zoomCancelLoadingOfTiles"), super.destroy()
					}
				}
				const M = D;
				class k extends d.A {
					constructor(t, e) {
						super(), this.view = new a(t, "sirv"), this.controller = new M(this.view, e), this.controller.parentClass = this
					}
					set lensSize(t) {
						this.controller.lensSize = t
					}
					loadImages() {
						this.controller.loadImages()
					}
					getScale(t, e) {
						return this.controller.getScale(t, e)
					}
					set image(t) {
						this.controller.image = t
					}
					set hash(t) {
						this.controller.hash = t
					}
					set minSize(t) {
						this.controller.minSize = t
					}
					set maxSize(t) {
						this.controller.maxSize = t
					}
					show() {
						this.controller.show()
					}
					hide() {
						this.controller.hide()
					}
					action(t, e) {
						this.controller.action(t, e)
					}
					resize() {
						this.controller.resize()
					}
					destroy() {
						this.controller.destroy(), this.controller = null, this.view.destroy(), this.view = null, super.destroy()
					}
				}
				const _ = k,
					L = 0,
					F = 1,
					B = class {
						constructor(t, e) {
							this.state = L, this.id = null, this.cb = t || (() => {}), this.stopCb = e || (() => {})
						}
						start() {
							if (this.state !== F) {
								this.state = F;
								const t = e => {
									this.cb(e), this.state !== L && (this.id = requestAnimationFrame(t))
								};
								this.id = requestAnimationFrame(t)
							}
						}
						stop() {
							this.state !== L && (this.state = L, cancelAnimationFrame(this.id), this.stopCb())
						}
					};
				var R = i(9157);
				class H extends d.A {
					constructor(t, e) {
						super(), this.o = Object.assign({
							test: !1,
							pan: !1,
							smoothing: !0,
							tiles: !0,
							customZooming: !0,
							clickBehavior: "both",
							upscale: !1,
							trigger: "hover"
						}, e), this.view = t, this.state = w.xz.HIDDEN, this.fsState = w.a0.CLOSED, this._x = 0, this._y = 0, this.baseScale = {
							x: 1,
							y: 1
						}, this.scale = {
							x: 1,
							y: 1
						}, this.dScale = {
							x: 1,
							y: 1
						}, this.iSize = {
							width: 0,
							height: 0
						}, this.iPos = {
							x: 0,
							y: 0
						}, this.iDPos = {
							x: 0,
							y: 0
						}, this.pPos = {
							top: 0,
							left: 0
						}, this.pSize = {
							width: 0,
							height: 0
						}, this.anim = null, this.animCb = null, this.animStep = 0, this.lastAnimTimer = 0, this.deepZoom = null, this.deepZoomTimer = null, this.lensSize = {
							width: 0,
							height: 0
						}, this.lensHalfSize = {
							width: 0,
							height: 0
						}, this.lensPosition = {
							top: 0,
							left: 0
						}, this.currentLensSize = {
							width: 100,
							height: 100
						}, this.dppx = 1, this.zoomNodeSize = {
							width: 0,
							height: 0
						}, this.boundaries = null, this.ANIM_STEP = .1, this.nonDeepZoomImageLevels = [], this.scrollHandler = () => {
							[w.xz.SHOWING, w.xz.SHOWN].includes(this.state) && this.hide(this.state === w.xz.SHOWING)
						}
					}
					setFullscreenState(t) {
						this.fsState = t
					}
					init() {
						this.getAllSizes(), this.view.setLensCss(this.lensPosition, this.lensSize), this.createDeepZoom(), this.createAnimation(this.ANIM_STEP), this.view.addScrollEvent(this.scrollHandler)
					}
					createDeepZoom() {
						this.deepZoom = new _(this.view.node, {
							tiles: this.o.tiles,
							inner: ["inner", "outside"].includes(this.o.type),
							upscale: this.o.upscale
						}), this.deepZoom.parentClass = this, this.on("getTile", (t => {
							t.stopAll(), this.emit("zoomGetImage", {
								data: t.data
							})
						})), this.on("zoomCancelLoadingOfTiles", (t => {
							t.stopEmptyEvent()
						}))
					}
					set lensContainer(t) {
						this.view.lensContainer = t
					}
					getBoundaries() {
						this.boundaries = this.view.parentBoundaries
					}
					getAllSizes() {
						this.pSize = this.view.parentSize, this.pPos = this.view.parentPostion, this.zoomNodeSize = this.view.zoomSize, this.getBoundaries()
					}
					get shown() {
						return this.state === w.xz.SHOWN
					}
					get showing() {
						return this.state === w.xz.SHOWING
					}
					deepZoomAction(t, e) {
						clearTimeout(this.deepZoomTimer), this.deepZoomTimer = setTimeout((() => {
							this.deepZoom.loadImages(), e && (this.deepZoom.lensSize = e, this.deepZoom.resize()), this.deepZoom.action(this.iDPos, this.dScale), t || this.deepZoomAction(this.dScale.x === this.scale.x)
						}), this.lastAnimTimer + 10), e && (this.deepZoom.lensSize = e, this.deepZoom.resize()), this.deepZoom.action(this.iDPos, this.dScale)
					}
					stopMovingAndZooming() {
						this.scale.x = this.dScale.x, this.scale.y = this.dScale.y, this.iPos.x = this.iDPos.x, this.iPos.y = this.iDPos.y
					}
					createAnimation(t) {
						const e = t => {
							let e = !1;
							return this.dScale[t] < this.baseScale[t] && (e = !0, this.dScale[t] = this.baseScale[t]), this.dScale[t] > 1 && (e = !0, this.dScale[t] = 1), e
						};
						this.animStep = t;
						let i = 0,
							s = !1;
						this.anim = new B((o => {
							if (!i) return void(i = o);
							let n, a, h, r, l = !1;
							this.lastAnimTimer = o - i;
							let d = !1,
								c = !1;
							i = o;
							let p = !0;
							this.scale.x !== this.dScale.x && (l = !0, this.sendZoomingAction(), h = this.scale.x - this.dScale.x, n = h * this.animStep, this.dScale.x += n, this.dScale.y += n, d = e("x"), c = d, Math.abs(h) < .2 ? Math.abs(h) < 1e-4 && (this.dScale.x = this.scale.x, this.dScale.y = this.scale.x) : (p = !1, s = !0)), (this.iPos.x !== this.iDPos.x || this.iPos.y !== this.iDPos.y) && (l = !0, h = this.iPos.x - this.iDPos.x, r = this.iPos.y - this.iDPos.y, n = h * this.animStep, a = r * this.animStep, this.iDPos.x += n, this.iDPos.y += a, this.iDPos.x = (0, T.A)(this.iDPos.x, 4), this.iDPos.y = (0, T.A)(this.iDPos.y, 4), Math.max(Math.abs(h), Math.abs(r)) < 2 ? (Math.max(Math.abs(h), Math.abs(r)) < 1 || d || c) && (this.iDPos.x = this.iPos.x, this.iDPos.y = this.iPos.y) : (p = !1, s = !0)), l ? (this.render(this.iDPos, this.dScale), p && s && (s = !1, this.deepZoom.loadImages())) : this.animCb && (this.animCb(), this.animStep = t, this.animCb = null)
						}), (() => {
							i = 0, s = !0
						}))
					}
					render(t, e) {
						this.deepZoomAction(), this.view.setImagePosition(t || this.iDPos, e || this.dScale)
					}
					correctX(t) {
						return t - this.pPos.left
					}
					correctY(t) {
						return t - this.pPos.top
					}
					set x(t) {
						this._x = this.correctX(t)
					}
					set y(t) {
						this._y = this.correctY(t)
					}
					getZoomData(t) {
						let e = 0;
						return t || (t = this.scale.x), (this.shown || this.showing) && (e = (0, T.A)((t - this.baseScale.x) / (1 - this.baseScale.x), 2)), e
					}
					get nextMinZoom() {
						let t = this.deepZoom.getScale("zoomout");
						return t < this.baseScale.x && (t = this.baseScale.x), this.getZoomData(t)
					}
					get nextMaxZoom() {
						let t = this.deepZoom.getScale("zoomin");
						return t > 1 && (t = 1), this.getZoomData(t)
					}
					zoom(t, e, i, s) {
						const o = this.scale.x,
							n = this.iSize,
							a = n.width * this.scale.x,
							h = n.height * this.scale.y,
							r = E(n.width, a),
							l = E(n.height, h);
						e = e || this.pPos.left + this.lensHalfSize.width, i = i || this.pPos.top + this.lensHalfSize.height, this.baseScalePercent = {
							x: I(Math.abs(this.iPos.x) + this.correctX(e) - r, a),
							y: I(Math.abs(this.iPos.y) + this.correctY(i) - l, h)
						};
						const d = this.deepZoom.getScale(t, s);
						this.scale.x = d, this.scale.y = d, this.x = e, this.y = i, this.afterZoom(o)
					}
					afterZoom(t) {
						t !== this.scale.x && (this.sendZoomingAction(), this.setCursorState(this.figureOutCursorState()), this.o.smoothing ? this.animStep = .25 : (this.dScale.x = this.scale.x, this.dScale.y = this.scale.y, this.iDPos.x = this.iPos.x, this.iDPos.y = this.iPos.y, this.render(this.iPos, this.scale)))
					}
					zoomUp(t, e, i) {
						return !(!this.shown && !this.showing || 1 === this.scale.x || (this.zoom("zoomin", t, e, i), 0))
					}
					zoomDown(t, e) {
						return !(!this.shown && !this.showing || this.scale.x === this.baseScale.x || (this.zoom("zoomout", t, e), 0))
					}
					sendZoomingAction() {
						clearTimeout(this.zoomingTimer), this.zoomingTimer = setTimeout(s.A.$((t => {
							this.emit("zooming", {
								data: {
									zoom: this.getZoomData(),
									from: t,
									to: this.scale.x
								}
							})
						})).bind(this, this.dScale.x), 24)
					}
					figureOutCursorState() {
						const t = this.getZoomData();
						return 0 === t ? "zoomIn" : 1 === t ? "zoomOut" : t > 0 && t < 1 ? "up" === this.o.clickBehavior ? "zoomIn" : "zoomOut" : void 0
					}
					setCursorState(t) {
						return this.o.trigger ? ("zoomOut" === t && "hover" === this.o.trigger && (t = this.fsState === w.a0.CLOSED ? "zoomIn" : null), this.view.toggleCursorClass(b[t]), t) : null
					}
					setImage(t) {
						const e = t.node;
						if (this.shown || this.showing) {
							const i = Object.assign({}, t.callbackData);
							i.node = e, this.deepZoom.image = i
						}
					}
					setLensSize(t, e) {
						this.lensSize = {
							width: t,
							height: e
						}, this.lensHalfSize = {
							width: this.lensSize.width / 2,
							height: this.lensSize.height / 2
						}
					}
					calcLensSize() {
						const t = this.pSize,
							e = this.currentLensSize;
						this.setLensSize(C(t.width, e.width), C(t.height, e.height))
					}
					getBaseScale() {
						this.baseScale = {
							x: this.zoomNodeSize.width / this.iSize.width,
							y: this.zoomNodeSize.height / this.iSize.height
						}
					}
					calcLensPosition() {}
					getImagePosition() {}
					showDeepZoom(t, e) {
						if (this.deepZoom) {
							const i = this.view.hash;
							i && (this.deepZoom.hash = i), this.deepZoom.lensSize = this.lensSize, this.deepZoom.minSize = this.zoomNodeSize, this.deepZoom.maxSize = Object.assign({
								originWidth: t,
								originHeight: e
							}, this.iSize), this.deepZoom.show()
						}
					}
					setShown(t) {
						void 0 === t && (t = !0);
						let e = !1;
						return this.state === w.xz.SHOWING && (e = !0, this.state = w.xz.SHOWN, t && this.setEvents(), this.setCursorState(this.figureOutCursorState()), this.o.smoothing || this.deepZoomAction()), e
					}
					sendZoomShownEvent() {
						this.emit("zoomShown", {
							data: {
								clientPosition: {
									x: this._x,
									y: this._y
								},
								pagePosition: {
									x: this.pPos.left,
									y: this.pPos.top
								}
							}
						})
					}
					showCenter(t, e, i) {
						this.getAllSizes();
						const s = this.pPos.left + this.pSize.width / 2,
							o = this.pPos.top + this.pSize.height / 2;
						return this.show(t, e, s, o, !1, i)
					}
					show() {
						return this.state === w.xz.HIDDEN && (this.state = w.xz.SHOWING, this.setCursorState("zoomIn"), !0)
					}
					setHidden() {
						this.stopMovingAndZooming(), clearTimeout(this.hideTimer), this.anim.stop(), this.setCursorState("zoomIn"), this.view.clearCss(), this.baseScale = {
							x: 1,
							y: 1
						}, this.scale = {
							x: 1,
							y: 1
						}, this.dScale = {
							x: 1,
							y: 1
						}, this.setUpEvent = !1, this.baseScalePercent = {
							x: 0,
							y: 0
						}, clearTimeout(this.deepZoomTimer), this.deepZoom.hide(), this.view.clearDOM(), this.state = w.xz.HIDDEN, this.emit("zoomHidden", {
							data: {
								clientPosition: {
									x: this._x,
									y: this._y
								},
								pagePosition: {
									x: this.pPos.left,
									y: this.pPos.top
								}
							}
						})
					}
					hide(t) {
						return !![w.xz.SHOWN, w.xz.SHOWING].includes(this.state) && (this.state = w.xz.HIDING, this.view.removeEvents(), t ? (clearTimeout(this.deepZoomTimer), this.deepZoom.hide(), this.setHidden()) : this.stopMovingAndZooming(), !0)
					}
					addClickEvent() {
						let t = ["btnclick", "tap"];
						"dblclick" === this.o.trigger && (t = ["dblbtnclick", "dbltap"]), this.view.addEventToWrapper(t, (t => {
							t.stop(), this.x = t.x, this.y = t.y, "up" === this.o.clickBehavior ? this.zoomUp(t.x, t.y) || this.hide() : this.o.smoothing && this.scale.x !== this.baseScale.x ? this.hide() : this.hide(!0)
						}))
					}
					sendClickEvent(t) {
						[w.xz.HIDDEN, w.xz.HIDING].includes(this.state) || (t.stop(), this.emit("zoomClick"))
					}
					customMove(t, e) {
						[w.xz.HIDDEN, w.xz.HIDING].includes(this.state) || this.move(t, e)
					}
					move(t, e) {
						this.x = t, this.y = e, this.afterMove()
					}
					afterMove() {
						this.o.smoothing || this.render(this.iPos, this.scale)
					}
					setEvents() {}
					setLensStyleOnResize() {
						this.view.lensStyle = {
							top: this.lensPosition.top,
							left: this.lensPosition.left,
							width: this.lensSize.width,
							height: this.lensSize.height
						}
					}
					onResize() {
						if (this.state !== w.xz.HIDDEN)
							if (this.state === w.xz.HIDING) this.hide(!0);
							else {
								if (this.state === w.xz.SHOWING && this.o.smoothing && (this.state = w.xz.SHOWN, this.setEvents(), this.view.removeEventFromWrapper("transitionend"), this.view.lensStyle = {
										transition: ""
									}, this.stopMovingAndZooming(), this.view.setImagePosition(this.iPos, this.scale)), this.getAllSizes(), this.zoomNodeSize.width > this.iSize.width || this.zoomNodeSize.height > this.iSize.height) return void this.hide(!0);
								this.getBaseScale(), this.scale.x = (0, R.A)(this.scale.x, this.baseScale.x, 1), this.scale.y = (0, R.A)(this.scale.y, this.baseScale.y, 1), this.calcLensSize(), this.calcLensPosition(), this.setLensStyleOnResize(), this.deepZoom.lensSize = this.pSize, this.deepZoom.minSize = this.zoomNodeSize, this.deepZoom.resize(), this.view.eventNodePositionSize = {
									position: this.pPos,
									size: this.pSize
								}, this.o.smoothing || (this.sendZoomingAction(), this.setCursorState(this.figureOutCursorState()), this.deepZoomAction(), this.view.setImagePosition(this.iPos, this.scale))
							}
					}
					destroy() {
						this.hide(!0), clearTimeout(this.zoomingTimer), this.view.removeScrollEvent(this.scrollHandler), this.setCursorState("canZoom"), clearTimeout(this.deepZoomTimer), this.deepZoom.destroy(), this.deepZoom = null, this.off("getTile"), this.off("zoomCancelLoadingOfTiles"), this.zoomingTimer = null, super.destroy()
					}
				}
				const U = H,
					j = class {
						constructor(t) {
							this.p = s.A.$(t);
							const e = "sirv-zoom-map";
							this.c = s.A.$new("div"), this.c.addClass(e), this.lens = s.A.$new("div"), this.lens.addClass(e + "-lens"), this._img = null, this.b = s.A.$(document.body), this.c.append(this.lens)
						}
						calcRightPosition(t, e) {
							const i = this.c.rect;
							return {
								x: t - i.left,
								y: e - i.top
							}
						}
						addDomEventToDocBody(t, e) {
							this.b.addEvent(t, e)
						}
						removeDomEventToDocBody(t, e) {
							this.b.removeEvent(t, e)
						}
						addDomEventToLens(t, e) {
							this.lens.addEvent(t, e)
						}
						addDomEvent(t, e) {
							this.c.addEvent(t, e)
						}
						set cursor(t) {
							this.c.setCssProp("cursor", t)
						}
						removeEvents() {
							this.c.removeEvent(["btnclick", "tap"]), this.c.removeEvent(["mousedown", "touchstart"]), this.lens.removeEvent(["mousedown", "touchstart"]), this.c.removeEvent(["mousemove", "touchmove"])
						}
						set size(t) {
							this.c.setCss({
								width: t.width,
								height: t.height
							})
						}
						addLensCss(t, e, i) {
							this.lens.setCss({
								top: t.top - 1,
								left: t.left - 1,
								width: e.width,
								height: e.height,
								fontSize: i
							})
						}
						set img(t) {
							this._img = s.A.$new("img", {
								src: t.src
							}), t.srcset && this._img.attr("srcset", t.srcset + " 2x"), this.c.append(this._img)
						}
						removeEventTransitionEvent() {
							this.c.removeEvent("transitionend")
						}
						show(t) {
							this.c.setCss({
								opacity: 0,
								transition: "opacity .3s linear"
							}), this.p.append(this.c), this.c.render(), this.removeEventTransitionEvent(), this.c.addEvent("transitionend", (e => {
								e.stop(), this.removeEventTransitionEvent(), this.c.setCssProp("transition", ""), this.addDomEvent(["mousedown", "touchstart"], (t => {
									t.stop()
								})), t()
							})), this.c.setCssProp("opacity", 1)
						}
						hide(t, e) {
							this.removeEventTransitionEvent(), t ? (this.c.remove(), this.removeEvents(), e()) : this.c.addEvent("transitionend", (t => {
								t.stop(), this._removeEventTransitionEvent(), this.c.setCssProp("transition", ""), this.c.remove(), this.removeEvents(), e()
							})), this.c.setCssProp("opacity", 0)
						}
						destroy() {
							this.c = null, this.lens = null
						}
					};
				class V extends d.A {
					constructor(t, e) {
						super(), this.view = t, this.o = e, this.state = w.xz.HIDDEN, this.scale = {
							x: 1,
							y: 1
						}, this.viewPortSize = {
							width: 0,
							height: 0
						}, this.bISize = {
							width: 0,
							height: 0
						}, this.cBISize = {
							width: 0,
							height: 0
						}, this.cBIPosition = {
							top: 0,
							left: 0
						}, this.mapSize = {
							width: 0,
							height: 0
						}, this.ls = {
							width: 0,
							height: 0
						}, this.lp = {
							top: 0,
							left: 0
						}, this.clp = {
							x: 0,
							y: 0
						}, this.isDragMoved = !1
					}
					static setInTheCenter(t) {
						return t < 50 ? t = Math.max(t - (50 - t), 0) : t > 50 && (t = Math.min(t + (t - 50), 100)), t
					}
					getPercentPosition(t, e) {
						const i = this.mapSize,
							s = this.view.calcRightPosition(t, e);
						return {
							x: t = (0, R.A)((0, T.A)(I(s.x, i.width), 1), 0, 100),
							y: e = (0, R.A)((0, T.A)(I(s.y, i.height), 1), 0, 100)
						}
					}
					isInside(t, e) {
						const {
							lp: i,
							ls: s
						} = this, o = this.view.calcRightPosition(t, e);
						return i.left < o.x && i.left + s.width > o.x && i.top < o.y && i.top + s.height > o.y
					}
					addEvents() {
						let t = 1,
							e = !1;
						this.dragEndHandler = t => {
							e && (t.stop(), e = !1, this.clp = {
								x: 0,
								y: 0
							}, this.view.cursor = "", this.view.removeDomEventToDocBody(t.type, this.dragEndHandler), this.view.removeDomEventToDocBody("mouseout", this.mouseOutHandler))
						}, this.mouseOutHandler = t => {
							t.stop(), t.oe.relatedTarget && "HTML" !== t.oe.relatedTarget.tagName || !e || (this.dragEndHandler(t), this.view.removeDomEventToDocBody(["mouseup", "touchend"], this.dragEndHandler))
						}, this.view.addDomEvent(["btnclick", "tap"], (t => {
							t.stop(), this.emit("zoomMapNewPosition", {
								data: this.getPercentPosition(t.x, t.y)
							})
						})), this.view.addDomEventToLens(["mousedown", "touchstart"], (i => {
							const o = i.pageXY;
							if (this.isInside(o.x, o.y)) {
								i.stop(), t = 1;
								const o = (t => {
									let e;
									const i = {
											x: 0,
											y: 0
										},
										o = t.originEvent;
									return null != o.offsetX ? (i.x = o.offsetX, i.y = o.offsetY) : (e = s.A.$(t.target).position, i.x = o.targetTouches[0].pageX - e.left, i.y = o.targetTouches[0].pageY - e.top), i
								})(i);
								this.clp.y = o.y, this.clp.x = o.x, e = !0, this.view.addDomEventToDocBody(["mouseup", "touchend"], this.dragEndHandler), this.view.addDomEventToDocBody("mouseout", this.mouseOutHandler)
							}
						})), this.view.addDomEvent(["mousemove", "touchmove"], (i => {
							e && (t <= 0 && (i.stop(), this.view.cursor = "move", this.emit("zoomMapNewPosition", {
								data: this.getPercentPosition(i.pageXY.x, i.pageXY.y)
							})), t--)
						}))
					}
					calcMap(t, e, i, s) {
						let o = this.o.maxwidth,
							n = this.o.maxheight;
						i <= o && (o = i / 2, n = o * (e / t)), s <= n && (n = s / 2, o = n * (t / e)), o / n > t / e ? o = n * (t / e) : n = o * (e / t), o = Math.trunc(o), n = Math.trunc(n), this.mapSize.width = o, this.mapSize.height = n, this.viewPortSize.width = i, this.viewPortSize.height = s, this.bISize.width = t, this.bISize.height = e
					}
					prepare(t, e, i, s) {
						this.calcMap(t, e, i, s), this.view.size = this.mapSize, this.emit("zoomGetImage", {
							data: {
								width: this.mapSize.width,
								height: this.mapSize.height
							}
						})
					}
					set lensPosition(t) {
						const e = this.cBISize,
							i = this.mapSize;
						let s = i.height / e.height * t.top,
							o = i.width / e.width * t.left;
						this.cBIPosition.top = t.top, this.cBIPosition.left = t.left, s < 0 && (s = 0), o < 0 && (o = 0);
						const n = this.ls;
						s + n.height > i.height && (s = i.height - n.height), o + n.width > i.width && (o = i.width - n.width), this.lp.top = s, this.lp.left = o
					}
					set lensSize(t) {
						this.cBISize.width = t.width, this.cBISize.height = t.height;
						const e = this.mapSize,
							i = this.viewPortSize;
						this.ls.width = i.width >= t.width ? e.width : i.width / t.width * e.width, this.ls.height = i.height >= t.height ? e.height : i.height / t.height * e.height
					}
					move(t, e) {
						const i = this.bISize,
							s = i.width * e.x,
							o = i.height * e.y,
							n = Math.abs(t.y + (i.height - o) / 2),
							a = Math.abs(t.x + (i.width - s) / 2);
						this.scale.x = e.x, this.scale.y = e.y, this.lensSize = {
							width: s,
							height: o
						}, this.lensPosition = {
							top: n,
							left: a
						}, this.view.addLensCss(this.lp, this.ls, Math.max(this.mapSize.width, this.mapSize.height))
					}
					show() {
						[w.xz.SHOWING, w.xz.SHOWN].includes(this.state) || (this.state = w.xz.SHOWING, this.view.show((() => {
							this.addEvents(), this.state = w.xz.SHOWN
						})))
					}
					hide(t) {
						[w.xz.HIDDEN, w.xz.HIDING].includes(this.state) && !t || (this.state = w.xz.HIDING, this.view.hide(t, (() => {
							this.view.removeDomEventToDocBody(["mouseup", "touchend"], this.dragEndHandler), this.state = w.xz.HIDDEN
						})))
					}
					resize(t, e, i, s, o, n) {
						this.o.maxwidth = t, this.o.maxheight = e, this.calcMap(i, s, o, n), this.view.size = this.mapSize
					}
					destroy() {
						this.hide(!0), super.destroy()
					}
				}
				const $ = V;
				class W extends d.A {
					constructor(t, e) {
						super(), this.options = Object.assign({
							maxwidth: 200,
							maxheight: 200
						}, e || {}), this.view = new j(t), this.controller = new $(this.view, this.options), this.controller.parentClass = this
					}
					prepare(t, e, i, s) {
						this.controller.prepare(t, e, i, s)
					}
					move(t, e) {
						this.controller.move(t, e)
					}
					set img(t) {
						this.view.img = t
					}
					show() {
						this.controller.show()
					}
					hide(t) {
						this.controller.hide(t)
					}
					resize(t, e, i, s, o, n) {
						this.controller.resize(t, e, i, s, o, n)
					}
					destroy() {
						this.controller.destroy(), this.view.destroy(), super.destroy()
					}
				}
				const Z = W,
					X = class extends U {
						constructor(t, e) {
							super(t, Object.assign({
								map: !1,
								mapSize: 50
							}, e)), this.baseScalePercent = {
								x: 0,
								y: 0
							}, this.clonedImage = null, this.hideTimer = null, this.showTimer = null, this.map = null, this.zoomingTimer = null, this.currentCursorState = 0, this.innerImagePosition = {
								x: 0,
								y: 0
							}, this.setUpEvent = !1, s.A.browser.mobile && (this.o.pan = !0, "hover" === this.o.trigger && (this.o.trigger = "click")), this.view.setLensCss(this.lensPosition, this.lensSize), this.ANIM_STEP = .3
						}
						init() {
							super.init(), this.createZoomMap()
						}
						figureOutCursorState() {
							let t = super.figureOutCursorState();
							return "up" !== this.o.clickBehavior && "hover" !== this.o.trigger && "zoomIn" === t && (t = "zoomOut"), t
						}
						createZoomMap() {
							this.o.map && (this.map = new Z(this.view.getContainerForMap(), {
								maxwidth: Math.trunc(C(this.pSize.width / 2, this.o.mapSize)),
								maxheight: Math.trunc(C(this.pSize.height / 2, this.o.mapSize))
							}), this.map.parentClass = this, this.on("zoomGetImage", (t => {
								t.stopEmptyEvent(), t.data.map = !0, t.data.exactSize = !0
							})), this.on("zoomMapNewPosition", (t => {
								t.stopAll(), this.x = this.pPos.left + C(this.lensSize.width, t.data.x), this.y = this.pPos.top + C(this.lensSize.height, t.data.y), this.calcImagePositionInCenter(this.scale), this.o.smoothing || (this.deepZoomAction(), this.view.setImagePosition(this.iPos, this.scale), this.map && this.map.move(this.iPos, this.scale))
							})))
						}
						move(t, e) {
							this.x = t, this.y = e, this.calcImagePosition(this.scale), this.afterMove()
						}
						render(t, e) {
							super.render(t, e), this.map && this.map.move(t || this.iDPos, e || this.dScale)
						}
						calcImagePositionForPinch(t) {
							t || (t = this.dScale);
							const e = this.iSize.width * t.x,
								i = E(this.iSize.width, e);
							let s;
							e > this.lensSize.width ? (s = this._x - (C(e, this.baseScalePercent.x) + i), s = P(s, 0 - i, i + e, this.lensSize.width)) : s = this.lensSize.width / 2 - (e / 2 + i);
							const o = this.iSize.height * t.y,
								n = E(this.iSize.height, o);
							let a;
							o > this.lensSize.height ? (a = this._y - (C(o, this.baseScalePercent.y) + n), a = P(a, 0 - n, n + o, this.lensSize.height)) : a = this.lensSize.height / 2 - (o / 2 + n), this.iPos = {
								x: s,
								y: a
							}
						}
						setScale(t, e, i) {
							this.state === w.xz.SHOWN && (Number.isFinite(e) && (this.x = e, this.y = i), this.scale.x = t, this.scale.y = t, this.scale.x = (0, R.A)(this.scale.x, this.baseScale.x, 1), this.scale.y = (0, R.A)(this.scale.y, this.baseScale.y, 1), this.calcImagePositionForPinch(this.scale), this.sendZoomingAction(), this.setCursorState(this.figureOutCursorState()), this.o.smoothing || (this.dScale.x = this.scale.x, this.dScale.y = this.scale.y, this.imageDPosition.x = this.imagePosition.x, this.imageDPosition.y = this.imagePosition.y, this.deepZoomAction(), this.view.setImagePosition(this.imagePosition, this.scale), this.map && this.map.move(this.imagePosition, this.scale)))
						}
						afterZoom(t) {
							this.calcImagePositionForPinch(this.scale), super.afterZoom(t)
						}
						calcImagePosition(t, e, i, s) {
							const o = i || this._x,
								n = s || this._y;
							t || (t = this.dScale);
							const a = this.iSize.width * t.x,
								h = E(this.iSize.width, a);
							let r;
							a > this.lensSize.width ? (r = o - C(a, I(o, this.pSize.width)) - h, r = P(r, 0 - h, h + a, this.lensSize.width)) : r = this.lensSize.width / 2 - (a / 2 + h);
							const l = this.iSize.height * t.y,
								d = E(this.iSize.height, l);
							let c;
							l > this.lensSize.height ? (c = n - C(l, I(n, this.pSize.height)) - d, c = P(c, 0 - d, d + l, this.lensSize.height)) : c = this.lensSize.height / 2 - (l / 2 + d), this.iPos = {
								x: r,
								y: c
							}
						}
						calcImagePositionInCenter(t) {
							t || (t = this.dScale);
							const e = this.iSize.width * t.x,
								i = this.iSize.height * t.y,
								s = E(this.iSize.width, e),
								o = E(this.iSize.height, i);
							let n = this._x / (this.lensSize.width / e),
								a = this._y / (this.lensSize.height / i);
							n = this.lensSize.width / 2 - n - s, a = this.lensSize.height / 2 - a - o, n = P(n, 0 - s, s + e, this.lensSize.width), a = P(a, 0 - o, o + i, this.lensSize.height), this.iPos = {
								x: n,
								y: a
							}
						}
						set basePercent(t) {
							if ([w.xz.SHOWN, w.xz.SHOWING].includes(this.state)) {
								const e = this.iSize,
									i = e.width * this.scale.x,
									s = e.height * this.scale.y,
									o = E(e.width, i),
									n = E(e.height, s);
								this.baseScalePercent = {
									x: I(Math.abs(this.iPos.x) + this.correctX(t.x) - o, i),
									y: I(Math.abs(this.iPos.y) + this.correctY(t.y) - n, s)
								}
							}
						}
						setImage(t) {
							(this.shown || this.showing) && (t.callbackData.map ? this.map && (this.map.img = {
								src: t.src,
								srcset: t.srcset
							}) : super.setImage(t))
						}
						setShown(t) {
							super.setShown(t) && this.map && this.map.show()
						}
						getImagePosition() {
							this.innerImagePosition = {
								x: E(this.lensSize.width, this.zoomNodeSize.width),
								y: E(this.lensSize.height, this.zoomNodeSize.height)
							}
						}
						show(t, e, i, s, o, n) {
							return !!super.show() && (this.setUpEvent = o, this.iSize = {
								width: e.width,
								height: e.height
							}, this.view.addStartCss(), this.view.appendNodes(t, this.iSize), this.getAllSizes(), this.x = i, this.y = s, this.calcLensSize(), this.getImagePosition(), this.getBaseScale(), this.showDeepZoom(e.originWidth, e.originHeight), this.showTimer = setTimeout((() => {
								if (this.showTimer = null, this.emit("zoomBeforeShow", {
										data: {}
									}), n && "max" !== n)
									if ("zero" === n) this.scale.x = this.baseScale.x, this.scale.y = this.baseScale.y;
									else {
										const t = this.deepZoom.getScale("zoomin");
										this.scale.x = t, this.scale.y = t
									}
								this.calcImagePosition(this.scale, !0), this.view.eventNodePositionSize = {
									position: this.pPos,
									size: this.pSize
								}, this.dScale.x = this.baseScale.x, this.dScale.y = this.baseScale.y, this.iDPos = {
									x: -1 * E(this.iSize.width, this.iSize.width * this.dScale.x) + this.innerImagePosition.x,
									y: -1 * E(this.iSize.height, this.iSize.height * this.dScale.y) + this.innerImagePosition.y
								}, this.view.setLensCss(this.lensPosition, this.lensSize), this.view.setImageSize(this.iDPos, this.iSize, this.dScale), this.boundaries = this.view.boundaries, this.map && this.map.prepare(this.iSize.width, this.iSize.height, this.pSize.width, this.pSize.height), this.o.smoothing && "zero" !== n ? (this.setEvents(), this.animStep = .3, this.animCb = () => {
									this.deepZoomAction(), this.setShown(!1)
								}) : this.setShown(), this.o.smoothing && this.anim.start(), this.sendZoomShownEvent()
							}), 0), !0)
						}
						hide(t) {
							const e = super.hide(t);
							return e && (clearTimeout(this.showTimer), t || (this.scale.x !== this.baseScale.x || this.scale.y !== this.baseScale.y ? (this.animStep = .4, this.scale.x = this.baseScale.x, this.scale.y = this.baseScale.y, this.iPos = {
								x: -1 * E(this.iSize.width, this.iSize.width * this.scale.x) + this.innerImagePosition.x,
								y: -1 * E(this.iSize.height, this.iSize.height * this.scale.y) + this.innerImagePosition.y
							}, this.animCb = () => {
								this.setHidden()
							}) : this.setHidden())), e
						}
						addMouseScrollEvent() {
							this.view.addEventToWrapper("mousescroll", (t => {
								if (t.stop(), this.o.pan) {
									const e = this.iSize,
										i = e.width * this.scale.x,
										s = e.height * this.scale.y,
										o = E(e.width, i),
										n = E(e.height, s);
									this.baseScalePercent = {
										x: I(Math.abs(this.iPos.x) + this.correctX(t.x) - o, i),
										y: I(Math.abs(this.iPos.y) + this.correctY(t.y) - n, s)
									}
								}
								const e = this.scale.x;
								if (t.isMouse) {
									const e = 37,
										i = t.delta / C(t.deltaFactor, e);
									this.scale.x += i, this.scale.y += i
								} else {
									let e = t.delta;
									Math.abs(e) > 15 && (e = 15, t.delta < 0 && (e *= -1)), e /= 350, this.scale.x += e, this.scale.y += e
								}
								this.scale.x = (0, R.A)(this.scale.x, this.baseScale.x, 1), this.scale.y = (0, R.A)(this.scale.y, this.baseScale.y, 1), this.o.pan ? (this.x = t.x, this.y = t.y, this.calcImagePositionForPinch(this.scale)) : this.calcImagePosition(this.scale), e !== this.scale.x && (this.sendZoomingAction(), this.setCursorState(this.figureOutCursorState()), this.o.smoothing || (this.dScale.x = this.scale.x, this.dScale.y = this.scale.y, this.iDPos.x = this.iPos.x, this.iDPos.y = this.iPos.y, this.deepZoomAction(), this.view.setImagePosition(this.iPos, this.scale), this.map && this.map.move(this.iPos, this.scale))), this.hideByTimer()
							}))
						}
						hideByTimer() {
							clearTimeout(this.hideTimer), "outside" !== this.o.type && this.scale.x <= this.baseScale.x + 1e-8 && (this.hideTimer = setTimeout((() => {
								this.scale.x <= this.baseScale.x + 1e-8 && this.hide(!0)
							}), 1e3))
						}
						addInnerTouchDrag() {
							let t, e, i, s, o, n, a = !1;
							this.view.addEventToWrapper(A, (h => {
								h.stop(), "dragstart" === h.state ? (a = !0, this.view.addEventsCanvasClass(b.drag), this.stopMovingAndZooming(), this.x = h.x, this.y = h.y, i = this.iSize.width * this.scale.x, s = this.iSize.height * this.scale.y, o = E(this.iSize.width, i), n = E(this.iSize.height, s), t = h.x, e = h.y) : "dragend" === h.state ? (a = !1, this.view.removeEventsCanvasClass(b.drag)) : a && (this.x = h.x, this.y = h.y, i > this.lensSize.width ? (this.iPos.x += h.x - t, this.iPos.x = P(this.iPos.x, 0 - o, o + i, this.lensSize.width)) : this.iPos.x = this.lensSize.width / 2 - (i / 2 + o), s > this.lensSize.height ? (this.iPos.y += h.y - e, this.iPos.y = P(this.iPos.y, 0 - n, n + s, this.lensSize.height)) : this.iPos.y = this.lensSize.height / 2 - (s / 2 + n), this.o.smoothing && this.o.pan ? this.animStep = .3 : (this.iDPos.x = this.iPos.x, this.iDPos.y = this.iPos.y, this.deepZoomAction(), this.view.setImagePosition(this.iPos, this.scale), this.map && this.map.move(this.iPos, this.scale)), t = h.x, e = h.y)
							}))
						}
						addInnerPinch() {
							let t, e;
							const i = 1 - this.baseScale.x;
							let s, o, n, a, h;
							this.o.customZooming && this.view.addEventToWrapper("pinch", (r => {
								r.stop(), "pinchstart" === r.state ? (clearTimeout(t), this.stopMovingAndZooming(), this.view.node.removeEvent(A), this.scale.x = this.dScale.x, this.scale.y = this.dScale.y, e = this.scale.x, o = 1, n = 1, a = 1, h = this.baseScale.x, this.basePercent = r.centerPoint) : "pinchresize" === r.state ? this.basePercent = r.centerPoint : "pinchmove" === r.state ? (this.x = r.centerPoint.x, this.y = r.centerPoint.y, s = r.scale, s *= e, a < s && (a = s, h = this.baseScale.x, n = 1, o = i / (a - this.baseScale.x)), h > s && (h = s, a = 1, o = 1, n = this.baseScale.x / h), s = (this.baseScale.x + (s - this.baseScale.x) * o) * n, this.scale.x = s, this.scale.y = s, this.scale.x = (0, R.A)(this.scale.x, this.baseScale.x, 1), this.scale.y = (0, R.A)(this.scale.y, this.baseScale.y, 1), this.calcImagePositionForPinch(this.scale), this.sendZoomingAction(), this.setCursorState(this.figureOutCursorState()), this.o.smoothing || (this.dScale.x = this.scale.x, this.dScale.y = this.scale.y, this.iDPos.x = this.iPos.x, this.iDPos.y = this.iPos.y, this.deepZoomAction(), this.view.setImagePosition(this.iPos, this.scale), this.map && this.map.move(this.iPos, this.scale))) : "pinchend" === r.state && (clearTimeout(t), t = setTimeout((() => {
									this.addInnerTouchDrag()
								}), 42), this.scale.x <= this.baseScale.x + 1e-8 && "outside" !== this.o.type && this.state !== w.xz.HIDING && (clearTimeout(t), this.o.trigger && this.hide(!0)))
							}))
						}
						hideZoomByMouseOut() {
							this.view.addGlobalEvent((t => {
								((t, e, i, s) => {
									let o = !1;
									const n = e.left - s.x,
										a = e.top - s.y;
									return (t.x <= n || t.y <= a || t.x >= n + i.width || t.y >= a + i.height) && (o = !0), o
								})(t.clientXY, this.view.getContainerPosition(), this.view.getContainerSize(), s.A.$(document).scroll) && (this.view.removeGlobalEvent(), this.hide())
							}))
						}
						setEvents() {
							this.o.pan || s.A.browser.mobile || this.view.addEventToMainContainer(z, (t => {
								if (t.pointerType && "touch" === t.pointerType) return;
								t.stop();
								const e = t.pageXY;
								this.move(e.x, e.y)
							})), this.addInnerTouchDrag(), this.view.removeDragstart(), this.o.trigger && (this.o.customZooming && this.addMouseScrollEvent(), this.setUpEvent || this.addInnerPinch(), this.setUpEvent && s.A.browser.mobile && this.view.addEventToWrapper(x, (t => {
								t.stop(), this.hide(!0)
							})), "hover" !== this.o.trigger ? this.addClickEvent() : this.hideZoomByMouseOut(), s.A.browser.mobile || "hover" !== this.o.trigger || this.view.addEventToWrapper("click", (t => this.sendClickEvent(t))))
						}
						keepOldPosition(t) {
							let e = this.iPos.x,
								i = this.iPos.y;
							const s = this.iSize.width * this.scale.x,
								o = this.iSize.height * this.scale.y,
								n = E(this.iSize.width, s),
								a = E(this.iSize.height, o);
							e -= (t.width - this.lensSize.width) / 2, i -= (t.height - this.lensSize.height) / 2, e = s > this.lensSize.width ? P(e, 0 - n, n + s, this.lensSize.width) : this.lensSize.width / 2 - (s / 2 + n), i = o > this.lensSize.height ? P(i, 0 - a, a + o, this.lensSize.height) : this.lensSize.height / 2 - (o / 2 + a), this.iPos = {
								x: e,
								y: i
							}
						}
						onResize() {
							const t = this.lensSize;
							if (super.onResize(), this.state !== w.xz.HIDDEN && this.state !== w.xz.HIDING && (this.keepOldPosition(t), this.getImagePosition(), this.map)) {
								const t = Math.trunc(C(this.pSize.width / 2, this.o.mapSize)),
									e = Math.trunc(C(this.pSize.height / 2, this.o.mapSize));
								this.map.resize(t, e, this.iSize.width, this.iSize.height, this.pSize.width, this.pSize.height), this.o.smoothing || this.map.move(this.iPos, this.scale)
							}
						}
						destroy() {
							clearTimeout(this.showTimer), this.map && (this.map.destroy(), this.map = null, this.off("zoomGetImage"), this.off("zoomMapNewPosition")), super.destroy()
						}
					},
					G = class extends o {get parentSize() {
							return this.zoom.size
						}
						get parentPostion() {
							return this.zoom.position
						}
					},
					Y = class extends U {
						constructor(t, e) {
							s.A.browser.mobile && 9 === e.margin && delete e.margin, super(t, Object.assign({
								width: 70,
								height: 70,
								margin: 65
							}, e)), this.setUpEvent = !1, this.isSquare = !0, this.ANIM_STEP = .4
						}
						init() {
							super.init(), this.setOutsideLensSize()
						}
						setCursorState(t) {
							"zoomOut" === t && this.fsState === w.a0.OPENED && (t = "hidden"), super.setCursorState(t)
						}
						setOutsideLensSize() {
							const t = {
								width: this.o.width,
								height: this.o.height
							};
							t.width === t.height && (this.isSquare = !0), [t.width, t.height].includes("auto") ? (this.isSquare = !0, "auto" === t.width ? "auto" !== t.height ? (t.height = this.getPercentSize(t.height, "height"), t.width = t.height) : (t.height = 70, t.width = t.height) : (t.width = this.getPercentSize(t.width, "width"), t.height = t.width)) : (t.width = this.getPercentSize(t.width, "width"), t.height = this.getPercentSize(t.height, "height")), this.currentLensSize = (t => {
								let e;
								e = t.width >= t.height ? t.width / t.height : t.height / t.width;
								const i = 10,
									s = 90;
								return e > 9 ? {
									width: 50,
									height: 50
								} : (t.width < i && (t.height = i * (t.height / t.width), t.width = i), t.height < i && (t.width = i * (t.width / t.height), t.height = i), t.width > s && (t.height = s * (t.height / t.width), t.width = s), t.height > s && (t.width = s * (t.width / t.height), t.height = s), t)
							})({
								width: t.width,
								height: t.height
							}), this.ANIM_STEP = .6
						}
						calcLensSize() {
							if (this.isSquare) {
								const t = this.pSize,
									e = this.currentLensSize,
									i = C(Math.min(t.width, t.height), e.width);
								this.setLensSize(i, i)
							} else super.calcLensSize()
						}
						calcLensPosition() {
							const t = this.pSize;
							let e = this.o.margin;
							e < 0 && (e = 0), this._x < 0 && (this._x = 0), this._y < 0 && (this._y = 0), this._x > t.width && (this._x = t.width), this._y > t.height && (this._y = t.height);
							let i = this._y - this.lensHalfSize.height,
								o = this._x - this.lensHalfSize.width;
							if (s.A.browser.mobile) {
								i -= e;
								const t = this.pPos,
									n = s.A.$(window).scroll,
									a = s.A.$(window).size;
								t.top + i < n.y && (t.left + this._x - this.lensSize.width - e > n.x ? (i = this._y - this.lensHalfSize.height, o = this._x - this.lensSize.width - e) : t.left + this._x + this.lensSize.width + e < n.x + a.width ? (i = this._y - this.lensHalfSize.height, o = this._x + e) : n.y + a.height > t.top + this._y + e + this.lensSize.height && (i = this._y + e))
							}
							this.lensPosition = {
								top: i,
								left: o
							}
						}
						calcImagePosition(t, e, i, s) {
							const o = i || this._x,
								n = s || this._y,
								a = this.lensHalfSize.width - C(this.iSize.width, I(o, this.pSize.width)),
								h = this.lensHalfSize.height - C(this.iSize.height, I(n, this.pSize.height));
							this.iPos = {
								x: a,
								y: h
							}
						}
						getPercentSize(t, e) {
							return /%$/.test(t) ? t = parseInt(t, 10) : (t = parseInt(t, 10), t /= this.pSize[e] / 100), t
						}
						setEvents() {
							this.o.pan || s.A.browser.mobile || this.view.addEventToMainContainer(z, (t => {
								t.pointerType && "touch" === t.pointerType || (t.stop(), this.move(t.pageXY.x, t.pageXY.y), this.o.trigger && (this._x <= 0 || this._y <= 0 || this._x >= this.pSize.width || this._y >= this.pSize.height) && this.hide())
							})), this.o.customZooming && this.addMouseScroollEvent(), this.o.pan && this.addDragEvent(), this.o.trigger && (this.setUpEvent && !this.o.pan && this.view.addEventToMainContainer(x, (t => {
								t.stop(), this.hide(!0)
							})), this.addMouseOverEvent(), "hover" === this.o.trigger ? this.addMouseOutEvent() : this.addClickEvent(), s.A.browser.mobile || "up" !== this.o.clickBehavior && "hover" !== this.o.trigger || this.view.addEventToWrapper("click", (t => this.sendClickEvent(t))), s.A.browser.mobile && this.addTapEvent())
						}
						afterMove() {
							this.calcLensPosition(), this.calcImagePosition(this.scale), this.view.lensPosition = this.lensPosition, super.afterMove()
						}
						changeLensSize(t) {
							t.width = (0, R.A)(t.width, 10, 90), t.height = (0, R.A)(t.height, 10, 90), t.width !== this.currentLensSize.width && (this.currentLensSize.width = t.width, this.currentLensSize.height = t.height, this.calcLensSize(), this.calcLensPosition(), this.calcImagePosition(), this.iDPos.x = this.iPos.x, this.iDPos.y = this.iPos.y, this.deepZoomAction(!1, this.lensSize), this.view.setImagePosition(this.iPos, this.scale), this.view.lensPosition = this.lensPosition, this.view.lensSize = this.lensSize)
						}
						addMouseScroollEvent() {
							this.view.addEventToWrapper("mousescroll", (t => {
								t.stop();
								const e = t.delta,
									i = {
										width: 0,
										height: 0
									};
								if (this.isSquare)
									for (const t in i)({}).hasOwnProperty.call(i, t) && (i[t] = this.currentLensSize[t] + e);
								else {
									const t = this.currentLensSize.height / this.currentLensSize.width;
									i.width = this.currentLensSize.width + e, i.height = this.currentLensSize.height + e * t
								}
								this.changeLensSize(i)
							}))
						}
						addMouseOverEvent() {
							this.view.addEventToMainContainer("mouseover", (t => {
								t.stop();
								const e = t.pageXY;
								this.x = e.x, this.y = e.y, this.calcLensPosition(), this.calcImagePosition(), this.view.lensPosition = {
									top: this.lensPosition.top,
									left: this.lensPosition.left
								}, this.view.setImagePosition(this.iPos, this.scale)
							}))
						}
						addMouseOutEvent() {
							this.view.addEventToWrapper("mouseout", (t => {
								let e = t.related;
								for (; e && e !== this.node && e !== this.lensContainer && e !== this.eventsCanvasNode;) e = e.parentNode;
								if (this.node !== e && this.eventsCanvasNode !== e) {
									const e = t.clientXY;
									(e.x < this.boundaries.left || e.x > this.boundaries.right || e.y < this.boundaries.top || e.y > this.boundaries.bottom) && (t.stop(), this.hide(!this.o.smoothing))
								}
							}))
						}
						addDragEvent() {
							let t = !1;
							this.view.addEventToMainContainer(A, (e => {
								e.stop(), "dragstart" === e.state ? t = !0 : "dragend" === e.state ? t = !1 : t && this.move(e.x, e.y)
							}))
						}
						addTapEvent() {
							this.view.addEventToMainContainer("dblclick" === this.o.trigger ? "dbltap" : "tap", (t => {
								t.stop(), this.hide(!this.o.smoothing)
							}))
						}
						hide(t) {
							const e = super.hide(t);
							return e && (t || (this.view.addEventToWrapper("transitionend", (t => {
								t.stop(), this.view.removeEventFromWrapper("transitionend"), this.setHidden()
							})), this.view.lensStyle = {
								transition: "opacity .2s linear, transform .2s linear",
								opacity: 0,
								transform: "scale(0)"
							})), e
						}
						show(t, e, i, s, o, n) {
							return !!super.show() && (this.emit("zoomBeforeShow", {
								data: {}
							}), this.setUpEvent = o, this.iSize = {
								width: e.width,
								height: e.height
							}, this.view.addStartCss(), this.view.appendNodes(t, this.iSize), this.getAllSizes(), this.x = i, this.y = s, this.calcLensSize(), this.calcLensPosition(), this.getBaseScale(), this.showDeepZoom(e.originWidth, e.originHeight), this.calcImagePosition(this.scale, !0), this.view.eventNodePositionSize = {
								position: this.pPos,
								size: this.pSize
							}, this.dScale.x = this.baseScale.x, this.dScale.y = this.baseScale.y, this.iDPos = {
								x: -1 * E(this.iSize.width, this.iSize.width * this.dScale.x) - this.lensPosition.left,
								y: -1 * E(this.iSize.height, this.iSize.height * this.dScale.y) - this.lensPosition.top
							}, this.view.setLensCss(this.lensPosition, this.lensSize, "opacity .15s linear, transform .15s linear"), this.view.setImageSize(this.iDPos, this.iSize, this.dScale), this.boundaries = this.view.boundaries, this.o.smoothing ? (this.view.addEventToWrapper("transitionend", (t => {
								t.stop(), this.view.removeEventFromWrapper("transitionend"), this.view.lensStyle = {
									transition: ""
								}, this.sendZoomShownEvent()
							})), this.setShown(), this.anim.start()) : (this.setShown(), this.sendZoomShownEvent()), !0)
						}
					},
					q = class extends o {
						getImageForEye() {
							return this.image.node.cloneNode()
						}
						getNodeForEye() {
							return this.zoom
						}
						set lensPosition(t) {
							this.cnv.setCss({
								top: t.top,
								left: t.left
							})
						}
						setCanvasNodeSize(t) {
							this.cnv.setCss({
								width: t.width,
								height: t.height
							})
						}
						addStartCss(t) {
							this.lensStyle = {
								opacity: 0,
								transform: "translate3d(" + t.start.x + "%, " + t.start.y + "%, 0px)"
							}
						}
						get parentSize() {
							return this.zoom.size
						}
						get parentPostion() {
							return this.zoom.position
						}
						setLensCss(t, e, i) {
							this.cnv.setCss({
								top: t.top,
								left: t.left
							}), super.setLensCss(t, e, i)
						}
						addMouseMoveEvent(t) {
							s.A.$(window).addEvent("mousemove", t)
						}
						removeMouseMoveEvent(t) {
							s.A.$(window).removeEvent("mousemove", t)
						}
						clearCss() {
							this.cnv.removeAttr("style")
						}
					},
					Q = class {
						constructor(t, e) {
							this.pn = s.A.$(t);
							const i = "sirv-zoom-lens";
							this.c = s.A.$new("div"), this.c.addClass(i + "-wrapper"), this.ic = s.A.$new("div"), this.ic.addClass(i), this.ic.appendTo(this.c), this.img = null, this.bwImg = null, this.lastCursorClass = null, e && this.c.addEvent("mousedown", (t => {
								t.stop()
							}))
						}
						get container() {
							return this.c
						}
						calcContainerPosition() {
							if (["img", "canvas"].includes(this.pn.tagName)) {
								const t = this.pn.position,
									e = s.A.$(this.pn.node.parentNode).position;
								this.c.setCss({
									top: t.top - e.top,
									left: t.left - e.left
								})
							}
						}
						set imageSize(t) {
							this.img && [this.img, this.bwImg].forEach((e => {
								e && e.setCss({
									top: 0,
									left: 0,
									width: t.width,
									height: t.height,
									position: "absolute"
								})
							}))
						}
						get size() {
							return this.pn.size
						}
						set containerSize(t) {
							this.c.setCss({
								width: t.width,
								height: t.height
							})
						}
						set insideContainerSize(t) {
							this.ic.setCss({
								width: t.width,
								height: t.height
							})
						}
						set insideContainerFontSize(t) {
							this.ic.setCssProp("font-size", Math.max(t.width, t.height) + "px")
						}
						toggleCursorClass(t) {
							t !== this.lastCursorClass && (this.lastCursorClass && (this.c.removeClass(this.lastCursorClass), this.lastCursorClass = null), t && (this.c.addClass(t), this.lastCursorClass = t))
						}
						setTransform(t, e) {
							this.ic.setCssProp("transform", "translate3d(" + t + "px," + e + "px, 0px)"), this.img && this.img.setCssProp("transform", "translate3d(" + -1 * t + "px, " + -1 * e + "px, 0px)")
						}
						show(t, e) {
							t && (this.img = s.A.$(t)), this.calcContainerPosition(), this.imageSize = e, this.img && this.ic.append(this.img);
							let i = this.pn;
							["img", "canvas"].includes(i.tagName) && (i = s.A.$(i.node.parentNode)), i.append(this.c)
						}
						hide() {
							this.c.remove(), this.img && (this.img.remove(), this.img = null, this.bwImg && (this.bwImg.remove(), this.bwImg = null))
						}
						destroy() {
							this.c.removeEvent("mousedown"), this.c.remove()
						}
					},
					J = (t, e) => Math.abs(t - e),
					K = (t, e, i) => (t - e) * i,
					tt = class {
						constructor(t) {
							this.view = t, this.pSize = {
								width: 0,
								height: 0
							}, this.inDoc = !1, this.timer = null, this.isPlaying = !1, this.pos = {
								x: null,
								y: null
							}, this.dPos = {
								x: null,
								y: null
							}, this._size = {
								width: 0,
								height: 0
							}, this.dSize = {
								width: 0,
								height: 0
							}
						}
						doAnimation() {
							let t = !1;
							const e = .001;
							return (J(this.pos.x, this.dPos.x) > e || J(this.pos.y, this.dPos.y) > e || J(this._size.width, this.dSize.width) > e || J(this._size.height, this.dSize.height) > e) && (t = !0), t
						}
						animate() {
							this.isPlaying = !0;
							const t = .4,
								e = K(this.pos.x, this.dPos.x, t),
								i = K(this.pos.y, this.dPos.y, t),
								s = K(this._size.width, this.dSize.width, t),
								o = K(this._size.height, this.dSize.height, t);
							this.dPos.x += e, this.dPos.y += i, this.dSize.width += s, this.dSize.height += o, this.setCss(), this.doAnimation() ? this.timer = setTimeout((() => {
								this.animate()
							}), 16) : this.stopAnimation()
						}
						setCss() {
							const t = this._size,
								e = this.dSize;
							(J(t.width, e.width) > 0 || J(t.height, e.height) > 0) && (this.view.insideContainerSize = e, this.view.insideContainerFontSize = this.pSize), this.view.setTransform(Math.round(this.dPos.x), Math.round(this.dPos.y))
						}
						stopAnimation() {
							this.isPlaying && (this.isPlaying = !1, clearTimeout(this.timer), this.dPos.x = this.pos.x, this.dPos.y = this.pos.y, this.dSize.width = this._size.width, this.dSize.height = this._size.height, this.setCss())
						}
						set size(t) {
							this._size.width = t.width, this._size.height = t.height, this.inDoc && null !== this.dPos.x && (this.isPlaying || this.animate())
						}
						set position(t) {
							const e = this._size,
								i = this.pSize;
							let s = t.x - e.width / 2,
								o = t.y - e.height / 2;
							s < 0 && (s = 0), o < 0 && (o = 0), s > i.width - e.width && (s = i.width - e.width), o > i.height - e.height && (o = i.height - e.height), this.pos.x = s, this.pos.y = o, null === this.dPos.x && (this.dPos.x = s, this.dPos.y = o), this.inDoc && (this.isPlaying || this.animate())
						}
						setSizes() {
							const t = this.view.size;
							this.pSize = t, this.view.containerSize = t, this.view.insideContainerFontSize = t
						}
						show(t) {
							this.inDoc || (this.inDoc = !0, this.setSizes(), this.view.show(t, this.pSize))
						}
						hide() {
							this.inDoc && (this.inDoc = !1, this.view.hide(), this.pos = {
								x: null,
								y: null
							}, this.dPos = {
								x: null,
								y: null
							}, this._size = {
								width: 0,
								height: 0
							}, this.dSize = {
								width: 0,
								height: 0
							})
						}
						resize() {
							this.inDoc && (this.setSizes(), this.view.calcContainerPosition())
						}
						destroy() {
							this.stopAnimation(), this.inDoc = !1
						}
					},
					et = class {
						constructor(t, e) {
							this.view = new Q(t, e), this.controller = new tt(this.view)
						}
						addEventToMainContainer(t, e) {
							this.view.container.addEvent(t, e)
						}
						removeEventToMainContainer(t, e) {
							e ? this.view.container.removeEvent(t, e) : this.view.container.removeEvent(t)
						}
						clearEvents() {
							this.view.container.clearEvents()
						}
						get boundaries() {
							return this.view.container.node.getBoundingClientRect()
						}
						show(t) {
							this.controller.show(t)
						}
						hide() {
							this.controller.hide()
						}
						toggleCursorClass(t) {
							this.view.toggleCursorClass(t)
						}
						set size(t) {
							this.controller.size = t
						}
						set position(t) {
							this.controller.position = t
						}
						resize() {
							this.controller.resize()
						}
						destroy() {
							this.controller.destroy(), this.view.destroy()
						}
					},
					it = class extends U {
						constructor(t, e) {
							super(t, Object.assign({
								margin: 9,
								outsidePosition: "right",
								width: 100,
								height: 100
							}, e)), this.showingParams = null, this.eye = new et(this.view.getNodeForEye(), "hover" === this.o.trigger), this.ANIM_STEP = .18, this.mouseOutHandler = this.mouseOut.bind(this)
						}
						getBoundaries() {
							this.boundaries = this.eye.boundaries
						}
						init() {
							super.init(), this.setOutsideLensSize()
						}
						figureOutCursorState() {
							let t = super.figureOutCursorState();
							return "hover" !== this.o.trigger && "zoomIn" === t && 0 === this.getZoomData() && (t = "zoomOut"), t
						}
						setCursorState(t) {
							t = super.setCursorState(t), this.o.trigger && this.eye.toggleCursorClass(b[t])
						}
						setEyesParams() {
							const t = this.currentLensSize.width / (this.iSize.width * this.scale.x),
								e = this.currentLensSize.height / (this.iSize.height * this.scale.y);
							this.eye.size = {
								width: t * this.zoomNodeSize.width,
								height: e * this.zoomNodeSize.height
							}, this.eye.position = {
								x: this._x,
								y: this._y
							}
						}
						calcLensPosition() {
							let t = this.o.margin;
							const e = this.pSize,
								i = this.pPos;
							t < 0 && (t = 0);
							let {
								top: s,
								left: o
							} = i;
							switch (this.o.outsidePosition) {
								case "top":
									s += -1 * (this.lensSize.height + t);
									break;
								case "left":
									o += -1 * (this.lensSize.width + t);
									break;
								case "right":
									o += e.width + t;
									break;
								case "bottom":
									s += e.height + t
							}
							this.lensPosition = {
								top: s,
								left: o
							}
						}
						calcImagePosition(t) {
							t || (t = this.dScale);
							const e = this.iSize.width * t.x,
								i = this.iSize.height * t.y,
								s = E(this.iSize.width, e),
								o = E(this.iSize.height, i);
							let n = this._x / (this.zoomNodeSize.width / e),
								a = this._y / (this.zoomNodeSize.height / i);
							n = this.lensSize.width / 2 - n - s, a = this.lensSize.height / 2 - a - o, n = P(n, 0 - s, s + e, this.lensSize.width), a = P(a, 0 - o, o + i, this.lensSize.height), this.iPos = {
								x: n,
								y: a
							}
						}
						afterMove() {
							this.calcLensPosition(), this.calcImagePosition(this.scale), this.setEyesParams(), this.view.lensPosition = this.lensPosition, super.afterMove()
						}
						hide(t) {
							const e = super.hide(t);
							return e && (s.A.browser.mobile || this.view.removeMouseMoveEvent(this.mouseOutHandler), this.eye.clearEvents(), this.eye.hide(), t || (this.view.removeEvents(), this.setHidden())), e
						}
						getStartCss() {
							const t = {
								start: {
									x: 0,
									y: 0
								},
								end: {
									x: 0,
									y: 0
								}
							};
							switch (this.o.outsidePosition) {
								case "top":
									t.start.y = 10, t.end.y = 0;
									break;
								case "left":
									t.start.x = 10, t.end.x = 0;
									break;
								case "right":
									t.start.x = -10, t.end.x = 0;
									break;
								case "bottom":
									t.start.y = -10, t.end.y = 0
							}
							return t
						}
						setShown() {
							super.setShown(), this.getBoundaries()
						}
						show(t, e, i, s, o, n) {
							return !!super.show() && (this.emit("zoomBeforeShow", {
								data: {}
							}), this.iSize = {
								width: e.width,
								height: e.height
							}, this.showingParams = this.getStartCss(), this.view.addStartCss(this.showingParams), this.view.appendNodes(t, this.iSize), this.getAllSizes(), this.x = i, this.y = s, this.calcLensSize(), this.calcLensPosition(), this.getBaseScale(), this.showDeepZoom(e.originWidth, e.originHeight), this.calcImagePosition(this.scale, !0), this.view.eventNodePositionSize = {
								position: this.pPos,
								size: this.pSize
							}, this.dScale.x = this.baseScale.x, this.dScale.y = this.baseScale.y, this.iDPos = {
								x: -1 * E(this.iSize.width, this.iSize.width * this.dScale.x),
								y: -1 * E(this.iSize.height, this.iSize.height * this.dScale.y)
							}, this.view.setLensCss(this.lensPosition, this.lensSize, this.o.smoothing ? "opacity .4s linear, transform .15s ease-in" : "none"), this.view.setImageSize(this.iDPos, this.iSize, this.dScale), (this.o.smoothing || "zero" === n) && this.setShown(), this.eye.show(this.view.getImageForEye()), this.getBoundaries(), this.setEyesParams(), this.animStep = .3, this.o.smoothing ? this.anim.start() : this.setShown(), this.sendZoomShownEvent(), !0)
						}
						setOutsideLensSize() {
							const t = {
								width: this.o.width,
								height: this.o.height
							};
							"auto" === t.width ? t.width = this.pSize.width : /%$/.test(this.o.width) ? t.width = this.pSize.width / 100 * parseInt(this.o.width, 10) : t.width = parseInt(t.width, 10), "auto" === t.height ? t.height = this.pSize.height : /%$/.test(this.o.height) ? t.height = this.pSize.height / 100 * parseInt(this.o.height, 10) : t.height = parseInt(t.height, 10), this.currentLensSize = {
								width: t.width,
								height: t.height
							}
						}
						calcLensSize() {
							this.lensSize = {
								width: this.currentLensSize.width,
								height: this.currentLensSize.height
							}, this.lensHalfSize = {
								width: this.lensSize.width / 2,
								height: this.lensSize.height / 2
							}
						}
						setEvents() {
							if (this.eye.addEventToMainContainer("mousemove", (t => {
									t.stop(), this.move(t.pageXY.x, t.pageXY.y)
								})), this.o.customZooming && this.setMouseScrollEvent(), s.A.browser.mobile && this.o.pan && this.addOutsideTouchDrag(), this.o.trigger) {
								if (s.A.browser.mobile || !s.A.browser.touchScreen || "edge" !== s.A.browser.uaName || this.o.pan || this.eye.addEventToMainContainer("pointerup", (t => {
										this.hide()
									})), "hover" === this.o.trigger) s.A.browser.mobile || this.view.addMouseMoveEvent(this.mouseOutHandler), this.eye.addEventToMainContainer("mouseout", this.mouseOutHandler);
								else {
									let t = ["btnclick", "tap"];
									"dblclick" === this.o.trigger && (t = ["dblbtnclick", "dbltap"]), this.eye.addEventToMainContainer(t, (t => {
										this.hide()
									}))
								}
								s.A.browser.mobile || "up" !== this.o.clickBehavior && "hover" !== this.o.trigger || this.eye.addEventToMainContainer("click", (t => this.sendClickEvent(t)))
							}
						}
						mouseOut(t) {
							const e = t.clientXY;
							(e.x < this.boundaries.left || e.x > this.boundaries.right || e.y < this.boundaries.top || e.y > this.boundaries.bottom) && this.hide(!this.getZoomData())
						}
						addOutsideTouchDrag() {
							let t = !1;
							this.eye.addEventToMainContainer(A, (e => {
								e.stop(), "dragstart" === e.state ? t = !0 : "dragend" === e.state ? t = !1 : t && this.move(e.x, e.y)
							}))
						}
						setMouseScrollEvent() {
							this.eye.addEventToMainContainer("mousescroll", (t => {
								const e = this.scale.x;
								if (t.stop(), t.isMouse) {
									const e = 37,
										i = t.delta / C(t.deltaFactor, e);
									this.scale.x += i, this.scale.y += i
								} else {
									let e = t.delta;
									Math.abs(e) > 15 && (e = 15, t.delta < 0 && (e *= -1)), e /= 350, this.scale.x += e, this.scale.y += e
								}
								this.scale.x = (0, R.A)(this.scale.x, this.baseScale.x, 1), this.scale.y = (0, R.A)(this.scale.y, this.baseScale.y, 1), this.calcImagePosition(this.scale), e !== this.scale.x && (this.sendZoomingAction(), this.setCursorState(this.figureOutCursorState()), this.o.smoothing || (this.dScale.x = this.scale.x, this.dScale.y = this.scale.y, this.iDPos.x = this.iPos.x, this.iDPos.y = this.iPos.y, this.deepZoomAction(), this.setImagePosition(this.iPos, this.scale)), this.setEyesParams())
							}))
						}
						setLensStyleOnResize() {
							this.view.lensPosition = this.lensPosition, this.view.setCanvasNodeSize(this.lensSize)
						}
						onResize() {
							var t;
							super.onResize(), this.state !== w.xz.HIDDEN && this.state !== w.xz.HIDING && (null == (t = this.eye) || t.resize())
						}
						destroy() {
							var t;
							null == (t = this.eye) || t.destroy(), this.view.removeMouseMoveEvent(this.mouseOutHandler), super.destroy()
						}
					};
				i(757).ms.addCssModule("ImageZoom", ".sirv-zoom{-webkit-touch-callout:none!important;-webkit-tap-highlight-color:transparent!important;backface-visibility:hidden!important;outline:0!important;position:absolute;touch-action:none;-webkit-user-select:none!important;user-select:none!important;z-index:999999999}.sirv-zoom .sirv-outside-zoom{background:#fff;box-shadow:0 0 3px #99999980}.sirv-zoom .sirv-circle-zoom{background:#ffffff4d;border:0;border-radius:100%}.sirv-zoom .sirv-circle-zoom:before{background:#0000;border:1px solid #999999b3;border-radius:100%;bottom:0;box-shadow:inset 0 0 20px 1px #0000004d;content:\"\";display:block;left:0;position:absolute;right:0;top:0;z-index:126}.sirv-zoom .sirv-zoom-wrapper{display:inline-block;z-index:9}.sirv-zoom .sirv-zoom-wrapper,.sirv-zoom .sirv-zoom-wrapper .sirv-zoom-image-wrapper{overflow:hidden;position:absolute}.sirv-zoom .sirv-zoom-wrapper .sirv-zoom-image-wrapper>img{-webkit-user-drag:none;user-drag:none;display:inline!important;left:0;margin:0;padding:0;position:absolute;top:0;-webkit-user-select:none;user-select:none}.sirv-zoom .sirv-zoom-wrapper .sirv-deepzoom{height:100%;left:0;overflow:hidden;position:relative;top:0;width:100%;z-index:42}.sirv-zoom .sirv-zoom-wrapper .sirv-deepzoom>div{height:100%;left:0;position:absolute;top:0;width:100%}.sirv-zoom .sirv-zoom-wrapper .sirv-deepzoom>div canvas{display:block!important;left:0;top:0}.zoom-helper{background-color:#eaeaea;border:1px solid #ccc9c9;border-radius:4px;box-shadow:1px 1px 9px 1px #00000080;display:inline-block;overflow:hidden;overflow-y:auto;padding:10px;position:fixed;right:10px;top:10px;z-index:999}.zoom-helper .z-loaded-color{background-color:#87bd89!important}.zoom-helper .z-loading-color{background-color:#a99cef!important}.zoom-helper .z-canceled-color{background-color:#f19c9c!important}.zoom-helper .z-helper-head{margin-bottom:9px}.zoom-helper .z-body,.zoom-helper .z-head,.zoom-helper .z-level{position:relative}.zoom-helper .z-level{background-color:#d4d3d3;border-radius:4px;box-sizing:border-box;margin-bottom:9px;padding:10px}.zoom-helper .z-head{margin-bottom:9px}.zoom-helper .z-body{border-left:1px solid;border-top:1px solid}.zoom-helper .z-tile{border-bottom:1px solid;border-right:1px solid;box-sizing:border-box;display:inline-block;position:absolute}.zoom-helper .z-status{background-color:#e87979;border-radius:50%;box-sizing:border-box;display:inline-block;height:10px;margin-left:10px;width:10px}.zoom-helper .z-status.shown{background-color:#66ca66!important}.sirv-zoom-map{border:1px solid #bdbdbd;bottom:16px;box-sizing:border-box;cursor:pointer;height:150px;left:16px;overflow:hidden;position:absolute;width:200px;z-index:126}.sirv-zoom-map .sirv-zoom-map-lens{border:1px solid #fff;box-sizing:border-box;height:50px;left:50px;position:absolute;top:50px;width:50px;z-index:42}.sirv-zoom-map .sirv-zoom-map-lens:after,.sirv-zoom-map .sirv-zoom-map-lens:before{content:\"\";display:block;height:100%;position:absolute;width:100%}.sirv-zoom-map .sirv-zoom-map-lens:before{border:1em solid #0009;border-image:initial;box-sizing:initial;left:-1em;top:-1em}.sirv-zoom-map .sirv-zoom-map-lens:after{border:1px solid #fff;border-image:initial;box-sizing:border-box}.sirv-zoom-map>img{height:100%;left:0;position:relative;top:0;width:100%}.sirv-zoom-lens,.sirv-zoom-lens-wrapper{left:0;position:absolute;top:0}.sirv-zoom-lens-wrapper{background-color:#9996;overflow:hidden;z-index:9999999999}.sirv-zoom-lens{box-shadow:0 0 3px #99999980;overflow:hidden}.sirv-zoom-lens img{max-height:none!important;max-width:none!important;transition:none!important}.sirv-filter-bw{filter:grayscale(.5) opacity(.5);filter:url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='grayscale'><feColorMatrix type='saturate' values='0'/><feComponentTransfer><feFuncA type='linear' slope='0.6'/></feComponentTransfer></filter></svg>#grayscale\")}");
				class st extends d.A {
					constructor(t, e) {
						super(), this.zoomType = e.type, "inner" === e.type ? (this.view = new n(t), this.view.addClassToWrapper("inner"), this.controller = new X(this.view, e)) : ["circle", "square"].includes(e.type) ? (this.view = new G(t), this.view.addClassToWrapper(e.type), this.controller = new Y(this.view, e)) : (this.view = new q(t), this.view.addClassToWrapper("outside"), this.controller = new it(this.view, e)), this.controller.parentClass = this, this.controller.init()
					}
					set lensContainer(t) {
						this.controller.lensContainer = t
					}
					get shown() {
						return this.controller.shown
					}
					get showing() {
						return this.controller.showing
					}
					getZoomData(t) {
						return this.controller.getZoomData(t)
					}
					get nextMinZoom() {
						return this.controller.nextMinZoom
					}
					get nextMaxZoom() {
						return this.controller.nextMaxZoom
					}
					zoomUp(t, e, i) {
						return this.controller.zoomUp(t, e, i)
					}
					zoomDown(t, e) {
						return this.controller.zoomDown(t, e)
					}
					showCenter(t, e, i) {
						return this.controller.showCenter(t, e, i)
					}
					addLoadedImage(t) {
						this.controller.setImage(t)
					}
					show(t, e, i, s, o, n) {
						return this.controller.show(t, e, i, s, o, n)
					}
					hide(t) {
						return this.controller.hide(t)
					}
					customMove(t, e) {
						this.controller.customMove(t, e)
					}
					get baseScale() {
						return this.controller.baseScale
					}
					set basePercent(t) {
						"inner" === this.zoomType && (this.controller.basePercent = t)
					}
					setScale(t, e, i) {
						"inner" === this.zoomType && this.controller.setScale(t, e, i)
					}
					setFullscreenState(t) {
						this.controller.setFullscreenState(t)
					}
					onResize() {
						this.controller.onResize()
					}
					destroy() {
						this.view.destroy(), this.controller.destroy()
					}
				}
				const ot = st
			},
			2948: (t, e, i) => {
				i.d(e, {
					A: () => h
				});
				var s = i(7202),
					o = i(7741),
					n = i(511);
				class a extends s.A {
					constructor(t, e) {
						super(t, e = (t => (t || (t = {}), t.width || (t.width = "100%"), t.height || (t.height = "100%"), t))(e)), this.type = "component", this.loaderElement.addClass(n.Mu + "-bounce-wrapper").append(o.A.$new("div").addClass(n.Mu + "-bounce1")).append(o.A.$new("div").addClass(n.Mu + "-bounce2"))
					}
					addClass() {
						this.node.addClass(n.Mu + "-component-loader")
					}
					destroy() {
						this.loaderElement.removeClass(n.Mu + "-bounce-wrapper"), this.loaderElement.node.innerHTML = "", super.destroy()
					}
				}
				const h = a
			},
			4345: (t, e, i) => {
				i.d(e, {
					A: () => h
				});
				var s = i(7985),
					o = i(7741),
					n = i(511);
				class a extends s.A {
					constructor(t, e) {
						super(), this.parentNode = o.A.$(t), this.options = Object.assign({
							width: null,
							height: null,
							class: null
						}, e || {}), this.node = o.A.$new("div").addClass(n.Mu + "-loader"), this.type = "simple", this.inDoc = !1, this.options.class && this.node.addClass(this.options.class), this.options.width && this.node.setCssProp("width", this.options.width), this.options.height && this.node.setCssProp("height", this.options.height)
					}
					append() {
						this.inDoc || (this.inDoc = !0, this.parentNode.append(this.node))
					}
					show() {
						this.append(), this.node.setCss({
							display: "",
							visibility: "visible"
						})
					}
					hide() {
						this.node.setCss({
							display: "none",
							visibility: "hidden"
						})
					}
					destroy() {
						this.hide(), this.node.remove(), this.node = null, this.inDoc = !1, super.destroy()
					}
				}
				const h = a
			},
			1808: (t, e, i) => {
				i.d(e, {
					A: () => c
				});
				var s = i(7202),
					o = i(511),
					n = i(7741);
				i(757).ms.addCssModule("ProgressLoader", '.smv-progress-loader{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;pointer-events:none}.smv-progress-loader .smv-pl-circle-wrapper,.smv-progress-loader .smv-pl-indicator,.smv-progress-loader .smv-pl-indicator .smv-pl-pie,.smv-progress-loader .smv-pl-indicator .smv-pl-slice,.smv-progress-loader .smv-pl-text-wrapper,.smv-progress-loader .smv-pl-wrapper{height:100%;left:0;top:0;width:100%}.smv-progress-loader .smv-pl-text-wrapper,.smv-progress-loader .smv-pl-wrapper{display:inline-block;position:relative}.smv-progress-loader .smv-pl-wrapper{background-color:#0000008c;border-radius:50%;opacity:0;transform:scale(0);transition:transform .15s cubic-bezier(.17,.67,.57,1.47),opacity .2s linear}.smv-progress-loader .smv-pl-circle-wrapper,.smv-progress-loader .smv-pl-indicator,.smv-progress-loader .smv-pl-indicator .smv-pl-pie,.smv-progress-loader .smv-pl-indicator .smv-pl-slice{position:absolute}.smv-progress-loader .smv-pl-circle-wrapper,.smv-progress-loader .smv-pl-indicator{z-index:1}.smv-progress-loader .smv-pl-circle-wrapper{animation:sirv-pl-loader-rotate 2s linear infinite}.smv-progress-loader .smv-pl-indicator .smv-pl-pie,.smv-progress-loader .smv-pl-indicator .smv-pl-slice{stroke-width:2;fill:#0000}.smv-progress-loader .smv-pl-indicator .smv-pl-pie{stroke:#ffffff4d;z-index:1}.smv-progress-loader .smv-pl-indicator .smv-pl-slice{stroke:#fff;stroke-linecap:round;z-index:2}.smv-progress-loader .smv-pl-text-wrapper{align-items:center;display:inline-flex;font-size:12px;justify-content:center;position:relative;text-align:center;z-index:2}.smv-progress-loader .smv-pl-text-wrapper:after{content:"";display:inline-block;height:100%;vertical-align:middle}.smv-progress-loader .smv-pl-text-wrapper .smv-pl-text{color:#fff;display:inline;font-weight:700;position:relative}.smv-progress-loader .smv-pl-text-wrapper .smv-pl-text .smv-pl-text-percent{font-size:.7em}@keyframes sirv-pl-loader-rotate{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}');
				const a = (t, e) => {
						const i = n.A.$(document.createElementNS("http://www.w3.org/2000/svg", t));
						return e || (e = {}), Object.entries(e).forEach((t => i.attr(...t))), i
					},
					h = 0,
					r = 1,
					l = 2;
				class d extends s.A {
					constructor(t, e) {
						super(t, e = (t => (t || (t = {}), t.width || (t.width = 44), t.height || (t.height = 44), t.max || (t.max = 0), t))(e)), this.type = "progress", this.lineSize = 125, this.currentLineSize = 125, this.currentPersent = 0, this.currentValue = 0, this.progressState = h, this.maxOpacityFlag = !1, this.maxOpacity = 1, this.circles = [], this.size = {
							width: this.options.width,
							height: this.options.height
						}, this.state = o.xz.HIDDEN, this._createCircles()
					}
					addClass() {
						this.node.addClass(o.Mu + "-progress-loader")
					}
					_createCircles() {
						this.p = '<span class="' + o.Mu + '-pl-text-percent">%</span>', this.loaderElement.addClass(o.Mu + "-pl-wrapper"), this.circleWrapper = n.A.$new("div").addClass(o.Mu + "-pl-circle-wrapper");
						const t = this.size.width,
							e = t / 2;
						this.circles.push(a("circle", {
							class: o.Mu + "-pl-pie",
							r: e - 2,
							cx: e,
							cy: e
						})), this.circles.push(a("circle", {
							class: o.Mu + "-pl-slice",
							r: e - 2,
							cx: e,
							cy: e
						})), this.svg = a("svg", {
							class: o.Mu + "-pl-indicator",
							viewBox: "0 0 " + t + " " + t
						}), this.circles[1].node.style.strokeDasharray = this.lineSize, this.circles[1].node.style.strokeDashoffset = this.lineSize, n.A.$(this.circles[1]).addEvent("transitionend", (t => {
							t.stop()
						})).setCssProp("transition", "stroke-dashoffset .1s linear"), n.A.$(this.svg).append(this.circles[0]), n.A.$(this.svg).append(this.circles[1]), this.textWrapper = n.A.$new("div").addClass(o.Mu + "-pl-text-wrapper"), this.text = n.A.$new("span").addClass(o.Mu + "-pl-text"), this.text.changeContent(this.currentPersent + this.p), this.textWrapper.append(this.text), this.circleWrapper.append(this.svg), this.loaderElement.append(this.circleWrapper), this.loaderElement.append(this.textWrapper)
					}
					append() {
						this.progressState !== l && super.append()
					}
					progress(t) {
						var e, i;
						return void 0 === t && (t = 1), this.progressState !== l && (this.progressState = r, this.currentValue += t, this.currentPersent = ((t, e) => Math.round(100 / (t / e)))(this.options.max, this.currentValue), this.currentLineSize = (e = this.lineSize, i = this.currentPersent, e - e / 100 * i), this.circles[1].node.style.strokeDashoffset = this.currentLineSize, this.text.node.innerHTML = this.currentPersent + this.p, this.currentValue === this.options.max && (this.progressState = l, this.hide())), this.currentValue
					}
					setMaxOpacity(t) {
						!this.maxOpacityFlag && this.loaderElement && (this.maxOpacity = t, this.maxOpacityFlag = !0, this.loaderElement.setCssProp("opacity", t))
					}
					isEnded() {
						return this.currentValue === this.options.max
					}
					isStarted() {
						return this.currentValue > 0
					}
					finishOff() {
						this.currentValue = this.options.max
					}
					isShow() {
						return this.state === o.xz.SHOWN
					}
					show() {
						this.state !== o.xz.SHOWN && (this.state = o.xz.SHOWN, this.append(), this.loaderElement.render(), this.loaderElement.removeEvent("transitionend"), this.loaderElement.addEvent("transitionend", (t => {
							t.stop()
						})), this.loaderElement.setCss({
							display: "block",
							opacity: this.maxOpacity,
							transform: "scale(1)"
						}))
					}
					hide(t) {
						if (this.state === o.xz.HIDDEN && !t || !this.inDoc) return;
						let e = 0;
						this.state = o.xz.HIDDEN, clearTimeout(this.timer), this.timer = setTimeout((() => {
							this.loaderElement.removeEvent("transitionend"), this.loaderElement.addEvent("transitionend", (t => {
								t.stop(), e += 1, e < 2 || (this.loaderElement.removeEvent("transitionend"), this.loaderElement.setCssProp("display", "none"))
							})), this.loaderElement.setCss({
								opacity: 0,
								transform: "scale(0)"
							})
						}), t ? 0 : 400)
					}
					getProgressState() {
						return this.progressState
					}
					destroy() {
						this.hide(!0), clearTimeout(this.timer), this.currentPersent = 0, this.currentValue = 0, this.progressState = h, this.state = o.xz.HIDDEN, this.loaderElement.removeEvent("transitionend"), this.loaderElement.node.innerHTML = "", this.loaderElement = null, this.circleWrapper = null, this.textWrapper = null, this.circles = [], this.svg = null, this.text = null, this.inDoc = !1, super.destroy()
					}
				}
				const c = d
			},
			7202: (t, e, i) => {
				i.d(e, {
					A: () => r
				});
				var s = i(4345),
					o = i(511),
					n = i(7741);
				i(757).ms.addCssModule("RoundLoader", '.smv-round-loader{height:44px;line-height:100%;opacity:0;transition:opacity .3s linear;width:44px}.smv-round-loader.smv-show{opacity:.7}.smv-round-loader>div{animation:smv-round-loader 1.5s linear infinite;background-color:#000000b3;border-radius:100%;display:block;height:100%;left:0;position:relative;top:0;width:100%}.smv-round-loader>div:before{border:2px solid #fff;border-radius:50%;border-right-color:#0000;box-sizing:border-box;content:"";display:inline-block;height:77%;left:50%;position:absolute;top:50%;transform:translate(-50%,-50%);width:77%}@keyframes smv-round-loader{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}');
				const a = o.Mu + "-show";
				class h extends s.A {
					constructor(t, e) {
						super(t, e), this.type = "round", this.state = o.xz.HIDDEN, this.timer = null, this.loaderElement = n.A.$new("div"), this.addClass(), this.node.append(this.loaderElement)
					}
					addClass() {
						this.node.addClass(o.Mu + "-round-loader")
					}
					isHiding() {
						return this.state === o.xz.HIDING
					}
					show() {
						[o.xz.SHOWING, o.xz.SHOWN].includes(this.state) || (this.state = o.xz.SHOWING, this.timer = setTimeout((() => {
							this.timer = null, this.append(), this.node.removeEvent("transitionend"), this.node.addEvent("transitionend", (t => {
								t.stop(), this.state = o.xz.SHOWN
							})), this.node.render(), this.node.addClass(a)
						}), 250))
					}
					hide(t) {
						(this.state !== o.xz.HIDDEN || t) && (clearTimeout(this.timer), this.node.removeEvent("transitionend"), this.state !== o.xz.SHOWN && (t = !0), this.state = o.xz.HIDING, t ? (this.node.remove(), this.inDoc = !1, this.state = o.xz.HIDDEN) : this.node.addEvent("transitionend", (t => {
							t.stop(), this.node.remove(), this.inDoc = !1, this.state = o.xz.HIDDEN
						})), this.node.removeClass(a))
					}
					destroy() {
						this.hide(!0), this.state = o.xz.HIDDEN, this.node.innerHTML = "", super.destroy()
					}
				}
				const r = h
			},
			7950: (t, e, i) => {
				i.d(e, {
					A: () => w
				});
				var s = i(5718),
					o = i(4078),
					n = i(7741);
				const a = (t, e) => (0, s.A)(t + "?" + (0, o.A)(e)),
					h = class {
						constructor(t, e, i, s, o, n) {
							this._name = t, this._state = 0, this.imageNode = null, this._size = {
								width: 0,
								height: 0
							}, this.loader = null, this.callbacks = [], this.srcSettings = i, this.srcsetSettings = s, this.dontLoad = o, this.dppx = this.srcsetSettings ? this.srcsetSettings.dppx : 1, this.referrerPolicy = n, "" === i.profile && delete i.profile, s && "" === s.profile && delete s.profile, this._src = a(e, i), this._srcset = null, s && (this._srcset = a(e, s.settings))
						}
						get name() {
							return this._name
						}
						get node() {
							return this.imageNode
						}
						get size() {
							return this._size
						}
						get src() {
							return this._src
						}
						get srcset() {
							return this._srcset
						}
						get state() {
							return this._state
						}
						get DPPX() {
							return this.dppx
						}
						load() {
							return new Promise(((t, e) => {
								this.dontLoad || this._state ? t(this) : (this._state = 1, this.imageNode = n.A.$(new Image), this.imageNode.attr("referrerpolicy", this.referrerPolicy || "no-referrer-when-downgrade"), this.imageNode.addEvent("load", (e => {
									if (e.stop(), this._state = 2, this._size = {
											width: this.imageNode.node.naturalWidth || this.imageNode.node.width,
											height: this.imageNode.node.naturalHeight || this.imageNode.node.height
										}, "safari" === n.A.browser.uaName) {
										let t = !1;
										this.srcSettings.scale.width ? this._size.width > this.srcSettings.scale.width + 5 && (t = !0) : this._size.height > this.srcSettings.scale.height + 5 && (t = !0), t && (this._size.width /= this.dppx, this._size.height /= this.dppx)
									}
									t(this)
								})), this.imageNode.addEvent("error", (t => {
									t.stop(), this._state = 3, this.imageNode = null, e(this)
								})), this.addSrcset(), this.addSrc())
							}))
						}
						addSrc() {
							this.imageNode.node.src = this._src
						}
						addSrcset() {
							this._srcset && (this.imageNode.node.srcset = this._srcset + " " + this.dppx + "x")
						}
						get loading() {
							return 1 === this._state
						}
						destroy() {
							1 === this._state && this.imageNode && this.imageNode.attr("src", "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="), this._state = 0
						}
					},
					r = class extends h {
						constructor(t, e, i, s, o, n, a) {
							super(t, e, i, s, o, n), this._tileName = a
						}
						get tileName() {
							return this._tileName
						}
						addSrc() {
							1 === this.dppx && super.addSrc()
						}
					};
				var l = i(7985),
					d = i(7746),
					c = i(2084),
					p = i(7064),
					u = i(4255),
					m = i(3274);
				const g = (t, e) => {
						const i = Object.assign({}, t);
						let s;
						return delete i.src, delete i.srcset, i.imageSettings = Object.assign({}, (null == t ? void 0 : t.imageSettings) || {}), e > 1 && (s = JSON.parse(JSON.stringify(i)), s.width && (s.width = Math.trunc(s.width * e)), s.height && (s.height = Math.trunc(s.height * e)), s.imageSettings.crop && (s.imageSettings.crop.width && (s.imageSettings.crop.width = Math.trunc(s.imageSettings.crop.width * e)), s.imageSettings.crop.height && (s.imageSettings.crop.height = Math.trunc(s.imageSettings.crop.height * e))), s.dppx = e), i.imageSettings = Object.assign(i.imageSettings, t.src), s && t.srcset && (s.imageSettings = Object.assign(s.imageSettings, t.srcset)), {
							src: i,
							srcset: s
						}
					},
					v = t => (100 * t).toFixed(4) + "%",
					f = (t, e) => t && t.crop && t.crop[e] ? t.crop[e] : null,
					y = {};
				class S extends l.A {
					constructor(t, e) {
						super(), n.A.isString(t) || (t = n.A.$(t).attr("src")), this.o = Object.assign({
							type: "main",
							infoId: "sirv-image-" + (0, c.A)(),
							imageSettings: {},
							round: !0,
							dontLoad: !1,
							convertSmallerSideToZero: !0,
							referrerPolicy: "no-referrer-when-downgrade",
							loadNewImage: !1
						}, e), this.imageInfoPromise = null, this.images = {}, this._originUrl = (t => t.split("?")[0])(n.A.getAbsoluteURL(t)), this.infoUrl = this._originUrl + "?nometa&info", this.imageSettings = Object.assign({}, this.o.imageSettings)
					}
					static roundImageSize(t, e) {
						let i;
						return e || (e = {
							width: Number.MAX_VALUE,
							height: Number.MAX_VALUE
						}), t.width && t.height ? t.width >= t.height ? (i = (0, u.A)(t.width), i <= e.width && (t.height = Math.floor(t.height / t.width * i), t.width = i)) : (i = (0, u.A)(t.height), i <= e.height && (t.width = Math.floor(t.width / t.height * i), t.height = i)) : t.width ? (i = (0, u.A)(t.width), i <= e.width && (t.width = i)) : t.height && (i = (0, u.A)(t.height), i <= e.height && (t.height = i)), t
					}
					static getDPPX(t, e, i, s, o, a) {
						let h = 1;
						if (n.A.DPPX > 1)
							if (e > t) {
								const t = o ? S.roundImageSize({
									height: e
								}).height : e;
								h = (0, m.A)(t, s, a)
							} else {
								const e = o ? S.roundImageSize({
									width: t
								}).width : t;
								h = (0, m.A)(e, i, a)
							}
						return h
					}
					_convertImageSettings(t) {
						const e = (t, e) => {
							e.width && (t.width = e.width), e.height && (t.height = e.height)
						};
						t || (t = {}), t = Object.assign({}, t);
						let i = this.getClearSizeWithoutProcessingSettings({
							width: t.width,
							height: t.height
						});
						e(t, i);
						const s = g(t, t.dppx);
						if (t.round || !t.hasOwnProperty("round") && this.o.round) {
							const t = this.originSize;
							i = S.roundImageSize(s.src, t), e(s, i), s.srcset && (i = S.roundImageSize(s.srcset, t), e(s, i))
						}
						return s
					}
					_mixSettings(t) {
						return ((t, e, i) => {
							let s = (0, d.A)({}, e);
							return t && t.imageSettings.processingSettings && (s.crop || (s.crop = {}), s.crop = (0, d.A)(s.crop, t.cropSettings), s.canvas || (s.canvas = {}), s.canvas = (0, d.A)(s.canvas, t.canvasSettings), s.frame || (s.frame = {}), s.frame = (0, d.A)(s.frame, t.frameSettings), s.scale || (s.scale = {}), s.scale.option || (s.scale.option = "fill")), i.width && "auto" !== i.width && (s.scale.width = i.width), i.height && "auto" !== i.height && (s.scale.height = i.height), i.imageSettings && (s = (0, d.A)(s, i.imageSettings)), s
						})(y[this.o.infoId], this.imageSettings, t)
					}
					_calcProcessingSettings() {
						let t = y[this.o.infoId];
						const e = {},
							i = {},
							s = {};
						t.imageSettings.viewer || (t.imageSettings.viewer = {});
						const o = t.imageSettings.viewer,
							n = {
								width: t.imageSettings.original.width,
								height: t.imageSettings.original.height,
								widthScale: 1,
								heightScale: 1
							};
						o.scale && (o.scale.width && (n.width *= o.scale.width), o.scale.height && (n.height *= o.scale.height)), n.widthScale = n.width / t.imageSettings.width, n.heightScale = n.height / t.imageSettings.height, o.crop && (o.crop.width && 1 !== o.crop.width && (e.width = v(o.crop.width)), o.crop.height && 1 !== o.crop.height && (e.height = v(o.crop.height)), o.crop.x && (e.x = v(o.crop.x)), o.crop.y && (e.y = v(o.crop.y))), o.canvas && (o.canvas.width && (i.width = v(o.canvas.width)), o.canvas.height && (i.height = v(o.canvas.height)), o.canvas.border && (i.border = {}, o.canvas.border.width && (i.border.width = v(o.canvas.border.width)), o.canvas.border.height && (i.border.height = v(o.canvas.border.height)))), o.frame && o.frame.width && (s.width = v(o.frame.width)), t = Object.assign(t, {
							cropSettings: e,
							canvasSettings: i,
							frameSettings: s,
							originSize: n
						})
					}
					_addImage(t, e) {
						const i = e.src.dontLoad ? e.src.dontLoad : this.o.dontLoad,
							s = t => {
								const e = this._mixSettings(t);
								return e.scale && e.scale.width && e.scale.height && "ignore" !== e.scale.option && (e.scale.width >= e.scale.height ? this.o.convertSmallerSideToZero && (e.scale.height = 0) : this.o.convertSmallerSideToZero && (e.scale.width = 0)), e
							},
							o = s(e.src);
						let n = null,
							a = null;
						e.src.imageSettings && e.src.imageSettings.tile && (a = e.src.imageSettings.tile.number + ""), e.srcset && (n = {
							dppx: e.srcset.dppx,
							settings: s(e.srcset)
						});
						const l = null === a ? new h(t, this._originUrl, o, n, i, this.o.referrerPolicy) : new r(t, this._originUrl, o, n, i, this.o.referrerPolicy, a);
						return this.images[t] = {
							serverWidth: e.src.width,
							serverHeight: e.src.height,
							image: l
						}, this.images[t]
					}
					_load(t, e) {
						let i, s;
						this._addImage(t, e).image.load().then((t => {
							s = t, i = "imageOnload", this.someImageIsLoaded = s instanceof h
						})).catch((t => {
							s = t, i = "imageOnerror"
						})).finally((() => {
							this.someImageIsComplete = s instanceof h;
							const t = this.images[s.name];
							t && this.emit(i, {
								data: this._createImageData(t, e.src.callbackData)
							})
						}))
					}
					_createImageData(t, e) {
						const i = t.image;
						return {
							callbackData: e,
							name: i.name,
							tileName: i.tileName,
							tile: i instanceof r,
							node: i.node,
							serverWidth: t.serverWidth,
							serverHeight: t.serverHeight,
							width: i.size.width,
							height: i.size.height,
							src: i.src,
							srcset: i.srcset,
							state: i.state,
							dppx: i.DPPX || 1
						}
					}
					getCropPosition() {
						const t = y[this.o.infoId];
						let e = f(this.imageSettings, "x");
						e && "center" !== e && !/%$/.test(e) && (e = v(e / t.originSize.width));
						let i = f(this.imageSettings, "y");
						return i && "center" !== i && !/%$/.test(i) && (i = v(i / t.originSize.height)), {
							x: e || t.cropSettings.x,
							y: i || t.cropSettings.y,
							type: f(this.imageSettings, "type") || f(t.imageSettings.processingSettings, "type")
						}
					}
					isExist(t) {
						t = this._convertImageSettings(t);
						const e = this.generateImageName(t.src);
						let i = Object.prototype.hasOwnProperty.call(this.images, e);
						if (!i && (!t.src.imageSettings || !t.src.imageSettings.tile) && t.src.width) {
							const e = Object.entries(this.images).filter((t => t[1].image instanceof r == 0)).map((t => t[1]));
							i = this._getBiggerImage(t.src.width, e)
						}
						return !!i
					}
					isLoaded(t) {
						t = this._convertImageSettings(t);
						let e = this.images[this.generateImageName(t.src)];
						return e && (e = 2 === e.image.state), !!e
					}
					get ready() {
						return this.someImageIsLoaded
					}
					get complete() {
						return this.someImageIsComplete
					}
					get originSize() {
						let t = null,
							e = null;
						if (y[this.o.infoId] && (e = y[this.o.infoId].imageSettings), e) {
							let i, s;
							e.processingSettings ? (i = e.width, s = e.height) : (i = e.original.width, s = e.original.height), t = {
								width: i,
								height: s
							}
						}
						return t
					}
					loadInfo() {
						return this.imageInfoPromise || (this.imageInfoPromise = new Promise(((t, e) => {
							const i = n.A.getHashCode(this.infoUrl.replace(/^http(s)?:\/\//, "")),
								a = (0, s.A)(this._originUrl + "?" + (0, o.A)(this.imageSettings) + "&nometa&info=sirv_image_info_" + i + "_" + this.o.type);
							(0, p.A)(a, "image_info_" + (0, c.A)(), this.o.referrerPolicy).then((i => {
								!i.width || i._isplaceholder ? e(i) : (y[this.o.infoId] = {
									imageSettings: i
								}, this._calcProcessingSettings(), t(y[this.o.infoId]))
							})).catch(e)
						}))), this.imageInfoPromise
					}
					_getBiggerImage(t, e, i) {
						return t || (t = 0), e || (e = this.images), void 0 === i && (i = this.o.dontLoad), Object.entries(e).map((t => t[1])).sort(((t, e) => t.serverWidth - e.serverWidth)).find((e => t < e.serverWidth && (2 === e.image.state || i))) || null
					}
					sendLoad(t) {
						t = this._convertImageSettings(t);
						let e = this.images[this.generateImageName(t.src)];
						e || (e = this._getBiggerImage(t.src.width)), this.emit("imageOnload", {
							data: this._createImageData(e, t.src.callbackData)
						})
					}
					cancelLoadingImage(t) {
						t = this._convertImageSettings(t);
						const e = this.generateImageName(t.src),
							i = this.images[e];
						i && i.image.loading && (i.image.destroy(), delete this.images[e])
					}
					generateImageName(t) {
						return (t => {
							let e = (t = t.replace("?+", "?").replace("&+", "&").split("?"))[1];
							return t = t[0], e = e.split("&").sort(), "" + n.A.getHashCode(t + "?" + e.join("&"))
						})((0, s.A)(this._originUrl + "?" + (0, o.A)(this._mixSettings(t))))
					}
					getClearSizeWithoutProcessingSettings(t) {
						const e = {},
							i = y[this.o.infoId];
						return t.width && (e.width = Math.round(t.width * i.originSize.widthScale)), t.height && (e.height = Math.round(t.height * i.originSize.heightScale)), e
					}
					getImage(t) {
						const e = this._convertImageSettings(t),
							i = e.src.dontLoad ? e.src.dontLoad : this.o.dontLoad,
							s = this.generateImageName(e.src);
						let o = this.images[s];
						return o || this._load(s, Object.assign({}, e)), o && o.image.state < 2 && !i && (o = null), o || !e.src.maxSize && this.o.loadNewImage || (e.src.exactSize ? i && (o = this.images[s]) : o = this._getBiggerImage(null, null, i)), o && (o = this._createImageData(o, e.src.callbackData)), o
					}
					get originUrl() {
						let t = null;
						return this._originUrl && (t = this._originUrl), t
					}
					getProcessingSettings() {
						const t = y[this.o.infoId];
						return {
							crop: t.cropSettings,
							cropClear: t.cropSettingsClear,
							canvas: t.canvasSettings,
							canvasClear: t.canvasSettingsClear
						}
					}
					get description() {
						let t = null;
						const e = y[this.o.infoId];
						return e && (t = e.imageSettings.original.description || null), t
					}
					getThumbnail(t) {
						let e = {
							imageSettings: null,
							size: null,
							src: null,
							srcset: null
						};
						if (y[this.o.infoId]) {
							const i = g(t, n.A.DPPX);
							let a = null,
								h = this.o.convertSmallerSideToZero;
							const r = t.originUrl || this._originUrl,
								l = (e, i) => {
									let s = {
										scale: {
											option: "fill"
										}
									};
									if (e.width || e.height)
										if (e.width && e.height) s.scale.width = e.width, s.scale.height = e.height;
										else {
											const t = e.width || e.height;
											s.scale.width = t, s.scale.height = t
										}
									e.width === e.height && (t.crop ? s.crop = {
										x: "center",
										y: "center",
										width: e.width,
										height: e.height
									} : (s.scale.option = "fit", s.canvas || (s.canvas = {}), s.canvas.width = e.width, s.canvas.height = e.height)), s.scale && (t.width && t.height ? y[this.o.infoId].imageSettings.original.width >= y[this.o.infoId].imageSettings.original.height ? h && (s.scale.height = 0) : h && (s.scale.width = 0) : t.width ? h && (s.scale.height = 0) : t.height && h && (s.scale.width = 0)), i && (s = Object.assign(s, i));
									const n = s;
									return s = {}, s.imageSettings = n, s = this._mixSettings(s), s.text && delete s.text, !t.watermark && s.watermark && delete s.watermark, (0, o.A)(s)
								},
								d = t => {
									const e = {};
									return t.width && (e.width = t.width), t.height && (e.height = t.height), e
								};
							(i.src.crop || i.src.width && i.src.height) && (h = !1), e = {
								callbackData: t.callbackData,
								size: d(i.src.imageSettings),
								src: (0, s.A)(r + "?" + l(d(i.src), i.src.imageSettings))
							}, n.A.DPPX > 1 && (a = l(d(i.srcset), i.srcset.imageSettings), a && (e.srcset = (0, s.A)(r + "?" + a)))
						}
						return e
					}
					get accountInfo() {
						const t = {},
							e = y[this.o.infoId];
						return e && (t.account = e.imageSettings.account, t.branded = e.imageSettings.branded), t
					}
					destroy() {
						Object.values(this.images).forEach((t => t.image.destroy())), this.images = {}, this.someImageIsLoaded = !1, this.someImageIsComplete = !1, y[this.infoId] && (delete y[this.infoId], this.infoId = null), super.destroy()
					}
				}
				const w = S
			},
			8414: (t, e, i) => {
				i.d(e, {
					A: () => n
				});
				var s = i(7741);
				const o = t => {
						const e = t.attr("data-src");
						e && t.attr("src", e)
					},
					n = t => {
						t = s.A.$(t), o(t), Array.from(t.node.children).forEach((t => {
							(t = s.A.$(t)) && "source" === t.tagName && o(t)
						}))
					}
			},
			9157: (t, e, i) => {
				i.d(e, {
					A: () => s
				});
				const s = function(t, e, i) {
					return void 0 === e && (e = Number.NEGATIVE_INFINITY), void 0 === i && (i = Number.POSITIVE_INFINITY), Math.min(Math.max(t, e), i)
				}
			},
			5718: (t, e, i) => {
				i.d(e, {
					A: () => s
				});
				const s = t => t.replace(/&+/g, "&").replace(/&$/, "").replace(/\?&/, "?").replace(/profile=&|profile=$/g, "").replace(/image=&/g, "image&").replace(/image=$/g, "image")
			},
			1323: (t, e, i) => {
				i.d(e, {
					A: () => s
				});
				const s = (t, e, i) => {
					Object.defineProperty(t, e, {
						value: i,
						writable: !1
					})
				}
			},
			8479: (t, e, i) => {
				i.d(e, {
					A: () => o
				});
				var s = i(7741);
				const o = (t, e, i) => {
					let o, n, a, h, r, l, d = 0,
						c = !1,
						p = !1,
						u = !0;
					const m = !e && 0 !== e && s.A.browser.features.requestAnimationFrame;
					if ("function" != typeof t) throw new TypeError("Expected a function");
					e = +e || 0, s.A.isObject(i) && (c = !!i.leading, p = "maxWait" in i, a = p ? Math.max(+i.maxWait || 0, e) : a, u = "trailing" in i ? !!i.trailing : u);
					const g = e => {
							const i = o,
								s = n;
							return o = void 0, n = o, d = e, h = t.apply(s, i), h
						},
						v = (t, e) => m ? (s.A.browser.cancelAnimationFrame(r), s.A.browser.requestAnimationFrame(t)) : setTimeout(t, e),
						f = t => {
							const i = t - l;
							return void 0 === l || i >= e || i < 0 || p && t - d >= a
						},
						y = t => (r = void 0, u && o ? g(t) : (o = void 0, n = o, h)),
						S = () => {
							const t = Date.now();
							if (f(t)) return y(t);
							r = v(S, (t => {
								const i = t - d,
									s = e - (t - l);
								return p ? Math.min(s, a - i) : s
							})(t))
						},
						w = function() {
							const t = Date.now(),
								i = f(t);
							for (var s = arguments.length, a = new Array(s), u = 0; u < s; u++) a[u] = arguments[u];
							if (o = a, n = void 0, l = t, i) {
								if (void 0 === r) return (t => (d = t, r = v(S, e), c ? g(t) : h))(l);
								if (p) return r = v(S, e), g(l)
							}
							return void 0 === r && (r = v(S, e)), h
						};
					return w.cancel = () => {
						var t;
						void 0 !== r && (t = r, m ? s.A.browser.cancelAnimationFrame(t) : clearTimeout(t)), d = 0, o = void 0, l = o, n = o, r = o
					}, w.flush = () => void 0 === r ? h : y(Date.now()), w.pending = () => void 0 !== r, w
				}
			},
			7746: (t, e, i) => {
				i.d(e, {
					A: () => n
				});
				var s = i(7741);
				const o = (t, e) => (t || (t = Array.isArray(e) ? [] : {}), Array.isArray(e) ? e.forEach(((e, i) => {
						Array.isArray(e) && Array.isArray(t[i]) || s.A.isObject(e) && s.A.isObject(t[i]) ? t[i] = o(t[i], e) : s.A.isObject(e) ? t.push(o({}, e)) : Array.isArray(e) ? t.push(o([], e)) : t.push(e)
					})) : Object.entries(e).forEach((e => {
						let [i, n] = e;
						Array.isArray(n) || s.A.isObject(n) ? t[i] = o(t[i], n) : t[i] = n
					})), t),
					n = function(t) {
						for (var e = arguments.length, i = new Array(e > 1 ? e - 1 : 0), n = 1; n < e; n++) i[n - 1] = arguments[n];
						return i.length && i.forEach((e => {
							(Array.isArray(e) || s.A.isObject(e)) && (t = o(t, e))
						})), t
					}
			},
			9810: (t, e, i) => {
				i.d(e, {
					A: () => n
				});
				var s = i(7741);
				const o = (t, e) => {
						const i = (t.getCss(e) || "0").replace(/px$/, "");
						return isFinite(i) ? Math.round(parseFloat(i)) - parseFloat(t.getCss("border-top-width") || 0) - parseFloat(t.getCss("border-bottom-width") || 0) - parseFloat(t.getCss("padding-top") || 0) - parseFloat(t.getCss("padding-bottom") || 0) : 0
					},
					n = (t, e) => (t = s.A.$(t), ["width", "height"].forEach((i => {
						var s;
						0 === e[i] && (e[i] = o(t, i)), e[i] = ((s = e[i]) <= 4 && (s = 0), s)
					})), e)
			},
			2084: (t, e, i) => {
				i.d(e, {
					A: () => s
				});
				const s = () => Math.trunc(1e7 * Math.random())
			},
			4357: (t, e, i) => {
				i.d(e, {
					A: () => s
				});
				const s = (t, e) => ((t %= e) < 0 && (t += e), t)
			},
			7889: (t, e, i) => {
				i.d(e, {
					A: () => s
				});
				const s = t => {
					try {
						const e = JSON.parse(t);
						if (Array.isArray(e)) return e
					} catch {
						if (Array.isArray(window[t])) return window[t]
					}
					return []
				}
			},
			3274: (t, e, i) => {
				i.d(e, {
					A: () => o
				});
				var s = i(7741);
				const o = (t, e, i) => {
					let o = e / t;
					return o = o >= s.A.DPPX || i ? s.A.DPPX : Math.ceil(100 * o) / 100, o
				}
			},
			7064: (t, e, i) => {
				i.d(e, {
					A: () => n
				});
				var s = i(2084);
				const o = window.fetch ? (t, e) => fetch(t, {
						referrerPolicy: e || "no-referrer-when-downgrade"
					}).then((t => {
						if (200 === t.status) return t.json();
						throw {
							status: t.status,
							data: t
						}
					})) : t => new Promise(((e, i) => {
						const s = new XMLHttpRequest;
						s ? (s.onerror = t => {
							i(t || !0)
						}, s.onload = t => {
							try {
								if (200 !== s.status) throw {
									status: s.status,
									data: t
								};
								e(JSON.parse(s.responseText))
							} catch (t) {
								i(t)
							}
						}, s.open("GET", t), void 0 !== s.responseType && (s.responseType = "text"), s.send(null)) : i(!0)
					})),
					n = (t, e, i) => new Promise(((n, a) => {
						o(t, i).then(n).catch((i => {
							i && i.status && [404, 200].includes(i.status) ? a(i) : (console.log("XHR error. Switching to JSONP."), e || (e = "sirv_data_" + (0, s.A)()), ((t, e) => new Promise(((i, s) => {
								let o = !1;
								const n = document.createElement("script");
								window[e] || (window[e] = function() {
									o = !0, delete window[e], document.body.removeChild(n), i(arguments.length <= 0 ? void 0 : arguments[0])
								});
								const a = () => {
									o || (delete window[e], document.body.removeChild(n), s(t))
								};
								n.onreadystatechange = () => {
									"complete" !== (void 0).readyState && "loaded" !== (void 0).readyState || ((void 0).onreadystatechange = null, setTimeout(a, 0))
								}, n.onerror = a, n.onload = a, n.src = t + "&callback=" + e, document.body.appendChild(n)
							})))(t, e).then(n).catch(a))
						}))
					}))
			},
			1070: (t, e, i) => {
				i.d(e, {
					A: () => l
				});
				var s = i(7741),
					o = i(511),
					n = i(5776),
					a = i(6541),
					h = i(1923),
					r = i(6148);
				const l = t => {
					const e = s.A.$(t),
						i = e.attr("data-type") || e.attr("data-effect") || "",
						l = e.fetch("view-content");
					let d, c, p = null;
					if ((0, r.A)(i) || "static" === i) {
						const t = e.attr("data-src") || "";
						if ((0, r.A)(t)) {
							const t = e.attr("src") || "";
							(0, r.A)(t) || "img" !== e.tagName || (c = t, d = o.mo.IMAGE)
						} else(0, n.A)(t) && "img" !== e.tagName || l === o.mo.SPIN ? d = o.mo.SPIN : (0, h.A)(t) && "img" !== e.tagName ? d = o.mo.MODEL : (0, a.A)(t) ? d = o.mo.VIDEO : (d = o.mo.IMAGE, l && (d = l)), c = t
					} else {
						const t = o.tm.indexOf(i);
						d = t >= 0 ? t : o.mo.ZOOM;
						const n = e.attr("data-src") || "";
						if ((0, r.A)(n)) {
							const t = s.A.$(e.node.getElementsByTagName("img")[0]);
							t.attr && (c = t.attr("src") || t.attr("data-src"))
						} else c = n
					}
					return d && (p = {
						type: d,
						imgSrc: c
					}), p
				}
			},
			3694: (t, e, i) => {
				i.d(e, {
					A: () => h
				});
				const s = (t, e, i, s) => {
						const o = i[e] / i[t],
							n = {};
						return n[t] = s, n[e] = Math.trunc(o * n[t]), n
					},
					o = (t, e) => {
						let i = {
							width: t.width,
							height: t.height
						};
						return e.width && i.width > e.width && (i = s("width", "height", i, e.width)), e.height && i.height > e.height && (i = s("height", "width", i, e.height)), i
					},
					n = (t, e) => {
						let i = {
							width: t.width,
							height: t.height
						};
						return e.width && i.width < e.width && (i = s("width", "height", i, e.width)), e.height && i.height < e.height && (i = s("height", "width", i, e.height)), i
					},
					a = t => /(px|%)$/.test(t),
					h = (t, e, i) => {
						let h = {},
							r = e.width,
							l = e.height;
						const d = r / l,
							c = l / r,
							p = () => {
								h.height = t.height, h.width = Math.trunc(d * t.height)
							},
							u = () => {
								h.width = t.width, h.height = Math.trunc(c * t.width)
							};
						return (t.width > r || t.height > l) && (t.width > r ? (t.width = r, t.height && (t.height > l ? t.height = l : p())) : (t.height = l, t.width && (t.width > r ? t.width = r : u()))), (t.width || t.height) && (t.width && t.height ? t.width / t.height - d <= t.height / t.width - c ? u() : p() : t.width ? u() : p()), i && (a(i.width) && a(i.height) ? (r = parseInt(i.width, 10), /%$/.test(i.width) && (r = r / 100 * t.width), l = parseInt(i.height, 10), /%$/.test(i.height) && (l = l / 100 * t.height), h = r < e.width / e.height * l ? s("width", "height", e, r) : s("height", "width", e, l)) : (a(i.width) && (r = parseInt(i.width, 10), /%$/.test(i.width) && (r = r / 100 * t.width), h = s("width", "height", e, r)), a(i.height) && (l = parseInt(i.height, 10), /%$/.test(i.height) && (l = l / 100 * t.height), h = s("height", "width", e, l)), [i.width, i.height].includes("initial") ? (h.width = e.width, h.height = e.height) : [i.width, i.height].includes("cover") ? h = n(h, t) : [i.width, i.height].includes("contain") && (h = o(h, t)))), h
					}
			},
			1388: (t, e, i) => {
				i.d(e, {
					A: () => n
				});
				const s = "width",
					o = "height",
					n = (t, e, i) => {
						let n, a;
						return (t.width > e.width * i || t.height > e.height * i) && (t.width > e.width ? (n = s, a = o) : (n = o, a = s), t[n] = e[n], t[a] && (t[a] = e[a]), t.round = !1), t
					}
			},
			5182: (t, e, i) => {
				i.d(e, {
					A: () => n
				});
				var s = i(7741);
				const o = (t, e) => new Promise(((i, n) => {
						const a = s.A.$(t).getInnerSize();
						e || (e = 100), e -= 1, !a.width && !a.height && e > 0 ? setTimeout((() => {
							o(t, e).then(i)
						}), 16) : i(a)
					})),
					n = o
			},
			5654: (t, e, i) => {
				i.d(e, {
					A: () => a
				});
				var s = i(7741);
				const o = function(t, e, i) {
						if (void 0 === i && (i = []), Array.isArray(t) && Array.isArray(e)) {
							if (t.length !== e.length) return !1;
							for (let a = 0, h = t.length; a < h; a++) {
								let h = !0;
								if (h = s.A.isObject(t[a]) ? n(t[a], e[a], i) : Array.isArray(t[a]) ? o(t[a], e[a], i) : t[a] === e[a], !h) return h
							}
							return !0
						}
						return !1
					},
					n = function(t, e, i) {
						if (void 0 === i && (i = []), s.A.isObject(t) && s.A.isObject(e)) {
							const a = Object.keys(t).filter((t => !i.includes(t)));
							if (a.length !== Object.keys(e).filter((t => !i.includes(t))).length) return !1;
							for (let h = 0, r = a.length; h < r; h++) {
								let r = !0;
								if (r = s.A.isObject(t[a[h]]) ? n(t[a[h]], e[a[h]], i) : Array.isArray(t[a[h]]) ? o(t[a[h]], e[a[h]], i) : t[a[h]] === e[a[h]], !r) return r
							}
							return !0
						}
						return !1
					},
					a = function(t, e, i) {
						return void 0 === i && (i = []), s.A.isObject(t) ? n(t, e, i) : Array.isArray(t) ? o(t, e, i) : t === e
					}
			},
			1923: (t, e, i) => {
				i.d(e, {
					A: () => s
				});
				const s = t => t && /\.(glb|gltf)$/.test(new URL(t, document.baseURI).pathname)
			},
			2308: (t, e, i) => {
				i.d(e, {
					A: () => s
				});
				const s = t => /^([-]?[0-9]*\.?[0-9]+)%$/.test("" + t)
			},
			4464: (t, e, i) => {
				i.d(e, {
					A: () => s
				});
				const s = t => !!t && /\.svg$/i.test(new URL(t, document.baseURI).pathname)
			},
			5776: (t, e, i) => {
				i.d(e, {
					A: () => s
				});
				const s = t => !!t && /\.spin$/.test(new URL(t, document.baseURI).pathname)
			},
			6148: (t, e, i) => {
				i.d(e, {
					A: () => o
				});
				var s = i(7741);
				const o = t => s.A.isString(t) && "" === t.trim()
			},
			6541: (t, e, i) => {
				i.d(e, {
					A: () => s
				});
				const s = t => !!t && /\.(mp4|mov|qt|avi|m4v|mkv|webm|wmv|ogv|ogg|mpg|mpeg)$/i.test(new URL(t, document.baseURI).pathname)
			},
			3287: (t, e, i) => {
				i.d(e, {
					A: () => o
				});
				var s = i(7741);
				const o = t => new Promise(((e, i) => {
					if (s.A.isString(t)) t = [t];
					else if (!Array.isArray(t) && !t.src && !t.srcset) return e({
						image: t,
						size: {
							width: 0,
							height: 0
						}
					});
					let o, n;
					if (Array.isArray(t) ? (o = s.A.$new("img").setCss({
							maxWidth: "none",
							maxHeight: "none"
						}), o.attr("referrerpolicy", "no-referrer-when-downgrade")) : o = s.A.$(t), o.node.parentNode || (n = s.A.$new("div").setCss({
							top: "-10000px",
							left: "-10000px",
							width: "10px",
							height: "10px",
							position: "absolute",
							overflow: "hidden"
						}), n.append(o), s.A.$(document.body).append(n)), o.node.complete && o.node.src) n && n.remove(), e({
						image: null,
						size: o.size
					});
					else {
						const s = t => {
							o.removeEvent(["load", "error"], s), "error" === t.type ? i({
								error: t
							}) : e({
								image: t,
								size: {
									width: o.node.naturalWidth || o.node.width,
									height: o.node.naturalHeight || o.node.height
								}
							}), n && n.remove()
						};
						o.addEvent(["load", "error"], s), n && Array.isArray(t) && (o.attr("src", t[0]), t[1] && o.attr("srcset", t[1] + " 2x"))
					}
				}))
			},
			749: (t, e, i) => {
				i.d(e, {
					A: () => o
				});
				const s = {
						w: "scale.width",
						h: "scale.height",
						cw: "crop.width",
						ch: "crop.height",
						cx: "crop.x",
						cy: "crop.y",
						q: "quality",
						s: "size",
						text: "text.text",
						watermark: "watermark.image",
						"watermark.w": "watermark.scale.width",
						"watermark.h": "watermark.scale.height",
						"watermark.cw": "watermark.crop.width",
						"watermark.ch": "watermark.crop.height",
						"watermark.cx": "watermark.crop.x",
						"watermark.cy": "watermark.crop.y"
					},
					o = t => {
						const e = {};
						return t && (t.split("&").forEach((t => {
							const i = t.split("=");
							i[0] = s[i[0]] || i[0], i[0].trim().split(".").reduce(((t, e, s, o) => (/^\d$/.test(e) && (t.__toArray = !0), void 0 === t[e] && (s < o.length - 1 ? t[e] = {} : t[e] = (t => {
								let e = "";
								const i = t.split(/(%(?:D0|D1)%.{2})/);
								for (let t = 0, s = i.length; t < s; t++) {
									let s;
									try {
										s = decodeURIComponent(i[t])
									} catch (e) {
										s = i[t]
									}
									e += s
								}
								return e
							})(i[1] || "")), t[e])), e)
						})), Object.keys(e).forEach((t => {
							if ("object" == typeof e[t] && e[t].__toArray) {
								delete e[t].__toArray;
								const i = Object.keys(e[t]);
								e[t] = i.map((i => e[t][i]))
							}
						}))), e
					}
			},
			4078: (t, e, i) => {
				i.d(e, {
					A: () => a
				});
				var s = i(7741);
				const o = {
						"scale.width": "w",
						"scale.height": "h",
						"crop.width": "cw",
						"crop.height": "ch",
						"crop.x": "cx",
						"crop.y": "cy",
						quality: "q",
						size: "s",
						"text.text": "text",
						"watermark.image": "watermark",
						"watermark.scale.width": "watermark.w",
						"watermark.scale.height": "watermark.h",
						"watermark.crop.width": "watermark.cw",
						"watermark.crop.height": "watermark.ch",
						"watermark.crop.x": "watermark.cx",
						"watermark.crop.y": "watermark.cy"
					},
					n = (t, e) => {
						const i = [];
						for (const a in t) {
							if (!Object.prototype.hasOwnProperty.call(t, a)) continue;
							if ("$J" === (a + "").substring(0, 2)) continue;
							let h = t[a];
							if (s.A.isObject(h)) h = n(h, (e || "") + a + "."), i.push(h);
							else if (Array.isArray(h)) h.forEach(((t, s) => {
								h = n(t, (e || "") + a + "." + s + "."), i.push(h)
							}));
							else {
								let t = (e || "") + a;
								t = o[t] || t, i.push(t + "=" + encodeURIComponent(h))
							}
						}
						return i.join("&")
					},
					a = n
			},
			1298: (t, e, i) => {
				i.d(e, {
					A: () => s
				});
				const s = (t, e, i) => {
					e || (e = 0);
					let s = Math.pow(10, e);
					return s = i ? Math.trunc(t * s) / s : Math.round(t * s) / s, s
				}
			},
			4255: (t, e, i) => {
				i.d(e, {
					A: () => s
				});
				const s = function(t, e) {
					return void 0 === e && (e = 100), t && (t = Math.ceil(t / e) * e), t
				}
			},
			3127: (t, e, i) => {
				i.d(e, {
					A: () => o
				});
				var s = i(4078);
				const o = (t, e) => {
					try {
						const i = "https://stats.sirv.com/" + Date.now();
						if (!0 === e && navigator.sendBeacon) return void navigator.sendBeacon(i, (0, s.A)(t));
						const o = new XMLHttpRequest;
						o.open("POST", i), void 0 !== o.responseType && (o.responseType = "text"), o.send((0, s.A)(t))
					} catch (t) {}
				}
			},
			4130: (t, e, i) => {
				i.d(e, {
					A: () => s
				});
				const s = (t, e) => {
					const i = t.slice(),
						s = [];
					return e.forEach((t => {
						const e = i.findIndex((e => e.UUID === t.UUID));
						e >= 0 && s.push(i.splice(e, 1)[0])
					})), s.push(...i), s
				}
			},
			7259: (t, e, i) => {
				i.d(e, {
					A: () => o
				});
				var s = i(511);
				const o = (t, e) => {
					const i = t.slice(),
						o = [];
					if (e && e.length)
						for (let t = 0, n = Math.min(e.length, i.length); t < n; t++)
							for (let n = 0, a = i.length; n < a; n++)
								if (s.tm.indexOf(e[t]) === i[n].type && i[n].enabled) {
									o.push(i[n]), i.splice(n, 1);
									break
								}
					return o.push(...i), o
				}
			},
			6943: (t, e, i) => {
				i.d(e, {
					A: () => o
				});
				var s = i(7741);
				const o = t => {
					if (!t) return 0;
					if (s.A.isString(t)) {
						const e = parseInt(t, 10);
						return isNaN(e) ? 0 : e
					}
					return t
				}
			},
			413: (t, e, i) => {
				i.d(e, {
					A: () => P
				});
				var s = i(7741),
					o = i(8414);
				const n = "https://player.vimeo.com/api/player.js";
				let a = null,
					h = null;
				const r = {},
					l = "default.jpg",
					d = "0.jpg",
					c = 9 / 16,
					p = t => fetch(t, {
						method: "GET"
					}).then((t => {
						if (200 === t.status) return t.json();
						throw new Error("Viewer: can't get vimeo json", {
							cause: t
						})
					})).then((t => Promise.resolve(t[0]))).catch((t => {
						throw t
					})),
					u = t => (t = s.A.$(t)) && "video" === t.tagName,
					m = t => void 0 !== (t = t.replace(/(>|<)/gi, "").split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/))[2] && (t = t[2].split(/[^0-9a-z_\-]/i)).length && t[0] ? t[0] : null,
					g = t => {
						try {
							return t.match(/(?:https?:\/\/)?(?:www.)?(?:player.)?vimeo.com\/(?:[a-z]*\/)*([0-9]{6,11})[?]?.)[1]
						} catch (t) {
							return null
						}
					},
					v = t => t.attr("src") || t.attr("data-src"),
					f = t => {
						let e;
						if (s.A.isString(t)) e = t;
						else if ((t = s.A.$(t)) && "element" === s.A.typeOf(t.node))
							if (["iframe", "div"].includes(t.tagName)) e = v(t);
							else if (u(t) && (e = v(t), !e)) {
							const i = Array.from(t.node.children);
							let o;
							do {
								o = s.A.$(i.shift()), o && "element" === s.A.typeOf(o.node) && "source" === o.tagName && (e = v(t))
							} while (!e && o)
						}
						return e
					},
					y = t => {
						if (u(t)) return "video";
						if (t = f(t)) {
							if (/^(https?:)?\/\/((www\.)?youtube\.com|youtu\.be)\//.test(t)) return "youtube";
							if (/^(https?:)?\/\/((www|player)\.)?vimeo\.com\//.test(t)) return "vimeo"
						}
						return null
					},
					S = t => "https://vimeo.com/api/v2/video/" + t + ".json",
					w = t => !!u(t) || (t = f(t)) && ["youtube", "vimeo"].includes(y(t)),
					b = t => {
						if (!w(t)) return null;
						switch (t = f(t), y(t)) {
							case "youtube":
								return m(t);
							case "vimeo":
								return g(t);
							default:
								return null
						}
					},
					A = (t, e) => {
						r[t] || (r[t] = {}), r[t].aspectratio || (r[t].aspectratio = e)
					},
					x = (t, e) => {
						const i = m(t);
						if (!i) return Promise.resolve(null);
						A(t, c);
						const s = (t => "https://img.youtube.com/vi/" + t + "/")(i);
						return e ? (r[t].all = {
							thumbnail: {
								url: s + l,
								width: 120,
								height: 90
							},
							medium: {
								url: s + d,
								width: 480,
								height: 360
							}
						}, Promise.resolve(r[t].all)) : (r[t].url = s + l, Promise.resolve(r[t].url))
					},
					z = {},
					C = (t, e) => {
						const i = g(t);
						i || Promise.resolve(null);
						const s = i + "-" + !!e;
						return z[s] || (z[s] = p(S(i)).then((i => i ? (A(t, i.height / i.width), e ? (r[t].all = {
							thumbnail: {
								url: i.thumbnail_small,
								width: 100,
								height: 75
							},
							medium: {
								url: i.thumbnail_medium,
								width: 200,
								height: 150
							}
						}, r[t].all) : (r[t].url = i.thumbnail_small, r[t].url)) : null))), z[s]
					},
					I = (t, e, i) => new Promise(((n, a) => {
						let h = null;
						if (i)
							if ((i = s.A.$(i.node.cloneNode(!0))).attr && (h = i.attr("poster")), h && "" !== h.trim()) A(t, c), e ? (r[t].all = {
								thumbnail: {
									url: h,
									width: 200,
									height: 150
								},
								medium: {
									url: h,
									width: 200,
									height: 150
								}
							}, n(r[t].all)) : (r[t].url = h, n(h));
							else {
								const l = 0,
									d = s.A.$new("canvas"),
									p = d.node.getContext("2d"),
									u = () => {
										i.removeEvent(["loadedmetadata", "loadeddata", "abort", "error", "stalled"]), i.remove()
									};
								(0, o.A)(i), i.setCss({
									top: -1e5,
									left: -1e5,
									width: 200,
									height: 150,
									position: "absolute"
								}), i.muted = !0, i.addEvent("loadedmetadata", (t => {
									let e = i.size;
									e.width && e.height || (e = {
										width: 200,
										height: 150
									}), i.setCss(e), d.node.width = e.width, d.node.height = e.height, l < i.node.duration && (i.node.currentTime = l)
								})), i.addEvent("loadeddata", (t => {
									i.currentTime = l
								})), i.addEvent(["abort", "error", "stalled"], (t => {
									u(), a(null)
								})), i.addEvent("seeked", (s => {
									p.drawImage(i.node, 0, 0, d.node.width, d.node.height), u();
									try {
										h = d.node.toDataURL()
									} catch (t) {}
									return h ? (A(t, c), e ? (r[t].all = {
										thumbnail: {
											url: h,
											width: 200,
											height: 150
										},
										medium: {
											url: h,
											width: 200,
											height: 150
										}
									}, n(r[t].all)) : (r[t].url = h, n(h))) : n(h)
								})), i.appendTo(document.body), i.node.load()
							} else n(h)
					})),
					E = (t, e) => new Promise(((i, o) => {
						let n;
						if (t && s.A.$(t) && "element" === s.A.typeOf(s.A.$(t).node) && (n = t), !(t = f(t))) return i(null);
						if (r[t])
							if (e) {
								if (r[t].all) return i(r[t].all)
							} else {
								if (r[t].url) return i(r[t].url);
								if (r[t].all) return i(r[t].all.thumbnail.url)
							}
						const a = {
								youtube: x,
								vimeo: C,
								video: I
							},
							h = y(n || t);
						return h ? a[h](t, e, n).then(i).catch(o) : i(null)
					})),
					P = {
						aspectratio: c,
						getAspectRatio: t => new Promise(((e, i) => {
							var s;
							if ((t = f(t)) && null != (s = r[t]) && s.aspectratio && e(r[t].aspectratio), "vimeo" === y(t)) {
								const s = g(t);
								s ? p(S(s)).then((i => {
									A(t, i ? i.height / i.width : c), e(r[t].aspectratio)
								})).catch((t => {
									i(t)
								})) : (A(c), e(r[t].aspectratio))
							} else A(c), e(r[t].aspectratio)
						})),
						getId: b,
						isVideo: w,
						getType: y,
						getImageSrc: E,
						getSrc: f,
						getAPI: t => {
							if (!w(t)) return Promise.reject(!0);
							switch (y(t)) {
								case "video":
									return Promise.resolve();
								case "vimeo":
									return a || (a = new Promise(((t, e) => {
										if (window.Vimeo) t(window.Vimeo);
										else if ("function" == typeof window.define && window.define.amd && "function" == typeof window.require) window.require([n], (e => {
											t({
												Player: e
											})
										}), e);
										else {
											const i = s.A.$new("script");
											i.attr("src", n), s.A.$(i).addEvent("load", (() => {
												t(window.Vimeo)
											})), s.A.$(i).addEvent("error", e), i.appendTo(document.body)
										}
									}))), a;
								case "youtube":
									return h || (h = window.YT ? Promise.resolve(window.YT) : new Promise(((t, e) => {
										const i = window.onYouTubeIframeAPIReady || (() => {});
										window.onYouTubeIframeAPIReady = () => {
											i(), t(window.YT)
										}, document.querySelector('script[src$="youtube.com/iframe_api"]') || s.A.$new("script", {
											src: "https://www.youtube.com/iframe_api"
										}).appendTo(document.body)
									}))), h;
								default:
									return Promise.reject(!0)
							}
						},
						isVideoExisting: t => {
							switch (y(t)) {
								case "video":
									return Promise.resolve();
								case "vimeo":
									return E(t);
								case "youtube":
									return new Promise(((e, i) => {
										const s = b(t);
										if (!s) return i();
										const o = "https://www.youtube.com/oembed?" + new URLSearchParams({
											format: "json",
											url: "https://youtu.be/" + s
										});
										return fetch(o, {
											method: "GET"
										}).then((t => [200, 401].includes(t.status) ? e() : i())).catch(i)
									}));
								default:
									return Promise.reject()
							}
						}
					}
			},
			4105: (t, e, i) => {
				i.a(t, (async(t, e) => {
					try {
						var s = i(7741),
							o = i(2689),
							n = i(7817),
							a = i(781),
							h = t([o, n, a]);
						[o, n, a] = h.then ? (await h)() : h, window.Sirv = o.A, "loading" === document.readyState && n.A.start(!0), s.A.$(document).addEvent("domready", (() => {
							n.A.start(), (0, a.A)()
						})), e()
					} catch (t) {
						e(t)
					}
				}))
			},
			7817: (t, e, i) => {
				i.a(t, (async(t, s) => {
					try {
						i.d(e, {
							A: () => x
						});
						var o = i(7741),
							n = i(5051),
							a = i(757),
							h = i(7746);
						i(8630);
						let t = null;
						try {
							t = (await Promise.resolve().then((() => {
								if (!i.m[7982]) {
									var t = new Error("Module '7982' is not available (weak dependency)");
									throw t.code = "MODULE_NOT_FOUND", t
								}
								return i(7982)
							}))).default
						} catch (t) {}
						let r = null;
						try {
							r = (await Promise.resolve().then((() => {
								if (!i.m[6499]) {
									var t = new Error("Module '6499' is not available (weak dependency)");
									throw t.code = "MODULE_NOT_FOUND", t
								}
								return i(6499)
							}))).default
						} catch (t) {}
						const l = {},
							d = {
								image: [],
								viewer: []
							},
							c = new n.A(d),
							p = (t, e) => {
								let i = t;
								return o.A.isString(i) && (i = (e || document).querySelector(i)), o.A.$(i)
							},
							u = (t, e, i) => {
								let s = [],
									o = null;
								const n = d[e];
								return n.length && t && (o = p(t, i), o && (s = n.filter((t => t.node === o)))), s.length ? s[0] : null
							},
							m = (t, e) => {
								let i;
								return e || (e = document), i = "collection" === o.A.typeOf(t) ? t : ["element", "magicjs-element"].includes(o.A.typeOf(t)) ? [t] : Array.from((o.A.$(e).node || e).querySelectorAll(t || ".Sirv")), i
							},
							g = t => {
								let e = null;
								return (t = o.A.$(t)).hasClass("Sirv") && (e = "img" === t.tagName || t.attr("data-bg-src") || t.getCss("background-image") && "none" !== t.getCss("background-image") ? "image" : "viewer"), e
							},
							v = (t, e) => {
								let i = !1,
									s = e;
								return "image" === s && (s = "lazyImage"), t.common[s] && (!1 === t.common[s].autostart || ["false", "off"].includes(t.common[s].autostart)) && (i = !0), !i && o.A.browser.touchScreen && o.A.browser.mobile && t.mobile[s] && (!1 === t.mobile[s].autostart || ["false", "off"].includes(t.mobile[s].autostart)) && (i = !0), i
							},
							f = (e, i, s, n) => {
								let p = !1;
								"boolean" === o.A.typeOf(e) && (p = e, e = void 0), Array.from(m(e, i)).forEach((e => {
									const i = o.A.$(e);
									if (e && i.hasClass("Sirv")) {
										let o = g(i.node);
										if (s && s !== o && (o = null), l.common = (0, h.A)({}, window.SirvOptions || {}), l.mobile = (0, h.A)({}, window.SirvMobileOptions || {}), o && ["image", "viewer"].includes(o)) {
											if (!n && v(l, o)) return;
											let s = u(i.node, o);
											if (s) s.startFullInit(Object.assign({}, l), n, p);
											else switch (a.ms.appendResetCss(e), o) {
												case "image":
													t ? (s = new t(i.node, {
														options: {
															common: (0, h.A)({}, l.common.lazyImage || {}),
															mobile: (0, h.A)({}, l.mobile.lazyImage || {})
														}
													}, n), s.isRun && (d.image.push(s), s.parentClass = c)) : console.info("Sirv: Image component wasn't found.");
													break;
												case "viewer":
													if (r) {
														a.ms.addMainStyle(e), s = new r(i, Object.assign({}, l), n, p), s.isRun && (d.viewer.push(s), s.parentClass = c);
														break
													}
													console.info("Sirv: Slider component wasn't found.")
											}
										}
									}
								}))
							},
							y = (t, e, i) => {
								let s = ["image", "viewer"];
								i && (s = [i]), s.forEach((i => {
									t || e ? Array.from(m(t, e)).forEach((t => {
										const e = u(t, i);
										e && e.stop() && d[i].splice(d[i].indexOf(e), 1)
									})) : d[i] = d[i].filter((t => !t.stop()))
								}))
							},
							S = (t, e, i) => {
								const s = u(t, e, i);
								return s ? s.api : s
							},
							w = (t, e) => {
								e ? (0, a.cl)().unshift(t) : (0, a.cl)().push(t)
							},
							b = t => {
								const e = [];
								(0, a.cl)().forEach((i => {
									i !== t && e.push(i)
								})), (0, a.YL)(e)
							},
							A = () => {
								(0, a.YL)()
							};
						c.addStopInstanceCB(((t, e) => y(t, null, e))), a.ms.appendResetCss(), a.Rw.make();
						const x = {
							start: f,
							stop: y,
							getInstance: S,
							addFilterCallback: w,
							removeFilterCallback: b,
							removeAllFilterCallback: A,
							getTypeOfView: g,
							eventManager: c
						};
						s()
					} catch (t) {
						s(t)
					}
				}), 1)
			},
			7290: (t, e, i) => {
				i.d(e, {
					A: () => s
				});
				const s = {
					autoplay: {
						type: "boolean",
						default: !1
					},
					loop: {
						type: "boolean",
						default: !1
					},
					volume: {
						type: "number",
						minimum: 0,
						maximum: 100,
						default: 100
					},
					seo: {
						type: "boolean",
						default: !0
					},
					preload: {
						type: "boolean",
						default: !0
					},
					thumbnail: {
						oneOf: [{
							type: "url"
						}, {
							type: "boolean",
							enum: [!1]
						}, {
							type: "number",
							minimum: 0
						}],
						default: !1
					},
					motionFactor: {
						type: "number",
						minimum: 1,
						maximum: 4,
						default: 1
					},
					dynamicAdaptiveStreaming: {
						type: "boolean",
						default: !0
					},
					quality: {
						min: {
							type: "number",
							enum: [360, 480, 720, 1080, 1440, 2160],
							default: 360
						},
						max: {
							type: "number",
							enum: [360, 480, 720, 1080, 1440, 2160],
							default: 2160
						}
					},
					background: {
						type: "boolean",
						default: !1
					},
					controls: {
						enable: {
							type: "boolean",
							default: !0
						},
						volume: {
							type: "boolean",
							default: !0
						},
						speed: {
							type: "boolean",
							default: !1
						},
						quality: {
							type: "boolean",
							default: !1
						},
						fullscreen: {
							type: "boolean",
							default: !0
						},
						playButton: {
							type: "boolean",
							default: !0
						},
						playbar: {
							type: "boolean",
							default: !0
						}
					}
				}
			},
			757: (t, e, i) => {
				i.d(e, {
					z_: () => w,
					cl: () => y,
					Rw: () => S,
					dc: () => b,
					ms: () => g,
					YL: () => f
				});
				var s = i(511),
					o = i(7741);
				const n = () => "sirv-module-" + Math.floor(Math.random() * Date.now());
				class a {
					constructor(t) {
						this.root = t, this.appended = !1
					}
					append() {
						this.appended = !0
					}
				}
				class h extends a {
					constructor(t, e, i, s) {
						super(t), this.styleSheet = e, this.id = i || n(), this.addAfterId = s, this.sheet = null
					}
					createSheet() {
						this.sheet = this.root.querySelector("#" + this.id), this.sheet || (this.sheet = o.A.$new("style", {
							type: "text/css"
						}), this.sheet.attr("id", this.id)), this.sheet.node.innerHTML = this.sheet.node.innerHTML + this.styleSheet
					}
					append() {
						if (this.appended) return;
						super.append(), this.createSheet();
						const t = this.root === document ? document.head : this.root;
						let e = t.firstChild;
						if (this.addAfterId) {
							const t = this.root.querySelector("#" + this.addAfterId);
							t && t.nextSibling && (e = t.nextSibling)
						}
						t.insertBefore(this.sheet.node, e)
					}
				}
				class r extends a {
					constructor(t, e, i) {
						super(t), this.rules = e, this.id = i || n()
					}
					append() {
						this.appended || (super.append(), this.rules.forEach((t => o.A.addCSS(t[0], t[1], this.id, this.root))))
					}
				}
				const l = (t, e, i, s) => new Promise(((n, a) => {
						const h = i || document;
						let r, l = !1;
						try {
							r = o.A.getAbsoluteURL(t)
						} catch (t) {}
						if (r && (l = Array.from(h.querySelectorAll("link[rel=stylesheet]")).some((t => {
								try {
									return o.A.getAbsoluteURL(o.A.$(t).attr("href") || "") === r
								} catch (t) {
									return !1
								}
							}))), l) n();
						else {
							const h = o.A.$new("link");
							void 0 !== e && (h.node.id = e), h.node.rel = "stylesheet", h.node.type = "text/css", h.node.onload = () => {
								n()
							}, h.node.onerror = t => {
								a(t)
							}, h.node.href = t;
							let r = document.head || document.getElementsByTagName("head")[0] || document.body || document.documentElement;
							i && (r = i);
							let l = r.firstChild;
							const d = r.querySelector(s);
							d && d.nextSibling && (l = d.nextSibling), r.insertBefore(h.node, l)
						}
					})),
					d = {
						width: 90,
						height: 18,
						src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAAkCAYAAAAgqxBxAAAMJ0lEQVR4nO1ce5AUxRnv4yH4wCfREogIqFHOI94uVoSNMnFvZ6e/30+TGB/BRFPRUomWRiMKd2tUTKEWKlGSCBKCxtJSSKkxKLhnKqaiJvgOYjSAAhdQ8EDkIYgm8fLH9hzNZGZn9+68o8r5VU3V7fbXX389+5vu79FzSiVIkCBBggQJegiu6w4DMIlkkeRKklsBbCG5EsAzJKeJyCnldDiOs5/neaO6y+YECUJBciaAz0i2xV0AFmut+wV1iMhoAK1GZqnjOAN7Yi4JvsDQWu9PckkIaTcBWAbgHZI7Am1vKqV6BXUBWBzQ87MemFKCLzJIvhIg671a63Gu6+7ryziOMxBAA4DpADYDuDRC14qArl9130wSfOEhIpcFCPjduD75fP5gx3H2C2sDcJal62MAx3W91QkShKMGwDqL0DO7QimAsQAubGhoOKIr9CVIUBHy+XxtYHUe3tM2JUjQYWitT7PI/EFP25MgQadA8kxrhd7mOE6fnrYpk8kMEJHRnud9padtSRADkm0NDQ0HRLU3NDQcAWBzd9njed7XbZdDa31SZ3WKSB2AR80133GcA+1213W/bLXf5H+fzWYPATAHwAdmx1jjt+Xz+YMBPALgIZIPxxV2gkhNLp6TamqeV18oPlxfKM7p7BwTGOxphM5kMgNI/tdyO57urE7bjTHXYLsdwHFW2/umz5BAcNoGYIvfx3GcPradJP9cjU2pQnFdqtDclio0t9UXis93do4JDPY0QiulFIB7AkS6Kb5XNLTWp1r6Pslms4fZ7SQHW+RcaL5bGXgI/gNgmVKqxu8nIj+xZTKZzIBK7Plq45PH+GROFZrbUpOL6c7ML4GFPZHQjuMcCODfAUI9lsvlBnVEXxyhXdc9lOQnfgGHZKP1MP0GwNhcLjcon88frqxKZD6fPzzgHp1TiT31heYpu1bn5tWVTqKfiAw1N6EmTh7AQQCGl/txuwqmwjU87NxBEFrrfp7nHWl+hOA8anK53CARGVpB8FRDcrCIDLXHrZbQ/n0123bsfe0oAJwccl5jB8lpWush1eiKI3Q2mz3EKqOvB7DTkPkHFdj5nKV7QSX2pJqKS9tX56ZiIcrokQCeBnAQybnGsKUAVgFYJyITwvp5npcl+aI5vLKE5EZzyCVjGV0AMCOsP8lbSD4c0fZrABf6n0UkZ8ZoIfmqGWt2Op3ex+4H4HXHcfqIyDUkN5JcYUq7x1kyFwNYTfKfJJcAaAXQpEJIJiJXkHwXwCqSb5B8n+TMdDq9D4CdlRDacZz9ANxN8n1zX1cDeE9ErvLHBPAQgO9H6TIrWktwvlEwxZDWEGJ/AuC+Sit+cYQ2nNkecHNmVaKb5EVWn521tbV7lZOvb1w40nY3aictCC/0iEgdyQ0A/iIil6TT6b5W2wkkV4jINYE+3zE/rqhdROhtSqUbtNauUu2Rd0vIsDWGVOtDyq41ANb5qR6t9bcArNFaj/MFMpnMAADzADxlja9ItgC4EsDvABwUHBTATwG8TPJo/zsTxLwAYGpAdgrJN0Skzv/OcZz+ACaSXEByaxyhzcOwSEQm2DuByR68TvIW8/lsAM9E6SJ5LYD7otrDYDINs0JI7V932b91GCohNICPLJntjuP0r9S+atyOVFOx0O5uNBWfixQ0hG4jeWNYu+d5o0hu9yeTTqf3IblRa31qmDzJMwGsMU9cbwCbXdc91pbRWmdIPgtgnoicbbcBON5/CMzq1gpgbHAcQ67V/sNjxm4B8HrY0661HklyY/BHMfdgKMkdxtdTnucdSXK71npE2ByNvxjrcvjEidAxnOQO13WH1dbW7kVyg+u6wyJk3wRwctRY5SAiJwCYjdI56OAJvGX5fL42qm+1hAYwrxrbAPze6ju/nGyqqfiWRegLyk24zvw4kbV6AM8DuMDIjwfwUoyhy0WE5u/5InJFYMw7jVtwUdDtMCvsHCN3HoDIpxHA7SR/6X82hL48Yp53AvhFGV3NvptjVuHHomSNu1URoT3PO7HMmE8AmGj+niEiNwRltNYnAViuOul3mxXxRpJbg25I1IPbAUJfXY1NZqdvLwZFxUappkWjdvnOzZ8edfnC6BjKbH8flRsYwAwA083f0wH8PEZ+Ns3ZWQAXAHjCau4FYC3Jo3O53CAAmwPB1gKYU2IA7gFwa9Q4JC8ybof/uSWqoADghXLbGoC7ReRm8/dDACZFyWaz2cMqJXS5ABbAFN+V0FrXk1ypAsQFMEtEJkfpqBau6x4K4NHASr1GKdU7KNsBQp9RjS2O4/Qnuc3vLyLfDJOzsxuppubyu4Ah9JoYmetI3q+UUiQfjLvBAG4CMFsppXK53CD76UMpCn/Fkn1Oa32aUkql0+m+JpAaaNoeB/ABgHfCLuPHP+vrItli+7wBm9YanzZK14cA7jZ6/ogykbopDlSS5fi43H0yxz3bI3yWAl7H/zxmzJi9WQpuB4cq6AQAzAmQ+sqgTLWE1lrrDtjxgEXo34bJpArFt31CnzB5kVNWoSF0a8yg15Oc6xuAUlagnPxUWIfBAfwdwDfM3zNINlrjX+Xr1lpnALxs9XtcRK4xNy70spPyMYReo7V2y+nyswgA/kTy/Kj5pdPpvhUSeme5+0Tyx7ZrA+ByAPda92Z8YHfrUgBYbhH67WB7tYT23cxqICJeIKjcLY1a11g81vKdy/LUV1gH4NNy+VgAs/3tWERu9lffKARXcZZSdD9TpZzuu7SyDCYgW6+U6iUik20XA6Uo/ZbYSewapxyhXwBwViV6AMwjeW1Uu18YqMTlKJdqA3Cbvyso1e7nbrQerCeq3carQcgLAbsdOe0OQiulFMkPfR2e52XttlSheJuVe55WyaTqSLbl8/lUmQFXWEFeA4BVKuQdNKXat+P1dj5aRE4h+azWuh7AayH6X/Q870SSf7AnJCLjSb4aO4ldeiIJTXKaH2zGwQSskUEhAFThQ4+LkgHwkoicF/huvoic6zjOQJLvxuVnOwOTlrVTZ67d3l2ENjFXqNtR3/TUivYVunHhyEomVYfS28FzI9rPBbDayln2YqkgEfoeGoBJxm1oD27MFr3e+OKNwT4s5VmvN25BexA1ZsyYvY3v+73YiajyhNZajzC+fH2cHq31EJJbtdahNxDAkwA+q4TQiEhHkRSSG4N5eK21NoHxpSTviLO1MzDpSTvjIQFbuoXQIvI1a5wdjqPavYX6QnGOIXRlC5sh9FIAj5C8S0SOUUrVmGN+l7JUKBkX7GMIeoPrusPS6XTffD5/FIBbAaxFSCUKpWLHWtvd8GH6rgWwKNhm/OpWAFO01iMcx+njOE5/z/NGAZgoIqN92XKENnb/EECriEwwgVZNJpMZYFJjU13XPdSSnQBgDYAzDOl6marqAyYF+I8KfOjnSc4FMMcUino1NDQcgFLmp9UPhgPobYLUJQCOj9LfFRCR0Tahg7t0dxHa6HrP13O6m835348qPHNSqtDclmpsjnQBg5OqA7DKlIyvMpH2BgDvoVT4iFrxhgCYhVIpd5MJMO7yixNBkPw2ylS7ANwXtRKb1W4mgOVmrLUk/yoi12mtv2SN8WBUccIaJ43SWdwWAJtYKqcXReSyYIoNQN6sxuvMQ7UYpkRtHoB9w0cppcdMhbWGpfTiYuu+PgIg8qQYgNsBLC43j64AgIJF2K3BymE3E/rWMLfjsInFfeubiu+OaipW9nCb1TasPJ2ghwDgSRG55PMcw8Q6G6yA8N6gTHcS2vbnAWyy21JNi0aps+b/X548SlFC6D0IxlXZorXev5p+psQ93XabomCyKX8LuBtHBeW6k9BG37JdAaoberQiFgmh9yyQvCMuLRoGa8veZty38wEcr7XeX2vdz8REYwFMZalYY6frQkvW3U1olkrzJZt4etX3QCmVEHpPgO+7m8LP5rDAOQ4mHgg7VbeVpYrq9rB2BE4ZBuw61ZL7NO74aGcJ7bruMGu8dR1SkhC654HSwagtJP8F4PSO6NBanwbg6QhSh12vRGRZdtMZ6LNbCd7kytssQo/viO02ALy5y+1gWfui0Ls73jZJEIvKgp4YaK1HAPgRyftReivkDZJvAXgNwFMicnOlb1obf34igKsBXBmsejqO019ErjAyE9EF/9wGwMVmV9nGzzkPnyBBggQJugP/A94x91x//ZrKAAAAAElFTkSuQmCC"
					},
					c = "sirv-stylesheet-sirv";
				class p {
					constructor(t, e) {
						this.root = t, this.styleSheetModules = e, this.crId = "sirvCR" + Math.floor(Math.random() * Date.now()), this.stylePomises = new Map, this.javaScriptPomises = new Map, this.sheets = new Map, this.brandSheet = null
					}
					addJavaScript(t) {
						return this.javaScriptPomises.has(t) || this.javaScriptPomises.set(t, new Promise(((e, i) => {
							const s = o.A.$new("script");
							s.attr("type", "text/javascript"), s.node.onload = e, s.node.onerror = i, s.attr("src", t), s.appendTo(this.root.head || this.root.body || this.root)
						}))), this.javaScriptPomises.get(t)
					}
					appendMainCSS() {
						return this.addStyle(s.bH + "viewer.css", c, "#" + s.q4)
					}
					addStyle(t, e, i) {
						return this.stylePomises.has(t) || this.stylePomises.set(t, new Promise(((s, o) => l(t, e, this.root.head || this.root.body || this.root, i).then(s).catch(o)))), this.stylePomises.get(t)
					}
					createBrandSheet() {
						var t;
						this.brandSheet || (this.brandSheet = new r(this.root, [
							["#" + (t = this.crId), "\n                display: inline-block !important;\n                position: absolute !important;\n                top: auto !important;\n                right: 0 !important;\n                bottom: 0 !important;\n                left: auto !important;\n                width: auto !important;\n                height: auto !important;\n                max-width: none !important;\n                max-height: none !important;\n                margin: auto !important;\n                padding: 8px !important;\n                z-index: 2147483647 !important;\n                visibility: visible !important;\n                opacity: 1 !important;\n                transform: none !important;\n                font-size: 0 !important;\n                line-height: 1 !important;\n                background-color: #ffffffbf;\n                backdrop-filter: blur(10px);\n                -webkit-backdrop-filter: blur(10px);\n            "],
							["#" + t + " > img", "\n                display: inline-block !important;\n                position: static !important;\n                width: 90px !important;\n                height: auto !important;\n                max-width: 100% !important;\n                max-height: none !important;\n                margin: 0 !important;\n                padding: 0 !important;\n                visibility: visible !important;\n                opacity: 1 !important;\n                transform: none !important;\n            "],
							["@media screen and (min-width: 481px)", "\n                #" + t + " > img {\n                    width: 135px !important;\n                }\n            "]
						], s.q4))
					}
					showSirvAd(t, e, i) {
						/^my.sirv.(com|localhost)$/i.test(document.location.hostname) || (this.createBrandSheet(), this.brandSheet.append(), ((t, e, i, s) => {
							const n = o.A.$new("a", {
								id: t,
								href: i,
								target: "_blank"
							});
							n.attr("style", "position: absolute !important; opacity: 1 !important"), n.setCss({
								display: "inline-block",
								overflow: "hidden",
								visibility: "visible",
								fontSize: 0,
								fontWeight: "normal",
								fontFamily: "sans-serif",
								bottom: 0,
								right: 0,
								margin: "auto",
								width: "auto",
								height: "auto",
								transform: "none",
								zIndex: 2147483647
							}).appendTo(e).addEvent(["tap", "btnclick"], (t => {
								t.stopDistribution(), window.open(n.attr("href"))
							})).append(o.A.$new("img", d).setProps({
								alt: s
							}))
						})(this.crId, t, e, i))
					}
					createSheet(t) {
						let e = null,
							i = c;
						return "reset" === t && (i = null, e = s.q4), new h(this.root, this.styleSheetModules.get(t), e, i)
					}
					appendStyleSheet(t) {
						if (this.styleSheetModules.has(t) && !this.sheets.has(t)) {
							const e = this.createSheet(t);
							this.sheets.set(t, e), e.append()
						}
					}
					append() {
						const t = this.styleSheetModules.keys();
						let e = {
							done: !1
						};
						do {
							e = t.next(), e.value && this.appendStyleSheet(e.value)
						} while (!e.done)
					}
				}
				const u = t => {
						let e = t.replace(/^(https?:)?/, "https:");
						return /^(http(s)?:)?\/\/[^/]+?sirv\.localhost(:\d+)?\/.*$/i.test(t) && (e = t.replace(/^(https?:)?/, "http:")), e
					},
					m = t => t.replace(/^((?:https?:)?\/\/)([^/].*)/, (function(t, e, i) {
						return e + i.split("/").map((function(t, e) {
							return 0 === e ? t : (t => {
								try {
									t = decodeURIComponent(t)
								} catch (t) {}
								return encodeURIComponent(t)
							})(t)
						})).join("/")
					})),
					g = new class {
						constructor() {
							this.roots = new WeakMap, this.rootsArr = [], this.styleSheets = new Map, this.sirvCSSSrc = "viewer.css", this.addCssModule("reset", ".smv{display:flex!important}.smv.smv-grid-gallery{height:auto}.smv.smv-selectors-top{flex-direction:column-reverse}.smv.smv-selectors-left{flex-direction:row-reverse}.smv.smv-selectors-right{flex-direction:row}.smv.smv-selectors-bottom{flex-direction:column}.smv-slides-box{flex-grow:1;flex-shrink:1}figure>.Sirv{vertical-align:top}.Sirv>iframe,.Sirv>video,:not(.smv) smv-thumbnail{display:none}.Sirv,.Sirv .smv-component{box-sizing:border-box!important}div.Sirv,div.Sirv div.smv-component,div.smv-component,figure.Sirv{height:100%;margin:0;text-align:center;width:100%}div.Sirv{block-size:inherit;max-height:100%}.Sirv img{height:100%;width:100%}.Sirv img,img.Sirv{max-width:100%}img.Sirv:not([width]):not([height]){width:100%}img.Sirv{display:inline-block;font-size:0;line-height:0}.Sirv.smv-bg-image.smv-bg-contain,.Sirv.smv-bg-image.smv-bg-cover{background-position:50%;background-repeat:no-repeat}.Sirv.smv-bg-image.smv-bg-contain{background-size:contain}.Sirv.smv-bg-image.smv-bg-cover{background-size:cover}img.Sirv.sirv-image-loading:not([src]),img.Sirv:not([src]){opacity:0}img.Sirv.sirv-image-loaded{opacity:1;transition:opacity .5s linear}.smv-grid-gallery .smv-slides-box{overflow:auto}.smv-grid-gallery .smv-slides-box .smv-slides{display:grid!important;gap:calc(1px*var(--smv-grid-gap));grid-template-columns:repeat(var(--smv-grid-columns),calc((100% - 1px*var(--smv-grid-gap)*(var(--smv-grid-columns) - 1))/var(--smv-grid-columns)));overflow:visible!important;position:relative!important}.smv-grid-gallery .smv-slides-box .smv-slides .smv-slide{aspect-ratio:var(--smv-aspect-ratio);overflow:hidden;position:relative!important}@supports not (aspect-ratio:1){.smv-grid-gallery .smv-slides-box .smv-slides .smv-slide{padding-top:calc(100%/var(--smv-aspect-ratio))}.smv-grid-gallery .smv-slides-box .smv-slides .smv-slide .smv-content{inset:0;position:absolute}}.smv-grid-gallery .smv-slides-box .smv-slides .smv-slide .smv-button.smv-button-fullscreen:not(:focus){opacity:0}@media (any-hover:hover){.smv-grid-gallery .smv-slides-box .smv-slides .smv-slide:hover .smv-button.smv-button-fullscreen{opacity:1}}.smv-grid-gallery .smv-slides-box .smv-slides .smv-slide.smv-hidden{display:none}")
						}
						rootContains(t) {
							return this.rootsArr.some((e => e.contains(t)))
						}
						addCssModule(t, e) {
							this.styleSheets.set(t, e)
						}
						getRootDom(t) {
							const e = (t => {
								for (t = o.A.$(t).node;
									"document" !== o.A.typeOf(t) && !(t instanceof window.ShadowRoot) && t;) t = t.parentNode;
								return t
							})(t) || document;
							if (this.roots.has(e)) return this.roots.get(e);
							const i = new p(e, this.styleSheets);
							return this.roots.set(e, i), this.rootsArr.push(e), i
						}
						appendResetCss(t) {
							this.getRootDom(t || document).appendStyleSheet("reset")
						}
						appendCss(t) {
							this.getRootDom(t).append()
						}
						showSirvAd(t, e, i, s) {
							this.getRootDom(t).showSirvAd(e, i, s)
						}
						appendMainCSS(t) {
							return this.getRootDom(t).appendMainCSS()
						}
						addMainStyle(t) {
							return this.appendMainCSS(t)
						}
						addStyle(t, e, i, s) {
							return this.getRootDom(t).addStyle(e, i, s)
						}
						addJavaScript(t, e) {
							return this.getRootDom(t).addJavaScript(e)
						}
					};
				let v = [];
				const f = function(t) {
						void 0 === t && (t = []), v = t
					},
					y = () => v,
					S = {
						nodes: [],
						elements: [
							[{
								classes: [s.Mu + "-arrow-control"]
							}, {
								classes: [s.Mu + "-arrow"]
							}, {
								classes: [s.Mu + "-icon"]
							}],
							[{
								classes: [s.Mu + "-button-fullscreen-open"]
							}, {
								classes: [s.Mu + "-icon"]
							}],
							[{
								classes: [s.Mu + "-button-fullscreen-close"]
							}, {
								classes: [s.Mu + "-icon"]
							}],
							[{
								classes: [s.Mu + "-thumbnails"]
							}, {
								classes: [s.Mu + "-selector"],
								attrs: [{
									name: "data-type",
									value: "spin"
								}]
							}]
						],
						waitBody: () => new Promise(((t, e) => {
							const i = document.body;
							i ? t(i) : setTimeout((function() {
								S.waitBody().then(t)
							}), 16)
						})),
						make: () => {
							S.elements.forEach((t => {
								const e = [];
								t.reverse().forEach((t => {
									const i = o.A.$new("div");
									t.classes && t.classes.forEach((t => {
										i.addClass(t)
									})), t.attrs && t.attrs.forEach((t => {
										i.attr(t.name, t.value)
									})), e.push(i)
								}));
								for (let t = 1, i = e.length; t < i; t++) e[t].append(e[t - 1]);
								S.nodes.push(e[e.length - 1])
							})), S.nodes.forEach((t => {
								t.setCss({
									top: "-10000px",
									left: "-10000px",
									width: "10px",
									height: "10px",
									position: "absolute",
									visibility: "hodden",
									opacity: 0
								}), S.waitBody().finally((() => {
									o.A.$(document.body).append(t)
								}))
							}))
						},
						remove: () => {
							S.nodes.length && (S.nodes.forEach((t => {
								t.remove()
							})), S.nodes = [])
						}
					},
					w = t => (/^(http(s)?:)?\/\//.test(t) || (t = s.Tl + t), u(t).replace(/([^:])\/+/g, "$1/")),
					b = t => m(u(t))
			},
			511: (t, e, i) => {
				i.d(e, {
					Cu: () => c,
					G_: () => f,
					Mu: () => o,
					Tl: () => h,
					X2: () => p,
					XO: () => g,
					Zn: () => m,
					a0: () => y,
					bH: () => a,
					eO: () => v,
					jq: () => r,
					mo: () => w,
					pS: () => u,
					q4: () => d,
					tm: () => b,
					xz: () => S
				});
				var s = i(7741);
				const o = "smv";
				let n = "https:",
					a = "",
					h = "",
					r = "https://video.sirv.com";
				const l = document.getElementsByTagName("script");
				for (let t = 0, e = l.length; t < e; t++) {
					const e = l[t].getAttribute("src") || "";
					if (!/sirv\.js/i.test(e) && !/sirv\.full\.js/i.test(e)) continue;
					const i = void 0 !== l[t].dataset.sirvjsTest,
						o = l[t].dataset.videoHost;
					if (o && "" !== o.trim() && (r = o), i) a = s.A.getAbsoluteURL(e).replace(/([^#?]+)\/.*$/, "$1/");
					else if (/sirv\.(com|localhost(:\d+)?)\/(([^#?]+)\/)?sirv\.js([?#].*)?$/i.test(e) || /sirv\.(com|localhost(:\d+)?)\/(([^#?]+)\/)?sirv\.full\.js([?#].*)?$/i.test(e)) {
						h = s.A.getAbsoluteURL(e).replace(/(^https?:\/\/[^/]*)., "$1/"), a = s.A.getAbsoluteURL(e).replace(/([^#?]+)\/.*$/, "$1/"), (/sirv\.localhost(:\d+)?\/(([^#?]+)\/)?sirv\.js([?#].*)?$/i.test(e) || /sirv\.localhost(:\d+)?\/(([^#?]+)\/)?sirv\.full\.js([?#].*)?$/i.test(e)) && (n = "http:");
						break
					}
				}
				const d = "sirv-core-css-reset",
					c = /([^\?]+)\??([^\?]+)?/,
					p = [],
					u = o + "-cursor-fullscreen-always",
					m = 1.2,
					g = o + "-cursor-zoom-in",
					v = {
						NONE: 0,
						AUTOPLAY: 1,
						USER: 2,
						INIT: 3,
						ENABLE: 4
					},
					f = {
						NONE: 0,
						PLAY: 1,
						PAUSE: 2,
						PLAYING: 3
					},
					y = {
						CLOSED: 0,
						OPENING: 1,
						OPENED: 2,
						CLOSING: 3
					},
					S = {
						HIDDEN: 0,
						SHOWING: 1,
						SHOWN: 2,
						HIDING: 3
					},
					w = {
						NONE: 0,
						HTML: 1,
						IMAGE: 2,
						PANZOOM: 3,
						ZOOM: 4,
						SPIN: 5,
						VIDEO: 6,
						MODEL: 7
					},
					b = ["none", "html", "image", "panzoom", "zoom", "spin", "video", "model"]
			},
			935: (t, e, i) => {
				i.d(e, {
					Ay: () => m
				});
				var s = i(7746),
					o = i(7064),
					n = i(5776),
					a = i(6541),
					h = i(1923),
					r = i(7741),
					l = i(511),
					d = i(757);
				const c = /([^#?]+)\/?([^#?]+\.view)(\?([^#]*))?(#(.*))?$/,
					p = function(t, e, i) {
						let s;
						void 0 === e && (e = ""), void 0 === i && (i = "");
						let o = "div";
						const n = [],
							a = l.tm.indexOf(t.type);
						return /^(https?:)?\/\/[^/]/.test(t.name) ? (s = t.name, a === l.mo.IMAGE && (o = "img", n.push(["data-type", "static"]))) : "link" === t.type ? (s = t.url, a === l.mo.IMAGE && (o = "img", n.push(["data-type", "static"]))) : s = /^\//.test(t.name) ? (0, d.dc)(e + t.name) : (0, d.dc)(e + i + "/" + t.name), t.title && n.push(["title", t.title]), (a === l.mo.IMAGE && "img" !== o || a === l.mo.ZOOM) && n.push(["data-type", "zoom"]), {
							path: s,
							type: a,
							tag: o,
							attrs: n
						}
					};
				class u {
					constructor(t, e, i) {
						this.url = t, this.referrerPolicy = e, this.isZoom = i, this.isView = c.test(this.url), this.configURL = (0, d.dc)(this.url.replace(l.Cu, "$1")), this.urlParams = this.url.replace(l.Cu, "$2"), this.urlParams && (this.configURL += "?" + this.urlParams);
						const s = r.A.getHashCode(this.configURL.replace(/^http(s)?:\/\//, ""));
						this.cfCallbackName = "view-1_" + s, this.dataJSON = null
					}
					getOptions() {
						return new Promise(((t, e) => {
							return this.isView ? (0, o.A)((i = this.configURL, n = this.cfCallbackName, i + (/\?/.test(i) ? "&" : "?") + "nometa&info=" + n), this.cfCallbackName, this.referrerPolicy).then((e => {
								let i = {};
								return e && e.assets && (this.dataJSON = e, i = (0, s.A)({}, this.dataJSON.settings || {})), t(i)
							})).catch(e) : t({});
							var i, n
						}))
					}
					getComponentsDataList() {
						const t = [];
						if (this.dataJSON) {
							const e = /(^https?:\/\/[^/]*)([^#?]*)\/.*$/.exec(this.configURL),
								i = e[1],
								s = this.dataJSON.dirname || e[2];
							this.dataJSON.assets.forEach((e => {
								t.push(p(e, i, s))
							}))
						} else {
							const e = this.configURL,
								i = e.split("?")[0];
							let s;
							s = (0, n.A)(i) ? "spin" : (0, a.A)(i) ? "video" : (0, h.A)(i) ? "model" : this.isZoom ? "zoom" : "img", t.push(p({
								name: e,
								type: s
							}))
						}
						return t
					}
					getNodes() {
						return this.getComponentsDataList().map((t => {
							const e = r.A.$new(t.tag);
							t.attrs.forEach((t => e.attr(t[0], t[1])));
							let i = t.path;
							return this.urlParams && this.isView && (i += "?" + this.urlParams), e.attr("data-src", i), e
						}))
					}
					destroy() {
						this.dataJSON = null
					}
				}
				const m = class {
					constructor(t, e) {
						this.mainNode = r.A.$(e), this.sirvOptions = (0, s.A)({}, t || {}), this.sources = [], this.referrerPolicy = this.mainNode.attr("data-referrerpolicy") || this.mainNode.attr("referrerpolicy") || "no-referrer-when-downgrade"
					}
					getOptions() {
						return this.parseDataSrc(), this.sources.length ? new Promise(((t, e) => Promise.all(this.sources.map((t => t.getOptions()))).then((e => {
							e.forEach((t => {
								this.sirvOptions.common = (0, s.A)(this.sirvOptions.common, t.dataOptions || {}), this.sirvOptions.mobile = (0, s.A)(this.sirvOptions.mobile, t.dataOptions || {})
							})), t(this.sirvOptions)
						})).catch(e))) : Promise.resolve(this.sirvOptions)
					}
					buildViewer() {
						return this.sources.length && (this.mainNode.node.innerHTML = "", this.sources.map((t => t.getNodes())).flat().forEach((t => {
							this.mainNode.node.appendChild(t.node)
						}))), this.mainNode
					}
					parseDataSrc() {
						if (this.mainNode) {
							const t = this.mainNode.attr("data-src");
							if (t) {
								const e = [this.mainNode.attr("data-type"), this.mainNode.attr("data-effect")].includes("zoom");
								t.split(",").map((t => t.trim())).forEach((t => {
									t && this.sources.push(new u(t, this.referrerPolicy, e))
								}))
							}
						}
					}
					destroy() {
						this.mainNode = null, this.sirvOptions = null, this.sources.forEach((t => t.destroy())), this.sources = []
					}
				}
			},
			781: (t, e, i) => {
				i.a(t, (async(t, s) => {
					try {
						i.d(e, {
							A: () => u
						});
						var o = i(7741),
							n = i(8479),
							a = i(757),
							h = i(7817),
							r = t([h]);
						h = (r.then ? (await r)() : r)[0];
						const l = {
								added: [],
								removed: []
							},
							d = t => !!t.closest && !t.closest("div.Sirv"),
							c = (0, n.A)((() => {
								const t = l.added.splice(0),
									e = l.removed.splice(0);
								t.forEach((t => {
									(t = o.A.$(t)).node && 3 !== t.node.nodeType && 8 !== t.node.nodeType && t.node.getElementsByClassName && (t.hasClass("Sirv") ? h.A.start(t, null, h.A.getTypeOfView(t)) : a.ms.rootContains(t.node) && d(t.node) && h.A.start(null, t))
								}));
								const i = [];
								e.forEach((t => {
									(t = o.A.$(t)).node && 3 !== t.node.nodeType && 8 !== t.node.nodeType && t.node.getElementsByClassName && (t.hasClass("Sirv") ? i.push(t) : [].push.apply(i, t.node.getElementsByClassName("Sirv"))), i.forEach((t => {
										if (t = o.A.$(t), !document.body.contains(t.node)) try {
											h.A.stop(t, null, h.A.getTypeOfView(t))
										} catch (t) {}
									}))
								}))
							}), 250),
							p = (t, e) => {
								for (let e = 0, i = t.length; e < i; e++) "childList" === t[e].type && ([].push.apply(l.added, t[e].addedNodes), [].push.apply(l.removed, t[e].removedNodes));
								c()
							},
							u = () => {
								window.MutationObserver && new MutationObserver(p).observe(document.body, {
									childList: !0,
									subtree: !0,
									attributes: !1
								})
							};
						s()
					} catch (t) {
						s(t)
					}
				}))
			},
			7982: (t, e, i) => {
				i.r(e), i.d(e, {
					default: () => z
				});
				var s = i(7741);
				const o = class {
						constructor(t) {
							this.node = s.A.$(t), this.state = 0, this.states = ["sirv-image-loading", "sirv-image-loaded"]
						}
						setState(t) {
							this.state !== t && (this.state - 1 >= 0 && this.node.removeClass(this.states[this.state - 1]), this.state = t, this.node.addClass(this.states[t - 1]))
						}
						destroy() {
							this.state = 0, this.states.forEach((t => {
								this.node.removeClass(t)
							})), this.node = null
						}
					},
					n = {
						resize: {
							type: "boolean",
							default: !0
						},
						threshold: {
							type: "number",
							minimum: 0,
							default: 0
						},
						fit: {
							type: "string",
							enum: ["contain", "cover", "crop", "none"],
							default: "contain"
						},
						quality: {
							type: "number",
							minimum: 0,
							maximum: 100,
							default: 80
						},
						hdQuality: {
							type: "number",
							minimum: 0,
							maximum: 100,
							default: 60
						},
						autostart: {
							oneOf: [{
								type: "string",
								enum: ["created", "visible", "off"]
							}, {
								type: "boolean",
								enum: [!1]
							}],
							default: "visible"
						},
						onReady: {
							type: "function",
							default: () => {}
						}
					};
				var a = i(8761),
					h = i(7950),
					r = i(8479),
					l = i(9810),
					d = i(4464),
					c = i(3287),
					p = i(749),
					u = i(2084);
				const m = t => t && /px$/.test(t) ? parseInt(t, 10) : null,
					g = t => {
						let e = null,
							i = s.A.$(t).getCss("background-size");
						if (i) {
							i = i.split(",")[0].split(" ");
							const t = m((i[0] || "").trim()),
								s = m((i[1] || "").trim());
							null !== t && (e = {
								width: t
							}), null !== s && (e || (e = {}), e.height = s)
						}
						return e
					},
					v = (t, e) => {
						const i = {
							width: e.width,
							height: e.height
						};
						return t.width && e.width > t.width && (i.width = t.width, i.height = t.width * e.height / e.width), t.height && e.height > t.height && (i.height = t.height, i.width = t.height * e.width / e.height), i
					};
				var f = i(5182),
					y = i(3694),
					S = i(1388),
					w = i(757),
					b = i(511);
				const A = t => {
					const e = t.getBoundingClientRect();
					return !(0 === e.top && 0 === e.right && 0 === e.bottom && 0 === e.left && 0 === e.width && 0 === e.height)
				};
				class x extends a.A {
					constructor(t, e, i) {
						e.options = {
							common: {
								common: e.options.common,
								mobile: {}
							},
							local: {
								common: "",
								mobile: ""
							}
						}, super(t, e, n), this.node = this.instanceNode, this.type = b.mo.IMAGE, this.isLazy = "visible" === this.option("autostart"), this.image = null, this.isInfoLoaded = !1, this.infoSize = {
							width: 0,
							height: 0
						}, this.isNotSirv = !1, this.isInView = !1, this.isStaticImage = !1, this.dppx = 1, this.getImageInfoPromise = null, this.loadStaticImagePromise = null, this.upscale = !1, this.size = {
							width: 0,
							height: 0
						}, this.maxSize = {}, this.lastImageSize = {
							width: 0,
							height: 0
						}, this.srcWasSetted = !1, this.originAlt = null, this.infoAlt = null, this.originTitle = null, this.src = null, this.srcset = null, this.startedSrc = null, this.dataSrc = null, this.imageUrl = null, this.dontLoad = !0, this.isCustomId = !1, this.appearanceState = null, this.dataBgSrc = null, this.intersectionObserver = null, this.rootMargin = 0, this.fitSize = null, this.backgroundNodeSize = null, this.isMaxWidthSet = !1, this.cropPosition = {
							x: null,
							y: null
						}, this.cssBackgroundSize = null, this.isPlaceholder = !1, this.isRun = !1, this.inited = !1, this.resizeDebounce = (0, r.A)((() => {
							this._setRootMargin(), this.onResize()
						}), 50), this.resizeHandler = t => {
							this.resizeDebounce()
						};
						const s = this.instanceOptions.get("autostart");
						(s && "off" !== s || i) && this.preInit()
					}
					preInit() {
						this.isRun = !0, this.intersectionObserver = new IntersectionObserver((t => {
							t.forEach((t => {
								const e = t.isIntersecting || t.intersectionRatio > 0;
								this.isInView !== e && (this.inited ? this.inViewCallback(e) : (this.isInView = e, (e || A(this.instanceNode.node)) && this.init()))
							}))
						}), {
							rootMargin: this.rootMargin + "px 0px"
						}), this.intersectionObserver.observe(this.instanceNode.node), A(this.instanceNode.node) && this.init()
					}
					init() {
						this.inited = !0;
						try {
							this.maxWidth = this.instanceNode.node.style.maxWidth
						} catch (t) {}
						this._getBaseData(), this.imageUrl && (s.A.browser.ready || "loading" !== document.readyState) && this.startFullInit(), this.createSirvImage()
					}
					stop() {
						return this.destroy(), !0
					}
					getOptionsForStartFullInit(t) {
						t && (t = {
							common: {
								common: t.common.lazyImage || {},
								mobile: t.mobile.lazyImage || {}
							},
							local: {
								common: "",
								mobile: ""
							}
						}), super.getOptionsForStartFullInit(t)
					}
					checkReadiness(t, e) {
						return "onLoad" === t && this.ready
					}
					_setRootMargin() {
						let t = parseInt(this.option("threshold"), 10);
						s.A.isString(this.option("threshold")) && (t = (window.innerHeight || document.documentElement.clientHeight) / 100 * t), this.rootMargin = t
					}
					_getQueryParams() {
						if (this.imageUrl) {
							if (this.queryParams = (0, p.A)(this.imageUrl.replace(b.Cu, "$2")), this.queryParams) {
								const t = parseInt(this.queryParams.quality, 10);
								isNaN(t) ? delete this.queryParams.quality : this.queryParams.quality = t
							}
							this.queryParamsQuality = this.queryParams.quality || null
						}
					}
					_getBaseData() {
						this.originAlt = this.instanceNode.attr("alt"), this.originTitle = this.instanceNode.attr("title"), this.src = this.instanceNode.attr("src"), this.srcset = this.instanceNode.attr("srcset"), this.startedSrc = this.src, this.dataSrc = this.instanceNode.attr("data-src"), this.isStaticImage = this.src && !this.dataSrc, this.imageUrl = this.dataSrc || this.src, ((0, d.A)(this.imageUrl) || "static" === this.instanceNode.attr("data-type")) && (this.isNotSirv = !0), this.dataBgSrc = this.instanceNode.attr("data-bg-src"), this.isStaticImage = this.isStaticImage && !this.dataBgSrc, this.imageUrl = this.dataBgSrc || this.imageUrl, "img" === this.instanceNode.tagName && (this.instanceNode.attr("referrerpolicy", this.referrerPolicy), this.dataBgSrc && (this.dataSrc || (this.dataSrc = this.dataBgSrc), this.dataBgSrc = null)), this.dataBgSrc && (this.dontLoad = !1), this.imageUrl && (this.src = (0, w.dc)(this.imageUrl.replace(b.Cu, "$1"))), this._getQueryParams(), this.startedSrc && this.dataSrc && this.startedSrc !== this.dataSrc && (this.isPlaceholder = this.instanceNode.attr("src"))
					}
					createSirvImage() {
						this.imageUrl && !this.isNotSirv && (this.on("imageOnload", (t => {
							if (t.stopAll(), this.replaceSrc(), !this.ready)
								if (this.isStaticImage) this.done();
								else {
									const e = () => {
										this.appearanceState && (this.appearanceState.setState(2), this.done())
									};
									t.data.node ? e() : (0, c.A)(this.instanceNode).finally((() => {
										e()
									}))
								}
						})), this.on("imageOnerror", (t => {
							t.stopAll(), console.log("image error")
						})), this.image = new h.A(this.imageUrl, {
							imageSettings: this.queryParams,
							round: !0,
							dontLoad: this.dontLoad,
							convertSmallerSideToZero: "crop" !== this.option("fit"),
							referrerPolicy: this.referrerPolicy
						}), this.image.parentClass = this, this.getInfoSize().catch((t => {
							t._isplaceholder && (this.infoSize = t, this.isNotSirv = !0)
						})).finally((() => {
							"loading" !== document.readyState && this.isStartedFullInit && this.run()
						})))
					}
					getInfoSize() {
						return this.getImageInfoPromise || (this.getImageInfoPromise = new Promise(((t, e) => {
							this.image ? this.image.loadInfo().then((e => {
								this.isInfoLoaded = !0, this.infoAlt = this.image.description, this.infoSize = this.image.originSize, this.cropPosition = this.image.getCropPosition(), t(e)
							})).catch((t => {
								this.isInfoLoaded = !0, t.status && 404 === t.status || (this.isNotSirv = !0), e(t)
							})) : e()
						}))), this.getImageInfoPromise
					}
					startFullInit(t, e) {
						if (this.isStartedFullInit || !this.inited) return;
						this.getOptionsForStartFullInit(t);
						const i = this.option("autostart");
						if (!this.inited && !(i && "off" !== i || e)) return;
						if (super.startFullInit(t), t && (this.isLazy = "visible" === this.option("autostart")), this.id || (this.isCustomId = !0, this.id = "responsive-image-" + (0, u.A)(), this.instanceNode.attr("id", this.id)), this.dataBgSrc && (this.cssBackgroundSize = g(this.instanceNode), this.cssBackgroundSize && this.option("fit", "none"), this.instanceNode.addClass(b.Mu + "-bg-image"), "none" !== this.option("fit") && "none" !== this.option("fit"))) {
							const t = "contain" === this.option("fit") ? "-bg-contain" : "-bg-cover";
							this.instanceNode.addClass(b.Mu + t)
						}
						this._setRootMargin(), this.isStaticImage ? this.isLazy = !1 : (this.appearanceState = new o(this.instanceNode), this.isPlaceholder || this.appearanceState.setState(1));
						const n = "img" === this.instanceNode.tagName;
						this.isLazy && n && this.instanceNode.attr("loading", "lazy"), this.isLazy && !n || (this.isInView = !0, this.intersectionObserver.disconnect(), this.intersectionObserver = null), (this.isInfoLoaded || this.isNotSirv) && "loading" !== document.readyState && this.run(), s.A.$(window).addEvent("resize", this.resizeHandler)
					}
					fixHeight(t) {
						return 0 !== t && (t === parseInt(this.instanceNode.getCss("block-size"), 10) || t <= 16) && (t = 0), t
					}
					run() {
						const t = super.run();
						if (t) {
							this.instanceNode.removeAttr("alt"), this.instanceNode.removeAttr("title"), this.instanceNode.setCss({
								display: "inline-flex"
							}).render(), this.instanceNode.setCss({
								display: ""
							}).render();
							let t = null;
							(0, f.A)(this.instanceNode).then((e => {
								t = e
							})).finally((() => {
								if (!this.destroyed) {
									if (t = (0, l.A)(this.instanceNode, t), 0 === t.width && 0 === t.height && (this.instanceNode.setCss({
											width: "100%"
										}), t.width = this.instanceNode.size.width), 0 === t.width && 0 === t.height && (t.width = window.innerWidth), "contain" === this.option("fit") ? this.fitSize = {
											width: "contain",
											height: "contain"
										} : this.fitSize = {
											width: "cover",
											height: "cover"
										}, "none" === this.option("fit") ? this.cssBackgroundSize ? this.size = v(this.cssBackgroundSize, this.infoSize) : this.size = this.infoSize : this.size = (0, y.A)(t, this.infoSize, this.fitSize), !this.dataBgSrc) {
										const t = this.instanceNode.getCss("objectFit");
										this.maxWidth || !(this.infoSize.width > 0) || t && "fill" !== t || this.instanceNode.attr("width") || (this.isMaxWidthSet = !0, this.instanceNode.setCss({
											maxWidth: this.infoSize.width
										}))
									}(this.originAlt || this.infoAlt) && this.instanceNode.attr("alt", this.originAlt || this.infoAlt), this.originTitle && this.instanceNode.attr("title", this.originTitle), this.isStaticImage ? this.loadStaticImage().finally((() => {
										this.isInfoLoaded && this.done()
									})) : this.isLazy && !this.isInView || this.getImage()
								}
							}))
						}
						return t
					}
					_setSrc(t, e) {
						this.dataBgSrc ? this.instanceNode.setCss({
							backgroundImage: 'url("' + (e || t) + '")'
						}) : (e ? !this.isNotSirv && this.dppx > 1 && this.instanceNode.attr("srcset", e + " " + this.dppx + "x") : this.instanceNode.removeAttr("srcset"), this.instanceNode.attr("src", t))
					}
					_setHDQuality(t) {
						if (t.dppx > 1 && t.dppx < 1.5) {
							const e = this.instanceOptions.isset("quality") ? this.option("quality") : null;
							null === this.queryParamsQuality && null !== e ? t.srcset.quality = e : t.srcset && delete t.srcset.quality
						}
						return t
					}
					replaceSrc() {
						let t;
						if (this.isNotSirv) {
							if (this.srcWasSetted) return;
							this.srcWasSetted = !0, t = {
								src: this.imageUrl
							}
						} else {
							let e = this._getImageCreateSettings();
							e.dppx > 1 && e.dppx < 1.5 && delete e.srcset.quality, e = this._setHDQuality(e), t = this.image.getImage(e), this.lastImageSize.width = t.width || t.serverWidth, this.lastImageSize.height = t.height || t.serverHeight
						}
						this._setSrc(t.src, t.srcset)
					}
					loadStaticImage() {
						return this.loadStaticImagePromise || (this.loadStaticImagePromise = new Promise(((t, e) => {
							this.isStaticImage ? this.instanceNode.node.complete ? t() : (this.instanceNode.addEvent("load", (e => {
								t()
							})), this.instanceNode.addEvent("error", (t => {
								e()
							}))) : t()
						}))), this.loadStaticImagePromise
					}
					_getImageCreateSettings() {
						let t = {
							src: {},
							srcset: {}
						};
						const e = this.instanceOptions.isset("quality") ? this.option("quality") : null;
						null !== e && null === this.queryParamsQuality && (t.src.quality = e);
						const i = this.option("hdQuality");
						return (null === this.queryParamsQuality || this.instanceOptions.isset("hdQuality") && i < this.queryParamsQuality) && (t.srcset = {
							quality: i
						}), t.width = this.size.width, this.size.height && (t.height = this.size.height), t = (0, S.A)(t, this.infoSize), this.infoSize.width !== t.width && this.infoSize.height !== t.height || (t.round = !1), s.A.DPPX > 1 && (t.dppx = this.dppx), "crop" === this.option("fit") && (t.round = !1), t = this.setCrop(t), t
					}
					setCrop(t) {
						if ("crop" === this.option("fit")) {
							const e = s.A.$(this.instanceNode.node).getInnerSize(!!this.dataBgSrc);
							t.imageSettings || (t.imageSettings = {}), t.imageSettings.crop || (t.imageSettings.crop = {}), t.imageSettings.crop = {
								x: this.cropPosition.x || "center",
								y: this.cropPosition.y || "center",
								width: e.width,
								height: e.height
							}
						}
						return t
					}
					getImage() {
						this.isStaticImage || (this.isNotSirv ? this.getNonSirvImg() : this.getSirvImg())
					}
					getNonSirvImg() {
						this.isPlaceholder ? (0, c.A)(this.dataSrc).finally((() => {
							this.replaceSrc(), this.appearanceState.setState(2), this.done()
						})) : (this.replaceSrc(), this.appearanceState.setState(2), this.done())
					}
					get imageClassContainer() {
						return this.image
					}
					getSirvImg() {
						let t = this._getImageCreateSettings();
						if (t.width && (this.maxSize.width = t.width), t.height && (this.maxSize.height = t.height), s.A.DPPX > 1) {
							const e = this.image.originSize;
							this.dppx = h.A.getDPPX(t.width, t.height, e.width, e.height, t.round, this.upscale), t.dppx = this.dppx
						}
						t = this._setHDQuality(t), this.checkImage(t) ? this.replaceSrc() : this.image.getImage(t)
					}
					checkSize(t) {
						const e = this.infoSize.width,
							i = this.infoSize.height;
						return (t.width > e || t.height > i) && (t.width = e, t.height && (t.height = i), t.round = !1), t
					}
					done() {
						super.done(), this.option("onReady")(this.id), this.sendEvent("ready")
					}
					inViewCallback(t) {
						t && !this.isStaticImage && (this.ready || this.isInView || this.isStarted && (this.isInView = !0, this.isNotSirv ? this.srcWasSetted || this.getImage() : this.isInfoLoaded && this.getImage())), this.isInView = t
					}
					sendEvent(t, e) {
						e || (e = {}), e.image || (e.image = {}), e.image.event || (e.image.event = {}), "ready" === t && (t = "onLoad"), e.type = t, e.image.id = this.id, e.image.url = this.instanceUrl, e.image = Object.assign(e.image, this.api), e.node = this.instanceNode, e.image.node = this.instanceNode.node, e.image.event.timestamp = Date.now(), e.image.event.type = "lazyimage:" + t, this.emit("imagePublicEvent", {
							data: e
						})
					}
					get originImageUrl() {
						return this.src
					}
					onResize() {
						if (!this.isStarted || this.isStaticImage || !this.option("resize") || this.isNotSirv) return !1;
						let t;
						if (["crop", "cover"].includes(this.option("fit")) ? t = s.A.$(this.instanceNode.node.parentNode).size : (t = this.instanceNode.size, t.height = this.fixHeight(t.height)), t = (0, y.A)(t, this.infoSize, this.fitSize), this.size.width = t.width, this.size.height && (this.size.height = t.height), this.ready && !this.isNotSirv) {
							const t = 50;
							"crop" === this.option("fit") ? (Math.abs(this.size.width - this.lastImageSize.width) > t || Math.abs(this.size.height - this.lastImageSize.height) > t) && this.getImage() : (this.size.width - this.lastImageSize.width > t || this.size.height - this.lastImageSize.height > t) && this.getImage()
						}
						return !0
					}
					destroy() {
						if (this.isCustomId && this.instanceNode.removeAttr("id"), this.dataBgSrc && (this.instanceNode.removeClass(b.Mu + "-bg-image"), this.instanceNode.setCssProp("background-image", "")), this.isMaxWidthSet && (this.isMaxWidthSet = !1, this.instanceNode.setCss({
								maxWidth: ""
							})), this.appearanceState && this.appearanceState.destroy(), this.intersectionObserver && (this.intersectionObserver.disconnect(), this.intersectionObserver = null), s.A.$(window).removeEvent("resize", this.resizeHandler), this.resizeDebounce.cancel(), this.resizeDebounce = null, this.image && (this.off("imageOnload"), this.off("imageOnerror"), this.image.destroy(), this.image = null), this.instanceNode.node.hasAttribute("src")) try {
							this.instanceNode.removeAttr("src"), this.isStaticImage && this.instanceNode.attr("src", this.imageUrl)
						} catch (t) {}
						if (this.isStaticImage ? this.instanceNode.attr("src", this.src) : this.instanceNode.removeAttr("src"), this.srcset) this.instanceNode.attr("srcset", this.srcset);
						else try {
							this.instanceNode.removeAttr("srcset")
						} catch (t) {}
						this.srcset = null, !this.originAlt && this.infoAlt && this.instanceNode.removeAttr("alt"), this.instanceNode.removeEvent("load"), this.isPlaceholder && (this.instanceNode.attr("src", this.isPlaceholder), this.isPlaceholder = !1), super.destroy()
					}
				}
				const z = x
			},
			7316: (t, e, i) => {
				i.r(e), i.d(e, {
					default: () => g
				});
				var s = i(538);
				const o = {
					zoom: {
						type: "boolean",
						default: !0
					},
					preload: {
						type: "boolean",
						default: !1
					},
					camera: {
						orbit: {
							oneOf: [{
								type: "string"
							}, {
								type: "boolean",
								enum: [!1]
							}],
							default: !1
						},
						target: {
							oneOf: [{
								type: "string"
							}, {
								type: "boolean",
								enum: [!1]
							}],
							default: !1
						}
					},
					skybox: {
						image: {
							oneOf: [{
								type: "url"
							}, {
								type: "boolean",
								enum: [!1]
							}],
							default: !1
						},
						height: {
							type: "string",
							default: "0m"
						}
					},
					environmentImage: {
						oneOf: [{
							type: "url"
						}, {
							type: "boolean",
							enum: [!1]
						}],
						default: !1
					},
					toneMapping: {
						type: "string",
						default: "neutral",
						enum: ["neutral", "aces", "agx"]
					},
					thumbnail: {
						oneOf: [{
							type: "url"
						}, {
							type: "boolean",
							enum: [!1]
						}],
						default: !1
					},
					sensitivity: {
						type: "number",
						minimum: .1,
						default: 1
					},
					autorotate: {
						enable: {
							type: "boolean",
							default: !1
						},
						delay: {
							type: "number",
							minimum: 0,
							default: 0
						},
						speed: {
							type: "number",
							minimum: 1,
							default: 15
						}
					},
					animation: {
						autoplay: {
							type: "boolean",
							default: !1
						},
						name: {
							oneOf: [{
								type: "string"
							}, {
								type: "boolean",
								enum: [!1]
							}],
							default: !1
						},
						crossfadeDuration: {
							type: "number",
							minimum: 1,
							default: 300
						},
						timeScale: {
							type: "number",
							minimum: .01,
							default: 1
						}
					},
					ar: {
						enable: {
							type: "boolean",
							default: !0
						},
						zoom: {
							type: "boolean",
							default: !0
						},
						placement: {
							type: "string",
							enum: ["floor", "wall"],
							default: "floor"
						},
						xrEnvironment: {
							type: "boolean",
							default: !1
						}
					},
					shadow: {
						intensity: {
							type: "number",
							minimum: 0,
							maximum: 100,
							default: 0
						},
						softness: {
							type: "number",
							minimum: 0,
							maximum: 100,
							default: 100
						}
					},
					exposure: {
						type: "number",
						minimum: 0,
						default: 1
					},
					hint: {
						finger: {
							type: "boolean",
							default: !0
						}
					}
				};
				var n = i(511),
					a = i(757),
					h = i(7741),
					r = i(2084),
					l = i(7064),
					d = i(1808),
					c = i(5654);
				a.ms.addCssModule("Model", ".smv-sirv-model-viewer{height:100%;left:0;position:relative;top:0;width:100%}.smv-model-placeholder:before{background-color:#ccc;border-radius:0;bottom:0;content:\"\";left:0;margin:auto;mask-image:var(--smv-model-icon,url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 48 48'%3E%3Cpath fill='%23000' d='m3.24 12 5.25-3 .525.9-4.2 2.4 5.144 2.94c-.185.293-.36.593-.526.899L4.29 13.2V18H3.24v-6Zm15.75 33 5.25 3 5.25-3-.525-.9-4.2 2.4v-5.88a17.284 17.284 0 0 1-1.05 0v5.88l-4.2-2.4-.525.9Zm21-6 5.25-3v-6h-1.05v4.8l-5.142-2.939c-.166.306-.342.606-.526.9l5.143 2.939-4.2 2.4.525.9ZM29.49 3l-5.25-3-5.25 3 .525.9 4.2-2.4v5.88a17.304 17.304 0 0 1 1.05 0V1.5l4.2 2.4.525-.9Zm10.5 6 5.25 3v6h-1.05v-4.8l-5.142 2.939a16.61 16.61 0 0 0-.526-.9l5.143-2.939-4.2-2.4.525-.9ZM8.49 39l-5.25-3v-6h1.05v4.8l5.143-2.938c.166.305.341.605.526.899L4.815 35.7l4.2 2.4-.525.9Zm6.25-11.84c.407.403.869.749 1.387 1.04.518.277 1.113.416 1.785.416.728 0 1.316-.174 1.764-.52.462-.36.693-.852.693-1.476a2.22 2.22 0 0 0-.19-.935c-.125-.277-.342-.513-.65-.707-.294-.194-.693-.34-1.197-.436-.504-.111-1.134-.166-1.89-.166V22.63c.658 0 1.204-.049 1.638-.146.448-.11.805-.256 1.07-.436.28-.194.477-.423.589-.686.126-.263.189-.547.189-.852 0-.555-.175-.984-.525-1.289-.35-.319-.833-.478-1.45-.478-.531 0-1.014.118-1.448.353-.42.222-.833.52-1.24.894l-1.238-1.476a7.998 7.998 0 0 1 1.827-1.205c.658-.305 1.386-.457 2.184-.457.644 0 1.232.076 1.764.228a3.83 3.83 0 0 1 1.365.686c.378.291.672.658.882 1.102.21.43.315.921.315 1.475 0 .749-.21 1.372-.63 1.871-.406.499-.973.887-1.701 1.164v.083c.798.208 1.456.589 1.974 1.143.532.555.798 1.268.798 2.141 0 .61-.126 1.15-.378 1.621a3.486 3.486 0 0 1-1.008 1.206 4.83 4.83 0 0 1-1.491.748c-.56.166-1.162.25-1.806.25-1.092 0-2.002-.18-2.73-.541-.728-.36-1.33-.804-1.806-1.33l1.155-1.538Zm9.801-10.433h3.675c2.1 0 3.738.561 4.914 1.683 1.176 1.123 1.764 2.806 1.764 5.051 0 1.123-.154 2.113-.462 2.972-.294.86-.727 1.58-1.302 2.162a5.398 5.398 0 0 1-2.058 1.289c-.797.29-1.707.436-2.73.436h-3.8V16.727Zm3.508 11.64c1.4 0 2.47-.396 3.213-1.186.755-.803 1.133-2.043 1.133-3.72 0-1.663-.378-2.875-1.134-3.637-.755-.762-1.826-1.143-3.212-1.143h-1.072v9.685h1.072Z'/%3E%3C/svg%3E\"));mask-position:center;mask-repeat:no-repeat;mask-size:auto 64%;position:absolute;right:0;top:0;z-index:42}.smv-model-ar-button{background-color:#fff;border-radius:50%;bottom:16px;box-shadow:0 0 4px #00000026;box-sizing:border-box;color:#000;height:44px;padding:8px;position:absolute;right:16px;width:44px}");
				const p = "v3.18.6-9ec11ec8".replace(/^v/, ""),
					u = n.Mu + "-model-placeholder";
				class m extends s.A {
					constructor(t, e) {
						super(t, e, o), this.type = n.mo.MODEL, this.modelNode = null, this.thumbnail = this.option("thumbnail"), this.poster = this.thumbnail, this.sourcesAdded = !1, this.info = null, this.isInited = !1, this.loader = null, this.isModelLoaded = 0, this.defaultCameraOrbit = null, this.defaultCameraTarget = null, this.ariaLabelId = this.id, this.api = Object.assign(this.api, {
							animationPlay: () => this.animationPlay(),
							animationPause: () => this.animationPause(),
							changeAnimation: t => this.animationChange(t),
							getAnimationName: () => this.getAnimationName(),
							isAnimationPaused: () => this.isAnimationPaused(),
							setAnimationTimeScale: t => this.setAnimationTimeScale(t),
							getAvailableAnimations: () => this.getAvailableAnimations(),
							createTexture: (t, e) => this.createTexture(t, e),
							getMaterial: t => {
								if (!this.ready) return null;
								let e = null;
								var i;
								return e = "string" === h.A.typeOf(t) ? this.modelNode.node.model.getMaterialByName(t) : null == (i = this.modelNode.node.model) ? void 0 : i.materials[t], e ? {
									setColor(t) {
											e.pbrMetallicRoughness.setBaseColorFactor(t)
										},
										setTexture(t) {
											e.pbrMetallicRoughness.baseColorTexture.setTexture(t)
										},
										setMetallicFactor(t) {
											e.pbrMetallicRoughness.setMetallicFactor(t)
										},
										setRoughnessFactor(t) {
											e.pbrMetallicRoughness.setRoughnessFactor(t)
										},
										setMetallicTexture(t) {
											e.pbrMetallicRoughness.metallicRoughnessTexture.setTexture(t)
										}
								} : null
							}
						}), this.getInfo()
					}
					static support() {
						return "safari" !== h.A.browser.uaName || h.A.browser.uaVersion >= 14
					}
					updateOptions(t) {
						var e;
						if ((0, c.A)(this._options, t)) return;
						this._options = t, null == (e = this.modelNode) || e.node.pause();
						const i = this.option("thumbnail");
						if (super.updateOptions(t), !this.modelNode) return;
						["disable-zoom", "orbit-sensitivity", "auto-rotate", "auto-rotate-delay", "rotation-per-second", "ar", "ar-placement", "ar-scale", "xr-environment", "shadow-intensity", "shadow-softness", "interaction-prompt", "animation-name", "animation-crossfade-duration"].forEach((t => this.modelNode.removeAttr(t))), this.addAttributes(), this.addAnimationAttributes(), this.option("animation.autoplay") && this.animationPlay();
						const s = this.option("thumbnail");
						var o;
						i !== s && (this.poster && "magicjs-element" === (null == (o = this.poster) ? void 0 : o.$J_TYPE) && (this.poster.remove(), this.poster = null), this.thumbnail = s, this.poster = s, this.createPoster(), this.emit("reloadThumbnail"))
					}
					createTexture(t, e) {
						var i;
						return void 0 === e && (e = "image/png"), (null == (i = this.modelNode) ? void 0 : i.node.createTexture(t, e)) || null
					}
					createModelNode() {
						this.modelNode || (this.modelNode = h.A.$new("model-viewer").addClass([n.Mu + "-sirv-model-viewer"]).attr("camera-controls", !0).attr("loading", "eager").attr("disable-tap", "").attr("reveal", "manual"), h.A.$new("div").attr("slot", "ar-button").addClass(n.Mu + "-model-ar-button").changeContent('<svg fill="none" viewBox="0 0 48 48"><path fill="#000" d="m17.938 3.5.5.866L24 1.155l5.562 3.211.5-.866L24 0l-6.062 3.5ZM9.778 9.366l-.5-.866L3.215 12v7h1v-6.423l5.563-3.211ZM4.215 29h-1v7l6.063 3.5.5-.866-5.563-3.211V29ZM18.438 43.634l-.5.866L24 48l6.062-3.5-.5-.866L24 46.845l-5.562-3.211ZM43.785 29h1v7l-6.063 3.5-.5-.866 5.563-3.211V29ZM38.722 8.5l-.5.866 5.563 3.211V19h1v-7l-6.063-3.5Z"/><path fill="#000" d="M23.5.878h1v9.91L24 10.5l-.5.289V.879ZM12.308 30.173v.577l.5.289L4.04 36.1l-.5-.866 8.768-5.062ZM35.19 31.039l.5-.289v-.577l8.826 5.095-.5.866-8.825-5.095Z"/><path fill="#000" fill-rule="evenodd" d="M12.3 17.25v13.5L24 37.5l11.7-6.75v-13.5L24 10.5l-11.7 6.75Zm1.95.375L24 23.25l9.75-5.625L24 12l-9.75 5.625ZM34.4 18.75l-9.75 5.625v11.25L34.4 30V18.75Zm-11.05 5.625L13.6 18.75V30l9.75 5.625v-11.25Z" clip-rule="evenodd"/></svg>').addEvent(["touchstart", "pointerdown"], (t => {
							t.stopDistribution()
						})).addEvent("click", (() => {
							this.sendEvent("arStart")
						})).appendTo(this.modelNode), this.modelNode.append(h.A.$new("div", {
							style: "display: none;"
						}).attr("slot", "progress-bar")), this.alt && this.modelNode.attr("alt", this.alt), this.createPoster(), this.addAttributes(), 1 !== this.option("exposure") && this.modelNode.attr("exposure", this.option("exposure")), this.instanceNode.append(this.modelNode), this.modelNode.addEvent("error", (t => {
							this.sendEvent("error", {
								error: t.oe
							})
						})), this.modelNode.addEvent("ar-status", (t => {
							"failed" === t.oe.detail.status && this.sendEvent("arStop")
						})), this.waitToStart.start(), this.init())
					}
					createPoster() {
						this.poster ? this.modelNode.attr("poster", this.poster) : this.poster = h.A.$new("div").attr("slot", "poster").addClass(u).appendTo(this.modelNode)
					}
					addAttributes() {
						this.option("skybox.image") && this.modelNode.attr("skybox-image", this.option("skybox.image")), parseFloat(this.option("skybox.height")) > 0 && this.modelNode.attr("skybox-height", this.option("skybox.height")), this.option("camera.orbit") && this.modelNode.attr("camera-orbit", this.option("camera.orbit")), this.option("camera.target") && this.modelNode.attr("camera-target", this.option("camera.target")), this.option("environmentImage") && this.modelNode.attr("environment-image", this.option("environmentImage")), this.option("autorotate.enable") && (this.modelNode.attr("auto-rotate", !0), this.modelNode.attr("auto-rotate-delay", this.option("autorotate.delay")), this.modelNode.attr("rotation-per-second", this.option("autorotate.speed") + "deg")), this.option("zoom") || this.modelNode.attr("disable-zoom", !0), this.option("ar.enable") && (this.modelNode.attr("ar", !0), this.modelNode.attr("ar-placement", this.option("ar.placement")), this.option("ar.zoom") || this.modelNode.attr("ar-scale", "fixed"), this.option("ar.xrEnvironment") && this.modelNode.attr("xr-environment", !0)), this.instanceOptions.isset("shadow.intensity") && this.modelNode.attr("shadow-intensity", this.option("shadow.intensity") / 100), this.instanceOptions.isset("shadow.softness") && this.modelNode.attr("shadow-softness", this.option("shadow.softness") / 100), this.modelNode.attr("orbit-sensitivity", this.option("sensitivity")), this.modelNode.attr("interaction-prompt", this.option("hint.finger") ? "auto" : "none"), this.modelNode.attr("tone-mapping", this.option("toneMapping"))
					}
					addAnimationAttributes() {
						this.modelNode.node.availableAnimations.length && (this.modelNode.node.availableAnimations.includes(this.option("animation.name")) && (this.modelNode.attr("animation-name", this.option("animation.name")), this.modelNode.node.currentTime = 0), this.modelNode.attr("animation-crossfade-duration", this.option("animation.crossfadeDuration")), this.modelNode.node.timeScale = this.option("animation.timeScale"))
					}
					init() {
						this.infoSize && !this.isInited && (this.isInited = !0, this.isInView && (this.isSlideShown || this.preload && this.option("preload")) && this.loadModel(), this.sendEvent("init"))
					}
					loadModel() {
						if (0 !== this.isModelLoaded) return;
						this.isModelLoaded = 1, this.loader.show(), this.modelNode.attr("src", this.instanceUrl);
						const t = this.instanceNode.attr("data-ios-src");
						t && /\.usdz$/.test(t) && this.modelNode.attr("ios-src", t);
						let e = 0;
						this.modelNode.addEvent("progress", (t => {
							if (2 === this.isModelLoaded) return;
							const i = t.oe.detail.totalProgress;
							e = this.loader.progress(100 * i - e), 1 === i && (this.isModelLoaded = 2, this.addAnimationAttributes(), this.isSlideShown && this.modelNode.node.dismissPoster(), this.defaultCameraTarget = this.modelNode.node.getCameraTarget(), this.defaultCameraOrbit = this.modelNode.node.getCameraOrbit(), this.done(), this.sendContentLoadedEvent(), this.isSlideShown && this.option("animation.autoplay") && this.animationPlay())
						}))
					}
					addSources() {
						var t;
						a.ms.addJavaScript(document, (t = "js", n.bH + "model/sirv.model." + t + "?v=" + p)).finally((() => {
							this.sourcesAdded = !0, this.isStarted && this.createModelNode()
						}))
					}
					getInfo() {
						return this.gettingInfoPromise || (this.gettingInfoPromise = new Promise(((t, e) => {
							this.waitGettingInfo.wait((() => {
								const i = h.A.getHashCode(this.baseUrl.replace(/^http(s)?:\/\//, "")),
									s = this.baseUrl + (/\?/.test(this.baseUrl) ? "&" : "?") + "info=sirv_model_info_" + i + "_main";
								(0, l.A)(s, "model_info_" + (0, r.A)(), this.referrerPolicy).then((e => {
									var i;
									this.destroyed || (this.info = e, this.accountInfo = {
										account: this.info.account,
										branded: this.info.branded
									}, this.dataDescription || (this.dataDescription = null == (i = this.info.original) ? void 0 : i.description), this.infoSize = {
										width: 3e3,
										height: 1687.5
									}, t(this.infoSize))
								})).catch((t => {
									this.destroyed || e(t)
								}))
							}))
						}))), this.gettingInfoPromise
					}
					getSelectorImgUrl(t) {
						return new Promise(((e, i) => {
							const s = this.thumbnail || null,
								o = {
									src: s,
									callbackData: t.callbackData
								};
							h.A.DPPX > 1 && (o.srcset = s), this.getInfo().then((() => {
								e(o)
							})).catch(i)
						}))
					}
					getInfoSize() {
						return new Promise(((t, e) => {
							this.getInfo().then((() => {
								t({
									size: this.infoSize
								})
							})).catch((t => {
								e({
									error: t
								})
							}))
						}))
					}
					onBeforeStartActions() {
						this.ready && this.isInView && (this.modelNode.node.dismissPoster(), this.option("animation.autoplay") && this.animationPlay())
					}
					onStartActions(t) {
						!this.ready && this.isStarted && this.isInView && this.sourcesAdded && this.loadModel()
					}
					onStopActions() {}
					onAfterStopActions() {
						this.ready && (this.animationPause(), this.modelNode.node.showPoster())
					}
					animationPlay() {
						return !!this.ready && (this.modelNode.node.play(), !0)
					}
					animationPause() {
						return !!this.ready && (this.modelNode.node.pause(), !0)
					}
					animationChange(t) {
						return !(!this.ready || !this.modelNode.node.availableAnimations.includes(t) || (this.modelNode.node.animationName = t, 0))
					}
					getAnimationName() {
						return this.ready && this.modelNode.node.availableAnimations.length ? this.modelNode.node.animationName || this.modelNode.node.availableAnimations[0] : null
					}
					isAnimationPaused() {
						return !(!this.ready || !this.modelNode.node.availableAnimations.length) && this.modelNode.node.paused
					}
					setAnimationTimeScale(t) {
						return !!this.ready && (this.modelNode.node.timeScale = t, !0)
					}
					getAvailableAnimations() {
						return this.ready ? [].concat(this.modelNode.node.availableAnimations) : []
					}
					onInView(t) {
						t ? this.ready ? this.isSlideShown && this.modelNode.node.dismissPoster() : this.modelNode && this.isStarted && !this.isInView && (this.preload || this.isSlideShown) && this.sourcesAdded && (this.isInView = !0, this.loadModel()) : this.ready && this.modelNode.node.showPoster()
					}
					startFullInit(t, e) {
						this.isStartedFullInit || (super.startFullInit(t, e), this.thumbnail = this.option("thumbnail"), this.poster = this.thumbnail, this.loader = new d.A(this.instanceNode, {
							max: 100,
							class: "model-loader"
						}), this.loader.parentClass = this)
					}
					loadContent() {
						this.option("preload") && this.sourcesAdded && this.loadModel()
					}
					run(t, e, i) {
						const s = super.run(t, e, i);
						return s && (this.sourcesAdded && this.createModelNode(), this.startGettingInfo()), s
					}
					done() {
						this.ready || (super.done(), this.accountInfo.branded && a.ms.showSirvAd(this.instanceNode, this.instanceNode, "https://sirv.com/about-zoom/?utm_source=client&utm_medium=sirvembed&utm_content=typeofembed(zoom)&utm_campaign=branding", "3D Model Viewer by Sirv"), this.loader.hide(), this.modelNode.addEvent("play", (() => {
							this.sendEvent("play")
						})), this.modelNode.addEvent("pause", (() => {
							this.sendEvent("pause")
						})), this.modelNode.addEvent("loop", (t => {
							this.sendEvent("loop", {
								event: {
									loopCount: t.oe.detail.count
								}
							})
						})), this.modelNode.addEvent("finished", (() => {
							this.sendEvent("finished")
						})), this.zoomByDblClick(), this.returnCameraTargetByClick(), this.modelNode.removeEvent("click"))
					}
					onBeforeFullscreenIn(t) {
						if (super.onBeforeFullscreenIn(t), this.ready && this.isSlideShown && this.isInView) {
							const t = this.modelNode.node.getCameraOrbit();
							this.modelNode.node.cameraOrbit = t.theta + "rad " + t.phi + "rad auto"
						}
					}
					onAfterFullscreenIn(t) {
						super.onAfterFullscreenIn(t), this.ready && this.isSlideShown && this.isInView && this.modelNode.node.dismissPoster()
					}
					onBeforeFullscreenOut(t) {
						if (super.onBeforeFullscreenOut(t), this.ready && this.isSlideShown && this.isInView) {
							const t = this.modelNode.node.getCameraOrbit();
							this.modelNode.node.cameraOrbit = t.theta + "rad " + t.phi + "rad auto"
						}
					}
					onAfterFullscreenOut(t) {
						super.onAfterFullscreenOut(t), this.ready && this.isSlideShown && this.isInView && this.modelNode.node.dismissPoster()
					}
					onSecondSelectorClick() {
						this.ready && (this.modelNode.node.cameraTarget = this.defaultCameraTarget.toString(), this.modelNode.node.cameraOrbit = "auto auto " + this.defaultCameraOrbit.radius + "m", this.modelNode.node.fieldOfView = this.modelNode.node.getMaximumFieldOfView())
					}
					zoomByDblClick() {
						const t = this.modelNode.node.getMaximumFieldOfView();
						this.modelNode.addEvent(["dblbtnclick", "dbltap"], (e => {
							e.stop(), this.modelNode.node.getFieldOfView() > this.modelNode.node.getMinimumFieldOfView() ? this.modelNode.node.zoom(t / 2) : this.modelNode.node.zoom(-t)
						}))
					}
					returnCameraTargetByClick() {
						this.modelNode.addEvent(["btnclick", "tap"], (t => {
							t.stop(), this.modelNode.node.cameraTarget = this.defaultCameraTarget
						}))
					}
					createPinchEvent() {}
					destroy() {
						return this.destroyed = !0, this.modelNode && (this.modelNode.remove(), this.modelNode = null), this.loader && (this.loader.destroy(), this.loader = null), super.destroy(), !0
					}
				}
				const g = m
			},
			4681: (t, e, i) => {
				i.d(e, {
					A: () => h
				});
				var s = i(7741),
					o = i(7985),
					n = i(511);
				class a extends o.A {
					constructor(t) {
						var e, i;
						super(), this.options = Object.assign({
							customClass: "",
							prevAriaLabel: "",
							nextAriaLabel: ""
						}, t || {}), this.arrows = (e = this.options.customClass, i = [this.options.prevAriaLabel, this.options.nextAriaLabel], void 0 === e && (e = ""), ["prev", "next"].map(((t, o) => {
							const a = s.A.$new("div").addClass([n.Mu + "-arrow-control", n.Mu + "-arrow-control-" + t]),
								h = s.A.$new("div").addClass([n.Mu + "-button", n.Mu + "-arrow", n.Mu + "-arrow-" + t]).attr("tabindex", 0).attr("role", "button").attr("aria-label", i[o]);
							return e && "" !== e && h.addClass(n.Mu + "-arrow-" + e), a.append(h), a
						}))), this.arrows.forEach(((t, e) => {
							const i = e ? "next" : "prev",
								o = s.A.$(t.node.firstChild);
							t.store("arrowType", i), o.append(s.A.$new("div").addClass(n.Mu + "-icon").attr("aria-hidden", "true")), o.addEvent(["btnclick", "tap"], s.A.$(((e, i) => {
								i.stop(), t.fetch("disabled") || this.emit("arrowAction", {
									data: {
										type: e
									}
								})
							})).bind(this, i)), o.store("action", (() => {
								t.fetch("disabled") || this.emit("arrowAction", {
									data: {
										type: i
									}
								})
							}))
						})), this.isShow = !0
					}
					get nodes() {
						return [this.arrows[0], this.arrows[1]]
					}
					setOptions(t) {
						this.options.prevAriaLabel = t.prevAriaLabel, this.options.nextAriaLabel = t.nextAriaLabel, [this.options.prevAriaLabel, this.options.nextAriaLabel].forEach(((t, e) => {
							s.A.$(this.arrows[e].node.firstChild).attr("aria-label", t)
						}))
					}
					show() {
						this.isShow || (this.arrows.forEach((t => {
							t.removeClass(n.Mu + "-hidden")
						})), this.isShow = !0)
					}
					hide() {
						this.isShow && (this.isShow = !1, this.arrows.forEach((t => {
							t.addClass(n.Mu + "-hidden")
						})))
					}
					disable(t) {
						if (t && this.isShow) {
							const e = "forward" === t ? 1 : 0;
							this.arrows[e].store("disabled", !0), s.A.$(this.arrows[e].node.firstChild).attr("disabled", "").removeAttr("tabindex")
						} else this.arrows.forEach((t => {
							s.A.$(t.node.firstChild).removeAttr("disabled").attr("tabindex", 0), t.store("disabled", !1)
						}))
					}
					destroy() {
						this.arrows.forEach((t => {
							s.A.$(t.node.firstChild).removeEvent(["btnclick", "tap"]), s.A.$(t.node.firstChild).del("action"), t.del("arrowType"), t.del("disabled"), t.remove()
						})), this.arrows = [], this.isShow = !1, super.destroy()
					}
				}
				const h = a
			},
			6242: (t, e, i) => {
				i.d(e, {
					A: () => p
				});
				var s = i(7985),
					o = i(7741);
				class n extends s.A {
					constructor(t, e, i) {
						super(), this.name = "blank", this.elements = [t, e], this.elements[0].node = o.A.$(this.elements[0].node), this.elements[1].node = o.A.$(this.elements[1].node), this.options = Object.assign({}, i || {}), this.states = {
							NOT_STARTED: 0,
							MOVING: 1,
							ENDED: 2
						}, this.state = this.states.NOT_STARTED, this.isDestroyed = !1
					}
					_show(t) {
						this.elements[t].node.setCss({
							opacity: 1,
							visibility: "visible"
						})
					}
					_hide(t) {
						this.elements[t].node.setCss({
							opacity: 0,
							visibility: "hidden"
						})
					}
					_start() {
						this.emit("effectStart", {
							name: this.name,
							indexes: [this.elements[0].index, this.elements[1].index]
						}), this._show(0), this.elements[0].node.setCssProp("z-index", 9), this._show(1), this.elements[1].node.setCssProp("z-index", 7)
					}
					_move(t) {
						t()
					}
					_end() {
						this.state !== this.states.ENDED && (this.state = this.states.ENDED, this._hide(0), this.emit("effectEnd", {
							name: this.name,
							indexes: [this.elements[0].index, this.elements[1].index]
						}))
					}
					_clear() {
						this.elements.forEach((t => {
							t.node.setCss({
								zIndex: "",
								opacity: "",
								visibility: ""
							})
						}))
					}
					make() {
						this.state === this.states.NOT_STARTED && (this.state = this.states.MOVING, this._start(), this._move((() => {
							this._end(), this._clear()
						})))
					}
					destroy() {
						this.isDestroyed || (this.isDestroyed = !0, this._end(), this._clear(), this.state = this.states.ENDED, super.destroy(this))
					}
				}
				const a = n,
					h = t => t.map((t => (t => t + "%")(t))),
					r = class extends a {
						constructor(t, e, i) {
							super(t, e, i), this.options = Object.assign(this.options, Object.assign({
								direction: "left",
								time: 600,
								easing: "ease-in-out"
							}, i || {})), this.name = "slide", this.from = [0, -100], this.to = [100, 0], ["right", "bottom"].includes(this.options.direction) && (this.from[1] *= -1, this.to[0] *= -1), this.from = h(this.from), this.to = h(this.to)
						}
						_show(t) {
							const e = this.elements[t].node;
							["left", "right"].includes(this.options.direction) ? (this.from[t] = this.from[t] + ", 0%", this.to[t] = this.to[t] + ", 0%") : (this.from[t] = "0%, " + this.from[t], this.to[t] = "0%, " + this.to[t]), e.setCssProp("transform", "translate3d(" + this.from[t] + ", 0px)"), super._show(t)
						}
						_move(t) {
							const e = this.options;
							this.elements[1].node.addEvent("transitionend", (e => {
								this.elements[1].node.node === e.target && (e.stop(), super._move(t))
							})), this.elements.forEach(((t, i) => {
								t.node.render(), t.node.setCssProp("transition", "transform " + e.time + "ms " + e.easing), t.node.setCssProp("transform", "translate3d(" + this.to[i] + ", 0px)")
							}))
						}
						_clear() {
							this.elements.forEach((t => {
								t.node.removeEvent("transitionend"), t.node.setCss({
									transform: "",
									transition: ""
								})
							})), super._clear(this)
						}
					},
					l = {
						Blank: a,
						Slide: r,
						Fade: class extends a {
							constructor(t, e, i) {
								super(t, e, i), this.options = Object.assign(this.options, Object.assign({
									time: 600,
									easing: "linear"
								}, i || {})), this.name = "fade", this.from = [1, 0], this.to = [0, 1]
							}
							_show(t) {
								super._show(t), this.elements[t].node.setCssProp("opacity", this.from[t])
							}
							_move(t) {
								const e = this.options;
								this.elements[1].node.addEvent("transitionend", (e => {
									this.elements[1].node.node === e.target && (e.stop(), super._move(t))
								})), this.elements.forEach(((t, i) => {
									t.node.render(), t.node.setCssProp("transition", "opacity " + e.time + "ms " + e.easing), t.node.setCssProp("opacity", this.to[i])
								}))
							}
							_clear() {
								this.elements.forEach((t => {
									t.node.removeEvent("transitionend"), t.node.setCss({
										opacity: "",
										transition: ""
									})
								})), super._clear()
							}
						}
					},
					d = (t, e) => {
						let i;
						return i = "horizontal" === e ? "next" === t ? "right" : "left" : "next" === t ? "bottom" : "top", i
					};
				class c extends s.A {
					constructor(t) {
						super(), this.options = Object.assign({
							effect: "blank",
							orientation: "horizontal",
							time: 600,
							easing: "ease-in-out"
						}, t), this.isMove = !1, this.callbackData = null, this.effectName = "blank", this.effect = null, this.addEvents()
					}
					addEvents() {
						this.on("effectStart", (t => {
							t.data = {
								callbackData: this.callbackData
							}, this.isMove = !0
						})), this.on("effectEnd", (t => {
							t.data = {
								callbackData: this.callbackData
							}, this.isMove = !1, this.effect.destroy(), this.effect = null
						}))
					}
					make(t, e, i, s) {
						const n = Object.assign(this.options, i || {});
						this.stop();
						let a = (h = n.effect, o.A.camelize("-" + h));
						var h;
						Object.prototype.hasOwnProperty.call(l, a) || (a = "Blank"), this.effect = new l[a](t, e, {
							time: n.time,
							easing: n.easing,
							direction: d(n.direction, n.orientation)
						}), this.effect.parentClass = this, this.callbackData = s, this.effect.make()
					}
					stop() {
						this.effect && (this.effect.destroy(), this.effect = null), this.callbackData = null
					}
					destroy() {
						this.stop(), this.off("effectStart"), this.off("effectEnd"), this.isMove = !1, super.destroy()
					}
				}
				const p = c
			},
			8004: (t, e, i) => {
				i.d(e, {
					XY: () => o,
					Xu: () => n
				});
				var s = i(511);
				const o = s.Mu + "-thumbnail",
					n = s.Mu + "-selector"
			},
			6499: (t, e, i) => {
				i.a(t, (async(t, s) => {
					try {
						i.r(e), i.d(e, {
							default: () => w
						});
						var o = i(7741),
							n = i(7985),
							a = i(935),
							h = i(8004),
							r = i(2353),
							l = i(8462),
							d = i(5654),
							c = i(8479),
							p = i(8630),
							u = i(7889),
							m = i(7746),
							g = t([l]);
						l = (g.then ? (await g)() : g)[0];
						const v = ["spin", "zoom", "image", "video", "model"],
							f = (t, e) => {
								let i = null;
								if (o.A.isString(e)) i = t[e];
								else if (Array.isArray(e)) {
									const s = e.shift();
									t[s] && (i = e.length ? f(t[s], e) : t[s])
								}
								return i
							},
							y = (t, e) => {
								const i = new RegExp("^" + e + "\\.");
								return t.split(";").map((t => t.trim())).filter((t => i.test(t) && "" !== t)).map((t => {
									const e = t.split(":").map((t => t.trim()));
									return [e[0].replace(i, ""), e[1]].join(":")
								})).join(";")
							};
						class S extends n.A {
							constructor(t, e, i, s) {
								super(), this.node = t, this.slider = null, this.lazyInit = s, this.options = {
									common: {},
									local: {}
								}, this.componentOptions = {
									spin: {
										common: {},
										local: {},
										breakpoints: []
									},
									zoom: {
										common: {},
										local: {},
										breakpoints: []
									},
									image: {
										common: {},
										local: {},
										breakpoints: []
									},
									video: {
										common: {},
										local: {},
										breakpoints: []
									},
									model: {
										common: {},
										local: {},
										breakpoints: []
									}
								}, this.breakpoints = [], this.sliderBuilder = new a.Ay(e, this.node), this.parseOptions(e), this.toolOptions = null, this.inViewTimer = null, this.isRun = !1, this.onResizeDebounce = null, this.api = {
									isReady: this.isReady.bind(this),
									items: this.items.bind(this),
									disableItem: this.disableItem.bind(this),
									enableItem: this.enableItem.bind(this),
									enableGroup: this.enableGroup.bind(this),
									disableGroup: this.disableGroup.bind(this),
									switchGroup: this.switchGroup.bind(this),
									insertItem: this.insertItem.bind(this),
									removeItem: this.removeItem.bind(this),
									removeAllItems: this.removeAllItems.bind(this),
									jump: this.jump.bind(this),
									itemsCount: this.itemsCount.bind(this),
									next: this.next.bind(this),
									prev: this.prev.bind(this),
									isFullscreen: this.isFullscreen.bind(this),
									fullscreen: this.fullscreen.bind(this),
									child: this.child.bind(this),
									play: this.play.bind(this),
									pause: this.pause.bind(this),
									sortItems: this.sortItems.bind(this)
								}, this.on("viewerPublicEvent", (t => {
									Object.assign(t.data.slider, this.api), t.data.slide && (t.data.slide.parent = () => this.api, t.data.slide[t.data.slide.component] && (t.data.slide[t.data.slide.component].parent = () => t.data.slide))
								})), this.createOptions();
								const o = this.toolOptions.get("autostart");
								(o && "off" !== o || i) && this.run()
							}
							parseGlobalOptions(t) {
								var e, i;
								const s = "viewer";
								this.options.common = {
									common: f(t.common, s) || {},
									mobile: f(t.mobile, s) || {},
									breakpoints: Array.isArray(null == (e = t.common) || null == (i = e.viewer) ? void 0 : i.breakpoints) ? (0, m.A)([], t.common.viewer.breakpoints) : []
								}, v.forEach((e => {
									this.componentOptions[e].common = {
										common: f(t.common || {}, [s, e]) || f(t.common || {}, e) || {},
										mobile: f(t.mobile || {}, [s, e]) || f(t.mobile || {}, e) || {}
									}
								})), [this.options.common.common, this.options.common.mobile].forEach((t => {
									["breakpoints"].concat(v).forEach((e => {
										t[e] && delete t[e]
									}))
								}))
							}
							parsePrivateOptions() {
								this.options.local = {
									common: this.node.attr("data-options") || "",
									mobile: this.node.attr("data-mobile-options") || "",
									breakpoints: (0, u.A)(this.node.attr("data-breakpoints"))
								}, v.forEach((t => {
									this.componentOptions[t].local = {
										common: y(this.options.local.common, t),
										mobile: y(this.options.local.mobile, t)
									}
								}))
							}
							parseOptions(t) {
								this.parseGlobalOptions(t), this.parsePrivateOptions(), this.breakpoints = [], [this.options.common.breakpoints, this.options.local.breakpoints].forEach((t => {
									null != t && t.length && this.breakpoints.push({
										instance: new p.A(t),
										last: null
									})
								}))
							}
							getBreakpointSize() {
								return o.A.$(this.node).size.width
							}
							createOptions() {
								const t = {
									spin: /^spin/,
									zoom: /^zoom/,
									image: /^image/,
									video: /^video/,
									model: /^model/
								};
								if (this.toolOptions = new o.A.Options(r.A), this.toolOptions.fromJSON(this.options.common.common), this.toolOptions.fromString(this.options.local.common || "", t), v.forEach((t => {
										this.componentOptions[t].breakpoints = []
									})), this.breakpoints.length) {
									const t = this.getBreakpointSize();
									this.breakpoints.forEach((e => {
										e.last = (0, m.A)({}, e.instance.searchOptions(t)), v.forEach((t => {
											e.last[t] && (this.componentOptions[t].breakpoints.push(e.last[t]), delete e.last[t])
										})), this.toolOptions.fromJSON(e.last)
									}))
								} else o.A.browser.touchScreen && o.A.browser.mobile && (this.toolOptions.fromJSON(this.options.common.mobile), this.toolOptions.fromString(this.options.local.mobile || "", t))
							}
							updateOptions() {
								this.createOptions(), this.slider.updateOptions({
									options: this.toolOptions,
									slideOptions: this.componentOptions
								})
							}
							setBreakpointResize() {
								this.breakpoints.length && (this.onResizeDebounce && (o.A.$(window).removeEvent("resize", this.onResizeDebounce), this.onResizeDebounce.cancel()), this.onResizeDebounce = (0, c.A)((() => {
									let t = !1;
									const e = this.getBreakpointSize();
									this.breakpoints.forEach((i => {
										const s = i.instance.searchOptions(e);
										(0, d.A)(i.last || {}, s) || (t = !0)
									})), t && this.updateOptions()
								}), 16), o.A.$(window).addEvent("resize", this.onResizeDebounce))
							}
							createSlider() {
								this.slider = new l.A(this.node, {
									options: this.toolOptions,
									slideOptions: this.componentOptions,
									lazyInit: this.lazyInit,
									hasBreakpoints: !!this.breakpoints.length
								}), this.slider.parentClass = this, this.api.id = this.slider.id, this.setBreakpointResize()
							}
							run(t) {
								return this.isRun = !0, this.sliderBuilder.getOptions().then((e => {
									this.parseOptions(e), t && this.createOptions(), this.node = this.sliderBuilder.buildViewer(), this.createSlider()
								})).catch((t => {
									console.log("Sirv: cannot get view from " + t.error)
								})), !0
							}
							isReady() {
								var t;
								return !(null == this || null == (t = this.slider) || !t.isReady)
							}
							isFullscreen() {
								return this.isReady() && 2 === this.slider.fsState
							}
							startFullInit(t, e, i) {
								if (this.slider) {
									this.lazyInit = i, this.parseOptions(t), this.createOptions();
									const s = this.toolOptions.get("autostart");
									(s && "off" !== s || e) && (this.slider.startFullInit({
										options: this.toolOptions,
										slideOptions: this.componentOptions,
										hasBreakpoints: !!this.breakpoints.length,
										lazyInit: this.lazyInit
									}), this.setBreakpointResize())
								}
							}
							start() {
								return !this.slider && this.run(!0)
							}
							stop() {
								return !!this.slider && (this.onResizeDebounce && (o.A.$(window).removeEvent("resize", this.onResizeDebounce), this.onResizeDebounce.cancel(), this.onResizeDebounce = null), this.slider.destroy(), this.slider = null, this.off("viewerPublicEvent"), this.isRun = !1, this.sliderBuilder.destroy(), this.sliderBuilder = null, this.destroy(), !0)
							}
							insertItem(t, e) {
								if (!this.isReady()) return !1;
								if (o.A.isString(t)) {
									const e = o.A.$new("div");
									e.node.innerHTML = t.trim(), !(t = e.node.firstChild) || 3 !== t.nodeType && 8 !== t.nodeType && ["div", "img", h.XY].includes(o.A.$(t).tagName) || (t = null)
								} else if (o.A.$(t).tagName === h.XY) {
									const e = o.A.$new("div");
									e.append(t), t = e.node
								}
								return this.slider.insertSlide(e, t)
							}
							removeItem(t) {
								return !!this.isReady() && this.slider.removeSlide(t)
							}
							removeAllItems() {
								if (!this.isReady()) return !1;
								let t = !0;
								for (let e = this.itemsCount() - 1; e >= 0; e--) {
									const i = this.slider.removeSlide(e);
									t && (t = i)
								}
								return t
							}
							itemsCount(t) {
								var e;
								return this.isReady() && (null == (e = this.items(t)) ? void 0 : e.length) || 0
							}
							items(t) {
								return this.isReady() ? this.slider.getItems(t).map((t => (t.parent = () => this.api, t))) : null
							}
							disableItem(t) {
								return !!this.isReady() && this.slider.disableSlide(t)
							}
							enableItem(t) {
								return !!this.isReady() && this.slider.enableSlide(t)
							}
							enableGroup(t) {
								return !!this.isReady() && this.slider.enableSlideGroup(t)
							}
							disableGroup(t) {
								return !!this.isReady() && this.slider.disableSlideGroup(t)
							}
							switchGroup(t) {
								return !!this.isReady() && this.slider.switchGroup(t)
							}
							jump(t) {
								return !!this.isReady() && this.slider.jump(t)
							}
							next() {
								return !!this.isReady() && this.slider.jump("next")
							}
							prev() {
								return !!this.isReady() && this.slider.jump("prev")
							}
							fullscreen() {
								return !!this.isReady() && (this.isFullscreen() ? this.slider.exitFullScreen() : this.slider.enterFullScreen())
							}
							child(t) {
								let e = null;
								return this.isReady() && (t = "number" === o.A.typeOf(t) || o.A.isString(t) ? t : null, e = this.slider.getSlide(t), e && (e.parent = () => this.api)), e
							}
							play(t) {
								return !!this.isReady() && this.slider.play(t)
							}
							pause() {
								return !!this.isReady() && this.slider.pause()
							}
							sortItems(t) {
								this.isReady() && this.slider.sortItems(t)
							}
							isEqual(t) {
								return t === this.node
							}
							checkReadiness(t, e) {
								return !!this.isReady() && this.slider.checkReadiness(t, e)
							}
							sendEvent(t, e) {
								this.isReady() && this.slider.sendReadyEvent(t, e)
							}
						}
						const w = S;
						s()
					} catch (t) {
						s(t)
					}
				}))
			},
			6687: (t, e, i) => {
				i.d(e, {
					A: () => p
				});
				var s = i(511),
					o = i(7741);
				const n = "fullscreen",
					a = s.Mu + "-button-" + n + "-open",
					h = s.Mu + "-button-" + n + "-close",
					r = s.Mu + "-button-hidden",
					l = 0,
					d = 1,
					c = 2,
					p = class {
						constructor(t, e) {
							this.options = Object.assign({
								enterAriaLabel: "",
								exitAriaLabel: ""
							}, e || {}), this.button = o.A.$new("div").addClass(s.Mu + "-button").addClass(s.Mu + "-button-" + n).addClass(a).attr("tabindex", 0).attr("role", "button").attr("aria-label", this.options.enterAriaLabel), this.button.append(o.A.$new("div").addClass(s.Mu + "-icon").attr("aria-hidden", "true")), this.state = s.a0.CLOSED, this.placement = (t => {
								switch (t) {
									case "standard":
										return d;
									case "fullscreen":
										return c;
									default:
										return l
								}
							})(t), this.isShown = !0, this.isDisabled = !1
						}
						static get FULLSCREEN() {
							return "fullscreen"
						}
						static get STANDARD() {
							return "standard"
						}
						get node() {
							return this.button
						}
						setOptions(t) {
							this.options.enterAriaLabel = t.enterAriaLabel, this.options.exitAriaLabel = t.exitAriaLabel, this.button.attr("aria-label", this.state === s.a0.OPENED ? this.options.exitAriaLabel : this.options.enterAriaLabel)
						}
						onClick(t) {
							this.button.addEvent(["btnclick", "tap"], (e => {
								e.stop(), t()
							})), this.button.store("action", t)
						}
						show() {
							(this.placement === l || this.placement === c && this.state === s.a0.OPENED || this.placement === d && this.state === s.a0.CLOSED) && (this.isShown = !0, this.button.removeClass(r), this.isDisabled || this.button.attr("tabindex", 0))
						}
						hide() {
							this.isShown = !1, this.button.addClass(r), this.button.removeAttr("tabindex")
						}
						enable() {
							(this.placement === l || this.placement === c && this.state === s.a0.OPENED || this.placement === d && this.state === s.a0.CLOSED) && (this.isDisabled = !1, this.button.removeAttr("disabled"), this.isShown && this.button.attr("tabindex", 0))
						}
						disable() {
							this.isDisabled = !0, this.button.attr("disabled", "disabled"), this.button.removeAttr("tabindex")
						}
						toFullscreen() {
							this.state = s.a0.OPENED, this.button.removeClass(a).addClass(h), this.button.attr("aria-label", this.options.exitAriaLabel)
						}
						toStandard() {
							this.state = s.a0.CLOSED, this.button.removeClass(h).addClass(a), this.button.attr("aria-label", this.options.enterAriaLabel)
						}
						destroy() {
							this.button.del("action"), this.button.clearEvents().remove(), this.button = null
						}
					}
			},
			3125: (t, e, i) => {
				i.d(e, {
					A: () => n
				});
				var s = i(7741),
					o = i(4357);
				const n = (t, e, i, n) => {
					let a = -1;
					if (s.A.isString(t)) switch (t) {
						case "next":
							t = e + 1;
							break;
						case "prev":
							t = e - 1
					}
					return "number" === s.A.typeOf(t) && (a = t, a < 0 ? a = n ? (0, o.A)(a, i) : 0 : t >= i && (a = n ? (0, o.A)(a, i) : i - 1)), a
				}
			},
			7292: (t, e, i) => {
				i.d(e, {
					A: () => o
				});
				var s = i(7741);
				const o = t => s.A.isString(t) && t.trim() || null
			},
			2353: (t, e, i) => {
				i.d(e, {
					A: () => s
				});
				const s = {
					orientation: {
						type: "string",
						enum: ["horizontal", "vertical"],
						default: "horizontal"
					},
					arrows: {
						type: "boolean",
						default: !0
					},
					loop: {
						type: "boolean",
						default: !0
					},
					quality: {
						type: "number",
						minimum: 0,
						maximum: 100,
						default: 80
					},
					hdQuality: {
						type: "number",
						minimum: 0,
						maximum: 100,
						default: 60
					},
					itemsOrder: {
						type: "array",
						default: []
					},
					autostart: {
						oneOf: [{
							type: "string",
							enum: ["created", "visible", "off"]
						}, {
							type: "boolean",
							enum: [!1]
						}],
						default: "visible"
					},
					threshold: {
						type: "number",
						minimum: 0,
						default: 0
					},
					layout: {
						type: {
							type: "string",
							enum: ["slider", "grid"],
							default: "slider"
						},
						aspectRatio: {
							oneOf: [{
								type: "string",
								enum: ["auto"]
							}, {
								type: "number"
							}],
							default: "auto"
						},
						grid: {
							columns: {
								type: "number",
								minimum: 1,
								default: 2
							},
							gap: {
								type: "number",
								minimum: 0,
								default: 20
							}
						}
					},
					slide: {
						first: {
							type: "number",
							minimum: 0,
							default: 0
						},
						delay: {
							type: "number",
							minimum: 9,
							default: 3e3
						},
						preload: {
							type: "boolean",
							default: !0
						},
						autoplay: {
							type: "boolean",
							default: !1
						},
						animation: {
							type: {
								oneOf: [{
									type: "string",
									enum: ["off", "slide", "fade"]
								}, {
									type: "boolean",
									enum: [!1]
								}],
								default: "fade"
							},
							duration: {
								type: "number",
								minimum: 9,
								default: 200
							}
						},
						socialbuttons: {
							enable: {
								type: "boolean",
								default: !1
							},
							types: {
								facebook: {
									type: "boolean",
									default: !0
								},
								twitter: {
									type: "boolean",
									default: !0
								},
								linkedin: {
									type: "boolean",
									default: !0
								},
								reddit: {
									type: "boolean",
									default: !0
								},
								tumblr: {
									type: "boolean",
									default: !0
								},
								pinterest: {
									type: "boolean",
									default: !0
								},
								telegram: {
									type: "boolean",
									default: !0
								}
							}
						}
					},
					thumbnails: {
						enable: {
							type: "boolean",
							default: !0
						},
						size: {
							type: "number",
							minimum: 5,
							default: 70
						},
						position: {
							type: "string",
							enum: ["top", "left", "right", "bottom"],
							default: "bottom"
						},
						type: {
							type: "string",
							enum: ["square", "auto", "bullets", "grid", "crop"],
							default: "square"
						},
						trigger: {
							type: "string",
							enum: ["click", "hover"],
							default: "click"
						},
						align: {
							type: "string",
							enum: ["center", "start"],
							default: "center"
						},
						always: {
							type: "boolean",
							default: !1
						},
						target: {
							oneOf: [{
								type: "string"
							}, {
								type: "boolean",
								enum: [!1]
							}],
							default: !1
						},
						watermark: {
							type: "boolean",
							default: !0
						}
					},
					fullscreen: {
						enable: {
							type: "boolean",
							default: !0
						},
						always: {
							type: "boolean",
							default: !1
						},
						native: {
							type: "boolean",
							default: !1
						},
						history: {
							type: "boolean",
							default: !0
						},
						thumbnails: {
							enable: {
								type: "boolean",
								default: !0
							},
							size: {
								oneOf: [{
									type: "string",
									enum: ["auto"]
								}, {
									type: "number",
									minimum: 5
								}],
								default: "auto"
							},
							position: {
								type: "string",
								enum: ["top", "left", "right", "bottom"],
								default: "bottom"
							},
							type: {
								type: "string",
								enum: ["square", "auto", "bullets", "grid", "crop"],
								default: "square"
							},
							trigger: {
								type: "string",
								enum: ["auto", "click", "hover"],
								default: "auto"
							},
							align: {
								type: "string",
								enum: ["center", "start"],
								default: "center"
							},
							always: {
								type: "boolean",
								default: !1
							},
							autohide: {
								type: "boolean",
								default: !1
							},
							watermark: {
								type: "boolean",
								default: !0
							}
						}
					},
					contextmenu: {
						enable: {
							type: "boolean",
							default: !1
						},
						text: {
							zoom: { in : {
									oneOf: [{
										type: "string"
									}, {
										type: "boolean",
										enum: [!1]
									}],
									default: "Zoom In"
								},
								out: {
									oneOf: [{
										type: "string"
									}, {
										type: "boolean",
										enum: [!1]
									}],
									default: "Zoom Out"
								}
							},
							fullscreen: {
								enter: {
									oneOf: [{
										type: "string"
									}, {
										type: "boolean",
										enum: [!1]
									}],
									default: "Enter Full Screen"
								},
								exit: {
									oneOf: [{
										type: "string"
									}, {
										type: "boolean",
										enum: [!1]
									}],
									default: "Exit Full Screen"
								}
							},
							download: {
								oneOf: [{
									type: "string"
								}, {
									type: "boolean",
									enum: [!1]
								}],
								default: "Download Image"
							}
						}
					},
					productdetail: {
						enable: {
							type: "boolean",
							default: !1
						},
						position: {
							type: "string",
							enum: ["top", "right", "bottom", "left"],
							default: "top"
						}
					},
					a11y: {
						galleryLabel: {
							type: "string",
							default: "Product gallery"
						},
						galleryRole: {
							type: "string",
							default: "carousel"
						},
						nextItem: {
							type: "string",
							default: "Next item"
						},
						prevItem: {
							type: "string",
							default: "Previous item"
						},
						enterFullscreen: {
							type: "string",
							default: "Enter fullscreen"
						},
						exitFullscreen: {
							type: "string",
							default: "Exit fullscreen"
						},
						itemLabel: {
							type: "string",
							default: "Item %{index}"
						},
						itemRole: {
							type: "string",
							default: "slide"
						},
						thumbnailLabel: {
							type: "string",
							default: "Show item %{index}"
						},
						scrollForward: {
							type: "string",
							default: "Scroll thumbnails forward"
						},
						scrollBackward: {
							type: "string",
							default: "Scroll thumbnails backward"
						},
						showThumbnails: {
							type: "string",
							default: "Show thumbnails"
						},
						hideThumbnails: {
							type: "string",
							default: "Hide thumbnails"
						},
						zoomIn: {
							type: "string",
							default: "Zoom in"
						},
						zoomOut: {
							type: "string",
							default: "Zoom out"
						}
					}
				}
			},
			4003: (t, e, i) => {
				i.d(e, {
					A: () => T
				});
				var s = i(8479),
					o = i(7741);
				const n = t => {
					let e = null,
						i = o.A.$(t).getCss("transform") + "";
					const s = (t, e) => {
						const i = {},
							s = ["x", "y", "z"];
						return t.forEach((function(t, o) {
							var n;
							i[s[o]] = (n = e[t], parseFloat(n.trim()))
						})), i
					};
					if ("none" !== i) {
						e = {}, i = i.split("(")[1], i = i.split(")")[0], i = i.split(",");
						const t = i.length > 6;
						e.transform = s(t ? [12, 13, 14] : [4, 5], i), e.scale = s(t ? [0, 5, 10] : [0, 3], i)
					}
					return e
				};
				var a = i(5654),
					h = i(757),
					r = i(511),
					l = i(7985),
					d = i(4681),
					c = i(7746),
					p = i(3287);
				const u = {
					width: 560,
					height: 315
				};
				var m = i(8004);
				class g extends l.A {
					constructor(t, e, i, s) {
						super(), this.node = o.A.$(t), this.type = e, this.size = i, this.orientation = s, this.getPlaceholderSizePromise = null, this.destroyed = !1, this.loaded = !1, this.content = null, this.node.tagName === m.XY && (this.content = Array.from(this.node.node.childNodes))
					}
					changeOrientation() {}
					isLoaded() {
						return this.loaded
					}
					setCssSize() {
						this.node.setCss(this.selectorSize)
					}
					get selectorSize() {
						const t = {};
						return ["square", "crop"].includes(this.type) ? (t.width = this.size, t.height = this.size) : "horizontal" === this.orientation ? t.height = this.size : t.width = this.size, t
					}
					get placeholderSize() {
						return this.getPlaceholderSizePromise || (this.getPlaceholderSizePromise = new Promise((t => {
							const e = this.selectorSize;
							if (e.width && e.height) t(e);
							else if (this.destroyed) t({
								width: 0,
								height: 0
							});
							else {
								let i;
								this.proportion.then((t => {
									i = t
								})).finally((() => {
									e.width ? e.height = i.height / i.width * e.width : e.width = i.width / i.height * e.height, t(e)
								}))
							}
						}))), this.getPlaceholderSizePromise
					}
					get proportion() {
						return Promise.resolve(u)
					}
					complete() {
						return this.node.setCss({
							width: "",
							height: ""
						}), this.setCssSize(), Promise.resolve()
					}
					appendTo(t) {
						this.content ? this.content.forEach((e => {
							t.append(e)
						})) : t.append(this.node)
					}
					destroy() {
						var t;
						this.destroyed = !0, null == (t = this.node) || t.setCss({
							width: "",
							height: ""
						}), this.node = null, this.getPlaceholderSizePromise = null, super.destroy()
					}
				}
				const v = g,
					f = class extends v {
						constructor(t, e, i, s, o) {
							super(t, e, i, s), this.imageOrientation = "horizontal", this.isSirv = !1, this.watermark = o, this.src = null, this.srcset = null, this._imageSize = {
								width: 0,
								height: 0
							}, this.getProportionPromise = null, this.proportionSize = u, this.getUrlPromise = null, this.loadImagePromise = null
						}
						changeOrientation(t) {
							this.orientation = t, this.node.setCss({
								width: "",
								height: ""
							}), this.setCssSize()
						}
						setCssSize() {
							["square", "crop"].includes(this.type) ? this.customSquare() : this.removeCustomSquare(), super.setCssSize()
						}
						get selectorSize() {
							const t = super.selectorSize;
							return "auto" !== this.type || !this.isLoaded() || this._imageSize.width || this._imageSize.height || ("horizontal" === this.orientation ? t.width = t.height * (this.proportionSize.width / this.proportionSize.height) : t.height = t.width * (this.proportionSize.height / this.proportionSize.width)), t
						}
						get proportion() {
							return this.getProportionPromise || (this.getProportionPromise = new Promise(((t, e) => {
								this.destroyed ? t({
									width: 0,
									height: 0
								}) : this.emit("getSelectorProportion", {
									data: {
										resultingCallback: e => {
											let i = e.size;
											this.isSirv = e.isSirv, i ? (i.width || (i = u), this.proportionSize = i, t(i)) : t(u)
										}
									}
								})
							}))), this.getProportionPromise
						}
						setImageUrl(t, e, i, s) {
							if (this.src = t, this.srcset = e, this.node) {
								let t = this.node;
								"img" !== t.tagName && (t = o.A.$(this.node.node.firstChild)), (this.src || this.srcset) && (s && t.attr("referrerpolicy", s), this.srcset ? t.attr("srcset", this.srcset + " 2x") : t.removeAttr("srcset"), t.attr("src", this.src), o.A.browser.mobile || t.addEvent("mousedown", (t => {
									t.stopDefaults()
								}))), i && t.attr("alt", i)
							}
						}
						get url() {
							return this.getUrlPromise || (this.getUrlPromise = new Promise(((t, e) => {
								this.destroyed ? t(this) : this.emit("getSelectorImgUrl", {
									data: {
										crop: "crop" === this.type,
										type: this.type,
										watermark: this.watermark,
										size: this.selectorSize,
										resultingCallback: i => {
											i ? (this.setImageUrl(i.src, i.srcset, i.alt, i.referrerpolicy), t(this)) : e(this)
										}
									}
								})
							}))), this.getUrlPromise
						}
						set imageSize(t) {
							this._imageSize = t, this.imageOrientation = this._imageSize.width >= this._imageSize.height ? "horizontal" : "vertical"
						}
						loadImage() {
							return this.loadImagePromise || (this.loadImagePromise = new Promise(((t, e) => {
								if (this.node) {
									const i = "div" !== this.node.tagName ? this.node.node : this.node.node.firstChild;
									(0, p.A)(this.isSirv ? i : i.src).then((e => {
										this.loaded = !0, this.imageSize = e.size, this.setCssSize(), t(this)
									})).catch((i => {
										this.destroyed ? t(this) : e(this)
									}))
								} else t(this)
							}))), this.loadImagePromise
						}
						resetPromises() {
							this.getUrlPromise = null, this.loadImagePromise = null
						}
						customSquare() {
							if ("div" !== this.node.tagName) {
								const t = o.A.$new("div").setCss({
									overflow: "hidden",
									position: "relative"
								});
								this.node.attr("data-image-orientation", this.imageOrientation), t.append(this.node), this.node = t
							}
						}
						removeCustomSquare() {
							this.node && "div" === this.node.tagName && (this.node.removeEvent(["touchstart", "selectstart", "contextmenu"]), this.node.remove(), this.node = o.A.$(this.node.node.firstChild), this.node.setCss({
								width: "",
								height: "",
								maxWidth: ""
							}), this.node.removeAttr("data-image-orientation"))
						}
						complete() {
							return this.url.then((() => this.loadImage()))
						}
						destroy() {
							var t;
							null == (t = this.node) || t.removeEvent("mousedown"), this.getProportionPromise = null, this.getUrlPromise = null, this.loadImagePromise = null, super.destroy()
						}
					},
					y = {
						NONE: 0,
						STANDARD: 1,
						FULLSCREEN: 2
					},
					S = t => t instanceof f,
					w = (t, e) => {
						e ? t.node.innerHTML = "" : t.addClass(r.Mu + "-hide-bullet-body")
					};
				class b extends l.A {
					constructor(t, e, i, s, n, a) {
						super(), this.UUID = s, this.options = (0, c.A)({
							standard: {
								type: "square",
								size: 70,
								orientation: "horizontal",
								watermark: !0
							},
							fullscreen: {
								type: "square",
								size: 70,
								orientation: "horizontal",
								watermark: !0
							},
							activeClass: r.Mu + "-active",
							placeholderClass: r.Mu + "-thumbnail-placeholder",
							selectorContent: null,
							disabled: !1,
							thumbnailLabel: ""
						}, n || {}), this.parentContainer = o.A.$(t), this._index = e, this.selector = o.A.$(i) || o.A.$new("div"), this.selector.attr("role", "button").attr("area-controls", r.Mu + "-" + this.UUID), this._container = o.A.$new("div").addClass(r.Mu + "-item").setCss({
							display: "inline-block"
						}), this.placeholder = o.A.$new("div").addClass(this.options.placeholderClass), this._size = {
							width: 0,
							height: 0
						}, this.currentObject = null, this.actived = !1, this._disabled = !1, this._destroyed = !1, this._container.append(this.selector), this.parentContainer.append(this._container), this.options.disabled && this.disable(), this.infoPromise = a || Promise.resolve(!1), this.state = y.NONE, this.triggerHandler = t => {
							t.stop();
							const e = "mouseenter" === t.type ? "thumbnailHover" : "thumbnailClick";
							this.emit("selectorAction", {
								data: this.UUID,
								type: e
							})
						}, this.initPromise = null, this.setAriaLabel(), this.init()
					}
					setOptions(t) {
						const e = JSON.parse(JSON.stringify(this.options));
						if (this.options = (0, c.A)((0, c.A)({}, this.options), t), (0, a.A)(this.options.standard, e.standard) && (0, a.A)(this.options.fullscreen, e.fullscreen)) return;
						this.setAriaLabel();
						const i = (0, a.A)(this.options.standard, this.options.fullscreen),
							s = (this.standard || this.fullscreen) instanceof f;
						var o;
						if ((0, a.A)(this.options.standard, e.standard, ["orientation"])) {
							if (this.options.standard.orientation !== e.standard.orientation) {
								var n;
								null == (n = this.standard) || n.changeOrientation(this.options.standard.orientation)
							}
						} else i && (null == (o = this.standard) || o.destroy(), this.fullscreen = null), this.standard = this.createContent(this.options.standard), w(this.selector, s), this._container.attr("data-selector-type", this.options.standard.type), this.standard ? (this.currentObject = this.standard, this.selector.attr("data-type") || this.selector.setCssProp("font-size", 0), this.standard.proportion.then((() => this.standard.complete())).then((() => {
							this.standard.appendTo(this.selector), this.emit("resize")
						})).catch((t => {
							console.log(t)
						}))) : (this.currentObject = this.options.standard.type, this.selector.setCss({
							width: "",
							height: ""
						}));
						if (!this.fullscreen && i) this.fullscreen = this.standard;
						else if ((0, a.A)(this.options.fullscreen, e.fullscreen, ["orientation"])) {
							if (this.options.fullscreen.orientation !== e.fullscreen.orientation) {
								var h;
								null == (h = this.fullscreen) || h.changeOrientation(this.options.fullscreen.orientation)
							}
						} else {
							const t = this.fullscreen !== this.standard;
							var r, l;
							t && (null == (r = this.fullscreen) || r.destroy()), this.fullscreen = this.createContent(this.options.fullscreen), w(this.selector, s), !S(this.standard) && t && (null == (l = this.standard) || l.proportion.then((() => this.standard.complete())))
						}
						this.emit("resize")
					}
					reloadThumbnail() {
						this.standard && S(this.standard) && (this.standard.resetPromises(), this.state === y.STANDARD && this.standard.complete()), this.fullscreen && S(this.fullscreen) && this.standard !== this.fullscreen && (this.fullscreen.resetPromises(), this.state === y.FULLSCREEN && this.fullscreen.complete())
					}
					init() {
						return this.initPromise || (this.initPromise = this.infoPromise.then((() => {
							this._destroyed || (this.standard = this.createContent(this.options.standard), this.standard && S(this.standard) && (0, a.A)(this.options.standard, this.options.fullscreen) ? this.fullscreen = this.standard : this.fullscreen = this.createContent(this.options.fullscreen), this.selector.append(this.placeholder), this.selector.attr("data-type") || this.selector.setCssProp("font-size", 0), this.selector.attr("tabindex", 0), this.selector.store("action", (() => {
								this.emit("selectorAction", {
									data: this.UUID,
									type: "thumbnailClick"
								})
							})), this.addEvents(), this.addCustomClick(), this.selector.addEvent("focusin", (t => {
								this.actived || this.emit("selectorFocusedIn", {
									data: {
										uuid: this.UUID,
										index: this._index
									}
								})
							})))
						}))), this.initPromise
					}
					createContent(t) {
						let e;
						if (this.selector.removeClass(r.Mu + "-hide-bullet-body"), "bullets" !== t.type) {
							if (this.options.selectorContent) e = new v(this.options.selectorContent, t.type, t.size, t.orientation);
							else {
								const i = o.A.$(new Image);
								e = new f(i, t.type, t.size, t.orientation, t.watermark)
							}
							e.parentClass = this
						}
						return e
					}
					get proportion() {
						return new Promise(((t, e) => {
							this.init().then((() => {
								let i = Promise.resolve();
								this._disabled || (this.state === y.FULLSCREEN && this.fullscreen ? i = this.fullscreen.proportion : this.standard && (i = this.standard.proportion)), i.then(t).catch(e)
							}))
						}))
					}
					get canActivate() {
						return this.options.activated
					}
					addEvents() {
						this.on("getSelectorProportion", (t => {
							t.data.UUID = this.UUID
						})), this.on("getSelectorImgUrl", (t => {
							t.data.UUID = this.UUID
						}))
					}
					addPlaceholder(t, e) {
						this._container.attr("data-selector-type", t), this.selector.append(this.placeholder), this.placeholder.setCss(e)
					}
					toggle(t) {
						return new Promise(((e, i) => {
							this.init().then((() => {
								let s;
								const o = Promise.resolve();
								if (this.state !== t)
									if (this.state = t, this._disabled) s = o;
									else {
										let e = this.standard,
											i = this.options.standard.type;
										t === y.FULLSCREEN && (e = this.fullscreen, i = this.options.fullscreen.type), "bullets" === i ? (w(this.selector, (this.standard || this.fullscreen) instanceof f), this.selector.setCss({
											width: "",
											height: ""
										}), this.currentObject = i, this._container.attr("data-selector-type", i), this.emit("resize"), s = o) : (e instanceof f || this._container.attr("data-selector-type", i), s = new Promise(((s, o) => {
											e ? e.placeholderSize.then((o => {
												if (this.state !== t || this._destroyed) s();
												else {
													if (!e.isLoaded() && !this.options.selectorContent) {
														for (; this.selector.node.firstChild;) this.selector.node.removeChild(this.selector.node.firstChild);
														this.addPlaceholder(i, o)
													}
													s(), e.complete().then((() => {
														if (this.state === t && !this._destroyed) {
															for (this._container.attr("data-selector-type", i), this.placeholder.remove(); this.selector.node.firstChild;) this.selector.node.removeChild(this.selector.node.firstChild);
															e.appendTo(this.selector), this.currentObject = e, this.emit("resize")
														}
													})).catch((() => {}))
												}
											})) : s()
										})))
									} else s = o;
								s.then(e).catch(i)
							}))
						}))
					}
					addTriggers() {
						this._container.addEvent(["btnclick", "tap", "mouseenter"], this.triggerHandler)
					}
					addCustomClick() {
						if (this.options.selectorContent && o.A.$(this.options.selectorContent).tagName === m.XY) {
							const t = o.A.$(this.options.selectorContent).node.querySelectorAll("a");
							Array.from(t).forEach((t => {
								o.A.$(t).addEvent(["btnclick", "tap"], (e => {
									e.stop(), "#" === o.A.$(t).attr("href")[0] ? (window.location.hash = "", window.location.hash = o.A.$(t).attr("href")) : window.open(o.A.$(t).attr("href"))
								}))
							}))
						}
					}
					activate() {
						this.actived || (this.actived = !0, this._container.addClass(this.options.activeClass), this.selector.attr("aria-current", !0))
					}
					get activated() {
						return this.actived
					}
					deactivate() {
						this.actived && (this.actived = !1, this._container.removeClass(this.options.activeClass), this.selector.removeAttr("aria-current"))
					}
					setAriaLabelId(t) {
						t && this.selector.attr("aria-describedby", t)
					}
					setAriaLabel() {
						this.selector.attr("aria-label", this.options.thumbnailLabel.replace("%{index}", this._index + 1))
					}
					get size() {
						return this._size = this._container.size, this._size
					}
					disable() {
						this._disabled || (this._disabled = !0, this.selector.attr("aria-hidden", "true"), this._container.attr("disabled", "true"), this._container.setCssProp("display", "none"), this.deactivate(), this.emit("resize"))
					}
					_toggleForEnable() {
						let t, e;
						if (this.state !== y.NONE && (t = this.state === y.STANDARD ? this.standard || "bullets" : this.fullscreen || "bullets"), t !== this.currentObject) {
							const t = this.state;
							this.state = y.NONE, e = this.toggle(t)
						} else e = Promise.resolve();
						return e
					}
					enable() {
						this._disabled && (this._disabled = !1, this.proportion.finally((() => {
							this._toggleForEnable().then((() => {
								this._disabled || (this.selector.removeAttr("aria-hidden"), this._container.removeAttr("disabled"), this._container.setCssProp("display", ""), this.emit("resize"))
							}))
						})))
					}
					set index(t) {
						this._index = t, this.setAriaLabel()
					}
					get index() {
						return this._index
					}
					get container() {
						return this._container
					}
					get pinnedPosition() {
						return this.options.pinned
					}
					get destroyed() {
						return this._destroyed
					}
					get disabled() {
						return this._disabled
					}
					destroy() {
						var t, e;
						this._destroyed = !0, this.placeholder.remove(), this.off("getSelectorProportion"), this.off("getSelectorImgUrl"), null == (t = this.standard) || t.destroy(), this.standard = null, null == (e = this.fullscreen) || e.destroy(), this.fullscreen = null, this._container.removeEvent(["btnclick", "tap"]), this._container.remove(), this._container = null, this.parentContainer = null, this.selector.del("action"), this.selector.removeEvent("focusin").removeAttr("tabindex").removeAttr("role").removeAttr("aria-labelledby").removeAttr("aria-describedby"), this.selector = null, super.destroy()
					}
				}
				const A = b,
					x = "vertical",
					z = "horizontal",
					C = {
						left: x,
						right: x,
						top: z,
						bottom: z
					},
					I = t => C[t] || z,
					E = "selectors",
					P = r.Mu + "-align-start",
					N = (t, e) => (e ? t += "px, 0" : t = "0, " + t + "px", t);
				class O extends l.A {
					constructor(t, e) {
						super(), this.options = Object.assign({
							isStandardGrid: !1,
							standardStyle: "square",
							standardSize: 70,
							standardPosition: "bottom",
							standardWatermark: !0,
							standardAlign: "center",
							isFullscreenGrid: !1,
							fullscreenStyle: "square",
							fullscreenSize: 70,
							fullscreenPosition: "bottom",
							fullscreenAutohide: !1,
							fullscreenWatermark: !0,
							fullscreenAlign: "center",
							arrows: !0,
							thumbnailLabel: "",
							scrollForward: "",
							scrollBackward: "",
							showThumbnails: "",
							hideThumbnails: "",
							activeClass: r.Mu + "-active"
						}, e || {}), this.instanceNode = o.A.$new("div").addClass(r.Mu + "-" + E).setCss({
							opacity: 0,
							visibility: "hidden",
							transition: ""
						}), this.selectorsContainer = o.A.$new("div").addClass(r.Mu + "-ss"), this.selectorsScroll = o.A.$new("div").addClass(r.Mu + "-scroll").setCss({
							transform: "translate3d(0, 0, 0)"
						}), this.controlButton = o.A.$new("div").addClass(r.Mu + "-" + E + "-toggle-switch").attr("tabindex", 0).attr("role", "button"), this.selectorsScrollContainer = o.A.$new("div").addClass(r.Mu + "-selectors-scroll-container").attr("role", "group").attr("aria-label", "Gallery controls"), this.startPinnedNode = null, this.endPinnedNode = null, this.baseSelectorsList = [], this.pinnedStartList = [], this.pinnedEndList = [], this.isMove = !1, this.currentPosition = 0, this.containerSize = {
							width: 0,
							height: 0
						}, this.halfContainerSize = 0, this.scrollSize = {
							width: 0,
							height: 0
						}, this.halfScrollSize = 0, this.currentActiveItem = null, this.isShown = !1, this.isControlShown = !0, this.isControlInDoc = !1, this.controlDebounce = null, this.isReady = !1, this.resizeTimeout = null, this.isActionsEnabled = !0, this.isDone = !1, this.isInView = !1, this.state = y.STANDARD, this.arrows = null, this._currentStylePosition = this.options.standardPosition, this.longSide = null, this._shortSide = null, this.currentAxis = "x", this.isStarted = !1, this.isDestroyed = !1, this.rtl = !1, t.some((t => !!t.pinned)) && this.initPinnedBlocks(), this.selectors = t.map(((t, e) => this.createSelector(t, e))), this.sortPinnedSelectors(), this.identifyVariables(), this.setContainerCss(), this.updateRTL()
					}
					setOptions(t) {
						var e;
						const i = Object.assign({}, this.options, t);
						if ((0, a.A)(this.options, i)) return;
						const s = this.options.standardPosition;
						this.options = i, "grid" === this.options.standardStyle && "grid" === this.options.fullscreenStyle ? this.destroyArrows() : this.options.arrows && (this.arrows || (this.createArrows(), this.appendArrows())), null == (e = this.arrows) || e.setOptions({
							prevAriaLabel: this.options.scrollBackward,
							nextAriaLabel: this.options.scrollForward
						});
						let o = this.options.standardPosition;
						this.state === y.FULLSCREEN && (o = this.options.fullscreenPosition), o !== this._currentStylePosition && (this._currentStylePosition = o, this.setContainerDisplay()), "start" === this.options.standardAlign ? this.instanceNode.addClass(P) : this.instanceNode.removeClass(P), this.updateRTL(), this.identifyVariables(), this.setContainerCss(), this.selectors.forEach((t => t.setOptions({
							standard: {
								type: this.options.standardStyle,
								size: this.options.standardSize,
								orientation: I(this.options.standardPosition),
								watermark: this.options.standardWatermark
							},
							fullscreen: {
								type: this.options.fullscreenStyle,
								size: this.options.fullscreenSize,
								orientation: I(this.options.fullscreenPosition),
								watermark: this.options.fullscreenWatermark
							},
							thumbnailLabel: this.options.thumbnailLabel
						}))), this.controlButton.attr("aria-label", this.isControlShown ? this.options.hideThumbnails : this.options.showThumbnails), this._currentStylePosition && s !== this._currentStylePosition && this.state === y.STANDARD && this.changeSelectors(1).then(this.getSelectorsSize.bind(this)), this.currentPosition = 0, this.onResize()
					}
					findSelector(t) {
						var e;
						return null != (e = this.selectors.find((e => e.UUID === t))) ? e : null
					}
					get hasPinnedSelector() {
						return !(!this.pinnedStartList.length && !this.pinnedEndList.length)
					}
					insertBefore(t, e) {
						let i = this.selectors,
							s = this.selectorsScroll;
						if (this.hasPinnedSelector) {
							var n, a;
							if ("start" === e.pinnedPosition) i = this.pinnedStartList, s = o.A.$(null != (n = null == (a = this.startPinnedNode) ? void 0 : a.node.firstChild.firstChild) ? n : null);
							else if ("end" === e.pinnedPosition) {
								var h, r;
								i = this.pinnedEndList, s = o.A.$(null != (h = null == (r = this.endPinnedNode) ? void 0 : r.node.firstChild.firstChild) ? h : null)
							} else i = this.baseSelectorsList;
							t = i.indexOf(e)
						}
						let l = null;
						t + 1 < i.length && (l = i[t + 1].container), this.hide(), s.node.insertBefore(e.container.node, l ? l.node : l)
					}
					insert(t, e) {
						e.pinned && (this.initPinnedBlocks(), this.appendPinnedBlocks());
						const i = this.createSelector(e, t);
						this.isDone && i.addTriggers(), this.hide(), this.selectors.splice(t, 0, i), this.selectors.forEach(((t, e) => {
							t.index = e
						})), this.sortPinnedSelectors(), i.proportion.finally((() => {
							this.insertBefore(t, i), i.toggle(this.state), i.setAriaLabelId(e.ariaLabelId)
						}))
					}
					disable(t) {
						const e = this.findSelector(t);
						e && (this.currentActiveItem && this.currentActiveItem === e && (this.currentActiveItem = null), this.hide(), e.disable())
					}
					enable(t) {
						const e = this.findSelector(t);
						e && (this.hide(), e.enable())
					}
					pickOut(t) {
						const e = this.findSelector(t);
						e && (e.destroy(), this.selectors.splice(e.index, 1), this.selectors.forEach(((t, e) => {
							t.index = e
						})), this.sortPinnedSelectors())
					}
					createSelector(t, e) {
						let i = this.selectorsScroll;
						var s, o;
						if ("start" === t.pinned) i = null != (s = null == (o = this.startPinnedNode) ? void 0 : o.node.firstChild.firstChild) ? s : null;
						else if ("end" === t.pinned) {
							var n, a;
							i = null != (n = null == (a = this.endPinnedNode) ? void 0 : a.node.firstChild.firstChild) ? n : null
						}
						const h = new A(i, e, t.node, t.UUID, {
							standard: {
								type: this.options.standardStyle,
								size: this.options.standardSize,
								orientation: I(this.options.standardPosition),
								watermark: this.options.standardWatermark
							},
							fullscreen: {
								type: this.options.fullscreenStyle,
								size: this.options.fullscreenSize,
								orientation: I(this.options.fullscreenPosition),
								watermark: this.options.fullscreenWatermark
							},
							activeClass: this.options.activeClass,
							selectorContent: t.selectorContent,
							disabled: t.disabled,
							pinned: t.pinned,
							activated: t.activated,
							thumbnailLabel: this.options.thumbnailLabel
						}, t.infoPromise);
						return h.parentClass = this, h.setAriaLabelId(t.ariaLabelId), h
					}
					addEventsFromSelectors() {
						let t;
						this.on("selectorAction", (t => {
							t.stopAll(), this.emit("changeSlide", {
								data: {
									UUID: t.data,
									type: t.type
								}
							});
							const e = this.selectors.find((e => e.UUID === t.data));
							void 0 !== e && this.activateItem(e)
						})), this.on("selectorFocusedIn", (t => {
							t.stopAll(), this.isControlInDoc && (this.setControlTimeout(!0), this.selectorsState = !0), setTimeout((() => {
								this.jump(t.data.index, !1)
							}), 200)
						})), this.on("resize", (e => {
							e.stopAll(), clearTimeout(t), t = setTimeout((() => {
								this.onResize()
							}), 16)
						}))
					}
					initPinnedBlocks() {
						if (!this.pinnedBlocksInited) {
							const t = t => o.A.$new("div").addClass(r.Mu + t).append(o.A.$new("div").addClass(r.Mu + "-ss").append(o.A.$new("div").addClass(r.Mu + "-scroll").setCss({
								transform: "translate3d(0, 0, 0)"
							})));
							this.startPinnedNode = t("-selectors-pinned-start"), this.endPinnedNode = t("-selectors-pinned-end")
						}
					}
					get pinnedBlocksInited() {
						return !!this.startPinnedNode && !!this.endPinnedNode
					}
					appendPinnedBlocks() {
						this.pinnedBlocksInited && (this.instanceNode.append(this.startPinnedNode), this.instanceNode.append(this.endPinnedNode))
					}
					sortPinnedSelectors() {
						this.pinnedStartList = this.selectors.filter((t => "start" === t.pinnedPosition)), this.pinnedEndList = this.selectors.filter((t => "end" === t.pinnedPosition)), this.baseSelectorsList = this.selectors.filter((t => !t.pinnedPosition))
					}
					appendArrows() {
						if (this.arrows) {
							this.arrows.hide();
							const t = this.arrows.nodes;
							this.selectorsScrollContainer.append(t[1], "top"), this.selectorsScrollContainer.append(t[0], "top")
						}
					}
					init() {
						this.createArrows(), this.selectorsScrollContainer.append(this.selectorsContainer).appendTo(this.instanceNode), this.appendPinnedBlocks(), this.appendArrows(), this.selectorsContainer.append(this.selectorsScroll), this.isShown = !0, this.hide(), this.identifyVariables(), this.addEventsFromSelectors(), this._currentStylePosition || (this.instanceNode.setCssProp("display", "none"), o.A.$(this.instanceNode.node.parentNode).setCssProp("display", "none")), "start" === this.options.standardAlign && this.instanceNode.addClass(P), Promise.all(this.selectors.map((t => t.proportion))).finally((() => {
							this.isReady = !0, this.emit("selectorsReady")
						}))
					}
					identifyVariables() {
						if (this._currentStylePosition) {
							const t = "horizontal" === I(this._currentStylePosition);
							this.longSide = t ? "width" : "height", this._shortSide = "width" === this.longSide ? "height" : "width", this.currentAxis = t ? "x" : "y"
						} else this.longSide = null, this._shortSide = null
					}
					changeSelectors(t) {
						return Promise.all(this.selectors.map((e => e.toggle(t))))
					}
					getSelectorsSize() {
						return this.selectors.filter((t => !t.destroyed)).map((t => t.size))
					}
					enableActions() {
						this.isActionsEnabled || (this.isActionsEnabled = !0, this.show(), this.options.fullscreenAutohide && (this.selectorsState = !0))
					}
					disableActions() {
						var t;
						this.isActionsEnabled && (this.isActionsEnabled = !1, this.hide(), null == (t = this.controlDebounce) || t.cancel())
					}
					show(t) {
						if (!this.isShown && this.isActionsEnabled && !this.isDestroyed) {
							const e = t ? "" : "opacity 400ms linear";
							this.isShown = !0, this.selectorsScroll.setCss({
								display: "inline-flex"
							}), this.getSizes(), this.jump(this.activatedItem, !0), this.instanceNode.setCss({
								opacity: 1,
								visibility: "visible",
								transition: e
							})
						}
					}
					get activatedItem() {
						return this.currentActiveItem ? this.currentActiveItem.index : 0
					}
					activateCurrentItemByUUID(t) {
						const e = this.findSelector(t);
						e && !this.currentActiveItem && (this.currentActiveItem = e)
					}
					hide() {
						this.isShown && (this.isShown = !1, this.instanceNode.setCss({
							opacity: 0,
							visibility: "hidden",
							transition: ""
						}))
					}
					start(t) {
						!this.isStarted && this.isInView && (this.isStarted = !0, this._currentStylePosition ? this.changeSelectors(1).then((() => h.ms.addMainStyle(t))).then((() => {
							this.isDestroyed || (this.getSelectorsSize(), this.done(), this.show())
						})) : this.done())
					}
					addControl() {
						this.isControlInDoc || (this.instanceNode.addEvent(["mouseover", "mouseout"], (t => {
							let e = t.related;
							for (e && (e = o.A.$(e)); e && e.node !== this.instanceNode.node && e.node !== document.body;) e = e.node.parentNode, e && (e = o.A.$(e));
							e && e.node === this.instanceNode.node || this.setControlTimeout("mouseover" === t.type)
						})), this.controlButton.addEvent(["btnclick", "tap"], (t => {
							this.setControlTimeout(!0), this.selectorsState = !this.isControlShown
						})), this.controlButton.store("action", (() => {
							this.setControlTimeout(!0), this.selectorsState = !this.isControlShown
						})), o.A.$(this.instanceNode.node.parentNode).append(this.controlButton, "top"), this.controlDebounce = (0, s.A)((() => {
							this.selectorsState = !1
						}), 3e3), this.isControlInDoc = !0)
					}
					removeControl() {
						this.isControlInDoc && (this.instanceNode.removeEvent(["mouseover", "mouseout"]), this.controlDebounce.cancel(), this.isControlShown = !0, this.controlButton.removeEvent(["btnclick", "tap"]), this.controlButton.remove(), this.isControlInDoc = !1)
					}
					set selectorsState(t) {
						this.isControlShown = t, this.isControlShown ? this.controlButton.attr("aria-label", this.options.hideThumbnails) : this.controlButton.attr("aria-label", this.options.showThumbnails), this.setControlTimeout(), this.emit("visibility", {
							action: this.isControlShown ? "show" : "hide"
						})
					}
					setControlTimeout(t) {
						this.isControlInDoc && (this.controlDebounce.cancel(), this.isControlShown && !t && this.controlDebounce())
					}
					get node() {
						return this.instanceNode
					}
					get horizontal() {
						return "horizontal" === I(this._currentStylePosition)
					}
					inView(t, e) {
						this.isInView = t, this.start(e)
					}
					done() {
						this.isDone || this.isDestroyed || (this.isDone = !0, this.getSizes(), this.selectors.forEach((t => {
							t.addTriggers()
						})), this.onResize(), this.setDrag(), this.emit("selectorsDone"))
					}
					activateItem(t) {
						const e = this.selectors[t];
						e && (this.currentActiveItem && this.currentActiveItem.deactivate(), !e.disabled && e.canActivate && (e.activate(), this.currentActiveItem = e), !e.activated && this.currentActiveItem && this.currentActiveItem.activate())
					}
					createArrows() {
						!this.options.arrows || "grid" === this.options.standardStyle && "grid" === this.options.fullscreenStyle || (this.arrows = new d.A({
							customClass: "thumbnails",
							prevAriaLabel: this.options.scrollBackward,
							nextAriaLabel: this.options.scrollForward
						}), this.arrows.parentClass = this, this.on("arrowAction", (t => {
							t.stopAll(), this.jump(t.data.type)
						})))
					}
					isGrid() {
						return this.state === y.FULLSCREEN ? this.options.isFullscreenGrid : this.options.isStandardGrid
					}
					calculateContainerScroll() {
						if (this.hasPinnedSelector || this.pinnedBlocksInited) {
							var t;
							const e = this.instanceNode.size;
							null == (t = this.arrows) || t.hide();
							let i = e[this.longSide] - (this.startPinnedNode.size[this.longSide] + this.endPinnedNode.size[this.longSide]);
							i < 0 && (i = 0), this.scrollSize[this.longSide] < i && (i = this.scrollSize[this.longSide]), this.selectorsScrollContainer.setCssProp("max-" + this.longSide, i), this.getSizes()
						}
					}
					normalizePositionValue(t) {
						const e = this.containerSize[this.longSide] - this.scrollSize[this.longSide];
						if (this.arrows && (this.arrows.disable(), e >= 0 || this.isGrid() ? (this.arrows.hide(), this.getSizes()) : this.arrows.isShow || (this.arrows.show(), this.getSizes())), 0 === e) return 0;
						if (("start" === this.options.standardAlign && this.state === y.STANDARD || "start" === this.options.fullscreenAlign && this.state === y.FULLSCREEN) && this.scrollSize[this.longSide] < this.containerSize[this.longSide]) t = 0, this.rtl && (t = this.containerSize[this.longSide] - this.scrollSize[this.longSide]);
						else if (this.halfScrollSize <= this.halfContainerSize) t = this.halfContainerSize - this.halfScrollSize;
						else {
							var i, s;
							t >= 0 && (t = 0, null == (i = this.arrows) || i.disable("backward")), t <= e && (t = e, null == (s = this.arrows) || s.disable("forward"))
						}
						return t
					}
					findItemPosition(t) {
						if (!this.selectors[t] || this.selectors[t].pinnedPosition) return null;
						if (t = ((t, e) => (t < 0 ? t = 0 : t > e - 1 && (t = e - 1), t))(t, this.selectors.length), this.hasPinnedSelector) {
							const e = this.baseSelectorsList.indexOf(this.selectors[t]);
							e >= 0 && (t = e)
						}
						const e = this.selectors[t].size[this.longSide] / 2;
						let i = 0,
							s = 0;
						for (; s < t;) this.selectors[s] && (i += this.selectors[s].size[this.longSide]), s += 1;
						const o = this.halfContainerSize - (i + e);
						return this.normalizePositionValue(o)
					}
					stopMoving() {
						if (this.isMove) {
							let t = n(this.selectorsScroll);
							t && (t = t.transform[this.currentAxis], this.currentPosition = t), this.clearAnimation(), this.selectorsScroll.setCssProp("transform", "translate3d(" + N(this.currentPosition, this.horizontal) + ", 0)")
						}
					}
					clearAnimation() {
						this.selectorsScroll && (this.selectorsScroll.removeEvent("transitionend"), this.selectorsScroll.setCssProp("transition", "")), this.isMove = !1
					}
					jump(t, e, i) {
						if (void 0 === i && (i = !0), !i) return;
						let s = this.currentPosition;
						if (this.stopMoving(), o.A.isString(t)) "next" === t ? s -= this.containerSize[this.longSide] : s += this.containerSize[this.longSide], s = this.normalizePositionValue(s);
						else {
							if ("number" !== o.A.typeOf(t)) return;
							s = this.findItemPosition(t)
						}
						null !== s && this.move(s, null, e)
					}
					move(t, e, i) {
						e || (e = 400);
						const s = this.rtl && this.scrollSize[this.longSide] > this.containerSize[this.longSide];
						this.selectorsScroll.removeEvent("transitionend");
						const o = {};
						i || (this.isMove = !0, this.selectorsScroll.addEvent("transitionend", (t => {
							t.stop(), this.clearAnimation()
						})), o.transition = "transform " + ((t, e, i) => {
							let s = t;
							const o = Math.trunc(t / 3);
							return s = Math.trunc(Math.abs(i) / e * t), s < o ? s = o : s > t && (s = t), s
						})(e, this.containerSize[this.longSide], Math.abs(t) - Math.abs(this.currentPosition)) + "ms ease"), o.transform = "translate3d(" + N(s ? -1 * t : t, this.horizontal) + ", 0)", this.selectorsScroll.setCss(o), this.currentPosition = t
					}
					getSizes() {
						this.containerSize = this.selectorsContainer.size, this.halfContainerSize = this.containerSize[this.longSide] / 2, this.scrollSize = this.selectorsScroll.size, this.halfScrollSize = this.scrollSize[this.longSide] / 2
					}
					setDrag() {
						const t = {};
						let e, i, s, o, n, a, h, r, l, d = {
								x: null,
								y: null
							},
							c = !1,
							p = 0;
						const u = (t, i) => ({
							x: t - e.left,
							y: i - e.top
						});
						t.dragstart = t => {
							n = this.currentAxis, a = "x" === n ? "y" : "x", h = this.longSide, d = {
								x: t.x,
								y: t.y
							}, this.rtl && (this.currentPosition *= -1), this.containerSize[h] < this.scrollSize[h] && (c = !0), e = this.selectorsContainer.position, this.stopMoving(), i = u(t.x, t.y)[n], s = this.containerSize[h] - this.scrollSize[h], o = 0, l = t.timeStamp
						}, t.dragend = t => {
							let e, i;
							var n;
							c && (c = !1, t.stop(), i = t.timeStamp - l, e = this.currentPosition - ((n = o) + n / 2), this.rtl && (e *= -1), (e > 0 || e < s) && (e = e > 0 ? 0 : s), e = this.normalizePositionValue(e), this.move(e), r = null), p = 0
						}, t.dragmove = t => {
							let e, s, h;
							var l, m;
							p || (p = Math.abs(d[n] - t[n]) > Math.abs(d[a] - t[a]) ? 1 : 2), c && 1 === p && (e = u(t.x, t.y), e[n] > e[a] && (t.stop(), s = i - e[n], this.currentPosition -= s, l = i, m = e[n], h = l > m ? "next" : "prev", r && h === r || (o = 0), o += s, i = e[n], r = h), this.selectorsScroll.setCssProp("transform", "translate3d(" + N(this.currentPosition, this.horizontal) + ", 0)")), d = {
								x: t.x,
								y: t.y
							}
						}, this.selectorsContainer.addEvent(["mousedrag", "touchdrag"], (e => {
							t[e.state](e)
						}))
					}
					setContainerCss() {
						const t = {};
						let e = this.options.standardSize;
						this.state === y.FULLSCREEN && (e = this.options.fullscreenSize), t["min-" + this._shortSide] = e + "px", t[this._shortSide] = "100%", this.instanceNode.setCss(t)
					}
					setContainerDisplay() {
						const t = {
							display: ""
						};
						this._currentStylePosition || (t.display = "none"), this.instanceNode.setCss(t), o.A.$(this.instanceNode.node.parentNode).setCss(t)
					}
					beforeEnterFullscreen() {
						this.hide(), this.state = y.FULLSCREEN, this._currentStylePosition = this.options.fullscreenPosition, this.updateRTL(), "start" === this.options.fullscreenAlign ? this.instanceNode.addClass(P) : this.instanceNode.removeClass(P), this.setContainerDisplay(), (this.hasPinnedSelector || this.pinnedBlocksInited) && this.selectorsScrollContainer.setCssProp("max-" + this.longSide, ""), this.identifyVariables()
					}
					afterEnterFullscreen() {
						this._currentStylePosition && (this.setContainerDisplay(), this.setContainerCss(), this.options.fullscreenAutohide && (this.addControl(), this.isActionsEnabled && (this.selectorsState = !0)), this.changeSelectors(2).then((() => {
							this.getSelectorsSize(), setTimeout((() => {
								this.show()
							}), 150), this._currentStylePosition && this.isActionsEnabled && setTimeout((() => {
								this.selectorsState = !0
							}), 1e3)
						})))
					}
					beforeExitFullscreen() {
						this.hide(), this.state = y.STANDARD, this._currentStylePosition = this.options.standardPosition, this.updateRTL(), this.options.fullscreenAutohide && this.removeControl(), "start" === this.options.standardAlign ? this.instanceNode.addClass(P) : this.instanceNode.removeClass(P), this.setContainerDisplay(), (this.hasPinnedSelector || this.pinnedBlocksInited) && this.selectorsScrollContainer.setCssProp("max-" + this.longSide, ""), this.identifyVariables()
					}
					afterExitFullscreen() {
						this._currentStylePosition && (this.setContainerDisplay(), this.setContainerCss(), this.changeSelectors(1).then((() => {
							this.getSelectorsSize(), this.show()
						})))
					}
					get currentStylePosition() {
						return this.state === y.FULLSCREEN ? this.options.fullscreenPosition : this.options.standardPosition
					}
					isSelectorsActionEnabled() {
						return this.isActionsEnabled
					}
					get shortSide() {
						return this._shortSide
					}
					updateRTL() {
						this.rtl = "horizontal" === I(this._currentStylePosition) && "rtl" === this.selectorsScroll.getCss("direction")
					}
					sortSelectors(t, e) {
						this.selectors = t.map((t => this.selectors.find((e => e.UUID === t)))), this.selectors.forEach(((t, e) => {
							t.index = e
						}));
						for (let t = e - 1; t >= 0; t--) this.selectorsScroll.node.insertBefore(this.selectors[t].container.node, this.selectorsScroll.node.firstChild)
					}
					reloadThumbnail(t) {
						const e = this.findSelector(t);
						e && e.reloadThumbnail()
					}
					onResize() {
						this.isDone && this._currentStylePosition && !this.isDestroyed && (clearTimeout(this.resizeTimeout), this.resizeTimeout = setTimeout((() => {
							const t = this.activatedItem;
							this.clearAnimation(), this.getSizes(), this.calculateContainerScroll(), this.activateItem(t), this.normalizePositionValue(), this.jump(t, !0), this.show()
						}), 100))
					}
					destroyArrows() {
						var t;
						null == (t = this.arrows) || t.destroy(), this.arrows = null, this.off("arrowAction")
					}
					destroy() {
						this.isDestroyed = !0, clearTimeout(this.resizeTimeout), this.instanceNode.removeEvent("transitionend"), this.removeControl(), this.controlButton = null, this.off("selectorFocusedIn"), this.off("selectorAction"), this.off("resize"), this.clearAnimation(), this.destroyArrows(), this.selectors.forEach((t => {
							t.destroy()
						})), this.selectorsScroll.remove(), this.selectorsScroll = null, this.selectorsContainer.remove(), this.selectorsContainer = null, this.instanceNode.remove(), this.instanceNode = null, this.currentActiveItem = null, this.pinnedBlocksInited && (this.baseSelectorsList = [], this.pinnedStartList = [], this.pinnedEndList = [], this.endPinnedNode = null, this.startPinnedNode = null, this.selectorsScrollContainer = null, this.pinnedStartList = null, this.pinnedEndList = null), super.destroy()
					}
				}
				const T = O
			},
			6548: (t, e, i) => {
				i.d(e, {
					A: () => h
				});
				var s = i(511),
					o = i(5654);
				const n = t => "bullets" === t ? t : "thumbnails",
					a = (t, e, i, o, n, a) => {
						const h = {
							movingContainer: [],
							selectorsWrapper: []
						};
						return t ? (h.selectorsWrapper.push(s.Mu + "-" + i, s.Mu + "-" + (["left", "right"].includes(e) ? "v" : "h")), o && h.selectorsWrapper.push(s.Mu + "-grid"), a || h.movingContainer.push(s.Mu + "-selectors-" + e), n && h.movingContainer.push(s.Mu + "-autohide", s.Mu + "-selectors-closed"), h) : h
					},
					h = class {
						constructor(t, e, i) {
							this.o = Object.assign({
								sEnabled: !0,
								sPosition: "bottom",
								sType: "auto",
								sGrid: !1,
								sAutohide: !1,
								sExternal: !1,
								fEnabled: !0,
								fPosition: "bottom",
								fType: "auto",
								fGrid: !1,
								fAutohide: !1,
								fExternal: !1
							}, t || {}), this.o.fExternal = !1, this.o.sAutohide = !1, this.movingContainer = e, this.selectorsWrapper = i, this.state = s.a0.CLOSED, this.classes = {}, this.create()
						}
						create() {
							this.classes[s.a0.CLOSED + ""] = a(this.o.sEnabled, this.o.sPosition, n(this.o.sType), this.o.sGrid, this.o.sAutohide, this.o.sExternal), this.classes[s.a0.OPENED + ""] = a(this.o.fEnabled, this.o.fPosition, n(this.o.fType), this.o.fGrid, this.o.fAutohide, this.o.fExternal)
						}
						setOptions(t) {
							(0, o.A)(this.o, t) || (this.o = Object.assign(this.o, t || {}), this.remove(this.state), this.create(), this.add(this.state))
						}
						remove() {
							this.classes[this.state].movingContainer.forEach((t => this.movingContainer.removeClass(t))), this.classes[this.state].selectorsWrapper.forEach((t => this.selectorsWrapper.removeClass(t)))
						}
						add() {
							this.classes[this.state].movingContainer.forEach((t => this.movingContainer.addClass(t))), this.classes[this.state].selectorsWrapper.forEach((t => this.selectorsWrapper.addClass(t)))
						}
						toggle(t) {
							this.remove(), this.state = t, this.add()
						}
						toStandard() {
							this.toggle(s.a0.CLOSED)
						}
						toFullscreen() {
							this.toggle(s.a0.OPENED)
						}
						destroy() {
							this.remove(), this.classes = {}
						}
					}
			},
			7392: (t, e, i) => {
				i.a(t, (async(t, s) => {
					try {
						i.d(e, {
							A: () => v
						});
						var o = i(7985),
							n = i(1070),
							a = i(7741),
							h = i(511),
							r = i(5597),
							l = t([r]);
						r = (l.then ? (await l)() : l)[0];
						let d = null;
						try {
							d = (await Promise.resolve().then((() => {
								if (!i.m[1057]) {
									var t = new Error("Module '1057' is not available (weak dependency)");
									throw t.code = "MODULE_NOT_FOUND", t
								}
								return i(1057)
							}))).default
						} catch (t) {}
						let c = null;
						try {
							c = (await Promise.resolve().then((() => {
								if (!i.m[5574]) {
									var t = new Error("Module '5574' is not available (weak dependency)");
									throw t.code = "MODULE_NOT_FOUND", t
								}
								return i(5574)
							}))).default
						} catch (t) {}
						let p = null;
						try {
							p = (await Promise.resolve().then((() => {
								if (!i.m[5578]) {
									var t = new Error("Module '5578' is not available (weak dependency)");
									throw t.code = "MODULE_NOT_FOUND", t
								}
								return i(5578)
							}))).default
						} catch (t) {}
						let u = null;
						try {
							u = (await Promise.resolve().then((() => {
								if (!i.m[7316]) {
									var t = new Error("Module '7316' is not available (weak dependency)");
									throw t.code = "MODULE_NOT_FOUND", t
								}
								return i(7316)
							}))).default
						} catch (t) {}
						const m = t => ({
							isFullscreen: t.isFullscreen,
							quality: t.quality,
							hdQuality: t.hdQuality,
							isHDQualitySet: t.isHDQualitySet,
							always: t.always,
							nativeFullscreen: t.nativeFullscreen,
							goToFullscreen: t.goToFullscreen,
							layout: t.layout,
							aspectratio: t.aspectratio,
							zoomInLabel: t.zoomInLabel,
							zoomOutLabel: t.zoomOutLabel
						});
						class g extends o.A {
							constructor(t, e, i) {
								super(), this.node = a.A.$(t), this.options = e, this._type = h.mo.NONE, this.imgSrc = null, this.effect = null, this.additionalEffects = [], this.isStarted = !1, this.isPrepared = !1, this.toolOptions = {}, this.api = {}, this.isActive = !1, this.additionalOptions = i, this.parse(), this.setEvents()
							}
							static isExist(t) {
								const e = (0, n.A)(t),
									i = {
										image: r.A,
										spin: c,
										zoom: d,
										video: p,
										model: u
									},
									s = h.tm[e.type];
								return e && !!i[s] && ("model" !== s || u.support())
							}
							createAPI() {
								var t = this;
								if (this.effect) {
									this.api = this.effect.api;
									let e = [];
									const i = h.mo;
									switch (this._type) {
										case i.SPIN:
											e = ["play", "rotate", "rotateX", "rotateY", "zoomIn", "zoomOut"];
											break;
										case i.ZOOM:
											this.api.zoomIn && (e = ["zoomIn", "zoomOut"])
									}
									e.forEach((e => {
										const i = this.api[e];
										this.api[e] = function() {
											let e = !1;
											const s = i;
											if (t.isActive) {
												for (var o = arguments.length, n = new Array(o), a = 0; a < o; a++) n[a] = arguments[a];
												e = s.apply(t, n)
											}
											return e
										}
									}))
								}
							}
							setEvents() {
								this.on("stats", (t => {
									t.stopEmptyEvent(), t.data.component = h.tm[this._type]
								})), this.on("componentEvent", (t => {
									t.stopEmptyEvent(), t.data.component = h.tm[this._type], "ready" === t.data.type && (this._type === h.mo.IMAGE && null !== t.data.data.imageIndex && t.stopAll(), this.toolOptions = this.effect.options)
								}))
							}
							parse() {
								const t = (0, n.A)(this.node.node);
								t && (this._type = t.type, this.imgSrc = t.imgSrc)
							}
							push(t) {
								if (r.A) {
									const e = new r.A(t, {
										options: this.options.image,
										isFullscreen: this.additionalOptions.isFullscreen,
										imageIndex: this.additionalEffects.length
									});
									e.parentClass = this, this.additionalEffects.push({
										node: t,
										src: a.A.$(t).attr("src"),
										datasrc: a.A.$(t).attr("data-src"),
										effect: e
									})
								}
							}
							sendEvent(t) {
								this.effect && this.effect.sendEvent && this.effect.sendEvent(t)
							}
							resize() {
								this.broadcast("resize")
							}
							startFullInit(t) {
								if (this.effect) {
									const e = h.tm[this._type];
									this.effect.startFullInit(t ? t[e] : null, m(this.additionalOptions)), this.additionalEffects.length && this.additionalEffects.forEach((i => {
										i.effect && i.effect.startFullInit(t ? t[e] : null)
									}))
								}
							}
							getSelectorImgUrl(t) {
								return this.effect.getSelectorImgUrl(t)
							}
							getInfoSize() {
								let t = null;
								return t = this._type === h.mo.IMAGE ? new Promise(((t, e) => {
									Promise.all([this.effect.getInfoSize()].concat(this.additionalEffects.map((t => t.effect.getInfoSize())))).then((e => {
										t(e[0])
									})).catch(e)
								})) : this.effect.getInfoSize(), t
							}
							start() {
								if (this.isPrepared) return;
								this.isPrepared = !0;
								const t = m(this.additionalOptions),
									e = h.mo;
								switch (this._type) {
									case e.IMAGE:
										r.A && (this.effect = new r.A(this.node.node, Object.assign(t, {
											options: this.options.image,
											imageIndex: null
										})), this.effect.parentClass = this);
										break;
									case e.PANZOOM:
									case e.ZOOM:
										d && (this.effect = new d(this.node.node, Object.assign(t, {
											options: this.options.zoom
										})), this.effect.parentClass = this);
										break;
									case e.SPIN:
										c && (this.node.setCss({
											width: "100%",
											height: "100%"
										}), this.effect = new c(this.node.node, Object.assign(t, {
											options: this.options.spin
										})), this.effect.parentClass = this);
										break;
									case e.VIDEO:
										p && (this.effect = new p(this.node.node, Object.assign(t, {
											options: this.options.video,
											nativeFullscreen: this.additionalOptions.nativeFullscreen
										})), this.effect.parentClass = this);
										break;
									case e.MODEL:
										u && (this.effect = new u(this.node.node, Object.assign(t, {
											options: this.options.model
										})), this.effect.parentClass = this)
								}
								this.createAPI()
							}
							isThumbnailGif() {
								return !(!this.effect || this._type !== h.mo.SPIN) && this.effect.isThumbnailGif()
							}
							get zoomable() {
								const t = h.mo;
								return !(!this.effect || ![t.SPIN, t.PANZOOM, t.ZOOM].includes(this._type)) && this.effect.zoomable
							}
							startGettingInfo() {
								this.effect && this.effect.startGettingInfo()
							}
							startTool(t, e, i) {
								!this.isStarted && this.effect && (this.isStarted = !0, this.effect.run(t, e, i), this.additionalEffects.length && this.additionalEffects.forEach((s => {
									s.effect && s.effect.run(t, e, i)
								})))
							}
							loadContent() {
								this.isStarted && this.effect.loadContent()
							}
							loadThumbnail() {
								this.isStarted && this.effect.loadThumbnail()
							}
							get type() {
								return this._type
							}
							getData() {
								let t = {};
								return this.effect && (t = Object.assign(t, this.api), delete t.start, delete t.stop, delete t.refresh), t
							}
							get originImageUrl() {
								return this.effect ? this.effect.originImageUrl : null
							}
							getZoomData() {
								return [h.mo.SPIN, h.mo.ZOOM].includes(this._type) ? {
									isZoomed: this.effect.isZoomed(),
									zoom: this.effect.getZoomData()
								} : null
							}
							getSpinOrientation() {
								return this._type === h.mo.SPIN ? this.effect.orientation : null
							}
							updateOptions(t) {
								var e;
								null == (e = this.effect) || e.updateOptions(Object.assign(m(t), {
									options: t[h.tm[this._type]]
								}))
							}
							getSocialButtonData(t, e) {
								let i = null;
								return this.isStarted && (i = this._type === h.mo.SPIN ? this.effect.getSocialButtonData(t, e) : this.effect.getSocialButtonData(t)), i
							}
							canFullscreen() {
								return this.effect.canFullscreen()
							}
							getSelectorProportion() {
								return this.effect.getSelectorProportion()
							}
							getAriaLabelId() {
								return this.effect.ariaLabelId
							}
							loadSources() {
								this.effect && this.effect.addSources()
							}
							isEffectActive() {
								return !(!this.effect || this._type !== h.mo.SPIN) && this.effect.isActive()
							}
							activate() {
								this.isActive || (this.isActive = !0)
							}
							deactivate() {
								this.isActive = !1
							}
							getToolOptions() {
								return this.toolOptions
							}
							destroy() {
								this.effect && (this.effect.destroy(), this.additionalEffects.length && this.additionalEffects.forEach((t => {
									t.effect ? t.effect.destroy() : !t.src && t.datasrc && t.node.removeAttribute("src")
								}))), this.toolOptions = {}, this.api = {}, this.isActive = !1, this.isStarted = !1, this.isPrepared = !1, this.off("stats"), this.off("componentEvent"), super.destroy()
							}
						}
						const v = g;
						s()
					} catch (t) {
						s(t)
					}
				}), 1)
			},
			1990: (t, e, i) => {
				i.a(t, (async(t, s) => {
					try {
						i.d(e, {
							A: () => N
						});
						var o = i(1070),
							n = i(3287),
							a = i(749),
							h = i(413),
							r = i(2084),
							l = i(7741),
							d = i(7985),
							c = i(2948),
							p = i(7950),
							u = i(511),
							m = i(3355),
							g = i(7392),
							v = i(7292),
							f = i(6687),
							y = i(8004),
							S = i(7746),
							w = t([g]);
						g = (w.then ? (await w)() : w)[0];
						const b = u.Mu + "-can-zoom",
							A = "--" + u.Mu + "-aspect-ratio",
							x = {
								top: 0,
								left: 0,
								width: "100%",
								height: "100%"
							},
							z = (t, e) => new Promise((i => {
								if (t = l.A.$(t), void 0 === e && (e = 10), e > 0) {
									const s = t.size;
									s.width && s.height ? i(s) : setTimeout((() => {
										z(t, e -= 1).then(i)
									}), 32)
								} else i(null)
							})),
							C = t => {
								const e = {
									type: "node",
									data: null
								};
								if (h.A.isVideo(t)) e.type = h.A.getType(t), e.type || (e.data = l.A.$new("div"));
								else {
									let i, s;
									if ("img" === l.A.$(t).tagName) i = t;
									else try {
										i = t.getElementsByTagName("img")[0]
									} catch (t) {}
									i && (s = (0, v.A)(l.A.$(i).attr("src")) || (0, v.A)(l.A.$(i).attr("data-src"))), s ? (e.type = "img", e.data = s) : (i = t.cloneNode ? t.cloneNode(!0) : l.A.$new("div"), e.data = i)
								}
								return e
							},
							I = t => {
								let e = l.A.$(t.node.querySelector(y.XY));
								return e || (t.tagName === y.XY ? t : null)
							},
							E = t => {
								const {
									quality: e,
									hdQuality: i,
									isHDQualitySet: s,
									isFullscreen: o,
									nativeFullscreen: n,
									fullscreenOnly: a,
									goToFullscreen: h,
									layout: r,
									aspectratio: l,
									zoomInLabel: d,
									zoomOutLabel: c
								} = t;
								return {
									quality: e,
									hdQuality: i,
									isHDQualitySet: s,
									isFullscreen: o,
									nativeFullscreen: n,
									always: a,
									goToFullscreen: h,
									layout: r,
									aspectratio: l,
									zoomInLabel: d,
									zoomOutLabel: c
								}
							};
						class P extends d.A {
							constructor(t, e, i, s) {
								super(), this.$J_UUID = l.A.$uuid(this), this.groups = (l.A.$(t).attr("data-group") || "").split(/\s*(?:,|$)\s);
								const o = P.parse(t);
								this.id = o.id, this.isCustomId = !1, this._enabled = o.enabled, this.type = o.type, this.url = o.url, this.slideContent = l.A.$(t), this._index = e, this.isCustomAdded = s || !1, this._options = {}, this.setOptions(i), this.instanceNode = l.A.$new("div").addClass(u.Mu + "-slide").setCss({
									position: "absolute"
								}).attr("role", "group").attr("id", u.Mu + "-" + this.$J_UUID), this.setAriaLabel(), this.instanceNode.setCss(x).attr("aria-hidden", "true"), this.contentWrapper = l.A.$new("div").addClass(u.Mu + "-content"), this.contentWrapper.setCss(x), this.fullscreenOnlyNode = null, this.selector = {
									UUID: this.$J_UUID,
									isCustom: !1,
									node: I(this.slideContent),
									isSirv: !1,
									isVideo: !1,
									selectorContent: null,
									size: {
										width: 0,
										height: 0
									},
									src: null,
									srcset: null,
									pinned: null,
									activated: !0,
									infoPromise: null,
									isStatic: !1,
									ariaLabelId: ""
								}, this.selector.isStatic = P.checkNonSirv(this.selector.node), this.selector.pinned = P.findPinnedSelectorSide(this.slideContent.node.querySelector(y.XY) || this.slideContent.node), this.selector.isCustom = !!this.selector.node, this.thumbnailReferrerPolicy = this.getSelectorReferrerPolicy(), this.availableSlide = !0, this.fsButton = null, this.isStartedFullInit = !1, this.fsState = u.a0.CLOSED, this.isStarted = !1, this.sirvService = null, this.componentSize = null, this.inView = !1, this.isActive = !1, this.isReady = !1, this.video = null, this.isVideoPaused = !1, this.isVideoReady = !1, this.intersectionObserver = null, this.slideShownBy = u.eO.NONE, this.componentLoader = null, this.infoSize = null, this.sizePromise = null, this.isInDom = 0, this.multiImages = [], this.lastOriginNode = null, this.preload = !1, this.ariaLabelId = "", this.dataThumbnailImage = this.getThumbnailImage(), this.dataThumbnailHtml = this.slideContent.attr("data-thumbnail-html"), this.dataHiddenSelector = this.slideContent.hasAttribute("data-hidden-selector"), this.dataAlt = this.slideContent.attr("data-alt"), this.originAlt = this.slideContent.attr("alt"), this.swipeDisabled = this.slideContent.hasAttribute("data-swipe-disabled"), this.spinWasInited = !1, this.socialbuttons = null, this.getVideoThumbnailPromise = null, this.isPlaceholder = !1, this.customThumbnailImageClassPromise = null, this.id || (this.isCustomId = !0, this.id = u.Mu + "-" + u.tm[o.type] + "-" + (0, r.A)(), this.slideContent.attr("id", this.id));
								const n = this;
								this._api = {get id() {
										return n.id
									},
									get index() {
										return n.index
									},
									get component() {
										return n.sirvService ? u.tm[n.sirvService.type] : "unknown"
									},
									get groups() {
										return n.groups
									},
									get thumbnail() {
										var t, e;
										return null != (t = null == (e = n.selector.node) ? void 0 : e.node) ? t : null
									},
									isDisabled: () => !n.enabled,
									isActive: () => n.isActive,
									getSelector() {
										return this.thumbnail
									}
								}, this.sendEventCloseFullscreenByClick = t => {
									t.stop(), this.emit("goToFullscreenOut")
								}, this.beforeParseSlide(), this.parseSlide()
							}
							static findPinnedSelectorSide(t) {
								if (t.hasAttribute("data-pinned")) {
									const e = l.A.$(t).attr("data-pinned");
									return "start" !== e ? "end" : e
								}
								return null
							}
							static parse(t) {
								const e = {
									node: (t = l.A.$(t)).node,
									id: t.attr("data-id") || t.attr("id"),
									type: u.mo.HTML,
									url: null,
									enabled: !0
								};
								if (P.isSirvComponent(t)) {
									const i = (0, o.A)(t);
									e.type = i.type, e.url = i.imgSrc
								} else h.A.isVideo(t) ? (e.type = u.mo.VIDEO, e.url = h.A.getSrc(t)) : ("img" === t.tagName || "div" === t.tagName && t.attr("data-src")) && (e.type = u.mo.IMAGE, e.url = t.attr("data-src") || t.attr("src"));
								const i = t.node.getAttribute("data-disabled");
								return (i && "false" !== i || "" === i) && (e.enabled = !1), e
							}
							static checkNonSirv(t) {
								return !(!t || "static" !== l.A.$(t).attr("data-type"))
							}
							static isSirvComponent(t) {
								const e = (t = l.A.$(t)).attr("data-src"),
									i = t.attr("src"),
									s = P.checkNonSirv(t),
									o = t.tagName;
								return !(s || !("div" === o && !["youtube", "vimeo"].includes(h.A.getType(e)) && e || "img" === o && (e || i)))
							}
							static hasComponent(t) {
								return g.A.isExist(t)
							}
							set aspectratio(t) {
								const e = this.instanceNode.node.style;
								t ? e.setProperty(A, t) : e.removeProperty(A)
							}
							setAspectratio() {
								var t, e;
								"grid" === this._options.layout && "auto" === this._options.aspectratio && (null != (t = this.infoSize) && t.width && null != (e = this.infoSize) && e.height ? this.aspectratio = this.infoSize.width / this.infoSize.height : this.aspectratio = 1)
							}
							createFullscreenButton() {
								this.videoSlide || this.fsButton || (this.fsButton = new f.A(f.A.STANDARD, {
									enterAriaLabel: this._options.fullscreenEnterAriaLabel,
									exitAriaLabel: this._options.fullscreenExitAriaLabel
								}), this.instanceNode.append(this.fsButton.node), this.fsButton.onClick((() => this.emit("goToFullscreen", {
									data: {
										UUID: this.$J_UUID,
										index: this._index
									}
								}))), this.enabled || (this.fsButton.hide(), this.fsButton.disable()))
							}
							updateOptions(t) {
								var e;
								const i = this._options.layout;
								var s, o;
								this.setOptions(t), this.aspectratio = null, this.setAspectratio(), "grid" === this._options.layout && this._options.isFullscreen ? this.createFullscreenButton() : (null == (s = this.fsButton) || s.destroy(), this.fsButton = null), this.setAriaLabel(), null == (e = this.fsButton) || e.setOptions({
									enterAriaLabel: this._options.fullscreenEnterAriaLabel,
									exitAriaLabel: this._options.fullscreenExitAriaLabel
								}), i !== this._options.layout && ("grid" === i ? (null == (o = this.intersectionObserver) || o.disconnect(), this.intersectionObserver = null) : (this.show(), this.createGridObserver(this.preload, !0)))
							}
							updateComponentOptions(t) {
								if (this.setOptions(t), this.sirv || this.video) {
									const t = (0, S.A)({}, this._options);
									t.always = t.fullscreenOnly, this.sirv ? this.sirvService.updateOptions(t) : this.video.updateOptions(t.video)
								}
							}
							setZeroFont(t) {
								var e;
								(null == (e = this.sirvService) ? void 0 : e.type) === u.mo.IMAGE && this.contentWrapper.setCssProp("font-size", t ? 0 : "")
							}
							isSwipeDisabled() {
								return this.swipeDisabled
							}
							getThumbnailImage() {
								let t = this.slideContent.attr("data-thumbnail-image");
								if (!t && this.selector.isCustom && (t = this.selector.node.attr("data-src"), !t)) {
									const e = this.selector.node.node.children;
									1 === e.length && "img" === l.A.$(e[0]).tagName && (t = l.A.$(e[0]).attr("data-src") || l.A.$(e[0]).attr("src"))
								}
								return t
							}
							startGettingInfo() {
								this.sirv && this.sirvService.startGettingInfo()
							}
							loadContent() {
								this.sirv && this.getSlideSize().then((t => {
									this.isInDom && this.sirvService.loadContent()
								})).catch((t => {}))
							}
							loadThumbnail() {
								this.sirv && this.getSlideSize().then((t => {
									this.isInDom && this.sirvService.loadThumbnail()
								})).catch((t => {}))
							}
							get videoSlide() {
								return this.sirv ? this.sirvService.type === u.mo.VIDEO : this.video
							}
							belongsTo(t) {
								return !!t && (l.A.isString(t) && (t = [t]), t.some((t => this.groups.includes(t))))
							}
							get customSelector() {
								return this.selector.isCustom
							}
							single(t) {
								this.sirv && this.broadcast("isSingleSlide", {
									data: {
										isSingle: t
									}
								})
							}
							setAriaLabel() {
								this.instanceNode.attr("aria-label", this._options.itemLabel.replace("%{index}", this._index + 1)).attr("aria-roledescription", this._options.itemRole)
							}
							set index(t) {
								this._index = t, this.setAriaLabel()
							}
							get index() {
								return this._index
							}
							canFullscreen() {
								return this.sirv ? this.sirvService.canFullscreen() : !this.video
							}
							checkReadiness(t, e) {
								return !(!this.sirv || u.tm[this.sirvService.type] !== e) && ("init" === t ? this.spinWasInited : this.isReady)
							}
							sendReadyEvent(t, e) {
								this.sirv && u.tm[this.sirvService.type] === e && this.sirvService.sendEvent(t)
							}
							createFullscreenOnlyScreen() {
								this._options.fullscreenOnly && (this.fullscreenOnlyNode = l.A.$new("div").addClass(u.Mu + "-fullscreen-always"), this.fullscreenOnlyNode.addEvent(["btnclick", "tap"], (t => {
									t.stop(), this.emit("goToFullscreen", {
										data: {
											UUID: this.$J_UUID,
											index: this._index
										}
									})
								})), this.createPinchEvent(this.fullscreenOnlyNode), this.instanceNode.append(this.fullscreenOnlyNode, "top"))
							}
							createPinchEvent(t) {
								l.A.browser.touchScreen && t.addEvent("pinch", (t => {
									t.stop(), "pinchend" === t.state && this.fsState === u.a0.CLOSED && t.scale >= 2 && this.emit("goToFullscreen")
								}))
							}
							get enabled() {
								return this._enabled
							}
							disable() {
								this._enabled = !1, this.video && this.video.pause(), "grid" === this._options.layout && (this.componentLoader && this.componentLoader.hide(!0), this.hide())
							}
							enable() {
								this._enabled = !0, "grid" === this._options.layout && (!this.isReady && this.componentLoader && this.componentLoader.show(), this.show())
							}
							get blokedTouchdrag() {
								return !!this.sirv && (!![u.mo.SPIN, u.mo.MODEL].includes(this.sirvService.type) || this.sirvService.isEffectActive())
							}
							setOptions(t) {
								this._options = Object.assign({
									spin: {},
									zoom: {},
									image: {},
									video: {},
									model: {},
									fullscreenOnly: !1
								}, t || {})
							}
							dragEvent(t) {
								this.sirvService && this.broadcast("dragEvent", {
									data: {
										type: t
									}
								})
							}
							getAriaLabelId() {
								let t = "";
								return this.sirvService ? t = this.sirvService.getAriaLabelId() : (t = this.slideContent.attr("id"), t || (t = u.Mu + "-al-" + (0, r.A)(), this.slideContent.attr("id", t))), t
							}
							startFullInit(t) {
								this.isStartedFullInit || (this.isStartedFullInit = !0, t && this.setOptions(t), this.setAspectratio(), "grid" === this._options.layout && this._options.isFullscreen && this.createFullscreenButton(), this.sirvService && this.sirvService.startFullInit(t ? this._options : null), this.ariaLabelId = this.getAriaLabelId(), this.selector.ariaLabelId = this.ariaLabelId, this.instanceNode.attr("aria-describedby", this.ariaLabelId), ["spin", "video"].includes(u.tm[this.type]) && this.instanceNode.attr("tabindex", 0), this.hide(), this.instanceNode.append(this.contentWrapper), this.sirv || this.appendToDOM())
							}
							createComponentLoader() {
								this.componentLoader || (this.componentLoader = new c.A(this.instanceNode), this.enabled && this.componentLoader.show())
							}
							get slideAvailable() {
								return this.availableSlide
							}
							get selectorPinned() {
								return ["start", "end"].includes(this.selector.pinned)
							}
							get pinnedSelectorSide() {
								return this.selector.pinned
							}
							setFullscreenEvents() {
								this.on("beforeFullscreenIn", (t => {
									var e, i, s;
									this.fsState === u.a0.OPENING ? t.stopPropagation() : (this.aspectratio = null, this.fsState = u.a0.OPENING, this.video && (this.isVideoPaused = this.video.paused, this.video.onBeforeFullscreenIn())), null == (e = this.fsButton) || e.disable(), null == (i = this.fsButton) || i.hide(), this.fullscreenOnlyNode && this.fullscreenOnlyNode.setCssProp("display", "none"), this.addEventCloseFullscreenByClick(), null == (s = this.intersectionObserver) || s.unobserve(this.instanceNode.node), "grid" === this._options.layout && t.data.index !== this._index && (this.beforeHide(), this.afterHide())
								})), this.on("afterFullscreenIn", (t => {
									var e, i, s;
									null == (e = this.socialbuttons) || e.closeButtons(), this.fsState === u.a0.OPENED ? t.stopPropagation() : (this.fsState = u.a0.OPENED, this.sirv && this.componentLoader.isHiding() && this.componentLoader.hide(!0), this.video && (this.video.onAfterFullscreenIn(), !this.video.autoplay && this.video.preStart || this.playVideo())), null == (i = this.intersectionObserver) || i.observe(this.instanceNode.node), null == (s = this.intersectionObserver) || s.takeRecords()
								})), this.on("beforeFullscreenOut", (t => {
									var e, i;
									null == (e = this.socialbuttons) || e.closeButtons(), this.fsState === u.a0.CLOSING ? t.stopPropagation() : (this.fsState = u.a0.CLOSING, this.setAspectratio(), this.video && (this.isVideoPaused = this.video.paused, this.video.onBeforeFullscreenOut())), this.fullscreenOnlyNode && this.fullscreenOnlyNode.setCssProp("display", ""), null == (i = this.intersectionObserver) || i.unobserve(this.instanceNode.node)
								})), this.on("afterFullscreenOut", (t => {
									var e, i, s, o;
									this.fsState === u.a0.CLOSED ? t.stopPropagation() : (this.fsState = u.a0.CLOSED, this.video && (this.video.onAfterFullscreenOut(), !this.video.autoplay && this.video.preStart || this.playVideo())), null == (e = this.fsButton) || e.enable(), null == (i = this.fsButton) || i.show(), this.removeEventCloseFullscreeByClick(), null == (s = this.intersectionObserver) || s.observe(this.instanceNode.node), null == (o = this.intersectionObserver) || o.takeRecords(), "grid" === this._options.layout && t.data.index !== this._index && (this.sirv && "video" === u.tm[this.type] ? setTimeout((() => {
										this.beforeShow(), this.afterShow(u.eO.INIT)
									}), 32) : (this.beforeShow(), this.afterShow(u.eO.INIT)))
								})), this.on("inView", (t => {
									"grid" !== this._options.layout ? this.onInView(t.data) : t.stopAll()
								}))
							}
							onInView(t) {
								this.inView = t, this.video && (this.inView ? (!this.isVideoPaused && !this.video.preStart || this.video.autoplay) && this.playVideo() : (this.isVideoPaused = this.video.paused, this.video.getCurrentTime(), this.video.pause()))
							}
							addEventCloseFullscreenByClick() {
								this._options.fullscreenOnly && this.type === u.mo.IMAGE && (this.contentWrapper.addEvent(["btnclick", "tap"], this.sendEventCloseFullscreenByClick), this.slideContent.addEvent(["btnclick", "tap"], this.sendEventCloseFullscreenByClick))
							}
							removeEventCloseFullscreeByClick() {
								this._options.fullscreenOnly && this.type === u.mo.IMAGE && (this.contentWrapper.removeEvent(["btnclick", "tap"], this.sendEventCloseFullscreenByClick), this.slideContent.removeEvent(["btnclick", "tap"], this.sendEventCloseFullscreenByClick))
							}
							get sirv() {
								return !!this.sirvService
							}
							get node() {
								return this.instanceNode
							}
							get originNode() {
								return this.lastOriginNode || this.slideContent
							}
							get originImageUrl() {
								return this.sirv ? this.sirvService.originImageUrl : null
							}
							zoomIn(t, e) {
								this.broadcast("zoomUp", {
									data: {
										x: t,
										y: e
									}
								})
							}
							zoomOut(t, e) {
								this.broadcast("zoomDown", {
									data: {
										x: t,
										y: e
									}
								})
							}
							mouseAction(t, e) {
								this.sirv && this.broadcast("mouseAction", {
									data: {
										type: t,
										originEvent: e
									}
								})
							}
							get zoomData() {
								return this.sirv ? this.sirvService.getZoomData() : null
							}
							get slideType() {
								return this.sirv ? this.sirvService.type : null
							}
							get options() {
								return this.sirv ? this.sirvService.getToolOptions() : {}
							}
							createSlideApi() {
								this.sirv && !this.isStarted && (this.isStarted = !0, this.api[u.tm[this.sirvService.type]] = this.sirvService.getData())
							}
							beforeShow() {
								this.isActive = !0, this.show(), this.sirv && (this.sirvService.activate(), this.broadcast("beforeStartActions")), this.instanceNode.removeAttr("aria-hidden"), this.createSlideApi(), this.emit("componentEvent", {
									data: {
										type: "beforeStartActions",
										slide: this.api
									}
								})
							}
							afterShow(t) {
								this.slideShownBy = t || u.eO.NONE, this.broadcast("startActions", {
									who: this.slideShownBy
								}), this.video && this.video.autoplay && this.playVideo()
							}
							beforeHide() {
								this.instanceNode.attr("aria-hidden", "true"), this.video ? this.video.pause() : this.broadcast("stopActions")
							}
							afterHide() {
								var t;
								this.slideShownBy = u.eO.NONE, this.isActive = !1, this.hide(), this.sirv && (this.sirvService.deactivate(), this.broadcast("afterStopActions")), null == (t = this.socialbuttons) || t.closeButtons()
							}
							show() {
								this.instanceNode.removeClass(u.Mu + "-hidden"), this.instanceNode.addClass(u.Mu + "-shown")
							}
							hide() {
								this.instanceNode.removeClass(u.Mu + "-shown"), "grid" === this._options.layout && ![u.a0.OPENING, u.a0.OPENED].includes(this.fsState) && this.enabled || this.instanceNode.addClass(u.Mu + "-hidden")
							}
							get zoomSizeExist() {
								return !!this.sirv && this.sirvService.zoomable
							}
							createGridObserver(t, e) {
								if (void 0 === e && (e = !1), "grid" === this._options.layout && !this.intersectionObserver) {
									let i = !1;
									e && (i = "notTrueAndNotFalse"), this.intersectionObserver = new IntersectionObserver((e => {
										e.forEach((e => {
											let s = e.isIntersecting || e.intersectionRatio > 0;
											[u.a0.OPENED, u.a0.OPENING].includes(this.fsState) && (s = !0), i !== s && (t || (this.onInView(s), this.broadcast("inView", {
												data: s
											})), i = s, [u.a0.OPENING, u.a0.OPENED].includes(this.fsState) || this._enabled && (i ? (this.beforeShow(), this.afterShow(u.eO.INIT)) : (this.beforeHide(), this.afterHide(u.eO.INIT))))
										}))
									}), {
										rootMargin: this._options.rootMargin + "px 0px"
									}), t && (this.onInView(!0), this.broadcast("inView", {
										data: !0
									})), this.intersectionObserver.observe(this.instanceNode.node), this.intersectionObserver.takeRecords()
								}
							}
							startTool(t, e, i) {
								this.preload = e, this.getSlideSize().then((s => {
									const o = {
										data: {
											slide: {
												index: this._index
											}
										}
									};
									this.sirv && this.isInDom && this.sirvService ? (this.sirvService.startTool(t || this.isActive, e, i), this.createGridObserver(e), this.setZeroFont(!1)) : this.emit("contentLoaded", o)
								})).catch((t => {}))
							}
							getSlideSize() {
								return this.sizePromise || (this.sizePromise = new Promise(((t, e) => {
									if (this.sirv) {
										const i = {
											UUID: this.$J_UUID
										};
										this.sirvService.getInfoSize().then((e => {
											!this.infoSize && e.size && (this.infoSize = e.size, this.setAspectratio()), i.size = this.infoSize, t(i)
										})).catch((s => {
											if (i.error = !0, this.sirvService) {
												const o = this.sirvService.type;
												if (this.removeSirvService(), s && s.error && s.error.status && 404 === s.error.status) i.error = s.error, e(i);
												else if (s && ("changeSpinToImage" === s.error || o === u.mo.IMAGE || s.isPlaceholder)) {
													if (this.isPlaceholder = s.isPlaceholder, o === u.mo.IMAGE) {
														this.isInDom = 0, this.appendToDOM();
														const t = C(this.slideContent.node);
														this.selector.isCustom || (this.selector.src = t ? t.data : null, this.selector.isSirv = !1)
													} else this.changeSpinToImage();
													const i = this.sizePromise;
													this.sizePromise = null;
													const n = this.getSlideSize();
													this.sizePromise = i, n.then(t).catch(e)
												} else i.error = {
													status: 404
												}, e(i)
											} else i.error = {
												status: 404
											}, e(i)
										})).finally((() => {
											this.isCustomAdded && this.emit("infoReady", {
												data: {
													index: this._index
												}
											})
										}))
									} else {
										let i, s;
										if ("img" === this.slideContent.tagName) i = this.slideContent.node;
										else try {
											i = this.slideContent.node.getElementsByTagName("img")[0]
										} catch (t) {}
										i && (s = (0, v.A)(l.A.$(i).attr("src")) || (0, v.A)(l.A.$(i).attr("data-src"))), s ? (0, n.A)(s).then((e => {
											this.dataAlt && l.A.$(i).attr("alt", this.dataAlt), this.infoSize = e.size, this.setAspectratio(), t({
												size: this.infoSize,
												UUID: this.$J_UUID
											})
										})).catch((t => {
											e({
												size: this.infoSize,
												UUID: this.$J_UUID,
												error: {
													status: 404
												}
											})
										})) : this.video ? this.video.getSize().then((e => {
											this.infoSize = e || {
												width: 0,
												height: 0
											}, this.setAspectratio(), t({
												size: this.infoSize,
												UUID: this.$J_UUID
											})
										})).catch((t => {
											e({
												size: this.infoSize,
												UUID: this.$J_UUID,
												error: t
											})
										})) : z(this.slideContent.node).then((e => {
											this.infoSize = e || {
												width: 0,
												height: 0
											}, this.setAspectratio(), t({
												size: this.infoSize,
												UUID: this.$J_UUID
											})
										})).catch((t => {
											e({
												size: this.infoSize,
												UUID: this.$J_UUID,
												error: t
											})
										}))
									}
								}))), this.sizePromise
							}
							get api() {
								return this._api
							}
							get alt() {
								return this.dataAlt || this.originAlt
							}
							removeSirvService() {
								this.infoSize = null, this.slideContent && this.slideContent.remove(), this.selector.node && this.selector.node.removeAttr("data-type"), this.sirvService && (this.sirvService.destroy(), this.sirvService = null), this.selector.isSirv = !1, this.off("stats"), this.off("componentEvent"), this.off("beforeFullscreenIn"), this.off("afterFullscreenIn"), this.off("beforeFullscreenOut"), this.off("afterFullscreenOut"), this.componentLoader && (this.componentLoader.hide(!0), this.componentLoader.destroy(), this.componentLoader = null), this.fullscreenOnlyNode && (this.fullscreenOnlyNode.kill(), this.fullscreenOnlyNode = null)
							}
							changeSpinToImage() {
								if (this.slideContent.removeClass(u.Mu + "-component"), this.contentWrapper.removeClass(u.Mu + "-content-" + u.tm[this.slideType]), this.lastOriginNode = this.slideContent, this.slideContent = l.A.$new("img", {
										"data-src": this.slideContent.attr("data-src")
									}), this.slideContent.addClass(u.Mu + "-component"), this.parseSlide(), this.isInDom = 0, this.appendToDOM(), this.isPlaceholder) {
									const t = C(this.slideContent);
									this.selector.isCustom || (this.selector.src = t ? t.data : null)
								}
								this.selector.node && !this.selector.isCustom && this.selector.node.attr("data-type", u.tm[this.slideType]), this.isStartedFullInit && (this.isStartedFullInit = !1, this.startFullInit())
							}
							scrollIntoView() {
								this.instanceNode.node.scrollIntoView({
									behavior: "smooth"
								})
							}
							setSirvEvents() {
								this.on("stats", (t => {
									t.stopEmptyEvent(), t.data.index = this._index
								})), this.on("error", (t => {
									t.stopEmptyEvent(), t.data.UUID = this.$J_UUID
								})), this.on("goToFullscreen", (t => {
									t.stopEmptyEvent(), t.data || (t.data = {}), t.data.UUID = this.$J_UUID, t.data.index = this._index
								})), this.on("reloadThumbnail", (t => {
									this.customSelector ? t.stopAll() : (t.stopEmptyEvent(), t.data || (t.data = {}), t.data.UUID = this.$J_UUID, t.data.index = this._index)
								})), this.on("componentEvent", (t => {
									t.stopEmptyEvent();
									const e = t.data.data;
									var i, s;
									if (e.type = t.data.type, e.node = this.slideContent, "ready" === t.data.type && (this.isReady = !0, this.fsState !== u.a0.OPENED && (null == (i = this.fsButton) || i.enable(), null == (s = this.fsButton) || s.show())), t.data.slide = this.api, t.data.componentEventData = e, [u.tm[u.mo.SPIN], u.tm[u.mo.MODEL]].includes(t.data.component)) {
										if ("init" === t.data.type && (this.componentLoader.hide(), t.data.component === u.tm[u.mo.SPIN])) {
											this.spinWasInited = !0;
											const t = {
												row: "x",
												col: "y",
												bidir: "xy"
											};
											this.selector.node && this.selector.node.addClass(t[this.sirvService.getSpinOrientation()] || "")
										}
									} else "ready" === t.data.type && this.componentLoader.hide();
									"ready" === t.data.type && ["spin", "zoom"].includes(t.data.component) && this.sirvService.zoomable && this.contentWrapper.addClass(b)
								}))
							}
							getLinkSocialButton(t, e, i) {
								return i ? this.sirv ? this.sirvService.getSocialButtonData(t, this.api.component === u.tm[u.mo.SPIN]) : "iframe" === this.slideContent.tagName ? this.video.node.attr("data-src") : this.slideContent.attr("data-src") : null
							}
							searchImagesInHtmlContent() {
								const t = Array.from(this.slideContent.node.querySelectorAll("img"));
								t.length && (this.multiImages = t.map(((t, e) => {
									const i = !P.checkNonSirv(t);
									return i && (this.sirvService ? this.sirvService.push(t) : (this.setSirvEvents(), this.selector.isSirv = !0, this.sirvService = new g.A(t, this._options, E(this._options)), this.sirvService.parentClass = this, this.sirvService.start(), this.createSlideApi())), {
										isSirv: i,
										node: t,
										src: l.A.$(t).attr("src"),
										datasrc: l.A.$(t).attr("data-src")
									}
								})))
							}
							isCustomSlideEmpty() {
								if (this.customSelector) {
									const t = this.slideContent.node.querySelector(y.XY);
									if (t) {
										l.A.$(t).remove();
										const e = Array.from(this.slideContent.node.children).length;
										if (this.slideContent.append(t), P.isSirvComponent(this.slideContent) && P.hasComponent(this.slideContent) && !this.isPlaceholder || e || h.A.isVideo(this.slideContent) || this.slideContent.attr("data-src")) return !1
									}
								}
								return !0
							}
							beforeParseSlide() {
								this.customSelector && (this.isCustomSlideEmpty() && (this.availableSlide = !1, this.selector.activated = !1), this.selector.node.remove())
							}
							createImgFromDiv() {
								if ("div" === this.slideContent.tagName && this.type === u.mo.IMAGE) {
									const t = this.slideContent;
									this.slideContent = l.A.$new("img"), this.slideContent.attr("data-src", this.url), this.originAlt && this.slideContent.attr("alt", this.originAlt), this.dataAlt && this.slideContent.attr("data-alt", this.dataAlt), t.node.getAttributeNames().filter((t => !["alt", "data-alt"].includes(t))).forEach((e => {
										this.slideContent.attr(e, t.attr(e))
									}))
								}
							}
							parseSlide() {
								P.isSirvComponent(this.slideContent) && P.hasComponent(this.slideContent) && !this.isPlaceholder ? (this.setSirvEvents(), this.createImgFromDiv(), this.sirvService = new g.A(this.slideContent.node, this._options, E(this._options)), this.sirvService.parentClass = this, this.selector.isSirv = !0, this.sirvService.start(), this.createSlideApi(), this.selector.isVideo = this.sirvService.type === u.mo.VIDEO, this.contentWrapper.addClass(u.Mu + "-content-" + u.tm[this.slideType])) : (this.createImgFromDiv(), this.searchImagesInHtmlContent(), h.A.isVideo(this.slideContent) && (this.selector.isVideo = !0, this.initVideo(), this.contentWrapper.addClass(u.Mu + "-content-video")), this.setZeroFont(!0)), (this.dataThumbnailImage || this.dataThumbnailHtml) && (this.selector.isSirv = !1)
							}
							appendToDOM() {
								this.isInDom || (this.isInDom = 1, this.createFullscreenOnlyScreen(), this.sirv || this.video ? (this.createComponentLoader(), this.video ? this.contentWrapper.append(this.video.node) : this.contentWrapper.append(this.slideContent)) : ("img" === this.slideContent.tagName && (this.contentWrapper.addClass(u.Mu + "-slide-img"), (0, v.A)(this.slideContent.attr("src")) || this.slideContent.attr("src", this.slideContent.attr("data-src"))), this.multiImages.forEach((t => {
									!t.src && t.datasrc && l.A.$(t.node).attr("src", t.datasrc)
								})), this.contentWrapper.append(this.slideContent)), l.A.$new("div").addClass(u.Mu + "-selection-area").appendTo(this.instanceNode), this.setFullscreenEvents())
							}
							afterAddingDom() {
								this.video && this.video.init(), this.sirv && [u.mo.VIDEO, u.mo.MODEL].includes(this.sirvService.type) && this.sirvService.loadSources()
							}
							secondSelectorClick() {
								this.sirv ? this.broadcast("secondSelectorClick", {
									data: {
										slideIndex: this._index
									}
								}) : this.video && this.video.pause()
							}
							isSirvSelector() {
								return this.selector.isCustom ? this.selector.isSirv : this.sirv && this.sirvService.type !== u.mo.VIDEO
							}
							getSelectorProportion() {
								return this.dataThumbnailImage ? new Promise(((t, e) => {
									this.getResponsiveImage().then((() => t(Object.assign({}, this.selector)))).catch((i => {
										(0, n.A)(this.dataThumbnailImage).then((e => {
											this.selector.size = e.size, t(Object.assign({}, this.selector))
										})).catch((t => {
											e(t)
										}))
									}))
								})) : this.video ? this.getNonSirvVideoThumbnail() : this.sirv && this.sirvService.type === u.mo.MODEL ? this.sirvService.getSelectorProportion() : this.getSlideSize()
							}
							getSelectorReferrerPolicy() {
								const t = "no-referrer-when-downgrade";
								if (this.selector.isCustom) {
									if (this.selector.node.hasAttribute("data-referrerpolicy")) return this.selector.node.attr("data-referrerpolicy");
									const e = Array.from(this.selector.node.node.children).filter((t => "img" === l.A.$(t).tagName));
									if (1 === e.length) return l.A.$(e[0]).attr("referrerpolicy") || t
								}
								return this.slideContent.attr("data-referrerpolicy") || this.slideContent.attr("referrerpolicy") || t
							}
							getResponsiveImage() {
								if (!this.customThumbnailImageClassPromise) {
									let t = this.dataThumbnailImage.split("?")[1];
									t = t ? {
										imageSettings: (0, a.A)(t)
									} : {}, this.customThumbnailImageClassPromise = new Promise(((e, i) => {
										const s = new p.A(this.dataThumbnailImage, t);
										s.loadInfo().then((t => {
											this.selector.isSirv = !0, this.selector.size = s.originSize, e(s)
										})).catch(i)
									}))
								}
								return this.customThumbnailImageClassPromise
							}
							getSirvThumbnailForCustomSelector(t) {
								return new Promise(((e, i) => {
									this.getResponsiveImage().then((i => {
										const s = i.getThumbnail(t);
										s.referrerpolicy = this.thumbnailReferrerPolicy, e(s)
									})).catch(i)
								}))
							}
							getSelectorImgUrl(t, e, i, s) {
								const o = {
									crop: i,
									watermark: s
								};
								e.width && (o.width = e.width), e.height && (o.height = e.height);
								const n = t => (t.src && (this.selector.src = t.src), t.srcset && (this.selector.srcset = t.srcset), Object.assign({}, t, this.selector));
								return new Promise(((t, e) => {
									const i = () => {
										this.selector.isCustom && this.dataThumbnailImage ? this.selector.isStatic ? t(Object.assign({}, this.selector, {
											alt: this.alt
										})) : this.getSirvThumbnailForCustomSelector(o).then((e => t(Object.assign({}, n(e), {
											alt: this.alt
										})))).catch((() => t(Object.assign({}, this.selector, {
											alt: this.alt
										})))) : "img" === this.slideContent.tagName || this.multiImages.length ? t(Object.assign({}, this.selector, {
											alt: this.alt
										})) : this.video && this.getNonSirvVideoThumbnail().then(t).catch(e)
									};
									this.sirv ? this.sirvService.getInfoSize().then((i => {
										this.selector.isCustom ? this.selector.isStatic ? t(Object.assign({}, this.selector, {
											alt: this.alt
										})) : this.getSirvThumbnailForCustomSelector(o).then((e => t(Object.assign({}, n(e), {
											alt: this.alt
										})))).catch((() => t(Object.assign({}, this.selector, {
											alt: this.alt
										})))) : this.sirvService.getSelectorImgUrl(o).then((e => {
											e.referrerpolicy = this.thumbnailReferrerPolicy, t(n(e))
										})).catch(e)
									})).catch((() => {
										this.selector.isCustom ? i() : e()
									})) : i()
								}))
							}
							getNonSirvVideoThumbnail() {
								return this.getVideoThumbnailPromise || (this.getVideoThumbnailPromise = new Promise(((t, e) => {
									h.A.getImageSrc(this.slideContent, !0).then((e => {
										this.selector.isCustom || (this.selector.src = e.thumbnail.url, this.selector.size = {
											width: e.thumbnail.width,
											height: e.thumbnail.height
										}), t(Object.assign({}, this.selector, {
											alt: this.alt
										}))
									})).catch((t => {
										t && !0 !== t ? t.UUID = this.$J_UUID : t = {
											UUID: this.$J_UUID
										}, e(t)
									}))
								}))), this.getVideoThumbnailPromise
							}
							get spinInited() {
								return this.spinWasInited
							}
							get slideReady() {
								return this.isReady
							}
							get selectorData() {
								if (this.dataHiddenSelector) return null;
								if (this.selector.node || (this.selector.node = l.A.$new(y.XY).addClass(y.Xu)), this.dataThumbnailImage) {
									const t = this.slideType;
									null !== t && this.selector.node.attr("data-type", u.tm[t]), this.selector.src = this.dataThumbnailImage, this.selector.isStatic || (this.selector.infoPromise = new Promise((t => {
										this.getResponsiveImage().catch((t => {})).finally((() => {
											t(this.selector.isSirv, this.selector.size)
										}))
									})))
								} else if (this.dataThumbnailHtml) this.selector.selectorContent = l.A.$new("div").changeContent(this.dataThumbnailHtml).node.firstChild, this.selector.node.attr("data-type", "html");
								else if (this.selector.isCustom) this.selector.node.attr("data-type", "html"), this.selector.selectorContent = this.selector.node;
								else if (this.sirv) {
									const t = this.slideType;
									this.selector.node.attr("data-type", u.tm[t]), t === u.mo.SPIN && this.sirvService.isThumbnailGif() && this.selector.node.addClass("spin-thumbnail-gif")
								} else {
									const t = C(this.slideContent.node);
									["youtube", "vimeo", "video"].includes(t.type) ? this.selector.node.attr("data-type", t.type) : "img" === t.type ? this.selector.src = t.data : (this.selector.selectorContent = t.data, this.selector.node.attr("data-type", "html"))
								}
								return this.selector.isCustom && this.selector.node.addClass(u.Mu + "-custom-thumbnail"), this.selector.disabled = !this._enabled, this.selector
							}
							get UUID() {
								return this.$J_UUID
							}
							get slideActive() {
								return this.isActive
							}
							playVideo() {
								this.isActive && this.inView && this.video && (this.fsState === u.a0.OPENED || [u.eO.AUTOPLAY, u.eO.USER, u.eO.INIT].includes(this.slideShownBy)) && this.video.play()
							}
							initVideo() {
								this.on("slideVideoReady", (t => {
									var e, i;
									t.stop(), this.isVideoReady || (this.isVideoReady = !0, this.isReady = !0, this.video.show(), this.componentLoader.hide(), null == (e = this.fsButton) || e.enable(), null == (i = this.fsButton) || i.show()), !this.video.autoplay && this.video.preStart || this.playVideo()
								})), this.on("slideVideoPlay", (t => {
									t.data.slide = this.api, this.isVideoPaused && !this.video.autoplay && this.video.pause(), this.isVideoPaused = !1
								})), this.on("slideVideoPause", (t => {
									t.data.slide = this.api
								})), this.on("slideVideoEnd", (t => {
									t.data.slide = this.api
								})), this.on("slideVideoError", (t => {
									t.data.UUID = this.$J_UUID
								}));
								const t = this._options.video;
								switch (h.A.getType(this.slideContent)) {
									case "youtube":
										this.video = new m.A.YouTubeVideo(this.slideContent, t, this._options.hasBreakpoints);
										break;
									case "vimeo":
										this.video = new m.A.VimeoVideo(this.slideContent, t, this._options.hasBreakpoints);
										break;
									case "video":
										this.video = new m.A.HTMLVideo(this.slideContent, t, this._options.hasBreakpoints)
								}
								this.video.parentClass = this
							}
							resize() {
								if (this._enabled && this.sirvService) {
									this.sirvService.resize();
									const t = u.mo;
									this.isReady && [t.SPIN, t.ZOOM].includes(this.slideType) && (this.sirvService.zoomable ? this.contentWrapper.addClass(b) : this.contentWrapper.removeClass(b))
								}
							}
							destroy() {
								var t, e, i;
								this.isCustomId && this.slideContent.removeAttr("id", this.id), null == (t = this.intersectionObserver) || t.disconnect(), this.intersectionObserver = null, this.sirvService ? (this.sirvService.destroy(), this.sirvService = null, this.off("stats"), this.off("error"), this.off("goToFullscreen"), this.off("reloadThumbnail"), this.off("componentEvent")) : this.multiImages.forEach((t => {
									!t.src && t.datasrc && t.node.removeAttribute("src")
								})), null == (e = this.fsButton) || e.destroy(), this.fsButton = null, this.removeEventCloseFullscreeByClick(), this.sendEventCloseFullscreenByClick = null, this.lastOriginNode && (this.slideContent.remove(), this.slideContent = this.lastOriginNode, this.lastOriginNode = null), this.fullscreenOnlyNode && (this.fullscreenOnlyNode.kill(), this.fullscreenOnlyNode = null), this.off("beforeFullscreenIn"), this.off("afterFullscreenIn"), this.off("beforeFullscreenOut"), this.off("afterFullscreenOut"), this.off("inView"), this.video && (this.off("slideVideoReady"), this.off("slideVideoPlay"), this.off("slideVideoPause"), this.off("slideVideoEnd"), this.off("slideVideoError"), this.video.destroy()), this.video = null, this.componentLoader && (this.componentLoader.destroy(), this.componentLoader = null), null == (i = this.socialbuttons) || i.destroy(), this.socialbuttons = null, this.sizePromise = null, this.componentSize = null, this.contentWrapper.remove(), this.contentWrapper = null, this.instanceNode.remove(), this.instanceNode = null, this.slideContent = null, this.isReady = !1, this.availableSlide = null, super.destroy()
							}
						}
						const N = P;
						s()
					} catch (t) {
						s(t)
					}
				}))
			},
			3355: (t, e, i) => {
				i.d(e, {
					A: () => m
				});
				var s = i(8479),
					o = i(2084),
					n = i(413),
					a = i(7741),
					h = i(7290),
					r = i(7985),
					l = i(511),
					d = i(8414),
					c = i(5654);
				const p = t => {
					const e = (t = a.A.$(t)).attr("data-src");
					return e ? (t.attr("data-src", e.split("?")[0]), t.removeAttr("src")) : t.node.src = t.node.src.split("?")[0], t
				};
				class u extends r.A {
					constructor(t, e, i) {
						super(), this.type = "video", this._node = a.A.$(t), this._options = e, this.hasBreakpoints = i, this.instanceOptions = null, this.breakpoints = [], this.player = null, this.state = l.G_.NONE, this.isReady = !1, this.isShown = !1, this.id = null, this.playDebounce = null, this.currentTime = 0, this.setOptions(this._options), this.normalizeOptions(), this.videoNode = a.A.$new("div"), this.videoWrapper = a.A.$new("div").addClass(l.Mu + "-video").setCss({
							transition: "opacity .3 linear"
						}), Array.from(this._node.node.attributes).forEach((t => {
							["class", "style"].includes(t.name) || this.videoWrapper.attr(t.name, t.value)
						})), this.videoWrapper.attr("data-video-type", this.type), this.fullscreen = this.option("controls.fullscreen"), this.hide()
					}
					get autoplay() {
						return this.option("autoplay")
					}
					setOptions(t) {
						const e = new a.A.Options(h.A);
						e.fromJSON(t.common.common), e.fromString(t.local.common), e.fromString(this._node.attr("data-options") || ""), t.breakpoints && t.breakpoints.forEach((t => e.fromJSON(t))), a.A.browser.touchScreen && a.A.browser.mobile && !this.hasBreakpoints && (e.fromJSON(t.common.mobile), e.fromString(t.local.mobile), e.fromString(this._node.attr("data-mobile-options") || "")), this.option = function() {
							return arguments.length > 1 ? e.set(arguments.length <= 0 ? void 0 : arguments[0], arguments.length <= 1 ? void 0 : arguments[1]) : e.get(arguments.length <= 0 ? void 0 : arguments[0])
						}, this.instanceOptions = e
					}
					normalizeOptions() {
						this.option("background") && (this.option("controls.enable", !1), this.option("loop", !0), this.option("autoplay", !0))
					}
					onBeforeFullscreenIn() {
						this.getCurrentTime(), this.fullscreen = !1
					}
					onAfterFullscreenIn() {}
					onBeforeFullscreenOut() {
						this.getCurrentTime(), this.fullscreen = this.option("controls.fullscreen")
					}
					onAfterFullscreenOut() {}
					getSize() {
						return new Promise((t => {
							const e = this.videoWrapper.size;
							e.width && e.height ? t(e) : n.A.getAspectRatio(this._node).then((i => {
								e.width ? e.height = e.width * i : e.width = e.height / i, t(e)
							})).catch((() => {
								t(null)
							}))
						}))
					}
					mute() {
						this.player.player.node.volume = !1, this.player.player.attr("muted", "true")
					}
					unMute() {
						this.player.player.removeAttr("muted")
					}
					setVolume() {
						this.player.player.node.volume = this.option("volume") / 100
					}
					setLoop() {
						this.player.player.removeAttr("loop"), this.option("loop") && this.player.player.attr("loop", "loop")
					}
					setControls() {
						this.player.player.removeAttr("controls"), this.option("controls.enable") && this.player.player.attr("controls", "controls")
					}
					updateOtherOptions() {
						this.player.player.attr("preload", this.option("preload") ? "auto" : "none")
					}
					updateOptions(t) {
						(0, c.A)(this._options, t) || (this._options = t, this.setOptions(this._options), this.normalizeOptions(), this.player && (this.pause(), this.unMute(), this.setVolume(), this.autoplay && (this.mute(), this.play()), this.setLoop(), this.setControls(), this.updateOtherOptions()))
					}
					createPlayer(t) {
						return this.player = {
							ready: !0,
							play: () => {
								this.playDebounce()
							},
							pause: () => {
								this.player.player.node.pause()
							},
							player: this._node
						}, this.playDebounce = (0, s.A)((() => {
							this.player.player.node.play()
						}), 100), this.setLoop(), this.player.player.attr("playsinline", "playsinline"), this.setControls(), this.setVolume(), this.autoplay ? this.mute() : this.unMute(), this.player.player.attr("preload", this.option("preload") ? "auto" : "none"), this.addEvents(), this.emit("slideVideoReady", {
							data: {
								type: this.type,
								error: null
							}
						}), Promise.resolve()
					}
					get node() {
						return this.videoWrapper
					}
					init() {
						"video" === this.type && ((0, d.A)(this._node), "gecko" === a.A.browser.engine && Array.from(this._node.node.children).forEach((t => {
							(t = a.A.$(t)) && "source" === t.tagName && t.node.parentNode.load()
						})), this.videoNode = this._node), this.id = this.type + "-" + (0, o.A)(), this.videoNode.attr("id", this.id), this.videoWrapper.append(this.videoNode);
						const t = {
							type: this.type,
							error: null
						};
						n.A.getAPI(this._node).then((e => {
							this.createPlayer(e).then((() => {
								t.error = !1
							})).catch((e => {
								t.error = !!e
							})).finally((() => {
								this.isReady = !0
							}))
						})).catch((e => {
							t.error = !0, this.emit("slideVideoReady", {
								data: t
							})
						}))
					}
					addEvents() {
						this.player.player.addEvent("play", (t => {
							t.stop(), this.state = l.G_.PLAY, this.emit("slideVideoPlay", {
								data: {
									type: this.type
								}
							})
						})), this.player.player.addEvent("pause", (t => {
							t.stop(), this.state = l.G_.PAUSE, this.emit("slideVideoPause", {
								data: {
									type: this.type
								}
							})
						})), this.player.player.addEvent("ended", (t => {
							t.stop(), this.state = l.G_.PAUSE, this.emit("slideVideoEnd", {
								data: {
									type: this.type
								}
							})
						})), this.player.player.addEvent("error", (t => {
							t.stop(), this.emit("slideVideoError", {
								data: {
									type: this.type,
									error: t.oe
								}
							})
						}))
					}
					play() {
						this.player && this.player.ready && (this.setCurrentTime(), this.player.play())
					}
					pause() {
						this.player && this.player.ready && this.player.pause()
					}
					getCurrentTime() {
						this.player && this.player.player && (this.currentTime = this.player.player.currentTime)
					}
					setCurrentTime() {
						this.player && this.player.ready && (this.player.player.currentTime = this.currentTime)
					}
					get preStart() {
						return this.state === l.G_.NONE
					}
					get paused() {
						return this.state === l.G_.PAUSE
					}
					show() {
						this.isShown = !0, this.videoWrapper.setCssProp("opacity", 1)
					}
					hide() {
						this.isShown = !1, this.videoWrapper.setCssProp("opacity", 0)
					}
					destroy() {
						this.playDebounce && (this.playDebounce.cancel(), this.playDebounce = null), this.pause(), this.videoWrapper.remove(), this._node = p(this._node), "video" === this.type && Array.from(this._node.node.children).forEach((t => {
							"source" === a.A.$(t).tagName && p(t)
						})), super.destroy()
					}
				}
				const m = {
					HTMLVideo: u,
					YouTubeVideo: class extends u {
						constructor(t, e, i) {
							super(t, e, i), this.type = "youtube", this.playerState = -1, this.videoWrapper.attr("data-video-type", this.type), this.apiPlayer = null, this.option("background") && this.videoWrapper.setCss({
								pointerEvents: "none"
							})
						}
						mute() {
							this.player.player.mute()
						}
						unMute() {
							this.player.player.unMute()
						}
						setVolume() {
							this.player.player.setVolume(this.option("volume"))
						}
						setLoop() {
							this.player.player.setLoop(this.option("loop"))
						}
						setControls() {}
						updateOtherOptions() {
							this.option("background") ? this.videoWrapper.setCss({
								pointerEvents: "none"
							}) : this.videoWrapper.setCss({
								pointerEvents: ""
							})
						}
						setCurrentTime() {
							this.player && this.player.ready && this.player.player.seekTo(this.currentTime)
						}
						getCurrentTime() {
							this.player && this.player.player && (this.player.player.getCurrentTime ? this.currentTime = this.player.player.getCurrentTime() : this.currentTime = 0)
						}
						destroyVideoPlayer() {
							this.getCurrentTime(), this.player && this.player.player && (this.player.ready = !1, this.player.player.destroy()), this.playerState = -1
						}
						onBeforeFullscreenIn() {
							this.fullscreen = !1, this.destroyVideoPlayer()
						}
						onAfterFullscreenIn() {
							this.createPlayer(this.apiPlayer)
						}
						onBeforeFullscreenOut() {
							this.fullscreen = this.option("controls.fullscreen"), this.destroyVideoPlayer()
						}
						onAfterFullscreenOut() {
							this.createPlayer(this.apiPlayer)
						}
						createPlayer(t) {
							return this.apiPlayer = t, new Promise(((e, i) => {
								var s;
								const o = n.A.getId(this._node);
								this.player = {
									ready: !1,
									play: () => {
										this.player.player.playVideo()
									},
									pause: () => {
										this.player.player.pauseVideo()
									},
									player: new t.Player(this.id, {
										videoId: o,
										host: "https://www.youtube.com",
										playerVars: {
											playlist: o,
											fs: this.fullscreen ? 1 : 0,
											rel: 0,
											loop: this.option("loop") ? 1 : 0,
											autoplay: 0,
											mute: this.autoplay ? 1 : 0,
											playsinline: 1,
											controls: this.option("controls.enable") ? 1 : 0,
											disablekb: this.option("background") ? 1 : 0,
											origin: window.location.origin
										},
										events: {
											onReady: () => {
												this.playerState = -1, this.player.ready = !0, this.player.player.setVolume(this.option("volume")), this.emit("slideVideoReady", {
													data: {
														type: this.type,
														error: null
													}
												}), e()
											},
											onError: t => {
												100 === t.data && (this.player = null), i(!0)
											},
											onStateChange: this.addEvents.bind(this)
										}
									})
								}, null != (s = this.player.player.h.attributes) && s.sandbox && (this.player.player.h.attributes.sandbox.value = "allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-presentation")
							}))
						}
						addEvents(t) {
							const e = (t.target || t.target).getPlayerState();
							switch (this.playerState = e, this.state === l.G_.PLAY && (this.state = l.G_.PAUSE), e) {
								case -1:
									break;
								case 0:
									this.option("loop") || this.player.pause(), this.emit("slideVideoEnd", {
										data: {
											type: this.type
										}
									});
									break;
								case 1:
									this.state = l.G_.PLAY, this.emit("slideVideoPlay", {
										data: {
											type: this.type
										}
									});
									break;
								case 2:
									this.state = l.G_.PAUSE, this.emit("slideVideoPause", {
										data: {
											type: this.type
										}
									})
							}
						}
						destroy() {
							super.destroy(), this.player && this.player.player && (this.player.player.destroy(), this.player.player = null)
						}
					},
					VimeoVideo: class extends u {
						constructor(t, e, i) {
							super(t, e, i), this.type = "vimeo", this.apiPlayer = null, this.videoWrapper.attr("data-video-type", this.type)
						}
						mute() {
							this.player.player.setVolume(0)
						}
						unMute() {
							this.setVolume()
						}
						setVolume() {
							this.player.player.setVolume(this.option("volume") / 100)
						}
						setLoop() {
							this.player.player.setLoop(this.option("loop"))
						}
						setControls() {}
						updateOtherOptions() {}
						createPlayer(t) {
							return this.apiPlayer = t, new Promise(((e, i) => {
								if (this.videoNode.attr("data-vimeo-id", n.A.getId(this._node)), t.Player) {
									const i = this.videoNode.attr("data-src");
									i && this.videoNode.attr("src", i);
									const s = {
										id: n.A.getId(this._node),
										loop: this.option("loop"),
										controls: this.option("controls.enable"),
										speed: this.option("controls.speed"),
										keyboard: !this.option("background")
									};
									this.player = {
										ready: !1,
										play: () => {
											this.state === l.G_.NONE && this.player.player.setVolume(0), this.player.player.play()
										},
										pause: () => {
											this.player.player.pause()
										},
										player: new t.Player(this.videoNode.node, s)
									}, this.addEvents(e)
								} else i(!0)
							}))
						}
						destroyVideoPlayer() {
							this.player && this.player.player && (this.player.ready = !1, this.player.player.destroy())
						}
						play() {
							this.player && this.player.ready && (this.setCurrentTime(), this.player.play())
						}
						onBeforeFullscreenIn() {
							this.destroyVideoPlayer()
						}
						onAfterFullscreenIn() {
							this.createPlayer(this.apiPlayer)
						}
						onBeforeFullscreenOut() {
							this.destroyVideoPlayer()
						}
						onAfterFullscreenOut() {
							this.createPlayer(this.apiPlayer)
						}
						getCurrentTime() {}
						setCurrentTime() {
							this.player && this.player.ready && this.player.player.setCurrentTime(this.currentTime)
						}
						addEvents(t) {
							this.player.player.on("play", (() => {
								this.state = l.G_.PLAY, this.emit("slideVideoPlay", {
									data: {
										type: this.type
									}
								})
							})), this.player.player.on("pause", (() => {
								this.state = l.G_.PAUSE, this.emit("slideVideoPause", {
									data: {
										type: this.type
									}
								})
							})), this.player.player.on("ended", (() => {
								this.state = l.G_.PAUSE, this.emit("slideVideoEnd", {
									data: {
										type: this.type
									}
								})
							})), this.player.player.on("loaded", (() => {})), this.player.player.on("timeupdate", (t => {
								this.currentTime = t.seconds
							})), this.player.player ? this.player.player.ready().then((() => {
								this.player.ready = !0, this.state === l.G_.PLAY && (this.state = l.G_.PAUSE), this.player.player.setVolume(this.option("volume") / 100), this.emit("slideVideoReady", {
									data: {
										type: this.type,
										error: null
									}
								}), t()
							})) : this.emit("slideVideoReady", {
								data: {
									type: this.type,
									error: new Error("Player does not exist.")
								}
							})
						}
						destroy() {
							super.destroy(), this.videoNode.remove(), this.videoNode = null, this.videoWrapper.remove(), this.videoWrapper = null, this.player && this.player.player && (this.player.player.destroy(), this.player.player = null), this._node = null
						}
					}
				}
			},
			8462: (t, e, i) => {
				i.a(t, (async(t, s) => {
					try {
						i.d(e, {
							A: () => X
						});
						var o = i(7741),
							n = i(1323),
							a = i(8479),
							h = i(2084),
							r = i(4357),
							l = i(3127),
							d = i(7259),
							c = i(4130),
							p = i(3125),
							u = i(7985),
							m = i(9513),
							g = i(511),
							v = i(757),
							f = i(1990),
							y = i(4003),
							S = i(4681),
							w = i(6242),
							b = i(6148),
							A = i(7064),
							x = i(413),
							z = i(8004),
							C = i(6687),
							I = i(6548),
							E = i(5654),
							P = i(7746),
							N = t([f]);
						f = (N.then ? (await N)() : N)[0];
						let O = null,
							T = null;
						const D = "fullscreen",
							M = o.A.camelize("-" + D),
							k = g.Mu + "-grid-gallery",
							_ = g.Mu + "-fullsreen-always",
							L = g.Mu + "-external",
							F = {
								horizontal: g.Mu + "-h",
								vertical: g.Mu + "-v"
							},
							B = g.Mu + "-pseudo-" + D,
							R = {
								width: "100%",
								height: "100%"
							},
							H = {
								width: "100%"
							},
							U = 1e3,
							j = 8,
							V = new RegExp("^" + g.Mu + "-\\d+$"),
							$ = t => {
								const e = [];
								let i = 0,
									s = 0;
								for (let n = 0, a = t.length; n < a; n++) {
									let a = t[n];
									a.querySelector(z.XY) && (a = a.querySelector(z.XY));
									const h = o.A.$(a).attr("data-pinned"),
										r = a.hasAttribute("data-pinned");
									s >= 3 && "start" === h || i >= 3 && (r && h && ("end" === h || "end" !== h && "start" !== h) || r && !h) || (s < 3 && "start" === h && s++, (i < 3 && r && h && ("end" === h || "end" !== h && "start" !== h) || r && !h) && i++, e.push(t[n]))
								}
								return e
							},
							W = t => {
								const e = t.attr("data-src");
								return e && e.endsWith(".url") ? (0, A.A)(e, "url_data_generateUUID()").then((e => (e.url && t.attr("data-src", e.url), e.title && t.attr("title", e.title), t))).catch((() => null)) : Promise.resolve(t)
							};
						class Z extends u.A {
							constructor(t, e) {
								var i;
								super(), i = this, this.instanceNode = o.A.$(t), this.instanceOptions = e.options, this.option = function() {
									return arguments.length > 1 ? i.instanceOptions.set(arguments.length <= 0 ? void 0 : arguments[0], arguments.length <= 1 ? void 0 : arguments[1]) : i.instanceOptions.get(arguments.length <= 0 ? void 0 : arguments[0])
								}, this.rootMargin = 0, this.normalizeOptions(), this.slideOptions = this.makeSlideOptions(e.slideOptions), this.id = this.instanceNode.attr("id"), this.id || (this.id = g.Mu + "-" + (0, h.A)(), this.instanceNode.attr("id", this.id)), this.instanceNode.attr("role", "region"), this.mainHasAreaLabel = !!this.instanceNode.attr("aria-label"), this.setMainAreaLabel(), this.lazyInit = e.lazyInit, this.movingContainer = o.A.$new("div").addClass(g.Mu), this.fakeMovingContainer = o.A.$new("div"), this.slideWrapper = o.A.$new("div").addClass(g.Mu + "-slides-box"), this.slidesContainer = o.A.$new("div").addClass(g.Mu + "-slides"), this.selectorsWrapper = o.A.$new("div").addClass(g.Mu + "-selectors-box"), this.fullScreenBox = o.A.$new("div").addClass(g.Mu + "-" + D + "-box"), this.controlsWrapper = o.A.$new("div").addClass(g.Mu + "-controls"), this.producDetailsText = this.instanceNode.attr("data-product-detail"), this.productDetail = null, this.fullScreenBox.addEvent(["mousescroll", "touchstart"], (t => {
									t.stopDistribution()
								})), this.isReady = !1, this.isMoving = !1, this.isSelectorsReady = !1, this.isToolStarted = !1, this.isInitialized = !1, this.isStartedFullInit = !1, this.intersectionObserver = null, this.isInView = !1, this.firstSlideAhead = !1, this.fsButton = null, this.doSetSize = !1, this.heightProportion = null, this.slides = [], this.originalSlidesOrder = [], this.enabledSlideIndexes = [], this.selectors = null, this.arrows = null, this.contextMenu = null, this.countOfSizes = [], this.fsState = g.a0.CLOSED, this.fullscreenStartTime = null, this.index = this.option("slide.first"), this.movingContainerId = g.Mu + "-" + (0, h.A)(), this.cssRulesId = "sirv_css_rules-" + (0, h.A)(), this.isComponentPinching = !1, this.isZoomIn = !1, this.hasSize = !1, this.isPseudo = !1, this.isAutoplay = this.option("slide.autoplay"), this.autoplayDelay = this.option("slide.delay"), this.remainingAutoplayTime = this.autoplayDelay, this.sliderNodes = [], this.destroyed = !1, this.autoplayTimer = null, this.timerRemove = null, this.selectorsPositionClasses = null, this.onResizeDebounce = (0, a.A)((() => {
									this.onResizeWithoutSelectors()
								}), 16), this.startGettingInfoDebounce = (0, a.A)((() => {
									this.startGettingInfo()
								}), 16), this.selectorsDebounce = null, this.saveHistory = this.option(D + ".history"), this.fullscreenViewId = null, this.controlsWrapperAdded = !1, this.clearingTouchdragFunction = null, this.externalContainer = null, o.A.browser.mobile && this.movingContainer.addClass(g.Mu + "-mobile"), this.onResizeHandler = this.onResize.bind(this), this.onScrollHandler = null, this.pseudoFSEvent = t => {
									27 === t.oe.keyCode && (o.A.$(document).removeEvent("keydown", this.pseudoFSEvent), this.exitFullScreen())
								}, this.keyboardCallback = t => {
									if (!this.isReady) return;
									const e = t.oe.keyCode;
									if ([37, 38, 39, 40].includes(e)) {
										const i = o.A.$(document.activeElement),
											s = this.slides[this.index];
										if (this.movingContainer.node.contains(document.activeElement) && i.hasClass(g.Mu + "-slide") && (null == s ? void 0 : s.type) === g.mo.SPIN) {
											const i = {
													37: "jumpleft",
													38: "jumpup",
													39: "jumpright",
													40: "jumpdown"
												},
												o = s.slideContent.fetch(i[e]);
											if (o) return t.stop(), void o()
										} else if (this.isFullscreen() && this.slides.length > 1 && [37, 39].includes(e) && (null == s ? void 0 : s.type) !== g.mo.MODEL) {
											t.stop();
											const i = 37 === e ? "prev" : "next";
											this.jump(i, g.eO.USER)
										}
									} else if ([32, 13].includes(t.oe.keyCode)) {
										var i;
										const e = o.A.$(document.activeElement),
											s = this.slides[this.index];
										let n;
										"button" === e.tagName || "button" === (null == (i = e.node) ? void 0 : i.role) ? n = e.fetch("action") : (null == s ? void 0 : s.type) === g.mo.VIDEO && e.node === (null == s ? void 0 : s.node) && (n = s.slideContent.fetch("action")), n && (t.stop(), n())
									}
								}, this.onHistoryStateChange = t => {
									try {
										t.oe.state && "Sirv.viewer" === t.oe.state.name ? (g.X2.indexOf(t.oe.state.hash) < 0 && (g.X2.splice(g.X2.indexOf(this.fullscreenViewId), 1), this.fullscreenViewId = t.oe.state.hash, g.X2.push(this.fullscreenViewId)), t.oe.state.hash === this.fullscreenViewId && this.enterFullScreen()) : this.isFullscreen() && this.exitFullScreen()
									} catch (t) {}
								}, this.addComponentsCSS = (0, a.A)((() => {
									v.ms.appendCss(this.instanceNode.node)
								}), 100), v.ms.appendCss(this.instanceNode.node), this.getSlides().then((t => {
									this.destroyed || (this.setComponentsEvents(), this.createSlides(t), (o.A.browser.ready || "loading" !== document.readyState) && this.startFullInit())
								}))
							}
							setMainAreaLabel() {
								this.mainHasAreaLabel || this.instanceNode.attr("aria-label", this.option("a11y.galleryLabel")), this.instanceNode.attr("aria-roledescription", this.option("a11y.galleryRole"))
							}
							isGridLayout() {
								return "grid" === this.option("layout.type") && this.fsState === g.a0.CLOSED
							}
							isFullscreen() {
								return [g.a0.OPENING, g.a0.OPENED].includes(this.fsState)
							}
							setRootMargin() {
								let t = parseInt(this.option("threshold"), 10);
								o.A.isString(this.option("threshold")) && (t = (window.innerHeight || document.documentElement.clientHeight) / 100 * t), this.rootMargin = t
							}
							makeSlideOptions(t) {
								return (0, P.A)({}, t, {
									quality: this.instanceOptions.isset("quality") ? this.option("quality") : null,
									hdQuality: this.option("hdQuality"),
									isHDQualitySet: this.instanceOptions.isset("hdQuality"),
									fullscreenOnly: this.option(D + ".always"),
									isFullscreen: this.option(D + ".enable"),
									fullscreenEnterAriaLabel: this.option("a11y.enterFullscreen"),
									fullscreenExitAriaLabel: this.option("a11y.exitFullscreen"),
									nativeFullscreen: this.option(D + ".native"),
									goToFullscreen: this.option(D + ".enable"),
									layout: this.option("layout.type"),
									rootMargin: this.rootMargin,
									aspectratio: this.option("layout.aspectRatio"),
									autoplay: this.option("video.autoplay"),
									itemLabel: this.option("a11y.itemLabel"),
									itemRole: this.option("a11y.itemRole"),
									zoomInLabel: this.option("a11y.zoomIn"),
									zoomOutLabel: this.option("a11y.zoomOut"),
									sbEnable: this.option("slide.socialbuttons.enable"),
									sbFacebook: this.option("slide.socialbuttons.types.facebook"),
									sbTwitter: this.option("slide.socialbuttons.types.twitter"),
									sbLinkedin: this.option("slide.socialbuttons.types.linkedin"),
									sbReddit: this.option("slide.socialbuttons.types.reddit"),
									sbTumblr: this.option("slide.socialbuttons.types.tumblr"),
									sbPinterest: this.option("slide.socialbuttons.types.pinterest"),
									sbTelegram: this.option("slide.socialbuttons.types.telegram")
								})
							}
							addSelectorsBasis() {
								this.selectors && "grid" === this.option("thumbnails.type") && this.selectorsWrapper.setCss({
									flexBasis: this.option("thumbnails.size") + "px"
								})
							}
							setGridLayoutVars() {
								"grid" === this.option("layout.type") && ("auto" !== this.option("layout.aspectRatio") && this.movingContainer.node.style.setProperty("--" + g.Mu + "-aspect-ratio", this.option("layout.aspectRatio")), this.movingContainer.addClass(k), this.movingContainer.node.style.setProperty("--" + g.Mu + "-grid-gap", this.option("layout.grid.gap")), this.movingContainer.node.style.setProperty("--" + g.Mu + "-grid-columns", this.option("layout.grid.columns")))
							}
							startFullInit(t) {
								var e, i = this;
								if (this.isStartedFullInit || !this.slides.length) return;
								if (this.isStartedFullInit = !0, this.isHiddenSlides()) return;
								t && (this.instanceOptions = t.options, this.option = function() {
									return arguments.length > 1 ? i.instanceOptions.set(arguments.length <= 0 ? void 0 : arguments[0], arguments.length <= 1 ? void 0 : arguments[1]) : i.instanceOptions.get(arguments.length <= 0 ? void 0 : arguments[0])
								}, this.slideOptions = this.makeSlideOptions(t.slideOptions), this.lazyInit = t.lazyInit, this.isAutoplay = this.option("slide.autoplay"), this.autoplayDelay = this.option("slide.delay"), this.remainingAutoplayTime = this.autoplayDelay), this.option(D + ".always") && this.movingContainer.addClass(_), null === O && (O = o.A.browser.mobile && window.matchMedia && window.matchMedia("(max-device-width: 767px), (max-device-height: 767px)").matches), O && "ios" === o.A.browser.platform && (T = o.A.$new("div").setCss({
									position: "fixed",
									top: 0,
									width: 0,
									height: "100vh"
								})), this.normalizeOptions(), this.setGridLayoutVars(), this.setRootMargin(), this.slideWrapper.addClass(F[this.option("orientation")]), this.index = this.option("slide.first");
								const s = this.slides.length;
								if (this.index > s - 1 && (this.index = 0), s > 0 && (!this.slides[this.index].enabled || !this.slides[this.index].slideAvailable)) {
									let t = -1;
									for (let e = 0; e < s; e++) {
										const i = (0, p.A)("next", this.index + e, s, !0);
										if (this.slides[i].enabled && this.slides[i].slideAvailable) {
											t = i;
											break
										}
									}
									this.index = t
								}
								this.createContextMenu(), this.setInViewAction(), this.option("thumbnails.enable") && this.option("thumbnails.target") && (this.externalContainer = o.A.$(document.querySelector(this.option("thumbnails.target"))) || null);
								const n = document.createDocumentFragment();
								n.appendChild(this.movingContainer.node), this.movingContainer.setCssProp("font-size", 0), "grid" === this.option("layout.type") ? this.movingContainer.setCss(H) : this.movingContainer.setCss(R), this.movingContainer.append(this.slideWrapper), this.slides.forEach((e => {
									e.startFullInit(t ? this.slideOptions : null)
								})), this.appendSelectors(!0), this.createClasses(), null == (e = this.selectorsPositionClasses) || e.toStandard(), this.instanceNode.append(n), this.instanceNode.setCssProp("font-size", 0), this.slideWrapper.append(this.slidesContainer), this.slidesContainer.setCss(R), this.instanceNode.render(), this.movingContainer.render(), this.selectorsWrapper.render(), this.slideWrapper.render();
								const a = this.instanceNode.size.height > 0;
								this.createSelectors(), this.addSelectorsBasis();
								const h = () => {
									var t, e;
									this.instanceNode.setCssProp("font-size", ""), this.slides.forEach((t => {
										t.slideAvailable && this.slidesContainer.append(t.node), t.appendToDOM(), t.afterAddingDom()
									})), null == (t = this.selectorsPositionClasses) || t.toStandard(), this.findProportions(), null == (e = this.selectors) || e.init(), this.postInitialization()
								};
								let r = 10;
								const l = () => {
									if (this.destroyed) return;
									let t = this.slidesContainer.node.getBoundingClientRect();
									t.height || (t = this.slideWrapper.node.getBoundingClientRect()), r -= 1, r > 0 && !t.width && (!t.height || a) ? setTimeout(l, 16) : (t.height || (this.doSetSize = !0), "auto" !== this.option("layout.aspectRatio") && (this.heightProportion = {
										width: this.option("layout.aspectRatio"),
										height: 1
									}, this.hasSize = !0), h())
								};
								this.firstSlideAhead && this.broadcast("inView", {
									data: this.isInView
								}), "slider" === this.option("layout.type") ? setTimeout(l, 16) : h()
							}
							visibleSlides() {
								return this.slides.filter((t => t.slideAvailable && t.enabled)).length
							}
							findProportions() {
								const t = this.slides.length,
									e = () => {
										const t = !this.firstSlideAhead && this.option("slide.preload"),
											{
												width: e,
												height: i
											} = this.movingContainer.size;
										this.hasSize = !(!e && !i), this.setContainerSize(), this.intersectionObserver && "edge" === o.A.browser.uaName && this.intersectionObserver.takeRecords(), this.slides.forEach(((e, i) => {
											e.startTool(this.index === i, t, this.firstSlideAhead)
										})), this.createEffect(), this.isToolStarted = !0, this.checkSingleSlide(), "grid" !== this.option("layout.type") && this.index > -1 && (this.slides[this.index].beforeShow(), this.slides[this.index].afterShow(g.eO.INIT)), this.postInitialization()
									},
									i = (e, s) => new Promise(((o, n) => {
										const a = this.slides[e],
											h = this.slides.length;
										if (s.push(e), a) {
											const l = () => {
												let n = (0, r.A)(e + 1, t);
												if (h !== this.slides.length && n > e && (n = e), s.includes(n)) {
													const t = this.slidesContainer.size;
													t.width || (t.width = 500), t.height || (t.height = .5625 * t.width), this.heightProportion = t, o()
												} else i(n, s).then(o)
											};
											a.enabled ? a.getSlideSize().then((t => {
												const e = t.size;
												e && e.width && e.height ? (this.heightProportion = e, o()) : l()
											})).catch((t => {
												let e = this.slides.length;
												t && t.error && 404 === t.error.status && (e -= 1, this.pullSlide(t.UUID)), e > 0 ? l() : n()
											})) : l()
										} else o()
									}));
								this.doSetSize && "grid" !== this.option("layout.type") && "auto" === this.option("layout.aspectRatio") ? i(this.index, []).then((() => {
									e()
								})).catch((() => {})) : e()
							}
							initTouchDrag() {
								const t = "vertical" === this.option("orientation"),
									e = t ? ["y", "top", "height"] : ["x", "left", "width"],
									i = t ? "x" : "y";
								let s, o, n, a, h = !1,
									r = null,
									l = null,
									d = null;
								const c = this.option("loop");
								let p = null,
									u = null,
									m = !0,
									v = null,
									f = 0,
									y = {
										x: null,
										y: null
									},
									S = !1;
								const w = t => t / a * 100,
									b = (t, i) => {
										t && t.node.setCssProp("transform", (t => {
											const i = {
												x: 0,
												y: 0
											};
											return i[e[0]] = t, "translate3d(" + i.x + "%, " + i.y + "%, 0px)"
										})(i))
									},
									A = t => new Promise(((e, i) => {
										let s, o = 100,
											a = 0;
										const h = Math.abs(n),
											c = h > 1;
										(h < 25 || 2 === f || "next" === t && n < 0 || "prev" === t && n > 0) && (m = !1), m || (t = n < 0 ? "prev" : "next"), v = "next" === t ? r : d;
										const p = "next" === t ? d : r;
										var u, g;
										"next" !== t && (o *= -1), p && (p.node.setCssProp("transform", ""), p.afterHide()), m ? (l.beforeHide(), this.sendEvent("beforeSlideIn", {
											slide: v.api
										}), this.sendEvent("beforeSlideOut", {
											slide: l.api
										}), this.index = v.index) : (s = o, o = a, a = s, a *= -1), c && (l.node.addEvent("transitionend", (t => {
											t.stop(), e()
										})), v && v.node.setCssProp("transition", "transform, .3s"), l.node.setCssProp("transition", "transform, .3s"), v && v.node.render(), l.node.render(), null == (u = this.selectors) || u.activateItem(this.index), null == (g = this.selectors) || g.jump(this.index)), v && b(v, a), b(l, o), c || e()
									})),
									x = () => {
										if (h) {
											var t;
											const s = {
												transform: "",
												transition: ""
											};
											var e, i;
											if (l.node.removeEvent("transitionend"), v) m ? (this.checkLoop(this.index), v.afterShow(g.eO.USER), l.afterHide(), this.canSlideFullscreen(this.index) ? null == (e = this.fsButton) || e.show() : null == (i = this.fsButton) || i.hide(), this.sendEvent("afterSlideIn", {
												slide: v.api
											}), this.sendEvent("afterSlideOut", {
												slide: l.api
											})) : v.afterHide(), v.node.setCss(s);
											l.node.setCss(s), m = !0, v = null, null == (t = this.fsButton) || t.enable(), this.autoplay(), h = !1, this.isMoving = !1, p = null, u = null, r = null, l = null, d = null, S = !1
										}
									},
									z = (t, e) => {
										const i = null != e ? e : this.index,
											s = this.getNextIndex(t, i, this.slides.length, c);
										if (null !== s) {
											const e = this.slides[s];
											if (e.index !== this.index) return e.enabled ? e : z(t, e.index)
										}
										return null
									},
									C = t => {
										var i;
										S || (x(), this.effect.stop(), -1 !== this.index && (l = this.slides[this.index], l.isSwipeDisabled() || (h = !0, this.isMoving = !0, s = this.slidesContainer.position[e[1]], a = this.slidesContainer.size[e[2]], u = t[e[0]] - s, o = w(u), n = o, r = z("prev"), d = z("next"), r && d && (r.index === d.index ? r.index < l.index ? d = null : r = null : r.index !== l.index && l.index !== d.index || (r.index === l.index ? r = null : d = null)), r && (b(r, -100), r.beforeShow()), d && (b(d, 100), d.beforeShow()), null == (i = this.fsButton) || i.disable())))
									},
									I = t => {
										let i, a;
										var c;
										h && !S && (h = !0, t.stop(), a = t[e[0]] - s, a < u ? i = "prev" : a > u && (i = "next"), i || (i = n > 0 ? "next" : "prev"), u = a, p = i, n = w(u) - o, !d && n < -10 && (n = -10), !r && n > 10 && (n = 10), b(r, (c = n) - 100), b(l, c), b(d, c + 100))
									};
								this.clearingTouchdragFunction = x, this.slidesContainer.addEvent("touchdrag", (t => {
									this.isComponentPinching || this.isZoomIn || this.slides[this.index].blokedTouchdrag || this.option(D + ".always") && this.fsState !== g.a0.OPENED || this.isGridLayout() || ("dragstart" === t.state ? (y = {
										x: t.x,
										y: t.y
									}, C(t), l.dragEvent(t.state)) : "dragmove" === t.state ? (f || (f = Math.abs(y[e[0]] - t[e[0]]) > Math.abs(y[i] - t[i]) ? 1 : 2), 1 === f && I(t), y = {
										x: t.x,
										y: t.y
									}) : "dragend" === t.state && ((t => {
										h && !S && (1 === f && t.stop(), l.dragEvent(t.state), S = !0, A(p).finally((() => {
											S = !1, x()
										})))
									})(t), f = 0, y = {
										x: null,
										y: null
									}))
								}))
							}
							appendSelectors(t) {
								let e = this.movingContainer;
								this.externalContainer && (this.isFullscreen() ? this.selectorsWrapper.removeClass(L) : (e = this.externalContainer, this.selectorsWrapper.addClass(L))), (t || this.externalContainer) && e.append(this.selectorsWrapper)
							}
							createClasses() {
								const t = "thumbnails";
								(this.option(t + ".enable") || this.option(D + "." + t + ".enable")) && (this.selectorsPositionClasses = new I.A({
									sEnabled: this.option(t + ".enable"),
									sPosition: this.option(t + ".position"),
									sType: this.getSelectorStyle(t + ".type"),
									sGrid: "grid" === this.option(t + ".type"),
									sExternal: this.externalContainer,
									fEnabled: this.option(D + "." + t + ".enable"),
									fPosition: this.option(D + "." + t + ".position"),
									fType: this.getSelectorStyle(D + "." + t + ".type"),
									fGrid: "grid" === this.option(D + "." + t + ".type"),
									fAutohide: this.option(D + "." + t + ".autohide")
								}, this.movingContainer, this.selectorsWrapper))
							}
							setInViewAction() {
								"visible" === this.option("autostart") ? (this.intersectionObserver = new IntersectionObserver((t => {
									t.forEach((t => {
										const e = this.isInView;
										let i = t.isIntersecting || t.intersectionRatio > 0;
										this.isFullscreen() && !i && (i = !0), e !== i && (this.isInView = i, this.postInitialization(), this.broadcast("inView", {
											data: i
										}), this.isInView ? this.autoplay() : this.pauseAutoplay())
									}))
								}), {
									rootMargin: this.rootMargin + "px 0px"
								}), this.intersectionObserver.observe(this.instanceNode.node)) : this.isInView = !0
							}
							sendEvent(t, e) {
								void 0 === e && (e = {}), e.node = this.instanceNode, e.slider || (e.slider = {
									type: t
								}), this.emit("viewerPublicEvent", {
									data: e
								})
							}
							checkReadiness(t, e) {
								return !!["init", "ready"].includes(t) && ("viewer" === e ? "ready" === t && this.isReady : this.slides.some((i => i.checkReadiness(t, e))))
							}
							sendReadyEvent(t, e) {
								"viewer" === e ? this.sendEvent("ready") : this.slides.forEach((i => {
									i.sendReadyEvent(t, e)
								}))
							}
							sendStats(t, e) {
								let i, s;
								void 0 === e && (e = {}), e.slider = this.id, t && (e.data = {
									event: t
								}), "spin" === e.component && (i = {
									account: e.account,
									event: {
										type: e.component,
										name: e.event,
										data: e.data || {},
										sessionId: e.sessionId,
										origin: e.origin
									}
								}, i.event["sessionStart" === e.event ? "ts" : "time"] = e.eventTime, s = JSON.parse(JSON.stringify(i)), s.event = JSON.stringify(s.event)), i && (!0 === e.useBeacon ? (0, l.A)(s, !0) : setTimeout((() => {
									(0, l.A)(s)
								}), 1), this.sendEvent("sendStats", JSON.parse(JSON.stringify(i))))
							}
							canSlideFullscreen(t) {
								const e = this.slides[t];
								return !e || e.slideType === g.mo.SPIN && this.slides.length > 1 || e.canFullscreen()
							}
							setComponentsEvents() {
								const t = t => {
										if (this.firstSlideAhead && t === this.index) {
											const t = this.option("slide.preload");
											this.enabledSlideIndexes.forEach((e => {
												this.slides[e].startGettingInfo(), t ? this.slides[e].loadContent() : this.slides[e].loadThumbnail()
											}))
										}
									},
									e = t => {
										this.index === t && this.autoplay()
									},
									i = t => {
										this.index === t && this.pauseAutoplay()
									};
								this.on("stats", (t => {
									t.stopAll();
									const e = document,
										i = window,
										s = screen;
									"sessionStart" === t.data.event && (t.data.data || (t.data.data = {}), t.data.data.screen = {
										width: s.width,
										height: s.height,
										availWidth: s.availWidth,
										availHeight: s.availHeight,
										colorDepth: s.colorDepth,
										pixelDepth: s.pixelDepth
									}, t.data.data.browser = {
										width: i.innerWidth || e.documentElement.clientWidth || e.body.clientWidth || 0,
										height: i.innerHeight || e.documentElement.clientWidth || e.body.clientWidth || 0
									}), this.sendStats(null, t.data)
								})), this.on("slideVideoPlay", (t => {
									t.stopAll(), i(t.data.slide.index)
								})), this.on("slideVideoPause", (t => {
									t.stopAll()
								})), this.on("slideVideoEnd", (t => {
									t.stopAll(), e(t.data.slide.index)
								})), this.on("slideVideoError", (t => {
									t.stopAll(), this.pullSlide(t.data.UUID)
								})), this.on("contentLoaded", (e => {
									e.stopAll(), t(e.data.slide.index)
								})), this.on("error", (t => {
									t.stopAll(), this.pullSlide(t.data.UUID)
								})), this.on("reloadThumbnail", (t => {
									t.stopAll(), this.selectors && this.selectors.reloadThumbnail(t.data.UUID)
								})), this.on("componentEvent", (s => {
									var o;
									switch (s.stopAll(), s.data.type) {
										case "init":
											var n, a;
											this.index === s.data.slide.index && this.canSlideFullscreen(this.index) && null != (o = this.slides[this.index]) && o.spinInited && (this.addControllWrapper(), null == (n = this.fsButton) || n.enable(), null == (a = this.fsButton) || a.show()), this.sendEvent("componentEvent", s.data);
											break;
										case "ready":
											var h, r;
											this.index === s.data.slide.index && "spin" !== s.data.component && (this.canSlideFullscreen(s.data.slide.index) || this.isFullscreen()) && (this.addControllWrapper(), null == (h = this.fsButton) || h.enable(), null == (r = this.fsButton) || r.show()), this.sendEvent("componentEvent", s.data);
											break;
										case "rotate":
										case "seek":
										case "loop":
										case "finished":
											this.sendEvent("componentEvent", s.data);
											break;
										case "fullscreenIn":
											"video" === s.data.component ? this.sendEvent("componentEvent", s.data) : this.option(D + ".enable") && this.fsState === g.a0.CLOSED && this.enterFullScreen();
											break;
										case "fullscreenOut":
											"video" === s.data.component ? this.sendEvent("componentEvent", s.data) : this.exitFullScreen();
											break;
										case "pinchStart":
											this.isComponentPinching = !0;
											break;
										case "pinchEnd":
											this.isComponentPinching = !1;
											break;
										case "zoomIn":
											this.isZoomIn = !0, i(s.data.slide.index), this.sendEvent("componentEvent", s.data);
											break;
										case "zoomOut":
											this.isZoomIn = !1, e(s.data.slide.index), this.sendEvent("componentEvent", s.data);
											break;
										case "hotspotOpened":
										case "spinStart":
										case "arStart":
											i(s.data.slide.index);
											break;
										case "hotspotClosed":
										case "arStop":
											e(s.data.slide.index);
											break;
										case "rotateEnd":
											e(s.data.slide.index), this.sendEvent("componentEvent", s.data);
											break;
										case "play":
											["video", "model"].includes(s.data.component) && ("video" === s.data.component && i(s.data.slide.index), this.sendEvent("componentEvent", s.data));
											break;
										case "resume":
											"video" === s.data.component && (i(s.data.slide.index), this.sendEvent("componentEvent", s.data));
											break;
										case "pause":
											["video", "model"].includes(s.data.component) && this.sendEvent("componentEvent", s.data);
											break;
										case "end":
											"video" === s.data.component && (e(s.data.slide.index), this.sendEvent("componentEvent", s.data));
											break;
										case "contentLoaded":
											t(s.data.slide.index)
									}
								})), this.on("goTo" + M, (t => {
									var e;
									t.stopAll(), t.data && t.data.hasOwnProperty("index") && this.slides[t.data.index].enabled && this.index !== t.data.index && (this.index = t.data.index, null == (e = this.selectors) || e.activateItem(this.index)), this.option(D + ".enable") && this.fsState === g.a0.CLOSED && this.enterFullScreen()
								})), this.on("goTo" + M + "Out", (t => {
									t.stopAll(), this.exitFullScreen()
								})), this.on("infoReady", (t => {
									if (t.stop(), this.fsState === g.a0.OPENED) {
										const e = this.slides[t.data.index];
										e.broadcast("before" + M + "In", {
											data: {
												pseudo: this.isPseudo
											}
										}), e.broadcast("after" + M + "In", {
											data: {
												pseudo: this.isPseudo
											}
										})
									}
								})), this.on((t => {
									t.stopAll()
								}))
							}
							normalizeOptions() {
								"grid" === this.option("layout.type") && this.option("thumbnails.enable") && (this.option("layout.grid.columns") > 1 || ["top", "bottom"].includes(this.option("thumbnails.position"))) && this.option("thumbnails.enable", !1), "auto" === this.option(D + ".thumbnails.size") && this.option(D + ".thumbnails.size", this.option("thumbnails.size")), "off" === this.option("slide.animation.type") && this.option("slide.animation.type", !1), ["contextmenu.text.zoom.in", "contextmenu.text.zoom.out", "contextmenu." + D + ".enter", "contextmenu." + D + ".exit", "contextmenu.text.download"].forEach((t => {
									(0, b.A)(this.option(t)) && this.option(t, !1)
								})), "auto" === this.option(D + ".thumbnails.trigger") && this.option(D + ".thumbnails.trigger", this.option("thumbnails.trigger")), this.option("thumbnails.enable") && this.option("thumbnails.target") && "" === this.option("thumbnails.target").trim() && this.option("thumbnails.target", !1), this.option("slide.socialbuttons.enable") && !["facebook", "twitter", "linkedin", "reddit", "tumblr", "pinterest", "telegram"].some((t => this.option("slide.socialbuttons.types." + t))) && this.option("slide.socialbuttons.enable", !1), window.parent !== window.window && o.A.browser.fullScreen.capable && this.option("fullscreen.native", !0)
							}
							updateOptions(t) {
								const e = this.instanceOptions;
								if (this.instanceOptions = t.options, this.normalizeOptions(), this.slideOptions = this.makeSlideOptions(t.slideOptions), !(0, E.A)(e.getJSON(), this.instanceOptions.getJSON())) {
									var i;
									this.pause(), this.exitFullScreen();
									const t = this.option;
									this.slideOptions.autoplay = t("video.autoplay"), this.isAutoplay = t("slide.autoplay"), this.autoplayDelay = t("slide.delay"), this.remainingAutoplayTime = this.autoplayDelay, this.setMainAreaLabel(), "grid" === t("layout.type") ? this.setGridLayoutVars() : ("grid" === e.get("layout.type") && (this.doSetSize = !0), this.movingContainer.removeClass(k)), this.slideWrapper.removeClass(F.horizontal), this.slideWrapper.removeClass(F.vertical), this.slideWrapper.addClass(F[this.option("orientation")]), this.destroyEffect(), this.createEffect(), this.destroyArrows(), this.createArrows(), this.showHideArrows(), this.checkLoop(this.index), this.sortItems();
									const r = this.rootMargin;
									this.setRootMargin();
									const l = !!this.intersectionObserver,
										d = "visible" === this.option("autostart");
									var s, n;
									if ((r !== this.rootMargin || this.intersectionObserver && !d || !this.intersectionObserver && d) && (null == (s = this.intersectionObserver) || s.disconnect(), this.intersectionObserver = null, this.setInViewAction(), "edge" === o.A.browser.uaName && (null == (n = this.intersectionObserver) || n.takeRecords())), !l || this.intersectionObserver || this.isInView || (this.isInView = !0, this.broadcast("inView", {
											data: !0
										}), this.autoplay()), null == (i = this.fsButton) || i.destroy(), this.fsButton = null, this.createFullscreenButton(), this.movingContainer.removeClass(_), this.slideWrapper.removeClass(g.pS), this.fsButton && t(D + ".always") && (this.movingContainer.addClass(_), this.slideWrapper.addClass(g.pS)), this.saveHistory !== t(D + ".history") && (this.clearHystory(), this.saveHistory = t(D + ".history"), this.fsButton && this.createHistory()), this.onScrollHandler && (o.A.$(window).addEvent("scroll", this.onScrollHandler), this.onScrollHandler = null), this.setGridLayoutScroll(), this.selectorsWrapper.node.classList.contains(L) ? this.externalContainer || (this.selectorsWrapper.removeClass(L), this.appendSelectors(!0)) : this.externalContainer && this.appendSelectors(!0), this.movingContainer.setCssProp("height", ""), this.slideWrapper.setCssProp("height", ""), "slider" === t("layout.type") && this.doSetSize) {
										const e = t("layout.aspectRatio");
										if ("auto" === e) {
											const e = this.slides[t("slide.first")].infoSize;
											e && (this.heightProportion = e)
										} else this.heightProportion = {
											width: e,
											height: 1
										}
									}
									this.selectorsWrapper.setCss({
										flexBasis: ""
									});
									const c = "thumbnails";
									var a;
									if (t(c + ".enable") || t(D + "." + c + ".enable")) this.selectors ? (this.selectorsPositionClasses.setOptions({
										sEnabled: t(c + ".enable"),
										sPosition: t(c + ".position"),
										sType: this.getSelectorStyle(c + ".type"),
										sGrid: "grid" === t(c + ".type"),
										sExternal: this.externalContainer,
										fEnabled: t(D + "." + c + ".enable"),
										fPosition: t(D + "." + c + ".position"),
										fType: this.getSelectorStyle(D + "." + c + ".type"),
										fGrid: "grid" === t(D + "." + c + ".type"),
										fAutohide: t(D + "." + c + ".autohide")
									}), this.selectors.setOptions({
										isStandardGrid: "grid" === t(c + ".type"),
										standardStyle: this.getSelectorStyle(c + ".type"),
										standardSize: t(c + ".size"),
										standardPosition: !!t(c + ".enable") && t(c + ".position"),
										standardWatermark: t(c + ".watermark"),
										standardAlign: t(c + ".align"),
										isFullscreenGrid: "grid" === t(D + "." + c + ".type"),
										fullscreenStyle: this.getSelectorStyle(D + "." + c + ".type"),
										fullscreenSize: t(D + "." + c + ".size"),
										fullscreenPosition: !!t(D + "." + c + ".enable") && t(D + "." + c + ".position"),
										fullscreenAutohide: t(D + "." + c + ".autohide"),
										fullscreenWatermark: t(D + "." + c + ".watermark"),
										fullscreenAlign: t(D + "." + c + ".align"),
										arrows: t("arrows"),
										thumbnailLabel: t("a11y.thumbnailLabel"),
										scrollForward: t("a11y.scrollForward"),
										scrollBackward: t("a11y.scrollBackward"),
										showThumbnails: t("a11y.showThumbnails"),
										hideThumbnails: t("a11y.hideThumbnails")
									})) : (this.createClasses(), null == (a = this.selectorsPositionClasses) || a.toStandard(), this.createSelectors());
									else if (this.selectors) {
										var h;
										this.destroySelectors(), null == (h = this.selectorsPositionClasses) || h.destroy(), this.selectorsPositionClasses = null
									}
									this.addSelectorsBasis(), this.destroyContextMenu(), this.createContextMenu(), this.slides.forEach((t => t.updateOptions(this.slideOptions))), "grid" !== t("layout.type") && this.enabledSlideIndexes.forEach(((t, e) => {
										this.index !== t && (this.slides[t].beforeHide(), this.slides[t].afterHide(g.eO.INIT))
									})), this.setContainerSize(), this.autoplay()
								}
								this.slides.forEach((t => t.updateComponentOptions(this.slideOptions))), this.broadcast("inView", {
									data: this.isInView
								})
							}
							addControllWrapper() {
								!this.controlsWrapperAdded && this.controlsWrapper.node.childNodes.length && (this.controlsWrapperAdded = !0, this.slideWrapper.append(this.controlsWrapper))
							}
							setGridLayoutScroll() {
								"grid" === this.option("layout.type") && this.option("thumbnails.enable") && (this.onScrollHandler = this.changeActiveSlideOnScroll.bind(this), o.A.$(window).addEvent("scroll", this.onScrollHandler, 10, {
									capture: !0
								}))
							}
							postInitialization() {
								if (!this.isInitialized && this.isInView && this.isSelectorsReady && this.isToolStarted && this.isStartedFullInit) {
									var t, e;
									if (this.isInitialized = !0, this.hasSize || this.setContainerSize(), this.broadcast("inView", {
											data: this.isInView
										}), this.createArrows(), null == (t = this.selectors) || t.inView(this.isInView, this.instanceNode), null == (e = this.selectors) || e.activateItem(this.index), !o.A.browser.mobile) {
										const t = "edge" === o.A.browser.uaName ? "pointerout" : "mouseout";
										this.movingContainer.addEvent(t, (t => {
											if (t.pointerType && "mouse" !== t.pointerType) return;
											let e = t.related;
											for (; e && e !== this.movingContainer.node;) e = e.parentNode;
											this.movingContainer.node !== e && -1 !== this.index && this.slides[this.index].mouseAction("mouseout", t)
										}))
									}
									this.slides.length > 1 && this.initTouchDrag(), o.A.$(window).addEvent("resize", this.onResizeHandler), o.A.$(document).addEvent("keydown", this.keyboardCallback), o.A.$(window).addEvent("orientationchange", this.onResizeHandler), this.setGridLayoutScroll(), this.showHideArrows(), this.showHideSelectors(), this.option(D + ".always") && this.slideWrapper.addClass(g.pS), this.movingContainer.attr("id", this.movingContainerId), this.createFullscreenButton(), this.addControllWrapper(), this.fsButton && this.slides[this.index] && (this.canSlideFullscreen(this.index) || this.isFullscreen()) && (this.fsButton.enable(), this.fsButton.show()), this.changeActiveSlideOnScroll(), this.checkLoop(this.index), this.movingContainer.setCssProp("font-size", ""), this.createHistory(), this.autoplay(), this.isReady = !0, this.sendEvent("ready")
								}
							}
							changeActiveSlideOnScroll() {
								if (this.fsState !== g.a0.CLOSED || !this.onScrollHandler) return;
								const t = this.enabledSlideIndexes.length;
								for (let s = 0; s < t; s++) {
									const t = this.enabledSlideIndexes[s],
										o = this.slides[t].node.node.getBoundingClientRect(),
										n = o.height - o.height / 2;
									if (o.y + n > 0) {
										var e, i;
										this.index = t, null == (e = this.selectors) || e.activateItem(t), null == (i = this.selectors) || i.jump(t);
										break
									}
								}
							}
							addHistory() {
								if (this.saveHistory) {
									const t = "#sirv-viewer-" + this.fullscreenViewId;
									if (window.location.hash !== t) {
										const e = {
												name: "Sirv.viewer",
												hash: this.fullscreenViewId
											},
											i = document.body.title || "Sirv viewer";
										try {
											window.history.state && "Sirv.viewer" === window.history.state.name && window.history.replaceState(null, i, ""), window.history.pushState(e, i, t)
										} catch (t) {}
									}
								}
							}
							setContainerSize() {
								const t = this.selectors ? this.selectorsWrapper.size[this.selectors.shortSide] : 0;
								let {
									width: e,
									height: i
								} = this.movingContainer.size;
								if (!e && !i) return;
								const s = this.option("thumbnails.position"),
									o = this.option("thumbnails.enable") && this.canShowSelectors(this.slides.length) && t > 0 && !this.externalContainer;
								this.fsState === g.a0.OPENED || "grid" === this.option("layout.type") ? (this.movingContainer.setCssProp("height", ""), this.slideWrapper.setCssProp("height", "")) : this.doSetSize && this.heightProportion && (o && ["left", "right"].includes(s) && (e -= t), i = e * (this.heightProportion.height / this.heightProportion.width), i > this.heightProportion.height && "auto" === this.option("layout.aspectRatio") && (i = this.heightProportion.height), !o || ["left", "right"].includes(s) && "grid" !== this.option("thumbnails.type") ? this.movingContainer.setCssProp("height", i) : this.slideWrapper.setCssProp("height", i))
							}
							findSlideIndex(t) {
								var e;
								const i = this.slides.find((e => e.id && e.id === t));
								return null != (e = null == i ? void 0 : i.index) ? e : -1
							}
							getItems(t) {
								let e = null,
									i = this.slides;
								return t && (null != t.enabled && (e = t.enabled), t.group && (i = this.getSlidesByGroup(t.group))), ("boolean" === o.A.typeOf(e) ? i.filter((t => t.enabled === e)) : i).map((t => t.api))
							}
							controlEnabledSlides(t, e) {
								e ? this.enabledSlideIndexes.splice(this.enabledSlideIndexes.indexOf(t), 1) : (this.enabledSlideIndexes.push(t), this.enabledSlideIndexes.sort(((t, e) => t - e)))
							}
							disableSlide(t, e) {
								var i, s;
								if (o.A.isString(t) && (t = this.findSlideIndex(t)), !0 !== (null == (i = this.slides[t]) ? void 0 : i.enabled)) return !1;
								const n = this.slides[t].$J_UUID;
								return this.effect && this.effect.stop(), this.slides[t].enabled && this.controlEnabledSlides(t, !0), this.slides[t].isActive && (this.jump(this.getNearestSlideIndex(), g.eO.ENABLE, !0) || (this.slides[t].beforeHide(), this.slides[t].afterHide(), this.isGridLayout() && (this.index = (0, p.A)("next", this.index, this.slides.length, this.option("loop"))))), this.slides[t].disable(), this.checkLoop(this.index), this.enabledSlideIndexes.length || (this.index = -1), null == (s = this.selectors) || s.disable(n), this.changeActiveSlideOnScroll(), e || this.sendEvent("disableItem", {
									slide: this.slides[t].api
								}), this.checkSingleSlide(), this.showHideArrows(), this.showHideSelectors(), this.startGettingInfoDebounce(), !0
							}
							getNearestSlideIndex() {
								const t = this.option("slide.first");
								var e = this.enabledSlideIndexes.findIndex((e => e === t));
								return e < 0 && (e = Math.min(...this.enabledSlideIndexes.filter((e => e > t))), Number.isFinite(e) || (e = Math.max(...this.enabledSlideIndexes.filter((e => e < t))))), e
							}
							enableSlide(t) {
								var e, i;
								if (o.A.isString(t) && (t = this.findSlideIndex(t)), t > this.slides.length - 1 || null != (e = this.slides[t]) && e.enabled) return !1;
								this.slides[t].startGettingInfo(), this.slides[t].loadThumbnail(), this.slides[t].enable(), this.slides[t].resize();
								const s = this.enabledSlideIndexes.filter((t => this.slides[t].slideAvailable));
								this.enabledSlideIndexes.length || (this.index = t, null === this.heightProportion && this.doSetSize && this.findProportions());
								const n = this.slides[t].slideAvailable && !s.length;
								var a;
								return (n || this.isGridLayout()) && (n && (this.index = t), this.slides[t].loadContent(), this.slides[t].beforeShow(), this.slides[t].resize(), this.slides[t].afterShow(g.eO.ENABLE)), this.controlEnabledSlides(t), this.checkLoop(this.index), null == (i = this.selectors) || i.enable(this.slides[t].UUID), this.slides[t].slideAvailable && (null == (a = this.selectors) || a.activateCurrentItemByUUID(this.slides[t].UUID)), this.changeActiveSlideOnScroll(), this.sendEvent("enableItem", {
									slide: this.slides[t].api
								}), this.checkSingleSlide(), this.showHideArrows(), this.showHideSelectors(), !0
							}
							getSlidesByGroup(t) {
								return t ? this.slides.filter((e => e.belongsTo(t))) : []
							}
							enableSlideGroup(t) {
								const e = this.getSlidesByGroup(t);
								return e.forEach((t => this.enableSlide(t.index))), !!e.length
							}
							disableSlideGroup(t) {
								const e = this.getSlidesByGroup(t);
								return e.forEach((t => this.disableSlide(t.index))), !!e.length
							}
							switchGroup(t) {
								if (!t) return !1;
								const e = this.getItems({
										enabled: !0
									}),
									i = this.enableSlideGroup(t);
								return e.forEach((e => {
									this.slides[e.index].belongsTo(t) || this.disableSlide(e.index)
								})), i
							}
							startGettingInfo() {
								if (this.slides.length > j && (!this.option("thumbnails.enable") || "bullets" === this.option("thumbnails.type")))
									for (let t = 0, e = Math.min(this.enabledSlideIndexes.length, j); t < e; t++) this.slides[this.enabledSlideIndexes[t]].startGettingInfo()
							}
							jump(t, e, i, s, o) {
								if (void 0 === o && (o = !0), !this.effect || !this.enabledSlideIndexes.length || -1 === this.index || this.isGridLayout() && this.option("layout.grid.columns") > 1) return !1;
								const n = ["next", "prev"].includes(t),
									a = null != s ? s : this.index;
								if (!n) {
									const e = this.findSlideIndex(t);
									e >= 0 && (t = e)
								}
								const h = (0, p.A)(t, a, this.slides.length, this.option("loop"));
								if (null === h) return !1;
								if (this.index !== h) {
									if (!this.slides[h].enabled || !this.slides[h].slideAvailable) return !!n && this.jump(t, e, i, h, o);
									if (clearTimeout(this.autoplayTimer), n || (t = h > this.index ? "next" : "prev"), this.checkLoop(h), this.isGridLayout()) {
										var r;
										i ? null == (r = this.selectors) || r.activateItem(h) : this.slides[h].scrollIntoView()
									} else {
										var l, d;
										let s = this.option("slide.animation.type");
										s && !i || (s = "blank"), null == (l = this.selectors) || l.activateItem(h), null == (d = this.selectors) || d.jump(h, !1, o), this.effect.make({
											index: this.index,
											node: this.slides[this.index].node
										}, {
											index: h,
											node: this.slides[h].node
										}, {
											effect: s,
											direction: t
										}, {
											whoUse: e
										})
									}
									return this.index = h, !0
								}
								return !1
							}
							checkLoop(t) {
								if (!this.arrows) return;
								const e = this.enabledSlideIndexes.filter((t => !this.slides[t].selectorPinned && this.slides[t].slideAvailable)).length;
								if (e < 2) this.arrows.disable("backward"), this.arrows.disable("forward");
								else if (this.option("loop")) this.arrows.disable();
								else {
									const i = this.enabledSlideIndexes.indexOf(t);
									this.arrows.disable(), 0 !== i && 1 !== e || this.arrows.disable("backward"), i !== e - 1 && 1 !== e || this.arrows.disable("forward")
								}
							}
							createFullscreenButton() {
								if (!this.option(D + ".enable") || this.fsButton) return;
								let t = "grid" === this.option("layout.type") ? C.A.FULLSCREEN : null;
								this.fsButton = new C.A(t, {
									enterAriaLabel: this.option("a11y.enterFullscreen"),
									exitAriaLabel: this.option("a11y.exitFullscreen")
								}), this.index > -1 && this.slides[this.index].spinInited && this.canSlideFullscreen(this.index) ? (this.fsButton.enable(), this.fsButton.show()) : (this.fsButton.disable(), this.fsButton.hide()), this.fsButton.onClick((() => {
									[g.a0.CLOSED, g.a0.OPENED].includes(this.fsState) && (this.fsButton.disable(), this.fsButton.hide(), this.fsState === g.a0.CLOSED ? this.enterFullScreen() : this.exitFullScreen())
								})), this.controlsWrapper.append(this.fsButton.node, "top"), this.index > -1 && this.slides[this.index].slideReady && setTimeout((() => {
									(this.canSlideFullscreen(this.index) || this.isFullscreen()) && (this.fsButton.enable(), this.fsButton.show())
								}), 0)
							}
							createEffect() {
								this.effect = new w.A({
									time: this.option("slide.animation.duration"),
									orientation: this.option("orientation")
								}), this.effect.parentClass = this, this.on("effectStart", (t => {
									var e, i;
									t.stopAll(), this.isMoving = !0, null == (e = this.fsButton) || e.disable(), this.fsState === g.a0.OPENED || this.canSlideFullscreen(t.indexes[1]) || null == (i = this.fsButton) || i.hide(), this.slides[t.indexes[0]].beforeHide(), this.slides[t.indexes[1]].beforeShow(), t.data.callbackData.whoUse !== g.eO.ENABLE && (this.sendEvent("beforeSlideIn", {
										slide: this.slides[t.indexes[1]].api
									}), this.sendEvent("beforeSlideOut", {
										slide: this.slides[t.indexes[0]].api
									}))
								})), this.on("effectEnd", (t => {
									t.stopAll(), this.fsButton && (this.canSlideFullscreen(t.indexes[1]) || this.fsState === g.a0.OPENED) && (this.fsButton.enable(), this.fsButton.show()), this.slides[t.indexes[0]].afterHide(), this.slides[t.indexes[1]].afterShow(t.data.callbackData.whoUse), t.data.callbackData.whoUse !== g.eO.ENABLE && (this.sendEvent("afterSlideIn", {
										slide: this.slides[t.indexes[1]].api
									}), this.sendEvent("afterSlideOut", {
										slide: this.slides[t.indexes[0]].api
									})), this.autoplay(), this.isMoving = !1, this.remainingAutoplayTime = this.autoplayDelay
								}))
							}
							createArrows() {
								this.option("arrows") && (this.arrows = new S.A({
									prevAriaLabel: this.option("a11y.prevItem"),
									nextAriaLabel: this.option("a11y.nextItem")
								}), this.arrows.hide(), this.arrows.parentClass = this, this.on("arrowAction", (t => {
									t.stopAll();
									const e = this.getNextIndex(t.data.type, this.index, this.slides.length, this.option("loop"));
									this.jump(e, g.eO.USER)
								})), this.arrows.nodes.forEach((t => this.controlsWrapper.append(t))))
							}
							getNextIndex(t, e, i, s) {
								const o = (0, p.A)(t, e, i, s);
								let n = o;
								return null === o || o === this.index || !this.slides[o].selectorPinned && this.slides[o].slideAvailable && this.slides[o].enabled || (n = this.getNextIndex(t, o, i, s)), n
							}
							isHiddenSlides() {
								return !this.slides.some((t => !t.customSelector || t.customSelector && t.slideAvailable))
							}
							getSelectorStyle(t) {
								var e = this.option(t);
								return "grid" == e && (e = "square"), e
							}
							createSelectors() {
								const t = this.option;
								t("thumbnails.enable") || t(D + ".thumbnails.enable") ? (this.selectors = new y.A(this.slides.filter((t => t.selectorData)).map((t => t.selectorData)), {
									isStandardGrid: "grid" === t("thumbnails.type"),
									standardStyle: this.getSelectorStyle("thumbnails.type"),
									standardSize: t("thumbnails.size"),
									standardPosition: !!t("thumbnails.enable") && t("thumbnails.position"),
									standardWatermark: t("thumbnails.watermark"),
									standardAlign: t("thumbnails.align"),
									isFullscreenGrid: "grid" === t(D + ".thumbnails.type"),
									fullscreenStyle: this.getSelectorStyle(D + ".thumbnails.type"),
									fullscreenSize: t(D + ".thumbnails.size"),
									fullscreenPosition: !!t(D + ".thumbnails.enable") && t(D + ".thumbnails.position"),
									fullscreenAutohide: t(D + ".thumbnails.autohide"),
									fullscreenWatermark: t(D + ".thumbnails.watermark"),
									fullscreenAlign: t(D + ".thumbnails.align"),
									arrows: t("arrows"),
									thumbnailLabel: t("a11y.thumbnailLabel"),
									scrollForward: t("a11y.scrollForward"),
									scrollBackward: t("a11y.scrollBackward"),
									showThumbnails: t("a11y.showThumbnails"),
									hideThumbnails: t("a11y.hideThumbnails")
								}), this.selectors.parentClass = this, this.on("selectorsReady", (t => {
									t.stopAll(), this.isSelectorsReady = !0, this.postInitialization()
								})), this.on("getSelectorProportion", (t => {
									t.stopAll();
									const e = this.getSlideIndexByUUID(t.data.UUID);
									if (e >= 0) {
										const i = this.slides[e];
										if (i) {
											const e = {
												size: null,
												isSirv: !0
											};
											i.getSelectorProportion().then((s => {
												e.isSirv = i.isSirvSelector(), e.size = s.size, t.data.resultingCallback(e)
											})).catch((s => {
												e.isSirv = i.isSirvSelector(), this.pullSlide(s.UUID), t.data.resultingCallback(e)
											}))
										} else t.data.resultingCallback(null)
									} else t.data.resultingCallback(null)
								})), this.on("getSelectorImgUrl", (t => {
									t.stopAll();
									const e = this.getSlideIndexByUUID(t.data.UUID);
									if (e >= 0) {
										const i = this.slides[e];
										i ? i.getSelectorImgUrl(t.data.type, t.data.size, t.data.crop, t.data.watermark).then((e => {
											const {
												src: i,
												srcset: s,
												size: o,
												alt: n,
												referrerpolicy: a,
												ariaLabelId: h
											} = e;
											t.data.resultingCallback({
												src: i,
												srcset: s,
												size: o,
												alt: n,
												referrerpolicy: a,
												ariaLabelId: h
											})
										})).catch((e => {
											t.data.resultingCallback(null)
										})) : t.data.resultingCallback(null)
									} else t.data.resultingCallback(null)
								})), this.on("changeSlide", (t => {
									t.stopAll();
									const e = this.getSlideIndexByUUID(t.data.UUID);
									if (e >= 0) {
										const i = this.option(D + ".enable") && this.option(D + ".always"),
											s = this.option((this.isFullscreen() ? D + "." : "") + "thumbnails.trigger"),
											o = "thumbnailClick" === t.data.type;
										e === this.index ? o && this.slides[e].secondSelectorClick() : (t.data.type.toLowerCase().includes(s) || o) && this.jump(e, g.eO.USER, i, void 0, o), this.sendEvent(t.data.type, {
											slide: this.slides[e].api
										}), i && o && this.slides[e].slideAvailable && this.enterFullScreen()
									}
								})), this.on("visibility", (t => {
									switch (t.stop(), t.action) {
										case "show":
											this.movingContainer.removeClass(g.Mu + "-selectors-closed");
											break;
										case "hide":
											this.movingContainer.addClass(g.Mu + "-selectors-closed")
									}
								})), this.on("selectorsDone", (t => {
									t.stopAll(), ["left", "right"].includes(this.selectors.currentStylePosition) && this.onResize()
								})), this.selectorsWrapper.append(this.selectors.node), this.slides.forEach((t => {
									t.enabled || this.selectors.disable(t.UUID)
								})), this.showHideSelectors(!0)) : this.isSelectorsReady = !0
							}
							canPinSlide(t) {
								const e = f.A.findPinnedSelectorSide(t);
								return this.slides.filter((t => t.pinnedSelectorSide === e)).length < 3
							}
							getSlideIndexByUUID(t) {
								return this.slides.findIndex((e => e.UUID === t))
							}
							pullSlide(t) {
								const e = this.getSlideIndexByUUID(t);
								if (!(e < 0))
									if (this.removeSlide(e), this.slides.length) {
										var i;
										this.slides.length < 2 && (this.option("thumbnails.enable") || this.option(D + ".thumbnails.enable")) && (null == (i = this.selectorsPositionClasses) || i.remove(), this.setContainerSize()), this.isToolStarted || this.findProportions(), this.postInitialization()
									} else this.emit("destroy", {
										data: {
											id: this.id,
											node: this.instanceNode.node
										}
									})
							}
							getSlides() {
								return new Promise((t => {
									let e = Array.from(this.instanceNode.node.childNodes).filter((t => {
										let e = !1;
										return this.sliderNodes.push(t.cloneNode(!0)), t.tagName && ["div", "img", "iframe", "figure", "video", "picture", z.XY].includes(o.A.$(t).tagName) && (e = !0), t.remove(), e
									}));
									e = $(e), Promise.all(e.map((t => W(o.A.$(t))))).then((t => {
										let e = t.filter((t => t)).map((t => f.A.parse(t)));
										return (0, v.cl)().forEach((t => {
											const i = e.map((t => {
													const e = {};
													return Object.entries(t).forEach((t => {
														"type" === t[0] && (t[1] = g.tm[t[1]]), (0, n.A)(e, ...t)
													})), e
												})),
												s = t(this.id, i);
											Array.isArray(s) && (e = s.map((t => {
												for (let i = 0, s = e.length; i < s; i++)
													if (t.node === e[i].node) return e.splice(i, 1)[0];
												return t
											})))
										})), this.originalSlidesOrder = [].concat(e), (0, d.A)(e, this.option("itemsOrder"))
									})).then((t => Promise.all(t.map((t => W(o.A.$(t.node)).then((e => e ? t : null))))).then((t => t.filter((t => t)))))).then((e => Promise.all(e.map((t => f.A.parse(t.node).type !== g.mo.VIDEO || f.A.isSirvComponent(t.node) ? Promise.resolve(t) : x.A.isVideoExisting(t.node).then((() => t)).catch((() => Promise.resolve(null)))))).then((e => t(e.filter((t => t)))))))
								}))
							}
							createSlides(t) {
								let e = 0;
								t.forEach((t => {
									if (!f.A.isSirvComponent(t.node) || f.A.hasComponent(t.node)) {
										let i = o.A.$(t.node);
										if (i.tagName === z.XY) {
											const t = o.A.$new("div");
											i.attr("data-id") && t.attr("data-id", i.attr("data-id")), i.attr("data-group") && t.attr("data-group", i.attr("data-group")), t.append(i), i = t
										}
										i.addClass(g.Mu + "-component");
										const s = new f.A(i.node, e, this.slideOptions);
										s.parentClass = this, this.slides.push(s), s.enabled && s.slideAvailable && this.enabledSlideIndexes.push(e), e += 1;
										const n = this.originalSlidesOrder.findIndex((e => e == t));
										n >= 0 && (this.originalSlidesOrder[n] = s)
									}
								})), this.originalSlidesOrder = this.originalSlidesOrder.filter((t => t instanceof f.A));
								const i = this.enabledSlideIndexes.length;
								this.firstSlideAhead = i > j;
								const s = this.enabledSlideIndexes.findIndex((t => t === this.index));
								for (let t = 0; t < i; t++) {
									const e = (0, r.A)(t + s, i);
									if (this.firstSlideAhead && !(t < j) && e !== this.index && "grid" !== this.option("layout.type")) break;
									this.slides[this.enabledSlideIndexes[e]].startGettingInfo()
								}
								this.index > this.slides.length - 1 && (this.index = 0), this.postInitialization()
							}
							checkSingleSlide() {
								const t = 1 === this.enabledSlideIndexes.length;
								this.enabledSlideIndexes.forEach((e => {
									this.slides[e].single(t)
								}))
							}
							showHideArrows() {
								if (this.arrows) {
									const t = this.visibleSlides();
									t < 2 || this.option(D + ".always") && !this.isFullscreen() ? this.arrows.hide() : t > 1 && (!this.option(D + ".always") || this.isFullscreen()) && this.arrows.show()
								}
							}
							canShowSelectors(t) {
								const e = this.fsState === g.a0.OPENED ? D + ".thumbnails.always" : "thumbnails.always";
								return this.option(e) || t > 1
							}
							showHideSelectors(t) {
								this.selectors && (this.selectorsDebounce || (this.selectorsDebounce = (0, a.A)((() => {
									this.selectors && (this.canShowSelectors(this.enabledSlideIndexes.length) ? this.selectors.isSelectorsActionEnabled() || (this.movingContainer.setCssProp("height", "100%"), this.selectorsWrapper.removeClass(g.Mu + "-hide-selectors"), this.selectors.enableActions(), this.onResize()) : this.selectors.isSelectorsActionEnabled() && (this.selectorsWrapper.addClass(g.Mu + "-hide-selectors"), this.selectors.disableActions(), this.onResize()))
								}), t ? 0 : 32)), this.selectorsDebounce())
							}
							getAvailableSlideIndex(t) {
								return t !== this.slides.length - 1 || this.slides[t].slideAvailable ? this.slides[t + 1].slideAvailable ? t + 1 : this.getAvailableSlideIndex(t + 1) : -1
							}
							addAvailableSlideNode(t, e) {
								const i = t.node,
									s = this.slides.length;
								if (t.slideAvailable)
									if (s > 1 && e !== s - 1)
										if (this.slides[e + 1].slideAvailable) this.slidesContainer.node.insertBefore(i.node, this.slides[e + 1].node.node);
										else {
											const t = this.getAvailableSlideIndex(e);
											t < 0 ? this.slidesContainer.append(i) : this.slidesContainer.node.insertBefore(i.node, this.slides[t].node.node)
										} else this.slidesContainer.append(i)
							}
							sortItems(t) {
								var e;
								if ("function" == typeof t) {
									var i;
									if (null == (i = t = t(this.slides.map((t => Object.freeze({
											UUID: t.UUID,
											index: t.index,
											id: t.api.id,
											activated: t.slideActive,
											groups: t.api.groups,
											disabled: t.api.isDisabled(),
											component: t.api.component,
											node: t.slideContent.node
										}))))) || !i.length || t.length > this.slides.length) return;
									this.slides = (0, c.A)(this.slides, t)
								} else {
									if (Array.isArray(t) || (t = this.option("itemsOrder")), !t.length) return;
									this.slides = [].concat(this.originalSlidesOrder), this.slides = (0, d.A)(this.slides, t)
								}
								null == (e = this.selectors) || e.sortSelectors(this.slides.map((t => t.UUID)), t.length), this.enabledSlideIndexes = [], this.slides.forEach(((t, e) => {
									t.index = e, t.enabled && this.enabledSlideIndexes.push(e)
								}));
								for (let t = 0, e = this.slides.length; t < e; t++)
									if (this.slides[t].slideActive) {
										this.index = this.slides[t].index;
										break
									}
							}
							insertSlide(t, e) {
								const i = e.querySelector(z.XY) || e;
								if (f.A.findPinnedSelectorSide(i) && !this.canPinSlide(i)) return !1;
								if (null == t && (t = this.slides.length + 1), "number" === o.A.typeOf(t) && t >= 0 && e && (!f.A.isSirvComponent(e) || f.A.hasComponent(e))) {
									var s;
									o.A.$(e).addClass(g.Mu + "-component"), t > this.slides.length && (t = this.slides.length), clearTimeout(this.timerRemove);
									const i = new f.A(e, t, this.slideOptions, !0);
									i.parentClass = this, this.slides.splice(t, 0, i), this.originalSlidesOrder.splice(t, 0, i);
									let a = -1 === this.index;
									var n;
									return -1 === this.index ? i.enabled && i.slideAvailable ? this.index = t : a = !1 : t <= this.index && (this.index += 1), this.index > -1 && !this.enabledSlideIndexes.length && null === this.heightProportion && this.doSetSize && this.findProportions(), this.enabledSlideIndexes = [], this.slides.forEach(((t, e) => {
										t.index = e, t.enabled && this.controlEnabledSlides(e)
									})), this.addAvailableSlideNode(i, t), this.addComponentsCSS(), i.appendToDOM(), i.afterAddingDom(), i.startGettingInfo(), i.loadThumbnail(), i.startFullInit(null), i.startTool(this.index === t, !this.firstSlideAhead && this.option("slide.preload"), this.firstSlideAhead), i.broadcast("inView", {
										data: this.isInView
									}), (this.index === t || this.isGridLayout()) && (i.loadContent(), i.beforeShow(), i.afterShow(g.eO.INIT)), this.fsState !== g.a0.OPENED || i.sirv || (i.broadcast("before" + M + "In", {
										data: {
											pseudo: this.isPseudo
										}
									}), i.broadcast("after" + M + "In", {
										data: {
											pseudo: this.isPseudo
										}
									})), this.checkLoop(this.index), null == (s = this.selectors) || s.insert(t, i.selectorData), a && (null == (n = this.selectors) || n.activateItem(this.index)), this.changeActiveSlideOnScroll(), this.checkSingleSlide(), this.showHideSelectors(), this.showHideArrows(), !0
								}
								return !1
							}
							removeSlide(t) {
								let e = !1;
								if (o.A.isString(t) && (t = this.findSlideIndex(t)), "number" === o.A.typeOf(t) && t >= 0 && t < this.slides.length) {
									var i;
									const s = this.slides[t].$J_UUID;
									this.slides[t].enabled ? this.disableSlide(t, !0) : e = !0;
									const o = this.originalSlidesOrder.findIndex((e => e === this.slides[t]));
									return this.originalSlidesOrder.splice(o, 1), this.slides[t].destroy(), this.slides.splice(t, 1), this.enabledSlideIndexes = [], this.slides.forEach(((t, e) => {
										t.index = e, t.enabled && this.controlEnabledSlides(e)
									})), null == (i = this.selectors) || i.pickOut(s), -1 !== this.index && t <= this.index && 0 !== this.index && (this.index -= 1), e && this.checkSingleSlide(), this.isHiddenSlides() && (this.timerRemove = setTimeout((() => {
										this.instanceNode && this.emit("destroy", {
											data: {
												id: this.id,
												node: this.instanceNode.node
											}
										})
									}), 100)), this.changeActiveSlideOnScroll(), !0
								}
								return !1
							}
							createContextMenu() {
								if (!this.option("contextmenu.enable")) return void this.movingContainer.addEvent("contextmenu", (t => {
									t.stop()
								}));
								const t = [];
								let e = !1;
								const i = () => {
									const t = this.slides[this.index],
										e = g.mo;
									return t.slideType === e.SPIN || t.slideType === e.ZOOM && "deep" === t.options.mode
								};
								this.option("contextmenu.text.zoom.in") && (t.push({
									id: "zoomin",
									label: this.option("contextmenu.text.zoom.in"),
									disabled: () => this.slides[this.index].zoomData.isZoomed && 1 === this.slides[this.index].zoomData.zoom,
									hidden: () => !(i() && this.slides[this.index].zoomSizeExist),
									action: t => {
										this.slides[this.index].zoomIn(t.left, t.top)
									}
								}), e = !0), this.option("contextmenu.text.zoom.out") && (t.push({
									id: "zoomout",
									label: this.option("contextmenu.text.zoom.out"),
									disabled: () => !this.slides[this.index].zoomData.isZoomed,
									hidden: () => !(i() && this.slides[this.index].zoomSizeExist),
									action: t => {
										this.slides[this.index].zoomOut(t.left, t.top)
									}
								}), e = !0);
								const s = () => !(!i() || !e) && this.slides[this.index].zoomData.isZoomed;
								this.option("contextmenu.text." + D + ".enter") && t.push({
									id: "enter" + D,
									label: this.option("contextmenu.text." + D + ".enter"),
									disabled: () => s(),
									hidden: () => !(this.option(D + ".enable") && !this.isFullscreen()),
									action: () => {
										this.enterFullScreen()
									}
								}), this.option("contextmenu.text." + D + ".exit") && t.push({
									id: "exit" + D,
									label: this.option("contextmenu.text." + D + ".exit"),
									disabled: () => s(),
									hidden: () => !(this.option(D + ".enable") && this.isFullscreen()),
									action: () => {
										this.exitFullScreen()
									}
								}), this.option("contextmenu.text.download") && (t.length && t.push({
									id: "sirv-separator",
									disabled: !1,
									hidden: () => t.filter((t => {
										if ("sirv-separator" !== t.id) return !("function" == typeof t.hidden ? t.hidden() : t.hidden)
									})).length < 2,
									separator: !0
								}), t.push({
									id: "download",
									label: this.option("contextmenu.text.download"),
									disabled: !1,
									hidden: !1,
									action: () => {
										let t;
										const e = this.slides[this.index].originImageUrl;
										e && (t = o.A.$new("iframe").setCss({
											width: 0,
											height: 0,
											display: "none"
										}).appendTo(document.body), t.node.src = e + "?format=original&dl")
									}
								})), this.movingContainer.addEvent("contextmenu", (t => {
									if (t.stopDefaults(), this.contextMenu && !this.isMoving && this.enabledSlideIndexes.length) {
										const e = this.slides[this.index],
											i = e.slideType !== g.mo.VIDEO;
										this.isReady && e.isReady && e.sirv && i && this.contextMenu.buildMenu() && (this.broadcast("stopContext"), this.contextMenu.show(t))
									}
								})), t.length && !o.A.browser.mobile && (this.contextMenu = new m.A(this.movingContainer, t), this.option(D + ".enable") && (this.contextMenu.fullScreenBox = this.fullScreenBox))
							}
							enterFullScreen() {
								var t, e, i;
								if (this.fsState !== g.a0.CLOSED) return !1;
								this.addHistory(), this.fsState = g.a0.OPENING, this.fullscreenStartTime = Date.now();
								const s = !this.option(D + ".native") || !o.A.browser.fullScreen.capable || !o.A.browser.fullScreen.enabled();
								var n;
								return T && T.appendTo(document.body), null == (t = this.fsButton) || t.disable(), null == (e = this.fsButton) || e.hide(), this.selectors && (null == (n = this.selectorsPositionClasses) || n.toFullscreen(), this.option(D + ".thumbnails.enable") && (this.appendSelectors(), this.selectorsWrapper.setCss({
									flexBasis: ""
								})), this.selectors.beforeEnterFullscreen()), this.slideWrapper.removeClass(g.pS), this.fullScreenBox.setCss({
									position: "fixed",
									top: 0,
									left: 0,
									width: "100%",
									height: "100%",
									overflow: "hidden",
									zIndex: 99999999999
								}), this.boxSize = this.instanceNode.size, this.boxBoundaries = this.instanceNode.rect, this.fakeMovingContainer.setCss(this.movingContainer.size), "grid" === this.option("layout.type") ? this.movingContainer.removeClass(k) : this.slideWrapper.setCss({
									aspectRatio: ""
								}), this.instanceNode.append(this.fakeMovingContainer), this.fullScreenBox.append(this.movingContainer), document.body.appendChild(this.fullScreenBox.node), this.movingContainer.setCssProp("height", "100%"), this.broadcast("before" + M + "In", {
									data: {
										pseudo: s,
										index: this.index
									}
								}), this.slideWrapper.setCssProp("height", ""), null == (i = this.productDetail) || i.open(), o.A.browser.fullScreen.request(this.fullScreenBox, {
									windowFullscreen: !this.option(D + ".native"),
									onEnter: this.onEnteredFullScreen.bind(this),
									onExit: () => {
										[g.a0.CLOSED, g.a0.OPENING].includes(this.fsState) || (this.fsState = g.a0.CLOSING, this._beforeExitFullscreen(), this.broadcast("before" + M + "Out", {
											data: {
												pseudo: !1,
												index: this.index
											}
										}), this.onExitFullScreen())
									},
									fallback: () => {
										o.A.$(document.documentElement).addClass(B), o.A.$(document.body).render(), setTimeout((() => this.onEnteredFullScreen(!0)), 64)
									}
								}), !0
							}
							onEnteredFullScreen(t) {
								var e, i;
								if (this.fsState !== g.a0.OPENING) return;
								this.isPseudo = t, clearTimeout(this.autoplayTimer), this.autoplayTimer = null, this.remainingAutoplayTime = this.autoplayDelay, t && this.fsState === g.a0.OPENING && (this.fullScreenBox.setCss({
									top: T ? Math.abs(T.node.getBoundingClientRect().top) : 0,
									left: 0,
									right: 0,
									bottom: 0,
									width: "auto",
									height: T ? window.innerHeight : "auto",
									display: this.productDetail ? "flex" : "block",
									position: "fixed"
								}), o.A.$(document).addEvent("keydown", this.pseudoFSEvent)), this.fsState = g.a0.OPENED, null == (e = this.fsButton) || e.toFullscreen(), this.slides[this.index] && !this.canSlideFullscreen(this.index) && this.fsState !== g.a0.OPENED || setTimeout((() => {
									var t, e;
									null == (t = this.fsButton) || t.enable(), null == (e = this.fsButton) || e.show()
								}), 1), null == (i = this.selectors) || i.afterEnterFullscreen(), this.showHideArrows(), this.showHideSelectors(), this.broadcast("after" + M + "In", {
									data: {
										pseudo: t,
										index: this.index
									}
								}), this.onResize(), this.autoplay();
								let s = {};
								this.enabledSlideIndexes.length && (s = {
									slide: this.slides[this.index].api
								}), this.sendEvent(D + "In", s)
							}
							_beforeExitFullscreen() {
								var t, e, i, s;
								null == (t = this.fsButton) || t.disable(), null == (e = this.fsButton) || e.hide(), clearTimeout(this.autoplayTimer), this.autoplayTimer = null, this.remainingAutoplayTime = this.autoplayDelay, this.option(D + ".always") && this.slideWrapper.addClass(g.pS), this.selectors && (this.option(D + ".thumbnails.enable") && (this.appendSelectors(), this.addSelectorsBasis()), null == (s = this.selectorsPositionClasses) || s.toStandard(), this.selectors.beforeExitFullscreen()), null == (i = this.productDetail) || i.close()
							}
							exitFullScreen() {
								return this.fsState === g.a0.OPENED && (this.fsState = g.a0.CLOSING, this._beforeExitFullscreen(), T && T.remove(), o.A.browser.fullScreen.capable && o.A.browser.fullScreen.enabled() && this.option(D + ".native") ? (this.broadcast("before" + M + "Out", {
									data: {
										pseudo: !1,
										index: this.index
									}
								}), o.A.browser.fullScreen.cancel.call(document)) : (o.A.$(document.documentElement).removeClass(B), this.broadcast("before" + M + "Out", {
									data: {
										pseudo: !0,
										index: this.index
									}
								}), this.onExitFullScreen(!0)), !0)
							}
							onExitFullScreen(t) {
								var e, i;
								if ([g.a0.CLOSED, g.a0.OPENING].includes(this.fsState)) return;
								if (this.showHideArrows(), this.showHideSelectors(), this.fakeMovingContainer.remove(), this.instanceNode.append(this.movingContainer), this.fullScreenBox.remove(), "grid" === this.option("layout.type") && (this.movingContainer.addClass(k), this.movingContainer.setCssProp("height", "")), null == (e = this.fsButton) || e.toStandard(), this.slides[this.index] && !this.canSlideFullscreen(this.index) && this.fsState !== g.a0.OPENED || setTimeout((() => {
										var t, e;
										null == (t = this.fsButton) || t.enable(), null == (e = this.fsButton) || e.show()
									}), 1), this.saveHistory) {
									const t = "#sirv-viewer-" + this.fullscreenViewId;
									try {
										window.location.hash === t && window.history.back()
									} catch (t) {}
								}
								this.fsState = g.a0.CLOSED, this.isPseudo = !1, null == (i = this.selectors) || i.afterExitFullscreen(), this.setContainerSize(), "grid" === this.option("layout.type") && this.enabledSlideIndexes.forEach((t => {
									this.slides[t].resize()
								})), this.fullscreenStartTime = null, this.autoplay(), this.broadcast("after" + M + "Out", {
									data: {
										pseudo: t,
										index: this.index
									}
								});
								let s = {};
								this.enabledSlideIndexes.length && (s = {
									slide: this.slides[this.index].api
								}), this.sendEvent(D + "Out", s), this.onResize()
							}
							getSlide(t) {
								var e;
								return (null === t || "number" === o.A.typeOf(t) && t >= this.slides.length) && (t = this.index), o.A.isString(t) && (t = this.findSlideIndex(t)), null == (e = this.slides[t]) ? void 0 : e.api
							}
							onResizeWithoutSelectors() {
								this.destroyed || (T && this.fsState === g.a0.OPENED && this.fullScreenBox.setCss({
									height: window.innerHeight,
									top: Math.abs(T.node.getBoundingClientRect().top)
								}), this.setRootMargin(), this.setContainerSize(), this.slides.forEach((t => {
									t.resize()
								})))
							}
							onResize() {
								var t;
								this.destroyed || (null == (t = this.selectors) || t.onResize(), this.onResizeDebounce())
							}
							play(t) {
								let e = !1,
									i = this.option("slide.delay");
								return "number" === o.A.typeOf(t) && t > 9 && (i = t), (null === this.autoplayTimer && !this.isAutoplay || i !== this.autoplayDelay) && (this.autoplayDelay = i, this.isAutoplay = !0, this.remainingAutoplayTime = this.autoplayDelay, this.autoplay(), e = !0), e
							}
							pause() {
								const t = this.autoplayTimer;
								return this.isAutoplay = !1, clearTimeout(this.autoplayTimer), this.autoplayTimer = null, this.remainingAutoplayTime = this.autoplayDelay, null === t
							}
							pauseAutoplay() {
								clearTimeout(this.autoplayTimer), this.autoplayTimer = null, this.remainingAutoplayTime -= Date.now() - this.currentAutoplayTime
							}
							autoplay() {
								if (this.isAutoplay && !this.isGridLayout()) {
									this.currentAutoplayTime = Date.now();
									let t = this.autoplayDelay;
									this.remainingAutoplayTime !== t && (t = this.remainingAutoplayTime < U ? U : this.remainingAutoplayTime), clearTimeout(this.autoplayTimer), this.autoplayTimer = setTimeout((() => {
										this.destroyed || this.jump("next", g.eO.AUTOPLAY)
									}), t)
								}
							}
							createHistory() {
								this.saveHistory && (this.fullscreenViewId = Math.floor(Math.random() * Date.now()), g.X2.push(this.fullscreenViewId), o.A.$(window).addEvent("popstate", this.onHistoryStateChange))
							}
							clearHystory() {
								this.saveHistory && (o.A.$(window).removeEvent("popstate", this.onHistoryStateChange), g.X2.splice(g.X2.indexOf(this.fullscreenViewId), 1), this.fullscreenViewId = null)
							}
							destroySelectors() {
								var t, e;
								null == (t = this.selectorsDebounce) || t.cancel(), this.selectorsDebounce = null, null == (e = this.selectors) || e.destroy(), this.selectors = null, this.off("visibility"), this.off("changeSlide"), this.off("selectorsReady"), this.off("getSelectorImgUrl"), this.off("selectorsDone"), this.off("getSelectorProportion")
							}
							destroyArrows() {
								var t;
								null == (t = this.arrows) || t.destroy(), this.arrows = null, this.off("arrowAction")
							}
							destroyEffect() {
								var t, e;
								null == (t = this.effect) || t.stop(), null == (e = this.effect) || e.destroy(), this.effect = null, this.off("effectStart"), this.off("effectEnd")
							}
							destroyContextMenu() {
								var t;
								this.movingContainer.removeEvent("contextmenu"), null == (t = this.contextMenu) || t.destroy(), this.contextMenu = null
							}
							destroy() {
								var t, e, i, s;
								this.destroyed = !0, this.onResizeDebounce.cancel(), this.onResizeDebounce = null, this.instanceNode.removeClass(k), clearTimeout(this.autoplayTimer), this.autoplayTimer = null, o.A.$(window).removeEvent("resize", this.onResizeHandler), o.A.$(window).removeEvent("orientationchange", this.onResizeHandler), this.onResizeHandler = null, this.onScrollHandler && (o.A.$(window).addEvent("scroll", this.onScrollHandler), this.onScrollHandler = null), null == (t = this.intersectionObserver) || t.disconnect(), this.intersectionObserver = null, this.clearHystory(), this.movingContainer.removeEvent("mouseout"), this.slideWrapper.removeClass(g.pS), this.clearingTouchdragFunction && this.clearingTouchdragFunction(), this.slidesContainer.removeEvent("touchdrag"), V.test(this.id) && this.instanceNode.removeAttr("id"), this.destroyContextMenu(), null == (e = this.productDetail) || e.destroy(), this.productDetail = null, null == (i = this.selectorsPositionClasses) || i.destroy(), this.selectorsPositionClasses = null, null == (s = this.fsButton) || s.destroy(), this.fsButton = null, this.destroyEffect(), this.destroyArrows(), this.destroySelectors(), this.off("componentEvent"), this.off("goTo" + M), this.off("goTo" + M + "Out"), this.off("infoReady"), this.off("slideVideoPlay"), this.off("slideVideoPause"), this.off("slideVideoEnd"), this.off("slideVideoError"), this.slides.forEach((t => {
									const e = t.originNode;
									o.A.$(e).removeClass(g.Mu + "-component"), t.destroy()
								})), this.slides = [], this.originalSlidesOrder = [], this.off("stats"), this.off("error"), this.off("reloadThumbnail"), this.sliderNodes.forEach((t => this.instanceNode.append(t))), this.sliderNodes = [], o.A.$(document).removeEvent("keydown", this.pseudoFSEvent), this.pseudoFSEvent = null, o.A.$(document).removeEvent("keydown", this.keyboardCallback), this.keyboardCallback = null, this.fullScreenBox.remove(), this.fullScreenBox = null, this.controlsWrapper.remove(), this.controlsWrapper = null, this.slidesContainer.remove(), this.slidesContainer = null, this.selectorsWrapper.remove(), this.selectorsWrapper = null, this.slideWrapper.remove(), this.slideWrapper = null, this.movingContainer.remove(), this.movingContainer = null, this.isReady = !1, this.doSetSize = !1, this.instanceNode = null, this.externalContainer = null, super.destroy()
							}
						}
						const X = Z;
						s()
					} catch (t) {
						s(t)
					}
				}))
			},
			8779: (t, e, i) => {
				i.d(e, {
					A: () => n
				});
				var s = i(7741),
					o = i(511);
				const n = class {
					constructor(t, e) {
						this.parentNode = t, this.activeNode = e, this.activatedCurtain = s.A.$new("div").addClass("spin-activated-curtain").setCss({
							top: 0,
							left: 0,
							width: "100%",
							height: "100%",
							position: "absolute",
							zIndex: 999999999
						}), this.state = 0
					}
					show() {
						this.state && (this.activatedCurtain.setCssProp("display", "block"), this.activeNode.addClass(o.Mu + "-activated"))
					}
					hide() {
						this.state && (this.activatedCurtain.setCssProp("display", "none"), this.activeNode.removeClass(o.Mu + "-activated"))
					}
					activateCurtain() {
						this.state || (this.state = 1, this.activeNode.addClass(o.Mu + "-sleeping"), this.parentNode.append(this.activatedCurtain))
					}
					deactivateCurtain() {
						this.state && (this.state = 0, this.activeNode.removeClass(o.Mu + "-sleeping"), this.activatedCurtain.remove())
					}
					addTapEvents(t) {
						this.activatedCurtain.addEvent("tap", (e => {
							this.state && (e.action = "activate", t(e))
						})), this.activeNode.addEvent("tap", (e => {
							this.state && (e.action = "deactivate", t(e))
						}))
					}
					addPinchEvent(t) {
						this.activeNode.addEvent("pinch", t)
					}
					removePinchEvent(t) {
						this.activeNode.removeEvent("pinch", t)
					}
					destroy() {
						this.state = 1, this.hide(), this.deactivateCurtain(), this.removePinchEvent(), this.activeNode.removeEvent("tap"), this.activatedCurtain.remove(), this.activatedCurtain.removeEvent("tap"), this.activatedCurtain = null
					}
				}
			},
			5574: (t, e, i) => {
				i.a(t, (async(t, s) => {
					try {
						i.r(e), i.d(e, {
							default: () => T
						});
						var o = i(1986),
							n = i(2893),
							a = i(1873),
							h = i(3192),
							r = i(9533),
							l = i(8779),
							d = i(3435),
							c = i(8479),
							p = i(3274),
							u = i(7064),
							m = i(749),
							g = i(6943),
							v = i(2289),
							f = i(7950),
							y = i(1808),
							S = i(2326),
							w = i(7741),
							b = i(757),
							A = i(629),
							x = i(511),
							z = i(5654);
						let t = null;
						try {
							t = (await Promise.resolve().then((() => {
								if (!i.m[9383]) {
									var t = new Error("Module '9383' is not available (weak dependency)");
									throw t.code = "MODULE_NOT_FOUND", t
								}
								return i(9383)
							}))).default
						} catch (t) {}
						b.ms.addCssModule("Spin", o.A + n.A + a.A);
						const C = 1,
							I = x.Mu + "-spin",
							E = "https://sirv.com/about-spin/?utm_source=client&utm_medium=sirvembed&utm_content=typeofembed(spin)&utm_campaign=branding",
							P = t => (t.common || (t.common = {}), t.common.common || (t.common.common = {}), t.common.mobile || (t.common.mobile = {}), t.local || (t.local = {}), t.local.common || (t.local.common = ""), t.local.mobile || (t.local.mobile = ""), t),
							N = t => {
								t.stopDefaults()
							};
						class O extends d.A {
							constructor(e, i) {
								super(e, i, h.Ay), this.type = x.mo.SPIN, this.canvas = null, this.canvasContainer = w.A.$new("div").addClass("spin-canvas-container"), this.coreNode = w.A.$new("div").addClass("sirv-spin"), this.instanceNode.append(this.coreNode), this.ctx = null, this.isOnStartHintCompleated = !1, this.isSmoothing = !1, this.smoothingTimeout = null, this.minFrameSize = 0, this.minRowSize = 0, this.size = {
									width: 0,
									height: 0
								}, this.isDragMove = !1, this.longTapTimer = !1, this.imagesMap = null, this.isInited = !1, this.loader = null, this.hint = null, this.openedImg = null, this.scale = 1, this.cssId = -1, this.boxBoundaries = null, this.hotspots = null, this.animationFX = null, this.loadedImages = [], this.currentSize = {
									width: 0,
									height: 0
								}, this.currentImageSize = {
									width: 0,
									height: 0
								}, this.standardSize = {
									width: 0,
									height: 0
								}, this.lastImg = null, this.startLoadingTime = null, this.isOver = !1, this.isSpinActivated = !w.A.browser.mobile, this.firstImageLoaded = !1, this.firstImagesPartLoaded = !1, this.isInfoLoaded = !1, this.customActionWas = !1, this.isAutoplayPaused = !1, this.sizeMissing = !1, this.isManualInit = "load" !== this.option("initialize"), this.removeManualInitEvent = () => {}, this.reflectDirection = !1, this.instanceUrl || (this.instanceUrl = this.instanceNode.attr("data-config") || ""), this.configPath = "/" + this.instanceUrl.replace(this.baseUrl.replace(/(^https?:\/\/[^/]*)., "$1/"), "");
								const s = this.instanceUrl.replace(/^http(s)?:\/\//, "");
								this.configHash = w.A.getHashCode(s), this.sessionId = w.A.getHashCode(s + document.location.href.replace(/^http(s)?:\/\//, "") + Date.now()), this.layers = {}, this.imageSettings = {}, this.fullscreenStartTime = 0, this.meta = {}, this.infoSettings = {}, this.autospinResumeTimer = null, this.isHidden = !1, this.sessionStartTime = 0, this.animationCloud = null, this.touchDragCloud = null, this.slideDragEventStart = !1, this.dppx = null, this.startTimeForZommEvent = null, this.resizeAnimationTimer = (0, c.A)((() => {
									if (this.isInView) {
										let t = this.isOnStartHintCompleated ? "inactive" : "start";
										this.animate(t)
									}
								}), 1e3), this.wheelDebounce = null, this.rotateDebounce = null, this.keyPressHandlerForShiftButton = null, this.openLensHandler = null, this.firstUserInteraction = !1, this.userColumn = 0, this.userRow = 0, this.placeholder = w.A.$(this.instanceNode.node.querySelector("img")), this.replaceTextParamURLFromMetadata(), this.trackUnload = () => {
									this.sendStats("Page Unload", Date.now() - this.sessionStartTime, {
										message: "Stopped"
									}, !0)
								}, this.disableScrollOnMobile = () => {
									const t = w.A.$(document).fullSize,
										e = this.instanceNode.size;
									Math.abs(e.height - t.height) <= 50 ? this.instanceNode.addEvent("touchmove", N) : this.instanceNode.removeEvent("touchmove", N)
								}, this.resizeWindowTimer = null, this.windowResizeCallback = () => {
									clearTimeout(this.resizeWindowTimer), this.resizeWindowTimer = setTimeout((() => {
										this.disableScrollOnMobile()
									}), 10)
								}, this.api = Object.assign(this.api, {
									isInitialized: () => this.isInitialized(),
									play: (t, e) => this.play(t, e),
									pause: () => this.pause(),
									rotate: (t, e) => this.rotateXY(t, e),
									rotateX: t => this.rotateX(t),
									rotateY: t => this.rotateY(t),
									jump: t => this.jump(t),
									jumpRows: t => this.jumpRows(t),
									jumpCols: t => this.jumpCols(t),
									currentFrame: () => this.currentFrame()
								}), this.createHotspotsClass(t), this.getInfo().then((() => {
									w.A.browser.mobile && this.option("tappingFirst") ? this.activatedCurtain = new l.A(this.instanceNode, this.coreNode) : this.isSpinActivated = !0, this.createMap(this.quality, this.hdQuality, this.isHDQualitySet)
								})).catch((t => {}))
							}
							isInitialized() {
								return this.isInited
							}
							rotateXY(t, e) {
								return !(!this.ready || this.isZoomed()) && this.rotate(t, e)
							}
							rotateX(t) {
								return !(!this.ready || this.isZoomed()) && this.rotate(t, null)
							}
							rotateY(t) {
								return !(!this.ready || this.isZoomed()) && this.rotate(null, t)
							}
							jump(t) {
								return this.jumpRows(t)
							}
							jumpRows(t) {
								return !(!this.ready || this.isZoomed()) && this.jumpTo(t, "row")
							}
							jumpCols(t) {
								return !(!this.ready || this.isZoomed()) && this.jumpTo(t, "col")
							}
							currentFrame() {
								return this.ready ? this.getCurrentFrame() : null
							}
							isActive() {
								return this.isSpinActivated
							}
							canFullscreen() {
								return !("fullscreen" in this.infoSettings) || this.infoSettings.fullscreen
							}
							setOptions(t, e, i, s, o) {
								if (t.fromJSON(e), this.infoSettings) {
									const e = Object.assign({}, this.infoSettings),
										i = new w.A.Options(this.defaultSchema);
									(0, A.A)(i, e, w.A.browser.touchScreen && w.A.browser.mobile), Object.keys(i.options).forEach((e => {
										i.isset(e) && t.set(e, i.get(e))
									}))
								}
								return t.fromString(i), t.fromString(s), o && o.forEach((e => t.fromJSON(e))), t
							}
							makeOptions() {
								return this._options.options = P(this._options.options), super.makeOptions()
							}
							updateOptions(e) {
								if ((0, z.A)(this._options, e)) return;
								this._options = e, this.stopSmoothing(), this.stopAnimation();
								const i = this.option("thumbnail.type"),
									s = this.option("thumbnail.gifParams"),
									o = this.quality,
									n = this.hdQuality;
								this.option("autospin.enable") || this.instanceOptions.clearOption("autospin.duration"), this.option("swapSides") && ["start", "loop", "increment", "reverse", "sensitivity"].forEach((t => {
									this.instanceOptions.clearOption("row." + t), this.instanceOptions.clearOption("column." + t)
								})), super.updateOptions(e), this.normalizeOptions();
								const a = this.option;
								if (this.imagesMap.updateOptions({
										swapSides: a("swapSides"),
										reverseColumn: a("column.reverse"),
										reverseRow: a("row.reverse"),
										loopColumn: a("column.loop"),
										loopRow: a("row.loop"),
										rowSpeed: a("row.sensitivity"),
										columnSpeed: a("column.sensitivity"),
										quality: this.quality,
										hdQuality: this.hdQuality,
										isHDQualitySet: this.isHDQualitySet,
										referrerPolicy: this.referrerPolicy
									}), this.hotspots && (this.off("hotspotActivate"), this.off("hotspotDeactivate"), this.hotspotsData = this.hotspots.hotspotData, this.hotspots.destroy(), this.createHotspotsClass(t), this.createHotspots(), this.hotspots.instanceComponentNode = this.canvasContainer, this.hotspots.containerSize = this.canvasContainer.node.getBoundingClientRect()), this.initAnimation(), this.removeMouseWheel(), this.setMouseWheel(this.coreNode), this.touchDragCloud && (this.rotateDebounce.cancel(), this.rotateDebounce = null, this.touchDragCloud.removeEvent(), this.touchDragCloud = null), this.setDrag(this.coreNode), w.A.browser.mobile) {
									const t = a("tappingFirst");
									this.activatedCurtain && !t ? (this.activatedCurtain.destroy(), this.activatedCurtain = null, this.isSpinActivated = !0) : !this.activatedCurtain && t && (this.isSpinActivated = !1, this.activatedCurtain = new l.A(this.instanceNode, this.coreNode), this.turnOnOff())
								}
								this.hint && (this.hint.destroy(), this.hint = null), this.createHint(), this.clearZoom(), this.createZoom(), this.setZoomEvents(), this.setTouchActionCSS(), this.boxBoundaries = this.coreNode.rect, a("autospin.enable") && this.animate("start"), this.coreNode.removeClass(x.XO), this.zoomable && this.coreNode.addClass(x.XO), a("thumbnail.type") === i && a("thumbnail.gifParams") === s && o === this.quality && n !== this.hdQuality || this.emit("reloadThumbnail")
							}
							sendStats(t, e, i, s) {
								const o = {
									account: this.config.account,
									useBeacon: !!s,
									event: t,
									eventTime: e,
									sessionId: this.sessionId,
									origin: this.configPath
								};
								i && (o.data = i), this.emit("stats", {
									data: o
								})
							}
							getInfo() {
								return this.gettingInfoPromise || (this.gettingInfoPromise = new Promise(((t, e) => {
									this.waitGettingInfo.wait((() => {
										const i = "sirv_spin_info_v" + C + "_" + this.configHash,
											s = this.instanceUrl + (/\?/.test(this.instanceUrl) ? "&" : "?") + "info=" + i;
										(0, u.A)(s, i, this.referrerPolicy).then((i => {
											var s;
											this.destroyed || (i.layers ? (this.config = i, this.layers = this.config.layers, this.meta = this.config._file.meta || null, this.infoSettings = this.config.settings, this.config.settings.hotspots && (this.hotspotsData = this.hotspotsData.concat(this.config.settings.hotspots)), this.dataDescription = null == (s = this.meta) ? void 0 : s.description, this.imageSettings = this.config.settings.images.main, this.accountInfo = {
												account: this.config.account,
												branded: this.config.branded
											}, this.sessionStartTime = Date.now(), this.sendStats("sessionStart", this.sessionStartTime), w.A.$(window).addEvent("beforeunload", this.trackUnload), t()) : i.contentType && /image/.test(i.contentType) || i._isplaceholder ? e({
												error: "changeSpinToImage",
												isPlaceholder: i._isplaceholder,
												account: i.account
											}) : e({
												error: {
													status: 404
												}
											}))
										})).catch((t => {
											this.destroyed || e({
												error: t
											})
										}))
									}))
								}))), this.gettingInfoPromise
							}
							replaceTextParamURLFromMetadata() {
								this.imageSettings.text && this.imageSettings.text.text && (this.imageSettings.text.text = this.imageSettings.text.text.replace(/\$\{spin\.(title|description)\}/g, ((t, e) => {
									const i = this.meta[e] || "";
									return w.A.isString(i) ? i : e
								})), "" === this.imageSettings.text.text && delete this.imageSettings.text)
							}
							getDPPX(t) {
								const e = t.height > t.width ? "height" : "width",
									i = {
										[e]: t[e]
									};
								this.dppx = (0, p.A)(f.A.roundImageSize(i)[e], this.infoSize[e], this.upscale)
							}
							showHint() {
								let t = !1;
								return this.hint && (this.always && ![x.a0.OPENING, x.a0.OPENED].includes(this.fullscreenState) || this.option("autospin.enable") && this.firstUserInteraction || (t = !0, this.hint.show())), t
							}
							onStartActions() {
								this.ready ? this.animate("slideIn") : this.isStarted && (this.firstImageLoaded && !this.isManualInit ? this.loadPrimaryImages() : this.isInView && (!this.isInited && this.sizeMissing && (this.boxBoundaries = this.coreNode.rect, this.currentSize = (0, v.A)(this.coreNode.size, this.infoSize, this.standardSize), this.getDPPX(this.currentSize), this.setImageSize(), this.setCanvasSize()), this.loadFirstImage()))
							}
							onStopActions() {
								this.zoomOut(), this.stopSmoothing(), this.stopAnimation(), this.deactivateSpin(), this.setUserFrame(), this.customActionWas = !1, this.hint && this.hint.hide(), super.onStopActions()
							}
							onInView(t) {
								t ? this.isInView || (this.ready ? (this.isInView = !0, this.animate("inView")) : this.canvas && (this.preload || this.isSlideShown) && (this.isInView = !0, this.firstImageLoaded ? this.isManualInit || this.loadPrimaryImages() : this.loadFirstImage())) : this.isInView && this.ready && (this.option("autospin.enable") ? this.animationCloud.pause() : (this.stopAnimation(), this.setUserFrame()), this.deactivateSpin())
							}
							startFullInit(t, e) {
								this.isStartedFullInit || (super.startFullInit(t, e), this.getInfo().then((() => {
									this.instanceOptions = this.makeOptions(), this.createOptionFunction(), this.normalizeOptions();
									const t = this.option;
									this.imagesMap.startFullInit({
										swapSides: t("swapSides"),
										startColumn: t("column.start"),
										startRow: t("row.start"),
										reverseColumn: t("column.reverse"),
										reverseRow: t("row.reverse"),
										loopColumn: t("column.loop"),
										loopRow: t("row.loop"),
										rowSpeed: t("row.sensitivity"),
										columnSpeed: t("column.sensitivity"),
										columnIncrement: t("column.increment"),
										rowIncrement: t("row.increment")
									}), this.loadedImages = this.imagesMap.map, this.loader = new y.A(this.coreNode, {
										max: this.imagesMap.imageCount,
										class: "spin-loader"
									}), this.loader.parentClass = this, this.coreNode.addEvent(["btnclick", "tap"], (t => {
										t.stop()
									})), this.on("isSingleSlide", (t => {
										t.stop(), this.activatedCurtain && (t.data.isSingle ? this.activatedCurtain.deactivateCurtain() : this.activatedCurtain.activateCurtain())
									})), this.hotspots && (this.hotspots.Options = {
										columnsRevers: this.option("column.reverse"),
										rowsRevers: this.option("row.reverse"),
										rows: this.imagesMap.rowCount,
										columns: this.imagesMap.frameCount
									}), this.initAnimation()
								})).catch((() => {})), w.A.browser.touchScreen && this.on("dragEvent", (t => {
									"dragstart" === t.data.type ? (this.slideDragEventStart = !0, this.touchDragCloud && this.touchDragCloud.removeEvent()) : "dragend" === t.data.type && (this.slideDragEventStart = !1, this.touchDragCloud && this.touchDragCloud.addEvent())
								})))
							}
							getThumbnailData(t) {
								return this.imagesMap.getThumbnail(t)
							}
							setUserFrame() {
								this.jumpTo(this.userRow, "row"), this.jumpTo(this.userColumn, "col")
							}
							getSocialButtonData(t, e) {
								return e ? this.instanceNode.attr("data-src") : super.getSocialButtonData(t)
							}
							turnOnOff() {
								w.A.browser.mobile && this.activatedCurtain && this.activatedCurtain.addTapEvents((t => {
									"activate" === t.action ? (this.isSpinActivated || (t.stop(), this.activateSpin()), this.hotspots && this.hotspots.hideActiveHotspotBox(!0)) : this.isSpinActivated && (t.stop(), this.stopSmoothing(), this.stopAnimation(), this.hotspots && this.hotspots.isHotspotActivated() ? this.hotspots.hideActiveHotspotBox(!0) : this.deactivateSpin())
								}))
							}
							activateSpin() {
								this.isSpinActivated || (this.isSpinActivated = !0, w.A.browser.mobile && (this.stopAnimation(), this.customActionWas = !0, this.hint && this.hint.hide(), this.activatedCurtain && this.activatedCurtain.hide()))
							}
							deactivateSpin() {
								this.isSpinActivated && (this.isSpinActivated = !1, w.A.browser.mobile && (this.customActionWas || this.showHint(), this.activatedCurtain && this.activatedCurtain.show()))
							}
							createPinchEvent() {
								let t, e, i, s, o, n, a, h, r;
								const l = () => {
									o = 1, n = 1, i = this.zoom.baseScale.x, a = 1, h = i, t = 1 - i
								};
								super.createPinchEvent(this.coreNode), this.pinchCloud.onPinchStart = t => {
									[x.a0.OPENING, x.a0.CLOSING].includes(this.fullscreenState) || (this.pinchCloud.pinch = !0, clearTimeout(this.longTapTimer), this.stopSmoothing(), this.stopAnimation(), this.touchDragCloud && this.touchDragCloud.removeEvent(), this.hotspots && this.hotspots.hideActiveHotspotBox(!0), this.customActionWas = !0, r = !1, this.pinchCloud.scale = t.scale, s = 1, this.openedImg && (s = this.zoom.scale.x, void 0 === i && l(), s /= i), this.sendEvent("pinchStart"))
								}, this.pinchCloud.onPinchResize = t => {
									this.pinchCloud.pinch && !this.pinchCloud.block && this.zoom && this.fullscreenState === x.a0.OPENED && this.openedImg && (this.pinchCloud.scale = t.scale, this.zoom.basePercent = t.centerPoint)
								}, this.pinchCloud.onPinchMove = d => {
									this.pinchCloud.pinch && !this.pinchCloud.block && (this.fullscreenState !== x.a0.OPENED && this.isFullscreenEnabled ? d.scale >= 2 && (this.pinchCloud.block = !0, this.sendEvent("fullscreenIn")) : this.openedImg ? this.zoom && (r ? (e = d.scale, e *= i, a < e && (a = e, h = i, n = 1, o = t / (a - i)), h > e && (h = e, a = 1, o = 1, n = i / h), e *= s, e = (i + (e - i) * o) * n, this.zoom.setScale(e, d.centerPoint.x, d.centerPoint.y)) : (r = !0, this.zoom.basePercent = d.centerPoint), this.pinchCloud.scale = d.scale) : d.scale > 1.1 ? (this.firstUserInteraction = !0, this.openLens(d.centerPoint.x, d.centerPoint.y, !1, "zero"), l(), s = 1) : d.scale < .2 && (this.pinchCloud.block = !0, this.sendEvent("fullscreenOut")))
								}, this.pinchCloud.onPinchEnd = t => {
									this.pinchCloud.pinch && (this.pinchCloud.pinch = !1, this.openedImg && this.activateSpin(), setTimeout((() => {
										this.touchDragCloud && this.touchDragCloud.addEvent()
									}), 16), this.sendEvent("pinchEnd")), this.openedImg && this.pinchCloud.removeEvent(), this.pinchCloud.block = !1, this.pinchCloud.scale = 0
								}
							}
							onStopContext() {
								this.stopSmoothing(), this.stopAnimation(), this.hint && this.hint.hide()
							}
							onSecondSelectorClick() {
								this.zoomOut()
							}
							setGlobalEvents() {
								this.on("zoomUp", (t => {
									const e = t.data;
									t.stop(), this.ready && this.zoom && !this.isDragMove && this.isFullscreenActionEnded() && (this.firstUserInteraction = !0, this.openLens(e.x, e.y))
								})), this.on("zoomDown", (t => {
									t.stop(), this.ready && this.zoom && this.isZoomed() && this.zoom.hide()
								}))
							}
							normalizeOptions() {
								this.option("autospin.enable") || this.option("autospin.duration", 0), this.option("swapSides") && ["start", "loop", "increment", "reverse", "sensitivity"].forEach((t => {
									const e = "row." + t,
										i = "column." + t,
										s = this.option(e);
									this.option(e, this.option(i)), this.option(i, s)
								})), ["onStart", "onVisible", "onInactive"].forEach((t => {
									const e = "hint." + t + ".effect";
									"none" === this.option(e) && this.option(e, !1)
								})), this.option("hint.onStart.enable") && this.option("hint.onStart.effect") || (this.isOnStartHintCompleated = !0), w.A.browser.mobile && "load" !== this.option("initialize") && this.option("initialize", "tap"), this.setDefaultZoomOptions(), this.option("zoom.enable") && "max" !== this.option("zoom.ratio") && this.option("zoom.ratio") < x.Zn && this.option("zoom.enable", !1)
							}
							setDefaultZoomOptions() {
								super.setDefaultZoomOptions(), this.defaultZoomOptions = Object.assign(this.defaultZoomOptions, {
									tiles: this.option("zoom.tiles"),
									pan: this.option("zoom.pan"),
									trigger: w.A.browser.mobile ? "dblclick" : "click",
									type: "inner",
									height: "auto"
								})
							}
							loadPrimaryImages() {
								this.firstImagesPartLoaded || (this.firstImagesPartLoaded = !0, this.startLoadingTime = Date.now(), this.imagesMap.loadPrimaryImages({
									width: this.currentImageSize.width,
									height: this.currentImageSize.height,
									dppx: this.dppx
								}), this.loader && this.loader.show())
							}
							isThumbnailGif() {
								return "gif" === this.option("thumbnail.type")
							}
							manualInit() {
								const t = this.option("initialize");
								if ("load" === t) return;
								const e = {
										hover: "mouseover",
										click: "btnclick",
										tap: "tap"
									},
									i = t => {
										t.stop(), this.removeManualInitEvent(), this.loadPrimaryImages()
									};
								this.coreNode.addEvent(e[t], i), this.activatedCurtain && this.activatedCurtain.activatedCurtain.addEvent(e[t], i), this.removeManualInitEvent = () => {
									this.coreNode.removeEvent(e[t], i), this.activatedCurtain && this.activatedCurtain.activatedCurtain.removeEvent(e[t], i), this.removeManualInitEvent = () => {}
								}
							}
							run(t, e, i) {
								const s = super.run(t, e, i);
								return s && (w.A.$(window).addEvent("resize", this.windowResizeCallback), this.initCanvas(), this.startGettingInfo()), s
							}
							initCanvas() {
								this.canvas = w.A.$new("canvas").attr("id", this.ariaLabelId), this.ctx = this.canvas.node.getContext("2d");
								const t = this.alt;
								t && (this.canvas.attr("role", "img"), this.canvas.attr("aria-label", t), this.canvas.attr("alt", t));
								let e = this.infoSize.width,
									i = this.infoSize.height;
								const s = this.coreNode.size;
								e < s.width && (e = s.width), i < s.height && (i = s.height), 0 === s.height && (this.cssId = w.A.addCSS("#" + this.id + " ." + I + ":before", {
									"padding-top": this.infoSize.height / this.infoSize.width * 100 + "%"
								}, this.id + "-css"), s.height = s.width * (this.infoSize.height / this.infoSize.width)), this.currentSize = (0, v.A)(s, this.infoSize), this.getDPPX(this.currentSize), this.standardSize.width = this.currentSize.width, this.standardSize.height = this.currentSize.height, this.setImageSize(), this.canvas.setCss({
									top: "0",
									left: "0",
									zIndex: 10,
									position: "absolute"
								}), this.setCanvasSize(), this.canvasContainer.append(this.canvas), this.coreNode.append(this.canvasContainer), this.isInView && (this.preload || this.isSlideShown) && this.loadFirstImage()
							}
							loadContent() {
								this.loadFirstImage()
							}
							loadFirstImage() {
								if (!this.firstImageLoaded && this.isInfoLoaded) {
									if (this.currentImageSize.width && this.currentImageSize.height || (this.currentSize = (0, v.A)(this.coreNode.size, this.infoSize), this.getDPPX(this.currentSize), this.currentSize.width && this.currentSize.height && (this.setImageSize(), this.isStarted && this.currentImageSize.width && this.currentImageSize.height && (this.setCanvasSize(), this.draw()))), !this.currentImageSize.width || !this.currentImageSize.height) return void(this.sizeMissing = !0);
									this.waitToStart.start(), this.firstImageLoaded = !0, this.imagesMap.loadFirstImage({
										width: this.currentImageSize.width,
										height: this.currentImageSize.height,
										dppx: this.dppx
									}), !this.isManualInit && this.isInView && this.isSlideShown && this.loadPrimaryImages()
								}
							}
							createMap(t, e, i) {
								const s = this.option;
								let o = null;
								s("autospin.enable") ? o = s("autospin.type") : s("hint.onStart.enable") && s("hint.onStart.effect") && (o = s("hint.onStart.effect")), this.imagesMap = new r.A({
									url: this.baseUrl,
									imageSettings: this.imageSettings,
									layers: this.layers,
									swapSides: s("swapSides"),
									startColumn: s("column.start"),
									startRow: s("row.start"),
									reverseColumn: s("column.reverse"),
									reverseRow: s("row.reverse"),
									loopColumn: s("column.loop"),
									loopRow: s("row.loop"),
									rowSpeed: s("row.sensitivity"),
									columnSpeed: s("column.sensitivity"),
									columnIncrement: s("column.increment"),
									rowIncrement: s("row.increment"),
									loadingSchema: o,
									quality: t,
									hdQuality: e,
									isHDQualitySet: i,
									referrerPolicy: this.referrerPolicy
								}), this.imagesMap.parentClass = this, this.userColumn = this.imagesMap.startColumn, this.userRow = this.imagesMap.startRow, this.on("mapFirstImageLoaded", (t => {
									if (t.stopAll(), this.placeholder && this.placeholder.setCssProp("display", "none"), this.draw(), this.loader && this.loader.progress(), this.setCanvas(), this.manualInit(), !this.isManualInit && (this.preload || this.isInView && this.isSlideShown) && this.loadPrimaryImages(), this.isInited = !0, this.sendEvent("init"), this.hotspots) {
										const t = this.imagesMap.getCurrentImage({
											width: this.currentSize.width,
											height: this.currentSize.height
										});
										t && (this.hotspots.setFramePosition(t.row, t.col), this.hotspots.updateAndShow(), this.isInView && this.isSlideShown && this.hotspots.showNeededElements())
									}
								})), this.on("mapImagesReady", (t => {
									t.stopAll(), this.imagesMap.loadSecondaryImages({
										width: this.currentImageSize.width,
										height: this.currentImageSize.height,
										dppx: this.dppx
									}), this.calcMinSizeForDrag();
									const e = Date.now();
									this.sendStats("framesPreloaded", e - this.sessionStartTime, {
										duration: e - this.startLoadingTime
									}), this.done(), this.sendContentLoadedEvent()
								})), this.on("mapImageLoaded", (t => {
									t.stopAll(), this.loader && (this.loadedImages[t.data.row][t.data.col] || (this.loadedImages[t.data.row][t.data.col] = !0, this.loader.progress())), t.data.error || t.data.isCurrent && (t.data.callbackData.lens ? this.zoom && (this.zoom.shown || this.zoom.showing) && this.openedImg && this.openedImg.col === t.data.col && this.openedImg.row === t.data.row && this.zoom.addLoadedImage(t.data) : this.lastImg && (this.lastImg.width !== t.data.width || this.lastImg.height !== t.data.height) && this.firstImageLoaded && this.draw())
								})), this.on("mapAllImagesLoaded", (t => {
									t.stopAll();
									const e = Date.now();
									this.sendStats("framesLoaded", e - this.sessionStartTime, {
										duration: e - this.startLoadingTime
									}), this.loader && 2 !== this.loader.getProgressState() && this.loader.hide()
								})), this.on("frameChange", (t => {
									t.stop(), this.ready && this.sendEvent("frameChange", {
										row: t.data.row,
										column: t.data.column
									})
								})), this.imagesMap.loadImageInfo().then((t => {
									this.isInfoLoaded = !0;
									const e = Object.assign({}, t.size);
									this.infoSize = e, this.hotspots && (this.hotspots.originImageSize = this.infoSize)
								})).catch((t => {
									this.isInfoLoaded = !0
								}))
							}
							getSelectorImgUrl(t) {
								return new Promise(((e, i) => {
									this.getInfo().then((() => {
										this.imagesMap.loadImageInfo().then((i => {
											this.waitToStart.wait((() => {
												const i = this.imagesMap.setImageSettings({
													dppx: this.dppx
												});
												i.src && (t.src = i.src), t.srcset = i.srcset, "gif" === this.option("thumbnail.type") && (t.originUrl = this.baseUrl, t.imageSettings = {
													image: 24
												}, this.option("thumbnail.gifParams") && (t.imageSettings = (0, m.A)(this.option("thumbnail.gifParams")))), e(Object.assign(this.imagesMap.getThumbnail(t), {
													alt: this.alt
												}))
											}))
										})).catch(i)
									})).catch(i)
								}))
							}
							getInfoSize() {
								return new Promise(((t, e) => {
									this.getInfo().then((() => {
										this.imagesMap.loadImageInfo().then(t).catch(e)
									})).catch(e)
								}))
							}
							onHotspotActivate(t) {
								this.customActionWas = !0, this.stopAnimation(), super.onHotspotActivate(t)
							}
							onHotspotDeactivate(t) {
								super.onHotspotDeactivate(t), this.animateWithDelay()
							}
							createHint() {
								if (!this.option("hint.message.enable")) return;
								let t = '<div class="spin-hint-animation"></div>';
								const e = ["spin-hint-horizontal-animation"],
									i = ["spin-hint-vertical-animation"];
								let s = [];
								switch (t += "<span>", t += this.option("hint.message.text"), t += "</span>", this.imagesMap.getHintType()) {
									case "bidir":
										s = e.concat(i);
										break;
									case "row":
										s = e;
										break;
									case "col":
										s = i
								}
								const o = {
									html: t,
									additionalClass: s
								};
								(w.A.browser.mobile || this.option("autospin.enable")) && (o.autohide = 0), this.hint = new S.A(this.coreNode, o), this.isSlideShown && this.isInView && "infinite" === this.option("autospin.type") && this.showHint()
							}
							get imageClassContainer() {
								return this.imagesMap
							}
							createZoom() {
								let t = null;
								return !this.destroyed && this.option("zoom.enable") && (t = super.createZoom(this.coreNode, {}), this.zoomContainer && (this.zoom.lensContainer = this.zoomContainer), this.openLensHandler = t => {
									this.isFullscreenActionEnded() && (this.firstUserInteraction = !0, this.openLens(t.x, t.y))
								}, this.coreNode.addEvent(["btnclick", "dbltap"], this.openLensHandler), w.A.browser.mobile), t
							}
							onZoomGetImage(t) {
								super.onZoomGetImage(t), this.checkImage(t.data, t.data.dontLoad) ? this.zoom.addLoadedImage(this.imagesMap.getCurrentImage(t.data)) : this.imagesMap.loadImage(t.data)
							}
							onZoomCancelLoadingOfTiles(t) {
								var e;
								super.onZoomGetImage(t), t.data.round = !1, null == (e = this.imagesMap) || e.cancelLoadingImage(t.data)
							}
							onZoomBeforeShow(t) {
								this.canvas.addClass(this.zoomClassName), this.hotspots && this.hotspots.hideAll()
							}
							onZoomShown(t) {
								this.isSlideShown ? (this.startTimeForZommEvent = Date.now(), this.openedImg && this.sendStats("zoomIn", Date.now() - this.sessionStartTime, {
									frame: {
										row: this.openedImg.row,
										column: this.openedImg.col
									},
									clientX: t.data.clientPosition.x,
									clientY: t.data.clientPosition.y,
									pageX: t.data.pagePosition.x,
									pageY: t.data.pagePosition.y
								}), this.sendEvent("zoomIn")) : this.zoom.hide(!0)
							}
							onZoomHidden(t) {
								if (this.openedImg) {
									this.canvas.removeClass(this.zoomClassName);
									const e = Date.now();
									this.sendStats("zoomOut", e - this.sessionStartTime, {
										duration: e - this.startTimeForZommEvent,
										frame: {
											row: this.openedImg.row,
											column: this.openedImg.col
										},
										clientX: t.data.clientPosition.x,
										clientY: t.data.clientPosition.y,
										pageX: t.data.pagePosition.x,
										pageY: t.data.pagePosition.y
									}), this.hotspots && (this.hotspots.showAll(), this.isInView && this.isSlideShown && this.hotspots.showNeededElements())
								}
								this.sendEvent("zoomOut"), this.isSlideShown && this.animateWithDelay(), this.startTimeForZommEvent = null, this.openedImg = null, this.pinchCloud && this.pinchCloud.addEvent()
							}
							setLongTapEvents() {
								const t = window.navigator.pointerEnabled;
								let e = !1,
									i = !1,
									s = ["touchstart"];
								t ? s.push("pointerdown") : s.push("MSPointerDown"), this.coreNode.addEvent(s, (t => {
									this.isDragMove || this.pinchCloud.pinch || !this.isFullscreenActionEnded() || (clearTimeout(this.longTapTimer), this.longTapTimer = setTimeout((() => {
										t.stop(), e = !0, this.customActionWas = !0;
										const i = t.pageXY;
										this.touchDragCloud && this.touchDragCloud.removeEvent(), this.firstUserInteraction = !0, this.openLens(i.x, i.y, !0)
									}), 500), i = !0)
								})), s = ["touchmove"], t ? s.push("pointermove") : s.push("MSPointerMove"), this.coreNode.addEvent(s, (t => {
									if (e && this.isFullscreenActionEnded()) {
										t.stop();
										const e = t.pageXY;
										this.zoom.customMove(e.x, e.y)
									}
								}), 1), s = ["touchend"], t ? s.push("pointerup") : s.push("MSPointerUp"), this.coreNode.addEvent(s, (t => {
									i && (t.stop(), i = !1, clearTimeout(this.longTapTimer)), e && this.isFullscreenActionEnded() && (t.stop(), e = !1, this.zoom.hide(!0), this.touchDragCloud && this.touchDragCloud.addEvent())
								}))
							}
							get zoomSize() {
								const t = this.option("zoom.ratio"),
									e = this.infoSize.width,
									i = this.infoSize.height;
								let s = {
									width: e,
									height: i
								};
								return "max" !== t && (s.width = this.currentImageSize.width * t, s.height = this.currentImageSize.height * t, s = f.A.roundImageSize(s)), s.width = Math.min(e, s.width), s.height = Math.min(i, s.height), {
									width: s.width,
									height: s.height,
									originWidth: e,
									originHeight: i
								}
							}
							openLens(t, e, i, s) {
								let o = !1;
								if (this.zoomable) {
									const n = this.zoomSize;
									o = !0, this.stopSmoothing(), this.stopAnimation(), this.hint && this.hint.hide(), this.hotspots && this.hotspots.hideActiveHotspotBox(!0);
									let a, h, r = !1;
									this.isFullscreenActionEnded() && this.imagesMap.isLoaded({
										width: this.currentImageSize.width,
										height: this.currentImageSize.height
									}) ? (a = this.currentImageSize.width, h = this.currentImageSize.height, r = !0) : (a = this.lastImg.serverWidth, h = this.lastImg.serverHeight);
									const l = this.imagesMap.getCurrentImage({
										width: a,
										height: h,
										round: r
									});
									this.openedImg = l, o = void 0 === t ? this.zoom.showCenter(l.node, n) : this.zoom.show(l.node, n, t, e, i, s)
								}
								return o
							}
							setTouchActionCSS() {
								const t = this.imagesMap.rowCount,
									e = this.imagesMap.frameCount;
								t > 1 && e > 1 ? this.coreNode.setCssProp("touch-action", "none") : t > 1 ? this.coreNode.setCssProp("touch-action", "pan-x") : this.coreNode.setCssProp("touch-action", "pan-y")
							}
							done() {
								this.loader && this.loader.setMaxOpacity(.5), this.setDrag(this.coreNode), this.setMouseWheel(this.coreNode), this.createHint(), this.createZoom(), this.setZoomEvents(), this.setTouchActionCSS(), this.boxBoundaries = this.coreNode.rect, this.animate("start"), this.accountInfo.branded && b.ms.showSirvAd(this.instanceNode, this.instanceNode, E, "360-degree viewer by Sirv"), this.sendStats("viewerReady", Date.now() - this.sessionStartTime, {
									rows: this.imagesMap.rowCount,
									columns: this.imagesMap.frameCount,
									viewerSize: {
										width: this.currentSize.width,
										height: this.currentSize.height
									}
								}), this.zoomable && this.coreNode.addClass(x.XO), this.coreNode.addEvent(["dblbtnclick", "dbltap"], (t => {
									t.stop(), this.emit("goToFullscreen")
								})), this.setGlobalEvents(), this.turnOnOff(), this.instanceNode.store("jumpup", (() => {
									this.stopSmoothing(), this.stopAnimation(), this.jumpRows(this.imagesMap.currentRow + 1)
								})), this.instanceNode.store("jumpdown", (() => {
									this.stopSmoothing(), this.stopAnimation(), this.jumpRows(this.imagesMap.currentRow - 1)
								})), this.instanceNode.store("jumpleft", (() => {
									this.stopSmoothing(), this.stopAnimation(), this.jumpCols(this.imagesMap.currentColumn + 1)
								})), this.instanceNode.store("jumpright", (() => {
									this.stopSmoothing(), this.stopAnimation(), this.jumpCols(this.imagesMap.currentColumn - 1)
								})), super.done(), this.hotspots && (this.hotspots.instanceComponentNode = this.canvasContainer, this.hotspots.containerSize = this.canvasContainer.node.getBoundingClientRect()), setTimeout((() => this.resize()), 0)
							}
							setCanvas() {
								this.firstImageLoaded && this.draw(), this.isInView && this.isSlideShown && this.canvas.render(), this.canvas.addClass(x.Mu + "-shown")
							}
							clearCanvas() {
								this.ctx && this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
							}
							draw(t) {
								if (this.ctx) {
									const e = t || this.currentImageSize,
										i = {
											width: e.width,
											height: e.height,
											maxSize: !0,
											dppx: this.dppx
										},
										s = this.imagesMap.getCurrentImage(i);
									if (this.lastImg = s, !s || !s.node) return;
									this.ctx.imageSmoothingQuality = "high", this.hotspots && this.hotspots.changeHotspotsPosition(s.row, s.col), this.clearCanvas(), this.canvas.node.width = s.node.node.width || s.width, this.canvas.node.height = s.node.node.height || s.height, this.ctx.drawImage(s.node.node, 0, 0, this.canvas.node.width, this.canvas.node.height)
								}
							}
							setCanvasSize() {
								const t = this.currentSize;
								this.canvas.setCss({
									width: t.width,
									height: t.height
								}), this.canvasContainer.setCss({
									width: t.width,
									height: t.height
								}), this.canvas.width = t.width, this.canvas.height = t.height
							}
							calcMinSizeForDrag() {
								const t = this.currentSize;
								this.minFrameSize = this.imagesMap.pixelPerFrame(t.width), this.minRowSize = this.imagesMap.pixelPerRow(t.height)
							}
							smoothing(t, e, i) {
								if (!e) return;
								let s = t / e;
								const o = () => {
									s *= .97, this.smoothingTimeout = setTimeout((() => {
										this.imagesMap.prepareFutureImage(i), this.imagesMap.setPreparedFutureImage(), this.draw(), s > .3 && o()
									}), this.minFrameSize / s)
								};
								this.isSmoothing || (this.isSmoothing = !0, o())
							}
							stopSmoothing() {
								this.isSmoothing && (this.isSmoothing = !1, clearTimeout(this.smoothingTimeout), this.smoothingTimeout = null, this.imagesMap.resetPreparedImage())
							}
							animateWithDelay(t) {
								let e = "inactive";
								t && (e = t), this.option("autospin.enable") ? (clearTimeout(this.autospinResumeTimer), this.autospinResumeTimer = setTimeout((() => {
									this.animate(e)
								}), this.option("autospin.resume"))) : this.animate(e)
							}
							setDrag(t) {
								const e = this.imagesMap.rowCount,
									i = this.imagesMap.frameCount,
									s = e > 1 && i > 1,
									o = {
										x: {
											minSize: this.minFrameSize,
											count: i
										},
										y: {
											minSize: this.minRowSize,
											count: e
										}
									},
									n = this.option("freeDrag");
								let a = {
										x: 0,
										y: 0
									},
									h = {
										x: 0,
										y: 0
									},
									r = null;
								s || (r = i > 1 ? "x" : "y");
								let l, d = null;
								const p = {};
								let u, m, g = {
										x: {
											next: 0,
											prev: 0
										},
										y: {
											up: 0,
											down: 0
										}
									},
									v = !1;
								this.rotateDebounce = (0, c.A)((() => {
									v = !1
								}), 50);
								const f = 65e-5,
									y = {
										x: f * i * 9.8,
										y: f * e * 9.8
									},
									S = {
										x: ["prev", "next"],
										y: ["down", "up"]
									};
								!s && n && (i > 1 ? S.y = S.x : S.x = S.y);
								const w = t => {
										clearTimeout(this.longTapTimer), p[t.state](t)
									},
									b = (t, e, i, s) => {
										g[t][s] += i
									},
									A = t => {
										const e = g[t];
										let i;
										const s = "x" === t ? ["next", "prev"] : ["up", "down"];
										return i = e[s[0]] > e[s[1]] ? {
											distance: e[s[0]],
											direction: s[0]
										} : {
											distance: e[s[1]],
											direction: s[1]
										}, i
									},
									z = (t, e, i, s, o) => {
										let n;
										return n = e * Math.pow(i / s, 2) / (2 * t), n = Math.floor(n / o), n
									},
									C = (t, e, i, s) => e * (i / s) / t,
									I = (t, e) => S[e][t >= 0 ? 0 : 1];
								p.dragstart = t => {
									this.firstUserInteraction = !0, this.isDragMove = !0, this.stopSmoothing(), this.stopAnimation(), this.hint && this.hint.hide(), this.hotspots && this.hotspots.hideNeededElements(!0), this.userColumn = this.imagesMap.startColumn, this.userRow = this.imagesMap.startRow, this.fullscreenState === x.a0.OPENED && t.stop(), a.x = t.x, a.y = t.y, d = t.timeStamp, m = Date.now();
									const e = m - this.sessionStartTime;
									this.sendStats("dragStart", e, {
										clientX: t.x - this.boxBoundaries.left,
										clientY: t.y - this.boxBoundaries.top,
										pageX: t.x,
										pageY: t.y
									}), this.sendEvent("spinStart"), this.sendEvent("rotate"), this.sendStats("rotate", e, {}), this.pinchCloud && this.pinchCloud.removeEvent()
								}, p.dragend = t => {
									let e, c, p, f, S;
									const w = [];
									if (this.isDragMove) {
										t.stop(), this.isDragMove = !1, this.rotateDebounce.cancel(), v && r === l || v && (s || n) ? (e = Date.now() - m, c = A(l), p = z(y[l], i, c.distance, e, o[l].minSize), f = C(y[l], i, c.distance, e), w.push({
											items: p,
											direction: c.direction
										}), s && (c = A(u), p = z(y[u], i, c.distance, e, o[u].minSize), S = C(y[u], i, c.distance, e), S > f && (f = S), w.push({
											items: p,
											direction: c.direction
										})), this.animateTo(f, w), this.pinchCloud && this.pinchCloud.addEvent()) : (this.hotspots && this.isInView && this.isSlideShown && this.hotspots.showNeededElements(), this.sendEvent("rotateEnd"), this.animateWithDelay());
										const b = Date.now();
										this.sendStats("dragEnd", b - this.sessionStartTime, {
											duration: b - m,
											clientX: t.x - this.boxBoundaries.left,
											clientY: t.y - this.boxBoundaries.top,
											pageX: t.x,
											pageY: t.y
										}), a = {
											x: 0,
											y: 0
										}, d = null, h = {
											x: 0,
											y: 0
										}, g = {
											x: {
												next: 0,
												prev: 0
											},
											y: {
												up: 0,
												down: 0
											}
										}, v = !1
									}
								};
								const E = (t, e) => {
									let i = !1;
									if (h[t] > o[t].minSize) {
										i = !0;
										const s = Math.floor(h[t] / o[t].minSize);
										h[t] = h[t] % o[t].minSize, this.imagesMap.prepareFutureImage(e, s), this.imagesMap.setPreparedFutureImage()
									}
									return i
								};
								p.dragmove = t => {
									const o = {},
										c = {
											x: 0,
											y: 0
										},
										p = {
											x: 0,
											y: 0
										};
									let m;
									this.isDragMove && (v = !0, this.customActionWas = !0, c.x = t.x - a.x, c.y = t.y - a.y, p.x = Math.abs(c.x), p.y = Math.abs(c.y), m = t.timeStamp - d, d = t.timeStamp, l = p.x >= p.y ? "x" : "y", u = "x" === l ? "y" : "x", (this.fullscreenState === x.a0.OPENED || s || n || "x" === l && i > 1 || "y" === l && e > 1) && t.stop(), o[l] = I(c[l], l), o[u] = I(c[u], u), b(l, 0, p[l], o[l]), b(u, 0, p[u], o[u]), s || n ? (h.x += p.x, h.y += p.y) : r && (r === l && "x" === r ? h.x += p.x : r === l && "y" === r && (h.y += p.y)), E(l, o[l]) && n && (h[u] = 0), s && E(u, o[u]), this.userColumn = this.imagesMap.currentColumn, this.userRow = this.imagesMap.currentRow, a.x = t.x, a.y = t.y, this.draw(), this.rotateDebounce())
								};
								const P = {
									eventAdded: !1,
									addEvent: () => {
										P.eventAdded || (P.eventAdded = !0, t.addEvent(["mousedrag", "touchdrag"], w))
									},
									removeEvent: () => {
										P.eventAdded && (P.eventAdded = !1, t.removeEvent(["mousedrag", "touchdrag"], w))
									}
								};
								this.touchDragCloud = P, this.slideDragEventStart || this.touchDragCloud.addEvent()
							}
							removeDrag() {}
							animateTo(t, e) {
								const i = [],
									s = [],
									o = {};
								clearTimeout(this.autospinResumeTimer), this.animationFX && this.animationFX.stop();
								for (let t = 0, n = e.length; t < n; t++) s.push(e[t].direction), i.push(0), o[e[t].direction] = [0, e[t].items];
								this.animationFX = new w.A.FX(w.A.$new("div"), {
									duration: Math.abs(t),
									transition: w.A.FX.getTransition().cubicIn,
									onBeforeRender: w.A.$(((t, e) => {
										for (let s = 0; s < t.length; s++) {
											const o = Math.round(e[t[s]]);
											i[s] !== o && (this.imagesMap.prepareFutureImage(t[s], o - i[s]), this.imagesMap.setPreparedFutureImage(), this.userColumn = this.imagesMap.currentColumn, this.userRow = this.imagesMap.currentRow, i[s] = o)
										}
										this.draw()
									})).bind(this, s),
									onComplete: () => {
										this.sendEvent("rotateEnd"), this.stopAnimation(), this.animateWithDelay(), this.hotspots && this.isInView && this.isSlideShown && this.hotspots.showNeededElements()
									}
								}).start(o)
							}
							setMouseWheel(t) {
								if (!this.option("wheel")) return;
								let e, i;
								const s = 8 / 54;
								let o = 0,
									n = !1;
								this.wheelDebounce = (0, c.A)((t => {
									n = !1, t ? o = 0 : (this.sendEvent("rotateEnd"), this.animateWithDelay())
								}), 200);
								const a = this.imagesMap.rowCount,
									h = this.imagesMap.frameCount,
									r = a > 1 && h > 1,
									l = this.option("freeDrag");
								let d = !1;
								this.keyPressHandlerForShiftButton = t => {
									16 === t.oe.keyCode && (d = "keydown" === t.type)
								}, w.A.$(window).addEvent(["keydown", "keyup"], this.keyPressHandlerForShiftButton), t.addEvent("mousescroll", (t => {
									this.firstUserInteraction = !0;
									const h = !!t.isMouse && d,
										c = Math.abs(t.deltaY) < Math.abs(t.deltaX);
									(c || r || l) && (this.customActionWas = !0, t.stop(), this.animationFX && (this.animationFX.stop(), this.animationFX = null), this.stopSmoothing(), this.stopAnimation(), this.hotspots && this.hotspots.hideActiveHotspotBox(), n || (n = !0, this.sendEvent("spinStart"), this.sendEvent("rotate"), this.sendStats("rotate", Date.now() - this.sessionStartTime, {})), c ? (e = t.deltaX, i = e >= 0 ? "next" : "prev") : (e = t.deltaY, i = a > 1 && !h ? e >= 0 ? "down" : "up" : e >= 0 ? "next" : "prev"), t.isMouse ? (e = e / Math.abs(e) * 3, o += Math.abs(e), this.animateTo(200, [{
										direction: i,
										items: o
									}])) : (e *= s, o += e, Math.abs(o) > 1 && (e = parseInt(o, 10), o -= e, this.imagesMap.prepareFutureImage(i, Math.abs(e)), this.imagesMap.setPreparedFutureImage(), this.draw())), this.wheelDebounce(t.isMouse))
								}))
							}
							removeMouseWheel() {
								this.wheelDebounce && (this.wheelDebounce.cancel(), this.wheelDebounce = null), this.keyPressHandlerForShiftButton && w.A.$(window).removeEvent(["keydown", "keyup"], this.keyPressHandlerForShiftButton), this.coreNode.removeEvent("mousescroll")
							}
							animate(t, e, i, s) {
								const o = "autoplay" === t || this.option("autospin.enable");
								if (!this.isInView || !this.isSlideShown || !this.animationCloud || this.animationCloud.isMoving() || this.isDragMove || this.openedImg || !o && (this.customActionWas && !s || this.animationCloud.isInited())) return;
								if (this.animationCloud.isPaused()) return void this.animationCloud.resume();
								clearTimeout(this.animationCloud.hintTimer), clearTimeout(this.autospinResumeTimer);
								let n = !1,
									a = null;
								if (o) {
									if (this.isAutoplayPaused) return;
									a = "as-" + (i || this.option("autospin.type")), "start" !== t && (n = !0)
								} else {
									let e;
									switch (t) {
										case "start":
											e = "onStart";
											break;
										case "inView":
										case "slideIn":
											e = "onVisible";
											break;
										case "inactive":
											n = !0, e = "onInactive";
											break;
										default:
											a = t
									}
									if (e && this.option("hint." + e + ".enable")) {
										const t = this.option("hint." + e + ".effect");
										t && (a = t)
									}
								}
								this.animationCloud.start({
									speed: e,
									type: a,
									infinite: o,
									delay: n,
									userInteraction: s
								}, (() => {
									const t = this.showHint();
									s && this.sendEvent("rotateEnd"), this.hotspots && this.isInView && this.isSlideShown && this.hotspots.showNeededElements(), this.option("hint.onInactive.enable") && this.imagesMap.imageCount > 1 && (t ? this.animationCloud.hintTimer = setTimeout((() => {
										this.animationCloud.hintTimer = null, this.animate("inactive")
									}), this.hint.movingTime) : this.option("hint.onInactive.effect") && this.animate("inactive"))
								}))
							}
							initAnimation() {
								let t, e;
								const i = this.option("swapSides") ? this.imagesMap.rowCount : this.imagesMap.frameCount,
									s = Math.min(150 * i, 3600),
									o = t => {
										let e = s;
										return this.instanceOptions.isset("speed") ? 0 !== this.option("speed") && (e = this.option("speed")) : ["as-row", "as-sphere", "as-full", "as-helix"].includes(t) && this.instanceOptions.isset("autospin.duration") && 0 !== this.option("autospin.duration") && (e = this.option("autospin.duration")), e
									},
									n = {
										hintTimer: null,
										isInited: () => !!e,
										isMoving: () => {
											var t;
											return null == (t = e) ? void 0 : t.isPlaying()
										},
										isPaused: () => {
											var t;
											return null == (t = e) ? void 0 : t.isPaused()
										},
										start: (s, n) => {
											if (e || !this.imagesMap || !s.type) return void n();
											const a = this.imagesMap.createAnimation(s.type, this.reflectDirection);
											if (a < 2) return void n();
											if (s.userInteraction && this.imagesMap.imagesBuffer && this.imagesMap.imagesBuffer.length) {
												const t = this.imagesMap.imagesBuffer[this.imagesMap.imagesBuffer.length - 1];
												this.userColumn = t.col, this.userRow = t.row
											}
											s.infinite && this.showHint();
											let h = null;
											var r;
											e = new w.A.FX(w.A.$new("div"), {
												duration: Math.floor((s.speed || o(s.type)) / i * a),
												transition: (r = s.type, "momentum" === r ? [.645, .045, .355, 1] : w.A.FX.getTransition().linear),
												cycles: s.infinite ? "infinite" : 1,
												onBeforeRender: (t, e) => {
													const i = Math.floor(t.value);
													h !== i && (this.imagesMap.setNextAnimationFrame(i), this.imagesMap.setPreparedNextImage(), this.draw(), h = i)
												},
												onComplete: () => {
													this.isOnStartHintCompleated = !0, e = null, n()
												}
											});
											const l = {
												value: [0, a - 1]
											};
											s.delay && !s.infinite ? t = setTimeout((() => {
												e.start(l)
											}), this.option("inactivity")) : e.start(l)
										},
										resume: () => {
											e && e.resume()
										},
										pause: () => {
											e && (e.pause(), clearTimeout(n.hintTimer), clearTimeout(t))
										},
										stop: () => {
											e && (e.stop(), e = null, this.imagesMap.clearFramesQueue(), this.imagesMap.resetPreparedImage()), clearTimeout(t)
										}
									};
								this.animationCloud = n
							}
							stopAnimation() {
								this.animationFX && (this.animationFX.stop(), this.animationFX = null), clearTimeout(this.autospinResumeTimer), this.animationCloud && this.animationCloud.stop()
							}
							onBeforeFullscreenIn(t) {
								this.stopSmoothing(), this.stopAnimation(), this.zoom && this.zoom.hide(!0), this.deactivateSpin(), this.boxBoundaries = this.coreNode.rect, super.onBeforeFullscreenIn(t), this.hotspots && this.hotspots.hideAll(), this.isInited && this.isInView && this.isSlideShown && (this.isHidden = !0, this.canvas.setCss({
									opacity: 0,
									visibility: "hidden"
								}))
							}
							onAfterFullscreenIn(t) {
								this.infoSize && (!this.isInited && this.sizeMissing && this.isInView && this.isSlideShown ? setTimeout((() => {
									this.boxBoundaries = this.coreNode.rect, this.currentSize = (0, v.A)(this.coreNode.size, this.infoSize, this.standardSize), this.getDPPX(this.currentSize), this.setImageSize(), this.setCanvasSize(), this.loadFirstImage()
								})) : (this.currentSize = (0, v.A)(this.coreNode.size, this.infoSize, this.standardSize), this.getDPPX(this.currentSize), this.setImageSize(), this.setCanvasSize(), this.ready && (this.imagesMap.isImagesExist({
									width: this.currentImageSize.width,
									height: this.currentImageSize.height
								}) || this.imagesMap.loadImages({
									width: this.currentImageSize.width,
									height: this.currentImageSize.height,
									dppx: this.dppx
								})), this.firstImageLoaded && this.draw(), this.isHidden && (this.isHidden = !1, setTimeout((() => {
									this.canvas.setCss({
										opacity: "",
										visibility: ""
									})
								}), 0)), this.hotspots && (this.hotspots.containerSize = this.canvasContainer.node.getBoundingClientRect(), this.hotspots.showAll(), this.isInView && this.isSlideShown && this.hotspots.showNeededElements()), this.ready && (this.animate("inactive"), w.A.browser.mobile || this.showHint(), this.fullscreenStartTime = Date.now(), this.sendStats("fullscreenOpen", Date.now() - this.sessionStartTime))), super.onAfterFullscreenIn(t))
							}
							onBeforeFullscreenOut(t) {
								this.stopSmoothing(), this.stopAnimation(), this.zoom && this.zoom.hide(!0), this.deactivateSpin(), this.hint && this.always && this.hint.hide(), super.onBeforeFullscreenOut(t), this.isInited && this.isInView && this.isSlideShown && (this.isHidden = !0, this.canvas.setCss({
									opacity: 0,
									visibility: "hidden"
								}))
							}
							onAfterFullscreenOut(t) {
								if (this.infoSize && (this.currentSize = (0, v.A)(this.coreNode.size, this.infoSize), this.getDPPX(this.currentSize), this.standardSize.width = this.currentSize.width, this.standardSize.height = this.currentSize.height, this.currentImageSize.width = this.currentSize.width, this.currentImageSize.height = this.currentSize.height, this.setCanvasSize(), this.ready && (this.imagesMap.isImagesExist({
										width: this.currentSize.width,
										height: this.currentSize.height
									}) || this.imagesMap.loadImages({
										width: this.currentSize.width,
										height: this.currentSize.height,
										dppx: this.dppx
									})), this.firstImageLoaded && this.draw(), this.isHidden && (this.isHidden = !1, setTimeout((() => {
										this.destroyed || this.canvas.setCss({
											opacity: "",
											visibility: ""
										})
									}), 0)), super.onAfterFullscreenOut(t), this.ready)) {
									this.animate("inactive"), w.A.browser.mobile || this.showHint();
									const t = Date.now();
									this.sendStats("fullscreenClose", t - this.sessionStartTime, {
										duration: t - this.fullscreenStartTime
									})
								}
							}
							play(t, e) {
								let i = !1;
								return this.ready && !this.isZoomed() && (this.isAutoplayPaused = !1, this.stopSmoothing(), this.stopAnimation(), this.instanceOptions.checkValue("autospin.duration", t) || this.instanceOptions.checkValue("speed", t) || (t = null), this.instanceOptions.checkValue("autospin.type", e) || (e = null), this.animate("autoplay", t, e), i = !0), i
							}
							pause() {
								let t = !1;
								return this.ready && !this.isZoomed() && (this.isAutoplayPaused = !0, this.stopSmoothing(), this.stopAnimation(), this.animateWithDelay(), t = !0), t
							}
							rotate(t, e) {
								let i = !1;
								return this.ready && (t = (0, g.A)(t), e = (0, g.A)(e), 0 === t && 0 === e || (this.stopAnimation(), this.stopSmoothing(), this.isDragMove || (this.sendEvent("rotate"), this.sendStats("rotate", Date.now() - this.sessionStartTime, {}), this.animate({
									cols: t,
									rows: e
								}, void 0, void 0, !0), i = !0))), i
							}
							jumpTo(t, e) {
								let i = !1,
									s = null;
								return this.ready && (w.A.isString(t) && (t = t.trim(), s = /^-/.test(t) ? "prev" : "next"), t = parseInt(t, 10), isNaN(t) || (i = this.imagesMap.jump(e, t, s), i && this.firstImageLoaded && (this.sendEvent("rotate"), this.sendStats("rotate", Date.now() - this.sessionStartTime, {}), this.draw()))), i
							}
							zoomIn() {
								return !(!this.ready || !this.zoom || this.isDragMove || !this.isFullscreenActionEnded()) && this.openLens()
							}
							zoomOut() {
								return !(!this.ready || !this.zoom) && this.zoom.hide()
							}
							getCurrentFrame() {
								if (this.ready) {
									const t = this.imagesMap.getCurrentImage({
										width: this.currentSize.width,
										height: this.currentSize.height
									});
									return {
										row: t.row + 1,
										column: t.col + 1
									}
								}
								return !1
							}
							get originImageUrl() {
								return this.ready ? this.imagesMap.originImageUrl : null
							}
							setCallback(t, e) {
								return !!this.ready && (this.option(t, e), !0)
							}
							setImageSize() {
								this.currentImageSize.width = this.currentSize.width, this.currentImageSize.height = this.currentSize.height
							}
							get zoomable() {
								let t = !1;
								if (this.option("zoom.enable")) {
									const e = this.currentImageSize;
									this.zoomSize.originWidth - e.width >= 100 && (t = !0)
								}
								return t
							}
							get orientation() {
								return this.imagesMap.getHintType()
							}
							onResize() {
								return !(this.fullscreenState === x.a0.OPENING || !this.isStarted || (this.stopSmoothing(), this.option("autospin.enable") ? this.animationCloud.pause() : this.isOnStartHintCompleated && this.stopAnimation(), this.boxBoundaries = this.coreNode.rect, this.currentSize = (0, v.A)(w.A.$(this.coreNode.node.parentNode).size, this.infoSize, this.standardSize), this.getDPPX(this.currentSize), this.standardSize.width = this.currentSize.width, this.standardSize.height = this.currentSize.height, this.setImageSize(), this.setCanvasSize(), this.calcMinSizeForDrag(), this.zoomable ? this.coreNode.addClass(x.XO) : this.coreNode.removeClass(x.XO), this.zoom && this.zoom.onResize(), this.firstImagesPartLoaded && !this.imagesMap.isImagesExist({
									width: this.currentSize.width,
									height: this.currentSize.height
								}) && this.imagesMap.loadImages({
									width: this.currentSize.width,
									height: this.currentSize.height,
									dppx: this.dppx
								}), this.firstImageLoaded && this.draw(), this.ready && this.hotspots && (this.hotspots.containerSize = this.canvasContainer.node.getBoundingClientRect(), this.hotspots.updateAndShow()), this.resizeAnimationTimer(), 0))
							}
							getContainerForBoundengClientRect() {
								return this.canvasContainer
							}
							clearZoom() {
								this.zoom && (this.coreNode && this.coreNode.removeEvent(["btnclick", "dbltap"], this.openLensHandler), super.clearZoom())
							}
							destroy() {
								return this.instanceNode.removeEvent("touchmove", N), w.A.$(window).removeEvent("resize", this.windowResizeCallback), clearTimeout(this.resizeWindowTimer), this.isInited && this.sendStats("sessionEnd", Date.now() - this.sessionStartTime, {
									message: "Stopped"
								}), this.coreNode.del("instance"), this.resizeAnimationTimer.cancel(), this.resizeAnimationTimer = null, this.removeMouseWheel(), this.touchDragCloud && (this.rotateDebounce.cancel(), this.rotateDebounce = null, this.touchDragCloud.removeEvent(), this.touchDragCloud = null), this.placeholder && this.placeholder.setCssProp("display", ""), this.cssId > -1 && w.A.removeCSS(this.id + "-css", this.cssId), this.cssId = -1, this.removeManualInitEvent(), this.activatedCurtain && this.activatedCurtain.destroy(), this.stopSmoothing(), this.stopAnimation(), this.hint && (this.hint.destroy(), this.hint = null), this.coreNode.removeEvent(["mousedrag", "touchdrag", "pinch"]), this.loader && (this.loader.destroy(), this.loader = null), this.imagesMap && (this.imagesMap.destroy(), this.imagesMap = null, this.off("mapFirstImageLoaded"), this.off("mapImagesReady"), this.off("mapImageLoaded"), this.off("mapAllImagesLoaded")), this.clearCanvas(), this.canvas && (this.canvas.removeEvent("transform"), this.canvas.removeClass(this.zoomClassName), this.canvas.remove()), this.canvasContainer.removeEvent("transform"), this.canvasContainer.removeEvent("mouseover"), this.canvasContainer.removeEvent("mouseout"), this.canvasContainer.remove(), this.canvasContainer = null, this.ctx = null, this.canvas = null, this.loadedImages = [], this.off("isSingleSlide"), this.off("zoomUp"), this.off("zoomDown"), this.off("frameChange"), this.instanceNode.del("jumpup"), this.instanceNode.del("jumpdown"), this.instanceNode.del("jumpleft"), this.instanceNode.del("jumpright"), this.coreNode.remove(), this.infoSize = null, this.startLoadingTime = null, this.isInited = !1, this.openedImg = null, this.coreNode = null, this.firstUserInteraction = !1, this.animationCloud && (clearTimeout(this.animationCloud.hintTimer), this.animationCloud = null), this.lastImg = null, this.hotspotsData = null, super.destroy(), !0
							}
						}
						const T = O;
						s()
					} catch (t) {
						s(t)
					}
				}), 1)
			},
			2289: (t, e, i) => {
				i.d(e, {
					A: () => s
				});
				const s = (t, e, i) => {
					let {
						width: s,
						height: o
					} = e;
					return s > t.width && (o = Math.trunc(t.width * (o / s)), s = t.width), o > t.height && (s = Math.trunc(t.height * (s / o)), o = t.height), !i && e.width < s && (s = e.width, o = e.height), {
						width: s,
						height: o
					}
				}
			},
			629: (t, e, i) => {
				i.d(e, {
					A: () => o
				});
				const s = {
						startRow: "row.start",
						loopRow: "row.loop",
						startColumn: "column.start",
						loopColumn: "column.loop",
						swapRowsColumns: "swapSides",
						spinOnAnyDrag: "freeDrag",
						hint: "hint.message.enable"
					},
					o = (t, e, i) => {
						if (delete e.images, delete e.hotspots, "speed" in e && e.speed < 101 && delete e.speed, t.fromJSON(e), Object.keys(s).forEach((i => {
								i in e && !t.isset(s[i]) && t.set(s[i], e[i])
							})), "reverseRotation" in e) {
							const i = ["row", "column"];
							i.includes(e.reverseRotation) && !t.isset(e.reverseRotation + ".reverse") ? t.set(e.reverseRotation + ".reverse", !0) : "both" === e.reverseRotation && i.forEach((e => {
								t.isset(e + ".reverse") || t.set(e + ".reverse", !0)
							}))
						}
						"zoom" in e && (t.isset("zoom.enable") || 0 !== e.zoom || t.set("zoom.enable", !1), !t.isset("zoom.ratio") && e.zoom > 0 && 2.5 !== e.zoom && t.set("zoom.ratio", e.zoom)), t.isset("speed") || "autospinSpeed" in e && t.set("speed", e.autospinSpeed), t.isset("autospin.enable") || "infinite" !== (null == e ? void 0 : e.autospin) || t.set("autospin.enable", !0);
						const o = i ? "mobileHintText" : "hintText";
						o in e && !t.isset("hint.message.text") && t.set("hint.message.text", e[o]), "hint" in e && !1 === e.hint && (t.isset("hint.onVisible.enable") || t.set("hint.onVisible.enable", !1), t.isset("hint.onInactive.enable") || t.set("hint.onInactive.enable", !1))
					}
			},

			9533: (t, e, i) => {
				i.d(e, {
					A: () => D
				});
				var s = i(7950);
				class o extends s.A {
					constructor(t, e, i, s) {
						super(t, e), this.col = i, this.row = s
					}
					_createImageData(t, e) {
						const i = super._createImageData(t, e);
						return i.col = this.col, i.row = this.row, i
					}
					getThumbnail(t) {
						const e = super.getThumbnail(t);
						return e.col = this.col, e.row = this.row, e
					}
				}
				const n = o;
				var a = i(7746),
					h = i(4357),
					r = i(9157);
				const l = (t, e, i, s, o) => {
						const n = [];
						let a = !1,
							r = t;
						for (; r !== e || !a && o;) a = !0, i ? r += 1 : r -= 1, r = (0, h.A)(r, s), n.push(r);
						return n
					},
					d = (t, e) => {
						const i = null === e.row ? "row" : "col";
						return t.map((t => ({
							col: e.column,
							row: e.row,
							[i]: t
						})))
					},
					c = (t, e, i, s) => {
						let o = [t],
							n = !0;
						return [t + e, t - e, t].forEach((t => {
							const e = s ? (0, h.A)(t, i) : (0, r.A)(t, 0, i - 1);
							o = o.concat(l(o[o.length - 1], e, n, i, s)), n = !n
						})), o
					},
					p = (t, e, i) => i ? l(t, (0, h.A)(t + e, e), !0, e, i) : c(t, e, e, !1),
					u = t => {
						const e = (0, a.A)({
							degree: 30,
							swapSides: !1,
							accelerate: !1,
							isBackward: !1,
							firstLineOnly: !1,
							row: {
								length: 1,
								loop: !1,
								current: 1,
								jumpCount: 0
							},
							column: {
								length: 36,
								loop: !0,
								current: 1,
								jumpCount: 0
							},
							firstSide: "column",
							secondSide: "row"
						}, t || {});
						return ["row", "column"].forEach((t => {
							e[t].current > e[t].length - 1 && (e[t].current = 0)
						})), e.swapSides && (e.secondSide = e.firstSide, e.firstSide = "row"), e
					},
					m = {
						lib: {
							getRightIndex: (t, e, i) => i ? (0, h.A)(t, e) : (0, r.A)(t, 0, e - 1)
						},
						twitch: t => {
							const e = u(t),
								i = {
									column: 0,
									row: 0
								};
							let s = [];
							return [e.firstSide, e.secondSide].forEach((t => {
								const o = t === e.firstSide ? e.secondSide : e.firstSide;
								if (e[t].length > 1 && (i[t] = Math.floor(e[t].length / 360 * e.degree) || 1), i[t]) {
									const n = {
										[t]: null, [o]: e[o].current
									};
									s = s.concat(d(c(e[t].current, i[t], e[t].length, e[t].loop), n))
								}
							})), s
						},
						sphere: t => {
							const e = u(t);
							let i = [];
							return (e.firstLineOnly ? [e.firstSide] : [e.firstSide, e.secondSide]).forEach((t => {
								if (1 === e[t].length) return;
								const s = t === e.firstSide ? e.secondSide : e.firstSide,
									o = {
										[t]: null, [s]: e[s].current
									},
									n = d(p(e[t].current, e[t].length, e[t].loop), o);
								e.isBackward && n.reverse(), i = i.concat(n)
							})), t.additionalFrame && i.push(i[0]), i
						},
						intro: t => {
							const e = u(t),
								i = {
									swapSides: e.swapSides,
									firstLineOnly: !0,
									isBackward: e.isBackward,
									row: (0, a.A)({}, e.row),
									column: (0, a.A)({}, e.column)
								};
							return [].concat(m.sphere(i), m.twitch(i))
						},
						full: t => {
							const e = u(t),
								i = e[e.secondSide].length,
								s = i > 1 ? p(e[e.secondSide].current, i, e[e.secondSide].loop) : [e[e.secondSide].current],
								o = (0, a.A)({}, e[e.firstSide]),
								n = (0, a.A)({}, e[e.secondSide]),
								h = s.reduce(((t, i) => {
									n.current = i;
									const s = {
										swapSides: e.swapSides,
										firstLineOnly: !0,
										[e.firstSide]: o,
										[e.secondSide]: n
									};
									return t.concat(m.sphere(s))
								}), []);
							return e.isBackward && h.reverse(), t.additionalFrame && h.push(h[0]), h
						},
						custom: t => {
							const e = u(t),
								i = {
									x: e.column.current,
									y: e.row.current
								},
								s = {
									x: e.column.current + e.column.jumpCount,
									y: e.row.current + e.row.jumpCount
								},
								o = ((t, e) => {
									const i = {
											x: [],
											y: []
										},
										s = (t, e, s, o) => {
											const n = s - t;
											let a, h, r = o - e,
												l = 1,
												d = e;
											for (r < 0 && (l = -1, r = -r), h = 2 * r - n, a = t; a <= s; a++) i.x.push(a), i.y.push(d), h > 0 && (d += l, h -= 2 * n), h += 2 * r
										},
										o = (t, e, s, o) => {
											let n = s - t;
											const a = o - e;
											let h, r, l = 1,
												d = t;
											for (n < 0 && (l = -1, n = -n), r = 2 * n - a, d = t, h = e; h <= o; h++) i.x.push(d), i.y.push(h), r > 0 && (d += l, r -= 2 * a), r += 2 * n
										};
									return Math.abs(e.y - t.y) < Math.abs(e.x - t.x) ? t.x > e.x ? s(e.x, e.y, t.x, t.y) : s(t.x, t.y, e.x, e.y) : t.y > e.y ? o(e.x, e.y, t.x, t.y) : o(t.x, t.y, e.x, e.y), i
								})(i, s);
							return (t => {
								const e = [];
								t.x[0] !== i.x && t.x.reverse(), t.y[0] !== i.y && t.y.reverse();
								for (let i = 0, s = t.x.length; i < s; i++) e.push({
									col: t.x[i],
									row: t.y[i]
								});
								return e
							})(o).map((t => ({
								col: m.lib.getRightIndex(t.col, e.column.length, e.column.loop),
								row: m.lib.getRightIndex(t.row, e.row.length, e.row.loop)
							})))
						}
					},
					g = m,
					v = {
						getStep: t => {
							let e = 1;
							return t > 24 && (e = Math.floor(t / 24), e > 3 && (e = 3)), e
						},
						getIndexes: t => {
							const e = [],
								i = [];
							let s = !0,
								o = v.getStep(t);
							do {
								const n = [];
								for (let e = 0; e < t; e += o) i[e] || (n.push(e), i[e] = 1);
								1 === o && (s = !1), e.push(n), o = Math.ceil(o / 2)
							} while (o >= 1 && s);
							return e
						},
						getRightIndexes: (t, e, i, s) => {
							t.forEach((t => {
								const o = t + e,
									n = (0, h.A)(o, i);
								(o < i || n < e) && s(n)
							}))
						},
						getOptions: t => {
							const e = (0, a.A)({}, t);
							return e.imageSchema = e.images.map((t => t.map((t => 0)))), e.rowLength = e.images.length, e.colLength = e.images[e.startRow].length, e
						},
						all: (t, e, i) => {
							const s = [];
							for (let o = 0, n = t.length; o < n; o++)
								for (let n = 0, a = t[o].length; n < a; n++) e[o][n] || (s.push([o, n]), e[o][n] = i + 1);
							return s
						},
						getSideOpt: t => {
							const e = {
								length: t.colLength,
								start: t.startCol,
								otherLength: t.rowLength,
								otherStart: t.startRow
							};
							if (t.swapSides) {
								let t = e.length;
								e.length = e.otherLength, e.otherLength = t, t = e.start, e.start = e.otherStart, e.otherStart = t
							}
							return e
						}
					},
					f = {
						_: v,
						all: t => {
							const e = [],
								i = v.getOptions(t),
								s = v.getIndexes(i.colLength),
								o = [];
							return i.images.forEach(((t, e) => {
								const n = t.length;
								v.getRightIndexes(s[0], i.startCol, n, (t => {
									const s = (0, h.A)(e + i.startRow, i.rowLength);
									o.push([s, t]), i.imageSchema[s][t] = 1
								}))
							})), e.push(o), e.push([].concat(v.all(i.images, i.imageSchema, 1))), e
						},
						fastLine: t => {
							const e = [],
								i = v.getOptions(t),
								s = v.getSideOpt(i),
								o = [];
							for (let t = 0, e = s.length; t < e; t++) {
								const e = (0, h.A)(t + s.start, s.length);
								i.swapSides ? (o.push([e, i.startCol]), i.imageSchema[e][i.startCol] = 1) : (o.push([i.startRow, e]), i.imageSchema[i.startRow][e] = 1)
							}
							return e.push(o), e.push([].concat(v.all(i.images, i.imageSchema, 1))), e
						},
						line: t => {
							const e = [],
								i = v.getOptions(t),
								s = v.getSideOpt(i),
								o = v.getIndexes(s.length);
							let n = [],
								a = 1;
							for (v.getRightIndexes(o[0], s.start, s.length, (t => {
									i.swapSides ? (n.push([t, i.startCol]), i.imageSchema[t][i.startCol] = 1) : (n.push([i.startRow, t]), i.imageSchema[i.startRow][t] = 1)
								})), e.push(n), n = []; a < o.length;) o[a] && v.getRightIndexes(o[a], s.start, s.length, (t => {
								i.swapSides ? (n.push([t, i.startCol]), i.imageSchema[t][i.startCol] = a + 1) : (n.push([i.startRow, t]), i.imageSchema[i.startRow][t] = a + 1)
							})), a += 1;
							return e.push(n.concat(v.all(i.images, i.imageSchema, a))), e
						},
						sphere: t => {
							const e = [],
								i = v.getOptions(t),
								s = v.getSideOpt(i),
								o = v.getIndexes(s.length),
								n = v.getIndexes(s.otherLength),
								a = Math.max(o.length, n.length);
							let h = [],
								r = 1;
							for (v.getRightIndexes(o[0], s.start, s.length, (t => {
									i.swapSides ? (h.push([t, i.startCol]), i.imageSchema[t][i.startCol] = 1) : (h.push([i.startRow, t]), i.imageSchema[i.startRow][t] = 1)
								})), v.getRightIndexes(n[0], s.otherStart, s.otherLength, (t => {
									i.swapSides ? i.imageSchema[i.startRow][t] || (h.push([i.startRow, t]), i.imageSchema[i.startRow][t] = 1) : i.imageSchema[t][i.startCol] || (h.push([t, i.startCol]), i.imageSchema[t][i.startCol] = 1)
								})), e.push(h), h = []; r < a;) o[r] && v.getRightIndexes(o[r], s.start, s.length, (t => {
								i.swapSides ? (h.push([t, i.startCol]), i.imageSchema[t][i.startCol] = r + 1) : (h.push([i.startRow, t]), i.imageSchema[i.startRow][t] = r + 1)
							})), n[r] && v.getRightIndexes(n[r], s.otherStart, s.otherLength, (t => {
								i.swapSides ? (h.push([i.startRow, t]), i.imageSchema[i.startRow][t] = r + 1) : (h.push([t, i.startCol]), i.imageSchema[t][i.startCol] = r + 1)
							})), r += 1;
							return e.push(h.concat(v.all(i.images, i.imageSchema, r))), e
						}
					};
				var y = i(7985),
					S = i(2084);
				const w = (t, e, i, s, o) => {
						let n;
						return i ? "next" === i ? (n = t + e, o ? n = (0, h.A)(n, s) : n >= s && (n = s - 1)) : (n = t - e, o ? n = (0, h.A)(n, s) : n < 0 && (n = 0)) : (n = e, o ? n = (0, h.A)(n, s) : (n >= s && (n = s - 1), n < 0 && (n = 0))), n
					},
					b = t => {
						const e = {};
						return Object.entries(t).forEach((t => {
							let [i, s] = t;
							Object.entries(s).forEach((t => {
								let [s, o] = t;
								e[s] || (e[s] = {}), e[s][i] = o
							}))
						})), e
					},
					A = t => {
						const e = [];
						return t[0].forEach(((i, s) => {
							const o = [];
							t.forEach((t => {
								o.push(t[s])
							})), e.push(o)
						})), e
					};
				var x = i(7741);
				const z = (t, e) => {
						let i = [],
							s = e - t.length;
						if (s > 0) {
							const e = t.length;
							for (let o = 0; o < e - 1; o++) {
								const e = parseInt(t[o], 10);
								let n = parseInt(t[o + 1], 10) - e - 1;
								if (i.push(t[o]), n > 0 && s > 0)
									for (n > s && (n = s); n > 0;) n -= 1, s -= 1, i.push(t[o])
							}
							if (i.push(t[e - 1]), s > 0) {
								let e = parseInt(t[0], 10) - 1;
								if (e > 0)
									for (; e > 0;) e -= 1, s -= 1, i.unshift(t[0]);
								if (s > 0)
									for (; s > 0;) s -= 1, i.push(t[t.length - 1])
							}
						} else i = JSON.parse(JSON.stringify(t));
						return i
					},
					C = (t, e) => {
						const i = {},
							s = z(Object.keys(t), e);
						return x.A.$(s).forEach(((e, s) => {
							i[s + 1 + ""] = t[e]
						})), i
					},
					I = t => {
						const e = {},
							i = (t => Math.max(0, ...Object.values(t).map((t => Object.keys(t).length))))(t);
						return Object.values(t).forEach(((t, s) => {
							e[s + 1 + ""] = C(t, i)
						})), e
					};
				var E = i(757);
				const P = (t, e) => t + "." + e,
					N = (t, e) => t % e == 0,
					O = (t, e, i) => {
						let s;
						return s = /^\//.test(i) ? t + i : e + "/" + i, s
					};
				class T extends y.A {
					constructor(t) {
						super(), this.options = t, this._startColumn = 0, this._startRow = 0, this._currentColumn = 0, this._currentRow = 0, this.nextColumn = 0, this.nextRow = 0, this.futureColumn = 0, this.futureRow = 0, this.imgMap = [], this.destroyed = !1, this.images = [], this.isStartedFullInit = !1, this.imageInfoPromise = null, this.loadingMap = {
							queue: []
						}, this.url = this.options.url.replace(/(?:^https?:)?(.*)\/[^/]*$/, "$1"), this.absoluteURL = this.options.url.replace(/(^https?:\/\/[^/]*)., "$1"), this.infoImg = null, this.imageInfoId = "img-" + (0, S.A)(), this.addEvents()
					}
					updateOptions(t) {
						if (this.options.swapSides !== t.swapSides) {
							this.options.swapSides = t.swapSides, this.options.layers = b(this.options.layers), this.imgMap = A(this.imgMap), this.images = A(this.images);
							const e = this._currentRow;
							this._currentRow = this._currentColumn, this._currentColumn = e, this.resetPreparedImage()
						}
						this.options.reverseColumn !== t.reverseColumn && (this.options.reverseColumn = t.reverseColumn, this.imgMap = this.imgMap.map((t => t.reverse())), this.images = this.images.map((t => t.reverse()))), this.options.reverseRow !== t.reverseRow && (this.options.reverseRow = t.reverseRow, this.imgMap.reverse(), this.images.reverse()), this.options.loopColumn = t.loopColumn, this.options.loopRow = t.loopRow, this.options.rowSpeed = t.rowSpeed, this.options.columnSpeed = t.columnSpeed, this.options.quality = t.quality, this.options.hdQuality = t.hdQuality, this.options.isHDQualitySet = t.isHDQualitySet
					}
					createImageInfo() {
						const t = () => {
							const t = Object.keys(this.options.layers)[0],
								e = Object.keys(this.options.layers[t])[0];
							return this.options.layers[t][e]
						};
						return this.infoImg || (this.infoImg = new n((0, E.dc)(O(this.absoluteURL, this.url, t())), {
							imageSettings: this.options.imageSettings,
							infoId: this.imageInfoId,
							round: !0,
							referrerPolicy: this.options.referrerPolicy
						}, null, null), this.infoImg.parentClass = this), this.infoImg
					}
					loadImageInfo() {
						return this.imageInfoPromise || (this.imageInfoPromise = new Promise(((t, e) => {
							this.createImageInfo(), this.infoImg.loadInfo().then((e => {
								this.isStartedFullInit && this.createQueue(), t({
									size: this.infoImg.originSize
								})
							})).catch((t => {
								e({
									error: t
								})
							}))
						}))), this.imageInfoPromise
					}
					startFullInit(t) {
						this.isStartedFullInit || (this.isStartedFullInit = !0, this.options = Object.assign(this.options, t), this.options.layers = I(this.options.layers), this.options.swapSides && (this.options.layers = b(this.options.layers)), this.imgMap = Object.values(this.options.layers).filter(((t, e) => N(e, this.options.rowIncrement))).map((t => Object.values(t).filter(((t, e) => N(e, this.options.columnIncrement))).map((t => (0, E.dc)(O(this.absoluteURL, this.url, t)))))), this.options.reverseColumn && (this.imgMap = this.imgMap.map((t => t.reverse()))), this.options.reverseRow && this.imgMap.reverse(), this.createImages(this.imgMap), this.setFirstImage(), this.imageInfoPromise && this.infoImg.loadInfo().then((t => {
							this.loadingMap.queue.length || this.createQueue()
						})).catch((t => {})))
					}
					setImageSettings(t) {
						return void 0 === t && (t = {}), t.imageSettings || (t.imageSettings = {}), t.imageSettings.scale || (t.imageSettings.scale = {}), t.callbackData || (t.callbackData = {}), t.imageSettings.scale.option = "fill", t.srcset || (t.srcset = {}), null !== this.options.quality && (t.src || (t.src = {}), t.src.quality = this.options.quality), t.dppx >= 1.5 ? t.srcset.quality = this.options.hdQuality : null !== this.options.quality && (t.srcset.quality = this.options.quality), t
					}
					getImage(t, e) {
						return null == t ? this.images[this._currentRow][this._currentColumn] : this.images[t][e]
					}
					getThumbnail(t) {
						return this.getImage(this._startRow, this._startColumn).getThumbnail(t)
					}
					get map() {
						return this.imgMap.map((t => t.map((t => !1))))
					}
					addEvents() {
						let t = !1,
							e = !1,
							i = !1;
						const s = s => {
							t && e && i || s.lens || (t || s.col !== this._currentColumn || s.row !== this._currentRow || (t = !0, this.emit("mapFirstImageLoaded", {
								data: s
							})), !e && this.loadingMap.checkImageQueue(s.row, s.col, 0) && (e = !0, this.emit("mapImagesReady")), this.destroyed || i || !this.loadingMap.checkImageQueue(s.row, s.col, 1) || (i = !0), t && e && i && this.emit("mapAllImagesLoaded"))
						};
						this.on("imageOnload", (t => {
							t.stopAll();
							const e = Object.assign({
								isCurrent: this.isCurrent(t.data)
							}, t.data);
							this.emit("mapImageLoaded", {
								data: e
							}), s(e)
						})), this.on("imageOnerror", (t => {
							t.stopAll(), t.data.error = !0, this.emit("mapImageLoaded", {
								data: t.data
							}), s(t.data)
						}))
					}
					getHintType() {
						const t = this.rowCount,
							e = this.frameCount;
						return t > 1 && e > 1 ? "bidir" : t > 1 ? "col" : "row"
					}
					isLoaded(t) {
						const e = this.getImage();
						return t = this.setImageSettings(t), e.isLoaded(t)
					}
					isExist(t) {
						const e = this.getImage();
						return t = this.setImageSettings(t), e.isExist(t)
					}
					isCurrent(t) {
						return t.row === this._currentRow && t.col === this._currentColumn
					}
					get imageCount() {
						return this.frameCount * this.rowCount
					}
					get frameCount() {
						return this.images[0].length
					}
					get rowCount() {
						return this.images.length
					}
					pixelPerFrame(t) {
						let e = t;
						const i = this.frameCount;
						return i > 1 ? (this.options.loopColumn || (e /= 2), e /= i) : e /= this.rowCount, e /= Math.pow(this.options.columnSpeed / 50, 2), e
					}
					pixelPerRow(t) {
						let e = t;
						const i = this.rowCount;
						return i > 1 ? (this.options.loopRow || (e /= 2), e /= i) : e /= this.frameCount, e /= Math.pow(this.options.rowSpeed / 50, 2), e
					}
					createImages(t) {
						for (let e = 0, i = t.length; e < i; e++) {
							const i = [];
							for (let s = 0, o = t[e].length; s < o; s++) {
								const o = new n((0, E.z_)(t[e][s]), {
									imageSettings: this.options.imageSettings,
									infoId: this.imageInfoId,
									round: !0,
									referrerPolicy: this.options.referrerPolicy
								}, s, e);
								o.parentClass = this, i.push(o)
							}
							this.images.push(i)
						}
					}
					setFirstImage() {
						let t = this.options.startRow,
							e = this.options.startColumn;
						t > this.images.length && (t = 1), e > this.images[0].length && (e = 1), this.options.reverseRow && (t = this.images.length + 1 - t), this.options.reverseColumn && (e = this.images[0].length + 1 - e), this._currentRow = t - 1, this._currentColumn = e - 1, this._currentRow > this.images.length - 1 && (this._currentRow = 0), this._currentColumn > this.images[0].length - 1 && (this._currentColumn = 0), this._startColumn = this.futureColumn = this.nextColumn = this._currentColumn, this._startRow = this.futureRow = this.nextRow = this._currentRow
					}
					loadImage(t, e, i) {
						const s = this.getImage(e, i);
						t = this.setImageSettings(t), s.getImage(t)
					}
					loadFirstImage(t) {
						if (!this.loadingMap.queue.length) return;
						const e = this.loadingMap.queue[0].shift();
						this.loadImage(t, e[0], e[1])
					}
					loadPrimaryImages(t) {
						this.loadingMap.queue.length && this.loadingMap.queue[0].forEach((e => {
							this.loadImage(t, e[0], e[1])
						}))
					}
					loadSecondaryImages(t) {
						!this.destroyed && this.loadingMap.queue.length && (t = this.setImageSettings(t), this.loadingMap.queue[1].forEach((e => {
							this.loadImage(t, e[0], e[1])
						})))
					}
					loadImages(t) {
						this.destroyed || (t = this.setImageSettings(t), this.options.swapSides ? this.images.forEach((e => {
							const i = e[this._currentColumn];
							i.isExist(t) ? i.sendLoad(t) : i.getImage(t)
						})) : this.images.forEach((e => {
							e.forEach((e => {
								e.isExist(t) ? e.sendLoad(t) : e.getImage(t)
							}))
						})))
					}
					isImagesExist(t) {
						return t = this.setImageSettings(t), !this.images.some((e => e.some((e => !e.isExist(t)))))
					}
					createQueue() {
						let t;
						switch (this.options.loadingSchema) {
							case "momentum":
								t = "fastLine";
								break;
							case "full":
							default:
								t = "all";
								break;
							case "row":
							case "spin":
								t = "line";
								break;
							case "sphere":
							case "intro":
							case "twitch":
								t = "sphere"
						}
						this.loadingMap.queue = f[t]({
							swapSides: this.options.swapSides,
							images: this.images,
							startRow: this._currentRow,
							startCol: this._currentColumn
						}), this.loadingMap.checkImageQueue = (() => {
							const t = t => this.loadingMap.queue[t].map((t => P(t[0], t[1]))),
								e = t(0),
								i = t(1);
							return e.shift(), (t, s, o) => {
								const n = o ? i : e;
								if (n.length) {
									const e = n.indexOf(P(t, s));
									e >= 0 && n.splice(e, 1)
								}
								return 0 === n.length
							}
						})()
					}
					prepareFutureImage(t, e) {
						let i;
						void 0 === e && (e = 1), ["next", "prev"].includes(t) ? (i = this.futureColumn + ("next" === t ? 1 : -1) * e, this.futureColumn = g.lib.getRightIndex(i, this.frameCount, this.options.loopColumn)) : (i = this.futureRow + ("down" === t ? 1 : -1) * e, this.futureRow = g.lib.getRightIndex(i, this.rowCount, this.options.loopRow))
					}
					setPreparedNextImage() {
						this.futureColumn = this._currentColumn = this.nextColumn, this.futureRow = this._currentRow = this.nextRow, this.emit("frameChange", {
							data: {
								column: this._currentColumn,
								row: this._currentRow
							}
						})
					}
					setPreparedFutureImage() {
						const t = this.getImage(this.futureRow, this.futureColumn);
						t && t.ready && (this._currentColumn = this.futureColumn, this._currentRow = this.futureRow, this.emit("frameChange", {
							data: {
								column: this._currentColumn,
								row: this._currentRow
							}
						}))
					}
					resetPreparedImage() {
						this.futureColumn = this.nextColumn = this._currentColumn, this.futureRow = this.nextRow = this._currentRow
					}
					getCurrentImage(t) {
						return t = this.setImageSettings(t), this.getImage(this._currentRow, this._currentColumn).getImage(t)
					}
					get originImageUrl() {
						return this.getImage(this._currentRow, this._currentColumn).originUrl
					}
					jump(t, e, i) {
						let s, o;
						const n = (t, e) => !!this.getImage(t, e).ready && (this.nextRow = t, this.nextColumn = o, this.setPreparedNextImage(), !0);
						switch (t) {
							case "row":
								return s = w(this._currentRow, e, i, this.rowCount, this.options.loopRow), o = this._currentColumn, n(s, o);
							case "col":
								return o = w(this._currentColumn, e, i, this.frameCount, this.options.loopColumn), s = this._currentRow, n(s, o)
						}
						return !1
					}
					setNextAnimationFrame(t) {
						const e = this._imagesBuffer[t],
							i = this.getImage(e.row, e.col);
						i && i.ready && (this.nextColumn = e.col, this.nextRow = e.row)
					}
					getNextBufferIndex(t) {
						const e = t => {
							const e = this.getImage(t.row, t.col);
							return e && e.ready
						};
						let i, s = 0;
						const o = this._imagesBuffer.length;
						do {
							s += 1, (t += 1) >= o ? s = 0 : i = this._imagesBuffer[t]
						} while (s > 0 && (!i || !e(i)));
						return s
					}
					createAnimation(t, e) {
						let i = !1,
							s = 0,
							o = 0,
							n = !1;
						switch (t) {
							case "as-row":
								t = "sphere", i = !0, n = !0;
								break;
							case "as-sphere":
							case "as-helix":
								t = "sphere", n = !0;
								break;
							case "as-full":
								t = "full", n = !0;
								break;
							case "intro":
								t = "intro", i = !0;
								break;
							case "twitch":
								t = "twitch";
								break;
							case "spin":
							case "momentum":
								t = "sphere", i = !0;
								break;
							case "sphere":
								t = "sphere";
								break;
							default:
								s = t.cols, o = t.rows, t = "custom"
						}
						return this._imagesBuffer = g[t]({
							firstLineOnly: i,
							swapSides: this.options.swapSides,
							isBackward: e,
							count: t,
							additionalFrame: n,
							row: {
								length: this.rowCount,
								loop: this.options.loopRow,
								current: this._currentRow,
								jumpCount: o
							},
							column: {
								length: this.frameCount,
								loop: this.options.loopColumn,
								current: this._currentColumn,
								jumpCount: s
							}
						}), this._imagesBuffer.length
					}
					clearFramesQueue() {
						this._imagesBuffer = []
					}
					cancelLoadingImage(t) {
						const e = this.getImage();
						e && (t = this.setImageSettings(t), e.cancelLoadingImage(t))
					}
					get startRow() {
						return this._startRow
					}
					get startColumn() {
						return this._startColumn
					}
					get currentRow() {
						return this._currentRow
					}
					get currentColumn() {
						return this._currentColumn
					}
					get imagesBuffer() {
						return this._imagesBuffer
					}
					destroy(t) {
						this.destroyed = !0, this.resetPreparedImage(), this.clearFramesQueue(), this.images.forEach((t => {
							t.forEach((t => {
								t.destroy()
							}))
						})), this.off("imageOnload"), this.off("imageOnerror"), this.loadingMap = {
							queue: []
						}, this.imgMap = [], this.images = [], this._currentColumn = 0, this._currentRow = 0, super.destroy()
					}
				}
				const D = T
			},
			3192: (t, e, i) => {
				i.d(e, {
					Ay: () => s
				});
				const s = {
					swapSides: {
						type: "boolean",
						default: !1
					},
					wheel: {
						type: "boolean",
						default: !1
					},
					initialize: {
						type: "string",
						enum: ["load", "hover", "click", "tap"],
						default: "load"
					},
					freeDrag: {
						type: "boolean",
						default: !1
					},
					tappingFirst: {
						type: "boolean",
						default: !1
					},
					speed: {
						type: "number",
						minimum: 0,
						default: 0
					},
					thumbnail: {
						type: {
							type: "string",
							enum: ["image", "gif"],
							default: "image"
						},
						gifParams: {
							type: "string",
							default: ""
						}
					},
					zoom: {
						enable: {
							type: "boolean",
							default: !0
						},
						ratio: {
							oneOf: [{
								type: "number",
								minimum: 0
							}, {
								type: "string",
								enum: ["max"]
							}],
							default: 2.5
						},
						tiles: {
							type: "boolean",
							default: !1
						},
						pan: {
							type: "boolean",
							default: !0
						}
					},
					inactivity: {
						type: "number",
						minimum: 1e3,
						default: 3e3
					},
					autospin: {
						enable: {
							type: "boolean",
							default: !1
						},
						type: {
							type: "string",
							enum: ["row", "sphere", "full", "helix"],
							default: "sphere"
						},
						resume: {
							type: "number",
							minimum: 0,
							default: 3e3
						},
						duration: {
							type: "number",
							minimum: 0,
							default: 3600
						}
					},
					hint: {
						message: {
							enable: {
								type: "boolean",
								default: !0
							},
							text: {
								type: "string",
								default: "Drag to spin"
							}
						},
						onStart: {
							enable: {
								type: "boolean",
								default: !0
							},
							effect: {
								oneOf: [{
									type: "string",
									enum: ["intro", "twitch", "spin", "momentum", "sphere", "none"]
								}, {
									type: "boolean",
									enum: [!1]
								}],
								default: "intro"
							}
						},
						onVisible: {
							enable: {
								type: "boolean",
								default: !0
							},
							effect: {
								oneOf: [{
									type: "string",
									enum: ["intro", "twitch", "spin", "momentum", "sphere", "none"]
								}, {
									type: "boolean",
									enum: [!1]
								}],
								default: "twitch"
							}
						},
						onInactive: {
							enable: {
								type: "boolean",
								default: !0
							},
							effect: {
								oneOf: [{
									type: "string",
									enum: ["intro", "twitch", "spin", "momentum", "sphere", "none"]
								}, {
									type: "boolean",
									enum: [!1]
								}],
								default: "twitch"
							}
						}
					},
					row: {
						start: {
							type: "number",
							minimum: 1,
							default: 1
						},
						loop: {
							type: "boolean",
							default: !1
						},
						increment: {
							type: "number",
							minimum: 1,
							default: 1
						},
						reverse: {
							type: "boolean",
							default: !1
						},
						sensitivity: {
							type: "number",
							minimum: 1,
							maximum: 100,
							default: 50
						}
					},
					column: {
						start: {
							type: "number",
							minimum: 1,
							default: 1
						},
						loop: {
							type: "boolean",
							default: !0
						},
						increment: {
							type: "number",
							minimum: 1,
							default: 1
						},
						reverse: {
							type: "boolean",
							default: !1
						},
						sensitivity: {
							type: "number",
							minimum: 1,
							maximum: 100,
							default: 50
						}
					}
				}
			},
			5578: (t, e, i) => {
				i.r(e), i.d(e, {
					default: () => P
				});
				var s = i(7290),
					o = i(8479),
					n = i(2084),
					a = i(7064),
					h = i(1298),
					r = i(538),
					l = i(511),
					d = i(757),
					c = i(7741),
					p = i(5654),
					u = i(4255);
				d.ms.addCssModule("Video", '.smv-sirv-video .js-focus-visible .vjs-menu li.vjs-menu-item:hover,.smv-sirv-video .js-focus-visible .vjs-menu li.vjs-selected:hover,.smv-sirv-video .vjs-menu li.vjs-menu-item:focus,.smv-sirv-video .vjs-menu li.vjs-menu-item:hover,.smv-sirv-video .vjs-menu li.vjs-selected,.smv-sirv-video .vjs-menu li.vjs-selected:focus,.smv-sirv-video .vjs-menu li.vjs-selected:hover{background-color:initial;color:inherit}.smv-sirv-video .vjs-playback-rate .vjs-playback-rate-value{font-size:1.2em;line-height:2.5em;pointer-events:none}.smv-sirv-video.video-js .vjs-big-play-button,.smv-sirv-video.video-js .vjs-control-bar,.smv-sirv-video.video-js .vjs-menu-button .vjs-menu-content,.smv-sirv-video.video-js .vjs-volume-vertical{background-color:#373a3ccc}.smv-sirv-video{height:100%!important;left:0;position:relative;top:0;width:100%!important}.smv-sirv-video video{display:block!important}.smv-sirv-video:not(.vjs-has-started,.vjs-using-native-controls) .vjs-poster{display:inline-block!important}.smv-sirv-video :focus{outline:none}.smv-sirv-video .vjs-poster{background-color:initial}.smv-sirv-video .vjs-button{appearance:none;background:0 0;border:0!important;color:inherit;display:inline-block;font-size:inherit;line-height:inherit;text-decoration:none;text-transform:none;transition:none}.smv-sirv-video .vjs-big-play-button{border:.04em solid #0000;border-radius:1em;box-shadow:none;color:inherit!important;font-size:5em;height:1.2em;left:50%;letter-spacing:0!important;line-height:1.2em;margin-left:-.6em;margin-top:-.6em;min-height:auto!important;min-width:auto!important;top:50%;width:1.2em}.smv-sirv-video .vjs-big-play-button .vjs-icon-placeholder{display:block!important}.smv-sirv-video:hover .vjs-big-play-button{border-color:#0000}.smv-sirv-video.vjs-controls-disabled .vjs-big-play-button,.smv-sirv-video.vjs-has-started .vjs-big-play-button{display:block;transition:opacity .25s}.smv-sirv-video.vjs-has-started.vjs-playing .vjs-big-play-button{opacity:0;pointer-events:none}.smv-sirv-video.vjs-has-started.vjs-paused .vjs-big-play-button{opacity:1}.smv-sirv-video.video-js{background-color:initial;color:#fff;display:block;font-size:10px}.smv-sirv-video.video-js:not(.vjs-has-started) .vjs-tech{opacity:.001}.smv-sirv-video.video-js .vjs-control-bar :last-child .vjs-menu{left:100%;transform:translateX(-100%)}.smv-sirv-video.video-js .vjs-control-bar .vjs-icon-placeholder{display:inline-block!important}.smv-sirv-video.video-js .vjs-control-bar .vjs-control{box-shadow:none;color:inherit!important}.smv-sirv-video.video-js .vjs-control-bar .vjs-control .vjs-icon-placeholder{font-family:VideoJS;font-style:normal;font-weight:400;line-height:1}.smv-sirv-video.video-js.vjs-has-started .vjs-control-bar{transition:visibility .2s,opacity .2s}.smv-sirv-video.video-js .vjs-menu-button{padding:0}.smv-sirv-video.video-js .vjs-slider{background-color:#fff3}.smv-sirv-video.video-js .vjs-progress-control .vjs-progress-holder{font-size:1.6666666667em;transform:scaleY(.6);transition:transform .1s cubic-bezier(.4,0,1,1)}.smv-sirv-video.video-js .vjs-progress-control .vjs-play-progress:before{transform:scale(0);transition:transform .1s cubic-bezier(.4,0,1,1)}.smv-sirv-video.video-js .vjs-progress-control:hover .vjs-play-progress:before,.smv-sirv-video.video-js .vjs-progress-control:hover .vjs-progress-holder{transform:none}.smv-sirv-video.video-js .vjs-load-progress{background-color:initial}.smv-sirv-video.video-js .vjs-load-progress div{background:#fff6}.smv-sirv-video.video-js .vjs-menu{left:50%;transform:translateX(-50%);width:8em}.smv-sirv-video.video-js .vjs-menu .vjs-menu-item{font-size:1.2em;padding:.6em .6em .3em;text-align:left;text-transform:none}.smv-sirv-video.video-js .vjs-menu .vjs-menu-item~.vjs-menu-item{padding-top:.3em}.smv-sirv-video.video-js .vjs-menu .vjs-menu-item:before{content:"\\f111";font-family:VideoJS;font-size:.66em;opacity:0;padding:0 1em}.smv-sirv-video.video-js .vjs-menu .vjs-menu-item.vjs-selected:before{opacity:1}.smv-sirv-video.video-js .vjs-volume-panel .vjs-volume-control.vjs-volume-vertical{transition:visibility .1s,opacity .1s,height .1s,width .1s,left 0s,top 0s}:root:not(.mobile-magic) .smv-sirv-video.video-js.vjs-has-started:not(:hover) .vjs-control-bar{opacity:0}.smv-disabled-action .vjs-poster,.smv-disabled-action .vjs-tech{pointer-events:none!important}.sirv-video.smv-controls-right .vjs-control-bar{justify-content:flex-end}');
				const m = "v3.18.6-9ec11ec8".replace(/^v/, ""),
					g = l.Mu + "-disabled-action",
					v = l.Mu + "-controls-right",
					f = 50 * c.A.DPPX,
					y = 0,
					S = 1,
					w = 2,
					b = 4,
					A = 5,
					x = 6,
					z = {
						"3gp": "video/3gpp",
						flv: "video/flv",
						mp4: "video/mp4",
						ogv: "video/ogg",
						webm: "video/webm"
					},
					C = ["playToggle", "currentTimeDisplay", "timeDivider", "durationDisplay", "progressControl", "remainingTimeDisplay", "volumePanel", "customControlSpacer", "playbackRateMenuButton", "fullscreenToggle"],
					I = t => l.bH + "vjs/sirv.videojs." + t + "?v=" + m;
				class E extends r.A {
					constructor(t, e) {
						super(t, e, s.A), this.type = l.mo.VIDEO, this.info = null, this.HLS = [], this.currentSize = {
							width: 0,
							height: 0
						}, this.videoNode = null, this.sourcesAdded = !1, this.player = null, this.thumbnail = this.option("thumbnail"), this.currentTime = 0, this.isVideoPaused = !1, this.fps = 30, this.pluginResizeDebounce = null, this.playPromise = null, this.posterSize = null, this.lastAction = y, this.isPlayed = !1, this.isEnded = !1, this.seoElement = null, this.playingState = l.G_.NONE, this.url = this.baseUrl, this.queryParams && (this.url += "?" + this.queryParams), this.ariaLabelId = this.id, this.disableAction(), this.isLoadeddata = !1, this.controlsFullscreen = this.option("controls.fullscreen"), this.api = Object.assign(this.api, {
							setCurrentTime: t => this.setCurrentTime(t),
							getCurrentTime: () => this.getCurrentTime()
						}), this.getInfo()
					}
					normalizeOptions() {
						const t = this.option("quality.min");
						t > this.option("quality.max") && this.option("quality.max", t), this.option("background") && (this.option("controls.enable", !1), this.option("autoplay", !0), this.option("loop", !0), this.option("volume", 0), this.option("controls.playButton", !1))
					}
					hidePlaybar() {
						this.player.controlBar.playToggle.hide(), this.player.controlBar.remainingTimeDisplay.hide(), this.player.controlBar.progressControl.hide(), this.instanceNode.addClass(v)
					}
					showPlaybar() {
						this.player.controlBar.playToggle.show(), this.player.controlBar.remainingTimeDisplay.show(), this.player.controlBar.progressControl.show(), this.instanceNode.removeClass(v)
					}
					updateOptions(t) {
						if (this.isVideoPaused = this.playingState === l.G_.PAUSE, (0, p.A)(this._options, t)) return;
						this._options = t;
						const e = this.option("thumbnail"),
							i = this.option("quality.min"),
							s = this.option("quality.max");
						if (super.updateOptions(t), this.normalizeOptions(), this.player)
							if (this.player.autoplay(this.option("autoplay")), this.option("autoplay") ? this.play() : this.option("autoplay") || this.pause(), this.player.loop(this.option("loop")), this.player.volume(this.option("volume") / 100), this.player.muted(this.option("autoplay")), this.option("controls.playButton") ? this.showBigPlayButton() : this.hideBigPlayButton(), this.player.controls(!this.option("background")), e !== this.option("thumbnail") && (this.thumbnail = this.option("thumbnail"), this.player.poster(this.posterUrl), this.emit("reloadThumbnail")), this.option("seo") ? this.seoElement || this.createSEO() : this.seoElement && (this.seoElement.remove(), this.seoElement = null), !this.isHLS() || i === this.option("quality.min") && s === this.option("quality.max") || (this.player.hlsQualitySelectorAutoMode.setMinMaxQuality({
									min: this.option("quality.min"),
									max: this.option("quality.max")
								}), this.player.hlsQualitySelectorAutoMode.onAddQualityLevel()), this.option("controls.enable")) {
								this.showControlBar();
								const t = this.player.controlBar;
								var o, n, a;
								this.option("controls.volume") ? (t.volumePanel || (t.volumePanel = t.addChild("volumePanel", {
									inline: !1
								}, C.findIndex((t => "volumePanel" === t)))), t.volumePanel.show()) : null == (o = t.volumePanel) || o.hide(), this.option("controls.speed") ? (t.playbackRateMenuButton || (t.playbackRateMenuButton = t.addChild("playbackRateMenuButton", {
									playbackRateMenuButton: !0
								}, C.findIndex((t => "playbackRateMenuButton" === t)))), t.playbackRateMenuButton.show()) : null == (n = t.playbackRateMenuButton) || n.hide(), this.option("controls.quality") && this.isHLS() ? (t.qualitySelectorMenuButton.setVisibility(!0), this.player.hlsQualitySelectorAutoMode.setVisibility(!0), t.qualitySelectorMenuButton.show()) : null == (a = t.qualitySelectorMenuButton) || a.hide(), this.option("controls.fullscreen") ? t.fullscreenToggle.show() : t.fullscreenToggle.hide(), this.option("controls.playbar") ? this.showPlaybar() : this.hidePlaybar()
							} else this.hideControlBar()
					}
					getSelectorImgUrl(t) {
						return new Promise(((e, i) => {
							const s = t.width || t.height;
							let o = this.baseUrl + "?thumbnail=" + s;
							c.A.DPPX > 1 && (o = this.baseUrl + "?thumbnail=" + s * c.A.DPPX + "&quality=60"), this.thumbnail && (o = isNaN(parseFloat(this.thumbnail)) ? this.thumbnail : this.getThumbnailPoster(o));
							const n = {
								src: o,
								callbackData: t.callbackData
							};
							c.A.DPPX > 1 && (n.srcset = o), this.alt && (n.alt = this.alt), this.getInfo().then((() => {
								e(n)
							})).catch(i)
						}))
					}
					disableAction() {
						this.always && [l.a0.CLOSED, l.a0.CLOSING].includes(this.fullscreenState) && this.instanceNode.addClass(g)
					}
					enableAction() {
						this.always && this.instanceNode.removeClass(g)
					}
					getInfo() {
						return this.gettingInfoPromise || (this.gettingInfoPromise = new Promise(((t, e) => {
							this.waitGettingInfo.wait((() => {
								const i = c.A.getHashCode(this.baseUrl.replace(/^http(s)?:\/\//, "")),
									s = this.baseUrl + (/\?/.test(this.baseUrl) ? "&" : "?") + "info=sirv_video_info_" + i + "_main";
								(0, a.A)(s, "video_info_" + (0, n.A)(), this.referrerPolicy).then((e => {
									var i, s;
									this.destroyed || (this.info = e, null != (i = this.info.QuickTime) && i.VideoFrameRate && (this.fps = this.info.QuickTime.VideoFrameRate), this.HLS = this.info.original.HLS || [], this.HLS.sort(((t, e) => t.width - e.width || t.height - e.height)), this.dataDescription || (this.dataDescription = null == (s = this.info.original) ? void 0 : s.description), this.infoSize = {
										width: this.info.original.width,
										height: this.info.original.height
									}, this.option("seo") && this.createSEO(), t(this.infoSize))
								})).catch((t => {
									this.destroyed || e(t)
								}))
							}))
						}))), this.gettingInfoPromise
					}
					createSEO() {
						const t = {
							"@type": "VideoObject",
							"@context": "http://schema.org/",
							"@id": this.url,
							name: this.instanceNode.attr("data-title") || this.info.original.title,
							description: this.dataDescription,
							thumbnailUrl: this.baseUrl + "?thumbnail=" + (this.isHLS() ? this.HLS[this.HLS.length - 1].width : this.info.width || this.info.original.width),
							contentUrl: this.url,
							uploadDate: this.info.original.ctime
						};
						this.info.original.duration && (t.duration = (t => {
							t = Math.floor(t);
							const e = Math.floor(t / 3600),
								i = Math.floor(t % 3600 / 60),
								s = Math.floor(t % 3600 % 60);
							let o = "PT";
							return e > 0 && (o += e + "H"), i > 0 && (o += i + "M"), s > 0 && (o += s + "S"), "PT" === o && (o += "0S"), o
						})(this.info.original.duration)), this.seoElement = c.A.$new("script").attr("type", "application/ld+json"), this.seoElement.node.textContent = JSON.stringify(t), this.seoElement.appendTo(document.head)
					}
					getInfoSize() {
						return new Promise(((t, e) => {
							this.getInfo().then((() => {
								t({
									size: this.infoSize
								})
							})).catch((t => {
								e({
									error: t
								})
							}))
						}))
					}
					addSources() {
						Promise.all([d.ms.addStyle(this.instanceNode, I("css")), d.ms.addJavaScript(document, I("js"))]).finally((() => {
							this.sourcesAdded = !0, this.isStarted && this.isInView && (this.preload || this.isSlideShown) && this.createVideoNode()
						}))
					}
					onStartActions(t) {
						this.ready ? this.player && this.isInView && (this.fullscreenState === l.a0.OPENED && this.always && (this.option("controls.playButton") && this.showBigPlayButton(), this.option("controls.enable") && this.showControlBar()), !this.isInView || !this.option("autoplay") || this.isEnded && !this.option("loop") || !this.player.paused() || this.lastAction !== x && this.lastAction !== y || (this.player.muted(!0), this.isPlayed ? this.lastAction = b : t === l.eO.USER && (this.lastAction = S), this.play())) : this.isStarted && this.isInView && this.isSlideShown && !this.preload && this.sourcesAdded && this.createVideoNode()
					}
					onStopActions() {
						this.player && !this.player.paused() && this.playingState === l.G_.PLAYING && (this.lastAction = x, this.pause())
					}
					onInView(t) {
						t ? this.ready ? this.player && this.isSlideShown && t && (!this.option("autoplay") || this.isEnded && !this.option("loop") || !this.player.paused() || this.isVideoPaused || (this.lastAction = w, this.play())) : this.isStarted && !this.isInView && (this.preload || this.isSlideShown) && this.sourcesAdded && (this.isInView = !0, this.calcContainerSize(), this.createVideoNode()) : this.player && (this.isVideoPaused = this.playingState === l.G_.PAUSE, this.player.paused() || this.playingState !== l.G_.PLAYING || (this.lastAction = A, this.pause()))
					}
					startFullInit(t, e) {
						this.isStartedFullInit || (super.startFullInit(t, e), this.normalizeOptions(), this.thumbnail = this.option("thumbnail"), this.instanceNode.addClass("sirv-video").addEvent("mousedown", (t => {
							t.stop()
						})))
					}
					canFullscreen() {
						return !1
					}
					onBeforeFullscreenIn(t) {
						this.controlsFullscreen = !1, this.player && (this.isVideoPaused = this.playingState === l.G_.PAUSE, this.toggleFullscreenButton())
					}
					onAfterFullscreenIn(t) {
						this.enableAction(), this.isSlideShown && this.isInView && this.player && this.player.paused() && (this.always && (this.option("controls.playButton") && this.showBigPlayButton(), this.option("controls.enable") && this.showControlBar()), !this.option("autoplay") || this.isEnded && !this.option("loop") || this.lastAction !== x || (this.player.currentTime(this.currentTime), this.playingState = l.G_.PLAY, this.player.play_()))
					}
					onBeforeFullscreenOut(t) {
						this.disableAction(), this.controlsFullscreen = this.option("controls.fullscreen"), this.player && (this.isVideoPaused = this.playingState === l.G_.PAUSE, this.toggleFullscreenButton())
					}
					onAfterFullscreenOut(t) {
						this.isSlideShown && this.isInView && this.player && (this.always && (this.hideControlBar(), this.hideBigPlayButton()), !this.option("autoplay") || this.isEnded && !this.option("loop") || this.lastAction !== x || (this.lastAction = S, this.play()))
					}
					onSecondSelectorClick() {
						this.player && this.isSlideShown && this.isInView && (this.fullscreenState === l.a0.OPENED || !this.always) && (this.player.paused() ? (this.lastAction = S, this.play()) : this.playingState === l.G_.PLAYING && this.isLoadeddata && this.pause())
					}
					createVideoNode() {
						this.videoNode || (this.videoNode = c.A.$new("video").addClass([l.Mu + "-sirv-video", "video-js"]).attr("preload", "none"), this.instanceNode.append(this.videoNode), this.waitToStart.start(), this.done())
					}
					play() {
						this.player && !this.playPromise && (this.playingState = l.G_.PLAY, this.playPromise = this.player.play())
					}
					pause() {
						this.player && (this.playPromise || new Promise((t => t(null)))).finally((() => {
							var t;
							null == (t = this.player) || t.pause(), this.playPromise = null
						}))
					}
					loadContent() {
						this.sourcesAdded && this.createVideoNode()
					}
					run(t, e, i) {
						const s = super.run(t, e, i);
						return s && (this.calcContainerSize(), this.isInView && (this.preload || this.isSlideShown) && this.sourcesAdded && this.createVideoNode(), this.startGettingInfo()), s
					}
					createMasterManifest() {
						const t = ["#EXTM3U"],
							e = this.option("motionFactor"),
							i = this.option("dynamicAdaptiveStreaming");
						return this.HLS.forEach((s => {
							let o = "#EXT-X-STREAM-INF:PROGRAM-ID=1,";
							var n, a, h;
							i && (o += "BANDWIDTH=" + (n = s, a = this.fps, h = e, Math.trunc(n.width * n.height * a * h * .07) + ",")), o += "RESOLUTION=" + s.width + "x" + s.height, t.push(o), t.push(l.jq + encodeURI(s.index))
						})), t.join("\n")
					}
					toggleFullscreenButton() {
						const t = this.player.controlBar.getChild("FullscreenToggle"),
							e = this.player.options_.userActions;
						this.controlsFullscreen ? (e.doubleClick = !0, t.show()) : (e.doubleClick = !1, t.hide())
					}
					isHLS() {
						return this.HLS.length > 0
					}
					getThumbnailSize() {
						const t = this.info.height || this.info.original.height,
							e = this.info.width || this.info.original.width;
						let i = this.currentSize.width * (t / e);
						return i > this.currentSize.height && (i = this.currentSize.height), i *= c.A.DPPX, i > t && (i = t), t > e ? Math.min((0, u.A)(i), t) : Math.min((0, u.A)(i * (e / t)), e)
					}
					get posterUrl() {
						return this.getThumbnailPoster(this.baseUrl + "?thumbnail=" + this.posterSize)
					}
					done() {
						var t, e;
						if (this.ready) return;
						this.calcContainerSize(), this.posterSize = this.getThumbnailSize();
						const i = this.posterUrl,
							s = !1 !== this.option("controls.volume") && {
								inline: !1
							},
							n = {
								nativeTextTracks: !1,
								nativeAudioTracks: !1,
								nativeVideoTracks: !1
							},
							a = this.isHLS(),
							h = {
								overrideNative: a && "safari" !== c.A.browser.uaName,
								bandwidth: 1e3 * (null != (t = null == (e = navigator.connection) ? void 0 : e.downlink) ? t : 6) * 1e3
							};
						n.vhs = h;
						const r = {
							controls: !this.option("background"),
							fluid: !1,
							muted: 0 === this.option("volume") || this.option("autoplay"),
							loop: this.option("loop"),
							preload: this.option("autoplay") || this.option("preload") ? "auto" : "none",
							playbackRates: [.5, 1, 1.5, 2],
							textTrackSettings: !1,
							errorDisplay: !1,
							controlBar: {
								fullscreenToggle: !0,
								volumePanel: s,
								muteToggle: !1,
								playbackRateMenuButton: this.option("controls.speed"),
								children: C
							},
							poster: i,
							playsinline: !0,
							html5: n,
							userActions: {
								doubleClick: !0
							},
							qualityLevels: {}
						};
						if (a) {
							if (this.player = window.videojs(this.videoNode.node, r), "safari" !== c.A.browser.uaName) {
								const t = new TextEncoder,
									e = "application/x-mpegURL",
									i = URL.createObjectURL(new Blob([t.encode(this.createMasterManifest())], {
										type: e
									}));
								this.player.src({
									src: i,
									type: e
								})
							}
							this.player.hlsQualitySelectorAutoMode({
								visibility: this.option("controls.quality"),
								hls: this.HLS,
								host: l.jq,
								max: this.option("quality.max"),
								min: this.option("quality.min"),
								width: this.info.original.width,
								height: this.info.original.height
							}), this.pluginResizeDebounce = (0, o.A)((() => {
								this.player.hlsQualitySelectorAutoMode.recalc()
							}), 600)
						} else {
							r.src = this.url;
							const t = function(t) {
								void 0 === t && (t = "");
								const e = t.split("?")[0].split(".").pop().toLowerCase();
								return z[e] || ""
							}(this.url);
							this.videoNode.append(c.A.$new("source", {
								src: this.url,
								type: t
							})), this.player = window.videojs(this.videoNode.node, r)
						}
						this.player.volume(this.option("volume") / 100), this.toggleFullscreenButton(), this.player.on("loadeddata", (() => {
							a && "safari" !== c.A.browser.uaName && URL.revokeObjectURL(this.player.src()), this.isLoadeddata = !0
						})), this.alt && c.A.$(this.player.posterImage.el_.querySelector("img")).attr("alt", this.alt), this.player.on("play", (() => {
							if (this.isVideoPaused = !1, this.playingState = l.G_.PLAYING, this.isSlideShown && this.isInView) {
								let t = "user";
								this.lastAction === w ? t = "viewport" : this.lastAction === S ? t = "autoplay" : this.lastAction === b && (t = "itemchange"), this.isPlayed ? this.sendEvent("resume", {
									event: {
										reason: t,
										playbackTime: this.player.currentTime()
									}
								}) : (this.isPlayed = !0, this.sendEvent("play", {
									event: {
										reason: t
									}
								}))
							} else this.lastAction = A, this.pause()
						})), this.player.on("pause", (() => {
							if (this.player.currentTime() === this.player.duration()) return;
							this.playingState = l.G_.PAUSE;
							let t = "user";
							this.lastAction === A ? t = "viewport" : this.lastAction === x && (t = "itemchange"), this.lastAction === y && (this.lastAction = A), this.playPromise = null, this.always && this.fullscreenState === l.a0.OPENED && (this.option("controls.playButton") && this.showBigPlayButton(), this.option("controls.enable") && this.showControlBar()), this.sendEvent("pause", {
								event: {
									reason: t,
									playbackTime: this.player.currentTime()
								}
							})
						})), this.player.on("ended", (() => {
							this.isPlayed = !1, this.isEnded = !0, this.playingState = l.G_.PAUSE, this.playPromise = null, this.sendEvent("end")
						})), this.player.on("fullscreenchange", (() => {
							const t = this.player.isFullscreen() ? "fullscreenIn" : "fullscreenOut";
							this.sendEvent(t, {
								event: {
									playbackTime: this.player.currentTime()
								}
							})
						}));
						let d = null,
							p = 0,
							u = 0;
						if (this.player.on("timeupdate", (() => {
								p = u, u = this.player.currentTime()
							})), this.player.on("seeking", (() => {
								null === d && (d = p)
							})), this.player.on("seeked", (() => {
								this.isEnded ? this.isEnded = !1 : this.sendEvent("seek", {
									event: {
										seekStart: d,
										seekEnd: this.player.currentTime()
									}
								}), d = null
							})), this.player.on("error", (t => {
								console.log("error", t), this.player.error(null)
							})), c.A.browser.touchScreen && c.A.browser.mobile && !this.option("background")) {
							let t = !1;
							this.player.on("touchmove", (() => {
								t = !0
							})), this.player.on("touchend", (e => {
								if (t) return void(t = !1);
								const i = !this.option("controls.enable") || this.player.userActive();
								"video" === c.A.$(e.target).tagName && i && (this.player.paused() ? (this.lastAction = S, this.play()) : this.pause())
							}))
						}
						this.player.on("ready", (() => {
							this.option("controls.fullscreen") || this.player.off(this.player.tech_, "dblclick", this.player.handleTechDoubleClick_), this.fullscreenState !== l.a0.OPENED && this.always && (this.hideControlBar(), this.hideBigPlayButton()), this.isSlideShown && this.isInView && this.option("autoplay") && (this.player.muted(!0), this.lastAction = S, this.play(), this.player.muted(!0)), super.done(), this.instanceNode.store("action", (() => {
								this.playingState === l.G_.PLAYING ? this.pause() : this.playingState !== l.G_.PAUSE && this.playingState !== l.G_.NONE || this.play()
							})), this.sendContentLoadedEvent()
						})), this.option("controls.playButton") || this.hideBigPlayButton(), this.option("controls.enable") || this.hideControlBar(), this.option("controls.playbar") || this.hidePlaybar()
					}
					setCurrentTime(t) {
						this.ready && Number.isFinite(t) && this.player.currentTime(t)
					}
					getCurrentTime() {
						return this.ready && (0, h.A)(this.player.currentTime(), 4) || 0
					}
					showBigPlayButton() {
						this.player.bigPlayButton.show()
					}
					hideBigPlayButton() {
						this.player.bigPlayButton.hide()
					}
					showControlBar() {
						this.player.controlBar.show()
					}
					hideControlBar() {
						this.player.controlBar.hide()
					}
					getThumbnailPoster(t) {
						if (void 0 === t && (t = ""), this.thumbnail || 0 === this.thumbnail) {
							const e = "&video.thumbPos=",
								i = parseFloat(this.thumbnail);
							if (!isNaN(i) && i < this.info.original.duration) return t + e + this.thumbnail;
							if (/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i.test(this.thumbnail)) return this.thumbnail
						}
						return t
					}
					calcContainerSize() {
						const t = this.instanceNode.size;
						if (t.height && t.width) this.currentSize = t;
						else {
							const e = {
								width: 0,
								height: 0
							};
							e.width = this.info.original.width, e.height = this.info.original.height, t.height ? (this.currentSize.height = t.height, this.currentSize.width = e.width / e.height * t.height) : (this.currentSize.width = t.width, this.currentSize.height = e.height / e.width * t.width)
						}
					}
					createPinchEvent() {
						super.createPinchEvent(this.instanceNode), this.pinchCloud.onPinchStart = t => {
							[l.a0.OPENING, l.a0.CLOSING].includes(this.fullscreenState) || (this.pinchCloud.pinch = !0, this.pinchCloud.scale = t.scale, this.sendEvent("pinchStart"))
						}, this.pinchCloud.onPinchMove = t => {
							if (this.pinchCloud.pinch && !this.pinchCloud.block) {
								const e = t.scale - this.pinchCloud.scale;
								this.fullscreenState === l.a0.OPENED ? e < -.08 && (this.pinchCloud.block = !0, this.sendEvent("fullscreenOut")) : t.scale >= .11 && (this.pinchCloud.block = !0, this.sendEvent("fullscreenIn"))
							}
						}
					}
					onResize() {
						if (!this.player) return !1;
						if (this.isSlideShown && this.isInView || this.player.paused() || this.playingState !== l.G_.PLAYING || this.pause(), this.pluginResizeDebounce && this.pluginResizeDebounce(), this.playingState === l.G_.NONE) {
							this.calcContainerSize();
							const t = this.getThumbnailSize();
							t > this.posterSize && t - this.posterSize >= f && (this.posterSize = t, this.player.poster(this.posterUrl))
						}
						return !0
					}
					destroy() {
						var t, e, i, s;
						return null == (t = this.seoElement) || t.remove(), this.seoElement = null, null == (e = this.player) || e.dispose(), this.player = null, null == (i = this.videoNode) || i.remove(), this.videoNode = null, null == (s = this.pluginResizeDebounce) || s.cancel(), this.pluginResizeDebounce = null, this.instanceNode.clearEvents(), this.instanceNode.removeClass("sirv-video"), this.instanceNode.removeClass(g), this.playPromise = null, this.HLS = [], super.destroy(), !0
					}
				}
				const P = E
			},
			5597: (t, e, i) => {
				i.a(t, (async(t, s) => {
					try {
						i.d(e, {
							A: () => w
						});
						var o = i(8479),
							n = i(4464),
							a = i(3287),
							h = i(749),
							r = i(7950),
							l = i(7741),
							d = i(757),
							c = i(511),
							p = i(4331),
							u = i(5182),
							m = i(3694),
							g = i(1388),
							v = i(7746),
							f = i(5654);
						let t = null;
						try {
							t = (await Promise.resolve().then((() => {
								if (!i.m[183]) {
									var t = new Error("Module '183' is not available (weak dependency)");
									throw t.code = "MODULE_NOT_FOUND", t
								}
								return i(183)
							}))).default
						} catch (t) {}
						const y = "https://sirv.com/about-image/?utm_source=client&utm_medium=sirvembed&utm_content=typeofembed(image)&utm_campaign=branding";
						class S extends p.A {
							constructor(e, i) {
								super(e, i, {}), this.type = c.mo.IMAGE, this.instanceNode.attr("referrerpolicy", this.referrerPolicy), this.image = null, this.isInfoLoaded = !1, this.getImageInfoPromise = null, this.loadStaticImagePromise = null, this.imageShowPromise = null, this.srcWasSetted = !1, this.lastImageSize = {
									width: 0,
									height: 0
								}, this.imageIndex = i.imageIndex, this.dppx = 1, this.upscale = !1, this.size = {
									width: 0,
									height: 0
								}, this.dontLoad = !0, this.accountInfo = {}, this.attemptsNumber = 1, this.originAlt = this.instanceNode.attr("alt"), this.originTitle = this.instanceNode.attr("title"), this.id && (this.ariaLabelId = this.id), this.src = this.instanceNode.attr("src"), this.srcset = this.instanceNode.attr("srcset"), this.startedSrc = this.src, this.dataSrc = this.instanceNode.attr("data-src"), this.isStaticImage = this.src && !this.dataSrc, this.imageUrl = this.dataSrc || this.src, this.getImageTimer = (0, o.A)((() => {
									this.getImage()
								}), 32), this.firstSlideAhead = !1, this.src = (0, d.dc)(this.imageUrl.replace(c.Cu, "$1")), this.queryParamsQuality = null, this.queryParams = (0, h.A)(this.imageUrl.replace(c.Cu, "$2")), this.getQueryParams(), this.isNotSirv = (0, n.A)(this.imageUrl), this.createHotspotsClass(t), this.createSirvImage()
							}
							updateOptions(t) {
								const e = (0, v.A)({}, this._options, t);
								if ((0, f.A)(this._options, e)) return;
								this._options = e;
								const i = this.quality,
									s = this.hdQuality;
								super.updateOptions(), i === this.quality && s !== this.hdQuality || (this.getImage(), this.emit("reloadThumbnail"))
							}
							sendEvent(t, e) {
								e || (e = {}), e.imageIndex = this.imageIndex, super.sendEvent(t, e)
							}
							getInfo() {
								return this.gettingInfoPromise || (this.gettingInfoPromise = new Promise(((t, e) => {
									this.waitGettingInfo.wait((() => {
										this.image.loadInfo().then((e => {
											this.destroyed || (this.isInfoLoaded = !0, this.dataDescription || (this.dataDescription = this.image.description), this.infoSize = this.image.originSize, this.accountInfo = this.image.accountInfo, e.hotspots && (this.hotspotsData = this.hotspotsData.concat(e.hotspots)), this.hotspots && (this.hotspots.originImageSize = this.infoSize), t())
										})).catch((t => {
											this.destroyed || (this.isInfoLoaded = !0, t.status && 404 === t.status || (this.isNotSirv = !0), e(t))
										}))
									}))
								}))), this.gettingInfoPromise
							}
							getQueryParams() {
								if (this.imageUrl) {
									if (this.queryParams) {
										const t = parseInt(this.queryParams.quality, 10);
										isNaN(t) ? delete this.queryParams.quality : this.queryParams.quality = t
									}
									this.queryParamsQuality = this.queryParams.quality || null
								}
							}
							getImageCreateSettings() {
								let t = {
									src: {},
									srcset: {}
								};
								null !== this.quality && null === this.queryParamsQuality && (t.src.quality = this.quality);
								const e = this.hdQuality;
								return (null === this.queryParamsQuality || this.isHDQualitySet && e < this.queryParamsQuality) && (t.srcset = {
									quality: e
								}), t.width = this.size.width, this.size.height && (t.height = this.size.height), t = (0, g.A)(t, this.infoSize), this.infoSize.width !== t.width && this.infoSize.height !== t.height || (t.round = !1), l.A.DPPX > 1 && (t.dppx = this.dppx), t
							}
							setHDQuality(t) {
								return t.dppx > 1 && t.dppx < 1.5 && (null === this.queryParamsQuality && null !== this.quality ? t.srcset.quality = this.quality : t.srcset && delete t.srcset.quality), t
							}
							replaceSrc() {
								let t;
								if (this.isNotSirv) {
									if (this.srcWasSetted) return;
									this.srcWasSetted = !0, t = {
										src: this.imageUrl
									}
								} else {
									let e = this.getImageCreateSettings();
									e.dppx > 1 && e.dppx < 1.5 && delete e.srcset.quality, e = this.setHDQuality(e), t = this.image.getImage(e), this.lastImageSize.width = t.width || t.serverWidth, this.lastImageSize.height = t.height || t.serverHeight
								}
								t.srcset ? !this.isNotSirv && this.dppx > 1 && this.instanceNode.attr("srcset", t.srcset + " " + this.dppx + "x") : this.instanceNode.removeAttr("srcset"), this.instanceNode.attr("src", t.src)
							}
							showImage() {
								return this.imageShowPromise || (this.imageShowPromise = new Promise(((t, e) => {
									this.isStaticImage ? (this.instanceNode.setCssProp("opacity", ""), t()) : this.isInView && this.isSlideShown ? (this.instanceNode.addEvent("transitionend", (e => {
										"opacity" === e.propertyName && (e.stop(), this.instanceNode.removeEvent("transitionend"), this.instanceNode.setCss({
											opacity: "",
											transition: ""
										}), t())
									})), this.instanceNode.render(), this.instanceNode.setCss({
										opacity: 1,
										transition: "opacity 0.3s linear"
									})) : (this.instanceNode.setCssProp("opacity", ""), t())
								}))), this.imageShowPromise
							}
							createSirvImage() {
								this.imageUrl && !this.isNotSirv && (this.on("imageOnload", (t => {
									t.stopAll(), this.replaceSrc(), this.ready || (t.data.node ? this.showImage().finally((() => {
										this.done()
									})) : (0, a.A)(this.instanceNode).finally((() => {
										this.showImage().finally((() => {
											this.done(), this.sendContentLoadedEvent()
										}))
									})))
								})), this.on("imageOnerror", (t => {
									t.stopAll(), console.log("image error")
								})), this.image = new r.A(this.imageUrl, {
									imageSettings: this.queryParams,
									round: !0,
									dontLoad: this.dontLoad,
									referrerPolicy: this.referrerPolicy
								}), this.image.parentClass = this, this.getInfo())
							}
							getInfoSize() {
								return this.getImageInfoPromise || (this.getImageInfoPromise = new Promise(((t, e) => {
									this.image ? this.getInfo().then((() => {
										t({
											size: this.infoSize,
											imageIndex: this.imageIndex
										})
									})).catch((t => {
										e({
											error: t,
											isPlaceholder: t._isplaceholder,
											imageIndex: this.imageIndex
										})
									})) : e({
										error: "nonsirv",
										isPlaceholder: !1,
										imageIndex: this.imageIndex
									})
								}))), this.getImageInfoPromise
							}
							startFullInit(t, e) {
								this.isStartedFullInit || (super.startFullInit(t, e), this.isStaticImage || this.instanceNode.setCssProp("opacity", 0))
							}
							run(t, e, i, s) {
								this.firstSlideAhead = i;
								let o = super.run(t, e, i);
								if (o)
									if (this.destroyed) o = !1;
									else {
										this.instanceNode.removeAttr("alt"), this.instanceNode.removeAttr("title"), this.instanceNode.setCss({
											display: "inline-flex"
										}).render(), this.instanceNode.setCss({
											display: ""
										}).render();
										let t = null;
										(0, u.A)(this.instanceNode.node.parentNode).then((e => {
											t = e
										})).finally((() => {
											this.destroyed || (t.width && t.height <= 20 && (t.height = 0), this.size = (0, m.A)(t, this.infoSize), this.alt && l.A.$(this.instanceNode).attr("alt", this.alt), this.originTitle && l.A.$(this.instanceNode).attr("title", this.originTitle), this.isStaticImage ? this.loadStaticImage().finally((() => {
												this.isInfoLoaded && (this.waitToStart.start(), this.done())
											})) : this.isInView && (this.isSlideShown || this.preload || s) && this.getImage())
										})), this.startGettingInfo()
									}
								return o
							}
							loadContent() {
								this.getImage(!0)
							}
							loadStaticImage() {
								return this.loadStaticImagePromise || (this.loadStaticImagePromise = new Promise(((t, e) => {
									this.isStaticImage ? this.instanceNode.node.complete ? (this.sendContentLoadedEvent(), t()) : (this.instanceNode.addEvent("load", (e => {
										this.sendContentLoadedEvent(), t()
									})), this.instanceNode.addEvent("error", (t => {
										e()
									}))) : t()
								}))), this.loadStaticImagePromise
							}
							getImage(t) {
								this.isStaticImage || (this.isNotSirv || this.ready || this.size.width || this.size.height ? (this.waitToStart.start(), this.isNotSirv ? this.replaceSrc() : this.getSirvImg()) : this.attemptsNumber < 100 && setTimeout((() => {
									this.attemptsNumber += 1, this.isStarted = !1, this.run(this.isSlideShown, this.preload, this.firstSlideAhead, t)
								}), 16 * this.attemptsNumber))
							}
							get imageClassContainer() {
								return this.image
							}
							getSirvImg() {
								let t = this.getImageCreateSettings();
								if (l.A.DPPX > 1) {
									const {
										width: e,
										height: i
									} = this.image.originSize;
									this.dppx = r.A.getDPPX(t.width, t.height, e, i, t.round, this.upscale), t.dppx = this.dppx
								}
								t = this.setHDQuality(t), this.checkImage(t, this.dontLoad) ? this.replaceSrc() : this.image.getImage(t)
							}
							get originImageUrl() {
								return this.src
							}
							get alt() {
								return this.dataAlt || this.originAlt || this.dataDescription
							}
							done() {
								if (!this.ready) {
									if (this.accountInfo.branded) {
										let t = this.instanceNode;
										"img" === t.tagName && (t = t.node.parentNode), d.ms.showSirvAd(t, t, y, "Image viewer by Sirv")
									}
									this.goToFullscreen && this.instanceNode.addClass(c.XO).addEvent("click", (t => {
										this.fullscreenState === c.a0.CLOSED && (t.stop(), this.emit("goToFullscreen"))
									})), super.done(), this.hotspots && (this.hotspots.containerSize = this.instanceNode.node.getBoundingClientRect()), this.isFullscreenEnabled || (this.pinchCloud.removeEvent(), this.pinchCloud = null)
								}
							}
							getSelectorImgUrl(t) {
								return new Promise(((e, i) => {
									const s = this.getImageCreateSettings();
									s.src && (t.src = s.src), t.srcset = s.srcset, this.isInfoLoaded ? this.waitToStart.wait((() => {
										e(Object.assign(this.image.getThumbnail(t), {
											imageIndex: this.imageIndex,
											alt: this.alt,
											referrerpolicy: this.instanceNode.attr("referrerpolicy")
										}))
									})) : this.getInfo().then((() => {
										this.waitToStart.wait((() => {
											e(Object.assign(this.image.getThumbnail(t), {
												imageIndex: this.imageIndex,
												alt: this.alt,
												referrerpolicy: this.instanceNode.attr("referrerpolicy")
											}))
										}))
									})).catch(i)
								}))
							}
							getThumbnailData(t) {
								return this.image.getThumbnail(t)
							}
							createPinchEvent() {
								super.createPinchEvent(this.instanceNode), this.pinchCloud.onPinchStart = t => {
									[c.a0.OPENING, c.a0.CLOSING].includes(this.fullscreenState) || (this.pinchCloud.pinch = !0, this.pinchCloud.scale = t.scale, this.sendEvent("pinchStart"))
								}, this.pinchCloud.onPinchMove = t => {
									this.pinchCloud.pinch && !this.pinchCloud.block && (this.fullscreenState === c.a0.OPENED ? t.scale < .2 && (this.pinchCloud.block = !0, this.sendEvent("fullscreenOut")) : t.scale >= 2 && (this.pinchCloud.block = !0, this.sendEvent("fullscreenIn")))
								}
							}
							onStartActions() {
								this.ready || this.isInView && this.isStarted && (this.fullscreenState === c.a0.OPENED && this.onResize(), this.always ? this.getImageTimer() : this.getImage()), super.onStartActions()
							}
							onStopActions() {
								super.onStopActions()
							}
							onInView(t) {
								t && !this.isStaticImage && (this.ready || this.isInView || this.isStarted && (this.isInView = !0, this.isInfoLoaded && (this.preload || this.isSlideShown) && this.getImage()))
							}
							onBeforeFullscreenIn(t) {
								this.getImageTimer.cancel(), this.ready && !this.isStaticImage && this.instanceNode.setCssProp("visibility", "hidden"), super.onBeforeFullscreenIn(t), this.hotspots && this.hotspots.disableAll()
							}
							onAfterFullscreenIn(t) {
								this.instanceNode.removeClass(c.XO), this.always && !this.ready && this.isInView && this.isStarted && (this.onResize(), this.getImage()), this.hotspots && setTimeout((() => {
									this.fullscreenState === c.a0.OPENED && (this.hotspots.enableAll(), this.isInView && this.isSlideShown && this.hotspots.showNeededElements())
								}), 100)
							}
							onBeforeFullscreenOut(t) {
								this.instanceNode.setCss({
									width: "",
									height: "",
									visibility: ""
								}), super.onBeforeFullscreenOut(t)
							}
							onAfterFullscreenOut(t) {
								this.goToFullscreen && this.instanceNode.addClass(c.XO), super.onAfterFullscreenOut(t)
							}
							onResize() {
								if (!this.isStarted || this.isStaticImage || this.isNotSirv) return !1;
								if (this.isFullscreenActionEnded()) {
									let t = l.A.$(this.instanceNode.node.parentNode).size;
									if (t = (0, m.A)(t, this.infoSize), this.fullscreenState === c.a0.OPENED && (this.instanceNode.setCss({
											width: t.width,
											height: t.height
										}), this.instanceNode.setCssProp("visibility", "")), this.size.width = t.width, this.size.height && (this.size.height = t.height), this.ready) {
										const t = 50;
										(this.size.width - this.lastImageSize.width > t || this.size.height - this.lastImageSize.height > t) && this.getImage(), this.hotspots && (this.hotspots.containerSize = this.instanceNode.node.getBoundingClientRect(), this.isInView && this.isSlideShown && this.hotspots.showNeededElements())
									}
									return !0
								}
								return !1
							}
							destroy() {
								if (this.image && (this.off("imageOnload"), this.off("imageOnerror"), this.image.destroy(), this.image = null), this.getImageTimer.cancel(), this.getImageTimer = null, this.instanceNode.removeClass(c.XO).setCssProp("opacity", ""), this.hotspot && l.A.$(this.instanceNode.node.parentNode).removeEvent("tap"), this.instanceNode.node.hasAttribute("src")) try {
									this.instanceNode.removeAttr("src"), this.isStaticImage && this.instanceNode.attr("src", this.imageUrl)
								} catch (t) {}
								if (this.isStaticImage ? this.instanceNode.attr("src", this.src) : this.instanceNode.removeAttr("src"), this.srcset) this.instanceNode.attr("srcset", this.srcset);
								else try {
									this.instanceNode.removeAttr("srcset")
								} catch (t) {}
								return this.srcset = null, this.originAlt ? this.instanceNode.attr("alt", this.originAlt) : this.instanceNode.removeAttr("alt"), this.instanceNode.removeEvent("load"), this.hotspotsData = null, super.destroy(), !0
							}
						}
						const w = S;
						s()
					} catch (t) {
						s(t)
					}
				}), 1)
			},
			7435: (t, e, i) => {
				i.d(e, {
					A: () => h
				});
				var s = i(7985),
					o = i(7741);
				class n extends s.A {
					constructor(t, e, i) {
						super(), this.parentNode = o.A.$(t), this.options = Object.assign({
							class: null,
							disabledClass: "disable",
							ariaLabel: ""
						}, e), this.events = i || {}, this.disabled = !1, this.isDisabledClassAdded = !1, this.instanceNode = o.A.$new("button"), this.instanceNode.attr("aria-label", this.options.ariaLabel), this.options.class && this.instanceNode.addClass(this.options.class), Object.entries(this.events).forEach((t => {
							this.instanceNode.addEvent(...t)
						}))
					}
					addTabIndex() {
						this.instanceNode.attr("tabindex", 0)
					}
					removeTabIndex() {
						this.instanceNode.removeAttr("tabindex")
					}
					append() {
						this.parentNode.append(this.instanceNode)
					}
					changeState(t) {
						t ? (this.disable(!0), this.isDisabledClassAdded || (this.isDisabledClassAdded = !0, this.instanceNode.addClass(this.options.disabledClass))) : (this.isDisabledClassAdded && (this.isDisabledClassAdded = !1, this.instanceNode.removeClass(this.options.disabledClass)), this.disable())
					}
					disable(t) {
						t ? this.disabled || (this.disabled = !0, this.instanceNode.attr("disabled", "disabled")) : this.disabled && (this.disabled = !1, this.instanceNode.removeAttr("disabled"))
					}
					destroy() {
						Object.entries(this.events).forEach((t => {
							this.instanceNode.removeEvent(...t)
						})), this.events = {}, this.changeState(), this.instanceNode.remove(), this.instanceNode = null, super.destroy()
					}
				}
				class a extends s.A {
					constructor(t, e) {
						super(), this.parentNode = o.A.$(t), this.options = Object.assign({
							zoomInAriaLabel: "",
							zoomOutAriaLabel: "",
							closeAriaLabel: ""
						}, e || {}), this.instanceNode = o.A.$new("div").addClass("zoom-controls"), this.disableWhileZooming = !1, this.zoomInButton = new n(this.instanceNode, {
							class: "zoom-in",
							ariaLabel: this.options.zoomInAriaLabel
						}, {
							btnclick: t => {
								t.stop(), this.disableWhileZooming || this.emit("zoomControlsAction", {
									data: {
										type: "zoomin"
									}
								})
							},
							tap: t => {
								t.stop(), this.disableWhileZooming || this.emit("zoomControlsAction", {
									data: {
										type: "zoomin"
									}
								})
							}
						}), this.zoomInButton.instanceNode.store("action", (() => this.emit("zoomControlsAction", {
							data: {
								type: "zoomin"
							}
						}))), this.zoomInButton.parentClass = this, this.zoomOutButton = new n(this.instanceNode, {
							class: "zoom-out",
							ariaLabel: this.options.zoomOutAriaLabel
						}, {
							btnclick: t => {
								t.stop(), this.disableWhileZooming || this.emit("zoomControlsAction", {
									data: {
										type: "zoomout"
									}
								})
							},
							tap: t => {
								t.stop(), this.disableWhileZooming || this.emit("zoomControlsAction", {
									data: {
										type: "zoomout"
									}
								})
							}
						}), this.zoomOutButton.instanceNode.store("action", (() => this.emit("zoomControlsAction", {
							data: {
								type: "zoomout"
							}
						}))), this.zoomOutButton.parentClass = this, this.zoomInButton.append(), this.zoomOutButton.append()
					}
					show() {
						this.parentNode.append(this.instanceNode)
					}
					hide() {
						this.instanceNode.remove()
					}
					invisibleDisable(t) {
						this.disableWhileZooming = !!t
					}
					disable(t) {
						t ? "in" === t ? (this.zoomInButton.changeState(!0), this.zoomOutButton.changeState()) : (this.zoomOutButton.changeState(!0), this.zoomInButton.changeState()) : (this.zoomInButton.changeState(), this.zoomOutButton.changeState())
					}
					addTabIndex() {
						this.zoomInButton.addTabIndex(), this.zoomOutButton.addTabIndex()
					}
					removeTabIndex() {
						this.zoomInButton.removeTabIndex(), this.zoomOutButton.removeTabIndex()
					}
					destroy() {
						this.zoomInButton.instanceNode.del("action"), this.zoomOutButton.instanceNode.del("action"), this.zoomInButton.destroy(), this.zoomOutButton.destroy(), this.hide(), super.destroy()
					}
				}
				const h = a
			},
			1057: (t, e, i) => {
				i.a(t, (async(t, s) => {
					try {
						i.r(e), i.d(e, {
							default: () => P
						});
						var o = i(9972),
							n = i(1889),
							a = i(7435),
							h = i(6059),
							r = i(8479),
							l = i(3274),
							d = i(3287),
							c = i(749),
							p = i(7741),
							u = i(3435),
							m = i(2326),
							g = i(7950),
							v = i(7202),
							f = i(757),
							y = i(511),
							S = i(5654);
						let t = null;
						try {
							t = (await Promise.resolve().then((() => {
								if (!i.m[183]) {
									var t = new Error("Module '183' is not available (weak dependency)");
									throw t.code = "MODULE_NOT_FOUND", t
								}
								return i(183)
							}))).default
						} catch (t) {}
						const w = "https://sirv.com/about-zoom/?utm_source=client&utm_medium=sirvembed&utm_content=typeofembed(zoom)&utm_campaign=branding",
							b = t => {
								t.stop()
							},
							A = (t, e) => Math.abs(t - e),
							x = t => {
								let e = null;
								for (; t.node !== document.body && !e;)(t = p.A.$(t.node.parentNode)).hasClass(y.Mu + "-slides-box") && (e = t);
								return e
							},
							z = (t, e) => new Promise(((i, s) => {
								const o = p.A.$(t).size;
								e || (e = 100), e -= 1, o.width || o.height ? i(o) : e > 0 ? setTimeout((() => {
									z(t, e).then(i).catch(s)
								}), 16) : s(null)
							})),
							C = t => ["top", "left", "right", "bottom"].includes(t),
							I = () => {
								var t;
								return null != (t = screen.orientation) && t.type || window.innerWidth >= window.innerHeight ? "landscape-primary" : "portrait-primary"
							};
						f.ms.addCssModule("Zoom", o.A + n.A);
						class E extends u.A {
							constructor(t, e) {
								if (super(t, e, h.NT), this.type = y.mo.ZOOM, this.insideOptions = {
										type: "outside",
										position: "right",
										hideZoomForClickTrigger: !0,
										zooming: !0,
										map: !1,
										mapSize: 50,
										controls: !1,
										trigger: "click",
										outsideModeWasChanged: !1
									}, this.queryParamsObj = (0, c.A)(this.queryParams), this.queryParamsObj) {
									const t = parseInt(this.queryParamsObj.quality, 10);
									isNaN(t) ? delete this.queryParamsObj.quality : this.queryParamsObj.quality = t
								}
								this.queryParamsQuality = this.queryParamsObj.quality || null, this.imageNode = null, this.loader = null, this.image = null, this.controls = null, this.differenceBetweenSizes = 100, this.currentSize = {
									width: 0,
									height: 0
								}, this.currentImageSize = {
									width: 0,
									height: 0
								}, this.isInfoLoaded = !1, this.zoomIsOpened = !1, this.imageShowPromise = null, this.hint = null, this.longTapTimer = null, this.setImageCss = !1, this.lastTriggerAction = null, this.isNotMouse = !1, this.accountInfo = {}, this.postInitState = 0, this.clonedImage = null, this.isHidden = !1, this.destroyed = !1, this.waitingCallbacks = [], this.fsClickHandler = null, this.mouseScrollHandler = null, this.lastOrientation = I(), this.lastImageSize = {
									width: 0,
									height: 0
								}, this.hotspotsTurnedOn = !0, this.scrollDebounce = (0, r.A)((() => {
									this.replaceZoom()
								}), 16), this.zoomDebounce = (0, r.A)((() => {
									this.controls && (this.controls.invisibleDisable(), this.changeControlsState(this.zoom.getZoomData()))
								}), 42), this.onScrollHandler = this.onScroll.bind(this), this.instanceNode.addEvent("selectstart", (t => {
									t.stop()
								})), this.createHotspotsClass(), this.createSirvImage()
							}
							makeOptions() {
								let t = new p.A.Options(this.defaultSchema);
								return t = this.makeGlobalOptions(t), ["top", "left", "right", "bottom", "inner", "magnifier"].includes(t.get("mode")) && t.parseSchema(h._J, !0), p.A.browser.touchScreen && p.A.browser.mobile && !this._options.haveBreakpoints && (t.parseSchema(h.RL, !0), t = this.makeMobileOptions(t), ["inner", "deep"].includes(t.get("mode")) && t.parseSchema(h.Jd, !0)), "deep" === t.get("mode") && t.parseSchema(h.nw, !0), t
							}
							updateOptions(t) {
								var e;
								if ((0, S.A)(this._options, t)) return;
								this._options = t, this.zoomIsOpened && this.zoom.hide(!0);
								const i = this.quality,
									s = this.hdQuality;
								var o, n;
								super.updateOptions(t), this.destroyControls(), this.insideOptions.map = !1, this.normalizeOptions(), this.removeMouseWheelEvent(), this.setMouseWheelEvent(), this.replaceZoom(!0), this.createControls(), null == (e = this.controls) || e.disable("out"), this.zoomable ? null == (o = this.controls) || o.show() : null == (n = this.controls) || n.hide(), i === this.quality && s === this.hdQuality || (this.getImage(!0), this.emit("reloadThumbnail"))
							}
							getInfo() {
								return this.gettingInfoPromise || (this.gettingInfoPromise = new Promise(((t, e) => {
									this.waitGettingInfo.wait((() => {
										this.image.loadInfo().then((e => {
											this.destroyed || (this.isInfoLoaded = !0, this.accountInfo = this.image.accountInfo, this.dataDescription || (this.dataDescription = this.image.description), e.hotspots && (this.hotspotsData = this.hotspotsData.concat(e.hotspots)), this.infoSize = this.image.originSize, this.hotspots && (this.hotspots.originImageSize = this.infoSize), t())
										})).catch((t => {
											this.destroyed || e(t)
										}))
									}))
								}))), this.gettingInfoPromise
							}
							showHint() {
								!this.hint || this.always && ![y.a0.OPENING, y.a0.OPENED].includes(this.fullscreenState) || this.hint.show()
							}
							onStartActions() {
								this.ready ? this.isInView && this.zoomable && this.showHint() : this.isStarted && this.isInView && this.isSlideShown && !this.preload && this.postInit(), this.controls && this.controls.addTabIndex(), super.onStartActions()
							}
							onStopActions() {
								var t;
								this.zoomOut(!0), null == (t = this.hint) || t.hide(), this.controls && this.controls.removeTabIndex(), super.onStopActions()
							}
							onInView(t) {
								t && (this.ready ? this.isSlideShown && this.zoomable && this.showHint() : this.isStarted && (this.isInView || !this.preload && !this.isSlideShown || (this.isInView = !0, this.postInit())))
							}
							startFullInit(t, e) {
								this.isStartedFullInit || (super.startFullInit(t, e), this.normalizeOptions(), this.instanceNode.addClass(y.Mu + "-zoom-view"), this.instanceNode.addEvent("mousedown", b), this.createLoader())
							}
							imageSettings(t) {
								t || (t = {}), t.imageSettings || (t.imageSettings = {}), t.imageSettings.scale || (t.imageSettings.scale = {}), t.callbackData || (t.callbackData = {}), t.imageSettings.scale.option = "fill", null !== this.quality && null === this.queryParamsQuality && (t.src || (t.src = {}), t.src.quality = this.quality);
								const e = this.hdQuality;
								return (null === this.queryParamsQuality || this.isHDQualitySet && e < this.queryParamsQuality) && (t.srcset = {
									quality: e
								}), t
							}
							setHDQuality(t) {
								var e;
								return t.dppx > 1 && t.dppx < 1.5 && (null === this.queryParamsQuality && null !== this.quality ? t.srcset.quality = this.quality : null == (e = t.srcset) || delete e.quality), t
							}
							createHint(t) {
								this.option("hint.enable") && (this.hint = new m.A(this.instanceNode, {
									html: "<span>" + t + "<span>"
								}), this.hint.append())
							}
							clearZoom() {
								var t;
								this.zoom && (this.off("zooming"), this.off("zoomUp"), this.off("zoomDown"), null == (t = this.imageNode) || t.removeClass(this.zoomClassName)), super.clearZoom()
							}
							replaceZoom(t) {
								let e = !1;
								const i = this.option("trigger"),
									s = {
										clickBehavior: t ? this.defaultZoomOptions.clickBehavior : "both"
									};
								if (!this.ready) return;
								"hover" === i && "magnifier" !== this.option("mode") && ([y.a0.OPENING, y.a0.OPENED].includes(this.fullscreenState) ? (e = "click", s.trigger = e) : e = i);
								let o, n = e && this.insideOptions.trigger !== e;
								if (e && this.insideOptions.trigger !== e && (n = !0), "outside" === this.insideOptions.type) {
									o = this.canIUseOutsideZoom(), (o && this.insideOptions.outsideModeWasChanged || !o && !this.insideOptions.outsideModeWasChanged) && (this.insideOptions.outsideModeWasChanged = !this.insideOptions.outsideModeWasChanged, n = !0);
									const t = this.imageNode.size;
									!n && o && this.lastImageSize.width !== t.width && (this.lastImageSize = t, n = !0)
								}(n || t) && (this.clearZoom(), "outside" === this.insideOptions.type && (o ? s.type = "outside" : (s.type = "inner", p.A.browser.mobile && (s.pan = !0, "hover" === i && (e = "dblclick", s.trigger = e)))), e && (this.insideOptions.trigger = e), this.setTriggerAction(e), this.createZoom(s), this.setZoomEvents(), this.imageNode && (this.imageNode.removeClass(y.XO), this.addCursor(), this.zoomable ? this.removeFullscreenClick() : this.addFullscreenClick()))
							}
							canIUseOutsideZoom() {
								let t = !1;
								if ("outside" === this.insideOptions.type) {
									if ([y.a0.OPENING, y.a0.OPENED].includes(this.fullscreenState)) return t;
									this.lastOrientation !== I() && (this.lastOrientation = I(), this.zoom.hide(!0));
									const e = this.imageNode.size,
										i = this.option("width"),
										s = this.option("height"),
										o = {
											width: e.width,
											height: e.height
										};
									"auto" !== i && (/%$/.test(i) ? e.width = e.width / 100 * parseInt(i, 10) : e.width = parseInt(i, 10)), "auto" !== s && (/%$/.test(s) ? e.height = e.height / 100 * parseInt(s, 10) : e.height = parseInt(s, 10));
									const n = this.option("margin"),
										a = p.A.$(window).scroll,
										h = this.imageNode.position;
									let r;
									switch (this.insideOptions.position) {
										case "top":
											r = h.top - a.y - n, r > e.height && (t = !0);
											break;
										case "left":
											r = h.left - a.x - n, r >= e.width && (t = !0);
											break;
										case "right":
											r = h.left - a.x, r += o.width + n, window.innerWidth - r >= e.width && (t = !0);
											break;
										case "bottom":
											r = h.top - a.y, r += o.height + n, window.innerHeight - r >= e.height && (t = !0)
									}
								}
								return t
							}
							createHotspotsClass() {
								"magnifier" !== this.option("mode") && (p.A.browser.mobile || "hover" !== this.option("trigger") || (this.hotspotsTurnedOn = !1), super.createHotspotsClass(t))
							}
							run(t, e, i) {
								const s = super.run(t, e, i);
								return s && (this.getInfo().finally((() => {
									this.calcContainerSize(), this.isInView && (this.preload || this.isSlideShown) && this.postInit()
								})), this.startGettingInfo()), s
							}
							done() {
								if (!this.ready && !this.destroyed) {
									var t;
									super.done(), this.hotspots && (this.hotspots.instanceComponentNode = this.imageNode, this.hotspots.containerSize = this.imageNode.node.getBoundingClientRect()), this.createZoom(), this.replaceZoom(), this.createControls();
									const i = this.zoomable;
									var e;
									null == (t = this.controls) || t.disable("out"), i && (null == (e = this.controls) || e.show()), this.imageNode && (this.addCursor(), i || this.addFullscreenClick()), this.setZoomEvents(), this.isSlideShown && this.isInView && i && this.showHint(), this.accountInfo.branded && f.ms.showSirvAd(this.instanceNode, this.instanceNode, w, "Deep zoom image viewer by Sirv")
								}
							}
							normalizeOptions() {
								switch ("deep" !== this.option("mode") && this.option("map.enable", !1), ("deep" === this.option("mode") || p.A.browser.mobile) && this.option("pan", !0), "magnifier" !== this.option("mode") || p.A.browser.mobile || this.option("pan", !1), C(this.option("mode")) || "auto" !== this.option("width") || "auto" !== this.option("height") || this.option("width", "70%"), this.option("trigger")) {
									case "hover":
										"deep" === this.option("mode") && this.option("trigger", "click");
										break;
									case "click":
									case "dblclick":
										break;
									default:
										this.option("trigger", !1)
								}
								switch (this.option("mode")) {
									case "top":
									case "left":
									case "right":
									case "bottom":
										this.insideOptions.type = "outside", this.insideOptions.position = this.option("mode");
										break;
									case "magnifier":
										this.insideOptions.type = "circle";
										break;
									case "inner":
										this.insideOptions.type = "inner";
										break;
									case "deep":
										this.insideOptions.type = "deep", this.insideOptions.controls = !0
								}
								"deep" === this.insideOptions.type && this.option("map.enable") && (this.insideOptions.map = 0 !== this.option("map.size"), this.insideOptions.map && (this.insideOptions.mapSize = 2 * this.option("map.size"))), this.insideOptions.trigger = this.option("trigger"), p.A.browser.mobile && (this.insideOptions.hideZoomForClickTrigger = !1), "max" !== this.option("ratio") && this.option("ratio") < y.Zn && this.option("ratio", 0), "deep" === this.option("mode") && this.option("tiles", !0), this.setDefaultZoomOptions()
							}
							setDefaultZoomOptions() {
								const t = "deep" === this.insideOptions.type;
								super.setDefaultZoomOptions(), this.defaultZoomOptions = Object.assign(this.defaultZoomOptions, {
									trigger: this.option("trigger"),
									tiles: this.option("tiles"),
									width: this.option("width"),
									height: this.option("height"),
									map: this.insideOptions.map,
									clickBehavior: t ? "up" : "both",
									outsidePosition: this.insideOptions.position,
									margin: this.option("margin"),
									type: t ? "inner" : this.insideOptions.type,
									pan: this.option("pan"),
									customZooming: this.option("wheel"),
									mapSize: this.insideOptions.mapSize
								})
							}
							onZoomGetImage(t) {
								super.onZoomGetImage(t), t.data = this.imageSettings(t.data), t.data = this.setHDQuality(t.data);
								const e = this.image.getImage(t.data);
								this.checkImage(t.data, t.data.dontLoad) && this.zoom.addLoadedImage(e)
							}
							onZoomCancelLoadingOfTiles(t) {
								var e;
								super.onZoomCancelLoadingOfTiles(t), t.data = this.imageSettings(t.data), null == (e = this.image) || e.cancelLoadingImage(t.data)
							}
							onZoomBeforeShow(t) {
								var e;
								"magnifier" !== this.option("mode") && ("outside" !== this.insideOptions.type || this.insideOptions.outsideModeWasChanged ? this.imageNode.addClass(this.zoomClassName) : this.imageNode.addClass("sirv-filter-bw"), null == (e = this.hotspots) || e.disableAll())
							}
							onZoomShown(t) {
								this.isSlideShown && this.sendEvent("zoomIn", {
									trigger: this.option("trigger"),
									isOutsideZoom: C(this.option("mode"))
								})
							}
							onZoomHidden(t) {
								var e, i, s;
								this.destroyed || (this.imageNode.removeClass(this.zoomClassName), this.imageNode.removeClass("sirv-filter-bw"), this.sendEvent("zoomOut"), this.isNotMouse = !1, this.zoomIsOpened = !1, null == (e = this.pinchCloud) || e.addEvent(), (this.hotspotsTurnedOn && [y.a0.CLOSED, y.a0.OPENING].includes(this.fullscreenState) || "hover" !== this.insideOptions.trigger && [y.a0.OPENED, y.a0.CLOSING].includes(this.fullscreenState)) && (null == (i = this.hotspots) || i.enableAll(), this.isInView && this.isSlideShown && (null == (s = this.hotspots) || s.showNeededElements())))
							}
							setZoomEvents() {
								super.setZoomEvents(), this.on("zooming", (t => {
									const e = t.data.zoom;
									t.stopAll(), this.controls && (this.controls.invisibleDisable(!0), this.changeControlsState(e), this.zoomDebounce())
								})), this.on("zoomUp", (t => {
									t.stop(), this.makeZoom("zoomin", t.data.x, t.data.y)
								})), this.on("zoomDown", (t => {
									t.stop(), this.makeZoom("zoomout", t.data.x, t.data.y)
								}))
							}
							onBeforeFullscreenIn(t) {
								var e, i;
								this.zoomIsOpened && (this.zoom.hide(!0), null == (i = this.controls) || i.disable("out")), this.ready && this.isSlideShown && this.isInView && this.imageNode && (this.isHidden = !0, this.imageNode.setCss({
									opacity: 0,
									visibility: "hidden"
								})), super.onBeforeFullscreenIn(t), null == (e = this.hotspots) || e.disableAll()
							}
							onAfterFullscreenIn(t) {
								this.calcContainerSize(), this.replaceZoom(), this.isHidden && (this.isHidden = !1, setTimeout((() => {
									this.setImageWidthHeight(), this.imageNode.setCss({
										opacity: "",
										visibility: ""
									})
								}), 0)), this.hotspots && setTimeout((() => {
									this.hotspotsTurnedOn && this.fullscreenState === y.a0.OPENED && (this.hotspots.enableAll(), this.isInView && this.isSlideShown && this.hotspots.showNeededElements())
								}), 100), super.onAfterFullscreenIn(t)
							}
							onBeforeFullscreenOut(t) {
								var e, i;
								this.zoomIsOpened && (this.zoom.hide(!0), null == (e = this.controls) || e.disable("out")), super.onBeforeFullscreenOut(t), this.hotspotsTurnedOn || null == (i = this.hotspots) || i.disableAll(), this.replaceZoom(), this.ready && this.isSlideShown && this.isInView && this.imageNode && (this.isHidden = !0, this.imageNode.setCss({
									opacity: 0,
									visibility: "hidden"
								}))
							}
							onAfterFullscreenOut(t) {
								this.isHidden && (this.isHidden = !1, setTimeout((() => {
									this.destroyed || (this.setImageWidthHeight(), this.imageNode.setCss({
										opacity: "",
										visibility: ""
									}))
								}), 0)), super.onAfterFullscreenOut(t)
							}
							onSecondSelectorClick() {
								this.zoomOut(!0)
							}
							onMouseAction(t) {
								"mouseout" === t && (!this.option("trigger") || ["deep", "magnifier"].includes(this.option("mode")) || !("outside" === this.insideOptions.type && this.insideOptions.outsideModeWasChanged || "inner" === this.insideOptions.type) || "hover" !== this.insideOptions.trigger && !this.insideOptions.hideZoomForClickTrigger || this.isNotMouse || this.zoomOut(!0))
							}
							makeZoom(t, e, i, s) {
								let o = !1;
								if (this.ready && this.zoom) switch (t) {
									case "zoomin":
										if (this.zoomIsOpened) 1 === this.zoom.nextMinZoom && this.controls.disable("in"), o = this.zoom.zoomUp(e, i, s);
										else {
											const t = "deep" === this.insideOptions.type;
											o = this.openZoom(e, i, !!t && (s ? "max" : "first"))
										}
										break;
									case "zoomout":
										var n;
										this.zoomIsOpened && (0 === this.zoom.getZoomData() || 0 === this.zoom.nextMinZoom ? (o = this.zoom.hide(), null == (n = this.controls) || n.disable("out")) : o = this.zoom.zoomDown(e, i));
										break;
									default:
										var a;
										this.zoomIsOpened && (o = this.zoom.hide(), null == (a = this.controls) || a.disable("out"))
								}
								return o
							}
							calcContainerSize() {
								if (this.destroyed) return;
								const t = this.instanceNode.size;
								if (t.height && t.width) this.currentSize = t;
								else {
									const e = this.image.originSize;
									t.height ? (this.currentSize.height = t.height, this.currentSize.width = e.width / e.height * t.height) : (this.currentSize.width = t.width, this.currentSize.height = e.height / e.width * t.width)
								}
							}
							getImageSize() {
								let t, e;
								const i = this.currentSize,
									s = this.image.originSize;
								return i.width >= i.height ? (e = Math.min(i.height, s.height), t = s.width / s.height * e, t > i.width && (t = Math.min(i.width, s.width), e = s.height / s.width * t)) : (t = Math.min(i.width, s.width), e = s.height / s.width * t, e > i.height && (e = Math.min(i.height, s.height), t = s.width / s.height * e)), Object.assign({
									realWidth: t,
									realHeight: e
								}, this.image.getClearSizeWithoutProcessingSettings({
									width: t,
									height: e
								}))
							}
							setTriggerAction(t) {
								let e = this.option("trigger");
								if (this.isNotMouse = !1, !("max" !== this.option("ratio") && this.option("ratio") < y.Zn) && e) {
									let i, s, o = !1;
									this.lastTriggerAction && (this.lastTriggerAction(), this.lastTriggerAction = null, this.hint && (this.hint.destroy(), this.hint = null, o = !0)), t && (e = t);
									const n = [
										["btnclick", "tap"],
										["dblbtnclick", "dbltap"]
									];
									switch (e) {
										case "click":
											i = n[0], s = this.option("hint.text.click");
											break;
										case "dblclick":
											i = n[1], s = this.option("hint.text.dblclick");
											break;
										case "hover":
											i = "mouseover", s = this.option("hint.text.hover"), p.A.browser.mobile && this.outsideModeWasChanged && (s = this.option("hint.text.dblclick"), i = "dbltap", e = i)
									}
									this.createHint(s), o && this.isSlideShown && this.isInView && this.zoomable && this.showHint();
									const a = [];
									if ("hover" === e) p.A.browser.touchScreen && a.push(this.setLongTapEvents()), p.A.browser.mobile || a.push(this.setHoverEvents());
									else {
										const t = t => {
											this.fullscreenState !== y.a0.OPENED && this.always || (t.stop(), this.isFullscreenActionEnded() && this.openZoom(t.pageXY.x, t.pageXY.y, !1))
										};
										if (p.A.browser.touchScreen) {
											const t = t => {
												this.isNotMouse = t.isTouchEvent()
											};
											this.imageNode.addEvent("pointerup", t), a.push(p.A.$((t => {
												this.isNotMouse = !1, this.imageNode.removeEvent("pointerup", t)
											})).bind(this, t))
										}
										if (this.imageNode.addEvent(i, t), a.push(p.A.$(((t, e) => {
												this.imageNode.removeEvent(t, e)
											})).bind(this, i, t)), p.A.browser.mobile && this.goToFullscreen) {
											const t = i === n[0] ? n[1] : n[0],
												e = t => {
													this.fullscreenState === y.a0.CLOSED && (t.stop(), this.emit("goToFullscreen"))
												};
											this.imageNode.addEvent(t, e), a.push(p.A.$(((t, e) => {
												this.imageNode.removeEvent(t, e)
											})).bind(this, t, e))
										}
									}
									this.lastTriggerAction = p.A.$((t => {
										p.A.$(t).forEach((t => {
											t()
										}))
									})).bind(this, a)
								}
							}
							setImageSrc(t, e, i) {
								this.imageNode && (e ? this.imageNode.attr("srcset", e + " " + i + "x") : this.imageNode.removeAttr("srcset"), this.imageNode.attr("src", t), this.clonedImage = p.A.$(this.imageNode.node.cloneNode(!1)), this.clonedImage.node.className = "", this.clonedImage.setCss({
									opacity: "",
									visibility: ""
								}))
							}
							setImageWidthHeight() {
								if (this.destroyed) return;
								const t = {
										width: "",
										height: ""
									},
									e = "100%";
								this.currentImageSize.realWidth / this.currentImageSize.realHeight >= this.currentSize.width / this.currentSize.height ? t.width = e : t.height = e, this.imageNode.setCss(t)
							}
							setMouseWheelEvent() {
								this.option("trigger") && "deep" === this.option("mode") && this.option("wheel") && !this.mouseScrollHandler && (this.mouseScrollHandler = t => {
									!this.zoomIsOpened && t.delta > 0 && (t.stop(), this.openZoom(t.x, t.y, "first"))
								}, this.imageNode.addEvent("mousescroll", this.mouseScrollHandler))
							}
							removeMouseWheelEvent() {
								var t;
								null == (t = this.imageNode) || t.removeEvent("mousescroll", this.mouseScrollHandler), this.mouseScrollHandler = null
							}
							createImage(t, e, i, s) {
								if (!this.imageNode) {
									this.imageNode = t ? p.A.$(t) : p.A.$new("img"), this.imageNode.attr("referrerpolicy", this.referrerPolicy).attr("id", this.ariaLabelId);
									const o = this.image.originSize;
									this.imageNode.setCss({
										maxWidth: o.width,
										maxHeight: o.height
									}), this.setImageWidthHeight(), this.setTriggerAction(), this.setMouseWheelEvent(), p.A.$(window).addEvent("scroll", this.onScrollHandler), this.alt && this.imageNode.attr("alt", this.alt), this.setImageSrc(e, i, s)
								}
							}
							setLongTapEvents() {
								let t = !1,
									e = !1;
								const i = i => {
										clearTimeout(this.longTapTimer), this.zoomIsOpened || i.isTouchEvent() && !i.isPrimaryTouch() || this.isFullscreenActionEnded() && (this.longTapTimer = setTimeout((() => {
											i.isTouchEvent() && !i.isPrimaryTouch() || (i.stop(), t = !0, this.openZoom(i.pageXY.x, i.pageXY.y, !1, !0))
										}), 201), e = !0)
									},
									s = e => {
										e.isTouchEvent() && !e.isPrimaryTouch(e) || (t ? (e.stop(), this.zoom.customMove(e.pageXY.x, e.pageXY.y)) : clearTimeout(this.longTapTimer))
									},
									o = i => {
										i.isTouchEvent() && !i.isPrimaryTouch(i) || (e && (e = !1, clearTimeout(this.longTapTimer)), t && (i.stop(), t = !1, this.zoom.hide(!0)))
									};
								return this.fullscreenState !== y.a0.OPENED && this.always || (this.instanceNode.addEvent(["touchstart", "pointerdown"], i), this.instanceNode.addEvent(["touchmove", "pointermove"], s), this.instanceNode.addEvent(["touchend", "pointerup"], o)), () => {
									this.instanceNode.removeEvent(["touchstart", "pointerdown"], i), this.instanceNode.removeEvent(["touchmove", "pointermove"], s), this.instanceNode.removeEvent(["touchend", "pointerup"], o)
								}
							}
							setHoverEvents() {
								let t, e, i, s = !1;
								const o = () => p.A.browser.touchScreen && !p.A.browser.mobile,
									n = n => {
										t = n.pageXY.x, e = n.pageXY.y, o() && n.isTouchEvent() || s || !this.isSlideShown || this.fullscreenState !== y.a0.OPENED && this.always || (s = !0, i = setTimeout((() => {
											this.openZoom(t, e, !1)
										}), 84))
									},
									a = n => {
										let a = p.A.$(n.related);
										if ((!o() || !n.isTouchEvent()) && s && (this.fullscreenState === y.a0.OPENED || !this.always) && (s = !1, this.isFullscreenActionEnded())) {
											for (; a && a !== this.imageNode.node && a !== document.body;) a = p.A.$(a.parentNode);
											a !== this.imageNode.node && (t = null, e = null, clearTimeout(i))
										}
									};
								let h = () => {},
									r = "mousemove",
									l = "mouseout";
								return o() && "edge" === p.A.browser.uaName && (h = this.on("zoomHidden", (t => {
									t.stop(), s = !1
								})), r = "pointermove", l = "pointerup"), this.imageNode.addEvent(r, n), this.imageNode.addEvent(l, a), () => {
									h(), this.imageNode.removeEvent(r, n), this.imageNode.removeEvent(l, a)
								}
							}
							getZoomImageSize() {
								const t = this.image.originSize,
									e = t.width,
									i = t.height,
									s = this.option("ratio");
								let o = {
									width: e,
									height: i
								};
								return "max" !== s && (o.width = this.currentImageSize.realWidth * s, o.height = this.currentImageSize.realHeight * s, o = g.A.roundImageSize(o)), o.width = Math.min(e, o.width), o.height = Math.min(i, o.height), {
									width: o.width,
									height: o.height,
									originWidth: e,
									originHeight: i
								}
							}
							openZoom(t, e, i, s) {
								var o, n;
								"deep" === this.insideOptions.type && "zero" !== i && "max" !== i && (i = "first");
								let a = !1;
								if (!this.zoom || !this.zoomable) return a;
								this.zoomIsOpened = !0, null == (o = this.hint) || o.hide(), null == (n = this.hotspots) || n.hideActiveHotspotBox(!0);
								const h = this.clonedImage,
									r = this.getZoomImageSize();
								return a = void 0 === t ? this.zoom.showCenter(h, r, i) : this.zoom.show(h, r, t, e, s, i), a
							}
							createPinchEvent() {
								const t = this.option("trigger");
								let e, i, s, o, n, a, h, r, l;
								const d = () => {
									n = 1, a = 1, i = this.zoom.baseScale.x, h = 1, r = i, s = 1 - i
								};
								super.createPinchEvent(this.instanceNode), this.pinchCloud.onPinchStart = e => {
									var s;
									[y.a0.OPENING, y.a0.CLOSING].includes(this.fullscreenState) || "outside" === this.insideOptions.type && !this.insideOptions.outsideModeWasChanged || (this.pinchCloud.pinch = !0, clearTimeout(this.longTapTimer), l = !1, this.pinchCloud.scale = e.scale, o = 1, null == (s = this.hotspots) || s.hideActiveHotspotBox(!0), this.zoomIsOpened && t && (o = this.zoom.scale.x, void 0 === i && d(), o /= i), this.sendEvent("pinchStart"))
								}, this.pinchCloud.onPinchResize = t => {
									this.pinchCloud.pinch && !this.pinchCloud.block && this.zoom && this.fullscreenState === y.a0.OPENED && this.zoomIsOpened && (this.pinchCloud.scale = t.scale, this.zoom.basePercent = t.centerPoint)
								}, this.pinchCloud.onPinchMove = c => {
									this.pinchCloud.pinch && !this.pinchCloud.block && (this.fullscreenState !== y.a0.OPENED && this.isFullscreenEnabled ? c.scale >= 2 && (this.pinchCloud.block = !0, !t && this.zoomIsOpened || this.sendEvent("fullscreenIn")) : this.zoomIsOpened ? this.zoom && t && (l ? (e = c.scale, e *= i, h < e && (h = e, r = i, a = 1, n = s / (h - i)), r > e && (r = e, h = 1, n = 1, a = i / r), e *= o, e = (i + (e - i) * n) * a, this.zoom.setScale(e, c.centerPoint.x, c.centerPoint.y)) : (l = !0, this.zoom.basePercent = c.centerPoint), this.pinchCloud.scale = c.scale) : c.scale > 1.1 && t ? "magnifier" !== this.option("mode") && this.option("wheel") && (this.openZoom(c.centerPoint.x, c.centerPoint.y, "zero"), d(), o = 1) : c.scale < .2 && this.isFullscreenEnabled && (this.pinchCloud.block = !0, this.sendEvent("fullscreenOut")))
								}, this.pinchCloud.onPinchEnd = t => {
									this.pinchCloud.pinch && (this.pinchCloud.pinch = !1, this.sendEvent("pinchEnd")), this.zoomIsOpened && this.pinchCloud.removeEvent(), this.pinchCloud.block = !1
								}
							}
							loadContent() {
								this.postInit()
							}
							postInit() {
								this.postInitState || (this.postInitState = 1, this.waitToStart.start(), z(this.instanceNode.node).then((t => {
									this.currentSize = t
								})).catch((t => {
									this.destroyed || this.calcContainerSize()
								})).finally((() => {
									this.destroyed || (this.postInitState = 2, this.getImage())
								})))
							}
							get imageClassContainer() {
								return this.image
							}
							getImage(t) {
								if (this.destroyed) return;
								const e = this.getImageSize(),
									i = A(g.A.roundImageSize({
										width: this.currentImageSize.width
									}).width, g.A.roundImageSize({
										width: e.width
									}).width);
								if (this.setImageCss = !1, !this.ready || i >= this.differenceBetweenSizes || this.fullscreenState === y.a0.OPENED || t) {
									if (!this.ready && !e.width && !e.height) return void setTimeout((() => {
										this.calcContainerSize(), this.getImage()
									}), 16);
									(i >= this.differenceBetweenSizes || this.fullscreenState === y.a0.OPENED || !this.currentImageSize.width) && (this.currentImageSize = e);
									const t = !0;
									let s, o = this.imageSettings({
										width: this.currentImageSize.realWidth,
										height: this.currentImageSize.realHeight,
										round: !0,
										dontLoad: t
									});
									if (p.A.DPPX > 1 && (s = o.height > o.width ? (0, l.A)(o.round ? g.A.roundImageSize({
											height: o.height
										}).height : o.height, this.image.originSize.height, this.upscale) : (0, l.A)(o.round ? g.A.roundImageSize({
											width: o.width
										}).width : o.width, this.image.originSize.width, this.upscale), o.dppx = s), o = this.setHDQuality(o), this.checkImage(o, t) && this.ready) {
										const t = this.image.getImage(o);
										this.setImageSrc(t.src, t.srcset, s)
									} else this.image.getImage(o)
								} else i < this.differenceBetweenSizes && (this.setImageCss = !0)
							}
							imageRequest() {
								this.image.getImage(this.imageSettings({
									width: this.currentImageSize.width,
									height: this.currentImageSize.height
								}))
							}
							showImage() {
								return this.imageShowPromise || (this.imageShowPromise = new Promise(((t, e) => {
									let i = null,
										s = null;
									this.isInView && this.isSlideShown ? (this.imageNode.setCss({
										opacity: 0,
										transition: "opacity .3s linear"
									}), this.instanceNode.append(this.imageNode), (0, d.A)(this.imageNode.node).then((t => {
										i = t
									})).catch((t => {
										s = t
									})).finally((() => {
										this.destroyed || (this.imageNode.addEvent("transitionend", (o => {
											o.stop(), this.imageNode.removeEvent("transitionend"), this.imageNode.setCss({
												opacity: "",
												transition: ""
											}), i ? (this.sendContentLoadedEvent(), t(i)) : e(s)
										})), this.imageNode.render(), this.imageNode.setCssProp("opacity", 1))
									}))) : (this.instanceNode.append(this.imageNode), (0, d.A)(this.imageNode.node).then((t => {
										i = t
									})).catch((t => {
										s = t
									})).finally((() => {
										i ? (this.sendContentLoadedEvent(), t(i)) : e(s)
									})))
								}))), this.imageShowPromise
							}
							createLoader() {
								this.loader = new v.A(this.instanceNode, {
									class: "zoom-loader"
								})
							}
							createSirvImage() {
								this.instanceUrl && (this.on("imageOnload", (t => {
									t.stopAll(), t.data.callbackData.lens ? (this.zoom.shown || this.zoom.showing) && this.zoomIsOpened && this.zoom.addLoadedImage(t.data) : this.ready ? this.imageShowPromise && this.setImageSrc(t.data.src, t.data.srcset, t.data.dppx) : (this.createImage(t.data.node, t.data.src, t.data.srcset, t.data.dppx), this.showImage().finally((() => {
										this.loader && this.loader.hide(), this.done(), this.sendContentLoadedEvent()
									})))
								})), this.on("imageOnerror", (t => {
									t.stopAll(), this.loader && this.loader.hide(), console.log("image error")
								})), this.image = new g.A(this.instanceUrl, {
									imageSettings: this.queryParamsObj,
									referrerPolicy: this.referrerPolicy
								}), this.image.parentClass = this, this.getInfo())
							}
							getInfoSize() {
								return new Promise(((t, e) => {
									this.getInfo().then((() => {
										t({
											size: this.infoSize
										})
									})).catch((t => {
										e({
											error: t,
											isPlaceholder: t._isplaceholder
										})
									}))
								}))
							}
							getSelectorImgUrl(t) {
								return new Promise(((e, i) => {
									const s = this.imageSettings();
									s.src && (t.src = s.src), t.srcset = s.srcset, this.isInfoLoaded ? this.waitToStart.wait((() => {
										e(Object.assign(this.image.getThumbnail(t), {
											alt: this.alt
										}))
									})) : this.getInfo().then((() => {
										this.waitToStart.wait((() => {
											e(Object.assign(this.image.getThumbnail(t), {
												alt: this.alt
											}))
										}))
									})).catch(i)
								}))
							}
							getThumbnailData(t) {
								return this.image.getThumbnail(t)
							}
							createControls() {
								this.insideOptions.controls && this.option("trigger") && (this.controls = new a.A(this.instanceNode, {
									zoomInAriaLabel: this._options.zoomInLabel,
									zoomOutAriaLabel: this._options.zoomOutLabel
								}), this.controls.parentClass = this, this.isSlideShown && this.controls.addTabIndex(), this.on("zoomControlsAction", (t => {
									t.stopAll(), this.zoom && this.makeZoom(t.data.type)
								})))
							}
							destroyControls() {
								var t;
								null == (t = this.controls) || t.destroy(), this.controls = null, this.off("zoomControlsAction"), this.insideOptions.controls = !1
							}
							changeControlsState(t) {
								this.controls && (1 === t || 0 === t ? 1 === t ? this.controls.disable("in") : this.controls.disable("out") : this.controls.disable())
							}
							createZoom(t) {
								let e = null;
								if (!this.destroyed) {
									let i = this.zoomContainer;
									e = super.createZoom(this.instanceNode, t), "magnifier" === this.option("mode") ? i = x(this.instanceNode) : [y.a0.OPENING, y.a0.OPENED].includes(this.fullscreenState) || "outside" === e.type && (i = x(this.instanceNode), i = document.body), i && (this.zoom.lensContainer = i)
								}
								return e
							}
							zoomIn(t) {
								let e = !1;
								return this.ready && this.zoom && (this.option("fullscreenOnly") && this.fullscreenState === y.a0.CLOSED ? this.sendEvent("fullscreenIn") : e = this.makeZoom("zoomin", void 0, void 0, t)), e
							}
							zoomOut(t) {
								let e = !1;
								return this.ready && this.zoom && (t ? this.zoomIsOpened && (e = this.zoom.hide(!this.zoom.getZoomData())) : e = this.makeZoom("zoomout")), e
							}
							get originImageUrl() {
								return this.ready ? this.image.originUrl : null
							}
							get zoomable() {
								let t = !1;
								if (this.ready) {
									const e = 100,
										i = this.currentImageSize;
									this.getZoomImageSize().originWidth - i.realWidth >= e && ("max" === this.option("ratio") || this.option("ratio") >= y.Zn) && (t = !0)
								}
								return t
							}
							onResize() {
								var t;
								let e = !1;
								var i, s;
								if (!this.destroyed && ![y.a0.CLOSING, y.a0.OPENING].includes(this.fullscreenState)) return this.isStarted && 2 === this.postInitState && (this.calcContainerSize(), this.getImage(), this.hotspots && (this.hotspotsTurnedOn && [y.a0.CLOSED, y.a0.OPENING].includes(this.fullscreenState) || "hover" !== this.insideOptions.trigger && [y.a0.OPENED, y.a0.CLOSING].includes(this.fullscreenState)) && (this.hotspots.containerSize = this.imageNode.node.getBoundingClientRect(), this.isInView && this.isSlideShown && this.hotspots.showNeededElements()), this.imageNode && (this.setImageWidthHeight(), this.imageNode.removeClass(y.XO), this.addCursor(), this.zoomable || this.hint && this.hint.hide()), e = !0), this.zoomable ? null == (i = this.controls) || i.show() : null == (s = this.controls) || s.hide(), this.replaceZoom(), null == (t = this.zoom) || t.onResize(), e
							}
							addCursor() {
								(this.zoomable || this.isFullscreenEnabled && this.goToFullscreen && this.fullscreenState === y.a0.CLOSED) && this.option("trigger") && this.imageNode.addClass(y.XO)
							}
							addFullscreenClick() {
								this.imageNode && this.isFullscreenEnabled && this.goToFullscreen && !this.fsClickHandler && (this.fsClickHandler = t => {
									this.fullscreenState === y.a0.CLOSED && (t.stop(), this.emit("goToFullscreen"))
								}, this.imageNode.addEvent(["btnclick", "tap"], this.fsClickHandler))
							}
							removeFullscreenClick() {
								this.fsClickHandler && (this.imageNode.removeEvent(["btnclick", "tap"], this.fsClickHandler), this.fsClickHandler = null)
							}
							onScroll(t) {
								this.zoomIsOpened && t.stop(), clearTimeout(this.longTapTimer), this.scrollDebounce()
							}
							destroy() {
								var t, e, i, s;
								return this.destroyed = !0, this.removeMouseWheelEvent(), null == (t = this.loader) || t.destroy(), this.loader = null, p.A.$(window).removeEvent("scroll", this.onScrollHandler), this.onScrollHandler = null, this.lastTriggerAction && (this.lastTriggerAction(), this.lastTriggerAction = null), this.removeFullscreenClick(), null == (e = this.hint) || e.destroy(), this.hint = null, this.off("imageOnload"), this.off("imageOnerror"), null == (i = this.image) || i.destroy(), this.image = null, this.destroyControls(), this.hotspotsTurnedOn = !1, this.instanceNode.removeEvent("tap"), this.off("zooming"), this.off("zoomUp"), this.off("zoomDown"), this.instanceNode.clearEvents(), this.instanceNode.removeClass(y.Mu + "-zoom-view"), null == (s = this.imageNode) || s.remove(), this.imageNode = null, this.clonedImage = null, this.zoomDebounce.cancel(), this.zoomDebounce = null, this.scrollDebounce.cancel(), this.scrollDebounce = null, clearTimeout(this.longTapTimer), this.longTapTimer = null, this.hotspotsData = null, super.destroy(), !0
							}
						}
						const P = E;
						s()
					} catch (t) {
						s(t)
					}
				}), 1)
			},
			6059: (t, e, i) => {
				i.d(e, {
					Jd: () => r,
					NT: () => n,
					RL: () => a,
					_J: () => h,
					nw: () => l
				});
				var s = i(7746),
					o = i(7741);
				let n = {
					mode: {
						type: "string",
						enum: ["top", "left", "right", "bottom", "inner", "magnifier", "deep"],
						default: "inner"
					},
					margin: {
						type: "number",
						default: 9
					},
					width: {
						oneOf: [{
							type: "number"
						}, {
							type: "string",
							enum: ["auto"]
						}],
						default: "auto"
					},
					height: {
						oneOf: [{
							type: "number"
						}, {
							type: "string",
							enum: ["auto"]
						}],
						default: "auto"
					},
					pan: {
						type: "boolean",
						default: !1
					},
					ratio: {
						oneOf: [{
							type: "number",
							minimum: 0
						}, {
							type: "string",
							enum: ["max"]
						}],
						default: 2.5
					},
					wheel: {
						type: "boolean",
						default: !0
					},
					tiles: {
						type: "boolean",
						default: !1
					},
					trigger: {
						oneOf: [{
							type: "string",
							enum: ["hover", "click", "dblclick", "none"]
						}, {
							type: "boolean",
							enum: [!1]
						}],
						default: "click"
					},
					hint: {
						enable: {
							type: "boolean",
							default: !0
						},
						text: {
							hover: {
								type: "string",
								default: "Hover to zoom"
							},
							click: {
								type: "string",
								default: "Click to zoom"
							},
							dblclick: {
								type: "string",
								default: "Double click to zoom"
							}
						}
					},
					map: {
						enable: {
							type: "boolean",
							default: !1
						},
						size: {
							type: "number",
							minimum: 0,
							maximum: 50,
							default: 25
						}
					}
				};
				o.A.browser.touchScreen && (n = (0, s.A)(n, {
					hint: {
						text: {
							hover: {
								default: "Tap and hold to zoom"
							}
						}
					}
				}));
				const a = {
						hint: {
							text: {
								hover: {
									type: "string",
									default: "Tap and hold to zoom"
								},
								click: {
									type: "string",
									default: "Tap to zoom"
								},
								dblclick: {
									type: "string",
									default: "Double tap to zoom"
								}
							}
						}
					},
					h = {
						trigger: {
							oneOf: [{
								type: "string",
								enum: ["hover", "click", "dblclick", "none"]
							}, {
								type: "boolean",
								enum: [!1]
							}],
							default: "hover"
						}
					},
					r = {
						trigger: {
							oneOf: [{
								type: "string",
								enum: ["hover", "click", "dblclick", "none"]
							}, {
								type: "boolean",
								enum: [!1]
							}],
							default: "dblclick"
						}
					},
					l = {
						ratio: {
							oneOf: [{
								type: "number",
								minimum: 0
							}, {
								type: "string",
								enum: ["max"]
							}],
							default: "max"
						}
					}
			},
			1873: (t, e, i) => {
				i.d(e, {
					A: () => s
				});
				const s = ".smv-progress-loader{bottom:0;left:0;margin-bottom:5px;margin-left:5px}"
			},
			2893: (t, e, i) => {
				i.d(e, {
					A: () => s
				});
				const s = '.sirv-hint .spin-hint-animation{display:none;height:40px;margin-right:10px;perspective:200px;position:relative;transform-style:preserve-3d;vertical-align:middle;width:40px}.sirv-hint .sirv-hint-message .spin-hint-animation:before{border:1px solid #fff;bottom:0;box-shadow:inset 0 0 1px 1px #ffffff80;box-sizing:border-box;content:"";display:inline-block;height:30%;left:0;margin:auto;position:absolute;right:0;top:0;transform-origin:50% 50% -15px;width:40%}.sirv-hint.spin-hint-horizontal-animation .sirv-hint-message .spin-hint-animation:before{animation:sirv-spin-hint-horizontal-rotate 3s linear infinite;transform:translateZ(0) rotateY(0deg)}@keyframes sirv-spin-hint-horizontal-rotate{0%{transform:translateZ(0) rotateY(0deg)}5%{transform:translateZ(100px) rotateY(0deg)}7%{transform:translateZ(75px) rotateY(0deg)}20%{transform:translateZ(75px) rotateY(0deg)}30%{transform:translateZ(75px) rotateY(45deg)}40%{transform:translateZ(75px) rotateY(0deg)}50%{transform:translateZ(75px) rotateY(-45deg)}60%{transform:translateZ(75px) rotateY(0deg)}63%{transform:translateZ(75px) rotateY(0deg)}68%{transform:translateZ(-25px) rotateY(0deg)}70%{transform:translateZ(0) rotateY(0deg)}80%{transform:translateZ(0) rotateY(0deg)}to{transform:translateZ(0) rotateY(0deg)}}.sirv-hint.spin-hint-vertical-animation .spin-hint-message .spin-hint-animation:before{animation:sirv-spin-hint-vertical-rotate 3s linear infinite;transform:translateZ(0) rotateX(0deg)}@keyframes sirv-spin-hint-vertical-rotate{0%{transform:translateZ(0) rotateX(0deg)}5%{transform:translateZ(100px) rotateX(0deg)}7%{transform:translateZ(75px) rotateX(0deg)}20%{transform:translateZ(75px) rotateX(0deg)}30%{transform:translateZ(75px) rotateX(45deg)}40%{transform:translateZ(75px) rotateX(0deg)}50%{transform:translateZ(75px) rotateX(-45deg)}60%{transform:translateZ(75px) rotateX(0deg)}63%{transform:translateZ(75px) rotateX(0deg)}68%{transform:translateZ(-25px) rotateX(0deg)}70%{transform:translateZ(0) rotateX(0deg)}80%{transform:translateZ(0) rotateX(0deg)}to{transform:translateZ(0) rotateX(0deg)}}.sirv-hint.spin-hint-horizontal-animation.spin-hint-vertical-animation .sirv-hint-message .spin-hint-animation:before{animation:sirv-spin-hint-double-rotate 5s linear infinite;transform:translateZ(0) rotateX(0deg) rotateY(0deg)}@keyframes sirv-spin-hint-double-rotate{0%{transform:translateZ(0) rotateX(0deg) rotateY(0deg)}4%{transform:translateZ(100px) rotateX(0deg) rotateY(0deg)}5%{transform:translateZ(75px) rotateX(0deg) rotateY(0deg)}10%{transform:translateZ(75px) rotateX(0deg) rotateY(0deg)}19%{transform:translateZ(75px) rotateX(0deg) rotateY(45deg)}28%{transform:translateZ(75px) rotateX(0deg) rotateY(0deg)}37%{transform:translateZ(75px) rotateX(0deg) rotateY(-45deg)}45%{transform:translateZ(75px) rotateX(0deg) rotateY(0deg)}54%{transform:translateZ(75px) rotateX(45deg) rotateY(0deg)}63%{transform:translateZ(75px) rotateX(0deg) rotateY(0deg)}72%{transform:translateZ(75px) rotateX(-45deg) rotateY(0deg)}81%{transform:translateZ(75px) rotateX(0deg) rotateY(0deg)}85%{transform:translateZ(-25px) rotateX(0deg) rotateY(0deg)}86%{transform:translateZ(0) rotateX(0deg) rotateY(0deg)}90%{transform:translateZ(0) rotateX(0deg) rotateY(0deg)}to{transform:translateZ(0) rotateX(0deg) rotateY(0deg)}}'
			},
			1986: (t, e, i) => {
				i.d(e, {
					A: () => s
				});
				const s = '.sirv-spin{-webkit-tap-highlight-color:transparent;-webkit-touch-callout:none!important;backface-visibility:hidden;color:#000;display:inline-block;font-size:0!important;height:100%;line-height:100%!important;max-width:100%;outline:none;outline:0!important;overflow:hidden;padding:0!important;position:relative;text-decoration:none;transform:translateZ(0);-webkit-user-select:none!important;user-select:none!important;user-select:none;vertical-align:middle;visibility:visible;width:100%}.sirv-spin:before{content:"";display:inline-block;height:0;vertical-align:top}.sirv-spin .spin-canvas-container{position:absolute}.sirv-spin .spin-canvas-container,.sirv-spin canvas{bottom:0;left:0;margin:auto;right:0;top:0}.sirv-spin canvas{display:block!important;opacity:0;outline-offset:-3px;transition:opacity 1s linear,filter 2s linear;z-index:1}.sirv-spin canvas.smv-shown{opacity:1!important}.sirv-spin canvas.smv-zoomed-in{visibility:hidden!important}.sirv-spin-message{background-color:#fff;background-image:none;border:1px solid #aaa;border-collapse:initial;border-radius:15px;box-shadow:0 0 10px #000;color:#000;display:block;font-size:10px;left:33%;overflow:hidden;padding:6px;position:absolute;text-align:center;top:50%;width:33%;z-index:100}'
			},
			1889: (t, e, i) => {
				i.d(e, {
					A: () => s
				});
				const s = '.zoom-controls{bottom:16px;display:flex;flex-flow:row-reverse;height:28px;position:absolute;right:16px;z-index:168}.zoom-controls>button{background-color:#f5f5f5e6;color:#777}.zoom-controls>button:after,.zoom-controls>button:before{opacity:.65;transition:opacity .2s linear}.zoom-controls>button:hover:after,.zoom-controls>button:hover:before{opacity:1}.zoom-controls>button.disable:after,.zoom-controls>button.disable:before{opacity:.2}.zoom-controls>button+button{margin-right:4px}.zoom-controls .zoom-in,.zoom-controls .zoom-out{border:1px solid #d7d7d7;border-radius:2px;cursor:pointer;display:inline-block;height:28px;padding:0;position:relative;width:28px}.zoom-controls .zoom-in:after,.zoom-controls .zoom-in:before,.zoom-controls .zoom-out:before{border-top:2px solid;content:"";font-size:0;left:50%;line-height:100%;position:absolute;top:50%;transform:translate3d(-50%,-50%,0);width:65%}.zoom-controls .zoom-in:after{border-left:1px solid;transform:translate3d(-50%,-50%,0) rotate(-90deg);transform-origin:center}'
			},
			9972: (t, e, i) => {
				i.d(e, {
					A: () => s
				});
				const s = '.smv-zoom-view{-webkit-tap-highlight-color:transparent!important;-webkit-touch-callout:none!important;backface-visibility:hidden!important;display:inline-block;height:100%;left:0;outline:0!important;position:relative;top:0;touch-action:pan-y;-webkit-user-select:none!important;user-select:none!important;width:100%}.smv-zoom-view:after{content:"";display:inline-block;height:100%;vertical-align:middle}.smv-zoom-view .zoom-loader{bottom:0;left:0;margin:5px}.smv-zoom-view>img.smv-zoomed-in{visibility:hidden!important}.smv-zoom-view .sirv-zoom{z-index:126}.smv .smv-slides-box .smv-zoom-view>img{display:inline-block!important;height:auto;margin:0;max-height:100%;max-width:100%;padding:0;position:relative!important;vertical-align:middle;width:auto}'
			}
		},
		a = {};

	function h(t) {
		var e = a[t];
		if (void 0 !== e) return e.exports;
		var i = a[t] = {
			exports: {}
		};
		return n[t](i, i.exports, h), i.exports
	}
	h.m = n, t = "function" == typeof Symbol ? Symbol("webpack queues") : "__webpack_queues__", e = "function" == typeof Symbol ? Symbol("webpack exports") : "__webpack_exports__", s = "function" == typeof Symbol ? Symbol("webpack error") : "__webpack_error__", o = t => {
			t && t.d < 1 && (t.d = 1, t.forEach((t => t.r--)), t.forEach((t => t.r-- ? t.r++ : t())))
		}, h.a = (i, n, a) => {
			var h;
			a && ((h = []).d = -1);
			var r, l, d, c = new Set,
				p = i.exports,
				u = new Promise(((t, e) => {
					d = e, l = t
				}));
			u[e] = p, u[t] = t => (h && t(h), c.forEach(t), u.catch((t => {}))), i.exports = u, n((i => {
				var n;
				r = (i => i.map((i => {
					if (null !== i && "object" == typeof i) {
						if (i[t]) return i;
						if (i.then) {
							var n = [];
							n.d = 0, i.then((t => {
								a[e] = t, o(n)
							}), (t => {
								a[s] = t, o(n)
							}));
							var a = {};
							return a[t] = t => t(n), a
						}
					}
					var h = {};
					return h[t] = t => {}, h[e] = i, h
				})))(i);
				var a = () => r.map((t => {
						if (t[s]) throw t[s];
						return t[e]
					})),
					l = new Promise((e => {
						(n = () => e(a)).r = 0;
						var i = t => t !== h && !c.has(t) && (c.add(t), t && !t.d && (n.r++, t.push(n)));
						r.map((e => e[t](i)))
					}));
				return n.r ? l : a()
			}), (t => (t ? d(u[s] = t) : l(p), o(h)))), h && h.d < 0 && (h.d = 0)
		}, h.d = (t, e) => {
			for (var i in e) h.o(e, i) && !h.o(t, i) && Object.defineProperty(t, i, {
				enumerable: !0,
				get: e[i]
			})
		}, h.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e), h.r = t => {
			"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
				value: "Module"
			}), Object.defineProperty(t, "__esModule", {
				value: !0
			})
		},


		h(183), h(9383), h(5574), h(7316), h(1057), h(5578), h(6499), h(7982), h(4105)
})();*/