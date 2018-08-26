<template>
  <div class="address">
    <x-header :left-options="{backText: ''}">
      <span>收货地址</span>
      <x-icon slot="right" type="more" size="35" style="fill:#333;position:relative;top:-8px;left:-3px;"></x-icon>
    </x-header>
    <checker v-model="pickedAddressId" default-item-class="demo2-item" selected-item-class="address-selected" radio-required>
      <checker-item v-for="(item,index) in addresses" :key="index" :value="item.id">
        <div class="address-detail">
          <div class="checkbox-wrapper">
            <label class="material-checkbox">
              <input type="checkbox">
              <span></span>
            </label>
          </div>
          <p>
            <span>收货人：{{item.name}}</span>
            <span>电话号码：{{item.mobile}}</span>
          </p>
          <p>
            <span>收货地址：{{item.address}}</span>
          </p>
        </div>

      </checker-item>
    </checker>
  </div>
</template>
<script>
import { XHeader, Checker, CheckerItem } from 'vux'
export default {
  components: {
    XHeader,
    Checker,
    CheckerItem
  },
  data() {
    return {
      pickedAddressId: '',
      form: {
        area: []
      },
      popShow: false,
      addresses: [
        {
          id: 1,
          area: ['china', 'china001', 'gz'],
          name: '大灰灰',
          mobile: '15655556666',
          address: '北京市朝阳区王府井路马化腾花园5座404'
        },
        {
          id: 2,
          area: ['china', 'china001', 'gz'],
          name: '灰灰',
          mobile: '15655556666',
          address: '北京市朝阳区王府井路马化腾花园5座404'
        }
      ]
    }
  },
  watch: {
    pickedAddressId: function(val, oldval) {
      this.$store.commit(
        'setAddress',
        this.addresses.find(item => item.id === val)
      )
    }
  },
  methods: {}
}
</script>
<style lang="less" scoped>
.checkbox input,
.checkbox .label,
.checkbox .check {
  display: inline-block;
  vertical-align: middle;
}
.checkbox .label {
  max-width: 200px;
}
.checkbox .check {
  position: relative;
}
.checkbox input[type='checkbox'] {
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  cursor: pointer;
  border-color: #232323;
}
.checkbox input[type='checkbox']:focus {
  outline: 0;
}
.checkbox input[type='checkbox']:checked + .check-container .check-off {
  border-color: #ff7b0e;
}

.checkbox input[type='checkbox']:checked + .check-container .check-on:after {
  content: '✓';
  color: #ff7b0e;
  position: absolute;
  font-size: 1em;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.checkbox input[type='checkbox'] + .check-container {
  width: auto;
  position: relative;
  display: inline-block;
  width: 29px;
  height: 29px;
  top: 2px;
  pointer-events: none;
}

.checkbox input[type='checkbox'] + .check-container .check-off {
  position: absolute;
  width: 25px;
  height: 25px;
  left: 0;
  top: 0;
  border-radius: 2px;
  border: 2px solid #232323;
  transition: border-color ease 0.28s;
}

.address-detail {
  font-size: 14px;
  width: 100%;
  height: 1.04rem;
  border-bottom: 1px solid #ccc;
  background: #fff;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 0.5rem 0 0.3rem;
  position: relative;
  p {
    margin: 0.05rem 0;
    position: relative;
    display: flex;
    justify-content: space-between;
  }
  img {
    position: absolute;
    left: -0.3rem;
    top: -0.05rem;
  }
  .forward-icon {
    fill: #7e74ea;
    position: absolute;
    right: 0.2rem;
    bottom: 0.05rem;
  }
}
//------------------------ checkbox-----------------
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

//------------------------ {
.checkbox-wrapper {
  position: absolute;
  right: 0.05rem;
}
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
      border-radius: 2px;
      width: 20px;
      height: 20px;
      transition: border-color 0.5s, background-color 0.5s;
    }
    &::after {
      content: '';
      display: inline-block;
      position: absolute;
      top: 0;
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
.address-selected {
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
<style lang="less">
.address-form {
  .weui-cells {
    font-size: 0.13rem;
    margin-top: 0;
    label {
      font-weight: bold;
    }
  }
}
</style>
