import { createApp } from "vue";
import App from "./App.vue";
import { vuetify } from "./theme/vuetify";

createApp(App)
    .use(vuetify)
    .mount("#app");
