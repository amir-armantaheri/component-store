import {inject as s, provide as i, reactive as u} from 'vue'

function c(e, n = {}) {
  return e.reduce((t, o) => {
    const r = o(u(t))
    return {...t, ...r}
  }, n)
}
function m(...e) {
  const n = Symbol("component-store");
  function t() {
    const r = u(c(e));
    return i(n, r), r;
  }
  function o() {
    return s(n);
  }
  return [t, o];
}
function p(...e) {
  return () => c(e);
}
export {
  m as componentStore,
  p as storeFeature
};
