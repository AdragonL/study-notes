/*
 * @Author: DragonL
 * @Date: 2022-06-14 10:04:58
 * @LastEditors: DragonL
 * @LastEditTime: 2022-06-20 14:45:38
 * @Description: 
 */
import io from 'socket.io-client';
const host: string = 'localhost:3006';
const socket = io.connect(host);
export default socket;
