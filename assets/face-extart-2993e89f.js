import{r as b,j as c,a as U}from"./index-5abb584a.js";import{s as S,O as L,$ as j,S as k}from"./face-api.esm-bba85acd.js";"stream"in Blob.prototype||Object.defineProperty(Blob.prototype,"stream",{value(){return new Response(this).body}}),"setBigUint64"in DataView.prototype||Object.defineProperty(DataView.prototype,"setBigUint64",{value(t,e,i){const n=Number(0xffffffffn&e),a=Number(e>>32n);this.setUint32(t+(i?0:4),n,i),this.setUint32(t+(i?4:0),a,i)}});var p=t=>new DataView(new ArrayBuffer(t)),h=t=>new Uint8Array(t.buffer||t),y=t=>new TextEncoder().encode(String(t)),A=t=>Math.min(4294967295,Number(t)),v=t=>Math.min(65535,Number(t));function z(t,e){if(e===void 0||e instanceof Date||(e=new Date(e)),t instanceof File)return{isFile:1,t:e||new Date(t.lastModified),i:t.stream()};if(t instanceof Response)return{isFile:1,t:e||new Date(t.headers.get("Last-Modified")||Date.now()),i:t.body};if(e===void 0)e=new Date;else if(isNaN(e))throw new Error("Invalid modification date.");if(t===void 0)return{isFile:0,t:e};if(typeof t=="string")return{isFile:1,t:e,i:y(t)};if(t instanceof Blob)return{isFile:1,t:e,i:t.stream()};if(t instanceof Uint8Array||t instanceof ReadableStream)return{isFile:1,t:e,i:t};if(t instanceof ArrayBuffer||ArrayBuffer.isView(t))return{isFile:1,t:e,i:h(t)};if(Symbol.asyncIterator in t)return{isFile:1,t:e,i:C(t)};throw new TypeError("Unsupported input format.")}function C(t){const e="next"in t?t:t[Symbol.asyncIterator]();return new ReadableStream({async pull(i){let n=0;for(;i.desiredSize>n;){const a=await e.next();if(!a.value){i.close();break}{const f=M(a.value);i.enqueue(f),n+=f.byteLength}}}})}function M(t){return typeof t=="string"?y(t):t instanceof Uint8Array?t:h(t)}function E(t,e,i){if(e===void 0||e instanceof Uint8Array||(e=y(e)),t instanceof File)return{o:x(e||y(t.name)),A:BigInt(t.size)};if(t instanceof Response){const n=t.headers.get("content-disposition"),a=n&&n.match(/;\s*filename\*?=["']?(.*?)["']?$/i),f=a&&a[1]||t.url&&new URL(t.url).pathname.split("/").findLast(Boolean),l=f&&decodeURIComponent(f),r=i||+t.headers.get("content-length");return{o:x(e||y(l)),A:BigInt(r)}}return e=x(e,t!==void 0||i!==void 0),typeof t=="string"?{o:e,A:BigInt(y(t).length)}:t instanceof Blob?{o:e,A:BigInt(t.size)}:t instanceof ArrayBuffer||ArrayBuffer.isView(t)?{o:e,A:BigInt(t.byteLength)}:{o:e,A:O(t,i)}}function O(t,e){return e>-1?BigInt(e):t?void 0:0n}function x(t,e=1){if(!t||t.every(i=>i===47))throw new Error("The file must have a name.");if(e)for(;t[t.length-1]===47;)t=t.subarray(0,-1);else t[t.length-1]!==47&&(t=new Uint8Array([...t,47]));return t}var G=new WebAssembly.Instance(new WebAssembly.Module(Uint8Array.from(atob("AGFzbQEAAAABCgJgAABgAn9/AXwDAwIAAQUDAQACBwkCAW0CAAFjAAEIAQAKlQECSQEDfwNAIAEhAEEAIQIDQCAAQQF2IABBAXFBoIbi7X5scyEAIAJBAWoiAkEIRw0ACyABQQJ0IAA2AgAgAUEBaiIBQYACRw0ACwtJAQF/IAFBf3MhAUGAgAQhAkGAgAQgAGohAANAIAFB/wFxIAItAABzQQJ0KAIAIAFBCHZzIQEgAkEBaiICIABJDQALIAFBf3O4Cw"),t=>t.charCodeAt(0)))),{c:J,m:W}=G.exports,T=h(W).subarray(65536);function F(t,e=0){for(const i of function*(n){for(;n.length>65536;)yield n.subarray(0,65536),n=n.subarray(65536);n.length&&(yield n)}(t))T.set(i),e=J(i.length,e);return e}function N(t,e,i=0){const n=t.getSeconds()>>1|t.getMinutes()<<5|t.getHours()<<11,a=t.getDate()|t.getMonth()+1<<5|t.getFullYear()-1980<<9;e.setUint16(i,n,1),e.setUint16(i+2,a,1)}function V(t){const e=p(30);return e.setUint32(0,1347093252),e.setUint32(4,754976768),N(t.t,e,10),e.setUint16(26,t.o.length,1),h(e)}async function*$(t){let{i:e}=t;if("then"in e&&(e=await e),e instanceof Uint8Array)yield e,t.u=F(e,0),t.A=BigInt(e.length);else{t.A=0n;const i=e.getReader();for(;;){const{value:n,done:a}=await i.read();if(a)break;t.u=F(n,t.u),t.A+=BigInt(n.length),yield n}}}function X(t,e){const i=p(16+(e?8:0));return i.setUint32(0,1347094280),i.setUint32(4,t.isFile?t.u:0,1),e?(i.setBigUint64(8,t.A,1),i.setBigUint64(16,t.A,1)):(i.setUint32(8,A(t.A),1),i.setUint32(12,A(t.A),1)),h(i)}function P(t,e,i=0){const n=p(46);return n.setUint32(0,1347092738),n.setUint32(4,755182848),n.setUint16(8,2048),N(t.t,n,12),n.setUint32(16,t.isFile?t.u:0,1),n.setUint32(20,A(t.A),1),n.setUint32(24,A(t.A),1),n.setUint16(28,t.o.length,1),n.setUint16(30,i,1),n.setUint16(40,t.isFile?33204:16893,1),n.setUint32(42,A(e),1),h(n)}function H(t,e,i){const n=p(i);return n.setUint16(0,1,1),n.setUint16(2,i-4,1),16&i&&(n.setBigUint64(4,t.A,1),n.setBigUint64(12,t.A,1)),n.setBigUint64(i-8,e,1),h(n)}function Q(t){return t instanceof File||t instanceof Response?[[t],[t]]:[[t.input,t.name,t.size],[t.input,t.lastModified]]}var K=t=>function(e){let i=BigInt(22),n=0n,a=0;for(const f of e){if(!f.o)throw new Error("Every file must have a non-empty name.");if(f.A===void 0)throw new Error(`Missing size for file "${new TextDecoder().decode(f.o)}".`);const l=f.A>=0xffffffffn,r=n>=0xffffffffn;n+=BigInt(46+f.o.length+(l&&8))+f.A,i+=BigInt(f.o.length+46+(12*r|28*l)),a||(a=l)}return(a||n>=0xffffffffn)&&(i+=BigInt(76)),i+n}(function*(e){for(const i of e)yield E(...Q(i)[0])}(t));function Y(t,e={}){const i={"Content-Type":"application/zip","Content-Disposition":"attachment"};return(typeof e.length=="bigint"||Number.isInteger(e.length))&&e.length>0&&(i["Content-Length"]=String(e.length)),e.metadata&&(i["Content-Length"]=String(K(e.metadata))),new Response(q(t),{headers:i})}function q(t){return C(async function*(e){const i=[];let n=0n,a=0n,f=0;for await(const o of e){yield V(o),yield o.o,o.isFile&&(yield*$(o));const d=o.A>=0xffffffffn,w=12*(n>=0xffffffffn)|28*d;yield X(o,d),i.push(P(o,n,w)),i.push(o.o),w&&i.push(H(o,n,w)),d&&(n+=8n),a++,n+=BigInt(46+o.o.length)+o.A,f||(f=d)}let l=0n;for(const o of i)yield o,l+=BigInt(o.length);if(f||n>=0xffffffffn){const o=p(76);o.setUint32(0,1347094022),o.setBigUint64(4,BigInt(44),1),o.setUint32(12,755182848),o.setBigUint64(24,a,1),o.setBigUint64(32,a,1),o.setBigUint64(40,l,1),o.setBigUint64(48,n,1),o.setUint32(56,1347094023),o.setBigUint64(64,n+l,1),o.setUint32(72,1,1),yield h(o)}const r=p(22);r.setUint32(0,1347093766),r.setUint16(8,v(a),1),r.setUint16(10,v(a),1),r.setUint32(12,A(l),1),r.setUint32(16,A(n),1),yield h(r)}(async function*(e){for await(const i of e){const[n,a]=Q(i);yield Object.assign(z(...a),E(...n))}}(t)))}const et=()=>{const[t,e]=b.useState(!0),[i,n]=b.useState([]),[a,f]=b.useState();b.useEffect(()=>{(async()=>(await S("./weights"),e(!1)))()},[]);const l=b.useCallback(async()=>{e(!0);const r=[];for(const w of i){const D=new L({minConfidence:.45}),m=await j(w),g=(await k(m,D))[0];if(!g)continue;let u=document.createElement("canvas"),B=u.getContext("2d");if(!B)return;const s={x:g.box.x,y:g.box.y,width:1.25*g.box.width,height:1.25*g.box.height};s.x-=(s.width-g.box.width)/2,s.y-=(s.height-g.box.height)/2,s.width<s.height&&(s.x-=(s.height-s.width)/2,s.width=s.height),s.height<s.width&&(s.y-=(s.width-s.height)/2,s.height=s.width),s.x<0&&(s.x=0),s.x+s.width>m.width&&(s.width=m.width-s.x),s.y<0&&(s.y=0),s.y+s.height>m.height&&(s.height=m.height-s.y),s.width>s.height&&(s.x+=(s.width-s.height)/2,s.width=s.height),s.height>s.width&&(s.y+=(s.height-s.width)/2,s.height=s.width),u.height=u.width=a||512,B.drawImage(m,s.x,s.y,s.width,s.height,0,0,u.width,u.height),await new Promise(R=>{u.toBlob(function(I){I&&r.push({name:w.name,lastModified:new Date,input:I}),u.width=u.height=0,R()},"image/jpeg")})}const o=await Y(r).blob(),d=document.createElement("a");d.href=URL.createObjectURL(o),d.download="test.zip",d.click(),d.remove(),e(!1)},[i]);return c("div",{className:"",children:c("div",{className:"border-base-300 bg-base-200 rounded-b-box rounded-tr-box flex min-h-screen min-w-[18rem] max-w-full flex-wrap items-center justify-center gap-2 overflow-x-hidden border bg-cover bg-top p-4 undefined",style:{backgroundSize:"5px 5px"},children:U("div",{className:"card w-1/2 min-h-[500px] bg-base-100 shadow-xl v-full",children:[c("h2",{className:"font-bold ml-3",children:"FaceExtart"}),U("div",{className:"card-body",children:[U("h2",{className:"card-title flex justify-between",children:[c("input",{className:"file-input w-full max-w-xs",type:"file",multiple:!0,onChange:r=>{const o=r.target.files||[];for(const d of o)d.url=URL.createObjectURL(d);n([...i,...o])}}),U("div",{className:"flex items-center gap-3",children:[c("div",{className:"form-control w-full max-w-xs",children:c("input",{type:"text",placeholder:"output width default:512",className:"input input-bordered w-full max-w-xs",value:a,onChange:r=>{f(+r.target.value)}})}),c("button",{className:`btn btn-primary ${t&&"loading"}`,disabled:t,onClick:l,children:"Go"})]})]}),c("div",{className:"divider"}),c("div",{className:"waterfall-container",children:i.map((r,o)=>U("div",{className:"indicator waterfall-card",children:[c("span",{className:"indicator-item badge cursor-pointer bg-red",onClick:()=>{i.splice(o,1),URL.revokeObjectURL(r.url),n([...i])},children:"X"}),c("div",{className:"card bg-base-100 shadow-xl overflow-hidden",children:c("figure",{children:c("img",{src:r.url,alt:"Shoes"})})})]}))})]})]})})})};export{et as default};
