<script setup>
import { computed, onMounted, ref } from "vue";
//Api
import { placeApi } from "../../../api/placeAPI";
// Components
import {
  NSkeleton,
  NCard,
  NSpace,
  NSpin,
  useMessage,
  NDivider,
  NIcon,
  NButton,
} from "naive-ui";
// Assets
import Money from "../../../assets/icons/Money.vue";
import { serviceAPI } from "../../../api/serviceAPI";

const emit = defineEmits(["finishStep"]);

const props = defineProps({
  masterId: Number,
});

const services = ref([]);
const choosenService = defineModel("service");

const message = useMessage();

const choosenServiceData = computed(() => {
  const service = services.value.find(
    (service) => service.id == choosenService.value
  );

  return service;
});

const isLoading = ref(true);
const isError = ref(false);

onMounted(async () => {
  try {
    await serviceAPI.getAll(props.masterId).then((res) => {
      services.value = res.data;
    });
  } catch (error) {
    message.error(`Не удалось загрузить услуги, попробуйте позже`);
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
});

const choosePlace = (id) => {
  choosenService.value = id;
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
        <div class="services">
          <NCard
            v-for="service in services"
            hoverable
            :title="service.name"
            class="service"
            @click="choosePlace(service.id)"
          >
            <div v-if="service.cost" class="cost">
              <NIcon size="24">
                <Money />
              </NIcon>

              {{ service.cost }}
            </div>
          </NCard>
        </div>

        <NDivider></NDivider>

        <div v-if="choosenServiceData" class="choosenService">
          <div class="choosenPlace__title">Выбранная услуга</div>

          <NCard v-if="choosenServiceData" :title="choosenServiceData.name">
            <div v-if="choosenServiceData.cost" class="cost">
              <NIcon size="24">
                <Money />
              </NIcon>

              {{ choosenServiceData.cost }}
            </div>
          </NCard>

          <NButton secondary size="large" @click="emit('finishStep')">
            Подтвердить
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

.services {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.service {
  cursor: pointer;
  width: calc(50% - 4px);
}

.cost {
  display: flex;
  align-items: center;
  gap: 8px;
}

.choosenService {
  display: flex;
  flex-direction: column;
  gap: 12px;

  &__title {
    font-size: 28px;
  }
}
</style>
