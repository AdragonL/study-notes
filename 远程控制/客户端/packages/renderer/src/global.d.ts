/*
 * @Author: DragonL
 * @Date: 2022-06-10 16:15:39
 * @LastEditors: DragonL
 * @LastEditTime: 2022-06-14 10:05:40
 * @Description: 
 */
import { DesktopCapturer } from "electron"
export { }
declare module 'socket.io-client'
declare global {
  interface Window {
    removeLoading: () => void,
    getScreenStream: () => void,
    electron: any,
    desktopCapturer: any
  }
}


