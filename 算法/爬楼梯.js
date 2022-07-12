/*
 * @Author: DragonL
 * @Date: 2021-12-30 10:32:36
 * @LastEditors: DragonL
 * @LastEditTime: 2021-12-30 10:36:36
 * @Description: 
 */
var climbStairs = function (n) {
    let dp = new Array(n).fill(0)
    // if(n<3)return n
    dp[0] = 1
    dp[1] = 2
    for (let a = 2; a < n; a++) {
        dp[a] = dp[a - 1] + dp[a - 2]
    }
    return dp[n - 1]
};

console.warn(climbStairs(2))