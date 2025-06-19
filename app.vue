<script setup lang="ts">
import Chart from "~/components/chart.vue";
import type { Point } from "./types";

const data: Point[] = [
  { dateString: "Jan", value: 1000 },
  { dateString: "Feb", value: 2000 },
  { dateString: "Apr", value: 400 },
  { dateString: "Mar", value: 3100 },
  { dateString: "May", value: 200 },
  { dateString: "Jun", value: 600 },
  { dateString: "Jul", value: 500 },
];
</script>

<template>
  <div>
    <Chart :data />
  </div>
</template>
