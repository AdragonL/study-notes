/*
 * @Author: DragonL
 * @Date: 2022-05-11 15:50:06
 * @LastEditors: DragonL
 * @LastEditTime: 2022-05-19 10:57:55
 * @Description: 
 */

//深拷贝普通版    没有对特殊类型处理 例如Function RegExp Date 无法解决相互引用问题
function deepClone(origin, target) {
    var toStr = Object.prototype.toString, arrType = '[object Array]', target = target || {}
    for (let key in origin) {
        if (origin.hasOwnProperty(key)) {
            if (typeof origin[key] === 'object' && origin[key] !== null) {
                if (toStr.call(origin[key]) === arrType) {
                    target[key] = []
                } else {
                    target[key] = {}
                }
                deepClone(origin[key], target[key])
            } else {
                target[key] = origin[key]
            }
        }
    }
    return target
}
function isObject(obj) {
    return typeof obj === "object" && obj !== null
}
// let map = new WeakMap()
//完整版
//支持Function,RegExp,Date,Error,Map,Set类型
function deepCloneReal(origin, map) {
    let dist;
    map = map || new WeakMap();
    if (map.has(origin)) {
        return map.get(origin)
    } else if (origin instanceof Date) {
        dist = new Date(origin)
    } else if (origin instanceof RegExp) {
        dist = new RegExp(origin.source, origin.flags)
    } else if (origin instanceof Map) {
        dist = new Map()
        for (let [key, value] of origin) {
            // console.warn(i, "i")
            dist.set(deepCloneReal(key, map), deepCloneReal(value, map))
        }
    } else if (origin instanceof Set) {
        dist = new Set()
        for (let i of origin) {
            // console.warn(i,"i")
            dist.add(deepCloneReal(i, map))
        }
    } else if (Array.isArray(origin)) {
        dist = []
    } else if (origin instanceof Error) {
        // console.warn(origin.message)
        dist = new Error(origin.message)
        dist.stack = origin.stack
    } else if (isObject(origin)) {
        dist = {}
    } else if (typeof origin === "function") {
        dist = new Function('return' + origin.toString())()
        // console.warn(typeof dist)
    } else {
        return origin
    }
    console.warn(origin, "origin")
    map.set(origin, dist)
    for (let i in origin) {
        if (origin.hasOwnProperty(i)) {
            dist[i] = deepCloneReal(origin[i], map)
        }
    }
    // console.warn(map)
    return dist

}

let map = new Map()
map.set("aa", "bbb")
map.set("bb",{
    a:1,g:[3,5,7,5],

})
let a = {
    b: 1,
    d: [2, 3, 4, 5],
    c: {
        d: 1,
        func: () => {

        },
        ste: new Set([1]),
        mao: map,
        err: new Error("我错了")
    }
}

let f = {
    b: 1,
    c: {
        d: 1,
        f: [2, 4, 5]
    }
}
let b = {
    b: 1,
    d: [2, 3, 4, 5],
}

a.b = b
b.a = a


// for(let i of a){
//     console.warn(i)
// }
let deepA = deepCloneReal(map)
let deepB = Object.assign({}, f) // 浅拷贝
let deepC = Object.create(f)
let deepD = new Object(f)
// let deepC = JSON.parse(JSON.stringify(a))   //函数类型会直接干没 对于复杂类型会变成是空对象   深拷贝 
deepD.b = 2
deepD.c.d = 5
// deepC.d = 6
deepD.c.f[2] = 9
// deepA.c.d = 2
deepA.get("bb").g[2] = 9
// deepA.c.mao.set("gg", "fff")
// deepA.c.err.message="good"
console.warn(deepA)
console.warn(a)



// console.warn(typeof [1, 2, 3] === "object")
console.warn(new WeakMap().toString())
// console.warn(new Set().toString())


 //origin表示待拷贝对象，target表示目标对象
 function deepClone(origin, target) {
    var target = target || {}, //容错处理，防止用户不传target值
        toStr = Object.prototype.toString,
        arrAtr = "[object Array]";
    for (var prop in origin) {
        //遍历对象
        if (origin.hasOwnProperty(prop)) {
            //防止拿到原型链属性
            if (
                origin[prop] !== "null" &&
                typeof origin[prop] == "object"
            ) {
                //判断是不是原始值
                target[prop] =
                    toStr.call(origin[prop]) == arrAtr ? [] : {}; //建立相对应的数组或对象
                deepClone(origin[prop], target[prop]); //递归，为了拿到引用值里面还有引用值
            } else {
                target[prop] = origin[prop]; //是原始值，直接拷贝
            }
        }
    }
    return target;
}