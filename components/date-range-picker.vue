<script setup lang="ts">
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
} from "@internationalized/date";
import type { DateRange } from "~/types";

const df = new DateFormatter("en-US", {
  dateStyle: "medium",
});

const props = defineProps<{
  minDateString: string;
  maxDateString: string;
}>();

const outerDateRangeModel = defineModel<DateRange>({ required: true });

const [startYear, startMonth, startDay] = props.minDateString
  .split("-")
  .map(Number);
const [endYear, endMonth, endDay] = props.maxDateString.split("-").map(Number);

const minDate = new CalendarDate(startYear, startMonth, startDay);
const maxDate = new CalendarDate(endYear, endMonth, endDay);

const modelValue = shallowRef({
  start: minDate,
  end: maxDate,
});

function handleUpdateModelValue() {
  outerDateRangeModel.value = {
    start: modelValue.value.start.toString(),
    end: modelValue.value.end.toString(),
  };
}
onUnmounted(() => (outerDateRangeModel.value = null));
</script>

<template>
  <UPopover>
    <UButton color="neutral" variant="subtle" icon="i-lucide-calendar">
      <template v-if="modelValue.start">
        <template v-if="modelValue.end">
          {{ df.format(modelValue.start.toDate(getLocalTimeZone())) }} -
          {{ df.format(modelValue.end.toDate(getLocalTimeZone())) }}
        </template>

        <template v-else>
          {{ df.format(modelValue.start.toDate(getLocalTimeZone())) }}
        </template>
      </template>
      <template v-else> Pick a date </template>
    </UButton>

    <template #content>
      <UCalendar
        v-model="modelValue"
        class="p-2"
        :min-value="minDate"
        :max-value="maxDate"
        :number-of-months="2"
        @update:modelValue="handleUpdateModelValue"
        range
      />
    </template>
  </UPopover>
</template>
