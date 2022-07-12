/*
 * @Author: DragonL
 * @Date: 2022-05-11 14:23:08
 * @LastEditors: DragonL
 * @LastEditTime: 2022-05-17 10:35:57
 * @Description: 
 */

// 节流
// 节流就是限制一个函数在一段时间内只能执行一次，过了这段时间，在下一段时间又可以执行一次。

function throttle(fn, delay = 1000, imm) {
    let time = null
    return function () {
        const that = this
        const args = arguments
        if (time) {
            return
        }
        if (imm) {
            let now = !time
            time = setTimeout(() => {
                time = null
            }, delay)
            now && fn.apply(that, args)

        } else {
            time = setTimeout(() => {
                fn.apply(that, args)
                time = null
            }, delay)
        }

    }
}


document.getElementById("input").addEventListener("input", throttle(() => {
    console.warn("6666")
}, 1000, true))



function throttleTest(fn, delay = 1000, imm) {
    let timer = null
    return function () {
        const that = this
        const args = arguments
        if (timer) {
            // clearTimeout(timer)
            return
        }
        if (imm) {
            const now = !timer
            timer = setTimeout(() => {
                timer = null
            }, delay)
            now && fn.call(that, ...args)
        } else {
            timer = setTimeout(() => {
                fn.call(that, ...args)
                timer = null
            }, delay)
        }
    }
}