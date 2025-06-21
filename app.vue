<script setup lang="ts">
import Chart from "~/components/chart.vue";
import type {
  CurrencySource,
  DateRange,
  Point,
  PriceHistoryRecord,
  Requesting,
} from "./types";
import { dateFormatter } from "#imports";
import { UContainer } from "#components";
import { currencySourceSchema } from "./schemas";
import type { TabsItem } from "@nuxt/ui";
import { pipeFilter } from "./utils";
const config = useRuntimeConfig();

const currencySources: TabsItem[] = currencySourceSchema.options.map(
  (source) => ({ value: source, label: source })
);
const selectedCurrencySource = ref(currencySources[0].value as CurrencySource);

const data = ref<PriceHistoryRecord[]>([]);
const requesting = ref<Requesting>(false);
const dateRange = ref<DateRange>(null);

const formattedData = computed<Point[]>(() => {
  const filteredItems = pipeFilter(
    data.value,
    (items) => filterByDateRange({ items, dateRange: dateRange.value }),
    (items) => filterByMaxElements({ items, max: config.public.maxChartPoints })
  );

  return filteredItems.map((item) => ({
    dateString: dateFormatter(new Date(item.targetDate)),
    value: parseFloat(item.price),
  }));
});

watch(selectedCurrencySource, () => {
  data.value = [];
});
</script>

<template>
  <UApp>
    <UToaster />

    <UContainer class="p-2">
      <UTabs :items="currencySources" v-model="selectedCurrencySource" />

      <div class="flex gap-2 items-center">
        <button-get-items
          v-model:data="data"
          v-model:requesting="requesting"
          :currencySource="selectedCurrencySource"
        />
        <button-post-items
          v-if="data.length === 0"
          v-model:data="data"
          v-model:requesting="requesting"
          :currencySource="selectedCurrencySource"
        />
        <button-delete-items
          v-else
          v-model:data="data"
          v-model:requesting="requesting"
          :currencySource="selectedCurrencySource"
        />
        <date-range-picker
          v-if="data.length > 0"
          :min-date-string="data[0].targetDate"
          :max-date-string="data[data.length - 1].targetDate"
          v-model="dateRange"
        />
      </div>

      <chart :data="formattedData" />
    </UContainer>
  </UApp>
</template>
