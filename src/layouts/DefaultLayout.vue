<script setup>
// Components
import { RouterView, useRouter } from "vue-router";
import Container from "../components/Container/Container.vue";
import { NIcon } from "naive-ui";
// Assets
import Dog from "../assets/icons/Dog.vue";
import User from "../assets/icons/User.vue";

const router = useRouter();
</script>

<template>
  <header class="header">
    <Container>
      <div class="header__container">
        <div class="header__logo" @click="router.push('/')">
          <NIcon size="50">
            <Dog />
          </NIcon>

          FWQ
        </div>

        <div class="header__authBtn" @click="router.push('/auth')">
          <NIcon size="40">
            <User />
          </NIcon>
        </div>
      </div>
    </Container>
  </header>
  <main class="content">
    <Container>
      <RouterView></RouterView>
    </Container>
  </main>
  <footer class="footer">
    <Container>
      Дипломную работу выполнил:
      <span style="font-weight: 600">Татарников Артем</span>
    </Container>
  </footer>
</template>

<style scoped lang="scss">
.header {
  height: 70px;
  padding: 10px;
  background-color: #717792;
  color: #fff;
  display: flex;
  align-items: center;

  &__container {
    display: flex;
    justify-content: space-between;
  }

  &__logo {
    cursor: pointer;
    font-size: 24px;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 12px;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.75;
    }
  }

  &__authBtn {
    cursor: pointer;
    display: flex;
    gap: 12px;
    align-items: center;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.75;
    }
  }
}

.content {
  flex-grow: 1;
  min-height: calc(100% - 70px);
  padding: 20px 0;
  background-color: #f5f5f5;
}

.footer {
  height: 70px;
  padding: 10px;
  background-color: #717792;
  color: #fff;
}
</style>
