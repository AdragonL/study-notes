/*
 * @Author: DragonL
 * @Date: 2021-12-30 14:52:30
 * @LastEditors: DragonL
 * @LastEditTime: 2022-01-05 10:11:12
 * @Description: 
 */
// var minWindow = function (s, t) {
//     let left = 0, right = s.length
//     let list = []
//     let map1 = {}
//     let map2 = {}
//     let mapd = {}
//     for (let i of t) {
//         map1[i] ? ++map1[i] : map1[i] = 1
//     }
//     for (let i of s) {
//         map2[i] ? ++map2[i] : map2[i] = 1
//     }
//     let chd = Object.keys(map1)
//     for (let a = 0; a < chd.length; a++) {
//         if (map1[chd[a]] > (map2[chd[a]] ? map2[chd[a]] : 0)) return ''
//     }
//     if (s === t) return s
//     if (s.length < t.length) return ""
//     list.push(check(left, right, map2,mapd))
//     function check(left, right, copyMap) {
//         mapd[`${left},${right}`] = 1
//         // mapd[`${left},${right}`] = mapd[`${left},${right}`] ? mapd[`${left},${right}`]++ : 1
//         // while (left < right) {
//         let copy1 = left
//         let copy2 = right
//         let a = JSON.parse(JSON.stringify(copyMap))
//         let b = JSON.parse(JSON.stringify(copyMap))
//         let mapd1 = JSON.parse(JSON.stringify(mapd))
//         let mapd2 = JSON.parse(JSON.stringify(mapd))
//         if (a[s.charAt(left)] > (map1[s.charAt(left)] ? map1[s.charAt(left)] : 0)) {
//             a[s.charAt(left)]--;
//             // left++;
//             if (mapd[`${left + 1},${right}`]) return
//             let tryd = check(left + 1, right, a,mapd1)
//             tryd ? list.push(tryd) : ''
//         }
//         if (b[s.charAt(right - 1)] > (map1[s.charAt(right - 1)] ? map1[s.charAt(right - 1)] : 0)) {
//             b[s.charAt(right - 1)]--;
//             // right--
//             if (mapd[`${left},${right - 1}`]) return
//             let tryd = check(left, right - 1, b)
//             tryd ? list.push(tryd) : ''
//         }
//         if (copy1 === left && copy2 === right) {
//             // console.warn(left, right, s.substring(left, right))
//             return s.substring(left, right) ? s.substring(left, right) : ""
//         }
//         // }
//         // list.push(check(left, right, a))
//     }
//     return list
//     return list.sort((a, b) => a.length - b.length)[0]
// };

// console.warn(minWindow("a", "a"))
// console.warn(minWindow("ab", "a"))
// console.warn(minWindow("ab", "b"))
// console.warn(minWindow("abc", "ac"))

// console.warn(minWindow("ab", "A"))
// console.warn(minWindow("a", "b"))
// console.warn(minWindow("abc", "bca"))
// console.warn(minWindow("babb", "baba"))
// console.warn(minWindow("ADOBECODEBANC", "ABC"))
// console.warn(minWindow("acaabacababcbcacbbccbaccaaacacabbbcaccabccabbca", "bbaacbacbbccbcaabbacbacac"))
// console.warn(minWindow("wegdtzwabazduwwdysdetrrctotpcepalxdewzezbfewbabbseinxbqqplitpxtcwwhuyntbtzxwzyaufihclztckdwccpeyonumbpnuonsnnsjscrvpsqsftohvfnvtbphcgxyumqjzltspmphefzjypsvugqqjhzlnylhkdqmolggxvneaopadivzqnpzurmhpxqcaiqruwztroxtcnvhxqgndyozpcigzykbiaucyvwrjvknifufxducbkbsmlanllpunlyohwfsssiazeixhebipfcdqdrcqiwftutcrbxjthlulvttcvdtaiwqlnsdvqkrngvghupcbcwnaqiclnvnvtfihylcqwvderjllannflchdklqxidvbjdijrnbpkftbqgpttcagghkqucpcgmfrqqajdbynitrbzgwukyaqhmibpzfxmkoeaqnftnvegohfudbgbbyiqglhhqevcszdkokdbhjjvqqrvrxyvvgldtuljygmsircydhalrlgjeyfvxdstmfyhzjrxsfpcytabdcmwqvhuvmpssingpmnpvgmpletjzunewbamwiirwymqizwxlmojsbaehupiocnmenbcxjwujimthjtvvhenkettylcoppdveeycpuybekulvpgqzmgjrbdrmficwlxarxegrejvrejmvrfuenexojqdqyfmjeoacvjvzsrqycfuvmozzuypfpsvnzjxeazgvibubunzyuvugmvhguyojrlysvxwxxesfioiebidxdzfpumyon"
//     , "ozgzyywxvtublcl"))

var minWindow = function (s, t) {
    var need = {}, missing = t.length, i, j, I = 0, J = 0, c, l
    for (i = 0, l = t.length; i < l; i++) {
        c = t[i]
        need[c] = need[c] === undefined ? 1 : ++need[c]
    }
    for (i = 0, j = 0, l = s.length; j < l; j++) {
        c = s[j];
        missing -= need[c] >0;
        console.warn(missing,"miss")
        need[c] = need[c] === undefined ? -1 : need[c] - 1;
        // console.warn(need,"missging")
        if (missing === 0) {
            while (i < j && need[s[i]] < 0) {
                need[s[i]]++;
                i++;
            }
            if (J === 0 || j - i < J - I) {
                J = j + 1;
                I = i;
            }
        }
    }
    return s.substring(I, J);
}

console.warn(minWindow("cabwefgewcwaefgcf", "cae"))
