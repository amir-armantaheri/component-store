import { reactive as o, toRefs as r, provide as s, inject as m } from "vue";
function a(...c) {
  const e = Symbol("componentStore");
  function i() {
    const t = c.reduce((n, f) => {
      const p = f(n);
      return o({ ...r(n), ...r(p) });
    }, o({}));
    return s(e, t), t;
  }
  function u() {
    return m(e);
  }
  return [i, u];
}
export {
  a as createComponentStore
};
