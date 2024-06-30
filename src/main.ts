import { createApp } from "vue";
import { setupRouter } from "./router/index";
import { setupStore } from "./store/index";
import App from "./App.vue";
import "./style.css";

async function bootstrap() {
  const app = createApp(App);
  setupStore(app);
  await setupRouter(app);
  app.mount("#app");
}

bootstrap();
