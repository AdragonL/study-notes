/*
 * @Author: DragonL
 * @Date: 2022-03-21 17:05:38
 * @LastEditors: DragonL
 * @LastEditTime: 2022-03-21 17:36:46
 * @Description: 
 */

//思路就是将第i项为开始，j小于i循环，如果j是小于cur 由于是dp[j]是已经获取了最长子序列的值，所以在这基础上加一 然后与局部max进行比较，最后进行对dp[i]的赋值，
//最后通过math.max比较出dp的最大值
function a(list){
    let n = list.length
    let dp = []
    if(!n)return 0
    dp[0] =1
    for(let i = 1;i<n;i++){
        let cur = list[i]
        let max= 1
        for(let j=0;j<i;j++){
           let prev = list[j]
           if(cur>prev){
               max = Math.max(max,dp[j]+1)
           }
        }
        dp[i] = max
    }
    return Math.max(...dp)
}
 
console.warn(a([10,9,2,5,3,7,101,18]))