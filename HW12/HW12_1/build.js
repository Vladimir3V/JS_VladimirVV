var intro =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	
	var Controller = __webpack_require__(1);
	var Model 	   = __webpack_require__(2);
	var Router     = __webpack_require__(3);
	var View	   = __webpack_require__(4);


	exports.Controller = Controller();
	exports.Model = Model();
	exports.Router = Router();
	exports.View = View();

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = () => {

		let Controller = {
			musicRoute: function () {
				return intro.Model.getMusic().then(function (music) {
					results.innerHTML = intro.View.render('music', {
						list: music
					});
				});
			},
			friendsRoute: function () {
				return intro.Model.getFriends().then(function (friends) {
					results.innerHTML = intro.View.render('friends', {
						list: friends
					});
				});
			},
			newsRoute: function () {
				return intro.Model.getNews().then(function (news) {
					results.innerHTML = intro.View.render('news', {
						list: news.items
					});
				});
			}
		};
		
		return Controller;
	}


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = () => {

		let Model = {
			login: function (appId, perms) {
				return new Promise(function (resolve, reject) {
					VK.init({
						apiId: appId
					});

					VK.Auth.login(function (response) {
						if (response.session) {
							resolve(response);
						} else {
							reject(new Error('Не удалось авторизоваться'));
						}
					}, perms);
				});
			},
			callApi: function (method, params) {
				return new Promise(function (resolve, reject) {
					VK.api(method, params, function (response) {
						if (response.error) {
							reject(new Error(response.error.error_msg));
						} else {
							resolve(response.response);
						}
					});
				});
			},
			getUser: function () {
				return this.callApi('users.get', {});
			},
			getMusic: function () {
				return this.callApi('audio.get', {});
			},
			getFriends: function () {
				return this.callApi('friends.get', {
					fields: 'photo_100'
				});
			},
			getNews: function () {
				return this.callApi('newsfeed.get', {
					filters: 'post',
					count: 20
				});
			}
		};
		
		return Model;

	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = () => {
		let Router = {
			handle: function (route) {
				var routeName = route + 'Route';

				intro.Controller[routeName]();
			}
		};
		
		return Router;


	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = () => {
		let View = {
			render: function (templateName, model) {
				templateName = templateName + 'Template';

				var templateElement = document.getElementById(templateName),
					templateSource = templateElement.innerHTML,
					renderFn = Handlebars.compile(templateSource);

				return renderFn(model);
			}
		};
		
		return View;

	}


/***/ }
/******/ ]);