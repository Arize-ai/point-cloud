/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=Promise.resolve();class s{constructor(t,s){this.v=[],this.p=!0,this._=!1,this.m=t,this.C=s,this.j=new Promise(((t,s)=>{this.O=t}))}addController(t){this.v.push(t)}removeController(t){var s;null===(s=this.v)||void 0===s||s.splice(this.v.indexOf(t)>>>0,1)}requestUpdate(){this.p||(this.p=!0,t.then((()=>this.C(++this.m))))}get updateComplete(){return this.j}M(){this._=!0,this.v.forEach((t=>{var s;return null===(s=t.hostConnected)||void 0===s?void 0:s.call(t)}))}N(){this._=!1,this.v.forEach((t=>{var s;return null===(s=t.hostDisconnected)||void 0===s?void 0:s.call(t)}))}P(){this.v.forEach((t=>{var s;return null===(s=t.hostUpdate)||void 0===s?void 0:s.call(t)}))}R(){this.p=!1;const t=this.O;this.j=new Promise(((t,s)=>{this.O=t})),this.v.forEach((t=>{var s;return null===(s=t.hostUpdated)||void 0===s?void 0:s.call(t)})),t(this.p)}}const i=(i,e)=>{const{useState:r,useLayoutEffect:o}=i,[n,h]=r(0);let u=!1;const[d]=r((()=>{const i=new s(n,h),r=e(i);return i.L=r,i.M(),u=!0,t.then((()=>{u&&i.N()})),i}));return d.p=!0,o((()=>(u=!1,d._||d.M(),()=>d.N())),[]),o((()=>d.R())),d.P(),d.L};export{i as useController};
//# sourceMappingURL=use-controller.js.map
