/*
 * @Author: DragonL
 * @Date: 2022-06-13 11:03:53
 * @LastEditors: DragonL
 * @LastEditTime: 2022-06-13 14:32:01
 * @Description: 
 */
// import { desktopCapturer } from "electron"
export async function getScreenStream(){
  let {desktopCapturer}  = window.electron
  const sources = await desktopCapturer.getSources({types: ['screen']})
  navigator.webkitGetUserMedia({
      audio:false,
      video: {
          mandatory: {
              chromeMediaSource: 'desktop',
              chromeMediaSourceId: sources[0].id,
              maxWidth: window.screen.width,
              maxHeight: window.screen.height
          }
      }
      // 捕获成功放在callback中的第一个参数
  },(stream)=>{
      peer.emit('add-stream', stream)
  }, (err)=> {
      // 这里必须写，不然报错
      console.log(err)
  })
}
