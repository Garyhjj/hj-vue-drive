<template>
  <a-layout>
    <Header/>
    <a-layout>
      <Sider/>
      <a-layout>
        <Content/>
        <Footer/>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
import Header from "../components/Header.vue";
import Sider from "../components/Sider.vue";
import Footer from "../components/Footer.vue";
import Content from "../components/Content.vue";
export default {
  components: {
    Header,
    Sider,
    Footer,
    Content
  }
};
</script>

<style>
</style>
