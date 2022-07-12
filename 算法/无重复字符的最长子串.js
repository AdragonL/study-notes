/*
 * @Author: DragonL
 * @Date: 2021-12-15 16:11:40
 * @LastEditors: DragonL
 * @LastEditTime: 2021-12-15 17:29:09
 * @Description: 
 */
//最脑残的方法
var lengthOfLongestSubstring = function (s) {
    if (s.length === 0 || s.length === 1) return s.length;
    let a = 1

    for (let i = 0; i < s.length; i++) {
        let map = {}
        if (!map[s.charAt(i)]) {
            map[s.charAt(i)] = true
        }
        a = b(i, s, map, a)
    }
    return a
    function b(i, s, map, a) {

        for (let k = i + 1; k < s.length; k++) {
            // console.warn("i", i, "k", k)
            if (!map[s.charAt(k)]) {

                map[s.charAt(k)] = true
                a = a > k - i + 1 ? a : k - i + 1
                // console.warn(a)
            } else {
                return a
            }
        }
        return a
    }

};

//这个差不多也是最sb做法
var lengthOfLongestSubstring1 = function (s) {
    let max = 0
    let arr = []
    for (let a = 0; a < s.length; a++) {
        if (arr.indexOf(s.charAt(a)) === -1) {
            arr.push(s.charAt(a))
            max = Math.max(arr.length, max)

        } else {
            arr.splice(0, arr.indexOf(s.charAt(a))+1)
            arr.push(s.charAt(a))
            max = Math.max(arr.length, max)
        }
        console.warn(arr)
    }
    return max
}



console.warn(lengthOfLongestSubstring1('aabaab!bb'))
// let map = {
//     "b":[0,1,2,3]
// }