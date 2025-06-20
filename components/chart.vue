<script setup lang="ts">
import { ClientOnly } from "#components";
import { useDimention } from "#imports";
import { Chart, Grid, Line, Tooltip } from "vue3-charts";
import type { Point } from "~/types";

const dimention = useDimention();

defineProps<{ data: Point[] }>();

const width = computed(() => {
  return dimention.value.width - 30;
});

const axis = ref({
  primary: {
    type: "band",
    // format: (val: string) => (val === "Feb" ? "😜" : val),
    rotate: true,
    domain: ["dataMin", "dataMax + 100"],
  },
  secondary: {
    // type: "linear",
    // ticks: 8,
  },
});
</script>

<template>
  <client-only>
    <Chart
      :axis
      :size="{ width, height: 220 }"
      :data
      :margin="{ top: 10, left: 20, right: 0, bottom: 0 }"
    >
      <template #layers>
        <Grid strokeDasharray="2,2" />
        <Line :dataKeys="['dateString', 'value']" />
      </template>
      <template #widgets>
        <Tooltip
          borderColor="#48CAE4"
          :config="{
            dateString: { label: 'date', color: 'green' },
            value: { color: '#0077b6' },
          }"
        />
      </template>
    </Chart>
  </client-only>
</template>
