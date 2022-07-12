/*
 * @Author: DragonL
 * @Date: 2021-12-29 16:08:06
 * @LastEditors: DragonL
 * @LastEditTime: 2021-12-29 16:16:00
 * @Description: 
 */
var canJump = function (nums) {
    let length = nums.length
    let max = 0
    for (let a = 0; a < length; a++) {
        if (a > max) return false
        max = Math.max(a + nums[a], max)
        if (max >= length-1) return true
    }
};

console.warn(canJump([3, 2, 1, 0, 4]))