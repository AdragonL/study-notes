/*
 * @Author: DragonL
 * @Date: 2021-12-22 15:22:01
 * @LastEditors: DragonL
 * @LastEditTime: 2021-12-22 15:41:57
 * @Description: 
 */

//  function ListNode(val, next) {
//      this.val = (val===undefined ? 0 : val)
//      this.next = (next===undefined ? null : next)
//      }
var removeNthFromEnd = function (head, n) {
    let arr = []
    let len = arr.length - n
    let node = new ListNode()
    let p = node
    let i = 0
    while (head) {
        arr.push(head.val)
        head = head.next
    }
    arr.splice(len, 1)
    for (let i = 0; i < arr.length; i++) {
        p.next = new ListNode(arr[i])
        p = p.next
    }
    return node.next
};


function ListNode(val, next) {
    this.val = val ? 0 : null
    this.next = next ? next : null
}