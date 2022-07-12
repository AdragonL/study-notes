/*
 * @Author: DragonL
 * @Date: 2022-05-23 14:18:07
 * @LastEditors: DragonL
 * @LastEditTime: 2022-05-23 14:24:47
 * @Description:
 */





// 1.如果obj里面有时间对象，则JSON.stringify后再JSON.parse的结果，时间将只是字符串的形式，而不是对象的形式
// 2.如果obj里有RegExp(正则表达式的缩写)、Error对象，则序列化的结果将只得到空对象；
// 3、如果obj里有函数，undefined，则序列化的结果会把函数或 undefined丢失；
// 4、如果obj里有NaN、Infinity和-Infinity，则序列化的结果会变成null
// 5、JSON.stringify()只能序列化对象的可枚举的自有属性，例如 如果obj中的对象是有构造函数生成的， 则使用JSON.parse(JSON.stringify(obj))深拷贝后，会丢弃对象的constructor；
// 6、如果对象中存在循环引用的情况也无法正确实现深拷贝；
