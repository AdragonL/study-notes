/*
 * @Author: DragonL
 * @Date: 2021-12-22 17:03:54
 * @LastEditors: DragonL
 * @LastEditTime: 2021-12-22 17:19:50
 * @Description: 
 */
var isValid = function (s) {
    let len = s.length
    let list = []
    let a = ["(", "{", "["]
    for (let i = 0; i < len; i++) {
        if (a.includes(s.charAt(i))) {
            list.push(s.charAt(i))

        } else {
            switch (s.charAt(i)) {
                case ']':
                    if (ad("[", list)) {
                        list.splice(list.length - 1, 1)
                        break
                    } else {
                        return false
                    }
                case '}':
                    if (ad("{", list)) {
                        list.splice(list.length - 1, 1)
                        break
                    } else {
                        return false
                    }
                case ')':
                    if (ad("(", list)) {
                        list.splice(list.length - 1, 1)
                        break
                    } else {
                        return false
                    }
            }
        }
    }
    return list.length === 0
};

const ad = (str, list) => {
    if (list[list.length - 1] !== str) {
        return false
    } else {
        return true
    }
}

console.warn(isValid("{{}}"))