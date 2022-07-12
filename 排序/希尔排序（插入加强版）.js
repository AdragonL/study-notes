/*
 * @Author: DragonL
 * @Date: 2022-05-23 17:25:43
 * @LastEditors: DragonL
 * @LastEditTime: 2022-05-23 17:34:28
 * @Description: 
 */

function xier(list) {
    let gsp;
    let len = list.length
    for (gsp = Math.floor(len / 2); gsp > 0; gsp = Math.floor(gsp / 2)) {
        for (let i = gsp; i < len; i++) {
            let j = i
            let current = list[i]
            while (j - gsp >= 0 && list[j - gsp] > current) {
                list[j] = list[j - gsp]
                j = j - gsp
            }
            list[j] = current
        }
    }
    return list
}


console.warn(xier([2, 4, 2, 1, 6, 7, 4, 2]))