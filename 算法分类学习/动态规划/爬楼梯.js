/*
 * @Author: DragonL
 * @Date: 2022-03-17 16:59:51
 * @LastEditors: DragonL
 * @LastEditTime: 2022-03-17 17:14:21
 * @Description: 
 */


//思路就是走到n阶的方法就是走到n-1的方法数加上走到n-2的方法数
function a(n){
    let dp = []
    dp[1] =1
    dp[2] =2
    for(let i =3;i<=n;i++){
        dp[i] = dp[i-1]+dp[i-2]
    }
    return dp[n]
    // return a(dp[n-1]) +a(dp[n-2])
   
}

console.warn(a(8))