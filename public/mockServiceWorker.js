"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
/* eslint-disable */
/* tslint:disable */

/**
 * Mock Service Worker (1.0.0).
 * @see https://github.com/mswjs/msw
 * - Please do NOT modify this file.
 * - Please do NOT serve this file on production.
 */

var INTEGRITY_CHECKSUM = "3d6b9f06410d179a7f7404d4bf4c3c70";
var activeClientIds = new Set();
self.addEventListener("install", function () {
  self.skipWaiting();
});
self.addEventListener("activate", function (event) {
  event.waitUntil(self.clients.claim());
});
self.addEventListener("message", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(event) {
    var clientId, client, allClients, remainingClients;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          clientId = event.source.id;
          if (!(!clientId || !self.clients)) {
            _context.next = 3;
            break;
          }
          return _context.abrupt("return");
        case 3:
          _context.next = 5;
          return self.clients.get(clientId);
        case 5:
          client = _context.sent;
          if (client) {
            _context.next = 8;
            break;
          }
          return _context.abrupt("return");
        case 8:
          _context.next = 10;
          return self.clients.matchAll({
            type: "window"
          });
        case 10:
          allClients = _context.sent;
          _context.t0 = event.data;
          _context.next = _context.t0 === "KEEPALIVE_REQUEST" ? 14 : _context.t0 === "INTEGRITY_CHECK_REQUEST" ? 16 : _context.t0 === "MOCK_ACTIVATE" ? 18 : _context.t0 === "MOCK_DEACTIVATE" ? 21 : _context.t0 === "CLIENT_CLOSED" ? 23 : 27;
          break;
        case 14:
          sendToClient(client, {
            type: "KEEPALIVE_RESPONSE"
          });
          return _context.abrupt("break", 27);
        case 16:
          sendToClient(client, {
            type: "INTEGRITY_CHECK_RESPONSE",
            payload: INTEGRITY_CHECKSUM
          });
          return _context.abrupt("break", 27);
        case 18:
          activeClientIds.add(clientId);
          sendToClient(client, {
            type: "MOCKING_ENABLED",
            payload: true
          });
          return _context.abrupt("break", 27);
        case 21:
          activeClientIds["delete"](clientId);
          return _context.abrupt("break", 27);
        case 23:
          activeClientIds["delete"](clientId);
          remainingClients = allClients.filter(function (client) {
            return client.id !== clientId;
          }); // Unregister itself when there are no more clients
          if (remainingClients.length === 0) {
            self.registration.unregister();
          }
          return _context.abrupt("break", 27);
        case 27:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
self.addEventListener("fetch", function (event) {
  var request = event.request;
  var accept = request.headers.get("accept") || "";

  // Bypass server-sent events.
  if (accept.includes("text/event-stream")) {
    return;
  }

  // Bypass navigation requests.
  if (request.mode === "navigate") {
    return;
  }

  // Opening the DevTools triggers the "only-if-cached" request
  // that cannot be handled by the worker. Bypass such requests.
  if (request.cache === "only-if-cached" && request.mode !== "same-origin") {
    return;
  }

  // Bypass all requests when there are no active clients.
  // Prevents the self-unregistered worked from handling requests
  // after it's been deleted (still remains active until the next reload).
  if (activeClientIds.size === 0) {
    return;
  }

  // Generate unique request ID.
  var requestId = Math.random().toString(16).slice(2);
  event.respondWith(handleRequest(event, requestId)["catch"](function (error) {
    if (error.name === "NetworkError") {
      console.warn('[MSW] Successfully emulated a network error for the "%s %s" request.', request.method, request.url);
      return;
    }

    // At this point, any exception indicates an issue with the original request/response.
    console.error("[MSW] Caught an exception from the \"%s %s\" request (%s). This is probably not a problem with Mock Service Worker. There is likely an additional logging output above.", request.method, request.url, "".concat(error.name, ": ").concat(error.message));
  }));
});
function handleRequest(_x2, _x3) {
  return _handleRequest.apply(this, arguments);
} // Resolve the main client for the given event.
// Client that issues a request doesn't necessarily equal the client
// that registered the worker. It's with the latter the worker should
// communicate with during the response resolving phase.
function _handleRequest() {
  _handleRequest = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(event, requestId) {
    var client, response;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return resolveMainClient(event);
        case 2:
          client = _context3.sent;
          _context3.next = 5;
          return getResponse(event, client, requestId);
        case 5:
          response = _context3.sent;
          // Send back the response clone for the "response:*" life-cycle events.
          // Ensure MSW is active and ready to handle the message, otherwise
          // this message will pend indefinitely.
          if (client && activeClientIds.has(client.id)) {
            _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
              var clonedResponse;
              return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    clonedResponse = response.clone();
                    _context2.t0 = sendToClient;
                    _context2.t1 = client;
                    _context2.t2 = requestId;
                    _context2.t3 = clonedResponse.type;
                    _context2.t4 = clonedResponse.ok;
                    _context2.t5 = clonedResponse.status;
                    _context2.t6 = clonedResponse.statusText;
                    if (!(clonedResponse.body === null)) {
                      _context2.next = 12;
                      break;
                    }
                    _context2.t7 = null;
                    _context2.next = 15;
                    break;
                  case 12:
                    _context2.next = 14;
                    return clonedResponse.text();
                  case 14:
                    _context2.t7 = _context2.sent;
                  case 15:
                    _context2.t8 = _context2.t7;
                    _context2.t9 = Object.fromEntries(clonedResponse.headers.entries());
                    _context2.t10 = clonedResponse.redirected;
                    _context2.t11 = {
                      requestId: _context2.t2,
                      type: _context2.t3,
                      ok: _context2.t4,
                      status: _context2.t5,
                      statusText: _context2.t6,
                      body: _context2.t8,
                      headers: _context2.t9,
                      redirected: _context2.t10
                    };
                    _context2.t12 = {
                      type: "RESPONSE",
                      payload: _context2.t11
                    };
                    (0, _context2.t0)(_context2.t1, _context2.t12);
                  case 21:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2);
            }))();
          }
          return _context3.abrupt("return", response);
        case 8:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _handleRequest.apply(this, arguments);
}
function resolveMainClient(_x4) {
  return _resolveMainClient.apply(this, arguments);
}
function _resolveMainClient() {
  _resolveMainClient = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(event) {
    var client, allClients;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return self.clients.get(event.clientId);
        case 2:
          client = _context4.sent;
          if (!((client === null || client === void 0 ? void 0 : client.frameType) === "top-level")) {
            _context4.next = 5;
            break;
          }
          return _context4.abrupt("return", client);
        case 5:
          _context4.next = 7;
          return self.clients.matchAll({
            type: "window"
          });
        case 7:
          allClients = _context4.sent;
          return _context4.abrupt("return", allClients.filter(function (client) {
            // Get only those clients that are currently visible.
            return client.visibilityState === "visible";
          }).find(function (client) {
            // Find the client ID that's recorded in the
            // set of clients that have registered the worker.
            return activeClientIds.has(client.id);
          }));
        case 9:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return _resolveMainClient.apply(this, arguments);
}
function getResponse(_x5, _x6, _x7) {
  return _getResponse.apply(this, arguments);
}
function _getResponse() {
  _getResponse = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(event, client, requestId) {
    var request, clonedRequest, passthrough, clientMessage, _clientMessage$data, name, message, networkError;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          passthrough = function _passthrough() {
            // Clone the request because it might've been already used
            // (i.e. its body has been read and sent to the client).
            var headers = Object.fromEntries(clonedRequest.headers.entries());

            // Remove MSW-specific request headers so the bypassed requests
            // comply with the server's CORS preflight check.
            // Operate with the headers as an object because request "Headers"
            // are immutable.
            delete headers["x-msw-bypass"];
            return fetch(clonedRequest, {
              headers: headers
            });
          };
          request = event.request;
          clonedRequest = request.clone();
          if (client) {
            _context5.next = 5;
            break;
          }
          return _context5.abrupt("return", passthrough());
        case 5:
          if (activeClientIds.has(client.id)) {
            _context5.next = 7;
            break;
          }
          return _context5.abrupt("return", passthrough());
        case 7:
          if (!(request.headers.get("x-msw-bypass") === "true")) {
            _context5.next = 9;
            break;
          }
          return _context5.abrupt("return", passthrough());
        case 9:
          _context5.t0 = sendToClient;
          _context5.t1 = client;
          _context5.t2 = requestId;
          _context5.t3 = request.url;
          _context5.t4 = request.method;
          _context5.t5 = Object.fromEntries(request.headers.entries());
          _context5.t6 = request.cache;
          _context5.t7 = request.mode;
          _context5.t8 = request.credentials;
          _context5.t9 = request.destination;
          _context5.t10 = request.integrity;
          _context5.t11 = request.redirect;
          _context5.t12 = request.referrer;
          _context5.t13 = request.referrerPolicy;
          _context5.next = 25;
          return request.text();
        case 25:
          _context5.t14 = _context5.sent;
          _context5.t15 = request.bodyUsed;
          _context5.t16 = request.keepalive;
          _context5.t17 = {
            id: _context5.t2,
            url: _context5.t3,
            method: _context5.t4,
            headers: _context5.t5,
            cache: _context5.t6,
            mode: _context5.t7,
            credentials: _context5.t8,
            destination: _context5.t9,
            integrity: _context5.t10,
            redirect: _context5.t11,
            referrer: _context5.t12,
            referrerPolicy: _context5.t13,
            body: _context5.t14,
            bodyUsed: _context5.t15,
            keepalive: _context5.t16
          };
          _context5.t18 = {
            type: "REQUEST",
            payload: _context5.t17
          };
          _context5.next = 32;
          return (0, _context5.t0)(_context5.t1, _context5.t18);
        case 32:
          clientMessage = _context5.sent;
          _context5.t19 = clientMessage.type;
          _context5.next = _context5.t19 === "MOCK_RESPONSE" ? 36 : _context5.t19 === "MOCK_NOT_FOUND" ? 37 : _context5.t19 === "NETWORK_ERROR" ? 38 : 42;
          break;
        case 36:
          return _context5.abrupt("return", respondWithMock(clientMessage.data));
        case 37:
          return _context5.abrupt("return", passthrough());
        case 38:
          _clientMessage$data = clientMessage.data, name = _clientMessage$data.name, message = _clientMessage$data.message;
          networkError = new Error(message);
          networkError.name = name;

          // Rejecting a "respondWith" promise emulates a network error.
          throw networkError;
        case 42:
          return _context5.abrupt("return", passthrough());
        case 43:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return _getResponse.apply(this, arguments);
}
function sendToClient(client, message) {
  return new Promise(function (resolve, reject) {
    var channel = new MessageChannel();
    channel.port1.onmessage = function (event) {
      if (event.data && event.data.error) {
        return reject(event.data.error);
      }
      resolve(event.data);
    };
    client.postMessage(message, [channel.port2]);
  });
}
function sleep(timeMs) {
  return new Promise(function (resolve) {
    setTimeout(resolve, timeMs);
  });
}
function respondWithMock(_x8) {
  return _respondWithMock.apply(this, arguments);
}
function _respondWithMock() {
  _respondWithMock = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(response) {
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return sleep(response.delay);
        case 2:
          return _context6.abrupt("return", new Response(response.body, response));
        case 3:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return _respondWithMock.apply(this, arguments);
}