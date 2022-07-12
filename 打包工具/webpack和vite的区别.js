/*
 * @Author: DragonL
 * @Date: 2022-05-23 11:53:55
 * @LastEditors: DragonL
 * @LastEditTime: 2022-05-23 12:00:54
 * @Description: 
 */



// vite是基于esbuild预构建依赖的，esbuild是采用go编写的，操作是纳秒级别的，而js是毫秒级别的，
// webpack打包需要是分析依赖，编译打包，然后给本地服务器进行渲染，在dev-server中随着模块的增多会早成打包出来的bundle体积过大所以热更新的速度明显拖慢
// vite由于现代浏览器支持ESmodule，所以不需要分析模块之间的依赖关系，可以做到按需加载，当浏览器请求某个模块的时候根据需要的模块内容进行编译，当改动某个模块的时候只需要重新请求该模块，不需要像webpack一样就模块和依赖全部编译一次