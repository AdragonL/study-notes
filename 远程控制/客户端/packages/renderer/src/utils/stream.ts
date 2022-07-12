/*
 * @Author: DragonL
 * @Date: 2022-06-14 14:40:31
 * @LastEditors: DragonL
 * @LastEditTime: 2022-06-20 14:19:46
 * @Description: 
 */
import { ref, Ref } from "vue"
import { ipcRenderer } from "electron"
export default function () {
    const myStream: Ref<any> = ref(null)
    return { myStream }
}