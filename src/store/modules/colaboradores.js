import * as types from "../mutation-types";
import colaboradorAPI from "@/api/colaborador";

export const actions = {
  createColaborador({ commit }, payload) {
    return new Promise((resolve, reject) => {
      colaboradorAPI
        .post(payload)
        .then(response => {
          this._vm.$notify.success({
            title: "COLABORADOR",
            message: "El colaborador ha sido creado con éxito."
          });
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}
