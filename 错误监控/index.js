/*
 * @Author: DragonL
 * @Date: 2022-05-13 11:31:36
 * @LastEditors: DragonL
 * @LastEditTime: 2022-05-13 11:37:24
 * @Description: 
 */

// 参考：https://www.jianshu.com/p/445ca9e99d2c

//JS全局onerror

// 特点：

// 全局监听所有JS错误
// 无法识别 Vue 组件信息
// 可以捕获一些 Vue 监听不到的错误，如：异步错误

//Vue配置方法errorHandler

// 特点：

// Vue全局错误监听，所有组件错误都会汇总到这里
// errorCaptured 返回 false ，错误会被提前拦截阻止，这里无法捕获

// 生命周期钩子errorCaptured

// 特点：

// 监听所有 下级 组件的错误
// 返回 false 会阻止错误向上传播


//unhandledrejection

// 特点：

// 捕获未处理的promise异常


