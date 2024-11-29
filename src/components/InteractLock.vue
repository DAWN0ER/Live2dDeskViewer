<template>
    <div class="lock" ref="lockdiv" @mouseover="over" @mouseleave="leave" @click="lockOnOff">
        <svg v-if="lock" t="1732851177052" class="icon" viewBox="0 0 1024 1024" version="1.1"
            xmlns="http://www.w3.org/2000/svg" p-id="17779" width="48" height="48">
            <path
                d="M768 64l-128 0c-105.87 0-192 86.13-192 192l0 192L48 448c-26.4 0-48 21.6-48 48l0 480c0 26.4 21.6 48 48 48l544 0c26.4 0 48-21.6 48-48L640 496c0-26.4-21.6-48-48-48l-16 0 0-192c0-35.29 28.71-64 64-64l128 0c35.29 0 64 28.71 64 64l0 192 128 0 0-192C960 150.13 873.87 64 768 64zM384 896l-128 0 27.84-139.2C267.032 745.268 256 725.926 256 704c0-35.346 28.654-64 64-64 35.346 0 64 28.654 64 64 0 21.926-11.032 41.268-27.84 52.8L384 896z"
                fill="#f69bd6" p-id="17780"></path>
        </svg>
        <svg v-else t="1732852112972" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="2684" width="48" height="48">
            <path
                d="M786 414l-16 0 0-192c0-105.87-86.13-192-192-192l-128 0c-105.87 0-192 86.13-192 192l0 192-16 0c-26.4 0-48 21.6-48 48l0 480c0 26.4 21.6 48 48 48l544 0c26.4 0 48-21.6 48-48L834 462C834 435.6 812.4 414 786 414zM578 862l-128 0 27.84-139.2C461.032 711.268 450 691.926 450 670c0-35.346 28.654-64 64-64s64 28.654 64 64c0 21.926-11.032 41.268-27.84 52.8L578 862zM642 414 386 414l0-192c0-35.29 28.71-64 64-64l128 0c35.29 0 64 28.71 64 64L642 414z"
                p-id="2685" fill="#f69bd6"></path>
        </svg>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { ipcRenderer } from 'electron';

let lock = ref(false);
const lockdiv = ref<HTMLDivElement>();

const emits = defineEmits(['lockOnOff'])

const over = () => {
    ipcRenderer.send('enable-mouse', true);
}

const leave = () => {
    ipcRenderer.send('enable-mouse', false);
}

const lockOnOff = () => {
    lock.value = !lock.value
    emits('lockOnOff',lock.value)
}
</script>

<style>
.lock {
    position: absolute;
    right: 25%;
    top: 15%;
    cursor: pointer;
    user-select: none;
    height: 32px;
    width: 32px;
    pointer-events: auto;
}
</style>