/*
 * @Author: DragonL
 * @Date: 2022-06-14 10:21:32
 * @LastEditors: DragonL
 * @LastEditTime: 2022-06-14 10:21:46
 * @Description: 
 */
export function getRandomSixNum() {
    let RandomSixStr = ''
    for (let i = 0; i < 6; i++) {
        RandomSixStr += String(Math.floor(Math.random() * 10))
    }
    return RandomSixStr
}
