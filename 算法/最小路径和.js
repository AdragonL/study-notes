/*
 * @Author: DragonL
 * @Date: 2021-12-30 10:05:22
 * @LastEditors: DragonL
 * @LastEditTime: 2021-12-30 10:30:49
 * @Description: 
 */
var minPathSum = function (grid) {
    let dp = new Array(grid.length).fill(0).map(() => new Array(grid[0].length).fill(0))
    dp[0][0] = grid[0][0]
    for (let a = 1; a < grid.length; a++) {
        dp[a][0] = dp[a - 1][0] + grid[a][0]
    }
    for (let b = 1; b < grid[0].length; b++) {
        dp[0][b] = dp[0][b - 1] + grid[0][b]

    }
    for (let i = 1; i < grid.length; i++) {
        for (let j = 1; j < grid[0].length; j++) {
            dp[i][j] = Math.min(dp[i - 1][j] + grid[i][j], dp[i][j - 1] + grid[i][j])
        }
    }
    return dp[grid.length - 1][grid[0].length - 1]
};

console.warn(minPathSum([[1, 2, 3], [4, 5, 6]]))