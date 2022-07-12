/*
 * @Author: DragonL
 * @Date: 2022-03-30 17:34:04
 * @LastEditors: DragonL
 * @LastEditTime: 2022-03-30 18:00:16
 * @Description: 
 */
function a(str){
    let dp = []
    let n = str.length
    for(let i = 0;i<n;i++){
        dp[i] =[]
        dp[i][i] = true
    }
    let max = 0
    let begin = 0
    for(let j = 1;j<n;j++){
        for(let i = 0;i<j;i++){
            if(str[j]!== str[i]){
                dp[i][j] = false
            }else{
                let a = dp[i+1][j-1]
                if(a === undefined || a=== true){
                    dp[i][j] = true
                }else{
                    dp[i][j] =  false
                }
            }

            if(dp[i][j] === true && j-i >max){
                max = j-i
                begin = i
            }

        }
    }
    return str.substr(begin,max+1)
}
let str = 'babad'
console.warn(a(str))