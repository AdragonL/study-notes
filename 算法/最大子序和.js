/*
 * @Author: DragonL
 * @Date: 2021-12-29 15:38:06
 * @LastEditors: DragonL
 * @LastEditTime: 2021-12-29 15:40:26
 * @Description: 
 */

var maxSubArray = function(nums) {
    let max = nums[0]
    let sum = 0
    for(let num of nums){
        if(sum>0){
            sum+= num
        }else{
            sum = num
        }

        max = Math.max(max,sum)
    }
    return max
};


console.warn(maxSubArray([5,4,-1,7,8]))