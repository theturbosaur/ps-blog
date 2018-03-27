function receiveIframeMessage(t){if("file:"==window.location.protocol||t.origin===window.location.protocol+"//"+window.location.host){var e,n={};try{n="string"!=typeof t.data?t.data:JSON.parse(t.data)}catch(o){}if(void 0!==n.event&&"patternLab.updatePath"==n.event)if(void 0!==patternData.patternPartial){var i=/(patterns|snapshots)\/(.*)$/;e=window.location.protocol+"//"+window.location.host+window.location.pathname.replace(i,"")+n.path+"?"+Date.now(),window.location.replace(e)}else e=window.location.protocol+"//"+window.location.host+window.location.pathname.replace("styleguide/html/styleguide.html","")+n.path+"?"+Date.now(),window.location.replace(e);else void 0!==n.event&&"patternLab.reload"==n.event&&window.location.reload()}}if(self!=top){var path=window.location.toString(),parts=path.split("?"),options={event:"patternLab.pageLoad",path:parts[0]};patternData=document.getElementById("pl-pattern-data-footer").innerHTML,patternData=JSON.parse(patternData),options.patternpartial=void 0!==patternData.patternPartial?patternData.patternPartial:"all",""!==patternData.lineage&&(options.lineage=patternData.lineage);var targetOrigin="file:"==window.location.protocol?"*":window.location.protocol+"//"+window.location.host;parent.postMessage(options,targetOrigin);for(var aTags=document.getElementsByTagName("a"),i=0;i<aTags.length;i++)aTags[i].onclick=function(t){var e=this.getAttribute("href"),n=this.getAttribute("target");if(void 0===n||"_parent"!=n&&"_blank"!=n){if(!e||"#"===e)return t.preventDefault(),!1;t.preventDefault(),window.location.replace(e)}else;}}window.addEventListener("message",receiveIframeMessage,!1),!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.Clipboard=t()}}(function(){var t;return function e(t,n,o){function i(a,l){if(!n[a]){if(!t[a]){var c="function"==typeof require&&require;if(!l&&c)return c(a,!0);if(r)return r(a,!0);var s=new Error("Cannot find module '"+a+"'");throw s.code="MODULE_NOT_FOUND",s}var u=n[a]={exports:{}};t[a][0].call(u.exports,function(e){var n=t[a][1][e];return i(n||e)},u,u.exports,e,t,n,o)}return n[a].exports}for(var r="function"==typeof require&&require,a=0;a<o.length;a++)i(o[a]);return i}({1:[function(t,e,n){function o(t,e){for(;t&&t.nodeType!==i;){if("function"==typeof t.matches&&t.matches(e))return t;t=t.parentNode}}var i=9;if("undefined"!=typeof Element&&!Element.prototype.matches){var r=Element.prototype;r.matches=r.matchesSelector||r.mozMatchesSelector||r.msMatchesSelector||r.oMatchesSelector||r.webkitMatchesSelector}e.exports=o},{}],2:[function(t,e,n){function o(t,e,n,o,r){var a=i.apply(this,arguments);return t.addEventListener(n,a,r),{destroy:function(){t.removeEventListener(n,a,r)}}}function i(t,e,n,o){return function(n){n.delegateTarget=r(n.target,e),n.delegateTarget&&o.call(t,n)}}var r=t("./closest");e.exports=o},{"./closest":1}],3:[function(t,e,n){n.node=function(t){return void 0!==t&&t instanceof HTMLElement&&1===t.nodeType},n.nodeList=function(t){var e=Object.prototype.toString.call(t);return void 0!==t&&("[object NodeList]"===e||"[object HTMLCollection]"===e)&&"length"in t&&(0===t.length||n.node(t[0]))},n.string=function(t){return"string"==typeof t||t instanceof String},n.fn=function(t){return"[object Function]"===Object.prototype.toString.call(t)}},{}],4:[function(t,e,n){function o(t,e,n){if(!t&&!e&&!n)throw new Error("Missing required arguments");if(!l.string(e))throw new TypeError("Second argument must be a String");if(!l.fn(n))throw new TypeError("Third argument must be a Function");if(l.node(t))return i(t,e,n);if(l.nodeList(t))return r(t,e,n);if(l.string(t))return a(t,e,n);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")}function i(t,e,n){return t.addEventListener(e,n),{destroy:function(){t.removeEventListener(e,n)}}}function r(t,e,n){return Array.prototype.forEach.call(t,function(t){t.addEventListener(e,n)}),{destroy:function(){Array.prototype.forEach.call(t,function(t){t.removeEventListener(e,n)})}}}function a(t,e,n){return c(document.body,t,e,n)}var l=t("./is"),c=t("delegate");e.exports=o},{"./is":3,delegate:2}],5:[function(t,e,n){function o(t){var e;if("SELECT"===t.nodeName)t.focus(),e=t.value;else if("INPUT"===t.nodeName||"TEXTAREA"===t.nodeName){var n=t.hasAttribute("readonly");n||t.setAttribute("readonly",""),t.select(),t.setSelectionRange(0,t.value.length),n||t.removeAttribute("readonly"),e=t.value}else{t.hasAttribute("contenteditable")&&t.focus();var o=window.getSelection(),i=document.createRange();i.selectNodeContents(t),o.removeAllRanges(),o.addRange(i),e=o.toString()}return e}e.exports=o},{}],6:[function(t,e,n){function o(){}o.prototype={on:function(t,e,n){var o=this.e||(this.e={});return(o[t]||(o[t]=[])).push({fn:e,ctx:n}),this},once:function(t,e,n){function o(){i.off(t,o),e.apply(n,arguments)}var i=this;return o._=e,this.on(t,o,n)},emit:function(t){var e=[].slice.call(arguments,1),n=((this.e||(this.e={}))[t]||[]).slice(),o=0,i=n.length;for(o;o<i;o++)n[o].fn.apply(n[o].ctx,e);return this},off:function(t,e){var n=this.e||(this.e={}),o=n[t],i=[];if(o&&e)for(var r=0,a=o.length;r<a;r++)o[r].fn!==e&&o[r].fn._!==e&&i.push(o[r]);return i.length?n[t]=i:delete n[t],this}},e.exports=o},{}],7:[function(e,n,o){!function(i,r){if("function"==typeof t&&t.amd)t(["module","select"],r);else if(void 0!==o)r(n,e("select"));else{var a={exports:{}};r(a,i.select),i.clipboardAction=a.exports}}(this,function(t,e){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var i=n(e),r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),l=function(){function t(e){o(this,t),this.resolveOptions(e),this.initSelection()}return a(t,[{key:"resolveOptions",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action=t.action,this.container=t.container,this.emitter=t.emitter,this.target=t.target,this.text=t.text,this.trigger=t.trigger,this.selectedText=""}},{key:"initSelection",value:function(){this.text?this.selectFake():this.target&&this.selectTarget()}},{key:"selectFake",value:function(){var t=this,e="rtl"==document.documentElement.getAttribute("dir");this.removeFake(),this.fakeHandlerCallback=function(){return t.removeFake()},this.fakeHandler=this.container.addEventListener("click",this.fakeHandlerCallback)||!0,this.fakeElem=document.createElement("textarea"),this.fakeElem.style.fontSize="12pt",this.fakeElem.style.border="0",this.fakeElem.style.padding="0",this.fakeElem.style.margin="0",this.fakeElem.style.position="absolute",this.fakeElem.style[e?"right":"left"]="-9999px";var n=window.pageYOffset||document.documentElement.scrollTop;this.fakeElem.style.top=n+"px",this.fakeElem.setAttribute("readonly",""),this.fakeElem.value=this.text,this.container.appendChild(this.fakeElem),this.selectedText=(0,i["default"])(this.fakeElem),this.copyText()}},{key:"removeFake",value:function(){this.fakeHandler&&(this.container.removeEventListener("click",this.fakeHandlerCallback),this.fakeHandler=null,this.fakeHandlerCallback=null),this.fakeElem&&(this.container.removeChild(this.fakeElem),this.fakeElem=null)}},{key:"selectTarget",value:function(){this.selectedText=(0,i["default"])(this.target),this.copyText()}},{key:"copyText",value:function(){var t=void 0;try{t=document.execCommand(this.action)}catch(e){t=!1}this.handleResult(t)}},{key:"handleResult",value:function(t){this.emitter.emit(t?"success":"error",{action:this.action,text:this.selectedText,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)})}},{key:"clearSelection",value:function(){this.trigger&&this.trigger.focus(),window.getSelection().removeAllRanges()}},{key:"destroy",value:function(){this.removeFake()}},{key:"action",set:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"copy";if(this._action=t,"copy"!==this._action&&"cut"!==this._action)throw new Error('Invalid "action" value, use either "copy" or "cut"')},get:function(){return this._action}},{key:"target",set:function(t){if(void 0!==t){if(!t||"object"!==(void 0===t?"undefined":r(t))||1!==t.nodeType)throw new Error('Invalid "target" value, use a valid Element');if("copy"===this.action&&t.hasAttribute("disabled"))throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if("cut"===this.action&&(t.hasAttribute("readonly")||t.hasAttribute("disabled")))throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');this._target=t}},get:function(){return this._target}}]),t}();t.exports=l})},{select:5}],8:[function(e,n,o){!function(i,r){if("function"==typeof t&&t.amd)t(["module","./clipboard-action","tiny-emitter","good-listener"],r);else if(void 0!==o)r(n,e("./clipboard-action"),e("tiny-emitter"),e("good-listener"));else{var a={exports:{}};r(a,i.clipboardAction,i.tinyEmitter,i.goodListener),i.clipboard=a.exports}}(this,function(t,e,n,o){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function l(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function c(t,e){var n="data-clipboard-"+t;if(e.hasAttribute(n))return e.getAttribute(n)}var s=i(e),u=i(n),d=i(o),p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},f=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),h=function(t){function e(t,n){r(this,e);var o=a(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return o.resolveOptions(n),o.listenClick(t),o}return l(e,t),f(e,[{key:"resolveOptions",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action="function"==typeof t.action?t.action:this.defaultAction,this.target="function"==typeof t.target?t.target:this.defaultTarget,this.text="function"==typeof t.text?t.text:this.defaultText,this.container="object"===p(t.container)?t.container:document.body}},{key:"listenClick",value:function(t){var e=this;this.listener=(0,d["default"])(t,"click",function(t){return e.onClick(t)})}},{key:"onClick",value:function(t){var e=t.delegateTarget||t.currentTarget;this.clipboardAction&&(this.clipboardAction=null),this.clipboardAction=new s["default"]({action:this.action(e),target:this.target(e),text:this.text(e),container:this.container,trigger:e,emitter:this})}},{key:"defaultAction",value:function(t){return c("action",t)}},{key:"defaultTarget",value:function(t){var e=c("target",t);if(e)return document.querySelector(e)}},{key:"defaultText",value:function(t){return c("text",t)}},{key:"destroy",value:function(){this.listener.destroy(),this.clipboardAction&&(this.clipboardAction.destroy(),this.clipboardAction=null)}}],[{key:"isSupported",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:["copy","cut"],e="string"==typeof t?[t]:t,n=!!document.queryCommandSupported;return e.forEach(function(t){n=n&&!!document.queryCommandSupported(t)}),n}}]),e}(u["default"]);t.exports=h})},{"./clipboard-action":7,"good-listener":4,"tiny-emitter":6}]},{},[8])(8)});var urlHandler={skipBack:!1,targetOrigin:"file:"==window.location.protocol?"*":window.location.protocol+"//"+window.location.host,getFileName:function(t,e){var n="patterns",o="";if(void 0===t)return o;if(void 0===e&&(e=!0),"all"==t)return"styleguide/html/styleguide.html";if("snapshots"==t)return"snapshots/index.html";var i=t.indexOf("viewall-")!=-1?viewAllPaths:patternPaths,r=t.replace("viewall-",""),a=this.getPatternInfo(r,i),l=a[0],c=a[1];if(void 0!==i[l]&&void 0!==i[l][c])o=i[l][c];else if(void 0!==i[l])for(var s in i[l])if(s.indexOf(c)!=-1){o=i[l][s];break}if(""===o)return o;var u=/\//g;if(t.indexOf("viewall-")!==-1&&0===t.indexOf("viewall-")&&""!==o)o=n+"/"+o.replace(u,"-")+"/index.html";else if(""!==o&&(o=n+"/"+o.replace(u,"-")+"/"+o.replace(u,"-"),e)){var d=void 0!==config.outputFileSuffixes&&void 0!==config.outputFileSuffixes.rendered?config.outputFileSuffixes.rendered:"";o=o+d+".html"}return o},getPatternInfo:function(t,e){for(var n=t.split("-"),o=1,i=n.length,r=n[0];void 0===e[r]&&o<i;)r+="-"+n[o],o++;var a=t.slice(r.length+1,t.length);return[r,a]},getRequestVars:function(){var t=new function(t){if(t.length>1)for(var e,n=0,o=t.substr(1).split("&");n<o.length;n++)e=o[n].split("="),this[unescape(e[0])]=e.length>1?unescape(e[1]):""}(window.location.search);return t},pushPattern:function(t,e){var n={pattern:t},o=urlHandler.getFileName(t),i=window.location.pathname;i="file"===window.location.protocol?i.replace("/public/index.html","public/"):i.replace(/\/index\.html/,"/");var r=window.location.protocol+"//"+window.location.host+i+o;if(e!=r){var a=JSON.stringify({event:"patternLab.updatePath",path:o});document.querySelector(".pl-js-iframe").contentWindow.postMessage(a,urlHandler.targetOrigin)}else{var l="file:"==window.location.protocol?null:window.location.protocol+"//"+window.location.host+window.location.pathname.replace("index.html","")+"?p="+t;void 0!==history.pushState&&history.pushState(n,null,l),document.getElementById("title").innerHTML="Pattern Lab - "+t,void 0!==document.querySelector(".pl-js-open-new-window")&&document.querySelector(".pl-js-open-new-window").setAttribute("href",urlHandler.getFileName(t))}},popPattern:function(t){var e,n=t.state;if(null===n)return void(this.skipBack=!1);null!==n&&(e=n.pattern);var o="";o=this.getFileName(e),""===o&&(o="styleguide/html/styleguide.html");var i=JSON.stringify({event:"patternLab.updatePath",path:o});document.querySelector(".pl-js-iframe").contentWindow.postMessage(i,urlHandler.targetOrigin),document.getElementById("title").innerHTML="Pattern Lab - "+e,document.querySelector(".pl-js-open-new-window").setAttribute("href",urlHandler.getFileName(e))}};window.onpopstate=function(t){urlHandler.skipBack=!0,urlHandler.popPattern(t)};var panelsUtil={addClickEvents:function(t,e){for(var n=t.querySelectorAll(".pl-js-tab-link"),o=0;o<n.length;++o)n[o].onclick=function(t){t.preventDefault();var e=this.getAttribute("data-patternpartial"),n=this.getAttribute("data-panelid");panelsUtil.show(e,n)};return t},show:function(t,e){var n;for(n=document.querySelectorAll("#pl-"+t+"-tabs .pl-js-tab-link"),i=0;i<n.length;++i)n[i].classList.remove("pl-is-active-tab");for(n=document.querySelectorAll("#pl-"+t+"-panels .pl-js-tab-panel"),i=0;i<n.length;++i)n[i].classList.remove("pl-is-active-tab");document.getElementById("pl-"+t+"-"+e+"-tab").classList.add("pl-is-active-tab"),document.getElementById("pl-"+t+"-"+e+"-panel").classList.add("pl-is-active-tab")}},modalStyleguide={active:[],targetOrigin:"file:"===window.location.protocol?"*":window.location.protocol+"//"+window.location.host,onReady:function(){for(var t=document.querySelectorAll(".pl-js-pattern-extra-toggle"),e=0;e<t.length;++e)t[e].onclick=function(t){var e=this.getAttribute("data-patternpartial");modalStyleguide.toggle(e)}},toggle:function(t){if(void 0!==modalStyleguide.active[t]&&modalStyleguide.active[t])modalStyleguide.highlightsHide(),modalStyleguide.close(t);else{var e=document.getElementById("pl-pattern-data-"+t);modalStyleguide.collectAndSend(e,!0,!1)}},open:function(t,e){var n=document.createElement("div");n.innerHTML=e,e=document.createElement("div").appendChild(n).querySelector("div"),e=panelsUtil.addClickEvents(e,t),modalStyleguide.close(t),modalStyleguide.active[t]=!0,n=document.getElementById("pl-pattern-extra-"+t),n.childNodes.length>0&&n.removeChild(n.childNodes[0]),document.getElementById("pl-pattern-extra-"+t).appendChild(e),document.getElementById("pl-pattern-extra-toggle-"+t).classList.add("pl-is-active"),document.getElementById("pl-pattern-extra-"+t).classList.add("pl-is-active")},close:function(t){modalStyleguide.active[t]=!1,document.getElementById("pl-pattern-extra-toggle-"+t).classList.remove("pl-is-active"),document.getElementById("pl-pattern-extra-"+t).classList.remove("pl-is-active")},collectAndSend:function(t,e,n){var o=JSON.parse(t.innerHTML);void 0!==o.patternName&&(patternMarkupEl=document.querySelector("#"+o.patternPartial+" > .pl-js-pattern-example"),o.patternMarkup=null!==patternMarkupEl?patternMarkupEl.innerHTML:document.querySelector("body").innerHTML,modalStyleguide.patternQueryInfo(o,e,n))},highlightsHide:function(t){var e=void 0!==t?"#"+t+" > ":"";for(elsToHide=document.querySelectorAll(e+".pl-has-annotation"),i=0;i<elsToHide.length;i++)elsToHide[i].classList.remove("pl-has-annotation");for(elsToHide=document.querySelectorAll(e+".pl-c-annotation-tip"),i=0;i<elsToHide.length;i++)elsToHide[i].style.display="none"},patternQueryInfo:function(t,e,n){try{var o=JSON.stringify({event:"patternLab.patternQueryInfo",patternData:t,iframePassback:e,switchText:n});parent.postMessage(o,modalStyleguide.targetOrigin)}catch(i){}},receiveIframeMessage:function(t){var e;if("file:"===window.location.protocol||t.origin===window.location.protocol+"//"+window.location.host){var n={};try{n="string"!=typeof t.data?t.data:JSON.parse(t.data)}catch(o){}if(void 0!==n.event&&"patternLab.patternQuery"==n.event){var i,r;for(i=document.querySelectorAll(".pl-js-pattern-data"),r=i.length>1,e=0;e<i.length;e++)modalStyleguide.collectAndSend(i[e],r,n.switchText)}else if(void 0!==n.event&&"patternLab.patternModalInsert"==n.event)modalStyleguide.open(n.patternPartial,n.modalContent);else if(void 0!==n.event&&"patternLab.annotationsHighlightShow"==n.event){var a,l,c,s;for(e=0;e<n.annotations.length;e++)if(c=n.annotations[e],a=document.querySelectorAll(c.el),a.length>0)for(l=0;l<a.length;l++)a[l].classList.add("pl-has-annotation"),s=document.createElement("span"),s.innerHTML=c.displayNumber,s.classList.add("pl-c-annotation-tip"),"0px"==window.getComputedStyle(a[l],null).getPropertyValue("max-height")&&(s.style.display="none"),annotationTip=document.querySelector(c.el+" > span.pl-c-annotation-tip"),null===annotationTip?a[l].insertBefore(s,a[l].firstChild):annotationTip.style.display="inline",a[l].onclick=function(t){return function(e){e.preventDefault(),e.stopPropagation();var n=JSON.stringify({event:"patternLab.annotationNumberClicked",displayNumber:t.displayNumber});parent.postMessage(n,modalStyleguide.targetOrigin)}}(c)}else if(void 0!==n.event&&"patternLab.annotationsHighlightHide"==n.event)modalStyleguide.highlightsHide();else if(void 0!==n.event&&"patternLab.patternModalClose"==n.event){var u=[];for(var d in modalStyleguide.active)u.push(d);for(e=0;e<u.length;e++){var p=u[e];modalStyleguide.active[p]&&modalStyleguide.close(p)}}}}};modalStyleguide.onReady(),window.addEventListener("message",modalStyleguide.receiveIframeMessage,!1);var clipboard=new Clipboard(".pl-js-code-copy-btn");clipboard.on("success",function(t){var e=document.querySelectorAll(".pl-js-code-copy-btn");for(i=0;i<e.length;i++)e[i].innerText="Copy";t.trigger.textContent="Copied"});