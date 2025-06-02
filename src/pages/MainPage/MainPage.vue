<script setup>
import { ref } from "vue";
// Components
import { NStep, NSteps } from "naive-ui";
// Steps
import PlaceStep from "./Steps/PlaceStep.vue";
import MasterStep from "./Steps/MasterStep.vue";
import ServiceStep from "./Steps/ServiceStep.vue";
import OrderStep from "./Steps/OrderStep.vue";
import { recordAPI } from "../../api/recordAPI";
import { error } from "naive-ui/es/_utils/naive/warn";
import { useRouter } from "vue-router";

const router = useRouter();

const STEP_STATUS = {
  process: "process",
  finish: "finish",
  error: "error",
  wait: "wait",
};

const currentStep = ref(1);
const currentStatus = ref(STEP_STATUS.process);

const steps = {
  place: {
    step: 1,
    title: "Выберите филлиал",
  },
  master: {
    step: 2,
    title: "Выберите мастера",
  },
  service: {
    step: 3,
    title: "Выберите услугу",
  },
  order: {
    step: 4,
    title: "Запись",
  },
};

const formValue = ref({
  placeId: "",
  masterId: "",
  serviceId: "",
  date: null,
});

const nextStep = () => {
  currentStatus.value = STEP_STATUS.finish;
  currentStep.value = currentStep.value + 1;
  currentStatus.value = STEP_STATUS.process;
};

const sendForm = async () => {
  try {
    await recordAPI.create(formValue.value).then((res) => {
      console.log(res);
      router.push("/success");
    });
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div class="wrapper">
    <NSteps
      :current="currentStep"
      :status="currentStatus"
      vertical
      class="aside"
    >
      <NStep
        v-for="step in steps"
        :key="step.title"
        :title="step.title"
        :tab="step.title"
        animated
        class="aside__step"
      ></NStep>
    </NSteps>

    <div class="content">
      <PlaceStep
        v-if="currentStep == steps.place.step"
        v-model:place="formValue.placeId"
        @finishStep="nextStep"
      ></PlaceStep>

      <MasterStep
        v-if="currentStep == steps.master.step"
        v-model:master="formValue.masterId"
        @finish-step="nextStep"
      ></MasterStep>

      <ServiceStep
        v-if="currentStep == steps.service.step"
        v-model:service="formValue.serviceId"
        :master-id="formValue.masterId"
        @finish-step="nextStep"
      ></ServiceStep>

      <OrderStep
        v-if="currentStep == steps.order.step"
        v-model:date="formValue.date"
        :master-id="formValue.masterId"
        @finish-step="sendForm"
      ></OrderStep>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
}

.aside {
  width: 250px;
  height: 300px;
  display: flex;
  flex-direction: column;
  // &__step {
  //   cursor: pointer;
  //   background-color: #fff;
  // }
}

.content {
  flex-grow: 1;
}
</style>
