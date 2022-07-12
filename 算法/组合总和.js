/*
 * @Author: DragonL
 * @Date: 2021-12-28 15:51:24
 * @LastEditors: DragonL
 * @LastEditTime: 2021-12-28 19:57:26
 * @Description: 
 */

var combinationSum = function (candidates, target) {
    let list = []
    const check = (target, res, id) => {
        if (id === candidates.length) return
        if (target === 0) {
            list.push(res)
            return

        }
        check(target, res, id + 1)
        if (target - candidates[id] >= 0) {
            check(target - candidates[id], [...res, candidates[id]], id)
        }
        // console.warn(target, "target")

    }
    check(target, [], 0)
    return list
};


console.warn(combinationSum([2, 3, 5], 8))
