<template>
  <div @click.stop>
    <span class="input-number-decrement" @click.stop="updateValue(false)" :class="{'is-disabled': minDisabled}">–</span>
    <input class="input-number" type="number" :value="value" min="0" max="10" @input="handleChange" @change="handleChange" ref="input">
    <span class="input-number-increment" @click.stop="updateValue(true)">+</span>
  </div>
</template>
<script>
export default {
  methods: {
    updateValue(isIncrement) {
      if (!isIncrement && Number(this.value) === 0) return
      this.$emit('update:value', isIncrement ? this.value + 1 : this.value - 1)
    },
    handleChange(event) {
      this.$emit('update:value', Number(event.target.value))
    }
  },
  computed: {
    minDisabled() {
      return Number(this.value) - 1 < 0
    }
  },
  props: {
    value: {
      type: Number,
      default: false
    }
  }
}
</script>
<style lang="less" scoped>
.is-disabled {
  color: #c0c4cc;
  cursor: not-allowed;
}
.input-number {
  width: 24px;
  margin-left: -4px;
  padding: 0 8px;
  vertical-align: top;
  text-align: center;
  outline: none;
}

.input-number,
.input-number-decrement,
.input-number-increment {
  border: 1px solid #ccc;
  height: 24px;
  user-select: none;
}

.input-number-decrement,
.input-number-increment {
  display: inline-block;
  width: 24px;
  line-height: 23px;
  background: #f1f1f1;
  color: #444;
  text-align: center;
  font-weight: bold;
  cursor: pointer;
}
.input-number-decrement:active,
.input-number-increment:active {
  background: #ddd;
}

.input-number-decrement {
  border-right: none;
  border-radius: 4px 0 0 4px;
}

.input-number-increment {
  margin-left: -4px;
  border-left: none;
  border-radius: 0 4px 4px 0;
}
</style>
