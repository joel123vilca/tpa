import axios from "axios";
import { baseUrlAPI } from "@/config/api";

const HOST = baseUrlAPI;
export default {
  get(payload = {}) {
    const params = payload.params || {};
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/consultas`,
        method: "get",
        params
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  },
  patch(payload = {}) {
    const consultaId = payload.consultaId;
    const data = payload.data || {};
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/consultas/${consultaId}/estado`,
        method: "patch",
        data
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  },
}
