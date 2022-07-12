/*
 * @Author: DragonL
 * @Date: 2022-06-10 16:15:39
 * @LastEditors: DragonL
 * @LastEditTime: 2022-06-20 17:00:22
 * @Description: 
 */
import { lstat } from 'fs/promises'
import { cwd } from 'process'
import { ipcRenderer,desktopCapturer } from 'electron'
export default function (app: any) {
  console.warn(desktopCapturer,ipcRenderer,"desktopCapturer")
  ipcRenderer.on('main-process-message', async (_event, ...args) => {
    console.log('[Receive Main-process message]:', ...args)
    //  await desktopCapturer.getSources({types: ['screen']}).then(res=>{
    //   console.warn(res,"res")
    //  })
  })

  ipcRenderer.on('SET_SOURCE', async (_event, sourceId) => {
    // let video: any = {
    //   mandatory: {
    //     chromeMediaSource: 'desktop',
    //     chromeMediaSourceId: sourceId,
    //   }
    // }
    try {
      // console.warn("到达")
      // const stream = await navigator.mediaDevices.getUserMedia({
      //   audio: false,
      //   video
      // })
      console.warn(sourceId,"sourceId")
      app.config.globalProperties.$myStream = sourceId
      // console.warn("成功")
    } catch (e) {
      console.warn(e)
    }
  })

  lstat(cwd()).then(stats => {
    console.log('[fs.lstat]', stats)
  }).catch(err => {
    console.error(err)
  })
}
// Usage of ipcRenderer.on

// console.warn(ipcRenderer, "ip")