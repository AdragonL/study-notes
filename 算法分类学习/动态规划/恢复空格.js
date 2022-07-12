/*
 * @Author: DragonL
 * @Date: 2022-04-02 16:27:11
 * @LastEditors: DragonL
 * @LastEditTime: 2022-04-02 17:00:50
 * @Description: 
 */
function a(dictionary, sentence) {
    let n = sentence.length
    let dp = [0]
    for (let i = 1; i <= n; i++) {
        let min = dp[i - 1] + 1
        for (let word of dictionary) {
            if (sentence.substring(i - word.length, i) === word) {
                min = Math.min(min, dp[i - word.length])
            }
        }
        dp[i] = min
    }
    return dp[n]
}
let dictionary = ["looked", "just", "like", "her", "brother"]
let sentence = "jesslookedjustliketimherbrother"
console.warn(a(dictionary, sentence))