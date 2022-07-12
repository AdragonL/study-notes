/*
 * @Author: DragonL
 * @Date: 2021-12-28 15:47:50
 * @LastEditors: DragonL
 * @LastEditTime: 2021-12-28 15:49:59
 * @Description: 
 */
var searchRange = function(nums, target) {
    return [nums.indexOf(target),nums.lastIndexOf(target)]
};


console.warn(searchRange([5,7,7,8,8,10],8))