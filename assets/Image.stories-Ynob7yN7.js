import{r as S,g as lr}from"./index-DJO9vBfz.js";var G=(e=>(e.AUTO="auto",e.AVIF="avif",e.JPEG="jpeg",e.WEBP="webp",e))(G||{}),w=(e=>(e.xs="xs",e.sm="sm",e.md="md",e.lg="lg",e.xl="xl",e.xxl="xxl",e["4k"]="4k",e["5k"]="5k",e.full="full",e))(w||{}),L=(e=>(e.DEBUG="debug",e.DOWNLOAD="download",e))(L||{});const ur="https://link.visionary.cloud";G.AUTO,w.lg;const oe={[w.xs]:160,[w.sm]:320,[w.md]:640,[w.lg]:1280,[w.xl]:1920,[w.xxl]:2560,[w["4k"]]:3840,[w["5k"]]:5120,[w.full]:0};Object.keys(oe).reduce((e,r)=>{const t=r,s=oe[t];return s&&(e[s]=t),e},{});const qe="!";var dr=Object.defineProperty,pr=(e,r,t)=>r in e?dr(e,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[r]=t,mr=(e,r,t)=>pr(e,typeof r!="symbol"?r+"":r,t),ie={},X={};Object.defineProperty(X,"__esModule",{value:!0});function fr(e){return String.fromCharCode(parseInt(e.slice(1),16))}function gr(e){return btoa(encodeURIComponent(e).replace(/%[0-9A-F]{2}/g,fr))}X.encode=gr;function hr(e){return`%${`00${e.charCodeAt(0).toString(16)}`.slice(-2)}`}function yr(e){return decodeURIComponent(Array.from(atob(e),hr).join(""))}X.decode=yr;Object.defineProperty(ie,"__esModule",{value:!0});const Be=X;function br(e){return Be.decode(e.replace(/\-/g,"+").replace(/_/g,"/"))}var vr=ie.decode=br;function wr(e){return Be.encode(e).replace(/\//g,"_").replace(/\+/g,"-").replace(/=+$/,"")}var Ir=ie.encode=wr;const Sr=e=>e.filter(Boolean),le=e=>{try{return new URL(e)}catch{return null}},Q=(e="")=>/^[A-Za-z0-9_-]*$/.test(e),xr=e=>{const{altText:r,bcc:t,blurhash:s,blurhashX:o,blurhashY:n,sourceHeight:a,sourceWidth:u,url:i}=e;if(!i||!u||!a)return new Error("Cannot construct visionary code: missing required url/width/height");const c=[i,u,a];return!t||(c.push(t),!s||!o||!n)||(c.push(s,o,n),r&&r.length&&c.push(r)),_r(c)},_r=e=>Ir(e.join(qe)),Ze=e=>{if(typeof e!="string")return null;const r=e.trim();if(!r.length||!Q(r))return null;const t=vr(r);if(!t)return null;const s=t.split(qe);if(s.length<3)return null;const[o,n,a,u,i,c,m,l]=s,g=o.trim();if(!g.length)return console.error("Cannot parse code, empty file id"),null;const f=Number(n.trim()),d=Number(a.trim());if(isNaN(f)||isNaN(d)||!f||!d)return console.error("Cannot parse Visionary Code: invalid image dimensions",n,a),null;const b=Number(c)??0,y=Number(m)??0;return b<1||y<1?(console.error("Cannot parse Visionary Code: invalid blurhash x, y component dimensions",b,y),null):{altText:l,bcc:u,blurhash:i,blurhashX:b,blurhashY:y,sourceHeight:d,sourceWidth:f,url:g}};class kr extends Error{constructor(){super(...arguments),mr(this,"message","invalid endpoint URL (does it contain http/https?)")}}const Rr=e=>e===L.DEBUG,Tr=e=>e===L.DOWNLOAD,Vr=e=>Object.values(G).includes(e),Fe=e=>Object.values(w).includes(e),Er=(e=[])=>{const r={};for(const t of e)Fe(t)?r.size=w[t]:Rr(t)?r.debug=!0:Tr(t)?r.download=!0:Vr(t)&&(r.format=t);return r},Cr=e=>{if(!e||typeof e!="object")return null;const r=[];return e.debug&&r.push(L.DEBUG),e.download&&r.push(L.DOWNLOAD),e.format&&e.format!==G.AUTO&&r.push(e.format),e.size&&Fe(e.size)&&r.push(e.size),r.length?r.sort().join(","):null},Mr=e=>{if(Q(e)){const r=Ze(e);if(r)return{fields:r,options:{}}}return Pr(e)},Pr=e=>{if(!e)return null;const r=e.trim();if(!r)return null;try{const t=jr(r);if(!t)return null;const{code:s,optionTokens:o}=t,n=Ze(s);if(!n)return null;const a=Er(o);return{fields:n,options:a}}catch(t){t instanceof Error?console.error(`Error parsing URL: ${t.message}`,t):console.error("uncaught error",t)}return null},Lr=(e,r)=>{const t=xr(e);if(t instanceof Error)return null;let s=null;if(r!=null&&r.endpoint&&(s=le(r==null?void 0:r.endpoint),!s))throw new kr("Cannot construct URL: bad endpoint. Ensure endpoint starts with http:// or https://");s||(s=le(ur));const o=[s.origin,"image",t],n=r?Cr(r):null;return n&&o.push(n),r!=null&&r.filename?o.push(r.filename):o.push("image.jpg"),o.join("/")},jr=e=>{try{const r=new URL(e),t=Sr(r.pathname.split("/"));if(t[0]!=="image"||![3,4].includes(t.length))throw new Error("Unrecognized URL");const s=t[1].trim();if(!s.length||!Q(s))throw new Error("URL is not formatted as base64url");if(t.length===4){const o=t[2].split(",");return{code:s,optionTokens:o}}if(t.length===3)return{code:s,optionTokens:[]}}catch{return null}return null};var $e={exports:{}},J={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Dr=S,zr=Symbol.for("react.element"),Ar=Symbol.for("react.fragment"),Nr=Object.prototype.hasOwnProperty,Ur=Dr.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Wr={key:!0,ref:!0,__self:!0,__source:!0};function He(e,r,t){var s,o={},n=null,a=null;t!==void 0&&(n=""+t),r.key!==void 0&&(n=""+r.key),r.ref!==void 0&&(a=r.ref);for(s in r)Nr.call(r,s)&&!Wr.hasOwnProperty(s)&&(o[s]=r[s]);if(e&&e.defaultProps)for(s in r=e.defaultProps,r)o[s]===void 0&&(o[s]=r[s]);return{$$typeof:zr,type:e,key:n,ref:a,props:o,_owner:Ur.current}}J.Fragment=Ar;J.jsx=He;J.jsxs=He;$e.exports=J;var V=$e.exports,Ye={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(e){(function(){var r={}.hasOwnProperty;function t(){for(var n="",a=0;a<arguments.length;a++){var u=arguments[a];u&&(n=o(n,s(u)))}return n}function s(n){if(typeof n=="string"||typeof n=="number")return n;if(typeof n!="object")return"";if(Array.isArray(n))return t.apply(null,n);if(n.toString!==Object.prototype.toString&&!n.toString.toString().includes("[native code]"))return n.toString();var a="";for(var u in n)r.call(n,u)&&n[u]&&(a=o(a,u));return a}function o(n,a){return a?n?n+" "+a:n+a:n}e.exports?(t.default=t,e.exports=t):window.classNames=t})()})(Ye);var Or=Ye.exports;const qr=lr(Or),Br=(e,{root:r,rootMargin:t,threshold:s}={},o=[])=>{const n=S.useRef(null),a=S.useRef(null);return S.useCallback(i=>{n.current&&a.current&&(a.current.unobserve(n.current),a.current.disconnect(),a.current=null),i&&(a.current=new IntersectionObserver(e,{root:r,rootMargin:t,threshold:s}),a.current.observe(i),n.current=i)},[n,r,t,JSON.stringify(s),...o])},Zr=({root:e,rootMargin:r,threshold:t,unobserveOnEnter:s,target:o,onEnter:n,onLeave:a,defaultInView:u}={},i=[])=>{const[c,m]=S.useState({inView:u||!1,entry:null,observer:null}),l=S.useCallback(([f],d)=>{const y=d.thresholds.some(h=>f.intersectionRatio>=h)&&f.isIntersecting;m({inView:y,entry:f,observer:d}),y&&s&&(d.unobserve(f.target),d.disconnect()),y?n==null||n(f,d):a==null||a(f,d)},[n,a,s]),g=Br(l,{root:e,rootMargin:r,threshold:t},[s,...i]);return S.useEffect(()=>{o!=null&&o.current&&g(o.current)},[o,g]),[g,c.inView,c.entry,c.observer]},Fr={overflow:"hidden"},Ge=({aspectRatio:e,children:r})=>V.jsx("div",{style:{aspectRatio:e,...Fr},children:r});Ge.__docgenInfo={description:"Wrapper component that applies a user-specified aspect ratio.\n- Wraps the usual `<Image />` component when the user specifies `aspect-ratio` via the `style` prop.\n- Position the inner image and blur by using `top`/`left` or `transform: translateX/translateY` on the `<Image />` component.\n- Storybook example: https://visionary-ux.github.io/visionary-image/?path=/story/visionary-image--custom-aspect-ratio",methods:[],displayName:"ImageWrapper",props:{aspectRatio:{required:!0,tsType:{name:'CSSProperties["aspectRatio"]',raw:'CSSProperties["aspectRatio"]'},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""}}};const Xe=.7,Qe=1,E=24,$r=w.lg,Je=typeof document>"u",Hr=Je?()=>{}:S.useLayoutEffect,Yr="<visionary>",T=(e,...r)=>{!console||typeof console.log!="function"||console.log(`${Yr} ${e}`,...r)},Ke=new Uint8Array(128);for(let e=0;e<83;e++)Ke["0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#$%*+,-.:;=?@[]^_{|}~".charCodeAt(e)]=e;const H=(e,r,t)=>{let s=0;for(;r<t;)s*=83,s+=Ke[e.charCodeAt(r++)];return s},er=Math.pow,j=Math.PI,Gr=j*2,rr=3294.6,tr=269.025,Xr=e=>e>10.31475?er(e/tr+.052132,2.4):e/rr,ne=e=>~~(e>1227e-8?tr*er(e,.416666)-13.025:e*rr+1),P=e=>(e<0?-1:1)*e*e,ue=e=>{for(e+=j/2;e>j;)e-=Gr;const r=1.27323954*e-.405284735*P(e);return .225*(P(r)-r)+r};function Qr(e){const r=H(e,2,6);return[r>>16,r>>8&255,r&255]}function Jr(e,r,t,s){const o=H(e,0,1),n=o%9+1,a=~~(o/9)+1,u=n*a;let i=0,c=0,m=0,l=0,g=0,f=0,d=0,b=0,y=0,h=0,v=0,x=0;const p=(H(e,1,2)+1)/13446*(s|1),I=new Float64Array(u*3),K=Qr(e);for(i=0;i<3;i++)I[i]=Xr(K[i]);for(i=1;i<u;i++)x=H(e,4+i*2,6+i*2),I[i*3]=P(~~(x/361)-9)*p,I[i*3+1]=P(~~(x/19)%19-9)*p,I[i*3+2]=P(x%19-9)*p;const D=new Float64Array(a*t),z=new Float64Array(n*r);for(c=0;c<a;c++)for(l=0;l<t;l++)D[c*t+l]=ue(j*l*c/t);for(i=0;i<n;i++)for(m=0;m<r;m++)z[i*r+m]=ue(j*m*i/r);const C=r*4,k=new Uint8ClampedArray(C*t);for(l=0;l<t;l++)for(m=0;m<r;m++){for(g=f=d=0,c=0;c<a;c++)for(y=D[c*t+l],i=0;i<n;i++)b=z[i*r+m]*y,h=(i+c*n)*3,g+=I[h]*b,f+=I[h+1]*b,d+=I[h+2]*b;v=4*m+l*C,k[v]=ne(g),k[v+1]=ne(f),k[v+2]=ne(d),k[v+3]=255}return k}const Y=e=>{try{return new URL(e)}catch{return null}},Kr=(e,r)=>`rgba(${e.r},${e.g},${e.b},${r})`,se=e=>({}),et=(e,r)=>r?{"data-fileid":e}:{},de=(e,r)=>Math.min(e,r),rt=e=>{let r=e.replace(/^#/,"");if(r.length!==3&&r.length!==6)return null;r.length===3&&(r=`${r[0]}${r[0]}${r[1]}${r[1]}${r[2]}${r[2]}`);const t=parseInt(r.slice(0,2),16),s=parseInt(r.slice(2,4),16);return{b:parseInt(r.slice(4,6),16),g:s,r:t}},R=(e,r=0)=>{const t=Math.pow(10,r);return Math.round(e*t)/t},tt=(e,r)=>{const t=Y(e),s=Y(r);return!t||!s?e:(s.pathname=t.pathname,s.search=t.search,s.toString())},nt=(e,r={},t=Xe,s=Qe)=>{if(!e)return null;try{r.debug&&T("input imageSrc:",e);const o=Mr(e);if(r.debug&&T("Visionary URL data: ",o),!o)throw new Error("Could not parse Visionary URL");const{fields:n,options:a}=o;if(n.sourceWidth<1||n.sourceHeight<1)throw new Error("Invalid image dimensions");const u=n.sourceWidth/n.sourceHeight,i=(r==null?void 0:r.size)??a.size??$r,c=oe[i];let m=0,l=0,g=0;if(u>=1){l=m=de(c,n.sourceWidth);const h=R(l/u);g=R(l/h,6)}else m=de(c,n.sourceHeight),l=R(m*u),g=R(l/m,6);const f=R(100/g,6),d={...n,arPaddingTop:`${f}%`,aspectRatio:g,maxWidth:l,src:e},b=Y(n.url);if(b)d.src=b.toString();else if(!Y(e)&&Q(n.url)){const h=Lr(n,{endpoint:r.endpoint,size:i});h&&(d.src=h)}r.endpoint&&(d.src=tt(d.src,r.endpoint));const y=n.bcc?rt(n.bcc):null;if(y&&(d.backgroundColor=Kr(y,t)),!Je&&n.blurhash&&!r.disableBlurLayer){const h=performance.now(),v=Jr(n.blurhash,E,E,s),x=performance.now()-h;r.debug&&T(`Blurhash decode time: ${R(x,1)} ms`),v&&(d.pixels=v)}return r.debug&&T("Visionary Image state: ",d),d}catch{return null}},nr={bottom:0,left:0,position:"absolute",right:0,top:0},st={...nr,maxHeight:"100%",maxWidth:"100%"},at={...nr,height:"100%",width:"100%"},ot=e=>{const r={...st};return e&&(r.display="none"),r},it="v7y_7587",ct="v7y_b8c0",lt="v7y_e0dd",ae={container:it,preventDrag:ct,preventSelection:lt},sr=({alt:e,bgColorAlpha:r=Xe,className:t,debug:s=!1,disableBlurLayer:o=!1,disableImageLayer:n=!1,endpoint:a,height:u,hideImageLayer:i=!1,lazy:c=!0,onClick:m,onError:l,onLoad:g,preventDrag:f=!1,preventSelection:d=!1,punch:b=Qe,size:y,src:h,style:v,width:x})=>{const p=S.useMemo(()=>nt(h,{debug:s,disableBlurLayer:o,endpoint:a,size:y},r,b),[r,s,o,a,b,y,h]),I=S.useRef(null),[K,D]=Zr();Hr(function(){if(!I.current||!(p!=null&&p.blurhash))return;if(!p.pixels){console.warn("No pixel data passed in, skipping");return}const ir=performance.now(),re=I.current.getContext("2d");if(!re){console.warn("Cannot access canvasRenderingContext, skipping");return}const te=re.createImageData(E,E);if(!te){console.warn("Could not create ImageData on CanvasRenderingContext");return}if(te.data.set(p.pixels),re.putImageData(te,0,0),s){const cr=performance.now()-ir;T(`Canvas render time: ${R(cr,1)} ms`)}},[p==null?void 0:p.blurhash,p==null?void 0:p.pixels,s]);const z=S.useCallback(M=>{s&&T("Image load error ",M),l&&l()},[s,l]),C={alt:e,loading:!c||D?"eager":"lazy",onLoad:g};if(!p){s&&T("Not a Visionary URL, rendering fallback <img />");const M={...C,className:t,height:u,onClick:m,onError:l,src:h,style:v,width:x};return V.jsx("img",{...M})}const k=qr(ae.container,t,{[ae.preventDrag]:!!f,[ae.preventSelection]:!!d}),ee={...{"--v-ar":p.arPaddingTop},...v,aspectRatio:p.aspectRatio,backgroundColor:(p==null?void 0:p.backgroundColor)??void 0,maxWidth:p.maxWidth,position:"relative",width:"100%"};x&&(ee.width=x),u&&(ee.height=u);const ar={onClick:m},or=ot(i),ce=V.jsxs("div",{className:k,ref:K,style:ee,...et(p.url,s),...se(),...ar,children:[!o&&V.jsx("canvas",{height:E,ref:I,style:at,width:E,...se()}),!n&&V.jsx("img",{...C,...se(),onError:z,src:p.src,style:or})]});return v!=null&&v.aspectRatio?V.jsx(Ge,{aspectRatio:v.aspectRatio,children:ce}):ce};sr.__docgenInfo={description:"",methods:[],displayName:"Image",props:{alt:{required:!1,tsType:{name:"string"},description:"Image `alt` tag; Adding alt text to images is *highly* recommended to accommodate accessible devices and improve discoverability."},bgColorAlpha:{required:!1,tsType:{name:"number"},description:"Base layer (background color) alpha channel (default: 0.7)",defaultValue:{value:"0.7",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Classname applied to the container `div` or the fallback `img` element."},debug:{required:!1,tsType:{name:"boolean"},description:"Print debug info (Visionary data, render times) to the console",defaultValue:{value:"false",computed:!1}},disableBlurLayer:{required:!1,tsType:{name:"boolean"},description:"Disable rendering of blur layer",defaultValue:{value:"false",computed:!1}},disableImageLayer:{required:!1,tsType:{name:"boolean"},description:"Disable rendering of image layer",defaultValue:{value:"false",computed:!1}},endpoint:{required:!1,tsType:{name:"string"},description:"Custom endpoint for image URLs (when using `generateVisionaryUrl()`)"},height:{required:!1,tsType:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}]},description:""},hideImageLayer:{required:!1,tsType:{name:"boolean"},description:"Hides the image layer via CSS",defaultValue:{value:"false",computed:!1}},lazy:{required:!1,tsType:{name:"boolean"},description:"Should image load lazily (default: true)",defaultValue:{value:"true",computed:!1}},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Callback function to run after click"},onError:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Callback function to run if image resource failed to load"},onLoad:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Callback function to run after image load"},options:{required:!1,tsType:{name:"VisionaryImageOptions"},description:""},preventDrag:{required:!1,tsType:{name:"boolean"},description:"Prevents user from dragging the image element",defaultValue:{value:"false",computed:!1}},preventSelection:{required:!1,tsType:{name:"boolean"},description:"Prevents user from highlighting the image element",defaultValue:{value:"false",computed:!1}},punch:{required:!1,tsType:{name:"number"},description:"Blurhash punch parameter (default: 1)",defaultValue:{value:"1",computed:!1}},size:{required:!1,tsType:{name:"ImageSizeToken"},description:"If specified, overrides the size specified in a Visionary URL"},src:{required:!0,tsType:{name:"string"},description:"Image `src` prop; if `src` contains a Visionary code, a Visionary image will be rendered, otherwise we fall back to a native `<img />` tag"},style:{required:!1,tsType:{name:"CSSProperties"},description:"Styles are applied to the Visionary container (or the fallback <img> if a Visionary Image is not rendered)"},width:{required:!1,tsType:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}]},description:""}}};const _={alt:"White-petaled cherry blossom focused against a blurry background",debug:!1,src:"https://cdn.visionary.cloud/image/Y3Fra2RzdHFwcCEyMDAwITEzMzMhYTdjMWM0IVVuR20zfC5tdFFzLnlGYmNSamFmSW9SUFdCV1dSKk5HVkBqWyE0ITQ/md/image.jpg",width:600},mt={argTypes:{bgColorAlpha:{control:{max:1,min:0,step:.01,type:"range"}}},component:sr,decorators:[],tags:["autodocs"],title:"Visionary Image"},A={args:{..._}},N={args:{..._,hideImageLayer:!0}},U={args:{..._,disableBlurLayer:!0,hideImageLayer:!0}},W={args:{..._,preventDrag:!0}},O={args:{..._,preventSelection:!0}},q={args:{..._,style:{aspectRatio:"3 / 1",transform:"translateY(-30%)"}}},B={args:{..._,size:w.xs}},Z={args:{..._,src:"https://link.visionary.cloud/image/aHR0cHM6Ly9pLmltZ3VyLmNvbS82VWxMa2dKX2Qud2VicD9tYXh3aWR0aD03NjAmZmlkZWxpdHk9Z3JhbmQhNzYwITMyMyE1ZjM2MGMhSzZBWyMqeDswaTF3eFk9djBqcnZ9cSEzITM/image.jpg"}},F={args:{..._,src:"aHR0cHM6Ly9pLmltZ3VyLmNvbS82VWxMa2dKX2Qud2VicD9tYXh3aWR0aD03NjAmZmlkZWxpdHk9Z3JhbmQhNzYwITMyMyE1ZjM2MGMhSzZBWyMqeDswaTF3eFk9djBqcnZ9cSEzITM"}},$={args:{..._,src:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/View_of_the_ISS_taken_during_Crew-2_flyaround_%28ISS066-E-081311%29.jpg/1280px-View_of_the_ISS_taken_during_Crew-2_flyaround_%28ISS066-E-081311%29.jpg"}};var pe,me,fe;A.parameters={...A.parameters,docs:{...(pe=A.parameters)==null?void 0:pe.docs,source:{originalSource:`{
  args: {
    ...sharedProps
  }
}`,...(fe=(me=A.parameters)==null?void 0:me.docs)==null?void 0:fe.source}}};var ge,he,ye;N.parameters={...N.parameters,docs:{...(ge=N.parameters)==null?void 0:ge.docs,source:{originalSource:`{
  args: {
    ...sharedProps,
    hideImageLayer: true
  }
}`,...(ye=(he=N.parameters)==null?void 0:he.docs)==null?void 0:ye.source}}};var be,ve,we;U.parameters={...U.parameters,docs:{...(be=U.parameters)==null?void 0:be.docs,source:{originalSource:`{
  args: {
    ...sharedProps,
    disableBlurLayer: true,
    hideImageLayer: true
  }
}`,...(we=(ve=U.parameters)==null?void 0:ve.docs)==null?void 0:we.source}}};var Ie,Se,xe;W.parameters={...W.parameters,docs:{...(Ie=W.parameters)==null?void 0:Ie.docs,source:{originalSource:`{
  args: {
    ...sharedProps,
    preventDrag: true
  }
}`,...(xe=(Se=W.parameters)==null?void 0:Se.docs)==null?void 0:xe.source}}};var _e,ke,Re;O.parameters={...O.parameters,docs:{...(_e=O.parameters)==null?void 0:_e.docs,source:{originalSource:`{
  args: {
    ...sharedProps,
    preventSelection: true
  }
}`,...(Re=(ke=O.parameters)==null?void 0:ke.docs)==null?void 0:Re.source}}};var Te,Ve,Ee;q.parameters={...q.parameters,docs:{...(Te=q.parameters)==null?void 0:Te.docs,source:{originalSource:`{
  args: {
    ...sharedProps,
    style: {
      aspectRatio: "3 / 1",
      transform: "translateY(-30%)"
    }
  }
}`,...(Ee=(Ve=q.parameters)==null?void 0:Ve.docs)==null?void 0:Ee.source}}};var Ce,Me,Pe;B.parameters={...B.parameters,docs:{...(Ce=B.parameters)==null?void 0:Ce.docs,source:{originalSource:`{
  args: {
    ...sharedProps,
    size: ImageSizeToken.xs
  }
}`,...(Pe=(Me=B.parameters)==null?void 0:Me.docs)==null?void 0:Pe.source}}};var Le,je,De;Z.parameters={...Z.parameters,docs:{...(Le=Z.parameters)==null?void 0:Le.docs,source:{originalSource:`{
  args: {
    ...sharedProps,
    src: "https://link.visionary.cloud/image/aHR0cHM6Ly9pLmltZ3VyLmNvbS82VWxMa2dKX2Qud2VicD9tYXh3aWR0aD03NjAmZmlkZWxpdHk9Z3JhbmQhNzYwITMyMyE1ZjM2MGMhSzZBWyMqeDswaTF3eFk9djBqcnZ9cSEzITM/image.jpg"
  }
}`,...(De=(je=Z.parameters)==null?void 0:je.docs)==null?void 0:De.source}}};var ze,Ae,Ne;F.parameters={...F.parameters,docs:{...(ze=F.parameters)==null?void 0:ze.docs,source:{originalSource:`{
  args: {
    ...sharedProps,
    src: "aHR0cHM6Ly9pLmltZ3VyLmNvbS82VWxMa2dKX2Qud2VicD9tYXh3aWR0aD03NjAmZmlkZWxpdHk9Z3JhbmQhNzYwITMyMyE1ZjM2MGMhSzZBWyMqeDswaTF3eFk9djBqcnZ9cSEzITM"
  }
}`,...(Ne=(Ae=F.parameters)==null?void 0:Ae.docs)==null?void 0:Ne.source}}};var Ue,We,Oe;$.parameters={...$.parameters,docs:{...(Ue=$.parameters)==null?void 0:Ue.docs,source:{originalSource:`{
  args: {
    ...sharedProps,
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/View_of_the_ISS_taken_during_Crew-2_flyaround_%28ISS066-E-081311%29.jpg/1280px-View_of_the_ISS_taken_during_Crew-2_flyaround_%28ISS066-E-081311%29.jpg"
  }
}`,...(Oe=(We=$.parameters)==null?void 0:We.docs)==null?void 0:Oe.source}}};const ft=["FullImage","BlurOnly","BackgroundOnly","PreventDrag","PreventSelection","CustomAspectRatio","CustomSizeToken","ExternalImageUrl","ExternalImageUrlViaCode","NativeImgFallback"];export{U as BackgroundOnly,N as BlurOnly,q as CustomAspectRatio,B as CustomSizeToken,Z as ExternalImageUrl,F as ExternalImageUrlViaCode,A as FullImage,$ as NativeImgFallback,W as PreventDrag,O as PreventSelection,ft as __namedExportsOrder,mt as default};