(function(n,e){typeof exports=="object"&&typeof module<"u"?e(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],e):(n=typeof globalThis<"u"?globalThis:n||self,e(n["vue3-component-store"]={},n.Vue))})(this,function(n,e){"use strict";function c(t,o={}){return t.reduce((r,u)=>{const i=u(e.reactive(r));return{...r,...i}},e.reactive(o))}function f(...t){const o=Symbol("component-store");return[function(u){const i=e.reactive(c(t,u));return e.provide(o,i),i},function(){return e.inject(o)}]}function s(...t){return()=>c(t)}n.componentStore=f,n.storeFeature=s,Object.defineProperty(n,Symbol.toStringTag,{value:"Module"})});
