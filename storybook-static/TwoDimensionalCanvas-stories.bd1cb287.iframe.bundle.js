"use strict";(self.webpackChunk_arizeai_point_cloud=self.webpackChunk_arizeai_point_cloud||[]).push([[938],{"./stories/TwoDimensionalCanvas.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,Rerender:()=>Rerender,WithBounds:()=>WithBounds,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_src__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/index.tsx"),_components__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./stories/components/index.tsx"),_data_point_cloud_2d_json__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./stories/data/point-cloud-2d.json"),_data_point_cloud_2d_alt_json__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./stories/data/point-cloud-2d-alt.json");function _slicedToArray(arr,i){return function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function _iterableToArrayLimit(r,l){var t=null==r?null:"undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(null!=t){var e,n,i,u,a=[],f=!0,o=!1;try{if(i=(t=t.call(r)).next,0===l){if(Object(t)!==t)return;f=!1}else for(;!(f=(e=i.call(t)).done)&&(a.push(e.value),a.length!==l);f=!0);}catch(r){o=!0,n=r}finally{try{if(!f&&null!=t.return&&(u=t.return(),Object(u)!==u))return}finally{if(o)throw n}}return a}}(arr,i)||_unsupportedIterableToArray(arr,i)||function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _toConsumableArray(arr){return function _arrayWithoutHoles(arr){if(Array.isArray(arr))return _arrayLikeToArray(arr)}(arr)||function _iterableToArray(iter){if("undefined"!=typeof Symbol&&null!=iter[Symbol.iterator]||null!=iter["@@iterator"])return Array.from(iter)}(arr)||_unsupportedIterableToArray(arr)||function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _unsupportedIterableToArray(o,minLen){if(o){if("string"==typeof o)return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);return"Object"===n&&o.constructor&&(n=o.constructor.name),"Map"===n||"Set"===n?Array.from(o):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(o,minLen):void 0}}function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}function _extends(){return _extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}const __WEBPACK_DEFAULT_EXPORT__={title:"TwoDimensionalCanvas",component:_src__WEBPACK_IMPORTED_MODULE_1__.iF,argTypes:{children:{control:{type:"text"}},boundsZoomPaddingFactor:{control:{type:"text"}}},parameters:{controls:{expanded:!0}}};var Default=function Template(args){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components__WEBPACK_IMPORTED_MODULE_2__.mc,{showToolbar:!1},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_src__WEBPACK_IMPORTED_MODULE_1__.iF,_extends({camera:{zoom:30,up:[0,0,1]}},args),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_src__WEBPACK_IMPORTED_MODULE_1__._G,null),react__WEBPACK_IMPORTED_MODULE_0__.createElement("ambientLight",null),react__WEBPACK_IMPORTED_MODULE_0__.createElement("pointLight",{position:[10,10,10]}),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_src__WEBPACK_IMPORTED_MODULE_1__.ON,{data:_data_point_cloud_2d_json__WEBPACK_IMPORTED_MODULE_3__}),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_src__WEBPACK_IMPORTED_MODULE_1__.ON,{data:_data_point_cloud_2d_alt_json__WEBPACK_IMPORTED_MODULE_4__,pointProps:{color:"red"}}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("axesHelper",null)))}.bind({}),WithBounds=function WithBounds(){var bounds=react__WEBPACK_IMPORTED_MODULE_0__.useMemo((function(){return(0,_src__WEBPACK_IMPORTED_MODULE_1__.DN)([].concat(_toConsumableArray(_data_point_cloud_2d_json__WEBPACK_IMPORTED_MODULE_3__.map((function(d){return d.position}))),_toConsumableArray(_data_point_cloud_2d_alt_json__WEBPACK_IMPORTED_MODULE_4__.map((function(d){return d.position})))))}),[]);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components__WEBPACK_IMPORTED_MODULE_2__.mc,{showToolbar:!1},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_src__WEBPACK_IMPORTED_MODULE_1__.iF,{camera:{zoom:30,up:[0,0,1]}},react__WEBPACK_IMPORTED_MODULE_0__.createElement("ambientLight",null),react__WEBPACK_IMPORTED_MODULE_0__.createElement("pointLight",{position:[10,10,10]}),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_src__WEBPACK_IMPORTED_MODULE_1__.rC,{bounds},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_src__WEBPACK_IMPORTED_MODULE_1__._G,null),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_src__WEBPACK_IMPORTED_MODULE_1__.ON,{data:_data_point_cloud_2d_json__WEBPACK_IMPORTED_MODULE_3__,pointProps:{color:"green"}}),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_src__WEBPACK_IMPORTED_MODULE_1__.ON,{data:_data_point_cloud_2d_alt_json__WEBPACK_IMPORTED_MODULE_4__,pointProps:{color:"red"}}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("axesHelper",null))))},Rerender=function Rerender(){var _React$useState2=_slicedToArray(react__WEBPACK_IMPORTED_MODULE_0__.useState([]),2),primaryData=_React$useState2[0],setPrimaryData=_React$useState2[1],_React$useState4=_slicedToArray(react__WEBPACK_IMPORTED_MODULE_0__.useState([]),2),secondaryData=_React$useState4[0],setSecondaryData=_React$useState4[1],bounds=react__WEBPACK_IMPORTED_MODULE_0__.useMemo((function(){return(0,_src__WEBPACK_IMPORTED_MODULE_1__.DN)([].concat(_toConsumableArray(primaryData.map((function(d){return d.position}))),_toConsumableArray(secondaryData.map((function(d){return d.position})))))}),[primaryData,secondaryData]);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components__WEBPACK_IMPORTED_MODULE_2__.mc,{showToolbar:!1},react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{onClick:function onClick(){setPrimaryData(_data_point_cloud_2d_json__WEBPACK_IMPORTED_MODULE_3__),setSecondaryData(_data_point_cloud_2d_alt_json__WEBPACK_IMPORTED_MODULE_4__)}},"Load Data"),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_src__WEBPACK_IMPORTED_MODULE_1__.iF,{camera:{zoom:30,up:[0,0,1]}},react__WEBPACK_IMPORTED_MODULE_0__.createElement("ambientLight",null),react__WEBPACK_IMPORTED_MODULE_0__.createElement("pointLight",{position:[10,10,10]}),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_src__WEBPACK_IMPORTED_MODULE_1__.rC,{bounds},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_src__WEBPACK_IMPORTED_MODULE_1__._G,null),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_src__WEBPACK_IMPORTED_MODULE_1__.ON,{data:primaryData,pointProps:{color:"green"}}),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_src__WEBPACK_IMPORTED_MODULE_1__.ON,{data:secondaryData,pointProps:{color:"red"}}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("axesHelper",null))))};Default.args={};const __namedExportsOrder=["Default","WithBounds","Rerender"]}}]);