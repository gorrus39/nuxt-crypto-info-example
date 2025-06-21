<script setup lang="ts">
import type {
  CurrencySource,
  PriceHistoryApiResponse,
  PriceHistoryRecord,
  Requesting,
} from "~/types";
const toast = useToast();

const data = defineModel<PriceHistoryRecord[]>("data", { required: true });
const requesting = defineModel<Requesting>("requesting", { required: true });
const props = defineProps<{ currencySource: CurrencySource }>();

async function postData() {
  requesting.value = "POST";

  const { error, items: backendData } = await $fetch<PriceHistoryApiResponse>(
    `/api/history/${props.currencySource}`,
    {
      method: "POST",
    }
  );
  if (error) {
    toast.add({ title: `Unsuccessfully! ${error}`, color: "error" });
  } else {
    data.value = backendData!;
    toast.add({ title: "Successfully!" });
  }

  requesting.value = false;
}
</script>

<template>
  <UButton
    :loading="requesting === 'POST'"
    :disabled="requesting && requesting !== 'POST'"
    :label="`Post ${currencySource.toUpperCase()} data to database`"
    @click="postData"
  />
</template>
