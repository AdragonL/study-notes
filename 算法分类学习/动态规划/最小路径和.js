/*
 * @Author: DragonL
 * @Date: 2022-03-21 10:16:57
 * @LastEditors: DragonL
 * @LastEditTime: 2022-03-21 10:44:49
 * @Description: 
 */
function a(list){
    let row = list.length
    let col = list[0].length
    let dp = new Array(row).fill(new Array(col))
     dp[0][0] = list[0][0]
    // let i = 0,j = 1,count = 0
    for(let i = 1;i<row;i++){
        dp[i][0] = dp[i-1][0]+list[i][0]
    }
    for(let i = 1;i<col;i++){
        dp[0][i] = dp[0][i-1]+list[0][i]
    }
    for(let i =1;i<row;i++){
        for(let j =1;j<col;j++){
            let cur =list[i][j]
            let FromUp = cur + (dp[i-1][j]!== undefined?dp[i-1][j] :Infinity)
            let FormLeft = cur + (dp[i][j-1]!== undefined?dp[i][j-1] :Infinity)
            dp[i][j] = Math.min(FormLeft,FromUp)
        }
    }
    return dp[row-1][col-1]
}

let list = [
    [1,3,1],
    [1,5,1],
    [4,2,1]
  ]
console.warn(a(list))