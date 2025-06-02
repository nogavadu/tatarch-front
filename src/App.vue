<script setup>
// Components
import { NConfigProvider, NMessageProvider } from "naive-ui";
import { RouterView } from "vue-router";

const themeOverrides = {
  common: {
    primaryColor: "rgba(113, 119, 146, 1)",
  },
};
</script>

<template>
  <NMessageProvider>
    <NConfigProvider :themeOverrides="themeOverrides" class="configProvider">
      <RouterView></RouterView>
    </NConfigProvider>
  </NMessageProvider>
</template>

<style scoped lang="scss">
.configProvider {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>
