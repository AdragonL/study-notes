/*
 * @Author: DragonL
 * @Date: 2022-03-23 15:33:18
 * @LastEditors: DragonL
 * @LastEditTime: 2022-03-23 16:22:41
 * @Description: 
 */

function a(d){
    let n = d.length
    let up = new Array(n).fill(0)
    let down = new Array(n).fill(0)
    up[0] = down[0] = 1
    for(let i=1;i<n;i++){
        if(d[i]>d[i-1]){
            up[i] =Math.max(up[i-1],down[i-1]+1)
            down[i] = down[i-1]
        }else if(d[i]<d[i-1]){
            down[i] =Math.max(down[i-1],up[i-1]+1)
            up[i] = up[i-1]
        }else{
            up[i] = up[i - 1];
            down[i] = down[i - 1];
        }
    }
    console.warn(up,down)
    return Math.max(up[n-1],down[n-1])
}


function b(d){
    let n = d.length
    // let up = new Array(n).fill(0)
    // let down = new Array(n).fill(0)
   let  up = down = 1
    for(let i=1;i<n;i++){
        if(d[i]>d[i-1]){
           up = down+1
        }else if(d[i]<d[i-1]){  
           down =up+1
        }
    }
    // console.warn(up,down)
    return Math.max(up,down)
}
console.warn(b([1,7,4,3,2,1]))