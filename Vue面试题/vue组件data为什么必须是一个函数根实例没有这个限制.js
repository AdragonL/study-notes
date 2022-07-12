/*
 * @Author: DragonL
 * @Date: 2022-06-08 11:08:47
 * @LastEditors: DragonL
 * @LastEditTime: 2022-06-08 11:33:33
 * @Description: 
 */


// data必须函数是保证在多实例的时候可以保护之间的状态不干扰不污染
// 根实例是因为new一个vue实例不会创建多个，不存在污染问题


// 在源码中的initData中会对data的类型进行判断如果是function类型会执行函数返回，而是object类型的话直接是由data上的数据，而vue.component上的comp属性值执行了一次