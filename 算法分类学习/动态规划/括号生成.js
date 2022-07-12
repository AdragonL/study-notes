/*
 * @Author: DragonL
 * @Date: 2022-03-17 17:16:09
 * @LastEditors: DragonL
 * @LastEditTime: 2022-03-21 08:44:22
 * @Description: 
 */

// 思路:第n对的括号能够括住多少对括号
// 对于dp[1] 只能括住0对括号 所以就是1
// 对于dp[2] 可以括住0对括号和1对括号，所以是2
// 总结的思路就dp[n]的值就是一个新增的括号括住了dp[n-1]的其他情况，然后由于是将dp[n-1]用括号的方式给分隔开所以：
// dp[n] = "("+dp[j]+")"+dp[n-j-1]  //解释：j + q = n-1  ;q = n-q-j   为什么j+q等于n-1因为j+q就是代表有n-1对括号时的情况，然后被新的括号给分割开而已 
function a(n){
    dp = []
    dp[0] = [""]
    dp[1] = ["()"]
    for(let i=2;i<=n;i++){
        let res = []
        for(let j = 0;j<i;j++){
            let inner = dp [j]
            let outer = dp[i-j-1]
            for(let inn of inner){
                for(let out of outer){
                    res.push(`(${inn}${out})`)
                }
            }
        }
        dp[i] = res
    }
    return dp[n]
}

console.warn(a(3))