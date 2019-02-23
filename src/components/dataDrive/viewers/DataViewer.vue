<template>
<div>
    <drive-table>
        <template v-slot:action="{data}">
            <slot name="action" :data="data"></slot>
         </template>

         <!-- <template v-slot:header="{property,value}">
            {{value}}456{{property}}
         </template> -->
    </drive-table>
</div>
</template>
<script>
import DriveTable from './DriveTable';

export default {
    components: {
        DriveTable
    }
}
</script>

<style>
</style>
