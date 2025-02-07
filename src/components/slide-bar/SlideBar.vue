<template>
  <div
    ref="wrap"
    :id="id"
    class="vue-slide-bar-component vue-slide-bar-horizontal"
    :style="calculateHeight"
    @click="wrapClick">
    <div
      ref="elem"
      class="vue-slide-bar"
      :style="{
        height: `${lineHeight}px`
      }"
    >
      <template>
        <div
          ref="tooltip"
          class="vue-slide-bar-always vue-slide-bar-tooltip-container"
          :style="{'width': `${iconWidth}px`}"
          @mousedown="moveStart"
          @touchstart="moveStart"
        >
          <span
            v-if="showTooltip"
            class="vue-slide-bar-tooltip-top vue-slide-bar-tooltip-wrap"
          >
            <slot name="tooltip">
              <span
                :style="tooltipStyles"
                class="vue-slide-bar-tooltip"
              >
                {{ val }}
              </span>
            </slot>
          </span>
        </div>
      </template>
      <div
        ref="process"
        :style="processStyle"
        class="vue-slide-bar-process"
      />
    </div>
    <div
      v-if="range"
      class="vue-slide-bar-range"
    >
      <div
        v-for="(r, index) in range"
        :key="SlideBar"
        class="vue-slide-bar-separate"
        :style="dataLabelStyles"
      >
        <span
          v-if="!r.isHide"
          class="vue-slide-bar-separate-text"
        >
          {{ r.label }}
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'slide-bar',
  data () {
    return {
      flag: false,
      size: 0,
      currentValue: 0,
      currentSlider: 0,
      isComponentExists: true,
      interval: 1,
      lazy: false,
      realTime: false,
      dataLabelStyles: {
        'color': '#4a4a4a',
        'font-family': 'Arial, sans-serif',
        'font-size': '12px',
        ...this.$props.labelStyles
      }
    }
  },
  props: {
    data: {
      type: Array,
      default: null
    },
    id: {
      type: String,
      default: 'wrap'
    },
    range: {
      type: Array,
      default: null
    },
    speed: {
      type: Number,
      default: 0.5
    },
    lineHeight: {
      type: Number,
      default: 5
    },
    iconWidth: {
      type: Number,
      default: 20
    },
    value: {
      type: [String, Number],
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    showTooltip: {
      type: Boolean,
      default: true
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    draggable: {
      type: Boolean,
      default: true
    },
    paddingless: {
      type: Boolean,
      default: false
    },
    tooltipStyles: Object,
    labelStyles: Object,
    processStyle: Object
  },
  computed: {
    slider () {
      return this.$refs.tooltip
    },
    val: {
      get () {
        return this.data ? this.data[this.currentValue] : this.currentValue
      },
      set (val) {
        if (this.data) {
          let index = this.data.indexOf(val)
          if (SlideBar > -1) {
            this.currentValue = SlideBar
          }
        } else {
          this.currentValue = val
        }
      }
    },
    currentIndex () {
      return (this.currentValue - this.minimum) / this.spacing
    },
    indexRange () {
      return [0, this.currentIndex]
    },
    minimum () {
      return this.data ? 0 : this.min
    },
    maximum () {
      return this.data ? (this.data.length - 1) : this.max
    },
    multiple () {
      let decimals = `${this.interval}`.split('.')[1]
      return decimals ? Math.pow(10, decimals.length) : 1
    },
    spacing () {
      return this.data ? 1 : this.interval
    },
    total () {
      if (this.data) {
        return this.data.length - 1
      } else if (Math.floor((this.maximum - this.minimum) * this.multiple) % (this.interval * this.multiple) !== 0) {
        this.printError('[VueSlideBar error]: Prop[interval] is illegal, Please make sure that the interval can be divisible')
      }
      return (this.maximum - this.minimum) / this.interval
    },
    gap () {
      return this.size / this.total
    },
    position () {
      return ((this.currentValue - this.minimum) / this.spacing * this.gap)
    },
    limit () {
      return [0, this.size]
    },
    valueLimit () {
      return [this.minimum, this.maximum]
    },
    calculateHeight () {
      return this.paddingless ? {} : { 'padding-top': '40px', 'min-height': this.range ? '100px' : null }
    }
  },
  watch: {
    value (val) {
      if (this.flag) this.setValue(val)
      else this.setValue(val, this.speed)
    },
    max (val) {
      if (val < this.min) {
        return this.printError('[VueSlideBar error]: The maximum value can not be less than the minimum value.')
      }
      let resetVal = this.limitValue(this.val)
      this.setValue(resetVal)
      this.refresh()
    },
    min (val) {
      if (val > this.max) {
        return this.printError('[VueSlideBar error]: The minimum value can not be greater than the maximum value.')
      }
      let resetVal = this.limitValue(this.val)
      this.setValue(resetVal)
      this.refresh()
    }
  },
  methods: {
    bindEvents () {
      document.addEventListener('touchmove', this.moving, {passive: false})
      document.addEventListener('touchend', this.moveEnd, {passive: false})
      document.addEventListener('mousemove', this.moving)
      document.addEventListener('mouseup', this.moveEnd)
      document.addEventListener('mouseleave', this.moveEnd)
      window.addEventListener('resize', this.refresh)
    },
    unbindEvents () {
      window.removeEventListener('resize', this.refresh)
      document.removeEventListener('touchmove', this.moving)
      document.removeEventListener('touchend', this.moveEnd)
      document.removeEventListener('mousemove', this.moving)
      document.removeEventListener('mouseup', this.moveEnd)
      document.removeEventListener('mouseleave', this.moveEnd)
    },
    getPos (e) {
      this.realTime && this.getStaticData()
      return e.clientX - this.offset
    },
    wrapClick (e) {
      if (this.isDisabled || (!this.draggable && e.target.id === this.id)) return false
      let pos = this.getPos(e)
      this.setValueOnPos(pos)
    },
    moveStart (e, index) {
      if (!this.draggable) return false
      this.flag = true
      this.$emit('dragStart', this)
    },
    moving (e) {
      if (!this.flag || !this.draggable) return false
      e.preventDefault()
      if (e.targetTouches && e.targetTouches[0]) e = e.targetTouches[0]
      this.setValueOnPos(this.getPos(e), true)
    },
    moveEnd (e) {
      if (this.flag && this.draggable) {
        this.$emit('dragEnd', this)
        if (this.lazy && this.isDiff(this.val, this.value)) {
          this.syncValue()
        }
      } else {
        return false
      }
      this.flag = false
      this.setPosition()
    },
    setValueOnPos (pos, isDrag) {
      let range = this.limit
      let valueRange = this.valueLimit
      if (pos >= range[0] && pos <= range[1]) {
        this.setTransform(pos)
        let v = (Math.round(pos / this.gap) * (this.spacing * this.multiple) + (this.minimum * this.multiple)) / this.multiple
        this.setCurrentValue(v, isDrag)
      } else if (pos < range[0]) {
        this.setTransform(range[0])
        this.setCurrentValue(valueRange[0])
        if (this.currentSlider === 1) this.currentSlider = 0
      } else {
        this.setTransform(range[1])
        this.setCurrentValue(valueRange[1])
        if (this.currentSlider === 0) this.currentSlider = 1
      }
    },
    isDiff (a, b) {
      if (Object.prototype.toString.call(a) !== Object.prototype.toString.call(b)) {
        return true
      } else if (Array.isArray(a) && a.length === b.length) {
        return a.some((v, i) => v !== b[i])
      }
      return a !== b
    },
    setCurrentValue (val, bool) {
      if (val < this.minimum || val > this.maximum) return false
      if (this.isDiff(this.currentValue, val)) {
        this.currentValue = val
        if (!this.lazy || !this.flag) {
          this.syncValue()
        }
      }
      bool || this.setPosition()
    },
    setIndex (val) {
      val = this.spacing * val + this.minimum
      this.setCurrentValue(val)
    },
    setValue (val, speed) {
      if (this.isDiff(this.val, val)) {
        this.val = this.limitValue(val)
        this.syncValue()
      }
      this.$nextTick(() => this.setPosition(speed))
    },
    setPosition (speed) {
      if (!this.flag) this.setTransitionTime(speed === undefined ? this.speed : speed)
      else this.setTransitionTime(0)
      this.setTransform(this.position)
    },
    setTransform (val) {
      let value = val - ((this.$refs.tooltip.scrollWidth - 2) / 2)
      let translateValue = `translateX(${value}px)`
      this.slider.style.transform = translateValue
      this.slider.style.WebkitTransform = translateValue
      this.slider.style.msTransform = translateValue
      this.$refs.process.style.width = `${val}px`
      this.$refs.process.style['left'] = 0
    },
    setTransitionTime (time) {
      this.slider.style.transitionDuration = `${time}s`
      this.slider.style.WebkitTransitionDuration = `${time}s`
      this.$refs.process.style.transitionDuration = `${time}s`
      this.$refs.process.style.WebkitTransitionDuration = `${time}s`
    },
    limitValue (val) {
      if (this.data) {
        return val
      }
      const inRange = (v) => {
        if (v < this.min) {
          this.printError(`[VueSlideBar warn]: The value of the slider is ${val}, the minimum value is ${this.min}, the value of this slider can not be less than the minimum value`)
          return this.min
        } else if (v > this.max) {
          this.printError(`[VueSlideBar warn]: The value of the slider is ${val}, the maximum value is ${this.max}, the value of this slider can not be greater than the maximum value`)
          return this.max
        }
        return v
      }
      return inRange(val)
    },
    syncValue () {
      let val = this.val
      if (this.range) {
        this.$emit('callbackRange', this.range[this.currentIndex])
      }
      this.$emit('input', val)
    },
    getValue () {
      return this.val
    },
    getIndex () {
      return this.currentIndex
    },
    getStaticData () {
      if (this.$refs.elem) {
        this.size = this.$refs.elem.offsetWidth
        this.offset = this.$refs.elem.getBoundingClientRect().left
      }
    },
    refresh () {
      if (this.$refs.elem) {
        this.getStaticData()
        this.setPosition()
      }
    },
    printError (msg) {
      console.error(msg)
    }
  },
  mounted () {
    this.isComponentExists = true
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return this.printError('[VueSlideBar error]: window or document is undefined, can not be initialization.')
    }
    this.$nextTick(() => {
      if (this.isComponentExists) {
        this.getStaticData()
        this.setValue(this.limitValue(this.value), 0)
        this.bindEvents()
      }
    })
  },
  beforeDestroy () {
    this.isComponentExists = false
    this.unbindEvents()
  }
}
</script>

<style lang="less" scoped>
  @import "./slidebar";
</style>
