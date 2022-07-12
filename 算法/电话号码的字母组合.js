/*
 * @Author: DragonL
 * @Date: 2021-12-20 17:14:30
 * @LastEditors: DragonL
 * @LastEditTime: 2021-12-22 15:04:30
 * @Description: 
 */
let map = {
    2: ["a", "b", "c"],
    3: ["d", "e", "f"],
    4: ["g", "h", "i"],
    5: ["j", "k", "l"],
    6: ["m", "n", "o"],
    7: ["p", "q", "r", "s"],
    8: ["t", "u", "v"],
    9: ["w", "x", "y", "z"],
}

var letterCombinations = function (digits) {
    let list = digits.split("")
    if (digits === '') return []
    // console.warn(list)
    let i = 0
    let res = []
    testd(i, '', list, res)

    return res
};

function testd(i, arr, list, res) {
    if (i === list.length) return res.push(arr)
    for (let j = 0; j < map[list[i]].length; j++) {
        testd(i + 1, arr + map[list[i]][j], list, res)
    }

}

console.warn(letterCombinations("23"))