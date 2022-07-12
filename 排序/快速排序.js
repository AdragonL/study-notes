/*
 * @Author: DragonL
 * @Date: 2022-05-23 17:07:46
 * @LastEditors: DragonL
 * @LastEditTime: 2022-05-23 17:18:54
 * @Description: 
 */
function quickSort(list) {
    if (list.length <= 1) return list
    let middleLen = Math.floor(list.length / 2)
    let middle = list.splice(middleLen, 1)[0]
    let left = [], right = []
    for (let i = 0; i < list.length; i++) {
        if (list[i] < middle) {
            left.push(list[i])
        } else {
            right.push(list[i])
        }
    }
    return quickSort(left).concat([middle], quickSort(right))
}


console.warn(quickSort([2, 4, 62, 1, 5, 23, 2]))