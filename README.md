## 1、安装依赖
```
yarn install
```
**Having issues installing? See our [debugging guide](https://github.com/electron-react-boilerplate/electron-react-boilerplate/issues/400)**

### 问题汇总
node-gyp安装过程会偶现失败，尝试修改.npmrc配置文件  
``` 
electron_builder_binaries_mirror=https://npmmirror.com/mirrors/electron-builder-binaries/  
electron_mirror=https://cdn.npmmirror.com/binaries/electron/     
home=https://npmmirror.com     
registry=https://registry.npmmirror.com/
strict-ssl=false
```


## 2、开发调试
```
yarn start  #开发环境
```

## 3、构建打包
```
yarn package #生产环境
```

## 4、模板官方文档
https://electron-react-boilerplate.js.org/docs/installation
