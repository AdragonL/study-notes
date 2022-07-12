/*
 * @Author: DragonL
 * @Date: 2022-01-12 16:35:02
 * @LastEditors: DragonL
 * @LastEditTime: 2022-05-23 16:48:41
 * @Description: 
 */


//掌握六大排序：冒泡，选择，插入，希尔，快速,归并
//冒泡算法
function maopao(list) {
    for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < list.length - 1 - i; j++) {
            if (list[j] > list[j + 1]) {
                let a = list[j]
                list[j] = list[j + 1]
                list[j + 1] = a
            }
        }
    }
    return list
}

console.warn(maopao([4, 7, 22, 6, 8, 5]))


// 例子4,5,6,3

// 第一步：4,5,3,6  pos = 2
// 第二步：4,3,5,6  pos = 1
// 第三步：3,4,5,6  pos = 0

function maopao2(list) {
    let i = list.length - 1
    while (i > 0) {
        let pos = 0
        for (let j = 0; j < i; j++) {
            if (list[j] > list[j + 1]) {
                pos = i
                let temp = list[j]
                list[j] = list[j + 1]
                list[j + 1] = temp
            }
        }
        i = pos
    }
    return list
}
console.warn(maopao2([4, 7, 22, 6, 8, 5]))

function maopao3(list) {
    let low = 0
    let high = list.length - 1
    while (low < high) {
        for (let j = low; j < high; ++j) {
            if (list[j] > list[j + 1]) {
                let temp = list[j]
                list[j] = list[j + 1]
                list[j + 1] = temp
            }
        }
        --high;
        for (let j = high; j > low; --j) {
            if (list[j] < list[j - 1]) {
                let temp = list[j]
                list[j] = list[j - 1]
                list[j - 1] = temp
            }
        }
        ++low
    }
    return list
}
//一个循环下来就是获取了最大值和最小值
//相当于减少一半的次数
console.warn(maopao3([4, 7, 22, 6, 8, 5]))

//选择排序
//原理就是在遍历中拿到第一层遍历的值作为是初始值，然后在与后面的值进行比较，一旦出现小于初始值的数将其位置记录，继续遍历，最后将初始值的位置和交换值的位置交换
function xuanze(list) {
    for (let i = 0; i < list.length - 1; i++) {
        let j = i + 1
        let pos = i
        while (j < list.length) {
            if (list[pos] > list[j]) {
                pos = j
            }
            j++
        }
        let temp = list[i]
        list[i] = list[pos]
        list[pos] = temp
    }
    return list
}
console.warn(xuanze([4, 7, 22, 6, 8, 5]))


//插入排序 类似打扑克牌一样 在已经排好的队列中插入
function charu(list) {
    for (let i = 1; i < list.length; i++) {
        let j = i - 1
        let key = list[i]
        while (j >= 0 && list[j] > key) {
            list[j + 1] = list[j]
            j--
        }
        list[j + 1] = key
    }
    return list
}
// 4,7,22,6,8,5
// i =3 j =2  key = list[3] = 6  


console.warn(charu([4, 7, 22, 6, 8, 5]))

//希尔排序  (是插入排序的加强版)
function xier(list) {
    let len = list.length
    let gsp
    for (gsp = Math.floor(len / 2); gsp > 0; gsp = Math.floor(gsp / 2)) {     //分组
        for (let i = gsp; i < len; i++) {          //插入排序
            let current = list[i]
            let j = i
            while (j - gsp >= 0 && list[j - gsp] > current) {
                list[j] = list[j - gsp]
                j = j - gsp
            }
            list[j] = current
        }
    }
    return list
}

console.warn(xier([4, 7, 22, 6, 8, 5]))


//归并排序  分治的思维 
//原理就是通过最少两个元素对比进行排列，然后不断的扩大进行排列对比，最后从大问题转变成小问题来解决
function guibing(list) {
    let len = list.length
    let middle = Math.floor(len / 2)
    if (len < 2) return list
    let left = list.slice(0, middle)
    let right = list.slice(middle, len)
    let mergeLeft = guibing(left)
    let mergeRight = guibing(right)
    return merge(mergeLeft, mergeRight)
}

function merge(left, right) {
    let result = []
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            result.push(left.shift())
        } else {
            result.push(right.shift())
        }
    }

    while (left.length) result.push(left.shift())
    while (right.length) result.push(right.shift())

    return result
}


console.warn(guibing([4, 7, 22, 6, 8, 5]))

//快速排序  也是分治的思想 大问题分成是小问题
function quickSort(list) {
    if (list.length <= 1) return list
    let middle = Math.floor(list.length / 2)
    let midd = list.splice(middle, 1)[0]
    let left = []
    let right = []
    for (let i = 0; i < list.length; i++) {
        if (midd > list[i]) {
            left.push(list[i])
        } else {
            right.push(list[i])
        }
    }

    return quickSort(left).concat([midd], quickSort(right))
}


console.warn(quickSort([4, 7, 22, 6, 8, 5]))