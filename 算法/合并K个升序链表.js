/*
 * @Author: DragonL
 * @Date: 2021-12-22 20:18:01
 * @LastEditors: DragonL
 * @LastEditTime: 2021-12-23 09:57:33
 * @Description: 
 */
var mergeTwoLists = function (list1, list2) {
    let node = new ListNode(-1)
    let p = node
    while (list1 !== null && list2 !== null) {
        if (list1.val < list2.val) {
            p.next = list1
            list1 = list1.next
            // list1.next = mergeTwoLists(list1.next, list2)
            // return list1
        } else {
            p.next = list2
            list2 = list2.next
            // list2.next = mergeTwoLists(list1, list2.next)
            // return list2
        }
        p = p.next
    }
    p.next = list1 || list2
    return node.next
};

var mergeKLists = function (lists) {
    let node = null
    for (let i = 0; i < lists.length; i++) {
        node = mergeTwoLists(node, lists[i])
    }
    return node
};