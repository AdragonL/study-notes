/*
 * @Author: DragonL
 * @Date: 2022-03-04 15:52:21
 * @LastEditors: DragonL
 * @LastEditTime: 2022-05-23 16:19:37
 * @Description: 
 */

//命令：promises-aplus-tests index.js
const FULLFILLED = "fullfilled"
const REJECTED = "rejected"
const PENDING = "pending"

function resolvePromise(promise, x, resolve, reject) {
    if (promise === x) {
        return reject(new TypeError('promise and x is the same'))
    }

    if (typeof x === "function" || typeof x === "object") {
        if (x === null) {
            return resolve(x)
        }

        let then
        try {
            then = x.then
        } catch (error) {
            return reject(error)
        }
        if (typeof then === "function") {
            let called = false
            try {
                then.call(x, y => {
                    if (called) return
                    called = true
                    resolvePromise(promise, y, resolve, reject)
                }, r => {
                    if (called) return
                    called = true
                    reject(r)
                })
            } catch (e) {
                if (called) return
                reject(e)
            }

        } else {
            resolve(x)
        }
    } else {
        resolve(x)
    }
}

class myPromise {
    constructor(executor) {
        try {
            executor(this.resolve, this.reject)
        } catch (e) {
            this.reject(e)
        }
    }
    status = PENDING
    value = undefined
    reason = undefined
    resolveCallback = []
    rejectedCallback = []
    reject = (reason) => {
        if (this.status === PENDING) {
            this.status = REJECTED
            this.reason = reason
            while (this.rejectedCallback.length) {
                this.rejectedCallback.shift()(this.resaon)
            }
        }
    }
    resolve = (value) => {
        if (this.status === PENDING) {
            this.status = FULLFILLED
            this.value = value
            while (this.resolveCallback.length) {
                this.resolveCallback.shift()(this.value)
            }
        }
    }
    static resolve(pa) {
        if (pa instanceof myPromise) {
            return pa
        }
        return new myPromise(resolve => {
            resolve(pa)
        })
    }


    static reject(reason) {
        return new myPromise((resolve, reject) => {
            return reject(reason)
        })
    }
    then(onFullfilled, onRejected) {
        const a = typeof onFullfilled === "function" ? onFullfilled : value => value
        const b = typeof onRejected === "function" ? onRejected : reason => { throw reason }
        let promise2 = new myPromise((resolve, reject) => {
            const resolveQue = () => {
                queueMicrotask(() => {
                    try {
                        let x = a(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            }
            const rejectQue = () => {
                queueMicrotask(() => {
                    try {
                        let x = b(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            }
            if (this.status === FULLFILLED) {
                resolveQue()
            } else if (this.status === REJECTED) {
                rejectQue()
            } else if (this.status === PENDING) {
                this.resolveCallback.push(resolveQue)
                this.rejectedCallback.push(rejectQue)
            }
        })

        return promise2
    }

    catch(reject) {
        return this.then(undefined, reject)
    }

    finally(fn) {
        return this.then((val) => {
            return new myPromise.resolve(fn()).then(() => {
                return val
            })
        }, (err) => {
            return new myPromise.resolve(fn()).then(() => {
                throw err
            })
        })
    }


    static all(promises) {
        return new myPromise((rs, rj) => {
            let result = [], count = 0
            if (promises.length === 0) {
                return rs(result)
            }
            for (let p of promises) {
                myPromise.resolve(p).then(res => {
                    result[count] = res
                    count++
                    if (count === promises.length) {
                        return rs(result)
                    }
                }).catch(e => {
                    rj(e)
                })
            }
        })
    }

    static race(promises) {
        return new myPromise((resolve, reject) => {
            for (let p of promises) {
                myPromise.resolve(p).then(resolve).catch(reject)
            }
        })

    }


    static allSettled(promises) {
        return new myPromise((resolve, reject) => {
            function add(i, obj) {
                result[i] = obj
                finishElm++
                if (finishElm === result.length) {
                    resolve(result)
                }
            }
            let index = 0
            for (let p of promises) {
                let currentIndex = index
                myPromise.resolve(p).then((value) => {
                    return add(currentIndex, {
                        status: FULLFILLED,
                        value
                    })
                }, (reason) => {
                    return add(currentIndex, {
                        status: REJECTED,
                        reason
                    })
                })
                index++
            }
            if (index === 0) {
                resolve([])
                return
            }

            let finishElm = 0
            const result = new Array(index)
        })
    }
}

myPromise.defer = myPromise.deferred = function () {
    let dfd = {};
    dfd.promise = new myPromise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
}
module.exports = myPromise