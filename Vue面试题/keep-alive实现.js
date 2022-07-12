/*
 * @Author: DragonL
 * @Date: 2022-06-08 11:33:50
 * @LastEditors: DragonL
 * @LastEditTime: 2022-06-08 14:50:01
 * @Description: 
 */



// 参考:https://blog.csdn.net/f18855666661/article/details/120314890

// 1.LRU缓存淘汰算法（数据最近北方问过，那么将来被访问的几率变得更高）

// 步骤: 
// 1. 新数据插入到链表尾部；
// 2. 每到缓存命中则将数据移到链表尾部；
// 3. 当链表满的时候，将链表头部的数据丢弃；


// 实现LRU的数据结构一般是hashMap + 双向链表 由于需要频繁的删除元素，所以使用双链接最合适

// 对于现有的迭代器可以使用Map来生成所需的数据结构
class LRU {
    count; //容量
    cache;
    constructor(count) {
        this.count = count
        this.cache = new Map()
    }
    get(key) {
        if (this.cache.has(key)) {
            let temp = this.cache.get(key)
            this.cache.delete(key)
            this.cache.set(key, temp)

            return temp
        }
        return -1
    }

    put(key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key)
        } else if (this.cache.size >= this.count) {
            this.cache.delete(this.cache.keys().next().value)

        }
        this.cache.set(key, value)
    }
}



// 2.实现keep-alive:

// 使用LRU缓存机制进行缓存,max限制缓存表的最大容量
// 根据设定的include/exclude来进行条件匹配，不匹配直接返回组件实例
// 根据组件的id和tag生成缓存key，查找cache中是否已缓存过，存在则取出并更新该key在keys的位置
// 获取节点名称 或根据节点cid信息拼出当前组件名称；
// 获取keep-alive包裹的第一个子组件对象和组件名


// cache用于存储vnode对象 key-缓存key,value-组件(vue2源码中是Object.create(null))
// keys用于储存key(组件唯一标识,用于记录位置,LRU算法关键)

// 如何使用缓存?
// (在VNode->实例化->_update->真实DOM)中实例化这一步中判断到keepalive为true,根由于keep-alive的render先于组件加载先执行,所以componentInstance为undefined,再次访问的时候componentInstance是已经缓存的组件实例,可以执行insert函数直接将实例插入

// keep-alive 会在 cache 对象中缓存子组件的 vnode，vnode 有个 componentInstance 属性，
// 这个 componentInstance 属性就是缓存的 Vue 实例，在 componentInstance 属性中有个 $el 属性，
// 这个 $el 属性是缓存的真实 DOM
