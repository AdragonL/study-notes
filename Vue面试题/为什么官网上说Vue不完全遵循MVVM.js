/*
 * @Author: DragonL
 * @Date: 2022-06-07 10:42:17
 * @LastEditors: DragonL
 * @LastEditTime: 2022-06-07 10:48:06
 * @Description: 
 */


//首先MVVM框架的分为Model,View,ModelView，三层，而View和Model层是通过ViewModel来进行通信 数据和视图更新的，在Vue中的表现就是在通过监听DOM时间触发数据改变和通过对数据在VuE2中使用Object.defineProperty和Vue3中使用Proxy来完成对数据的劫持和监听来完成对视图的更新；
//但是View和Model是不直接相互操作的，但是在Vue中提供了ref这个方式来可以获取元素的真实节点，通过ref可以直接对节点进行操作。