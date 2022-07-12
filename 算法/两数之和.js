/*
 * @Author: DragonL
 * @Date: 2021-12-15 14:14:35
 * @LastEditors: DragonL
 * @LastEditTime: 2021-12-15 14:45:37
 * @Description: 
 */


function a(list, target) {
    let length = list.length
    for (let i = 0; i < length - 1; i++) {
        let a = list.indexOf(target - list[i], i + 1)
        if (a !== -1) {
            return [i, a]
        }
    }
    // console.warn(map)
}

console.warn(a([2, 7, 11, 15], 9))
console.warn(a([3, 2, 4], 6))
console.warn(a([2, 5, 5, 11], 10))