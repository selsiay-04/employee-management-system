/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/leaves/route";
exports.ids = ["app/api/leaves/route"];
exports.modules = {

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fleaves%2Froute&page=%2Fapi%2Fleaves%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fleaves%2Froute.ts&appDir=C%3A%5CUsers%5CAdmin%5Cems%5Cems-next%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CAdmin%5Cems%5Cems-next&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fleaves%2Froute&page=%2Fapi%2Fleaves%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fleaves%2Froute.ts&appDir=C%3A%5CUsers%5CAdmin%5Cems%5Cems-next%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CAdmin%5Cems%5Cems-next&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Admin_ems_ems_next_app_api_leaves_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/leaves/route.ts */ \"(rsc)/./app/api/leaves/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/leaves/route\",\n        pathname: \"/api/leaves\",\n        filename: \"route\",\n        bundlePath: \"app/api/leaves/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Admin\\\\ems\\\\ems-next\\\\app\\\\api\\\\leaves\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_Admin_ems_ems_next_app_api_leaves_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZsZWF2ZXMlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmxlYXZlcyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmxlYXZlcyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNBZG1pbiU1Q2VtcyU1Q2Vtcy1uZXh0JTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNBZG1pbiU1Q2VtcyU1Q2Vtcy1uZXh0JmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNXO0FBQ3hGO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJDOlxcXFxVc2Vyc1xcXFxBZG1pblxcXFxlbXNcXFxcZW1zLW5leHRcXFxcYXBwXFxcXGFwaVxcXFxsZWF2ZXNcXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2xlYXZlcy9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2xlYXZlc1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvbGVhdmVzL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcVXNlcnNcXFxcQWRtaW5cXFxcZW1zXFxcXGVtcy1uZXh0XFxcXGFwcFxcXFxhcGlcXFxcbGVhdmVzXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fleaves%2Froute&page=%2Fapi%2Fleaves%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fleaves%2Froute.ts&appDir=C%3A%5CUsers%5CAdmin%5Cems%5Cems-next%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CAdmin%5Cems%5Cems-next&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(rsc)/./app/api/leaves/route.ts":
/*!*********************************!*\
  !*** ./app/api/leaves/route.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST),\n/* harmony export */   PUT: () => (/* binding */ PUT)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/data */ \"(rsc)/./lib/data.ts\");\n\n\nasync function GET() {\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(_lib_data__WEBPACK_IMPORTED_MODULE_1__.leaves);\n}\nasync function POST(request) {\n    const body = await request.json();\n    const newLeave = {\n        id: Math.random().toString(36).substring(7),\n        ...body,\n        status: 'Pending',\n        createdAt: new Date().toISOString()\n    };\n    _lib_data__WEBPACK_IMPORTED_MODULE_1__.leaves.unshift(newLeave); // Add to the beginning\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(newLeave);\n}\nasync function PUT(request) {\n    const { id, status } = await request.json();\n    const index = _lib_data__WEBPACK_IMPORTED_MODULE_1__.leaves.findIndex((l)=>l.id === id);\n    if (index !== -1) {\n        _lib_data__WEBPACK_IMPORTED_MODULE_1__.leaves[index].status = status;\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(_lib_data__WEBPACK_IMPORTED_MODULE_1__.leaves[index]);\n    }\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        error: 'Not found'\n    }, {\n        status: 404\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2xlYXZlcy9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUEyQztBQUNPO0FBRTNDLGVBQWVFO0lBQ3BCLE9BQU9GLHFEQUFZQSxDQUFDRyxJQUFJLENBQUNGLDZDQUFNQTtBQUNqQztBQUVPLGVBQWVHLEtBQUtDLE9BQWdCO0lBQ3pDLE1BQU1DLE9BQU8sTUFBTUQsUUFBUUYsSUFBSTtJQUMvQixNQUFNSSxXQUF5QjtRQUM3QkMsSUFBSUMsS0FBS0MsTUFBTSxHQUFHQyxRQUFRLENBQUMsSUFBSUMsU0FBUyxDQUFDO1FBQ3pDLEdBQUdOLElBQUk7UUFDUE8sUUFBUTtRQUNSQyxXQUFXLElBQUlDLE9BQU9DLFdBQVc7SUFDbkM7SUFDQWYsNkNBQU1BLENBQUNnQixPQUFPLENBQUNWLFdBQVcsdUJBQXVCO0lBQ2pELE9BQU9QLHFEQUFZQSxDQUFDRyxJQUFJLENBQUNJO0FBQzNCO0FBRU8sZUFBZVcsSUFBSWIsT0FBZ0I7SUFDeEMsTUFBTSxFQUFFRyxFQUFFLEVBQUVLLE1BQU0sRUFBRSxHQUFHLE1BQU1SLFFBQVFGLElBQUk7SUFDekMsTUFBTWdCLFFBQVFsQiw2Q0FBTUEsQ0FBQ21CLFNBQVMsQ0FBQ0MsQ0FBQUEsSUFBS0EsRUFBRWIsRUFBRSxLQUFLQTtJQUM3QyxJQUFJVyxVQUFVLENBQUMsR0FBRztRQUNoQmxCLDZDQUFNLENBQUNrQixNQUFNLENBQUNOLE1BQU0sR0FBR0E7UUFDdkIsT0FBT2IscURBQVlBLENBQUNHLElBQUksQ0FBQ0YsNkNBQU0sQ0FBQ2tCLE1BQU07SUFDeEM7SUFDQSxPQUFPbkIscURBQVlBLENBQUNHLElBQUksQ0FBQztRQUFFbUIsT0FBTztJQUFZLEdBQUc7UUFBRVQsUUFBUTtJQUFJO0FBQ2pFIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXEFkbWluXFxlbXNcXGVtcy1uZXh0XFxhcHBcXGFwaVxcbGVhdmVzXFxyb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcic7XG5pbXBvcnQgeyBsZWF2ZXMsIExlYXZlUmVxdWVzdCB9IGZyb20gJ0AvbGliL2RhdGEnO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKCkge1xuICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24obGVhdmVzKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxdWVzdDogUmVxdWVzdCkge1xuICBjb25zdCBib2R5ID0gYXdhaXQgcmVxdWVzdC5qc29uKCk7XG4gIGNvbnN0IG5ld0xlYXZlOiBMZWF2ZVJlcXVlc3QgPSB7XG4gICAgaWQ6IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cmluZyg3KSxcbiAgICAuLi5ib2R5LFxuICAgIHN0YXR1czogJ1BlbmRpbmcnLFxuICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICB9O1xuICBsZWF2ZXMudW5zaGlmdChuZXdMZWF2ZSk7IC8vIEFkZCB0byB0aGUgYmVnaW5uaW5nXG4gIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihuZXdMZWF2ZSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQVVQocmVxdWVzdDogUmVxdWVzdCkge1xuICBjb25zdCB7IGlkLCBzdGF0dXMgfSA9IGF3YWl0IHJlcXVlc3QuanNvbigpO1xuICBjb25zdCBpbmRleCA9IGxlYXZlcy5maW5kSW5kZXgobCA9PiBsLmlkID09PSBpZCk7XG4gIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICBsZWF2ZXNbaW5kZXhdLnN0YXR1cyA9IHN0YXR1cztcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24obGVhdmVzW2luZGV4XSk7XG4gIH1cbiAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdOb3QgZm91bmQnIH0sIHsgc3RhdHVzOiA0MDQgfSk7XG59XG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwibGVhdmVzIiwiR0VUIiwianNvbiIsIlBPU1QiLCJyZXF1ZXN0IiwiYm9keSIsIm5ld0xlYXZlIiwiaWQiLCJNYXRoIiwicmFuZG9tIiwidG9TdHJpbmciLCJzdWJzdHJpbmciLCJzdGF0dXMiLCJjcmVhdGVkQXQiLCJEYXRlIiwidG9JU09TdHJpbmciLCJ1bnNoaWZ0IiwiUFVUIiwiaW5kZXgiLCJmaW5kSW5kZXgiLCJsIiwiZXJyb3IiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/leaves/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/data.ts":
/*!*********************!*\
  !*** ./lib/data.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   attendance: () => (/* binding */ attendance),\n/* harmony export */   leaves: () => (/* binding */ leaves),\n/* harmony export */   payroll: () => (/* binding */ payroll),\n/* harmony export */   users: () => (/* binding */ users)\n/* harmony export */ });\n// lib/data.ts\n// In-memory array (clears on server restart)\nconst leaves = [\n    {\n        id: '1',\n        email: 'admin@example.com',\n        leaveType: 'Annual',\n        fromDate: '2024-03-27',\n        toDate: '2024-03-29',\n        reason: 'Family event',\n        status: 'Approved',\n        createdAt: new Date().toISOString()\n    }\n];\nconst users = [\n    {\n        uid: '123',\n        firstName: 'ADMIN',\n        lastName: 'USER',\n        email: 'admin@example.com',\n        role: 'admin',\n        department: 'Management',\n        designation: 'HR Manager',\n        phone: '+1 234-567-8900',\n        location: 'Head Office',\n        employeeId: 'EMP-ADMIN01',\n        joinDate: '2023-01-01'\n    }\n];\nconst attendance = [\n    {\n        id: 'a1',\n        email: 'admin@example.com',\n        date: '2024-03-26',\n        clockIn: '09:00',\n        clockOut: '17:00',\n        createdAt: new Date().toISOString()\n    }\n];\nconst payroll = [\n    {\n        id: 'p1',\n        email: 'admin@example.com',\n        month: '2024-03',\n        basicPay: 5000,\n        allowances: 500,\n        deductions: 200,\n        netPay: 5300,\n        status: 'Deposited',\n        createdAt: new Date().toISOString()\n    }\n];\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGF0YS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsY0FBYztBQWVkLDZDQUE2QztBQUN0QyxNQUFNQSxTQUF5QjtJQUNwQztRQUNFQyxJQUFJO1FBQ0pDLE9BQU87UUFDUEMsV0FBVztRQUNYQyxVQUFVO1FBQ1ZDLFFBQVE7UUFDUkMsUUFBUTtRQUNSQyxRQUFRO1FBQ1JDLFdBQVcsSUFBSUMsT0FBT0MsV0FBVztJQUNuQztDQUNELENBQUM7QUFFSyxNQUFNQyxRQUFRO0lBQ25CO1FBQ0VDLEtBQUs7UUFDTEMsV0FBVztRQUNYQyxVQUFVO1FBQ1ZaLE9BQU87UUFDUGEsTUFBTTtRQUNOQyxZQUFZO1FBQ1pDLGFBQWE7UUFDYkMsT0FBTztRQUNQQyxVQUFVO1FBQ1ZDLFlBQVk7UUFDWkMsVUFBVTtJQUNaO0NBQ0QsQ0FBQztBQUVLLE1BQU1DLGFBQWE7SUFDeEI7UUFDRXJCLElBQUk7UUFDSkMsT0FBTztRQUNQcUIsTUFBTTtRQUNOQyxTQUFTO1FBQ1RDLFVBQVU7UUFDVmpCLFdBQVcsSUFBSUMsT0FBT0MsV0FBVztJQUNuQztDQUNELENBQUM7QUFFSyxNQUFNZ0IsVUFBVTtJQUNyQjtRQUNFekIsSUFBSTtRQUNKQyxPQUFPO1FBQ1B5QixPQUFPO1FBQ1BDLFVBQVU7UUFDVkMsWUFBWTtRQUNaQyxZQUFZO1FBQ1pDLFFBQVE7UUFDUnhCLFFBQVE7UUFDUkMsV0FBVyxJQUFJQyxPQUFPQyxXQUFXO0lBQ25DO0NBQ0QsQ0FBQyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxBZG1pblxcZW1zXFxlbXMtbmV4dFxcbGliXFxkYXRhLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGxpYi9kYXRhLnRzXG5cbmV4cG9ydCB0eXBlIExlYXZlU3RhdHVzID0gJ1BlbmRpbmcnIHwgJ0FwcHJvdmVkJyB8ICdSZWplY3RlZCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGVhdmVSZXF1ZXN0IHtcbiAgaWQ6IHN0cmluZztcbiAgZW1haWw6IHN0cmluZztcbiAgbGVhdmVUeXBlOiBzdHJpbmc7XG4gIGZyb21EYXRlOiBzdHJpbmc7XG4gIHRvRGF0ZTogc3RyaW5nO1xuICByZWFzb246IHN0cmluZztcbiAgc3RhdHVzOiBMZWF2ZVN0YXR1cztcbiAgY3JlYXRlZEF0OiBzdHJpbmc7XG59XG5cbi8vIEluLW1lbW9yeSBhcnJheSAoY2xlYXJzIG9uIHNlcnZlciByZXN0YXJ0KVxuZXhwb3J0IGNvbnN0IGxlYXZlczogTGVhdmVSZXF1ZXN0W10gPSBbXG4gIHtcbiAgICBpZDogJzEnLFxuICAgIGVtYWlsOiAnYWRtaW5AZXhhbXBsZS5jb20nLFxuICAgIGxlYXZlVHlwZTogJ0FubnVhbCcsXG4gICAgZnJvbURhdGU6ICcyMDI0LTAzLTI3JyxcbiAgICB0b0RhdGU6ICcyMDI0LTAzLTI5JyxcbiAgICByZWFzb246ICdGYW1pbHkgZXZlbnQnLFxuICAgIHN0YXR1czogJ0FwcHJvdmVkJyxcbiAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKVxuICB9XG5dO1xuXG5leHBvcnQgY29uc3QgdXNlcnMgPSBbXG4gIHtcbiAgICB1aWQ6ICcxMjMnLFxuICAgIGZpcnN0TmFtZTogJ0FETUlOJyxcbiAgICBsYXN0TmFtZTogJ1VTRVInLFxuICAgIGVtYWlsOiAnYWRtaW5AZXhhbXBsZS5jb20nLFxuICAgIHJvbGU6ICdhZG1pbicsXG4gICAgZGVwYXJ0bWVudDogJ01hbmFnZW1lbnQnLFxuICAgIGRlc2lnbmF0aW9uOiAnSFIgTWFuYWdlcicsXG4gICAgcGhvbmU6ICcrMSAyMzQtNTY3LTg5MDAnLFxuICAgIGxvY2F0aW9uOiAnSGVhZCBPZmZpY2UnLFxuICAgIGVtcGxveWVlSWQ6ICdFTVAtQURNSU4wMScsXG4gICAgam9pbkRhdGU6ICcyMDIzLTAxLTAxJ1xuICB9XG5dO1xuXG5leHBvcnQgY29uc3QgYXR0ZW5kYW5jZSA9IFtcbiAge1xuICAgIGlkOiAnYTEnLFxuICAgIGVtYWlsOiAnYWRtaW5AZXhhbXBsZS5jb20nLFxuICAgIGRhdGU6ICcyMDI0LTAzLTI2JyxcbiAgICBjbG9ja0luOiAnMDk6MDAnLFxuICAgIGNsb2NrT3V0OiAnMTc6MDAnLFxuICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpXG4gIH1cbl07XG5cbmV4cG9ydCBjb25zdCBwYXlyb2xsID0gW1xuICB7XG4gICAgaWQ6ICdwMScsXG4gICAgZW1haWw6ICdhZG1pbkBleGFtcGxlLmNvbScsXG4gICAgbW9udGg6ICcyMDI0LTAzJyxcbiAgICBiYXNpY1BheTogNTAwMCxcbiAgICBhbGxvd2FuY2VzOiA1MDAsXG4gICAgZGVkdWN0aW9uczogMjAwLFxuICAgIG5ldFBheTogNTMwMCxcbiAgICBzdGF0dXM6ICdEZXBvc2l0ZWQnLFxuICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpXG4gIH1cbl07XG4iXSwibmFtZXMiOlsibGVhdmVzIiwiaWQiLCJlbWFpbCIsImxlYXZlVHlwZSIsImZyb21EYXRlIiwidG9EYXRlIiwicmVhc29uIiwic3RhdHVzIiwiY3JlYXRlZEF0IiwiRGF0ZSIsInRvSVNPU3RyaW5nIiwidXNlcnMiLCJ1aWQiLCJmaXJzdE5hbWUiLCJsYXN0TmFtZSIsInJvbGUiLCJkZXBhcnRtZW50IiwiZGVzaWduYXRpb24iLCJwaG9uZSIsImxvY2F0aW9uIiwiZW1wbG95ZWVJZCIsImpvaW5EYXRlIiwiYXR0ZW5kYW5jZSIsImRhdGUiLCJjbG9ja0luIiwiY2xvY2tPdXQiLCJwYXlyb2xsIiwibW9udGgiLCJiYXNpY1BheSIsImFsbG93YW5jZXMiLCJkZWR1Y3Rpb25zIiwibmV0UGF5Il0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/data.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fleaves%2Froute&page=%2Fapi%2Fleaves%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fleaves%2Froute.ts&appDir=C%3A%5CUsers%5CAdmin%5Cems%5Cems-next%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CAdmin%5Cems%5Cems-next&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();