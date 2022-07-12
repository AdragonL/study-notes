/*
 * @Author: DragonL
 * @Date: 2022-06-08 15:11:54
 * @LastEditors: DragonL
 * @LastEditTime: 2022-06-08 15:18:18
 * @Description: 
 */
function myInstanceof(left, right) {
    if(!left || !right){
        return 
    }
    let leftproto = left.__proto__
    let rightprototype = right.protoType
    while (true) {
        if (leftproto === null) {
            return false
        }
        if (leftproto === rightprototype) {
            return true
        }
        leftproto = left.__proto__
    }
}