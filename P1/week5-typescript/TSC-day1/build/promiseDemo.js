"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function upperCaseDelay(msg, delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ original: msg, upperCased: msg.toUpperCase() });
        }, delay);
    });
}
function tester() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield upperCaseDelay("Hello World", 500);
        console.log(res.original, res.upperCased);
    });
}
upperCaseDelay("hello", 500);
//# sourceMappingURL=promiseDemo.js.map