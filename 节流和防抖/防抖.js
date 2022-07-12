/*
 * @Author: DragonL
 * @Date: 2022-05-11 14:23:16
 * @LastEditors: DragonL
 * @LastEditTime: 2022-05-17 14:36:35
 * @Description: 
 */

//防抖
//函数防抖，就是指触发事件后，函数在 n 秒后只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数的执行时间。
function debounce(func, delay) {
    let time = null
    return function () {
        if (time) {
            const args = arguments
            clearTimeout(time)
            time = setTimeout(() => {
                func.apply(this, args)
            }, delay)
        }
    }

}


function debounceImm(func, delay, imm) {
    let time = null
    return function () {
        const that = this
        const args = arguments
        if (time) {
            clearTimeout(time)
            // console.warn("清除", time)
        }
        if (imm) {
            console.warn("time", time)
            const callNow = !time
            time = setTimeout(() => {
                time = null
            }, delay)
            if (callNow) func.apply(that, args)
        } else {
            time = setTimeout(() => {
                func.apply(that, args)
            }, delay)
        }
    }
}




document.getElementById("input").addEventListener("input", debounceImm(() => {
    console.warn("6666")
}, 1000, false))


function debouceItem(func, delay = 300, imm) {
    let time = null
    return function () {
        const that = this
        const args = arguments
        if (time) {
            clearTimeout(time)
        }
        if (imm) {
            let now = !time
            time = setTimeout(() => {
                time = null
            }, delay)
            now && func.apply(that, args)
        } else {
            time = setTimeout(() => {
                func.apply(that, args)
                // time = null
            }, delay)
        }
    }
}