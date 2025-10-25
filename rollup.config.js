import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'

export default {
  input: 'src/Reporter.ts', // 你的入口文件
  output: {
    file: 'lib/gaussdata.min.js', // 输出文件路径
    format: 'umd', // UMD 格式
    name: 'GaussData', // UMD 导出的全局变量名
    globals: {
      // 如果有外部依赖，在这里声明
    },
    sourcemap: false, // 可选：生成 sourcemap
  },
  plugins: [
    resolve(), // 解析 node_modules 中的模块
    commonjs(), // 将 CommonJS 模块转换为 ES6
    json(),
    typescript({
      tsconfig: 'tsconfig.json', // 指定 tsconfig 文件
      allowImportingTsExtensions: false,
      noEmit: false,
      emitDeclarationOnly: false,
      declaration: true,
    }),
    terser(),
  ],
  // 如果有外部依赖，不希望打包进 bundle，在这里声明
  external: [],
}
