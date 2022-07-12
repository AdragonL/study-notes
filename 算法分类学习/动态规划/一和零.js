/*
 * @Author: DragonL
 * @Date: 2022-03-24 11:04:57
 * @LastEditors: DragonL
 * @LastEditTime: 2022-03-24 11:23:37
 * @Description: 
 */
function a(strs,m,n){
    let sl = strs.length
    let dp= []
    for(let i=0;i<=m;i++){
        dp[i] = []
        for(let j=0;j<=n;j++){
            dp[i][j] = []
            for(let s=0;s<sl;s++){
                let sC = strs[s]
                let [mM,Nn] = current(sC)
                let noChoose = dp[i][j][s-1] ||0
                let choose = 0
                if(i>=mM && j>=Nn){
                    choose = 1+(dp[i-mM][j-Nn][s-1] || 0)
                }
                dp[i][j][s] = Math.max(noChoose,choose)
            }
        }
    }
    // return dp
    return dp[m][n][sl-1]
}

function current(sC){
    let m = 0
    let n = 0
    for(let i=0;i<sC.length;i++){
        if(sC[i] === "1"){
            n++
        }else{
            m++
        }
    }
    return [m,n]
}

let str = ["10", "0001", "111001", "1", "0"],m=5,n=3
console.warn(a(str,m,n))