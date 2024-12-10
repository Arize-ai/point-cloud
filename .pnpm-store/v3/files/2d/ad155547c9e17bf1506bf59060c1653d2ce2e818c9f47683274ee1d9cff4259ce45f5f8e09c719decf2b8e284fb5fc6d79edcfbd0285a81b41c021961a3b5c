import { lazy, useState, useEffect, Fragment, Component, Suspense, useMemo, useCallback } from 'react';
import { css, jsx } from '@storybook/theming';
import { AddonPanel, Placeholder, Link, FlexBar, Separator, Tabs, IconButton, Icons } from '@storybook/components';
import { FigspecFileViewer, FigspecFrameViewer } from '@figspec/react';
import { addons, types, useStorybookState, useParameter } from '@storybook/manager-api';

var ke=Object.defineProperty;var D=(e,t)=>()=>(e&&(t=e(e=0)),t);var Se=(e,t)=>{for(var o in t)ke(e,o,{get:t[o],enumerable:!0});};var w,Le,Ae,Me,A=D(()=>{w=({config:e,defer:t=!1})=>{let[o,r]=useState(t?void 0:e.url),[n,a]=useState(!1);return useEffect(()=>{if(!t)return;let i=requestAnimationFrame(()=>{r(e.url);});return ()=>cancelAnimationFrame(i)},[t,e.url]),useEffect(()=>{a(!1);},[o]),jsx("div",{css:Le},!n&&jsx(Placeholder,{css:Ae},"Loading..."),jsx("iframe",{css:Me,src:o,allowFullScreen:e.allowFullscreen,onLoad:()=>a(!0)}))},Le=css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  overflow: hidden;
`,Ae=css`
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
`,Me=css`
  position: relative;
  width: 100%;
  height: 100%;
  border: none;

  z-index: 1;
`;});var $,Ue,J,H=D(()=>{A();$=/https:\/\/[\w.-]+\.?figma.com\/([\w-]+)\/([0-9a-zA-Z]{22,128})(?:\/.*)?$/,Ue=e=>$.test(e),J=({config:e})=>{let t=useMemo(()=>Ue(e.url)?{url:`https://www.figma.com/embed?embed_host=${e.embedHost||location.hostname}&url=${e.url}`,allowFullscreen:e.allowFullscreen}:(console.warn(`[storybook-addon-designs] The URL you specified is not valid Figma URL.
The addon fallbacks to normal iframe mode.For more detail, please check <https://www.figma.com/developers/embed>.`),e),[e.url,e.allowFullscreen,e.embedHost]);return jsx(w,{defer:!0,config:t})};});var ue={};Se(ue,{Figspec:()=>de,default:()=>fo});function M(e){return e.status!==200?Promise.reject(e.statusText):e.json()}function po(e){if(e.accessToken)return e.accessToken;try{return process.env.STORYBOOK_FIGMA_ACCESS_TOKEN??null}catch{return null}}function fe(e){return "absoluteBoundingBox"in e?[e]:!e.children||e.children.length===0?[]:e.children.map(fe).reduce((t,o)=>t.concat(o),[])}var pe,de,fo,ge=D(()=>{H();pe=css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;de=({config:e})=>{let[t,o]=useState({state:"loading"}),r=async n=>{o({state:"loading"});try{let a=e.url.match($);if(!a)throw new Error(e.url+" is not a valid Figma URL.");let[,,i]=a,u=new URL(e.url).searchParams.get("node-id"),b=po(e);if(!b)throw new Error("Personal Access Token is required.");let m={"X-FIGMA-TOKEN":b},l=new URL(`https://api.figma.com/v1/files/${i}`),s=new URL(`https://api.figma.com/v1/images/${i}`);if(s.searchParams.set("format","svg"),!u){let v=await fetch(l.href,{headers:m,signal:n}).then(T=>M(T)),we=fe(v.document);s.searchParams.set("ids",we.map(T=>T.id).join(","));let Ce=await fetch(s.href,{headers:m,signal:n}).then(T=>M(T));o({state:"fetched",value:{type:"file",props:{documentNode:v,renderedImages:Ce.images,link:e.url}}});return}l.pathname+="/nodes",l.searchParams.set("ids",u),s.searchParams.set("ids",u);let[f,S]=await Promise.all([fetch(l.href,{headers:m,signal:n}).then(v=>M(v)),fetch(s.href,{headers:m,signal:n}).then(v=>M(v))]);o({state:"fetched",value:{type:"frame",props:{nodes:f,renderedImage:Object.values(S.images)[0],link:e.url}}});}catch(a){if(a instanceof DOMException&&a.code===DOMException.ABORT_ERR)return;console.error(a),o({state:"failed",error:a instanceof Error?a.message:String(a)});}};switch(useEffect(()=>{let n=!1,a=()=>{n=!0;},i=new AbortController;return r(i.signal).then(a,a),()=>{n||i.abort();}},[e.url]),t.state){case"loading":return jsx(Placeholder,null,jsx(Fragment,null,"Loading Figma file..."));case"failed":return jsx(Placeholder,null,jsx(Fragment,null,"Failed to load Figma file"),jsx(Fragment,null,t.error));case"fetched":return t.value.type==="file"?jsx(FigspecFileViewer,{css:pe,...t.value.props}):jsx(FigspecFrameViewer,{css:pe,...t.value.props})}},fo=de;});var L="STORYBOOK_ADDON_DESIGNS",U=L+"/panel",y="design";var E=class extends Component{constructor(){super(...arguments);this.state={hasError:!1};}static getDerivedStateFromError(o){return {hasError:!0,error:o}}componentDidCatch(o,r){console.group("An error occurred during rendering Addon panel of storybook-addon-designs"),console.log("--- Error ---"),console.error(o),console.log("--- React Component Stack ---"),console.error(r.componentStack),console.groupEnd();}render(){return this.state.hasError?jsx(Placeholder,null,jsx(Fragment,null,"Failed to render addon UI"),jsx(Fragment,null,jsx("p",null,"Sorry, this addon has crashed due to the below error has thrown during rendering the addon UI."),jsx("pre",null,String(this.state.error)),jsx("p",null,"See console log for more details. To clear the error state, please reload the page."," ",jsx(Link,{href:"https://github.com/storybookjs/addon-designs/issues/new?assignees=&labels=category%3A+bug&template=bug_report.yml",target:"_blank",rel:"noopener",withArrow:!0,cancel:!1},"Bug report")))):this.props.children}};H();A();var x=(e,t)=>{let[o,r]=useState([0,0]),[n,a]=useState(!1),i=useCallback(s=>{s.button===0&&(r([s.screenX,s.screenY]),a(!0));},[a,r]),d=useCallback(s=>{let f=s.touches[0];r([f.screenX,f.screenY]),a(!0);},[a,r]),u=useCallback(s=>{n&&r(f=>(e([s[0]-f[0],s[1]-f[1]]),s));},[r,n,...t]),b=useCallback(s=>{let{screenX:f,screenY:S}=s;u([f,S]);},[u]),m=useCallback(s=>{let{screenX:f,screenY:S}=s.touches[0];u([f,S]);},[r,n,...t]),l=useCallback(()=>{r([0,0]),a(!1);},[a,r]);return {onMouseDown:i,onMouseMove:b,onMouseUp:l,onMouseLeave:l,onTouchStart:d,onTouchMove:m,onTouchCancel:l,onTouchEnd:l}};var oe=({children:e,className:t,style:o,defaultValue:r,value:n,onChange:a})=>{let[i,d]=useState([0,0]);useEffect(()=>{d(r||n||[0,0]);},[r]);let u=x(m=>{a&&a(m),d(l=>[l[0]+m[0],l[1]+m[1]]);},[d,a]),b=useMemo(()=>{let m=n||i;return {transform:`translate(${m[0]}px, ${m[1]}px)`}},[n,i]);return jsx("div",{css:He,className:t,style:o,...u},jsx("div",{css:_e,style:b},e))};var He=css`
  position: relative;
  overflow: hidden;

  &:active {
    cursor: move;
  }
`,_e=css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;var re=({onZoomIn:e,onZoomOut:t,onReset:o})=>jsx(Fragment,null,jsx(IconButton,{onClick:e},jsx(Icons,{icon:"zoom"})),jsx(IconButton,{onClick:t},jsx(Icons,{icon:"zoomout"})),jsx(IconButton,{onClick:o},jsx(Icons,{icon:"zoomreset"})));var te=(e,t)=>{let[o,r]=useState(1);useEffect(()=>{r(e);},t);let n=useCallback(()=>{r(d=>d+.1);},[r]),a=useCallback(()=>{r(d=>Math.max(d-.1,.1));},[r]),i=useCallback(()=>{r(1);},[r]);return {scale:o,zoomIn:n,zoomOut:a,resetZoom:i}};var ne=({config:e})=>{let t=te(e.scale||1,[e.scale]),o=useMemo(()=>({transform:`scale(${t.scale})`}),[t.scale]);return jsx("div",{css:Ge},jsx(FlexBar,{border:!0},jsx(Fragment,{key:"left"},jsx("p",null,jsx("b",null,"Image")),jsx(Separator,null),jsx(re,{onReset:t.resetZoom,onZoomIn:t.zoomIn,onZoomOut:t.zoomOut}))),jsx(oe,{css:qe,defaultValue:e.offset},jsx("img",{css:Je,src:e.url,style:o})))};var Ge=css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`,qe=css`
  flex-grow: 1;
`,Je=css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;

  pointer-events: none;
  border-radius: 1px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15);
`;var se=({config:e})=>jsx("div",{css:je},jsx(Link,{cancel:!1,href:e.url,target:e.target??"_blank",rel:e.rel??"noopener",withArrow:e.showArrow??!0},e.label||e.url));var je=css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;A();var ro=e=>{if(e.protocol!=="https:")return {valid:!1,error:jsx(Fragment,null,"Expected HTTPS link, received ",jsx("code",null,e.protocol),".")};if(e.hostname!=="www.sketch.com")return {valid:!1,error:jsx(Fragment,null,"Expected a hostname ",jsx("code",null,"www.sketch.com"),", received"," ",jsx("code",null,e.hostname))};let t=jsx(Fragment,null,"Expected pathname ",jsx("code",null,"/s/<string>/a/<string>"),", received"," ",jsx("code",null,e.pathname),"."),o=e.pathname.split("/").slice(1);if(o.length<4)return {valid:!1,error:t};if(o[0]==="embed")return {valid:!0,data:{url:e.href,offscreen:!1}};let[r,n,a,i]=o;return r!=="s"||!n||a!=="a"||!i?{valid:!1,error:t}:{valid:!0,data:{url:`https://www.sketch.com/embed/s/${n}/a/${i}`,offscreen:!1}}},ie=({config:e})=>{let t=useMemo(()=>{let o=ro(new URL(e.url));return o.valid?{...o,data:{...e,...o.data}}:o},[e]);return t.valid?jsx(w,{defer:!0,config:t.data}):jsx(Placeholder,null,jsx(Fragment,null,"Invalid Sketch URL"),jsx(Fragment,null,t.error))};var me=({tabs:e,deps:t=[]})=>{let[o,r]=useState(e[0].id);return useEffect(()=>{r(e[0].id);},t),jsx(Tabs,{absolute:!0,selected:o,actions:{onSelect:r}},e.map(n=>jsx("div",{key:n.id,id:n.id,title:n.name},n.offscreen||o===n.id?n.content:null)))};var ho=lazy(()=>Promise.resolve().then(()=>(ge(),ue))),Fe=({config:e})=>{if(!e||"length"in e&&e.length===0)return jsx(Placeholder,null,jsx(Fragment,null,"No designs found"),jsx(Fragment,null,"Learn how to"," ",jsx(Link,{href:"https://github.com/storybookjs/addon-designs#3-add-it-to-story",target:"_blank",rel:"noopener",withArrow:!0,cancel:!1},"display design preview for the story")));let t=[...e instanceof Array?e:[e]].map(o=>{let r={id:JSON.stringify(o),name:o.name||o.type?.toUpperCase()||"ERROR",offscreen:o.offscreen??!0};switch(o.type){case"iframe":return {...r,content:jsx(w,{config:o})};case"figma":return {...r,content:jsx(J,{config:o}),offscreen:!1};case"sketch":return {...r,content:jsx(ie,{config:o})};case"figspec":case"experimental-figspec":return o.type==="experimental-figspec"&&console.warn("[storybook-addon-designs] `experimental-figspec` is deprecated. We will remove it in v7.0. Please replace it to `figspec` type."),{...r,content:jsx(Suspense,{fallback:"Preparing Figspec viewer..."},jsx(ho,{config:o})),offscreen:!1};case"image":return {...r,content:jsx(ne,{config:o})};case"link":return {...r,content:jsx(se,{config:o})}}return {...r,content:jsx(Placeholder,null,jsx(Fragment,null,"Invalid config type"),jsx(Fragment,null,"Config type you set is not supported. Please choose one from"," ",jsx(Link,{href:"https://github.com/storybookjs/addon-designs/blob/master/packages/storybook-addon-designs/src/config.ts",target:"_blank",rel:"noopener",withArrow:!0,cancel:!1},"available config types")))}});return t.length===1?jsx("div",null,t[0].content):jsx(me,{tabs:t,deps:[e]})};var Y=({active:e})=>{let t=useStorybookState(),o=useParameter(y),[r,n]=useState(e);return useEffect(()=>{n(e);},[o]),useEffect(()=>{e&&n(!0);},[e]),r?jsx(Fe,{key:t.storyId,config:o}):null};var I="Design";function ye(e){addons.register(L,t=>{let o=function(){let r=useParameter(y);return r?Array.isArray(r)?r.length>0?`${I} (${r.length})`:I:(r.name||I)+" (1)":I};e==="tab"?addons.add(U,{title:I,render({active:r}){return r?jsx(E,null,jsx(Y,{active:!0})):jsx("noscript",null)},type:types.TAB,paramKey:y}):addons.add(U,{type:types.PANEL,title:o,paramKey:y,render({active:r}){return jsx(AddonPanel,{active:!!r},jsx(E,null,jsx(Y,{active:!!r})))}});});}ye("tab");
//# sourceMappingURL=out.js.map
//# sourceMappingURL=register-tab.mjs.map