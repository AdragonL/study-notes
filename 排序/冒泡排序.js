/*
 * @Author: DragonL
 * @Date: 2022-05-23 16:44:44
 * @LastEditors: DragonL
 * @LastEditTime: 2022-05-23 16:46:25
 * @Description: 
 */


function mappao(list) {
    for (let i = 0; i < list.length; i++) {
        for (let j = i + 1; j < list.length; j++) {
            if (list[i] > list[j]) {
                [list[i], list[j]] = [list[j], list[i]]
            }
        }
    }
    return list
}