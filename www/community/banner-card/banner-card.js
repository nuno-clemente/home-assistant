!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).BannerCard=e()}(this,function(){"use strict";const t=new WeakMap,e=e=>"function"==typeof e&&t.has(e),i=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,s=(t,e,i=null)=>{let s=e;for(;s!==i;){const e=s.nextSibling;t.removeChild(s),s=e}},n={},r={},o=`{{lit-${String(Math.random()).slice(2)}}}`,a=`\x3c!--${o}--\x3e`,c=new RegExp(`${o}|${a}`),l="$lit$";class h{constructor(t,e){this.parts=[],this.element=e;let i=-1,s=0;const n=[],r=e=>{const a=e.content,h=document.createTreeWalker(a,133,null,!1);let d=0;for(;h.nextNode();){i++;const e=h.currentNode;if(1===e.nodeType){if(e.hasAttributes()){const n=e.attributes;let r=0;for(let t=0;t<n.length;t++)n[t].value.indexOf(o)>=0&&r++;for(;r-- >0;){const n=t.strings[s],r=p.exec(n)[2],o=r.toLowerCase()+l,a=e.getAttribute(o).split(c);this.parts.push({type:"attribute",index:i,name:r,strings:a}),e.removeAttribute(o),s+=a.length-1}}"TEMPLATE"===e.tagName&&r(e)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(o)>=0){const r=e.parentNode,o=t.split(c),a=o.length-1;for(let t=0;t<a;t++)r.insertBefore(""===o[t]?u():document.createTextNode(o[t]),e),this.parts.push({type:"node",index:++i});""===o[a]?(r.insertBefore(u(),e),n.push(e)):e.data=o[a],s+=a}}else if(8===e.nodeType)if(e.data===o){const t=e.parentNode;null!==e.previousSibling&&i!==d||(i++,t.insertBefore(u(),e)),d=i,this.parts.push({type:"node",index:i}),null===e.nextSibling?e.data="":(n.push(e),i--),s++}else{let t=-1;for(;-1!==(t=e.data.indexOf(o,t+1));)this.parts.push({type:"node",index:-1})}}};r(e);for(const t of n)t.parentNode.removeChild(t)}}const d=t=>-1!==t.index,u=()=>document.createComment(""),p=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;class m{constructor(t,e,i){this._parts=[],this.template=t,this.processor=e,this.options=i}update(t){let e=0;for(const i of this._parts)void 0!==i&&i.setValue(t[e]),e++;for(const t of this._parts)void 0!==t&&t.commit()}_clone(){const t=i?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=this.template.parts;let s=0,n=0;const r=t=>{const i=document.createTreeWalker(t,133,null,!1);let o=i.nextNode();for(;s<e.length&&null!==o;){const t=e[s];if(d(t))if(n===t.index){if("node"===t.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(o.previousSibling),this._parts.push(t)}else this._parts.push(...this.processor.handleAttributeExpressions(o,t.name,t.strings,this.options));s++}else n++,"TEMPLATE"===o.nodeName&&r(o.content),o=i.nextNode();else this._parts.push(void 0),s++}};return r(t),i&&(document.adoptNode(t),customElements.upgrade(t)),t}}class f{constructor(t,e,i,s){this.strings=t,this.values=e,this.type=i,this.processor=s}getHTML(){const t=this.strings.length-1;let e="";for(let i=0;i<t;i++){const t=this.strings[i],s=p.exec(t);e+=s?t.substr(0,s.index)+s[1]+s[2]+l+s[3]+o:t+a}return e+this.strings[t]}getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}const y=t=>null===t||!("object"==typeof t||"function"==typeof t);class g{constructor(t,e,i){this.dirty=!0,this.element=t,this.name=e,this.strings=i,this.parts=[];for(let t=0;t<i.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new v(this)}_getValue(){const t=this.strings,e=t.length-1;let i="";for(let s=0;s<e;s++){i+=t[s];const e=this.parts[s];if(void 0!==e){const t=e.value;if(null!=t&&(Array.isArray(t)||"string"!=typeof t&&t[Symbol.iterator]))for(const e of t)i+="string"==typeof e?e:String(e);else i+="string"==typeof t?t:String(t)}}return i+=t[e]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class v{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===n||y(t)&&t===this.value||(this.value=t,e(t)||(this.committer.dirty=!0))}commit(){for(;e(this.value);){const t=this.value;this.value=n,t(this)}this.value!==n&&this.committer.commit()}}class _{constructor(t){this.value=void 0,this._pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(u()),this.endNode=t.appendChild(u())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t._insert(this.startNode=u()),t._insert(this.endNode=u())}insertAfterPart(t){t._insert(this.startNode=u()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this._pendingValue=t}commit(){for(;e(this._pendingValue);){const t=this._pendingValue;this._pendingValue=n,t(this)}const t=this._pendingValue;t!==n&&(y(t)?t!==this.value&&this._commitText(t):t instanceof f?this._commitTemplateResult(t):t instanceof Node?this._commitNode(t):Array.isArray(t)||t[Symbol.iterator]?this._commitIterable(t):t===r?(this.value=r,this.clear()):this._commitText(t))}_insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}_commitNode(t){this.value!==t&&(this.clear(),this._insert(t),this.value=t)}_commitText(t){const e=this.startNode.nextSibling;t=null==t?"":t,e===this.endNode.previousSibling&&3===e.nodeType?e.data=t:this._commitNode(document.createTextNode("string"==typeof t?t:String(t))),this.value=t}_commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof m&&this.value.template===e)this.value.update(t.values);else{const i=new m(e,t.processor,this.options),s=i._clone();i.update(t.values),this._commitNode(s),this.value=i}}_commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let i,s=0;for(const n of t)void 0===(i=e[s])&&(i=new _(this.options),e.push(i),0===s?i.appendIntoPart(this):i.insertAfterPart(e[s-1])),i.setValue(n),i.commit(),s++;s<e.length&&(e.length=s,this.clear(i&&i.endNode))}clear(t=this.startNode){s(this.startNode.parentNode,t.nextSibling,this.endNode)}}class b{constructor(t,e,i){if(this.value=void 0,this._pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=i}setValue(t){this._pendingValue=t}commit(){for(;e(this._pendingValue);){const t=this._pendingValue;this._pendingValue=n,t(this)}if(this._pendingValue===n)return;const t=!!this._pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)),this.value=t,this._pendingValue=n}}class w extends g{constructor(t,e,i){super(t,e,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new S(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class S extends v{}let x=!1;try{const t={get capture(){return x=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}class P{constructor(t,e,i){this.value=void 0,this._pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=i,this._boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this._pendingValue=t}commit(){for(;e(this._pendingValue);){const t=this._pendingValue;this._pendingValue=n,t(this)}if(this._pendingValue===n)return;const t=this._pendingValue,i=this.value,s=null==t||null!=i&&(t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive),r=null!=t&&(null==i||s);s&&this.element.removeEventListener(this.eventName,this._boundHandleEvent,this._options),r&&(this._options=C(t),this.element.addEventListener(this.eventName,this._boundHandleEvent,this._options)),this.value=t,this._pendingValue=n}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const C=t=>t&&(x?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);const N=new class{handleAttributeExpressions(t,e,i,s){const n=e[0];if("."===n){return new w(t,e.slice(1),i).parts}return"@"===n?[new P(t,e.slice(1),s.eventContext)]:"?"===n?[new b(t,e.slice(1),i)]:new g(t,e,i).parts}handleTextExpression(t){return new _(t)}};function $(t){let e=k.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},k.set(t.type,e));let i=e.stringsArray.get(t.strings);if(void 0!==i)return i;const s=t.strings.join(o);return void 0===(i=e.keyString.get(s))&&(i=new h(t,t.getTemplateElement()),e.keyString.set(s,i)),e.stringsArray.set(t.strings,i),i}const k=new Map,A=new WeakMap;(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.0.0");const E=(t,...e)=>new f(t,e,"html",N),T=133;function V(t,e){const{element:{content:i},parts:s}=t,n=document.createTreeWalker(i,T,null,!1);let r=O(s),o=s[r],a=-1,c=0;const l=[];let h=null;for(;n.nextNode();){a++;const t=n.currentNode;for(t.previousSibling===h&&(h=null),e.has(t)&&(l.push(t),null===h&&(h=t)),null!==h&&c++;void 0!==o&&o.index===a;)o.index=null!==h?-1:o.index-c,o=s[r=O(s,r)]}l.forEach(t=>t.parentNode.removeChild(t))}const z=t=>{let e=11===t.nodeType?0:1;const i=document.createTreeWalker(t,T,null,!1);for(;i.nextNode();)e++;return e},O=(t,e=-1)=>{for(let i=e+1;i<t.length;i++){const e=t[i];if(d(e))return i}return-1};const j=(t,e)=>`${t}--${e}`;let M=!0;void 0===window.ShadyCSS?M=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected.Please update to at least @webcomponents/webcomponentsjs@2.0.2 and@webcomponents/shadycss@1.3.1."),M=!1);const U=t=>e=>{const i=j(e.type,t);let s=k.get(i);void 0===s&&(s={stringsArray:new WeakMap,keyString:new Map},k.set(i,s));let n=s.stringsArray.get(e.strings);if(void 0!==n)return n;const r=e.strings.join(o);if(void 0===(n=s.keyString.get(r))){const i=e.getTemplateElement();M&&window.ShadyCSS.prepareTemplateDom(i,t),n=new h(e,i),s.keyString.set(r,n)}return s.stringsArray.set(e.strings,n),n},R=["html","svg"],q=new Set,I=(t,e,i)=>{q.add(i);const s=t.querySelectorAll("style");if(0===s.length)return void window.ShadyCSS.prepareTemplateStyles(e.element,i);const n=document.createElement("style");for(let t=0;t<s.length;t++){const e=s[t];e.parentNode.removeChild(e),n.textContent+=e.textContent}if((t=>{R.forEach(e=>{const i=k.get(j(e,t));void 0!==i&&i.keyString.forEach(t=>{const{element:{content:e}}=t,i=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{i.add(t)}),V(t,i)})})})(i),function(t,e,i=null){const{element:{content:s},parts:n}=t;if(null==i)return void s.appendChild(e);const r=document.createTreeWalker(s,T,null,!1);let o=O(n),a=0,c=-1;for(;r.nextNode();){for(c++,r.currentNode===i&&(a=z(e),i.parentNode.insertBefore(e,i));-1!==o&&n[o].index===c;){if(a>0){for(;-1!==o;)n[o].index+=a,o=O(n,o);return}o=O(n,o)}}}(e,n,e.element.content.firstChild),window.ShadyCSS.prepareTemplateStyles(e.element,i),window.ShadyCSS.nativeShadow){const i=e.element.content.querySelector("style");t.insertBefore(i.cloneNode(!0),t.firstChild)}else{e.element.content.insertBefore(n,e.element.content.firstChild);const t=new Set;t.add(n),V(e,t)}};window.JSCompiler_renameProperty=(t,e)=>t;const F={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},H=(t,e)=>e!==t&&(e==e||t==t),B={attribute:!0,type:String,converter:F,reflect:!1,hasChanged:H},D=Promise.resolve(!0),L=1,W=4,J=8,Y=16,G=32,K="finalized";class Q extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=D,this._hasConnectedResolver=void 0,this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,i)=>{const s=this._attributeNameForProperty(i,e);void 0!==s&&(this._attributeToPropertyMap.set(s,i),t.push(s))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=B){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const i="symbol"==typeof t?Symbol():`__${t}`;Object.defineProperty(this.prototype,t,{get(){return this[i]},set(e){const s=this[t];this[i]=e,this._requestUpdate(t,s)},configurable:!0,enumerable:!0})}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty(K)||t.finalize(),this[K]=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const i of e)this.createProperty(i,t[i])}}static _attributeNameForProperty(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,i=H){return i(t,e)}static _propertyValueFromAttribute(t,e){const i=e.type,s=e.converter||F,n="function"==typeof s?s:s.fromAttribute;return n?n(t,i):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const i=e.type,s=e.converter;return(s&&s.toAttribute||F.toAttribute)(t,i)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this._updateState=this._updateState|G,this._hasConnectedResolver&&(this._hasConnectedResolver(),this._hasConnectedResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,i){e!==i&&this._attributeToProperty(t,i)}_propertyToAttribute(t,e,i=B){const s=this.constructor,n=s._attributeNameForProperty(t,i);if(void 0!==n){const t=s._propertyValueToAttribute(e,i);if(void 0===t)return;this._updateState=this._updateState|J,null==t?this.removeAttribute(n):this.setAttribute(n,t),this._updateState=this._updateState&~J}}_attributeToProperty(t,e){if(this._updateState&J)return;const i=this.constructor,s=i._attributeToPropertyMap.get(t);if(void 0!==s){const t=i._classProperties.get(s)||B;this._updateState=this._updateState|Y,this[s]=i._propertyValueFromAttribute(e,t),this._updateState=this._updateState&~Y}}_requestUpdate(t,e){let i=!0;if(void 0!==t){const s=this.constructor,n=s._classProperties.get(t)||B;s._valueHasChanged(this[t],e,n.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==n.reflect||this._updateState&Y||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,n))):i=!1}!this._hasRequestedUpdate&&i&&this._enqueueUpdate()}requestUpdate(t,e){return this._requestUpdate(t,e),this.updateComplete}async _enqueueUpdate(){let t,e;this._updateState=this._updateState|W;const i=this._updatePromise;this._updatePromise=new Promise((i,s)=>{t=i,e=s});try{await i}catch(t){}this._hasConnected||await new Promise(t=>this._hasConnectedResolver=t);try{const t=this.performUpdate();null!=t&&await t}catch(t){e(t)}t(!this._hasRequestedUpdate)}get _hasConnected(){return this._updateState&G}get _hasRequestedUpdate(){return this._updateState&W}get hasUpdated(){return this._updateState&L}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{(t=this.shouldUpdate(e))&&this.update(e)}catch(e){throw t=!1,e}finally{this._markUpdated()}t&&(this._updateState&L||(this._updateState=this._updateState|L,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~W}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0)}updated(t){}firstUpdated(t){}}Q[K]=!0;const X="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Z=Symbol();class tt{constructor(t,e){if(e!==Z)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(X?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}(window.litElementVersions||(window.litElementVersions=[])).push("2.2.1");const et=t=>t.flat?t.flat(1/0):function t(e,i=[]){for(let s=0,n=e.length;s<n;s++){const n=e[s];Array.isArray(n)?t(n,i):i.push(n)}return i}(t);class it extends Q{static finalize(){super.finalize.call(this),this._styles=this.hasOwnProperty(JSCompiler_renameProperty("styles",this))?this._getUniqueStyles():this._styles||[]}static _getUniqueStyles(){const t=this.styles,e=[];if(Array.isArray(t)){et(t).reduceRight((t,e)=>(t.add(e),t),new Set).forEach(t=>e.unshift(t))}else t&&e.push(t);return e}initialize(){super.initialize(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?X?this.renderRoot.adoptedStyleSheets=t.map(t=>t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){super.update(t);const e=this.render();e instanceof f&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){}}it.finalized=!0,it.render=(t,e,i)=>{const n=i.scopeName,r=A.has(e),o=e instanceof ShadowRoot&&M&&t instanceof f,a=o&&!q.has(n),c=a?document.createDocumentFragment():e;if(((t,e,i)=>{let n=A.get(e);void 0===n&&(s(e,e.firstChild),A.set(e,n=new _(Object.assign({templateFactory:$},i))),n.appendInto(e)),n.setValue(t),n.commit()})(t,c,Object.assign({templateFactory:U(n)},i)),a){const t=A.get(c);A.delete(c),t.value instanceof m&&I(c,t.value.template,n),s(e,e.firstChild),e.appendChild(c),A.set(e,t)}!r&&o&&window.ShadyCSS.styleElement(e.host)};var st=((t,...e)=>{const i=e.reduce((e,i,s)=>e+(t=>{if(t instanceof tt)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+t[s+1],t[0]);return new tt(i,Z)})`:host{--bc-font-size-heading:var(--banner-card-heading-size, 3em);--bc-font-size-entity-value:var(--banner-card-entity-value-size, 1.5em);--bc-font-size-media-title:var(--banner-card-media-title-size, 0.9em);--bc-spacing:var(--banner-card-spacing, 4px);--bc-button-size:var(--banner-card-button-size, 32px);--bc-heading-color-dark:var(
      --banner-card-heading-color-dark,
      var(--primary-text-color)
    );--bc-heading-color-light:var(--banner-card-heading-color-light, #fff)}ha-card{display:flex;flex-direction:column;align-items:center}a{cursor:pointer}paper-icon-button{width:var(--bc-button-size);height:var(--bc-button-size);padding:var(--bc-spacing)}.heading{display:flex;justify-content:center;align-items:center;font-size:var(--bc-font-size-heading);font-weight:300;cursor:pointer}ha-icon.heading-icon{--iron-icon-width:1em;--iron-icon-height:1em;margin:0 var(--bc-spacing)}.overlay-strip{background:rgba(0,0,0,.3);overflow:hidden;width:100%}.entities{padding:calc(var(--bc-spacing) * 2) 0;color:#fff;display:grid}.entity-state{display:flex;flex-direction:column;align-items:center;margin-top:var(--bc-spacing);margin-bottom:var(--bc-spacing);box-shadow:-1px 0 0 0 #fff;width:100%}.media-title{flex:1 0;overflow:hidden;font-weight:300;font-size:var(--bc-font-size-media-title);white-space:nowrap;text-overflow:ellipsis}.media-controls{display:flex;flex:0 0 calc(var(--bc-button-size) * 3)}.entity-state.expand .entity-value{width:100%}.entity-state-left{margin-right:auto;margin-left:16px}.entity-state-right{margin-left:auto;margin-right:16px}.entity-name{font-weight:700;white-space:nowrap;padding-top:calc(var(--bc-spacing) * 2);padding-bottom:calc(var(--bc-spacing) * 2)}.entity-value{display:flex;width:100%;flex:1 0;font-size:var(--bc-font-size-entity-value);align-items:center;justify-content:center}.entity-value.error{display:inline-block;word-wrap:break-word;font-size:16px;width:90%}.entity-value ha-icon{color:#fff}mwc-button{--mdc-theme-primary:white}mwc-switch{--mdc-theme-secondary:white}`;function nt({state:t,attributes:e},i=!1){return"string"==typeof i&&e.hasOwnProperty(i)?e[i]:t}function rt(t){return"object"==typeof t?(e=t,i=t=>!1===t?null:t,Object.entries(e).reduce((t,[e,s])=>({...t,[e]:i(s,e)}),{})):{entity:t};var e,i}const ot={"=":(t,e)=>e.includes(t),">":(t,e)=>t>e[0],"<":(t,e)=>t<e[0],"!=":(t,e)=>!e.includes(t)};function at(t,e){if(["string","number","boolean"].includes(typeof t))return ot["="](e,[t]);if(Array.isArray(t)){const[i,...s]=t;return ot.hasOwnProperty(i)?ot[i](e,s):ot["="](e,s)}throw new Error(`Couldn't find a valid matching strategy for '${t}'`)}var ct="banner-card";!function(t){console.info(`%c${ct}: ${t}`,"font-weight: bold")}("0.9.0");const lt=/^(mdi|hass):/;function ht(t){return"string"==typeof t&&t.match(lt)}function dt(t,e=null){return e?E`<a class=entity-name @click=${e}>${t}</a>`:E`<span class=entity-name>${t}</span>`}class ut extends it{static get properties(){return{config:Object,color:String,entities:Array,entityValues:Array,rowSize:Number,_hass:Object}}static get styles(){return[st]}constructor(){super(),this.config={},this.entities=[],this._hass={}}setConfig(t){if(void 0===t.heading)throw new Error("You need to define a heading");if(this.entities=(t.entities||[]).map(rt),this.config=t,this.color=t.color||function(t,e,i){if(!t||"#"!==t[0])return i;if(3===(t=t.substring(1)).length){const[e,i,s]=t;t=[e,e,i,i,s,s].join("")}if(6!==t.length)return i;const s=[parseInt(t.slice(0,2),16)/255,parseInt(t.slice(2,4),16)/255,parseInt(t.slice(4,6),16)/255],[n,r,o]=s.map(t=>t<=.03928?t/12.92:Math.pow((t+.055)/1.055,2.4));return.2126*n+.7152*r+.0722*o>.179?i:e}(t.background,"var(--bc-heading-color-light)","var(--bc-heading-color-dark)"),void 0!==t.row_size){if(t.row_size<1)throw new Error("row_size must be at least 1");this.rowSize=t.row_size}this.rowSize=this.rowSize||3}set hass(t){this._hass=t,this.entityValues=this.entities.filter(e=>(function(t,e){if(!e.hasOwnProperty(t.entity))return!1;if(t.when){const{state:i,entity:s=t.entity,attributes:n}="string"==typeof t.when?{state:t.when}:t.when,r=e[s];return!(void 0!==i&&!at(i,r.state))&&Object.entries(n||{}).every(([t,e])=>{return at(e,r.attributes[t])})}return!0})(e,t.states)).map(t=>this.parseEntity(t))}parseEntity(t){const e=this._hass;if(!e.states.hasOwnProperty(t.entity))return{...t,error:"Entity not ready"};const i=e.states[t.entity],s=i.attributes,n={};if(t.map_state&&i.state in t.map_state){const e=t.map_state[i.state],s=typeof e;"string"===s?n.value=e:"object"===s&&Object.entries(e).forEach(([t,e])=>{n[t]=e})}const r={name:s.friendly_name,state:i.state,value:nt(i,t.attribute),unit:s.unit_of_measurement,attributes:s,domain:t.entity.split(".")[0]};return s.hasOwnProperty("current_position")&&(r.state=s.current_position),{...r,...t,...n}}grid(t=1){return"full"===t||t>this.rowSize?`grid-column: span ${this.rowSize};`:`grid-column: span ${t};`}_service(t,e,i){return()=>this._hass.callService(t,e,{entity_id:i})}render(){return E`<ha-card style=background:${this.config.background}>${this.renderHeading()} ${this.renderEntities()}</ha-card>`}renderHeading(){let t=this.config.heading;if(!1===t)return null;Array.isArray(t)||(t=[t]);return E`<h2 class=heading @click=${()=>this.config.link&&this.navigate(this.config.link)} style=color:${this.color}>${t.map(t=>ht(t)?E`<ha-icon class=heading-icon .icon=${t}></ha-icon>`:E`<span>${t}</span>`)}</h2>`}renderEntities(){return 0===this.entityValues.length?null:E`<div class=overlay-strip><div class=entities style=grid-template-columns:repeat(${this.rowSize},1fr)>${this.entityValues.map(t=>{if(t.error)return E`<div class=entity-state style=${this.grid(t.size)}>${dt(t.error)} <span class="entity-value error">${t.entity}</span></div>`;const e={...t,onClick:()=>this.openEntityPopover(t.entity)};if(t.action)return this.renderCustom({...e,action:()=>{const{service:e,...i}=t.action,[s,n]=e.split(".");this._hass.callService(s,n,{entity_id:t.entity,...i})}});if(!t.attribute)switch(t.domain){case"light":case"switch":case"input_boolean":return this.renderAsToggle(e);case"cover":return this.renderDomainCover(e);case"media_player":return this.renderDomainMediaPlayer(e)}return this.renderDomainDefault(e)})}</div></div>`}renderValue({icon:t,value:e,image:i,action:s,click:n},r){return t||ht(e)?E`<ha-icon .icon=${t||e} @click=${n}></ha-icon>`:!0===i?E`<state-badge style="background-image:url('${e}')" @click=${n}></state-badge>`:r()}renderDomainDefault({value:t,unit:e,image:i,icon:s,name:n,size:r,onClick:o}){const a=this.renderValue({icon:s,image:i,value:t,click:o},()=>E`${t} ${e}`);return E`<a class=entity-state style=${this.grid(r)} @click=${o}>${dt(n,o)} <span class=entity-value>${a}</span></a>`}renderCustom({value:t,unit:e,action:i,image:s,icon:n,name:r,size:o,onClick:a}){const c=this.renderValue({icon:n,image:s,value:t,click:i},()=>E`<mwc-button ?dense=${!0} @click=${i}>${t} ${e}</mwc-button>`);return E`<div class=entity-state style=${this.grid(o)}>${dt(r,a)} <span class=entity-value>${c}</span></div>`}renderDomainMediaPlayer({onClick:t,attributes:e,size:i,name:s,state:n,entity:r,domain:o}){const a="playing"===n,c=a?"media_pause":"media_play",l=[e.media_artist,e.media_title].join(" – ");return E`<div class=entity-state style=${this.grid(i||"full")}>${dt(s,t)}<div class=entity-value><div class="entity-state-left media-title">${l}</div><div class="entity-state-right media-controls"><paper-icon-button icon=mdi:skip-previous role=button @click=${this._service(o,"media_previous_track",r)}></paper-icon-button><paper-icon-button icon=${a?"mdi:stop":"mdi:play"} role=button @click=${this._service(o,c,r)}></paper-icon-button><paper-icon-button icon=mdi:skip-next role=button @click=${this._service(o,"media_next_track",r)}></paper-icon-button></div></div></div>`}renderAsToggle({onClick:t,size:e,name:i,state:s,domain:n,entity:r}){return E`<div class=entity-state style=${this.grid(e)}>${dt(i,t)} <span class=entity-value><mwc-switch ?checked=${"on"===s} @click=${this._service(n,"toggle",r)}></mwc-switch></span></div>`}renderDomainCover({onClick:t,size:e,name:i,state:s,entity:n}){const r="closed"===s||0===s,o="open"===s||100===s;return E`<div class=entity-state style=${this.grid(e)}>${dt(i,t)} <span class=entity-value><paper-icon-button ?disabled=${o} icon=hass:arrow-up role=button @click=${this._service("cover","open_cover",n)}></paper-icon-button><paper-icon-button icon=hass:stop role=button @click=${this._service("cover","stop_cover",n)}></paper-icon-button><paper-icon-button ?disabled=${r} icon=hass:arrow-down role=button @click=${this._service("cover","close_cover",n)}></paper-icon-button></span></div>`}getCardSize(){return 3}navigate(t){history.pushState(null,"",t),this.fire("location-changed",{replace:!0})}openEntityPopover(t){this.fire("hass-more-info",{entityId:t})}fire(t,e,i){i=i||{},e=null==e?{}:e;const s=new Event(t,{bubbles:void 0===i.bubbles||i.bubbles,cancelable:Boolean(i.cancelable),composed:void 0===i.composed||i.composed});return s.detail=e,this.dispatchEvent(s),s}}return window.customElements.define("banner-card",ut),ut});