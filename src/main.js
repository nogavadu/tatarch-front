import App from "./App.vue";
import { createApp } from "vue";
// Dependencies
import { createPinia } from "pinia";
import router from "./router";
// Fonts
import "vfonts/Lato.css";
import "vfonts/FiraCode.css";
// Scss
import "../src/scss/nullstyle.scss";
import "../src/scss/app.scss";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.mount("#app");
