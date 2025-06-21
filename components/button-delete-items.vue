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

async function deleteData() {
  requesting.value = "DELETE";

  const { error } = await $fetch<PriceHistoryApiResponse>(
    `/api/history/${props.currencySource}`,
    {
      method: "DELETE",
    }
  );
  if (error) {
    toast.add({ title: `Unsuccessfully! ${error}`, color: "error" });
  } else {
    data.value = [];
    toast.add({ title: "Successfully!" });
  }

  requesting.value = false;
}
</script>

<template>
  <UButton
    :loading="requesting === 'DELETE'"
    :disabled="requesting && requesting !== 'DELETE'"
    @click="deleteData"
    :label="`Delete ${currencySource.toUpperCase()} data from database`"
  />
</template>
