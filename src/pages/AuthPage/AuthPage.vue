<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
// API
import { userAPI } from "../../api/userApi";
import { authAPI } from "../../api/authAPI";
// Components
import {
  NButton,
  NCard,
  NForm,
  NFormItem,
  NInput,
  NTab,
  NTabPane,
  NTabs,
  useMessage,
} from "naive-ui";

const FORM_STATE = {
  REGISTRATION: "registration",
  LOGIN: "login",
};

const message = useMessage();

const initialRegFormValue = {
  name: null,
  login: null,
  email: null,
  password: null,
};

const isLoading = ref(false);

const formRegRef = ref(null);
const formRegValue = ref({ ...initialRegFormValue });

const regRules = ref({
  name: {
    required: true,
    message: "Некорректное имя",
    trigger: ["blur", "trigg"],
  },
  login: {
    required: true,
    message: "Некорректный логин",
    trigger: ["blur", "trigg"],
  },
  email: {
    required: true,
    message: "Некорректная почта",
    trigger: ["blur", "trigg"],
  },
  password: {
    required: true,
    message: "Пароль обязателен",
    trigger: ["blur", "trigg"],
  },
});

const initialLogFormValue = {
  username: null,
  password: null,
};

const formLogRef = ref(null);
const formLogValue = ref({ ...initialLogFormValue });

const logRules = ref({
  username: {
    required: true,
    message: "Некорректный логин",
    trigger: ["blur", "trigg"],
  },
  password: {
    required: true,
    message: "Пароль обязателен",
    trigger: ["blur", "trigg"],
  },
});

const router = useRouter();

const onRegisration = () => {
  isLoading.value = true;

  formRegRef.value.validate(async (errors) => {
    if (!errors) {
      try {
        await userAPI.registration(formRegValue.value).then((res) => {
          localStorage.setItem("token", res.token);
          router.push("/");
        });
      } catch (error) {
        console.log(error);
        message.error("Ошибка аутентификации, неверный логин и/или пароль");
      }
    } else {
      console.log(errors);
      message.error("Неверный формат почты или пароля");
    }

    isLoading.value = false;
  });
};

const onLogin = () => {
  isLoading.value = true;

  formLogRef.value.validate(async (errors) => {
    if (!errors) {
      try {
        await authAPI.signIn(formLogValue.value).then((res) => {
          localStorage.setItem("token", res.token);
          router.push("/");
        });
      } catch (error) {
        console.log(error);
        message.error("Ошибка аутентификации, неверный логин и/или пароль");
      }
    } else {
      console.log(errors);
      message.error("Неверный формат почты или пароля");
    }

    isLoading.value = false;
  });
};
</script>

<template>
  <div class="wrapper">
    <NCard>
      <NTabs>
        <NTabPane tab="Регистрация" :name="FORM_STATE.REGISTRATION">
          <NForm
            ref="formRegRef"
            :model="formRegValue"
            :rules="regRules"
            @submit.prevent="onRegisration"
            class="form"
          >
            <NFormItem label="ФИО" path="name">
              <NInput
                v-model:value="formRegValue.name"
                placeholder="Введите ФИО"
              ></NInput>
            </NFormItem>

            <NFormItem label="Логин" path="login">
              <NInput
                v-model:value="formRegValue.login"
                placeholder="Введите логин"
              ></NInput>
            </NFormItem>

            <NFormItem label="Почта" path="email">
              <NInput
                v-model:value="formRegValue.email"
                placeholder="Введите почту"
              ></NInput>
            </NFormItem>

            <NFormItem label="Пароль" path="password">
              <NInput
                v-model:value="formRegValue.password"
                type="password"
                placeholder="Введите пароль"
              ></NInput>
            </NFormItem>

            <NButton
              :loading="isLoading"
              secondary
              attr-type="submit"
              class="submitBtn"
            >
              Зарегистрироваться
            </NButton>
          </NForm>
        </NTabPane>

        <NTabPane tab="Авторизация" :name="FORM_STATE.LOGIN">
          <NForm
            ref="formLogRef"
            :model="formLogValue"
            :rules="logRules"
            @submit.prevent="onLogin"
            class="form"
          >
            <NFormItem label="Логин" path="username">
              <NInput
                v-model:value="formLogValue.username"
                placeholder="Введите логин"
              ></NInput>
            </NFormItem>

            <NFormItem label="Пароль" path="password">
              <NInput
                v-model:value="formLogValue.password"
                type="password"
                placeholder="Введите пароль"
              ></NInput>
            </NFormItem>

            <NButton
              :loading="isLoading"
              secondary
              attr-type="submit"
              class="submitBtn"
            >
              Войти
            </NButton>
          </NForm>
        </NTabPane>
      </NTabs>
    </NCard>
  </div>
</template>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: column;
}
.submitBtn {
  width: 170px;
  margin-left: auto;
}
</style>
