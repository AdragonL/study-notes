/*
 * @Author: DragonL
 * @Date: 2022-04-02 17:49:43
 * @LastEditors: DragonL
 * @LastEditTime: 2022-04-28 16:48:37
 * @Description: 
 */
function a(list) {
    let dp = new Array(list.length).fill(new Array(list[0].length))
    let i = 0, max = 0
    while (i < list.length) {
        let j = 0
        while (j < list[0].length) {
            if (i === 0 || j === 0) {
                dp[i][j] = list[i][j]
            } else if (list[i][j] === 0) {
                dp[i][j] = 0
            } else {
                dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j - 1], dp[i][j - 1]) + 1
            }
            max = Math.max(dp[i][j], max)
            j++
        }
        i++
    }

    return max *max
}

let list = [
    [1, 0, 1, 0, 0],
    [1, 0, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0],
]
console.warn(a(list))