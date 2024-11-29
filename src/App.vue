<script setup lang="ts">

import * as PIXI from 'pixi.js'
import { Live2DModel } from 'pixi-live2d-display';
import { ref } from 'vue';
import { onMounted } from 'vue';
import DragDiv from './components/DragDiv.vue';
import InteractLock from './components/InteractLock.vue';

declare global {
    interface Window {
        PIXI: any;
    }
}
window.PIXI = PIXI

const modelURL = '../model/椿/椿.model3.json'
const pet: any = ref();
let model: PIXI.DisplayObject & Live2DModel

let areaWidth = ref<number>(800);
let areaHeight = ref<number>(800);

// 初始化 model
async function loadM() {
    model = await Live2DModel.from(modelURL) as PIXI.DisplayObject & Live2DModel;
    console.log(model)
    let scaleRatio = 0.1;
    model.scale.set(scaleRatio, scaleRatio);
    model.x = model.width / 5;
    model.width
}

onMounted(() => {
    loadM().then(() => {
        areaHeight.value = model.height;
        areaWidth.value = model.width + model.x * 2;

        const pixiapp = new PIXI.Application({
            view: pet.value,
            width: areaWidth.value,
            height: areaHeight.value,
            autoStart: true,
            transparent: true,
            antialias: true,
        })
        pixiapp.stage.addChild(model);
    });
})

const enableInterAct = ref<boolean>(false);
const changAct = (enable:boolean)=>{
    enableInterAct.value = enable;
}

const drag = ref<any>();
const interActLock = ref<any>();

</script>

<template>
    <DragDiv ref="drag" :initPos="{ x: 800, y: 400 }" :size="{ width: areaWidth + 'px', height: areaHeight + 'px' }" :enableInterAct="enableInterAct">
        <template v-slot:lock>
            <InteractLock ref="interActLock" @lockOnOff="changAct"></InteractLock>
            <canvas ref="pet" :width="areaWidth" :height="areaHeight"></canvas>
        </template>
    </DragDiv>
</template>

<style scoped>
canvas {
    background-color: transparent;
}
#debug {
    position: absolute;
    left: 100px;
    top: 0px;
    background-color: azure;
}
</style>