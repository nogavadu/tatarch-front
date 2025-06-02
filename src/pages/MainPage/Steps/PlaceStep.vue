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
import Location from "../../../assets/icons/Location.vue";

const emit = defineEmits(["finishStep"]);

const places = ref([]);
const choosenPlace = defineModel("place");

const message = useMessage();

const choosenPlaceData = computed(() => {
  const place = places.value.find((place) => place.id == choosenPlace.value);

  return place;
});

const isLoading = ref(true);
const isError = ref(false);

onMounted(async () => {
  try {
    await placeApi.getAll().then((res) => {
      places.value = res.data;
    });
  } catch (error) {
    message.error(`Не удалось загрузить филлиалы, попробуйте позже`);
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
});

const choosePlace = (id) => {
  choosenPlace.value = id;
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
        <div class="places">
          <NCard
            v-for="place in places"
            hoverable
            :title="place.name"
            class="place"
            @click="choosePlace(place.id)"
          >
            <div v-if="place.address" class="address">
              <NIcon size="24">
                <Location />
              </NIcon>

              {{ place.address }}
            </div>
          </NCard>
        </div>

        <NDivider></NDivider>

        <div v-if="choosenPlaceData" class="choosenPlace">
          <div class="choosenPlace__title">Выбранный филлиал</div>

          <NCard v-if="choosenPlaceData" :title="choosenPlaceData.name">
            <div v-if="choosenPlaceData.address" class="address">
              <NIcon size="24">
                <Location />
              </NIcon>

              {{ choosenPlaceData.address }}
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

.places {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.place {
  cursor: pointer;
  width: calc(50% - 4px);
}

.address {
  display: flex;
  align-items: center;
  gap: 8px;
}

.choosenPlace {
  display: flex;
  flex-direction: column;
  gap: 12px;

  &__title {
    font-size: 28px;
  }
}
</style>
