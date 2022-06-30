<template>
  <div class="page-header">
    <div class="page-header-title">{{title}}</div>
    <div class="page-header-content">{{content}}</div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'PageHeader',
  setup(props) {
    return { ...props };
  },
  props: {
    title: {
      type: String,
      default() {
        return '';
      }
    },
    content: {
      type: String,
      default() {
        return '';
      }
    }
  }
}
</script>
<style lang="less">
.page-header {
  box-sizing: border-box;
  margin: 0;
  color: rgba(0,0,0,.85);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: "tnum";
  position: relative;
  padding: 16px 24px;
  background-color: #fff;
  .page-header-title {
    display: flex;
    justify-content: space-between;
    color: rgba(0,0,0,.85);
    font-weight: 600;
    font-size: 20px;
    line-height: 32px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .page-header-content {
    padding-top: 12px;
    text-align: left;
  }
}
</style>