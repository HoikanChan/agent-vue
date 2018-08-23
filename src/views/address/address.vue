<template>
  <div class="address">
    <x-header :left-options="{backText: ''}">
      <span>收货地址</span>
      <x-icon slot="right" type="more" size="35" style="fill:#333;position:relative;top:-8px;left:-3px;"></x-icon>
    </x-header>
    <checker v-model="pickedAddress" default-item-class="demo2-item" selected-item-class="demo2-item-selected">
      <checker-item v-for="(item,index) in addresses" :key="index" value="1">
        <div class="address-detail">
          <div class="check">
            <input type="checkbox" name="task_01">
            <div class="check-container">
              <div class="check-off"></div>
              <div class="check-on">
                <i></i>
              </div>
            </div>
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
      pickedAddress: '',
      form: {
        area: []
      },
      toastShow: false,
      popShow: false,
      addresses: [
        {
          id: 1,
          area: ['china', 'china001', 'gz'],
          name: '灰灰灰',
          mobile: '15655556666',
          address: '北京市朝阳区王府井路马化腾花园5座404'
        },
        {
          id: 2,
          area: ['china', 'china001', 'gz'],
          name: '灰灰灰',
          mobile: '15655556666',
          address: '北京市朝阳区王府井路马化腾花园5座404'
        }
      ]
    }
  },
  methods: {
    showPop() {
      this.popShow = true
    },
    addAddress() {
      if (
        this.$refs.name.valid &&
        this.$refs.mobile.valid &&
        this.$refs.address.valid
      ) {
        this.$store.commit('setAddress', this.form)
        this.$router.go(-1)
      } else {
        this.toastShow = true
      }
    }
  }
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
  padding: 0 0.3rem 0 0.5rem;
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
