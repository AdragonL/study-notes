/*
 * @Author: DragonL
 * @Date: 2022-03-21 13:45:28
 * @LastEditors: DragonL
 * @LastEditTime: 2022-03-21 14:13:39
 * @Description: 
 */
// 思路是是首先当dp[0]是返回1，因为会返回空字符串，然后当需要拿出一个字符传来转码的时候只要不是0就可以转化，
// 还有一种情况是当拿出两个字符来转码的时候需要保证两个字符转变成是数字是小于等于26；而dp的含义则是有n个字符的时候的转化数


function a(str){
    let n = str.length
    if(!n)return 0
    dp = new Array(n+1).fill(0)
    dp[0] = 1
    for(let i = 1;i<=str.length;i++){
        if(str[i-1] != '0'){
            dp[i] += dp[i-1] 
        }
        if(i>1 && str[i-2] !='0' &&(str[i-2]-'0')*10+(str[i-1]-'0')<=26){
            dp[i] += dp[i-2]
        }
        
    }
    return dp[n]
}
console.warn(a('12'))