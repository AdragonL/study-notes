/*
 * @Author: DragonL
 * @Date: 2022-06-10 16:15:39
 * @LastEditors: DragonL
 * @LastEditTime: 2022-06-13 15:41:06
 * @Description: 
 */
import { domReady } from './utils'
import { useLoading } from './loading'
const { appendLoading, removeLoading } = useLoading()
window.removeLoading = removeLoading
domReady().then(appendLoading)
