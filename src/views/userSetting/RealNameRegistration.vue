<template>
  <div class="realname-container">
    <x-header :left-options="{backText: ''}" style="border-bottom: 1px solid #ccc ;">实名认证</x-header>
    <div class="content">
      <group>
        <x-input label-width="1rem" title="真实姓名" placeholder="请输入名字" :required="true" ref="mobile" v-model="form.realname" :is-type="cnNameValidator">
        </x-input>
        <x-input label-width="1rem" title="身份证号码" type="text" placeholder="请输入身份证" :required="true" ref="code" v-model="form.idCard" :is-type="idCard">
        </x-input>
      </group>
      <x-button style="margin-top:46px;width: 90%;" type="primary" action-type="submit" @click.native="register()">确定</x-button>
    </div>
  </div>
</template>
<script>
import { XButton, XInput, Group, XHeader } from 'vux'
export default {
  name: 'Login',
  components: {
    XButton,
    XInput,
    Group,
    XHeader
  },
  data: function() {
    return {
      cnNameValidator: function(value) {
        return {
          valid: value.match(/^[\u4e00-\u9fa5]{2,7}$/),
          msg: '请输入真实名字'
        }
      },
      idCard: function(value) {
        return {
          valid: value.match(
            /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
          ),
          msg: '请输入正确的身份证号'
        }
      },
      form: {
        realname: '',
        idCard: ''
      }
    }
  },
  methods: {
    register() {
      if (this.$refs.realname.valid && this.$refs.idCard.valid) {
        console.log('login')
      }
    }
  }
}
</script>

<style lang="less">
.realname-container {
  .content {
    padding: 0.1rem 0;
    .vux-x-icon {
      fill: #333;
    }
    .weui-cells {
      width: 90%;
      margin: 0 auto;
      &:before {
        border: none;
      }
      &:after {
        border: none;
      }
    }
    .weui-cell {
      border-bottom: 2px solid @border-color;
      padding: 16px;
      &:before {
        border: none;
      }
    }
  }
}
</style>
