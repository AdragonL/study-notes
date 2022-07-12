/*
 * @Author: DragonL
 * @Date: 2021-12-28 19:57:40
 * @LastEditors: DragonL
 * @LastEditTime: 2021-12-28 20:36:00
 * @Description: 
 */
var trap = function (height) {
    let left = 0, right = height.length-1
    let [leftMax, rightMax] = [0, 0]
    let count = 0
    while (left < right) {
        leftMax = Math.max(height[left], leftMax)
        rightMax = Math.max(height[right], rightMax)
        if (leftMax < rightMax) {
            count += leftMax - height[left++]
        } else {
            count += rightMax - height[right--]
        }
    }
    return count
};


console.warn(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]))