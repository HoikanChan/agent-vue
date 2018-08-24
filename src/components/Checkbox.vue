<template>
  <label class="material-checkbox" @click="updateValue">
    <input type="checkbox">
    <span></span>
  </label>
</template>
<script>
export default {
  methods: {
    updateValue() {
      this.$emit('update:value', !this.value)
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="less" scoped>
@color_1: rgba(0, 0, 0, 0.87);
@font_family_1: 'Roboto', 'Segoe UI', BlinkMacSystemFont, system-ui,
  -apple-system;
@background_color_1: rgba(0, 0, 0, 0.42);
@background_color_2: #2196f3;
@background_color_3: rgba(0, 0, 0, 0.26);
@border_color_1: #2196f3;
@border_color_2: rgba(0, 0, 0, 0.26);
@border_color_3: transparent;
@border_color_4: #fff;
.material-checkbox {
  position: relative;
  display: inline-block;
  color: @color_1;
  cursor: pointer;
  font-family: @font_family_1;
  font-size: 14px;
  line-height: 18px;
  > input {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    position: absolute;
    z-index: -1;
    left: -15px;
    top: -15px;
    display: block;
    margin: 0;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    background-color: @background_color_1;
    outline: none;
    opacity: 0;
    transform: scale(1);
    -ms-transform: scale(0);
    transition: opacity 0.5s, transform 0.5s;
    &:checked {
      background-color: @background_color_2;
      &:disabled {
        & + span {
          &::before {
            border-color: @border_color_3;
            background-color: @background_color_3;
          }
        }
      }
    }
    &:disabled {
      opacity: 0;
      & + span {
        cursor: initial;
        &::before {
          border-color: @border_color_2;
        }
      }
    }
  }
  &:active {
    > input {
      opacity: 1;
      transform: scale(0);
      transition: opacity 0s, transform 0s;
    }
  }
  > span {
    &::before {
      content: '';
      display: inline-block;
      margin-right: 15px;
      border: solid 2px rgba(0, 0, 0, 0.42);
      border-radius: 50%;
      width: 20px;
      height: 20px;
      transition: border-color 0.5s, background-color 0.5s;
    }
    &::after {
      content: '';
      display: inline-block;
      position: absolute;
      top: 1px;
      left: 2px;
      width: 6px;
      height: 13px;
      border: solid 2px transparent;
      border-left: none;
      border-top: none;
      transform: translate(5.5px, 1px) rotate(45deg);
      -ms-transform: translate(5.5px, 2px) rotate(45deg);
    }
  }
}
.selected {
  .material-checkbox {
    > input {
      & + span {
        &::before {
          border-color: @border_color_1;
          background-color: @background_color_2;
          border-color: @border_color_1;
        }
        &::after {
          border-color: @border_color_4;
        }
      }
    }
  }
}
</style>
