/*
 * @Author: DragonL
 * @Date: 2021-12-22 17:56:54
 * @LastEditors: DragonL
 * @LastEditTime: 2021-12-22 18:14:59
 * @Description: 
 */
var generateParenthesis = function (n) {
    let res = []
    const dp = (left, right, str) => {
        if (str.length === 2 * n) {
              res.push(str)
        }
        if (left > 0) {
            dp(left - 1, right, str + '(')
        }
        if (right > left) {
            dp(left, right - 1, str + ")")
        }
    }
    dp(n, n, "")
    return res
};

console.warn(generateParenthesis(3)) 

