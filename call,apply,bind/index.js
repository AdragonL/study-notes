/*
 * @Author: DragonL
 * @Date: 2022-05-12 14:02:00
 * @LastEditors: DragonL
 * @LastEditTime: 2022-05-12 14:32:06
 * @Description: 
 */
Function.prototype.mycall = function (context, ...agr) {
    context = context || window
    let key = Symbol("key")
    let fn = this
    context[key] = fn
    let result = context[key](...agr)
    delete context[key]
    return result
}
function isArrayLike(o) {
    // isFinite 检测是否为有限数字
    return o && typeof o === "object" && isFinite(o.length) && o.length >= 0 && o.length === Math.floor(o.length) && o.length < Math.pow(2, 10)
}
Function.prototype.myapply = function (context, agr) {
    context = context || window
    let key = Symbol("key")
    let fn = this
    context[key] = fn
    if (agr) {
        if (!Array.isArray(agr) && !isArrayLike(agr)) {
            throw new TypeError("类型错误")
        } else {
            agr = Array.from(agr)
        }
    }
    let result = context[key](...agr)
    delete context[key]
    return result
}

Function.prototype.mybind = function (context, ...agr) {
    // context = context || window
    let fn = this
    let a = function (...other) {
        const isNew = this instanceof a
        context = isNew ? this : Object(context)
        return fn.mycall(context, ...agr, ...other)
    }

    if (fn.prototype) {
        a.prototype = Object.create(fn.prototype)
    }
    return a
}

//例子
function test(a, b, c) {
    // this.a = 1
    // console.log(a,b,c)
    this.a = a
    this.b = b
    this.c = c

}
let res = test.mybind({}, 1, 2)

let ina = new res(3)
console.log(ina)  // test {a: 1, b: 2, c: 3}