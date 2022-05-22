var Toaststrap;
/******/ (() => {
  // webpackBootstrap
  /******/ "use strict";
  /******/ var __webpack_modules__ = {
    /***/ "./src/assets/styles.scss":
      /*!********************************!*\
  !*** ./src/assets/styles.scss ***!
  \********************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        // extracted by mini-css-extract-plugin

        /***/
      },

    /***/ "./src/RelativeDate.ts":
      /*!*****************************!*\
  !*** ./src/RelativeDate.ts ***!
  \*****************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        });
        var RelativeDate = /** @class */ (function () {
          function RelativeDate(input, reference) {
            this.times = {
              SECOND: 1000,
              MINUTE: 60 * 1000,
              HOUR: 60 * 60 * 1000,
              DAY: 24 * 60 * 60 * 1000,
              WEEK: 7 * 24 * 60 * 60 * 1000,
              YEAR: 365 * 24 * 60 * 60 * 1000,
              MONTH: (365 * 24 * 60 * 60 * 1000) / 12,
            };
            this.formats = [
              [0.7 * this.times.MINUTE, "just now"],
              [1.5 * this.times.MINUTE, "a minute ago"],
              [60 * this.times.MINUTE, "minutes ago", this.times.MINUTE],
              [1.5 * this.times.HOUR, "an hour ago"],
              [this.times.DAY, "hours ago", this.times.HOUR],
              [2 * this.times.DAY, "yesterday"],
              [7 * this.times.DAY, "days ago", this.times.DAY],
              [1.5 * this.times.WEEK, "a week ago"],
              [this.times.MONTH, "weeks ago", this.times.WEEK],
              [1.5 * this.times.MONTH, "a month ago"],
              [this.times.YEAR, "months ago", this.times.MONTH],
              [1.5 * this.times.YEAR, "a year ago"],
              [Number.MAX_VALUE, "years ago", this.times.YEAR],
            ];
            this.input = input;
            this.reference = reference;
            if (!reference) {
              this.reference = new Date().getTime();
            } else if (reference instanceof Date) {
              this.reference = reference.getTime();
            }
            if (input instanceof Date) {
              this.input.getTime();
            }
            if (typeof input === "string") {
              this.input = +new Date(input).getTime();
            }
            return this;
          }
          RelativeDate.prototype.print = function () {
            var delta = this.reference - this.input;
            var format;
            var index;
            var length;
            for (index = -1, length = this.formats.length; ++index < length; ) {
              format = this.formats[index];
              if (delta < format[0]) {
                return format[2] == undefined
                  ? format[1]
                  : Math.round(delta / format[2]) + " " + format[1];
              }
            }
            return "Unknown";
          };
          return RelativeDate;
        })();
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
          RelativeDate;

        /***/
      },

    /***/ "./src/Toaststrap.ts":
      /*!***************************!*\
  !*** ./src/Toaststrap.ts ***!
  \***************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        });
        /* harmony import */ var _preferences__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ./preferences */ "./src/preferences.ts");
        /* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! ./helpers */ "./src/helpers.ts");
        /* harmony import */ var _components_header__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! ./components/header */ "./src/components/header.ts"
          );
        /* harmony import */ var _components_body__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! ./components/body */ "./src/components/body.ts"
          );
        /* harmony import */ var _components_container__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(
            /*! ./components/container */ "./src/components/container.ts"
          );
        /* harmony import */ var _components_sound__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(
            /*! ./components/sound */ "./src/components/sound.ts"
          );
        /* harmony import */ var _components_progress__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(
            /*! ./components/progress */ "./src/components/progress.ts"
          );
        /* harmony import */ var _RelativeDate__WEBPACK_IMPORTED_MODULE_7__ =
          __webpack_require__(/*! ./RelativeDate */ "./src/RelativeDate.ts");
        /* harmony import */ var _Util__WEBPACK_IMPORTED_MODULE_8__ =
          __webpack_require__(/*! ./Util */ "./src/Util.ts");
        var __assign =
          (undefined && undefined.__assign) ||
          function () {
            __assign =
              Object.assign ||
              function (t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                  s = arguments[i];
                  for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
              };
            return __assign.apply(this, arguments);
          };

        /**
         * Toaststrap class for building and generating the toast.
         *
         * @class Toaststrap
         *
         * @version 1.1.0
         */
        var Toaststrap = /** @class */ (function () {
          /**
           * Create a Toaststrap.
           *
           * @param {OptionsType} options - Available options to customize the toast.
           */
          function Toaststrap(options) {
            var _this = this;
            /**
             * Event to close toast. Used in header component.
             *
             * @return {void}
             */
            this.closeEvent = function () {
              _this.destroy(_this.item);
            };
            this.options = __assign(
              {
                avatar: "",
                dismissible: true,
                duration: 3000,
                offset: 10,
                parent: "body",
                pausable: true,
                position:
                  _preferences__WEBPACK_IMPORTED_MODULE_0__.POSITIONS.TOP_END,
                progress: true,
                snackbar: false,
                soundSource: "",
                soundable: false,
                subtitle: {
                  relative: true,
                  datetime: Date.now(),
                },
                text: "",
                title: "",
                type: _preferences__WEBPACK_IMPORTED_MODULE_0__.TYPES.DEFAULT,
              },
              options
            );
            // Set the toast timeout.
            if (typeof this.options.subtitle !== "string") {
              if (
                typeof this.options.subtitle === "object" &&
                "datetime" in this.options.subtitle
              ) {
                var delta = this.options.subtitle;
                if (
                  "relative" in this.options.subtitle &&
                  this.options.subtitle.relative
                ) {
                  this.options.subtitle =
                    new _RelativeDate__WEBPACK_IMPORTED_MODULE_7__["default"](
                      delta.datetime
                    ).print();
                } else {
                  this.options.subtitle = String(delta.datetime);
                }
              }
            }
            // Set toast group.
            // The toast group used to organized the toasts.
            this.group =
              this.options.position ||
              _preferences__WEBPACK_IMPORTED_MODULE_0__.POSITIONS.TOP_END;
            if (
              Object.keys(
                _preferences__WEBPACK_IMPORTED_MODULE_0__.POSITIONS
              ).includes(this.options.position)
            ) {
              this.options.position =
                _preferences__WEBPACK_IMPORTED_MODULE_0__["default"].positions[
                  this.options.position
                ];
            } else {
              this.options.position =
                _preferences__WEBPACK_IMPORTED_MODULE_0__[
                  "default"
                ].positions.TOP_END;
            }
            this.item = document.createElement("div");
            this.spaceBetween = 5;
            if (
              this.options.soundable &&
              this.options.soundSource &&
              this.options.soundSource.length > 0
            ) {
              this.sound = new _components_sound__WEBPACK_IMPORTED_MODULE_5__[
                "default"
              ](this.options.soundSource, this.parentElement);
            }
            this.id = _Util__WEBPACK_IMPORTED_MODULE_8__["default"].makeId();
            this.createdAt = Date.now().toString();
            this.timeout = setTimeout(function () {}, 0);
            this.progressInterval = setInterval(function () {}, 0);
            this.pauseProgressInterval = false;
            this.progressStartTime = 0;
          }
          /**
           * Push the toast to the document parent node.
           *
           * @return {this} The toast instance.
           */
          Toaststrap.prototype.show = function () {
            var root = this.parentElement;
            var toast = this.build;
            root.insertBefore(toast, root.firstChild);
            // Play sound if it's allowed.
            if (this.sound) {
              this.sound.instance.play().catch(function () {
                console.warn("Sound source given not found or not supported.");
              });
            }
            // Order toasts.
            this.organize();
            return this;
          };
          Object.defineProperty(Toaststrap.prototype, "build", {
            /**
             * Build the toast element.
             *
             * @return {HTMLElement} The generated toast.
             */
            get: function () {
              var _a;
              var _this = this;
              // Container Element
              var container = (0,
              _components_container__WEBPACK_IMPORTED_MODULE_4__.ToastContainer)(
                this
              );
              // Toast Element
              var toastElement = document.createElement("div");
              toastElement.classList.add("toast");
              container.classList.add("toaststrap-container");
              container.setAttribute("data-id", this.id);
              container.setAttribute("data-created-at", this.createdAt);
              container.setAttribute(
                "data-type",
                this.options.type ? this.options.type.toLowerCase() : ""
              );
              container.setAttribute("data-group", this.group);
              container.setAttribute(
                "data-snackbar",
                String(this.options.snackbar)
              );
              // Toast Header (only if option hideHeader is set to false).
              if (!this.options.snackbar) {
                toastElement.appendChild(
                  (0,
                  _components_header__WEBPACK_IMPORTED_MODULE_2__.HeaderComponent)(
                    this
                  )
                );
              } else {
                (_a = toastElement.classList).add.apply(
                  _a,
                  _preferences__WEBPACK_IMPORTED_MODULE_0__["default"].types[
                    this.options.type
                  ]
                );
              }
              // Toast Body
              toastElement.appendChild(
                (0, _components_body__WEBPACK_IMPORTED_MODULE_3__.ToastBody)(
                  this
                )
              );
              if (this.options.progress) {
                // Toast Progress
                toastElement.appendChild(
                  (0,
                  _components_progress__WEBPACK_IMPORTED_MODULE_6__.ProgressComponent)(
                    this
                  )
                );
              }
              // Put toast into it's container.
              container.appendChild(toastElement);
              // Watch toast height changed, and re-order if happen.
              new ResizeObserver(function () {
                _this.organize();
              }).observe(container);
              // Toast instance.
              this.item = container;
              // Show the toast by adding class (.show)
              container.classList.add("show");
              if (this.options.duration > 0) {
                this.timeout = setTimeout(function () {
                  _this.destroy(container);
                }, this.options.duration);
                if (this.options.pausable) {
                  var touchStartCallBack_1 = function () {
                    clearTimeout(_this.timeout);
                    _this.pauseProgressInterval = true;
                  };
                  var touchEndCallBack_1 = function () {
                    _this.pauseProgressInterval = false;
                    _this.progressStartTime = new Date().getTime();
                    _this.timeout = setTimeout(function () {
                      _this.destroy(_this.item);
                    }, _this.options.duration);
                  };
                  "mouseover touchstart touchend"
                    .split(" ")
                    .forEach(function (e) {
                      _this.item.addEventListener(e, touchStartCallBack_1);
                    });
                  "mouseleave touchend".split(" ").forEach(function (e) {
                    _this.item.addEventListener(e, touchEndCallBack_1);
                  });
                }
              }
              // Return toast instance.
              return container;
            },
            enumerable: false,
            configurable: true,
          });
          Object.defineProperty(Toaststrap.prototype, "parentElement", {
            /**
             *  The parent element, which will contain the toasts.
             * @return {Element}  The main element selected by the user if available, or the default parent.
             */
            get: function () {
              if (this.options.parent) {
                var userRootElement = document.querySelector(
                  this.options.parent
                );
                if (!userRootElement) {
                  throw "User root element not exists.";
                }
                if (Array.isArray(userRootElement)) {
                  return userRootElement[0];
                }
                return userRootElement;
              }
              return document.body;
            },
            enumerable: false,
            configurable: true,
          });
          /**
           * Remove the element from dom after timeout finished.
           */
          Toaststrap.prototype.destroy = function (toastElement) {
            // Hide the element.
            toastElement.classList.remove("show");
            if (typeof this.options.onClose === "function") {
              this.options.onClose(this);
            }
            window.setTimeout(function () {
              var _a;
              (_a = toastElement.parentNode) === null || _a === void 0
                ? void 0
                : _a.removeChild(toastElement);
            }, 400);
          };
          Toaststrap.prototype.organize = function () {
            var _this = this;
            var offset = this.options.offset;
            var topLeftOffsetSize = {
              top: Number(offset),
              bottom: Number(offset),
            };
            var topRightOffsetSize = {
              top: Number(offset),
              bottom: Number(offset),
            };
            var offsetSize = {
              top: Number(offset),
              bottom: Number(offset),
            };
            var selector = "."
              .concat(
                (0, _preferences__WEBPACK_IMPORTED_MODULE_0__.gclass)(
                  "container"
                ),
                "[data-group='"
              )
              .concat(this.group, "']");
            var windowWidth =
              window.innerWidth > 0 ? window.innerWidth : screen.width;
            if (windowWidth <= 360) {
              selector = ".".concat(
                (0, _preferences__WEBPACK_IMPORTED_MODULE_0__.gclass)(
                  "container"
                )
              );
            }
            var toasts = document.querySelectorAll(selector);
            var classUsed;
            if (toasts.length > 0) {
              toasts.forEach(function (toast) {
                if (
                  (0, _helpers__WEBPACK_IMPORTED_MODULE_1__.hasClass)(
                    toast,
                    (0, _preferences__WEBPACK_IMPORTED_MODULE_0__.gclass)("top")
                  )
                ) {
                  classUsed = (0,
                  _preferences__WEBPACK_IMPORTED_MODULE_0__.gclass)("top");
                } else if (
                  (0, _helpers__WEBPACK_IMPORTED_MODULE_1__.hasClass)(
                    toast,
                    (0, _preferences__WEBPACK_IMPORTED_MODULE_0__.gclass)(
                      "middle"
                    )
                  )
                ) {
                  classUsed = (0,
                  _preferences__WEBPACK_IMPORTED_MODULE_0__.gclass)("middle");
                } else {
                  classUsed = (0,
                  _preferences__WEBPACK_IMPORTED_MODULE_0__.gclass)("bottom");
                }
                var toastHeight = toast.offsetHeight;
                classUsed = classUsed.substr(
                  "".concat(
                    _preferences__WEBPACK_IMPORTED_MODULE_0__.cprefix,
                    "-"
                  ).length - 1,
                  classUsed.length - 1
                );
                // Show toast in center if screen with less than or equal to 360px.
                if (windowWidth <= 360) {
                  toast.style[classUsed] = offsetSize[classUsed] + "px";
                  offsetSize[classUsed] += toastHeight + _this.spaceBetween;
                } else {
                  if (
                    (0, _helpers__WEBPACK_IMPORTED_MODULE_1__.hasClass)(
                      toast,
                      "start-".concat(_this.options.offset)
                    )
                  ) {
                    toast.style[classUsed] =
                      topLeftOffsetSize[classUsed] + "px";
                    topLeftOffsetSize[classUsed] +=
                      toastHeight + _this.spaceBetween;
                  } else {
                    toast.style[classUsed] =
                      topRightOffsetSize[classUsed] + "px";
                    topRightOffsetSize[classUsed] +=
                      toastHeight + _this.spaceBetween;
                  }
                }
              });
            }
          };
          return Toaststrap;
        })();
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
          Toaststrap;

        /***/
      },

    /***/ "./src/Util.ts":
      /*!*********************!*\
  !*** ./src/Util.ts ***!
  \*********************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        });
        /**
         * Provides some useful utility.
         * @class Util
         */
        var Util = /** @class */ (function () {
          function Util() {}
          /**
           * Format a string template.
           * @param {string} str String to be format.
           * @param {object} values The values object.
           * @return string
           */
          Util.strFormat = function (str, values) {
            if (str && Object.keys(values).length > 0) {
              var regex = new RegExp(/([{}])\1|[{](.*?)(?:!(.+?))?[}]/g);
              return str.replace(regex, function (index) {
                var key = index.replace(/{/, "").replace(/}/, "");
                if (!values[key]) {
                  return index;
                }
                return values[key];
              });
            }
            return str;
          };
          /**
           * Generate an unique identifier.
           * @return string
           */
          Util.makeId = function () {
            return String(Math.floor(10000000000 + Math.random() * 9000000000));
          };
          return Util;
        })();
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = Util;

        /***/
      },

    /***/ "./src/components/body.ts":
      /*!********************************!*\
  !*** ./src/components/body.ts ***!
  \********************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ ToastBody: () => /* binding */ ToastBody,
          /* harmony export */
        });
        var ToastBody = function (context) {
          var options = context.options;
          var bodyElement = document.createElement("div");
          bodyElement.classList.add("toast-body");
          bodyElement.innerHTML = options.text;
          return bodyElement;
        };

        /***/
      },

    /***/ "./src/components/container.ts":
      /*!*************************************!*\
  !*** ./src/components/container.ts ***!
  \*************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ ToastContainer: () =>
            /* binding */ ToastContainer,
          /* harmony export */
        });
        /* harmony import */ var _preferences__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ../preferences */ "./src/preferences.ts");

        var ToastContainer = function (context) {
          var options = context.options;
          var containerElement = document.createElement("div");
          containerElement.className = ""
            .concat(
              context.options.parent ? "position-absolute" : "position-fixed",
              " "
            )
            .concat(options.position, "-")
            .concat(options.offset, " ")
            .concat(
              (0, _preferences__WEBPACK_IMPORTED_MODULE_0__.gclass)("container")
            );
          containerElement.style.zIndex = "1000000000";
          return containerElement;
        };

        /***/
      },

    /***/ "./src/components/header.ts":
      /*!**********************************!*\
  !*** ./src/components/header.ts ***!
  \**********************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ HeaderComponent: () =>
            /* binding */ HeaderComponent,
          /* harmony export */
        });
        /* harmony import */ var _preferences__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ../preferences */ "./src/preferences.ts");

        var AvatarComponent = function (options) {
          var avatarElement = document.createElement("img");
          avatarElement.classList.add("rounded", "me-2");
          avatarElement.src = options.avatar || "";
          avatarElement.width = 20;
          avatarElement.height = 20;
          return avatarElement;
        };
        var CloseButtonComponent = function (onCloseEvent) {
          var closeBtnElement = document.createElement("button");
          closeBtnElement.classList.add("btn-close");
          closeBtnElement.setAttribute("type", "button");
          closeBtnElement.setAttribute("area-label", "Close");
          closeBtnElement.addEventListener("click", function (evt) {
            evt.stopPropagation();
            onCloseEvent();
          });
          return closeBtnElement;
        };
        var HeaderComponent = function (context) {
          var _a;
          var options = context.options;
          var headerElement = document.createElement("div");
          headerElement.classList.add("toast-header");
          // Avatar element
          if (options.avatar) {
            headerElement.appendChild(AvatarComponent(options));
          }
          if (options.type) {
            (_a = headerElement.classList).add.apply(
              _a,
              _preferences__WEBPACK_IMPORTED_MODULE_0__["default"].types[
                options.type
              ]
            );
          }
          // Create title element.
          var titleElement = document.createElement("strong");
          titleElement.classList.add("me-auto");
          titleElement.innerText = options.title;
          headerElement.appendChild(titleElement);
          if (options.subtitle) {
            // time
            var timeElement = document.createElement("small");
            if (typeof options.subtitle === "string") {
              timeElement.innerText = options.subtitle;
            }
            headerElement.appendChild(timeElement);
          }
          // Close button
          if (options.dismissible) {
            headerElement.appendChild(CloseButtonComponent(context.closeEvent));
          }
          // Return header element.
          return headerElement;
        };

        /***/
      },

    /***/ "./src/components/progress.ts":
      /*!************************************!*\
  !*** ./src/components/progress.ts ***!
  \************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ ProgressComponent: () =>
            /* binding */ ProgressComponent,
          /* harmony export */
        });
        var ProgressComponent = function (factory) {
          var duration = factory.options.duration;
          var progressElement = document.createElement("div");
          progressElement.classList.add("toast-footer");
          var indicatorElement = document.createElement("div");
          indicatorElement.classList.add("toast-footer-inner");
          progressElement.appendChild(indicatorElement);
          if (duration > 0) {
            duration < 100 ? (duration = duration * 1000) : duration;
            indicatorElement.style.animationDuration = "".concat(
              duration,
              "ms"
            );
          }
          /**
           * I made this to make progress move when duration is set.
           * But it's kill the performance, so I decided to use CSS to do that.
           *
           * @deprecated
           */
          // @ts-ignore
          var start = function () {
            factory.progressStartTime = new Date().getTime();
            // >..< I will just use css to do that.
            if (duration > 0) {
              factory.progressInterval = setInterval(function () {
                if (!factory.pauseProgressInterval) {
                  var diff = Math.round(
                    new Date().getTime() - factory.progressStartTime
                  );
                  var value = Math.round((diff / duration) * 100);
                  value = value > 100 ? 100 : value;
                  indicatorElement.style.width = value + "%";
                  if (diff >= duration) {
                    clearInterval(factory.progressInterval);
                  }
                }
              }, 100);
            }
          };
          return progressElement;
        };

        /***/
      },

    /***/ "./src/components/sound.ts":
      /*!*********************************!*\
  !*** ./src/components/sound.ts ***!
  \*********************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        });
        /* harmony import */ var _preferences__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ../preferences */ "./src/preferences.ts");

        var Sound = /** @class */ (function () {
          function Sound(audioFile, parentElement) {
            this.selector = "".concat(
              _preferences__WEBPACK_IMPORTED_MODULE_0__.cprefix,
              "-notification"
            );
            this.element = new Audio(audioFile);
            this.parent = parentElement;
            this.make();
            return this;
          }
          Sound.prototype.make = function () {
            this.element.id = this.selector;
            if (!this.parent.querySelector("#" + this.selector)) {
              this.parent.appendChild(this.element);
            }
          };
          Object.defineProperty(Sound.prototype, "instance", {
            get: function () {
              return this.element;
            },
            enumerable: false,
            configurable: true,
          });
          return Sound;
        })();
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = Sound;

        /***/
      },

    /***/ "./src/helpers.ts":
      /*!************************!*\
  !*** ./src/helpers.ts ***!
  \************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ hasClass: () => /* binding */ hasClass,
          /* harmony export */
        });
        var hasClass = function (element, className) {
          return element.classList.contains(className);
        };

        /***/
      },

    /***/ "./src/preferences.ts":
      /*!****************************!*\
  !*** ./src/preferences.ts ***!
  \****************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ cprefix: () => /* binding */ cprefix,
          /* harmony export */ gclass: () => /* binding */ gclass,
          /* harmony export */ POSITIONS: () => /* binding */ POSITIONS,
          /* harmony export */ TYPES: () => /* binding */ TYPES,
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        });
        /**
         * Prefix will be applied to all css classes.
         */
        var cprefix = "toaststrap-";
        /**
         * Get the classname with the prefix.
         * @param {string} c
         */
        function gclass(c) {
          return cprefix + c;
        }
        var POSITIONS;
        (function (POSITIONS) {
          POSITIONS["TOP_START"] = "TOP_START";
          POSITIONS["TOP_END"] = "TOP_END";
          POSITIONS["TOP_CENTER"] = "TOP_CENTER";
          POSITIONS["BOTTOM_START"] = "BOTTOM_START";
          POSITIONS["BOTTOM_END"] = "BOTTOM_END";
          POSITIONS["BOTTOM_CENTER"] = "BOTTOM_CENTER";
        })(POSITIONS || (POSITIONS = {}));
        var TYPES;
        (function (TYPES) {
          TYPES["DEFAULT"] = "DEFAULT";
          TYPES["PRIMARY"] = "PRIMARY";
          TYPES["INFO"] = "INFO";
          TYPES["SUCCESS"] = "SUCCESS";
          TYPES["WARNING"] = "WARNING";
          TYPES["DANGER"] = "DANGER";
          TYPES["DARK"] = "DARK";
          TYPES["SWEET"] = "SWEET";
        })(TYPES || (TYPES = {}));
        /**
         *
         */
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = {
          positions: {
            // TOP
            TOP_START: gclass("top") + " " + gclass("start"),
            TOP_END: gclass("top") + " " + gclass("end"),
            TOP_CENTER: gclass("top") + " " + gclass("center"),
            // Bottom
            BOTTOM_CENTER: gclass("bottom") + " " + gclass("center"),
            BOTTOM_START: gclass("bottom") + " " + gclass("start"),
            BOTTOM_END: gclass("bottom") + " " + gclass("end"),
          },
          types: {
            DEFAULT: ["bg-default"],
            PRIMARY: ["bg-primary", "text-light"],
            INFO: ["bg-info", "text-light"],
            SUCCESS: ["bg-success", "text-light"],
            WARNING: ["bg-warning", "text-dark"],
            DANGER: ["bg-danger", "text-light"],
            DARK: ["bg-dark", "text-light"],
            SECONDARY: ["bg-secondary", "text-light"],
            // I made this one for fun, you can add your own styles too.
            SWEET: ["bg-sweet", "text-light"],
          },
        };

        /***/
      },

    /***/ "./src/typecheck.ts":
      /*!**************************!*\
  !*** ./src/typecheck.ts ***!
  \**************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        });
        /* harmony import */ var _Util__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ./Util */ "./src/Util.ts");
        /**----------------------------------
         * Checking and securing options types.
         * Only for browsers.
         *----------------------------------*/

        var TYPE_CHECK = "TypeError: Option {option} should be in type {type}.";
        var resolve = function (path, obj, separator) {
          if (obj === void 0) {
            obj = self;
          }
          if (separator === void 0) {
            separator = ".";
          }
          var properties = Array.isArray(path) ? path : path.split(separator);
          // @ts-ignore
          return properties.reduce(function (prev, curr) {
            return prev && prev[curr];
          }, obj);
        };
        var checks = [
          [TYPE_CHECK, "dismissible", "boolean"],
          [TYPE_CHECK, "duration", "number"],
          [TYPE_CHECK, "offset", "number"],
          [TYPE_CHECK, "onClose", "function"],
          [TYPE_CHECK, "onShow", "function"],
          [TYPE_CHECK, "parent", "string"],
          [TYPE_CHECK, "pausable", "boolean"],
          [TYPE_CHECK, "position", "string"],
          [TYPE_CHECK, "progress", "boolean"],
          [TYPE_CHECK, "snackbar", "boolean"],
          [TYPE_CHECK, "soundSource", "string"],
          [TYPE_CHECK, "soundable", "boolean"],
          [TYPE_CHECK, "subtitle", ["string", "object"]],
          [TYPE_CHECK, "text", "string"],
          [TYPE_CHECK, "title", "string"],
          [TYPE_CHECK, "type", "string"],
          [TYPE_CHECK, "subtitle.relative", "boolean"],
          [TYPE_CHECK, "subtitle.datetime", ["string", "Date", "number"]],
        ];
        var filters = function (options) {
          if (checks.length > 0) {
            checks.forEach(function (check) {
              var firstIndex = check[0];
              var secondIndex = check[1];
              var lastIndex = check[2];
              if (Array.isArray(lastIndex)) {
                var succeed_1 = false;
                lastIndex.forEach(function (type) {
                  // @ts-ignore
                  if (
                    typeof resolve(secondIndex, options) !== "undefined" &&
                    typeof resolve(secondIndex, options) === type
                  ) {
                    succeed_1 = true;
                    return;
                  }
                });
                if (!succeed_1) {
                  // @ts-ignore
                  throw _Util__WEBPACK_IMPORTED_MODULE_0__["default"].strFormat(
                    firstIndex,
                    { option: secondIndex, type: lastIndex.toString() }
                  );
                }
              } else {
                // @ts-ignore
                if (
                  resolve(secondIndex, options) &&
                  typeof resolve(secondIndex, options) !== lastIndex
                ) {
                  // @ts-ignore
                  throw _Util__WEBPACK_IMPORTED_MODULE_0__["default"].strFormat(
                    firstIndex,
                    { option: secondIndex, type: lastIndex }
                  );
                }
              }
            });
          }
        };
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = filters;

        /***/
      },

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ __webpack_modules__[moduleId](
      module,
      module.exports,
      __webpack_require__
    );
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/define property getters */
  /******/ (() => {
    /******/ // define getter functions for harmony exports
    /******/ __webpack_require__.d = (exports, definition) => {
      /******/ for (var key in definition) {
        /******/ if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          /******/ Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          });
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/hasOwnProperty shorthand */
  /******/ (() => {
    /******/ __webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop);
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/make namespace object */
  /******/ (() => {
    /******/ // define __esModule on exports
    /******/ __webpack_require__.r = (exports) => {
      /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, {
          value: "Module",
        });
        /******/
      }
      /******/ Object.defineProperty(exports, "__esModule", { value: true });
      /******/
    };
    /******/
  })();
  /******/
  /************************************************************************/
  var __webpack_exports__ = {};
  // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
  (() => {
    /*!************************!*\
  !*** ./src/browser.ts ***!
  \************************/
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */ var _Toaststrap__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(/*! ./Toaststrap */ "./src/Toaststrap.ts");
    /* harmony import */ var _preferences__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(/*! ./preferences */ "./src/preferences.ts");
    /* harmony import */ var _assets_styles_scss__WEBPACK_IMPORTED_MODULE_2__ =
      __webpack_require__(
        /*! ./assets/styles.scss */ "./src/assets/styles.scss"
      );
    /* harmony import */ var _typecheck__WEBPACK_IMPORTED_MODULE_3__ =
      __webpack_require__(/*! ./typecheck */ "./src/typecheck.ts");
    var __assign =
      (undefined && undefined.__assign) ||
      function () {
        __assign =
          Object.assign ||
          function (t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
          };
        return __assign.apply(this, arguments);
      };

    /**
     *
     * @param {OptionsType} options
     */
    var initialize = function (options) {
      // Type checks.
      if (Object.keys(options).length) {
        (0, _typecheck__WEBPACK_IMPORTED_MODULE_3__["default"])(options);
      }
      return new _Toaststrap__WEBPACK_IMPORTED_MODULE_0__["default"](
        __assign({}, options)
      );
    };
    // Window
    window.toaststrap = initialize;
    window.toaststrap_position =
      _preferences__WEBPACK_IMPORTED_MODULE_1__.POSITIONS;
    window.toaststrap_type = _preferences__WEBPACK_IMPORTED_MODULE_1__.TYPES;
  })();

  Toaststrap = __webpack_exports__;
  /******/
})();

window.chipdeals_app_notify = (options) => {
  /*
    
    TYPES["DEFAULT"] = "DEFAULT";
    TYPES["PRIMARY"] = "PRIMARY";
    TYPES["INFO"] = "INFO";
    TYPES["SUCCESS"] = "SUCCESS";
    TYPES["WARNING"] = "WARNING";
    TYPES["DANGER"] = "DANGER";
    TYPES["DARK"] = "DARK";
    TYPES["SWEET"] = "SWEET";
    */

  var opts = {
    snackbar: true,
    title: "title",
    text: `Euler bro`,
    position: "TOP_CENTER",
    type: "INFO",
    duration: 3000,
    progress: true,
    pausable: false,
    subtitle: {
      // Toaststrap birthday
      datetime: "",
      // relative: false,
    },
    /* onClose: (toast) => {
        toast.options.snackbar = true;
        toast.options.text = "Please wait....";
        toast.options.type = "WARNING";
        toast.options.duration = 3500;

        setTimeout(() => {
          window.location.href = "https://ko-fi.com/nawafinity"
        }, 3000)
        toast.show();
      },*/
    ...options,
  };

  var toast = toaststrap(opts);
  toast.show();
  toasts.push(toast);
  return toasts.length - 1;
};

window.chipdeals_app_destroy_notification = (toastKey) => {
  toasts[toastKey].closeEvent();
};

const toasts = [];
