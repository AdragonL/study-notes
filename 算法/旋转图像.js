/*
 * @Author: DragonL
 * @Date: 2021-12-29 10:39:59
 * @LastEditors: DragonL
 * @LastEditTime: 2021-12-29 10:56:40
 * @Description: 
 */
var rotate = function (matrix) {
    let n = matrix.length, m = JSON.parse(JSON.stringify(matrix))
    for (let i = n; i--;) {
        for (let j = n; j--;) {
            console.warn(i,j)
            matrix[i][j] = m[n - 1 - j][i]
        }
    }
    return matrix
};
console.warn(rotate([[1, 2, 3], [4, 5, 6], [7, 8, 9]]))
// 0,0 -> 2,0
// 0,1 -> 1,0
// 0,2 -> 0,0
// 1,0 -> 2,1
// 2,0 -> 2,2