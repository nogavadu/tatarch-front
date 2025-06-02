<script setup>
import { computed, onMounted, ref } from "vue";
//Api
import { masterAPI } from "../../../api/masterAPI";
// Components
import {
  NSkeleton,
  NCard,
  NSpace,
  NSpin,
  useMessage,
  NDivider,
  NButton,
} from "naive-ui";

const emit = defineEmits(["finishStep"]);

const masters = ref([]);
const choosenMaster = defineModel("master");

const message = useMessage();

const choosenMasterData = computed(() => {
  const master = masters.value.find(
    (master) => master.id == choosenMaster.value
  );

  return master;
});

const isLoading = ref(true);
const isError = ref(false);

onMounted(async () => {
  try {
    await masterAPI.getAll().then((res) => {
      masters.value = res.data;
    });
  } catch (error) {
    message.error(`Не удалось загрузить масетров, попробуйте позже`);
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
});

const choosePlace = (id) => {
  choosenMaster.value = id;
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
        <div class="masters">
          <NCard
            v-for="master in masters"
            hoverable
            :title="master.name"
            class="master"
            @click="choosePlace(master.id)"
          >
          </NCard>
        </div>

        <NDivider></NDivider>

        <div v-if="choosenMasterData" class="choosenMaster">
          <div class="choosenPlace__title">Выбранный мастер</div>

          <NCard v-if="choosenMasterData" :title="choosenMasterData.name">
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

.masters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.master {
  cursor: pointer;
}

.choosenMaster {
  display: flex;
  flex-direction: column;
  gap: 12px;

  &__title {
    font-size: 28px;
  }
}
</style>
