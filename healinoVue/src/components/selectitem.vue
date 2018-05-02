<template>
  <div class="pd-select-item">
    <div class="pd-select-line"></div>
    <div class="pd-select-list">
      <ul class="pd-select-ul" ref="list">
        <li class="pd-select-list-item" v-for="el,index in renderData " :class="{'hidden':setHidden(el.index)}" :key="index">{{el.value}}</li>
      </ul>
    </div>
    <ul class="pd-select-wheel" ref="wheel">
      <li class="pd-select-wheel-item" :class="{'hidden':setHidden(el.index)}" :style="setWheelItemDeg(el.index)" :index="el.index" v-for="el,index in renderData " :key="index">{{el.value}}</li>
    </ul>
    <div class="nocolorActive" v-on:click="changeSelectColor(-2)"></div>
    <div class="nocolorActive" v-on:click="changeSelectColor(-1)"></div>
    <div class="nocolorActive" v-on:click="changeSelectColor(0)"></div>
    <div class="nocolorActive" v-on:click="changeSelectColor(1)"></div>
    <div class="nocolorActive" v-on:click="changeSelectColor(2)"></div>
  </div>
</template>
<script>
  /**
   * Created by k186 on 2017/5/3.
   * gitHub: https://github.com/k186/iosSelect
   */

  /*
   * selectItem components
   *
   * @param value {String} current select value or init value
   * @param listData {Array} loop array value
   * @param type {String} 'cycle' ,default 'line'
   *
   * */
  export default{
    name: 'pdSelectItem',
    data () {
      return {
        spin: {start: -9, end: 9, branch: 9},
        finger: {startY: 0, lastY: 0, startTime: 0, lastTime: 0, transformY: 0}
      }
    },
    props: {
      listData: {
        type: Array,
        required: true
      },
      type: {
        type: String,
        default: 'line'
      },
      value: {}
    },
    computed: {
      renderData () {
        let temp = []
        for (let k = this.spin.start; k <= this.spin.end; k++) {
          let data = {
            value: this.getSpinData(k),
            index: k
          }
          temp.push(data)
        }
        return temp
      }
    },
    mounted () {
      this.$el.addEventListener('touchstart', this.itemTouchStart)
      this.$el.addEventListener('touchmove', this.itemTouchMove)
      this.$el.addEventListener('touchend', this.itemTouchEnd)
      this.$el.addEventListener('mousewheel', this.mousewheel)
      //let index = this.listData.indexOf(this.value)
      let index = this.value
      if (index === -1) {
        this.setListTransform()
        this.getPickValue(0)
      } else {
        let move = index * 34
        this.setStyle(-move)
        this.setListTransform(-move, -move)
      }
    },
    methods: {
      changeSelectColor(w){
        let ret = this.value;
        if(w==-2 && ret>1){
          ret-=2;
        }else if((w==-1 && ret>0)||(w==-2 && ret==1)){
          ret--;
        }else if(w==1 && ret<this.listData.length-1){
          ret++;
        }else if(w==2 && ret<this.listData.length-2){
          ret+=2;
        }else if(w==2 && ret<this.listData.length-1){
          ret++;
        }
        this.$emit('input', ret);
        this.$emit('close');
        this.showSelectId = false;
      },
      setHidden (index) {
        if (this.type === 'line') {
          return index < 0 || index > this.listData.length - 1
        } else {
          return false
        }
      },
      setWheelItemDeg (index) {
        return {
          transform: `rotate3d(1, 0, 0, ${-index * 20 % 360}deg) translate3d(0px, 0px, 100px)`
        }
      },
      setWheelDeg (updateDeg, type, time = 1000) {
        if (type === 'end') {
          this.$refs.wheel.style.webkitTransition = `transform ${time}ms cubic-bezier(0.19, 1, 0.22, 1)`
          this.$refs.wheel.style.webkitTransform = `rotate3d(1, 0, 0, ${updateDeg}deg)`
        } else {
          this.$refs.wheel.style.webkitTransition = ''
          this.$refs.wheel.style.webkitTransform = `rotate3d(1, 0, 0, ${updateDeg}deg)`
        }
      },
      setListTransform (translateY = 0, marginTop = 0, type, time = 1000) {
        if (type === 'end') {
          this.$refs.list.style.webkitTransition = `transform ${time}ms cubic-bezier(0.19, 1, 0.22, 1)`
          this.$refs.list.style.webkitTransform = `translateY(${translateY - this.spin.branch * 34}px)`
          this.$refs.list.style.marginTop = `${-marginTop}px`
          this.$refs.list.setAttribute('scroll', translateY)
        } else {
          this.$refs.list.style.webkitTransition = ''
          this.$refs.list.style.webkitTransform = `translateY(${translateY - this.spin.branch * 34}px)`
          this.$refs.list.style.marginTop = `${-marginTop}px`
          this.$refs.list.setAttribute('scroll', translateY)
        }
      },
      itemTouchStart (event) {
        let finger = event.changedTouches[0]
        this.finger.startY = finger.pageY
        this.finger.startTime = event.timestamp || Date.now()
        this.finger.transformY = this.$refs.list.getAttribute('scroll')
        //event.preventDefault()
      },
      itemTouchMove (event) {
        let finger = event.changedTouches[0]
        this.finger.lastY = finger.pageY
        this.finger.lastTime = event.timestamp || Date.now()
        let move = this.finger.lastY - this.finger.startY
        this.setStyle(move)
        event.preventDefault()
      },
      mousewheel (event) {
        this.finger.startY = 0
        this.finger.transformY = this.$refs.list.getAttribute('scroll')
        this.finger.lastY = event.wheelDelta/3
        this.finger.lastTime = event.timestamp || Date.now()
        let move = event.wheelDelta/12
        let time = 100
        let v = move / time
        let a = 1.8
        if (time <= 300) {
          move = v * a * time
          time = 1000 + time * a
          this.setStyle(move, 'end', time)
        } else {
          this.setStyle(move, 'end')
        }
        event.preventDefault()
      },
      itemTouchEnd (event) {
        let finger = event.changedTouches[0]
        this.finger.lastY = finger.pageY
        this.finger.lastTime = event.timestamp || Date.now()
        let move = this.finger.lastY - this.finger.startY
        let time = this.finger.lastTime - this.finger.startTime
        let v = move / time
        let a = 1.8
        if (time <= 300) {
          move = v * a * time
          time = 1000 + time * a
          this.setStyle(move, 'end', time)
        } else {
          this.setStyle(move, 'end')
        }
      },
      setStyle (move, type, time) {
        const singleHeight = 34
        const deg = 20
        const singleDeg = deg / singleHeight
        let currentListMove = this.finger.transformY
        let updateMove = move + Number(currentListMove)
        if (this.type === 'line') {
          if (updateMove > 0) {
            updateMove = 0
          }
          if (updateMove < -(this.listData.length - 1) * singleHeight) {
            updateMove = -(this.listData.length - 1) * singleHeight
          }
        }
        let updateDeg = -updateMove * singleDeg
        let spinAim = Math.round(updateDeg / 20)
        let margin = Math.round(updateMove / singleHeight) * singleHeight
        let endMove = margin
        let endDeg = Math.round(updateDeg / deg) * deg
        if (type === 'end') {
          this.setListTransform(endMove, margin, type, time)
          this.setWheelDeg(endDeg, type, time)
          setTimeout(() => this.getPickValue(endMove), 100)
        } else {
          this.setListTransform(updateMove, margin)
          this.setWheelDeg(updateDeg)
        }
        this.updateSpin(spinAim)
      },
      updateSpin (spinAim) {
        this.spin.start = this.spin.branch * -1 + spinAim
        this.spin.end = this.spin.start + this.spin.branch * 2
      },
      getSpinData (index) {
        index = index % this.listData.length
        return this.listData[index >= 0 ? index : index + this.listData.length]
      },
      getPickValue (move) {
        let index = Math.abs(move / 34)
        this.$emit('input', index)
      }
    },
    beforeDestroy () {
      this.$el.removeEventListener('touchstart', this.itemTouchStart)
      this.$el.removeEventListener('touchmove', this.itemTouchMove)
      this.$el.removeEventListener('touchend', this.itemTouchEnd)
      this.$el.removeEventListener('mousewheel', this.mousewheel)
    }
  }
</script>
<style lang="scss" scoped rel="stylesheet/scss">
  $color-background: #fff;
  $color-checked: #2c97f1;
  $color-text-main: #827d7e;
  $color-text-second: #a8a8a8;
  .pd {
    &-select {
      &-item {
        overflow: hidden;
        width: 100%;
        text-align: center;
        height: 150px;
        background: $color-background;
        position: relative;
      }
      &-ul {
        position: relative;
        display: none;
      }
      &-line, &-list, &-wheel {
        position: absolute;
        left: 0;
        right: 0;
        top: 60px;
      }
      &-line {
        z-index: 3;
      }
      &-list {
        z-index: 2;
        background-color: rgb(197, 233, 196);
        opacity: 0.43;
      }
      &-wheel {
        z-index: 1;
      }
      &-line, &-list {
        height: 34px;
        transform: translate3d(0px, 0px, 110px);
      }
      &-list {
        overflow: hidden;
      }
      &-list-item, &-wheel-item {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 34px;
        font-size: 18px;
        color: $color-text-main;
        &.hidden {
          visibility: hidden;
          opacity: 0;
        }
      }
      &-wheel {
        transform-style: preserve-3d;
        height: 34px;
        &-item {
          -webkit-backface-visibility: hidden;
          -moz-backface-visibility:hidden;
          backface-visibility: hidden;
          position: absolute;
          top: 0;
          width: 100%;
          color: $color-text-second;
        }
      }
    }
  }
  .nocolorActive{
    position: absolute;
    top:0;
    width: 100%;
    height: 25px;
    z-index: 100;
    &:nth-child(5){
      top: 26px;
      height: 34px;
    }
    &:nth-child(6){
      top: 60px;
      height: 34px;
    }
    &:nth-child(7){
      top: 94px;
      height: 34px;
    }
    &:nth-child(8){
      top: 125px;
    }
  }
</style>
