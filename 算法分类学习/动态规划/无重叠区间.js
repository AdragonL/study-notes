/*
 * @Author: DragonL
 * @Date: 2022-03-30 17:10:39
 * @LastEditors: DragonL
 * @LastEditTime: 2022-03-30 17:32:19
 * @Description: 
 */
function a(list){
    let n = list.length
    list.sort((a,b)=>a[0]-b[0])
    let dp = []
    dp[0] = 1
    for(let i = 1;i<n;i++){
        let max = 1
        let [curStart] = list[i]
        for(let j = 0;j<i;j++){
            let [start,end] = list[j]
            if(end <=curStart){
                max = Math.max(max,dp[j]+1)
            }
        }
        dp[i] = max
    }

    return n-Math.max(...dp)
}
let list = [ [1,2], [2,3], [3,4], [1,3] ]
console.warn(a(list))