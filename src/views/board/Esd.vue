<template>
<div>看板ESD
    <DyInput/>
    <DyUpdate/>
</div>
</template>
<script>
import DyInput from '@/components/inputs/DynamicInput.vue';
import DyUpdate from '@/components/dataDrive/driveInputers/DriveUpdate.vue';
export default {
  components:{
      DyInput,DyUpdate
  }
}
</script>

<style>
</style>
