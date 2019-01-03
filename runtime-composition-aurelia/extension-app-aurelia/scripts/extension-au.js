define.switchToUserSpace();
define('app',['require','exports','module'],function (require, exports, module) {
"use strict";

exports.__esModule = true;
exports.App = void 0;

var App = function App() {
  this.items = [{
    name: 'First'
  }, {
    name: 'Second'
  }, {
    name: 'Third'
  }];
};

exports.App = App;
});

define('text!app.css',function(){return ".list-container {\n  width: 200px;\n  margin: 5px; }\n\n.list-item {\n  display: block;\n  box-sizing: border-box;\n  border: 1px solid #333;\n  width: 100%;\n  height: 50px;\n  text-align: center;\n  line-height: 50px;\n  overflow: hidden;\n  background: white; }\n\n.list-item:not(:first-child) {\n  margin-top: -1px; }\n";});
define('text!app.html',function(){return "<template>\n  <require from=\"./app.css\"></require>\n\n  <banner>\n    Note this banner style is provided by host-app.\n  </banner>\n\n  <p>Array of reorderable items, provided by additional aurelia plugin bcx-aurelia-reorderable-repeat</p>\n\n  <div class=\"list-container\">\n    <div class=\"list-item\" reorderable-repeat.for=\"item of items\">\n      ${item.name}\n    </div>\n  </div>\n\n</template>\n";});
define('extension',['require','exports','module'],function (require, exports, module) {
"use strict";

exports.__esModule = true;
exports.configure = configure;
exports.moduleId = void 0;

function configure(config) {
  // don't load shared-ui as provided by host-app
  // load reorderable-repeat
  config.plugin('bcx-aurelia-reorderable-repeat');
} // the component to be loaded by host-app


var moduleId = './app';
exports.moduleId = moduleId;
});

define('main',['require','exports','module','aurelia-pal','@babel/polyfill'],function (require, exports, module) {
"use strict";

exports.__esModule = true;
exports.configure = configure;

var _aureliaPal = require("aurelia-pal");

require("@babel/polyfill");

// Use dumber-module-loader,
// This bit will be added to aurelia-loader-default
_aureliaPal.PLATFORM.eachModule = function (callback) {
  var defined = _aureliaPal.PLATFORM.global.requirejs.definedValues();

  for (var key in defined) {
    try {
      if (callback(key, defined[key])) return;
    } catch (e) {//
    }
  }
};

function configure(aurelia) {
  aurelia.use.standardConfiguration();
  aurelia.use.developmentLogging('info'); // shared-ui is provided in host-app

  aurelia.use.plugin('shared-ui'); // reorderable-repeat is not provided in host-app
  // we will load it again in the entry file `plugin.js`

  aurelia.use.plugin('bcx-aurelia-reorderable-repeat');
  return aurelia.start().then(function () {
    return aurelia.setRoot();
  });
}
});

define.switchToPackageSpace();
define('bcx-aurelia-dnd/dist/index',['require','exports','module','aurelia-event-aggregator'],function (require, exports, module) {var global = this;
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var aureliaEventAggregator=require("aurelia-event-aggregator"),_global="undefined"!=typeof self?self:"undefined"!=typeof global?global:new Function("return this")();function trPreview(e){if("TR"===e.tagName&&e.parentNode&&e.parentNode.parentNode&&"TABLE"===e.parentNode.parentNode.tagName){for(var t=e.cloneNode(!0),n=e.childElementCount,i=0;i<n-1;i++){var r=_global.getComputedStyle(e.children[i]);t.children[i].style.width=r.width,t.children[i].style.height=r.height}var s=e.parentNode,o=s.cloneNode();o.appendChild(t);var d=s.parentNode,a=d.cloneNode();a.appendChild(o);var l=_global.getComputedStyle(d);return a.style.width=l.width,a}}function liPreview(e){if("LI"===e.tagName&&e.parentNode&&("UL"===e.parentNode.tagName||"OL"===e.parentNode.tagName)){var t=e.cloneNode(!0),n=_global.getComputedStyle(e);t.style.width=n.width,t.style.height=n.height,t.style.flex="0 0 auto";var i=e.parentNode.cloneNode();return i.appendChild(t),i.style.width="auto",i.style.height="auto",i.style.listStyleType="none",i}}function unknownTagPreview(e){var t=_global.getComputedStyle(e);if("inline"===t.display&&"auto"===t.width&&"auto"===t.height&&""===e.style.width&&""===e.style.height){for(var n=e.cloneNode(!0),i=e.childElementCount,r=0;r<i;r++){var s=_global.getComputedStyle(e.children[r]);n.children[r].style.width=s.width,n.children[r].style.height=s.height}return n}}function defaultPreview(e){var t=e.cloneNode(!0),n=_global.getComputedStyle(e);return t.style.width=n.width,t.style.height=n.height,t}var doc=_global.document,documentElement=doc&&doc.documentElement,css="\n/* bcx-aurelia-dnd styles */\n\n/*\nbcx-aurelia-dnd relies on html/body margin 0.\nYour css stack should have done this.\nAdded here as safe guard.\n*/\nhtml, body {\n  margin: 0;\n}\n\n.bcx-dnd-preview {\n  position: absolute !important;\n  margin: 0 !important;\n  z-index: 9999 !important;\n  opacity: 0.8;\n  box-shadow: 0 0 16px gray;\n}\n\n.bcx-dnd-preview .bcx-dnd-preview-hide {\n  visibility: hidden !important;\n}\n\n.bcx-dnd-hide {\n  display: none !important;\n}\n\n.bcx-dnd-hide-cursor .bcx-dnd-preview {\n  cursor: none !important;\n}\n\n.bcx-dnd-unselectable {\n  -webkit-user-select: none !important;\n  -moz-user-select: none !important;\n  -ms-user-select: none !important;\n  user-select: none !important;\n}\n",_stylesInjected=!1;function injectStyles(){if(!_stylesInjected){_stylesInjected=!0;var e=doc.createElement("style");e.innerHTML=css,e.type="text/css",doc.head.childNodes.length>0?doc.head.insertBefore(e,doc.head.childNodes[0]):doc.head.appendChild(e)}}var classes=function(){var e={},t="(?:^|\\s)",n="(?:\\s|$)";function i(i){var r=e[i];return r?r.lastIndex=0:e[i]=r=new RegExp(t+i+n,"g"),r}return{add:function(e,t){var n=e.className;n.length?i(t).test(n)||(e.className+=" "+t):e.className=t},rm:function(e,t){e.className=e.className.replace(i(t)," ").trim()}}}();function whichMouseButton(e){if(void 0!==e.touches)return e.touches.length;if(void 0!==e.which&&0!==e.which)return e.which;if(void 0!==e.buttons)return e.buttons;var t=e.button;return void 0!==t?1&t?1:2&t?3:4&t?2:0:void 0}function getPageRect(e){var t=e.getBoundingClientRect();return{x:t.left+getScroll("scrollLeft","pageXOffset"),y:t.top+getScroll("scrollTop","pageYOffset"),width:getRectWidth(t),height:getRectHeight(t)}}function getScroll(e,t){return void 0!==window[t]?window[t]:documentElement.clientHeight?documentElement[e]:doc.body[e]}function getElementBehindPreview(e,t,n){var i,r=e||{},s=r.className;return r.className+=" bcx-dnd-hide",i=doc.elementFromPoint(t,n),r.className=s,i}function getRectWidth(e){return e.width||e.right-e.left}function getRectHeight(e){return e.height||e.bottom-e.top}function getParent(e){return e.parentNode===doc?null:e.parentNode}function isInput(e){return"INPUT"===e.tagName||"TEXTAREA"===e.tagName||"SELECT"===e.tagName||isEditable(e)}function isEditable(e){return!!e&&("false"!==e.contentEditable&&("true"===e.contentEditable||isEditable(getParent(e))))}function getEventHost(e){return e.targetTouches&&e.targetTouches.length?e.targetTouches[0]:e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:e}function getCoord(e,t){var n=getEventHost(t),i={pageX:"clientX",pageY:"clientY"};return e in i&&!(e in n)&&i[e]in n&&(e=i[e]),n[e]}var DndSource=function(e,t){if(void 0===t&&(t={}),!e)throw new Error("Missing delegate for dnd source.");if("function"!=typeof e.dndModel)throw new Error("Missing dndModel() method on dnd source delegate.");if(this.delegate=e,t.element?this.element=t.element:this.element=e.dndElement,t.handler){if(!(t.handler instanceof _global.Element))throw new Error("specified handler is not a DOM element");this.handler=t.handler}else this.handler=this.element;if(!(this.element instanceof _global.Element))throw new Error("Missing dndElement or options.element on dnd source delegate.");t.noPreview&&(this.noPreview=!0),t.hideCursor&&(this.hideCursor=!0),t.centerPreviewToMousePosition&&(this.centerPreviewToMousePosition=!0)},DndTarget=function(e,t){if(void 0===t&&(t={}),!e)throw new Error("Missing delegate for dnd target.");if("function"!=typeof e.dndCanDrop)throw new Error("Missing dndCanDrop() method on delegate.");if("function"!=typeof e.dndDrop)throw new Error("Missing dndDrop() method on dnd target delegate.");if(this.delegate=e,t.element?this.element=t.element:this.element=e.dndElement,!(this.element instanceof _global.Element))throw new Error("Missing dndElement or options.element on dnd target delegate.");"function"==typeof e.dndHover&&(this.dndHover=e.dndHover.bind(e))};function indexOfElementOrDelegate(e,t){for(var n=t instanceof _global.Element?function(e){return e.element===t}:function(e){return e.delegate===t},i=e.length,r=0;r<i;r+=1)if(n(e[r]))return r;return-1}function indexOfHandler(e,t){for(var n=e.length,i=0;i<n;i+=1)if(e[i].handler===t)return i;return-1}var DndService=function(){function e(e){this.ea=e,this.dndSources=[],this.dndTargets=[],this.previewDrawers=[],injectStyles(),this.addPreviewDrawer(defaultPreview),this.addPreviewDrawer(unknownTagPreview),this.addPreviewDrawer(liPreview),this.addPreviewDrawer(trPreview),this._grab=this._grab.bind(this),this._release=this._release.bind(this),this._startBecauseMouseMoved=this._startBecauseMouseMoved.bind(this),this._preventGrabbed=this._preventGrabbed.bind(this),this._drag=this._drag.bind(this),documentElement.addEventListener("mousedown",this._grab,{passive:!1}),documentElement.addEventListener("touchstart",this._grab,{passive:!1}),documentElement.addEventListener("mouseup",this._release,{passive:!1})}var t=e.prototype;return t.addPreviewDrawer=function(e){this.previewDrawers.unshift(e)},t.addSource=function(e,t){this.dndSources.push(new DndSource(e,t))},t.removeSource=function(e){var t=indexOfElementOrDelegate(this.dndSources,e);t>=0&&this.dndSources.splice(t,1)},t.addTarget=function(e,t){e.dnd={};var n=new DndTarget(e,t);if(this.isProcessing){var i=n.delegate.dndCanDrop(this.model),r=n.delegate.dnd;r.canDrop=i,r.isProcessing=!0,r.model=this.model}this.dndTargets.push(n)},t.removeTarget=function(e){var t=indexOfElementOrDelegate(this.dndTargets,e);t>=0&&(this.dndTargets[t].delegate.dnd=null,this.dndTargets.splice(t,1))},t._sourceOf=function(e){var t=indexOfHandler(this.dndSources,e);return t>=0?this.dndSources[t]:void 0},t._startListeningEventualMovements=function(){documentElement.addEventListener("mousemove",this._startBecauseMouseMoved,{passive:!1}),this._element&&this._element.addEventListener("touchmove",this._startBecauseMouseMoved,{passive:!1}),this._element&&this._element.addEventListener("touchend",this._release,{passive:!1})},t._stopListeningEventualMovements=function(){documentElement.removeEventListener("mousemove",this._startBecauseMouseMoved),this._element&&this._element.removeEventListener("touchmove",this._startBecauseMouseMoved)},t._startListeningMovements=function(){documentElement.addEventListener("selectstart",this._preventGrabbed),documentElement.addEventListener("click",this._preventGrabbed),documentElement.addEventListener("mousemove",this._drag,{passive:!1}),this._element&&this._element.addEventListener("touchmove",this._drag,{passive:!1})},t._stopListeningMovements=function(){documentElement.removeEventListener("selectstart",this._preventGrabbed),documentElement.removeEventListener("click",this._preventGrabbed),documentElement.removeEventListener("mousemove",this._drag),this._element&&this._element.removeEventListener("touchmove",this._drag),this._element&&this._element.removeEventListener("touchend",this._release)},t._preventGrabbed=function(e){this._grabbed&&e.preventDefault()},t._grab=function(e){if(this._moveX=e.clientX,this._moveY=e.clientY,!(1!==whichMouseButton(e)||e.metaKey||e.ctrlKey)){var t=e.target;this._element=t;var n=this._startingSource(t);n&&(this._grabbed=n,this._startListeningEventualMovements(),"mousedown"===e.type&&isInput(t)?t.focus():e.preventDefault())}},t._ungrab=function(){this._grabbed=void 0,this._stopListeningEventualMovements(),this._stopListeningMovements(),this._element=void 0},t._release=function(e){if(this._ungrab(),this.isProcessing){this.ea&&this.ea.publish("dnd:willEnd");var t=this._landingTargets(e).shallowTarget;t&&t.delegate.dndDrop(this._locationInfo(t.element,e)),this._cleanup(),this.ea&&this.ea.publish("dnd:didEnd")}},t._startingSource=function(e){if(!this.isProcessing){for(var t=this._sourceOf(e);!t&&e&&(e=getParent(e));)t=this._sourceOf(e);return t}},t._startBecauseMouseMoved=function(e){if(this._grabbed)if(0!==whichMouseButton(e)){if(void 0===e.clientX||e.clientX!==this._moveX||void 0===e.clientY||e.clientY!==this._moveY){var t=getCoord("clientX",e),n=getCoord("clientY",e);if(!isInput(doc.elementFromPoint(t,n))){var i=this._grabbed;this._stopListeningEventualMovements(),this._startListeningMovements(),this.isProcessing&&this._cleanup(),this._start(i),this._sourceElementRect=getPageRect(this._sourceElement),this._offsetX=getCoord("pageX",e)-this._sourceElementRect.x,this._offsetY=getCoord("pageY",e)-this._sourceElementRect.y,this._renderPreviewImage(),this._drag(e)}}}else this._cleanup()},t._start=function(e){var t=this;this.ea&&this.ea.publish("dnd:willStart"),this.isProcessing=!0,this.model=e.delegate.dndModel(),this._sourceElement=e.element,e.noPreview?this._noPreview=!0:e.delegate.dndPreview&&(this._sourcePreview=e.delegate.dndPreview(this.model)),this._noPreview||(e.hideCursor&&(this._hideCursor=!0),e.centerPreviewToMousePosition&&(this._centerPreviewToMousePosition=!0)),this.dndTargets.forEach(function(e){var n=e.delegate.dndCanDrop(t.model),i=e.delegate.dnd;i.canDrop=n,i.isProcessing=!0,i.model=t.model}),this.ea&&this.ea.publish("dnd:didStart")},t._cleanup=function(){this._ungrab(),this._removePreviewImage(),this.isProcessing=void 0,this.model=void 0,this._sourceElement=void 0,this._noPreview=void 0,this._hideCursor=void 0,this._centerPreviewToMousePosition=void 0,this._sourcePreview=void 0,this._sourceElementRect=void 0,this._offsetX=0,this._offsetY=0,this.dndTargets.forEach(function(e){var t=e.delegate.dnd;t.canDrop=void 0,t.isProcessing=void 0,t.isHoveringShallowly=void 0,t.isHovering=void 0,t.model=void 0})},t._landingTargets=function(e){if(!this.isProcessing)return{shallowTarget:null,possibleTargets:[]};for(var t,n=getCoord("clientX",e),i=getCoord("clientY",e),r=this.dndTargets.filter(function(e){if(e.delegate.dnd.canDrop){var t=e.element.getBoundingClientRect();return t.left<=n&&t.right>=n&&t.top<=i&&t.bottom>=i}}),s=getElementBehindPreview(this._preview,n,i);!t&&s;){var o=indexOfElementOrDelegate(r,s);o>=0?t=r[o]:s=getParent(s)}if(t)r.splice(r.indexOf(t),1);else if(r.length>0){var d=r;t=d[0],r=d.slice(1)}return{shallowTarget:t,possibleTargets:r}},t._drag=function(e){var t=this;if(this.isProcessing){e.preventDefault(),this._updatePreviewLocation(e);var n=this._landingTargets(e),i=n.shallowTarget,r=n.possibleTargets;this.dndTargets.forEach(function(n){var s=n.delegate.dnd;s.isProcessing&&(n===i?(s.isHoveringShallowly=!0,s.isHovering=!0,n.dndHover&&n.dndHover(t._locationInfo(n.element,e))):r.indexOf(n)>=0?(s.isHoveringShallowly=!1,s.isHovering=!0,n.dndHover&&n.dndHover(t._locationInfo(n.element,e))):(s.isHoveringShallowly=!1,s.isHovering=!1))})}},t._updatePreviewLocation=function(e){if(this._preview){var t=getCoord("pageX",e),n=getCoord("pageY",e);if(this._centerPreviewToMousePosition){var i=this._preview.getBoundingClientRect(),r=getRectWidth(i),s=getRectHeight(i);this._preview.style.left=t-Math.floor(r/2)+"px",this._preview.style.top=n-Math.floor(s/2)+"px"}else this._preview.style.left=t-this._offsetX+"px",this._preview.style.top=n-this._offsetY+"px"}},t._locationInfo=function(e,t){var n,i={x:this._sourceElementRect.x+this._offsetX,y:this._sourceElementRect.y+this._offsetY},r=getCoord("pageX",t),s=getCoord("pageY",t),o={x:r,y:s},d=getPageRect(e);return n=this._preview?getPageRect(this._preview):{x:r-this._offsetX,y:s-this._offsetY,width:this._sourceElementRect.width,height:this._sourceElementRect.height},{mouseStartAt:i,mouseEndAt:o,sourceElementRect:this._sourceElementRect,targetElementRect:d,previewElementRect:n}},t._renderPreviewImage=function(){if(!this._preview&&!this._noPreview){var e=!!this._sourcePreview;if(e)this._preview=this._sourcePreview,this._sourcePreview=void 0;else{var t=this._sourceElement;if(!t)return;for(var n=0;n<this.previewDrawers.length&&(this._preview=this.previewDrawers[n](t),!this._preview);n++);if(!this._preview)return}classes.add(this._preview,"bcx-dnd-preview"),doc.body.appendChild(this._preview),classes.add(doc.body,"bcx-dnd-unselectable"),e||"rgba(0, 0, 0, 0)"!==_global.getComputedStyle(this._preview).backgroundColor||(this._preview.style.backgroundColor="white"),this._hideCursor&&classes.add(doc.body,"bcx-dnd-hide-cursor")}},t._removePreviewImage=function(){this._preview&&(classes.rm(doc.body,"bcx-dnd-unselectable"),classes.rm(doc.body,"bcx-dnd-hide-cursor"),getParent(this._preview).removeChild(this._preview),this._preview=null)},e}();DndService.inject=[aureliaEventAggregator.EventAggregator],exports.DndService=DndService;

});
define('bcx-aurelia-dnd/index',['bcx-aurelia-dnd/dist/index'],function(m){return m;});define('bcx-aurelia-dnd',['bcx-aurelia-dnd/dist/index'],function(m){return m;});
define('bcx-aurelia-reorderable-repeat/dist/index',['require','exports','module','aurelia-pal','./reorderable-repeat','./reorderable-direction','./reorderable-group','./reorderable-group-for','./reorderable-dnd-preview','./reorderable-dnd-handler-selector','./reorderable-after-reordering'],function (require, exports, module) {
'use strict';

exports.__esModule = true;
exports.ReorderableAfterReordering = exports.ReorderableDndHandlerSelector = exports.ReorderableDndPreview = exports.ReorderableGroupFor = exports.ReorderableGroup = exports.ReorderableDirection = exports.ReorderableRepeat = undefined;
exports.configure = configure;

var _aureliaPal = require('aurelia-pal');

var _reorderableRepeat = require('./reorderable-repeat');

var _reorderableDirection = require('./reorderable-direction');

var _reorderableGroup = require('./reorderable-group');

var _reorderableGroupFor = require('./reorderable-group-for');

var _reorderableDndPreview = require('./reorderable-dnd-preview');

var _reorderableDndHandlerSelector = require('./reorderable-dnd-handler-selector');

var _reorderableAfterReordering = require('./reorderable-after-reordering');

var css = '\n.reorderable-repeat-dragging-me {\n  visibility: hidden;\n}\n';

function configure(config) {
  _aureliaPal.DOM.injectStyles(css);

  config.globalResources([_aureliaPal.PLATFORM.moduleName('./reorderable-repeat'), _aureliaPal.PLATFORM.moduleName('./reorderable-direction'), _aureliaPal.PLATFORM.moduleName('./reorderable-group'), _aureliaPal.PLATFORM.moduleName('./reorderable-group-for'), _aureliaPal.PLATFORM.moduleName('./reorderable-dnd-preview'), _aureliaPal.PLATFORM.moduleName('./reorderable-dnd-handler-selector'), _aureliaPal.PLATFORM.moduleName('./reorderable-after-reordering')]);
}

exports.ReorderableRepeat = _reorderableRepeat.ReorderableRepeat;
exports.ReorderableDirection = _reorderableDirection.ReorderableDirection;
exports.ReorderableGroup = _reorderableGroup.ReorderableGroup;
exports.ReorderableGroupFor = _reorderableGroupFor.ReorderableGroupFor;
exports.ReorderableDndPreview = _reorderableDndPreview.ReorderableDndPreview;
exports.ReorderableDndHandlerSelector = _reorderableDndHandlerSelector.ReorderableDndHandlerSelector;
exports.ReorderableAfterReordering = _reorderableAfterReordering.ReorderableAfterReordering;
});
define('bcx-aurelia-reorderable-repeat/index',['bcx-aurelia-reorderable-repeat/dist/index'],function(m){return m;});define('bcx-aurelia-reorderable-repeat',['bcx-aurelia-reorderable-repeat/dist/index'],function(m){return m;});
define('bcx-aurelia-reorderable-repeat/dist/reorderable-after-reordering',['require','exports','module','aurelia-templating'],function (require, exports, module) {
'use strict';

exports.__esModule = true;
exports.ReorderableAfterReordering = undefined;

var _dec, _class;

var _aureliaTemplating = require('aurelia-templating');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//Placeholder attribute to prohibit use of this attribute name in other places

var ReorderableAfterReordering = exports.ReorderableAfterReordering = (_dec = (0, _aureliaTemplating.customAttribute)('reorderable-after-reordering'), _dec(_class = function ReorderableAfterReordering() {
  _classCallCheck(this, ReorderableAfterReordering);
}) || _class);
});
define('bcx-aurelia-reorderable-repeat/reorderable-after-reordering',['bcx-aurelia-reorderable-repeat/dist/reorderable-after-reordering'],function(m){return m;});
define('bcx-aurelia-reorderable-repeat/dist/reorderable-direction',['require','exports','module','aurelia-templating'],function (require, exports, module) {
'use strict';

exports.__esModule = true;
exports.ReorderableDirection = undefined;

var _dec, _class;

var _aureliaTemplating = require('aurelia-templating');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//Placeholder attribute to prohibit use of this attribute name in other places

var ReorderableDirection = exports.ReorderableDirection = (_dec = (0, _aureliaTemplating.customAttribute)('reorderable-direction'), _dec(_class = function ReorderableDirection() {
  _classCallCheck(this, ReorderableDirection);
}) || _class);
});
define('bcx-aurelia-reorderable-repeat/reorderable-direction',['bcx-aurelia-reorderable-repeat/dist/reorderable-direction'],function(m){return m;});
define('bcx-aurelia-reorderable-repeat/dist/reorderable-dnd-handler-selector',['require','exports','module','aurelia-templating'],function (require, exports, module) {
'use strict';

exports.__esModule = true;
exports.ReorderableDndHandlerSelector = undefined;

var _dec, _class;

var _aureliaTemplating = require('aurelia-templating');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//Placeholder attribute to prohibit use of this attribute name in other places

var ReorderableDndHandlerSelector = exports.ReorderableDndHandlerSelector = (_dec = (0, _aureliaTemplating.customAttribute)('reorderable-dnd-handler-selector'), _dec(_class = function ReorderableDndHandlerSelector() {
  _classCallCheck(this, ReorderableDndHandlerSelector);
}) || _class);
});
define('bcx-aurelia-reorderable-repeat/reorderable-dnd-handler-selector',['bcx-aurelia-reorderable-repeat/dist/reorderable-dnd-handler-selector'],function(m){return m;});
define('bcx-aurelia-reorderable-repeat/dist/reorderable-dnd-preview',['require','exports','module','aurelia-templating'],function (require, exports, module) {
'use strict';

exports.__esModule = true;
exports.ReorderableDndPreview = undefined;

var _dec, _class;

var _aureliaTemplating = require('aurelia-templating');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//Placeholder attribute to prohibit use of this attribute name in other places

var ReorderableDndPreview = exports.ReorderableDndPreview = (_dec = (0, _aureliaTemplating.customAttribute)('reorderable-dnd-preview'), _dec(_class = function ReorderableDndPreview() {
  _classCallCheck(this, ReorderableDndPreview);
}) || _class);
});
define('bcx-aurelia-reorderable-repeat/reorderable-dnd-preview',['bcx-aurelia-reorderable-repeat/dist/reorderable-dnd-preview'],function(m){return m;});
define('bcx-aurelia-reorderable-repeat/dist/reorderable-group',['require','exports','module','aurelia-templating'],function (require, exports, module) {
'use strict';

exports.__esModule = true;
exports.ReorderableGroup = undefined;

var _dec, _class;

var _aureliaTemplating = require('aurelia-templating');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//Placeholder attribute to prohibit use of this attribute name in other places

var ReorderableGroup = exports.ReorderableGroup = (_dec = (0, _aureliaTemplating.customAttribute)('reorderable-group'), _dec(_class = function ReorderableGroup() {
  _classCallCheck(this, ReorderableGroup);
}) || _class);
});
define('bcx-aurelia-reorderable-repeat/reorderable-group',['bcx-aurelia-reorderable-repeat/dist/reorderable-group'],function(m){return m;});
define('bcx-aurelia-reorderable-repeat/dist/reorderable-group-for',['require','exports','module','aurelia-dependency-injection','aurelia-templating','bcx-aurelia-dnd','aurelia-event-aggregator','./reorderable-group-map'],function (require, exports, module) {
'use strict';

exports.__esModule = true;
exports.ReorderableGroupFor = undefined;

var _dec, _dec2, _class;
// import {TaskQueue} from 'aurelia-task-queue';


var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaTemplating = require('aurelia-templating');

var _bcxAureliaDnd = require('bcx-aurelia-dnd');

var _aureliaEventAggregator = require('aurelia-event-aggregator');

var _reorderableGroupMap = require('./reorderable-group-map');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var example = 'reorderable-group-for.bind="arrayModel"';

var ReorderableGroupFor = exports.ReorderableGroupFor = (_dec = (0, _aureliaTemplating.customAttribute)('reorderable-group-for'), _dec2 = (0, _aureliaDependencyInjection.inject)(Element, _aureliaEventAggregator.EventAggregator, _bcxAureliaDnd.DndService, _reorderableGroupMap.ReorderableGroupMap), _dec(_class = _dec2(_class = function () {
  function ReorderableGroupFor(element, ea, dndService, groupMap) {
    _classCallCheck(this, ReorderableGroupFor);

    this.intention = null;

    this.element = element;
    this.ea = ea;
    this.dndService = dndService;
    this.groupMap = groupMap;
    this.resetIntention = this.resetIntention.bind(this);
  }

  ReorderableGroupFor.prototype.bind = function bind() {
    var _this = this;

    var value = this.value;

    if (!Array.isArray(value)) {
      throw new Error('reorderable-group-for needs items to be an array. e.g. ' + example);
    }

    this._subsribers = [this.ea.subscribe('dnd:willStart', function () {
      if (!_this.repeaterId) {
        var repeaterInfo = _this.groupMap.get(value);
        if (repeaterInfo) {
          _this.group = repeaterInfo.group;
          _this.repeaterId = repeaterInfo.repeaterId;
        } else {
          _this.group = null;
          _this.repeaterId = null;
        }
      }

      _this.resetIntention();
    }), this.ea.subscribe('dnd:didEnd', this.resetIntention), this.ea.subscribe('reorderable-group:intention-changed', function (intention) {
      if (intention.type !== _this.group) return;
      // sync intention from other repeater
      _this.intention = intention;
    })];
  };

  ReorderableGroupFor.prototype.unbind = function unbind() {
    this._subsribers.forEach(function (s) {
      return s.dispose();
    });
    this._subsribers = [];
  };

  ReorderableGroupFor.prototype.resetIntention = function resetIntention() {
    this.intention = null;
  };

  ReorderableGroupFor.prototype.attached = function attached() {
    this.dndService.addTarget(this, { element: this.element });
  };

  ReorderableGroupFor.prototype.detached = function detached() {
    this.dndService.removeTarget(this);
  };

  ReorderableGroupFor.prototype.dndCanDrop = function dndCanDrop(model) {
    return model.type === this.group;
  };

  ReorderableGroupFor.prototype.dndHover = function dndHover() {
    if (!this.repeaterId) return;

    var _dnd = this.dnd,
        isHoveringShallowly = _dnd.isHoveringShallowly,
        model = _dnd.model;

    if (!isHoveringShallowly) return;

    var type = model.type,
        index = model.index,
        item = model.item,
        repeaterId = model.repeaterId;

    var length = this.value ? this.value.length : 0;
    var inSameGroup = model.repeaterId === this.repeaterId;
    var defaultTargetIndex = inSameGroup ? length - 1 : length;

    if (!this.intention || this.intention.toRepeaterId !== this.repeaterId) {
      this.ea.publish('reorderable-group:intention-changed', {
        type: type,
        item: item,
        fromIndex: index,
        fromRepeaterId: repeaterId,
        toIndex: defaultTargetIndex, // move to last position
        toRepeaterId: this.repeaterId
      });
    }
  };

  ReorderableGroupFor.prototype.dndDrop = function dndDrop() {
    /* no-op */
  };

  return ReorderableGroupFor;
}()) || _class) || _class);
});
define('bcx-aurelia-reorderable-repeat/reorderable-group-for',['bcx-aurelia-reorderable-repeat/dist/reorderable-group-for'],function(m){return m;});
define('bcx-aurelia-reorderable-repeat/dist/reorderable-group-map',['require','exports','module'],function (require, exports, module) {
"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ReorderableGroupMap = exports.ReorderableGroupMap = function () {
  function ReorderableGroupMap() {
    _classCallCheck(this, ReorderableGroupMap);

    this._map = new WeakMap();
  }

  ReorderableGroupMap.prototype.add = function add(repeater) {
    var type = repeater.type,
        repeaterId = repeater.repeaterId,
        items = repeater.items;

    if (type === repeaterId) return;
    this._map.set(items, { group: type, repeaterId: repeaterId });
  };

  ReorderableGroupMap.prototype.remove = function remove(repeater) {
    var type = repeater.type,
        repeaterId = repeater.repeaterId,
        items = repeater.items;

    if (type === repeaterId) return;
    this._map.delete(items);
  };

  ReorderableGroupMap.prototype.get = function get(items) {
    return this._map.get(items);
  };

  return ReorderableGroupMap;
}();
});
define('bcx-aurelia-reorderable-repeat/reorderable-group-map',['bcx-aurelia-reorderable-repeat/dist/reorderable-group-map'],function(m){return m;});
define('bcx-aurelia-reorderable-repeat/dist/reorderable-repeat',['require','exports','module','aurelia-dependency-injection','aurelia-binding','aurelia-templating','aurelia-templating-resources','./reorderable-repeat-strategy-locator','bcx-aurelia-dnd','aurelia-event-aggregator','aurelia-task-queue','./repeater-dnd-type','./reorderable-group-map'],function (require, exports, module) {
'use strict';

exports.__esModule = true;
exports.ReorderableRepeat = undefined;

var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4; /*eslint no-loop-func:0, no-unused-vars:0*/


var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaBinding = require('aurelia-binding');

var _aureliaTemplating = require('aurelia-templating');

var _aureliaTemplatingResources = require('aurelia-templating-resources');

var _reorderableRepeatStrategyLocator = require('./reorderable-repeat-strategy-locator');

var _bcxAureliaDnd = require('bcx-aurelia-dnd');

var _aureliaEventAggregator = require('aurelia-event-aggregator');

var _aureliaTaskQueue = require('aurelia-task-queue');

var _repeaterDndType = require('./repeater-dnd-type');

var _repeaterDndType2 = _interopRequireDefault(_repeaterDndType);

var _reorderableGroupMap = require('./reorderable-group-map');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var seed = 0;

var classes = function () {
  var cache = {};
  var start = '(?:^|\\s)';
  var end = '(?:\\s|$)';

  function lookupClass(className) {
    var cached = cache[className];
    if (cached) {
      cached.lastIndex = 0;
    } else {
      cache[className] = cached = new RegExp(start + className + end, 'g');
    }
    return cached;
  }

  function addClass(el, className) {
    var current = el.className;
    if (!current.length) {
      el.className = className;
    } else if (!lookupClass(className).test(current)) {
      el.className += ' ' + className;
    }
  }

  function rmClass(el, className) {
    el.className = el.className.replace(lookupClass(className), ' ').trim();
  }
  return { add: addClass, rm: rmClass };
}();

/**
* Binding to iterate over Array to genereate a template for each iteration.
*/
var ReorderableRepeat = exports.ReorderableRepeat = (_dec = (0, _aureliaTemplating.customAttribute)('reorderable-repeat'), _dec2 = (0, _aureliaDependencyInjection.inject)(_aureliaEventAggregator.EventAggregator, _aureliaTaskQueue.TaskQueue, _aureliaBinding.BindingEngine, _bcxAureliaDnd.DndService, _aureliaTemplating.BoundViewFactory, _aureliaTemplating.TargetInstruction, _aureliaTemplating.ViewSlot, _aureliaTemplating.ViewResources, _aureliaBinding.ObserverLocator, _reorderableRepeatStrategyLocator.ReorderableRepeatStrategyLocator, _reorderableGroupMap.ReorderableGroupMap), _dec(_class = (0, _aureliaTemplating.templateController)(_class = _dec2(_class = (_class2 = function (_AbstractRepeater) {
  _inherits(ReorderableRepeat, _AbstractRepeater);

  /**
  * Creates an instance of Repeat.
  * @param viewFactory The factory generating the view
  * @param instruction The instructions for how the element should be enhanced.
  * @param viewResources Collection of resources used to compile the the views.
  * @param viewSlot The slot the view is injected in to.
  * @param observerLocator The observer locator instance.
  * @param collectionStrategyLocator The strategy locator to locate best strategy to iterate the collection.
  */
  function ReorderableRepeat(ea, taskQueue, bindingEngine, dndService, viewFactory, instruction, viewSlot, viewResources, observerLocator, strategyLocator, groupMap) {
    _classCallCheck(this, ReorderableRepeat);

    var _this = _possibleConstructorReturn(this, _AbstractRepeater.call(this, {
      local: 'item',
      viewsRequireLifecycle: (0, _aureliaTemplatingResources.viewsRequireLifecycle)(viewFactory)
    }));

    _initDefineProp(_this, 'items', _descriptor, _this);

    _initDefineProp(_this, 'local', _descriptor2, _this);

    _initDefineProp(_this, 'intention', _descriptor3, _this);

    _initDefineProp(_this, 'patchedItems', _descriptor4, _this);

    _this.repeaterId = (0, _repeaterDndType2.default)(seed);
    seed += 1;

    _this.ea = ea;
    _this.taskQueue = taskQueue;
    _this.bindingEngine = bindingEngine;
    _this.dndService = dndService;
    _this.viewFactory = viewFactory;
    _this.instruction = instruction;
    _this.viewSlot = viewSlot;
    _this.lookupFunctions = viewResources.lookupFunctions;
    _this.observerLocator = observerLocator;
    _this.strategyLocator = strategyLocator;
    _this.groupMap = groupMap;

    _this.ignoreMutation = false;
    _this.sourceExpression = (0, _aureliaTemplatingResources.getItemsSourceExpression)(_this.instruction, 'reorderable-repeat.for');
    if (_this.sourceExpression instanceof _aureliaBinding.BindingBehavior) {
      throw new Error('BindingBehavior is not supported in reorderable-repeat');
    }
    if (_this.sourceExpression instanceof _aureliaBinding.ValueConverter) {
      throw new Error('ValueConverter is not supported in reorderable-repeat');
    }
    if ((0, _aureliaTemplatingResources.isOneTime)(_this.sourceExpression)) {
      throw new Error('oneTime binding is not supported in reorderable-repeat');
    }
    _this.viewsRequireLifecycle = (0, _aureliaTemplatingResources.viewsRequireLifecycle)(viewFactory);
    var group = _this._reorderableGroup();
    _this.type = group ? (0, _repeaterDndType2.default)(group) : _this.repeaterId;
    return _this;
  }
  /**
  * Local variable which gets assigned on each iteration.
  *
  * @property local
  */


  ReorderableRepeat.prototype.call = function call(context, changes) {
    this[context](this.items, changes);
  };

  /**
  * Binds the repeat to the binding context and override context.
  * @param bindingContext The binding context.
  * @param overrideContext An override context for binding.
  */


  ReorderableRepeat.prototype.bind = function bind(bindingContext, overrideContext) {
    var _this2 = this;

    this.scope = { bindingContext: bindingContext, overrideContext: overrideContext };
    this.matcherBinding = this._captureAndRemoveMatcherBinding();
    this.arrayObserver = this.bindingEngine.collectionObserver(this.items).subscribe(this._itemsMutated.bind(this));
    this._subsribers = [this.ea.subscribe('dnd:willStart', function () {
      _this2.intention = null;
      _this2.views().forEach(function (v) {
        classes.rm(v.firstChild, 'reorderable-repeat-reordering');
        classes.rm(v.firstChild, 'reorderable-repeat-dragging-me');
      });
    }), this.ea.subscribe('dnd:didEnd', function () {
      _this2.views().forEach(function (v) {
        classes.rm(v.firstChild, 'reorderable-repeat-reordering');
        classes.rm(v.firstChild, 'reorderable-repeat-dragging-me');
      });

      if (!_this2.intention) return;
      var _intention = _this2.intention,
          item = _intention.item,
          fromIndex = _intention.fromIndex,
          fromRepeaterId = _intention.fromRepeaterId,
          toIndex = _intention.toIndex,
          toRepeaterId = _intention.toRepeaterId;

      _this2.intention = null;

      var repeaterId = _this2.repeaterId;
      if (repeaterId !== fromRepeaterId && repeaterId !== toRepeaterId) return;

      // no change
      if (fromRepeaterId === toRepeaterId && fromIndex === toIndex) return;

      if (repeaterId === fromRepeaterId) {
        _this2.items.splice(fromIndex, 1);
      }

      if (repeaterId === toRepeaterId) {
        _this2.items.splice(toIndex, 0, item);
      }

      var afterReordering = _this2._reorderableAfterReorderingFunc();
      if (afterReordering) {
        // in group mode, wait for all models updated
        // before hitting callback
        _this2.taskQueue.queueMicroTask(function () {
          if (fromRepeaterId === toRepeaterId && fromRepeaterId === repeaterId) {
            afterReordering(_this2.items, { fromIndex: fromIndex, toIndex: toIndex });
          } else {
            afterReordering(_this2.items);
          }
        });
      }
    }), this.ea.subscribe('reorderable-group:intention-changed', function (intention) {
      if (intention.type !== _this2.type) return;

      // avoid double trigger of intentionChanged;
      if (_this2.intention && intention.type === _this2.intention.type && intention.fromIndex === _this2.intention.fromIndex && intention.fromRepeaterId === _this2.intention.fromRepeaterId && intention.toIndex === _this2.intention.toIndex && intention.toRepeaterId === _this2.intention.toRepeaterId) return;

      // sync intention from other repeater
      _this2.intention = intention;
    })];
    this.patchedItems = [].concat(this.items);
    this.patchedItemsChanged();

    this.groupMap.add(this);
  };

  /**
  * Unbinds the repeat
  */


  ReorderableRepeat.prototype.unbind = function unbind() {
    this.groupMap.remove(this);

    this.scope = null;
    this.items = null;
    this.matcherBinding = null;
    this.viewSlot.removeAll(true);
    if (this.arrayObserver) {
      this.arrayObserver.dispose();
      this.arrayObserver = null;
    }
    this._subsribers.forEach(function (s) {
      return s.dispose();
    });
    this._subsribers = [];
  };

  ReorderableRepeat.prototype.intentionChanged = function intentionChanged(newIntention) {
    if (newIntention) {
      var repeaterId = this.repeaterId;

      var item = newIntention.item,
          fromIndex = newIntention.fromIndex,
          fromRepeaterId = newIntention.fromRepeaterId,
          toIndex = newIntention.toIndex,
          toRepeaterId = newIntention.toRepeaterId;


      var patched = [].concat(this.items);

      if (repeaterId === fromRepeaterId) {
        patched.splice(fromIndex, 1);
      }

      if (repeaterId === toRepeaterId) {
        patched.splice(toIndex, 0, item);
      }

      this.patchedItems = patched;
    }
  };

  // every time the items property changes.


  ReorderableRepeat.prototype.itemsChanged = function itemsChanged(newVal, oldVal) {
    // still bound?
    if (!this.scope) {
      return;
    }

    if (this.arrayObserver) {
      this.arrayObserver.dispose();
      this.arrayObserver = null;
    }

    this.arrayObserver = this.bindingEngine.collectionObserver(this.items).subscribe(this._itemsMutated.bind(this));

    if (this.intention === null) {
      this.patchedItems = [].concat(this.items);
    } else {
      this.intention = null;
    }
  };

  // every time the items array add/delete.


  ReorderableRepeat.prototype._itemsMutated = function _itemsMutated() {
    if (this.intention === null) {
      this.patchedItems = [].concat(this.items);
    } else {
      this.intention = null;
    }
  };

  ReorderableRepeat.prototype.patchedItemsChanged = function patchedItemsChanged() {
    // still bound?
    if (!this.scope) {
      return;
    }

    this.strategy = this.strategyLocator.getStrategy(this.patchedItems);
    if (!this.strategy) {
      throw new Error('Value for \'' + this.sourceExpression + '\' is non-repeatable');
    }

    this.strategy.instanceChanged(this, this.patchedItems);
  };

  ReorderableRepeat.prototype._captureAndRemoveMatcherBinding = function _captureAndRemoveMatcherBinding() {
    if (this.viewFactory.viewFactory) {
      var instructions = this.viewFactory.viewFactory.instructions;
      var instructionIds = Object.keys(instructions);
      for (var i = 0; i < instructionIds.length; i++) {
        var expressions = instructions[instructionIds[i]].expressions;
        if (expressions) {
          for (var ii = 0; i < expressions.length; i++) {
            if (expressions[ii].targetProperty === 'matcher') {
              var matcherBinding = expressions[ii];
              expressions.splice(ii, 1);
              return matcherBinding;
            }
          }
        }
      }
    }

    return undefined;
  };

  // @override AbstractRepeater


  ReorderableRepeat.prototype.viewCount = function viewCount() {
    return this.viewSlot.children.length;
  };

  ReorderableRepeat.prototype.views = function views() {
    return this.viewSlot.children;
  };

  ReorderableRepeat.prototype.view = function view(index) {
    return this.viewSlot.children[index];
  };

  ReorderableRepeat.prototype.matcher = function matcher() {
    return this.matcherBinding ? this.matcherBinding.sourceExpression.evaluate(this.scope, this.matcherBinding.lookupFunctions) : null;
  };

  ReorderableRepeat.prototype.addView = function addView(bindingContext, overrideContext) {
    var view = this.viewFactory.create();
    view.bind(bindingContext, overrideContext);
    this.viewSlot.add(view);
    this._registerDnd(view);
  };

  ReorderableRepeat.prototype.insertView = function insertView(index, bindingContext, overrideContext) {
    var view = this.viewFactory.create();
    view.bind(bindingContext, overrideContext);
    this.viewSlot.insert(index, view);
    this._registerDnd(view);
  };

  ReorderableRepeat.prototype.moveView = function moveView(sourceIndex, targetIndex) {
    this.viewSlot.move(sourceIndex, targetIndex);
  };

  ReorderableRepeat.prototype.removeAllViews = function removeAllViews(returnToCache, skipAnimation) {
    var _this3 = this;

    this.views().forEach(function (view) {
      return _this3._unRegisterDnd(view);
    });
    return this.viewSlot.removeAll(returnToCache, skipAnimation);
  };

  ReorderableRepeat.prototype.removeViews = function removeViews(viewsToRemove, returnToCache, skipAnimation) {
    var _this4 = this;

    viewsToRemove.forEach(function (view) {
      return _this4._unRegisterDnd(view);
    });
    return this.viewSlot.removeMany(viewsToRemove, returnToCache, skipAnimation);
  };

  ReorderableRepeat.prototype.removeView = function removeView(index, returnToCache, skipAnimation) {
    this._unRegisterDnd(this.view(index));
    return this.viewSlot.removeAt(index, returnToCache, skipAnimation);
  };

  ReorderableRepeat.prototype.updateBindings = function updateBindings(view) {
    this._unRegisterDnd(view);

    var j = view.bindings.length;
    while (j--) {
      (0, _aureliaTemplatingResources.updateOneTimeBinding)(view.bindings[j]);
    }
    j = view.controllers.length;
    while (j--) {
      var k = view.controllers[j].boundProperties.length;
      while (k--) {
        var binding = view.controllers[j].boundProperties[k].binding;
        (0, _aureliaTemplatingResources.updateOneTimeBinding)(binding);
      }
    }

    this._registerDnd(view);
  };

  ReorderableRepeat.prototype._additionalAttribute = function _additionalAttribute(view, attribute) {
    return view && view.firstChild && view.firstChild.au && view.firstChild.au[attribute] ? view.firstChild.au[attribute].instruction.attributes[attribute] : undefined;
  };

  ReorderableRepeat.prototype._reorderableGroup = function _reorderableGroup() {
    // only support static group, in order to get the value before view rendering
    if (this.viewFactory && this.viewFactory.viewFactory) {
      var node = this.viewFactory.viewFactory.template.firstChild;
      if (node && node.hasAttribute('reorderable-group')) {
        return node.getAttribute('reorderable-group');
      }
    }
  };

  ReorderableRepeat.prototype._reorderableDirection = function _reorderableDirection(view) {
    var attr = this._additionalAttribute(view, 'reorderable-direction');
    if (attr && attr.sourceExpression) {
      attr = attr.sourceExpression.evaluate(this.scope);
    }

    if (typeof attr === 'string') {
      return attr.toLowerCase() || 'down';
    }
    return 'down';
  };

  ReorderableRepeat.prototype._dndHandlerSelector = function _dndHandlerSelector(view) {
    var attr = this._additionalAttribute(view, 'reorderable-dnd-handler-selector');
    if (attr && attr.sourceExpression) {
      attr = attr.sourceExpression.evaluate(this.scope);
    }

    if (typeof attr === 'string') {
      return attr;
    }
  };

  ReorderableRepeat.prototype._dndPreviewFunc = function _dndPreviewFunc(view) {
    var func = this._additionalAttribute(view, 'reorderable-dnd-preview');

    if (!func) {
      return null;
    } else if (typeof func === 'string') {
      var funcCall = this.scope.overrideContext.bindingContext[func];

      if (typeof funcCall === 'function') {
        return funcCall.bind(this.scope.overrideContext.bindingContext);
      }
      throw new Error("'reorderable-dnd-preview' must be a function or evaluate to one");
    } else if (func.sourceExpression) {
      // TODO test preview
      return function (item, scope) {
        return func.sourceExpression.evaluate(scope);
      };
    } else {
      throw new Error("'reorderable-dnd-preview' must be a function or evaluate to one");
    }
  };

  ReorderableRepeat.prototype._reorderableAfterReorderingFunc = function _reorderableAfterReorderingFunc() {
    var _this5 = this;

    var func = this._additionalAttribute(this.view(0), 'reorderable-after-reordering');

    if (!func) {
      return null;
    } else if (typeof func === 'string') {
      var funcCall = this.scope.overrideContext.bindingContext[func];

      if (typeof funcCall === 'function') {
        return funcCall.bind(this.scope.overrideContext.bindingContext);
      }
      throw new Error("'reorderable-after-reordering' must be a function or evaluate to one");
    } else if (func.sourceExpression) {
      return function () {
        return func.sourceExpression.evaluate(_this5.scope);
      };
    } else {
      throw new Error("'reorderable-after-reordering' must be a function or evaluate to one");
    }
  };

  ReorderableRepeat.prototype._dndHover = function _dndHover(location, index, direction) {
    // bypass hovering on itself
    if (this.intention && this.intention.toRepeaterId === this.repeaterId && this.intention.toIndex === index) {
      return;
    }

    var model = this.dndService.model;
    var mouseEndAt = location.mouseEndAt,
        targetElementRect = location.targetElementRect;

    var x = mouseEndAt.x - targetElementRect.x;
    var y = mouseEndAt.y - targetElementRect.y;

    var inLeastHalf = void 0;

    if (direction === 'left') {
      inLeastHalf = x > targetElementRect.width / 2;
    } else if (direction === 'right') {
      inLeastHalf = x < targetElementRect.width / 2;
    } else if (direction === 'up') {
      inLeastHalf = y > targetElementRect.height / 2;
    } else /* if (direction === 'down') */{
        inLeastHalf = y < targetElementRect.height / 2;
      }

    // because of unknown size diff between items,
    // check half size to avoid endless bouncing of swapping two items.
    if (inLeastHalf ||
    // or starting on itself
    !this.intention && model.repeaterId === this.repeaterId && index === model.index) {
      // hover over top half, user wants to move smth before this item.
      this._updateIntention(index, true);
    } else {
      // hover over bottom half, user wants to move smth after this item.
      this._updateIntention(index, false);
    }
  };

  ReorderableRepeat.prototype._registerDnd = function _registerDnd(view) {
    var _this6 = this;

    var local = this.local;

    var el = view.firstChild;
    var item = view.bindingContext[local];
    var index = view.overrideContext.$index;
    var handlerSelector = this._dndHandlerSelector(view);
    var handler = void 0;
    if (handlerSelector) {
      handler = el.querySelector(handlerSelector);
    }

    var type = this.type;
    var repeaterId = this.repeaterId;

    var direction = this._reorderableDirection(view);
    var _previewFunc = this._dndPreviewFunc(view);

    this.dndService.addSource({
      dndModel: function dndModel() {
        return { type: type, index: index, item: item, repeaterId: repeaterId };
      },
      dndPreview: _previewFunc && function () {
        return _previewFunc(item, view);
      },
      dndElement: el
    }, handler && { handler: handler });

    this.dndService.addTarget({
      dndElement: el,
      dndCanDrop: function dndCanDrop(model) {
        if (model.type !== type) return false;

        var intention = _this6.intention;

        var inSameGroup = model.repeaterId === repeaterId;

        _this6.taskQueue.queueMicroTask(function () {
          classes.add(el, 'reorderable-repeat-reordering');
        });

        var draggingMe = void 0;

        if (intention) {
          draggingMe = intention.toRepeaterId === repeaterId && intention.toIndex === index;
        } else if (inSameGroup) {
          draggingMe = model.index === index;
        }

        if (draggingMe) {
          // I am under dragging
          _this6.taskQueue.queueMicroTask(function () {
            classes.add(el, 'reorderable-repeat-dragging-me');
          });
        }

        return true;
      },
      dndHover: function dndHover(location) {
        _this6._dndHover(location, index, direction);
      },
      dndDrop: function dndDrop() {/* no-op */}
    });
  };

  ReorderableRepeat.prototype._unRegisterDnd = function _unRegisterDnd(view) {
    classes.rm(view.firstChild, 'reorderable-repeat-reordering');
    classes.rm(view.firstChild, 'reorderable-repeat-dragging-me');
    this.dndService.removeSource(view.firstChild);
    this.dndService.removeTarget(view.firstChild);
  };

  ReorderableRepeat.prototype._updateIntention = function _updateIntention(targetIndex, beforeTarget) {
    var _dndService = this.dndService,
        isProcessing = _dndService.isProcessing,
        model = _dndService.model;

    if (!isProcessing) return;
    if (model.type !== this.type) return;

    var repeaterId = this.repeaterId;
    var isUsingGroup = model.type !== model.repeaterId;
    var inSameGroup = model.repeaterId === repeaterId;

    if (targetIndex < 0) return;

    var originalIndex = void 0;
    var currentIndex = void 0;
    var nextIndex = void 0;

    if (inSameGroup) {
      if (this.intention) {
        originalIndex = this.intention.fromIndex;
        currentIndex = this.intention.toIndex;
      } else {
        originalIndex = model.index;
        if (originalIndex < 0) return;
        currentIndex = originalIndex;
      }
    } else {
      if (this.intention && this.intention.toRepeaterId === repeaterId) {
        originalIndex = this.intention.fromIndex;
        currentIndex = this.intention.toIndex;
      } else {
        originalIndex = model.index;
        if (originalIndex < 0) return;
        currentIndex = targetIndex;
      }
    }

    if (currentIndex < targetIndex) {
      // grabbed item is currently above target
      if (beforeTarget) {
        nextIndex = targetIndex - 1;
      } else {
        nextIndex = targetIndex;
      }
    } else /* if (currentIndex > targetIndex) or across repeaters */{
        // grabbed item is currently below target
        if (beforeTarget) {
          nextIndex = targetIndex;
        } else {
          nextIndex = targetIndex + 1;
        }
      }

    if (!this.intention || this.intention.fromIndex !== originalIndex || this.intention.fromRepeaterId !== model.repeaterId || this.intention.toIndex !== nextIndex || this.intention.toRepeaterId !== repeaterId) {

      this.intention = {
        type: model.type,
        item: model.item,
        fromIndex: originalIndex,
        fromRepeaterId: model.repeaterId,
        toIndex: nextIndex,
        toRepeaterId: repeaterId
      };

      if (isUsingGroup) {
        // let other repeaters know
        this.ea.publish('reorderable-group:intention-changed', this.intention);
      }
    }
  };

  return ReorderableRepeat;
}(_aureliaTemplatingResources.AbstractRepeater), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'items', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'local', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'intention', [_aureliaBinding.observable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'patchedItems', [_aureliaBinding.observable], {
  enumerable: true,
  initializer: null
})), _class2)) || _class) || _class) || _class);
});
define('bcx-aurelia-reorderable-repeat/reorderable-repeat',['bcx-aurelia-reorderable-repeat/dist/reorderable-repeat'],function(m){return m;});
define('bcx-aurelia-reorderable-repeat/dist/reorderable-repeat-strategy-locator',['require','exports','module','./simple-array-repeat-strategy'],function (require, exports, module) {
'use strict';

exports.__esModule = true;
exports.ReorderableRepeatStrategyLocator = undefined;

var _simpleArrayRepeatStrategy = require('./simple-array-repeat-strategy');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ReorderableRepeatStrategyLocator = exports.ReorderableRepeatStrategyLocator = function () {
  function ReorderableRepeatStrategyLocator() {
    _classCallCheck(this, ReorderableRepeatStrategyLocator);

    this.matchers = [];
    this.strategies = [];
    this.addStrategy(function (items) {
      return items instanceof Array;
    }, new _simpleArrayRepeatStrategy.SimpleArrayRepeatStrategy());
  }

  ReorderableRepeatStrategyLocator.prototype.addStrategy = function addStrategy(matcher, strategy) {
    this.matchers.push(matcher);
    this.strategies.push(strategy);
  };

  ReorderableRepeatStrategyLocator.prototype.getStrategy = function getStrategy(items) {
    var matchers = this.matchers;

    for (var i = 0, ii = matchers.length; i < ii; ++i) {
      if (matchers[i](items)) {
        return this.strategies[i];
      }
    }

    return null;
  };

  return ReorderableRepeatStrategyLocator;
}();
});
define('bcx-aurelia-reorderable-repeat/reorderable-repeat-strategy-locator',['bcx-aurelia-reorderable-repeat/dist/reorderable-repeat-strategy-locator'],function(m){return m;});
define('bcx-aurelia-reorderable-repeat/dist/repeater-dnd-type',['require','exports','module'],function (require, exports, module) {
'use strict';

exports.__esModule = true;

exports.default = function (ref) {
  return prefix + ref;
};

var prefix = 'bcx-aurelia-reorderable-repeat:';
});
define('bcx-aurelia-reorderable-repeat/repeater-dnd-type',['bcx-aurelia-reorderable-repeat/dist/repeater-dnd-type'],function(m){return m;});
define('bcx-aurelia-reorderable-repeat/dist/simple-array-repeat-strategy',['require','exports','module','aurelia-templating-resources'],function (require, exports, module) {
'use strict';

exports.__esModule = true;
exports.SimpleArrayRepeatStrategy = undefined;

var _aureliaTemplatingResources = require('aurelia-templating-resources');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// dumbest array repeat strategy
var SimpleArrayRepeatStrategy = exports.SimpleArrayRepeatStrategy = function () {
  function SimpleArrayRepeatStrategy() {
    _classCallCheck(this, SimpleArrayRepeatStrategy);
  }

  SimpleArrayRepeatStrategy.prototype.getCollectionObserver = function getCollectionObserver(observerLocator, items) {
    return observerLocator.getArrayObserver(items);
  };

  SimpleArrayRepeatStrategy.prototype.instanceChanged = function instanceChanged(repeat, items) {
    repeat.removeAllViews(true, !repeat.viewsRequireLifecycle);

    var itemsLength = items.length;
    if (items && itemsLength > 0) {
      this._standardProcessInstanceChanged(repeat, items);
    }
  };

  SimpleArrayRepeatStrategy.prototype._standardProcessInstanceChanged = function _standardProcessInstanceChanged(repeat, items) {
    for (var i = 0, ii = items.length; i < ii; i++) {
      var overrideContext = (0, _aureliaTemplatingResources.createFullOverrideContext)(repeat, items[i], i, ii);
      repeat.addView(overrideContext.bindingContext, overrideContext);
    }
  };

  return SimpleArrayRepeatStrategy;
}();
});
define('bcx-aurelia-reorderable-repeat/simple-array-repeat-strategy',['bcx-aurelia-reorderable-repeat/dist/simple-array-repeat-strategy'],function(m){return m;});
define.switchToUserSpace();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImV4dGVuc2lvbi5qcyIsIm1haW4uanMiXSwibmFtZXMiOlsiQXBwIiwiaXRlbXMiLCJuYW1lIiwiY29uZmlndXJlIiwiY29uZmlnIiwicGx1Z2luIiwibW9kdWxlSWQiLCJQTEFURk9STSIsImVhY2hNb2R1bGUiLCJjYWxsYmFjayIsImRlZmluZWQiLCJnbG9iYWwiLCJyZXF1aXJlanMiLCJkZWZpbmVkVmFsdWVzIiwia2V5IiwiZSIsImF1cmVsaWEiLCJ1c2UiLCJzdGFuZGFyZENvbmZpZ3VyYXRpb24iLCJkZXZlbG9wbWVudExvZ2dpbmciLCJzdGFydCIsInRoZW4iLCJzZXRSb290Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0lBQWFBLEc7T0FDWEMsSyxHQUFRLENBQ047QUFBQ0MsSUFBQUEsSUFBSSxFQUFFO0FBQVAsR0FETSxFQUVOO0FBQUNBLElBQUFBLElBQUksRUFBRTtBQUFQLEdBRk0sRUFHTjtBQUFDQSxJQUFBQSxJQUFJLEVBQUU7QUFBUCxHQUhNLEM7Ozs7Ozs7Ozs7Ozs7OztBQ0RILFNBQVNDLFNBQVQsQ0FBbUJDLE1BQW5CLEVBQTJCO0FBQ2hDO0FBRUE7QUFDQUEsRUFBQUEsTUFBTSxDQUFDQyxNQUFQLENBQWMsZ0NBQWQ7QUFDRCxDLENBRUQ7OztBQUNPLElBQU1DLFFBQVEsR0FBRyxPQUFqQjs7Ozs7Ozs7OztBQ1JQOztBQUNBOztBQUVBO0FBQ0E7QUFDQUMscUJBQVNDLFVBQVQsR0FBc0IsVUFBU0MsUUFBVCxFQUFtQjtBQUN2QyxNQUFJQyxPQUFPLEdBQUdILHFCQUFTSSxNQUFULENBQWdCQyxTQUFoQixDQUEwQkMsYUFBMUIsRUFBZDs7QUFDQSxPQUFLLElBQUlDLEdBQVQsSUFBZ0JKLE9BQWhCLEVBQXlCO0FBQ3ZCLFFBQUk7QUFDRixVQUFJRCxRQUFRLENBQUNLLEdBQUQsRUFBTUosT0FBTyxDQUFDSSxHQUFELENBQWIsQ0FBWixFQUFpQztBQUNsQyxLQUZELENBRUUsT0FBT0MsQ0FBUCxFQUFVLENBQ1Y7QUFDRDtBQUNGO0FBQ0YsQ0FURDs7QUFXTyxTQUFTWixTQUFULENBQW1CYSxPQUFuQixFQUE0QjtBQUNqQ0EsRUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlDLHFCQUFaO0FBRUFGLEVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZRSxrQkFBWixDQUErQixNQUEvQixFQUhpQyxDQU1qQzs7QUFDQUgsRUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlaLE1BQVosQ0FBbUIsV0FBbkIsRUFQaUMsQ0FTakM7QUFDQTs7QUFDQVcsRUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlaLE1BQVosQ0FBbUIsZ0NBQW5CO0FBRUEsU0FBT1csT0FBTyxDQUFDSSxLQUFSLEdBQWdCQyxJQUFoQixDQUFxQjtBQUFBLFdBQU1MLE9BQU8sQ0FBQ00sT0FBUixFQUFOO0FBQUEsR0FBckIsQ0FBUDtBQUNEIiwiZmlsZSI6ImV4dGVuc2lvbi1hdS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBBcHAge1xuICBpdGVtcyA9IFtcbiAgICB7bmFtZTogJ0ZpcnN0J30sXG4gICAge25hbWU6ICdTZWNvbmQnfSxcbiAgICB7bmFtZTogJ1RoaXJkJ31cbiAgXTtcbn0iLCJleHBvcnQgZnVuY3Rpb24gY29uZmlndXJlKGNvbmZpZykge1xuICAvLyBkb24ndCBsb2FkIHNoYXJlZC11aSBhcyBwcm92aWRlZCBieSBob3N0LWFwcFxuXG4gIC8vIGxvYWQgcmVvcmRlcmFibGUtcmVwZWF0XG4gIGNvbmZpZy5wbHVnaW4oJ2JjeC1hdXJlbGlhLXJlb3JkZXJhYmxlLXJlcGVhdCcpO1xufVxuXG4vLyB0aGUgY29tcG9uZW50IHRvIGJlIGxvYWRlZCBieSBob3N0LWFwcFxuZXhwb3J0IGNvbnN0IG1vZHVsZUlkID0gJy4vYXBwJztcbiIsImltcG9ydCB7UExBVEZPUk19IGZyb20gJ2F1cmVsaWEtcGFsJztcbmltcG9ydCAnQGJhYmVsL3BvbHlmaWxsJztcblxuLy8gVXNlIGR1bWJlci1tb2R1bGUtbG9hZGVyLFxuLy8gVGhpcyBiaXQgd2lsbCBiZSBhZGRlZCB0byBhdXJlbGlhLWxvYWRlci1kZWZhdWx0XG5QTEFURk9STS5lYWNoTW9kdWxlID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgbGV0IGRlZmluZWQgPSBQTEFURk9STS5nbG9iYWwucmVxdWlyZWpzLmRlZmluZWRWYWx1ZXMoKTtcbiAgZm9yIChsZXQga2V5IGluIGRlZmluZWQpIHtcbiAgICB0cnkge1xuICAgICAgaWYgKGNhbGxiYWNrKGtleSwgZGVmaW5lZFtrZXldKSkgcmV0dXJuO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vXG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gY29uZmlndXJlKGF1cmVsaWEpIHtcbiAgYXVyZWxpYS51c2Uuc3RhbmRhcmRDb25maWd1cmF0aW9uKCk7XG5cbiAgYXVyZWxpYS51c2UuZGV2ZWxvcG1lbnRMb2dnaW5nKCdpbmZvJyk7XG5cblxuICAvLyBzaGFyZWQtdWkgaXMgcHJvdmlkZWQgaW4gaG9zdC1hcHBcbiAgYXVyZWxpYS51c2UucGx1Z2luKCdzaGFyZWQtdWknKTtcblxuICAvLyByZW9yZGVyYWJsZS1yZXBlYXQgaXMgbm90IHByb3ZpZGVkIGluIGhvc3QtYXBwXG4gIC8vIHdlIHdpbGwgbG9hZCBpdCBhZ2FpbiBpbiB0aGUgZW50cnkgZmlsZSBgcGx1Z2luLmpzYFxuICBhdXJlbGlhLnVzZS5wbHVnaW4oJ2JjeC1hdXJlbGlhLXJlb3JkZXJhYmxlLXJlcGVhdCcpO1xuXG4gIHJldHVybiBhdXJlbGlhLnN0YXJ0KCkudGhlbigoKSA9PiBhdXJlbGlhLnNldFJvb3QoKSk7XG59XG4iXX0=