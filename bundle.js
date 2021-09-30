/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_base_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_base_scss__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_base_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@charset \"UTF-8\";\nhtml {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  width: 100vw;\n}\n\nbody {\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n  height: 100%;\n  color: #2F3E46;\n  font-family: \"Raleway\", sans-serif;\n  margin: 0;\n  padding: 0;\n  width: 100%;\n}\nbody::before {\n  content: \"\";\n  background-image: url(\"https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80\");\n  opacity: 0.5;\n  background-size: cover;\n  background-repeat: repeat;\n  position: absolute;\n  top: 0px;\n  right: 0px;\n  bottom: 0px;\n  left: 0px;\n}\n\n.header {\n  display: flex;\n  align-items: center;\n  padding: 0 30px;\n  position: relative;\n  justify-content: space-between;\n}\n.header button {\n  font-size: 16px;\n  font-weight: 700;\n}\n\n.main {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  display: flex;\n  align-items: center;\n  box-sizing: border-box;\n  flex: 1;\n}\n\n.search-form-container {\n  display: flex;\n  flex-direction: column;\n  display: flex;\n  align-items: center;\n  height: 200px;\n  width: 750px;\n  justify-content: center;\n  margin: 0x 100px 0 100px;\n  border-radius: 10px;\n}\n.search-form-container h2 {\n  margin-top: 0;\n}\n.search-form-container form {\n  display: flex;\n  flex-direction: column;\n  font-size: 16px;\n  font-weight: 700;\n  width: 100%;\n}\n.search-form-container form div {\n  display: flex;\n  justify-content: center;\n}\n.search-form-container form select,\n.search-form-container form label,\n.search-form-container form input {\n  margin-left: 10px;\n}\n\nbutton {\n  cursor: pointer;\n  display: flex;\n  justify-content: space-around;\n  padding: 8px;\n}\n\n.bookings-button,\n.log-out-button,\n.book-button,\n.form__search-button {\n  background-color: #fff;\n  border: 1px solid #2F3E46;\n  border-radius: 5px;\n  color: #2F3E46;\n  margin-bottom: 5px;\n  text-transform: uppercase;\n  transition: all 0.2s ease-in-out;\n  width: 150px;\n}\n.bookings-button:hover,\n.log-out-button:hover,\n.book-button:hover,\n.form__search-button:hover {\n  background-color: #C38300;\n  color: #fff;\n  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2);\n}\n\n.log-out-button {\n  display: flex;\n  align-items: center;\n  background-color: transparent;\n  border: 0;\n}\n.log-out-button p {\n  margin: 0;\n}\n\n.form__search-button {\n  margin-top: 25px;\n  text-transform: uppercase;\n  width: 200px;\n}\n\n.bookings-container {\n  display: flex;\n  flex-direction: column;\n  width: 1000px;\n  border-radius: 10px;\n  margin-top: 50px;\n}\n.bookings-container div {\n  display: flex;\n}\n.bookings-container div article {\n  display: flex;\n  flex-direction: column;\n  display: flex;\n  align-items: center;\n  width: 100%;\n  text-align: center;\n}\n.bookings-container div article h2 {\n  margin: 0;\n}\n.bookings-container div article ul {\n  font-size: 16px;\n  font-weight: 700;\n  list-style-type: none;\n  line-height: 30px;\n  overflow-y: auto;\n  padding: 0 5px;\n  height: 300px;\n}\n.bookings-container h3 {\n  background-color: rgba(255, 255, 255, 0.75);\n  border-radius: 5px;\n  text-align: center;\n}\n\n.search-results-container {\n  display: flex;\n  flex-direction: column;\n  display: flex;\n  align-items: center;\n  width: 1200px;\n}\n\n.search-results-container__rooms-container {\n  display: flex;\n  gap: 30px;\n  width: 1200px;\n  overflow-x: auto;\n}\n.search-results-container__rooms-container ul {\n  font-size: 16px;\n  font-weight: 700;\n  list-style-type: none;\n  padding-left: 10px;\n}\n\n.rooms-container__room-card {\n  display: flex;\n  flex-direction: column;\n  display: flex;\n  align-items: center;\n  background-color: #fff;\n}\n.rooms-container__room-card img {\n  height: 150px;\n  width: 200px;\n  filter: brightness(0.9);\n}\n\n.bookings-button {\n  display: flex;\n  align-items: center;\n  border-radius: 50%;\n  bottom: 30px;\n  height: 50px;\n  position: fixed;\n  right: 30px;\n  width: 50px;\n}\n\n.error-message {\n  font-size: 16px;\n  font-weight: 700;\n  color: red;\n}\n\n.modal.is-open {\n  display: block;\n}\n\n.modal__overlay {\n  display: flex;\n  align-items: center;\n  background: rgba(0, 0, 0, 0.6);\n  bottom: 0;\n  justify-content: center;\n  left: 0;\n  position: fixed;\n  right: 0;\n  top: 0;\n}\n\n.modal__container {\n  background-color: #fff;\n  border-radius: 4px;\n  box-sizing: border-box;\n  max-height: 100vh;\n  max-width: 500px;\n  overflow-y: auto;\n  padding: 30px;\n}\n\n.modal__header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n\n.modal__title {\n  box-sizing: border-box;\n  color: #2F3E46;\n  font-size: 1.25rem;\n  font-weight: 600;\n  margin-top: 0;\n  margin-bottom: 0;\n  line-height: 1.25;\n}\n\n.modal__close {\n  background: transparent;\n  border: 0;\n}\n\n.modal__header .modal__close:before {\n  content: \"✕\";\n}\n\n.modal__content {\n  display: block;\n  padding: 0;\n  margin-top: 2rem;\n  margin-bottom: 2rem;\n  line-height: 1.5;\n  color: rgba(0, 0, 0, 0.8);\n}\n\n.modal__footer {\n  display: flex;\n  justify-content: flex-end;\n}\n\n.modal__button {\n  font-size: 16px;\n  font-weight: 700;\n  color: #2F3E46;\n  background-color: #fff;\n  border: 1px solid #2F3E46;\n  border-radius: 4px;\n  margin: 5px;\n  transition: all 0.2s ease-in-out;\n}\n.modal__button:hover {\n  background-color: #C38300;\n  color: #fff;\n}\n\n.login__modal {\n  display: flex;\n  flex-direction: column;\n  display: flex;\n  align-items: center;\n  height: 400px;\n  width: 1000px;\n  justify-content: center;\n}\n\n.login-form {\n  display: flex;\n  flex-direction: column;\n  display: flex;\n  align-items: center;\n  height: 200px;\n  justify-content: space-evenly;\n}\n\n.modal,\n.hidden {\n  display: none;\n}", "",{"version":3,"sources":["webpack://./src/css/base.scss","webpack://./src/css/_mixins.scss","webpack://./src/css/_variables.scss"],"names":[],"mappings":"AAAA,gBAAgB;AAGhB;ECFE,aAAA;EACA,sBAAA;EDGA,YAAA;EACA,YAAA;AAAF;;AAGA;ECRE,aAAA;EACA,sBAAA;EDSA,OAAA;EACA,YAAA;EACA,cETc;EFUd,kCEba;EFcb,SAAA;EACA,UAAA;EACA,WAAA;AACF;AACE;EACE,WAAA;EACA,uLAAA;EACA,YAAA;EACA,sBAAA;EACA,yBAAA;EACA,kBAAA;EACA,QAAA;EACA,UAAA;EACA,WAAA;EACA,SAAA;AACJ;;AAGA;ECtBE,aAAA;EACA,mBAAA;EDuBA,eAAA;EACA,kBAAA;EACA,8BAAA;AACF;AACE;ECjCA,eAAA;EACA,gBAAA;ADmCF;;AAEA;EACE,kBAAA;EC5CA,aAAA;EACA,sBAAA;EASA,aAAA;EACA,mBAAA;EDoCA,sBAAA;EACA,OAAA;AAGF;;AAAA;ECnDE,aAAA;EACA,sBAAA;EASA,aAAA;EACA,mBAAA;EAIA,aDuCgB;ECtChB,YDsCuB;EACvB,uBAAA;EACA,wBAAA;EACA,mBAAA;AAMF;AAJE;EACE,aAAA;AAMJ;AAHE;EC/DA,aAAA;EACA,sBAAA;EAIA,eAAA;EACA,gBAAA;ED4DE,WAAA;AAOJ;AALI;EACE,aAAA;EACA,uBAAA;AAON;AAJI;;;EAGE,iBAAA;AAMN;;AADA;EACE,eAAA;EACA,aAAA;EACA,6BAAA;EACA,YAAA;AAIF;;AADA;;;;EAIE,sBEtFM;EFuFN,yBEjFe;EFkFf,kBAAA;EACA,cE5Fc;EF6Fd,kBAAA;EACA,yBAAA;EACA,gCEnFmB;EFoFnB,YAAA;AAIF;AAFE;;;;EACE,yBEjGc;EFkGd,WEjGI;EFkGJ,2EE3FK;AFkGT;;AAHA;EClGE,aAAA;EACA,mBAAA;EDmGA,6BAAA;EACA,SAAA;AAOF;AALE;EACE,SAAA;AAOJ;;AAHA;EACE,gBAAA;EACA,yBAAA;EACA,YAAA;AAMF;;AAHA;EC5HE,aAAA;EACA,sBAAA;ED6HA,aAAA;EACA,mBAAA;EACA,gBAAA;AAOF;AALE;EACE,aAAA;AAOJ;AALI;ECrIF,aAAA;EACA,sBAAA;EASA,aAAA;EACA,mBAAA;ED6HI,WAAA;EACA,kBAAA;AASN;AAPM;EACE,SAAA;AASR;AANM;EC1IJ,eAAA;EACA,gBAAA;ED2IM,qBAAA;EACA,iBAAA;EACA,gBAAA;EACA,cAAA;EACA,aAAA;AASR;AAJE;EACE,2CEjJgB;EFkJhB,kBAAA;EACA,kBAAA;AAMJ;;AAFA;ECjKE,aAAA;EACA,sBAAA;EASA,aAAA;EACA,mBAAA;EDyJA,aAAA;AAOF;;AAJA;EACE,aAAA;EACA,SAAA;EACA,aAAA;EACA,gBAAA;AAOF;AALE;ECxKA,eAAA;EACA,gBAAA;EDyKE,qBAAA;EACA,kBAAA;AAQJ;;AAJA;ECpLE,aAAA;EACA,sBAAA;EASA,aAAA;EACA,mBAAA;ED4KA,sBEjLM;AF0LR;AAPE;EC1KA,aD2KkB;EC1KlB,YD0KyB;EACvB,uBAAA;AAUJ;;AANA;ECrLE,aAAA;EACA,mBAAA;EDsLA,kBAAA;EACA,YAAA;EACA,YAAA;EACA,eAAA;EACA,WAAA;EACA,WAAA;AAUF;;AAPA;ECpME,eAAA;EACA,gBAAA;EDqMA,UAAA;AAWF;;AARA;EACC,cAAA;AAWD;;AARA;ECxME,aAAA;EACA,mBAAA;EDyMA,8BAAA;EACA,SAAA;EACA,uBAAA;EACA,OAAA;EACA,eAAA;EACA,QAAA;EACA,MAAA;AAYF;;AATA;EACE,sBExNM;EFyNN,kBAAA;EACA,sBAAA;EACA,iBAAA;EACA,gBAAA;EACA,gBAAA;EACA,aAAA;AAYF;;AATA;EC7NE,aAAA;EACA,mBAAA;ED8NA,8BAAA;AAaF;;AAVA;EACE,sBAAA;EACA,cE3Oc;EF4Od,kBAAA;EACA,gBAAA;EACA,aAAA;EACA,gBAAA;EACA,iBAAA;AAaF;;AAVA;EACE,uBAAA;EACA,SAAA;AAaF;;AAVA;EACE,YAAA;AAaF;;AAVA;EACC,cAAA;EACA,UAAA;EACC,gBAAA;EACA,mBAAA;EACA,gBAAA;EACA,yBE5PuB;AFyQzB;;AAVA;EACC,aAAA;EACA,yBAAA;AAaD;;AAVA;ECxQE,eAAA;EACA,gBAAA;EDyQD,cE5Qe;EF6Qf,sBE1QO;EF2QN,yBAAA;EACD,kBAAA;EACA,WAAA;EACA,gCErQoB;AFmRrB;AAZE;EACE,yBElRc;EFmRd,WElRI;AFgSR;;AAVA;EC5RE,aAAA;EACA,sBAAA;EASA,aAAA;EACA,mBAAA;EAIA,aDgRgB;EC/QhB,aD+QuB;EACvB,uBAAA;AAgBF;;AAbA;ECnSE,aAAA;EACA,sBAAA;EASA,aAAA;EACA,mBAAA;ED2RA,aAAA;EACA,6BAAA;AAkBF;;AAfA;;EAEE,aAAA;AAkBF","sourcesContent":["@import '_variables';\n @import '_mixins';\n\nhtml {\n  @include flex-column();\n  height: 100%;\n  width: 100vw;\n}\n\nbody {\n  @include flex-column();\n  flex: 1;\n  height: 100%;\n  color: $primary-color;\n  font-family: $primary-font;\n  margin: 0;\n  padding: 0;\n  width: 100%;\n\n  &::before {\n    content: '';\n    background-image: url('https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80');\n    opacity: 0.5;\n    background-size: cover;\n    background-repeat: repeat;\n    position: absolute;\n    top: 0px;\n    right: 0px;\n    bottom: 0px;\n    left: 0px;\n  }\n}\n\n.header {\n  @include flex-cross-axis-center;\n  padding: 0 30px;\n  position: relative;\n  justify-content: space-between;\n\n  button {\n    @include bold-font()\n  }\n}\n\n.main {\n  position: relative;\n  @include flex-column();\n  @include flex-cross-axis-center();\n  box-sizing: border-box;\n  flex: 1;\n}\n\n.search-form-container {\n  @include flex-column();\n  @include flex-cross-axis-center();\n  @include square(200px, 750px);\n  justify-content: center;\n  margin: 0x 100px 0 100px;\n  border-radius: 10px;\n\n  h2 {\n    margin-top: 0;\n  }\n\n  form {\n    @include flex-column();\n    @include bold-font();\n    width: 100%;\n\n    div {\n      display: flex;\n      justify-content: center;\n    }\n\n    select,\n    label,\n    input {\n      margin-left: 10px;\n    }\n  }\n}\n\nbutton {\n  cursor: pointer;\n  display: flex;\n  justify-content: space-around;\n  padding: 8px;\n}\n\n.bookings-button,\n.log-out-button,\n.book-button,\n.form__search-button {\n  background-color: $white;\n  border: $primary-border;\n  border-radius: 5px;\n  color: $primary-color;\n  margin-bottom: 5px;\n  text-transform: uppercase;\n  transition: $primary-transition;\n  width: 150px;\n\n  &:hover {\n    background-color: $secondary-color;\n    color: $white;\n    box-shadow: $shadow;\n  }\n}\n\n.log-out-button {\n  @include flex-cross-axis-center();\n  background-color: transparent;\n  border: 0;\n\n  p {\n    margin: 0;\n  }\n}\n\n.form__search-button {\n  margin-top: 25px;\n  text-transform: uppercase;\n  width: 200px;\n}\n\n.bookings-container {\n  @include flex-column();\n  width: 1000px;\n  border-radius: 10px;\n  margin-top: 50px;\n\n  div {\n    display: flex;\n\n    article {\n      @include flex-column();\n      @include flex-cross-axis-center();\n      width: 100%;\n      text-align: center;\n\n      h2 {\n        margin: 0;\n      }\n\n      ul {\n        @include bold-font();\n        list-style-type: none;\n        line-height: 30px;\n        overflow-y: auto;\n        padding: 0 5px;\n        height: 300px;\n      }\n    }\n  }\n\n  h3 {\n    background-color: $transparent-white;\n    border-radius: 5px;\n    text-align: center;\n  }\n}\n\n.search-results-container {\n  @include flex-column();\n  @include flex-cross-axis-center();\n  width: 1200px;\n}\n\n.search-results-container__rooms-container {\n  display: flex;\n  gap: 30px;\n  width: 1200px;\n  overflow-x: auto;\n\n  ul {\n    @include bold-font();\n    list-style-type: none;\n    padding-left: 10px;\n  }\n}\n\n.rooms-container__room-card {\n  @include flex-column();\n  @include flex-cross-axis-center();\n  background-color: $white;\n\n  img {\n    @include square(150px, 200px);\n    filter: brightness(0.9);\n  }\n}\n\n.bookings-button {\n  @include flex-cross-axis-center();\n  border-radius: 50%;\n  bottom: 30px;\n  height: 50px;\n  position: fixed;\n  right: 30px;\n  width: 50px;\n}\n\n.error-message {\n  @include bold-font();\n  color: red;\n}\n\n.modal.is-open {\n\tdisplay: block;\n}\n\n.modal__overlay {\n  @include flex-cross-axis-center();\n  background: rgba(0,0,0,0.6);\n  bottom: 0;\n  justify-content: center;\n  left: 0;\n  position: fixed;\n  right: 0;\n  top: 0;\n}\n\n.modal__container {\n  background-color: $white;\n  border-radius: 4px;\n  box-sizing: border-box;\n  max-height: 100vh;\n  max-width: 500px;\n  overflow-y: auto;\n  padding: 30px;\n}\n\n.modal__header {\n  @include flex-cross-axis-center();\n  justify-content: space-between;\n}\n\n.modal__title {\n  box-sizing: border-box;\n  color: $primary-color;\n  font-size: 1.25rem;\n  font-weight: 600;\n  margin-top: 0;\n  margin-bottom: 0;\n  line-height: 1.25;\n}\n\n.modal__close {\n  background: transparent;\n  border: 0;\n}\n\n.modal__header .modal__close:before {\n  content: \"\\2715\";\n}\n\n.modal__content {\n\tdisplay: block;\n\tpadding: 0;\n  margin-top: 2rem;\n  margin-bottom: 2rem;\n  line-height: 1.5;\n  color: $transparent-black-dark;\n}\n\n.modal__footer {\n\tdisplay: flex;\n\tjustify-content: flex-end;\n}\n\n.modal__button {\n  @include bold-font();\n\tcolor: $primary-color;\n\tbackground-color: $white;\n  border: 1px solid $primary-color;\n\tborder-radius: 4px;\n\tmargin: 5px;\n\ttransition: $primary-transition;\n\n  &:hover {\n    background-color: $secondary-color;\n    color: $white;\n  }\n}\n\n.login__modal {\n  @include flex-column();\n  @include flex-cross-axis-center();\n  @include square(400px, 1000px);\n  justify-content: center;\n}\n\n.login-form {\n  @include flex-column();\n  @include flex-cross-axis-center();\n  height: 200px;\n  justify-content: space-evenly;\n}\n\n.modal,\n.hidden {\n  display: none;\n}\n","@mixin flex-column() {\n  display: flex;\n  flex-direction: column;\n}\n\n@mixin bold-font() {\n  font-size: 16px;\n  font-weight: 700;\n}\n\n@mixin flex-cross-axis-center() {\n  display: flex;\n  align-items: center;\n}\n\n@mixin square($height, $width) {\n  height: $height;\n  width: $width;\n}\n","\n$primary-font: 'Raleway', sans-serif;\n$secondary-font: 'Quicksand', sans-serif;\n\n$primary-color: #2F3E46;\n$primary-color-x-light: #d3d3d3;\n$secondary-color: #C38300;\n$white: #fff;\n\n$transparent-black: rgba(0, 0, 0, 0.2);\n$transparent-black-dark: rgba(0, 0, 0, 0.8);\n$transparent-white: rgba(255, 255, 255, 0.75);\n\n$primary-border: 1px solid $primary-color;\n$shadow: 0 4px 8px 0 $transparent-black,  0 6px 20px 0 $transparent-black;\n\n$primary-transition: all 0.2s ease-in-out;\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadRooms": () => (/* binding */ loadRooms),
/* harmony export */   "loadAllCustomers": () => (/* binding */ loadAllCustomers),
/* harmony export */   "loadSingleCustomer": () => (/* binding */ loadSingleCustomer),
/* harmony export */   "loadBookings": () => (/* binding */ loadBookings),
/* harmony export */   "addNewBookings": () => (/* binding */ addNewBookings)
/* harmony export */ });
/* harmony import */ var _domUpdates__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);

const apiEndpoint = 'http://localhost:3001';

function loadRooms() {
  return fetch(`${apiEndpoint}/api/v1/rooms`)
    .then(response => response.json())
    .then(data => data.rooms)
    .catch(error => {
      console.error(error);
      _domUpdates__WEBPACK_IMPORTED_MODULE_0__.default.displayErrorMessage();
    })
}

function loadAllCustomers() {
  return fetch(`${apiEndpoint}/api/v1/customers`)
    .then(response => response.json())
    .then(data => data.customers)
    .catch(error => {
      console.error(error);
      _domUpdates__WEBPACK_IMPORTED_MODULE_0__.default.displayErrorMessage();
    })
}

function loadSingleCustomer(customerID) {
  return fetch(`${apiEndpoint}/api/v1/customers/${customerID}`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
      console.error(error);
      _domUpdates__WEBPACK_IMPORTED_MODULE_0__.default.displayErrorMessage();
    })
}

function loadBookings() {
  return fetch(`${apiEndpoint}/api/v1/bookings`)
    .then(response => response.json())
    .then(data => data.bookings)
    .catch(error => {
      console.error(error);
      _domUpdates__WEBPACK_IMPORTED_MODULE_0__.default.displayErrorMessage();
    })
}

function addNewBookings(userId, date, roomNumber) {
  return fetch(`${apiEndpoint}/api/v1/bookings`, {
    method: 'POST',
    body: JSON.stringify({
      "userID": userId,
      "date": date,
      "roomNumber": roomNumber
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => checkResponse(response))
    .then(data => data.newBooking)
    .catch(error => {
      console.error(error);
      _domUpdates__WEBPACK_IMPORTED_MODULE_0__.default.displayErrorMessage();
    })
}

function checkResponse(response) {
  if (!response.ok) {
    throw new Error('Please enter valid input.')
  }
  return response.json();
}




/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const domUpdates = {
  loginForm: document.getElementById('loginForm'),

  loginErrorMessage: document.getElementById('loginErrorMessage'),

  logoutButton: document.getElementById('logoutButton'),

  searchForm: document.getElementById('searchForm'),

  searchResultsContainer: document.getElementById('searchResultsContainer'),

  availableRoomsTitle: document.getElementById('availableRoomsTitle'),

  availableRoomsContainer: document.getElementById('availableRoomsContainer'),

  noRoomsMessage: document.getElementById('noRoomsMessage'),

  bookingsContainer: document.getElementById('bookingsContainer'),

  upcomingBookingsList: document.getElementById('upcomingBookingsList'),

  presentBookingsList: document.getElementById('presentBookingsList'),

  pastBookingsList: document.getElementById('pastBookingsList'),

  totalSpent: document.getElementById('totalSpent'),

  confirmationMessage: document.getElementById('confirmation-message'),

  confirmationButton: document.getElementById('confirmBookingButton'),

  bookingsButton: document.getElementById('bookingsButton'),

  confirmationModalFooter: document.getElementById('confirmationModalFooter'),

  show(element) {
    element.classList.remove('hidden');
  },

  hide(element) {
    element.classList.add('hidden');
  },

  renderBookings(container, bookings) {
    container.innerHTML = '';
    bookings.forEach(booking => {
      container.innerHTML += '<li>' + booking + '</li>'
    })
  },

  renderAvailableRooms(rooms) {
    availableRoomsContainer.innerHTML = '';
    rooms.forEach(room => {
      const bidet = room.hasBidet ? 'yes' : 'no';
      availableRoomsContainer.innerHTML +=
      `<article class="rooms-container__room-card" id=${room.number}>
        <img src=${room.imageSrc} alt="${room.bedSize} bed bedroom">
        <ul>
          <li>Room #${room.number}</li>
          <li>Type: ${room.roomType}</li>
          <li>Bidet: ${bidet}</li>
          <li>Bed size: ${room.bedSize}</li>
          <li>Number of beds: ${room.numBeds}</li>
          <li>Cost per night: $${room.costPerNight.toFixed(2)}</li>
        </ul>
        <button class="book-button">BOOK NOW</button>
      </article>`
    })
  },

  renderModalInformation(roomInfo) {
    domUpdates.confirmationMessage.innerHTML = `
    <p>Check In: ${searchForm[0].value}</p>
    <p>Number of nights: ${searchForm[1].value}</p>
    <p>Room #: ${roomInfo.number}</p>
    <p>Cost per night: $${roomInfo.costPerNight}</p>
    <p>Click YES, to confirm and update your bookings.</p>
    `
    MicroModal.show('confirm-booking-modal');
    domUpdates.show(confirmationModalFooter);
  },

  displayErrorMessage() {
    MicroModal.show('connection-error-modal');
  },

  confirmBooking() {
    domUpdates.confirmationMessage.innerHTML =
    '<p>Your booking has been made!</p>';

    domUpdates.hide(confirmationModalFooter);
  },

  displayAvailableRooms(availableRooms) {
    domUpdates.hide(bookingsContainer);
    domUpdates.show(searchResultsContainer);

    if (availableRooms.length) {
      domUpdates.renderAvailableRooms(availableRooms);
      domUpdates.show(availableRoomsTitle);
      domUpdates.show(availableRoomsContainer);
      domUpdates.hide(noRoomsMessage);
    } else {
      domUpdates.show(noRoomsMessage);
      domUpdates.hide(availableRoomsTitle);
      domUpdates.hide(availableRoomsContainer);
    }
  },

  displayBookings(bookings) {
    domUpdates.hide(searchResultsContainer);
    domUpdates.show(bookingsContainer);
    searchForm.reset();

    domUpdates.renderBookings(pastBookingsList, bookings.past);
    domUpdates.renderBookings(presentBookingsList, bookings.present);
    domUpdates.renderBookings(upcomingBookingsList, bookings.upcoming);
  }
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (domUpdates);


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/twin-bed.jpg");

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/full-bed.jpg");

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/queen-bed.jpg");

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/king-bed.jpg");

/***/ }),
/* 12 */
/***/ (function(module) {

!function(t,e){ true?module.exports=e():0}(this,(function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",f="month",h="quarter",c="year",d="date",$="Invalid Date",l=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},m=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},g={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,f),s=n-i<0,u=e.clone().add(r+(s?-1:1),f);return+(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:f,y:c,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},D="en",v={};v[D]=M;var p=function(t){return t instanceof _},S=function(t,e,n){var r;if(!t)return D;if("string"==typeof t)v[t]&&(r=t),e&&(v[t]=e,r=t);else{var i=t.name;v[i]=t,r=i}return!n&&r&&(D=r),r||!n&&D},w=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},O=g;O.l=S,O.i=p,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t)}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(l);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return O},m.isValid=function(){return!(this.$d.toString()===$)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!O.u(e)||e,h=O.p(t),$=function(t,e){var i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},l=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,g="set"+(this.$u?"UTC":"");switch(h){case c:return r?$(1,0):$(31,11);case f:return r?$(1,M):$(0,M+1);case o:var D=this.$locale().weekStart||0,v=(y<D?y+7:y)-D;return $(r?m-v:m+(6-v),M);case a:case d:return l(g+"Hours",0);case u:return l(g+"Minutes",1);case s:return l(g+"Seconds",2);case i:return l(g+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=O.p(t),h="set"+(this.$u?"UTC":""),$=(n={},n[a]=h+"Date",n[d]=h+"Date",n[f]=h+"Month",n[c]=h+"FullYear",n[u]=h+"Hours",n[s]=h+"Minutes",n[i]=h+"Seconds",n[r]=h+"Milliseconds",n)[o],l=o===a?this.$D+(e-this.$W):e;if(o===f||o===c){var y=this.clone().set(d,1);y.$d[$](l),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d}else $&&this.$d[$](l);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[O.p(t)]()},m.add=function(r,h){var d,$=this;r=Number(r);var l=O.p(h),y=function(t){var e=w($);return O.w(e.date(e.date()+Math.round(t*r)),$)};if(l===f)return this.set(f,this.$M+r);if(l===c)return this.set(c,this.$y+r);if(l===a)return y(1);if(l===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[l]||1,m=this.$d.getTime()+r*M;return O.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||$;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=O.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,f=n.months,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].substr(0,s)},c=function(t){return O.s(s%12||12,t,"0")},d=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:O.s(a+1,2,"0"),MMM:h(n.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:O.s(this.$D,2,"0"),d:String(this.$W),dd:h(n.weekdaysMin,this.$W,o,2),ddd:h(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:O.s(s,2,"0"),h:c(1),hh:c(2),a:d(s,u,!0),A:d(s,u,!1),m:String(u),mm:O.s(u,2,"0"),s:String(this.$s),ss:O.s(this.$s,2,"0"),SSS:O.s(this.$ms,3,"0"),Z:i};return r.replace(y,(function(t,e){return e||l[t]||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,$){var l,y=O.p(d),M=w(r),m=(M.utcOffset()-this.utcOffset())*e,g=this-M,D=O.m(this,M);return D=(l={},l[c]=D/12,l[f]=D,l[h]=D/3,l[o]=(g-m)/6048e5,l[a]=(g-m)/864e5,l[u]=g/n,l[s]=g/e,l[i]=g/t,l)[y]||g,$?D:O.a(D)},m.daysInMonth=function(){return this.endOf(f).$D},m.$locale=function(){return v[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return O.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),b=_.prototype;return w.prototype=b,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",f],["$y",c],["$D",d]].forEach((function(t){b[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,_,w),t.$i=!0),w},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t)},w.en=v[D],w.Ls=v,w.p={},w}));

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var dayjs_plugin_isBetween__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14);
/* harmony import */ var dayjs_plugin_isBetween__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dayjs_plugin_isBetween__WEBPACK_IMPORTED_MODULE_1__);



dayjs__WEBPACK_IMPORTED_MODULE_0___default().extend((dayjs_plugin_isBetween__WEBPACK_IMPORTED_MODULE_1___default()))

class Customer {
  constructor(customer) {
    this.id = customer.id;
    this.name = customer.name;
    this.bookings = [];
  }

  getBookings(bookings) {
    this.bookings = bookings.filter(booking => booking.userID === this.id)
  }

  getPastBookings() {
    const today = dayjs__WEBPACK_IMPORTED_MODULE_0___default()();

    const pastBookings = this.bookings.filter(booking => {
      const checkOut = dayjs__WEBPACK_IMPORTED_MODULE_0___default()(booking.checkInDate)
      .add(booking.duration, 'day');

      return checkOut.isBefore(today);
    }).map(booking => `Date: ${booking.checkInDate} Room Number: ${booking.roomNumber}`)

    if (pastBookings.length) {
      return pastBookings;
    } else {
      return ['We couldn\'t find any past bookings.']
    }
  }

  getPresentBookings() {
    const today = dayjs__WEBPACK_IMPORTED_MODULE_0___default()();

    const presentBookings = this.bookings.filter(booking => {
      const checkOut = dayjs__WEBPACK_IMPORTED_MODULE_0___default()(booking.checkInDate)
      .add(booking.duration, 'day')

      return today.isBetween(booking.checkInDate, checkOut, null, '[]')
    }).map(booking => `Date: ${booking.checkInDate} Room Number: ${booking.roomNumber}`)

    if (presentBookings.length) {
      return presentBookings;
    } else {
      return ['We couldn\'t find any present bookings.'];
    }
  }

  getUpcomingBookings() {
    const today = dayjs__WEBPACK_IMPORTED_MODULE_0___default()();

    const upcomingBookings = this.bookings.filter(booking => {
      return dayjs__WEBPACK_IMPORTED_MODULE_0___default()(booking.checkInDate).isAfter(today);
    }).map(booking => `Date: ${booking.checkInDate} Room Number: ${booking.roomNumber}`)

    if (upcomingBookings.length) {
      return upcomingBookings;
    } else {
      return ['We couldn\'t find any upcoming bookings. Book your next adventure!'];
    }
  }

  returnBookingsRequest(checkIn, numberOfNights, roomNumber) {
    const dates = [ dayjs__WEBPACK_IMPORTED_MODULE_0___default()(checkIn).format('YYYY/MM/DD') ];

    for (let i = 1; i < numberOfNights; i++) {
      const addDay = dayjs__WEBPACK_IMPORTED_MODULE_0___default()(checkIn)
      .add(i, 'day').format('YYYY/MM/DD')

      dates.push(addDay);
    }

    const bookings = dates.map(date => {
     return {
        userID: this.id,
        date: date,
        roomNumber: roomNumber
      };
    });

    return bookings;
  }

  calculateTotalSpent(rooms) {
    return this.bookings.reduce((acc, booking) => {
      acc += booking.calculateCost(rooms);
      return acc;
    }, 0)
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Customer);


/***/ }),
/* 14 */
/***/ (function(module) {

!function(e,i){ true?module.exports=i():0}(this,(function(){"use strict";return function(e,i,t){i.prototype.isBetween=function(e,i,s,f){var n=t(e),o=t(i),r="("===(f=f||"()")[0],u=")"===f[1];return(r?this.isAfter(n,s):!this.isBefore(n,s))&&(u?this.isBefore(o,s):!this.isAfter(o,s))||(r?this.isBefore(n,s):!this.isAfter(n,s))&&(u?this.isAfter(o,s):!this.isBefore(o,s))}}}));

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Room__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);
/* harmony import */ var _Booking__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(17);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var dayjs_plugin_isBetween__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(14);
/* harmony import */ var dayjs_plugin_isBetween__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(dayjs_plugin_isBetween__WEBPACK_IMPORTED_MODULE_3__);





dayjs__WEBPACK_IMPORTED_MODULE_2___default().extend((dayjs_plugin_isBetween__WEBPACK_IMPORTED_MODULE_3___default()))

class Hotel {
  constructor(roomsData, bookingsData, customersData) {
    this.rooms = roomsData;
    this.bookings = bookingsData;
    this.customers = customersData;
  }

  getAllRooms() {
    this.rooms = this.rooms.map(room => new _Room__WEBPACK_IMPORTED_MODULE_0__.default(room));
  }

  getAllBookings() {
    this.bookings = this.bookings.map(booking => new _Booking__WEBPACK_IMPORTED_MODULE_1__.default(booking));
  }

  getAvailableRooms(checkIn, duration) {
    return this.rooms.filter(room => {
      const bookingWithThisRoom = this.bookings.find(booking => {
        const checkOut = dayjs__WEBPACK_IMPORTED_MODULE_2___default()(checkIn)
        .add(duration, 'day');

        return booking.roomNumber === room.number && dayjs__WEBPACK_IMPORTED_MODULE_2___default()(booking.checkInDate).isBetween(checkIn, checkOut, null, '[]')
      });

      return !bookingWithThisRoom;
    })
  }

  filterRoomsByType(rooms, type) {
    return rooms.filter(room => room.roomType === type);
  }

  addNewBookings(newBookings) {
    const bookings = newBookings.map(booking => new _Booking__WEBPACK_IMPORTED_MODULE_1__.default(booking));
    this.bookings = this.bookings.concat(bookings);
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Hotel);


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Room {
  constructor(room) {
    this.number = room.number;
    this.roomType = room.roomType;
    this.hasBidet = room.bidet;
    this.bedSize = room.bedSize;
    this.numBeds = room.numBeds;
    this.costPerNight = room.costPerNight;
    this.imageSrc = `./images/${this.bedSize}-bed.jpg`;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Room);


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Booking {
  constructor(booking, duration) {
    this.id = booking.id;
    this.userID = booking.userID;
    this.checkInDate = booking.date;
    this.duration = duration || 1;
    this.roomNumber = booking.roomNumber;
    this.roomServiceCharges = []
  }

  calculateCost(rooms) {
    const room = rooms.find(room =>  this.roomNumber === room.number);
      
    return room.costPerNight * this.duration;
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Booking);


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var MicroModal = function () {

  var FOCUSABLE_ELEMENTS = ['a[href]', 'area[href]', 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', 'select:not([disabled]):not([aria-hidden])', 'textarea:not([disabled]):not([aria-hidden])', 'button:not([disabled]):not([aria-hidden])', 'iframe', 'object', 'embed', '[contenteditable]', '[tabindex]:not([tabindex^="-"])'];

  var Modal = /*#__PURE__*/function () {
    function Modal(_ref) {
      var targetModal = _ref.targetModal,
          _ref$triggers = _ref.triggers,
          triggers = _ref$triggers === void 0 ? [] : _ref$triggers,
          _ref$onShow = _ref.onShow,
          onShow = _ref$onShow === void 0 ? function () {} : _ref$onShow,
          _ref$onClose = _ref.onClose,
          onClose = _ref$onClose === void 0 ? function () {} : _ref$onClose,
          _ref$openTrigger = _ref.openTrigger,
          openTrigger = _ref$openTrigger === void 0 ? 'data-micromodal-trigger' : _ref$openTrigger,
          _ref$closeTrigger = _ref.closeTrigger,
          closeTrigger = _ref$closeTrigger === void 0 ? 'data-micromodal-close' : _ref$closeTrigger,
          _ref$openClass = _ref.openClass,
          openClass = _ref$openClass === void 0 ? 'is-open' : _ref$openClass,
          _ref$disableScroll = _ref.disableScroll,
          disableScroll = _ref$disableScroll === void 0 ? false : _ref$disableScroll,
          _ref$disableFocus = _ref.disableFocus,
          disableFocus = _ref$disableFocus === void 0 ? false : _ref$disableFocus,
          _ref$awaitCloseAnimat = _ref.awaitCloseAnimation,
          awaitCloseAnimation = _ref$awaitCloseAnimat === void 0 ? false : _ref$awaitCloseAnimat,
          _ref$awaitOpenAnimati = _ref.awaitOpenAnimation,
          awaitOpenAnimation = _ref$awaitOpenAnimati === void 0 ? false : _ref$awaitOpenAnimati,
          _ref$debugMode = _ref.debugMode,
          debugMode = _ref$debugMode === void 0 ? false : _ref$debugMode;

      _classCallCheck(this, Modal);

      // Save a reference of the modal
      this.modal = document.getElementById(targetModal); // Save a reference to the passed config

      this.config = {
        debugMode: debugMode,
        disableScroll: disableScroll,
        openTrigger: openTrigger,
        closeTrigger: closeTrigger,
        openClass: openClass,
        onShow: onShow,
        onClose: onClose,
        awaitCloseAnimation: awaitCloseAnimation,
        awaitOpenAnimation: awaitOpenAnimation,
        disableFocus: disableFocus
      }; // Register click events only if pre binding eventListeners

      if (triggers.length > 0) this.registerTriggers.apply(this, _toConsumableArray(triggers)); // pre bind functions for event listeners

      this.onClick = this.onClick.bind(this);
      this.onKeydown = this.onKeydown.bind(this);
    }
    /**
     * Loops through all openTriggers and binds click event
     * @param  {array} triggers [Array of node elements]
     * @return {void}
     */


    _createClass(Modal, [{
      key: "registerTriggers",
      value: function registerTriggers() {
        var _this = this;

        for (var _len = arguments.length, triggers = new Array(_len), _key = 0; _key < _len; _key++) {
          triggers[_key] = arguments[_key];
        }

        triggers.filter(Boolean).forEach(function (trigger) {
          trigger.addEventListener('click', function (event) {
            return _this.showModal(event);
          });
        });
      }
    }, {
      key: "showModal",
      value: function showModal() {
        var _this2 = this;

        var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        this.activeElement = document.activeElement;
        this.modal.setAttribute('aria-hidden', 'false');
        this.modal.classList.add(this.config.openClass);
        this.scrollBehaviour('disable');
        this.addEventListeners();

        if (this.config.awaitOpenAnimation) {
          var handler = function handler() {
            _this2.modal.removeEventListener('animationend', handler, false);

            _this2.setFocusToFirstNode();
          };

          this.modal.addEventListener('animationend', handler, false);
        } else {
          this.setFocusToFirstNode();
        }

        this.config.onShow(this.modal, this.activeElement, event);
      }
    }, {
      key: "closeModal",
      value: function closeModal() {
        var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var modal = this.modal;
        this.modal.setAttribute('aria-hidden', 'true');
        this.removeEventListeners();
        this.scrollBehaviour('enable');

        if (this.activeElement && this.activeElement.focus) {
          this.activeElement.focus();
        }

        this.config.onClose(this.modal, this.activeElement, event);

        if (this.config.awaitCloseAnimation) {
          var openClass = this.config.openClass; // <- old school ftw

          this.modal.addEventListener('animationend', function handler() {
            modal.classList.remove(openClass);
            modal.removeEventListener('animationend', handler, false);
          }, false);
        } else {
          modal.classList.remove(this.config.openClass);
        }
      }
    }, {
      key: "closeModalById",
      value: function closeModalById(targetModal) {
        this.modal = document.getElementById(targetModal);
        if (this.modal) this.closeModal();
      }
    }, {
      key: "scrollBehaviour",
      value: function scrollBehaviour(toggle) {
        if (!this.config.disableScroll) return;
        var body = document.querySelector('body');

        switch (toggle) {
          case 'enable':
            Object.assign(body.style, {
              overflow: ''
            });
            break;

          case 'disable':
            Object.assign(body.style, {
              overflow: 'hidden'
            });
            break;
        }
      }
    }, {
      key: "addEventListeners",
      value: function addEventListeners() {
        this.modal.addEventListener('touchstart', this.onClick);
        this.modal.addEventListener('click', this.onClick);
        document.addEventListener('keydown', this.onKeydown);
      }
    }, {
      key: "removeEventListeners",
      value: function removeEventListeners() {
        this.modal.removeEventListener('touchstart', this.onClick);
        this.modal.removeEventListener('click', this.onClick);
        document.removeEventListener('keydown', this.onKeydown);
      }
    }, {
      key: "onClick",
      value: function onClick(event) {
        if (event.target.hasAttribute(this.config.closeTrigger)) {
          this.closeModal(event);
        }
      }
    }, {
      key: "onKeydown",
      value: function onKeydown(event) {
        if (event.keyCode === 27) this.closeModal(event); // esc

        if (event.keyCode === 9) this.retainFocus(event); // tab
      }
    }, {
      key: "getFocusableNodes",
      value: function getFocusableNodes() {
        var nodes = this.modal.querySelectorAll(FOCUSABLE_ELEMENTS);
        return Array.apply(void 0, _toConsumableArray(nodes));
      }
      /**
       * Tries to set focus on a node which is not a close trigger
       * if no other nodes exist then focuses on first close trigger
       */

    }, {
      key: "setFocusToFirstNode",
      value: function setFocusToFirstNode() {
        var _this3 = this;

        if (this.config.disableFocus) return;
        var focusableNodes = this.getFocusableNodes(); // no focusable nodes

        if (focusableNodes.length === 0) return; // remove nodes on whose click, the modal closes
        // could not think of a better name :(

        var nodesWhichAreNotCloseTargets = focusableNodes.filter(function (node) {
          return !node.hasAttribute(_this3.config.closeTrigger);
        });
        if (nodesWhichAreNotCloseTargets.length > 0) nodesWhichAreNotCloseTargets[0].focus();
        if (nodesWhichAreNotCloseTargets.length === 0) focusableNodes[0].focus();
      }
    }, {
      key: "retainFocus",
      value: function retainFocus(event) {
        var focusableNodes = this.getFocusableNodes(); // no focusable nodes

        if (focusableNodes.length === 0) return;
        /**
         * Filters nodes which are hidden to prevent
         * focus leak outside modal
         */

        focusableNodes = focusableNodes.filter(function (node) {
          return node.offsetParent !== null;
        }); // if disableFocus is true

        if (!this.modal.contains(document.activeElement)) {
          focusableNodes[0].focus();
        } else {
          var focusedItemIndex = focusableNodes.indexOf(document.activeElement);

          if (event.shiftKey && focusedItemIndex === 0) {
            focusableNodes[focusableNodes.length - 1].focus();
            event.preventDefault();
          }

          if (!event.shiftKey && focusableNodes.length > 0 && focusedItemIndex === focusableNodes.length - 1) {
            focusableNodes[0].focus();
            event.preventDefault();
          }
        }
      }
    }]);

    return Modal;
  }();
  /**
   * Modal prototype ends.
   * Here on code is responsible for detecting and
   * auto binding event handlers on modal triggers
   */
  // Keep a reference to the opened modal


  var activeModal = null;
  /**
   * Generates an associative array of modals and it's
   * respective triggers
   * @param  {array} triggers     An array of all triggers
   * @param  {string} triggerAttr The data-attribute which triggers the module
   * @return {array}
   */

  var generateTriggerMap = function generateTriggerMap(triggers, triggerAttr) {
    var triggerMap = [];
    triggers.forEach(function (trigger) {
      var targetModal = trigger.attributes[triggerAttr].value;
      if (triggerMap[targetModal] === undefined) triggerMap[targetModal] = [];
      triggerMap[targetModal].push(trigger);
    });
    return triggerMap;
  };
  /**
   * Validates whether a modal of the given id exists
   * in the DOM
   * @param  {number} id  The id of the modal
   * @return {boolean}
   */


  var validateModalPresence = function validateModalPresence(id) {
    if (!document.getElementById(id)) {
      console.warn("MicroModal: \u2757Seems like you have missed %c'".concat(id, "'"), 'background-color: #f8f9fa;color: #50596c;font-weight: bold;', 'ID somewhere in your code. Refer example below to resolve it.');
      console.warn("%cExample:", 'background-color: #f8f9fa;color: #50596c;font-weight: bold;', "<div class=\"modal\" id=\"".concat(id, "\"></div>"));
      return false;
    }
  };
  /**
   * Validates if there are modal triggers present
   * in the DOM
   * @param  {array} triggers An array of data-triggers
   * @return {boolean}
   */


  var validateTriggerPresence = function validateTriggerPresence(triggers) {
    if (triggers.length <= 0) {
      console.warn("MicroModal: \u2757Please specify at least one %c'micromodal-trigger'", 'background-color: #f8f9fa;color: #50596c;font-weight: bold;', 'data attribute.');
      console.warn("%cExample:", 'background-color: #f8f9fa;color: #50596c;font-weight: bold;', "<a href=\"#\" data-micromodal-trigger=\"my-modal\"></a>");
      return false;
    }
  };
  /**
   * Checks if triggers and their corresponding modals
   * are present in the DOM
   * @param  {array} triggers   Array of DOM nodes which have data-triggers
   * @param  {array} triggerMap Associative array of modals and their triggers
   * @return {boolean}
   */


  var validateArgs = function validateArgs(triggers, triggerMap) {
    validateTriggerPresence(triggers);
    if (!triggerMap) return true;

    for (var id in triggerMap) {
      validateModalPresence(id);
    }

    return true;
  };
  /**
   * Binds click handlers to all modal triggers
   * @param  {object} config [description]
   * @return void
   */


  var init = function init(config) {
    // Create an config object with default openTrigger
    var options = Object.assign({}, {
      openTrigger: 'data-micromodal-trigger'
    }, config); // Collects all the nodes with the trigger

    var triggers = _toConsumableArray(document.querySelectorAll("[".concat(options.openTrigger, "]"))); // Makes a mappings of modals with their trigger nodes


    var triggerMap = generateTriggerMap(triggers, options.openTrigger); // Checks if modals and triggers exist in dom

    if (options.debugMode === true && validateArgs(triggers, triggerMap) === false) return; // For every target modal creates a new instance

    for (var key in triggerMap) {
      var value = triggerMap[key];
      options.targetModal = key;
      options.triggers = _toConsumableArray(value);
      activeModal = new Modal(options); // eslint-disable-line no-new
    }
  };
  /**
   * Shows a particular modal
   * @param  {string} targetModal [The id of the modal to display]
   * @param  {object} config [The configuration object to pass]
   * @return {void}
   */


  var show = function show(targetModal, config) {
    var options = config || {};
    options.targetModal = targetModal; // Checks if modals and triggers exist in dom

    if (options.debugMode === true && validateModalPresence(targetModal) === false) return; // clear events in case previous modal wasn't close

    if (activeModal) activeModal.removeEventListeners(); // stores reference to active modal

    activeModal = new Modal(options); // eslint-disable-line no-new

    activeModal.showModal();
  };
  /**
   * Closes the active modal
   * @param  {string} targetModal [The id of the modal to close]
   * @return {void}
   */


  var close = function close(targetModal) {
    targetModal ? activeModal.closeModalById(targetModal) : activeModal.closeModal();
  };

  return {
    init: init,
    show: show,
    close: close
  };
}();
window.MicroModal = MicroModal;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MicroModal);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_base_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _images_twin_bed_jpg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var _images_full_bed_jpg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);
/* harmony import */ var _images_queen_bed_jpg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(10);
/* harmony import */ var _images_king_bed_jpg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(11);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(12);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _classes_Customer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(13);
/* harmony import */ var _classes_Hotel__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(15);
/* harmony import */ var _domUpdates__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(7);
/* harmony import */ var micromodal__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(18);












const {
  loginForm,
  loginErrorMessage,
  logoutButton,
  searchForm,
  searchResultsContainer,
  availableRoomsContainer,
  availableRoomsTitle,
  noRoomsMessage,
  bookingsContainer,
  totalSpent,
  confirmationMessage,
  confirmationButton,
  upcomingBookingsList,
  presentBookingsList,
  pastBookingsList,
  bookingsButton,
  hide,
  show,
  renderBookings,
  renderAvailableRooms,
  renderModalInformation,
  confirmBooking,
  displayAvailableRooms,
  displayBookings
} = _domUpdates__WEBPACK_IMPORTED_MODULE_9__.default;

let hotel;
let currentCustomer;

window.addEventListener('load', displayLogin);
loginForm.addEventListener('submit', validateLogin);
searchForm.addEventListener('submit', searchRooms);
availableRoomsContainer.addEventListener('click', bookRoom);
confirmationButton.addEventListener('click', requestBookings);
bookingsButton.addEventListener('click', displayBookingsInformation);
logoutButton.addEventListener('click', logOut);

function displayLogin() {
  micromodal__WEBPACK_IMPORTED_MODULE_10__.default.show('login-modal');
  loadData();
}

function validateLogin(event) {
  event.preventDefault();
  const username = loginForm[0].value;
  const password = loginForm[1].value;
  const id = parseInt(username.split('customer')[1]);

  if ((username.length === 9 || username.length === 10) &&
      (0 < id && id < 51) && password === 'overlook2021') {
    getCustomer(id);
  } else {
    show(loginErrorMessage);
  }
}

function logOut() {
  window.location.reload();
}

function loadData() {
  Promise.all([(0,_apiCalls__WEBPACK_IMPORTED_MODULE_1__.loadRooms)(), (0,_apiCalls__WEBPACK_IMPORTED_MODULE_1__.loadBookings)(), (0,_apiCalls__WEBPACK_IMPORTED_MODULE_1__.loadAllCustomers)()])
    .then(data => {
      hotel = new _classes_Hotel__WEBPACK_IMPORTED_MODULE_8__.default(data[0], data[1], data[2]);
      hotel.getAllRooms();
      hotel.getAllBookings();
      searchForm[0].min = dayjs__WEBPACK_IMPORTED_MODULE_6___default()().format('YYYY-MM-DD');
    })
}

function getCustomer(id) {
  (0,_apiCalls__WEBPACK_IMPORTED_MODULE_1__.loadSingleCustomer)(id)
    .then(customerData => {
      micromodal__WEBPACK_IMPORTED_MODULE_10__.default.close('login-modal');
      currentCustomer = new _classes_Customer__WEBPACK_IMPORTED_MODULE_7__.default(customerData);
      displayBookingsInformation();
    })
}

function displayBookingsInformation() {
  currentCustomer.getBookings(hotel.bookings);
  const bookings = {
    past: currentCustomer.getPastBookings(),
    present: currentCustomer.getPresentBookings(),
    upcoming: currentCustomer.getUpcomingBookings()
  };

  displayBookings(bookings);

  totalSpent.innerText =
  currentCustomer.calculateTotalSpent(hotel.rooms).toFixed(2);
}

function searchRooms(event) {
  event.preventDefault();

  let availableRooms =
  hotel.getAvailableRooms(searchForm[0].value, searchForm[1].value);

  if (searchForm[2].value !== 'all') {
    availableRooms =
    hotel.filterRoomsByType(availableRooms, searchForm[2].value);
  }

  displayAvailableRooms(availableRooms);
}

function bookRoom(event) {
  const target = event.target;
  const roomNumber = parseInt(target.parentNode.id);

  if (target.classList.contains('book-button')) {
    const room = hotel.rooms[roomNumber - 1];
    confirmationButton.value = roomNumber;

    renderModalInformation(room);
  }
}

function updateBookings(bookings) {
  return Promise.all(bookings.map(booking => {
    return (0,_apiCalls__WEBPACK_IMPORTED_MODULE_1__.addNewBookings)(booking.userID, booking.date, booking.roomNumber)
  }))
}

function requestBookings(event) {
  const roomNumber = parseInt(event.target.value);
  const bookingsRequest =
  currentCustomer.returnBookingsRequest(searchForm[0].value, searchForm[1].value, roomNumber);

  updateBookings(bookingsRequest)
    .then(response => {
      confirmBooking();
      hotel.addNewBookings(response);
      displayBookingsInformation();
    })
}

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map