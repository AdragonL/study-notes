/*
 * @Author: DragonL
 * @Date: 2022-05-23 13:48:01
 * @LastEditors: DragonL
 * @LastEditTime: 2022-05-23 13:54:32
 * @Description: 
 */


// 1、首先创建了一个新对象
// 2、设置原型，将对象的原型设置为函数的prototype对象
// 3、让函数的this指向这个对象，执行构造函数的代码（为这个新对象添加属性）
// 4、判断函数的返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象
function Person() {

}

let person = new Person()

function newPerson(constructor, ...rest) {
    let person = new Object()
    person.__proto__ = constructor.prototype
    const ret = constructor.call(person, rest)
    return typeof ret === "object" ? ret : obj
    return person
}


