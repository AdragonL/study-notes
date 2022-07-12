/*
 * @Author: DragonL
 * @Date: 2022-05-23 17:35:48
 * @LastEditors: DragonL
 * @LastEditTime: 2022-06-01 16:58:12
 * @Description: 
 */

function guibing(list) {
    let len = list.length
    if (len < 2) {
        return list
    }
    let middle = Math.floor(len / 2)
    let left = list.slice(0, middle)
    let right = list.slice(middle, len)
    let mergeLeft = guibing(left)
    let mergeRight = guibing(right)
    return merge(mergeLeft, mergeRight)
}

function merge(list1, list2) {
    let result = []
    while (list1.length && list2.length) {
        if (list1[0] > list2[0]) {
            result.push(list2.shift())
        } else {
            result.push(list1.shift())
        }
    }
    while (list1.length) {
        result.push(list1.shift())
    }
    while (list2.length) {
        result.push(list2.shift())
    }
    return result
}

function guibing(list) {
    let len = list.length
    if (len < 2) {
        return list
    }
    let middle = Math.floor(len / 2)
    let left = list.slice(0, middle)
    let right = list.slice(middle, len)
    let leftC = guibing(left)
    let rightC = guibing(right)
    return merge(leftC, rightC)
}

function merge(left, right) {
    let result = []
    while (left.length && right.length) {
        if (left[0] > right[0]) {
            result.push(right.shift())
        } else {
            result.push(left.shift())
        }
    }

    while (left.length) {
        result.push(left.shift())
    }
    while (right.length) {
        result.push(right.shift())
    }

    return result
}


console.warn(guibing([2, 5, 5, 2, 1, 54, 6, 2, 2]))