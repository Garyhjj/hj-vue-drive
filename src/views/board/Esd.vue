<template>
  <div>看板ESD
    <DyInput/>
    <DyUpdate :inputSet="inputs"></DyUpdate>
  </div>
</template>
<script>
import DyInput from "@/components/inputs/DynamicInput.vue";
import DyUpdate from "@/components/dataDrive/driveInputers/DriveUpdate.vue";
import { DynamicFormInput } from "../../components/inputs/shared/class/dynamicInputOptions.class";
import validators from "../../shared/services/validatorExtend.service";

export default {
  data() {
    return {
      inputs: [
        new DynamicFormInput("note", "note", { type: "text" }).setValidator([
          {
            min: 3,
            message: 6666
          },
          {
            message: "hahahahah",
            validator: validators.getInstance().maxLength(20)
          }
        ]),
        { property: "gender" }
      ]
    };
  },
  components: {
    DyInput,
    DyUpdate
  }
};
</script>

<style>
</style>
