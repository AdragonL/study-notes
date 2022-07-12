/*
 * @Author: DragonL
 * @Date: 2021-12-23 14:55:58
 * @LastEditors: DragonL
 * @LastEditTime: 2021-12-28 15:42:30
 * @Description: 
 */
var longestValidParentheses = function (s) {
    let stack = []
    let len = s.length
    let list = new Array(len).fill(0)
    for (let i = 0; i < len; i++) {

        if (s.charAt(i) === "(") {
            stack.push(i)
        } else {
            let a = stack.pop()
            console.warn(a, "a")
            if (!a && a !== 0) continue;
            list[a] = 1
            list[i] = 1
            console.warn(list, "sss")
        }
    }
    let count = 0
    let max = 0
    for (let i = 0; i < list.length; i++) {
        list[i] === 0 ? count = 0 : count++
        max = count > max ? count : max
    }
    return list
    // console.warn(list)
};
// console.warn([].pop())
console.warn(longestValidParentheses("()"))