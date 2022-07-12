/*
 * @Author: DragonL
 * @Date: 2022-03-31 10:17:57
 * @LastEditors: DragonL
 * @LastEditTime: 2022-03-31 10:51:12
 * @Description: 
 */


// //暴力解法
// function a(str,wordList){
//     let n =wordList.length
//     for(let a =0;a<n;a++){
//        if(str.indexOf(wordList[a]) === -1 ) return false
//     }
//     return true
// }



function b(str, wordList) {
    let n = str.length
    if (!n) return true
    let wordSet = new Set(wordList)
    let dp = []
    dp[0] = true
    for (let i = 0; i <= n; i++) {
        for (let j = i; j >= 0; j--) {
            let word = str.slice(j, i)
            if (wordSet.has(word) && dp[j]) {
                dp[i] = true
                break
            }
        }
    }
    // return dp
    return !!dp[n]
}

let s = "leetcode", wordDict = ["leet", "code"]
console.warn(b(s, wordDict))