/*
 * @Author: DragonL
 * @Date: 2021-12-29 20:46:56
 * @LastEditors: DragonL
 * @LastEditTime: 2021-12-30 10:00:13
 * @Description: 
 */
var uniquePaths = function (m, n) {
    let res = new Array(m).fill(0).map(item=>new Array(n).fill(0))
    // console.warn(res,"A")
    for (let i = 0; i < m; i++) {
        res[i][0] = 1
    }
    for (let i = 0; i < n; i++) {
        res[0][i] = 1
    }
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            res[i][j] = res[i - 1][j] + res[i][j - 1]
        }
    }
    return res[m - 1][n - 1]
};

console.warn(uniquePaths(7, 3))