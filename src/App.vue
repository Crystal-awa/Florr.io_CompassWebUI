<template>
  <link href="https://static.florr.io/3fd3a6c707c5ab36fa901ae4d5d09274f936be28/Ubuntu-B.ttf" rel="stylesheet">
  <div class="header">
    <span class="SuperPing">SuperPing</span>
    <button class="button" @click="changeRegion('US')" :style="{ color: getRegion('US') ? 'red' : 'black' }">US</button>
    <button class="button" @click="changeRegion('EU')" :style="{ color: getRegion('EU') ? 'red' : 'black' }">EU</button>
    <button class="button" @click="changeRegion('AS')" :style="{ color: getRegion('AS') ? 'red' : 'black' }">AS</button>
    <span class = "flex"></span>
    <button class="button" @click="language='chinese'" :style="{ color: language === 'chinese' ? 'red' : 'black' }">中文</button>
    <button class="button" @click="language='english'" :style="{ color: language === 'english' ? 'red' : 'black' }">English</button>
    <span class="status-text" :style="{ color: statusColor }">{{ onlineStatus ? "Online" : "Offline"}}</span>
  </div>
  <div class="container">
    <div class="row">
      <div
          v-for="(card) in filteredCards"
          :key="card.id"
          class="card"
      >
        <div class="super">
          <img
              :src="card.super"
              alt="super" class="img"
          >
        </div>
        <div class="title">
          <span class="region">{{ card.region }}</span>
          <span class="time">[{{ card.time }}]</span>
        </div>
        <div class="info">
          <span class="report" :style="{'font-size': language==='chinese' ? '12px' : '14px'}">{{ card.report }}</span>
        </div>
      </div>
      <div class="addCard" v-if="hasMore" @click="sendMessage('get_history')">
        <span class="add" :style="{'font-size': language==='chinese' ? '30px' : '20px'}">{{ language === 'chinese' ? '加载历史消息' : 'Load history messages' }}</span>
      </div>
    </div>
  </div>
  <span class="marker">Made by 可爱猫娘</span>
</template>

<script setup lang="ts">
import {statusColor, onlineStatus, filteredCards, language, changeRegion, getRegion, sendMessage, hasMore} from "./superping"
</script>

<style>
@font-face {
  font-family: 'Ubuntu-B';
  src: url("https://static.florr.io/3fd3a6c707c5ab36fa901ae4d5d09274f936be28/Ubuntu-B.ttf") format('truetype');
}
body {
  min-height: 100vh;
  margin: 0;
  padding: 0;
  background: linear-gradient(135deg, #a0e9ff, #ffe0f0);
  overflow: hidden;
}
.container {
  padding-top: 50px;
}
.card{
  display: flex;
  width: 300px;
  height: 100px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.3);
  box-sizing: border-box;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  margin-top: 10px;
  margin-bottom: 10px;
  transition: transform 0.3s ease;
  animation: cardEnter 0.5s;
}
.super{
  display: flex;
  align-items: center;
}
.title{
  display: flex;
  position: relative;
  flex: 1;
  font-size: 14px;
  margin-left: 6px;
  margin-top: 5px;
  font-family: 'Ubuntu-B',serif;
}
.img{
  width: 65px;
  height: 65px;
  margin-left: 8px;
}
.time{
  position: absolute;
  text-align: right;
  right: 10px;
  font-family: 'Ubuntu-B',serif;
}
.info{
  position: absolute;
  font-family: 'Ubuntu-B',serif;
}
.report{
  position: absolute;
  left: 80px;
  top: 25px;
  width: 200px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  height: calc(100vh - 50px);
  width: 100%;
  overflow-y: auto;
  justify-content: center;
  align-content: flex-start;
  gap: 0 70px;
}

.header{
  display: flex;
  position: fixed;
  width: 100%;
  height: 50px;
  background: white;
  top: 0;
  left: 0;
}
.status-text{
  display: flex;
  margin-top: 12px;
  margin-right: 15px;
  margin-left: 2px;
}
.button{
  display: flex;
  margin-right: 2px;
  align-items: center;
  border: none;
  background: none;
  font-family: "Segoe UI", "Microsoft YaHei", sans-serif;
  line-height: 1;
}
.SuperPing{
  display: flex;
  margin-left: 6px;
  margin-top: 12px;
  margin-right: 5px;
}
.flex{
  flex: 1;
}
.button:hover{
  color: red;
}
.card:hover{
  transform: scale(1.05);
}
@keyframes cardEnter {
  from{
    transform: scale(0);
  }
  to{
    transform: scale(1);
  }
}
.marker{
  display: flex;
  position: absolute;
  left: 0;
  bottom: 0;
  margin: 0;
}
.addCard{
  display: flex;
  width: 300px;
  height: 100px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 5px dashed rgba(255, 255, 255, 0.3);
  box-sizing: border-box;
  margin-top: 10px;
  margin-bottom: 10px;
  transition: transform 0.3s ease;
  animation: cardEnter 0.5s;
}
.addCard:hover{
  transform: scale(1.05);
}
.add{
  display: flex;
  position: relative;
  margin: auto;
  font-size: 30px;
}
p{
  user-select: none;
  cursor: default;
}
</style>