/*
 * @Author: DragonL
 * @Date: 2022-03-31 10:58:35
 * @LastEditors: DragonL
 * @LastEditTime: 2022-04-02 15:08:06
 * @Description: 
 */
function a(s, wordDict) {
    let uniq = Array.from(new Set(s.split("")))
    let uniqW = Array.from(new Set(wordDict.join("")))
    if (uniq.length > uniqW.length) {
        return []
    }

    let n = s.length
    if (!n) return []

    let wordSet = new Set(wordDict)
    let dp = []
    dp[0] = ['']

    for (let i = 1; i <= n; i++) {
        let res = []
        for (let j = i; j >= 0; j--) {
            let word = s.slice(j, i)
            if (wordSet.has(word)) {
                if (dp[j] && dp[j].length) {
                    for (let prev of dp[j]) {
                        res.push(prev ? prev + ' ' + word : word)
                    }
                }
            }
        }
        dp[i] = res
    }
    return dp[n]
}
let s = "pineapplepenapple"
let wordDict = ["apple", "pen", "applepen", "pine", "pineapple"]
console.warn(a(s, wordDict))