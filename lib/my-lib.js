import fe, { getCurrentInstance as le, inject as _e, toRefs as M, markRaw as O, set as x, ref as ee, watch as de, reactive as z, effectScope as pe, isRef as C, isReactive as A, toRef as T, del as F, nextTick as B, computed as j, getCurrentScope as ve, onScopeDispose as me, onMounted as he, defineComponent as te } from "vue";
var Ee = !0;
fe.util.warn;
/*!
  * pinia v2.0.34
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */
let U;
const $ = (e) => U = e, ge = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
  /* istanbul ignore next */
  Symbol()
);
function V(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var L;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(L || (L = {}));
const J = typeof window < "u", I = (process.env.NODE_ENV !== "production" || typeof __VUE_PROD_DEVTOOLS__ < "u" && __VUE_PROD_DEVTOOLS__) && process.env.NODE_ENV !== "test" && J;
function se(e, n) {
  for (const s in n) {
    const t = n[s];
    if (!(s in e))
      continue;
    const c = e[s];
    V(c) && V(t) && !C(t) && !A(t) ? e[s] = se(c, t) : x(e, s, t);
  }
  return e;
}
const ne = () => {
};
function G(e, n, s, t = ne) {
  e.push(n);
  const c = () => {
    const l = e.indexOf(n);
    l > -1 && (e.splice(l, 1), t());
  };
  return !s && ve() && me(c), c;
}
function P(e, ...n) {
  e.slice().forEach((s) => {
    s(...n);
  });
}
function H(e, n) {
  e instanceof Map && n instanceof Map && n.forEach((s, t) => e.set(t, s)), e instanceof Set && n instanceof Set && n.forEach(e.add, e);
  for (const s in n) {
    if (!n.hasOwnProperty(s))
      continue;
    const t = n[s], c = e[s];
    V(c) && V(t) && e.hasOwnProperty(s) && !C(t) && !A(t) ? e[s] = H(c, t) : e[s] = t;
  }
  return e;
}
process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
const xe = /* @__PURE__ */ new WeakMap();
function ye(e) {
  return (
    /* istanbul ignore next */
    !xe.has(e)
  );
}
const { assign: y } = Object;
function Q(e) {
  return !!(C(e) && e.effect);
}
function Z(e, n, s, t) {
  const { state: c, actions: l, getters: f } = n, a = s.state.value[e];
  let u;
  function _() {
    !a && (process.env.NODE_ENV === "production" || !t) && x(s.state.value, e, c ? c() : {});
    const m = process.env.NODE_ENV !== "production" && t ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      M(ee(c ? c() : {}).value)
    ) : M(s.state.value[e]);
    return y(m, l, Object.keys(f || {}).reduce((v, d) => (process.env.NODE_ENV !== "production" && d in m && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${d}" in store "${e}".`), v[d] = O(j(() => {
      $(s);
      const h = s._s.get(e);
      if (h._r)
        return f[d].call(h, h);
    })), v), {}));
  }
  return u = W(e, _, n, s, t, !0), u;
}
function W(e, n, s = {}, t, c, l) {
  let f;
  const a = y({ actions: {} }, s);
  if (process.env.NODE_ENV !== "production" && !t._e.active)
    throw new Error("Pinia destroyed");
  const u = {
    deep: !0
    // flush: 'post',
  };
  process.env.NODE_ENV !== "production" && !Ee && (u.onTrigger = (r) => {
    _ ? h = r : _ == !1 && !i._hotUpdating && (Array.isArray(h) ? h.push(r) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let _, m, v = O([]), d = O([]), h;
  const b = t.state.value[e];
  !l && !b && (process.env.NODE_ENV === "production" || !c) && x(t.state.value, e, {});
  const w = ee({});
  let X;
  function Y(r) {
    let o;
    _ = m = !1, process.env.NODE_ENV !== "production" && (h = []), typeof r == "function" ? (r(t.state.value[e]), o = {
      type: L.patchFunction,
      storeId: e,
      events: h
    }) : (H(t.state.value[e], r), o = {
      type: L.patchObject,
      payload: r,
      storeId: e,
      events: h
    });
    const p = X = Symbol();
    B().then(() => {
      X === p && (_ = !0);
    }), m = !0, P(v, o, t.state.value[e]);
  }
  const ce = l ? function() {
    const { state: o } = s, p = o ? o() : {};
    this.$patch((E) => {
      y(E, p);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
    } : ne
  );
  function ae() {
    f.stop(), v = [], d = [], t._s.delete(e);
  }
  function q(r, o) {
    return function() {
      $(t);
      const p = Array.from(arguments), E = [], D = [];
      function ie(g) {
        E.push(g);
      }
      function ue(g) {
        D.push(g);
      }
      P(d, {
        args: p,
        name: r,
        store: i,
        after: ie,
        onError: ue
      });
      let S;
      try {
        S = o.apply(this && this.$id === e ? this : i, p);
      } catch (g) {
        throw P(D, g), g;
      }
      return S instanceof Promise ? S.then((g) => (P(E, g), g)).catch((g) => (P(D, g), Promise.reject(g))) : (P(E, S), S);
    };
  }
  const k = /* @__PURE__ */ O({
    actions: {},
    getters: {},
    state: [],
    hotState: w
  }), R = {
    _p: t,
    // _s: scope,
    $id: e,
    $onAction: G.bind(null, d),
    $patch: Y,
    $reset: ce,
    $subscribe(r, o = {}) {
      const p = G(v, r, o.detached, () => E()), E = f.run(() => de(() => t.state.value[e], (D) => {
        (o.flush === "sync" ? m : _) && r({
          storeId: e,
          type: L.direct,
          events: h
        }, D);
      }, y({}, u, o)));
      return p;
    },
    $dispose: ae
  };
  R._r = !1;
  const i = z(process.env.NODE_ENV !== "production" || I ? y(
    {
      _hmrPayload: k,
      _customProperties: O(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    R
    // must be added later
    // setupStore
  ) : R);
  t._s.set(e, i);
  const N = t._e.run(() => (f = pe(), f.run(() => n())));
  for (const r in N) {
    const o = N[r];
    if (C(o) && !Q(o) || A(o))
      process.env.NODE_ENV !== "production" && c ? x(w.value, r, T(N, r)) : l || (b && ye(o) && (C(o) ? o.value = b[r] : H(o, b[r])), x(t.state.value[e], r, o)), process.env.NODE_ENV !== "production" && k.state.push(r);
    else if (typeof o == "function") {
      const p = process.env.NODE_ENV !== "production" && c ? o : q(r, o);
      x(N, r, p), process.env.NODE_ENV !== "production" && (k.actions[r] = o), a.actions[r] = o;
    } else
      process.env.NODE_ENV !== "production" && Q(o) && (k.getters[r] = l ? (
        // @ts-expect-error
        s.getters[r]
      ) : o, J && (N._getters || // @ts-expect-error: same
      (N._getters = O([]))).push(r));
  }
  if (Object.keys(N).forEach((r) => {
    x(i, r, N[r]);
  }), Object.defineProperty(i, "$state", {
    get: () => process.env.NODE_ENV !== "production" && c ? w.value : t.state.value[e],
    set: (r) => {
      if (process.env.NODE_ENV !== "production" && c)
        throw new Error("cannot set hotState");
      Y((o) => {
        y(o, r);
      });
    }
  }), process.env.NODE_ENV !== "production" && (i._hotUpdate = O((r) => {
    i._hotUpdating = !0, r._hmrPayload.state.forEach((o) => {
      if (o in i.$state) {
        const p = r.$state[o], E = i.$state[o];
        typeof p == "object" && V(p) && V(E) ? se(p, E) : r.$state[o] = E;
      }
      x(i, o, T(r.$state, o));
    }), Object.keys(i.$state).forEach((o) => {
      o in r.$state || F(i, o);
    }), _ = !1, m = !1, t.state.value[e] = T(r._hmrPayload, "hotState"), m = !0, B().then(() => {
      _ = !0;
    });
    for (const o in r._hmrPayload.actions) {
      const p = r[o];
      x(i, o, q(o, p));
    }
    for (const o in r._hmrPayload.getters) {
      const p = r._hmrPayload.getters[o], E = l ? (
        // special handling of options api
        j(() => ($(t), p.call(i, i)))
      ) : p;
      x(i, o, E);
    }
    Object.keys(i._hmrPayload.getters).forEach((o) => {
      o in r._hmrPayload.getters || F(i, o);
    }), Object.keys(i._hmrPayload.actions).forEach((o) => {
      o in r._hmrPayload.actions || F(i, o);
    }), i._hmrPayload = r._hmrPayload, i._getters = r._getters, i._hotUpdating = !1;
  })), I) {
    const r = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((o) => {
      Object.defineProperty(i, o, y({ value: i[o] }, r));
    });
  }
  return i._r = !0, t._p.forEach((r) => {
    if (I) {
      const o = f.run(() => r({
        store: i,
        app: t._a,
        pinia: t,
        options: a
      }));
      Object.keys(o || {}).forEach((p) => i._customProperties.add(p)), y(i, o);
    } else
      y(i, f.run(() => r({
        store: i,
        app: t._a,
        pinia: t,
        options: a
      })));
  }), process.env.NODE_ENV !== "production" && i.$state && typeof i.$state == "object" && typeof i.$state.constructor == "function" && !i.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${i.$id}".`), b && l && s.hydrate && s.hydrate(i.$state, b), _ = !0, m = !0, i;
}
function be(e, n, s) {
  let t, c;
  const l = typeof n == "function";
  typeof e == "string" ? (t = e, c = l ? s : n) : (c = e, t = e.id);
  function f(a, u) {
    const _ = le();
    if (a = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && U && U._testing ? null : a) || _ && _e(ge, null), a && $(a), process.env.NODE_ENV !== "production" && !U)
      throw new Error(`[🍍]: getActivePinia was called with no active Pinia. Did you forget to install pinia?
	const pinia = createPinia()
	app.use(pinia)
This will fail in production.`);
    a = U, a._s.has(t) || (l ? W(t, n, c, a) : Z(t, c, a), process.env.NODE_ENV !== "production" && (f._pinia = a));
    const m = a._s.get(t);
    if (process.env.NODE_ENV !== "production" && u) {
      const v = "__hot:" + t, d = l ? W(v, n, c, a, !0) : Z(v, y({}, c), a, !0);
      u._hotUpdate(d), delete a.state.value[v], a._s.delete(v);
    }
    if (process.env.NODE_ENV !== "production" && J && _ && _.proxy && // avoid adding stores that are just built for hot module replacement
    !u) {
      const v = _.proxy, d = "_pStores" in v ? v._pStores : v._pStores = {};
      d[t] = m;
    }
    return m;
  }
  return f.$id = t, f;
}
function Ne(e) {
  return M(e);
}
const Oe = [], Pe = [
  {
    id: 1,
    name: "John",
    age: 30,
    address: "New York"
  },
  {
    id: 2,
    name: "Smith",
    age: 40,
    address: "California"
  },
  {
    id: 3,
    name: "Peter",
    age: 50,
    address: "Texas"
  }
], Ve = {
  userList: Oe,
  userMocks: Pe
}, De = () => "xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
  const n = Math.random() * 16 | 0;
  return (e === "x" ? n : n & 3 | 8).toString(16);
}), oe = be("user", () => {
  const e = z({
    user: null,
    userList: []
  }), n = j(() => e.user), s = j(() => e.userList), t = (a) => (a.uuid || (a.uuid = De()), e.userList.push({
    ...a
  }), e.user = {
    ...a
  }, f(a), a), c = async () => (e.userList = Ve.userList, e.userList), l = (a) => {
    e.userList = e.userList.filter((u) => u.uuid !== a);
  }, f = (a) => {
    a.uuid = "", a.name = "", a.age = 0;
  };
  return {
    add: t,
    getUserList: c,
    removeUser: l,
    user: n,
    userList: s
  };
}), K = oe(), re = () => {
  const { user: e, userList: n } = Ne(K), {
    add: s,
    getUserList: t,
    removeUser: c
  } = K, l = (u) => s(u), f = async () => await t(), a = (u) => {
    c(u);
  };
  return he(async () => {
    await f();
  }), {
    addUser: l,
    getUserList: f,
    removeUser: a,
    user: e,
    userList: n
  };
}, Se = te({
  name: "UserComponent"
}), Ue = /* @__PURE__ */ te({
  ...Se,
  setup(e) {
    const n = re(), s = z({
      age: 0,
      name: ""
    });
    return { __sfc: !0, user: n, form: s, onClick: () => {
      n.addUser(s);
    }, removeUser: (f) => {
      n.removeUser(f);
    }, v4: () => "xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(f) {
      const a = Math.random() * 16 | 0;
      return (f === "x" ? a : a & 3 | 8).toString(16);
    }) };
  }
});
function Le(e, n, s, t, c, l, f, a) {
  var u = typeof e == "function" ? e.options : e;
  n && (u.render = n, u.staticRenderFns = s, u._compiled = !0), t && (u.functional = !0), l && (u._scopeId = "data-v-" + l);
  var _;
  if (f ? (_ = function(d) {
    d = d || // cached call
    this.$vnode && this.$vnode.ssrContext || // stateful
    this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !d && typeof __VUE_SSR_CONTEXT__ < "u" && (d = __VUE_SSR_CONTEXT__), c && c.call(this, d), d && d._registeredComponents && d._registeredComponents.add(f);
  }, u._ssrRegister = _) : c && (_ = a ? function() {
    c.call(
      this,
      (u.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : c), _)
    if (u.functional) {
      u._injectStyles = _;
      var m = u.render;
      u.render = function(h, b) {
        return _.call(b), m(h, b);
      };
    } else {
      var v = u.beforeCreate;
      u.beforeCreate = v ? [].concat(v, _) : [_];
    }
  return {
    exports: e,
    options: u
  };
}
var Ce = function() {
  var n = this, s = n._self._c, t = n._self._setupProxy;
  return s("div", [n._m(0), s("div", { staticClass: "flex-center-horizontal" }, [s("div", [s("h2", [n._v("Formulario")]), s("div", [s("label", { attrs: { for: "name" } }, [n._v("Nombre: ")]), s("input", { directives: [{ name: "model", rawName: "v-model", value: t.form.name, expression: "form.name" }], attrs: { "data-testid": "name", name: "name", type: "text" }, domProps: { value: t.form.name }, on: { input: function(c) {
    c.target.composing || n.$set(t.form, "name", c.target.value);
  } } })]), s("div", [s("label", { attrs: { for: "age" } }, [n._v("Edad: ")]), s("input", { directives: [{ name: "model", rawName: "v-model", value: t.form.age, expression: "form.age" }], attrs: { "data-testid": "age", name: "age", type: "number" }, domProps: { value: t.form.age }, on: { input: function(c) {
    c.target.composing || n.$set(t.form, "age", c.target.value);
  } } })]), s("div", [s("button", { attrs: { "data-testid": "button", name: "button", type: "button" }, on: { click: t.onClick } }, [n._v("Guardar")])])]), s("div", [s("h2", [n._v("Lista de usuarios")]), n._l(t.user.userList.value, function(c) {
    return s("div", { key: c.uuid }, [s("p", [n._v(n._s(c.name))]), s("p", [n._v(n._s(c.age))]), s("button", { attrs: { type: "button" }, on: { click: function(l) {
      return t.removeUser(c.uuid);
    } } }, [n._v("Remover")])]);
  })], 2)])]);
}, ke = [function() {
  var e = this, n = e._self._c;
  return e._self._setupProxy, n("div", [n("h1", [e._v("User Component")])]);
}], je = /* @__PURE__ */ Le(
  Ue,
  Ce,
  ke,
  !1,
  null,
  "a0f7960b",
  null,
  null
);
const $e = je.exports, Re = {
  components: {
    User: $e
  },
  hooks: {
    useUser: re
  },
  stores: {
    useUserStore: oe
  }
};
export {
  Re as default
};
