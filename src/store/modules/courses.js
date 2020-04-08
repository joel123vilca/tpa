import * as types from "../mutation-types";
import courseAPI from "@/api/course";

export const state = {
    courses: [],
    loadingCourses: false,
    currentCourse: null,
    showModalDeleteCourse: false,
    tipoCursos: [],
    loadingTipoCursos: false,
    colaboradoresDisponibles: [],
    loadingColaboradoresDisponibles: false,
    cursosDisponibles: [],
    loadingCursosDisponibles: false,
};

export const actions = {
    getCourses({ commit }, payload) {
        commit(types.REPLACE_LOADING_COURSES, { status: true });
        return new Promise((resolve, reject) => {
            courseAPI
                .get(payload)
                .then(response => {
                    const courses = response.data.data;
                    console.log(courses);
                    commit(types.REPLACE_LOADING_COURSES, { status: false });
                    commit(types.REPLACE_COURSES, { courses });

                    resolve(response);
                })
                .catch(error => {
                    commit(types.REPLACE_LOADING_COURSES, { status: false });
                    reject(error);
                });
        });
    },
    getTipoCursos({ commit }, payload) {
        commit(types.REPLACE_LOADING_TIPO_CURSOS, { status: true });
        return new Promise((resolve, reject) => {
            courseAPI
                .getTipoCursos(payload)
                .then(response => {
                    const tipoCursos = response.data.data;
                    commit(types.REPLACE_LOADING_TIPO_CURSOS, { status: false });
                    commit(types.REPLACE_TIPO_CURSOS, { tipoCursos });

                    resolve(response);
                })
                .catch(error => {
                    commit(types.REPLACE_LOADING_TIPO_CURSOS, { status: false });
                    reject(error);
                });
        });
    },
    getCourse({ commit }, payload) {
        return new Promise((resolve, reject) => {
            courseAPI
                .getById(payload)
                .then(response => {
                    const course = response.data.data;

                    commit(types.REPLACE_CURRENT_COURSE, { course });

                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    deleteCourse({ commit }, payload) {
        return new Promise((resolve, reject) => {
            courseAPI
                .delete(payload)
                .then(response => {
                    this._vm.$notify.success({
                        title: "Curso",
                        message: "El curso han sido eliminado con éxito."
                    });
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    replaceCurrentCourse({ commit }, payload) {
        commit(types.REPLACE_CURRENT_COURSE, payload);
    },
    replaceShowModalDeleteCourse({ commit }, payload) {
        commit(types.REPLACE_SHOW_MODAL_DELETE_COURSE, payload);
    },
    updateCourse({ commit }, payload) {
        return new Promise((resolve, reject) => {
            courseAPI
                .put(payload)
                .then(response => {
                    this._vm.$notify.success({
                        title: "Curso",
                        message: "El curso ha sido actualizado con éxito."
                    });

                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

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
    },
    getColaboradoresDisponibles({ commit }, payload) {
        commit(types.REPLACE_LOADING_COLABORADORES_DISPONIBLES, { status: true });
        return new Promise((resolve, reject) => {
            courseAPI
                .getColaboradoresDisponibles(payload)
                .then(response => {
                    const colaboradoresDisponibles = response.data.data;
                    commit(types.REPLACE_LOADING_COLABORADORES_DISPONIBLES, { status: false });
                    commit(types.REPLACE_COLABORADORES_DISPONIBLES, { colaboradoresDisponibles });

                    resolve(response);
                })
                .catch(error => {
                    commit(types.REPLACE_LOADING_COLABORADORES_DISPONIBLES, { status: false });
                    reject(error);
                });
        });
    },
    getCursosDisponibles({ commit }, payload) {
        commit(types.REPLACE_LOADING_CURSOS_DISPONIBLES, { status: true });
        return new Promise((resolve, reject) => {
            courseAPI
                .getCursosDisponibles(payload)
                .then(response => {
                    const cursosDisponibles = response.data.data;
                    commit(types.REPLACE_LOADING_CURSOS_DISPONIBLES, { status: false });
                    commit(types.REPLACE_CURSOS_DISPONIBLES, { cursosDisponibles });

                    resolve(response);
                })
                .catch(error => {
                    commit(types.REPLACE_LOADING_CURSOS_DISPONIBLES, { status: false });
                    reject(error);
                });
        });
    },
    asignarCurso({ commit }, payload) {
        return new Promise((resolve, reject) => {
            courseAPI
                .cursoSeleccionado(payload)
                .then(response => {
                    this._vm.$notify.success({
                        title: "CURSO",
                        message: "El curso ha sido asignado con éxito."
                    });

                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

};

export const mutations = {
    [types.REPLACE_LOADING_COURSES](state, { status }) {
        state.loadingCourses = status;
    },
    [types.REPLACE_COURSES](state, { courses }) {
        state.courses = courses;
    },
    [types.REPLACE_CURRENT_COURSE](state, { course }) {
        state.currentCourse = course;
    },
    [types.REPLACE_SHOW_MODAL_DELETE_COURSE](state, { status }) {
        state.showModalDeleteCourse = status;
    },
    [types.REPLACE_LOADING_TIPO_CURSOS](state, { status }) {
        state.loadingTipoCursos = status;
    },
    [types.REPLACE_TIPO_CURSOS](state, { tipoCursos }) {
        state.tipoCursos = tipoCursos;
    },
    [types.REPLACE_LOADING_COLABORADORES_DISPONIBLES](state, { status }) {
        state.loadingColaboradoresDisponibles = status;
    },
    [types.REPLACE_COLABORADORES_DISPONIBLES](state, { colaboradoresDisponibles }) {
        state.colaboradoresDisponibles = colaboradoresDisponibles;
    },

    [types.REPLACE_LOADING_CURSOS_DISPONIBLES](state, { status }) {
        state.loadingCursosDisponibles = status;
    },
    [types.REPLACE_CURSOS_DISPONIBLES](state, { cursosDisponibles }) {
        state.cursosDisponibles = cursosDisponibles;
    },
};