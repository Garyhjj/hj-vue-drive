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
        new DynamicFormInput("gender", "gender", {
          type: "select",
          more: {
            options: [
              { property: 123, value: 789 },
              { property: 343, value: 78954 }
            ]
          }
        }).required(),
        new DynamicFormInput("note23", "note56", { type: "text" }).setValidator([
          {
            max: 6,
            message: 333
          },
        ]),
        new DynamicFormInput("note2", "note6", { type: "colleagueSearcher"}).setValidator([
          {
            max: 6,
            message: 333
          },
        ])
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
