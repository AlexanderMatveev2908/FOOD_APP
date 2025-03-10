var j0 = (a) => {
  throw TypeError(a);
};
var Af = (a, l, i) => l.has(a) || j0("Cannot " + i);
var R = (a, l, i) => (
    Af(a, l, "read from private field"), i ? i.call(a) : l.get(a)
  ),
  ye = (a, l, i) =>
    l.has(a)
      ? j0("Cannot add the same private member more than once")
      : l instanceof WeakSet
      ? l.add(a)
      : l.set(a, i),
  te = (a, l, i, r) => (
    Af(a, l, "write to private field"), r ? r.call(a, i) : l.set(a, i), i
  ),
  Re = (a, l, i) => (Af(a, l, "access private method"), i);
var zu = (a, l, i, r) => ({
  set _(c) {
    te(a, l, c, i);
  },
  get _() {
    return R(a, l, r);
  },
});
(function () {
  const l = document.createElement("link").relList;
  if (l && l.supports && l.supports("modulepreload")) return;
  for (const c of document.querySelectorAll('link[rel="modulepreload"]')) r(c);
  new MutationObserver((c) => {
    for (const f of c)
      if (f.type === "childList")
        for (const d of f.addedNodes)
          d.tagName === "LINK" && d.rel === "modulepreload" && r(d);
  }).observe(document, { childList: !0, subtree: !0 });
  function i(c) {
    const f = {};
    return (
      c.integrity && (f.integrity = c.integrity),
      c.referrerPolicy && (f.referrerPolicy = c.referrerPolicy),
      c.crossOrigin === "use-credentials"
        ? (f.credentials = "include")
        : c.crossOrigin === "anonymous"
        ? (f.credentials = "omit")
        : (f.credentials = "same-origin"),
      f
    );
  }
  function r(c) {
    if (c.ep) return;
    c.ep = !0;
    const f = i(c);
    fetch(c.href, f);
  }
})();
function Rb(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default")
    ? a.default
    : a;
}
var Tf = { exports: {} },
  er = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var D0;
function Ab() {
  if (D0) return er;
  D0 = 1;
  var a = Symbol.for("react.transitional.element"),
    l = Symbol.for("react.fragment");
  function i(r, c, f) {
    var d = null;
    if (
      (f !== void 0 && (d = "" + f),
      c.key !== void 0 && (d = "" + c.key),
      "key" in c)
    ) {
      f = {};
      for (var m in c) m !== "key" && (f[m] = c[m]);
    } else f = c;
    return (
      (c = f.ref),
      { $$typeof: a, type: r, key: d, ref: c !== void 0 ? c : null, props: f }
    );
  }
  return (er.Fragment = l), (er.jsx = i), (er.jsxs = i), er;
}
var U0;
function Tb() {
  return U0 || ((U0 = 1), (Tf.exports = Ab())), Tf.exports;
}
var g = Tb(),
  Cf = { exports: {} },
  tr = {},
  Nf = { exports: {} },
  Of = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var M0;
function Cb() {
  return (
    M0 ||
      ((M0 = 1),
      (function (a) {
        function l(K, ce) {
          var he = K.length;
          K.push(ce);
          e: for (; 0 < he; ) {
            var Le = (he - 1) >>> 1,
              T = K[Le];
            if (0 < c(T, ce)) (K[Le] = ce), (K[he] = T), (he = Le);
            else break e;
          }
        }
        function i(K) {
          return K.length === 0 ? null : K[0];
        }
        function r(K) {
          if (K.length === 0) return null;
          var ce = K[0],
            he = K.pop();
          if (he !== ce) {
            K[0] = he;
            e: for (var Le = 0, T = K.length, Z = T >>> 1; Le < Z; ) {
              var pe = 2 * (Le + 1) - 1,
                me = K[pe],
                ae = pe + 1,
                Oe = K[ae];
              if (0 > c(me, he))
                ae < T && 0 > c(Oe, me)
                  ? ((K[Le] = Oe), (K[ae] = he), (Le = ae))
                  : ((K[Le] = me), (K[pe] = he), (Le = pe));
              else if (ae < T && 0 > c(Oe, he))
                (K[Le] = Oe), (K[ae] = he), (Le = ae);
              else break e;
            }
          }
          return ce;
        }
        function c(K, ce) {
          var he = K.sortIndex - ce.sortIndex;
          return he !== 0 ? he : K.id - ce.id;
        }
        if (
          ((a.unstable_now = void 0),
          typeof performance == "object" &&
            typeof performance.now == "function")
        ) {
          var f = performance;
          a.unstable_now = function () {
            return f.now();
          };
        } else {
          var d = Date,
            m = d.now();
          a.unstable_now = function () {
            return d.now() - m;
          };
        }
        var h = [],
          p = [],
          v = 1,
          x = null,
          E = 3,
          O = !1,
          _ = !1,
          D = !1,
          C = typeof setTimeout == "function" ? setTimeout : null,
          H = typeof clearTimeout == "function" ? clearTimeout : null,
          B = typeof setImmediate < "u" ? setImmediate : null;
        function k(K) {
          for (var ce = i(p); ce !== null; ) {
            if (ce.callback === null) r(p);
            else if (ce.startTime <= K)
              r(p), (ce.sortIndex = ce.expirationTime), l(h, ce);
            else break;
            ce = i(p);
          }
        }
        function ne(K) {
          if (((D = !1), k(K), !_))
            if (i(h) !== null) (_ = !0), ze();
            else {
              var ce = i(p);
              ce !== null && Ee(ne, ce.startTime - K);
            }
        }
        var Y = !1,
          ee = -1,
          fe = 5,
          I = -1;
        function X() {
          return !(a.unstable_now() - I < fe);
        }
        function le() {
          if (Y) {
            var K = a.unstable_now();
            I = K;
            var ce = !0;
            try {
              e: {
                (_ = !1), D && ((D = !1), H(ee), (ee = -1)), (O = !0);
                var he = E;
                try {
                  t: {
                    for (
                      k(K), x = i(h);
                      x !== null && !(x.expirationTime > K && X());

                    ) {
                      var Le = x.callback;
                      if (typeof Le == "function") {
                        (x.callback = null), (E = x.priorityLevel);
                        var T = Le(x.expirationTime <= K);
                        if (((K = a.unstable_now()), typeof T == "function")) {
                          (x.callback = T), k(K), (ce = !0);
                          break t;
                        }
                        x === i(h) && r(h), k(K);
                      } else r(h);
                      x = i(h);
                    }
                    if (x !== null) ce = !0;
                    else {
                      var Z = i(p);
                      Z !== null && Ee(ne, Z.startTime - K), (ce = !1);
                    }
                  }
                  break e;
                } finally {
                  (x = null), (E = he), (O = !1);
                }
                ce = void 0;
              }
            } finally {
              ce ? Ve() : (Y = !1);
            }
          }
        }
        var Ve;
        if (typeof B == "function")
          Ve = function () {
            B(le);
          };
        else if (typeof MessageChannel < "u") {
          var de = new MessageChannel(),
            xe = de.port2;
          (de.port1.onmessage = le),
            (Ve = function () {
              xe.postMessage(null);
            });
        } else
          Ve = function () {
            C(le, 0);
          };
        function ze() {
          Y || ((Y = !0), Ve());
        }
        function Ee(K, ce) {
          ee = C(function () {
            K(a.unstable_now());
          }, ce);
        }
        (a.unstable_IdlePriority = 5),
          (a.unstable_ImmediatePriority = 1),
          (a.unstable_LowPriority = 4),
          (a.unstable_NormalPriority = 3),
          (a.unstable_Profiling = null),
          (a.unstable_UserBlockingPriority = 2),
          (a.unstable_cancelCallback = function (K) {
            K.callback = null;
          }),
          (a.unstable_continueExecution = function () {
            _ || O || ((_ = !0), ze());
          }),
          (a.unstable_forceFrameRate = function (K) {
            0 > K || 125 < K
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
                )
              : (fe = 0 < K ? Math.floor(1e3 / K) : 5);
          }),
          (a.unstable_getCurrentPriorityLevel = function () {
            return E;
          }),
          (a.unstable_getFirstCallbackNode = function () {
            return i(h);
          }),
          (a.unstable_next = function (K) {
            switch (E) {
              case 1:
              case 2:
              case 3:
                var ce = 3;
                break;
              default:
                ce = E;
            }
            var he = E;
            E = ce;
            try {
              return K();
            } finally {
              E = he;
            }
          }),
          (a.unstable_pauseExecution = function () {}),
          (a.unstable_requestPaint = function () {}),
          (a.unstable_runWithPriority = function (K, ce) {
            switch (K) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                K = 3;
            }
            var he = E;
            E = K;
            try {
              return ce();
            } finally {
              E = he;
            }
          }),
          (a.unstable_scheduleCallback = function (K, ce, he) {
            var Le = a.unstable_now();
            switch (
              (typeof he == "object" && he !== null
                ? ((he = he.delay),
                  (he = typeof he == "number" && 0 < he ? Le + he : Le))
                : (he = Le),
              K)
            ) {
              case 1:
                var T = -1;
                break;
              case 2:
                T = 250;
                break;
              case 5:
                T = 1073741823;
                break;
              case 4:
                T = 1e4;
                break;
              default:
                T = 5e3;
            }
            return (
              (T = he + T),
              (K = {
                id: v++,
                callback: ce,
                priorityLevel: K,
                startTime: he,
                expirationTime: T,
                sortIndex: -1,
              }),
              he > Le
                ? ((K.sortIndex = he),
                  l(p, K),
                  i(h) === null &&
                    K === i(p) &&
                    (D ? (H(ee), (ee = -1)) : (D = !0), Ee(ne, he - Le)))
                : ((K.sortIndex = T), l(h, K), _ || O || ((_ = !0), ze())),
              K
            );
          }),
          (a.unstable_shouldYield = X),
          (a.unstable_wrapCallback = function (K) {
            var ce = E;
            return function () {
              var he = E;
              E = ce;
              try {
                return K.apply(this, arguments);
              } finally {
                E = he;
              }
            };
          });
      })(Of)),
    Of
  );
}
var z0;
function Nb() {
  return z0 || ((z0 = 1), (Nf.exports = Cb())), Nf.exports;
}
var jf = { exports: {} },
  we = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var L0;
function Ob() {
  if (L0) return we;
  L0 = 1;
  var a = Symbol.for("react.transitional.element"),
    l = Symbol.for("react.portal"),
    i = Symbol.for("react.fragment"),
    r = Symbol.for("react.strict_mode"),
    c = Symbol.for("react.profiler"),
    f = Symbol.for("react.consumer"),
    d = Symbol.for("react.context"),
    m = Symbol.for("react.forward_ref"),
    h = Symbol.for("react.suspense"),
    p = Symbol.for("react.memo"),
    v = Symbol.for("react.lazy"),
    x = Symbol.iterator;
  function E(T) {
    return T === null || typeof T != "object"
      ? null
      : ((T = (x && T[x]) || T["@@iterator"]),
        typeof T == "function" ? T : null);
  }
  var O = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    _ = Object.assign,
    D = {};
  function C(T, Z, pe) {
    (this.props = T),
      (this.context = Z),
      (this.refs = D),
      (this.updater = pe || O);
  }
  (C.prototype.isReactComponent = {}),
    (C.prototype.setState = function (T, Z) {
      if (typeof T != "object" && typeof T != "function" && T != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables."
        );
      this.updater.enqueueSetState(this, T, Z, "setState");
    }),
    (C.prototype.forceUpdate = function (T) {
      this.updater.enqueueForceUpdate(this, T, "forceUpdate");
    });
  function H() {}
  H.prototype = C.prototype;
  function B(T, Z, pe) {
    (this.props = T),
      (this.context = Z),
      (this.refs = D),
      (this.updater = pe || O);
  }
  var k = (B.prototype = new H());
  (k.constructor = B), _(k, C.prototype), (k.isPureReactComponent = !0);
  var ne = Array.isArray,
    Y = { H: null, A: null, T: null, S: null },
    ee = Object.prototype.hasOwnProperty;
  function fe(T, Z, pe, me, ae, Oe) {
    return (
      (pe = Oe.ref),
      {
        $$typeof: a,
        type: T,
        key: Z,
        ref: pe !== void 0 ? pe : null,
        props: Oe,
      }
    );
  }
  function I(T, Z) {
    return fe(T.type, Z, void 0, void 0, void 0, T.props);
  }
  function X(T) {
    return typeof T == "object" && T !== null && T.$$typeof === a;
  }
  function le(T) {
    var Z = { "=": "=0", ":": "=2" };
    return (
      "$" +
      T.replace(/[=:]/g, function (pe) {
        return Z[pe];
      })
    );
  }
  var Ve = /\/+/g;
  function de(T, Z) {
    return typeof T == "object" && T !== null && T.key != null
      ? le("" + T.key)
      : Z.toString(36);
  }
  function xe() {}
  function ze(T) {
    switch (T.status) {
      case "fulfilled":
        return T.value;
      case "rejected":
        throw T.reason;
      default:
        switch (
          (typeof T.status == "string"
            ? T.then(xe, xe)
            : ((T.status = "pending"),
              T.then(
                function (Z) {
                  T.status === "pending" &&
                    ((T.status = "fulfilled"), (T.value = Z));
                },
                function (Z) {
                  T.status === "pending" &&
                    ((T.status = "rejected"), (T.reason = Z));
                }
              )),
          T.status)
        ) {
          case "fulfilled":
            return T.value;
          case "rejected":
            throw T.reason;
        }
    }
    throw T;
  }
  function Ee(T, Z, pe, me, ae) {
    var Oe = typeof T;
    (Oe === "undefined" || Oe === "boolean") && (T = null);
    var be = !1;
    if (T === null) be = !0;
    else
      switch (Oe) {
        case "bigint":
        case "string":
        case "number":
          be = !0;
          break;
        case "object":
          switch (T.$$typeof) {
            case a:
            case l:
              be = !0;
              break;
            case v:
              return (be = T._init), Ee(be(T._payload), Z, pe, me, ae);
          }
      }
    if (be)
      return (
        (ae = ae(T)),
        (be = me === "" ? "." + de(T, 0) : me),
        ne(ae)
          ? ((pe = ""),
            be != null && (pe = be.replace(Ve, "$&/") + "/"),
            Ee(ae, Z, pe, "", function (Je) {
              return Je;
            }))
          : ae != null &&
            (X(ae) &&
              (ae = I(
                ae,
                pe +
                  (ae.key == null || (T && T.key === ae.key)
                    ? ""
                    : ("" + ae.key).replace(Ve, "$&/") + "/") +
                  be
              )),
            Z.push(ae)),
        1
      );
    be = 0;
    var bt = me === "" ? "." : me + ":";
    if (ne(T))
      for (var Ue = 0; Ue < T.length; Ue++)
        (me = T[Ue]), (Oe = bt + de(me, Ue)), (be += Ee(me, Z, pe, Oe, ae));
    else if (((Ue = E(T)), typeof Ue == "function"))
      for (T = Ue.call(T), Ue = 0; !(me = T.next()).done; )
        (me = me.value),
          (Oe = bt + de(me, Ue++)),
          (be += Ee(me, Z, pe, Oe, ae));
    else if (Oe === "object") {
      if (typeof T.then == "function") return Ee(ze(T), Z, pe, me, ae);
      throw (
        ((Z = String(T)),
        Error(
          "Objects are not valid as a React child (found: " +
            (Z === "[object Object]"
              ? "object with keys {" + Object.keys(T).join(", ") + "}"
              : Z) +
            "). If you meant to render a collection of children, use an array instead."
        ))
      );
    }
    return be;
  }
  function K(T, Z, pe) {
    if (T == null) return T;
    var me = [],
      ae = 0;
    return (
      Ee(T, me, "", "", function (Oe) {
        return Z.call(pe, Oe, ae++);
      }),
      me
    );
  }
  function ce(T) {
    if (T._status === -1) {
      var Z = T._result;
      (Z = Z()),
        Z.then(
          function (pe) {
            (T._status === 0 || T._status === -1) &&
              ((T._status = 1), (T._result = pe));
          },
          function (pe) {
            (T._status === 0 || T._status === -1) &&
              ((T._status = 2), (T._result = pe));
          }
        ),
        T._status === -1 && ((T._status = 0), (T._result = Z));
    }
    if (T._status === 1) return T._result.default;
    throw T._result;
  }
  var he =
    typeof reportError == "function"
      ? reportError
      : function (T) {
          if (
            typeof window == "object" &&
            typeof window.ErrorEvent == "function"
          ) {
            var Z = new window.ErrorEvent("error", {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof T == "object" &&
                T !== null &&
                typeof T.message == "string"
                  ? String(T.message)
                  : String(T),
              error: T,
            });
            if (!window.dispatchEvent(Z)) return;
          } else if (
            typeof process == "object" &&
            typeof process.emit == "function"
          ) {
            process.emit("uncaughtException", T);
            return;
          }
          console.error(T);
        };
  function Le() {}
  return (
    (we.Children = {
      map: K,
      forEach: function (T, Z, pe) {
        K(
          T,
          function () {
            Z.apply(this, arguments);
          },
          pe
        );
      },
      count: function (T) {
        var Z = 0;
        return (
          K(T, function () {
            Z++;
          }),
          Z
        );
      },
      toArray: function (T) {
        return (
          K(T, function (Z) {
            return Z;
          }) || []
        );
      },
      only: function (T) {
        if (!X(T))
          throw Error(
            "React.Children.only expected to receive a single React element child."
          );
        return T;
      },
    }),
    (we.Component = C),
    (we.Fragment = i),
    (we.Profiler = c),
    (we.PureComponent = B),
    (we.StrictMode = r),
    (we.Suspense = h),
    (we.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Y),
    (we.act = function () {
      throw Error("act(...) is not supported in production builds of React.");
    }),
    (we.cache = function (T) {
      return function () {
        return T.apply(null, arguments);
      };
    }),
    (we.cloneElement = function (T, Z, pe) {
      if (T == null)
        throw Error(
          "The argument must be a React element, but you passed " + T + "."
        );
      var me = _({}, T.props),
        ae = T.key,
        Oe = void 0;
      if (Z != null)
        for (be in (Z.ref !== void 0 && (Oe = void 0),
        Z.key !== void 0 && (ae = "" + Z.key),
        Z))
          !ee.call(Z, be) ||
            be === "key" ||
            be === "__self" ||
            be === "__source" ||
            (be === "ref" && Z.ref === void 0) ||
            (me[be] = Z[be]);
      var be = arguments.length - 2;
      if (be === 1) me.children = pe;
      else if (1 < be) {
        for (var bt = Array(be), Ue = 0; Ue < be; Ue++)
          bt[Ue] = arguments[Ue + 2];
        me.children = bt;
      }
      return fe(T.type, ae, void 0, void 0, Oe, me);
    }),
    (we.createContext = function (T) {
      return (
        (T = {
          $$typeof: d,
          _currentValue: T,
          _currentValue2: T,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (T.Provider = T),
        (T.Consumer = { $$typeof: f, _context: T }),
        T
      );
    }),
    (we.createElement = function (T, Z, pe) {
      var me,
        ae = {},
        Oe = null;
      if (Z != null)
        for (me in (Z.key !== void 0 && (Oe = "" + Z.key), Z))
          ee.call(Z, me) &&
            me !== "key" &&
            me !== "__self" &&
            me !== "__source" &&
            (ae[me] = Z[me]);
      var be = arguments.length - 2;
      if (be === 1) ae.children = pe;
      else if (1 < be) {
        for (var bt = Array(be), Ue = 0; Ue < be; Ue++)
          bt[Ue] = arguments[Ue + 2];
        ae.children = bt;
      }
      if (T && T.defaultProps)
        for (me in ((be = T.defaultProps), be))
          ae[me] === void 0 && (ae[me] = be[me]);
      return fe(T, Oe, void 0, void 0, null, ae);
    }),
    (we.createRef = function () {
      return { current: null };
    }),
    (we.forwardRef = function (T) {
      return { $$typeof: m, render: T };
    }),
    (we.isValidElement = X),
    (we.lazy = function (T) {
      return { $$typeof: v, _payload: { _status: -1, _result: T }, _init: ce };
    }),
    (we.memo = function (T, Z) {
      return { $$typeof: p, type: T, compare: Z === void 0 ? null : Z };
    }),
    (we.startTransition = function (T) {
      var Z = Y.T,
        pe = {};
      Y.T = pe;
      try {
        var me = T(),
          ae = Y.S;
        ae !== null && ae(pe, me),
          typeof me == "object" &&
            me !== null &&
            typeof me.then == "function" &&
            me.then(Le, he);
      } catch (Oe) {
        he(Oe);
      } finally {
        Y.T = Z;
      }
    }),
    (we.unstable_useCacheRefresh = function () {
      return Y.H.useCacheRefresh();
    }),
    (we.use = function (T) {
      return Y.H.use(T);
    }),
    (we.useActionState = function (T, Z, pe) {
      return Y.H.useActionState(T, Z, pe);
    }),
    (we.useCallback = function (T, Z) {
      return Y.H.useCallback(T, Z);
    }),
    (we.useContext = function (T) {
      return Y.H.useContext(T);
    }),
    (we.useDebugValue = function () {}),
    (we.useDeferredValue = function (T, Z) {
      return Y.H.useDeferredValue(T, Z);
    }),
    (we.useEffect = function (T, Z) {
      return Y.H.useEffect(T, Z);
    }),
    (we.useId = function () {
      return Y.H.useId();
    }),
    (we.useImperativeHandle = function (T, Z, pe) {
      return Y.H.useImperativeHandle(T, Z, pe);
    }),
    (we.useInsertionEffect = function (T, Z) {
      return Y.H.useInsertionEffect(T, Z);
    }),
    (we.useLayoutEffect = function (T, Z) {
      return Y.H.useLayoutEffect(T, Z);
    }),
    (we.useMemo = function (T, Z) {
      return Y.H.useMemo(T, Z);
    }),
    (we.useOptimistic = function (T, Z) {
      return Y.H.useOptimistic(T, Z);
    }),
    (we.useReducer = function (T, Z, pe) {
      return Y.H.useReducer(T, Z, pe);
    }),
    (we.useRef = function (T) {
      return Y.H.useRef(T);
    }),
    (we.useState = function (T) {
      return Y.H.useState(T);
    }),
    (we.useSyncExternalStore = function (T, Z, pe) {
      return Y.H.useSyncExternalStore(T, Z, pe);
    }),
    (we.useTransition = function () {
      return Y.H.useTransition();
    }),
    (we.version = "19.0.0"),
    we
  );
}
var H0;
function Sd() {
  return H0 || ((H0 = 1), (jf.exports = Ob())), jf.exports;
}
var Df = { exports: {} },
  jt = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var B0;
function jb() {
  if (B0) return jt;
  B0 = 1;
  var a = Sd();
  function l(h) {
    var p = "https://react.dev/errors/" + h;
    if (1 < arguments.length) {
      p += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var v = 2; v < arguments.length; v++)
        p += "&args[]=" + encodeURIComponent(arguments[v]);
    }
    return (
      "Minified React error #" +
      h +
      "; visit " +
      p +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function i() {}
  var r = {
      d: {
        f: i,
        r: function () {
          throw Error(l(522));
        },
        D: i,
        C: i,
        L: i,
        m: i,
        X: i,
        S: i,
        M: i,
      },
      p: 0,
      findDOMNode: null,
    },
    c = Symbol.for("react.portal");
  function f(h, p, v) {
    var x =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: c,
      key: x == null ? null : "" + x,
      children: h,
      containerInfo: p,
      implementation: v,
    };
  }
  var d = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function m(h, p) {
    if (h === "font") return "";
    if (typeof p == "string") return p === "use-credentials" ? p : "";
  }
  return (
    (jt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r),
    (jt.createPortal = function (h, p) {
      var v =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!p || (p.nodeType !== 1 && p.nodeType !== 9 && p.nodeType !== 11))
        throw Error(l(299));
      return f(h, p, null, v);
    }),
    (jt.flushSync = function (h) {
      var p = d.T,
        v = r.p;
      try {
        if (((d.T = null), (r.p = 2), h)) return h();
      } finally {
        (d.T = p), (r.p = v), r.d.f();
      }
    }),
    (jt.preconnect = function (h, p) {
      typeof h == "string" &&
        (p
          ? ((p = p.crossOrigin),
            (p =
              typeof p == "string"
                ? p === "use-credentials"
                  ? p
                  : ""
                : void 0))
          : (p = null),
        r.d.C(h, p));
    }),
    (jt.prefetchDNS = function (h) {
      typeof h == "string" && r.d.D(h);
    }),
    (jt.preinit = function (h, p) {
      if (typeof h == "string" && p && typeof p.as == "string") {
        var v = p.as,
          x = m(v, p.crossOrigin),
          E = typeof p.integrity == "string" ? p.integrity : void 0,
          O = typeof p.fetchPriority == "string" ? p.fetchPriority : void 0;
        v === "style"
          ? r.d.S(h, typeof p.precedence == "string" ? p.precedence : void 0, {
              crossOrigin: x,
              integrity: E,
              fetchPriority: O,
            })
          : v === "script" &&
            r.d.X(h, {
              crossOrigin: x,
              integrity: E,
              fetchPriority: O,
              nonce: typeof p.nonce == "string" ? p.nonce : void 0,
            });
      }
    }),
    (jt.preinitModule = function (h, p) {
      if (typeof h == "string")
        if (typeof p == "object" && p !== null) {
          if (p.as == null || p.as === "script") {
            var v = m(p.as, p.crossOrigin);
            r.d.M(h, {
              crossOrigin: v,
              integrity: typeof p.integrity == "string" ? p.integrity : void 0,
              nonce: typeof p.nonce == "string" ? p.nonce : void 0,
            });
          }
        } else p == null && r.d.M(h);
    }),
    (jt.preload = function (h, p) {
      if (
        typeof h == "string" &&
        typeof p == "object" &&
        p !== null &&
        typeof p.as == "string"
      ) {
        var v = p.as,
          x = m(v, p.crossOrigin);
        r.d.L(h, v, {
          crossOrigin: x,
          integrity: typeof p.integrity == "string" ? p.integrity : void 0,
          nonce: typeof p.nonce == "string" ? p.nonce : void 0,
          type: typeof p.type == "string" ? p.type : void 0,
          fetchPriority:
            typeof p.fetchPriority == "string" ? p.fetchPriority : void 0,
          referrerPolicy:
            typeof p.referrerPolicy == "string" ? p.referrerPolicy : void 0,
          imageSrcSet:
            typeof p.imageSrcSet == "string" ? p.imageSrcSet : void 0,
          imageSizes: typeof p.imageSizes == "string" ? p.imageSizes : void 0,
          media: typeof p.media == "string" ? p.media : void 0,
        });
      }
    }),
    (jt.preloadModule = function (h, p) {
      if (typeof h == "string")
        if (p) {
          var v = m(p.as, p.crossOrigin);
          r.d.m(h, {
            as: typeof p.as == "string" && p.as !== "script" ? p.as : void 0,
            crossOrigin: v,
            integrity: typeof p.integrity == "string" ? p.integrity : void 0,
          });
        } else r.d.m(h);
    }),
    (jt.requestFormReset = function (h) {
      r.d.r(h);
    }),
    (jt.unstable_batchedUpdates = function (h, p) {
      return h(p);
    }),
    (jt.useFormState = function (h, p, v) {
      return d.H.useFormState(h, p, v);
    }),
    (jt.useFormStatus = function () {
      return d.H.useHostTransitionStatus();
    }),
    (jt.version = "19.0.0"),
    jt
  );
}
var q0;
function Db() {
  if (q0) return Df.exports;
  q0 = 1;
  function a() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (l) {
        console.error(l);
      }
  }
  return a(), (Df.exports = jb()), Df.exports;
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var k0;
function Ub() {
  if (k0) return tr;
  k0 = 1;
  var a = Nb(),
    l = Sd(),
    i = Db();
  function r(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var n = 2; n < arguments.length; n++)
        t += "&args[]=" + encodeURIComponent(arguments[n]);
    }
    return (
      "Minified React error #" +
      e +
      "; visit " +
      t +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function c(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
  }
  var f = Symbol.for("react.element"),
    d = Symbol.for("react.transitional.element"),
    m = Symbol.for("react.portal"),
    h = Symbol.for("react.fragment"),
    p = Symbol.for("react.strict_mode"),
    v = Symbol.for("react.profiler"),
    x = Symbol.for("react.provider"),
    E = Symbol.for("react.consumer"),
    O = Symbol.for("react.context"),
    _ = Symbol.for("react.forward_ref"),
    D = Symbol.for("react.suspense"),
    C = Symbol.for("react.suspense_list"),
    H = Symbol.for("react.memo"),
    B = Symbol.for("react.lazy"),
    k = Symbol.for("react.offscreen"),
    ne = Symbol.for("react.memo_cache_sentinel"),
    Y = Symbol.iterator;
  function ee(e) {
    return e === null || typeof e != "object"
      ? null
      : ((e = (Y && e[Y]) || e["@@iterator"]),
        typeof e == "function" ? e : null);
  }
  var fe = Symbol.for("react.client.reference");
  function I(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === fe ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case h:
        return "Fragment";
      case m:
        return "Portal";
      case v:
        return "Profiler";
      case p:
        return "StrictMode";
      case D:
        return "Suspense";
      case C:
        return "SuspenseList";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case O:
          return (e.displayName || "Context") + ".Provider";
        case E:
          return (e._context.displayName || "Context") + ".Consumer";
        case _:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ""),
              (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
            e
          );
        case H:
          return (
            (t = e.displayName || null), t !== null ? t : I(e.type) || "Memo"
          );
        case B:
          (t = e._payload), (e = e._init);
          try {
            return I(e(t));
          } catch {}
      }
    return null;
  }
  var X = l.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    le = Object.assign,
    Ve,
    de;
  function xe(e) {
    if (Ve === void 0)
      try {
        throw Error();
      } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        (Ve = (t && t[1]) || ""),
          (de =
            -1 <
            n.stack.indexOf(`
    at`)
              ? " (<anonymous>)"
              : -1 < n.stack.indexOf("@")
              ? "@unknown:0:0"
              : "");
      }
    return (
      `
` +
      Ve +
      e +
      de
    );
  }
  var ze = !1;
  function Ee(e, t) {
    if (!e || ze) return "";
    ze = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var s = {
        DetermineComponentFrameRoot: function () {
          try {
            if (t) {
              var P = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(P.prototype, "props", {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == "object" && Reflect.construct)
              ) {
                try {
                  Reflect.construct(P, []);
                } catch (F) {
                  var L = F;
                }
                Reflect.construct(e, [], P);
              } else {
                try {
                  P.call();
                } catch (F) {
                  L = F;
                }
                e.call(P.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (F) {
                L = F;
              }
              (P = e()) &&
                typeof P.catch == "function" &&
                P.catch(function () {});
            }
          } catch (F) {
            if (F && L && typeof F.stack == "string") return [F.stack, L.stack];
          }
          return [null, null];
        },
      };
      s.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(
        s.DetermineComponentFrameRoot,
        "name"
      );
      u &&
        u.configurable &&
        Object.defineProperty(s.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot",
        });
      var o = s.DetermineComponentFrameRoot(),
        y = o[0],
        b = o[1];
      if (y && b) {
        var S = y.split(`
`),
          j = b.split(`
`);
        for (
          u = s = 0;
          s < S.length && !S[s].includes("DetermineComponentFrameRoot");

        )
          s++;
        for (; u < j.length && !j[u].includes("DetermineComponentFrameRoot"); )
          u++;
        if (s === S.length || u === j.length)
          for (
            s = S.length - 1, u = j.length - 1;
            1 <= s && 0 <= u && S[s] !== j[u];

          )
            u--;
        for (; 1 <= s && 0 <= u; s--, u--)
          if (S[s] !== j[u]) {
            if (s !== 1 || u !== 1)
              do
                if ((s--, u--, 0 > u || S[s] !== j[u])) {
                  var Q =
                    `
` + S[s].replace(" at new ", " at ");
                  return (
                    e.displayName &&
                      Q.includes("<anonymous>") &&
                      (Q = Q.replace("<anonymous>", e.displayName)),
                    Q
                  );
                }
              while (1 <= s && 0 <= u);
            break;
          }
      }
    } finally {
      (ze = !1), (Error.prepareStackTrace = n);
    }
    return (n = e ? e.displayName || e.name : "") ? xe(n) : "";
  }
  function K(e) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return xe(e.type);
      case 16:
        return xe("Lazy");
      case 13:
        return xe("Suspense");
      case 19:
        return xe("SuspenseList");
      case 0:
      case 15:
        return (e = Ee(e.type, !1)), e;
      case 11:
        return (e = Ee(e.type.render, !1)), e;
      case 1:
        return (e = Ee(e.type, !0)), e;
      default:
        return "";
    }
  }
  function ce(e) {
    try {
      var t = "";
      do (t += K(e)), (e = e.return);
      while (e);
      return t;
    } catch (n) {
      return (
        `
Error generating stack: ` +
        n.message +
        `
` +
        n.stack
      );
    }
  }
  function he(e) {
    var t = e,
      n = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do (t = e), t.flags & 4098 && (n = t.return), (e = t.return);
      while (e);
    }
    return t.tag === 3 ? n : null;
  }
  function Le(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (
        (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
        t !== null)
      )
        return t.dehydrated;
    }
    return null;
  }
  function T(e) {
    if (he(e) !== e) throw Error(r(188));
  }
  function Z(e) {
    var t = e.alternate;
    if (!t) {
      if (((t = he(e)), t === null)) throw Error(r(188));
      return t !== e ? null : e;
    }
    for (var n = e, s = t; ; ) {
      var u = n.return;
      if (u === null) break;
      var o = u.alternate;
      if (o === null) {
        if (((s = u.return), s !== null)) {
          n = s;
          continue;
        }
        break;
      }
      if (u.child === o.child) {
        for (o = u.child; o; ) {
          if (o === n) return T(u), e;
          if (o === s) return T(u), t;
          o = o.sibling;
        }
        throw Error(r(188));
      }
      if (n.return !== s.return) (n = u), (s = o);
      else {
        for (var y = !1, b = u.child; b; ) {
          if (b === n) {
            (y = !0), (n = u), (s = o);
            break;
          }
          if (b === s) {
            (y = !0), (s = u), (n = o);
            break;
          }
          b = b.sibling;
        }
        if (!y) {
          for (b = o.child; b; ) {
            if (b === n) {
              (y = !0), (n = o), (s = u);
              break;
            }
            if (b === s) {
              (y = !0), (s = o), (n = u);
              break;
            }
            b = b.sibling;
          }
          if (!y) throw Error(r(189));
        }
      }
      if (n.alternate !== s) throw Error(r(190));
    }
    if (n.tag !== 3) throw Error(r(188));
    return n.stateNode.current === n ? e : t;
  }
  function pe(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (((t = pe(e)), t !== null)) return t;
      e = e.sibling;
    }
    return null;
  }
  var me = Array.isArray,
    ae = i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    Oe = { pending: !1, data: null, method: null, action: null },
    be = [],
    bt = -1;
  function Ue(e) {
    return { current: e };
  }
  function Je(e) {
    0 > bt || ((e.current = be[bt]), (be[bt] = null), bt--);
  }
  function Ye(e, t) {
    bt++, (be[bt] = e.current), (e.current = t);
  }
  var Wt = Ue(null),
    cl = Ue(null),
    Rn = Ue(null),
    ol = Ue(null);
  function ai(e, t) {
    switch ((Ye(Rn, t), Ye(cl, e), Ye(Wt, null), (e = t.nodeType), e)) {
      case 9:
      case 11:
        t = (t = t.documentElement) && (t = t.namespaceURI) ? i0(t) : 0;
        break;
      default:
        if (
          ((e = e === 8 ? t.parentNode : t),
          (t = e.tagName),
          (e = e.namespaceURI))
        )
          (e = i0(e)), (t = r0(e, t));
        else
          switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    Je(Wt), Ye(Wt, t);
  }
  function fl() {
    Je(Wt), Je(cl), Je(Rn);
  }
  function wr(e) {
    e.memoizedState !== null && Ye(ol, e);
    var t = Wt.current,
      n = r0(t, e.type);
    t !== n && (Ye(cl, e), Ye(Wt, n));
  }
  function A(e) {
    cl.current === e && (Je(Wt), Je(cl)),
      ol.current === e && (Je(ol), (Ki._currentValue = Oe));
  }
  var z = Object.prototype.hasOwnProperty,
    V = a.unstable_scheduleCallback,
    W = a.unstable_cancelCallback,
    J = a.unstable_shouldYield,
    $ = a.unstable_requestPaint,
    re = a.unstable_now,
    _e = a.unstable_getCurrentPriorityLevel,
    lt = a.unstable_ImmediatePriority,
    st = a.unstable_UserBlockingPriority,
    It = a.unstable_NormalPriority,
    gc = a.unstable_LowPriority,
    Jl = a.unstable_IdlePriority,
    li = a.log,
    vc = a.unstable_setDisableYieldValue,
    _a = null,
    zt = null;
  function _r(e) {
    if (zt && typeof zt.onCommitFiberRoot == "function")
      try {
        zt.onCommitFiberRoot(_a, e, void 0, (e.current.flags & 128) === 128);
      } catch {}
  }
  function Ra(e) {
    if (
      (typeof li == "function" && vc(e),
      zt && typeof zt.setStrictMode == "function")
    )
      try {
        zt.setStrictMode(_a, e);
      } catch {}
  }
  var en = Math.clz32 ? Math.clz32 : dv,
    ov = Math.log,
    fv = Math.LN2;
  function dv(e) {
    return (e >>>= 0), e === 0 ? 32 : (31 - ((ov(e) / fv) | 0)) | 0;
  }
  var Rr = 128,
    Ar = 4194304;
  function dl(e) {
    var t = e & 42;
    if (t !== 0) return t;
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 4194176;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e;
    }
  }
  function Tr(e, t) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var s = 0,
      u = e.suspendedLanes,
      o = e.pingedLanes,
      y = e.warmLanes;
    e = e.finishedLanes !== 0;
    var b = n & 134217727;
    return (
      b !== 0
        ? ((n = b & ~u),
          n !== 0
            ? (s = dl(n))
            : ((o &= b),
              o !== 0
                ? (s = dl(o))
                : e || ((y = b & ~y), y !== 0 && (s = dl(y)))))
        : ((b = n & ~u),
          b !== 0
            ? (s = dl(b))
            : o !== 0
            ? (s = dl(o))
            : e || ((y = n & ~y), y !== 0 && (s = dl(y)))),
      s === 0
        ? 0
        : t !== 0 &&
          t !== s &&
          !(t & u) &&
          ((u = s & -s),
          (y = t & -t),
          u >= y || (u === 32 && (y & 4194176) !== 0))
        ? t
        : s
    );
  }
  function si(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function hv(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
        return t + 250;
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Wd() {
    var e = Rr;
    return (Rr <<= 1), !(Rr & 4194176) && (Rr = 128), e;
  }
  function Id() {
    var e = Ar;
    return (Ar <<= 1), !(Ar & 62914560) && (Ar = 4194304), e;
  }
  function bc(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function ii(e, t) {
    (e.pendingLanes |= t),
      t !== 268435456 &&
        ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0));
  }
  function mv(e, t, n, s, u, o) {
    var y = e.pendingLanes;
    (e.pendingLanes = n),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.warmLanes = 0),
      (e.expiredLanes &= n),
      (e.entangledLanes &= n),
      (e.errorRecoveryDisabledLanes &= n),
      (e.shellSuspendCounter = 0);
    var b = e.entanglements,
      S = e.expirationTimes,
      j = e.hiddenUpdates;
    for (n = y & ~n; 0 < n; ) {
      var Q = 31 - en(n),
        P = 1 << Q;
      (b[Q] = 0), (S[Q] = -1);
      var L = j[Q];
      if (L !== null)
        for (j[Q] = null, Q = 0; Q < L.length; Q++) {
          var F = L[Q];
          F !== null && (F.lane &= -536870913);
        }
      n &= ~P;
    }
    s !== 0 && eh(e, s, 0),
      o !== 0 && u === 0 && e.tag !== 0 && (e.suspendedLanes |= o & ~(y & ~t));
  }
  function eh(e, t, n) {
    (e.pendingLanes |= t), (e.suspendedLanes &= ~t);
    var s = 31 - en(t);
    (e.entangledLanes |= t),
      (e.entanglements[s] = e.entanglements[s] | 1073741824 | (n & 4194218));
  }
  function th(e, t) {
    var n = (e.entangledLanes |= t);
    for (e = e.entanglements; n; ) {
      var s = 31 - en(n),
        u = 1 << s;
      (u & t) | (e[s] & t) && (e[s] |= t), (n &= ~u);
    }
  }
  function nh(e) {
    return (
      (e &= -e), 2 < e ? (8 < e ? (e & 134217727 ? 32 : 268435456) : 8) : 2
    );
  }
  function ah() {
    var e = ae.p;
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : R0(e.type));
  }
  function yv(e, t) {
    var n = ae.p;
    try {
      return (ae.p = e), t();
    } finally {
      ae.p = n;
    }
  }
  var Aa = Math.random().toString(36).slice(2),
    Nt = "__reactFiber$" + Aa,
    Ft = "__reactProps$" + Aa,
    Wl = "__reactContainer$" + Aa,
    xc = "__reactEvents$" + Aa,
    pv = "__reactListeners$" + Aa,
    gv = "__reactHandles$" + Aa,
    lh = "__reactResources$" + Aa,
    ri = "__reactMarker$" + Aa;
  function Sc(e) {
    delete e[Nt], delete e[Ft], delete e[xc], delete e[pv], delete e[gv];
  }
  function hl(e) {
    var t = e[Nt];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if ((t = n[Wl] || n[Nt])) {
        if (
          ((n = t.alternate),
          t.child !== null || (n !== null && n.child !== null))
        )
          for (e = o0(e); e !== null; ) {
            if ((n = e[Nt])) return n;
            e = o0(e);
          }
        return t;
      }
      (e = n), (n = e.parentNode);
    }
    return null;
  }
  function Il(e) {
    if ((e = e[Nt] || e[Wl])) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function ui(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(r(33));
  }
  function es(e) {
    var t = e[lh];
    return (
      t ||
        (t = e[lh] =
          { hoistableStyles: new Map(), hoistableScripts: new Map() }),
      t
    );
  }
  function xt(e) {
    e[ri] = !0;
  }
  var sh = new Set(),
    ih = {};
  function ml(e, t) {
    ts(e, t), ts(e + "Capture", t);
  }
  function ts(e, t) {
    for (ih[e] = t, e = 0; e < t.length; e++) sh.add(t[e]);
  }
  var In = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    vv = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ),
    rh = {},
    uh = {};
  function bv(e) {
    return z.call(uh, e)
      ? !0
      : z.call(rh, e)
      ? !1
      : vv.test(e)
      ? (uh[e] = !0)
      : ((rh[e] = !0), !1);
  }
  function Cr(e, t, n) {
    if (bv(t))
      if (n === null) e.removeAttribute(t);
      else {
        switch (typeof n) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t);
            return;
          case "boolean":
            var s = t.toLowerCase().slice(0, 5);
            if (s !== "data-" && s !== "aria-") {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, "" + n);
      }
  }
  function Nr(e, t, n) {
    if (n === null) e.removeAttribute(t);
    else {
      switch (typeof n) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, "" + n);
    }
  }
  function ea(e, t, n, s) {
    if (s === null) e.removeAttribute(n);
    else {
      switch (typeof s) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(n);
          return;
      }
      e.setAttributeNS(t, n, "" + s);
    }
  }
  function un(e) {
    switch (typeof e) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function ch(e) {
    var t = e.type;
    return (
      (e = e.nodeName) &&
      e.toLowerCase() === "input" &&
      (t === "checkbox" || t === "radio")
    );
  }
  function xv(e) {
    var t = ch(e) ? "checked" : "value",
      n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
      s = "" + e[t];
    if (
      !e.hasOwnProperty(t) &&
      typeof n < "u" &&
      typeof n.get == "function" &&
      typeof n.set == "function"
    ) {
      var u = n.get,
        o = n.set;
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return u.call(this);
          },
          set: function (y) {
            (s = "" + y), o.call(this, y);
          },
        }),
        Object.defineProperty(e, t, { enumerable: n.enumerable }),
        {
          getValue: function () {
            return s;
          },
          setValue: function (y) {
            s = "" + y;
          },
          stopTracking: function () {
            (e._valueTracker = null), delete e[t];
          },
        }
      );
    }
  }
  function Or(e) {
    e._valueTracker || (e._valueTracker = xv(e));
  }
  function oh(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(),
      s = "";
    return (
      e && (s = ch(e) ? (e.checked ? "true" : "false") : e.value),
      (e = s),
      e !== n ? (t.setValue(e), !0) : !1
    );
  }
  function jr(e) {
    if (
      ((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u")
    )
      return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var Sv = /[\n"\\]/g;
  function cn(e) {
    return e.replace(Sv, function (t) {
      return "\\" + t.charCodeAt(0).toString(16) + " ";
    });
  }
  function Ec(e, t, n, s, u, o, y, b) {
    (e.name = ""),
      y != null &&
      typeof y != "function" &&
      typeof y != "symbol" &&
      typeof y != "boolean"
        ? (e.type = y)
        : e.removeAttribute("type"),
      t != null
        ? y === "number"
          ? ((t === 0 && e.value === "") || e.value != t) &&
            (e.value = "" + un(t))
          : e.value !== "" + un(t) && (e.value = "" + un(t))
        : (y !== "submit" && y !== "reset") || e.removeAttribute("value"),
      t != null
        ? wc(e, y, un(t))
        : n != null
        ? wc(e, y, un(n))
        : s != null && e.removeAttribute("value"),
      u == null && o != null && (e.defaultChecked = !!o),
      u != null &&
        (e.checked = u && typeof u != "function" && typeof u != "symbol"),
      b != null &&
      typeof b != "function" &&
      typeof b != "symbol" &&
      typeof b != "boolean"
        ? (e.name = "" + un(b))
        : e.removeAttribute("name");
  }
  function fh(e, t, n, s, u, o, y, b) {
    if (
      (o != null &&
        typeof o != "function" &&
        typeof o != "symbol" &&
        typeof o != "boolean" &&
        (e.type = o),
      t != null || n != null)
    ) {
      if (!((o !== "submit" && o !== "reset") || t != null)) return;
      (n = n != null ? "" + un(n) : ""),
        (t = t != null ? "" + un(t) : n),
        b || t === e.value || (e.value = t),
        (e.defaultValue = t);
    }
    (s = s ?? u),
      (s = typeof s != "function" && typeof s != "symbol" && !!s),
      (e.checked = b ? e.checked : !!s),
      (e.defaultChecked = !!s),
      y != null &&
        typeof y != "function" &&
        typeof y != "symbol" &&
        typeof y != "boolean" &&
        (e.name = y);
  }
  function wc(e, t, n) {
    (t === "number" && jr(e.ownerDocument) === e) ||
      e.defaultValue === "" + n ||
      (e.defaultValue = "" + n);
  }
  function ns(e, t, n, s) {
    if (((e = e.options), t)) {
      t = {};
      for (var u = 0; u < n.length; u++) t["$" + n[u]] = !0;
      for (n = 0; n < e.length; n++)
        (u = t.hasOwnProperty("$" + e[n].value)),
          e[n].selected !== u && (e[n].selected = u),
          u && s && (e[n].defaultSelected = !0);
    } else {
      for (n = "" + un(n), t = null, u = 0; u < e.length; u++) {
        if (e[u].value === n) {
          (e[u].selected = !0), s && (e[u].defaultSelected = !0);
          return;
        }
        t !== null || e[u].disabled || (t = e[u]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function dh(e, t, n) {
    if (
      t != null &&
      ((t = "" + un(t)), t !== e.value && (e.value = t), n == null)
    ) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = n != null ? "" + un(n) : "";
  }
  function hh(e, t, n, s) {
    if (t == null) {
      if (s != null) {
        if (n != null) throw Error(r(92));
        if (me(s)) {
          if (1 < s.length) throw Error(r(93));
          s = s[0];
        }
        n = s;
      }
      n == null && (n = ""), (t = n);
    }
    (n = un(t)),
      (e.defaultValue = n),
      (s = e.textContent),
      s === n && s !== "" && s !== null && (e.value = s);
  }
  function as(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Ev = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function mh(e, t, n) {
    var s = t.indexOf("--") === 0;
    n == null || typeof n == "boolean" || n === ""
      ? s
        ? e.setProperty(t, "")
        : t === "float"
        ? (e.cssFloat = "")
        : (e[t] = "")
      : s
      ? e.setProperty(t, n)
      : typeof n != "number" || n === 0 || Ev.has(t)
      ? t === "float"
        ? (e.cssFloat = n)
        : (e[t] = ("" + n).trim())
      : (e[t] = n + "px");
  }
  function yh(e, t, n) {
    if (t != null && typeof t != "object") throw Error(r(62));
    if (((e = e.style), n != null)) {
      for (var s in n)
        !n.hasOwnProperty(s) ||
          (t != null && t.hasOwnProperty(s)) ||
          (s.indexOf("--") === 0
            ? e.setProperty(s, "")
            : s === "float"
            ? (e.cssFloat = "")
            : (e[s] = ""));
      for (var u in t)
        (s = t[u]), t.hasOwnProperty(u) && n[u] !== s && mh(e, u, s);
    } else for (var o in t) t.hasOwnProperty(o) && mh(e, o, t[o]);
  }
  function _c(e) {
    if (e.indexOf("-") === -1) return !1;
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var wv = new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"],
    ]),
    _v =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Dr(e) {
    return _v.test("" + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e;
  }
  var Rc = null;
  function Ac(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var ls = null,
    ss = null;
  function ph(e) {
    var t = Il(e);
    if (t && (e = t.stateNode)) {
      var n = e[Ft] || null;
      e: switch (((e = t.stateNode), t.type)) {
        case "input":
          if (
            (Ec(
              e,
              n.value,
              n.defaultValue,
              n.defaultValue,
              n.checked,
              n.defaultChecked,
              n.type,
              n.name
            ),
            (t = n.name),
            n.type === "radio" && t != null)
          ) {
            for (n = e; n.parentNode; ) n = n.parentNode;
            for (
              n = n.querySelectorAll(
                'input[name="' + cn("" + t) + '"][type="radio"]'
              ),
                t = 0;
              t < n.length;
              t++
            ) {
              var s = n[t];
              if (s !== e && s.form === e.form) {
                var u = s[Ft] || null;
                if (!u) throw Error(r(90));
                Ec(
                  s,
                  u.value,
                  u.defaultValue,
                  u.defaultValue,
                  u.checked,
                  u.defaultChecked,
                  u.type,
                  u.name
                );
              }
            }
            for (t = 0; t < n.length; t++)
              (s = n[t]), s.form === e.form && oh(s);
          }
          break e;
        case "textarea":
          dh(e, n.value, n.defaultValue);
          break e;
        case "select":
          (t = n.value), t != null && ns(e, !!n.multiple, t, !1);
      }
    }
  }
  var Tc = !1;
  function gh(e, t, n) {
    if (Tc) return e(t, n);
    Tc = !0;
    try {
      var s = e(t);
      return s;
    } finally {
      if (
        ((Tc = !1),
        (ls !== null || ss !== null) &&
          (yu(), ls && ((t = ls), (e = ss), (ss = ls = null), ph(t), e)))
      )
        for (t = 0; t < e.length; t++) ph(e[t]);
    }
  }
  function ci(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var s = n[Ft] || null;
    if (s === null) return null;
    n = s[t];
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (s = !s.disabled) ||
          ((e = e.type),
          (s = !(
            e === "button" ||
            e === "input" ||
            e === "select" ||
            e === "textarea"
          ))),
          (e = !s);
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (n && typeof n != "function") throw Error(r(231, t, typeof n));
    return n;
  }
  var Cc = !1;
  if (In)
    try {
      var oi = {};
      Object.defineProperty(oi, "passive", {
        get: function () {
          Cc = !0;
        },
      }),
        window.addEventListener("test", oi, oi),
        window.removeEventListener("test", oi, oi);
    } catch {
      Cc = !1;
    }
  var Ta = null,
    Nc = null,
    Ur = null;
  function vh() {
    if (Ur) return Ur;
    var e,
      t = Nc,
      n = t.length,
      s,
      u = "value" in Ta ? Ta.value : Ta.textContent,
      o = u.length;
    for (e = 0; e < n && t[e] === u[e]; e++);
    var y = n - e;
    for (s = 1; s <= y && t[n - s] === u[o - s]; s++);
    return (Ur = u.slice(e, 1 < s ? 1 - s : void 0));
  }
  function Mr(e) {
    var t = e.keyCode;
    return (
      "charCode" in e
        ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
        : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function zr() {
    return !0;
  }
  function bh() {
    return !1;
  }
  function Qt(e) {
    function t(n, s, u, o, y) {
      (this._reactName = n),
        (this._targetInst = u),
        (this.type = s),
        (this.nativeEvent = o),
        (this.target = y),
        (this.currentTarget = null);
      for (var b in e)
        e.hasOwnProperty(b) && ((n = e[b]), (this[b] = n ? n(o) : o[b]));
      return (
        (this.isDefaultPrevented = (
          o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1
        )
          ? zr
          : bh),
        (this.isPropagationStopped = bh),
        this
      );
    }
    return (
      le(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var n = this.nativeEvent;
          n &&
            (n.preventDefault
              ? n.preventDefault()
              : typeof n.returnValue != "unknown" && (n.returnValue = !1),
            (this.isDefaultPrevented = zr));
        },
        stopPropagation: function () {
          var n = this.nativeEvent;
          n &&
            (n.stopPropagation
              ? n.stopPropagation()
              : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
            (this.isPropagationStopped = zr));
        },
        persist: function () {},
        isPersistent: zr,
      }),
      t
    );
  }
  var yl = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Lr = Qt(yl),
    fi = le({}, yl, { view: 0, detail: 0 }),
    Rv = Qt(fi),
    Oc,
    jc,
    di,
    Hr = le({}, fi, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: Uc,
      button: 0,
      buttons: 0,
      relatedTarget: function (e) {
        return e.relatedTarget === void 0
          ? e.fromElement === e.srcElement
            ? e.toElement
            : e.fromElement
          : e.relatedTarget;
      },
      movementX: function (e) {
        return "movementX" in e
          ? e.movementX
          : (e !== di &&
              (di && e.type === "mousemove"
                ? ((Oc = e.screenX - di.screenX), (jc = e.screenY - di.screenY))
                : (jc = Oc = 0),
              (di = e)),
            Oc);
      },
      movementY: function (e) {
        return "movementY" in e ? e.movementY : jc;
      },
    }),
    xh = Qt(Hr),
    Av = le({}, Hr, { dataTransfer: 0 }),
    Tv = Qt(Av),
    Cv = le({}, fi, { relatedTarget: 0 }),
    Dc = Qt(Cv),
    Nv = le({}, yl, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Ov = Qt(Nv),
    jv = le({}, yl, {
      clipboardData: function (e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      },
    }),
    Dv = Qt(jv),
    Uv = le({}, yl, { data: 0 }),
    Sh = Qt(Uv),
    Mv = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    zv = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    Lv = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function Hv(e) {
    var t = this.nativeEvent;
    return t.getModifierState
      ? t.getModifierState(e)
      : (e = Lv[e])
      ? !!t[e]
      : !1;
  }
  function Uc() {
    return Hv;
  }
  var Bv = le({}, fi, {
      key: function (e) {
        if (e.key) {
          var t = Mv[e.key] || e.key;
          if (t !== "Unidentified") return t;
        }
        return e.type === "keypress"
          ? ((e = Mr(e)), e === 13 ? "Enter" : String.fromCharCode(e))
          : e.type === "keydown" || e.type === "keyup"
          ? zv[e.keyCode] || "Unidentified"
          : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Uc,
      charCode: function (e) {
        return e.type === "keypress" ? Mr(e) : 0;
      },
      keyCode: function (e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === "keypress"
          ? Mr(e)
          : e.type === "keydown" || e.type === "keyup"
          ? e.keyCode
          : 0;
      },
    }),
    qv = Qt(Bv),
    kv = le({}, Hr, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    Eh = Qt(kv),
    Vv = le({}, fi, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Uc,
    }),
    Fv = Qt(Vv),
    Qv = le({}, yl, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Gv = Qt(Qv),
    Yv = le({}, Hr, {
      deltaX: function (e) {
        return "deltaX" in e
          ? e.deltaX
          : "wheelDeltaX" in e
          ? -e.wheelDeltaX
          : 0;
      },
      deltaY: function (e) {
        return "deltaY" in e
          ? e.deltaY
          : "wheelDeltaY" in e
          ? -e.wheelDeltaY
          : "wheelDelta" in e
          ? -e.wheelDelta
          : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    Xv = Qt(Yv),
    Pv = le({}, yl, { newState: 0, oldState: 0 }),
    Zv = Qt(Pv),
    Kv = [9, 13, 27, 32],
    Mc = In && "CompositionEvent" in window,
    hi = null;
  In && "documentMode" in document && (hi = document.documentMode);
  var $v = In && "TextEvent" in window && !hi,
    wh = In && (!Mc || (hi && 8 < hi && 11 >= hi)),
    _h = " ",
    Rh = !1;
  function Ah(e, t) {
    switch (e) {
      case "keyup":
        return Kv.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Th(e) {
    return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
  }
  var is = !1;
  function Jv(e, t) {
    switch (e) {
      case "compositionend":
        return Th(t);
      case "keypress":
        return t.which !== 32 ? null : ((Rh = !0), _h);
      case "textInput":
        return (e = t.data), e === _h && Rh ? null : e;
      default:
        return null;
    }
  }
  function Wv(e, t) {
    if (is)
      return e === "compositionend" || (!Mc && Ah(e, t))
        ? ((e = vh()), (Ur = Nc = Ta = null), (is = !1), e)
        : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return wh && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Iv = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function Ch(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Iv[e.type] : t === "textarea";
  }
  function Nh(e, t, n, s) {
    ls ? (ss ? ss.push(s) : (ss = [s])) : (ls = s),
      (t = xu(t, "onChange")),
      0 < t.length &&
        ((n = new Lr("onChange", "change", null, n, s)),
        e.push({ event: n, listeners: t }));
  }
  var mi = null,
    yi = null;
  function e1(e) {
    t0(e, 0);
  }
  function Br(e) {
    var t = ui(e);
    if (oh(t)) return e;
  }
  function Oh(e, t) {
    if (e === "change") return t;
  }
  var jh = !1;
  if (In) {
    var zc;
    if (In) {
      var Lc = "oninput" in document;
      if (!Lc) {
        var Dh = document.createElement("div");
        Dh.setAttribute("oninput", "return;"),
          (Lc = typeof Dh.oninput == "function");
      }
      zc = Lc;
    } else zc = !1;
    jh = zc && (!document.documentMode || 9 < document.documentMode);
  }
  function Uh() {
    mi && (mi.detachEvent("onpropertychange", Mh), (yi = mi = null));
  }
  function Mh(e) {
    if (e.propertyName === "value" && Br(yi)) {
      var t = [];
      Nh(t, yi, e, Ac(e)), gh(e1, t);
    }
  }
  function t1(e, t, n) {
    e === "focusin"
      ? (Uh(), (mi = t), (yi = n), mi.attachEvent("onpropertychange", Mh))
      : e === "focusout" && Uh();
  }
  function n1(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Br(yi);
  }
  function a1(e, t) {
    if (e === "click") return Br(t);
  }
  function l1(e, t) {
    if (e === "input" || e === "change") return Br(t);
  }
  function s1(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var tn = typeof Object.is == "function" ? Object.is : s1;
  function pi(e, t) {
    if (tn(e, t)) return !0;
    if (
      typeof e != "object" ||
      e === null ||
      typeof t != "object" ||
      t === null
    )
      return !1;
    var n = Object.keys(e),
      s = Object.keys(t);
    if (n.length !== s.length) return !1;
    for (s = 0; s < n.length; s++) {
      var u = n[s];
      if (!z.call(t, u) || !tn(e[u], t[u])) return !1;
    }
    return !0;
  }
  function zh(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Lh(e, t) {
    var n = zh(e);
    e = 0;
    for (var s; n; ) {
      if (n.nodeType === 3) {
        if (((s = e + n.textContent.length), e <= t && s >= t))
          return { node: n, offset: t - e };
        e = s;
      }
      e: {
        for (; n; ) {
          if (n.nextSibling) {
            n = n.nextSibling;
            break e;
          }
          n = n.parentNode;
        }
        n = void 0;
      }
      n = zh(n);
    }
  }
  function Hh(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
        ? Hh(e, t.parentNode)
        : "contains" in e
        ? e.contains(t)
        : e.compareDocumentPosition
        ? !!(e.compareDocumentPosition(t) & 16)
        : !1
      : !1;
  }
  function Bh(e) {
    e =
      e != null &&
      e.ownerDocument != null &&
      e.ownerDocument.defaultView != null
        ? e.ownerDocument.defaultView
        : window;
    for (var t = jr(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) e = t.contentWindow;
      else break;
      t = jr(e.document);
    }
    return t;
  }
  function Hc(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return (
      t &&
      ((t === "input" &&
        (e.type === "text" ||
          e.type === "search" ||
          e.type === "tel" ||
          e.type === "url" ||
          e.type === "password")) ||
        t === "textarea" ||
        e.contentEditable === "true")
    );
  }
  function i1(e, t) {
    var n = Bh(t);
    t = e.focusedElem;
    var s = e.selectionRange;
    if (
      n !== t &&
      t &&
      t.ownerDocument &&
      Hh(t.ownerDocument.documentElement, t)
    ) {
      if (s !== null && Hc(t)) {
        if (
          ((e = s.start),
          (n = s.end),
          n === void 0 && (n = e),
          "selectionStart" in t)
        )
          (t.selectionStart = e),
            (t.selectionEnd = Math.min(n, t.value.length));
        else if (
          ((n = ((e = t.ownerDocument || document) && e.defaultView) || window),
          n.getSelection)
        ) {
          n = n.getSelection();
          var u = t.textContent.length,
            o = Math.min(s.start, u);
          (s = s.end === void 0 ? o : Math.min(s.end, u)),
            !n.extend && o > s && ((u = s), (s = o), (o = u)),
            (u = Lh(t, o));
          var y = Lh(t, s);
          u &&
            y &&
            (n.rangeCount !== 1 ||
              n.anchorNode !== u.node ||
              n.anchorOffset !== u.offset ||
              n.focusNode !== y.node ||
              n.focusOffset !== y.offset) &&
            ((e = e.createRange()),
            e.setStart(u.node, u.offset),
            n.removeAllRanges(),
            o > s
              ? (n.addRange(e), n.extend(y.node, y.offset))
              : (e.setEnd(y.node, y.offset), n.addRange(e)));
        }
      }
      for (e = [], n = t; (n = n.parentNode); )
        n.nodeType === 1 &&
          e.push({ element: n, left: n.scrollLeft, top: n.scrollTop });
      for (typeof t.focus == "function" && t.focus(), t = 0; t < e.length; t++)
        (n = e[t]),
          (n.element.scrollLeft = n.left),
          (n.element.scrollTop = n.top);
    }
  }
  var r1 = In && "documentMode" in document && 11 >= document.documentMode,
    rs = null,
    Bc = null,
    gi = null,
    qc = !1;
  function qh(e, t, n) {
    var s =
      n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    qc ||
      rs == null ||
      rs !== jr(s) ||
      ((s = rs),
      "selectionStart" in s && Hc(s)
        ? (s = { start: s.selectionStart, end: s.selectionEnd })
        : ((s = (
            (s.ownerDocument && s.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (s = {
            anchorNode: s.anchorNode,
            anchorOffset: s.anchorOffset,
            focusNode: s.focusNode,
            focusOffset: s.focusOffset,
          })),
      (gi && pi(gi, s)) ||
        ((gi = s),
        (s = xu(Bc, "onSelect")),
        0 < s.length &&
          ((t = new Lr("onSelect", "select", null, t, n)),
          e.push({ event: t, listeners: s }),
          (t.target = rs))));
  }
  function pl(e, t) {
    var n = {};
    return (
      (n[e.toLowerCase()] = t.toLowerCase()),
      (n["Webkit" + e] = "webkit" + t),
      (n["Moz" + e] = "moz" + t),
      n
    );
  }
  var us = {
      animationend: pl("Animation", "AnimationEnd"),
      animationiteration: pl("Animation", "AnimationIteration"),
      animationstart: pl("Animation", "AnimationStart"),
      transitionrun: pl("Transition", "TransitionRun"),
      transitionstart: pl("Transition", "TransitionStart"),
      transitioncancel: pl("Transition", "TransitionCancel"),
      transitionend: pl("Transition", "TransitionEnd"),
    },
    kc = {},
    kh = {};
  In &&
    ((kh = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete us.animationend.animation,
      delete us.animationiteration.animation,
      delete us.animationstart.animation),
    "TransitionEvent" in window || delete us.transitionend.transition);
  function gl(e) {
    if (kc[e]) return kc[e];
    if (!us[e]) return e;
    var t = us[e],
      n;
    for (n in t) if (t.hasOwnProperty(n) && n in kh) return (kc[e] = t[n]);
    return e;
  }
  var Vh = gl("animationend"),
    Fh = gl("animationiteration"),
    Qh = gl("animationstart"),
    u1 = gl("transitionrun"),
    c1 = gl("transitionstart"),
    o1 = gl("transitioncancel"),
    Gh = gl("transitionend"),
    Yh = new Map(),
    Xh =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll scrollEnd toggle touchMove waiting wheel".split(
        " "
      );
  function An(e, t) {
    Yh.set(e, t), ml(t, [e]);
  }
  var on = [],
    cs = 0,
    Vc = 0;
  function qr() {
    for (var e = cs, t = (Vc = cs = 0); t < e; ) {
      var n = on[t];
      on[t++] = null;
      var s = on[t];
      on[t++] = null;
      var u = on[t];
      on[t++] = null;
      var o = on[t];
      if (((on[t++] = null), s !== null && u !== null)) {
        var y = s.pending;
        y === null ? (u.next = u) : ((u.next = y.next), (y.next = u)),
          (s.pending = u);
      }
      o !== 0 && Ph(n, u, o);
    }
  }
  function kr(e, t, n, s) {
    (on[cs++] = e),
      (on[cs++] = t),
      (on[cs++] = n),
      (on[cs++] = s),
      (Vc |= s),
      (e.lanes |= s),
      (e = e.alternate),
      e !== null && (e.lanes |= s);
  }
  function Fc(e, t, n, s) {
    return kr(e, t, n, s), Vr(e);
  }
  function Ca(e, t) {
    return kr(e, null, null, t), Vr(e);
  }
  function Ph(e, t, n) {
    e.lanes |= n;
    var s = e.alternate;
    s !== null && (s.lanes |= n);
    for (var u = !1, o = e.return; o !== null; )
      (o.childLanes |= n),
        (s = o.alternate),
        s !== null && (s.childLanes |= n),
        o.tag === 22 &&
          ((e = o.stateNode), e === null || e._visibility & 1 || (u = !0)),
        (e = o),
        (o = o.return);
    u &&
      t !== null &&
      e.tag === 3 &&
      ((o = e.stateNode),
      (u = 31 - en(n)),
      (o = o.hiddenUpdates),
      (e = o[u]),
      e === null ? (o[u] = [t]) : e.push(t),
      (t.lane = n | 536870912));
  }
  function Vr(e) {
    if (50 < Fi) throw ((Fi = 0), (Ko = null), Error(r(185)));
    for (var t = e.return; t !== null; ) (e = t), (t = e.return);
    return e.tag === 3 ? e.stateNode : null;
  }
  var os = {},
    Zh = new WeakMap();
  function fn(e, t) {
    if (typeof e == "object" && e !== null) {
      var n = Zh.get(e);
      return n !== void 0
        ? n
        : ((t = { value: e, source: t, stack: ce(t) }), Zh.set(e, t), t);
    }
    return { value: e, source: t, stack: ce(t) };
  }
  var fs = [],
    ds = 0,
    Fr = null,
    Qr = 0,
    dn = [],
    hn = 0,
    vl = null,
    ta = 1,
    na = "";
  function bl(e, t) {
    (fs[ds++] = Qr), (fs[ds++] = Fr), (Fr = e), (Qr = t);
  }
  function Kh(e, t, n) {
    (dn[hn++] = ta), (dn[hn++] = na), (dn[hn++] = vl), (vl = e);
    var s = ta;
    e = na;
    var u = 32 - en(s) - 1;
    (s &= ~(1 << u)), (n += 1);
    var o = 32 - en(t) + u;
    if (30 < o) {
      var y = u - (u % 5);
      (o = (s & ((1 << y) - 1)).toString(32)),
        (s >>= y),
        (u -= y),
        (ta = (1 << (32 - en(t) + u)) | (n << u) | s),
        (na = o + e);
    } else (ta = (1 << o) | (n << u) | s), (na = e);
  }
  function Qc(e) {
    e.return !== null && (bl(e, 1), Kh(e, 1, 0));
  }
  function Gc(e) {
    for (; e === Fr; )
      (Fr = fs[--ds]), (fs[ds] = null), (Qr = fs[--ds]), (fs[ds] = null);
    for (; e === vl; )
      (vl = dn[--hn]),
        (dn[hn] = null),
        (na = dn[--hn]),
        (dn[hn] = null),
        (ta = dn[--hn]),
        (dn[hn] = null);
  }
  var Lt = null,
    Rt = null,
    He = !1,
    Tn = null,
    qn = !1,
    Yc = Error(r(519));
  function xl(e) {
    var t = Error(r(418, ""));
    throw (xi(fn(t, e)), Yc);
  }
  function $h(e) {
    var t = e.stateNode,
      n = e.type,
      s = e.memoizedProps;
    switch (((t[Nt] = e), (t[Ft] = s), n)) {
      case "dialog":
        je("cancel", t), je("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        je("load", t);
        break;
      case "video":
      case "audio":
        for (n = 0; n < Gi.length; n++) je(Gi[n], t);
        break;
      case "source":
        je("error", t);
        break;
      case "img":
      case "image":
      case "link":
        je("error", t), je("load", t);
        break;
      case "details":
        je("toggle", t);
        break;
      case "input":
        je("invalid", t),
          fh(
            t,
            s.value,
            s.defaultValue,
            s.checked,
            s.defaultChecked,
            s.type,
            s.name,
            !0
          ),
          Or(t);
        break;
      case "select":
        je("invalid", t);
        break;
      case "textarea":
        je("invalid", t), hh(t, s.value, s.defaultValue, s.children), Or(t);
    }
    (n = s.children),
      (typeof n != "string" && typeof n != "number" && typeof n != "bigint") ||
      t.textContent === "" + n ||
      s.suppressHydrationWarning === !0 ||
      s0(t.textContent, n)
        ? (s.popover != null && (je("beforetoggle", t), je("toggle", t)),
          s.onScroll != null && je("scroll", t),
          s.onScrollEnd != null && je("scrollend", t),
          s.onClick != null && (t.onclick = Su),
          (t = !0))
        : (t = !1),
      t || xl(e);
  }
  function Jh(e) {
    for (Lt = e.return; Lt; )
      switch (Lt.tag) {
        case 3:
        case 27:
          qn = !0;
          return;
        case 5:
        case 13:
          qn = !1;
          return;
        default:
          Lt = Lt.return;
      }
  }
  function vi(e) {
    if (e !== Lt) return !1;
    if (!He) return Jh(e), (He = !0), !1;
    var t = !1,
      n;
    if (
      ((n = e.tag !== 3 && e.tag !== 27) &&
        ((n = e.tag === 5) &&
          ((n = e.type),
          (n =
            !(n !== "form" && n !== "button") || hf(e.type, e.memoizedProps))),
        (n = !n)),
      n && (t = !0),
      t && Rt && xl(e),
      Jh(e),
      e.tag === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(r(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8)
            if (((n = e.data), n === "/$")) {
              if (t === 0) {
                Rt = Nn(e.nextSibling);
                break e;
              }
              t--;
            } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
          e = e.nextSibling;
        }
        Rt = null;
      }
    } else Rt = Lt ? Nn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function bi() {
    (Rt = Lt = null), (He = !1);
  }
  function xi(e) {
    Tn === null ? (Tn = [e]) : Tn.push(e);
  }
  var Si = Error(r(460)),
    Wh = Error(r(474)),
    Xc = { then: function () {} };
  function Ih(e) {
    return (e = e.status), e === "fulfilled" || e === "rejected";
  }
  function Gr() {}
  function em(e, t, n) {
    switch (
      ((n = e[n]),
      n === void 0 ? e.push(t) : n !== t && (t.then(Gr, Gr), (t = n)),
      t.status)
    ) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw ((e = t.reason), e === Si ? Error(r(483)) : e);
      default:
        if (typeof t.status == "string") t.then(Gr, Gr);
        else {
          if (((e = Xe), e !== null && 100 < e.shellSuspendCounter))
            throw Error(r(482));
          (e = t),
            (e.status = "pending"),
            e.then(
              function (s) {
                if (t.status === "pending") {
                  var u = t;
                  (u.status = "fulfilled"), (u.value = s);
                }
              },
              function (s) {
                if (t.status === "pending") {
                  var u = t;
                  (u.status = "rejected"), (u.reason = s);
                }
              }
            );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw ((e = t.reason), e === Si ? Error(r(483)) : e);
        }
        throw ((Ei = t), Si);
    }
  }
  var Ei = null;
  function tm() {
    if (Ei === null) throw Error(r(459));
    var e = Ei;
    return (Ei = null), e;
  }
  var hs = null,
    wi = 0;
  function Yr(e) {
    var t = wi;
    return (wi += 1), hs === null && (hs = []), em(hs, e, t);
  }
  function _i(e, t) {
    (t = t.props.ref), (e.ref = t !== void 0 ? t : null);
  }
  function Xr(e, t) {
    throw t.$$typeof === f
      ? Error(r(525))
      : ((e = Object.prototype.toString.call(t)),
        Error(
          r(
            31,
            e === "[object Object]"
              ? "object with keys {" + Object.keys(t).join(", ") + "}"
              : e
          )
        ));
  }
  function nm(e) {
    var t = e._init;
    return t(e._payload);
  }
  function am(e) {
    function t(U, N) {
      if (e) {
        var M = U.deletions;
        M === null ? ((U.deletions = [N]), (U.flags |= 16)) : M.push(N);
      }
    }
    function n(U, N) {
      if (!e) return null;
      for (; N !== null; ) t(U, N), (N = N.sibling);
      return null;
    }
    function s(U) {
      for (var N = new Map(); U !== null; )
        U.key !== null ? N.set(U.key, U) : N.set(U.index, U), (U = U.sibling);
      return N;
    }
    function u(U, N) {
      return (U = ka(U, N)), (U.index = 0), (U.sibling = null), U;
    }
    function o(U, N, M) {
      return (
        (U.index = M),
        e
          ? ((M = U.alternate),
            M !== null
              ? ((M = M.index), M < N ? ((U.flags |= 33554434), N) : M)
              : ((U.flags |= 33554434), N))
          : ((U.flags |= 1048576), N)
      );
    }
    function y(U) {
      return e && U.alternate === null && (U.flags |= 33554434), U;
    }
    function b(U, N, M, G) {
      return N === null || N.tag !== 6
        ? ((N = Vo(M, U.mode, G)), (N.return = U), N)
        : ((N = u(N, M)), (N.return = U), N);
    }
    function S(U, N, M, G) {
      var se = M.type;
      return se === h
        ? Q(U, N, M.props.children, G, M.key)
        : N !== null &&
          (N.elementType === se ||
            (typeof se == "object" &&
              se !== null &&
              se.$$typeof === B &&
              nm(se) === N.type))
        ? ((N = u(N, M.props)), _i(N, M), (N.return = U), N)
        : ((N = ou(M.type, M.key, M.props, null, U.mode, G)),
          _i(N, M),
          (N.return = U),
          N);
    }
    function j(U, N, M, G) {
      return N === null ||
        N.tag !== 4 ||
        N.stateNode.containerInfo !== M.containerInfo ||
        N.stateNode.implementation !== M.implementation
        ? ((N = Fo(M, U.mode, G)), (N.return = U), N)
        : ((N = u(N, M.children || [])), (N.return = U), N);
    }
    function Q(U, N, M, G, se) {
      return N === null || N.tag !== 7
        ? ((N = Ol(M, U.mode, G, se)), (N.return = U), N)
        : ((N = u(N, M)), (N.return = U), N);
    }
    function P(U, N, M) {
      if (
        (typeof N == "string" && N !== "") ||
        typeof N == "number" ||
        typeof N == "bigint"
      )
        return (N = Vo("" + N, U.mode, M)), (N.return = U), N;
      if (typeof N == "object" && N !== null) {
        switch (N.$$typeof) {
          case d:
            return (
              (M = ou(N.type, N.key, N.props, null, U.mode, M)),
              _i(M, N),
              (M.return = U),
              M
            );
          case m:
            return (N = Fo(N, U.mode, M)), (N.return = U), N;
          case B:
            var G = N._init;
            return (N = G(N._payload)), P(U, N, M);
        }
        if (me(N) || ee(N))
          return (N = Ol(N, U.mode, M, null)), (N.return = U), N;
        if (typeof N.then == "function") return P(U, Yr(N), M);
        if (N.$$typeof === O) return P(U, ru(U, N), M);
        Xr(U, N);
      }
      return null;
    }
    function L(U, N, M, G) {
      var se = N !== null ? N.key : null;
      if (
        (typeof M == "string" && M !== "") ||
        typeof M == "number" ||
        typeof M == "bigint"
      )
        return se !== null ? null : b(U, N, "" + M, G);
      if (typeof M == "object" && M !== null) {
        switch (M.$$typeof) {
          case d:
            return M.key === se ? S(U, N, M, G) : null;
          case m:
            return M.key === se ? j(U, N, M, G) : null;
          case B:
            return (se = M._init), (M = se(M._payload)), L(U, N, M, G);
        }
        if (me(M) || ee(M)) return se !== null ? null : Q(U, N, M, G, null);
        if (typeof M.then == "function") return L(U, N, Yr(M), G);
        if (M.$$typeof === O) return L(U, N, ru(U, M), G);
        Xr(U, M);
      }
      return null;
    }
    function F(U, N, M, G, se) {
      if (
        (typeof G == "string" && G !== "") ||
        typeof G == "number" ||
        typeof G == "bigint"
      )
        return (U = U.get(M) || null), b(N, U, "" + G, se);
      if (typeof G == "object" && G !== null) {
        switch (G.$$typeof) {
          case d:
            return (
              (U = U.get(G.key === null ? M : G.key) || null), S(N, U, G, se)
            );
          case m:
            return (
              (U = U.get(G.key === null ? M : G.key) || null), j(N, U, G, se)
            );
          case B:
            var Te = G._init;
            return (G = Te(G._payload)), F(U, N, M, G, se);
        }
        if (me(G) || ee(G)) return (U = U.get(M) || null), Q(N, U, G, se, null);
        if (typeof G.then == "function") return F(U, N, M, Yr(G), se);
        if (G.$$typeof === O) return F(U, N, M, ru(N, G), se);
        Xr(N, G);
      }
      return null;
    }
    function ue(U, N, M, G) {
      for (
        var se = null, Te = null, oe = N, ge = (N = 0), wt = null;
        oe !== null && ge < M.length;
        ge++
      ) {
        oe.index > ge ? ((wt = oe), (oe = null)) : (wt = oe.sibling);
        var Be = L(U, oe, M[ge], G);
        if (Be === null) {
          oe === null && (oe = wt);
          break;
        }
        e && oe && Be.alternate === null && t(U, oe),
          (N = o(Be, N, ge)),
          Te === null ? (se = Be) : (Te.sibling = Be),
          (Te = Be),
          (oe = wt);
      }
      if (ge === M.length) return n(U, oe), He && bl(U, ge), se;
      if (oe === null) {
        for (; ge < M.length; ge++)
          (oe = P(U, M[ge], G)),
            oe !== null &&
              ((N = o(oe, N, ge)),
              Te === null ? (se = oe) : (Te.sibling = oe),
              (Te = oe));
        return He && bl(U, ge), se;
      }
      for (oe = s(oe); ge < M.length; ge++)
        (wt = F(oe, U, ge, M[ge], G)),
          wt !== null &&
            (e &&
              wt.alternate !== null &&
              oe.delete(wt.key === null ? ge : wt.key),
            (N = o(wt, N, ge)),
            Te === null ? (se = wt) : (Te.sibling = wt),
            (Te = wt));
      return (
        e &&
          oe.forEach(function (Pa) {
            return t(U, Pa);
          }),
        He && bl(U, ge),
        se
      );
    }
    function ve(U, N, M, G) {
      if (M == null) throw Error(r(151));
      for (
        var se = null,
          Te = null,
          oe = N,
          ge = (N = 0),
          wt = null,
          Be = M.next();
        oe !== null && !Be.done;
        ge++, Be = M.next()
      ) {
        oe.index > ge ? ((wt = oe), (oe = null)) : (wt = oe.sibling);
        var Pa = L(U, oe, Be.value, G);
        if (Pa === null) {
          oe === null && (oe = wt);
          break;
        }
        e && oe && Pa.alternate === null && t(U, oe),
          (N = o(Pa, N, ge)),
          Te === null ? (se = Pa) : (Te.sibling = Pa),
          (Te = Pa),
          (oe = wt);
      }
      if (Be.done) return n(U, oe), He && bl(U, ge), se;
      if (oe === null) {
        for (; !Be.done; ge++, Be = M.next())
          (Be = P(U, Be.value, G)),
            Be !== null &&
              ((N = o(Be, N, ge)),
              Te === null ? (se = Be) : (Te.sibling = Be),
              (Te = Be));
        return He && bl(U, ge), se;
      }
      for (oe = s(oe); !Be.done; ge++, Be = M.next())
        (Be = F(oe, U, ge, Be.value, G)),
          Be !== null &&
            (e &&
              Be.alternate !== null &&
              oe.delete(Be.key === null ? ge : Be.key),
            (N = o(Be, N, ge)),
            Te === null ? (se = Be) : (Te.sibling = Be),
            (Te = Be));
      return (
        e &&
          oe.forEach(function (_b) {
            return t(U, _b);
          }),
        He && bl(U, ge),
        se
      );
    }
    function nt(U, N, M, G) {
      if (
        (typeof M == "object" &&
          M !== null &&
          M.type === h &&
          M.key === null &&
          (M = M.props.children),
        typeof M == "object" && M !== null)
      ) {
        switch (M.$$typeof) {
          case d:
            e: {
              for (var se = M.key; N !== null; ) {
                if (N.key === se) {
                  if (((se = M.type), se === h)) {
                    if (N.tag === 7) {
                      n(U, N.sibling),
                        (G = u(N, M.props.children)),
                        (G.return = U),
                        (U = G);
                      break e;
                    }
                  } else if (
                    N.elementType === se ||
                    (typeof se == "object" &&
                      se !== null &&
                      se.$$typeof === B &&
                      nm(se) === N.type)
                  ) {
                    n(U, N.sibling),
                      (G = u(N, M.props)),
                      _i(G, M),
                      (G.return = U),
                      (U = G);
                    break e;
                  }
                  n(U, N);
                  break;
                } else t(U, N);
                N = N.sibling;
              }
              M.type === h
                ? ((G = Ol(M.props.children, U.mode, G, M.key)),
                  (G.return = U),
                  (U = G))
                : ((G = ou(M.type, M.key, M.props, null, U.mode, G)),
                  _i(G, M),
                  (G.return = U),
                  (U = G));
            }
            return y(U);
          case m:
            e: {
              for (se = M.key; N !== null; ) {
                if (N.key === se)
                  if (
                    N.tag === 4 &&
                    N.stateNode.containerInfo === M.containerInfo &&
                    N.stateNode.implementation === M.implementation
                  ) {
                    n(U, N.sibling),
                      (G = u(N, M.children || [])),
                      (G.return = U),
                      (U = G);
                    break e;
                  } else {
                    n(U, N);
                    break;
                  }
                else t(U, N);
                N = N.sibling;
              }
              (G = Fo(M, U.mode, G)), (G.return = U), (U = G);
            }
            return y(U);
          case B:
            return (se = M._init), (M = se(M._payload)), nt(U, N, M, G);
        }
        if (me(M)) return ue(U, N, M, G);
        if (ee(M)) {
          if (((se = ee(M)), typeof se != "function")) throw Error(r(150));
          return (M = se.call(M)), ve(U, N, M, G);
        }
        if (typeof M.then == "function") return nt(U, N, Yr(M), G);
        if (M.$$typeof === O) return nt(U, N, ru(U, M), G);
        Xr(U, M);
      }
      return (typeof M == "string" && M !== "") ||
        typeof M == "number" ||
        typeof M == "bigint"
        ? ((M = "" + M),
          N !== null && N.tag === 6
            ? (n(U, N.sibling), (G = u(N, M)), (G.return = U), (U = G))
            : (n(U, N), (G = Vo(M, U.mode, G)), (G.return = U), (U = G)),
          y(U))
        : n(U, N);
    }
    return function (U, N, M, G) {
      try {
        wi = 0;
        var se = nt(U, N, M, G);
        return (hs = null), se;
      } catch (oe) {
        if (oe === Si) throw oe;
        var Te = gn(29, oe, null, U.mode);
        return (Te.lanes = G), (Te.return = U), Te;
      } finally {
      }
    };
  }
  var Sl = am(!0),
    lm = am(!1),
    ms = Ue(null),
    Pr = Ue(0);
  function sm(e, t) {
    (e = ha), Ye(Pr, e), Ye(ms, t), (ha = e | t.baseLanes);
  }
  function Pc() {
    Ye(Pr, ha), Ye(ms, ms.current);
  }
  function Zc() {
    (ha = Pr.current), Je(ms), Je(Pr);
  }
  var mn = Ue(null),
    kn = null;
  function Na(e) {
    var t = e.alternate;
    Ye(yt, yt.current & 1),
      Ye(mn, e),
      kn === null &&
        (t === null || ms.current !== null || t.memoizedState !== null) &&
        (kn = e);
  }
  function im(e) {
    if (e.tag === 22) {
      if ((Ye(yt, yt.current), Ye(mn, e), kn === null)) {
        var t = e.alternate;
        t !== null && t.memoizedState !== null && (kn = e);
      }
    } else Oa();
  }
  function Oa() {
    Ye(yt, yt.current), Ye(mn, mn.current);
  }
  function aa(e) {
    Je(mn), kn === e && (kn = null), Je(yt);
  }
  var yt = Ue(0);
  function Zr(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (
          n !== null &&
          ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")
        )
          return t;
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
        if (t.flags & 128) return t;
      } else if (t.child !== null) {
        (t.child.return = t), (t = t.child);
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
    return null;
  }
  var f1 =
      typeof AbortController < "u"
        ? AbortController
        : function () {
            var e = [],
              t = (this.signal = {
                aborted: !1,
                addEventListener: function (n, s) {
                  e.push(s);
                },
              });
            this.abort = function () {
              (t.aborted = !0),
                e.forEach(function (n) {
                  return n();
                });
            };
          },
    d1 = a.unstable_scheduleCallback,
    h1 = a.unstable_NormalPriority,
    pt = {
      $$typeof: O,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function Kc() {
    return { controller: new f1(), data: new Map(), refCount: 0 };
  }
  function Ri(e) {
    e.refCount--,
      e.refCount === 0 &&
        d1(h1, function () {
          e.controller.abort();
        });
  }
  var Ai = null,
    $c = 0,
    ys = 0,
    ps = null;
  function m1(e, t) {
    if (Ai === null) {
      var n = (Ai = []);
      ($c = 0),
        (ys = af()),
        (ps = {
          status: "pending",
          value: void 0,
          then: function (s) {
            n.push(s);
          },
        });
    }
    return $c++, t.then(rm, rm), t;
  }
  function rm() {
    if (--$c === 0 && Ai !== null) {
      ps !== null && (ps.status = "fulfilled");
      var e = Ai;
      (Ai = null), (ys = 0), (ps = null);
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function y1(e, t) {
    var n = [],
      s = {
        status: "pending",
        value: null,
        reason: null,
        then: function (u) {
          n.push(u);
        },
      };
    return (
      e.then(
        function () {
          (s.status = "fulfilled"), (s.value = t);
          for (var u = 0; u < n.length; u++) (0, n[u])(t);
        },
        function (u) {
          for (s.status = "rejected", s.reason = u, u = 0; u < n.length; u++)
            (0, n[u])(void 0);
        }
      ),
      s
    );
  }
  var um = X.S;
  X.S = function (e, t) {
    typeof t == "object" &&
      t !== null &&
      typeof t.then == "function" &&
      m1(e, t),
      um !== null && um(e, t);
  };
  var El = Ue(null);
  function Jc() {
    var e = El.current;
    return e !== null ? e : Xe.pooledCache;
  }
  function Kr(e, t) {
    t === null ? Ye(El, El.current) : Ye(El, t.pool);
  }
  function cm() {
    var e = Jc();
    return e === null ? null : { parent: pt._currentValue, pool: e };
  }
  var ja = 0,
    Ae = null,
    Fe = null,
    ot = null,
    $r = !1,
    gs = !1,
    wl = !1,
    Jr = 0,
    Ti = 0,
    vs = null,
    p1 = 0;
  function it() {
    throw Error(r(321));
  }
  function Wc(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!tn(e[n], t[n])) return !1;
    return !0;
  }
  function Ic(e, t, n, s, u, o) {
    return (
      (ja = o),
      (Ae = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (X.H = e === null || e.memoizedState === null ? _l : Da),
      (wl = !1),
      (o = n(s, u)),
      (wl = !1),
      gs && (o = fm(t, n, s, u)),
      om(e),
      o
    );
  }
  function om(e) {
    X.H = Vn;
    var t = Fe !== null && Fe.next !== null;
    if (((ja = 0), (ot = Fe = Ae = null), ($r = !1), (Ti = 0), (vs = null), t))
      throw Error(r(300));
    e === null ||
      St ||
      ((e = e.dependencies), e !== null && iu(e) && (St = !0));
  }
  function fm(e, t, n, s) {
    Ae = e;
    var u = 0;
    do {
      if ((gs && (vs = null), (Ti = 0), (gs = !1), 25 <= u))
        throw Error(r(301));
      if (((u += 1), (ot = Fe = null), e.updateQueue != null)) {
        var o = e.updateQueue;
        (o.lastEffect = null),
          (o.events = null),
          (o.stores = null),
          o.memoCache != null && (o.memoCache.index = 0);
      }
      (X.H = Rl), (o = t(n, s));
    } while (gs);
    return o;
  }
  function g1() {
    var e = X.H,
      t = e.useState()[0];
    return (
      (t = typeof t.then == "function" ? Ci(t) : t),
      (e = e.useState()[0]),
      (Fe !== null ? Fe.memoizedState : null) !== e && (Ae.flags |= 1024),
      t
    );
  }
  function eo() {
    var e = Jr !== 0;
    return (Jr = 0), e;
  }
  function to(e, t, n) {
    (t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~n);
  }
  function no(e) {
    if ($r) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), (e = e.next);
      }
      $r = !1;
    }
    (ja = 0), (ot = Fe = Ae = null), (gs = !1), (Ti = Jr = 0), (vs = null);
  }
  function Gt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return ot === null ? (Ae.memoizedState = ot = e) : (ot = ot.next = e), ot;
  }
  function ft() {
    if (Fe === null) {
      var e = Ae.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Fe.next;
    var t = ot === null ? Ae.memoizedState : ot.next;
    if (t !== null) (ot = t), (Fe = e);
    else {
      if (e === null)
        throw Ae.alternate === null ? Error(r(467)) : Error(r(310));
      (Fe = e),
        (e = {
          memoizedState: Fe.memoizedState,
          baseState: Fe.baseState,
          baseQueue: Fe.baseQueue,
          queue: Fe.queue,
          next: null,
        }),
        ot === null ? (Ae.memoizedState = ot = e) : (ot = ot.next = e);
    }
    return ot;
  }
  var Wr;
  Wr = function () {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  };
  function Ci(e) {
    var t = Ti;
    return (
      (Ti += 1),
      vs === null && (vs = []),
      (e = em(vs, e, t)),
      (t = Ae),
      (ot === null ? t.memoizedState : ot.next) === null &&
        ((t = t.alternate),
        (X.H = t === null || t.memoizedState === null ? _l : Da)),
      e
    );
  }
  function Ir(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Ci(e);
      if (e.$$typeof === O) return Ot(e);
    }
    throw Error(r(438, String(e)));
  }
  function ao(e) {
    var t = null,
      n = Ae.updateQueue;
    if ((n !== null && (t = n.memoCache), t == null)) {
      var s = Ae.alternate;
      s !== null &&
        ((s = s.updateQueue),
        s !== null &&
          ((s = s.memoCache),
          s != null &&
            (t = {
              data: s.data.map(function (u) {
                return u.slice();
              }),
              index: 0,
            })));
    }
    if (
      (t == null && (t = { data: [], index: 0 }),
      n === null && ((n = Wr()), (Ae.updateQueue = n)),
      (n.memoCache = t),
      (n = t.data[t.index]),
      n === void 0)
    )
      for (n = t.data[t.index] = Array(e), s = 0; s < e; s++) n[s] = ne;
    return t.index++, n;
  }
  function la(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function eu(e) {
    var t = ft();
    return lo(t, Fe, e);
  }
  function lo(e, t, n) {
    var s = e.queue;
    if (s === null) throw Error(r(311));
    s.lastRenderedReducer = n;
    var u = e.baseQueue,
      o = s.pending;
    if (o !== null) {
      if (u !== null) {
        var y = u.next;
        (u.next = o.next), (o.next = y);
      }
      (t.baseQueue = u = o), (s.pending = null);
    }
    if (((o = e.baseState), u === null)) e.memoizedState = o;
    else {
      t = u.next;
      var b = (y = null),
        S = null,
        j = t,
        Q = !1;
      do {
        var P = j.lane & -536870913;
        if (P !== j.lane ? (Me & P) === P : (ja & P) === P) {
          var L = j.revertLane;
          if (L === 0)
            S !== null &&
              (S = S.next =
                {
                  lane: 0,
                  revertLane: 0,
                  action: j.action,
                  hasEagerState: j.hasEagerState,
                  eagerState: j.eagerState,
                  next: null,
                }),
              P === ys && (Q = !0);
          else if ((ja & L) === L) {
            (j = j.next), L === ys && (Q = !0);
            continue;
          } else
            (P = {
              lane: 0,
              revertLane: j.revertLane,
              action: j.action,
              hasEagerState: j.hasEagerState,
              eagerState: j.eagerState,
              next: null,
            }),
              S === null ? ((b = S = P), (y = o)) : (S = S.next = P),
              (Ae.lanes |= L),
              (Va |= L);
          (P = j.action),
            wl && n(o, P),
            (o = j.hasEagerState ? j.eagerState : n(o, P));
        } else
          (L = {
            lane: P,
            revertLane: j.revertLane,
            action: j.action,
            hasEagerState: j.hasEagerState,
            eagerState: j.eagerState,
            next: null,
          }),
            S === null ? ((b = S = L), (y = o)) : (S = S.next = L),
            (Ae.lanes |= P),
            (Va |= P);
        j = j.next;
      } while (j !== null && j !== t);
      if (
        (S === null ? (y = o) : (S.next = b),
        !tn(o, e.memoizedState) && ((St = !0), Q && ((n = ps), n !== null)))
      )
        throw n;
      (e.memoizedState = o),
        (e.baseState = y),
        (e.baseQueue = S),
        (s.lastRenderedState = o);
    }
    return u === null && (s.lanes = 0), [e.memoizedState, s.dispatch];
  }
  function so(e) {
    var t = ft(),
      n = t.queue;
    if (n === null) throw Error(r(311));
    n.lastRenderedReducer = e;
    var s = n.dispatch,
      u = n.pending,
      o = t.memoizedState;
    if (u !== null) {
      n.pending = null;
      var y = (u = u.next);
      do (o = e(o, y.action)), (y = y.next);
      while (y !== u);
      tn(o, t.memoizedState) || (St = !0),
        (t.memoizedState = o),
        t.baseQueue === null && (t.baseState = o),
        (n.lastRenderedState = o);
    }
    return [o, s];
  }
  function dm(e, t, n) {
    var s = Ae,
      u = ft(),
      o = He;
    if (o) {
      if (n === void 0) throw Error(r(407));
      n = n();
    } else n = t();
    var y = !tn((Fe || u).memoizedState, n);
    if (
      (y && ((u.memoizedState = n), (St = !0)),
      (u = u.queue),
      uo(ym.bind(null, s, u, e), [e]),
      u.getSnapshot !== t || y || (ot !== null && ot.memoizedState.tag & 1))
    ) {
      if (
        ((s.flags |= 2048),
        bs(9, mm.bind(null, s, u, n, t), { destroy: void 0 }, null),
        Xe === null)
      )
        throw Error(r(349));
      o || ja & 60 || hm(s, t, n);
    }
    return n;
  }
  function hm(e, t, n) {
    (e.flags |= 16384),
      (e = { getSnapshot: t, value: n }),
      (t = Ae.updateQueue),
      t === null
        ? ((t = Wr()), (Ae.updateQueue = t), (t.stores = [e]))
        : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
  }
  function mm(e, t, n, s) {
    (t.value = n), (t.getSnapshot = s), pm(t) && gm(e);
  }
  function ym(e, t, n) {
    return n(function () {
      pm(t) && gm(e);
    });
  }
  function pm(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !tn(e, n);
    } catch {
      return !0;
    }
  }
  function gm(e) {
    var t = Ca(e, 2);
    t !== null && Ht(t, e, 2);
  }
  function io(e) {
    var t = Gt();
    if (typeof e == "function") {
      var n = e;
      if (((e = n()), wl)) {
        Ra(!0);
        try {
          n();
        } finally {
          Ra(!1);
        }
      }
    }
    return (
      (t.memoizedState = t.baseState = e),
      (t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: la,
        lastRenderedState: e,
      }),
      t
    );
  }
  function vm(e, t, n, s) {
    return (e.baseState = n), lo(e, Fe, typeof s == "function" ? s : la);
  }
  function v1(e, t, n, s, u) {
    if (au(e)) throw Error(r(485));
    if (((e = t.action), e !== null)) {
      var o = {
        payload: u,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (y) {
          o.listeners.push(y);
        },
      };
      X.T !== null ? n(!0) : (o.isTransition = !1),
        s(o),
        (n = t.pending),
        n === null
          ? ((o.next = t.pending = o), bm(t, o))
          : ((o.next = n.next), (t.pending = n.next = o));
    }
  }
  function bm(e, t) {
    var n = t.action,
      s = t.payload,
      u = e.state;
    if (t.isTransition) {
      var o = X.T,
        y = {};
      X.T = y;
      try {
        var b = n(u, s),
          S = X.S;
        S !== null && S(y, b), xm(e, t, b);
      } catch (j) {
        ro(e, t, j);
      } finally {
        X.T = o;
      }
    } else
      try {
        (o = n(u, s)), xm(e, t, o);
      } catch (j) {
        ro(e, t, j);
      }
  }
  function xm(e, t, n) {
    n !== null && typeof n == "object" && typeof n.then == "function"
      ? n.then(
          function (s) {
            Sm(e, t, s);
          },
          function (s) {
            return ro(e, t, s);
          }
        )
      : Sm(e, t, n);
  }
  function Sm(e, t, n) {
    (t.status = "fulfilled"),
      (t.value = n),
      Em(t),
      (e.state = n),
      (t = e.pending),
      t !== null &&
        ((n = t.next),
        n === t ? (e.pending = null) : ((n = n.next), (t.next = n), bm(e, n)));
  }
  function ro(e, t, n) {
    var s = e.pending;
    if (((e.pending = null), s !== null)) {
      s = s.next;
      do (t.status = "rejected"), (t.reason = n), Em(t), (t = t.next);
      while (t !== s);
    }
    e.action = null;
  }
  function Em(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function wm(e, t) {
    return t;
  }
  function _m(e, t) {
    if (He) {
      var n = Xe.formState;
      if (n !== null) {
        e: {
          var s = Ae;
          if (He) {
            if (Rt) {
              t: {
                for (var u = Rt, o = qn; u.nodeType !== 8; ) {
                  if (!o) {
                    u = null;
                    break t;
                  }
                  if (((u = Nn(u.nextSibling)), u === null)) {
                    u = null;
                    break t;
                  }
                }
                (o = u.data), (u = o === "F!" || o === "F" ? u : null);
              }
              if (u) {
                (Rt = Nn(u.nextSibling)), (s = u.data === "F!");
                break e;
              }
            }
            xl(s);
          }
          s = !1;
        }
        s && (t = n[0]);
      }
    }
    return (
      (n = Gt()),
      (n.memoizedState = n.baseState = t),
      (s = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: wm,
        lastRenderedState: t,
      }),
      (n.queue = s),
      (n = Fm.bind(null, Ae, s)),
      (s.dispatch = n),
      (s = io(!1)),
      (o = mo.bind(null, Ae, !1, s.queue)),
      (s = Gt()),
      (u = { state: t, dispatch: null, action: e, pending: null }),
      (s.queue = u),
      (n = v1.bind(null, Ae, u, o, n)),
      (u.dispatch = n),
      (s.memoizedState = e),
      [t, n, !1]
    );
  }
  function Rm(e) {
    var t = ft();
    return Am(t, Fe, e);
  }
  function Am(e, t, n) {
    (t = lo(e, t, wm)[0]),
      (e = eu(la)[0]),
      (t =
        typeof t == "object" && t !== null && typeof t.then == "function"
          ? Ci(t)
          : t);
    var s = ft(),
      u = s.queue,
      o = u.dispatch;
    return (
      n !== s.memoizedState &&
        ((Ae.flags |= 2048),
        bs(9, b1.bind(null, u, n), { destroy: void 0 }, null)),
      [t, o, e]
    );
  }
  function b1(e, t) {
    e.action = t;
  }
  function Tm(e) {
    var t = ft(),
      n = Fe;
    if (n !== null) return Am(t, n, e);
    ft(), (t = t.memoizedState), (n = ft());
    var s = n.queue.dispatch;
    return (n.memoizedState = e), [t, s, !1];
  }
  function bs(e, t, n, s) {
    return (
      (e = { tag: e, create: t, inst: n, deps: s, next: null }),
      (t = Ae.updateQueue),
      t === null && ((t = Wr()), (Ae.updateQueue = t)),
      (n = t.lastEffect),
      n === null
        ? (t.lastEffect = e.next = e)
        : ((s = n.next), (n.next = e), (e.next = s), (t.lastEffect = e)),
      e
    );
  }
  function Cm() {
    return ft().memoizedState;
  }
  function tu(e, t, n, s) {
    var u = Gt();
    (Ae.flags |= e),
      (u.memoizedState = bs(
        1 | t,
        n,
        { destroy: void 0 },
        s === void 0 ? null : s
      ));
  }
  function nu(e, t, n, s) {
    var u = ft();
    s = s === void 0 ? null : s;
    var o = u.memoizedState.inst;
    Fe !== null && s !== null && Wc(s, Fe.memoizedState.deps)
      ? (u.memoizedState = bs(t, n, o, s))
      : ((Ae.flags |= e), (u.memoizedState = bs(1 | t, n, o, s)));
  }
  function Nm(e, t) {
    tu(8390656, 8, e, t);
  }
  function uo(e, t) {
    nu(2048, 8, e, t);
  }
  function Om(e, t) {
    return nu(4, 2, e, t);
  }
  function jm(e, t) {
    return nu(4, 4, e, t);
  }
  function Dm(e, t) {
    if (typeof t == "function") {
      e = e();
      var n = t(e);
      return function () {
        typeof n == "function" ? n() : t(null);
      };
    }
    if (t != null)
      return (
        (e = e()),
        (t.current = e),
        function () {
          t.current = null;
        }
      );
  }
  function Um(e, t, n) {
    (n = n != null ? n.concat([e]) : null), nu(4, 4, Dm.bind(null, t, e), n);
  }
  function co() {}
  function Mm(e, t) {
    var n = ft();
    t = t === void 0 ? null : t;
    var s = n.memoizedState;
    return t !== null && Wc(t, s[1]) ? s[0] : ((n.memoizedState = [e, t]), e);
  }
  function zm(e, t) {
    var n = ft();
    t = t === void 0 ? null : t;
    var s = n.memoizedState;
    if (t !== null && Wc(t, s[1])) return s[0];
    if (((s = e()), wl)) {
      Ra(!0);
      try {
        e();
      } finally {
        Ra(!1);
      }
    }
    return (n.memoizedState = [s, t]), s;
  }
  function oo(e, t, n) {
    return n === void 0 || ja & 1073741824
      ? (e.memoizedState = t)
      : ((e.memoizedState = n), (e = Hy()), (Ae.lanes |= e), (Va |= e), n);
  }
  function Lm(e, t, n, s) {
    return tn(n, t)
      ? n
      : ms.current !== null
      ? ((e = oo(e, n, s)), tn(e, t) || (St = !0), e)
      : ja & 42
      ? ((e = Hy()), (Ae.lanes |= e), (Va |= e), t)
      : ((St = !0), (e.memoizedState = n));
  }
  function Hm(e, t, n, s, u) {
    var o = ae.p;
    ae.p = o !== 0 && 8 > o ? o : 8;
    var y = X.T,
      b = {};
    (X.T = b), mo(e, !1, t, n);
    try {
      var S = u(),
        j = X.S;
      if (
        (j !== null && j(b, S),
        S !== null && typeof S == "object" && typeof S.then == "function")
      ) {
        var Q = y1(S, s);
        Ni(e, t, Q, sn(e));
      } else Ni(e, t, s, sn(e));
    } catch (P) {
      Ni(e, t, { then: function () {}, status: "rejected", reason: P }, sn());
    } finally {
      (ae.p = o), (X.T = y);
    }
  }
  function x1() {}
  function fo(e, t, n, s) {
    if (e.tag !== 5) throw Error(r(476));
    var u = Bm(e).queue;
    Hm(
      e,
      u,
      t,
      Oe,
      n === null
        ? x1
        : function () {
            return qm(e), n(s);
          }
    );
  }
  function Bm(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: Oe,
      baseState: Oe,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: la,
        lastRenderedState: Oe,
      },
      next: null,
    };
    var n = {};
    return (
      (t.next = {
        memoizedState: n,
        baseState: n,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: la,
          lastRenderedState: n,
        },
        next: null,
      }),
      (e.memoizedState = t),
      (e = e.alternate),
      e !== null && (e.memoizedState = t),
      t
    );
  }
  function qm(e) {
    var t = Bm(e).next.queue;
    Ni(e, t, {}, sn());
  }
  function ho() {
    return Ot(Ki);
  }
  function km() {
    return ft().memoizedState;
  }
  function Vm() {
    return ft().memoizedState;
  }
  function S1(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var n = sn();
          e = za(n);
          var s = La(t, e, n);
          s !== null && (Ht(s, t, n), Di(s, t, n)),
            (t = { cache: Kc() }),
            (e.payload = t);
          return;
      }
      t = t.return;
    }
  }
  function E1(e, t, n) {
    var s = sn();
    (n = {
      lane: s,
      revertLane: 0,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      au(e)
        ? Qm(t, n)
        : ((n = Fc(e, t, n, s)), n !== null && (Ht(n, e, s), Gm(n, t, s)));
  }
  function Fm(e, t, n) {
    var s = sn();
    Ni(e, t, n, s);
  }
  function Ni(e, t, n, s) {
    var u = {
      lane: s,
      revertLane: 0,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (au(e)) Qm(t, u);
    else {
      var o = e.alternate;
      if (
        e.lanes === 0 &&
        (o === null || o.lanes === 0) &&
        ((o = t.lastRenderedReducer), o !== null)
      )
        try {
          var y = t.lastRenderedState,
            b = o(y, n);
          if (((u.hasEagerState = !0), (u.eagerState = b), tn(b, y)))
            return kr(e, t, u, 0), Xe === null && qr(), !1;
        } catch {
        } finally {
        }
      if (((n = Fc(e, t, u, s)), n !== null))
        return Ht(n, e, s), Gm(n, t, s), !0;
    }
    return !1;
  }
  function mo(e, t, n, s) {
    if (
      ((s = {
        lane: 2,
        revertLane: af(),
        action: s,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      au(e))
    ) {
      if (t) throw Error(r(479));
    } else (t = Fc(e, n, s, 2)), t !== null && Ht(t, e, 2);
  }
  function au(e) {
    var t = e.alternate;
    return e === Ae || (t !== null && t === Ae);
  }
  function Qm(e, t) {
    gs = $r = !0;
    var n = e.pending;
    n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
      (e.pending = t);
  }
  function Gm(e, t, n) {
    if (n & 4194176) {
      var s = t.lanes;
      (s &= e.pendingLanes), (n |= s), (t.lanes = n), th(e, n);
    }
  }
  var Vn = {
    readContext: Ot,
    use: Ir,
    useCallback: it,
    useContext: it,
    useEffect: it,
    useImperativeHandle: it,
    useLayoutEffect: it,
    useInsertionEffect: it,
    useMemo: it,
    useReducer: it,
    useRef: it,
    useState: it,
    useDebugValue: it,
    useDeferredValue: it,
    useTransition: it,
    useSyncExternalStore: it,
    useId: it,
  };
  (Vn.useCacheRefresh = it),
    (Vn.useMemoCache = it),
    (Vn.useHostTransitionStatus = it),
    (Vn.useFormState = it),
    (Vn.useActionState = it),
    (Vn.useOptimistic = it);
  var _l = {
    readContext: Ot,
    use: Ir,
    useCallback: function (e, t) {
      return (Gt().memoizedState = [e, t === void 0 ? null : t]), e;
    },
    useContext: Ot,
    useEffect: Nm,
    useImperativeHandle: function (e, t, n) {
      (n = n != null ? n.concat([e]) : null),
        tu(4194308, 4, Dm.bind(null, t, e), n);
    },
    useLayoutEffect: function (e, t) {
      return tu(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      tu(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = Gt();
      t = t === void 0 ? null : t;
      var s = e();
      if (wl) {
        Ra(!0);
        try {
          e();
        } finally {
          Ra(!1);
        }
      }
      return (n.memoizedState = [s, t]), s;
    },
    useReducer: function (e, t, n) {
      var s = Gt();
      if (n !== void 0) {
        var u = n(t);
        if (wl) {
          Ra(!0);
          try {
            n(t);
          } finally {
            Ra(!1);
          }
        }
      } else u = t;
      return (
        (s.memoizedState = s.baseState = u),
        (e = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: u,
        }),
        (s.queue = e),
        (e = e.dispatch = E1.bind(null, Ae, e)),
        [s.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = Gt();
      return (e = { current: e }), (t.memoizedState = e);
    },
    useState: function (e) {
      e = io(e);
      var t = e.queue,
        n = Fm.bind(null, Ae, t);
      return (t.dispatch = n), [e.memoizedState, n];
    },
    useDebugValue: co,
    useDeferredValue: function (e, t) {
      var n = Gt();
      return oo(n, e, t);
    },
    useTransition: function () {
      var e = io(!1);
      return (
        (e = Hm.bind(null, Ae, e.queue, !0, !1)),
        (Gt().memoizedState = e),
        [!1, e]
      );
    },
    useSyncExternalStore: function (e, t, n) {
      var s = Ae,
        u = Gt();
      if (He) {
        if (n === void 0) throw Error(r(407));
        n = n();
      } else {
        if (((n = t()), Xe === null)) throw Error(r(349));
        Me & 60 || hm(s, t, n);
      }
      u.memoizedState = n;
      var o = { value: n, getSnapshot: t };
      return (
        (u.queue = o),
        Nm(ym.bind(null, s, o, e), [e]),
        (s.flags |= 2048),
        bs(9, mm.bind(null, s, o, n, t), { destroy: void 0 }, null),
        n
      );
    },
    useId: function () {
      var e = Gt(),
        t = Xe.identifierPrefix;
      if (He) {
        var n = na,
          s = ta;
        (n = (s & ~(1 << (32 - en(s) - 1))).toString(32) + n),
          (t = ":" + t + "R" + n),
          (n = Jr++),
          0 < n && (t += "H" + n.toString(32)),
          (t += ":");
      } else (n = p1++), (t = ":" + t + "r" + n.toString(32) + ":");
      return (e.memoizedState = t);
    },
    useCacheRefresh: function () {
      return (Gt().memoizedState = S1.bind(null, Ae));
    },
  };
  (_l.useMemoCache = ao),
    (_l.useHostTransitionStatus = ho),
    (_l.useFormState = _m),
    (_l.useActionState = _m),
    (_l.useOptimistic = function (e) {
      var t = Gt();
      t.memoizedState = t.baseState = e;
      var n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null,
      };
      return (
        (t.queue = n), (t = mo.bind(null, Ae, !0, n)), (n.dispatch = t), [e, t]
      );
    });
  var Da = {
    readContext: Ot,
    use: Ir,
    useCallback: Mm,
    useContext: Ot,
    useEffect: uo,
    useImperativeHandle: Um,
    useInsertionEffect: Om,
    useLayoutEffect: jm,
    useMemo: zm,
    useReducer: eu,
    useRef: Cm,
    useState: function () {
      return eu(la);
    },
    useDebugValue: co,
    useDeferredValue: function (e, t) {
      var n = ft();
      return Lm(n, Fe.memoizedState, e, t);
    },
    useTransition: function () {
      var e = eu(la)[0],
        t = ft().memoizedState;
      return [typeof e == "boolean" ? e : Ci(e), t];
    },
    useSyncExternalStore: dm,
    useId: km,
  };
  (Da.useCacheRefresh = Vm),
    (Da.useMemoCache = ao),
    (Da.useHostTransitionStatus = ho),
    (Da.useFormState = Rm),
    (Da.useActionState = Rm),
    (Da.useOptimistic = function (e, t) {
      var n = ft();
      return vm(n, Fe, e, t);
    });
  var Rl = {
    readContext: Ot,
    use: Ir,
    useCallback: Mm,
    useContext: Ot,
    useEffect: uo,
    useImperativeHandle: Um,
    useInsertionEffect: Om,
    useLayoutEffect: jm,
    useMemo: zm,
    useReducer: so,
    useRef: Cm,
    useState: function () {
      return so(la);
    },
    useDebugValue: co,
    useDeferredValue: function (e, t) {
      var n = ft();
      return Fe === null ? oo(n, e, t) : Lm(n, Fe.memoizedState, e, t);
    },
    useTransition: function () {
      var e = so(la)[0],
        t = ft().memoizedState;
      return [typeof e == "boolean" ? e : Ci(e), t];
    },
    useSyncExternalStore: dm,
    useId: km,
  };
  (Rl.useCacheRefresh = Vm),
    (Rl.useMemoCache = ao),
    (Rl.useHostTransitionStatus = ho),
    (Rl.useFormState = Tm),
    (Rl.useActionState = Tm),
    (Rl.useOptimistic = function (e, t) {
      var n = ft();
      return Fe !== null
        ? vm(n, Fe, e, t)
        : ((n.baseState = e), [e, n.queue.dispatch]);
    });
  function yo(e, t, n, s) {
    (t = e.memoizedState),
      (n = n(s, t)),
      (n = n == null ? t : le({}, t, n)),
      (e.memoizedState = n),
      e.lanes === 0 && (e.updateQueue.baseState = n);
  }
  var po = {
    isMounted: function (e) {
      return (e = e._reactInternals) ? he(e) === e : !1;
    },
    enqueueSetState: function (e, t, n) {
      e = e._reactInternals;
      var s = sn(),
        u = za(s);
      (u.payload = t),
        n != null && (u.callback = n),
        (t = La(e, u, s)),
        t !== null && (Ht(t, e, s), Di(t, e, s));
    },
    enqueueReplaceState: function (e, t, n) {
      e = e._reactInternals;
      var s = sn(),
        u = za(s);
      (u.tag = 1),
        (u.payload = t),
        n != null && (u.callback = n),
        (t = La(e, u, s)),
        t !== null && (Ht(t, e, s), Di(t, e, s));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var n = sn(),
        s = za(n);
      (s.tag = 2),
        t != null && (s.callback = t),
        (t = La(e, s, n)),
        t !== null && (Ht(t, e, n), Di(t, e, n));
    },
  };
  function Ym(e, t, n, s, u, o, y) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == "function"
        ? e.shouldComponentUpdate(s, o, y)
        : t.prototype && t.prototype.isPureReactComponent
        ? !pi(n, s) || !pi(u, o)
        : !0
    );
  }
  function Xm(e, t, n, s) {
    (e = t.state),
      typeof t.componentWillReceiveProps == "function" &&
        t.componentWillReceiveProps(n, s),
      typeof t.UNSAFE_componentWillReceiveProps == "function" &&
        t.UNSAFE_componentWillReceiveProps(n, s),
      t.state !== e && po.enqueueReplaceState(t, t.state, null);
  }
  function Al(e, t) {
    var n = t;
    if ("ref" in t) {
      n = {};
      for (var s in t) s !== "ref" && (n[s] = t[s]);
    }
    if ((e = e.defaultProps)) {
      n === t && (n = le({}, n));
      for (var u in e) n[u] === void 0 && (n[u] = e[u]);
    }
    return n;
  }
  var lu =
    typeof reportError == "function"
      ? reportError
      : function (e) {
          if (
            typeof window == "object" &&
            typeof window.ErrorEvent == "function"
          ) {
            var t = new window.ErrorEvent("error", {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof e == "object" &&
                e !== null &&
                typeof e.message == "string"
                  ? String(e.message)
                  : String(e),
              error: e,
            });
            if (!window.dispatchEvent(t)) return;
          } else if (
            typeof process == "object" &&
            typeof process.emit == "function"
          ) {
            process.emit("uncaughtException", e);
            return;
          }
          console.error(e);
        };
  function Pm(e) {
    lu(e);
  }
  function Zm(e) {
    console.error(e);
  }
  function Km(e) {
    lu(e);
  }
  function su(e, t) {
    try {
      var n = e.onUncaughtError;
      n(t.value, { componentStack: t.stack });
    } catch (s) {
      setTimeout(function () {
        throw s;
      });
    }
  }
  function $m(e, t, n) {
    try {
      var s = e.onCaughtError;
      s(n.value, {
        componentStack: n.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null,
      });
    } catch (u) {
      setTimeout(function () {
        throw u;
      });
    }
  }
  function go(e, t, n) {
    return (
      (n = za(n)),
      (n.tag = 3),
      (n.payload = { element: null }),
      (n.callback = function () {
        su(e, t);
      }),
      n
    );
  }
  function Jm(e) {
    return (e = za(e)), (e.tag = 3), e;
  }
  function Wm(e, t, n, s) {
    var u = n.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var o = s.value;
      (e.payload = function () {
        return u(o);
      }),
        (e.callback = function () {
          $m(t, n, s);
        });
    }
    var y = n.stateNode;
    y !== null &&
      typeof y.componentDidCatch == "function" &&
      (e.callback = function () {
        $m(t, n, s),
          typeof u != "function" &&
            (Fa === null ? (Fa = new Set([this])) : Fa.add(this));
        var b = s.stack;
        this.componentDidCatch(s.value, {
          componentStack: b !== null ? b : "",
        });
      });
  }
  function w1(e, t, n, s, u) {
    if (
      ((n.flags |= 32768),
      s !== null && typeof s == "object" && typeof s.then == "function")
    ) {
      if (
        ((t = n.alternate),
        t !== null && ji(t, n, u, !0),
        (n = mn.current),
        n !== null)
      ) {
        switch (n.tag) {
          case 13:
            return (
              kn === null ? Wo() : n.alternate === null && tt === 0 && (tt = 3),
              (n.flags &= -257),
              (n.flags |= 65536),
              (n.lanes = u),
              s === Xc
                ? (n.flags |= 16384)
                : ((t = n.updateQueue),
                  t === null ? (n.updateQueue = new Set([s])) : t.add(s),
                  ef(e, s, u)),
              !1
            );
          case 22:
            return (
              (n.flags |= 65536),
              s === Xc
                ? (n.flags |= 16384)
                : ((t = n.updateQueue),
                  t === null
                    ? ((t = {
                        transitions: null,
                        markerInstances: null,
                        retryQueue: new Set([s]),
                      }),
                      (n.updateQueue = t))
                    : ((n = t.retryQueue),
                      n === null ? (t.retryQueue = new Set([s])) : n.add(s)),
                  ef(e, s, u)),
              !1
            );
        }
        throw Error(r(435, n.tag));
      }
      return ef(e, s, u), Wo(), !1;
    }
    if (He)
      return (
        (t = mn.current),
        t !== null
          ? (!(t.flags & 65536) && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = u),
            s !== Yc && ((e = Error(r(422), { cause: s })), xi(fn(e, n))))
          : (s !== Yc && ((t = Error(r(423), { cause: s })), xi(fn(t, n))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (u &= -u),
            (e.lanes |= u),
            (s = fn(s, n)),
            (u = go(e.stateNode, s, u)),
            Do(e, u),
            tt !== 4 && (tt = 2)),
        !1
      );
    var o = Error(r(520), { cause: s });
    if (
      ((o = fn(o, n)),
      ki === null ? (ki = [o]) : ki.push(o),
      tt !== 4 && (tt = 2),
      t === null)
    )
      return !0;
    (s = fn(s, n)), (n = t);
    do {
      switch (n.tag) {
        case 3:
          return (
            (n.flags |= 65536),
            (e = u & -u),
            (n.lanes |= e),
            (e = go(n.stateNode, s, e)),
            Do(n, e),
            !1
          );
        case 1:
          if (
            ((t = n.type),
            (o = n.stateNode),
            (n.flags & 128) === 0 &&
              (typeof t.getDerivedStateFromError == "function" ||
                (o !== null &&
                  typeof o.componentDidCatch == "function" &&
                  (Fa === null || !Fa.has(o)))))
          )
            return (
              (n.flags |= 65536),
              (u &= -u),
              (n.lanes |= u),
              (u = Jm(u)),
              Wm(u, e, n, s),
              Do(n, u),
              !1
            );
      }
      n = n.return;
    } while (n !== null);
    return !1;
  }
  var Im = Error(r(461)),
    St = !1;
  function At(e, t, n, s) {
    t.child = e === null ? lm(t, null, n, s) : Sl(t, e.child, n, s);
  }
  function ey(e, t, n, s, u) {
    n = n.render;
    var o = t.ref;
    if ("ref" in s) {
      var y = {};
      for (var b in s) b !== "ref" && (y[b] = s[b]);
    } else y = s;
    return (
      Cl(t),
      (s = Ic(e, t, n, y, o, u)),
      (b = eo()),
      e !== null && !St
        ? (to(e, t, u), sa(e, t, u))
        : (He && b && Qc(t), (t.flags |= 1), At(e, t, s, u), t.child)
    );
  }
  function ty(e, t, n, s, u) {
    if (e === null) {
      var o = n.type;
      return typeof o == "function" &&
        !ko(o) &&
        o.defaultProps === void 0 &&
        n.compare === null
        ? ((t.tag = 15), (t.type = o), ny(e, t, o, s, u))
        : ((e = ou(n.type, null, s, t, t.mode, u)),
          (e.ref = t.ref),
          (e.return = t),
          (t.child = e));
    }
    if (((o = e.child), !Ao(e, u))) {
      var y = o.memoizedProps;
      if (
        ((n = n.compare), (n = n !== null ? n : pi), n(y, s) && e.ref === t.ref)
      )
        return sa(e, t, u);
    }
    return (
      (t.flags |= 1),
      (e = ka(o, s)),
      (e.ref = t.ref),
      (e.return = t),
      (t.child = e)
    );
  }
  function ny(e, t, n, s, u) {
    if (e !== null) {
      var o = e.memoizedProps;
      if (pi(o, s) && e.ref === t.ref)
        if (((St = !1), (t.pendingProps = s = o), Ao(e, u)))
          e.flags & 131072 && (St = !0);
        else return (t.lanes = e.lanes), sa(e, t, u);
    }
    return vo(e, t, n, s, u);
  }
  function ay(e, t, n) {
    var s = t.pendingProps,
      u = s.children,
      o = (t.stateNode._pendingVisibility & 2) !== 0,
      y = e !== null ? e.memoizedState : null;
    if ((Oi(e, t), s.mode === "hidden" || o)) {
      if (t.flags & 128) {
        if (((s = y !== null ? y.baseLanes | n : n), e !== null)) {
          for (u = t.child = e.child, o = 0; u !== null; )
            (o = o | u.lanes | u.childLanes), (u = u.sibling);
          t.childLanes = o & ~s;
        } else (t.childLanes = 0), (t.child = null);
        return ly(e, t, s, n);
      }
      if (n & 536870912)
        (t.memoizedState = { baseLanes: 0, cachePool: null }),
          e !== null && Kr(t, y !== null ? y.cachePool : null),
          y !== null ? sm(t, y) : Pc(),
          im(t);
      else
        return (
          (t.lanes = t.childLanes = 536870912),
          ly(e, t, y !== null ? y.baseLanes | n : n, n)
        );
    } else
      y !== null
        ? (Kr(t, y.cachePool), sm(t, y), Oa(), (t.memoizedState = null))
        : (e !== null && Kr(t, null), Pc(), Oa());
    return At(e, t, u, n), t.child;
  }
  function ly(e, t, n, s) {
    var u = Jc();
    return (
      (u = u === null ? null : { parent: pt._currentValue, pool: u }),
      (t.memoizedState = { baseLanes: n, cachePool: u }),
      e !== null && Kr(t, null),
      Pc(),
      im(t),
      e !== null && ji(e, t, s, !0),
      null
    );
  }
  function Oi(e, t) {
    var n = t.ref;
    if (n === null) e !== null && e.ref !== null && (t.flags |= 2097664);
    else {
      if (typeof n != "function" && typeof n != "object") throw Error(r(284));
      (e === null || e.ref !== n) && (t.flags |= 2097664);
    }
  }
  function vo(e, t, n, s, u) {
    return (
      Cl(t),
      (n = Ic(e, t, n, s, void 0, u)),
      (s = eo()),
      e !== null && !St
        ? (to(e, t, u), sa(e, t, u))
        : (He && s && Qc(t), (t.flags |= 1), At(e, t, n, u), t.child)
    );
  }
  function sy(e, t, n, s, u, o) {
    return (
      Cl(t),
      (t.updateQueue = null),
      (n = fm(t, s, n, u)),
      om(e),
      (s = eo()),
      e !== null && !St
        ? (to(e, t, o), sa(e, t, o))
        : (He && s && Qc(t), (t.flags |= 1), At(e, t, n, o), t.child)
    );
  }
  function iy(e, t, n, s, u) {
    if ((Cl(t), t.stateNode === null)) {
      var o = os,
        y = n.contextType;
      typeof y == "object" && y !== null && (o = Ot(y)),
        (o = new n(s, o)),
        (t.memoizedState =
          o.state !== null && o.state !== void 0 ? o.state : null),
        (o.updater = po),
        (t.stateNode = o),
        (o._reactInternals = t),
        (o = t.stateNode),
        (o.props = s),
        (o.state = t.memoizedState),
        (o.refs = {}),
        Oo(t),
        (y = n.contextType),
        (o.context = typeof y == "object" && y !== null ? Ot(y) : os),
        (o.state = t.memoizedState),
        (y = n.getDerivedStateFromProps),
        typeof y == "function" && (yo(t, n, y, s), (o.state = t.memoizedState)),
        typeof n.getDerivedStateFromProps == "function" ||
          typeof o.getSnapshotBeforeUpdate == "function" ||
          (typeof o.UNSAFE_componentWillMount != "function" &&
            typeof o.componentWillMount != "function") ||
          ((y = o.state),
          typeof o.componentWillMount == "function" && o.componentWillMount(),
          typeof o.UNSAFE_componentWillMount == "function" &&
            o.UNSAFE_componentWillMount(),
          y !== o.state && po.enqueueReplaceState(o, o.state, null),
          Mi(t, s, o, u),
          Ui(),
          (o.state = t.memoizedState)),
        typeof o.componentDidMount == "function" && (t.flags |= 4194308),
        (s = !0);
    } else if (e === null) {
      o = t.stateNode;
      var b = t.memoizedProps,
        S = Al(n, b);
      o.props = S;
      var j = o.context,
        Q = n.contextType;
      (y = os), typeof Q == "object" && Q !== null && (y = Ot(Q));
      var P = n.getDerivedStateFromProps;
      (Q =
        typeof P == "function" ||
        typeof o.getSnapshotBeforeUpdate == "function"),
        (b = t.pendingProps !== b),
        Q ||
          (typeof o.UNSAFE_componentWillReceiveProps != "function" &&
            typeof o.componentWillReceiveProps != "function") ||
          ((b || j !== y) && Xm(t, o, s, y)),
        (Ma = !1);
      var L = t.memoizedState;
      (o.state = L),
        Mi(t, s, o, u),
        Ui(),
        (j = t.memoizedState),
        b || L !== j || Ma
          ? (typeof P == "function" && (yo(t, n, P, s), (j = t.memoizedState)),
            (S = Ma || Ym(t, n, S, s, L, j, y))
              ? (Q ||
                  (typeof o.UNSAFE_componentWillMount != "function" &&
                    typeof o.componentWillMount != "function") ||
                  (typeof o.componentWillMount == "function" &&
                    o.componentWillMount(),
                  typeof o.UNSAFE_componentWillMount == "function" &&
                    o.UNSAFE_componentWillMount()),
                typeof o.componentDidMount == "function" &&
                  (t.flags |= 4194308))
              : (typeof o.componentDidMount == "function" &&
                  (t.flags |= 4194308),
                (t.memoizedProps = s),
                (t.memoizedState = j)),
            (o.props = s),
            (o.state = j),
            (o.context = y),
            (s = S))
          : (typeof o.componentDidMount == "function" && (t.flags |= 4194308),
            (s = !1));
    } else {
      (o = t.stateNode),
        jo(e, t),
        (y = t.memoizedProps),
        (Q = Al(n, y)),
        (o.props = Q),
        (P = t.pendingProps),
        (L = o.context),
        (j = n.contextType),
        (S = os),
        typeof j == "object" && j !== null && (S = Ot(j)),
        (b = n.getDerivedStateFromProps),
        (j =
          typeof b == "function" ||
          typeof o.getSnapshotBeforeUpdate == "function") ||
          (typeof o.UNSAFE_componentWillReceiveProps != "function" &&
            typeof o.componentWillReceiveProps != "function") ||
          ((y !== P || L !== S) && Xm(t, o, s, S)),
        (Ma = !1),
        (L = t.memoizedState),
        (o.state = L),
        Mi(t, s, o, u),
        Ui();
      var F = t.memoizedState;
      y !== P ||
      L !== F ||
      Ma ||
      (e !== null && e.dependencies !== null && iu(e.dependencies))
        ? (typeof b == "function" && (yo(t, n, b, s), (F = t.memoizedState)),
          (Q =
            Ma ||
            Ym(t, n, Q, s, L, F, S) ||
            (e !== null && e.dependencies !== null && iu(e.dependencies)))
            ? (j ||
                (typeof o.UNSAFE_componentWillUpdate != "function" &&
                  typeof o.componentWillUpdate != "function") ||
                (typeof o.componentWillUpdate == "function" &&
                  o.componentWillUpdate(s, F, S),
                typeof o.UNSAFE_componentWillUpdate == "function" &&
                  o.UNSAFE_componentWillUpdate(s, F, S)),
              typeof o.componentDidUpdate == "function" && (t.flags |= 4),
              typeof o.getSnapshotBeforeUpdate == "function" &&
                (t.flags |= 1024))
            : (typeof o.componentDidUpdate != "function" ||
                (y === e.memoizedProps && L === e.memoizedState) ||
                (t.flags |= 4),
              typeof o.getSnapshotBeforeUpdate != "function" ||
                (y === e.memoizedProps && L === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = s),
              (t.memoizedState = F)),
          (o.props = s),
          (o.state = F),
          (o.context = S),
          (s = Q))
        : (typeof o.componentDidUpdate != "function" ||
            (y === e.memoizedProps && L === e.memoizedState) ||
            (t.flags |= 4),
          typeof o.getSnapshotBeforeUpdate != "function" ||
            (y === e.memoizedProps && L === e.memoizedState) ||
            (t.flags |= 1024),
          (s = !1));
    }
    return (
      (o = s),
      Oi(e, t),
      (s = (t.flags & 128) !== 0),
      o || s
        ? ((o = t.stateNode),
          (n =
            s && typeof n.getDerivedStateFromError != "function"
              ? null
              : o.render()),
          (t.flags |= 1),
          e !== null && s
            ? ((t.child = Sl(t, e.child, null, u)),
              (t.child = Sl(t, null, n, u)))
            : At(e, t, n, u),
          (t.memoizedState = o.state),
          (e = t.child))
        : (e = sa(e, t, u)),
      e
    );
  }
  function ry(e, t, n, s) {
    return bi(), (t.flags |= 256), At(e, t, n, s), t.child;
  }
  var bo = { dehydrated: null, treeContext: null, retryLane: 0 };
  function xo(e) {
    return { baseLanes: e, cachePool: cm() };
  }
  function So(e, t, n) {
    return (e = e !== null ? e.childLanes & ~n : 0), t && (e |= vn), e;
  }
  function uy(e, t, n) {
    var s = t.pendingProps,
      u = !1,
      o = (t.flags & 128) !== 0,
      y;
    if (
      ((y = o) ||
        (y =
          e !== null && e.memoizedState === null ? !1 : (yt.current & 2) !== 0),
      y && ((u = !0), (t.flags &= -129)),
      (y = (t.flags & 32) !== 0),
      (t.flags &= -33),
      e === null)
    ) {
      if (He) {
        if ((u ? Na(t) : Oa(), He)) {
          var b = Rt,
            S;
          if ((S = b)) {
            e: {
              for (S = b, b = qn; S.nodeType !== 8; ) {
                if (!b) {
                  b = null;
                  break e;
                }
                if (((S = Nn(S.nextSibling)), S === null)) {
                  b = null;
                  break e;
                }
              }
              b = S;
            }
            b !== null
              ? ((t.memoizedState = {
                  dehydrated: b,
                  treeContext: vl !== null ? { id: ta, overflow: na } : null,
                  retryLane: 536870912,
                }),
                (S = gn(18, null, null, 0)),
                (S.stateNode = b),
                (S.return = t),
                (t.child = S),
                (Lt = t),
                (Rt = null),
                (S = !0))
              : (S = !1);
          }
          S || xl(t);
        }
        if (
          ((b = t.memoizedState),
          b !== null && ((b = b.dehydrated), b !== null))
        )
          return b.data === "$!" ? (t.lanes = 16) : (t.lanes = 536870912), null;
        aa(t);
      }
      return (
        (b = s.children),
        (s = s.fallback),
        u
          ? (Oa(),
            (u = t.mode),
            (b = wo({ mode: "hidden", children: b }, u)),
            (s = Ol(s, u, n, null)),
            (b.return = t),
            (s.return = t),
            (b.sibling = s),
            (t.child = b),
            (u = t.child),
            (u.memoizedState = xo(n)),
            (u.childLanes = So(e, y, n)),
            (t.memoizedState = bo),
            s)
          : (Na(t), Eo(t, b))
      );
    }
    if (
      ((S = e.memoizedState), S !== null && ((b = S.dehydrated), b !== null))
    ) {
      if (o)
        t.flags & 256
          ? (Na(t), (t.flags &= -257), (t = _o(e, t, n)))
          : t.memoizedState !== null
          ? (Oa(), (t.child = e.child), (t.flags |= 128), (t = null))
          : (Oa(),
            (u = s.fallback),
            (b = t.mode),
            (s = wo({ mode: "visible", children: s.children }, b)),
            (u = Ol(u, b, n, null)),
            (u.flags |= 2),
            (s.return = t),
            (u.return = t),
            (s.sibling = u),
            (t.child = s),
            Sl(t, e.child, null, n),
            (s = t.child),
            (s.memoizedState = xo(n)),
            (s.childLanes = So(e, y, n)),
            (t.memoizedState = bo),
            (t = u));
      else if ((Na(t), b.data === "$!")) {
        if (((y = b.nextSibling && b.nextSibling.dataset), y)) var j = y.dgst;
        (y = j),
          (s = Error(r(419))),
          (s.stack = ""),
          (s.digest = y),
          xi({ value: s, source: null, stack: null }),
          (t = _o(e, t, n));
      } else if (
        (St || ji(e, t, n, !1), (y = (n & e.childLanes) !== 0), St || y)
      ) {
        if (((y = Xe), y !== null)) {
          if (((s = n & -n), s & 42)) s = 1;
          else
            switch (s) {
              case 2:
                s = 1;
                break;
              case 8:
                s = 4;
                break;
              case 32:
                s = 16;
                break;
              case 128:
              case 256:
              case 512:
              case 1024:
              case 2048:
              case 4096:
              case 8192:
              case 16384:
              case 32768:
              case 65536:
              case 131072:
              case 262144:
              case 524288:
              case 1048576:
              case 2097152:
              case 4194304:
              case 8388608:
              case 16777216:
              case 33554432:
                s = 64;
                break;
              case 268435456:
                s = 134217728;
                break;
              default:
                s = 0;
            }
          if (
            ((s = s & (y.suspendedLanes | n) ? 0 : s),
            s !== 0 && s !== S.retryLane)
          )
            throw ((S.retryLane = s), Ca(e, s), Ht(y, e, s), Im);
        }
        b.data === "$?" || Wo(), (t = _o(e, t, n));
      } else
        b.data === "$?"
          ? ((t.flags |= 128),
            (t.child = e.child),
            (t = B1.bind(null, e)),
            (b._reactRetry = t),
            (t = null))
          : ((e = S.treeContext),
            (Rt = Nn(b.nextSibling)),
            (Lt = t),
            (He = !0),
            (Tn = null),
            (qn = !1),
            e !== null &&
              ((dn[hn++] = ta),
              (dn[hn++] = na),
              (dn[hn++] = vl),
              (ta = e.id),
              (na = e.overflow),
              (vl = t)),
            (t = Eo(t, s.children)),
            (t.flags |= 4096));
      return t;
    }
    return u
      ? (Oa(),
        (u = s.fallback),
        (b = t.mode),
        (S = e.child),
        (j = S.sibling),
        (s = ka(S, { mode: "hidden", children: s.children })),
        (s.subtreeFlags = S.subtreeFlags & 31457280),
        j !== null ? (u = ka(j, u)) : ((u = Ol(u, b, n, null)), (u.flags |= 2)),
        (u.return = t),
        (s.return = t),
        (s.sibling = u),
        (t.child = s),
        (s = u),
        (u = t.child),
        (b = e.child.memoizedState),
        b === null
          ? (b = xo(n))
          : ((S = b.cachePool),
            S !== null
              ? ((j = pt._currentValue),
                (S = S.parent !== j ? { parent: j, pool: j } : S))
              : (S = cm()),
            (b = { baseLanes: b.baseLanes | n, cachePool: S })),
        (u.memoizedState = b),
        (u.childLanes = So(e, y, n)),
        (t.memoizedState = bo),
        s)
      : (Na(t),
        (n = e.child),
        (e = n.sibling),
        (n = ka(n, { mode: "visible", children: s.children })),
        (n.return = t),
        (n.sibling = null),
        e !== null &&
          ((y = t.deletions),
          y === null ? ((t.deletions = [e]), (t.flags |= 16)) : y.push(e)),
        (t.child = n),
        (t.memoizedState = null),
        n);
  }
  function Eo(e, t) {
    return (
      (t = wo({ mode: "visible", children: t }, e.mode)),
      (t.return = e),
      (e.child = t)
    );
  }
  function wo(e, t) {
    return My(e, t, 0, null);
  }
  function _o(e, t, n) {
    return (
      Sl(t, e.child, null, n),
      (e = Eo(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function cy(e, t, n) {
    e.lanes |= t;
    var s = e.alternate;
    s !== null && (s.lanes |= t), Co(e.return, t, n);
  }
  function Ro(e, t, n, s, u) {
    var o = e.memoizedState;
    o === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: s,
          tail: n,
          tailMode: u,
        })
      : ((o.isBackwards = t),
        (o.rendering = null),
        (o.renderingStartTime = 0),
        (o.last = s),
        (o.tail = n),
        (o.tailMode = u));
  }
  function oy(e, t, n) {
    var s = t.pendingProps,
      u = s.revealOrder,
      o = s.tail;
    if ((At(e, t, s.children, n), (s = yt.current), s & 2))
      (s = (s & 1) | 2), (t.flags |= 128);
    else {
      if (e !== null && e.flags & 128)
        e: for (e = t.child; e !== null; ) {
          if (e.tag === 13) e.memoizedState !== null && cy(e, n, t);
          else if (e.tag === 19) cy(e, n, t);
          else if (e.child !== null) {
            (e.child.return = e), (e = e.child);
            continue;
          }
          if (e === t) break e;
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === t) break e;
            e = e.return;
          }
          (e.sibling.return = e.return), (e = e.sibling);
        }
      s &= 1;
    }
    switch ((Ye(yt, s), u)) {
      case "forwards":
        for (n = t.child, u = null; n !== null; )
          (e = n.alternate),
            e !== null && Zr(e) === null && (u = n),
            (n = n.sibling);
        (n = u),
          n === null
            ? ((u = t.child), (t.child = null))
            : ((u = n.sibling), (n.sibling = null)),
          Ro(t, !1, u, n, o);
        break;
      case "backwards":
        for (n = null, u = t.child, t.child = null; u !== null; ) {
          if (((e = u.alternate), e !== null && Zr(e) === null)) {
            t.child = u;
            break;
          }
          (e = u.sibling), (u.sibling = n), (n = u), (u = e);
        }
        Ro(t, !0, n, null, o);
        break;
      case "together":
        Ro(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function sa(e, t, n) {
    if (
      (e !== null && (t.dependencies = e.dependencies),
      (Va |= t.lanes),
      !(n & t.childLanes))
    )
      if (e !== null) {
        if ((ji(e, t, n, !1), (n & t.childLanes) === 0)) return null;
      } else return null;
    if (e !== null && t.child !== e.child) throw Error(r(153));
    if (t.child !== null) {
      for (
        e = t.child, n = ka(e, e.pendingProps), t.child = n, n.return = t;
        e.sibling !== null;

      )
        (e = e.sibling),
          (n = n.sibling = ka(e, e.pendingProps)),
          (n.return = t);
      n.sibling = null;
    }
    return t.child;
  }
  function Ao(e, t) {
    return e.lanes & t ? !0 : ((e = e.dependencies), !!(e !== null && iu(e)));
  }
  function _1(e, t, n) {
    switch (t.tag) {
      case 3:
        ai(t, t.stateNode.containerInfo),
          Ua(t, pt, e.memoizedState.cache),
          bi();
        break;
      case 27:
      case 5:
        wr(t);
        break;
      case 4:
        ai(t, t.stateNode.containerInfo);
        break;
      case 10:
        Ua(t, t.type, t.memoizedProps.value);
        break;
      case 13:
        var s = t.memoizedState;
        if (s !== null)
          return s.dehydrated !== null
            ? (Na(t), (t.flags |= 128), null)
            : n & t.child.childLanes
            ? uy(e, t, n)
            : (Na(t), (e = sa(e, t, n)), e !== null ? e.sibling : null);
        Na(t);
        break;
      case 19:
        var u = (e.flags & 128) !== 0;
        if (
          ((s = (n & t.childLanes) !== 0),
          s || (ji(e, t, n, !1), (s = (n & t.childLanes) !== 0)),
          u)
        ) {
          if (s) return oy(e, t, n);
          t.flags |= 128;
        }
        if (
          ((u = t.memoizedState),
          u !== null &&
            ((u.rendering = null), (u.tail = null), (u.lastEffect = null)),
          Ye(yt, yt.current),
          s)
        )
          break;
        return null;
      case 22:
      case 23:
        return (t.lanes = 0), ay(e, t, n);
      case 24:
        Ua(t, pt, e.memoizedState.cache);
    }
    return sa(e, t, n);
  }
  function fy(e, t, n) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps) St = !0;
      else {
        if (!Ao(e, n) && !(t.flags & 128)) return (St = !1), _1(e, t, n);
        St = !!(e.flags & 131072);
      }
    else (St = !1), He && t.flags & 1048576 && Kh(t, Qr, t.index);
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        e: {
          e = t.pendingProps;
          var s = t.elementType,
            u = s._init;
          if (((s = u(s._payload)), (t.type = s), typeof s == "function"))
            ko(s)
              ? ((e = Al(s, e)), (t.tag = 1), (t = iy(null, t, s, e, n)))
              : ((t.tag = 0), (t = vo(null, t, s, e, n)));
          else {
            if (s != null) {
              if (((u = s.$$typeof), u === _)) {
                (t.tag = 11), (t = ey(null, t, s, e, n));
                break e;
              } else if (u === H) {
                (t.tag = 14), (t = ty(null, t, s, e, n));
                break e;
              }
            }
            throw ((t = I(s) || s), Error(r(306, t, "")));
          }
        }
        return t;
      case 0:
        return vo(e, t, t.type, t.pendingProps, n);
      case 1:
        return (s = t.type), (u = Al(s, t.pendingProps)), iy(e, t, s, u, n);
      case 3:
        e: {
          if ((ai(t, t.stateNode.containerInfo), e === null))
            throw Error(r(387));
          var o = t.pendingProps;
          (u = t.memoizedState), (s = u.element), jo(e, t), Mi(t, o, null, n);
          var y = t.memoizedState;
          if (
            ((o = y.cache),
            Ua(t, pt, o),
            o !== u.cache && No(t, [pt], n, !0),
            Ui(),
            (o = y.element),
            u.isDehydrated)
          )
            if (
              ((u = { element: o, isDehydrated: !1, cache: y.cache }),
              (t.updateQueue.baseState = u),
              (t.memoizedState = u),
              t.flags & 256)
            ) {
              t = ry(e, t, o, n);
              break e;
            } else if (o !== s) {
              (s = fn(Error(r(424)), t)), xi(s), (t = ry(e, t, o, n));
              break e;
            } else
              for (
                Rt = Nn(t.stateNode.containerInfo.firstChild),
                  Lt = t,
                  He = !0,
                  Tn = null,
                  qn = !0,
                  n = lm(t, null, o, n),
                  t.child = n;
                n;

              )
                (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
          else {
            if ((bi(), o === s)) {
              t = sa(e, t, n);
              break e;
            }
            At(e, t, o, n);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          Oi(e, t),
          e === null
            ? (n = m0(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = n)
              : He ||
                ((n = t.type),
                (e = t.pendingProps),
                (s = Eu(Rn.current).createElement(n)),
                (s[Nt] = t),
                (s[Ft] = e),
                Tt(s, n, e),
                xt(s),
                (t.stateNode = s))
            : (t.memoizedState = m0(
                t.type,
                e.memoizedProps,
                t.pendingProps,
                e.memoizedState
              )),
          null
        );
      case 27:
        return (
          wr(t),
          e === null &&
            He &&
            ((s = t.stateNode = f0(t.type, t.pendingProps, Rn.current)),
            (Lt = t),
            (qn = !0),
            (Rt = Nn(s.firstChild))),
          (s = t.pendingProps.children),
          e !== null || He ? At(e, t, s, n) : (t.child = Sl(t, null, s, n)),
          Oi(e, t),
          t.child
        );
      case 5:
        return (
          e === null &&
            He &&
            ((u = s = Rt) &&
              ((s = eb(s, t.type, t.pendingProps, qn)),
              s !== null
                ? ((t.stateNode = s),
                  (Lt = t),
                  (Rt = Nn(s.firstChild)),
                  (qn = !1),
                  (u = !0))
                : (u = !1)),
            u || xl(t)),
          wr(t),
          (u = t.type),
          (o = t.pendingProps),
          (y = e !== null ? e.memoizedProps : null),
          (s = o.children),
          hf(u, o) ? (s = null) : y !== null && hf(u, y) && (t.flags |= 32),
          t.memoizedState !== null &&
            ((u = Ic(e, t, g1, null, null, n)), (Ki._currentValue = u)),
          Oi(e, t),
          At(e, t, s, n),
          t.child
        );
      case 6:
        return (
          e === null &&
            He &&
            ((e = n = Rt) &&
              ((n = tb(n, t.pendingProps, qn)),
              n !== null
                ? ((t.stateNode = n), (Lt = t), (Rt = null), (e = !0))
                : (e = !1)),
            e || xl(t)),
          null
        );
      case 13:
        return uy(e, t, n);
      case 4:
        return (
          ai(t, t.stateNode.containerInfo),
          (s = t.pendingProps),
          e === null ? (t.child = Sl(t, null, s, n)) : At(e, t, s, n),
          t.child
        );
      case 11:
        return ey(e, t, t.type, t.pendingProps, n);
      case 7:
        return At(e, t, t.pendingProps, n), t.child;
      case 8:
        return At(e, t, t.pendingProps.children, n), t.child;
      case 12:
        return At(e, t, t.pendingProps.children, n), t.child;
      case 10:
        return (
          (s = t.pendingProps),
          Ua(t, t.type, s.value),
          At(e, t, s.children, n),
          t.child
        );
      case 9:
        return (
          (u = t.type._context),
          (s = t.pendingProps.children),
          Cl(t),
          (u = Ot(u)),
          (s = s(u)),
          (t.flags |= 1),
          At(e, t, s, n),
          t.child
        );
      case 14:
        return ty(e, t, t.type, t.pendingProps, n);
      case 15:
        return ny(e, t, t.type, t.pendingProps, n);
      case 19:
        return oy(e, t, n);
      case 22:
        return ay(e, t, n);
      case 24:
        return (
          Cl(t),
          (s = Ot(pt)),
          e === null
            ? ((u = Jc()),
              u === null &&
                ((u = Xe),
                (o = Kc()),
                (u.pooledCache = o),
                o.refCount++,
                o !== null && (u.pooledCacheLanes |= n),
                (u = o)),
              (t.memoizedState = { parent: s, cache: u }),
              Oo(t),
              Ua(t, pt, u))
            : (e.lanes & n && (jo(e, t), Mi(t, null, null, n), Ui()),
              (u = e.memoizedState),
              (o = t.memoizedState),
              u.parent !== s
                ? ((u = { parent: s, cache: s }),
                  (t.memoizedState = u),
                  t.lanes === 0 &&
                    (t.memoizedState = t.updateQueue.baseState = u),
                  Ua(t, pt, s))
                : ((s = o.cache),
                  Ua(t, pt, s),
                  s !== u.cache && No(t, [pt], n, !0))),
          At(e, t, t.pendingProps.children, n),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(r(156, t.tag));
  }
  var To = Ue(null),
    Tl = null,
    ia = null;
  function Ua(e, t, n) {
    Ye(To, t._currentValue), (t._currentValue = n);
  }
  function ra(e) {
    (e._currentValue = To.current), Je(To);
  }
  function Co(e, t, n) {
    for (; e !== null; ) {
      var s = e.alternate;
      if (
        ((e.childLanes & t) !== t
          ? ((e.childLanes |= t), s !== null && (s.childLanes |= t))
          : s !== null && (s.childLanes & t) !== t && (s.childLanes |= t),
        e === n)
      )
        break;
      e = e.return;
    }
  }
  function No(e, t, n, s) {
    var u = e.child;
    for (u !== null && (u.return = e); u !== null; ) {
      var o = u.dependencies;
      if (o !== null) {
        var y = u.child;
        o = o.firstContext;
        e: for (; o !== null; ) {
          var b = o;
          o = u;
          for (var S = 0; S < t.length; S++)
            if (b.context === t[S]) {
              (o.lanes |= n),
                (b = o.alternate),
                b !== null && (b.lanes |= n),
                Co(o.return, n, e),
                s || (y = null);
              break e;
            }
          o = b.next;
        }
      } else if (u.tag === 18) {
        if (((y = u.return), y === null)) throw Error(r(341));
        (y.lanes |= n),
          (o = y.alternate),
          o !== null && (o.lanes |= n),
          Co(y, n, e),
          (y = null);
      } else y = u.child;
      if (y !== null) y.return = u;
      else
        for (y = u; y !== null; ) {
          if (y === e) {
            y = null;
            break;
          }
          if (((u = y.sibling), u !== null)) {
            (u.return = y.return), (y = u);
            break;
          }
          y = y.return;
        }
      u = y;
    }
  }
  function ji(e, t, n, s) {
    e = null;
    for (var u = t, o = !1; u !== null; ) {
      if (!o) {
        if (u.flags & 524288) o = !0;
        else if (u.flags & 262144) break;
      }
      if (u.tag === 10) {
        var y = u.alternate;
        if (y === null) throw Error(r(387));
        if (((y = y.memoizedProps), y !== null)) {
          var b = u.type;
          tn(u.pendingProps.value, y.value) ||
            (e !== null ? e.push(b) : (e = [b]));
        }
      } else if (u === ol.current) {
        if (((y = u.alternate), y === null)) throw Error(r(387));
        y.memoizedState.memoizedState !== u.memoizedState.memoizedState &&
          (e !== null ? e.push(Ki) : (e = [Ki]));
      }
      u = u.return;
    }
    e !== null && No(t, e, n, s), (t.flags |= 262144);
  }
  function iu(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!tn(e.context._currentValue, e.memoizedValue)) return !0;
      e = e.next;
    }
    return !1;
  }
  function Cl(e) {
    (Tl = e),
      (ia = null),
      (e = e.dependencies),
      e !== null && (e.firstContext = null);
  }
  function Ot(e) {
    return dy(Tl, e);
  }
  function ru(e, t) {
    return Tl === null && Cl(e), dy(e, t);
  }
  function dy(e, t) {
    var n = t._currentValue;
    if (((t = { context: t, memoizedValue: n, next: null }), ia === null)) {
      if (e === null) throw Error(r(308));
      (ia = t),
        (e.dependencies = { lanes: 0, firstContext: t }),
        (e.flags |= 524288);
    } else ia = ia.next = t;
    return n;
  }
  var Ma = !1;
  function Oo(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function jo(e, t) {
    (e = e.updateQueue),
      t.updateQueue === e &&
        (t.updateQueue = {
          baseState: e.baseState,
          firstBaseUpdate: e.firstBaseUpdate,
          lastBaseUpdate: e.lastBaseUpdate,
          shared: e.shared,
          callbacks: null,
        });
  }
  function za(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function La(e, t, n) {
    var s = e.updateQueue;
    if (s === null) return null;
    if (((s = s.shared), Ie & 2)) {
      var u = s.pending;
      return (
        u === null ? (t.next = t) : ((t.next = u.next), (u.next = t)),
        (s.pending = t),
        (t = Vr(e)),
        Ph(e, null, n),
        t
      );
    }
    return kr(e, s, t, n), Vr(e);
  }
  function Di(e, t, n) {
    if (
      ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194176) !== 0))
    ) {
      var s = t.lanes;
      (s &= e.pendingLanes), (n |= s), (t.lanes = n), th(e, n);
    }
  }
  function Do(e, t) {
    var n = e.updateQueue,
      s = e.alternate;
    if (s !== null && ((s = s.updateQueue), n === s)) {
      var u = null,
        o = null;
      if (((n = n.firstBaseUpdate), n !== null)) {
        do {
          var y = {
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: null,
            next: null,
          };
          o === null ? (u = o = y) : (o = o.next = y), (n = n.next);
        } while (n !== null);
        o === null ? (u = o = t) : (o = o.next = t);
      } else u = o = t;
      (n = {
        baseState: s.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: o,
        shared: s.shared,
        callbacks: s.callbacks,
      }),
        (e.updateQueue = n);
      return;
    }
    (e = n.lastBaseUpdate),
      e === null ? (n.firstBaseUpdate = t) : (e.next = t),
      (n.lastBaseUpdate = t);
  }
  var Uo = !1;
  function Ui() {
    if (Uo) {
      var e = ps;
      if (e !== null) throw e;
    }
  }
  function Mi(e, t, n, s) {
    Uo = !1;
    var u = e.updateQueue;
    Ma = !1;
    var o = u.firstBaseUpdate,
      y = u.lastBaseUpdate,
      b = u.shared.pending;
    if (b !== null) {
      u.shared.pending = null;
      var S = b,
        j = S.next;
      (S.next = null), y === null ? (o = j) : (y.next = j), (y = S);
      var Q = e.alternate;
      Q !== null &&
        ((Q = Q.updateQueue),
        (b = Q.lastBaseUpdate),
        b !== y &&
          (b === null ? (Q.firstBaseUpdate = j) : (b.next = j),
          (Q.lastBaseUpdate = S)));
    }
    if (o !== null) {
      var P = u.baseState;
      (y = 0), (Q = j = S = null), (b = o);
      do {
        var L = b.lane & -536870913,
          F = L !== b.lane;
        if (F ? (Me & L) === L : (s & L) === L) {
          L !== 0 && L === ys && (Uo = !0),
            Q !== null &&
              (Q = Q.next =
                {
                  lane: 0,
                  tag: b.tag,
                  payload: b.payload,
                  callback: null,
                  next: null,
                });
          e: {
            var ue = e,
              ve = b;
            L = t;
            var nt = n;
            switch (ve.tag) {
              case 1:
                if (((ue = ve.payload), typeof ue == "function")) {
                  P = ue.call(nt, P, L);
                  break e;
                }
                P = ue;
                break e;
              case 3:
                ue.flags = (ue.flags & -65537) | 128;
              case 0:
                if (
                  ((ue = ve.payload),
                  (L = typeof ue == "function" ? ue.call(nt, P, L) : ue),
                  L == null)
                )
                  break e;
                P = le({}, P, L);
                break e;
              case 2:
                Ma = !0;
            }
          }
          (L = b.callback),
            L !== null &&
              ((e.flags |= 64),
              F && (e.flags |= 8192),
              (F = u.callbacks),
              F === null ? (u.callbacks = [L]) : F.push(L));
        } else
          (F = {
            lane: L,
            tag: b.tag,
            payload: b.payload,
            callback: b.callback,
            next: null,
          }),
            Q === null ? ((j = Q = F), (S = P)) : (Q = Q.next = F),
            (y |= L);
        if (((b = b.next), b === null)) {
          if (((b = u.shared.pending), b === null)) break;
          (F = b),
            (b = F.next),
            (F.next = null),
            (u.lastBaseUpdate = F),
            (u.shared.pending = null);
        }
      } while (!0);
      Q === null && (S = P),
        (u.baseState = S),
        (u.firstBaseUpdate = j),
        (u.lastBaseUpdate = Q),
        o === null && (u.shared.lanes = 0),
        (Va |= y),
        (e.lanes = y),
        (e.memoizedState = P);
    }
  }
  function hy(e, t) {
    if (typeof e != "function") throw Error(r(191, e));
    e.call(t);
  }
  function my(e, t) {
    var n = e.callbacks;
    if (n !== null)
      for (e.callbacks = null, e = 0; e < n.length; e++) hy(n[e], t);
  }
  function zi(e, t) {
    try {
      var n = t.updateQueue,
        s = n !== null ? n.lastEffect : null;
      if (s !== null) {
        var u = s.next;
        n = u;
        do {
          if ((n.tag & e) === e) {
            s = void 0;
            var o = n.create,
              y = n.inst;
            (s = o()), (y.destroy = s);
          }
          n = n.next;
        } while (n !== u);
      }
    } catch (b) {
      Ge(t, t.return, b);
    }
  }
  function Ha(e, t, n) {
    try {
      var s = t.updateQueue,
        u = s !== null ? s.lastEffect : null;
      if (u !== null) {
        var o = u.next;
        s = o;
        do {
          if ((s.tag & e) === e) {
            var y = s.inst,
              b = y.destroy;
            if (b !== void 0) {
              (y.destroy = void 0), (u = t);
              var S = n;
              try {
                b();
              } catch (j) {
                Ge(u, S, j);
              }
            }
          }
          s = s.next;
        } while (s !== o);
      }
    } catch (j) {
      Ge(t, t.return, j);
    }
  }
  function yy(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var n = e.stateNode;
      try {
        my(t, n);
      } catch (s) {
        Ge(e, e.return, s);
      }
    }
  }
  function py(e, t, n) {
    (n.props = Al(e.type, e.memoizedProps)), (n.state = e.memoizedState);
    try {
      n.componentWillUnmount();
    } catch (s) {
      Ge(e, t, s);
    }
  }
  function Nl(e, t) {
    try {
      var n = e.ref;
      if (n !== null) {
        var s = e.stateNode;
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var u = s;
            break;
          default:
            u = s;
        }
        typeof n == "function" ? (e.refCleanup = n(u)) : (n.current = u);
      }
    } catch (o) {
      Ge(e, t, o);
    }
  }
  function nn(e, t) {
    var n = e.ref,
      s = e.refCleanup;
    if (n !== null)
      if (typeof s == "function")
        try {
          s();
        } catch (u) {
          Ge(e, t, u);
        } finally {
          (e.refCleanup = null),
            (e = e.alternate),
            e != null && (e.refCleanup = null);
        }
      else if (typeof n == "function")
        try {
          n(null);
        } catch (u) {
          Ge(e, t, u);
        }
      else n.current = null;
  }
  function gy(e) {
    var t = e.type,
      n = e.memoizedProps,
      s = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          n.autoFocus && s.focus();
          break e;
        case "img":
          n.src ? (s.src = n.src) : n.srcSet && (s.srcset = n.srcSet);
      }
    } catch (u) {
      Ge(e, e.return, u);
    }
  }
  function vy(e, t, n) {
    try {
      var s = e.stateNode;
      K1(s, e.type, n, t), (s[Ft] = t);
    } catch (u) {
      Ge(e, e.return, u);
    }
  }
  function by(e) {
    return (
      e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 || e.tag === 4
    );
  }
  function Mo(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || by(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 27 && e.tag !== 18;

      ) {
        if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
        (e.child.return = e), (e = e.child);
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function zo(e, t, n) {
    var s = e.tag;
    if (s === 5 || s === 6)
      (e = e.stateNode),
        t
          ? n.nodeType === 8
            ? n.parentNode.insertBefore(e, t)
            : n.insertBefore(e, t)
          : (n.nodeType === 8
              ? ((t = n.parentNode), t.insertBefore(e, n))
              : ((t = n), t.appendChild(e)),
            (n = n._reactRootContainer),
            n != null || t.onclick !== null || (t.onclick = Su));
    else if (s !== 4 && s !== 27 && ((e = e.child), e !== null))
      for (zo(e, t, n), e = e.sibling; e !== null; )
        zo(e, t, n), (e = e.sibling);
  }
  function uu(e, t, n) {
    var s = e.tag;
    if (s === 5 || s === 6)
      (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (s !== 4 && s !== 27 && ((e = e.child), e !== null))
      for (uu(e, t, n), e = e.sibling; e !== null; )
        uu(e, t, n), (e = e.sibling);
  }
  var ua = !1,
    et = !1,
    Lo = !1,
    xy = typeof WeakSet == "function" ? WeakSet : Set,
    Et = null,
    Sy = !1;
  function R1(e, t) {
    if (((e = e.containerInfo), (ff = Cu), (e = Bh(e)), Hc(e))) {
      if ("selectionStart" in e)
        var n = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          n = ((n = e.ownerDocument) && n.defaultView) || window;
          var s = n.getSelection && n.getSelection();
          if (s && s.rangeCount !== 0) {
            n = s.anchorNode;
            var u = s.anchorOffset,
              o = s.focusNode;
            s = s.focusOffset;
            try {
              n.nodeType, o.nodeType;
            } catch {
              n = null;
              break e;
            }
            var y = 0,
              b = -1,
              S = -1,
              j = 0,
              Q = 0,
              P = e,
              L = null;
            t: for (;;) {
              for (
                var F;
                P !== n || (u !== 0 && P.nodeType !== 3) || (b = y + u),
                  P !== o || (s !== 0 && P.nodeType !== 3) || (S = y + s),
                  P.nodeType === 3 && (y += P.nodeValue.length),
                  (F = P.firstChild) !== null;

              )
                (L = P), (P = F);
              for (;;) {
                if (P === e) break t;
                if (
                  (L === n && ++j === u && (b = y),
                  L === o && ++Q === s && (S = y),
                  (F = P.nextSibling) !== null)
                )
                  break;
                (P = L), (L = P.parentNode);
              }
              P = F;
            }
            n = b === -1 || S === -1 ? null : { start: b, end: S };
          } else n = null;
        }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (
      df = { focusedElem: e, selectionRange: n }, Cu = !1, Et = t;
      Et !== null;

    )
      if (
        ((t = Et), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null)
      )
        (e.return = t), (Et = e);
      else
        for (; Et !== null; ) {
          switch (((t = Et), (o = t.alternate), (e = t.flags), t.tag)) {
            case 0:
              break;
            case 11:
            case 15:
              break;
            case 1:
              if (e & 1024 && o !== null) {
                (e = void 0),
                  (n = t),
                  (u = o.memoizedProps),
                  (o = o.memoizedState),
                  (s = n.stateNode);
                try {
                  var ue = Al(n.type, u, n.elementType === n.type);
                  (e = s.getSnapshotBeforeUpdate(ue, o)),
                    (s.__reactInternalSnapshotBeforeUpdate = e);
                } catch (ve) {
                  Ge(n, n.return, ve);
                }
              }
              break;
            case 3:
              if (e & 1024) {
                if (
                  ((e = t.stateNode.containerInfo), (n = e.nodeType), n === 9)
                )
                  pf(e);
                else if (n === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      pf(e);
                      break;
                    default:
                      e.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if (e & 1024) throw Error(r(163));
          }
          if (((e = t.sibling), e !== null)) {
            (e.return = t.return), (Et = e);
            break;
          }
          Et = t.return;
        }
    return (ue = Sy), (Sy = !1), ue;
  }
  function Ey(e, t, n) {
    var s = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        oa(e, n), s & 4 && zi(5, n);
        break;
      case 1:
        if ((oa(e, n), s & 4))
          if (((e = n.stateNode), t === null))
            try {
              e.componentDidMount();
            } catch (b) {
              Ge(n, n.return, b);
            }
          else {
            var u = Al(n.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              e.componentDidUpdate(u, t, e.__reactInternalSnapshotBeforeUpdate);
            } catch (b) {
              Ge(n, n.return, b);
            }
          }
        s & 64 && yy(n), s & 512 && Nl(n, n.return);
        break;
      case 3:
        if ((oa(e, n), s & 64 && ((s = n.updateQueue), s !== null))) {
          if (((e = null), n.child !== null))
            switch (n.child.tag) {
              case 27:
              case 5:
                e = n.child.stateNode;
                break;
              case 1:
                e = n.child.stateNode;
            }
          try {
            my(s, e);
          } catch (b) {
            Ge(n, n.return, b);
          }
        }
        break;
      case 26:
        oa(e, n), s & 512 && Nl(n, n.return);
        break;
      case 27:
      case 5:
        oa(e, n), t === null && s & 4 && gy(n), s & 512 && Nl(n, n.return);
        break;
      case 12:
        oa(e, n);
        break;
      case 13:
        oa(e, n), s & 4 && Ry(e, n);
        break;
      case 22:
        if (((u = n.memoizedState !== null || ua), !u)) {
          t = (t !== null && t.memoizedState !== null) || et;
          var o = ua,
            y = et;
          (ua = u),
            (et = t) && !y ? Ba(e, n, (n.subtreeFlags & 8772) !== 0) : oa(e, n),
            (ua = o),
            (et = y);
        }
        s & 512 &&
          (n.memoizedProps.mode === "manual"
            ? Nl(n, n.return)
            : nn(n, n.return));
        break;
      default:
        oa(e, n);
    }
  }
  function wy(e) {
    var t = e.alternate;
    t !== null && ((e.alternate = null), wy(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 && ((t = e.stateNode), t !== null && Sc(t)),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null);
  }
  var dt = null,
    an = !1;
  function ca(e, t, n) {
    for (n = n.child; n !== null; ) _y(e, t, n), (n = n.sibling);
  }
  function _y(e, t, n) {
    if (zt && typeof zt.onCommitFiberUnmount == "function")
      try {
        zt.onCommitFiberUnmount(_a, n);
      } catch {}
    switch (n.tag) {
      case 26:
        et || nn(n, t),
          ca(e, t, n),
          n.memoizedState
            ? n.memoizedState.count--
            : n.stateNode && ((n = n.stateNode), n.parentNode.removeChild(n));
        break;
      case 27:
        et || nn(n, t);
        var s = dt,
          u = an;
        for (
          dt = n.stateNode, ca(e, t, n), n = n.stateNode, t = n.attributes;
          t.length;

        )
          n.removeAttributeNode(t[0]);
        Sc(n), (dt = s), (an = u);
        break;
      case 5:
        et || nn(n, t);
      case 6:
        u = dt;
        var o = an;
        if (((dt = null), ca(e, t, n), (dt = u), (an = o), dt !== null))
          if (an)
            try {
              (e = dt),
                (s = n.stateNode),
                e.nodeType === 8
                  ? e.parentNode.removeChild(s)
                  : e.removeChild(s);
            } catch (y) {
              Ge(n, t, y);
            }
          else
            try {
              dt.removeChild(n.stateNode);
            } catch (y) {
              Ge(n, t, y);
            }
        break;
      case 18:
        dt !== null &&
          (an
            ? ((t = dt),
              (n = n.stateNode),
              t.nodeType === 8
                ? yf(t.parentNode, n)
                : t.nodeType === 1 && yf(t, n),
              Ii(t))
            : yf(dt, n.stateNode));
        break;
      case 4:
        (s = dt),
          (u = an),
          (dt = n.stateNode.containerInfo),
          (an = !0),
          ca(e, t, n),
          (dt = s),
          (an = u);
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        et || Ha(2, n, t), et || Ha(4, n, t), ca(e, t, n);
        break;
      case 1:
        et ||
          (nn(n, t),
          (s = n.stateNode),
          typeof s.componentWillUnmount == "function" && py(n, t, s)),
          ca(e, t, n);
        break;
      case 21:
        ca(e, t, n);
        break;
      case 22:
        et || nn(n, t),
          (et = (s = et) || n.memoizedState !== null),
          ca(e, t, n),
          (et = s);
        break;
      default:
        ca(e, t, n);
    }
  }
  function Ry(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate),
      e !== null &&
        ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
    )
      try {
        Ii(e);
      } catch (n) {
        Ge(t, t.return, n);
      }
  }
  function A1(e) {
    switch (e.tag) {
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new xy()), t;
      case 22:
        return (
          (e = e.stateNode),
          (t = e._retryCache),
          t === null && (t = e._retryCache = new xy()),
          t
        );
      default:
        throw Error(r(435, e.tag));
    }
  }
  function Ho(e, t) {
    var n = A1(e);
    t.forEach(function (s) {
      var u = q1.bind(null, e, s);
      n.has(s) || (n.add(s), s.then(u, u));
    });
  }
  function yn(e, t) {
    var n = t.deletions;
    if (n !== null)
      for (var s = 0; s < n.length; s++) {
        var u = n[s],
          o = e,
          y = t,
          b = y;
        e: for (; b !== null; ) {
          switch (b.tag) {
            case 27:
            case 5:
              (dt = b.stateNode), (an = !1);
              break e;
            case 3:
              (dt = b.stateNode.containerInfo), (an = !0);
              break e;
            case 4:
              (dt = b.stateNode.containerInfo), (an = !0);
              break e;
          }
          b = b.return;
        }
        if (dt === null) throw Error(r(160));
        _y(o, y, u),
          (dt = null),
          (an = !1),
          (o = u.alternate),
          o !== null && (o.return = null),
          (u.return = null);
      }
    if (t.subtreeFlags & 13878)
      for (t = t.child; t !== null; ) Ay(t, e), (t = t.sibling);
  }
  var Cn = null;
  function Ay(e, t) {
    var n = e.alternate,
      s = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        yn(t, e),
          pn(e),
          s & 4 && (Ha(3, e, e.return), zi(3, e), Ha(5, e, e.return));
        break;
      case 1:
        yn(t, e),
          pn(e),
          s & 512 && (et || n === null || nn(n, n.return)),
          s & 64 &&
            ua &&
            ((e = e.updateQueue),
            e !== null &&
              ((s = e.callbacks),
              s !== null &&
                ((n = e.shared.hiddenCallbacks),
                (e.shared.hiddenCallbacks = n === null ? s : n.concat(s)))));
        break;
      case 26:
        var u = Cn;
        if (
          (yn(t, e),
          pn(e),
          s & 512 && (et || n === null || nn(n, n.return)),
          s & 4)
        ) {
          var o = n !== null ? n.memoizedState : null;
          if (((s = e.memoizedState), n === null))
            if (s === null)
              if (e.stateNode === null) {
                e: {
                  (s = e.type),
                    (n = e.memoizedProps),
                    (u = u.ownerDocument || u);
                  t: switch (s) {
                    case "title":
                      (o = u.getElementsByTagName("title")[0]),
                        (!o ||
                          o[ri] ||
                          o[Nt] ||
                          o.namespaceURI === "http://www.w3.org/2000/svg" ||
                          o.hasAttribute("itemprop")) &&
                          ((o = u.createElement(s)),
                          u.head.insertBefore(
                            o,
                            u.querySelector("head > title")
                          )),
                        Tt(o, s, n),
                        (o[Nt] = e),
                        xt(o),
                        (s = o);
                      break e;
                    case "link":
                      var y = g0("link", "href", u).get(s + (n.href || ""));
                      if (y) {
                        for (var b = 0; b < y.length; b++)
                          if (
                            ((o = y[b]),
                            o.getAttribute("href") ===
                              (n.href == null ? null : n.href) &&
                              o.getAttribute("rel") ===
                                (n.rel == null ? null : n.rel) &&
                              o.getAttribute("title") ===
                                (n.title == null ? null : n.title) &&
                              o.getAttribute("crossorigin") ===
                                (n.crossOrigin == null ? null : n.crossOrigin))
                          ) {
                            y.splice(b, 1);
                            break t;
                          }
                      }
                      (o = u.createElement(s)),
                        Tt(o, s, n),
                        u.head.appendChild(o);
                      break;
                    case "meta":
                      if (
                        (y = g0("meta", "content", u).get(
                          s + (n.content || "")
                        ))
                      ) {
                        for (b = 0; b < y.length; b++)
                          if (
                            ((o = y[b]),
                            o.getAttribute("content") ===
                              (n.content == null ? null : "" + n.content) &&
                              o.getAttribute("name") ===
                                (n.name == null ? null : n.name) &&
                              o.getAttribute("property") ===
                                (n.property == null ? null : n.property) &&
                              o.getAttribute("http-equiv") ===
                                (n.httpEquiv == null ? null : n.httpEquiv) &&
                              o.getAttribute("charset") ===
                                (n.charSet == null ? null : n.charSet))
                          ) {
                            y.splice(b, 1);
                            break t;
                          }
                      }
                      (o = u.createElement(s)),
                        Tt(o, s, n),
                        u.head.appendChild(o);
                      break;
                    default:
                      throw Error(r(468, s));
                  }
                  (o[Nt] = e), xt(o), (s = o);
                }
                e.stateNode = s;
              } else v0(u, e.type, e.stateNode);
            else e.stateNode = p0(u, s, e.memoizedProps);
          else
            o !== s
              ? (o === null
                  ? n.stateNode !== null &&
                    ((n = n.stateNode), n.parentNode.removeChild(n))
                  : o.count--,
                s === null
                  ? v0(u, e.type, e.stateNode)
                  : p0(u, s, e.memoizedProps))
              : s === null &&
                e.stateNode !== null &&
                vy(e, e.memoizedProps, n.memoizedProps);
        }
        break;
      case 27:
        if (s & 4 && e.alternate === null) {
          (u = e.stateNode), (o = e.memoizedProps);
          try {
            for (var S = u.firstChild; S; ) {
              var j = S.nextSibling,
                Q = S.nodeName;
              S[ri] ||
                Q === "HEAD" ||
                Q === "BODY" ||
                Q === "SCRIPT" ||
                Q === "STYLE" ||
                (Q === "LINK" && S.rel.toLowerCase() === "stylesheet") ||
                u.removeChild(S),
                (S = j);
            }
            for (var P = e.type, L = u.attributes; L.length; )
              u.removeAttributeNode(L[0]);
            Tt(u, P, o), (u[Nt] = e), (u[Ft] = o);
          } catch (ue) {
            Ge(e, e.return, ue);
          }
        }
      case 5:
        if (
          (yn(t, e),
          pn(e),
          s & 512 && (et || n === null || nn(n, n.return)),
          e.flags & 32)
        ) {
          u = e.stateNode;
          try {
            as(u, "");
          } catch (ue) {
            Ge(e, e.return, ue);
          }
        }
        s & 4 &&
          e.stateNode != null &&
          ((u = e.memoizedProps), vy(e, u, n !== null ? n.memoizedProps : u)),
          s & 1024 && (Lo = !0);
        break;
      case 6:
        if ((yn(t, e), pn(e), s & 4)) {
          if (e.stateNode === null) throw Error(r(162));
          (s = e.memoizedProps), (n = e.stateNode);
          try {
            n.nodeValue = s;
          } catch (ue) {
            Ge(e, e.return, ue);
          }
        }
        break;
      case 3:
        if (
          ((Ru = null),
          (u = Cn),
          (Cn = wu(t.containerInfo)),
          yn(t, e),
          (Cn = u),
          pn(e),
          s & 4 && n !== null && n.memoizedState.isDehydrated)
        )
          try {
            Ii(t.containerInfo);
          } catch (ue) {
            Ge(e, e.return, ue);
          }
        Lo && ((Lo = !1), Ty(e));
        break;
      case 4:
        (s = Cn),
          (Cn = wu(e.stateNode.containerInfo)),
          yn(t, e),
          pn(e),
          (Cn = s);
        break;
      case 12:
        yn(t, e), pn(e);
        break;
      case 13:
        yn(t, e),
          pn(e),
          e.child.flags & 8192 &&
            (e.memoizedState !== null) !=
              (n !== null && n.memoizedState !== null) &&
            (Xo = re()),
          s & 4 &&
            ((s = e.updateQueue),
            s !== null && ((e.updateQueue = null), Ho(e, s)));
        break;
      case 22:
        if (
          (s & 512 && (et || n === null || nn(n, n.return)),
          (S = e.memoizedState !== null),
          (j = n !== null && n.memoizedState !== null),
          (Q = ua),
          (P = et),
          (ua = Q || S),
          (et = P || j),
          yn(t, e),
          (et = P),
          (ua = Q),
          pn(e),
          (t = e.stateNode),
          (t._current = e),
          (t._visibility &= -3),
          (t._visibility |= t._pendingVisibility & 2),
          s & 8192 &&
            ((t._visibility = S ? t._visibility & -2 : t._visibility | 1),
            S && ((t = ua || et), n === null || j || t || xs(e)),
            e.memoizedProps === null || e.memoizedProps.mode !== "manual"))
        )
          e: for (n = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26 || t.tag === 27) {
              if (n === null) {
                j = n = t;
                try {
                  if (((u = j.stateNode), S))
                    (o = u.style),
                      typeof o.setProperty == "function"
                        ? o.setProperty("display", "none", "important")
                        : (o.display = "none");
                  else {
                    (y = j.stateNode), (b = j.memoizedProps.style);
                    var F =
                      b != null && b.hasOwnProperty("display")
                        ? b.display
                        : null;
                    y.style.display =
                      F == null || typeof F == "boolean" ? "" : ("" + F).trim();
                  }
                } catch (ue) {
                  Ge(j, j.return, ue);
                }
              }
            } else if (t.tag === 6) {
              if (n === null) {
                j = t;
                try {
                  j.stateNode.nodeValue = S ? "" : j.memoizedProps;
                } catch (ue) {
                  Ge(j, j.return, ue);
                }
              }
            } else if (
              ((t.tag !== 22 && t.tag !== 23) ||
                t.memoizedState === null ||
                t === e) &&
              t.child !== null
            ) {
              (t.child.return = t), (t = t.child);
              continue;
            }
            if (t === e) break e;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break e;
              n === t && (n = null), (t = t.return);
            }
            n === t && (n = null),
              (t.sibling.return = t.return),
              (t = t.sibling);
          }
        s & 4 &&
          ((s = e.updateQueue),
          s !== null &&
            ((n = s.retryQueue),
            n !== null && ((s.retryQueue = null), Ho(e, n))));
        break;
      case 19:
        yn(t, e),
          pn(e),
          s & 4 &&
            ((s = e.updateQueue),
            s !== null && ((e.updateQueue = null), Ho(e, s)));
        break;
      case 21:
        break;
      default:
        yn(t, e), pn(e);
    }
  }
  function pn(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        if (e.tag !== 27) {
          e: {
            for (var n = e.return; n !== null; ) {
              if (by(n)) {
                var s = n;
                break e;
              }
              n = n.return;
            }
            throw Error(r(160));
          }
          switch (s.tag) {
            case 27:
              var u = s.stateNode,
                o = Mo(e);
              uu(e, o, u);
              break;
            case 5:
              var y = s.stateNode;
              s.flags & 32 && (as(y, ""), (s.flags &= -33));
              var b = Mo(e);
              uu(e, b, y);
              break;
            case 3:
            case 4:
              var S = s.stateNode.containerInfo,
                j = Mo(e);
              zo(e, j, S);
              break;
            default:
              throw Error(r(161));
          }
        }
      } catch (Q) {
        Ge(e, e.return, Q);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Ty(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        Ty(t),
          t.tag === 5 && t.flags & 1024 && t.stateNode.reset(),
          (e = e.sibling);
      }
  }
  function oa(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; ) Ey(e, t.alternate, t), (t = t.sibling);
  }
  function xs(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Ha(4, t, t.return), xs(t);
          break;
        case 1:
          nn(t, t.return);
          var n = t.stateNode;
          typeof n.componentWillUnmount == "function" && py(t, t.return, n),
            xs(t);
          break;
        case 26:
        case 27:
        case 5:
          nn(t, t.return), xs(t);
          break;
        case 22:
          nn(t, t.return), t.memoizedState === null && xs(t);
          break;
        default:
          xs(t);
      }
      e = e.sibling;
    }
  }
  function Ba(e, t, n) {
    for (n = n && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var s = t.alternate,
        u = e,
        o = t,
        y = o.flags;
      switch (o.tag) {
        case 0:
        case 11:
        case 15:
          Ba(u, o, n), zi(4, o);
          break;
        case 1:
          if (
            (Ba(u, o, n),
            (s = o),
            (u = s.stateNode),
            typeof u.componentDidMount == "function")
          )
            try {
              u.componentDidMount();
            } catch (j) {
              Ge(s, s.return, j);
            }
          if (((s = o), (u = s.updateQueue), u !== null)) {
            var b = s.stateNode;
            try {
              var S = u.shared.hiddenCallbacks;
              if (S !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < S.length; u++)
                  hy(S[u], b);
            } catch (j) {
              Ge(s, s.return, j);
            }
          }
          n && y & 64 && yy(o), Nl(o, o.return);
          break;
        case 26:
        case 27:
        case 5:
          Ba(u, o, n), n && s === null && y & 4 && gy(o), Nl(o, o.return);
          break;
        case 12:
          Ba(u, o, n);
          break;
        case 13:
          Ba(u, o, n), n && y & 4 && Ry(u, o);
          break;
        case 22:
          o.memoizedState === null && Ba(u, o, n), Nl(o, o.return);
          break;
        default:
          Ba(u, o, n);
      }
      t = t.sibling;
    }
  }
  function Bo(e, t) {
    var n = null;
    e !== null &&
      e.memoizedState !== null &&
      e.memoizedState.cachePool !== null &&
      (n = e.memoizedState.cachePool.pool),
      (e = null),
      t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (e = t.memoizedState.cachePool.pool),
      e !== n && (e != null && e.refCount++, n != null && Ri(n));
  }
  function qo(e, t) {
    (e = null),
      t.alternate !== null && (e = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== e && (t.refCount++, e != null && Ri(e));
  }
  function qa(e, t, n, s) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) Cy(e, t, n, s), (t = t.sibling);
  }
  function Cy(e, t, n, s) {
    var u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        qa(e, t, n, s), u & 2048 && zi(9, t);
        break;
      case 3:
        qa(e, t, n, s),
          u & 2048 &&
            ((e = null),
            t.alternate !== null && (e = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== e && (t.refCount++, e != null && Ri(e)));
        break;
      case 12:
        if (u & 2048) {
          qa(e, t, n, s), (e = t.stateNode);
          try {
            var o = t.memoizedProps,
              y = o.id,
              b = o.onPostCommit;
            typeof b == "function" &&
              b(
                y,
                t.alternate === null ? "mount" : "update",
                e.passiveEffectDuration,
                -0
              );
          } catch (S) {
            Ge(t, t.return, S);
          }
        } else qa(e, t, n, s);
        break;
      case 23:
        break;
      case 22:
        (o = t.stateNode),
          t.memoizedState !== null
            ? o._visibility & 4
              ? qa(e, t, n, s)
              : Li(e, t)
            : o._visibility & 4
            ? qa(e, t, n, s)
            : ((o._visibility |= 4),
              Ss(e, t, n, s, (t.subtreeFlags & 10256) !== 0)),
          u & 2048 && Bo(t.alternate, t);
        break;
      case 24:
        qa(e, t, n, s), u & 2048 && qo(t.alternate, t);
        break;
      default:
        qa(e, t, n, s);
    }
  }
  function Ss(e, t, n, s, u) {
    for (u = u && (t.subtreeFlags & 10256) !== 0, t = t.child; t !== null; ) {
      var o = e,
        y = t,
        b = n,
        S = s,
        j = y.flags;
      switch (y.tag) {
        case 0:
        case 11:
        case 15:
          Ss(o, y, b, S, u), zi(8, y);
          break;
        case 23:
          break;
        case 22:
          var Q = y.stateNode;
          y.memoizedState !== null
            ? Q._visibility & 4
              ? Ss(o, y, b, S, u)
              : Li(o, y)
            : ((Q._visibility |= 4), Ss(o, y, b, S, u)),
            u && j & 2048 && Bo(y.alternate, y);
          break;
        case 24:
          Ss(o, y, b, S, u), u && j & 2048 && qo(y.alternate, y);
          break;
        default:
          Ss(o, y, b, S, u);
      }
      t = t.sibling;
    }
  }
  function Li(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var n = e,
          s = t,
          u = s.flags;
        switch (s.tag) {
          case 22:
            Li(n, s), u & 2048 && Bo(s.alternate, s);
            break;
          case 24:
            Li(n, s), u & 2048 && qo(s.alternate, s);
            break;
          default:
            Li(n, s);
        }
        t = t.sibling;
      }
  }
  var Hi = 8192;
  function Es(e) {
    if (e.subtreeFlags & Hi)
      for (e = e.child; e !== null; ) Ny(e), (e = e.sibling);
  }
  function Ny(e) {
    switch (e.tag) {
      case 26:
        Es(e),
          e.flags & Hi &&
            e.memoizedState !== null &&
            mb(Cn, e.memoizedState, e.memoizedProps);
        break;
      case 5:
        Es(e);
        break;
      case 3:
      case 4:
        var t = Cn;
        (Cn = wu(e.stateNode.containerInfo)), Es(e), (Cn = t);
        break;
      case 22:
        e.memoizedState === null &&
          ((t = e.alternate),
          t !== null && t.memoizedState !== null
            ? ((t = Hi), (Hi = 16777216), Es(e), (Hi = t))
            : Es(e));
        break;
      default:
        Es(e);
    }
  }
  function Oy(e) {
    var t = e.alternate;
    if (t !== null && ((e = t.child), e !== null)) {
      t.child = null;
      do (t = e.sibling), (e.sibling = null), (e = t);
      while (e !== null);
    }
  }
  function Bi(e) {
    var t = e.deletions;
    if (e.flags & 16) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var s = t[n];
          (Et = s), Dy(s, e);
        }
      Oy(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) jy(e), (e = e.sibling);
  }
  function jy(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Bi(e), e.flags & 2048 && Ha(9, e, e.return);
        break;
      case 3:
        Bi(e);
        break;
      case 12:
        Bi(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null &&
        t._visibility & 4 &&
        (e.return === null || e.return.tag !== 13)
          ? ((t._visibility &= -5), cu(e))
          : Bi(e);
        break;
      default:
        Bi(e);
    }
  }
  function cu(e) {
    var t = e.deletions;
    if (e.flags & 16) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var s = t[n];
          (Et = s), Dy(s, e);
        }
      Oy(e);
    }
    for (e = e.child; e !== null; ) {
      switch (((t = e), t.tag)) {
        case 0:
        case 11:
        case 15:
          Ha(8, t, t.return), cu(t);
          break;
        case 22:
          (n = t.stateNode),
            n._visibility & 4 && ((n._visibility &= -5), cu(t));
          break;
        default:
          cu(t);
      }
      e = e.sibling;
    }
  }
  function Dy(e, t) {
    for (; Et !== null; ) {
      var n = Et;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          Ha(8, n, t);
          break;
        case 23:
        case 22:
          if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
            var s = n.memoizedState.cachePool.pool;
            s != null && s.refCount++;
          }
          break;
        case 24:
          Ri(n.memoizedState.cache);
      }
      if (((s = n.child), s !== null)) (s.return = n), (Et = s);
      else
        e: for (n = e; Et !== null; ) {
          s = Et;
          var u = s.sibling,
            o = s.return;
          if ((wy(s), s === n)) {
            Et = null;
            break e;
          }
          if (u !== null) {
            (u.return = o), (Et = u);
            break e;
          }
          Et = o;
        }
    }
  }
  function T1(e, t, n, s) {
    (this.tag = e),
      (this.key = n),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = t),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = s),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null);
  }
  function gn(e, t, n, s) {
    return new T1(e, t, n, s);
  }
  function ko(e) {
    return (e = e.prototype), !(!e || !e.isReactComponent);
  }
  function ka(e, t) {
    var n = e.alternate;
    return (
      n === null
        ? ((n = gn(e.tag, t, e.key, e.mode)),
          (n.elementType = e.elementType),
          (n.type = e.type),
          (n.stateNode = e.stateNode),
          (n.alternate = e),
          (e.alternate = n))
        : ((n.pendingProps = t),
          (n.type = e.type),
          (n.flags = 0),
          (n.subtreeFlags = 0),
          (n.deletions = null)),
      (n.flags = e.flags & 31457280),
      (n.childLanes = e.childLanes),
      (n.lanes = e.lanes),
      (n.child = e.child),
      (n.memoizedProps = e.memoizedProps),
      (n.memoizedState = e.memoizedState),
      (n.updateQueue = e.updateQueue),
      (t = e.dependencies),
      (n.dependencies =
        t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
      (n.sibling = e.sibling),
      (n.index = e.index),
      (n.ref = e.ref),
      (n.refCleanup = e.refCleanup),
      n
    );
  }
  function Uy(e, t) {
    e.flags &= 31457282;
    var n = e.alternate;
    return (
      n === null
        ? ((e.childLanes = 0),
          (e.lanes = t),
          (e.child = null),
          (e.subtreeFlags = 0),
          (e.memoizedProps = null),
          (e.memoizedState = null),
          (e.updateQueue = null),
          (e.dependencies = null),
          (e.stateNode = null))
        : ((e.childLanes = n.childLanes),
          (e.lanes = n.lanes),
          (e.child = n.child),
          (e.subtreeFlags = 0),
          (e.deletions = null),
          (e.memoizedProps = n.memoizedProps),
          (e.memoizedState = n.memoizedState),
          (e.updateQueue = n.updateQueue),
          (e.type = n.type),
          (t = n.dependencies),
          (e.dependencies =
            t === null
              ? null
              : { lanes: t.lanes, firstContext: t.firstContext })),
      e
    );
  }
  function ou(e, t, n, s, u, o) {
    var y = 0;
    if (((s = e), typeof e == "function")) ko(e) && (y = 1);
    else if (typeof e == "string")
      y = db(e, n, Wt.current)
        ? 26
        : e === "html" || e === "head" || e === "body"
        ? 27
        : 5;
    else
      e: switch (e) {
        case h:
          return Ol(n.children, u, o, t);
        case p:
          (y = 8), (u |= 24);
          break;
        case v:
          return (
            (e = gn(12, n, t, u | 2)), (e.elementType = v), (e.lanes = o), e
          );
        case D:
          return (e = gn(13, n, t, u)), (e.elementType = D), (e.lanes = o), e;
        case C:
          return (e = gn(19, n, t, u)), (e.elementType = C), (e.lanes = o), e;
        case k:
          return My(n, u, o, t);
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case x:
              case O:
                y = 10;
                break e;
              case E:
                y = 9;
                break e;
              case _:
                y = 11;
                break e;
              case H:
                y = 14;
                break e;
              case B:
                (y = 16), (s = null);
                break e;
            }
          (y = 29),
            (n = Error(r(130, e === null ? "null" : typeof e, ""))),
            (s = null);
      }
    return (
      (t = gn(y, n, t, u)), (t.elementType = e), (t.type = s), (t.lanes = o), t
    );
  }
  function Ol(e, t, n, s) {
    return (e = gn(7, e, s, t)), (e.lanes = n), e;
  }
  function My(e, t, n, s) {
    (e = gn(22, e, s, t)), (e.elementType = k), (e.lanes = n);
    var u = {
      _visibility: 1,
      _pendingVisibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null,
      _current: null,
      detach: function () {
        var o = u._current;
        if (o === null) throw Error(r(456));
        if (!(u._pendingVisibility & 2)) {
          var y = Ca(o, 2);
          y !== null && ((u._pendingVisibility |= 2), Ht(y, o, 2));
        }
      },
      attach: function () {
        var o = u._current;
        if (o === null) throw Error(r(456));
        if (u._pendingVisibility & 2) {
          var y = Ca(o, 2);
          y !== null && ((u._pendingVisibility &= -3), Ht(y, o, 2));
        }
      },
    };
    return (e.stateNode = u), e;
  }
  function Vo(e, t, n) {
    return (e = gn(6, e, null, t)), (e.lanes = n), e;
  }
  function Fo(e, t, n) {
    return (
      (t = gn(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = n),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    );
  }
  function fa(e) {
    e.flags |= 4;
  }
  function zy(e, t) {
    if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
    else if (((e.flags |= 16777216), !b0(t))) {
      if (
        ((t = mn.current),
        t !== null &&
          ((Me & 4194176) === Me
            ? kn !== null
            : ((Me & 62914560) !== Me && !(Me & 536870912)) || t !== kn))
      )
        throw ((Ei = Xc), Wh);
      e.flags |= 8192;
    }
  }
  function fu(e, t) {
    t !== null && (e.flags |= 4),
      e.flags & 16384 &&
        ((t = e.tag !== 22 ? Id() : 536870912), (e.lanes |= t), (_s |= t));
  }
  function qi(e, t) {
    if (!He)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var n = null; t !== null; )
            t.alternate !== null && (n = t), (t = t.sibling);
          n === null ? (e.tail = null) : (n.sibling = null);
          break;
        case "collapsed":
          n = e.tail;
          for (var s = null; n !== null; )
            n.alternate !== null && (s = n), (n = n.sibling);
          s === null
            ? t || e.tail === null
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (s.sibling = null);
      }
  }
  function We(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
      n = 0,
      s = 0;
    if (t)
      for (var u = e.child; u !== null; )
        (n |= u.lanes | u.childLanes),
          (s |= u.subtreeFlags & 31457280),
          (s |= u.flags & 31457280),
          (u.return = e),
          (u = u.sibling);
    else
      for (u = e.child; u !== null; )
        (n |= u.lanes | u.childLanes),
          (s |= u.subtreeFlags),
          (s |= u.flags),
          (u.return = e),
          (u = u.sibling);
    return (e.subtreeFlags |= s), (e.childLanes = n), t;
  }
  function C1(e, t, n) {
    var s = t.pendingProps;
    switch ((Gc(t), t.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return We(t), null;
      case 1:
        return We(t), null;
      case 3:
        return (
          (n = t.stateNode),
          (s = null),
          e !== null && (s = e.memoizedState.cache),
          t.memoizedState.cache !== s && (t.flags |= 2048),
          ra(pt),
          fl(),
          n.pendingContext &&
            ((n.context = n.pendingContext), (n.pendingContext = null)),
          (e === null || e.child === null) &&
            (vi(t)
              ? fa(t)
              : e === null ||
                (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
                ((t.flags |= 1024), Tn !== null && ($o(Tn), (Tn = null)))),
          We(t),
          null
        );
      case 26:
        return (
          (n = t.memoizedState),
          e === null
            ? (fa(t),
              n !== null ? (We(t), zy(t, n)) : (We(t), (t.flags &= -16777217)))
            : n
            ? n !== e.memoizedState
              ? (fa(t), We(t), zy(t, n))
              : (We(t), (t.flags &= -16777217))
            : (e.memoizedProps !== s && fa(t), We(t), (t.flags &= -16777217)),
          null
        );
      case 27:
        A(t), (n = Rn.current);
        var u = t.type;
        if (e !== null && t.stateNode != null) e.memoizedProps !== s && fa(t);
        else {
          if (!s) {
            if (t.stateNode === null) throw Error(r(166));
            return We(t), null;
          }
          (e = Wt.current),
            vi(t) ? $h(t) : ((e = f0(u, s, n)), (t.stateNode = e), fa(t));
        }
        return We(t), null;
      case 5:
        if ((A(t), (n = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== s && fa(t);
        else {
          if (!s) {
            if (t.stateNode === null) throw Error(r(166));
            return We(t), null;
          }
          if (((e = Wt.current), vi(t))) $h(t);
          else {
            switch (((u = Eu(Rn.current)), e)) {
              case 1:
                e = u.createElementNS("http://www.w3.org/2000/svg", n);
                break;
              case 2:
                e = u.createElementNS("http://www.w3.org/1998/Math/MathML", n);
                break;
              default:
                switch (n) {
                  case "svg":
                    e = u.createElementNS("http://www.w3.org/2000/svg", n);
                    break;
                  case "math":
                    e = u.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      n
                    );
                    break;
                  case "script":
                    (e = u.createElement("div")),
                      (e.innerHTML = "<script></script>"),
                      (e = e.removeChild(e.firstChild));
                    break;
                  case "select":
                    (e =
                      typeof s.is == "string"
                        ? u.createElement("select", { is: s.is })
                        : u.createElement("select")),
                      s.multiple
                        ? (e.multiple = !0)
                        : s.size && (e.size = s.size);
                    break;
                  default:
                    e =
                      typeof s.is == "string"
                        ? u.createElement(n, { is: s.is })
                        : u.createElement(n);
                }
            }
            (e[Nt] = t), (e[Ft] = s);
            e: for (u = t.child; u !== null; ) {
              if (u.tag === 5 || u.tag === 6) e.appendChild(u.stateNode);
              else if (u.tag !== 4 && u.tag !== 27 && u.child !== null) {
                (u.child.return = u), (u = u.child);
                continue;
              }
              if (u === t) break e;
              for (; u.sibling === null; ) {
                if (u.return === null || u.return === t) break e;
                u = u.return;
              }
              (u.sibling.return = u.return), (u = u.sibling);
            }
            t.stateNode = e;
            e: switch ((Tt(e, n, s), n)) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                e = !!s.autoFocus;
                break e;
              case "img":
                e = !0;
                break e;
              default:
                e = !1;
            }
            e && fa(t);
          }
        }
        return We(t), (t.flags &= -16777217), null;
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== s && fa(t);
        else {
          if (typeof s != "string" && t.stateNode === null) throw Error(r(166));
          if (((e = Rn.current), vi(t))) {
            if (
              ((e = t.stateNode),
              (n = t.memoizedProps),
              (s = null),
              (u = Lt),
              u !== null)
            )
              switch (u.tag) {
                case 27:
                case 5:
                  s = u.memoizedProps;
              }
            (e[Nt] = t),
              (e = !!(
                e.nodeValue === n ||
                (s !== null && s.suppressHydrationWarning === !0) ||
                s0(e.nodeValue, n)
              )),
              e || xl(t);
          } else (e = Eu(e).createTextNode(s)), (e[Nt] = t), (t.stateNode = e);
        }
        return We(t), null;
      case 13:
        if (
          ((s = t.memoizedState),
          e === null ||
            (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (((u = vi(t)), s !== null && s.dehydrated !== null)) {
            if (e === null) {
              if (!u) throw Error(r(318));
              if (
                ((u = t.memoizedState),
                (u = u !== null ? u.dehydrated : null),
                !u)
              )
                throw Error(r(317));
              u[Nt] = t;
            } else
              bi(),
                !(t.flags & 128) && (t.memoizedState = null),
                (t.flags |= 4);
            We(t), (u = !1);
          } else Tn !== null && ($o(Tn), (Tn = null)), (u = !0);
          if (!u) return t.flags & 256 ? (aa(t), t) : (aa(t), null);
        }
        if ((aa(t), t.flags & 128)) return (t.lanes = n), t;
        if (
          ((n = s !== null), (e = e !== null && e.memoizedState !== null), n)
        ) {
          (s = t.child),
            (u = null),
            s.alternate !== null &&
              s.alternate.memoizedState !== null &&
              s.alternate.memoizedState.cachePool !== null &&
              (u = s.alternate.memoizedState.cachePool.pool);
          var o = null;
          s.memoizedState !== null &&
            s.memoizedState.cachePool !== null &&
            (o = s.memoizedState.cachePool.pool),
            o !== u && (s.flags |= 2048);
        }
        return (
          n !== e && n && (t.child.flags |= 8192),
          fu(t, t.updateQueue),
          We(t),
          null
        );
      case 4:
        return fl(), e === null && uf(t.stateNode.containerInfo), We(t), null;
      case 10:
        return ra(t.type), We(t), null;
      case 19:
        if ((Je(yt), (u = t.memoizedState), u === null)) return We(t), null;
        if (((s = (t.flags & 128) !== 0), (o = u.rendering), o === null))
          if (s) qi(u, !1);
          else {
            if (tt !== 0 || (e !== null && e.flags & 128))
              for (e = t.child; e !== null; ) {
                if (((o = Zr(e)), o !== null)) {
                  for (
                    t.flags |= 128,
                      qi(u, !1),
                      e = o.updateQueue,
                      t.updateQueue = e,
                      fu(t, e),
                      t.subtreeFlags = 0,
                      e = n,
                      n = t.child;
                    n !== null;

                  )
                    Uy(n, e), (n = n.sibling);
                  return Ye(yt, (yt.current & 1) | 2), t.child;
                }
                e = e.sibling;
              }
            u.tail !== null &&
              re() > du &&
              ((t.flags |= 128), (s = !0), qi(u, !1), (t.lanes = 4194304));
          }
        else {
          if (!s)
            if (((e = Zr(o)), e !== null)) {
              if (
                ((t.flags |= 128),
                (s = !0),
                (e = e.updateQueue),
                (t.updateQueue = e),
                fu(t, e),
                qi(u, !0),
                u.tail === null &&
                  u.tailMode === "hidden" &&
                  !o.alternate &&
                  !He)
              )
                return We(t), null;
            } else
              2 * re() - u.renderingStartTime > du &&
                n !== 536870912 &&
                ((t.flags |= 128), (s = !0), qi(u, !1), (t.lanes = 4194304));
          u.isBackwards
            ? ((o.sibling = t.child), (t.child = o))
            : ((e = u.last),
              e !== null ? (e.sibling = o) : (t.child = o),
              (u.last = o));
        }
        return u.tail !== null
          ? ((t = u.tail),
            (u.rendering = t),
            (u.tail = t.sibling),
            (u.renderingStartTime = re()),
            (t.sibling = null),
            (e = yt.current),
            Ye(yt, s ? (e & 1) | 2 : e & 1),
            t)
          : (We(t), null);
      case 22:
      case 23:
        return (
          aa(t),
          Zc(),
          (s = t.memoizedState !== null),
          e !== null
            ? (e.memoizedState !== null) !== s && (t.flags |= 8192)
            : s && (t.flags |= 8192),
          s
            ? n & 536870912 &&
              !(t.flags & 128) &&
              (We(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : We(t),
          (n = t.updateQueue),
          n !== null && fu(t, n.retryQueue),
          (n = null),
          e !== null &&
            e.memoizedState !== null &&
            e.memoizedState.cachePool !== null &&
            (n = e.memoizedState.cachePool.pool),
          (s = null),
          t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (s = t.memoizedState.cachePool.pool),
          s !== n && (t.flags |= 2048),
          e !== null && Je(El),
          null
        );
      case 24:
        return (
          (n = null),
          e !== null && (n = e.memoizedState.cache),
          t.memoizedState.cache !== n && (t.flags |= 2048),
          ra(pt),
          We(t),
          null
        );
      case 25:
        return null;
    }
    throw Error(r(156, t.tag));
  }
  function N1(e, t) {
    switch ((Gc(t), t.tag)) {
      case 1:
        return (
          (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 3:
        return (
          ra(pt),
          fl(),
          (e = t.flags),
          e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 26:
      case 27:
      case 5:
        return A(t), null;
      case 13:
        if (
          (aa(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)
        ) {
          if (t.alternate === null) throw Error(r(340));
          bi();
        }
        return (
          (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 19:
        return Je(yt), null;
      case 4:
        return fl(), null;
      case 10:
        return ra(t.type), null;
      case 22:
      case 23:
        return (
          aa(t),
          Zc(),
          e !== null && Je(El),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 24:
        return ra(pt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Ly(e, t) {
    switch ((Gc(t), t.tag)) {
      case 3:
        ra(pt), fl();
        break;
      case 26:
      case 27:
      case 5:
        A(t);
        break;
      case 4:
        fl();
        break;
      case 13:
        aa(t);
        break;
      case 19:
        Je(yt);
        break;
      case 10:
        ra(t.type);
        break;
      case 22:
      case 23:
        aa(t), Zc(), e !== null && Je(El);
        break;
      case 24:
        ra(pt);
    }
  }
  var O1 = {
      getCacheForType: function (e) {
        var t = Ot(pt),
          n = t.data.get(e);
        return n === void 0 && ((n = e()), t.data.set(e, n)), n;
      },
    },
    j1 = typeof WeakMap == "function" ? WeakMap : Map,
    Ie = 0,
    Xe = null,
    Ne = null,
    Me = 0,
    Pe = 0,
    ln = null,
    da = !1,
    ws = !1,
    Qo = !1,
    ha = 0,
    tt = 0,
    Va = 0,
    jl = 0,
    Go = 0,
    vn = 0,
    _s = 0,
    ki = null,
    Fn = null,
    Yo = !1,
    Xo = 0,
    du = 1 / 0,
    hu = null,
    Fa = null,
    mu = !1,
    Dl = null,
    Vi = 0,
    Po = 0,
    Zo = null,
    Fi = 0,
    Ko = null;
  function sn() {
    if (Ie & 2 && Me !== 0) return Me & -Me;
    if (X.T !== null) {
      var e = ys;
      return e !== 0 ? e : af();
    }
    return ah();
  }
  function Hy() {
    vn === 0 && (vn = !(Me & 536870912) || He ? Wd() : 536870912);
    var e = mn.current;
    return e !== null && (e.flags |= 32), vn;
  }
  function Ht(e, t, n) {
    ((e === Xe && Pe === 2) || e.cancelPendingCommit !== null) &&
      (Rs(e, 0), ma(e, Me, vn, !1)),
      ii(e, n),
      (!(Ie & 2) || e !== Xe) &&
        (e === Xe && (!(Ie & 2) && (jl |= n), tt === 4 && ma(e, Me, vn, !1)),
        Qn(e));
  }
  function By(e, t, n) {
    if (Ie & 6) throw Error(r(327));
    var s = (!n && (t & 60) === 0 && (t & e.expiredLanes) === 0) || si(e, t),
      u = s ? M1(e, t) : Io(e, t, !0),
      o = s;
    do {
      if (u === 0) {
        ws && !s && ma(e, t, 0, !1);
        break;
      } else if (u === 6) ma(e, t, 0, !da);
      else {
        if (((n = e.current.alternate), o && !D1(n))) {
          (u = Io(e, t, !1)), (o = !1);
          continue;
        }
        if (u === 2) {
          if (((o = t), e.errorRecoveryDisabledLanes & o)) var y = 0;
          else
            (y = e.pendingLanes & -536870913),
              (y = y !== 0 ? y : y & 536870912 ? 536870912 : 0);
          if (y !== 0) {
            t = y;
            e: {
              var b = e;
              u = ki;
              var S = b.current.memoizedState.isDehydrated;
              if ((S && (Rs(b, y).flags |= 256), (y = Io(b, y, !1)), y !== 2)) {
                if (Qo && !S) {
                  (b.errorRecoveryDisabledLanes |= o), (jl |= o), (u = 4);
                  break e;
                }
                (o = Fn), (Fn = u), o !== null && $o(o);
              }
              u = y;
            }
            if (((o = !1), u !== 2)) continue;
          }
        }
        if (u === 1) {
          Rs(e, 0), ma(e, t, 0, !0);
          break;
        }
        e: {
          switch (((s = e), u)) {
            case 0:
            case 1:
              throw Error(r(345));
            case 4:
              if ((t & 4194176) === t) {
                ma(s, t, vn, !da);
                break e;
              }
              break;
            case 2:
              Fn = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(r(329));
          }
          if (
            ((s.finishedWork = n),
            (s.finishedLanes = t),
            (t & 62914560) === t && ((o = Xo + 300 - re()), 10 < o))
          ) {
            if ((ma(s, t, vn, !da), Tr(s, 0) !== 0)) break e;
            s.timeoutHandle = u0(
              qy.bind(null, s, n, Fn, hu, Yo, t, vn, jl, _s, da, 2, -0, 0),
              o
            );
            break e;
          }
          qy(s, n, Fn, hu, Yo, t, vn, jl, _s, da, 0, -0, 0);
        }
      }
      break;
    } while (!0);
    Qn(e);
  }
  function $o(e) {
    Fn === null ? (Fn = e) : Fn.push.apply(Fn, e);
  }
  function qy(e, t, n, s, u, o, y, b, S, j, Q, P, L) {
    var F = t.subtreeFlags;
    if (
      (F & 8192 || (F & 16785408) === 16785408) &&
      ((Zi = { stylesheets: null, count: 0, unsuspend: hb }),
      Ny(t),
      (t = yb()),
      t !== null)
    ) {
      (e.cancelPendingCommit = t(Xy.bind(null, e, n, s, u, y, b, S, 1, P, L))),
        ma(e, o, y, !j);
      return;
    }
    Xy(e, n, s, u, y, b, S, Q, P, L);
  }
  function D1(e) {
    for (var t = e; ; ) {
      var n = t.tag;
      if (
        (n === 0 || n === 11 || n === 15) &&
        t.flags & 16384 &&
        ((n = t.updateQueue), n !== null && ((n = n.stores), n !== null))
      )
        for (var s = 0; s < n.length; s++) {
          var u = n[s],
            o = u.getSnapshot;
          u = u.value;
          try {
            if (!tn(o(), u)) return !1;
          } catch {
            return !1;
          }
        }
      if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
        (n.return = t), (t = n);
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        (t.sibling.return = t.return), (t = t.sibling);
      }
    }
    return !0;
  }
  function ma(e, t, n, s) {
    (t &= ~Go),
      (t &= ~jl),
      (e.suspendedLanes |= t),
      (e.pingedLanes &= ~t),
      s && (e.warmLanes |= t),
      (s = e.expirationTimes);
    for (var u = t; 0 < u; ) {
      var o = 31 - en(u),
        y = 1 << o;
      (s[o] = -1), (u &= ~y);
    }
    n !== 0 && eh(e, n, t);
  }
  function yu() {
    return Ie & 6 ? !0 : (Qi(0), !1);
  }
  function Jo() {
    if (Ne !== null) {
      if (Pe === 0) var e = Ne.return;
      else (e = Ne), (ia = Tl = null), no(e), (hs = null), (wi = 0), (e = Ne);
      for (; e !== null; ) Ly(e.alternate, e), (e = e.return);
      Ne = null;
    }
  }
  function Rs(e, t) {
    (e.finishedWork = null), (e.finishedLanes = 0);
    var n = e.timeoutHandle;
    n !== -1 && ((e.timeoutHandle = -1), J1(n)),
      (n = e.cancelPendingCommit),
      n !== null && ((e.cancelPendingCommit = null), n()),
      Jo(),
      (Xe = e),
      (Ne = n = ka(e.current, null)),
      (Me = t),
      (Pe = 0),
      (ln = null),
      (da = !1),
      (ws = si(e, t)),
      (Qo = !1),
      (_s = vn = Go = jl = Va = tt = 0),
      (Fn = ki = null),
      (Yo = !1),
      t & 8 && (t |= t & 32);
    var s = e.entangledLanes;
    if (s !== 0)
      for (e = e.entanglements, s &= t; 0 < s; ) {
        var u = 31 - en(s),
          o = 1 << u;
        (t |= e[u]), (s &= ~o);
      }
    return (ha = t), qr(), n;
  }
  function ky(e, t) {
    (Ae = null),
      (X.H = Vn),
      t === Si
        ? ((t = tm()), (Pe = 3))
        : t === Wh
        ? ((t = tm()), (Pe = 4))
        : (Pe =
            t === Im
              ? 8
              : t !== null &&
                typeof t == "object" &&
                typeof t.then == "function"
              ? 6
              : 1),
      (ln = t),
      Ne === null && ((tt = 1), su(e, fn(t, e.current)));
  }
  function Vy() {
    var e = X.H;
    return (X.H = Vn), e === null ? Vn : e;
  }
  function Fy() {
    var e = X.A;
    return (X.A = O1), e;
  }
  function Wo() {
    (tt = 4),
      da || ((Me & 4194176) !== Me && mn.current !== null) || (ws = !0),
      (!(Va & 134217727) && !(jl & 134217727)) ||
        Xe === null ||
        ma(Xe, Me, vn, !1);
  }
  function Io(e, t, n) {
    var s = Ie;
    Ie |= 2;
    var u = Vy(),
      o = Fy();
    (Xe !== e || Me !== t) && ((hu = null), Rs(e, t)), (t = !1);
    var y = tt;
    e: do
      try {
        if (Pe !== 0 && Ne !== null) {
          var b = Ne,
            S = ln;
          switch (Pe) {
            case 8:
              Jo(), (y = 6);
              break e;
            case 3:
            case 2:
            case 6:
              mn.current === null && (t = !0);
              var j = Pe;
              if (((Pe = 0), (ln = null), As(e, b, S, j), n && ws)) {
                y = 0;
                break e;
              }
              break;
            default:
              (j = Pe), (Pe = 0), (ln = null), As(e, b, S, j);
          }
        }
        U1(), (y = tt);
        break;
      } catch (Q) {
        ky(e, Q);
      }
    while (!0);
    return (
      t && e.shellSuspendCounter++,
      (ia = Tl = null),
      (Ie = s),
      (X.H = u),
      (X.A = o),
      Ne === null && ((Xe = null), (Me = 0), qr()),
      y
    );
  }
  function U1() {
    for (; Ne !== null; ) Qy(Ne);
  }
  function M1(e, t) {
    var n = Ie;
    Ie |= 2;
    var s = Vy(),
      u = Fy();
    Xe !== e || Me !== t
      ? ((hu = null), (du = re() + 500), Rs(e, t))
      : (ws = si(e, t));
    e: do
      try {
        if (Pe !== 0 && Ne !== null) {
          t = Ne;
          var o = ln;
          t: switch (Pe) {
            case 1:
              (Pe = 0), (ln = null), As(e, t, o, 1);
              break;
            case 2:
              if (Ih(o)) {
                (Pe = 0), (ln = null), Gy(t);
                break;
              }
              (t = function () {
                Pe === 2 && Xe === e && (Pe = 7), Qn(e);
              }),
                o.then(t, t);
              break e;
            case 3:
              Pe = 7;
              break e;
            case 4:
              Pe = 5;
              break e;
            case 7:
              Ih(o)
                ? ((Pe = 0), (ln = null), Gy(t))
                : ((Pe = 0), (ln = null), As(e, t, o, 7));
              break;
            case 5:
              var y = null;
              switch (Ne.tag) {
                case 26:
                  y = Ne.memoizedState;
                case 5:
                case 27:
                  var b = Ne;
                  if (!y || b0(y)) {
                    (Pe = 0), (ln = null);
                    var S = b.sibling;
                    if (S !== null) Ne = S;
                    else {
                      var j = b.return;
                      j !== null ? ((Ne = j), pu(j)) : (Ne = null);
                    }
                    break t;
                  }
              }
              (Pe = 0), (ln = null), As(e, t, o, 5);
              break;
            case 6:
              (Pe = 0), (ln = null), As(e, t, o, 6);
              break;
            case 8:
              Jo(), (tt = 6);
              break e;
            default:
              throw Error(r(462));
          }
        }
        z1();
        break;
      } catch (Q) {
        ky(e, Q);
      }
    while (!0);
    return (
      (ia = Tl = null),
      (X.H = s),
      (X.A = u),
      (Ie = n),
      Ne !== null ? 0 : ((Xe = null), (Me = 0), qr(), tt)
    );
  }
  function z1() {
    for (; Ne !== null && !J(); ) Qy(Ne);
  }
  function Qy(e) {
    var t = fy(e.alternate, e, ha);
    (e.memoizedProps = e.pendingProps), t === null ? pu(e) : (Ne = t);
  }
  function Gy(e) {
    var t = e,
      n = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = sy(n, t, t.pendingProps, t.type, void 0, Me);
        break;
      case 11:
        t = sy(n, t, t.pendingProps, t.type.render, t.ref, Me);
        break;
      case 5:
        no(t);
      default:
        Ly(n, t), (t = Ne = Uy(t, ha)), (t = fy(n, t, ha));
    }
    (e.memoizedProps = e.pendingProps), t === null ? pu(e) : (Ne = t);
  }
  function As(e, t, n, s) {
    (ia = Tl = null), no(t), (hs = null), (wi = 0);
    var u = t.return;
    try {
      if (w1(e, u, t, n, Me)) {
        (tt = 1), su(e, fn(n, e.current)), (Ne = null);
        return;
      }
    } catch (o) {
      if (u !== null) throw ((Ne = u), o);
      (tt = 1), su(e, fn(n, e.current)), (Ne = null);
      return;
    }
    t.flags & 32768
      ? (He || s === 1
          ? (e = !0)
          : ws || Me & 536870912
          ? (e = !1)
          : ((da = e = !0),
            (s === 2 || s === 3 || s === 6) &&
              ((s = mn.current),
              s !== null && s.tag === 13 && (s.flags |= 16384))),
        Yy(t, e))
      : pu(t);
  }
  function pu(e) {
    var t = e;
    do {
      if (t.flags & 32768) {
        Yy(t, da);
        return;
      }
      e = t.return;
      var n = C1(t.alternate, t, ha);
      if (n !== null) {
        Ne = n;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        Ne = t;
        return;
      }
      Ne = t = e;
    } while (t !== null);
    tt === 0 && (tt = 5);
  }
  function Yy(e, t) {
    do {
      var n = N1(e.alternate, e);
      if (n !== null) {
        (n.flags &= 32767), (Ne = n);
        return;
      }
      if (
        ((n = e.return),
        n !== null &&
          ((n.flags |= 32768), (n.subtreeFlags = 0), (n.deletions = null)),
        !t && ((e = e.sibling), e !== null))
      ) {
        Ne = e;
        return;
      }
      Ne = e = n;
    } while (e !== null);
    (tt = 6), (Ne = null);
  }
  function Xy(e, t, n, s, u, o, y, b, S, j) {
    var Q = X.T,
      P = ae.p;
    try {
      (ae.p = 2), (X.T = null), L1(e, t, n, s, P, u, o, y, b, S, j);
    } finally {
      (X.T = Q), (ae.p = P);
    }
  }
  function L1(e, t, n, s, u, o, y, b) {
    do Ts();
    while (Dl !== null);
    if (Ie & 6) throw Error(r(327));
    var S = e.finishedWork;
    if (((s = e.finishedLanes), S === null)) return null;
    if (((e.finishedWork = null), (e.finishedLanes = 0), S === e.current))
      throw Error(r(177));
    (e.callbackNode = null),
      (e.callbackPriority = 0),
      (e.cancelPendingCommit = null);
    var j = S.lanes | S.childLanes;
    if (
      ((j |= Vc),
      mv(e, s, j, o, y, b),
      e === Xe && ((Ne = Xe = null), (Me = 0)),
      (!(S.subtreeFlags & 10256) && !(S.flags & 10256)) ||
        mu ||
        ((mu = !0),
        (Po = j),
        (Zo = n),
        k1(It, function () {
          return Ts(), null;
        })),
      (n = (S.flags & 15990) !== 0),
      S.subtreeFlags & 15990 || n
        ? ((n = X.T),
          (X.T = null),
          (o = ae.p),
          (ae.p = 2),
          (y = Ie),
          (Ie |= 4),
          R1(e, S),
          Ay(S, e),
          i1(df, e.containerInfo),
          (Cu = !!ff),
          (df = ff = null),
          (e.current = S),
          Ey(e, S.alternate, S),
          $(),
          (Ie = y),
          (ae.p = o),
          (X.T = n))
        : (e.current = S),
      mu ? ((mu = !1), (Dl = e), (Vi = s)) : Py(e, j),
      (j = e.pendingLanes),
      j === 0 && (Fa = null),
      _r(S.stateNode),
      Qn(e),
      t !== null)
    )
      for (u = e.onRecoverableError, S = 0; S < t.length; S++)
        (j = t[S]), u(j.value, { componentStack: j.stack });
    return (
      Vi & 3 && Ts(),
      (j = e.pendingLanes),
      s & 4194218 && j & 42
        ? e === Ko
          ? Fi++
          : ((Fi = 0), (Ko = e))
        : (Fi = 0),
      Qi(0),
      null
    );
  }
  function Py(e, t) {
    (e.pooledCacheLanes &= t) === 0 &&
      ((t = e.pooledCache), t != null && ((e.pooledCache = null), Ri(t)));
  }
  function Ts() {
    if (Dl !== null) {
      var e = Dl,
        t = Po;
      Po = 0;
      var n = nh(Vi),
        s = X.T,
        u = ae.p;
      try {
        if (((ae.p = 32 > n ? 32 : n), (X.T = null), Dl === null)) var o = !1;
        else {
          (n = Zo), (Zo = null);
          var y = Dl,
            b = Vi;
          if (((Dl = null), (Vi = 0), Ie & 6)) throw Error(r(331));
          var S = Ie;
          if (
            ((Ie |= 4),
            jy(y.current),
            Cy(y, y.current, b, n),
            (Ie = S),
            Qi(0, !1),
            zt && typeof zt.onPostCommitFiberRoot == "function")
          )
            try {
              zt.onPostCommitFiberRoot(_a, y);
            } catch {}
          o = !0;
        }
        return o;
      } finally {
        (ae.p = u), (X.T = s), Py(e, t);
      }
    }
    return !1;
  }
  function Zy(e, t, n) {
    (t = fn(n, t)),
      (t = go(e.stateNode, t, 2)),
      (e = La(e, t, 2)),
      e !== null && (ii(e, 2), Qn(e));
  }
  function Ge(e, t, n) {
    if (e.tag === 3) Zy(e, e, n);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Zy(t, e, n);
          break;
        } else if (t.tag === 1) {
          var s = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == "function" ||
            (typeof s.componentDidCatch == "function" &&
              (Fa === null || !Fa.has(s)))
          ) {
            (e = fn(n, e)),
              (n = Jm(2)),
              (s = La(t, n, 2)),
              s !== null && (Wm(n, s, t, e), ii(s, 2), Qn(s));
            break;
          }
        }
        t = t.return;
      }
  }
  function ef(e, t, n) {
    var s = e.pingCache;
    if (s === null) {
      s = e.pingCache = new j1();
      var u = new Set();
      s.set(t, u);
    } else (u = s.get(t)), u === void 0 && ((u = new Set()), s.set(t, u));
    u.has(n) ||
      ((Qo = !0), u.add(n), (e = H1.bind(null, e, t, n)), t.then(e, e));
  }
  function H1(e, t, n) {
    var s = e.pingCache;
    s !== null && s.delete(t),
      (e.pingedLanes |= e.suspendedLanes & n),
      (e.warmLanes &= ~n),
      Xe === e &&
        (Me & n) === n &&
        (tt === 4 || (tt === 3 && (Me & 62914560) === Me && 300 > re() - Xo)
          ? !(Ie & 2) && Rs(e, 0)
          : (Go |= n),
        _s === Me && (_s = 0)),
      Qn(e);
  }
  function Ky(e, t) {
    t === 0 && (t = Id()), (e = Ca(e, t)), e !== null && (ii(e, t), Qn(e));
  }
  function B1(e) {
    var t = e.memoizedState,
      n = 0;
    t !== null && (n = t.retryLane), Ky(e, n);
  }
  function q1(e, t) {
    var n = 0;
    switch (e.tag) {
      case 13:
        var s = e.stateNode,
          u = e.memoizedState;
        u !== null && (n = u.retryLane);
        break;
      case 19:
        s = e.stateNode;
        break;
      case 22:
        s = e.stateNode._retryCache;
        break;
      default:
        throw Error(r(314));
    }
    s !== null && s.delete(t), Ky(e, n);
  }
  function k1(e, t) {
    return V(e, t);
  }
  var gu = null,
    Cs = null,
    tf = !1,
    vu = !1,
    nf = !1,
    Ul = 0;
  function Qn(e) {
    e !== Cs &&
      e.next === null &&
      (Cs === null ? (gu = Cs = e) : (Cs = Cs.next = e)),
      (vu = !0),
      tf || ((tf = !0), F1(V1));
  }
  function Qi(e, t) {
    if (!nf && vu) {
      nf = !0;
      do
        for (var n = !1, s = gu; s !== null; ) {
          if (e !== 0) {
            var u = s.pendingLanes;
            if (u === 0) var o = 0;
            else {
              var y = s.suspendedLanes,
                b = s.pingedLanes;
              (o = (1 << (31 - en(42 | e) + 1)) - 1),
                (o &= u & ~(y & ~b)),
                (o = o & 201326677 ? (o & 201326677) | 1 : o ? o | 2 : 0);
            }
            o !== 0 && ((n = !0), Wy(s, o));
          } else
            (o = Me),
              (o = Tr(s, s === Xe ? o : 0)),
              !(o & 3) || si(s, o) || ((n = !0), Wy(s, o));
          s = s.next;
        }
      while (n);
      nf = !1;
    }
  }
  function V1() {
    vu = tf = !1;
    var e = 0;
    Ul !== 0 && ($1() && (e = Ul), (Ul = 0));
    for (var t = re(), n = null, s = gu; s !== null; ) {
      var u = s.next,
        o = $y(s, t);
      o === 0
        ? ((s.next = null),
          n === null ? (gu = u) : (n.next = u),
          u === null && (Cs = n))
        : ((n = s), (e !== 0 || o & 3) && (vu = !0)),
        (s = u);
    }
    Qi(e);
  }
  function $y(e, t) {
    for (
      var n = e.suspendedLanes,
        s = e.pingedLanes,
        u = e.expirationTimes,
        o = e.pendingLanes & -62914561;
      0 < o;

    ) {
      var y = 31 - en(o),
        b = 1 << y,
        S = u[y];
      S === -1
        ? (!(b & n) || b & s) && (u[y] = hv(b, t))
        : S <= t && (e.expiredLanes |= b),
        (o &= ~b);
    }
    if (
      ((t = Xe),
      (n = Me),
      (n = Tr(e, e === t ? n : 0)),
      (s = e.callbackNode),
      n === 0 || (e === t && Pe === 2) || e.cancelPendingCommit !== null)
    )
      return (
        s !== null && s !== null && W(s),
        (e.callbackNode = null),
        (e.callbackPriority = 0)
      );
    if (!(n & 3) || si(e, n)) {
      if (((t = n & -n), t === e.callbackPriority)) return t;
      switch ((s !== null && W(s), nh(n))) {
        case 2:
        case 8:
          n = st;
          break;
        case 32:
          n = It;
          break;
        case 268435456:
          n = Jl;
          break;
        default:
          n = It;
      }
      return (
        (s = Jy.bind(null, e)),
        (n = V(n, s)),
        (e.callbackPriority = t),
        (e.callbackNode = n),
        t
      );
    }
    return (
      s !== null && s !== null && W(s),
      (e.callbackPriority = 2),
      (e.callbackNode = null),
      2
    );
  }
  function Jy(e, t) {
    var n = e.callbackNode;
    if (Ts() && e.callbackNode !== n) return null;
    var s = Me;
    return (
      (s = Tr(e, e === Xe ? s : 0)),
      s === 0
        ? null
        : (By(e, s, t),
          $y(e, re()),
          e.callbackNode != null && e.callbackNode === n
            ? Jy.bind(null, e)
            : null)
    );
  }
  function Wy(e, t) {
    if (Ts()) return null;
    By(e, t, !0);
  }
  function F1(e) {
    W1(function () {
      Ie & 6 ? V(lt, e) : e();
    });
  }
  function af() {
    return Ul === 0 && (Ul = Wd()), Ul;
  }
  function Iy(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean"
      ? null
      : typeof e == "function"
      ? e
      : Dr("" + e);
  }
  function e0(e, t) {
    var n = t.ownerDocument.createElement("input");
    return (
      (n.name = t.name),
      (n.value = t.value),
      e.id && n.setAttribute("form", e.id),
      t.parentNode.insertBefore(n, t),
      (e = new FormData(e)),
      n.parentNode.removeChild(n),
      e
    );
  }
  function Q1(e, t, n, s, u) {
    if (t === "submit" && n && n.stateNode === u) {
      var o = Iy((u[Ft] || null).action),
        y = s.submitter;
      y &&
        ((t = (t = y[Ft] || null)
          ? Iy(t.formAction)
          : y.getAttribute("formAction")),
        t !== null && ((o = t), (y = null)));
      var b = new Lr("action", "action", null, s, u);
      e.push({
        event: b,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (s.defaultPrevented) {
                if (Ul !== 0) {
                  var S = y ? e0(u, y) : new FormData(u);
                  fo(
                    n,
                    { pending: !0, data: S, method: u.method, action: o },
                    null,
                    S
                  );
                }
              } else
                typeof o == "function" &&
                  (b.preventDefault(),
                  (S = y ? e0(u, y) : new FormData(u)),
                  fo(
                    n,
                    { pending: !0, data: S, method: u.method, action: o },
                    o,
                    S
                  ));
            },
            currentTarget: u,
          },
        ],
      });
    }
  }
  for (var lf = 0; lf < Xh.length; lf++) {
    var sf = Xh[lf],
      G1 = sf.toLowerCase(),
      Y1 = sf[0].toUpperCase() + sf.slice(1);
    An(G1, "on" + Y1);
  }
  An(Vh, "onAnimationEnd"),
    An(Fh, "onAnimationIteration"),
    An(Qh, "onAnimationStart"),
    An("dblclick", "onDoubleClick"),
    An("focusin", "onFocus"),
    An("focusout", "onBlur"),
    An(u1, "onTransitionRun"),
    An(c1, "onTransitionStart"),
    An(o1, "onTransitionCancel"),
    An(Gh, "onTransitionEnd"),
    ts("onMouseEnter", ["mouseout", "mouseover"]),
    ts("onMouseLeave", ["mouseout", "mouseover"]),
    ts("onPointerEnter", ["pointerout", "pointerover"]),
    ts("onPointerLeave", ["pointerout", "pointerover"]),
    ml(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " "
      )
    ),
    ml(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " "
      )
    ),
    ml("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    ml(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" ")
    ),
    ml(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" ")
    ),
    ml(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
    );
  var Gi =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " "
      ),
    X1 = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle"
        .split(" ")
        .concat(Gi)
    );
  function t0(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var s = e[n],
        u = s.event;
      s = s.listeners;
      e: {
        var o = void 0;
        if (t)
          for (var y = s.length - 1; 0 <= y; y--) {
            var b = s[y],
              S = b.instance,
              j = b.currentTarget;
            if (((b = b.listener), S !== o && u.isPropagationStopped()))
              break e;
            (o = b), (u.currentTarget = j);
            try {
              o(u);
            } catch (Q) {
              lu(Q);
            }
            (u.currentTarget = null), (o = S);
          }
        else
          for (y = 0; y < s.length; y++) {
            if (
              ((b = s[y]),
              (S = b.instance),
              (j = b.currentTarget),
              (b = b.listener),
              S !== o && u.isPropagationStopped())
            )
              break e;
            (o = b), (u.currentTarget = j);
            try {
              o(u);
            } catch (Q) {
              lu(Q);
            }
            (u.currentTarget = null), (o = S);
          }
      }
    }
  }
  function je(e, t) {
    var n = t[xc];
    n === void 0 && (n = t[xc] = new Set());
    var s = e + "__bubble";
    n.has(s) || (n0(t, e, 2, !1), n.add(s));
  }
  function rf(e, t, n) {
    var s = 0;
    t && (s |= 4), n0(n, e, s, t);
  }
  var bu = "_reactListening" + Math.random().toString(36).slice(2);
  function uf(e) {
    if (!e[bu]) {
      (e[bu] = !0),
        sh.forEach(function (n) {
          n !== "selectionchange" && (X1.has(n) || rf(n, !1, e), rf(n, !0, e));
        });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[bu] || ((t[bu] = !0), rf("selectionchange", !1, t));
    }
  }
  function n0(e, t, n, s) {
    switch (R0(t)) {
      case 2:
        var u = vb;
        break;
      case 8:
        u = bb;
        break;
      default:
        u = Sf;
    }
    (n = u.bind(null, t, n, e)),
      (u = void 0),
      !Cc ||
        (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
        (u = !0),
      s
        ? u !== void 0
          ? e.addEventListener(t, n, { capture: !0, passive: u })
          : e.addEventListener(t, n, !0)
        : u !== void 0
        ? e.addEventListener(t, n, { passive: u })
        : e.addEventListener(t, n, !1);
  }
  function cf(e, t, n, s, u) {
    var o = s;
    if (!(t & 1) && !(t & 2) && s !== null)
      e: for (;;) {
        if (s === null) return;
        var y = s.tag;
        if (y === 3 || y === 4) {
          var b = s.stateNode.containerInfo;
          if (b === u || (b.nodeType === 8 && b.parentNode === u)) break;
          if (y === 4)
            for (y = s.return; y !== null; ) {
              var S = y.tag;
              if (
                (S === 3 || S === 4) &&
                ((S = y.stateNode.containerInfo),
                S === u || (S.nodeType === 8 && S.parentNode === u))
              )
                return;
              y = y.return;
            }
          for (; b !== null; ) {
            if (((y = hl(b)), y === null)) return;
            if (((S = y.tag), S === 5 || S === 6 || S === 26 || S === 27)) {
              s = o = y;
              continue e;
            }
            b = b.parentNode;
          }
        }
        s = s.return;
      }
    gh(function () {
      var j = o,
        Q = Ac(n),
        P = [];
      e: {
        var L = Yh.get(e);
        if (L !== void 0) {
          var F = Lr,
            ue = e;
          switch (e) {
            case "keypress":
              if (Mr(n) === 0) break e;
            case "keydown":
            case "keyup":
              F = qv;
              break;
            case "focusin":
              (ue = "focus"), (F = Dc);
              break;
            case "focusout":
              (ue = "blur"), (F = Dc);
              break;
            case "beforeblur":
            case "afterblur":
              F = Dc;
              break;
            case "click":
              if (n.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              F = xh;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              F = Tv;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              F = Fv;
              break;
            case Vh:
            case Fh:
            case Qh:
              F = Ov;
              break;
            case Gh:
              F = Gv;
              break;
            case "scroll":
            case "scrollend":
              F = Rv;
              break;
            case "wheel":
              F = Xv;
              break;
            case "copy":
            case "cut":
            case "paste":
              F = Dv;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              F = Eh;
              break;
            case "toggle":
            case "beforetoggle":
              F = Zv;
          }
          var ve = (t & 4) !== 0,
            nt = !ve && (e === "scroll" || e === "scrollend"),
            U = ve ? (L !== null ? L + "Capture" : null) : L;
          ve = [];
          for (var N = j, M; N !== null; ) {
            var G = N;
            if (
              ((M = G.stateNode),
              (G = G.tag),
              (G !== 5 && G !== 26 && G !== 27) ||
                M === null ||
                U === null ||
                ((G = ci(N, U)), G != null && ve.push(Yi(N, G, M))),
              nt)
            )
              break;
            N = N.return;
          }
          0 < ve.length &&
            ((L = new F(L, ue, null, n, Q)),
            P.push({ event: L, listeners: ve }));
        }
      }
      if (!(t & 7)) {
        e: {
          if (
            ((L = e === "mouseover" || e === "pointerover"),
            (F = e === "mouseout" || e === "pointerout"),
            L &&
              n !== Rc &&
              (ue = n.relatedTarget || n.fromElement) &&
              (hl(ue) || ue[Wl]))
          )
            break e;
          if (
            (F || L) &&
            ((L =
              Q.window === Q
                ? Q
                : (L = Q.ownerDocument)
                ? L.defaultView || L.parentWindow
                : window),
            F
              ? ((ue = n.relatedTarget || n.toElement),
                (F = j),
                (ue = ue ? hl(ue) : null),
                ue !== null &&
                  ((nt = he(ue)),
                  (ve = ue.tag),
                  ue !== nt || (ve !== 5 && ve !== 27 && ve !== 6)) &&
                  (ue = null))
              : ((F = null), (ue = j)),
            F !== ue)
          ) {
            if (
              ((ve = xh),
              (G = "onMouseLeave"),
              (U = "onMouseEnter"),
              (N = "mouse"),
              (e === "pointerout" || e === "pointerover") &&
                ((ve = Eh),
                (G = "onPointerLeave"),
                (U = "onPointerEnter"),
                (N = "pointer")),
              (nt = F == null ? L : ui(F)),
              (M = ue == null ? L : ui(ue)),
              (L = new ve(G, N + "leave", F, n, Q)),
              (L.target = nt),
              (L.relatedTarget = M),
              (G = null),
              hl(Q) === j &&
                ((ve = new ve(U, N + "enter", ue, n, Q)),
                (ve.target = M),
                (ve.relatedTarget = nt),
                (G = ve)),
              (nt = G),
              F && ue)
            )
              t: {
                for (ve = F, U = ue, N = 0, M = ve; M; M = Ns(M)) N++;
                for (M = 0, G = U; G; G = Ns(G)) M++;
                for (; 0 < N - M; ) (ve = Ns(ve)), N--;
                for (; 0 < M - N; ) (U = Ns(U)), M--;
                for (; N--; ) {
                  if (ve === U || (U !== null && ve === U.alternate)) break t;
                  (ve = Ns(ve)), (U = Ns(U));
                }
                ve = null;
              }
            else ve = null;
            F !== null && a0(P, L, F, ve, !1),
              ue !== null && nt !== null && a0(P, nt, ue, ve, !0);
          }
        }
        e: {
          if (
            ((L = j ? ui(j) : window),
            (F = L.nodeName && L.nodeName.toLowerCase()),
            F === "select" || (F === "input" && L.type === "file"))
          )
            var se = Oh;
          else if (Ch(L))
            if (jh) se = l1;
            else {
              se = n1;
              var Te = t1;
            }
          else
            (F = L.nodeName),
              !F ||
              F.toLowerCase() !== "input" ||
              (L.type !== "checkbox" && L.type !== "radio")
                ? j && _c(j.elementType) && (se = Oh)
                : (se = a1);
          if (se && (se = se(e, j))) {
            Nh(P, se, n, Q);
            break e;
          }
          Te && Te(e, L, j),
            e === "focusout" &&
              j &&
              L.type === "number" &&
              j.memoizedProps.value != null &&
              wc(L, "number", L.value);
        }
        switch (((Te = j ? ui(j) : window), e)) {
          case "focusin":
            (Ch(Te) || Te.contentEditable === "true") &&
              ((rs = Te), (Bc = j), (gi = null));
            break;
          case "focusout":
            gi = Bc = rs = null;
            break;
          case "mousedown":
            qc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            (qc = !1), qh(P, n, Q);
            break;
          case "selectionchange":
            if (r1) break;
          case "keydown":
          case "keyup":
            qh(P, n, Q);
        }
        var oe;
        if (Mc)
          e: {
            switch (e) {
              case "compositionstart":
                var ge = "onCompositionStart";
                break e;
              case "compositionend":
                ge = "onCompositionEnd";
                break e;
              case "compositionupdate":
                ge = "onCompositionUpdate";
                break e;
            }
            ge = void 0;
          }
        else
          is
            ? Ah(e, n) && (ge = "onCompositionEnd")
            : e === "keydown" &&
              n.keyCode === 229 &&
              (ge = "onCompositionStart");
        ge &&
          (wh &&
            n.locale !== "ko" &&
            (is || ge !== "onCompositionStart"
              ? ge === "onCompositionEnd" && is && (oe = vh())
              : ((Ta = Q),
                (Nc = "value" in Ta ? Ta.value : Ta.textContent),
                (is = !0))),
          (Te = xu(j, ge)),
          0 < Te.length &&
            ((ge = new Sh(ge, e, null, n, Q)),
            P.push({ event: ge, listeners: Te }),
            oe
              ? (ge.data = oe)
              : ((oe = Th(n)), oe !== null && (ge.data = oe)))),
          (oe = $v ? Jv(e, n) : Wv(e, n)) &&
            ((ge = xu(j, "onBeforeInput")),
            0 < ge.length &&
              ((Te = new Sh("onBeforeInput", "beforeinput", null, n, Q)),
              P.push({ event: Te, listeners: ge }),
              (Te.data = oe))),
          Q1(P, e, j, n, Q);
      }
      t0(P, t);
    });
  }
  function Yi(e, t, n) {
    return { instance: e, listener: t, currentTarget: n };
  }
  function xu(e, t) {
    for (var n = t + "Capture", s = []; e !== null; ) {
      var u = e,
        o = u.stateNode;
      (u = u.tag),
        (u !== 5 && u !== 26 && u !== 27) ||
          o === null ||
          ((u = ci(e, n)),
          u != null && s.unshift(Yi(e, u, o)),
          (u = ci(e, t)),
          u != null && s.push(Yi(e, u, o))),
        (e = e.return);
    }
    return s;
  }
  function Ns(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function a0(e, t, n, s, u) {
    for (var o = t._reactName, y = []; n !== null && n !== s; ) {
      var b = n,
        S = b.alternate,
        j = b.stateNode;
      if (((b = b.tag), S !== null && S === s)) break;
      (b !== 5 && b !== 26 && b !== 27) ||
        j === null ||
        ((S = j),
        u
          ? ((j = ci(n, o)), j != null && y.unshift(Yi(n, j, S)))
          : u || ((j = ci(n, o)), j != null && y.push(Yi(n, j, S)))),
        (n = n.return);
    }
    y.length !== 0 && e.push({ event: t, listeners: y });
  }
  var P1 = /\r\n?/g,
    Z1 = /\u0000|\uFFFD/g;
  function l0(e) {
    return (typeof e == "string" ? e : "" + e)
      .replace(
        P1,
        `
`
      )
      .replace(Z1, "");
  }
  function s0(e, t) {
    return (t = l0(t)), l0(e) === t;
  }
  function Su() {}
  function Qe(e, t, n, s, u, o) {
    switch (n) {
      case "children":
        typeof s == "string"
          ? t === "body" || (t === "textarea" && s === "") || as(e, s)
          : (typeof s == "number" || typeof s == "bigint") &&
            t !== "body" &&
            as(e, "" + s);
        break;
      case "className":
        Nr(e, "class", s);
        break;
      case "tabIndex":
        Nr(e, "tabindex", s);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Nr(e, n, s);
        break;
      case "style":
        yh(e, s, o);
        break;
      case "data":
        if (t !== "object") {
          Nr(e, "data", s);
          break;
        }
      case "src":
      case "href":
        if (s === "" && (t !== "a" || n !== "href")) {
          e.removeAttribute(n);
          break;
        }
        if (
          s == null ||
          typeof s == "function" ||
          typeof s == "symbol" ||
          typeof s == "boolean"
        ) {
          e.removeAttribute(n);
          break;
        }
        (s = Dr("" + s)), e.setAttribute(n, s);
        break;
      case "action":
      case "formAction":
        if (typeof s == "function") {
          e.setAttribute(
            n,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof o == "function" &&
            (n === "formAction"
              ? (t !== "input" && Qe(e, t, "name", u.name, u, null),
                Qe(e, t, "formEncType", u.formEncType, u, null),
                Qe(e, t, "formMethod", u.formMethod, u, null),
                Qe(e, t, "formTarget", u.formTarget, u, null))
              : (Qe(e, t, "encType", u.encType, u, null),
                Qe(e, t, "method", u.method, u, null),
                Qe(e, t, "target", u.target, u, null)));
        if (s == null || typeof s == "symbol" || typeof s == "boolean") {
          e.removeAttribute(n);
          break;
        }
        (s = Dr("" + s)), e.setAttribute(n, s);
        break;
      case "onClick":
        s != null && (e.onclick = Su);
        break;
      case "onScroll":
        s != null && je("scroll", e);
        break;
      case "onScrollEnd":
        s != null && je("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (s != null) {
          if (typeof s != "object" || !("__html" in s)) throw Error(r(61));
          if (((n = s.__html), n != null)) {
            if (u.children != null) throw Error(r(60));
            e.innerHTML = n;
          }
        }
        break;
      case "multiple":
        e.multiple = s && typeof s != "function" && typeof s != "symbol";
        break;
      case "muted":
        e.muted = s && typeof s != "function" && typeof s != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (
          s == null ||
          typeof s == "function" ||
          typeof s == "boolean" ||
          typeof s == "symbol"
        ) {
          e.removeAttribute("xlink:href");
          break;
        }
        (n = Dr("" + s)),
          e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        s != null && typeof s != "function" && typeof s != "symbol"
          ? e.setAttribute(n, "" + s)
          : e.removeAttribute(n);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        s && typeof s != "function" && typeof s != "symbol"
          ? e.setAttribute(n, "")
          : e.removeAttribute(n);
        break;
      case "capture":
      case "download":
        s === !0
          ? e.setAttribute(n, "")
          : s !== !1 &&
            s != null &&
            typeof s != "function" &&
            typeof s != "symbol"
          ? e.setAttribute(n, s)
          : e.removeAttribute(n);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        s != null &&
        typeof s != "function" &&
        typeof s != "symbol" &&
        !isNaN(s) &&
        1 <= s
          ? e.setAttribute(n, s)
          : e.removeAttribute(n);
        break;
      case "rowSpan":
      case "start":
        s == null || typeof s == "function" || typeof s == "symbol" || isNaN(s)
          ? e.removeAttribute(n)
          : e.setAttribute(n, s);
        break;
      case "popover":
        je("beforetoggle", e), je("toggle", e), Cr(e, "popover", s);
        break;
      case "xlinkActuate":
        ea(e, "http://www.w3.org/1999/xlink", "xlink:actuate", s);
        break;
      case "xlinkArcrole":
        ea(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", s);
        break;
      case "xlinkRole":
        ea(e, "http://www.w3.org/1999/xlink", "xlink:role", s);
        break;
      case "xlinkShow":
        ea(e, "http://www.w3.org/1999/xlink", "xlink:show", s);
        break;
      case "xlinkTitle":
        ea(e, "http://www.w3.org/1999/xlink", "xlink:title", s);
        break;
      case "xlinkType":
        ea(e, "http://www.w3.org/1999/xlink", "xlink:type", s);
        break;
      case "xmlBase":
        ea(e, "http://www.w3.org/XML/1998/namespace", "xml:base", s);
        break;
      case "xmlLang":
        ea(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", s);
        break;
      case "xmlSpace":
        ea(e, "http://www.w3.org/XML/1998/namespace", "xml:space", s);
        break;
      case "is":
        Cr(e, "is", s);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < n.length) ||
          (n[0] !== "o" && n[0] !== "O") ||
          (n[1] !== "n" && n[1] !== "N")) &&
          ((n = wv.get(n) || n), Cr(e, n, s));
    }
  }
  function of(e, t, n, s, u, o) {
    switch (n) {
      case "style":
        yh(e, s, o);
        break;
      case "dangerouslySetInnerHTML":
        if (s != null) {
          if (typeof s != "object" || !("__html" in s)) throw Error(r(61));
          if (((n = s.__html), n != null)) {
            if (u.children != null) throw Error(r(60));
            e.innerHTML = n;
          }
        }
        break;
      case "children":
        typeof s == "string"
          ? as(e, s)
          : (typeof s == "number" || typeof s == "bigint") && as(e, "" + s);
        break;
      case "onScroll":
        s != null && je("scroll", e);
        break;
      case "onScrollEnd":
        s != null && je("scrollend", e);
        break;
      case "onClick":
        s != null && (e.onclick = Su);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!ih.hasOwnProperty(n))
          e: {
            if (
              n[0] === "o" &&
              n[1] === "n" &&
              ((u = n.endsWith("Capture")),
              (t = n.slice(2, u ? n.length - 7 : void 0)),
              (o = e[Ft] || null),
              (o = o != null ? o[n] : null),
              typeof o == "function" && e.removeEventListener(t, o, u),
              typeof s == "function")
            ) {
              typeof o != "function" &&
                o !== null &&
                (n in e
                  ? (e[n] = null)
                  : e.hasAttribute(n) && e.removeAttribute(n)),
                e.addEventListener(t, s, u);
              break e;
            }
            n in e
              ? (e[n] = s)
              : s === !0
              ? e.setAttribute(n, "")
              : Cr(e, n, s);
          }
    }
  }
  function Tt(e, t, n) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        je("error", e), je("load", e);
        var s = !1,
          u = !1,
          o;
        for (o in n)
          if (n.hasOwnProperty(o)) {
            var y = n[o];
            if (y != null)
              switch (o) {
                case "src":
                  s = !0;
                  break;
                case "srcSet":
                  u = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(r(137, t));
                default:
                  Qe(e, t, o, y, n, null);
              }
          }
        u && Qe(e, t, "srcSet", n.srcSet, n, null),
          s && Qe(e, t, "src", n.src, n, null);
        return;
      case "input":
        je("invalid", e);
        var b = (o = y = u = null),
          S = null,
          j = null;
        for (s in n)
          if (n.hasOwnProperty(s)) {
            var Q = n[s];
            if (Q != null)
              switch (s) {
                case "name":
                  u = Q;
                  break;
                case "type":
                  y = Q;
                  break;
                case "checked":
                  S = Q;
                  break;
                case "defaultChecked":
                  j = Q;
                  break;
                case "value":
                  o = Q;
                  break;
                case "defaultValue":
                  b = Q;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (Q != null) throw Error(r(137, t));
                  break;
                default:
                  Qe(e, t, s, Q, n, null);
              }
          }
        fh(e, o, b, S, j, y, u, !1), Or(e);
        return;
      case "select":
        je("invalid", e), (s = y = o = null);
        for (u in n)
          if (n.hasOwnProperty(u) && ((b = n[u]), b != null))
            switch (u) {
              case "value":
                o = b;
                break;
              case "defaultValue":
                y = b;
                break;
              case "multiple":
                s = b;
              default:
                Qe(e, t, u, b, n, null);
            }
        (t = o),
          (n = y),
          (e.multiple = !!s),
          t != null ? ns(e, !!s, t, !1) : n != null && ns(e, !!s, n, !0);
        return;
      case "textarea":
        je("invalid", e), (o = u = s = null);
        for (y in n)
          if (n.hasOwnProperty(y) && ((b = n[y]), b != null))
            switch (y) {
              case "value":
                s = b;
                break;
              case "defaultValue":
                u = b;
                break;
              case "children":
                o = b;
                break;
              case "dangerouslySetInnerHTML":
                if (b != null) throw Error(r(91));
                break;
              default:
                Qe(e, t, y, b, n, null);
            }
        hh(e, s, u, o), Or(e);
        return;
      case "option":
        for (S in n)
          if (n.hasOwnProperty(S) && ((s = n[S]), s != null))
            switch (S) {
              case "selected":
                e.selected =
                  s && typeof s != "function" && typeof s != "symbol";
                break;
              default:
                Qe(e, t, S, s, n, null);
            }
        return;
      case "dialog":
        je("cancel", e), je("close", e);
        break;
      case "iframe":
      case "object":
        je("load", e);
        break;
      case "video":
      case "audio":
        for (s = 0; s < Gi.length; s++) je(Gi[s], e);
        break;
      case "image":
        je("error", e), je("load", e);
        break;
      case "details":
        je("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        je("error", e), je("load", e);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (j in n)
          if (n.hasOwnProperty(j) && ((s = n[j]), s != null))
            switch (j) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(r(137, t));
              default:
                Qe(e, t, j, s, n, null);
            }
        return;
      default:
        if (_c(t)) {
          for (Q in n)
            n.hasOwnProperty(Q) &&
              ((s = n[Q]), s !== void 0 && of(e, t, Q, s, n, void 0));
          return;
        }
    }
    for (b in n)
      n.hasOwnProperty(b) && ((s = n[b]), s != null && Qe(e, t, b, s, n, null));
  }
  function K1(e, t, n, s) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var u = null,
          o = null,
          y = null,
          b = null,
          S = null,
          j = null,
          Q = null;
        for (F in n) {
          var P = n[F];
          if (n.hasOwnProperty(F) && P != null)
            switch (F) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                S = P;
              default:
                s.hasOwnProperty(F) || Qe(e, t, F, null, s, P);
            }
        }
        for (var L in s) {
          var F = s[L];
          if (((P = n[L]), s.hasOwnProperty(L) && (F != null || P != null)))
            switch (L) {
              case "type":
                o = F;
                break;
              case "name":
                u = F;
                break;
              case "checked":
                j = F;
                break;
              case "defaultChecked":
                Q = F;
                break;
              case "value":
                y = F;
                break;
              case "defaultValue":
                b = F;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (F != null) throw Error(r(137, t));
                break;
              default:
                F !== P && Qe(e, t, L, F, s, P);
            }
        }
        Ec(e, y, b, S, j, Q, o, u);
        return;
      case "select":
        F = y = b = L = null;
        for (o in n)
          if (((S = n[o]), n.hasOwnProperty(o) && S != null))
            switch (o) {
              case "value":
                break;
              case "multiple":
                F = S;
              default:
                s.hasOwnProperty(o) || Qe(e, t, o, null, s, S);
            }
        for (u in s)
          if (
            ((o = s[u]),
            (S = n[u]),
            s.hasOwnProperty(u) && (o != null || S != null))
          )
            switch (u) {
              case "value":
                L = o;
                break;
              case "defaultValue":
                b = o;
                break;
              case "multiple":
                y = o;
              default:
                o !== S && Qe(e, t, u, o, s, S);
            }
        (t = b),
          (n = y),
          (s = F),
          L != null
            ? ns(e, !!n, L, !1)
            : !!s != !!n &&
              (t != null ? ns(e, !!n, t, !0) : ns(e, !!n, n ? [] : "", !1));
        return;
      case "textarea":
        F = L = null;
        for (b in n)
          if (
            ((u = n[b]),
            n.hasOwnProperty(b) && u != null && !s.hasOwnProperty(b))
          )
            switch (b) {
              case "value":
                break;
              case "children":
                break;
              default:
                Qe(e, t, b, null, s, u);
            }
        for (y in s)
          if (
            ((u = s[y]),
            (o = n[y]),
            s.hasOwnProperty(y) && (u != null || o != null))
          )
            switch (y) {
              case "value":
                L = u;
                break;
              case "defaultValue":
                F = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(r(91));
                break;
              default:
                u !== o && Qe(e, t, y, u, s, o);
            }
        dh(e, L, F);
        return;
      case "option":
        for (var ue in n)
          if (
            ((L = n[ue]),
            n.hasOwnProperty(ue) && L != null && !s.hasOwnProperty(ue))
          )
            switch (ue) {
              case "selected":
                e.selected = !1;
                break;
              default:
                Qe(e, t, ue, null, s, L);
            }
        for (S in s)
          if (
            ((L = s[S]),
            (F = n[S]),
            s.hasOwnProperty(S) && L !== F && (L != null || F != null))
          )
            switch (S) {
              case "selected":
                e.selected =
                  L && typeof L != "function" && typeof L != "symbol";
                break;
              default:
                Qe(e, t, S, L, s, F);
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var ve in n)
          (L = n[ve]),
            n.hasOwnProperty(ve) &&
              L != null &&
              !s.hasOwnProperty(ve) &&
              Qe(e, t, ve, null, s, L);
        for (j in s)
          if (
            ((L = s[j]),
            (F = n[j]),
            s.hasOwnProperty(j) && L !== F && (L != null || F != null))
          )
            switch (j) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (L != null) throw Error(r(137, t));
                break;
              default:
                Qe(e, t, j, L, s, F);
            }
        return;
      default:
        if (_c(t)) {
          for (var nt in n)
            (L = n[nt]),
              n.hasOwnProperty(nt) &&
                L !== void 0 &&
                !s.hasOwnProperty(nt) &&
                of(e, t, nt, void 0, s, L);
          for (Q in s)
            (L = s[Q]),
              (F = n[Q]),
              !s.hasOwnProperty(Q) ||
                L === F ||
                (L === void 0 && F === void 0) ||
                of(e, t, Q, L, s, F);
          return;
        }
    }
    for (var U in n)
      (L = n[U]),
        n.hasOwnProperty(U) &&
          L != null &&
          !s.hasOwnProperty(U) &&
          Qe(e, t, U, null, s, L);
    for (P in s)
      (L = s[P]),
        (F = n[P]),
        !s.hasOwnProperty(P) ||
          L === F ||
          (L == null && F == null) ||
          Qe(e, t, P, L, s, F);
  }
  var ff = null,
    df = null;
  function Eu(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function i0(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function r0(e, t) {
    if (e === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return e === 1 && t === "foreignObject" ? 0 : e;
  }
  function hf(e, t) {
    return (
      e === "textarea" ||
      e === "noscript" ||
      typeof t.children == "string" ||
      typeof t.children == "number" ||
      typeof t.children == "bigint" ||
      (typeof t.dangerouslySetInnerHTML == "object" &&
        t.dangerouslySetInnerHTML !== null &&
        t.dangerouslySetInnerHTML.__html != null)
    );
  }
  var mf = null;
  function $1() {
    var e = window.event;
    return e && e.type === "popstate"
      ? e === mf
        ? !1
        : ((mf = e), !0)
      : ((mf = null), !1);
  }
  var u0 = typeof setTimeout == "function" ? setTimeout : void 0,
    J1 = typeof clearTimeout == "function" ? clearTimeout : void 0,
    c0 = typeof Promise == "function" ? Promise : void 0,
    W1 =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof c0 < "u"
        ? function (e) {
            return c0.resolve(null).then(e).catch(I1);
          }
        : u0;
  function I1(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function yf(e, t) {
    var n = t,
      s = 0;
    do {
      var u = n.nextSibling;
      if ((e.removeChild(n), u && u.nodeType === 8))
        if (((n = u.data), n === "/$")) {
          if (s === 0) {
            e.removeChild(u), Ii(t);
            return;
          }
          s--;
        } else (n !== "$" && n !== "$?" && n !== "$!") || s++;
      n = u;
    } while (n);
    Ii(t);
  }
  function pf(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var n = t;
      switch (((t = t.nextSibling), n.nodeName)) {
        case "HTML":
        case "HEAD":
        case "BODY":
          pf(n), Sc(n);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (n.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(n);
    }
  }
  function eb(e, t, n, s) {
    for (; e.nodeType === 1; ) {
      var u = n;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!s && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
      } else if (s) {
        if (!e[ri])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (
                ((o = e.getAttribute("rel")),
                o === "stylesheet" && e.hasAttribute("data-precedence"))
              )
                break;
              if (
                o !== u.rel ||
                e.getAttribute("href") !== (u.href == null ? null : u.href) ||
                e.getAttribute("crossorigin") !==
                  (u.crossOrigin == null ? null : u.crossOrigin) ||
                e.getAttribute("title") !== (u.title == null ? null : u.title)
              )
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (
                ((o = e.getAttribute("src")),
                (o !== (u.src == null ? null : u.src) ||
                  e.getAttribute("type") !== (u.type == null ? null : u.type) ||
                  e.getAttribute("crossorigin") !==
                    (u.crossOrigin == null ? null : u.crossOrigin)) &&
                  o &&
                  e.hasAttribute("async") &&
                  !e.hasAttribute("itemprop"))
              )
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var o = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && e.getAttribute("name") === o) return e;
      } else return e;
      if (((e = Nn(e.nextSibling)), e === null)) break;
    }
    return null;
  }
  function tb(e, t, n) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") &&
          !n) ||
        ((e = Nn(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function Nn(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (
          ((t = e.data),
          t === "$" || t === "$!" || t === "$?" || t === "F!" || t === "F")
        )
          break;
        if (t === "/$") return null;
      }
    }
    return e;
  }
  function o0(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "$" || n === "$!" || n === "$?") {
          if (t === 0) return e;
          t--;
        } else n === "/$" && t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function f0(e, t, n) {
    switch (((t = Eu(n)), e)) {
      case "html":
        if (((e = t.documentElement), !e)) throw Error(r(452));
        return e;
      case "head":
        if (((e = t.head), !e)) throw Error(r(453));
        return e;
      case "body":
        if (((e = t.body), !e)) throw Error(r(454));
        return e;
      default:
        throw Error(r(451));
    }
  }
  var bn = new Map(),
    d0 = new Set();
  function wu(e) {
    return typeof e.getRootNode == "function"
      ? e.getRootNode()
      : e.ownerDocument;
  }
  var ya = ae.d;
  ae.d = { f: nb, r: ab, D: lb, C: sb, L: ib, m: rb, X: cb, S: ub, M: ob };
  function nb() {
    var e = ya.f(),
      t = yu();
    return e || t;
  }
  function ab(e) {
    var t = Il(e);
    t !== null && t.tag === 5 && t.type === "form" ? qm(t) : ya.r(e);
  }
  var Os = typeof document > "u" ? null : document;
  function h0(e, t, n) {
    var s = Os;
    if (s && typeof t == "string" && t) {
      var u = cn(t);
      (u = 'link[rel="' + e + '"][href="' + u + '"]'),
        typeof n == "string" && (u += '[crossorigin="' + n + '"]'),
        d0.has(u) ||
          (d0.add(u),
          (e = { rel: e, crossOrigin: n, href: t }),
          s.querySelector(u) === null &&
            ((t = s.createElement("link")),
            Tt(t, "link", e),
            xt(t),
            s.head.appendChild(t)));
    }
  }
  function lb(e) {
    ya.D(e), h0("dns-prefetch", e, null);
  }
  function sb(e, t) {
    ya.C(e, t), h0("preconnect", e, t);
  }
  function ib(e, t, n) {
    ya.L(e, t, n);
    var s = Os;
    if (s && e && t) {
      var u = 'link[rel="preload"][as="' + cn(t) + '"]';
      t === "image" && n && n.imageSrcSet
        ? ((u += '[imagesrcset="' + cn(n.imageSrcSet) + '"]'),
          typeof n.imageSizes == "string" &&
            (u += '[imagesizes="' + cn(n.imageSizes) + '"]'))
        : (u += '[href="' + cn(e) + '"]');
      var o = u;
      switch (t) {
        case "style":
          o = js(e);
          break;
        case "script":
          o = Ds(e);
      }
      bn.has(o) ||
        ((e = le(
          {
            rel: "preload",
            href: t === "image" && n && n.imageSrcSet ? void 0 : e,
            as: t,
          },
          n
        )),
        bn.set(o, e),
        s.querySelector(u) !== null ||
          (t === "style" && s.querySelector(Xi(o))) ||
          (t === "script" && s.querySelector(Pi(o))) ||
          ((t = s.createElement("link")),
          Tt(t, "link", e),
          xt(t),
          s.head.appendChild(t)));
    }
  }
  function rb(e, t) {
    ya.m(e, t);
    var n = Os;
    if (n && e) {
      var s = t && typeof t.as == "string" ? t.as : "script",
        u =
          'link[rel="modulepreload"][as="' + cn(s) + '"][href="' + cn(e) + '"]',
        o = u;
      switch (s) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          o = Ds(e);
      }
      if (
        !bn.has(o) &&
        ((e = le({ rel: "modulepreload", href: e }, t)),
        bn.set(o, e),
        n.querySelector(u) === null)
      ) {
        switch (s) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (n.querySelector(Pi(o))) return;
        }
        (s = n.createElement("link")),
          Tt(s, "link", e),
          xt(s),
          n.head.appendChild(s);
      }
    }
  }
  function ub(e, t, n) {
    ya.S(e, t, n);
    var s = Os;
    if (s && e) {
      var u = es(s).hoistableStyles,
        o = js(e);
      t = t || "default";
      var y = u.get(o);
      if (!y) {
        var b = { loading: 0, preload: null };
        if ((y = s.querySelector(Xi(o)))) b.loading = 5;
        else {
          (e = le({ rel: "stylesheet", href: e, "data-precedence": t }, n)),
            (n = bn.get(o)) && gf(e, n);
          var S = (y = s.createElement("link"));
          xt(S),
            Tt(S, "link", e),
            (S._p = new Promise(function (j, Q) {
              (S.onload = j), (S.onerror = Q);
            })),
            S.addEventListener("load", function () {
              b.loading |= 1;
            }),
            S.addEventListener("error", function () {
              b.loading |= 2;
            }),
            (b.loading |= 4),
            _u(y, t, s);
        }
        (y = { type: "stylesheet", instance: y, count: 1, state: b }),
          u.set(o, y);
      }
    }
  }
  function cb(e, t) {
    ya.X(e, t);
    var n = Os;
    if (n && e) {
      var s = es(n).hoistableScripts,
        u = Ds(e),
        o = s.get(u);
      o ||
        ((o = n.querySelector(Pi(u))),
        o ||
          ((e = le({ src: e, async: !0 }, t)),
          (t = bn.get(u)) && vf(e, t),
          (o = n.createElement("script")),
          xt(o),
          Tt(o, "link", e),
          n.head.appendChild(o)),
        (o = { type: "script", instance: o, count: 1, state: null }),
        s.set(u, o));
    }
  }
  function ob(e, t) {
    ya.M(e, t);
    var n = Os;
    if (n && e) {
      var s = es(n).hoistableScripts,
        u = Ds(e),
        o = s.get(u);
      o ||
        ((o = n.querySelector(Pi(u))),
        o ||
          ((e = le({ src: e, async: !0, type: "module" }, t)),
          (t = bn.get(u)) && vf(e, t),
          (o = n.createElement("script")),
          xt(o),
          Tt(o, "link", e),
          n.head.appendChild(o)),
        (o = { type: "script", instance: o, count: 1, state: null }),
        s.set(u, o));
    }
  }
  function m0(e, t, n, s) {
    var u = (u = Rn.current) ? wu(u) : null;
    if (!u) throw Error(r(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof n.precedence == "string" && typeof n.href == "string"
          ? ((t = js(n.href)),
            (n = es(u).hoistableStyles),
            (s = n.get(t)),
            s ||
              ((s = { type: "style", instance: null, count: 0, state: null }),
              n.set(t, s)),
            s)
          : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (
          n.rel === "stylesheet" &&
          typeof n.href == "string" &&
          typeof n.precedence == "string"
        ) {
          e = js(n.href);
          var o = es(u).hoistableStyles,
            y = o.get(e);
          if (
            (y ||
              ((u = u.ownerDocument || u),
              (y = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              o.set(e, y),
              (o = u.querySelector(Xi(e))) &&
                !o._p &&
                ((y.instance = o), (y.state.loading = 5)),
              bn.has(e) ||
                ((n = {
                  rel: "preload",
                  as: "style",
                  href: n.href,
                  crossOrigin: n.crossOrigin,
                  integrity: n.integrity,
                  media: n.media,
                  hrefLang: n.hrefLang,
                  referrerPolicy: n.referrerPolicy,
                }),
                bn.set(e, n),
                o || fb(u, e, n, y.state))),
            t && s === null)
          )
            throw Error(r(528, ""));
          return y;
        }
        if (t && s !== null) throw Error(r(529, ""));
        return null;
      case "script":
        return (
          (t = n.async),
          (n = n.src),
          typeof n == "string" &&
          t &&
          typeof t != "function" &&
          typeof t != "symbol"
            ? ((t = Ds(n)),
              (n = es(u).hoistableScripts),
              (s = n.get(t)),
              s ||
                ((s = {
                  type: "script",
                  instance: null,
                  count: 0,
                  state: null,
                }),
                n.set(t, s)),
              s)
            : { type: "void", instance: null, count: 0, state: null }
        );
      default:
        throw Error(r(444, e));
    }
  }
  function js(e) {
    return 'href="' + cn(e) + '"';
  }
  function Xi(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function y0(e) {
    return le({}, e, { "data-precedence": e.precedence, precedence: null });
  }
  function fb(e, t, n, s) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]")
      ? (s.loading = 1)
      : ((t = e.createElement("link")),
        (s.preload = t),
        t.addEventListener("load", function () {
          return (s.loading |= 1);
        }),
        t.addEventListener("error", function () {
          return (s.loading |= 2);
        }),
        Tt(t, "link", n),
        xt(t),
        e.head.appendChild(t));
  }
  function Ds(e) {
    return '[src="' + cn(e) + '"]';
  }
  function Pi(e) {
    return "script[async]" + e;
  }
  function p0(e, t, n) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case "style":
          var s = e.querySelector('style[data-href~="' + cn(n.href) + '"]');
          if (s) return (t.instance = s), xt(s), s;
          var u = le({}, n, {
            "data-href": n.href,
            "data-precedence": n.precedence,
            href: null,
            precedence: null,
          });
          return (
            (s = (e.ownerDocument || e).createElement("style")),
            xt(s),
            Tt(s, "style", u),
            _u(s, n.precedence, e),
            (t.instance = s)
          );
        case "stylesheet":
          u = js(n.href);
          var o = e.querySelector(Xi(u));
          if (o) return (t.state.loading |= 4), (t.instance = o), xt(o), o;
          (s = y0(n)),
            (u = bn.get(u)) && gf(s, u),
            (o = (e.ownerDocument || e).createElement("link")),
            xt(o);
          var y = o;
          return (
            (y._p = new Promise(function (b, S) {
              (y.onload = b), (y.onerror = S);
            })),
            Tt(o, "link", s),
            (t.state.loading |= 4),
            _u(o, n.precedence, e),
            (t.instance = o)
          );
        case "script":
          return (
            (o = Ds(n.src)),
            (u = e.querySelector(Pi(o)))
              ? ((t.instance = u), xt(u), u)
              : ((s = n),
                (u = bn.get(o)) && ((s = le({}, n)), vf(s, u)),
                (e = e.ownerDocument || e),
                (u = e.createElement("script")),
                xt(u),
                Tt(u, "link", s),
                e.head.appendChild(u),
                (t.instance = u))
          );
        case "void":
          return null;
        default:
          throw Error(r(443, t.type));
      }
    else
      t.type === "stylesheet" &&
        !(t.state.loading & 4) &&
        ((s = t.instance), (t.state.loading |= 4), _u(s, n.precedence, e));
    return t.instance;
  }
  function _u(e, t, n) {
    for (
      var s = n.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]'
        ),
        u = s.length ? s[s.length - 1] : null,
        o = u,
        y = 0;
      y < s.length;
      y++
    ) {
      var b = s[y];
      if (b.dataset.precedence === t) o = b;
      else if (o !== u) break;
    }
    o
      ? o.parentNode.insertBefore(e, o.nextSibling)
      : ((t = n.nodeType === 9 ? n.head : n), t.insertBefore(e, t.firstChild));
  }
  function gf(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.title == null && (e.title = t.title);
  }
  function vf(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.integrity == null && (e.integrity = t.integrity);
  }
  var Ru = null;
  function g0(e, t, n) {
    if (Ru === null) {
      var s = new Map(),
        u = (Ru = new Map());
      u.set(n, s);
    } else (u = Ru), (s = u.get(n)), s || ((s = new Map()), u.set(n, s));
    if (s.has(e)) return s;
    for (
      s.set(e, null), n = n.getElementsByTagName(e), u = 0;
      u < n.length;
      u++
    ) {
      var o = n[u];
      if (
        !(
          o[ri] ||
          o[Nt] ||
          (e === "link" && o.getAttribute("rel") === "stylesheet")
        ) &&
        o.namespaceURI !== "http://www.w3.org/2000/svg"
      ) {
        var y = o.getAttribute(t) || "";
        y = e + y;
        var b = s.get(y);
        b ? b.push(o) : s.set(y, [o]);
      }
    }
    return s;
  }
  function v0(e, t, n) {
    (e = e.ownerDocument || e),
      e.head.insertBefore(
        n,
        t === "title" ? e.querySelector("head > title") : null
      );
  }
  function db(e, t, n) {
    if (n === 1 || t.itemProp != null) return !1;
    switch (e) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (
          typeof t.precedence != "string" ||
          typeof t.href != "string" ||
          t.href === ""
        )
          break;
        return !0;
      case "link":
        if (
          typeof t.rel != "string" ||
          typeof t.href != "string" ||
          t.href === "" ||
          t.onLoad ||
          t.onError
        )
          break;
        switch (t.rel) {
          case "stylesheet":
            return (
              (e = t.disabled), typeof t.precedence == "string" && e == null
            );
          default:
            return !0;
        }
      case "script":
        if (
          t.async &&
          typeof t.async != "function" &&
          typeof t.async != "symbol" &&
          !t.onLoad &&
          !t.onError &&
          t.src &&
          typeof t.src == "string"
        )
          return !0;
    }
    return !1;
  }
  function b0(e) {
    return !(e.type === "stylesheet" && !(e.state.loading & 3));
  }
  var Zi = null;
  function hb() {}
  function mb(e, t, n) {
    if (Zi === null) throw Error(r(475));
    var s = Zi;
    if (
      t.type === "stylesheet" &&
      (typeof n.media != "string" || matchMedia(n.media).matches !== !1) &&
      !(t.state.loading & 4)
    ) {
      if (t.instance === null) {
        var u = js(n.href),
          o = e.querySelector(Xi(u));
        if (o) {
          (e = o._p),
            e !== null &&
              typeof e == "object" &&
              typeof e.then == "function" &&
              (s.count++, (s = Au.bind(s)), e.then(s, s)),
            (t.state.loading |= 4),
            (t.instance = o),
            xt(o);
          return;
        }
        (o = e.ownerDocument || e),
          (n = y0(n)),
          (u = bn.get(u)) && gf(n, u),
          (o = o.createElement("link")),
          xt(o);
        var y = o;
        (y._p = new Promise(function (b, S) {
          (y.onload = b), (y.onerror = S);
        })),
          Tt(o, "link", n),
          (t.instance = o);
      }
      s.stylesheets === null && (s.stylesheets = new Map()),
        s.stylesheets.set(t, e),
        (e = t.state.preload) &&
          !(t.state.loading & 3) &&
          (s.count++,
          (t = Au.bind(s)),
          e.addEventListener("load", t),
          e.addEventListener("error", t));
    }
  }
  function yb() {
    if (Zi === null) throw Error(r(475));
    var e = Zi;
    return (
      e.stylesheets && e.count === 0 && bf(e, e.stylesheets),
      0 < e.count
        ? function (t) {
            var n = setTimeout(function () {
              if ((e.stylesheets && bf(e, e.stylesheets), e.unsuspend)) {
                var s = e.unsuspend;
                (e.unsuspend = null), s();
              }
            }, 6e4);
            return (
              (e.unsuspend = t),
              function () {
                (e.unsuspend = null), clearTimeout(n);
              }
            );
          }
        : null
    );
  }
  function Au() {
    if ((this.count--, this.count === 0)) {
      if (this.stylesheets) bf(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        (this.unsuspend = null), e();
      }
    }
  }
  var Tu = null;
  function bf(e, t) {
    (e.stylesheets = null),
      e.unsuspend !== null &&
        (e.count++,
        (Tu = new Map()),
        t.forEach(pb, e),
        (Tu = null),
        Au.call(e));
  }
  function pb(e, t) {
    if (!(t.state.loading & 4)) {
      var n = Tu.get(e);
      if (n) var s = n.get(null);
      else {
        (n = new Map()), Tu.set(e, n);
        for (
          var u = e.querySelectorAll(
              "link[data-precedence],style[data-precedence]"
            ),
            o = 0;
          o < u.length;
          o++
        ) {
          var y = u[o];
          (y.nodeName === "LINK" || y.getAttribute("media") !== "not all") &&
            (n.set(y.dataset.precedence, y), (s = y));
        }
        s && n.set(null, s);
      }
      (u = t.instance),
        (y = u.getAttribute("data-precedence")),
        (o = n.get(y) || s),
        o === s && n.set(null, u),
        n.set(y, u),
        this.count++,
        (s = Au.bind(this)),
        u.addEventListener("load", s),
        u.addEventListener("error", s),
        o
          ? o.parentNode.insertBefore(u, o.nextSibling)
          : ((e = e.nodeType === 9 ? e.head : e),
            e.insertBefore(u, e.firstChild)),
        (t.state.loading |= 4);
    }
  }
  var Ki = {
    $$typeof: O,
    Provider: null,
    Consumer: null,
    _currentValue: Oe,
    _currentValue2: Oe,
    _threadCount: 0,
  };
  function gb(e, t, n, s, u, o, y, b) {
    (this.tag = 1),
      (this.containerInfo = e),
      (this.finishedWork =
        this.pingCache =
        this.current =
        this.pendingChildren =
          null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = bc(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.finishedLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = bc(0)),
      (this.hiddenUpdates = bc(null)),
      (this.identifierPrefix = s),
      (this.onUncaughtError = u),
      (this.onCaughtError = o),
      (this.onRecoverableError = y),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = b),
      (this.incompleteTransitions = new Map());
  }
  function x0(e, t, n, s, u, o, y, b, S, j, Q, P) {
    return (
      (e = new gb(e, t, n, y, b, S, j, P)),
      (t = 1),
      o === !0 && (t |= 24),
      (o = gn(3, null, null, t)),
      (e.current = o),
      (o.stateNode = e),
      (t = Kc()),
      t.refCount++,
      (e.pooledCache = t),
      t.refCount++,
      (o.memoizedState = { element: s, isDehydrated: n, cache: t }),
      Oo(o),
      e
    );
  }
  function S0(e) {
    return e ? ((e = os), e) : os;
  }
  function E0(e, t, n, s, u, o) {
    (u = S0(u)),
      s.context === null ? (s.context = u) : (s.pendingContext = u),
      (s = za(t)),
      (s.payload = { element: n }),
      (o = o === void 0 ? null : o),
      o !== null && (s.callback = o),
      (n = La(e, s, t)),
      n !== null && (Ht(n, e, t), Di(n, e, t));
  }
  function w0(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function xf(e, t) {
    w0(e, t), (e = e.alternate) && w0(e, t);
  }
  function _0(e) {
    if (e.tag === 13) {
      var t = Ca(e, 67108864);
      t !== null && Ht(t, e, 67108864), xf(e, 67108864);
    }
  }
  var Cu = !0;
  function vb(e, t, n, s) {
    var u = X.T;
    X.T = null;
    var o = ae.p;
    try {
      (ae.p = 2), Sf(e, t, n, s);
    } finally {
      (ae.p = o), (X.T = u);
    }
  }
  function bb(e, t, n, s) {
    var u = X.T;
    X.T = null;
    var o = ae.p;
    try {
      (ae.p = 8), Sf(e, t, n, s);
    } finally {
      (ae.p = o), (X.T = u);
    }
  }
  function Sf(e, t, n, s) {
    if (Cu) {
      var u = Ef(s);
      if (u === null) cf(e, t, s, Nu, n), A0(e, s);
      else if (Sb(u, e, t, n, s)) s.stopPropagation();
      else if ((A0(e, s), t & 4 && -1 < xb.indexOf(e))) {
        for (; u !== null; ) {
          var o = Il(u);
          if (o !== null)
            switch (o.tag) {
              case 3:
                if (((o = o.stateNode), o.current.memoizedState.isDehydrated)) {
                  var y = dl(o.pendingLanes);
                  if (y !== 0) {
                    var b = o;
                    for (b.pendingLanes |= 2, b.entangledLanes |= 2; y; ) {
                      var S = 1 << (31 - en(y));
                      (b.entanglements[1] |= S), (y &= ~S);
                    }
                    Qn(o), !(Ie & 6) && ((du = re() + 500), Qi(0));
                  }
                }
                break;
              case 13:
                (b = Ca(o, 2)), b !== null && Ht(b, o, 2), yu(), xf(o, 2);
            }
          if (((o = Ef(s)), o === null && cf(e, t, s, Nu, n), o === u)) break;
          u = o;
        }
        u !== null && s.stopPropagation();
      } else cf(e, t, s, null, n);
    }
  }
  function Ef(e) {
    return (e = Ac(e)), wf(e);
  }
  var Nu = null;
  function wf(e) {
    if (((Nu = null), (e = hl(e)), e !== null)) {
      var t = he(e);
      if (t === null) e = null;
      else {
        var n = t.tag;
        if (n === 13) {
          if (((e = Le(t)), e !== null)) return e;
          e = null;
        } else if (n === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return (Nu = e), null;
  }
  function R0(e) {
    switch (e) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (_e()) {
          case lt:
            return 2;
          case st:
            return 8;
          case It:
          case gc:
            return 32;
          case Jl:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var _f = !1,
    Qa = null,
    Ga = null,
    Ya = null,
    $i = new Map(),
    Ji = new Map(),
    Xa = [],
    xb =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " "
      );
  function A0(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Qa = null;
        break;
      case "dragenter":
      case "dragleave":
        Ga = null;
        break;
      case "mouseover":
      case "mouseout":
        Ya = null;
        break;
      case "pointerover":
      case "pointerout":
        $i.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Ji.delete(t.pointerId);
    }
  }
  function Wi(e, t, n, s, u, o) {
    return e === null || e.nativeEvent !== o
      ? ((e = {
          blockedOn: t,
          domEventName: n,
          eventSystemFlags: s,
          nativeEvent: o,
          targetContainers: [u],
        }),
        t !== null && ((t = Il(t)), t !== null && _0(t)),
        e)
      : ((e.eventSystemFlags |= s),
        (t = e.targetContainers),
        u !== null && t.indexOf(u) === -1 && t.push(u),
        e);
  }
  function Sb(e, t, n, s, u) {
    switch (t) {
      case "focusin":
        return (Qa = Wi(Qa, e, t, n, s, u)), !0;
      case "dragenter":
        return (Ga = Wi(Ga, e, t, n, s, u)), !0;
      case "mouseover":
        return (Ya = Wi(Ya, e, t, n, s, u)), !0;
      case "pointerover":
        var o = u.pointerId;
        return $i.set(o, Wi($i.get(o) || null, e, t, n, s, u)), !0;
      case "gotpointercapture":
        return (
          (o = u.pointerId), Ji.set(o, Wi(Ji.get(o) || null, e, t, n, s, u)), !0
        );
    }
    return !1;
  }
  function T0(e) {
    var t = hl(e.target);
    if (t !== null) {
      var n = he(t);
      if (n !== null) {
        if (((t = n.tag), t === 13)) {
          if (((t = Le(n)), t !== null)) {
            (e.blockedOn = t),
              yv(e.priority, function () {
                if (n.tag === 13) {
                  var s = sn(),
                    u = Ca(n, s);
                  u !== null && Ht(u, n, s), xf(n, s);
                }
              });
            return;
          }
        } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Ou(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = Ef(e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var s = new n.constructor(n.type, n);
        (Rc = s), n.target.dispatchEvent(s), (Rc = null);
      } else return (t = Il(n)), t !== null && _0(t), (e.blockedOn = n), !1;
      t.shift();
    }
    return !0;
  }
  function C0(e, t, n) {
    Ou(e) && n.delete(t);
  }
  function Eb() {
    (_f = !1),
      Qa !== null && Ou(Qa) && (Qa = null),
      Ga !== null && Ou(Ga) && (Ga = null),
      Ya !== null && Ou(Ya) && (Ya = null),
      $i.forEach(C0),
      Ji.forEach(C0);
  }
  function ju(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      _f ||
        ((_f = !0),
        a.unstable_scheduleCallback(a.unstable_NormalPriority, Eb)));
  }
  var Du = null;
  function N0(e) {
    Du !== e &&
      ((Du = e),
      a.unstable_scheduleCallback(a.unstable_NormalPriority, function () {
        Du === e && (Du = null);
        for (var t = 0; t < e.length; t += 3) {
          var n = e[t],
            s = e[t + 1],
            u = e[t + 2];
          if (typeof s != "function") {
            if (wf(s || n) === null) continue;
            break;
          }
          var o = Il(n);
          o !== null &&
            (e.splice(t, 3),
            (t -= 3),
            fo(o, { pending: !0, data: u, method: n.method, action: s }, s, u));
        }
      }));
  }
  function Ii(e) {
    function t(S) {
      return ju(S, e);
    }
    Qa !== null && ju(Qa, e),
      Ga !== null && ju(Ga, e),
      Ya !== null && ju(Ya, e),
      $i.forEach(t),
      Ji.forEach(t);
    for (var n = 0; n < Xa.length; n++) {
      var s = Xa[n];
      s.blockedOn === e && (s.blockedOn = null);
    }
    for (; 0 < Xa.length && ((n = Xa[0]), n.blockedOn === null); )
      T0(n), n.blockedOn === null && Xa.shift();
    if (((n = (e.ownerDocument || e).$$reactFormReplay), n != null))
      for (s = 0; s < n.length; s += 3) {
        var u = n[s],
          o = n[s + 1],
          y = u[Ft] || null;
        if (typeof o == "function") y || N0(n);
        else if (y) {
          var b = null;
          if (o && o.hasAttribute("formAction")) {
            if (((u = o), (y = o[Ft] || null))) b = y.formAction;
            else if (wf(u) !== null) continue;
          } else b = y.action;
          typeof b == "function" ? (n[s + 1] = b) : (n.splice(s, 3), (s -= 3)),
            N0(n);
        }
      }
  }
  function Rf(e) {
    this._internalRoot = e;
  }
  (Uu.prototype.render = Rf.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(r(409));
      var n = t.current,
        s = sn();
      E0(n, s, e, t, null, null);
    }),
    (Uu.prototype.unmount = Rf.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          e.tag === 0 && Ts(),
            E0(e.current, 2, null, e, null, null),
            yu(),
            (t[Wl] = null);
        }
      });
  function Uu(e) {
    this._internalRoot = e;
  }
  Uu.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = ah();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < Xa.length && t !== 0 && t < Xa[n].priority; n++);
      Xa.splice(n, 0, e), n === 0 && T0(e);
    }
  };
  var O0 = l.version;
  if (O0 !== "19.0.0") throw Error(r(527, O0, "19.0.0"));
  ae.findDOMNode = function (e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function"
        ? Error(r(188))
        : ((e = Object.keys(e).join(",")), Error(r(268, e)));
    return (
      (e = Z(t)),
      (e = e !== null ? pe(e) : null),
      (e = e === null ? null : e.stateNode),
      e
    );
  };
  var wb = {
    bundleType: 0,
    version: "19.0.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: X,
    findFiberByHostInstance: hl,
    reconcilerVersion: "19.0.0",
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Mu = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Mu.isDisabled && Mu.supportsFiber)
      try {
        (_a = Mu.inject(wb)), (zt = Mu);
      } catch {}
  }
  return (
    (tr.createRoot = function (e, t) {
      if (!c(e)) throw Error(r(299));
      var n = !1,
        s = "",
        u = Pm,
        o = Zm,
        y = Km,
        b = null;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (n = !0),
          t.identifierPrefix !== void 0 && (s = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (u = t.onUncaughtError),
          t.onCaughtError !== void 0 && (o = t.onCaughtError),
          t.onRecoverableError !== void 0 && (y = t.onRecoverableError),
          t.unstable_transitionCallbacks !== void 0 &&
            (b = t.unstable_transitionCallbacks)),
        (t = x0(e, 1, !1, null, null, n, s, u, o, y, b, null)),
        (e[Wl] = t.current),
        uf(e.nodeType === 8 ? e.parentNode : e),
        new Rf(t)
      );
    }),
    (tr.hydrateRoot = function (e, t, n) {
      if (!c(e)) throw Error(r(299));
      var s = !1,
        u = "",
        o = Pm,
        y = Zm,
        b = Km,
        S = null,
        j = null;
      return (
        n != null &&
          (n.unstable_strictMode === !0 && (s = !0),
          n.identifierPrefix !== void 0 && (u = n.identifierPrefix),
          n.onUncaughtError !== void 0 && (o = n.onUncaughtError),
          n.onCaughtError !== void 0 && (y = n.onCaughtError),
          n.onRecoverableError !== void 0 && (b = n.onRecoverableError),
          n.unstable_transitionCallbacks !== void 0 &&
            (S = n.unstable_transitionCallbacks),
          n.formState !== void 0 && (j = n.formState)),
        (t = x0(e, 1, !0, t, n ?? null, s, u, o, y, b, S, j)),
        (t.context = S0(null)),
        (n = t.current),
        (s = sn()),
        (u = za(s)),
        (u.callback = null),
        La(n, u, s),
        (t.current.lanes = s),
        ii(t, s),
        Qn(t),
        (e[Wl] = t.current),
        uf(e),
        new Uu(t)
      );
    }),
    (tr.version = "19.0.0"),
    tr
  );
}
var V0;
function Mb() {
  if (V0) return Cf.exports;
  V0 = 1;
  function a() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (l) {
        console.error(l);
      }
  }
  return a(), (Cf.exports = Ub()), Cf.exports;
}
var zb = Mb(),
  w = Sd();
const Sn = Rb(w);
var nr = {},
  F0;
function Lb() {
  if (F0) return nr;
  (F0 = 1),
    Object.defineProperty(nr, "__esModule", { value: !0 }),
    (nr.parse = d),
    (nr.serialize = p);
  const a = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/,
    l = /^[\u0021-\u003A\u003C-\u007E]*$/,
    i =
      /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,
    r = /^[\u0020-\u003A\u003D-\u007E]*$/,
    c = Object.prototype.toString,
    f = (() => {
      const E = function () {};
      return (E.prototype = Object.create(null)), E;
    })();
  function d(E, O) {
    const _ = new f(),
      D = E.length;
    if (D < 2) return _;
    const C = (O == null ? void 0 : O.decode) || v;
    let H = 0;
    do {
      const B = E.indexOf("=", H);
      if (B === -1) break;
      const k = E.indexOf(";", H),
        ne = k === -1 ? D : k;
      if (B > ne) {
        H = E.lastIndexOf(";", B - 1) + 1;
        continue;
      }
      const Y = m(E, H, B),
        ee = h(E, B, Y),
        fe = E.slice(Y, ee);
      if (_[fe] === void 0) {
        let I = m(E, B + 1, ne),
          X = h(E, ne, I);
        const le = C(E.slice(I, X));
        _[fe] = le;
      }
      H = ne + 1;
    } while (H < D);
    return _;
  }
  function m(E, O, _) {
    do {
      const D = E.charCodeAt(O);
      if (D !== 32 && D !== 9) return O;
    } while (++O < _);
    return _;
  }
  function h(E, O, _) {
    for (; O > _; ) {
      const D = E.charCodeAt(--O);
      if (D !== 32 && D !== 9) return O + 1;
    }
    return _;
  }
  function p(E, O, _) {
    const D = (_ == null ? void 0 : _.encode) || encodeURIComponent;
    if (!a.test(E)) throw new TypeError(`argument name is invalid: ${E}`);
    const C = D(O);
    if (!l.test(C)) throw new TypeError(`argument val is invalid: ${O}`);
    let H = E + "=" + C;
    if (!_) return H;
    if (_.maxAge !== void 0) {
      if (!Number.isInteger(_.maxAge))
        throw new TypeError(`option maxAge is invalid: ${_.maxAge}`);
      H += "; Max-Age=" + _.maxAge;
    }
    if (_.domain) {
      if (!i.test(_.domain))
        throw new TypeError(`option domain is invalid: ${_.domain}`);
      H += "; Domain=" + _.domain;
    }
    if (_.path) {
      if (!r.test(_.path))
        throw new TypeError(`option path is invalid: ${_.path}`);
      H += "; Path=" + _.path;
    }
    if (_.expires) {
      if (!x(_.expires) || !Number.isFinite(_.expires.valueOf()))
        throw new TypeError(`option expires is invalid: ${_.expires}`);
      H += "; Expires=" + _.expires.toUTCString();
    }
    if (
      (_.httpOnly && (H += "; HttpOnly"),
      _.secure && (H += "; Secure"),
      _.partitioned && (H += "; Partitioned"),
      _.priority)
    )
      switch (
        typeof _.priority == "string" ? _.priority.toLowerCase() : void 0
      ) {
        case "low":
          H += "; Priority=Low";
          break;
        case "medium":
          H += "; Priority=Medium";
          break;
        case "high":
          H += "; Priority=High";
          break;
        default:
          throw new TypeError(`option priority is invalid: ${_.priority}`);
      }
    if (_.sameSite)
      switch (
        typeof _.sameSite == "string" ? _.sameSite.toLowerCase() : _.sameSite
      ) {
        case !0:
        case "strict":
          H += "; SameSite=Strict";
          break;
        case "lax":
          H += "; SameSite=Lax";
          break;
        case "none":
          H += "; SameSite=None";
          break;
        default:
          throw new TypeError(`option sameSite is invalid: ${_.sameSite}`);
      }
    return H;
  }
  function v(E) {
    if (E.indexOf("%") === -1) return E;
    try {
      return decodeURIComponent(E);
    } catch {
      return E;
    }
  }
  function x(E) {
    return c.call(E) === "[object Date]";
  }
  return nr;
}
Lb();
/**
 * react-router v7.2.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ var Q0 = "popstate";
function Hb(a = {}) {
  function l(r, c) {
    let { pathname: f, search: d, hash: m } = r.location;
    return Yf(
      "",
      { pathname: f, search: d, hash: m },
      (c.state && c.state.usr) || null,
      (c.state && c.state.key) || "default"
    );
  }
  function i(r, c) {
    return typeof c == "string" ? c : cr(c);
  }
  return qb(l, i, null, a);
}
function $e(a, l) {
  if (a === !1 || a === null || typeof a > "u") throw new Error(l);
}
function _n(a, l) {
  if (!a) {
    typeof console < "u" && console.warn(l);
    try {
      throw new Error(l);
    } catch {}
  }
}
function Bb() {
  return Math.random().toString(36).substring(2, 10);
}
function G0(a, l) {
  return { usr: a.state, key: a.key, idx: l };
}
function Yf(a, l, i = null, r) {
  return {
    pathname: typeof a == "string" ? a : a.pathname,
    search: "",
    hash: "",
    ...(typeof l == "string" ? Js(l) : l),
    state: i,
    key: (l && l.key) || r || Bb(),
  };
}
function cr({ pathname: a = "/", search: l = "", hash: i = "" }) {
  return (
    l && l !== "?" && (a += l.charAt(0) === "?" ? l : "?" + l),
    i && i !== "#" && (a += i.charAt(0) === "#" ? i : "#" + i),
    a
  );
}
function Js(a) {
  let l = {};
  if (a) {
    let i = a.indexOf("#");
    i >= 0 && ((l.hash = a.substring(i)), (a = a.substring(0, i)));
    let r = a.indexOf("?");
    r >= 0 && ((l.search = a.substring(r)), (a = a.substring(0, r))),
      a && (l.pathname = a);
  }
  return l;
}
function qb(a, l, i, r = {}) {
  let { window: c = document.defaultView, v5Compat: f = !1 } = r,
    d = c.history,
    m = "POP",
    h = null,
    p = v();
  p == null && ((p = 0), d.replaceState({ ...d.state, idx: p }, ""));
  function v() {
    return (d.state || { idx: null }).idx;
  }
  function x() {
    m = "POP";
    let C = v(),
      H = C == null ? null : C - p;
    (p = C), h && h({ action: m, location: D.location, delta: H });
  }
  function E(C, H) {
    m = "PUSH";
    let B = Yf(D.location, C, H);
    p = v() + 1;
    let k = G0(B, p),
      ne = D.createHref(B);
    try {
      d.pushState(k, "", ne);
    } catch (Y) {
      if (Y instanceof DOMException && Y.name === "DataCloneError") throw Y;
      c.location.assign(ne);
    }
    f && h && h({ action: m, location: D.location, delta: 1 });
  }
  function O(C, H) {
    m = "REPLACE";
    let B = Yf(D.location, C, H);
    p = v();
    let k = G0(B, p),
      ne = D.createHref(B);
    d.replaceState(k, "", ne),
      f && h && h({ action: m, location: D.location, delta: 0 });
  }
  function _(C) {
    let H = c.location.origin !== "null" ? c.location.origin : c.location.href,
      B = typeof C == "string" ? C : cr(C);
    return (
      (B = B.replace(/ $/, "%20")),
      $e(
        H,
        `No window.location.(origin|href) available to create URL for href: ${B}`
      ),
      new URL(B, H)
    );
  }
  let D = {
    get action() {
      return m;
    },
    get location() {
      return a(c, d);
    },
    listen(C) {
      if (h) throw new Error("A history only accepts one active listener");
      return (
        c.addEventListener(Q0, x),
        (h = C),
        () => {
          c.removeEventListener(Q0, x), (h = null);
        }
      );
    },
    createHref(C) {
      return l(c, C);
    },
    createURL: _,
    encodeLocation(C) {
      let H = _(C);
      return { pathname: H.pathname, search: H.search, hash: H.hash };
    },
    push: E,
    replace: O,
    go(C) {
      return d.go(C);
    },
  };
  return D;
}
function Vp(a, l, i = "/") {
  return kb(a, l, i, !1);
}
function kb(a, l, i, r) {
  let c = typeof l == "string" ? Js(l) : l,
    f = sl(c.pathname || "/", i);
  if (f == null) return null;
  let d = Fp(a);
  Vb(d);
  let m = null;
  for (let h = 0; m == null && h < d.length; ++h) {
    let p = Wb(f);
    m = $b(d[h], p, r);
  }
  return m;
}
function Fp(a, l = [], i = [], r = "") {
  let c = (f, d, m) => {
    let h = {
      relativePath: m === void 0 ? f.path || "" : m,
      caseSensitive: f.caseSensitive === !0,
      childrenIndex: d,
      route: f,
    };
    h.relativePath.startsWith("/") &&
      ($e(
        h.relativePath.startsWith(r),
        `Absolute route path "${h.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ),
      (h.relativePath = h.relativePath.slice(r.length)));
    let p = Sa([r, h.relativePath]),
      v = i.concat(h);
    f.children &&
      f.children.length > 0 &&
      ($e(
        f.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${p}".`
      ),
      Fp(f.children, l, v, p)),
      !(f.path == null && !f.index) &&
        l.push({ path: p, score: Zb(p, f.index), routesMeta: v });
  };
  return (
    a.forEach((f, d) => {
      var m;
      if (f.path === "" || !((m = f.path) != null && m.includes("?"))) c(f, d);
      else for (let h of Qp(f.path)) c(f, d, h);
    }),
    l
  );
}
function Qp(a) {
  let l = a.split("/");
  if (l.length === 0) return [];
  let [i, ...r] = l,
    c = i.endsWith("?"),
    f = i.replace(/\?$/, "");
  if (r.length === 0) return c ? [f, ""] : [f];
  let d = Qp(r.join("/")),
    m = [];
  return (
    m.push(...d.map((h) => (h === "" ? f : [f, h].join("/")))),
    c && m.push(...d),
    m.map((h) => (a.startsWith("/") && h === "" ? "/" : h))
  );
}
function Vb(a) {
  a.sort((l, i) =>
    l.score !== i.score
      ? i.score - l.score
      : Kb(
          l.routesMeta.map((r) => r.childrenIndex),
          i.routesMeta.map((r) => r.childrenIndex)
        )
  );
}
var Fb = /^:[\w-]+$/,
  Qb = 3,
  Gb = 2,
  Yb = 1,
  Xb = 10,
  Pb = -2,
  Y0 = (a) => a === "*";
function Zb(a, l) {
  let i = a.split("/"),
    r = i.length;
  return (
    i.some(Y0) && (r += Pb),
    l && (r += Gb),
    i
      .filter((c) => !Y0(c))
      .reduce((c, f) => c + (Fb.test(f) ? Qb : f === "" ? Yb : Xb), r)
  );
}
function Kb(a, l) {
  return a.length === l.length && a.slice(0, -1).every((r, c) => r === l[c])
    ? a[a.length - 1] - l[l.length - 1]
    : 0;
}
function $b(a, l, i = !1) {
  let { routesMeta: r } = a,
    c = {},
    f = "/",
    d = [];
  for (let m = 0; m < r.length; ++m) {
    let h = r[m],
      p = m === r.length - 1,
      v = f === "/" ? l : l.slice(f.length) || "/",
      x = Xu(
        { path: h.relativePath, caseSensitive: h.caseSensitive, end: p },
        v
      ),
      E = h.route;
    if (
      (!x &&
        p &&
        i &&
        !r[r.length - 1].route.index &&
        (x = Xu(
          { path: h.relativePath, caseSensitive: h.caseSensitive, end: !1 },
          v
        )),
      !x)
    )
      return null;
    Object.assign(c, x.params),
      d.push({
        params: c,
        pathname: Sa([f, x.pathname]),
        pathnameBase: nx(Sa([f, x.pathnameBase])),
        route: E,
      }),
      x.pathnameBase !== "/" && (f = Sa([f, x.pathnameBase]));
  }
  return d;
}
function Xu(a, l) {
  typeof a == "string" && (a = { path: a, caseSensitive: !1, end: !0 });
  let [i, r] = Jb(a.path, a.caseSensitive, a.end),
    c = l.match(i);
  if (!c) return null;
  let f = c[0],
    d = f.replace(/(.)\/+$/, "$1"),
    m = c.slice(1);
  return {
    params: r.reduce((p, { paramName: v, isOptional: x }, E) => {
      if (v === "*") {
        let _ = m[E] || "";
        d = f.slice(0, f.length - _.length).replace(/(.)\/+$/, "$1");
      }
      const O = m[E];
      return (
        x && !O ? (p[v] = void 0) : (p[v] = (O || "").replace(/%2F/g, "/")), p
      );
    }, {}),
    pathname: f,
    pathnameBase: d,
    pattern: a,
  };
}
function Jb(a, l = !1, i = !0) {
  _n(
    a === "*" || !a.endsWith("*") || a.endsWith("/*"),
    `Route path "${a}" will be treated as if it were "${a.replace(
      /\*$/,
      "/*"
    )}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${a.replace(
      /\*$/,
      "/*"
    )}".`
  );
  let r = [],
    c =
      "^" +
      a
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (d, m, h) => (
            r.push({ paramName: m, isOptional: h != null }),
            h ? "/?([^\\/]+)?" : "/([^\\/]+)"
          )
        );
  return (
    a.endsWith("*")
      ? (r.push({ paramName: "*" }),
        (c += a === "*" || a === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : i
      ? (c += "\\/*$")
      : a !== "" && a !== "/" && (c += "(?:(?=\\/|$))"),
    [new RegExp(c, l ? void 0 : "i"), r]
  );
}
function Wb(a) {
  try {
    return a
      .split("/")
      .map((l) => decodeURIComponent(l).replace(/\//g, "%2F"))
      .join("/");
  } catch (l) {
    return (
      _n(
        !1,
        `The URL path "${a}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${l}).`
      ),
      a
    );
  }
}
function sl(a, l) {
  if (l === "/") return a;
  if (!a.toLowerCase().startsWith(l.toLowerCase())) return null;
  let i = l.endsWith("/") ? l.length - 1 : l.length,
    r = a.charAt(i);
  return r && r !== "/" ? null : a.slice(i) || "/";
}
function Ib(a, l = "/") {
  let {
    pathname: i,
    search: r = "",
    hash: c = "",
  } = typeof a == "string" ? Js(a) : a;
  return {
    pathname: i ? (i.startsWith("/") ? i : ex(i, l)) : l,
    search: ax(r),
    hash: lx(c),
  };
}
function ex(a, l) {
  let i = l.replace(/\/+$/, "").split("/");
  return (
    a.split("/").forEach((c) => {
      c === ".." ? i.length > 1 && i.pop() : c !== "." && i.push(c);
    }),
    i.length > 1 ? i.join("/") : "/"
  );
}
function Uf(a, l, i, r) {
  return `Cannot include a '${a}' character in a manually specified \`to.${l}\` field [${JSON.stringify(
    r
  )}].  Please separate it out to the \`to.${i}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function tx(a) {
  return a.filter(
    (l, i) => i === 0 || (l.route.path && l.route.path.length > 0)
  );
}
function Ed(a) {
  let l = tx(a);
  return l.map((i, r) => (r === l.length - 1 ? i.pathname : i.pathnameBase));
}
function wd(a, l, i, r = !1) {
  let c;
  typeof a == "string"
    ? (c = Js(a))
    : ((c = { ...a }),
      $e(
        !c.pathname || !c.pathname.includes("?"),
        Uf("?", "pathname", "search", c)
      ),
      $e(
        !c.pathname || !c.pathname.includes("#"),
        Uf("#", "pathname", "hash", c)
      ),
      $e(!c.search || !c.search.includes("#"), Uf("#", "search", "hash", c)));
  let f = a === "" || c.pathname === "",
    d = f ? "/" : c.pathname,
    m;
  if (d == null) m = i;
  else {
    let x = l.length - 1;
    if (!r && d.startsWith("..")) {
      let E = d.split("/");
      for (; E[0] === ".."; ) E.shift(), (x -= 1);
      c.pathname = E.join("/");
    }
    m = x >= 0 ? l[x] : "/";
  }
  let h = Ib(c, m),
    p = d && d !== "/" && d.endsWith("/"),
    v = (f || d === ".") && i.endsWith("/");
  return !h.pathname.endsWith("/") && (p || v) && (h.pathname += "/"), h;
}
var Sa = (a) => a.join("/").replace(/\/\/+/g, "/"),
  nx = (a) => a.replace(/\/+$/, "").replace(/^\/*/, "/"),
  ax = (a) => (!a || a === "?" ? "" : a.startsWith("?") ? a : "?" + a),
  lx = (a) => (!a || a === "#" ? "" : a.startsWith("#") ? a : "#" + a);
function sx(a) {
  return (
    a != null &&
    typeof a.status == "number" &&
    typeof a.statusText == "string" &&
    typeof a.internal == "boolean" &&
    "data" in a
  );
}
var Gp = ["POST", "PUT", "PATCH", "DELETE"];
new Set(Gp);
var ix = ["GET", ...Gp];
new Set(ix);
var Ws = w.createContext(null);
Ws.displayName = "DataRouter";
var ac = w.createContext(null);
ac.displayName = "DataRouterState";
var Yp = w.createContext({ isTransitioning: !1 });
Yp.displayName = "ViewTransition";
var rx = w.createContext(new Map());
rx.displayName = "Fetchers";
var ux = w.createContext(null);
ux.displayName = "Await";
var Mn = w.createContext(null);
Mn.displayName = "Navigation";
var pr = w.createContext(null);
pr.displayName = "Location";
var zn = w.createContext({ outlet: null, matches: [], isDataRoute: !1 });
zn.displayName = "Route";
var _d = w.createContext(null);
_d.displayName = "RouteError";
function cx(a, { relative: l } = {}) {
  $e(
    Is(),
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: i, navigator: r } = w.useContext(Mn),
    { hash: c, pathname: f, search: d } = gr(a, { relative: l }),
    m = f;
  return (
    i !== "/" && (m = f === "/" ? i : Sa([i, f])),
    r.createHref({ pathname: m, search: d, hash: c })
  );
}
function Is() {
  return w.useContext(pr) != null;
}
function ct() {
  return (
    $e(
      Is(),
      "useLocation() may be used only in the context of a <Router> component."
    ),
    w.useContext(pr).location
  );
}
var Xp =
  "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Pp(a) {
  w.useContext(Mn).static || w.useLayoutEffect(a);
}
function mt() {
  let { isDataRoute: a } = w.useContext(zn);
  return a ? _x() : ox();
}
function ox() {
  $e(
    Is(),
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let a = w.useContext(Ws),
    { basename: l, navigator: i } = w.useContext(Mn),
    { matches: r } = w.useContext(zn),
    { pathname: c } = ct(),
    f = JSON.stringify(Ed(r)),
    d = w.useRef(!1);
  return (
    Pp(() => {
      d.current = !0;
    }),
    w.useCallback(
      (h, p = {}) => {
        if ((_n(d.current, Xp), !d.current)) return;
        if (typeof h == "number") {
          i.go(h);
          return;
        }
        let v = wd(h, JSON.parse(f), c, p.relative === "path");
        a == null &&
          l !== "/" &&
          (v.pathname = v.pathname === "/" ? l : Sa([l, v.pathname])),
          (p.replace ? i.replace : i.push)(v, p.state, p);
      },
      [l, i, f, c, a]
    )
  );
}
var fx = w.createContext(null);
function dx(a) {
  let l = w.useContext(zn).outlet;
  return l && w.createElement(fx.Provider, { value: a }, l);
}
function gr(a, { relative: l } = {}) {
  let { matches: i } = w.useContext(zn),
    { pathname: r } = ct(),
    c = JSON.stringify(Ed(i));
  return w.useMemo(() => wd(a, JSON.parse(c), r, l === "path"), [a, c, r, l]);
}
function hx(a, l) {
  return Zp(a, l);
}
function Zp(a, l, i, r) {
  var B;
  $e(
    Is(),
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: c, static: f } = w.useContext(Mn),
    { matches: d } = w.useContext(zn),
    m = d[d.length - 1],
    h = m ? m.params : {},
    p = m ? m.pathname : "/",
    v = m ? m.pathnameBase : "/",
    x = m && m.route;
  {
    let k = (x && x.path) || "";
    Kp(
      p,
      !x || k.endsWith("*") || k.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${p}" (under <Route path="${k}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${k}"> to <Route path="${
        k === "/" ? "*" : `${k}/*`
      }">.`
    );
  }
  let E = ct(),
    O;
  if (l) {
    let k = typeof l == "string" ? Js(l) : l;
    $e(
      v === "/" || ((B = k.pathname) == null ? void 0 : B.startsWith(v)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${v}" but pathname "${k.pathname}" was given in the \`location\` prop.`
    ),
      (O = k);
  } else O = E;
  let _ = O.pathname || "/",
    D = _;
  if (v !== "/") {
    let k = v.replace(/^\//, "").split("/");
    D = "/" + _.replace(/^\//, "").split("/").slice(k.length).join("/");
  }
  let C =
    !f && i && i.matches && i.matches.length > 0
      ? i.matches
      : Vp(a, { pathname: D });
  _n(
    x || C != null,
    `No routes matched location "${O.pathname}${O.search}${O.hash}" `
  ),
    _n(
      C == null ||
        C[C.length - 1].route.element !== void 0 ||
        C[C.length - 1].route.Component !== void 0 ||
        C[C.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${O.pathname}${O.search}${O.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    );
  let H = vx(
    C &&
      C.map((k) =>
        Object.assign({}, k, {
          params: Object.assign({}, h, k.params),
          pathname: Sa([
            v,
            c.encodeLocation
              ? c.encodeLocation(k.pathname).pathname
              : k.pathname,
          ]),
          pathnameBase:
            k.pathnameBase === "/"
              ? v
              : Sa([
                  v,
                  c.encodeLocation
                    ? c.encodeLocation(k.pathnameBase).pathname
                    : k.pathnameBase,
                ]),
        })
      ),
    d,
    i,
    r
  );
  return l && H
    ? w.createElement(
        pr.Provider,
        {
          value: {
            location: {
              pathname: "/",
              search: "",
              hash: "",
              state: null,
              key: "default",
              ...O,
            },
            navigationType: "POP",
          },
        },
        H
      )
    : H;
}
function mx() {
  let a = wx(),
    l = sx(a)
      ? `${a.status} ${a.statusText}`
      : a instanceof Error
      ? a.message
      : JSON.stringify(a),
    i = a instanceof Error ? a.stack : null,
    r = "rgba(200,200,200, 0.5)",
    c = { padding: "0.5rem", backgroundColor: r },
    f = { padding: "2px 4px", backgroundColor: r },
    d = null;
  return (
    console.error("Error handled by React Router default ErrorBoundary:", a),
    (d = w.createElement(
      w.Fragment,
      null,
      w.createElement("p", null, "💿 Hey developer 👋"),
      w.createElement(
        "p",
        null,
        "You can provide a way better UX than this when your app throws errors by providing your own ",
        w.createElement("code", { style: f }, "ErrorBoundary"),
        " or",
        " ",
        w.createElement("code", { style: f }, "errorElement"),
        " prop on your route."
      )
    )),
    w.createElement(
      w.Fragment,
      null,
      w.createElement("h2", null, "Unexpected Application Error!"),
      w.createElement("h3", { style: { fontStyle: "italic" } }, l),
      i ? w.createElement("pre", { style: c }, i) : null,
      d
    )
  );
}
var yx = w.createElement(mx, null),
  px = class extends w.Component {
    constructor(a) {
      super(a),
        (this.state = {
          location: a.location,
          revalidation: a.revalidation,
          error: a.error,
        });
    }
    static getDerivedStateFromError(a) {
      return { error: a };
    }
    static getDerivedStateFromProps(a, l) {
      return l.location !== a.location ||
        (l.revalidation !== "idle" && a.revalidation === "idle")
        ? { error: a.error, location: a.location, revalidation: a.revalidation }
        : {
            error: a.error !== void 0 ? a.error : l.error,
            location: l.location,
            revalidation: a.revalidation || l.revalidation,
          };
    }
    componentDidCatch(a, l) {
      console.error(
        "React Router caught the following error during render",
        a,
        l
      );
    }
    render() {
      return this.state.error !== void 0
        ? w.createElement(
            zn.Provider,
            { value: this.props.routeContext },
            w.createElement(_d.Provider, {
              value: this.state.error,
              children: this.props.component,
            })
          )
        : this.props.children;
    }
  };
function gx({ routeContext: a, match: l, children: i }) {
  let r = w.useContext(Ws);
  return (
    r &&
      r.static &&
      r.staticContext &&
      (l.route.errorElement || l.route.ErrorBoundary) &&
      (r.staticContext._deepestRenderedBoundaryId = l.route.id),
    w.createElement(zn.Provider, { value: a }, i)
  );
}
function vx(a, l = [], i = null, r = null) {
  if (a == null) {
    if (!i) return null;
    if (i.errors) a = i.matches;
    else if (l.length === 0 && !i.initialized && i.matches.length > 0)
      a = i.matches;
    else return null;
  }
  let c = a,
    f = i == null ? void 0 : i.errors;
  if (f != null) {
    let h = c.findIndex(
      (p) => p.route.id && (f == null ? void 0 : f[p.route.id]) !== void 0
    );
    $e(
      h >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        f
      ).join(",")}`
    ),
      (c = c.slice(0, Math.min(c.length, h + 1)));
  }
  let d = !1,
    m = -1;
  if (i)
    for (let h = 0; h < c.length; h++) {
      let p = c[h];
      if (
        ((p.route.HydrateFallback || p.route.hydrateFallbackElement) && (m = h),
        p.route.id)
      ) {
        let { loaderData: v, errors: x } = i,
          E =
            p.route.loader &&
            !v.hasOwnProperty(p.route.id) &&
            (!x || x[p.route.id] === void 0);
        if (p.route.lazy || E) {
          (d = !0), m >= 0 ? (c = c.slice(0, m + 1)) : (c = [c[0]]);
          break;
        }
      }
    }
  return c.reduceRight((h, p, v) => {
    let x,
      E = !1,
      O = null,
      _ = null;
    i &&
      ((x = f && p.route.id ? f[p.route.id] : void 0),
      (O = p.route.errorElement || yx),
      d &&
        (m < 0 && v === 0
          ? (Kp(
              "route-fallback",
              !1,
              "No `HydrateFallback` element provided to render during initial hydration"
            ),
            (E = !0),
            (_ = null))
          : m === v &&
            ((E = !0), (_ = p.route.hydrateFallbackElement || null))));
    let D = l.concat(c.slice(0, v + 1)),
      C = () => {
        let H;
        return (
          x
            ? (H = O)
            : E
            ? (H = _)
            : p.route.Component
            ? (H = w.createElement(p.route.Component, null))
            : p.route.element
            ? (H = p.route.element)
            : (H = h),
          w.createElement(gx, {
            match: p,
            routeContext: { outlet: h, matches: D, isDataRoute: i != null },
            children: H,
          })
        );
      };
    return i && (p.route.ErrorBoundary || p.route.errorElement || v === 0)
      ? w.createElement(px, {
          location: i.location,
          revalidation: i.revalidation,
          component: O,
          error: x,
          children: C(),
          routeContext: { outlet: null, matches: D, isDataRoute: !0 },
        })
      : C();
  }, null);
}
function Rd(a) {
  return `${a} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function bx(a) {
  let l = w.useContext(Ws);
  return $e(l, Rd(a)), l;
}
function xx(a) {
  let l = w.useContext(ac);
  return $e(l, Rd(a)), l;
}
function Sx(a) {
  let l = w.useContext(zn);
  return $e(l, Rd(a)), l;
}
function Ad(a) {
  let l = Sx(a),
    i = l.matches[l.matches.length - 1];
  return (
    $e(
      i.route.id,
      `${a} can only be used on routes that contain a unique "id"`
    ),
    i.route.id
  );
}
function Ex() {
  return Ad("useRouteId");
}
function wx() {
  var r;
  let a = w.useContext(_d),
    l = xx("useRouteError"),
    i = Ad("useRouteError");
  return a !== void 0 ? a : (r = l.errors) == null ? void 0 : r[i];
}
function _x() {
  let { router: a } = bx("useNavigate"),
    l = Ad("useNavigate"),
    i = w.useRef(!1);
  return (
    Pp(() => {
      i.current = !0;
    }),
    w.useCallback(
      async (c, f = {}) => {
        _n(i.current, Xp),
          i.current &&
            (typeof c == "number"
              ? a.navigate(c)
              : await a.navigate(c, { fromRouteId: l, ...f }));
      },
      [a, l]
    )
  );
}
var X0 = {};
function Kp(a, l, i) {
  !l && !X0[a] && ((X0[a] = !0), _n(!1, i));
}
w.memo(Rx);
function Rx({ routes: a, future: l, state: i }) {
  return Zp(a, void 0, i, l);
}
function Wn({ to: a, replace: l, state: i, relative: r }) {
  $e(
    Is(),
    "<Navigate> may be used only in the context of a <Router> component."
  );
  let { static: c } = w.useContext(Mn);
  _n(
    !c,
    "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change."
  );
  let { matches: f } = w.useContext(zn),
    { pathname: d } = ct(),
    m = mt(),
    h = wd(a, Ed(f), d, r === "path"),
    p = JSON.stringify(h);
  return (
    w.useEffect(() => {
      m(JSON.parse(p), { replace: l, state: i, relative: r });
    }, [m, p, r, l, i]),
    null
  );
}
function lc(a) {
  return dx(a.context);
}
function _t(a) {
  $e(
    !1,
    "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>."
  );
}
function Ax({
  basename: a = "/",
  children: l = null,
  location: i,
  navigationType: r = "POP",
  navigator: c,
  static: f = !1,
}) {
  $e(
    !Is(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let d = a.replace(/^\/*/, "/"),
    m = w.useMemo(
      () => ({ basename: d, navigator: c, static: f, future: {} }),
      [d, c, f]
    );
  typeof i == "string" && (i = Js(i));
  let {
      pathname: h = "/",
      search: p = "",
      hash: v = "",
      state: x = null,
      key: E = "default",
    } = i,
    O = w.useMemo(() => {
      let _ = sl(h, d);
      return _ == null
        ? null
        : {
            location: { pathname: _, search: p, hash: v, state: x, key: E },
            navigationType: r,
          };
    }, [d, h, p, v, x, E, r]);
  return (
    _n(
      O != null,
      `<Router basename="${d}"> is not able to match the URL "${h}${p}${v}" because it does not start with the basename, so the <Router> won't render anything.`
    ),
    O == null
      ? null
      : w.createElement(
          Mn.Provider,
          { value: m },
          w.createElement(pr.Provider, { children: l, value: O })
        )
  );
}
function Tx({ children: a, location: l }) {
  return hx(Xf(a), l);
}
function Xf(a, l = []) {
  let i = [];
  return (
    w.Children.forEach(a, (r, c) => {
      if (!w.isValidElement(r)) return;
      let f = [...l, c];
      if (r.type === w.Fragment) {
        i.push.apply(i, Xf(r.props.children, f));
        return;
      }
      $e(
        r.type === _t,
        `[${
          typeof r.type == "string" ? r.type : r.type.name
        }] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
      ),
        $e(
          !r.props.index || !r.props.children,
          "An index route cannot have child routes."
        );
      let d = {
        id: r.props.id || f.join("-"),
        caseSensitive: r.props.caseSensitive,
        element: r.props.element,
        Component: r.props.Component,
        index: r.props.index,
        path: r.props.path,
        loader: r.props.loader,
        action: r.props.action,
        hydrateFallbackElement: r.props.hydrateFallbackElement,
        HydrateFallback: r.props.HydrateFallback,
        errorElement: r.props.errorElement,
        ErrorBoundary: r.props.ErrorBoundary,
        hasErrorBoundary:
          r.props.hasErrorBoundary === !0 ||
          r.props.ErrorBoundary != null ||
          r.props.errorElement != null,
        shouldRevalidate: r.props.shouldRevalidate,
        handle: r.props.handle,
        lazy: r.props.lazy,
      };
      r.props.children && (d.children = Xf(r.props.children, f)), i.push(d);
    }),
    i
  );
}
var Bu = "get",
  qu = "application/x-www-form-urlencoded";
function sc(a) {
  return a != null && typeof a.tagName == "string";
}
function Cx(a) {
  return sc(a) && a.tagName.toLowerCase() === "button";
}
function Nx(a) {
  return sc(a) && a.tagName.toLowerCase() === "form";
}
function Ox(a) {
  return sc(a) && a.tagName.toLowerCase() === "input";
}
function jx(a) {
  return !!(a.metaKey || a.altKey || a.ctrlKey || a.shiftKey);
}
function Dx(a, l) {
  return a.button === 0 && (!l || l === "_self") && !jx(a);
}
function Pf(a = "") {
  return new URLSearchParams(
    typeof a == "string" || Array.isArray(a) || a instanceof URLSearchParams
      ? a
      : Object.keys(a).reduce((l, i) => {
          let r = a[i];
          return l.concat(Array.isArray(r) ? r.map((c) => [i, c]) : [[i, r]]);
        }, [])
  );
}
function Ux(a, l) {
  let i = Pf(a);
  return (
    l &&
      l.forEach((r, c) => {
        i.has(c) ||
          l.getAll(c).forEach((f) => {
            i.append(c, f);
          });
      }),
    i
  );
}
var Lu = null;
function Mx() {
  if (Lu === null)
    try {
      new FormData(document.createElement("form"), 0), (Lu = !1);
    } catch {
      Lu = !0;
    }
  return Lu;
}
var zx = new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain",
]);
function Mf(a) {
  return a != null && !zx.has(a)
    ? (_n(
        !1,
        `"${a}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${qu}"`
      ),
      null)
    : a;
}
function Lx(a, l) {
  let i, r, c, f, d;
  if (Nx(a)) {
    let m = a.getAttribute("action");
    (r = m ? sl(m, l) : null),
      (i = a.getAttribute("method") || Bu),
      (c = Mf(a.getAttribute("enctype")) || qu),
      (f = new FormData(a));
  } else if (Cx(a) || (Ox(a) && (a.type === "submit" || a.type === "image"))) {
    let m = a.form;
    if (m == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let h = a.getAttribute("formaction") || m.getAttribute("action");
    if (
      ((r = h ? sl(h, l) : null),
      (i = a.getAttribute("formmethod") || m.getAttribute("method") || Bu),
      (c =
        Mf(a.getAttribute("formenctype")) ||
        Mf(m.getAttribute("enctype")) ||
        qu),
      (f = new FormData(m, a)),
      !Mx())
    ) {
      let { name: p, type: v, value: x } = a;
      if (v === "image") {
        let E = p ? `${p}.` : "";
        f.append(`${E}x`, "0"), f.append(`${E}y`, "0");
      } else p && f.append(p, x);
    }
  } else {
    if (sc(a))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    (i = Bu), (r = null), (c = qu), (d = a);
  }
  return (
    f && c === "text/plain" && ((d = f), (f = void 0)),
    { action: r, method: i.toLowerCase(), encType: c, formData: f, body: d }
  );
}
function Td(a, l) {
  if (a === !1 || a === null || typeof a > "u") throw new Error(l);
}
async function Hx(a, l) {
  if (a.id in l) return l[a.id];
  try {
    let i = await import(a.module);
    return (l[a.id] = i), i;
  } catch (i) {
    return (
      console.error(
        `Error loading route module \`${a.module}\`, reloading page...`
      ),
      console.error(i),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
function Bx(a) {
  return a == null
    ? !1
    : a.href == null
    ? a.rel === "preload" &&
      typeof a.imageSrcSet == "string" &&
      typeof a.imageSizes == "string"
    : typeof a.rel == "string" && typeof a.href == "string";
}
async function qx(a, l, i) {
  let r = await Promise.all(
    a.map(async (c) => {
      let f = l.routes[c.route.id];
      if (f) {
        let d = await Hx(f, i);
        return d.links ? d.links() : [];
      }
      return [];
    })
  );
  return Qx(
    r
      .flat(1)
      .filter(Bx)
      .filter((c) => c.rel === "stylesheet" || c.rel === "preload")
      .map((c) =>
        c.rel === "stylesheet"
          ? { ...c, rel: "prefetch", as: "style" }
          : { ...c, rel: "prefetch" }
      )
  );
}
function P0(a, l, i, r, c, f) {
  let d = (h, p) => (i[p] ? h.route.id !== i[p].route.id : !0),
    m = (h, p) => {
      var v;
      return (
        i[p].pathname !== h.pathname ||
        (((v = i[p].route.path) == null ? void 0 : v.endsWith("*")) &&
          i[p].params["*"] !== h.params["*"])
      );
    };
  return f === "assets"
    ? l.filter((h, p) => d(h, p) || m(h, p))
    : f === "data"
    ? l.filter((h, p) => {
        var x;
        let v = r.routes[h.route.id];
        if (!v || !v.hasLoader) return !1;
        if (d(h, p) || m(h, p)) return !0;
        if (h.route.shouldRevalidate) {
          let E = h.route.shouldRevalidate({
            currentUrl: new URL(c.pathname + c.search + c.hash, window.origin),
            currentParams: ((x = i[0]) == null ? void 0 : x.params) || {},
            nextUrl: new URL(a, window.origin),
            nextParams: h.params,
            defaultShouldRevalidate: !0,
          });
          if (typeof E == "boolean") return E;
        }
        return !0;
      })
    : [];
}
function kx(a, l, { includeHydrateFallback: i } = {}) {
  return Vx(
    a
      .map((r) => {
        let c = l.routes[r.route.id];
        if (!c) return [];
        let f = [c.module];
        return (
          c.clientActionModule && (f = f.concat(c.clientActionModule)),
          c.clientLoaderModule && (f = f.concat(c.clientLoaderModule)),
          i &&
            c.hydrateFallbackModule &&
            (f = f.concat(c.hydrateFallbackModule)),
          c.imports && (f = f.concat(c.imports)),
          f
        );
      })
      .flat(1)
  );
}
function Vx(a) {
  return [...new Set(a)];
}
function Fx(a) {
  let l = {},
    i = Object.keys(a).sort();
  for (let r of i) l[r] = a[r];
  return l;
}
function Qx(a, l) {
  let i = new Set();
  return (
    new Set(l),
    a.reduce((r, c) => {
      let f = JSON.stringify(Fx(c));
      return i.has(f) || (i.add(f), r.push({ key: f, link: c })), r;
    }, [])
  );
}
function Gx(a) {
  let l =
    typeof a == "string"
      ? new URL(
          a,
          typeof window > "u" ? "server://singlefetch/" : window.location.origin
        )
      : a;
  return (
    l.pathname === "/"
      ? (l.pathname = "_root.data")
      : (l.pathname = `${l.pathname.replace(/\/$/, "")}.data`),
    l
  );
}
function Yx() {
  let a = w.useContext(Ws);
  return (
    Td(
      a,
      "You must render this element inside a <DataRouterContext.Provider> element"
    ),
    a
  );
}
function Xx() {
  let a = w.useContext(ac);
  return (
    Td(
      a,
      "You must render this element inside a <DataRouterStateContext.Provider> element"
    ),
    a
  );
}
var Cd = w.createContext(void 0);
Cd.displayName = "FrameworkContext";
function $p() {
  let a = w.useContext(Cd);
  return (
    Td(a, "You must render this element inside a <HydratedRouter> element"), a
  );
}
function Px(a, l) {
  let i = w.useContext(Cd),
    [r, c] = w.useState(!1),
    [f, d] = w.useState(!1),
    {
      onFocus: m,
      onBlur: h,
      onMouseEnter: p,
      onMouseLeave: v,
      onTouchStart: x,
    } = l,
    E = w.useRef(null);
  w.useEffect(() => {
    if ((a === "render" && d(!0), a === "viewport")) {
      let D = (H) => {
          H.forEach((B) => {
            d(B.isIntersecting);
          });
        },
        C = new IntersectionObserver(D, { threshold: 0.5 });
      return (
        E.current && C.observe(E.current),
        () => {
          C.disconnect();
        }
      );
    }
  }, [a]),
    w.useEffect(() => {
      if (r) {
        let D = setTimeout(() => {
          d(!0);
        }, 100);
        return () => {
          clearTimeout(D);
        };
      }
    }, [r]);
  let O = () => {
      c(!0);
    },
    _ = () => {
      c(!1), d(!1);
    };
  return i
    ? a !== "intent"
      ? [f, E, {}]
      : [
          f,
          E,
          {
            onFocus: ar(m, O),
            onBlur: ar(h, _),
            onMouseEnter: ar(p, O),
            onMouseLeave: ar(v, _),
            onTouchStart: ar(x, O),
          },
        ]
    : [!1, E, {}];
}
function ar(a, l) {
  return (i) => {
    a && a(i), i.defaultPrevented || l(i);
  };
}
function Zx({ page: a, ...l }) {
  let { router: i } = Yx(),
    r = w.useMemo(() => Vp(i.routes, a, i.basename), [i.routes, a, i.basename]);
  return r ? w.createElement($x, { page: a, matches: r, ...l }) : null;
}
function Kx(a) {
  let { manifest: l, routeModules: i } = $p(),
    [r, c] = w.useState([]);
  return (
    w.useEffect(() => {
      let f = !1;
      return (
        qx(a, l, i).then((d) => {
          f || c(d);
        }),
        () => {
          f = !0;
        }
      );
    }, [a, l, i]),
    r
  );
}
function $x({ page: a, matches: l, ...i }) {
  let r = ct(),
    { manifest: c, routeModules: f } = $p(),
    { loaderData: d, matches: m } = Xx(),
    h = w.useMemo(() => P0(a, l, m, c, r, "data"), [a, l, m, c, r]),
    p = w.useMemo(() => P0(a, l, m, c, r, "assets"), [a, l, m, c, r]),
    v = w.useMemo(() => {
      if (a === r.pathname + r.search + r.hash) return [];
      let O = new Set(),
        _ = !1;
      if (
        (l.forEach((C) => {
          var B;
          let H = c.routes[C.route.id];
          !H ||
            !H.hasLoader ||
            ((!h.some((k) => k.route.id === C.route.id) &&
              C.route.id in d &&
              (B = f[C.route.id]) != null &&
              B.shouldRevalidate) ||
            H.hasClientLoader
              ? (_ = !0)
              : O.add(C.route.id));
        }),
        O.size === 0)
      )
        return [];
      let D = Gx(a);
      return (
        _ &&
          O.size > 0 &&
          D.searchParams.set(
            "_routes",
            l
              .filter((C) => O.has(C.route.id))
              .map((C) => C.route.id)
              .join(",")
          ),
        [D.pathname + D.search]
      );
    }, [d, r, c, h, l, a, f]),
    x = w.useMemo(() => kx(p, c), [p, c]),
    E = Kx(p);
  return w.createElement(
    w.Fragment,
    null,
    v.map((O) =>
      w.createElement("link", {
        key: O,
        rel: "prefetch",
        as: "fetch",
        href: O,
        ...i,
      })
    ),
    x.map((O) =>
      w.createElement("link", { key: O, rel: "modulepreload", href: O, ...i })
    ),
    E.map(({ key: O, link: _ }) => w.createElement("link", { key: O, ..._ }))
  );
}
function Jx(...a) {
  return (l) => {
    a.forEach((i) => {
      typeof i == "function" ? i(l) : i != null && (i.current = l);
    });
  };
}
var Jp =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
try {
  Jp && (window.__reactRouterVersion = "7.2.0");
} catch {}
function Wx({ basename: a, children: l, window: i }) {
  let r = w.useRef();
  r.current == null && (r.current = Hb({ window: i, v5Compat: !0 }));
  let c = r.current,
    [f, d] = w.useState({ action: c.action, location: c.location }),
    m = w.useCallback(
      (h) => {
        w.startTransition(() => d(h));
      },
      [d]
    );
  return (
    w.useLayoutEffect(() => c.listen(m), [c, m]),
    w.createElement(Ax, {
      basename: a,
      children: l,
      location: f.location,
      navigationType: f.action,
      navigator: c,
    })
  );
}
var Wp = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Yl = w.forwardRef(function (
    {
      onClick: l,
      discover: i = "render",
      prefetch: r = "none",
      relative: c,
      reloadDocument: f,
      replace: d,
      state: m,
      target: h,
      to: p,
      preventScrollReset: v,
      viewTransition: x,
      ...E
    },
    O
  ) {
    let { basename: _ } = w.useContext(Mn),
      D = typeof p == "string" && Wp.test(p),
      C,
      H = !1;
    if (typeof p == "string" && D && ((C = p), Jp))
      try {
        let X = new URL(window.location.href),
          le = p.startsWith("//") ? new URL(X.protocol + p) : new URL(p),
          Ve = sl(le.pathname, _);
        le.origin === X.origin && Ve != null
          ? (p = Ve + le.search + le.hash)
          : (H = !0);
      } catch {
        _n(
          !1,
          `<Link to="${p}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
        );
      }
    let B = cx(p, { relative: c }),
      [k, ne, Y] = Px(r, E),
      ee = nS(p, {
        replace: d,
        state: m,
        target: h,
        preventScrollReset: v,
        relative: c,
        viewTransition: x,
      });
    function fe(X) {
      l && l(X), X.defaultPrevented || ee(X);
    }
    let I = w.createElement("a", {
      ...E,
      ...Y,
      href: C || B,
      onClick: H || f ? l : fe,
      ref: Jx(O, ne),
      target: h,
      "data-discover": !D && i === "render" ? "true" : void 0,
    });
    return k && !D
      ? w.createElement(w.Fragment, null, I, w.createElement(Zx, { page: B }))
      : I;
  });
Yl.displayName = "Link";
var Ix = w.forwardRef(function (
  {
    "aria-current": l = "page",
    caseSensitive: i = !1,
    className: r = "",
    end: c = !1,
    style: f,
    to: d,
    viewTransition: m,
    children: h,
    ...p
  },
  v
) {
  let x = gr(d, { relative: p.relative }),
    E = ct(),
    O = w.useContext(ac),
    { navigator: _, basename: D } = w.useContext(Mn),
    C = O != null && rS(x) && m === !0,
    H = _.encodeLocation ? _.encodeLocation(x).pathname : x.pathname,
    B = E.pathname,
    k =
      O && O.navigation && O.navigation.location
        ? O.navigation.location.pathname
        : null;
  i ||
    ((B = B.toLowerCase()),
    (k = k ? k.toLowerCase() : null),
    (H = H.toLowerCase())),
    k && D && (k = sl(k, D) || k);
  const ne = H !== "/" && H.endsWith("/") ? H.length - 1 : H.length;
  let Y = B === H || (!c && B.startsWith(H) && B.charAt(ne) === "/"),
    ee =
      k != null &&
      (k === H || (!c && k.startsWith(H) && k.charAt(H.length) === "/")),
    fe = { isActive: Y, isPending: ee, isTransitioning: C },
    I = Y ? l : void 0,
    X;
  typeof r == "function"
    ? (X = r(fe))
    : (X = [
        r,
        Y ? "active" : null,
        ee ? "pending" : null,
        C ? "transitioning" : null,
      ]
        .filter(Boolean)
        .join(" "));
  let le = typeof f == "function" ? f(fe) : f;
  return w.createElement(
    Yl,
    {
      ...p,
      "aria-current": I,
      className: X,
      ref: v,
      style: le,
      to: d,
      viewTransition: m,
    },
    typeof h == "function" ? h(fe) : h
  );
});
Ix.displayName = "NavLink";
var eS = w.forwardRef(
  (
    {
      discover: a = "render",
      fetcherKey: l,
      navigate: i,
      reloadDocument: r,
      replace: c,
      state: f,
      method: d = Bu,
      action: m,
      onSubmit: h,
      relative: p,
      preventScrollReset: v,
      viewTransition: x,
      ...E
    },
    O
  ) => {
    let _ = sS(),
      D = iS(m, { relative: p }),
      C = d.toLowerCase() === "get" ? "get" : "post",
      H = typeof m == "string" && Wp.test(m),
      B = (k) => {
        if ((h && h(k), k.defaultPrevented)) return;
        k.preventDefault();
        let ne = k.nativeEvent.submitter,
          Y = (ne == null ? void 0 : ne.getAttribute("formmethod")) || d;
        _(ne || k.currentTarget, {
          fetcherKey: l,
          method: Y,
          navigate: i,
          replace: c,
          state: f,
          relative: p,
          preventScrollReset: v,
          viewTransition: x,
        });
      };
    return w.createElement("form", {
      ref: O,
      method: C,
      action: D,
      onSubmit: r ? h : B,
      ...E,
      "data-discover": !H && a === "render" ? "true" : void 0,
    });
  }
);
eS.displayName = "Form";
function tS(a) {
  return `${a} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Ip(a) {
  let l = w.useContext(Ws);
  return $e(l, tS(a)), l;
}
function nS(
  a,
  {
    target: l,
    replace: i,
    state: r,
    preventScrollReset: c,
    relative: f,
    viewTransition: d,
  } = {}
) {
  let m = mt(),
    h = ct(),
    p = gr(a, { relative: f });
  return w.useCallback(
    (v) => {
      if (Dx(v, l)) {
        v.preventDefault();
        let x = i !== void 0 ? i : cr(h) === cr(p);
        m(a, {
          replace: x,
          state: r,
          preventScrollReset: c,
          relative: f,
          viewTransition: d,
        });
      }
    },
    [h, m, p, i, r, l, a, c, f, d]
  );
}
function rl(a) {
  _n(
    typeof URLSearchParams < "u",
    "You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params."
  );
  let l = w.useRef(Pf(a)),
    i = w.useRef(!1),
    r = ct(),
    c = w.useMemo(() => Ux(r.search, i.current ? null : l.current), [r.search]),
    f = mt(),
    d = w.useCallback(
      (m, h) => {
        const p = Pf(typeof m == "function" ? m(c) : m);
        (i.current = !0), f("?" + p, h);
      },
      [f, c]
    );
  return [c, d];
}
var aS = 0,
  lS = () => `__${String(++aS)}__`;
function sS() {
  let { router: a } = Ip("useSubmit"),
    { basename: l } = w.useContext(Mn),
    i = Ex();
  return w.useCallback(
    async (r, c = {}) => {
      let { action: f, method: d, encType: m, formData: h, body: p } = Lx(r, l);
      if (c.navigate === !1) {
        let v = c.fetcherKey || lS();
        await a.fetch(v, i, c.action || f, {
          preventScrollReset: c.preventScrollReset,
          formData: h,
          body: p,
          formMethod: c.method || d,
          formEncType: c.encType || m,
          flushSync: c.flushSync,
        });
      } else
        await a.navigate(c.action || f, {
          preventScrollReset: c.preventScrollReset,
          formData: h,
          body: p,
          formMethod: c.method || d,
          formEncType: c.encType || m,
          replace: c.replace,
          state: c.state,
          fromRouteId: i,
          flushSync: c.flushSync,
          viewTransition: c.viewTransition,
        });
    },
    [a, l, i]
  );
}
function iS(a, { relative: l } = {}) {
  let { basename: i } = w.useContext(Mn),
    r = w.useContext(zn);
  $e(r, "useFormAction must be used inside a RouteContext");
  let [c] = r.matches.slice(-1),
    f = { ...gr(a || ".", { relative: l }) },
    d = ct();
  if (a == null) {
    f.search = d.search;
    let m = new URLSearchParams(f.search),
      h = m.getAll("index");
    if (h.some((v) => v === "")) {
      m.delete("index"),
        h.filter((x) => x).forEach((x) => m.append("index", x));
      let v = m.toString();
      f.search = v ? `?${v}` : "";
    }
  }
  return (
    (!a || a === ".") &&
      c.route.index &&
      (f.search = f.search ? f.search.replace(/^\?/, "?index&") : "?index"),
    i !== "/" && (f.pathname = f.pathname === "/" ? i : Sa([i, f.pathname])),
    cr(f)
  );
}
function rS(a, l = {}) {
  let i = w.useContext(Yp);
  $e(
    i != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: r } = Ip("useViewTransitionState"),
    c = gr(a, { relative: l.relative });
  if (!i.isTransitioning) return !1;
  let f = sl(i.currentLocation.pathname, r) || i.currentLocation.pathname,
    d = sl(i.nextLocation.pathname, r) || i.nextLocation.pathname;
  return Xu(c.pathname, d) != null || Xu(c.pathname, f) != null;
}
new TextEncoder();
const Ln = () => {
    w.useEffect(() => {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 200);
    }, []);
  },
  uS = () => (
    Ln(),
    g.jsx("div", {
      className: "w-full flex flex-col items-center gap-y-5",
      children: g.jsxs("div", {
        className: "w-full flex flex-col items-start gap-y-3",
        children: [
          g.jsx("span", {
            className: "txt__04 text-[whitesmoke]",
            children: "Order Comfortably From Home",
          }),
          g.jsx("span", {
            className: "txt__04 text-[whitesmoke]",
            children: "Or Manage Your Business From Anywhere",
          }),
        ],
      }),
    })
  );
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const cS = (a) => a.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
  eg = (...a) =>
    a
      .filter((l, i, r) => !!l && l.trim() !== "" && r.indexOf(l) === i)
      .join(" ")
      .trim();
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var oS = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const fS = w.forwardRef(
  (
    {
      color: a = "currentColor",
      size: l = 24,
      strokeWidth: i = 2,
      absoluteStrokeWidth: r,
      className: c = "",
      children: f,
      iconNode: d,
      ...m
    },
    h
  ) =>
    w.createElement(
      "svg",
      {
        ref: h,
        ...oS,
        width: l,
        height: l,
        stroke: a,
        strokeWidth: r ? (Number(i) * 24) / Number(l) : i,
        className: eg("lucide", c),
        ...m,
      },
      [
        ...d.map(([p, v]) => w.createElement(p, v)),
        ...(Array.isArray(f) ? f : [f]),
      ]
    )
);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const qe = (a, l) => {
  const i = w.forwardRef(({ className: r, ...c }, f) =>
    w.createElement(fS, {
      ref: f,
      iconNode: l,
      className: eg(`lucide-${cS(a)}`, r),
      ...c,
    })
  );
  return (i.displayName = `${a}`), i;
};
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const dS = [
    [
      "path",
      {
        d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
        key: "3c2336",
      },
    ],
    ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
    ["line", { x1: "12", x2: "12.01", y1: "17", y2: "17", key: "io3f8k" }],
  ],
  hS = qe("BadgeHelp", dS);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const mS = [
    ["circle", { cx: "12.5", cy: "8.5", r: "2.5", key: "9738u8" }],
    [
      "path",
      {
        d: "M12.5 2a6.5 6.5 0 0 0-6.22 4.6c-1.1 3.13-.78 3.9-3.18 6.08A3 3 0 0 0 5 18c4 0 8.4-1.8 11.4-4.3A6.5 6.5 0 0 0 12.5 2Z",
        key: "o0f6za",
      },
    ],
    [
      "path",
      {
        d: "m18.5 6 2.19 4.5a6.48 6.48 0 0 1 .31 2 6.49 6.49 0 0 1-2.6 5.2C15.4 20.2 11 22 7 22a3 3 0 0 1-2.68-1.66L2.4 16.5",
        key: "k7p6i0",
      },
    ],
  ],
  yS = qe("Beef", mS);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const pS = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]],
  gS = qe("ChevronLeft", pS);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const vS = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]],
  bS = qe("ChevronRight", vS);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const xS = [
    ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
    ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }],
  ],
  ic = qe("CircleCheckBig", xS);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const SS = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }],
  ],
  ES = qe("CircleCheck", SS);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const wS = [
    ["path", { d: "M18 20a6 6 0 0 0-12 0", key: "1qehca" }],
    ["circle", { cx: "12", cy: "10", r: "4", key: "1h16sb" }],
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ],
  _S = qe("CircleUserRound", wS);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const RS = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }],
    [
      "path",
      { d: "M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662", key: "154egf" },
    ],
  ],
  Z0 = qe("CircleUser", RS);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const AS = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
    ["path", { d: "m9 9 6 6", key: "z0biqf" }],
  ],
  Nd = qe("CircleX", AS);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const TS = [
    [
      "path",
      {
        d: "M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5",
        key: "laymnq",
      },
    ],
    ["path", { d: "M8.5 8.5v.01", key: "ue8clq" }],
    ["path", { d: "M16 15.5v.01", key: "14dtrp" }],
    ["path", { d: "M12 12v.01", key: "u5ubse" }],
    ["path", { d: "M11 17v.01", key: "1hyl5a" }],
    ["path", { d: "M7 14v.01", key: "uct60s" }],
  ],
  CS = qe("Cookie", TS);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const NS = [
    [
      "path",
      {
        d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
        key: "ct8e1f",
      },
    ],
    ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
    [
      "path",
      {
        d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
        key: "13bj9a",
      },
    ],
    ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ],
  OS = qe("EyeOff", NS);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const jS = [
    [
      "path",
      {
        d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
        key: "1nclc0",
      },
    ],
    ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }],
  ],
  DS = qe("Eye", jS);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const US = [
    [
      "path",
      {
        d: "M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z",
        key: "15baut",
      },
    ],
    ["path", { d: "M18 12v.5", key: "18hhni" }],
    ["path", { d: "M16 17.93a9.77 9.77 0 0 1 0-11.86", key: "16dt7o" }],
    [
      "path",
      {
        d: "M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33",
        key: "l9di03",
      },
    ],
    [
      "path",
      {
        d: "M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4",
        key: "1kjonw",
      },
    ],
    [
      "path",
      {
        d: "m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98",
        key: "1zlm23",
      },
    ],
  ],
  MS = qe("Fish", US);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const zS = [
    [
      "path",
      {
        d: "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",
        key: "tonef",
      },
    ],
    ["path", { d: "M9 18c-4.51 2-5-2-7-2", key: "9comsn" }],
  ],
  LS = qe("Github", zS);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const HS = [
    [
      "path",
      { d: "M13.144 21.144A7.274 10.445 45 1 0 2.856 10.856", key: "1k1t7q" },
    ],
    [
      "path",
      {
        d: "M13.144 21.144A7.274 4.365 45 0 0 2.856 10.856a7.274 4.365 45 0 0 10.288 10.288",
        key: "153t1g",
      },
    ],
    [
      "path",
      {
        d: "M16.565 10.435 18.6 8.4a2.501 2.501 0 1 0 1.65-4.65 2.5 2.5 0 1 0-4.66 1.66l-2.024 2.025",
        key: "gzrt0n",
      },
    ],
    ["path", { d: "m8.5 16.5-1-1", key: "otr954" }],
  ],
  BS = qe("Ham", HS);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const qS = [
    ["path", { d: "M10 22v-6.57", key: "1wmca3" }],
    ["path", { d: "M12 11h.01", key: "z322tv" }],
    ["path", { d: "M12 7h.01", key: "1ivr5q" }],
    ["path", { d: "M14 15.43V22", key: "1q2vjd" }],
    ["path", { d: "M15 16a5 5 0 0 0-6 0", key: "o9wqvi" }],
    ["path", { d: "M16 11h.01", key: "xkw8gn" }],
    ["path", { d: "M16 7h.01", key: "1kdx03" }],
    ["path", { d: "M8 11h.01", key: "1dfujw" }],
    ["path", { d: "M8 7h.01", key: "1vti4s" }],
    [
      "rect",
      { x: "4", y: "2", width: "16", height: "20", rx: "2", key: "1uxh74" },
    ],
  ],
  kS = qe("Hotel", qS);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const VS = [
    [
      "path",
      { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" },
    ],
    [
      "path",
      {
        d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
        key: "1d0kgt",
      },
    ],
  ],
  FS = qe("House", VS);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const QS = [
    ["path", { d: "m7 11 4.08 10.35a1 1 0 0 0 1.84 0L17 11", key: "1v6356" }],
    ["path", { d: "M17 7A5 5 0 0 0 7 7", key: "151p3v" }],
    ["path", { d: "M17 7a2 2 0 0 1 0 4H7a2 2 0 0 1 0-4", key: "1sdaij" }],
  ],
  GS = qe("IceCreamCone", QS);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const YS = [
    [
      "path",
      {
        d: "M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",
        key: "1s6t7t",
      },
    ],
    [
      "circle",
      { cx: "16.5", cy: "7.5", r: ".5", fill: "currentColor", key: "w0ekpg" },
    ],
  ],
  tg = qe("KeyRound", YS);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const XS = [
    ["path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4", key: "u53s6r" }],
    ["polyline", { points: "10 17 15 12 10 7", key: "1ail0h" }],
    ["line", { x1: "15", x2: "3", y1: "12", y2: "12", key: "v6grx8" }],
  ],
  ng = qe("LogIn", XS);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const PS = [
    ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }],
    ["polyline", { points: "16 17 21 12 16 7", key: "1gabdz" }],
    ["line", { x1: "21", x2: "9", y1: "12", y2: "12", key: "1uyos4" }],
  ],
  ag = qe("LogOut", PS);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const ZS = [
    [
      "rect",
      { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" },
    ],
    ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7", key: "1ocrg3" }],
  ],
  KS = qe("Mail", ZS);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const $S = [
    ["line", { x1: "4", x2: "20", y1: "12", y2: "12", key: "1e0a9i" }],
    ["line", { x1: "4", x2: "20", y1: "6", y2: "6", key: "1owob3" }],
    ["line", { x1: "4", x2: "20", y1: "18", y2: "18", key: "yk5zj1" }],
  ],
  JS = qe("Menu", $S);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const WS = [
    ["path", { d: "m12 14-1 1", key: "11onhr" }],
    ["path", { d: "m13.75 18.25-1.25 1.42", key: "1yisr3" }],
    [
      "path",
      { d: "M17.775 5.654a15.68 15.68 0 0 0-12.121 12.12", key: "1qtqk6" },
    ],
    ["path", { d: "M18.8 9.3a1 1 0 0 0 2.1 7.7", key: "fbbbr2" }],
    [
      "path",
      {
        d: "M21.964 20.732a1 1 0 0 1-1.232 1.232l-18-5a1 1 0 0 1-.695-1.232A19.68 19.68 0 0 1 15.732 2.037a1 1 0 0 1 1.232.695z",
        key: "1hyfdd",
      },
    ],
  ],
  IS = qe("Pizza", WS);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const eE = [
    [
      "path",
      {
        d: "M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z",
        key: "icamh8",
      },
    ],
    ["path", { d: "m14.5 12.5 2-2", key: "inckbg" }],
    ["path", { d: "m11.5 9.5 2-2", key: "fmmyf7" }],
    ["path", { d: "m8.5 6.5 2-2", key: "vc6u1g" }],
    ["path", { d: "m17.5 15.5 2-2", key: "wo5hmg" }],
  ],
  tE = qe("Ruler", eE);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const nE = [
    [
      "path",
      {
        d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
        key: "oel41y",
      },
    ],
    ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }],
  ],
  lg = qe("ShieldCheck", nE);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const aE = [
    ["path", { d: "M3 6h18", key: "d0wm0j" }],
    ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
    ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
    ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
    ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }],
  ],
  lE = qe("Trash2", aE);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const sE = [
    ["path", { d: "M11.5 15H7a4 4 0 0 0-4 4v2", key: "15lzij" }],
    [
      "path",
      {
        d: "M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",
        key: "1817ys",
      },
    ],
    ["circle", { cx: "10", cy: "7", r: "4", key: "e45bow" }],
  ],
  sg = qe("UserPen", sE);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const iE = [
    ["path", { d: "M2 21a8 8 0 0 1 10.821-7.487", key: "1c8h7z" }],
    [
      "path",
      {
        d: "M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",
        key: "1817ys",
      },
    ],
    ["circle", { cx: "10", cy: "8", r: "5", key: "o932ke" }],
  ],
  rE = qe("UserRoundPen", iE);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const uE = [
    ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
    ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }],
  ],
  ig = qe("User", uE);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const cE = [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }],
  ],
  rg = qe("X", cE),
  ug = w.createContext(null),
  cg = () => {
    const a = w.useContext(ug);
    if (!a) throw new Error("useGlobal must be used within a GlobalProvider");
    return a;
  },
  $t = () => cg().toastState,
  Vt = () => cg().userState,
  oE = () => {
    const a = w.useRef(null),
      [l, i] = w.useState(!1),
      r = w.useRef(null),
      { isToast: c, msg: f, type: d, closeToast: m } = $t();
    return (
      w.useEffect(() => {
        let h;
        return (
          c &&
            (i(!1),
            (h = setTimeout(() => {
              m();
            }, 5e3)),
            (a.current = h)),
          () => {
            clearTimeout(h), c && i(!0), a.current && (a.current = null);
          }
        );
      }, [m, c]),
      w.useEffect(() => {
        r.current &&
          (r.current.classList.remove("toast__container_after"),
          requestAnimationFrame(() => {
            var h;
            return (h = r.current) == null
              ? void 0
              : h.classList.add("toast__container_after");
          }));
      }, [c, m]),
      {
        isToast: c,
        toastRef: r,
        msg: f,
        type: d,
        closeToast: m,
        closeClicked: l,
        setCloseClicked: i,
      }
    );
  },
  fE = () => {
    const {
      isToast: a,
      msg: l,
      type: i,
      closeToast: r,
      closeClicked: c,
      setCloseClicked: f,
      toastRef: d,
    } = oE();
    return g.jsx("div", {
      id: "toast",
      className: `top-5 right-5 fixed toast__i bg-[#111] rounded-xl text-[whitesmoke] min-w-3/4 sm:min-w-1/2 max-w-3/4 h-fit min-h-[75px] flex border-t-2 border-r-2 transition-all duration-300  ${
        i === "SUCCESS" ? "border-green-600" : "border-red-600"
      } 
      ${
        a
          ? "toast__active_in"
          : !a && c
          ? "toast__active_out"
          : "translate-x-[120%] opacity-0"
      }
      `,
      children: g.jsxs("div", {
        ref: d,
        className: `w-full grid grid-cols-[75px_1fr] relative min-h-full rounded-xl border-l-[8px]  ${
          i === "SUCCESS" ? "border-green-600" : "border-red-600"
        }`,
        style: { "--toast-color": i === "SUCCESS" ? "#16a34a" : "#dc2626" },
        children: [
          g.jsx("div", {
            className: "w-full flex flex-col items-center justify-center",
            children:
              i === "SUCCESS"
                ? g.jsx(ES, {
                    className:
                      "h-[30px] w-[30px] sm:h-[35px] sm:w-[35px] text-green-600",
                  })
                : g.jsx(Nd, {
                    className:
                      "h-[30px] w-[30px] sm:h-[35px] sm:w-[35px] text-red-600",
                  }),
          }),
          g.jsx("div", {
            className: `absolute txt__03 top-3 left-[75px] ${
              i === "SUCCESS" ? "text-green-600" : "text-red-600"
            }`,
            children: i,
          }),
          g.jsx("div", {
            onClick: () => {
              f(!0), r();
            },
            className: "absolute right-5 top-3 ",
            children: g.jsx(rg, {
              className:
                "h-[30px] w-[30px] sm:w-[32px] sm:h-[32px] text-red-600 hover:scale-120 btn__pseudo",
            }),
          }),
          g.jsx("div", {
            className: "w-full flex justify-start pr-6 pb-6 pt-12",
            children: g.jsx("span", { className: "txt__03", children: l }),
          }),
        ],
      }),
    });
  };
var ei = class {
    constructor() {
      (this.listeners = new Set()),
        (this.subscribe = this.subscribe.bind(this));
    }
    subscribe(a) {
      return (
        this.listeners.add(a),
        this.onSubscribe(),
        () => {
          this.listeners.delete(a), this.onUnsubscribe();
        }
      );
    }
    hasListeners() {
      return this.listeners.size > 0;
    }
    onSubscribe() {}
    onUnsubscribe() {}
  },
  Xl = typeof window > "u" || "Deno" in globalThis;
function wn() {}
function dE(a, l) {
  return typeof a == "function" ? a(l) : a;
}
function Zf(a) {
  return typeof a == "number" && a >= 0 && a !== 1 / 0;
}
function og(a, l) {
  return Math.max(a + (l || 0) - Date.now(), 0);
}
function Ms(a, l) {
  return typeof a == "function" ? a(l) : a;
}
function Dn(a, l) {
  return typeof a == "function" ? a(l) : a;
}
function K0(a, l) {
  const {
    type: i = "all",
    exact: r,
    fetchStatus: c,
    predicate: f,
    queryKey: d,
    stale: m,
  } = a;
  if (d) {
    if (r) {
      if (l.queryHash !== Od(d, l.options)) return !1;
    } else if (!or(l.queryKey, d)) return !1;
  }
  if (i !== "all") {
    const h = l.isActive();
    if ((i === "active" && !h) || (i === "inactive" && h)) return !1;
  }
  return !(
    (typeof m == "boolean" && l.isStale() !== m) ||
    (c && c !== l.state.fetchStatus) ||
    (f && !f(l))
  );
}
function $0(a, l) {
  const { exact: i, status: r, predicate: c, mutationKey: f } = a;
  if (f) {
    if (!l.options.mutationKey) return !1;
    if (i) {
      if (Pl(l.options.mutationKey) !== Pl(f)) return !1;
    } else if (!or(l.options.mutationKey, f)) return !1;
  }
  return !((r && l.state.status !== r) || (c && !c(l)));
}
function Od(a, l) {
  return ((l == null ? void 0 : l.queryKeyHashFn) || Pl)(a);
}
function Pl(a) {
  return JSON.stringify(a, (l, i) =>
    Kf(i)
      ? Object.keys(i)
          .sort()
          .reduce((r, c) => ((r[c] = i[c]), r), {})
      : i
  );
}
function or(a, l) {
  return a === l
    ? !0
    : typeof a != typeof l
    ? !1
    : a && l && typeof a == "object" && typeof l == "object"
    ? !Object.keys(l).some((i) => !or(a[i], l[i]))
    : !1;
}
function fg(a, l) {
  if (a === l) return a;
  const i = J0(a) && J0(l);
  if (i || (Kf(a) && Kf(l))) {
    const r = i ? a : Object.keys(a),
      c = r.length,
      f = i ? l : Object.keys(l),
      d = f.length,
      m = i ? [] : {};
    let h = 0;
    for (let p = 0; p < d; p++) {
      const v = i ? p : f[p];
      ((!i && r.includes(v)) || i) && a[v] === void 0 && l[v] === void 0
        ? ((m[v] = void 0), h++)
        : ((m[v] = fg(a[v], l[v])), m[v] === a[v] && a[v] !== void 0 && h++);
    }
    return c === d && h === c ? a : m;
  }
  return l;
}
function Pu(a, l) {
  if (!l || Object.keys(a).length !== Object.keys(l).length) return !1;
  for (const i in a) if (a[i] !== l[i]) return !1;
  return !0;
}
function J0(a) {
  return Array.isArray(a) && a.length === Object.keys(a).length;
}
function Kf(a) {
  if (!W0(a)) return !1;
  const l = a.constructor;
  if (l === void 0) return !0;
  const i = l.prototype;
  return !(
    !W0(i) ||
    !i.hasOwnProperty("isPrototypeOf") ||
    Object.getPrototypeOf(a) !== Object.prototype
  );
}
function W0(a) {
  return Object.prototype.toString.call(a) === "[object Object]";
}
function hE(a) {
  return new Promise((l) => {
    setTimeout(l, a);
  });
}
function $f(a, l, i) {
  return typeof i.structuralSharing == "function"
    ? i.structuralSharing(a, l)
    : i.structuralSharing !== !1
    ? fg(a, l)
    : l;
}
function mE(a, l, i = 0) {
  const r = [...a, l];
  return i && r.length > i ? r.slice(1) : r;
}
function yE(a, l, i = 0) {
  const r = [l, ...a];
  return i && r.length > i ? r.slice(0, -1) : r;
}
var jd = Symbol();
function dg(a, l) {
  return !a.queryFn && l != null && l.initialPromise
    ? () => l.initialPromise
    : !a.queryFn || a.queryFn === jd
    ? () => Promise.reject(new Error(`Missing queryFn: '${a.queryHash}'`))
    : a.queryFn;
}
var Ll,
  $a,
  Hs,
  jp,
  pE =
    ((jp = class extends ei {
      constructor() {
        super();
        ye(this, Ll);
        ye(this, $a);
        ye(this, Hs);
        te(this, Hs, (l) => {
          if (!Xl && window.addEventListener) {
            const i = () => l();
            return (
              window.addEventListener("visibilitychange", i, !1),
              () => {
                window.removeEventListener("visibilitychange", i);
              }
            );
          }
        });
      }
      onSubscribe() {
        R(this, $a) || this.setEventListener(R(this, Hs));
      }
      onUnsubscribe() {
        var l;
        this.hasListeners() ||
          ((l = R(this, $a)) == null || l.call(this), te(this, $a, void 0));
      }
      setEventListener(l) {
        var i;
        te(this, Hs, l),
          (i = R(this, $a)) == null || i.call(this),
          te(
            this,
            $a,
            l((r) => {
              typeof r == "boolean" ? this.setFocused(r) : this.onFocus();
            })
          );
      }
      setFocused(l) {
        R(this, Ll) !== l && (te(this, Ll, l), this.onFocus());
      }
      onFocus() {
        const l = this.isFocused();
        this.listeners.forEach((i) => {
          i(l);
        });
      }
      isFocused() {
        var l;
        return typeof R(this, Ll) == "boolean"
          ? R(this, Ll)
          : ((l = globalThis.document) == null ? void 0 : l.visibilityState) !==
              "hidden";
      }
    }),
    (Ll = new WeakMap()),
    ($a = new WeakMap()),
    (Hs = new WeakMap()),
    jp),
  Dd = new pE(),
  Bs,
  Ja,
  qs,
  Dp,
  gE =
    ((Dp = class extends ei {
      constructor() {
        super();
        ye(this, Bs, !0);
        ye(this, Ja);
        ye(this, qs);
        te(this, qs, (l) => {
          if (!Xl && window.addEventListener) {
            const i = () => l(!0),
              r = () => l(!1);
            return (
              window.addEventListener("online", i, !1),
              window.addEventListener("offline", r, !1),
              () => {
                window.removeEventListener("online", i),
                  window.removeEventListener("offline", r);
              }
            );
          }
        });
      }
      onSubscribe() {
        R(this, Ja) || this.setEventListener(R(this, qs));
      }
      onUnsubscribe() {
        var l;
        this.hasListeners() ||
          ((l = R(this, Ja)) == null || l.call(this), te(this, Ja, void 0));
      }
      setEventListener(l) {
        var i;
        te(this, qs, l),
          (i = R(this, Ja)) == null || i.call(this),
          te(this, Ja, l(this.setOnline.bind(this)));
      }
      setOnline(l) {
        R(this, Bs) !== l &&
          (te(this, Bs, l),
          this.listeners.forEach((r) => {
            r(l);
          }));
      }
      isOnline() {
        return R(this, Bs);
      }
    }),
    (Bs = new WeakMap()),
    (Ja = new WeakMap()),
    (qs = new WeakMap()),
    Dp),
  Zu = new gE();
function Jf() {
  let a, l;
  const i = new Promise((c, f) => {
    (a = c), (l = f);
  });
  (i.status = "pending"), i.catch(() => {});
  function r(c) {
    Object.assign(i, c), delete i.resolve, delete i.reject;
  }
  return (
    (i.resolve = (c) => {
      r({ status: "fulfilled", value: c }), a(c);
    }),
    (i.reject = (c) => {
      r({ status: "rejected", reason: c }), l(c);
    }),
    i
  );
}
function vE(a) {
  return Math.min(1e3 * 2 ** a, 3e4);
}
function hg(a) {
  return (a ?? "online") === "online" ? Zu.isOnline() : !0;
}
var mg = class extends Error {
  constructor(a) {
    super("CancelledError"),
      (this.revert = a == null ? void 0 : a.revert),
      (this.silent = a == null ? void 0 : a.silent);
  }
};
function zf(a) {
  return a instanceof mg;
}
function yg(a) {
  let l = !1,
    i = 0,
    r = !1,
    c;
  const f = Jf(),
    d = (D) => {
      var C;
      r || (E(new mg(D)), (C = a.abort) == null || C.call(a));
    },
    m = () => {
      l = !0;
    },
    h = () => {
      l = !1;
    },
    p = () =>
      Dd.isFocused() &&
      (a.networkMode === "always" || Zu.isOnline()) &&
      a.canRun(),
    v = () => hg(a.networkMode) && a.canRun(),
    x = (D) => {
      var C;
      r ||
        ((r = !0),
        (C = a.onSuccess) == null || C.call(a, D),
        c == null || c(),
        f.resolve(D));
    },
    E = (D) => {
      var C;
      r ||
        ((r = !0),
        (C = a.onError) == null || C.call(a, D),
        c == null || c(),
        f.reject(D));
    },
    O = () =>
      new Promise((D) => {
        var C;
        (c = (H) => {
          (r || p()) && D(H);
        }),
          (C = a.onPause) == null || C.call(a);
      }).then(() => {
        var D;
        (c = void 0), r || (D = a.onContinue) == null || D.call(a);
      }),
    _ = () => {
      if (r) return;
      let D;
      const C = i === 0 ? a.initialPromise : void 0;
      try {
        D = C ?? a.fn();
      } catch (H) {
        D = Promise.reject(H);
      }
      Promise.resolve(D)
        .then(x)
        .catch((H) => {
          var ee;
          if (r) return;
          const B = a.retry ?? (Xl ? 0 : 3),
            k = a.retryDelay ?? vE,
            ne = typeof k == "function" ? k(i, H) : k,
            Y =
              B === !0 ||
              (typeof B == "number" && i < B) ||
              (typeof B == "function" && B(i, H));
          if (l || !Y) {
            E(H);
            return;
          }
          i++,
            (ee = a.onFail) == null || ee.call(a, i, H),
            hE(ne)
              .then(() => (p() ? void 0 : O()))
              .then(() => {
                l ? E(H) : _();
              });
        });
    };
  return {
    promise: f,
    cancel: d,
    continue: () => (c == null || c(), f),
    cancelRetry: m,
    continueRetry: h,
    canStart: v,
    start: () => (v() ? _() : O().then(_), f),
  };
}
function bE() {
  let a = [],
    l = 0,
    i = (m) => {
      m();
    },
    r = (m) => {
      m();
    },
    c = (m) => setTimeout(m, 0);
  const f = (m) => {
      l
        ? a.push(m)
        : c(() => {
            i(m);
          });
    },
    d = () => {
      const m = a;
      (a = []),
        m.length &&
          c(() => {
            r(() => {
              m.forEach((h) => {
                i(h);
              });
            });
          });
    };
  return {
    batch: (m) => {
      let h;
      l++;
      try {
        h = m();
      } finally {
        l--, l || d();
      }
      return h;
    },
    batchCalls:
      (m) =>
      (...h) => {
        f(() => {
          m(...h);
        });
      },
    schedule: f,
    setNotifyFunction: (m) => {
      i = m;
    },
    setBatchNotifyFunction: (m) => {
      r = m;
    },
    setScheduler: (m) => {
      c = m;
    },
  };
}
var vt = bE(),
  Hl,
  Up,
  pg =
    ((Up = class {
      constructor() {
        ye(this, Hl);
      }
      destroy() {
        this.clearGcTimeout();
      }
      scheduleGc() {
        this.clearGcTimeout(),
          Zf(this.gcTime) &&
            te(
              this,
              Hl,
              setTimeout(() => {
                this.optionalRemove();
              }, this.gcTime)
            );
      }
      updateGcTime(a) {
        this.gcTime = Math.max(
          this.gcTime || 0,
          a ?? (Xl ? 1 / 0 : 5 * 60 * 1e3)
        );
      }
      clearGcTimeout() {
        R(this, Hl) && (clearTimeout(R(this, Hl)), te(this, Hl, void 0));
      }
    }),
    (Hl = new WeakMap()),
    Up),
  ks,
  Vs,
  En,
  Bl,
  Dt,
  dr,
  ql,
  On,
  va,
  Mp,
  xE =
    ((Mp = class extends pg {
      constructor(l) {
        super();
        ye(this, On);
        ye(this, ks);
        ye(this, Vs);
        ye(this, En);
        ye(this, Bl);
        ye(this, Dt);
        ye(this, dr);
        ye(this, ql);
        te(this, ql, !1),
          te(this, dr, l.defaultOptions),
          this.setOptions(l.options),
          (this.observers = []),
          te(this, Bl, l.client),
          te(this, En, R(this, Bl).getQueryCache()),
          (this.queryKey = l.queryKey),
          (this.queryHash = l.queryHash),
          te(this, ks, SE(this.options)),
          (this.state = l.state ?? R(this, ks)),
          this.scheduleGc();
      }
      get meta() {
        return this.options.meta;
      }
      get promise() {
        var l;
        return (l = R(this, Dt)) == null ? void 0 : l.promise;
      }
      setOptions(l) {
        (this.options = { ...R(this, dr), ...l }),
          this.updateGcTime(this.options.gcTime);
      }
      optionalRemove() {
        !this.observers.length &&
          this.state.fetchStatus === "idle" &&
          R(this, En).remove(this);
      }
      setData(l, i) {
        const r = $f(this.state.data, l, this.options);
        return (
          Re(this, On, va).call(this, {
            data: r,
            type: "success",
            dataUpdatedAt: i == null ? void 0 : i.updatedAt,
            manual: i == null ? void 0 : i.manual,
          }),
          r
        );
      }
      setState(l, i) {
        Re(this, On, va).call(this, {
          type: "setState",
          state: l,
          setStateOptions: i,
        });
      }
      cancel(l) {
        var r, c;
        const i = (r = R(this, Dt)) == null ? void 0 : r.promise;
        return (
          (c = R(this, Dt)) == null || c.cancel(l),
          i ? i.then(wn).catch(wn) : Promise.resolve()
        );
      }
      destroy() {
        super.destroy(), this.cancel({ silent: !0 });
      }
      reset() {
        this.destroy(), this.setState(R(this, ks));
      }
      isActive() {
        return this.observers.some((l) => Dn(l.options.enabled, this) !== !1);
      }
      isDisabled() {
        return this.getObserversCount() > 0
          ? !this.isActive()
          : this.options.queryFn === jd ||
              this.state.dataUpdateCount + this.state.errorUpdateCount === 0;
      }
      isStale() {
        return this.state.isInvalidated
          ? !0
          : this.getObserversCount() > 0
          ? this.observers.some((l) => l.getCurrentResult().isStale)
          : this.state.data === void 0;
      }
      isStaleByTime(l = 0) {
        return (
          this.state.isInvalidated ||
          this.state.data === void 0 ||
          !og(this.state.dataUpdatedAt, l)
        );
      }
      onFocus() {
        var i;
        const l = this.observers.find((r) => r.shouldFetchOnWindowFocus());
        l == null || l.refetch({ cancelRefetch: !1 }),
          (i = R(this, Dt)) == null || i.continue();
      }
      onOnline() {
        var i;
        const l = this.observers.find((r) => r.shouldFetchOnReconnect());
        l == null || l.refetch({ cancelRefetch: !1 }),
          (i = R(this, Dt)) == null || i.continue();
      }
      addObserver(l) {
        this.observers.includes(l) ||
          (this.observers.push(l),
          this.clearGcTimeout(),
          R(this, En).notify({
            type: "observerAdded",
            query: this,
            observer: l,
          }));
      }
      removeObserver(l) {
        this.observers.includes(l) &&
          ((this.observers = this.observers.filter((i) => i !== l)),
          this.observers.length ||
            (R(this, Dt) &&
              (R(this, ql)
                ? R(this, Dt).cancel({ revert: !0 })
                : R(this, Dt).cancelRetry()),
            this.scheduleGc()),
          R(this, En).notify({
            type: "observerRemoved",
            query: this,
            observer: l,
          }));
      }
      getObserversCount() {
        return this.observers.length;
      }
      invalidate() {
        this.state.isInvalidated ||
          Re(this, On, va).call(this, { type: "invalidate" });
      }
      fetch(l, i) {
        var h, p, v;
        if (this.state.fetchStatus !== "idle") {
          if (this.state.data !== void 0 && i != null && i.cancelRefetch)
            this.cancel({ silent: !0 });
          else if (R(this, Dt))
            return R(this, Dt).continueRetry(), R(this, Dt).promise;
        }
        if ((l && this.setOptions(l), !this.options.queryFn)) {
          const x = this.observers.find((E) => E.options.queryFn);
          x && this.setOptions(x.options);
        }
        const r = new AbortController(),
          c = (x) => {
            Object.defineProperty(x, "signal", {
              enumerable: !0,
              get: () => (te(this, ql, !0), r.signal),
            });
          },
          f = () => {
            const x = dg(this.options, i),
              E = {
                client: R(this, Bl),
                queryKey: this.queryKey,
                meta: this.meta,
              };
            return (
              c(E),
              te(this, ql, !1),
              this.options.persister ? this.options.persister(x, E, this) : x(E)
            );
          },
          d = {
            fetchOptions: i,
            options: this.options,
            queryKey: this.queryKey,
            client: R(this, Bl),
            state: this.state,
            fetchFn: f,
          };
        c(d),
          (h = this.options.behavior) == null || h.onFetch(d, this),
          te(this, Vs, this.state),
          (this.state.fetchStatus === "idle" ||
            this.state.fetchMeta !==
              ((p = d.fetchOptions) == null ? void 0 : p.meta)) &&
            Re(this, On, va).call(this, {
              type: "fetch",
              meta: (v = d.fetchOptions) == null ? void 0 : v.meta,
            });
        const m = (x) => {
          var E, O, _, D;
          (zf(x) && x.silent) ||
            Re(this, On, va).call(this, { type: "error", error: x }),
            zf(x) ||
              ((O = (E = R(this, En).config).onError) == null ||
                O.call(E, x, this),
              (D = (_ = R(this, En).config).onSettled) == null ||
                D.call(_, this.state.data, x, this)),
            this.scheduleGc();
        };
        return (
          te(
            this,
            Dt,
            yg({
              initialPromise: i == null ? void 0 : i.initialPromise,
              fn: d.fetchFn,
              abort: r.abort.bind(r),
              onSuccess: (x) => {
                var E, O, _, D;
                if (x === void 0) {
                  m(new Error(`${this.queryHash} data is undefined`));
                  return;
                }
                try {
                  this.setData(x);
                } catch (C) {
                  m(C);
                  return;
                }
                (O = (E = R(this, En).config).onSuccess) == null ||
                  O.call(E, x, this),
                  (D = (_ = R(this, En).config).onSettled) == null ||
                    D.call(_, x, this.state.error, this),
                  this.scheduleGc();
              },
              onError: m,
              onFail: (x, E) => {
                Re(this, On, va).call(this, {
                  type: "failed",
                  failureCount: x,
                  error: E,
                });
              },
              onPause: () => {
                Re(this, On, va).call(this, { type: "pause" });
              },
              onContinue: () => {
                Re(this, On, va).call(this, { type: "continue" });
              },
              retry: d.options.retry,
              retryDelay: d.options.retryDelay,
              networkMode: d.options.networkMode,
              canRun: () => !0,
            })
          ),
          R(this, Dt).start()
        );
      }
    }),
    (ks = new WeakMap()),
    (Vs = new WeakMap()),
    (En = new WeakMap()),
    (Bl = new WeakMap()),
    (Dt = new WeakMap()),
    (dr = new WeakMap()),
    (ql = new WeakMap()),
    (On = new WeakSet()),
    (va = function (l) {
      const i = (r) => {
        switch (l.type) {
          case "failed":
            return {
              ...r,
              fetchFailureCount: l.failureCount,
              fetchFailureReason: l.error,
            };
          case "pause":
            return { ...r, fetchStatus: "paused" };
          case "continue":
            return { ...r, fetchStatus: "fetching" };
          case "fetch":
            return {
              ...r,
              ...gg(r.data, this.options),
              fetchMeta: l.meta ?? null,
            };
          case "success":
            return {
              ...r,
              data: l.data,
              dataUpdateCount: r.dataUpdateCount + 1,
              dataUpdatedAt: l.dataUpdatedAt ?? Date.now(),
              error: null,
              isInvalidated: !1,
              status: "success",
              ...(!l.manual && {
                fetchStatus: "idle",
                fetchFailureCount: 0,
                fetchFailureReason: null,
              }),
            };
          case "error":
            const c = l.error;
            return zf(c) && c.revert && R(this, Vs)
              ? { ...R(this, Vs), fetchStatus: "idle" }
              : {
                  ...r,
                  error: c,
                  errorUpdateCount: r.errorUpdateCount + 1,
                  errorUpdatedAt: Date.now(),
                  fetchFailureCount: r.fetchFailureCount + 1,
                  fetchFailureReason: c,
                  fetchStatus: "idle",
                  status: "error",
                };
          case "invalidate":
            return { ...r, isInvalidated: !0 };
          case "setState":
            return { ...r, ...l.state };
        }
      };
      (this.state = i(this.state)),
        vt.batch(() => {
          this.observers.forEach((r) => {
            r.onQueryUpdate();
          }),
            R(this, En).notify({ query: this, type: "updated", action: l });
        });
    }),
    Mp);
function gg(a, l) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: hg(l.networkMode) ? "fetching" : "paused",
    ...(a === void 0 && { error: null, status: "pending" }),
  };
}
function SE(a) {
  const l =
      typeof a.initialData == "function" ? a.initialData() : a.initialData,
    i = l !== void 0,
    r = i
      ? typeof a.initialDataUpdatedAt == "function"
        ? a.initialDataUpdatedAt()
        : a.initialDataUpdatedAt
      : 0;
  return {
    data: l,
    dataUpdateCount: 0,
    dataUpdatedAt: i ? r ?? Date.now() : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: !1,
    status: i ? "success" : "pending",
    fetchStatus: "idle",
  };
}
var Xn,
  zp,
  EE =
    ((zp = class extends ei {
      constructor(l = {}) {
        super();
        ye(this, Xn);
        (this.config = l), te(this, Xn, new Map());
      }
      build(l, i, r) {
        const c = i.queryKey,
          f = i.queryHash ?? Od(c, i);
        let d = this.get(f);
        return (
          d ||
            ((d = new xE({
              client: l,
              queryKey: c,
              queryHash: f,
              options: l.defaultQueryOptions(i),
              state: r,
              defaultOptions: l.getQueryDefaults(c),
            })),
            this.add(d)),
          d
        );
      }
      add(l) {
        R(this, Xn).has(l.queryHash) ||
          (R(this, Xn).set(l.queryHash, l),
          this.notify({ type: "added", query: l }));
      }
      remove(l) {
        const i = R(this, Xn).get(l.queryHash);
        i &&
          (l.destroy(),
          i === l && R(this, Xn).delete(l.queryHash),
          this.notify({ type: "removed", query: l }));
      }
      clear() {
        vt.batch(() => {
          this.getAll().forEach((l) => {
            this.remove(l);
          });
        });
      }
      get(l) {
        return R(this, Xn).get(l);
      }
      getAll() {
        return [...R(this, Xn).values()];
      }
      find(l) {
        const i = { exact: !0, ...l };
        return this.getAll().find((r) => K0(i, r));
      }
      findAll(l = {}) {
        const i = this.getAll();
        return Object.keys(l).length > 0 ? i.filter((r) => K0(l, r)) : i;
      }
      notify(l) {
        vt.batch(() => {
          this.listeners.forEach((i) => {
            i(l);
          });
        });
      }
      onFocus() {
        vt.batch(() => {
          this.getAll().forEach((l) => {
            l.onFocus();
          });
        });
      }
      onOnline() {
        vt.batch(() => {
          this.getAll().forEach((l) => {
            l.onOnline();
          });
        });
      }
    }),
    (Xn = new WeakMap()),
    zp),
  Pn,
  Bt,
  kl,
  Zn,
  Za,
  Lp,
  wE =
    ((Lp = class extends pg {
      constructor(l) {
        super();
        ye(this, Zn);
        ye(this, Pn);
        ye(this, Bt);
        ye(this, kl);
        (this.mutationId = l.mutationId),
          te(this, Bt, l.mutationCache),
          te(this, Pn, []),
          (this.state = l.state || vg()),
          this.setOptions(l.options),
          this.scheduleGc();
      }
      setOptions(l) {
        (this.options = l), this.updateGcTime(this.options.gcTime);
      }
      get meta() {
        return this.options.meta;
      }
      addObserver(l) {
        R(this, Pn).includes(l) ||
          (R(this, Pn).push(l),
          this.clearGcTimeout(),
          R(this, Bt).notify({
            type: "observerAdded",
            mutation: this,
            observer: l,
          }));
      }
      removeObserver(l) {
        te(
          this,
          Pn,
          R(this, Pn).filter((i) => i !== l)
        ),
          this.scheduleGc(),
          R(this, Bt).notify({
            type: "observerRemoved",
            mutation: this,
            observer: l,
          });
      }
      optionalRemove() {
        R(this, Pn).length ||
          (this.state.status === "pending"
            ? this.scheduleGc()
            : R(this, Bt).remove(this));
      }
      continue() {
        var l;
        return (
          ((l = R(this, kl)) == null ? void 0 : l.continue()) ??
          this.execute(this.state.variables)
        );
      }
      async execute(l) {
        var c, f, d, m, h, p, v, x, E, O, _, D, C, H, B, k, ne, Y, ee, fe;
        te(
          this,
          kl,
          yg({
            fn: () =>
              this.options.mutationFn
                ? this.options.mutationFn(l)
                : Promise.reject(new Error("No mutationFn found")),
            onFail: (I, X) => {
              Re(this, Zn, Za).call(this, {
                type: "failed",
                failureCount: I,
                error: X,
              });
            },
            onPause: () => {
              Re(this, Zn, Za).call(this, { type: "pause" });
            },
            onContinue: () => {
              Re(this, Zn, Za).call(this, { type: "continue" });
            },
            retry: this.options.retry ?? 0,
            retryDelay: this.options.retryDelay,
            networkMode: this.options.networkMode,
            canRun: () => R(this, Bt).canRun(this),
          })
        );
        const i = this.state.status === "pending",
          r = !R(this, kl).canStart();
        try {
          if (!i) {
            Re(this, Zn, Za).call(this, {
              type: "pending",
              variables: l,
              isPaused: r,
            }),
              await ((f = (c = R(this, Bt).config).onMutate) == null
                ? void 0
                : f.call(c, l, this));
            const X = await ((m = (d = this.options).onMutate) == null
              ? void 0
              : m.call(d, l));
            X !== this.state.context &&
              Re(this, Zn, Za).call(this, {
                type: "pending",
                context: X,
                variables: l,
                isPaused: r,
              });
          }
          const I = await R(this, kl).start();
          return (
            await ((p = (h = R(this, Bt).config).onSuccess) == null
              ? void 0
              : p.call(h, I, l, this.state.context, this)),
            await ((x = (v = this.options).onSuccess) == null
              ? void 0
              : x.call(v, I, l, this.state.context)),
            await ((O = (E = R(this, Bt).config).onSettled) == null
              ? void 0
              : O.call(
                  E,
                  I,
                  null,
                  this.state.variables,
                  this.state.context,
                  this
                )),
            await ((D = (_ = this.options).onSettled) == null
              ? void 0
              : D.call(_, I, null, l, this.state.context)),
            Re(this, Zn, Za).call(this, { type: "success", data: I }),
            I
          );
        } catch (I) {
          try {
            throw (
              (await ((H = (C = R(this, Bt).config).onError) == null
                ? void 0
                : H.call(C, I, l, this.state.context, this)),
              await ((k = (B = this.options).onError) == null
                ? void 0
                : k.call(B, I, l, this.state.context)),
              await ((Y = (ne = R(this, Bt).config).onSettled) == null
                ? void 0
                : Y.call(
                    ne,
                    void 0,
                    I,
                    this.state.variables,
                    this.state.context,
                    this
                  )),
              await ((fe = (ee = this.options).onSettled) == null
                ? void 0
                : fe.call(ee, void 0, I, l, this.state.context)),
              I)
            );
          } finally {
            Re(this, Zn, Za).call(this, { type: "error", error: I });
          }
        } finally {
          R(this, Bt).runNext(this);
        }
      }
    }),
    (Pn = new WeakMap()),
    (Bt = new WeakMap()),
    (kl = new WeakMap()),
    (Zn = new WeakSet()),
    (Za = function (l) {
      const i = (r) => {
        switch (l.type) {
          case "failed":
            return {
              ...r,
              failureCount: l.failureCount,
              failureReason: l.error,
            };
          case "pause":
            return { ...r, isPaused: !0 };
          case "continue":
            return { ...r, isPaused: !1 };
          case "pending":
            return {
              ...r,
              context: l.context,
              data: void 0,
              failureCount: 0,
              failureReason: null,
              error: null,
              isPaused: l.isPaused,
              status: "pending",
              variables: l.variables,
              submittedAt: Date.now(),
            };
          case "success":
            return {
              ...r,
              data: l.data,
              failureCount: 0,
              failureReason: null,
              error: null,
              status: "success",
              isPaused: !1,
            };
          case "error":
            return {
              ...r,
              data: void 0,
              error: l.error,
              failureCount: r.failureCount + 1,
              failureReason: l.error,
              isPaused: !1,
              status: "error",
            };
        }
      };
      (this.state = i(this.state)),
        vt.batch(() => {
          R(this, Pn).forEach((r) => {
            r.onMutationUpdate(l);
          }),
            R(this, Bt).notify({ mutation: this, type: "updated", action: l });
        });
    }),
    Lp);
function vg() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: !1,
    status: "idle",
    variables: void 0,
    submittedAt: 0,
  };
}
var ba,
  jn,
  hr,
  Hp,
  _E =
    ((Hp = class extends ei {
      constructor(l = {}) {
        super();
        ye(this, ba);
        ye(this, jn);
        ye(this, hr);
        (this.config = l),
          te(this, ba, new Set()),
          te(this, jn, new Map()),
          te(this, hr, 0);
      }
      build(l, i, r) {
        const c = new wE({
          mutationCache: this,
          mutationId: ++zu(this, hr)._,
          options: l.defaultMutationOptions(i),
          state: r,
        });
        return this.add(c), c;
      }
      add(l) {
        R(this, ba).add(l);
        const i = Hu(l);
        if (typeof i == "string") {
          const r = R(this, jn).get(i);
          r ? r.push(l) : R(this, jn).set(i, [l]);
        }
        this.notify({ type: "added", mutation: l });
      }
      remove(l) {
        if (R(this, ba).delete(l)) {
          const i = Hu(l);
          if (typeof i == "string") {
            const r = R(this, jn).get(i);
            if (r)
              if (r.length > 1) {
                const c = r.indexOf(l);
                c !== -1 && r.splice(c, 1);
              } else r[0] === l && R(this, jn).delete(i);
          }
        }
        this.notify({ type: "removed", mutation: l });
      }
      canRun(l) {
        const i = Hu(l);
        if (typeof i == "string") {
          const r = R(this, jn).get(i),
            c =
              r == null ? void 0 : r.find((f) => f.state.status === "pending");
          return !c || c === l;
        } else return !0;
      }
      runNext(l) {
        var r;
        const i = Hu(l);
        if (typeof i == "string") {
          const c =
            (r = R(this, jn).get(i)) == null
              ? void 0
              : r.find((f) => f !== l && f.state.isPaused);
          return (c == null ? void 0 : c.continue()) ?? Promise.resolve();
        } else return Promise.resolve();
      }
      clear() {
        vt.batch(() => {
          R(this, ba).forEach((l) => {
            this.notify({ type: "removed", mutation: l });
          }),
            R(this, ba).clear(),
            R(this, jn).clear();
        });
      }
      getAll() {
        return Array.from(R(this, ba));
      }
      find(l) {
        const i = { exact: !0, ...l };
        return this.getAll().find((r) => $0(i, r));
      }
      findAll(l = {}) {
        return this.getAll().filter((i) => $0(l, i));
      }
      notify(l) {
        vt.batch(() => {
          this.listeners.forEach((i) => {
            i(l);
          });
        });
      }
      resumePausedMutations() {
        const l = this.getAll().filter((i) => i.state.isPaused);
        return vt.batch(() =>
          Promise.all(l.map((i) => i.continue().catch(wn)))
        );
      }
    }),
    (ba = new WeakMap()),
    (jn = new WeakMap()),
    (hr = new WeakMap()),
    Hp);
function Hu(a) {
  var l;
  return (l = a.options.scope) == null ? void 0 : l.id;
}
function I0(a) {
  return {
    onFetch: (l, i) => {
      var v, x, E, O, _;
      const r = l.options,
        c =
          (E =
            (x = (v = l.fetchOptions) == null ? void 0 : v.meta) == null
              ? void 0
              : x.fetchMore) == null
            ? void 0
            : E.direction,
        f = ((O = l.state.data) == null ? void 0 : O.pages) || [],
        d = ((_ = l.state.data) == null ? void 0 : _.pageParams) || [];
      let m = { pages: [], pageParams: [] },
        h = 0;
      const p = async () => {
        let D = !1;
        const C = (k) => {
            Object.defineProperty(k, "signal", {
              enumerable: !0,
              get: () => (
                l.signal.aborted
                  ? (D = !0)
                  : l.signal.addEventListener("abort", () => {
                      D = !0;
                    }),
                l.signal
              ),
            });
          },
          H = dg(l.options, l.fetchOptions),
          B = async (k, ne, Y) => {
            if (D) return Promise.reject();
            if (ne == null && k.pages.length) return Promise.resolve(k);
            const ee = {
              client: l.client,
              queryKey: l.queryKey,
              pageParam: ne,
              direction: Y ? "backward" : "forward",
              meta: l.options.meta,
            };
            C(ee);
            const fe = await H(ee),
              { maxPages: I } = l.options,
              X = Y ? yE : mE;
            return {
              pages: X(k.pages, fe, I),
              pageParams: X(k.pageParams, ne, I),
            };
          };
        if (c && f.length) {
          const k = c === "backward",
            ne = k ? RE : ep,
            Y = { pages: f, pageParams: d },
            ee = ne(r, Y);
          m = await B(Y, ee, k);
        } else {
          const k = a ?? f.length;
          do {
            const ne = h === 0 ? d[0] ?? r.initialPageParam : ep(r, m);
            if (h > 0 && ne == null) break;
            (m = await B(m, ne)), h++;
          } while (h < k);
        }
        return m;
      };
      l.options.persister
        ? (l.fetchFn = () => {
            var D, C;
            return (C = (D = l.options).persister) == null
              ? void 0
              : C.call(
                  D,
                  p,
                  {
                    client: l.client,
                    queryKey: l.queryKey,
                    meta: l.options.meta,
                    signal: l.signal,
                  },
                  i
                );
          })
        : (l.fetchFn = p);
    },
  };
}
function ep(a, { pages: l, pageParams: i }) {
  const r = l.length - 1;
  return l.length > 0 ? a.getNextPageParam(l[r], l, i[r], i) : void 0;
}
function RE(a, { pages: l, pageParams: i }) {
  var r;
  return l.length > 0
    ? (r = a.getPreviousPageParam) == null
      ? void 0
      : r.call(a, l[0], l, i[0], i)
    : void 0;
}
var at,
  Wa,
  Ia,
  Fs,
  Qs,
  el,
  Gs,
  Ys,
  Bp,
  AE =
    ((Bp = class {
      constructor(a = {}) {
        ye(this, at);
        ye(this, Wa);
        ye(this, Ia);
        ye(this, Fs);
        ye(this, Qs);
        ye(this, el);
        ye(this, Gs);
        ye(this, Ys);
        te(this, at, a.queryCache || new EE()),
          te(this, Wa, a.mutationCache || new _E()),
          te(this, Ia, a.defaultOptions || {}),
          te(this, Fs, new Map()),
          te(this, Qs, new Map()),
          te(this, el, 0);
      }
      mount() {
        zu(this, el)._++,
          R(this, el) === 1 &&
            (te(
              this,
              Gs,
              Dd.subscribe(async (a) => {
                a &&
                  (await this.resumePausedMutations(), R(this, at).onFocus());
              })
            ),
            te(
              this,
              Ys,
              Zu.subscribe(async (a) => {
                a &&
                  (await this.resumePausedMutations(), R(this, at).onOnline());
              })
            ));
      }
      unmount() {
        var a, l;
        zu(this, el)._--,
          R(this, el) === 0 &&
            ((a = R(this, Gs)) == null || a.call(this),
            te(this, Gs, void 0),
            (l = R(this, Ys)) == null || l.call(this),
            te(this, Ys, void 0));
      }
      isFetching(a) {
        return R(this, at).findAll({ ...a, fetchStatus: "fetching" }).length;
      }
      isMutating(a) {
        return R(this, Wa).findAll({ ...a, status: "pending" }).length;
      }
      getQueryData(a) {
        var i;
        const l = this.defaultQueryOptions({ queryKey: a });
        return (i = R(this, at).get(l.queryHash)) == null
          ? void 0
          : i.state.data;
      }
      ensureQueryData(a) {
        const l = this.defaultQueryOptions(a),
          i = R(this, at).build(this, l),
          r = i.state.data;
        return r === void 0
          ? this.fetchQuery(a)
          : (a.revalidateIfStale &&
              i.isStaleByTime(Ms(l.staleTime, i)) &&
              this.prefetchQuery(l),
            Promise.resolve(r));
      }
      getQueriesData(a) {
        return R(this, at)
          .findAll(a)
          .map(({ queryKey: l, state: i }) => {
            const r = i.data;
            return [l, r];
          });
      }
      setQueryData(a, l, i) {
        const r = this.defaultQueryOptions({ queryKey: a }),
          c = R(this, at).get(r.queryHash),
          f = c == null ? void 0 : c.state.data,
          d = dE(l, f);
        if (d !== void 0)
          return R(this, at)
            .build(this, r)
            .setData(d, { ...i, manual: !0 });
      }
      setQueriesData(a, l, i) {
        return vt.batch(() =>
          R(this, at)
            .findAll(a)
            .map(({ queryKey: r }) => [r, this.setQueryData(r, l, i)])
        );
      }
      getQueryState(a) {
        var i;
        const l = this.defaultQueryOptions({ queryKey: a });
        return (i = R(this, at).get(l.queryHash)) == null ? void 0 : i.state;
      }
      removeQueries(a) {
        const l = R(this, at);
        vt.batch(() => {
          l.findAll(a).forEach((i) => {
            l.remove(i);
          });
        });
      }
      resetQueries(a, l) {
        const i = R(this, at),
          r = { type: "active", ...a };
        return vt.batch(
          () => (
            i.findAll(a).forEach((c) => {
              c.reset();
            }),
            this.refetchQueries(r, l)
          )
        );
      }
      cancelQueries(a, l = {}) {
        const i = { revert: !0, ...l },
          r = vt.batch(() =>
            R(this, at)
              .findAll(a)
              .map((c) => c.cancel(i))
          );
        return Promise.all(r).then(wn).catch(wn);
      }
      invalidateQueries(a, l = {}) {
        return vt.batch(() => {
          if (
            (R(this, at)
              .findAll(a)
              .forEach((r) => {
                r.invalidate();
              }),
            (a == null ? void 0 : a.refetchType) === "none")
          )
            return Promise.resolve();
          const i = {
            ...a,
            type:
              (a == null ? void 0 : a.refetchType) ??
              (a == null ? void 0 : a.type) ??
              "active",
          };
          return this.refetchQueries(i, l);
        });
      }
      refetchQueries(a, l = {}) {
        const i = { ...l, cancelRefetch: l.cancelRefetch ?? !0 },
          r = vt.batch(() =>
            R(this, at)
              .findAll(a)
              .filter((c) => !c.isDisabled())
              .map((c) => {
                let f = c.fetch(void 0, i);
                return (
                  i.throwOnError || (f = f.catch(wn)),
                  c.state.fetchStatus === "paused" ? Promise.resolve() : f
                );
              })
          );
        return Promise.all(r).then(wn);
      }
      fetchQuery(a) {
        const l = this.defaultQueryOptions(a);
        l.retry === void 0 && (l.retry = !1);
        const i = R(this, at).build(this, l);
        return i.isStaleByTime(Ms(l.staleTime, i))
          ? i.fetch(l)
          : Promise.resolve(i.state.data);
      }
      prefetchQuery(a) {
        return this.fetchQuery(a).then(wn).catch(wn);
      }
      fetchInfiniteQuery(a) {
        return (a.behavior = I0(a.pages)), this.fetchQuery(a);
      }
      prefetchInfiniteQuery(a) {
        return this.fetchInfiniteQuery(a).then(wn).catch(wn);
      }
      ensureInfiniteQueryData(a) {
        return (a.behavior = I0(a.pages)), this.ensureQueryData(a);
      }
      resumePausedMutations() {
        return Zu.isOnline()
          ? R(this, Wa).resumePausedMutations()
          : Promise.resolve();
      }
      getQueryCache() {
        return R(this, at);
      }
      getMutationCache() {
        return R(this, Wa);
      }
      getDefaultOptions() {
        return R(this, Ia);
      }
      setDefaultOptions(a) {
        te(this, Ia, a);
      }
      setQueryDefaults(a, l) {
        R(this, Fs).set(Pl(a), { queryKey: a, defaultOptions: l });
      }
      getQueryDefaults(a) {
        const l = [...R(this, Fs).values()],
          i = {};
        return (
          l.forEach((r) => {
            or(a, r.queryKey) && Object.assign(i, r.defaultOptions);
          }),
          i
        );
      }
      setMutationDefaults(a, l) {
        R(this, Qs).set(Pl(a), { mutationKey: a, defaultOptions: l });
      }
      getMutationDefaults(a) {
        const l = [...R(this, Qs).values()];
        let i = {};
        return (
          l.forEach((r) => {
            or(a, r.mutationKey) && (i = { ...i, ...r.defaultOptions });
          }),
          i
        );
      }
      defaultQueryOptions(a) {
        if (a._defaulted) return a;
        const l = {
          ...R(this, Ia).queries,
          ...this.getQueryDefaults(a.queryKey),
          ...a,
          _defaulted: !0,
        };
        return (
          l.queryHash || (l.queryHash = Od(l.queryKey, l)),
          l.refetchOnReconnect === void 0 &&
            (l.refetchOnReconnect = l.networkMode !== "always"),
          l.throwOnError === void 0 && (l.throwOnError = !!l.suspense),
          !l.networkMode && l.persister && (l.networkMode = "offlineFirst"),
          l.queryFn === jd && (l.enabled = !1),
          l
        );
      }
      defaultMutationOptions(a) {
        return a != null && a._defaulted
          ? a
          : {
              ...R(this, Ia).mutations,
              ...((a == null ? void 0 : a.mutationKey) &&
                this.getMutationDefaults(a.mutationKey)),
              ...a,
              _defaulted: !0,
            };
      }
      clear() {
        R(this, at).clear(), R(this, Wa).clear();
      }
    }),
    (at = new WeakMap()),
    (Wa = new WeakMap()),
    (Ia = new WeakMap()),
    (Fs = new WeakMap()),
    (Qs = new WeakMap()),
    (el = new WeakMap()),
    (Gs = new WeakMap()),
    (Ys = new WeakMap()),
    Bp),
  Yt,
  De,
  mr,
  qt,
  Vl,
  Xs,
  tl,
  Kn,
  yr,
  Ps,
  Zs,
  Fl,
  Ql,
  nl,
  Ks,
  ke,
  rr,
  Wf,
  If,
  ed,
  td,
  nd,
  ad,
  ld,
  bg,
  qp,
  TE =
    ((qp = class extends ei {
      constructor(l, i) {
        super();
        ye(this, ke);
        ye(this, Yt);
        ye(this, De);
        ye(this, mr);
        ye(this, qt);
        ye(this, Vl);
        ye(this, Xs);
        ye(this, tl);
        ye(this, Kn);
        ye(this, yr);
        ye(this, Ps);
        ye(this, Zs);
        ye(this, Fl);
        ye(this, Ql);
        ye(this, nl);
        ye(this, Ks, new Set());
        (this.options = i),
          te(this, Yt, l),
          te(this, Kn, null),
          te(this, tl, Jf()),
          this.options.experimental_prefetchInRender ||
            R(this, tl).reject(
              new Error(
                "experimental_prefetchInRender feature flag is not enabled"
              )
            ),
          this.bindMethods(),
          this.setOptions(i);
      }
      bindMethods() {
        this.refetch = this.refetch.bind(this);
      }
      onSubscribe() {
        this.listeners.size === 1 &&
          (R(this, De).addObserver(this),
          tp(R(this, De), this.options)
            ? Re(this, ke, rr).call(this)
            : this.updateResult(),
          Re(this, ke, td).call(this));
      }
      onUnsubscribe() {
        this.hasListeners() || this.destroy();
      }
      shouldFetchOnReconnect() {
        return sd(R(this, De), this.options, this.options.refetchOnReconnect);
      }
      shouldFetchOnWindowFocus() {
        return sd(R(this, De), this.options, this.options.refetchOnWindowFocus);
      }
      destroy() {
        (this.listeners = new Set()),
          Re(this, ke, nd).call(this),
          Re(this, ke, ad).call(this),
          R(this, De).removeObserver(this);
      }
      setOptions(l, i) {
        const r = this.options,
          c = R(this, De);
        if (
          ((this.options = R(this, Yt).defaultQueryOptions(l)),
          this.options.enabled !== void 0 &&
            typeof this.options.enabled != "boolean" &&
            typeof this.options.enabled != "function" &&
            typeof Dn(this.options.enabled, R(this, De)) != "boolean")
        )
          throw new Error(
            "Expected enabled to be a boolean or a callback that returns a boolean"
          );
        Re(this, ke, ld).call(this),
          R(this, De).setOptions(this.options),
          r._defaulted &&
            !Pu(this.options, r) &&
            R(this, Yt)
              .getQueryCache()
              .notify({
                type: "observerOptionsUpdated",
                query: R(this, De),
                observer: this,
              });
        const f = this.hasListeners();
        f && np(R(this, De), c, this.options, r) && Re(this, ke, rr).call(this),
          this.updateResult(i),
          f &&
            (R(this, De) !== c ||
              Dn(this.options.enabled, R(this, De)) !==
                Dn(r.enabled, R(this, De)) ||
              Ms(this.options.staleTime, R(this, De)) !==
                Ms(r.staleTime, R(this, De))) &&
            Re(this, ke, Wf).call(this);
        const d = Re(this, ke, If).call(this);
        f &&
          (R(this, De) !== c ||
            Dn(this.options.enabled, R(this, De)) !==
              Dn(r.enabled, R(this, De)) ||
            d !== R(this, nl)) &&
          Re(this, ke, ed).call(this, d);
      }
      getOptimisticResult(l) {
        const i = R(this, Yt).getQueryCache().build(R(this, Yt), l),
          r = this.createResult(i, l);
        return (
          NE(this, r) &&
            (te(this, qt, r),
            te(this, Xs, this.options),
            te(this, Vl, R(this, De).state)),
          r
        );
      }
      getCurrentResult() {
        return R(this, qt);
      }
      trackResult(l, i) {
        const r = {};
        return (
          Object.keys(l).forEach((c) => {
            Object.defineProperty(r, c, {
              configurable: !1,
              enumerable: !0,
              get: () => (this.trackProp(c), i == null || i(c), l[c]),
            });
          }),
          r
        );
      }
      trackProp(l) {
        R(this, Ks).add(l);
      }
      getCurrentQuery() {
        return R(this, De);
      }
      refetch({ ...l } = {}) {
        return this.fetch({ ...l });
      }
      fetchOptimistic(l) {
        const i = R(this, Yt).defaultQueryOptions(l),
          r = R(this, Yt).getQueryCache().build(R(this, Yt), i);
        return r.fetch().then(() => this.createResult(r, i));
      }
      fetch(l) {
        return Re(this, ke, rr)
          .call(this, { ...l, cancelRefetch: l.cancelRefetch ?? !0 })
          .then(() => (this.updateResult(), R(this, qt)));
      }
      createResult(l, i) {
        var I;
        const r = R(this, De),
          c = this.options,
          f = R(this, qt),
          d = R(this, Vl),
          m = R(this, Xs),
          p = l !== r ? l.state : R(this, mr),
          { state: v } = l;
        let x = { ...v },
          E = !1,
          O;
        if (i._optimisticResults) {
          const X = this.hasListeners(),
            le = !X && tp(l, i),
            Ve = X && np(l, r, i, c);
          (le || Ve) && (x = { ...x, ...gg(v.data, l.options) }),
            i._optimisticResults === "isRestoring" && (x.fetchStatus = "idle");
        }
        let { error: _, errorUpdatedAt: D, status: C } = x;
        if (i.select && x.data !== void 0)
          if (
            f &&
            x.data === (d == null ? void 0 : d.data) &&
            i.select === R(this, yr)
          )
            O = R(this, Ps);
          else
            try {
              te(this, yr, i.select),
                (O = i.select(x.data)),
                (O = $f(f == null ? void 0 : f.data, O, i)),
                te(this, Ps, O),
                te(this, Kn, null);
            } catch (X) {
              te(this, Kn, X);
            }
        else O = x.data;
        if (i.placeholderData !== void 0 && O === void 0 && C === "pending") {
          let X;
          if (
            f != null &&
            f.isPlaceholderData &&
            i.placeholderData === (m == null ? void 0 : m.placeholderData)
          )
            X = f.data;
          else if (
            ((X =
              typeof i.placeholderData == "function"
                ? i.placeholderData(
                    (I = R(this, Zs)) == null ? void 0 : I.state.data,
                    R(this, Zs)
                  )
                : i.placeholderData),
            i.select && X !== void 0)
          )
            try {
              (X = i.select(X)), te(this, Kn, null);
            } catch (le) {
              te(this, Kn, le);
            }
          X !== void 0 &&
            ((C = "success"),
            (O = $f(f == null ? void 0 : f.data, X, i)),
            (E = !0));
        }
        R(this, Kn) &&
          ((_ = R(this, Kn)),
          (O = R(this, Ps)),
          (D = Date.now()),
          (C = "error"));
        const H = x.fetchStatus === "fetching",
          B = C === "pending",
          k = C === "error",
          ne = B && H,
          Y = O !== void 0,
          fe = {
            status: C,
            fetchStatus: x.fetchStatus,
            isPending: B,
            isSuccess: C === "success",
            isError: k,
            isInitialLoading: ne,
            isLoading: ne,
            data: O,
            dataUpdatedAt: x.dataUpdatedAt,
            error: _,
            errorUpdatedAt: D,
            failureCount: x.fetchFailureCount,
            failureReason: x.fetchFailureReason,
            errorUpdateCount: x.errorUpdateCount,
            isFetched: x.dataUpdateCount > 0 || x.errorUpdateCount > 0,
            isFetchedAfterMount:
              x.dataUpdateCount > p.dataUpdateCount ||
              x.errorUpdateCount > p.errorUpdateCount,
            isFetching: H,
            isRefetching: H && !B,
            isLoadingError: k && !Y,
            isPaused: x.fetchStatus === "paused",
            isPlaceholderData: E,
            isRefetchError: k && Y,
            isStale: Ud(l, i),
            refetch: this.refetch,
            promise: R(this, tl),
          };
        if (this.options.experimental_prefetchInRender) {
          const X = (de) => {
              fe.status === "error"
                ? de.reject(fe.error)
                : fe.data !== void 0 && de.resolve(fe.data);
            },
            le = () => {
              const de = te(this, tl, (fe.promise = Jf()));
              X(de);
            },
            Ve = R(this, tl);
          switch (Ve.status) {
            case "pending":
              l.queryHash === r.queryHash && X(Ve);
              break;
            case "fulfilled":
              (fe.status === "error" || fe.data !== Ve.value) && le();
              break;
            case "rejected":
              (fe.status !== "error" || fe.error !== Ve.reason) && le();
              break;
          }
        }
        return fe;
      }
      updateResult(l) {
        const i = R(this, qt),
          r = this.createResult(R(this, De), this.options);
        if (
          (te(this, Vl, R(this, De).state),
          te(this, Xs, this.options),
          R(this, Vl).data !== void 0 && te(this, Zs, R(this, De)),
          Pu(r, i))
        )
          return;
        te(this, qt, r);
        const c = {},
          f = () => {
            if (!i) return !0;
            const { notifyOnChangeProps: d } = this.options,
              m = typeof d == "function" ? d() : d;
            if (m === "all" || (!m && !R(this, Ks).size)) return !0;
            const h = new Set(m ?? R(this, Ks));
            return (
              this.options.throwOnError && h.add("error"),
              Object.keys(R(this, qt)).some((p) => {
                const v = p;
                return R(this, qt)[v] !== i[v] && h.has(v);
              })
            );
          };
        (l == null ? void 0 : l.listeners) !== !1 && f() && (c.listeners = !0),
          Re(this, ke, bg).call(this, { ...c, ...l });
      }
      onQueryUpdate() {
        this.updateResult(), this.hasListeners() && Re(this, ke, td).call(this);
      }
    }),
    (Yt = new WeakMap()),
    (De = new WeakMap()),
    (mr = new WeakMap()),
    (qt = new WeakMap()),
    (Vl = new WeakMap()),
    (Xs = new WeakMap()),
    (tl = new WeakMap()),
    (Kn = new WeakMap()),
    (yr = new WeakMap()),
    (Ps = new WeakMap()),
    (Zs = new WeakMap()),
    (Fl = new WeakMap()),
    (Ql = new WeakMap()),
    (nl = new WeakMap()),
    (Ks = new WeakMap()),
    (ke = new WeakSet()),
    (rr = function (l) {
      Re(this, ke, ld).call(this);
      let i = R(this, De).fetch(this.options, l);
      return (l != null && l.throwOnError) || (i = i.catch(wn)), i;
    }),
    (Wf = function () {
      Re(this, ke, nd).call(this);
      const l = Ms(this.options.staleTime, R(this, De));
      if (Xl || R(this, qt).isStale || !Zf(l)) return;
      const r = og(R(this, qt).dataUpdatedAt, l) + 1;
      te(
        this,
        Fl,
        setTimeout(() => {
          R(this, qt).isStale || this.updateResult();
        }, r)
      );
    }),
    (If = function () {
      return (
        (typeof this.options.refetchInterval == "function"
          ? this.options.refetchInterval(R(this, De))
          : this.options.refetchInterval) ?? !1
      );
    }),
    (ed = function (l) {
      Re(this, ke, ad).call(this),
        te(this, nl, l),
        !(
          Xl ||
          Dn(this.options.enabled, R(this, De)) === !1 ||
          !Zf(R(this, nl)) ||
          R(this, nl) === 0
        ) &&
          te(
            this,
            Ql,
            setInterval(() => {
              (this.options.refetchIntervalInBackground || Dd.isFocused()) &&
                Re(this, ke, rr).call(this);
            }, R(this, nl))
          );
    }),
    (td = function () {
      Re(this, ke, Wf).call(this),
        Re(this, ke, ed).call(this, Re(this, ke, If).call(this));
    }),
    (nd = function () {
      R(this, Fl) && (clearTimeout(R(this, Fl)), te(this, Fl, void 0));
    }),
    (ad = function () {
      R(this, Ql) && (clearInterval(R(this, Ql)), te(this, Ql, void 0));
    }),
    (ld = function () {
      const l = R(this, Yt).getQueryCache().build(R(this, Yt), this.options);
      if (l === R(this, De)) return;
      const i = R(this, De);
      te(this, De, l),
        te(this, mr, l.state),
        this.hasListeners() &&
          (i == null || i.removeObserver(this), l.addObserver(this));
    }),
    (bg = function (l) {
      vt.batch(() => {
        l.listeners &&
          this.listeners.forEach((i) => {
            i(R(this, qt));
          }),
          R(this, Yt)
            .getQueryCache()
            .notify({ query: R(this, De), type: "observerResultsUpdated" });
      });
    }),
    qp);
function CE(a, l) {
  return (
    Dn(l.enabled, a) !== !1 &&
    a.state.data === void 0 &&
    !(a.state.status === "error" && l.retryOnMount === !1)
  );
}
function tp(a, l) {
  return CE(a, l) || (a.state.data !== void 0 && sd(a, l, l.refetchOnMount));
}
function sd(a, l, i) {
  if (Dn(l.enabled, a) !== !1) {
    const r = typeof i == "function" ? i(a) : i;
    return r === "always" || (r !== !1 && Ud(a, l));
  }
  return !1;
}
function np(a, l, i, r) {
  return (
    (a !== l || Dn(r.enabled, a) === !1) &&
    (!i.suspense || a.state.status !== "error") &&
    Ud(a, i)
  );
}
function Ud(a, l) {
  return Dn(l.enabled, a) !== !1 && a.isStaleByTime(Ms(l.staleTime, a));
}
function NE(a, l) {
  return !Pu(a.getCurrentResult(), l);
}
var al,
  ll,
  Xt,
  xa,
  Ea,
  ku,
  id,
  kp,
  OE =
    ((kp = class extends ei {
      constructor(i, r) {
        super();
        ye(this, Ea);
        ye(this, al);
        ye(this, ll);
        ye(this, Xt);
        ye(this, xa);
        te(this, al, i),
          this.setOptions(r),
          this.bindMethods(),
          Re(this, Ea, ku).call(this);
      }
      bindMethods() {
        (this.mutate = this.mutate.bind(this)),
          (this.reset = this.reset.bind(this));
      }
      setOptions(i) {
        var c;
        const r = this.options;
        (this.options = R(this, al).defaultMutationOptions(i)),
          Pu(this.options, r) ||
            R(this, al)
              .getMutationCache()
              .notify({
                type: "observerOptionsUpdated",
                mutation: R(this, Xt),
                observer: this,
              }),
          r != null &&
          r.mutationKey &&
          this.options.mutationKey &&
          Pl(r.mutationKey) !== Pl(this.options.mutationKey)
            ? this.reset()
            : ((c = R(this, Xt)) == null ? void 0 : c.state.status) ===
                "pending" && R(this, Xt).setOptions(this.options);
      }
      onUnsubscribe() {
        var i;
        this.hasListeners() ||
          (i = R(this, Xt)) == null ||
          i.removeObserver(this);
      }
      onMutationUpdate(i) {
        Re(this, Ea, ku).call(this), Re(this, Ea, id).call(this, i);
      }
      getCurrentResult() {
        return R(this, ll);
      }
      reset() {
        var i;
        (i = R(this, Xt)) == null || i.removeObserver(this),
          te(this, Xt, void 0),
          Re(this, Ea, ku).call(this),
          Re(this, Ea, id).call(this);
      }
      mutate(i, r) {
        var c;
        return (
          te(this, xa, r),
          (c = R(this, Xt)) == null || c.removeObserver(this),
          te(
            this,
            Xt,
            R(this, al).getMutationCache().build(R(this, al), this.options)
          ),
          R(this, Xt).addObserver(this),
          R(this, Xt).execute(i)
        );
      }
    }),
    (al = new WeakMap()),
    (ll = new WeakMap()),
    (Xt = new WeakMap()),
    (xa = new WeakMap()),
    (Ea = new WeakSet()),
    (ku = function () {
      var r;
      const i = ((r = R(this, Xt)) == null ? void 0 : r.state) ?? vg();
      te(this, ll, {
        ...i,
        isPending: i.status === "pending",
        isSuccess: i.status === "success",
        isError: i.status === "error",
        isIdle: i.status === "idle",
        mutate: this.mutate,
        reset: this.reset,
      });
    }),
    (id = function (i) {
      vt.batch(() => {
        var r, c, f, d, m, h, p, v;
        if (R(this, xa) && this.hasListeners()) {
          const x = R(this, ll).variables,
            E = R(this, ll).context;
          (i == null ? void 0 : i.type) === "success"
            ? ((c = (r = R(this, xa)).onSuccess) == null ||
                c.call(r, i.data, x, E),
              (d = (f = R(this, xa)).onSettled) == null ||
                d.call(f, i.data, null, x, E))
            : (i == null ? void 0 : i.type) === "error" &&
              ((h = (m = R(this, xa)).onError) == null ||
                h.call(m, i.error, x, E),
              (v = (p = R(this, xa)).onSettled) == null ||
                v.call(p, void 0, i.error, x, E));
        }
        this.listeners.forEach((x) => {
          x(R(this, ll));
        });
      });
    }),
    kp),
  xg = w.createContext(void 0),
  Sg = (a) => {
    const l = w.useContext(xg);
    if (!l)
      throw new Error("No QueryClient set, use QueryClientProvider to set one");
    return l;
  },
  jE = ({ client: a, children: l }) => (
    w.useEffect(
      () => (
        a.mount(),
        () => {
          a.unmount();
        }
      ),
      [a]
    ),
    g.jsx(xg.Provider, { value: a, children: l })
  ),
  Eg = w.createContext(!1),
  DE = () => w.useContext(Eg);
Eg.Provider;
function UE() {
  let a = !1;
  return {
    clearReset: () => {
      a = !1;
    },
    reset: () => {
      a = !0;
    },
    isReset: () => a,
  };
}
var ME = w.createContext(UE()),
  zE = () => w.useContext(ME);
function wg(a, l) {
  return typeof a == "function" ? a(...l) : !!a;
}
function rd() {}
var LE = (a, l) => {
    (a.suspense || a.throwOnError || a.experimental_prefetchInRender) &&
      (l.isReset() || (a.retryOnMount = !1));
  },
  HE = (a) => {
    w.useEffect(() => {
      a.clearReset();
    }, [a]);
  },
  BE = ({
    result: a,
    errorResetBoundary: l,
    throwOnError: i,
    query: r,
    suspense: c,
  }) =>
    a.isError &&
    !l.isReset() &&
    !a.isFetching &&
    r &&
    ((c && a.data === void 0) || wg(i, [a.error, r])),
  qE = (a) => {
    const l = a.staleTime;
    a.suspense &&
      ((a.staleTime =
        typeof l == "function"
          ? (...i) => Math.max(l(...i), 1e3)
          : Math.max(l ?? 1e3, 1e3)),
      typeof a.gcTime == "number" && (a.gcTime = Math.max(a.gcTime, 1e3)));
  },
  kE = (a, l) => a.isLoading && a.isFetching && !l,
  VE = (a, l) => (a == null ? void 0 : a.suspense) && l.isPending,
  ap = (a, l, i) =>
    l.fetchOptimistic(a).catch(() => {
      i.clearReset();
    });
function FE(a, l, i) {
  var x, E, O, _, D;
  const r = Sg(),
    c = DE(),
    f = zE(),
    d = r.defaultQueryOptions(a);
  (E =
    (x = r.getDefaultOptions().queries) == null
      ? void 0
      : x._experimental_beforeQuery) == null || E.call(x, d),
    (d._optimisticResults = c ? "isRestoring" : "optimistic"),
    qE(d),
    LE(d, f),
    HE(f);
  const m = !r.getQueryCache().get(d.queryHash),
    [h] = w.useState(() => new l(r, d)),
    p = h.getOptimisticResult(d),
    v = !c && a.subscribed !== !1;
  if (
    (w.useSyncExternalStore(
      w.useCallback(
        (C) => {
          const H = v ? h.subscribe(vt.batchCalls(C)) : rd;
          return h.updateResult(), H;
        },
        [h, v]
      ),
      () => h.getCurrentResult(),
      () => h.getCurrentResult()
    ),
    w.useEffect(() => {
      h.setOptions(d, { listeners: !1 });
    }, [d, h]),
    VE(d, p))
  )
    throw ap(d, h, f);
  if (
    BE({
      result: p,
      errorResetBoundary: f,
      throwOnError: d.throwOnError,
      query: r.getQueryCache().get(d.queryHash),
      suspense: d.suspense,
    })
  )
    throw p.error;
  if (
    ((_ =
      (O = r.getDefaultOptions().queries) == null
        ? void 0
        : O._experimental_afterQuery) == null || _.call(O, d, p),
    d.experimental_prefetchInRender && !Xl && kE(p, c))
  ) {
    const C = m
      ? ap(d, h, f)
      : (D = r.getQueryCache().get(d.queryHash)) == null
      ? void 0
      : D.promise;
    C == null ||
      C.catch(rd).finally(() => {
        h.updateResult();
      });
  }
  return d.notifyOnChangeProps ? p : h.trackResult(p);
}
function Md(a, l) {
  return FE(a, TE);
}
function Mt(a, l) {
  const i = Sg(),
    [r] = w.useState(() => new OE(i, a));
  w.useEffect(() => {
    r.setOptions(a);
  }, [r, a]);
  const c = w.useSyncExternalStore(
      w.useCallback((d) => r.subscribe(vt.batchCalls(d)), [r]),
      () => r.getCurrentResult(),
      () => r.getCurrentResult()
    ),
    f = w.useCallback(
      (d, m) => {
        r.mutate(d, m).catch(rd);
      },
      [r]
    );
  if (c.error && wg(r.options.throwOnError, [c.error])) throw c.error;
  return { ...c, mutate: f, mutateAsync: c.mutate };
}
function _g(a, l) {
  return function () {
    return a.apply(l, arguments);
  };
}
const { toString: QE } = Object.prototype,
  { getPrototypeOf: zd } = Object,
  rc = ((a) => (l) => {
    const i = QE.call(l);
    return a[i] || (a[i] = i.slice(8, -1).toLowerCase());
  })(Object.create(null)),
  Hn = (a) => ((a = a.toLowerCase()), (l) => rc(l) === a),
  uc = (a) => (l) => typeof l === a,
  { isArray: ti } = Array,
  fr = uc("undefined");
function GE(a) {
  return (
    a !== null &&
    !fr(a) &&
    a.constructor !== null &&
    !fr(a.constructor) &&
    rn(a.constructor.isBuffer) &&
    a.constructor.isBuffer(a)
  );
}
const Rg = Hn("ArrayBuffer");
function YE(a) {
  let l;
  return (
    typeof ArrayBuffer < "u" && ArrayBuffer.isView
      ? (l = ArrayBuffer.isView(a))
      : (l = a && a.buffer && Rg(a.buffer)),
    l
  );
}
const XE = uc("string"),
  rn = uc("function"),
  Ag = uc("number"),
  cc = (a) => a !== null && typeof a == "object",
  PE = (a) => a === !0 || a === !1,
  Vu = (a) => {
    if (rc(a) !== "object") return !1;
    const l = zd(a);
    return (
      (l === null ||
        l === Object.prototype ||
        Object.getPrototypeOf(l) === null) &&
      !(Symbol.toStringTag in a) &&
      !(Symbol.iterator in a)
    );
  },
  ZE = Hn("Date"),
  KE = Hn("File"),
  $E = Hn("Blob"),
  JE = Hn("FileList"),
  WE = (a) => cc(a) && rn(a.pipe),
  IE = (a) => {
    let l;
    return (
      a &&
      ((typeof FormData == "function" && a instanceof FormData) ||
        (rn(a.append) &&
          ((l = rc(a)) === "formdata" ||
            (l === "object" &&
              rn(a.toString) &&
              a.toString() === "[object FormData]"))))
    );
  },
  e2 = Hn("URLSearchParams"),
  [t2, n2, a2, l2] = ["ReadableStream", "Request", "Response", "Headers"].map(
    Hn
  ),
  s2 = (a) =>
    a.trim ? a.trim() : a.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function vr(a, l, { allOwnKeys: i = !1 } = {}) {
  if (a === null || typeof a > "u") return;
  let r, c;
  if ((typeof a != "object" && (a = [a]), ti(a)))
    for (r = 0, c = a.length; r < c; r++) l.call(null, a[r], r, a);
  else {
    const f = i ? Object.getOwnPropertyNames(a) : Object.keys(a),
      d = f.length;
    let m;
    for (r = 0; r < d; r++) (m = f[r]), l.call(null, a[m], m, a);
  }
}
function Tg(a, l) {
  l = l.toLowerCase();
  const i = Object.keys(a);
  let r = i.length,
    c;
  for (; r-- > 0; ) if (((c = i[r]), l === c.toLowerCase())) return c;
  return null;
}
const Ml =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : global,
  Cg = (a) => !fr(a) && a !== Ml;
function ud() {
  const { caseless: a } = (Cg(this) && this) || {},
    l = {},
    i = (r, c) => {
      const f = (a && Tg(l, c)) || c;
      Vu(l[f]) && Vu(r)
        ? (l[f] = ud(l[f], r))
        : Vu(r)
        ? (l[f] = ud({}, r))
        : ti(r)
        ? (l[f] = r.slice())
        : (l[f] = r);
    };
  for (let r = 0, c = arguments.length; r < c; r++)
    arguments[r] && vr(arguments[r], i);
  return l;
}
const i2 = (a, l, i, { allOwnKeys: r } = {}) => (
    vr(
      l,
      (c, f) => {
        i && rn(c) ? (a[f] = _g(c, i)) : (a[f] = c);
      },
      { allOwnKeys: r }
    ),
    a
  ),
  r2 = (a) => (a.charCodeAt(0) === 65279 && (a = a.slice(1)), a),
  u2 = (a, l, i, r) => {
    (a.prototype = Object.create(l.prototype, r)),
      (a.prototype.constructor = a),
      Object.defineProperty(a, "super", { value: l.prototype }),
      i && Object.assign(a.prototype, i);
  },
  c2 = (a, l, i, r) => {
    let c, f, d;
    const m = {};
    if (((l = l || {}), a == null)) return l;
    do {
      for (c = Object.getOwnPropertyNames(a), f = c.length; f-- > 0; )
        (d = c[f]), (!r || r(d, a, l)) && !m[d] && ((l[d] = a[d]), (m[d] = !0));
      a = i !== !1 && zd(a);
    } while (a && (!i || i(a, l)) && a !== Object.prototype);
    return l;
  },
  o2 = (a, l, i) => {
    (a = String(a)),
      (i === void 0 || i > a.length) && (i = a.length),
      (i -= l.length);
    const r = a.indexOf(l, i);
    return r !== -1 && r === i;
  },
  f2 = (a) => {
    if (!a) return null;
    if (ti(a)) return a;
    let l = a.length;
    if (!Ag(l)) return null;
    const i = new Array(l);
    for (; l-- > 0; ) i[l] = a[l];
    return i;
  },
  d2 = (
    (a) => (l) =>
      a && l instanceof a
  )(typeof Uint8Array < "u" && zd(Uint8Array)),
  h2 = (a, l) => {
    const r = (a && a[Symbol.iterator]).call(a);
    let c;
    for (; (c = r.next()) && !c.done; ) {
      const f = c.value;
      l.call(a, f[0], f[1]);
    }
  },
  m2 = (a, l) => {
    let i;
    const r = [];
    for (; (i = a.exec(l)) !== null; ) r.push(i);
    return r;
  },
  y2 = Hn("HTMLFormElement"),
  p2 = (a) =>
    a.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (i, r, c) {
      return r.toUpperCase() + c;
    }),
  lp = (
    ({ hasOwnProperty: a }) =>
    (l, i) =>
      a.call(l, i)
  )(Object.prototype),
  g2 = Hn("RegExp"),
  Ng = (a, l) => {
    const i = Object.getOwnPropertyDescriptors(a),
      r = {};
    vr(i, (c, f) => {
      let d;
      (d = l(c, f, a)) !== !1 && (r[f] = d || c);
    }),
      Object.defineProperties(a, r);
  },
  v2 = (a) => {
    Ng(a, (l, i) => {
      if (rn(a) && ["arguments", "caller", "callee"].indexOf(i) !== -1)
        return !1;
      const r = a[i];
      if (rn(r)) {
        if (((l.enumerable = !1), "writable" in l)) {
          l.writable = !1;
          return;
        }
        l.set ||
          (l.set = () => {
            throw Error("Can not rewrite read-only method '" + i + "'");
          });
      }
    });
  },
  b2 = (a, l) => {
    const i = {},
      r = (c) => {
        c.forEach((f) => {
          i[f] = !0;
        });
      };
    return ti(a) ? r(a) : r(String(a).split(l)), i;
  },
  x2 = () => {},
  S2 = (a, l) => (a != null && Number.isFinite((a = +a)) ? a : l);
function E2(a) {
  return !!(
    a &&
    rn(a.append) &&
    a[Symbol.toStringTag] === "FormData" &&
    a[Symbol.iterator]
  );
}
const w2 = (a) => {
    const l = new Array(10),
      i = (r, c) => {
        if (cc(r)) {
          if (l.indexOf(r) >= 0) return;
          if (!("toJSON" in r)) {
            l[c] = r;
            const f = ti(r) ? [] : {};
            return (
              vr(r, (d, m) => {
                const h = i(d, c + 1);
                !fr(h) && (f[m] = h);
              }),
              (l[c] = void 0),
              f
            );
          }
        }
        return r;
      };
    return i(a, 0);
  },
  _2 = Hn("AsyncFunction"),
  R2 = (a) => a && (cc(a) || rn(a)) && rn(a.then) && rn(a.catch),
  Og = ((a, l) =>
    a
      ? setImmediate
      : l
      ? ((i, r) => (
          Ml.addEventListener(
            "message",
            ({ source: c, data: f }) => {
              c === Ml && f === i && r.length && r.shift()();
            },
            !1
          ),
          (c) => {
            r.push(c), Ml.postMessage(i, "*");
          }
        ))(`axios@${Math.random()}`, [])
      : (i) => setTimeout(i))(
    typeof setImmediate == "function",
    rn(Ml.postMessage)
  ),
  A2 =
    typeof queueMicrotask < "u"
      ? queueMicrotask.bind(Ml)
      : (typeof process < "u" && process.nextTick) || Og,
  q = {
    isArray: ti,
    isArrayBuffer: Rg,
    isBuffer: GE,
    isFormData: IE,
    isArrayBufferView: YE,
    isString: XE,
    isNumber: Ag,
    isBoolean: PE,
    isObject: cc,
    isPlainObject: Vu,
    isReadableStream: t2,
    isRequest: n2,
    isResponse: a2,
    isHeaders: l2,
    isUndefined: fr,
    isDate: ZE,
    isFile: KE,
    isBlob: $E,
    isRegExp: g2,
    isFunction: rn,
    isStream: WE,
    isURLSearchParams: e2,
    isTypedArray: d2,
    isFileList: JE,
    forEach: vr,
    merge: ud,
    extend: i2,
    trim: s2,
    stripBOM: r2,
    inherits: u2,
    toFlatObject: c2,
    kindOf: rc,
    kindOfTest: Hn,
    endsWith: o2,
    toArray: f2,
    forEachEntry: h2,
    matchAll: m2,
    isHTMLForm: y2,
    hasOwnProperty: lp,
    hasOwnProp: lp,
    reduceDescriptors: Ng,
    freezeMethods: v2,
    toObjectSet: b2,
    toCamelCase: p2,
    noop: x2,
    toFiniteNumber: S2,
    findKey: Tg,
    global: Ml,
    isContextDefined: Cg,
    isSpecCompliantForm: E2,
    toJSONObject: w2,
    isAsyncFn: _2,
    isThenable: R2,
    setImmediate: Og,
    asap: A2,
  };
function Se(a, l, i, r, c) {
  Error.call(this),
    Error.captureStackTrace
      ? Error.captureStackTrace(this, this.constructor)
      : (this.stack = new Error().stack),
    (this.message = a),
    (this.name = "AxiosError"),
    l && (this.code = l),
    i && (this.config = i),
    r && (this.request = r),
    c && ((this.response = c), (this.status = c.status ? c.status : null));
}
q.inherits(Se, Error, {
  toJSON: function () {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: q.toJSONObject(this.config),
      code: this.code,
      status: this.status,
    };
  },
});
const jg = Se.prototype,
  Dg = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL",
].forEach((a) => {
  Dg[a] = { value: a };
});
Object.defineProperties(Se, Dg);
Object.defineProperty(jg, "isAxiosError", { value: !0 });
Se.from = (a, l, i, r, c, f) => {
  const d = Object.create(jg);
  return (
    q.toFlatObject(
      a,
      d,
      function (h) {
        return h !== Error.prototype;
      },
      (m) => m !== "isAxiosError"
    ),
    Se.call(d, a.message, l, i, r, c),
    (d.cause = a),
    (d.name = a.name),
    f && Object.assign(d, f),
    d
  );
};
const T2 = null;
function cd(a) {
  return q.isPlainObject(a) || q.isArray(a);
}
function Ug(a) {
  return q.endsWith(a, "[]") ? a.slice(0, -2) : a;
}
function sp(a, l, i) {
  return a
    ? a
        .concat(l)
        .map(function (c, f) {
          return (c = Ug(c)), !i && f ? "[" + c + "]" : c;
        })
        .join(i ? "." : "")
    : l;
}
function C2(a) {
  return q.isArray(a) && !a.some(cd);
}
const N2 = q.toFlatObject(q, {}, null, function (l) {
  return /^is[A-Z]/.test(l);
});
function oc(a, l, i) {
  if (!q.isObject(a)) throw new TypeError("target must be an object");
  (l = l || new FormData()),
    (i = q.toFlatObject(
      i,
      { metaTokens: !0, dots: !1, indexes: !1 },
      !1,
      function (D, C) {
        return !q.isUndefined(C[D]);
      }
    ));
  const r = i.metaTokens,
    c = i.visitor || v,
    f = i.dots,
    d = i.indexes,
    h = (i.Blob || (typeof Blob < "u" && Blob)) && q.isSpecCompliantForm(l);
  if (!q.isFunction(c)) throw new TypeError("visitor must be a function");
  function p(_) {
    if (_ === null) return "";
    if (q.isDate(_)) return _.toISOString();
    if (!h && q.isBlob(_))
      throw new Se("Blob is not supported. Use a Buffer instead.");
    return q.isArrayBuffer(_) || q.isTypedArray(_)
      ? h && typeof Blob == "function"
        ? new Blob([_])
        : Buffer.from(_)
      : _;
  }
  function v(_, D, C) {
    let H = _;
    if (_ && !C && typeof _ == "object") {
      if (q.endsWith(D, "{}"))
        (D = r ? D : D.slice(0, -2)), (_ = JSON.stringify(_));
      else if (
        (q.isArray(_) && C2(_)) ||
        ((q.isFileList(_) || q.endsWith(D, "[]")) && (H = q.toArray(_)))
      )
        return (
          (D = Ug(D)),
          H.forEach(function (k, ne) {
            !(q.isUndefined(k) || k === null) &&
              l.append(
                d === !0 ? sp([D], ne, f) : d === null ? D : D + "[]",
                p(k)
              );
          }),
          !1
        );
    }
    return cd(_) ? !0 : (l.append(sp(C, D, f), p(_)), !1);
  }
  const x = [],
    E = Object.assign(N2, {
      defaultVisitor: v,
      convertValue: p,
      isVisitable: cd,
    });
  function O(_, D) {
    if (!q.isUndefined(_)) {
      if (x.indexOf(_) !== -1)
        throw Error("Circular reference detected in " + D.join("."));
      x.push(_),
        q.forEach(_, function (H, B) {
          (!(q.isUndefined(H) || H === null) &&
            c.call(l, H, q.isString(B) ? B.trim() : B, D, E)) === !0 &&
            O(H, D ? D.concat(B) : [B]);
        }),
        x.pop();
    }
  }
  if (!q.isObject(a)) throw new TypeError("data must be an object");
  return O(a), l;
}
function ip(a) {
  const l = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0",
  };
  return encodeURIComponent(a).replace(/[!'()~]|%20|%00/g, function (r) {
    return l[r];
  });
}
function Ld(a, l) {
  (this._pairs = []), a && oc(a, this, l);
}
const Mg = Ld.prototype;
Mg.append = function (l, i) {
  this._pairs.push([l, i]);
};
Mg.toString = function (l) {
  const i = l
    ? function (r) {
        return l.call(this, r, ip);
      }
    : ip;
  return this._pairs
    .map(function (c) {
      return i(c[0]) + "=" + i(c[1]);
    }, "")
    .join("&");
};
function O2(a) {
  return encodeURIComponent(a)
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+")
    .replace(/%5B/gi, "[")
    .replace(/%5D/gi, "]");
}
function zg(a, l, i) {
  if (!l) return a;
  const r = (i && i.encode) || O2;
  q.isFunction(i) && (i = { serialize: i });
  const c = i && i.serialize;
  let f;
  if (
    (c
      ? (f = c(l, i))
      : (f = q.isURLSearchParams(l) ? l.toString() : new Ld(l, i).toString(r)),
    f)
  ) {
    const d = a.indexOf("#");
    d !== -1 && (a = a.slice(0, d)),
      (a += (a.indexOf("?") === -1 ? "?" : "&") + f);
  }
  return a;
}
class rp {
  constructor() {
    this.handlers = [];
  }
  use(l, i, r) {
    return (
      this.handlers.push({
        fulfilled: l,
        rejected: i,
        synchronous: r ? r.synchronous : !1,
        runWhen: r ? r.runWhen : null,
      }),
      this.handlers.length - 1
    );
  }
  eject(l) {
    this.handlers[l] && (this.handlers[l] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(l) {
    q.forEach(this.handlers, function (r) {
      r !== null && l(r);
    });
  }
}
const Lg = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
  },
  j2 = typeof URLSearchParams < "u" ? URLSearchParams : Ld,
  D2 = typeof FormData < "u" ? FormData : null,
  U2 = typeof Blob < "u" ? Blob : null,
  M2 = {
    isBrowser: !0,
    classes: { URLSearchParams: j2, FormData: D2, Blob: U2 },
    protocols: ["http", "https", "file", "blob", "url", "data"],
  },
  Hd = typeof window < "u" && typeof document < "u",
  od = (typeof navigator == "object" && navigator) || void 0,
  z2 =
    Hd &&
    (!od || ["ReactNative", "NativeScript", "NS"].indexOf(od.product) < 0),
  L2 =
    typeof WorkerGlobalScope < "u" &&
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts == "function",
  H2 = (Hd && window.location.href) || "http://localhost",
  B2 = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        hasBrowserEnv: Hd,
        hasStandardBrowserEnv: z2,
        hasStandardBrowserWebWorkerEnv: L2,
        navigator: od,
        origin: H2,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  Ut = { ...B2, ...M2 };
function q2(a, l) {
  return oc(
    a,
    new Ut.classes.URLSearchParams(),
    Object.assign(
      {
        visitor: function (i, r, c, f) {
          return Ut.isNode && q.isBuffer(i)
            ? (this.append(r, i.toString("base64")), !1)
            : f.defaultVisitor.apply(this, arguments);
        },
      },
      l
    )
  );
}
function k2(a) {
  return q
    .matchAll(/\w+|\[(\w*)]/g, a)
    .map((l) => (l[0] === "[]" ? "" : l[1] || l[0]));
}
function V2(a) {
  const l = {},
    i = Object.keys(a);
  let r;
  const c = i.length;
  let f;
  for (r = 0; r < c; r++) (f = i[r]), (l[f] = a[f]);
  return l;
}
function Hg(a) {
  function l(i, r, c, f) {
    let d = i[f++];
    if (d === "__proto__") return !0;
    const m = Number.isFinite(+d),
      h = f >= i.length;
    return (
      (d = !d && q.isArray(c) ? c.length : d),
      h
        ? (q.hasOwnProp(c, d) ? (c[d] = [c[d], r]) : (c[d] = r), !m)
        : ((!c[d] || !q.isObject(c[d])) && (c[d] = []),
          l(i, r, c[d], f) && q.isArray(c[d]) && (c[d] = V2(c[d])),
          !m)
    );
  }
  if (q.isFormData(a) && q.isFunction(a.entries)) {
    const i = {};
    return (
      q.forEachEntry(a, (r, c) => {
        l(k2(r), c, i, 0);
      }),
      i
    );
  }
  return null;
}
function F2(a, l, i) {
  if (q.isString(a))
    try {
      return (l || JSON.parse)(a), q.trim(a);
    } catch (r) {
      if (r.name !== "SyntaxError") throw r;
    }
  return (i || JSON.stringify)(a);
}
const br = {
  transitional: Lg,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [
    function (l, i) {
      const r = i.getContentType() || "",
        c = r.indexOf("application/json") > -1,
        f = q.isObject(l);
      if ((f && q.isHTMLForm(l) && (l = new FormData(l)), q.isFormData(l)))
        return c ? JSON.stringify(Hg(l)) : l;
      if (
        q.isArrayBuffer(l) ||
        q.isBuffer(l) ||
        q.isStream(l) ||
        q.isFile(l) ||
        q.isBlob(l) ||
        q.isReadableStream(l)
      )
        return l;
      if (q.isArrayBufferView(l)) return l.buffer;
      if (q.isURLSearchParams(l))
        return (
          i.setContentType(
            "application/x-www-form-urlencoded;charset=utf-8",
            !1
          ),
          l.toString()
        );
      let m;
      if (f) {
        if (r.indexOf("application/x-www-form-urlencoded") > -1)
          return q2(l, this.formSerializer).toString();
        if ((m = q.isFileList(l)) || r.indexOf("multipart/form-data") > -1) {
          const h = this.env && this.env.FormData;
          return oc(
            m ? { "files[]": l } : l,
            h && new h(),
            this.formSerializer
          );
        }
      }
      return f || c ? (i.setContentType("application/json", !1), F2(l)) : l;
    },
  ],
  transformResponse: [
    function (l) {
      const i = this.transitional || br.transitional,
        r = i && i.forcedJSONParsing,
        c = this.responseType === "json";
      if (q.isResponse(l) || q.isReadableStream(l)) return l;
      if (l && q.isString(l) && ((r && !this.responseType) || c)) {
        const d = !(i && i.silentJSONParsing) && c;
        try {
          return JSON.parse(l);
        } catch (m) {
          if (d)
            throw m.name === "SyntaxError"
              ? Se.from(m, Se.ERR_BAD_RESPONSE, this, null, this.response)
              : m;
        }
      }
      return l;
    },
  ],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: { FormData: Ut.classes.FormData, Blob: Ut.classes.Blob },
  validateStatus: function (l) {
    return l >= 200 && l < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0,
    },
  },
};
q.forEach(["delete", "get", "head", "post", "put", "patch"], (a) => {
  br.headers[a] = {};
});
const Q2 = q.toObjectSet([
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent",
  ]),
  G2 = (a) => {
    const l = {};
    let i, r, c;
    return (
      a &&
        a
          .split(
            `
`
          )
          .forEach(function (d) {
            (c = d.indexOf(":")),
              (i = d.substring(0, c).trim().toLowerCase()),
              (r = d.substring(c + 1).trim()),
              !(!i || (l[i] && Q2[i])) &&
                (i === "set-cookie"
                  ? l[i]
                    ? l[i].push(r)
                    : (l[i] = [r])
                  : (l[i] = l[i] ? l[i] + ", " + r : r));
          }),
      l
    );
  },
  up = Symbol("internals");
function lr(a) {
  return a && String(a).trim().toLowerCase();
}
function Fu(a) {
  return a === !1 || a == null ? a : q.isArray(a) ? a.map(Fu) : String(a);
}
function Y2(a) {
  const l = Object.create(null),
    i = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; (r = i.exec(a)); ) l[r[1]] = r[2];
  return l;
}
const X2 = (a) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(a.trim());
function Lf(a, l, i, r, c) {
  if (q.isFunction(r)) return r.call(this, l, i);
  if ((c && (l = i), !!q.isString(l))) {
    if (q.isString(r)) return l.indexOf(r) !== -1;
    if (q.isRegExp(r)) return r.test(l);
  }
}
function P2(a) {
  return a
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (l, i, r) => i.toUpperCase() + r);
}
function Z2(a, l) {
  const i = q.toCamelCase(" " + l);
  ["get", "set", "has"].forEach((r) => {
    Object.defineProperty(a, r + i, {
      value: function (c, f, d) {
        return this[r].call(this, l, c, f, d);
      },
      configurable: !0,
    });
  });
}
let Kt = class {
  constructor(l) {
    l && this.set(l);
  }
  set(l, i, r) {
    const c = this;
    function f(m, h, p) {
      const v = lr(h);
      if (!v) throw new Error("header name must be a non-empty string");
      const x = q.findKey(c, v);
      (!x || c[x] === void 0 || p === !0 || (p === void 0 && c[x] !== !1)) &&
        (c[x || h] = Fu(m));
    }
    const d = (m, h) => q.forEach(m, (p, v) => f(p, v, h));
    if (q.isPlainObject(l) || l instanceof this.constructor) d(l, i);
    else if (q.isString(l) && (l = l.trim()) && !X2(l)) d(G2(l), i);
    else if (q.isHeaders(l)) for (const [m, h] of l.entries()) f(h, m, r);
    else l != null && f(i, l, r);
    return this;
  }
  get(l, i) {
    if (((l = lr(l)), l)) {
      const r = q.findKey(this, l);
      if (r) {
        const c = this[r];
        if (!i) return c;
        if (i === !0) return Y2(c);
        if (q.isFunction(i)) return i.call(this, c, r);
        if (q.isRegExp(i)) return i.exec(c);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(l, i) {
    if (((l = lr(l)), l)) {
      const r = q.findKey(this, l);
      return !!(r && this[r] !== void 0 && (!i || Lf(this, this[r], r, i)));
    }
    return !1;
  }
  delete(l, i) {
    const r = this;
    let c = !1;
    function f(d) {
      if (((d = lr(d)), d)) {
        const m = q.findKey(r, d);
        m && (!i || Lf(r, r[m], m, i)) && (delete r[m], (c = !0));
      }
    }
    return q.isArray(l) ? l.forEach(f) : f(l), c;
  }
  clear(l) {
    const i = Object.keys(this);
    let r = i.length,
      c = !1;
    for (; r--; ) {
      const f = i[r];
      (!l || Lf(this, this[f], f, l, !0)) && (delete this[f], (c = !0));
    }
    return c;
  }
  normalize(l) {
    const i = this,
      r = {};
    return (
      q.forEach(this, (c, f) => {
        const d = q.findKey(r, f);
        if (d) {
          (i[d] = Fu(c)), delete i[f];
          return;
        }
        const m = l ? P2(f) : String(f).trim();
        m !== f && delete i[f], (i[m] = Fu(c)), (r[m] = !0);
      }),
      this
    );
  }
  concat(...l) {
    return this.constructor.concat(this, ...l);
  }
  toJSON(l) {
    const i = Object.create(null);
    return (
      q.forEach(this, (r, c) => {
        r != null && r !== !1 && (i[c] = l && q.isArray(r) ? r.join(", ") : r);
      }),
      i
    );
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([l, i]) => l + ": " + i).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(l) {
    return l instanceof this ? l : new this(l);
  }
  static concat(l, ...i) {
    const r = new this(l);
    return i.forEach((c) => r.set(c)), r;
  }
  static accessor(l) {
    const r = (this[up] = this[up] = { accessors: {} }).accessors,
      c = this.prototype;
    function f(d) {
      const m = lr(d);
      r[m] || (Z2(c, d), (r[m] = !0));
    }
    return q.isArray(l) ? l.forEach(f) : f(l), this;
  }
};
Kt.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
  "Authorization",
]);
q.reduceDescriptors(Kt.prototype, ({ value: a }, l) => {
  let i = l[0].toUpperCase() + l.slice(1);
  return {
    get: () => a,
    set(r) {
      this[i] = r;
    },
  };
});
q.freezeMethods(Kt);
function Hf(a, l) {
  const i = this || br,
    r = l || i,
    c = Kt.from(r.headers);
  let f = r.data;
  return (
    q.forEach(a, function (m) {
      f = m.call(i, f, c.normalize(), l ? l.status : void 0);
    }),
    c.normalize(),
    f
  );
}
function Bg(a) {
  return !!(a && a.__CANCEL__);
}
function ni(a, l, i) {
  Se.call(this, a ?? "canceled", Se.ERR_CANCELED, l, i),
    (this.name = "CanceledError");
}
q.inherits(ni, Se, { __CANCEL__: !0 });
function qg(a, l, i) {
  const r = i.config.validateStatus;
  !i.status || !r || r(i.status)
    ? a(i)
    : l(
        new Se(
          "Request failed with status code " + i.status,
          [Se.ERR_BAD_REQUEST, Se.ERR_BAD_RESPONSE][
            Math.floor(i.status / 100) - 4
          ],
          i.config,
          i.request,
          i
        )
      );
}
function K2(a) {
  const l = /^([-+\w]{1,25})(:?\/\/|:)/.exec(a);
  return (l && l[1]) || "";
}
function $2(a, l) {
  a = a || 10;
  const i = new Array(a),
    r = new Array(a);
  let c = 0,
    f = 0,
    d;
  return (
    (l = l !== void 0 ? l : 1e3),
    function (h) {
      const p = Date.now(),
        v = r[f];
      d || (d = p), (i[c] = h), (r[c] = p);
      let x = f,
        E = 0;
      for (; x !== c; ) (E += i[x++]), (x = x % a);
      if (((c = (c + 1) % a), c === f && (f = (f + 1) % a), p - d < l)) return;
      const O = v && p - v;
      return O ? Math.round((E * 1e3) / O) : void 0;
    }
  );
}
function J2(a, l) {
  let i = 0,
    r = 1e3 / l,
    c,
    f;
  const d = (p, v = Date.now()) => {
    (i = v), (c = null), f && (clearTimeout(f), (f = null)), a.apply(null, p);
  };
  return [
    (...p) => {
      const v = Date.now(),
        x = v - i;
      x >= r
        ? d(p, v)
        : ((c = p),
          f ||
            (f = setTimeout(() => {
              (f = null), d(c);
            }, r - x)));
    },
    () => c && d(c),
  ];
}
const Ku = (a, l, i = 3) => {
    let r = 0;
    const c = $2(50, 250);
    return J2((f) => {
      const d = f.loaded,
        m = f.lengthComputable ? f.total : void 0,
        h = d - r,
        p = c(h),
        v = d <= m;
      r = d;
      const x = {
        loaded: d,
        total: m,
        progress: m ? d / m : void 0,
        bytes: h,
        rate: p || void 0,
        estimated: p && m && v ? (m - d) / p : void 0,
        event: f,
        lengthComputable: m != null,
        [l ? "download" : "upload"]: !0,
      };
      a(x);
    }, i);
  },
  cp = (a, l) => {
    const i = a != null;
    return [(r) => l[0]({ lengthComputable: i, total: a, loaded: r }), l[1]];
  },
  op =
    (a) =>
    (...l) =>
      q.asap(() => a(...l)),
  W2 = Ut.hasStandardBrowserEnv
    ? ((a, l) => (i) => (
        (i = new URL(i, Ut.origin)),
        a.protocol === i.protocol &&
          a.host === i.host &&
          (l || a.port === i.port)
      ))(
        new URL(Ut.origin),
        Ut.navigator && /(msie|trident)/i.test(Ut.navigator.userAgent)
      )
    : () => !0,
  I2 = Ut.hasStandardBrowserEnv
    ? {
        write(a, l, i, r, c, f) {
          const d = [a + "=" + encodeURIComponent(l)];
          q.isNumber(i) && d.push("expires=" + new Date(i).toGMTString()),
            q.isString(r) && d.push("path=" + r),
            q.isString(c) && d.push("domain=" + c),
            f === !0 && d.push("secure"),
            (document.cookie = d.join("; "));
        },
        read(a) {
          const l = document.cookie.match(
            new RegExp("(^|;\\s*)(" + a + ")=([^;]*)")
          );
          return l ? decodeURIComponent(l[3]) : null;
        },
        remove(a) {
          this.write(a, "", Date.now() - 864e5);
        },
      }
    : {
        write() {},
        read() {
          return null;
        },
        remove() {},
      };
function ew(a) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(a);
}
function tw(a, l) {
  return l ? a.replace(/\/?\/$/, "") + "/" + l.replace(/^\/+/, "") : a;
}
function kg(a, l, i) {
  let r = !ew(l);
  return (a && r) || i == !1 ? tw(a, l) : l;
}
const fp = (a) => (a instanceof Kt ? { ...a } : a);
function Zl(a, l) {
  l = l || {};
  const i = {};
  function r(p, v, x, E) {
    return q.isPlainObject(p) && q.isPlainObject(v)
      ? q.merge.call({ caseless: E }, p, v)
      : q.isPlainObject(v)
      ? q.merge({}, v)
      : q.isArray(v)
      ? v.slice()
      : v;
  }
  function c(p, v, x, E) {
    if (q.isUndefined(v)) {
      if (!q.isUndefined(p)) return r(void 0, p, x, E);
    } else return r(p, v, x, E);
  }
  function f(p, v) {
    if (!q.isUndefined(v)) return r(void 0, v);
  }
  function d(p, v) {
    if (q.isUndefined(v)) {
      if (!q.isUndefined(p)) return r(void 0, p);
    } else return r(void 0, v);
  }
  function m(p, v, x) {
    if (x in l) return r(p, v);
    if (x in a) return r(void 0, p);
  }
  const h = {
    url: f,
    method: f,
    data: f,
    baseURL: d,
    transformRequest: d,
    transformResponse: d,
    paramsSerializer: d,
    timeout: d,
    timeoutMessage: d,
    withCredentials: d,
    withXSRFToken: d,
    adapter: d,
    responseType: d,
    xsrfCookieName: d,
    xsrfHeaderName: d,
    onUploadProgress: d,
    onDownloadProgress: d,
    decompress: d,
    maxContentLength: d,
    maxBodyLength: d,
    beforeRedirect: d,
    transport: d,
    httpAgent: d,
    httpsAgent: d,
    cancelToken: d,
    socketPath: d,
    responseEncoding: d,
    validateStatus: m,
    headers: (p, v, x) => c(fp(p), fp(v), x, !0),
  };
  return (
    q.forEach(Object.keys(Object.assign({}, a, l)), function (v) {
      const x = h[v] || c,
        E = x(a[v], l[v], v);
      (q.isUndefined(E) && x !== m) || (i[v] = E);
    }),
    i
  );
}
const Vg = (a) => {
    const l = Zl({}, a);
    let {
      data: i,
      withXSRFToken: r,
      xsrfHeaderName: c,
      xsrfCookieName: f,
      headers: d,
      auth: m,
    } = l;
    (l.headers = d = Kt.from(d)),
      (l.url = zg(kg(l.baseURL, l.url), a.params, a.paramsSerializer)),
      m &&
        d.set(
          "Authorization",
          "Basic " +
            btoa(
              (m.username || "") +
                ":" +
                (m.password ? unescape(encodeURIComponent(m.password)) : "")
            )
        );
    let h;
    if (q.isFormData(i)) {
      if (Ut.hasStandardBrowserEnv || Ut.hasStandardBrowserWebWorkerEnv)
        d.setContentType(void 0);
      else if ((h = d.getContentType()) !== !1) {
        const [p, ...v] = h
          ? h
              .split(";")
              .map((x) => x.trim())
              .filter(Boolean)
          : [];
        d.setContentType([p || "multipart/form-data", ...v].join("; "));
      }
    }
    if (
      Ut.hasStandardBrowserEnv &&
      (r && q.isFunction(r) && (r = r(l)), r || (r !== !1 && W2(l.url)))
    ) {
      const p = c && f && I2.read(f);
      p && d.set(c, p);
    }
    return l;
  },
  nw = typeof XMLHttpRequest < "u",
  aw =
    nw &&
    function (a) {
      return new Promise(function (i, r) {
        const c = Vg(a);
        let f = c.data;
        const d = Kt.from(c.headers).normalize();
        let { responseType: m, onUploadProgress: h, onDownloadProgress: p } = c,
          v,
          x,
          E,
          O,
          _;
        function D() {
          O && O(),
            _ && _(),
            c.cancelToken && c.cancelToken.unsubscribe(v),
            c.signal && c.signal.removeEventListener("abort", v);
        }
        let C = new XMLHttpRequest();
        C.open(c.method.toUpperCase(), c.url, !0), (C.timeout = c.timeout);
        function H() {
          if (!C) return;
          const k = Kt.from(
              "getAllResponseHeaders" in C && C.getAllResponseHeaders()
            ),
            Y = {
              data:
                !m || m === "text" || m === "json"
                  ? C.responseText
                  : C.response,
              status: C.status,
              statusText: C.statusText,
              headers: k,
              config: a,
              request: C,
            };
          qg(
            function (fe) {
              i(fe), D();
            },
            function (fe) {
              r(fe), D();
            },
            Y
          ),
            (C = null);
        }
        "onloadend" in C
          ? (C.onloadend = H)
          : (C.onreadystatechange = function () {
              !C ||
                C.readyState !== 4 ||
                (C.status === 0 &&
                  !(C.responseURL && C.responseURL.indexOf("file:") === 0)) ||
                setTimeout(H);
            }),
          (C.onabort = function () {
            C &&
              (r(new Se("Request aborted", Se.ECONNABORTED, a, C)), (C = null));
          }),
          (C.onerror = function () {
            r(new Se("Network Error", Se.ERR_NETWORK, a, C)), (C = null);
          }),
          (C.ontimeout = function () {
            let ne = c.timeout
              ? "timeout of " + c.timeout + "ms exceeded"
              : "timeout exceeded";
            const Y = c.transitional || Lg;
            c.timeoutErrorMessage && (ne = c.timeoutErrorMessage),
              r(
                new Se(
                  ne,
                  Y.clarifyTimeoutError ? Se.ETIMEDOUT : Se.ECONNABORTED,
                  a,
                  C
                )
              ),
              (C = null);
          }),
          f === void 0 && d.setContentType(null),
          "setRequestHeader" in C &&
            q.forEach(d.toJSON(), function (ne, Y) {
              C.setRequestHeader(Y, ne);
            }),
          q.isUndefined(c.withCredentials) ||
            (C.withCredentials = !!c.withCredentials),
          m && m !== "json" && (C.responseType = c.responseType),
          p && (([E, _] = Ku(p, !0)), C.addEventListener("progress", E)),
          h &&
            C.upload &&
            (([x, O] = Ku(h)),
            C.upload.addEventListener("progress", x),
            C.upload.addEventListener("loadend", O)),
          (c.cancelToken || c.signal) &&
            ((v = (k) => {
              C &&
                (r(!k || k.type ? new ni(null, a, C) : k),
                C.abort(),
                (C = null));
            }),
            c.cancelToken && c.cancelToken.subscribe(v),
            c.signal &&
              (c.signal.aborted ? v() : c.signal.addEventListener("abort", v)));
        const B = K2(c.url);
        if (B && Ut.protocols.indexOf(B) === -1) {
          r(new Se("Unsupported protocol " + B + ":", Se.ERR_BAD_REQUEST, a));
          return;
        }
        C.send(f || null);
      });
    },
  lw = (a, l) => {
    const { length: i } = (a = a ? a.filter(Boolean) : []);
    if (l || i) {
      let r = new AbortController(),
        c;
      const f = function (p) {
        if (!c) {
          (c = !0), m();
          const v = p instanceof Error ? p : this.reason;
          r.abort(
            v instanceof Se ? v : new ni(v instanceof Error ? v.message : v)
          );
        }
      };
      let d =
        l &&
        setTimeout(() => {
          (d = null), f(new Se(`timeout ${l} of ms exceeded`, Se.ETIMEDOUT));
        }, l);
      const m = () => {
        a &&
          (d && clearTimeout(d),
          (d = null),
          a.forEach((p) => {
            p.unsubscribe
              ? p.unsubscribe(f)
              : p.removeEventListener("abort", f);
          }),
          (a = null));
      };
      a.forEach((p) => p.addEventListener("abort", f));
      const { signal: h } = r;
      return (h.unsubscribe = () => q.asap(m)), h;
    }
  },
  sw = function* (a, l) {
    let i = a.byteLength;
    if (i < l) {
      yield a;
      return;
    }
    let r = 0,
      c;
    for (; r < i; ) (c = r + l), yield a.slice(r, c), (r = c);
  },
  iw = async function* (a, l) {
    for await (const i of rw(a)) yield* sw(i, l);
  },
  rw = async function* (a) {
    if (a[Symbol.asyncIterator]) {
      yield* a;
      return;
    }
    const l = a.getReader();
    try {
      for (;;) {
        const { done: i, value: r } = await l.read();
        if (i) break;
        yield r;
      }
    } finally {
      await l.cancel();
    }
  },
  dp = (a, l, i, r) => {
    const c = iw(a, l);
    let f = 0,
      d,
      m = (h) => {
        d || ((d = !0), r && r(h));
      };
    return new ReadableStream(
      {
        async pull(h) {
          try {
            const { done: p, value: v } = await c.next();
            if (p) {
              m(), h.close();
              return;
            }
            let x = v.byteLength;
            if (i) {
              let E = (f += x);
              i(E);
            }
            h.enqueue(new Uint8Array(v));
          } catch (p) {
            throw (m(p), p);
          }
        },
        cancel(h) {
          return m(h), c.return();
        },
      },
      { highWaterMark: 2 }
    );
  },
  fc =
    typeof fetch == "function" &&
    typeof Request == "function" &&
    typeof Response == "function",
  Fg = fc && typeof ReadableStream == "function",
  uw =
    fc &&
    (typeof TextEncoder == "function"
      ? (
          (a) => (l) =>
            a.encode(l)
        )(new TextEncoder())
      : async (a) => new Uint8Array(await new Response(a).arrayBuffer())),
  Qg = (a, ...l) => {
    try {
      return !!a(...l);
    } catch {
      return !1;
    }
  },
  cw =
    Fg &&
    Qg(() => {
      let a = !1;
      const l = new Request(Ut.origin, {
        body: new ReadableStream(),
        method: "POST",
        get duplex() {
          return (a = !0), "half";
        },
      }).headers.has("Content-Type");
      return a && !l;
    }),
  hp = 64 * 1024,
  fd = Fg && Qg(() => q.isReadableStream(new Response("").body)),
  $u = { stream: fd && ((a) => a.body) };
fc &&
  ((a) => {
    ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((l) => {
      !$u[l] &&
        ($u[l] = q.isFunction(a[l])
          ? (i) => i[l]()
          : (i, r) => {
              throw new Se(
                `Response type '${l}' is not supported`,
                Se.ERR_NOT_SUPPORT,
                r
              );
            });
    });
  })(new Response());
const ow = async (a) => {
    if (a == null) return 0;
    if (q.isBlob(a)) return a.size;
    if (q.isSpecCompliantForm(a))
      return (
        await new Request(Ut.origin, { method: "POST", body: a }).arrayBuffer()
      ).byteLength;
    if (q.isArrayBufferView(a) || q.isArrayBuffer(a)) return a.byteLength;
    if ((q.isURLSearchParams(a) && (a = a + ""), q.isString(a)))
      return (await uw(a)).byteLength;
  },
  fw = async (a, l) => {
    const i = q.toFiniteNumber(a.getContentLength());
    return i ?? ow(l);
  },
  dw =
    fc &&
    (async (a) => {
      let {
        url: l,
        method: i,
        data: r,
        signal: c,
        cancelToken: f,
        timeout: d,
        onDownloadProgress: m,
        onUploadProgress: h,
        responseType: p,
        headers: v,
        withCredentials: x = "same-origin",
        fetchOptions: E,
      } = Vg(a);
      p = p ? (p + "").toLowerCase() : "text";
      let O = lw([c, f && f.toAbortSignal()], d),
        _;
      const D =
        O &&
        O.unsubscribe &&
        (() => {
          O.unsubscribe();
        });
      let C;
      try {
        if (
          h &&
          cw &&
          i !== "get" &&
          i !== "head" &&
          (C = await fw(v, r)) !== 0
        ) {
          let Y = new Request(l, { method: "POST", body: r, duplex: "half" }),
            ee;
          if (
            (q.isFormData(r) &&
              (ee = Y.headers.get("content-type")) &&
              v.setContentType(ee),
            Y.body)
          ) {
            const [fe, I] = cp(C, Ku(op(h)));
            r = dp(Y.body, hp, fe, I);
          }
        }
        q.isString(x) || (x = x ? "include" : "omit");
        const H = "credentials" in Request.prototype;
        _ = new Request(l, {
          ...E,
          signal: O,
          method: i.toUpperCase(),
          headers: v.normalize().toJSON(),
          body: r,
          duplex: "half",
          credentials: H ? x : void 0,
        });
        let B = await fetch(_);
        const k = fd && (p === "stream" || p === "response");
        if (fd && (m || (k && D))) {
          const Y = {};
          ["status", "statusText", "headers"].forEach((X) => {
            Y[X] = B[X];
          });
          const ee = q.toFiniteNumber(B.headers.get("content-length")),
            [fe, I] = (m && cp(ee, Ku(op(m), !0))) || [];
          B = new Response(
            dp(B.body, hp, fe, () => {
              I && I(), D && D();
            }),
            Y
          );
        }
        p = p || "text";
        let ne = await $u[q.findKey($u, p) || "text"](B, a);
        return (
          !k && D && D(),
          await new Promise((Y, ee) => {
            qg(Y, ee, {
              data: ne,
              headers: Kt.from(B.headers),
              status: B.status,
              statusText: B.statusText,
              config: a,
              request: _,
            });
          })
        );
      } catch (H) {
        throw (
          (D && D(),
          H && H.name === "TypeError" && /fetch/i.test(H.message)
            ? Object.assign(new Se("Network Error", Se.ERR_NETWORK, a, _), {
                cause: H.cause || H,
              })
            : Se.from(H, H && H.code, a, _))
        );
      }
    }),
  dd = { http: T2, xhr: aw, fetch: dw };
q.forEach(dd, (a, l) => {
  if (a) {
    try {
      Object.defineProperty(a, "name", { value: l });
    } catch {}
    Object.defineProperty(a, "adapterName", { value: l });
  }
});
const mp = (a) => `- ${a}`,
  hw = (a) => q.isFunction(a) || a === null || a === !1,
  Gg = {
    getAdapter: (a) => {
      a = q.isArray(a) ? a : [a];
      const { length: l } = a;
      let i, r;
      const c = {};
      for (let f = 0; f < l; f++) {
        i = a[f];
        let d;
        if (
          ((r = i),
          !hw(i) && ((r = dd[(d = String(i)).toLowerCase()]), r === void 0))
        )
          throw new Se(`Unknown adapter '${d}'`);
        if (r) break;
        c[d || "#" + f] = r;
      }
      if (!r) {
        const f = Object.entries(c).map(
          ([m, h]) =>
            `adapter ${m} ` +
            (h === !1
              ? "is not supported by the environment"
              : "is not available in the build")
        );
        let d = l
          ? f.length > 1
            ? `since :
` +
              f.map(mp).join(`
`)
            : " " + mp(f[0])
          : "as no adapter specified";
        throw new Se(
          "There is no suitable adapter to dispatch the request " + d,
          "ERR_NOT_SUPPORT"
        );
      }
      return r;
    },
    adapters: dd,
  };
function Bf(a) {
  if (
    (a.cancelToken && a.cancelToken.throwIfRequested(),
    a.signal && a.signal.aborted)
  )
    throw new ni(null, a);
}
function yp(a) {
  return (
    Bf(a),
    (a.headers = Kt.from(a.headers)),
    (a.data = Hf.call(a, a.transformRequest)),
    ["post", "put", "patch"].indexOf(a.method) !== -1 &&
      a.headers.setContentType("application/x-www-form-urlencoded", !1),
    Gg.getAdapter(a.adapter || br.adapter)(a).then(
      function (r) {
        return (
          Bf(a),
          (r.data = Hf.call(a, a.transformResponse, r)),
          (r.headers = Kt.from(r.headers)),
          r
        );
      },
      function (r) {
        return (
          Bg(r) ||
            (Bf(a),
            r &&
              r.response &&
              ((r.response.data = Hf.call(a, a.transformResponse, r.response)),
              (r.response.headers = Kt.from(r.response.headers)))),
          Promise.reject(r)
        );
      }
    )
  );
}
const Yg = "1.8.1",
  dc = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(
  (a, l) => {
    dc[a] = function (r) {
      return typeof r === a || "a" + (l < 1 ? "n " : " ") + a;
    };
  }
);
const pp = {};
dc.transitional = function (l, i, r) {
  function c(f, d) {
    return (
      "[Axios v" +
      Yg +
      "] Transitional option '" +
      f +
      "'" +
      d +
      (r ? ". " + r : "")
    );
  }
  return (f, d, m) => {
    if (l === !1)
      throw new Se(
        c(d, " has been removed" + (i ? " in " + i : "")),
        Se.ERR_DEPRECATED
      );
    return (
      i &&
        !pp[d] &&
        ((pp[d] = !0),
        console.warn(
          c(
            d,
            " has been deprecated since v" +
              i +
              " and will be removed in the near future"
          )
        )),
      l ? l(f, d, m) : !0
    );
  };
};
dc.spelling = function (l) {
  return (i, r) => (console.warn(`${r} is likely a misspelling of ${l}`), !0);
};
function mw(a, l, i) {
  if (typeof a != "object")
    throw new Se("options must be an object", Se.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(a);
  let c = r.length;
  for (; c-- > 0; ) {
    const f = r[c],
      d = l[f];
    if (d) {
      const m = a[f],
        h = m === void 0 || d(m, f, a);
      if (h !== !0)
        throw new Se("option " + f + " must be " + h, Se.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (i !== !0) throw new Se("Unknown option " + f, Se.ERR_BAD_OPTION);
  }
}
const Qu = { assertOptions: mw, validators: dc },
  Gn = Qu.validators;
let Gl = class {
  constructor(l) {
    (this.defaults = l),
      (this.interceptors = { request: new rp(), response: new rp() });
  }
  async request(l, i) {
    try {
      return await this._request(l, i);
    } catch (r) {
      if (r instanceof Error) {
        let c = {};
        Error.captureStackTrace
          ? Error.captureStackTrace(c)
          : (c = new Error());
        const f = c.stack ? c.stack.replace(/^.+\n/, "") : "";
        try {
          r.stack
            ? f &&
              !String(r.stack).endsWith(f.replace(/^.+\n.+\n/, "")) &&
              (r.stack +=
                `
` + f)
            : (r.stack = f);
        } catch {}
      }
      throw r;
    }
  }
  _request(l, i) {
    typeof l == "string" ? ((i = i || {}), (i.url = l)) : (i = l || {}),
      (i = Zl(this.defaults, i));
    const { transitional: r, paramsSerializer: c, headers: f } = i;
    r !== void 0 &&
      Qu.assertOptions(
        r,
        {
          silentJSONParsing: Gn.transitional(Gn.boolean),
          forcedJSONParsing: Gn.transitional(Gn.boolean),
          clarifyTimeoutError: Gn.transitional(Gn.boolean),
        },
        !1
      ),
      c != null &&
        (q.isFunction(c)
          ? (i.paramsSerializer = { serialize: c })
          : Qu.assertOptions(
              c,
              { encode: Gn.function, serialize: Gn.function },
              !0
            )),
      i.allowAbsoluteUrls !== void 0 ||
        (this.defaults.allowAbsoluteUrls !== void 0
          ? (i.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls)
          : (i.allowAbsoluteUrls = !0)),
      Qu.assertOptions(
        i,
        {
          baseUrl: Gn.spelling("baseURL"),
          withXsrfToken: Gn.spelling("withXSRFToken"),
        },
        !0
      ),
      (i.method = (i.method || this.defaults.method || "get").toLowerCase());
    let d = f && q.merge(f.common, f[i.method]);
    f &&
      q.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        (_) => {
          delete f[_];
        }
      ),
      (i.headers = Kt.concat(d, f));
    const m = [];
    let h = !0;
    this.interceptors.request.forEach(function (D) {
      (typeof D.runWhen == "function" && D.runWhen(i) === !1) ||
        ((h = h && D.synchronous), m.unshift(D.fulfilled, D.rejected));
    });
    const p = [];
    this.interceptors.response.forEach(function (D) {
      p.push(D.fulfilled, D.rejected);
    });
    let v,
      x = 0,
      E;
    if (!h) {
      const _ = [yp.bind(this), void 0];
      for (
        _.unshift.apply(_, m),
          _.push.apply(_, p),
          E = _.length,
          v = Promise.resolve(i);
        x < E;

      )
        v = v.then(_[x++], _[x++]);
      return v;
    }
    E = m.length;
    let O = i;
    for (x = 0; x < E; ) {
      const _ = m[x++],
        D = m[x++];
      try {
        O = _(O);
      } catch (C) {
        D.call(this, C);
        break;
      }
    }
    try {
      v = yp.call(this, O);
    } catch (_) {
      return Promise.reject(_);
    }
    for (x = 0, E = p.length; x < E; ) v = v.then(p[x++], p[x++]);
    return v;
  }
  getUri(l) {
    l = Zl(this.defaults, l);
    const i = kg(l.baseURL, l.url, l.allowAbsoluteUrls);
    return zg(i, l.params, l.paramsSerializer);
  }
};
q.forEach(["delete", "get", "head", "options"], function (l) {
  Gl.prototype[l] = function (i, r) {
    return this.request(
      Zl(r || {}, { method: l, url: i, data: (r || {}).data })
    );
  };
});
q.forEach(["post", "put", "patch"], function (l) {
  function i(r) {
    return function (f, d, m) {
      return this.request(
        Zl(m || {}, {
          method: l,
          headers: r ? { "Content-Type": "multipart/form-data" } : {},
          url: f,
          data: d,
        })
      );
    };
  }
  (Gl.prototype[l] = i()), (Gl.prototype[l + "Form"] = i(!0));
});
let yw = class Xg {
  constructor(l) {
    if (typeof l != "function")
      throw new TypeError("executor must be a function.");
    let i;
    this.promise = new Promise(function (f) {
      i = f;
    });
    const r = this;
    this.promise.then((c) => {
      if (!r._listeners) return;
      let f = r._listeners.length;
      for (; f-- > 0; ) r._listeners[f](c);
      r._listeners = null;
    }),
      (this.promise.then = (c) => {
        let f;
        const d = new Promise((m) => {
          r.subscribe(m), (f = m);
        }).then(c);
        return (
          (d.cancel = function () {
            r.unsubscribe(f);
          }),
          d
        );
      }),
      l(function (f, d, m) {
        r.reason || ((r.reason = new ni(f, d, m)), i(r.reason));
      });
  }
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  subscribe(l) {
    if (this.reason) {
      l(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(l) : (this._listeners = [l]);
  }
  unsubscribe(l) {
    if (!this._listeners) return;
    const i = this._listeners.indexOf(l);
    i !== -1 && this._listeners.splice(i, 1);
  }
  toAbortSignal() {
    const l = new AbortController(),
      i = (r) => {
        l.abort(r);
      };
    return (
      this.subscribe(i),
      (l.signal.unsubscribe = () => this.unsubscribe(i)),
      l.signal
    );
  }
  static source() {
    let l;
    return {
      token: new Xg(function (c) {
        l = c;
      }),
      cancel: l,
    };
  }
};
function pw(a) {
  return function (i) {
    return a.apply(null, i);
  };
}
function gw(a) {
  return q.isObject(a) && a.isAxiosError === !0;
}
const hd = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
};
Object.entries(hd).forEach(([a, l]) => {
  hd[l] = a;
});
function Pg(a) {
  const l = new Gl(a),
    i = _g(Gl.prototype.request, l);
  return (
    q.extend(i, Gl.prototype, l, { allOwnKeys: !0 }),
    q.extend(i, l, null, { allOwnKeys: !0 }),
    (i.create = function (c) {
      return Pg(Zl(a, c));
    }),
    i
  );
}
const ut = Pg(br);
ut.Axios = Gl;
ut.CanceledError = ni;
ut.CancelToken = yw;
ut.isCancel = Bg;
ut.VERSION = Yg;
ut.toFormData = oc;
ut.AxiosError = Se;
ut.Cancel = ut.CanceledError;
ut.all = function (l) {
  return Promise.all(l);
};
ut.spread = pw;
ut.isAxiosError = gw;
ut.mergeConfig = Zl;
ut.AxiosHeaders = Kt;
ut.formToJSON = (a) => Hg(q.isHTMLForm(a) ? new FormData(a) : a);
ut.getAdapter = Gg.getAdapter;
ut.HttpStatusCode = hd;
ut.default = ut;
const {
    Axios: jA,
    AxiosError: DA,
    CanceledError: UA,
    isCancel: MA,
    CancelToken: zA,
    VERSION: LA,
    all: HA,
    Cancel: BA,
    isAxiosError: qA,
    spread: kA,
    toFormData: VA,
    AxiosHeaders: FA,
    HttpStatusCode: QA,
    formToJSON: GA,
    getAdapter: YA,
    mergeConfig: XA,
  } = ut,
  Ke = ut.create({ baseURL: "/api/v1", withCredentials: !0 });
console.log("production");
Ke.interceptors.request.use(
  (a) => {
    const l = sessionStorage.getItem("accessToken");
    return l && (a.headers.Authorization = `Bearer ${l}`), a;
  },
  (a) => Promise.reject(a)
);
Ke.interceptors.response.use(
  (a) => a,
  async (a) => {
    var r, c, f;
    const l = a.config,
      i = l.url === "/auth/refresh";
    if (
      ((r = a == null ? void 0 : a.response) == null ? void 0 : r.status) ===
        401 &&
      [
        "ACCESS TOKEN EXPIRED",
        "ACCESS TOKEN INVALID",
        "ACCESS TOKEN NOT PROVIDED",
      ].includes(
        (f = (c = a == null ? void 0 : a.response) == null ? void 0 : c.data) ==
          null
          ? void 0
          : f.msg
      ) &&
      !i &&
      !l.retry
    )
      try {
        l.retry = !0;
        const { data: d } = await Ke.get("/auth/refresh");
        return (
          sessionStorage.setItem("accessToken", d.accessToken),
          (l.headers.Authorization = `Bearer ${d.accessToken}`),
          Ke(l)
        );
      } catch (d) {
        return sessionStorage.removeItem("accessToken"), Promise.reject(d);
      }
    return Promise.reject(a);
  }
);
const vw = async (a) => {
    const { data: l } = await Ke.post("/auth/register", { ...a });
    return l;
  },
  bw = async ({ email: a, password: l }) => {
    const { data: i } = await Ke.post("/auth/login", { email: a, password: l });
    return i;
  },
  xw = async () => {
    const { data: a } = await Ke.post("/auth/logout");
    return a;
  },
  Sw = async ({ email: a, type: l }) => {
    const { data: i } = await Ke.post(`/auth/send-email?type=${l}`, {
      email: a,
    });
    return i;
  },
  Ew = async ({ ...a }) => {
    const { data: l } = await Ke.post("/auth/verify-account", a);
    return l;
  },
  ww = async ({ ...a }) => {
    const { data: l } = await Ke.post("/auth/verify-recover-pwd", a);
    return l;
  },
  _w = async ({ ...a }) => {
    const { data: l } = await Ke.patch("/auth/recover-pwd", a);
    return l;
  },
  Rw = async () => {
    const { data: a } = await Ke.get("/auth/refresh");
    return a;
  },
  Zg = () => {
    const { showToastMsg: a } = $t(),
      { logoutUser: l } = Vt(),
      i = mt(),
      { mutate: r, isPending: c } = Mt({
        mutationFn: () => xw(),
        onSuccess: () => {
          a("Logout successful", "SUCCESS");
        },
        onError: (f) => {
          var d, m;
          a(
            ((m =
              (d = f == null ? void 0 : f.response) == null
                ? void 0
                : d.data) == null
              ? void 0
              : m.msg) || (f == null ? void 0 : f.message),
            "ERROR"
          );
        },
        onSettled: () => {
          l(), i("/", { replace: !0 });
        },
      });
    return { isPending: c, mutate: r };
  },
  Aw = () => {
    const [a, l] = w.useState(!1),
      i = w.useRef(null),
      r = w.useRef(null);
    w.useEffect(() => {
      const v = (x) => {
        i.current && !i.current.contains(x.target) && l(!1);
      };
      return (
        document.addEventListener("mousedown", v),
        () => {
          document.removeEventListener("mousedown", v);
        }
      );
    }, []);
    const { mutate: c, isPending: f } = Zg();
    return {
      dropOpen: a,
      dropRef: i,
      toggleDrop: () => l((v) => !v),
      isPending: f,
      handleDropLogout: () => {
        c();
      },
      setDropOpen: l,
      handleMouseEnter: () => {
        r.current && clearTimeout(r.current), l(!0);
      },
      handleMouseLeave: () => {
        r.current = setTimeout(() => {
          l(!1);
        }, 250);
      },
    };
  };
var Tw = {
  cm: !0,
  mm: !0,
  in: !0,
  px: !0,
  pt: !0,
  pc: !0,
  em: !0,
  ex: !0,
  ch: !0,
  rem: !0,
  vw: !0,
  vh: !0,
  vmin: !0,
  vmax: !0,
  "%": !0,
};
function md(a) {
  if (typeof a == "number") return { value: a, unit: "px" };
  var l,
    i = (a.match(/^[0-9.]*/) || "").toString();
  i.includes(".") ? (l = parseFloat(i)) : (l = parseInt(i, 10));
  var r = (a.match(/[^0-9]*$/) || "").toString();
  return Tw[r]
    ? { value: l, unit: r }
    : (console.warn(
        "React Spinners: "
          .concat(a, " is not a valid css value. Defaulting to ")
          .concat(l, "px.")
      ),
      { value: l, unit: "px" });
}
function zs(a) {
  var l = md(a);
  return "".concat(l.value).concat(l.unit);
}
var Kg = function (a, l, i) {
    var r = "react-spinners-".concat(a, "-").concat(i);
    if (typeof window > "u" || !window.document) return r;
    var c = document.createElement("style");
    document.head.appendChild(c);
    var f = c.sheet,
      d = `
    @keyframes `
        .concat(
          r,
          ` {
      `
        )
        .concat(
          l,
          `
    }
  `
        );
    return f && f.insertRule(d, 0), r;
  },
  Ju = function () {
    return (
      (Ju =
        Object.assign ||
        function (a) {
          for (var l, i = 1, r = arguments.length; i < r; i++) {
            l = arguments[i];
            for (var c in l)
              Object.prototype.hasOwnProperty.call(l, c) && (a[c] = l[c]);
          }
          return a;
        }),
      Ju.apply(this, arguments)
    );
  },
  Cw = function (a, l) {
    var i = {};
    for (var r in a)
      Object.prototype.hasOwnProperty.call(a, r) &&
        l.indexOf(r) < 0 &&
        (i[r] = a[r]);
    if (a != null && typeof Object.getOwnPropertySymbols == "function")
      for (var c = 0, r = Object.getOwnPropertySymbols(a); c < r.length; c++)
        l.indexOf(r[c]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(a, r[c]) &&
          (i[r[c]] = a[r[c]]);
    return i;
  },
  Nw = Kg(
    "GridLoader",
    "0% {transform: scale(1)} 50% {transform: scale(0.5); opacity: 0.7} 100% {transform: scale(1); opacity: 1}",
    "grid"
  ),
  pa = function (a) {
    return Math.random() * a;
  };
function Ow(a) {
  var l = a.loading,
    i = l === void 0 ? !0 : l,
    r = a.color,
    c = r === void 0 ? "#000000" : r,
    f = a.speedMultiplier,
    d = f === void 0 ? 1 : f,
    m = a.cssOverride,
    h = m === void 0 ? {} : m,
    p = a.size,
    v = p === void 0 ? 15 : p,
    x = a.margin,
    E = x === void 0 ? 2 : x,
    O = Cw(a, [
      "loading",
      "color",
      "speedMultiplier",
      "cssOverride",
      "size",
      "margin",
    ]),
    _ = md(v),
    D = md(E),
    C = parseFloat(_.value.toString()) * 3 + parseFloat(D.value.toString()) * 6,
    H = Ju(
      {
        width: "".concat(C).concat(_.unit),
        fontSize: 0,
        display: "inline-block",
      },
      h
    ),
    B = function (k) {
      return {
        display: "inline-block",
        backgroundColor: c,
        width: "".concat(zs(v)),
        height: "".concat(zs(v)),
        margin: zs(E),
        borderRadius: "100%",
        animationFillMode: "both",
        animation: ""
          .concat(Nw, " ")
          .concat((k / 100 + 0.6) / d, "s ")
          .concat(k / 100 - 0.2, "s infinite ease"),
      };
    };
  return i
    ? w.createElement(
        "span",
        Ju({ style: H }, O, {
          ref: function (k) {
            k &&
              k.style.setProperty(
                "width",
                "".concat(C).concat(_.unit),
                "important"
              );
          },
        }),
        w.createElement("span", { style: B(pa(100)) }),
        w.createElement("span", { style: B(pa(100)) }),
        w.createElement("span", { style: B(pa(100)) }),
        w.createElement("span", { style: B(pa(100)) }),
        w.createElement("span", { style: B(pa(100)) }),
        w.createElement("span", { style: B(pa(100)) }),
        w.createElement("span", { style: B(pa(100)) }),
        w.createElement("span", { style: B(pa(100)) }),
        w.createElement("span", { style: B(pa(100)) })
      )
    : null;
}
var Wu = function () {
    return (
      (Wu =
        Object.assign ||
        function (a) {
          for (var l, i = 1, r = arguments.length; i < r; i++) {
            l = arguments[i];
            for (var c in l)
              Object.prototype.hasOwnProperty.call(l, c) && (a[c] = l[c]);
          }
          return a;
        }),
      Wu.apply(this, arguments)
    );
  },
  jw = function (a, l) {
    var i = {};
    for (var r in a)
      Object.prototype.hasOwnProperty.call(a, r) &&
        l.indexOf(r) < 0 &&
        (i[r] = a[r]);
    if (a != null && typeof Object.getOwnPropertySymbols == "function")
      for (var c = 0, r = Object.getOwnPropertySymbols(a); c < r.length; c++)
        l.indexOf(r[c]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(a, r[c]) &&
          (i[r[c]] = a[r[c]]);
    return i;
  },
  Dw = Kg(
    "PulseLoader",
    "0% {transform: scale(1); opacity: 1} 45% {transform: scale(0.1); opacity: 0.7} 80% {transform: scale(1); opacity: 1}",
    "pulse"
  );
function Uw(a) {
  var l = a.loading,
    i = l === void 0 ? !0 : l,
    r = a.color,
    c = r === void 0 ? "#000000" : r,
    f = a.speedMultiplier,
    d = f === void 0 ? 1 : f,
    m = a.cssOverride,
    h = m === void 0 ? {} : m,
    p = a.size,
    v = p === void 0 ? 15 : p,
    x = a.margin,
    E = x === void 0 ? 2 : x,
    O = jw(a, [
      "loading",
      "color",
      "speedMultiplier",
      "cssOverride",
      "size",
      "margin",
    ]),
    _ = Wu({ display: "inherit" }, h),
    D = function (C) {
      return {
        backgroundColor: c,
        width: zs(v),
        height: zs(v),
        margin: zs(E),
        borderRadius: "100%",
        display: "inline-block",
        animation: ""
          .concat(Dw, " ")
          .concat(0.75 / d, "s ")
          .concat(
            (C * 0.12) / d,
            "s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08)"
          ),
        animationFillMode: "both",
      };
    };
  return i
    ? w.createElement(
        "span",
        Wu({ style: _ }, O),
        w.createElement("span", { style: D(1) }),
        w.createElement("span", { style: D(2) }),
        w.createElement("span", { style: D(3) })
      )
    : null;
}
const Ls = { sm: 640, md: 768, lg: 1024, xl: 1280 },
  Mw = () => {
    const [a, l] = w.useState(25);
    return (
      w.useEffect(() => {
        const i = () => (window.innerWidth > Ls.sm ? l(40) : l(30));
        return (
          i(),
          window.addEventListener("resize", i),
          () => window.removeEventListener("resize", i)
        );
      }, [l]),
      { size: a }
    );
  },
  Jt = ({ sizeGiven: a, styleGiven: l }) => {
    const { size: i } = Mw();
    return g.jsx("div", {
      className: `w-full flex ${l ?? "justify-center"}`,
      children: g.jsx(Uw, { color: "#f97316", size: a ?? i }),
    });
  },
  Ct = [];
for (let a = 0; a < 256; ++a) Ct.push((a + 256).toString(16).slice(1));
function zw(a, l = 0) {
  return (
    Ct[a[l + 0]] +
    Ct[a[l + 1]] +
    Ct[a[l + 2]] +
    Ct[a[l + 3]] +
    "-" +
    Ct[a[l + 4]] +
    Ct[a[l + 5]] +
    "-" +
    Ct[a[l + 6]] +
    Ct[a[l + 7]] +
    "-" +
    Ct[a[l + 8]] +
    Ct[a[l + 9]] +
    "-" +
    Ct[a[l + 10]] +
    Ct[a[l + 11]] +
    Ct[a[l + 12]] +
    Ct[a[l + 13]] +
    Ct[a[l + 14]] +
    Ct[a[l + 15]]
  ).toLowerCase();
}
let qf;
const Lw = new Uint8Array(16);
function Hw() {
  if (!qf) {
    if (typeof crypto > "u" || !crypto.getRandomValues)
      throw new Error(
        "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported"
      );
    qf = crypto.getRandomValues.bind(crypto);
  }
  return qf(Lw);
}
const Bw =
    typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto),
  gp = { randomUUID: Bw };
function qw(a, l, i) {
  var c;
  if (gp.randomUUID && !a) return gp.randomUUID();
  a = a || {};
  const r = a.random ?? ((c = a.rng) == null ? void 0 : c.call(a)) ?? Hw();
  if (r.length < 16) throw new Error("Random bytes length must be >= 16");
  return (r[6] = (r[6] & 15) | 64), (r[8] = (r[8] & 63) | 128), zw(r);
}
const Ce = () => qw(),
  kw = [{ id: Ce(), path: "/", label: "Home", svg: FS }],
  $g = [
    { id: Ce(), path: "/user/profile", label: "Profile", svg: ig },
    {
      id: Ce(),
      path: "/user/manage-account",
      label: "Manage Account",
      svg: rE,
    },
  ],
  Jg = [
    { id: Ce(), path: "/auth/login", label: "Login", svg: ng },
    {
      id: Ce(),
      path: "/auth/send-email?type=recover-pwd",
      label: "Recover Password",
      from: "/auth/login",
      svg: tg,
    },
    { id: Ce(), path: "/auth/register", label: "Register", svg: sg },
    {
      id: Ce(),
      path: "/auth/send-email?type=verify-account",
      label: "Verify Account",
      from: "/auth/register",
      svg: lg,
    },
  ],
  Vw = () => {
    const {
      dropOpen: a,
      dropRef: l,
      setDropOpen: i,
      toggleDrop: r,
      isPending: c,
      handleDropLogout: f,
      handleMouseEnter: d,
      handleMouseLeave: m,
    } = Aw();
    return g.jsxs("div", {
      ref: l,
      className: "flex items-center justify-center cursor-pointer relative",
      children: [
        g.jsx("div", {
          onMouseEnter: d,
          onMouseLeave: m,
          onClick: r,
          className:
            "txt__01 transition-all duration-300 hover:text-orange-500 hover:scale-120 border-2 py-1 px-2 rounded-xl",
          children: sessionStorage.getItem("initName") ?? "",
        }),
        g.jsx("div", {
          onMouseEnter: d,
          onMouseLeave: m,
          className: `absolute border-2 border-orange-500 bg-[#111] -top-full -right-full h-fit w-fit min-w-[300px] rounded-xl z-10 transition-all duration-300 ${
            a
              ? "translate-y-[50%] opacity-100"
              : "opacity-0 translate-y-0 pointer-events-none"
          }`,
          children: g.jsxs("div", {
            className: "w-full flex flex-col items-start",
            children: [
              $g.map((h) =>
                g.jsxs(
                  Yl,
                  {
                    onClick: () => i(!1),
                    to: h.path,
                    className:
                      "w-full flex gap-3 border-b-orange-500 border-b-2 pl-3 pr-10 py-3 justify-start group",
                    children: [
                      g.jsx(h.svg, { className: "svg__drop" }),
                      g.jsx("span", {
                        className:
                          "txt__02 transition-all duration-300 group-hover:text-orange-500",
                        children: h.label,
                      }),
                    ],
                  },
                  h.id
                )
              ),
              c
                ? g.jsx("div", {
                    className:
                      "h-[50px] w-full flex items-center justify-center",
                    children: g.jsx(Jt, { sizeGiven: 25 }),
                  })
                : g.jsxs("button", {
                    onClick: f,
                    className:
                      "w-full cursor-pointer flex gap-3 pl-3 pr-10 py-3 justify-start group",
                    children: [
                      g.jsx(ag, { className: "svg__drop" }),
                      g.jsx("span", {
                        className:
                          "txt__02 group-hover:text-orange-500 duration-300 transition-all",
                        children: "Logout",
                      }),
                    ],
                  }),
            ],
          }),
        }),
      ],
    });
  },
  Fw = () => {
    const [a, l] = w.useState(!1),
      i = w.useRef(null),
      r = w.useRef(null),
      c = mt();
    return (
      w.useEffect(() => {
        const p = (v) => {
          i.current && !i.current.contains(v.target) && l(!1);
        };
        return (
          document.addEventListener("mousedown", p),
          () => {
            document.removeEventListener("mousedown", p);
          }
        );
      }, []),
      {
        toggleDrop: () => l((p) => !p),
        dropOpen: a,
        dropRef: i,
        handleSideClick: (p, v) => {
          c(p, v ? { state: { from: v } } : void 0), l(!1);
        },
        setDropOpen: l,
        handleMouseEnter: () => {
          r.current && clearTimeout(r.current), l(!0);
        },
        handleMouseLeave: () => {
          r.current = setTimeout(() => {
            l(!1);
          }, 250);
        },
      }
    );
  },
  Qw = () => {
    const {
      toggleDrop: a,
      dropOpen: l,
      dropRef: i,
      handleSideClick: r,
      handleMouseEnter: c,
      handleMouseLeave: f,
    } = Fw();
    return g.jsxs("div", {
      ref: i,
      className: "flex items-center justify-center cursor-pointer relative",
      children: [
        g.jsx("div", {
          onMouseEnter: c,
          onMouseLeave: f,
          onClick: a,
          className: "txt__01",
          children: g.jsx(ig, {
            className:
              "w-[37.5px] h-[37.5px] transition-all duration-300 hover:text-orange-500 hover:scale-120",
          }),
        }),
        g.jsx("div", {
          onMouseEnter: c,
          onMouseLeave: f,
          className: `absolute border-2 border-orange-500 bg-[#111] -top-full -right-full h-fit w-fit rounded-xl z-10 transition-all duration-300  ${
            l
              ? "translate-y-[40%] opacity-100"
              : "opacity-0 translate-y-0 pointer-events-none"
          }`,
          children: g.jsx("div", {
            className: "w-full flex flex-col items-start",
            children: Jg.map((d) =>
              g.jsxs(
                "button",
                {
                  onClick: () => r(d.path, d == null ? void 0 : d.from),
                  className:
                    "min-w-[300px] w-full flex gap-3 border-b-orange-500 border-b-2 pl-3 pr-10 py-3 justify-start group cursor-pointer",
                  children: [
                    g.jsx(d.svg, { className: "svg__drop" }),
                    g.jsx("span", {
                      className:
                        "txt__02 transition-all duration-300 group-hover:text-orange-500",
                      children: d.label,
                    }),
                  ],
                },
                d.id
              )
            ),
          }),
        }),
      ],
    });
  },
  Gw = ({ setSideOpen: a, sideOpen: l }) => {
    const { isLogged: i } = Vt(),
      c = ct().pathname !== "/notice-email-sent";
    return g.jsx("div", {
      className:
        "sticky top-0 left-0 h-[75px] w-full border-b-3 border-orange-500 bg-[#111] pad__page flex items-center header__i",
      children: g.jsxs("div", {
        className: "w-full grid grid-cols-2",
        children: [
          g.jsx(Yl, {
            className: "txt__05 text-orange-500 max-w-fit",
            to: "/",
            children: "MERN__EAT",
          }),
          c &&
            g.jsxs("div", {
              className: "flex w-full gap-5 items-center justify-end",
              children: [
                i ? g.jsx(Vw, {}) : g.jsx(Qw, {}),
                l
                  ? g.jsx("div", {
                      onClick: () => (a == null ? void 0 : a(!1)),
                      className:
                        "max-w-fit justify-self-end group flex items-center",
                      children: g.jsx(rg, { className: "svg__header" }),
                    })
                  : g.jsx("div", {
                      onClick: () => (a == null ? void 0 : a(!0)),
                      className:
                        "max-w-fit justify-self-end group flex items-center",
                      children: g.jsx(JS, { className: "svg__header" }),
                    }),
              ],
            }),
        ],
      }),
    });
  },
  Yw = ({ sideRef: a, setSideOpen: l }) => {
    const i = mt();
    w.useEffect(() => {
      const m = (h) => {
        var p;
        ((p = a.current) != null && p.contains(h.target)) || l(!1);
      };
      return (
        document.addEventListener("mousedown", m),
        () => {
          document.removeEventListener("mousedown", m);
        }
      );
    }, [l, a]);
    const { mutate: r, isPending: c } = Zg();
    return {
      isPending: c,
      handleLogout: () => r(),
      handleSideClick: (m, h) => {
        i(m, h ? { state: { from: h } } : void 0), l(!1);
      },
    };
  },
  Xw = ({ location: a, el: l, type: i }) =>
    l != null && l.from && i
      ? i === l.path.split("=")[1]
        ? "active"
        : ""
      : a.pathname === l.path
      ? "active"
      : "",
  kf = ({ handleSideClick: a, type: l, location: i, el: r }) =>
    g.jsxs(
      "button",
      {
        onClick: () => a(r.path, r == null ? void 0 : r.from),
        className: `ml-3 w-full cursor-pointer flex gap-3 group max-w-fit items-center el__after_below sideLink ${Xw(
          { location: i, el: r, type: l }
        )}`,
        children: [
          g.jsx(r.svg, { className: "svg__sidebar" }),
          g.jsx("span", {
            className:
              "cursor-pointer txt__02 group-hover:text-orange-500 transition-all duration-300",
            children: r.label,
          }),
        ],
      },
      r.id
    ),
  Pw = ({ handleLogout: a, isPending: l }) =>
    l
      ? g.jsx(Jt, { styleGiven: "justify-start" })
      : g.jsxs("button", {
          onClick: a,
          className:
            "ml-3 w-full flex gap-3 group max-w-fit items-center el__after_below",
          children: [
            g.jsx(ag, { className: "svg__sidebar" }),
            g.jsx("span", {
              className:
                "cursor-pointer txt__02 group-hover:text-orange-500 transition-all duration-300",
              children: "Logout",
            }),
          ],
        }),
  Zw = ({ currUser: a }) =>
    g.jsx("div", {
      className: "w-full flex items-center border-b-2 border-orange-500",
      children: g.jsxs("div", {
        className: "w-full flex items-center pb-4 pl-3 gap-3",
        children: [
          g.jsx(_S, {
            className: " w-[35px] h-[35px] sm:w-[40px] sm:h-[40px]",
          }),
          g.jsx("span", {
            className: "txt__02 max-w-full truncate",
            children: a.email,
          }),
        ],
      }),
    }),
  Kw = ({ sideOpen: a, setSideOpen: l }) => {
    const i = w.useRef(null),
      r = ct(),
      [c] = rl(),
      f = c.get("type"),
      { isLogged: d, currUser: m } = Vt(),
      {
        isPending: h,
        handleLogout: p,
        handleSideClick: v,
      } = Yw({ sideRef: i, setSideOpen: l });
    return g.jsxs(g.Fragment, {
      children: [
        g.jsx("div", {
          className: `${
            a ? "fixed" : "hidden"
          } inset-0 bg-black/50 sidebar__i_bg transition-none`,
        }),
        g.jsx("div", {
          ref: i,
          className: `${
            a ? "translate-x-0" : "translate-x-full"
          } sidebar__content sidebar__i_content`,
          children: g.jsxs("div", {
            className: "w-full grid grid-cols-1 justify-items-start gap-5 pt-4",
            children: [
              m && g.jsx(Zw, { currUser: m }),
              kw.map((x) =>
                g.jsx(
                  kf,
                  { handleSideClick: v, type: f, location: r, el: x },
                  x.id
                )
              ),
              d
                ? $g.map((x) =>
                    g.jsx(
                      kf,
                      { handleSideClick: v, type: f, location: r, el: x },
                      x.id
                    )
                  )
                : Jg.map((x) =>
                    g.jsx(
                      kf,
                      { handleSideClick: v, type: f, location: r, el: x },
                      x.id
                    )
                  ),
              d && g.jsx(Pw, { isPending: h, handleLogout: p }),
            ],
          }),
        }),
      ],
    });
  },
  $w = "/assets/hero-C0USUQ76.avif",
  Jw = "/assets/hero_2-My4mLI9C.avif",
  Ww = "/assets/hero_5-DfOWyyJE.avif",
  Iw = "/assets/hero_6-B4eY8YHC.avif",
  yd = [
    { id: Ce(), img: $w },
    { id: Ce(), img: Jw },
    { id: Ce(), img: Ww },
    { id: Ce(), img: Iw },
  ],
  e_ = () => {
    const [a, l] = w.useState(0),
      [i, r] = w.useState(!1),
      [c, f] = w.useState(100);
    w.useEffect(() => {
      const h = () =>
        window.innerWidth <= Ls.md
          ? f(100)
          : window.innerWidth <= Ls.lg
          ? f(90)
          : window.innerWidth <= Ls.xl
          ? f(80)
          : f(75);
      return (
        h(),
        window.addEventListener("resize", h),
        () => window.removeEventListener("resize", h)
      );
    }, []);
    const d = w.useCallback(() => {
        a === yd.length - 1 ? l(0) : l((h) => h + 1);
      }, [a]),
      m = () => {
        l(a === 0 ? yd.length - 1 : (h) => h - 1);
      };
    return (
      w.useEffect(() => {
        if (i) return;
        const h = setInterval(() => {
          d();
        }, 1500);
        return () => clearInterval(h);
      }, [i, d]),
      {
        activeIndx: a,
        handleNext: d,
        handlePrev: m,
        setBtnClicked: r,
        translateVal: c,
      }
    );
  },
  t_ = () => {
    const {
      activeIndx: a,
      handleNext: l,
      handlePrev: i,
      setBtnClicked: r,
      translateVal: c,
    } = e_();
    return g.jsx("div", {
      className: "pad__page w-full pt-5 flex flex-col justify-center",
      children: g.jsxs("div", {
        className: "w-full flex items-center relative",
        children: [
          g.jsx("button", {
            onClick: () => {
              r(!0), i();
            },
            className:
              "absolute top-1/2 left-0 -translate-y-1/2 hero__i_arrow outline-none",
            children: g.jsx(gS, {
              className:
                "h-[50px] w-[50px] text-orange-500 btn__pseudo hover:scale-120",
            }),
          }),
          g.jsx("div", {
            className:
              "w-full flex justify-items-center gap-[10%] overflow-x-auto hide_scrollbar snap-mandatory snap-x p-6 border-2 border-orange-500 rounded-xl",
            children: yd.map((f) =>
              g.jsx(
                "div",
                {
                  className:
                    "min-w-[75vw] sm:min-w-[450px] snap-center rounded-xl transition-all duration-500 overflow-hidden",
                  style: { transform: `translateX(-${a * c + a * 10}%)` },
                  children: g.jsx("img", {
                    src: f.img,
                    alt: "burger_hero",
                    className: "w-full object-cover h-fit ",
                  }),
                },
                f.id
              )
            ),
          }),
          g.jsx("button", {
            onClick: () => {
              r(!0), l();
            },
            className:
              "absolute top-1/2 right-0 -translate-y-1/2 hero__i_arrow outline-none",
            children: g.jsx(bS, {
              className:
                "h-[50px] w-[50px] text-orange-500 btn__pseudo hover:scale-120",
            }),
          }),
        ],
      }),
    });
  },
  n_ = async ({ type: a }) => {
    const { data: l } = await Ke.patch("/newsletter/toggle-logged", {
      type: a,
    });
    return l;
  },
  a_ = async (a) => {
    const { data: l } = await Ke.post("/newsletter/subscribe-non-logged", {
      email: a,
    });
    return l;
  },
  l_ = async (a) => {
    const { data: l } = await Ke.patch(
      "/newsletter/unsubscribe-via-link-logged",
      a
    );
    return l;
  },
  s_ = async (a) => {
    const { data: l } = await Ke.delete(
      "/newsletter/unsubscribe-via-link-non-logged",
      { data: a }
    );
    return l;
  },
  i_ = async ({ email: a }) => {
    const { data: l } = await Ke.post("/newsletter/send-email-unsubscribe", {
      email: a,
    });
    return l;
  },
  r_ = ({ showToastMsg: a, handleErrAPI: l }) => {
    const { setCurrUser: i } = Vt(),
      { mutate: r, isPending: c } = Mt({
        mutationFn: ({ type: f }) => n_({ type: f }),
        onSuccess: (f) => {
          var d;
          i({ user: f == null ? void 0 : f.user }),
            a(
              `You have ${
                (d = f == null ? void 0 : f.user) != null &&
                d.hasSubscribedToNewsletter
                  ? "subscribed"
                  : "unsubscribed"
              } to our newsletter successfully`,
              "SUCCESS"
            );
        },
        onError: (f) => {
          var d, m, h;
          ((d = f == null ? void 0 : f.response) == null
            ? void 0
            : d.status) === 401
            ? l({ err: f })
            : a(
                ((h =
                  (m = f == null ? void 0 : f.response) == null
                    ? void 0
                    : m.data) == null
                  ? void 0
                  : h.msg) || f.message,
                "ERROR"
              );
        },
      });
    return { mutate: r, isPending: c };
  };
var xr = (a) => a.type === "checkbox",
  zl = (a) => a instanceof Date,
  kt = (a) => a == null;
const Wg = (a) => typeof a == "object";
var rt = (a) => !kt(a) && !Array.isArray(a) && Wg(a) && !zl(a),
  u_ = (a) =>
    rt(a) && a.target ? (xr(a.target) ? a.target.checked : a.target.value) : a,
  c_ = (a) => a.substring(0, a.search(/\.\d+(\.|$)/)) || a,
  o_ = (a, l) => a.has(c_(l)),
  f_ = (a) => {
    const l = a.constructor && a.constructor.prototype;
    return rt(l) && l.hasOwnProperty("isPrototypeOf");
  },
  Bd =
    typeof window < "u" &&
    typeof window.HTMLElement < "u" &&
    typeof document < "u";
function xn(a) {
  let l;
  const i = Array.isArray(a),
    r = typeof FileList < "u" ? a instanceof FileList : !1;
  if (a instanceof Date) l = new Date(a);
  else if (a instanceof Set) l = new Set(a);
  else if (!(Bd && (a instanceof Blob || r)) && (i || rt(a)))
    if (((l = i ? [] : {}), !i && !f_(a))) l = a;
    else for (const c in a) a.hasOwnProperty(c) && (l[c] = xn(a[c]));
  else return a;
  return l;
}
var hc = (a) => (Array.isArray(a) ? a.filter(Boolean) : []),
  ht = (a) => a === void 0,
  ie = (a, l, i) => {
    if (!l || !rt(a)) return i;
    const r = hc(l.split(/[,[\].]+?/)).reduce((c, f) => (kt(c) ? c : c[f]), a);
    return ht(r) || r === a ? (ht(a[l]) ? i : a[l]) : r;
  },
  Yn = (a) => typeof a == "boolean",
  qd = (a) => /^\w*$/.test(a),
  Ig = (a) => hc(a.replace(/["|']|\]/g, "").split(/\.|\[/)),
  Ze = (a, l, i) => {
    let r = -1;
    const c = qd(l) ? [l] : Ig(l),
      f = c.length,
      d = f - 1;
    for (; ++r < f; ) {
      const m = c[r];
      let h = i;
      if (r !== d) {
        const p = a[m];
        h = rt(p) || Array.isArray(p) ? p : isNaN(+c[r + 1]) ? {} : [];
      }
      if (m === "__proto__" || m === "constructor" || m === "prototype") return;
      (a[m] = h), (a = a[m]);
    }
    return a;
  };
const vp = { BLUR: "blur", FOCUS_OUT: "focusout" },
  Un = {
    onBlur: "onBlur",
    onChange: "onChange",
    onSubmit: "onSubmit",
    onTouched: "onTouched",
    all: "all",
  },
  ga = {
    max: "max",
    min: "min",
    maxLength: "maxLength",
    minLength: "minLength",
    pattern: "pattern",
    required: "required",
    validate: "validate",
  };
Sn.createContext(null);
var d_ = (a, l, i, r = !0) => {
    const c = { defaultValues: l._defaultValues };
    for (const f in a)
      Object.defineProperty(c, f, {
        get: () => {
          const d = f;
          return (
            l._proxyFormState[d] !== Un.all &&
              (l._proxyFormState[d] = !r || Un.all),
            a[d]
          );
        },
      });
    return c;
  },
  Pt = (a) => rt(a) && !Object.keys(a).length,
  h_ = (a, l, i, r) => {
    i(a);
    const { name: c, ...f } = a;
    return (
      Pt(f) ||
      Object.keys(f).length >= Object.keys(l).length ||
      Object.keys(f).find((d) => l[d] === Un.all)
    );
  },
  Gu = (a) => (Array.isArray(a) ? a : [a]);
function m_(a) {
  const l = Sn.useRef(a);
  (l.current = a),
    Sn.useEffect(() => {
      const i =
        !a.disabled &&
        l.current.subject &&
        l.current.subject.subscribe({ next: l.current.next });
      return () => {
        i && i.unsubscribe();
      };
    }, [a.disabled]);
}
var Jn = (a) => typeof a == "string",
  y_ = (a, l, i, r, c) =>
    Jn(a)
      ? (r && l.watch.add(a), ie(i, a, c))
      : Array.isArray(a)
      ? a.map((f) => (r && l.watch.add(f), ie(i, f)))
      : (r && (l.watchAll = !0), i),
  p_ = (a, l, i, r, c) =>
    l
      ? {
          ...i[a],
          types: { ...(i[a] && i[a].types ? i[a].types : {}), [r]: c || !0 },
        }
      : {},
  bp = (a) => ({
    isOnSubmit: !a || a === Un.onSubmit,
    isOnBlur: a === Un.onBlur,
    isOnChange: a === Un.onChange,
    isOnAll: a === Un.all,
    isOnTouch: a === Un.onTouched,
  }),
  xp = (a, l, i) =>
    !i &&
    (l.watchAll ||
      l.watch.has(a) ||
      [...l.watch].some(
        (r) => a.startsWith(r) && /^\.\w+/.test(a.slice(r.length))
      ));
const ur = (a, l, i, r) => {
  for (const c of i || Object.keys(a)) {
    const f = ie(a, c);
    if (f) {
      const { _f: d, ...m } = f;
      if (d) {
        if (d.refs && d.refs[0] && l(d.refs[0], c) && !r) return !0;
        if (d.ref && l(d.ref, d.name) && !r) return !0;
        if (ur(m, l)) break;
      } else if (rt(m) && ur(m, l)) break;
    }
  }
};
var g_ = (a, l, i) => {
    const r = Gu(ie(a, i));
    return Ze(r, "root", l[i]), Ze(a, i, r), a;
  },
  kd = (a) => a.type === "file",
  $n = (a) => typeof a == "function",
  Iu = (a) => {
    if (!Bd) return !1;
    const l = a ? a.ownerDocument : 0;
    return (
      a instanceof
      (l && l.defaultView ? l.defaultView.HTMLElement : HTMLElement)
    );
  },
  Yu = (a) => Jn(a),
  Vd = (a) => a.type === "radio",
  ec = (a) => a instanceof RegExp;
const Sp = { value: !1, isValid: !1 },
  Ep = { value: !0, isValid: !0 };
var ev = (a) => {
  if (Array.isArray(a)) {
    if (a.length > 1) {
      const l = a
        .filter((i) => i && i.checked && !i.disabled)
        .map((i) => i.value);
      return { value: l, isValid: !!l.length };
    }
    return a[0].checked && !a[0].disabled
      ? a[0].attributes && !ht(a[0].attributes.value)
        ? ht(a[0].value) || a[0].value === ""
          ? Ep
          : { value: a[0].value, isValid: !0 }
        : Ep
      : Sp;
  }
  return Sp;
};
const wp = { isValid: !1, value: null };
var tv = (a) =>
  Array.isArray(a)
    ? a.reduce(
        (l, i) =>
          i && i.checked && !i.disabled ? { isValid: !0, value: i.value } : l,
        wp
      )
    : wp;
function _p(a, l, i = "validate") {
  if (Yu(a) || (Array.isArray(a) && a.every(Yu)) || (Yn(a) && !a))
    return { type: i, message: Yu(a) ? a : "", ref: l };
}
var Us = (a) => (rt(a) && !ec(a) ? a : { value: a, message: "" }),
  Rp = async (a, l, i, r, c, f) => {
    const {
        ref: d,
        refs: m,
        required: h,
        maxLength: p,
        minLength: v,
        min: x,
        max: E,
        pattern: O,
        validate: _,
        name: D,
        valueAsNumber: C,
        mount: H,
      } = a._f,
      B = ie(i, D);
    if (!H || l.has(D)) return {};
    const k = m ? m[0] : d,
      ne = (de) => {
        c &&
          k.reportValidity &&
          (k.setCustomValidity(Yn(de) ? "" : de || ""), k.reportValidity());
      },
      Y = {},
      ee = Vd(d),
      fe = xr(d),
      I = ee || fe,
      X =
        ((C || kd(d)) && ht(d.value) && ht(B)) ||
        (Iu(d) && d.value === "") ||
        B === "" ||
        (Array.isArray(B) && !B.length),
      le = p_.bind(null, D, r, Y),
      Ve = (de, xe, ze, Ee = ga.maxLength, K = ga.minLength) => {
        const ce = de ? xe : ze;
        Y[D] = {
          type: de ? Ee : K,
          message: ce,
          ref: d,
          ...le(de ? Ee : K, ce),
        };
      };
    if (
      f
        ? !Array.isArray(B) || !B.length
        : h &&
          ((!I && (X || kt(B))) ||
            (Yn(B) && !B) ||
            (fe && !ev(m).isValid) ||
            (ee && !tv(m).isValid))
    ) {
      const { value: de, message: xe } = Yu(h)
        ? { value: !!h, message: h }
        : Us(h);
      if (
        de &&
        ((Y[D] = {
          type: ga.required,
          message: xe,
          ref: k,
          ...le(ga.required, xe),
        }),
        !r)
      )
        return ne(xe), Y;
    }
    if (!X && (!kt(x) || !kt(E))) {
      let de, xe;
      const ze = Us(E),
        Ee = Us(x);
      if (!kt(B) && !isNaN(B)) {
        const K = d.valueAsNumber || (B && +B);
        kt(ze.value) || (de = K > ze.value),
          kt(Ee.value) || (xe = K < Ee.value);
      } else {
        const K = d.valueAsDate || new Date(B),
          ce = (T) => new Date(new Date().toDateString() + " " + T),
          he = d.type == "time",
          Le = d.type == "week";
        Jn(ze.value) &&
          B &&
          (de = he
            ? ce(B) > ce(ze.value)
            : Le
            ? B > ze.value
            : K > new Date(ze.value)),
          Jn(Ee.value) &&
            B &&
            (xe = he
              ? ce(B) < ce(Ee.value)
              : Le
              ? B < Ee.value
              : K < new Date(Ee.value));
      }
      if ((de || xe) && (Ve(!!de, ze.message, Ee.message, ga.max, ga.min), !r))
        return ne(Y[D].message), Y;
    }
    if ((p || v) && !X && (Jn(B) || (f && Array.isArray(B)))) {
      const de = Us(p),
        xe = Us(v),
        ze = !kt(de.value) && B.length > +de.value,
        Ee = !kt(xe.value) && B.length < +xe.value;
      if ((ze || Ee) && (Ve(ze, de.message, xe.message), !r))
        return ne(Y[D].message), Y;
    }
    if (O && !X && Jn(B)) {
      const { value: de, message: xe } = Us(O);
      if (
        ec(de) &&
        !B.match(de) &&
        ((Y[D] = {
          type: ga.pattern,
          message: xe,
          ref: d,
          ...le(ga.pattern, xe),
        }),
        !r)
      )
        return ne(xe), Y;
    }
    if (_) {
      if ($n(_)) {
        const de = await _(B, i),
          xe = _p(de, k);
        if (xe && ((Y[D] = { ...xe, ...le(ga.validate, xe.message) }), !r))
          return ne(xe.message), Y;
      } else if (rt(_)) {
        let de = {};
        for (const xe in _) {
          if (!Pt(de) && !r) break;
          const ze = _p(await _[xe](B, i), k, xe);
          ze &&
            ((de = { ...ze, ...le(xe, ze.message) }),
            ne(ze.message),
            r && (Y[D] = de));
        }
        if (!Pt(de) && ((Y[D] = { ref: k, ...de }), !r)) return Y;
      }
    }
    return ne(!0), Y;
  };
function v_(a, l) {
  const i = l.slice(0, -1).length;
  let r = 0;
  for (; r < i; ) a = ht(a) ? r++ : a[l[r++]];
  return a;
}
function b_(a) {
  for (const l in a) if (a.hasOwnProperty(l) && !ht(a[l])) return !1;
  return !0;
}
function gt(a, l) {
  const i = Array.isArray(l) ? l : qd(l) ? [l] : Ig(l),
    r = i.length === 1 ? a : v_(a, i),
    c = i.length - 1,
    f = i[c];
  return (
    r && delete r[f],
    c !== 0 &&
      ((rt(r) && Pt(r)) || (Array.isArray(r) && b_(r))) &&
      gt(a, i.slice(0, -1)),
    a
  );
}
var Vf = () => {
    let a = [];
    return {
      get observers() {
        return a;
      },
      next: (c) => {
        for (const f of a) f.next && f.next(c);
      },
      subscribe: (c) => (
        a.push(c),
        {
          unsubscribe: () => {
            a = a.filter((f) => f !== c);
          },
        }
      ),
      unsubscribe: () => {
        a = [];
      },
    };
  },
  pd = (a) => kt(a) || !Wg(a);
function Ka(a, l) {
  if (pd(a) || pd(l)) return a === l;
  if (zl(a) && zl(l)) return a.getTime() === l.getTime();
  const i = Object.keys(a),
    r = Object.keys(l);
  if (i.length !== r.length) return !1;
  for (const c of i) {
    const f = a[c];
    if (!r.includes(c)) return !1;
    if (c !== "ref") {
      const d = l[c];
      if (
        (zl(f) && zl(d)) ||
        (rt(f) && rt(d)) ||
        (Array.isArray(f) && Array.isArray(d))
          ? !Ka(f, d)
          : f !== d
      )
        return !1;
    }
  }
  return !0;
}
var nv = (a) => a.type === "select-multiple",
  x_ = (a) => Vd(a) || xr(a),
  Ff = (a) => Iu(a) && a.isConnected,
  av = (a) => {
    for (const l in a) if ($n(a[l])) return !0;
    return !1;
  };
function tc(a, l = {}) {
  const i = Array.isArray(a);
  if (rt(a) || i)
    for (const r in a)
      Array.isArray(a[r]) || (rt(a[r]) && !av(a[r]))
        ? ((l[r] = Array.isArray(a[r]) ? [] : {}), tc(a[r], l[r]))
        : kt(a[r]) || (l[r] = !0);
  return l;
}
function lv(a, l, i) {
  const r = Array.isArray(a);
  if (rt(a) || r)
    for (const c in a)
      Array.isArray(a[c]) || (rt(a[c]) && !av(a[c]))
        ? ht(l) || pd(i[c])
          ? (i[c] = Array.isArray(a[c]) ? tc(a[c], []) : { ...tc(a[c]) })
          : lv(a[c], kt(l) ? {} : l[c], i[c])
        : (i[c] = !Ka(a[c], l[c]));
  return i;
}
var sr = (a, l) => lv(a, l, tc(l)),
  sv = (a, { valueAsNumber: l, valueAsDate: i, setValueAs: r }) =>
    ht(a)
      ? a
      : l
      ? a === ""
        ? NaN
        : a && +a
      : i && Jn(a)
      ? new Date(a)
      : r
      ? r(a)
      : a;
function Qf(a) {
  const l = a.ref;
  return kd(l)
    ? l.files
    : Vd(l)
    ? tv(a.refs).value
    : nv(l)
    ? [...l.selectedOptions].map(({ value: i }) => i)
    : xr(l)
    ? ev(a.refs).value
    : sv(ht(l.value) ? a.ref.value : l.value, a);
}
var S_ = (a, l, i, r) => {
    const c = {};
    for (const f of a) {
      const d = ie(l, f);
      d && Ze(c, f, d._f);
    }
    return {
      criteriaMode: i,
      names: [...a],
      fields: c,
      shouldUseNativeValidation: r,
    };
  },
  ir = (a) =>
    ht(a)
      ? a
      : ec(a)
      ? a.source
      : rt(a)
      ? ec(a.value)
        ? a.value.source
        : a.value
      : a;
const Ap = "AsyncFunction";
var E_ = (a) =>
    !!a &&
    !!a.validate &&
    !!(
      ($n(a.validate) && a.validate.constructor.name === Ap) ||
      (rt(a.validate) &&
        Object.values(a.validate).find((l) => l.constructor.name === Ap))
    ),
  w_ = (a) =>
    a.mount &&
    (a.required ||
      a.min ||
      a.max ||
      a.maxLength ||
      a.minLength ||
      a.pattern ||
      a.validate);
function Tp(a, l, i) {
  const r = ie(a, i);
  if (r || qd(i)) return { error: r, name: i };
  const c = i.split(".");
  for (; c.length; ) {
    const f = c.join("."),
      d = ie(l, f),
      m = ie(a, f);
    if (d && !Array.isArray(d) && i !== f) return { name: i };
    if (m && m.type) return { name: f, error: m };
    c.pop();
  }
  return { name: i };
}
var __ = (a, l, i, r, c) =>
    c.isOnAll
      ? !1
      : !i && c.isOnTouch
      ? !(l || a)
      : (i ? r.isOnBlur : c.isOnBlur)
      ? !a
      : (i ? r.isOnChange : c.isOnChange)
      ? a
      : !0,
  R_ = (a, l) => !hc(ie(a, l)).length && gt(a, l);
const A_ = {
  mode: Un.onSubmit,
  reValidateMode: Un.onChange,
  shouldFocusError: !0,
};
function T_(a = {}) {
  let l = { ...A_, ...a },
    i = {
      submitCount: 0,
      isDirty: !1,
      isLoading: $n(l.defaultValues),
      isValidating: !1,
      isSubmitted: !1,
      isSubmitting: !1,
      isSubmitSuccessful: !1,
      isValid: !1,
      touchedFields: {},
      dirtyFields: {},
      validatingFields: {},
      errors: l.errors || {},
      disabled: l.disabled || !1,
    },
    r = {},
    c =
      rt(l.defaultValues) || rt(l.values)
        ? xn(l.defaultValues || l.values) || {}
        : {},
    f = l.shouldUnregister ? {} : xn(c),
    d = { action: !1, mount: !1, watch: !1 },
    m = {
      mount: new Set(),
      disabled: new Set(),
      unMount: new Set(),
      array: new Set(),
      watch: new Set(),
    },
    h,
    p = 0;
  const v = {
      isDirty: !1,
      dirtyFields: !1,
      validatingFields: !1,
      touchedFields: !1,
      isValidating: !1,
      isValid: !1,
      errors: !1,
    },
    x = { values: Vf(), array: Vf(), state: Vf() },
    E = bp(l.mode),
    O = bp(l.reValidateMode),
    _ = l.criteriaMode === Un.all,
    D = (A) => (z) => {
      clearTimeout(p), (p = setTimeout(A, z));
    },
    C = async (A) => {
      if (!l.disabled && (v.isValid || A)) {
        const z = l.resolver ? Pt((await I()).errors) : await le(r, !0);
        z !== i.isValid && x.state.next({ isValid: z });
      }
    },
    H = (A, z) => {
      !l.disabled &&
        (v.isValidating || v.validatingFields) &&
        ((A || Array.from(m.mount)).forEach((V) => {
          V && (z ? Ze(i.validatingFields, V, z) : gt(i.validatingFields, V));
        }),
        x.state.next({
          validatingFields: i.validatingFields,
          isValidating: !Pt(i.validatingFields),
        }));
    },
    B = (A, z = [], V, W, J = !0, $ = !0) => {
      if (W && V && !l.disabled) {
        if (((d.action = !0), $ && Array.isArray(ie(r, A)))) {
          const re = V(ie(r, A), W.argA, W.argB);
          J && Ze(r, A, re);
        }
        if ($ && Array.isArray(ie(i.errors, A))) {
          const re = V(ie(i.errors, A), W.argA, W.argB);
          J && Ze(i.errors, A, re), R_(i.errors, A);
        }
        if (v.touchedFields && $ && Array.isArray(ie(i.touchedFields, A))) {
          const re = V(ie(i.touchedFields, A), W.argA, W.argB);
          J && Ze(i.touchedFields, A, re);
        }
        v.dirtyFields && (i.dirtyFields = sr(c, f)),
          x.state.next({
            name: A,
            isDirty: de(A, z),
            dirtyFields: i.dirtyFields,
            errors: i.errors,
            isValid: i.isValid,
          });
      } else Ze(f, A, z);
    },
    k = (A, z) => {
      Ze(i.errors, A, z), x.state.next({ errors: i.errors });
    },
    ne = (A) => {
      (i.errors = A), x.state.next({ errors: i.errors, isValid: !1 });
    },
    Y = (A, z, V, W) => {
      const J = ie(r, A);
      if (J) {
        const $ = ie(f, A, ht(V) ? ie(c, A) : V);
        ht($) || (W && W.defaultChecked) || z
          ? Ze(f, A, z ? $ : Qf(J._f))
          : Ee(A, $),
          d.mount && C();
      }
    },
    ee = (A, z, V, W, J) => {
      let $ = !1,
        re = !1;
      const _e = { name: A };
      if (!l.disabled) {
        const lt = !!(ie(r, A) && ie(r, A)._f && ie(r, A)._f.disabled);
        if (!V || W) {
          v.isDirty &&
            ((re = i.isDirty),
            (i.isDirty = _e.isDirty = de()),
            ($ = re !== _e.isDirty));
          const st = lt || Ka(ie(c, A), z);
          (re = !!(!lt && ie(i.dirtyFields, A))),
            st || lt ? gt(i.dirtyFields, A) : Ze(i.dirtyFields, A, !0),
            (_e.dirtyFields = i.dirtyFields),
            ($ = $ || (v.dirtyFields && re !== !st));
        }
        if (V) {
          const st = ie(i.touchedFields, A);
          st ||
            (Ze(i.touchedFields, A, V),
            (_e.touchedFields = i.touchedFields),
            ($ = $ || (v.touchedFields && st !== V)));
        }
        $ && J && x.state.next(_e);
      }
      return $ ? _e : {};
    },
    fe = (A, z, V, W) => {
      const J = ie(i.errors, A),
        $ = v.isValid && Yn(z) && i.isValid !== z;
      if (
        (l.delayError && V
          ? ((h = D(() => k(A, V))), h(l.delayError))
          : (clearTimeout(p),
            (h = null),
            V ? Ze(i.errors, A, V) : gt(i.errors, A)),
        (V ? !Ka(J, V) : J) || !Pt(W) || $)
      ) {
        const re = {
          ...W,
          ...($ && Yn(z) ? { isValid: z } : {}),
          errors: i.errors,
          name: A,
        };
        (i = { ...i, ...re }), x.state.next(re);
      }
    },
    I = async (A) => {
      H(A, !0);
      const z = await l.resolver(
        f,
        l.context,
        S_(A || m.mount, r, l.criteriaMode, l.shouldUseNativeValidation)
      );
      return H(A), z;
    },
    X = async (A) => {
      const { errors: z } = await I(A);
      if (A)
        for (const V of A) {
          const W = ie(z, V);
          W ? Ze(i.errors, V, W) : gt(i.errors, V);
        }
      else i.errors = z;
      return z;
    },
    le = async (A, z, V = { valid: !0 }) => {
      for (const W in A) {
        const J = A[W];
        if (J) {
          const { _f: $, ...re } = J;
          if ($) {
            const _e = m.array.has($.name),
              lt = J._f && E_(J._f);
            lt && v.validatingFields && H([W], !0);
            const st = await Rp(
              J,
              m.disabled,
              f,
              _,
              l.shouldUseNativeValidation && !z,
              _e
            );
            if (
              (lt && v.validatingFields && H([W]),
              st[$.name] && ((V.valid = !1), z))
            )
              break;
            !z &&
              (ie(st, $.name)
                ? _e
                  ? g_(i.errors, st, $.name)
                  : Ze(i.errors, $.name, st[$.name])
                : gt(i.errors, $.name));
          }
          !Pt(re) && (await le(re, z, V));
        }
      }
      return V.valid;
    },
    Ve = () => {
      for (const A of m.unMount) {
        const z = ie(r, A);
        z &&
          (z._f.refs ? z._f.refs.every((V) => !Ff(V)) : !Ff(z._f.ref)) &&
          be(A);
      }
      m.unMount = new Set();
    },
    de = (A, z) => !l.disabled && (A && z && Ze(f, A, z), !Ka(Z(), c)),
    xe = (A, z, V) =>
      y_(A, m, { ...(d.mount ? f : ht(z) ? c : Jn(A) ? { [A]: z } : z) }, V, z),
    ze = (A) =>
      hc(ie(d.mount ? f : c, A, l.shouldUnregister ? ie(c, A, []) : [])),
    Ee = (A, z, V = {}) => {
      const W = ie(r, A);
      let J = z;
      if (W) {
        const $ = W._f;
        $ &&
          (!$.disabled && Ze(f, A, sv(z, $)),
          (J = Iu($.ref) && kt(z) ? "" : z),
          nv($.ref)
            ? [...$.ref.options].forEach(
                (re) => (re.selected = J.includes(re.value))
              )
            : $.refs
            ? xr($.ref)
              ? $.refs.length > 1
                ? $.refs.forEach(
                    (re) =>
                      (!re.defaultChecked || !re.disabled) &&
                      (re.checked = Array.isArray(J)
                        ? !!J.find((_e) => _e === re.value)
                        : J === re.value)
                  )
                : $.refs[0] && ($.refs[0].checked = !!J)
              : $.refs.forEach((re) => (re.checked = re.value === J))
            : kd($.ref)
            ? ($.ref.value = "")
            : (($.ref.value = J),
              $.ref.type || x.values.next({ name: A, values: { ...f } })));
      }
      (V.shouldDirty || V.shouldTouch) &&
        ee(A, J, V.shouldTouch, V.shouldDirty, !0),
        V.shouldValidate && T(A);
    },
    K = (A, z, V) => {
      for (const W in z) {
        const J = z[W],
          $ = `${A}.${W}`,
          re = ie(r, $);
        (m.array.has(A) || rt(J) || (re && !re._f)) && !zl(J)
          ? K($, J, V)
          : Ee($, J, V);
      }
    },
    ce = (A, z, V = {}) => {
      const W = ie(r, A),
        J = m.array.has(A),
        $ = xn(z);
      Ze(f, A, $),
        J
          ? (x.array.next({ name: A, values: { ...f } }),
            (v.isDirty || v.dirtyFields) &&
              V.shouldDirty &&
              x.state.next({
                name: A,
                dirtyFields: sr(c, f),
                isDirty: de(A, $),
              }))
          : W && !W._f && !kt($)
          ? K(A, $, V)
          : Ee(A, $, V),
        xp(A, m) && x.state.next({ ...i }),
        x.values.next({ name: d.mount ? A : void 0, values: { ...f } });
    },
    he = async (A) => {
      d.mount = !0;
      const z = A.target;
      let V = z.name,
        W = !0;
      const J = ie(r, V),
        $ = () => (z.type ? Qf(J._f) : u_(A)),
        re = (_e) => {
          W =
            Number.isNaN(_e) ||
            (zl(_e) && isNaN(_e.getTime())) ||
            Ka(_e, ie(f, V, _e));
        };
      if (J) {
        let _e, lt;
        const st = $(),
          It = A.type === vp.BLUR || A.type === vp.FOCUS_OUT,
          gc =
            (!w_(J._f) && !l.resolver && !ie(i.errors, V) && !J._f.deps) ||
            __(It, ie(i.touchedFields, V), i.isSubmitted, O, E),
          Jl = xp(V, m, It);
        Ze(f, V, st),
          It
            ? (J._f.onBlur && J._f.onBlur(A), h && h(0))
            : J._f.onChange && J._f.onChange(A);
        const li = ee(V, st, It, !1),
          vc = !Pt(li) || Jl;
        if (
          (!It && x.values.next({ name: V, type: A.type, values: { ...f } }),
          gc)
        )
          return (
            v.isValid && (l.mode === "onBlur" && It ? C() : It || C()),
            vc && x.state.next({ name: V, ...(Jl ? {} : li) })
          );
        if ((!It && Jl && x.state.next({ ...i }), l.resolver)) {
          const { errors: _a } = await I([V]);
          if ((re(st), W)) {
            const zt = Tp(i.errors, r, V),
              _r = Tp(_a, r, zt.name || V);
            (_e = _r.error), (V = _r.name), (lt = Pt(_a));
          }
        } else
          H([V], !0),
            (_e = (await Rp(J, m.disabled, f, _, l.shouldUseNativeValidation))[
              V
            ]),
            H([V]),
            re(st),
            W && (_e ? (lt = !1) : v.isValid && (lt = await le(r, !0)));
        W && (J._f.deps && T(J._f.deps), fe(V, lt, _e, li));
      }
    },
    Le = (A, z) => {
      if (ie(i.errors, z) && A.focus) return A.focus(), 1;
    },
    T = async (A, z = {}) => {
      let V, W;
      const J = Gu(A);
      if (l.resolver) {
        const $ = await X(ht(A) ? A : J);
        (V = Pt($)), (W = A ? !J.some((re) => ie($, re)) : V);
      } else
        A
          ? ((W = (
              await Promise.all(
                J.map(async ($) => {
                  const re = ie(r, $);
                  return await le(re && re._f ? { [$]: re } : re);
                })
              )
            ).every(Boolean)),
            !(!W && !i.isValid) && C())
          : (W = V = await le(r));
      return (
        x.state.next({
          ...(!Jn(A) || (v.isValid && V !== i.isValid) ? {} : { name: A }),
          ...(l.resolver || !A ? { isValid: V } : {}),
          errors: i.errors,
        }),
        z.shouldFocus && !W && ur(r, Le, A ? J : m.mount),
        W
      );
    },
    Z = (A) => {
      const z = { ...(d.mount ? f : c) };
      return ht(A) ? z : Jn(A) ? ie(z, A) : A.map((V) => ie(z, V));
    },
    pe = (A, z) => ({
      invalid: !!ie((z || i).errors, A),
      isDirty: !!ie((z || i).dirtyFields, A),
      error: ie((z || i).errors, A),
      isValidating: !!ie(i.validatingFields, A),
      isTouched: !!ie((z || i).touchedFields, A),
    }),
    me = (A) => {
      A && Gu(A).forEach((z) => gt(i.errors, z)),
        x.state.next({ errors: A ? i.errors : {} });
    },
    ae = (A, z, V) => {
      const W = (ie(r, A, { _f: {} })._f || {}).ref,
        J = ie(i.errors, A) || {},
        { ref: $, message: re, type: _e, ...lt } = J;
      Ze(i.errors, A, { ...lt, ...z, ref: W }),
        x.state.next({ name: A, errors: i.errors, isValid: !1 }),
        V && V.shouldFocus && W && W.focus && W.focus();
    },
    Oe = (A, z) =>
      $n(A)
        ? x.values.subscribe({ next: (V) => A(xe(void 0, z), V) })
        : xe(A, z, !0),
    be = (A, z = {}) => {
      for (const V of A ? Gu(A) : m.mount)
        m.mount.delete(V),
          m.array.delete(V),
          z.keepValue || (gt(r, V), gt(f, V)),
          !z.keepError && gt(i.errors, V),
          !z.keepDirty && gt(i.dirtyFields, V),
          !z.keepTouched && gt(i.touchedFields, V),
          !z.keepIsValidating && gt(i.validatingFields, V),
          !l.shouldUnregister && !z.keepDefaultValue && gt(c, V);
      x.values.next({ values: { ...f } }),
        x.state.next({ ...i, ...(z.keepDirty ? { isDirty: de() } : {}) }),
        !z.keepIsValid && C();
    },
    bt = ({ disabled: A, name: z, field: V, fields: W }) => {
      ((Yn(A) && d.mount) || A || m.disabled.has(z)) &&
        (A ? m.disabled.add(z) : m.disabled.delete(z),
        ee(z, Qf(V ? V._f : ie(W, z)._f), !1, !1, !0));
    },
    Ue = (A, z = {}) => {
      let V = ie(r, A);
      const W = Yn(z.disabled) || Yn(l.disabled);
      return (
        Ze(r, A, {
          ...(V || {}),
          _f: {
            ...(V && V._f ? V._f : { ref: { name: A } }),
            name: A,
            mount: !0,
            ...z,
          },
        }),
        m.mount.add(A),
        V
          ? bt({
              field: V,
              disabled: Yn(z.disabled) ? z.disabled : l.disabled,
              name: A,
            })
          : Y(A, !0, z.value),
        {
          ...(W ? { disabled: z.disabled || l.disabled } : {}),
          ...(l.progressive
            ? {
                required: !!z.required,
                min: ir(z.min),
                max: ir(z.max),
                minLength: ir(z.minLength),
                maxLength: ir(z.maxLength),
                pattern: ir(z.pattern),
              }
            : {}),
          name: A,
          onChange: he,
          onBlur: he,
          ref: (J) => {
            if (J) {
              Ue(A, z), (V = ie(r, A));
              const $ =
                  (ht(J.value) &&
                    J.querySelectorAll &&
                    J.querySelectorAll("input,select,textarea")[0]) ||
                  J,
                re = x_($),
                _e = V._f.refs || [];
              if (re ? _e.find((lt) => lt === $) : $ === V._f.ref) return;
              Ze(r, A, {
                _f: {
                  ...V._f,
                  ...(re
                    ? {
                        refs: [
                          ..._e.filter(Ff),
                          $,
                          ...(Array.isArray(ie(c, A)) ? [{}] : []),
                        ],
                        ref: { type: $.type, name: A },
                      }
                    : { ref: $ }),
                },
              }),
                Y(A, !1, void 0, $);
            } else
              (V = ie(r, A, {})),
                V._f && (V._f.mount = !1),
                (l.shouldUnregister || z.shouldUnregister) &&
                  !(o_(m.array, A) && d.action) &&
                  m.unMount.add(A);
          },
        }
      );
    },
    Je = () => l.shouldFocusError && ur(r, Le, m.mount),
    Ye = (A) => {
      Yn(A) &&
        (x.state.next({ disabled: A }),
        ur(
          r,
          (z, V) => {
            const W = ie(r, V);
            W &&
              ((z.disabled = W._f.disabled || A),
              Array.isArray(W._f.refs) &&
                W._f.refs.forEach((J) => {
                  J.disabled = W._f.disabled || A;
                }));
          },
          0,
          !1
        ));
    },
    Wt = (A, z) => async (V) => {
      let W;
      V && (V.preventDefault && V.preventDefault(), V.persist && V.persist());
      let J = xn(f);
      if (m.disabled.size) for (const $ of m.disabled) Ze(J, $, void 0);
      if ((x.state.next({ isSubmitting: !0 }), l.resolver)) {
        const { errors: $, values: re } = await I();
        (i.errors = $), (J = re);
      } else await le(r);
      if ((gt(i.errors, "root"), Pt(i.errors))) {
        x.state.next({ errors: {} });
        try {
          await A(J, V);
        } catch ($) {
          W = $;
        }
      } else z && (await z({ ...i.errors }, V)), Je(), setTimeout(Je);
      if (
        (x.state.next({
          isSubmitted: !0,
          isSubmitting: !1,
          isSubmitSuccessful: Pt(i.errors) && !W,
          submitCount: i.submitCount + 1,
          errors: i.errors,
        }),
        W)
      )
        throw W;
    },
    cl = (A, z = {}) => {
      ie(r, A) &&
        (ht(z.defaultValue)
          ? ce(A, xn(ie(c, A)))
          : (ce(A, z.defaultValue), Ze(c, A, xn(z.defaultValue))),
        z.keepTouched || gt(i.touchedFields, A),
        z.keepDirty ||
          (gt(i.dirtyFields, A),
          (i.isDirty = z.defaultValue ? de(A, xn(ie(c, A))) : de())),
        z.keepError || (gt(i.errors, A), v.isValid && C()),
        x.state.next({ ...i }));
    },
    Rn = (A, z = {}) => {
      const V = A ? xn(A) : c,
        W = xn(V),
        J = Pt(A),
        $ = J ? c : W;
      if ((z.keepDefaultValues || (c = V), !z.keepValues)) {
        if (z.keepDirtyValues) {
          const re = new Set([...m.mount, ...Object.keys(sr(c, f))]);
          for (const _e of Array.from(re))
            ie(i.dirtyFields, _e) ? Ze($, _e, ie(f, _e)) : ce(_e, ie($, _e));
        } else {
          if (Bd && ht(A))
            for (const re of m.mount) {
              const _e = ie(r, re);
              if (_e && _e._f) {
                const lt = Array.isArray(_e._f.refs)
                  ? _e._f.refs[0]
                  : _e._f.ref;
                if (Iu(lt)) {
                  const st = lt.closest("form");
                  if (st) {
                    st.reset();
                    break;
                  }
                }
              }
            }
          r = {};
        }
        (f = l.shouldUnregister ? (z.keepDefaultValues ? xn(c) : {}) : xn($)),
          x.array.next({ values: { ...$ } }),
          x.values.next({ values: { ...$ } });
      }
      (m = {
        mount: z.keepDirtyValues ? m.mount : new Set(),
        unMount: new Set(),
        array: new Set(),
        disabled: new Set(),
        watch: new Set(),
        watchAll: !1,
        focus: "",
      }),
        (d.mount = !v.isValid || !!z.keepIsValid || !!z.keepDirtyValues),
        (d.watch = !!l.shouldUnregister),
        x.state.next({
          submitCount: z.keepSubmitCount ? i.submitCount : 0,
          isDirty: J
            ? !1
            : z.keepDirty
            ? i.isDirty
            : !!(z.keepDefaultValues && !Ka(A, c)),
          isSubmitted: z.keepIsSubmitted ? i.isSubmitted : !1,
          dirtyFields: J
            ? {}
            : z.keepDirtyValues
            ? z.keepDefaultValues && f
              ? sr(c, f)
              : i.dirtyFields
            : z.keepDefaultValues && A
            ? sr(c, A)
            : z.keepDirty
            ? i.dirtyFields
            : {},
          touchedFields: z.keepTouched ? i.touchedFields : {},
          errors: z.keepErrors ? i.errors : {},
          isSubmitSuccessful: z.keepIsSubmitSuccessful
            ? i.isSubmitSuccessful
            : !1,
          isSubmitting: !1,
        });
    },
    ol = (A, z) => Rn($n(A) ? A(f) : A, z);
  return {
    control: {
      register: Ue,
      unregister: be,
      getFieldState: pe,
      handleSubmit: Wt,
      setError: ae,
      _executeSchema: I,
      _getWatch: xe,
      _getDirty: de,
      _updateValid: C,
      _removeUnmounted: Ve,
      _updateFieldArray: B,
      _updateDisabledField: bt,
      _getFieldArray: ze,
      _reset: Rn,
      _resetDefaultValues: () =>
        $n(l.defaultValues) &&
        l.defaultValues().then((A) => {
          ol(A, l.resetOptions), x.state.next({ isLoading: !1 });
        }),
      _updateFormState: (A) => {
        i = { ...i, ...A };
      },
      _disableForm: Ye,
      _subjects: x,
      _proxyFormState: v,
      _setErrors: ne,
      get _fields() {
        return r;
      },
      get _formValues() {
        return f;
      },
      get _state() {
        return d;
      },
      set _state(A) {
        d = A;
      },
      get _defaultValues() {
        return c;
      },
      get _names() {
        return m;
      },
      set _names(A) {
        m = A;
      },
      get _formState() {
        return i;
      },
      set _formState(A) {
        i = A;
      },
      get _options() {
        return l;
      },
      set _options(A) {
        l = { ...l, ...A };
      },
    },
    trigger: T,
    register: Ue,
    handleSubmit: Wt,
    watch: Oe,
    setValue: ce,
    getValues: Z,
    reset: ol,
    resetField: cl,
    clearErrors: me,
    unregister: be,
    setError: ae,
    setFocus: (A, z = {}) => {
      const V = ie(r, A),
        W = V && V._f;
      if (W) {
        const J = W.refs ? W.refs[0] : W.ref;
        J.focus && (J.focus(), z.shouldSelect && $n(J.select) && J.select());
      }
    },
    getFieldState: pe,
  };
}
function wa(a = {}) {
  const l = Sn.useRef(void 0),
    i = Sn.useRef(void 0),
    [r, c] = Sn.useState({
      isDirty: !1,
      isValidating: !1,
      isLoading: $n(a.defaultValues),
      isSubmitted: !1,
      isSubmitting: !1,
      isSubmitSuccessful: !1,
      isValid: !1,
      submitCount: 0,
      dirtyFields: {},
      touchedFields: {},
      validatingFields: {},
      errors: a.errors || {},
      disabled: a.disabled || !1,
      defaultValues: $n(a.defaultValues) ? void 0 : a.defaultValues,
    });
  l.current || (l.current = { ...T_(a), formState: r });
  const f = l.current.control;
  return (
    (f._options = a),
    m_({
      subject: f._subjects.state,
      next: (d) => {
        h_(d, f._proxyFormState, f._updateFormState) && c({ ...f._formState });
      },
    }),
    Sn.useEffect(() => f._disableForm(a.disabled), [f, a.disabled]),
    Sn.useEffect(() => {
      if (f._proxyFormState.isDirty) {
        const d = f._getDirty();
        d !== r.isDirty && f._subjects.state.next({ isDirty: d });
      }
    }, [f, r.isDirty]),
    Sn.useEffect(() => {
      a.values && !Ka(a.values, i.current)
        ? (f._reset(a.values, f._options.resetOptions),
          (i.current = a.values),
          c((d) => ({ ...d })))
        : f._resetDefaultValues();
    }, [a.values, f]),
    Sn.useEffect(() => {
      a.errors && f._setErrors(a.errors);
    }, [a.errors, f]),
    Sn.useEffect(() => {
      f._state.mount || (f._updateValid(), (f._state.mount = !0)),
        f._state.watch &&
          ((f._state.watch = !1), f._subjects.state.next({ ...f._formState })),
        f._removeUnmounted();
    }),
    Sn.useEffect(() => {
      a.shouldUnregister && f._subjects.values.next({ values: f._getWatch() });
    }, [a.shouldUnregister, f]),
    (l.current.formState = d_(r, f)),
    l.current
  );
}
const C_ = ({ showToastMsg: a }) => {
    const {
        register: l,
        formState: { errors: i },
        handleSubmit: r,
        reset: c,
      } = wa({ mode: "onChange" }),
      { mutate: f, isPending: d } = Mt({
        mutationFn: (h) => a_(h),
        onSuccess: () => {
          c(),
            a("You have successfully subscribed to out newsLetter", "SUCCESS");
        },
        onError: (h) => {
          var p, v;
          a(
            ((v =
              (p = h == null ? void 0 : h.response) == null
                ? void 0
                : p.data) == null
              ? void 0
              : v.msg) || h.message,
            "ERROR"
          );
        },
      }),
      m = r((h) => {
        f(h.email);
      });
    return {
      register: l,
      errors: i,
      submitSubscribeNonLoggedUser: m,
      isPending: d,
    };
  },
  Bn = () => {
    const { showToastMsg: a } = $t(),
      l = mt(),
      { logoutUser: i } = Vt();
    return {
      handleErrAPI: w.useCallback(
        ({ err: c, push: f = !1, toast: d = !0 }) => {
          var v, x, E, O, _;
          console.log(c);
          const m =
              ((x =
                (v = c == null ? void 0 : c.response) == null
                  ? void 0
                  : v.data) == null
                ? void 0
                : x.msg) || c.message,
            h =
              ((O =
                (E = c == null ? void 0 : c.response) == null
                  ? void 0
                  : E.config) == null
                ? void 0
                : O.url) || "",
            p =
              (_ = c == null ? void 0 : c.response) == null ? void 0 : _.status;
          h === "/auth/refresh"
            ? (i(), l("/", { replace: !0 }), a("SESSION EXPIRED", "ERROR"))
            : [401, 403, 429].includes(p)
            ? (l("/", { replace: !0 }), a(m, "ERROR"))
            : (f && l("/", { replace: !0 }), d && a(m, "ERROR"));
        },
        [l, a, i]
      ),
    };
  },
  N_ = () => {
    const { isLogged: a, currUser: l } = Vt(),
      { showToastMsg: i } = $t(),
      { handleErrAPI: r } = Bn(),
      c = mt(),
      {
        register: f,
        errors: d,
        submitSubscribeNonLoggedUser: m,
        isPending: h,
      } = C_({ showToastMsg: i }),
      { mutate: p, isPending: v } = r_({ showToastMsg: i, handleErrAPI: r });
    return {
      handleClickNonLoggedUser: () => c("/auth/login"),
      isLogged: a,
      toggleNewsLetter: (_) => {
        _.preventDefault(),
          p({
            type:
              l != null && l.hasSubscribedToNewsletter
                ? "unsubscribe"
                : "subscribe",
          });
      },
      isPendingLogged: v,
      register: f,
      errors: d,
      currUser: l,
      submitSubscribeNonLoggedUser: m,
      isPendingNonLogged: h,
      handleRedirection: () =>
        c("/newsletter/notice-unsubscribe-with-retry?success=false", {
          state: { from: "/newsletter/verify-unsubscribe" },
        }),
    };
  },
  ul = ({
    isDisabled: a,
    label: l,
    type: i = "button",
    handleClick: r,
    styleTxt: c,
  }) =>
    g.jsxs("button", {
      onClick: r,
      type: i,
      disabled: a,
      className: "btn_container",
      children: [
        g.jsxs("div", {
          className: "btn_container__content",
          children: [
            g.jsx("div", {
              className: "content__btn",
              children: g.jsx("span", {
                className: `${c ?? "btn__txt"}`,
                children: l ?? "BUTTON",
              }),
            }),
            g.jsx("span", { className: "btn__ref_1" }),
            g.jsx("span", { className: "btn__ref_2" }),
          ],
        }),
        g.jsx("span", { className: "btn_container__shadow" }),
        g.jsx(IS, { className: "btn_container__svg_1" }),
        g.jsx(BS, { className: "btn_container__svg_2" }),
        g.jsx(yS, { className: "btn_container__svg_3" }),
        g.jsx(MS, { className: "btn_container__svg_4" }),
        g.jsx(CS, { className: "btn_container__svg_5" }),
        g.jsx(GS, { className: "btn_container__svg_6" }),
      ],
    }),
  O_ = ({ isPending: a, currUser: l, submitNewsLetter: i }) =>
    a
      ? g.jsx(Jt, { styleGiven: "justify-start" })
      : g.jsx("div", {
          className: "max-w-[200px] md:max-w-[225px] flex justify-start",
          children: g.jsx(ul, {
            label:
              l != null && l.hasSubscribedToNewsletter
                ? "Unsubscribe"
                : "Subscribe",
            type: "submit",
            handleClick: i,
          }),
        }),
  nc = /^[A-Z][a-zA-Z`'-\s]*$/,
  iv = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/,
  rv =
    /^(?![.-])(?!.*[.-]$)(?!.*\.\.)(?!.*@.*@)[A-Za-z0-9._%+-]+@[A-Za-z0-9]+\.[A-Za-z]{2,}$/,
  mc = /^[a-f0-9]{24}$/,
  yc = /^[a-f0-9]{128}$/,
  j_ = /^[A-Za-z\s]{2,50}$/,
  D_ = /^[A-Za-z\s-]{2,50}$/,
  U_ = /^[A-Za-z\s-]{2,50}$/,
  M_ = /^[A-Za-z0-9\s,.#-]{5,100}$/,
  z_ = /^\d{5}(-\d{4})?$/,
  L_ = /^\+?\d{1,4}[\s-]?\(?\d{2,3}\)?[\s-]?\d{3,4}[\s-]?\d{3,4}$/,
  H_ = ({
    isPending: a,
    currUser: l,
    submitNewsLetter: i,
    register: r,
    errors: c,
  }) => {
    var f, d;
    return g.jsx("div", {
      className: "w-full flex flex-col gap-5",
      children: g.jsxs("form", {
        className:
          "grid grid-cols-[repeat(auto-fit,minmax(225px,1fr))] sm:grid-cols-2 gap-5 sm:gap-x-10 items-center",
        children: [
          g.jsxs("div", {
            className: "w-full flex flex-col gap-3",
            children: [
              g.jsx("input", {
                type: "email",
                className: "input__base txt__01",
                placeholder: "Your email...",
                ...r("email", {
                  required: "Email is required",
                  pattern: {
                    value: rv,
                    message: "Enter a valid email to receive great discounts ",
                  },
                }),
              }),
              ((f = c == null ? void 0 : c.email) == null
                ? void 0
                : f.message) &&
                g.jsx("span", {
                  className: "txt__00 text-red-600",
                  children:
                    (d = c == null ? void 0 : c.email) == null
                      ? void 0
                      : d.message,
                }),
            ],
          }),
          a
            ? g.jsx(Jt, { styleGiven: "justify-start" })
            : g.jsx("div", {
                className:
                  "w-full max-w-[200px] md:max-w-[225px] flex justify-start items-start",
                children: g.jsx(ul, {
                  label:
                    l != null && l.hasSubscribedToNewsletter
                      ? "Unsubscribe"
                      : "Subscribe",
                  type: "submit",
                  handleClick: i,
                }),
              }),
        ],
      }),
    });
  },
  B_ = () => {
    const {
      isLogged: a,
      toggleNewsLetter: l,
      isPendingLogged: i,
      register: r,
      errors: c,
      currUser: f,
      submitSubscribeNonLoggedUser: d,
      isPendingNonLogged: m,
      handleRedirection: h,
    } = N_();
    return g.jsxs("div", {
      className: "flex w-full flex-col items-start gap-5",
      children: [
        g.jsxs("div", {
          className: `w-full grid items-center gap-4  ${
            a
              ? "grid-cols-[repeat(auto-fit,minmax(200px,1fr))] sm:grid-cols-2"
              : " grid-cols-1 lg:grid-cols-[200px_1fr]"
          }`,
          children: [
            g.jsx("div", {
              className: "w-full flex flex-col self-start",
              children: g.jsx("span", {
                className: "txt__02",
                children: "Newsletter",
              }),
            }),
            a
              ? g.jsx(O_, { currUser: f, submitNewsLetter: l, isPending: i })
              : g.jsx(H_, {
                  register: r,
                  errors: c,
                  submitNewsLetter: d,
                  currUser: f,
                  isPending: m,
                }),
          ],
        }),
        !a &&
          g.jsx("div", {
            className: "w-full flex justify-start",
            children: g.jsx("span", {
              onClick: h,
              className:
                "txt__01 el__after_below cursor-pointer transition-all duration-300 hover:text-orange-500",
              children: "Send link to unsubscribe",
            }),
          }),
        g.jsx("div", {
          className: "w-full flex",
          children: g.jsx("span", {
            className: "txt__00",
            children:
              "Subscribe to our newsletter to receive the latest updates and get a chance to win a discount coupon.",
          }),
        }),
      ],
    });
  },
  q_ = [
    { id: Ce(), label: "About", path: "/" },
    { id: Ce(), label: "Privacy Policy", path: "/" },
    { id: Ce(), label: "Terms & Conditions", path: "/" },
    { id: Ce(), label: "Contact", path: "/" },
  ],
  k_ = [
    {
      id: Ce(),
      label: "Source Code",
      svg: LS,
      url: "https://github.com/AlexanderMatveev2908/FOOD_APP",
    },
    {
      id: Ce(),
      label: "Hotels App",
      svg: kS,
      url: "https://mern-booking-app-0w8v.onrender.com/",
    },
  ],
  V_ = () =>
    g.jsxs("div", {
      className:
        "pad__page py-5 border-t-2 border-orange-500 w-full flex flex-col items-center gap-y-5",
      children: [
        g.jsxs("div", {
          className: "grid w-full gap-y-5 ",
          children: [
            g.jsx(Yl, {
              to: "/",
              className: "txt__05 text-orange-500",
              children: "LOGO",
            }),
            g.jsx("div", {
              className:
                "w-full grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4",
              children: q_.map((a) =>
                g.jsx(
                  "div",
                  {
                    className: "w-full flex flex-col items-start",
                    children: g.jsx(Yl, {
                      to: a.path,
                      className:
                        "el__after_below txt__02 transition-all duration-300 hover:text-orange-500 opacity-50",
                      children: a.label,
                    }),
                  },
                  a.id
                )
              ),
            }),
          ],
        }),
        g.jsx("ul", {
          className:
            "w-full grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] lg:grid-cols-[200px_1fr] justify-items-start gap-y-5",
          children: k_.map((a) =>
            g.jsx(
              "li",
              {
                children: g.jsxs("a", {
                  href: a.url,
                  className:
                    "grid max-w-fit grid-cols-[40px_1fr] items-end transition-all duration-300 el__after_below hover:text-orange-500",
                  children: [
                    g.jsx(a.svg, { className: "w-[30px] h-[30px] " }),
                    g.jsx("span", { className: "txt__01", children: a.label }),
                  ],
                }),
              },
              a.id
            )
          ),
        }),
        g.jsx(B_, {}),
        g.jsx("div", {
          className: "w-full flex justify-center py-5",
          children: g.jsxs("span", {
            className: "txt__01",
            children: [
              "© ",
              new Date().getFullYear(),
              " MERN__EAT. No rights reserved just making it for fun ✌🏼",
            ],
          }),
        }),
      ],
    }),
  F_ = ({ children: a }) => {
    const [l, i] = w.useState(!1),
      r = ct();
    return g.jsxs("div", {
      className: "w-full min-h-screen flex flex-col items-center",
      children: [
        g.jsx(Gw, { setSideOpen: i, sideOpen: l }),
        g.jsx(Kw, { sideOpen: l, setSideOpen: i }),
        g.jsx(fE, {}),
        r.pathname === "/" && g.jsx(t_, {}),
        g.jsx("div", {
          className:
            "flex flex-col items-center w-full pad__page py-5 pb-[150px] sm:pb-[250px] lg:pb-[350px]",
          children: a,
        }),
        g.jsx(V_, {}),
      ],
    });
  },
  Q_ = () => g.jsx(F_, { children: g.jsx(lc, {}) }),
  G_ = () => {
    const { isLogged: a } = Vt();
    return a ? g.jsx(Wn, { to: "/", replace: !0 }) : g.jsx(lc, {});
  },
  Kl = (a, l) => a && l.test(a),
  $s = (a, l) => a.includes(l ?? ""),
  Y_ = () => {
    var d;
    Ln();
    const [a] = rl(),
      l = ct(),
      i = a.get("type"),
      r = (d = l == null ? void 0 : l.state) == null ? void 0 : d.from;
    return {
      canStay:
        $s(
          [
            "verify-account",
            "recover-pwd",
            "sentEmailUnsubscribe",
            "change-email",
            "change-pwd",
          ],
          i ?? ""
        ) &&
        $s(
          [
            "/auth/register",
            "/auth/login",
            "/newsletter/notice-unsubscribe-with-retry",
            "/user/manage-account",
          ],
          r
        ),
      txt:
        i === "verify-account"
          ? "to verify your account"
          : i === "recover-pwd"
          ? "with a link to recover your password"
          : i === "change-email"
          ? "to verify your new email"
          : "with a link to unsubscribe from our newsletter",
    };
  },
  X_ = () => {
    const { canStay: a, txt: l } = Y_();
    return a
      ? g.jsxs("div", {
          className: "w-full flex flex-col items-center gap-y-14",
          children: [
            g.jsx("div", {
              className: "w-full flex justify-center",
              children: g.jsx("span", {
                className: "txt__04 leading-10 lg:leading-16",
                children: `We've sent you an email ${l}! If you don't see it, check your
          spam folder, it might be partying there`,
              }),
            }),
            g.jsx("div", {
              className: "w-full flex justify-center items-center",
              children: g.jsx(ic, {
                className:
                  "w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] md:w-[400px] md:h-[400px] text-green-600",
              }),
            }),
          ],
        })
      : g.jsx(Wn, { to: "/", replace: !0 });
  },
  P_ = async () => {
    const { data: a } = await Ke.get("/user/info-basic");
    return a;
  },
  Z_ = async () => {
    const { data: a } = await Ke.get("/user/profile-details");
    return a;
  },
  K_ = async (a) => {
    const { data: l } = await Ke.patch("/user/profile-details", a);
    return l;
  },
  $_ = async (a) => {
    const { data: l } = await Ke.post("/user/manage-account", { password: a });
    return l;
  },
  J_ = async (a) => {
    const { data: l } = await Ke.patch("/user/change-email", { ...a });
    return l;
  },
  W_ = async (a) => {
    const { data: l } = await Ke.post("/user/verify-new-email", a);
    return l;
  },
  I_ = async (a) => {
    const { data: l } = await Ke.patch("/user/change-old-pwd", a);
    return l;
  },
  eR = async (a) => {
    const { data: l } = await Ke.delete("/user/delete-account", {
      data: { manageAccountToken: a },
    });
    return l;
  },
  tR = () => {
    const {
        setCurrUser: a,
        isLogged: l,
        setUserLogged: i,
        logoutUser: r,
      } = Vt(),
      { handleErrAPI: c } = Bn(),
      { mutate: f } = Mt({
        mutationFn: Rw,
        onSuccess: (v) => {
          i(v == null ? void 0 : v.accessToken);
        },
        onError: () => {
          l && r();
        },
      }),
      {
        data: d,
        isSuccess: m,
        isError: h,
        error: p,
      } = Md({ queryKey: ["user", l], queryFn: P_, enabled: l });
    w.useEffect(() => {
      (() => {
        if (h) c({ err: p });
        else if (m) {
          const { user: x = {} } = d ?? {};
          a({ user: x });
        }
      })();
    }, [h, m, c, p, a, d, r]),
      w.useEffect(() => {
        l || f();
      }, [l, f]);
  },
  nR = () => {
    const { isLogged: a } = Vt();
    return a ? g.jsx(lc, {}) : g.jsx(Wn, { to: "/", replace: !0 });
  },
  aR = () => g.jsx(lc, {}),
  Sr = ({ register: a, errors: l, field: i, custom: r }) => {
    var c, f;
    return g.jsxs("label", {
      className: "grid grid-cols-1 gap-y-3",
      children: [
        g.jsx("span", { className: "txt__02", children: i.label }),
        g.jsxs("div", {
          className: "w-full relative",
          children: [
            g.jsx("input", {
              type: i.type,
              className: "input__auth_field ",
              placeholder: `Your ${i.label}...`,
              ...a(i.field, {
                required: `${i.label} is required`,
                validate: (d) =>
                  !d || !i.reg.test(d)
                    ? i.msg
                    : r
                    ? r == null
                      ? void 0
                      : r(d)
                    : !0,
              }),
            }),
            g.jsx(i.svg, { className: "svg__auth_field" }),
          ],
        }),
        ((c = l == null ? void 0 : l[i.field]) == null ? void 0 : c.message) &&
          g.jsx("span", {
            className: "txt__00 text-red-600",
            children:
              (f = l == null ? void 0 : l[i.field]) == null
                ? void 0
                : f.message,
          }),
      ],
    });
  },
  il = ({
    register: a,
    errors: l,
    isVisible: i,
    handleChangeVisibility: r,
    field: c,
    custom: f,
  }) => {
    var m, h;
    const d = {
      required: "Password is required",
      pattern: { value: c.reg, message: c.msg },
      validate: (p) => (f ? f(p) : !0),
    };
    return g.jsxs("label", {
      className: "grid grid-cols-1 gap-y-3 relative",
      children: [
        g.jsx("span", { className: "txt__02", children: c.label }),
        g.jsxs("div", {
          className: "w-full relative",
          children: [
            g.jsx("input", {
              type: i ? "text" : "password",
              className: "input__auth_field ",
              placeholder: c.place,
              ...a(c.field, d),
            }),
            g.jsx("span", {
              onClick: () => r(),
              className: "w-fit flex justify-center items-center",
              children: i
                ? g.jsx(DS, { className: "svg__auth_field" })
                : g.jsx(OS, { className: "svg__auth_field" }),
            }),
          ],
        }),
        ((m = l == null ? void 0 : l[c.field]) == null ? void 0 : m.message) &&
          g.jsx("span", {
            className: "txt__00 text-red-600",
            children:
              (h = l == null ? void 0 : l[c.field]) == null
                ? void 0
                : h.message,
          }),
      ],
    });
  },
  lR = [
    { id: Ce(), label: "Forgot password", svg: tg, type: "login" },
    { id: Ce(), label: "Verify account", svg: lg, type: "register" },
  ],
  sR = [
    { id: Ce(), label: "Create account", svg: sg, type: "login" },
    { id: Ce(), label: "Login in your account", svg: ng, type: "register" },
  ],
  uv = ({ type: a }) => {
    const l = mt(),
      i = ct();
    return g.jsxs("div", {
      className: "w-full grid grid-cols-1 gap-y-5 sm:grid-cols-2",
      children: [
        g.jsx("button", {
          type: "button",
          onClick: () =>
            l(
              `/auth/send-email?type=${
                a === "login" ? "recover-pwd" : "verify-account"
              }`,
              { state: { from: i.pathname } }
            ),
          className:
            "w-full flex items-center gap-3 group el__after_below cursor-pointer",
          children: lR.map(
            (r) =>
              r.type === a &&
              g.jsxs(
                w.Fragment,
                {
                  children: [
                    g.jsx(r.svg, { className: "svg__switch_form" }),
                    " ",
                    g.jsx("span", {
                      className:
                        "transition-all duration-300 group-hover:text-orange-500 txt__00",
                      children: r.label,
                    }),
                  ],
                },
                r.id
              )
          ),
        }),
        g.jsx(Yl, {
          to: a === "login" ? "/auth/register" : "/auth/login",
          className:
            "w-full flex items-center gap-3 group el__after_below sm:justify-self-end",
          children: sR.map(
            (r) =>
              r.type === a &&
              g.jsxs(
                w.Fragment,
                {
                  children: [
                    g.jsx(r.svg, { className: "svg__switch_form" }),
                    g.jsx("span", {
                      className:
                        "transition-all duration-300 group-hover:text-orange-500 txt__00",
                      children: r.label,
                    }),
                  ],
                },
                r.id
              )
          ),
        }),
      ],
    });
  },
  iR = () => {
    const { setUserLogged: a } = Vt(),
      { showToastMsg: l } = $t(),
      { handleErrAPI: i } = Bn();
    Ln();
    const r = mt(),
      {
        register: c,
        handleSubmit: f,
        reset: d,
        formState: { errors: m },
        setFocus: h,
      } = wa({ mode: "onSubmit" });
    w.useEffect(() => {
      h("email");
    }, [h]);
    const { mutate: p, isPending: v } = Mt({
        mutationFn: (E) => bw(E),
        onSuccess: (E) => {
          d(),
            a(E.accessToken),
            l("User logged in successfully", "SUCCESS"),
            r("/");
        },
        onError: (E) => {
          var O, _, D;
          [401, 403].includes(
            (O = E == null ? void 0 : E.response) == null ? void 0 : O.status
          )
            ? l(
                (D =
                  (_ = E == null ? void 0 : E.response) == null
                    ? void 0
                    : _.data) == null
                  ? void 0
                  : D.msg,
                "ERROR"
              )
            : i({ err: E });
        },
      }),
      x = f((E) => {
        p({ ...E });
      });
    return { register: c, errors: m, handleLoginUser: x, isPending: v };
  },
  Er = {
    id: Ce(),
    field: "email",
    label: "Email",
    reg: rv,
    msg: "Email must follow this pattern /^(?![.-])(?!.*[.-]$)(?!.*\\.\\.)(?!.*@.*@)[A-Za-z0-9._%+-]+@[A-Za-z0-9]+\\.[A-Za-z]{2,}$/ 🧐",
    svg: KS,
    type: "email",
  },
  rR = { ...Er, label: "New Email", field: "newEmail" },
  uR = [
    {
      id: Ce(),
      field: "firstName",
      label: "First Name",
      reg: nc,
      msg: "A First Name must start with uppercase letter, and can include only letters and apostrophe.",
      svg: Z0,
      type: "text",
    },
    {
      id: Ce(),
      field: "lastName",
      label: "Last Name",
      reg: nc,
      msg: "A Last Name must start with uppercase letter, and can include only letters and apostrophe",
      svg: Z0,
      type: "text",
    },
  ],
  Fd = {
    id: Ce(),
    field: "password",
    label: "Password",
    place: "Your password",
    msg: "Invalid password",
    reg: /.*/,
  },
  Qd = {
    ...Fd,
    reg: iv,
    msg: "Password must follow this pattern /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_])[A-Za-z\\d\\W_]{8,}$/ 🧐",
  },
  cR = {
    ...Qd,
    label: "New Password",
    place: "Your new password",
    field: "newPassword",
  },
  Gd = {
    id: Ce(),
    field: "confirmPassword",
    label: "Confirm Password",
    place: "Confirm your password",
    msg: "",
    reg: /.*/,
  },
  oR = () => {
    const { register: a, errors: l, isPending: i, handleLoginUser: r } = iR(),
      [c, f] = w.useState(!1);
    return g.jsxs("div", {
      className: "w-full grid grid-cols-1 gap-y-10 items-center",
      children: [
        g.jsx("div", {
          className: "w-full flex justify-center",
          children: g.jsx("span", { className: "txt__04", children: "Login" }),
        }),
        g.jsx("div", {
          className:
            "w-full justify-self-center max-w-[600px] grid grid-cols-1 border-2 border-orange-500 rounded-xl p-10",
          children: g.jsx("div", {
            className: "w-full grid grid-cols-1",
            children: g.jsxs("form", {
              onSubmit: r,
              className: "grid grid-cols-1 w-full gap-y-8",
              children: [
                g.jsx(Sr, { register: a, errors: l, field: Er }),
                g.jsx(il, {
                  register: a,
                  errors: l,
                  isVisible: c,
                  handleChangeVisibility: () => f(!c),
                  field: Fd,
                }),
                i
                  ? g.jsx(Jt, {})
                  : g.jsx("div", {
                      className:
                        "w-full mt-2 max-w-[225px] md:max-w-[250px] justify-self-center flex justify-center",
                      children: g.jsx(ul, {
                        styleTxt: "txt__02 z-40 relative",
                        label: "Login",
                        type: "submit",
                      }),
                    }),
                g.jsx("div", {
                  className: "w-full",
                  children: g.jsx(uv, { type: "login" }),
                }),
              ],
            }),
          }),
        }),
      ],
    });
  },
  fR = ({ register: a, errors: l, valTerms: i }) => {
    var m, h;
    const r = !!(
        (m = l == null ? void 0 : l.acceptedTerms) != null && m.message
      ),
      c = w.useRef(null),
      [f, d] = w.useState(!1);
    return (
      w.useEffect(() => {
        const p = (v) => {
          var x;
          if (
            !(!c.current || i === void 0) &&
            (x = c.current) != null &&
            x.contains(v.target)
          ) {
            const E = document.getElementById("squareCheck");
            E == null || E.classList.remove("register__checkbox"),
              requestAnimationFrame(() => {
                E == null || E.classList.add("register__checkbox");
              });
          }
        };
        return (
          document.addEventListener("click", p),
          () => {
            document.removeEventListener("click", p);
          }
        );
      }, [i, f]),
      g.jsxs("div", {
        className: "w-full grid grid-cols-1 gap-2 ",
        children: [
          g.jsxs("label", {
            ref: c,
            className:
              "w-full flex gap-10 max-w-fit justify-start relative py-2 cursor-pointer items-center",
            children: [
              g.jsx("input", {
                type: "checkbox",
                className: "opacity-0",
                ...a("acceptedTerms", {
                  required: "You must accept terms and conditions",
                }),
              }),
              g.jsx("span", {
                id: "squareCheck",
                onClick: () => d(!0),
                className: `absolute top-1 left-0 border-[3px] rounded-xl w-[30px] sm:w-[35px] h-[30px] sm:h-[35px] cursor-pointer ${
                  i
                    ? "border-green-600"
                    : i === void 0 || !f
                    ? "border-white"
                    : "border-red-600"
                }`,
              }),
              g.jsx("span", {
                className: `absolute delay-75 -top-2 sm:-top-3 left-4 w-3 sm:w-4 h-8 sm:h-10 border-r-4 border-b-4 rotate-45 border-green-600 transition-all duration-300 cursor-pointer ${
                  i ? "scale-100" : "scale-0"
                }`,
              }),
              g.jsx("span", {
                className: `txt__01 transition-all duration-300 ${
                  i
                    ? "hover:text-green-600"
                    : i === void 0
                    ? "border-white"
                    : "hover:text-red-600"
                }`,
                children: "I Accept Terms And Conditions",
              }),
            ],
          }),
          r &&
            g.jsx("span", {
              className: "txt__00 text-red-600",
              children:
                (h = l == null ? void 0 : l.acceptedTerms) == null
                  ? void 0
                  : h.message,
            }),
        ],
      })
    );
  },
  dR = /(?=.*[A-Z])/,
  hR = /[a-z]+/,
  mR = /(?=.*\d)/,
  yR = /(?=.*[\W_])/,
  pR = [
    { id: Ce(), msg: "Uppercase letters", reg: dR, label: "ABC..." },
    { id: Ce(), msg: "Lowercase letters", reg: hR, label: "abc..." },
    { id: Ce(), msg: "Numbers", reg: mR, label: "123..." },
    { id: Ce(), msg: "Symbols", reg: yR, label: "!@#$..." },
  ],
  Yd = ({ watch: a }) =>
    pR.map((l) => {
      const i = Kl(a("password"), l.reg);
      return g.jsxs(
        "div",
        {
          className: "w-full grid grid-cols-[35px_70px_1fr] items-center",
          children: [
            g.jsx("span", {
              children: i
                ? g.jsx(ic, { className: "w-[30px] h-[30px] text-green-600" })
                : g.jsx(Nd, { className: "w-[30px] h-[30px] text-red-600" }),
            }),
            g.jsx("span", {
              className: `txt__00 ml-2 px-3 py-1 border-2 rounded-xl ${
                i
                  ? "text-green-600 border-green-600"
                  : "text-red-600 border-red-600"
              }`,
              children: l.label,
            }),
            g.jsx("span", {
              className: `txt__00 hidden ml-4 ${
                i ? "text-green-600" : "text-red-600"
              }`,
              children: l.msg,
            }),
          ],
        },
        l.id
      );
    }),
  gR = () => {
    const [a, l] = w.useState(""),
      i = w.useRef(null);
    w.useEffect(() => {
      const h = (p) => {
        var v;
        if (i.current && (v = i.current) != null && v.contains(p.target)) {
          const x = document.getElementById("tooltip");
          x == null || x.classList.remove("generate_password__tooltip"),
            requestAnimationFrame(() =>
              x == null ? void 0 : x.classList.add("generate_password__tooltip")
            );
        }
      };
      return (
        document.addEventListener("click", h),
        () => document.removeEventListener("click", h)
      );
    }, []);
    const r =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}[]<>-+~/$\\|",
      c = () => {
        const h = r.split("");
        for (let p = h.length - 1; p > 0; p--) {
          const v = Math.floor(Math.random() * (p + 1));
          [h[p], h[v]] = [h[v], h[p]];
        }
        return h.join("");
      },
      f = () => {
        const h = new Uint8Array(24);
        window.crypto.getRandomValues(h);
        const p = c();
        return Array.from(h, (v) => p[v % p.length]).join("");
      };
    return {
      generatePwd: async () => {
        let h = "";
        for (; !iv.test(h); ) h = await f();
        l(h);
      },
      handleCopyPwd: async () => {
        if (a)
          try {
            await navigator.clipboard.writeText(a);
          } catch {}
      },
      strongPwd: a,
      tooltipRef: i,
    };
  },
  Xd = () => {
    const {
      strongPwd: a,
      generatePwd: l,
      handleCopyPwd: i,
      tooltipRef: r,
    } = gR();
    return g.jsxs("div", {
      className: "w-full max-w-full grid grid-cols-1 gap-3",
      children: [
        g.jsx("div", {
          className: "w-full max-w-fit flex hover:text-orange-500 btn__pseudo",
          children: g.jsxs("button", {
            onClick: l,
            type: "button",
            className:
              "justify-self-start flex gap-4 items-center cursor-pointer",
            children: [
              g.jsx(hS, { className: "w-[30px] h-[30px]" }),
              g.jsx("span", {
                className: "txt__00",
                children: "Generate strong password",
              }),
            ],
          }),
        }),
        !!a &&
          g.jsxs("div", {
            className: "relative group w-full flex max-w-fit",
            children: [
              g.jsx("button", {
                type: "button",
                ref: r,
                onClick: i,
                className:
                  "txt__00 btn__pseudo border-2 border-orange-500 rounded-xl w-full max-w-fit px-6 py-1 cursor-pointer hover:text-orange-500 break-all text-start",
                children: a,
              }),
              g.jsx("span", {
                id: "tooltip",
                className:
                  "tooltip txt__00 max-w-fit px-6 min-w-[150px] opacity-0",
                children: "Password Copied",
              }),
            ],
          }),
      ],
    });
  },
  Pd = ({
    isConfirmPwdVisible: a,
    setIsConfirmPwdVisible: l,
    isPwdVisible: i,
    setIsPwdVisible: r,
  }) => ({
    handleChangePwdVisibility: () => {
      a ? (l(!1), r(!0)) : r(!i);
    },
    handleChangeConfirmPwdVisibility: () => {
      i ? (r(!1), l(!0)) : l(!a);
    },
  }),
  vR = () => {
    const [a, l] = w.useState(!1),
      [i, r] = w.useState(!1);
    Ln();
    const c = mt(),
      f = ct(),
      { handleChangePwdVisibility: d, handleChangeConfirmPwdVisibility: m } =
        Pd({
          isPwdVisible: a,
          setIsPwdVisible: l,
          isConfirmPwdVisible: i,
          setIsConfirmPwdVisible: r,
        }),
      { showToastMsg: h } = $t(),
      {
        register: p,
        handleSubmit: v,
        reset: x,
        watch: E,
        trigger: O,
        formState: { errors: _ },
        setFocus: D,
      } = wa({ mode: "onChange" });
    w.useEffect(() => {
      D("firstName");
    }, [D]);
    const C = E("password");
    w.useEffect(() => {
      C && O("confirmPassword");
    }, [C, O]);
    const { mutate: H, isPending: B } = Mt({
        mutationFn: (ee) => vw(ee),
        onSuccess: () => {
          x(),
            h("Account created successfully", "SUCCESS"),
            c("/notice-email?type=verify-account", {
              state: { from: f.pathname },
            });
        },
        onError: (ee) => {
          var fe, I;
          h(
            ((I =
              (fe = ee == null ? void 0 : ee.response) == null
                ? void 0
                : fe.data) == null
              ? void 0
              : I.msg) || (ee == null ? void 0 : ee.message),
            "ERROR"
          );
        },
      }),
      k = v((ee) => {
        const { confirmPassword: fe, ...I } = ee;
        H(I);
      });
    return {
      register: p,
      errors: _,
      watch: E,
      trigger: O,
      isPwdVisible: a,
      isConfirmPwdVisible: i,
      handleChangePwdVisibility: d,
      handleChangeConfirmPwdVisibility: m,
      isPending: B,
      handleRegister: k,
      customPwd: (ee) =>
        ee === E("email") ? "Password must be different from email" : !0,
      customConfirmPwd: (ee) =>
        ee !== E("password") ? "Passwords do not match 🤔" : !0,
    };
  },
  Zd = ({ watch: a }) => {
    const l = a("password"),
      i = (l == null ? void 0 : l.length) >= 8;
    return g.jsxs("div", {
      className:
        "w-full col-span-2 grid grid-cols-[35px_70px_1fr] items-center",
      children: [
        g.jsx("span", {
          children: i
            ? g.jsx(ic, { className: "w-[30px] h-[30px] text-green-600" })
            : g.jsx(Nd, { className: "w-[30px] h-[30px] text-red-600" }),
        }),
        g.jsx("span", {
          className: `txt__00 ml-2 px-3 py-1 border-2 rounded-xl ${
            i
              ? "text-green-600 border-green-600"
              : "text-red-600 border-red-600"
          }`,
          children: g.jsx(tE, {}),
        }),
        g.jsxs("span", {
          className: `txt__01 ml-4 ${i ? "text-green-600" : "text-red-600"}`,
          children: [(l == null ? void 0 : l.length) ?? 0, " / 8"],
        }),
      ],
    });
  },
  bR = () => {
    var x;
    const {
      register: a,
      errors: l,
      watch: i,
      isPwdVisible: r,
      isConfirmPwdVisible: c,
      handleChangePwdVisibility: f,
      handleChangeConfirmPwdVisibility: d,
      isPending: m,
      handleRegister: h,
      customPwd: p,
      customConfirmPwd: v,
    } = vR();
    return g.jsxs("div", {
      className: "w-full grid grid-cols-1 gap-y-10 items-center",
      children: [
        g.jsx("div", {
          className: "w-full flex justify-center",
          children: g.jsx("span", {
            className: "txt__04",
            children: "Register",
          }),
        }),
        g.jsx("div", {
          className:
            "w-full justify-self-center max-w-[600px] grid grid-cols-1 border-2 border-orange-500 rounded-xl p-10",
          children: g.jsx("div", {
            className: "w-full grid grid-cols-1",
            children: g.jsxs("form", {
              onSubmit: h,
              className: "grid grid-cols-1 w-full gap-y-8",
              children: [
                [...uR, Er].map((E) =>
                  g.jsx(Sr, { register: a, errors: l, field: E }, E.id)
                ),
                g.jsx(il, {
                  register: a,
                  errors: l,
                  custom: p,
                  isVisible: r,
                  handleChangeVisibility: f,
                  field: Qd,
                }),
                g.jsx(Xd, {}),
                !!(
                  (x = Object.keys((l == null ? void 0 : l.password) ?? {})) !=
                    null && x.length
                ) &&
                  g.jsxs("div", {
                    className: "w-full grid grid-cols-2 gap-5 sm:grid-cols-4",
                    children: [
                      g.jsx(Yd, { watch: i }),
                      g.jsx(Zd, { watch: i }),
                    ],
                  }),
                g.jsx(il, {
                  register: a,
                  errors: l,
                  custom: v,
                  isVisible: c,
                  handleChangeVisibility: d,
                  field: Gd,
                }),
                g.jsx(fR, {
                  register: a,
                  errors: l,
                  valTerms: i("acceptedTerms"),
                }),
                m
                  ? g.jsx(Jt, {})
                  : g.jsx("div", {
                      className:
                        "w-full mt-2 max-w-[225px] md:max-w-[250px] justify-self-center flex justify-center",
                      children: g.jsx(ul, {
                        styleTxt: "txt__02 z-40 relative",
                        label: "Register",
                        type: "submit",
                      }),
                    }),
                g.jsx("div", {
                  className: "w-full",
                  children: g.jsx(uv, { type: "register" }),
                }),
              ],
            }),
          }),
        }),
      ],
    });
  },
  xR = ({ reset: a, callAPI: l, type: i, from: r }) => {
    const { showToastMsg: c } = $t(),
      { handleErrAPI: f } = Bn(),
      d = mt(),
      { mutate: m, isPending: h } = Mt({
        mutationFn: ({ email: p }) => l({ email: p, type: i }),
        onSuccess: () => {
          a(),
            c("Verification Email sent successfully", "SUCCESS"),
            d(`/notice-email?type=${i ?? ""}`, { state: { from: r } });
        },
        onError: (p) => {
          var v, x, E;
          ((v = p == null ? void 0 : p.response) == null
            ? void 0
            : v.status) === 403
            ? c(
                (E =
                  (x = p == null ? void 0 : p.response) == null
                    ? void 0
                    : x.data) == null
                  ? void 0
                  : E.msg,
                "ERROR"
              )
            : f({ err: p });
        },
      });
    return { mutate: m, isPending: h };
  },
  SR = () => {
    var O;
    Ln();
    const [a] = rl(),
      l = ct(),
      i = (O = l == null ? void 0 : l.state) == null ? void 0 : O.from,
      r = a.get("type"),
      c =
        $s(["/auth/register", "/auth/login"], i) &&
        $s(["recover-pwd", "verify-account"], r ?? ""),
      {
        register: f,
        handleSubmit: d,
        formState: { errors: m },
        reset: h,
        setFocus: p,
      } = wa({ mode: "onChange" });
    w.useEffect(() => {
      p("email");
    }, [p]);
    const { mutate: v, isPending: x } = xR({
        reset: h,
        callAPI: Sw,
        from: i,
        type: r,
      }),
      E = d((_) => {
        v({ email: _.email });
      });
    return {
      register: f,
      errors: m,
      canStay: c,
      type: r,
      isPending: x,
      handleSubmitEmail: E,
    };
  },
  ER = () => {
    const {
      register: a,
      errors: l,
      canStay: i,
      type: r,
      isPending: c,
      handleSubmitEmail: f,
    } = SR();
    return i
      ? g.jsxs("div", {
          className: "w-full grid grid-cols-1 gap-y-10 items-center",
          children: [
            g.jsx("div", {
              className: "w-full flex justify-center",
              children: g.jsx("span", {
                className: "txt__04",
                children:
                  r === "recover-pwd" ? "Recover Password" : "Verify Account",
              }),
            }),
            g.jsx("div", {
              className:
                "w-full justify-self-center max-w-[600px] grid grid-cols-1 border-2 border-orange-500 rounded-xl p-10",
              children: g.jsx("div", {
                className: "w-full grid grid-cols-1",
                children: g.jsxs("form", {
                  onSubmit: f,
                  className: "grid grid-cols-1 w-full gap-y-8",
                  children: [
                    g.jsx(Sr, { register: a, errors: l, field: Er }),
                    c
                      ? g.jsx(Jt, {})
                      : g.jsx("div", {
                          className:
                            "w-full mt-2 max-w-[225px] md:max-w-[250px] justify-self-center flex justify-center",
                          children: g.jsx(ul, {
                            styleTxt: "txt__02 z-40 relative",
                            label: "Send Email",
                            type: "submit",
                          }),
                        }),
                  ],
                }),
              }),
            }),
          ],
        })
      : g.jsx(Wn, { to: "/", replace: !0 });
  },
  Cp = ({ callAPI: a, successCB: l }) => {
    const { handleErrAPI: i } = Bn(),
      { mutate: r } = Mt({
        mutationFn: ({ userId: c, token: f }) => a({ userId: c, token: f }),
        onSuccess: (c) => {
          l(c);
        },
        onError: (c) => {
          i({ err: c, push: !0 });
        },
      });
    return { mutate: r };
  },
  wR = (a, l) => {
    const { showToastMsg: i } = $t(),
      { setUserLogged: r } = Vt(),
      c = mt(),
      f = ct(),
      d = (v) => {
        r(v.accessToken),
          i("Account Verified Successfully", "SUCCESS"),
          c("/", { replace: !0 });
      },
      { mutate: m } = Cp({
        callAPI: ({ userId: v, token: x }) => Ew({ userId: v, token: x }),
        successCB: (v) => d(v),
      }),
      h = () => {
        i("Email verified Successfully", "SUCCESS"),
          c(`/auth/recover-pwd?userId=${a}&token=${l}`, {
            state: { from: f.pathname },
            replace: !0,
          });
      },
      { mutate: p } = Cp({
        callAPI: ({ userId: v, token: x }) => ww({ userId: v, token: x }),
        successCB: () => h(),
      });
    return { mutateVerify: m, mutateRecover: p };
  },
  _R = () => {
    const { isLogged: a } = Vt();
    Ln();
    const [l] = rl(),
      i = l.get("type"),
      r = l.get("token"),
      c = l.get("userId"),
      f = Kl(c ?? "", mc),
      d = Kl(r ?? "", yc),
      m = $s(["recover-pwd", "verify-account"], i ?? ""),
      h = [d, f, m].every((E) => !!E) && !a,
      { mutateVerify: p, mutateRecover: v } = wR(c, r),
      x = w.useCallback(() => {
        if (h)
          i === "verify-account"
            ? p({ userId: c, token: r })
            : i === "recover-pwd" && v({ userId: c, token: r });
        else return;
      }, [h, p, v, i, r, c]);
    return (
      w.useEffect(() => {
        x();
      }, [x]),
      { canStay: h }
    );
  },
  RR = () => {
    const [a, l] = w.useState(50);
    return (
      w.useEffect(() => {
        const i = () => {
          const r = window.innerWidth;
          return r > Ls.md ? l(100) : r > Ls.sm ? l(75) : l(50);
        };
        return (
          i(),
          window.addEventListener("resize", i),
          () => window.removeEventListener("resize", i)
        );
      }, [l]),
      { size: a }
    );
  },
  pc = () => {
    const { size: a } = RR();
    return g.jsx("div", {
      className: "w-full h-[50vh] sm:h-[75vh] flex justify-center items-center",
      children: g.jsx(Ow, { color: "#f97316", size: a }),
    });
  },
  AR = () => {
    const { canStay: a } = _R();
    return a ? g.jsx(pc, {}) : g.jsx(Wn, { to: "/", replace: !0 });
  },
  TR = () => {
    var ze;
    const [a, l] = w.useState(!1),
      [i, r] = w.useState(!1),
      { handleErrAPI: c } = Bn(),
      { showToastMsg: f } = $t(),
      { setUserLogged: d, isLogged: m } = Vt();
    Ln();
    const h = ct(),
      p = mt(),
      [v] = rl(),
      x = v.get("token"),
      E = v.get("userId"),
      O = mc.test(E ?? ""),
      _ = yc.test(x ?? ""),
      D =
        ((ze = h == null ? void 0 : h.state) == null ? void 0 : ze.from) ===
          "/auth/verify" &&
        O &&
        _ &&
        !m,
      { handleChangePwdVisibility: C, handleChangeConfirmPwdVisibility: H } =
        Pd({
          isPwdVisible: a,
          setIsPwdVisible: l,
          isConfirmPwdVisible: i,
          setIsConfirmPwdVisible: r,
        }),
      {
        register: B,
        setFocus: k,
        formState: { errors: ne },
        handleSubmit: Y,
        reset: ee,
        watch: fe,
        trigger: I,
      } = wa({ mode: "onChange" }),
      { mutate: X, isPending: le } = Mt({
        mutationFn: ({ password: Ee, token: K, userId: ce }) =>
          _w({ password: Ee, token: K, userId: ce }),
        onSuccess: (Ee) => {
          ee(),
            d(Ee.accessToken),
            f("Password changed successfully", "SUCCESS"),
            p("/", { replace: !0 });
        },
        onError: (Ee) => {
          c({ err: Ee });
        },
      }),
      Ve = Y((Ee) => {
        const { password: K } = Ee;
        X({ password: K, token: x, userId: E });
      }),
      de = fe("password");
    return (
      w.useEffect(() => {
        k("password");
      }, [k]),
      w.useEffect(() => {
        de && I("confirmPassword");
      }, [de, I]),
      {
        register: B,
        errors: ne,
        watch: fe,
        isPwdVisible: a,
        isConfirmPwdVisible: i,
        handleChangePwdVisibility: C,
        handleChangeConfirmPwdVisibility: H,
        canStay: D,
        handleSubmitRecoverPwd: Ve,
        isPending: le,
        customConfirmPwd: (Ee) =>
          Ee !== fe("password") ? "Passwords do not match 🤔" : !0,
      }
    );
  },
  CR = () => {
    var x;
    const {
      register: a,
      errors: l,
      watch: i,
      isPwdVisible: r,
      isConfirmPwdVisible: c,
      handleChangePwdVisibility: f,
      handleChangeConfirmPwdVisibility: d,
      canStay: m,
      isPending: h,
      handleSubmitRecoverPwd: p,
      customConfirmPwd: v,
    } = TR();
    return m
      ? g.jsxs("div", {
          className: "w-full grid grid-cols-1 gap-y-10 items-center",
          children: [
            g.jsx("div", {
              className: "w-full flex justify-center",
              children: g.jsx("span", {
                className: "txt__04",
                children: "Recover Password",
              }),
            }),
            g.jsx("div", {
              className:
                "w-full justify-self-center max-w-[600px] grid grid-cols-1 border-2 border-orange-500 rounded-xl p-10",
              children: g.jsx("div", {
                className: "w-full grid grid-cols-1",
                children: g.jsxs("form", {
                  onSubmit: p,
                  className: "grid grid-cols-1 w-full gap-y-8",
                  children: [
                    g.jsx(il, {
                      register: a,
                      errors: l,
                      isVisible: r,
                      handleChangeVisibility: f,
                      field: Qd,
                    }),
                    !!(
                      (x = Object.keys(
                        (l == null ? void 0 : l.password) ?? {}
                      )) != null && x.length
                    ) &&
                      g.jsxs("div", {
                        className:
                          "w-full grid grid-cols-2 gap-5 sm:grid-cols-4",
                        children: [
                          g.jsx(Yd, { watch: i }),
                          g.jsx(Zd, { watch: i }),
                        ],
                      }),
                    g.jsx(Xd, {}),
                    g.jsx(il, {
                      register: a,
                      errors: l,
                      custom: v,
                      isVisible: c,
                      handleChangeVisibility: d,
                      field: Gd,
                    }),
                    h
                      ? g.jsx(Jt, {})
                      : g.jsx("div", {
                          className:
                            "w-full mt-2 max-w-[250px] md:max-w-[300px] justify-self-center flex justify-center",
                          children: g.jsx(ul, {
                            styleTxt: "txt__02 z-40 relative",
                            label: "Change Password",
                            type: "submit",
                          }),
                        }),
                  ],
                }),
              }),
            }),
          ],
        })
      : g.jsx(Wn, { to: "/", replace: !0 });
  };
var Zt = ((a) => (
  (a.UPDATE_FIELD = "UPDATE_FIELD"),
  (a.SET_ERR = "SET_ERR"),
  (a.SET_REQUIRED = "SET_REQUIRED"),
  (a.SET_PREV_DISABLED = "SET_PREV_DISABLED"),
  (a.SET_NEXT_DISABLED = "SET_NEXT_DISABLED"),
  (a.SET_CURR = "SET_CURR"),
  (a.SET_FETCHED_DATA = "SET_FETCHED_DATA"),
  a
))(Zt || {});
const NR = (a, l) => {
    var i, r, c, f, d, m;
    switch (l.type) {
      case Zt.UPDATE_FIELD: {
        const { field: h, val: p } = l.payload;
        return { ...a, user: { ...a.user, [h]: p } };
      }
      case Zt.SET_ERR: {
        const { field: h, msg: p } = l.payload;
        return { ...a, errs: { ...a.errs, [h]: { ...a.errs[h], msg: p } } };
      }
      case Zt.SET_REQUIRED: {
        const { field: h, required: p } = l.payload;
        return {
          ...a,
          errs: { ...a.errs, [h]: { ...a.errs[h], required: p } },
        };
      }
      case Zt.SET_CURR: {
        const { curr: h } = l.payload;
        return h === "PREV" && !a.currForm.isPrevDisabled
          ? {
              ...a,
              currForm: {
                curr: a.currForm.curr - 1,
                isPrevDisabled: a.currForm.curr - 1 === 0,
                isNextDisabled: !1,
              },
            }
          : {
              ...a,
              currForm: {
                curr: a.currForm.curr + 1,
                isPrevDisabled: !1,
                isNextDisabled: a.currForm.curr + 1 === cv - 1,
              },
            };
      }
      case Zt.SET_NEXT_DISABLED: {
        const { isNextDisabled: h } = l.payload;
        return { ...a, currForm: { ...a.currForm, isNextDisabled: h } };
      }
      case Zt.SET_FETCHED_DATA: {
        const { user: h } = l.payload;
        return {
          ...a,
          user: {
            firstName: (h == null ? void 0 : h.firstName) ?? "",
            lastName: (h == null ? void 0 : h.lastName) ?? "",
            country:
              ((i = h == null ? void 0 : h.address) == null
                ? void 0
                : i.country) ?? "",
            state:
              ((r = h == null ? void 0 : h.address) == null
                ? void 0
                : r.state) ?? "",
            city:
              ((c = h == null ? void 0 : h.address) == null
                ? void 0
                : c.city) ?? "",
            street:
              ((f = h == null ? void 0 : h.address) == null
                ? void 0
                : f.street) ?? "",
            zipCode:
              ((d = h == null ? void 0 : h.address) == null
                ? void 0
                : d.zipCode) ?? "",
            phone:
              ((m = h == null ? void 0 : h.address) == null
                ? void 0
                : m.phone) ?? "",
          },
          errs: {},
        };
      }
      default:
        return a;
    }
  },
  Kd = [
    {
      id: Ce(),
      field: "firstName",
      label: "First Name",
      reg: nc,
      msg: "First Name should start with a capital letter and can only contains letters and apostrophe ",
    },
    {
      id: Ce(),
      field: "lastName",
      label: "Last Name",
      reg: nc,
      msg: "Last Name should start with a capital letter and can only contains letters and apostrophe",
    },
  ],
  $d = [
    {
      id: Ce(),
      field: "country",
      label: "Country",
      reg: j_,
      msg: "Country can only contains letters, and must be at least 2 chars",
    },
    {
      id: Ce(),
      field: "state",
      label: "State",
      reg: D_,
      msg: "State can only contains can only contains letters and hyphens if needed, and must be at least 2 chars ",
    },
    {
      id: Ce(),
      field: "city",
      label: "City",
      reg: U_,
      msg: "City can only contains letters and hyphens if needed, and must be at least 2 chars",
    },
  ],
  Jd = [
    {
      id: Ce(),
      field: "street",
      label: "Street",
      reg: M_,
      msg: "Street can only contains letters, numbers, and spaces, and must be at least 5 chars",
    },
    {
      id: Ce(),
      field: "zipCode",
      label: "Zip Code",
      reg: z_,
      msg: "Zip Code can only contains numbers, at least 5 up to 10 digits",
    },
    {
      id: Ce(),
      field: "phone",
      label: "Phone",
      reg: L_,
      msg: "Phone can only contains numbers,and including country up to 15 digits ",
    },
  ],
  OR = [...Kd, ...$d, ...Jd],
  jR = [[...Kd], [...$d], [...Jd]],
  DR = (a, l) => {
    let i;
    for (const r in l)
      a.map((c) => c.field).includes(r) && (i = { ...i, [r]: l[r] });
    return i;
  },
  UR = (a, l) => {
    let i = !0;
    for (let r = 0; r < l.length; r++) l[r].reg.test(a[l[r].field]) || (i = !1);
    return i;
  },
  MR = (a, l, i, r) => {
    a({
      type: Zt.SET_ERR,
      payload: { field: l, msg: r.reg.test(i ?? "") ? null : r.msg },
    }),
      a({
        type: Zt.SET_REQUIRED,
        payload: { field: l, required: i ? null : `${r.label} is required` },
      });
  },
  Np = (a, l, i, r, c) => {
    const f = jR[c ?? l.currForm.curr],
      d = DR(f, l.user);
    i !== void 0 && r !== void 0 && (d[i] = r);
    const m = UR(d, f);
    a({ type: Zt.SET_NEXT_DISABLED, payload: { isNextDisabled: !m } });
  },
  zR = (a, l, i, r) => {
    const { name: c, value: f } = r.target,
      [d] = OR.filter((m) => m.field === c);
    l(c, f, d),
      i(c, f),
      a({ type: Zt.UPDATE_FIELD, payload: { field: c, val: f } });
  },
  LR = (a, l) =>
    l > 0 ? a({ type: Zt.SET_CURR, payload: { curr: "PREV" } }) : void 0,
  HR = (a, l, i) => {
    l.curr < cv - 1 &&
      !l.isNextDisabled &&
      a({ type: Zt.SET_CURR, payload: { curr: "NEXT" } }),
      i(void 0, void 0, l.curr + 1);
  },
  BR = (a, l) => a({ type: Zt.SET_FETCHED_DATA, payload: { user: l } }),
  qR = () => {
    const {
      data: a,
      isPending: l,
      isError: i,
      isSuccess: r,
      error: c,
    } = Md({ queryKey: ["userProfileDetails"], queryFn: Z_ });
    return {
      fetchedUserData: a,
      isPending: l,
      isSuccess: r,
      isError: i,
      error: c,
    };
  },
  kR = {
    currForm: { curr: 0, isPrevDisabled: !0, isNextDisabled: !1 },
    user: {
      firstName: "",
      lastName: "",
      country: "",
      state: "",
      city: "",
      street: "",
      zipCode: "",
      phone: "",
    },
    errs: {},
  },
  VR = () => {
    const {
      mutate: a,
      data: l,
      isPending: i,
      isSuccess: r,
      isError: c,
      error: f,
    } = Mt({ mutationFn: (d) => K_(d) });
    return {
      dataUpdate: l,
      isPendingUpdate: i,
      isSuccessUpdate: r,
      isErrorUpdate: c,
      errorUpdate: f,
      mutateUpdate: a,
    };
  },
  cv = 3,
  FR = () => {
    const { handleErrAPI: a } = Bn(),
      { showToastMsg: l } = $t(),
      {
        fetchedUserData: i,
        isPending: r,
        isSuccess: c,
        isError: f,
        error: d,
      } = qR(),
      {
        dataUpdate: m,
        isPendingUpdate: h,
        isSuccessUpdate: p,
        isErrorUpdate: v,
        errorUpdate: x,
        mutateUpdate: E,
      } = VR(),
      [O, _] = w.useReducer(NR, kR),
      D = w.useCallback((I) => BR(_, I), [_]),
      C = w.useCallback(() => {
        if (f) a({ err: d });
        else if (c) {
          const { user: I = {} } = i ?? {};
          D(I);
        }
      }, [i, c, f, d, a, D]),
      H = w.useCallback(() => {
        if (v) a({ err: x });
        else if (p) {
          l("Profile updated successfully", "SUCCESS");
          const { user: I = {} } = m ?? {};
          D(I);
        }
      }, [v, a, x, p, l, D, m]);
    w.useEffect(() => {
      C();
    }, [C]),
      w.useEffect(() => {
        H();
      }, [H]);
    const B = (I, X, le) => MR(_, I, X, le),
      k = (I, X, le) => Np(_, O, I, X, le);
    return {
      state: O,
      handleChange: (I) => zR(_, B, k, I),
      handlePrev: () => LR(_, O.currForm.curr),
      handleNext: () => HR(_, O.currForm, k),
      handleBtns: Np,
      isPending: r,
      isPendingUpdate: h,
      handleSubmit: (I) => {
        I.preventDefault(), E({ ...O.user });
      },
    };
  },
  QR = () => {
    const {
      state: a,
      handleChange: l,
      handlePrev: i,
      handleNext: r,
      isPending: c,
      isPendingUpdate: f,
      handleSubmit: d,
    } = FR();
    Ln();
    const { isPrevDisabled: m, isNextDisabled: h, curr: p } = a.currForm;
    return {
      isPrevDisabled: m,
      isNextDisabled: h,
      handleNext: r,
      handlePrev: i,
      curr: p,
      state: a,
      handleChange: l,
      isPending: c,
      isPendingUpdate: f,
      handleSubmit: d,
    };
  },
  $l = ({
    isDisabled: a,
    label: l,
    type: i = "button",
    handleClick: r,
    styleTxt: c,
    styleBtn: f,
  }) =>
    g.jsxs("button", {
      disabled: a,
      onClick: r,
      type: i,
      className: "btn__with_shadow_container group",
      children: [
        g.jsx("div", {
          className: `${f} btn__with_shadow_container__content`,
          children: g.jsx("span", {
            className: `${c} content__txt`,
            children: l,
          }),
        }),
        g.jsx("span", { className: `${f} btn__with_shadow_container__shadow` }),
      ],
    }),
  GR = ({
    isPrevDisabled: a,
    isNextDisabled: l,
    handlePrev: i,
    handleNext: r,
    curr: c,
    isPendingUpdate: f,
  }) =>
    g.jsxs("div", {
      className: `w-full grid grid-cols-2\r
     items-center h-fit justify-items-center`,
      children: [
        g.jsx("div", {
          className: "w-full max-w-[30vw] sm:max-w-[200px]",
          children: g.jsx($l, {
            label: "Prev",
            type: "button",
            styleTxt: "txt__02",
            isDisabled: a,
            handleClick: i,
            styleBtn:
              "group-hover:text-orange-500 group-hover:border-orange-500",
          }),
        }),
        c === 2
          ? f
            ? g.jsx(Jt, {})
            : g.jsx("div", {
                className: "w-full max-w-[200px] h-full flex items-center",
                children: g.jsx(ul, {
                  label: "Save",
                  isDisabled: l,
                  type: "submit",
                  styleTxt: "txt__02",
                }),
              })
          : g.jsx("div", {
              className: "w-full max-w-[30vw] sm:max-w-[200px]",
              children: g.jsx($l, {
                label: "Next",
                type: "button",
                styleTxt: "txt__02",
                isDisabled: l,
                handleClick: r,
                styleBtn:
                  "group-hover:text-orange-500 group-hover:border-orange-500",
              }),
            }),
      ],
    }),
  Gf = ({ el: a, state: l, handleChange: i }) => {
    var c, f;
    const r = (c = l.errs) == null ? void 0 : c[a.field];
    return g.jsxs(
      "label",
      {
        className: "w-full flex flex-col gap-y-2",
        children: [
          g.jsx("span", { className: "txt__02", children: a.label }),
          g.jsx("input", {
            onChange: i,
            type: "text",
            className:
              "w-full outline-none px-5 py-1 txt__01 border-2 border-orange-500 rounded-full focus__base transition-all duration-300",
            placeholder: `${a.label}`,
            name: a.field,
            value: l.user[a.field],
          }),
          !!((f = Object.keys(r ?? {})) != null && f.length) &&
            g.jsx("span", {
              className: "txt__00 text-red-600",
              children:
                (r == null ? void 0 : r.required) ||
                (r == null ? void 0 : r.msg) ||
                void 0,
            }),
        ],
      },
      a.id
    );
  },
  YR = ({ state: a, handleChange: l }) =>
    g.jsxs(g.Fragment, {
      children: [
        g.jsx("div", {
          className:
            "grid grid-cols-1 p-5 gap-y-5 h-fit transition-all duration-500",
          children: Kd.map((i) =>
            g.jsx(Gf, { state: a, handleChange: l, el: i }, i.id)
          ),
        }),
        g.jsx("div", {
          className:
            "min-w-full grid grid-cols-1 p-5 gap-y-5 transition-all duration-500 h-fit ",
          children: $d.map((i) =>
            g.jsx(Gf, { state: a, handleChange: l, el: i }, i.id)
          ),
        }),
        g.jsx("div", {
          className:
            "min-w-full grid grid-cols-1 p-5 gap-y-5 transition-all duration-500 h-fit ",
          children: Jd.map((i) =>
            g.jsx(Gf, { state: a, handleChange: l, el: i }, i.id)
          ),
        }),
      ],
    }),
  XR = () => {
    const {
      isPrevDisabled: a,
      isNextDisabled: l,
      handleNext: i,
      handlePrev: r,
      curr: c,
      state: f,
      handleChange: d,
      isPending: m,
      isPendingUpdate: h,
      handleSubmit: p,
    } = QR();
    return g.jsxs("div", {
      className: "w-full grid grid-cols-1 justify-items-center gap-y-5",
      children: [
        g.jsx("span", {
          className: "txt__04",
          children: "Your Profile Details",
        }),
        m
          ? g.jsx(pc, {})
          : g.jsxs("form", {
              onSubmit: p,
              className:
                "w-full max-w-[600px] justify-self-center grid grid-cols-1 border-[3px] gap-5 border-orange-500 rounded-xl h-fit p-5 sm:px-10",
              children: [
                g.jsx("div", {
                  className: "w-full overflow-hidden",
                  children: g.jsx("div", {
                    className:
                      "w-[300%] grid grid-cols-3 transition-all duration-500 min-h-[250px]",
                    style: { transform: `translateX(-${(c * 100) / 3}%)` },
                    children: g.jsx(YR, { state: f, handleChange: d }),
                  }),
                }),
                g.jsx(GR, {
                  isPrevDisabled: a,
                  isNextDisabled: l,
                  handlePrev: r,
                  handleNext: i,
                  curr: c,
                  isPendingUpdate: h,
                }),
              ],
            }),
      ],
    });
  },
  PR = () => {
    Ln();
    const [a] = rl(),
      l = mt(),
      i = ct(),
      { showToastMsg: r } = $t(),
      { handleErrAPI: c } = Bn(),
      f = a.get("typeUser"),
      d = a.get("userId"),
      m = a.get("token"),
      h =
        $s(["non-logged", "logged"], f ?? "") &&
        Kl(m ?? "", yc) &&
        Kl(d ?? "", mc),
      {
        isError: p,
        error: v,
        isSuccess: x,
      } = Md({
        queryKey: ["unSubscribeViaLink", d, m, f],
        queryFn: () =>
          f === "logged"
            ? l_({ userId: d ?? "", token: m ?? "" })
            : s_({ userId: d ?? "", token: m ?? "" }),
        enabled: !!h,
      });
    return (
      w.useEffect(() => {
        (() => {
          var O, _, D;
          p
            ? ((O = v == null ? void 0 : v.response) == null
                ? void 0
                : O.status) === 401
              ? (l("/newsletter/notice-unsubscribe-with-retry?success=false", {
                  state: { from: i.pathname },
                  replace: !0,
                }),
                r(
                  (D =
                    (_ = v == null ? void 0 : v.response) == null
                      ? void 0
                      : _.data) == null
                    ? void 0
                    : D.msg,
                  "ERROR"
                ))
              : c({ err: v, push: !0 })
            : x &&
              (l("/newsletter/notice-unsubscribe-with-retry?success=true", {
                state: { from: i.pathname },
                replace: !0,
              }),
              r("Subscription deleted successfully", "SUCCESS"));
        })();
      }, [p, v, r, l, f, i.pathname, x, c]),
      { canStay: h }
    );
  },
  ZR = () => {
    const { canStay: a } = PR();
    return a ? g.jsx(pc, {}) : g.jsx(Wn, { to: "/", replace: !0 });
  },
  KR = () => {
    var _;
    const { showToastMsg: a } = $t(),
      { handleErrAPI: l } = Bn();
    Ln();
    const [i] = rl(),
      r = ct(),
      c = mt(),
      f = i.get("success"),
      d =
        ((_ = r == null ? void 0 : r.state) == null ? void 0 : _.from) ===
        "/newsletter/verify-unsubscribe",
      {
        register: m,
        formState: { errors: h },
        handleSubmit: p,
        reset: v,
      } = wa({ mode: "onChange" }),
      { mutate: x, isPending: E } = Mt({
        mutationFn: ({ email: D }) => i_({ email: D }),
        onSuccess: () => {
          v(),
            a("Email sent successfully", "SUCCESS"),
            c("/notice-email?type=sentEmailUnsubscribe", {
              state: { from: r.pathname },
            });
        },
        onError: (D) => {
          l({ err: D });
        },
      }),
      O = p((D) => {
        x({ email: D.email });
      });
    return {
      canStay: d,
      success: f,
      register: m,
      errors: h,
      handleSubmitEmail: O,
      isPending: E,
    };
  },
  $R = () => {
    const {
      canStay: a,
      success: l,
      register: i,
      errors: r,
      handleSubmitEmail: c,
      isPending: f,
    } = KR();
    return a
      ? l === "true"
        ? g.jsxs("div", {
            className: "w-full flex flex-col items-center gap-y-14",
            children: [
              g.jsx("div", {
                className: "w-full flex justify-center",
                children: g.jsx("span", {
                  className: "txt__04 leading-10 lg:leading-16",
                  children:
                    "Your subscription has deleted successfully, if you unsubscribe by mistake don't worry, you can subscribe again anytime ✌🏼",
                }),
              }),
              g.jsx("div", {
                className: "w-full flex justify-center items-center",
                children: g.jsx(ic, {
                  className:
                    "w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] md:w-[400px] md:h-[400px] text-green-600",
                }),
              }),
            ],
          })
        : g.jsxs("div", {
            className: "w-full grid grid-cols-1 gap-y-10 items-center",
            children: [
              g.jsx("div", {
                className: "w-full flex justify-center",
                children: g.jsx("span", {
                  className: "txt__04",
                  children: "Send unsubscribe link",
                }),
              }),
              g.jsx("div", {
                className:
                  "w-full justify-self-center max-w-[600px] grid grid-cols-1 border-2 border-orange-500 rounded-xl p-10",
                children: g.jsx("div", {
                  className: "w-full grid grid-cols-1",
                  children: g.jsxs("form", {
                    onSubmit: c,
                    className: "grid grid-cols-1 w-full gap-y-8",
                    children: [
                      g.jsx(Sr, { register: i, errors: r, field: Er }),
                      f
                        ? g.jsx(Jt, {})
                        : g.jsx("div", {
                            className:
                              "w-full mt-2 max-w-[225px] md:max-w-[250px] justify-self-center flex justify-center",
                            children: g.jsx(ul, {
                              styleTxt: "txt__02 z-40 relative",
                              label: "Send Email",
                              type: "submit",
                            }),
                          }),
                    ],
                  }),
                }),
              }),
            ],
          })
      : g.jsx(Wn, { to: "/", replace: !0 });
  },
  JR = () => {
    Ln();
    const { showToastMsg: a } = $t(),
      { handleErrAPI: l } = Bn(),
      {
        setCanManageAccount: i,
        canManageAccount: r,
        currUser: c,
        logoutUser: f,
      } = Vt();
    return {
      showToastMsg: a,
      canManageAccount: r,
      setCanManageAccount: i,
      currUser: c,
      handleErrManageUser: (m) => {
        var x, E, O, _, D;
        const h =
            (x = m == null ? void 0 : m.response) == null ? void 0 : x.status,
          p =
            (O =
              (E = m == null ? void 0 : m.response) == null
                ? void 0
                : E.config) == null
              ? void 0
              : O.url,
          v =
            ((D =
              (_ = m == null ? void 0 : m.response) == null
                ? void 0
                : _.data) == null
              ? void 0
              : D.msg) || m.message;
        p === "/user/manage-account"
          ? (h === 401 ? a(v, "ERROR") : h === 429 && f(), l({ err: m }))
          : (h === 401 && i(!1), l({ err: m }));
      },
    };
  },
  WR = ({ setCanManageAccount: a, handleErrManageUser: l }) => {
    const [i, r] = w.useState(!1),
      c = () => r(!i),
      {
        register: f,
        formState: { errors: d },
        handleSubmit: m,
        setFocus: h,
      } = wa({ mode: "onChange" });
    w.useEffect(() => {
      h("password");
    }, [h]);
    const { mutate: p, isPending: v } = Mt({
        mutationFn: (E) => $_(E),
        onSuccess: (E) => {
          a(E.manageAccountToken);
        },
        onError: (E) => {
          l(E);
        },
      }),
      x = m((E) => {
        p(E.password);
      });
    return {
      register: f,
      errors: d,
      isPwdVisible: i,
      handleChangeVisibility: c,
      submitManageForm: x,
      isPending: v,
    };
  },
  IR = ({ setCanManageAccount: a, handleErrManageUser: l }) => {
    const {
      register: i,
      errors: r,
      isPwdVisible: c,
      handleChangeVisibility: f,
      submitManageForm: d,
      isPending: m,
    } = WR({ setCanManageAccount: a, handleErrManageUser: l });
    return g.jsxs("form", {
      onSubmit: d,
      className:
        "w-full max-w-[600px] justify-self-center grid grid-cols-1 border-[3px] gap-10 border-orange-500 rounded-xl h-fit p-5 sm:px-10 justify-items-center",
      children: [
        g.jsx("span", {
          className: "txt__03",
          children: "Confirm your password before proceeding",
        }),
        g.jsx("div", {
          className: "w-full",
          children: g.jsx(il, {
            field: Fd,
            register: i,
            errors: r,
            isVisible: c,
            handleChangeVisibility: f,
          }),
        }),
        g.jsx("div", {
          className:
            "w-full flex max-w-[200px] sm:max-w-[250px] justify-center",
          children: m
            ? g.jsx(Jt, {})
            : g.jsx($l, {
                label: "Submit",
                styleTxt: "txt__02",
                type: "submit",
              }),
        }),
      ],
    });
  },
  eA = ({ showToastMsg: a, setIsChildLoading: l, handleErrManageUser: i }) => {
    const r = ct(),
      c = mt(),
      {
        register: f,
        formState: { errors: d },
        handleSubmit: m,
        setFocus: h,
      } = wa({ mode: "onChange" });
    w.useEffect(() => {
      h("newEmail");
    }, [h]);
    const { mutate: p, isPending: v } = Mt({
        mutationFn: (O) => (l(!0), J_(O)),
        onSuccess: () => {
          a("Email changed successfully!", "SUCCESS"),
            c("/notice-email?type=change-email", {
              state: { from: r.pathname },
            });
        },
        onError: (O) => {
          i(O);
        },
        onSettled: () => {
          l(!1);
        },
      }),
      x = m((O) => {
        p({
          newEmail: O.newEmail,
          manageAccountToken:
            sessionStorage.getItem("manageAccountToken") ?? "",
        });
      });
    return {
      register: f,
      errors: d,
      handleSubmitChangeEmail: x,
      isPending: v,
      custom: (O, _) =>
        O === _ ? "New Email must be different from old one" : !0,
    };
  },
  tA = ({
    currUser: a,
    showToastMsg: l,
    setIsChildLoading: i,
    handleErrManageUser: r,
  }) => {
    const {
      register: c,
      errors: f,
      handleSubmitChangeEmail: d,
      isPending: m,
      custom: h,
    } = eA({ showToastMsg: l, setIsChildLoading: i, handleErrManageUser: r });
    return g.jsxs("div", {
      className:
        "w-full grid grid-cols-1 justify-items-center gap-y-5 py-5 px-5 sm:px-10 h-[300px]",
      children: [
        g.jsx("span", { className: "txt__03", children: "Change Email" }),
        g.jsxs("form", {
          onSubmit: d,
          className: "w-full grid grid-cols-1 justify-items-center gap-y-6",
          children: [
            g.jsx("div", {
              className: "w-full",
              children: g.jsx(Sr, {
                register: c,
                errors: f,
                field: rR,
                custom: (p) => h(p, a == null ? void 0 : a.email),
              }),
            }),
            m
              ? g.jsx(Jt, {})
              : g.jsx("div", {
                  className: "w-full flex justify-center max-w-[250px]",
                  children: g.jsx($l, {
                    styleTxt: "txt__02",
                    label: "Submit",
                    type: "submit",
                  }),
                }),
          ],
        }),
      ],
    });
  },
  Op = 3,
  nA = () => {
    const [a, l] = w.useState(0),
      [i, r] = w.useState(!1),
      c = a === 0,
      f = a === Op - 1;
    return {
      currForm: a,
      handlePrev: () => (a > 0 ? l((h) => h - 1) : void 0),
      handleNext: () => (a < Op - 1 ? l((h) => h + 1) : void 0),
      isPrevDisabled: c,
      isNextDisabled: f,
      isChildLoading: i,
      setIsChildLoading: r,
    };
  },
  aA = ({
    isPrevDisabled: a,
    isNextDisabled: l,
    handlePrev: i,
    handleNext: r,
    bothDisabled: c,
  }) =>
    g.jsxs("div", {
      className: "w-full flex justify-between",
      children: [
        g.jsx("div", {
          className: "w-[min(35vw,200px)] sm:max-w-[200px]",
          children: g.jsx($l, {
            type: "button",
            styleTxt: "txt__02",
            label: "Prev",
            handleClick: i,
            isDisabled: c || a,
          }),
        }),
        g.jsx("div", {
          className: "w-[min(35vw,200px)] sm:max-w-[200px]",
          children: g.jsx($l, {
            type: "button",
            styleTxt: "txt__02",
            label: "Next",
            handleClick: r,
            isDisabled: c || l,
          }),
        }),
      ],
    }),
  lA = ({
    showToastMsg: a,
    handleErrManageUser: l,
    setIsChildLoading: i,
    setCanManageAccount: r,
  }) => {
    const [c, f] = w.useState(!1),
      [d, m] = w.useState(!1),
      h = mt(),
      {
        register: p,
        watch: v,
        reset: x,
        formState: { errors: E },
        handleSubmit: O,
      } = wa({ mode: "onChange" }),
      { handleChangePwdVisibility: _, handleChangeConfirmPwdVisibility: D } =
        Pd({
          isConfirmPwdVisible: d,
          setIsConfirmPwdVisible: m,
          isPwdVisible: c,
          setIsPwdVisible: f,
        }),
      { mutate: C, isPending: H } = Mt({
        mutationFn: (Y) => (i(!0), I_(Y)),
        onSuccess: () => {
          x(), a("Password changed successfully", "SUCCESS"), h("/");
        },
        onError: (Y) => {
          l(Y);
        },
        onSettled: () => {
          i(!1), r(!1);
        },
      }),
      B = O((Y) => {
        const { newPassword: ee } = Y;
        C({
          newPassword: ee,
          manageAccountToken:
            sessionStorage.getItem("manageAccountToken") ?? "",
        });
      });
    return {
      register: p,
      errors: E,
      watch: v,
      handleChangePwdVisibility: _,
      handleChangeConfirmPwdVisibility: D,
      isConfirmPwdVisible: d,
      isPwdVisible: c,
      customPwd: (Y, ee) =>
        Y === ee ? "Password must be different from email" : !0,
      customConfirmPwd: (Y) =>
        Y !== v("newPassword") ? "Passwords do not match 🤔" : !0,
      isPending: H,
      handleSubmitChangePwd: B,
    };
  },
  sA = ({
    showToastMsg: a,
    handleErrManageUser: l,
    setIsChildLoading: i,
    currUser: r,
    setCanManageAccount: c,
  }) => {
    var C;
    const {
      register: f,
      errors: d,
      watch: m,
      handleChangePwdVisibility: h,
      handleChangeConfirmPwdVisibility: p,
      isConfirmPwdVisible: v,
      isPwdVisible: x,
      customPwd: E,
      customConfirmPwd: O,
      isPending: _,
      handleSubmitChangePwd: D,
    } = lA({
      showToastMsg: a,
      handleErrManageUser: l,
      setIsChildLoading: i,
      setCanManageAccount: c,
    });
    return g.jsxs("div", {
      className:
        "w-full grid grid-cols-1 justify-items-center gap-y-5 py-5 pb-10 px-5 sm:px-10",
      children: [
        g.jsx("span", { className: "txt__03", children: "Change Password" }),
        g.jsxs("form", {
          onSubmit: D,
          className: "w-full grid grid-cols-1 justify-items-center gap-y-5",
          children: [
            g.jsx("div", {
              className: "w-full",
              children: g.jsx(il, {
                field: cR,
                register: f,
                errors: d,
                isVisible: x,
                handleChangeVisibility: h,
                custom: (H) => E(H, r == null ? void 0 : r.email),
              }),
            }),
            !!(
              (C = Object.keys((d == null ? void 0 : d.newPassword) ?? {})) !=
                null && C.length
            ) &&
              g.jsxs("div", {
                className: "w-full grid grid-cols-2 sm:grid-cols-3 gap-3",
                children: [g.jsx(Yd, { watch: m }), g.jsx(Zd, { watch: m })],
              }),
            g.jsx(Xd, {}),
            g.jsx("div", {
              className: "w-full",
              children: g.jsx(il, {
                field: Gd,
                register: f,
                errors: d,
                isVisible: v,
                handleChangeVisibility: p,
                custom: O,
              }),
            }),
            _
              ? g.jsx(Jt, {})
              : g.jsx("div", {
                  className: "w-full flex justify-center max-w-[250px] mt-5",
                  children: g.jsx($l, {
                    styleTxt: "txt__02",
                    label: "Submit",
                    type: "submit",
                  }),
                }),
          ],
        }),
      ],
    });
  },
  iA = ({ showToastMsg: a, setIsChildLoading: l, handleErrManageUser: i }) => {
    const r = mt(),
      { logoutUser: c } = Vt(),
      { mutate: f, isPending: d } = Mt({
        mutationFn: (h) => (l(!0), eR(h)),
        onSuccess: () => {
          c(),
            r("/", { replace: !0 }),
            a("Account deleted successfully", "SUCCESS");
        },
        onError: (h) => {
          i(h);
        },
        onSettled: () => {
          l(!1);
        },
      });
    return {
      handleSubmitDeleteAccount: () => {
        f(sessionStorage.getItem("manageAccountToken") ?? "");
      },
      isPending: d,
    };
  },
  rA = ({ showToastMsg: a, setIsChildLoading: l, handleErrManageUser: i }) => {
    const { handleSubmitDeleteAccount: r, isPending: c } = iA({
      showToastMsg: a,
      setIsChildLoading: l,
      handleErrManageUser: i,
    });
    return c
      ? g.jsx("div", {
          className: "w-full flex justify-center mt-14",
          children: g.jsx(Jt, {}),
        })
      : g.jsx("div", {
          className: "w-full flex justify-center mt-14",
          children: g.jsx("button", {
            onClick: r,
            className:
              "max-w-fit group border-2 border-red-600 transition-all duration-300 hover:scale-120 rounded-xl gap-3 cursor-pointer",
            children: g.jsxs("div", {
              className: "px-5 py-2 w-full flex justify-start gap-3",
              children: [
                g.jsx(lE, {
                  className:
                    "w-[30px] h-[30px] transition-all duration-300 group-hover:text-red-600",
                }),
                g.jsx("span", {
                  className:
                    "txt__02 transition-all duration-300 group-hover:text-red-600",
                  children: "Delete Account",
                }),
              ],
            }),
          }),
        });
  },
  uA = ({ showToastMsg: a, setIsChildLoading: l, handleErrManageUser: i }) =>
    g.jsxs("div", {
      className:
        "w-full grid grid-cols-1 justify-items-center gap-y-5 py-5 pb-10 px-5 sm:px-10",
      children: [
        g.jsx("span", { className: "txt__03", children: "Delete Account" }),
        g.jsxs("div", {
          children: [
            g.jsx("span", {
              className: "txt__02",
              children: "This action is ",
            }),
            g.jsx("span", { className: "txt__03", children: "irreversible " }),
            g.jsx("span", {
              className: "txt__02",
              children:
                ", continuing you will delete your account and all associated data, without possibility of recovery.",
            }),
          ],
        }),
        g.jsx(rA, {
          showToastMsg: a,
          setIsChildLoading: l,
          handleErrManageUser: i,
        }),
      ],
    }),
  cA = ({
    currUser: a,
    showToastMsg: l,
    handleErrManageUser: i,
    setCanManageAccount: r,
  }) => {
    const {
      currForm: c,
      handlePrev: f,
      handleNext: d,
      isPrevDisabled: m,
      isNextDisabled: h,
      isChildLoading: p,
      setIsChildLoading: v,
    } = nA();
    return g.jsxs("div", {
      className:
        "w-full grid grid-cols-1 justify-items-center gap-y-10 max-w-[600px]",
      children: [
        g.jsx("div", {
          className: `w-full max-w-[600px] justify-self-center grid grid-cols-1 border-[3px] gap-5 border-orange-500 rounded-xl overflow-hidden h-fit  transition-all duration-500 ${
            c === 0
              ? "max-h-[350px]"
              : c === 1
              ? "max-h-[750px]"
              : "max-h-[350px]"
          }`,
          children: g.jsxs("div", {
            className:
              "w-[300%] grid grid-cols-3 transition-all duration-500 place-items-start justify-items-start",
            style: { transform: `translateX(-${(c * 100) / 3}%)` },
            children: [
              g.jsx(tA, {
                currUser: a,
                showToastMsg: l,
                setIsChildLoading: v,
                handleErrManageUser: i,
              }),
              g.jsx(sA, {
                currUser: a,
                showToastMsg: l,
                setIsChildLoading: v,
                handleErrManageUser: i,
                setCanManageAccount: r,
              }),
              g.jsx(uA, {
                showToastMsg: l,
                setIsChildLoading: v,
                handleErrManageUser: i,
              }),
            ],
          }),
        }),
        g.jsx(aA, {
          bothDisabled: p,
          isPrevDisabled: m,
          isNextDisabled: h,
          handlePrev: f,
          handleNext: d,
        }),
      ],
    });
  },
  oA = () => {
    const {
      showToastMsg: a,
      canManageAccount: l,
      currUser: i,
      handleErrManageUser: r,
      setCanManageAccount: c,
    } = JR();
    return g.jsxs("div", {
      className:
        "w-full grid grid-cols-1 justify-items-center gap-5 sm:gap-y-10",
      children: [
        g.jsx("span", {
          className: "txt__04",
          children: "Manage your account",
        }),
        l
          ? g.jsx(cA, {
              currUser: i,
              showToastMsg: a,
              handleErrManageUser: r,
              setCanManageAccount: c,
            })
          : g.jsx(IR, { handleErrManageUser: r, setCanManageAccount: c }),
      ],
    });
  },
  fA = () => {
    const [a] = rl(),
      l = mt(),
      { showToastMsg: i } = $t(),
      { handleErrAPI: r } = Bn(),
      c = a.get("token"),
      f = a.get("userId"),
      d = Kl(f ?? "", mc),
      m = Kl(c ?? "", yc),
      h = d && m,
      { mutate: p } = Mt({
        mutationFn: (v) => W_(v),
        onSuccess: () => {
          i("New Email successfully verified!", "SUCCESS"),
            l("/", { replace: !0 });
        },
        onError: (v) => {
          r({ err: v, push: !0 });
        },
      });
    return (
      w.useEffect(() => {
        h && p({ token: c ?? "", userId: f ?? "" });
      }, [h, p, c, f]),
      { canStay: h }
    );
  },
  dA = () => {
    const { canStay: a } = fA();
    return a ? g.jsx(pc, {}) : g.jsx(Wn, { to: "/", replace: !0 });
  },
  hA = () => (
    tR(),
    g.jsxs(Tx, {
      children: [
        g.jsxs(_t, {
          path: "/",
          element: g.jsx(Q_, {}),
          children: [
            g.jsx(_t, { index: !0, element: g.jsx(uS, {}) }),
            g.jsxs(_t, {
              path: "auth",
              element: g.jsx(G_, {}),
              children: [
                g.jsx(_t, { path: "login", element: g.jsx(oR, {}) }),
                g.jsx(_t, { path: "register", element: g.jsx(bR, {}) }),
                g.jsx(_t, { path: "send-email", element: g.jsx(ER, {}) }),
                g.jsx(_t, { path: "verify", element: g.jsx(AR, {}) }),
                g.jsx(_t, { path: "recover-pwd", element: g.jsx(CR, {}) }),
              ],
            }),
            g.jsxs(_t, {
              path: "user",
              element: g.jsx(nR, {}),
              children: [
                g.jsx(_t, { path: "profile", element: g.jsx(XR, {}) }),
                g.jsx(_t, { path: "manage-account", element: g.jsx(oA, {}) }),
              ],
            }),
            g.jsx(_t, { path: "verify-new-email", element: g.jsx(dA, {}) }),
            g.jsx(_t, { path: "notice-email", element: g.jsx(X_, {}) }),
            g.jsxs(_t, {
              path: "newsletter",
              element: g.jsx(aR, {}),
              children: [
                g.jsx(_t, {
                  path: "verify-unsubscribe",
                  element: g.jsx(ZR, {}),
                }),
                g.jsx(_t, {
                  path: "notice-unsubscribe-with-retry",
                  element: g.jsx($R, {}),
                }),
              ],
            }),
          ],
        }),
        g.jsx(_t, { path: "*", element: g.jsx(Wn, { to: "/", replace: !0 }) }),
      ],
    })
  ),
  gd = "SET_IS_TOAST",
  mA = (a, l) => {
    const { isToast: i, msg: r, type: c } = l.payload;
    if (!i) return { ...a, isToast: i };
    if (i && [r, c].some((f) => !f))
      throw new Error("Missing fields " + l.type);
    return { ...a, isToast: i, msg: r ?? "", type: c ?? "SUCCESS" };
  },
  yA = (a, l) => {
    switch (l.type) {
      case gd:
        return mA(a, l);
      default:
        return a;
    }
  },
  vd = "SET_IS_LOGGED",
  bd = "SET_CURR_USER",
  xd = "SET_CAN_MANAGE_ACCOUNT",
  pA = (a, l) => {
    switch (l.type) {
      case vd:
        return { ...a, isLogged: l.payload };
      case bd:
        return { ...a, currUser: l.payload };
      case xd:
        return { ...a, canManageAccount: l.payload };
      default:
        return a;
    }
  },
  gA = (a, l) => ({
    toastState: yA(a.toastState, l),
    userState: pA(a.userState, l),
  }),
  vA = { isToast: !1, msg: "", type: "SUCCESS" },
  bA = {
    currUser: null,
    isLogged: !!sessionStorage.getItem("accessToken"),
    canManageAccount: !!sessionStorage.getItem("manageAccountToken"),
  },
  xA = { toastState: vA, userState: bA },
  SA = (a, l) => {
    const i = () => l({ type: gd, payload: { isToast: !1 } }),
      r = w.useCallback(
        (c, f) => {
          l({ type: gd, payload: { isToast: !0, msg: c, type: f } });
        },
        [l]
      );
    return { closeToast: i, showToastMsg: r, ...a };
  },
  EA = (a) => {
    var l, i;
    return (
      ((l = a.firstName.slice(0, 1)) == null ? void 0 : l.toUpperCase()) +
      ((i = a.lastName.slice(0, 1)) == null ? void 0 : i.toUpperCase())
    );
  },
  wA = (a, l) => {
    const i = w.useCallback(
        (d) => {
          d
            ? sessionStorage.setItem("accessToken", d)
            : sessionStorage.removeItem("accessToken"),
            l({ type: vd, payload: !!d });
        },
        [l]
      ),
      r = w.useCallback(
        ({ user: d }) => {
          d
            ? sessionStorage.getItem("initName") ||
              sessionStorage.setItem("initName", EA(d))
            : sessionStorage.removeItem("initName"),
            l({ type: bd, payload: d });
        },
        [l]
      ),
      c = w.useCallback(
        (d) => {
          d
            ? sessionStorage.setItem("manageAccountToken", d)
            : sessionStorage.removeItem("manageAccountToken"),
            l({ type: xd, payload: !!d });
        },
        [l]
      ),
      f = w.useCallback(() => {
        sessionStorage.removeItem("accessToken"),
          sessionStorage.removeItem("manageAccountToken"),
          sessionStorage.removeItem("initName"),
          l({ type: vd, payload: !1 }),
          l({ type: bd, payload: null }),
          l({ type: xd, payload: !1 });
      }, [l]);
    return {
      ...a,
      setCurrUser: r,
      setUserLogged: i,
      setCanManageAccount: c,
      logoutUser: f,
    };
  },
  _A = () => {
    const [a, l] = w.useReducer(gA, xA),
      i = SA(a.toastState, l),
      r = wA(a.userState, l);
    return { toastState: { ...i }, userState: { ...r } };
  },
  RA = ({ children: a }) =>
    g.jsx(ug.Provider, { value: { ..._A() }, children: a }),
  AA = new AE({
    defaultOptions: {
      queries: { retry: !1, refetchOnWindowFocus: !1 },
      mutations: { retry: !1 },
    },
  });
zb.createRoot(document.getElementById("root")).render(
  g.jsx(Wx, {
    children: g.jsx(jE, {
      client: AA,
      children: g.jsx(RA, { children: g.jsx(hA, {}) }),
    }),
  })
);
