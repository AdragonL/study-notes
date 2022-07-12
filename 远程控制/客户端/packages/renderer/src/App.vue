<!--
 * @Author: DragonL
 * @Date: 2022-06-10 16:15:39
 * @LastEditors: DragonL
 * @LastEditTime: 2022-06-28 16:58:10
 * @Description: 
-->
<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// import { onMounted } from "@vue/runtime-core";
import {
  onBeforeMount,
  onMounted,
  ref,
  getCurrentInstance,
  Ref,
  AppConfig,
} from "vue";
// import {desk} from "electron"
import socket from "./utils/socket";
import { getRandomSixNum } from "./utils";
import { ipcRenderer } from "electron";
import { handleStream } from "./samples/util";
// import useStream from "./utils/stream";
const form: Ref<any> = ref({
  id: "",
});
const userId: Ref<any> = ref(null);
const STUNconfig: Ref<any> = ref({
  iceServers: [{ url: "stun:stun.l.google.com:19302" }],
  configuration: {
    offerToReceiveAudio: true,
    offerToReceiveVideo: true,
  },
  sdpSemantics: "unified-plan",
});
const myStream = getCurrentInstance()?.appContext.config.globalProperties;
console.warn("创建RTCPeerConnection对象");
const PeerConnection =
  window.RTCPeerConnection ||
  window.mozRTCPeerConnection ||
  window.webkitRTCPeerConnection;
// const peer = new PeerConnection();
let pc: any = new PeerConnection({
  ...STUNconfig.value,
  // sdpSemantics: "unified-plan",
});
const offerOption: any = ref({
  offerToReceiveAudio: true,
  offerToReceiveVideo: true,
});
const RTCStatus = ref(false);
let sendChannel: any;
let remoteChannel: any;
const localId: any = ref(null);
onBeforeMount(() => {
  console.warn(window.location, "myStream");
  initLocalId();
});

onMounted(() => {
  socket.emit("send_my_content", { id: localId.value });
  socket.on("receiveAnswer", async (answer: any) => {
    let { type, sdp } = answer;
    // let myOffer = new RTCSessionDescription({ type, sdp });
    // console.warn("收到answer", myOffer);
    // console.warn("请求方触发setRemoteDescription");
    // setTimeout(() => {
    pc.setRemoteDescription(answer);
    // }, 3000);
    // await
  });
  socket.on("receiveOffer", async ({ id, offer }: any) => {
    pc.ondatachannel = function (event) {
      console.warn("收到data");
      remoteChannel = event.channel;
      remoteChannel.onopen = function (event) {
        // remoteChannel.send("Hi back!");
      };
      remoteChannel.onmessage = function (event) {
        let data = JSON.parse(event.data);
        ipcRenderer.send("robot", data);
        console.log(data);
        // let { type, status } = data;
        // if (type === "send-robot" && status === 1) {
        //   ipcRenderer.send("robot");
        // }
      };
    };
    userId.value = id;
    let { type, sdp } = offer;
    let myOffer = new RTCSessionDescription({ type, sdp });
    // console.warn("收到offer", myOffer);

    //改动成Track
    let key: any = {
      mandatory: {
        chromeMediaSource: "desktop",
        chromeMediaSourceId: myStream.$myStream,
      },
    };
    const stream = await navigator.mediaDevices.getUserMedia({
      video: key,
      audio: false,
    });
    for (const track of stream.getTracks()) {
      await pc.addTrack(track, stream);
    }
    // console.warn("触发被请求方的setRemoteDescription");
    await pc.setRemoteDescription(myOffer);
    // console.warn("生成answer");
    const answer = await pc.createAnswer();
    socket.emit("receiveAnswer", { answer, id });
    // console.warn("触发被请求方的setLocalDescription");
    await pc.setLocalDescription(answer);
  });

  socket.on("icecandidate", async (iceCandidate: any) => {
    if (iceCandidate) {
      const a = new RTCIceCandidate({
        sdpMLineIndex: iceCandidate.label,
        candidate: iceCandidate.candidate,
      });
      // console.warn("收到icecandidate", a);
      await pc.addIceCandidate(a);
    }
  });

  window.onbeforeunload = () => {
    socket.emit("userLeave", {
      id: form.value.id,
    });
  };

  pc.onicecandidate = (e: any) => {
    // console.warn("candidate", e);
    if (e.candidate) {
      // if (check) return;
      // console.warn("candidate有", e);
      socket.emit("icecandidate", {
        iceCandidate: {
          label: e.candidate.sdpMLineIndex,
          candidate: e.candidate.candidate,
        },
        id: form.value.id || userId.value,
      });
    } else {
      RTCStatus.value = true;
      addEventListener();
      // sendChannel.send({type:'set-robot',status:1})
      // console.warn("candidate无", e);
    }
  };
  pc.onicegatheringstatechange = (e) => {
    console.warn("onicegatheringstatechange", e);
  };
  pc.ontrack = (e) => {
    console.warn(e.streams, "onTrack");
    var video: any = document.getElementById("video");
    // document.appendChild(video);
    video.onloadedmetadata = (e: any) => {
      // console.warn("触发播放");
      video.play();
    };
    video.srcObject = e.streams[0];

    // handleStream(e.streams[0]);
  };
});
const addEventListener = () => {
  if (RTCStatus && userId.value) {
    let video: any = document.querySelector("#video");
    let param = {
      x: null,
      y: null,
      type: null,
    };
    video.onclick = function (e) {
      console.log("鼠标单击", e);
      param = {
        x: e.offsetX,
        y: e.offsetY,
        type: "click",
      };
      sendChannel.send(JSON.stringify(param));
    };
    video.oncontextmenu = function (e) {
      console.log("鼠标右键单击");
    };
    video.onmousewheel = function (e) {
      console.log("鼠标滚动");
    };
    video.onmousedown = function (e) {
      console.log("鼠标按下");
    };
    video.onmouseup = function (e) {
      console.log("鼠标抬起");
    };
    // video.onmousemove = function (e) {
    //   console.log("鼠标移动");
    // };
    // video.onmouseover = function (e) {
    //   console.log("鼠标移入");
    // };
    // video.onmouseout = function (e) {
    //   console.log("鼠标移出");
    // };
    // video.onmouseenter = function (e) {
    //   console.log("鼠标移入");
    // };
    // video.onmouseleave = function (e) {
    //   console.log("鼠标移出");
    // };
  }
};
//初始化获取本地Id
const initLocalId = () => {
  localId.value = getRandomSixNum();
  localStorage.setItem("localId", localId.value);
};
function SendChannelStateChange(e) {
  console.warn("触发sendChannel事件");
  sendChannel.send("Hi you!");
  // this.sendChannelState = this.sendChannel.readyState
  console.log("send channel state change", e);
}

//点击连接事件
const submit = async () => {
  //设置Channel通道
  sendChannel = await pc.createDataChannel("webrtc-datachannel");
  sendChannel.onopen = SendChannelStateChange;
  sendChannel.onclose = SendChannelStateChange;
  userId.value = form.value.id;
  let key: any = {
    mandatory: {
      chromeMediaSource: "desktop",
      chromeMediaSourceId: myStream.$myStream,
    },
  };
  const stream = await navigator.mediaDevices.getUserMedia({
    video: key,
    audio: false,
  });
  for (const track of stream.getTracks()) {
    // console.warn("key");
    await pc.addTrack(track, stream);
  }
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  const data = {
    id: form.value.id,
    offer,
    m_id: localId.value,
  };
  console.warn(data);
  socket.emit("receiveOffer", data);
};

const open = () => {
  ipcRenderer.send("open_new_win");
};
const testLocal = async () => {
  let key: any = {
    mandatory: {
      chromeMediaSource: "desktop",
      chromeMediaSourceId: myStream.$myStream,
    },
  };
  const stream = await navigator.mediaDevices.getUserMedia({
    video: key,
    audio: false,
  });
  // console.warn(myStream.$myStream, "steams");
  handleStream(stream);
};
</script>

<template>
  <div @click="open">多开窗口</div>
  <div @click="testLocal">测试本地</div>
  <div>
    <span>本地ID：</span>
    <span>{{ localId }}</span>
  </div>
  <div>
    <span>远程连接ID：</span>
    <input v-model="form.id" />
  </div>
  <div>
    <button @click="submit">提交</button>
  </div>
  <video id="video"></video>
  <!-- <video id="other"></video> -->
  <!-- <video id="video-other" ></video> -->
</template>

<style>
#video {
  display: block;
}
* {
  margin: 0;
  padding: 0;
}
</style>
