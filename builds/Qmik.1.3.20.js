!function(){function a(b,c){return a.init(b,c)}function b(a,b){var d=[];return l(a,function(a,e){(b?b(a,e):!c(e))&&d.push(e)}),d}function c(a){return void 0===a||null===a}function d(a){return c(a)||e(a)&&("undefined"==a||"null"==a||""==a.trim())}function e(a){return"string"==typeof a}function f(a){return a&&1==a.nodeType}function g(a){return a instanceof Array}function h(b){return!e(b)&&(g(b)||a.isQmik&&a.isQmik(b)||function(){return b+="","[object Arguments]"==b||"[object NodeList]"==b||"[object HTMLCollection]"==b||"[object StaticNodeList]"==b}())}function i(a){return a instanceof Function}function j(a){return a instanceof Error}function k(a){return a instanceof Object}function l(a,b){var c;if(h(a))for(c=0;c<a.length;c++)b.call(a[c],c,a[c]);else if(k(a))for(c in a)b.call(a[c],c,a[c]);return a}function m(a){return"number"==typeof a}function n(a){return"boolean"==typeof a}function o(a){return n(a)||e(a)||m(a)?a+"":i(a)?a.toString():JSON.stringify(a)}function p(a){return d(a)?"":JSON.parse(a)}function q(a){return y.Event&&a instanceof y.Event||a==y.event}function r(a){return i(a)?a():a}function s(){var a=arguments,b=a[0],c=g(b);return l(a,function(a,d){l(d,function(a,d){c?b.push(d):b[a]=d})}),b}function t(){return a.map(arguments,function(a,b){return g(b)?b.join(""):b}).join("/").replace(/(^\w+:\/\/)|([\/]{2,})/g,function(a){return/^\w+:\/\//.test(a)?a:"/"})}function u(b,c,d,e){c=a.url(c);var f="css"==b,g="js"==b,h=f?"link":g?"script":"iframe",i=z.createElement(h),j=a(i).attr({_src:c,async:"async"});return f?j.attr("rel","stylesheet"):g&&j.attr("type","text/javascript"),j.on({load:function(){d&&d(i)},error:function(){j.remove(),e&&e(i)}}),a.delay(function(){f?i.href=c:i.src=c,a("head").append(i)},1),i}function v(b,d){return d=d||{},c(b)?null:b.replace(/\$[!]?\{[\.\w_-]*\}/g,function(c){var e=c.replace(/(^\$[!]?\{\s*)|(\s*\}$)/g,"");e=e.split(".");for(var f=d[e[0]],g=1;g<e.length;g++)try{f=f[e[g]]}catch(h){return a.log(h,b),""}return f||""})}function w(a,b,c){var d=this;d.pid=setTimeout(function(){a.apply(null,c)},b)}function x(b,d,e,f){function g(){(c(e)||e>=j*d-i)&&(b.apply(null,f),h._p=new w(g,d,f)),j++}var h=this,i=a.now(),j=1;h._p=new w(g,d,f)}var y=this,z=y.document||{},A=y.navigator||{},B=A.userAgent,C=y.location,D=encodeURIComponent,E=decodeURIComponent,F=[].slice,G=C.protocol+"//"+C.hostname+(C.port?":"+C.port:""),H={context:"/"};a.extend=function(){var a=arguments,b=a[0]||{},d=1;switch(a.length){case 0:return;case 1:b=this,d=0}return l(F.call(a,d),function(a,d){d&&l(d,function(a,d){c(d)||(b[a]=d)})}),b};var I=String.prototype;a.extend(I,{trim:function(){return this.replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g,"")},toLower:I.toLowerCase,toUpper:I.toUpperCase}),a.extend(w.prototype,{stop:function(){clearTimeout(this.pid)}}),a.extend(x.prototype,{stop:function(){this._p&&this._p.stop()}}),a.extend({encode:D,decode:E,isDom:f,isBool:n,isString:e,isFun:i,isFunction:i,isNum:m,isNumber:m,isArray:g,isNull:c,isError:j,each:l,stringify:o,parseJSON:p,isEvent:q,likeArray:h,isDate:function(a){return a instanceof Date},isObject:k,isPlainObject:function(a){if(c(a)||a+""!="[object Object]"||a.nodeType||a==y)return!1;var b;for(b in a);return c(b)||Object.prototype.hasOwnProperty.call(a,b)},likeNull:d,inherit:function(a,b){function c(){}var d=a.prototype;c.prototype=b.prototype,a.prototype=new c,a.prototype.constructor=a,b.prototype.constructor==Object.prototype.constructor&&(b.prototype.constructor=b);for(var e in d)a.prototype[e]=d[e];for(var e in b)a[e]=b[e]},trim:function(a){return c(a)?"":e(a)?a.trim():a.toString().trim()},toLower:function(a){return a?a.toLower():a},toUpper:function(a){return a?a.toUpper():a},merge:s,array:function(a){return s([],a)},inArray:function(b,c){if(a.likeArray(c))for(var d=0;d<c.length;d++)if(c[d]===b)return d;return-1},unique:function(b){var c=[];return l(b,function(b,d){a.inArray(d,c)<0&&c.push(d)}),c},map:function(a,b){for(var d=[],e=0;a&&e<a.length;e++)c(a[e])||d.push(b(e,a[e]));return d},getScript:function(a,b,c){return u("js",a,b,c)},getCss:function(a,b,c){return u("css",a,b,c)},grep:b,param:function(a){var b=[];return l(a,function(a,c){e(a)?b.push(D(a)+"="+D(r(c))):c.name&&b.push(D(c.name)+"="+D(r(c.value)))}),b.join("&")},now:function(a){return(a||0)+(new Date).getTime()},delay:function(a,b){return new w(a,b,F.call(arguments,2))},cycle:function(a,b,c){return new x(a,b,c,F.call(arguments,3))},log:function(){var a=arguments;(H.debug||j(a[0]))&&console.log.apply(console,a)},isIphone:function(){return/iPhone OS/.test(B)},isAndroid:function(){return/Android/.test(B)},isWP:function(){return/Windows Phone/.test(B)},isIE:function(){return/MSIE/.test(B)},isFF:function(){return/Firefox/.test(B)},isWK:function(){return/WebKit/.test(B)},isOpera:function(){return/Opera/.test(B)},isRetinal:function(){return(y.devicePixelRatio||2)>=1.5},config:function(b,d){d=arguments.length<=1?H:d||{};var e=d;return arguments.length<1||c(b)||(k(b)?l(b,function(b,c){k(c)&&d[b]?a.extend(d[b],c):d[b]=c}):e=d[b]),e},url:function(a){return arguments.length<1?G:/^[a-zA-Z0-9]+:\/\//.test(a)?a:t(G,(/^\//.test(a)?"":H.context||"/")+"/"+a)},cssPrefix:function(b){var c={};return e(b)?c=(a.isWK()?"-webkit-":a.isIE()?"-ms-":a.isFF()?"-moz-":a.isOpera()?"-o-":"")+b:l(a.extend({},b),function(b,d){c[a.cssPrefix(b)]=d}),c},render:function(b,d){var e=[],f=(b.tag||"").trim(),h=b.text;if(h=v(h,d),""==f&&!c(h))return h;if(!/^\s*\w+\s*(\[.*\])?\s*$/.test(f))throw new Error("input args is lllegal:"+f);var i=(f.match(/^[^\[]+/)||[""])[0],j=(f.match(/\[.*$/)||[""])[0].replace(/(^\s*\[)|(\s*\]\s*$)/g,"");return e.push("<"+i+" "),j=v(j,d),e.push(j),e.push(">"),c(h)||e.push(h),g(b.child)&&l(b.child,function(b,c){c&&e.push(a.render(c,d))}),e.push("</"+i+">"),e.join("")},execCatch:function(b,c,d){try{b.apply(b,c||[])}catch(e){a.log(e,e.stack),d&&d(e)}}}),l([a.url,a.now],function(a,b){b.toString=b}),a._in={createEvent:function(a){return z.createEvent?z.createEvent(a):z.createEventObject(a)},isSE:function(){return!c(z.addEventListener)}},a.version="1.3.20",a.global=y,y.Qmik=a,y.$=y.$||a}(),function(Q){function Query(a,b){var c,d=this;if(d.context=b=b||doc,d.selector=a=render(a),d.length=0,isString(a)){if(!rNode.test(a))return each(find(a,b),function(a,b){d._push(b)}),d;var e=doc.createElement("div");e.innerHTML=a,c=e.children}else c=likeArray(a)?a:[a];for(var f=0;f<c.length;f++)d._push(c[f]);return d}function init(a,b){return b=b||doc,isFun(a)?Q(doc).ready(a):isQmik(a)?a:new Query(a,b)}function isQmik(a){return a instanceof Query}function find(a,b){var c=[];return likeNull(a)||(b=isString(b)?Q(b):b,isQmik(b)?each(b,function(b,d){isDom(d)&&(c=arrayConcat(c,d.querySelectorAll(a)))}):c=b.querySelectorAll(a)||[]),c}function execObject(a){return isFun(a)?a():render(a)}function arrayConcat(a,b){if(isArray(b))a=a.concat(b);else for(var c=0;c<b.length;c++)a.push(b[c]);return a}function at(a,b){return SE()?a.getAttribute(b)||a[b]:a[b]}function hasClass(a,b){if(!isDom(a))return!1;var c=a.className.split(" "),d=0;for(b=trim(b);d<c.length;d++)if(c[d]==b)return!0;return!1}function formateClassName(a){return replace(a,/[A-Z]/g,function(a){return"-"+toLower(a)})}function muchValue2Qmik(a){return a=execObject(a),isString(a)&&rNode.test(a)?Q(a):a}function render(a){return Q.isPlainObject(a)&&(isString(a.tag)||isString(a.text))?Q.render(a):a}function createTextNode(a){doc.createTextNode(render(a))}function append(a,b){b=muchValue2Qmik(b),likeArray(a)?each(a,function(a,c){append(c,b)}):isDom(a)&&(likeArray(b)?each(b,function(b,c){append(a,c)}):a.appendChild(isDom(b)?b:createTextNode(b)))}function before(a,b){b=muchValue2Qmik(b),likeArray(a)?each(a,function(a,c){before(c,b)}):isDom(a)&&(likeArray(b)?each(b,function(b,c){before(a,c)}):a.parentNode.insertBefore(isDom(b)?b:createTextNode(b),a))}function after(a,b){if(isDom(a)){var c=GN(a);c?before(c,b):append(a.parentNode,b)}else likeArray(a)&&each(a,function(a,c){after(c,b)})}function setValue(a,b,c){return a[b]=c,a}function formateClassNameValue(a,b){for(var c in addUints)if(a.indexOf(addUints[c])>=0){/[^\d\.-]/.test(b)||(b+="px");break}return b}function getStyle(a,b){return a.currentStyle?a.currentStyle[b]:doc.defaultView.getComputedStyle(a,!1)[b]}function css(a,b,c){if(b=isString(b)&&!isNull(c)?setValue({},b,execObject(c)):b,likeArray(a)){if(isString(b))return css(a[0],b);each(a,function(a,c){css(c,b)})}else if(isDom(a)){if(isString(b))return getStyle(a,formateClassName(b));c="",each(b,function(a,b){c+=formateClassName(a)+":"+formateClassNameValue(a,b)+";"}),a.style.cssText+=";"+c}}function attr(a,b,c,d){if(likeArray(a)){if(isString(b)&&isNull(c))return attr(a[0],b,c,d)||"";each(a,function(a,e){attr(e,b,c,d)})}else if(!isNull(a)){if(isString(b)&&isNull(c))return at(a,b);if(isPlainObject(b))each(b,function(b,c){attr(a,b,c,d)});else if(isDom(c))attr(a,b,"",d),Q(a).append(c);else{var c=execObject(c);d||!SE()?a[b]=c:a.setAttribute(b,c)}}}function clone(a,b){if(isDom(a))return Q(a.cloneNode(1==b));var c=[];return each(a,function(a,d){isDom(d)&&c.push(clone(d,b))}),Q(c)}function data(a,b,c){if(likeArray(a)){if(isString(b)&&isNull(c))return data(a[0],b,c);each(a,function(a,d){data(d,b,c)})}else if(!isNull(a)){if(isNull(a[dn])&&(a[dn]={}),isNull(c)&&isString(b))return a[dn][b];isString(b)?a[dn][b]=c:each(b,function(b,c){a[dn][b]=c})}}function contains(a,b){return isDom(b)&&(a===doc||a.contains(b))}function GN(a,b){return a?(a="prev"==b?a.previousSibling:a.nextSibling,isDom(a)?a:GN(a,b)):void 0}function uponSelector(a,b,c,d){var e,f,g=Q(a.parentNode).children(b);if("prev"==c)for(e=g.length-1;e>=0;e--)for(f=a;(f=GN(f,c))&&f==g[e];){d.push(f);break}else for(e=0;e<g.length;e++)for(f=a;(f=GN(f,c))&&f==g[e];){d.push(f);break}}function upon(a,b,c){var d=[];return each(a,function(a,e){isNull(b)?d.push(GN(e,c)):uponSelector(e,b,c,d)}),new Query(d,a)}function matchesSelector(a,b){return a?(a._matchesSelector=a.matchesSelector||a.msMatchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector,a._matchesSelector&&a._matchesSelector(b)):void 0}function parents(a,b,c,d){a=a?trim(a):a;var e=[],f=0;c=0!=c,d=1==d;var g=!isNull(a);return each(b,function(b,h){for(var i,j=h.parentNode;isDom(j)&&j!=doc.body&&(f=0,g?(i=j.parentNode,i&&Q.inArray(j,Q(i).children(a))>-1&&(f=1)):f=1,!f||(e.push(j),c))&&!d;)j&&(j=j.parentNode)}),Q(e)}var win=Q.global,doc=win.document,_in=Q._in,SE=_in.isSE,isNull=Q.isNull,isDom=Q.isDom,each=Q.each,likeArray=Q.likeArray,isArray=Q.isArray,likeNull=Q.likeNull,isString=Q.isString,isFun=Q.isFun,isPlainObject=Q.isPlainObject,trim=Q.trim,toLower=Q.toLower,toUpper=Q.toUpper,replace=function(a,b,c){return a.replace(b,c)},rNode=/^\s*(<.+>.*<\/.+>)+|(<.+\/\s*>)+\s*$/,addUints="height width top right bottom left".split(" ");Q.extend(Query.prototype,{_push:function(a){a&&(this[this.length++]=a)}});var dn="Qmikdata:";Q.init=init;var fn=Q.fn=Query.prototype;fn.extend=function(a){each(a,function(a,b){Query.prototype[a]=b})},fn.extend({last:function(){return Q(this[this.length-1])},eq:function(a){return Q(this[a])},first:function(){return Q(this[0])},filter:function(a){var b=new Query;return each(this,function(c,d){a(c,d)&&b._push(d)}),b},even:function(){return this.filter(function(a){return a%2==0})},odd:function(){return this.filter(function(a){return a%2!=0})},gt:function(a){for(var b=new Query,c=a+1;c<this.length&&c>=0;c++)b._push(this[c]);return b},lt:function(a){for(var b=new Query,c=0;a>c&&c<this.length;c++)b._push(this[c]);return b},find:function(a){return new Query(a,this)},each:function(a){return each(this,a),this},append:function(a){return append(this,a),this},remove:function(){return each(this,function(a,b){isDom(b.parentNode)&&b.parentNode.removeChild(b)}),this},before:function(a){return before(this,a),this},after:function(a){return after(this,a),this},html:function(v){var me=this;return arguments.length<1?attr(me,"innerHTML"):(attr(me,"innerHTML",isQmik(v)?v.html():v,!0),Q("script",me).each(function(i,dom){likeNull(dom.text)||eval(dom.text)}),this)},empty:function(){return this.html(""),this},text:function(a){var b=attr(this,"innerText",isQmik(a)?a.text():a,!0);return isNull(a)?b:this},addClass:function(a){return each(this,function(b,c){isDom(c)&&!hasClass(c,a)&&(c.className+=" "+trim(execObject(a)))}),this},rmClass:function(a){var b=new RegExp(replace(execObject(a),/\s+/g,"|"),"g");return each(this,function(a,c){c.className=replace(trim(replace(c.className,b,"")),/[\s]+/g," ")}),this},show:function(){return css(this,"display","block"),this},hide:function(){return css(this,"display","none"),this},toggle:function(){return each(this,function(a,b){"none"==css(b,"display")?Q(b).show():Q(b).hide()}),this},toggleClass:function(a){this.each(function(b,c){hasClass(c,a)?Q(c).rmClass(a):Q(c).addClass(a)})},map:function(a){return Q.map(this,a)},css:function(a,b){var c=css(this,a,b);return isPlainObject(a)||isString(a)&&!isNull(b)?this:c},attr:function(a,b){var c=attr(this,a,b);return arguments.length>1||isPlainObject(a)?this:c},rmAttr:function(a){each(this,function(b,c){isDom(c)&&c.removeAttribute(a)})},data:function(a,b){return data(this,a,b)},rmData:function(a){each(this,function(b,c){c.$Qmikdata&&delete c.$Qmikdata[a]})},val:function(a){return isNull(a)?this.attr("value")||"":void each(this,function(b,c){c.value=execObject(a)})},next:function(a){return upon(this,a,"next")},prev:function(a){return upon(this,a,"prev")},clone:function(a){return clone(this,a)},hasClass:function(a){return hasClass(this[0],a)},closest:function(a){var b=this,c=new Query;return b.each(function(b,d){Q(a,d.parentNode).each(function(a,b){d===b&&c._push(d)})}),c.length>0?c:parents(a,b,!1)},parents:function(a){return parents(a,this,!0)},parent:function(a){return parents(a,this,!0,!0)},children:function(a){var b=new Query,c=this,d=isNull(a);return c.each(function(c,e){for(var f,g=e.children,h=0;h<g.length;)f=g[h++],isDom(f)&&(d||matchesSelector(f,a))&&b._push(f)}),b}}),fn.extend({removeClass:fn.rmClass,removeData:fn.rmData,removeAttr:fn.rmAttr}),Q.isQmik=isQmik}(Qmik),function(a){function b(a,b){a.onreadystatechange=a.onload=a.onDOMContentLoaded=b}function c(b,c,d,e){var g=a(b),h=g.data(o)||{},i=h[c];g.data(o,h),i||(h[c]=i=[],r(b["on"+c])&&(i.push({fun:b["on"+c],param:[]}),delete b["on"+c]),m()?b.addEventListener(c,f,!1):b["on"+c]=f),r(d)&&i.push({fun:d,param:e||[]})}function d(b,c,d){var e=a(b).data(o)||{},g=e[c]||[],h=g.length-1;if(d)for(;h>=0;h--)g[h].fun==d&&g.splice(h,1);else m()?b.removeEventListener(c,f,!1):delete b["on"+c],delete e[c]}function e(a,b){var c;if(m()){switch(b){case"hashchange":c=l.createEvent("HashChangeEvent");break;default:c=l.createEvent("MouseEvents")}c.initEvent(b,!0,!0),a.dispatchEvent(c)}else a.fireEvent("on"+b)}function f(b){b=g(b||i.event);var c,d,e,f=this,h=a(f).data(o)||{};s(h[b.type],function(g,h){a.execCatch(function(){d=h.fun,e=h.param||[],r(d)&&(c=d.apply(f,[b].concat(e)),q(c)||(b.returnValue=c,i.event&&(i.event.returnValue=c)))})})}function g(a){return a.preventDefault||(a.preventDefault=function(){this.returnValue=!1,i.event&&(i.event.returnValue=!1)}),a.stopPropagation||(a.stopPropagation=function(){this.cancelBubble=!0}),a.target||(a.target=a.srcElement),a}function h(a,b,c){return a+":live:"+b+":"+(c||"").toString()}var i=a.global,j=i.document,k=a.fn,l=a._in,m=l.isSE,n=/complete|loaded|interactive|loading/i,o="QEvents",p={},q=a.isNull,r=a.isFun,s=a.each;a.ready=k.ready=function(c,d){function e(a){f=g.readyState,"loading"!=f&&!q(g.$$handls)&&(n.test(f)||q(f)&&"load"==a.type)&&(b(g,null),s(g.$$handls,function(b,c){c(a)}),delete g.$$handls)}var f,g=d||this[0]||j;if(n.test(g.readyState))a.delay(function(){c.call(g,l.createEvent("MouseEvents"))},1);else{var h=g.$$handls=g.$$handls||[];h.push(c),b(g,e)}return this},k.extend({on:function(b,d){var e=[].slice.call(arguments,2);return s(this,function(f,g){a.isPlainObject(b)?s(b,function(a,b){c(g,a,b,d)}):c(g,b,d,e)}),this},un:function(a,b){return s(this,function(c,e){d(e,a,b)}),this},once:function(a,b){function c(e){b(e),d.un(a,c)}var d=this;d.on(a,c)},emit:function(a){return s(this,function(b,c){e(c,a)}),this},live:function(b,c){var d=this.selector,e=b;return a.isPlainObject(b)||(e={},e[b]=c),s(e,function(b,c){var e=p[h(d,b,c)]=function(b){var e=b.target,f=a(e);(a.isString(d)?f.closest(d).length>0:a.isDom(d)?a.inArray(d,f.parents())>=0:0)&&c.apply(e,[b])};a("body").on(b,e)}),this},die:function(b,c){var e=p[h(this.selector,b,c)];return s(a(document.body),function(a,c){d(c,b,e)}),this}}),k.extend({bind:k.on,unbind:k.un,off:k.un,trigger:k.emit}),s("click blur focus scroll resize".split(" "),function(a,b){k[b]=function(a){return a?this.on(b,a):this.emit(b)}})}(Qmik),function(a){function b(a,b){var c=a.length;0==c?b():function d(f,g){e(a[f],function(a,e){a?b(a):f==c-1?b(a,e):d(f+1,e)},g)}(0,null)}function c(a,b){var c=a.length;0==c?b():function d(e){f(a[e],function(){e==c-1?b():d(e+1)})}(0)}function d(b,d){var e=b.length,f=(new Array(e),parseInt((e-1)/h)+1),g=new Array(e>h?h:e);a.each(g,function(a){g[a]=b.slice(a*f,(a+1)*f)});var i=0;a.each(g,function(a,b){c(b,function(){i++,i==g.length&&d()})})}function e(a,b,c){g(a,[b,c],b)}function f(a,b){g(a,[b],b)}var g=a.execCatch,h=3,i={};i.series=function(c,d){b(c,function(b,c){b&&a.log(b,b.stack),g(d,[b,c])})},i.parallel=function(a,b){d(a,function(){g(b)})},a.task=i,a.series=i.series,a.parallel=i.parallel}(Qmik),function(a){function b(b,c,d){a.extend(this,{id:b,url:b,dependencies:c,factory:d,isReady:!1,type:a.inArray(b,r)>=0?2:1,exports:{}})}function c(a){return a.replace(/(\/\/)\S*[^\n]*/g,"").replace(/\/\*[\S\s]*\*\//g,"")}function d(b){b=c(b.toString());var d=b.replace(/^\s*function\s*\w*\s*/,"").match(/^\([\w ,]*\)/)[0].replace("(","").replace(")",""),e=[],f=d.indexOf(",");if(f>=0){var g=d.substring(0,f),h=new RegExp(g+"s*[(]s*[\"']([^\"')]+)[\"']s*[)]","g");e=a.map(b.match(h),function(a,b){return b.replace(new RegExp("^"+g+"s*[(]s*[\"']"),"").replace(/\s*[\"']\s*[)]$/,"")})}return e}function e(a){var b=this;b._deal=a,b.l=b.p=0,b.state=1,b.deal()}function f(a){var b=g(a);return b?b.exports:null}function g(a){return v[a]||v[j(m(a))]}function h(b,c,d){var e=[],f=[];a.each(c,function(a,b){e.push(function(a){i(b,function(b,c){f.push(b),a(c)})})}),a.series(e,function(a){t(function(){a||b&&b.apply(b,f)}),d&&d()})}function i(a,b){var c=g(a);c?k(c,f,b):l(a,function(){c=g(a),k(c,f,b)},function(){b(null,new Error("load error:"+a))})}function j(a){return a.replace(/[\?#].*$/g,"")}function k(b,c,d){1!=b.isReady?h(function(){var e=b.factory(c,b.exports,b);b.isReady=!0,a.isNull(e)||(b.exports=e),d(b.exports)},b.dependencies):d(b.exports)}function l(b,c,d){b=m(b),/\/.+\.css(\?.*)?$/i.test(b)?a.getCss(b,d,d):q=a.getScript(b,c,d)}function m(a){var b=o(a);return b==a?a:(b=p(b),n(b))}function n(b){return a.url(/\?/.test(b)||/\.(css|js)$/.test(b)?b:b+".js")}function o(a){return u.alias[a]||a}function p(a){return a.replace(/\$\{[0-9a-zA-Z._-]+\}/g,function(a){var b=u.vars[a.substring(2,a.length-1).trim()]||a;return s(b)?b():b})}var q,r,s=a.isFun,t=a.execCatch,u={alias:{},vars:{},preload:[]},v={},w=!1,x={};a.extend(e.prototype,{pause:function(){return this.state=2,this},size:function(){return this.l-this.p},push:function(a){this[this.l++]=a},pop:function(){var a=this,b=a[a.p];return delete a[a.p++],b},deal:function(){var a=this;return 1==a.state&&a.size()>0&&a._deal(a.pause().pop(),function(){a.state=1,a.deal()}),a}});var y=new e(function(a,b){var c=a.callback;h(c,a.ids,b)});a.extend(x,{use:function(b,c){b=a.isArray(b)?b:[b],w||(y.push({ids:r}),w=!0);var d=a.grep(b,function(a,b){return f(b)});d.length==b.length?h(c,b):y.push({ids:b,callback:c}),y.deal()},define:function(c,e,f){var g;if(q&&(g=q.src),(s(c)||a.isArray(c))&&(f=e,e=c,c=""),s(e)&&(f=e,e=[]),e=e.concat(d(f)),e=a.unique(e),c&&(v[c]&&console.log("warn module is overwrited:",c,",",f),v[c]=new b(c,e,f)),g){var h=j(g);!v[h]&&(v[h]=new b(h,e,f))}},config:function(b){return a.config(b,u)},modules:function(){return a.extend({},v)}}),a.sun=x,a.define=a.sun.define,a.use=a.sun.use}(Qmik),function(a){function b(){return!f.XMLHttpRequest||"file:"===f.location.protocol&&f.ActiveXObject?new f.ActiveXObject("Microsoft.XMLHTTP"):new f.XMLHttpRequest}function c(b,c,d){function e(){1==l&&(l=0,delete f[o],a("script[jsonp='"+o+"']").remove(),d&&d())}var g,h=b.timeout,l=1,m=b.url,n=a.param(b.data),o=k+j++,p=m.match(i);m.indexOf("?")<0&&(m+="?"),p?(p=p[0].split("=")[0],m=m.replace(i,p+"="+o)):m+="&callback="+o,m+=n,f[o]=function(b){delete f[o],a("script[jsonp='"+o+"']").remove(),g&&g.stop(),1==l&&c&&c(b)},a(a.getScript(m,null,e)).attr("jsonp",o),h>0&&(g=a.delay(e,h))}function d(d){var e,f=a.extend({},l,d),h=f.dataType,i=f.timeout,j=b(),k=a.url(f.url),m="GET"==a.toUpper(f.type),n=f.success,o=f.error,p=a.param(d.data);return"jsonp"==h?void c(f,n,o):(j.onreadystatechange=function(){4==j.readyState&&(200==j.status?(e&&e.stop(),n&&n("xml"==h?j.responseXML:"json"==h?g(j.responseText):j.responseText)):o&&o())},m&&(k+=(/\?/.test(k)?"&":"?")+p),j.open(f.type,k,f.async),j.setRequestHeader("Cache-Control","no-cache"),j.setRequestHeader("X-Requested-With","XMLHttpRequest"),!m&&j.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),j.send(m?null:p),void(i>0&&(e=a.delay(function(){j.abort(),o&&o(j.xhr,j.type)},i))))}function e(a,b,c,e,f){h(b)&&(e=c,c=b,b=null),d({url:a,data:b,success:c,dataType:e,type:f})}var f=a.global,g=a.parseJSON,h=a.isFun,i=/[\w\d_$-]+\s*=\s*\?/,j=1,k="qjsonp",l={type:"GET",async:!0,dataType:"text"};a.extend({ajax:d,get:e,getJSON:function(a,b,c){h(b)&&(c=b,b={}),e(a,b,c,"json")},post:function(a,b,c,d){h(b)&&(d=c,c=b,b={}),e(a,b,c,d,"post")}})}(Qmik),function(a){function b(a){return a.offsetParent?a.offsetLeft+b(a.offsetParent):a.offsetLeft}function c(a){return a.offsetParent?a.offsetTop+c(a.offsetParent):a.offsetTop}function d(a){return a.parentNode==a.offsetParent?a.offsetLeft:b(a)-b(a.parentNode)}function e(a){return a.parentNode==a.offsetParent?a.offsetTop:c(a)-c(a.parentNode)}var f=a.global,g=(f.document,a.isNull,a.isDom);a.fn.extend({width:function(){var a=this[0];return g(a)?a.offsetWidth:screen.availWidth},height:function(){var a=this[0];return g(a)?a.offsetHeight:screen.availHeight},offset:function(){if(!this[0])return null;var a=this[0].getBoundingClientRect();return{left:a.left+f.pageXOffset,top:a.top+f.pageYOffset}},position:function(){var a=this[0];return a?{left:d(a),top:e(a)}:null}})}(Qmik);