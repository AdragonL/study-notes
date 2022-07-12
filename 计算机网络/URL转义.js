/*
 * @Author: DragonL
 * @Date: 2022-03-17 14:59:36
 * @LastEditors: DragonL
 * @LastEditTime: 2022-05-12 14:38:08
 * @Description: 
 */

// encodeURI和encodeURIComponent的区别

// encodeURI 对应的是 decodeURI
// encodeURIComponent 对应的是 decodeURIComponent


// 种类：
// 1：    ;/?:@&=+$, 
// 2:      字母52个  数字10个  uri标记符8个 -_.!~*'()
// 3:    #
// 4:   没在上面的字符例如中文字符


// encodeURI 会转义其中的4
// encodeURIComponent 会转义其中的1,3,4

// 使用场景例如你需要在你的url参数中带上一个网址 ，你可以先将你的参数的值encodeURIComponent后再加入到参数中
let str = "https://www.baidu.com"
console.warn(encodeURI(str))   // https://www.baidu.com
console.warn(encodeURIComponent(str)) // https%3A%2F%2Fwww.baidu.com

