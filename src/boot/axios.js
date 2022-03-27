import { boot } from "quasar/wrappers";
import axios from "axios";

const api = axios.create({ baseURL: "https://ghibliapi.herokuapp.com/" });
const getFilms = () => {
  api.get("/films").then((response) => {
    return response;
  }).catch((error) => {
    console.warn("https://ghibliapi.herokuapp.com/films:" + error);
  });
};

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

export { api, getFilms };
