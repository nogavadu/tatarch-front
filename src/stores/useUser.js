import { defineStore } from "pinia";
import { ref } from "vue";

export const useUser = defineStore("userStore", () => {
  const user = ref({});

  return { user };
});
