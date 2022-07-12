/*
 * @Author: DragonL
 * @Date: 2022-03-24 09:49:51
 * @LastEditors: DragonL
 * @LastEditTime: 2022-03-24 10:53:24
 * @Description: 
 */
function a(str1,str2){
    let n1 = str1.length,n2 = str2.length
    let dp = new Array(n1+1).fill(new Array(n2+1).fill(0))
    // console.warn(dp)
    for(let i = 1;i<=n1;i++){
        for(let j=1;j<=n2;j++){
            
            let left = str1[i-1]
            let top = str2[j-1]
            if(left === top){
                dp[i][j] = 1+dp[i-1][j-1]
            }else{
                dp[i][j] = Math.max(dp[i-1][j],dp[i][j-1])
            }
           
        }
        
    }
    // console.warn(start,end)
    return dp[n1][n2]
}
// let str1 = "psnw",str2 = "vozsh"
let str1 = "abcde",str2 = "ace"
console.warn(a(str1,str2))