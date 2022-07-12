/*
 * @Author: DragonL
 * @Date: 2022-02-23 11:49:45
 * @LastEditors: DragonL
 * @LastEditTime: 2022-02-23 13:49:48
 * @Description: 
 */
function a(list, tar) {
    list.sort((a, b) => a - b)
    let f = []
    let min = Infinity
    for (let i = 0; i < list.length; i++) {
        let left = i + 1, right = list.length - 1
        while (left < right) {
            let s = list[left] + list[right] + list[i]
            if (Math.abs(s - tar) < Math.abs(min - tar)) {
                min = s
            }

            if (s < tar) {
                left++
            } else if (s > tar) {
                right--
            } else {
                return s
            }

        }
    }
    return min
}

console.warn(a([-1, 2, 1, -4], 1))