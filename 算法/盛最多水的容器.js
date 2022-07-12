/*
 * @Author: DragonL
 * @Date: 2021-12-15 19:55:00
 * @LastEditors: DragonL
 * @LastEditTime: 2021-12-16 16:09:40
 * @Description: 
 */
var maxArea = function (height) {

    let length = height.length
    if (length === 0 || length === 1) return 0
    let res = 0
    let left = 0
    let right = length - 1
    while (left < right) {
        if (height[left] < height[right]) {
            res = Math.max(res, height[left] * (right - left))
            left++
        } else {
            res = Math.max(res, height[right] * (right - left))
            right--
        }
        console.warn(res, "max")
    }
    return res
};

console.warn(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]))