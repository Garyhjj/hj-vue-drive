<template>
  <div>看板ESD
    <!-- <DyInput/> -->
    <!-- <DyUpdate :inputSet="inputs"></DyUpdate> -->
    <data-drive  :name="'examQuestions'" @inited="dataDriveInit">
      <!-- <template v-slot:tableHeader="{property,value}">
            {{value}}666
      </template> -->
      <!-- <template v-slot:tableBody="{property,value, record}">
            {{value}}222
         </template> -->

         <template v-slot:tableAction="{data}">
            <a-divider type="vertical"/>
        <a href="javascript:;" @click="testAction(data)">5555</a>
        </template>
    </data-drive>
  </div>
</template>
<script>
import DyInput from "@/components/inputs/DynamicInput.vue";
import DyUpdate from "@/components/dataDrive/driveInputers/DriveUpdate.vue";
import { DynamicFormInput } from "../../components/inputs/shared/class/dynamicInputOptions.class";
import validators from "../../shared/services/validatorExtend.service";
import DataDrive from "@/components/dataDrive/DataDrive.vue";

export default {
  inject:['commonService', 'authService'],
  data() {
    console.log(this.authService)
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
        new DynamicFormInput("note2", "note6", { type: "colleagueSearcher",default:'gary.h',more: {
          pickerFormat:'{USER_NAME}({NICK_NAME})',
          searchFilter: (data) => {
            return data.slice(0,10)
          }
        }}).setValidator([
          {
            max: 18,
            message: 333
          },
        ]),
        new DynamicFormInput("not454", "note8", { type: "datePicker",default:'2019-05-05',more: {
        }})
      ]
    };
  },
  components: {
    DyInput,
    DyUpdate,
    DataDrive
  },
  methods: {
    dataDriveInit(d) {
      d.afterDataInit((data) => {
      })
    },
    testAction(ds) {
      console.log(ds);
    }
  }
};
</script>

<style>
</style>
