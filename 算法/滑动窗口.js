/*
 * @Author: DragonL
 * @Date: 2022-02-23 13:58:27
 * @LastEditors: DragonL
 * @LastEditTime: 2022-02-23 20:41:40
 * @Description: 
 */

function check(str) {
    let map = {}
    let len = str.length
    let max = 0
    for (let a = 0; a < len; a++) {
        let key = str.charAt(a)
        // console.warn(key,"key")
        let b = a + 1
        let jmax = 1
        map[key] = 1
        while (b < len) {
            let k = str.charAt(b)
            if (map[k]) {
                map = {}
                break
            } else {
                map[k] = 1
                b++
                jmax++
            }
        }
        if (jmax > max) max = jmax
    }
    return max
}

console.warn(check('abcabcbb'))
console.warn(check('bbbbb'))
console.warn(check('pwwkew'))

let on = Symbol("a")
let de = Symbol("a")
console.warn(on )
