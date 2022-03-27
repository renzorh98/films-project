import axios from "axios";

const api = axios.create({ baseURL: "https://ghibliapi.herokuapp.com" });

export const get = async (url, params, options) => {
  if (params === void 0) { params = {}; }
  if (options === void 0) { options = {}; }

  return api.get(url, {...options, params})
}

