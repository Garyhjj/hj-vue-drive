<template>
<div>看板ESD
    <DyInput/>
    <DyUpdate :inputSet="inputs"></DyUpdate>
</div>
</template>
<script>
import DyInput from '@/components/inputs/DynamicInput.vue';
import DyUpdate from '@/components/dataDrive/driveInputers/DriveUpdate.vue';
export default {
  data() {
    return {
      inputs: [{property: 'note'},{property:'gender'}]
    }
  },
  components:{
      DyInput,DyUpdate
  }
}
</script>

<style>
</style>
