<script setup lang="ts">
import Chart from "~/components/chart.vue";
import type { Point, ResponseCoingeco } from "./types";
import { data } from "~/data/coingeco";
import z from "zod";
import { dateFormatter } from "#imports";
const config = useRuntimeConfig();

const schema = z.object({
  prices: z.array(z.tuple([z.number(), z.number()])),
});

const { error, data: parsedData } = schema.safeParse(data);

const arr: Point[] = [];
if (parsedData) {
  for (const item of parsedData.prices) {
    arr.push({ dateString: dateFormatter(new Date(item[0])), value: item[1] });
  }
}
const filterToMaxElements = <T>({
  array,
  max,
}: {
  array: T[];
  max: number;
}): T[] => {
  if (array.length < max) return array;

  const filteredArray = array.filter((_, index) => index % 2 === 0);
  return filterToMaxElements({ array: filteredArray, max });
};

const filtered = filterToMaxElements({
  array: arr,
  max: config.public.maxChartPoints,
});
</script>

<template>
  <h1>asd</h1>
  <div v-if="error">{{ error }}</div>
  <div>
    <chart :data="filtered" />
  </div>
</template>
