/*
 * @Author: DragonL
 * @Date: 2022-05-23 14:02:45
 * @LastEditors: DragonL
 * @LastEditTime: 2022-05-23 14:03:02
 * @Description:
 */



// 有五种，分别是 State、 Getter、Mutation 、Action、 Module
// 1、state => 基本数据(数据源存放地)
// 2、getters => 从基本数据派生出来的数据
// 3、mutations => 提交更改数据的方法，同步
// 4、actions => 像一个装饰器，包裹mutations，使之可以异步。
// 5、modules => 模块化Vuex

// 1、Vuex中所有的状态更新的唯一途径都是mutation，异步操作通过 Action 来提交 mutation实现，这样可以方便地跟踪每一个状态的变化，从而能够实现一些工具帮助更好地了解我们的应用。
// 2、每个mutation执行完成后都会对应到一个新的状态变更，这样devtools就可以打个快照存下来，然后就可以实现 time-travel 了。如果mutation支持异步操作，就没有办法知道状态是何时更新的，无法很好的进行状态的追踪，给调试带来困难。
