/*
 * @Author: DragonL
 * @Date: 2021-12-15 17:47:57
 * @LastEditors: DragonL
 * @LastEditTime: 2021-12-15 18:06:01
 * @Description: 
 */
var findMedianSortedArrays = function (nums1, nums2) {
    let list = nums1.concat(nums2).sort(
        function (a, b) { return a - b }
    )
    console.warn(list)
    let type = list.length % 2 === 0 ? true : false

    if (type) {
        let length = list.length / 2
        console.warn(length)
        return ((list[length - 1] + list[length]) / 2).toFixed(5)
    } else {
        let length = Math.ceil(list.length / 2)
        console.warn(length)
        return (list[length - 1]).toFixed(5)
    }
};


console.warn(findMedianSortedArrays([3], [-2, -1]))