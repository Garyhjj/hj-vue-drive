<template>
<div>
    <drive-table>
        <template v-slot:tableAction="{data}">
            <slot name="tableAction" :data="data"></slot>
         </template>

         <template v-slot:tableHeader="{property,value}">
            <slot name="tableHeader" :property="property" :value="value"></slot>
         </template>

         <template v-slot:tableBody="{property,value, record}">
            <slot name="tableBody" :property="property" :value="value" :record="record"></slot>
         </template>
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
