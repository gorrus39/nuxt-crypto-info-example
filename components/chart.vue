<script setup lang="ts">
import { ClientOnly } from "#components";
import { useDimention } from "#imports";
import { Chart, Grid, Line } from "vue3-charts";
import type { Point } from "~/types";

const dimention = useDimention();

defineProps<{ data: Point[] }>();

const width = computed(() => {
  return dimention.value.width - 30;
});

const axis = ref({
  primary: {
    type: "band",
    format: (val: string) => (val === "Feb" ? "😜" : val),
    rotate: true,
  },
  secondary: {
    domain: ["dataMin", "dataMax + 100"],
    type: "linear",
    ticks: 8,
  },
});
</script>

<template>
  <client-only>
    <Chart
      :axis
      :size="{ width, height: 220 }"
      :data
      :margin="{ top: 40, left: 20 }"
    >
      <template #layers>
        <Grid strokeDasharray="2,2" />
        <Line :dataKeys="['dateString', 'value']" />
      </template>
    </Chart>
  </client-only>
</template>
