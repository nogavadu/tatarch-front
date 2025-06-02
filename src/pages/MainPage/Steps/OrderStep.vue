<script setup>
import { computed, onMounted, ref } from "vue";
//Api
import { calendarAPI } from "../../../api/calendarAPI";
// Utils
import { _ as lodash } from "lodash";
// Components
import {
  NSkeleton,
  NCard,
  NSpace,
  NSpin,
  useMessage,
  NDivider,
  NButton,
  NCalendar,
} from "naive-ui";

const props = defineProps({
  masterId: Number,
});
const emit = defineEmits(["finishStep"]);

const dates = ref([]);
const choosenDate = defineModel("date");

const message = useMessage();

const choosenServiceData = computed(() => {
  const date = dates.value.find((date) => date.id == choosenDate.value);

  return date;
});

const isLoading = ref(true);
const isError = ref(false);

onMounted(async () => {
  try {
    await calendarAPI.getByMaster(props.masterId).then((res) => {
      dates.value = res.data.map((item) => item.date);
    });
  } catch (error) {
    message.error(`Не удалось загрузить доступные даты, попробуйте позже`);
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
});

const handleUpdateValue = (_, { year, month, date }) => {
  const monthStr = lodash.padStart(month.toString(), 2, "0");
  choosenDate.value = `${year}-${monthStr}-${date}`;
};

const isDateDisabled = (timestamp) => {
  const currentDate = new Date();
  const inputDate = new Date(timestamp);

  const isPastDate =
    inputDate.setHours(0, 0, 0, 0) < currentDate.setHours(0, 0, 0, 0);

  if (isPastDate) {
    return true;
  }

  const inputDateNormalized = new Date(inputDate).setHours(0, 0, 0, 0);

  return !dates.value.some((date) => {
    const availableDate = new Date(date);
    const availableDateNormalized = new Date(availableDate).setHours(
      0,
      0,
      0,
      0
    );

    return availableDateNormalized === inputDateNormalized;
  });
};
</script>

<template>
  <NSpin :show="isLoading">
    <template v-if="isLoading">
      <NSpace>
        <NSkeleton v-for="n in 4" width="50%" height="80px" />
      </NSpace>
    </template>

    <template v-if="isError">
      <NCard title="Ошибка загрузки 😞" />
    </template>

    <template v-else>
      <div class="wrapper">
        <NCalendar
          v-model:value="choosenDate"
          #="{ year, month, date }"
          :is-date-disabled="isDateDisabled"
          @update:value="handleUpdateValue"
        >
          {{ year }}-{{ month }}-{{ date }}
        </NCalendar>

        <NDivider></NDivider>

        <div v-if="choosenDate" class="choosenDate">
          <NButton secondary size="large" @click="emit('finishStep')">
            Записаться
          </NButton>
        </div>
      </div>
    </template>
  </NSpin>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
}

.choosenDate {
  display: flex;
  flex-direction: column;
  gap: 12px;

  &__title {
    font-size: 28px;
  }
}
</style>
