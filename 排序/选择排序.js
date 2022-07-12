/*
 * @Author: DragonL
 * @Date: 2022-05-23 16:48:18
 * @LastEditors: DragonL
 * @LastEditTime: 2022-06-01 16:48:21
 * @Description: 
 */
function xuanze(list) {
    for (let i = 0; i < list.length; i++) {
        let pos = i
        let j = i + 1
        while (j < list.length) {
            if (list[pos] > list[j]) {
                pos = j
            }
            j++
        }
        [list[pos], list[i]] = [list[i], list[pos]]
    }
    return list
}


console.warn(xuanze([1, 3, 9, 6, 3, 21, 9])) 