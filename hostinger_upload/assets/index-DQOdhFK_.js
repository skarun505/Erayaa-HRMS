(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function t(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(n){if(n.ep)return;n.ep=!0;const r=t(n);fetch(n.href,r)}})();function rt(a,e){var t={};for(var s in a)Object.prototype.hasOwnProperty.call(a,s)&&e.indexOf(s)<0&&(t[s]=a[s]);if(a!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,s=Object.getOwnPropertySymbols(a);n<s.length;n++)e.indexOf(s[n])<0&&Object.prototype.propertyIsEnumerable.call(a,s[n])&&(t[s[n]]=a[s[n]]);return t}function za(a,e,t,s){function n(r){return r instanceof t?r:new t(function(i){i(r)})}return new(t||(t=Promise))(function(r,i){function o(c){try{d(s.next(c))}catch(p){i(p)}}function l(c){try{d(s.throw(c))}catch(p){i(p)}}function d(c){c.done?r(c.value):n(c.value).then(o,l)}d((s=s.apply(a,e||[])).next())})}const Fa=a=>a?(...e)=>a(...e):(...e)=>fetch(...e);class jt extends Error{constructor(e,t="FunctionsError",s){super(e),this.name=t,this.context=s}}class Ga extends jt{constructor(e){super("Failed to send a request to the Edge Function","FunctionsFetchError",e)}}class Mt extends jt{constructor(e){super("Relay Error invoking the Edge Function","FunctionsRelayError",e)}}class Ut extends jt{constructor(e){super("Edge Function returned a non-2xx status code","FunctionsHttpError",e)}}var _t;(function(a){a.Any="any",a.ApNortheast1="ap-northeast-1",a.ApNortheast2="ap-northeast-2",a.ApSouth1="ap-south-1",a.ApSoutheast1="ap-southeast-1",a.ApSoutheast2="ap-southeast-2",a.CaCentral1="ca-central-1",a.EuCentral1="eu-central-1",a.EuWest1="eu-west-1",a.EuWest2="eu-west-2",a.EuWest3="eu-west-3",a.SaEast1="sa-east-1",a.UsEast1="us-east-1",a.UsWest1="us-west-1",a.UsWest2="us-west-2"})(_t||(_t={}));class Wa{constructor(e,{headers:t={},customFetch:s,region:n=_t.Any}={}){this.url=e,this.headers=t,this.region=n,this.fetch=Fa(s)}setAuth(e){this.headers.Authorization=`Bearer ${e}`}invoke(e){return za(this,arguments,void 0,function*(t,s={}){var n;let r,i;try{const{headers:o,method:l,body:d,signal:c,timeout:p}=s;let u={},{region:h}=s;h||(h=this.region);const m=new URL(`${this.url}/${t}`);h&&h!=="any"&&(u["x-region"]=h,m.searchParams.set("forceFunctionRegion",h));let g;d&&(o&&!Object.prototype.hasOwnProperty.call(o,"Content-Type")||!o)?typeof Blob<"u"&&d instanceof Blob||d instanceof ArrayBuffer?(u["Content-Type"]="application/octet-stream",g=d):typeof d=="string"?(u["Content-Type"]="text/plain",g=d):typeof FormData<"u"&&d instanceof FormData?g=d:(u["Content-Type"]="application/json",g=JSON.stringify(d)):d&&typeof d!="string"&&!(typeof Blob<"u"&&d instanceof Blob)&&!(d instanceof ArrayBuffer)&&!(typeof FormData<"u"&&d instanceof FormData)?g=JSON.stringify(d):g=d;let y=c;p&&(i=new AbortController,r=setTimeout(()=>i.abort(),p),c?(y=i.signal,c.addEventListener("abort",()=>i.abort())):y=i.signal);const f=yield this.fetch(m.toString(),{method:l||"POST",headers:Object.assign(Object.assign(Object.assign({},u),this.headers),o),body:g,signal:y}).catch(P=>{throw new Ga(P)}),_=f.headers.get("x-relay-error");if(_&&_==="true")throw new Mt(f);if(!f.ok)throw new Ut(f);let b=((n=f.headers.get("Content-Type"))!==null&&n!==void 0?n:"text/plain").split(";")[0].trim(),k;return b==="application/json"?k=yield f.json():b==="application/octet-stream"||b==="application/pdf"?k=yield f.blob():b==="text/event-stream"?k=f:b==="multipart/form-data"?k=yield f.formData():k=yield f.text(),{data:k,error:null,response:f}}catch(o){return{data:null,error:o,response:o instanceof Ut||o instanceof Mt?o.context:void 0}}finally{r&&clearTimeout(r)}})}}var Va=class extends Error{constructor(a){super(a.message),this.name="PostgrestError",this.details=a.details,this.hint=a.hint,this.code=a.code}},Ka=class{constructor(a){var e,t,s;this.shouldThrowOnError=!1,this.method=a.method,this.url=a.url,this.headers=new Headers(a.headers),this.schema=a.schema,this.body=a.body,this.shouldThrowOnError=(e=a.shouldThrowOnError)!==null&&e!==void 0?e:!1,this.signal=a.signal,this.isMaybeSingle=(t=a.isMaybeSingle)!==null&&t!==void 0?t:!1,this.urlLengthLimit=(s=a.urlLengthLimit)!==null&&s!==void 0?s:8e3,a.fetch?this.fetch=a.fetch:this.fetch=fetch}throwOnError(){return this.shouldThrowOnError=!0,this}setHeader(a,e){return this.headers=new Headers(this.headers),this.headers.set(a,e),this}then(a,e){var t=this;this.schema===void 0||(["GET","HEAD"].includes(this.method)?this.headers.set("Accept-Profile",this.schema):this.headers.set("Content-Profile",this.schema)),this.method!=="GET"&&this.method!=="HEAD"&&this.headers.set("Content-Type","application/json");const s=this.fetch;let n=s(this.url.toString(),{method:this.method,headers:this.headers,body:JSON.stringify(this.body),signal:this.signal}).then(async r=>{let i=null,o=null,l=null,d=r.status,c=r.statusText;if(r.ok){var p,u;if(t.method!=="HEAD"){var h;const f=await r.text();f===""||(t.headers.get("Accept")==="text/csv"||t.headers.get("Accept")&&(!((h=t.headers.get("Accept"))===null||h===void 0)&&h.includes("application/vnd.pgrst.plan+text"))?o=f:o=JSON.parse(f))}const g=(p=t.headers.get("Prefer"))===null||p===void 0?void 0:p.match(/count=(exact|planned|estimated)/),y=(u=r.headers.get("content-range"))===null||u===void 0?void 0:u.split("/");g&&y&&y.length>1&&(l=parseInt(y[1])),t.isMaybeSingle&&t.method==="GET"&&Array.isArray(o)&&(o.length>1?(i={code:"PGRST116",details:`Results contain ${o.length} rows, application/vnd.pgrst.object+json requires 1 row`,hint:null,message:"JSON object requested, multiple (or no) rows returned"},o=null,l=null,d=406,c="Not Acceptable"):o.length===1?o=o[0]:o=null)}else{var m;const g=await r.text();try{i=JSON.parse(g),Array.isArray(i)&&r.status===404&&(o=[],i=null,d=200,c="OK")}catch{r.status===404&&g===""?(d=204,c="No Content"):i={message:g}}if(i&&t.isMaybeSingle&&(!(i==null||(m=i.details)===null||m===void 0)&&m.includes("0 rows"))&&(i=null,d=200,c="OK"),i&&t.shouldThrowOnError)throw new Va(i)}return{error:i,data:o,count:l,status:d,statusText:c}});return this.shouldThrowOnError||(n=n.catch(r=>{var i;let o="",l="",d="";const c=r?.cause;if(c){var p,u,h,m;const f=(p=c?.message)!==null&&p!==void 0?p:"",_=(u=c?.code)!==null&&u!==void 0?u:"";o=`${(h=r?.name)!==null&&h!==void 0?h:"FetchError"}: ${r?.message}`,o+=`

Caused by: ${(m=c?.name)!==null&&m!==void 0?m:"Error"}: ${f}`,_&&(o+=` (${_})`),c?.stack&&(o+=`
${c.stack}`)}else{var g;o=(g=r?.stack)!==null&&g!==void 0?g:""}const y=this.url.toString().length;return r?.name==="AbortError"||r?.code==="ABORT_ERR"?(d="",l="Request was aborted (timeout or manual cancellation)",y>this.urlLengthLimit&&(l+=`. Note: Your request URL is ${y} characters, which may exceed server limits. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [many IDs])), consider using an RPC function to pass values server-side.`)):(c?.name==="HeadersOverflowError"||c?.code==="UND_ERR_HEADERS_OVERFLOW")&&(d="",l="HTTP headers exceeded server limits (typically 16KB)",y>this.urlLengthLimit&&(l+=`. Your request URL is ${y} characters. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [200+ IDs])), consider using an RPC function instead.`)),{error:{message:`${(i=r?.name)!==null&&i!==void 0?i:"FetchError"}: ${r?.message}`,details:o,hint:l,code:d},data:null,count:null,status:0,statusText:""}})),n.then(a,e)}returns(){return this}overrideTypes(){return this}},Ja=class extends Ka{select(a){let e=!1;const t=(a??"*").split("").map(s=>/\s/.test(s)&&!e?"":(s==='"'&&(e=!e),s)).join("");return this.url.searchParams.set("select",t),this.headers.append("Prefer","return=representation"),this}order(a,{ascending:e=!0,nullsFirst:t,foreignTable:s,referencedTable:n=s}={}){const r=n?`${n}.order`:"order",i=this.url.searchParams.get(r);return this.url.searchParams.set(r,`${i?`${i},`:""}${a}.${e?"asc":"desc"}${t===void 0?"":t?".nullsfirst":".nullslast"}`),this}limit(a,{foreignTable:e,referencedTable:t=e}={}){const s=typeof t>"u"?"limit":`${t}.limit`;return this.url.searchParams.set(s,`${a}`),this}range(a,e,{foreignTable:t,referencedTable:s=t}={}){const n=typeof s>"u"?"offset":`${s}.offset`,r=typeof s>"u"?"limit":`${s}.limit`;return this.url.searchParams.set(n,`${a}`),this.url.searchParams.set(r,`${e-a+1}`),this}abortSignal(a){return this.signal=a,this}single(){return this.headers.set("Accept","application/vnd.pgrst.object+json"),this}maybeSingle(){return this.method==="GET"?this.headers.set("Accept","application/json"):this.headers.set("Accept","application/vnd.pgrst.object+json"),this.isMaybeSingle=!0,this}csv(){return this.headers.set("Accept","text/csv"),this}geojson(){return this.headers.set("Accept","application/geo+json"),this}explain({analyze:a=!1,verbose:e=!1,settings:t=!1,buffers:s=!1,wal:n=!1,format:r="text"}={}){var i;const o=[a?"analyze":null,e?"verbose":null,t?"settings":null,s?"buffers":null,n?"wal":null].filter(Boolean).join("|"),l=(i=this.headers.get("Accept"))!==null&&i!==void 0?i:"application/json";return this.headers.set("Accept",`application/vnd.pgrst.plan+${r}; for="${l}"; options=${o};`),r==="json"?this:this}rollback(){return this.headers.append("Prefer","tx=rollback"),this}returns(){return this}maxAffected(a){return this.headers.append("Prefer","handling=strict"),this.headers.append("Prefer",`max-affected=${a}`),this}};const Nt=new RegExp("[,()]");var Ee=class extends Ja{eq(a,e){return this.url.searchParams.append(a,`eq.${e}`),this}neq(a,e){return this.url.searchParams.append(a,`neq.${e}`),this}gt(a,e){return this.url.searchParams.append(a,`gt.${e}`),this}gte(a,e){return this.url.searchParams.append(a,`gte.${e}`),this}lt(a,e){return this.url.searchParams.append(a,`lt.${e}`),this}lte(a,e){return this.url.searchParams.append(a,`lte.${e}`),this}like(a,e){return this.url.searchParams.append(a,`like.${e}`),this}likeAllOf(a,e){return this.url.searchParams.append(a,`like(all).{${e.join(",")}}`),this}likeAnyOf(a,e){return this.url.searchParams.append(a,`like(any).{${e.join(",")}}`),this}ilike(a,e){return this.url.searchParams.append(a,`ilike.${e}`),this}ilikeAllOf(a,e){return this.url.searchParams.append(a,`ilike(all).{${e.join(",")}}`),this}ilikeAnyOf(a,e){return this.url.searchParams.append(a,`ilike(any).{${e.join(",")}}`),this}regexMatch(a,e){return this.url.searchParams.append(a,`match.${e}`),this}regexIMatch(a,e){return this.url.searchParams.append(a,`imatch.${e}`),this}is(a,e){return this.url.searchParams.append(a,`is.${e}`),this}isDistinct(a,e){return this.url.searchParams.append(a,`isdistinct.${e}`),this}in(a,e){const t=Array.from(new Set(e)).map(s=>typeof s=="string"&&Nt.test(s)?`"${s}"`:`${s}`).join(",");return this.url.searchParams.append(a,`in.(${t})`),this}notIn(a,e){const t=Array.from(new Set(e)).map(s=>typeof s=="string"&&Nt.test(s)?`"${s}"`:`${s}`).join(",");return this.url.searchParams.append(a,`not.in.(${t})`),this}contains(a,e){return typeof e=="string"?this.url.searchParams.append(a,`cs.${e}`):Array.isArray(e)?this.url.searchParams.append(a,`cs.{${e.join(",")}}`):this.url.searchParams.append(a,`cs.${JSON.stringify(e)}`),this}containedBy(a,e){return typeof e=="string"?this.url.searchParams.append(a,`cd.${e}`):Array.isArray(e)?this.url.searchParams.append(a,`cd.{${e.join(",")}}`):this.url.searchParams.append(a,`cd.${JSON.stringify(e)}`),this}rangeGt(a,e){return this.url.searchParams.append(a,`sr.${e}`),this}rangeGte(a,e){return this.url.searchParams.append(a,`nxl.${e}`),this}rangeLt(a,e){return this.url.searchParams.append(a,`sl.${e}`),this}rangeLte(a,e){return this.url.searchParams.append(a,`nxr.${e}`),this}rangeAdjacent(a,e){return this.url.searchParams.append(a,`adj.${e}`),this}overlaps(a,e){return typeof e=="string"?this.url.searchParams.append(a,`ov.${e}`):this.url.searchParams.append(a,`ov.{${e.join(",")}}`),this}textSearch(a,e,{config:t,type:s}={}){let n="";s==="plain"?n="pl":s==="phrase"?n="ph":s==="websearch"&&(n="w");const r=t===void 0?"":`(${t})`;return this.url.searchParams.append(a,`${n}fts${r}.${e}`),this}match(a){return Object.entries(a).forEach(([e,t])=>{this.url.searchParams.append(e,`eq.${t}`)}),this}not(a,e,t){return this.url.searchParams.append(a,`not.${e}.${t}`),this}or(a,{foreignTable:e,referencedTable:t=e}={}){const s=t?`${t}.or`:"or";return this.url.searchParams.append(s,`(${a})`),this}filter(a,e,t){return this.url.searchParams.append(a,`${e}.${t}`),this}},Ya=class{constructor(a,{headers:e={},schema:t,fetch:s,urlLengthLimit:n=8e3}){this.url=a,this.headers=new Headers(e),this.schema=t,this.fetch=s,this.urlLengthLimit=n}cloneRequestState(){return{url:new URL(this.url.toString()),headers:new Headers(this.headers)}}select(a,e){const{head:t=!1,count:s}=e??{},n=t?"HEAD":"GET";let r=!1;const i=(a??"*").split("").map(d=>/\s/.test(d)&&!r?"":(d==='"'&&(r=!r),d)).join(""),{url:o,headers:l}=this.cloneRequestState();return o.searchParams.set("select",i),s&&l.append("Prefer",`count=${s}`),new Ee({method:n,url:o,headers:l,schema:this.schema,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit})}insert(a,{count:e,defaultToNull:t=!0}={}){var s;const n="POST",{url:r,headers:i}=this.cloneRequestState();if(e&&i.append("Prefer",`count=${e}`),t||i.append("Prefer","missing=default"),Array.isArray(a)){const o=a.reduce((l,d)=>l.concat(Object.keys(d)),[]);if(o.length>0){const l=[...new Set(o)].map(d=>`"${d}"`);r.searchParams.set("columns",l.join(","))}}return new Ee({method:n,url:r,headers:i,schema:this.schema,body:a,fetch:(s=this.fetch)!==null&&s!==void 0?s:fetch,urlLengthLimit:this.urlLengthLimit})}upsert(a,{onConflict:e,ignoreDuplicates:t=!1,count:s,defaultToNull:n=!0}={}){var r;const i="POST",{url:o,headers:l}=this.cloneRequestState();if(l.append("Prefer",`resolution=${t?"ignore":"merge"}-duplicates`),e!==void 0&&o.searchParams.set("on_conflict",e),s&&l.append("Prefer",`count=${s}`),n||l.append("Prefer","missing=default"),Array.isArray(a)){const d=a.reduce((c,p)=>c.concat(Object.keys(p)),[]);if(d.length>0){const c=[...new Set(d)].map(p=>`"${p}"`);o.searchParams.set("columns",c.join(","))}}return new Ee({method:i,url:o,headers:l,schema:this.schema,body:a,fetch:(r=this.fetch)!==null&&r!==void 0?r:fetch,urlLengthLimit:this.urlLengthLimit})}update(a,{count:e}={}){var t;const s="PATCH",{url:n,headers:r}=this.cloneRequestState();return e&&r.append("Prefer",`count=${e}`),new Ee({method:s,url:n,headers:r,schema:this.schema,body:a,fetch:(t=this.fetch)!==null&&t!==void 0?t:fetch,urlLengthLimit:this.urlLengthLimit})}delete({count:a}={}){var e;const t="DELETE",{url:s,headers:n}=this.cloneRequestState();return a&&n.append("Prefer",`count=${a}`),new Ee({method:t,url:s,headers:n,schema:this.schema,fetch:(e=this.fetch)!==null&&e!==void 0?e:fetch,urlLengthLimit:this.urlLengthLimit})}};function Me(a){"@babel/helpers - typeof";return Me=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Me(a)}function Xa(a,e){if(Me(a)!="object"||!a)return a;var t=a[Symbol.toPrimitive];if(t!==void 0){var s=t.call(a,e);if(Me(s)!="object")return s;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(a)}function Qa(a){var e=Xa(a,"string");return Me(e)=="symbol"?e:e+""}function Za(a,e,t){return(e=Qa(e))in a?Object.defineProperty(a,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):a[e]=t,a}function Ht(a,e){var t=Object.keys(a);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(a);e&&(s=s.filter(function(n){return Object.getOwnPropertyDescriptor(a,n).enumerable})),t.push.apply(t,s)}return t}function We(a){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?Ht(Object(t),!0).forEach(function(s){Za(a,s,t[s])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(t)):Ht(Object(t)).forEach(function(s){Object.defineProperty(a,s,Object.getOwnPropertyDescriptor(t,s))})}return a}var es=class ga{constructor(e,{headers:t={},schema:s,fetch:n,timeout:r,urlLengthLimit:i=8e3}={}){this.url=e,this.headers=new Headers(t),this.schemaName=s,this.urlLengthLimit=i;const o=n??globalThis.fetch;r!==void 0&&r>0?this.fetch=(l,d)=>{const c=new AbortController,p=setTimeout(()=>c.abort(),r),u=d?.signal;if(u){if(u.aborted)return clearTimeout(p),o(l,d);const h=()=>{clearTimeout(p),c.abort()};return u.addEventListener("abort",h,{once:!0}),o(l,We(We({},d),{},{signal:c.signal})).finally(()=>{clearTimeout(p),u.removeEventListener("abort",h)})}return o(l,We(We({},d),{},{signal:c.signal})).finally(()=>clearTimeout(p))}:this.fetch=o}from(e){if(!e||typeof e!="string"||e.trim()==="")throw new Error("Invalid relation name: relation must be a non-empty string.");return new Ya(new URL(`${this.url}/${e}`),{headers:new Headers(this.headers),schema:this.schemaName,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit})}schema(e){return new ga(this.url,{headers:this.headers,schema:e,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit})}rpc(e,t={},{head:s=!1,get:n=!1,count:r}={}){var i;let o;const l=new URL(`${this.url}/rpc/${e}`);let d;const c=h=>h!==null&&typeof h=="object"&&(!Array.isArray(h)||h.some(c)),p=s&&Object.values(t).some(c);p?(o="POST",d=t):s||n?(o=s?"HEAD":"GET",Object.entries(t).filter(([h,m])=>m!==void 0).map(([h,m])=>[h,Array.isArray(m)?`{${m.join(",")}}`:`${m}`]).forEach(([h,m])=>{l.searchParams.append(h,m)})):(o="POST",d=t);const u=new Headers(this.headers);return p?u.set("Prefer",r?`count=${r},return=minimal`:"return=minimal"):r&&u.set("Prefer",`count=${r}`),new Ee({method:o,url:l,headers:u,schema:this.schemaName,body:d,fetch:(i=this.fetch)!==null&&i!==void 0?i:fetch,urlLengthLimit:this.urlLengthLimit})}};class ts{constructor(){}static detectEnvironment(){var e;if(typeof WebSocket<"u")return{type:"native",constructor:WebSocket};if(typeof globalThis<"u"&&typeof globalThis.WebSocket<"u")return{type:"native",constructor:globalThis.WebSocket};if(typeof global<"u"&&typeof global.WebSocket<"u")return{type:"native",constructor:global.WebSocket};if(typeof globalThis<"u"&&typeof globalThis.WebSocketPair<"u"&&typeof globalThis.WebSocket>"u")return{type:"cloudflare",error:"Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.",workaround:"Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime."};if(typeof globalThis<"u"&&globalThis.EdgeRuntime||typeof navigator<"u"&&(!((e=navigator.userAgent)===null||e===void 0)&&e.includes("Vercel-Edge")))return{type:"unsupported",error:"Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.",workaround:"Use serverless functions or a different deployment target for WebSocket functionality."};const t=globalThis.process;if(t){const s=t.versions;if(s&&s.node){const n=s.node,r=parseInt(n.replace(/^v/,"").split(".")[0]);return r>=22?typeof globalThis.WebSocket<"u"?{type:"native",constructor:globalThis.WebSocket}:{type:"unsupported",error:`Node.js ${r} detected but native WebSocket not found.`,workaround:"Provide a WebSocket implementation via the transport option."}:{type:"unsupported",error:`Node.js ${r} detected without native WebSocket support.`,workaround:`For Node.js < 22, install "ws" package and provide it via the transport option:
import ws from "ws"
new RealtimeClient(url, { transport: ws })`}}}return{type:"unsupported",error:"Unknown JavaScript runtime without WebSocket support.",workaround:"Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation."}}static getWebSocketConstructor(){const e=this.detectEnvironment();if(e.constructor)return e.constructor;let t=e.error||"WebSocket not supported in this environment.";throw e.workaround&&(t+=`

Suggested solution: ${e.workaround}`),new Error(t)}static createWebSocket(e,t){const s=this.getWebSocketConstructor();return new s(e,t)}static isWebSocketSupported(){try{const e=this.detectEnvironment();return e.type==="native"||e.type==="ws"}catch{return!1}}}const as="2.97.0",ss=`realtime-js/${as}`,ns="1.0.0",ya="2.0.0",Bt=ya,xt=1e4,rs=1e3,is=100;var oe;(function(a){a[a.connecting=0]="connecting",a[a.open=1]="open",a[a.closing=2]="closing",a[a.closed=3]="closed"})(oe||(oe={}));var M;(function(a){a.closed="closed",a.errored="errored",a.joined="joined",a.joining="joining",a.leaving="leaving"})(M||(M={}));var ee;(function(a){a.close="phx_close",a.error="phx_error",a.join="phx_join",a.reply="phx_reply",a.leave="phx_leave",a.access_token="access_token"})(ee||(ee={}));var St;(function(a){a.websocket="websocket"})(St||(St={}));var me;(function(a){a.Connecting="connecting",a.Open="open",a.Closing="closing",a.Closed="closed"})(me||(me={}));class os{constructor(e){this.HEADER_LENGTH=1,this.USER_BROADCAST_PUSH_META_LENGTH=6,this.KINDS={userBroadcastPush:3,userBroadcast:4},this.BINARY_ENCODING=0,this.JSON_ENCODING=1,this.BROADCAST_EVENT="broadcast",this.allowedMetadataKeys=[],this.allowedMetadataKeys=e??[]}encode(e,t){if(e.event===this.BROADCAST_EVENT&&!(e.payload instanceof ArrayBuffer)&&typeof e.payload.event=="string")return t(this._binaryEncodeUserBroadcastPush(e));let s=[e.join_ref,e.ref,e.topic,e.event,e.payload];return t(JSON.stringify(s))}_binaryEncodeUserBroadcastPush(e){var t;return this._isArrayBuffer((t=e.payload)===null||t===void 0?void 0:t.payload)?this._encodeBinaryUserBroadcastPush(e):this._encodeJsonUserBroadcastPush(e)}_encodeBinaryUserBroadcastPush(e){var t,s;const n=(s=(t=e.payload)===null||t===void 0?void 0:t.payload)!==null&&s!==void 0?s:new ArrayBuffer(0);return this._encodeUserBroadcastPush(e,this.BINARY_ENCODING,n)}_encodeJsonUserBroadcastPush(e){var t,s;const n=(s=(t=e.payload)===null||t===void 0?void 0:t.payload)!==null&&s!==void 0?s:{},i=new TextEncoder().encode(JSON.stringify(n)).buffer;return this._encodeUserBroadcastPush(e,this.JSON_ENCODING,i)}_encodeUserBroadcastPush(e,t,s){var n,r;const i=e.topic,o=(n=e.ref)!==null&&n!==void 0?n:"",l=(r=e.join_ref)!==null&&r!==void 0?r:"",d=e.payload.event,c=this.allowedMetadataKeys?this._pick(e.payload,this.allowedMetadataKeys):{},p=Object.keys(c).length===0?"":JSON.stringify(c);if(l.length>255)throw new Error(`joinRef length ${l.length} exceeds maximum of 255`);if(o.length>255)throw new Error(`ref length ${o.length} exceeds maximum of 255`);if(i.length>255)throw new Error(`topic length ${i.length} exceeds maximum of 255`);if(d.length>255)throw new Error(`userEvent length ${d.length} exceeds maximum of 255`);if(p.length>255)throw new Error(`metadata length ${p.length} exceeds maximum of 255`);const u=this.USER_BROADCAST_PUSH_META_LENGTH+l.length+o.length+i.length+d.length+p.length,h=new ArrayBuffer(this.HEADER_LENGTH+u);let m=new DataView(h),g=0;m.setUint8(g++,this.KINDS.userBroadcastPush),m.setUint8(g++,l.length),m.setUint8(g++,o.length),m.setUint8(g++,i.length),m.setUint8(g++,d.length),m.setUint8(g++,p.length),m.setUint8(g++,t),Array.from(l,f=>m.setUint8(g++,f.charCodeAt(0))),Array.from(o,f=>m.setUint8(g++,f.charCodeAt(0))),Array.from(i,f=>m.setUint8(g++,f.charCodeAt(0))),Array.from(d,f=>m.setUint8(g++,f.charCodeAt(0))),Array.from(p,f=>m.setUint8(g++,f.charCodeAt(0)));var y=new Uint8Array(h.byteLength+s.byteLength);return y.set(new Uint8Array(h),0),y.set(new Uint8Array(s),h.byteLength),y.buffer}decode(e,t){if(this._isArrayBuffer(e)){let s=this._binaryDecode(e);return t(s)}if(typeof e=="string"){const s=JSON.parse(e),[n,r,i,o,l]=s;return t({join_ref:n,ref:r,topic:i,event:o,payload:l})}return t({})}_binaryDecode(e){const t=new DataView(e),s=t.getUint8(0),n=new TextDecoder;if(s===this.KINDS.userBroadcast)return this._decodeUserBroadcast(e,t,n)}_decodeUserBroadcast(e,t,s){const n=t.getUint8(1),r=t.getUint8(2),i=t.getUint8(3),o=t.getUint8(4);let l=this.HEADER_LENGTH+4;const d=s.decode(e.slice(l,l+n));l=l+n;const c=s.decode(e.slice(l,l+r));l=l+r;const p=s.decode(e.slice(l,l+i));l=l+i;const u=e.slice(l,e.byteLength),h=o===this.JSON_ENCODING?JSON.parse(s.decode(u)):u,m={type:this.BROADCAST_EVENT,event:c,payload:h};return i>0&&(m.meta=JSON.parse(p)),{join_ref:null,ref:null,topic:d,event:this.BROADCAST_EVENT,payload:m}}_isArrayBuffer(e){var t;return e instanceof ArrayBuffer||((t=e?.constructor)===null||t===void 0?void 0:t.name)==="ArrayBuffer"}_pick(e,t){return!e||typeof e!="object"?{}:Object.fromEntries(Object.entries(e).filter(([s])=>t.includes(s)))}}class va{constructor(e,t){this.callback=e,this.timerCalc=t,this.timer=void 0,this.tries=0,this.callback=e,this.timerCalc=t}reset(){this.tries=0,clearTimeout(this.timer),this.timer=void 0}scheduleTimeout(){clearTimeout(this.timer),this.timer=setTimeout(()=>{this.tries=this.tries+1,this.callback()},this.timerCalc(this.tries+1))}}var O;(function(a){a.abstime="abstime",a.bool="bool",a.date="date",a.daterange="daterange",a.float4="float4",a.float8="float8",a.int2="int2",a.int4="int4",a.int4range="int4range",a.int8="int8",a.int8range="int8range",a.json="json",a.jsonb="jsonb",a.money="money",a.numeric="numeric",a.oid="oid",a.reltime="reltime",a.text="text",a.time="time",a.timestamp="timestamp",a.timestamptz="timestamptz",a.timetz="timetz",a.tsrange="tsrange",a.tstzrange="tstzrange"})(O||(O={}));const zt=(a,e,t={})=>{var s;const n=(s=t.skipTypes)!==null&&s!==void 0?s:[];return e?Object.keys(e).reduce((r,i)=>(r[i]=ls(i,a,e,n),r),{}):{}},ls=(a,e,t,s)=>{const n=e.find(o=>o.name===a),r=n?.type,i=t[a];return r&&!s.includes(r)?fa(r,i):kt(i)},fa=(a,e)=>{if(a.charAt(0)==="_"){const t=a.slice(1,a.length);return ps(e,t)}switch(a){case O.bool:return ds(e);case O.float4:case O.float8:case O.int2:case O.int4:case O.int8:case O.numeric:case O.oid:return cs(e);case O.json:case O.jsonb:return us(e);case O.timestamp:return hs(e);case O.abstime:case O.date:case O.daterange:case O.int4range:case O.int8range:case O.money:case O.reltime:case O.text:case O.time:case O.timestamptz:case O.timetz:case O.tsrange:case O.tstzrange:return kt(e);default:return kt(e)}},kt=a=>a,ds=a=>{switch(a){case"t":return!0;case"f":return!1;default:return a}},cs=a=>{if(typeof a=="string"){const e=parseFloat(a);if(!Number.isNaN(e))return e}return a},us=a=>{if(typeof a=="string")try{return JSON.parse(a)}catch{return a}return a},ps=(a,e)=>{if(typeof a!="string")return a;const t=a.length-1,s=a[t];if(a[0]==="{"&&s==="}"){let r;const i=a.slice(1,t);try{r=JSON.parse("["+i+"]")}catch{r=i?i.split(","):[]}return r.map(o=>fa(e,o))}return a},hs=a=>typeof a=="string"?a.replace(" ","T"):a,ba=a=>{const e=new URL(a);return e.protocol=e.protocol.replace(/^ws/i,"http"),e.pathname=e.pathname.replace(/\/+$/,"").replace(/\/socket\/websocket$/i,"").replace(/\/socket$/i,"").replace(/\/websocket$/i,""),e.pathname===""||e.pathname==="/"?e.pathname="/api/broadcast":e.pathname=e.pathname+"/api/broadcast",e.href};class ct{constructor(e,t,s={},n=xt){this.channel=e,this.event=t,this.payload=s,this.timeout=n,this.sent=!1,this.timeoutTimer=void 0,this.ref="",this.receivedResp=null,this.recHooks=[],this.refEvent=null}resend(e){this.timeout=e,this._cancelRefEvent(),this.ref="",this.refEvent=null,this.receivedResp=null,this.sent=!1,this.send()}send(){this._hasReceived("timeout")||(this.startTimeout(),this.sent=!0,this.channel.socket.push({topic:this.channel.topic,event:this.event,payload:this.payload,ref:this.ref,join_ref:this.channel._joinRef()}))}updatePayload(e){this.payload=Object.assign(Object.assign({},this.payload),e)}receive(e,t){var s;return this._hasReceived(e)&&t((s=this.receivedResp)===null||s===void 0?void 0:s.response),this.recHooks.push({status:e,callback:t}),this}startTimeout(){if(this.timeoutTimer)return;this.ref=this.channel.socket._makeRef(),this.refEvent=this.channel._replyEventName(this.ref);const e=t=>{this._cancelRefEvent(),this._cancelTimeout(),this.receivedResp=t,this._matchReceive(t)};this.channel._on(this.refEvent,{},e),this.timeoutTimer=setTimeout(()=>{this.trigger("timeout",{})},this.timeout)}trigger(e,t){this.refEvent&&this.channel._trigger(this.refEvent,{status:e,response:t})}destroy(){this._cancelRefEvent(),this._cancelTimeout()}_cancelRefEvent(){this.refEvent&&this.channel._off(this.refEvent,{})}_cancelTimeout(){clearTimeout(this.timeoutTimer),this.timeoutTimer=void 0}_matchReceive({status:e,response:t}){this.recHooks.filter(s=>s.status===e).forEach(s=>s.callback(t))}_hasReceived(e){return this.receivedResp&&this.receivedResp.status===e}}var Ft;(function(a){a.SYNC="sync",a.JOIN="join",a.LEAVE="leave"})(Ft||(Ft={}));class Ie{constructor(e,t){this.channel=e,this.state={},this.pendingDiffs=[],this.joinRef=null,this.enabled=!1,this.caller={onJoin:()=>{},onLeave:()=>{},onSync:()=>{}};const s=t?.events||{state:"presence_state",diff:"presence_diff"};this.channel._on(s.state,{},n=>{const{onJoin:r,onLeave:i,onSync:o}=this.caller;this.joinRef=this.channel._joinRef(),this.state=Ie.syncState(this.state,n,r,i),this.pendingDiffs.forEach(l=>{this.state=Ie.syncDiff(this.state,l,r,i)}),this.pendingDiffs=[],o()}),this.channel._on(s.diff,{},n=>{const{onJoin:r,onLeave:i,onSync:o}=this.caller;this.inPendingSyncState()?this.pendingDiffs.push(n):(this.state=Ie.syncDiff(this.state,n,r,i),o())}),this.onJoin((n,r,i)=>{this.channel._trigger("presence",{event:"join",key:n,currentPresences:r,newPresences:i})}),this.onLeave((n,r,i)=>{this.channel._trigger("presence",{event:"leave",key:n,currentPresences:r,leftPresences:i})}),this.onSync(()=>{this.channel._trigger("presence",{event:"sync"})})}static syncState(e,t,s,n){const r=this.cloneDeep(e),i=this.transformState(t),o={},l={};return this.map(r,(d,c)=>{i[d]||(l[d]=c)}),this.map(i,(d,c)=>{const p=r[d];if(p){const u=c.map(y=>y.presence_ref),h=p.map(y=>y.presence_ref),m=c.filter(y=>h.indexOf(y.presence_ref)<0),g=p.filter(y=>u.indexOf(y.presence_ref)<0);m.length>0&&(o[d]=m),g.length>0&&(l[d]=g)}else o[d]=c}),this.syncDiff(r,{joins:o,leaves:l},s,n)}static syncDiff(e,t,s,n){const{joins:r,leaves:i}={joins:this.transformState(t.joins),leaves:this.transformState(t.leaves)};return s||(s=()=>{}),n||(n=()=>{}),this.map(r,(o,l)=>{var d;const c=(d=e[o])!==null&&d!==void 0?d:[];if(e[o]=this.cloneDeep(l),c.length>0){const p=e[o].map(h=>h.presence_ref),u=c.filter(h=>p.indexOf(h.presence_ref)<0);e[o].unshift(...u)}s(o,c,l)}),this.map(i,(o,l)=>{let d=e[o];if(!d)return;const c=l.map(p=>p.presence_ref);d=d.filter(p=>c.indexOf(p.presence_ref)<0),e[o]=d,n(o,d,l),d.length===0&&delete e[o]}),e}static map(e,t){return Object.getOwnPropertyNames(e).map(s=>t(s,e[s]))}static transformState(e){return e=this.cloneDeep(e),Object.getOwnPropertyNames(e).reduce((t,s)=>{const n=e[s];return"metas"in n?t[s]=n.metas.map(r=>(r.presence_ref=r.phx_ref,delete r.phx_ref,delete r.phx_ref_prev,r)):t[s]=n,t},{})}static cloneDeep(e){return JSON.parse(JSON.stringify(e))}onJoin(e){this.caller.onJoin=e}onLeave(e){this.caller.onLeave=e}onSync(e){this.caller.onSync=e}inPendingSyncState(){return!this.joinRef||this.joinRef!==this.channel._joinRef()}}var Gt;(function(a){a.ALL="*",a.INSERT="INSERT",a.UPDATE="UPDATE",a.DELETE="DELETE"})(Gt||(Gt={}));var je;(function(a){a.BROADCAST="broadcast",a.PRESENCE="presence",a.POSTGRES_CHANGES="postgres_changes",a.SYSTEM="system"})(je||(je={}));var re;(function(a){a.SUBSCRIBED="SUBSCRIBED",a.TIMED_OUT="TIMED_OUT",a.CLOSED="CLOSED",a.CHANNEL_ERROR="CHANNEL_ERROR"})(re||(re={}));class Ae{constructor(e,t={config:{}},s){var n,r;if(this.topic=e,this.params=t,this.socket=s,this.bindings={},this.state=M.closed,this.joinedOnce=!1,this.pushBuffer=[],this.subTopic=e.replace(/^realtime:/i,""),this.params.config=Object.assign({broadcast:{ack:!1,self:!1},presence:{key:"",enabled:!1},private:!1},t.config),this.timeout=this.socket.timeout,this.joinPush=new ct(this,ee.join,this.params,this.timeout),this.rejoinTimer=new va(()=>this._rejoinUntilConnected(),this.socket.reconnectAfterMs),this.joinPush.receive("ok",()=>{this.state=M.joined,this.rejoinTimer.reset(),this.pushBuffer.forEach(i=>i.send()),this.pushBuffer=[]}),this._onClose(()=>{this.rejoinTimer.reset(),this.socket.log("channel",`close ${this.topic} ${this._joinRef()}`),this.state=M.closed,this.socket._remove(this)}),this._onError(i=>{this._isLeaving()||this._isClosed()||(this.socket.log("channel",`error ${this.topic}`,i),this.state=M.errored,this.rejoinTimer.scheduleTimeout())}),this.joinPush.receive("timeout",()=>{this._isJoining()&&(this.socket.log("channel",`timeout ${this.topic}`,this.joinPush.timeout),this.state=M.errored,this.rejoinTimer.scheduleTimeout())}),this.joinPush.receive("error",i=>{this._isLeaving()||this._isClosed()||(this.socket.log("channel",`error ${this.topic}`,i),this.state=M.errored,this.rejoinTimer.scheduleTimeout())}),this._on(ee.reply,{},(i,o)=>{this._trigger(this._replyEventName(o),i)}),this.presence=new Ie(this),this.broadcastEndpointURL=ba(this.socket.endPoint),this.private=this.params.config.private||!1,!this.private&&(!((r=(n=this.params.config)===null||n===void 0?void 0:n.broadcast)===null||r===void 0)&&r.replay))throw`tried to use replay on public channel '${this.topic}'. It must be a private channel.`}subscribe(e,t=this.timeout){var s,n,r;if(this.socket.isConnected()||this.socket.connect(),this.state==M.closed){const{config:{broadcast:i,presence:o,private:l}}=this.params,d=(n=(s=this.bindings.postgres_changes)===null||s===void 0?void 0:s.map(h=>h.filter))!==null&&n!==void 0?n:[],c=!!this.bindings[je.PRESENCE]&&this.bindings[je.PRESENCE].length>0||((r=this.params.config.presence)===null||r===void 0?void 0:r.enabled)===!0,p={},u={broadcast:i,presence:Object.assign(Object.assign({},o),{enabled:c}),postgres_changes:d,private:l};this.socket.accessTokenValue&&(p.access_token=this.socket.accessTokenValue),this._onError(h=>e?.(re.CHANNEL_ERROR,h)),this._onClose(()=>e?.(re.CLOSED)),this.updateJoinPayload(Object.assign({config:u},p)),this.joinedOnce=!0,this._rejoin(t),this.joinPush.receive("ok",async({postgres_changes:h})=>{var m;if(this.socket._isManualToken()||this.socket.setAuth(),h===void 0){e?.(re.SUBSCRIBED);return}else{const g=this.bindings.postgres_changes,y=(m=g?.length)!==null&&m!==void 0?m:0,f=[];for(let _=0;_<y;_++){const b=g[_],{filter:{event:k,schema:P,table:A,filter:L}}=b,H=h&&h[_];if(H&&H.event===k&&Ae.isFilterValueEqual(H.schema,P)&&Ae.isFilterValueEqual(H.table,A)&&Ae.isFilterValueEqual(H.filter,L))f.push(Object.assign(Object.assign({},b),{id:H.id}));else{this.unsubscribe(),this.state=M.errored,e?.(re.CHANNEL_ERROR,new Error("mismatch between server and client bindings for postgres changes"));return}}this.bindings.postgres_changes=f,e&&e(re.SUBSCRIBED);return}}).receive("error",h=>{this.state=M.errored,e?.(re.CHANNEL_ERROR,new Error(JSON.stringify(Object.values(h).join(", ")||"error")))}).receive("timeout",()=>{e?.(re.TIMED_OUT)})}return this}presenceState(){return this.presence.state}async track(e,t={}){return await this.send({type:"presence",event:"track",payload:e},t.timeout||this.timeout)}async untrack(e={}){return await this.send({type:"presence",event:"untrack"},e)}on(e,t,s){return this.state===M.joined&&e===je.PRESENCE&&(this.socket.log("channel",`resubscribe to ${this.topic} due to change in presence callbacks on joined channel`),this.unsubscribe().then(async()=>await this.subscribe())),this._on(e,t,s)}async httpSend(e,t,s={}){var n;if(t==null)return Promise.reject("Payload is required for httpSend()");const r={apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"};this.socket.accessTokenValue&&(r.Authorization=`Bearer ${this.socket.accessTokenValue}`);const i={method:"POST",headers:r,body:JSON.stringify({messages:[{topic:this.subTopic,event:e,payload:t,private:this.private}]})},o=await this._fetchWithTimeout(this.broadcastEndpointURL,i,(n=s.timeout)!==null&&n!==void 0?n:this.timeout);if(o.status===202)return{success:!0};let l=o.statusText;try{const d=await o.json();l=d.error||d.message||l}catch{}return Promise.reject(new Error(l))}async send(e,t={}){var s,n;if(!this._canPush()&&e.type==="broadcast"){console.warn("Realtime send() is automatically falling back to REST API. This behavior will be deprecated in the future. Please use httpSend() explicitly for REST delivery.");const{event:r,payload:i}=e,o={apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"};this.socket.accessTokenValue&&(o.Authorization=`Bearer ${this.socket.accessTokenValue}`);const l={method:"POST",headers:o,body:JSON.stringify({messages:[{topic:this.subTopic,event:r,payload:i,private:this.private}]})};try{const d=await this._fetchWithTimeout(this.broadcastEndpointURL,l,(s=t.timeout)!==null&&s!==void 0?s:this.timeout);return await((n=d.body)===null||n===void 0?void 0:n.cancel()),d.ok?"ok":"error"}catch(d){return d.name==="AbortError"?"timed out":"error"}}else return new Promise(r=>{var i,o,l;const d=this._push(e.type,e,t.timeout||this.timeout);e.type==="broadcast"&&!(!((l=(o=(i=this.params)===null||i===void 0?void 0:i.config)===null||o===void 0?void 0:o.broadcast)===null||l===void 0)&&l.ack)&&r("ok"),d.receive("ok",()=>r("ok")),d.receive("error",()=>r("error")),d.receive("timeout",()=>r("timed out"))})}updateJoinPayload(e){this.joinPush.updatePayload(e)}unsubscribe(e=this.timeout){this.state=M.leaving;const t=()=>{this.socket.log("channel",`leave ${this.topic}`),this._trigger(ee.close,"leave",this._joinRef())};this.joinPush.destroy();let s=null;return new Promise(n=>{s=new ct(this,ee.leave,{},e),s.receive("ok",()=>{t(),n("ok")}).receive("timeout",()=>{t(),n("timed out")}).receive("error",()=>{n("error")}),s.send(),this._canPush()||s.trigger("ok",{})}).finally(()=>{s?.destroy()})}teardown(){this.pushBuffer.forEach(e=>e.destroy()),this.pushBuffer=[],this.rejoinTimer.reset(),this.joinPush.destroy(),this.state=M.closed,this.bindings={}}async _fetchWithTimeout(e,t,s){const n=new AbortController,r=setTimeout(()=>n.abort(),s),i=await this.socket.fetch(e,Object.assign(Object.assign({},t),{signal:n.signal}));return clearTimeout(r),i}_push(e,t,s=this.timeout){if(!this.joinedOnce)throw`tried to push '${e}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;let n=new ct(this,e,t,s);return this._canPush()?n.send():this._addToPushBuffer(n),n}_addToPushBuffer(e){if(e.startTimeout(),this.pushBuffer.push(e),this.pushBuffer.length>is){const t=this.pushBuffer.shift();t&&(t.destroy(),this.socket.log("channel",`discarded push due to buffer overflow: ${t.event}`,t.payload))}}_onMessage(e,t,s){return t}_isMember(e){return this.topic===e}_joinRef(){return this.joinPush.ref}_trigger(e,t,s){var n,r;const i=e.toLocaleLowerCase(),{close:o,error:l,leave:d,join:c}=ee;if(s&&[o,l,d,c].indexOf(i)>=0&&s!==this._joinRef())return;let u=this._onMessage(i,t,s);if(t&&!u)throw"channel onMessage callbacks must return the payload, modified or unmodified";["insert","update","delete"].includes(i)?(n=this.bindings.postgres_changes)===null||n===void 0||n.filter(h=>{var m,g,y;return((m=h.filter)===null||m===void 0?void 0:m.event)==="*"||((y=(g=h.filter)===null||g===void 0?void 0:g.event)===null||y===void 0?void 0:y.toLocaleLowerCase())===i}).map(h=>h.callback(u,s)):(r=this.bindings[i])===null||r===void 0||r.filter(h=>{var m,g,y,f,_,b;if(["broadcast","presence","postgres_changes"].includes(i))if("id"in h){const k=h.id,P=(m=h.filter)===null||m===void 0?void 0:m.event;return k&&((g=t.ids)===null||g===void 0?void 0:g.includes(k))&&(P==="*"||P?.toLocaleLowerCase()===((y=t.data)===null||y===void 0?void 0:y.type.toLocaleLowerCase()))}else{const k=(_=(f=h?.filter)===null||f===void 0?void 0:f.event)===null||_===void 0?void 0:_.toLocaleLowerCase();return k==="*"||k===((b=t?.event)===null||b===void 0?void 0:b.toLocaleLowerCase())}else return h.type.toLocaleLowerCase()===i}).map(h=>{if(typeof u=="object"&&"ids"in u){const m=u.data,{schema:g,table:y,commit_timestamp:f,type:_,errors:b}=m;u=Object.assign(Object.assign({},{schema:g,table:y,commit_timestamp:f,eventType:_,new:{},old:{},errors:b}),this._getPayloadRecords(m))}h.callback(u,s)})}_isClosed(){return this.state===M.closed}_isJoined(){return this.state===M.joined}_isJoining(){return this.state===M.joining}_isLeaving(){return this.state===M.leaving}_replyEventName(e){return`chan_reply_${e}`}_on(e,t,s){const n=e.toLocaleLowerCase(),r={type:n,filter:t,callback:s};return this.bindings[n]?this.bindings[n].push(r):this.bindings[n]=[r],this}_off(e,t){const s=e.toLocaleLowerCase();return this.bindings[s]&&(this.bindings[s]=this.bindings[s].filter(n=>{var r;return!(((r=n.type)===null||r===void 0?void 0:r.toLocaleLowerCase())===s&&Ae.isEqual(n.filter,t))})),this}static isEqual(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const s in e)if(e[s]!==t[s])return!1;return!0}static isFilterValueEqual(e,t){return(e??void 0)===(t??void 0)}_rejoinUntilConnected(){this.rejoinTimer.scheduleTimeout(),this.socket.isConnected()&&this._rejoin()}_onClose(e){this._on(ee.close,{},e)}_onError(e){this._on(ee.error,{},t=>e(t))}_canPush(){return this.socket.isConnected()&&this._isJoined()}_rejoin(e=this.timeout){this._isLeaving()||(this.socket._leaveOpenTopic(this.topic),this.state=M.joining,this.joinPush.resend(e))}_getPayloadRecords(e){const t={new:{},old:{}};return(e.type==="INSERT"||e.type==="UPDATE")&&(t.new=zt(e.columns,e.record)),(e.type==="UPDATE"||e.type==="DELETE")&&(t.old=zt(e.columns,e.old_record)),t}}const ut=()=>{},Ve={HEARTBEAT_INTERVAL:25e3,RECONNECT_DELAY:10,HEARTBEAT_TIMEOUT_FALLBACK:100},ms=[1e3,2e3,5e3,1e4],gs=1e4,ys=`
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;class vs{constructor(e,t){var s;if(this.accessTokenValue=null,this.apiKey=null,this._manuallySetToken=!1,this.channels=new Array,this.endPoint="",this.httpEndpoint="",this.headers={},this.params={},this.timeout=xt,this.transport=null,this.heartbeatIntervalMs=Ve.HEARTBEAT_INTERVAL,this.heartbeatTimer=void 0,this.pendingHeartbeatRef=null,this.heartbeatCallback=ut,this.ref=0,this.reconnectTimer=null,this.vsn=Bt,this.logger=ut,this.conn=null,this.sendBuffer=[],this.serializer=new os,this.stateChangeCallbacks={open:[],close:[],error:[],message:[]},this.accessToken=null,this._connectionState="disconnected",this._wasManualDisconnect=!1,this._authPromise=null,this._heartbeatSentAt=null,this._resolveFetch=n=>n?(...r)=>n(...r):(...r)=>fetch(...r),!(!((s=t?.params)===null||s===void 0)&&s.apikey))throw new Error("API key is required to connect to Realtime");this.apiKey=t.params.apikey,this.endPoint=`${e}/${St.websocket}`,this.httpEndpoint=ba(e),this._initializeOptions(t),this._setupReconnectionTimer(),this.fetch=this._resolveFetch(t?.fetch)}connect(){if(!(this.isConnecting()||this.isDisconnecting()||this.conn!==null&&this.isConnected())){if(this._setConnectionState("connecting"),this.accessToken&&!this._authPromise&&this._setAuthSafely("connect"),this.transport)this.conn=new this.transport(this.endpointURL());else try{this.conn=ts.createWebSocket(this.endpointURL())}catch(e){this._setConnectionState("disconnected");const t=e.message;throw t.includes("Node.js")?new Error(`${t}

To use Realtime in Node.js, you need to provide a WebSocket implementation:

Option 1: Use Node.js 22+ which has native WebSocket support
Option 2: Install and provide the "ws" package:

  npm install ws

  import ws from "ws"
  const client = new RealtimeClient(url, {
    ...options,
    transport: ws
  })`):new Error(`WebSocket not available: ${t}`)}this._setupConnectionHandlers()}}endpointURL(){return this._appendParams(this.endPoint,Object.assign({},this.params,{vsn:this.vsn}))}disconnect(e,t){if(!this.isDisconnecting())if(this._setConnectionState("disconnecting",!0),this.conn){const s=setTimeout(()=>{this._setConnectionState("disconnected")},100);this.conn.onclose=()=>{clearTimeout(s),this._setConnectionState("disconnected")},typeof this.conn.close=="function"&&(e?this.conn.close(e,t??""):this.conn.close()),this._teardownConnection()}else this._setConnectionState("disconnected")}getChannels(){return this.channels}async removeChannel(e){const t=await e.unsubscribe();return this.channels.length===0&&this.disconnect(),t}async removeAllChannels(){const e=await Promise.all(this.channels.map(t=>t.unsubscribe()));return this.channels=[],this.disconnect(),e}log(e,t,s){this.logger(e,t,s)}connectionState(){switch(this.conn&&this.conn.readyState){case oe.connecting:return me.Connecting;case oe.open:return me.Open;case oe.closing:return me.Closing;default:return me.Closed}}isConnected(){return this.connectionState()===me.Open}isConnecting(){return this._connectionState==="connecting"}isDisconnecting(){return this._connectionState==="disconnecting"}channel(e,t={config:{}}){const s=`realtime:${e}`,n=this.getChannels().find(r=>r.topic===s);if(n)return n;{const r=new Ae(`realtime:${e}`,t,this);return this.channels.push(r),r}}push(e){const{topic:t,event:s,payload:n,ref:r}=e,i=()=>{this.encode(e,o=>{var l;(l=this.conn)===null||l===void 0||l.send(o)})};this.log("push",`${t} ${s} (${r})`,n),this.isConnected()?i():this.sendBuffer.push(i)}async setAuth(e=null){this._authPromise=this._performAuth(e);try{await this._authPromise}finally{this._authPromise=null}}_isManualToken(){return this._manuallySetToken}async sendHeartbeat(){var e;if(!this.isConnected()){try{this.heartbeatCallback("disconnected")}catch(t){this.log("error","error in heartbeat callback",t)}return}if(this.pendingHeartbeatRef){this.pendingHeartbeatRef=null,this._heartbeatSentAt=null,this.log("transport","heartbeat timeout. Attempting to re-establish connection");try{this.heartbeatCallback("timeout")}catch(t){this.log("error","error in heartbeat callback",t)}this._wasManualDisconnect=!1,(e=this.conn)===null||e===void 0||e.close(rs,"heartbeat timeout"),setTimeout(()=>{var t;this.isConnected()||(t=this.reconnectTimer)===null||t===void 0||t.scheduleTimeout()},Ve.HEARTBEAT_TIMEOUT_FALLBACK);return}this._heartbeatSentAt=Date.now(),this.pendingHeartbeatRef=this._makeRef(),this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:this.pendingHeartbeatRef});try{this.heartbeatCallback("sent")}catch(t){this.log("error","error in heartbeat callback",t)}this._setAuthSafely("heartbeat")}onHeartbeat(e){this.heartbeatCallback=e}flushSendBuffer(){this.isConnected()&&this.sendBuffer.length>0&&(this.sendBuffer.forEach(e=>e()),this.sendBuffer=[])}_makeRef(){let e=this.ref+1;return e===this.ref?this.ref=0:this.ref=e,this.ref.toString()}_leaveOpenTopic(e){let t=this.channels.find(s=>s.topic===e&&(s._isJoined()||s._isJoining()));t&&(this.log("transport",`leaving duplicate topic "${e}"`),t.unsubscribe())}_remove(e){this.channels=this.channels.filter(t=>t.topic!==e.topic)}_onConnMessage(e){this.decode(e.data,t=>{if(t.topic==="phoenix"&&t.event==="phx_reply"&&t.ref&&t.ref===this.pendingHeartbeatRef){const d=this._heartbeatSentAt?Date.now()-this._heartbeatSentAt:void 0;try{this.heartbeatCallback(t.payload.status==="ok"?"ok":"error",d)}catch(c){this.log("error","error in heartbeat callback",c)}this._heartbeatSentAt=null,this.pendingHeartbeatRef=null}const{topic:s,event:n,payload:r,ref:i}=t,o=i?`(${i})`:"",l=r.status||"";this.log("receive",`${l} ${s} ${n} ${o}`.trim(),r),this.channels.filter(d=>d._isMember(s)).forEach(d=>d._trigger(n,r,i)),this._triggerStateCallbacks("message",t)})}_clearTimer(e){var t;e==="heartbeat"&&this.heartbeatTimer?(clearInterval(this.heartbeatTimer),this.heartbeatTimer=void 0):e==="reconnect"&&((t=this.reconnectTimer)===null||t===void 0||t.reset())}_clearAllTimers(){this._clearTimer("heartbeat"),this._clearTimer("reconnect")}_setupConnectionHandlers(){this.conn&&("binaryType"in this.conn&&(this.conn.binaryType="arraybuffer"),this.conn.onopen=()=>this._onConnOpen(),this.conn.onerror=e=>this._onConnError(e),this.conn.onmessage=e=>this._onConnMessage(e),this.conn.onclose=e=>this._onConnClose(e),this.conn.readyState===oe.open&&this._onConnOpen())}_teardownConnection(){if(this.conn){if(this.conn.readyState===oe.open||this.conn.readyState===oe.connecting)try{this.conn.close()}catch(e){this.log("error","Error closing connection",e)}this.conn.onopen=null,this.conn.onerror=null,this.conn.onmessage=null,this.conn.onclose=null,this.conn=null}this._clearAllTimers(),this._terminateWorker(),this.channels.forEach(e=>e.teardown())}_onConnOpen(){this._setConnectionState("connected"),this.log("transport",`connected to ${this.endpointURL()}`),(this._authPromise||(this.accessToken&&!this.accessTokenValue?this.setAuth():Promise.resolve())).then(()=>{this.flushSendBuffer()}).catch(t=>{this.log("error","error waiting for auth on connect",t),this.flushSendBuffer()}),this._clearTimer("reconnect"),this.worker?this.workerRef||this._startWorkerHeartbeat():this._startHeartbeat(),this._triggerStateCallbacks("open")}_startHeartbeat(){this.heartbeatTimer&&clearInterval(this.heartbeatTimer),this.heartbeatTimer=setInterval(()=>this.sendHeartbeat(),this.heartbeatIntervalMs)}_startWorkerHeartbeat(){this.workerUrl?this.log("worker",`starting worker for from ${this.workerUrl}`):this.log("worker","starting default worker");const e=this._workerObjectUrl(this.workerUrl);this.workerRef=new Worker(e),this.workerRef.onerror=t=>{this.log("worker","worker error",t.message),this._terminateWorker()},this.workerRef.onmessage=t=>{t.data.event==="keepAlive"&&this.sendHeartbeat()},this.workerRef.postMessage({event:"start",interval:this.heartbeatIntervalMs})}_terminateWorker(){this.workerRef&&(this.log("worker","terminating worker"),this.workerRef.terminate(),this.workerRef=void 0)}_onConnClose(e){var t;this._setConnectionState("disconnected"),this.log("transport","close",e),this._triggerChanError(),this._clearTimer("heartbeat"),this._wasManualDisconnect||(t=this.reconnectTimer)===null||t===void 0||t.scheduleTimeout(),this._triggerStateCallbacks("close",e)}_onConnError(e){this._setConnectionState("disconnected"),this.log("transport",`${e}`),this._triggerChanError(),this._triggerStateCallbacks("error",e);try{this.heartbeatCallback("error")}catch(t){this.log("error","error in heartbeat callback",t)}}_triggerChanError(){this.channels.forEach(e=>e._trigger(ee.error))}_appendParams(e,t){if(Object.keys(t).length===0)return e;const s=e.match(/\?/)?"&":"?",n=new URLSearchParams(t);return`${e}${s}${n}`}_workerObjectUrl(e){let t;if(e)t=e;else{const s=new Blob([ys],{type:"application/javascript"});t=URL.createObjectURL(s)}return t}_setConnectionState(e,t=!1){this._connectionState=e,e==="connecting"?this._wasManualDisconnect=!1:e==="disconnecting"&&(this._wasManualDisconnect=t)}async _performAuth(e=null){let t,s=!1;if(e)t=e,s=!0;else if(this.accessToken)try{t=await this.accessToken()}catch(n){this.log("error","Error fetching access token from callback",n),t=this.accessTokenValue}else t=this.accessTokenValue;s?this._manuallySetToken=!0:this.accessToken&&(this._manuallySetToken=!1),this.accessTokenValue!=t&&(this.accessTokenValue=t,this.channels.forEach(n=>{const r={access_token:t,version:ss};t&&n.updateJoinPayload(r),n.joinedOnce&&n._isJoined()&&n._push(ee.access_token,{access_token:t})}))}async _waitForAuthIfNeeded(){this._authPromise&&await this._authPromise}_setAuthSafely(e="general"){this._isManualToken()||this.setAuth().catch(t=>{this.log("error",`Error setting auth in ${e}`,t)})}_triggerStateCallbacks(e,t){try{this.stateChangeCallbacks[e].forEach(s=>{try{s(t)}catch(n){this.log("error",`error in ${e} callback`,n)}})}catch(s){this.log("error",`error triggering ${e} callbacks`,s)}}_setupReconnectionTimer(){this.reconnectTimer=new va(async()=>{setTimeout(async()=>{await this._waitForAuthIfNeeded(),this.isConnected()||this.connect()},Ve.RECONNECT_DELAY)},this.reconnectAfterMs)}_initializeOptions(e){var t,s,n,r,i,o,l,d,c,p,u,h;switch(this.transport=(t=e?.transport)!==null&&t!==void 0?t:null,this.timeout=(s=e?.timeout)!==null&&s!==void 0?s:xt,this.heartbeatIntervalMs=(n=e?.heartbeatIntervalMs)!==null&&n!==void 0?n:Ve.HEARTBEAT_INTERVAL,this.worker=(r=e?.worker)!==null&&r!==void 0?r:!1,this.accessToken=(i=e?.accessToken)!==null&&i!==void 0?i:null,this.heartbeatCallback=(o=e?.heartbeatCallback)!==null&&o!==void 0?o:ut,this.vsn=(l=e?.vsn)!==null&&l!==void 0?l:Bt,e?.params&&(this.params=e.params),e?.logger&&(this.logger=e.logger),(e?.logLevel||e?.log_level)&&(this.logLevel=e.logLevel||e.log_level,this.params=Object.assign(Object.assign({},this.params),{log_level:this.logLevel})),this.reconnectAfterMs=(d=e?.reconnectAfterMs)!==null&&d!==void 0?d:(m=>ms[m-1]||gs),this.vsn){case ns:this.encode=(c=e?.encode)!==null&&c!==void 0?c:((m,g)=>g(JSON.stringify(m))),this.decode=(p=e?.decode)!==null&&p!==void 0?p:((m,g)=>g(JSON.parse(m)));break;case ya:this.encode=(u=e?.encode)!==null&&u!==void 0?u:this.serializer.encode.bind(this.serializer),this.decode=(h=e?.decode)!==null&&h!==void 0?h:this.serializer.decode.bind(this.serializer);break;default:throw new Error(`Unsupported serializer version: ${this.vsn}`)}if(this.worker){if(typeof window<"u"&&!window.Worker)throw new Error("Web Worker is not supported");this.workerUrl=e?.workerUrl}}}var Ue=class extends Error{constructor(a,e){super(a),this.name="IcebergError",this.status=e.status,this.icebergType=e.icebergType,this.icebergCode=e.icebergCode,this.details=e.details,this.isCommitStateUnknown=e.icebergType==="CommitStateUnknownException"||[500,502,504].includes(e.status)&&e.icebergType?.includes("CommitState")===!0}isNotFound(){return this.status===404}isConflict(){return this.status===409}isAuthenticationTimeout(){return this.status===419}};function fs(a,e,t){const s=new URL(e,a);if(t)for(const[n,r]of Object.entries(t))r!==void 0&&s.searchParams.set(n,r);return s.toString()}async function bs(a){return!a||a.type==="none"?{}:a.type==="bearer"?{Authorization:`Bearer ${a.token}`}:a.type==="header"?{[a.name]:a.value}:a.type==="custom"?await a.getHeaders():{}}function ws(a){const e=a.fetchImpl??globalThis.fetch;return{async request({method:t,path:s,query:n,body:r,headers:i}){const o=fs(a.baseUrl,s,n),l=await bs(a.auth),d=await e(o,{method:t,headers:{...r?{"Content-Type":"application/json"}:{},...l,...i},body:r?JSON.stringify(r):void 0}),c=await d.text(),p=(d.headers.get("content-type")||"").includes("application/json"),u=p&&c?JSON.parse(c):c;if(!d.ok){const h=p?u:void 0,m=h?.error;throw new Ue(m?.message??`Request failed with status ${d.status}`,{status:d.status,icebergType:m?.type,icebergCode:m?.code,details:h})}return{status:d.status,headers:d.headers,data:u}}}}function Ke(a){return a.join("")}var _s=class{constructor(a,e=""){this.client=a,this.prefix=e}async listNamespaces(a){const e=a?{parent:Ke(a.namespace)}:void 0;return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces`,query:e})).data.namespaces.map(s=>({namespace:s}))}async createNamespace(a,e){const t={namespace:a.namespace,properties:e?.properties};return(await this.client.request({method:"POST",path:`${this.prefix}/namespaces`,body:t})).data}async dropNamespace(a){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${Ke(a.namespace)}`})}async loadNamespaceMetadata(a){return{properties:(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${Ke(a.namespace)}`})).data.properties}}async namespaceExists(a){try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${Ke(a.namespace)}`}),!0}catch(e){if(e instanceof Ue&&e.status===404)return!1;throw e}}async createNamespaceIfNotExists(a,e){try{return await this.createNamespace(a,e)}catch(t){if(t instanceof Ue&&t.status===409)return;throw t}}};function fe(a){return a.join("")}var xs=class{constructor(a,e="",t){this.client=a,this.prefix=e,this.accessDelegation=t}async listTables(a){return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${fe(a.namespace)}/tables`})).data.identifiers}async createTable(a,e){const t={};return this.accessDelegation&&(t["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${fe(a.namespace)}/tables`,body:e,headers:t})).data.metadata}async updateTable(a,e){const t=await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${fe(a.namespace)}/tables/${a.name}`,body:e});return{"metadata-location":t.data["metadata-location"],metadata:t.data.metadata}}async dropTable(a,e){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${fe(a.namespace)}/tables/${a.name}`,query:{purgeRequested:String(e?.purge??!1)}})}async loadTable(a){const e={};return this.accessDelegation&&(e["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${fe(a.namespace)}/tables/${a.name}`,headers:e})).data.metadata}async tableExists(a){const e={};this.accessDelegation&&(e["X-Iceberg-Access-Delegation"]=this.accessDelegation);try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${fe(a.namespace)}/tables/${a.name}`,headers:e}),!0}catch(t){if(t instanceof Ue&&t.status===404)return!1;throw t}}async createTableIfNotExists(a,e){try{return await this.createTable(a,e)}catch(t){if(t instanceof Ue&&t.status===409)return await this.loadTable({namespace:a.namespace,name:e.name});throw t}}},Ss=class{constructor(a){let e="v1";a.catalogName&&(e+=`/${a.catalogName}`);const t=a.baseUrl.endsWith("/")?a.baseUrl:`${a.baseUrl}/`;this.client=ws({baseUrl:t,auth:a.auth,fetchImpl:a.fetch}),this.accessDelegation=a.accessDelegation?.join(","),this.namespaceOps=new _s(this.client,e),this.tableOps=new xs(this.client,e,this.accessDelegation)}async listNamespaces(a){return this.namespaceOps.listNamespaces(a)}async createNamespace(a,e){return this.namespaceOps.createNamespace(a,e)}async dropNamespace(a){await this.namespaceOps.dropNamespace(a)}async loadNamespaceMetadata(a){return this.namespaceOps.loadNamespaceMetadata(a)}async listTables(a){return this.tableOps.listTables(a)}async createTable(a,e){return this.tableOps.createTable(a,e)}async updateTable(a,e){return this.tableOps.updateTable(a,e)}async dropTable(a,e){await this.tableOps.dropTable(a,e)}async loadTable(a){return this.tableOps.loadTable(a)}async namespaceExists(a){return this.namespaceOps.namespaceExists(a)}async tableExists(a){return this.tableOps.tableExists(a)}async createNamespaceIfNotExists(a,e){return this.namespaceOps.createNamespaceIfNotExists(a,e)}async createTableIfNotExists(a,e){return this.tableOps.createTableIfNotExists(a,e)}},it=class extends Error{constructor(a,e="storage",t,s){super(a),this.__isStorageError=!0,this.namespace=e,this.name=e==="vectors"?"StorageVectorsError":"StorageError",this.status=t,this.statusCode=s}};function ot(a){return typeof a=="object"&&a!==null&&"__isStorageError"in a}var Je=class extends it{constructor(a,e,t,s="storage"){super(a,s,e,t),this.name=s==="vectors"?"StorageVectorsApiError":"StorageApiError",this.status=e,this.statusCode=t}toJSON(){return{name:this.name,message:this.message,status:this.status,statusCode:this.statusCode}}},wa=class extends it{constructor(a,e,t="storage"){super(a,t),this.name=t==="vectors"?"StorageVectorsUnknownError":"StorageUnknownError",this.originalError=e}};const ks=a=>a?(...e)=>a(...e):(...e)=>fetch(...e),Es=a=>{if(typeof a!="object"||a===null)return!1;const e=Object.getPrototypeOf(a);return(e===null||e===Object.prototype||Object.getPrototypeOf(e)===null)&&!(Symbol.toStringTag in a)&&!(Symbol.iterator in a)},Et=a=>{if(Array.isArray(a))return a.map(t=>Et(t));if(typeof a=="function"||a!==Object(a))return a;const e={};return Object.entries(a).forEach(([t,s])=>{const n=t.replace(/([-_][a-z])/gi,r=>r.toUpperCase().replace(/[-_]/g,""));e[n]=Et(s)}),e},$s=a=>!a||typeof a!="string"||a.length===0||a.length>100||a.trim()!==a||a.includes("/")||a.includes("\\")?!1:/^[\w!.\*'() &$@=;:+,?-]+$/.test(a);function Ne(a){"@babel/helpers - typeof";return Ne=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Ne(a)}function Ts(a,e){if(Ne(a)!="object"||!a)return a;var t=a[Symbol.toPrimitive];if(t!==void 0){var s=t.call(a,e);if(Ne(s)!="object")return s;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(a)}function As(a){var e=Ts(a,"string");return Ne(e)=="symbol"?e:e+""}function Ds(a,e,t){return(e=As(e))in a?Object.defineProperty(a,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):a[e]=t,a}function Wt(a,e){var t=Object.keys(a);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(a);e&&(s=s.filter(function(n){return Object.getOwnPropertyDescriptor(a,n).enumerable})),t.push.apply(t,s)}return t}function $(a){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?Wt(Object(t),!0).forEach(function(s){Ds(a,s,t[s])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(t)):Wt(Object(t)).forEach(function(s){Object.defineProperty(a,s,Object.getOwnPropertyDescriptor(t,s))})}return a}const Vt=a=>{var e;return a.msg||a.message||a.error_description||(typeof a.error=="string"?a.error:(e=a.error)===null||e===void 0?void 0:e.message)||JSON.stringify(a)},Cs=async(a,e,t,s)=>{if(a&&typeof a=="object"&&"status"in a&&"ok"in a&&typeof a.status=="number"&&!t?.noResolveJson){const n=a,r=n.status||500;if(typeof n.json=="function")n.json().then(i=>{const o=i?.statusCode||i?.code||r+"";e(new Je(Vt(i),r,o,s))}).catch(()=>{if(s==="vectors"){const i=r+"";e(new Je(n.statusText||`HTTP ${r} error`,r,i,s))}else{const i=r+"";e(new Je(n.statusText||`HTTP ${r} error`,r,i,s))}});else{const i=r+"";e(new Je(n.statusText||`HTTP ${r} error`,r,i,s))}}else e(new wa(Vt(a),a,s))},Ls=(a,e,t,s)=>{const n={method:a,headers:e?.headers||{}};return a==="GET"||a==="HEAD"||!s?$($({},n),t):(Es(s)?(n.headers=$({"Content-Type":"application/json"},e?.headers),n.body=JSON.stringify(s)):n.body=s,e?.duplex&&(n.duplex=e.duplex),$($({},n),t))};async function Oe(a,e,t,s,n,r,i){return new Promise((o,l)=>{a(t,Ls(e,s,n,r)).then(d=>{if(!d.ok)throw d;if(s?.noResolveJson)return d;if(i==="vectors"){const c=d.headers.get("content-type");if(d.headers.get("content-length")==="0"||d.status===204)return{};if(!c||!c.includes("application/json"))return{}}return d.json()}).then(d=>o(d)).catch(d=>Cs(d,l,s,i))})}function _a(a="storage"){return{get:async(e,t,s,n)=>Oe(e,"GET",t,s,n,void 0,a),post:async(e,t,s,n,r)=>Oe(e,"POST",t,n,r,s,a),put:async(e,t,s,n,r)=>Oe(e,"PUT",t,n,r,s,a),head:async(e,t,s,n)=>Oe(e,"HEAD",t,$($({},s),{},{noResolveJson:!0}),n,void 0,a),remove:async(e,t,s,n,r)=>Oe(e,"DELETE",t,n,r,s,a)}}const Os=_a("storage"),{get:He,post:Z,put:$t,head:Ps,remove:qt}=Os,K=_a("vectors");var Ce=class{constructor(a,e={},t,s="storage"){this.shouldThrowOnError=!1,this.url=a,this.headers=e,this.fetch=ks(t),this.namespace=s}throwOnError(){return this.shouldThrowOnError=!0,this}setHeader(a,e){return this.headers=$($({},this.headers),{},{[a]:e}),this}async handleOperation(a){var e=this;try{return{data:await a(),error:null}}catch(t){if(e.shouldThrowOnError)throw t;if(ot(t))return{data:null,error:t};throw t}}},Rs=class{constructor(a,e){this.downloadFn=a,this.shouldThrowOnError=e}then(a,e){return this.execute().then(a,e)}async execute(){var a=this;try{return{data:(await a.downloadFn()).body,error:null}}catch(e){if(a.shouldThrowOnError)throw e;if(ot(e))return{data:null,error:e};throw e}}};let xa;xa=Symbol.toStringTag;var Is=class{constructor(a,e){this.downloadFn=a,this.shouldThrowOnError=e,this[xa]="BlobDownloadBuilder",this.promise=null}asStream(){return new Rs(this.downloadFn,this.shouldThrowOnError)}then(a,e){return this.getPromise().then(a,e)}catch(a){return this.getPromise().catch(a)}finally(a){return this.getPromise().finally(a)}getPromise(){return this.promise||(this.promise=this.execute()),this.promise}async execute(){var a=this;try{return{data:await(await a.downloadFn()).blob(),error:null}}catch(e){if(a.shouldThrowOnError)throw e;if(ot(e))return{data:null,error:e};throw e}}};const js={limit:100,offset:0,sortBy:{column:"name",order:"asc"}},Kt={cacheControl:"3600",contentType:"text/plain;charset=UTF-8",upsert:!1};var qs=class extends Ce{constructor(a,e={},t,s){super(a,e,s,"storage"),this.bucketId=t}async uploadOrUpdate(a,e,t,s){var n=this;return n.handleOperation(async()=>{let r;const i=$($({},Kt),s);let o=$($({},n.headers),a==="POST"&&{"x-upsert":String(i.upsert)});const l=i.metadata;typeof Blob<"u"&&t instanceof Blob?(r=new FormData,r.append("cacheControl",i.cacheControl),l&&r.append("metadata",n.encodeMetadata(l)),r.append("",t)):typeof FormData<"u"&&t instanceof FormData?(r=t,r.has("cacheControl")||r.append("cacheControl",i.cacheControl),l&&!r.has("metadata")&&r.append("metadata",n.encodeMetadata(l))):(r=t,o["cache-control"]=`max-age=${i.cacheControl}`,o["content-type"]=i.contentType,l&&(o["x-metadata"]=n.toBase64(n.encodeMetadata(l))),(typeof ReadableStream<"u"&&r instanceof ReadableStream||r&&typeof r=="object"&&"pipe"in r&&typeof r.pipe=="function")&&!i.duplex&&(i.duplex="half")),s?.headers&&(o=$($({},o),s.headers));const d=n._removeEmptyFolders(e),c=n._getFinalPath(d),p=await(a=="PUT"?$t:Z)(n.fetch,`${n.url}/object/${c}`,r,$({headers:o},i?.duplex?{duplex:i.duplex}:{}));return{path:d,id:p.Id,fullPath:p.Key}})}async upload(a,e,t){return this.uploadOrUpdate("POST",a,e,t)}async uploadToSignedUrl(a,e,t,s){var n=this;const r=n._removeEmptyFolders(a),i=n._getFinalPath(r),o=new URL(n.url+`/object/upload/sign/${i}`);return o.searchParams.set("token",e),n.handleOperation(async()=>{let l;const d=$({upsert:Kt.upsert},s),c=$($({},n.headers),{"x-upsert":String(d.upsert)});return typeof Blob<"u"&&t instanceof Blob?(l=new FormData,l.append("cacheControl",d.cacheControl),l.append("",t)):typeof FormData<"u"&&t instanceof FormData?(l=t,l.append("cacheControl",d.cacheControl)):(l=t,c["cache-control"]=`max-age=${d.cacheControl}`,c["content-type"]=d.contentType),{path:r,fullPath:(await $t(n.fetch,o.toString(),l,{headers:c})).Key}})}async createSignedUploadUrl(a,e){var t=this;return t.handleOperation(async()=>{let s=t._getFinalPath(a);const n=$({},t.headers);e?.upsert&&(n["x-upsert"]="true");const r=await Z(t.fetch,`${t.url}/object/upload/sign/${s}`,{},{headers:n}),i=new URL(t.url+r.url),o=i.searchParams.get("token");if(!o)throw new it("No token returned by API");return{signedUrl:i.toString(),path:a,token:o}})}async update(a,e,t){return this.uploadOrUpdate("PUT",a,e,t)}async move(a,e,t){var s=this;return s.handleOperation(async()=>await Z(s.fetch,`${s.url}/object/move`,{bucketId:s.bucketId,sourceKey:a,destinationKey:e,destinationBucket:t?.destinationBucket},{headers:s.headers}))}async copy(a,e,t){var s=this;return s.handleOperation(async()=>({path:(await Z(s.fetch,`${s.url}/object/copy`,{bucketId:s.bucketId,sourceKey:a,destinationKey:e,destinationBucket:t?.destinationBucket},{headers:s.headers})).Key}))}async createSignedUrl(a,e,t){var s=this;return s.handleOperation(async()=>{let n=s._getFinalPath(a),r=await Z(s.fetch,`${s.url}/object/sign/${n}`,$({expiresIn:e},t?.transform?{transform:t.transform}:{}),{headers:s.headers});const i=t?.download?`&download=${t.download===!0?"":t.download}`:"";return{signedUrl:encodeURI(`${s.url}${r.signedURL}${i}`)}})}async createSignedUrls(a,e,t){var s=this;return s.handleOperation(async()=>{const n=await Z(s.fetch,`${s.url}/object/sign/${s.bucketId}`,{expiresIn:e,paths:a},{headers:s.headers}),r=t?.download?`&download=${t.download===!0?"":t.download}`:"";return n.map(i=>$($({},i),{},{signedUrl:i.signedURL?encodeURI(`${s.url}${i.signedURL}${r}`):null}))})}download(a,e,t){const s=typeof e?.transform<"u"?"render/image/authenticated":"object",n=this.transformOptsToQueryString(e?.transform||{}),r=n?`?${n}`:"",i=this._getFinalPath(a),o=()=>He(this.fetch,`${this.url}/${s}/${i}${r}`,{headers:this.headers,noResolveJson:!0},t);return new Is(o,this.shouldThrowOnError)}async info(a){var e=this;const t=e._getFinalPath(a);return e.handleOperation(async()=>Et(await He(e.fetch,`${e.url}/object/info/${t}`,{headers:e.headers})))}async exists(a){var e=this;const t=e._getFinalPath(a);try{return await Ps(e.fetch,`${e.url}/object/${t}`,{headers:e.headers}),{data:!0,error:null}}catch(s){if(e.shouldThrowOnError)throw s;if(ot(s)&&s instanceof wa){const n=s.originalError;if([400,404].includes(n?.status))return{data:!1,error:s}}throw s}}getPublicUrl(a,e){const t=this._getFinalPath(a),s=[],n=e?.download?`download=${e.download===!0?"":e.download}`:"";n!==""&&s.push(n);const r=typeof e?.transform<"u"?"render/image":"object",i=this.transformOptsToQueryString(e?.transform||{});i!==""&&s.push(i);let o=s.join("&");return o!==""&&(o=`?${o}`),{data:{publicUrl:encodeURI(`${this.url}/${r}/public/${t}${o}`)}}}async remove(a){var e=this;return e.handleOperation(async()=>await qt(e.fetch,`${e.url}/object/${e.bucketId}`,{prefixes:a},{headers:e.headers}))}async list(a,e,t){var s=this;return s.handleOperation(async()=>{const n=$($($({},js),e),{},{prefix:a||""});return await Z(s.fetch,`${s.url}/object/list/${s.bucketId}`,n,{headers:s.headers},t)})}async listV2(a,e){var t=this;return t.handleOperation(async()=>{const s=$({},a);return await Z(t.fetch,`${t.url}/object/list-v2/${t.bucketId}`,s,{headers:t.headers},e)})}encodeMetadata(a){return JSON.stringify(a)}toBase64(a){return typeof Buffer<"u"?Buffer.from(a).toString("base64"):btoa(a)}_getFinalPath(a){return`${this.bucketId}/${a.replace(/^\/+/,"")}`}_removeEmptyFolders(a){return a.replace(/^\/|\/$/g,"").replace(/\/+/g,"/")}transformOptsToQueryString(a){const e=[];return a.width&&e.push(`width=${a.width}`),a.height&&e.push(`height=${a.height}`),a.resize&&e.push(`resize=${a.resize}`),a.format&&e.push(`format=${a.format}`),a.quality&&e.push(`quality=${a.quality}`),e.join("&")}};const Ms="2.97.0",Ge={"X-Client-Info":`storage-js/${Ms}`};var Us=class extends Ce{constructor(a,e={},t,s){const n=new URL(a);s?.useNewHostname&&/supabase\.(co|in|red)$/.test(n.hostname)&&!n.hostname.includes("storage.supabase.")&&(n.hostname=n.hostname.replace("supabase.","storage.supabase."));const r=n.href.replace(/\/$/,""),i=$($({},Ge),e);super(r,i,t,"storage")}async listBuckets(a){var e=this;return e.handleOperation(async()=>{const t=e.listBucketOptionsToQueryString(a);return await He(e.fetch,`${e.url}/bucket${t}`,{headers:e.headers})})}async getBucket(a){var e=this;return e.handleOperation(async()=>await He(e.fetch,`${e.url}/bucket/${a}`,{headers:e.headers}))}async createBucket(a,e={public:!1}){var t=this;return t.handleOperation(async()=>await Z(t.fetch,`${t.url}/bucket`,{id:a,name:a,type:e.type,public:e.public,file_size_limit:e.fileSizeLimit,allowed_mime_types:e.allowedMimeTypes},{headers:t.headers}))}async updateBucket(a,e){var t=this;return t.handleOperation(async()=>await $t(t.fetch,`${t.url}/bucket/${a}`,{id:a,name:a,public:e.public,file_size_limit:e.fileSizeLimit,allowed_mime_types:e.allowedMimeTypes},{headers:t.headers}))}async emptyBucket(a){var e=this;return e.handleOperation(async()=>await Z(e.fetch,`${e.url}/bucket/${a}/empty`,{},{headers:e.headers}))}async deleteBucket(a){var e=this;return e.handleOperation(async()=>await qt(e.fetch,`${e.url}/bucket/${a}`,{},{headers:e.headers}))}listBucketOptionsToQueryString(a){const e={};return a&&("limit"in a&&(e.limit=String(a.limit)),"offset"in a&&(e.offset=String(a.offset)),a.search&&(e.search=a.search),a.sortColumn&&(e.sortColumn=a.sortColumn),a.sortOrder&&(e.sortOrder=a.sortOrder)),Object.keys(e).length>0?"?"+new URLSearchParams(e).toString():""}},Ns=class extends Ce{constructor(a,e={},t){const s=a.replace(/\/$/,""),n=$($({},Ge),e);super(s,n,t,"storage")}async createBucket(a){var e=this;return e.handleOperation(async()=>await Z(e.fetch,`${e.url}/bucket`,{name:a},{headers:e.headers}))}async listBuckets(a){var e=this;return e.handleOperation(async()=>{const t=new URLSearchParams;a?.limit!==void 0&&t.set("limit",a.limit.toString()),a?.offset!==void 0&&t.set("offset",a.offset.toString()),a?.sortColumn&&t.set("sortColumn",a.sortColumn),a?.sortOrder&&t.set("sortOrder",a.sortOrder),a?.search&&t.set("search",a.search);const s=t.toString(),n=s?`${e.url}/bucket?${s}`:`${e.url}/bucket`;return await He(e.fetch,n,{headers:e.headers})})}async deleteBucket(a){var e=this;return e.handleOperation(async()=>await qt(e.fetch,`${e.url}/bucket/${a}`,{},{headers:e.headers}))}from(a){var e=this;if(!$s(a))throw new it("Invalid bucket name: File, folder, and bucket names must follow AWS object key naming guidelines and should avoid the use of any other characters.");const t=new Ss({baseUrl:this.url,catalogName:a,auth:{type:"custom",getHeaders:async()=>e.headers},fetch:this.fetch}),s=this.shouldThrowOnError;return new Proxy(t,{get(n,r){const i=n[r];return typeof i!="function"?i:async(...o)=>{try{return{data:await i.apply(n,o),error:null}}catch(l){if(s)throw l;return{data:null,error:l}}}}})}},Hs=class extends Ce{constructor(a,e={},t){const s=a.replace(/\/$/,""),n=$($({},Ge),{},{"Content-Type":"application/json"},e);super(s,n,t,"vectors")}async createIndex(a){var e=this;return e.handleOperation(async()=>await K.post(e.fetch,`${e.url}/CreateIndex`,a,{headers:e.headers})||{})}async getIndex(a,e){var t=this;return t.handleOperation(async()=>await K.post(t.fetch,`${t.url}/GetIndex`,{vectorBucketName:a,indexName:e},{headers:t.headers}))}async listIndexes(a){var e=this;return e.handleOperation(async()=>await K.post(e.fetch,`${e.url}/ListIndexes`,a,{headers:e.headers}))}async deleteIndex(a,e){var t=this;return t.handleOperation(async()=>await K.post(t.fetch,`${t.url}/DeleteIndex`,{vectorBucketName:a,indexName:e},{headers:t.headers})||{})}},Bs=class extends Ce{constructor(a,e={},t){const s=a.replace(/\/$/,""),n=$($({},Ge),{},{"Content-Type":"application/json"},e);super(s,n,t,"vectors")}async putVectors(a){var e=this;if(a.vectors.length<1||a.vectors.length>500)throw new Error("Vector batch size must be between 1 and 500 items");return e.handleOperation(async()=>await K.post(e.fetch,`${e.url}/PutVectors`,a,{headers:e.headers})||{})}async getVectors(a){var e=this;return e.handleOperation(async()=>await K.post(e.fetch,`${e.url}/GetVectors`,a,{headers:e.headers}))}async listVectors(a){var e=this;if(a.segmentCount!==void 0){if(a.segmentCount<1||a.segmentCount>16)throw new Error("segmentCount must be between 1 and 16");if(a.segmentIndex!==void 0&&(a.segmentIndex<0||a.segmentIndex>=a.segmentCount))throw new Error(`segmentIndex must be between 0 and ${a.segmentCount-1}`)}return e.handleOperation(async()=>await K.post(e.fetch,`${e.url}/ListVectors`,a,{headers:e.headers}))}async queryVectors(a){var e=this;return e.handleOperation(async()=>await K.post(e.fetch,`${e.url}/QueryVectors`,a,{headers:e.headers}))}async deleteVectors(a){var e=this;if(a.keys.length<1||a.keys.length>500)throw new Error("Keys batch size must be between 1 and 500 items");return e.handleOperation(async()=>await K.post(e.fetch,`${e.url}/DeleteVectors`,a,{headers:e.headers})||{})}},zs=class extends Ce{constructor(a,e={},t){const s=a.replace(/\/$/,""),n=$($({},Ge),{},{"Content-Type":"application/json"},e);super(s,n,t,"vectors")}async createBucket(a){var e=this;return e.handleOperation(async()=>await K.post(e.fetch,`${e.url}/CreateVectorBucket`,{vectorBucketName:a},{headers:e.headers})||{})}async getBucket(a){var e=this;return e.handleOperation(async()=>await K.post(e.fetch,`${e.url}/GetVectorBucket`,{vectorBucketName:a},{headers:e.headers}))}async listBuckets(a={}){var e=this;return e.handleOperation(async()=>await K.post(e.fetch,`${e.url}/ListVectorBuckets`,a,{headers:e.headers}))}async deleteBucket(a){var e=this;return e.handleOperation(async()=>await K.post(e.fetch,`${e.url}/DeleteVectorBucket`,{vectorBucketName:a},{headers:e.headers})||{})}},Fs=class extends zs{constructor(a,e={}){super(a,e.headers||{},e.fetch)}from(a){return new Gs(this.url,this.headers,a,this.fetch)}async createBucket(a){var e=()=>super.createBucket,t=this;return e().call(t,a)}async getBucket(a){var e=()=>super.getBucket,t=this;return e().call(t,a)}async listBuckets(a={}){var e=()=>super.listBuckets,t=this;return e().call(t,a)}async deleteBucket(a){var e=()=>super.deleteBucket,t=this;return e().call(t,a)}},Gs=class extends Hs{constructor(a,e,t,s){super(a,e,s),this.vectorBucketName=t}async createIndex(a){var e=()=>super.createIndex,t=this;return e().call(t,$($({},a),{},{vectorBucketName:t.vectorBucketName}))}async listIndexes(a={}){var e=()=>super.listIndexes,t=this;return e().call(t,$($({},a),{},{vectorBucketName:t.vectorBucketName}))}async getIndex(a){var e=()=>super.getIndex,t=this;return e().call(t,t.vectorBucketName,a)}async deleteIndex(a){var e=()=>super.deleteIndex,t=this;return e().call(t,t.vectorBucketName,a)}index(a){return new Ws(this.url,this.headers,this.vectorBucketName,a,this.fetch)}},Ws=class extends Bs{constructor(a,e,t,s,n){super(a,e,n),this.vectorBucketName=t,this.indexName=s}async putVectors(a){var e=()=>super.putVectors,t=this;return e().call(t,$($({},a),{},{vectorBucketName:t.vectorBucketName,indexName:t.indexName}))}async getVectors(a){var e=()=>super.getVectors,t=this;return e().call(t,$($({},a),{},{vectorBucketName:t.vectorBucketName,indexName:t.indexName}))}async listVectors(a={}){var e=()=>super.listVectors,t=this;return e().call(t,$($({},a),{},{vectorBucketName:t.vectorBucketName,indexName:t.indexName}))}async queryVectors(a){var e=()=>super.queryVectors,t=this;return e().call(t,$($({},a),{},{vectorBucketName:t.vectorBucketName,indexName:t.indexName}))}async deleteVectors(a){var e=()=>super.deleteVectors,t=this;return e().call(t,$($({},a),{},{vectorBucketName:t.vectorBucketName,indexName:t.indexName}))}},Vs=class extends Us{constructor(a,e={},t,s){super(a,e,t,s)}from(a){return new qs(this.url,this.headers,a,this.fetch)}get vectors(){return new Fs(this.url+"/vector",{headers:this.headers,fetch:this.fetch})}get analytics(){return new Ns(this.url+"/iceberg",this.headers,this.fetch)}};const Sa="2.97.0",$e=30*1e3,Tt=3,pt=Tt*$e,Ks="http://localhost:9999",Js="supabase.auth.token",Ys={"X-Client-Info":`gotrue-js/${Sa}`},At="X-Supabase-Api-Version",ka={"2024-01-01":{timestamp:Date.parse("2024-01-01T00:00:00.0Z"),name:"2024-01-01"}},Xs=/^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i,Qs=600*1e3;class Be extends Error{constructor(e,t,s){super(e),this.__isAuthError=!0,this.name="AuthError",this.status=t,this.code=s}}function x(a){return typeof a=="object"&&a!==null&&"__isAuthError"in a}class Zs extends Be{constructor(e,t,s){super(e,t,s),this.name="AuthApiError",this.status=t,this.code=s}}function en(a){return x(a)&&a.name==="AuthApiError"}class ge extends Be{constructor(e,t){super(e),this.name="AuthUnknownError",this.originalError=t}}class ie extends Be{constructor(e,t,s,n){super(e,s,n),this.name=t,this.status=s}}class V extends ie{constructor(){super("Auth session missing!","AuthSessionMissingError",400,void 0)}}function ht(a){return x(a)&&a.name==="AuthSessionMissingError"}class be extends ie{constructor(){super("Auth session or user missing","AuthInvalidTokenResponseError",500,void 0)}}class Ye extends ie{constructor(e){super(e,"AuthInvalidCredentialsError",400,void 0)}}class Xe extends ie{constructor(e,t=null){super(e,"AuthImplicitGrantRedirectError",500,void 0),this.details=null,this.details=t}toJSON(){return{name:this.name,message:this.message,status:this.status,details:this.details}}}function tn(a){return x(a)&&a.name==="AuthImplicitGrantRedirectError"}class Jt extends ie{constructor(e,t=null){super(e,"AuthPKCEGrantCodeExchangeError",500,void 0),this.details=null,this.details=t}toJSON(){return{name:this.name,message:this.message,status:this.status,details:this.details}}}class an extends ie{constructor(){super("PKCE code verifier not found in storage. This can happen if the auth flow was initiated in a different browser or device, or if the storage was cleared. For SSR frameworks (Next.js, SvelteKit, etc.), use @supabase/ssr on both the server and client to store the code verifier in cookies.","AuthPKCECodeVerifierMissingError",400,"pkce_code_verifier_not_found")}}class Dt extends ie{constructor(e,t){super(e,"AuthRetryableFetchError",t,void 0)}}function mt(a){return x(a)&&a.name==="AuthRetryableFetchError"}class Yt extends ie{constructor(e,t,s){super(e,"AuthWeakPasswordError",t,"weak_password"),this.reasons=s}}class Ct extends ie{constructor(e){super(e,"AuthInvalidJwtError",400,"invalid_jwt")}}const et="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""),Xt=` 	
\r=`.split(""),sn=(()=>{const a=new Array(128);for(let e=0;e<a.length;e+=1)a[e]=-1;for(let e=0;e<Xt.length;e+=1)a[Xt[e].charCodeAt(0)]=-2;for(let e=0;e<et.length;e+=1)a[et[e].charCodeAt(0)]=e;return a})();function Qt(a,e,t){if(a!==null)for(e.queue=e.queue<<8|a,e.queuedBits+=8;e.queuedBits>=6;){const s=e.queue>>e.queuedBits-6&63;t(et[s]),e.queuedBits-=6}else if(e.queuedBits>0)for(e.queue=e.queue<<6-e.queuedBits,e.queuedBits=6;e.queuedBits>=6;){const s=e.queue>>e.queuedBits-6&63;t(et[s]),e.queuedBits-=6}}function Ea(a,e,t){const s=sn[a];if(s>-1)for(e.queue=e.queue<<6|s,e.queuedBits+=6;e.queuedBits>=8;)t(e.queue>>e.queuedBits-8&255),e.queuedBits-=8;else{if(s===-2)return;throw new Error(`Invalid Base64-URL character "${String.fromCharCode(a)}"`)}}function Zt(a){const e=[],t=i=>{e.push(String.fromCodePoint(i))},s={utf8seq:0,codepoint:0},n={queue:0,queuedBits:0},r=i=>{on(i,s,t)};for(let i=0;i<a.length;i+=1)Ea(a.charCodeAt(i),n,r);return e.join("")}function nn(a,e){if(a<=127){e(a);return}else if(a<=2047){e(192|a>>6),e(128|a&63);return}else if(a<=65535){e(224|a>>12),e(128|a>>6&63),e(128|a&63);return}else if(a<=1114111){e(240|a>>18),e(128|a>>12&63),e(128|a>>6&63),e(128|a&63);return}throw new Error(`Unrecognized Unicode codepoint: ${a.toString(16)}`)}function rn(a,e){for(let t=0;t<a.length;t+=1){let s=a.charCodeAt(t);if(s>55295&&s<=56319){const n=(s-55296)*1024&65535;s=(a.charCodeAt(t+1)-56320&65535|n)+65536,t+=1}nn(s,e)}}function on(a,e,t){if(e.utf8seq===0){if(a<=127){t(a);return}for(let s=1;s<6;s+=1)if((a>>7-s&1)===0){e.utf8seq=s;break}if(e.utf8seq===2)e.codepoint=a&31;else if(e.utf8seq===3)e.codepoint=a&15;else if(e.utf8seq===4)e.codepoint=a&7;else throw new Error("Invalid UTF-8 sequence");e.utf8seq-=1}else if(e.utf8seq>0){if(a<=127)throw new Error("Invalid UTF-8 sequence");e.codepoint=e.codepoint<<6|a&63,e.utf8seq-=1,e.utf8seq===0&&t(e.codepoint)}}function De(a){const e=[],t={queue:0,queuedBits:0},s=n=>{e.push(n)};for(let n=0;n<a.length;n+=1)Ea(a.charCodeAt(n),t,s);return new Uint8Array(e)}function ln(a){const e=[];return rn(a,t=>e.push(t)),new Uint8Array(e)}function ye(a){const e=[],t={queue:0,queuedBits:0},s=n=>{e.push(n)};return a.forEach(n=>Qt(n,t,s)),Qt(null,t,s),e.join("")}function dn(a){return Math.round(Date.now()/1e3)+a}function cn(){return Symbol("auth-callback")}const z=()=>typeof window<"u"&&typeof document<"u",ce={tested:!1,writable:!1},$a=()=>{if(!z())return!1;try{if(typeof globalThis.localStorage!="object")return!1}catch{return!1}if(ce.tested)return ce.writable;const a=`lswt-${Math.random()}${Math.random()}`;try{globalThis.localStorage.setItem(a,a),globalThis.localStorage.removeItem(a),ce.tested=!0,ce.writable=!0}catch{ce.tested=!0,ce.writable=!1}return ce.writable};function un(a){const e={},t=new URL(a);if(t.hash&&t.hash[0]==="#")try{new URLSearchParams(t.hash.substring(1)).forEach((n,r)=>{e[r]=n})}catch{}return t.searchParams.forEach((s,n)=>{e[n]=s}),e}const Ta=a=>a?(...e)=>a(...e):(...e)=>fetch(...e),pn=a=>typeof a=="object"&&a!==null&&"status"in a&&"ok"in a&&"json"in a&&typeof a.json=="function",Te=async(a,e,t)=>{await a.setItem(e,JSON.stringify(t))},ue=async(a,e)=>{const t=await a.getItem(e);if(!t)return null;try{return JSON.parse(t)}catch{return t}},B=async(a,e)=>{await a.removeItem(e)};class lt{constructor(){this.promise=new lt.promiseConstructor((e,t)=>{this.resolve=e,this.reject=t})}}lt.promiseConstructor=Promise;function Qe(a){const e=a.split(".");if(e.length!==3)throw new Ct("Invalid JWT structure");for(let s=0;s<e.length;s++)if(!Xs.test(e[s]))throw new Ct("JWT not in base64url format");return{header:JSON.parse(Zt(e[0])),payload:JSON.parse(Zt(e[1])),signature:De(e[2]),raw:{header:e[0],payload:e[1]}}}async function hn(a){return await new Promise(e=>{setTimeout(()=>e(null),a)})}function mn(a,e){return new Promise((s,n)=>{(async()=>{for(let r=0;r<1/0;r++)try{const i=await a(r);if(!e(r,null,i)){s(i);return}}catch(i){if(!e(r,i)){n(i);return}}})()})}function gn(a){return("0"+a.toString(16)).substr(-2)}function yn(){const e=new Uint32Array(56);if(typeof crypto>"u"){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~",s=t.length;let n="";for(let r=0;r<56;r++)n+=t.charAt(Math.floor(Math.random()*s));return n}return crypto.getRandomValues(e),Array.from(e,gn).join("")}async function vn(a){const t=new TextEncoder().encode(a),s=await crypto.subtle.digest("SHA-256",t),n=new Uint8Array(s);return Array.from(n).map(r=>String.fromCharCode(r)).join("")}async function fn(a){if(!(typeof crypto<"u"&&typeof crypto.subtle<"u"&&typeof TextEncoder<"u"))return console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."),a;const t=await vn(a);return btoa(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}async function we(a,e,t=!1){const s=yn();let n=s;t&&(n+="/PASSWORD_RECOVERY"),await Te(a,`${e}-code-verifier`,n);const r=await fn(s);return[r,s===r?"plain":"s256"]}const bn=/^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;function wn(a){const e=a.headers.get(At);if(!e||!e.match(bn))return null;try{return new Date(`${e}T00:00:00.0Z`)}catch{return null}}function _n(a){if(!a)throw new Error("Missing exp claim");const e=Math.floor(Date.now()/1e3);if(a<=e)throw new Error("JWT has expired")}function xn(a){switch(a){case"RS256":return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-256"}};case"ES256":return{name:"ECDSA",namedCurve:"P-256",hash:{name:"SHA-256"}};default:throw new Error("Invalid alg claim")}}const Sn=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;function _e(a){if(!Sn.test(a))throw new Error("@supabase/auth-js: Expected parameter to be UUID but is not")}function gt(){const a={};return new Proxy(a,{get:(e,t)=>{if(t==="__isUserNotAvailableProxy")return!0;if(typeof t=="symbol"){const s=t.toString();if(s==="Symbol(Symbol.toPrimitive)"||s==="Symbol(Symbol.toStringTag)"||s==="Symbol(util.inspect.custom)")return}throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${t}" property of the session object is not supported. Please use getUser() instead.`)},set:(e,t)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${t}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)},deleteProperty:(e,t)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${t}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)}})}function kn(a,e){return new Proxy(a,{get:(t,s,n)=>{if(s==="__isInsecureUserWarningProxy")return!0;if(typeof s=="symbol"){const r=s.toString();if(r==="Symbol(Symbol.toPrimitive)"||r==="Symbol(Symbol.toStringTag)"||r==="Symbol(util.inspect.custom)"||r==="Symbol(nodejs.util.inspect.custom)")return Reflect.get(t,s,n)}return!e.value&&typeof s=="string"&&(console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."),e.value=!0),Reflect.get(t,s,n)}})}function ea(a){return JSON.parse(JSON.stringify(a))}const pe=a=>a.msg||a.message||a.error_description||a.error||JSON.stringify(a),En=[502,503,504];async function ta(a){var e;if(!pn(a))throw new Dt(pe(a),0);if(En.includes(a.status))throw new Dt(pe(a),a.status);let t;try{t=await a.json()}catch(r){throw new ge(pe(r),r)}let s;const n=wn(a);if(n&&n.getTime()>=ka["2024-01-01"].timestamp&&typeof t=="object"&&t&&typeof t.code=="string"?s=t.code:typeof t=="object"&&t&&typeof t.error_code=="string"&&(s=t.error_code),s){if(s==="weak_password")throw new Yt(pe(t),a.status,((e=t.weak_password)===null||e===void 0?void 0:e.reasons)||[]);if(s==="session_not_found")throw new V}else if(typeof t=="object"&&t&&typeof t.weak_password=="object"&&t.weak_password&&Array.isArray(t.weak_password.reasons)&&t.weak_password.reasons.length&&t.weak_password.reasons.reduce((r,i)=>r&&typeof i=="string",!0))throw new Yt(pe(t),a.status,t.weak_password.reasons);throw new Zs(pe(t),a.status||500,s)}const $n=(a,e,t,s)=>{const n={method:a,headers:e?.headers||{}};return a==="GET"?n:(n.headers=Object.assign({"Content-Type":"application/json;charset=UTF-8"},e?.headers),n.body=JSON.stringify(s),Object.assign(Object.assign({},n),t))};async function T(a,e,t,s){var n;const r=Object.assign({},s?.headers);r[At]||(r[At]=ka["2024-01-01"].name),s?.jwt&&(r.Authorization=`Bearer ${s.jwt}`);const i=(n=s?.query)!==null&&n!==void 0?n:{};s?.redirectTo&&(i.redirect_to=s.redirectTo);const o=Object.keys(i).length?"?"+new URLSearchParams(i).toString():"",l=await Tn(a,e,t+o,{headers:r,noResolveJson:s?.noResolveJson},{},s?.body);return s?.xform?s?.xform(l):{data:Object.assign({},l),error:null}}async function Tn(a,e,t,s,n,r){const i=$n(e,s,n,r);let o;try{o=await a(t,Object.assign({},i))}catch(l){throw console.error(l),new Dt(pe(l),0)}if(o.ok||await ta(o),s?.noResolveJson)return o;try{return await o.json()}catch(l){await ta(l)}}function Q(a){var e;let t=null;Cn(a)&&(t=Object.assign({},a),a.expires_at||(t.expires_at=dn(a.expires_in)));const s=(e=a.user)!==null&&e!==void 0?e:a;return{data:{session:t,user:s},error:null}}function aa(a){const e=Q(a);return!e.error&&a.weak_password&&typeof a.weak_password=="object"&&Array.isArray(a.weak_password.reasons)&&a.weak_password.reasons.length&&a.weak_password.message&&typeof a.weak_password.message=="string"&&a.weak_password.reasons.reduce((t,s)=>t&&typeof s=="string",!0)&&(e.data.weak_password=a.weak_password),e}function le(a){var e;return{data:{user:(e=a.user)!==null&&e!==void 0?e:a},error:null}}function An(a){return{data:a,error:null}}function Dn(a){const{action_link:e,email_otp:t,hashed_token:s,redirect_to:n,verification_type:r}=a,i=rt(a,["action_link","email_otp","hashed_token","redirect_to","verification_type"]),o={action_link:e,email_otp:t,hashed_token:s,redirect_to:n,verification_type:r},l=Object.assign({},i);return{data:{properties:o,user:l},error:null}}function sa(a){return a}function Cn(a){return a.access_token&&a.refresh_token&&a.expires_in}const yt=["global","local","others"];class Ln{constructor({url:e="",headers:t={},fetch:s}){this.url=e,this.headers=t,this.fetch=Ta(s),this.mfa={listFactors:this._listFactors.bind(this),deleteFactor:this._deleteFactor.bind(this)},this.oauth={listClients:this._listOAuthClients.bind(this),createClient:this._createOAuthClient.bind(this),getClient:this._getOAuthClient.bind(this),updateClient:this._updateOAuthClient.bind(this),deleteClient:this._deleteOAuthClient.bind(this),regenerateClientSecret:this._regenerateOAuthClientSecret.bind(this)}}async signOut(e,t=yt[0]){if(yt.indexOf(t)<0)throw new Error(`@supabase/auth-js: Parameter scope must be one of ${yt.join(", ")}`);try{return await T(this.fetch,"POST",`${this.url}/logout?scope=${t}`,{headers:this.headers,jwt:e,noResolveJson:!0}),{data:null,error:null}}catch(s){if(x(s))return{data:null,error:s};throw s}}async inviteUserByEmail(e,t={}){try{return await T(this.fetch,"POST",`${this.url}/invite`,{body:{email:e,data:t.data},headers:this.headers,redirectTo:t.redirectTo,xform:le})}catch(s){if(x(s))return{data:{user:null},error:s};throw s}}async generateLink(e){try{const{options:t}=e,s=rt(e,["options"]),n=Object.assign(Object.assign({},s),t);return"newEmail"in s&&(n.new_email=s?.newEmail,delete n.newEmail),await T(this.fetch,"POST",`${this.url}/admin/generate_link`,{body:n,headers:this.headers,xform:Dn,redirectTo:t?.redirectTo})}catch(t){if(x(t))return{data:{properties:null,user:null},error:t};throw t}}async createUser(e){try{return await T(this.fetch,"POST",`${this.url}/admin/users`,{body:e,headers:this.headers,xform:le})}catch(t){if(x(t))return{data:{user:null},error:t};throw t}}async listUsers(e){var t,s,n,r,i,o,l;try{const d={nextPage:null,lastPage:0,total:0},c=await T(this.fetch,"GET",`${this.url}/admin/users`,{headers:this.headers,noResolveJson:!0,query:{page:(s=(t=e?.page)===null||t===void 0?void 0:t.toString())!==null&&s!==void 0?s:"",per_page:(r=(n=e?.perPage)===null||n===void 0?void 0:n.toString())!==null&&r!==void 0?r:""},xform:sa});if(c.error)throw c.error;const p=await c.json(),u=(i=c.headers.get("x-total-count"))!==null&&i!==void 0?i:0,h=(l=(o=c.headers.get("link"))===null||o===void 0?void 0:o.split(","))!==null&&l!==void 0?l:[];return h.length>0&&(h.forEach(m=>{const g=parseInt(m.split(";")[0].split("=")[1].substring(0,1)),y=JSON.parse(m.split(";")[1].split("=")[1]);d[`${y}Page`]=g}),d.total=parseInt(u)),{data:Object.assign(Object.assign({},p),d),error:null}}catch(d){if(x(d))return{data:{users:[]},error:d};throw d}}async getUserById(e){_e(e);try{return await T(this.fetch,"GET",`${this.url}/admin/users/${e}`,{headers:this.headers,xform:le})}catch(t){if(x(t))return{data:{user:null},error:t};throw t}}async updateUserById(e,t){_e(e);try{return await T(this.fetch,"PUT",`${this.url}/admin/users/${e}`,{body:t,headers:this.headers,xform:le})}catch(s){if(x(s))return{data:{user:null},error:s};throw s}}async deleteUser(e,t=!1){_e(e);try{return await T(this.fetch,"DELETE",`${this.url}/admin/users/${e}`,{headers:this.headers,body:{should_soft_delete:t},xform:le})}catch(s){if(x(s))return{data:{user:null},error:s};throw s}}async _listFactors(e){_e(e.userId);try{const{data:t,error:s}=await T(this.fetch,"GET",`${this.url}/admin/users/${e.userId}/factors`,{headers:this.headers,xform:n=>({data:{factors:n},error:null})});return{data:t,error:s}}catch(t){if(x(t))return{data:null,error:t};throw t}}async _deleteFactor(e){_e(e.userId),_e(e.id);try{return{data:await T(this.fetch,"DELETE",`${this.url}/admin/users/${e.userId}/factors/${e.id}`,{headers:this.headers}),error:null}}catch(t){if(x(t))return{data:null,error:t};throw t}}async _listOAuthClients(e){var t,s,n,r,i,o,l;try{const d={nextPage:null,lastPage:0,total:0},c=await T(this.fetch,"GET",`${this.url}/admin/oauth/clients`,{headers:this.headers,noResolveJson:!0,query:{page:(s=(t=e?.page)===null||t===void 0?void 0:t.toString())!==null&&s!==void 0?s:"",per_page:(r=(n=e?.perPage)===null||n===void 0?void 0:n.toString())!==null&&r!==void 0?r:""},xform:sa});if(c.error)throw c.error;const p=await c.json(),u=(i=c.headers.get("x-total-count"))!==null&&i!==void 0?i:0,h=(l=(o=c.headers.get("link"))===null||o===void 0?void 0:o.split(","))!==null&&l!==void 0?l:[];return h.length>0&&(h.forEach(m=>{const g=parseInt(m.split(";")[0].split("=")[1].substring(0,1)),y=JSON.parse(m.split(";")[1].split("=")[1]);d[`${y}Page`]=g}),d.total=parseInt(u)),{data:Object.assign(Object.assign({},p),d),error:null}}catch(d){if(x(d))return{data:{clients:[]},error:d};throw d}}async _createOAuthClient(e){try{return await T(this.fetch,"POST",`${this.url}/admin/oauth/clients`,{body:e,headers:this.headers,xform:t=>({data:t,error:null})})}catch(t){if(x(t))return{data:null,error:t};throw t}}async _getOAuthClient(e){try{return await T(this.fetch,"GET",`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,xform:t=>({data:t,error:null})})}catch(t){if(x(t))return{data:null,error:t};throw t}}async _updateOAuthClient(e,t){try{return await T(this.fetch,"PUT",`${this.url}/admin/oauth/clients/${e}`,{body:t,headers:this.headers,xform:s=>({data:s,error:null})})}catch(s){if(x(s))return{data:null,error:s};throw s}}async _deleteOAuthClient(e){try{return await T(this.fetch,"DELETE",`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(t){if(x(t))return{data:null,error:t};throw t}}async _regenerateOAuthClientSecret(e){try{return await T(this.fetch,"POST",`${this.url}/admin/oauth/clients/${e}/regenerate_secret`,{headers:this.headers,xform:t=>({data:t,error:null})})}catch(t){if(x(t))return{data:null,error:t};throw t}}}function na(a={}){return{getItem:e=>a[e]||null,setItem:(e,t)=>{a[e]=t},removeItem:e=>{delete a[e]}}}const xe={debug:!!(globalThis&&$a()&&globalThis.localStorage&&globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug")==="true")};class Aa extends Error{constructor(e){super(e),this.isAcquireTimeout=!0}}class ra extends Aa{}async function On(a,e,t){xe.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquire lock",a,e);const s=new globalThis.AbortController;e>0&&setTimeout(()=>{s.abort(),xe.debug&&console.log("@supabase/gotrue-js: navigatorLock acquire timed out",a)},e),await Promise.resolve();try{return await globalThis.navigator.locks.request(a,e===0?{mode:"exclusive",ifAvailable:!0}:{mode:"exclusive",signal:s.signal},async n=>{if(n){xe.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquired",a,n.name);try{return await t()}finally{xe.debug&&console.log("@supabase/gotrue-js: navigatorLock: released",a,n.name)}}else{if(e===0)throw xe.debug&&console.log("@supabase/gotrue-js: navigatorLock: not immediately available",a),new ra(`Acquiring an exclusive Navigator LockManager lock "${a}" immediately failed`);if(xe.debug)try{const r=await globalThis.navigator.locks.query();console.log("@supabase/gotrue-js: Navigator LockManager state",JSON.stringify(r,null,"  "))}catch(r){console.warn("@supabase/gotrue-js: Error when querying Navigator LockManager state",r)}return console.warn("@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request"),await t()}})}catch(n){throw n?.name==="AbortError"?new ra(`Acquiring an exclusive Navigator LockManager lock "${a}" timed out waiting ${e}ms`):n}}function Pn(){if(typeof globalThis!="object")try{Object.defineProperty(Object.prototype,"__magic__",{get:function(){return this},configurable:!0}),__magic__.globalThis=__magic__,delete Object.prototype.__magic__}catch{typeof self<"u"&&(self.globalThis=self)}}function Da(a){if(!/^0x[a-fA-F0-9]{40}$/.test(a))throw new Error(`@supabase/auth-js: Address "${a}" is invalid.`);return a.toLowerCase()}function Rn(a){return parseInt(a,16)}function In(a){const e=new TextEncoder().encode(a);return"0x"+Array.from(e,s=>s.toString(16).padStart(2,"0")).join("")}function jn(a){var e;const{chainId:t,domain:s,expirationTime:n,issuedAt:r=new Date,nonce:i,notBefore:o,requestId:l,resources:d,scheme:c,uri:p,version:u}=a;{if(!Number.isInteger(t))throw new Error(`@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${t}`);if(!s)throw new Error('@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.');if(i&&i.length<8)throw new Error(`@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${i}`);if(!p)throw new Error('@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.');if(u!=="1")throw new Error(`@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${u}`);if(!((e=a.statement)===null||e===void 0)&&e.includes(`
`))throw new Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${a.statement}`)}const h=Da(a.address),m=c?`${c}://${s}`:s,g=a.statement?`${a.statement}
`:"",y=`${m} wants you to sign in with your Ethereum account:
${h}

${g}`;let f=`URI: ${p}
Version: ${u}
Chain ID: ${t}${i?`
Nonce: ${i}`:""}
Issued At: ${r.toISOString()}`;if(n&&(f+=`
Expiration Time: ${n.toISOString()}`),o&&(f+=`
Not Before: ${o.toISOString()}`),l&&(f+=`
Request ID: ${l}`),d){let _=`
Resources:`;for(const b of d){if(!b||typeof b!="string")throw new Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${b}`);_+=`
- ${b}`}f+=_}return`${y}
${f}`}class I extends Error{constructor({message:e,code:t,cause:s,name:n}){var r;super(e,{cause:s}),this.__isWebAuthnError=!0,this.name=(r=n??(s instanceof Error?s.name:void 0))!==null&&r!==void 0?r:"Unknown Error",this.code=t}}class tt extends I{constructor(e,t){super({code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t,message:e}),this.name="WebAuthnUnknownError",this.originalError=t}}function qn({error:a,options:e}){var t,s,n;const{publicKey:r}=e;if(!r)throw Error("options was missing required publicKey property");if(a.name==="AbortError"){if(e.signal instanceof AbortSignal)return new I({message:"Registration ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:a})}else if(a.name==="ConstraintError"){if(((t=r.authenticatorSelection)===null||t===void 0?void 0:t.requireResidentKey)===!0)return new I({message:"Discoverable credentials were required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT",cause:a});if(e.mediation==="conditional"&&((s=r.authenticatorSelection)===null||s===void 0?void 0:s.userVerification)==="required")return new I({message:"User verification was required during automatic registration but it could not be performed",code:"ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE",cause:a});if(((n=r.authenticatorSelection)===null||n===void 0?void 0:n.userVerification)==="required")return new I({message:"User verification was required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT",cause:a})}else{if(a.name==="InvalidStateError")return new I({message:"The authenticator was previously registered",code:"ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED",cause:a});if(a.name==="NotAllowedError")return new I({message:a.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:a});if(a.name==="NotSupportedError")return r.pubKeyCredParams.filter(o=>o.type==="public-key").length===0?new I({message:'No entry in pubKeyCredParams was of type "public-key"',code:"ERROR_MALFORMED_PUBKEYCREDPARAMS",cause:a}):new I({message:"No available authenticator supported any of the specified pubKeyCredParams algorithms",code:"ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG",cause:a});if(a.name==="SecurityError"){const i=window.location.hostname;if(Ca(i)){if(r.rp.id!==i)return new I({message:`The RP ID "${r.rp.id}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:a})}else return new I({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:a})}else if(a.name==="TypeError"){if(r.user.id.byteLength<1||r.user.id.byteLength>64)return new I({message:"User ID was not between 1 and 64 characters",code:"ERROR_INVALID_USER_ID_LENGTH",cause:a})}else if(a.name==="UnknownError")return new I({message:"The authenticator was unable to process the specified options, or could not create a new credential",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:a})}return new I({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:a})}function Mn({error:a,options:e}){const{publicKey:t}=e;if(!t)throw Error("options was missing required publicKey property");if(a.name==="AbortError"){if(e.signal instanceof AbortSignal)return new I({message:"Authentication ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:a})}else{if(a.name==="NotAllowedError")return new I({message:a.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:a});if(a.name==="SecurityError"){const s=window.location.hostname;if(Ca(s)){if(t.rpId!==s)return new I({message:`The RP ID "${t.rpId}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:a})}else return new I({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:a})}else if(a.name==="UnknownError")return new I({message:"The authenticator was unable to process the specified options, or could not create a new assertion signature",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:a})}return new I({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:a})}class Un{createNewAbortSignal(){if(this.controller){const t=new Error("Cancelling existing WebAuthn API call for new one");t.name="AbortError",this.controller.abort(t)}const e=new AbortController;return this.controller=e,e.signal}cancelCeremony(){if(this.controller){const e=new Error("Manually cancelling existing WebAuthn API call");e.name="AbortError",this.controller.abort(e),this.controller=void 0}}}const Nn=new Un;function Hn(a){if(!a)throw new Error("Credential creation options are required");if(typeof PublicKeyCredential<"u"&&"parseCreationOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseCreationOptionsFromJSON=="function")return PublicKeyCredential.parseCreationOptionsFromJSON(a);const{challenge:e,user:t,excludeCredentials:s}=a,n=rt(a,["challenge","user","excludeCredentials"]),r=De(e).buffer,i=Object.assign(Object.assign({},t),{id:De(t.id).buffer}),o=Object.assign(Object.assign({},n),{challenge:r,user:i});if(s&&s.length>0){o.excludeCredentials=new Array(s.length);for(let l=0;l<s.length;l++){const d=s[l];o.excludeCredentials[l]=Object.assign(Object.assign({},d),{id:De(d.id).buffer,type:d.type||"public-key",transports:d.transports})}}return o}function Bn(a){if(!a)throw new Error("Credential request options are required");if(typeof PublicKeyCredential<"u"&&"parseRequestOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseRequestOptionsFromJSON=="function")return PublicKeyCredential.parseRequestOptionsFromJSON(a);const{challenge:e,allowCredentials:t}=a,s=rt(a,["challenge","allowCredentials"]),n=De(e).buffer,r=Object.assign(Object.assign({},s),{challenge:n});if(t&&t.length>0){r.allowCredentials=new Array(t.length);for(let i=0;i<t.length;i++){const o=t[i];r.allowCredentials[i]=Object.assign(Object.assign({},o),{id:De(o.id).buffer,type:o.type||"public-key",transports:o.transports})}}return r}function zn(a){var e;if("toJSON"in a&&typeof a.toJSON=="function")return a.toJSON();const t=a;return{id:a.id,rawId:a.id,response:{attestationObject:ye(new Uint8Array(a.response.attestationObject)),clientDataJSON:ye(new Uint8Array(a.response.clientDataJSON))},type:"public-key",clientExtensionResults:a.getClientExtensionResults(),authenticatorAttachment:(e=t.authenticatorAttachment)!==null&&e!==void 0?e:void 0}}function Fn(a){var e;if("toJSON"in a&&typeof a.toJSON=="function")return a.toJSON();const t=a,s=a.getClientExtensionResults(),n=a.response;return{id:a.id,rawId:a.id,response:{authenticatorData:ye(new Uint8Array(n.authenticatorData)),clientDataJSON:ye(new Uint8Array(n.clientDataJSON)),signature:ye(new Uint8Array(n.signature)),userHandle:n.userHandle?ye(new Uint8Array(n.userHandle)):void 0},type:"public-key",clientExtensionResults:s,authenticatorAttachment:(e=t.authenticatorAttachment)!==null&&e!==void 0?e:void 0}}function Ca(a){return a==="localhost"||/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(a)}function ia(){var a,e;return!!(z()&&"PublicKeyCredential"in window&&window.PublicKeyCredential&&"credentials"in navigator&&typeof((a=navigator?.credentials)===null||a===void 0?void 0:a.create)=="function"&&typeof((e=navigator?.credentials)===null||e===void 0?void 0:e.get)=="function")}async function Gn(a){try{const e=await navigator.credentials.create(a);return e?e instanceof PublicKeyCredential?{data:e,error:null}:{data:null,error:new tt("Browser returned unexpected credential type",e)}:{data:null,error:new tt("Empty credential response",e)}}catch(e){return{data:null,error:qn({error:e,options:a})}}}async function Wn(a){try{const e=await navigator.credentials.get(a);return e?e instanceof PublicKeyCredential?{data:e,error:null}:{data:null,error:new tt("Browser returned unexpected credential type",e)}:{data:null,error:new tt("Empty credential response",e)}}catch(e){return{data:null,error:Mn({error:e,options:a})}}}const Vn={hints:["security-key"],authenticatorSelection:{authenticatorAttachment:"cross-platform",requireResidentKey:!1,userVerification:"preferred",residentKey:"discouraged"},attestation:"direct"},Kn={userVerification:"preferred",hints:["security-key"],attestation:"direct"};function at(...a){const e=n=>n!==null&&typeof n=="object"&&!Array.isArray(n),t=n=>n instanceof ArrayBuffer||ArrayBuffer.isView(n),s={};for(const n of a)if(n)for(const r in n){const i=n[r];if(i!==void 0)if(Array.isArray(i))s[r]=i;else if(t(i))s[r]=i;else if(e(i)){const o=s[r];e(o)?s[r]=at(o,i):s[r]=at(i)}else s[r]=i}return s}function Jn(a,e){return at(Vn,a,e||{})}function Yn(a,e){return at(Kn,a,e||{})}class Xn{constructor(e){this.client=e,this.enroll=this._enroll.bind(this),this.challenge=this._challenge.bind(this),this.verify=this._verify.bind(this),this.authenticate=this._authenticate.bind(this),this.register=this._register.bind(this)}async _enroll(e){return this.client.mfa.enroll(Object.assign(Object.assign({},e),{factorType:"webauthn"}))}async _challenge({factorId:e,webauthn:t,friendlyName:s,signal:n},r){var i;try{const{data:o,error:l}=await this.client.mfa.challenge({factorId:e,webauthn:t});if(!o)return{data:null,error:l};const d=n??Nn.createNewAbortSignal();if(o.webauthn.type==="create"){const{user:c}=o.webauthn.credential_options.publicKey;if(!c.name){const p=s;if(p)c.name=`${c.id}:${p}`;else{const h=(await this.client.getUser()).data.user,m=((i=h?.user_metadata)===null||i===void 0?void 0:i.name)||h?.email||h?.id||"User";c.name=`${c.id}:${m}`}}c.displayName||(c.displayName=c.name)}switch(o.webauthn.type){case"create":{const c=Jn(o.webauthn.credential_options.publicKey,r?.create),{data:p,error:u}=await Gn({publicKey:c,signal:d});return p?{data:{factorId:e,challengeId:o.id,webauthn:{type:o.webauthn.type,credential_response:p}},error:null}:{data:null,error:u}}case"request":{const c=Yn(o.webauthn.credential_options.publicKey,r?.request),{data:p,error:u}=await Wn(Object.assign(Object.assign({},o.webauthn.credential_options),{publicKey:c,signal:d}));return p?{data:{factorId:e,challengeId:o.id,webauthn:{type:o.webauthn.type,credential_response:p}},error:null}:{data:null,error:u}}}}catch(o){return x(o)?{data:null,error:o}:{data:null,error:new ge("Unexpected error in challenge",o)}}}async _verify({challengeId:e,factorId:t,webauthn:s}){return this.client.mfa.verify({factorId:t,challengeId:e,webauthn:s})}async _authenticate({factorId:e,webauthn:{rpId:t=typeof window<"u"?window.location.hostname:void 0,rpOrigins:s=typeof window<"u"?[window.location.origin]:void 0,signal:n}={}},r){if(!t)return{data:null,error:new Be("rpId is required for WebAuthn authentication")};try{if(!ia())return{data:null,error:new ge("Browser does not support WebAuthn",null)};const{data:i,error:o}=await this.challenge({factorId:e,webauthn:{rpId:t,rpOrigins:s},signal:n},{request:r});if(!i)return{data:null,error:o};const{webauthn:l}=i;return this._verify({factorId:e,challengeId:i.challengeId,webauthn:{type:l.type,rpId:t,rpOrigins:s,credential_response:l.credential_response}})}catch(i){return x(i)?{data:null,error:i}:{data:null,error:new ge("Unexpected error in authenticate",i)}}}async _register({friendlyName:e,webauthn:{rpId:t=typeof window<"u"?window.location.hostname:void 0,rpOrigins:s=typeof window<"u"?[window.location.origin]:void 0,signal:n}={}},r){if(!t)return{data:null,error:new Be("rpId is required for WebAuthn registration")};try{if(!ia())return{data:null,error:new ge("Browser does not support WebAuthn",null)};const{data:i,error:o}=await this._enroll({friendlyName:e});if(!i)return await this.client.mfa.listFactors().then(c=>{var p;return(p=c.data)===null||p===void 0?void 0:p.all.find(u=>u.factor_type==="webauthn"&&u.friendly_name===e&&u.status!=="unverified")}).then(c=>c?this.client.mfa.unenroll({factorId:c?.id}):void 0),{data:null,error:o};const{data:l,error:d}=await this._challenge({factorId:i.id,friendlyName:i.friendly_name,webauthn:{rpId:t,rpOrigins:s},signal:n},{create:r});return l?this._verify({factorId:i.id,challengeId:l.challengeId,webauthn:{rpId:t,rpOrigins:s,type:l.webauthn.type,credential_response:l.webauthn.credential_response}}):{data:null,error:d}}catch(i){return x(i)?{data:null,error:i}:{data:null,error:new ge("Unexpected error in register",i)}}}}Pn();const Qn={url:Ks,storageKey:Js,autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,headers:Ys,flowType:"implicit",debug:!1,hasCustomAuthorizationHeader:!1,throwOnError:!1,lockAcquireTimeout:1e4,skipAutoInitialize:!1};async function oa(a,e,t){return await t()}const Se={};class ze{get jwks(){var e,t;return(t=(e=Se[this.storageKey])===null||e===void 0?void 0:e.jwks)!==null&&t!==void 0?t:{keys:[]}}set jwks(e){Se[this.storageKey]=Object.assign(Object.assign({},Se[this.storageKey]),{jwks:e})}get jwks_cached_at(){var e,t;return(t=(e=Se[this.storageKey])===null||e===void 0?void 0:e.cachedAt)!==null&&t!==void 0?t:Number.MIN_SAFE_INTEGER}set jwks_cached_at(e){Se[this.storageKey]=Object.assign(Object.assign({},Se[this.storageKey]),{cachedAt:e})}constructor(e){var t,s,n;this.userStorage=null,this.memoryStorage=null,this.stateChangeEmitters=new Map,this.autoRefreshTicker=null,this.autoRefreshTickTimeout=null,this.visibilityChangedCallback=null,this.refreshingDeferred=null,this.initializePromise=null,this.detectSessionInUrl=!0,this.hasCustomAuthorizationHeader=!1,this.suppressGetSessionWarning=!1,this.lockAcquired=!1,this.pendingInLock=[],this.broadcastChannel=null,this.logger=console.log;const r=Object.assign(Object.assign({},Qn),e);if(this.storageKey=r.storageKey,this.instanceID=(t=ze.nextInstanceID[this.storageKey])!==null&&t!==void 0?t:0,ze.nextInstanceID[this.storageKey]=this.instanceID+1,this.logDebugMessages=!!r.debug,typeof r.debug=="function"&&(this.logger=r.debug),this.instanceID>0&&z()){const i=`${this._logPrefix()} Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.`;console.warn(i),this.logDebugMessages&&console.trace(i)}if(this.persistSession=r.persistSession,this.autoRefreshToken=r.autoRefreshToken,this.admin=new Ln({url:r.url,headers:r.headers,fetch:r.fetch}),this.url=r.url,this.headers=r.headers,this.fetch=Ta(r.fetch),this.lock=r.lock||oa,this.detectSessionInUrl=r.detectSessionInUrl,this.flowType=r.flowType,this.hasCustomAuthorizationHeader=r.hasCustomAuthorizationHeader,this.throwOnError=r.throwOnError,this.lockAcquireTimeout=r.lockAcquireTimeout,r.lock?this.lock=r.lock:this.persistSession&&z()&&(!((s=globalThis?.navigator)===null||s===void 0)&&s.locks)?this.lock=On:this.lock=oa,this.jwks||(this.jwks={keys:[]},this.jwks_cached_at=Number.MIN_SAFE_INTEGER),this.mfa={verify:this._verify.bind(this),enroll:this._enroll.bind(this),unenroll:this._unenroll.bind(this),challenge:this._challenge.bind(this),listFactors:this._listFactors.bind(this),challengeAndVerify:this._challengeAndVerify.bind(this),getAuthenticatorAssuranceLevel:this._getAuthenticatorAssuranceLevel.bind(this),webauthn:new Xn(this)},this.oauth={getAuthorizationDetails:this._getAuthorizationDetails.bind(this),approveAuthorization:this._approveAuthorization.bind(this),denyAuthorization:this._denyAuthorization.bind(this),listGrants:this._listOAuthGrants.bind(this),revokeGrant:this._revokeOAuthGrant.bind(this)},this.persistSession?(r.storage?this.storage=r.storage:$a()?this.storage=globalThis.localStorage:(this.memoryStorage={},this.storage=na(this.memoryStorage)),r.userStorage&&(this.userStorage=r.userStorage)):(this.memoryStorage={},this.storage=na(this.memoryStorage)),z()&&globalThis.BroadcastChannel&&this.persistSession&&this.storageKey){try{this.broadcastChannel=new globalThis.BroadcastChannel(this.storageKey)}catch(i){console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available",i)}(n=this.broadcastChannel)===null||n===void 0||n.addEventListener("message",async i=>{this._debug("received broadcast notification from other tab or client",i);try{await this._notifyAllSubscribers(i.data.event,i.data.session,!1)}catch(o){this._debug("#broadcastChannel","error",o)}})}r.skipAutoInitialize||this.initialize().catch(i=>{this._debug("#initialize()","error",i)})}isThrowOnErrorEnabled(){return this.throwOnError}_returnResult(e){if(this.throwOnError&&e&&e.error)throw e.error;return e}_logPrefix(){return`GoTrueClient@${this.storageKey}:${this.instanceID} (${Sa}) ${new Date().toISOString()}`}_debug(...e){return this.logDebugMessages&&this.logger(this._logPrefix(),...e),this}async initialize(){return this.initializePromise?await this.initializePromise:(this.initializePromise=(async()=>await this._acquireLock(this.lockAcquireTimeout,async()=>await this._initialize()))(),await this.initializePromise)}async _initialize(){var e;try{let t={},s="none";if(z()&&(t=un(window.location.href),this._isImplicitGrantCallback(t)?s="implicit":await this._isPKCECallback(t)&&(s="pkce")),z()&&this.detectSessionInUrl&&s!=="none"){const{data:n,error:r}=await this._getSessionFromURL(t,s);if(r){if(this._debug("#_initialize()","error detecting session from URL",r),tn(r)){const l=(e=r.details)===null||e===void 0?void 0:e.code;if(l==="identity_already_exists"||l==="identity_not_found"||l==="single_identity_not_deletable")return{error:r}}return{error:r}}const{session:i,redirectType:o}=n;return this._debug("#_initialize()","detected session in URL",i,"redirect type",o),await this._saveSession(i),setTimeout(async()=>{o==="recovery"?await this._notifyAllSubscribers("PASSWORD_RECOVERY",i):await this._notifyAllSubscribers("SIGNED_IN",i)},0),{error:null}}return await this._recoverAndRefresh(),{error:null}}catch(t){return x(t)?this._returnResult({error:t}):this._returnResult({error:new ge("Unexpected error during initialization",t)})}finally{await this._handleVisibilityChange(),this._debug("#_initialize()","end")}}async signInAnonymously(e){var t,s,n;try{const r=await T(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{data:(s=(t=e?.options)===null||t===void 0?void 0:t.data)!==null&&s!==void 0?s:{},gotrue_meta_security:{captcha_token:(n=e?.options)===null||n===void 0?void 0:n.captchaToken}},xform:Q}),{data:i,error:o}=r;if(o||!i)return this._returnResult({data:{user:null,session:null},error:o});const l=i.session,d=i.user;return i.session&&(await this._saveSession(i.session),await this._notifyAllSubscribers("SIGNED_IN",l)),this._returnResult({data:{user:d,session:l},error:null})}catch(r){if(x(r))return this._returnResult({data:{user:null,session:null},error:r});throw r}}async signUp(e){var t,s,n;try{let r;if("email"in e){const{email:c,password:p,options:u}=e;let h=null,m=null;this.flowType==="pkce"&&([h,m]=await we(this.storage,this.storageKey)),r=await T(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,redirectTo:u?.emailRedirectTo,body:{email:c,password:p,data:(t=u?.data)!==null&&t!==void 0?t:{},gotrue_meta_security:{captcha_token:u?.captchaToken},code_challenge:h,code_challenge_method:m},xform:Q})}else if("phone"in e){const{phone:c,password:p,options:u}=e;r=await T(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{phone:c,password:p,data:(s=u?.data)!==null&&s!==void 0?s:{},channel:(n=u?.channel)!==null&&n!==void 0?n:"sms",gotrue_meta_security:{captcha_token:u?.captchaToken}},xform:Q})}else throw new Ye("You must provide either an email or phone number and a password");const{data:i,error:o}=r;if(o||!i)return await B(this.storage,`${this.storageKey}-code-verifier`),this._returnResult({data:{user:null,session:null},error:o});const l=i.session,d=i.user;return i.session&&(await this._saveSession(i.session),await this._notifyAllSubscribers("SIGNED_IN",l)),this._returnResult({data:{user:d,session:l},error:null})}catch(r){if(await B(this.storage,`${this.storageKey}-code-verifier`),x(r))return this._returnResult({data:{user:null,session:null},error:r});throw r}}async signInWithPassword(e){try{let t;if("email"in e){const{email:r,password:i,options:o}=e;t=await T(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{email:r,password:i,gotrue_meta_security:{captcha_token:o?.captchaToken}},xform:aa})}else if("phone"in e){const{phone:r,password:i,options:o}=e;t=await T(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{phone:r,password:i,gotrue_meta_security:{captcha_token:o?.captchaToken}},xform:aa})}else throw new Ye("You must provide either an email or phone number and a password");const{data:s,error:n}=t;if(n)return this._returnResult({data:{user:null,session:null},error:n});if(!s||!s.session||!s.user){const r=new be;return this._returnResult({data:{user:null,session:null},error:r})}return s.session&&(await this._saveSession(s.session),await this._notifyAllSubscribers("SIGNED_IN",s.session)),this._returnResult({data:Object.assign({user:s.user,session:s.session},s.weak_password?{weakPassword:s.weak_password}:null),error:n})}catch(t){if(x(t))return this._returnResult({data:{user:null,session:null},error:t});throw t}}async signInWithOAuth(e){var t,s,n,r;return await this._handleProviderSignIn(e.provider,{redirectTo:(t=e.options)===null||t===void 0?void 0:t.redirectTo,scopes:(s=e.options)===null||s===void 0?void 0:s.scopes,queryParams:(n=e.options)===null||n===void 0?void 0:n.queryParams,skipBrowserRedirect:(r=e.options)===null||r===void 0?void 0:r.skipBrowserRedirect})}async exchangeCodeForSession(e){return await this.initializePromise,this._acquireLock(this.lockAcquireTimeout,async()=>this._exchangeCodeForSession(e))}async signInWithWeb3(e){const{chain:t}=e;switch(t){case"ethereum":return await this.signInWithEthereum(e);case"solana":return await this.signInWithSolana(e);default:throw new Error(`@supabase/auth-js: Unsupported chain "${t}"`)}}async signInWithEthereum(e){var t,s,n,r,i,o,l,d,c,p,u;let h,m;if("message"in e)h=e.message,m=e.signature;else{const{chain:g,wallet:y,statement:f,options:_}=e;let b;if(z())if(typeof y=="object")b=y;else{const w=window;if("ethereum"in w&&typeof w.ethereum=="object"&&"request"in w.ethereum&&typeof w.ethereum.request=="function")b=w.ethereum;else throw new Error("@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.")}else{if(typeof y!="object"||!_?.url)throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");b=y}const k=new URL((t=_?.url)!==null&&t!==void 0?t:window.location.href),P=await b.request({method:"eth_requestAccounts"}).then(w=>w).catch(()=>{throw new Error("@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid")});if(!P||P.length===0)throw new Error("@supabase/auth-js: No accounts available. Please ensure the wallet is connected.");const A=Da(P[0]);let L=(s=_?.signInWithEthereum)===null||s===void 0?void 0:s.chainId;if(!L){const w=await b.request({method:"eth_chainId"});L=Rn(w)}const H={domain:k.host,address:A,statement:f,uri:k.href,version:"1",chainId:L,nonce:(n=_?.signInWithEthereum)===null||n===void 0?void 0:n.nonce,issuedAt:(i=(r=_?.signInWithEthereum)===null||r===void 0?void 0:r.issuedAt)!==null&&i!==void 0?i:new Date,expirationTime:(o=_?.signInWithEthereum)===null||o===void 0?void 0:o.expirationTime,notBefore:(l=_?.signInWithEthereum)===null||l===void 0?void 0:l.notBefore,requestId:(d=_?.signInWithEthereum)===null||d===void 0?void 0:d.requestId,resources:(c=_?.signInWithEthereum)===null||c===void 0?void 0:c.resources};h=jn(H),m=await b.request({method:"personal_sign",params:[In(h),A]})}try{const{data:g,error:y}=await T(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"ethereum",message:h,signature:m},!((p=e.options)===null||p===void 0)&&p.captchaToken?{gotrue_meta_security:{captcha_token:(u=e.options)===null||u===void 0?void 0:u.captchaToken}}:null),xform:Q});if(y)throw y;if(!g||!g.session||!g.user){const f=new be;return this._returnResult({data:{user:null,session:null},error:f})}return g.session&&(await this._saveSession(g.session),await this._notifyAllSubscribers("SIGNED_IN",g.session)),this._returnResult({data:Object.assign({},g),error:y})}catch(g){if(x(g))return this._returnResult({data:{user:null,session:null},error:g});throw g}}async signInWithSolana(e){var t,s,n,r,i,o,l,d,c,p,u,h;let m,g;if("message"in e)m=e.message,g=e.signature;else{const{chain:y,wallet:f,statement:_,options:b}=e;let k;if(z())if(typeof f=="object")k=f;else{const A=window;if("solana"in A&&typeof A.solana=="object"&&("signIn"in A.solana&&typeof A.solana.signIn=="function"||"signMessage"in A.solana&&typeof A.solana.signMessage=="function"))k=A.solana;else throw new Error("@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.")}else{if(typeof f!="object"||!b?.url)throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");k=f}const P=new URL((t=b?.url)!==null&&t!==void 0?t:window.location.href);if("signIn"in k&&k.signIn){const A=await k.signIn(Object.assign(Object.assign(Object.assign({issuedAt:new Date().toISOString()},b?.signInWithSolana),{version:"1",domain:P.host,uri:P.href}),_?{statement:_}:null));let L;if(Array.isArray(A)&&A[0]&&typeof A[0]=="object")L=A[0];else if(A&&typeof A=="object"&&"signedMessage"in A&&"signature"in A)L=A;else throw new Error("@supabase/auth-js: Wallet method signIn() returned unrecognized value");if("signedMessage"in L&&"signature"in L&&(typeof L.signedMessage=="string"||L.signedMessage instanceof Uint8Array)&&L.signature instanceof Uint8Array)m=typeof L.signedMessage=="string"?L.signedMessage:new TextDecoder().decode(L.signedMessage),g=L.signature;else throw new Error("@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields")}else{if(!("signMessage"in k)||typeof k.signMessage!="function"||!("publicKey"in k)||typeof k!="object"||!k.publicKey||!("toBase58"in k.publicKey)||typeof k.publicKey.toBase58!="function")throw new Error("@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API");m=[`${P.host} wants you to sign in with your Solana account:`,k.publicKey.toBase58(),..._?["",_,""]:[""],"Version: 1",`URI: ${P.href}`,`Issued At: ${(n=(s=b?.signInWithSolana)===null||s===void 0?void 0:s.issuedAt)!==null&&n!==void 0?n:new Date().toISOString()}`,...!((r=b?.signInWithSolana)===null||r===void 0)&&r.notBefore?[`Not Before: ${b.signInWithSolana.notBefore}`]:[],...!((i=b?.signInWithSolana)===null||i===void 0)&&i.expirationTime?[`Expiration Time: ${b.signInWithSolana.expirationTime}`]:[],...!((o=b?.signInWithSolana)===null||o===void 0)&&o.chainId?[`Chain ID: ${b.signInWithSolana.chainId}`]:[],...!((l=b?.signInWithSolana)===null||l===void 0)&&l.nonce?[`Nonce: ${b.signInWithSolana.nonce}`]:[],...!((d=b?.signInWithSolana)===null||d===void 0)&&d.requestId?[`Request ID: ${b.signInWithSolana.requestId}`]:[],...!((p=(c=b?.signInWithSolana)===null||c===void 0?void 0:c.resources)===null||p===void 0)&&p.length?["Resources",...b.signInWithSolana.resources.map(L=>`- ${L}`)]:[]].join(`
`);const A=await k.signMessage(new TextEncoder().encode(m),"utf8");if(!A||!(A instanceof Uint8Array))throw new Error("@supabase/auth-js: Wallet signMessage() API returned an recognized value");g=A}}try{const{data:y,error:f}=await T(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"solana",message:m,signature:ye(g)},!((u=e.options)===null||u===void 0)&&u.captchaToken?{gotrue_meta_security:{captcha_token:(h=e.options)===null||h===void 0?void 0:h.captchaToken}}:null),xform:Q});if(f)throw f;if(!y||!y.session||!y.user){const _=new be;return this._returnResult({data:{user:null,session:null},error:_})}return y.session&&(await this._saveSession(y.session),await this._notifyAllSubscribers("SIGNED_IN",y.session)),this._returnResult({data:Object.assign({},y),error:f})}catch(y){if(x(y))return this._returnResult({data:{user:null,session:null},error:y});throw y}}async _exchangeCodeForSession(e){const t=await ue(this.storage,`${this.storageKey}-code-verifier`),[s,n]=(t??"").split("/");try{if(!s&&this.flowType==="pkce")throw new an;const{data:r,error:i}=await T(this.fetch,"POST",`${this.url}/token?grant_type=pkce`,{headers:this.headers,body:{auth_code:e,code_verifier:s},xform:Q});if(await B(this.storage,`${this.storageKey}-code-verifier`),i)throw i;if(!r||!r.session||!r.user){const o=new be;return this._returnResult({data:{user:null,session:null,redirectType:null},error:o})}return r.session&&(await this._saveSession(r.session),await this._notifyAllSubscribers("SIGNED_IN",r.session)),this._returnResult({data:Object.assign(Object.assign({},r),{redirectType:n??null}),error:i})}catch(r){if(await B(this.storage,`${this.storageKey}-code-verifier`),x(r))return this._returnResult({data:{user:null,session:null,redirectType:null},error:r});throw r}}async signInWithIdToken(e){try{const{options:t,provider:s,token:n,access_token:r,nonce:i}=e,o=await T(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,body:{provider:s,id_token:n,access_token:r,nonce:i,gotrue_meta_security:{captcha_token:t?.captchaToken}},xform:Q}),{data:l,error:d}=o;if(d)return this._returnResult({data:{user:null,session:null},error:d});if(!l||!l.session||!l.user){const c=new be;return this._returnResult({data:{user:null,session:null},error:c})}return l.session&&(await this._saveSession(l.session),await this._notifyAllSubscribers("SIGNED_IN",l.session)),this._returnResult({data:l,error:d})}catch(t){if(x(t))return this._returnResult({data:{user:null,session:null},error:t});throw t}}async signInWithOtp(e){var t,s,n,r,i;try{if("email"in e){const{email:o,options:l}=e;let d=null,c=null;this.flowType==="pkce"&&([d,c]=await we(this.storage,this.storageKey));const{error:p}=await T(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{email:o,data:(t=l?.data)!==null&&t!==void 0?t:{},create_user:(s=l?.shouldCreateUser)!==null&&s!==void 0?s:!0,gotrue_meta_security:{captcha_token:l?.captchaToken},code_challenge:d,code_challenge_method:c},redirectTo:l?.emailRedirectTo});return this._returnResult({data:{user:null,session:null},error:p})}if("phone"in e){const{phone:o,options:l}=e,{data:d,error:c}=await T(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{phone:o,data:(n=l?.data)!==null&&n!==void 0?n:{},create_user:(r=l?.shouldCreateUser)!==null&&r!==void 0?r:!0,gotrue_meta_security:{captcha_token:l?.captchaToken},channel:(i=l?.channel)!==null&&i!==void 0?i:"sms"}});return this._returnResult({data:{user:null,session:null,messageId:d?.message_id},error:c})}throw new Ye("You must provide either an email or phone number.")}catch(o){if(await B(this.storage,`${this.storageKey}-code-verifier`),x(o))return this._returnResult({data:{user:null,session:null},error:o});throw o}}async verifyOtp(e){var t,s;try{let n,r;"options"in e&&(n=(t=e.options)===null||t===void 0?void 0:t.redirectTo,r=(s=e.options)===null||s===void 0?void 0:s.captchaToken);const{data:i,error:o}=await T(this.fetch,"POST",`${this.url}/verify`,{headers:this.headers,body:Object.assign(Object.assign({},e),{gotrue_meta_security:{captcha_token:r}}),redirectTo:n,xform:Q});if(o)throw o;if(!i)throw new Error("An error occurred on token verification.");const l=i.session,d=i.user;return l?.access_token&&(await this._saveSession(l),await this._notifyAllSubscribers(e.type=="recovery"?"PASSWORD_RECOVERY":"SIGNED_IN",l)),this._returnResult({data:{user:d,session:l},error:null})}catch(n){if(x(n))return this._returnResult({data:{user:null,session:null},error:n});throw n}}async signInWithSSO(e){var t,s,n,r,i;try{let o=null,l=null;this.flowType==="pkce"&&([o,l]=await we(this.storage,this.storageKey));const d=await T(this.fetch,"POST",`${this.url}/sso`,{body:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},"providerId"in e?{provider_id:e.providerId}:null),"domain"in e?{domain:e.domain}:null),{redirect_to:(s=(t=e.options)===null||t===void 0?void 0:t.redirectTo)!==null&&s!==void 0?s:void 0}),!((n=e?.options)===null||n===void 0)&&n.captchaToken?{gotrue_meta_security:{captcha_token:e.options.captchaToken}}:null),{skip_http_redirect:!0,code_challenge:o,code_challenge_method:l}),headers:this.headers,xform:An});return!((r=d.data)===null||r===void 0)&&r.url&&z()&&!(!((i=e.options)===null||i===void 0)&&i.skipBrowserRedirect)&&window.location.assign(d.data.url),this._returnResult(d)}catch(o){if(await B(this.storage,`${this.storageKey}-code-verifier`),x(o))return this._returnResult({data:null,error:o});throw o}}async reauthenticate(){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._reauthenticate())}async _reauthenticate(){try{return await this._useSession(async e=>{const{data:{session:t},error:s}=e;if(s)throw s;if(!t)throw new V;const{error:n}=await T(this.fetch,"GET",`${this.url}/reauthenticate`,{headers:this.headers,jwt:t.access_token});return this._returnResult({data:{user:null,session:null},error:n})})}catch(e){if(x(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async resend(e){try{const t=`${this.url}/resend`;if("email"in e){const{email:s,type:n,options:r}=e,{error:i}=await T(this.fetch,"POST",t,{headers:this.headers,body:{email:s,type:n,gotrue_meta_security:{captcha_token:r?.captchaToken}},redirectTo:r?.emailRedirectTo});return this._returnResult({data:{user:null,session:null},error:i})}else if("phone"in e){const{phone:s,type:n,options:r}=e,{data:i,error:o}=await T(this.fetch,"POST",t,{headers:this.headers,body:{phone:s,type:n,gotrue_meta_security:{captcha_token:r?.captchaToken}}});return this._returnResult({data:{user:null,session:null,messageId:i?.message_id},error:o})}throw new Ye("You must provide either an email or phone number and a type")}catch(t){if(x(t))return this._returnResult({data:{user:null,session:null},error:t});throw t}}async getSession(){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>this._useSession(async t=>t))}async _acquireLock(e,t){this._debug("#_acquireLock","begin",e);try{if(this.lockAcquired){const s=this.pendingInLock.length?this.pendingInLock[this.pendingInLock.length-1]:Promise.resolve(),n=(async()=>(await s,await t()))();return this.pendingInLock.push((async()=>{try{await n}catch{}})()),n}return await this.lock(`lock:${this.storageKey}`,e,async()=>{this._debug("#_acquireLock","lock acquired for storage key",this.storageKey);try{this.lockAcquired=!0;const s=t();for(this.pendingInLock.push((async()=>{try{await s}catch{}})()),await s;this.pendingInLock.length;){const n=[...this.pendingInLock];await Promise.all(n),this.pendingInLock.splice(0,n.length)}return await s}finally{this._debug("#_acquireLock","lock released for storage key",this.storageKey),this.lockAcquired=!1}})}finally{this._debug("#_acquireLock","end")}}async _useSession(e){this._debug("#_useSession","begin");try{const t=await this.__loadSession();return await e(t)}finally{this._debug("#_useSession","end")}}async __loadSession(){this._debug("#__loadSession()","begin"),this.lockAcquired||this._debug("#__loadSession()","used outside of an acquired lock!",new Error().stack);try{let e=null;const t=await ue(this.storage,this.storageKey);if(this._debug("#getSession()","session from storage",t),t!==null&&(this._isValidSession(t)?e=t:(this._debug("#getSession()","session from storage is not valid"),await this._removeSession())),!e)return{data:{session:null},error:null};const s=e.expires_at?e.expires_at*1e3-Date.now()<pt:!1;if(this._debug("#__loadSession()",`session has${s?"":" not"} expired`,"expires_at",e.expires_at),!s){if(this.userStorage){const i=await ue(this.userStorage,this.storageKey+"-user");i?.user?e.user=i.user:e.user=gt()}if(this.storage.isServer&&e.user&&!e.user.__isUserNotAvailableProxy){const i={value:this.suppressGetSessionWarning};e.user=kn(e.user,i),i.value&&(this.suppressGetSessionWarning=!0)}return{data:{session:e},error:null}}const{data:n,error:r}=await this._callRefreshToken(e.refresh_token);return r?this._returnResult({data:{session:null},error:r}):this._returnResult({data:{session:n},error:null})}finally{this._debug("#__loadSession()","end")}}async getUser(e){if(e)return await this._getUser(e);await this.initializePromise;const t=await this._acquireLock(this.lockAcquireTimeout,async()=>await this._getUser());return t.data.user&&(this.suppressGetSessionWarning=!0),t}async _getUser(e){try{return e?await T(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:e,xform:le}):await this._useSession(async t=>{var s,n,r;const{data:i,error:o}=t;if(o)throw o;return!(!((s=i.session)===null||s===void 0)&&s.access_token)&&!this.hasCustomAuthorizationHeader?{data:{user:null},error:new V}:await T(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:(r=(n=i.session)===null||n===void 0?void 0:n.access_token)!==null&&r!==void 0?r:void 0,xform:le})})}catch(t){if(x(t))return ht(t)&&(await this._removeSession(),await B(this.storage,`${this.storageKey}-code-verifier`)),this._returnResult({data:{user:null},error:t});throw t}}async updateUser(e,t={}){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._updateUser(e,t))}async _updateUser(e,t={}){try{return await this._useSession(async s=>{const{data:n,error:r}=s;if(r)throw r;if(!n.session)throw new V;const i=n.session;let o=null,l=null;this.flowType==="pkce"&&e.email!=null&&([o,l]=await we(this.storage,this.storageKey));const{data:d,error:c}=await T(this.fetch,"PUT",`${this.url}/user`,{headers:this.headers,redirectTo:t?.emailRedirectTo,body:Object.assign(Object.assign({},e),{code_challenge:o,code_challenge_method:l}),jwt:i.access_token,xform:le});if(c)throw c;return i.user=d.user,await this._saveSession(i),await this._notifyAllSubscribers("USER_UPDATED",i),this._returnResult({data:{user:i.user},error:null})})}catch(s){if(await B(this.storage,`${this.storageKey}-code-verifier`),x(s))return this._returnResult({data:{user:null},error:s});throw s}}async setSession(e){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._setSession(e))}async _setSession(e){try{if(!e.access_token||!e.refresh_token)throw new V;const t=Date.now()/1e3;let s=t,n=!0,r=null;const{payload:i}=Qe(e.access_token);if(i.exp&&(s=i.exp,n=s<=t),n){const{data:o,error:l}=await this._callRefreshToken(e.refresh_token);if(l)return this._returnResult({data:{user:null,session:null},error:l});if(!o)return{data:{user:null,session:null},error:null};r=o}else{const{data:o,error:l}=await this._getUser(e.access_token);if(l)return this._returnResult({data:{user:null,session:null},error:l});r={access_token:e.access_token,refresh_token:e.refresh_token,user:o.user,token_type:"bearer",expires_in:s-t,expires_at:s},await this._saveSession(r),await this._notifyAllSubscribers("SIGNED_IN",r)}return this._returnResult({data:{user:r.user,session:r},error:null})}catch(t){if(x(t))return this._returnResult({data:{session:null,user:null},error:t});throw t}}async refreshSession(e){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._refreshSession(e))}async _refreshSession(e){try{return await this._useSession(async t=>{var s;if(!e){const{data:i,error:o}=t;if(o)throw o;e=(s=i.session)!==null&&s!==void 0?s:void 0}if(!e?.refresh_token)throw new V;const{data:n,error:r}=await this._callRefreshToken(e.refresh_token);return r?this._returnResult({data:{user:null,session:null},error:r}):n?this._returnResult({data:{user:n.user,session:n},error:null}):this._returnResult({data:{user:null,session:null},error:null})})}catch(t){if(x(t))return this._returnResult({data:{user:null,session:null},error:t});throw t}}async _getSessionFromURL(e,t){try{if(!z())throw new Xe("No browser detected.");if(e.error||e.error_description||e.error_code)throw new Xe(e.error_description||"Error in URL with unspecified error_description",{error:e.error||"unspecified_error",code:e.error_code||"unspecified_code"});switch(t){case"implicit":if(this.flowType==="pkce")throw new Jt("Not a valid PKCE flow url.");break;case"pkce":if(this.flowType==="implicit")throw new Xe("Not a valid implicit grant flow url.");break;default:}if(t==="pkce"){if(this._debug("#_initialize()","begin","is PKCE flow",!0),!e.code)throw new Jt("No code detected.");const{data:_,error:b}=await this._exchangeCodeForSession(e.code);if(b)throw b;const k=new URL(window.location.href);return k.searchParams.delete("code"),window.history.replaceState(window.history.state,"",k.toString()),{data:{session:_.session,redirectType:null},error:null}}const{provider_token:s,provider_refresh_token:n,access_token:r,refresh_token:i,expires_in:o,expires_at:l,token_type:d}=e;if(!r||!o||!i||!d)throw new Xe("No session defined in URL");const c=Math.round(Date.now()/1e3),p=parseInt(o);let u=c+p;l&&(u=parseInt(l));const h=u-c;h*1e3<=$e&&console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${h}s, should have been closer to ${p}s`);const m=u-p;c-m>=120?console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale",m,u,c):c-m<0&&console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew",m,u,c);const{data:g,error:y}=await this._getUser(r);if(y)throw y;const f={provider_token:s,provider_refresh_token:n,access_token:r,expires_in:p,expires_at:u,refresh_token:i,token_type:d,user:g.user};return window.location.hash="",this._debug("#_getSessionFromURL()","clearing window.location.hash"),this._returnResult({data:{session:f,redirectType:e.type},error:null})}catch(s){if(x(s))return this._returnResult({data:{session:null,redirectType:null},error:s});throw s}}_isImplicitGrantCallback(e){return typeof this.detectSessionInUrl=="function"?this.detectSessionInUrl(new URL(window.location.href),e):!!(e.access_token||e.error_description)}async _isPKCECallback(e){const t=await ue(this.storage,`${this.storageKey}-code-verifier`);return!!(e.code&&t)}async signOut(e={scope:"global"}){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._signOut(e))}async _signOut({scope:e}={scope:"global"}){return await this._useSession(async t=>{var s;const{data:n,error:r}=t;if(r&&!ht(r))return this._returnResult({error:r});const i=(s=n.session)===null||s===void 0?void 0:s.access_token;if(i){const{error:o}=await this.admin.signOut(i,e);if(o&&!(en(o)&&(o.status===404||o.status===401||o.status===403)||ht(o)))return this._returnResult({error:o})}return e!=="others"&&(await this._removeSession(),await B(this.storage,`${this.storageKey}-code-verifier`)),this._returnResult({error:null})})}onAuthStateChange(e){const t=cn(),s={id:t,callback:e,unsubscribe:()=>{this._debug("#unsubscribe()","state change callback with id removed",t),this.stateChangeEmitters.delete(t)}};return this._debug("#onAuthStateChange()","registered callback with id",t),this.stateChangeEmitters.set(t,s),(async()=>(await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>{this._emitInitialSession(t)})))(),{data:{subscription:s}}}async _emitInitialSession(e){return await this._useSession(async t=>{var s,n;try{const{data:{session:r},error:i}=t;if(i)throw i;await((s=this.stateChangeEmitters.get(e))===null||s===void 0?void 0:s.callback("INITIAL_SESSION",r)),this._debug("INITIAL_SESSION","callback id",e,"session",r)}catch(r){await((n=this.stateChangeEmitters.get(e))===null||n===void 0?void 0:n.callback("INITIAL_SESSION",null)),this._debug("INITIAL_SESSION","callback id",e,"error",r),console.error(r)}})}async resetPasswordForEmail(e,t={}){let s=null,n=null;this.flowType==="pkce"&&([s,n]=await we(this.storage,this.storageKey,!0));try{return await T(this.fetch,"POST",`${this.url}/recover`,{body:{email:e,code_challenge:s,code_challenge_method:n,gotrue_meta_security:{captcha_token:t.captchaToken}},headers:this.headers,redirectTo:t.redirectTo})}catch(r){if(await B(this.storage,`${this.storageKey}-code-verifier`),x(r))return this._returnResult({data:null,error:r});throw r}}async getUserIdentities(){var e;try{const{data:t,error:s}=await this.getUser();if(s)throw s;return this._returnResult({data:{identities:(e=t.user.identities)!==null&&e!==void 0?e:[]},error:null})}catch(t){if(x(t))return this._returnResult({data:null,error:t});throw t}}async linkIdentity(e){return"token"in e?this.linkIdentityIdToken(e):this.linkIdentityOAuth(e)}async linkIdentityOAuth(e){var t;try{const{data:s,error:n}=await this._useSession(async r=>{var i,o,l,d,c;const{data:p,error:u}=r;if(u)throw u;const h=await this._getUrlForProvider(`${this.url}/user/identities/authorize`,e.provider,{redirectTo:(i=e.options)===null||i===void 0?void 0:i.redirectTo,scopes:(o=e.options)===null||o===void 0?void 0:o.scopes,queryParams:(l=e.options)===null||l===void 0?void 0:l.queryParams,skipBrowserRedirect:!0});return await T(this.fetch,"GET",h,{headers:this.headers,jwt:(c=(d=p.session)===null||d===void 0?void 0:d.access_token)!==null&&c!==void 0?c:void 0})});if(n)throw n;return z()&&!(!((t=e.options)===null||t===void 0)&&t.skipBrowserRedirect)&&window.location.assign(s?.url),this._returnResult({data:{provider:e.provider,url:s?.url},error:null})}catch(s){if(x(s))return this._returnResult({data:{provider:e.provider,url:null},error:s});throw s}}async linkIdentityIdToken(e){return await this._useSession(async t=>{var s;try{const{error:n,data:{session:r}}=t;if(n)throw n;const{options:i,provider:o,token:l,access_token:d,nonce:c}=e,p=await T(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,jwt:(s=r?.access_token)!==null&&s!==void 0?s:void 0,body:{provider:o,id_token:l,access_token:d,nonce:c,link_identity:!0,gotrue_meta_security:{captcha_token:i?.captchaToken}},xform:Q}),{data:u,error:h}=p;return h?this._returnResult({data:{user:null,session:null},error:h}):!u||!u.session||!u.user?this._returnResult({data:{user:null,session:null},error:new be}):(u.session&&(await this._saveSession(u.session),await this._notifyAllSubscribers("USER_UPDATED",u.session)),this._returnResult({data:u,error:h}))}catch(n){if(await B(this.storage,`${this.storageKey}-code-verifier`),x(n))return this._returnResult({data:{user:null,session:null},error:n});throw n}})}async unlinkIdentity(e){try{return await this._useSession(async t=>{var s,n;const{data:r,error:i}=t;if(i)throw i;return await T(this.fetch,"DELETE",`${this.url}/user/identities/${e.identity_id}`,{headers:this.headers,jwt:(n=(s=r.session)===null||s===void 0?void 0:s.access_token)!==null&&n!==void 0?n:void 0})})}catch(t){if(x(t))return this._returnResult({data:null,error:t});throw t}}async _refreshAccessToken(e){const t=`#_refreshAccessToken(${e.substring(0,5)}...)`;this._debug(t,"begin");try{const s=Date.now();return await mn(async n=>(n>0&&await hn(200*Math.pow(2,n-1)),this._debug(t,"refreshing attempt",n),await T(this.fetch,"POST",`${this.url}/token?grant_type=refresh_token`,{body:{refresh_token:e},headers:this.headers,xform:Q})),(n,r)=>{const i=200*Math.pow(2,n);return r&&mt(r)&&Date.now()+i-s<$e})}catch(s){if(this._debug(t,"error",s),x(s))return this._returnResult({data:{session:null,user:null},error:s});throw s}finally{this._debug(t,"end")}}_isValidSession(e){return typeof e=="object"&&e!==null&&"access_token"in e&&"refresh_token"in e&&"expires_at"in e}async _handleProviderSignIn(e,t){const s=await this._getUrlForProvider(`${this.url}/authorize`,e,{redirectTo:t.redirectTo,scopes:t.scopes,queryParams:t.queryParams});return this._debug("#_handleProviderSignIn()","provider",e,"options",t,"url",s),z()&&!t.skipBrowserRedirect&&window.location.assign(s),{data:{provider:e,url:s},error:null}}async _recoverAndRefresh(){var e,t;const s="#_recoverAndRefresh()";this._debug(s,"begin");try{const n=await ue(this.storage,this.storageKey);if(n&&this.userStorage){let i=await ue(this.userStorage,this.storageKey+"-user");!this.storage.isServer&&Object.is(this.storage,this.userStorage)&&!i&&(i={user:n.user},await Te(this.userStorage,this.storageKey+"-user",i)),n.user=(e=i?.user)!==null&&e!==void 0?e:gt()}else if(n&&!n.user&&!n.user){const i=await ue(this.storage,this.storageKey+"-user");i&&i?.user?(n.user=i.user,await B(this.storage,this.storageKey+"-user"),await Te(this.storage,this.storageKey,n)):n.user=gt()}if(this._debug(s,"session from storage",n),!this._isValidSession(n)){this._debug(s,"session is not valid"),n!==null&&await this._removeSession();return}const r=((t=n.expires_at)!==null&&t!==void 0?t:1/0)*1e3-Date.now()<pt;if(this._debug(s,`session has${r?"":" not"} expired with margin of ${pt}s`),r){if(this.autoRefreshToken&&n.refresh_token){const{error:i}=await this._callRefreshToken(n.refresh_token);i&&(console.error(i),mt(i)||(this._debug(s,"refresh failed with a non-retryable error, removing the session",i),await this._removeSession()))}}else if(n.user&&n.user.__isUserNotAvailableProxy===!0)try{const{data:i,error:o}=await this._getUser(n.access_token);!o&&i?.user?(n.user=i.user,await this._saveSession(n),await this._notifyAllSubscribers("SIGNED_IN",n)):this._debug(s,"could not get user data, skipping SIGNED_IN notification")}catch(i){console.error("Error getting user data:",i),this._debug(s,"error getting user data, skipping SIGNED_IN notification",i)}else await this._notifyAllSubscribers("SIGNED_IN",n)}catch(n){this._debug(s,"error",n),console.error(n);return}finally{this._debug(s,"end")}}async _callRefreshToken(e){var t,s;if(!e)throw new V;if(this.refreshingDeferred)return this.refreshingDeferred.promise;const n=`#_callRefreshToken(${e.substring(0,5)}...)`;this._debug(n,"begin");try{this.refreshingDeferred=new lt;const{data:r,error:i}=await this._refreshAccessToken(e);if(i)throw i;if(!r.session)throw new V;await this._saveSession(r.session),await this._notifyAllSubscribers("TOKEN_REFRESHED",r.session);const o={data:r.session,error:null};return this.refreshingDeferred.resolve(o),o}catch(r){if(this._debug(n,"error",r),x(r)){const i={data:null,error:r};return mt(r)||await this._removeSession(),(t=this.refreshingDeferred)===null||t===void 0||t.resolve(i),i}throw(s=this.refreshingDeferred)===null||s===void 0||s.reject(r),r}finally{this.refreshingDeferred=null,this._debug(n,"end")}}async _notifyAllSubscribers(e,t,s=!0){const n=`#_notifyAllSubscribers(${e})`;this._debug(n,"begin",t,`broadcast = ${s}`);try{this.broadcastChannel&&s&&this.broadcastChannel.postMessage({event:e,session:t});const r=[],i=Array.from(this.stateChangeEmitters.values()).map(async o=>{try{await o.callback(e,t)}catch(l){r.push(l)}});if(await Promise.all(i),r.length>0){for(let o=0;o<r.length;o+=1)console.error(r[o]);throw r[0]}}finally{this._debug(n,"end")}}async _saveSession(e){this._debug("#_saveSession()",e),this.suppressGetSessionWarning=!0,await B(this.storage,`${this.storageKey}-code-verifier`);const t=Object.assign({},e),s=t.user&&t.user.__isUserNotAvailableProxy===!0;if(this.userStorage){!s&&t.user&&await Te(this.userStorage,this.storageKey+"-user",{user:t.user});const n=Object.assign({},t);delete n.user;const r=ea(n);await Te(this.storage,this.storageKey,r)}else{const n=ea(t);await Te(this.storage,this.storageKey,n)}}async _removeSession(){this._debug("#_removeSession()"),this.suppressGetSessionWarning=!1,await B(this.storage,this.storageKey),await B(this.storage,this.storageKey+"-code-verifier"),await B(this.storage,this.storageKey+"-user"),this.userStorage&&await B(this.userStorage,this.storageKey+"-user"),await this._notifyAllSubscribers("SIGNED_OUT",null)}_removeVisibilityChangedCallback(){this._debug("#_removeVisibilityChangedCallback()");const e=this.visibilityChangedCallback;this.visibilityChangedCallback=null;try{e&&z()&&window?.removeEventListener&&window.removeEventListener("visibilitychange",e)}catch(t){console.error("removing visibilitychange callback failed",t)}}async _startAutoRefresh(){await this._stopAutoRefresh(),this._debug("#_startAutoRefresh()");const e=setInterval(()=>this._autoRefreshTokenTick(),$e);this.autoRefreshTicker=e,e&&typeof e=="object"&&typeof e.unref=="function"?e.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(e);const t=setTimeout(async()=>{await this.initializePromise,await this._autoRefreshTokenTick()},0);this.autoRefreshTickTimeout=t,t&&typeof t=="object"&&typeof t.unref=="function"?t.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(t)}async _stopAutoRefresh(){this._debug("#_stopAutoRefresh()");const e=this.autoRefreshTicker;this.autoRefreshTicker=null,e&&clearInterval(e);const t=this.autoRefreshTickTimeout;this.autoRefreshTickTimeout=null,t&&clearTimeout(t)}async startAutoRefresh(){this._removeVisibilityChangedCallback(),await this._startAutoRefresh()}async stopAutoRefresh(){this._removeVisibilityChangedCallback(),await this._stopAutoRefresh()}async _autoRefreshTokenTick(){this._debug("#_autoRefreshTokenTick()","begin");try{await this._acquireLock(0,async()=>{try{const e=Date.now();try{return await this._useSession(async t=>{const{data:{session:s}}=t;if(!s||!s.refresh_token||!s.expires_at){this._debug("#_autoRefreshTokenTick()","no session");return}const n=Math.floor((s.expires_at*1e3-e)/$e);this._debug("#_autoRefreshTokenTick()",`access token expires in ${n} ticks, a tick lasts ${$e}ms, refresh threshold is ${Tt} ticks`),n<=Tt&&await this._callRefreshToken(s.refresh_token)})}catch(t){console.error("Auto refresh tick failed with error. This is likely a transient error.",t)}}finally{this._debug("#_autoRefreshTokenTick()","end")}})}catch(e){if(e.isAcquireTimeout||e instanceof Aa)this._debug("auto refresh token tick lock not available");else throw e}}async _handleVisibilityChange(){if(this._debug("#_handleVisibilityChange()"),!z()||!window?.addEventListener)return this.autoRefreshToken&&this.startAutoRefresh(),!1;try{this.visibilityChangedCallback=async()=>{try{await this._onVisibilityChanged(!1)}catch(e){this._debug("#visibilityChangedCallback","error",e)}},window?.addEventListener("visibilitychange",this.visibilityChangedCallback),await this._onVisibilityChanged(!0)}catch(e){console.error("_handleVisibilityChange",e)}}async _onVisibilityChanged(e){const t=`#_onVisibilityChanged(${e})`;this._debug(t,"visibilityState",document.visibilityState),document.visibilityState==="visible"?(this.autoRefreshToken&&this._startAutoRefresh(),e||(await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>{if(document.visibilityState!=="visible"){this._debug(t,"acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");return}await this._recoverAndRefresh()}))):document.visibilityState==="hidden"&&this.autoRefreshToken&&this._stopAutoRefresh()}async _getUrlForProvider(e,t,s){const n=[`provider=${encodeURIComponent(t)}`];if(s?.redirectTo&&n.push(`redirect_to=${encodeURIComponent(s.redirectTo)}`),s?.scopes&&n.push(`scopes=${encodeURIComponent(s.scopes)}`),this.flowType==="pkce"){const[r,i]=await we(this.storage,this.storageKey),o=new URLSearchParams({code_challenge:`${encodeURIComponent(r)}`,code_challenge_method:`${encodeURIComponent(i)}`});n.push(o.toString())}if(s?.queryParams){const r=new URLSearchParams(s.queryParams);n.push(r.toString())}return s?.skipBrowserRedirect&&n.push(`skip_http_redirect=${s.skipBrowserRedirect}`),`${e}?${n.join("&")}`}async _unenroll(e){try{return await this._useSession(async t=>{var s;const{data:n,error:r}=t;return r?this._returnResult({data:null,error:r}):await T(this.fetch,"DELETE",`${this.url}/factors/${e.factorId}`,{headers:this.headers,jwt:(s=n?.session)===null||s===void 0?void 0:s.access_token})})}catch(t){if(x(t))return this._returnResult({data:null,error:t});throw t}}async _enroll(e){try{return await this._useSession(async t=>{var s,n;const{data:r,error:i}=t;if(i)return this._returnResult({data:null,error:i});const o=Object.assign({friendly_name:e.friendlyName,factor_type:e.factorType},e.factorType==="phone"?{phone:e.phone}:e.factorType==="totp"?{issuer:e.issuer}:{}),{data:l,error:d}=await T(this.fetch,"POST",`${this.url}/factors`,{body:o,headers:this.headers,jwt:(s=r?.session)===null||s===void 0?void 0:s.access_token});return d?this._returnResult({data:null,error:d}):(e.factorType==="totp"&&l.type==="totp"&&(!((n=l?.totp)===null||n===void 0)&&n.qr_code)&&(l.totp.qr_code=`data:image/svg+xml;utf-8,${l.totp.qr_code}`),this._returnResult({data:l,error:null}))})}catch(t){if(x(t))return this._returnResult({data:null,error:t});throw t}}async _verify(e){return this._acquireLock(this.lockAcquireTimeout,async()=>{try{return await this._useSession(async t=>{var s;const{data:n,error:r}=t;if(r)return this._returnResult({data:null,error:r});const i=Object.assign({challenge_id:e.challengeId},"webauthn"in e?{webauthn:Object.assign(Object.assign({},e.webauthn),{credential_response:e.webauthn.type==="create"?zn(e.webauthn.credential_response):Fn(e.webauthn.credential_response)})}:{code:e.code}),{data:o,error:l}=await T(this.fetch,"POST",`${this.url}/factors/${e.factorId}/verify`,{body:i,headers:this.headers,jwt:(s=n?.session)===null||s===void 0?void 0:s.access_token});return l?this._returnResult({data:null,error:l}):(await this._saveSession(Object.assign({expires_at:Math.round(Date.now()/1e3)+o.expires_in},o)),await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED",o),this._returnResult({data:o,error:l}))})}catch(t){if(x(t))return this._returnResult({data:null,error:t});throw t}})}async _challenge(e){return this._acquireLock(this.lockAcquireTimeout,async()=>{try{return await this._useSession(async t=>{var s;const{data:n,error:r}=t;if(r)return this._returnResult({data:null,error:r});const i=await T(this.fetch,"POST",`${this.url}/factors/${e.factorId}/challenge`,{body:e,headers:this.headers,jwt:(s=n?.session)===null||s===void 0?void 0:s.access_token});if(i.error)return i;const{data:o}=i;if(o.type!=="webauthn")return{data:o,error:null};switch(o.webauthn.type){case"create":return{data:Object.assign(Object.assign({},o),{webauthn:Object.assign(Object.assign({},o.webauthn),{credential_options:Object.assign(Object.assign({},o.webauthn.credential_options),{publicKey:Hn(o.webauthn.credential_options.publicKey)})})}),error:null};case"request":return{data:Object.assign(Object.assign({},o),{webauthn:Object.assign(Object.assign({},o.webauthn),{credential_options:Object.assign(Object.assign({},o.webauthn.credential_options),{publicKey:Bn(o.webauthn.credential_options.publicKey)})})}),error:null}}})}catch(t){if(x(t))return this._returnResult({data:null,error:t});throw t}})}async _challengeAndVerify(e){const{data:t,error:s}=await this._challenge({factorId:e.factorId});return s?this._returnResult({data:null,error:s}):await this._verify({factorId:e.factorId,challengeId:t.id,code:e.code})}async _listFactors(){var e;const{data:{user:t},error:s}=await this.getUser();if(s)return{data:null,error:s};const n={all:[],phone:[],totp:[],webauthn:[]};for(const r of(e=t?.factors)!==null&&e!==void 0?e:[])n.all.push(r),r.status==="verified"&&n[r.factor_type].push(r);return{data:n,error:null}}async _getAuthenticatorAssuranceLevel(e){var t,s,n,r;if(e)try{const{payload:h}=Qe(e);let m=null;h.aal&&(m=h.aal);let g=m;const{data:{user:y},error:f}=await this.getUser(e);if(f)return this._returnResult({data:null,error:f});((s=(t=y?.factors)===null||t===void 0?void 0:t.filter(k=>k.status==="verified"))!==null&&s!==void 0?s:[]).length>0&&(g="aal2");const b=h.amr||[];return{data:{currentLevel:m,nextLevel:g,currentAuthenticationMethods:b},error:null}}catch(h){if(x(h))return this._returnResult({data:null,error:h});throw h}const{data:{session:i},error:o}=await this.getSession();if(o)return this._returnResult({data:null,error:o});if(!i)return{data:{currentLevel:null,nextLevel:null,currentAuthenticationMethods:[]},error:null};const{payload:l}=Qe(i.access_token);let d=null;l.aal&&(d=l.aal);let c=d;((r=(n=i.user.factors)===null||n===void 0?void 0:n.filter(h=>h.status==="verified"))!==null&&r!==void 0?r:[]).length>0&&(c="aal2");const u=l.amr||[];return{data:{currentLevel:d,nextLevel:c,currentAuthenticationMethods:u},error:null}}async _getAuthorizationDetails(e){try{return await this._useSession(async t=>{const{data:{session:s},error:n}=t;return n?this._returnResult({data:null,error:n}):s?await T(this.fetch,"GET",`${this.url}/oauth/authorizations/${e}`,{headers:this.headers,jwt:s.access_token,xform:r=>({data:r,error:null})}):this._returnResult({data:null,error:new V})})}catch(t){if(x(t))return this._returnResult({data:null,error:t});throw t}}async _approveAuthorization(e,t){try{return await this._useSession(async s=>{const{data:{session:n},error:r}=s;if(r)return this._returnResult({data:null,error:r});if(!n)return this._returnResult({data:null,error:new V});const i=await T(this.fetch,"POST",`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:n.access_token,body:{action:"approve"},xform:o=>({data:o,error:null})});return i.data&&i.data.redirect_url&&z()&&!t?.skipBrowserRedirect&&window.location.assign(i.data.redirect_url),i})}catch(s){if(x(s))return this._returnResult({data:null,error:s});throw s}}async _denyAuthorization(e,t){try{return await this._useSession(async s=>{const{data:{session:n},error:r}=s;if(r)return this._returnResult({data:null,error:r});if(!n)return this._returnResult({data:null,error:new V});const i=await T(this.fetch,"POST",`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:n.access_token,body:{action:"deny"},xform:o=>({data:o,error:null})});return i.data&&i.data.redirect_url&&z()&&!t?.skipBrowserRedirect&&window.location.assign(i.data.redirect_url),i})}catch(s){if(x(s))return this._returnResult({data:null,error:s});throw s}}async _listOAuthGrants(){try{return await this._useSession(async e=>{const{data:{session:t},error:s}=e;return s?this._returnResult({data:null,error:s}):t?await T(this.fetch,"GET",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:t.access_token,xform:n=>({data:n,error:null})}):this._returnResult({data:null,error:new V})})}catch(e){if(x(e))return this._returnResult({data:null,error:e});throw e}}async _revokeOAuthGrant(e){try{return await this._useSession(async t=>{const{data:{session:s},error:n}=t;return n?this._returnResult({data:null,error:n}):s?(await T(this.fetch,"DELETE",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:s.access_token,query:{client_id:e.clientId},noResolveJson:!0}),{data:{},error:null}):this._returnResult({data:null,error:new V})})}catch(t){if(x(t))return this._returnResult({data:null,error:t});throw t}}async fetchJwk(e,t={keys:[]}){let s=t.keys.find(o=>o.kid===e);if(s)return s;const n=Date.now();if(s=this.jwks.keys.find(o=>o.kid===e),s&&this.jwks_cached_at+Qs>n)return s;const{data:r,error:i}=await T(this.fetch,"GET",`${this.url}/.well-known/jwks.json`,{headers:this.headers});if(i)throw i;return!r.keys||r.keys.length===0||(this.jwks=r,this.jwks_cached_at=n,s=r.keys.find(o=>o.kid===e),!s)?null:s}async getClaims(e,t={}){try{let s=e;if(!s){const{data:h,error:m}=await this.getSession();if(m||!h.session)return this._returnResult({data:null,error:m});s=h.session.access_token}const{header:n,payload:r,signature:i,raw:{header:o,payload:l}}=Qe(s);t?.allowExpired||_n(r.exp);const d=!n.alg||n.alg.startsWith("HS")||!n.kid||!("crypto"in globalThis&&"subtle"in globalThis.crypto)?null:await this.fetchJwk(n.kid,t?.keys?{keys:t.keys}:t?.jwks);if(!d){const{error:h}=await this.getUser(s);if(h)throw h;return{data:{claims:r,header:n,signature:i},error:null}}const c=xn(n.alg),p=await crypto.subtle.importKey("jwk",d,c,!0,["verify"]);if(!await crypto.subtle.verify(c,p,i,ln(`${o}.${l}`)))throw new Ct("Invalid JWT signature");return{data:{claims:r,header:n,signature:i},error:null}}catch(s){if(x(s))return this._returnResult({data:null,error:s});throw s}}}ze.nextInstanceID={};const Zn=ze,er="2.97.0";let Pe="";typeof Deno<"u"?Pe="deno":typeof document<"u"?Pe="web":typeof navigator<"u"&&navigator.product==="ReactNative"?Pe="react-native":Pe="node";const tr={"X-Client-Info":`supabase-js-${Pe}/${er}`},ar={headers:tr},sr={schema:"public"},nr={autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,flowType:"implicit"},rr={};function Fe(a){"@babel/helpers - typeof";return Fe=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Fe(a)}function ir(a,e){if(Fe(a)!="object"||!a)return a;var t=a[Symbol.toPrimitive];if(t!==void 0){var s=t.call(a,e);if(Fe(s)!="object")return s;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(a)}function or(a){var e=ir(a,"string");return Fe(e)=="symbol"?e:e+""}function lr(a,e,t){return(e=or(e))in a?Object.defineProperty(a,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):a[e]=t,a}function la(a,e){var t=Object.keys(a);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(a);e&&(s=s.filter(function(n){return Object.getOwnPropertyDescriptor(a,n).enumerable})),t.push.apply(t,s)}return t}function R(a){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?la(Object(t),!0).forEach(function(s){lr(a,s,t[s])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(t)):la(Object(t)).forEach(function(s){Object.defineProperty(a,s,Object.getOwnPropertyDescriptor(t,s))})}return a}const dr=a=>a?(...e)=>a(...e):(...e)=>fetch(...e),cr=()=>Headers,ur=(a,e,t)=>{const s=dr(t),n=cr();return async(r,i)=>{var o;const l=(o=await e())!==null&&o!==void 0?o:a;let d=new n(i?.headers);return d.has("apikey")||d.set("apikey",a),d.has("Authorization")||d.set("Authorization",`Bearer ${l}`),s(r,R(R({},i),{},{headers:d}))}};function pr(a){return a.endsWith("/")?a:a+"/"}function hr(a,e){var t,s;const{db:n,auth:r,realtime:i,global:o}=a,{db:l,auth:d,realtime:c,global:p}=e,u={db:R(R({},l),n),auth:R(R({},d),r),realtime:R(R({},c),i),storage:{},global:R(R(R({},p),o),{},{headers:R(R({},(t=p?.headers)!==null&&t!==void 0?t:{}),(s=o?.headers)!==null&&s!==void 0?s:{})}),accessToken:async()=>""};return a.accessToken?u.accessToken=a.accessToken:delete u.accessToken,u}function mr(a){const e=a?.trim();if(!e)throw new Error("supabaseUrl is required.");if(!e.match(/^https?:\/\//i))throw new Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");try{return new URL(pr(e))}catch{throw Error("Invalid supabaseUrl: Provided URL is malformed.")}}var gr=class extends Zn{constructor(a){super(a)}},yr=class{constructor(a,e,t){var s,n;this.supabaseUrl=a,this.supabaseKey=e;const r=mr(a);if(!e)throw new Error("supabaseKey is required.");this.realtimeUrl=new URL("realtime/v1",r),this.realtimeUrl.protocol=this.realtimeUrl.protocol.replace("http","ws"),this.authUrl=new URL("auth/v1",r),this.storageUrl=new URL("storage/v1",r),this.functionsUrl=new URL("functions/v1",r);const i=`sb-${r.hostname.split(".")[0]}-auth-token`,o={db:sr,realtime:rr,auth:R(R({},nr),{},{storageKey:i}),global:ar},l=hr(t??{},o);if(this.storageKey=(s=l.auth.storageKey)!==null&&s!==void 0?s:"",this.headers=(n=l.global.headers)!==null&&n!==void 0?n:{},l.accessToken)this.accessToken=l.accessToken,this.auth=new Proxy({},{get:(c,p)=>{throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(p)} is not possible`)}});else{var d;this.auth=this._initSupabaseAuthClient((d=l.auth)!==null&&d!==void 0?d:{},this.headers,l.global.fetch)}this.fetch=ur(e,this._getAccessToken.bind(this),l.global.fetch),this.realtime=this._initRealtimeClient(R({headers:this.headers,accessToken:this._getAccessToken.bind(this)},l.realtime)),this.accessToken&&Promise.resolve(this.accessToken()).then(c=>this.realtime.setAuth(c)).catch(c=>console.warn("Failed to set initial Realtime auth token:",c)),this.rest=new es(new URL("rest/v1",r).href,{headers:this.headers,schema:l.db.schema,fetch:this.fetch,timeout:l.db.timeout,urlLengthLimit:l.db.urlLengthLimit}),this.storage=new Vs(this.storageUrl.href,this.headers,this.fetch,t?.storage),l.accessToken||this._listenForAuthEvents()}get functions(){return new Wa(this.functionsUrl.href,{headers:this.headers,customFetch:this.fetch})}from(a){return this.rest.from(a)}schema(a){return this.rest.schema(a)}rpc(a,e={},t={head:!1,get:!1,count:void 0}){return this.rest.rpc(a,e,t)}channel(a,e={config:{}}){return this.realtime.channel(a,e)}getChannels(){return this.realtime.getChannels()}removeChannel(a){return this.realtime.removeChannel(a)}removeAllChannels(){return this.realtime.removeAllChannels()}async _getAccessToken(){var a=this,e,t;if(a.accessToken)return await a.accessToken();const{data:s}=await a.auth.getSession();return(e=(t=s.session)===null||t===void 0?void 0:t.access_token)!==null&&e!==void 0?e:a.supabaseKey}_initSupabaseAuthClient({autoRefreshToken:a,persistSession:e,detectSessionInUrl:t,storage:s,userStorage:n,storageKey:r,flowType:i,lock:o,debug:l,throwOnError:d},c,p){const u={Authorization:`Bearer ${this.supabaseKey}`,apikey:`${this.supabaseKey}`};return new gr({url:this.authUrl.href,headers:R(R({},u),c),storageKey:r,autoRefreshToken:a,persistSession:e,detectSessionInUrl:t,storage:s,userStorage:n,flowType:i,lock:o,debug:l,throwOnError:d,fetch:p,hasCustomAuthorizationHeader:Object.keys(this.headers).some(h=>h.toLowerCase()==="authorization")})}_initRealtimeClient(a){return new vs(this.realtimeUrl.href,R(R({},a),{},{params:R(R({},{apikey:this.supabaseKey}),a?.params)}))}_listenForAuthEvents(){return this.auth.onAuthStateChange((a,e)=>{this._handleTokenChanged(a,"CLIENT",e?.access_token)})}_handleTokenChanged(a,e,t){(a==="TOKEN_REFRESHED"||a==="SIGNED_IN")&&this.changedAccessToken!==t?(this.changedAccessToken=t,this.realtime.setAuth(t)):a==="SIGNED_OUT"&&(this.realtime.setAuth(),e=="STORAGE"&&this.auth.signOut(),this.changedAccessToken=void 0)}};const vr=(a,e,t)=>new yr(a,e,t);function fr(){if(typeof window<"u")return!1;const a=globalThis.process;if(!a)return!1;const e=a.version;if(e==null)return!1;const t=e.match(/^v(\d+)\./);return t?parseInt(t[1],10)<=18:!1}fr()&&console.warn("⚠️  Node.js 18 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 20 or later. For more information, visit: https://github.com/orgs/supabase/discussions/37217");const br="https://jcjplqqrgaxysmwzqgvc.supabase.co",wr="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjanBscXFyZ2F4eXNtd3pxZ3ZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0MjQzNTQsImV4cCI6MjA4NzAwMDM1NH0.cAggH2Nfx7fbU3rAxc6cSLNM2GNcA8SUEY5xu4Qa0Kk",j=vr(br,wr);class _r{constructor(){this._cache={}}async getAll(e,t={},s=null){let n=j.from(e).select("*");Object.entries(t).forEach(([o,l])=>{n=n.eq(o,l)}),s&&(n=n.order(s.column,{ascending:s.ascending??!1}));const{data:r,error:i}=await n;return i?(console.error(`DB getAll(${e}):`,i),[]):r||[]}async getOne(e,t,s){const{data:n,error:r}=await j.from(e).select("*").eq(t,s).maybeSingle();return r?(console.error(`DB getOne(${e}):`,r),null):n}async insert(e,t){const{data:s,error:n}=await j.from(e).insert(t).select().single();return n?(console.error(`DB insert(${e}):`,n),null):s}async upsert(e,t,s={}){const{data:n,error:r}=await j.from(e).upsert(t,s).select().single();return r?(console.error(`DB upsert(${e}):`,r),null):n}async update(e,t,s,n){const{data:r,error:i}=await j.from(e).update(n).eq(t,s).select().single();return i?(console.error(`DB update(${e}):`,i),null):r}async deleteRow(e,t,s){const{error:n}=await j.from(e).delete().eq(t,s);return n?(console.error(`DB delete(${e}):`,n),!1):!0}async deleteWhere(e,t){let s=j.from(e).delete();Object.entries(t).forEach(([r,i])=>{s=s.eq(r,i)});const{error:n}=await s;return n?(console.error(`DB deleteWhere(${e}):`,n),!1):!0}async count(e,t={}){let s=j.from(e).select("*",{count:"exact",head:!0});Object.entries(t).forEach(([i,o])=>{s=s.eq(i,o)});const{count:n,error:r}=await s;return r?(console.error(`DB count(${e}):`,r),0):n||0}async getState(e){const t=await this.getOne("app_state","key",e);return t?t.value:null}async setState(e,t){return await this.upsert("app_state",{key:e,value:typeof t=="object"?t:JSON.parse(JSON.stringify(t)),updated_at:new Date().toISOString()},{onConflict:"key"})}}const v=new _r;class xr{constructor(){this.currentUser=null,this._sessionLoaded=!1}async loadSession(){if(this._sessionLoaded)return;const e=sessionStorage.getItem("hrms_session");if(e){const t=JSON.parse(e),s=await v.getOne("users","id",t.userId);s?this.currentUser=s:sessionStorage.removeItem("hrms_session")}this._sessionLoaded=!0}async login(e,t,s){const r=(await v.getAll("users")).find(i=>(i.employee_id===e||i.email===e)&&i.password===t&&i.company_code===s&&i.status==="active");if(r){const i={userId:r.id,employeeId:r.employee_id,name:r.name,role:r.role,companyCode:r.company_code,loginTime:new Date().toISOString()};return sessionStorage.setItem("hrms_session",JSON.stringify(i)),this.currentUser=r,await this.logAudit("login",r.id,"User logged in"),{success:!0,user:i}}return{success:!1,error:"Invalid credentials or company code"}}async logout(){this.currentUser&&await this.logAudit("logout",this.currentUser.id,"User logged out"),sessionStorage.removeItem("hrms_session"),this.currentUser=null}getCurrentUser(){const e=sessionStorage.getItem("hrms_session");return e?JSON.parse(e):null}isAuthenticated(){return sessionStorage.getItem("hrms_session")!==null}async setupPassword(e,t,s){const r=(await v.getAll("users")).find(i=>i.employee_id===e&&i.temp_password===t);return r?(await v.update("users","id",r.id,{password:s,temp_password:null,password_setup:!0}),await this.logAudit("password_setup",r.id,"Password set up"),{success:!0}):{success:!1,error:"Invalid employee ID or temporary password"}}async resetPassword(e,t){const n=(await v.getAll("users")).find(r=>r.email===e&&r.company_code===t);return n?(await this.logAudit("password_reset",n.id,"Password reset requested"),{success:!0,message:"Password reset instructions sent to email"}):{success:!1,error:"Email not found"}}async logAudit(e,t,s){await v.insert("audit_logs",{action:e,user_id:t,details:s,timestamp:new Date().toISOString(),ip:"localhost"})}}const S=new xr;async function Sr(){try{if(await v.getState("initialized")){console.log("✅ Supabase already initialized with seed data");return}console.log("🔄 Checking Supabase seed data...");const e=await v.count("users");if(e===0){console.log("⚠️ No users found — run the SQL migration script in Supabase SQL Editor first!"),console.log("📄 See: supabase_migration.sql");return}console.log(`✅ Found ${e} users in Supabase`),await v.setState("initialized",!0),console.log("✅ Supabase seed data verified")}catch(a){console.error("❌ Error checking seed data:",a)}}async function kr(){console.log("🚀 Generating comprehensive demo data in Supabase...");try{await Er(),await $r(),await Tr(),await Ar(),await Dr(),await Cr(),await v.setState("demoDataGenerated",!0),console.log("✅ Demo data generation complete!")}catch(a){console.error("❌ Error generating demo data:",a)}}async function Er(){const a=[{id:"U005",employee_id:"M002",email:"michael.scott@company.com",password:"manager123",name:"Michael Scott",role:"manager",department:"Sales & Marketing",designation:"Sales Manager",company_code:"COMP001",status:"active",joining_date:"2022-03-15",mobile:"+91 9876543214",salary:{basic:6e4,hra:24e3,special:16e3},monthly_ctc:1e5},{id:"U006",employee_id:"E002",email:"priya.sharma@company.com",password:"password123",name:"Priya Sharma",role:"employee",department:"Engineering",designation:"Software Developer",manager:"Sarah Connor",company_code:"COMP001",status:"active",joining_date:"2023-06-01",mobile:"+91 9876543215",salary:{basic:35e3,hra:14e3,special:11e3},monthly_ctc:6e4},{id:"U007",employee_id:"E003",email:"amit.kumar@company.com",password:"password123",name:"Amit Kumar",role:"employee",department:"Engineering",designation:"Junior Developer",manager:"Sarah Connor",company_code:"COMP001",status:"active",joining_date:"2024-01-15",mobile:"+91 9876543216",salary:{basic:25e3,hra:1e4,special:8e3},monthly_ctc:43e3},{id:"U008",employee_id:"E004",email:"neha.patel@company.com",password:"password123",name:"Neha Patel",role:"employee",department:"Human Resources",designation:"HR Executive",manager:"Maria Garcia",company_code:"COMP001",status:"active",joining_date:"2023-09-01",mobile:"+91 9876543217",salary:{basic:28e3,hra:11200,special:8800},monthly_ctc:48e3},{id:"U009",employee_id:"E005",email:"rajesh.verma@company.com",password:"password123",name:"Rajesh Verma",role:"employee",department:"Sales & Marketing",designation:"Sales Executive",manager:"Michael Scott",company_code:"COMP001",status:"active",joining_date:"2023-04-10",mobile:"+91 9876543218",salary:{basic:3e4,hra:12e3,special:1e4},monthly_ctc:52e3},{id:"U010",employee_id:"E006",email:"anita.singh@company.com",password:"password123",name:"Anita Singh",role:"employee",department:"Sales & Marketing",designation:"Senior Sales Executive",manager:"Michael Scott",company_code:"COMP001",status:"active",joining_date:"2022-11-01",mobile:"+91 9876543219",salary:{basic:38e3,hra:15200,special:11800},monthly_ctc:65e3},{id:"U011",employee_id:"E007",email:"vikram.rao@company.com",password:"password123",name:"Vikram Rao",role:"employee",department:"Engineering",designation:"QA Engineer",manager:"Sarah Connor",company_code:"COMP001",status:"active",joining_date:"2023-03-20",mobile:"+91 9876543220",salary:{basic:32e3,hra:12800,special:10200},monthly_ctc:55e3},{id:"U012",employee_id:"E008",email:"kavitha.nair@company.com",password:"password123",name:"Kavitha Nair",role:"employee",department:"Engineering",designation:"DevOps Engineer",manager:"Sarah Connor",company_code:"COMP001",status:"active",joining_date:"2022-08-15",mobile:"+91 9876543221",salary:{basic:42e3,hra:16800,special:13200},monthly_ctc:72e3},{id:"U013",employee_id:"E009",email:"suresh.menon@company.com",password:"password123",name:"Suresh Menon",role:"employee",department:"Engineering",designation:"Tech Lead",manager:"Sarah Connor",company_code:"COMP001",status:"active",joining_date:"2021-12-01",mobile:"+91 9876543222",salary:{basic:55e3,hra:22e3,special:18e3},monthly_ctc:95e3},{id:"U014",employee_id:"E010",email:"deepa.reddy@company.com",password:"password123",name:"Deepa Reddy",role:"employee",department:"Human Resources",designation:"Recruitment Specialist",manager:"Maria Garcia",company_code:"COMP001",status:"active",joining_date:"2023-07-01",mobile:"+91 9876543223",salary:{basic:3e4,hra:12e3,special:9e3},monthly_ctc:51e3}];for(const e of a){const{error:t}=await j.from("users").upsert(e,{onConflict:"id"});t&&console.warn(`User ${e.id}:`,t.message)}console.log(`✓ Upserted ${a.length} additional employees`)}async function $r(){const{data:a}=await j.from("users").select("id, employee_id, name").eq("status","active");if(!a)return;const e=[],t=new Date;for(const n of a)for(let r=0;r<30;r++){const i=new Date(t);if(i.setDate(i.getDate()-r),i.getDay()===0||i.getDay()===6)continue;const o=i.toISOString().split("T")[0],l=Math.random();let d,c,p,u,h;if(l<.85){d="present";const m=45+Math.floor(Math.random()*30);c=`09:${String(m).padStart(2,"0")}`;const g=17+Math.floor(Math.random()*2),y=30+Math.floor(Math.random()*30);p=`${g}:${String(y).padStart(2,"0")}`,u=(g*60+y-(540+m))/60,h=m>15}else if(l<.95){d="present",h=!0;const m=10+Math.floor(Math.random()*1),g=Math.floor(Math.random()*30);c=`${m}:${String(g).padStart(2,"0")}`;const y=18+Math.floor(Math.random()*1),f=Math.floor(Math.random()*60);p=`${y}:${String(f).padStart(2,"0")}`,u=(y*60+f-(m*60+g))/60}else d="absent",c=null,p=null,u=0,h=!1;e.push({employee_id:n.id,employee_name:n.name,date:o,in_time:c,out_time:p,break_logs:[],status:d,working_hours:Math.round(u*100)/100,is_late:h,is_early_checkout:!1,overtime_hours:Math.max(0,Math.round((u-8)*100)/100),source:"generated",shift_id:"GS",shift_name:"General Shift"})}const s=50;for(let n=0;n<e.length;n+=s){const r=e.slice(n,n+s),{error:i}=await j.from("attendance").upsert(r,{onConflict:"employee_id,date"});i&&console.warn("Attendance batch error:",i.message)}console.log(`✓ Generated ${e.length} attendance records`)}async function Tr(){const{data:a}=await j.from("users").select("id, name");if(!a)return;const e=s=>a.find(n=>n.id===s)?.name||"Unknown",t=[{id:"LR0001",employee_id:"U001",employee_name:e("U001"),leave_type:"CL",start_date:"2024-12-20",end_date:"2024-12-21",days:2,is_half_day:!1,status:"approved",reason:"Personal work",applied_on:new Date(Date.now()-7*864e5).toISOString(),approved_by:"Sarah Connor",approved_on:new Date().toISOString(),salary_impact:{unpaidDays:0,deduction:0}},{id:"LR0002",employee_id:"U006",employee_name:e("U006"),leave_type:"SL",start_date:"2024-12-18",end_date:"2024-12-18",days:1,is_half_day:!1,status:"approved",reason:"Not feeling well",applied_on:new Date(Date.now()-5*864e5).toISOString(),approved_by:"Sarah Connor",approved_on:new Date().toISOString(),salary_impact:{unpaidDays:0,deduction:0}},{id:"LR0003",employee_id:"U007",employee_name:e("U007"),leave_type:"PL",start_date:"2025-01-06",end_date:"2025-01-10",days:5,is_half_day:!1,status:"pending",reason:"Family vacation",applied_on:new Date(Date.now()-2*864e5).toISOString(),salary_impact:{unpaidDays:0,deduction:0}},{id:"LR0004",employee_id:"U008",employee_name:e("U008"),leave_type:"CL",start_date:"2025-01-02",end_date:"2025-01-03",days:2,is_half_day:!1,status:"pending",reason:"Festival celebration",applied_on:new Date(Date.now()-1*864e5).toISOString(),salary_impact:{unpaidDays:0,deduction:0}},{id:"LR0005",employee_id:"U009",employee_name:e("U009"),leave_type:"SL",start_date:"2024-12-15",end_date:"2024-12-16",days:2,is_half_day:!1,status:"approved",reason:"Medical checkup",applied_on:new Date(Date.now()-10*864e5).toISOString(),approved_by:"Sarah Connor",approved_on:new Date().toISOString(),salary_impact:{unpaidDays:0,deduction:0}},{id:"LR0006",employee_id:"U010",employee_name:e("U010"),leave_type:"CL",start_date:"2024-12-25",end_date:"2024-12-25",days:1,is_half_day:!1,status:"rejected",reason:"Short notice",applied_on:new Date(Date.now()-3*864e5).toISOString(),approved_by:"Maria Garcia",approved_on:new Date().toISOString(),rejection_reason:"Critical project deadline",salary_impact:{unpaidDays:0,deduction:0}},{id:"LR0007",employee_id:"U011",employee_name:e("U011"),leave_type:"PL",start_date:"2025-01-15",end_date:"2025-01-20",days:6,is_half_day:!1,status:"pending",reason:"Hometown visit",applied_on:new Date(Date.now()-1*864e5).toISOString(),salary_impact:{unpaidDays:0,deduction:0}},{id:"LR0008",employee_id:"U012",employee_name:e("U012"),leave_type:"CL",start_date:"2024-12-28",end_date:"2024-12-28",days:1,is_half_day:!1,status:"approved",reason:"Personal errand",applied_on:new Date(Date.now()-4*864e5).toISOString(),approved_by:"Sarah Connor",approved_on:new Date().toISOString(),salary_impact:{unpaidDays:0,deduction:0}}];for(const s of t){const{error:n}=await j.from("leave_requests").upsert(s,{onConflict:"id"});n&&console.warn(`Leave request ${s.id}:`,n.message)}console.log(`✓ Generated ${t.length} leave requests`)}async function Ar(){const{data:a}=await j.from("users").select("*");if(!a)return;const e=[],t=[{num:1},{num:2},{num:3},{num:4},{num:5},{num:6},{num:7},{num:8},{num:9}];for(const n of a){const r=n.salary||{basic:25e3,hra:1e4,special:8e3},i=(r.basic||25e3)+(r.hra||1e4)+(r.special||8e3),o=Math.round((r.basic||25e3)*.12),l=200,d=i>5e4?Math.round(i*.05):0,c=o+l+d,p=i-c;for(const u of t)e.push({id:`PAY${n.id}_${u.num}_2025`,employee_id:n.id,employee_name:n.name,employee_code:n.employee_id,month:u.num,year:2025,designation:n.designation,department:n.department,attendance:{workingDays:26,presentDays:24,absentDays:2,paidLeaveDays:1,unpaidLeaveDays:1},earnings:{basic:r.basic||25e3,hra:r.hra||1e4,specialAllowance:r.special||8e3},gross_earnings:i,deductions:{pf:o,professionalTax:l,tds:d},total_deductions:c,net_salary:p,status:"paid",processed_on:`2025-${String(u.num).padStart(2,"0")}-25T00:00:00Z`,paid_on:`2025-${String(u.num).padStart(2,"0")}-28T00:00:00Z`})}const s=50;for(let n=0;n<e.length;n+=s){const r=e.slice(n,n+s),{error:i}=await j.from("payslips").upsert(r,{onConflict:"id"});i&&console.warn("Payslip batch error:",i.message)}console.log(`✓ Generated ${e.length} payslips`)}async function Dr(){const{data:a}=await j.from("users").select("id, employee_id, name").eq("role","employee");if(!a)return;const e=[{title:"Complete Project Milestone",category:"Professional",weight:30},{title:"Improve Code Quality",category:"Professional",weight:20},{title:"Team Collaboration",category:"Professional",weight:15},{title:"Technical Skills Development",category:"Learning",weight:20},{title:"Client Satisfaction",category:"Professional",weight:15}],t=[];a.forEach(n=>{e.forEach((r,i)=>{const o=Math.floor(Math.random()*100);t.push({id:`GOAL${n.id}_${i}`,employee_id:n.id,title:r.title,description:`Goal for ${r.title.toLowerCase()} in Q4 2024`,category:r.category,target_date:"2024-12-31",weight:r.weight,progress:o,status:o<30?"pending":o<100?"in_progress":"completed"})})});const s=50;for(let n=0;n<t.length;n+=s){const r=t.slice(n,n+s),{error:i}=await j.from("goals").upsert(r,{onConflict:"id"});i&&console.warn("Goals batch error:",i.message)}console.log(`✓ Generated ${t.length} goals`)}async function Cr(){const a=[{id:"EXIT001",employee_id:"U007",employee_name:"Amit Kumar",resignation_date:"2024-12-15T10:00:00Z",requested_lwd:"2025-01-15",reason:"Resignation - Better Opportunity",personal_email:"amit.kumar@gmail.com",status:"pending_approval",clearance:{it:{department:"IT",items:[{name:"Laptop/Assets Returned",cleared:!1},{name:"Email Access Revoked",cleared:!1}],completed:!1},admin:{department:"Admin",items:[{name:"ID Card Returned",cleared:!1}],completed:!1},finance:{department:"Finance",items:[{name:"No Pending Loans",cleared:!1}],completed:!1}},comments:"Looking forward to new opportunities"}];for(const e of a){const{error:t}=await j.from("employee_exits").upsert(e,{onConflict:"id"});t&&console.warn(`Exit ${e.id}:`,t.message)}console.log(`✓ Generated ${a.length} exit records`)}async function Lr(){return await v.getState("demoDataGenerated")===!0}function Or(a){const e=document.createElement("div");e.className="login-container",e.style.cssText=`
    display: flex;
    min-height: 100vh;
    background: #050505;
    font-family: 'Inter', sans-serif;
    overflow: hidden;
  `;const t=new Date().getHours(),s=t<12?"Good Morning":t<17?"Good Afternoon":"Good Evening",n=t<12?"☀️":t<17?"🌤️":"🌙";e.innerHTML=`
    <!-- Left Panel - Branding & Features -->
    <div class="login-left-panel" style="
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 4rem;
      position: relative;
      overflow: hidden;
      background: linear-gradient(160deg, rgba(204, 255, 0, 0.06) 0%, #050505 40%, rgba(0, 210, 255, 0.04) 100%);
    ">
      <!-- Animated Particle Canvas -->
      <canvas id="particle-canvas" style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0;"></canvas>

      <!-- Accent Line -->
      <div style="position: absolute; left: 0; top: 20%; width: 3px; height: 120px; background: linear-gradient(to bottom, transparent, #ccff00, transparent); border-radius: 2px;"></div>

      <div style="position: relative; z-index: 2; max-width: 540px;">
        <!-- Logo -->
        <div style="margin-bottom: 3.5rem;">
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
            <div style="
              width: 42px; height: 42px;
              background: linear-gradient(135deg, #ccff00, #a3cc00);
              border-radius: 10px;
              display: flex; align-items: center; justify-content: center;
              font-family: 'Space Grotesk', sans-serif;
              font-weight: 800; font-size: 1.2rem; color: #000;
              box-shadow: 0 4px 12px rgba(204, 255, 0, 0.2);
            ">S</div>
            <div>
              <div style="font-family: 'Space Grotesk', sans-serif; font-size: 1.5rem; font-weight: 700; color: #fff; letter-spacing: -0.5px;">Subix <span style="color: var(--primary-lime, #ccff00);">HRMS</span></div>
            </div>
          </div>
          <div style="font-size: 0.7rem; letter-spacing: 0.25em; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-left: 56px;">Enterprise Workforce Platform</div>
        </div>

        <!-- Headline -->
        <h1 style="font-family: 'Space Grotesk', sans-serif; font-size: 3rem; font-weight: 700; line-height: 1.08; margin-bottom: 1.25rem; color: #fff;">
          Your People,<br/>
          <span style="background: linear-gradient(135deg, #ccff00 0%, #00d2ff 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Empowered.</span>
        </h1>

        <p style="font-size: 1.05rem; color: rgba(255,255,255,0.45); line-height: 1.75; margin-bottom: 3rem; max-width: 420px;">
          One platform to manage attendance, payroll, performance, and the entire employee lifecycle — built for growing teams.
        </p>

        <!-- Rotating Feature Showcase -->
        <div id="feature-showcase" style="
          padding: 1.5rem;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          backdrop-filter: blur(10px);
          min-height: 110px;
          transition: opacity 0.4s ease;
        ">
          <!-- Content injected by JS -->
        </div>

        <!-- Feature Dots (progress indicator) -->
        <div id="feature-dots" style="display: flex; gap: 6px; margin-top: 1rem; margin-left: 0.25rem;">
          <div class="feature-dot active" data-index="0" style="width: 24px; height: 3px; border-radius: 2px; background: #ccff00; transition: all 0.3s; cursor: pointer;"></div>
          <div class="feature-dot" data-index="1" style="width: 12px; height: 3px; border-radius: 2px; background: rgba(255,255,255,0.15); transition: all 0.3s; cursor: pointer;"></div>
          <div class="feature-dot" data-index="2" style="width: 12px; height: 3px; border-radius: 2px; background: rgba(255,255,255,0.15); transition: all 0.3s; cursor: pointer;"></div>
          <div class="feature-dot" data-index="3" style="width: 12px; height: 3px; border-radius: 2px; background: rgba(255,255,255,0.15); transition: all 0.3s; cursor: pointer;"></div>
        </div>

        <!-- Trust Badges -->
        <div style="display: flex; align-items: center; gap: 1.75rem; margin-top: 3rem; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.05);">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span style="font-size: 0.72rem; color: rgba(255,255,255,0.35); font-weight: 500;">256-bit Encrypted</span>
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <span style="font-size: 0.72rem; color: rgba(255,255,255,0.35); font-weight: 500;">Secure Login</span>
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a855f7" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span style="font-size: 0.72rem; color: rgba(255,255,255,0.35); font-weight: 500;">99.9% Uptime</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Panel - Login Form -->
    <div class="login-right-panel" style="
      width: 480px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 3rem;
      background: #0a0a0a;
      border-left: 1px solid rgba(255,255,255,0.05);
      position: relative;
    ">
      <!-- Corner accent -->
      <div style="position: absolute; top: 0; right: 0; width: 200px; height: 200px; background: radial-gradient(circle at top right, rgba(204, 255, 0, 0.03) 0%, transparent 70%); pointer-events: none;"></div>

      <div style="max-width: 360px; margin: 0 auto; width: 100%; position: relative; z-index: 1;">
        <!-- Greeting -->
        <div style="margin-bottom: 2.5rem;">
          <div style="font-size: 0.85rem; color: rgba(255,255,255,0.35); margin-bottom: 0.75rem;">${n} ${s}</div>
          <h2 style="font-family: 'Space Grotesk', sans-serif; font-size: 1.75rem; font-weight: 700; color: #fff; margin-bottom: 0.4rem;">Welcome Back</h2>
          <p style="font-size: 0.88rem; color: rgba(255,255,255,0.35);">Sign in to your workspace</p>
        </div>

        <!-- Login Form -->
        <form id="login-form" style="display: flex; flex-direction: column; gap: 1.25rem;">
          <div>
            <label for="identifier" style="display: block; font-size: 0.78rem; font-weight: 500; color: rgba(255,255,255,0.5); margin-bottom: 0.4rem;">Employee ID or Email</label>
            <input
              type="text"
              id="identifier"
              name="identifier"
              placeholder="e.g. EMP001 or john@company.com"
              required
              autofocus
              style="width: 100%; padding: 0.85rem 1rem; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; color: #fff; font-size: 0.92rem; outline: none; transition: all 0.25s ease;"
            />
          </div>

          <div>
            <label for="password" style="display: block; font-size: 0.78rem; font-weight: 500; color: rgba(255,255,255,0.5); margin-bottom: 0.4rem;">Password</label>
            <div style="position: relative;">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                required
                style="width: 100%; padding: 0.85rem 1rem; padding-right: 44px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; color: #fff; font-size: 0.92rem; outline: none; transition: all 0.25s ease;"
              />
              <button type="button" id="toggle-password" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: rgba(255,255,255,0.25); padding: 4px; transition: color 0.2s;" aria-label="Toggle password visibility">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              </button>
            </div>
          </div>

          <div>
            <label for="companyCode" style="display: block; font-size: 0.78rem; font-weight: 500; color: rgba(255,255,255,0.5); margin-bottom: 0.4rem;">Company Code</label>
            <input
              type="text"
              id="companyCode"
              name="companyCode"
              placeholder="Your organization code"
              required
              style="width: 100%; padding: 0.85rem 1rem; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; color: #fff; font-size: 0.92rem; outline: none; transition: all 0.25s ease;"
            />
          </div>

          <!-- Remember Me + Forgot Password Row -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: -0.25rem;">
            <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer; user-select: none;">
              <input type="checkbox" id="remember-me" style="
                appearance: none; -webkit-appearance: none;
                width: 16px; height: 16px;
                border: 1.5px solid rgba(255,255,255,0.15);
                border-radius: 4px;
                background: rgba(255,255,255,0.03);
                cursor: pointer;
                position: relative;
                transition: all 0.2s;
              " />
              <span style="font-size: 0.78rem; color: rgba(255,255,255,0.4);">Remember me</span>
            </label>
            <a href="#" id="forgot-password" style="font-size: 0.78rem; color: rgba(204, 255, 0, 0.5); text-decoration: none; transition: color 0.2s;">Forgot password?</a>
          </div>

          <div id="error-message" style="display: none; padding: 0.75rem 1rem; background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.15); border-radius: 10px; color: #f87171; font-size: 0.83rem; display: none;"></div>

          <button type="submit" id="login-submit-btn" style="
            width: 100%;
            padding: 0.9rem;
            background: linear-gradient(135deg, #ccff00, #a8d900);
            color: #000;
            font-weight: 700;
            font-size: 0.9rem;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            letter-spacing: 0.04em;
            text-transform: uppercase;
            transition: all 0.3s ease;
            box-shadow: 0 4px 20px rgba(204, 255, 0, 0.15);
            margin-top: 0.25rem;
            position: relative;
            overflow: hidden;
          ">
            Sign In
          </button>
        </form>

        <!-- Separator -->
        <div style="display: flex; align-items: center; gap: 1rem; margin: 1.75rem 0;">
          <div style="flex: 1; height: 1px; background: rgba(255,255,255,0.05);"></div>
          <span style="font-size: 0.65rem; color: rgba(255,255,255,0.2); text-transform: uppercase; letter-spacing: 0.12em;">Quick Access</span>
          <div style="flex: 1; height: 1px; background: rgba(255,255,255,0.05);"></div>
        </div>

        <!-- Quick Access Role Buttons -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
          <button class="demo-login-btn" data-id="HR001" data-pass="hr123" data-code="COMP001" style="
            padding: 0.65rem 0.75rem;
            background: rgba(255,255,255,0.02);
            border: 1px solid rgba(255,255,255,0.05);
            border-radius: 8px;
            color: #fff;
            cursor: pointer;
            text-align: left;
            transition: all 0.25s ease;
          ">
            <div style="display: flex; align-items: center; gap: 0.4rem;">
              <div style="width: 6px; height: 6px; border-radius: 50%; background: #ccff00;"></div>
              <span style="font-size: 0.72rem; font-weight: 600; color: rgba(255,255,255,0.7);">HR Admin</span>
            </div>
          </button>

          <button class="demo-login-btn" data-id="ADMIN" data-pass="admin123" data-code="COMP001" style="
            padding: 0.65rem 0.75rem;
            background: rgba(255,255,255,0.02);
            border: 1px solid rgba(255,255,255,0.05);
            border-radius: 8px;
            color: #fff;
            cursor: pointer;
            text-align: left;
            transition: all 0.25s ease;
          ">
            <div style="display: flex; align-items: center; gap: 0.4rem;">
              <div style="width: 6px; height: 6px; border-radius: 50%; background: #a855f7;"></div>
              <span style="font-size: 0.72rem; font-weight: 600; color: rgba(255,255,255,0.7);">Super Admin</span>
            </div>
          </button>

          <button class="demo-login-btn" data-id="M001" data-pass="manager123" data-code="COMP001" style="
            padding: 0.65rem 0.75rem;
            background: rgba(255,255,255,0.02);
            border: 1px solid rgba(255,255,255,0.05);
            border-radius: 8px;
            color: #fff;
            cursor: pointer;
            text-align: left;
            transition: all 0.25s ease;
          ">
            <div style="display: flex; align-items: center; gap: 0.4rem;">
              <div style="width: 6px; height: 6px; border-radius: 50%; background: #00d2ff;"></div>
              <span style="font-size: 0.72rem; font-weight: 600; color: rgba(255,255,255,0.7);">Manager</span>
            </div>
          </button>

          <button class="demo-login-btn" data-id="E001" data-pass="emp123" data-code="COMP001" style="
            padding: 0.65rem 0.75rem;
            background: rgba(255,255,255,0.02);
            border: 1px solid rgba(255,255,255,0.05);
            border-radius: 8px;
            color: #fff;
            cursor: pointer;
            text-align: left;
            transition: all 0.25s ease;
          ">
            <div style="display: flex; align-items: center; gap: 0.4rem;">
              <div style="width: 6px; height: 6px; border-radius: 50%; background: #10b981;"></div>
              <span style="font-size: 0.72rem; font-weight: 600; color: rgba(255,255,255,0.7);">Employee</span>
            </div>
          </button>
        </div>

        <!-- Footer -->
        <div style="margin-top: 2.5rem; text-align: center;">
          <p style="font-size: 0.68rem; color: rgba(255,255,255,0.15); line-height: 1.6;">
            Need help? Contact <a href="mailto:support@subix.io" style="color: rgba(204, 255, 0, 0.4); text-decoration: none;">support@subix.io</a>
          </p>
          <p style="font-size: 0.62rem; color: rgba(255,255,255,0.1); margin-top: 0.4rem;">
            Subix HRMS v2.0 · © ${new Date().getFullYear()} <a href="https://www.subix.io/" target="_blank" style="color: rgba(255,255,255,0.15); text-decoration: none;">Subix Technologies</a>
          </p>
        </div>
      </div>
    </div>
  `;const r=[{icon:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ccff00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',color:"#ccff00",title:"Employee Lifecycle",desc:"From onboarding to exit — manage the complete employee journey with automated workflows and real-time status tracking."},{icon:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00d2ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',color:"#00d2ff",title:"Smart Attendance",desc:"Biometric integration, shift management, and automatic overtime calculation. Track attendance across multiple locations."},{icon:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a855f7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',color:"#a855f7",title:"Payroll Engine",desc:"Automated salary processing with PF, ESI, TDS compliance. Generate payslips and manage reimbursements effortlessly."},{icon:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',color:"#10b981",title:"Performance & Goals",desc:"Set OKRs, run 360° reviews, and track appraisal cycles. Data-driven insights to grow your team's potential."}];let i=0;const o=e.querySelector("#feature-showcase"),l=e.querySelectorAll(".feature-dot");function d(w){const D=r[w];o.style.opacity="0",setTimeout(()=>{o.innerHTML=`
        <div style="display: flex; align-items: flex-start; gap: 1rem;">
          <div style="width: 40px; height: 40px; border-radius: 10px; background: ${D.color}10; display: flex; align-items: center; justify-content: center; flex-shrink: 0; border: 1px solid ${D.color}20;">
            ${D.icon}
          </div>
          <div>
            <div style="font-weight: 600; font-size: 0.95rem; color: #fff; margin-bottom: 0.35rem;">${D.title}</div>
            <div style="font-size: 0.8rem; color: rgba(255,255,255,0.4); line-height: 1.6;">${D.desc}</div>
          </div>
        </div>
      `,o.style.opacity="1"},300),l.forEach((C,q)=>{C.style.width=q===w?"24px":"12px",C.style.background=q===w?D.color:"rgba(255,255,255,0.15)"})}d(0);let c=setInterval(()=>{i=(i+1)%r.length,d(i)},4e3);l.forEach(w=>{w.addEventListener("click",()=>{clearInterval(c),i=parseInt(w.dataset.index),d(i),c=setInterval(()=>{i=(i+1)%r.length,d(i)},4e3)})});const p=e.querySelector("#particle-canvas"),u=p.getContext("2d");let h;function m(){const w=p.parentElement;p.width=w.offsetWidth,p.height=w.offsetHeight}m();const g=[],y=40;for(let w=0;w<y;w++)g.push({x:Math.random()*p.width,y:Math.random()*p.height,size:Math.random()*1.5+.5,speedX:(Math.random()-.5)*.3,speedY:(Math.random()-.5)*.3,opacity:Math.random()*.3+.05});function f(){u.clearRect(0,0,p.width,p.height),g.forEach(w=>{u.beginPath(),u.arc(w.x,w.y,w.size,0,Math.PI*2),u.fillStyle=`rgba(204, 255, 0, ${w.opacity})`,u.fill(),w.x+=w.speedX,w.y+=w.speedY,w.x<0&&(w.x=p.width),w.x>p.width&&(w.x=0),w.y<0&&(w.y=p.height),w.y>p.height&&(w.y=0)});for(let w=0;w<g.length;w++)for(let D=w+1;D<g.length;D++){const C=g[w].x-g[D].x,q=g[w].y-g[D].y,J=Math.sqrt(C*C+q*q);J<120&&(u.beginPath(),u.moveTo(g[w].x,g[w].y),u.lineTo(g[D].x,g[D].y),u.strokeStyle=`rgba(204, 255, 0, ${.03*(1-J/120)})`,u.lineWidth=.5,u.stroke())}h=requestAnimationFrame(f)}f(),window.addEventListener("resize",m);const _=e.querySelector("#login-form"),b=e.querySelector("#error-message");_.addEventListener("submit",async w=>{w.preventDefault();const D=_.querySelector("#login-submit-btn");D.disabled=!0,D.textContent="Signing In...",D.style.opacity="0.7";const C=e.querySelector("#identifier").value.trim(),q=e.querySelector("#password").value,J=e.querySelector("#companyCode").value.trim();try{const ne=await S.login(C,q,J);ne.success?(e.querySelector("#remember-me").checked?localStorage.setItem("hrms_remember",JSON.stringify({identifier:C,companyCode:J})):localStorage.removeItem("hrms_remember"),b.style.display="none",cancelAnimationFrame(h),clearInterval(c),a(ne.user)):(b.textContent=ne.error,b.style.display="block")}catch{b.textContent="Connection error. Please try again.",b.style.display="block"}finally{D.disabled=!1,D.textContent="Sign In",D.style.opacity="1"}});const k=localStorage.getItem("hrms_remember");if(k)try{const{identifier:w,companyCode:D}=JSON.parse(k);e.querySelector("#identifier").value=w||"",e.querySelector("#companyCode").value=D||"",e.querySelector("#remember-me").checked=!0}catch{}e.querySelectorAll(".demo-login-btn").forEach(w=>{w.addEventListener("click",async()=>{const D=w.dataset.id,C=w.dataset.pass,q=w.dataset.code;e.querySelector("#identifier").value=D,e.querySelector("#password").value=C,e.querySelector("#companyCode").value=q;const J=_.querySelector("#login-submit-btn");J.disabled=!0,J.textContent="Signing In...",J.style.opacity="0.7";try{const ne=await S.login(D,C,q);ne.success?(cancelAnimationFrame(h),clearInterval(c),a(ne.user)):(b.textContent=ne.error,b.style.display="block")}catch{b.textContent="Connection error. Please try again.",b.style.display="block"}finally{J.disabled=!1,J.textContent="Sign In",J.style.opacity="1"}}),w.addEventListener("mouseenter",()=>{w.style.background="rgba(255,255,255,0.05)",w.style.borderColor="rgba(255,255,255,0.1)"}),w.addEventListener("mouseleave",()=>{w.style.background="rgba(255,255,255,0.02)",w.style.borderColor="rgba(255,255,255,0.05)"})}),e.querySelector("#forgot-password").addEventListener("click",async w=>{w.preventDefault();const D=prompt("Enter your registered email:"),C=prompt("Enter your company code:");if(D&&C)try{const q=await S.resetPassword(D,C);alert(q.success?q.message:q.error)}catch{alert("Connection error.")}});const P=e.querySelector("#toggle-password"),A=e.querySelector("#password");P.addEventListener("click",()=>{const w=A.type==="password";A.type=w?"text":"password",P.innerHTML=w?'<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>':'<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>'}),e.querySelectorAll('input[type="text"], input[type="password"]').forEach(w=>{w.addEventListener("focus",()=>{w.style.borderColor="rgba(204, 255, 0, 0.35)",w.style.boxShadow="0 0 0 3px rgba(204, 255, 0, 0.04)"}),w.addEventListener("blur",()=>{w.style.borderColor="rgba(255,255,255,0.08)",w.style.boxShadow="none"})});const L=e.querySelector("#remember-me");L.addEventListener("change",()=>{L.style.background=L.checked?"#ccff00":"rgba(255,255,255,0.03)",L.style.borderColor=L.checked?"#ccff00":"rgba(255,255,255,0.15)"});const H=e.querySelector("#login-submit-btn");return H.addEventListener("mouseenter",()=>{H.style.boxShadow="0 6px 30px rgba(204, 255, 0, 0.3)",H.style.transform="translateY(-1px)"}),H.addEventListener("mouseleave",()=>{H.style.boxShadow="0 4px 20px rgba(204, 255, 0, 0.15)",H.style.transform="translateY(0)"}),e}class Pr{async notify(e,t,s,n="info",r=null){const i={id:"NOTIF"+Date.now(),user_id:e,title:t,message:s,type:n,link:r,is_read:!1};return await v.insert("notifications",i),window.dispatchEvent(new CustomEvent("new-notification",{detail:{id:i.id,userId:e,title:t,message:s,type:n,link:r,isRead:!1,createdAt:new Date().toISOString()}})),i}async getNotifications(e,t=!1){const s={user_id:e};return t&&(s.is_read=!1),(await v.getAll("notifications",s,{column:"created_at",ascending:!1})).map(r=>({id:r.id,userId:r.user_id,title:r.title,message:r.message,type:r.type,link:r.link,isRead:r.is_read,createdAt:r.created_at}))}async markAsRead(e){await v.update("notifications","id",e,{is_read:!0}),window.dispatchEvent(new CustomEvent("notification-updated"))}async markAllAsRead(e){const t=await v.getAll("notifications",{user_id:e,is_read:!1});for(const s of t)await v.update("notifications","id",s.id,{is_read:!0});window.dispatchEvent(new CustomEvent("notification-updated"))}async broadcast(e,t,s="info"){const n=await v.getAll("users",{status:"active"});for(const r of n)await this.notify(r.id,e,t,s)}}const Y=new Pr;function Rr(){const a=S.getCurrentUser(),e=document.createElement("div");e.className="notification-bell-container",e.style.position="relative",e.style.cursor="pointer";const t=async()=>{const i=(await Y.getNotifications(a.userId,!0)).length;e.innerHTML=`
            <div class="bell-icon" style="font-size: 1.25rem;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bell"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            </div>
            ${i>0?`
                <span class="badge badge-danger" style="position: absolute; top: -5px; right: -5px; padding: 2px 5px; border-radius: 10px; font-size: 10px;">
                    ${i}
                </span>
            `:""}
            <div id="notification-dropdown" class="card" style="display: none; position: absolute; right: 0; top: 40px; width: 300px; z-index: 1000; padding: 1rem; max-height: 400px; overflow-y: auto; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.3); background: var(--surface); border: 1px solid var(--border);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--border);">
                    <h4 style="margin: 0; font-size: 1rem; font-weight: 600;">Notifications</h4>
                    <button class="btn btn-sm btn-text" id="mark-all-read" style="font-size: 0.75rem;">Mark all read</button>
                </div>
                <div id="notif-list"></div>
            </div>
        `;const o=e.querySelector("#notification-dropdown");e.onclick=d=>{d.stopPropagation(),o.style.display=o.style.display==="none"?"block":"none",o.style.display==="block"&&s()};const l=e.querySelector("#mark-all-read");l&&(l.onclick=async d=>{d.stopPropagation(),await Y.markAllAsRead(a.userId),await t()})},s=async()=>{const r=e.querySelector("#notif-list"),i=await Y.getNotifications(a.userId);if(i.length===0){r.innerHTML='<p class="text-center text-muted p-4">No notifications</p>';return}r.innerHTML=i.map(o=>`
            <div class="p-2 mb-1 rounded ${o.isRead?"":"bg-gray-100"}" style="border-bottom: 1px solid #f1f5f9; background: ${o.isRead?"transparent":"var(--bg-secondary)"}">
                <div class="font-medium text-sm flex items-center gap-2">
                    <span style="width: 8px; height: 8px; border-radius: 50%; background: ${n(o.type)}"></span>
                    ${o.title}
                </div>
                <div class="text-xs text-muted">${o.message}</div>
                <div class="text-xs text-muted mt-1" style="font-size: 9px;">${new Date(o.createdAt).toLocaleTimeString()}</div>
            </div>
        `).join("")};function n(r){switch(r){case"success":return"var(--success)";case"warning":return"var(--warning)";case"danger":return"var(--danger)";default:return"var(--primary)"}}return window.addEventListener("notification-updated",t),window.addEventListener("new-notification",t),document.addEventListener("click",()=>{const r=e.querySelector("#notification-dropdown");r&&(r.style.display="none")}),t(),e}class Ir{constructor(){this.container=null,this.init()}init(){document.querySelector("#toast-container")?this.container=document.querySelector("#toast-container"):(this.container=document.createElement("div"),this.container.id="toast-container",this.container.style.cssText=`
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-width: 400px;
      `,document.body.appendChild(this.container))}show(e,t="info",s=3e3){const n=document.createElement("div");n.className=`toast toast-${t}`;const r={success:{bg:"#10b981",icon:"✓"},error:{bg:"#ef4444",icon:"✕"},warning:{bg:"#f59e0b",icon:"⚠"},info:{bg:"#3b82f6",icon:"ℹ"}},i=r[t]||r.info;return n.style.cssText=`
      background: ${i.bg};
      color: white;
      padding: 16px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 14px;
      font-weight: 500;
      animation: slideInRight 0.3s ease-out;
      cursor: pointer;
      min-width: 300px;
    `,n.innerHTML=`
      <span style="font-size: 18px; font-weight: bold;">${i.icon}</span>
      <span style="flex: 1;">${e}</span>
    `,this.addAnimation(),this.container.appendChild(n),n.addEventListener("click",()=>{this.remove(n)}),s>0&&setTimeout(()=>{this.remove(n)},s),n}remove(e){e.style.animation="slideOutRight 0.3s ease-in",setTimeout(()=>{e.parentElement&&e.parentElement.removeChild(e)},300)}addAnimation(){if(!document.querySelector("#toast-animations")){const e=document.createElement("style");e.id="toast-animations",e.textContent=`
        @keyframes slideInRight {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideOutRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(400px);
            opacity: 0;
          }
        }
      `,document.head.appendChild(e)}}success(e,t){return this.show(e,"success",t)}error(e,t){return this.show(e,"error",t)}warning(e,t){return this.show(e,"warning",t)}info(e,t){return this.show(e,"info",t)}}const U=new Ir;class jr{constructor(){}async initializeLeaveTemplates(){await v.count("leave_templates")===0&&(await v.insert("leave_templates",{id:"LT001",name:"Standard Policy",cl:12,pl:18,sl:10,carry_forward:!0,max_carry_forward:5}),await v.insert("leave_templates",{id:"LT002",name:"Manager Policy",cl:15,pl:20,sl:10,carry_forward:!0,max_carry_forward:8}),await v.insert("leave_templates",{id:"LT003",name:"Probation Policy",cl:6,pl:0,sl:5,carry_forward:!1,max_carry_forward:0}))}async initializeSalaryTemplates(){await v.count("salary_templates")===0&&(await v.insert("salary_templates",{id:"ST001",name:"Junior Level",basic_percentage:40,hra_percentage:50,special_allowance:10,pf_applicable:!0,esi_applicable:!1,pt_applicable:!0}),await v.insert("salary_templates",{id:"ST002",name:"Mid Level",basic_percentage:45,hra_percentage:45,special_allowance:10,pf_applicable:!0,esi_applicable:!1,pt_applicable:!0}),await v.insert("salary_templates",{id:"ST003",name:"Senior Level",basic_percentage:50,hra_percentage:40,special_allowance:10,pf_applicable:!0,esi_applicable:!1,pt_applicable:!0}))}async getEmployees(e={}){const t={};return e.status&&(t.status=e.status),e.department&&(t.department=e.department),e.role&&(t.role=e.role),(await v.getAll("users",t)).map(n=>this._mapToLegacy(n))}async getEmployee(e){const t=await v.getOne("users","id",e);return t?this._mapToLegacy(t):null}async addEmployee(e){const t=await v.getAll("users"),s=t.filter(c=>c.employee_id?.startsWith("E")).length,n="E"+String(s+1).padStart(3,"0"),r="U"+String(t.length+1).padStart(3,"0"),i=this.generateTempPassword(),o=S.getCurrentUser(),l={id:r,employee_id:n,email:e.email,name:e.name,mobile:e.mobile||"",role:e.role||"employee",department:e.department,designation:e.designation,manager:e.manager||null,company_code:e.companyCode||"COMP001",status:"draft",joining_date:e.joiningDate,date_of_birth:e.dateOfBirth||null,address:e.address||"",emergency_contact:e.emergencyContact||"",blood_group:e.bloodGroup||"",temp_password:i,password_setup:!1,salary_structure:null,monthly_ctc:e.monthlyCTC||0,leave_policy:null,created_by:o?.userId||"system"},d=await v.insert("users",l);return d?(await this.logAction("employee_created",`Employee ${e.name} created with ID ${n}`),this._mapToLegacy(d)):null}async updateEmployee(e,t){const s=this._mapToDb(t);s.updated_at=new Date().toISOString(),s.updated_by=S.getCurrentUser()?.userId||"system";const n=await v.update("users","id",e,s);return n?(await this.logAction("employee_updated",`Employee ${e} updated`),this._mapToLegacy(n)):null}async assignSalaryStructure(e,t,s){const n=await this.getSalaryTemplate(s);if(!n)return null;const r=this.calculateSalaryBreakdown(t,n);return await this.updateEmployee(e,{monthlyCTC:t,salaryStructure:r})}calculateSalaryBreakdown(e,t){const s=t.basicPercentage||t.basic_percentage,n=t.hraPercentage||t.hra_percentage,r=t.pfApplicable??t.pf_applicable,i=t.esiApplicable??t.esi_applicable,o=t.ptApplicable??t.pt_applicable,l=Math.round(e*s/100),d=Math.round(e*n/100),c=e-l-d,p=r?Math.round(l*.12):0,u=i&&e<=21e3?Math.round(e*.0075):0,h=o?200:0;return{gross:e,basic:l,hra:d,conveyance:1600,specialAllowance:c-1600,pf:p,esi:u,pt:h,tds:0,netSalary:e-(p+u+h)}}async assignLeavePolicy(e,t){const s=await this.getLeaveTemplate(t);if(!s)return null;const n={templateId:t,cl:{total:s.cl,used:0,remaining:s.cl},pl:{total:s.pl,used:0,remaining:s.pl},sl:{total:s.sl,used:0,remaining:s.sl},carryForward:s.carry_forward??s.carryForward,maxCarryForward:s.max_carry_forward??s.maxCarryForward,assignedDate:new Date().toISOString()};return await this.updateEmployee(e,{leavePolicy:n})}async updateStatus(e,t,s,n=""){const r=await this.getEmployee(e);if(!r)return null;if(!{draft:["active","exited"],active:["notice_period","exited"],notice_period:["active","exited"],exited:[]}[r.status]?.includes(t))throw new Error(`Invalid status transition from ${r.status} to ${t}`);if(t==="active"&&r.status==="draft"){if(!r.salaryStructure)throw new Error("Cannot activate: Salary structure not assigned");if(!r.leavePolicy)throw new Error("Cannot activate: Leave policy not assigned")}const o={status:t,statusHistory:[...r.statusHistory||[],{from:r.status,to:t,date:s,remarks:n,changedBy:S.getCurrentUser()?.userId}]};return t==="active"?(o.activationDate=s,r.password||(o.password=r.tempPassword)):t==="exited"&&(o.exitDate=s),await this.logAction("status_changed",`Employee ${e} status changed to ${t}`),await this.updateEmployee(e,o)}async getLeaveTemplates(){return await v.getAll("leave_templates")}async getLeaveTemplate(e){return await v.getOne("leave_templates","id",e)}async getSalaryTemplates(){return await v.getAll("salary_templates")}async getSalaryTemplate(e){return await v.getOne("salary_templates","id",e)}generateTempPassword(){return"Temp"+Math.random().toString(36).substr(2,6)+"!"}async searchEmployees(e){const t=await this.getEmployees(),s=e.toLowerCase();return t.filter(n=>n.name?.toLowerCase().includes(s)||n.employeeId?.toLowerCase().includes(s)||n.email?.toLowerCase().includes(s)||n.department?.toLowerCase().includes(s))}async logAction(e,t){const s=S.getCurrentUser();s&&await S.logAudit(e,s.userId,t)}_mapToLegacy(e){return e?{id:e.id,employeeId:e.employee_id,email:e.email,password:e.password,tempPassword:e.temp_password,passwordSetup:e.password_setup,name:e.name,mobile:e.mobile,role:e.role,department:e.department,designation:e.designation,manager:e.manager,managerId:e.manager_id,companyCode:e.company_code,status:e.status,joiningDate:e.joining_date,dateOfBirth:e.date_of_birth,address:e.address,emergencyContact:e.emergency_contact,bloodGroup:e.blood_group,gender:e.gender,salary:e.salary,salaryStructure:e.salary_structure,monthlyCTC:e.monthly_ctc,leavePolicy:e.leave_policy,noticePeriod:e.notice_period,activationDate:e.activation_date,exitDate:e.exit_date,statusHistory:e.status_history,createdAt:e.created_at,createdBy:e.created_by,updatedAt:e.updated_at,updatedBy:e.updated_by}:null}_mapToDb(e){const t={employeeId:"employee_id",tempPassword:"temp_password",passwordSetup:"password_setup",companyCode:"company_code",joiningDate:"joining_date",dateOfBirth:"date_of_birth",emergencyContact:"emergency_contact",bloodGroup:"blood_group",salaryStructure:"salary_structure",monthlyCTC:"monthly_ctc",leavePolicy:"leave_policy",noticePeriod:"notice_period",activationDate:"activation_date",exitDate:"exit_date",statusHistory:"status_history",managerId:"manager_id",createdBy:"created_by",updatedBy:"updated_by"},s={};return Object.entries(e).forEach(([n,r])=>{const i=t[n]||n;s[i]=r}),s}}const E=new jr;class qr{constructor(){}async createAnnouncement(e){const t=await v.getAll("announcements"),s=S.getCurrentUser(),n={id:"ANN"+String(t.length+1).padStart(4,"0"),title:e.title,content:e.content,category:e.category,priority:e.priority||"normal",publish_date:new Date().toISOString(),expiry_date:e.expiryDate||null,created_by:s?.userId||"system",created_by_name:s?.name||"System",attachments:e.attachments||[],is_active:!0,views:0,likes:[]},r=await v.insert("announcements",n);return await this.logAction("announcement_created",`Announcement ${n.id} created`),r?this._mapToLegacy(r):null}async getAnnouncements(e={}){let t=await v.getAll("announcements",{},{column:"publish_date",ascending:!1});return t=t.map(s=>this._mapToLegacy(s)),e.category&&(t=t.filter(s=>s.category===e.category)),e.active!==void 0&&(t=t.filter(s=>s.isActive===e.active)),e.startDate&&(t=t.filter(s=>new Date(s.publishDate)>=new Date(e.startDate))),t=t.filter(s=>s.expiryDate?new Date(s.expiryDate)>=new Date:!0),t}async getAnnouncement(e){const t=await v.getOne("announcements","id",e);return t?this._mapToLegacy(t):null}async updateAnnouncement(e,t){const s={};t.title!==void 0&&(s.title=t.title),t.content!==void 0&&(s.content=t.content),t.category!==void 0&&(s.category=t.category),t.priority!==void 0&&(s.priority=t.priority),t.isActive!==void 0&&(s.is_active=t.isActive),s.updated_at=new Date().toISOString();const n=await v.update("announcements","id",e,s);return n?this._mapToLegacy(n):null}async deleteAnnouncement(e){return await v.deleteRow("announcements","id",e)}async likeAnnouncement(e,t){const s=await v.getOne("announcements","id",e);s&&!s.likes.includes(t)&&(s.likes.push(t),await v.update("announcements","id",e,{likes:s.likes}))}async getBirthdays(e=7){const t=await v.getAll("users",{status:"active"}),s=new Date,n=[];return t.forEach(r=>{if(!r.date_of_birth)return;const i=new Date(r.date_of_birth),o=s.getFullYear(),l=new Date(o,i.getMonth(),i.getDate()),d=l-s,c=Math.ceil(d/(1e3*60*60*24));c>=0&&c<=e&&n.push({userId:r.id,name:r.name,date:l.toISOString().split("T")[0],daysUntil:c,age:o-i.getFullYear(),isToday:c===0})}),n.sort((r,i)=>r.daysUntil-i.daysUntil)}async getAnniversaries(e=7){const t=await v.getAll("users",{status:"active"}),s=new Date,n=[];return t.forEach(r=>{if(!r.joining_date)return;const i=new Date(r.joining_date),o=s.getFullYear(),l=new Date(o,i.getMonth(),i.getDate()),d=l-s,c=Math.ceil(d/(1e3*60*60*24)),p=o-i.getFullYear();c>=0&&c<=e&&p>0&&n.push({userId:r.id,name:r.name,date:l.toISOString().split("T")[0],daysUntil:c,years:p,isToday:c===0})}),n.sort((r,i)=>r.daysUntil-i.daysUntil)}async logAction(e,t){const s=S.getCurrentUser();s&&await S.logAudit(e,s.userId,t)}_mapToLegacy(e){return e?{id:e.id,title:e.title,content:e.content,category:e.category,priority:e.priority,publishDate:e.publish_date,expiryDate:e.expiry_date,createdBy:e.created_by,createdByName:e.created_by_name,attachments:e.attachments||[],isActive:e.is_active,views:e.views,likes:e.likes||[]}:null}}const ve=new qr;function Mr(a,e,t){const s=document.createElement("div");s.className="dashboard-layout";const n=Ur(a,e,t);s.appendChild(n);const r=document.createElement("main");r.className="main-content";const i=document.createElement("header");i.style.display="flex",i.style.justifyContent="flex-end",i.style.padding="1rem 2rem",i.style.background="white",i.style.borderBottom="1px solid var(--border)",i.appendChild(Rr()),r.appendChild(i);const o=document.createElement("div");return o.id="dashboard-content",o.style.padding="2rem",o.appendChild(La(a,t)),r.appendChild(o),s.appendChild(r),s}function Ur(a,e,t){const s=document.createElement("aside");s.className="sidebar";const n=Nr(a.role);s.innerHTML=`
    <div class="sidebar-header">
      <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
        <div class="logo" style="font-size: 1.75rem; color: var(--primary-lime); font-family: 'Space Grotesk', sans-serif; letter-spacing: -1px; font-weight: 700;">Subix</div>
      </div>
      <div class="text-sm text-muted">${a.name}</div>
      <div class="text-xs text-muted" style="color: var(--primary-lime);">${a.role.replace("_"," ").toUpperCase()}</div>
    </div>

    <nav class="sidebar-nav" id="sidebar-nav">
      ${n.map(i=>`
        <a href="#" class="nav-item ${i.id==="dashboard"?"active":""}" data-page="${i.id}">
          ${i.label}
        </a>
      `).join("")}
    </nav>

    <div id="logout-section" style="margin-top: auto; padding: 1rem 0; border-top: 1px solid var(--border); flex-shrink: 0; background: var(--surface);">
      <button class="btn btn-secondary w-full" id="logout-btn" style="margin-bottom: 1rem; display: block !important; visibility: visible !important;">
        LOGOUT
      </button>
      <div style="text-align: center;">
        <p class="text-xs text-muted">developed by <a href="https://www.subix.io/" target="_blank" style="color: var(--primary-lime); text-decoration: none;">Subix Team</a></p>
      </div>
    </div>
  `,s.querySelectorAll(".nav-item").forEach(i=>{i.addEventListener("click",o=>{o.preventDefault(),s.querySelectorAll(".nav-item").forEach(l=>l.classList.remove("active")),i.classList.add("active"),t(i.dataset.page)})});const r=s.querySelector("#logout-btn");return r&&r.addEventListener("click",()=>{e()}),s}function Nr(a){const e={employee:[{id:"dashboard",label:"Dashboard"},{id:"announcements",label:"Announcements"},{id:"employees",label:"Directory"},{id:"attendance",label:"Attendance"},{id:"leaves",label:"Leaves"},{id:"salary",label:"Salary"},{id:"documents",label:"Documents"},{id:"performance",label:"Performance"},{id:"exit",label:"Resignation"},{id:"profile",label:"Profile"}],manager:[{id:"dashboard",label:"Dashboard"},{id:"announcements",label:"Announcements"},{id:"employees",label:"Directory"},{id:"team",label:"My Team"},{id:"approvals",label:"Approvals"},{id:"attendance",label:"Attendance"},{id:"leaves",label:"Leaves"},{id:"performance",label:"Performance"},{id:"exit",label:"Exit Approvals"},{id:"profile",label:"Profile"}],hr_admin:[{id:"dashboard",label:"Dashboard"},{id:"announcements",label:"Announcements"},{id:"employees",label:"Employees"},{id:"approvals",label:"Approvals"},{id:"attendance",label:"Attendance"},{id:"leaves",label:"Leaves"},{id:"shifts",label:"Shifts & Roster"},{id:"performance",label:"Performance"},{id:"exit",label:"Exit & FnF"},{id:"payroll",label:"Payroll"},{id:"reports",label:"Reports & Analytics"}],super_admin:[{id:"dashboard",label:"Dashboard"},{id:"announcements",label:"Announcements"},{id:"company",label:"Company"},{id:"employees",label:"Employees"},{id:"approvals",label:"Approvals"},{id:"shifts",label:"Shifts & Roster"},{id:"payroll",label:"Payroll"},{id:"performance",label:"Performance"},{id:"exit",label:"Exit & FnF"},{id:"reports",label:"Reports & Analytics"},{id:"settings",label:"Settings"}]};return e[a]||e.employee}function La(a,e){const t=document.createElement("div"),s=new Date().getHours(),n=s<12?"Good Morning":s<18?"Good Afternoon":"Good Evening";return t.innerHTML=`
    <!-- Hero Section -->
    <div style="
      background: linear-gradient(135deg, rgba(204, 255, 0, 0.15) 0%, rgba(5, 5, 5, 1) 100%);
      border-radius: 24px;
      padding: 3rem 2.5rem;
      margin-bottom: 2.5rem;
      position: relative;
      overflow: hidden;
      border: 1px solid rgba(204, 255, 0, 0.1);
    ">
      <div style="position: relative; z-index: 2;">
        <h1 style="font-size: 2.5rem; margin-bottom: 0.5rem; font-weight: 700;">${n}, ${a.name.split(" ")[0]}!</h1>
        <p style="color: var(--text-muted); font-size: 1.1rem; max-width: 600px;">
          Here's what's happening today. You have <span style="color: var(--primary-lime); font-weight: 600;">2 pending approvals</span> and <span style="color: var(--accent-cyan); font-weight: 600;">1 upcoming event</span>.
        </p>
        
        <div style="margin-top: 2rem; display: flex; gap: 1rem;">
          <button class="btn btn-primary" data-action="attendance" style="padding: 0.75rem 1.5rem;">
            Record Attendance
          </button>
          <button class="btn btn-secondary" data-action="leave" style="padding: 0.75rem 1.5rem;">
            Apply Leave
          </button>
        </div>
      </div>
      
      <!-- Decorative Elements -->
      <div style="
        position: absolute; 
        right: -50px; 
        top: -50px; 
        width: 300px; 
        height: 300px; 
        background: radial-gradient(circle, rgba(204, 255, 0, 0.1) 0%, transparent 70%); 
        border-radius: 50%;
        filter: blur(40px);
      "></div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-4 mb-6">
      <div class="card stat-card" style="position: relative; overflow: hidden; border: 1px solid var(--border);">
        <div style="position: relative; z-index: 1;">
          <div class="stat-label text-left mb-2">Attendance</div>
          <div class="stat-value text-left" style="font-size: 2rem;">96%</div>
          <div class="text-xs text-muted text-left mt-1">
            <span style="color: var(--success);">↑ 2%</span> vs last month
          </div>
        </div>
      </div>

      <div class="card stat-card" style="position: relative; overflow: hidden; border: 1px solid var(--border);">
        <div style="position: relative; z-index: 1;">
          <div class="stat-label text-left mb-2">Leave Balance</div>
          <div class="stat-value text-left" style="font-size: 2rem;">14</div>
          <div class="text-xs text-muted text-left mt-1">Days Available</div>
        </div>
      </div>

      <div class="card stat-card" style="position: relative; overflow: hidden; border: 1px solid var(--border);">
        <div style="position: relative; z-index: 1;">
          <div class="stat-label text-left mb-2">Upcoming Salary</div>
          <div class="stat-value text-left" style="font-size: 2rem;">₹45k</div>
          <div class="text-xs text-muted text-left mt-1">Expected: Jan 31</div>
        </div>
      </div>

      <div class="card stat-card" style="position: relative; overflow: hidden; border: 1px solid var(--border);">
        <div style="position: relative; z-index: 1;">
          <div class="stat-label text-left mb-2">Projects</div>
          <div class="stat-value text-left" style="font-size: 2rem;">3</div>
          <div class="text-xs text-muted text-left mt-1">Active Tasks</div>
        </div>
      </div>
    </div>

    <!-- Main Content Layout (2 Columns) -->
    <div class="grid" style="grid-template-columns: 2fr 1fr; gap: 2rem; align-items: start;">
      
      <!-- Left Column -->
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        
        <!-- Recent Activity -->
        <div class="card">
          <div class="flex justify-between items-center mb-6">
            <h3 class="card-title" style="font-size: 1.25rem;">Recent Activity</h3>
            <button class="btn btn-sm btn-text">View All</button>
          </div>
          <div class="activity-timeline">
            ${Hr()}
          </div>
        </div>

        <!-- Directory Preview -->
        <div class="card">
          <div class="flex justify-between items-center mb-6">
            <h3 class="card-title" style="font-size: 1.25rem;">My Team</h3>
            <button class="btn btn-sm btn-text" data-action="directory">View All</button>
          </div>
          <div class="employee-grid-preview" id="employee-directory-preview">
            <div class="text-muted text-center py-4">Loading...</div>
          </div>
        </div>

      </div>

      <!-- Right Column -->
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        
        <!-- Announcements Widget -->
        <div class="card" style="background: linear-gradient(180deg, var(--surface) 0%, rgba(204, 255, 0, 0.02) 100%);">
          <div class="flex justify-between items-center mb-4">
             <h3 class="card-title" style="font-size: 1.1rem;">Announcements</h3>
             <button class="btn btn-icon btn-sm" data-action="announcements">➔</button>
          </div>
          <div id="announcements-preview">
            <div class="text-muted text-center py-4 text-sm">Loading...</div>
          </div>
        </div>

        <!-- Birthdays Widget -->
        <div class="card">
          <h3 class="card-title mb-4" style="font-size: 1.1rem;">Birthdays</h3>
          <div id="birthdays-list">
            <div class="text-muted text-center py-4 text-sm">Loading...</div>
          </div>
        </div>

        <!-- Work Anniversaries Widget -->
        <div class="card">
          <h3 class="card-title mb-4" style="font-size: 1.1rem;">Work Anniversaries</h3>
          <div id="anniversaries-list">
            <div class="text-muted text-center py-4 text-sm">Loading...</div>
          </div>
        </div>

      </div>
    
    </div>
  `,setTimeout(()=>{const r=t.querySelector('[data-action="directory"]');r&&r.addEventListener("click",()=>{e("employees")}),t.querySelectorAll(".view-employee-btn").forEach(l=>{l.addEventListener("click",async d=>{const c=d.currentTarget.dataset.id,p=await E.getEmployee(c);p&&Oa(p)})}),Br(t);const i=t.querySelector('[data-action="announcements"]');i&&i.addEventListener("click",()=>{e("announcements")}),t.querySelectorAll("[data-action]").forEach(l=>{l.addEventListener("click",d=>{const c=d.currentTarget.dataset.action,p=document.querySelector(".sidebar");if(p){p.querySelectorAll(".nav-item").forEach(m=>m.classList.remove("active"));const u=c==="leave"?"leaves":c==="payslip"?"salary":c,h=p.querySelector(`[data-page="${u}"]`);h&&h.classList.add("active")}c==="attendance"?(e("attendance"),U.info("Opening Attendance Module...")):c==="leave"?(e("leaves"),U.info("Opening Leave Management...")):c==="payslip"&&(e("salary"),U.info("Opening Salary & Payslips..."))})})},0),t}function Oa(a){let e=document.getElementById("employee-modal");if(e&&e.remove(),e=document.createElement("div"),e.id="employee-modal",e.style.position="fixed",e.style.top="0",e.style.left="0",e.style.width="100%",e.style.height="100%",e.style.backgroundColor="rgba(0, 0, 0, 0.7)",e.style.display="flex",e.style.alignItems="center",e.style.justifyContent="center",e.style.zIndex="1000",e.style.backdropFilter="blur(5px)",e.innerHTML=`
    <div class="card" style="width: 400px; max-width: 90%; position: relative; padding: 0; overflow: hidden; animation: slideIn 0.3s ease-out;">
      <button id="close-modal" style="position: absolute; top: 1rem; right: 1rem; background: rgba(0,0,0,0.5); border: none; color: white; border-radius: 50%; width: 32px; height: 32px; cursor: pointer; z-index: 10;">✕</button>
      
      <!-- Header / Cover -->
      <div style="height: 120px; background: linear-gradient(135deg, var(--primary-lime), var(--accent-cyan)); position: relative;">
        <div style="position: absolute; bottom: -40px; left: 50%; transform: translateX(-50%);">
          <div style="width: 80px; height: 80px; border-radius: 50%; background: var(--surface); border: 4px solid var(--surface); display: flex; align-items: center; justify-content: center; font-size: 2.5rem; color: var(--text-main); box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
            ${a.name.charAt(0)}
          </div>
        </div>
      </div>

      <div style="padding: 3rem 1.5rem 1.5rem; text-align: center;">
        <h2 style="margin-bottom: 0.25rem;">${a.name}</h2>
        <p class="text-muted" style="font-size: 0.9rem; margin-bottom: 1rem;">${a.designation} • ${a.department}</p>
        
        <div style="display: flex; gap: 0.5rem; justify-content: center; margin-bottom: 1.5rem;">
          <span class="badge badge-success">Active</span>
          <span class="badge badge-primary">${a.role||"Employee"}</span>
        </div>

        <div style="text-align: left; display: grid; gap: 1rem; background: var(--bg-secondary); padding: 1rem; border-radius: 8px;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <span style="font-size: 1.2rem;">📧</span>
            <div>
              <div class="text-xs text-muted">Email</div>
              <div style="font-weight: 500;">${a.email}</div>
            </div>
          </div>
          
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <span style="font-size: 1.2rem;">📞</span>
            <div>
              <div class="text-xs text-muted">Phone</div>
              <div style="font-weight: 500;">${a.mobile||"+91 98765 43210"}</div>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <span style="font-size: 1.2rem;">🆔</span>
            <div>
              <div class="text-xs text-muted">Employee ID</div>
              <div style="font-weight: 500;">${a.employeeId||"EMP001"}</div>
            </div>
          </div>
        </div>

         <div style="margin-top: 1.5rem; display: flex; gap: 1rem;">
          <button class="btn btn-primary w-full" onclick="window.location.href='mailto:${a.email}'">Email</button>
          <button class="btn btn-secondary w-full" onclick="alert('Calling feature coming soon!')">Call</button>
        </div>
      </div>
    </div>
  `,document.body.appendChild(e),e.querySelector("#close-modal").addEventListener("click",()=>{e.remove()}),e.addEventListener("click",t=>{t.target===e&&e.remove()}),!document.querySelector("#modal-animation")){const t=document.createElement("style");t.id="modal-animation",t.innerHTML=`
      @keyframes slideIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `,document.head.appendChild(t)}}function Hr(){const a=[{icon:"✅",color:"#22c55e",bg:"rgba(34, 197, 94, 0.1)",title:"Marked Attendance",time:"Today, 09:30 AM",desc:"Punched in from Web Dashboard"},{icon:"📅",color:"#eab308",bg:"rgba(234, 179, 8, 0.1)",title:"Leave Request",time:"Yesterday, 4:00 PM",desc:"Sick Leave request submitted"},{icon:"💰",color:"#3b82f6",bg:"rgba(59, 130, 246, 0.1)",title:"Salary Credited",time:"Dec 31, 2025",desc:"Salary for December 2025"},{icon:"🚀",color:"#a855f7",bg:"rgba(168, 85, 247, 0.1)",title:"Project Update",time:"Dec 28, 2025",desc:"Completed Q4 Goals"}];return a.map((e,t)=>`
    <div class="timeline-item" style="display: flex; gap: 1rem; position: relative; padding-bottom: 2rem;">
      ${t!==a.length-1?'<div style="position: absolute; left: 1.25rem; top: 2.5rem; bottom: 0; width: 2px; background: var(--border);"></div>':""}
      <div class="timeline-icon" style="min-width: 2.5rem; height: 2.5rem; border-radius: 50%; background: ${e.bg}; color: ${e.color}; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; z-index: 1;">
        ${e.icon}
      </div>
      <div class="timeline-content" style="flex: 1; padding-top: 0.25rem;">
        <div style="display: flex; justify-content: space-between; align-items: start;">
          <h4 style="margin: 0; font-size: 1rem; font-weight: 600;">${e.title}</h4>
          <span style="font-size: 0.75rem; color: var(--text-muted); padding-top: 0.25rem;">${e.time}</span>
        </div>
        <p style="margin: 0.25rem 0 0; font-size: 0.9rem; color: var(--text-muted);">${e.desc}</p>
      </div>
    </div>
  `).join("")}async function Br(a){try{const e=await E.getEmployees({status:"active"}),t=a.querySelector("#employee-directory-preview");t&&(e.length===0?t.innerHTML='<div class="text-muted text-center py-4">No active employees found</div>':(t.innerHTML=`<div style="display: grid; gap: 1rem;">${e.slice(0,5).map(d=>`
          <div class="employee-row" style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: var(--bg-hover); border-radius: 12px; transition: transform 0.2s;">
            <div class="avatar" style="width: 3rem; height: 3rem; background: var(--primary-gradient); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 1.1rem; border: 2px solid var(--surface);">
              ${d.name.charAt(0)}${d.name.split(" ")[1]?d.name.split(" ")[1].charAt(0):""}
            </div>
            <div style="flex: 1;">
              <div style="font-weight: 600; font-size: 1rem;">${d.name}</div>
              <div style="font-size: 0.85rem; color: var(--text-muted);">${d.designation||"Employee"}</div>
            </div>
            <button class="btn btn-sm view-employee-btn" data-id="${d.id}" style="background: transparent; color: var(--primary-lime); border: 1px solid var(--primary-lime); font-size: 0.8rem; padding: 0.5rem 1.25rem; border-radius: 8px; font-weight: 600;">View</button>
          </div>
        `).join("")}</div>`,t.querySelectorAll(".view-employee-btn").forEach(d=>{d.addEventListener("click",async c=>{const p=c.currentTarget.dataset.id,u=await E.getEmployee(p);u&&Oa(u)})})));const s=await ve.getAnnouncements({active:!0}),n=a.querySelector("#announcements-preview");n&&(!s||s.length===0?n.innerHTML='<div class="text-muted text-center py-4 text-sm">No announcements</div>':n.innerHTML=s.slice(0,3).map(d=>`
          <div style="margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border);">
            <div class="font-bold text-sm mb-1">${d.title}</div>
            <div class="text-xs text-muted flex justify-between">
              <span>${d.category}</span>
              <span>${new Date(d.publishDate).toLocaleDateString()}</span>
            </div>
          </div>
        `).join(""));const r=await ve.getBirthdays(7),i=a.querySelector("#birthdays-list");i&&(!r||r.length===0?i.innerHTML='<div class="text-muted text-center py-4 text-sm">No upcoming birthdays</div>':i.innerHTML=r.slice(0,3).map(d=>`
          <div class="flex items-center gap-3 mb-3 last:mb-0 p-2 rounded-lg hover:bg-white/5 transition-colors">
            <div style="font-size: 1.5rem;">${d.isToday?"🎂":"🎈"}</div>
            <div>
              <div class="font-medium text-sm">${d.name}</div>
              <div class="text-xs text-muted">${d.isToday?"Today":`In ${d.daysUntil} days`}</div>
            </div>
          </div>
        `).join(""));const o=await ve.getAnniversaries(7),l=a.querySelector("#anniversaries-list");l&&(!o||o.length===0?l.innerHTML='<div class="text-muted text-center py-4 text-sm">No upcoming anniversaries</div>':l.innerHTML=o.slice(0,3).map(d=>`
          <div class="flex items-center gap-3 mb-3 last:mb-0 p-2 rounded-lg hover:bg-white/5 transition-colors">
            <div style="font-size: 1.5rem;">${d.isToday?"🎊":"🏅"}</div>
            <div>
              <div class="font-medium text-sm">${d.name}</div>
              <div class="text-xs text-muted">${d.years} Year${d.years>1?"s":""} • ${d.isToday?"Today":`In ${d.daysUntil} days`}</div>
            </div>
          </div>
        `).join(""))}catch(e){console.error("Error loading dashboard async data:",e)}}class zr{constructor(){}async initializeDefaults(){}async getCompany(){return await v.getOne("company","id","COMP001")}async updateCompany(e){const t=await this.getCompany(),s={...e,updated_at:new Date().toISOString()};if(t){const n=await v.update("company","id",t.id,s);return await this.logAction("company_updated","Company details updated"),n}return null}async getDepartments(){return await v.getAll("departments")}async getDepartment(e){return await v.getOne("departments","id",e)}async addDepartment(e,t=null){const s=await this.getDepartments(),n={id:"DEPT"+String(s.length+1).padStart(3,"0"),name:e,head_id:t,status:"active"},r=await v.insert("departments",n);return await this.logAction("department_created",`Department ${e} created`),r}async updateDepartment(e,t){const s={...t,updated_at:new Date().toISOString()},n=await v.update("departments","id",e,s);return n&&await this.logAction("department_updated",`Department ${e} updated`),n}async deleteDepartment(e){const t=await v.deleteRow("departments","id",e);return await this.logAction("department_deleted",`Department ${e} deleted`),t}async getDesignations(){return await v.getAll("designations")}async getDesignationsByDepartment(e){return await v.getAll("designations",{department_id:e})}async addDesignation(e,t,s){const n=await this.getDesignations(),r={id:"DES"+String(n.length+1).padStart(3,"0"),name:e,level:t,department_id:s,status:"active"},i=await v.insert("designations",r);return await this.logAction("designation_created",`Designation ${e} created`),i}async updateDesignation(e,t){const s=await v.update("designations","id",e,t);return s&&await this.logAction("designation_updated",`Designation ${e} updated`),s}async deleteDesignation(e){const t=await v.deleteRow("designations","id",e);return await this.logAction("designation_deleted",`Designation ${e} deleted`),t}async getHolidays(e=new Date().getFullYear()){return await v.getAll("holidays",{year:e})}async addHoliday(e,t,s="public"){const n=new Date(t).getFullYear(),r=await v.getAll("holidays"),i={id:"HOL"+String(r.length+1).padStart(3,"0"),name:e,date:t,type:s,year:n},o=await v.insert("holidays",i);return await this.logAction("holiday_created",`Holiday ${e} added`),o}async deleteHoliday(e){const t=await v.deleteRow("holidays","id",e);return await this.logAction("holiday_deleted",`Holiday ${e} deleted`),t}async logAction(e,t){const s=S.getCurrentUser();s&&await S.logAudit(e,s.userId,t)}}const W=new zr;function Lt(){const a=document.createElement("div");return a.innerHTML='<div class="text-muted text-center py-8">Loading settings...</div>',Fr(a),a}async function Fr(a){const e=await W.getCompany();a.innerHTML=`
    <div class="page-header">
      <h1 class="page-title">Company Settings</h1>
      <p class="page-subtitle">Manage company configuration and basic details</p>
    </div>

    <div class="grid grid-2 mb-6">
      <!-- Company Details Card -->
      <div class="card">
        <h3 class="mb-4">Company Information</h3>
        <form id="company-form">
          <div class="form-group">
            <label>Company Name</label>
            <input type="text" id="companyName" value="${e?.name||""}" required />
          </div>

          <div class="form-group">
            <label>Company Code</label>
            <input type="text" id="companyCode" value="${e?.code||""}" disabled />
          </div>

          <div class="form-group">
            <label>Industry</label>
            <select id="industry">
              <option value="Technology" ${e?.industry==="Technology"?"selected":""}>Technology</option>
              <option value="Manufacturing" ${e?.industry==="Manufacturing"?"selected":""}>Manufacturing</option>
              <option value="Retail" ${e?.industry==="Retail"?"selected":""}>Retail</option>
              <option value="Healthcare" ${e?.industry==="Healthcare"?"selected":""}>Healthcare</option>
              <option value="Finance" ${e?.industry==="Finance"?"selected":""}>Finance</option>
              <option value="Education" ${e?.industry==="Education"?"selected":""}>Education</option>
            </select>
          </div>

          <div class="form-group">
            <label>Address</label>
            <textarea id="address" rows="3">${e?.address||""}</textarea>
          </div>

          <button type="submit" class="btn btn-primary">Save Company Details</button>
        </form>
      </div>

      <!-- Working Configuration Card -->
      <div class="card">
        <h3 class="mb-4">Working Configuration</h3>
        <form id="config-form">
          <div class="form-group">
            <label>Time Zone</label>
            <select id="timezone">
              <option value="IST" ${e?.timezone==="IST"?"selected":""}>IST (GMT+5:30)</option>
              <option value="EST" ${e?.timezone==="EST"?"selected":""}>EST (GMT-5:00)</option>
              <option value="PST" ${e?.timezone==="PST"?"selected":""}>PST (GMT-8:00)</option>
              <option value="GMT" ${e?.timezone==="GMT"?"selected":""}>GMT (GMT+0:00)</option>
            </select>
          </div>

          <div class="form-group">
            <label>Working Days</label>
            <select id="workingDays">
              <option value="Monday to Friday" ${e?.workingDays==="Monday to Friday"?"selected":""}>Monday to Friday</option>
              <option value="Monday to Saturday" ${e?.workingDays==="Monday to Saturday"?"selected":""}>Monday to Saturday</option>
            </select>
          </div>

          <div class="form-group">
            <label>Work Start Time</label>
            <input type="time" id="workStartTime" value="${e?.settings?.workStartTime||"09:00"}" />
          </div>

          <div class="form-group">
            <label>Work End Time</label>
            <input type="time" id="workEndTime" value="${e?.settings?.workEndTime||"18:00"}" />
          </div>

          <div class="form-group">
            <label>Payroll Cycle</label>
            <select id="payrollCycle">
              <option value="1st to 30th" ${e?.payrollCycle==="1st to 30th"?"selected":""}>1st to 30th of month</option>
              <option value="25th to 24th" ${e?.payrollCycle==="25th to 24th"?"selected":""}>25th to 24th of month</option>
            </select>
          </div>

          <button type="submit" class="btn btn-primary">Save Configuration</button>
        </form>
      </div>
    </div>

    <div id="success-message" class="alert alert-success" style="display: none;">
      Settings saved successfully!
    </div>
  `,a.querySelector("#company-form").addEventListener("submit",async n=>{n.preventDefault();const r={name:a.querySelector("#companyName").value,industry:a.querySelector("#industry").value,address:a.querySelector("#address").value};await W.updateCompany(r),da(a)}),a.querySelector("#config-form").addEventListener("submit",async n=>{n.preventDefault();const r={timezone:a.querySelector("#timezone").value,workingDays:a.querySelector("#workingDays").value,payrollCycle:a.querySelector("#payrollCycle").value,settings:{workStartTime:a.querySelector("#workStartTime").value,workEndTime:a.querySelector("#workEndTime").value}};await W.updateCompany(r),da(a)})}function da(a){const e=a.querySelector("#success-message");e.style.display="block",setTimeout(()=>{e.style.display="none"},3e3)}function Gr(){const a=document.createElement("div");a.id="organization-container",a.innerHTML=`
    <div class="page-header flex justify-between items-center">
      <div>
        <h1 class="page-title">Organization Structure</h1>
        <p class="page-subtitle">Manage departments, designations, and hierarchy</p>
      </div>
      <button class="btn btn-primary" id="add-dept-btn">+ Add Department</button>
    </div>

    <!-- Departments Section -->
    <div class="card mb-6">
      <h3 class="mb-4">Departments</h3>
      <div id="departments-list"></div>
    </div>

    <!-- Designations Section -->
    <div class="card">
      <div class="flex justify-between items-center mb-4">
        <h3>Designations</h3>
        <button class="btn btn-primary" id="add-designation-btn">+ Add Designation</button>
      </div>
      <div id="designations-list"></div>
    </div>

    <!-- Add Department Modal -->
    <div id="dept-modal" class="modal" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); padding: 2rem; overflow-y: auto; z-index: 1000;">
      <div class="card" style="max-width: 500px; margin: 2rem auto;">
        <h3 class="mb-4">Add Department</h3>
        <form id="dept-form">
          <div class="form-group">
            <label>Department Name</label>
            <input type="text" id="dept-name" required />
          </div>

          <div class="form-group">
            <label>Department Head (Optional)</label>
            <select id="dept-head">
              <option value="">-- Select Head --</option>
              <!-- Options loaded dynamically -->
            </select>
          </div>

          <div class="flex gap-2">
            <button type="submit" class="btn btn-primary">Save</button>
            <button type="button" class="btn btn-secondary" id="cancel-dept">Cancel</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Add Designation Modal -->
    <div id="designation-modal" class="modal" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); padding: 2rem; overflow-y: auto; z-index: 1000;">
      <div class="card" style="max-width: 500px; margin: 2rem auto;">
        <h3 class="mb-4">Add Designation</h3>
        <form id="designation-form">
          <div class="form-group">
            <label>Designation Name</label>
            <input type="text" id="designation-name" required />
          </div>

          <div class="form-group">
            <label>Department</label>
            <select id="designation-dept" required>
              <option value="">-- Select Department --</option>
              <!-- Options loaded dynamically -->
            </select>
          </div>

          <div class="form-group">
            <label>Level</label>
            <select id="designation-level" required>
              <option value="1">Level 1 - Junior</option>
              <option value="2">Level 2 - Mid</option>
              <option value="3">Level 3 - Senior</option>
              <option value="4">Level 4 - Lead/Manager</option>
              <option value="5">Level 5 - Director</option>
            </select>
          </div>

          <div class="flex gap-2">
            <button type="submit" class="btn btn-primary">Save</button>
            <button type="button" class="btn btn-secondary" id="cancel-designation">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  `,ca(a),ua(a);const e=()=>{document.body.contains(a)&&(ca(a),ua(a))};window.addEventListener("organization-updated",e);const t=a.querySelector("#dept-modal"),s=a.querySelector("#add-dept-btn"),n=a.querySelector("#cancel-dept"),r=a.querySelector("#dept-form");s.addEventListener("click",async()=>{const c=a.querySelector("#dept-head");c.innerHTML='<option value="">-- Select Head --</option>'+await Wr(),t.style.display="block"}),n.addEventListener("click",()=>{t.style.display="none",r.reset()}),r.addEventListener("submit",async c=>{c.preventDefault();const p=a.querySelector("#dept-name").value,u=a.querySelector("#dept-head").value||null;await W.addDepartment(p,u),t.style.display="none",r.reset(),window.dispatchEvent(new Event("organization-updated"))});const i=a.querySelector("#designation-modal"),o=a.querySelector("#add-designation-btn"),l=a.querySelector("#cancel-designation"),d=a.querySelector("#designation-form");return o.addEventListener("click",async()=>{const c=i.querySelector("#designation-dept");c.innerHTML='<option value="">-- Select Department --</option>'+await Vr(),i.style.display="block"}),l.addEventListener("click",()=>{i.style.display="none",d.reset()}),d.addEventListener("submit",async c=>{c.preventDefault();const p=a.querySelector("#designation-name").value,u=parseInt(a.querySelector("#designation-level").value),h=a.querySelector("#designation-dept").value;await W.addDesignation(p,u,h),i.style.display="none",d.reset(),window.dispatchEvent(new Event("organization-updated"))}),a}async function ca(a){const e=await W.getDepartments(),t=a.querySelector("#departments-list");if(e.length===0){t.innerHTML='<p class="text-muted">No departments added yet</p>';return}const s=document.createElement("table");s.innerHTML=`
    <thead>
      <tr>
        <th>Department Name</th>
        <th>Department ID</th>
        <th>Status</th>
        <th>Created Date</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      ${e.map(n=>`
        <tr>
          <td class="font-medium">${n.name}</td>
          <td>${n.id}</td>
          <td><span class="badge badge-success">${n.status}</span></td>
          <td>${new Date(n.createdAt).toLocaleDateString()}</td>
          <td>
            <button class="btn btn-secondary text-sm" style="padding: 0.25rem 0.75rem;" onclick="alert('Edit: ${n.id}')">Edit</button>
            <button class="btn btn-secondary text-sm" style="padding: 0.25rem 0.75rem; color: var(--danger);" onclick="if(confirm('Delete ${n.name}?')) { window.deleteDepartment('${n.id}') }">Delete</button>
          </td>
        </tr>
      `).join("")}
    </tbody>
  `,t.innerHTML="",t.appendChild(s)}async function ua(a){const e=await W.getDesignations(),t=await W.getDepartments(),s=a.querySelector("#designations-list");if(e.length===0){s.innerHTML='<p class="text-muted">No designations added yet</p>';return}const n=document.createElement("table");n.innerHTML=`
    <thead>
      <tr>
        <th>Designation</th>
        <th>Department</th>
        <th>Level</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      ${e.map(r=>{const i=t.find(o=>o.id===r.departmentId);return`
          <tr>
            <td class="font-medium">${r.name}</td>
            <td>${i?.name||"N/A"}</td>
            <td>Level ${r.level}</td>
            <td><span class="badge badge-success">${r.status}</span></td>
            <td>
              <button class="btn btn-secondary text-sm" style="padding: 0.25rem 0.75rem;" onclick="alert('Edit: ${r.id}')">Edit</button>
              <button class="btn btn-secondary text-sm" style="padding: 0.25rem 0.75rem; color: var(--danger);" onclick="if(confirm('Delete ${r.name}?')) { window.deleteDesignation('${r.id}') }">Delete</button>
            </td>
          </tr>
        `}).join("")}
    </tbody>
  `,s.innerHTML="",s.appendChild(n)}async function Wr(){return(await E.getEmployees()).map(e=>`<option value="${e.id}">${e.name} (${e.employeeId})</option>`).join("")}async function Vr(){return(await W.getDepartments()).map(e=>`<option value="${e.id}">${e.name}</option>`).join("")}window.deleteDepartment=async a=>{await W.deleteDepartment(a),window.dispatchEvent(new Event("organization-updated"))};window.deleteDesignation=async a=>{await W.deleteDesignation(a),window.dispatchEvent(new Event("organization-updated"))};function Kr(){const a=document.createElement("div");a.id="holidays-container";const e=new Date().getFullYear();a.innerHTML=`
    <div class="page-header flex justify-between items-center">
      <div>
        <h1 class="page-title">Holiday Calendar</h1>
        <p class="page-subtitle">Manage company holidays and working days</p>
      </div>
      <button class="btn btn-primary" id="add-holiday-btn">+ Add Holiday</button>
    </div>

    <div class="card mb-4">
      <div class="flex justify-between items-center mb-4">
        <h3>Holidays for ${e}</h3>
        <select id="year-select" class="btn btn-secondary">
          <option value="2024">2024</option>
          <option value="2025" selected>2025</option>
          <option value="2026">2026</option>
        </select>
      </div>
      
      <div id="holidays-list"></div>
    </div>

    <!-- Add Holiday Modal -->
    <div id="holiday-modal" class="modal" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); padding: 2rem; overflow-y: auto; z-index: 1000;">
      <div class="card" style="max-width: 500px; margin: 2rem auto;">
        <h3 class="mb-4">Add Holiday</h3>
        <form id="holiday-form">
          <div class="form-group">
            <label>Holiday Name</label>
            <input type="text" id="holiday-name" required />
          </div>

          <div class="form-group">
            <label>Date</label>
            <input type="date" id="holiday-date" required />
          </div>

          <div class="form-group">
            <label>Type</label>
            <select id="holiday-type">
              <option value="public">Public Holiday</option>
              <option value="optional">Optional Holiday</option>
              <option value="restricted">Restricted Holiday</option>
            </select>
          </div>

          <div class="flex gap-2">
            <button type="submit" class="btn btn-primary">Add Holiday</button>
            <button type="button" class="btn btn-secondary" id="cancel-holiday">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  `,vt(a,e);const t=()=>{if(!document.body.contains(a))return;const l=a.querySelector("#year-select");l&&vt(a,parseInt(l.value))};window.addEventListener("holiday-updated",t),a.querySelector("#year-select").addEventListener("change",l=>{vt(a,parseInt(l.target.value))});const n=a.querySelector("#holiday-modal"),r=a.querySelector("#add-holiday-btn"),i=a.querySelector("#cancel-holiday"),o=a.querySelector("#holiday-form");return r.addEventListener("click",()=>{n.style.display="block"}),i.addEventListener("click",()=>{n.style.display="none",o.reset()}),o.addEventListener("submit",async l=>{l.preventDefault();const d=a.querySelector("#holiday-name").value,c=a.querySelector("#holiday-date").value,p=a.querySelector("#holiday-type").value;await W.addHoliday(d,c,p),n.style.display="none",o.reset(),window.dispatchEvent(new Event("holiday-updated"))}),a}async function vt(a,e){const t=await W.getHolidays(e),s=a.querySelector("#holidays-list");if(t.length===0){s.innerHTML='<p class="text-muted text-center p-4">No holidays configured for this year</p>';return}t.sort((i,o)=>new Date(i.date)-new Date(o.date));const n=document.createElement("table");n.innerHTML=`
    <thead>
      <tr>
        <th>Date</th>
        <th>Day</th>
        <th>Holiday Name</th>
        <th>Type</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      ${t.map(i=>{const o=new Date(i.date),l=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];return`
          <tr>
            <td class="font-medium">${o.toLocaleDateString("en-IN",{month:"short",day:"numeric"})}</td>
            <td>${l[o.getDay()]}</td>
            <td>${i.name}</td>
            <td><span class="badge badge-${i.type==="public"?"success":"warning"}">${i.type}</span></td>
            <td>
              <button class="btn btn-secondary text-sm" style="padding: 0.25rem 0.75rem; color: var(--danger);" onclick="if(confirm('Delete ${i.name}?')) { window.deleteHoliday('${i.id}') }">Delete</button>
            </td>
          </tr>
        `}).join("")}
    </tbody>
  `,s.innerHTML="",s.appendChild(n);const r=document.createElement("div");r.className="mt-4 p-3",r.style.background="var(--bg-secondary)",r.style.borderRadius="6px",r.innerHTML=`
    <div class="flex justify-between text-sm">
      <span class="font-medium">Total Holidays:</span>
      <span class="font-bold">${t.length} days</span>
    </div>
  `,s.appendChild(r)}window.deleteHoliday=async a=>{await W.deleteHoliday(a),window.dispatchEvent(new Event("holiday-updated"))};function Jr(){const a=document.createElement("div");a.id="employee-directory-container";const e=S.getCurrentUser(),t=e&&(e.role==="hr_admin"||e.role==="super_admin");a.innerHTML=`
    <div class="page-header flex justify-between items-center">
      <div>
        <h1 class="page-title">Employee Directory</h1>
        <p class="page-subtitle">View and search all company employees</p>
      </div>
      ${t?'<button class="btn btn-primary" id="add-employee-btn">+ Add Employee</button>':""}
    </div>

    <!-- Filters -->
    <div class="card mb-6">
      <div class="grid grid-4">
        <div class="form-group">
          <label>Search</label>
          <input type="text" id="search-input" placeholder="Search by name, ID, email..." />
        </div>
        <div class="form-group">
          <label>Department</label>
          <select id="dept-filter">
            <option value="">All Departments</option>
            <!-- Loaded dynamically -->
          </select>
        </div>
        <div class="form-group">
          <label>Status</label>
          <select id="status-filter">
            <option value="">All Status</option>
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="notice_period">Notice Period</option>
            <option value="exited">Exited</option>
          </select>
        </div>
        <div class="form-group">
          <label>Role</label>
          <select id="role-filter">
            <option value="">All Roles</option>
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
            <option value="hr_admin">HR Admin</option>
            <option value="super_admin">Super Admin</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Employee Stats -->
    <div class="grid grid-4 mb-6">
      <div class="card stat-card">
        <div class="stat-value" id="total-count">0</div>
        <div class="stat-label">Total Employees</div>
      </div>
      <div class="card stat-card">
        <div class="stat-value" id="active-count">0</div>
        <div class="stat-label">Active</div>
      </div>
      <div class="card stat-card">
        <div class="stat-value" id="draft-count">0</div>
        <div class="stat-label">Pending Activation</div>
      </div>
      <div class="card stat-card">
        <div class="stat-value" id="notice-count">0</div>
        <div class="stat-label">Notice Period</div>
      </div>
    </div>

    <!-- Employee List -->
    <div class="card">
      <div id="employee-list"></div>
    </div>
  `,ft(a),bt(a),Xr(a);const s=async()=>{if(!document.body.contains(a))return;await ft(a),await bt(a);const i=a.querySelector("#search-input").value,o=a.querySelector("#dept-filter").value,l=a.querySelector("#status-filter").value,d=a.querySelector("#role-filter").value;if(i||o||l||d)if(i.length>=2){const c=await E.searchEmployees(i);Re(a,c)}else{const c={department:o,status:l,role:d},p=await E.getEmployees(c);Re(a,p)}};window.addEventListener("employee-updated",s);const n=a.querySelector("#search-input");n.addEventListener("input",async()=>{if(n.value.length>=2){const i=await E.searchEmployees(n.value);Re(a,i)}else await ft(a)}),["dept-filter","status-filter","role-filter"].forEach(i=>{a.querySelector(`#${i}`).addEventListener("change",async()=>{const l={department:a.querySelector("#dept-filter").value,status:a.querySelector("#status-filter").value,role:a.querySelector("#role-filter").value},d=await E.getEmployees(l);Re(a,d),await bt(a)})});const r=a.querySelector("#add-employee-btn");return r&&r.addEventListener("click",()=>{Qr()}),a}async function ft(a){const e=await E.getEmployees();Re(a,e)}function Re(a,e){const t=a.querySelector("#employee-list");if(e.length===0){t.innerHTML='<p class="text-muted text-center p-8">No employees found</p>';return}const s=document.createElement("table");s.innerHTML=`
    <thead>
      <tr>
        <th>Employee ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Department</th>
        <th>Designation</th>
        <th>Status</th>
        <th>Joining Date</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      ${e.map(n=>`
        <tr>
          <td class="font-medium">${n.employeeId}</td>
          <td>${n.name}</td>
          <td class="text-sm">${n.email}</td>
          <td class="text-sm">${n.mobile||"-"}</td>
          <td>${n.department||"-"}</td>
          <td>${n.designation||"-"}</td>
          <td>${Yr(n.status)}</td>
          <td>${n.joiningDate?new Date(n.joiningDate).toLocaleDateString("en-IN"):"-"}</td>
          <td>
            <button class="btn btn-secondary text-sm" style="padding: 0.25rem 0.75rem;" onclick="window.viewEmployee('${n.id}')">View</button>
          </td>
        </tr>
      `).join("")}
    </tbody>
  `,t.innerHTML="",t.appendChild(s)}function Yr(a){return{draft:'<span class="badge badge-warning">Draft</span>',active:'<span class="badge badge-success">Active</span>',notice_period:'<span class="badge badge-warning">Notice Period</span>',exited:'<span class="badge badge-danger">Exited</span>'}[a]||a}async function bt(a){const e=await E.getEmployees(),t=e.filter(r=>r.status==="active"),s=e.filter(r=>r.status==="draft"),n=e.filter(r=>r.status==="notice_period");a.querySelector("#total-count").textContent=e.length,a.querySelector("#active-count").textContent=t.length,a.querySelector("#draft-count").textContent=s.length,a.querySelector("#notice-count").textContent=n.length}async function Pa(){return(await W.getDepartments()).map(e=>`<option value="${e.name}">${e.name}</option>`).join("")}async function Xr(a){const e=a.querySelector("#dept-filter");e.innerHTML='<option value="">All Departments</option>'+await Pa()}async function Qr(){const a=document.createElement("div");a.style.cssText="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); padding: 2rem; overflow-y: auto; z-index: 1000;";const e=await Pa(),t=await Zr();a.innerHTML=`
    <div class="card" style="max-width: 600px; margin: 2rem auto;">
      <h3 class="mb-4">Add New Employee</h3>
      <form id="add-employee-form">
        <div class="grid grid-2">
          <div class="form-group">
            <label>Full Name *</label>
            <input type="text" id="emp-name" required />
          </div>
          <div class="form-group">
            <label>Email *</label>
            <input type="email" id="emp-email" required />
          </div>
        </div>

        <div class="grid grid-2">
          <div class="form-group">
            <label>Mobile</label>
            <input type="tel" id="emp-mobile" />
          </div>
          <div class="form-group">
            <label>Date of Birth</label>
            <input type="date" id="emp-dob" />
          </div>
        </div>

        <div class="grid grid-2">
          <div class="form-group">
            <label>Department *</label>
            <select id="emp-dept" required>
              <option value="">Select Department</option>
              ${e}
            </select>
          </div>
          <div class="form-group">
            <label>Designation *</label>
            <select id="emp-designation" required>
              <option value="">Select Designation</option>
              ${t}
            </select>
          </div>
        </div>

        <div class="grid grid-2">
          <div class="form-group">
            <label>Role *</label>
            <select id="emp-role" required>
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
              <option value="hr_admin">HR Admin</option>
            </select>
          </div>
          <div class="form-group">
            <label>Joining Date *</label>
            <input type="date" id="emp-joining" required />
          </div>
        </div>

        <div class="form-group">
          <label>Monthly CTC (Gross Salary)</label>
          <input type="number" id="emp-ctc" placeholder="e.g., 35000" />
        </div>

        <div class="form-group">
          <label>Address</label>
          <textarea id="emp-address" rows="2"></textarea>
        </div>

        <div class="flex gap-2">
          <button type="submit" class="btn btn-primary">Add Employee</button>
          <button type="button" class="btn btn-secondary" id="cancel-btn">Cancel</button>
        </div>
      </form>
    </div>
  `,document.body.appendChild(a),a.querySelector("#add-employee-form").addEventListener("submit",async n=>{n.preventDefault();const r={name:a.querySelector("#emp-name").value,email:a.querySelector("#emp-email").value,mobile:a.querySelector("#emp-mobile").value,dateOfBirth:a.querySelector("#emp-dob").value,department:a.querySelector("#emp-dept").value,designation:a.querySelector("#emp-designation").value,role:a.querySelector("#emp-role").value,joiningDate:a.querySelector("#emp-joining").value,monthlyCTC:parseInt(a.querySelector("#emp-ctc").value)||0,address:a.querySelector("#emp-address").value},i=await E.addEmployee(r);document.body.removeChild(a),alert(`Employee created successfully!

Employee ID: ${i.employeeId}
Temp Password: ${i.tempPassword}

Please note down the temporary password.`),window.dispatchEvent(new Event("employee-updated"))}),a.querySelector("#cancel-btn").addEventListener("click",()=>{document.body.removeChild(a)})}async function Zr(){return(await W.getDesignations()).map(e=>`<option value="${e.name}">${e.name}</option>`).join("")}window.viewEmployee=async a=>{await E.getEmployee(a)&&window.dispatchEvent(new CustomEvent("navigate-employee",{detail:{employeeId:a}}))};class ei{constructor(){}async initializeShifts(){}async getShifts(){return(await v.getAll("shifts")).map(t=>this._mapToLegacy(t))}async getShift(e){const t=await v.getOne("shifts","id",e);return t?this._mapToLegacy(t):null}async addShift(e){const t=await v.getAll("shifts"),n={id:"S"+String(t.length+1).padStart(3,"0"),name:e.name,code:e.code,start_time:e.startTime,end_time:e.endTime,break_duration:e.breakDuration,grace_time:e.graceTime,half_day_hours:e.halfDayHours,full_day_hours:e.fullDayHours,is_default:e.isDefault||!1,is_off:e.isOff||!1,color:e.color||"#3b82f6"},r=await v.insert("shifts",n);return await this.logAction("shift_created",`Shift ${e.name} created`),r?this._mapToLegacy(r):null}async updateShift(e,t){const s={};t.name!==void 0&&(s.name=t.name),t.code!==void 0&&(s.code=t.code),t.startTime!==void 0&&(s.start_time=t.startTime),t.endTime!==void 0&&(s.end_time=t.endTime),t.breakDuration!==void 0&&(s.break_duration=t.breakDuration),t.graceTime!==void 0&&(s.grace_time=t.graceTime),t.halfDayHours!==void 0&&(s.half_day_hours=t.halfDayHours),t.fullDayHours!==void 0&&(s.full_day_hours=t.fullDayHours),t.isDefault!==void 0&&(s.is_default=t.isDefault),t.color!==void 0&&(s.color=t.color);const n=await v.update("shifts","id",e,s);return n&&await this.logAction("shift_updated",`Shift ${n.name} updated`),n?this._mapToLegacy(n):null}async deleteShift(e){const t=await v.deleteRow("shifts","id",e);return t&&await this.logAction("shift_deleted",`Shift ${e} deleted`),t}async assignRoster(e){const t=S.getCurrentUser();for(const s of e)await v.upsert("roster",{employee_id:s.employeeId,date:s.date,shift_id:s.shiftId,assigned_by:t?.userId,assigned_on:new Date().toISOString()},{onConflict:"employee_id,date"});await this.logAction("roster_updated",`Assigned shifts for ${e.length} entries`)}async getEmployeeShift(e,t){const s=await v.getAll("roster",{employee_id:e,date:t});if(s.length>0){const r=await this.getShift(s[0].shift_id);if(r)return r}const n=await this.getShifts();return n.find(r=>r.isDefault)||n[0]||{id:"GS",name:"General Shift",startTime:"10:00",endTime:"19:00",graceTime:15,fullDayHours:8,halfDayHours:4}}async getRoster(e,t,s=null){const n=[],r=new Date(e),i=new Date(t),o=s?[await E.getEmployee(s)]:await E.getEmployees({status:"active"});for(let l=new Date(r);l<=i;l.setDate(l.getDate()+1)){const d=l.toISOString().split("T")[0];for(const c of o){if(!c)continue;const p=await this.getEmployeeShift(c.id,d);n.push({date:d,employeeId:c.id,employeeName:c.name,shift:p})}}return n}async logAction(e,t){const s=S.getCurrentUser();s&&await S.logAudit(e,s.userId,t)}_mapToLegacy(e){return e?{id:e.id,name:e.name,code:e.code,startTime:e.start_time,endTime:e.end_time,breakDuration:e.break_duration,graceTime:e.grace_time,halfDayHours:e.half_day_hours,fullDayHours:e.full_day_hours,isDefault:e.is_default,isOff:e.is_off,color:e.color}:null}}const te=new ei;class ti{constructor(){}async initializeDeviceConfig(){}async parseLogData(e){const t=e.split(`
`);let s=0,n=0;for(const r of t){if(!r.trim())continue;n++;const i=r.split(",");if(i.length>=3){const o={employeeId:i[0].trim(),timestamp:i[1].trim(),status:parseInt(i[2].trim()),deviceId:i[3]?i[3].trim():"unknown"};await this.processAttendanceLog(o),s++}}return{success:!0,scanned:n,processed:s}}async processAttendanceLog(e){const s=(await E.getEmployees()).find(d=>d.employeeId===e.employeeId);if(!s)return{success:!1,message:"Employee not found"};const n=new Date(e.timestamp);if(isNaN(n.getTime()))return{success:!1,message:"Invalid timestamp"};const r=n.toISOString().split("T")[0],i=n.toTimeString().split(" ")[0].substring(0,5),o=await te.getEmployeeShift(s.id,r);let l=await this._getAttendanceRecord(s.id,r);if(l||(l={employee_id:s.id,employee_name:s.name,date:r,in_time:null,out_time:null,break_logs:[],status:"absent",working_hours:0,is_late:!1,is_early_checkout:!1,overtime_hours:0,source:"biometric",device_id:e.deviceId,shift_id:o?.id||null,shift_name:o?.name||null}),e.status===0){if(!l.in_time&&(l.in_time=i,l.status="present",o&&o.startTime)){const[d,c]=o.startTime.split(":").map(Number),p=o.graceTime||15,u=new Date(n);u.setHours(d,c+p,0),l.is_late=n>u}}else if(e.status===1&&(l.out_time=i,l.in_time)){const d=this.calculateWorkingHours(l.in_time,i,l.break_logs);l.working_hours=d;const c=o?.fullDayHours||9;if(d>c&&(l.overtime_hours=d-c),o&&o.endTime){const[p,u]=o.endTime.split(":").map(Number),h=new Date(n);h.setHours(p,u,0),l.is_early_checkout=n<h}}return await v.upsert("attendance",l,{onConflict:"employee_id,date"}),{success:!0,record:l}}async markAttendance(e,t){const s=new Date,n=s.toISOString().split("T")[0],r=s.toTimeString().split(" ")[0].substring(0,5);let i="Unknown";try{const l=await E.getEmployee(e);l&&(i=l.name)}catch(l){console.warn("Could not fetch employee details",l)}let o=await this._getAttendanceRecord(e,n);if(o||(o={employee_id:e,employee_name:i,date:n,in_time:null,out_time:null,break_logs:[],status:"absent",working_hours:0,is_late:!1,is_early_checkout:!1,overtime_hours:0,source:"web",break_duration:0,shift_id:null}),t==="check-in"){if(o.in_time)return{success:!1,message:"Already clocked in"};o.in_time=r,o.status="present"}else if(t==="check-out"){if(!o.in_time)return{success:!1,message:"Not clocked in"};o.out_time=r,o.working_hours=this.calculateWorkingHours(o.in_time,r,o.break_logs)}else if(t==="break-start"){const l=o.break_logs[o.break_logs.length-1];if(l&&!l.end)return{success:!1,message:"Already on break"};o.break_logs.push({start:r,end:null})}else if(t==="break-end"){const l=o.break_logs[o.break_logs.length-1];if(!l||l.end)return{success:!1,message:"Not on break"};l.end=r;const[d,c]=l.start.split(":").map(Number),[p,u]=r.split(":").map(Number),h=p*60+u-(d*60+c);o.break_duration=(o.break_duration||0)+h}return await v.upsert("attendance",o,{onConflict:"employee_id,date"}),{success:!0,record:this._mapToLegacy(o)}}calculateWorkingHours(e,t,s=[]){const[n,r]=e.split(":").map(Number),[i,o]=t.split(":").map(Number);let l=i*60+o-(n*60+r);for(const d of s)if(d.start&&d.end){const[c,p]=d.start.split(":").map(Number),[u,h]=d.end.split(":").map(Number);l-=u*60+h-(c*60+p)}return Math.round(l/60*100)/100}async getAttendance(e={}){let t=j.from("attendance").select("*");e.employeeId&&(t=t.eq("employee_id",e.employeeId)),e.startDate&&(t=t.gte("date",e.startDate)),e.endDate&&(t=t.lte("date",e.endDate)),e.status&&(t=t.eq("status",e.status)),t=t.order("date",{ascending:!1});const{data:s,error:n}=await t;return n?(console.error("getAttendance error:",n),[]):(s||[]).map(r=>this._mapToLegacy(r))}async getAttendanceSummary(e,t=null,s=null){const n=new Date,r=t||n.getMonth()+1,i=s||n.getFullYear(),o=`${i}-${String(r).padStart(2,"0")}-01`,l=new Date(i,r,0).toISOString().split("T")[0],d=await this.getAttendance({employeeId:e,startDate:o,endDate:l}),c={totalDays:d.length,present:d.filter(p=>p.status==="present").length,absent:d.filter(p=>p.status==="absent").length,late:d.filter(p=>p.isLate).length,halfDay:d.filter(p=>p.workingHours>0&&p.workingHours<4).length,totalWorkingHours:d.reduce((p,u)=>p+(u.workingHours||0),0),overtimeHours:d.reduce((p,u)=>p+(u.overtimeHours||0),0),averageWorkingHours:0};return c.present>0&&(c.averageWorkingHours=Math.round(c.totalWorkingHours/c.present*100)/100),c}async generateSampleData(e,t=7){const s=[],n=new Date;for(let r=0;r<t;r++){const i=new Date(n);if(i.setDate(i.getDate()-r),!(i.getDay()===0||i.getDay()===6))for(const o of e){const l=i.toISOString().split("T")[0],d=await te.getEmployeeShift(o,l);if(!d||d.isOff)continue;const[c,p]=(d.startTime||"10:00").split(":").map(Number),[u,h]=(d.endTime||"19:00").split(":").map(Number),m=Math.floor(Math.random()*45)-15,g=new Date(i);g.setHours(c,p+m,0);const y=g.toTimeString().split(" ")[0],f=Math.floor(Math.random()*60)-15,_=new Date(i);_.setHours(u,h+f,0);const b=_.toTimeString().split(" ")[0];s.push(`${o},${l}T${y},0,Device1`),s.push(`${o},${l}T${b},1,Device1`)}}return s.join(`
`)}async _getAttendanceRecord(e,t){const{data:s}=await j.from("attendance").select("*").eq("employee_id",e).eq("date",t).maybeSingle();return s}_mapToLegacy(e){return e?{employeeId:e.employee_id,employeeName:e.employee_name,date:e.date,inTime:e.in_time,outTime:e.out_time,breakLogs:e.break_logs||[],status:e.status,workingHours:e.working_hours,isLate:e.is_late,isEarlyCheckout:e.is_early_checkout,overtimeHours:e.overtime_hours,source:e.source,deviceId:e.device_id,shiftId:e.shift_id,shiftName:e.shift_name,breakDuration:e.break_duration,corrected:e.corrected,correctionId:e.correction_id}:null}async logAction(e,t){const s=S.getCurrentUser();s&&await S.logAudit(e,s.userId,t)}}const G=new ti;function ai(){const a=document.createElement("div");return a.innerHTML='<div class="text-muted text-center py-8">Loading configuration...</div>',si(a),a}async function si(a){const e=await G.getDeviceConfig();a.innerHTML=`
    <div class="page-header">
      <h1 class="page-title">Biometric Device Integration</h1>
      <p class="page-subtitle">Configure and manage biometric attendance devices</p>
    </div>

    <div class="grid grid-2 mb-6">
      <!-- Device Configuration -->
      <div class="card">
        <h3 class="mb-4">Device Configuration</h3>
        <form id="device-config-form">
          <div class="form-group">
            <label>Enable Biometric Integration</label>
            <select id="enabled">
              <option value="true" ${e.enabled?"selected":""}>Enabled</option>
              <option value="false" ${e.enabled?"":"selected"}>Disabled</option>
            </select>
          </div>

          <div class="form-group">
            <label>Device Type</label>
            <select id="deviceType">
              <option value="zkteco" ${e.deviceType==="zkteco"?"selected":""}>ZKTeco (Default)</option>
              <option value="essl" ${e.deviceType==="essl"?"selected":""}>eSSL</option>
              <option value="realtime" ${e.deviceType==="realtime"?"selected":""}>Realtime</option>
              <option value="suprema" ${e.deviceType==="suprema"?"selected":""}>Suprema</option>
              <option value="generic" ${e.deviceType==="generic"?"selected":""}>Generic CSV</option>
            </select>
            <small class="text-muted">Select your biometric device brand</small>
          </div>

          <div class="form-group">
            <label>Connection Type</label>
            <select id="connectionType">
              <option value="usb" ${e.connectionType==="usb"?"selected":""}>USB Connection</option>
              <option value="network" ${e.connectionType==="network"?"selected":""}>Network (TCP/IP)</option>
              <option value="cloud" ${e.connectionType==="cloud"?"selected":""}>Cloud API</option>
            </select>
          </div>

          <div id="network-config" style="display: ${e.connectionType==="network"?"block":"none"};">
            <div class="form-group">
              <label>Device IP Address</label>
              <input type="text" id="deviceIP" value="${e.deviceIP||""}" placeholder="192.168.1.100" />
            </div>

            <div class="form-group">
              <label>Device Port</label>
              <input type="number" id="devicePort" value="${e.devicePort||4370}" />
            </div>
          </div>

          <div class="form-group">
            <label>Auto Sync Interval (seconds)</label>
            <input type="number" id="syncInterval" value="${e.syncInterval||60}" min="30" max="3600" />
            <small class="text-muted">How often to fetch data from device</small>
          </div>

          <div class="form-group">
            <label>Auto Sync</label>
            <select id="autoSync">
              <option value="true" ${e.autoSync?"selected":""}>Enabled</option>
              <option value="false" ${e.autoSync?"":"selected"}>Disabled</option>
            </select>
          </div>

          <button type="submit" class="btn btn-primary">Save Configuration</button>
        </form>

        ${e.lastSyncTime?`
          <div class="mt-4 p-3" style="background: var(--bg-secondary); border-radius: 6px;">
            <div class="text-xs text-muted">Last Sync:</div>
            <div class="font-medium">${new Date(e.lastSyncTime).toLocaleString()}</div>
          </div>
        `:""}
      </div>

      <!-- Import Data -->
      <div class="card">
        <h3 class="mb-4">Import Attendance Data</h3>
        
        <div class="alert alert-success mb-4">
          <strong>✓ Biometric Integration Active</strong><br/>
          Your device logs will be automatically parsed and processed.
        </div>

        <div class="mb-4">
          <h4 class="mb-2">Method 1: Paste Device Logs</h4>
          <p class="text-sm text-muted mb-3">Copy logs from device software and paste below</p>
          <textarea id="log-data" rows="8" placeholder="Paste your biometric device logs here...
Example (ZKTeco):
E001,2024-12-30 09:15:00,0,Device1
E001,2024-12-30 18:30:00,1,Device1"></textarea>
          <button class="btn btn-primary mt-2 w-full" id="import-logs-btn">Import & Process Logs</button>
        </div>

        <div class="mb-4">
          <h4 class="mb-2">Method 2: Upload CSV File</h4>
          <input type="file" id="file-upload" accept=".csv,.txt" class="w-full" />
          <button class="btn btn-secondary mt-2 w-full" id="upload-btn">Upload File</button>
        </div>

        <div class="mb-4">
          <h4 class="mb-2">Method 3: Generate Test Data</h4>
          <p class="text-sm text-muted mb-3">Auto-generate sample attendance for testing</p>
          <button class="btn btn-secondary w-full" id="generate-sample-btn">Generate Sample Data (7 Days)</button>
        </div>

        <div id="import-result" class="mt-4" style="display: none;"></div>
      </div>
    </div>

    <!-- Supported Formats -->
    <div class="card">
      <h3 class="mb-4">Supported Device Formats</h3>
      <div class="grid grid-2">
        <div>
          <h4 class="mb-2">ZKTeco Format</h4>
          <pre class="text-xs p-3" style="background: var(--bg-secondary); border-radius: 4px; overflow-x: auto;">EmployeeID,DateTime,Status,DeviceID
E001,2024-12-30 09:15:00,0,Device1
E001,2024-12-30 18:30:00,1,Device1

Status: 0=In, 1=Out</pre>
        </div>

        <div>
          <h4 class="mb-2">eSSL Format</h4>
          <pre class="text-xs p-3" style="background: var(--bg-secondary); border-radius: 4px; overflow-x: auto;">ID    DateTime            Type
E001  2024-12-30 09:15:00 IN
E001  2024-12-30 18:30:00 OUT</pre>
        </div>

        <div>
          <h4 class="mb-2">Generic CSV</h4>
          <pre class="text-xs p-3" style="background: var(--bg-secondary); border-radius: 4px; overflow-x: auto;">EmployeeID,Date,Time,Type
E001,2024-12-30,09:15:00,IN
E001,2024-12-30,18:30:00,OUT</pre>
        </div>

        <div>
          <h4 class="mb-2">Realtime Format</h4>
          <pre class="text-xs p-3" style="background: var(--bg-secondary); border-radius: 4px; overflow-x: auto;">Same as ZKTeco format
Supports Check-in/out
Break-in/out tracking</pre>
        </div>
      </div>
    </div>
  `;const t=a.querySelector("#connectionType"),s=a.querySelector("#network-config");t.addEventListener("change",()=>{s.style.display=t.value==="network"?"block":"none"}),a.querySelector("#device-config-form").addEventListener("submit",async l=>{l.preventDefault();const d={enabled:a.querySelector("#enabled").value==="true",deviceType:a.querySelector("#deviceType").value,connectionType:a.querySelector("#connectionType").value,deviceIP:a.querySelector("#deviceIP").value,devicePort:parseInt(a.querySelector("#devicePort").value),syncInterval:parseInt(a.querySelector("#syncInterval").value),autoSync:a.querySelector("#autoSync").value==="true"};await G.updateDeviceConfig(d),alert("Device configuration saved successfully!")});const r=a.querySelector("#import-logs-btn");r.addEventListener("click",async()=>{const l=a.querySelector("#log-data").value.trim();if(!l){alert("Please paste device logs first");return}r.disabled=!0,r.textContent="Processing...";try{const d=await G.importBiometricLogs(l);ke(a,d),a.querySelector("#log-data").value=""}catch(d){ke(a,{success:!1,message:d.message})}finally{r.disabled=!1,r.textContent="Import & Process Logs"}});const i=a.querySelector("#upload-btn");i.addEventListener("click",()=>{const l=a.querySelector("#file-upload"),d=l.files[0];if(!d){alert("Please select a file first");return}const c=new FileReader;c.onload=async p=>{const u=p.target.result;i.disabled=!0,i.textContent="Processing...";try{const h=await G.importBiometricLogs(u);ke(a,h),l.value=""}catch(h){ke(a,{success:!1,message:h.message})}finally{i.disabled=!1,i.textContent="Upload File"}},c.readAsText(d)});const o=a.querySelector("#generate-sample-btn");o.addEventListener("click",async()=>{const d=(await E.getEmployees({status:"active"})).map(p=>p.employeeId).slice(0,5);if(d.length===0){alert("No active employees found. Please add employees first.");return}const c=await G.generateSampleData(d,7);o.disabled=!0,o.textContent="Generating...";try{const p=await G.importBiometricLogs(c);ke(a,p)}catch(p){ke(a,{success:!1,message:p.message})}finally{o.disabled=!1,o.textContent="Generate Sample Data (7 Days)"}})}function ke(a,e){const t=a.querySelector("#import-result");e.success?t.innerHTML=`
      <div class="alert alert-success">
        <strong>✓ Import Successful!</strong><br/>
        Imported: <strong>${e.imported}</strong> attendance records<br/>
        Total logs: ${e.total}<br/>
        ${e.errors?`<br/><strong>Errors:</strong><br/>${e.errors.join("<br/>")}`:""}
      </div>
    `:t.innerHTML=`
      <div class="alert alert-error">
        <strong>❌ Import Failed</strong><br/>
        ${e.message||"Unknown error"}
      </div>
    `,t.style.display="block",setTimeout(()=>{t.style.display="none"},5e3)}class ni{constructor(){}async initializeLeaveTypes(){}async getLeaveTypes(){return(await v.getAll("leave_types")).map(t=>({id:t.id,name:t.name,shortName:t.short_name,color:t.color,requiresApproval:t.requires_approval,maxConsecutive:t.max_consecutive,advanceNoticeDays:t.advance_notice_days,canCarryForward:t.can_carry_forward,encashable:t.encashable}))}async getLeaveBalance(e){const t=await E.getEmployee(e);return!t||!t.leavePolicy?null:t.leavePolicy}async applyLeave(e){const{employeeId:t,leaveType:s,startDate:n,endDate:r,reason:i,isHalfDay:o}=e,l=await E.getEmployee(t);if(!l)return{success:!1,message:"Employee not found"};const d=await this.getLeaveBalance(t);if(!d)return{success:!1,message:"Leave policy not assigned"};const c=o?.5:this.calculateLeaveDays(n,r),p=s.toLowerCase();if(!d[p])return{success:!1,message:"Invalid leave type"};if(d[p].remaining<c)return{success:!1,message:`Insufficient ${s} balance. Available: ${d[p].remaining} days`};const u=await v.getAll("leave_requests"),h={id:"LR"+String(u.length+1).padStart(4,"0"),employee_id:t,employee_name:l.name,leave_type:s,start_date:n,end_date:r,days:c,is_half_day:o||!1,reason:i||"",status:"pending",applied_on:new Date().toISOString(),approved_by:null,approved_on:null,rejection_reason:null,salary_impact:this.calculateSalaryImpact(l,s,c)};await v.insert("leave_requests",h),await this.logAction("leave_applied",`${l.name} applied for ${c} days ${s}`);const m=await E.getEmployees({role:"hr_admin"});for(const g of m)await Y.notify(g.id,"New Leave Application",`${l.name} has applied for ${c} days of ${s}.`,"info");return{success:!0,request:this._mapRequestToLegacy(h)}}calculateLeaveDays(e,t){const s=new Date(e),n=new Date(t);let r=0;const i=new Date(s);for(;i<=n;){const o=i.getDay();o!==0&&o!==6&&r++,i.setDate(i.getDate()+1)}return r}calculateSalaryImpact(e,t,s){const n=e.leavePolicy;if(!n)return{unpaidDays:0,deduction:0};const r=t.toLowerCase(),i=n[r]?.remaining||0;if(i>=s)return{unpaidDays:0,deduction:0,message:"No salary impact - leave available"};{const o=s-i,d=(e.salaryStructure?.gross||0)/30,c=Math.round(d*o);return{unpaidDays:o,deduction:c,message:`${o} days unpaid. Deduction: ₹${c}`}}}async getLeaveRequests(e={}){const t={};e.employeeId&&(t.employee_id=e.employeeId),e.status&&(t.status=e.status);let s=await v.getAll("leave_requests",t,{column:"applied_on",ascending:!1});if(e.approverId){const n=await E.getEmployees(),r=n.find(i=>i.id===e.approverId);if(r){const o=n.filter(l=>l.manager===r.name).map(l=>l.id);s=s.filter(l=>o.includes(l.employee_id))}}return s.map(n=>this._mapRequestToLegacy(n))}async approveLeave(e,t){const s=await v.getOne("leave_requests","id",e);if(!s)return{success:!1,message:"Leave request not found"};if(s.status!=="pending")return{success:!1,message:"Leave request already processed"};const n=await E.getEmployee(t);await v.update("leave_requests","id",e,{status:"approved",approved_by:n?.name||t,approved_on:new Date().toISOString()}),await this.deductLeaveBalance(s.employee_id,s.leave_type,s.days),await this.logAction("leave_approved",`Leave request ${e} approved by ${n?.name}`),await Y.notify(s.employee_id,"Leave Approved ✅",`Your ${s.leave_type} for ${s.days} days has been approved.`,"success");const r=await v.getOne("leave_requests","id",e);return{success:!0,request:this._mapRequestToLegacy(r)}}async rejectLeave(e,t,s){const n=await v.getOne("leave_requests","id",e);if(!n)return{success:!1,message:"Leave request not found"};if(n.status!=="pending")return{success:!1,message:"Leave request already processed"};const r=await E.getEmployee(t);await v.update("leave_requests","id",e,{status:"rejected",approved_by:r?.name||t,approved_on:new Date().toISOString(),rejection_reason:s}),await this.logAction("leave_rejected",`Leave request ${e} rejected by ${r?.name}`);const i=await v.getOne("leave_requests","id",e);return{success:!0,request:this._mapRequestToLegacy(i)}}async deductLeaveBalance(e,t,s){const n=await E.getEmployee(e);if(!n||!n.leavePolicy)return;const r=t.toLowerCase();n.leavePolicy[r]&&(n.leavePolicy[r].used+=s,n.leavePolicy[r].remaining-=s,await E.updateEmployee(e,{leavePolicy:n.leavePolicy}))}async cancelLeave(e,t){const s=await v.getOne("leave_requests","id",e);if(!s)return{success:!1,message:"Leave request not found"};if(s.employee_id!==t)return{success:!1,message:"Unauthorized"};s.status==="approved"&&await this.creditLeaveBalance(s.employee_id,s.leave_type,s.days),await v.update("leave_requests","id",e,{status:"cancelled"}),await this.logAction("leave_cancelled",`Leave request ${e} cancelled`);const n=await v.getOne("leave_requests","id",e);return{success:!0,request:this._mapRequestToLegacy(n)}}async creditLeaveBalance(e,t,s){const n=await E.getEmployee(e);if(!n||!n.leavePolicy)return;const r=t.toLowerCase();n.leavePolicy[r]&&(n.leavePolicy[r].used-=s,n.leavePolicy[r].remaining+=s,await E.updateEmployee(e,{leavePolicy:n.leavePolicy}))}async getLeaveStatistics(e,t){const s=`${t}-${String(e).padStart(2,"0")}-01`,n=new Date(t,e,0).toISOString().split("T")[0],i=(await v.getAll("leave_requests")).filter(o=>o.start_date>=s&&o.start_date<=n);return{total:i.length,pending:i.filter(o=>o.status==="pending").length,approved:i.filter(o=>o.status==="approved").length,rejected:i.filter(o=>o.status==="rejected").length,totalDays:i.filter(o=>o.status==="approved").reduce((o,l)=>o+l.days,0)}}async logAction(e,t){const s=S.getCurrentUser();s&&await S.logAudit(e,s.userId,t)}_mapRequestToLegacy(e){return e?{id:e.id,employeeId:e.employee_id,employeeName:e.employee_name,leaveType:e.leave_type,startDate:e.start_date,endDate:e.end_date,days:e.days,isHalfDay:e.is_half_day,reason:e.reason,status:e.status,appliedOn:e.applied_on,approvedBy:e.approved_by,approvedOn:e.approved_on,rejectionReason:e.rejection_reason,salaryImpact:e.salary_impact}:null}}const N=new ni;class ri{constructor(){}async initializeApprovalSettings(){}async getApprovalSettings(){const e=await v.getAll("approval_settings");if(e.length===0)return{};const t=e[0];return{leaveApprovalLevels:t.leave_approval_levels,autoApproveThreshold:t.auto_approve_threshold,escalationEnabled:t.escalation_enabled,escalationDays:t.escalation_days,allowDelegation:t.allow_delegation}}async updateApprovalSettings(e){const t=await v.getAll("approval_settings");if(t.length>0){const s={};e.leaveApprovalLevels!==void 0&&(s.leave_approval_levels=e.leaveApprovalLevels),e.autoApproveThreshold!==void 0&&(s.auto_approve_threshold=e.autoApproveThreshold),e.escalationEnabled!==void 0&&(s.escalation_enabled=e.escalationEnabled),e.escalationDays!==void 0&&(s.escalation_days=e.escalationDays),e.allowDelegation!==void 0&&(s.allow_delegation=e.allowDelegation),await v.update("approval_settings","id",t[0].id,s)}}async getPendingApprovals(e,t=null){const s=[],n=await E.getEmployees(),r=n.find(l=>l.id===e);if(!r)return s;const i=n.filter(l=>l.manager===r.name||l.managerId===e).map(l=>l.id),o=r.role==="hr_admin"||r.role==="super_admin";if(!t||t==="leave"){const l=await N.getLeaveRequests({status:"pending"});for(const d of l)(o||i.includes(d.employeeId))&&s.push({id:d.id,type:"leave",title:`${d.leaveType} Leave Request`,description:`${d.employeeName} requested ${d.days} days (${d.startDate} to ${d.endDate})`,requestedBy:d.employeeName,requestedById:d.employeeId,requestedOn:d.appliedOn,status:"pending",data:d})}if(!t||t==="attendance_correction"){const l=await v.getAll("attendance_corrections",{status:"pending"});for(const d of l)(o||i.includes(d.employee_id))&&s.push({id:d.id,type:"attendance_correction",title:"Attendance Correction",description:`Correction for ${d.date}`,requestedById:d.employee_id,requestedOn:d.requested_on,status:"pending",data:this._mapCorrectionToLegacy(d)})}return s}async getApprovalHistory(e,t=50){const s=[],n=await E.getEmployees(),r=n.find(u=>u.id===e);if(!r)return s;const i=r.role==="hr_admin"||r.role==="super_admin",o=n.filter(u=>u.manager===r.name||u.managerId===e).map(u=>u.id),d=(await N.getLeaveRequests({})).filter(u=>u.status!=="pending");for(const u of d)(i||o.includes(u.employeeId))&&s.push({id:u.id,type:"leave",title:`${u.leaveType} Leave`,description:`${u.employeeName} - ${u.days} days - ${u.status}`,requestedBy:u.employeeName,status:u.status,processedOn:u.approvedOn,processedBy:u.approvedBy,data:u});const p=(await v.getAll("attendance_corrections")).filter(u=>u.status!=="pending");for(const u of p)(i||o.includes(u.employee_id))&&s.push({id:u.id,type:"attendance_correction",title:"Attendance Correction",description:`Correction for ${u.date} - ${u.status}`,requestedById:u.employee_id,status:u.status,processedOn:u.approved_on||u.rejected_on,data:this._mapCorrectionToLegacy(u)});return s.sort((u,h)=>new Date(h.processedOn)-new Date(u.processedOn)).slice(0,t)}async approve(e,t,s,n=""){return t==="leave"?await N.approveLeave(e,s):t==="attendance_correction"?await this.approveAttendanceCorrection(e,s,n):{success:!1,message:"Unknown approval type"}}async reject(e,t,s,n=""){return t==="leave"?await N.rejectLeave(e,s,n):t==="attendance_correction"?await this.rejectAttendanceCorrection(e,s,n):{success:!1,message:"Unknown approval type"}}async submitAttendanceCorrection(e){const t=await v.getAll("attendance_corrections"),s={id:"CORR"+String(t.length+1).padStart(4,"0"),employee_id:e.employeeId,date:e.date,current_in_time:e.currentInTime,current_out_time:e.currentOutTime,requested_in_time:e.requestedInTime,requested_out_time:e.requestedOutTime,reason:e.reason,status:"pending"};return await v.insert("attendance_corrections",s),await this.logAction("correction_submitted",`Attendance correction for ${e.date}`),{success:!0,correction:this._mapCorrectionToLegacy(s)}}async approveAttendanceCorrection(e,t,s=""){const n=await v.getOne("attendance_corrections","id",e);if(!n)return{success:!1,message:"Correction not found"};const r=await E.getEmployee(t);return await v.update("attendance_corrections","id",e,{status:"approved",approved_by:r?.name||t,approved_on:new Date().toISOString(),approver_comments:s}),await v.upsert("attendance",{employee_id:n.employee_id,date:n.date,in_time:n.requested_in_time,out_time:n.requested_out_time,corrected:!0,correction_id:e,status:"present"},{onConflict:"employee_id,date"}),await Y.notify(n.employee_id,"Correction Approved ✅",`Your attendance correction for ${n.date} has been approved.`,"success"),await this.logAction("correction_approved",`Attendance correction ${e} approved`),{success:!0}}async rejectAttendanceCorrection(e,t,s=""){const n=await v.getOne("attendance_corrections","id",e);if(!n)return{success:!1,message:"Correction not found"};const r=await E.getEmployee(t);return await v.update("attendance_corrections","id",e,{status:"rejected",rejected_by:r?.name||t,rejected_on:new Date().toISOString(),rejection_reason:s}),await Y.notify(n.employee_id,"Correction Rejected ❌",`Your attendance correction for ${n.date} was rejected. Reason: ${s}`,"warning"),await this.logAction("correction_rejected",`Attendance correction ${e} rejected`),{success:!0}}async logAction(e,t){const s=S.getCurrentUser();s&&await S.logAudit(e,s.userId,t)}_mapCorrectionToLegacy(e){return e?{id:e.id,employeeId:e.employee_id,date:e.date,currentInTime:e.current_in_time,currentOutTime:e.current_out_time,requestedInTime:e.requested_in_time,requestedOutTime:e.requested_out_time,reason:e.reason,status:e.status,requestedOn:e.requested_on,approvedBy:e.approved_by,approvedOn:e.approved_on,approverComments:e.approver_comments,rejectedBy:e.rejected_by,rejectedOn:e.rejected_on,rejectionReason:e.rejection_reason}:null}}const he=new ri;function ii(){const a=document.createElement("div"),e=S.getCurrentUser(),t=e&&(e.role==="hr_admin"||e.role==="super_admin"),s=new Date,n=s.getMonth()+1,r=s.getFullYear();a.innerHTML=`
    <div class="page-header">
      <h1 class="page-title">Attendance Management</h1>
      <p class="page-subtitle">View and manage attendance records</p>
    </div>

    <!-- Manual Attendance Controls (For Current User) -->
    <div class="card mb-6" id="attendance-controls">
      <div class="flex justify-between items-center">
        <div>
          <h3 class="mb-1">Mark Attendance</h3>
          <p class="text-sm text-muted" id="current-time-display">Loading time...</p>
        </div>
        <div class="flex gap-2">
          <button class="btn btn-primary" id="btn-check-in">Login</button>
          <button class="btn btn-warning" id="btn-break-start" disabled>Start Break</button>
          <button class="btn btn-secondary" id="btn-break-end" disabled>End Break</button>
          <button class="btn btn-danger" id="btn-check-out" disabled>Logout</button>
        </div>
      </div>
    </div>

    <!-- Month Summary Stats -->
    <div class="grid grid-4 mb-6" id="summary-stats">
      <div class="card stat-card">
        <div class="stat-value" id="present-days">0</div>
        <div class="stat-label">Present Days</div>
      </div>
      <div class="card stat-card">
        <div class="stat-value" id="total-hours">0</div>
        <div class="stat-label">Working Hours</div>
      </div>
      <div class="card stat-card">
        <div class="stat-value" id="late-marks">0</div>
        <div class="stat-label">Late Marks</div>
      </div>
      <div class="card stat-card">
        <div class="stat-value" id="overtime-hours">0</div>
        <div class="stat-label">Overtime Hours</div>
      </div>
    </div>

   ${t?`
      <!-- Filters for HR/Admin -->
      <div class="card mb-6">
        <h3 class="mb-4">Filters</h3>
        <div class="grid grid-4">
          <div class="form-group">
            <label>Employee</label>
            <select id="employee-filter">
              <option value="">All Employees</option>
              <!-- Options loaded dynamically -->
            </select>
          </div>
          <div class="form-group">
            <label>Month</label>
            <select id="month-filter">
              ${ui(n)}
            </select>
          </div>
          <div class="form-group">
            <label>Year</label>
            <select id="year-filter">
              <option value="2024">2024</option>
              <option value="2025" selected>2025</option>
              <option value="2026">2026</option>
            </select>
          </div>
          <div class="form-group">
            <label>Status</label>
            <select id="status-filter">
              <option value="">All Status</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
            </select>
          </div>
        </div>
        <button class="btn btn-primary mt-2" id="apply-filters-btn">Apply Filters</button>
      </div>
    `:""}

    <!-- Attendance Records -->
    <div class="card">
      <div class="flex justify-between items-center mb-4">
        <h3>Attendance Records</h3>
        <div class="flex gap-2">
          <button class="btn btn-secondary" id="export-btn">Export to CSV</button>
          ${t?`
            <button class="btn btn-secondary" onclick="window.location.hash='shifts'">Manage Shifts</button>
            <button class="btn btn-primary" id="import-bio-btn">Sync Biometric</button>
          `:""}
        </div>
      </div>
      
      <div id="attendance-list"></div>
    </div>
  `;const i=t?null:e.userId;return st(a,i,n,r),t&&ci(a),t&&a.querySelector("#apply-filters-btn").addEventListener("click",()=>{const d=a.querySelector("#employee-filter").value||null,c=parseInt(a.querySelector("#month-filter").value),p=parseInt(a.querySelector("#year-filter").value);st(a,d,c,p)}),a.querySelector("#export-btn").addEventListener("click",()=>{pi(a)}),t&&a.querySelector("#import-bio-btn").addEventListener("click",()=>{hi(a)}),setInterval(()=>{const l=a.querySelector("#current-time-display");if(l){const d=new Date;l.textContent=d.toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit"})}},1e3),Ra(a,e.userId),a.querySelector("#btn-check-in").addEventListener("click",()=>Ze(a,e.userId,"check-in")),a.querySelector("#btn-check-out").addEventListener("click",()=>Ze(a,e.userId,"check-out")),a.querySelector("#btn-break-start").addEventListener("click",()=>Ze(a,e.userId,"break-start")),a.querySelector("#btn-break-end").addEventListener("click",()=>Ze(a,e.userId,"break-end")),a}async function Ze(a,e,t){const s=await G.markAttendance(e,t);if(s.success){U.success(`Action ${t} successful!`),await Ra(a,e);const n=new Date;await st(a,e,n.getMonth()+1,n.getFullYear())}else U.error(s.message)}async function Ra(a,e){const s=new Date().toISOString().split("T")[0],r=(await G.getAttendance({employeeId:e,startDate:s,endDate:s})).find(c=>c.date===s),i=a.querySelector("#btn-check-in"),o=a.querySelector("#btn-check-out"),l=a.querySelector("#btn-break-start"),d=a.querySelector("#btn-break-end");if(i.disabled=!1,o.disabled=!0,l.disabled=!0,d.disabled=!0,r&&r.inTime){i.disabled=!0,o.disabled=!1,l.disabled=!1;const c=r.breakLogs[r.breakLogs.length-1];c&&!c.end&&(l.disabled=!0,d.disabled=!1,o.disabled=!0),r.outTime&&(o.disabled=!0,l.disabled=!0,d.disabled=!0)}}async function st(a,e,t,s){let n;if(e)n=await G.getAttendanceSummary(e,t,s);else{const c=await E.getEmployees({status:"active"});n={totalDays:0,present:0,absent:0,late:0,totalWorkingHours:0,overtimeHours:0};for(const p of c){const u=await G.getAttendanceSummary(p.id,t,s);n.totalDays+=u.totalDays,n.present+=u.present,n.absent+=u.absent,n.late+=u.late,n.totalWorkingHours+=u.totalWorkingHours,n.overtimeHours+=u.overtimeHours}}a.querySelector("#present-days").textContent=n.present,a.querySelector("#total-hours").textContent=Math.round(n.totalWorkingHours),a.querySelector("#late-marks").textContent=n.late,a.querySelector("#overtime-hours").textContent=Math.round(n.overtimeHours);const r=`${s}-${String(t).padStart(2,"0")}-01`,o=new Date(s,t,0).toISOString().split("T")[0],l={startDate:r,endDate:o};e&&(l.employeeId=e);const d=await G.getAttendance(l);oi(a,d)}function oi(a,e){const t=a.querySelector("#attendance-list");if(e.length===0){t.innerHTML=`
      <div class="text-center p-8">
        <div style="font-size: 3rem; margin-bottom: 1rem;">📅</div>
        <h3 class="mb-2">No Attendance Records</h3>
        <p class="text-muted">Import biometric data to see attendance records here</p>
      </div>
    `;return}const s=document.createElement("table");s.innerHTML=`
    <thead>
      <tr>
        <th>Date</th>
        <th>Day</th>
        <th>Employee</th>
        <th>Login Time</th>
        <th>Break Duration</th>
        <th>Logout Time</th>
        <th>Working Hours</th>
        <th>Status</th>
        <th>Remarks</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      ${e.map(n=>`
        <tr>
          <td class="font-medium">${new Date(n.date).toLocaleDateString()}</td>
          <td>${new Date(n.date).toLocaleDateString("en-US",{weekday:"long"})}</td>
          <td>${n.employeeName}</td>
          <td>${n.inTime||"-"}</td>
          <td>${n.breakDuration?n.breakDuration+" mins":"-"}</td>
          <td>${n.outTime||"-"}</td>
          <td class="font-medium">${n.workingHours?n.workingHours.toFixed(2)+"h":"-"}</td>
          <td>${li(n)}</td>
          <td class="text-xs">
            ${n.isLate?'<span class="badge badge-warning">Late</span> ':""}
            ${n.isEarlyCheckout?'<span class="badge badge-warning">Early</span> ':""}
            ${n.overtimeHours>0?`<span class="badge badge-success">OT: ${n.overtimeHours.toFixed(1)}h</span>`:""}
            ${n.source==="biometric"?'<span class="badge badge-primary">Biometric</span>':""}
          </td>
          <td>
            <button class="btn btn-sm btn-secondary" onclick="window.requestCorrection('${n.employeeId}', '${n.date}')">Correct</button>
          </td>
        </tr>
      `).join("")}
    </tbody>
  `,t.innerHTML="",t.appendChild(s)}function li(a){return a.status==="present"?a.workingHours>=4?'<span class="badge badge-success">Present</span>':'<span class="badge badge-warning">Half Day</span>':a.status==="absent"?'<span class="badge badge-danger">Absent</span>':'<span class="badge">Unknown</span>'}async function di(){return(await E.getEmployees({status:"active"})).map(e=>`<option value="${e.id}">${e.name} (${e.employeeId})</option>`).join("")}async function ci(a){const e=a.querySelector("#employee-filter");e&&(e.innerHTML='<option value="">All Employees</option>'+await di())}function ui(a){return["January","February","March","April","May","June","July","August","September","October","November","December"].map((t,s)=>`<option value="${s+1}" ${s+1===a?"selected":""}>${t}</option>`).join("")}function pi(a){const e=a.querySelector("table");if(!e){alert("No data to export");return}let t=[];e.querySelectorAll("tr").forEach(l=>{const d=l.querySelectorAll("td, th"),c=Array.from(d).map(p=>`"${p.textContent.trim().replace(/"/g,'""')}"`);t.push(c.join(","))});const n=t.join(`
`),r=new Blob([n],{type:"text/csv"}),i=window.URL.createObjectURL(r),o=document.createElement("a");o.setAttribute("hidden",""),o.setAttribute("href",i),o.setAttribute("download",`attendance_${new Date().toISOString().split("T")[0]}.csv`),document.body.appendChild(o),o.click(),document.body.removeChild(o)}window.requestCorrection=async(a,e)=>{const t=prompt(`Enter requested Check-In time for ${e} (HH:MM):`);if(!t)return;const s=prompt(`Enter requested Check-Out time for ${e} (HH:MM):`);if(!s)return;const n=prompt("Reason for correction:");if(!n)return;const r=await he.submitAttendanceCorrection(a,e,t,s,n);r.success?alert("Correction request submitted for approval! ✅"):alert("Error: "+r.message)};function hi(a){const e=document.createElement("div");e.style.cssText="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); padding: 2rem; overflow-y: auto; z-index: 1000; display: flex; align-items: center; justify-content: center;",new Date().toISOString().split("T")[0],e.innerHTML=`
    <div class="card" style="max-width: 500px; width: 100%;">
      <div class="flex justify-between items-center mb-4">
        <h3 style="margin: 0;">Sync Biometric Data</h3>
        <button class="btn-text" id="close-modal">✕</button>
      </div>
      
      <div class="alert alert-warning text-sm mb-4">
        This will simulate checking for new logs from the configured biometric device (IP: 192.168.1.201).
        Logs will be matched against assigned shifts.
      </div>

      <div class="form-group">
        <label>Sync Range (Days)</label>
        <select id="sync-days" class="w-full p-2 border rounded">
          <option value="1">Last 24 Hours</option>
          <option value="3">Last 3 Days</option>
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
        </select>
      </div>

      <div class="flex gap-2 mt-4">
        <button class="btn btn-primary w-full" id="start-sync-btn">Start Sync</button>
      </div>
    </div>
  `,document.body.appendChild(e),e.querySelector("#close-modal").addEventListener("click",()=>{document.body.removeChild(e)}),e.querySelector("#start-sync-btn").addEventListener("click",async()=>{const t=e.querySelector("#start-sync-btn");t.disabled=!0,t.textContent="Syncing...",await new Promise(l=>setTimeout(l,1500));const s=parseInt(e.querySelector("#sync-days").value),r=(await E.getEmployees({status:"active"})).map(l=>l.employeeId),i=await G.generateSampleData(r,s),o=await G.parseLogData(i);if(document.body.removeChild(e),o.success){U.success(`Successfully synced ${o.scanned} logs. ${o.processed} processed.`);const l=new Date;st(a,null,l.getMonth()+1,l.getFullYear())}else U.error("Sync failed: "+o.message)})}function mi(){const a=document.createElement("div"),e=S.getCurrentUser(),t=e&&e.role==="employee",s=e&&e.role==="manager",n=e&&(e.role==="hr_admin"||e.role==="super_admin");t&&e.userId,a.id="leave-dashboard-container",a.innerHTML=`
    <div class="page-header">
      <h1 class="page-title">Leave Management</h1>
      <p class="page-subtitle">Apply for leaves and track your balance with complete transparency</p>
    </div>

    <div id="leave-balance-section">
      <div class="text-muted text-center py-4">Loading leave balance...</div>
    </div>

    ${t?`
      <div class="card mb-6">
        <div class="flex justify-between items-center mb-4">
          <h3>Apply for Leave</h3>
          <button class="btn btn-primary" id="apply-leave-btn">+ New Leave Request</button>
        </div>
        
        <div class="alert alert-success">
          <strong>✓ Complete Transparency</strong><br/>
          You'll see exact leave deduction and any salary impact before applying
        </div>
      </div>
    `:""}

    ${s||n?`
      <div class="card mb-6">
        <h3 class="mb-4">Pending Approvals</h3>
        <div id="pending-approvals"></div>
      </div>
    `:""}

    <!-- Leave History -->
    <div class="card">
      <div class="flex justify-between items-center mb-4">
        <h3>Leave History</h3>
        ${n?`
          <div class="flex gap-2">
            <select id="employee-filter" class="btn btn-secondary">
              <option value="">All Employees</option>
              <!-- Loaded dynamically -->
            </select>
            <select id="status-filter" class="btn btn-secondary">
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        `:""}
      </div>
      
      <div id="leave-history"></div>
    </div>
  `;const r=async()=>{(s||n)&&await vi(a,e.userId);const l={employeeId:t?e.userId:null,...n?{employeeId:a.querySelector("#employee-filter")?.value||null,status:a.querySelector("#status-filter")?.value||null}:{}};if(await fi(a,l),t){const d=await N.getLeaveBalance(e.userId),c=a.querySelector("#leave-balance-section");d&&c&&(c.innerHTML=gi(d))}};r();const i=()=>{document.body.contains(a)&&r()};window.addEventListener("leave-updated",i);const o=a.querySelector("#apply-leave-btn");if(o&&o.addEventListener("click",()=>yi(e.userId)),n){_i(a);const l=a.querySelector("#employee-filter"),d=a.querySelector("#status-filter");[l,d].forEach(c=>{c?.addEventListener("change",r)})}return a}function gi(a){const e=["cl","pl","sl"],t={cl:"Casual Leave (CL)",pl:"Privilege Leave (PL)",sl:"Sick Leave (SL)"};return`
    <div class="card mb-6">
      <h3 class="mb-4">📊 Your Leave Balance (Complete Transparency)</h3>
      
      <div class="grid grid-3 mb-4">
        ${e.map(s=>{const n=a[s];if(!n)return"";const r=n.remaining/n.total*100,i=r>50?"success":r>20?"warning":"danger";return`
            <div class="card" style="background: var(--bg-secondary);">
              <div class="flex justify-between mb-2">
                <span class="font-semibold">${t[s]}</span>
                <span class="font-bold text-lg">${n.remaining} / ${n.total}</span>
              </div>
              
              <div class="progress mb-2">
                <div class="progress-bar" style="width: ${r}%; background: var(--${i});"></div>
              </div>
              
              <div class="grid grid-2 text-xs text-muted gap-2">
                <div>
                  <div>Total: ${n.total} days</div>
                  <div style="color: var(--success);">Available: ${n.remaining} days</div>
                </div>
                <div>
                  <div style="color: var(--danger);">Used: ${n.used} days</div>
                  <div>Balance: ${n.remaining} days</div>
                </div>
              </div>
            </div>
          `}).join("")}
      </div>

      ${a.carryForward?`
        <div class="alert" style="background: rgba(204, 255, 0, 0.1); color: var(--primary-lime); border: 1px solid var(--primary-lime);">
          <strong>✓ Carry Forward Allowed</strong><br/>
          You can carry forward up to ${a.maxCarryForward} unused days to next year
        </div>
      `:`
        <div class="alert alert-warning">
          <strong>⚠️ No Carry Forward</strong><br/>
          Unused leaves will lapse at year-end. Plan accordingly!
        </div>
      `}
    </div>
  `}async function yi(a){const e=await N.getLeaveBalance(a),t=await E.getEmployee(a);if(!e){alert("Leave policy not assigned. Contact HR.");return}const s=document.createElement("div");s.style.cssText="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); padding: 2rem; overflow-y: auto; z-index: 1000; display: flex; align-items: center; justify-content: center;",s.innerHTML=`
    <div class="card" style="max-width: 600px; width: 100%;">
      <h3 class="mb-4">Apply for Leave</h3>
      
      <form id="leave-form">
        <div class="form-group">
          <label>Leave Type *</label>
          <select id="leave-type" required>
            <option value="">-- Select Leave Type --</option>
            ${e.cl.remaining>0?`<option value="CL">Casual Leave (CL) - ${e.cl.remaining} days available</option>`:""}
            ${e.pl.remaining>0?`<option value="PL">Privilege Leave (PL) - ${e.pl.remaining} days available</option>`:""}
            ${e.sl.remaining>0?`<option value="SL">Sick Leave (SL) - ${e.sl.remaining} days available</option>`:""}
          </select>
        </div>

        <div class="grid grid-2">
          <div class="form-group">
            <label>Start Date *</label>
            <input type="date" id="start-date" required min="${new Date().toISOString().split("T")[0]}" />
          </div>

          <div class="form-group">
            <label>End Date *</label>
            <input type="date" id="end-date" required min="${new Date().toISOString().split("T")[0]}" />
          </div>
        </div>

        <div class="form-group">
          <label style="display: flex; align-items: center; gap: 0.5rem;">
            <input type="checkbox" id="half-day" style="width: auto;" />
            <span>Half Day Leave</span>
          </label>
        </div>

        <div class="form-group">
          <label>Reason *</label>
          <textarea id="reason" rows="3" required placeholder="Enter reason for leave..."></textarea>
        </div>

        <!-- Live Impact Preview -->
        <div id="impact-preview" class="alert" style="display: none; background: var(--bg-secondary); border: 2px solid var(--border);"></div>

        <div class="flex gap-2">
          <button type="submit" class="btn btn-primary" id="submit-btn" style="position: relative;">
            Submit Request
          </button>
          <button type="button" class="btn btn-secondary" id="cancel-modal">Cancel</button>
        </div>
      </form>
    </div>
  `,document.body.appendChild(s);const n=s.querySelector("#leave-form"),r=s.querySelector("#leave-type"),i=s.querySelector("#start-date"),o=s.querySelector("#end-date"),l=s.querySelector("#half-day"),d=s.querySelector("#impact-preview"),c=s.querySelector("#submit-btn"),p=async()=>{const u=r.value,h=i.value,m=o.value,g=l.checked;if(u&&h&&m){const y=g?.5:N.calculateLeaveDays(h,m),f=await N.calculateSalaryImpact(t,u,y);d.style.display="block",d.innerHTML=`
        <div class="font-semibold mb-2">📋 Leave Impact Preview:</div>
        <div class="grid grid-2 text-sm">
          <div>
            <div><strong>Days Requested:</strong> ${y} days</div>
            <div><strong>Leave Type:</strong> ${u}</div>
          </div>
          <div>
            <div><strong>Salary Impact:</strong></div>
            <div style="color: ${f.unpaidDays>0?"var(--danger)":"var(--success)"};">
              ${f.message}
            </div>
          </div>
        </div>
        ${f.unpaidDays===0?`
          <div class="mt-2" style="color: var(--success);">
            ✓ Your leave balance will cover this request. No salary deduction.
          </div>
        `:`
          <div class="mt-2" style="color: var(--danger);">
            ⚠️ Warning: This exceeds your available leave balance!
          </div>
        `}
      `}else d.style.display="none"};r.addEventListener("change",p),i.addEventListener("change",p),o.addEventListener("change",p),l.addEventListener("change",p),l.addEventListener("change",()=>{l.checked?(o.value=i.value,o.disabled=!0):o.disabled=!1}),n.addEventListener("submit",async u=>{u.preventDefault(),c.disabled=!0,c.innerText="Submitting...";const h={employeeId:a,leaveType:r.value,startDate:i.value,endDate:l.checked?i.value:o.value,reason:s.querySelector("#reason").value,isHalfDay:l.checked},m=await N.applyLeave(h);m.success?(document.body.removeChild(s),alert(`Leave request submitted successfully!

Request ID: ${m.request.id}
Days: ${m.request.days}
Status: Pending Approval`),window.dispatchEvent(new Event("leave-updated"))):(alert("Error: "+m.message),c.disabled=!1,c.innerText="Submit Request")}),s.querySelector("#cancel-modal").addEventListener("click",()=>{document.body.removeChild(s)})}async function vi(a,e){const t=a.querySelector("#pending-approvals");if(!t)return;const s=await N.getLeaveRequests({status:"pending",approverId:e});if(s.length===0){t.innerHTML='<p class="text-muted text-center p-4">No pending approvals</p>';return}const n=document.createElement("table");n.innerHTML=`
    <thead>
      <tr>
        <th>Employee</th>
        <th>Leave Type</th>
        <th>Dates</th>
        <th>Days</th>
        <th>Reason</th>
        <th>Applied On</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      ${s.map(r=>`
        <tr>
          <td class="font-medium">${r.employeeName}</td>
          <td><span class="badge badge-primary">${r.leaveType}</span></td>
          <td class="text-sm">${nt(r.startDate)} to ${nt(r.endDate)}</td>
          <td class="font-medium">${r.days} days</td>
          <td class="text-sm">${r.reason}</td>
          <td class="text-sm">${Ia(r.appliedOn)}</td>
          <td>
            <div class="flex gap-2">
              <button class="btn btn-secondary text-sm" style="padding: 0.25rem 0.75rem; background: var(--success); color: white;" onclick="window.approveLeave('${r.id}')">Approve</button>
              <button class="btn btn-secondary text-sm" style="padding: 0.25rem 0.75rem; background: var(--danger); color: white;" onclick="window.rejectLeave('${r.id}')">Reject</button>
            </div>
          </td>
        </tr>
      `).join("")}
    </tbody>
  `,t.innerHTML="",t.appendChild(n)}async function fi(a,e){const t=a.querySelector("#leave-history");if(!t)return;const s=await N.getLeaveRequests(e);if(s.length===0){t.innerHTML='<p class="text-muted text-center p-8">No leave requests found</p>';return}const n=document.createElement("table");n.innerHTML=`
    <thead>
      <tr>
        <th>Request ID</th>
        <th>Employee</th>
        <th>Leave Type</th>
        <th>Duration</th>
        <th>Days</th>
        <th>Status</th>
        <th>Applied On</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      ${s.map(r=>{const i=r.status==="pending"||r.status==="approved";return`
          <tr>
            <td class="font-medium">${r.id}</td>
            <td>${r.employeeName}</td>
            <td><span class="badge badge-primary">${r.leaveType}</span></td>
            <td class="text-sm">${nt(r.startDate)} - ${nt(r.endDate)}</td>
            <td class="font-medium">${r.days}</td>
            <td>${bi(r.status)}</td>
            <td class="text-sm">${Ia(r.appliedOn)}</td>
            <td>
              ${i?`<button class="btn btn-secondary text-sm" style="padding: 0.25rem 0.75rem;" onclick="window.cancelLeave('${r.id}')">Cancel</button>`:"-"}
            </td>
          </tr>
        `}).join("")}
    </tbody>
  `,t.innerHTML="",t.appendChild(n)}function bi(a){return{pending:'<span class="badge badge-warning">Pending</span>',approved:'<span class="badge badge-success">Approved</span>',rejected:'<span class="badge badge-danger">Rejected</span>',cancelled:'<span class="badge">Cancelled</span>'}[a]||a}function nt(a){return new Date(a).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}function Ia(a){return new Date(a).toLocaleDateString("en-IN",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"})}async function wi(){return(await E.getEmployees({status:"active"})).map(e=>`<option value="${e.id}">${e.name} (${e.employeeId})</option>`).join("")}async function _i(a){const e=a.querySelector("#employee-filter");e&&(e.innerHTML='<option value="">All Employees</option>'+await wi())}window.approveLeave=async a=>{if(confirm("Approve this leave request?")){const e=S.getCurrentUser(),t=await N.approveLeave(a,e.userId);t.success?(alert("Leave approved successfully!"),window.dispatchEvent(new Event("leave-updated"))):alert("Error: "+t.message)}};window.rejectLeave=async a=>{const e=prompt("Enter rejection reason:");if(e){const t=S.getCurrentUser(),s=await N.rejectLeave(a,t.userId,e);s.success?(alert("Leave rejected"),window.dispatchEvent(new Event("leave-updated"))):alert("Error: "+s.message)}};window.cancelLeave=async a=>{if(confirm("Cancel this leave request?")){const e=S.getCurrentUser(),t=await N.cancelLeave(a,e.userId);t.success?(alert("Leave request cancelled"),window.dispatchEvent(new Event("leave-updated"))):alert("Error: "+t.message)}};function xi(){const a=document.createElement("div");a.innerHTML=`
    <div class="page-header" style="background: linear-gradient(135deg, rgba(204, 255, 0, 0.1) 0%, rgba(5, 5, 5, 1) 100%); padding: 3rem 2rem; border-radius: 20px; border: 1px solid rgba(204, 255, 0, 0.1); margin-bottom: 2rem; position: relative; overflow: hidden;">
      <div style="position: relative; z-index: 2;">
        <h1 class="page-title" style="font-size: 2.5rem; margin-bottom: 0.5rem;">Shift & Roster Management</h1>
        <p class="page-subtitle" style="font-size: 1.1rem; max-width: 600px; color: var(--text-muted);">
          Manage work shifts, schedule rosters, and ensure optimal workforce coverage.
        </p>
      </div>
    </div>

    <div class="card mb-6" style="padding: 0; overflow: hidden; background: var(--surface);">
       <div style="border-bottom: 1px solid var(--border); padding: 0 1rem;">
        <nav class="nav" style="display: flex; gap: 2rem;">
            <button class="nav-item active" data-tab="roster" style="padding: 1.25rem 0.5rem; border-bottom: 3px solid var(--primary-lime); color: var(--text-main); font-weight: 600; background: none; cursor: pointer;">Roster Scheduler</button>
            <button class="nav-item" data-tab="shifts" style="padding: 1.25rem 0.5rem; border-bottom: 3px solid transparent; color: var(--text-muted); font-weight: 500; background: none; cursor: pointer;">Shift Definitions</button>
        </nav>
      </div>

      <div id="shift-content" style="padding: 2rem;"></div>
    </div>
  `;const e=a.querySelectorAll(".nav-item"),t=a.querySelector("#shift-content");return e.forEach(s=>{s.addEventListener("click",()=>{e.forEach(n=>{n.classList.remove("active"),n.style.borderBottomColor="transparent",n.style.color="var(--text-muted)"}),s.classList.add("active"),s.style.borderBottomColor="var(--primary-lime)",s.style.color="var(--text-main)",s.dataset.tab==="shifts"?ja(t):Ot(t)})}),Ot(t),a}async function ja(a){const e=await te.getShifts();a.innerHTML=`
    <div class="flex justify-between items-center mb-6">
      <div>
        <h3 class="font-bold text-lg">Shift Definitions</h3>
        <p class="text-sm text-muted">Configure working hours and break timings</p>
      </div>
      <button class="btn btn-primary" id="add-shift-btn">
        <span style="font-size: 1.2rem; margin-right: 0.5rem; line-height: 1;">+</span> Add New Shift
      </button>
    </div>

    <div class="grid grid-3 gap-6">
      ${e.map(t=>`
        <div class="card hover-reveal" style="border-top: 4px solid ${t.color}; border-radius: 12px; transition: transform 0.2s;">
          <div class="flex justify-between items-start mb-4">
            <div>
              <div class="font-bold text-xl mb-1">${t.name}</div>
              <div class="text-xs text-muted font-mono bg-bg-secondary px-2 py-1 rounded inline-block">Code: ${t.code}</div>
            </div>
            ${t.isDefault?'<span class="badge badge-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Default</span>':""}
            ${t.isOff?'<span class="badge badge-secondary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Off Day</span>':""}
          </div>
          
          ${t.isOff?`
            <div class="text-sm text-muted mb-4 p-4 bg-bg-secondary rounded-lg italic text-center">
                This shift is marked as a Weekly Off or Holiday shift. No attendance required.
            </div>
          `:`
            <div class="flex flex-col gap-3 mb-4 p-3 bg-bg-secondary rounded-lg">
                <div class="flex justify-between items-center text-sm">
                    <span class="text-muted flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        Timing
                    </span>
                    <span class="font-bold font-mono">${t.startTime} - ${t.endTime}</span>
                </div>
                <div class="flex justify-between items-center text-sm">
                    <span class="text-muted flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                        Grace
                    </span>
                    <span class="font-medium">${t.graceTime} mins</span>
                </div>
                <div class="flex justify-between items-center text-sm">
                    <span class="text-muted flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>
                        Break
                    </span>
                    <span class="font-medium">${t.breakDuration} mins</span>
                </div>
            </div>
          `}

          <div class="pt-4 border-t border-gray-100">
            <button class="btn btn-sm btn-secondary w-full hover:bg-bg-hover transition-colors" onclick="window.editShift('${t.id}')">
                Edit Configuration
            </button>
          </div>
        </div>
      `).join("")}
    </div>
  `,a.querySelector("#add-shift-btn").addEventListener("click",()=>{qa()})}function Ot(a){const e=new Date;e.getMonth(),e.getFullYear(),a.innerHTML=`
    <div class="flex justify-between items-center mb-4">
      <div class="flex gap-2 items-center">
        <button class="btn btn-secondary" id="prev-week">←</button>
        <span class="font-bold text-lg" id="date-range-label"></span>
        <button class="btn btn-secondary" id="next-week">→</button>
      </div>
      <div class="flex gap-2">
        <button class="btn btn-secondary" id="bulk-assign-btn">Bulk Assign</button>
        <button class="btn btn-primary" id="save-roster-btn">Save Changes</button>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="roster-table w-full">
        <thead>
          <tr id="roster-header">
            <th style="min-width: 200px; position: sticky; left: 0; z-index: 10;">Employee</th>
            <!-- Dates will be injected here -->
          </tr>
        </thead>
        <tbody id="roster-body">
          <!-- Roster rows will be injected here -->
        </tbody>
      </table>
    </div>

    <div class="mt-4 flex gap-4 text-sm">
      <div class="flex items-center gap-2">
        <div style="width: 12px; height: 12px; background: #3b82f6; border-radius: 2px;"></div>
        <span>General (GS)</span>
      </div>
      <div class="flex items-center gap-2">
        <div style="width: 12px; height: 12px; background: #10b981; border-radius: 2px;"></div>
        <span>Morning (MS)</span>
      </div>
      <div class="flex items-center gap-2">
        <div style="width: 12px; height: 12px; background: #f59e0b; border-radius: 2px;"></div>
        <span>Evening (ES)</span>
      </div>
      <div class="flex items-center gap-2">
        <div style="width: 12px; height: 12px; background: #94a3b8; border-radius: 2px;"></div>
        <span>Weekly Off (WO)</span>
      </div>
    </div>
  `;let t=new Date;const s=t.getDay(),n=t.getDate()-s+(s===0?-6:1);t.setDate(n),wt(a,t),a.querySelector("#prev-week").addEventListener("click",()=>{t.setDate(t.getDate()-7),wt(a,t)}),a.querySelector("#next-week").addEventListener("click",()=>{t.setDate(t.getDate()+7),wt(a,t)}),a.querySelector("#save-roster-btn").addEventListener("click",()=>{ki(a)}),a.querySelector("#bulk-assign-btn").addEventListener("click",()=>{Si()})}async function Si(a){const e=await te.getShifts(),t=document.createElement("div");t.style.cssText="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); padding: 2rem; overflow-y: auto; z-index: 1000; display: flex; align-items: center; justify-content: center;",t.innerHTML=`
    <div class="card" style="max-width: 500px; width: 100%;">
      <h3 class="mb-4">Bulk Shift Assignment</h3>
      <form id="bulk-form">
        <div class="grid grid-2">
          <div class="form-group">
            <label>From Date</label>
            <input type="date" id="from-date" required min="${new Date().toISOString().split("T")[0]}" />
          </div>
          <div class="form-group">
            <label>To Date</label>
            <input type="date" id="to-date" required min="${new Date().toISOString().split("T")[0]}" />
          </div>
        </div>

        <div class="form-group">
          <label>Assign Shift</label>
          <select id="bulk-shift" required>
            <option value="">-- Select Shift --</option>
            ${e.map(s=>`<option value="${s.id}">${s.name} (${s.startTime}-${s.endTime})</option>`).join("")}
          </select>
        </div>

        <div class="alert alert-success text-sm flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          <span>This will assign the selected shift to <strong>ALL Active Employees</strong> for the date range.</span>
        </div>


        <div class="flex gap-2">
          <button type="submit" class="btn btn-primary">Apply Assignments</button>
          <button type="button" class="btn btn-secondary" id="cancel-bulk">Cancel</button>
        </div>
      </form>
    </div>
  `,document.body.appendChild(t),t.querySelector("#bulk-form").addEventListener("submit",async s=>{s.preventDefault();const n=new Date(t.querySelector("#from-date").value),r=new Date(t.querySelector("#to-date").value),i=t.querySelector("#bulk-shift").value,o=await E.getEmployees({status:"active"}),l=[];for(let d=new Date(n);d<=r;d.setDate(d.getDate()+1)){const c=d.toISOString().split("T")[0];o.forEach(p=>{l.push({employeeId:p.id,date:c,shiftId:i})})}l.length>0&&(await te.assignRoster(l),alert(`Successfully assigned shift to ${o.length} employees for ${l.length/o.length} days.`),document.querySelector("#shift-content")&&Ot(roosterContent)),document.body.removeChild(t)}),t.querySelector("#cancel-bulk").addEventListener("click",()=>{document.body.removeChild(t)})}async function wt(a,e){const t=await E.getEmployees({status:"active"}),s=await te.getShifts(),n=a.querySelector("#roster-header"),r=a.querySelector("#date-range-label");for(;n.children.length>1;)n.removeChild(n.lastChild);const i=[],o=new Date(e);for(let p=0;p<7;p++){const u=new Date(e);u.setDate(e.getDate()+p),i.push(u.toISOString().split("T")[0]);const h=document.createElement("th");h.className="text-center",h.innerHTML=`
      <div class="text-xs text-muted">${u.toLocaleDateString("en-US",{weekday:"short"})}</div>
      <div>${u.getDate()}</div>
    `,n.appendChild(h),p===6&&o.setDate(e.getDate()+6)}r.textContent=`${e.toLocaleDateString("en-US",{month:"short",day:"numeric"})} - ${o.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}`;const l=a.querySelector("#roster-body");l.innerHTML="";const d=await te.getRoster(e.toISOString().split("T")[0],i[6]),c={};d.forEach(p=>{p.shift&&p.shift.code&&(c[`${p.employeeId}_${p.date}`]=p.shift.code)}),t.forEach(p=>{const u=document.createElement("tr"),h=document.createElement("td");h.style.position="sticky",h.style.left="0",h.style.backgroundColor="var(--bg-primary)",h.style.zIndex="5",h.style.borderRight="1px solid var(--border)",h.innerHTML=`
      <div class="font-medium">${p.name}</div>
      <div class="text-xs text-muted">${p.employeeId}</div>
    `,u.appendChild(h),i.forEach(m=>{const g=document.createElement("td");g.className="p-1 text-center";const y=c[`${p.id}_${m}`]||"GS",f=document.createElement("select");f.className="shift-select text-sm p-1 border rounded w-full",f.style.fontSize="12px",f.style.outline="none",f.dataset.emp=p.id,f.dataset.date=m,s.forEach(b=>{const k=document.createElement("option");k.value=b.id,k.text=b.code||b.name.substring(0,2).toUpperCase(),k.selected=(b.code||"GS")===y,f.appendChild(k)});const _=()=>{const b=s.find(k=>k.id===f.value);b&&(f.style.borderLeft=`3px solid ${b.color}`,f.style.backgroundColor="var(--bg-secondary)",f.style.color="var(--text-main)",f.style.borderColor="var(--border)",(b.code==="WO"||b.isOff)&&(f.style.opacity="0.7"))};f.addEventListener("change",_),_(),g.appendChild(f),u.appendChild(g)}),l.appendChild(u)})}async function ki(a){const e=a.querySelectorAll(".shift-select"),t=[];e.forEach(s=>{t.push({employeeId:s.dataset.emp,date:s.dataset.date,shiftId:s.value})}),await te.assignRoster(t),alert("Roster saved successfully!")}async function qa(a=null){const e=a?await te.getShift(a):null,t=document.createElement("div");t.style.cssText="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); padding: 2rem; overflow-y: auto; z-index: 1000; display: flex; align-items: center; justify-content: center;",t.innerHTML=`
    <div class="card" style="max-width: 500px; width: 100%;">
      <h3 class="mb-4">${e?"Edit Shift":"Add New Shift"}</h3>
      <form id="shift-form">
        <div class="grid grid-2">
          <div class="form-group">
            <label>Shift Name</label>
            <input type="text" id="shift-name" value="${e?.name||""}" required />
          </div>
          <div class="form-group">
            <label>Shift Code</label>
            <input type="text" id="shift-code" value="${e?.code||""}" required maxlength="3" />
          </div>
        </div>

        <div class="grid grid-2">
          <div class="form-group">
            <label>Start Time</label>
            <input type="time" id="start-time" value="${e?.startTime||"09:00"}" required />
          </div>
          <div class="form-group">
            <label>End Time</label>
            <input type="time" id="end-time" value="${e?.endTime||"18:00"}" required />
          </div>
        </div>

        <div class="grid grid-3">
          <div class="form-group">
            <label>Break (Mins)</label>
            <input type="number" id="break-dur" value="${e?.breakDuration||60}" />
          </div>
          <div class="form-group">
            <label>Grace (Mins)</label>
            <input type="number" id="grace-time" value="${e?.graceTime||15}" />
          </div>
          <div class="form-group">
            <label>Color</label>
            <input type="color" id="shift-color" value="${e?.color||"#3b82f6"} " style="height: 40px; padding: 2px;" />
          </div>
        </div>

        <div class="form-group">
          <label class="flex items-center gap-2">
            <input type="checkbox" id="is-off" ${e?.isOff?"checked":""} />
            <span>Is Weekly Off / Holiday</span>
          </label>
        </div>

        <div class="flex gap-2">
          <button type="submit" class="btn btn-primary">Save Shift</button>
          <button type="button" class="btn btn-secondary" id="cancel-modal">Cancel</button>
        </div>
      </form>
    </div>
  `,document.body.appendChild(t),t.querySelector("#shift-form").addEventListener("submit",async s=>{s.preventDefault();const n={name:t.querySelector("#shift-name").value,code:t.querySelector("#shift-code").value.toUpperCase(),startTime:t.querySelector("#start-time").value,endTime:t.querySelector("#end-time").value,breakDuration:parseInt(t.querySelector("#break-dur").value),graceTime:parseInt(t.querySelector("#grace-time").value),color:t.querySelector("#shift-color").value,isOff:t.querySelector("#is-off").checked};e?await te.updateShift(e.id,n):await te.addShift(n),document.body.removeChild(t);const r=document.querySelector("#shift-content");r&&ja(r)}),t.querySelector("#cancel-modal").addEventListener("click",()=>{document.body.removeChild(t)})}window.editShift=a=>{qa(a)};class Ei{constructor(){}async initializePayrollSettings(){}async getPayrollSettings(){const e=await v.getAll("payroll_settings");if(e.length===0)return{};const t=e[0];return{pfRate:t.pf_rate,esiRate:t.esi_rate,esiThreshold:t.esi_threshold,professionalTax:t.professional_tax,tdsEnabled:t.tds_enabled,workingDaysPerMonth:t.working_days_per_month,overtimeRate:t.overtime_rate,lateDeductionPerDay:t.late_deduction_per_day}}async updatePayrollSettings(e){const t=await v.getAll("payroll_settings");if(t.length>0){const s={};e.pfRate!==void 0&&(s.pf_rate=e.pfRate),e.esiRate!==void 0&&(s.esi_rate=e.esiRate),e.esiThreshold!==void 0&&(s.esi_threshold=e.esiThreshold),e.professionalTax!==void 0&&(s.professional_tax=e.professionalTax),e.tdsEnabled!==void 0&&(s.tds_enabled=e.tdsEnabled),e.workingDaysPerMonth!==void 0&&(s.working_days_per_month=e.workingDaysPerMonth),e.overtimeRate!==void 0&&(s.overtime_rate=e.overtimeRate),e.lateDeductionPerDay!==void 0&&(s.late_deduction_per_day=e.lateDeductionPerDay),await v.update("payroll_settings","id",t[0].id,s)}await this.logAction("payroll_settings_updated","Payroll settings updated")}async processMonthlyPayroll(e,t){const s=await E.getEmployees({status:"active"}),n=[];for(const r of s)try{const i=await this.calculatePayslip(r.id,e,t);n.push({success:!0,employee:r.name,payslip:i})}catch(i){n.push({success:!1,employee:r.name,error:i.message})}return await this.logAction("payroll_processed",`Processed payroll for ${e}/${t}`),n}async calculatePayslip(e,t,s){const n=await E.getEmployee(e);if(!n)throw new Error("Employee not found");let r=n.salaryStructure;if(!r){const C=n.salary||{basic:25e3,hra:1e4,special:8e3};r={basic:C.basic||25e3,hra:C.hra||1e4,conveyance:C.conveyance||1600,medicalAllowance:C.medicalAllowance||1250,specialAllowance:C.special||C.specialAllowance||8e3,gross:(C.basic||25e3)+(C.hra||1e4)+(C.special||8e3)+2850}}const i=await this.getPayrollSettings(),o=await G.getAttendanceSummary(e,t,s),l=await this.getApprovedLeaves(e,t,s),d=new Date(s,t,0).getDate(),c=i.workingDaysPerMonth||26,p=o.present,u=o.absent;l.totalDays;const h=l.paidDays,m=l.unpaidDays,g=p+h,y=r.gross/c;let f={basic:r.basic,hra:r.hra,conveyance:r.conveyance||0,medicalAllowance:r.medicalAllowance||0,specialAllowance:r.specialAllowance||0};const _=o.overtimeHours||0,b=r.gross/(c*8),k=_*b*(i.overtimeRate||1.5);f.overtime=Math.round(k);const P=Object.values(f).reduce((C,q)=>C+q,0);let A={pf:Math.round(r.basic*((i.pfRate||12)/100)),esi:r.gross<(i.esiThreshold||21e3)?Math.round(r.gross*((i.esiRate||.75)/100)):0,professionalTax:i.professionalTax||200,tds:0};const L=u+m;A.absence=Math.round(L*y),(i.lateDeductionPerDay||0)>0?A.lateMark=o.late*i.lateDeductionPerDay:A.lateMark=0;const H=Object.values(A).reduce((C,q)=>C+q,0),w=P-H,D={id:`PAY${e}_${t}_${s}`,employee_id:e,employee_name:n.name,employee_code:n.employeeId,month:t,year:s,designation:n.designation,department:n.department,attendance:{totalDays:d,workingDays:c,presentDays:p,absentDays:u,paidLeaveDays:h,unpaidLeaveDays:m,lateMarks:o.late,overtimeHours:_.toFixed(2),effectiveWorkingDays:g},earnings:f,gross_earnings:P,deductions:A,total_deductions:H,net_salary:w,status:"draft",processed_on:new Date().toISOString(),processed_by:S.getCurrentUser()?.userId||"system",approved_on:null,approved_by:null,paid_on:null};return await v.upsert("payslips",D,{onConflict:"id"}),this._mapPayslipToLegacy(D)}async getApprovedLeaves(e,t,s){const n=`${s}-${String(t).padStart(2,"0")}-01`,r=new Date(s,t,0).toISOString().split("T")[0],o=(await N.getLeaveRequests({employeeId:e,status:"approved"})).filter(c=>c.startDate>=n&&c.startDate<=r);let l=0,d=0;return o.forEach(c=>{c.salaryImpact&&c.salaryImpact.unpaidDays>0?(d+=c.salaryImpact.unpaidDays,l+=c.days-c.salaryImpact.unpaidDays):l+=c.days}),{totalDays:l+d,paidDays:l,unpaidDays:d}}async getPayslips(e={}){const t={};return e.employeeId&&(t.employee_id=e.employeeId),e.month&&(t.month=e.month),e.year&&(t.year=e.year),e.status&&(t.status=e.status),(await v.getAll("payslips",t,{column:"year",ascending:!1})).map(n=>this._mapPayslipToLegacy(n))}async getPayslip(e){const t=await v.getOne("payslips","id",e);return t?this._mapPayslipToLegacy(t):null}async approvePayslip(e,t){if(!await v.getOne("payslips","id",e))return{success:!1,message:"Payslip not found"};const n=await E.getEmployee(t);await v.update("payslips","id",e,{status:"approved",approved_on:new Date().toISOString(),approved_by:n?.name||t}),await this.logAction("payslip_approved",`Payslip ${e} approved`);const r=await v.getOne("payslips","id",e);return{success:!0,payslip:this._mapPayslipToLegacy(r)}}async markAsPaid(e){if(!await v.getOne("payslips","id",e))return{success:!1,message:"Payslip not found"};await v.update("payslips","id",e,{status:"paid",paid_on:new Date().toISOString()}),await this.logAction("payslip_paid",`Payslip ${e} marked as paid`);const s=await v.getOne("payslips","id",e);return{success:!0,payslip:this._mapPayslipToLegacy(s)}}async getPayrollSummary(e,t){const s=await this.getPayslips({month:e,year:t}),n={totalEmployees:s.length,totalGross:0,totalDeductions:0,totalNet:0,totalOvertimePaid:0,totalAbsenceDeduction:0,byStatus:{draft:0,approved:0,paid:0}};return s.forEach(r=>{n.totalGross+=r.grossEarnings,n.totalDeductions+=r.totalDeductions,n.totalNet+=r.netSalary,n.totalOvertimePaid+=r.earnings.overtime||0,n.totalAbsenceDeduction+=r.deductions.absence||0,n.byStatus[r.status]++}),n}async logAction(e,t){const s=S.getCurrentUser();s&&await S.logAudit(e,s.userId,t)}_mapPayslipToLegacy(e){return e?{id:e.id,employeeId:e.employee_id,employeeName:e.employee_name,employeeCode:e.employee_code,month:e.month,year:e.year,designation:e.designation,department:e.department,attendance:e.attendance,earnings:e.earnings,grossEarnings:e.gross_earnings,deductions:e.deductions,totalDeductions:e.total_deductions,netSalary:e.net_salary,status:e.status,processedOn:e.processed_on,processedBy:e.processed_by,approvedOn:e.approved_on,approvedBy:e.approved_by,paidOn:e.paid_on}:null}}const se=new Ei;function $i(){const a=document.createElement("div");a.id="payroll-dashboard-container";const e=async()=>{const t=S.getCurrentUser(),s=t&&(t.role==="hr_admin"||t.role==="super_admin"),n=t&&t.role==="employee",r=new Date,i=r.getMonth()+1,o=r.getFullYear();a.innerHTML=`
    <div class="page-header">
      <h1 class="page-title">Payroll Management</h1>
      <p class="page-subtitle">Transparent salary processing and payslip generation</p>
    </div>

    ${s?await Ti(i,o):""}
    ${n?await Ai(t.userId,i,o):""}
  `,s&&Ci(a)};return e(),window.addEventListener("payroll-updated",()=>{document.body.contains(a)&&e()}),a}async function Ti(a,e){const t=await se.getPayrollSummary(a,e);return`
    <!-- Process Payroll Section -->
    <div class="card mb-6">
      <h3 class="mb-4">Process Monthly Payroll</h3>
      <div class="grid grid-3 mb-4">
        <div class="form-group">
          <label>Month</label>
          <select id="payroll-month">
            ${Na(a)}
          </select>
        </div>
        <div class="form-group">
          <label>Year</label>
          <select id="payroll-year">
            <option value="2024">2024</option>
            <option value="2025" selected>2025</option>
            <option value="2026">2026</option>
          </select>
        </div>
        <div style="display: flex; align-items: flex-end;">
          <button class="btn btn-primary w-full" id="process-payroll-btn">Process Payroll</button>
        </div>
      </div>

      <div class="alert alert-success text-sm">
        ✓ <strong>Automatic Calculations:</strong> System will auto-calculate salaries based on attendance, leaves, and overtime for all active employees.
      </div>
    </div>

    <!-- Payroll Summary -->
    <div class="card mb-6">
      <h3 class="mb-4">Payroll Summary - ${dt(a)} ${e}</h3>
      <div class="grid grid-4">
        <div class="card stat-card" style="background: var(--bg-secondary);">
          <div class="stat-value">${t.totalEmployees}</div>
          <div class="stat-label">Total Employees</div>
        </div>
        <div class="card stat-card" style="background: var(--bg-secondary);">
          <div class="stat-value">₹${(t.totalGross/1e5).toFixed(1)}L</div>
          <div class="stat-label">Gross Payroll</div>
        </div>
        <div class="card stat-card" style="background: var(--bg-secondary);">
          <div class="stat-value">₹${(t.totalDeductions/1e5).toFixed(1)}L</div>
          <div class="stat-label">Total Deductions</div>
        </div>
        <div class="card stat-card" style="background: var(--bg-secondary);">
          <div class="stat-value">₹${(t.totalNet/1e5).toFixed(1)}L</div>
          <div class="stat-label">Net Payroll</div>
        </div>
      </div>

      <div class="grid grid-3 mt-4 text-sm">
        <div>
          <div class="text-muted">Status Breakdown:</div>
          <div class="mt-1">
            <span class="badge badge-warning">Draft: ${t.byStatus.draft}</span>
            <span class="badge badge-primary ml-2">Approved: ${t.byStatus.approved}</span>
            <span class="badge badge-success ml-2">Paid: ${t.byStatus.paid}</span>
          </div>
        </div>
        <div>
          <div class="text-muted">Overtime Paid:</div>
          <div class="font-medium">₹${t.totalOvertimePaid.toLocaleString()}</div>
        </div>
        <div>
          <div class="text-muted">Absence Deductions:</div>
          <div class="font-medium">₹${t.totalAbsenceDeduction.toLocaleString()}</div>
        </div>
      </div>
    </div>

    <!-- Payslips List -->
    <div class="card">
      <div class="flex justify-between items-center mb-4">
        <h3>Payslips</h3>
        <div class="flex gap-2">
          <select id="status-filter" class="btn btn-secondary">
            <option value="">All Status</option>
            <option value="draft">Draft</option>
            <option value="approved">Approved</option>
            <option value="paid">Paid</option>
          </select>
        </div>
      </div>
      
      <div id="payslips-list"></div>
    </div>
  `}async function Ai(a,e,t){const n=(await se.getPayslips({employeeId:a})).find(r=>r.month===e&&r.year===t);return`
    <div class="grid grid-2 mb-6">
      <div class="form-group">
        <label>Select Month</label>
        <select id="emp-month-filter">
          ${Na(e)}
        </select>
      </div>
      <div class="form-group">
        <label>Select Year</label>
        <select id="emp-year-filter">
          <option value="2024">2024</option>
          <option value="2025" selected>2025</option>
        </select>
      </div>
    </div>

    ${n?Di(n):`
      <div class="card text-center p-8">
        <div style="font-size: 3rem; margin-bottom: 1rem;">💰</div>
        <h3 class="mb-2">No Payslip Found</h3>
        <p class="text-muted">Payslip for ${dt(e)} ${t} has not been processed yet.</p>
      </div>
    `}
  `}function Di(a){return`
    <div class="card mb-4">
      <div class="flex justify-between items-start mb-4">
        <div>
          <h2 class="mb-2">Payslip - ${dt(a.month)} ${a.year}</h2>
          <div class="text-sm text-muted">
            Employee: ${a.employeeName} (${a.employeeCode})<br/>
            Department: ${a.department} | Designation: ${a.designation}
          </div>
        </div>
        <div class="flex gap-2">
          ${Ua(a.status)}
          <button class="btn btn-primary" onclick="window.printPayslip('${a.id}')">🖨️ Print Payslip</button>
        </div>
      </div>

      <!-- Attendance Summary -->
      <div class="mb-6">
        <h4 class="mb-3">📊 Attendance Summary</h4>
        <div class="grid grid-4 text-sm">
          <div class="card" style="background: var(--bg-secondary); padding: 1rem;">
            <div class="text-muted">Working Days</div>
            <div class="font-bold text-lg">${a.attendance.workingDays}</div>
          </div>
          <div class="card" style="background: var(--bg-secondary); padding: 1rem;">
            <div class="text-muted">Present</div>
            <div class="font-bold text-lg" style="color: var(--success);">${a.attendance.presentDays}</div>
          </div>
          <div class="card" style="background: var(--bg-secondary); padding: 1rem;">
            <div class="text-muted">Paid Leaves</div>
            <div class="font-bold text-lg" style="color: var(--primary);">${a.attendance.paidLeaveDays}</div>
          </div>
          <div class="card" style="background: var(--bg-secondary); padding: 1rem;">
            <div class="text-muted">Absent/Unpaid</div>
            <div class="font-bold text-lg" style="color: var(--danger);">${a.attendance.absentDays+a.attendance.unpaidLeaveDays}</div>
          </div>
        </div>
        <div class="mt-3 text-sm">
          <strong>Effective Working Days:</strong> ${a.attendance.effectiveWorkingDays} days | 
          <strong>Overtime:</strong> ${a.attendance.overtimeHours} hours | 
          <strong>Late Marks:</strong> ${a.attendance.lateMarks}
        </div>
      </div>

      <!-- Salary Breakdown -->
      <div class="grid grid-2 gap-6">
        <!-- Earnings -->
        <div>
          <h4 class="mb-3 flex items-center gap-2">
            <span style="color: var(--success);">💰 Earnings</span>
          </h4>
          <table class="w-full text-sm">
            <tbody>
              <tr>
                <td class="py-2">Basic Salary</td>
                <td class="text-right font-medium">₹${a.earnings.basic.toLocaleString()}</td>
              </tr>
              <tr>
                <td class="py-2">House Rent Allowance (HRA)</td>
                <td class="text-right font-medium">₹${a.earnings.hra.toLocaleString()}</td>
              </tr>
              ${a.earnings.conveyance?`
              <tr>
                <td class="py-2">Conveyance</td>
                <td class="text-right font-medium">₹${a.earnings.conveyance.toLocaleString()}</td>
              </tr>`:""}
              ${a.earnings.medicalAllowance?`
              <tr>
                <td class="py-2">Medical Allowance</td>
                <td class="text-right font-medium">₹${a.earnings.medicalAllowance.toLocaleString()}</td>
              </tr>`:""}
              ${a.earnings.specialAllowance?`
              <tr>
                <td class="py-2">Special Allowance</td>
                <td class="text-right font-medium">₹${a.earnings.specialAllowance.toLocaleString()}</td>
              </tr>`:""}
              ${a.earnings.overtime>0?`
              <tr style="background: rgba(16, 185, 129, 0.1);">
                <td class="py-2"><strong>Overtime (${a.attendance.overtimeHours}h)</strong></td>
                <td class="text-right font-bold" style="color: var(--success);">₹${a.earnings.overtime.toLocaleString()}</td>
              </tr>`:""}
              <tr class="border-t" style="border-color: var(--border);">
                <td class="py-2"><strong>Gross Earnings</strong></td>
                <td class="text-right font-bold text-lg">₹${a.grossEarnings.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Deductions -->
        <div>
          <h4 class="mb-3 flex items-center gap-2">
            <span style="color: var(--danger);">➖ Deductions</span>
          </h4>
          <table class="w-full text-sm">
            <tbody>
              <tr>
                <td class="py-2">Provident Fund (PF)</td>
                <td class="text-right font-medium">₹${a.deductions.pf.toLocaleString()}</td>
              </tr>
              ${a.deductions.esi>0?`
              <tr>
                <td class="py-2">ESI</td>
                <td class="text-right font-medium">₹${a.deductions.esi.toLocaleString()}</td>
              </tr>`:""}
              <tr>
                <td class="py-2">Professional Tax</td>
                <td class="text-right font-medium">₹${a.deductions.professionalTax.toLocaleString()}</td>
              </tr>
              ${a.deductions.absence>0?`
              <tr style="background: rgba(239, 68, 68, 0.1);">
                <td class="py-2"><strong>Absence Deduction</strong></td>
                <td class="text-right font-bold" style="color: var(--danger);">₹${a.deductions.absence.toLocaleString()}</td>
              </tr>`:""}
              ${a.deductions.lateMark>0?`
              <tr>
                <td class="py-2">Late Mark Penalty</td>
                <td class="text-right font-medium">₹${a.deductions.lateMark.toLocaleString()}</td>
              </tr>`:""}
              <tr class="border-t" style="border-color: var(--border);">
                <td class="py-2"><strong>Total Deductions</strong></td>
                <td class="text-right font-bold text-lg">₹${a.totalDeductions.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Net Salary -->
      <div class="mt-6 p-4" style="background: var(--surface); border: 1px solid var(--primary-lime); border-radius: 8px; color: var(--text-main); box-shadow: 0 0 15px rgba(204, 255, 0, 0.1);">
        <div class="flex justify-between items-center">
          <div>
            <div class="text-sm opacity-90">Net Salary (Take Home)</div>
            <div class="text-3xl font-bold">₹${a.netSalary.toLocaleString()}</div>
          </div>
          <div class="text-right text-sm opacity-90">
            ${a.status==="paid"?`Paid on: ${new Date(a.paidOn).toLocaleDateString()}`:a.status==="approved"?`Approved on: ${new Date(a.approvedOn).toLocaleDateString()}`:"Pending Processing"}
          </div>
        </div>
      </div>

      <div class="mt-4 text-xs text-muted text-center">
        Processed on: ${new Date(a.processedOn).toLocaleString()} | 
        This is a system-generated payslip with complete transparency.
      </div>
    </div>
  `}function Ci(a){const e=a.querySelector("#process-payroll-btn");e&&e.addEventListener("click",async()=>{const t=parseInt(a.querySelector("#payroll-month").value),s=parseInt(a.querySelector("#payroll-year").value);if(confirm(`Process payroll for ${dt(t)} ${s}? This will calculate salaries for all active employees.`)){e.disabled=!0,e.textContent="Processing...";try{const n=await se.processMonthlyPayroll(t,s),r=n.filter(o=>o.success).length,i=n.filter(o=>!o.success).length;alert(`Payroll processed!

Successful: ${r}
Failed: ${i}`),window.dispatchEvent(new Event("payroll-updated"))}catch(n){alert("Error processing payroll: "+n.message)}finally{e.disabled=!1,e.textContent="Process Payroll"}}}),Ma(a)}async function Ma(a){const e=a.querySelector("#payslips-list");if(!e)return;const t=parseInt(a.querySelector("#payroll-month").value),s=parseInt(a.querySelector("#payroll-year").value),n=a.querySelector("#status-filter")?.value||"",r={month:t,year:s};n&&(r.status=n);const i=await se.getPayslips(r);if(i.length===0){e.innerHTML='<p class="text-muted text-center p-8">No payslips found. Click "Process Payroll" to generate.</p>';return}const o=document.createElement("table");o.innerHTML=`
    <thead>
      <tr>
        <th>Employee</th>
        <th>Designation</th>
        <th>Days Worked</th>
        <th>Gross</th>
        <th>Deductions</th>
        <th>Net Salary</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      ${i.map(d=>`
        <tr>
          <td>
            <div class="font-medium">${d.employeeName}</div>
            <div class="text-xs text-muted">${d.employeeCode}</div>
          </td>
          <td class="text-sm">${d.designation}</td>
          <td class="font-medium">${d.attendance.effectiveWorkingDays}</td>
          <td class="font-medium">₹${d.grossEarnings.toLocaleString()}</td>
          <td class="font-medium" style="color: var(--danger);">₹${d.totalDeductions.toLocaleString()}</td>
          <td class="font-bold">₹${d.netSalary.toLocaleString()}</td>
          <td>${Ua(d.status)}</td>
          <td>
            <div class="flex gap-2">
              ${d.status==="draft"?`<button class="btn btn-sm btn-primary" onclick="window.approvePayslip('${d.id}')">Approve</button>`:""}
              ${d.status==="approved"?`<button class="btn btn-sm btn-success" onclick="window.markAsPaid('${d.id}')">Mark Paid</button>`:""}
              <button class="btn btn-sm btn-secondary" onclick="window.viewPayslip('${d.id}')">View</button>
            </div>
          </td>
        </tr>
      `).join("")}
    </tbody>
  `,e.innerHTML="",e.appendChild(o);const l=a.querySelector("#status-filter");l&&l.addEventListener("change",()=>Ma(a))}function Ua(a){return{draft:'<span class="badge badge-warning">Draft</span>',approved:'<span class="badge badge-primary">Approved</span>',paid:'<span class="badge badge-success">Paid</span>'}[a]||a}function Na(a){return["January","February","March","April","May","June","July","August","September","October","November","December"].map((t,s)=>`<option value="${s+1}" ${s+1===a?"selected":""}>${t}</option>`).join("")}function dt(a){return["January","February","March","April","May","June","July","August","September","October","November","December"][a-1]}window.approvePayslip=async a=>{if(confirm("Approve this payslip?")){const e=S.getCurrentUser();(await se.approvePayslip(a,e.userId)).success&&(alert("Payslip approved!"),window.dispatchEvent(new Event("payroll-updated")))}};window.markAsPaid=async a=>{confirm("Mark this payslip as paid?")&&(await se.markAsPaid(a)).success&&(alert("Payslip marked as paid!"),window.dispatchEvent(new Event("payroll-updated")))};window.viewPayslip=a=>{window.printPayslip(a)};window.printPayslip=a=>{window.location.hash=`payslip/${a}`};function Li(a){const e=document.createElement("div");return e.innerHTML='<div class="text-muted text-center py-8">Loading payslip...</div>',Oi(e,a),e}async function Oi(a,e){const t=await se.getPayslip(e);if(!t){a.innerHTML='<div class="text-center p-8"><h3>Payslip not found</h3></div>';return}return a.className="payslip-document",a.innerHTML=`
    <style>
      @media print {
        body * {
          visibility: hidden;
        }
        .payslip-document, .payslip-document * {
          visibility: visible;
        }
        .payslip-document {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
        }
        .no-print {
          display: none !important;
        }
        .page-break {
          page-break-after: always;
        }
      }

      .payslip-document {
        max-width: 210mm;
        margin: 0 auto;
        background: white;
        padding: 20mm;
        font-family: 'Arial', sans-serif;
        font-size: 12pt;
        line-height: 1.6;
        color: #000;
      }

      .payslip-header {
        border-bottom: 3px solid #111111;
        padding-bottom: 20px;
        margin-bottom: 30px;
      }

      .company-logo {
        font-size: 28pt;
        font-weight: bold;
        color: #111111;
        margin-bottom: 5px;
      }

      .payslip-title {
        font-size: 20pt;
        font-weight: bold;
        text-align: center;
        margin: 20px 0;
        text-transform: uppercase;
        letter-spacing: 2px;
      }

      .info-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;
        margin-bottom: 30px;
      }

      .info-item {
        display: flex;
        padding: 8px 0;
      }

      .info-label {
        font-weight: bold;
        width: 150px;
        color: #666;
      }

      .info-value {
        color: #000;
      }

      .section-title {
        background: #f0f4f8;
        padding: 10px 15px;
        font-weight: bold;
        font-size: 14pt;
        margin: 25px 0 15px 0;
        border-left: 4px solid #ccff00;
      }

      .payslip-table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
      }

      .payslip-table th {
        background: #f8fafc;
        padding: 12px;
        text-align: left;
        font-weight: bold;
        border-bottom: 2px solid #e2e8f0;
      }

      .payslip-table td {
        padding: 10px 12px;
        border-bottom: 1px solid #f1f5f9;
      }

      .payslip-table tr:last-child td {
        border-bottom: none;
      }

      .amount {
        text-align: right;
        font-family: 'Courier New', monospace;
      }

      .total-row {
        background: #f8fafc;
        font-weight: bold;
        font-size: 13pt;
      }

      .net-salary-box {
        background: #111111;
        color: white;
        padding: 20px;
        border-radius: 8px;
        margin: 30px 0;
        text-align: center;
      }

      .net-salary-label {
        font-size: 16pt;
        margin-bottom: 10px;
        opacity: 0.9;
      }

      .net-salary-amount {
        font-size: 32pt;
        font-weight: bold;
        font-family: 'Courier New', monospace;
      }

      .net-salary-words {
        font-size: 11pt;
        margin-top: 10px;
        opacity: 0.9;
        font-style: italic;
      }

      .footer {
        margin-top: 50px;
        padding-top: 20px;
        border-top: 2px solid #e2e8f0;
        font-size: 10pt;
        color: #666;
      }

      .signature-section {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 50px;
        margin-top: 60px;
      }

      .signature-box {
        text-align: center;
      }

      .signature-line {
        border-top: 2px solid #000;
        margin-top: 50px;
        padding-top: 10px;
      }

      .watermark {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(-45deg);
        font-size: 100pt;
        color: rgba(59, 130, 246, 0.05);
        font-weight: bold;
        z-index: -1;
        pointer-events: none;
      }
    </style>

    <div class="no-print" style="margin-bottom: 20px; text-align: right;">
      <button class="btn btn-primary" onclick="window.print()">🖨️ Print Payslip</button>
      <button class="btn btn-secondary" onclick="window.history.back()">← Back</button>
    </div>

    <div style="position: relative;">
      <div class="watermark">${t.status.toUpperCase()}</div>

      <!-- Header -->
      <div class="payslip-header">
        <div class="company-logo">Subix HRMS</div>
        <div style="color: #666; font-size: 11pt;">Human Resource Management System</div>
        <div style="color: #666; font-size: 10pt; margin-top: 5px;">
          Corporate Office | HR Department<br/>
          Email: hr@subix.io | Phone: +91-XXXXXXXXXX
        </div>
      </div>

      <!-- Title -->
      <div class="payslip-title">
        Salary Slip for ${pa(t.month)} ${t.year}
      </div>

      <!-- Employee Info -->
      <div class="info-grid">
        <div>
          <div class="info-item">
            <div class="info-label">Employee Name:</div>
            <div class="info-value">${t.employeeName}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Employee ID:</div>
            <div class="info-value">${t.employeeCode}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Designation:</div>
            <div class="info-value">${t.designation}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Department:</div>
            <div class="info-value">${t.department}</div>
          </div>
        </div>
        <div>
          <div class="info-item">
            <div class="info-label">Pay Period:</div>
            <div class="info-value">${pa(t.month)} ${t.year}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Working Days:</div>
            <div class="info-value">${t.attendance.workingDays}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Days Worked:</div>
            <div class="info-value">${t.attendance.effectiveWorkingDays}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Payment Date:</div>
            <div class="info-value">${t.paidOn?new Date(t.paidOn).toLocaleDateString():"Pending"}</div>
          </div>
        </div>
      </div>

      <!-- Attendance Details -->
      <div class="section-title">📊 Attendance Summary</div>
      <table class="payslip-table">
        <thead>
          <tr>
            <th>Description</th>
            <th class="amount">Days/Hours</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Present Days</td>
            <td class="amount">${t.attendance.presentDays}</td>
          </tr>
          <tr>
            <td>Paid Leave Days</td>
            <td class="amount">${t.attendance.paidLeaveDays}</td>
          </tr>
          <tr>
            <td>Unpaid Leave Days</td>
            <td class="amount">${t.attendance.unpaidLeaveDays}</td>
          </tr>
          <tr>
            <td>Absent Days</td>
            <td class="amount">${t.attendance.absentDays}</td>
          </tr>
          <tr>
            <td>Overtime Hours</td>
            <td class="amount">${t.attendance.overtimeHours}</td>
          </tr>
          <tr>
            <td>Late Marks</td>
            <td class="amount">${t.attendance.lateMarks}</td>
          </tr>
        </tbody>
      </table>

      <!-- Earnings & Deductions -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
        <!-- Earnings -->
        <div>
          <div class="section-title">💰 Earnings</div>
          <table class="payslip-table">
            <thead>
              <tr>
                <th>Description</th>
                <th class="amount">Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Basic Salary</td>
                <td class="amount">${t.earnings.basic.toLocaleString()}</td>
              </tr>
              <tr>
                <td>House Rent Allowance</td>
                <td class="amount">${t.earnings.hra.toLocaleString()}</td>
              </tr>
              ${t.earnings.conveyance?`
              <tr>
                <td>Conveyance Allowance</td>
                <td class="amount">${t.earnings.conveyance.toLocaleString()}</td>
              </tr>`:""}
              ${t.earnings.medicalAllowance?`
              <tr>
                <td>Medical Allowance</td>
                <td class="amount">${t.earnings.medicalAllowance.toLocaleString()}</td>
              </tr>`:""}
              ${t.earnings.specialAllowance?`
              <tr>
                <td>Special Allowance</td>
                <td class="amount">${t.earnings.specialAllowance.toLocaleString()}</td>
              </tr>`:""}
              ${t.earnings.overtime?`
              <tr>
                <td>Overtime Pay</td>
                <td class="amount">${t.earnings.overtime.toLocaleString()}</td>
              </tr>`:""}
              <tr class="total-row">
                <td>GROSS EARNINGS</td>
                <td class="amount">₹ ${t.grossEarnings.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Deductions -->
        <div>
          <div class="section-title">➖ Deductions</div>
          <table class="payslip-table">
            <thead>
              <tr>
                <th>Description</th>
                <th class="amount">Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Provident Fund (PF)</td>
                <td class="amount">${t.deductions.pf.toLocaleString()}</td>
              </tr>
              ${t.deductions.esi?`
              <tr>
                <td>Employee State Insurance</td>
                <td class="amount">${t.deductions.esi.toLocaleString()}</td>
              </tr>`:""}
              <tr>
                <td>Professional Tax</td>
                <td class="amount">${t.deductions.professionalTax.toLocaleString()}</td>
              </tr>
              ${t.deductions.absence?`
              <tr>
                <td>Absence Deduction</td>
                <td class="amount">${t.deductions.absence.toLocaleString()}</td>
              </tr>`:""}
              ${t.deductions.lateMark?`
              <tr>
                <td>Late Mark Penalty</td>
                <td class="amount">${t.deductions.lateMark.toLocaleString()}</td>
              </tr>`:""}
              ${t.deductions.tds?`
              <tr>
                <td>Tax Deducted at Source</td>
                <td class="amount">${t.deductions.tds.toLocaleString()}</td>
              </tr>`:""}
              <tr class="total-row">
                <td>TOTAL DEDUCTIONS</td>
                <td class="amount">₹ ${t.totalDeductions.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Net Salary -->
      <div class="net-salary-box">
        <div class="net-salary-label">NET SALARY (TAKE HOME)</div>
        <div class="net-salary-amount">₹ ${t.netSalary.toLocaleString()}</div>
        <div class="net-salary-words">(${Pi(t.netSalary)} Rupees Only)</div>
      </div>

      <!-- Signature Section -->
      <div class="signature-section">
        <div class="signature-box">
          <div class="signature-line">Employee Signature</div>
        </div>
        <div class="signature-box">
          <div class="signature-line">Authorized Signatory</div>
          <div style="margin-top: 10px; font-size: 10pt; color: #666;">
            For Subix HRMS Company
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="footer">
        <div style="text-align: center; margin-bottom: 10px;">
          <strong>Note:</strong> This is a system-generated payslip and does not require a physical signature.
        </div>
        <div style="text-align: center; font-size: 9pt; color: #999;">
          Generated on: ${new Date().toLocaleString()} | 
          Payslip ID: ${t.id} | 
          Status: ${t.status.toUpperCase()}
        </div>
        <div style="text-align: center; margin-top: 15px; padding-top: 15px; border-top: 1px solid #e2e8f0;">
          <strong>Subix HRMS</strong> - Complete Transparency in HR Management<br/>
          <span style="font-size: 9pt;">This document is confidential and intended for the addressee only.</span>
        </div>
      </div>
    </div>
  `,a}function pa(a){return["January","February","March","April","May","June","July","August","September","October","November","December"][a-1]}function Pi(a){if(a===0)return"Zero";const e=["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine"],t=["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"],s=["Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"];function n(r){return r===0?"":r<10?e[r]:r<20?s[r-10]:r<100?t[Math.floor(r/10)]+" "+e[r%10]:e[Math.floor(r/100)]+" Hundred "+n(r%100)}if(a<1e3)return n(a).trim();if(a<1e5){const r=Math.floor(a/1e3),i=a%1e3;return(n(r)+" Thousand "+n(i)).trim()}if(a<1e7){const r=Math.floor(a/1e5),i=a%1e5,o=Math.floor(i/1e3),l=i%1e3;return(n(r)+" Lakh "+n(o)+" Thousand "+n(l)).trim()}return"Amount Too Large"}function Ri(){const a=document.createElement("div");return S.getCurrentUser(),a.innerHTML=`
    <div class="page-header">
      <h1 class="page-title">Salary & Payslips</h1>
      <p class="page-subtitle">View your salary breakdown and download payslips</p>
    </div>

    <div class="grid grid-3 mb-6">
      <div class="card stat-card">
        <div class="stat-value">₹45,000</div>
        <div class="stat-label">Gross Salary</div>
      </div>

      <div class="card stat-card">
        <div class="stat-value">₹5,200</div>
        <div class="stat-label">Total Deductions</div>
      </div>

      <div class="card stat-card">
        <div class="stat-value" style="color: var(--success);">₹39,800</div>
        <div class="stat-label">Net Pay (Take Home)</div>
      </div>
    </div>

    <div class="card mb-4">
      <h3 class="mb-4">Salary Breakdown</h3>
      
      <div class="grid grid-2">
        <div>
          <h4 style="color: var(--success); margin-bottom: 1rem;">Earnings</h4>
          <table style="width: 100%;">
            <tr>
              <td style="padding: 0.5rem 0; border-bottom: 1px solid var(--border);">Basic Salary</td>
              <td style="padding: 0.5rem 0; border-bottom: 1px solid var(--border); text-align: right; font-weight: 600;">₹25,000</td>
            </tr>
            <tr>
              <td style="padding: 0.5rem 0; border-bottom: 1px solid var(--border);">HRA</td>
              <td style="padding: 0.5rem 0; border-bottom: 1px solid var(--border); text-align: right; font-weight: 600;">₹10,000</td>
            </tr>
            <tr>
              <td style="padding: 0.5rem 0; border-bottom: 1px solid var(--border);">Special Allowance</td>
              <td style="padding: 0.5rem 0; border-bottom: 1px solid var(--border); text-align: right; font-weight: 600;">₹8,000</td>
            </tr>
            <tr>
              <td style="padding: 0.5rem 0; border-bottom: 1px solid var(--border);">Bonus</td>
              <td style="padding: 0.5rem 0; border-bottom: 1px solid var(--border); text-align: right; font-weight: 600;">₹2,000</td>
            </tr>
            <tr>
              <td style="padding: 0.75rem 0; font-weight: 700; font-size: 1rem;">Total Earnings</td>
              <td style="padding: 0.75rem 0; text-align: right; font-weight: 700; font-size: 1rem; color: var(--success);">₹45,000</td>
            </tr>
          </table>
        </div>

        <div>
          <h4 style="color: var(--danger); margin-bottom: 1rem;">Deductions</h4>
          <table style="width: 100%;">
            <tr>
              <td style="padding: 0.5rem 0; border-bottom: 1px solid var(--border);">EPF (Employee)</td>
              <td style="padding: 0.5rem 0; border-bottom: 1px solid var(--border); text-align: right; font-weight: 600;">₹3,000</td>
            </tr>
            <tr>
              <td style="padding: 0.5rem 0; border-bottom: 1px solid var(--border);">Professional Tax</td>
              <td style="padding: 0.5rem 0; border-bottom: 1px solid var(--border); text-align: right; font-weight: 600;">₹200</td>
            </tr>
            <tr>
              <td style="padding: 0.5rem 0; border-bottom: 1px solid var(--border);">TDS</td>
              <td style="padding: 0.5rem 0; border-bottom: 1px solid var(--border); text-align: right; font-weight: 600;">₹2,000</td>
            </tr>
            <tr>
              <td style="padding: 0.5rem 0; border-bottom: 1px solid var(--border);"></td>
              <td style="padding: 0.5rem 0; border-bottom: 1px solid var(--border);"></td>
            </tr>
            <tr>
              <td style="padding: 0.75rem 0; font-weight: 700; font-size: 1rem;">Total Deductions</td>
              <td style="padding: 0.75rem 0; text-align: right; font-weight: 700; font-size: 1rem; color: var(--danger);">₹5,200</td>
            </tr>
          </table>
        </div>
      </div>

      <div style="margin-top: 2rem; padding: 1.5rem; background: var(--bg-secondary); border-radius: 8px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div class="text-sm text-muted">Net Pay (Take Home)</div>
            <div style="font-size: 2rem; font-weight: 700; color: var(--success); margin-top: 0.5rem;">₹39,800</div>
          </div>
          <div class="text-sm text-muted" style="text-align: right;">
            After all deductions<br/>
            Credited on 1st of every month
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
        <h3>Payslip History</h3>
      </div>

      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Gross Amount</th>
            <th>Deductions</th>
            <th>Net Pay</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody id="payslip-table-body">
          <!-- Payslips will be dynamically loaded -->
        </tbody>
      </table>
    </div>
  `,Ii(a),a}async function Ii(a){const e=S.getCurrentUser(),s=(await se.getPayslips(e.userId)||[]).sort((r,i)=>new Date(i.processedOn||i.date)-new Date(r.processedOn||r.date)).slice(0,12),n=a.querySelector("#payslip-table-body");if(s.length===0){n.innerHTML=`
      <tr>
        <td colspan="6" style="text-align: center; color: var(--text-muted); padding: 2rem;">
          No payslips available yet. Payslips will be generated after payroll processing.
        </td>
      </tr>
    `;return}n.innerHTML=s.map(r=>{const i=r.grossEarnings||r.grossPay||0,o=r.totalDeductions||0,l=r.netSalary||r.netPay||i-o;return`
      <tr>
        <td style="font-weight: 500;">${typeof r.month=="number"?new Date(2e3,r.month-1).toLocaleString("default",{month:"long"}):r.month} ${r.year}</td>
        <td>₹${i.toLocaleString()}</td>
        <td style="color: var(--danger);">₹${o.toLocaleString()}</td>
        <td style="color: var(--success); font-weight: 600;">₹${l.toLocaleString()}</td>
        <td>
          <span class="badge badge-${r.status==="Paid"?"success":"warning"}">
            ${r.status||"Processing"}
          </span>
        </td>
        <td>
          <button 
            class="btn btn-secondary" 
            style="padding: 0.375rem 0.75rem; font-size: 0.75rem;"
            onclick="window.viewPayslipFromList('${r.id}')"
          >
            View
          </button>
        </td>
      </tr>
    `}).join("")}window.viewPayslipFromList=async function(a){const e=await se.getPayslip(a);if(!e){alert("Payslip not found. Please try again.");return}S.getCurrentUser();const t=await E.getEmployee(e.employeeId)||{},s=e.grossPay||(e.earnings||[]).reduce((c,p)=>c+p.amount,0),n=e.totalDeductions||(e.deductions||[]).reduce((c,p)=>c+p.amount,0),r=e.netPay||s-n,i=e.earnings||[{label:"Basic Salary",amount:Math.round(s*.55)},{label:"HRA",amount:Math.round(s*.25)},{label:"Special Allowance",amount:Math.round(s*.2)}],o=e.deductions||[{label:"EPF",amount:Math.round(s*.12*.55)},{label:"Professional Tax",amount:200},{label:"TDS",amount:Math.max(0,Math.round(s*.05))}],l=`
<!DOCTYPE html>
<html>
<head>
    <title>Payslip - ${e.month} ${e.year}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Segoe UI', Arial, sans-serif; 
            padding: 20px;
            background: white;
            color: #333;
        }
        .container { max-width: 800px; margin: 0 auto; }
        .header { 
            text-align: center; 
            padding-bottom: 20px; 
            border-bottom: 3px solid #111111; 
            margin-bottom: 20px;
        }
        .company-name { 
            font-size: 28px; 
            font-weight: bold; 
            color: #111111; 
            margin-bottom: 5px;
        }
        .payslip-title { 
            font-size: 18px; 
            color: #666; 
            margin-top: 15px;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        .info-section { 
            display: flex; 
            justify-content: space-between; 
            background: #f8fafc;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        .info-group { }
        .info-row { margin-bottom: 8px; }
        .info-label { color: #666; font-size: 12px; }
        .info-value { font-weight: 600; font-size: 14px; }
        .section-title {
            background: #f0f4f8;
            padding: 10px 15px;
            font-weight: bold;
            margin: 20px 0 10px;
            border-left: 4px solid #ccff00;
        }
        table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
        th, td { padding: 10px; text-align: left; border-bottom: 1px solid #e2e8f0; }
        th { background: #f8fafc; font-weight: 600; }
        .amount { text-align: right; font-family: 'Courier New', monospace; }
        .total-row { background: #f8fafc; font-weight: bold; }
        .net-salary-box {
            background: #111111;
            color: white;
            padding: 25px;
            border-radius: 8px;
            text-align: center;
            margin: 25px 0;
        }
        .net-salary-label { font-size: 14px; opacity: 0.9; }
        .net-salary-amount { font-size: 36px; font-weight: bold; margin: 10px 0; }
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .footer { 
            margin-top: 30px; 
            padding-top: 20px; 
            border-top: 2px solid #e2e8f0; 
            text-align: center;
            color: #666;
            font-size: 12px;
        }
        .signature-section { 
            display: flex; 
            justify-content: space-between; 
            margin-top: 50px;
        }
        .signature-box { text-align: center; }
        .signature-line { 
            border-top: 2px solid #333; 
            width: 200px; 
            margin: 40px auto 10px;
            padding-top: 10px;
        }
        .download-btn {
            background: #ccff00;
            color: black;
            border: none;
            padding: 12px 24px;
            font-size: 16px;
            border-radius: 8px;
            cursor: pointer;
            margin: 20px 10px 20px 0;
        }
        .download-btn:hover { background: #b3e600; }
        .close-btn {
            background: #64748b;
            color: white;
            border: none;
            padding: 12px 24px;
            font-size: 16px;
            border-radius: 8px;
            cursor: pointer;
        }
        @media print {
            .no-print { display: none !important; }
            body { padding: 0; }
        }
    </style>
</head>
<body>
    <div class="no-print" style="text-align: center; margin-bottom: 20px;">
        <button class="download-btn" onclick="window.print()">📥 Download as PDF</button>
        <button class="close-btn" onclick="window.close()">✕ Close</button>
        <p style="color: #666; font-size: 12px; margin-top: 10px;">Click "Download as PDF" and select "Save as PDF" as the destination</p>
    </div>

    <div class="container">
        <div class="header">
            <div class="company-name">Subix HRMS</div>
            <div style="color: #666; font-size: 12px;">Human Resource Management System</div>
            <div class="payslip-title">Salary Slip for ${e.month} ${e.year}</div>
        </div>

        <div class="info-section">
            <div class="info-group">
                <div class="info-row">
                    <div class="info-label">Employee Name</div>
                    <div class="info-value">${e.employeeName||t.name||"Employee"}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Employee ID</div>
                    <div class="info-value">${e.employeeId||e.userId}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Department</div>
                    <div class="info-value">${e.department||t.department||"N/A"}</div>
                </div>
            </div>
            <div class="info-group">
                <div class="info-row">
                    <div class="info-label">Pay Period</div>
                    <div class="info-value">${e.month} ${e.year}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Designation</div>
                    <div class="info-value">${e.designation||t.designation||"N/A"}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Payment Date</div>
                    <div class="info-value">${e.paidOn?new Date(e.paidOn).toLocaleDateString():"Pending"}</div>
                </div>
            </div>
        </div>

        <div class="grid-2">
            <div>
                <div class="section-title">💰 Earnings</div>
                <table>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th class="amount">Amount (₹)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${i.map(c=>`
                            <tr>
                                <td>${c.label}</td>
                                <td class="amount">${c.amount.toLocaleString()}</td>
                            </tr>
                        `).join("")}
                        <tr class="total-row">
                            <td><strong>GROSS EARNINGS</strong></td>
                            <td class="amount"><strong>₹ ${s.toLocaleString()}</strong></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <div class="section-title">➖ Deductions</div>
                <table>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th class="amount">Amount (₹)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${o.map(c=>`
                            <tr>
                                <td>${c.label}</td>
                                <td class="amount">${c.amount.toLocaleString()}</td>
                            </tr>
                        `).join("")}
                        <tr class="total-row">
                            <td><strong>TOTAL DEDUCTIONS</strong></td>
                            <td class="amount"><strong>₹ ${n.toLocaleString()}</strong></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="net-salary-box">
            <div class="net-salary-label">NET SALARY (TAKE HOME)</div>
            <div class="net-salary-amount">₹ ${r.toLocaleString()}</div>
        </div>

        <div class="signature-section">
            <div class="signature-box">
                <div class="signature-line">Employee Signature</div>
            </div>
            <div class="signature-box">
                <div class="signature-line">Authorized Signatory</div>
                <div style="font-size: 11px; color: #666;">For Subix HRMS Company</div>
            </div>
        </div>

        <div class="footer">
            <p><strong>Note:</strong> This is a system-generated payslip and does not require a physical signature.</p>
            <p style="margin-top: 10px;">Generated on: ${new Date().toLocaleString()} | Payslip ID: ${e.id}</p>
            <p style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #e2e8f0;">
                <strong>Subix HRMS</strong> - Complete Transparency in HR Management
            </p>
        </div>
    </div>
</body>
</html>
    `,d=window.open("","_blank","width=900,height=700");d.document.write(l),d.document.close()};function ji(){const a=document.createElement("div");a.id="approval-dashboard-container";const e=S.getCurrentUser();if(!e)return a.innerHTML='<div class="alert alert-error">Please login first</div>',a;a.innerHTML=`
    <div class="page-header">
      <h1 class="page-title">Approvals Hub</h1>
      <p class="page-subtitle">Manage pending requests and workflows</p>
    </div>

    <!-- Stats Overview -->
    <div id="approval-stats" class="grid grid-4 mb-6">
      <div class="card stat-card" style="background: var(--bg-secondary);">
        <div class="stat-value">—</div>
        <div class="stat-label">Loading...</div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="grid grid-3" style="grid-template-columns: 2fr 1fr;">
      
      <!-- Left Column: Pending Approvals -->
      <div class="card">
        <div class="flex justify-between items-center mb-4">
          <h3>Pending Requests</h3>
          <div class="flex gap-2">
            <div class="btn-group" style="display: flex; background: var(--bg-secondary); border-radius: 6px; padding: 2px;">
              <button class="btn btn-sm filter-btn active" data-filter="all" style="background: white; border: none;">All</button>
              <button class="btn btn-sm filter-btn" data-filter="leave" style="background: transparent; border: none;">Leaves</button>
              <button class="btn btn-sm filter-btn" data-filter="attendance_correction" style="background: transparent; border: none;">Attendance</button>
            </div>
            <button class="btn btn-sm btn-secondary" id="refresh-approvals">↻ Refresh</button>
          </div>
        </div>
        <div id="bulk-actions" class="mb-4 p-2 bg-gray-50 rounded flex justify-between items-center" style="display: none; background: var(--bg-secondary); border: 1px dashed var(--border);">
            <span class="text-xs font-medium"><span id="selected-count">0</span> items selected</span>
            <div class="flex gap-2">
                <button class="btn btn-sm btn-success" id="bulk-approve-btn">Approve Selected</button>
                <button class="btn btn-sm btn-secondary" id="clear-selection-btn">Clear</button>
            </div>
        </div>
        <div id="pending-list" class="approval-list">
          <div class="text-center p-4 text-muted">Loading approvals...</div>
        </div>
      </div>

      <!-- Right Column: History -->
      <div>
        <div class="card mb-4" style="background: var(--bg-secondary);">
          <h3 class="mb-3">Quick Actions</h3>
          <button class="btn btn-primary w-full mb-2" id="delegate-btn">Delegate Approvals</button>
          <button class="btn btn-secondary w-full" id="toggle-bulk-btn">Toggle Bulk Mode</button>
        </div>

        <div class="card">
          <h3 class="mb-3">Recent History</h3>
          <div id="approval-history" class="text-sm">
            <p class="text-muted text-center">Loading history...</p>
          </div>
        </div>
      </div>
    </div>
  `;async function t(){try{const h=await he.getPendingApprovals(e.userId),m=a.querySelector("#approval-stats"),g=h.filter(f=>f.type==="leave").length,y=h.filter(f=>f.type==="attendance_correction").length;m.innerHTML=`
        <div class="card stat-card" style="background: var(--bg-secondary);">
          <div class="stat-value">${h.length}</div>
          <div class="stat-label">Pending Total</div>
        </div>
        <div class="card stat-card" style="background: var(--bg-secondary);">
          <div class="stat-value" style="color: var(--danger);">${h.filter(f=>f.type==="leave"&&f.data&&f.data.days>=3).length}</div>
          <div class="stat-label">Extended Leaves (3+ days)</div>
        </div>
        <div class="card stat-card" style="background: var(--bg-secondary);">
          <div class="stat-value" style="color: var(--primary);">${g}</div>
          <div class="stat-label">Leave Requests</div>
        </div>
        <div class="card stat-card" style="background: var(--bg-secondary);">
          <div class="stat-value" style="color: var(--warning);">${y}</div>
          <div class="stat-label">Attendance Corrections</div>
        </div>
      `}catch(h){console.error("Error loading approval stats:",h)}}async function s(h="all"){try{let m=await he.getPendingApprovals(e.userId);const g=a.querySelector("#pending-list");if(h!=="all"&&(m=m.filter(y=>y.type===h)),m.length===0){g.innerHTML=`
          <div class="text-center p-4 text-muted" style="padding: 2rem;">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">✓</div>
            <p>No ${h==="all"?"":ha(h)+" "}pending approvals. You're all caught up!</p>
          </div>
        `;return}g.innerHTML=m.map(y=>{const f=y.data||{};return`
          <div class="card mb-3 approval-card" data-id="${y.id}" data-type="${y.type}" style="border-left: 4px solid ${Mi(y.type)}; position: relative;">
            <div class="bulk-checkbox" style="display: none; position: absolute; left: -30px; top: 50%; transform: translateY(-50%);">
              <input type="checkbox" class="approval-select" value="${y.id}" data-type="${y.type}">
            </div>
            <div class="flex justify-between items-start">
              <div style="flex: 1;">
                <div class="flex items-center gap-2 mb-1">
                  <span class="badge ${Ui(y.type)}">${ha(y.type)}</span>
                  ${f.days>=3?'<span class="badge badge-danger">Extended</span>':""}
                  <span class="text-xs text-muted">${y.requestedOn?new Date(y.requestedOn).toLocaleDateString():""}</span>
                </div>
                <h4 class="mb-1">${y.requestedBy||"Employee"}</h4>
                <div class="text-sm text-muted mb-2">${y.title||y.description||""}</div>
                
                <div class="p-3 rounded text-sm mb-3" style="background: var(--bg-secondary); border-radius: 8px;">
                  ${qi(y)}
                </div>
              </div>
              <div class="flex flex-col gap-2 action-buttons" style="margin-left: 1rem;">
                <button class="btn btn-sm btn-success approve-btn" data-id="${y.id}" data-type="${y.type}">Approve</button>
                <button class="btn btn-sm btn-danger reject-btn" data-id="${y.id}" data-type="${y.type}">Reject</button>
              </div>
            </div>
          </div>
        `}).join(""),g.querySelectorAll(".approve-btn").forEach(y=>{y.addEventListener("click",()=>r(y.dataset.id,y.dataset.type,"approve"))}),g.querySelectorAll(".reject-btn").forEach(y=>{y.addEventListener("click",()=>r(y.dataset.id,y.dataset.type,"reject"))}),g.querySelectorAll(".approval-select").forEach(y=>{y.addEventListener("change",i)})}catch(m){console.error("Error loading pending approvals:",m);const g=a.querySelector("#pending-list");g.innerHTML=`<div class="alert alert-error">Error loading approvals: ${m.message}</div>`}}async function n(){try{const h=await he.getApprovalHistory(e.userId,5),m=a.querySelector("#approval-history");if(h.length===0){m.innerHTML='<p class="text-muted text-center">No recent history</p>';return}m.innerHTML=h.map(g=>`
        <div class="mb-3 pb-3 flex justify-between items-center" style="border-bottom: 1px solid var(--border);">
          <div>
            <div class="font-medium">${g.requestedBy||g.description?.split(" - ")[0]||"Employee"}</div>
            <div class="text-xs text-muted">${g.description||g.title||""}</div>
          </div>
          <div class="text-right">
            <span class="badge ${g.status==="approved"?"badge-success":"badge-danger"} text-xs">${g.status}</span>
            <div class="text-xs text-muted mt-1">${g.processedOn?new Date(g.processedOn).toLocaleDateString():""}</div>
          </div>
        </div>
      `).join("")}catch(h){console.error("Error loading approval history:",h)}}async function r(h,m,g){if(g==="approve"){const y=prompt("Add comments (optional):")||"";try{const f=await he.approve(h,m,e.userId,y);f.success?(alert("Request Approved ✅"),await c()):alert("Error: "+(f.message||"Unknown error"))}catch(f){alert("Error approving: "+f.message)}}else{const y=prompt("Reason for rejection (required):");if(!y)return;try{const f=await he.reject(h,m,e.userId,y);f.success?(alert("Request Rejected ❌"),await c()):alert("Error: "+(f.message||"Unknown error"))}catch(f){alert("Error rejecting: "+f.message)}}}function i(){const h=a.querySelectorAll(".approval-select:checked").length,m=a.querySelector("#selected-count");m&&(m.textContent=h)}function o(){a.querySelectorAll(".approval-select").forEach(h=>h.checked=!1),i()}function l(){const h=a.querySelector("#pending-list"),m=a.querySelectorAll(".bulk-checkbox"),g=a.querySelector("#bulk-actions"),y=a.querySelectorAll(".action-buttons");h.style.paddingLeft==="40px"?(h.style.paddingLeft="0",m.forEach(f=>f.style.display="none"),g.style.display="none",y.forEach(f=>f.style.opacity="1")):(h.style.paddingLeft="40px",h.style.transition="padding 0.3s",m.forEach(f=>{f.style.display="block",f.style.animation="slideIn 0.3s"}),g.style.display="flex",y.forEach(f=>f.style.opacity="0.3"))}async function d(){const h=a.querySelectorAll(".approval-select:checked");if(h.length!==0&&confirm(`Are you sure you want to approve ${h.length} requests?`)){let m=0;for(const g of h)try{(await he.approve(g.value,g.dataset.type,e.userId,"Bulk Approved")).success&&m++}catch(y){console.error(`Error approving ${g.value}:`,y)}alert(`Successfully approved ${m} of ${h.length} requests!`),o(),await c()}}async function c(){document.body.contains(a)&&(await t(),await s(),await n())}setTimeout(c,0),a.querySelector("#refresh-approvals").addEventListener("click",c);const p=a.querySelectorAll(".filter-btn");p.forEach(h=>{h.addEventListener("click",()=>{p.forEach(m=>{m.classList.remove("active"),m.style.background="transparent"}),h.classList.add("active"),h.style.background="white",s(h.dataset.filter)})}),a.querySelector("#delegate-btn").addEventListener("click",()=>{alert("Feature coming soon: Delegate Approvals")}),a.querySelector("#toggle-bulk-btn").addEventListener("click",l),a.querySelector("#bulk-approve-btn").addEventListener("click",d),a.querySelector("#clear-selection-btn").addEventListener("click",o);const u=()=>c();return window.addEventListener("approval-updated",u),a}function qi(a){const e=a.data||{};if(a.type==="leave"){const t=e.salaryImpact||e.salary_impact||{};return`
      <div><strong>Type:</strong> ${e.leaveType||e.leave_type||"Leave"}</div>
      <div><strong>Dates:</strong> ${e.startDate||e.start_date||"—"} to ${e.endDate||e.end_date||"—"} (${e.days||"?"} days)</div>
      <div><strong>Reason:</strong> ${e.reason||"Not specified"}</div>
      ${t.unpaidDays>0?`<div style="color: var(--danger); margin-top: 0.25rem;">⚠️ Salary Impact: ${t.unpaidDays} days loss of pay</div>`:""}
    `}else if(a.type==="attendance_correction")return`
      <div><strong>Date:</strong> ${e.date||"—"}</div>
      <div class="grid grid-2 gap-2 mt-1">
        <div>Current: ${e.currentInTime||e.current_in_time||"--"} - ${e.currentOutTime||e.current_out_time||"--"}</div>
        <div>Requested: <strong>${e.requestedInTime||e.requested_in_time||"--"} - ${e.requestedOutTime||e.requested_out_time||"--"}</strong></div>
      </div>
      <div class="mt-1"><strong>Reason:</strong> ${e.reason||"Not specified"}</div>
    `;return`<div>${a.description||""}</div>`}function Mi(a){switch(a){case"leave":return"#3b82f6";case"attendance_correction":return"#f59e0b";default:return"#6b7280"}}function Ui(a){return a==="leave"?"badge-primary":"badge-warning"}function ha(a){return a==="attendance_correction"?"Attendance":"Leave"}class Ni{constructor(){}async initializePerformance(){}async createGoal(e){const t={id:"GOAL"+Date.now(),employee_id:e.employeeId,title:e.title,description:e.description,category:e.category||"Professional",target_date:e.targetDate,weight:e.weight||25,progress:e.progress||0,status:"pending"},s=await v.insert("goals",t);return await this.logAction("goal_created",e.employeeId,`Created goal: ${t.title}`),{success:!0,goal:s?this._mapGoalToLegacy(s):t}}async getGoals(e){const t=e?{employee_id:e}:{};return(await v.getAll("goals",t)).map(n=>this._mapGoalToLegacy(n))}async updateGoal(e,t){const s={};t.title!==void 0&&(s.title=t.title),t.description!==void 0&&(s.description=t.description),t.category!==void 0&&(s.category=t.category),t.targetDate!==void 0&&(s.target_date=t.targetDate),t.weight!==void 0&&(s.weight=t.weight),t.progress!==void 0&&(s.progress=t.progress),t.status!==void 0&&(s.status=t.status),s.updated_at=new Date().toISOString();const n=await v.update("goals","id",e,s);return n?{success:!0,goal:this._mapGoalToLegacy(n)}:{success:!1,message:"Goal not found"}}async initiateReview(e,t){if((await v.getAll("performance_reviews",{employee_id:e,cycle_id:t})).length>0)return{success:!1,message:"Review already initiated for this cycle"};const n=await E.getEmployee(e);if(!n)return{success:!1,message:"Employee not found"};const r={id:"REV"+Date.now(),employee_id:e,employee_name:n.name,cycle_id:t,status:"in_self_assessment",template_id:"standard_dev",assessments:{self:null,manager:null},final_score:0,manager_comments:"",employee_comments:""};return await v.insert("performance_reviews",r),await Y.notify(e,"Appraisal Initiated 📈",`The ${t} appraisal cycle has started. Please submit your self-assessment.`,"info"),{success:!0,review:this._mapReviewToLegacy(r)}}async submitAssessment(e,t,s){const n=await v.getOne("performance_reviews","id",e);if(!n)return{success:!1,message:"Review not found"};const r={};return t==="self"?(n.assessments.self=s.ratings,r.assessments=n.assessments,r.employee_comments=s.comments,r.status="in_manager_assessment"):t==="manager"&&(n.assessments.manager=s.ratings,r.assessments=n.assessments,r.manager_comments=s.comments,r.status="completed",r.final_score=this._calculateFinalScoreFromRow(n),r.completed_at=new Date().toISOString()),await v.update("performance_reviews","id",e,r),{success:!0}}_calculateFinalScoreFromRow(e){const t=[{id:"tech_skills",weight:40},{id:"delivery",weight:30},{id:"soft_skills",weight:20},{id:"values",weight:10}];if(!e.assessments?.manager)return 0;let s=0;return t.forEach(n=>{const r=e.assessments.manager[n.id]||0;s+=r*(n.weight/100)}),parseFloat(s.toFixed(2))}async getReviews(e={}){const t={};return e.employeeId&&(t.employee_id=e.employeeId),e.status&&(t.status=e.status),e.cycleId&&(t.cycle_id=e.cycleId),(await v.getAll("performance_reviews",t)).map(n=>this._mapReviewToLegacy(n))}async getCycles(){return await v.getAll("performance_cycles")}async getPerformanceStats(e){const t=await this.getGoals(e),s=await this.getReviews({employeeId:e});return{totalGoals:t.length,completedGoals:t.filter(n=>n.status==="completed").length,avgProgress:t.length?t.reduce((n,r)=>n+r.progress,0)/t.length:0,latestReview:s.sort((n,r)=>new Date(r.initiatedAt)-new Date(n.initiatedAt))[0]||null}}async logAction(e,t,s){await S.logAudit(e,t,s)}_mapGoalToLegacy(e){return e?{id:e.id,employeeId:e.employee_id,title:e.title,description:e.description,category:e.category,targetDate:e.target_date,weight:e.weight,progress:e.progress,status:e.status,createdAt:e.created_at,updatedAt:e.updated_at}:null}_mapReviewToLegacy(e){return e?{id:e.id,employeeId:e.employee_id,employeeName:e.employee_name,cycleId:e.cycle_id,status:e.status,initiatedAt:e.initiated_at,templateId:e.template_id,assessments:e.assessments,finalScore:e.final_score,managerComments:e.manager_comments,employeeComments:e.employee_comments,completedAt:e.completed_at}:null}}const X=new Ni;function Hi(){const a=document.createElement("div");a.id="performance-dashboard-container";const e=S.getCurrentUser(),t=e.role==="hr_admin"||e.role==="super_admin";let s="goals";a.innerHTML=`
        <div class="page-header" style="background: linear-gradient(135deg, rgba(204, 255, 0, 0.1) 0%, rgba(5, 5, 5, 1) 100%); padding: 3rem 2rem; border-radius: 20px; border: 1px solid rgba(204, 255, 0, 0.1); margin-bottom: 2rem; position: relative; overflow: hidden;">
            <div style="position: relative; z-index: 2;">
                <h1 class="page-title" style="font-size: 2.5rem; margin-bottom: 0.5rem;">Performance & Goals</h1>
                <p class="page-subtitle" style="font-size: 1.1rem; max-width: 600px; color: var(--text-muted);">
                    Track your professional growth, manage goals, and review your performance appraisals.
                </p>
                <div class="mt-6 flex gap-3">
                    <button class="btn btn-primary" onclick="window.showAddGoalModal()">+ New Goal</button>
                    <button class="btn btn-secondary" onclick="window.viewReview('latest')">View Latest Review</button>
                </div>
            </div>
        </div>

        <div class="grid grid-3 mb-8" id="performance-stats">
            <!-- Stats loaded dynamically -->
        </div>

        <div class="card" style="padding: 0; overflow: hidden; background: var(--surface);">
            <div style="border-bottom: 1px solid var(--border); padding: 0 1rem;">
                <nav class="flex gap-6" id="performance-tabs">
                    <button class="tab-btn active" data-tab="goals" style="padding: 1.25rem 0.5rem; border-bottom: 3px solid var(--primary-lime); color: var(--text-main); font-weight: 600; background: none; cursor: pointer;">My Goals</button>
                    ${e.role==="manager"||t?'<button class="tab-btn" data-tab="team-goals" style="padding: 1.25rem 0.5rem; border-bottom: 3px solid transparent; color: var(--text-muted); font-weight: 500; background: none; cursor: pointer;">Team Goals</button>':""}
                    <button class="tab-btn" data-tab="reviews" style="padding: 1.25rem 0.5rem; border-bottom: 3px solid transparent; color: var(--text-muted); font-weight: 500; background: none; cursor: pointer;">Reviews & Appraisals</button>
                    ${t?'<button class="tab-btn" data-tab="admin" style="padding: 1.25rem 0.5rem; border-bottom: 3px solid transparent; color: var(--text-muted); font-weight: 500; background: none; cursor: pointer;">Admin Panel</button>':""}
                </nav>
            </div>
            
            <div id="performance-content" style="padding: 2rem;">
                <!-- Tab Content -->
            </div>
        </div>
    `;const n=a.querySelector("#performance-content"),r=a.querySelectorAll(".tab-btn");r.forEach(o=>{o.addEventListener("click",()=>{r.forEach(l=>{l.classList.remove("active"),l.style.borderBottomColor="transparent",l.style.color="var(--text-muted)"}),o.classList.add("active"),o.style.borderBottomColor="var(--primary-lime)",o.style.color="var(--text-main)",s=o.dataset.tab,ma(s,n,e)})});const i=()=>{document.body.contains(a)&&(Bi(a,e.userId),ma(s,n,e))};return i(),window.addEventListener("performance-updated",i),a}async function Bi(a,e){const t=await X.getPerformanceStats(e),s=a.querySelector("#performance-stats");s.innerHTML=`
        <div class="card stat-card hover-reveal" style="display: flex; align-items: center; gap: 1.5rem; padding: 1.5rem;">
            <div style="width: 60px; height: 60px; border-radius: 50%; background: rgba(34, 197, 94, 0.1); color: #22c55e; display: flex; align-items: center; justify-content: center; font-size: 1.75rem;">
                
            </div>
            <div>
                <div class="stat-value" style="font-size: 2rem; font-weight: 700;">${t.totalGoals}</div>
                <div class="stat-label text-muted">Active Goals</div>
            </div>
        </div>
        
        <div class="card stat-card hover-reveal" style="display: flex; align-items: center; gap: 1.5rem; padding: 1.5rem;">
            <div style="width: 60px; height: 60px; border-radius: 50%; background: rgba(59, 130, 246, 0.1); color: #3b82f6; display: flex; align-items: center; justify-content: center; font-size: 1.75rem;">
                
            </div>
            <div>
                <div class="stat-value" style="font-size: 2rem; font-weight: 700;">${Math.round(t.avgProgress)}%</div>
                <div class="stat-label text-muted">Avg. Progress</div>
            </div>
        </div>

        <div class="card stat-card hover-reveal" style="display: flex; align-items: center; gap: 1.5rem; padding: 1.5rem;">
            <div style="width: 60px; height: 60px; border-radius: 50%; background: rgba(168, 85, 247, 0.1); color: #a855f7; display: flex; align-items: center; justify-content: center; font-size: 1.75rem;">
                
            </div>
            <div>
                <div class="stat-value" style="font-size: 2rem; font-weight: 700;">${t.latestReview?t.latestReview.finalScore:"N/A"}<span style="font-size: 1rem; color: var(--text-muted); font-weight: 400;">/5</span></div>
                <div class="stat-label text-muted">Latest Rating</div>
            </div>
        </div>
    `}async function ma(a,e,t,s){e.innerHTML='<div class="fade-in-up">Loading...</div>',e.innerHTML="",a==="goals"?await Fi(e,t.userId):a==="team-goals"?await zi(e,t.userId):a==="reviews"?await Vi(e,t):a==="admin"&&await Yi(e)}async function zi(a,e){const t=await E.getEmployees(),s=t.find(i=>i.id===e),n=t.filter(i=>i.manager===s?.name&&i.id!==e);if(n.length===0){a.innerHTML=`
            <div class="text-center py-12">
                <h3 class="mt-4 text-xl font-bold">No Team Members</h3>
                <p class="text-muted">You don't have any direct reports assigned to you.</p>
            </div>
        `;return}const r=(await Promise.all(n.map(async i=>{const o=await X.getGoals(i.id),l=o.length>0?o.reduce((d,c)=>d+c.progress,0)/o.length:0;return`
            <div class="card hover-reveal" style="border: 1px solid var(--border);">
                <div class="flex items-center gap-4 mb-4">
                    <div class="avatar" style="width: 48px; height: 48px; background: var(--primary-gradient); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.2rem; color: white;">
                        ${i.name.charAt(0)}
                    </div>
                    <div>
                        <h4 class="font-bold text-lg">${i.name}</h4>
                        <div class="text-sm text-muted">${i.designation}</div>
                    </div>
                    <div class="ml-auto text-right">
                        <div class="text-2xl font-bold ${l>=75?"text-success":l>=50?"text-warning":"text-danger"}">${Math.round(l)}%</div>
                        <div class="text-xs text-muted">Avg. Progress</div>
                    </div>
                </div>
                
                <div class="space-y-3">
                    <h5 class="text-xs uppercase font-bold text-muted tracking-wider">Active Goals (${o.length})</h5>
                    ${o.length===0?'<div class="text-sm text-muted italic">No goals set</div>':o.slice(0,3).map(d=>`
                            <div class="flex flex-col gap-1">
                                <div class="flex justify-between text-xs">
                                    <span>${d.title}</span>
                                    <span class="font-bold">${d.progress}%</span>
                                </div>
                                <div class="progress-bar-sm" style="height: 4px; background: var(--bg-secondary); border-radius: 2px;">
                                    <div style="width: ${d.progress}%; height: 100%; background: ${d.progress>=100?"var(--success)":"var(--primary-lime)"}; border-radius: 2px;"></div>
                                </div>
                            </div>
                        `).join("")}
                    ${o.length>3?`<div class="text-xs text-center text-primary cursor-pointer hover:underline">+${o.length-3} more goals</div>`:""}
                </div>

                <div class="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                    <button class="btn btn-sm btn-secondary" onclick="toast.info('Viewing details for ${i.name}')">View Full Profile</button>
                </div>
            </div>
        `}))).join("");a.innerHTML=`
        <div class="flex justify-between items-center mb-6">
            <h3 class="text-lg font-bold">Team Performance Overview</h3>
            <div class="flex gap-2">
                <span class="badge badge-primary">${n.length} Members</span>
            </div>
        </div>
        <div class="grid grid-2 gap-6">
            ${r}
        </div>
    `}async function Fi(a,e){const t=await X.getGoals(e);a.innerHTML=`
        <div class="flex justify-between items-center mb-6">
            <div>
                <h3 class="card-title">My Performance Goals</h3>
                <p class="text-sm text-muted">Track your progress towards key objectives</p>
            </div>
            <button class="btn btn-primary" onclick="window.showAddGoalModal()">
                <span style="font-size: 1.2rem; margin-right: 0.5rem;">+</span> Add New Goal
            </button>
        </div>

        ${t.length===0?`
            <div class="card text-center p-8">
                <h3>No Goals Set Yet</h3>
                <p class="text-muted mb-4">Set clear goals to track your professional growth and achievements.</p>
                <button class="btn btn-primary" onclick="window.showAddGoalModal()">Create First Goal</button>
            </div>
        `:`
            <div class="grid grid-2 gap-4">
                ${t.map(s=>{const n=Gi(s),r=Wi(n);return`
                    <div class="card goal-card" style="border-top: 4px solid ${r}; position: relative;">
                        <div class="flex justify-between items-start mb-3">
                            <div>
                                <h4 class="font-bold text-lg mb-1">${s.title}</h4>
                                <span class="badge" style="background: ${r}20; color: ${r};">
                                    ${n}
                                </span>
                            </div>
                            <div class="text-right">
                                <span class="text-xs text-muted block">Due Date</span>
                                <span class="font-medium text-sm">${new Date(s.targetDate).toLocaleDateString()}</span>
                            </div>
                        </div>
                        
                        <p class="text-sm text-muted mb-4" style="min-height: 40px;">${s.description||"No description provided."}</p>
                        
                        <div class="mb-4">
                            <div class="flex justify-between text-xs mb-1">
                                <span>Progress</span>
                                <span class="font-bold">${s.progress}%</span>
                            </div>
                            <div class="progress-bar" style="height: 8px; background: var(--bg-secondary); border-radius: 4px; overflow: hidden;">
                                <div class="progress" style="width: ${s.progress}%; background: ${r}; height: 100%; transition: width 0.3s ease;"></div>
                            </div>
                            <input type="range" class="w-full mt-2" value="${s.progress}" min="0" max="100" 
                                onchange="window.updateGoalProgress('${s.id}', this.value)"
                                style="cursor: pointer;">
                        </div>
                        <div class="flex justify-between items-center pt-3 border-t border-gray-100 text-xs text-muted">
                            <div class="flex gap-3">
                                <span>${s.category}</span>
                                <span>Weight: ${s.weight}%</span>
                            </div>
                            <button class="btn-text" style="color: var(--primary-lime);" onclick="window.editGoal('${s.id}')">Edit</button>
                        </div>
                    </div>
                `}).join("")}
            </div>
    `}
    `}function Gi(a){if(a.progress>=100)return"Completed";const e=new Date,t=new Date(a.targetDate);return e>t?"Overdue":a.progress>0?"In Progress":"Not Started"}function Wi(a){switch(a){case"Completed":return"#10b981";case"Overdue":return"#ef4444";case"In Progress":return"#3b82f6";default:return"#9ca3af"}}async function Vi(a,e){const t=await X.getReviews({employeeId:e.userId}),s=await X.getCycles();a.innerHTML=`
        <div class="mb-6">
            <h3 class="card-title">Appraisal Records</h3>
            <p class="text-sm text-muted">View your performance review history and active cycles</p>
        </div>

        ${t.length===0?`
            <div class="card text-center p-8">
                <div style="font-size: 3rem; margin-bottom: 1rem;">📋</div>
                <h3>No Appraisals Found</h3>
                <p class="text-muted">You have no active or past performance reviews.</p>
            </div>
        `:`
            <div class="space-y-4">
                ${t.map(n=>{const r=s.find(o=>o.id===n.cycleId);return`
                    <div class="card review-card hover-reveal" style="border-left: 4px solid var(--primary-lime);">
                        <div class="flex justify-between items-start mb-4">
                            <div>
                                <h4 class="font-bold text-lg">${r?r.name:n.cycleId}</h4>
                                <div class="text-xs text-muted">Cycle ID: ${n.id}</div>
                            </div>
                            <div class="text-right">
                                ${n.finalScore?`
                                    <div class="text-2xl font-bold text-primary-lime">${n.finalScore}<span class="text-sm text-muted">/5</span></div>
                                    <div class="text-xs text-muted">Final Score</div>
                                `:`
                                    <span class="badge ${Xi(n.status)}">${Ji(n.status)}</span>
                                `}
                            </div>
                        </div>

                        <!-- Process Stepper -->
                        <div class="mb-4">
                            ${Ki(n.status)}
                        </div>

                        <div class="flex justify-between items-center pt-3 border-t border-gray-100">
                             <div class="text-sm text-muted">
                                ${n.managerName?`Manager: <strong>${n.managerName}</strong>`:""}
                             </div>
                             <div>
                                ${n.status==="in_self_assessment"?`<button class="btn btn-primary btn-sm" onclick="window.takeAssessment('${n.id}', 'self')">Start Self Assessment</button>`:`<button class="btn btn-secondary btn-sm" onclick="window.viewReview('${n.id}')">View Details</button>`}
                             </div>
                        </div>
                    </div>
                `}).join("")}
            </div>
        `}
    `}function Ki(a){const e=[{key:"initiated",label:"Started"},{key:"in_self_assessment",label:"Self Review"},{key:"in_manager_assessment",label:"Manager Review"},{key:"completed",label:"Completed"}];let t=e.findIndex(s=>s.key===a);return t===-1&&a==="completed"&&(t=3),a==="initiated"&&(t=0),a==="in_self_assessment"&&(t=1),a==="in_manager_assessment"&&(t=2),a==="completed"&&(t=3),`
        <div class="flex items-center justify-between relative mt-2 mb-2">
            <!-- Line -->
            <div style="position: absolute; top: 10px; left: 0; right: 0; height: 2px; background: var(--bg-secondary); z-index: 1;"></div>
            <div style="position: absolute; top: 10px; left: 0; right: 0; height: 2px; background: var(--primary-lime); z-index: 1; width: ${t/3*100}%;"></div>

            ${e.map((s,n)=>{const r=n<=t,i=n===t;return`
                    <div class="flex flex-col items-center relative" style="z-index: 2;">
                        <div style="width: 20px; height: 20px; border-radius: 50%; background: ${r?"var(--primary-lime)":"var(--bg-secondary)"}; border: 2px solid ${r?"var(--primary-lime)":"var(--border)"}; display: flex; align-items: center; justify-content: center; margin-bottom: 4px;">
                            ${r?'<span style="font-size: 10px; color: black;">✓</span>':""}
                        </div>
                        <span style="font-size: 0.7rem; color: ${i?"var(--text-main)":"var(--text-muted)"}; font-weight: ${i?"bold":"normal"};">${s.label}</span>
                    </div>
                `}).join("")}
        </div>
    `}function Ji(a){return a.split("_").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" ")}async function Yi(a){const e=await X.getCycles(),t=await X.getReviews();a.innerHTML=`
        <div class="grid grid-2 gap-4">
            <div class="card">
                <h3>Cycle Management</h3>
                <div class="mt-4">
                    ${e.map(s=>`
                        <div class="mb-3 p-3 rounded" style="background: var(--bg-secondary);">
                            <div class="font-medium">${s.name}</div>
                            <div class="text-xs text-muted">Status: ${s.status} | End: ${s.endDate}</div>
                            <button class="btn btn-sm btn-secondary mt-2" onclick="window.initiateCycle('${s.id}')">Bulk Initiate</button>
                        </div>
                    `).join("")}
                </div>
            </div>
            <div class="card">
                <h3>Manager Reviews Pending</h3>
                <div class="mt-4">
                    ${t.filter(s=>s.status==="in_manager_assessment").map(s=>`
                        <div class="mb-2 p-2 border-b flex justify-between items-center text-sm">
                            <span>${s.employeeName}</span>
                            <button class="btn btn-sm btn-primary" onclick="window.takeAssessment('${s.id}', 'manager')">Complete Review</button>
                        </div>
                    `).join("")||'<p class="text-muted">No pending manager assessments.</p>'}
                </div>
            </div>
        </div>
    `}function Xi(a){switch(a){case"completed":return"badge-success";case"in_self_assessment":return"badge-primary";case"in_manager_assessment":return"badge-warning";default:return"badge-secondary"}}window.showAddGoalModal=async()=>{const a=prompt("Goal Title:");if(!a)return;const e=prompt("Goal Description:"),t=prompt("Target Date (YYYY-MM-DD):","2025-06-30");await X.createGoal({employeeId:S.getCurrentUser().userId,title:a,description:e,targetDate:t}),window.dispatchEvent(new Event("performance-updated"))};window.updateGoalProgress=async(a,e)=>{await X.updateGoal(a,{progress:parseInt(e)}),window.dispatchEvent(new Event("performance-updated"))};window.initiateCycle=async a=>{const e=await E.getEmployees({status:"active"});let t=0;for(const s of e)(await X.initiateReview(s.id,a)).success&&t++;alert(`Initiated ${t} reviews!`),window.dispatchEvent(new Event("performance-updated"))};window.takeAssessment=async(a,e)=>{const t=prompt("Enter Rating (1-5):","4"),s=prompt("Enter Comments:");if(t){const n={tech_skills:parseInt(t),delivery:parseInt(t),soft_skills:parseInt(t),values:parseInt(t)};await X.submitAssessment(a,e,{ratings:n,comments:s}),alert("Assessment submitted!"),window.dispatchEvent(new Event("performance-updated"))}};window.viewReview=async a=>{const t=(await X.getReviews()).find(s=>s.id===a);if(!t){alert("Review not found");return}alert(`
        Review Status: ${t.status}
        Final Score: ${t.finalScore||"Pending"} / 5
        Self Comments: ${t.employeeComments||"-"}
        Manager Comments: ${t.managerComments||"-"}
    `)};class Qi{constructor(){}async initializeExitModule(){}async getExitReasons(){return await v.getAll("exit_reasons")}async getClearanceCheckpoints(){return await v.getAll("clearance_checkpoints")}async initiateExit(e){const t=await E.getEmployee(e.employeeId);if(!t)return{success:!1,message:"Employee not found"};if((await v.getAll("employee_exits",{employee_id:e.employeeId})).find(p=>["pending_approval","approved","in_clearance"].includes(p.status)))return{success:!1,message:"An active exit request already exists"};const r=t.noticePeriod||30,i=new Date;i.setDate(i.getDate()+r);const o=await this.getClearanceCheckpoints(),l={};o.forEach(p=>{l[p.id]={department:p.department,items:p.items.map(u=>({name:u,cleared:!1,clearedBy:null,clearedOn:null})),completed:!1}});const d=await v.getAll("employee_exits"),c={id:"EXIT"+String(d.length+1).padStart(4,"0"),employee_id:e.employeeId,employee_name:t.name,resignation_date:new Date().toISOString(),requested_lwd:e.requestedLWD||i.toISOString().split("T")[0],reason:e.reason,personal_email:e.personalEmail,status:"pending_approval",clearance:l,fnf:null,comments:e.comments||""};return await v.insert("employee_exits",c),await Y.broadcast("Employee Resignation",`${t.name} has submitted their resignation.`,"warning"),await this.logAction("exit_initiated",`Exit initiated for ${t.name}`),{success:!0,exit:this._mapToLegacy(c)}}async approveExit(e,t,s=""){const n=await v.getOne("employee_exits","id",e);if(!n)return{success:!1,message:"Exit request not found"};await v.update("employee_exits","id",e,{status:"approved",approver_comments:s,approval_date:new Date().toISOString()}),await E.updateStatus(n.employee_id,"notice_period",new Date().toISOString().split("T")[0],"Resignation approved"),await Y.notify(n.employee_id,"Resignation Approved","Your resignation has been approved. Clearance process will begin.","info"),await this.logAction("exit_approved",`Exit approved for ${n.employee_name}`);const r=await v.getOne("employee_exits","id",e);return{success:!0,exit:this._mapToLegacy(r)}}async rejectExit(e,t,s){const n=await v.getOne("employee_exits","id",e);if(!n)return{success:!1,message:"Exit request not found"};await v.update("employee_exits","id",e,{status:"rejected",approver_comments:s,approval_date:new Date().toISOString()}),await Y.notify(n.employee_id,"Resignation Rejected",`Your resignation request has been rejected. Reason: ${s}`,"info"),await this.logAction("exit_rejected",`Exit rejected for ${n.employee_name}`);const r=await v.getOne("employee_exits","id",e);return{success:!0,exit:this._mapToLegacy(r)}}async updateClearance(e,t,s,n,r){const i=await v.getOne("employee_exits","id",e);if(!i)return{success:!1,message:"Exit request not found"};const o=i.clearance||{};if(!o[t])return{success:!1,message:"Department not found in clearance"};o[t].items[s].cleared=n,o[t].items[s].clearedBy=r,o[t].items[s].clearedOn=new Date().toISOString(),o[t].completed=o[t].items.every(c=>c.cleared);const l=Object.values(o).every(c=>c.completed),d=l?"in_fnf":i.status;return await v.update("employee_exits","id",e,{clearance:o,status:d}),l&&await Y.notify(i.employee_id,"Clearance Complete ✅","All clearance departments have been completed. F&F processing will begin.","success"),{success:!0}}async calculateFnF(e){const t=await v.getOne("employee_exits","id",e);if(!t)return{success:!1,message:"Exit request not found"};const s=await E.getEmployee(t.employee_id);if(!s)return{success:!1,message:"Employee not found"};const n=s.salaryStructure||{gross:s.monthlyCTC||0,basic:0},r=await N.getLeaveBalance(t.employee_id),i=n.gross/30;t.requested_lwd&&new Date(t.requested_lwd);const o=new Date,l=Math.ceil((o-new Date(o.getFullYear(),o.getMonth(),1))/(1e3*60*60*24)),d=Math.round(i*l),c=r?.pl?.remaining?Math.round(r.pl.remaining*i):0,p=this.calculateGratuity(s),u=0,h=n.pf||Math.round(n.basic*.12)||0,m=0,g=0,y=0,f=d+c+p+u,_=h+m+g+y,b=f-_,k={earnings:{earnedSalary:d,leaveEncashment:c,gratuity:p,bonus:u},deductions:{pf:h,tax:m,noticePayRecovery:g,otherDeductions:y},totalEarnings:f,totalDeductions:_,netPayable:b,calculatedOn:new Date().toISOString()};return await v.update("employee_exits","id",e,{fnf:k,status:"in_fnf"}),{success:!0,fnf:k}}calculateGratuity(e){const t=new Date(e.joiningDate),s=(new Date-t)/(1e3*60*60*24*365.25);if(s<5)return 0;const n=e.salaryStructure?.basic||0;return Math.round(n*15*Math.floor(s)/26)}async completeExit(e){const t=await v.getOne("employee_exits","id",e);if(!t)return{success:!1,message:"Exit request not found"};await v.update("employee_exits","id",e,{status:"completed",completed_at:new Date().toISOString()}),await E.updateStatus(t.employee_id,"exited",new Date().toISOString().split("T")[0],"Exit completed"),await this.logAction("exit_completed",`Exit completed for ${t.employee_name}`);const s=await v.getOne("employee_exits","id",e);return{success:!0,exit:this._mapToLegacy(s)}}async getExits(e={}){const t={};return e.employeeId&&(t.employee_id=e.employeeId),e.status&&(t.status=e.status),(await v.getAll("employee_exits",t)).map(n=>this._mapToLegacy(n))}async getExit(e){const t=await v.getOne("employee_exits","id",e);return t?this._mapToLegacy(t):null}async logAction(e,t){const s=S.getCurrentUser();s&&await S.logAudit(e,s.userId,t)}_mapToLegacy(e){return e?{id:e.id,employeeId:e.employee_id,employeeName:e.employee_name,resignationDate:e.resignation_date,requestedLWD:e.requested_lwd,reason:e.reason,personalEmail:e.personal_email,status:e.status,clearance:e.clearance,fnf:e.fnf,comments:e.comments,approverComments:e.approver_comments,approvalDate:e.approval_date,completedAt:e.completed_at}:null}}const ae=new Qi;function Zi(){const a=document.createElement("div");a.id="exit-dashboard-container",a.innerHTML=`
        <div class="page-header">
            <h1 class="page-title">Exit & Separations</h1>
            <p class="page-subtitle">Manage resignation workflows and Full & Final settlements</p>
        </div>
        <div id="exit-main-container" style="display: flex; justify-content: center; padding: 3rem;">
            <div class="text-muted">Loading exit details...</div>
        </div>
    `;const e=async()=>{const l=S.getCurrentUser();if(!l){a.innerHTML='<div class="alert alert-error">Please login first</div>';return}const d=l.role==="hr_admin"||l.role==="super_admin";let c=null;try{const p=ae.getExits(),u=new Promise((y,f)=>setTimeout(()=>f(new Error("Request timed out")),5e3));c=(await Promise.race([p,u]).catch(y=>(console.warn("Exit fetch warning:",y),[]))).find(y=>y.employeeId===l.userId&&["pending_approval","approved","in_clearance","notice_period"].includes(y.status))||null,console.log("Exit Dashboard State:",{role:l.role,foundExit:!!c});const m=d?await to():eo(c,l),g=a.querySelector("#exit-main-container");g&&(g.innerHTML=m,g.style.display="block",g.style.padding="0")}catch(p){console.error("Critical Error in Exit Dashboard:",p);const u=a.querySelector("#exit-main-container");u&&(u.innerHTML=`<div class="alert alert-danger">Error loading dashboard: ${p.message}</div>`)}setTimeout(()=>{if(!d&&!c){const u=a.querySelector("#resignation-form");u&&u.addEventListener("submit",async h=>{h.preventDefault(),await s(u,l.userId)})}a.querySelectorAll(".approve-exit-btn").forEach(u=>{u.addEventListener("click",()=>r(u.dataset.id,"approved"))}),a.querySelectorAll(".reject-exit-btn").forEach(u=>{u.addEventListener("click",()=>r(u.dataset.id,"rejected"))}),a.querySelectorAll(".clearance-btn").forEach(u=>{u.addEventListener("click",()=>i(u.dataset.id))}),a.querySelectorAll(".fnf-btn").forEach(u=>{u.addEventListener("click",()=>o(u.dataset.id))});const p=a.querySelector("#withdraw-btn");p&&p.addEventListener("click",()=>n(p.dataset.id))},0)};e();const t=()=>{document.body.contains(a)&&e()};window.addEventListener("exit-updated",t);async function s(l,d){const c=l.querySelector('button[type="submit"]'),p=c.textContent;c.textContent="Submitting...",c.disabled=!0;const u={employeeId:d,reason:l.querySelector("#reason").value,requestedLWD:l.querySelector("#requested-lwd").value,personalEmail:l.querySelector("#personal-email").value,comments:l.querySelector("#comments").value};console.log("Submitting resignation with data:",u);try{const h=await ae.initiateExit(u);console.log("Resignation result:",h),h.success?(alert("Resignation submitted successfully."),window.dispatchEvent(new Event("exit-updated"))):(alert(h.message||"Failed to submit resignation."),c.textContent=p,c.disabled=!1)}catch(h){console.error("Resignation submission error:",h),alert("Error submitting resignation: "+h.message),c.textContent=p,c.disabled=!1}}async function n(l){if(confirm("Are you sure you want to withdraw your resignation?"))try{(await ae.rejectExit(l,S.getCurrentUser().userId,"User withdrew resignation")).success&&(alert("Resignation withdrawn successfully."),window.dispatchEvent(new Event("exit-updated")))}catch(d){alert("Error withdrawing resignation: "+d.message)}}async function r(l,d){const c=prompt("Any comments for the employee?")||"";try{let p;d==="approved"?p=await ae.approveExit(l,S.getCurrentUser().userId,c):p=await ae.rejectExit(l,S.getCurrentUser().userId,c),p.success&&(alert(`Exit request ${d}.`),window.dispatchEvent(new Event("exit-updated")))}catch(p){alert("Error processing exit: "+p.message)}}async function i(l){try{const c=(await ae.getExits()).find(h=>h.id===l);if(!c||!c.clearance){alert("Exit record not found.");return}let p='<h3 class="mb-4">Clearance Status</h3><div style="display: flex; flex-direction: column; gap: 1rem;">';Object.entries(c.clearance).forEach(([h,m])=>{const g=m.completed||m.status==="cleared";p+=`<div class="p-3 rounded" style="border: 1px solid var(--border); background: var(--bg-secondary);">
                            <strong>${m.department||h}</strong> - ${g?"✅ Cleared":"⏳ Pending"}
                            <div style="margin-top: 0.5rem; font-size: 0.8rem;">
                                ${(m.items||[]).map((y,f)=>`
                                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.25rem 0;">
                                        <span>${y.name}</span>
                                        <input type="checkbox" ${y.cleared||y.status==="cleared"?"checked":""} 
                                            class="clearance-item-cb" data-exit="${l}" data-dept="${h}" data-idx="${f}">
                                    </div>
                                `).join("")}
                            </div>
                        </div>`}),p+='<button class="btn btn-secondary w-full" id="close-clearance-modal">Close</button></div>';const u=document.createElement("div");u.className="modal-backdrop",u.style.cssText="position: fixed; inset: 0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 9999;",u.innerHTML=`<div class="card" style="max-width: 500px; width: 90%; max-height: 80vh; overflow-y: auto;">${p}</div>`,document.body.appendChild(u),u.querySelectorAll(".clearance-item-cb").forEach(h=>{h.addEventListener("change",async()=>{const m=h.checked?"cleared":"pending",g=S.getCurrentUser();try{await ae.updateClearance(h.dataset.exit,h.dataset.dept,parseInt(h.dataset.idx),h.checked,g.name||g.userId)}catch(y){console.error("Error updating clearance:",y)}})}),u.querySelector("#close-clearance-modal").addEventListener("click",()=>{u.remove(),window.dispatchEvent(new Event("exit-updated"))}),u.addEventListener("click",h=>{h.target===u&&(u.remove(),window.dispatchEvent(new Event("exit-updated")))})}catch(d){alert("Error loading clearance: "+d.message)}}async function o(l){try{const d=await ae.calculateFnF(l);d?(alert(`FnF calculated. Net Payable: ₹${d.netFnF?.toLocaleString()||"N/A"}`),confirm("Directly complete exit and update employee status to EXITED?")&&await ae.completeExit(l),window.dispatchEvent(new Event("exit-updated"))):alert("Unable to calculate FnF.")}catch(d){alert("Error calculating FnF: "+d.message)}}return a}function eo(a,e){if(!a)return`
            <div class="card" style="max-width: 600px;">
                <h3 class="mb-4">Submit Resignation</h3>
                <form id="resignation-form">
                    <div class="form-group">
                        <label>Reason for Leaving</label>
                        <select id="reason" required>
                            <option value="">Select a reason</option>
                            <option>Better Opportunity</option>
                            <option>Personal Reasons</option>
                            <option>Higher Studies</option>
                            <option>Relocation</option>
                            <option>Health Reasons</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Requested Last Working Day</label>
                        <input type="date" id="requested-lwd" required min="${new Date().toISOString().split("T")[0]}">
                    </div>
                    <div class="form-group">
                        <label>Personal Email (for FnF communication)</label>
                        <input type="email" id="personal-email" placeholder="e.g. john.doe@gmail.com" required>
                    </div>
                    <div class="form-group">
                        <label>Additional Comments</label>
                        <textarea id="comments" rows="3" placeholder="Explain further..."></textarea>
                    </div>
                    <div class="alert alert-warning text-sm mb-4" style="background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.2); color: var(--warning);">
                        <strong>Note:</strong> Your notice period as per policy is 30 days. 
                        Final LWD will be subject to management approval.
                    </div>
                    <button type="submit" class="btn btn-danger w-full">Submit Resignation</button>
                </form>
            </div>
        `;const t=a.clearance?Object.entries(a.clearance).map(([s,n])=>`
        <div class="flex justify-between items-center p-3 mb-2 rounded" style="border: 1px solid var(--border);">
            <span>${n.department||s}</span>
            <span class="badge ${n.completed?"badge-success":"badge-warning"}">${n.completed?"Cleared":"Pending"}</span>
        </div>
    `).join(""):'<p class="text-muted">No clearance data available</p>';return`
        <div class="grid grid-2 gap-6">
            <div class="card">
                <h3>Resignation Status</h3>
                <div class="mt-4 p-4 rounded" style="background: var(--bg-secondary);">
                    <div class="flex justify-between items-center mb-2">
                        <span class="text-sm text-muted">Current Status:</span>
                        <span class="badge ${ao(a.status)}">${(a.status||"").replace(/_/g," ").toUpperCase()}</span>
                    </div>
                    <div class="flex justify-between items-center mb-2">
                        <span class="text-sm text-muted">LWD:</span>
                        <span class="font-medium">${a.requestedLWD||"—"}</span>
                    </div>
                    <div class="text-xs text-muted mt-2">Submitted on: ${a.resignationDate?new Date(a.resignationDate).toLocaleDateString():"—"}</div>
                </div>

                ${a.status==="pending_approval"?`
                    <button class="btn btn-sm btn-secondary w-full mt-4" id="withdraw-btn" data-id="${a.id}">Withdraw Resignation</button>
                `:""}

                <h3 class="mt-6 mb-4">Department Clearance</h3>
                <div class="clearance-list">
                    ${t}
                </div>
            </div>

            <div class="card">
                <h3>FnF Settlement Detail</h3>
                ${a.status==="completed"&&a.fnf?`
                    <div class="mt-4">
                        <div class="p-4 rounded text-center mb-4" style="background: rgba(204, 255, 0, 0.1);">
                            <div class="text-sm">Net Payable Amount</div>
                            <div style="font-size: 2rem; font-weight: bold; color: var(--primary);">₹${(a.fnf.netFnF||0).toLocaleString()}</div>
                        </div>
                        <div class="text-sm" style="display: flex; flex-direction: column; gap: 0.5rem;">
                            <div class="flex justify-between"><span>Unpaid Days Salary:</span> <span>₹${(a.fnf.unpaidSalary||0).toLocaleString()}</span></div>
                            <div class="flex justify-between"><span>Leave Encashment:</span> <span>₹${(a.fnf.leaveEncashment||0).toLocaleString()}</span></div>
                            <div class="flex justify-between font-bold" style="border-top: 1px solid var(--border); padding-top: 0.5rem;"><span>Total Earnings:</span> <span>₹${(a.fnf.totalEarnings||0).toLocaleString()}</span></div>
                        </div>
                    </div>
                `:`
                    <div class="text-center p-4 text-muted" style="padding: 2rem;">
                        <div style="font-size: 3rem;">💰</div>
                        <p>FnF details will be visible once clearance is completed and management approves the final amount.</p>
                    </div>
                `}
            </div>
        </div>
    `}async function to(){let a=[];try{a=await ae.getExits()}catch(s){console.error("Error loading exits:",s)}const e=a.filter(s=>s.status==="pending_approval"),t=a.filter(s=>s.status==="approved");return`
        <div class="grid" style="grid-template-columns: 2fr 1fr; gap: 1.5rem;">
            <div class="card" style="grid-column: span 1;">
                <h3>Pending Resignations</h3>
                <div class="table-container mt-4">
                    <table>
                        <thead>
                            <tr>
                                <th>Employee</th>
                                <th>LWD</th>
                                <th>Reason</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${e.length===0?'<tr><td colspan="4" class="text-center p-4 text-muted">No pending requests</td></tr>':""}
                            ${e.map(s=>`
                                <tr>
                                    <td>${s.employeeName||"—"}</td>
                                    <td>${s.requestedLWD||"—"}</td>
                                    <td class="text-xs">${s.reason||"—"}</td>
                                    <td>
                                        <button class="btn btn-sm btn-success approve-exit-btn" data-id="${s.id}">Approve</button>
                                        <button class="btn btn-sm btn-danger reject-exit-btn" data-id="${s.id}">Reject</button>
                                    </td>
                                </tr>
                            `).join("")}
                        </tbody>
                    </table>
                </div>

                <h3 class="mt-8">Clearance & FnF Management</h3>
                <div class="table-container mt-4">
                    <table>
                        <thead>
                            <tr>
                                <th>Employee</th>
                                <th>Clearance Status</th>
                                <th>FnF Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${t.length===0?'<tr><td colspan="4" class="text-center p-4 text-muted">No exit processes in progress</td></tr>':""}
                            ${t.map(s=>{const n=s.clearance?Object.values(s.clearance):[],r=n.filter(o=>o.completed||o.status==="cleared").length,i=n.length||1;return`
                                    <tr>
                                        <td>${s.employeeName||"—"}</td>
                                        <td>
                                            <div class="text-xs">${r}/${i} Cleared</div>
                                            <div style="height: 4px; background: var(--bg-secondary); border-radius: 2px; margin-top: 4px; overflow: hidden;">
                                                <div style="height: 100%; width: ${r/i*100}%; background: var(--primary); border-radius: 2px;"></div>
                                            </div>
                                        </td>
                                        <td>${s.fnf?"Calculated":"Pending"}</td>
                                        <td>
                                            <button class="btn btn-sm btn-secondary clearance-btn" data-id="${s.id}">Update Clearance</button>
                                            <button class="btn btn-sm btn-primary fnf-btn" data-id="${s.id}">Calc FnF</button>
                                        </td>
                                    </tr>
                                `}).join("")}
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="card">
                <h3>Quick Stats</h3>
                <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
                    <div class="p-4 rounded" style="border-left: 4px solid var(--warning); background: var(--bg-secondary);">
                        <div style="font-size: 1.5rem; font-weight: bold;">${e.length}</div>
                        <div class="text-sm text-muted">Pending Resignations</div>
                    </div>
                    <div class="p-4 rounded" style="border-left: 4px solid var(--primary); background: var(--bg-secondary);">
                        <div style="font-size: 1.5rem; font-weight: bold;">${t.length}</div>
                        <div class="text-sm text-muted">In Clearance Stage</div>
                    </div>
                    <div class="p-4 rounded" style="border-left: 4px solid var(--success); background: var(--bg-secondary);">
                        <div style="font-size: 1.5rem; font-weight: bold;">${a.filter(s=>s.status==="completed").length}</div>
                        <div class="text-sm text-muted">Completed Exits</div>
                    </div>
                </div>
            </div>
        </div>
    `}function ao(a){return a==="completed"?"badge-success":a==="approved"?"badge-primary":a==="rejected"||a==="cancelled"?"badge-danger":"badge-warning"}class so{constructor(){}async getHeadcountReport(){const e=await E.getEmployees(),t=e.filter(l=>l.status==="active"),s={};t.forEach(l=>{const d=l.department||"Unassigned";s[d]=(s[d]||0)+1});const n={};t.forEach(l=>{const d=l.gender||"Not Specified";n[d]=(n[d]||0)+1});const r=new Date;r.setDate(r.getDate()-30);const i=t.filter(l=>l.joiningDate&&new Date(l.joiningDate)>r).length,o=e.filter(l=>l.status==="exited"&&l.exitDate&&new Date(l.exitDate)>r);return{totalActive:t.length,totalExited:e.filter(l=>l.status==="exited").length,totalDraft:e.filter(l=>l.status==="draft").length,noticePeriod:e.filter(l=>l.status==="notice_period").length,newJoinees:i,exitedRecently:o.length,departmentDistribution:s,genderDistribution:n,attritionRate:e.length>0?Math.round(o.length/e.length*100):0}}async getAttendanceReport(e,t){const s=await E.getEmployees({status:"active"}),n={employees:[],summary:{avgPresent:0,avgAbsent:0,avgLate:0,avgWorkingHours:0,mostLateEmployee:null,bestAttendanceEmployee:null}};let r=0,i=0,o=0,l=0,d=0,c=0;for(const u of s){const h=await G.getAttendanceSummary(u.id,e,t),m={employeeId:u.id,employeeName:u.name,department:u.department,...h};n.employees.push(m),r+=h.present,i+=h.absent,o+=h.late,l+=h.totalWorkingHours,h.late>d&&(d=h.late,n.summary.mostLateEmployee={name:u.name,lateDays:h.late}),h.present>c&&(c=h.present,n.summary.bestAttendanceEmployee={name:u.name,presentDays:h.present})}const p=s.length||1;return n.summary.avgPresent=Math.round(r/p),n.summary.avgAbsent=Math.round(i/p),n.summary.avgLate=Math.round(o/p),n.summary.avgWorkingHours=Math.round(l/p),n}async getLeaveReport(e,t){return await N.getLeaveStatistics(e,t)}async getPayrollReport(e,t){return await se.getPayrollSummary(e,t)}async getDashboardStats(){const e=await E.getEmployees(),t=e.filter(d=>d.status==="active"),s=new Date().toISOString().split("T")[0],n=new Date,r=n.getMonth()+1,i=n.getFullYear(),o=await G.getAttendance({startDate:s,endDate:s}),l=await N.getLeaveStatistics(r,i);return{totalEmployees:t.length,presentToday:o.filter(d=>d.status==="present").length,absentToday:t.length-o.filter(d=>d.status==="present").length,onLeaveToday:o.filter(d=>d.status==="on_leave").length,pendingLeaves:l.pending,newJoinees:e.filter(d=>{if(!d.joiningDate)return!1;const c=new Date(d.joiningDate);return(n-c)/(1e3*60*60*24)<=30}).length}}}const Le=new so;function no(){const a=document.createElement("div");return a.innerHTML=`
        <div class="page-header flex justify-between items-center">
            <div>
                <h1 class="page-title">Reports & Analytics</h1>
                <p class="page-subtitle">Visual Insights and Data Export</p>
            </div>
            <div class="flex gap-2">
                <button class="btn btn-secondary" id="print-report-btn">🖨️ Print Report</button>
                <button class="btn btn-primary" id="export-all-btn">💾 Export All</button>
            </div>
        </div>

        <div class="grid grid-2 mb-6">
            <!-- Attendance Trends -->
            <div class="card">
                <div class="flex justify-between items-center mb-4">
                    <h3>Attendance Overview (Today)</h3>
                </div>
                <div id="attendance-chart" class="chart-container" style="height: 200px; display: flex; align-items: flex-end; gap: 10px; padding-top: 20px;">
                    <div class="text-center text-muted w-full" style="display: flex; align-items: center; justify-content: center;">Loading...</div>
                </div>
            </div>

            <!-- Headcount by Department -->
            <div class="card">
                <h3 class="mb-4">Headcount by Department</h3>
                <div id="dept-distribution" style="display: flex; flex-direction: column; gap: 0.75rem;">
                    <div class="text-center text-muted">Loading...</div>
                </div>
            </div>
        </div>

        <div class="grid grid-3 mb-6">
            <!-- Payroll Summary -->
            <div class="card">
                <h3 class="mb-4">Workforce Summary</h3>
                <div id="payroll-stats">
                    <div class="text-center text-muted">Loading...</div>
                </div>
            </div>

            <!-- Leave Utilization -->
            <div class="card">
                <h3 class="mb-4">Employee Status Distribution</h3>
                <div id="leave-stats">
                    <div class="text-center text-muted">Loading...</div>
                </div>
            </div>

            <!-- Diversity -->
            <div class="card">
                <h3 class="mb-4">Gender Diversity</h3>
                <div id="diversity-stats" class="flex items-center justify-center p-4">
                    <div class="text-center text-muted">Loading...</div>
                </div>
            </div>
        </div>
    `,setTimeout(async()=>{try{await ro(a)}catch(e){console.error("Error loading attendance chart:",e);const t=a.querySelector("#attendance-chart");t&&(t.innerHTML='<div class="text-center text-muted">Unable to load attendance data</div>')}try{await io(a)}catch(e){console.error("Error loading department distribution:",e);const t=a.querySelector("#dept-distribution");t&&(t.innerHTML='<div class="text-center text-muted">Unable to load department data</div>')}try{await oo(a)}catch(e){console.error("Error loading workforce summary:",e);const t=a.querySelector("#payroll-stats");t&&(t.innerHTML='<div class="text-center text-muted">Unable to load data</div>')}try{await lo(a)}catch(e){console.error("Error loading status distribution:",e);const t=a.querySelector("#leave-stats");t&&(t.innerHTML='<div class="text-center text-muted">Unable to load data</div>')}try{await co(a)}catch(e){console.error("Error loading diversity stats:",e);const t=a.querySelector("#diversity-stats");t&&(t.innerHTML='<div class="text-center text-muted">Unable to load diversity data</div>')}a.querySelector("#print-report-btn")?.addEventListener("click",()=>window.print()),a.querySelector("#export-all-btn")?.addEventListener("click",()=>uo())},0),a}async function ro(a){const e=await Le.getDashboardStats(),t=a.querySelector("#attendance-chart"),s=e.totalEmployees||1,n=e.presentToday||0,r=e.absentToday||0,i=e.onLeaveToday||0,o=[{label:"Present",value:n,color:"var(--success, #10b981)"},{label:"Absent",value:r,color:"var(--danger, #ef4444)"},{label:"On Leave",value:i,color:"var(--warning, #f59e0b)"},{label:"Total",value:s,color:"var(--primary, #ccff00)"}],l=Math.max(...o.map(d=>d.value),1);t.innerHTML=o.map(d=>`
        <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 5px;">
            <div style="font-size: 1.25rem; font-weight: bold; color: ${d.color};">${d.value}</div>
            <div style="width: 100%; display: flex; flex-direction: column-reverse; height: 120px; background: var(--bg-secondary); border-radius: 4px; overflow: hidden;">
                <div style="height: ${d.value/l*100}%; background: ${d.color}; transition: height 0.5s; min-height: 2px; border-radius: 4px 4px 0 0;"></div>
            </div>
            <span class="text-xs text-muted">${d.label}</span>
        </div>
    `).join("")}async function io(a){const e=await Le.getHeadcountReport(),t=a.querySelector("#dept-distribution"),s=e.departmentDistribution||{},n=e.totalActive||1;if(Object.keys(s).length===0){t.innerHTML='<div class="text-center text-muted">No department data available</div>';return}t.innerHTML=Object.entries(s).map(([r,i])=>`
        <div>
            <div class="flex justify-between text-xs mb-1">
                <span>${r}</span>
                <span>${i} (${Math.round(i/n*100)}%)</span>
            </div>
            <div style="height: 6px; background: var(--bg-secondary); border-radius: 3px; overflow: hidden;">
                <div style="height: 100%; width: ${i/n*100}%; background: var(--primary); border-radius: 3px; transition: width 0.5s;"></div>
            </div>
        </div>
    `).join("")}async function oo(a){const e=await Le.getHeadcountReport(),t=a.querySelector("#payroll-stats"),s=[{label:"Total Active",value:e.totalActive||0},{label:"Total Exited",value:e.totalExited||0},{label:"Draft / Onboarding",value:e.totalDraft||0},{label:"Notice Period",value:e.noticePeriod||0},{label:"New Joinees (30d)",value:e.newJoinees||0},{label:"Attrition Rate",value:`${e.attritionRate||0}%`,isText:!0}];t.innerHTML=s.map(n=>`
        <div class="flex justify-between items-center mb-2 text-sm">
            <span class="text-muted">
                <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:var(--primary); margin-right:5px;"></span>
                ${n.label}
            </span>
            <span class="font-medium">${n.isText,n.value}</span>
        </div>
    `).join("")}async function lo(a){const e=await Le.getHeadcountReport(),t=a.querySelector("#leave-stats"),s=(e.totalActive||0)+(e.totalExited||0)+(e.totalDraft||0)+(e.noticePeriod||0);if(s===0){t.innerHTML='<p class="text-muted text-center">No employee data available</p>';return}const n=[{label:"Active",count:e.totalActive||0,color:"var(--success, #10b981)"},{label:"Exited",count:e.totalExited||0,color:"var(--danger, #ef4444)"},{label:"Draft",count:e.totalDraft||0,color:"var(--warning, #f59e0b)"},{label:"Notice Period",count:e.noticePeriod||0,color:"var(--info, #3b82f6)"}];t.innerHTML=n.map(r=>{const i=Math.round(r.count/s*100);return`
            <div class="mb-4">
                <div class="flex justify-between text-xs mb-1">
                    <span class="font-medium">${r.label}</span>
                    <span>${r.count} (${i}%)</span>
                </div>
                <div style="height: 6px; background: var(--bg-secondary); border-radius: 3px; overflow: hidden;">
                    <div style="height: 100%; width: ${i}%; background: ${r.color}; border-radius: 3px; transition: width 0.5s;"></div>
                </div>
            </div>
        `}).join("")}async function co(a){const e=await Le.getHeadcountReport(),t=a.querySelector("#diversity-stats"),s=e.genderDistribution||{},n=s.Male||s.male||0,r=s.Female||s.female||0,i=s.Other||s.other||s["Not Specified"]||0,o=n+r+i||1,l=Math.round(n/o*100),d=Math.round(r/o*100),c=Math.round(i/o*100);t.innerHTML=`
        <div class="text-center">
            <div style="font-size: 2.5rem; font-weight: bold; color: var(--primary);">${d}%</div>
            <div class="text-sm text-muted">Female Representation</div>
            <div style="display: flex; gap: 1rem; margin-top: 1rem; font-size: 0.75rem; justify-content: center;">
                <span><span style="display:inline-block; width:10px; height:10px; background:var(--primary); border-radius:2px;"></span> Male: ${l}% (${n})</span>
                <span><span style="display:inline-block; width:10px; height:10px; background:var(--success, #10b981); border-radius:2px;"></span> Female: ${d}% (${r})</span>
                ${i>0?`<span><span style="display:inline-block; width:10px; height:10px; background:var(--warning); border-radius:2px;"></span> Other: ${c}% (${i})</span>`:""}
            </div>
        </div>
    `}async function uo(){try{const a=await Le.getHeadcountReport();let e=`HRMS Full Report

`;e+=`HEADCOUNT SUMMARY
`,e+=`Total Active,${a.totalActive}
`,e+=`Total Exited,${a.totalExited}
`,e+=`Total Draft,${a.totalDraft}
`,e+=`Notice Period,${a.noticePeriod}
`,e+=`New Joinees (30 days),${a.newJoinees}
`,e+=`Attrition Rate,${a.attritionRate}%

`,e+=`DEPARTMENT DISTRIBUTION
`,e+=`Department,Count
`,Object.entries(a.departmentDistribution||{}).forEach(([r,i])=>{e+=`${r},${i}
`}),e+=`
`,e+=`GENDER DIVERSITY
`,e+=`Gender,Count
`,Object.entries(a.genderDistribution||{}).forEach(([r,i])=>{e+=`${r},${i}
`});const t=new Blob([e],{type:"text/csv"}),s=URL.createObjectURL(t),n=document.createElement("a");n.href=s,n.download=`hrms_report_${new Date().toISOString().split("T")[0]}.csv`,n.click(),URL.revokeObjectURL(s),alert("Full report exported successfully! 📊")}catch(a){alert("Error exporting report: "+a.message)}}function po(){const a=document.createElement("div"),e=S.getCurrentUser();return a.innerHTML='<div class="text-muted text-center py-8">Loading documents...</div>',ho(a,e),a}async function ho(a,e){const t=await E.getEmployee(e.userId)||{},s=[{id:"DOC001",name:"Offer Letter",type:"Employment",issuedDate:t.joiningDate||"2023-01-15",status:"available"},{id:"DOC002",name:"Appointment Letter",type:"Employment",issuedDate:t.joiningDate||"2023-01-15",status:"available"},{id:"DOC003",name:"Employee ID Card",type:"Identification",issuedDate:t.joiningDate||"2023-01-15",status:"available"},{id:"DOC004",name:"NDA (Non-Disclosure Agreement)",type:"Legal",issuedDate:t.joiningDate||"2023-01-15",status:"available"},{id:"DOC005",name:"Company Policy Handbook",type:"Policy",issuedDate:"2024-01-01",status:"available"},{id:"DOC006",name:"Form 16 (2023-24)",type:"Tax",issuedDate:"2024-06-15",status:"available"},{id:"DOC007",name:"PF Statement (2024)",type:"Financial",issuedDate:"2024-12-01",status:"available"},{id:"DOC008",name:"Experience Certificate",type:"Employment",issuedDate:null,status:"pending"}];return a.innerHTML=`
    <div class="page-header">
      <h1 class="page-title">My Documents</h1>
      <p class="page-subtitle">Access and download your employment documents</p>
    </div>

    <div class="grid grid-4 mb-6">
      <div class="card stat-card">
        <div class="stat-value">${s.filter(n=>n.status==="available").length}</div>
        <div class="stat-label">Available</div>
      </div>
      <div class="card stat-card">
        <div class="stat-value">${s.filter(n=>n.status==="pending").length}</div>
        <div class="stat-label">Pending</div>
      </div>
      <div class="card stat-card">
        <div class="stat-value">${s.filter(n=>n.type==="Employment").length}</div>
        <div class="stat-label">Employment</div>
      </div>
      <div class="card stat-card">
        <div class="stat-value">${s.filter(n=>n.type==="Tax"||n.type==="Financial").length}</div>
        <div class="stat-label">Financial/Tax</div>
      </div>
    </div>

    <div class="card mb-4">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
        <h3>All Documents</h3>
        <div class="flex gap-2">
          <select id="doc-filter" class="btn btn-secondary">
            <option value="">All Types</option>
            <option value="Employment">Employment</option>
            <option value="Tax">Tax</option>
            <option value="Financial">Financial</option>
            <option value="Legal">Legal</option>
            <option value="Policy">Policy</option>
          </select>
        </div>
      </div>

      <div class="grid grid-2" id="documents-grid">
        ${s.map(n=>`
          <div class="document-card" style="border: 1px solid var(--border); border-radius: 8px; padding: 1.25rem; ${n.status==="pending"?"opacity: 0.6;":""}">
            <div style="font-weight: 600; font-size: 1rem; margin-bottom: 0.5rem;">${n.name}</div>
            <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.75rem;">
              <span class="badge badge-${n.type==="Employment"?"primary":n.type==="Tax"?"warning":"secondary"}" style="font-size: 0.65rem;">${n.type}</span>
              ${n.issuedDate?` • Issued: ${new Date(n.issuedDate).toLocaleDateString()}`:""}
            </div>
            <div>
              ${n.status==="available"?`<button class="btn btn-sm btn-primary" onclick="window.downloadDocument('${n.id}', '${n.name}')">Download</button>
               <button class="btn btn-sm btn-secondary" onclick="window.viewDocument('${n.id}', '${n.name}')">View</button>`:'<span class="text-muted text-sm">Available upon request</span>'}
            </div>
          </div>
        `).join("")}
      </div>
    </div>

    <div class="card">
      <h3 class="mb-4">Request Document</h3>
      <p class="text-muted text-sm mb-4">Need a document that's not listed here? Submit a request to HR.</p>
      <div class="grid grid-3">
        <div class="form-group">
          <label>Document Type</label>
          <select id="request-doc-type">
            <option value="">Select document type</option>
            <option value="bonafide">Bonafide Certificate</option>
            <option value="salary">Salary Certificate</option>
            <option value="experience">Experience Letter</option>
            <option value="relieving">Relieving Letter</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="form-group">
          <label>Purpose/Reason</label>
          <input type="text" id="request-purpose" placeholder="e.g., Bank loan, Visa application">
        </div>
        <div style="display: flex; align-items: flex-end;">
          <button class="btn btn-primary w-full" onclick="window.submitDocRequest()">Submit Request</button>
        </div>
      </div>
    </div>
  `,a}window.downloadDocument=function(a,e){alert(`✅ Downloading "${e}"...

In a real system, this would download the actual PDF document.`)};window.viewDocument=function(a,e){const t=document.createElement("div");t.className="modal-backdrop",t.style.cssText="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 1000;",t.innerHTML=`
      <div style="background: white; max-width: 700px; width: 90%; max-height: 80vh; overflow: auto; border-radius: 12px; padding: 2rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; border-bottom: 2px solid var(--border); padding-bottom: 1rem;">
          <h2 style="margin: 0;">${e}</h2>
          <button onclick="this.closest('.modal-backdrop').remove()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer;">✕</button>
        </div>
        
        <div style="background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px; padding: 3rem; text-align: center; color: #64748b;">
          <div style="width: 60px; height: 60px; background: #e2e8f0; border-radius: 8px; margin: 0 auto 1rem; display: flex; align-items: center; justify-content: center; font-size: 24px; color: #64748b;">PDF</div>
          <h3 style="color: #334155; margin-bottom: 0.5rem;">${e}</h3>
          <p style="margin-bottom: 1.5rem; font-size: 0.9rem;">Document preview would appear here in a PDF viewer.</p>
          <p style="font-size: 0.75rem; color: #94a3b8;">Document ID: ${a}</p>
        </div>
        
        <div style="margin-top: 1.5rem; display: flex; gap: 1rem; justify-content: flex-end;">
          <button class="btn btn-primary" onclick="window.downloadDocument('${a}', '${e}')">Download PDF</button>
          <button class="btn btn-secondary" onclick="this.closest('.modal-backdrop').remove()">Close</button>
        </div>
      </div>
    `,document.body.appendChild(t)};window.submitDocRequest=function(){const a=document.querySelector("#request-doc-type").value,e=document.querySelector("#request-purpose").value;if(!a){alert("Please select a document type");return}alert(`✅ Document Request Submitted!

Type: ${a}
Purpose: ${e||"Not specified"}

HR will process your request within 2-3 working days.`),document.querySelector("#request-doc-type").value="",document.querySelector("#request-purpose").value=""};function mo(){const a=document.createElement("div"),e=S.getCurrentUser();return a.innerHTML='<div class="text-muted text-center py-8">Loading profile...</div>',go(a,e),a}async function go(a,e){const t=await E.getEmployee(e.userId)||{},n=await N.getLeaveBalance(e.userId)||{casual:{total:12,balance:9},sick:{total:10,balance:8},privilege:{total:15,balance:10}},r=new Date(t.joiningDate||"2023-01-15"),o=Math.floor((new Date-r)/(1e3*60*60*24*30)),l=Math.floor(o/12),d=o%12;a.innerHTML=`
    <!-- Cover Section -->
    <div style="position: relative; margin-bottom: 5rem;">
      <div style="
        height: 240px; 
        background: linear-gradient(135deg, rgba(204, 255, 0, 0.1) 0%, rgba(5, 5, 5, 1) 100%);
        border-radius: 20px;
        position: relative;
        overflow: hidden;
        border: 1px solid var(--border);
      ">
        <div style="
          position: absolute; 
          inset: 0; 
          background-image: radial-gradient(circle at 10% 20%, rgba(204, 255, 0, 0.05) 0%, transparent 20%);
        "></div>
        <!-- Edit Cover Button (Mock) -->
        <button class="btn btn-secondary btn-sm" style="position: absolute; top: 20px; right: 20px; background: rgba(0,0,0,0.5); backdrop-filter: blur(5px); border: 1px solid rgba(255,255,255,0.1);">
          <i class="fas fa-camera"></i> Change Cover
        </button>
      </div>
      
      <!-- Profile Header Info Overlay -->
      <div style="position: absolute; bottom: -60px; left: 40px; display: flex; align-items: end; gap: 2rem;">
        <!-- Avatar -->
        <div style="
          width: 160px; 
          height: 160px; 
          border-radius: 50%; 
          background: var(--surface); 
          border: 4px solid var(--bg-ultra-dark); 
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 4rem;
          color: var(--primary-lime);
          text-shadow: 0 0 20px rgba(204, 255, 0, 0.3);
          position: relative;
          z-index: 2;
        ">
          ${t.name?t.name.charAt(0).toUpperCase():"U"}
          <div style="
            position: absolute; 
            bottom: 10px; 
            right: 10px; 
            width: 24px; 
            height: 24px; 
            background: var(--success); 
            border: 4px solid var(--surface); 
            border-radius: 50%;
          "></div>
        </div>
        
        <!-- Name & Desig -->
        <div style="padding-bottom: 20px; z-index: 1;">
          <h1 style="margin: 0; font-size: 2.5rem; text-shadow: 0 2px 4px rgba(0,0,0,0.5);">${t.name||"User Profile"}</h1>
          <p class="text-muted" style="font-size: 1.1rem; display: flex; align-items: center; gap: 0.5rem;">
            ${t.designation||"Designation"} 
            <span style="opacity: 0.5;">•</span> 
            <span style="color: var(--primary-lime);">${t.department||"Department"}</span>
          </p>
        </div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid" style="grid-template-columns: 320px 1fr; gap: 2rem; align-items: start;">
      
      <!-- Left Sidebar -->
      <div class="flex-col gap-4">
        
        <!-- Status Card -->
        <div class="card" style="padding: 1.5rem;">
          <h3 style="font-size: 1rem; margin-bottom: 1rem; border-bottom: 1px solid var(--border); padding-bottom: 0.5rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em;">At a Glance</h3>
          
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span class="text-muted">Status</span>
              <span class="badge badge-success">Active</span>
            </div>
            
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span class="text-muted">Employee ID</span>
              <span style="font-family: monospace; font-size: 1.1rem; color: var(--text-main);">${t.employeeId||e.userId}</span>
            </div>
            
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span class="text-muted">Location</span>
              <span style="text-align: right;">${t.location||"Bangalore"}</span>
            </div>
            
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span class="text-muted">Manager</span>
              <span style="text-align: right;">${t.manager||"Sarah Connor"}</span>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center;">
               <span class="text-muted">Tenure</span>
              <span style="text-align: right;">${l}Y ${d}M</span>
            </div>
          </div>

          <button class="btn btn-secondary w-full mt-4" onclick="window.editProfile()">
            Edit Profile
          </button>
        </div>

        <!-- Leave Summary Mini -->
        <div class="card" style="padding: 1.5rem;">
          <h3 style="font-size: 1rem; margin-bottom: 1rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Leave Balance</h3>
          
          <div style="margin-bottom: 1rem;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
              <span class="text-xs text-muted">Casual</span>
              <span class="text-xs font-bold">${n.casual?.balance||0} left</span>
            </div>
            <div style="height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px;">
              <div style="height: 100%; width: ${(n.casual?.balance||0)/(n.casual?.total||1)*100}%; background: var(--primary-lime); border-radius: 2px;"></div>
            </div>
          </div>

          <div style="margin-bottom: 1rem;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
              <span class="text-xs text-muted">Sick</span>
              <span class="text-xs font-bold">${n.sick?.balance||0} left</span>
            </div>
            <div style="height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px;">
              <div style="height: 100%; width: ${(n.sick?.balance||0)/(n.sick?.total||1)*100}%; background: var(--warning); border-radius: 2px;"></div>
            </div>
          </div>
          
           <div style="margin-bottom: 0;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
              <span class="text-xs text-muted">Privilege</span>
              <span class="text-xs font-bold">${n.privilege?.balance||0} left</span>
            </div>
            <div style="height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px;">
              <div style="height: 100%; width: ${(n.privilege?.balance||0)/(n.privilege?.total||1)*100}%; background: var(--accent-cyan); border-radius: 2px;"></div>
            </div>
          </div>
        </div>

      </div>

      <!-- Right Content Tabs -->
      <div class="card" style="min-height: 500px; padding: 0; overflow: hidden;">
        <!-- Tabs Header -->
        <div class="tabs-header" style="
          display: flex; 
          border-bottom: 1px solid var(--border); 
          background: rgba(0,0,0,0.2);
          padding: 0 1rem;
        ">
          <button class="tab-btn active" data-tab="personal" style="
            padding: 1.25rem 1.5rem;
            background: none;
            border: none;
            color: var(--text-muted);
            font-weight: 500;
            border-bottom: 2px solid transparent;
            cursor: pointer;
            transition: all 0.2s;
            font-family: var(--font-heading);
          ">Personal</button>
          
          <button class="tab-btn" data-tab="employment" style="
            padding: 1.25rem 1.5rem;
            background: none;
            border: none;
            color: var(--text-muted);
            font-weight: 500;
            border-bottom: 2px solid transparent;
            cursor: pointer;
            transition: all 0.2s;
            font-family: var(--font-heading);
          ">Employment</button>
          
          <button class="tab-btn" data-tab="financial" style="
            padding: 1.25rem 1.5rem;
            background: none;
            border: none;
            color: var(--text-muted);
            font-weight: 500;
            border-bottom: 2px solid transparent;
            cursor: pointer;
            transition: all 0.2s;
             font-family: var(--font-heading);
          ">Financial</button>

          <button class="tab-btn" data-tab="documents" style="
            padding: 1.25rem 1.5rem;
            background: none;
            border: none;
            color: var(--text-muted);
            font-weight: 500;
            border-bottom: 2px solid transparent;
            cursor: pointer;
            transition: all 0.2s;
             font-family: var(--font-heading);
          ">Documents</button>
        </div>

        <!-- Tab Content Area -->
        <div id="tab-content-area" style="padding: 2rem;">
          <!-- Content injected via JS -->
        </div>

        <!-- Inline Styles for Active Tab (since we can't easily rely on external CSS for this dynamic part) -->
        <style>
          .tab-btn.active {
            color: var(--primary-lime) !important;
            border-bottom-color: var(--primary-lime) !important;
          }
          .tab-btn:hover {
            color: var(--text-main);
            background: rgba(255,255,255,0.02);
          }
           @media (max-width: 900px) {
            .grid { grid-template-columns: 1fr !important; }
            .profile-header-info { text-align: center; left: 0; right: 0; bottom: -80px; align-items: center; justify-content: center; flex-direction: column; }
          }
        </style>
      </div>

    </div>
  `;const c=(g,y,f="")=>`
    <div style="
      padding: 1rem; 
      background: var(--bg-secondary); 
      border-radius: 8px; 
      border: 1px solid transparent; 
      transition: border-color 0.2s;
      position: relative;
    " onmouseover="this.style.borderColor='var(--border)'" onmouseout="this.style.borderColor='transparent'">
      <div class="text-sm text-muted" style="margin-bottom: 0.25rem;">${g}</div>
      <div style="font-weight: 600; font-size: 1.05rem; display: flex; align-items: center; gap: 0.5rem;">
        ${f?`<span style="opacity: 0.5;">${f}</span>`:""} ${y}
      </div>
    </div>
  `,p={personal:`
      <div class="grid grid-2 gap-4">
        ${c("Full Name",t.name||"Not provided")}
        ${c("Email Address",t.email||e.email||"Not provided")}
        ${c("Mobile Number",t.mobile||"+91 98765 43210")}
        ${c("Date of Birth",t.dob||"January 15, 1995")}
        ${c("Gender",t.gender||"Male")}
        ${c("Blood Group",t.bloodGroup||"O+")}
        <div class="col-span-2">
           ${c("Address",t.address||"123, Tech Park Road, Electronic City, Bangalore - 560100")}
        </div>
      </div>
       <div style="margin-top: 2rem;">
        <h4 style="margin-bottom: 1rem; border-bottom: 1px solid var(--border); padding-bottom: 0.5rem;">Emergency Contact</h4>
        <div class="grid grid-2 gap-4">
          ${c("Contact Name","Rahul Sharma")}
          ${c("Relationship","Brother")}
          ${c("Phone Number","+91 99887 76655")}
        </div>
       </div>
    `,employment:`
      <div class="grid grid-2 gap-4">
         ${c("Employee ID",t.employeeId||e.userId)}
         ${c("Department",t.department||"Engineering")}
         ${c("Designation",t.designation||"Software Developer")}
         ${c("Work Location",t.location||"Bangalore Office")}
         ${c("Employment Type","Full-Time Permanent")}
         ${c("Joining Date",new Date(t.joiningDate||"2023-01-15").toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"}))}
         ${c("Confirmation Date","April 15, 2023")}
      </div>
    `,financial:`
       <div class="grid grid-2 gap-4">
         ${c("Bank Name","HDFC Bank")}
         ${c("Account Number","XXXX XXXX 4521")}
         ${c("IFSC Code","HDFC0001234")}
         ${c("PAN Number","ABCDE1234F")}
         ${c("UAN Number","101234567890")}
         ${c("PF Account","MH/BAN/12345/123")}
      </div>
    `,documents:`
      <div style="text-align: center; padding: 3rem 1rem;">
        <h3 style="margin-bottom: 0.5rem;">No Documents Available</h3>
        <p class="text-muted">You haven't uploaded any documents yet.</p>
        <button class="btn btn-primary mt-4">Upload Document</button>
      </div>
    `},u=a.querySelector(".tabs-header"),h=a.querySelector("#tab-content-area");h.innerHTML=p.personal;const m=u.querySelectorAll(".tab-btn");return m.forEach(g=>{g.addEventListener("click",()=>{m.forEach(f=>f.classList.remove("active")),g.classList.add("active");const y=g.getAttribute("data-tab");h.innerHTML=p[y],h.animate([{opacity:0,transform:"translateY(10px)"},{opacity:1,transform:"translateY(0)"}],{duration:300,easing:"ease-out"})})}),a}window.editProfile=function(){alert("Edit functionality would open a modal here.")};function yo(){const a=document.createElement("div");S.getCurrentUser();const e=[{id:"TM001",name:"Rajesh Kumar",employeeId:"E005",designation:"Senior Developer",department:"Engineering",email:"rajesh.kumar@company.com",phone:"+91 98765 43211",joiningDate:"2022-03-15",status:"present",avatar:"R"},{id:"TM002",name:"Priya Sharma",employeeId:"E006",designation:"Software Developer",department:"Engineering",email:"priya.sharma@company.com",phone:"+91 98765 43212",joiningDate:"2022-06-20",status:"present",avatar:"P"},{id:"TM003",name:"Amit Patel",employeeId:"E007",designation:"Junior Developer",department:"Engineering",email:"amit.patel@company.com",phone:"+91 98765 43213",joiningDate:"2023-01-10",status:"on_leave",avatar:"A"},{id:"TM004",name:"Sneha Reddy",employeeId:"E008",designation:"QA Engineer",department:"Engineering",email:"sneha.reddy@company.com",phone:"+91 98765 43214",joiningDate:"2022-09-05",status:"present",avatar:"S"},{id:"TM005",name:"Vikram Singh",employeeId:"E009",designation:"UI Developer",department:"Engineering",email:"vikram.singh@company.com",phone:"+91 98765 43215",joiningDate:"2023-04-18",status:"wfh",avatar:"V"}],t=e.filter(r=>r.status==="present").length,s=e.filter(r=>r.status==="on_leave").length,n=e.filter(r=>r.status==="wfh").length;return a.innerHTML=`
    <div class="page-header">
      <h1 class="page-title">My Team</h1>
      <p class="page-subtitle">View and manage your team members</p>
    </div>

    <div class="grid grid-4 mb-6">
      <div class="card stat-card">
        <div class="stat-value">${e.length}</div>
        <div class="stat-label">Total Members</div>
      </div>
      <div class="card stat-card">
        <div class="stat-value" style="color: var(--success);">${t}</div>
        <div class="stat-label">Present Today</div>
      </div>
      <div class="card stat-card">
        <div class="stat-value" style="color: var(--warning);">${s}</div>
        <div class="stat-label">On Leave</div>
      </div>
      <div class="card stat-card">
        <div class="stat-value" style="color: var(--primary);">${n}</div>
        <div class="stat-label">Work From Home</div>
      </div>
    </div>

    <div class="card">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
        <h3>Team Members</h3>
        <div class="flex gap-2">
          <select id="status-filter" class="btn btn-secondary">
            <option value="">All Status</option>
            <option value="present">Present</option>
            <option value="on_leave">On Leave</option>
            <option value="wfh">Work From Home</option>
          </select>
        </div>
      </div>

      <div class="grid grid-2" id="team-grid" style="gap: 1rem;">
        ${e.map(r=>`
          <div class="team-member-card" style="border: 1px solid var(--border); border-radius: 8px; padding: 1.25rem; display: flex; gap: 1rem; align-items: flex-start;">
            <div style="width: 50px; height: 50px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 1.25rem;">
              ${r.avatar}
            </div>
            <div style="flex: 1;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div>
                  <div style="font-weight: 600; font-size: 1rem;">${r.name}</div>
                  <div class="text-sm text-muted">${r.designation}</div>
                </div>
                <span class="badge badge-${r.status==="present"?"success":r.status==="on_leave"?"warning":"primary"}">
                  ${r.status==="present"?"Present":r.status==="on_leave"?"On Leave":"WFH"}
                </span>
              </div>
              <div style="margin-top: 0.75rem; font-size: 0.8rem; color: var(--text-muted);">
                <div style="margin-bottom: 0.25rem;">ID: ${r.employeeId}</div>
                <div style="margin-bottom: 0.25rem;">${r.email}</div>
                <div>${r.phone}</div>
              </div>
              <div style="margin-top: 0.75rem; display: flex; gap: 0.5rem;">
                <button class="btn btn-sm btn-secondary" onclick="window.viewTeamMember('${r.id}')">View Profile</button>
                <button class="btn btn-sm btn-secondary" onclick="window.messageTeamMember('${r.id}')">Message</button>
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    </div>

    <div class="grid grid-2 gap-6 mt-6">
      <div class="card">
        <h3 class="mb-4">Team Leaves This Week</h3>
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: var(--bg-secondary); border-radius: 6px;">
            <div>
              <div style="font-weight: 500;">Amit Patel</div>
              <div class="text-sm text-muted">Sick Leave</div>
            </div>
            <div class="text-sm text-right">
              <div>Dec 30 - Dec 31</div>
              <span class="badge badge-warning">Approved</span>
            </div>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: var(--bg-secondary); border-radius: 6px;">
            <div>
              <div style="font-weight: 500;">Priya Sharma</div>
              <div class="text-sm text-muted">Casual Leave</div>
            </div>
            <div class="text-sm text-right">
              <div>Jan 2 - Jan 3</div>
              <span class="badge badge-primary">Pending</span>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <h3 class="mb-4">Team Performance</h3>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
              <span>Average Attendance</span>
              <span style="font-weight: 600;">94%</span>
            </div>
            <div style="height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
              <div style="height: 100%; width: 94%; background: #10b981; border-radius: 4px;"></div>
            </div>
          </div>
          <div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
              <span>Tasks Completed</span>
              <span style="font-weight: 600;">87%</span>
            </div>
            <div style="height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
              <div style="height: 100%; width: 87%; background: #3b82f6; border-radius: 4px;"></div>
            </div>
          </div>
          <div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
              <span>Sprint Progress</span>
              <span style="font-weight: 600;">72%</span>
            </div>
            <div style="height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
              <div style="height: 100%; width: 72%; background: #f59e0b; border-radius: 4px;"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,a}window.viewTeamMember=function(a){alert(`Viewing profile for team member ${a}

This would open the detailed employee profile in a production system.`)};window.messageTeamMember=function(a){alert(`Opening message composer for team member ${a}

This would open the internal messaging system in a production system.`)};function vo(){const a=document.createElement("div"),e=S.getCurrentUser(),t=e&&(e.role==="hr_admin"||e.role==="super_admin");return a.innerHTML=`
    <div class="page-header" style="background: linear-gradient(135deg, rgba(204, 255, 0, 0.1) 0%, rgba(5, 5, 5, 1) 100%); padding: 3rem 2rem; border-radius: 24px; border: 1px solid rgba(204, 255, 0, 0.1); margin-bottom: 2rem; position: relative; overflow: hidden;">
        <div style="position: relative; z-index: 2;">
            <div class="flex justify-between items-center">
                <div>
                    <h1 class="page-title" style="font-size: 2.5rem; margin-bottom: 0.5rem; font-weight: 700;">Company Announcements</h1>
                    <p class="page-subtitle" style="color: var(--text-muted); font-size: 1.1rem;">Stay updated with company news and events</p>
                </div>
                ${t?'<button class="btn btn-primary" id="create-announcement-btn" style="padding: 0.75rem 1.5rem; font-weight: 600;">+ New Announcement</button>':""}
            </div>
        </div>
        
        <!-- Decorative Elements -->
        <div style="position: absolute; right: -50px; top: -50px; width: 300px; height: 300px; background: radial-gradient(circle, rgba(204, 255, 0, 0.1) 0%, transparent 70%); border-radius: 50%; filter: blur(40px);"></div>
    </div>

    <!-- Category Filters -->
    <div class="card mb-6" style="background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 1rem;">
      <div class="flex gap-3" style="flex-wrap: wrap;">
        <button class="filter-btn active" data-category="">All Updates</button>
        <button class="filter-btn" data-category="fun_friday">🎉 Fun Friday</button>
        <button class="filter-btn" data-category="festival">🎊 Festivals</button>
        <button class="filter-btn" data-category="leave">📅 Leave Updates</button>
        <button class="filter-btn" data-category="party">🎈 Parties</button>
        <button class="filter-btn" data-category="policy">📋 Policies</button>
        <button class="filter-btn" data-category="general">💬 General</button>
      </div>
    </div>

    <!-- Announcements List -->
    <div id="announcements-list" class="grid gap-6"></div>
  `,Pt(a,""),a.querySelectorAll(".filter-btn").forEach(s=>{s.addEventListener("click",()=>{a.querySelectorAll(".filter-btn").forEach(n=>n.classList.remove("active")),s.classList.add("active"),Pt(a,s.dataset.category)})}),t&&a.querySelector("#create-announcement-btn").addEventListener("click",()=>{wo(a)}),a}async function Pt(a,e){const t={active:!0};e&&(t.category=e);const s=await ve.getAnnouncements(t);fo(a,s)}function fo(a,e){const t=a.querySelector("#announcements-list");if(e.length===0){t.innerHTML=`
      <div class="card text-center p-12" style="background: var(--surface); border: 1px border: var(--border); border-radius: 16px;">
        <div style="font-size: 4rem; margin-bottom: 1rem;">📭</div>
        <h3 class="text-xl font-bold mb-2">No Announcements</h3>
        <p class="text-muted">Check back later for company updates</p>
      </div>
    `;return}t.innerHTML=e.map(s=>bo(s)).join("")}function bo(a){const e={fun_friday:"🎉",festival:"🎊",leave:"📅",party:"🎈",policy:"📋",general:"💬"},s={fun_friday:"var(--primary-lime)",festival:"#f59e0b",leave:"#3b82f6",party:"#ec4899",policy:"#10b981",general:"#6b7280"}[a.category]||"#6b7280",n=e[a.category]||"💬";return`
    <div class="card hover-reveal" style="border: 1px solid var(--border); border-radius: 16px; overflow: hidden; position: relative; transition: all 0.3s ease;">
      <div style="position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: ${s};"></div>
      
      <div style="padding: 1.5rem 1.5rem 1.5rem 2rem;">
        <div class="flex justify-between items-start mb-4">
            <div class="flex items-center gap-3">
                <div style="font-size: 2rem;">${n}</div>
                <div>
                    <h3 class="text-lg font-bold" style="margin: 0; line-height: 1.2;">${a.title}</h3>
                    <div class="text-sm text-muted mt-1">
                        ${new Date(a.publishDate).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}
                    </div>
                </div>
            </div>
            <span class="badge" style="background: ${s}15; color: ${s}; font-weight: 600; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; padding: 0.35rem 0.75rem; border-radius: 999px;">
                ${a.category.replace("_"," ")}
            </span>
        </div>

        <div class="announcement-content" style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.5rem; font-size: 0.95rem;">
            ${a.content}
        </div>

        <div class="flex justify-between items-center pt-4 border-t border-gray-100">
            <div class="flex items-center gap-2">
                <div class="avatar" style="width: 24px; height: 24px; background: var(--bg-secondary); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; color: var(--text-muted);">
                    ${a.createdByName?a.createdByName.charAt(0):"A"}
                </div>
                <span class="text-xs text-muted">Posted by <span class="text-main font-medium">${a.createdByName||"Admin"}</span></span>
            </div>
            
            <div class="flex gap-4">
                <button class="btn-like" onclick="window.likeAnnouncement('${a.id}')" style="background: none; border: none; color: var(--text-muted); cursor: pointer; display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; transition: color 0.2s;">
                    👍 <span>${a.likes?.length||0}</span>
                </button>
                <div style="display: flex; align-items: center; gap: 0.5rem; color: var(--text-muted); font-size: 0.85rem;">
                    👁️ <span>${a.views||0}</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  `}function wo(a){const e=document.createElement("div");e.style.cssText="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); padding: 2rem; overflow-y: auto; z-index: 1000;",e.innerHTML=`
    <div class="card" style="max-width: 700px; margin: 2rem auto;">
      <h3 class="mb-4">Create Announcement</h3>
      <form id="announcement-form">
        <div class="form-group">
          <label>Title *</label>
          <input type="text" id="ann-title" required placeholder="e.g., Fun Friday - Pizza Party!" />
        </div>

        <div class="grid grid-2">
          <div class="form-group">
            <label>Category *</label>
            <select id="ann-category" required>
              <option value="general">General</option>
              <option value="fun_friday">Fun Friday</option>
              <option value="festival">Festival</option>
              <option value="leave">Leave Update</option>
              <option value="party">Party</option>
              <option value="policy">Policy</option>
            </select>
          </div>
          <div class="form-group">
            <label>Priority</label>
            <select id="ann-priority">
              <option value="normal">Normal</option>
              <option value="high">High</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label>Content *</label>
          <textarea id="ann-content" rows="6" required placeholder="Write your announcement here..."></textarea>
        </div>

        <div class="form-group">
          <label>Expiry Date (Optional)</label>
          <input type="date" id="ann-expiry" />
        </div>

        <div class="flex gap-2">
          <button type="submit" class="btn btn-primary">Publish Announcement</button>
          <button type="button" class="btn btn-secondary" id="cancel-ann-btn">Cancel</button>
        </div>
      </form>
    </div>
  `,document.body.appendChild(e),e.querySelector("#announcement-form").addEventListener("submit",async t=>{t.preventDefault();const s={title:e.querySelector("#ann-title").value,category:e.querySelector("#ann-category").value,priority:e.querySelector("#ann-priority").value,content:e.querySelector("#ann-content").value,expiryDate:e.querySelector("#ann-expiry").value||null};await ve.createAnnouncement(s),document.body.removeChild(e),U.success("Announcement published successfully!"),Pt(a,"")}),e.querySelector("#cancel-ann-btn").addEventListener("click",()=>{document.body.removeChild(e)})}window.likeAnnouncement=async a=>{const e=S.getCurrentUser();if(e){await ve.likeAnnouncement(a,e.userId);const t=document.querySelector(`button[onclick="window.likeAnnouncement('${a}')"]`);if(t){const s=t.querySelector("span");if(s){const n=await ve.getAnnouncement(a);n&&(s.innerText=n.likes.length)}}}};class _o{constructor(){this.shortcuts=new Map,this.enabled=!0,this.init()}init(){document.addEventListener("keydown",e=>{if(!this.enabled||["INPUT","TEXTAREA","SELECT"].includes(document.activeElement.tagName)&&e.key!=="Escape")return;const t=this.getKeyCombo(e);this.shortcuts.has(t)&&(e.preventDefault(),this.shortcuts.get(t).callback())})}getKeyCombo(e){const t=[];return e.ctrlKey&&t.push("Ctrl"),e.altKey&&t.push("Alt"),e.shiftKey&&t.push("Shift"),["Control","Alt","Shift"].includes(e.key)||t.push(e.key.toUpperCase()),t.join("+")}register(e,t,s){this.shortcuts.set(e,{description:t,callback:s})}unregister(e){this.shortcuts.delete(e)}enable(){this.enabled=!0}disable(){this.enabled=!1}getAllShortcuts(){return Array.from(this.shortcuts.entries()).map(([e,t])=>({key:e,description:t.description}))}showHelp(){const e=this.getAllShortcuts(),t=document.createElement("div");t.id="shortcuts-modal",t.style.cssText=`
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      animation: fadeIn 0.2s ease-out;
    `;const s=document.createElement("div");s.style.cssText=`
      background: white;
      padding: 2rem;
      border-radius: 12px;
      max-width: 600px;
      width: 90%;
      max-height: 80vh;
      overflow-y: auto;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    `;const n={Global:["Alt+D","Alt+L","Alt+S","ESCAPE"],Employee:["Alt+A","Alt+V","Alt+P"],"HR Admin":["Alt+E","Alt+R","Alt+C"],Manager:["Alt+M","Alt+T"]};s.innerHTML=`
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
        <h2 style="margin: 0;">⌨️ Keyboard Shortcuts</h2>
        <button id="close-shortcuts" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--text-muted);">✕</button>
      </div>

      <div style="color: var(--text-secondary); margin-bottom: 2rem; font-size: 0.875rem;">
        Use these keyboard shortcuts to navigate faster and boost your productivity.
      </div>

      ${Object.entries(n).map(([o,l])=>{const d=e.filter(c=>l.includes(c.key));return d.length===0?"":`
          <div style="margin-bottom: 2rem;">
            <h3 style="font-size: 0.875rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase; margin-bottom: 1rem;">
              ${o}
            </h3>
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              ${d.map(c=>`
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: var(--bg-secondary); border-radius: 6px;">
                  <span style="font-size: 0.875rem;">${c.description}</span>
                  <kbd style="
                    background: white;
                    border: 1px solid var(--border);
                    border-radius: 4px;
                    padding: 0.25rem 0.75rem;
                    font-family: 'Courier New', monospace;
                    font-size: 0.75rem;
                    font-weight: 600;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                  ">${c.key.replace("+"," + ")}</kbd>
                </div>
              `).join("")}
            </div>
          </div>
        `}).join("")}

      <div style="margin-top: 2rem; padding: 1rem; background: var(--bg-secondary); border-radius: 8px; font-size: 0.875rem; color: var(--text-secondary);">
        💡 <strong>Tip:</strong> Press <kbd style="padding: 0.125rem 0.5rem; background: white; border: 1px solid var(--border); border-radius: 4px;">Esc</kbd> to close any modal or popup
      </div>
    `,t.appendChild(s);const r=s.querySelector("#close-shortcuts"),i=()=>{t.style.animation="fadeOut 0.2s ease-in",setTimeout(()=>{t.parentElement&&t.parentElement.removeChild(t)},200)};if(r.addEventListener("click",i),t.addEventListener("click",o=>{o.target===t&&i()}),!document.querySelector("#modal-animations")){const o=document.createElement("style");o.id="modal-animations",o.textContent=`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
      `,document.head.appendChild(o)}document.body.appendChild(t)}}const F=new _o;function xo(a,e){F.register("Alt+D","Navigate to Dashboard",()=>{a("dashboard"),U.info("Opening Dashboard")}),F.register("Alt+L","Logout from application",()=>{window.handleLogoutClick?window.handleLogoutClick():console.log("Logout handler not found")}),F.register("Alt+S","Save current form",()=>{const t=document.querySelector('button[type="submit"], .btn-primary:not([data-action])');t?(t.click(),U.success("Attempting to save...")):U.warning("No form to save on this page")}),F.register("ESCAPE","Close modal or popup",()=>{const t=document.querySelector('[id$="-modal"], [class*="modal"]');t&&t.style.display!=="none"&&(t.style.display="none",t.remove())}),F.register("Alt+A","Go to Attendance",()=>{a("attendance"),U.info("Opening Attendance")}),F.register("Alt+V","Apply for Leave",()=>{a("leaves"),U.info("Opening Leave Management")}),F.register("Alt+P","View Payslip",()=>{a("salary"),U.info("Opening Salary & Payslips")}),F.register("Alt+E","Add Employee",()=>{a("employees"),setTimeout(()=>{const t=document.querySelector('button:contains("Add Employee"), [data-action="add-employee"]');t&&t.click()},300),U.info("Opening Employee Directory")}),F.register("Alt+R","Run Payroll",()=>{a("payroll"),U.info("Opening Payroll Module")}),F.register("Alt+C","Company Settings",()=>{a("company"),U.info("Opening Company Settings")}),F.register("Alt+M","My Team",()=>{a("team"),U.info("Opening My Team")}),F.register("Alt+T","Pending Approvals",()=>{a("approvals"),U.info("Opening Approvals")}),F.register("Alt+H","Show keyboard shortcuts",()=>{F.showHelp()}),F.register("Alt+/","Show keyboard shortcuts",()=>{F.showHelp()}),console.log("✓ Keyboard shortcuts initialized")}window.onerror=function(a,e,t,s,n){document.body.innerHTML=`
    <div style="background: #000; color: #ff5555; padding: 20px; font-family: monospace; z-index: 99999; position: fixed; top: 0; left: 0; width: 100%; height: 100%;">
      <h1>CRITICAL ERROR</h1>
      <p>${a}</p>
      <p>Line: ${t}, Col: ${s}</p>
      <pre>${n?n.stack:""}</pre>
      <button onclick="sessionStorage.clear(); window.location.reload();" style="padding: 10px; margin-top: 20px; background: #333; color: white; border: 1px solid #555; cursor: pointer;">RESET APP DATA</button>
    </div>
  `};const qe=document.querySelector("#app");let de=null;function So(a){const e=document.querySelector(".sidebar");if(e){e.querySelectorAll(".nav-item").forEach(s=>s.classList.remove("active"));const t=e.querySelector(`[data-page="${a}"]`);t&&t.classList.add("active")}}function ko(){const a=document.createElement("div");a.innerHTML=`
    <div class="page-header">
      <h1 class="page-title">System Settings</h1>
      <p class="page-subtitle">Manage company configuration and organizational structure</p>
    </div>
    <div class="card mb-4">
      <nav class="nav" style="display: flex; gap: 0.5rem; padding: 0.5rem; background: var(--bg-secondary); border-radius: 8px; margin-bottom: 1.5rem;">
        <button class="nav-item active" data-tab="company">Company Settings</button>
        <button class="nav-item" data-tab="organization">Organization</button>
        <button class="nav-item" data-tab="holidays">Holidays</button>
        <button class="nav-item" data-tab="biometric">Biometric Device</button>
      </nav>
      <div id="tab-content"></div>
    </div>
  `;const e=a.querySelector("#tab-content"),t=a.querySelectorAll(".nav-item");return t.forEach(s=>{s.addEventListener("click",()=>{t.forEach(r=>r.classList.remove("active")),s.classList.add("active");const n=s.dataset.tab;e.innerHTML="",n==="company"?e.appendChild(Lt()):n==="organization"?e.appendChild(Gr()):n==="holidays"?e.appendChild(Kr()):n==="biometric"&&e.appendChild(ai())})}),e.appendChild(Lt()),a}function Rt(a){const e=document.querySelector("#dashboard-content");if(e){sessionStorage.setItem("hrms_current_page",a),e.innerHTML="";try{switch(a){case"dashboard":e.appendChild(La(de,Rt));break;case"attendance":e.appendChild(ii());break;case"leaves":e.appendChild(mi());break;case"shifts":e.appendChild(xi());break;case"salary":e.appendChild(Ri());break;case"documents":e.appendChild(po());break;case"profile":e.appendChild(mo());break;case"performance":e.appendChild(Hi());break;case"exit":e.appendChild(Zi());break;case"employees":e.appendChild(Jr());break;case"payroll":e.appendChild($i());break;case"reports":e.appendChild(no());break;case"settings":e.appendChild(ko());break;case"company":e.appendChild(Lt());break;case"team":e.appendChild(yo());break;case"approvals":e.appendChild(ji());break;case"announcements":e.appendChild(vo());break;default:if(a.startsWith("payslip/")){const t=a.substring(8);e.appendChild(Li(t))}else e.innerHTML=`<div class="p-4">Page Not Found: ${a}</div>`}So(a)}catch(t){console.error(`Navigation error for page ${a}:`,t),e.innerHTML=`<div class="alert alert-danger">Error loading page: ${t.message}</div>`}}}function Eo(a){de=a,Ba()}async function It(){de=null,await S.logout(),sessionStorage.removeItem("hrms_current_page"),window.history.pushState({},"","/login"),Ha()}function Ha(){qe.innerHTML="",qe.appendChild(Or(Eo))}function Ba(){try{qe.innerHTML="";const a=Mr(de,It,Rt);qe.appendChild(a),xo(Rt,It)}catch(a){console.error("Dashboard render error:",a),qe.innerHTML=`<div style="padding: 2rem; color: white;">Error rendering dashboard: ${a.message}</div>`}}async function $o(){try{console.log("Starting application bootstrap...");try{await Sr(),await Lr()||await kr(),console.log("Supabase data initialized")}catch(a){console.error("Seed data error (non-fatal):",a)}if(S.isAuthenticated()){if(de=S.getCurrentUser(),console.log("User authenticated:",de?de.name:"Unknown"),!de)throw new Error("Authenticated but user data missing");window.location.pathname==="/login"&&window.history.pushState({},"","/"),Ba()}else console.log("User not authenticated, showing login"),window.location.pathname!=="/login"&&window.history.pushState({},"","/login"),Ha()}catch(a){if(console.error("Bootstrap error:",a),a.message.includes("user")||a.message.includes("Authenticated")){console.warn("Clearing invalid session and reloading..."),await S.logout(),window.location.reload();return}throw a}}window.handleLogoutClick=async function(){await It()};console.log("Executing main.js...");$o();
