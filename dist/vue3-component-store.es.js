import {inject as s, provide as i, reactive as u} from 'vue'

function c(e, n = {}) {
  return e.reduce((t, o) => {
    const r = o(u(t))
    return {...t, ...r}
  }, u(n))
}
function m(...e) {
  const n = Symbol("component-store");
  return [
    function(o) {
      const r = u(c(e, o));
      return i(n, r), r;
    },
    function() {
      return s(n);
    }
  ];
}
function p(...e) {
  return () => c(e);
}
export {
  m as componentStore,
  p as storeFeature
};
