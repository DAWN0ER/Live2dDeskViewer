<template>
    <div ref="drag" class="draggable" @mouseover="over" @mouseleave="leave" @mousedown="dragStart" @mousemove="dragging"
        @mouseup="dragEnd"
        :style="{ top: position.y + 'px', left: position.x + 'px', height: prop.size.height, width: prop.size.width }">
        <slot name='lock'>
        </slot>
    </div>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue';
import { ipcRenderer } from 'electron';

const prop = defineProps<{
    initPos: {
        x: number,
        y: number
    },
    size: {
        width: string,
        height: string,
    },
    enableInterAct: boolean,
}>();

const drag = ref<any>();
const position = reactive({ x: prop.initPos.x, y: prop.initPos.y })

const emit = defineEmits(['overChange']);

defineExpose({
    pos: () => {
        return [position.x, position.y]
    },
})

let draggingFlag = false; // 是否正在拖拽
let startX = 0;
let startY = 0;

function dragStart(event: any) {
    draggingFlag = true;
    startX = event.clientX;
    startY = event.clientY;
}
function dragging(event: any) {
    if (draggingFlag) {
        const deltaX = event.clientX - startX;
        const deltaY = event.clientY - startY;
        position.x += deltaX;
        position.y += deltaY;
        startX = event.clientX;
        startY = event.clientY;
    }
}
function dragEnd() {
    draggingFlag = false;
}


const over = () => {
    emit('overChange',true);
    if (prop.enableInterAct) {
        ipcRenderer.send('enable-mouse', true);
    }
}

const leave = () => {
    emit('overChange',false);
    if (prop.enableInterAct) {
        ipcRenderer.send('enable-mouse', false);
    }
}

</script>

<style scoped>
.draggable {
    display: flex;
    /* flex-direction: column; */
    cursor: pointer;
    position: absolute;
    width: 200px;
    height: 200px;
    background-color: transparent;
    /* background-color: aquamarine; */
    user-select: none;
    pointer-events: all;
}
</style>