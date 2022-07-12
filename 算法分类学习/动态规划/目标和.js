/*
 * @Author: DragonL
 * @Date: 2022-03-25 15:56:03
 * @LastEditors: DragonL
 * @LastEditTime: 2022-03-29 11:10:24
 * @Description: 
 */
function a(list, target) {
    let dp = []
    let n = list.length
    let sum = 0
    target = Math.abs(target)
    for (let a = 0; a < n; a++) {
        sum += list[a]
    }
    if (Math.abs(target) > Math.abs(sum)) return 0;
    let t = sum*2 + 1
    for (let i = 0; i < n; i++) {
        let row = [];
        for (let j = 0; j < t; j++) {
            row.push(0);
        }
        dp.push(row)
    }

    dp[0][sum + list[0]] = 1
    dp[0][sum -list[0]] +=1
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < t; j++) {
            let l = (j - list[i]) >= 0 ? j - list[i] : 0
            let r = (j + list[i]) < t ? j + list[i] : 0
            dp[i][j] = dp[i - 1][l] + dp[i - 1][r]
        }
    }
    // return dp[0]
    return dp[n-1][target+sum]
}
console.warn(a([1, 1, 1, 1, 1], 3))