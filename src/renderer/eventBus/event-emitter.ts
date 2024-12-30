/* eslint-disable*/
class EventEmitter {
  public listener : any
  constructor() {
      // 缓存列表
      this.listener = {}
  }

  // 订阅
  on(eventName: string, fn: Function) {
      if(!(this.listener as any)[eventName]){
          this.listener[eventName] = []
      }
      this.listener[eventName].push(fn)
  }

  // 取消订阅
  off(eventName: string, fn?: Function) {
      let callbacks = this.listener[eventName]
      // 缓存列表中没有对应的fn，返回false
      if(!callbacks){
          return false
      }
      if(!fn){
          // 如果未传入fn，则将缓存列表中对应的fn都清空
          callbacks && (callbacks.length = 0)
      } else {
          let cb;
          for (let i = 0, cbLen = callbacks.length; i < cbLen; i++) {
              cb = callbacks[i];
              if (cb == fn || cb.fn == fn) {
                  callbacks.splice(i, 1)
                  break
              }
          }
      }
  }

  // 发布
  emit(eventName: string, data?: any) {
      const callbacks = this.listener[eventName]
      if(callbacks) {
          callbacks.forEach((cb: Function) => {
              cb(data)
          })
      }
  }
}

export default new EventEmitter()