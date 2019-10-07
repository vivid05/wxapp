// components/swiper/swiper.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    arrar:{
      type:Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    current:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindchange(e){
      this.setData({ current: e.detail.current}) 
    },
    getcurrent(e){
      let current={current:this.data.current}
      this.triggerEvent('getcurrent', current)
    }
  }
})
