/*
 * @Author: DragonL
 * @Date: 2022-03-21 14:15:06
 * @LastEditors: DragonL
 * @LastEditTime: 2022-03-21 17:02:36
 * @Description: 
 */
//思路是生成一张表 第一个参数是第i项 每个参数之间的差值的一个map可以获取其中的max，第二项的key则是差值 value是该差值出现的次数
function a(list){
    let dp = []
    let n = list.length
    if(!n)return 0
    let max = 0
    dp[n-1] = {0:0}
    for(let i = n-2;i>=0;i--){
        dp[i] = {}
        let cur = list[i]
        for(let j = i+1;j<n;j++){
            let diff = list[j]-cur
            let maxLength = (dp[j][diff]||0)+1
            let maxDiff = Math.max(dp[i][diff]||0,maxLength)
            dp[i][diff] = maxDiff
            max = Math.max(max,maxDiff)
        }
    }
    return max+1
}
let list = [3,6,9,12,15]
console.warn(a(list))