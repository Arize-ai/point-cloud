import p, { lazy, useState, useEffect, useMemo, Fragment, Suspense, useCallback } from 'react';
import { css, styled, jsx } from '@storybook/theming';
import { Placeholder, ActionBar, FlexBar, Separator, Link, IconButton, Icons, Tabs } from '@storybook/components';
import { FigspecFileViewer, FigspecFrameViewer } from '@figspec/react';
import { useOf } from '@storybook/blocks';

var he=Object.defineProperty;var N=(e,o)=>()=>(e&&(o=e(e=0)),o);var Fe=(e,o)=>{for(var t in o)he(e,t,{get:o[t],enumerable:!0});};var P,be,Ce,ve,S=N(()=>{P=({config:e,defer:o=!1})=>{let[t,r]=useState(o?void 0:e.url),[n,s]=useState(!1);return useEffect(()=>{if(!o)return;let a=requestAnimationFrame(()=>{r(e.url);});return ()=>cancelAnimationFrame(a)},[o,e.url]),useEffect(()=>{s(!1);},[t]),jsx("div",{css:be},!n&&jsx(Placeholder,{css:Ce},"Loading..."),jsx("iframe",{css:ve,src:t,allowFullScreen:e.allowFullscreen,onLoad:()=>s(!0)}))},be=css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  overflow: hidden;
`,Ce=css`
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
`,ve=css`
  position: relative;
  width: 100%;
  height: 100%;
  border: none;

  z-index: 1;
`;});var $,ke,B,L=N(()=>{S();$=/https:\/\/[\w.-]+\.?figma.com\/([\w-]+)\/([0-9a-zA-Z]{22,128})(?:\/.*)?$/,ke=e=>$.test(e),B=({config:e})=>{let o=useMemo(()=>ke(e.url)?{url:`https://www.figma.com/embed?embed_host=${e.embedHost||location.hostname}&url=${e.url}`,allowFullscreen:e.allowFullscreen}:(console.warn(`[storybook-addon-designs] The URL you specified is not valid Figma URL.
The addon fallbacks to normal iframe mode.For more detail, please check <https://www.figma.com/developers/embed>.`),e),[e.url,e.allowFullscreen,e.embedHost]);return jsx(P,{defer:!0,config:o})};});var q={};Fe(q,{Figspec:()=>E,default:()=>Ee});function D(e){return e.status!==200?Promise.reject(e.statusText):e.json()}function De(e){if(e.accessToken)return e.accessToken;try{return process.env.STORYBOOK_FIGMA_ACCESS_TOKEN??null}catch{return null}}function G(e){return "absoluteBoundingBox"in e?[e]:!e.children||e.children.length===0?[]:e.children.map(G).reduce((o,t)=>o.concat(t),[])}var X,E,Ee,H=N(()=>{L();X=css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;E=({config:e})=>{let[o,t]=useState({state:"loading"}),r=async n=>{t({state:"loading"});try{let s=e.url.match($);if(!s)throw new Error(e.url+" is not a valid Figma URL.");let[,,a]=s,u=new URL(e.url).searchParams.get("node-id"),F=De(e);if(!F)throw new Error("Personal Access Token is required.");let c={"X-FIGMA-TOKEN":F},f=new URL(`https://api.figma.com/v1/files/${a}`),i=new URL(`https://api.figma.com/v1/images/${a}`);if(i.searchParams.set("format","svg"),!u){let v=await fetch(f.href,{headers:c,signal:n}).then(k=>D(k)),ue=G(v.document);i.searchParams.set("ids",ue.map(k=>k.id).join(","));let ge=await fetch(i.href,{headers:c,signal:n}).then(k=>D(k));t({state:"fetched",value:{type:"file",props:{documentNode:v,renderedImages:ge.images,link:e.url}}});return}f.pathname+="/nodes",f.searchParams.set("ids",u),i.searchParams.set("ids",u);let[g,y]=await Promise.all([fetch(f.href,{headers:c,signal:n}).then(v=>D(v)),fetch(i.href,{headers:c,signal:n}).then(v=>D(v))]);t({state:"fetched",value:{type:"frame",props:{nodes:g,renderedImage:Object.values(y.images)[0],link:e.url}}});}catch(s){if(s instanceof DOMException&&s.code===DOMException.ABORT_ERR)return;console.error(s),t({state:"failed",error:s instanceof Error?s.message:String(s)});}};switch(useEffect(()=>{let n=!1,s=()=>{n=!0;},a=new AbortController;return r(a.signal).then(s,s),()=>{n||a.abort();}},[e.url]),o.state){case"loading":return jsx(Placeholder,null,jsx(Fragment,null,"Loading Figma file..."));case"failed":return jsx(Placeholder,null,jsx(Fragment,null,"Failed to load Figma file"),jsx(Fragment,null,o.error));case"fetched":return o.value.type==="file"?jsx(FigspecFileViewer,{css:X,...o.value.props}):jsx(FigspecFrameViewer,{css:X,...o.value.props})}},Ee=E;});L();H();S();var Q=(e,o)=>{let[t,r]=useState([0,0]),[n,s]=useState(!1),a=useCallback(i=>{i.button===0&&(r([i.screenX,i.screenY]),s(!0));},[s,r]),l=useCallback(i=>{let g=i.touches[0];r([g.screenX,g.screenY]),s(!0);},[s,r]),u=useCallback(i=>{n&&r(g=>(e([i[0]-g[0],i[1]-g[1]]),i));},[r,n,...o]),F=useCallback(i=>{let{screenX:g,screenY:y}=i;u([g,y]);},[u]),c=useCallback(i=>{let{screenX:g,screenY:y}=i.touches[0];u([g,y]);},[r,n,...o]),f=useCallback(()=>{r([0,0]),s(!1);},[s,r]);return {onMouseDown:a,onMouseMove:F,onMouseUp:f,onMouseLeave:f,onTouchStart:l,onTouchMove:c,onTouchCancel:f,onTouchEnd:f}};var oe=({children:e,className:o,style:t,defaultValue:r,value:n,onChange:s})=>{let[a,l]=useState([0,0]);useEffect(()=>{l(r||n||[0,0]);},[r]);let u=Q(c=>{s&&s(c),l(f=>[f[0]+c[0],f[1]+c[1]]);},[l,s]),F=useMemo(()=>{let c=n||a;return {transform:`translate(${c[0]}px, ${c[1]}px)`}},[n,a]);return jsx("div",{css:Ne,className:o,style:t,...u},jsx("div",{css:Ue,style:F},e))};var Ne=css`
  position: relative;
  overflow: hidden;

  &:active {
    cursor: move;
  }
`,Ue=css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;var te=({onZoomIn:e,onZoomOut:o,onReset:t})=>jsx(Fragment,null,jsx(IconButton,{onClick:e},jsx(Icons,{icon:"zoom"})),jsx(IconButton,{onClick:o},jsx(Icons,{icon:"zoomout"})),jsx(IconButton,{onClick:t},jsx(Icons,{icon:"zoomreset"})));var re=(e,o)=>{let[t,r]=useState(1);useEffect(()=>{r(e);},o);let n=useCallback(()=>{r(l=>l+.1);},[r]),s=useCallback(()=>{r(l=>Math.max(l-.1,.1));},[r]),a=useCallback(()=>{r(1);},[r]);return {scale:t,zoomIn:n,zoomOut:s,resetZoom:a}};var M=({config:e})=>{let o=re(e.scale||1,[e.scale]),t=useMemo(()=>({transform:`scale(${o.scale})`}),[o.scale]);return jsx("div",{css:_e},jsx(FlexBar,{border:!0},jsx(Fragment,{key:"left"},jsx("p",null,jsx("b",null,"Image")),jsx(Separator,null),jsx(te,{onReset:o.resetZoom,onZoomIn:o.zoomIn,onZoomOut:o.zoomOut}))),jsx(oe,{css:We,defaultValue:e.offset},jsx("img",{css:Ye,src:e.url,style:t})))};var _e=css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`,We=css`
  flex-grow: 1;
`,Ye=css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;

  pointer-events: none;
  border-radius: 1px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15);
`;L();S();var se=({config:e})=>jsx("div",{css:Ge},jsx(Link,{cancel:!1,href:e.url,target:e.target??"_blank",rel:e.rel??"noopener",withArrow:e.showArrow??!0},e.label||e.url));var Ge=css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;S();var Qe=e=>{if(e.protocol!=="https:")return {valid:!1,error:jsx(Fragment,null,"Expected HTTPS link, received ",jsx("code",null,e.protocol),".")};if(e.hostname!=="www.sketch.com")return {valid:!1,error:jsx(Fragment,null,"Expected a hostname ",jsx("code",null,"www.sketch.com"),", received"," ",jsx("code",null,e.hostname))};let o=jsx(Fragment,null,"Expected pathname ",jsx("code",null,"/s/<string>/a/<string>"),", received"," ",jsx("code",null,e.pathname),"."),t=e.pathname.split("/").slice(1);if(t.length<4)return {valid:!1,error:o};if(t[0]==="embed")return {valid:!0,data:{url:e.href,offscreen:!1}};let[r,n,s,a]=t;return r!=="s"||!n||s!=="a"||!a?{valid:!1,error:o}:{valid:!0,data:{url:`https://www.sketch.com/embed/s/${n}/a/${a}`,offscreen:!1}}},ae=({config:e})=>{let o=useMemo(()=>{let t=Qe(new URL(e.url));return t.valid?{...t,data:{...e,...t.data}}:t},[e]);return o.valid?jsx(P,{defer:!0,config:o.data}):jsx(Placeholder,null,jsx(Fragment,null,"Invalid Sketch URL"),jsx(Fragment,null,o.error))};var ce=({tabs:e,deps:o=[]})=>{let[t,r]=useState(e[0].id);return useEffect(()=>{r(e[0].id);},o),jsx(Tabs,{absolute:!0,selected:t,actions:{onSelect:r}},e.map(n=>jsx("div",{key:n.id,id:n.id,title:n.name},n.offscreen||t===n.id?n.content:null)))};var no=lazy(()=>Promise.resolve().then(()=>(H(),q))),pe=({config:e})=>{if(!e||"length"in e&&e.length===0)return jsx(Placeholder,null,jsx(Fragment,null,"No designs found"),jsx(Fragment,null,"Learn how to"," ",jsx(Link,{href:"https://github.com/storybookjs/addon-designs#3-add-it-to-story",target:"_blank",rel:"noopener",withArrow:!0,cancel:!1},"display design preview for the story")));let o=[...e instanceof Array?e:[e]].map(t=>{let r={id:JSON.stringify(t),name:t.name||t.type?.toUpperCase()||"ERROR",offscreen:t.offscreen??!0};switch(t.type){case"iframe":return {...r,content:jsx(P,{config:t})};case"figma":return {...r,content:jsx(B,{config:t}),offscreen:!1};case"sketch":return {...r,content:jsx(ae,{config:t})};case"figspec":case"experimental-figspec":return t.type==="experimental-figspec"&&console.warn("[storybook-addon-designs] `experimental-figspec` is deprecated. We will remove it in v7.0. Please replace it to `figspec` type."),{...r,content:jsx(Suspense,{fallback:"Preparing Figspec viewer..."},jsx(no,{config:t})),offscreen:!1};case"image":return {...r,content:jsx(M,{config:t})};case"link":return {...r,content:jsx(se,{config:t})}}return {...r,content:jsx(Placeholder,null,jsx(Fragment,null,"Invalid config type"),jsx(Fragment,null,"Config type you set is not supported. Please choose one from"," ",jsx(Link,{href:"https://github.com/storybookjs/addon-designs/blob/master/packages/storybook-addon-designs/src/config.ts",target:"_blank",rel:"noopener",withArrow:!0,cancel:!1},"available config types")))}});return o.length===1?jsx("div",null,o[0].content):jsx(ce,{tabs:o,deps:[e]})};var de="design";var lo=styled.div(({theme:e})=>`
  font-family: ${e.typography.fonts.base};
  font-size: ${e.typography.size.s3}px;
  margin: 0;
`),mo=styled.div(({theme:e,height:o="60%",collapsed:t})=>`
  position: relative;
  width: 100%;
  height: 0;
  padding: 0;
  padding-top: ${t?"3em":typeof o=="string"?o:o+"px"};
  margin: 25px 0 40px;
  border: 1px solid ${e.appBorderColor};

  border-radius: ${e.appBorderRadius}px;
  box-shadow:
    ${e.base==="light"?"rgba(0, 0, 0, 0.10) 0 1px 3px 0":"rgba(0, 0, 0, 0.20) 0 2px 5px 0"};
`),po=styled(Placeholder)`
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
`,T=({children:e,collapsable:o=!0,defaultCollapsed:t=!1,placeholder:r,showLink:n=!0,onCollapsedChange:s,...a})=>{let[l,u]=useState(!!t),F=n&&"url"in a;return p.createElement(lo,null,p.createElement(mo,{collapsed:o&&l,...a},o&&l?p.createElement(po,null,r):e,p.createElement(ActionBar,{actionItems:[o&&{title:l?"Show":"Hide",onClick:()=>{let c=!l;s&&s(c,l),u(c);}},F&&{title:"Open in new tab",onClick:()=>window.open(a.url,"_blank")}].filter(c=>!!c)})))},or=({placeholder:e,...o})=>p.createElement(T,{placeholder:e??"Design (Figma)",...o},p.createElement(B,{config:{type:"figma",...o}})),tr=({placeholder:e,...o})=>p.createElement(T,{placeholder:e??"Design (Figma-Spec)",...o},p.createElement(E,{config:{type:"figspec",...o}})),rr=({placeholder:e,...o})=>p.createElement(T,{placeholder:e??"Design (iframe)",...o},p.createElement(P,{config:o})),nr=({placeholder:e,...o})=>p.createElement(T,{placeholder:e??"Design (Image)",...o},p.createElement(M,{config:{type:"image",...o}})),fo=styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  overflow: auto;
`,sr=e=>{let{of:o,placeholder:t,...r}=e;if("of"in e&&o===void 0)throw new Error("Unexpected `of={undefined}`, did you mistype a CSF file reference?");let{story:n}=useOf(o||"story",["story"]);return p.createElement(T,{placeholder:t??"Design",...r},p.createElement(fo,null,p.createElement(pe,{config:n.parameters[de]})))};

export { sr as Design, T as DocBlockBase, or as Figma, tr as Figspec, rr as IFrame, nr as Image };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=blocks.mjs.map