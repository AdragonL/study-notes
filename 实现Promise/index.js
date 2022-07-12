/*
 * @Author: DragonL
 * @Date: 2022-03-04 10:45:00
 * @LastEditors: DragonL
 * @LastEditTime: 2022-05-23 16:06:34
 * @Description: 
 */
const PENDING = 'pending'
const FULFILLED = "fulfilled"
const REJECTED = 'rejected'


function resolvePromise(promise, x, resolve, reject) {
    // 如果相等了，说明return的是自己，抛出类型错误并返回
    if (promise === x) {
        return reject(new TypeError('The promise and the return value are the same'));
    }

    if (typeof x === 'object' || typeof x === 'function') {
        // x 为 null 直接返回，走后面的逻辑会报错
        if (x === null) {
            return resolve(x);
        }

        let then;
        try {
            // 把 x.then 赋值给 then 
            then = x.then;
        } catch (error) {
            // 如果取 x.then 的值时抛出错误 error ，则以 error 为据因拒绝 promise
            return reject(error);
        }

        // 如果 then 是函数
        if (typeof then === 'function') {
            let called = false;
            try {
                then.call(
                    x, // this 指向 x
                    // 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
                    y => {
                        // 如果 resolvePromise 和 rejectPromise 均被调用，
                        // 或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
                        // 实现这条需要前面加一个变量 called
                        if (called) return;
                        called = true;
                        resolvePromise(promise, y, resolve, reject);
                    },
                    // 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
                    r => {
                        if (called) return;
                        called = true;
                        reject(r);
                    });
            } catch (error) {
                // 如果调用 then 方法抛出了异常 error：
                // 如果 resolvePromise 或 rejectPromise 已经被调用，直接返回
                if (called) return;

                // 否则以 error 为据因拒绝 promise
                reject(error);
            }
        } else {
            // 如果 then 不是函数，以 x 为参数执行 promise
            resolve(x);
        }
    } else {
        // 如果 x 不为对象或者函数，以 x 为参数执行 promise
        resolve(x);
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
    onRejectedCallbacks = []
    onResolvedCallbacks = []
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
            reject(reason)
        })
    }

    resolve = (value) => {
        if (this.status === PENDING) {
            this.status = FULFILLED
            this.value = value
            while (this.onResolvedCallbacks.length) {
                this.onResolvedCallbacks.shift()(value)
            }
        }
    }
    reject = (reason) => {
        if (this.status === PENDING) {
            this.status = REJECTED
            this.reason = reason
            while (this.onRejectedCallbacks.length) {
                this.onRejectedCallbacks.shift()(reason)
            }
        }
    }
    then(onFulfilled, onRejected) {

        const realOnFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
        const realOnRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }
        const promise2 = new myPromise((resolve, reject) => {
            const fulfilledMicrotask = () => {
                queueMicrotask(() => {
                    try {
                        const x = realOnFulfilled(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            }

            const rejectedMicrotask = () => {
                queueMicrotask(() => {
                    try {
                        const x = realOnRejected(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })

            }
            if (this.status === FULFILLED) {
                fulfilledMicrotask()
            } else if (this.status === REJECTED) {
                rejectedMicrotask()
            } else if (this.status === PENDING) {
                this.onResolvedCallbacks.push(fulfilledMicrotask)
                this.onRejectedCallbacks.push(rejectedMicrotask)
            }
        })
        return promise2
    }


    catch(onRejected) {
        this.then(undefined, onRejected)
    }

    finally(fn) {
        return this.then((value) => {
            return myPromise.resolve(fn()).then(() => {
                return value
            })
        }, (err) => {
            return myPromise.resolve(fn()).then(() => {
                throw err
            })
        })
    }

    static all(promises) {
        return new myPromise((rs, rj) => {
            let result = []
            if (promises.length === 0) {
                return rs(result)
            }
            let count = 0
            promises.forEach((p, i) => {
                myPromise.resolve(p).then((res) => {
                    result[i] = res
                    count++
                    if (count === promises.length) {
                        return rs(result)
                    }
                }).catch(rj)
            })
        })
    }

    static race(promises) {
        return new myPromise((resolve, reject) => {
            for (let promise of promises) {
                myPromise.reoslve(promise).then(resolve).catch(reject)
            }
        })
    }

    static allSettled(promises) {
        return new myPromise((resolve, reject) => {
            function add(i, elm) {
                result[i] = elm
                elementCount++   //已经完成的个数
                if (elementCount === result.length) {
                    resolve(result)
                }
            }
            let index = 0 //总数量
            for (let p of promises) {
                const currentIndex = index   //当前执行的promise
                p.then((value) => {
                    return add(currentIndex, {
                        status: FULFILLED,
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
            let elementCount = 0  //已经完成的个数
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


// myPromise.resolve().then(() => {
//     console.log(0);
//     return myPromise.resolve(4);
//   }).then((res) => {
//     console.log(res)
//   })

//   myPromise.resolve().then(() => {
//     console.log(1);
//   }).then(() => {
//     console.log(2);
//   }).then(() => {
//     console.log(3);
//   }).then(() => {
//     console.log(5);
//   }).then(() =>{
//     console.log(6);
//   })

//   () => {
//     console.log(0);
//     return myPromise.resolve(4); new Prmoise
//   }
//   () => {
//     console.log(1);
//   }
// 0 

module.exports = myPromise