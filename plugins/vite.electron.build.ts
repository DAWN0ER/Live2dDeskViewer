// 打包插件
import { Plugin } from "vite";
import fs from 'node:fs'
import * as electronBuild from 'electron-builder'
import path from "path";

const buildBackground = () => {
    require('esbuild').buildSync({
        entryPoints: ['src/background.ts'],
        bundle: true,
        outfile: 'dist/background.js',
        platform: 'node',
        target: 'node18',
        external: ['electron']
    });
}

export const ElectronBuildPlugin = (): Plugin => {
    return {
        name: 'ElectronBuildPlugin',
        closeBundle() {
            buildBackground();
            const json = JSON.parse(fs.readFileSync('package.json', 'utf-8'))
            json.main = 'background.js'
            fs.writeFileSync('dist/package.json', JSON.stringify(json, null, 4));
            fs.mkdirSync('dist/node_modules', { recursive: true })

            electronBuild.build({
                config: {
                    directories: {
                        output: path.resolve(process.cwd(), 'release'),
                        app: path.resolve(process.cwd(), 'dist')
                    },
                    extraResources:{
                        from: path.resolve(process.cwd(),'model'),
                        to: path.resolve(process.cwd(),'release','win-unpacked','resources','model')
                    },
                    asar: true,
                    appId: 'com.dawn.pet',
                    productName: 'live2dPet',
                    nsis: {
                        oneClick: false,
                        allowToChangeInstallationDirectory: true
                    }
                }
            })
        },
    }
}