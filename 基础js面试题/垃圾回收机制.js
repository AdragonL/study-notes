/*
 * @Author: DragonL
 * @Date: 2022-05-23 15:20:08
 * @LastEditors: DragonL
 * @LastEditTime: 2022-05-23 15:30:21
 * @Description: 
 */
// 标记清除法

// 算法大致过程就像这样：
// 垃圾收集器在运行时会给内存中的所有变量都加上一个标记，假设内存中所有对象都是垃圾，全标记为0；
// 然后从各个根对象开始遍历，把不是垃圾的节点改成1；
// 清除所有标记为0的垃圾，销毁并回收他们所占用的内存空间
// 最后，把所有内存中对象标记修改为0，等待下一轮垃圾回收

// 优点是操作方便
// 缺点是
// 会出现内存碎片化，因为清除之后的内存块是不连续的
// 分配速度慢，需要遍历
// 而标记整理算法就可以解决，在清楚之后会将活着的对象像内存的一端移动，清理边界内存


// 引用计数法
// 通过计算对象被引用的次数来判断是否是垃圾需要回收，0则回收，不为0则不回收，不过对待循环引用无法解决，需要将对象赋值为null来解决