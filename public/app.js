(self["webpackChunk"] = self["webpackChunk"] || []).push([["app"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/@core/components/feather-icon/FeatherIcon.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/@core/components/feather-icon/FeatherIcon.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vue_feather_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue-feather-icons */ "./node_modules/vue-feather-icons/dist/vue-feather-icons.es.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'FeatherIcon',
  functional: true,
  props: {
    icon: {
      required: false,
      type: [String, Object]
    },
    size: {
      type: String,
      "default": '14'
    },
    badge: {
      type: [String, Object, Number],
      "default": null
    },
    badgeClasses: {
      type: [String, Object, Array],
      "default": 'badge-primary'
    }
  },
  render: function render(h, _ref) {
    var props = _ref.props,
      data = _ref.data;
    // Create Feather Icon
    var svg = h(vue_feather_icons__WEBPACK_IMPORTED_MODULE_2__[props.icon], (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
      props: {
        size: props.size
      }
    }, data));

    // If no badge is provided => Render just SVG
    if (!props.badge) return svg;

    // Badge
    var badgeEl = h('span', {
      staticClass: 'badge badge-up badge-pill',
      "class": props.badgeClasses
    }, [props.badge]);

    // Return span with children
    return h('span', {
      staticClass: 'feather-icon position-relative'
    }, [svg, badgeEl]);
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/@core/components/scroll-to-top/ScrollToTop.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/@core/components/scroll-to-top/ScrollToTop.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _vueuse_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @vueuse/core */ "./node_modules/@vueuse/core/dist/index.esm.js");
/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bootstrap-vue */ "./node_modules/bootstrap-vue/esm/components/button/button.js");
/* harmony import */ var vue_ripple_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-ripple-directive */ "./node_modules/vue-ripple-directive/src/ripple.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  directives: {
    Ripple: vue_ripple_directive__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  components: {
    BButton: bootstrap_vue__WEBPACK_IMPORTED_MODULE_1__.BButton
  },
  setup: function setup() {
    var _useWindowScroll = (0,_vueuse_core__WEBPACK_IMPORTED_MODULE_2__.useWindowScroll)(),
      y = _useWindowScroll.y;
    var scrollToTop = function scrollToTop() {
      var rootEle = document.documentElement;
      rootEle.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };
    return {
      y: y,
      scrollToTop: scrollToTop
    };
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/@core/components/toastification/ToastificationContent.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/@core/components/toastification/ToastificationContent.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bootstrap-vue */ "./node_modules/bootstrap-vue/esm/components/avatar/avatar.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    BAvatar: bootstrap_vue__WEBPACK_IMPORTED_MODULE_0__.BAvatar
  },
  props: {
    variant: {
      type: String,
      "default": 'primary'
    },
    icon: {
      type: String,
      "default": null
    },
    title: {
      type: String,
      "default": null
    },
    text: {
      type: String,
      "default": null
    },
    hideClose: {
      type: Boolean,
      "default": false
    },
    avatar: {
      type: Boolean,
      "default": false
    },
    avatarSrc: {
      type: String,
      required: false
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/App.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/App.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.string.trim.js */ "./node_modules/core-js/modules/es.string.trim.js");
/* harmony import */ var core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.slice.js */ "./node_modules/core-js/modules/es.array.slice.js");
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.object.keys.js */ "./node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _core_components_scroll_to_top_ScrollToTop_vue__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @core/components/scroll-to-top/ScrollToTop.vue */ "./resources/js/src/@core/components/scroll-to-top/ScrollToTop.vue");
/* harmony import */ var _themeConfig__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @themeConfig */ "./resources/js/themeConfig.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var _core_app_config_useAppConfig__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @core/app-config/useAppConfig */ "./resources/js/src/@core/app-config/useAppConfig.js");
/* harmony import */ var _vueuse_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @vueuse/core */ "./node_modules/@vueuse/core/dist/index.esm.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/store */ "./resources/js/src/store/index.js");
/* harmony import */ var element_ui__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! element-ui */ "./node_modules/element-ui/lib/element-ui.common.js");
/* harmony import */ var element_ui__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(element_ui__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var vue2_helpers_vue_router__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! vue2-helpers/vue-router */ "./node_modules/vue2-helpers/vue-router.js");















/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    LayoutHorizontal: function LayoutHorizontal() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_src_layouts_horizontal_LayoutHorizontal_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! @/layouts/horizontal/LayoutHorizontal.vue */ "./resources/js/src/layouts/horizontal/LayoutHorizontal.vue"));
    },
    LayoutVertical: function LayoutVertical() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_src_layouts_vertical_LayoutVertical_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! @/layouts/vertical/LayoutVertical.vue */ "./resources/js/src/layouts/vertical/LayoutVertical.vue"));
    },
    LayoutFull: function LayoutFull() {
      return __webpack_require__.e(/*! import() */ "resources_js_src_layouts_full_LayoutFull_vue").then(__webpack_require__.bind(__webpack_require__, /*! @/layouts/full/LayoutFull.vue */ "./resources/js/src/layouts/full/LayoutFull.vue"));
    },
    LayoutTravel: function LayoutTravel() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_src_layouts_travel_LayoutTravel_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! @/layouts/travel/LayoutTravel.vue */ "./resources/js/src/layouts/travel/LayoutTravel.vue"));
    },
    LayoutNegocio: function LayoutNegocio() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_src_layouts_negocio_LayoutNegocio_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! @/layouts/negocio/LayoutNegocio.vue */ "./resources/js/src/layouts/negocio/LayoutNegocio.vue"));
    },
    ScrollToTop: _core_components_scroll_to_top_ScrollToTop_vue__WEBPACK_IMPORTED_MODULE_7__["default"]
  },
  beforeCreate: function beforeCreate() {
    // Set colors in theme
    var colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark'];

    // eslint-disable-next-line no-plusplus

    for (var i = 0, len = colors.length; i < len; i++) {
      _themeConfig__WEBPACK_IMPORTED_MODULE_8__.$themeColors[colors[i]] = (0,_vueuse_core__WEBPACK_IMPORTED_MODULE_13__.useCssVar)("--".concat(colors[i]), document.documentElement).value.trim();
    }

    // Set Theme Breakpoints
    var breakpoints = ['xs', 'sm', 'md', 'lg', 'xl'];

    // eslint-disable-next-line no-plusplus
    for (var _i2 = 0, _len2 = breakpoints.length; _i2 < _len2; _i2++) {
      _themeConfig__WEBPACK_IMPORTED_MODULE_8__.$themeBreakpoints[breakpoints[_i2]] = Number((0,_vueuse_core__WEBPACK_IMPORTED_MODULE_13__.useCssVar)("--breakpoint-".concat(breakpoints[_i2]), document.documentElement).value.slice(0, -2));
    }

    // Set RTL
    var isRTL = _themeConfig__WEBPACK_IMPORTED_MODULE_8__.$themeConfig.layout.isRTL;
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
  },
  setup: function setup(props) {
    var route = (0,vue2_helpers_vue_router__WEBPACK_IMPORTED_MODULE_12__.useRoute)();
    var contentLayoutType = (0,vue__WEBPACK_IMPORTED_MODULE_14__.computed)(function () {
      return _store__WEBPACK_IMPORTED_MODULE_10__["default"].state.appConfig.layout.type;
    });
    var usuario = (0,vue__WEBPACK_IMPORTED_MODULE_14__.computed)(function () {
      return _store__WEBPACK_IMPORTED_MODULE_10__["default"].state.usuario.usuario;
    });
    var layout = (0,vue__WEBPACK_IMPORTED_MODULE_14__.computed)(function () {
      if (route.meta.layout === 'full') return 'layout-full';
      if (route.meta.layout === 'travel') return 'layout-travel';
      if (route.meta.layout === 'negocio') return 'layout-negocio';
      return "layout-".concat(contentLayoutType.value);
    });
    var _useAppConfig = (0,_core_app_config_useAppConfig__WEBPACK_IMPORTED_MODULE_9__["default"])(),
      skin = _useAppConfig.skin,
      skinClasses = _useAppConfig.skinClasses;
    var enableScrollToTop = _themeConfig__WEBPACK_IMPORTED_MODULE_8__.$themeConfig.layout.enableScrollToTop;
    var _useNetwork = (0,_vueuse_core__WEBPACK_IMPORTED_MODULE_13__.useNetwork)(),
      isOnline = _useNetwork.isOnline;

    // If skin is dark when initialized => Add class to body
    if (skin.value === 'dark') document.body.classList.add('dark-layout');

    // Set Window Width in store
    _store__WEBPACK_IMPORTED_MODULE_10__["default"].commit('app/UPDATE_WINDOW_WIDTH', window.innerWidth);
    var _useWindowSize = (0,_vueuse_core__WEBPACK_IMPORTED_MODULE_13__.useWindowSize)(),
      windowWidth = _useWindowSize.width;
    (0,vue__WEBPACK_IMPORTED_MODULE_14__.watch)(windowWidth, function (val) {
      _store__WEBPACK_IMPORTED_MODULE_10__["default"].commit('app/UPDATE_WINDOW_WIDTH', val);
    });
    if (localStorage.getItem('token')) {
      if (localStorage.getItem('userData') != undefined) {
        _store__WEBPACK_IMPORTED_MODULE_10__["default"].commit('usuario/cargarUser', JSON.parse(localStorage.getItem('userData')));
      } else {
        if (!usuario.value.id) {
          _store__WEBPACK_IMPORTED_MODULE_10__["default"].dispatch('usuario/cargarUsuario');
        }
      }
    }

    // Cargar Sistema
    _store__WEBPACK_IMPORTED_MODULE_10__["default"].dispatch('sistema/fetch');
    (0,vue__WEBPACK_IMPORTED_MODULE_14__.watch)(isOnline, function (val) {
      if (!val) {
        element_ui__WEBPACK_IMPORTED_MODULE_11__.Notification.info({
          title: 'Sin Internet',
          message: "La conexíón ha caido, informalo a tú operadora",
          position: 'bottom-right'
        });
      }
    });
    return {
      skinClasses: skinClasses,
      enableScrollToTop: enableScrollToTop,
      layout: layout,
      contentLayoutType: contentLayoutType,
      route: route
    };
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/@core/components/scroll-to-top/ScrollToTop.vue?vue&type=template&id=480ba03e&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/@core/components/scroll-to-top/ScrollToTop.vue?vue&type=template&id=480ba03e&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "btn-scroll-to-top",
    "class": {
      show: _vm.y > 250
    }
  }, [_c("b-button", {
    directives: [{
      name: "ripple",
      rawName: "v-ripple.400",
      value: "rgba(255, 255, 255, 0.15)",
      expression: "'rgba(255, 255, 255, 0.15)'",
      modifiers: {
        400: true
      }
    }],
    staticClass: "btn-icon",
    attrs: {
      variant: "primary"
    },
    on: {
      click: _vm.scrollToTop
    }
  }, [_c("feather-icon", {
    attrs: {
      icon: "ArrowUpIcon",
      size: "16"
    }
  })], 1)], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/@core/components/toastification/ToastificationContent.vue?vue&type=template&id=7834b2fa&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/@core/components/toastification/ToastificationContent.vue?vue&type=template&id=7834b2fa&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "toastification"
  }, [_c("div", {
    staticClass: "d-flex align-items-start"
  }, [!_vm.avatar ? _c("b-avatar", {
    staticClass: "mr-75 flex-shrink-0",
    attrs: {
      variant: _vm.variant,
      size: "1.8rem"
    }
  }, [_c("feather-icon", {
    attrs: {
      icon: _vm.icon,
      size: "15"
    }
  })], 1) : _c("b-avatar", {
    staticClass: "mr-75 flex-shrink-0",
    attrs: {
      size: "lg",
      src: _vm.avatarSrc
    }
  }), _vm._v(" "), _c("div", {
    staticClass: "d-flex flex-grow-1"
  }, [_c("div", [_vm.title ? _c("h5", {
    staticClass: "mb-0 font-weight-bolder toastification-title",
    "class": "text-".concat(_vm.variant),
    domProps: {
      textContent: _vm._s(_vm.title)
    }
  }) : _vm._e(), _vm._v(" "), _vm.text ? _c("small", {
    staticClass: "d-inline-block text-body",
    domProps: {
      textContent: _vm._s(_vm.text)
    }
  }) : _vm._e()]), _vm._v(" "), _c("span", {
    staticClass: "cursor-pointer toastification-close-icon ml-auto",
    on: {
      click: function click($event) {
        return _vm.$emit("close-toast");
      }
    }
  }, [!_vm.hideClose ? _c("feather-icon", {
    staticClass: "text-body",
    attrs: {
      icon: "XIcon"
    }
  }) : _vm._e()], 1)])], 1)]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/App.vue?vue&type=template&id=7201f370&":
/*!**************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/App.vue?vue&type=template&id=7201f370& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
/* harmony import */ var _home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");

var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    "class": (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
      "h-100": _vm.route.meta.layout != "travel"
    }, _vm.skinClasses),
    staticStyle: {
      "min-height": "100%"
    },
    attrs: {
      id: "app"
    }
  }, [_c(_vm.layout, {
    tag: "component"
  }, [_c("router-view")], 1), _vm._v(" "), _vm.enableScrollToTop ? _c("scroll-to-top") : _vm._e()], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! ./src/main.js */ "./resources/js/src/main.js");

/***/ }),

/***/ "./resources/js/src/@core/app-config/useAppConfig.js":
/*!***********************************************************!*\
  !*** ./resources/js/src/@core/app-config/useAppConfig.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ usAppConfig)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/store */ "./resources/js/src/store/index.js");


function usAppConfig() {
  // ------------------------------------------------
  // isVerticalMenuCollapsed
  // ------------------------------------------------
  var isVerticalMenuCollapsed = (0,vue__WEBPACK_IMPORTED_MODULE_1__.computed)({
    get: function get() {
      return _store__WEBPACK_IMPORTED_MODULE_0__["default"].state.verticalMenu.isVerticalMenuCollapsed;
    },
    set: function set(val) {
      _store__WEBPACK_IMPORTED_MODULE_0__["default"].commit('verticalMenu/UPDATE_VERTICAL_MENU_COLLAPSED', val);
    }
  });

  // ------------------------------------------------
  // RTL
  // ------------------------------------------------
  var isRTL = (0,vue__WEBPACK_IMPORTED_MODULE_1__.computed)({
    get: function get() {
      return _store__WEBPACK_IMPORTED_MODULE_0__["default"].state.appConfig.layout.isRTL;
    },
    set: function set(val) {
      _store__WEBPACK_IMPORTED_MODULE_0__["default"].commit('appConfig/TOGGLE_RTL', val);
    }
  });

  // ------------------------------------------------
  // Skin
  // ------------------------------------------------
  var skin = (0,vue__WEBPACK_IMPORTED_MODULE_1__.computed)({
    get: function get() {
      return _store__WEBPACK_IMPORTED_MODULE_0__["default"].state.appConfig.layout.skin;
    },
    set: function set(val) {
      _store__WEBPACK_IMPORTED_MODULE_0__["default"].commit('appConfig/UPDATE_SKIN', val);
    }
  });
  var skinClasses = (0,vue__WEBPACK_IMPORTED_MODULE_1__.computed)(function () {
    if (skin.value === 'bordered') return 'bordered-layout';
    if (skin.value === 'semi-dark') return 'semi-dark-layout';

    // Do not return any class for dark layout because dark layout updates class in body
    // Do not return any class for light layout as that is default layout
    return null;
  });

  // ------------------------------------------------
  // routerTransition
  // ------------------------------------------------
  var routerTransition = (0,vue__WEBPACK_IMPORTED_MODULE_1__.computed)({
    get: function get() {
      return _store__WEBPACK_IMPORTED_MODULE_0__["default"].state.appConfig.layout.routerTransition;
    },
    set: function set(val) {
      _store__WEBPACK_IMPORTED_MODULE_0__["default"].commit('appConfig/UPDATE_ROUTER_TRANSITION', val);
    }
  });

  // *===============================================---*
  // *--------- LAYOUT ---------------------------------------*
  // *===============================================---*

  // ------------------------------------------------
  // layoutType
  // ------------------------------------------------

  var layoutType = (0,vue__WEBPACK_IMPORTED_MODULE_1__.computed)({
    get: function get() {
      return _store__WEBPACK_IMPORTED_MODULE_0__["default"].state.appConfig.layout.type;
    },
    set: function set(val) {
      _store__WEBPACK_IMPORTED_MODULE_0__["default"].commit('appConfig/UPDATE_LAYOUT_TYPE', val);
    }
  });

  // Reset skin if skin is semi-dark and move to horizontal layout
  (0,vue__WEBPACK_IMPORTED_MODULE_1__.watch)(layoutType, function (val) {
    if (val === 'horizontal' && skin.value === 'semi-dark') skin.value = 'light';
  });

  // ------------------------------------------------
  // Content Width (Full/Boxed)
  // ------------------------------------------------
  var contentWidth = (0,vue__WEBPACK_IMPORTED_MODULE_1__.computed)({
    get: function get() {
      return _store__WEBPACK_IMPORTED_MODULE_0__["default"].state.appConfig.layout.contentWidth;
    },
    set: function set(val) {
      _store__WEBPACK_IMPORTED_MODULE_0__["default"].commit('appConfig/UPDATE_CONTENT_WIDTH', val);
    }
  });

  // ------------------------------------------------
  // isNavMenuHidden
  // ------------------------------------------------
  var isNavMenuHidden = (0,vue__WEBPACK_IMPORTED_MODULE_1__.computed)({
    get: function get() {
      return _store__WEBPACK_IMPORTED_MODULE_0__["default"].state.appConfig.layout.menu.hidden;
    },
    set: function set(val) {
      _store__WEBPACK_IMPORTED_MODULE_0__["default"].commit('appConfig/UPDATE_NAV_MENU_HIDDEN', val);
    }
  });

  // *===============================================---*
  // *--------- NAVBAR ---------------------------------------*
  // *===============================================---*

  var navbarBackgroundColor = (0,vue__WEBPACK_IMPORTED_MODULE_1__.computed)({
    get: function get() {
      return _store__WEBPACK_IMPORTED_MODULE_0__["default"].state.appConfig.layout.navbar.backgroundColor;
    },
    set: function set(val) {
      _store__WEBPACK_IMPORTED_MODULE_0__["default"].commit('appConfig/UPDATE_NAVBAR_CONFIG', {
        backgroundColor: val
      });
    }
  });
  var navbarType = (0,vue__WEBPACK_IMPORTED_MODULE_1__.computed)({
    get: function get() {
      return _store__WEBPACK_IMPORTED_MODULE_0__["default"].state.appConfig.layout.navbar.type;
    },
    set: function set(val) {
      _store__WEBPACK_IMPORTED_MODULE_0__["default"].commit('appConfig/UPDATE_NAVBAR_CONFIG', {
        type: val
      });
    }
  });

  // *===============================================---*
  // *--------- FOOTER ---------------------------------------*
  // *===============================================---*

  var footerType = (0,vue__WEBPACK_IMPORTED_MODULE_1__.computed)({
    get: function get() {
      return _store__WEBPACK_IMPORTED_MODULE_0__["default"].state.appConfig.layout.footer.type;
    },
    set: function set(val) {
      _store__WEBPACK_IMPORTED_MODULE_0__["default"].commit('appConfig/UPDATE_FOOTER_CONFIG', {
        type: val
      });
    }
  });
  return {
    isVerticalMenuCollapsed: isVerticalMenuCollapsed,
    isRTL: isRTL,
    skin: skin,
    skinClasses: skinClasses,
    routerTransition: routerTransition,
    // Navbar
    navbarBackgroundColor: navbarBackgroundColor,
    navbarType: navbarType,
    // Footer
    footerType: footerType,
    // Layout
    layoutType: layoutType,
    contentWidth: contentWidth,
    isNavMenuHidden: isNavMenuHidden
  };
}

/***/ }),

/***/ "./resources/js/src/@core/utils/useAuth.js":
/*!*************************************************!*\
  !*** ./resources/js/src/@core/utils/useAuth.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useAuth)
/* harmony export */ });
/* harmony import */ var _home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var _home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_json_stringify_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.json.stringify.js */ "./node_modules/core-js/modules/es.json.stringify.js");
/* harmony import */ var core_js_modules_es_json_stringify_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_json_stringify_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.object.keys.js */ "./node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.error.cause.js */ "./node_modules/core-js/modules/es.error.cause.js");
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.error.to-string.js */ "./node_modules/core-js/modules/es.error.to-string.js");
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_web_timers_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/web.timers.js */ "./node_modules/core-js/modules/web.timers.js");
/* harmony import */ var core_js_modules_web_timers_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_timers_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.array.includes.js */ "./node_modules/core-js/modules/es.array.includes.js");
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/store */ "./resources/js/src/store/index.js");
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @/router */ "./resources/js/src/router/index.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var _libs_acl_config__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @/libs/acl/config */ "./resources/js/src/libs/acl/config.js");
/* harmony import */ var _libs_acl_ability__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @/libs/acl/ability */ "./resources/js/src/libs/acl/ability.js");
/* harmony import */ var _core_components_toastification_ToastificationContent__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @core/components/toastification/ToastificationContent */ "./resources/js/src/@core/components/toastification/ToastificationContent.vue");


var _excluded = ["client_id", "auto_select", "cancel_on_tap_outside", "context"];














function useAuth() {
  var usuario = (0,vue__WEBPACK_IMPORTED_MODULE_15__.computed)(function () {
    return _store__WEBPACK_IMPORTED_MODULE_10__["default"].state.usuario.usuario;
  });
  var optionsAuth = (0,vue__WEBPACK_IMPORTED_MODULE_15__.ref)({
    client_id: '860503848534-po9nnigudd7v9upbsip07iu4b93nvnf5.apps.googleusercontent.com',
    // required
    auto_select: false,
    // optional
    cancel_on_tap_outside: false,
    // optional
    context: 'signin',
    // optional
    itp_support: true,
    state_cookie_domain: window.location.origin
  });
  var formValidate = (0,vue__WEBPACK_IMPORTED_MODULE_15__.ref)(null);
  var formulario = (0,vue__WEBPACK_IMPORTED_MODULE_15__.ref)({
    email: '',
    password: '',
    remember: false
  });
  var logout = function logout() {
    _store__WEBPACK_IMPORTED_MODULE_10__["default"].dispatch('cerrarSesion').then(function (_ref) {
      var data = _ref.data;
      localStorage.removeItem('token');
      localStorage.removeItem('habilidades');
      localStorage.removeItem('userData');
      localStorage.removeItem('usuarioId');
      _store__WEBPACK_IMPORTED_MODULE_10__["default"].commit('usuario/limpiarUsuario');
      _libs_acl_ability__WEBPACK_IMPORTED_MODULE_13__["default"].update(_libs_acl_config__WEBPACK_IMPORTED_MODULE_12__.initialAbility);
      _router__WEBPACK_IMPORTED_MODULE_11__["default"].push({
        name: 'login'
      });
    })["catch"](function (e) {
      if (e.response.status === 419) {
        _router__WEBPACK_IMPORTED_MODULE_11__["default"].push({
          name: 'login'
        });
      }
    });
  };
  var login = function login() {
    return new Promise(function (resolv, reject) {
      axios.get('/sanctum/csrf-cookie').then(function (res) {
        axios.post('/api/auth/login', formulario.value).then(function (_ref2) {
          var data = _ref2.data;
          axios.defaults.headers.common = {
            'Authorization': "bearer ".concat(data.accessToken)
          };
          _store__WEBPACK_IMPORTED_MODULE_10__["default"].commit('setAuthMessage', null);
          _store__WEBPACK_IMPORTED_MODULE_10__["default"].commit('usuario/cargarUser', data.usuario);
          _store__WEBPACK_IMPORTED_MODULE_10__["default"].commit('setToken', data.accessToken);
          localStorage.setItem('token', data.accessToken);
          localStorage.setItem('habilidades', JSON.stringify(data.usuario.habilidades));
          localStorage.setItem('userData', JSON.stringify(data.usuario));
          // localStorage.setItem('usuarioId',data.usuario.id)

          _libs_acl_ability__WEBPACK_IMPORTED_MODULE_13__["default"].update(JSON.parse(localStorage.getItem('habilidades')));
          resolv(data.result);
        })["catch"](function (error) {
          console.log(error);
          if (error.response && error.response.status === 422) {
            formValidate.value.setErrors(error.response.data.errors);
          }
          reject(error);
        });
      })["catch"](function (e) {
        reject(e);
      });
    });
  };
  var authenticarGoogle = function authenticarGoogle(_ref3) {
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : sendResponseAuthGoogle;
    var client_id = _ref3.client_id,
      _ref3$auto_select = _ref3.auto_select,
      auto_select = _ref3$auto_select === void 0 ? false : _ref3$auto_select,
      _ref3$cancel_on_tap_o = _ref3.cancel_on_tap_outside,
      cancel_on_tap_outside = _ref3$cancel_on_tap_o === void 0 ? false : _ref3$cancel_on_tap_o,
      _ref3$context = _ref3.context,
      context = _ref3$context === void 0 ? "signin" : _ref3$context,
      otherOptions = (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref3, _excluded);
    try {
      if (window.cookieStore.get('g_state')) {
        window.cookieStore["delete"]('g_state');
      }
    } catch (error) {
      console.log(error);
    }
    if (!client_id) {
      throw new Error("client_id is required");
    }
    if (typeof window !== "undefined" && window.document) {
      setTimeout(function () {
        var contextValue = ["signin", "signup", "use"].includes(context) ? context : "signin";
        // const googleScript = document.createElement("script");

        // googleScript.src = "https://accounts.google.com/gsi/client";
        // googleScript.async = true;
        // googleScript.defer = true;
        // document.head.appendChild(googleScript);

        window.google.accounts.id.initialize((0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
          client_id: client_id,
          callback: callback,
          auto_select: auto_select,
          cancel_on_tap_outside: cancel_on_tap_outside,
          context: contextValue
        }, otherOptions));
        window.google.accounts.id.prompt();
      }, 2000);
    }
  };
  var authGoogle = function authGoogle() {
    var isLoggedIn = localStorage.getItem('token') ? true : false;
    if (!isLoggedIn) {
      authenticarGoogle(optionsAuth.value);
      // googleOneTap(optionsAuth.value, sendResponseAuthGoogle);
    }
  };

  // onMounted(() => {
  //    authGoogle();

  // })

  var sendResponseAuthGoogle = function sendResponseAuthGoogle(response) {
    // Send response to server
    // console.log(response);

    axios.post('/api/auth/google', response).then(function (_ref4) {
      var data = _ref4.data;
      _store__WEBPACK_IMPORTED_MODULE_10__["default"].commit('setAuthMessage', null);
      _store__WEBPACK_IMPORTED_MODULE_10__["default"].commit('usuario/cargarUser', data.usuario);
      _store__WEBPACK_IMPORTED_MODULE_10__["default"].commit('setToken', data.accessToken);
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('habilidades', JSON.stringify(data.usuario.habilidades));
      localStorage.setItem('usuarioId', data.usuario.id);
      localStorage.setItem('userData', JSON.stringify(data.usuario));
      _libs_acl_ability__WEBPACK_IMPORTED_MODULE_13__["default"].update(JSON.parse(localStorage.getItem('habilidades')));
      if (localStorage.getItem('token')) {
        _store__WEBPACK_IMPORTED_MODULE_10__["default"].commit('usuario/cargarUser', localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : data.usuario);
        // store.commit('usuario/cargarUser',data.usuario)
      }

      toast({
        component: _core_components_toastification_ToastificationContent__WEBPACK_IMPORTED_MODULE_14__["default"],
        props: {
          title: "Bienvenido ".concat(usuario.value.nombre || usuario.value.username),
          icon: 'CoffeeIcon',
          variant: 'success',
          text: "Ha iniciado sesi\xF3n correctamente como ".concat(usuario.value.rol.nombre, ". \xA1Ahora puedes empezar a explorar!")
        }
      }, {
        position: 'bottom-right',
        timeout: 4000
      });
      if (['/login', '/register'].includes(window.location.pathname)) {
        _router__WEBPACK_IMPORTED_MODULE_11__["default"].push({
          name: 'inicio'
        });
      }
    })["catch"](function (e) {
      return console.log(e);
    });
  };
  var isNegocios = (0,vue__WEBPACK_IMPORTED_MODULE_15__.computed)(function () {
    if (usuario.value.negocios) {
      return usuario.value.negocios.length > 0 ? true : false;
    }
    return false;
  });
  return {
    logout: logout,
    login: login,
    formValidate: formValidate,
    formulario: formulario,
    authGoogle: authGoogle,
    is_loggin: (0,vue__WEBPACK_IMPORTED_MODULE_15__.computed)(function () {
      return usuario.value.id ? true : false;
    }),
    authenticarGoogle: authenticarGoogle,
    optionsAuth: optionsAuth,
    isNegocios: isNegocios
  };
}

/***/ }),

/***/ "./resources/js/src/global-components.js":
/*!***********************************************!*\
  !*** ./resources/js/src/global-components.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var _core_components_feather_icon_FeatherIcon_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @core/components/feather-icon/FeatherIcon.vue */ "./resources/js/src/@core/components/feather-icon/FeatherIcon.vue");



vue__WEBPACK_IMPORTED_MODULE_2__["default"].component(_core_components_feather_icon_FeatherIcon_vue__WEBPACK_IMPORTED_MODULE_1__["default"].name, _core_components_feather_icon_FeatherIcon_vue__WEBPACK_IMPORTED_MODULE_1__["default"]);

/***/ }),

/***/ "./resources/js/src/libs/acl/ability.js":
/*!**********************************************!*\
  !*** ./resources/js/src/libs/acl/ability.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.keys.js */ "./node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _casl_ability__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @casl/ability */ "./node_modules/@casl/ability/dist/es6m/index.mjs");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./config */ "./resources/js/src/libs/acl/config.js");






//  Capacidad de lectura de localStorage
// * Maneja la recuperación automática de habilidades anteriores si ya ha iniciado sesión como usuario
// ? Puede actualizar esto si almacena las habilidades del usuario en un lugar más seguro
// ! Cualquiera puede actualizar localStorage, así que tenga cuidado y actualice esto
// const userData = JSON.parse(localStorage.getItem('userData'))

var habilidades = localStorage.getItem('habilidades') ? JSON.parse(localStorage.getItem('habilidades')) : null;
// console.log(habilidades);
var existingAbility = habilidades ? habilidades : null;
if (existingAbility) {
  existingAbility = [].concat((0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(existingAbility), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_config__WEBPACK_IMPORTED_MODULE_3__.initialAbility));
}
var ability = new _casl_ability__WEBPACK_IMPORTED_MODULE_4__.Ability(existingAbility || _config__WEBPACK_IMPORTED_MODULE_3__.initialAbility);
// console.log(ability);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ability);

/***/ }),

/***/ "./resources/js/src/libs/acl/config.js":
/*!*********************************************!*\
  !*** ./resources/js/src/libs/acl/config.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _: () => (/* binding */ _),
/* harmony export */   initialAbility: () => (/* binding */ initialAbility)
/* harmony export */ });
var initialAbility = [{
  action: 'read',
  subject: 'Auth'
}];
var _ = undefined;

/***/ }),

/***/ "./resources/js/src/libs/acl/index.js":
/*!********************************************!*\
  !*** ./resources/js/src/libs/acl/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var _casl_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @casl/vue */ "./node_modules/@casl/vue/dist/es6m/index.mjs");
/* harmony import */ var _ability__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ability */ "./resources/js/src/libs/acl/ability.js");



vue__WEBPACK_IMPORTED_MODULE_2__["default"].use(_casl_vue__WEBPACK_IMPORTED_MODULE_0__.abilitiesPlugin, _ability__WEBPACK_IMPORTED_MODULE_1__["default"]);

/***/ }),

/***/ "./resources/js/src/libs/acl/routeProtection.js":
/*!******************************************************!*\
  !*** ./resources/js/src/libs/acl/routeProtection.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _: () => (/* binding */ _),
/* harmony export */   canNavigate: () => (/* binding */ canNavigate)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_some_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.some.js */ "./node_modules/core-js/modules/es.array.some.js");
/* harmony import */ var core_js_modules_es_array_some_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_some_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ability__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ability */ "./resources/js/src/libs/acl/ability.js");



var canNavigate = function canNavigate(to) {
  return to.matched.some(function (route) {
    var action = route.meta.action || 'read';
    var resource = route.meta.resource || 'Auth';
    return _ability__WEBPACK_IMPORTED_MODULE_2__["default"].can(action, resource);
  });
};
var _ = undefined;

/***/ }),

/***/ "./resources/js/src/libs/axios.js":
/*!****************************************!*\
  !*** ./resources/js/src/libs/axios.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var _core_utils_useAuth_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @core/utils/useAuth.js */ "./resources/js/src/@core/utils/useAuth.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/store */ "./resources/js/src/store/index.js");
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/router */ "./resources/js/src/router/index.js");





var axiosIns = axios__WEBPACK_IMPORTED_MODULE_3__["default"].create({
  baseURL: window.location.origin,
  withCredentials: true,
  timeout: 0,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    Accept: "application/json, text/plain, */*, text/html"
  }
});
if (localStorage.getItem('token')) {
  var token = localStorage.getItem('token');
  axiosIns.defaults.headers.common = {
    'Authorization': "bearer ".concat(token)
  };
}



// Intercetamos las peticiones para cambiar el estado de carga (Loading ) de la app enn true
axiosIns.interceptors.request.use(function (config) {
  _store__WEBPACK_IMPORTED_MODULE_4__["default"].commit('toggleLoading');
  return config;
}, function (error) {
  _store__WEBPACK_IMPORTED_MODULE_4__["default"].commit('toggleLoading');
  return Promise.reject(error);
});

// Intercetamos las respuesta para cambiar el estado de carga (Loading ) de la app en false

axiosIns.interceptors.response.use(function (response) {
  _store__WEBPACK_IMPORTED_MODULE_4__["default"].commit('toggleLoading');
  return Promise.resolve(response);
}, function (error) {
  var response = error.response;
  _store__WEBPACK_IMPORTED_MODULE_4__["default"].commit('toggleLoading');
  if (response && response.status === 401) {
    if (response.data.message == "Unauthenticated.") {
      localStorage.removeItem('token');
      // localStorage.removeItem('userData');
      localStorage.removeItem('usuarioId');
      localStorage.removeItem('habilidades');
      if (window.location.pathname != '/login') {
        _router__WEBPACK_IMPORTED_MODULE_5__["default"].push({
          name: 'login'
        });
        if ((0,_core_utils_useAuth_js__WEBPACK_IMPORTED_MODULE_2__["default"])().is_loggin) {
          (0,_core_utils_useAuth_js__WEBPACK_IMPORTED_MODULE_2__["default"])().logout();
        }
      }
    } else if (response.data.message == 'Unauthorized.') {
      localStorage.removeItem('token');
      // localStorage.removeItem('userData');
      localStorage.removeItem('usuarioId');
      localStorage.removeItem('habilidades');

      // console.log('Cerrando')
      if (window.location.pathname != '/login') {
        _router__WEBPACK_IMPORTED_MODULE_5__["default"].push({
          name: 'login'
        });
        (0,_core_utils_useAuth_js__WEBPACK_IMPORTED_MODULE_2__["default"])().logout();
      }
    }
    if (response.data.message) {

      // toast({
      //   component: ToastificationContent,
      //   props: {
      //     title: response.data.message,
      //     icon: 'AlertCircleIcon'
      //   }
      // }, {
      //   position: 'bottom-left'
      // })
    }

    // store.commit('toggleLoading',false)
  }

  if (response.status === 404) {
    // location.reload()
    _router__WEBPACK_IMPORTED_MODULE_5__["default"].push({
      name: 'error-404'
    });
  }
  if (response.status === 419) {
    (0,_core_utils_useAuth_js__WEBPACK_IMPORTED_MODULE_2__["default"])().logout();
    // router.push({name:'login'})
    // location.reload()
  }

  if (response.status === 503) {
    _router__WEBPACK_IMPORTED_MODULE_5__["default"].push({
      name: 'show.mantenimiento'
    });
  }
  return Promise.reject(error);
});
axiosIns.interceptors.response.use(undefined, function (error) {
  var response = error.response;
  return Promise.reject(error);
});
vue__WEBPACK_IMPORTED_MODULE_6__["default"].prototype.$http = axiosIns;
window.axios = axiosIns;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (axiosIns);

/***/ }),

/***/ "./resources/js/src/libs/clipboard.js":
/*!********************************************!*\
  !*** ./resources/js/src/libs/clipboard.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var vue_clipboard2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-clipboard2 */ "./node_modules/vue-clipboard2/vue-clipboard.js");
/* harmony import */ var vue_clipboard2__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_clipboard2__WEBPACK_IMPORTED_MODULE_0__);



// clipboard
vue__WEBPACK_IMPORTED_MODULE_1__["default"].use((vue_clipboard2__WEBPACK_IMPORTED_MODULE_0___default()));

/***/ }),

/***/ "./resources/js/src/libs/i18n/index.js":
/*!*********************************************!*\
  !*** ./resources/js/src/libs/i18n/index.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.for-each.js */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_string_match_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.string.match.js */ "./node_modules/core-js/modules/es.string.match.js");
/* harmony import */ var core_js_modules_es_string_match_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_match_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var vue_i18n__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vue-i18n */ "./node_modules/vue-i18n/dist/vue-i18n.esm.js");








vue__WEBPACK_IMPORTED_MODULE_6__["default"].use(vue_i18n__WEBPACK_IMPORTED_MODULE_7__["default"]);
function loadLocaleMessages() {
  var locales = __webpack_require__("./resources/js/src/libs/i18n/locales sync recursive [A-Za-z0-9-_,\\s]+\\.json$/");
  var messages = {};
  // console.log(locales.keys());
  locales.keys().forEach(function (key) {
    var matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      var locale = matched[1];
      messages[locale] = locales(key);
    }
  });
  return messages;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new vue_i18n__WEBPACK_IMPORTED_MODULE_7__["default"]({
  locale: 'es',
  fallbackLocale: 'es',
  messages: loadLocaleMessages()
}));

/***/ }),

/***/ "./resources/js/src/libs/portal-vue.js":
/*!*********************************************!*\
  !*** ./resources/js/src/libs/portal-vue.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var portal_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! portal-vue */ "./node_modules/portal-vue/dist/portal-vue.common.js");


vue__WEBPACK_IMPORTED_MODULE_1__["default"].use(portal_vue__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./resources/js/src/libs/sweet-alerts.js":
/*!***********************************************!*\
  !*** ./resources/js/src/libs/sweet-alerts.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var vue_sweetalert2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-sweetalert2 */ "./node_modules/vue-sweetalert2/dist/vue-sweetalert.umd.js");
/* harmony import */ var vue_sweetalert2__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_sweetalert2__WEBPACK_IMPORTED_MODULE_0__);


// Si no necesita los estilos, no conecte 
//import  'sweetalert2/dist/sweetalert2.min.css' ;

vue__WEBPACK_IMPORTED_MODULE_1__["default"].use((vue_sweetalert2__WEBPACK_IMPORTED_MODULE_0___default()));

/***/ }),

/***/ "./resources/js/src/libs/toastification.js":
/*!*************************************************!*\
  !*** ./resources/js/src/libs/toastification.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var vue_toastification__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-toastification */ "./node_modules/vue-toastification/dist/esm/index.js");
/* harmony import */ var _core_scss_vue_libs_toastification_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @core/scss/vue/libs/toastification.scss */ "./resources/js/src/@core/scss/vue/libs/toastification.scss");




var pluginsOptions = {
  hideProgressBar: false,
  closeOnClick: false,
  closeButton: false,
  icon: false,
  timeout: 3000,
  transition: 'Vue-Toastification__fade',
  position: 'bottom-right'
};
var toast = (0,vue_toastification__WEBPACK_IMPORTED_MODULE_0__.createToastInterface)(pluginsOptions);
window.toast = toast;
vue__WEBPACK_IMPORTED_MODULE_2__["default"].use(vue_toastification__WEBPACK_IMPORTED_MODULE_0__["default"], {
  hideProgressBar: false,
  closeOnClick: false,
  closeButton: false,
  icon: false,
  timeout: 3000,
  transition: 'Vue-Toastification__fade',
  position: 'bottom-right'
});

/***/ }),

/***/ "./resources/js/src/libs/vue-select.js":
/*!*********************************************!*\
  !*** ./resources/js/src/libs/vue-select.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-select */ "./node_modules/vue-select/dist/vue-select.js");
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_select__WEBPACK_IMPORTED_MODULE_0__);



// Set the components prop default to return our fresh components
(vue_select__WEBPACK_IMPORTED_MODULE_0___default().props).components["default"] = function () {
  return {
    Deselect: {
      render: function render(h) {
        return h('feather-icon', {
          props: {
            size: '14',
            icon: 'XIcon'
          }
        });
      }
    },
    OpenIndicator: {
      render: function render(h) {
        return h('feather-icon', {
          props: {
            size: '15',
            icon: 'ChevronDownIcon'
          },
          "class": 'open-indicator'
        });
      }
    }
  };
};
vue__WEBPACK_IMPORTED_MODULE_1__["default"].component((vue_select__WEBPACK_IMPORTED_MODULE_0___default()));

/***/ }),

/***/ "./resources/js/src/main.js":
/*!**********************************!*\
  !*** ./resources/js/src/main.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.filter.js */ "./node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_date_to_string_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.date.to-string.js */ "./node_modules/core-js/modules/es.date.to-string.js");
/* harmony import */ var core_js_modules_es_date_to_string_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_string_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.object.keys.js */ "./node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_json_stringify_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.json.stringify.js */ "./node_modules/core-js/modules/es.json.stringify.js");
/* harmony import */ var core_js_modules_es_json_stringify_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_json_stringify_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.error.to-string.js */ "./node_modules/core-js/modules/es.error.to-string.js");
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.regexp.to-string.js */ "./node_modules/core-js/modules/es.regexp.to-string.js");
/* harmony import */ var core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.string.replace.js */ "./node_modules/core-js/modules/es.string.replace.js");
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.array.slice.js */ "./node_modules/core-js/modules/es.array.slice.js");
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! bootstrap-vue */ "./node_modules/bootstrap-vue/esm/components/toast/index.js");
/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! bootstrap-vue */ "./node_modules/bootstrap-vue/esm/components/modal/index.js");
/* harmony import */ var element_ui__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! element-ui */ "./node_modules/element-ui/lib/element-ui.common.js");
/* harmony import */ var element_ui__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(element_ui__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var element_ui_lib_theme_chalk_index_css__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! element-ui/lib/theme-chalk/index.css */ "./node_modules/element-ui/lib/theme-chalk/index.css");
/* harmony import */ var element_ui_lib_locale_lang_es__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! element-ui/lib/locale/lang/es */ "./node_modules/element-ui/lib/locale/lang/es.js");
/* harmony import */ var element_ui_lib_locale__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! element-ui/lib/locale */ "./node_modules/element-ui/lib/locale/index.js");
/* harmony import */ var vue_the_mask__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! vue-the-mask */ "./node_modules/vue-the-mask/dist/vue-the-mask.js");
/* harmony import */ var vue_the_mask__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(vue_the_mask__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var vue2_google_maps__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! vue2-google-maps */ "./node_modules/vue2-google-maps/dist/main.js");
/* harmony import */ var _libs_i18n__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @/libs/i18n */ "./resources/js/src/libs/i18n/index.js");
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./router */ "./resources/js/src/router/index.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./store */ "./resources/js/src/store/index.js");
/* harmony import */ var _App_vue__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./App.vue */ "./resources/js/src/App.vue");
/* harmony import */ var _global_components__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./global-components */ "./resources/js/src/global-components.js");
/* harmony import */ var _axios__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @axios */ "./resources/js/src/libs/axios.js");
/* harmony import */ var _libs_acl__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @/libs/acl */ "./resources/js/src/libs/acl/index.js");
/* harmony import */ var _libs_portal_vue__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @/libs/portal-vue */ "./resources/js/src/libs/portal-vue.js");
/* harmony import */ var _libs_clipboard__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @/libs/clipboard */ "./resources/js/src/libs/clipboard.js");
/* harmony import */ var _libs_toastification__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @/libs/toastification */ "./resources/js/src/libs/toastification.js");
/* harmony import */ var _libs_sweet_alerts__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @/libs/sweet-alerts */ "./resources/js/src/libs/sweet-alerts.js");
/* harmony import */ var _libs_vue_select__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @/libs/vue-select */ "./resources/js/src/libs/vue-select.js");
/* harmony import */ var vue_currency_filter__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! vue-currency-filter */ "./node_modules/vue-currency-filter/dist/vue-currency-filter.module.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_30___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_30__);
/* harmony import */ var swiper_element_bundle__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! swiper/element/bundle */ "./node_modules/swiper/element/swiper-element-bundle.js");
/* harmony import */ var v_mask__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! v-mask */ "./node_modules/v-mask/dist/v-mask.esm.js");
/* harmony import */ var highcharts_vue__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! highcharts-vue */ "./node_modules/highcharts-vue/dist/highcharts-vue.min.js");
/* harmony import */ var highcharts_vue__WEBPACK_IMPORTED_MODULE_35___default = /*#__PURE__*/__webpack_require__.n(highcharts_vue__WEBPACK_IMPORTED_MODULE_35__);
/* harmony import */ var highcharts__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! highcharts */ "./node_modules/highcharts/highcharts.js");
/* harmony import */ var highcharts__WEBPACK_IMPORTED_MODULE_36___default = /*#__PURE__*/__webpack_require__.n(highcharts__WEBPACK_IMPORTED_MODULE_36__);
/* harmony import */ var highcharts_modules_map__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! highcharts/modules/map */ "./node_modules/highcharts/modules/map.js");
/* harmony import */ var highcharts_modules_map__WEBPACK_IMPORTED_MODULE_37___default = /*#__PURE__*/__webpack_require__.n(highcharts_modules_map__WEBPACK_IMPORTED_MODULE_37__);
/* harmony import */ var highcharts_modules_exporting__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! highcharts/modules/exporting */ "./node_modules/highcharts/modules/exporting.js");
/* harmony import */ var highcharts_modules_exporting__WEBPACK_IMPORTED_MODULE_38___default = /*#__PURE__*/__webpack_require__.n(highcharts_modules_exporting__WEBPACK_IMPORTED_MODULE_38__);
/* harmony import */ var highcharts_modules_accessibility__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! highcharts/modules/accessibility */ "./node_modules/highcharts/modules/accessibility.js");
/* harmony import */ var highcharts_modules_accessibility__WEBPACK_IMPORTED_MODULE_39___default = /*#__PURE__*/__webpack_require__.n(highcharts_modules_accessibility__WEBPACK_IMPORTED_MODULE_39__);
/* harmony import */ var _fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! @fortawesome/fontawesome-svg-core */ "./node_modules/@fortawesome/fontawesome-svg-core/index.mjs");
/* harmony import */ var _fortawesome_vue_fontawesome__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! @fortawesome/vue-fontawesome */ "./node_modules/@fortawesome/vue-fontawesome/index.es.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.mjs");
/* harmony import */ var _fortawesome_free_brands_svg_icons__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! @fortawesome/free-brands-svg-icons */ "./node_modules/@fortawesome/free-brands-svg-icons/index.mjs");
/* harmony import */ var _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! @fortawesome/free-regular-svg-icons */ "./node_modules/@fortawesome/free-regular-svg-icons/index.mjs");
















vue__WEBPACK_IMPORTED_MODULE_14__["default"].prototype.$eventHub = new vue__WEBPACK_IMPORTED_MODULE_14__["default"]();
element_ui_lib_locale__WEBPACK_IMPORTED_MODULE_13__["default"].use(element_ui_lib_locale_lang_es__WEBPACK_IMPORTED_MODULE_12__["default"]);

vue__WEBPACK_IMPORTED_MODULE_14__["default"].use((vue_the_mask__WEBPACK_IMPORTED_MODULE_15___default()));

// import VueGoogleAutocomlete from 'vue-google-autocomplete';

vue__WEBPACK_IMPORTED_MODULE_14__["default"].use(vue2_google_maps__WEBPACK_IMPORTED_MODULE_16__, {
  load: {
    key: 'AIzaSyCnsLa_yFH7kb5s5GdIaE_P9aGKLkeVIUQ',
    //'AIzaSyCNWsVH2kmknm6knGSRKDuzGeMWM1PT6gA',
    libraries: 'places'
  },
  installComponents: true
});





// Global Components


// 3rd party plugins







// import '@/libs/tour'
// import '@/libs/markdown-editor'



window.moment = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
moment__WEBPACK_IMPORTED_MODULE_30___default().locale('es');

// Swiper

(0,swiper_element_bundle__WEBPACK_IMPORTED_MODULE_31__.register)();
vue__WEBPACK_IMPORTED_MODULE_14__["default"].filter('fecha', function (val) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'LL';
  var time = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  if (val && !time) {
    return moment__WEBPACK_IMPORTED_MODULE_30___default()(new Date(val)).format(format);
  } else if (val && time) {
    return moment__WEBPACK_IMPORTED_MODULE_30___default()("2020-01-01 ".concat(val)).format(format);
  }
  return 'error en la fecha';
});
vue__WEBPACK_IMPORTED_MODULE_14__["default"].filter('dia', function (val) {
  var dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
  return dias[val - 1];
});
vue__WEBPACK_IMPORTED_MODULE_14__["default"].use(vue_currency_filter__WEBPACK_IMPORTED_MODULE_29__["default"], {
  symbol: '$',
  thousandsSeparator: ',',
  fractionCount: 2,
  fractionSeparator: '.',
  symbolPosition: 'front',
  symbolSpacing: true,
  avoidEmptyDecimals: undefined
});

// BSV Plugin Registration
vue__WEBPACK_IMPORTED_MODULE_14__["default"].use(bootstrap_vue__WEBPACK_IMPORTED_MODULE_32__.ToastPlugin);
vue__WEBPACK_IMPORTED_MODULE_14__["default"].use(bootstrap_vue__WEBPACK_IMPORTED_MODULE_33__.ModalPlugin);
vue__WEBPACK_IMPORTED_MODULE_14__["default"].use((element_ui__WEBPACK_IMPORTED_MODULE_10___default()));

// Feather font icon - For form-wizard
// * Shall remove it if not using font-icons of feather-icons - For form-wizard
__webpack_require__(/*! @core/assets/fonts/feather/iconfont.css */ "./resources/js/src/@core/assets/fonts/feather/iconfont.css"); // For form-wizard

// import core styles
__webpack_require__(/*! @core/scss/core.scss */ "./resources/js/src/@core/scss/core.scss");

// import assets styles
__webpack_require__(/*! @/assets/scss/style.scss */ "./resources/js/src/assets/scss/style.scss");
vue__WEBPACK_IMPORTED_MODULE_14__["default"].config.productionTip = false;
window.clone = function (obj) {
  return JSON.parse(JSON.stringify(obj));
};
window.random = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};
window.redondeo = function (num) {
  var decimales = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  var signo = num >= 0 ? 1 : -1;
  num = num * signo;
  if (decimales === 0) return signo * Math.round(num);
  num = num.toString().split('e');
  num = Math.round(+(num[0] + 'e' + (num[1] ? +num[1] + decimales : decimales)));
  num = num.toString().split('e');
  return signo * (num[0] + 'e' + (num[1] ? +num[1] - decimales : -decimales));
};
window.colorRand = function () {
  var colores = ['#397DAD', '#4D616C',
  // '#D02412',
  '#CD960E', '#348022', '#17B6AA', '#5F2626', '#00AEFF', '#6574cd', '#9561e2', '#f66d9b',
  // '#e3342f',
  // '#f6993f',
  // '#ffed4a',
  '#38c172', '#4dc0b5', '#6cb2eb', '#444444', '#00c0ef'];
  var i = random(0, colores.length);
  return colores[i];
};
window.$ = window.jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");

vue__WEBPACK_IMPORTED_MODULE_14__["default"].use(v_mask__WEBPACK_IMPORTED_MODULE_34__["default"]);



highcharts_modules_map__WEBPACK_IMPORTED_MODULE_37___default()((highcharts__WEBPACK_IMPORTED_MODULE_36___default()));

// Opcionalmente, también puedes importar módulos adicionales de Highcharts, como exporting o accessibility

highcharts_modules_exporting__WEBPACK_IMPORTED_MODULE_38___default()((highcharts__WEBPACK_IMPORTED_MODULE_36___default()));

highcharts_modules_accessibility__WEBPACK_IMPORTED_MODULE_39___default()((highcharts__WEBPACK_IMPORTED_MODULE_36___default()));

// Registra Highcharts Vue Wrapper como componente global
highcharts__WEBPACK_IMPORTED_MODULE_36___default().setOptions({
  chart: {
    backgroundColor: {
      linearGradient: [0, 0, 0, 0],
      stops: [[0, 'rgb(255,255,255)'], [1, 'rgb(255,255,255)']]
    },
    // borderWidth:2,
    borderRadius: 10,
    // options3d:{
    // 	alfa:10,
    // 	axisLabelPosition:'auto',
    // 	beta:0,
    // 	depth:100,
    // 	enabled:true,
    // 	fitToPlot:true,
    // },
    borderColor: {
      linearGradient: [0, 0, 0, 0],
      stops: [[0, 'rgb(46,169,214)'], [0.5, 'rgb(228,53,149)'], [1, 'rgb(96,167,49)']]
    },
    plotBackgroundColor: 'rgba(255,255,255,.9)',
    plotShadow: true,
    plotBorderWidth: 1,
    style: {
      "fontFamily": 'Myriad Regular'
    },
    spacingTop: 10
  },
  credits: {
    enabled: true,
    href: "https://travelpoints.es",
    text: "TravelPoints"
  }
});
vue__WEBPACK_IMPORTED_MODULE_14__["default"].use((highcharts_vue__WEBPACK_IMPORTED_MODULE_35___default()), {
  Highcharts: (highcharts__WEBPACK_IMPORTED_MODULE_36___default())
});

// Laravel Echo

// import Echo from 'laravel-echo';

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//   broadcaster: 'pusher',
//   key: process.env.MIX_PUSHER_APP_KEY,
//   cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//   encrypted:true,
//   wsPort: 6001,
//   wssPort:6001,
//   wsHost:'ws.bodayplaya.com',
//   disableStats: true,
//   forceTLS: true,
//   enabledTransports: ['ws','wss']
// });

// import VueEcho from 'vue-echo-laravel';

// Vue.use(VueEcho, lecho);

// Conekta

// window.conekta = require('conekta');
// conekta.api_key = 'key_OsW8LuyVL6ESxfQWduVKzEw';
// conekta.locale = 'es';

/* import the fontawesome core */


/* import font awesome icon component */


/* import specific icons */




/* add icons to the library */
_fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_40__.library.add(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_42__.fas, _fortawesome_free_brands_svg_icons__WEBPACK_IMPORTED_MODULE_43__.fab, _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_44__.far);
/* add font awesome icon component */
vue__WEBPACK_IMPORTED_MODULE_14__["default"].component('font-awesome-icon', _fortawesome_vue_fontawesome__WEBPACK_IMPORTED_MODULE_41__.FontAwesomeIcon);
vue__WEBPACK_IMPORTED_MODULE_14__["default"].config.productionTip = false;
window._ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
vue__WEBPACK_IMPORTED_MODULE_14__["default"].directive('number-format', {
  bind: function bind(el) {
    // el.addEventListener('input', function() {
    //   // Remover caracteres no numéricos
    //   el.value = el.value.replace(/\D/g, '');

    //   // Agregar ceros a la izquierda si es necesario
    //   while (el.value.length < 5) {
    //     el.value = '0' + el.value;
    //   }

    //   // Asegurarse de que no se exceda la longitud máxima
    //   if (el.value.length > 5) {
    //     el.value = el.value.slice(0, 5);
    //   }
    // });

    el.addEventListener('blur', function () {
      // Remover caracteres no numéricos
      el.value = el.value.replace(/\D/g, '');

      // Agregar ceros a la izquierda si es necesario
      while (el.value.length < 5) {
        el.value = '0' + el.value;
      }

      // Asegurarse de que no se exceda la longitud máxima
      if (el.value.length > 5) {
        el.value = el.value.slice(0, 5);
      }
    });
  }
});
var app = new vue__WEBPACK_IMPORTED_MODULE_14__["default"]({
  router: _router__WEBPACK_IMPORTED_MODULE_18__["default"],
  store: _store__WEBPACK_IMPORTED_MODULE_19__["default"],
  i18n: _libs_i18n__WEBPACK_IMPORTED_MODULE_17__["default"],
  render: function render(h) {
    return h(_App_vue__WEBPACK_IMPORTED_MODULE_20__["default"]);
  },
  provide: function provide() {
    return {
      swal: vue__WEBPACK_IMPORTED_MODULE_14__["default"].swal,
      i18n: _libs_i18n__WEBPACK_IMPORTED_MODULE_17__["default"]
    };
  }
}).$mount('#app');

// app.provide();

/***/ }),

/***/ "./resources/js/src/router/index.js":
/*!******************************************!*\
  !*** ./resources/js/src/router/index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! vue-router */ "./node_modules/vue-router/dist/vue-router.esm.js");
/* harmony import */ var _libs_acl_routeProtection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/libs/acl/routeProtection */ "./resources/js/src/libs/acl/routeProtection.js");
/* harmony import */ var _routes_dashboard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./routes/dashboard */ "./resources/js/src/router/routes/dashboard.js");
/* harmony import */ var _routes_pages__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./routes/pages */ "./resources/js/src/router/routes/pages.js");
/* harmony import */ var _routes_calidad__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./routes/calidad */ "./resources/js/src/router/routes/calidad.js");
/* harmony import */ var _routes_paginas__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./routes/paginas */ "./resources/js/src/router/routes/paginas.js");
/* harmony import */ var _routes_negocio__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./routes/negocio */ "./resources/js/src/router/routes/negocio.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @/store */ "./resources/js/src/store/index.js");
/* provided dependency */ var process = __webpack_require__(/*! process/browser.js */ "./node_modules/process/browser.js");








// Routes






vue__WEBPACK_IMPORTED_MODULE_11__["default"].use(vue_router__WEBPACK_IMPORTED_MODULE_12__["default"]);

var router = new vue_router__WEBPACK_IMPORTED_MODULE_12__["default"]({
  mode: 'history',
  base: process.env.BASE_URL,
  // base:'/',
  scrollBehavior: function scrollBehavior() {
    return {
      x: 0,
      y: 0
    };
  },
  routes: [].concat((0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_routes_paginas__WEBPACK_IMPORTED_MODULE_9__["default"]), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_routes_dashboard__WEBPACK_IMPORTED_MODULE_6__["default"]), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_routes_pages__WEBPACK_IMPORTED_MODULE_7__["default"]), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_routes_negocio__WEBPACK_IMPORTED_MODULE_10__["default"]), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_routes_calidad__WEBPACK_IMPORTED_MODULE_8__["default"]), [{
    path: '/:page',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_paginas_pages_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/paginas/pages.vue */ "./resources/js/calidad/views/paginas/pages.vue"));
    },
    name: 'pages.public',
    props: true,
    beforeEnter: function beforeEnter(to, from, next) {
      var param = to.params;
      _store__WEBPACK_IMPORTED_MODULE_13__["default"].dispatch('pagina/capturarPagina', param.page).then(function (_ref) {
        var result = _ref.result;
        if (result) {
          next();
        } else {
          next({
            name: 'error-404'
          });
        }
      });
    },
    meta: {
      resource: 'Auth',
      layout: 'travel'
    }
  }, {
    path: '*',
    redirect: 'error-404'
  }])
});
router.beforeEach(function (to, from, next) {
  var isLoggedIn = localStorage.getItem('token') ? true : false;
  if (!(0,_libs_acl_routeProtection__WEBPACK_IMPORTED_MODULE_5__.canNavigate)(to) && !isLoggedIn) {
    return next({
      name: 'login'
    });
  } else if (!(0,_libs_acl_routeProtection__WEBPACK_IMPORTED_MODULE_5__.canNavigate)(to) && isLoggedIn) {
    return next({
      name: 'misc-not-authorized'
    });
  } else if (to.meta.redirectIfLoggedIn === true && isLoggedIn) {
    return next({
      name: 'home'
    });
  } else {
    next();
  }
});

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(function () {
  // Remove initial loading
  var appLoading = document.getElementById('loading-bg');
  if (appLoading) {
    appLoading.style.display = 'none';
  }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);

/***/ }),

/***/ "./resources/js/src/router/routes/calidad.js":
/*!***************************************************!*\
  !*** ./resources/js/src/router/routes/calidad.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/store */ "./resources/js/src/store/index.js");




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([/*****************************************/
/* SOCIO
/*************************************** */
{
  path: '/socio',
  name: 'socio',
  component: function component() {
    return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_socio_index_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/socio */ "./resources/js/calidad/views/socio/index.vue"));
  },
  children: [{
    path: 'perfil',
    //  name: 'perfil',
    component: function component() {
      return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_socio_perfil_index_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/socio/perfil */ "./resources/js/calidad/views/socio/perfil/index.vue"));
    },
    meta: {
      resource: 'perfil',
      action: 'read',
      name: 'perfil',
      layout: 'travel'

      //  navActiveLink: 'socio'
    },

    children: [{
      path: '',
      name: 'miperfil',
      component: function component() {
        return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_socio_perfil_datos_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/socio/perfil/datos */ "./resources/js/calidad/views/socio/perfil/datos.vue"));
      },
      meta: {
        name: 'perfil',
        layout: 'travel'
        //  navActiveLink: 'socio'
      }
    }, {
      path: 'mi-cuenta',
      name: 'micuenta',
      component: function component() {
        return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_socio_perfil_cuenta_vue-_8b940")]).then(__webpack_require__.bind(__webpack_require__, /*! views/socio/perfil/cuenta.vue */ "./resources/js/calidad/views/socio/perfil/cuenta.vue"));
      },
      meta: {
        name: 'perfil',
        resource: 'micuenta',
        action: 'read',
        layout: 'travel'
      }
    }, {
      path: 'mi-tarjetas',
      name: 'mi.tarjetas',
      component: function component() {
        return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_socio_perfil_tarjetas_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/socio/perfil/tarjetas.vue */ "./resources/js/calidad/views/socio/perfil/tarjetas.vue"));
      },
      meta: {
        name: 'perfil',
        resource: 'micuenta',
        action: 'read',
        layout: 'travel'
      }
    }, {
      path: 'invitados',
      name: 'misreferidos',
      component: function component() {
        return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_socio_perfil_invitados_index_vue-_13cc0")]).then(__webpack_require__.bind(__webpack_require__, /*! views/socio/perfil/invitados */ "./resources/js/calidad/views/socio/perfil/invitados/index.vue"));
      },
      meta: {
        name: 'perfil',
        layout: 'travel'
        //  navActiveLink: 'socio'
      }
    }, {
      path: 'editar',
      name: 'perfil.editar',
      component: function component() {
        return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_socio_perfil_editar_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/socio/perfil/editar */ "./resources/js/calidad/views/socio/perfil/editar.vue"));
      },
      meta: {
        name: 'perfil',
        layout: 'travel'

        //  navActiveLink: 'socio'
      }
    }, {
      path: 'datos-pago',
      name: 'perfil.datos_pago',
      component: function component() {
        return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_socio_perfil_datosPago_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/socio/perfil/datosPago.vue */ "./resources/js/calidad/views/socio/perfil/datosPago.vue"));
      },
      meta: {
        name: 'perfil',
        layout: 'travel'
      }
    }, {
      path: 'contrasena',
      name: 'perfil.password',
      component: function component() {
        return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_socio_perfil_CambiarPassword_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/socio/perfil/CambiarPassword */ "./resources/js/calidad/views/socio/perfil/CambiarPassword.vue"));
      },
      meta: {
        name: 'perfil',
        layout: 'travel'

        //  navActiveLink: 'socio'
      }
    }, {
      path: 'desactivar',
      name: 'perfil.desactivar',
      component: function component() {
        return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_socio_perfil_desactivar_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/socio/perfil/desactivar */ "./resources/js/calidad/views/socio/perfil/desactivar.vue"));
      },
      meta: {
        name: 'perfil',
        layout: 'travel'

        //  navActiveLink: 'socio'
      }
    }]
  },
  //  negocio
  {
    path: 'negocio',
    //  name: 'socio.negocio',
    component: function component() {
      return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_socio_negocio_index_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/socio/negocio */ "./resources/js/calidad/views/socio/negocio/index.vue"));
    },
    meta: {
      resource: 'perfil',
      action: 'read',
      name: 'negocio',
      layout: 'travel'

      //  navActiveLink: 'socio'
    },

    children: [{
      path: '',
      name: 'socio.negocio.list',
      component: function component() {
        return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_socio_negocio_list_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/socio/negocio/list */ "./resources/js/calidad/views/socio/negocio/list.vue"));
      },
      meta: {
        name: 'negocio',
        layout: 'travel'

        //  navActiveLink: 'socio'
      }
    }, {
      path: 'siguiente',
      name: 'socio.negocio.siguiendo',
      component: function component() {
        return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_socio_negocio_siguiendo_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/socio/negocio/siguiendo */ "./resources/js/calidad/views/socio/negocio/siguiendo.vue"));
      },
      meta: {
        navActiveLink: 'socio.negocio',
        name: 'negocio',
        layout: 'travel'
      }
    }, {
      path: 'recomendados',
      name: 'socio.negocio.recomendados',
      component: function component() {
        return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_socio_negocio_recomendados_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/socio/negocio/recomendados */ "./resources/js/calidad/views/socio/negocio/recomendados.vue"));
      },
      meta: {
        navActiveLink: 'socio.negocio',
        name: 'negocio',
        layout: 'travel'
      }
    }, {
      path: 'solicitudes',
      component: function component() {
        return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_socio_negocio_solicitudes_index_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/socio/negocio/solicitudes */ "./resources/js/calidad/views/socio/negocio/solicitudes/index.vue"));
      },
      meta: {
        navActiveLink: 'socio.negocio',
        name: 'negocio',
        layout: 'travel'
      },
      children: [{
        path: '',
        component: function component() {
          return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_socio_negocio_solicitudes_list_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/socio/negocio/solicitudes/list */ "./resources/js/calidad/views/socio/negocio/solicitudes/list.vue"));
        },
        name: 'socio.negocio.solicitudes',
        meta: {
          navActiveLink: 'socio.negocio',
          name: 'negocio',
          layout: 'travel'
        }
      }, {
        path: 'afiliar',
        name: 'socio.negocio.afiliar',
        component: function component() {
          return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_socio_negocio_solicitudes_create_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/socio/negocio/solicitudes/create */ "./resources/js/calidad/views/socio/negocio/solicitudes/create.vue"));
        },
        meta: {
          navActiveLink: 'socio.negocio',
          name: 'negocio',
          layout: 'travel'
        }
      }, {
        path: ':id/edit',
        props: true,
        component: function component() {
          return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_socio_negocio_solicitudes_edit_vue-_51770")]).then(__webpack_require__.bind(__webpack_require__, /*! views/socio/negocio/solicitudes/edit */ "./resources/js/calidad/views/socio/negocio/solicitudes/edit.vue"));
        },
        name: 'socio.negocio.solicitudes.edit',
        meta: {
          navActiveLink: 'socio.negocio',
          name: 'negocio',
          layout: 'travel'
        }
      }]
    }]
  },
  // reservaciones
  {
    path: '/socio/reservaciones',
    name: 'socio.reservaciones',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_socio_reservaciones_index_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/socio/reservaciones */ "./resources/js/calidad/views/socio/reservaciones/index.vue"));
    },
    meta: {
      resource: 'perfil',
      action: 'read',
      layout: 'travel'

      //  navActiveLink: 'socio'
    }
  },
  //  consumos

  {
    path: '/consumos',
    //  name: 'socio.consumos',
    component: function component() {
      return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_socio_consumos_index_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/socio/consumos/index.vue */ "./resources/js/calidad/views/socio/consumos/index.vue"));
    },
    children: [{
      path: '',
      name: 'socio.consumos',
      component: function component() {
        return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_socio_consumos_list_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/socio/consumos/list.vue */ "./resources/js/calidad/views/socio/consumos/list.vue"));
      },
      meta: {
        resource: 'perfil',
        action: 'read',
        layout: 'travel',
        name: 'consumos'
      }
    }, {
      path: '/opinions',
      name: 'socio.consumos.opinions',
      component: function component() {
        return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_socio_consumos_opinions_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/socio/consumos/opinions.vue */ "./resources/js/calidad/views/socio/consumos/opinions.vue"));
      },
      meta: {
        resource: 'perfil',
        action: 'read',
        layout: 'travel',
        name: 'consumos'
      }
    }]
  },
  //  cupones
  {
    path: '/cupones',
    name: 'socio.cupones',
    component: function component() {
      return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_socio_cupones_index_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/socio/cupones */ "./resources/js/calidad/views/socio/cupones/index.vue"));
    },
    meta: {
      resource: 'perfil',
      action: 'read',
      layout: 'travel'
      //  navActiveLink: 'socio'
    }
  },
  //  compras
  {
    path: 'compras',
    name: 'socio.compras',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_socio_compras_index_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/socio/compras/index.vue */ "./resources/js/calidad/views/socio/compras/index.vue"));
    },
    meta: {
      resource: 'perfil',
      action: 'read',
      layout: 'travel'
      //  navActiveLink: 'socio'
    }
  }]
}, /*****************************************/
/* USUARIO
/*************************************** */

{
  path: '/usuarios',
  // name:'usuarios',
  component: function component() {
    return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_usuarios_index_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/usuarios */ "./resources/js/calidad/views/usuarios/index.vue"));
  },
  children: [{
    path: '',
    name: 'listar.usuarios',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_usuarios_lists_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/usuarios/lists */ "./resources/js/calidad/views/usuarios/lists.vue"));
    },
    meta: {
      resource: 'usuarios',
      action: 'read',
      pageTitle: 'Usuarios',
      breadcrumb: [{
        text: 'listado',
        active: true
      }]
    }
  }, {
    path: 'create',
    name: 'create.usuario',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_usuarios_create_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/usuarios/create */ "./resources/js/calidad/views/usuarios/create.vue"));
    },
    meta: {
      pageTitle: 'Agregar usuario',
      navActiveLink: 'listar.usuarios',
      resource: 'usuarios',
      action: 'write',
      breadcrumb: [{
        text: 'Usuarios',
        active: false,
        to: {
          name: 'listar.usuarios'
        }
      }, {
        text: 'crear',
        active: true
      }]
    }
  }, {
    path: ':id/edit',
    props: true,
    name: 'edit.usuario',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_usuarios_edit_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/usuarios/edit */ "./resources/js/calidad/views/usuarios/edit.vue"));
    },
    meta: {
      pageTitle: 'Editar usuario',
      navActiveLink: 'listar.usuarios',
      resource: 'usuarios',
      action: 'update',
      breadcrumb: [{
        text: 'Usuarios',
        active: false,
        to: {
          name: 'listar.usuarios'
        }
      }, {
        text: 'editar',
        active: true
      }]
    }
  }]
}, /*****************************************/
/* Promotores
/*************************************** */
{
  path: '/promotores',
  // name:'promotores',
  component: function component() {
    return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_promotores_index_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/promotores/index.vue */ "./resources/js/calidad/views/promotores/index.vue"));
  },
  children: [{
    path: '',
    name: 'promotores.list',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_promotores_list_vue-_6baa1")]).then(__webpack_require__.bind(__webpack_require__, /*! views/promotores/list.vue */ "./resources/js/calidad/views/promotores/list.vue"));
    },
    meta: {
      pageTitle: 'Promotores',
      resource: 'promotores',
      action: 'read',
      breadcrumb: [{
        text: 'Listado',
        active: true
      }]
    }
  }]
}, /*****************************************/
/* Lideres
/*************************************** */
{
  path: '/lideres',
  // name:'lideres',
  component: function component() {
    return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_promotores_index_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/promotores/index.vue */ "./resources/js/calidad/views/promotores/index.vue"));
  },
  children: [{
    path: '',
    name: 'lideres.list',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_lideres_list_vue-_99b00")]).then(__webpack_require__.bind(__webpack_require__, /*! views/lideres/list.vue */ "./resources/js/calidad/views/lideres/list.vue"));
    },
    meta: {
      pageTitle: 'Lideres',
      resource: 'lideres',
      action: 'read',
      breadcrumb: [{
        text: 'Listado',
        active: true
      }]
    }
  }]
}, /*****************************************/
/* Movimientos de Cuenta del sistema
/*************************************** */
{
  path: '/movimientos',
  component: function component() {
    return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_movimientos_index_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/movimientos/index.vue */ "./resources/js/calidad/views/movimientos/index.vue"));
  },
  children: [{
    path: '',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_socio_perfil_cuenta_vue-_8b940")]).then(__webpack_require__.bind(__webpack_require__, /*! views/socio/perfil/cuenta.vue */ "./resources/js/calidad/views/socio/perfil/cuenta.vue"));
    },
    name: 'movimientos',
    meta: {
      resources: 'movimientos',
      action: 'read'
    }
  }, {
    path: ':id/user',
    props: true,
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_socio_perfil_cuenta_vue-_8b940")]).then(__webpack_require__.bind(__webpack_require__, /*! views/socio/perfil/cuenta.vue */ "./resources/js/calidad/views/socio/perfil/cuenta.vue"));
    },
    name: 'movimientos.user',
    meta: {
      resources: 'movimientos',
      action: 'read',
      navActiveLink: 'listar.usuarios',
      breadcrumb: [{
        text: 'Usuarios',
        active: false,
        to: {
          name: 'listar.usuarios'
        }
      }, {
        text: 'Movimientos de Cuenta',
        active: true
      }]
    }
  }]
}, /*****************************************/
/* Iatas
/*************************************** */

{
  path: '/iatas',
  component: function component() {
    return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_iatas_index_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/iatas/index.vue */ "./resources/js/calidad/views/iatas/index.vue"));
  },
  // name:'iata',
  children: [{
    path: '',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_iatas_lists_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/iatas/lists.vue */ "./resources/js/calidad/views/iatas/lists.vue"));
    },
    name: 'iata.lists',
    meta: {
      resource: 'iatas',
      action: 'read',
      pageTitle: 'Códigos IATA',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'home'
        },
        active: false
      }, {
        text: 'Listado de Iatas',
        active: true
      }]
    }
  }, {
    path: 'create',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_iatas_create_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/iatas/create.vue */ "./resources/js/calidad/views/iatas/create.vue"));
    },
    name: 'iata.create',
    meta: {
      resource: 'iatas',
      action: 'write',
      pageTitle: 'Registrar Código Iata',
      navActiveLink: 'iata.lists',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'home'
        },
        active: false
      }, {
        text: 'Listado de Código IATA',
        active: false,
        to: {
          name: 'iata.lists'
        }
      }, {
        text: 'Registrar nuevo Iata',
        active: true
      }]
    }
  }, {
    path: ':id/edit',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_iatas_edit_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/iatas/edit.vue */ "./resources/js/calidad/views/iatas/edit.vue"));
    },
    name: 'iata.edit',
    props: true,
    meta: {
      resource: 'iatas',
      action: 'update',
      pageTitle: 'Actualizar Código Iata',
      navActiveLink: 'iata.lists',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'home'
        },
        active: false
      }, {
        text: 'Listado de Códigos IATA',
        active: false,
        to: {
          name: 'iata.lists'
        }
      }, {
        text: 'Actualizar nuevo Iata',
        active: true
      }]
    }
  }]
}, /*****************************************/
/* Destinos
/*************************************** */
{
  path: '/destinos',
  component: function component() {
    return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_destinos_index_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/destinos/index.vue */ "./resources/js/calidad/views/destinos/index.vue"));
  },
  // name:'destino',
  children: [{
    path: '',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_destinos_lists_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/destinos/lists.vue */ "./resources/js/calidad/views/destinos/lists.vue"));
    },
    name: 'destino.lists',
    meta: {
      resource: 'destinos',
      action: 'read',
      pageTitle: 'Destinos',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'home'
        },
        active: false
      }, {
        text: 'Destinos',
        active: true
      }]
    }
  }, {
    path: 'create',
    name: 'create.destino',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_destinos_create_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/destinos/create.vue */ "./resources/js/calidad/views/destinos/create.vue"));
    },
    meta: {
      pageTitle: 'Registrar Destino',
      navActiveLink: 'destino.lists',
      resource: 'destinos',
      action: 'write',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'home'
        },
        active: false
      }, {
        text: 'Destinos',
        active: false,
        to: {
          name: 'destino.lists'
        }
      }, {
        text: 'Crear Registro',
        active: true
      }]
    }
  }, {
    path: ':id/edit',
    name: 'edit.destino',
    props: true,
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_destinos_edit_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/destinos/edit.vue */ "./resources/js/calidad/views/destinos/edit.vue"));
    },
    meta: {
      pageTitle: 'Registrar Destino',
      navActiveLink: 'destino.lists',
      resource: 'destinos',
      action: 'write',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'home'
        },
        active: false
      }, {
        text: 'Destinos',
        active: false,
        to: {
          name: 'destino.lists'
        }
      }, {
        text: 'Crear Registro',
        active: true
      }]
    }
  }, {
    path: ':id/imagenes',
    name: 'imagenes.destino',
    props: true,
    component: function component() {
      return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_destinos_FormImagen_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/destinos/FormImagen.vue */ "./resources/js/calidad/views/destinos/FormImagen.vue"));
    },
    meta: {
      pageTitle: 'Imagenes de Destino',
      navActiveLink: 'destino.lists',
      resource: 'destinos',
      action: 'write',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'home'
        },
        active: false
      }, {
        text: 'Destinos',
        active: false,
        to: {
          name: 'destino.lists'
        }
      }, {
        text: 'Imagenes',
        active: true
      }]
    }
  }]
}, /*****************************************/
/* Atracciones
/*************************************** */
{
  path: '/atracciones',
  component: function component() {
    return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_destinos_atracciones_index_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/destinos/atracciones/index.vue */ "./resources/js/calidad/views/destinos/atracciones/index.vue"));
  },
  props: true,
  children: [{
    path: ':destino',
    props: true,
    name: 'atracciones.lists',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_destinos_atracciones_lists_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/destinos/atracciones/lists.vue */ "./resources/js/calidad/views/destinos/atracciones/lists.vue"));
    },
    meta: {
      resource: 'atracciones',
      action: 'read',
      pageTitle: 'Atracciones de Destinos',
      navActiveLink: 'destino.lists',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'home'
        },
        active: false
      }, {
        text: 'Atracciones',
        active: true
      }]
    }
  }, {
    path: ':destino/create',
    props: true,
    name: 'create.atraccion',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_destinos_atracciones_create_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/destinos/atracciones/create.vue */ "./resources/js/calidad/views/destinos/atracciones/create.vue"));
    },
    meta: {
      resource: 'atracciones',
      action: 'write',
      pageTitle: 'Crear Atracción',
      navActiveLink: 'destino.lists',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'home'
        },
        active: false
      }, {
        text: 'Atracciones',
        to: {
          name: 'atracciones.lists'
        },
        active: false
      }, {
        text: 'Crear',
        active: true
      }]
    }
  }, {
    path: ':id/edit',
    props: true,
    name: 'edit.atraccion',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_destinos_atracciones_edit_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/destinos/atracciones/edit.vue */ "./resources/js/calidad/views/destinos/atracciones/edit.vue"));
    },
    meta: {
      resource: 'atracciones',
      action: 'write',
      pageTitle: 'Actualizar Atracción',
      navActiveLink: 'destino.lists',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'home'
        },
        active: false
      }, {
        text: 'Atracciones',
        active: false
      }, {
        text: 'Actualizar',
        active: true
      }]
    }
  }, {
    path: ':id/imagenes',
    name: 'imagenes.atraccion',
    props: true,
    component: function component() {
      return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_destinos_atracciones_FormImagen_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/destinos/atracciones/FormImagen.vue */ "./resources/js/calidad/views/destinos/atracciones/FormImagen.vue"));
    },
    meta: {
      pageTitle: 'Imagenes de Atracción',
      navActiveLink: 'destino.lists',
      resource: 'atracciones',
      action: 'write',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'home'
        },
        active: false
      }, {
        text: 'Destinos',
        active: false,
        to: {
          name: 'destino.lists'
        }
      }, {
        text: 'Atracciones',
        active: false
      }, {
        text: 'Imagenes',
        active: true
      }]
    }
  },
  // Horarios de Atracciones
  {
    path: ':id/horarios',
    component: function component() {
      return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_destinos_atracciones_horarios_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/destinos/atracciones/horarios.vue */ "./resources/js/calidad/views/destinos/atracciones/horarios.vue"));
    },
    name: 'atraccion.horarios',
    props: true,
    meta: {
      resource: 'horarios',
      action: 'read',
      pageTitle: 'Horarios de Atracción',
      navActiveLink: 'destino.lists',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'home'
        },
        active: false
      }, {
        text: 'Destinos',
        active: false,
        to: {
          name: 'destino.lists'
        }
      }, {
        text: 'Atracciones',
        active: false
      }, {
        text: 'Horarios',
        active: true
      }]
    }
  }]
}, /*****************************************/
/* Eventos
/*************************************** */
{
  path: '/eventos',
  component: function component() {
    return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_eventos_index_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/eventos/index.vue */ "./resources/js/calidad/views/eventos/index.vue"));
  },
  children: [{
    path: '',
    name: 'eventos.list',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_eventos_lists_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/eventos/lists.vue */ "./resources/js/calidad/views/eventos/lists.vue"));
    },
    meta: {
      pageTitle: 'Eventos',
      resource: 'eventos',
      action: 'read',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'home'
        },
        active: false
      }, {
        text: 'Eventos',
        active: true
      }]
    }
  }, {
    path: 'create',
    name: 'create.evento',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_eventos_create_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/eventos/create.vue */ "./resources/js/calidad/views/eventos/create.vue"));
    },
    meta: {
      pageTitle: 'Eventos',
      resource: 'eventos',
      action: 'write',
      navActiveLink: 'eventos.list',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'home'
        },
        active: false
      }, {
        text: 'Eventos',
        to: {
          name: 'eventos.list'
        },
        active: false
      }, {
        text: 'Crear',
        active: true
      }]
    }
  }, {
    path: ':id/edit',
    name: 'edit.evento',
    props: true,
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_eventos_edit_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/eventos/edit.vue */ "./resources/js/calidad/views/eventos/edit.vue"));
    },
    meta: {
      pageTitle: 'Eventos',
      resource: 'eventos',
      action: 'update',
      navActiveLink: 'eventos.list',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'home'
        },
        active: false
      }, {
        text: 'Eventos',
        to: {
          name: 'eventos.list'
        },
        active: false
      }, {
        text: 'Actualizar',
        active: true
      }]
    }
  }, {
    path: ':id/imagenes',
    name: 'evento.imagenes',
    props: true,
    component: function component() {
      return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_eventos_imagenes_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/eventos/imagenes.vue */ "./resources/js/calidad/views/eventos/imagenes.vue"));
    },
    meta: {
      pageTitle: 'Eventos',
      resource: 'eventos',
      action: 'update',
      navActiveLink: 'eventos.list',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'home'
        },
        active: false
      }, {
        text: 'Eventos',
        to: {
          name: 'eventos.list'
        },
        active: false
      }, {
        text: 'Imagenes',
        active: true
      }]
    }
  }]
}, /*****************************************/
/* ROL DE USUARIO
/*************************************** */

{
  path: '/roles',
  // name: 'roles',
  component: function component() {
    return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_roles_index_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/roles */ "./resources/js/calidad/views/roles/index.vue"));
  },
  exact: false,
  children: [{
    path: '',
    name: 'listar.roles',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_roles_lists_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/roles/lists */ "./resources/js/calidad/views/roles/lists.vue"));
    },
    meta: {
      pageTitle: 'Rol de usuarios',
      breadcrumb: [{
        text: 'Listado',
        active: true
      }],
      resource: 'roles',
      action: 'read'
    }
  }, {
    path: 'create',
    name: 'create.role',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_roles_create_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/roles/create */ "./resources/js/calidad/views/roles/create.vue"));
    },
    meta: {
      pageTitle: 'Crear Rol',
      navActiveLink: 'listar.roles',
      breadcrumb: [{
        text: 'Rol de usuarios',
        active: false,
        to: {
          name: 'listar.roles'
        }
      }, {
        text: 'Crear',
        active: true
      }],
      resource: 'roles',
      action: 'write'
    }
  }, {
    path: ':id/edit',
    props: true,
    name: 'edit.role',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_roles_edit_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/roles/edit */ "./resources/js/calidad/views/roles/edit.vue"));
    },
    meta: {
      pageTitle: 'Editar Rol',
      navActiveLink: 'listar.roles',
      breadcrumb: [{
        text: 'Rol de usuarios',
        active: false,
        to: {
          name: 'listar.roles'
        }
      }, {
        text: 'Editar',
        active: true
      }],
      resource: 'roles',
      action: 'update'
    }
  }]
}, /*****************************************/
/* PERMISOS DE USUARIO
/*************************************** */

{
  path: '/permisos',
  // name: 'permisos',

  component: function component() {
    return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_permisos_index_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/permisos */ "./resources/js/calidad/views/permisos/index.vue"));
  },
  exact: false,
  children: [{
    path: '',
    name: 'listar.permisos',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_permisos_lists_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/permisos/lists */ "./resources/js/calidad/views/permisos/lists.vue"));
    },
    meta: {
      pageTitle: 'Permisos de usuario',
      breadcrumb: [{
        text: 'Listado',
        active: true
      }],
      resource: 'permisos',
      action: 'read'
    }
  }, {
    path: 'create',
    name: 'create.permiso',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_permisos_create_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/permisos/create */ "./resources/js/calidad/views/permisos/create.vue"));
    },
    meta: {
      pageTitle: 'Crear Permiso',
      navActiveLink: 'listar.permisos',
      breadcrumb: [{
        text: 'Permisos de usuario',
        active: false,
        to: {
          name: 'listar.permisos'
        }
      }, {
        text: 'Crear',
        active: true
      }],
      resource: 'permisos',
      action: 'write'
    }
  }, {
    path: ':id/edit',
    props: true,
    name: 'edit.permiso',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_permisos_edit_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/permisos/edit */ "./resources/js/calidad/views/permisos/edit.vue"));
    },
    meta: {
      pageTitle: 'Editar Permiso',
      navActiveLink: 'listar.permisos',
      breadcrumb: [{
        text: 'Permisos de usuario',
        active: false,
        to: {
          name: 'listar.permisos'
        }
      }, {
        text: 'Editar',
        active: true
      }],
      resource: 'permisos',
      action: 'update'
    }
  }]
}, /*****************************************/
/* LINK DE REFERIDO
/*************************************** */
{
  path: '/register/:codigo?',
  props: true,
  component: function component() {
    return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_auth_registro_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/auth/registro */ "./resources/js/calidad/views/auth/registro.vue"));
  },
  name: 'registro.referido',
  meta: {
    layout: 'full',
    resource: 'Auth',
    action: 'read'
  }
}, /*****************************************/
/* LINK DE REGISTRO
/*************************************** */
{
  path: '/register',
  props: true,
  component: function component() {
    return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_auth_registro_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/auth/registro */ "./resources/js/calidad/views/auth/registro.vue"));
  },
  name: 'register',
  meta: {
    layout: 'full',
    resource: 'Auth',
    action: 'read'
  }
}, /*****************************************/
/* Preguntas Frecuentes FAQs
/*************************************** */
{
  path: '/configuracion/faqs',
  component: function component() {
    return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_faqs_index_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/faqs */ "./resources/js/calidad/views/faqs/index.vue"));
  },
  // name: 'configuracion.faq',
  children: [{
    path: '',
    name: 'listar.faqs',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_faqs_list_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/faqs/list */ "./resources/js/calidad/views/faqs/list.vue"));
    },
    meta: {
      pageTitle: 'Preguntas Frecuentes',
      resource: 'faqs',
      action: 'read',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'home'
        },
        active: false
      }, {
        text: 'Preguntas frecuentes',
        active: true
      }]
    }
  }, {
    path: 'create',
    name: 'create.faq',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_faqs_create_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/faqs/create */ "./resources/js/calidad/views/faqs/create.vue"));
    },
    meta: {
      pageTitle: 'Crear pregunta Frecuente',
      resource: 'faqs',
      action: 'write',
      navActiveLink: 'listar.faqs',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'home'
        },
        active: false
      }, {
        text: 'Preguntas frecuentes',
        to: {
          name: 'listar.faqs'
        },
        active: false
      }, {
        text: 'Crear',
        active: true
      }]
    }
  }, {
    path: ':id/edit',
    name: 'edit.faq',
    props: true,
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_faqs_edit_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/faqs/edit */ "./resources/js/calidad/views/faqs/edit.vue"));
    },
    meta: {
      pageTitle: 'Editar pregunta Frecuente',
      resource: 'faqs',
      action: 'update',
      navActiveLink: 'listar.faqs',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'home'
        },
        active: false
      }, {
        text: 'Preguntas frecuentes',
        to: {
          name: 'listar.faqs'
        },
        active: false
      }, {
        text: 'Atualizar',
        active: true
      }]
    }
  }]
}, /*****************************************/
/* Categoría de Faqs
/*************************************** */

{
  path: '/configuracion/categorias-faqs',
  component: function component() {
    return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_faqs_index_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/faqs */ "./resources/js/calidad/views/faqs/index.vue"));
  },
  // name: 'configuracion.categorias-faq',
  children: [{
    path: '',
    name: 'listar.categoria-faqs',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_faqs_categorias_list_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/faqs/categorias/list */ "./resources/js/calidad/views/faqs/categorias/list.vue"));
    },
    meta: {
      pageTitle: 'Categorías de Preguntas Frecuentes (Faqs)',
      resource: 'faqs',
      action: 'read',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'home'
        },
        active: false
      }, {
        text: 'Categorías',
        active: true
      }]
    }
  }, {
    path: 'create',
    name: 'create.categoria-faq',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_faqs_categorias_create_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/faqs/categorias/create */ "./resources/js/calidad/views/faqs/categorias/create.vue"));
    },
    meta: {
      pageTitle: 'Crear categoría',
      resource: 'faqs',
      action: 'write',
      navActiveLink: 'listar.categoria-faqs',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'home'
        },
        active: false
      }, {
        text: 'Categoría de Peguntas frecuentes',
        to: {
          name: 'listar.categoria-faqs'
        },
        active: false
      }, {
        text: 'Crear',
        active: true
      }]
    }
  }, {
    path: ':id/edit',
    props: true,
    name: 'edit.categoria-faq',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_faqs_categorias_edit_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/faqs/categorias/edit */ "./resources/js/calidad/views/faqs/categorias/edit.vue"));
    },
    meta: {
      pageTitle: 'Editar Categoría',
      resource: 'faqs',
      action: 'update',
      navActiveLink: 'listar.categoria-faqs',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'home'
        },
        active: false
      }, {
        text: 'Categoría de Peguntas frecuentes',
        to: {
          name: 'listar.categoria-faqs'
        },
        active: false
      }, {
        text: 'Atualizar',
        active: true
      }]
    }
  }]
}, {
  path: '/faqs',
  component: function component() {
    return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_paginas_faqs_vue-_2ef80")]).then(__webpack_require__.bind(__webpack_require__, /*! views/paginas/faqs */ "./resources/js/calidad/views/paginas/faqs.vue"));
  },
  name: 'faqs',
  meta: {
    layout: 'travel',
    resource: 'Auth',
    action: 'read'
  }
}, /*****************************************/
/* Categoría de Negocios
/*************************************** */

{
  path: '/negocios/categorias',
  component: function component() {
    return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_negocios_categorias_index_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/negocios/categorias */ "./resources/js/calidad/views/negocios/categorias/index.vue"));
  },
  children: [{
    path: '',
    name: 'negocio.categorias.list',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_negocios_categorias_list_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/negocios/categorias/list */ "./resources/js/calidad/views/negocios/categorias/list.vue"));
    },
    meta: {
      resource: 'negocio categorías',
      action: 'read',
      pageTitle: 'Categorías de negocios',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'home'
        },
        active: false
      }, {
        text: 'Categorías',
        active: true
      }]
    }
  }, {
    path: 'create',
    name: 'negocio.categorias.create',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_negocios_categorias_create_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/negocios/categorias/create */ "./resources/js/calidad/views/negocios/categorias/create.vue"));
    },
    meta: {
      resource: 'negocio categorías',
      action: 'write',
      pageTitle: 'Crear categoría',
      navActiveLink: 'negocio.categorias.list',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'home'
        },
        active: false
      }, {
        text: 'Categorías',
        to: {
          name: 'negocio.categorias.list'
        },
        active: false
      }, {
        text: 'crear',
        active: true
      }]
    }
  }, {
    path: ':id/edit',
    name: 'negocio.categorias.edit',
    props: true,
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_negocios_categorias_edit_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/negocios/categorias/edit */ "./resources/js/calidad/views/negocios/categorias/edit.vue"));
    },
    meta: {
      resource: 'negocio categorías',
      action: 'update',
      pageTitle: 'Editar categoría',
      navActiveLink: 'negocio.categorias.list',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'home'
        },
        active: false
      }, {
        text: 'Categorías',
        to: {
          name: 'negocio.categorias.list'
        },
        active: false
      }, {
        text: 'editar',
        active: true
      }]
    }
  }]
}, /*****************************************/
/* Negocios
/*************************************** */

{
  path: '/negocios',
  component: function component() {
    return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_negocios_index_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/negocios/index.vue */ "./resources/js/calidad/views/negocios/index.vue"));
  },
  children: [{
    path: '',
    name: 'negocio.lists',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_negocios_lists_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/negocios/lists.vue */ "./resources/js/calidad/views/negocios/lists.vue"));
    },
    meta: {
      resource: 'negocios',
      action: 'read',
      pageTitle: 'Negocios asociados',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'home'
        },
        active: false
      }, {
        text: 'Listado',
        active: false
      }]
    }
  }, {
    path: ':id/edit',
    props: true,
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_negocios_edit_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/negocios/edit.vue */ "./resources/js/calidad/views/negocios/edit.vue"));
    },
    name: 'negocio.edit',
    meta: {
      resource: 'negocios',
      action: 'update',
      pageTitle: 'Editar negocios',
      navActiveLink: 'negocio.lists',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'home'
        },
        active: false
      }, {
        text: 'Negocios',
        to: {
          name: 'negocio.lists'
        },
        active: false
      }, {
        text: 'Actualizar',
        active: true
      }]
    }
  }]
}, /*****************************************/
/* Solicitudes de negocios
/*************************************** */

{
  path: '/negocios/solicitudes',
  component: function component() {
    return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_negocios_solicitudes_index_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/negocios/solicitudes */ "./resources/js/calidad/views/negocios/solicitudes/index.vue"));
  },
  children: [{
    path: '',
    name: 'listar.solicitudes.negocios',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_negocios_solicitudes_list_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/negocios/solicitudes/list */ "./resources/js/calidad/views/negocios/solicitudes/list.vue"));
    },
    meta: {
      pageTitle: 'Solicitudes de negocios',
      resource: 'solicitudes',
      action: 'read',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'home'
        },
        active: false
      }, {
        text: 'Solicitudes',
        active: true
      }]
    }
  }, {
    path: ':id/show',
    props: true,
    name: 'negocio.solicitud.show',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_negocios_solicitudes_edit_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/negocios/solicitudes/edit */ "./resources/js/calidad/views/negocios/solicitudes/edit.vue"));
    },
    meta: {
      // pageTitle: 'Solicitud de negocio',
      resource: 'solicitudes',
      action: 'read',
      navActiveLink: 'listar.solicitudes.negocios',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'home'
        },
        active: false
      }, {
        text: 'Solicitudes',
        active: false,
        to: {
          name: 'listar.solicitudes.negocios'
        }
      }, {
        text: 'Ver solicitud',
        active: true
      }]
    }
  }]
}, /*****************************************/
/* Divisas
/*************************************** */
{
  path: '/divisas',
  // name:'divisas',
  component: function component() {
    return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_divisas_index_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/divisas/index.vue */ "./resources/js/calidad/views/divisas/index.vue"));
  },
  children: [{
    path: '',
    name: 'divisas.list',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_divisas_list_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/divisas/list.vue */ "./resources/js/calidad/views/divisas/list.vue"));
    },
    meta: {
      pageTitle: 'Divisas',
      resource: 'divisas',
      action: 'read',
      breadcrumb: [{
        text: 'Home',
        to: 'home',
        active: false
      }, {
        text: 'Listado',
        active: true
      }]
    }
  }, {
    path: 'create',
    name: 'create.divisa',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_divisas_create_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/divisas/create.vue */ "./resources/js/calidad/views/divisas/create.vue"));
    },
    meta: {
      pageTitle: 'Divisas',
      resource: 'divisas',
      action: 'write',
      navActiveLink: 'divisas.list',
      breadcrumb: [{
        text: 'Home',
        to: 'home',
        active: false
      }, {
        text: 'Listado',
        active: false,
        to: {
          name: 'divisas.list'
        }
      }, {
        text: 'Crear',
        active: true
      }]
    }
  }, {
    path: ':id/edit',
    name: 'divisa.edit',
    props: true,
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_divisas_edit_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/divisas/edit.vue */ "./resources/js/calidad/views/divisas/edit.vue"));
    },
    meta: {
      pageTitle: 'Divisas',
      resource: 'divisas',
      action: 'update',
      navActiveLink: 'divisas.list',
      breadcrumb: [{
        text: 'Home',
        to: 'home',
        active: false
      }, {
        text: 'Listado',
        active: false,
        to: {
          name: 'divisas.list'
        }
      }, {
        text: 'Editar',
        active: true
      }]
    }
  }]
}, /*****************************************/
/* PAnels
/*************************************** */

{
  path: '/panels',
  component: function component() {
    return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_panels_index_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/panels/index.vue */ "./resources/js/calidad/views/panels/index.vue"));
  },
  children: [{
    path: '',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_panels_list_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/panels/list.vue */ "./resources/js/calidad/views/panels/list.vue"));
    },
    name: 'panel.list',
    meta: {
      resource: 'panels',
      action: 'read',
      pageTitle: 'Paneles',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'home'
        },
        active: false
      }, {
        text: 'Listado',
        active: true
      }]
    }
  }, {
    path: 'create',
    name: 'panel.create',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_panels_create_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/panels/create.vue */ "./resources/js/calidad/views/panels/create.vue"));
    },
    meta: {
      resource: 'panels',
      action: 'write',
      pageTitle: 'Paneles',
      navActiveLink: 'panel.list',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'home'
        },
        active: false
      }, {
        text: 'Listado',
        active: false,
        to: {
          name: "panel.list"
        }
      }, {
        text: 'Crear',
        active: true
      }]
    }
  }, {
    path: ':id/edit',
    name: 'panel.edit',
    props: true,
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_panels_edit_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/panels/edit.vue */ "./resources/js/calidad/views/panels/edit.vue"));
    },
    meta: {
      resource: 'panels',
      action: 'update',
      pageTitle: 'Paneles',
      navActiveLink: 'panel.list',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'home'
        },
        active: false
      }, {
        text: 'Listado',
        active: false,
        to: {
          name: "panel.list"
        }
      }, {
        text: 'Editar',
        active: true
      }]
    }
  }]
}, /*****************************************/
/* Amenidades
/*************************************** */

{
  path: '/amenidads',
  component: function component() {
    return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_amenidades_index_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/amenidades/index.vue */ "./resources/js/calidad/views/amenidades/index.vue"));
  },
  children: [{
    path: '',
    name: 'amenidad.list',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_amenidades_list_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/amenidades/list.vue */ "./resources/js/calidad/views/amenidades/list.vue"));
    },
    meta: {
      resource: 'amenidades',
      action: 'read',
      pageTitle: 'Amenidades',
      breadcrumb: [{
        text: 'Home',
        to: 'home',
        active: false
      }, {
        text: 'Listado',
        active: false
      }]
    }
  }, {
    path: 'create',
    name: 'create.amenidad',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_amenidades_create_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/amenidades/create.vue */ "./resources/js/calidad/views/amenidades/create.vue"));
    },
    meta: {
      resource: 'amenidades',
      action: 'read',
      pageTitle: 'Crear Amenidad',
      navActiveLink: 'amenidad.list',
      breadcrumb: [{
        text: 'Home',
        to: 'home',
        active: false
      }, {
        text: 'Listado',
        active: false,
        to: {
          name: 'amenidad.list'
        }
      }, {
        text: 'Crear',
        active: true
      }]
    }
  }, {
    path: ':id/edit',
    name: 'edit.amenidad',
    props: true,
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_amenidades_edit_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/amenidades/edit.vue */ "./resources/js/calidad/views/amenidades/edit.vue"));
    },
    meta: {
      resource: 'amenidades',
      action: 'read',
      pageTitle: 'Editar Amenidad',
      navActiveLink: 'amenidad.list',
      breadcrumb: [{
        text: 'Home',
        to: 'home',
        active: false
      }, {
        text: 'Listado',
        active: false,
        to: {
          name: 'amenidad.list'
        }
      }, {
        text: 'Editar',
        active: true
      }]
    }
  }]
}, /*****************************************/
/* formas de pago
/*************************************** */

{
  path: '/formas-pago',
  component: function component() {
    return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_formas-pago_index_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/formas-pago/index.vue */ "./resources/js/calidad/views/formas-pago/index.vue"));
  },
  children: [{
    path: '',
    name: 'formasPago.list',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_formas-pago_list_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/formas-pago/list.vue */ "./resources/js/calidad/views/formas-pago/list.vue"));
    },
    meta: {
      resource: 'formas de pago',
      action: 'read',
      pageTitle: 'Formas de pago',
      breadcrumb: [{
        text: 'Home',
        to: 'home',
        active: false
      }, {
        text: 'Listado',
        active: false
      }]
    }
  }, {
    path: 'create',
    name: 'create.formasPago',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_formas-pago_create_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/formas-pago/create.vue */ "./resources/js/calidad/views/formas-pago/create.vue"));
    },
    meta: {
      resource: 'formas de pago',
      action: 'read',
      pageTitle: 'Crear Forma de pago',
      navActiveLink: 'formasPago.list',
      breadcrumb: [{
        text: 'Home',
        to: 'home',
        active: false
      }, {
        text: 'Listado',
        active: false,
        to: {
          name: 'formasPago.list'
        }
      }, {
        text: 'Crear',
        active: true
      }]
    }
  }, {
    path: ':id/edit',
    name: 'edit.formasPago',
    props: true,
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_formas-pago_edit_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/formas-pago/edit.vue */ "./resources/js/calidad/views/formas-pago/edit.vue"));
    },
    meta: {
      resource: 'formas de pago',
      action: 'read',
      pageTitle: 'Editar Forma',
      navActiveLink: 'formasPago.list',
      breadcrumb: [{
        text: 'Home',
        to: 'home',
        active: false
      }, {
        text: 'Listado',
        active: false,
        to: {
          name: 'formasPago.list'
        }
      }, {
        text: 'Editar',
        active: true
      }]
    }
  }]
}, /*****************************************/
/* Sistema
/*************************************** */
{
  path: '/admin/sistema',
  name: 'sistema',
  component: function component() {
    return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_sistema_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/sistema.vue */ "./resources/js/calidad/views/sistema.vue"));
  },
  meta: {
    resource: 'sistema',
    action: 'read',
    pageTitle: 'Datos del sistema',
    breadcrumb: [{
      text: 'Home',
      to: 'home',
      active: false
    }, {
      text: 'Configuración de sistema',
      active: true
    }]
  }
}, {
  path: '/admin/sucursales',
  component: function component() {
    return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_sucursales_index_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/sucursales/index.vue */ "./resources/js/calidad/views/sucursales/index.vue"));
  },
  children: [{
    path: '',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_sucursales_list_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/sucursales/list.vue */ "./resources/js/calidad/views/sucursales/list.vue"));
    },
    name: 'sucursales.list',
    meta: {
      resource: 'sucursales',
      action: 'read',
      pageTitle: 'Sucursales',
      breadcrumb: [{
        text: 'Home',
        to: 'home',
        active: false
      }, {
        text: 'Sucursales',
        active: true
      }]
    }
  }, {
    path: 'create',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_sucursales_create_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/sucursales/create.vue */ "./resources/js/calidad/views/sucursales/create.vue"));
    },
    name: 'sucursales.create',
    meta: {
      resource: 'sucursales',
      action: 'write',
      pageTitle: 'Sucursales',
      navActiveLink: 'sucursales.list',
      breadcrumb: [{
        text: 'Home',
        to: 'home',
        active: false
      }, {
        text: 'Sucursales',
        active: false,
        to: {
          name: 'sucursales.list'
        }
      }, {
        text: 'Crear',
        active: true
      }]
    }
  }, {
    path: ':id/edit',
    props: true,
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_sucursales_edit_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/sucursales/edit.vue */ "./resources/js/calidad/views/sucursales/edit.vue"));
    },
    name: 'sucursales.edit',
    meta: {
      resource: 'sucursales',
      action: 'update',
      pageTitle: 'Sucursales',
      navActiveLink: 'sucursales.list',
      breadcrumb: [{
        text: 'Home',
        to: 'home',
        active: false
      }, {
        text: 'Sucursales',
        active: false,
        to: {
          name: 'sucursales.list'
        }
      }, {
        text: 'Editar',
        active: true
      }]
    }
  }]
}, /*****************************************/
/* Tiendas
/*************************************** */
{
  path: '/tiendas',
  component: function component() {
    return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_tienda_index_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/tienda/index.vue */ "./resources/js/calidad/views/tienda/index.vue"));
  },
  children: [{
    path: '',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_tienda_list_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/tienda/list.vue */ "./resources/js/calidad/views/tienda/list.vue"));
    },
    name: 'tienda.list',
    meta: {
      resource: 'tiendas',
      action: 'read',
      pageTitle: 'Tiendas',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'home'
        },
        active: false
      }, {
        text: 'Tiendas',
        active: true
      }]
    }
  }, {
    path: 'create',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_tienda_create_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/tienda/create.vue */ "./resources/js/calidad/views/tienda/create.vue"));
    },
    name: 'tienda.create',
    meta: {
      resource: 'tiendas',
      action: 'write',
      pageTitle: 'Agregar Tienda',
      navActiveLink: 'tienda.list',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'home'
        },
        active: false
      }, {
        text: 'Tiendas',
        active: false,
        to: {
          name: 'tienda.list'
        }
      }, {
        text: 'Crear tienda',
        active: true
      }]
    }
  }, {
    path: ':id/edit',
    props: true,
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_tienda_edit_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/tienda/edit.vue */ "./resources/js/calidad/views/tienda/edit.vue"));
    },
    name: 'tienda.edit',
    meta: {
      resource: 'tiendas',
      action: 'update',
      pageTitle: 'Actualizar Tienda',
      navActiveLink: 'tienda.list',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'home'
        },
        active: false
      }, {
        text: 'Tiendas',
        active: false,
        to: {
          name: 'tienda.list'
        }
      }, {
        text: 'Actualizar',
        active: true
      }]
    }
  }]
}, /*****************************************/
/* Productos
/*************************************** */
{
  path: '/productos',
  component: function component() {
    return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_tienda_productos_index_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/tienda/productos/index.vue */ "./resources/js/calidad/views/tienda/productos/index.vue"));
  },
  children: [{
    path: '',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_tienda_productos_list_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/tienda/productos/list.vue */ "./resources/js/calidad/views/tienda/productos/list.vue"));
    },
    name: 'producto.list',
    meta: {
      resource: 'productos',
      action: 'read',
      pageTitle: 'Productos',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'home'
        },
        active: false
      }, {
        text: 'Productos',
        active: true
      }]
    }
  }, {
    path: 'create',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_tienda_productos_create_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/tienda/productos/create.vue */ "./resources/js/calidad/views/tienda/productos/create.vue"));
    },
    name: 'producto.create',
    meta: {
      resource: 'productos',
      action: 'write',
      pageTitle: 'Agregar Producto',
      navActiveLink: 'producto.list',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'home'
        },
        active: false
      }, {
        text: 'Productos',
        active: false,
        to: {
          name: 'producto.list'
        }
      }, {
        text: 'Crear Producto',
        active: true
      }]
    }
  }, {
    path: ':id/edit',
    props: true,
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_tienda_productos_edit_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/tienda/productos/edit.vue */ "./resources/js/calidad/views/tienda/productos/edit.vue"));
    },
    name: 'producto.edit',
    meta: {
      resource: 'productos',
      action: 'update',
      pageTitle: 'Actualizar Producto',
      navActiveLink: 'producto.list',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'home'
        },
        active: false
      }, {
        text: 'Productos',
        active: false,
        to: {
          name: 'producto.list'
        }
      }, {
        text: 'Actualizar',
        active: true
      }]
    }
  }, {
    path: ':id/imagenes',
    props: true,
    component: function component() {
      return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_tienda_productos_imagenes_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/tienda/productos/imagenes.vue */ "./resources/js/calidad/views/tienda/productos/imagenes.vue"));
    },
    name: 'producto.imagenes',
    meta: {
      resource: 'productos',
      action: 'update',
      pageTitle: 'Imagenes del Producto',
      navActiveLink: 'producto.list',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'home'
        },
        active: false
      }, {
        text: 'Productos',
        active: false,
        to: {
          name: 'producto.list'
        }
      }, {
        text: 'Imagenes',
        active: true
      }]
    }
  }, {
    path: ':id/show',
    props: true,
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_tienda_productos_perfil_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/tienda/productos/perfil.vue */ "./resources/js/calidad/views/tienda/productos/perfil.vue"));
    },
    name: 'producto.show',
    meta: {
      resource: 'productos',
      action: 'read',
      pageTitle: 'Producto',
      navActiveLink: 'producto.list',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'home'
        },
        active: false
      }, {
        text: 'Productos',
        active: false,
        to: {
          name: 'producto.list'
        }
      }, {
        text: 'Perfil',
        active: true
      }]
    }
  }]
}, /*****************************************/
/* Productos CJDROPSHIPPING
/*************************************** */
{
  path: '/productos/cj-dropshiping',
  component: function component() {
    return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_tienda_productos-cj_index_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/tienda/productos-cj/index.vue */ "./resources/js/calidad/views/tienda/productos-cj/index.vue"));
  },
  children: [{
    path: '',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_tienda_productos-cj_list_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/tienda/productos-cj/list.vue */ "./resources/js/calidad/views/tienda/productos-cj/list.vue"));
    },
    name: 'producto.cj.list',
    meta: {
      resource: 'productos',
      action: 'read',
      pageTitle: 'Productos (Almacén)',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'home'
        },
        active: false
      }, {
        text: 'Productos',
        active: true
      }]
    }
  }, {
    path: ':id/show',
    props: true,
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_tienda_productos-cj_perfil_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/tienda/productos-cj/perfil.vue */ "./resources/js/calidad/views/tienda/productos-cj/perfil.vue"));
    },
    name: 'producto.show.cj',
    meta: {
      resource: 'productos',
      action: 'read',
      pageTitle: 'Producto',
      navActiveLink: 'producto.cj.list',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'home'
        },
        active: false
      }, {
        text: 'Productos',
        active: false,
        to: {
          name: 'producto.cj.list'
        }
      }, {
        text: 'Perfil',
        active: true
      }]
    }
  }]
}, /*****************************************/
/* Ventas de Productos
/*************************************** */
{
  path: '/productos/ventas',
  component: function component() {
    return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_tienda_productos_ventas_index_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/tienda/productos/ventas/index.vue */ "./resources/js/calidad/views/tienda/productos/ventas/index.vue"));
  },
  children: [{
    path: '',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_tienda_productos_ventas_list_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/tienda/productos/ventas/list.vue */ "./resources/js/calidad/views/tienda/productos/ventas/list.vue"));
    },
    name: 'ventas.productos.list',
    meta: {
      resources: 'ventas productos',
      action: 'read',
      pageTitle: 'Ventas de Productos',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'home'
        },
        active: false
      }, {
        text: 'Ventas',
        active: true
      }]
    }
  }]
}, /*****************************************/
/* Categoria de Productos
/*************************************** */
{
  path: '/categoria-productos',
  component: function component() {
    return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_tienda_categorias-producto_index_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/tienda/categorias-producto/index.vue */ "./resources/js/calidad/views/tienda/categorias-producto/index.vue"));
  },
  children: [{
    path: '',
    name: 'categorias',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_tienda_categorias-producto_list_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/tienda/categorias-producto/list.vue */ "./resources/js/calidad/views/tienda/categorias-producto/list.vue"));
    },
    meta: {
      resource: 'categoria productos',
      action: 'read',
      pageTitle: 'Categoría de Productos',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'home'
        },
        active: false
      }, {
        text: 'Categorias',
        active: true
      }]
    }
  }, {
    path: 'create',
    name: 'categoriaProducto.create',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_tienda_categorias-producto_create_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/tienda/categorias-producto/create.vue */ "./resources/js/calidad/views/tienda/categorias-producto/create.vue"));
    },
    meta: {
      resource: 'categoria productos',
      action: 'write',
      pageTitle: 'Crear Categoría',
      navActiveLink: 'categorias',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'home'
        },
        active: false
      }, {
        text: 'Categorias',
        active: false,
        to: {
          name: 'categorias'
        }
      }, {
        text: 'Crear',
        active: true
      }]
    }
  }, {
    path: ':id/edit',
    name: 'categoriaProducto.edit',
    props: true,
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_tienda_categorias-producto_edit_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/tienda/categorias-producto/edit.vue */ "./resources/js/calidad/views/tienda/categorias-producto/edit.vue"));
    },
    meta: {
      resource: 'categoria productos',
      action: 'update',
      pageTitle: 'Editar Categoría',
      navActiveLink: 'categorias',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'home'
        },
        active: false
      }, {
        text: 'Categorias',
        active: false,
        to: {
          name: 'categorias'
        }
      }, {
        text: 'Editar',
        active: true
      }]
    }
  }]
}, /*****************************************/
/* Pago en caja
/*************************************** */

{
  path: '/carrito/caja',
  component: function component() {
    return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_tienda_caja_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/tienda/caja.vue */ "./resources/js/calidad/views/tienda/caja.vue"));
  },
  name: 'caja',
  meta: {
    resource: 'Auth',
    action: 'read',
    layout: 'travel'
  }
}, /*****************************************/
/* Multimedias
/*************************************** */
{
  path: '/multimedias',
  name: 'multimedias',
  component: function component() {
    return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_multimedias_multimedia_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/multimedias/multimedia.vue */ "./resources/js/calidad/views/multimedias/multimedia.vue"));
  },
  meta: {
    resource: 'multimedia',
    action: 'read',
    pageTitle: 'Multimedias',
    breadcrumb: [{
      text: 'Archivos',
      active: true
    }]
  }
}, /*****************************************/
/* Comisiones
/****************************************/
{
  path: '/comisiones',
  // name:'comisiones',
  component: function component() {
    return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_comisiones_index_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/comisiones/index.vue */ "./resources/js/calidad/views/comisiones/index.vue"));
  },
  children: [{
    path: '',
    name: 'comisiones.list',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_comisiones_list_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/comisiones/list.vue */ "./resources/js/calidad/views/comisiones/list.vue"));
    },
    meta: {
      pageTitle: 'Comisiones de Roles',
      resource: 'comisiones',
      action: 'read',
      breadcrumb: [{
        text: 'Listado',
        active: true
      }]
    }
  }, {
    path: 'create',
    name: 'comision.create',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_comisiones_create_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/comisiones/create.vue */ "./resources/js/calidad/views/comisiones/create.vue"));
    },
    meta: {
      pageTitle: 'Crear Comisión',
      resource: 'comisiones',
      action: 'write',
      navActiveLink: 'comisiones.list',
      breadcrumb: [{
        text: 'Listado',
        active: false,
        to: {
          name: 'comisiones.list'
        }
      }, {
        text: 'Crear',
        active: true
      }]
    }
  }, {
    path: ':id/edit',
    props: true,
    name: 'comision.edit',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_comisiones_edit_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/comisiones/edit.vue */ "./resources/js/calidad/views/comisiones/edit.vue"));
    },
    meta: {
      pageTitle: 'Editar Comisión',
      resource: 'comisiones',
      action: 'update',
      navActiveLink: 'comisiones.list',
      breadcrumb: [{
        text: 'Listado',
        active: false,
        to: {
          name: 'comisiones.list'
        }
      }, {
        text: 'Editar',
        active: true
      }]
    }
  }]
}, /*****************************************/
/* Reservaciones
/****************************************/
{
  path: '/reservaciones',
  // name:'reservaciones',
  component: function component() {
    return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_reservaciones_index_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/reservaciones/index.vue */ "./resources/js/calidad/views/reservaciones/index.vue"));
  },
  children: [{
    path: '',
    name: 'reservaciones.list',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_reservaciones_list_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/reservaciones/list.vue */ "./resources/js/calidad/views/reservaciones/list.vue"));
    },
    meta: {
      resource: 'reservaciones',
      action: 'read',
      pageTitle: 'Reservaciones',
      breadcrumb: [{
        text: 'listado',
        active: true
      }]
    }
  }, {
    path: 'create',
    name: 'reservacion.create',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_reservaciones_create_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/reservaciones/create.vue */ "./resources/js/calidad/views/reservaciones/create.vue"));
    },
    meta: {
      resource: 'reservaciones',
      action: 'write',
      pageTitle: 'Crear Reservación',
      navActiveLink: 'reservaciones.list',
      breadcrumb: [{
        text: 'listado',
        active: false,
        to: {
          name: 'reservaciones.list'
        }
      }, {
        text: 'crear',
        active: true
      }]
    }
  }, {
    path: ':id/edit',
    name: 'reservacion.edit',
    props: true,
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_reservaciones_edit_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/reservaciones/edit.vue */ "./resources/js/calidad/views/reservaciones/edit.vue"));
    },
    meta: {
      resource: 'reservaciones',
      action: 'update',
      pageTitle: 'Editar Reservación',
      navActiveLink: 'reservaciones.list',
      breadcrumb: [{
        text: 'Listado',
        active: false,
        to: {
          name: 'reservaciones.list'
        }
      }, {
        text: 'Editar',
        active: true
      }]
    }
  }]
}, /*****************************************/
/* Retiros comisiones
/****************************************/

{
  path: '/retiros',
  // name:'retiros',
  component: function component() {
    return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_retiros_index_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/retiros/index.vue */ "./resources/js/calidad/views/retiros/index.vue"));
  },
  children: [{
    path: '',
    name: 'retiro.list',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_retiros_list_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/retiros/list.vue */ "./resources/js/calidad/views/retiros/list.vue"));
    },
    meta: {
      resource: 'retiros',
      action: 'read',
      pageTitle: 'Retiros de comisiones',
      breadcrumb: [{
        text: 'Retiros',
        active: true
      }]
    }
  }, {
    path: 'create',
    name: 'retiro.create',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_retiros_create_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/retiros/create.vue */ "./resources/js/calidad/views/retiros/create.vue"));
    },
    meta: {
      resource: 'retiros',
      action: 'write',
      pageTitle: 'Crear Retiro',
      navActiveLink: 'retiro.list',
      breadcrumb: [{
        text: 'Retiros',
        active: false,
        to: {
          name: 'retiro.list'
        }
      }, {
        text: 'Crear',
        active: true
      }]
    }
  }, {
    path: ':id/edit',
    name: 'retiro.edit',
    props: true,
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_retiros_edit_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/retiros/edit.vue */ "./resources/js/calidad/views/retiros/edit.vue"));
    },
    meta: {
      resource: 'retiros',
      action: 'update',
      pageTitle: 'Actualizar Retiro',
      navActiveLink: 'retiro.list',
      breadcrumb: [{
        text: 'Retiros',
        active: false,
        to: {
          name: 'retiro.list'
        }
      }, {
        text: 'Actualizar',
        active: true
      }]
    }
  }]
}, /*****************************************/
/* Pais
/****************************************/

{
  path: '/pais',
  component: function component() {
    return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_pais_index_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/pais/index.vue */ "./resources/js/calidad/views/pais/index.vue"));
  },
  // name:'pais',

  children: [{
    path: '',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_pais_list_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/pais/list.vue */ "./resources/js/calidad/views/pais/list.vue"));
    },
    name: 'listar.paises',
    meta: {
      resource: 'pais',
      action: 'read',
      pageTitle: 'Paises',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'home'
        },
        active: false
      }, {
        text: 'Listado',
        active: true
      }]
    }
  }, {
    path: 'create',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_pais_create_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/pais/create.vue */ "./resources/js/calidad/views/pais/create.vue"));
    },
    name: 'create.pais',
    meta: {
      resource: 'pais',
      action: 'write',
      pageTitle: 'Registrar Pais',
      navActiveLink: 'listar.paises',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'home'
        },
        active: false
      }, {
        text: 'Paises',
        to: {
          name: 'listar.paises'
        },
        active: false
      }, {
        text: 'create',
        active: true
      }]
    }
  }, {
    path: ':id/edit',
    props: true,
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_pais_edit_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/pais/edit.vue */ "./resources/js/calidad/views/pais/edit.vue"));
    },
    name: 'edit.pais',
    meta: {
      resource: 'pais',
      action: 'update',
      pageTitle: 'Actualizad Pais',
      navActiveLink: 'listar.paises',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'home'
        },
        active: false
      }, {
        text: 'Paises',
        to: {
          name: 'listar.paises'
        },
        active: false
      }, {
        text: 'edit',
        active: true
      }]
    }
  }]
}, /*****************************************/
/* Estado
/*************************************** */

{
  path: '/estado',
  component: function component() {
    return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_estado_index_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/estado/index.vue */ "./resources/js/calidad/views/estado/index.vue"));
  },
  // name: 'estado',

  children: [{
    path: '',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_estado_list_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/estado/list.vue */ "./resources/js/calidad/views/estado/list.vue"));
    },
    name: 'listar.estados',
    meta: {
      resource: 'estado',
      action: 'read',
      pageTitle: 'Estados',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'home'
        },
        active: false
      }, {
        text: 'Listado',
        active: true
      }]
    }
  }, {
    path: 'create',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_estado_create_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/estado/create.vue */ "./resources/js/calidad/views/estado/create.vue"));
    },
    name: 'create.estado',
    meta: {
      resource: 'estado',
      action: 'write',
      pageTitle: 'Registrar Estado',
      navActiveLink: 'listar.estados',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'home'
        },
        active: false
      }, {
        text: 'Estados',
        to: {
          name: 'listar.estados'
        },
        active: false
      }, {
        text: 'create',
        active: true
      }]
    }
  }, {
    path: ':id/edit',
    props: true,
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_estado_edit_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/estado/edit.vue */ "./resources/js/calidad/views/estado/edit.vue"));
    },
    name: 'edit.estado',
    meta: {
      resource: 'estado',
      action: 'update',
      pageTitle: 'Actualizad Estado',
      navActiveLink: 'listar.estados',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'home'
        },
        active: false
      }, {
        text: 'Estados',
        to: {
          name: 'listar.estados'
        },
        active: false
      }, {
        text: 'edit',
        active: true
      }]
    }
  }]
}, /*****************************************/
/* Ciudad
/*************************************** */
{
  path: '/ciudad',
  component: function component() {
    return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_estado_index_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/estado/index.vue */ "./resources/js/calidad/views/estado/index.vue"));
  },
  // name: 'ciudad',

  children: [{
    path: '',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_ciudad_list_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/ciudad/list.vue */ "./resources/js/calidad/views/ciudad/list.vue"));
    },
    name: 'listar.ciudades',
    meta: {
      resource: 'ciudad',
      action: 'read',
      pageTitle: 'Ciudades',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'home'
        },
        active: false
      }, {
        text: 'Listado',
        active: true
      }]
    }
  }, {
    path: 'create',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_ciudad_create_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/ciudad/create.vue */ "./resources/js/calidad/views/ciudad/create.vue"));
    },
    name: 'create.ciudad',
    meta: {
      resource: 'ciudad',
      action: 'write',
      pageTitle: 'Registrar Ciudad',
      navActiveLink: 'listar.ciudades',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'home'
        },
        active: false
      }, {
        text: 'Ciudades',
        to: {
          name: 'listar.ciudades'
        },
        active: false
      }, {
        text: 'create',
        active: true
      }]
    }
  }, {
    path: ':id/edit',
    props: true,
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_ciudad_edit_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/ciudad/edit.vue */ "./resources/js/calidad/views/ciudad/edit.vue"));
    },
    name: 'edit.ciudad',
    meta: {
      resource: 'ciudad',
      action: 'update',
      pageTitle: 'Actualizad Ciudad',
      navActiveLink: 'listar.ciudades',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'home'
        },
        active: false
      }, {
        text: 'Ciudades',
        to: {
          name: 'listar.ciudades'
        },
        active: false
      }, {
        text: 'edit',
        active: true
      }]
    }
  }]
}, /*****************************************/
/* Academia
/*************************************** */
{
  path: '/academia',
  // name:'academia',
  component: function component() {
    return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_academia_index_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/academia/index.vue */ "./resources/js/calidad/views/academia/index.vue"));
  },
  children: [{
    path: '',
    name: 'academia.list',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_academia_list_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/academia/list.vue */ "./resources/js/calidad/views/academia/list.vue"));
    },
    meta: {
      pageTitle: 'Academia',
      resource: 'academias',
      action: 'read',
      breadcrumb: [{
        text: 'Listado',
        active: true
      }]
    }
  }, {
    path: 'create',
    name: 'academia.create',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_academia_create_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/academia/create.vue */ "./resources/js/calidad/views/academia/create.vue"));
    },
    meta: {
      pageTitle: 'Academia',
      resource: 'academias',
      action: 'write',
      navActiveLink: 'academia.list',
      breadcrumb: [{
        text: 'Listado',
        active: false,
        to: {
          name: 'academia.list'
        }
      }, {
        text: 'Crear',
        active: true
      }]
    }
  }, {
    path: ':id/edit',
    name: 'academia.edit',
    props: true,
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_academia_edit_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/academia/edit.vue */ "./resources/js/calidad/views/academia/edit.vue"));
    },
    meta: {
      pageTitle: 'Academia',
      resource: 'academias',
      action: 'update',
      navActiveLink: 'academia.list',
      breadcrumb: [{
        text: 'Listado',
        active: false,
        to: {
          name: 'academia.list'
        }
      }, {
        text: 'Editar',
        active: true
      }]
    }
  }]
}, /*****************************************/
/* Paginas
/*************************************** */
{
  path: '/paginas',
  // name:'pagina',
  component: function component() {
    return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_pages_index_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/pages/index.vue */ "./resources/js/calidad/views/pages/index.vue"));
  },
  children: [{
    path: '',
    name: 'pagina.list',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_pages_list_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/pages/list.vue */ "./resources/js/calidad/views/pages/list.vue"));
    },
    meta: {
      resource: 'paginas',
      action: 'read',
      pageTitle: 'Paginas',
      breadcrumb: [{
        text: 'Paginas',
        active: true
      }]
    }
  }, {
    path: 'create',
    name: 'pagina.create',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_pages_create_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/pages/create.vue */ "./resources/js/calidad/views/pages/create.vue"));
    },
    meta: {
      resource: 'paginas',
      action: 'write',
      pageTitle: 'Paginas',
      navActiveLink: 'pagina.list',
      breadcrumb: [{
        text: 'Paginas',
        active: false,
        to: {
          name: 'pagina.list'
        }
      }, {
        text: 'Crear',
        active: true
      }]
    }
  }, {
    path: ':id/edit',
    props: true,
    name: 'pagina.edit',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_pages_edit_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/pages/edit.vue */ "./resources/js/calidad/views/pages/edit.vue"));
    },
    meta: {
      resource: 'paginas',
      action: 'update',
      pageTitle: 'Paginas',
      navActiveLink: 'pagina.list',
      breadcrumb: [{
        text: 'Paginas',
        active: false,
        to: {
          name: 'pagina.list'
        }
      }, {
        text: 'Editar',
        active: true
      }]
    }
  }]
}, /*****************************************/
/* Lotes
/*************************************** */
{
  path: '/lotes',
  // name:'lotes',
  component: function component() {
    return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_lotes_index_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/lotes/index.vue */ "./resources/js/calidad/views/lotes/index.vue"));
  },
  children: [{
    path: '',
    name: 'lotes.list',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_lotes_list_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/lotes/list.vue */ "./resources/js/calidad/views/lotes/list.vue"));
    },
    meta: {
      resource: 'lotes',
      action: 'read',
      pageTitle: 'Lotes',
      breadcrumb: [{
        text: 'Listado',
        active: true
      }]
    }
  }, {
    path: 'create',
    name: 'lotes.create',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_lotes_create_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/lotes/create.vue */ "./resources/js/calidad/views/lotes/create.vue"));
    },
    meta: {
      resource: 'lotes',
      action: 'write',
      pageTitle: 'Lotes',
      navActiveLink: 'lotes.list',
      breadcrumb: [{
        text: 'Listado',
        active: false,
        to: {
          name: 'lotes.list'
        }
      }, {
        text: 'Crear',
        active: true
      }]
    }
  }, {
    path: ':id/update',
    props: true,
    name: 'lotes.edit',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_lotes_edit_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/lotes/edit.vue */ "./resources/js/calidad/views/lotes/edit.vue"));
    },
    meta: {
      resource: 'lotes',
      action: 'read',
      pageTitle: 'Lotes',
      navActiveLink: 'lotes.list',
      breadcrumb: [{
        text: 'Listado',
        active: false,
        to: {
          name: 'lotes.list'
        }
      }, {
        text: 'Actualizar',
        active: true
      }]
    }
  }]
}, /*****************************************/
/* tarjetas
/*************************************** */
{
  path: '/tarjetas',
  name: 'tarjetas',
  component: function component() {
    return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_tarjetas_index_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/tarjetas/index.vue */ "./resources/js/calidad/views/tarjetas/index.vue"));
  },
  children: [{
    path: ':lote?',
    props: true,
    name: 'tarjetas.list',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_tarjetas_list_vue-_ffd01")]).then(__webpack_require__.bind(__webpack_require__, /*! views/tarjetas/list.vue */ "./resources/js/calidad/views/tarjetas/list.vue"));
    },
    meta: {
      resource: 'tarjetas',
      action: 'read',
      pageTitle: 'Tarjetas',
      breadcrumb: [{
        text: 'Listado',
        active: true
      }]
    }
  }]
}, /*****************************************/
/* Vonages
/*************************************** */
{
  path: '/vonages/sms',
  component: function component() {
    return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_vonages_index_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/vonages/index.vue */ "./resources/js/calidad/views/vonages/index.vue"));
  },
  children: [{
    path: '',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_vonages_list_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/vonages/list.vue */ "./resources/js/calidad/views/vonages/list.vue"));
    },
    name: 'mensajes.list',
    meta: {
      resource: 'vonage',
      action: 'read',
      pageTitle: 'Mensajes (vonage)',
      breadcrumb: [{
        text: 'Listado',
        active: true
      }]
    }
  }]
}, /*****************************************/
/* PAGINA DE perfil de negocios
/*************************************** */
{
  path: '/negocio/:url',
  props: true,
  component: function component() {
    return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_paginas_negocio_index_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/paginas/negocio/index.vue */ "./resources/js/calidad/views/paginas/negocio/index.vue"));
  },
  meta: {
    layout: 'travel',
    resource: 'Auth',
    action: 'read'
  },
  children: [{
    path: '',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_paginas_negocio_perfil_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/paginas/negocio/perfil.vue */ "./resources/js/calidad/views/paginas/negocio/perfil.vue"));
    },
    name: 'perfil.negocio',
    meta: {
      layout: 'travel'
    }
  }, {
    path: 'cupones',
    component: function component() {
      return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_paginas_negocio_cupones_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/paginas/negocio/cupones.vue */ "./resources/js/calidad/views/paginas/negocio/cupones.vue"));
    },
    name: 'perfil.negocio.cupones',
    meta: {
      layout: 'travel'
    }
  }, {
    path: 'publicaciones',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_paginas_negocio_publicaciones_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/paginas/negocio/publicaciones.vue */ "./resources/js/calidad/views/paginas/negocio/publicaciones.vue"));
    },
    name: 'perfil.negocio.publicaciones',
    meta: {
      layout: 'travel'
    }
  }, {
    path: 'eventos',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_paginas_negocio_eventos_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/paginas/negocio/eventos.vue */ "./resources/js/calidad/views/paginas/negocio/eventos.vue"));
    },
    name: 'perfil.negocio.eventos',
    meta: {
      layout: 'travel'
    }
  }, {
    path: 'opiniones',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_paginas_negocio_opiniones_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/paginas/negocio/opiniones.vue */ "./resources/js/calidad/views/paginas/negocio/opiniones.vue"));
    },
    name: 'perfil.negocio.opiniones',
    meta: {
      layout: 'travel'
    }
  }]
}, /*****************************************/
/* PAGINA DE EVENTOS
/*************************************** */

{
  path: '/eventos/:event',
  props: true,
  component: function component() {
    return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_paginas_eventos_show_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/paginas/eventos/show.vue */ "./resources/js/calidad/views/paginas/eventos/show.vue"));
  },
  name: 'evento.show',
  beforeEnter: function beforeEnter(to, from, next) {
    var param = to.params;
    _store__WEBPACK_IMPORTED_MODULE_3__["default"].dispatch('evento/fetchEventPublic', param.event).then(function (_ref) {
      var result = _ref.result,
        evento = _ref.evento;
      if (result) {
        next();
      } else {
        next({
          name: 'error-404'
        });
      }
    })["catch"](function (e) {
      next({
        name: 'error-404'
      });
    });
  },
  meta: {
    layout: 'travel',
    resource: 'Auth',
    action: "read"
  }
}, /*****************************************/
/* PAGINA DE Mantenimiento
/*************************************** */
{
  path: '/mantenimiento',
  name: 'show.mantenimiento',
  component: function component() {
    return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_mantenimiento_index_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/mantenimiento/index.vue */ "./resources/js/calidad/views/mantenimiento/index.vue"));
  },
  meta: {
    layout: 'full'
  }
}]);

/***/ }),

/***/ "./resources/js/src/router/routes/dashboard.js":
/*!*****************************************************!*\
  !*** ./resources/js/src/router/routes/dashboard.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_2__);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([{
  path: '/home',
  name: 'home',
  meta: {
    resource: 'home',
    action: 'read'
  },
  component: function component() {
    return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_home_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/home */ "./resources/js/calidad/views/home.vue"));
  }
}]);

/***/ }),

/***/ "./resources/js/src/router/routes/negocio.js":
/*!***************************************************!*\
  !*** ./resources/js/src/router/routes/negocio.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/store */ "./resources/js/src/store/index.js");



// Rutas de negocios

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([{
  path: '/negocio/home',
  name: 'negocio.home',
  meta: {
    resource: 'home negocio',
    action: 'read',
    layout: 'negocio'
  },
  component: function component() {
    return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_panels_negocio_home_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/panels/negocio/home.vue */ "./resources/js/calidad/views/panels/negocio/home.vue"));
  }
},
/***************************************
 *    Cargos Negocio
 * *************************************/
{
  path: '/negocio/cargos',
  component: function component() {
    return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_panels_negocio_cargos_index_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/panels/negocio/cargos/index.vue */ "./resources/js/calidad/views/panels/negocio/cargos/index.vue"));
  },
  children: [{
    path: '',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_panels_negocio_cargos_list_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/panels/negocio/cargos/list.vue */ "./resources/js/calidad/views/panels/negocio/cargos/list.vue"));
    },
    name: 'cargos.list',
    meta: {
      pageTitle: "Cargos",
      resources: 'cargos negocio',
      action: 'read',
      layout: 'negocio',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'negocio.home'
        },
        active: false
      }, {
        text: 'Cargos',
        active: true
      }]
    }
  }, {
    path: 'create',
    name: 'cargo.create',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_panels_negocio_cargos_create_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/panels/negocio/cargos/create.vue */ "./resources/js/calidad/views/panels/negocio/cargos/create.vue"));
    },
    meta: {
      layout: 'negocio',
      resource: 'cargos negocio',
      action: 'write',
      navActiveLink: 'cargos.list',
      pagetTitle: 'Crear Cargo',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'negocio.home'
        },
        active: false
      }, {
        text: 'Cargos',
        active: false,
        to: {
          name: 'cargos.list'
        }
      }, {
        text: 'Crear',
        active: true
      }]
    }
  }, {
    path: ':id/edit',
    name: 'cargo.edit',
    props: true,
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_panels_negocio_cargos_edit_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/panels/negocio/cargos/edit.vue */ "./resources/js/calidad/views/panels/negocio/cargos/edit.vue"));
    },
    meta: {
      layout: 'negocio',
      resource: 'cargos negocio',
      action: 'update',
      navActiveLink: 'cargos.list',
      pagetTitle: 'Editar cargo',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'negocio.home'
        },
        active: false
      }, {
        text: 'Cargos',
        active: false,
        to: {
          name: 'cargos.list'
        }
      }, {
        text: 'Editar',
        active: true
      }]
    }
  }]
},
/***************************************
 *    Personal Negocio
 * *************************************/

{
  path: '/negocio/personal',
  component: function component() {
    return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_panels_negocio_personal_index_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/panels/negocio/personal/index.vue */ "./resources/js/calidad/views/panels/negocio/personal/index.vue"));
  },
  children: [{
    path: '',
    name: 'personal.list',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_panels_negocio_personal_list_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/panels/negocio/personal/list.vue */ "./resources/js/calidad/views/panels/negocio/personal/list.vue"));
    },
    meta: {
      pageTitle: 'Personal',
      resource: 'personal negocio',
      action: 'read',
      layout: 'negocio',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'negocio.home'
        },
        active: false
      }, {
        text: 'Personal',
        active: true
      }]
    }
  }, {
    path: 'create',
    name: 'personal.create',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_panels_negocio_personal_create_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/panels/negocio/personal/create.vue */ "./resources/js/calidad/views/panels/negocio/personal/create.vue"));
    },
    meta: {
      pageTitle: 'Asociar Personal',
      resource: 'personal negocio',
      action: 'write',
      layout: 'negocio',
      navActiveLink: 'personal.list',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'negocio.home'
        },
        active: false
      }, {
        text: 'Personal',
        active: false,
        to: {
          name: 'personal.list'
        }
      }, {
        text: 'Asociar',
        active: true
      }]
    }
  }, {
    path: ':id/edit',
    name: 'personal.edit',
    props: true,
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_panels_negocio_personal_edit_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/panels/negocio/personal/edit.vue */ "./resources/js/calidad/views/panels/negocio/personal/edit.vue"));
    },
    meta: {
      pageTitle: 'Editar Personal',
      resource: 'personal negocio',
      action: 'update',
      layout: 'negocio',
      navActiveLink: 'personal.list',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'negocio.home'
        },
        active: false
      }, {
        text: 'Personal',
        active: false,
        to: {
          name: 'personal.list'
        }
      }, {
        text: 'Actualizar Personal',
        active: true
      }]
    }
  }]
},
/***************************************
 *    Información del Negocio
 * *************************************/

{
  path: '/negocio/preferencias/informacion',
  component: function component() {
    return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_panels_negocio_preferencias_informacion_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/panels/negocio/preferencias/informacion.vue */ "./resources/js/calidad/views/panels/negocio/preferencias/informacion.vue"));
  },
  name: 'negocio.informacion',
  meta: {
    resource: "preferencias negocio",
    action: 'update',
    layout: 'negocio',
    pageTitle: 'Información del negocio',
    breadcrumb: [{
      text: 'Home',
      to: {
        name: 'negocio.home'
      },
      active: false
    }, {
      text: 'Preferencias',
      active: true
    }]
  }
},
/***************************************
*    Logo y Portada
* *************************************/

{
  path: '/negocio/preferencias/logo-y-portada',
  name: 'negocio.logo',
  component: function component() {
    return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_panels_negocio_preferencias_Logo_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/panels/negocio/preferencias/Logo.vue */ "./resources/js/calidad/views/panels/negocio/preferencias/Logo.vue"));
  },
  meta: {
    resource: 'preferencias negocio',
    action: "read",
    layout: 'negocio',
    pageTitle: 'Logo y Portada',
    breadcrumb: [{
      text: 'Home',
      to: {
        name: 'negocio.home'
      },
      active: false
    }, {
      text: 'Logo y Portada',
      active: true
    }]
  }
},
/***************************************
*    Horario del Negocio
* *************************************/

{
  path: '/negocio/preferencias/horarios',
  component: function component() {
    return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_panels_negocio_preferencias_Horario_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/panels/negocio/preferencias/Horario.vue */ "./resources/js/calidad/views/panels/negocio/preferencias/Horario.vue"));
  },
  name: 'negocio.horario',
  meta: {
    pageTitle: 'Horario del Negocio',
    resource: 'preferencias negocio',
    action: 'read',
    layout: 'negocio',
    breadcrumb: [{
      text: 'Home',
      to: {
        name: 'negocio.home'
      },
      active: false
    }, {
      text: 'Horario',
      active: true
    }]
  }
},
/***************************************
 *    Amenidades y Formas de Pago
 * *************************************/

{
  path: '/negocio/preferencias/amenidades',
  component: function component() {
    return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_panels_negocio_preferencias_Amenidades_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/panels/negocio/preferencias/Amenidades.vue */ "./resources/js/calidad/views/panels/negocio/preferencias/Amenidades.vue"));
  },
  name: 'negocio.amenidades',
  meta: {
    pageTitle: 'Amenidades y Formas de Pago',
    resource: 'preferencias negocio',
    action: 'read',
    layout: 'negocio',
    breadcrumb: [{
      text: 'Home',
      to: {
        name: 'negocio.home'
      },
      active: false
    }, {
      text: 'Amenidades y Formas de Pago',
      active: true
    }]
  }
},
/***************************************
 *    Divisa predeterminada Negocio
 * *************************************/

{
  path: '/negocio/preferencias/divisa',
  component: function component() {
    return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_panels_negocio_preferencias_Divisa_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/panels/negocio/preferencias/Divisa.vue */ "./resources/js/calidad/views/panels/negocio/preferencias/Divisa.vue"));
  },
  name: 'negocio.divisa',
  meta: {
    resource: 'preferencias negocio',
    pageTitle: 'Divisa Predeterminada',
    action: 'read',
    layout: 'negocio',
    breadcrumb: [{
      text: 'Home',
      to: {
        name: 'negocio.home'
      },
      active: false
    }, {
      text: 'Divisa',
      active: true
    }]
  }
},
/***************************************
 *    Redes sociales de Negocios
 * *************************************/

{
  path: '/negocio/preferencias/redes',
  component: function component() {
    return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_panels_negocio_preferencias_redes_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/panels/negocio/preferencias/redes.vue */ "./resources/js/calidad/views/panels/negocio/preferencias/redes.vue"));
  },
  name: 'negocio.redes',
  meta: {
    resource: 'preferencias negocio',
    pageTitle: 'Redes Sociales',
    action: 'read',
    layout: 'negocio',
    breadcrumb: [{
      text: 'Home',
      to: {
        name: 'negocio.home'
      },
      active: false
    }, {
      text: 'Redes',
      active: true
    }]
  }
},
/***************************************
*    Videos de Negocio
* *************************************/

{
  path: '/negocio/preferencias/videos',
  component: function component() {
    return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_panels_negocio_preferencias_videos_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/panels/negocio/preferencias/videos.vue */ "./resources/js/calidad/views/panels/negocio/preferencias/videos.vue"));
  },
  name: 'negocio.video',
  meta: {
    resource: 'preferencias negocio',
    pageTitle: 'Video del negocio',
    action: 'read',
    layout: 'negocio',
    breadcrumb: [{
      text: 'Home',
      to: {
        name: 'negocio.home'
      },
      active: false
    }, {
      text: 'Video del negocio',
      active: true
    }]
  }
},
/***************************************
*    Galerias de Negocio
* *************************************/
{
  path: '/negocio/galerias',
  component: function component() {
    return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_panels_negocio_galeria_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/panels/negocio/galeria.vue */ "./resources/js/calidad/views/panels/negocio/galeria.vue"));
  },
  name: 'negocio.galerias',
  meta: {
    resource: 'galerias negocio',
    pageTitle: 'Galería de Imagenes',
    action: 'read',
    layout: 'negocio',
    breadcrumb: [{
      text: 'Home',
      to: {
        name: 'negocio.home'
      },
      active: false
    }, {
      text: 'Galerías de imagenes',
      active: true
    }]
  }
},
/***************************************
 *    Publicaciones  de Negocio
 * *************************************/
{
  path: '/negocio/publicaciones',
  component: function component() {
    return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_publicaciones_index_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/publicaciones/index.vue */ "./resources/js/calidad/views/publicaciones/index.vue"));
  },
  children: [{
    path: '',
    name: "negocio.publicaciones",
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_publicaciones_list_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/publicaciones/list.vue */ "./resources/js/calidad/views/publicaciones/list.vue"));
    },
    meta: {
      layout: 'negocio',
      resource: 'publicaciones negocio',
      pageTitle: 'Publicaciones',
      action: 'read',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'negocio.home'
        },
        active: false
      }, {
        text: 'Publicaciones',
        active: true
      }]
    }
  }, {
    path: 'create',
    name: "negocio.publicacion.create",
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_publicaciones_create_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/publicaciones/create.vue */ "./resources/js/calidad/views/publicaciones/create.vue"));
    },
    meta: {
      layout: 'negocio',
      resource: 'publicaciones negocio',
      pageTitle: 'Crear Publicación',
      navActiveLink: 'negocio.publicaciones',
      action: 'write',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'negocio.home'
        },
        active: false
      }, {
        text: 'Publicaciones',
        active: false,
        to: {
          name: 'negocio.publicaciones'
        }
      }, {
        text: 'Crear',
        active: true
      }]
    }
  }, {
    path: ':id/edit',
    props: true,
    name: "negocio.publicacion.edit",
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_publicaciones_edit_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/publicaciones/edit.vue */ "./resources/js/calidad/views/publicaciones/edit.vue"));
    },
    meta: {
      layout: 'negocio',
      resource: 'publicaciones negocio',
      pageTitle: 'Editar Publicación',
      navActiveLink: 'negocio.publicaciones',
      action: 'update',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'negocio.home'
        },
        active: false
      }, {
        text: 'Publicaciones',
        active: false,
        to: {
          name: 'negocio.publicaciones'
        }
      }, {
        text: 'Editar',
        active: true
      }]
    }
  }, {
    path: ':id/imagenes',
    props: true,
    name: "negocio.publicacion.imagenes",
    component: function component() {
      return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_publicaciones_imagenes_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/publicaciones/imagenes.vue */ "./resources/js/calidad/views/publicaciones/imagenes.vue"));
    },
    meta: {
      layout: 'negocio',
      resource: 'publicaciones negocio',
      pageTitle: 'Imagenes de Publicación',
      navActiveLink: 'negocio.publicaciones',
      action: 'update',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'negocio.home'
        },
        active: false
      }, {
        text: 'Publicaciones',
        active: false,
        to: {
          name: 'negocio.publicaciones'
        }
      }, {
        text: 'Imagenes',
        active: true
      }]
    }
  }]
},
/***************************************
*    Eventos  de Negocio
* *************************************/

{
  path: '/negocio/eventos',
  component: function component() {
    return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_panels_negocio_eventos_index_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/panels/negocio/eventos/index.vue */ "./resources/js/calidad/views/panels/negocio/eventos/index.vue"));
  },
  children: [{
    path: '',
    name: 'negocio.eventos',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_panels_negocio_eventos_list_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/panels/negocio/eventos/list.vue */ "./resources/js/calidad/views/panels/negocio/eventos/list.vue"));
    },
    meta: {
      resource: "negocio eventos",
      action: 'read',
      layout: 'negocio',
      pageTitle: 'Eventos',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'negocio.home'
        },
        active: false
      }, {
        text: 'Eventos ',
        active: true
      }]
    }
  }, {
    path: 'create',
    name: 'negocio.evento.create',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_panels_negocio_eventos_create_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/panels/negocio/eventos/create.vue */ "./resources/js/calidad/views/panels/negocio/eventos/create.vue"));
    },
    meta: {
      resource: "negocio eventos",
      action: 'write',
      layout: 'negocio',
      pageTitle: 'Crear Evento',
      navActiveLink: 'negocio.eventos',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'negocio.home'
        },
        active: false
      }, {
        text: 'Eventos ',
        active: false,
        to: {
          name: 'negocio.eventos'
        }
      }, {
        text: 'Crear ',
        active: true
      }]
    }
  }, {
    path: ':id/edit',
    name: 'negocio.evento.edit',
    props: true,
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_panels_negocio_eventos_edit_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/panels/negocio/eventos/edit.vue */ "./resources/js/calidad/views/panels/negocio/eventos/edit.vue"));
    },
    meta: {
      resource: "negocio eventos",
      action: 'update',
      layout: 'negocio',
      pageTitle: 'Editar Evento',
      navActiveLink: 'negocio.eventos',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'negocio.home'
        },
        active: false
      }, {
        text: 'Eventos ',
        active: false,
        to: {
          name: 'negocio.eventos'
        }
      }, {
        text: 'Editar ',
        active: true
      }]
    }
  }, {
    path: ':id/imagenes',
    name: 'negocio.evento.imagenes',
    props: true,
    component: function component() {
      return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_eventos_imagenes_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/eventos/imagenes.vue */ "./resources/js/calidad/views/eventos/imagenes.vue"));
    },
    meta: {
      resource: "negocio eventos",
      action: 'update',
      layout: 'negocio',
      pageTitle: 'Imagenes del Evento',
      navActiveLink: 'negocio.eventos',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'negocio.home'
        },
        active: false
      }, {
        text: 'Eventos ',
        active: false,
        to: {
          name: 'negocio.eventos'
        }
      }, {
        text: 'Imagenes',
        active: true
      }]
    }
  }]
},
/***************************************
 *    Cupones  de Negocio
 * *************************************/
{
  path: '/negocios/cupones',
  component: function component() {
    return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_panels_negocio_cupones_index_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/panels/negocio/cupones/index.vue */ "./resources/js/calidad/views/panels/negocio/cupones/index.vue"));
  },
  children: [{
    path: '',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_panels_negocio_cupones_list_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/panels/negocio/cupones/list.vue */ "./resources/js/calidad/views/panels/negocio/cupones/list.vue"));
    },
    name: 'negocio.cupones',
    meta: {
      resource: 'negocio cupones',
      action: 'read',
      pageTitle: 'Cupones',
      layout: 'negocio',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'negocio.home'
        },
        active: false
      }, {
        text: 'Cupones ',
        active: true
      }]
    }
  }, {
    path: 'create',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_panels_negocio_cupones_create_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/panels/negocio/cupones/create.vue */ "./resources/js/calidad/views/panels/negocio/cupones/create.vue"));
    },
    name: 'negocio.cupones.create',
    meta: {
      resource: 'negocio cupones',
      action: 'write',
      pageTitle: 'Crear Cupón',
      layout: 'negocio',
      navActiveLink: 'negocio.cupones',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'negocio.home'
        },
        active: false
      }, {
        text: 'Cupones ',
        active: false,
        to: {
          name: 'negocio.cupones'
        }
      }, {
        text: 'Crear ',
        active: true
      }]
    }
  }, {
    path: ':id/edit',
    props: true,
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_panels_negocio_cupones_edit_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/panels/negocio/cupones/edit.vue */ "./resources/js/calidad/views/panels/negocio/cupones/edit.vue"));
    },
    name: 'negocio.cupon.edit',
    meta: {
      resource: 'negocio cupones',
      action: 'update',
      pageTitle: 'Edit Cupón',
      layout: 'negocio',
      navActiveLink: 'negocio.cupones',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'negocio.home'
        },
        active: false
      }, {
        text: 'Cupones ',
        active: false,
        to: {
          name: 'negocio.cupones'
        }
      }, {
        text: 'Editar ',
        active: true
      }]
    }
  }, {
    path: ':id/reservar/cupon',
    props: true,
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_panels_negocio_cupones_reservar_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/panels/negocio/cupones/reservar.vue */ "./resources/js/calidad/views/panels/negocio/cupones/reservar.vue"));
    },
    name: 'negocio.reservar.cupon',
    meta: {
      resource: 'negocio cupones',
      action: 'read',
      pageTitle: 'Reservar Cupón',
      layout: 'negocio',
      navActiveLink: 'negocio.cupones',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'negocio.home'
        },
        active: false
      }, {
        text: 'Cupones ',
        active: false,
        to: {
          name: 'negocio.cupones'
        }
      }, {
        text: 'Reservar ',
        active: true
      }]
    }
  }]
},
/*********************************************
 *    Horario de reservaciones y reservacion
 * ******************************************/
{
  path: '/negocios/reservaciones/horario',
  component: function component() {
    return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_panels_negocio_reservaciones_horario_index_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/panels/negocio/reservaciones/horario/index.vue */ "./resources/js/calidad/views/panels/negocio/reservaciones/horario/index.vue"));
  },
  children: [{
    path: '',
    name: 'negocio.reservacion.horario',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_panels_negocio_reservaciones_horario_list_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/panels/negocio/reservaciones/horario/list.vue */ "./resources/js/calidad/views/panels/negocio/reservaciones/horario/list.vue"));
    },
    meta: {
      resource: 'negocio reservacion horario',
      action: 'read',
      layout: 'negocio',
      pageTitle: 'Horario de reservaciones',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'negocio.home'
        }
      }, {
        text: 'Horario de reservaciones',
        active: true
      }]
    }
  }]
},
/*********************************************
 *    Reservaciones
 * ******************************************/

{
  path: '/negocios/reservaciones',
  component: function component() {
    return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_panels_negocio_reservaciones_index_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/panels/negocio/reservaciones/index.vue */ "./resources/js/calidad/views/panels/negocio/reservaciones/index.vue"));
  },
  children: [{
    path: '',
    name: 'negocio.reservaciones',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_panels_negocio_reservaciones_list_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/panels/negocio/reservaciones/list.vue */ "./resources/js/calidad/views/panels/negocio/reservaciones/list.vue"));
    },
    meta: {
      resource: 'negocio reservaciones',
      layout: 'negocio',
      action: 'read',
      pageTitle: 'Reservaciones',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'negocio.home'
        },
        active: false
      }, {
        text: 'Reservaciones',
        active: true
      }]
    }
  }, {
    path: 'create',
    name: 'negocio.reservacion.create',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_panels_negocio_reservaciones_create_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/panels/negocio/reservaciones/create.vue */ "./resources/js/calidad/views/panels/negocio/reservaciones/create.vue"));
    },
    meta: {
      resource: 'negocio reservaciones',
      layout: 'negocio',
      action: 'write',
      pageTitle: 'Generar Reservación',
      navActiveLink: 'negocio.reservaciones',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'negocio.home'
        },
        active: false
      }, {
        text: 'Reservaciones',
        active: false,
        to: {
          name: 'negocio.reservaciones'
        }
      }, {
        text: 'Generar Reservación',
        active: true
      }]
    }
  }, {
    path: ':id/edit',
    props: true,
    name: 'negocio.reservacion.edit',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_panels_negocio_reservaciones_edit_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/panels/negocio/reservaciones/edit.vue */ "./resources/js/calidad/views/panels/negocio/reservaciones/edit.vue"));
    },
    meta: {
      resource: 'negocio reservaciones',
      layout: 'negocio',
      action: 'write',
      pageTitle: 'Editar Reservación',
      navActiveLink: 'negocio.reservaciones',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'negocio.home'
        },
        active: false
      }, {
        text: 'Reservaciones',
        active: false,
        to: {
          name: 'negocio.reservaciones'
        }
      }, {
        text: 'Editar Reservación',
        active: true
      }]
    }
  }]
},
/***************************************
 *    Ventas de Negocio
 * *************************************/

{
  path: '/negocios/ventas',
  component: function component() {
    return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_panels_negocio_ventas_index_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/panels/negocio/ventas/index.vue */ "./resources/js/calidad/views/panels/negocio/ventas/index.vue"));
  },
  children: [{
    path: '',
    name: 'negocio.ventas',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_panels_negocio_ventas_list_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/panels/negocio/ventas/list.vue */ "./resources/js/calidad/views/panels/negocio/ventas/list.vue"));
    },
    meta: {
      pageTitle: 'Ventas de Negocio',
      resource: 'ventas negocio',
      action: 'read',
      layout: 'negocio',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'negocio.home'
        },
        active: false
      }, {
        text: 'Historial de venta',
        active: true
      }]
    }
  }, {
    path: 'create/:reserva?',
    props: true,
    name: 'negocio.venta.create',
    component: function component() {
      return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_panels_negocio_ventas_create_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/panels/negocio/ventas/create.vue */ "./resources/js/calidad/views/panels/negocio/ventas/create.vue"));
    },
    meta: {
      pageTitle: 'Registrar Venta',
      resource: 'ventas negocio',
      action: 'write',
      layout: 'negocio',
      breadcrumb: [{
        text: 'Home',
        to: {
          name: 'negocio.home'
        },
        active: false
      }, {
        text: 'Historial de venta',
        active: false
      }, {
        text: 'Generar',
        active: true,
        to: {
          name: 'negocio.ventas'
        }
      }]
    }
  }]
},
/***************************************
 *    Movimientos de Negocio
 * *************************************/
{
  path: '/negocio/movimientos',
  name: 'negocio.movimientos',
  component: function component() {
    return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_panels_negocio_movimientos_vue-_a7ee0")]).then(__webpack_require__.bind(__webpack_require__, /*! views/panels/negocio/movimientos.vue */ "./resources/js/calidad/views/panels/negocio/movimientos.vue"));
  },
  meta: {
    resource: 'movimientos negocio',
    action: 'read',
    layout: 'negocio',
    pageTile: 'Movimientos de Cuenta',
    breadcrumb: [{
      text: 'Home',
      to: {
        name: 'negocio.home'
      },
      active: false
    }, {
      text: 'Movimientos de Cuenta',
      active: true
    }]
  }
},
/***************************************
 *    Menú del Negocio
 * *************************************/

{
  path: '/negocio/menu',
  component: function component() {
    return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_panels_negocio_preferencias_menu_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/panels/negocio/preferencias/menu.vue */ "./resources/js/calidad/views/panels/negocio/preferencias/menu.vue"));
  },
  name: 'negocio.menu',
  meta: {
    resource: 'preferencias negocio',
    action: 'read',
    pageTitle: 'Menú del Negocio',
    layout: 'negocio',
    breadcrumb: [{
      text: 'Home',
      to: {
        name: 'negocio.home'
      },
      active: false
    }, {
      text: 'Menú',
      active: true
    }]
  }
}]);

/***/ }),

/***/ "./resources/js/src/router/routes/pages.js":
/*!*************************************************!*\
  !*** ./resources/js/src/router/routes/pages.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_2__);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([{
  path: '/error-404',
  name: 'error-404',
  component: function component() {
    return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_src_views_error_Error404_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! @/views/error/Error404.vue */ "./resources/js/src/views/error/Error404.vue"));
  },
  meta: {
    layout: 'full',
    resource: 'Auth',
    action: 'read'
  }
}, {
  path: '/login',
  name: 'login',
  component: function component() {
    return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_src_views_pages_authentication_Login_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! @/views/pages/authentication/Login.vue */ "./resources/js/src/views/pages/authentication/Login.vue"));
  },
  meta: {
    layout: 'full',
    resource: 'Auth',
    redirectIfLoggedIn: true
  }
}, {
  path: '/forgot-password',
  name: 'auth-forgot-password',
  component: function component() {
    return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_auth_ForgotPassword_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/auth/ForgotPassword.vue */ "./resources/js/calidad/views/auth/ForgotPassword.vue"));
  },
  meta: {
    layout: 'full',
    resource: 'Auth',
    redirectIfLoggedIn: true
  }
}, {
  path: '/reset-password/:token',
  props: function props(route) {
    return {
      token: route.params.token,
      email: route.query.email
    };
  },
  name: 'auth-reset-password',
  component: function component() {
    return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_auth_PasswordReset_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/auth/PasswordReset.vue */ "./resources/js/calidad/views/auth/PasswordReset.vue"));
  },
  meta: {
    layout: 'full',
    resource: 'Auth'
  }
}, {
  path: '/usuario/:usuario/establecer/contrasena',
  props: true,
  name: 'establecer-contrasena',
  component: function component() {
    return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_auth_EstablecerContrasena_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/auth/EstablecerContrasena.vue */ "./resources/js/calidad/views/auth/EstablecerContrasena.vue"));
  },
  meta: {
    layout: 'full',
    resource: 'Auth'
  }
},
// {
//   path: '/pages/authentication/reset-password-v2',
//   name: 'auth-reset-password-v2',
//   component: () => import('@/views/pages/authentication/ResetPassword-v2.vue'),
//   meta: {
//     layout: 'full',
//   },
// },
{
  path: '/pages/miscellaneous/not-authorized',
  name: 'misc-not-authorized',
  component: function component() {
    return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_src_views_pages_miscellaneous_NotAuthorized_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! @/views/pages/miscellaneous/NotAuthorized.vue */ "./resources/js/src/views/pages/miscellaneous/NotAuthorized.vue"));
  },
  meta: {
    layout: 'full',
    resource: 'Auth'
  }
}
// {
//   path: '/pages/miscellaneous/under-maintenance',
//   name: 'misc-under-maintenance',
//   component: () => import('@/views/pages/miscellaneous/UnderMaintenance.vue'),
//   meta: {
//     layout: 'full',
//   },
// },
// {
//   path: '/pages/miscellaneous/error',
//   name: 'misc-error',
//   component: () => import('@/views/pages/miscellaneous/Error.vue'),
//   meta: {
//     layout: 'full',
//   },
// },
]);

/***/ }),

/***/ "./resources/js/src/router/routes/paginas.js":
/*!***************************************************!*\
  !*** ./resources/js/src/router/routes/paginas.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/store */ "./resources/js/src/store/index.js");





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([{
  path: '/',
  name: 'inicio',
  component: function component() {
    return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_paginas_index_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/paginas/index.vue */ "./resources/js/calidad/views/paginas/index.vue"));
  },
  meta: {
    layout: 'travel',
    resource: 'Auth'
  }
},
//  {
//    path: '/que-es-travel-points',
//    name: 'about',
//    component: () => import('views/paginas/about'),
//    meta: {
//      layout:'travel',
//       resource: 'Auth',
//       pageTitle:'Acerca de Travel Points (about)',
//       breadcrumb:[
//          {
//             text:'Home',
//             to:{name:'inicio'},
//             active:false,
//          },

//          {
//             text:'About',
//             to:{name:'about'},
//             active:true,
//          }

//       ]
//    },

// },

// {
//    path: '/porque-afiliar-mi-negocio',
//    name: 'negocio.about',
//    component: () => import('views/paginas/aboutNegocio'),
//    meta: {
//       layout: 'travel',
//       resource: 'Auth',
//       pageTitle: 'Porque afiliar mi negocio',
//       breadcrumb: [
//          {
//             text: 'Home',
//             to: { name: 'inicio' },
//             active: false,
//          },

//          {
//             text: 'Porque afiliar mi negocio',
//             active: true,
//          }

//       ]
//    },

// },

//  {
//    path: '/politicas-privacidad',
//    name: 'politicas.privacidad',
//    component: () => import('views/paginas/politicas'),
//    meta: {
//       layout: 'travel',
//       resource: 'Auth',
//       pageTitle: 'Políticas de privacidad',
//       breadcrumb: [
//          {
//             text: 'Home',
//             to: { name: 'inicio' },
//             active: false,
//          },

//          {
//             text: 'Políticas',
//             active: true,
//          }

//       ]
//    },

// },

// {
//    path: '/terminos-y-condiciones',
//    name: 'terminos-condiciones',
//    component: () => import('views/paginas/terminosCondiciones'),
//    meta: {
//       layout: 'travel',
//       resource: 'Auth',
//       pageTitle: 'Términos y Condiciones',
//       breadcrumb: [
//          {
//             text: 'Home',
//             to: { name: 'inicio' },
//             active: false,
//          },

//          {
//             text: 'para usuarios Turistas',
//             active: true,
//          }

//       ]
//    },

// },

{
  path: '/search',
  component: function component() {
    return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_paginas_Search_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/paginas/Search.vue */ "./resources/js/calidad/views/paginas/Search.vue"));
  },
  props: function props(route) {
    return {
      query: route.query.q
    };
  },
  name: 'searchResult',
  meta: {
    resource: 'Auth',
    layout: 'travel'
  }
}, {
  path: '/Destinos',
  component: function component() {
    return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_paginas_DestinoPerfil_vue-_58650")]).then(__webpack_require__.bind(__webpack_require__, /*! views/paginas/DestinoPerfil.vue */ "./resources/js/calidad/views/paginas/DestinoPerfil.vue"));
  },
  props: function props(route) {
    return {
      query: route.query.q
    };
  },
  name: 'destino.perfil',
  beforeEnter: function beforeEnter(to, from, next) {
    _store__WEBPACK_IMPORTED_MODULE_4__["default"].dispatch('destino/fetchName', to.query.q).then(function (_ref) {
      var result = _ref.result;
      if (result) {
        next();
      } else {
        next({
          name: 'inicio'
        });
      }
    })["catch"](function (e) {
      console.log(e);
      next({
        name: 'inicio'
      });
    });
  },
  meta: {
    resource: 'Auth',
    layout: 'travel'
  }
},
// Atraccions
{
  path: '/Atraccions',
  component: function component() {
    return Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_calidad_views_paginas_AtraccionPerfil_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! views/paginas/AtraccionPerfil.vue */ "./resources/js/calidad/views/paginas/AtraccionPerfil.vue"));
  },
  props: function props(route) {
    return {
      query: route.query.q
    };
  },
  name: 'atraccion.perfil',
  beforeEnter: function beforeEnter(to, from, next) {
    _store__WEBPACK_IMPORTED_MODULE_4__["default"].dispatch('atraccion/fetchName', to.query.q).then(function (_ref2) {
      var result = _ref2.result;
      if (result) {
        if (to.name !== from.name) {
          next();
        }
      } else {
        next({
          name: 'inicio'
        });
      }
    })["catch"](function (e) {
      console.log(e);
      next({
        name: 'inicio'
      });
    });
  },
  meta: {
    resource: 'Auth',
    layout: 'travel'
  }
},
// Contacto

// {
//    path:'/contacto',
//    component:() => import('views/paginas/contacto.vue'),
//    name:'contacto',
//    meta:{
//       resource:'Auth',
//       action:'read',
//       layout:'travel',
//       // pageTitle:'Contáctanos',
//       // breadcrumb:[
//       //    {text:'Contacto',active:true}
//       // ]
//    }
// },

// Tienda de Regalos

{
  path: "/tienda-travel",
  component: function component() {
    return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_paginas_TiendaTravel_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/paginas/TiendaTravel.vue */ "./resources/js/calidad/views/paginas/TiendaTravel.vue"));
  },
  name: 'tienda.travel',
  meta: {
    resource: 'Auth',
    layout: 'travel',
    pageTitle: 'Tienda de Regalos',
    breadcrumb: [{
      text: 'Listado',
      active: true
    }]
  }
}, {
  path: '/tienda-travel/producto/:id/show',
  component: function component() {
    return __webpack_require__.e(/*! import() */ "resources_js_calidad_views_paginas_PerfilProducto_vue").then(__webpack_require__.bind(__webpack_require__, /*! views/paginas/PerfilProducto.vue */ "./resources/js/calidad/views/paginas/PerfilProducto.vue"));
  },
  props: true,
  name: 'tienda.travel.show.producto',
  meta: {
    resource: 'Auth',
    layout: 'travel',
    pageTitle: 'Producto',
    breadcrumb: [{
      text: 'Listado',
      active: false,
      to: {
        name: 'tienda.travel'
      }
    }, {
      text: 'Perfil',
      active: true
    }]
  }
}]);

/***/ }),

/***/ "./resources/js/src/store/app-config/index.js":
/*!****************************************************!*\
  !*** ./resources/js/src/store/app-config/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_string_match_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.string.match.js */ "./node_modules/core-js/modules/es.string.match.js");
/* harmony import */ var core_js_modules_es_string_match_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_match_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.object.keys.js */ "./node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _themeConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @themeConfig */ "./resources/js/themeConfig.js");




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: {
    layout: {
      isRTL: _themeConfig__WEBPACK_IMPORTED_MODULE_3__.$themeConfig.layout.isRTL,
      skin: localStorage.getItem('vuexy-skin') || _themeConfig__WEBPACK_IMPORTED_MODULE_3__.$themeConfig.layout.skin,
      routerTransition: localStorage.getItem('transition') || _themeConfig__WEBPACK_IMPORTED_MODULE_3__.$themeConfig.layout.routerTransition,
      type: localStorage.getItem('layout_type') || _themeConfig__WEBPACK_IMPORTED_MODULE_3__.$themeConfig.layout.type,
      contentWidth: _themeConfig__WEBPACK_IMPORTED_MODULE_3__.$themeConfig.layout.contentWidth,
      menu: {
        hidden: _themeConfig__WEBPACK_IMPORTED_MODULE_3__.$themeConfig.layout.menu.hidden
      },
      navbar: {
        type: localStorage.getItem('navbar_type') || _themeConfig__WEBPACK_IMPORTED_MODULE_3__.$themeConfig.layout.navbar.type,
        backgroundColor: localStorage.getItem('navbar_color') || _themeConfig__WEBPACK_IMPORTED_MODULE_3__.$themeConfig.layout.navbar.backgroundColor
      },
      footer: {
        type: localStorage.getItem('footer_type') || _themeConfig__WEBPACK_IMPORTED_MODULE_3__.$themeConfig.layout.footer.type
      }
    }
  },
  getters: {},
  mutations: {
    TOGGLE_RTL: function TOGGLE_RTL(state) {
      state.layout.isRTL = !state.layout.isRTL;
      document.documentElement.setAttribute('dir', state.layout.isRTL ? 'rtl' : 'ltr');
    },
    UPDATE_SKIN: function UPDATE_SKIN(state, skin) {
      state.layout.skin = skin;

      // Update value in localStorage
      localStorage.setItem('vuexy-skin', skin);

      // Update DOM for dark-layout
      if (skin === 'dark') document.body.classList.add('dark-layout');else if (document.body.className.match('dark-layout')) document.body.classList.remove('dark-layout');
    },
    UPDATE_ROUTER_TRANSITION: function UPDATE_ROUTER_TRANSITION(state, val) {
      state.layout.routerTransition = val;
      localStorage.setItem('transition', val);
    },
    UPDATE_LAYOUT_TYPE: function UPDATE_LAYOUT_TYPE(state, val) {
      state.layout.type = val;
      localStorage.setItem('layout_type', val);
    },
    UPDATE_CONTENT_WIDTH: function UPDATE_CONTENT_WIDTH(state, val) {
      state.layout.contentWidth = val;
    },
    UPDATE_NAV_MENU_HIDDEN: function UPDATE_NAV_MENU_HIDDEN(state, val) {
      state.layout.menu.hidden = val;

      // localStorage.setItem('menu_hidden', val)
    },
    UPDATE_NAVBAR_CONFIG: function UPDATE_NAVBAR_CONFIG(state, obj) {
      Object.assign(state.layout.navbar, obj);
      var k = Object.keys(obj)[0];
      if (k == 'backgroundColor') {
        localStorage.setItem('navbar_color', obj.backgroundColor);
      }
      if (k == 'type') {
        localStorage.setItem('navbar_type', obj.type);
      }
    },
    UPDATE_FOOTER_CONFIG: function UPDATE_FOOTER_CONFIG(state, obj) {
      Object.assign(state.layout.footer, obj);
      if (obj.type) {
        localStorage.setItem('footer_type', obj.type);
      }
    }
  },
  actions: {}
});

/***/ }),

/***/ "./resources/js/src/store/app/index.js":
/*!*********************************************!*\
  !*** ./resources/js/src/store/app/index.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _themeConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @themeConfig */ "./resources/js/themeConfig.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: {
    windowWidth: 0,
    shallShowOverlay: false,
    version: String(localStorage.getItem('version-app')) | null,
    showComposeEmail: false
  },
  getters: {
    currentBreakPoint: function currentBreakPoint(state) {
      var windowWidth = state.windowWidth;
      if (windowWidth >= _themeConfig__WEBPACK_IMPORTED_MODULE_0__.$themeBreakpoints.xl) return 'xl';
      if (windowWidth >= _themeConfig__WEBPACK_IMPORTED_MODULE_0__.$themeBreakpoints.lg) return 'lg';
      if (windowWidth >= _themeConfig__WEBPACK_IMPORTED_MODULE_0__.$themeBreakpoints.md) return 'md';
      if (windowWidth >= _themeConfig__WEBPACK_IMPORTED_MODULE_0__.$themeBreakpoints.sm) return 'sm';
      return 'xs';
    }
  },
  mutations: {
    UPDATE_WINDOW_WIDTH: function UPDATE_WINDOW_WIDTH(state, val) {
      state.windowWidth = val;
    },
    TOGGLE_OVERLAY: function TOGGLE_OVERLAY(state, val) {
      state.shallShowOverlay = val !== undefined ? val : !state.shallShowOverlay;
    },
    setVersion: function setVersion(state, version) {
      localStorage.setItem('version-app', version);
      state.version = version;
    },
    toggleShowComposeEmail: function toggleShowComposeEmail(state) {
      state.showComposeEmail = !state.showComposeEmail;
    }
  },
  actions: {}
});

/***/ }),

/***/ "./resources/js/src/store/index.js":
/*!*****************************************!*\
  !*** ./resources/js/src/store/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js */ "./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js");
/* harmony import */ var _home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.common.js");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_55___default = /*#__PURE__*/__webpack_require__.n(vuex__WEBPACK_IMPORTED_MODULE_55__);
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app */ "./resources/js/src/store/app/index.js");
/* harmony import */ var _app_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app-config */ "./resources/js/src/store/app-config/index.js");
/* harmony import */ var _vertical_menu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./vertical-menu */ "./resources/js/src/store/vertical-menu/index.js");
/* harmony import */ var _modules_usuario__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/usuario */ "./resources/js/src/store/modules/usuario.js");
/* harmony import */ var _modules_configuracion_rol_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/configuracion/rol.js */ "./resources/js/src/store/modules/configuracion/rol.js");
/* harmony import */ var _modules_configuracion_permiso_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./modules/configuracion/permiso.js */ "./resources/js/src/store/modules/configuracion/permiso.js");
/* harmony import */ var _modules_notificaciones_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./modules/notificaciones.js */ "./resources/js/src/store/modules/notificaciones.js");
/* harmony import */ var _modules_tableros_AdminTablero_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./modules/tableros/AdminTablero.js */ "./resources/js/src/store/modules/tableros/AdminTablero.js");
/* harmony import */ var _modules_tableros_UserTablero_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./modules/tableros/UserTablero.js */ "./resources/js/src/store/modules/tableros/UserTablero.js");
/* harmony import */ var _modules_dashboard_dashboard_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./modules/dashboard/dashboard.js */ "./resources/js/src/store/modules/dashboard/dashboard.js");
/* harmony import */ var _modules_faqs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./modules/faqs */ "./resources/js/src/store/modules/faqs/index.js");
/* harmony import */ var _modules_negocios_categorias__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./modules/negocios/categorias */ "./resources/js/src/store/modules/negocios/categorias/index.js");
/* harmony import */ var _modules_negocios_solicitudes__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./modules/negocios/solicitudes */ "./resources/js/src/store/modules/negocios/solicitudes/index.js");
/* harmony import */ var _modules_divisas__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./modules/divisas */ "./resources/js/src/store/modules/divisas/index.js");
/* harmony import */ var _modules_cuentas_movimientos_cuenta__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./modules/cuentas_movimientos/cuenta */ "./resources/js/src/store/modules/cuentas_movimientos/cuenta.js");
/* harmony import */ var _modules_cuentas_movimientos_movimiento__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./modules/cuentas_movimientos/movimiento */ "./resources/js/src/store/modules/cuentas_movimientos/movimiento.js");
/* harmony import */ var _modules_iatas_iata_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./modules/iatas/iata.js */ "./resources/js/src/store/modules/iatas/iata.js");
/* harmony import */ var _modules_destinos_destino_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./modules/destinos/destino.js */ "./resources/js/src/store/modules/destinos/destino.js");
/* harmony import */ var _modules_destinos_atracciones_atraccion_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./modules/destinos/atracciones/atraccion.js */ "./resources/js/src/store/modules/destinos/atracciones/atraccion.js");
/* harmony import */ var _modules_eventos_evento_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./modules/eventos/evento.js */ "./resources/js/src/store/modules/eventos/evento.js");
/* harmony import */ var _modules_negocios_index_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./modules/negocios/index.js */ "./resources/js/src/store/modules/negocios/index.js");
/* harmony import */ var _modules_opinions_opinion_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./modules/opinions/opinion.js */ "./resources/js/src/store/modules/opinions/opinion.js");
/* harmony import */ var _modules_panel_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./modules/panel.js */ "./resources/js/src/store/modules/panel.js");
/* harmony import */ var _modules_negocio_cargo_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./modules/negocio/cargo.js */ "./resources/js/src/store/modules/negocio/cargo.js");
/* harmony import */ var _modules_negocio_empleado_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./modules/negocio/empleado.js */ "./resources/js/src/store/modules/negocio/empleado.js");
/* harmony import */ var _modules_amenidad_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./modules/amenidad.js */ "./resources/js/src/store/modules/amenidad.js");
/* harmony import */ var _modules_formasPago_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./modules/formasPago.js */ "./resources/js/src/store/modules/formasPago.js");
/* harmony import */ var _modules_publicacion_js__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./modules/publicacion.js */ "./resources/js/src/store/modules/publicacion.js");
/* harmony import */ var _modules_cupones_js__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./modules/cupones.js */ "./resources/js/src/store/modules/cupones.js");
/* harmony import */ var _modules_venta_js__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./modules/venta.js */ "./resources/js/src/store/modules/venta.js");
/* harmony import */ var _modules_negocios_horarioReservacion_horario_js__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./modules/negocios/horarioReservacion/horario.js */ "./resources/js/src/store/modules/negocios/horarioReservacion/horario.js");
/* harmony import */ var _modules_negocios_reservacion_js__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./modules/negocios/reservacion.js */ "./resources/js/src/store/modules/negocios/reservacion.js");
/* harmony import */ var _modules_sistema_js__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./modules/sistema.js */ "./resources/js/src/store/modules/sistema.js");
/* harmony import */ var _modules_tienda_categoriaProducto_js__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./modules/tienda/categoriaProducto.js */ "./resources/js/src/store/modules/tienda/categoriaProducto.js");
/* harmony import */ var _modules_tienda_tienda_js__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./modules/tienda/tienda.js */ "./resources/js/src/store/modules/tienda/tienda.js");
/* harmony import */ var _modules_tienda_producto_js__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./modules/tienda/producto.js */ "./resources/js/src/store/modules/tienda/producto.js");
/* harmony import */ var _modules_tienda_consumo_js__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./modules/tienda/consumo.js */ "./resources/js/src/store/modules/tienda/consumo.js");
/* harmony import */ var _modules_tienda_carrito_js__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./modules/tienda/carrito.js */ "./resources/js/src/store/modules/tienda/carrito.js");
/* harmony import */ var _modules_sucursal_js__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./modules/sucursal.js */ "./resources/js/src/store/modules/sucursal.js");
/* harmony import */ var _modules_comision_js__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./modules/comision.js */ "./resources/js/src/store/modules/comision.js");
/* harmony import */ var _modules_datosPago_js__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./modules/datosPago.js */ "./resources/js/src/store/modules/datosPago.js");
/* harmony import */ var _modules_retiro_js__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./modules/retiro.js */ "./resources/js/src/store/modules/retiro.js");
/* harmony import */ var _modules_pais_js__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./modules/pais.js */ "./resources/js/src/store/modules/pais.js");
/* harmony import */ var _modules_estado_js__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./modules/estado.js */ "./resources/js/src/store/modules/estado.js");
/* harmony import */ var _modules_ciudad_js__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./modules/ciudad.js */ "./resources/js/src/store/modules/ciudad.js");
/* harmony import */ var _modules_academiaVideos_js__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./modules/academiaVideos.js */ "./resources/js/src/store/modules/academiaVideos.js");
/* harmony import */ var _modules_pagina_js__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./modules/pagina.js */ "./resources/js/src/store/modules/pagina.js");
/* harmony import */ var _modules_lote_js__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./modules/lote.js */ "./resources/js/src/store/modules/lote.js");
/* harmony import */ var _modules_tarjeta_js__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./modules/tarjeta.js */ "./resources/js/src/store/modules/tarjeta.js");
/* harmony import */ var _modules_vonage_js__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./modules/vonage.js */ "./resources/js/src/store/modules/vonage.js");
/* provided dependency */ var process = __webpack_require__(/*! process/browser.js */ "./node_modules/process/browser.js");







// Modules




// Import Modulos




// 


// Tableros 





// Preguntas Frecuentes



// categoria de Negocios



// Solicitud de afiliacion de negocio



// Divisas



// Cuentas y Movimientos 




// iata



// destino



// atracciones



// Evento



// Negocio



// Opinion



// Paneles 



// Cargos



// Empledos 



// Amenidads 



// Formas de Pago



// Publicaciones



// cupones



// venta 


// HorarioReservacion


// Reservacions



// sistema 


// categoria



// Tienda


// Producto


// Consumo



// carrito Compra



// Sucursales


// Comisiones



// Datos Pago 


// Retiros 



// Pais , Estados y Municipios





// Academias


// Pagina



// Lote de Tarjetas


// Tarjeta  


// vonage

vue__WEBPACK_IMPORTED_MODULE_54__["default"].use((vuex__WEBPACK_IMPORTED_MODULE_55___default()));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new (vuex__WEBPACK_IMPORTED_MODULE_55___default().Store)({
  state: {
    errors: {},
    loading: false,
    token: null,
    canales: [],
    auth: {
      message: null
    }
  },
  mutations: {
    cerrarApp: function cerrarApp(state) {
      state.usuario = null;
    },
    toggleLoading: function toggleLoading(state) {
      var bol = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      state.loading = bol != null ? bol : !state.loading;
    },
    setError: function setError(state, data) {
      if (typeof data === 'string') {
        state.errors.message = data;
      } else {
        state.errors = data;
      }
    },
    clearErrors: function clearErrors(state) {
      state.errors = {
        carta: {}
      };
    },
    setAuthMessage: function setAuthMessage(state, data) {
      state.auth.message = data;
    },
    setToken: function setToken(state, token) {
      state.token = token;
    },
    pushCanal: function pushCanal(state, canal) {
      state.canales.push(canal);
    }
  },
  actions: {
    cerrarSesion: function cerrarSesion(_ref) {
      return (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/(0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee() {
        var state, commit;
        return (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              state = _ref.state, commit = _ref.commit;
              _context.next = 3;
              return axios.get('/api/auth/logout', null, {
                headers: {
                  'WWW-Authenticate': 'Bearer',
                  'Authorization': state.token ? state.token : localStorage.getItem('accessToken')
                }
              });
            case 3:
              return _context.abrupt("return", _context.sent);
            case 4:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    },
    searchPublic: function searchPublic(_ref2, _ref3) {
      var commit = _ref2.commit;
      var query = _ref3.query,
        destino = _ref3.destino;
      return new Promise(function (resolve, reject) {
        axios.post("/api/search/public", {
          q: query,
          destino: destino
        }).then(function (_ref4) {
          var data = _ref4.data;
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    searchLocation: function searchLocation(_ref5, location) {
      var commit = _ref5.commit;
      return new Promise(function (resolve, reject) {
        axios.post("/api/search/location", location).then(function (_ref6) {
          var data = _ref6.data;
          return resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    getPermisosPorPanel: function getPermisosPorPanel(_ref7, panel) {
      var commit = _ref7.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/panels/".concat(panel, "/get/permisos")).then(function (_ref8) {
          var data = _ref8.data;
          return resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    }
  },
  modules: {
    app: _app__WEBPACK_IMPORTED_MODULE_4__["default"],
    appConfig: _app_config__WEBPACK_IMPORTED_MODULE_5__["default"],
    verticalMenu: _vertical_menu__WEBPACK_IMPORTED_MODULE_6__["default"],
    usuario: _modules_usuario__WEBPACK_IMPORTED_MODULE_7__["default"],
    rol: _modules_configuracion_rol_js__WEBPACK_IMPORTED_MODULE_8__["default"],
    notificacion: _modules_notificaciones_js__WEBPACK_IMPORTED_MODULE_10__["default"],
    permiso: _modules_configuracion_permiso_js__WEBPACK_IMPORTED_MODULE_9__["default"],
    'user-tablero': _modules_tableros_UserTablero_js__WEBPACK_IMPORTED_MODULE_12__["default"],
    dashboard: _modules_dashboard_dashboard_js__WEBPACK_IMPORTED_MODULE_13__["default"],
    faq: _modules_faqs__WEBPACK_IMPORTED_MODULE_14__["default"],
    categoriaNegocio: _modules_negocios_categorias__WEBPACK_IMPORTED_MODULE_15__["default"],
    solicitud: _modules_negocios_solicitudes__WEBPACK_IMPORTED_MODULE_16__["default"],
    divisa: _modules_divisas__WEBPACK_IMPORTED_MODULE_17__["default"],
    cuenta: _modules_cuentas_movimientos_cuenta__WEBPACK_IMPORTED_MODULE_18__["default"],
    movimiento: _modules_cuentas_movimientos_movimiento__WEBPACK_IMPORTED_MODULE_19__["default"],
    iata: _modules_iatas_iata_js__WEBPACK_IMPORTED_MODULE_20__["default"],
    destino: _modules_destinos_destino_js__WEBPACK_IMPORTED_MODULE_21__["default"],
    atraccion: _modules_destinos_atracciones_atraccion_js__WEBPACK_IMPORTED_MODULE_22__["default"],
    evento: _modules_eventos_evento_js__WEBPACK_IMPORTED_MODULE_23__["default"],
    negocio: _modules_negocios_index_js__WEBPACK_IMPORTED_MODULE_24__["default"],
    opinion: _modules_opinions_opinion_js__WEBPACK_IMPORTED_MODULE_25__["default"],
    panel: _modules_panel_js__WEBPACK_IMPORTED_MODULE_26__["default"],
    cargo: _modules_negocio_cargo_js__WEBPACK_IMPORTED_MODULE_27__["default"],
    empleado: _modules_negocio_empleado_js__WEBPACK_IMPORTED_MODULE_28__["default"],
    amenidad: _modules_amenidad_js__WEBPACK_IMPORTED_MODULE_29__["default"],
    formasPago: _modules_formasPago_js__WEBPACK_IMPORTED_MODULE_30__["default"],
    publicacion: _modules_publicacion_js__WEBPACK_IMPORTED_MODULE_31__["default"],
    cupones: _modules_cupones_js__WEBPACK_IMPORTED_MODULE_32__["default"],
    venta: _modules_venta_js__WEBPACK_IMPORTED_MODULE_33__["default"],
    horarioReservacion: _modules_negocios_horarioReservacion_horario_js__WEBPACK_IMPORTED_MODULE_34__["default"],
    reservacion: _modules_negocios_reservacion_js__WEBPACK_IMPORTED_MODULE_35__["default"],
    sistema: _modules_sistema_js__WEBPACK_IMPORTED_MODULE_36__["default"],
    categoriaProducto: _modules_tienda_categoriaProducto_js__WEBPACK_IMPORTED_MODULE_37__["default"],
    tienda: _modules_tienda_tienda_js__WEBPACK_IMPORTED_MODULE_38__["default"],
    producto: _modules_tienda_producto_js__WEBPACK_IMPORTED_MODULE_39__["default"],
    consumo: _modules_tienda_consumo_js__WEBPACK_IMPORTED_MODULE_40__["default"],
    carrito: _modules_tienda_carrito_js__WEBPACK_IMPORTED_MODULE_41__["default"],
    sucursal: _modules_sucursal_js__WEBPACK_IMPORTED_MODULE_42__["default"],
    comision: _modules_comision_js__WEBPACK_IMPORTED_MODULE_43__["default"],
    datosPago: _modules_datosPago_js__WEBPACK_IMPORTED_MODULE_44__["default"],
    retiro: _modules_retiro_js__WEBPACK_IMPORTED_MODULE_45__["default"],
    pais: _modules_pais_js__WEBPACK_IMPORTED_MODULE_46__["default"],
    estado: _modules_estado_js__WEBPACK_IMPORTED_MODULE_47__["default"],
    ciudad: _modules_ciudad_js__WEBPACK_IMPORTED_MODULE_48__["default"],
    academiaVideos: _modules_academiaVideos_js__WEBPACK_IMPORTED_MODULE_49__["default"],
    pagina: _modules_pagina_js__WEBPACK_IMPORTED_MODULE_50__["default"],
    lote: _modules_lote_js__WEBPACK_IMPORTED_MODULE_51__["default"],
    tarjeta: _modules_tarjeta_js__WEBPACK_IMPORTED_MODULE_52__["default"],
    vonage: _modules_vonage_js__WEBPACK_IMPORTED_MODULE_53__["default"]
  },
  strict: process.env.DEV
}));

/***/ }),

/***/ "./resources/js/src/store/modules/academiaVideos.js":
/*!**********************************************************!*\
  !*** ./resources/js/src/store/modules/academiaVideos.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.find-index.js */ "./node_modules/core-js/modules/es.array.find-index.js");
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_3__);




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: function state() {
    return {
      video: {
        id: null,
        titulo: '',
        descripcion: null,
        roles: [],
        videos: []
      },
      videos: []
    };
  },
  getters: {
    draft: function draft(state) {
      return clone(state.video);
    }
  },
  mutations: {
    clear: function clear(state) {
      state.video = {
        id: null,
        titulo: '',
        descripcion: null,
        roles: [],
        videos: []
      };
    },
    setVideo: function setVideo(state, video) {
      if (video) {
        state.video = video;
      }
    },
    setVideos: function setVideos(state, videos) {
      state.videos = videos;
    },
    push: function push(state, video) {
      state.videos.push(video);
    },
    put: function put(state, video_id) {
      var i = state.videos.findIndex(function (val) {
        return val.id == video_id;
      });
      if (i != -1) {
        state.videos.splice(i, 1);
      }
    },
    update: function update(state, video) {
      var i = state.videos.findIndex(function (val) {
        return val.id == video.id;
      });
      if (i != -1) {
        state.videos[i] = video;
      }
      if (state.video.id === video.id) {
        state.video = video;
      }
    },
    capturar: function capturar(state, id_video) {
      var i = state.videos.findIndex(function (val) {
        return val.id == id_video;
      });
      if (i != -1) {
        state.video = state.videos[i];
      }
    }
  },
  actions: {
    fetchData: function fetchData(_ref, filtro) {
      var commit = _ref.commit;
      return new Promise(function (resolve, reject) {
        axios.post("/api/academias/videos/fetch-data", filtro).then(function (_ref2) {
          var data = _ref2.data;
          commit('setVideos', data.videos);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    guardar: function guardar(_ref3, datos) {
      var state = _ref3.state,
        commit = _ref3.commit;
      return new Promise(function (resolve, reject) {
        if (datos.id) {
          axios.put("/api/academia-videos/".concat(datos.id), datos).then(function (_ref4) {
            var data = _ref4.data;
            if (data.result) {
              commit('update', data.video);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        } else {
          axios.post("/api/academia-videos", datos).then(function (_ref5) {
            var data = _ref5.data;
            commit('push', data.video);
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        }
      });
    },
    fetch: function fetch(_ref6, id_video) {
      var commit = _ref6.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/academia-videos/".concat(id_video, "/fetch-data")).then(function (_ref7) {
          var data = _ref7.data;
          commit('setVideo', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    eliminar: function eliminar(_ref8, video_id) {
      var state = _ref8.state,
        commit = _ref8.commit;
      return new Promise(function (resolve, reject) {
        axios["delete"]("/api/academia-videos/".concat(video_id)).then(function (_ref9) {
          var data = _ref9.data;
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    cargarVideosNegocio: function cargarVideosNegocio(_ref10) {
      var state = _ref10.state,
        commit = _ref10.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/academia-videos/get/panel/negocio").then(function (_ref11) {
          var data = _ref11.data;
          return resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/src/store/modules/amenidad.js":
/*!****************************************************!*\
  !*** ./resources/js/src/store/modules/amenidad.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.find-index.js */ "./node_modules/core-js/modules/es.array.find-index.js");
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_4__);





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: function state() {
    return {
      amenidad: {
        id: null,
        nombre: '',
        negocios: []
      },
      amenidades: []
    };
  },
  getters: {
    draft: function draft(state) {
      return clone(state.amenidad);
    }
  },
  mutations: {
    clear: function clear(state) {
      state.amenidad = {
        id: null,
        nombre: '',
        negocios: []
      };
    },
    setAmenidades: function setAmenidades(state, amenidades) {
      state.amenidades = amenidades;
    },
    setAmenidad: function setAmenidad(state, amenidad) {
      state.amenidad = amenidad;
    },
    capturar: function capturar(state, amenidad_id) {
      var amenidad = state.amenidades.find(function (val) {
        return val.id === amenidad_id;
      });
      if (amenidad) {
        state.amenidad = amenidad;
      }
    },
    push: function push(state, amenidad) {
      state.amenidades.push(amenidad);
    },
    put: function put(state, amenidad_id) {
      state.amenidades.splice(state.amenidades.findIndex(function (val) {
        return val.id === amenidad_id;
      }), 1);
    },
    update: function update(state, amenidad) {
      var i = state.amenidades.findIndex(function (val) {
        return val.id === amenidad.id;
      });
      if (i != -1) {
        state.amenidades[i] = amenidad;
        if (state.amenidad == amenidad.id) {
          state.amenidad = amenidad;
        }
      }
    }
  },
  actions: {
    getAmenidades: function getAmenidades(_ref) {
      var commit = _ref.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/amenidads/get/all").then(function (_ref2) {
          var data = _ref2.data;
          commit('setAmenidades', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetchData: function fetchData(_ref3, data) {
      var commit = _ref3.commit;
      return new Promise(function (resolve, reject) {
        axios.post('/api/amenidads/fetch/data', data).then(function (_ref4) {
          var datos = _ref4.data;
          commit('setAmenidades', datos.amenidades);
          resolve(datos);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    guardar: function guardar(_ref5, datos) {
      var commit = _ref5.commit;
      return new Promise(function (resolve, reject) {
        if (datos.id) {
          axios.put("/api/amenidads/".concat(datos.id), datos).then(function (_ref6) {
            var data = _ref6.data;
            if (data.result) {
              commit('update', data.amenidad);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        } else {
          axios.post("/api/amenidads", datos).then(function (_ref7) {
            var data = _ref7.data;
            if (data.result) {
              commit('push', data.amenidad);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        }
      });
    },
    eliminar: function eliminar(_ref8, amenidad_id) {
      var commit = _ref8.commit;
      return new Promise(function (resolve, reject) {
        axios["delete"]("/api/amenidads/".concat(amenidad_id)).then(function (_ref9) {
          var data = _ref9.data;
          if (data.result) {
            commit('put', amenidad_id);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetch: function fetch(_ref10, amenidad_id) {
      var commit = _ref10.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/amenidads/".concat(amenidad_id, "/fetch/data")).then(function (_ref11) {
          var data = _ref11.data;
          commit('setAmenidad', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/src/store/modules/ciudad.js":
/*!**************************************************!*\
  !*** ./resources/js/src/store/modules/ciudad.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.find-index.js */ "./node_modules/core-js/modules/es.array.find-index.js");
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_4__);





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: function state() {
    return {
      ciudad: {
        id: null,
        ciudad: '',
        estado_id: null,
        estado: null
      },
      ciudades: []
    };
  },
  getters: {
    draft: function draft(state) {
      return clone(state.ciudad);
    }
  },
  mutations: {
    clear: function clear(state) {
      state.ciudad = {
        id: null,
        ciudad: '',
        estado_id: null,
        estado: null
      };
    },
    setCiudad: function setCiudad(state, ciudad) {
      if (ciudad) {
        state.ciudad = ciudad;
      }
    },
    capturar: function capturar(state, ciudad_id) {
      var ciudad = state.ciudades.find(function (val) {
        return val.id === ciudad_id;
      });
      if (ciudad != undefined) {
        state.ciudad = ciudad;
      }
    },
    update: function update(state, data) {
      if (data) {
        var i = state.ciudades.findIndex(function (val) {
          return val.id === data.id;
        });
        if (i != -1) {
          state.ciudades[i] = data;
          if (state.ciudad.id == data.id) {
            state.ciudad = data;
          }
        }
      }
    },
    put: function put(state, ciudad_id) {
      state.ciudades.splice(state.ciudades.findIndex(function (val) {
        return val.id === ciudad_id;
      }), 1);
    },
    push: function push(state, ciudad) {
      state.ciudades.push(ciudad);
    },
    setCiudades: function setCiudades(state, ciudades) {
      state.ciudades = ciudades;
    }
  },
  actions: {
    getCiudades: function getCiudades(_ref) {
      var commit = _ref.commit;
      axios.get("/api/get/ciudades").then(function (_ref2) {
        var data = _ref2.data;
        commit('setCiudades', data);
      })["catch"](function (e) {
        return console.log(e);
      });
    },
    fetchData: function fetchData(_ref3, data) {
      var commit = _ref3.commit;
      return new Promise(function (resolve, reject) {
        axios.post('/api/fetch/ciudades', data).then(function (_ref4) {
          var datos = _ref4.data;
          commit('setCiudades', datos.ciudades);
          resolve(datos);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    guardar: function guardar(_ref5, datos) {
      var commit = _ref5.commit;
      return new Promise(function (resolve, reject) {
        if (datos.id) {
          axios.put("/api/ciudads/".concat(datos.id), datos).then(function (_ref6) {
            var data = _ref6.data;
            if (data.result) {
              commit('update', data.ciudad);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        } else {
          axios.post("/api/ciudads", datos).then(function (_ref7) {
            var data = _ref7.data;
            if (data.result) {
              commit('push', data.ciudad);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        }
      });
    },
    eliminar: function eliminar(_ref8, ciudad_id) {
      var commit = _ref8.commit;
      return new Promise(function (resolve, reject) {
        axios["delete"]("/api/ciudads/".concat(ciudad_id)).then(function (_ref9) {
          var data = _ref9.data;
          if (data.result) {
            commit('put', ciudad_id);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetchCiudad: function fetchCiudad(_ref10, ciudad_id) {
      var commit = _ref10.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/fetch/ciudad/".concat(ciudad_id)).then(function (_ref11) {
          var data = _ref11.data;
          commit('setCiudad', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/src/store/modules/comision.js":
/*!****************************************************!*\
  !*** ./resources/js/src/store/modules/comision.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_reduce_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.reduce.js */ "./node_modules/core-js/modules/es.array.reduce.js");
/* harmony import */ var core_js_modules_es_array_reduce_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_reduce_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.find-index.js */ "./node_modules/core-js/modules/es.array.find-index.js");
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_5__);






/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: function state() {
    return {
      comision: {
        id: null,
        rol_id: null,
        comision: 0,
        rol: null
      },
      comisiones: []
    };
  },
  getters: {
    porcentajeLibre: function porcentajeLibre(state) {
      return 100 - state.comisiones.reduce(function (acumulador, b) {
        return acumulador + b.comision;
      }, 0);
    }
  },
  mutations: {
    clear: function clear(state) {
      state.comision = {
        id: null,
        rol_id: null,
        comision: 0,
        rol: null
      };
    },
    setComisiones: function setComisiones(state, comisiones) {
      state.comisiones = comisiones;
    },
    setComision: function setComision(state, comision) {
      state.comision = comision;
    },
    capturar: function capturar(state, comision_id) {
      var comision = state.comisiones.find(function (val) {
        return val.id === comision_id;
      });
      if (comision) {
        state.comision = comision;
      }
    },
    push: function push(state, comision) {
      state.comisiones.push(comision);
    },
    put: function put(state, comision_id) {
      state.comisiones.splice(state.comisiones.findIndex(function (val) {
        return val.id === comision_id;
      }), 1);
    },
    update: function update(state, comision) {
      var i = state.comisiones.findIndex(function (val) {
        return val.id === comision.id;
      });
      if (i != -1) {
        state.comisiones[i] = comision;
      }
      if (state.comision == comision.id) {
        state.comision = comision;
      }
    }
  },
  actions: {
    getComisiones: function getComisiones(_ref) {
      var commit = _ref.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/comisions/get/all").then(function (_ref2) {
          var data = _ref2.data;
          commit('setComisiones', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetchData: function fetchData(_ref3, data) {
      var commit = _ref3.commit;
      return new Promise(function (resolve, reject) {
        axios.post('/api/comisions/fetch/data', data).then(function (_ref4) {
          var datos = _ref4.data;
          commit('setComisiones', datos.comisiones);
          resolve(datos);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    guardar: function guardar(_ref5, datos) {
      var commit = _ref5.commit;
      return new Promise(function (resolve, reject) {
        if (datos.id) {
          axios.put("/api/comisions/".concat(datos.id), datos).then(function (_ref6) {
            var data = _ref6.data;
            if (data.result) {
              commit('update', data.comision);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        } else {
          axios.post("/api/comisions", datos).then(function (_ref7) {
            var data = _ref7.data;
            if (data.result) {
              commit('push', data.comision);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        }
      });
    },
    eliminar: function eliminar(_ref8, comision_id) {
      var commit = _ref8.commit;
      return new Promise(function (resolve, reject) {
        axios["delete"]("/api/comisions/".concat(comision_id)).then(function (_ref9) {
          var data = _ref9.data;
          if (data.result) {
            commit('put', comision_id);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetch: function fetch(_ref10, comision_id) {
      var commit = _ref10.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/comisions/".concat(comision_id, "/fetch/data")).then(function (_ref11) {
          var data = _ref11.data;
          commit('setComision', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/src/store/modules/configuracion/permiso.js":
/*!*****************************************************************!*\
  !*** ./resources/js/src/store/modules/configuracion/permiso.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js */ "./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js");
/* harmony import */ var _home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.find-index.js */ "./node_modules/core-js/modules/es.array.find-index.js");
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.array.for-each.js */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.array.map.js */ "./node_modules/core-js/modules/es.array.map.js");
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.object.keys.js */ "./node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_11__);












/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: function state() {
    return {
      permiso: {
        id: null,
        nombre: '',
        panel_id: null,
        panel: null
      },
      permisos: []
    };
  },
  mutations: {
    setPermiso: function setPermiso(state, permiso) {
      state.permiso = permiso;
    },
    setPermisos: function setPermisos(state, permisos) {
      state.permisos = permisos;
    },
    clearPermiso: function clearPermiso(state) {
      state.permiso = {
        id: null,
        nombre: '',
        panel_id: null,
        panel: null
      };
    },
    capturarPermiso: function capturarPermiso(state, id_permiso) {
      state.permiso = state.permisos.find(function (permiso) {
        return permiso.id === id_permiso;
      });
    },
    putPermiso: function putPermiso(state, id_permiso) {
      state.permisos.splice(state.permisos.findIndex(function (permiso) {
        return permiso.id == id_permiso;
      }), 1);
    },
    pushPermiso: function pushPermiso(state, permiso) {
      var permis = state.permisos.find(function (permis) {
        return permis.id == permiso.id;
      });
      if (permis) {
        state.permisos.forEach(function (permis, i) {
          if (permis.id == permiso.id) {
            state.permisos[i] = permiso;
          }
        });
      } else {
        state.permisos.push(permiso);
      }
    }
  },
  getters: {
    draft: function draft(state) {
      return clone(state.permiso);
    },
    getPermissionUser: function getPermissionUser(state) {
      return function (_ref) {
        var rol = _ref.rol,
          permisos = _ref.permisos;
        return permisos.map(function (val) {
          var actions = null;
          if (rol.permissions) {
            var rolPermissions = rol.permissions.find(function (va) {
              return va.id == val.id;
            });
            actions = rolPermissions ? JSON.parse(rolPermissions.pivot.actions) : null;
          }
          return {
            module: val.nombre,
            read: actions ? actions.find(function (v) {
              return v == 'read';
            }) ? true : false : false,
            write: actions ? actions.find(function (v) {
              return v == 'write';
            }) ? true : false : false,
            update: actions ? actions.find(function (v) {
              return v == 'update';
            }) ? true : false : false,
            "delete": actions ? actions.find(function (v) {
              return v == 'delete';
            }) ? true : false : false
          };
        });
      };
    },
    getPermissionUserForPanel: function getPermissionUserForPanel(state) {
      return function (_ref2) {
        var panels = _ref2.panels,
          rol = _ref2.rol;
        var permisos = [];
        panels.forEach(function (val) {
          return permisos.push.apply(permisos, (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(val.permisos));
        });
        return permisos.map(function (val) {
          var actions = null;
          if (rol.permissions) {
            var rolPermissions = rol.permissions.find(function (va) {
              return va.id == val.id;
            });
            actions = rolPermissions ? JSON.parse(rolPermissions.pivot.actions) : null;
          }
          var result = {
            panel_id: val.panel_id,
            module: val.nombre,
            read: actions ? actions.find(function (v) {
              return v == 'read';
            }) ? true : false : false,
            write: actions ? actions.find(function (v) {
              return v == 'write';
            }) ? true : false : false,
            update: actions ? actions.find(function (v) {
              return v == 'update';
            }) ? true : false : false,
            "delete": actions ? actions.find(function (v) {
              return v == 'delete';
            }) ? true : false : false
          };
          return result;
        });
      };
    }
  },
  actions: {
    cargarPermisos: function cargarPermisos(_ref3) {
      var state = _ref3.state,
        commit = _ref3.commit;
      commit('toggleLoading', null, {
        root: true
      });
      axios.get('/api/cargar/permisos').then(function (_ref4) {
        var data = _ref4.data;
        commit('setPermisos', data);
      })["catch"](function (e) {
        console.log(e);
      }).then(function () {
        commit('toggleLoading', null, {
          root: true
        });
      });
    },
    guardarPermiso: function guardarPermiso(_ref5, data) {
      var state = _ref5.state,
        commit = _ref5.commit;
      return new Promise(function (resolve, reject) {
        commit('toggleLoading', null, {
          root: true
        });
        if (state.permiso.id) {
          axios.put('/api/permisos/' + state.permiso.id, data).then(function (_ref6) {
            var data = _ref6.data;
            if (data.result) {
              commit('pushPermiso', data.permiso);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          }).then(function () {
            commit('toggleLoading', null, {
              root: true
            });
          });
        } else {
          axios.post('/api/permisos', data).then(function (_ref7) {
            var data = _ref7.data;
            if (data.result) {
              commit('pushPermiso', data.permiso);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          }).then(function () {
            commit('toggleLoading', null, {
              root: true
            });
          });
        }
      });
    },
    eliminarPermiso: function eliminarPermiso(_ref8, id_permiso) {
      return (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/(0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee() {
        var state, commit;
        return (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              state = _ref8.state, commit = _ref8.commit;
              return _context.abrupt("return", new Promise(function (resolve, reject) {
                commit('toggleLoading', null, {
                  root: true
                });
                axios["delete"]('/api/permisos/' + id_permiso).then(function (_ref9) {
                  var data = _ref9.data;
                  if (data.result) {
                    commit('putPermiso', id_permiso);
                  }
                  resolve(data);
                })["catch"](function (e) {
                  return reject(e);
                }).then(function () {
                  commit('toggleLoading', null, {
                    root: true
                  });
                });
              }));
            case 2:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    },
    fetchData: function fetchData(_ref10, data) {
      var commit = _ref10.commit;
      return new Promise(function (resolve, reject) {
        commit('toggleLoading', null, {
          root: true
        });
        axios.post("/api/fetch/permisos", data).then(function (_ref11) {
          var data = _ref11.data;
          commit('setPermisos', data.permisos);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        }).then(function () {
          return commit('toggleLoading', null, {
            root: true
          });
        });
      });
    },
    getPermiso: function getPermiso(_ref12, id_permiso) {
      var commit = _ref12.commit;
      commit('toggleLoading', null, {
        root: true
      });
      return new Promise(function (resolve, reject) {
        axios.get("/api/permisos/".concat(id_permiso, "/get")).then(function (_ref13) {
          var data = _ref13.data;
          commit('pushPermiso', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        }).then(function () {
          return commit('toggleLoading', null, {
            root: true
          });
        });
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/src/store/modules/configuracion/rol.js":
/*!*************************************************************!*\
  !*** ./resources/js/src/store/modules/configuracion/rol.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.map.js */ "./node_modules/core-js/modules/es.array.map.js");
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.keys.js */ "./node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.for-each.js */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.array.find-index.js */ "./node_modules/core-js/modules/es.array.find-index.js");
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");











/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: function state() {
    return {
      rol: {
        nombre: null,
        id: null,
        permisos: []
      },
      roles: []
    };
  },
  mutations: {
    setRol: function setRol(state, data) {
      state.rol = {
        nombre: data.nombre,
        id: data.id,
        permisos: data.permisos.map(function (val) {
          var actions = JSON.parse(val.pivot.actions);
          return {
            module: val.nombre,
            read: actions.find(function (va) {
              return va == 'read';
            }) ? true : false,
            write: actions.find(function (va) {
              return va == 'write';
            }) ? true : false,
            update: actions.find(function (va) {
              return va == 'update';
            }) ? true : false,
            "delete": actions.find(function (va) {
              return va == 'delete';
            }) ? true : false
          };
        }),
        permissions: data.permisos
      };
    },
    clearRol: function clearRol(state) {
      state.rol = {
        nombre: null,
        id: null,
        permisos: []
      };
    },
    capturarRol: function capturarRol(state, id_rol) {
      state.rol = state.roles.find(function (rol) {
        return rol.id == id_rol;
      });
    },
    setRoles: function setRoles(state, data) {
      state.roles = [];
      data.forEach(function (rol, i) {
        state.roles.push({
          nombre: rol.nombre,
          id: rol.id,
          permisos: rol.permisos.map(function (val) {
            var actions = JSON.parse(val.pivot.actions);
            return {
              module: val.nombre,
              read: actions.find(function (va) {
                return va == 'read';
              }) ? true : false,
              write: actions.find(function (va) {
                return va == 'write';
              }) ? true : false,
              update: actions.find(function (va) {
                return va == 'update';
              }) ? true : false,
              "delete": actions.find(function (va) {
                return va == 'delete';
              }) ? true : false
            };
          }),
          permissions: rol.permisos
        });
      });
    },
    pushRol: function pushRol(state, role) {
      if (state.roles.find(function (rol) {
        return rol.id == role.id;
      })) {
        state.roles.forEach(function (rol, i) {
          if (rol.id == role.id) {
            state.roles[i] = {
              nombre: role.name,
              id: role.id,
              permisos: role.permisos.map(function (val) {
                var actions = JSON.parse(val.pivot.actions);
                return {
                  module: val.nombre,
                  read: actions.find(function (va) {
                    return va == 'read';
                  }) ? true : false,
                  write: actions.find(function (va) {
                    return va == 'write';
                  }) ? true : false,
                  update: actions.find(function (va) {
                    return va == 'update';
                  }) ? true : false,
                  "delete": actions.find(function (va) {
                    return va == 'delete';
                  }) ? true : false
                };
              }),
              permissions: role.permisos
            };
          }
        });
      } else {
        state.roles.push({
          nombre: role.nombre,
          id: role.id,
          permisos: role.permisos.map(function (val) {
            var actions = JSON.parse(val.pivot.actions);
            return {
              module: val.nombre,
              read: actions.find(function (va) {
                return va == 'read';
              }) ? true : false,
              write: actions.find(function (va) {
                return va == 'write';
              }) ? true : false,
              update: actions.find(function (va) {
                return va == 'update';
              }) ? true : false,
              "delete": actions.find(function (va) {
                return va == 'delete';
              }) ? true : false
            };
          }),
          permissions: role.permisos
        });
      }
    },
    putRol: function putRol(state, id_rol) {
      var index = state.roles.findIndex(function (rol) {
        return rol.id == id_rol;
      });
      if (index) {
        state.roles.splice(index, 1);
      }
    },
    updateRol: function updateRol(state, data) {
      var i = state.roles.findIndex(function (val) {
        return val.id == data.id;
      });
      if (i != -1) {
        state.roles[i] = data;
        if (state.rol.id == data.id) {
          state.rol = data;
        }
      }
    }
  },
  getters: {
    draft: function draft(state) {
      return clone(state.rol);
    },
    getRols: function getRols(state) {
      return state.roles.map(function (val) {
        return {
          label: val.nombre,
          value: val.id,
          id: val.id
        };
      });
    }
  },
  actions: {
    cargarRoles: function cargarRoles(_ref) {
      var commit = _ref.commit;
      axios__WEBPACK_IMPORTED_MODULE_10__["default"].get('/api/listar/roles').then(function (respon) {
        commit('setRoles', respon.data);
      })["catch"](function (e) {
        console.log(e);
      });
    },
    fetchData: function fetchData(_ref2, data) {
      var commit = _ref2.commit;
      return new Promise(function (resolve, reject) {
        commit('toggleLoading', null, {
          root: true
        });
        axios__WEBPACK_IMPORTED_MODULE_10__["default"].post("/api/fetch/roles", data).then(function (_ref3) {
          var data = _ref3.data;
          commit('setRoles', data.roles);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        }).then(function () {
          return commit('toggleLoading', null, {
            root: true
          });
        });
      });
    },
    guardarRol: function guardarRol(_ref4, data) {
      var state = _ref4.state,
        commit = _ref4.commit;
      return new Promise(function (resolve, reject) {
        commit('toggleLoading', null, {
          root: true
        });
        if (state.rol.id) {
          axios__WEBPACK_IMPORTED_MODULE_10__["default"].put("/api/roles/".concat(state.rol.id), data).then(function (_ref5) {
            var datos = _ref5.data;
            if (datos.result) {
              commit('pushRol', datos.rol);
            }
            resolve(datos);
          })["catch"](function (e) {
            return reject(e);
          }).then(function () {
            return commit('toggleLoading', null, {
              root: true
            });
          });
        } else {
          axios__WEBPACK_IMPORTED_MODULE_10__["default"].post('/api/roles', data).then(function (_ref6) {
            var datos = _ref6.data;
            if (datos.result) {
              commit('pushRol', datos.rol);
            }
            resolve(datos);
          })["catch"](function (e) {
            return reject(e);
          }).then(function () {
            return commit('toggleLoading', null, {
              root: true
            });
          });
        }
      });
    },
    eliminarRol: function eliminarRol(_ref7, id_rol) {
      var commit = _ref7.commit;
      return new Promise(function (resolve, reject) {
        commit('toggleLoading', null, {
          root: true
        });
        axios__WEBPACK_IMPORTED_MODULE_10__["default"]["delete"]("/api/roles/delete/".concat(id_rol)).then(function (_ref8) {
          var data = _ref8.data;
          resolve(data);
          commit('putRol', id_rol);
        })["catch"](function (e) {
          return reject(e);
        }).then(function () {
          return commit('toggleLoading', null, {
            root: true
          });
        });
      });
    },
    getRol: function getRol(_ref9, id_rol) {
      var commit = _ref9.commit;
      commit('toggleLoading', null, {
        root: true
      });
      return new Promise(function (resolve, reject) {
        axios__WEBPACK_IMPORTED_MODULE_10__["default"].get("/api/roles/".concat(id_rol, "/get")).then(function (_ref10) {
          var data = _ref10.data;
          commit('pushRol', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        }).then(function () {
          return commit('toggleLoading', null, {
            root: true
          });
        });
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/src/store/modules/cuentas_movimientos/cuenta.js":
/*!**********************************************************************!*\
  !*** ./resources/js/src/store/modules/cuentas_movimientos/cuenta.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.find-index.js */ "./node_modules/core-js/modules/es.array.find-index.js");
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_4__);





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: function state() {
    return {
      cuenta: {
        id: null,
        saldo: 0,
        model_type: "AppModelsUser",
        // por defecto es el usuario
        model_id: null,
        divisa_id: null,
        movimientos: [],
        divisa: null,
        model: null
      },
      cuentas: []
    };
  },
  getters: {
    draft: function draft(state) {
      return clone(state.cuenta);
    }
  },
  mutations: {
    clear: function clear(state) {
      return state.cuenta = {
        id: null,
        saldo: 0,
        model_type: 'User',
        // por defecto es el usuario
        model_id: null,
        divisa_id: null,
        movimientos: [],
        divisa: null,
        model: null
      };
    },
    setCuenta: function setCuenta(state, cuenta) {
      if (cuenta) {
        state.cuenta = cuenta;
      }
    },
    setCuentas: function setCuentas(state, cuentas) {
      if (cuentas.length) {
        state.cuentas = cuentas;
      }
    },
    capturar: function capturar(state, cuenta_id) {
      state.cuenta = state.cuentas.find(function (val) {
        return val.id === cuenta_id;
      });
    },
    update: function update(state, cuenta) {
      var i = state.cuentas.findIndex(function (val) {
        return val.id === cuenta.id;
      });
      if (i != -1) {
        state.cuentas[i] = cuenta;
      }
      if (state.cuenta.id === cuenta.id) {
        state.cuenta = cuenta;
      }
    },
    push: function push(state, cuenta) {
      state.cuentas.push(cuenta);
    },
    put: function put(state, cuenta_id) {
      state.cuentas.splice(state.cuentas.findIndex(function (val) {
        return val.id === cuenta_id;
      }), 1);
    }
  },
  actions: {
    getCuentas: function getCuentas(_ref) {
      var commit = _ref.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/cuentas/get/all").then(function (_ref2) {
          var data = _ref2.data;
          commit.setCuentas(data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetchData: function fetchData(_ref3, data) {
      var commit = _ref3.commit;
      return new Promise(function (resolve, reject) {
        axios.post("/api/cuentas/fetch/data", data).then(function (_ref4) {
          var data = _ref4.data;
          commit('setCuentas', data.cuentas);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/src/store/modules/cuentas_movimientos/movimiento.js":
/*!**************************************************************************!*\
  !*** ./resources/js/src/store/modules/cuentas_movimientos/movimiento.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.find-index.js */ "./node_modules/core-js/modules/es.array.find-index.js");
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_4__);





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: function state() {
    return {
      movimiento: {
        id: null,
        estado_cuenta_id: null,
        monto: 0,
        tipo_movimiento: 1,
        // 1 => Ingreso, 2 => egreso
        balance: 0,
        concepto: '',
        cuenta: null
      },
      movimientos: []
    };
  },
  getters: {
    draft: function draft(state) {
      return clone(state.movimiento);
    }
  },
  mutations: {
    clear: function clear(state) {
      return state.movimiento = {
        id: null,
        estado_cuenta_id: null,
        monto: 0,
        tipo_movimiento: 1,
        // 1 => Ingreso, 2 => egreso
        balance: 0,
        concepto: '',
        cuenta: null
      };
    },
    setMovimiento: function setMovimiento(state, movimiento) {
      if (movimiento) {
        state.movimiento = movimiento;
      }
    },
    setMovimientos: function setMovimientos(state, movimientos) {
      if (movimientos.length) {
        state.movimientos = movimientos;
      }
    },
    capturar: function capturar(state, movimiento_id) {
      state.movimiento = state.movimientos.find(function (val) {
        return val.id === movimiento_id;
      });
    },
    update: function update(state, movimiento) {
      var i = state.movimientos.findIndex(function (val) {
        return val.id === movimiento.id;
      });
      if (i != -1) {
        state.movimientos[i] = movimiento;
      }
      if (state.movimiento.id === movimiento.id) {
        state.movimiento = movimiento;
      }
    },
    push: function push(state, movimiento) {
      state.movimientos.push(movimiento);
    },
    put: function put(state, movimiento_id) {
      state.movimientos.splice(state.movimientos.findIndex(function (val) {
        return val.id === movimiento_id;
      }), 1);
    }
  },
  actions: {
    getMovimientos: function getMovimientos(_ref) {
      var commit = _ref.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/movimientos/get/all").then(function (_ref2) {
          var data = _ref2.data;
          commit('setMovimientos'.data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetchData: function fetchData(_ref3, data) {
      var commit = _ref3.commit;
      return new Promise(function (resolve, reject) {
        axios.post("/api/movimientos/fetch/data", data).then(function (_ref4) {
          var data = _ref4.data;
          commit('setMovimientos', data.movimientos);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/src/store/modules/cupones.js":
/*!***************************************************!*\
  !*** ./resources/js/src/store/modules/cupones.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.find-index.js */ "./node_modules/core-js/modules/es.array.find-index.js");
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.for-each.js */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.object.keys.js */ "./node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_8__);









/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: function state() {
    return {
      cupon: {
        id: null,
        nombre: '',
        descripcion: '',
        condiciones: '',
        restricciones: '',
        imagen: null,
        expide: null,
        vence: null,
        disponibles: 0,
        precio: 0,
        divisa_id: null,
        negocio_id: null,
        negocio: null,
        divisa: null
      },
      cupones: []
    };
  },
  getters: {
    draft: function draft(state) {
      return clone(state.cupon);
    }
  },
  mutations: {
    clear: function clear(state) {
      state.cupon = {
        id: null,
        nombre: '',
        descripcion: '',
        condiciones: '',
        restricciones: '',
        imagen: null,
        expide: null,
        vence: null,
        disponibles: 0,
        precio: 0,
        divisa_id: null,
        negocio_id: null,
        negocio: null,
        divisa: null
      };
    },
    setCupon: function setCupon(state, cupon) {
      state.cupon = cupon;
    },
    update: function update(state, cupon) {
      var i = state.cupones.findIndex(function (val) {
        return val.id === cupon.id;
      });
      if (i != -1) {
        state.cupones[i] = cupon;
      }
      if (state.cupon.id === cupon.id) {
        state.cupon = cupon;
      }
    },
    push: function push(state, cupon) {
      state.cupones.push(cupon);
    },
    put: function put(state, cupon_id) {
      state.cupones.splice(state.cupones.findIndex(function (val) {
        return val.id === cupon_id;
      }), 1);
    },
    capturar: function capturar(state, cupon_id) {
      var cupon = state.cupones.find(function (val) {
        return val.id === cupon_id;
      });
      if (cupon != undefined) {
        state.cupon = cupon;
      }
    },
    setCupones: function setCupones(state, cupones) {
      state.cupones = cupones;
    }
  },
  actions: {
    getCupons: function getCupons(_ref) {
      var commit = _ref.commit;
      return new Promise(function (resolve, reject) {
        axios.get('/api/cupons/get/all').then(function (_ref2) {
          var data = _ref2.data;
          commit('setCupones', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetchData: function fetchData(_ref3, datos) {
      var state = _ref3.state,
        commit = _ref3.commit;
      return new Promise(function (resolve, reject) {
        axios.post("/api/cupons/fetch/data", datos).then(function (_ref4) {
          var data = _ref4.data;
          commit('setCupones', data.cupones);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetch: function fetch(_ref5, cupon_id) {
      var state = _ref5.state,
        commit = _ref5.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/cupons/".concat(cupon_id, "/fetch/data")).then(function (_ref6) {
          var data = _ref6.data;
          commit('setCupon', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    guardar: function guardar(_ref7, datos) {
      var commit = _ref7.commit;
      var formData = new FormData();
      Object.keys(datos).forEach(function (val) {
        formData.append(val, datos[val]);
      });
      return new Promise(function (resolve, reject) {
        if (datos.id) {
          formData.append('_method', 'put');
          axios.post("/api/cupons/".concat(datos.id), formData, {
            headers: {
              ContentType: 'multipart/form-data'
            }
          }).then(function (_ref8) {
            var data = _ref8.data;
            if (data.result) {
              commit('update', data.cupon);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        } else {
          axios.post("/api/cupons", formData, {
            headers: {
              ContentType: 'multipart/form-data'
            }
          }).then(function (_ref9) {
            var data = _ref9.data;
            if (data.result) {
              commit('push', data.cupon);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        }
      });
    },
    eliminar: function eliminar(_ref10, cupon_id) {
      var commit = _ref10.commit;
      return new Promise(function (resolve, reject) {
        axios["delete"]("/api/cupons/".concat(cupon_id)).then(function (_ref11) {
          var data = _ref11.data;
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    reservar: function reservar(_ref12, datos) {
      var commit = _ref12.commit;
      return new Promise(function (resolve, reject) {
        axios.post("/api/cupons/reservar", datos).then(function (_ref13) {
          var data = _ref13.data;
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetchDataReservas: function fetchDataReservas(_ref14, datos) {
      var commit = _ref14.commit;
      return new Promise(function (resolve, reject) {
        axios.post('/api/cupons/reservas/fetch-data', datos).then(function (_ref15) {
          var data = _ref15.data;
          return resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    reservaCancelar: function reservaCancelar(_ref16, _ref17) {
      var commit = _ref16.commit;
      var cupon = _ref17.cupon,
        usuario = _ref17.usuario;
      return new Promise(function (resolve, reject) {
        axios.get("/api/cupons/reservas/".concat(cupon, "/cancelar/usuario/").concat(usuario)).then(function (_ref18) {
          var data = _ref18.data;
          return resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/src/store/modules/dashboard/dashboard.js":
/*!***************************************************************!*\
  !*** ./resources/js/src/store/modules/dashboard/dashboard.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.map.js */ "./node_modules/core-js/modules/es.array.map.js");
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__);



var colorRand = function colorRand() {
  var colores = ['#397DAD', '#4D616C', '#D02412', '#CD960E', '#348022', '#17B6AA', '#5F2626', '#00AEFF', '#6574cd', '#9561e2', '#f66d9b', '#e3342f', '#f6993f', '#ffed4a', '#38c172', '#4dc0b5', '#6cb2eb', '#444444', '#00c0ef'];
  var i = random(0, colores.length);
  return colores[i];
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: function state() {
    return {
      // Travelpoints
      gastosTuristicos: {
        items: [],
        ultima_fecha: null
      },
      tiendaRegalos: {
        items: [],
        ultima_fecha: null
      },
      totalViajeros: {
        series: [],
        chartOptions: {
          chart: {
            width: 380,
            type: 'pie'
          },
          labels: [],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        }
      },
      totalPromotores: {
        series: [],
        chartOptions: {
          chart: {
            width: 380,
            type: 'pie'
          },
          labels: [],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        }
      },
      totalCoordinadores: {
        series: [],
        chartOptions: {
          chart: {
            width: 380,
            type: 'pie'
          },
          labels: [],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        }
      },
      totalComisionesGeneradas: {
        series: [],
        chartOptions: {
          chart: {
            width: 380,
            type: 'pie'
          },
          labels: [],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        }
      },
      totalDestinosActivos: {
        series: [],
        chartOptions: {
          chart: {
            type: 'bar'
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '55%',
              endingShape: 'rounded'
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
          },
          xaxis: {
            categories: []
          },
          yaxis: {
            title: {
              text: 'Total de negocios por destino'
            }
          },
          tooltip: {}
        }
      },
      viajerosActivos: 0,
      destinosActivos: 0,
      paisesActivos: [{
        name: 'Random data',
        states: {
          hover: {
            color: '#BADA55'
          }
        },
        dataLabels: {
          enabled: true,
          format: '{point.name}'
        },
        allAreas: false,
        data: [['km', 69], ['mn', 145], ['rw', 146], ['so', 147], ['bo', 148], ['cm', 149],
        // ['cg', 150],
        ['ci', 170], ['lr', 171], ['bn', 172], ['iq', 173], ['kg', 211], ['np', 212], ['ve', 100]]
      }],
      viajerosTotalesAnual: {
        series: [],
        chartOptions: {
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false
            },
            id: 'viajeros-totales-anuales'
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'straight'
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'],
              opacity: 0.5
            }
          },
          xaxis: {
            categories: [],
            labels: {
              style: {
                transform: "rotate(45deg)"
              }
            }
          }
        }
      },
      eficaciaPromotores: {
        series: [{
          name: 'Vue Chart',
          data: [30, 40, 45, 50, 49, 60, 70, 81]
        }],
        chartOptions: {
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false
            },
            id: 'eficacia-promotores'
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'straight'
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'],
              opacity: 0.5
            }
          },
          xaxis: {
            categories: ['prueba'],
            labels: {
              style: {
                transform: "rotate(45deg)"
              }
            }
          }
        }
      },
      viajerosTotales: {
        series: [],
        chartOptions: {
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false
            },
            id: 'viajeros-totales'
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'straight'
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'],
              opacity: 0.5
            }
          },
          xaxis: {
            categories: [],
            labels: {
              style: {
                transform: "rotate(45deg)"
              }
            }
          }
        }
      },
      negociosAfiliados: {
        series: [],
        chartOptions: {
          chart: {
            type: 'bar'
          },
          plotOptions: {
            bar: {
              horizontal: true,
              columnWidth: '55%',
              endingShape: 'rounded'
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
          },
          xaxis: {
            categories: []
          },
          tooltip: {}
        }
      },
      porcentajeNegocio: {
        series: [],
        chartOptions: {
          chart: {
            type: 'donut'
          },
          plotOptions: {
            bar: {
              horizontal: true,
              columnWidth: '55%',
              endingShape: 'rounded'
            }
          },
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'right'
              }
            }
          }],
          dataLabels: {
            enabled: false
          },
          legend: {
            position: 'right',
            offsetY: 0,
            height: 230
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
          },
          tooltip: {
            y: {
              formatter: function formatter(val, _ref) {
                var series = _ref.series,
                  seriesIndex = _ref.seriesIndex,
                  dataPointIndex = _ref.dataPointIndex,
                  w = _ref.w;
                return "".concat(val, " %");
              },
              title: {
                formatter: function formatter(seriesName) {
                  return seriesName;
                }
              }
            }
          },
          labels: []
        }
      },
      totalPromotoresPorLider: {
        series: [{
          name: "High - 2013",
          data: [28, 29, 33, 36, 32, 32, 33]
        }, {
          name: "Low - 2013",
          data: [12, 11, 14, 18, 17, 13, 13]
        }],
        chartOptions: {
          chart: {
            height: 350,
            type: 'line',
            dropShadow: {
              enabled: true,
              color: '#000',
              top: 18,
              left: 7,
              blur: 10,
              opacity: 0.2
            },
            toolbar: {
              show: false
            }
          },
          colors: ['#77B6EA', '#545454'],
          dataLabels: {
            enabled: true
          },
          stroke: {
            curve: 'smooth'
          },
          grid: {
            borderColor: '#e7e7e7',
            row: {
              colors: ['#f3f3f3', 'transparent'],
              // takes an array which will be repeated on columns
              opacity: 0.5
            }
          },
          markers: {
            size: 1
          },
          xaxis: {
            categories: [],
            title: {
              text: 'Lideres'
            }
          },
          yaxis: {
            title: {
              text: 'Cant Promotores'
            },
            min: 0,
            max: 40
          },
          legend: {
            position: 'bottom',
            horizontalAlign: 'center',
            floating: true,
            offsetY: -25,
            offsetX: -5,
            style: {
              marginTop: '3rem'
            }
          }
        }
      },
      totalEficaciaPromotoresCoordinador: {
        series: [44, 55, 41, 17, 15],
        chartOptions: {
          chart: {
            width: 380,
            type: 'donut'
          },
          plotOptions: {
            pie: {
              startAngle: -90,
              endAngle: 270
            }
          },
          dataLabels: {
            enabled: false
          },
          fill: {
            type: 'gradient'
          },
          legend: {
            formatter: function formatter(val, opts) {
              return "Promotor: ".concat(val, " - ").concat(opts.w.globals.series[opts.seriesIndex], " %");
            }
          },
          labels: [],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        }
      },
      totalViajerosPorCoordinador: {
        series: [],
        chartOptions: {
          chart: {
            height: 350,
            type: 'line',
            dropShadow: {
              enabled: true,
              color: '#000',
              top: 18,
              left: 7,
              blur: 10,
              opacity: 0.2
            },
            toolbar: {
              show: false
            }
          },
          colors: ['#397DAD', '#4D616C',
          // '#D02412',
          '#CD960E', '#348022', '#17B6AA', '#5F2626', '#00AEFF', '#6574cd', '#9561e2', '#f66d9b',
          // '#e3342f',
          // '#f6993f',
          // '#ffed4a',
          '#38c172', '#4dc0b5', '#6cb2eb', '#444444', '#00c0ef'],
          dataLabels: {
            enabled: true,
            style: {
              fontSize: '16pt',
              color: ['#ffffff']
            }
          },
          stroke: {
            curve: 'smooth'
          },
          grid: {
            borderColor: '#e7e7e7',
            row: {
              colors: ['#f3f3f3', 'transparent'],
              // takes an array which will be repeated on columns
              opacity: 0.5
            }
          },
          markers: {
            size: 1
          },
          xaxis: {
            categories: [],
            title: {
              text: 'Promotores'
            }
          },
          yaxis: {
            title: {
              text: 'Cant Viajeros'
            },
            min: 0,
            max: 40
          },
          legend: {
            position: 'bottom',
            horizontalAlign: 'center',
            floating: true,
            offsetY: -25,
            offsetX: -5,
            style: {
              marginTop: '3rem'
            }
          }
        }
      },
      porcentajeUsoViajeros: {
        series: [67],
        chartOptions: {
          chart: {
            height: 350,
            type: 'radialBar',
            offsetY: -10
          },
          plotOptions: {
            radialBar: {
              startAngle: -135,
              endAngle: 135,
              dataLabels: {
                name: {
                  fontSize: '16px',
                  color: undefined,
                  offsetY: 120
                },
                value: {
                  offsetY: 76,
                  fontSize: '22px',
                  color: undefined,
                  formatter: function formatter(val) {
                    return val + "%";
                  }
                }
              }
            }
          },
          fill: {
            type: 'gradient',
            gradient: {
              shade: 'dark',
              shadeIntensity: 0.15,
              inverseColors: false,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 50, 65, 91]
            }
          },
          stroke: {
            dashArray: 4
          },
          labels: ['Porcentaje Uso']
        }
      },
      operacionesTravel: 0,
      totalViajerosRegistrados: 0,
      totalViajerosConsumos: 0,
      comisiones_cobradas: 0,
      comisiones_por_cobrar: 0,
      promotores_status: {
        activos: 0,
        inactivos: 0
      },
      lideres_status: {
        activos: 0,
        inactivos: 0
      },
      misPromotores: [],
      porcentajeEficacia: {
        series: [],
        chartOptions: {
          chart: {
            height: 350,
            type: 'radialBar'
          },
          plotOptions: {
            radialBar: {
              // ...
              dataLabels: {
                enabled: true,
                textAnchor: 'middle',
                distributed: false,
                offsetX: 0,
                offsetY: 0,
                style: {
                  fontSize: '12px',
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  fontWeight: 'bold',
                  colors: undefined
                }
              }
            }
          },
          dataLabels: {
            enabled: true,
            textAnchor: 'middle',
            distributed: false,
            offsetX: 0,
            offsetY: 0,
            style: {
              fontSize: '12px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 'bold',
              colors: undefined
            }
          },
          labels: ['Sobre el Total de Viajeros']
        }
      },
      porcentajeEficaciaPromotores: {
        series: [10],
        chartOptions: {
          chart: {
            height: 350,
            type: 'radialBar',
            toolbar: {
              show: true,
              offsetX: 0,
              offsetY: 0,
              tools: {
                download: false,
                selection: true,
                zoom: false,
                zoomin: true,
                zoomout: true,
                pan: true,
                reset: true
              }
            }
          },
          plotOptions: {
            radialBar: {
              // ...

              dataLabels: {
                show: true,
                name: {
                  show: true,
                  fontSize: '24px',
                  fontFamily: 'Miriad, Arial, sans-serif',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  offsetY: -10
                },
                value: {
                  show: true,
                  fontSize: '30px',
                  fontFamily: 'Miriad, Arial, sans-serif',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  offsetY: 0,
                  formatter: function formatter(val) {
                    return val + '%';
                  }
                },
                total: {
                  show: true,
                  label: 'Eficacia',
                  // Aquí se establece la etiqueta por defecto
                  formatter: function formatter() {
                    return '';
                  }
                }
              }
            }
          },
          dataLabels: {
            hideWhenZero: false,
            enabled: true,
            textAnchor: 'middle',
            distributed: false,
            offsetX: 0,
            offsetY: 0,
            style: {
              fontSize: '12px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 'bold',
              colors: undefined
            }
          },
          labels: ['Prueba'],
          activeIndex: 0,
          legend: {
            show: true,
            position: 'bottom'
          }
        }
      }
    };
  },
  mutations: {
    // Travelpoints
    setTotalViajeros: function setTotalViajeros(state, _ref2) {
      var data = _ref2.data,
        categorias = _ref2.categorias;
      state.totalViajeros.chartOptions.labels = categorias;
      state.totalViajeros.series = data;
    },
    setTotalPromotores: function setTotalPromotores(state, _ref3) {
      var data = _ref3.data,
        categorias = _ref3.categorias;
      state.totalPromotores.chartOptions.labels = categorias;
      state.totalPromotores.series = data;
    },
    setTotalCoordinadores: function setTotalCoordinadores(state, _ref4) {
      var data = _ref4.data,
        categorias = _ref4.categorias;
      state.totalCoordinadores.chartOptions.labels = categorias;
      state.totalCoordinadores.series = data;
    },
    setTotalDestinosActivos: function setTotalDestinosActivos(state, data) {
      state.totalDestinosActivos.chartOptions.xaxis.categories = data.map(function (destino) {
        return destino.destino;
      });
      state.totalDestinosActivos.series = data.map(function (destino) {
        return {
          name: destino.destino,
          data: [destino.totalNegocios],
          dataNombres: [destino.nombresNegocios]
        };
      });
    },
    setViajerosActivos: function setViajerosActivos(state, viajeros) {
      state.viajerosActivos = viajeros;
    },
    setDestinosActivos: function setDestinosActivos(state, destinos) {
      state.destinosActivos = destinos;
    },
    setPaisesActivos: function setPaisesActivos(state, data) {
      state.paisesActivos = data;
    },
    setTotalNegociosAfiliados: function setTotalNegociosAfiliados(state, _ref5) {
      var data = _ref5.data,
        categorias = _ref5.categorias;
      state.negociosAfiliados.chartOptions.xaxis.categories = categorias;
      state.negociosAfiliados.series = data;
    },
    setPorcentajeNegocio: function setPorcentajeNegocio(state, _ref6) {
      var data = _ref6.data,
        categorias = _ref6.categorias;
      state.porcentajeNegocio.chartOptions.labels = categorias;
      state.porcentajeNegocio.series = data;
    },
    setGastosTuristicos: function setGastosTuristicos(state, data) {
      state.gastosTuristicos.items = data.items;
      state.gastosTuristicos.ultima_fecha = data.ultima_fecha;
    },
    setTiendaRegalos: function setTiendaRegalos(state, data) {
      state.tiendaRegalos.items = data.items;
      state.tiendaRegalos.ultima_fecha = data.ultimaFecha;
    },
    setTotalComisionesGeneradas: function setTotalComisionesGeneradas(state, _ref7) {
      var categorias = _ref7.categorias,
        data = _ref7.data;
      state.totalComisionesGeneradas.chartOptions.labels = categorias;
      state.totalComisionesGeneradas.series = data;
    },
    setTotalOperaciones: function setTotalOperaciones(state, data) {
      state.operacionesTravel = data;
    },
    setViejerosTotalesAnuales: function setViejerosTotalesAnuales(state, _ref8) {
      var categorias = _ref8.categorias,
        data = _ref8.data;
      state.viajerosTotalesAnual.chartOptions.xaxis.categories = categorias;
      state.viajerosTotalesAnual.series = data;
    },
    setTotalViajerosRegistrados: function setTotalViajerosRegistrados(state, total) {
      state.totalViajerosRegistrados = total;
    },
    setTotalViajerosConsumo: function setTotalViajerosConsumo(state, total) {
      state.totalViajerosConsumos = total;
    },
    setComisionesPromotor: function setComisionesPromotor(state, _ref9) {
      var comisiones_cobradas = _ref9.comisiones_cobradas,
        comisiones_por_cobrar = _ref9.comisiones_por_cobrar;
      state.comisiones_cobradas = comisiones_cobradas;
      state.comisiones_por_cobrar = comisiones_por_cobrar;
    },
    setStatusPromotores: function setStatusPromotores(state, _ref10) {
      var promotores_activos = _ref10.promotores_activos,
        promotores_inactivos = _ref10.promotores_inactivos;
      state.promotores_status.activos = promotores_activos;
      state.promotores_status.inactivos = promotores_inactivos;
    },
    setStatusCoordinadores: function setStatusCoordinadores(state, _ref11) {
      var lideres_activos = _ref11.lideres_activos,
        lideres_inactivos = _ref11.lideres_inactivos;
      state.lideres_status.activos = lideres_activos;
      state.lideres_status.inactivos = lideres_inactivos;
    },
    setEficaciaPromotores: function setEficaciaPromotores(state, _ref12) {
      var promotores = _ref12.promotores,
        data = _ref12.data;
      state.eficaciaPromotores.chartOptions.xaxis.categories = promotores;
      state.eficaciaPromotores.series = data;
    },
    setViajerosTotales: function setViajerosTotales(state, _ref13) {
      var categorias = _ref13.categorias,
        data = _ref13.data;
      state.viajerosTotales.chartOptions.xaxis.categories = categorias;
      state.viajerosTotales.series = data;
    },
    setMisPromotores: function setMisPromotores(state, promotores) {
      state.misPromotores = promotores;
    },
    setEficaciaMes: function setEficaciaMes(state, val) {
      state.porcentajeEficacia.series = [val];
    },
    setEficaciaMesPromotores: function setEficaciaMesPromotores(state, _ref14) {
      var promotores = _ref14.promotores,
        data = _ref14.data;
      state.porcentajeEficaciaPromotores.chartOptions.labels = promotores;
      state.porcentajeEficaciaPromotores.series = data;
    },
    setTotalPromotoresPorLider: function setTotalPromotoresPorLider(state, _ref15) {
      var data = _ref15.data,
        categorias = _ref15.categorias;
      state.totalPromotoresPorLider.series = data;
      state.totalPromotoresPorLider.chartOptions.xaxis.categories = categorias;
    },
    setTotalEficaciaPromotoresCoordinador: function setTotalEficaciaPromotoresCoordinador(state, _ref16) {
      var data = _ref16.data,
        categorias = _ref16.categorias;
      state.totalEficaciaPromotoresCoordinador.series = data;
      state.totalEficaciaPromotoresCoordinador.chartOptions.labels = categorias;
    },
    setTotalViajerosPorCoordinador: function setTotalViajerosPorCoordinador(state, _ref17) {
      var data = _ref17.data,
        categorias = _ref17.categorias;
      state.totalViajerosPorCoordinador.series = data;
      state.totalViajerosPorCoordinador.chartOptions.labels = categorias;
    },
    setPorcentajeUsoViajeros: function setPorcentajeUsoViajeros(state, _ref18) {
      var porcentaje = _ref18.porcentaje,
        total_viajeros = _ref18.total_viajeros;
      state.porcentajeUsoViajeros.series = [porcentaje];
      state.porcentajeUsoViajeros.chartOptions.labels = ["Sobre ".concat(total_viajeros, " (Total Viajeros)")];
    }
  },
  actions: {
    cargarDataDashboard: function cargarDataDashboard(_ref19) {
      var state = _ref19.state,
        commit = _ref19.commit;
      commit('toggleLoading', null, {
        root: true
      });
      axios.get('/api/get/data/dashboard').then(function (_ref20) {
        var data = _ref20.data;
        commit('setViajerosActivos', data.viajerosActivos);
      })["catch"](function (e) {
        console.log(e);
      }).then(function () {
        commit('toggleLoading', null, {
          root: true
        });
      });
    },
    cargarViajerosActivos: function cargarViajerosActivos(_ref21, dato) {
      var commit = _ref21.commit;
      return new Promise(function (resolve, reject) {
        axios.post("/api/dashboard/get/viajeros/activos", dato).then(function (_ref22) {
          var data = _ref22.data;
          commit('setViajerosActivos', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    cargarDestinosActivos: function cargarDestinosActivos(_ref23, dato) {
      var commit = _ref23.commit;
      return new Promise(function (resolve, reject) {
        axios.post("/api/dashboard/get/destinos/activos", dato).then(function (_ref24) {
          var data = _ref24.data;
          commit('setDestinosActivos', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    cargarDestinosActivosChart: function cargarDestinosActivosChart(_ref25) {
      var commit = _ref25.commit;
      return new Promise(function (resolve, reject) {
        axios.get('/api/dashboard/total/destinos/activos').then(function (_ref26) {
          var data = _ref26.data;
          commit('setTotalDestinosActivos', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    cargarPaisesActivos: function cargarPaisesActivos(_ref27) {
      var commit = _ref27.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/dashboard/get/paises/activos").then(function (_ref28) {
          var data = _ref28.data;
          commit('setPaisesActivos', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    getTotalViajeros: function getTotalViajeros(_ref29, filtro) {
      var state = _ref29.state,
        commit = _ref29.commit;
      return new Promise(function (resolve, reject) {
        axios.post("/api/dashboard/total/viajeros", filtro).then(function (_ref30) {
          var data = _ref30.data;
          commit('setTotalViajeros', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    cargarNegociosAfiliados: function cargarNegociosAfiliados(_ref31) {
      var commit = _ref31.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/dashboard/total/negocios/afiliados").then(function (_ref32) {
          var data = _ref32.data;
          commit('setTotalNegociosAfiliados', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    cargarPorcentajeNegocio: function cargarPorcentajeNegocio(_ref33) {
      var commit = _ref33.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/dashboard/porcentaje/negocios").then(function (_ref34) {
          var data = _ref34.data;
          commit('setPorcentajeNegocio', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetchGastosTuristicos: function fetchGastosTuristicos(_ref35, filtro) {
      var commit = _ref35.commit;
      return new Promise(function (resolve, reject) {
        axios.post("/api/dashboard/gastos/turisticos", filtro).then(function (_ref36) {
          var data = _ref36.data;
          commit('setGastosTuristicos', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetchTiendaRegalos: function fetchTiendaRegalos(_ref37) {
      var commit = _ref37.commit;
      return new Promise(function (resolve, reject) {
        axios.post("/api/dashboard/tienda/regalos").then(function (_ref38) {
          var data = _ref38.data;
          commit('setTiendaRegalos', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetchTotalPromotores: function fetchTotalPromotores(_ref39) {
      var commit = _ref39.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/dashboard/total/promotores").then(function (_ref40) {
          var data = _ref40.data;
          commit('setTotalPromotores', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetchTotalCoordinadores: function fetchTotalCoordinadores(_ref41) {
      var commit = _ref41.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/dashboard/total/coordinadores").then(function (_ref42) {
          var data = _ref42.data;
          commit('setTotalCoordinadores', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetchTotalComisionesGeneradas: function fetchTotalComisionesGeneradas(_ref43) {
      var commit = _ref43.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/dashboard/total/comisiones/generadas").then(function (_ref44) {
          var data = _ref44.data;
          commit('setTotalComisionesGeneradas', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    getTotalOperacionesTravel: function getTotalOperacionesTravel(_ref45) {
      var commit = _ref45.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/dashboard/total/operaciones/travel").then(function (_ref46) {
          var data = _ref46.data;
          commit('setTotalOperaciones', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    getTotalViajerosRegistradoAnual: function getTotalViajerosRegistradoAnual(_ref47) {
      var commit = _ref47.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/dashboard/total/viajeros/anual").then(function (_ref48) {
          var data = _ref48.data;
          commit('setViejerosTotalesAnuales', data);
          commit('setTotalViajerosRegistrados', data.total_usuarios_registrados);
          commit('setTotalViajerosConsumo', data.total_viajeros_consumos);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    getTotalComisiones: function getTotalComisiones(_ref49, filtro) {
      var commit = _ref49.commit;
      return new Promise(function (resolve, reject) {
        axios.post("/api/dashboard/total/comisiones/promotor", filtro).then(function (_ref50) {
          var data = _ref50.data;
          commit('setComisionesPromotor', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    promotoresStatus: function promotoresStatus(_ref51) {
      var commit = _ref51.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/dashboard/promotores/status").then(function (_ref52) {
          var data = _ref52.data;
          commit('setStatusPromotores', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    coordinadoresStatus: function coordinadoresStatus(_ref53) {
      var commit = _ref53.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/dashboard/coordinadores/status").then(function (_ref54) {
          var data = _ref54.data;
          commit('setStatusCoordinadores', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    getEficaciaPromotores: function getEficaciaPromotores(_ref55) {
      var commit = _ref55.commit;
      return new Promise(function (resolve, reject) {
        axios.get('/api/dashboard/promotores/get/eficacia').then(function (_ref56) {
          var data = _ref56.data;
          commit('setEficaciaPromotores', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    getTotalesViajeros: function getTotalesViajeros(_ref57, filtro) {
      var commit = _ref57.commit;
      return new Promise(function (resolve, reject) {
        axios.post("/api/dashboard/lider/viajeros-totales", filtro).then(function (_ref58) {
          var data = _ref58.data;
          commit('setViajerosTotales', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    getMisPromotores: function getMisPromotores(_ref59) {
      var commit = _ref59.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/dashboard/lider/mis-promotores").then(function (_ref60) {
          var data = _ref60.data;
          commit('setMisPromotores', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    getEficaciaMes: function getEficaciaMes(_ref61) {
      var commit = _ref61.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/dashboard/lider/eficacia-mes").then(function (_ref62) {
          var data = _ref62.data;
          commit('setEficaciaMes', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    getEficaciaMesPromotores: function getEficaciaMesPromotores(_ref63) {
      var commit = _ref63.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/dashboard/lider/eficacia-mes/promotores").then(function (_ref64) {
          var data = _ref64.data;
          commit('setEficaciaMesPromotores', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    getTotalPromotoresPorLider: function getTotalPromotoresPorLider(_ref65) {
      var state = _ref65.state,
        commit = _ref65.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/dashboard/total/promotores/por-lider").then(function (_ref66) {
          var data = _ref66.data;
          commit('setTotalPromotoresPorLider', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    getEficaciaPromotoresCoordinador: function getEficaciaPromotoresCoordinador(_ref67, filtro) {
      var state = _ref67.state,
        commit = _ref67.commit;
      return new Promise(function (resolve, reject) {
        axios.post("/api/dashboard/eficacia/promotor/coordinador", filtro).then(function (_ref68) {
          var data = _ref68.data;
          commit('setTotalEficaciaPromotoresCoordinador', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    getTotalViajerosPorCoordinador: function getTotalViajerosPorCoordinador(_ref69, filtro) {
      var commit = _ref69.commit;
      return new Promise(function (resolve, reject) {
        axios.post('/api/dashboard/total/viajeros/por-coordinador', filtro).then(function (_ref70) {
          var data = _ref70.data;
          commit('setTotalViajerosPorCoordinador', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    getPorcentajeUsoViajeros: function getPorcentajeUsoViajeros(_ref71) {
      var commit = _ref71.commit;
      return new Promise(function (resolve, reject) {
        axios.get('/api/dashboard/porcentaje-uso/viajeros').then(function (_ref72) {
          var data = _ref72.data;
          commit('setPorcentajeUsoViajeros', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/src/store/modules/datosPago.js":
/*!*****************************************************!*\
  !*** ./resources/js/src/store/modules/datosPago.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: function state() {
    return {
      datos: {
        id: null,
        metodo_pago: 1,
        pais_id: null,
        ciudad_id: null,
        nombre_banco: '',
        direccion_banco: '',
        titular: '',
        iban: null,
        swift: null,
        numero_cuenta: null,
        fichero_acreditativo_cuenta: null,
        email: null,
        usuario_id: null,
        pais: null,
        ciudad: null,
        usuario: null
      }
    };
  },
  getters: {
    draft: function draft(state) {
      return state.datos;
    }
  },
  mutations: {
    setDatos: function setDatos(state, datos) {
      return state.datos = datos;
    },
    clear: function clear(state) {
      state.datos = {
        id: null,
        metodo_pago: 1,
        pais_id: null,
        ciudad_id: null,
        nombre_banco: '',
        direccion_banco: '',
        titular: '',
        iban: null,
        swift: null,
        fichero_acreditativo_cuenta: null,
        numero_cuenta: null,
        email: null,
        usuario_id: null,
        pais: null,
        ciudad: null,
        usuario: null
      };
    },
    update: function update(state, datos) {
      state.datos = datos;
    }
  },
  actions: {
    fetch: function fetch(_ref, usuario_id) {
      var state = _ref.state,
        commit = _ref.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/datos-pago/fetch/".concat(usuario_id)).then(function (_ref2) {
          var data = _ref2.data;
          commit('setDatos', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    guardar: function guardar(_ref3, datos) {
      var state = _ref3.state,
        commit = _ref3.commit;
      return new Promise(function (resolve, reject) {
        if (state.datos.id) {
          axios.put("/api/datos-pago/".concat(datos.id), datos).then(function (_ref4) {
            var data = _ref4.data;
            commit('update', data.datos);
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        } else {
          axios.post("/api/datos-pago", datos).then(function (_ref5) {
            var data = _ref5.data;
            commit('setDatos', data.datos);
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        }
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/src/store/modules/destinos/atracciones/atraccion.js":
/*!**************************************************************************!*\
  !*** ./resources/js/src/store/modules/destinos/atracciones/atraccion.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty.js */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_reduce_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.reduce.js */ "./node_modules/core-js/modules/es.array.reduce.js");
/* harmony import */ var core_js_modules_es_array_reduce_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_reduce_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.filter.js */ "./node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.array.find-index.js */ "./node_modules/core-js/modules/es.array.find-index.js");
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.array.for-each.js */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");













/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: function state() {
    var _atraccion;
    return {
      atraccion: (_atraccion = {
        id: null,
        nombre: null,
        destino_id: null,
        destino: null,
        sitio_web: '',
        email: null,
        lat: null,
        lng: null,
        incluye: [],
        duracion_sugerida: '',
        telefono: {
          telefono: '',
          is_whatsapp: false,
          principal: true
        },
        imagenes: [],
        horarios: [],
        comentarios: [],
        descripcion: ''
      }, (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_atraccion, "horarios", []), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_atraccion, "opinions", []), _atraccion),
      atracciones: []
    };
  },
  getters: {
    draft: function draft(state) {
      return clone(state.atraccion);
    },
    getPortada: function getPortada(state) {
      var portada = state.atraccion.imagenes.find(function (val) {
        return val.portada;
      });
      if (portada) {
        return "/storage/atracciones/imagenes/".concat(portada.imagen);
      } else {
        var primeraImagen = state.atraccion.imagenes[0];
        if (primeraImagen) {
          return "/storage/atracciones/imagenes/".concat(primeraImagen.imagen);
        } else {
          return "/storage/atracciones/imagenes/";
        }
      }
    },
    legendHorario: function legendHorario(state) {
      var legend = 'Cerrado ahora';
      var dia = state.atraccion.horarios.find(function (val) {
        return val.dia == moment().day();
      });
      if (dia) {
        var hora1 = moment(moment().format("Y-M-D ".concat(dia.apertura[0])));
        var hora2 = moment(moment().format("Y-M-D ".concat(dia.cierre[0])));
        var horaActual = moment();
        if (horaActual.isBetween(hora1, hora2)) {
          legend = 'Abierto Ahora';
        }
      }
      return legend;
    },
    horarioHoy: function horarioHoy(state) {
      var dia = state.atraccion.horarios.find(function (val) {
        return val.dia == moment().day();
      });
      if (dia) {
        var hora1 = moment(moment().format("Y-M-D ".concat(dia.apertura)));
        var hora2 = moment(moment().format("Y-M-D ".concat(dia.cierre)));
        return "De ".concat(hora1.format('h:mm A'), " a ").concat(hora2.format('h:mm A'));
      }
      return null;
    },
    promedioCalificacion: function promedioCalificacion(state) {
      return function (atraccion) {
        var result = 0;
        if (atraccion.opinions.length) {
          var sum_calificacion = atraccion.opinions.reduce(function (a, b) {
            return a + Number(b.calificacion);
          }, 0);
          result = sum_calificacion / atraccion.opinions.length;
        }
        return result;
      };
    },
    porcentajeOpinions: function porcentajeOpinions(state) {
      return function (calificacion) {
        var cant_cali = state.atraccion.opinions.filter(function (val) {
          return val.calificacion == calificacion;
        }).length;
        var total_cali = state.atraccion.opinions.length;
        return {
          porcentaje: cant_cali * 100 / total_cali,
          cantidad: cant_cali
        };
      };
    }
  },
  mutations: {
    clear: function clear(state) {
      var _state$atraccion;
      state.atraccion = (_state$atraccion = {
        id: null,
        nombre: null,
        destino_id: null,
        destino: null,
        sitio_web: '',
        email: null,
        lat: null,
        lng: null,
        incluye: [],
        duracion_sugerida: '',
        imagenes: [],
        horarios: [],
        comentarios: [],
        descripcion: ''
      }, (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_state$atraccion, "horarios", []), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_state$atraccion, "opinions", []), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_state$atraccion, "telefono", {
        telefono: '',
        is_whatsapp: false,
        principal: true
      }), _state$atraccion);
    },
    capturar: function capturar(state, atraccion_id) {
      if (atraccion_id) {
        state.atraccion = state.atracciones.find(function (val) {
          return val.id === atraccion_id;
        });
      }
    },
    push: function push(state, atraccion) {
      state.atracciones.push(atraccion);
    },
    put: function put(state, atraccion_id) {
      state.atracciones.splice(state.atracciones.findIndex(function (val) {
        return val.id === atraccion_id;
      }), 1);
    },
    update: function update(state, atraccion) {
      var i = state.atracciones.findIndex(function (val) {
        return val.id === atraccion.id;
      });
      if (i != -1) {
        state.atracciones[i] = atraccion;
      }
      if (state.atraccion.id === atraccion.id) {
        state.atraccion = atraccion;
      }
    },
    setAtraccion: function setAtraccion(state, atraccion) {
      state.atraccion = atraccion;
    },
    setAtracciones: function setAtracciones(state, atracciones) {
      state.atracciones = atracciones;
    },
    agregarInclusion: function agregarInclusion(state) {
      state.atraccion.incluye.push({
        sujeto: '',
        descripcion: ''
      });
    },
    quitarInclusion: function quitarInclusion(state, i) {
      state.atraccion.incluye.splice(i, 1);
    },
    togglePortada: function togglePortada(state, _ref) {
      var imagen_id = _ref.imagen_id,
        portada = _ref.portada;
      if (state.atraccion.id) {
        state.atraccion.imagenes.forEach(function (val) {
          return val.portada = false;
        });
        var image = state.atraccion.imagenes.find(function (val) {
          return val.id === imagen_id;
        });
        image.portada = portada;
      }
    },
    pushOpinion: function pushOpinion(state, opinion) {
      state.atraccion.opinions.push(opinion);
    }
  },
  actions: {
    fetch: function fetch(_ref2, atraccion_id) {
      var commit = _ref2.commit;
      return new Promise(function (resolve, reject) {
        axios__WEBPACK_IMPORTED_MODULE_12__["default"].get("/api/atraccions/".concat(atraccion_id, "/fetch/data")).then(function (_ref3) {
          var data = _ref3.data;
          commit('setAtraccion', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetchData: function fetchData(_ref4, datos) {
      var commit = _ref4.commit;
      return new Promise(function (resolve, reject) {
        axios__WEBPACK_IMPORTED_MODULE_12__["default"].post("/api/atraccions/fetch/data", datos).then(function (_ref5) {
          var data = _ref5.data;
          commit('setAtracciones', data.atracciones);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    guardar: function guardar(_ref6, datos) {
      var commit = _ref6.commit;
      return new Promise(function (resolve, reject) {
        if (datos.id) {
          axios__WEBPACK_IMPORTED_MODULE_12__["default"].put("/api/atraccions/".concat(datos.id), datos).then(function (_ref7) {
            var data = _ref7.data;
            if (data.result) {
              commit('update', data.atraccion);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        } else {
          axios__WEBPACK_IMPORTED_MODULE_12__["default"].post("/api/atraccions", datos).then(function (_ref8) {
            var data = _ref8.data;
            if (data.result) {
              commit('push', data.atraccion);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        }
      });
    },
    eliminar: function eliminar(_ref9, atraccion_id) {
      var commit = _ref9.commit;
      return new Promise(function (resolve, reject) {
        axios__WEBPACK_IMPORTED_MODULE_12__["default"]["delete"]("/api/atraccions/".concat(atraccion_id)).then(function (_ref10) {
          var data = _ref10.data;
          if (data.result) {
            commit('put', atraccion_id);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    cargarImagen: function cargarImagen(_ref11, _ref12) {
      var state = _ref11.state,
        commit = _ref11.commit;
      var imagenes = _ref12.imagenes;
      var formData = new FormData();
      imagenes.forEach(function (val) {
        formData.append('imagen[]', val);
      });
      formData.append('_method', 'put');
      return new Promise(function (resolve, reject) {
        axios__WEBPACK_IMPORTED_MODULE_12__["default"].post("/api/atraccions/".concat(state.atraccion.id, "/cargar/imagen"), formData, {
          headers: {
            ContentType: "multipart/form-data: boundary=something"
          }
        }).then(function (_ref13) {
          var data = _ref13.data;
          if (data.result) {
            commit('update', data.atraccion);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    eliminarImagen: function eliminarImagen(_ref14, imagen_id) {
      var state = _ref14.state,
        commit = _ref14.commit;
      return new Promise(function (resolve, reject) {
        axios__WEBPACK_IMPORTED_MODULE_12__["default"]["delete"]("/api/atraccions/".concat(state.atraccion.id, "/eliminar/imagen/").concat(imagen_id)).then(function (_ref15) {
          var data = _ref15.data;
          if (data.result) {
            commit('update', data.atraccion);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    aperturarHorario: function aperturarHorario(_ref16) {
      var state = _ref16.state,
        commit = _ref16.commit;
      return new Promise(function (resolve, reject) {
        axios__WEBPACK_IMPORTED_MODULE_12__["default"].get("/api/atraccions/".concat(state.atraccion.id, "/aperturar/horario")).then(function (_ref17) {
          var data = _ref17.data;
          if (data.result) {
            commit('update', data.atraccion);
          }
          resolve(e);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    guardarHorario: function guardarHorario(_ref18, horario) {
      var state = _ref18.state,
        commit = _ref18.commit;
      return new Promise(function (resolve, reject) {
        axios__WEBPACK_IMPORTED_MODULE_12__["default"].put("/api/atraccions/".concat(horario.model_id, "}/guardar/horario"), horario).then(function (_ref19) {
          var data = _ref19.data;
          if (data.result) {
            commit('update', data.atraccion);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    quitarHorario: function quitarHorario(_ref20, atraccion_id) {
      var commit = _ref20.commit;
      return new Promise(function (resolve, reject) {
        axios__WEBPACK_IMPORTED_MODULE_12__["default"].get("/api/atraccions/".concat(atraccion_id, "/quitar/horario")).then(function (_ref21) {
          var data = _ref21.data;
          if (data.result) {
            commit('update', data.atraccion);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    togglePortada: function togglePortada(_ref22, datos) {
      var commit = _ref22.commit;
      commit('togglePortada', {
        imagen_id: datos.imagen,
        portada: datos.portada
      });
      return new Promise(function (resolve, reject) {
        axios__WEBPACK_IMPORTED_MODULE_12__["default"].put("/api/imagens/".concat(datos.imagen, "/toggle"), datos).then(function (_ref23) {
          var data = _ref23.data;
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    getAtracciones: function getAtracciones(_ref24) {
      var commit = _ref24.commit;
      return new Promise(function (resolve, reject) {
        axios__WEBPACK_IMPORTED_MODULE_12__["default"].get("/api/atraccions/get/all").then(function (_ref25) {
          var data = _ref25.data;
          commit('setAtracciones', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetchName: function fetchName(_ref26, atraccion_name) {
      var commit = _ref26.commit;
      return new Promise(function (resolve, reject) {
        axios__WEBPACK_IMPORTED_MODULE_12__["default"].post("/api/atraccions/obtener/por-nombre", {
          nombre: atraccion_name
        }).then(function (_ref27) {
          var data = _ref27.data;
          if (data.result) {
            commit('setAtraccion', data.atraccion);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    getAtraccionesCercanas: function getAtraccionesCercanas(_ref28, atraccion_id) {
      var commit = _ref28.commit;
      return new Promise(function (resolve, reject) {
        axios__WEBPACK_IMPORTED_MODULE_12__["default"].get("/api/atraccions/".concat(atraccion_id, "/otras/cercanas")).then(function (_ref29) {
          var data = _ref29.data;
          return resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/src/store/modules/destinos/destino.js":
/*!************************************************************!*\
  !*** ./resources/js/src/store/modules/destinos/destino.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.find-index.js */ "./node_modules/core-js/modules/es.array.find-index.js");
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.for-each.js */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");









/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: function state() {
    return {
      destino: {
        id: null,
        iata_id: null,
        iata: null,
        nombre: '',
        ciudad_id: null,
        estado_id: null,
        ciudad: null,
        estado: null,
        descripcion: '',
        lat: 0,
        lng: 0,
        titulo: '',
        imagenes: [],
        atracciones: [],
        negocios: [],
        activo: false,
        about_travel: null,
        promotores: []
      },
      destinos: []
    };
  },
  getters: {
    draft: function draft(state) {
      return clone(state.destino);
    },
    getPortada: function getPortada(state) {
      var portada = state.destino.imagenes.find(function (val) {
        return val.portada;
      });
      if (portada) {
        return "/storage/destinos/imagenes/".concat(portada.imagen);
      } else {
        var primeraImagen = state.destino.imagenes[0];
        if (primeraImagen) {
          return "/storage/destinos/imagenes/".concat(primeraImagen.imagen);
        } else {
          return "/storage/destinos/imagenes/";
        }
      }
    }
  },
  mutations: {
    clear: function clear(state) {
      state.destino = {
        id: null,
        iata_id: null,
        iata: null,
        nombre: '',
        ciudad_id: null,
        estado_id: null,
        ciudad: null,
        estado: null,
        descripcion: '',
        lat: 0,
        lng: 0,
        titulo: '',
        atracciones: [],
        imagenes: [],
        negocios: [],
        activo: false,
        about_travel: null,
        promotores: []
      };
    },
    capturar: function capturar(state, destino_id) {
      if (destino_id) {
        state.destino = state.destinos.find(function (val) {
          return val.id === destino_id;
        });
      }
    },
    push: function push(state, destino) {
      state.destinos.push(destino);
    },
    put: function put(state, destino_id) {
      state.destinos.splice(state.destinos.findIndex(function (val) {
        return val.id === destino_id;
      }), 1);
    },
    update: function update(state, destino) {
      var i = state.destinos.findIndex(function (val) {
        return val.id === destino.id;
      });
      if (i != -1) {
        state.destinos[i] = destino;
      }
      if (state.destino.id === destino.id) {
        state.destino = destino;
      }
    },
    setDestino: function setDestino(state, destino) {
      state.destino = destino;
    },
    setDestinos: function setDestinos(state, destinos) {
      state.destinos = destinos;
    },
    togglePortada: function togglePortada(state, _ref) {
      var imagen_id = _ref.imagen_id,
        portada = _ref.portada;
      if (state.destino.id) {
        state.destino.imagenes.forEach(function (val) {
          return val.portada = false;
        });
        var image = state.destino.imagenes.find(function (val) {
          return val.id === imagen_id;
        });
        image.portada = portada;
      }
    }
  },
  actions: {
    fetch: function fetch(_ref2, destino_id) {
      var commit = _ref2.commit;
      return new Promise(function (resolve, reject) {
        axios__WEBPACK_IMPORTED_MODULE_8__["default"].get("/api/destinos/".concat(destino_id, "/fetch/data")).then(function (_ref3) {
          var data = _ref3.data;
          commit('setDestino', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetchName: function fetchName(_ref4, destino_name) {
      var commit = _ref4.commit;
      return new Promise(function (resolve, reject) {
        axios__WEBPACK_IMPORTED_MODULE_8__["default"].post("/api/destinos/obtener/por-nombre", {
          nombre: destino_name
        }).then(function (_ref5) {
          var data = _ref5.data;
          if (data.result) {
            commit('setDestino', data.destino);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetchData: function fetchData(_ref6, datos) {
      var commit = _ref6.commit;
      return new Promise(function (resolve, reject) {
        axios__WEBPACK_IMPORTED_MODULE_8__["default"].post("/api/destinos/fetch/data", datos).then(function (_ref7) {
          var data = _ref7.data;
          commit('setDestinos', data.destinos);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    guardar: function guardar(_ref8, datos) {
      var commit = _ref8.commit;
      return new Promise(function (resolve, reject) {
        if (datos.id) {
          axios__WEBPACK_IMPORTED_MODULE_8__["default"].put("/api/destinos/".concat(datos.id), datos).then(function (_ref9) {
            var data = _ref9.data;
            if (data.result) {
              commit('update', data.destino);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        } else {
          axios__WEBPACK_IMPORTED_MODULE_8__["default"].post("/api/destinos", datos).then(function (_ref10) {
            var data = _ref10.data;
            if (data.result) {
              commit('push', data.destino);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        }
      });
    },
    eliminar: function eliminar(_ref11, destino_id) {
      var commit = _ref11.commit;
      return new Promise(function (resolve, reject) {
        axios__WEBPACK_IMPORTED_MODULE_8__["default"]["delete"]("/api/destinos/".concat(destino_id)).then(function (_ref12) {
          var data = _ref12.data;
          if (data.result) {
            commit('put', destino_id);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    cargarImagen: function cargarImagen(_ref13, _ref14) {
      var state = _ref13.state,
        commit = _ref13.commit;
      var imagenes = _ref14.imagenes;
      var formData = new FormData();
      imagenes.forEach(function (val) {
        formData.append('imagen[]', val);
      });
      formData.append('_method', 'put');
      return new Promise(function (resolve, reject) {
        axios__WEBPACK_IMPORTED_MODULE_8__["default"].post("/api/destinos/".concat(state.destino.id, "/cargar/imagen"), formData, {
          headers: {
            ContentType: "multipart/form-data: boundary=something"
          }
        }).then(function (_ref15) {
          var data = _ref15.data;
          if (data.result) {
            commit('update', data.destino);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    eliminarImagen: function eliminarImagen(_ref16, imagen_id) {
      var state = _ref16.state,
        commit = _ref16.commit;
      return new Promise(function (resolve, reject) {
        axios__WEBPACK_IMPORTED_MODULE_8__["default"]["delete"]("/api/destinos/".concat(state.destino.id, "/eliminar/imagen/").concat(imagen_id)).then(function (_ref17) {
          var data = _ref17.data;
          if (data.result) {
            commit('update', data.destino);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    togglePortada: function togglePortada(_ref18, datos) {
      var commit = _ref18.commit;
      commit('togglePortada', {
        imagen_id: datos.imagen,
        portada: datos.portada
      });
      return new Promise(function (resolve, reject) {
        axios__WEBPACK_IMPORTED_MODULE_8__["default"].put("/api/imagens/".concat(datos.imagen, "/toggle"), datos).then(function (_ref19) {
          var data = _ref19.data;
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    getDestinos: function getDestinos(_ref20) {
      var commit = _ref20.commit;
      return new Promise(function (resolve, reject) {
        axios__WEBPACK_IMPORTED_MODULE_8__["default"].get("/api/destinos/get/all").then(function (_ref21) {
          var data = _ref21.data;
          commit('setDestinos', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    toggleActive: function toggleActive(_ref22, _ref23) {
      var commit = _ref22.commit;
      var destino = _ref23.destino,
        activo = _ref23.activo;
      return new Promise(function (resolve, reject) {
        axios__WEBPACK_IMPORTED_MODULE_8__["default"].put("/api/destinos/".concat(destino, "/toggle/active"), {
          activo: activo
        }).then(function (_ref24) {
          var data = _ref24.data;
          return resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetchDataPublic: function fetchDataPublic(_ref25, datos) {
      var commit = _ref25.commit;
      return new Promise(function (resolve, reject) {
        axios__WEBPACK_IMPORTED_MODULE_8__["default"].post('/api/destinos/fetch-data/public', datos).then(function (_ref26) {
          var data = _ref26.data;
          return resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetchPublic: function fetchPublic(_ref27, destino_id) {
      var commit = _ref27.commit;
      return new Promise(function (resolve, reject) {
        axios__WEBPACK_IMPORTED_MODULE_8__["default"].get("/api/destinos/".concat(destino_id, "/fetch/data-public")).then(function (_ref28) {
          var data = _ref28.data;
          commit('setDestino', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/src/store/modules/divisas/index.js":
/*!*********************************************************!*\
  !*** ./resources/js/src/store/modules/divisas/index.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.find-index.js */ "./node_modules/core-js/modules/es.array.find-index.js");
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_4__);





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: function state() {
    return {
      divisa: {
        id: null,
        nombre: '',
        iso: '',
        simbolo: '',
        tasa: 0,
        principal: false
      },
      divisas: []
    };
  },
  getters: {
    draft: function draft(state) {
      return clone(state.divisa);
    },
    getCurrency: function getCurrency(state) {
      return function (divisa_id) {
        var divisa = state.divisas.find(function (val) {
          return val.id === divisa_id;
        });
        if (divisa) {
          return {
            iso: divisa.iso,
            simbolo: divisa.simbolo
          };
        }
        return {
          iso: 'MXN',
          simbolo: '$'
        };
      };
    }
  },
  mutations: {
    clear: function clear(state) {
      state.divisa = {
        id: null,
        nombre: '',
        iso: '',
        simbolo: '',
        tasa: 0,
        principal: false
      };
    },
    setDivisas: function setDivisas(state, data) {
      if (data.length) {
        state.divisas = data;
      }
    },
    setDivisa: function setDivisa(state, divisa) {
      state.divisa = divisa;
    },
    push: function push(state, divisa) {
      if (divisa.id) {
        state.divisas.push(divisa);
      }
    },
    put: function put(state, divisa_id) {
      state.divisas.splice(state.divisas.findIndex(function (val) {
        return val.id === divisa_id;
      }), 1);
    },
    capturar: function capturar(state, divisa_id) {
      if (divisa_id && state.divisas.length) {
        state.divisa = state.divisas.find(function (val) {
          return val.id === divisa_id;
        });
      }
    },
    update: function update(state, divisa) {
      var i = state.divisas.findIndex(function (val) {
        return val.id === divisa.id;
      });
      if (i != -1) {
        state.divisas[i] = divisa;
        if (state.divisa.id === divisa.id) {
          state.divisa = divisa;
        }
      }
    }
  },
  actions: {
    getDivisas: function getDivisas(_ref) {
      var commit = _ref.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/divisas/get/all").then(function (_ref2) {
          var data = _ref2.data;
          commit('setDivisas', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetchData: function fetchData(_ref3, datos) {
      var commit = _ref3.commit;
      return new Promise(function (resolve, reject) {
        axios.post('/api/divisas/fetch/data', datos).then(function (_ref4) {
          var data = _ref4.data;
          commit('setDivisas', data.divisas);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetch: function fetch(_ref5, divisa_id) {
      var commit = _ref5.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/divisas/".concat(divisa_id, "/fetch")).then(function (_ref6) {
          var data = _ref6.data;
          commit('setDivisa', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    guardar: function guardar(_ref7, datos) {
      var state = _ref7.state,
        commit = _ref7.commit;
      return new Promise(function (resolve, reject) {
        if (state.divisa.id) {
          axios.put("/api/divisas/".concat(datos.id), datos).then(function (_ref8) {
            var data = _ref8.data;
            commit('update', data.divisa);
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        } else {
          axios.post("/api/divisas", datos).then(function (_ref9) {
            var data = _ref9.data;
            commit('push', data.divisa);
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        }
      });
    },
    eliminar: function eliminar(_ref10, divisa_id) {
      var commit = _ref10.commit;
      return new Promise(function (resolve, reject) {
        axios["delete"]("/api/divisas/".concat(divisa_id)).then(function (_ref11) {
          var data = _ref11.data;
          if (data.result) {
            commit('put', divisa_id);
          }
          resolve(data);
        })["catch"](function (e) {
          reject(e);
        });
      });
    },
    getPrincipal: function getPrincipal(_ref12) {
      var commit = _ref12.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/divisas/get/principal").then(function (_ref13) {
          var data = _ref13.data;
          commit('setDivisa', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/src/store/modules/estado.js":
/*!**************************************************!*\
  !*** ./resources/js/src/store/modules/estado.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.find-index.js */ "./node_modules/core-js/modules/es.array.find-index.js");
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_4__);





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: function state() {
    return {
      estado: {
        id: null,
        estado: '',
        pais_id: null,
        pais: null
      },
      estados: []
    };
  },
  getters: {
    draft: function draft(state) {
      return clone(state.estado);
    }
  },
  mutations: {
    clear: function clear(state) {
      state.estado = {
        id: null,
        estado: '',
        pais_id: null,
        pais: null
      };
    },
    setEstado: function setEstado(state, estado) {
      if (estado) {
        state.estado = estado;
      }
    },
    capturar: function capturar(state, estado_id) {
      var estado = state.estados.find(function (val) {
        return val.id === estado_id;
      });
      if (estado != undefined) {
        state.estado = estado;
      }
    },
    update: function update(state, data) {
      if (data) {
        var i = state.estados.findIndex(function (val) {
          return val.id === data.id;
        });
        if (i != -1) {
          state.estados[i] = data;
          if (state.estado.id == data.id) {
            state.estado = data;
          }
        }
      }
    },
    put: function put(state, estado_id) {
      state.estados.splice(state.estados.findIndex(function (val) {
        return val.id === estado_id;
      }), 1);
    },
    push: function push(state, estado) {
      state.estados.push(estado);
    },
    setEstados: function setEstados(state, estados) {
      state.estados = estados;
    }
  },
  actions: {
    getEstados: function getEstados(_ref) {
      var commit = _ref.commit;
      axios.get("/api/get/estados").then(function (_ref2) {
        var data = _ref2.data;
        commit('setEstados', data);
      })["catch"](function (e) {
        return console.log(e);
      });
    },
    fetchData: function fetchData(_ref3, data) {
      var commit = _ref3.commit;
      return new Promise(function (resolve, reject) {
        axios.post('/api/fetch/estados', data).then(function (_ref4) {
          var datos = _ref4.data;
          commit('setEstados', datos.estados);
          resolve(datos);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    guardar: function guardar(_ref5, datos) {
      var commit = _ref5.commit;
      return new Promise(function (resolve, reject) {
        if (datos.id) {
          axios.put("/api/estados/".concat(datos.id), datos).then(function (_ref6) {
            var data = _ref6.data;
            if (data.result) {
              commit('update', data.estado);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        } else {
          axios.post("/api/estados", datos).then(function (_ref7) {
            var data = _ref7.data;
            if (data.result) {
              commit('push', data.estado);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        }
      });
    },
    eliminar: function eliminar(_ref8, estado_id) {
      var commit = _ref8.commit;
      return new Promise(function (resolve, reject) {
        axios["delete"]("/api/estados/".concat(estado_id)).then(function (_ref9) {
          var data = _ref9.data;
          if (data.result) {
            commit('put', estado_id);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetchEstado: function fetchEstado(_ref10, estado_id) {
      var commit = _ref10.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/fetch/estado/".concat(estado_id)).then(function (_ref11) {
          var data = _ref11.data;
          commit('setEstado', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/src/store/modules/eventos/evento.js":
/*!**********************************************************!*\
  !*** ./resources/js/src/store/modules/eventos/evento.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.find-index.js */ "./node_modules/core-js/modules/es.array.find-index.js");
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.for-each.js */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");









/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: function state() {
    return {
      evento: {
        id: null,
        titulo: '',
        contenido: '',
        fecha_inicio: null,
        fecha_fin: null,
        status: 1,
        // 1 > activo 2 > vencido 3 > prorrateado
        model_id: null,
        model_type: '',
        recurrente: false,
        recurrencia: {
          dia_semana: [],
          hora_inicio: null,
          hora_fin: null,
          id_group: ''
        },
        tipo_recurrencia: 1,
        // 0 => diariamente, 1 => semanalmente, 2 => mensual , 3 => anual
        all_dia: false,
        url: '',
        model: null,
        imagenes: []
      },
      eventos: []
    };
  },
  getters: {
    draft: function draft(state) {
      return clone(state.evento);
    },
    getStatus: function getStatus(state) {
      return function (event) {
        var status = ['Activo', 'Vencido', 'Aun no inicia'];
        return status[event.status - 1];
      };
    },
    getRecurrencia: function getRecurrencia(state) {
      return function (event) {
        var tipo_recurrencia = ['Diariamente', 'Semanalmente', 'Mensual', 'Anual'];
        return tipo_recurrencia[event.tipo_recurrencia];
      };
    }
  },
  mutations: {
    clear: function clear(state) {
      state.evento = {
        id: null,
        titulo: '',
        contenido: '',
        fecha_inicio: null,
        fecha_fin: null,
        status: 1,
        // 1 > activo 2 > vencido 3 > prorrateado
        model_id: null,
        model_type: '',
        recurrente: false,
        recurrencia: {
          dia_semana: [],
          hora_inicio: null,
          hora_fin: null,
          id_group: ''
        },
        tipo_recurrencia: 1,
        // 1 => semanalmente, 2 => mensual , 3 => anual
        all_dia: false,
        url: '',
        model: null,
        imagenes: []
      };
    },
    capturar: function capturar(state, evento_id) {
      state.evento = state.eventos.find(function (val) {
        return val.id === evento_id;
      });
    },
    setEvento: function setEvento(state, evento) {
      state.evento = evento;
    },
    setEventos: function setEventos(state, eventos) {
      state.eventos = eventos;
    },
    update: function update(state, evento) {
      var i = state.eventos.findIndex(function (val) {
        return val.id === evento.id;
      });
      if (i != -1) {
        state.eventos[i] = evento;
      }
      if (state.evento.id === evento.id) {
        state.evento = evento;
      }
    },
    push: function push(state, evento) {
      state.eventos.push(evento);
    },
    put: function put(state, evento_id) {
      state.eventos.splice(state.eventos.findIndex(function (val) {
        return val.id === evento_id;
      }), 1);
    },
    togglePortada: function togglePortada(state, _ref) {
      var imagen_id = _ref.imagen_id,
        portada = _ref.portada;
      if (state.evento.id) {
        state.evento.imagenes.forEach(function (val) {
          return val.portada = false;
        });
        var image = state.evento.imagenes.find(function (val) {
          return val.id === imagen_id;
        });
        image.portada = portada;
      }
    }
  },
  actions: {
    fetch: function fetch(_ref2, evento_id) {
      var state = _ref2.state,
        commit = _ref2.commit;
      return new Promise(function (resolve, reject) {
        axios__WEBPACK_IMPORTED_MODULE_8__["default"].get("/api/eventos/".concat(evento_id, "/fetch/data")).then(function (_ref3) {
          var data = _ref3.data;
          commit('setEvento', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetchData: function fetchData(_ref4, datos) {
      var state = _ref4.state,
        commit = _ref4.commit;
      return new Promise(function (resolve, reject) {
        axios__WEBPACK_IMPORTED_MODULE_8__["default"].post("/api/eventos/fetch/data", datos).then(function (_ref5) {
          var data = _ref5.data;
          commit('setEventos', data.eventos);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetchEventos: function fetchEventos(_ref6, datos) {
      var state = _ref6.state,
        commit = _ref6.commit;
      return new Promise(function (resolve, reject) {
        axios__WEBPACK_IMPORTED_MODULE_8__["default"].post("/api/eventos/fetch/eventos", datos).then(function (_ref7) {
          var data = _ref7.data;
          commit('setEventos', data);
          resolve(data);
        })["catch"](function (e) {
          console.log(e);
          reject(e);
        });
      });
    },
    guardar: function guardar(_ref8, datos) {
      var commit = _ref8.commit;
      return new Promise(function (resolve, reject) {
        if (datos.id) {
          axios__WEBPACK_IMPORTED_MODULE_8__["default"].put("/api/eventos/".concat(datos.id), datos).then(function (_ref9) {
            var data = _ref9.data;
            if (data.result) {
              commit('update', data.evento);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        } else {
          axios__WEBPACK_IMPORTED_MODULE_8__["default"].post("/api/eventos", datos).then(function (_ref10) {
            var data = _ref10.data;
            if (data.result) {
              commit('push', data.evento);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        }
      });
    },
    eliminar: function eliminar(_ref11, evento_id) {
      var commit = _ref11.commit;
      return new Promise(function (resolve, reject) {
        axios__WEBPACK_IMPORTED_MODULE_8__["default"]["delete"]("/api/eventos/".concat(evento_id)).then(function (_ref12) {
          var data = _ref12.data;
          if (data.result) {
            commit('put', evento_id);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    cargarImagen: function cargarImagen(_ref13, _ref14) {
      var state = _ref13.state,
        commit = _ref13.commit;
      var imagenes = _ref14.imagenes;
      var formData = new FormData();
      imagenes.forEach(function (val) {
        formData.append('imagen[]', val);
      });
      formData.append('_method', 'put');
      return new Promise(function (resolve, reject) {
        axios__WEBPACK_IMPORTED_MODULE_8__["default"].post("/api/eventos/".concat(state.evento.id, "/cargar/imagen"), formData, {
          headers: {
            ContentType: "multipart/form-data: boundary=something"
          }
        }).then(function (_ref15) {
          var data = _ref15.data;
          if (data.result) {
            commit('update', data.evento);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    eliminarImagen: function eliminarImagen(_ref16, imagen_id) {
      var state = _ref16.state,
        commit = _ref16.commit;
      return new Promise(function (resolve, reject) {
        axios__WEBPACK_IMPORTED_MODULE_8__["default"]["delete"]("/api/eventos/".concat(state.evento.id, "/eliminar/imagen/").concat(imagen_id)).then(function (_ref17) {
          var data = _ref17.data;
          if (data.result) {
            commit('update', data.evento);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    togglePortada: function togglePortada(_ref18, datos) {
      var commit = _ref18.commit;
      commit('togglePortada', {
        imagen_id: datos.imagen,
        portada: datos.portada
      });
      return new Promise(function (resolve, reject) {
        axios__WEBPACK_IMPORTED_MODULE_8__["default"].put("/api/imagens/".concat(datos.imagen, "/toggle"), datos).then(function (_ref19) {
          var data = _ref19.data;
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetchDataPublic: function fetchDataPublic(_ref20, filtro) {
      var commit = _ref20.commit;
      return new Promise(function (resolve, reject) {
        axios__WEBPACK_IMPORTED_MODULE_8__["default"].post("/api/eventos/fetch-data-public", filtro).then(function (_ref21) {
          var data = _ref21.data;
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetchEventPublic: function fetchEventPublic(_ref22, event_url) {
      var commit = _ref22.commit;
      return new Promise(function (resolve, reject) {
        axios__WEBPACK_IMPORTED_MODULE_8__["default"].get("/api/eventos/fetch-data/url/".concat(event_url)).then(function (_ref23) {
          var data = _ref23.data;
          if (data.result) {
            commit('setEvento', data.evento);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/src/store/modules/faqs/index.js":
/*!******************************************************!*\
  !*** ./resources/js/src/store/modules/faqs/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js */ "./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js");
/* harmony import */ var _home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.find-index.js */ "./node_modules/core-js/modules/es.array.find-index.js");
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");








/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: function state() {
    return {
      faq: {
        id: null,
        pregunta: '',
        respuesta: '',
        categoria_id: null,
        usuario_id: null,
        categoria: null,
        usuario: null
      },
      faqs: [],
      categoria: {
        id: null,
        nombre: '',
        icono: ''
      },
      categorias: []
    };
  },
  getters: {
    draft: function draft(state) {
      return clone(state.faq);
    }
  },
  mutations: {
    // Faqs
    setFaqs: function setFaqs(state, data) {
      state.faqs = data;
    },
    clearFaq: function clearFaq(state) {
      state.faq = {
        id: null,
        pregunta: '',
        respuesta: '',
        categoria_id: null,
        usuario_id: null,
        categoria: null,
        usuario: null
      };
    },
    capturarFaq: function capturarFaq(state, faq_id) {
      var faq = state.faqs.find(function (val) {
        return val.id === faq_id;
      });
      if (faq) {
        state.faq = faq;
      }
    },
    updateFaq: function updateFaq(state, faq) {
      var i = state.faqs.findIndex(function (val) {
        return val.id === faq.id;
      });
      if (i != -1) {
        state.faqs[i] = faq;
        if (state.faq.id === faq.id) {
          state.faq = faq;
        }
      }
    },
    pushFaq: function pushFaq(state, data) {
      state.faqs.push(data);
    },
    putFaq: function putFaq(state, faq_id) {
      state.faqs.splice(state.faqs.findIndex(function (val) {
        return val.id === faq_id;
      }), 1);
    },
    // Categorias
    setCategorias: function setCategorias(state, data) {
      state.categorias = data;
    },
    clearCategoria: function clearCategoria(state) {
      state.categoria = {
        id: null,
        nombre: '',
        icono: ''
      };
    },
    capturarCategoria: function capturarCategoria(state, categoria_id) {
      var categoria = state.categorias.find(function (val) {
        return val.id === categoria_id;
      });
      if (categoria) {
        state.categoria = categoria;
      }
    },
    updateCategoria: function updateCategoria(state, categoria) {
      var i = state.categorias.findIndex(function (val) {
        return val.id === categoria.id;
      });
      if (i != -1) {
        state.categorias[i] = categoria;
        if (state.categoria.id === categoria.id) {
          state.categoria = categoria;
        }
      }
    },
    pushCategoria: function pushCategoria(state, data) {
      state.categorias.push(data);
    },
    putCategoria: function putCategoria(state, categoria_id) {
      state.categorias.splice(state.categorias.findIndex(function (val) {
        return val.id === categoria_id;
      }), 1);
    }
  },
  actions: {
    fetchFaqs: function fetchFaqs(_ref, data) {
      var state = _ref.state,
        commit = _ref.commit;
      return new Promise(function (resolve, reject) {
        commit('toggleLoading', null, {
          root: true
        });
        axios__WEBPACK_IMPORTED_MODULE_7__["default"].post('/api/faqs/fetch', data).then(function (_ref2) {
          var datos = _ref2.data;
          commit('setFaqs', datos.faqs);
          resolve(datos);
        })["catch"](function (e) {
          return reject(e);
        }).then(function () {
          return commit('toggleLoading', null, {
            root: true
          });
        });
      });
    },
    fetchCategorias: function fetchCategorias(_ref3, data) {
      var state = _ref3.state,
        commit = _ref3.commit;
      return new Promise(function (resolve, reject) {
        commit('toggleLoading', null, {
          root: true
        });
        axios__WEBPACK_IMPORTED_MODULE_7__["default"].post('/api/faqs/categorias/fetch', data).then(function (_ref4) {
          var datos = _ref4.data;
          resolve(datos);
          commit('setCategorias', datos.categorias);
        })["catch"](function (e) {
          return reject(e);
        }).then(function () {
          return commit('toggleLoading', null, {
            root: true
          });
        });
      });
    },
    guardarFaq: function guardarFaq(_ref5, data) {
      var commit = _ref5.commit;
      return new Promise(function (resolve, reject) {
        commit('toggleLoading', null, {
          root: true
        });
        if (data.id) {
          axios__WEBPACK_IMPORTED_MODULE_7__["default"].put("/api/faqs/".concat(data.id), data).then(function (_ref6) {
            var datos = _ref6.data;
            commit('updateFaq', datos.faq);
            resolve(datos);
          })["catch"](function (e) {
            return reject(e);
          }).then(function () {
            commit('toggleLoading', null, {
              root: true
            });
          });
        } else {
          axios__WEBPACK_IMPORTED_MODULE_7__["default"].post("/api/faqs", data).then(function (_ref7) {
            var datos = _ref7.data;
            commit('pushFaq', datos.faq);
            resolve(datos);
          })["catch"](function (e) {
            return reject(e);
          }).then(function () {
            commit('toggleLoading', null, {
              root: true
            });
          });
        }
      });
    },
    guardarCategoria: function guardarCategoria(_ref8, data) {
      var commit = _ref8.commit;
      return new Promise(function (resolve, reject) {
        commit('toggleLoading', null, {
          root: true
        });
        if (data.id) {
          axios__WEBPACK_IMPORTED_MODULE_7__["default"].put("/api/faqs/faqs-categorias/".concat(data.id), data).then(function (_ref9) {
            var datos = _ref9.data;
            commit('updateCategoria', datos.categoria);
            resolve(datos);
          })["catch"](function (e) {
            return reject(e);
          }).then(function () {
            commit('toggleLoading', null, {
              root: true
            });
          });
        } else {
          axios__WEBPACK_IMPORTED_MODULE_7__["default"].post("/api/faqs/faqs-categorias", data).then(function (_ref10) {
            var datos = _ref10.data;
            commit('pushCategoria', datos.categoria);
            resolve(datos);
          })["catch"](function (e) {
            return reject(e);
          }).then(function () {
            commit('toggleLoading', null, {
              root: true
            });
          });
        }
      });
    },
    eliminarFaq: function eliminarFaq(_ref11, data_id) {
      var commit = _ref11.commit;
      return new Promise(function (resolve, reject) {
        commit('toggleLoading', null, {
          root: true
        });
        axios__WEBPACK_IMPORTED_MODULE_7__["default"]["delete"]("/api/faqs/".concat(data_id)).then(function (_ref12) {
          var datos = _ref12.data;
          if (datos.result) {
            commit('putFaq', data_id);
            resolve(datos);
          }
        })["catch"](function (e) {
          reject(e);
        }).then(function () {
          return commit('toggleLoading', null, {
            root: true
          });
        });
      });
    },
    eliminarCategoria: function eliminarCategoria(_ref13, data_id) {
      var commit = _ref13.commit;
      return new Promise(function (resolve, reject) {
        commit('toggleLoading', null, {
          root: true
        });
        axios__WEBPACK_IMPORTED_MODULE_7__["default"]["delete"]("/api/faqs/faqs-categorias/".concat(data_id)).then(function (_ref14) {
          var datos = _ref14.data;
          if (datos.result) {
            commit('putCategoria', data_id);
            resolve(datos);
          }
        })["catch"](function (e) {
          reject(e);
        }).then(function () {
          return commit('toggleLoading', null, {
            root: true
          });
        });
      });
    },
    cargarCategorias: function cargarCategorias(_ref15) {
      return (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/(0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee() {
        var commit;
        return (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              commit = _ref15.commit;
              _context.next = 3;
              return new Promise(function (resolve, reject) {
                commit('toggleLoading', null, {
                  root: true
                });
                axios__WEBPACK_IMPORTED_MODULE_7__["default"].get('/api/faqs/categorias/get/all').then(function (_ref16) {
                  var data = _ref16.data;
                  commit('setCategorias', data);
                  resolve(data);
                })["catch"](function (e) {
                  return reject(e);
                }).then(function () {
                  commit('toggleLoading', null, {
                    root: true
                  });
                });
              });
            case 3:
              return _context.abrupt("return", _context.sent);
            case 4:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    },
    cargarCategoria: function cargarCategoria(_ref17, categoria_id) {
      return (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/(0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee2() {
        var commit;
        return (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              commit = _ref17.commit;
              _context2.next = 3;
              return new Promise(function (resolve, reject) {
                commit('toggleLoading', null, {
                  root: true
                });
                axios__WEBPACK_IMPORTED_MODULE_7__["default"].get("/api/faqs/categorias/".concat(categoria_id, "/get")).then(function (_ref18) {
                  var data = _ref18.data;
                  commit('pushCategoria', data);
                  resolve(data);
                })["catch"](function (e) {
                  return reject(e);
                }).then(function () {
                  commit('toggleLoading', null, {
                    root: true
                  });
                });
              });
            case 3:
              return _context2.abrupt("return", _context2.sent);
            case 4:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }))();
    },
    getFaq: function getFaq(_ref19, faq_id) {
      return (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/(0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee3() {
        var commit;
        return (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              commit = _ref19.commit;
              _context3.next = 3;
              return new Promise(function (resolve, reject) {
                commit('toggleLoading', null, {
                  root: true
                });
                axios__WEBPACK_IMPORTED_MODULE_7__["default"].get("/api/faqs/".concat(faq_id, "/get")).then(function (_ref20) {
                  var data = _ref20.data;
                  resolve(data);
                  commit('pushFaq', data);
                })["catch"](function (e) {
                  return reject(e);
                }).then(function () {
                  commit('toggleLoading', null, {
                    root: true
                  });
                });
              });
            case 3:
              return _context3.abrupt("return", _context3.sent);
            case 4:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }))();
    },
    getCategorias: function getCategorias(_ref21, search) {
      return (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/(0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee4() {
        var commit;
        return (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              commit = _ref21.commit;
              _context4.next = 3;
              return new Promise(function (resolve, reject) {
                commit('toggleLoading', null, {
                  root: true
                });
                axios__WEBPACK_IMPORTED_MODULE_7__["default"].post('/api/cargar/categorias', {
                  q: search
                }).then(function (_ref22) {
                  var data = _ref22.data;
                  resolve(data);
                })["catch"](function (e) {
                  return reject(e);
                }).then(function () {
                  return commit('toggleLoading', null, {
                    root: true
                  });
                });
              });
            case 3:
              return _context4.abrupt("return", _context4.sent);
            case 4:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }))();
    }
  }
});

/***/ }),

/***/ "./resources/js/src/store/modules/formasPago.js":
/*!******************************************************!*\
  !*** ./resources/js/src/store/modules/formasPago.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.find-index.js */ "./node_modules/core-js/modules/es.array.find-index.js");
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_4__);





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: function state() {
    return {
      forma: {
        id: null,
        nombre: '',
        negocios: []
      },
      formas: []
    };
  },
  getters: {
    draft: function draft(state) {
      return clone(state.forma);
    }
  },
  mutations: {
    clear: function clear(state) {
      state.forma = {
        id: null,
        nombre: '',
        negocios: []
      };
    },
    setFormas: function setFormas(state, formas) {
      state.formas = formas;
    },
    setForma: function setForma(state, forma) {
      state.forma = forma;
    },
    capturar: function capturar(state, forma_id) {
      var forma = state.formas.find(function (val) {
        return val.id === forma_id;
      });
      if (forma) {
        state.forma = forma;
      }
    },
    push: function push(state, forma) {
      state.formas.push(forma);
    },
    put: function put(state, forma_id) {
      state.formas.splice(state.formas.findIndex(function (val) {
        return val.id === forma_id;
      }), 1);
    },
    update: function update(state, forma) {
      var i = state.formas.findIndex(function (val) {
        return val.id === forma.id;
      });
      if (i != -1) {
        state.formas[i] = forma;
      }
      if (state.forma == forma.id) {
        state.forma = forma;
      }
    }
  },
  actions: {
    getFormas: function getFormas(_ref) {
      var commit = _ref.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/formas-pago/get/all").then(function (_ref2) {
          var data = _ref2.data;
          commit('setFormas', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetchData: function fetchData(_ref3, data) {
      var commit = _ref3.commit;
      return new Promise(function (resolve, reject) {
        axios.post('/api/formas-pago/fetch/data', data).then(function (_ref4) {
          var datos = _ref4.data;
          commit('setFormas', datos.formas);
          resolve(datos);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    guardar: function guardar(_ref5, datos) {
      var commit = _ref5.commit;
      return new Promise(function (resolve, reject) {
        if (datos.id) {
          axios.put("/api/formas-pago/".concat(datos.id), datos).then(function (_ref6) {
            var data = _ref6.data;
            if (data.result) {
              commit('update', data.forma);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        } else {
          axios.post("/api/formas-pago", datos).then(function (_ref7) {
            var data = _ref7.data;
            if (data.result) {
              commit('push', data.forma);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        }
      });
    },
    eliminar: function eliminar(_ref8, forma_id) {
      var commit = _ref8.commit;
      return new Promise(function (resolve, reject) {
        axios["delete"]("/api/formas-pago/".concat(forma_id)).then(function (_ref9) {
          var data = _ref9.data;
          if (data.result) {
            commit('put', forma_id);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetch: function fetch(_ref10, forma_id) {
      var commit = _ref10.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/formas-pago/".concat(forma_id, "/fetch/data")).then(function (_ref11) {
          var data = _ref11.data;
          commit('setForma', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/src/store/modules/iatas/iata.js":
/*!******************************************************!*\
  !*** ./resources/js/src/store/modules/iatas/iata.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.find-index.js */ "./node_modules/core-js/modules/es.array.find-index.js");
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_4__);





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: function state() {
    return {
      iata: {
        id: null,
        codigo: null,
        aeropuerto: '',
        ciudad_id: null,
        estado_id: null,
        ciudad: null,
        estado: null
      },
      iatas: []
    };
  },
  getters: {
    draft: function draft(state) {
      return clone(state.iata);
    }
  },
  mutations: {
    clear: function clear(state) {
      state.iata = {
        id: null,
        codigo: null,
        aeropuerto: '',
        ciudad_id: null,
        estado_id: null,
        ciudad: null,
        estado: null
      };
    },
    setIatas: function setIatas(state, iatas) {
      state.iatas = iatas;
    },
    setIata: function setIata(state, iata) {
      state.iata = iata;
    },
    capturar: function capturar(state, iata_id) {
      state.iata = state.iatas.find(function (val) {
        return val.id === iata_id;
      });
    },
    push: function push(state, iata) {
      state.iatas.push(iata);
    },
    put: function put(state, iata_id) {
      state.iatas.splice(state.iatas.findIndex(function (val) {
        return val.id === iata_id;
      }), 1);
    },
    update: function update(state, iata) {
      var i = state.iatas.findIndex(function (val) {
        return val.id === iata.id;
      });
      if (i != -1) {
        state.iatas[i] = iata;
        if (state.iata == iata.id) {
          state.iata = iata;
        }
      }
    }
  },
  actions: {
    getIatas: function getIatas(_ref) {
      var commit = _ref.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/iatas/get/all").then(function (_ref2) {
          var data = _ref2.data;
          commit('setIatas', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetchData: function fetchData(_ref3, data) {
      var commit = _ref3.commit;
      return new Promise(function (resolve, reject) {
        axios.post('/api/iatas/fetch/data', data).then(function (_ref4) {
          var datos = _ref4.data;
          commit('setIatas', datos.iatas);
          resolve(datos);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    guardar: function guardar(_ref5, datos) {
      var commit = _ref5.commit;
      return new Promise(function (resolve, reject) {
        if (datos.id) {
          axios.put("/api/iatas/".concat(datos.id), datos).then(function (_ref6) {
            var data = _ref6.data;
            if (data.result) {
              commit('update', data.iata);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        } else {
          axios.post("/api/iatas", datos).then(function (_ref7) {
            var data = _ref7.data;
            if (data.result) {
              commit('push', data.iata);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        }
      });
    },
    eliminar: function eliminar(_ref8, iata_id) {
      var commit = _ref8.commit;
      return new Promise(function (resolve, reject) {
        axios["delete"]("/api/iatas/".concat(iata_id)).then(function (_ref9) {
          var data = _ref9.data;
          if (data.result) {
            commit('put', iata_id);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetch: function fetch(_ref10, iata_id) {
      var commit = _ref10.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/iatas/".concat(iata_id, "/fetch/data")).then(function (_ref11) {
          var data = _ref11.data;
          commit('setIata', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/src/store/modules/lote.js":
/*!************************************************!*\
  !*** ./resources/js/src/store/modules/lote.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.find-index.js */ "./node_modules/core-js/modules/es.array.find-index.js");
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_4__);





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: function state() {
    return {
      lote: {
        id: null,
        fecha_llegada: '',
        cantidad: 1,
        numero_inicial: '00001',
        numero_final: null,
        monto: null,
        divisa_id: null,
        codigo_lada: null,
        tps: 5,
        divisa: null,
        usuario_id: null,
        usuario: null
      },
      lotes: []
    };
  },
  getters: {
    draft: function draft(state) {
      return clone(state.lote);
    }
  },
  mutations: {
    clear: function clear(state) {
      state.lote = {
        id: null,
        fecha_llegada: '',
        cantidad: 1,
        numero_inicial: '00001',
        numero_final: null,
        codigo_lada: null,
        monto: null,
        divisa_id: null,
        tps: 5,
        divisa: null,
        usuario_id: null,
        usuario: null
      };
    },
    setLote: function setLote(state, lote) {
      if (lote) {
        state.lote = lote;
      }
    },
    capturar: function capturar(state, lote_id) {
      var lote = state.lotes.find(function (val) {
        return val.id === lote_id;
      });
      if (lote != undefined) {
        state.lote = lote;
      }
    },
    update: function update(state, data) {
      if (data) {
        var i = state.lotes.findIndex(function (val) {
          return val.id === data.id;
        });
        if (i != -1) {
          state.lotes[i] = data;
        }
        if (state.lote.id == data.id) {
          state.lote = data;
        }
      }
    },
    put: function put(state, lote_id) {
      state.lotes.splice(state.lotes.findIndex(function (val) {
        return val.id === lote_id;
      }), 1);
    },
    push: function push(state, lote) {
      state.lotes.push(lote);
    },
    setLotes: function setLotes(state, lotes) {
      state.lotes = lotes;
    }
  },
  actions: {
    getLotes: function getLotes(_ref) {
      var commit = _ref.commit;
      axios.get("/api/get/lotes").then(function (_ref2) {
        var data = _ref2.data;
        commit('setLotes', data);
      })["catch"](function (e) {
        return console.log(e);
      });
    },
    fetchData: function fetchData(_ref3, data) {
      var commit = _ref3.commit;
      return new Promise(function (resolve, reject) {
        axios.post('/api/fetch/lotes', data).then(function (_ref4) {
          var datos = _ref4.data;
          commit('setLotes', datos.lotes);
          resolve(datos);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    guardar: function guardar(_ref5, datos) {
      var commit = _ref5.commit;
      return new Promise(function (resolve, reject) {
        if (datos.id) {
          axios.put("/api/lotes/".concat(datos.id), datos).then(function (_ref6) {
            var data = _ref6.data;
            if (data.result) {
              commit('update', data.lote);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        } else {
          axios.post("/api/lotes", datos).then(function (_ref7) {
            var data = _ref7.data;
            if (data.result) {
              commit('push', data.lote);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        }
      });
    },
    eliminar: function eliminar(_ref8, lote_id) {
      var commit = _ref8.commit;
      return new Promise(function (resolve, reject) {
        axios["delete"]("/api/lotes/".concat(lote_id)).then(function (_ref9) {
          var data = _ref9.data;
          if (data.result) {
            commit('put', lote_id);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetch: function fetch(_ref10, lote_id) {
      var commit = _ref10.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/fetch/lote/".concat(lote_id)).then(function (_ref11) {
          var data = _ref11.data;
          commit('setLote', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    asociarLote: function asociarLote(_ref12, form) {
      var commit = _ref12.commit,
        state = _ref12.state;
      return new Promise(function (resolve, reject) {
        axios.put("/api/lotes/".concat(state.lote.id, "/asociar/lote"), form).then(function (_ref13) {
          var data = _ref13.data;
          if (data.result) {
            commit('update', data.lote);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/src/store/modules/negocio/cargo.js":
/*!*********************************************************!*\
  !*** ./resources/js/src/store/modules/negocio/cargo.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty.js */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.find-index.js */ "./node_modules/core-js/modules/es.array.find-index.js");
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_5__);






/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: function state() {
    return {
      cargo: {
        id: null,
        cargo: '',
        negocio_id: null,
        negocio: null,
        permisos: []
      },
      cargos: []
    };
  },
  getters: {
    draft: function draft(state) {
      return clone(state.cargo);
    }
  },
  mutations: {
    clear: function clear(state) {
      state.cargo = {
        id: null,
        cargo: '',
        negocio_id: null,
        negocio: null,
        permisos: []
      };
    },
    setCargos: function setCargos(state, cargos) {
      state.cargos = cargos;
    },
    setCargo: function setCargo(state, cargo) {
      state.cargo = cargo;
    },
    capturar: function capturar(state, cargo_id) {
      var cargo = state.cargos.find(function (val) {
        return val.id === cargo_id;
      });
      if (cargo) {
        state.cargo = cargo;
      }
    },
    push: function push(state, cargo) {
      state.cargos.push(cargo);
    },
    put: function put(state, cargo_id) {
      state.cargos.splice(state.cargos.findIndex(function (val) {
        return val.id === cargo_id;
      }), 1);
    },
    update: function update(state, cargo) {
      var i = state.cargos.findIndex(function (val) {
        return val.id === cargo.id;
      });
      if (i != -1) {
        state.cargos[i] = cargo;
        if (state.cargo == cargo.id) {
          state.cargo = cargo;
        }
      }
    }
  },
  actions: (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    getCargos: function getCargos(_ref) {
      var commit = _ref.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/cargos/get/all").then(function (_ref2) {
          var data = _ref2.data;
          commit('setCargos', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetchData: function fetchData(_ref3, datos) {
      var commit = _ref3.commit;
      return new Promise(function (resolve, reject) {
        axios.post('/api/cargos/fetch/data', datos).then(function (_ref4) {
          var data = _ref4.data;
          commit('setCargos', data.cargos);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetch: function fetch(_ref5, cargo_id) {
      var commit = _ref5.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/cargos/".concat(cargo_id, "/fetch/data")).then(function (_ref6) {
          var data = _ref6.data;
          if (data.id) {
            commit('setCargo', data);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    guardar: function guardar(_ref7, datos) {
      var commit = _ref7.commit;
      return new Promise(function (resolve, reject) {
        if (datos.id) {
          axios.put("/api/cargos/".concat(datos.id), datos).then(function (_ref8) {
            var data = _ref8.data;
            if (data.result) {
              commit('update', data.cargo);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        } else {
          axios.post("/api/cargos", datos).then(function (_ref9) {
            var data = _ref9.data;
            if (data.result) {
              commit('push', data.cargo);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        }
      });
    },
    eliminar: function eliminar(_ref10, cargo_id) {
      var commit = _ref10.commit;
      return new Promise(function (resolve, reject) {
        axios["delete"]("/api/cargos/".concat(cargo_id)).then(function (_ref11) {
          var data = _ref11.data;
          if (data.result) {
            commit('put', cargo_id);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    }
  }, "fetch", function fetch(_ref12, cargo_id) {
    var commit = _ref12.commit;
    return new Promise(function (resolve, reject) {
      axios.get("/api/cargos/".concat(cargo_id, "/fetch/data")).then(function (_ref13) {
        var data = _ref13.data;
        commit('setCargo', data);
        resolve(data);
      })["catch"](function (e) {
        return reject(e);
      });
    });
  })
});

/***/ }),

/***/ "./resources/js/src/store/modules/negocio/empleado.js":
/*!************************************************************!*\
  !*** ./resources/js/src/store/modules/negocio/empleado.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.for-each.js */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.map.js */ "./node_modules/core-js/modules/es.array.map.js");
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.object.keys.js */ "./node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.array.find-index.js */ "./node_modules/core-js/modules/es.array.find-index.js");
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_8__);









/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: function state() {
    return {
      empleado: {
        id: null,
        usuario_id: null,
        negocio_id: null,
        cargo_id: null,
        usuario: null,
        negocio: null,
        cargo: null,
        permisos: []
      },
      empleados: []
    };
  },
  getters: {
    draft: function draft(state) {
      return clone(state.empleado);
    },
    permissionsUser: function permissionsUser(state) {
      return function (_ref) {
        var permisos = _ref.permisos,
          userPermisos = _ref.userPermisos;
        var permissions = [];
        permisos.forEach(function (val) {
          return permissions.push(val.permiso);
        });
        return permissions.map(function (val) {
          var actions = null;
          if (userPermisos) {
            var permis = userPermisos.find(function (va) {
              return va.id == val.id;
            });
            actions = permis ? JSON.parse(permis.pivot.action) : null;
          }
          return {
            module: val.nombre,
            read: actions ? actions.find(function (v) {
              return v == 'read';
            }) ? true : false : true,
            write: actions ? actions.find(function (v) {
              return v == 'write';
            }) ? true : false : true,
            update: actions ? actions.find(function (v) {
              return v == 'update';
            }) ? true : false : true,
            "delete": actions ? actions.find(function (v) {
              return v == 'delete';
            }) ? true : false : true
          };
        });
      };
    }
  },
  mutations: {
    clear: function clear(state) {
      state.empleado = {
        id: null,
        usuario_id: null,
        negocio_id: null,
        cargo_id: null,
        usuario: null,
        negocio: null,
        cargo: null,
        permisos: []
      };
    },
    setEmpleados: function setEmpleados(state, empleados) {
      state.empleados = empleados;
    },
    setEmpleado: function setEmpleado(state, empleado) {
      state.empleado = empleado;
    },
    capturar: function capturar(state, empleado_id) {
      var empleado = state.empleados.find(function (val) {
        return val.id === empleado_id;
      });
      if (empleado) {
        state.empleado = empleado;
      }
    },
    push: function push(state, empleado) {
      state.empleados.push(empleado);
    },
    put: function put(state, empleado_id) {
      state.empleados.splice(state.empleados.findIndex(function (val) {
        return val.id === empleado_id;
      }), 1);
    },
    update: function update(state, empleado) {
      var i = state.empleados.findIndex(function (val) {
        return val.id === empleado.id;
      });
      if (i != -1) {
        state.empleados[i] = empleado;
        if (state.empleado == empleado.id) {
          state.empleado = empleado;
        }
      }
    }
  },
  actions: {
    getEmpleados: function getEmpleados(_ref2) {
      var commit = _ref2.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/empleados/get/all").then(function (_ref3) {
          var data = _ref3.data;
          commit('setEmpleados', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetchData: function fetchData(_ref4, datos) {
      var commit = _ref4.commit;
      return new Promise(function (resolve, reject) {
        axios.post('/api/empleados/fetch/data', datos).then(function (_ref5) {
          var data = _ref5.data;
          commit('setEmpleados', data.empleados);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetch: function fetch(_ref6, empleado_id) {
      var commit = _ref6.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/empleados/".concat(empleado_id, "/fetch/data")).then(function (_ref7) {
          var data = _ref7.data;
          if (data.id) {
            commit('setEmpleado', data);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    guardar: function guardar(_ref8, datos) {
      var commit = _ref8.commit;
      return new Promise(function (resolve, reject) {
        if (datos.id) {
          axios.put("/api/empleados/".concat(datos.id), datos).then(function (_ref9) {
            var data = _ref9.data;
            if (data.result) {
              commit('update', data.empleado);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        } else {
          axios.post("/api/empleados", datos).then(function (_ref10) {
            var data = _ref10.data;
            if (data.result) {
              commit('push', data.empleado);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        }
      });
    },
    eliminar: function eliminar(_ref11, empleado_id) {
      var commit = _ref11.commit;
      return new Promise(function (resolve, reject) {
        axios["delete"]("/api/empleados/".concat(empleado_id)).then(function (_ref12) {
          var data = _ref12.data;
          if (data.result) {
            commit('put', empleado_id);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/src/store/modules/negocios/categorias/index.js":
/*!*********************************************************************!*\
  !*** ./resources/js/src/store/modules/negocios/categorias/index.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js */ "./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js");
/* harmony import */ var _home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.find-index.js */ "./node_modules/core-js/modules/es.array.find-index.js");
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.array.for-each.js */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.object.keys.js */ "./node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_9__);










/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: function state() {
    return {
      categoria: {
        id: null,
        categoria: '',
        descripcion: '',
        imagen: null
      },
      categorias: []
    };
  },
  getters: {
    draft: function draft(state) {
      return clone(state.categoria);
    }
  },
  mutations: {
    setCategorias: function setCategorias(state, data) {
      state.categorias = data;
    },
    clear: function clear(state) {
      state.categoria = {
        id: null,
        categoria: '',
        descripcion: '',
        imagen: null
      };
    },
    push: function push(state, data) {
      state.categorias.push(data);
    },
    put: function put(state, data_id) {
      state.categorias.splice(state.categorias.findIndex(function (val) {
        return val.id === data_id;
      }), 1);
    },
    capturar: function capturar(state, data_id) {
      var categoria = state.categorias.find(function (val) {
        return val.id === data_id;
      });
      if (categoria) {
        state.categoria = categoria;
      }
    },
    update: function update(state, data) {
      var i = state.categorias.findIndex(function (val) {
        return val.id === data.id;
      });
      if (i != -1) {
        state.categorias[i] = data;
        if (state.categoria.id === data.id) {
          state.categoria = data;
        }
      }
    }
  },
  actions: {
    fetchData: function fetchData(_ref, data) {
      var commit = _ref.commit;
      return new Promise(function (resolve, reject) {
        commit('toggleLoading', null, {
          root: true
        });
        axios.post("/api/negocio/categorias/fetch/data", data).then(function (_ref2) {
          var datos = _ref2.data;
          resolve(datos);
          commit('setCategorias', datos.categorias);
        })["catch"](function (e) {
          return reject(e);
        }).then(function () {
          return commit('toggleLoading', null, {
            root: true
          });
        });
      });
    },
    guardar: function guardar(_ref3, data) {
      var commit = _ref3.commit;
      return new Promise(function (resolve, reject) {
        commit('toggleLoading', null, {
          root: true
        });
        var formData = new FormData();
        Object.keys(data).forEach(function (val) {
          formData.append(val, data[val]);
        });
        if (data.id) {
          formData.append("_method", 'put');
          axios.post("/api/negocio/categorias/".concat(data.id), formData, {
            headers: {
              ContentType: "multipart/form-data; boundary=something"
            }
          }).then(function (_ref4) {
            var datos = _ref4.data;
            if (datos.result) {
              commit('update', datos.categoria);
            }
            resolve(datos);
          })["catch"](function (e) {
            return reject(e);
          }).then(function () {
            return commit('toggleLoading', null, {
              root: true
            });
          });
        } else {
          axios.post("/api/negocio/categorias", formData, {
            headers: {
              ContentType: "multipart/form-data; boundary=something"
            }
          }).then(function (_ref5) {
            var datos = _ref5.data;
            if (datos.result) {
              commit('push', datos.categoria);
            }
            resolve(datos);
          })["catch"](function (e) {
            return reject(e);
          }).then(function () {
            return commit('toggleLoading', null, {
              root: true
            });
          });
        }
      });
    },
    eliminar: function eliminar(_ref6, data_id) {
      var commit = _ref6.commit;
      return new Promise(function (resolve, reject) {
        commit('toggleLoading', null, {
          root: true
        });
        axios["delete"]("/api/negocio/categorias/".concat(data_id)).then(function (_ref7) {
          var data = _ref7.data;
          if (data.result) {
            commit('put', data_id);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        }).then(function () {
          return commit('toggleLoading', null, {
            root: true
          });
        });
      });
    },
    getCategoria: function getCategoria(_ref8, data_id) {
      return (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/(0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee() {
        var commit;
        return (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              commit = _ref8.commit;
              _context.next = 3;
              return new Promise(function (resolve, reject) {
                commit('toggleLoading', null, {
                  root: true
                });
                axios.get("/api/negocio/categorias/".concat(data_id, "/get")).then(function (_ref9) {
                  var data = _ref9.data;
                  commit('push', data);
                  resolve(data);
                })["catch"](function (e) {
                  return reject(e);
                }).then(function () {
                  commit('toggleLoading', null, {
                    root: true
                  });
                });
              });
            case 3:
              return _context.abrupt("return", _context.sent);
            case 4:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    },
    getCategorias: function getCategorias(_ref10) {
      return (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/(0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee2() {
        var commit;
        return (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              commit = _ref10.commit;
              _context2.next = 3;
              return new Promise(function (resolve, reject) {
                commit('toggleLoading', null, {
                  root: true
                });
                axios.get("/api/negocio/categorias/get/all").then(function (_ref11) {
                  var data = _ref11.data;
                  commit('setCategorias', data);
                  resolve(data);
                })["catch"](function (e) {
                  console.log(e);
                }).then(function () {
                  commit('toggleLoading', null, {
                    root: true
                  });
                });
              });
            case 3:
              return _context2.abrupt("return", _context2.sent);
            case 4:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }))();
    }
  }
});

/***/ }),

/***/ "./resources/js/src/store/modules/negocios/horarioReservacion/horario.js":
/*!*******************************************************************************!*\
  !*** ./resources/js/src/store/modules/negocios/horarioReservacion/horario.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.find-index.js */ "./node_modules/core-js/modules/es.array.find-index.js");
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_4__);





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: function state() {
    return {
      horario: {
        id: null,
        negocio_id: null,
        dia: 0,
        hora: null,
        condicion: 1,
        negocio: null,
        mesas: [],
        lugares: 0,
        floor_plan: false
      },
      horarios: []
    };
  },
  getters: {
    draft: function draft(state) {
      return clone(state.horario);
    }
  },
  mutations: {
    clear: function clear(state) {
      state.horario = {
        id: null,
        negocio_id: null,
        dia: 0,
        hora: null,
        condicion: 1,
        negocio: null,
        mesas: [],
        lugares: 0,
        floor_plan: false
      };
    },
    setHorario: function setHorario(state, horario) {
      state.horario = horario;
    },
    update: function update(state, horario) {
      var i = state.horarios.findIndex(function (val) {
        return val.id === horario.id;
      });
      if (i != -1) {
        state.horarios[i] = horario;
      }
      if (state.horario.id === horario.id) {
        state.horario = horario;
      }
    },
    push: function push(state, horario) {
      state.horarios.push(horario);
    },
    put: function put(state, horario_id) {
      state.horarios.splice(state.horarios.findIndex(function (val) {
        return val.id === horario_id;
      }), 1);
    },
    capturar: function capturar(state, horario_id) {
      var horario = state.horarios.find(function (val) {
        return val.id === horario_id;
      });
      if (horario != undefined) {
        state.horario = horario;
      }
    },
    setHorarios: function setHorarios(state, horarios) {
      state.horarios = horarios;
    }
  },
  actions: {
    getHorarios: function getHorarios(_ref) {
      var commit = _ref.commit;
      return new Promise(function (resolve, reject) {
        axios.get('/api/horarios/get/all').then(function (_ref2) {
          var data = _ref2.data;
          commit('setHorarios', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    getHorariosNegocio: function getHorariosNegocio(_ref3, negocio_id) {
      var commit = _ref3.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/horario-reservacion/negocio/".concat(negocio_id, "/get/all")).then(function (_ref4) {
          var data = _ref4.data;
          commit('setHorarios', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetchData: function fetchData(_ref5, datos) {
      var state = _ref5.state,
        commit = _ref5.commit;
      return new Promise(function (resolve, reject) {
        axios.post("/api/horarios/fetch/data", datos).then(function (_ref6) {
          var data = _ref6.data;
          commit('setHorarios', data.horarios);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetch: function fetch(_ref7, horario_id) {
      var state = _ref7.state,
        commit = _ref7.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/horarios/".concat(horario_id, "/fetch/data")).then(function (_ref8) {
          var data = _ref8.data;
          commit('setHorario', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    guardar: function guardar(_ref9, datos) {
      var commit = _ref9.commit;
      return new Promise(function (resolve, reject) {
        if (datos.id) {
          axios.put("/api/horario-reservacion/".concat(datos.id), datos).then(function (_ref10) {
            var data = _ref10.data;
            if (data.result) {
              commit('update', data.horario);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        } else {
          axios.post("/api/horario-reservacion", datos).then(function (_ref11) {
            var data = _ref11.data;
            if (data.result) {
              commit('push', data.horario);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        }
      });
    },
    eliminar: function eliminar(_ref12, horario_id) {
      var commit = _ref12.commit;
      return new Promise(function (resolve, reject) {
        axios["delete"]("/api/horario-reservacion/".concat(horario_id)).then(function (_ref13) {
          var data = _ref13.data;
          if (data.result) {
            commit('setHorarios', data.horarios);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    agregarHorario: function agregarHorario(_ref14, datos) {
      var commit = _ref14.commit;
      return new Promise(function (resolve, reject) {
        axios.post('/api/horarios/asignar/horario', datos).then(function (_ref15) {
          var data = _ref15.data;
          if (data.result) {
            commit('setHorarios', data.horarios);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/src/store/modules/negocios/index.js":
/*!**********************************************************!*\
  !*** ./resources/js/src/store/modules/negocios/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.filter.js */ "./node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.map.js */ "./node_modules/core-js/modules/es.array.map.js");
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_reduce_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.reduce.js */ "./node_modules/core-js/modules/es.array.reduce.js");
/* harmony import */ var core_js_modules_es_array_reduce_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_reduce_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.find-index.js */ "./node_modules/core-js/modules/es.array.find-index.js");
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.array.for-each.js */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.object.keys.js */ "./node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_12__);













/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: function state() {
    return {
      negocio: {
        id: null,
        nombre: '',
        descripcion: '',
        breve: '',
        categoria_id: null,
        comision: 0,
        tipo_comision: 1,
        // 1 Porcentaje por venta, 2 Monto por Venta 
        url: '',
        sitio_web: '',
        emails: [],
        direccion: '',
        codigo_postal: null,
        ciudad_id: null,
        estado_id: null,
        lat: 0,
        lng: 0,
        logo: null,
        vistas: 0,
        ultima_recarga: null,
        floor_plan: false,
        acepta_reservas: false,
        status: 1,
        // 1 => activo , 2 => vacaciones, 3 => fuera de servicio
        usuario_id: null,
        solicitud_id: null,
        divisa_id: null,
        iata_id: null,
        iata: null,
        tipo_menu: null,
        menu: null,
        imagenes: [],
        telefonos: [],
        eventos: [],
        cuenta: null,
        horarios: [],
        amenidades: [],
        formas_pago: [],
        precios: [],
        redes: [],
        videos: [],
        ventas: [],
        reservaciones: [],
        opinions: [],
        modelType: 'App\\Models\\Negocio\\Negocio',
        recomendaciones: [],
        seguidores: [],
        tps_referido: 0
      },
      negocios: []
    };
  },
  getters: {
    draft: function draft(state) {
      return clone(state.negocio);
    },
    diasAbiertos: function diasAbiertos(state) {
      var diasAbiertos = state.negocio.horarios.filter(function (val) {
        return val.apertura && val.cierre;
      });
      var dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
      return diasAbiertos.map(function (val) {
        return {
          dia: val.dia,
          label: dias[val.dia - 1]
        };
      });
    },
    promedioCalificacion: function promedioCalificacion(state) {
      return function (negocio) {
        var result = 0;
        if (negocio.opinions.length) {
          var sum_calificacion = negocio.opinions.reduce(function (a, b) {
            return a + Number(b.calificacion);
          }, 0);
          result = sum_calificacion / negocio.opinions.length;
        }
        return result;
      };
    },
    porcentajeOpinions: function porcentajeOpinions(state) {
      return function (calificacion) {
        var cant_cali = state.negocio.opinions.filter(function (val) {
          return val.calificacion == calificacion;
        }).length;
        var total_cali = state.negocio.opinions.length;
        return {
          porcentaje: cant_cali > 0 ? cant_cali * 100 / total_cali : 0,
          cantidad: cant_cali
        };
      };
    }
  },
  mutations: {
    clear: function clear(state) {
      state.negocio = {
        id: null,
        nombre: '',
        descripcion: '',
        breve: '',
        categoria_id: null,
        comision: 0,
        tipo_comision: 1,
        // 1 Porcentaje por venta, 2 Monto por Venta 
        url: '',
        sitio_web: '',
        emails: [],
        direccion: '',
        codigo_postal: null,
        ciudad_id: null,
        estado_id: null,
        tipo_menu: null,
        menu: null,
        lat: 0,
        lng: 0,
        logo: null,
        vistas: 0,
        ultima_recarga: null,
        floor_plan: false,
        acepta_reservas: false,
        status: 1,
        // 1 => activo , 2 => vacaciones, 3 => fuera de servicio
        usuario_id: null,
        solicitud_id: null,
        divisa_id: null,
        imagenes: [],
        telefonos: [],
        eventos: [],
        cuenta: null,
        iata_id: null,
        iata: null,
        horarios: [],
        amenidades: [],
        formas_pago: [],
        precios: [],
        redes: [],
        videos: [],
        ventas: [],
        reservaciones: [],
        opinions: [],
        modelType: 'App\\Models\\Negocio\\Negocio',
        recomendaciones: [],
        seguidores: [],
        tps_referido: 0
      };
    },
    setNegocio: function setNegocio(state, negocio) {
      state.negocio = negocio;
      if (!state.negocios.length) {
        state.negocios.push(negocio);
      }
    },
    setNegocios: function setNegocios(state, negocios) {
      state.negocios = negocios;
    },
    update: function update(state, negocio) {
      var i = state.negocios.findIndex(function (val) {
        return val.id === negocio.id;
      });
      if (i != -1) {
        state.negocios[i] = negocio;
      }
      if (state.negocio.id === negocio.id) {
        state.negocio = negocio;
      }
    },
    capturar: function capturar(state, negocio_id) {
      var negocio = state.negocios.find(function (val) {
        return val.id === negocio_id;
      });
      if (negocio) {
        state.negocio = negocio;
      }
    },
    push: function push(state, negocio) {
      state.negocios.push(negocio);
    },
    put: function put(state, negocio_id) {
      state.negocios.splice(state.negocios.findIndex(function (val) {
        return val.id == negocio_id;
      }), 1);
    },
    updateImagenes: function updateImagenes(state, imagenes) {
      if (state.negocio.id) {
        state.negocio.imagenes = imagenes;
      }
    },
    togglePortada: function togglePortada(state, _ref) {
      var imagen_id = _ref.imagen_id,
        portada = _ref.portada;
      if (state.negocio.id) {
        state.negocio.imagenes.forEach(function (val) {
          return val.portada = false;
        });
        // const i = state.negocio.imagenes.findIndex(val => val.portada === true)

        // if (i != -1){
        //    state.negocio.imagenes[i].portada = false
        // }

        var image = state.negocio.imagenes.find(function (val) {
          return val.id === imagen_id;
        });
        image.portada = portada;
      }
    },
    quitarTelefono: function quitarTelefono(state, telefono_id) {
      state.negocio.telefonos.splice(state.negocio.telefonos.findIndex(function (val) {
        return val.id === telefono_id;
      }), 1);
    },
    quitarHorario: function quitarHorario(state) {
      state.negocio.horarios = [];
    },
    agregarRed: function agregarRed(state) {
      state.negocio.redes.push({
        nombre: '',
        icono: '',
        url: ''
      });
    },
    agregarVideo: function agregarVideo(state) {
      state.negocio.videos.push({
        nombre: '',
        youtube: false,
        url: ''
      });
    },
    quitarRed: function quitarRed(state, i) {
      state.negocio.redes.splice(i, 1);
    },
    quitarVideo: function quitarVideo(state, i) {
      state.negocio.videos.splice(i, 1);
    },
    quitarRedes: function quitarRedes(state) {
      state.negocio.redes = [];
    },
    quitarVideos: function quitarVideos(state) {
      state.negocio.videos = [];
    },
    toggleRecomendacion: function toggleRecomendacion(state, _ref2) {
      var negocio = _ref2.negocio,
        usuario = _ref2.usuario;
      var bussines = state.negocios.find(function (val) {
        return val.id == negocio;
      });
      if (bussines != undefined) {
        var recomendacion = bussines.recomendaciones.find(function (val) {
          return val.usuario_id === usuario;
        });
        if (recomendacion != undefined) {
          bussines.recomendaciones.splice(bussines.recomendaciones.findIndex(function (val) {
            return val.usuario_id === usuario;
          }), 1);
        } else {
          bussines.recomendaciones.push({
            modelType: "App\\Models\\Negocio\\Negocio",
            model_id: negocio,
            usuario_id: usuario
          });
        }
      }
      if (state.negocio.id == negocio) {
        var _recomendacion = state.negocio.recomendaciones.find(function (val) {
          return val.usuario_id === usuario;
        });
        if (_recomendacion != undefined) {
          state.negocio.recomendaciones.splice(state.negocio.recomendaciones.findIndex(function (val) {
            return val.usuario_id === usuario;
          }), 1);
        } else {
          state.negocio.recomendaciones.push({
            modelType: "App\\Models\\Negocio\\Negocio",
            model_id: negocio,
            usuario_id: usuario
          });
        }
      }
    },
    toggleSeguidor: function toggleSeguidor(state, _ref3) {
      var negocio = _ref3.negocio,
        usuario = _ref3.usuario;
      var bussines = state.negocios.find(function (val) {
        return val.id == negocio;
      });
      if (bussines != undefined) {
        var seguidor = bussines.seguidores.find(function (val) {
          return val.usuario_id === usuario;
        });
        if (seguidor != undefined) {
          bussines.seguidores.splice(bussines.seguidores.findIndex(function (val) {
            return val.usuario_id === usuario;
          }), 1);
        } else {
          bussines.seguidores.push({
            modelType: "App\\Models\\Negocio\\Negocio",
            model_id: negocio,
            usuario_id: usuario
          });
        }
      }
      if (state.negocio.id == negocio) {
        var _seguidor = state.negocio.seguidores.find(function (val) {
          return val.usuario_id === usuario;
        });
        if (_seguidor != undefined) {
          state.negocio.seguidores.splice(state.negocio.seguidores.findIndex(function (val) {
            return val.usuario_id === usuario;
          }), 1);
        } else {
          state.negocio.seguidores.push({
            modelType: "App\\Models\\Negocio\\Negocio",
            model_id: negocio,
            usuario_id: usuario
          });
        }
      }
    }
  },
  actions: {
    fetch: function fetch(_ref4, negocio_id) {
      var commit = _ref4.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/negocios/".concat(negocio_id, "/fetch/data")).then(function (_ref5) {
          var data = _ref5.data;
          commit('setNegocio', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetchData: function fetchData(_ref6, datos) {
      var commit = _ref6.commit;
      return new Promise(function (resolve, reject) {
        axios.post('/api/negocios/fetch/data', datos).then(function (_ref7) {
          var data = _ref7.data;
          commit('setNegocios', data.negocios);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    guardar: function guardar(_ref8, datos) {
      var state = _ref8.state,
        commit = _ref8.commit;
      return new Promise(function (resolve, reject) {
        if (datos.id) {
          axios.put("/api/negocios/".concat(datos.id), datos).then(function (_ref9) {
            var data = _ref9.data;
            if (data.result) {
              commit('update', data.negocio);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        } else {
          axios.post("/api/negocios", datos).then(function (_ref10) {
            var data = _ref10.data;
            if (data.result) {
              commit('push', data.negocio);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        }
      });
    },
    eliminar: function eliminar(_ref11, negocio_id) {
      var commit = _ref11.commit;
      return new Promise(function (resolve, reject) {
        axios["delete"]("/api/negocios/".concat(negocio_id)).then(function (_ref12) {
          var data = _ref12.data;
          if (data.result) {
            commit('put', negocio_id);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    actualizarLogo: function actualizarLogo(_ref13, _ref14) {
      var state = _ref13.state,
        commit = _ref13.commit;
      var logo = _ref14.logo;
      var headers = {
        ContentType: 'multipart/form-data'
      };
      var formData = new FormData();
      formData.append('logotipo', logo);
      formData.append('_method', 'put');
      return new Promise(function (resolve, reject) {
        axios.post("/api/negocios/".concat(state.negocio.id, "/actualizar/logo"), formData, {
          headers: headers
        }).then(function (_ref15) {
          var data = _ref15.data;
          if (data.result) {
            commit('update', data.negocio);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject();
        });
      });
    },
    togglePortada: function togglePortada(_ref16, datos) {
      var commit = _ref16.commit;
      commit('togglePortada', {
        imagen_id: datos.imagen,
        portada: datos.portada
      });
      return new Promise(function (resolve, reject) {
        axios.put("/api/imagens/".concat(datos.imagen, "/toggle"), datos).then(function (_ref17) {
          var data = _ref17.data;
          if (data.result) {
            // commit('update',data.negocio)
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    addImagenes: function addImagenes(_ref18, _ref19) {
      var commit = _ref18.commit;
      var negocio_id = _ref19.negocio_id,
        imagenes = _ref19.imagenes;
      var formData = new FormData();
      imagenes.forEach(function (val) {
        return formData.append('imagenes[]', val);
      });
      formData.append('_method', 'PUT');
      return new Promise(function (resolve, reject) {
        axios.post("/api/negocios/".concat(negocio_id, "/add/imagen"), formData, {
          headers: {
            ContentType: 'multipart/form-data'
          }
        }).then(function (_ref20) {
          var data = _ref20.data;
          if (data.result) {
            commit('update', data.negocio);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    eliminarImagen: function eliminarImagen(_ref21, imagen_id) {
      var commit = _ref21.commit;
      return new Promise(function (resolve, reject) {
        axios["delete"]("/api/negocios/eliminar/imagen/".concat(imagen_id)).then(function (_ref22) {
          var data = _ref22.data;
          if (data.result) {
            commit('update', data.negocio);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    aperturarHorario: function aperturarHorario(_ref23, negocio_id) {
      var commit = _ref23.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/negocios/".concat(negocio_id, "/aperturar/horario")).then(function (_ref24) {
          var data = _ref24.data;
          if (data.result) {
            commit('update', data.negocio);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    guardarHorario: function guardarHorario(_ref25, horario) {
      var commit = _ref25.commit;
      return new Promise(function (resolve, reject) {
        axios.put("/api/horarios/".concat(horario.id), horario).then(function (_ref26) {
          var data = _ref26.data;
          resolve(data);
        })["catch"](function (e) {
          return reject();
        });
      });
    },
    quitarHorario: function quitarHorario(_ref27, negocio_id) {
      var commit = _ref27.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/negocios/".concat(negocio_id, "/quitar/horario")).then(function (_ref28) {
          var data = _ref28.data;
          if (data.result) {
            commit('quitarHorario');
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    addTelefono: function addTelefono(_ref29, datos) {
      var state = _ref29.state,
        commit = _ref29.commit;
      return new Promise(function (resolve, reject) {
        axios.put("/api/negocios/".concat(state.negocio.id, "/add/telefono"), datos).then(function (_ref30) {
          var data = _ref30.data;
          if (data.result) {
            commit('update', data.negocio);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    quitarTelefono: function quitarTelefono(_ref31, telefono_id) {
      var state = _ref31.state,
        commit = _ref31.commit;
      commit('quitarTelefono', telefono_id);
      return new Promise(function (resolve, reject) {
        axios["delete"]("/api/telefonos/".concat(telefono_id)).then(function (_ref32) {
          var data = _ref32.data;
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    cargarNegocio: function cargarNegocio(_ref33) {
      var commit = _ref33.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/empleado/cargar/negocio/".concat(localStorage.getItem('ultimo-negocio') || '')).then(function (_ref34) {
          var data = _ref34.data;
          if (data.id) {
            localStorage.setItem('ultimo-negocio', data.id);
            commit('setNegocio', data);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject();
        });
      });
    },
    cambiarNegocio: function cambiarNegocio(_ref35, id_negocio) {
      var commit = _ref35.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/empleado/cambiar/negocio/".concat(id_negocio)).then(function (_ref36) {
          var data = _ref36.data;
          if (data.result) {
            localStorage.setItem('ultimo-negocio', data.negocio.id);
            commit('setNegocio', data.negocio);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    guardarAmenidad: function guardarAmenidad(_ref37, _ref38) {
      var commit = _ref37.commit;
      var negocio = _ref38.negocio,
        amenidads = _ref38.amenidads;
      return new Promise(function (resolve, reject) {
        axios.put("api/negocios/".concat(negocio, "/guardar/amenidads"), {
          amenidads: amenidads
        }).then(function (_ref39) {
          var data = _ref39.data;
          if (data.result) {
            commit('update', data.negocio);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    guardarFormaPago: function guardarFormaPago(_ref40, _ref41) {
      var commit = _ref40.commit;
      var negocio = _ref41.negocio,
        formas = _ref41.formas;
      return new Promise(function (resolve, reject) {
        axios.put("api/negocios/".concat(negocio, "/guardar/formas-pago"), {
          formas: formas
        }).then(function (_ref42) {
          var data = _ref42.data;
          if (data.result) {
            commit('update', data.negocio);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    agregarRed: function agregarRed(_ref43, datos) {
      var state = _ref43.state,
        commit = _ref43.commit;
      return new Promise(function (resolve, reject) {
        axios.put("/api/negocios/".concat(state.negocio.id, "/agregar/red-social"), datos).then(function (_ref44) {
          var data = _ref44.data;
          if (data.result) {
            commit('update', data.negocio);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject();
        });
      });
    },
    quitarRed: function quitarRed(_ref45, red) {
      var state = _ref45.state,
        commit = _ref45.commit;
      return new Promise(function (resolve, reject) {
        axios["delete"]("/api/negocios/".concat(state.negocio.id, "/quitar/red-social/").concat(red)).then(function (_ref46) {
          var data = _ref46.data;
          if (data.result) {
            commit('update', data.negocio);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    quitarAllRedes: function quitarAllRedes(_ref47) {
      var commit = _ref47.commit,
        state = _ref47.state;
      return new Promise(function (resolve, reject) {
        axios.get("/api/negocios/".concat(state.negocio.id, "/quitar/all-redes")).then(function (_ref48) {
          var data = _ref48.data;
          if (data.result) {
            commit('quitarRedes');
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    guardarVideo: function guardarVideo(_ref49, datos) {
      var state = _ref49.state,
        commit = _ref49.commit;
      return new Promise(function (resolve, reject) {
        var formData = new FormData();
        Object.keys(datos).forEach(function (val) {
          formData.append(val, datos[val]);
        });
        formData.append('_method', 'PUT');
        axios.post("/api/negocios/".concat(state.negocio.id, "/guardar/video"), formData, {
          headers: {
            ContentType: 'multipart/form-data'
          }
        }).then(function (_ref50) {
          var data = _ref50.data;
          if (data.result) {
            commit('update', data.negocio);
          }
          resolve(data);
        })["catch"](function (e) {
          reject(e);
        });
      });
    },
    agregarSaldo: function agregarSaldo(_ref51, _ref52) {
      var commit = _ref51.commit,
        state = _ref51.state;
      var negocio_id = _ref52.negocio_id,
        monto = _ref52.monto,
        concepto = _ref52.concepto;
      return new Promise(function (resolve, reject) {
        axios.put("/api/negocios/".concat(negocio_id, "/cargar/saldo"), {
          monto: monto,
          concepto: concepto
        }).then(function (_ref53) {
          var data = _ref53.data;
          if (data.result) {
            commit('update', data.negocio);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    datosHome: function datosHome(_ref54) {
      var commit = _ref54.commit,
        state = _ref54.state;
      return new Promise(function (resolve, reject) {
        axios.get("/api/negocios/".concat(state.negocio.id, "/datos/home")).then(function (_ref55) {
          var data = _ref55.data;
          return resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    negocioUrl: function negocioUrl(_ref56, urlNegocio) {
      var commit = _ref56.commit,
        state = _ref56.state;
      return new Promise(function (resolve, reject) {
        axios.post("/api/negocio/obtener-por-url", {
          url: urlNegocio
        }).then(function (_ref57) {
          var data = _ref57.data;
          if (data.result) {
            commit('setNegocio', data.negocio);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    toggleRecomendacions: function toggleRecomendacions(_ref58, _ref59) {
      var commit = _ref58.commit,
        state = _ref58.state;
      var negocio = _ref59.negocio,
        usuario = _ref59.usuario;
      commit('toggleRecomendacion', {
        negocio: negocio,
        usuario: usuario
      });
      return new Promise(function (resolve, reject) {
        axios.get("/api/negocios/".concat(negocio, "/recomendacions/toggle/user/").concat(usuario)).then(function (_ref60) {
          var data = _ref60.data;
          // commit('update',data.negocio);

          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    toggleSeguidor: function toggleSeguidor(_ref61, _ref62) {
      var commit = _ref61.commit,
        state = _ref61.state;
      var usuario = _ref62.usuario,
        negocio = _ref62.negocio;
      commit('toggleSeguidor', {
        negocio: negocio,
        usuario: usuario
      });
      return new Promise(function (resolve, reject) {
        axios.get("/api/negocios/".concat(negocio, "/seguidors/toggle/user/").concat(usuario)).then(function (_ref63) {
          var data = _ref63.data;
          // commit('update', data.negocio);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetchDataPublic: function fetchDataPublic(_ref64, datos) {
      var commit = _ref64.commit;
      return new Promise(function (resolve, reject) {
        axios.post("/api/negocios/fetch/data/public", datos).then(function (_ref65) {
          var data = _ref65.data;
          commit('setNegocios', data.negocios);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    negociosAsociados: function negociosAsociados(_ref66, datos) {
      var state = _ref66.state,
        commit = _ref66.commit;
      return new Promise(function (resolve, reject) {
        axios.post("/api/negocios/users/asociado", datos).then(function (_ref67) {
          var data = _ref67.data;
          commit('setNegocios', data.negocios);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    guardarMenu: function guardarMenu(_ref68, datos) {
      var state = _ref68.state,
        commit = _ref68.commit;
      var formData = new FormData();
      Object.keys(datos).forEach(function (val) {
        formData.append(val, datos[val]);
      });
      formData.append('_method', "PUT");
      return new Promise(function (resolve, reject) {
        axios.post("/api/negocios/".concat(state.negocio.id, "/update/menu"), formData, {
          headers: {
            ContentType: 'multipart/form-data'
          }
        }).then(function (_ref69) {
          var data = _ref69.data;
          if (data.result) {
            commit('update', data.negocio);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    gestionSaldo: function gestionSaldo(_ref70, datos) {
      var state = _ref70.state,
        commit = _ref70.commit;
      return new Promise(function (resolve, reject) {
        axios.put("/api/negocios/".concat(state.negocio.id, "/gestion/saldo"), datos).then(function (_ref71) {
          var data = _ref71.data;
          if (data.result) {
            commit('update', data.negocio);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    getNegocios: function getNegocios(_ref72) {
      var commit = _ref72.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/negocios/get/all").then(function (_ref73) {
          var data = _ref73.data;
          commit('setNegocios', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    aumentarVisita: function aumentarVisita(_ref74, negocio_id) {
      var state = _ref74.state,
        commit = _ref74.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/negocios/".concat(negocio_id, "/aumentar-vistas")).then(function (_ref75) {
          var data = _ref75.data;
          if (data.result) {
            // commit('update',data.negocio)
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/src/store/modules/negocios/reservacion.js":
/*!****************************************************************!*\
  !*** ./resources/js/src/store/modules/negocios/reservacion.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.for-each.js */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.filter.js */ "./node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.find-index.js */ "./node_modules/core-js/modules/es.array.find-index.js");
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_8__);









/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: function state() {
    return {
      reservacion: {
        id: null,
        fecha: null,
        hora: null,
        personas: 1,
        status: 1,
        observacion: '',
        negocio_id: null,
        usuario_id: null,
        operador_id: null,
        negocio: null,
        usuario: null,
        operador: null
      },
      reservaciones: []
    };
  },
  getters: {
    draft: function draft(state) {
      return clone(state.reservacion);
    },
    lugaresOcupados: function lugaresOcupados(state) {
      return function (_ref) {
        var fecha = _ref.fecha,
          hora = _ref.hora;
        var ocupados = 0;
        state.reservaciones.filter(function (val) {
          return val.fecha === fecha && val.hora == hora;
        }).forEach(function (val) {
          ocupados += val.personas;
        });
        return ocupados;
      };
    }
  },
  mutations: {
    clear: function clear(state) {
      state.reservacion = {
        id: null,
        fecha: null,
        hora: null,
        personas: 1,
        status: 1,
        observacion: '',
        negocio_id: null,
        usuario_id: null,
        operador_id: null,
        negocio: null,
        usuario: null,
        operador: null
      };
    },
    setReservacion: function setReservacion(state, reservacion) {
      state.reservacion = reservacion;
    },
    update: function update(state, reservacion) {
      var i = state.reservaciones.findIndex(function (val) {
        return val.id === reservacion.id;
      });
      if (i != -1) {
        state.reservaciones[i] = reservacion;
      }
      if (state.reservacion.id === reservacion.id) {
        state.reservacion = reservacion;
      }
    },
    push: function push(state, reservacion) {
      if ((0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(state.reservaciones) == 'object') {
        state.reservaciones.push(reservacion);
      } else {
        state.reservaciones = [reservacion];
      }
    },
    put: function put(state, reservacion_id) {
      state.reservaciones.splice(state.reservaciones.findIndex(function (val) {
        return val.id === reservacion_id;
      }), 1);
    },
    capturar: function capturar(state, reservacion_id) {
      var reservacion = state.reservaciones.find(function (val) {
        return val.id === reservacion_id;
      });
      if (reservacion != undefined) {
        state.reservacion = reservacion;
      }
    },
    setReservacions: function setReservacions(state, reservacions) {
      state.reservaciones = reservacions;
    }
  },
  actions: {
    getReservacionesNegocio: function getReservacionesNegocio(_ref2, negocio_id) {
      var commit = _ref2.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/reservacions/negocio/".concat(negocio_id, "/get/all")).then(function (_ref3) {
          var data = _ref3.data;
          commit('setReservacions', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    getReservacions: function getReservacions(_ref4) {
      var commit = _ref4.commit;
      return new Promise(function (resolve, reject) {
        axios.get('/api/reservacions/get/all').then(function (_ref5) {
          var data = _ref5.data;
          commit('setReservacions', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetchData: function fetchData(_ref6, datos) {
      var state = _ref6.state,
        commit = _ref6.commit;
      return new Promise(function (resolve, reject) {
        axios.post("/api/reservacions/fetch/data", datos).then(function (_ref7) {
          var data = _ref7.data;
          if (data.reservacions) {
            commit('setReservacions', data.reservacions);
          } else if (data.reservaciones) {
            commit('setReservacions', data.reservaciones);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetch: function fetch(_ref8, reservacion_id) {
      var state = _ref8.state,
        commit = _ref8.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/reservacions/".concat(reservacion_id, "/fetch/data")).then(function (_ref9) {
          var data = _ref9.data;
          commit('setReservacion', data);
          commit('push', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    guardar: function guardar(_ref10, datos) {
      var commit = _ref10.commit;
      return new Promise(function (resolve, reject) {
        if (datos.id) {
          axios.put("/api/reservacions/".concat(datos.id), datos).then(function (_ref11) {
            var data = _ref11.data;
            if (data.result) {
              commit('update', data.reservacion);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        } else {
          axios.post("/api/reservacions", datos).then(function (_ref12) {
            var data = _ref12.data;
            if (data.result) {
              commit('push', data.reservacion);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        }
      });
    },
    eliminar: function eliminar(_ref13, reservacion_id) {
      var commit = _ref13.commit;
      return new Promise(function (resolve, reject) {
        axios["delete"]("/api/reservacions/".concat(reservacion_id)).then(function (_ref14) {
          var data = _ref14.data;
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    consultarHoras: function consultarHoras(_ref15, _ref16) {
      var commit = _ref15.commit;
      var negocio = _ref16.negocio,
        fecha = _ref16.fecha;
      return new Promise(function (resolve, reject) {
        axios.put("/api/negocios/".concat(negocio, "/consultar/horas"), {
          fecha: fecha
        }).then(function (_ref17) {
          var data = _ref17.data;
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    cancelar: function cancelar(_ref18, reserva_id) {
      var commit = _ref18.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/reservacions/".concat(reserva_id, "/cancelar")).then(function (_ref19) {
          var data = _ref19.data;
          return resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    reservacionesUser: function reservacionesUser(_ref20, datos) {
      var commit = _ref20.commit;
      return new Promise(function (resolve, reject) {
        axios.post("/api/reservacions/fetch/data/user", datos).then(function (_ref21) {
          var data = _ref21.data;
          commit('setReservacions', data.reservacions);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/src/store/modules/negocios/solicitudes/index.js":
/*!**********************************************************************!*\
  !*** ./resources/js/src/store/modules/negocios/solicitudes/index.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js */ "./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js");
/* harmony import */ var _home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.find-index.js */ "./node_modules/core-js/modules/es.array.find-index.js");
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.array.for-each.js */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.object.keys.js */ "./node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_10__);











/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: function state() {
    return {
      solicitud: {
        id: null,
        nombre: '',
        descripcion: '',
        breve: '',
        solicitud_id: '',
        comision: 0,
        tipo_comision: 1,
        // 1 => Porcentaje, 2 => Monto fijo por persona 
        url: null,
        email: null,
        telefono: null,
        sitio_web: '',
        direccion: '',
        codigo_postal: '',
        ciudad_id: null,
        estado_id: null,
        lat: null,
        lng: null,
        logo: null,
        foto: null,
        situacion: 1,
        // 1 => solicitud enviada, 2 => solicitud regresada para mejorar 3 => solicitd aceptada 4 => solicitud rechazada
        comentario: '',
        usuario_id: null,
        solicitud: null,
        ciudad: null,
        estado: null,
        usuario: null,
        divisa_id: null,
        divisa: null,
        iata_id: null,
        iata: null
      },
      solicitudes: []
    };
  },
  getters: {
    draft: function draft(state) {
      return clone(state.solicitud);
    }
  },
  mutations: {
    setSolicitudes: function setSolicitudes(state, data) {
      if (data.length) {
        state.solicitudes = data;
      }
    },
    clear: function clear(state) {
      state.solicitud = {
        id: null,
        nombre: '',
        descripcion: '',
        breve: '',
        solicitud_id: '',
        comision: 0,
        tipo_comision: 1,
        // 1 => Porcentaje, 2 => Monto fijo por persona 
        url: null,
        email: null,
        telefono: null,
        sitio_web: '',
        direccion: '',
        codigo_postal: '',
        ciudad_id: null,
        estado_id: null,
        lat: null,
        lng: null,
        logo: null,
        foto: null,
        situacion: 1,
        // 1 => solicitud enviada, 2 => solicitud regresada para mejorar 3 => solicitd aceptada 4 => solicitud rechazada
        comentario: '',
        usuario_id: null,
        solicitud: null,
        ciudad: null,
        estado: null,
        usuario: null,
        divisa_id: null,
        divisa: null,
        iata_id: null,
        iata: null
      };
    },
    push: function push(state, data) {
      if (data) {
        if ((0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_2__["default"])(state.solicitudes) === 'object') {
          state.solicitudes.push(data);
        } else {
          state.solicitudes = [data];
        }
      }
    },
    put: function put(state, data_id) {
      state.solicitudes.splice(state.solicitudes.findIndex(function (val) {
        return val.id === data_id;
      }), 1);
    },
    capturar: function capturar(state, data_id) {
      var solicitud = state.solicitudes.find(function (val) {
        return val.id === data_id;
      });
      if (solicitud) {
        state.solicitud = solicitud;
      }
    },
    update: function update(state, data) {
      var i = state.solicitudes.findIndex(function (val) {
        return val.id === data.id;
      });
      if (i != -1) {
        state.solicitudes[i] = data;
        if (state.solicitud.id === data.id) {
          state.solicitud = data;
        }
      }
    }
  },
  actions: {
    fetchData: function fetchData(_ref, data) {
      var commit = _ref.commit;
      return new Promise(function (resolve, reject) {
        commit('toggleLoading', null, {
          root: true
        });
        axios.post("/api/negocio/solicituds/fetch/data", data).then(function (_ref2) {
          var datos = _ref2.data;
          resolve(datos);
          commit('setSolicitudes', datos.solicitudes);
        })["catch"](function (e) {
          return reject(e);
        }).then(function () {
          return commit('toggleLoading', null, {
            root: true
          });
        });
      });
    },
    fetchDataAdmin: function fetchDataAdmin(_ref3, filtro) {
      var commit = _ref3.commit;
      return new Promise(function (resolve, reject) {
        axios.post("/api/negocio/solicituds/fetch/data/admin", filtro).then(function (_ref4) {
          var data = _ref4.data;
          commit('setSolicitudes', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    guardar: function guardar(_ref5, data) {
      var commit = _ref5.commit;
      return new Promise(function (resolve, reject) {
        commit('toggleLoading', null, {
          root: true
        });
        var formData = new FormData();
        Object.keys(data).forEach(function (val) {
          formData.append(val, data[val]);
        });
        if (data.id) {
          formData.append("_method", 'put');
          axios.post("/api/negocio/solicituds/".concat(data.id), formData, {
            headers: {
              ContentType: "multipart/form-data; boundary=something"
            }
          }).then(function (_ref6) {
            var datos = _ref6.data;
            if (datos.result) {
              commit('update', datos.solicitud);
            }
            resolve(datos);
          })["catch"](function (e) {
            return reject(e);
          }).then(function () {
            return commit('toggleLoading', null, {
              root: true
            });
          });
        } else {
          axios.post("/api/negocio/solicituds", formData, {
            headers: {
              ContentType: "multipart/form-data; boundary=something"
            }
          }).then(function (_ref7) {
            var datos = _ref7.data;
            if (datos.result) {
              commit('push', datos.solicitud);
            }
            resolve(datos);
          })["catch"](function (e) {
            return reject(e);
          }).then(function () {
            return commit('toggleLoading', null, {
              root: true
            });
          });
        }
      });
    },
    eliminar: function eliminar(_ref8, data_id) {
      var commit = _ref8.commit;
      return new Promise(function (resolve, reject) {
        commit('toggleLoading', null, {
          root: true
        });
        axios["delete"]("/api/negocio/solicituds/".concat(data_id)).then(function (_ref9) {
          var data = _ref9.data;
          if (data.result) {
            commit('put', data_id);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        }).then(function () {
          return commit('toggleLoading', null, {
            root: true
          });
        });
      });
    },
    getsolicitud: function getsolicitud(_ref10, data_id) {
      return (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/(0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee() {
        var commit;
        return (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              commit = _ref10.commit;
              _context.next = 3;
              return new Promise(function (resolve, reject) {
                commit('toggleLoading', null, {
                  root: true
                });
                axios.get("/api/negocio/solicituds/".concat(data_id, "/get")).then(function (_ref11) {
                  var data = _ref11.data;
                  commit('push', data);
                  resolve(data);
                })["catch"](function (e) {
                  return reject(e);
                }).then(function () {
                  commit('toggleLoading', null, {
                    root: true
                  });
                });
              });
            case 3:
              return _context.abrupt("return", _context.sent);
            case 4:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    },
    getSolicitudes: function getSolicitudes(_ref12) {
      var commit = _ref12.commit;
      return new Promise(function (resolve, reject) {
        axios.get('/api/negocio/solicituds/get/all').then(function (_ref13) {
          var data = _ref13.data;
          commit('setSolicitudes', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    solicitudesNoaceptadas: function solicitudesNoaceptadas() {
      return new Promise(function (resolve, reject) {
        axios.get("/api/negocio/solicituds/sinaceptar").then(function (_ref14) {
          var data = _ref14.data;
          return resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    getMisSolicitudes: function getMisSolicitudes(_ref15) {
      var commit = _ref15.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/negocio/mis-solicitudes").then(function (_ref16) {
          var data = _ref16.data;
          commit('setSolicitudes', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/src/store/modules/notificaciones.js":
/*!**********************************************************!*\
  !*** ./resources/js/src/store/modules/notificaciones.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js */ "./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js");
/* harmony import */ var _home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.find-index.js */ "./node_modules/core-js/modules/es.array.find-index.js");
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/router */ "./resources/js/src/router/index.js");







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: function state() {
    return {
      notificacion: {},
      todas: [],
      leidas: [],
      sinleer: []
    };
  },
  getters: {
    cantidad: function cantidad(state) {
      return state.sinleer.length;
    }
  },
  mutations: {
    setNotificacion: function setNotificacion(state, data) {
      state.notificacion = data;
    },
    setNotificaciones: function setNotificaciones(state, _ref) {
      var leidas = _ref.leidas,
        sinleer = _ref.sinleer,
        todas = _ref.todas;
      state.todas = todas;
      state.sinleer = sinleer;
      state.leidas = leidas;
    },
    pushLeida: function pushLeida(state, notificacion) {
      var index = state.sinleer.findIndex(function (noti) {
        return noti.id == notificacion.id;
      });
      state.sinleer.splice(index, 1);
      state.leidas.push(notificacion);
    },
    pushSinleer: function pushSinleer(state, notificacion) {
      var index = state.leidas.findIndex(function (noti) {
        return noti.id == notificacion.id;
      });
      state.leidas.splice(index, 1);
      state.sinleer.push(notificacion);
    },
    pushNotificacion: function pushNotificacion(state, notificacion) {
      state.todas.push(notificacion);
    }
  },
  actions: {
    cargarNotificaciones: function cargarNotificaciones(_ref2, usuario) {
      var state = _ref2.state,
        commit = _ref2.commit;
      axios.get("/api/notificaciones/".concat(usuario)).then(function (respon) {
        commit('setNotificaciones', {
          leidas: respon.data.leidas,
          sinleer: respon.data.sinleer,
          todas: respon.data.notificaciones
        });
      })["catch"](function (e) {
        console.log(e);
      });
    },
    marcarLeida: function marcarLeida(_ref3, _ref4) {
      return (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/(0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee() {
        var state, commit, usuario, notificacion;
        return (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              state = _ref3.state, commit = _ref3.commit;
              usuario = _ref4.usuario, notificacion = _ref4.notificacion;
              _context.next = 4;
              return axios.get("/api/notificaciones/markread/".concat(notificacion, "/usuario/").concat(usuario));
            case 4:
              return _context.abrupt("return", _context.sent);
            case 5:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    },
    eliminar: function eliminar(_ref5, _ref6) {
      return (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/(0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee2() {
        var state, commit, notificacion, usuario;
        return (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              state = _ref5.state, commit = _ref5.commit;
              notificacion = _ref6.notificacion, usuario = _ref6.usuario;
              _context2.next = 4;
              return axios["delete"]("/api/notificaciones/".concat(notificacion, "/usuario/").concat(usuario));
            case 4:
              return _context2.abrupt("return", _context2.sent);
            case 5:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }))();
    },
    marcarNoLeida: function marcarNoLeida(_ref7, _ref8) {
      return (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/(0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee3() {
        var state, commit, usuario, notificacion;
        return (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              state = _ref7.state, commit = _ref7.commit;
              usuario = _ref8.usuario, notificacion = _ref8.notificacion;
              _context3.next = 4;
              return axios.get("/api/notificaciones/marknoread/".concat(notificacion, "/usuario/").concat(usuario));
            case 4:
              return _context3.abrupt("return", _context3.sent);
            case 5:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }))();
    },
    todoleido: function todoleido(_ref9, usuario) {
      return (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/(0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee4() {
        var state, commit;
        return (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              state = _ref9.state, commit = _ref9.commit;
              _context4.next = 3;
              return axios.get("/api/notificaciones/todoleido/usuario/".concat(usuario));
            case 3:
              return _context4.abrupt("return", _context4.sent);
            case 4:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }))();
    },
    marcarSeleccionadosLeidos: function marcarSeleccionadosLeidos(_ref10, _ref11) {
      return (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/(0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee5() {
        var state, commit, usuario, seleccionados;
        return (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              state = _ref10.state, commit = _ref10.commit;
              usuario = _ref11.usuario, seleccionados = _ref11.seleccionados;
              _context5.next = 4;
              return axios.post("/api/notificaciones/seleccionados/leidos/usuario/".concat(usuario), {
                seleccionados: seleccionados
              });
            case 4:
              return _context5.abrupt("return", _context5.sent);
            case 5:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }))();
    },
    eliminarSeleccionados: function eliminarSeleccionados(_ref12, _ref13) {
      return (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/(0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee6() {
        var state, commit, usuario, seleccionados;
        return (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              state = _ref12.state, commit = _ref12.commit;
              usuario = _ref13.usuario, seleccionados = _ref13.seleccionados;
              _context6.next = 4;
              return axios.post("/api/notificaciones/seleccionados/eliminar/usuario/".concat(usuario), {
                seleccionados: seleccionados
              });
            case 4:
              return _context6.abrupt("return", _context6.sent);
            case 5:
            case "end":
              return _context6.stop();
          }
        }, _callee6);
      }))();
    }
  }
});

/***/ }),

/***/ "./resources/js/src/store/modules/opinions/opinion.js":
/*!************************************************************!*\
  !*** ./resources/js/src/store/modules/opinions/opinion.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.find-index.js */ "./node_modules/core-js/modules/es.array.find-index.js");
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_3__);




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: function state() {
    return {
      opinion: {
        id: null,
        calificacion: 5,
        opinion: '',
        titulo: '',
        asistencia: '',
        acompanante: null,
        certificacion: false,
        preguntas: [{
          pregunta: 'Le recomendarias este lugar o actividad a un amigo que visite el lugar por primera vez ?',
          respuesta: null
        }, {
          pregunta: '¿Esta atracción es una joya oculta o está fuera del circuito turístico?',
          respuesta: null
        }, {
          pregunta: '¿Es algo que no te puedes perder si viajas con un grupo grande (más de 5 personas)?',
          respuesta: null
        }, {
          pregunta: '¿Esta atracción es un buen lugar para visitar durante una luna de miel?',
          respuesta: null
        }],
        model_id: null,
        model_type: null,
        usuario_id: null,
        usuario: null,
        imagenes: []
      },
      opinions: []
    };
  },
  getters: {
    draft: function draft(state) {
      return clone(state.opinion);
    },
    optionsAsistencia: function optionsAsistencia(state) {
      var asistencia = [];
      for (var index = 11; index >= 0; index--) {
        asistencia.push(moment().subtract(index, 'MONTH').format('MMMM YYYY'));
      }
      return asistencia;
    },
    optionsAcompanante: function optionsAcompanante(state) {
      var options = [{
        value: 1,
        label: 'Pareja'
      }, {
        value: 2,
        label: 'Familia (niños pequeños)'
      }, {
        value: 3,
        label: 'Familia (Adolescentes)'
      }, {
        value: 4,
        label: 'Amigos'
      }, {
        value: 5,
        label: 'De Negocios'
      }, {
        value: 6,
        label: 'Solitario'
      }];
      return options;
    }
  },
  mutations: {
    setOpinion: function setOpinion(state, opinion) {
      state.opinion = opinion;
    },
    clear: function clear(state) {
      state.opinion = {
        id: null,
        calificacion: 5,
        opinion: '',
        titulo: '',
        asistencia: '',
        acompanante: null,
        certificacion: false,
        preguntas: [{
          pregunta: 'Le recomendarias este lugar o actividad a un amigo que visite el lugar por primera vez ?',
          respuesta: null
        }, {
          pregunta: '¿Esta atracción es una joya oculta o está fuera del circuito turístico?',
          respuesta: null
        }, {
          pregunta: '¿Es algo que no te puedes perder si viajas con un grupo grande (más de 5 personas)?',
          respuesta: null
        }, {
          pregunta: '¿Esta atracción es un buen lugar para visitar durante una luna de miel?',
          respuesta: null
        }],
        model_id: null,
        model_type: null,
        usuario_id: null,
        usuario: null,
        imagenes: []
      };
    },
    setOpiniones: function setOpiniones(state, opinions) {
      state.opinions = opinions;
    },
    push: function push(state, opinion) {
      state.opinions.push(opinion);
    },
    put: function put(state, opinion_id) {
      state.opinions.splice(state.opinions.findIndex(function (val) {
        return val.id === opinion_id;
      }), 1);
    },
    update: function update(state, opinion) {
      var i = state.opinions.findIndex(function (val) {
        return val.id === opinion.id;
      });
      if (i != -1) {
        state.opinions[i] = opinion;
      }
      if (state.opinion.id === opinion.id) {
        state.opinion = opinion;
      }
    }
  },
  actions: {
    fetchData: function fetchData(_ref, datos) {
      var commit = _ref.commit;
      return new Promise(function (resolve, reject) {
        axios.post("/api/opinions/fetch/data", datos).then(function (_ref2) {
          var data = _ref2.data;
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    guardar: function guardar(_ref3, datos) {
      var commit = _ref3.commit;
      return new Promise(function (resolve, reject) {
        axios.post("/api/opinions", datos).then(function (_ref4) {
          var data = _ref4.data;
          return resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetchDataModel: function fetchDataModel(_ref5, datos) {
      var commit = _ref5.commit;
      return new Promise(function (resolve, reject) {
        axios.post("/api/opinions/fetch/data/model", datos).then(function (_ref6) {
          var data = _ref6.data;
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/src/store/modules/pagina.js":
/*!**************************************************!*\
  !*** ./resources/js/src/store/modules/pagina.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.find-index.js */ "./node_modules/core-js/modules/es.array.find-index.js");
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_4__);





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: function state() {
    return {
      pagina: {
        id: null,
        nombre: '',
        contenido: '',
        ruta: '',
        activo: false,
        is_termino: false,
        is_politica: false,
        usuario_id: null,
        usuario: null,
        is_contacto: false,
        showHeader: false,
        icono: ''
      },
      paginas: []
    };
  },
  getters: {
    draft: function draft(state) {
      return clone(state.pagina);
    },
    pagePolitica: function pagePolitica(state) {
      if (state.paginas.length) {
        var page = state.paginas.find(function (val) {
          return val.is_politica;
        });
        if (page != undefined) {
          return page.ruta;
        } else {
          return '';
        }
      } else {
        return '';
      }
    },
    pageTerminos: function pageTerminos(state) {
      if (state.paginas.length) {
        var page = state.paginas.find(function (val) {
          return val.is_termino;
        });
        if (page != undefined) {
          return page.ruta;
        } else {
          return '';
        }
      } else {
        return '';
      }
    },
    pageContacto: function pageContacto(state) {
      if (state.paginas.length) {
        var page = state.paginas.find(function (val) {
          return val.is_contacto;
        });
        if (page != undefined) {
          return page.ruta;
        } else {
          return '';
        }
      } else {
        return '';
      }
    }
  },
  mutations: {
    clear: function clear(state) {
      state.pagina = {
        id: null,
        nombre: '',
        contenido: '',
        ruta: '',
        activo: false,
        is_termino: false,
        is_politica: false,
        usuario_id: null,
        usuario: null,
        is_contacto: false,
        showHeader: false,
        icono: ''
      };
    },
    setPagina: function setPagina(state, pagina) {
      state.pagina = pagina;
    },
    update: function update(state, pagina) {
      var i = state.paginas.findIndex(function (val) {
        return val.id === pagina.id;
      });
      if (i != -1) {
        state.paginas[i] = pagina;
      }
      if (state.pagina.id === pagina.id) {
        state.pagina = pagina;
      }
    },
    push: function push(state, pagina) {
      state.paginas.push(pagina);
    },
    put: function put(state, pagina_id) {
      state.paginas.splice(state.paginas.findIndex(function (val) {
        return val.id === pagina_id;
      }), 1);
    },
    capturar: function capturar(state, pagina_id) {
      var pagina = state.paginas.find(function (val) {
        return val.id === pagina_id;
      });
      if (pagina != undefined) {
        state.pagina = pagina;
      }
    },
    setPaginas: function setPaginas(state, paginas) {
      state.paginas = paginas;
    }
  },
  actions: {
    fetchData: function fetchData(_ref, datos) {
      var state = _ref.state,
        commit = _ref.commit;
      return new Promise(function (resolve, reject) {
        axios.post("/api/paginas/fetch-data", datos).then(function (_ref2) {
          var data = _ref2.data;
          commit('setPaginas', data.paginas);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetch: function fetch(_ref3, pagina_id) {
      var state = _ref3.state,
        commit = _ref3.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/paginas/".concat(pagina_id, "/fetch-data")).then(function (_ref4) {
          var data = _ref4.data;
          commit('setPagina', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    guardar: function guardar(_ref5, datos) {
      var commit = _ref5.commit;
      return new Promise(function (resolve, reject) {
        if (datos.id) {
          axios.put("/api/paginas/".concat(datos.id), datos).then(function (_ref6) {
            var data = _ref6.data;
            if (data.result) {
              commit('update', data.pagina);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        } else {
          axios.post("/api/paginas", datos).then(function (_ref7) {
            var data = _ref7.data;
            if (data.result) {
              commit('push', data.pagina);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        }
      });
    },
    eliminar: function eliminar(_ref8, pagina_id) {
      var commit = _ref8.commit;
      return new Promise(function (resolve, reject) {
        axios["delete"]("/api/paginas/".concat(pagina_id)).then(function (_ref9) {
          var data = _ref9.data;
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    capturarPagina: function capturarPagina(_ref10, param) {
      var commit = _ref10.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/paginas/get/page/param/".concat(param)).then(function (_ref11) {
          var data = _ref11.data;
          if (data.result) {
            commit('setPagina', data.pagina);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    getPaginas: function getPaginas(_ref12) {
      var commit = _ref12.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/paginas/get/all").then(function (_ref13) {
          var data = _ref13.data;
          commit('setPaginas', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/src/store/modules/pais.js":
/*!************************************************!*\
  !*** ./resources/js/src/store/modules/pais.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.find-index.js */ "./node_modules/core-js/modules/es.array.find-index.js");
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_4__);





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: function state() {
    return {
      pais: {
        id: null,
        codigo: '',
        lada: '',
        pais: ''
      },
      paises: []
    };
  },
  getters: {
    draft: function draft(state) {
      return clone(state.pais);
    }
  },
  mutations: {
    clear: function clear(state) {
      state.pais = {
        id: null,
        codigo: '',
        lada: '',
        pais: ''
      };
    },
    setPais: function setPais(state, pais) {
      if (pais) {
        state.pais = pais;
      }
    },
    capturar: function capturar(state, pais_id) {
      var pais = state.paises.find(function (val) {
        return val.id === pais_id;
      });
      if (pais != undefined) {
        state.pais = pais;
      }
    },
    update: function update(state, data) {
      if (data) {
        var i = state.paises.findIndex(function (val) {
          return val.id === data.id;
        });
        if (i != -1) {
          state.paises[i] = data;
          if (state.pais.id == data.id) {
            state.pais = data;
          }
        }
      }
    },
    put: function put(state, pais_id) {
      state.paises.splice(state.paises.findIndex(function (val) {
        return val.id === pais_id;
      }), 1);
    },
    push: function push(state, pais) {
      state.paises.push(pais);
    },
    setPaises: function setPaises(state, paises) {
      state.paises = paises;
    }
  },
  actions: {
    getPaises: function getPaises(_ref) {
      var commit = _ref.commit;
      axios.get("/api/get/paises").then(function (_ref2) {
        var data = _ref2.data;
        commit('setPaises', data);
      })["catch"](function (e) {
        return console.log(e);
      });
    },
    fetchData: function fetchData(_ref3, data) {
      var commit = _ref3.commit;
      return new Promise(function (resolve, reject) {
        axios.post('/api/fetch/paises', data).then(function (_ref4) {
          var datos = _ref4.data;
          commit('setPaises', datos.paises);
          resolve(datos);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    guardar: function guardar(_ref5, datos) {
      var commit = _ref5.commit;
      return new Promise(function (resolve, reject) {
        if (datos.id) {
          axios.put("/api/pais/".concat(datos.id), datos).then(function (_ref6) {
            var data = _ref6.data;
            if (data.result) {
              commit('update', data.pais);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        } else {
          axios.post("/api/pais", datos).then(function (_ref7) {
            var data = _ref7.data;
            if (data.result) {
              commit('push', data.pais);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        }
      });
    },
    eliminar: function eliminar(_ref8, pais_id) {
      var commit = _ref8.commit;
      return new Promise(function (resolve, reject) {
        axios["delete"]("/api/pais/".concat(pais_id)).then(function (_ref9) {
          var data = _ref9.data;
          if (data.result) {
            commit('put', pais_id);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetchPais: function fetchPais(_ref10, pais_id) {
      var commit = _ref10.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/fetch/pais/".concat(pais_id)).then(function (_ref11) {
          var data = _ref11.data;
          commit('setPais', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/src/store/modules/panel.js":
/*!*************************************************!*\
  !*** ./resources/js/src/store/modules/panel.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.find-index.js */ "./node_modules/core-js/modules/es.array.find-index.js");
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_4__);





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: function state() {
    return {
      panel: {
        id: null,
        panel: '',
        permisos: []
      },
      panels: []
    };
  },
  getters: {
    draft: function draft(state) {
      return clone(state.panel);
    }
  },
  mutations: {
    clear: function clear(state) {
      state.panel = {
        id: null,
        panel: '',
        permisos: []
      };
    },
    setPanel: function setPanel(state, panel) {
      state.panel = panel;
    },
    update: function update(state, panel) {
      var i = state.panels.findIndex(function (val) {
        return val.id === panel.id;
      });
      if (i != -1) {
        state.panels[i] = panel;
      }
      if (state.panel.id === panel.id) {
        state.panel = panel;
      }
    },
    push: function push(state, panel) {
      state.panels.push(panel);
    },
    put: function put(state, panel_id) {
      state.panels.splice(state.panels.findIndex(function (val) {
        return val.id === panel_id;
      }), 1);
    },
    capturar: function capturar(state, panel_id) {
      var panel = state.panels.find(function (val) {
        return val.id === panel_id;
      });
      if (panel != undefined) {
        state.panel = panel;
      }
    },
    setPanels: function setPanels(state, panels) {
      state.panels = panels;
    }
  },
  actions: {
    getPanels: function getPanels(_ref) {
      var commit = _ref.commit;
      return new Promise(function (resolve, reject) {
        axios.get('/api/panels/get/all').then(function (_ref2) {
          var data = _ref2.data;
          commit('setPanels', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetchData: function fetchData(_ref3, datos) {
      var state = _ref3.state,
        commit = _ref3.commit;
      return new Promise(function (resolve, reject) {
        axios.post("/api/panels/fetch/data", datos).then(function (_ref4) {
          var data = _ref4.data;
          commit('setPanels', data.panels);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetch: function fetch(_ref5, panel_id) {
      var state = _ref5.state,
        commit = _ref5.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/panels/".concat(panel_id, "/fetch/data")).then(function (_ref6) {
          var data = _ref6.data;
          commit('setPanel', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    guardar: function guardar(_ref7, datos) {
      var commit = _ref7.commit;
      return new Promise(function (resolve, reject) {
        if (datos.id) {
          axios.put("/api/panels/".concat(datos.id), datos).then(function (_ref8) {
            var data = _ref8.data;
            if (data.result) {
              commit('update', data.panel);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        } else {
          axios.post("/api/panels", datos).then(function (_ref9) {
            var data = _ref9.data;
            if (data.result) {
              commit('push', data.panel);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        }
      });
    },
    eliminar: function eliminar(_ref10, panel_id) {
      var commit = _ref10.commit;
      return new Promise(function (resolve, reject) {
        axios["delete"]("/api/panels/".concat(panel_id)).then(function (_ref11) {
          var data = _ref11.data;
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/src/store/modules/publicacion.js":
/*!*******************************************************!*\
  !*** ./resources/js/src/store/modules/publicacion.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.find-index.js */ "./node_modules/core-js/modules/es.array.find-index.js");
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.for-each.js */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_6__);







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: function state() {
    return {
      publicacion: {
        id: null,
        titulo: null,
        contenido: null,
        model_id: null,
        model_type: null,
        imagenes: [],
        model: null
      },
      publicaciones: []
    };
  },
  getters: {
    draft: function draft(state) {
      return clone(state.publicacion);
    }
  },
  mutations: {
    clear: function clear(state) {
      state.publicacion = {
        id: null,
        titulo: null,
        contenido: null,
        model_id: null,
        model_type: null,
        imagenes: [],
        model: null
      };
    },
    setPublicacion: function setPublicacion(state, publicacion) {
      state.publicacion = publicacion;
    },
    update: function update(state, publicacion) {
      var i = state.publicaciones.findIndex(function (val) {
        return val.id === publicacion.id;
      });
      if (i != -1) {
        state.publicaciones[i] = publicacion;
      }
      if (state.publicacion.id === publicacion.id) {
        state.publicacion = publicacion;
      }
    },
    push: function push(state, publicacion) {
      state.publicaciones.push(publicacion);
    },
    put: function put(state, publicacion_id) {
      state.publicaciones.splice(state.publicaciones.findIndex(function (val) {
        return val.id === publicacion_id;
      }), 1);
    },
    capturar: function capturar(state, publicacion_id) {
      var publicacion = state.publicaciones.find(function (val) {
        return val.id === publicacion_id;
      });
      if (publicacion != undefined) {
        state.publicacion = publicacion;
      }
    },
    setPublicaciones: function setPublicaciones(state, publicaciones) {
      state.publicaciones = publicaciones;
    },
    togglePortada: function togglePortada(state, _ref) {
      var imagen_id = _ref.imagen_id,
        portada = _ref.portada;
      if (state.publicacion.id) {
        state.publicacion.imagenes.forEach(function (val) {
          return val.portada = false;
        });
        var image = state.publicacion.imagenes.find(function (val) {
          return val.id === imagen_id;
        });
        image.portada = portada;
      }
    }
  },
  actions: {
    getPublicaciones: function getPublicaciones(_ref2, model) {
      var commit = _ref2.commit;
      return new Promise(function (resolve, reject) {
        axios.post("/api/publicacions/get/all", model).then(function (_ref3) {
          var data = _ref3.data;
          commit('setPublicaciones', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetchData: function fetchData(_ref4, datos) {
      var state = _ref4.state,
        commit = _ref4.commit;
      return new Promise(function (resolve, reject) {
        axios.post("/api/publicacions/fetch/data", datos).then(function (_ref5) {
          var data = _ref5.data;
          commit('setPublicaciones', data.publicaciones);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetch: function fetch(_ref6, publicacion_id) {
      var state = _ref6.state,
        commit = _ref6.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/publicacions/".concat(publicacion_id, "/fetch/data")).then(function (_ref7) {
          var data = _ref7.data;
          commit('setPublicacion', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    guardar: function guardar(_ref8, datos) {
      var commit = _ref8.commit;
      return new Promise(function (resolve, reject) {
        if (datos.id) {
          axios.put("/api/publicacions/".concat(datos.id), datos).then(function (_ref9) {
            var data = _ref9.data;
            if (data.result) {
              commit('update', data.publicacion);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        } else {
          axios.post("/api/publicacions", datos).then(function (_ref10) {
            var data = _ref10.data;
            if (data.result) {
              commit('push', data.publicacion);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        }
      });
    },
    eliminar: function eliminar(_ref11, publicacion_id) {
      var commit = _ref11.commit;
      return new Promise(function (resolve, reject) {
        axios["delete"]("/api/publicacions/".concat(publicacion_id)).then(function (_ref12) {
          var data = _ref12.data;
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    togglePortada: function togglePortada(_ref13, datos) {
      var commit = _ref13.commit;
      commit('togglePortada', {
        imagen_id: datos.imagen,
        portada: datos.portada
      });
      return new Promise(function (resolve, reject) {
        axios.put("/api/imagens/".concat(datos.imagen, "/toggle"), datos).then(function (_ref14) {
          var data = _ref14.data;
          if (data.result) {}
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    addImagenes: function addImagenes(_ref15, _ref16) {
      var commit = _ref15.commit;
      var publicacion_id = _ref16.publicacion_id,
        imagenes = _ref16.imagenes;
      var formData = new FormData();
      imagenes.forEach(function (val) {
        return formData.append('imagenes[]', val);
      });
      formData.append('_method', 'PUT');
      return new Promise(function (resolve, reject) {
        axios.post("/api/publicacions/".concat(publicacion_id, "/add/imagen"), formData, {
          headers: {
            ContentType: 'multipart/form-data'
          }
        }).then(function (_ref17) {
          var data = _ref17.data;
          if (data.result) {
            commit('update', data.publicacion);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    eliminarImagen: function eliminarImagen(_ref18, imagen_id) {
      var commit = _ref18.commit;
      return new Promise(function (resolve, reject) {
        axios["delete"]("/api/publicacions/eliminar/imagen/".concat(imagen_id)).then(function (_ref19) {
          var data = _ref19.data;
          if (data.result) {
            commit('update', data.publicacion);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/src/store/modules/retiro.js":
/*!**************************************************!*\
  !*** ./resources/js/src/store/modules/retiro.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.find-index.js */ "./node_modules/core-js/modules/es.array.find-index.js");
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.for-each.js */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.object.keys.js */ "./node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_7__);








/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: function state() {
    return {
      retiro: {
        id: null,
        usuario_id: null,
        usuario: null,
        monto: 0,
        status: 1,
        nota: '',
        comprobante: null
      },
      retiros: []
    };
  },
  getters: {
    draft: function draft(state) {
      return clone(state.retiro);
    }
  },
  mutations: {
    clear: function clear(state) {
      state.retiro = {
        id: null,
        usuario_id: null,
        usuario: null,
        monto: 0,
        status: 1,
        nota: '',
        comprobante: null
      };
    },
    setRetiro: function setRetiro(state, retiro) {
      state.retiro = retiro;
    },
    update: function update(state, retiro) {
      var i = state.retiros.findIndex(function (val) {
        return val.id === retiro.id;
      });
      if (i != -1) {
        state.retiros[i] = retiro;
      }
      if (state.retiro.id === retiro.id) {
        state.retiro = retiro;
      }
    },
    push: function push(state, retiro) {
      state.retiros.push(retiro);
    },
    put: function put(state, retiro_id) {
      state.retiros.splice(state.retiros.findIndex(function (val) {
        return val.id === retiro_id;
      }), 1);
    },
    capturar: function capturar(state, retiro_id) {
      var retiro = state.retiros.find(function (val) {
        return val.id === retiro_id;
      });
      if (retiro != undefined) {
        state.retiro = retiro;
      }
    },
    setRetiros: function setRetiros(state, retiros) {
      state.retiros = retiros;
    }
  },
  actions: {
    getRetiros: function getRetiros(_ref) {
      var commit = _ref.commit;
      return new Promise(function (resolve, reject) {
        axios.get('/api/retiros/get/all').then(function (_ref2) {
          var data = _ref2.data;
          commit('setRetiros', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetchData: function fetchData(_ref3, datos) {
      var state = _ref3.state,
        commit = _ref3.commit;
      return new Promise(function (resolve, reject) {
        axios.post("/api/retiros/fetch/data", datos).then(function (_ref4) {
          var data = _ref4.data;
          commit('setRetiros', data.retiros);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetch: function fetch(_ref5, retiro_id) {
      var state = _ref5.state,
        commit = _ref5.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/retiros/".concat(retiro_id, "/fetch/data")).then(function (_ref6) {
          var data = _ref6.data;
          commit('setRetiro', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    guardar: function guardar(_ref7, datos) {
      var commit = _ref7.commit;
      var formData = new FormData();
      Object.keys(datos).forEach(function (val) {
        formData.append(val, datos[val]);
      });
      var headers = {
        headers: {
          ContentType: 'multipart/form-data;'
        }
      };
      return new Promise(function (resolve, reject) {
        if (datos.id) {
          formData.append('_method', 'PUT');
          axios.post("/api/retiros/".concat(datos.id), formData, headers).then(function (_ref8) {
            var data = _ref8.data;
            if (data.result) {
              commit('update', data.retiro);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        } else {
          axios.post("/api/retiros", formData, headers).then(function (_ref9) {
            var data = _ref9.data;
            if (data.result) {
              commit('push', data.retiro);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        }
      });
    },
    eliminar: function eliminar(_ref10, retiro_id) {
      var commit = _ref10.commit;
      return new Promise(function (resolve, reject) {
        axios["delete"]("/api/retiros/".concat(retiro_id)).then(function (_ref11) {
          var data = _ref11.data;
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/src/store/modules/sistema.js":
/*!***************************************************!*\
  !*** ./resources/js/src/store/modules/sistema.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.for-each.js */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: function state() {
    return {
      sistema: {
        id: null,
        nombre: '',
        terminos: '',
        logotipo_fondo_claro: null,
        logotipo_fondo_oscuro: null,
        paypal_id: null,
        paypal_secrect: null,
        production_paypal: false,
        banner_principal: null,
        paypal: false,
        divisa_id: null,
        empresa_digital: false,
        negocio: {
          credito: 0,
          divisa_id: null
        },
        cuenta: null,
        imagenes: [],
        videos: [],
        sucursales: [],
        redes: [],
        cjdropshipping: null,
        porcentaje_referido: 5
      }
    };
  },
  getters: {
    draft: function draft(state) {
      return clone(state.sistema);
    },
    credentialPaypal: function credentialPaypal(state) {
      return {
        sandbox: state.sistema.paypal_id || 'ARMAQ0_8KFm9nIJKGSOJUNWBfVWngxhsuu1Vj7N6yL2LVnXBAa_JXIDUeuqkMYU2yONIvpWZZQl-DLiw',
        production: "<production client id>"
      };
    },
    saldo: function saldo(state) {
      return state.sistema.cuenta ? state.sistema.cuenta.saldo : 0;
    }
  },
  mutations: {
    setSistema: function setSistema(state, sistema) {
      state.sistema = sistema;
      if (!state.sistema.negocio) {
        state.sistema.negocio = {
          credito: 0,
          divisa_id: null
        };
      }
    },
    update: function update(state, sistema) {
      return state.sistema = sistema;
    },
    agregarRedSocial: function agregarRedSocial(state) {
      state.sistema.redes.push({
        nombre: '',
        url: '',
        icono: ''
      });
    },
    eliminarRed: function eliminarRed(state, idx) {
      state.sistema.redes.splice(idx, 1);
    }
  },
  actions: {
    cargarArchivo: function cargarArchivo(_ref, file) {
      var commit = _ref.commit,
        state = _ref.state;
      var formData = new FormData();
      file.forEach(function (val) {
        formData.append('archivos[]', val);
      });
      formData.append('model_id', state.sistema.id);
      return new Promise(function (resolve, reject) {
        axios__WEBPACK_IMPORTED_MODULE_6__["default"].post("/api/sistema/upload/archivos", formData, {
          headers: {
            ContentType: 'multipart/form-data'
          }
        }).then(function (_ref2) {
          var data = _ref2.data;
          if (data.result) {
            commit('update', data.sistema);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetch: function fetch(_ref3) {
      var commit = _ref3.commit;
      return new Promise(function (resolve, reject) {
        axios__WEBPACK_IMPORTED_MODULE_6__["default"].get('/api/sistema/fetch').then(function (_ref4) {
          var data = _ref4.data;
          commit('setSistema', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    guardar: function guardar(_ref5, datos) {
      var state = _ref5.state,
        commit = _ref5.commit;
      return new Promise(function (resolve, reject) {
        axios__WEBPACK_IMPORTED_MODULE_6__["default"].put("/api/sistema/".concat(state.sistema.id), datos).then(function (_ref6) {
          var data = _ref6.data;
          if (data.result) {
            commit('update', data.sistema);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    guardarLogo: function guardarLogo(_ref7, datos) {
      var commit = _ref7.commit,
        state = _ref7.state;
      return new Promise(function (resolve, reject) {
        var formData = new FormData();
        formData.append('logo', datos.logo);
        formData.append('tipo_logo'.datos.tipo_logo);
        formData.append('_method', 'PUT');
        axios__WEBPACK_IMPORTED_MODULE_6__["default"].post("/api/sistema/".concat(state.sistema.id, "/upload/logo"), formData, {
          headers: {
            ContentType: 'multipart/form-data'
          }
        }).then(function (_ref8) {
          var data = _ref8.data;
          if (data.result) {
            commit('update', data.sistema);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    crearCuenta: function crearCuenta(_ref9) {
      var state = _ref9.state,
        commit = _ref9.commit;
      return new Promise(function (resolve, reject) {
        axios__WEBPACK_IMPORTED_MODULE_6__["default"].get("/api/sistemas/".concat(state.sistema.id, "/crear/cuenta")).then(function (_ref10) {
          var data = _ref10.data;
          if (data.result) {
            commit('update', data.sistema);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    eliminarArchivo: function eliminarArchivo(_ref11, datos) {
      var state = _ref11.state,
        commit = _ref11.commit;
      return new Promise(function (resolve, reject) {
        axios__WEBPACK_IMPORTED_MODULE_6__["default"].put("/api/sistemas/".concat(state.sistema.id, "/eliminar/archivo"), datos).then(function (_ref12) {
          var data = _ref12.data;
          if (data.result) {
            commit('update', data.sistema);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    updateBanner: function updateBanner(_ref13, datos) {
      var commit = _ref13.commit,
        state = _ref13.state;
      var formData = new FormData();
      formData.append('banner', datos.banner_principal);
      formData.append('_method', 'PUT');
      return new Promise(function (resolve, reject) {
        axios__WEBPACK_IMPORTED_MODULE_6__["default"].post("/api/sistema/".concat(state.sistema.id, "/update/banner"), formData, {
          headers: {
            ContentType: 'multipart/form-data'
          }
        }).then(function (_ref14) {
          var data = _ref14.data;
          if (data.result) {
            commit('update', data.sistema);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    eliminarRed: function eliminarRed(_ref15, red) {
      var state = _ref15.state,
        commit = _ref15.commit;
      return new Promise(function (resolve, reject) {
        axios__WEBPACK_IMPORTED_MODULE_6__["default"]["delete"]("/api/sistema/".concat(state.sistema.id, "/eliminar/red/social/").concat(red)).then(function (_ref16) {
          var data = _ref16.data;
          if (data.result) {
            commit('update', data.sistema);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    optenerTokenDropshipping: function optenerTokenDropshipping(_ref17) {
      var state = _ref17.state,
        commit = _ref17.commit;
      return new Promise(function (resolve, reject) {
        axios__WEBPACK_IMPORTED_MODULE_6__["default"].get('/api/dropshipping/obtener-token').then(function (_ref18) {
          var data = _ref18.data;
          if (data.result) {
            commit('update', data.sistema);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    refreshTokenDropshipping: function refreshTokenDropshipping(_ref19) {
      var commit = _ref19.commit;
      return new Promise(function (resolve, reject) {
        axios__WEBPACK_IMPORTED_MODULE_6__["default"].get('/api/dropshipping/refresh-token').then(function (_ref20) {
          var data = _ref20.data;
          if (data.result) {
            commit('update', data.sistema);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    caducarTokenDropshipping: function caducarTokenDropshipping(_ref21) {
      var commit = _ref21.commit;
      return new Promise(function (resolve, reject) {
        axios__WEBPACK_IMPORTED_MODULE_6__["default"].get('/api/dropshipping/caducar-token').then(function (_ref22) {
          var data = _ref22.data;
          if (data.result) {
            commit('update', data.sistema);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/src/store/modules/sucursal.js":
/*!****************************************************!*\
  !*** ./resources/js/src/store/modules/sucursal.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.find-index.js */ "./node_modules/core-js/modules/es.array.find-index.js");
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_4__);





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: function state() {
    return {
      sucursal: {
        id: null,
        ciudad_id: null,
        estado_id: null,
        direccion: '',
        lat: null,
        lng: null,
        iata_id: null,
        model_id: null,
        model_type: null,
        ciudad: null,
        estado: null,
        model: null,
        iata: null,
        telefonos: []
      },
      sucursales: []
    };
  },
  getters: {
    draft: function draft(state) {
      return clone(state.sucursal);
    }
  },
  mutations: {
    clear: function clear(state) {
      state.sucursal = {
        id: null,
        ciudad_id: null,
        estado_id: null,
        direccion: '',
        lat: null,
        lng: null,
        iata_id: null,
        model_id: null,
        model_type: null,
        ciudad: null,
        estado: null,
        model: null,
        iata: null,
        telefonos: []
      };
    },
    setSucursal: function setSucursal(state, sucursal) {
      state.sucursal = sucursal;
    },
    update: function update(state, sucursal) {
      var i = state.sucursales.findIndex(function (val) {
        return val.id === sucursal.id;
      });
      if (i != -1) {
        state.sucursales[i] = sucursal;
      }
      if (state.sucursal.id === sucursal.id) {
        state.sucursal = sucursal;
      }
    },
    push: function push(state, sucursal) {
      state.sucursales.push(sucursal);
    },
    put: function put(state, sucursal_id) {
      state.sucursales.splice(state.sucursales.findIndex(function (val) {
        return val.id === sucursal_id;
      }), 1);
    },
    capturar: function capturar(state, sucursal_id) {
      var sucursal = state.sucursales.find(function (val) {
        return val.id === sucursal_id;
      });
      if (sucursal != undefined) {
        state.sucursal = sucursal;
      }
    },
    setSucursales: function setSucursales(state, sucursales) {
      state.sucursales = sucursales;
    },
    agregarTelefono: function agregarTelefono(state) {
      state.sucursal.telefonos.push({
        telefono: null,
        is_whatsapp: false,
        principal: false
      });
    },
    quitarTelefono: function quitarTelefono(state, i) {
      state.sucursal.telefonos.splice(i, 1);
    }
  },
  actions: {
    getSucursales: function getSucursales(_ref) {
      var commit = _ref.commit;
      return new Promise(function (resolve, reject) {
        axios.get('/api/sucursals/get/all').then(function (_ref2) {
          var data = _ref2.data;
          commit('setSucursales', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetchData: function fetchData(_ref3, datos) {
      var state = _ref3.state,
        commit = _ref3.commit;
      return new Promise(function (resolve, reject) {
        axios.post("/api/sucursals/fetch/data", datos).then(function (_ref4) {
          var data = _ref4.data;
          commit('setSucursales', data.sucursales);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetch: function fetch(_ref5, sucursal_id) {
      var state = _ref5.state,
        commit = _ref5.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/sucursals/".concat(sucursal_id, "/fetch/data")).then(function (_ref6) {
          var data = _ref6.data;
          commit('setSucursal', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    guardar: function guardar(_ref7, datos) {
      var commit = _ref7.commit;
      return new Promise(function (resolve, reject) {
        if (datos.id) {
          axios.put("/api/sucursals/".concat(datos.id), datos).then(function (_ref8) {
            var data = _ref8.data;
            if (data.result) {
              commit('update', data.sucursal);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        } else {
          axios.post("/api/sucursals", datos).then(function (_ref9) {
            var data = _ref9.data;
            if (data.result) {
              commit('push', data.sucursal);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        }
      });
    },
    eliminar: function eliminar(_ref10, sucursal_id) {
      var commit = _ref10.commit;
      return new Promise(function (resolve, reject) {
        axios["delete"]("/api/sucursals/".concat(sucursal_id)).then(function (_ref11) {
          var data = _ref11.data;
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    quitarTelefono: function quitarTelefono(_ref12, telefono) {
      var commit = _ref12.commit;
      return new Promise(function (resolve, reject) {
        axios["delete"]("/api/telefonos/".concat(telefono)).then(function (_ref13) {
          var data = _ref13.data;
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/src/store/modules/tableros/AdminTablero.js":
/*!*****************************************************************!*\
  !*** ./resources/js/src/store/modules/tableros/AdminTablero.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: function state() {
    return {
      cantidad_usuarios: 0
    };
  },
  mutations: {
    setTablero: function setTablero(state, data) {
      state.cantidad_usuarios = data.cantidad_usuarios;
    },
    updateTablero: function updateTablero(state, data) {
      state.cantidad_usuarios = data.cantidad_usuarios;
    }
  },
  actions: {
    cargarTablero: function cargarTablero(_ref) {
      var state = _ref.state,
        commit = _ref.commit;
      commit('toggleLoading', null, {
        root: true
      });
      axios.get('cargar/tablero/admin').then(function (respon) {
        commit('setTablero', respon.data);
      })["catch"](function (e) {
        console.log(e);
      }).then(function () {
        commit('toggleLoading', null, {
          root: true
        });
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/src/store/modules/tableros/UserTablero.js":
/*!****************************************************************!*\
  !*** ./resources/js/src/store/modules/tableros/UserTablero.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: function state() {
    return {};
  },
  mutations: {
    setTablero: function setTablero(state, data) {},
    updateTablero: function updateTablero(state, data) {}
  },
  actions: {
    cargarTablero: function cargarTablero(_ref) {
      var state = _ref.state,
        commit = _ref.commit;
      commit('toggleLoading', null, {
        root: true
      });
      axios.get('cargar/tablero/user').then(function (respon) {

        // commit('setTablero',respon.data);
      })["catch"](function (e) {
        console.log(e);
      }).then(function () {
        commit('toggleLoading', null, {
          root: true
        });
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/src/store/modules/tarjeta.js":
/*!***************************************************!*\
  !*** ./resources/js/src/store/modules/tarjeta.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.find-index.js */ "./node_modules/core-js/modules/es.array.find-index.js");
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_4__);





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: function state() {
    return {
      tarjeta: {
        id: null,
        lote_id: null,
        lote: null,
        numero: '',
        aplicada: false,
        usuario: null,
        validada: false
      },
      tarjetas: []
    };
  },
  getters: {
    draft: function draft(state) {
      return clone(state.tarjeta);
    }
  },
  mutations: {
    clear: function clear(state) {
      state.tarjeta = {
        id: null,
        lote_id: null,
        lote: null,
        numero: '',
        aplicada: false,
        usuario: null,
        validada: false
      };
    },
    setTarjeta: function setTarjeta(state, tarjeta) {
      if (tarjeta) {
        state.tarjeta = tarjeta;
      }
    },
    capturar: function capturar(state, tarjeta_id) {
      var tarjeta = state.tarjetas.find(function (val) {
        return val.id === tarjeta_id;
      });
      if (tarjeta != undefined) {
        state.tarjeta = tarjeta;
      }
    },
    update: function update(state, data) {
      if (data) {
        var i = state.tarjetas.findIndex(function (val) {
          return val.id === data.id;
        });
        if (i != -1) {
          state.tarjetas[i] = data;
        }
        if (state.tarjeta.id == data.id) {
          state.tarjeta = data;
        }
      }
    },
    put: function put(state, tarjeta_id) {
      state.tarjetas.splice(state.tarjetas.findIndex(function (val) {
        return val.id === tarjeta_id;
      }), 1);
    },
    push: function push(state, tarjeta) {
      state.tarjetas.push(tarjeta);
    },
    setTarjetas: function setTarjetas(state, tarjetas) {
      state.tarjetas = tarjetas;
    }
  },
  actions: {
    getTarjetas: function getTarjetas(_ref) {
      var commit = _ref.commit;
      axios.get("/api/get/tarjetas").then(function (_ref2) {
        var data = _ref2.data;
        commit('setTarjetas', data);
      })["catch"](function (e) {
        return console.log(e);
      });
    },
    fetchData: function fetchData(_ref3, data) {
      var commit = _ref3.commit;
      return new Promise(function (resolve, reject) {
        axios.post('/api/fetch/tarjetas', data).then(function (_ref4) {
          var datos = _ref4.data;
          commit('setTarjetas', datos.tarjetas);
          resolve(datos);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    guardar: function guardar(_ref5, datos) {
      var commit = _ref5.commit;
      return new Promise(function (resolve, reject) {
        if (datos.id) {
          axios.put("/api/tarjetas/".concat(datos.id), datos).then(function (_ref6) {
            var data = _ref6.data;
            if (data.result) {
              commit('update', data.tarjeta);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        } else {
          axios.post("/api/tarjetas", datos).then(function (_ref7) {
            var data = _ref7.data;
            if (data.result) {
              commit('push', data.tarjeta);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        }
      });
    },
    eliminar: function eliminar(_ref8, tarjeta_id) {
      var commit = _ref8.commit;
      return new Promise(function (resolve, reject) {
        axios["delete"]("/api/tarjetas/".concat(tarjeta_id)).then(function (_ref9) {
          var data = _ref9.data;
          if (data.result) {
            commit('put', tarjeta_id);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetch: function fetch(_ref10, tarjeta_id) {
      var commit = _ref10.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/fetch/tarjeta/".concat(tarjeta_id)).then(function (_ref11) {
          var data = _ref11.data;
          commit('setTarjeta', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    toggleValidacion: function toggleValidacion(_ref12, tarjeta_id) {
      var commit = _ref12.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/tarjetas/".concat(tarjeta_id, "/toggle-validation")).then(function (_ref13) {
          var data = _ref13.data;
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/src/store/modules/tienda/carrito.js":
/*!**********************************************************!*\
  !*** ./resources/js/src/store/modules/tienda/carrito.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.find-index.js */ "./node_modules/core-js/modules/es.array.find-index.js");
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_3__);




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: function state() {
    return {
      carrito: [],
      formulario: {
        cantidad: 0,
        tienda_id: null,
        producto_id: null,
        monto: 0,
        precio_unitario: 0,
        cliente_id: null,
        vid: null,
        isChino: false
      }
    };
  },
  mutations: {
    clear: function clear(state) {
      state.formulario = {
        cantidad: 0,
        tienda_id: null,
        producto_id: null,
        monto: 0,
        precio_unitario: 0,
        cliente_id: null,
        vid: null,
        isChino: false
      };
    },
    setProductos: function setProductos(state, productos) {
      state.carrito = productos;
    },
    sacarProducto: function sacarProducto(state, producto_id) {
      var i = state.carrito.findIndex(function (val) {
        return val.id === producto_id;
      });
      if (i != -1) {
        state.carrito.splice(i, 1);
      }
    }
  },
  actions: {
    getCarrito: function getCarrito(_ref, usuario_id) {
      var commit = _ref.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/carrito/compra/".concat(usuario_id, "/get")).then(function (_ref2) {
          var data = _ref2.data;
          commit('setProductos', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    quitarProducto: function quitarProducto(_ref3, _ref4) {
      var commit = _ref3.commit;
      var usuario_id = _ref4.usuario_id,
        producto_id = _ref4.producto_id;
      return new Promise(function (resolve, reject) {
        axios.get("/api/carrito/compra/".concat(usuario_id, "/quitar/producto/").concat(producto_id)).then(function (_ref5) {
          var data = _ref5.data;
          commit('sacarProducto', producto_id);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    agregarCarrito: function agregarCarrito(_ref6, datos) {
      var commit = _ref6.commit;
      return new Promise(function (resolve, reject) {
        axios.post('/api/carrito/comprar/agregar/producto', datos).then(function (_ref7) {
          var data = _ref7.data;
          if (data.result) {
            commit('setProductos', data.carrito);
            commit('clear');
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetchData: function fetchData(_ref8, datos) {
      var commit = _ref8.commit;
      return new Promise(function (resolve, reject) {
        axios.post("/api/carrito/fetch/data", datos).then(function (_ref9) {
          var data = _ref9.data;
          commit('setProductos', data.productos);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    calcularEnvio: function calcularEnvio(_ref10, datos) {
      var commit = _ref10.commit;
      return new Promise(function (resolve, reject) {
        axios.post("/api/carrito-compra/calcular-envio", datos).then(function (_ref11) {
          var data = _ref11.data;
          return resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/src/store/modules/tienda/categoriaProducto.js":
/*!********************************************************************!*\
  !*** ./resources/js/src/store/modules/tienda/categoriaProducto.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.find-index.js */ "./node_modules/core-js/modules/es.array.find-index.js");
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_4__);





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: function state() {
    return {
      categoria: {
        id: null,
        nombre: '',
        descripcion: '',
        productos: []
      },
      categorias: []
    };
  },
  getters: {
    draft: function draft(state) {
      return clone(state.categoria);
    }
  },
  mutations: {
    clear: function clear(state) {
      state.categoria = {
        id: null,
        nombre: '',
        descripcion: '',
        productos: []
      };
    },
    setCategoria: function setCategoria(state, categoria) {
      state.categoria = categoria;
    },
    update: function update(state, categoria) {
      var i = state.categorias.findIndex(function (val) {
        return val.id === categoria.id;
      });
      if (i != -1) {
        state.categorias[i] = categoria;
      }
      if (state.categoria.id === categoria.id) {
        state.categoria = categoria;
      }
    },
    push: function push(state, categoria) {
      state.categorias.push(categoria);
    },
    put: function put(state, categoria_id) {
      state.categorias.splice(state.categorias.findIndex(function (val) {
        return val.id === categoria_id;
      }), 1);
    },
    capturar: function capturar(state, categoria_id) {
      var categoria = state.categorias.find(function (val) {
        return val.id === categoria_id;
      });
      if (categoria != undefined) {
        state.categoria = categoria;
      }
    },
    setCategorias: function setCategorias(state, categorias) {
      state.categorias = categorias;
    }
  },
  actions: {
    getCategorias: function getCategorias(_ref) {
      var commit = _ref.commit;
      return new Promise(function (resolve, reject) {
        axios.get('/api/categoria-productos/get/all').then(function (_ref2) {
          var data = _ref2.data;
          commit('setCategorias', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetchData: function fetchData(_ref3, datos) {
      var state = _ref3.state,
        commit = _ref3.commit;
      return new Promise(function (resolve, reject) {
        axios.post("/api/categoria-productos/fetch/data", datos).then(function (_ref4) {
          var data = _ref4.data;
          commit('setCategorias', data.categorias);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetch: function fetch(_ref5, categoria_id) {
      var state = _ref5.state,
        commit = _ref5.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/categoria-productos/".concat(categoria_id, "/fetch/data")).then(function (_ref6) {
          var data = _ref6.data;
          commit('setCategoria', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    guardar: function guardar(_ref7, datos) {
      var commit = _ref7.commit;
      return new Promise(function (resolve, reject) {
        if (datos.id) {
          axios.put("/api/categoria-productos/".concat(datos.id), datos).then(function (_ref8) {
            var data = _ref8.data;
            if (data.result) {
              commit('update', data.categoria);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        } else {
          axios.post("/api/categoria-productos", datos).then(function (_ref9) {
            var data = _ref9.data;
            if (data.result) {
              commit('push', data.categoria);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        }
      });
    },
    eliminar: function eliminar(_ref10, categoria_id) {
      var commit = _ref10.commit;
      return new Promise(function (resolve, reject) {
        axios["delete"]("/api/categoria-productos/".concat(categoria_id)).then(function (_ref11) {
          var data = _ref11.data;
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    getCategoriasDropShipping: function getCategoriasDropShipping(_ref12) {
      var commit = _ref12.commit;
      return new Promise(function (resolve, reject) {
        axios.get('/api/categoria-productos/categories-dropshipping').then(function (_ref13) {
          var data = _ref13.data;
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/src/store/modules/tienda/consumo.js":
/*!**********************************************************!*\
  !*** ./resources/js/src/store/modules/tienda/consumo.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.find-index.js */ "./node_modules/core-js/modules/es.array.find-index.js");
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_5__);






/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: function state() {
    return {
      consumo: {
        id: null,
        cliente_id: null,
        empleado_id: null,
        total: 0,
        paypal_id: null,
        paypal: null,
        tps: 0,
        comentado: false,
        divisa_id: null,
        cliente: null,
        empleado: null,
        divisa: null,
        tienda_id: null,
        tienda: null,
        productos: [],
        ordencj: null,
        monto_envio: 0
      },
      consumos: []
    };
  },
  getters: {
    draft: function draft(state) {
      return clone(state.consumo);
    }
  },
  mutations: {
    clear: function clear(state) {
      state.consumo = {
        id: null,
        cliente_id: null,
        empleado_id: null,
        total: 0,
        paypal_id: null,
        paypal: null,
        tps: 0,
        comentado: false,
        divisa_id: null,
        cliente: null,
        empleado: null,
        divisa: null,
        productos: [],
        tienda_id: null,
        tienda: null,
        ordencj: null,
        monto_envio: 0
      };
    },
    setConsumo: function setConsumo(state, consumo) {
      state.consumo = consumo;
    },
    update: function update(state, consumo) {
      var i = state.consumos.findIndex(function (val) {
        return val.id === consumo.id;
      });
      if (i != -1) {
        state.consumos[i] = consumo;
      }
      if (state.consumo.id === consumo.id) {
        state.consumo = consumo;
      }
    },
    push: function push(state, consumo) {
      state.consumos.push(consumo);
    },
    put: function put(state, consumo_id) {
      state.consumos.splice(state.consumos.findIndex(function (val) {
        return val.id === consumo_id;
      }), 1);
    },
    capturar: function capturar(state, consumo_id) {
      var consumo = state.consumos.find(function (val) {
        return val.id === consumo_id;
      });
      if (consumo != undefined) {
        state.consumo = consumo;
      }
    },
    setConsumos: function setConsumos(state, consumos) {
      state.consumos = consumos;
    }
  },
  actions: {
    getConsumos: function getConsumos(_ref) {
      var commit = _ref.commit;
      return new Promise(function (resolve, reject) {
        axios.get('/api/consumos/get/all').then(function (_ref2) {
          var data = _ref2.data;
          commit('setConsumos', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetchData: function fetchData(_ref3, datos) {
      var state = _ref3.state,
        commit = _ref3.commit;
      return new Promise(function (resolve, reject) {
        axios.post("/api/consumos/fetch/data", datos).then(function (_ref4) {
          var data = _ref4.data;
          commit('setConsumos', data.consumos);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetch: function fetch(_ref5, consumo_id) {
      var state = _ref5.state,
        commit = _ref5.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/consumos/".concat(consumo_id, "/fetch/data")).then(function (_ref6) {
          var data = _ref6.data;
          commit('setConsumo', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    guardar: function guardar(_ref7, datos) {
      var commit = _ref7.commit;
      return new Promise(function (resolve, reject) {
        if (datos.id) {
          axios.put("/api/consumos/".concat(datos.id), datos).then(function (_ref8) {
            var data = _ref8.data;
            if (data.result) {
              commit('update', data.consumo);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        } else {
          axios.post("/api/consumos", datos).then(function (_ref9) {
            var data = _ref9.data;
            if (data.result) {
              commit('push', data.consumo);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        }
      });
    },
    eliminar: function eliminar(_ref10, consumo_id) {
      var commit = _ref10.commit;
      return new Promise(function (resolve, reject) {
        axios["delete"]("/api/consumos/".concat(consumo_id)).then(function (_ref11) {
          var data = _ref11.data;
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    marcarComentada: function marcarComentada(_ref12, consumo_id) {
      var commit = _ref12.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/consumos/".concat(consumo_id, "/marcar/comentada")).then(function (_ref13) {
          var data = _ref13.data;
          return resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    getOrdenDetailsCj: function getOrdenDetailsCj(_ref14, orden_id) {
      var commit = _ref14.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/consumos/orden-details/orden/".concat(orden_id)).then(function (_ref15) {
          var data = _ref15.data;
          return resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    confirmarOrdenCj: function confirmarOrdenCj(_ref16, orden_id) {
      var commit = _ref16.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/consumos/orden-details/confirmar-orden/".concat(orden_id)).then(function (_ref17) {
          var data = _ref17.data;
          return resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    eliminarOrdenCj: function eliminarOrdenCj(_ref18, _ref19) {
      var commit = _ref18.commit;
      var consumo = _ref19.consumo,
        orden = _ref19.orden;
      return new Promise(function (resolve, reject) {
        axios.get("/api/consumos/".concat(consumo, "/orden-details/eliminar-orden/").concat(orden)).then(function (_ref20) {
          var data = _ref20.data;
          return resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    pagarOrdenCj: function pagarOrdenCj(_ref21, orden_id) {
      var commit = _ref21.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/consumos/orden-details/pagar-orden/".concat(orden_id)).then(function (_ref22) {
          var data = _ref22.data;
          return resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/src/store/modules/tienda/producto.js":
/*!***********************************************************!*\
  !*** ./resources/js/src/store/modules/tienda/producto.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_reduce_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.reduce.js */ "./node_modules/core-js/modules/es.array.reduce.js");
/* harmony import */ var core_js_modules_es_array_reduce_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_reduce_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.filter.js */ "./node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.find-index.js */ "./node_modules/core-js/modules/es.array.find-index.js");
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.array.for-each.js */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_10__);











/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: function state() {
    return {
      producto: {
        id: null,
        nombre: '',
        breve: '',
        categoria_id: null,
        tiendas: [],
        precio: null,
        descripcion: null,
        disponibles: 1,
        caracteristicas: [],
        envio: null,
        divisa_id: null,
        tipo_producto: 1,
        // 1 => fisico, 2 => digital
        archivo: null,
        categoria: null,
        producto: null,
        opinions: [],
        imagenes: [],
        consumos: [],
        divisa: null,
        carritos: [],
        isChino: false,
        pid: null,
        cj: [],
        enviable: false
      },
      productos: []
    };
  },
  getters: {
    draft: function draft(state) {
      return clone(state.producto);
    },
    promedioCalificacion: function promedioCalificacion(state) {
      return function (producto) {
        var result = 0;
        if (producto.opinions.length) {
          var sum_calificacion = producto.opinions.reduce(function (a, b) {
            return a + Number(b.calificacion);
          }, 0);
          result = sum_calificacion / producto.opinions.length;
        }
        return result;
      };
    },
    porcentajeOpinions: function porcentajeOpinions(state) {
      return function (calificacion) {
        var cant_cali = state.producto.opinions.filter(function (val) {
          return val.calificacion == calificacion;
        }).length;
        var total_cali = state.producto.opinions.length;
        return {
          porcentaje: cant_cali > 0 ? cant_cali * 100 / total_cali : 0,
          cantidad: cant_cali
        };
      };
    }
  },
  mutations: {
    clear: function clear(state) {
      state.producto = {
        id: null,
        nombre: '',
        breve: '',
        categoria_id: null,
        tiendas: [],
        precio: null,
        descripcion: null,
        disponibles: 1,
        caracteristicas: [],
        envio: null,
        divisa_id: null,
        tipo_producto: 1,
        // 1 => fisico, 2 => digital
        archivo: null,
        categoria: null,
        producto: null,
        opinions: [],
        imagenes: [],
        consumos: [],
        divisa: null,
        carritos: [],
        isChino: false,
        pid: null,
        cj: [],
        enviable: false
      };
    },
    setProducto: function setProducto(state, producto) {
      state.producto = producto;
    },
    update: function update(state, producto) {
      var i = state.productos.findIndex(function (val) {
        return val.id === producto.id;
      });
      if (i != -1) {
        state.productos[i] = producto;
      }
      if (state.producto.id === producto.id) {
        state.producto = producto;
      }
    },
    push: function push(state, producto) {
      state.productos.push(producto);
    },
    put: function put(state, producto_id) {
      state.productos.splice(state.productos.findIndex(function (val) {
        return val.id === producto_id;
      }), 1);
    },
    capturar: function capturar(state, producto_id) {
      var producto = state.productos.find(function (val) {
        return val.id === producto_id;
      });
      if (producto != undefined) {
        state.producto = producto;
      }
    },
    setProductos: function setProductos(state, productos) {
      state.productos = productos;
    },
    agregarCaracteristica: function agregarCaracteristica(state) {
      state.producto.caracteristicas.push({
        nombre: '',
        valor: ''
      });
    },
    quitarCaracteristicas: function quitarCaracteristicas(state) {
      state.producto.caracteristicas = [];
    },
    quitarCaracteristica: function quitarCaracteristica(state, i) {
      state.producto.caracteristicas.splice(i, 1);
    },
    toggleEnvio: function toggleEnvio(state, val) {
      if (val) {
        state.producto.envio = {
          precio: 0,
          condiciones: ''
        };
      } else {
        state.producto.envio = null;
      }
    },
    togglePortada: function togglePortada(state, _ref) {
      var imagen_id = _ref.imagen_id,
        portada = _ref.portada;
      if (state.producto.id) {
        state.producto.imagenes.forEach(function (val) {
          return val.portada = false;
        });
        var image = state.producto.imagenes.find(function (val) {
          return val.id === imagen_id;
        });
        image.portada = portada;
      }
    },
    agregarTienda: function agregarTienda(state) {
      state.producto.tiendas.push({
        cantidad: 1,
        tienda_id: null
      });
    },
    quitarTienda: function quitarTienda(state, i) {
      state.producto.tiendas.splice(i, 1);
    }
  },
  actions: {
    getProductos: function getProductos(_ref2) {
      var commit = _ref2.commit;
      return new Promise(function (resolve, reject) {
        axios.get('/api/productos/get/all').then(function (_ref3) {
          var data = _ref3.data;
          commit('setProductos', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetchData: function fetchData(_ref4, datos) {
      var state = _ref4.state,
        commit = _ref4.commit;
      return new Promise(function (resolve, reject) {
        axios.post("/api/productos/fetch/data", datos).then(function (_ref5) {
          var data = _ref5.data;
          commit('setProductos', data.productos);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetchDataProductoDropShipping: function fetchDataProductoDropShipping(_ref6, filtro) {
      var commit = _ref6.commit;
      return new Promise(function (resolve, reject) {
        axios.post("/api/productos/cj-dropshipping/fetch/data", filtro).then(function (_ref7) {
          var data = _ref7.data;
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetch: function fetch(_ref8, producto_id) {
      var state = _ref8.state,
        commit = _ref8.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/productos/".concat(producto_id, "/fetch/data")).then(function (_ref9) {
          var data = _ref9.data;
          commit('setProducto', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    guardar: function guardar(_ref10, datos) {
      var commit = _ref10.commit,
        dispatch = _ref10.dispatch;
      return new Promise(function (resolve, reject) {
        if (datos.id) {
          axios.put("/api/productos/".concat(datos.id), datos).then(function (_ref11) {
            var data = _ref11.data;
            if (data.result) {
              commit('update', data.producto);
              if (datos.archivo && datos.archivo != null && datos.tipo_producto == 2) {
                dispatch('cargarArchivo', {
                  producto_id: data.producto.id,
                  archivo: datos.archivo
                });
              }
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        } else {
          axios.post("/api/productos", datos).then(function (_ref12) {
            var data = _ref12.data;
            if (data.result) {
              commit('push', data.producto);
              if (datos.archivo && datos.archivo != null && datos.tipo_producto == 2) {
                dispatch('cargarArchivo', {
                  producto_id: data.producto.id,
                  archivo: datos.archivo
                });
              }
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        }
      });
    },
    cargarArchivo: function cargarArchivo(_ref13, _ref14) {
      var commit = _ref13.commit;
      var archivo = _ref14.archivo,
        producto_id = _ref14.producto_id;
      var formData = new FormData();
      formData.append('archivo', archivo);
      formData.append('_method', 'PUT');
      return new Promise(function (resolve, reject) {
        axios.post("/api/productos/".concat(producto_id, "/cargar/archivo"), formData, {
          headers: {
            ContentType: 'multipart/form-data'
          }
        }).then(function (_ref15) {
          var data = _ref15.data;
          if (data.result) {
            commit('update', data.producto);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    eliminar: function eliminar(_ref16, producto_id) {
      var commit = _ref16.commit;
      return new Promise(function (resolve, reject) {
        axios["delete"]("/api/productos/".concat(producto_id)).then(function (_ref17) {
          var data = _ref17.data;
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    cargarImagen: function cargarImagen(_ref18, _ref19) {
      var state = _ref18.state,
        commit = _ref18.commit;
      var imagenes = _ref19.imagenes;
      var formData = new FormData();
      imagenes.forEach(function (val) {
        formData.append('imagen[]', val);
      });
      formData.append('_method', 'put');
      return new Promise(function (resolve, reject) {
        axios.post("/api/productos/".concat(state.producto.id, "/cargar/imagen"), formData, {
          headers: {
            ContentType: "multipart/form-data: boundary=something"
          }
        }).then(function (_ref20) {
          var data = _ref20.data;
          if (data.result) {
            commit('update', data.producto);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    eliminarImagen: function eliminarImagen(_ref21, imagen_id) {
      var state = _ref21.state,
        commit = _ref21.commit;
      return new Promise(function (resolve, reject) {
        axios["delete"]("/api/productos/".concat(state.producto.id, "/eliminar/imagen/").concat(imagen_id)).then(function (_ref22) {
          var data = _ref22.data;
          if (data.result) {
            commit('update', data.producto);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    togglePortada: function togglePortada(_ref23, datos) {
      var commit = _ref23.commit;
      commit('togglePortada', {
        imagen_id: datos.imagen,
        portada: datos.portada
      });
      return new Promise(function (resolve, reject) {
        axios.put("/api/imagens/".concat(datos.imagen, "/toggle"), datos).then(function (_ref24) {
          var data = _ref24.data;
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    productoDetailsCj: function productoDetailsCj(_ref25, producto_id) {
      var commit = _ref25.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/productos/details/".concat(producto_id)).then(function (_ref26) {
          var data = _ref26.data;
          return resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    agregarToTravel: function agregarToTravel(_ref27, pid) {
      var commit = _ref27.commit;
      return new Promise(function (resolve, reject) {
        return axios.get("/api/productos/agregar-to-travel/producto-cj/".concat(pid)).then(function (_ref28) {
          var data = _ref28.data;
          return resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    cjProductStock: function cjProductStock(_ref29, vid) {
      var commit = _ref29.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/productos-cj/vid/".concat(vid, "/stock")).then(function (_ref30) {
          var data = _ref30.data;
          return resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/src/store/modules/tienda/tienda.js":
/*!*********************************************************!*\
  !*** ./resources/js/src/store/modules/tienda/tienda.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.find-index.js */ "./node_modules/core-js/modules/es.array.find-index.js");
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_4__);





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: function state() {
    return {
      tienda: {
        id: null,
        nombre: '',
        divisa_id: null,
        fisica: false,
        iata_id: null,
        ciudad_id: null,
        estado_id: null,
        lat: null,
        lng: null,
        direccion: '',
        ciudad: null,
        estado: null,
        iata: null,
        divisa: null,
        productos: []
      },
      tiendas: []
    };
  },
  getters: {
    draft: function draft(state) {
      return clone(state.tienda);
    },
    getCurrency: function getCurrency(state) {
      return function (tienda_id) {
        var tienda = state.tiendas.find(function (val) {
          return val.id === tienda_id;
        });
        if (tienda != undefined) {
          return tienda.divisa.iso;
        }
        return 'MXN';
      };
    }
  },
  mutations: {
    clear: function clear(state) {
      state.tienda = {
        id: null,
        nombre: '',
        divisa_id: null,
        fisica: false,
        iata_id: null,
        ciudad_id: null,
        estado_id: null,
        lat: null,
        lng: null,
        direccion: '',
        ciudad: null,
        estado: null,
        iata: null,
        divisa: null,
        productos: []
      };
    },
    setTienda: function setTienda(state, tienda) {
      state.tienda = tienda;
    },
    update: function update(state, tienda) {
      var i = state.tiendas.findIndex(function (val) {
        return val.id === tienda.id;
      });
      if (i != -1) {
        state.tiendas[i] = tienda;
      }
      if (state.tienda.id === tienda.id) {
        state.tienda = tienda;
      }
    },
    push: function push(state, tienda) {
      state.tiendas.push(tienda);
    },
    put: function put(state, tienda_id) {
      state.tiendas.splice(state.tiendas.findIndex(function (val) {
        return val.id === tienda_id;
      }), 1);
    },
    capturar: function capturar(state, tienda_id) {
      var tienda = state.tiendas.find(function (val) {
        return val.id === tienda_id;
      });
      if (tienda != undefined) {
        state.tienda = tienda;
      }
    },
    setTiendas: function setTiendas(state, tiendas) {
      state.tiendas = tiendas;
    }
  },
  actions: {
    getTiendas: function getTiendas(_ref) {
      var commit = _ref.commit;
      return new Promise(function (resolve, reject) {
        axios.get('/api/tiendas/get/all').then(function (_ref2) {
          var data = _ref2.data;
          commit('setTiendas', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetchData: function fetchData(_ref3, datos) {
      var state = _ref3.state,
        commit = _ref3.commit;
      return new Promise(function (resolve, reject) {
        axios.post("/api/tiendas/fetch/data", datos).then(function (_ref4) {
          var data = _ref4.data;
          commit('setTiendas', data.tiendas);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetch: function fetch(_ref5, tienda_id) {
      var state = _ref5.state,
        commit = _ref5.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/tiendas/".concat(tienda_id, "/fetch/data")).then(function (_ref6) {
          var data = _ref6.data;
          commit('setTienda', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    guardar: function guardar(_ref7, datos) {
      var commit = _ref7.commit;
      return new Promise(function (resolve, reject) {
        if (datos.id) {
          axios.put("/api/tiendas/".concat(datos.id), datos).then(function (_ref8) {
            var data = _ref8.data;
            if (data.result) {
              commit('update', data.tienda);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        } else {
          axios.post("/api/tiendas", datos).then(function (_ref9) {
            var data = _ref9.data;
            if (data.result) {
              commit('push', data.tienda);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        }
      });
    },
    eliminar: function eliminar(_ref10, tienda_id) {
      var commit = _ref10.commit;
      return new Promise(function (resolve, reject) {
        axios["delete"]("/api/tiendas/".concat(tienda_id)).then(function (_ref11) {
          var data = _ref11.data;
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/src/store/modules/usuario.js":
/*!***************************************************!*\
  !*** ./resources/js/src/store/modules/usuario.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js */ "./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js");
/* harmony import */ var _home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty.js */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var core_js_modules_es_json_stringify_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.json.stringify.js */ "./node_modules/core-js/modules/es.json.stringify.js");
/* harmony import */ var core_js_modules_es_json_stringify_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_json_stringify_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.array.find-index.js */ "./node_modules/core-js/modules/es.array.find-index.js");
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.object.keys.js */ "./node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.array.filter.js */ "./node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.array.for-each.js */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! core-js/modules/es.array.map.js */ "./node_modules/core-js/modules/es.array.map.js");
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! .. */ "./resources/js/src/store/index.js");

















/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: function state() {
    var _usuario, _user;
    return {
      usuario: (_usuario = {
        username: null,
        id: null,
        nombre: null,
        apellido: null,
        telefonos: [],
        bio: '',
        website: '',
        fecha_nacimiento: '',
        genero: 1,
        codigo_postal: null,
        activo: true,
        imagen: '',
        direccion: '',
        email: '',
        password: '',
        lenguaje: 1,
        rol: {},
        rol_id: null,
        avatar: ''
      }, (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_usuario, "lenguaje", 'es'), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_usuario, "is_whatsapp", false), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_usuario, "twitter", ''), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_usuario, "facebook", ''), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_usuario, "instagram", ''), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_usuario, "avatar", null), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_usuario, "ultimo_login", null), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_usuario, "ciudad_id", null), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_usuario, "ciudad", null), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_usuario, "codigo_referidor", null), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_usuario, "referidos", []), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_usuario, "referidor", []), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_usuario, "likes", []), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_usuario, "negocios", []), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_usuario, "cupones", []), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_usuario, "carrito_compra", []), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_usuario, "status", 3), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_usuario, "lider", null), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_usuario, "promotores", []), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_usuario, "tarjeta_id", null), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_usuario, "tarjeta", null), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_usuario, "destino_id", null), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_usuario, "destino", null), _usuario),
      user: (_user = {
        username: null,
        id: null,
        nombre: null,
        apellido: null,
        telefonos: [],
        bio: '',
        website: '',
        fecha_nacimiento: '',
        genero: 1,
        codigo_postal: null,
        activo: true,
        imagen: '',
        direccion: '',
        email: '',
        password: '',
        lenguaje: 1,
        rol: {},
        rol_id: null,
        avatar: ''
      }, (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_user, "lenguaje", 'es'), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_user, "is_whatsapp", false), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_user, "twitter", ''), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_user, "facebook", ''), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_user, "instagram", ''), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_user, "avatar", null), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_user, "ultimo_login", null), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_user, "ciudad_id", null), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_user, "ciudad", null), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_user, "codigo_referidor", null), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_user, "referidos", []), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_user, "referidor", []), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_user, "negocios", []), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_user, "cupones", []), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_user, "tarjeta_id", null), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_user, "tarjeta", null), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_user, "destino_id", null), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_user, "destino", null), _user),
      usuarios: []
    };
  },
  mutations: {
    cargarUser: function cargarUser(state, data) {
      localStorage.setItem('userData', JSON.stringify(data));
      state.usuario = data;
    },
    setTelefono: function setTelefono(state, numero) {
      state.usuario.telefono = numero;
    },
    setUsuarios: function setUsuarios(state, usuarios) {
      state.usuarios = usuarios;
    },
    setUsuario: function setUsuario(state, usuario) {
      if (usuario != undefined || usuario != null) {
        state.user = usuario;
      }
    },
    pushUsuario: function pushUsuario(state, usuario) {
      state.usuarios.push(usuario);
    },
    capturarUsuario: function capturarUsuario(state, id_usuario) {
      state.user = state.usuarios.find(function (user) {
        return user.id == id_usuario;
      });
    },
    clearUsuario: function clearUsuario(state) {
      var _state$user;
      state.user = (_state$user = {
        username: null,
        id: null,
        nombre: null,
        apellido: null,
        telefonos: [],
        bio: '',
        website: '',
        fecha_nacimiento: '',
        genero: 1,
        codigo_postal: null,
        activo: true,
        imagen: '',
        direccion: '',
        email: '',
        password: '',
        lenguaje: 1,
        rol: {},
        rol_id: null,
        avatar: ''
      }, (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_state$user, "lenguaje", 'es'), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_state$user, "is_whatsapp", false), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_state$user, "twitter", ''), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_state$user, "facebook", ''), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_state$user, "instagram", ''), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_state$user, "avatar", null), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_state$user, "ultimo_login", null), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_state$user, "ciudad_id", null), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_state$user, "ciudad", null), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_state$user, "codigo_referidor", null), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_state$user, "referidos", []), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_state$user, "referidor", []), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_state$user, "negocios", []), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_state$user, "cupones", []), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_state$user, "tarjeta_id", null), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_state$user, "tarjeta", null), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_state$user, "destino_id", null), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_state$user, "destino", null), _state$user);
    },
    updateUsuario: function updateUsuario(state, data) {
      var i = state.usuarios.findIndex(function (user) {
        return user.id == data.id;
      });
      if (i != -1) {
        state.usuarios[i] = data;
        state.user = data;
      }
    },
    update: function update(state, data) {
      var i = state.usuarios.findIndex(function (user) {
        return user.id == data.id;
      });
      if (i != -1) {
        state.usuarios[i] = data;
        // state.usuario = data;
      }
    },
    updateAvatar: function updateAvatar(state, avatar) {
      var user = JSON.parse(localStorage.getItem('userData'));
      user.avatar = avatar;
      localStorage.setItem('userData', JSON.stringify(user));
      state.usuario.avatar = avatar;
    },
    actualizarAvatarDeUsuario: function actualizarAvatarDeUsuario(state, avatar) {
      var user = state.usuarios.find(function (val) {
        return val.id == state.user.id;
      });
      if (user != undefined) {
        user.avatar = avatar;
      }
    },
    updatePerfil: function updatePerfil(state, data) {
      localStorage.setItem('userData', JSON.stringify(data));
      state.usuario = data;
    },
    desactivarCuenta: function desactivarCuenta(state, result) {
      var user = JSON.parse(localStorage.getItem('userData'));
      user.activo = !result;
      localStorage.setItem('userData', JSON.stringify(user));
      state.usuario.activo = !result;
    },
    limpiarUsuario: function limpiarUsuario(state) {
      var _state$usuario;
      state.usuario = (_state$usuario = {
        id: null,
        username: null,
        nombre: null,
        apellido: null,
        telefonos: [],
        bio: '',
        website: '',
        fecha_nacimiento: '',
        genero: 1,
        codigo_postal: null,
        activo: true,
        imagen: '',
        direccion: '',
        email: '',
        password: '',
        lenguaje: 1,
        rol: {},
        rol_id: null,
        avatar: ''
      }, (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_state$usuario, "lenguaje", 'es'), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_state$usuario, "is_whatsapp", false), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_state$usuario, "twitter", ''), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_state$usuario, "facebook", ''), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_state$usuario, "instagram", ''), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_state$usuario, "avatar", null), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_state$usuario, "ultimo_login", null), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_state$usuario, "ciudad_id", null), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_state$usuario, "ciudad", null), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_state$usuario, "codigo_referidor", null), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_state$usuario, "referidos", []), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_state$usuario, "referidor", []), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_state$usuario, "likes", []), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_state$usuario, "status", 3), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_state$usuario, "lider", null), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_state$usuario, "promotores", []), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_state$usuario, "tarjeta_id", null), (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_state$usuario, "tarjeta", null), _state$usuario);
    },
    agregarTelefono: function agregarTelefono(state) {
      var user = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'user';
      if (user == 'user') {
        state.user.telefonos.push({
          telefono: '',
          is_whatsapp: false,
          principal: false
        });
      } else {
        state.usuario.telefonos.push({
          telefono: '',
          is_whatsapp: false,
          principal: false
        });
      }
    },
    quitarTelefono: function quitarTelefono(state, i) {
      state.user.telefonos.splice(i, 1);
    },
    updateTelefono: function updateTelefono(state, telefono) {
      var i = state.user.telefonos.findIndex(function (val) {
        return val.telefono === telefono.telefono;
      });
      if (i != -1) {
        state.user.telefonos[i] = telefono;
      }
    },
    actualizarTelefono: function actualizarTelefono(state, telefono) {
      var i = state.usuario.telefonos.findIndex(function (val) {
        return val.telefono === telefono.telefono;
      });
      if (i != -1) {
        state.usuario.telefonos[i] = telefono;
      }
    },
    removerTelefono: function removerTelefono(state) {
      var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      state.usuario.telefonos.splice(i, 1);
    },
    setLikesUser: function setLikesUser(state, likes) {
      state.usuario.likes = likes;
    },
    setStatusLider: function setStatusLider(state, _ref) {
      var promotores_activos = _ref.promotores_activos;
      var ultimo_mes = promotores_activos.ultimo_mes,
        ultimo_trimestre = promotores_activos.ultimo_trimestre;
      if (ultimo_mes > 0) {
        state.usuario.status = 1;
      } else if (ultimo_trimestre > 0) {
        state.usuario.status = 2;
      } else {
        state.usuario.status = 3;
      }
    },
    setStatusCoordinador: function setStatusCoordinador(state, _ref2) {
      var lideres_activos = _ref2.lideres_activos;
      var ultimo_mes = lideres_activos.ultimo_mes,
        ultimo_trimestre = lideres_activos.ultimo_trimestre;
      if (ultimo_mes > 0) {
        state.usuario.status = 1;
      } else if (ultimo_trimestre > 0) {
        state.usuario.status = 2;
      } else {
        state.usuario.status = 3;
      }
    }
  },
  getters: {
    draft: function draft(state) {
      return clone(state.user);
    },
    draftUsuario: function draftUsuario(state) {
      return clone(state.usuario);
    },
    isLikeModel: function isLikeModel(state) {
      return function (_ref3) {
        var model_id = _ref3.model_id,
          model_type = _ref3.model_type;
        return state.usuario.likes.filter(function (val) {
          return val.model_id === model_id && val.model_type == model_type;
        }).length ? true : false;
      };
    },
    conPermiso: function conPermiso(state) {
      return function (permiso) {
        if (state.usuario) {
          return state.usuario.roles[0].permissions.find(function (permission) {
            return permission.name == permiso;
          });
        }
        return false;
      };
    },
    getUsuarios: function getUsuarios(state) {
      return function (rol) {
        return state.usuarios.filter(function (user) {
          var i = user.roles.findIndex(function (val, i) {
            return roles.name == rol;
          });
          if (i > 0) {
            return true;
          } else {
            return false;
          }
        });
      };
    },
    getUsuario: function getUsuario(state) {
      return function (id) {
        return state.usuarios.find(function (user) {
          return user.id == id;
        });
      };
    },
    getListado: function getListado(state) {
      return function (users_id) {
        var users = [];
        users_id.forEach(function (e, i) {
          var us = state.usuarios.find(function (u) {
            return u.id == e.user_id;
          });
          if (us != undefined) {
            if (users.find(function (u) {
              return u.id == us.id;
            }) == undefined) {
              users.push(us);
            }
          }
        });
        console.log(users);
        return users;
      };
    },
    isRol: function isRol(state) {
      return function (rol) {
        var role = state.usuario.roles.find(function (val) {
          return val.name == rol;
        });
        return role != undefined;
      };
    },
    getFullName: function getFullName(state) {
      return "".concat(state.usuario.nombre, " ").concat(state.usuario.apellido);
    },
    avatar: function avatar(state) {
      return state.usuario.avatar;
    },
    getCoordinadoresHotel: function getCoordinadoresHotel(state) {
      return function (rol) {
        return state.usuarios.filter(function (val) {
          return val.rol.nombre == rol;
        });
      };
    },
    getFilterUsers: function getFilterUsers(state) {
      return function (roles_name) {
        var result = state.usuarios.filter(function (val) {
          return roles_name.find(function (value) {
            return value == val.rol.nombre;
          }) != undefined ? true : false;
        });
        return result.map(function (val) {
          return {
            label: val.nombre,
            value: val.id,
            id: val.id,
            email: val.email
          };
        });
      };
    }
  },
  actions: {
    cargarUsuarios: function cargarUsuarios(_ref4) {
      var state = _ref4.state,
        commit = _ref4.commit;
      return new Promise(function (resolve, reject) {
        axios.get('/api/usuarios/all').then(function (_ref5) {
          var data = _ref5.data;
          commit('setUsuarios', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    cargarLideres: function cargarLideres(_ref6) {
      var state = _ref6.state,
        commit = _ref6.commit;
      return new Promise(function (resolve, reject) {
        axios.get('/api/usuarios/get/lideres').then(function (_ref7) {
          var data = _ref7.data;
          commit('setUsuarios', data);
          resolve(data);
        })["catch"](function (e) {
          reject(e);
        });
      });
    },
    cargarCoordinadores: function cargarCoordinadores(_ref8) {
      var state = _ref8.state,
        commit = _ref8.commit;
      return new Promise(function (resolve, reject) {
        axios.get('/api/usuarios/get/coordinadores').then(function (_ref9) {
          var data = _ref9.data;
          commit('setUsuarios', data);
          resolve(data);
        })["catch"](function (e) {
          reject(e);
        });
      });
    },
    cargarUsuario: function cargarUsuario(_ref10) {
      var state = _ref10.state,
        commit = _ref10.commit,
        dispatch = _ref10.dispatch;
      // return await axios.get('/app/get/data');
      var options = {
        'headers': {
          'WWW-Authenticate': 'Bearer',
          'Authorization': localStorage.getItem('token')
        }
      };
      return new Promise(function (resolve, reject) {
        axios.get("/api/auth/user/", null, options).then(function (_ref11) {
          var data = _ref11.data;
          commit('cargarUser', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    guardar: function guardar(_ref12, data) {
      return (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/(0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee() {
        var state, commit, dispatch;
        return (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              state = _ref12.state, commit = _ref12.commit, dispatch = _ref12.dispatch;
              return _context.abrupt("return", new Promise(function (resolve, reject) {
                if (data.id) {
                  axios.put("/api/usuarios/" + data.id, data).then(function (_ref13) {
                    var datos = _ref13.data;
                    if (datos.result) {
                      commit('update', datos.usuario);
                    }
                    resolve(datos);
                  })["catch"](function (e) {
                    return reject(e);
                  });
                } else {
                  axios.post('/api/usuarios', data).then(function (_ref14) {
                    var datos = _ref14.data;
                    if (datos.result) {
                      commit('pushUsuario', datos.usuario);
                    }
                    resolve(datos);
                  })["catch"](function (e) {
                    return reject(e);
                  });
                }
              }));
            case 2:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    },
    guardarUsuario: function guardarUsuario(_ref15, data) {
      return (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/(0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee2() {
        var state, commit;
        return (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              state = _ref15.state, commit = _ref15.commit;
              _context2.next = 3;
              return new Promise(function (resolve, reject) {
                commit('toggleLoading', null, {
                  root: true
                });
                axios.put("/api/perfil/update/usuario/".concat(state.usuario.id), data).then(function (_ref16) {
                  var data = _ref16.data;
                  if (data.result) {
                    commit('updatePerfil', data.usuario);
                  }
                  resolve(data);
                })["catch"](function (e) {
                  return reject(e);
                }).then(function () {
                  return commit('toggleLoading', null, {
                    root: true
                  });
                });
              });
            case 3:
              return _context2.abrupt("return", _context2.sent);
            case 4:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }))();
    },
    cambiarContrasena: function cambiarContrasena(_ref17, data) {
      return (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/(0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee3() {
        var commit, state;
        return (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              commit = _ref17.commit, state = _ref17.state;
              _context3.next = 3;
              return new Promise(function (resolve, reject) {
                axios.put("/api/cambiar/contrasena/usuario/".concat(state.usuario.id), data).then(function (_ref18) {
                  var data = _ref18.data;
                  resolve(data);
                })["catch"](function (e) {
                  return reject(e);
                });
              });
            case 3:
              return _context3.abrupt("return", _context3.sent);
            case 4:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }))();
    },
    eliminar: function eliminar(_ref19, data) {
      return (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/(0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee4() {
        var state;
        return (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              state = _ref19.state;
              _context4.next = 3;
              return axios["delete"]("/api/usuarios/".concat(data));
            case 3:
              return _context4.abrupt("return", _context4.sent);
            case 4:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }))();
    },
    updateAvatarUser: function updateAvatarUser(_ref20, data) {
      return (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/(0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee5() {
        var state;
        return (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              state = _ref20.state;
              _context5.next = 3;
              return axios.post("/api/usuario/".concat(state.user.id, "/update/avatar"), data, {
                headers: {
                  'Content-Type': 'multipart/form-data; boundary=something'
                }
              });
            case 3:
              return _context5.abrupt("return", _context5.sent);
            case 4:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }))();
    },
    fetchUsers: function fetchUsers(_ref21, searchQuery) {
      var state = _ref21.state,
        commit = _ref21.commit;
      return new Promise(function (resolve, reject) {
        axios.post('/api/fetch/usuarios', searchQuery).then(function (response) {
          var data = response.data;
          commit('setUsuarios', data.users);
          resolve(response);
        })["catch"](function (error) {
          return reject(error);
        });
      });
    },
    fetchMovimientos: function fetchMovimientos(_ref22, searchQuery) {
      var state = _ref22.state,
        commit = _ref22.commit;
      return new Promise(function (resolve, reject) {
        commit('toggleLoading', null, {
          root: true
        });
        axios.post('/api/billetera/listar/movimientos', searchQuery).then(function (response) {
          return resolve(response);
        })["catch"](function (error) {
          return reject(error);
        }).then(function () {
          return commit('toggleLoading', null, {
            root: true
          });
        });
      });
    },
    login: function login(_ref23, data) {
      var state = _ref23.state,
        commit = _ref23.commit;
      return new Promise(function (resolv, reject) {})["catch"](function (e) {
        console.log(e);
      }).then(function () {});
    },
    getUsuario: function getUsuario(_ref24, id_usuario) {
      var state = _ref24.state,
        commit = _ref24.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/usuarios/".concat(id_usuario, "/get")).then(function (_ref25) {
          var data = _ref25.data;
          commit('setUsuario', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    desactivarCuenta: function desactivarCuenta(_ref26, data) {
      return (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/(0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee6() {
        var commit;
        return (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              commit = _ref26.commit;
              _context6.next = 3;
              return new Promise(function (resolve, reject) {
                commit('toggleLoading', null, {
                  root: true
                });
                axios.post("/api/desactivar/usuario", data).then(function (_ref27) {
                  var datos = _ref27.data;
                  commit('desactivarCuenta', datos.result);
                  resolve(datos);
                })["catch"](function (e) {
                  return reject(e);
                }).then(function () {
                  commit('toggleLoading', null, {
                    root: true
                  });
                });
              });
            case 3:
              return _context6.abrupt("return", _context6.sent);
            case 4:
            case "end":
              return _context6.stop();
          }
        }, _callee6);
      }))();
    },
    crearLinkReferido: function crearLinkReferido(_ref28, data) {
      return (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/(0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee7() {
        var commit;
        return (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              commit = _ref28.commit;
              _context7.next = 3;
              return new Promise(function (resolve, reject) {
                axios.put("/api/usuarios/".concat(data.id, "/crear/link/referidor"), data).then(function (_ref29) {
                  var datos = _ref29.data;
                  commit('updatePerfil', datos.usuario);
                  resolve(datos);
                })["catch"](function (e) {
                  return reject(e);
                });
              });
            case 3:
              return _context7.abrupt("return", _context7.sent);
            case 4:
            case "end":
              return _context7.stop();
          }
        }, _callee7);
      }))();
    },
    verificarCodigoReferido: function verificarCodigoReferido(_ref30, codigo) {
      return (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/(0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee8() {
        var commit;
        return (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              commit = _ref30.commit;
              _context8.next = 3;
              return new Promise(function (resolve, reject) {
                commit('toggleLoading', null, {
                  root: true
                });
                axios.get("/api/usuarios/verificar/codigo/".concat(codigo)).then(function (_ref31) {
                  var data = _ref31.data;
                  resolve(data);
                })["catch"](function (e) {
                  return reject(e);
                }).then(function () {
                  commit('toggleLoading', null, {
                    root: true
                  });
                });
              });
            case 3:
              return _context8.abrupt("return", _context8.sent);
            case 4:
            case "end":
              return _context8.stop();
          }
        }, _callee8);
      }))();
    },
    nuevoUsuario: function nuevoUsuario(_ref32, data) {
      return (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/(0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee9() {
        var commit;
        return (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              commit = _ref32.commit;
              _context9.next = 3;
              return new Promise(function (resolve, reject) {
                axios.post('/api/auth/nuevo/usuario', data).then(function (_ref33) {
                  var datos = _ref33.data;
                  resolve(datos);
                })["catch"](function (e) {
                  reject(e);
                });
              });
            case 3:
              return _context9.abrupt("return", _context9.sent);
            case 4:
            case "end":
              return _context9.stop();
          }
        }, _callee9);
      }))();
    },
    misReferidos: function misReferidos(_ref34, data) {
      return (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/(0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee10() {
        var commit;
        return (0,_home_megajdcc_jdcc_sistemas_Mario_travelpoints_2_0_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              commit = _ref34.commit;
              return _context10.abrupt("return", new Promise(function (resolve, reject) {
                commit('toggleLoading', null, {
                  root: true
                });
                axios.post('/api/usuario/perfil/referidos', data).then(function (_ref35) {
                  var datos = _ref35.data;
                  resolve(datos);
                })["catch"](function (e) {
                  return reject(e);
                }).then(function () {
                  return commit('toggleLoading', null, {
                    root: true
                  });
                });
              }));
            case 2:
            case "end":
              return _context10.stop();
          }
        }, _callee10);
      }))();
    },
    guardarTelefono: function guardarTelefono(_ref36, _ref37) {
      var state = _ref36.state,
        commit = _ref36.commit;
      var telefono = _ref37.telefono,
        usuario = _ref37.usuario;
      return new Promise(function (resolve, reject) {
        axios.put("/api/usuarios/".concat(usuario, "/add/telefono"), telefono).then(function (_ref38) {
          var data = _ref38.data;
          if (data.result) {
            if (state.usuario.id === usuario) {
              commit('actualizarTelefono', data.telefono);
              commit('updatePerfil', state.usuario);
            }
            if (state.user.id) {
              commit('updateTelefono', data.telefono);
            }
          }
          resolve(data);
        })["catch"](function (e) {
          reject(e);
        });
      });
    },
    quitarTelefono: function quitarTelefono(_ref39, telefono) {
      var commit = _ref39.commit;
      return new Promise(function (resolve, reject) {
        axios["delete"]("/api/telefonos/".concat(telefono.id)).then(function (_ref40) {
          var data = _ref40.data;
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    toggleLike: function toggleLike(_ref41, model) {
      var state = _ref41.state,
        commit = _ref41.commit;
      return new Promise(function (resolve, reject) {
        axios.put("/api/usuarios/".concat(state.usuario.id, "/toggle-like"), model).then(function (_ref42) {
          var data = _ref42.data;
          if (data.result) {
            commit('setLikesUser', data.likes);
            commit('updatePerfil', state.usuario);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    searchUser: function searchUser(_ref43, query) {
      var commit = _ref43.commit;
      return new Promise(function (resolve, reject) {
        axios.post("/api/users/search", {
          q: query
        }).then(function (_ref44) {
          var data = _ref44.data;
          return resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    getStatusPromotor: function getStatusPromotor(_ref45) {
      var commit = _ref45.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/dashboard/tablero/promotor/get-status").then(function (_ref46) {
          var data = _ref46.data;
          commit('setStatusPromotor', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    getStatusLider: function getStatusLider(_ref47) {
      var commit = _ref47.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/dashboard/tablero/lider/get-status").then(function (_ref48) {
          var data = _ref48.data;
          commit('setStatusLider', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    getStatusCoordinador: function getStatusCoordinador(_ref49) {
      var commit = _ref49.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/dashboard/tablero/coordinador/get-status").then(function (_ref50) {
          var data = _ref50.data;
          commit('setStatusCoordinador', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    cambiarDivisa: function cambiarDivisa(_ref51, dato) {
      var commit = _ref51.commit;
      return new Promise(function (resolve, reject) {
        axios.put("/api/usuarios/".concat(dato.usuario, "/change-divisa"), dato).then(function (_ref52) {
          var data = _ref52.data;
          commit('update', data.usuario);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    cambiarEstado: function cambiarEstado(_ref53, usuario_id) {
      var commit = _ref53.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/usuarios/".concat(usuario_id, "/cambiar/estado")).then(function (_ref54) {
          var data = _ref54.data;
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetchPromotores: function fetchPromotores(_ref55, filtro) {
      var commit = _ref55.commit;
      return new Promise(function (resolve, reject) {
        axios.post("/api/usuarios/promotores/fetch/data", filtro).then(function (_ref56) {
          var data = _ref56.data;
          commit('setUsuarios', data.promotores);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetchLideres: function fetchLideres(_ref57, filtro) {
      var commit = _ref57.commit;
      return new Promise(function (resolve, reject) {
        axios.post("/api/usuarios/lideres/fetch/data", filtro).then(function (_ref58) {
          var data = _ref58.data;
          commit('setUsuarios', data.lideres);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    asignarLiderPromotor: function asignarLiderPromotor(_ref59, dato) {
      var commit = _ref59.commit;
      return new Promise(function (resolve, reject) {
        axios.post("/api/usuarios/promotor/asignar/lider", dato).then(function (_ref60) {
          var data = _ref60.data;
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    asignarCoordinadorLider: function asignarCoordinadorLider(_ref61, dato) {
      var commit = _ref61.commit;
      return new Promise(function (resolve, reject) {
        axios.post("/api/usuarios/lider/asignar/coordinador", dato).then(function (_ref62) {
          var data = _ref62.data;
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    quitarLider: function quitarLider(_ref63, promotor) {
      var commit = _ref63.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/usuarios/promotor/".concat(promotor, "/quitar/lider")).then(function (_ref64) {
          var data = _ref64.data;
          return resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    quitarCoordinador: function quitarCoordinador(_ref65, lider) {
      var commit = _ref65.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/usuarios/lider/".concat(lider, "/quitar/coordinador")).then(function (_ref66) {
          var data = _ref66.data;
          return resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    guardarPromotor: function guardarPromotor(_ref67, datos) {
      var commit = _ref67.commit;
      return new Promise(function (resolve, reject) {
        axios.post('/api/usuarios/promotor/save', datos).then(function (_ref68) {
          var data = _ref68.data;
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    guardarLider: function guardarLider(_ref69, datos) {
      var commit = _ref69.commit;
      return new Promise(function (resolve, reject) {
        axios.post('/api/usuarios/lider/save', datos).then(function (_ref70) {
          var data = _ref70.data;
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    getPromotores: function getPromotores(_ref71) {
      var commit = _ref71.commit;
      return new Promise(function (resolve, reject) {
        axios.get('/api/usuarios/get/all/promotores').then(function (_ref72) {
          var data = _ref72.data;
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    asociarTarjeta: function asociarTarjeta(_ref73, tarjeta) {
      var state = _ref73.state,
        commit = _ref73.commit;
      return new Promise(function (resolve, reject) {
        axios.put("/api/usuarios/".concat(state.usuario.id, "/asociar/tarjeta"), tarjeta).then(function (_ref74) {
          var data = _ref74.data;
          if (data.result) {
            commit('updatePerfil', data.usuario);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    cancelarTarjeta: function cancelarTarjeta(_ref75, tarjeta_id) {
      var state = _ref75.state,
        commit = _ref75.commit;
      return new Promise(function (resolve, reject) {
        axios["delete"]("/api/usuarios/".concat(state.usuario.id, "/cancelar/tarjeta/").concat(tarjeta_id)).then(function (_ref76) {
          var data = _ref76.data;
          if (data.result) {
            commit('updatePerfil', data.usuario);
          }
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/src/store/modules/venta.js":
/*!*************************************************!*\
  !*** ./resources/js/src/store/modules/venta.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.find-index.js */ "./node_modules/core-js/modules/es.array.find-index.js");
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_4__);





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: function state() {
    return {
      venta: {
        id: null,
        divisa_id: null,
        monto: 0,
        comision: 0,
        tipo_comision: 1,
        tps: 0,
        tps_referente: 0,
        certificado: false,
        model_id: null,
        model_type: null,
        empleado_id: null,
        cliente_id: null,
        divisa: null,
        model: null,
        empleado: null,
        cliente: null,
        personas: 1,
        reservacion_id: null,
        reservacion: null,
        cupon_id: null,
        tps_bonificados: 0
      },
      ventas: []
    };
  },
  getters: {
    draft: function draft(state) {
      return clone(state.venta);
    }
  },
  mutations: {
    clear: function clear(state) {
      state.venta = {
        id: null,
        divisa_id: null,
        monto: 0,
        comision: 0,
        tipo_comision: 1,
        tps: 0,
        tps_referente: 0,
        certificado: false,
        model_id: null,
        model_type: null,
        empleado_id: null,
        cliente_id: null,
        divisa: null,
        model: null,
        empleado: null,
        cliente: null,
        personas: 1,
        reservacion_id: null,
        reservacion: null,
        cupon_id: null,
        tps_bonificados: 0
      };
    },
    setVenta: function setVenta(state, venta) {
      state.venta = venta;
    },
    update: function update(state, venta) {
      var i = state.ventas.findIndex(function (val) {
        return val.id === venta.id;
      });
      if (i != -1) {
        state.ventas[i] = venta;
      }
      if (state.venta.id === venta.id) {
        state.venta = venta;
      }
    },
    push: function push(state, venta) {
      state.ventas.push(venta);
    },
    put: function put(state, venta_id) {
      state.ventas.splice(state.ventas.findIndex(function (val) {
        return val.id === venta_id;
      }), 1);
    },
    capturar: function capturar(state, venta_id) {
      var venta = state.ventas.find(function (val) {
        return val.id === venta_id;
      });
      if (venta != undefined) {
        state.venta = venta;
      }
    },
    setVentas: function setVentas(state, ventas) {
      state.ventas = ventas;
    }
  },
  actions: {
    getVentas: function getVentas(_ref) {
      var commit = _ref.commit;
      return new Promise(function (resolve, reject) {
        axios.get('/api/ventas/get/all').then(function (_ref2) {
          var data = _ref2.data;
          commit('setVentas', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetchData: function fetchData(_ref3, datos) {
      var state = _ref3.state,
        commit = _ref3.commit;
      return new Promise(function (resolve, reject) {
        axios.post("/api/ventas/fetch/data", datos).then(function (_ref4) {
          var data = _ref4.data;
          commit('setVentas', data.ventas);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetch: function fetch(_ref5, venta_id) {
      var state = _ref5.state,
        commit = _ref5.commit;
      return new Promise(function (resolve, reject) {
        axios.get("/api/ventas/".concat(venta_id, "/fetch/data")).then(function (_ref6) {
          var data = _ref6.data;
          commit('setVenta', data);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    guardar: function guardar(_ref7, datos) {
      var commit = _ref7.commit;
      return new Promise(function (resolve, reject) {
        if (datos.id) {
          axios.put("/api/ventas/".concat(datos.id), datos).then(function (_ref8) {
            var data = _ref8.data;
            if (data.result) {
              commit('update', data.venta);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        } else {
          axios.post("/api/ventas", datos).then(function (_ref9) {
            var data = _ref9.data;
            if (data.result) {
              commit('push', data.venta);
            }
            resolve(data);
          })["catch"](function (e) {
            return reject(e);
          });
        }
      });
    },
    eliminar: function eliminar(_ref10, venta_id) {
      var commit = _ref10.commit;
      return new Promise(function (resolve, reject) {
        axios["delete"]("/api/ventas/".concat(venta_id)).then(function (_ref11) {
          var data = _ref11.data;
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    },
    fetchDataConsumo: function fetchDataConsumo(_ref12, datos) {
      var commit = _ref12.commit;
      return new Promise(function (resolve, reject) {
        axios.post("/api/ventas/fetch/data/consumo", datos).then(function (_ref13) {
          var data = _ref13.data;
          commit('setVentas', data.ventas);
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/src/store/modules/vonage.js":
/*!**************************************************!*\
  !*** ./resources/js/src/store/modules/vonage.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: function state() {
    return {
      mensaje: {
        id: null,
        msisdn: null,
        to: null,
        messageId: null,
        text: null,
        type: null,
        keyword: null,
        messageTimestamp: null,
        timestamp: null,
        nonce: null,
        concat: null,
        concatRef: null,
        concatTotal: null,
        concatPart: null,
        data: null,
        udh: null
      },
      mensajes: []
    };
  },
  mutations: {
    setMensajes: function setMensajes(state, data) {
      state.mensajes = data;
    }
  },
  actions: {
    fetchData: function fetchData(_ref, filtro) {
      var commit = _ref.commit;
      return new Promise(function (resolve, reject) {
        axios.post("/api/vonages/sms/fetchData", filtro).then(function (_ref2) {
          var data = _ref2.data;
          commit('setMensajes', data.mensajes);
          resolve(data);
        })["catch"](function (e) {
          reject(e);
        });
      });
    },
    eliminar: function eliminar(_ref3, mensaje_id) {
      var commit = _ref3.commit;
      return new Promise(function (resolve, reject) {
        axios["delete"]("/api/vonages/sms/".concat(mensaje_id, "/eliminar")).then(function (_ref4) {
          var data = _ref4.data;
          resolve(data);
        })["catch"](function (e) {
          return reject(e);
        });
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/src/store/vertical-menu/index.js":
/*!*******************************************************!*\
  !*** ./resources/js/src/store/vertical-menu/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.keys.js */ "./node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _themeConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @themeConfig */ "./resources/js/themeConfig.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  namespaced: true,
  state: {
    isVerticalMenuCollapsed: JSON.parse(localStorage.getItem('vertical_menu_collapse')) ? JSON.parse(localStorage.getItem('vertical_menu_collapse')) : _themeConfig__WEBPACK_IMPORTED_MODULE_1__.$themeConfig.layout.menu.isCollapsed
  },
  getters: {},
  mutations: {
    UPDATE_VERTICAL_MENU_COLLAPSED: function UPDATE_VERTICAL_MENU_COLLAPSED(state, val) {
      localStorage.setItem('vertical_menu_collapse', val);
      state.isVerticalMenuCollapsed = val;
    }
  },
  actions: {}
});

/***/ }),

/***/ "./resources/js/themeConfig.js":
/*!*************************************!*\
  !*** ./resources/js/themeConfig.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $themeBreakpoints: () => (/* binding */ $themeBreakpoints),
/* harmony export */   $themeColors: () => (/* binding */ $themeColors),
/* harmony export */   $themeConfig: () => (/* binding */ $themeConfig)
/* harmony export */ });
/* harmony import */ var _images_logos_logotipo_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @images/logos/logotipo.png */ "./resources/js/src/assets/images/logos/logotipo.png");
/* harmony import */ var _images_logos_logotipo_png__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_images_logos_logotipo_png__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _images_logos_logotipowhite_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @images/logos/logotipowhite.png */ "./resources/js/src/assets/images/logos/logotipowhite.png");
/* harmony import */ var _images_logos_logotipowhite_png__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_images_logos_logotipowhite_png__WEBPACK_IMPORTED_MODULE_1__);
// Theme Colors
// Initially this will be blank. Later on when app is initialized we will assign bootstrap colors to this from CSS variables.
var $themeColors = {};

// App Breakpoints
// Initially this will be blank. Later on when app is initialized we will assign bootstrap breakpoints to this object from CSS variables.
var $themeBreakpoints = {};



// APP CONFIG
var $themeConfig = {
  app: {
    appName: 'TravelPoints',
    // Will update name in navigation menu (Branding)
    // eslint-disable-next-line global-require
    appLogoImage: (_images_logos_logotipo_png__WEBPACK_IMPORTED_MODULE_0___default()),
    // Will update logo in navigation menu (Branding)
    applogoImageWhite: (_images_logos_logotipowhite_png__WEBPACK_IMPORTED_MODULE_1___default())
  },
  layout: {
    isRTL: false,
    skin: 'light',
    // light, dark, bordered, semi-dark
    routerTransition: 'fade',
    // zoom-fade, slide-fade, fade-bottom, fade, zoom-out, none
    type: 'vertical',
    // vertical, horizontal
    contentWidth: 'full',
    // full, boxed

    menu: {
      hidden: false,
      isCollapsed: false
    },
    navbar: {
      // ? For horizontal menu, navbar type will work for navMenu type
      type: 'floating',
      // static , sticky , floating, hidden
      backgroundColor: '' // BS color options [primary, success, etc]
    },

    footer: {
      type: 'static' // static, sticky, hidden
    },

    customizer: true,
    enableScrollToTop: true
  }
};

/***/ }),

/***/ "./resources/js/src/assets/images/logos/logotipo.png":
/*!***********************************************************!*\
  !*** ./resources/js/src/assets/images/logos/logotipo.png ***!
  \***********************************************************/
/***/ ((module) => {

module.exports = "/images/logotipo.png?19a6b52be9328ab8f0a247ab9b54a5eb";

/***/ }),

/***/ "./resources/js/src/assets/images/logos/logotipowhite.png":
/*!****************************************************************!*\
  !*** ./resources/js/src/assets/images/logos/logotipowhite.png ***!
  \****************************************************************/
/***/ ((module) => {

module.exports = "/images/logotipowhite.png?f313f3a61ae4f8efb19ffb8d2f74a669";

/***/ }),

/***/ "./resources/js/src/@core/assets/fonts/feather/fonts/feather.eot?t=1525787366991":
/*!***************************************************************************************!*\
  !*** ./resources/js/src/@core/assets/fonts/feather/fonts/feather.eot?t=1525787366991 ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = "/fonts/feather.eot?ba142c9a3d0f5747c3470e1126aa9e88";

/***/ }),

/***/ "./resources/js/src/@core/assets/fonts/feather/fonts/feather.svg?t=1525787366991":
/*!***************************************************************************************!*\
  !*** ./resources/js/src/@core/assets/fonts/feather/fonts/feather.svg?t=1525787366991 ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = "/fonts/feather.svg?d61247494beb65a26225ff580cf20eb9";

/***/ }),

/***/ "./resources/js/src/@core/assets/fonts/feather/fonts/feather.ttf?t=1525787366991":
/*!***************************************************************************************!*\
  !*** ./resources/js/src/@core/assets/fonts/feather/fonts/feather.ttf?t=1525787366991 ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = "/fonts/feather.ttf?aaacbaee6c14b4207d39846c6d971e1f";

/***/ }),

/***/ "./resources/js/src/@core/assets/fonts/feather/fonts/feather.woff?t=1525787366991":
/*!****************************************************************************************!*\
  !*** ./resources/js/src/@core/assets/fonts/feather/fonts/feather.woff?t=1525787366991 ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = "/fonts/feather.woff?3fa166a56aa3839c5d12598e38b2d877";

/***/ }),

/***/ "./resources/js/src/assets/fonts/MyriadPro-BoldCond_0.otf":
/*!****************************************************************!*\
  !*** ./resources/js/src/assets/fonts/MyriadPro-BoldCond_0.otf ***!
  \****************************************************************/
/***/ ((module) => {

module.exports = "/fonts/MyriadPro-BoldCond_0.otf?d9181b7740da1abbafe5f9bf72ee8e73";

/***/ }),

/***/ "./resources/js/src/assets/fonts/MyriadPro-Cond_0.otf":
/*!************************************************************!*\
  !*** ./resources/js/src/assets/fonts/MyriadPro-Cond_0.otf ***!
  \************************************************************/
/***/ ((module) => {

module.exports = "/fonts/MyriadPro-Cond_0.otf?548315249b6c3210c7242d95dafa0e1d";

/***/ }),

/***/ "./resources/js/src/assets/fonts/MyriadPro-Light.otf":
/*!***********************************************************!*\
  !*** ./resources/js/src/assets/fonts/MyriadPro-Light.otf ***!
  \***********************************************************/
/***/ ((module) => {

module.exports = "/fonts/MyriadPro-Light.otf?1d169f609b1972709363f43096d0c3ff";

/***/ }),

/***/ "./resources/js/src/assets/fonts/MyriadPro-Regular_0.otf":
/*!***************************************************************!*\
  !*** ./resources/js/src/assets/fonts/MyriadPro-Regular_0.otf ***!
  \***************************************************************/
/***/ ((module) => {

module.exports = "/fonts/MyriadPro-Regular_0.otf?31fe6e69dd2c18a7c6265be636bdc903";

/***/ }),

/***/ "./resources/js/src/assets/fonts/NexaBold.woff":
/*!*****************************************************!*\
  !*** ./resources/js/src/assets/fonts/NexaBold.woff ***!
  \*****************************************************/
/***/ ((module) => {

module.exports = "/fonts/NexaBold.woff?704dd7b1fe09cbd6990ea2909a62fa24";

/***/ }),

/***/ "./resources/js/src/assets/fonts/NexaBookItalic.woff":
/*!***********************************************************!*\
  !*** ./resources/js/src/assets/fonts/NexaBookItalic.woff ***!
  \***********************************************************/
/***/ ((module) => {

module.exports = "/fonts/NexaBookItalic.woff?dd150cf611020adea894ae1688fbdcdd";

/***/ }),

/***/ "./resources/js/src/assets/fonts/NexaThin.woff":
/*!*****************************************************!*\
  !*** ./resources/js/src/assets/fonts/NexaThin.woff ***!
  \*****************************************************/
/***/ ((module) => {

module.exports = "/fonts/NexaThin.woff?30b77e1694629419c56a35b15f2068a7";

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/resolve-url-loader/index.js??clonedRuleSet-22.use[0]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./resources/js/src/@core/scss/core.scss":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/resolve-url-loader/index.js??clonedRuleSet-22.use[0]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./resources/js/src/@core/scss/core.scss ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_fortawesome_fontawesome_free_css_all_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! -!../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../node_modules/@fortawesome/fontawesome-free/css/all.css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/@fortawesome/fontawesome-free/css/all.css");
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
___CSS_LOADER_EXPORT___.i(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_fortawesome_fontawesome_free_css_all_css__WEBPACK_IMPORTED_MODULE_1__["default"]);
// Module
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/resolve-url-loader/index.js??clonedRuleSet-22.use[0]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./resources/js/src/@core/scss/vue/libs/toastification.scss":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/resolve-url-loader/index.js??clonedRuleSet-22.use[0]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./resources/js/src/@core/scss/vue/libs/toastification.scss ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".Vue-Toastification__container {\n  z-index: 9999;\n  position: fixed;\n  width: 400px;\n  box-sizing: border-box;\n  display: flex;\n  min-height: 100%;\n  color: #fff;\n  flex-direction: column;\n  pointer-events: none;\n}[dir] .Vue-Toastification__container {\n  padding: 4px;\n}\n\n@media only screen and (min-width: 600px) {\n  .Vue-Toastification__container.top-left, .Vue-Toastification__container.top-right, .Vue-Toastification__container.top-center {\n    top: 1em;\n  }\n\n  .Vue-Toastification__container.bottom-left, .Vue-Toastification__container.bottom-right, .Vue-Toastification__container.bottom-center {\n    bottom: 1em;\n    flex-direction: column-reverse;\n  }\n\n  [dir=ltr] .Vue-Toastification__container.top-left, [dir=ltr] .Vue-Toastification__container.bottom-left {\n    left: 1em;\n  }\n\n  [dir=rtl] .Vue-Toastification__container.top-left, [dir=rtl] .Vue-Toastification__container.bottom-left {\n    right: 1em;\n  }\n\n  [dir=ltr] .Vue-Toastification__container.top-left .Vue-Toastification__toast, [dir=ltr] .Vue-Toastification__container.bottom-left .Vue-Toastification__toast {\n    margin-right: auto;\n  }\n\n  [dir=rtl] .Vue-Toastification__container.top-left .Vue-Toastification__toast, [dir=rtl] .Vue-Toastification__container.bottom-left .Vue-Toastification__toast {\n    margin-left: auto;\n  }\n\n  @supports not (-moz-appearance: none) {\n    [dir=ltr] .Vue-Toastification__container.top-left .Vue-Toastification__toast--rtl, [dir=ltr] .Vue-Toastification__container.bottom-left .Vue-Toastification__toast--rtl {\n      margin-right: unset;\n      margin-left: auto;\n    }\n    [dir=rtl] .Vue-Toastification__container.top-left .Vue-Toastification__toast--rtl, [dir=rtl] .Vue-Toastification__container.bottom-left .Vue-Toastification__toast--rtl {\n      margin-left: unset;\n      margin-right: auto;\n    }\n  }\n  [dir=ltr] .Vue-Toastification__container.top-right, [dir=ltr] .Vue-Toastification__container.bottom-right {\n    right: 1em;\n  }\n  [dir=rtl] .Vue-Toastification__container.top-right, [dir=rtl] .Vue-Toastification__container.bottom-right {\n    left: 1em;\n  }\n\n  [dir=ltr] .Vue-Toastification__container.top-right .Vue-Toastification__toast, [dir=ltr] .Vue-Toastification__container.bottom-right .Vue-Toastification__toast {\n    margin-left: auto;\n  }\n\n  [dir=rtl] .Vue-Toastification__container.top-right .Vue-Toastification__toast, [dir=rtl] .Vue-Toastification__container.bottom-right .Vue-Toastification__toast {\n    margin-right: auto;\n  }\n\n  @supports not (-moz-appearance: none) {\n    [dir=ltr] .Vue-Toastification__container.top-right .Vue-Toastification__toast--rtl, [dir=ltr] .Vue-Toastification__container.bottom-right .Vue-Toastification__toast--rtl {\n      margin-left: unset;\n      margin-right: auto;\n    }\n    [dir=rtl] .Vue-Toastification__container.top-right .Vue-Toastification__toast--rtl, [dir=rtl] .Vue-Toastification__container.bottom-right .Vue-Toastification__toast--rtl {\n      margin-right: unset;\n      margin-left: auto;\n    }\n  }\n  [dir=ltr] .Vue-Toastification__container.top-center, [dir=ltr] .Vue-Toastification__container.bottom-center {\n    left: 50%;\n    margin-left: -200px;\n  }\n  [dir=rtl] .Vue-Toastification__container.top-center, [dir=rtl] .Vue-Toastification__container.bottom-center {\n    right: 50%;\n    margin-right: -200px;\n  }\n\n  [dir=ltr] .Vue-Toastification__container.top-center .Vue-Toastification__toast, [dir=ltr] .Vue-Toastification__container.bottom-center .Vue-Toastification__toast {\n    margin-left: auto;\n    margin-right: auto;\n  }\n\n  [dir=rtl] .Vue-Toastification__container.top-center .Vue-Toastification__toast, [dir=rtl] .Vue-Toastification__container.bottom-center .Vue-Toastification__toast {\n    margin-right: auto;\n    margin-left: auto;\n  }\n}\n@media only screen and (max-width: 600px) {\n  .Vue-Toastification__container {\n    width: 100vw;\n  }\n  [dir] .Vue-Toastification__container {\n    padding: 0;\n    margin: 0;\n  }\n  [dir=ltr] .Vue-Toastification__container {\n    left: 0;\n  }\n  [dir=rtl] .Vue-Toastification__container {\n    right: 0;\n  }\n\n  .Vue-Toastification__container .Vue-Toastification__toast {\n    width: 100%;\n  }\n\n  .Vue-Toastification__container.top-left, .Vue-Toastification__container.top-right, .Vue-Toastification__container.top-center {\n    top: 0;\n  }\n\n  .Vue-Toastification__container.bottom-left, .Vue-Toastification__container.bottom-right, .Vue-Toastification__container.bottom-center {\n    bottom: 0;\n    flex-direction: column-reverse;\n  }\n}\n.Vue-Toastification__toast {\n  display: inline-flex;\n  position: relative;\n  max-height: unset;\n  min-height: unset;\n  box-sizing: border-box;\n  justify-content: space-between;\n  font-family: inherit;\n  max-width: 400px;\n  min-width: 326px;\n  pointer-events: auto;\n  overflow: hidden;\n}\n[dir] .Vue-Toastification__toast {\n  margin-bottom: 1rem;\n  padding: 22px 24px;\n  border-radius: 8px;\n  box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 2px 15px 0 rgba(0, 0, 0, 0.05);\n  transform: translateZ(0);\n}\n[dir=ltr] .Vue-Toastification__toast {\n  direction: ltr;\n}\n[dir=rtl] .Vue-Toastification__toast {\n  direction: rtl;\n}\n\n[dir=ltr] .Vue-Toastification__toast--rtl {\n  direction: rtl;\n}\n\n[dir=rtl] .Vue-Toastification__toast--rtl {\n  direction: ltr;\n}\n\n.Vue-Toastification__toast--default {\n  color: #0097CE;\n}\n\n[dir] .Vue-Toastification__toast--default {\n  background-color: #fff;\n}\n\n.Vue-Toastification__toast--info {\n  color: #00cfe8;\n}\n\n[dir] .Vue-Toastification__toast--info {\n  background-color: #fff;\n}\n\n.Vue-Toastification__toast--success {\n  color: #61A60E;\n}\n\n[dir] .Vue-Toastification__toast--success {\n  background-color: #fff;\n}\n\n.Vue-Toastification__toast--error {\n  color: #E11383;\n}\n\n[dir] .Vue-Toastification__toast--error {\n  background-color: #fff;\n}\n\n.Vue-Toastification__toast--warning {\n  color: #F4B223;\n}\n\n[dir] .Vue-Toastification__toast--warning {\n  background-color: #fff;\n}\n\n@media only screen and (max-width: 600px) {\n  [dir] .Vue-Toastification__toast {\n    border-radius: 0px;\n    margin-bottom: 0.5rem;\n  }\n}\n.Vue-Toastification__toast-body {\n  flex: 1;\n  line-height: 24px;\n  font-size: 16px;\n  word-break: break-word;\n  white-space: pre-wrap;\n}\n\n.Vue-Toastification__toast-component-body {\n  flex: 1;\n}\n\n.Vue-Toastification__toast.disable-transition {\n  transition: none !important;\n}\n\n[dir=ltr] .Vue-Toastification__toast.disable-transition {\n  animation: none !important;\n}\n\n[dir=rtl] .Vue-Toastification__toast.disable-transition {\n  animation: none !important;\n}\n\n.Vue-Toastification__close-button {\n  font-weight: bold;\n  font-size: 24px;\n  line-height: 24px;\n  outline: none;\n  transition: 0.3s ease;\n  align-items: center;\n  color: #fff;\n  opacity: 0.3;\n  transition: visibility 0s, opacity 0.2s linear;\n}\n\n[dir] .Vue-Toastification__close-button {\n  background: transparent;\n  border: none;\n  padding: 0;\n  cursor: pointer;\n}\n\n[dir=ltr] .Vue-Toastification__close-button {\n  padding-left: 10px;\n}\n\n[dir=rtl] .Vue-Toastification__close-button {\n  padding-right: 10px;\n}\n\n.Vue-Toastification__close-button:hover, .Vue-Toastification__close-button:focus {\n  opacity: 1;\n}\n\n.Vue-Toastification__toast:not(:hover) .Vue-Toastification__close-button.show-on-hover {\n  opacity: 0;\n}\n\n[dir=ltr] .Vue-Toastification__toast--rtl .Vue-Toastification__close-button {\n  padding-left: unset;\n  padding-right: 10px;\n}\n\n[dir=rtl] .Vue-Toastification__toast--rtl .Vue-Toastification__close-button {\n  padding-right: unset;\n  padding-left: 10px;\n}\n\n@keyframes scale-x-frames {\n  0% {\n    transform: scaleX(1);\n  }\n  100% {\n    transform: scaleX(0);\n  }\n}\n.Vue-Toastification__progress-bar {\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n  height: 5px;\n  z-index: 10000;\n}\n[dir] .Vue-Toastification__progress-bar {\n  background-color: rgba(255, 255, 255, 0.7);\n}\n[dir=ltr] .Vue-Toastification__progress-bar {\n  left: 0;\n  transform-origin: left;\n  animation: scale-x-frames linear 1 forwards;\n}\n[dir=rtl] .Vue-Toastification__progress-bar {\n  right: 0;\n  transform-origin: right;\n  animation: scale-x-frames linear 1 forwards;\n}\n\n[dir=ltr] .Vue-Toastification__toast--rtl .Vue-Toastification__progress-bar {\n  right: 0;\n  left: unset;\n  transform-origin: right;\n}\n\n[dir=rtl] .Vue-Toastification__toast--rtl .Vue-Toastification__progress-bar {\n  left: 0;\n  right: unset;\n  transform-origin: left;\n}\n\n.Vue-Toastification__icon {\n  outline: none;\n  transition: 0.3s ease;\n  align-items: center;\n  width: 20px;\n  height: 100%;\n}\n\n[dir] .Vue-Toastification__icon {\n  background: transparent;\n  border: none;\n  padding: 0;\n}\n\n[dir=ltr] .Vue-Toastification__icon {\n  margin: auto 18px auto 0px;\n}\n\n[dir=rtl] .Vue-Toastification__icon {\n  margin: auto 0px auto 18px;\n}\n\n[dir=ltr] .Vue-Toastification__toast--rtl .Vue-Toastification__icon {\n  margin: auto 0px auto 18px;\n}\n\n[dir=rtl] .Vue-Toastification__toast--rtl .Vue-Toastification__icon {\n  margin: auto 18px auto 0px;\n}\n\n/* ----------------------------------------------\n * Modified version from Animista\n * Animista is Licensed under FreeBSD License.\n * See http://animista.net/license for more info. \n * w: http://animista.net, t: @cssanimista\n * ---------------------------------------------- */\n@keyframes fadeOutTop {\n  0% {\n    transform: translateY(0);\n    opacity: 1;\n  }\n  100% {\n    transform: translateY(-50px);\n    opacity: 0;\n  }\n}\n@keyframes fadeOutLeft-ltr {\n  0% {\n    transform: translateX(0);\n    opacity: 1;\n  }\n  100% {\n    transform: translateX(-50px);\n    opacity: 0;\n  }\n}\n@keyframes fadeOutLeft-rtl {\n  0% {\n    transform: translateX(0);\n    opacity: 1;\n  }\n  100% {\n    transform: translateX(50px);\n    opacity: 0;\n  }\n}\n@keyframes fadeOutBottom {\n  0% {\n    transform: translateY(0);\n    opacity: 1;\n  }\n  100% {\n    transform: translateY(50px);\n    opacity: 0;\n  }\n}\n@keyframes fadeOutRight-ltr {\n  0% {\n    transform: translateX(0);\n    opacity: 1;\n  }\n  100% {\n    transform: translateX(50px);\n    opacity: 0;\n  }\n}\n@keyframes fadeOutRight-rtl {\n  0% {\n    transform: translateX(0);\n    opacity: 1;\n  }\n  100% {\n    transform: translateX(-50px);\n    opacity: 0;\n  }\n}\n@keyframes fadeInLeft-ltr {\n  0% {\n    transform: translateX(-50px);\n    opacity: 0;\n  }\n  100% {\n    transform: translateX(0);\n    opacity: 1;\n  }\n}\n@keyframes fadeInLeft-rtl {\n  0% {\n    transform: translateX(50px);\n    opacity: 0;\n  }\n  100% {\n    transform: translateX(0);\n    opacity: 1;\n  }\n}\n@keyframes fadeInRight-ltr {\n  0% {\n    transform: translateX(50px);\n    opacity: 0;\n  }\n  100% {\n    transform: translateX(0);\n    opacity: 1;\n  }\n}\n@keyframes fadeInRight-rtl {\n  0% {\n    transform: translateX(-50px);\n    opacity: 0;\n  }\n  100% {\n    transform: translateX(0);\n    opacity: 1;\n  }\n}\n@keyframes fadeInTop {\n  0% {\n    transform: translateY(-50px);\n    opacity: 0;\n  }\n  100% {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n@keyframes fadeInBottom {\n  0% {\n    transform: translateY(50px);\n    opacity: 0;\n  }\n  100% {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n[dir=ltr] .Vue-Toastification__fade-enter-active.top-left, [dir=ltr] .Vue-Toastification__fade-enter-active.bottom-left {\n  animation-name:  fadeInLeft-ltr ;\n}\n[dir=rtl] .Vue-Toastification__fade-enter-active.top-left, [dir=rtl] .Vue-Toastification__fade-enter-active.bottom-left {\n  animation-name:  fadeInLeft-rtl ;\n}\n\n[dir=ltr] .Vue-Toastification__fade-enter-active.top-right, [dir=ltr] .Vue-Toastification__fade-enter-active.bottom-right {\n  animation-name:  fadeInRight-ltr ;\n}\n\n[dir=rtl] .Vue-Toastification__fade-enter-active.top-right, [dir=rtl] .Vue-Toastification__fade-enter-active.bottom-right {\n  animation-name:  fadeInRight-rtl ;\n}\n\n[dir=ltr] .Vue-Toastification__fade-enter-active.top-center {\n  animation-name: fadeInTop;\n}\n\n[dir=rtl] .Vue-Toastification__fade-enter-active.top-center {\n  animation-name: fadeInTop;\n}\n\n[dir=ltr] .Vue-Toastification__fade-enter-active.bottom-center {\n  animation-name: fadeInBottom;\n}\n\n[dir=rtl] .Vue-Toastification__fade-enter-active.bottom-center {\n  animation-name: fadeInBottom;\n}\n\n[dir=ltr] .Vue-Toastification__fade-leave-active.top-left, [dir=ltr] .Vue-Toastification__fade-leave-active.bottom-left {\n  animation-name:  fadeOutLeft-ltr ;\n}\n\n[dir=rtl] .Vue-Toastification__fade-leave-active.top-left, [dir=rtl] .Vue-Toastification__fade-leave-active.bottom-left {\n  animation-name:  fadeOutLeft-rtl ;\n}\n\n[dir=ltr] .Vue-Toastification__fade-leave-active.top-right, [dir=ltr] .Vue-Toastification__fade-leave-active.bottom-right {\n  animation-name:  fadeOutRight-ltr ;\n}\n\n[dir=rtl] .Vue-Toastification__fade-leave-active.top-right, [dir=rtl] .Vue-Toastification__fade-leave-active.bottom-right {\n  animation-name:  fadeOutRight-rtl ;\n}\n\n[dir=ltr] .Vue-Toastification__fade-leave-active.top-center {\n  animation-name: fadeOutTop;\n}\n\n[dir=rtl] .Vue-Toastification__fade-leave-active.top-center {\n  animation-name: fadeOutTop;\n}\n\n[dir=ltr] .Vue-Toastification__fade-leave-active.bottom-center {\n  animation-name: fadeOutBottom;\n}\n\n[dir=rtl] .Vue-Toastification__fade-leave-active.bottom-center {\n  animation-name: fadeOutBottom;\n}\n\n[dir] .Vue-Toastification__fade-move {\n  transition-timing-function: ease-in-out;\n  transition-property: all;\n  transition-duration: 400ms;\n}\n\n[dir] .Vue-Toastification__toast {\n  padding: 1rem;\n  box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.1);\n  border-radius: 0.428rem;\n}\n\n@media only screen and (max-width: 600px) {\n  .Vue-Toastification__container .Vue-Toastification__toast {\n    width: 90%;\n  }\n}\n[dir] .dark-layout .Vue-Toastification__toast {\n  background-color: #283046;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/resolve-url-loader/index.js??clonedRuleSet-22.use[0]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./resources/js/src/assets/scss/style.scss":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/resolve-url-loader/index.js??clonedRuleSet-22.use[0]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./resources/js/src/assets/scss/style.scss ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/laravel-mix/node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _fonts_NexaBold_woff__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../fonts/NexaBold.woff */ "./resources/js/src/assets/fonts/NexaBold.woff");
/* harmony import */ var _fonts_NexaBold_woff__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_fonts_NexaBold_woff__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _fonts_NexaBookItalic_woff__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../fonts/NexaBookItalic.woff */ "./resources/js/src/assets/fonts/NexaBookItalic.woff");
/* harmony import */ var _fonts_NexaBookItalic_woff__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_fonts_NexaBookItalic_woff__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _fonts_NexaThin_woff__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../fonts/NexaThin.woff */ "./resources/js/src/assets/fonts/NexaThin.woff");
/* harmony import */ var _fonts_NexaThin_woff__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_fonts_NexaThin_woff__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _fonts_MyriadPro_Cond_0_otf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../fonts/MyriadPro-Cond_0.otf */ "./resources/js/src/assets/fonts/MyriadPro-Cond_0.otf");
/* harmony import */ var _fonts_MyriadPro_Cond_0_otf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_fonts_MyriadPro_Cond_0_otf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _fonts_MyriadPro_BoldCond_0_otf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../fonts/MyriadPro-BoldCond_0.otf */ "./resources/js/src/assets/fonts/MyriadPro-BoldCond_0.otf");
/* harmony import */ var _fonts_MyriadPro_BoldCond_0_otf__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_fonts_MyriadPro_BoldCond_0_otf__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _fonts_MyriadPro_Regular_0_otf__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../fonts/MyriadPro-Regular_0.otf */ "./resources/js/src/assets/fonts/MyriadPro-Regular_0.otf");
/* harmony import */ var _fonts_MyriadPro_Regular_0_otf__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_fonts_MyriadPro_Regular_0_otf__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _fonts_MyriadPro_Light_otf__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../fonts/MyriadPro-Light.otf */ "./resources/js/src/assets/fonts/MyriadPro-Light.otf");
/* harmony import */ var _fonts_MyriadPro_Light_otf__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_fonts_MyriadPro_Light_otf__WEBPACK_IMPORTED_MODULE_8__);
// Imports









var ___CSS_LOADER_EXPORT___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1___default()((_fonts_NexaBold_woff__WEBPACK_IMPORTED_MODULE_2___default()));
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1___default()((_fonts_NexaBookItalic_woff__WEBPACK_IMPORTED_MODULE_3___default()));
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1___default()((_fonts_NexaThin_woff__WEBPACK_IMPORTED_MODULE_4___default()));
var ___CSS_LOADER_URL_REPLACEMENT_3___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1___default()((_fonts_MyriadPro_Cond_0_otf__WEBPACK_IMPORTED_MODULE_5___default()));
var ___CSS_LOADER_URL_REPLACEMENT_4___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1___default()((_fonts_MyriadPro_BoldCond_0_otf__WEBPACK_IMPORTED_MODULE_6___default()));
var ___CSS_LOADER_URL_REPLACEMENT_5___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1___default()((_fonts_MyriadPro_Regular_0_otf__WEBPACK_IMPORTED_MODULE_7___default()));
var ___CSS_LOADER_URL_REPLACEMENT_6___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1___default()((_fonts_MyriadPro_Light_otf__WEBPACK_IMPORTED_MODULE_8___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/***************************************************\n\t\tReescritura de stilos de Travel Points \n***************************************************/\n@font-face {\n  font-family: \"Nexa Book\";\n  font-style: normal;\n  font-weight: normal;\n  src: local(\"Nexa Book\"), url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") format(\"woff\");\n}\n@font-face {\n  font-family: \"Nexa Book Italic\";\n  font-style: normal;\n  font-weight: normal;\n  src: local(\"Nexa Book Italic\"), url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") format(\"woff\");\n}\n@font-face {\n  font-family: \"Nexa Thin\";\n  font-style: normal;\n  font-weight: normal;\n  src: local(\"Nexa Thin\"), url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ") format(\"woff\");\n}\n@font-face {\n  font-family: \"Nexa Bold\";\n  font-style: normal;\n  font-weight: normal;\n  src: local(\"Nexa Bold\"), url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") format(\"woff\");\n}\n@font-face {\n  font-family: \"Myriad\";\n  font-style: normal;\n  font-weight: normal;\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ");\n}\n@font-face {\n  font-family: \"Myriad Bold\";\n  font-style: normal;\n  font-weight: 600;\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_4___ + ");\n}\n@font-face {\n  font-family: \"Myriad Regular\";\n  font-style: normal;\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_5___ + ");\n}\n@font-face {\n  font-family: \"Myriad Light\";\n  font-style: normal;\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_6___ + ");\n}\nh1, h2, h3, h4, h5, h6 {\n  font-family: \"Myriad Bold\";\n  font-weight: bolder;\n}\n\nbody {\n  font-family: \"Myriad Regular\" !important;\n  font-size: 12pt;\n  line-height: 13.3pt;\n}\n\nstrong {\n  font-weight: \"Nexa Bold\" !important;\n}\n\n.main-menu .navbar-header {\n  height: 100%;\n  width: 260px;\n  height: 4rem;\n  position: relative;\n  transition: 300ms ease all, background 0s;\n}\n\n.el-button--primary {\n  opacity: 0.8;\n}\n\n[dir] .el-button--primary {\n  background-color: #0097CE;\n  border-color: #0097CE;\n}\n\n.el-button--primary:hover {\n  opacity: 1;\n}\n\n[dir] .el-button--primary:hover {\n  background-color: #0097CE;\n  border-color: #0097CE;\n}\n\n.select-checkbox {\n  display: none !important;\n}\n\n.btn-group .router-link-active {\n  color: white;\n}\n\n[dir] .btn-group .router-link-active {\n  background-color: #0097CE;\n}\n\n.el-table .cell {\n  word-break: normal !important;\n}\n\n.dark-layout .el-divider__text {\n  color: white;\n}\n\n[dir] .dark-layout .el-divider__text {\n  background-color: #283046;\n}\n\n[dir] .dark-layout .el-input__inner, [dir] .dark-layout .el-table th.el-table__cell, [dir] .dark-layout .el-table tr {\n  background-color: #283046;\n}\n\n[dir] .dark-layout .el-table__expanded-cell {\n  background-color: #283046;\n}\n\n.dark-layout .el-rate__text {\n  color: white !important;\n}\n\n[dir] .dark-layout .el-tabs--border-card {\n  background: #283046;\n  border: 1px solid #7c859d;\n  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);\n  border-radius: 10px;\n}\n\n[dir] .dark-layout .el-tabs--border-card > .el-tabs__header {\n  background-color: #283046;\n  border-bottom: 1px solid #798193;\n  margin: 0;\n  border-radius: 10px 10px 0px 0px;\n}\n\n.dark-layout .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {\n  color: white;\n}\n\n[dir] .dark-layout .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {\n  background-color: #3b4152;\n  border-bottom: 1px solid #0097CE;\n}\n\n[dir=ltr] .dark-layout .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {\n  margin-left: 0.5rem;\n}\n\n[dir=rtl] .dark-layout .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {\n  margin-right: 0.5rem;\n}\n\n.dark-layout .el-card {\n  color: white !important;\n}\n\n[dir] .dark-layout .el-card {\n  border: 1px solid #EBEEF5;\n  background-color: #283046;\n  border: 1px solid #0097CE;\n}\n\n[dir] .dark-layout .el-card__header {\n  padding: 18px 20px;\n  border-bottom: 1px solid #0097CE;\n}\n\n[dir] .dark-layout .bg-light {\n  background-color: #283046 !important;\n}\n\n* {\n  scrollbar-color: rgba(0, 0, 0, 0.5) rgba(0, 0, 0, 0);\n  scrollbar-width: thin;\n}\n\n*::-webkit-scrollbar {\n  -webkit-appearance: none;\n}\n\n*::-webkit-scrollbar:vertical {\n  width: 10px;\n}\n\n*::-webkit-scrollbar-button:increment,\n*::-webkit-scrollbar-button {\n  display: none;\n}\n\n*::-webkit-scrollbar:horizontal {\n  height: 10px;\n}\n\n[dir] *::-webkit-scrollbar-thumb {\n  background-color: #72717170;\n  border-radius: 20px;\n  border: 2px solid #f1f2f3;\n}\n\n[dir] *::-webkit-scrollbar-track {\n  border-radius: 10px;\n}\n\n.el-dialog__body {\n  color: #606266;\n  font-size: 14px;\n  word-break: normal;\n}\n\n.menu-collapsed .main-menu img {\n  width: 90px !important;\n  position: absolute;\n  -o-object-fit: contain;\n     object-fit: contain;\n}\n\n[dir=ltr] .menu-collapsed .main-menu img {\n  left: 0;\n}\n\n[dir=rtl] .menu-collapsed .main-menu img {\n  right: 0;\n}\n\n.menu-collapsed .main-menu.expanded img {\n  width: 180px !important;\n  position: relative;\n  -o-object-fit: cover;\n     object-fit: cover;\n}\n\n[dir=ltr] .menu-collapsed .main-menu.expanded img {\n  left: 0;\n}\n\n[dir=rtl] .menu-collapsed .main-menu.expanded img {\n  right: 0;\n}\n\n[dir=ltr] .horizontal-menu .header-navbar.navbar-brand-center .navbar-header {\n  left: calc(0%) !important;\n}\n\n[dir=rtl] .horizontal-menu .header-navbar.navbar-brand-center .navbar-header {\n  right: calc(0%) !important;\n}\n\nbody {\n  overflow-wrap: normal !important;\n}\n\n.el-table {\n  overflow-wrap: normal !important;\n}\n\n.el-dialog {\n  width: 90% !important;\n}\n\n@media (min-width: 862px) {\n  .el-dialog {\n    width: 70% !important;\n  }\n}\n@media (min-width: 1182px) {\n  .el-dialog {\n    width: 50% !important;\n  }\n}\n[dir] .main-menu .navbar-header .navbar-brand {\n  margin-top: 0rem !important;\n}\n\n.nav-pills .nav-link {\n  font-size: 1.3rem;\n  line-height: 1rem;\n  color: #5e5873;\n}\n\n.layout-travel {\n  transition: 0.5s ease;\n}\n\n[dir] .layout-travel {\n  background-image: url(\"/images/patron_fondo_blanco.svg\");\n  background-attachment: fixed;\n  background-repeat: repeat;\n  background-position: top;\n}\n\n[dir=ltr] .layout-travel {\n  animation: rotar 60s ease infinite;\n}\n\n[dir=rtl] .layout-travel {\n  animation: rotar 60s ease infinite;\n}\n\n.dark-layout .layout-travel {\n  transition: 3s ease;\n}\n\n[dir] .dark-layout .layout-travel {\n  background-image: url(\"/images/patron_fondo_gris.svg\") !important;\n  background-attachment: fixed;\n  background-repeat: repeat;\n  background-position: top;\n}\n\n[dir=ltr] .dark-layout .layout-travel {\n  animation: rotar 60s ease infinite;\n}\n\n[dir=rtl] .dark-layout .layout-travel {\n  animation: rotar 60s ease infinite;\n}\n\n@keyframes rotar {\n  0% {\n    background-size: 120%;\n  }\n  50% {\n    background-size: 150%;\n  }\n  75% {\n    background-size: 120%;\n  }\n  100% {\n    background-size: 100%;\n  }\n}\n[dir] *::-webkit-scrollbar-thumb {\n  background-color: #0097CE;\n  border-radius: 2px;\n  border: 3px solid #f1f2f3;\n}\n\n.dropdown-menu {\n  max-height: 450px;\n  overflow-y: scroll;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/resolve-url-loader/index.js??clonedRuleSet-22.use[0]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/@core/components/feather-icon/FeatherIcon.vue?vue&type=style&index=0&id=5d53bac0&lang=scss&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/resolve-url-loader/index.js??clonedRuleSet-22.use[0]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/@core/components/feather-icon/FeatherIcon.vue?vue&type=style&index=0&id=5d53bac0&lang=scss& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "svg.feather {\n  outline: none;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/resolve-url-loader/index.js??clonedRuleSet-22.use[0]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/@core/components/scroll-to-top/ScrollToTop.vue?vue&type=style&index=0&id=480ba03e&lang=scss&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/resolve-url-loader/index.js??clonedRuleSet-22.use[0]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/@core/components/scroll-to-top/ScrollToTop.vue?vue&type=style&index=0&id=480ba03e&lang=scss&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".btn-scroll-to-top[data-v-480ba03e] {\n  position: fixed;\n  bottom: 5%;\n  z-index: 99;\n  opacity: 0;\n  transition: all 0.5s ease;\n}[dir=ltr] .btn-scroll-to-top[data-v-480ba03e] {\n  right: 30px;\n}[dir=rtl] .btn-scroll-to-top[data-v-480ba03e] {\n  left: 30px;\n}\n.btn-scroll-to-top.show[data-v-480ba03e] {\n  opacity: 1;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/resolve-url-loader/index.js??clonedRuleSet-22.use[0]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/@core/components/toastification/ToastificationContent.vue?vue&type=style&index=0&id=7834b2fa&lang=scss&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/resolve-url-loader/index.js??clonedRuleSet-22.use[0]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/@core/components/toastification/ToastificationContent.vue?vue&type=style&index=0&id=7834b2fa&lang=scss&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".toastification-close-icon[data-v-7834b2fa],\n.toastification-title[data-v-7834b2fa] {\n  line-height: 26px;\n}\n.toastification-title[data-v-7834b2fa] {\n  color: inherit;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./resources/js/src/@core/assets/fonts/feather/iconfont.css":
/*!****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./resources/js/src/@core/assets/fonts/feather/iconfont.css ***!
  \****************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/laravel-mix/node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _fonts_feather_eot_t_1525787366991__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fonts/feather.eot?t=1525787366991 */ "./resources/js/src/@core/assets/fonts/feather/fonts/feather.eot?t=1525787366991");
/* harmony import */ var _fonts_feather_eot_t_1525787366991__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_fonts_feather_eot_t_1525787366991__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _fonts_feather_woff_t_1525787366991__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fonts/feather.woff?t=1525787366991 */ "./resources/js/src/@core/assets/fonts/feather/fonts/feather.woff?t=1525787366991");
/* harmony import */ var _fonts_feather_woff_t_1525787366991__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_fonts_feather_woff_t_1525787366991__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _fonts_feather_ttf_t_1525787366991__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./fonts/feather.ttf?t=1525787366991 */ "./resources/js/src/@core/assets/fonts/feather/fonts/feather.ttf?t=1525787366991");
/* harmony import */ var _fonts_feather_ttf_t_1525787366991__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_fonts_feather_ttf_t_1525787366991__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _fonts_feather_svg_t_1525787366991__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./fonts/feather.svg?t=1525787366991 */ "./resources/js/src/@core/assets/fonts/feather/fonts/feather.svg?t=1525787366991");
/* harmony import */ var _fonts_feather_svg_t_1525787366991__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_fonts_feather_svg_t_1525787366991__WEBPACK_IMPORTED_MODULE_5__);
// Imports






var ___CSS_LOADER_EXPORT___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1___default()((_fonts_feather_eot_t_1525787366991__WEBPACK_IMPORTED_MODULE_2___default()));
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1___default()((_fonts_feather_eot_t_1525787366991__WEBPACK_IMPORTED_MODULE_2___default()), { hash: "#iefix" });
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1___default()((_fonts_feather_woff_t_1525787366991__WEBPACK_IMPORTED_MODULE_3___default()));
var ___CSS_LOADER_URL_REPLACEMENT_3___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1___default()((_fonts_feather_ttf_t_1525787366991__WEBPACK_IMPORTED_MODULE_4___default()));
var ___CSS_LOADER_URL_REPLACEMENT_4___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1___default()((_fonts_feather_svg_t_1525787366991__WEBPACK_IMPORTED_MODULE_5___default()), { hash: "#feather" });
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@font-face {\r\n  font-family: 'feather';\r\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + "); /* IE9*/\r\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") format('embedded-opentype'),\r\n    /* IE6-IE8 */ url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ") format('woff'),\r\n    /* chrome, firefox */ url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ") format('truetype'),\r\n    /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/ url(" + ___CSS_LOADER_URL_REPLACEMENT_4___ + ")\r\n      format('svg'); /* iOS 4.1- */\r\n}\r\n\r\n.feather {\r\n  /* use !important to prevent issues with browser extensions that change fonts */\r\n  font-family: 'feather' !important;\r\n  speak: none;\r\n  font-style: normal;\r\n  font-weight: normal;\r\n  font-variant: normal;\r\n  text-transform: none;\r\n  line-height: 1;\r\n\r\n  /* Better Font Rendering =========== */\r\n  -webkit-font-smoothing: antialiased;\r\n  -moz-osx-font-smoothing: grayscale;\r\n}\r\n\r\n.icon-alert-octagon:before {\r\n  content: '\\e81b';\r\n}\r\n\r\n.icon-alert-circle:before {\r\n  content: '\\e81c';\r\n}\r\n\r\n.icon-activity:before {\r\n  content: '\\e81d';\r\n}\r\n\r\n.icon-alert-triangle:before {\r\n  content: '\\e81e';\r\n}\r\n\r\n.icon-align-center:before {\r\n  content: '\\e81f';\r\n}\r\n\r\n.icon-airplay:before {\r\n  content: '\\e820';\r\n}\r\n\r\n.icon-align-justify:before {\r\n  content: '\\e821';\r\n}\r\n\r\n.icon-align-left:before {\r\n  content: '\\e822';\r\n}\r\n\r\n.icon-align-right:before {\r\n  content: '\\e823';\r\n}\r\n\r\n.icon-arrow-down-left:before {\r\n  content: '\\e824';\r\n}\r\n\r\n.icon-arrow-down-right:before {\r\n  content: '\\e825';\r\n}\r\n\r\n.icon-anchor:before {\r\n  content: '\\e826';\r\n}\r\n\r\n.icon-aperture:before {\r\n  content: '\\e827';\r\n}\r\n\r\n.icon-arrow-left:before {\r\n  content: '\\e828';\r\n}\r\n\r\n.icon-arrow-right:before {\r\n  content: '\\e829';\r\n}\r\n\r\n.icon-arrow-down:before {\r\n  content: '\\e82a';\r\n}\r\n\r\n.icon-arrow-up-left:before {\r\n  content: '\\e82b';\r\n}\r\n\r\n.icon-arrow-up-right:before {\r\n  content: '\\e82c';\r\n}\r\n\r\n.icon-arrow-up:before {\r\n  content: '\\e82d';\r\n}\r\n\r\n.icon-award:before {\r\n  content: '\\e82e';\r\n}\r\n\r\n.icon-bar-chart:before {\r\n  content: '\\e82f';\r\n}\r\n\r\n.icon-at-sign:before {\r\n  content: '\\e830';\r\n}\r\n\r\n.icon-bar-chart-2:before {\r\n  content: '\\e831';\r\n}\r\n\r\n.icon-battery-charging:before {\r\n  content: '\\e832';\r\n}\r\n\r\n.icon-bell-off:before {\r\n  content: '\\e833';\r\n}\r\n\r\n.icon-battery:before {\r\n  content: '\\e834';\r\n}\r\n\r\n.icon-bluetooth:before {\r\n  content: '\\e835';\r\n}\r\n\r\n.icon-bell:before {\r\n  content: '\\e836';\r\n}\r\n\r\n.icon-book:before {\r\n  content: '\\e837';\r\n}\r\n\r\n.icon-briefcase:before {\r\n  content: '\\e838';\r\n}\r\n\r\n.icon-camera-off:before {\r\n  content: '\\e839';\r\n}\r\n\r\n.icon-calendar:before {\r\n  content: '\\e83a';\r\n}\r\n\r\n.icon-bookmark:before {\r\n  content: '\\e83b';\r\n}\r\n\r\n.icon-box:before {\r\n  content: '\\e83c';\r\n}\r\n\r\n.icon-camera:before {\r\n  content: '\\e83d';\r\n}\r\n\r\n.icon-check-circle:before {\r\n  content: '\\e83e';\r\n}\r\n\r\n.icon-check:before {\r\n  content: '\\e83f';\r\n}\r\n\r\n.icon-check-square:before {\r\n  content: '\\e840';\r\n}\r\n\r\n.icon-cast:before {\r\n  content: '\\e841';\r\n}\r\n\r\n.icon-chevron-down:before {\r\n  content: '\\e842';\r\n}\r\n\r\n.icon-chevron-left:before {\r\n  content: '\\e843';\r\n}\r\n\r\n.icon-chevron-right:before {\r\n  content: '\\e844';\r\n}\r\n\r\n.icon-chevron-up:before {\r\n  content: '\\e845';\r\n}\r\n\r\n.icon-chevrons-down:before {\r\n  content: '\\e846';\r\n}\r\n\r\n.icon-chevrons-right:before {\r\n  content: '\\e847';\r\n}\r\n\r\n.icon-chevrons-up:before {\r\n  content: '\\e848';\r\n}\r\n\r\n.icon-chevrons-left:before {\r\n  content: '\\e849';\r\n}\r\n\r\n.icon-circle:before {\r\n  content: '\\e84a';\r\n}\r\n\r\n.icon-clipboard:before {\r\n  content: '\\e84b';\r\n}\r\n\r\n.icon-chrome:before {\r\n  content: '\\e84c';\r\n}\r\n\r\n.icon-clock:before {\r\n  content: '\\e84d';\r\n}\r\n\r\n.icon-cloud-lightning:before {\r\n  content: '\\e84e';\r\n}\r\n\r\n.icon-cloud-drizzle:before {\r\n  content: '\\e84f';\r\n}\r\n\r\n.icon-cloud-rain:before {\r\n  content: '\\e850';\r\n}\r\n\r\n.icon-cloud-off:before {\r\n  content: '\\e851';\r\n}\r\n\r\n.icon-codepen:before {\r\n  content: '\\e852';\r\n}\r\n\r\n.icon-cloud-snow:before {\r\n  content: '\\e853';\r\n}\r\n\r\n.icon-compass:before {\r\n  content: '\\e854';\r\n}\r\n\r\n.icon-copy:before {\r\n  content: '\\e855';\r\n}\r\n\r\n.icon-corner-down-right:before {\r\n  content: '\\e856';\r\n}\r\n\r\n.icon-corner-down-left:before {\r\n  content: '\\e857';\r\n}\r\n\r\n.icon-corner-left-down:before {\r\n  content: '\\e858';\r\n}\r\n\r\n.icon-corner-left-up:before {\r\n  content: '\\e859';\r\n}\r\n\r\n.icon-corner-up-left:before {\r\n  content: '\\e85a';\r\n}\r\n\r\n.icon-corner-up-right:before {\r\n  content: '\\e85b';\r\n}\r\n\r\n.icon-corner-right-down:before {\r\n  content: '\\e85c';\r\n}\r\n\r\n.icon-corner-right-up:before {\r\n  content: '\\e85d';\r\n}\r\n\r\n.icon-cpu:before {\r\n  content: '\\e85e';\r\n}\r\n\r\n.icon-credit-card:before {\r\n  content: '\\e85f';\r\n}\r\n\r\n.icon-crosshair:before {\r\n  content: '\\e860';\r\n}\r\n\r\n.icon-disc:before {\r\n  content: '\\e861';\r\n}\r\n\r\n.icon-delete:before {\r\n  content: '\\e862';\r\n}\r\n\r\n.icon-download-cloud:before {\r\n  content: '\\e863';\r\n}\r\n\r\n.icon-download:before {\r\n  content: '\\e864';\r\n}\r\n\r\n.icon-droplet:before {\r\n  content: '\\e865';\r\n}\r\n\r\n.icon-edit-2:before {\r\n  content: '\\e866';\r\n}\r\n\r\n.icon-edit:before {\r\n  content: '\\e867';\r\n}\r\n\r\n.icon-edit-1:before {\r\n  content: '\\e868';\r\n}\r\n\r\n.icon-external-link:before {\r\n  content: '\\e869';\r\n}\r\n\r\n.icon-eye:before {\r\n  content: '\\e86a';\r\n}\r\n\r\n.icon-feather:before {\r\n  content: '\\e86b';\r\n}\r\n\r\n.icon-facebook:before {\r\n  content: '\\e86c';\r\n}\r\n\r\n.icon-file-minus:before {\r\n  content: '\\e86d';\r\n}\r\n\r\n.icon-eye-off:before {\r\n  content: '\\e86e';\r\n}\r\n\r\n.icon-fast-forward:before {\r\n  content: '\\e86f';\r\n}\r\n\r\n.icon-file-text:before {\r\n  content: '\\e870';\r\n}\r\n\r\n.icon-film:before {\r\n  content: '\\e871';\r\n}\r\n\r\n.icon-file:before {\r\n  content: '\\e872';\r\n}\r\n\r\n.icon-file-plus:before {\r\n  content: '\\e873';\r\n}\r\n\r\n.icon-folder:before {\r\n  content: '\\e874';\r\n}\r\n\r\n.icon-filter:before {\r\n  content: '\\e875';\r\n}\r\n\r\n.icon-flag:before {\r\n  content: '\\e876';\r\n}\r\n\r\n.icon-globe:before {\r\n  content: '\\e877';\r\n}\r\n\r\n.icon-grid:before {\r\n  content: '\\e878';\r\n}\r\n\r\n.icon-heart:before {\r\n  content: '\\e879';\r\n}\r\n\r\n.icon-home:before {\r\n  content: '\\e87a';\r\n}\r\n\r\n.icon-github:before {\r\n  content: '\\e87b';\r\n}\r\n\r\n.icon-image:before {\r\n  content: '\\e87c';\r\n}\r\n\r\n.icon-inbox:before {\r\n  content: '\\e87d';\r\n}\r\n\r\n.icon-layers:before {\r\n  content: '\\e87e';\r\n}\r\n\r\n.icon-info:before {\r\n  content: '\\e87f';\r\n}\r\n\r\n.icon-instagram:before {\r\n  content: '\\e880';\r\n}\r\n\r\n.icon-layout:before {\r\n  content: '\\e881';\r\n}\r\n\r\n.icon-link-2:before {\r\n  content: '\\e882';\r\n}\r\n\r\n.icon-life-buoy:before {\r\n  content: '\\e883';\r\n}\r\n\r\n.icon-link:before {\r\n  content: '\\e884';\r\n}\r\n\r\n.icon-log-in:before {\r\n  content: '\\e885';\r\n}\r\n\r\n.icon-list:before {\r\n  content: '\\e886';\r\n}\r\n\r\n.icon-lock:before {\r\n  content: '\\e887';\r\n}\r\n\r\n.icon-log-out:before {\r\n  content: '\\e888';\r\n}\r\n\r\n.icon-loader:before {\r\n  content: '\\e889';\r\n}\r\n\r\n.icon-mail:before {\r\n  content: '\\e88a';\r\n}\r\n\r\n.icon-maximize-2:before {\r\n  content: '\\e88b';\r\n}\r\n\r\n.icon-map:before {\r\n  content: '\\e88c';\r\n}\r\n\r\n.icon-map-pin:before {\r\n  content: '\\e88e';\r\n}\r\n\r\n.icon-menu:before {\r\n  content: '\\e88f';\r\n}\r\n\r\n.icon-message-circle:before {\r\n  content: '\\e890';\r\n}\r\n\r\n.icon-message-square:before {\r\n  content: '\\e891';\r\n}\r\n\r\n.icon-minimize-2:before {\r\n  content: '\\e892';\r\n}\r\n\r\n.icon-mic-off:before {\r\n  content: '\\e893';\r\n}\r\n\r\n.icon-minus-circle:before {\r\n  content: '\\e894';\r\n}\r\n\r\n.icon-mic:before {\r\n  content: '\\e895';\r\n}\r\n\r\n.icon-minus-square:before {\r\n  content: '\\e896';\r\n}\r\n\r\n.icon-minus:before {\r\n  content: '\\e897';\r\n}\r\n\r\n.icon-moon:before {\r\n  content: '\\e898';\r\n}\r\n\r\n.icon-monitor:before {\r\n  content: '\\e899';\r\n}\r\n\r\n.icon-more-vertical:before {\r\n  content: '\\e89a';\r\n}\r\n\r\n.icon-more-horizontal:before {\r\n  content: '\\e89b';\r\n}\r\n\r\n.icon-move:before {\r\n  content: '\\e89c';\r\n}\r\n\r\n.icon-music:before {\r\n  content: '\\e89d';\r\n}\r\n\r\n.icon-navigation-2:before {\r\n  content: '\\e89e';\r\n}\r\n\r\n.icon-navigation:before {\r\n  content: '\\e89f';\r\n}\r\n\r\n.icon-octagon:before {\r\n  content: '\\e8a0';\r\n}\r\n\r\n.icon-package:before {\r\n  content: '\\e8a1';\r\n}\r\n\r\n.icon-pause-circle:before {\r\n  content: '\\e8a2';\r\n}\r\n\r\n.icon-pause:before {\r\n  content: '\\e8a3';\r\n}\r\n\r\n.icon-percent:before {\r\n  content: '\\e8a4';\r\n}\r\n\r\n.icon-phone-call:before {\r\n  content: '\\e8a5';\r\n}\r\n\r\n.icon-phone-forwarded:before {\r\n  content: '\\e8a6';\r\n}\r\n\r\n.icon-phone-missed:before {\r\n  content: '\\e8a7';\r\n}\r\n\r\n.icon-phone-off:before {\r\n  content: '\\e8a8';\r\n}\r\n\r\n.icon-phone-incoming:before {\r\n  content: '\\e8a9';\r\n}\r\n\r\n.icon-phone:before {\r\n  content: '\\e8aa';\r\n}\r\n\r\n.icon-phone-outgoing:before {\r\n  content: '\\e8ab';\r\n}\r\n\r\n.icon-pie-chart:before {\r\n  content: '\\e8ac';\r\n}\r\n\r\n.icon-play-circle:before {\r\n  content: '\\e8ad';\r\n}\r\n\r\n.icon-play:before {\r\n  content: '\\e8ae';\r\n}\r\n\r\n.icon-plus-square:before {\r\n  content: '\\e8af';\r\n}\r\n\r\n.icon-plus-circle:before {\r\n  content: '\\e8b0';\r\n}\r\n\r\n.icon-plus:before {\r\n  content: '\\e8b1';\r\n}\r\n\r\n.icon-pocket:before {\r\n  content: '\\e8b2';\r\n}\r\n\r\n.icon-printer:before {\r\n  content: '\\e8b3';\r\n}\r\n\r\n.icon-power:before {\r\n  content: '\\e8b4';\r\n}\r\n\r\n.icon-radio:before {\r\n  content: '\\e8b5';\r\n}\r\n\r\n.icon-repeat:before {\r\n  content: '\\e8b6';\r\n}\r\n\r\n.icon-refresh-ccw:before {\r\n  content: '\\e8b7';\r\n}\r\n\r\n.icon-rewind:before {\r\n  content: '\\e8b8';\r\n}\r\n\r\n.icon-rotate-ccw:before {\r\n  content: '\\e8b9';\r\n}\r\n\r\n.icon-refresh-cw:before {\r\n  content: '\\e8ba';\r\n}\r\n\r\n.icon-rotate-cw:before {\r\n  content: '\\e8bb';\r\n}\r\n\r\n.icon-save:before {\r\n  content: '\\e8bc';\r\n}\r\n\r\n.icon-search:before {\r\n  content: '\\e8bd';\r\n}\r\n\r\n.icon-server:before {\r\n  content: '\\e8be';\r\n}\r\n\r\n.icon-scissors:before {\r\n  content: '\\e8bf';\r\n}\r\n\r\n.icon-share-2:before {\r\n  content: '\\e8c0';\r\n}\r\n\r\n.icon-share:before {\r\n  content: '\\e8c1';\r\n}\r\n\r\n.icon-shield:before {\r\n  content: '\\e8c2';\r\n}\r\n\r\n.icon-settings:before {\r\n  content: '\\e8c3';\r\n}\r\n\r\n.icon-skip-back:before {\r\n  content: '\\e8c4';\r\n}\r\n\r\n.icon-shuffle:before {\r\n  content: '\\e8c5';\r\n}\r\n\r\n.icon-sidebar:before {\r\n  content: '\\e8c6';\r\n}\r\n\r\n.icon-skip-forward:before {\r\n  content: '\\e8c7';\r\n}\r\n\r\n.icon-slack:before {\r\n  content: '\\e8c8';\r\n}\r\n\r\n.icon-slash:before {\r\n  content: '\\e8c9';\r\n}\r\n\r\n.icon-smartphone:before {\r\n  content: '\\e8ca';\r\n}\r\n\r\n.icon-square:before {\r\n  content: '\\e8cb';\r\n}\r\n\r\n.icon-speaker:before {\r\n  content: '\\e8cc';\r\n}\r\n\r\n.icon-star:before {\r\n  content: '\\e8cd';\r\n}\r\n\r\n.icon-stop-circle:before {\r\n  content: '\\e8ce';\r\n}\r\n\r\n.icon-sun:before {\r\n  content: '\\e8cf';\r\n}\r\n\r\n.icon-sunrise:before {\r\n  content: '\\e8d0';\r\n}\r\n\r\n.icon-tablet:before {\r\n  content: '\\e8d1';\r\n}\r\n\r\n.icon-tag:before {\r\n  content: '\\e8d2';\r\n}\r\n\r\n.icon-sunset:before {\r\n  content: '\\e8d3';\r\n}\r\n\r\n.icon-target:before {\r\n  content: '\\e8d4';\r\n}\r\n\r\n.icon-thermometer:before {\r\n  content: '\\e8d5';\r\n}\r\n\r\n.icon-thumbs-up:before {\r\n  content: '\\e8d6';\r\n}\r\n\r\n.icon-thumbs-down:before {\r\n  content: '\\e8d7';\r\n}\r\n\r\n.icon-toggle-left:before {\r\n  content: '\\e8d8';\r\n}\r\n\r\n.icon-toggle-right:before {\r\n  content: '\\e8d9';\r\n}\r\n\r\n.icon-trash-2:before {\r\n  content: '\\e8da';\r\n}\r\n\r\n.icon-trash:before {\r\n  content: '\\e8db';\r\n}\r\n\r\n.icon-trending-up:before {\r\n  content: '\\e8dc';\r\n}\r\n\r\n.icon-trending-down:before {\r\n  content: '\\e8dd';\r\n}\r\n\r\n.icon-triangle:before {\r\n  content: '\\e8de';\r\n}\r\n\r\n.icon-type:before {\r\n  content: '\\e8df';\r\n}\r\n\r\n.icon-twitter:before {\r\n  content: '\\e8e0';\r\n}\r\n\r\n.icon-upload:before {\r\n  content: '\\e8e1';\r\n}\r\n\r\n.icon-umbrella:before {\r\n  content: '\\e8e2';\r\n}\r\n\r\n.icon-upload-cloud:before {\r\n  content: '\\e8e3';\r\n}\r\n\r\n.icon-unlock:before {\r\n  content: '\\e8e4';\r\n}\r\n\r\n.icon-user-check:before {\r\n  content: '\\e8e5';\r\n}\r\n\r\n.icon-user-minus:before {\r\n  content: '\\e8e6';\r\n}\r\n\r\n.icon-user-plus:before {\r\n  content: '\\e8e7';\r\n}\r\n\r\n.icon-user-x:before {\r\n  content: '\\e8e8';\r\n}\r\n\r\n.icon-user:before {\r\n  content: '\\e8e9';\r\n}\r\n\r\n.icon-users:before {\r\n  content: '\\e8ea';\r\n}\r\n\r\n.icon-video-off:before {\r\n  content: '\\e8eb';\r\n}\r\n\r\n.icon-video:before {\r\n  content: '\\e8ec';\r\n}\r\n\r\n.icon-voicemail:before {\r\n  content: '\\e8ed';\r\n}\r\n\r\n.icon-volume-x:before {\r\n  content: '\\e8ee';\r\n}\r\n\r\n.icon-volume-2:before {\r\n  content: '\\e8ef';\r\n}\r\n\r\n.icon-volume-1:before {\r\n  content: '\\e8f0';\r\n}\r\n\r\n.icon-volume:before {\r\n  content: '\\e8f1';\r\n}\r\n\r\n.icon-watch:before {\r\n  content: '\\e8f2';\r\n}\r\n\r\n.icon-wifi:before {\r\n  content: '\\e8f3';\r\n}\r\n\r\n.icon-x-square:before {\r\n  content: '\\e8f4';\r\n}\r\n\r\n.icon-wind:before {\r\n  content: '\\e8f5';\r\n}\r\n\r\n.icon-x:before {\r\n  content: '\\e8f6';\r\n}\r\n\r\n.icon-x-circle:before {\r\n  content: '\\e8f7';\r\n}\r\n\r\n.icon-zap:before {\r\n  content: '\\e8f8';\r\n}\r\n\r\n.icon-zoom-in:before {\r\n  content: '\\e8f9';\r\n}\r\n\r\n.icon-zoom-out:before {\r\n  content: '\\e8fa';\r\n}\r\n\r\n.icon-command:before {\r\n  content: '\\e8fb';\r\n}\r\n\r\n.icon-cloud:before {\r\n  content: '\\e8fc';\r\n}\r\n\r\n.icon-hash:before {\r\n  content: '\\e8fd';\r\n}\r\n\r\n.icon-headphones:before {\r\n  content: '\\e8fe';\r\n}\r\n\r\n.icon-underline:before {\r\n  content: '\\e8ff';\r\n}\r\n\r\n.icon-italic:before {\r\n  content: '\\e900';\r\n}\r\n\r\n.icon-bold:before {\r\n  content: '\\e901';\r\n}\r\n\r\n.icon-crop:before {\r\n  content: '\\e902';\r\n}\r\n\r\n.icon-help-circle:before {\r\n  content: '\\e903';\r\n}\r\n\r\n.icon-paperclip:before {\r\n  content: '\\e904';\r\n}\r\n\r\n.icon-shopping-cart:before {\r\n  content: '\\e905';\r\n}\r\n\r\n.icon-tv:before {\r\n  content: '\\e906';\r\n}\r\n\r\n.icon-wifi-off:before {\r\n  content: '\\e907';\r\n}\r\n\r\n.icon-minimize:before {\r\n  content: '\\e88d';\r\n}\r\n\r\n.icon-maximize:before {\r\n  content: '\\e908';\r\n}\r\n\r\n.icon-gitlab:before {\r\n  content: '\\e909';\r\n}\r\n\r\n.icon-sliders:before {\r\n  content: '\\e90a';\r\n}\r\n\r\n.icon-star-on:before {\r\n  content: '\\e90b';\r\n}\r\n\r\n.icon-heart-on:before {\r\n  content: '\\e90c';\r\n}\r\n\r\n.icon-archive:before {\r\n  content: '\\e90d';\r\n}\r\n\r\n.icon-arrow-down-circle:before {\r\n  content: '\\e90e';\r\n}\r\n\r\n.icon-arrow-up-circle:before {\r\n  content: '\\e90f';\r\n}\r\n\r\n.icon-arrow-left-circle:before {\r\n  content: '\\e910';\r\n}\r\n\r\n.icon-arrow-right-circle:before {\r\n  content: '\\e911';\r\n}\r\n\r\n.icon-bar-chart-line-:before {\r\n  content: '\\e912';\r\n}\r\n\r\n.icon-bar-chart-line:before {\r\n  content: '\\e913';\r\n}\r\n\r\n.icon-book-open:before {\r\n  content: '\\e914';\r\n}\r\n\r\n.icon-code:before {\r\n  content: '\\e915';\r\n}\r\n\r\n.icon-database:before {\r\n  content: '\\e916';\r\n}\r\n\r\n.icon-dollar-sign:before {\r\n  content: '\\e917';\r\n}\r\n\r\n.icon-folder-plus:before {\r\n  content: '\\e918';\r\n}\r\n\r\n.icon-gift:before {\r\n  content: '\\e919';\r\n}\r\n\r\n.icon-folder-minus:before {\r\n  content: '\\e91a';\r\n}\r\n\r\n.icon-git-commit:before {\r\n  content: '\\e91b';\r\n}\r\n\r\n.icon-git-branch:before {\r\n  content: '\\e91c';\r\n}\r\n\r\n.icon-git-pull-request:before {\r\n  content: '\\e91d';\r\n}\r\n\r\n.icon-git-merge:before {\r\n  content: '\\e91e';\r\n}\r\n\r\n.icon-linkedin:before {\r\n  content: '\\e91f';\r\n}\r\n\r\n.icon-hard-drive:before {\r\n  content: '\\e920';\r\n}\r\n\r\n.icon-more-vertical-:before {\r\n  content: '\\e921';\r\n}\r\n\r\n.icon-more-horizontal-:before {\r\n  content: '\\e922';\r\n}\r\n\r\n.icon-rss:before {\r\n  content: '\\e923';\r\n}\r\n\r\n.icon-send:before {\r\n  content: '\\e924';\r\n}\r\n\r\n.icon-shield-off:before {\r\n  content: '\\e925';\r\n}\r\n\r\n.icon-shopping-bag:before {\r\n  content: '\\e926';\r\n}\r\n\r\n.icon-terminal:before {\r\n  content: '\\e927';\r\n}\r\n\r\n.icon-truck:before {\r\n  content: '\\e928';\r\n}\r\n\r\n.icon-zap-off:before {\r\n  content: '\\e929';\r\n}\r\n\r\n.icon-youtube:before {\r\n  content: '\\e92a';\r\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/moment/locale sync recursive ^\\.\\/.*$":
/*!***************************************************!*\
  !*** ./node_modules/moment/locale/ sync ^\.\/.*$ ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./af": "./node_modules/moment/locale/af.js",
	"./af.js": "./node_modules/moment/locale/af.js",
	"./ar": "./node_modules/moment/locale/ar.js",
	"./ar-dz": "./node_modules/moment/locale/ar-dz.js",
	"./ar-dz.js": "./node_modules/moment/locale/ar-dz.js",
	"./ar-kw": "./node_modules/moment/locale/ar-kw.js",
	"./ar-kw.js": "./node_modules/moment/locale/ar-kw.js",
	"./ar-ly": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ly.js": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ma": "./node_modules/moment/locale/ar-ma.js",
	"./ar-ma.js": "./node_modules/moment/locale/ar-ma.js",
	"./ar-sa": "./node_modules/moment/locale/ar-sa.js",
	"./ar-sa.js": "./node_modules/moment/locale/ar-sa.js",
	"./ar-tn": "./node_modules/moment/locale/ar-tn.js",
	"./ar-tn.js": "./node_modules/moment/locale/ar-tn.js",
	"./ar.js": "./node_modules/moment/locale/ar.js",
	"./az": "./node_modules/moment/locale/az.js",
	"./az.js": "./node_modules/moment/locale/az.js",
	"./be": "./node_modules/moment/locale/be.js",
	"./be.js": "./node_modules/moment/locale/be.js",
	"./bg": "./node_modules/moment/locale/bg.js",
	"./bg.js": "./node_modules/moment/locale/bg.js",
	"./bm": "./node_modules/moment/locale/bm.js",
	"./bm.js": "./node_modules/moment/locale/bm.js",
	"./bn": "./node_modules/moment/locale/bn.js",
	"./bn-bd": "./node_modules/moment/locale/bn-bd.js",
	"./bn-bd.js": "./node_modules/moment/locale/bn-bd.js",
	"./bn.js": "./node_modules/moment/locale/bn.js",
	"./bo": "./node_modules/moment/locale/bo.js",
	"./bo.js": "./node_modules/moment/locale/bo.js",
	"./br": "./node_modules/moment/locale/br.js",
	"./br.js": "./node_modules/moment/locale/br.js",
	"./bs": "./node_modules/moment/locale/bs.js",
	"./bs.js": "./node_modules/moment/locale/bs.js",
	"./ca": "./node_modules/moment/locale/ca.js",
	"./ca.js": "./node_modules/moment/locale/ca.js",
	"./cs": "./node_modules/moment/locale/cs.js",
	"./cs.js": "./node_modules/moment/locale/cs.js",
	"./cv": "./node_modules/moment/locale/cv.js",
	"./cv.js": "./node_modules/moment/locale/cv.js",
	"./cy": "./node_modules/moment/locale/cy.js",
	"./cy.js": "./node_modules/moment/locale/cy.js",
	"./da": "./node_modules/moment/locale/da.js",
	"./da.js": "./node_modules/moment/locale/da.js",
	"./de": "./node_modules/moment/locale/de.js",
	"./de-at": "./node_modules/moment/locale/de-at.js",
	"./de-at.js": "./node_modules/moment/locale/de-at.js",
	"./de-ch": "./node_modules/moment/locale/de-ch.js",
	"./de-ch.js": "./node_modules/moment/locale/de-ch.js",
	"./de.js": "./node_modules/moment/locale/de.js",
	"./dv": "./node_modules/moment/locale/dv.js",
	"./dv.js": "./node_modules/moment/locale/dv.js",
	"./el": "./node_modules/moment/locale/el.js",
	"./el.js": "./node_modules/moment/locale/el.js",
	"./en-au": "./node_modules/moment/locale/en-au.js",
	"./en-au.js": "./node_modules/moment/locale/en-au.js",
	"./en-ca": "./node_modules/moment/locale/en-ca.js",
	"./en-ca.js": "./node_modules/moment/locale/en-ca.js",
	"./en-gb": "./node_modules/moment/locale/en-gb.js",
	"./en-gb.js": "./node_modules/moment/locale/en-gb.js",
	"./en-ie": "./node_modules/moment/locale/en-ie.js",
	"./en-ie.js": "./node_modules/moment/locale/en-ie.js",
	"./en-il": "./node_modules/moment/locale/en-il.js",
	"./en-il.js": "./node_modules/moment/locale/en-il.js",
	"./en-in": "./node_modules/moment/locale/en-in.js",
	"./en-in.js": "./node_modules/moment/locale/en-in.js",
	"./en-nz": "./node_modules/moment/locale/en-nz.js",
	"./en-nz.js": "./node_modules/moment/locale/en-nz.js",
	"./en-sg": "./node_modules/moment/locale/en-sg.js",
	"./en-sg.js": "./node_modules/moment/locale/en-sg.js",
	"./eo": "./node_modules/moment/locale/eo.js",
	"./eo.js": "./node_modules/moment/locale/eo.js",
	"./es": "./node_modules/moment/locale/es.js",
	"./es-do": "./node_modules/moment/locale/es-do.js",
	"./es-do.js": "./node_modules/moment/locale/es-do.js",
	"./es-mx": "./node_modules/moment/locale/es-mx.js",
	"./es-mx.js": "./node_modules/moment/locale/es-mx.js",
	"./es-us": "./node_modules/moment/locale/es-us.js",
	"./es-us.js": "./node_modules/moment/locale/es-us.js",
	"./es.js": "./node_modules/moment/locale/es.js",
	"./et": "./node_modules/moment/locale/et.js",
	"./et.js": "./node_modules/moment/locale/et.js",
	"./eu": "./node_modules/moment/locale/eu.js",
	"./eu.js": "./node_modules/moment/locale/eu.js",
	"./fa": "./node_modules/moment/locale/fa.js",
	"./fa.js": "./node_modules/moment/locale/fa.js",
	"./fi": "./node_modules/moment/locale/fi.js",
	"./fi.js": "./node_modules/moment/locale/fi.js",
	"./fil": "./node_modules/moment/locale/fil.js",
	"./fil.js": "./node_modules/moment/locale/fil.js",
	"./fo": "./node_modules/moment/locale/fo.js",
	"./fo.js": "./node_modules/moment/locale/fo.js",
	"./fr": "./node_modules/moment/locale/fr.js",
	"./fr-ca": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ca.js": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ch": "./node_modules/moment/locale/fr-ch.js",
	"./fr-ch.js": "./node_modules/moment/locale/fr-ch.js",
	"./fr.js": "./node_modules/moment/locale/fr.js",
	"./fy": "./node_modules/moment/locale/fy.js",
	"./fy.js": "./node_modules/moment/locale/fy.js",
	"./ga": "./node_modules/moment/locale/ga.js",
	"./ga.js": "./node_modules/moment/locale/ga.js",
	"./gd": "./node_modules/moment/locale/gd.js",
	"./gd.js": "./node_modules/moment/locale/gd.js",
	"./gl": "./node_modules/moment/locale/gl.js",
	"./gl.js": "./node_modules/moment/locale/gl.js",
	"./gom-deva": "./node_modules/moment/locale/gom-deva.js",
	"./gom-deva.js": "./node_modules/moment/locale/gom-deva.js",
	"./gom-latn": "./node_modules/moment/locale/gom-latn.js",
	"./gom-latn.js": "./node_modules/moment/locale/gom-latn.js",
	"./gu": "./node_modules/moment/locale/gu.js",
	"./gu.js": "./node_modules/moment/locale/gu.js",
	"./he": "./node_modules/moment/locale/he.js",
	"./he.js": "./node_modules/moment/locale/he.js",
	"./hi": "./node_modules/moment/locale/hi.js",
	"./hi.js": "./node_modules/moment/locale/hi.js",
	"./hr": "./node_modules/moment/locale/hr.js",
	"./hr.js": "./node_modules/moment/locale/hr.js",
	"./hu": "./node_modules/moment/locale/hu.js",
	"./hu.js": "./node_modules/moment/locale/hu.js",
	"./hy-am": "./node_modules/moment/locale/hy-am.js",
	"./hy-am.js": "./node_modules/moment/locale/hy-am.js",
	"./id": "./node_modules/moment/locale/id.js",
	"./id.js": "./node_modules/moment/locale/id.js",
	"./is": "./node_modules/moment/locale/is.js",
	"./is.js": "./node_modules/moment/locale/is.js",
	"./it": "./node_modules/moment/locale/it.js",
	"./it-ch": "./node_modules/moment/locale/it-ch.js",
	"./it-ch.js": "./node_modules/moment/locale/it-ch.js",
	"./it.js": "./node_modules/moment/locale/it.js",
	"./ja": "./node_modules/moment/locale/ja.js",
	"./ja.js": "./node_modules/moment/locale/ja.js",
	"./jv": "./node_modules/moment/locale/jv.js",
	"./jv.js": "./node_modules/moment/locale/jv.js",
	"./ka": "./node_modules/moment/locale/ka.js",
	"./ka.js": "./node_modules/moment/locale/ka.js",
	"./kk": "./node_modules/moment/locale/kk.js",
	"./kk.js": "./node_modules/moment/locale/kk.js",
	"./km": "./node_modules/moment/locale/km.js",
	"./km.js": "./node_modules/moment/locale/km.js",
	"./kn": "./node_modules/moment/locale/kn.js",
	"./kn.js": "./node_modules/moment/locale/kn.js",
	"./ko": "./node_modules/moment/locale/ko.js",
	"./ko.js": "./node_modules/moment/locale/ko.js",
	"./ku": "./node_modules/moment/locale/ku.js",
	"./ku.js": "./node_modules/moment/locale/ku.js",
	"./ky": "./node_modules/moment/locale/ky.js",
	"./ky.js": "./node_modules/moment/locale/ky.js",
	"./lb": "./node_modules/moment/locale/lb.js",
	"./lb.js": "./node_modules/moment/locale/lb.js",
	"./lo": "./node_modules/moment/locale/lo.js",
	"./lo.js": "./node_modules/moment/locale/lo.js",
	"./lt": "./node_modules/moment/locale/lt.js",
	"./lt.js": "./node_modules/moment/locale/lt.js",
	"./lv": "./node_modules/moment/locale/lv.js",
	"./lv.js": "./node_modules/moment/locale/lv.js",
	"./me": "./node_modules/moment/locale/me.js",
	"./me.js": "./node_modules/moment/locale/me.js",
	"./mi": "./node_modules/moment/locale/mi.js",
	"./mi.js": "./node_modules/moment/locale/mi.js",
	"./mk": "./node_modules/moment/locale/mk.js",
	"./mk.js": "./node_modules/moment/locale/mk.js",
	"./ml": "./node_modules/moment/locale/ml.js",
	"./ml.js": "./node_modules/moment/locale/ml.js",
	"./mn": "./node_modules/moment/locale/mn.js",
	"./mn.js": "./node_modules/moment/locale/mn.js",
	"./mr": "./node_modules/moment/locale/mr.js",
	"./mr.js": "./node_modules/moment/locale/mr.js",
	"./ms": "./node_modules/moment/locale/ms.js",
	"./ms-my": "./node_modules/moment/locale/ms-my.js",
	"./ms-my.js": "./node_modules/moment/locale/ms-my.js",
	"./ms.js": "./node_modules/moment/locale/ms.js",
	"./mt": "./node_modules/moment/locale/mt.js",
	"./mt.js": "./node_modules/moment/locale/mt.js",
	"./my": "./node_modules/moment/locale/my.js",
	"./my.js": "./node_modules/moment/locale/my.js",
	"./nb": "./node_modules/moment/locale/nb.js",
	"./nb.js": "./node_modules/moment/locale/nb.js",
	"./ne": "./node_modules/moment/locale/ne.js",
	"./ne.js": "./node_modules/moment/locale/ne.js",
	"./nl": "./node_modules/moment/locale/nl.js",
	"./nl-be": "./node_modules/moment/locale/nl-be.js",
	"./nl-be.js": "./node_modules/moment/locale/nl-be.js",
	"./nl.js": "./node_modules/moment/locale/nl.js",
	"./nn": "./node_modules/moment/locale/nn.js",
	"./nn.js": "./node_modules/moment/locale/nn.js",
	"./oc-lnc": "./node_modules/moment/locale/oc-lnc.js",
	"./oc-lnc.js": "./node_modules/moment/locale/oc-lnc.js",
	"./pa-in": "./node_modules/moment/locale/pa-in.js",
	"./pa-in.js": "./node_modules/moment/locale/pa-in.js",
	"./pl": "./node_modules/moment/locale/pl.js",
	"./pl.js": "./node_modules/moment/locale/pl.js",
	"./pt": "./node_modules/moment/locale/pt.js",
	"./pt-br": "./node_modules/moment/locale/pt-br.js",
	"./pt-br.js": "./node_modules/moment/locale/pt-br.js",
	"./pt.js": "./node_modules/moment/locale/pt.js",
	"./ro": "./node_modules/moment/locale/ro.js",
	"./ro.js": "./node_modules/moment/locale/ro.js",
	"./ru": "./node_modules/moment/locale/ru.js",
	"./ru.js": "./node_modules/moment/locale/ru.js",
	"./sd": "./node_modules/moment/locale/sd.js",
	"./sd.js": "./node_modules/moment/locale/sd.js",
	"./se": "./node_modules/moment/locale/se.js",
	"./se.js": "./node_modules/moment/locale/se.js",
	"./si": "./node_modules/moment/locale/si.js",
	"./si.js": "./node_modules/moment/locale/si.js",
	"./sk": "./node_modules/moment/locale/sk.js",
	"./sk.js": "./node_modules/moment/locale/sk.js",
	"./sl": "./node_modules/moment/locale/sl.js",
	"./sl.js": "./node_modules/moment/locale/sl.js",
	"./sq": "./node_modules/moment/locale/sq.js",
	"./sq.js": "./node_modules/moment/locale/sq.js",
	"./sr": "./node_modules/moment/locale/sr.js",
	"./sr-cyrl": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr.js": "./node_modules/moment/locale/sr.js",
	"./ss": "./node_modules/moment/locale/ss.js",
	"./ss.js": "./node_modules/moment/locale/ss.js",
	"./sv": "./node_modules/moment/locale/sv.js",
	"./sv.js": "./node_modules/moment/locale/sv.js",
	"./sw": "./node_modules/moment/locale/sw.js",
	"./sw.js": "./node_modules/moment/locale/sw.js",
	"./ta": "./node_modules/moment/locale/ta.js",
	"./ta.js": "./node_modules/moment/locale/ta.js",
	"./te": "./node_modules/moment/locale/te.js",
	"./te.js": "./node_modules/moment/locale/te.js",
	"./tet": "./node_modules/moment/locale/tet.js",
	"./tet.js": "./node_modules/moment/locale/tet.js",
	"./tg": "./node_modules/moment/locale/tg.js",
	"./tg.js": "./node_modules/moment/locale/tg.js",
	"./th": "./node_modules/moment/locale/th.js",
	"./th.js": "./node_modules/moment/locale/th.js",
	"./tk": "./node_modules/moment/locale/tk.js",
	"./tk.js": "./node_modules/moment/locale/tk.js",
	"./tl-ph": "./node_modules/moment/locale/tl-ph.js",
	"./tl-ph.js": "./node_modules/moment/locale/tl-ph.js",
	"./tlh": "./node_modules/moment/locale/tlh.js",
	"./tlh.js": "./node_modules/moment/locale/tlh.js",
	"./tr": "./node_modules/moment/locale/tr.js",
	"./tr.js": "./node_modules/moment/locale/tr.js",
	"./tzl": "./node_modules/moment/locale/tzl.js",
	"./tzl.js": "./node_modules/moment/locale/tzl.js",
	"./tzm": "./node_modules/moment/locale/tzm.js",
	"./tzm-latn": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm-latn.js": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm.js": "./node_modules/moment/locale/tzm.js",
	"./ug-cn": "./node_modules/moment/locale/ug-cn.js",
	"./ug-cn.js": "./node_modules/moment/locale/ug-cn.js",
	"./uk": "./node_modules/moment/locale/uk.js",
	"./uk.js": "./node_modules/moment/locale/uk.js",
	"./ur": "./node_modules/moment/locale/ur.js",
	"./ur.js": "./node_modules/moment/locale/ur.js",
	"./uz": "./node_modules/moment/locale/uz.js",
	"./uz-latn": "./node_modules/moment/locale/uz-latn.js",
	"./uz-latn.js": "./node_modules/moment/locale/uz-latn.js",
	"./uz.js": "./node_modules/moment/locale/uz.js",
	"./vi": "./node_modules/moment/locale/vi.js",
	"./vi.js": "./node_modules/moment/locale/vi.js",
	"./x-pseudo": "./node_modules/moment/locale/x-pseudo.js",
	"./x-pseudo.js": "./node_modules/moment/locale/x-pseudo.js",
	"./yo": "./node_modules/moment/locale/yo.js",
	"./yo.js": "./node_modules/moment/locale/yo.js",
	"./zh-cn": "./node_modules/moment/locale/zh-cn.js",
	"./zh-cn.js": "./node_modules/moment/locale/zh-cn.js",
	"./zh-hk": "./node_modules/moment/locale/zh-hk.js",
	"./zh-hk.js": "./node_modules/moment/locale/zh-hk.js",
	"./zh-mo": "./node_modules/moment/locale/zh-mo.js",
	"./zh-mo.js": "./node_modules/moment/locale/zh-mo.js",
	"./zh-tw": "./node_modules/moment/locale/zh-tw.js",
	"./zh-tw.js": "./node_modules/moment/locale/zh-tw.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/moment/locale sync recursive ^\\.\\/.*$";

/***/ }),

/***/ "./resources/js/src/@core/scss/core.scss":
/*!***********************************************!*\
  !*** ./resources/js/src/@core/scss/core.scss ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_resolve_url_loader_index_js_clonedRuleSet_22_use_0_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_use_1_core_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../node_modules/resolve-url-loader/index.js??clonedRuleSet-22.use[0]!../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./core.scss */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/resolve-url-loader/index.js??clonedRuleSet-22.use[0]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./resources/js/src/@core/scss/core.scss");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_resolve_url_loader_index_js_clonedRuleSet_22_use_0_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_use_1_core_scss__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_resolve_url_loader_index_js_clonedRuleSet_22_use_0_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_use_1_core_scss__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/src/@core/scss/vue/libs/toastification.scss":
/*!******************************************************************!*\
  !*** ./resources/js/src/@core/scss/vue/libs/toastification.scss ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_resolve_url_loader_index_js_clonedRuleSet_22_use_0_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_use_1_toastification_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../../node_modules/resolve-url-loader/index.js??clonedRuleSet-22.use[0]!../../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./toastification.scss */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/resolve-url-loader/index.js??clonedRuleSet-22.use[0]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./resources/js/src/@core/scss/vue/libs/toastification.scss");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_resolve_url_loader_index_js_clonedRuleSet_22_use_0_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_use_1_toastification_scss__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_resolve_url_loader_index_js_clonedRuleSet_22_use_0_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_use_1_toastification_scss__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/src/assets/scss/style.scss":
/*!*************************************************!*\
  !*** ./resources/js/src/assets/scss/style.scss ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_resolve_url_loader_index_js_clonedRuleSet_22_use_0_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_use_1_style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../node_modules/resolve-url-loader/index.js??clonedRuleSet-22.use[0]!../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./style.scss */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/resolve-url-loader/index.js??clonedRuleSet-22.use[0]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./resources/js/src/assets/scss/style.scss");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_resolve_url_loader_index_js_clonedRuleSet_22_use_0_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_use_1_style_scss__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_resolve_url_loader_index_js_clonedRuleSet_22_use_0_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_use_1_style_scss__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/resolve-url-loader/index.js??clonedRuleSet-22.use[0]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/@core/components/feather-icon/FeatherIcon.vue?vue&type=style&index=0&id=5d53bac0&lang=scss&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/resolve-url-loader/index.js??clonedRuleSet-22.use[0]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/@core/components/feather-icon/FeatherIcon.vue?vue&type=style&index=0&id=5d53bac0&lang=scss& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_resolve_url_loader_index_js_clonedRuleSet_22_use_0_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_use_1_node_modules_vue_loader_lib_index_js_vue_loader_options_FeatherIcon_vue_vue_type_style_index_0_id_5d53bac0_lang_scss___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/resolve-url-loader/index.js??clonedRuleSet-22.use[0]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[1]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./FeatherIcon.vue?vue&type=style&index=0&id=5d53bac0&lang=scss& */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/resolve-url-loader/index.js??clonedRuleSet-22.use[0]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/@core/components/feather-icon/FeatherIcon.vue?vue&type=style&index=0&id=5d53bac0&lang=scss&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_resolve_url_loader_index_js_clonedRuleSet_22_use_0_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_use_1_node_modules_vue_loader_lib_index_js_vue_loader_options_FeatherIcon_vue_vue_type_style_index_0_id_5d53bac0_lang_scss___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_resolve_url_loader_index_js_clonedRuleSet_22_use_0_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_use_1_node_modules_vue_loader_lib_index_js_vue_loader_options_FeatherIcon_vue_vue_type_style_index_0_id_5d53bac0_lang_scss___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/resolve-url-loader/index.js??clonedRuleSet-22.use[0]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/@core/components/scroll-to-top/ScrollToTop.vue?vue&type=style&index=0&id=480ba03e&lang=scss&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/resolve-url-loader/index.js??clonedRuleSet-22.use[0]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/@core/components/scroll-to-top/ScrollToTop.vue?vue&type=style&index=0&id=480ba03e&lang=scss&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_resolve_url_loader_index_js_clonedRuleSet_22_use_0_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_use_1_node_modules_vue_loader_lib_index_js_vue_loader_options_ScrollToTop_vue_vue_type_style_index_0_id_480ba03e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/resolve-url-loader/index.js??clonedRuleSet-22.use[0]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[1]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ScrollToTop.vue?vue&type=style&index=0&id=480ba03e&lang=scss&scoped=true& */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/resolve-url-loader/index.js??clonedRuleSet-22.use[0]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/@core/components/scroll-to-top/ScrollToTop.vue?vue&type=style&index=0&id=480ba03e&lang=scss&scoped=true&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_resolve_url_loader_index_js_clonedRuleSet_22_use_0_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_use_1_node_modules_vue_loader_lib_index_js_vue_loader_options_ScrollToTop_vue_vue_type_style_index_0_id_480ba03e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_resolve_url_loader_index_js_clonedRuleSet_22_use_0_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_use_1_node_modules_vue_loader_lib_index_js_vue_loader_options_ScrollToTop_vue_vue_type_style_index_0_id_480ba03e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/resolve-url-loader/index.js??clonedRuleSet-22.use[0]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/@core/components/toastification/ToastificationContent.vue?vue&type=style&index=0&id=7834b2fa&lang=scss&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/resolve-url-loader/index.js??clonedRuleSet-22.use[0]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/@core/components/toastification/ToastificationContent.vue?vue&type=style&index=0&id=7834b2fa&lang=scss&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_resolve_url_loader_index_js_clonedRuleSet_22_use_0_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_use_1_node_modules_vue_loader_lib_index_js_vue_loader_options_ToastificationContent_vue_vue_type_style_index_0_id_7834b2fa_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/resolve-url-loader/index.js??clonedRuleSet-22.use[0]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[1]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ToastificationContent.vue?vue&type=style&index=0&id=7834b2fa&lang=scss&scoped=true& */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/resolve-url-loader/index.js??clonedRuleSet-22.use[0]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/@core/components/toastification/ToastificationContent.vue?vue&type=style&index=0&id=7834b2fa&lang=scss&scoped=true&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_resolve_url_loader_index_js_clonedRuleSet_22_use_0_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_use_1_node_modules_vue_loader_lib_index_js_vue_loader_options_ToastificationContent_vue_vue_type_style_index_0_id_7834b2fa_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_resolve_url_loader_index_js_clonedRuleSet_22_use_0_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_use_1_node_modules_vue_loader_lib_index_js_vue_loader_options_ToastificationContent_vue_vue_type_style_index_0_id_7834b2fa_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/src/@core/assets/fonts/feather/iconfont.css":
/*!******************************************************************!*\
  !*** ./resources/js/src/@core/assets/fonts/feather/iconfont.css ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_iconfont_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./iconfont.css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./resources/js/src/@core/assets/fonts/feather/iconfont.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_iconfont_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_iconfont_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/src/@core/components/feather-icon/FeatherIcon.vue":
/*!************************************************************************!*\
  !*** ./resources/js/src/@core/components/feather-icon/FeatherIcon.vue ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _FeatherIcon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FeatherIcon.vue?vue&type=script&lang=js& */ "./resources/js/src/@core/components/feather-icon/FeatherIcon.vue?vue&type=script&lang=js&");
/* harmony import */ var _FeatherIcon_vue_vue_type_style_index_0_id_5d53bac0_lang_scss___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FeatherIcon.vue?vue&type=style&index=0&id=5d53bac0&lang=scss& */ "./resources/js/src/@core/components/feather-icon/FeatherIcon.vue?vue&type=style&index=0&id=5d53bac0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
var render, staticRenderFns
;

;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _FeatherIcon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/@core/components/feather-icon/FeatherIcon.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/src/@core/components/scroll-to-top/ScrollToTop.vue":
/*!*************************************************************************!*\
  !*** ./resources/js/src/@core/components/scroll-to-top/ScrollToTop.vue ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ScrollToTop_vue_vue_type_template_id_480ba03e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ScrollToTop.vue?vue&type=template&id=480ba03e&scoped=true& */ "./resources/js/src/@core/components/scroll-to-top/ScrollToTop.vue?vue&type=template&id=480ba03e&scoped=true&");
/* harmony import */ var _ScrollToTop_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ScrollToTop.vue?vue&type=script&lang=js& */ "./resources/js/src/@core/components/scroll-to-top/ScrollToTop.vue?vue&type=script&lang=js&");
/* harmony import */ var _ScrollToTop_vue_vue_type_style_index_0_id_480ba03e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ScrollToTop.vue?vue&type=style&index=0&id=480ba03e&lang=scss&scoped=true& */ "./resources/js/src/@core/components/scroll-to-top/ScrollToTop.vue?vue&type=style&index=0&id=480ba03e&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ScrollToTop_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ScrollToTop_vue_vue_type_template_id_480ba03e_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _ScrollToTop_vue_vue_type_template_id_480ba03e_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "480ba03e",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/@core/components/scroll-to-top/ScrollToTop.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/src/@core/components/toastification/ToastificationContent.vue":
/*!************************************************************************************!*\
  !*** ./resources/js/src/@core/components/toastification/ToastificationContent.vue ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ToastificationContent_vue_vue_type_template_id_7834b2fa_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ToastificationContent.vue?vue&type=template&id=7834b2fa&scoped=true& */ "./resources/js/src/@core/components/toastification/ToastificationContent.vue?vue&type=template&id=7834b2fa&scoped=true&");
/* harmony import */ var _ToastificationContent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ToastificationContent.vue?vue&type=script&lang=js& */ "./resources/js/src/@core/components/toastification/ToastificationContent.vue?vue&type=script&lang=js&");
/* harmony import */ var _ToastificationContent_vue_vue_type_style_index_0_id_7834b2fa_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ToastificationContent.vue?vue&type=style&index=0&id=7834b2fa&lang=scss&scoped=true& */ "./resources/js/src/@core/components/toastification/ToastificationContent.vue?vue&type=style&index=0&id=7834b2fa&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ToastificationContent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ToastificationContent_vue_vue_type_template_id_7834b2fa_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _ToastificationContent_vue_vue_type_template_id_7834b2fa_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "7834b2fa",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/@core/components/toastification/ToastificationContent.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/src/App.vue":
/*!**********************************!*\
  !*** ./resources/js/src/App.vue ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _App_vue_vue_type_template_id_7201f370___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=template&id=7201f370& */ "./resources/js/src/App.vue?vue&type=template&id=7201f370&");
/* harmony import */ var _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js& */ "./resources/js/src/App.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _App_vue_vue_type_template_id_7201f370___WEBPACK_IMPORTED_MODULE_0__.render,
  _App_vue_vue_type_template_id_7201f370___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/App.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/src/@core/components/feather-icon/FeatherIcon.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/src/@core/components/feather-icon/FeatherIcon.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FeatherIcon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./FeatherIcon.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/@core/components/feather-icon/FeatherIcon.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FeatherIcon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/@core/components/scroll-to-top/ScrollToTop.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/src/@core/components/scroll-to-top/ScrollToTop.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ScrollToTop_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ScrollToTop.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/@core/components/scroll-to-top/ScrollToTop.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ScrollToTop_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/@core/components/toastification/ToastificationContent.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************!*\
  !*** ./resources/js/src/@core/components/toastification/ToastificationContent.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ToastificationContent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ToastificationContent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/@core/components/toastification/ToastificationContent.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ToastificationContent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/App.vue?vue&type=script&lang=js&":
/*!***********************************************************!*\
  !*** ./resources/js/src/App.vue?vue&type=script&lang=js& ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./App.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/App.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/@core/components/scroll-to-top/ScrollToTop.vue?vue&type=template&id=480ba03e&scoped=true&":
/*!********************************************************************************************************************!*\
  !*** ./resources/js/src/@core/components/scroll-to-top/ScrollToTop.vue?vue&type=template&id=480ba03e&scoped=true& ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ScrollToTop_vue_vue_type_template_id_480ba03e_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ScrollToTop_vue_vue_type_template_id_480ba03e_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ScrollToTop_vue_vue_type_template_id_480ba03e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ScrollToTop.vue?vue&type=template&id=480ba03e&scoped=true& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/@core/components/scroll-to-top/ScrollToTop.vue?vue&type=template&id=480ba03e&scoped=true&");


/***/ }),

/***/ "./resources/js/src/@core/components/toastification/ToastificationContent.vue?vue&type=template&id=7834b2fa&scoped=true&":
/*!*******************************************************************************************************************************!*\
  !*** ./resources/js/src/@core/components/toastification/ToastificationContent.vue?vue&type=template&id=7834b2fa&scoped=true& ***!
  \*******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ToastificationContent_vue_vue_type_template_id_7834b2fa_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ToastificationContent_vue_vue_type_template_id_7834b2fa_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ToastificationContent_vue_vue_type_template_id_7834b2fa_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ToastificationContent.vue?vue&type=template&id=7834b2fa&scoped=true& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/@core/components/toastification/ToastificationContent.vue?vue&type=template&id=7834b2fa&scoped=true&");


/***/ }),

/***/ "./resources/js/src/App.vue?vue&type=template&id=7201f370&":
/*!*****************************************************************!*\
  !*** ./resources/js/src/App.vue?vue&type=template&id=7201f370& ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7201f370___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7201f370___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7201f370___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./App.vue?vue&type=template&id=7201f370& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/App.vue?vue&type=template&id=7201f370&");


/***/ }),

/***/ "./resources/js/src/@core/components/feather-icon/FeatherIcon.vue?vue&type=style&index=0&id=5d53bac0&lang=scss&":
/*!**********************************************************************************************************************!*\
  !*** ./resources/js/src/@core/components/feather-icon/FeatherIcon.vue?vue&type=style&index=0&id=5d53bac0&lang=scss& ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_resolve_url_loader_index_js_clonedRuleSet_22_use_0_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_use_1_node_modules_vue_loader_lib_index_js_vue_loader_options_FeatherIcon_vue_vue_type_style_index_0_id_5d53bac0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/resolve-url-loader/index.js??clonedRuleSet-22.use[0]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[1]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./FeatherIcon.vue?vue&type=style&index=0&id=5d53bac0&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/resolve-url-loader/index.js??clonedRuleSet-22.use[0]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/@core/components/feather-icon/FeatherIcon.vue?vue&type=style&index=0&id=5d53bac0&lang=scss&");


/***/ }),

/***/ "./resources/js/src/@core/components/scroll-to-top/ScrollToTop.vue?vue&type=style&index=0&id=480ba03e&lang=scss&scoped=true&":
/*!***********************************************************************************************************************************!*\
  !*** ./resources/js/src/@core/components/scroll-to-top/ScrollToTop.vue?vue&type=style&index=0&id=480ba03e&lang=scss&scoped=true& ***!
  \***********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_resolve_url_loader_index_js_clonedRuleSet_22_use_0_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_use_1_node_modules_vue_loader_lib_index_js_vue_loader_options_ScrollToTop_vue_vue_type_style_index_0_id_480ba03e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/resolve-url-loader/index.js??clonedRuleSet-22.use[0]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[1]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ScrollToTop.vue?vue&type=style&index=0&id=480ba03e&lang=scss&scoped=true& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/resolve-url-loader/index.js??clonedRuleSet-22.use[0]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/@core/components/scroll-to-top/ScrollToTop.vue?vue&type=style&index=0&id=480ba03e&lang=scss&scoped=true&");


/***/ }),

/***/ "./resources/js/src/@core/components/toastification/ToastificationContent.vue?vue&type=style&index=0&id=7834b2fa&lang=scss&scoped=true&":
/*!**********************************************************************************************************************************************!*\
  !*** ./resources/js/src/@core/components/toastification/ToastificationContent.vue?vue&type=style&index=0&id=7834b2fa&lang=scss&scoped=true& ***!
  \**********************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_resolve_url_loader_index_js_clonedRuleSet_22_use_0_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_use_1_node_modules_vue_loader_lib_index_js_vue_loader_options_ToastificationContent_vue_vue_type_style_index_0_id_7834b2fa_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/resolve-url-loader/index.js??clonedRuleSet-22.use[0]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[1]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ToastificationContent.vue?vue&type=style&index=0&id=7834b2fa&lang=scss&scoped=true& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/resolve-url-loader/index.js??clonedRuleSet-22.use[0]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/@core/components/toastification/ToastificationContent.vue?vue&type=style&index=0&id=7834b2fa&lang=scss&scoped=true&");


/***/ }),

/***/ "./resources/js/src/libs/i18n/locales sync recursive [A-Za-z0-9-_,\\s]+\\.json$/":
/*!****************************************************************************!*\
  !*** ./resources/js/src/libs/i18n/locales/ sync [A-Za-z0-9-_,\s]+\.json$/ ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./en.json": "./resources/js/src/libs/i18n/locales/en.json",
	"./es.json": "./resources/js/src/libs/i18n/locales/es.json"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./resources/js/src/libs/i18n/locales sync recursive [A-Za-z0-9-_,\\s]+\\.json$/";

/***/ }),

/***/ "./resources/js/src/libs/i18n/locales/en.json":
/*!****************************************************!*\
  !*** ./resources/js/src/libs/i18n/locales/en.json ***!
  \****************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"generales":{"descripcion":"Description","eliminados":"Eliminated","no_eliminados":"Not Eliminated","mostrar":"Show","entradas":"entries","buscar":"Search","mostrando":"Showing","de":"from"},"message":{"title":"Card Title","text":"Cake sesame snaps cupcake gingerbread danish I love gingerbread. Apple pie pie jujubes chupa chups muffin halvah lollipop. Chocolate cake oat cake tiramisu marzipan sugar plum. Donut sweet pie oat cake dragée fruitcake cotton candy lemon drops.","pagelength":"Showing 1 to","of":"of","pageText2":"entries","seachLabel":"Search","SearchPlaceholder":"Search","tableHeader":{"name":"Name","email":"Email","date":"Date","salary":"Salary","status":"Status","action":"Action"}},"UI Elements":"UI Elements","Forms & Tables":"Forms & Tables","Pages":"Pages","Charts & Maps":"Charts & Maps","Others":"Others","Typography":"Typography","Colors":"Colors","Feather":"Feather","Cards":"Cards","Basic":"Basic","Advance":"Advance","Statistic":"Statistic","Analytic":"Analytic","Card Action":"Card Action","Components":"Components","Alert":"Alert","Aspect":"Aspect","Avatar":"Avatar","Badge":"Badge","Breadcrumb":"Breadcrumb","Button":"Button","Button Group":"Button Group","Button Toolbar":"Button Toolbar","Calendar":"Calendar","Carousel":"Carousel","Collapse":"Collapse","Dropdown":"Dropdown","Embed":"Embed","Image":"Image","List Group":"List Group","Media":"Media","Modal":"Modal","Nav":"Nav","Overlay":"Overlay","Pagination":"Pagination","Pagination Nav":"Pagination Nav","Pill":"Pill","Pill Badge":"Pill Badge","Popover":"Popover","Progress":"Progress","Sidebar":"Sidebar","spinner":"spinner","Tab":"Tab","Time":"Time","Toasts":"Toasts","Tooltip":"Tooltip","Extensions":"Extensions","Sweet Alert":"Sweet Alert","Quill Editor":"Quill Editor","Drag & Drop":"Drag & Drop","Swiper":"Swiper","Clipboard":"Clipboard","Video Player":"Video Player","Context Menu":"Context Menu","Toastification":"Toastification","I18n":"I18n","Slider":"Slider","Tour":"Tour","Auto Suggest":"Auto Suggest","Tree":"Tree","Date Time Picker":"Date Time Picker","Vue Select":"Vue Select","Forms Elements":"Forms elements","Select":"Select","Switch":"Switch","Checkbox":"Checkbox","Radio":"Radio","Input":"Input","Textarea":"Textarea","Spinbutton":"Spinbutton","Input Group":"Input Group","Form Rating":"Form Rating","Form Tag":"Form Tag","Form Datepicker":"Form Datepicker","Form Timepicker":"Form Timepicker","File Input":"File Input","Input Mask":"Input Mask","Form Layout":"Form Layout","Form Wizard":"Form Wizard","Form Validation":"Form Validation","Form Repeater":"Form Repeater","BS Table":"BS Table","Good Table":"Good Table","Charts":"Charts","Apex Chart":"Apex Chart","Chartjs":"Chartjs","Echart":"Echart","Leaflet":"Leaflet","Profile":"Profile","Account Settings":"Account Settings","Faq":"Faq","Knowledge Base":"Knowledge Base","Pricing":"Pricing","Blog":"Blog","List":"List","Detail":"Detail","Edit":"Edit","Search":"Search","Menu Levels":"Menu Levels","Menu Level 2.1":"Menu Level 2.1","Menu Level 2.2":"Menu Level 2.2","Menu Level 3.1":"Menu Level 3.1","Menu Level 3.2":"Menu Level 3.2","Disabled Menu":"Disabled Menu","Support":"Support","Raise Support":"Raise Support","Documentation":"Documentation","Dashboards":"Dashboards","eCommerce":"eCommerce","Analytics":"Analytics","Apps & Pages":"Apps & Pages","Email":"Email","Chat":"Chat","Todo":"Todo","Invoice":"Invoice","Preview":"Preview","Add":"Add","Shop":"Shop","Details":"Details","Wishlist":"Wishlist","Checkout":"Checkout","User":"User","View":"View","Authentication":"Authentication","Login v1":"Login v1","Login v2":"Login v2","Register v1":"Register v1","Register v2":"Register v2","Forget Password v1":"Forget Password v1","Forget Password v2":"Forget Password v2","Forgot Password v1":"Forgot Password v1","Forgot Password v2":"Forgot Password v2","Reset Password v1":"Reset Password v1","Reset Password v2":"Reset Password v2","Miscellaneous":"Miscellaneous","Coming Soon":"Coming Soon","Not Authorized":"Not Authorized","Under Maintenance":"Under Maintenance","Error":"Error","Statistics":"Statistics","Card Actions":"Card Actions","Media Objects":"Media Objects","Timeline":"Timeline","Access Control":"Access Control","Apps":"Apps","User Interface":"User Interface","Mail Templates":"Mail Templates","Welcome":"Welcome","Reset Password":"Reset Password","Verify Email":"Verify Email","Deactivate Account":"Deactivate Account","Promotional":"Promotional","Page Layouts":"Page Layouts","Collapsed Menu":"Collapsed Menu","Layout Boxed":"Layout Boxed","Without Menu":"Without Menu","Layout Empty":"Layout Empty","Layout Blank":"Layout Blank","Selecciona una Categoría y un rango de precio":"Select a category and a price range","Categorías":"Categories","Tienda de Regalos":"Gift shop","Listado":"List","Productos encontrados":"Products found","Inicio":"Start","Preguntas Frecuentes":"Faqs","Afilia tú negocio":"Affiliate your business","Terminos y condiciones":"Terms and Conditions","Noticias nuevas":"New News","Contacto":"Contact","Politics de privacidad":"Privacy policy","Tiendas":"Shops Km. 0","Información de Interés sobre el Destino":"Information of Interest about the Destination","productos disponible":"products available","producto disponible":"product available","Información sobre envíos":"Shipping Information","Costo de envío":"Shipping cost","Condiciones que aplican":"Conditions that apply","Características":"Characteristics","Comprar":"Buy","Nota":"Note","nota-despacho":"All physical products in the (Souvenirs) category are shipped to your address (with charge). Products from stores in category (Km.0) are collected at the chosen store. Digital products from the (Services) category are sent to your email.","Disponibilidad en tiendas":"Availability in stores","Descripción":"Description","Producto":"Product","Perfil":"Profile","Tienda":"Store","Opiniones":"Opinions","Tienda que ofrece el producto y/o servicio.":"Store that offers the product and/or service.","Elija la variación deseada":"Choose the desired variation","Sin Variante":"No variant","Cantidad de productos":"Quantity of products","Cerrar":"Close","Excelente":"Excellent","Muy Bueno":"Very good","Promedio":"Average","Mala":"Bad","Horrible":"Awful","Buscar Opinión":"Search Opinion","Escrita el":"Written on","Esta opinión es la opinión subjetiva de un miembro, no de TravelPoints. TravelPoints les hace controles a todas las opiniones.":"This opinion is the subjective opinion of a member, not of TravelPoints. TravelPoints checks all reviews.","Menú / Lista de Precios":"Menu / Price List","Ver Menú / Lista de Precios":"See Menu / Price List","Clic para cambiar imagen":"Click to change image","Ir a tienda":"Go to store","Movimientos de Cuentas":"Account Movements","No se encontró ningun movimiento...":"No movement found...","Solicitar Retiro":"Request Withdrawal","Monto":"Amount","Enviar Solicitud":"Send request","Enviar":"Send","Solicitud de retiro":"Withdrawal request","Recargar":"Reload","Actualizar":"Update","Solo se permiten imagen del tipo JPG, GIF o PNG. Max tamaño de 800kB":"Only JPG, GIF or PNG images are allowed. Max size of 800kB","Cuenta":"Account","Fecha de la reserva":"Reservation date","Horas Disponibles":"Available Hours","Sin horas disponibles":"No hours available","Número de Personas":"Number of people","Observación":"Observation","Agregue una observación o requerimiento a la reserva":"Add an observation or requirement to the reservation","Reservar":"Reserve","Siguiente":"Next","AL seleccionar la hora, buscaremos la cantidad de lugares":"By selecting the time, we will search for the number of places","Fecha y Hora":"Date and Time","Usuario":"User","Negocio":"Business","Destinos":"Destinations","Crear Reservación":"Create Reservation","listado":"list","crear":"create","Entradas":"Entries","Mostrar":"Show","Escriba el nombre del negocio si no lo encuentra en el listado...":"Write the name of the business if you can\'t find it on the list...","Seleccionado":"Selected","Seleccionar":"Select","Elejir Destino":"Choosing Destination"}');

/***/ }),

/***/ "./resources/js/src/libs/i18n/locales/es.json":
/*!****************************************************!*\
  !*** ./resources/js/src/libs/i18n/locales/es.json ***!
  \****************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"generales":{"descripcion":"Descripción","eliminados":"Eliminados","no_eliminados":"No eliminados","mostrar":"Mostrar","entradas":"Entradas","buscar":"Buscar","mostrando":"Mostrando","de":"de"},"message":{"title":"Título de la tarjeta","text":"Pastel de sésamo, magdalena, pan de jengibre danés Me encanta el pan de jengibre. Pastel de manzana pastel de azufaifa chupa chups muffin halvah lollipop. Pastel de chocolate, pastel de avena, tiramisú, mazapán, azúcar, ciruela. Donut tarta dulce tarta de avena dragée tarta de frutas algodón de azúcar gotas de limón.","pagelength":"Showing 1 to","of":"de","pageText2":"entries","seachLabel":"Buscar","SearchPlaceholder":"Buscar","tableHeader":{"name":"Nombre","apellido":"Apellido","email":"Email","date":"Fecha","salary":"Salario","status":"Estatus","action":"Acción"}},"UI Elements":"Elementos de la interfaz de usuario","Forms & Tables":"Formularios & Tablas","Pages":"Paginas","Charts & Maps":"Graficos & Mapas","Others":"Otros","Typography":"Tipografia","Colors":"Colores","Feather":"Pluma","Cards":"Tarjetas","Basic":"Basico","Advance":"Avanzado","Statistic":"estatico","Analytic":"Analytic","Card Action":"Accion de Tarjeta","Components":"Componentes","Alert":"Alerta","Aspect":"Aspecto","Avatar":"Avatar","Badge":"Badge","Breadcrumb":"Breadcrumb","Button":"botón","Button Group":"Grupo de botones","Button Toolbar":"Barra de herramientas de botones","Calendar":"Calendario","Carousel":"Carrusel","Collapse":"Collapso","Dropdown":"Desplegable","Embed":"Empotrar","Image":"Imagen","List Group":"Lista de grupo","Media":"Media","Modal":"Modal","Nav":"Nav","Overlay":"Overlay","Pagination":"Paginación","Pagination Nav":"Navegación de paginación","Pill":"Píldora","Pill Badge":"Insignia de píldora","Popover":"Popover","Progress":"Progreso","Sidebar":"Barra lateral","spinner":"spinner","Tab":"Tab","Time":"Hora","Toasts":"Toasts","Tooltip":"Tooltip","Extensions":"Extensions","Sweet Alert":"Sweet Alert","Quill Editor":"Quill Editor","Drag & Drop":"Drag & Drop","Swiper":"Swiper","Clipboard":"Clipboard","Video Player":"Video Player","Context Menu":"Context Menu","Toastification":"Toastification","I18n":"I18n","Slider":"Slider","Tour":"Tour","Auto Suggest":"Auto Suggest","Tree":"Tree","Date Time Picker":"Date Time Picker","Vue Select":"Vue Select","Forms Elements":"Forms elements","Select":"Select","Switch":"Switch","Checkbox":"Checkbox","Radio":"Radio","Input":"Input","Textarea":"Textarea","Spinbutton":"Spinbutton","Input Group":"Input Group","Form Rating":"Form Rating","Form Tag":"Form Tag","Form Datepicker":"Form Datepicker","Form Timepicker":"Form Timepicker","File Input":"File Input","Input Mask":"Input Mask","Form Layout":"Form Layout","Form Wizard":"Form Wizard","Form Validation":"Form Validation","Form Repeater":"Form Repeater","BS Table":"BS Table","Good Table":"Good Table","Charts":"Charts","Apex Chart":"Apex Chart","Chartjs":"Chartjs","Echart":"Echart","Leaflet":"Leaflet","Profile":"Perfil","Account Settings":"Account Settings","Faq":"Faq","Knowledge Base":"Knowledge Base","Pricing":"Precios","Blog":"Blog","List":"Listado","Detail":"Detalle","Edit":"Editar","Search":"Buscar","Menu Levels":"Menu Levels","Menu Level 2.1":"Menu Level 2.1","Menu Level 2.2":"Menu Level 2.2","Menu Level 3.1":"Menu Level 3.1","Menu Level 3.2":"Menu Level 3.2","Disabled Menu":"Menu desabilitado","Support":"Soporte","Raise Support":"Raise Support","Documentation":"Documentación","Dashboards":"Tableros","eCommerce":"Comercio Electrónico","Analytics":"Analytics","Apps & Pages":"Apps & Pages","Email":"Email","Chat":"Chat","Todo":"Todo","Invoice":"Factura","Preview":"Preview","Add":"Add","Shop":"Shop","Details":"Detalles","Wishlist":"Wishlist","Checkout":"Checkout","User":"User","View":"View","Authentication":"Authentication","Login v1":"Login v1","Login v2":"Login v2","Register v1":"Register v1","Register v2":"Register v2","Forget Password v1":"Forget Password v1","Forget Password v2":"Forget Password v2","Forgot Password v1":"Forgot Password v1","Forgot Password v2":"Forgot Password v2","Reset Password v1":"Reset Password v1","Reset Password v2":"Reset Password v2","Miscellaneous":"Miscellaneous","Coming Soon":"Coming Soon","Not Authorized":"Not Authorized","Under Maintenance":"Under Maintenance","Error":"Error","Statistics":"Statistics","Card Actions":"Card Actions","Media Objects":"Media Objects","Timeline":"Timeline","Access Control":"Access Control","Apps":"Apps","User Interface":"User Interface","Mail Templates":"Mail Templates","Welcome":"Welcome","Reset Password":"Reset Password","Verify Email":"Verify Email","Deactivate Account":"Deactivate Account","Promotional":"Promotional","Page Layouts":"Page Layouts","Collapsed Menu":"Collapsed Menu","Layout Boxed":"Layout Boxed","Without Menu":"Without Menu","Layout Empty":"Layout Empty","Layout Blank":"Layout Blank","Selecciona una Categoría y un rango de precio":"Selecciona una Categoría y un rango de precio","Categorías":"Categorías","Tienda de Regalos":"Tienda de Regalos","Listado":"Listado","Productos encontrados":"Productos encontrados","Inicio":"Inicio","Preguntas Frecuentes":"Preguntas Frecuentes","Afilia tú negocio":"Afilia tú negocio","Terminos y condiciones":"Terminos y condiciones","Noticias nuevas":"Noticias nuevas","Contacto":"Contacto","Politics de privacidad":"Politicas de privacidad","Tiendas":"Tiendas Km. 0","Información de Interés sobre el Destino":"Información de Interés sobre el Destino","productos disponible":"productos disponible","producto disponible":"producto disponible","Información sobre envíos":"Información sobre envíos","Costo de envío":"Costo de envío","Condiciones que aplican":"Condiciones que aplican","Características":"Características","Comprar":"Comprar","Nota":"Nota","nota-despacho":"Todos los productos físicos de la categoría (Souvenirs) se envían a su domicilio (con cargo). Los productos de las tiendas en categoría (Km.0) se recogen en la tienda elegida. Los productos Digitales de la categoría (Servicios) son enviados a su correo electrónico.","Disponibilidad en tiendas":"Disponibilidad en tiendas","Descripción":"Descripción","Producto":"Producto","Perfil":"Perfil","Tienda":"Tienda","Opiniones":"Opiniones","Tienda que ofrece el producto y/o servicio.":"Tienda que ofrece el producto y/o servicio.","Elija la variación deseada":"Elija la variación deseada","Sin Variante":"Sin Variante","Cantidad de productos":"Cantidad de productos","Cerrar":"Cerrar","Excelente":"Excelente","Muy Bueno":"Muy Bueno","Promedio":"Promedio","Mala":"Mala","Horrible":"Horrible","Buscar Opinión":"Buscar Opinión","Escrita el":"Escrita el","Esta opinión es la opinión subjetiva de un miembro, no de TravelPoints. TravelPoints les hace controles a todas las opiniones.":"Esta opinión es la opinión subjetiva de un miembro, no de TravelPoints. TravelPoints les hace controles a todas las opiniones.","Menú / Lista de Precios":"Menú / Lista de Precios","Ver Menú / Lista de Precios":"Menú / Lista de Precios","Clic para cambiar imagen":"Clic para cambiar imagen","Ir a tienda":"Ir a tienda","Movimientos de Cuentas":"Movimientos de Cuentas","No se encontró ningun movimiento...":"No se encontró ningun movimiento...","Solicitar Retiro":"Solicitar Retiro","Monto":"Monto","Enviar Solicitud":"Enviar Solicitud","Enviar":"Enviar","Solicitud de retiro":"Solicitud de retiro","Recargar":"Recargar","Actualizar":"Actualizar","Solo se permiten imagen del tipo JPG, GIF o PNG. Max tamaño de 800kB":"Solo se permiten imagen del tipo JPG, GIF o PNG. Max tamaño de 800kB","Cuenta":"Cuenta","Fecha de la reserva":"Fecha de la reserva","Horas Disponibles":"Horas Disponibles","Sin horas disponibles":"Sin horas disponibles","Número de Personas":"Número de Personas","Observación":"Observación","Agregue una observación o requerimiento a la reserva":"Agregue una observación o requerimiento a la reserva","Reservar":"Reservar","Siguiente":"Siguiente","AL seleccionar la hora, buscaremos la cantidad de lugares":"AL seleccionar la hora, buscaremos la cantidad de lugares","Fecha y Hora":"Fecha y Hora","Usuario":"Usuario","Negocio":"Negocio","Destinos":"Destinos","Crear Reservación":"Crear Reservación","listado":"listado","crear":"crear","Entradas":"Entradas","Mostrar":"Mostrar","Escriba el nombre del negocio si no lo encuentra en el listado...":"Escriba el nombre del negocio si no lo encuentra en el listado...","Seleccionado":"Seleccionado","Seleccionar":"Seleccionar","Elejir Destino":"Elejir Destino"}');

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["/js/vendor"], () => (__webpack_exec__("./resources/js/app.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);