<template>
<div class="col-lg-3">
    <n-card size="small" class="shadow" style="height: 100%">
        <div class="d-flex justify-content-between align-items-center">
            <h1 class="m-0" style="font-size: 50px"><slot></slot></h1>
            <div>
                <h1 style="font-size: 3em" class="m-0">{{ count }} <template v-if="second_count">/ {{ second_count }}</template></h1> 
            </div>
        </div>
        <span v-if="additional_info">Sisa: <strong>{{ additional_info }}</strong></span><br>
        {{ body }}
    </n-card>
</div>
</template>

<script setup>
const props = defineProps(['icon', 'count', 'body', 'second_count', 'additional_info'])
</script>