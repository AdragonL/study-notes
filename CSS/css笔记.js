/*
 * @Author: DragonL
 * @Date: 2022-04-08 15:20:04
 * @LastEditors: DragonL
 * @LastEditTime: 2022-04-11 09:56:22
 * @Description: 
 */

// 浏览器厂商 

// Chrome       webkit/blink
// Safari       webkit 
// opera        presto    =>被360和昆仑万维收购
// firefox      geecko
// ie           trident


// v8引擎就是将js代码转换为机器码来执行，所以运行速度是大大被优化




// css 层叠样式表


// 通配符选择器   *      0
// 标签选择器            1
// id选择器              100
// class选择器           10
// 属性选择器   [id="box"]{}     使用场景就是表单input区别password和text     10
// 派生选择器  父子选择器   
// 伪类选择器             10
// 伪元素                 1
// class 和属性选择器权重相同


// 对于父子选择器的匹配规则：
// .nav header h3 span {
//     ...
// }

// 从下到上 从右到左 有利于查找的优化 
// 由于父子选择器是可以跨元素查找的，所以从子开始查找有利于遍历次数的减少

// ::before //伪元素
// ::before //伪类


// 区别：用法上面没有区别，不过根据w3c规定需要添加样式时需要使用伪元素