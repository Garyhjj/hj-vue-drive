<template>
  <a-layout-header class="header">
      <div class="logo" />
      <a-menu
        theme="dark"
        mode="horizontal"
        :defaultSelectedKeys="['2']"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1">nav 1</a-menu-item>
        <a-menu-item key="2">nav 2</a-menu-item>
        <a-menu-item key="3">nav 3</a-menu-item>
      </a-menu>
    </a-layout-header>
</template>
<script>
export default {
  
}
</script>

<style>
.logo {
  width: 120px;
  height: 31px;
  background: rgba(255,255,255,.2);
  margin: 16px 28px 16px 0;
  float: left;
}
.header {
  margin-bottom: 10px;
}

.ant-layout-header {
  background: #20A0ff;
  font-size: 0.9rem;
}

.ant-menu-dark,
.ant-menu-dark .ant-menu-sub {
  color: rgba(255, 255, 255, 0.67);
  background: #20A0ff;
  font-size: 12px;
}

.ant-menu-dark.ant-menu-horizontal {
  background: #20A0ff;
  border-bottom-color: #20A0ff;
}

.ul-dropdown {
  display: none;
}

.ul-dropdown a {
  color: #fff;
  font-size: 2.0rem;
  line-height: 2.0rem;
}
</style>
