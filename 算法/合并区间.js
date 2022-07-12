/*
 * @Author: DragonL
 * @Date: 2021-12-29 16:17:09
 * @LastEditors: DragonL
 * @LastEditTime: 2021-12-29 20:43:09
 * @Description: 
 */
var merge = function (intervals) {
    let list = []
    intervals.sort((a, b) => a[0] - b[0])
    let left = intervals[0][0]
    let right = intervals[0][1]
    for (let [l, r] of intervals) {
        if (l <= right && r >= right) {
            right = r
        } else if (right < l) {
            list.push([left, right])
            left = l
            right = r
        }
    }
    list.push([left, right])
    return list
};

console.warn(merge([[1, 3], [2, 6], [8, 10], [15, 18]]))