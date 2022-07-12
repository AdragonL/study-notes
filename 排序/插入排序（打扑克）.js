/*
 * @Author: DragonL
 * @Date: 2022-05-23 16:54:18
 * @LastEditors: DragonL
 * @LastEditTime: 2022-06-01 16:53:09
 * @Description: 
 */
function charu(list) {
    for (let i = 1; i < list.length; i++) {
        let j = i - 1
        let k = list[i]
        while (j >= 0 && list[j] > k) {
            list[j + 1] = list[j]
            j--
        }
        list[j + 1] = k
    }
    return list
}


// function charu(list) {
//     for (let i = 1; i < list.length; i++) {
//         let j = i - 1
//         let k = list[i]
//         while (j >= 0 && list[j] > k) {
//             list[j + 1] = list[j]
//             j--
//         }
//         list[j + 1] = k
//     }
//     return list
// }

console.warn(charu([3, 4, 6, 2, 1, 6, 3]))