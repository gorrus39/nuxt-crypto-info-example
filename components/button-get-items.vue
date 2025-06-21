<script setup lang="ts">
import type { CurrencySource, PriceHistoryRecord, Requesting } from "~/types";
const toast = useToast();

const data = defineModel<PriceHistoryRecord[]>("data", { required: true });
const requesting = defineModel<Requesting>("requesting", { required: true });
const props = defineProps<{ currencySource: CurrencySource }>();

async function getData() {
  requesting.value = "GET";

  const { error, data: backendData } = await $fetch(
    "/api/price-history/items",
    {
      params: { currencySource: props.currencySource },
    }
  );
  if (error) {
    toast.add({ title: `Unsuccessfully! ${error}`, color: "error" });
  } else {
    data.value = backendData!;
    let title = "Successfully! ";
    if (backendData?.length === 0) {
      title += "Database is empty. Please populate it. Click Post button.";
    }
    toast.add({ title });
  }

  requesting.value = false;
}
</script>

<template>
  <UButton
    :loading="requesting === 'GET'"
    :disabled="requesting && requesting !== 'GET'"
    :label="`Get ${currencySource.toUpperCase()} data from database`"
    @click="getData"
  />
</template>
