/*
 * @Author: DragonL
 * @Date: 2022-03-21 11:14:16
 * @LastEditors: DragonL
 * @LastEditTime: 2022-03-21 11:58:37
 * @Description: 
 */
function a(list){
    let height = list.length
    if(!height) return 0
   let dp = new Array(height).fill(0).map((_,i)=>[...list[i]])
    for(let i =height-2;i>=0;i--){
        for(let j=0;j<=i;j++){
            dp[i][j] +=Math.min(dp[i+1][j],dp[i+1][j+1])
        }
    }
    return dp[0][0]
}
let list = [[-1],[2,3],[1,-1,-3]]
console.warn(a(list))