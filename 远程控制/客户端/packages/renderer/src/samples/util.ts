/*
 * @Author: DragonL
 * @Date: 2022-06-13 15:31:33
 * @LastEditors: DragonL
 * @LastEditTime: 2022-06-15 18:15:21
 * @Description: 
 */
export function handleStream(stream: any) {
    var video: any = document.getElementById("video");
    // document.appendChild(video);
    video.srcObject = stream;
    video.onloadedmetadata = (e:any) => video.play()
}