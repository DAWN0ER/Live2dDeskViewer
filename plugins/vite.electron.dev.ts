// 开发环境插件
import { AddressInfo } from "net";
import { Plugin } from "vite";
import { spawn } from "child_process";
import fs from 'node:fs'

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

// 导出插件
export const ElectronDevPlugin = (): Plugin => {
    return {
        name: 'ElectronDevPlugin',
        configureServer(server) {
            buildBackground()

            server?.httpServer?.on('listening', () => {
                // 读取 vite 服务的信息
                const addressInfo: AddressInfo = server.httpServer?.address() as AddressInfo
                // console.log(addressInfo)
                // 给 electron 使用
                const IP = `http://localhost:${addressInfo.port}`
                let electron = spawn(require('electron'), ['dist/background.js', IP])
                fs.watchFile('src/background.ts', () => {
                    electron.kill()
                    buildBackground()
                    electron = spawn(require('electron'), ['dist/background.js', IP])
                })
                electron.stderr.on('data',(data)=>{
                    console.log('[LOG]',data.toString())
                })
                console.log(IP)
            })
        }
    }
}