/*
 * @Author: DragonL
 * @Date: 2021-12-16 16:14:32
 * @LastEditors: DragonL
 * @LastEditTime: 2021-12-20 16:05:04
 * @Description: 
 */
var threeSum = function (nums) {
    let a = []
    let len = nums.length
    if (len < 3) return a
    nums = nums.sort((a, b) => a - b)   //先排序
    for (let i = 0; i < len; i++) {
        if (nums[i] > 0) break;   //如果元素大于0 后面的元素相加肯定大于0
        if (i > 0 && nums[i] === nums[i - 1]) continue;//去重
        let l = i + 1
        let r = len - 1
        while (l < r) {
            let count = nums[i] + nums[l] + nums[r]
            if (count < 0) l++;
            if (count > 0) r--;
            if (count === 0) {
                a.push([nums[i], nums[l], nums[r]])
                while (l<r && nums[l] === nums[l+1]) l++;
                while (l<r && nums[r] === nums[r-1]) r--;
                l++
                r--
            }
        }
    }
    return a
};
// function a(nums,target,count){

// }

console.log(threeSum([-1, 0, 1, 2, -1, -4]))
// console.log("dddd")