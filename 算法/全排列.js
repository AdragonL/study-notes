/*
 * @Author: DragonL
 * @Date: 2021-12-28 20:39:03
 * @LastEditors: DragonL
 * @LastEditTime: 2021-12-29 10:37:46
 * @Description: 
 */
var permute = function (nums) {
    let a = []
    const b = (end) => {
        if (end.length === nums.length) {
            // console.warn(end,"end")
            a.push([...end])
            return
        }
        for(let i = 0;i<nums.length;i++){
            if(end.indexOf(nums[i])!== -1){
                continue;
            }
            end.push(nums[i])
            b(end)
            end.pop()
        }
        // console.warn(end)
    }
    b([])
    return a
};

console.warn(permute([1, 2, 3]))