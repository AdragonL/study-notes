/*
 * @Author: DragonL
 * @Date: 2022-03-17 16:38:53
 * @LastEditors: DragonL
 * @LastEditTime: 2022-03-17 16:53:11
 * @Description: 
 */
//暴力循环
function a(arr){
    let max = 0
    for(let i =0;i<arr.length;i++){
        for(let j = i+1;j<arr.length;j++){
            if(arr[j]-arr[i]>max){
                max = arr[j] -arr[i]
            }
        }
    }

    return max
}

console.warn(a([7,1,5,3,6,4]))

//动态规划
function b(arr){
    let n = arr.length
    if(!n || n === 1)return 0
    let max = 0
    let minPrize = arr[0]
    for(let i=1;i<n;i++){
        let prize = arr[i]
        max= Math.max(prize-minPrize,max)
        minPrize = Math.min(prize,minPrize)
    }
    return max
}

console.warn(b([7,1,5,3,6,4]))