/*
 * @Author: DragonL
 * @Date: 2022-02-23 11:38:50
 * @LastEditors: DragonL
 * @LastEditTime: 2022-02-23 11:44:12
 * @Description: 
 */
const intersect = (nums1, nums2) => {
    const map = {};
    const res = [];
    for (const num1 of nums1) { // 记录nums1各个数字的出现次数
      if (map[num1]) {
        map[num1]++;  
      } else {         
        map[num1] = 1; 
      }
    }
    for (const num2 of nums2) { // 遍历nums2，看看有没有数字在nums1出现过
      const val = map[num2];
      if (val > 0) {            // 有出现过
        res.push(num2);         // 推入res数组
        map[num2]--;            // 匹配掉一个，就减一个
      }
    }
    return res;
  };

  console.warn(intersect([1,2,3,4],[4,3,2,1]))