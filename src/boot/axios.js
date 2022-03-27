import axios from "axios";

//conexion de axios con https://ghibliapi.herokuapp.com
const api = axios.create({ baseURL: "https://ghibliapi.herokuapp.com" });

//funcion para realizar consultas get personalizadas desde cualquier parte del proyecto
export const get = async (url, params, options) => {
  if (params === void 0) { params = {}; }
  if (options === void 0) { options = {}; }

  return api.get(url, {...options, params})
}

