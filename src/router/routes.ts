import { RouteRecordRaw } from "vue-router";
import Game from "@/views/Game.vue";
import Editor from "@/views/Editor.vue";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/game",
  },
  {
    path: "/game",
    component: Game,
  },
  {
    path: "/editor",
    component: Editor,
  },
];
