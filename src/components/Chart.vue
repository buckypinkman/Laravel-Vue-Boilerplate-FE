<template>
  <n-card :style="`width: ${width}; height: ${height}`">
     <apexchart :type="type" :options="data.options" :series="data.series"></apexchart>
  </n-card>
</template>

<script>

export default {
  name: 'ChartComponent',
  props: {
    data: {
      type: Object
    },
    type: {
      type: String
    },
    width: {
      type: String
    },
    height: {
      type: String
    }
  },
}
</script>