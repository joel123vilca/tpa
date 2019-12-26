import * as types from "../mutation-types";
import courseAPI from "@/api/course";

export const state = {
};

export const actions = {
  createCourse({ commit }, payload) {
    return new Promise((resolve, reject) => {
      courseAPI
        .post(payload)
        .then(response => {
          this._vm.$notify.success({
            title: "CURSO",
            message: "El curso ha sido creado con éxito."
          });

          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}
