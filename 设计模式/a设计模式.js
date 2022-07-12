/*
 * @Author: DragonL
 * @Date: 2022-01-12 20:41:43
 * @LastEditors: DragonL
 * @LastEditTime: 2022-06-20 10:21:48
 * @Description: 
 */
//策略模式  //分开可以独立不会耦合在一起
var check = {
    checkName: function (val) {
        return val === "lol"
    },
    checkLevel: function (val) {
        return val >= 1
    },
    checkType: function (val) {
        return typeof val === "object"
    }
}

class vate {
    constructor() {
        this.cache = []
    }
    add(val, method) {
        this.cache.push(function () {
            return check[method](val)
        })
    }

    go() {
        for (let i = 0; i < this.cache.length; i++) {
            let result = this.cache[i]()
            if (!result) return false
        }
        return true
    }
}


//发布-订阅模式
function emit() {
    this.emit = {}
    this.on = function (name, cb) {
        if (this.emit[name]) {
            this.emit[name].push(cb)
        } else {
            this.emit[name] = [cb]
        }
    }
    this.trigger = function (name, ...args) {
        if (this.emit[name]) {
            for (let i = 0; i < this.emit[name].length; i++) {
                this.emit[name][i](...args)
            }
        }
    }
}
let a = new emit()

//装饰器模式  可以通过传入的对象增强对象的能力
// 装饰器的语法其实跟装饰器模式是差不多的
// 例子:
// @decorator    es7提出 目前还是提案阶段 如果使用需要引入babel的模块transform-decorators-legacy
// class A {}

// // 等同于

// class A {}
// A = decorator(A) || A;
function oldPlay() {
    this.play = "lol"
}

function newPlay(obj) {
    this.old = obj.play
    this.newP = "other"
    this.play = function () {
        console.warn(this.old);
        console.warn(this.newP);
    }
}
let oldP = new oldPlay()
let newP = new newPlay(oldP)
newP.play()   //通过newPlay这个类来增强了oldPlay的play的能力


//代理模式   原理就是自己的事情去拜托被人做    有点跟装饰器差不多
var proxy = (function () {
    let imgsrc = document.createElement("img")
    document.body.appendChild(imgsrc)
    return {
        setSrc: function (src) {
            imgsrc.src = src
        }
    }
})()

var proxyImage = (function () {
    let img = new Image()
    img.onload = function () {
        proxy.setSrc(this.src)
    }
    return {
        setSrc: function (src) {
            proxy.setSrc("loading.jpg")
            img.src = src
        }
    }
})()
proxyImage.setSrc("内容.jpg")

//装饰器模式和代理模式的区别 ：装饰器是你很柔弱，你保护不了女朋友，所以你通过健身，拥有一身肌肉。代理模式是，
//你柔弱，然后花钱请了个有八块腹肌的保镖。但是这个保镖可以决定保护不保护你女朋友。


//单例模式
//保证全局的单一性 一个类就只有一个实例 ,例子:vuex,是强绑定的关系
let single = (function () {
    let instance;
    return function (name) {
        if (instance) {
            return instance
        }
        this.name = name
        instance = this
        return instance
    }
})()

single.prototype.getName = function () {
    return this.name
}

let one = new single("aaaa")
let two = new single("bbbb")
console.warn(one === two) //true
console.warn(one.getName()) //aaaa
console.warn(two.getName()) //aaaa


//观察者模式
class Subject {
    constructor() {
        this.state = 0
        this.observers = []
    }

    setState(state) {
        this.state = state
        this.observers.forEach(observer => {
            observer.update()
        })
    }

    attach(observer) {
        this.observers.push(observer)
    }
}


class Obsever {
    constructor(name, subject) {
        this.name = name
        this.subject = subject
        this.subject.attach(this)
    }

    update() {
        console.warn("触发更新了")
    }
}

let a = new Subject()
let b = new Obsever("bb", a)
let c = new Obsever("cc", a)
let d = new Obsever("dd", a)


a.setState(2)

//发布订阅模式和观察者模式看似很像,但是不是一个概念
//观察者模式:就是有两个角色 :观察者和被观察者;观察者对被观察者进行数据的观测,一旦数据发生变化则更改自己对应的数据
//发布订阅模式:有三个角色:中间的发布平台,订阅者和发布者,订阅者可以订阅相关的主题,当发布者在平台发布数据时,平台会给订阅者发布数据更改的信息
//观察者模式是松耦合的模式；而发布订阅这是解耦的模式 因为中间有一个平台；


//事件总线
class Event {
    constructor() {
        this.emitd = {}
    }
    //订阅
    on(name, cb) {
        if (this.emitd[name]) {
            this.emitd[name].push(cb)
        } else {
            this.emitd[name] = [cb]
        }
    }
    //发布
    emit(name) {
        this.emitd[name].forEach(cb => {
            cb()
        })
    }
    //一次
    once(name, cb) {
        let fn = () => {
            cb()
            this.off(name, fn)
        }
        if (this.emitd[name]) {
            this.emitd[name].push(fn)
        } else {
            this.emitd[name] = [fn]
        }
    }
    //取消
    off(name, cb) {
        if (!name && !cb) {
            this.emitd = {}
        } else if (name && !cb) {
            this.emitd[name] = []
        } else {
            for (let i = 0; i < this.emitd[name].length; i++) {
                if (this.emitd[name][i] === cb) {
                    this.emitd[name].splice(i, 1)
                }
            }
        }
    }
}

let a = new Event()
a.once("ccc", () => {
    console.warn("66")
})
a.on("ggg",()=>{
    console.warn("on")
})
a.emit("ccc")
a.emit("ccc")
a.emit("ggg")
a.emit("ggg")

