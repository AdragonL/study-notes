/*
 * @Author: DragonL
 * @Date: 2021-12-30 10:40:06
 * @LastEditors: DragonL
 * @LastEditTime: 2021-12-30 13:37:02
 * @Description: 
 */
var minDistance = function (word1, word2) {
    let a = word1.length
    let b = word2.length
    let dp = new Array(a + 1).fill(0).map(() => new Array(b + 1).fill(0))
    for (let i = 0; i <= a; i++) {
        dp[i][0] = i
    }
    for (let i = 0; i <= b; i++) {
        dp[0][i] = i
    }
    for (let i = 1; i < a + 1; i++) {
        for (let j = 1; j < b + 1; j++) {
            if (word1[i - 1] == word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1]
            } else {
                dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i][j - 1], dp[i - 1][j]) + 1
            }
        }
    }
    return dp[a][b]
};
console.warn(minDistance('horse', 'ros'))