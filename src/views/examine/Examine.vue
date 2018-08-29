<template>
  <div class="examine">
    <x-header :left-options="{backText: ''}">审核</x-header>
    <div class="tab">
      <div @click="tabNow='register'">
        <img src="../../assets/images/register_check.png" v-if="tabNow==='register'" />
        <img src="../../assets/images/register_check_.png" v-else/>
        <p>注册审核</p>
        <badge text="8" class="badge"></badge>
      </div>
      <div @click="tabNow='upgrade'">
        <img src="../../assets/images/upgrade_check.png" v-if="tabNow==='upgrade'" />
        <img src="../../assets/images/upgrade_check_.png" v-else/>
        <p>升级审核</p>
        <badge text="8" class="badge"></badge>
      </div>
    </div>
    <div class="tab-content" v-show="tabNow==='register'">
      aaa
    </div>
    <div class="tab-content" v-show="tabNow==='upgrade'">
      bbb
    </div>
  </div>
</template>
<script>
import { XHeader, Badge } from 'vux'
export default {
  data() {
    return {
      tabNow: 'register'
    }
  },
  components: {
    XHeader,
    Badge
  }
}
</script>
<style lang="less" scoped>
.examine {
  .tab {
    width: 100%;
    height: 1.1rem;
    border-top: 1px solid #ccc;
    background: #fff;
    display: flex;
    > div {
      width: 50%;
      position: relative;
      height: 1.1rem;
      text-align: center;
      .badge {
        position: absolute;
        top: 0.23rem;
        right: 0.66rem;
      }
      img {
        margin-top: 0.3rem;
      }
      &:first-child {
        img {
          width: 0.4rem;
          height: 0.37rem;
        }
      }
      &:nth-child(2) {
        img {
          width: 0.39rem;
          height: 0.37rem;
        }
      }
    }
  }
}
.show {
  color: #5b50d3;
}
</style>


