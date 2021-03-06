# electron-vite-vue

[![awesome-vite](https://awesome.re/mentioned-badge.svg)](https://github.com/vitejs/awesome-vite)
![GitHub license](https://img.shields.io/github/license/caoxiemeihao/electron-vite-vue?style=flat)
![GitHub stars](https://img.shields.io/github/stars/caoxiemeihao/electron-vite-vue?color=fa6470&style=flat)
![GitHub forks](https://img.shields.io/github/forks/caoxiemeihao/electron-vite-vue?style=flat)


**[English](README.md) | ç®ä½ä¸­æ**

ð¥³ Electron + Vite + Vue æ´åæ¨¡æ¿ -- **ç»æç®åï¼å®¹æä¸æï¼**

## æ¦è¿°

ð¦ å¼ç®±å³ç¨  
ðª æ¯æ C/C++ æ¨¡å  
ð© æ¯æå¨æ¸²æè¿ç¨ä¸­ä½¿ç¨ ElectronãNode.js API  
ð± ç»ææ¸æ°ï¼å¯å¡æ§å¼º  
ð¥ å¾å®¹æå®ç°å¤çªå£  

## å¿«éå¼å§

```sh
npm create electron-vite
```

<!-- [![quick-start](https://asciinema.org/a/483731.svg)](https://asciinema.org/a/483731) -->

![electron-vite-vue.gif](https://github.com/electron-vite/electron-vite-vue/blob/main/packages/renderer/public/electron-vite-vue.gif?raw=true)

## è°è¯

![electron-vite-react-debug.gif](https://github.com/electron-vite/electron-vite-react/blob/main/packages/renderer/public/electron-vite-react-debug.gif?raw=true)

## ç®å½ç»æ

```tree
âââ dist                      æå»ºåï¼æ ¹æ® packages ç®å½çæ
|   âââ main
|   âââ preload
|   âââ renderer
|
âââ scripts
|   âââ build.mjs             é¡¹ç®å¼åèæ¬ npm run build
|   âââ watch.mjs             é¡¹ç®å¼åèæ¬ npm run dev
|
âââ packages
|   âââ main                  ä¸»è¿ç¨æºç 
|   |   âââ vite.config.ts
|   âââ preload               é¢å è½½èæ¬æºç 
|   |   âââ vite.config.ts
|   âââ renderer              æ¸²æè¿ç¨æºç 
|       âââ vite.config.ts
```

## ä¸äºå¸¸è§çæ¡ä¾

å¨ Main-process ä¸­ä½¿ç¨ ð [electron-vite-boilerplate](https://github.com/caoxiemeihao/electron-vite-boilerplate)

å¨ Renderer-process ä¸­ä½¿ç¨ ð [electron-vite-boilerplate/tree/nodeIntegration](https://github.com/caoxiemeihao/electron-vite-boilerplate/tree/nodeIntegration)

**ES Modules**

- [execa](https://www.npmjs.com/package/execa)
- [node-fetch](https://www.npmjs.com/package/node-fetch)
- [file-type](https://www.npmjs.com/package/file-type)

**Native Addons(C/C++)**

- [sqlite3](https://www.npmjs.com/package/sqlite3)
- [serialport](https://www.npmjs.com/package/serialport)
