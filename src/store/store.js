import { createStore } from "vuex";
import axios from "axios";
const store = createStore({
  state() {
    return {
      isAdmin: false,
      password: "",
      files: [],
      fileContent: "",
      PROD_MODE: true,
      PROD: {
        // SERVER_LANG: "NODE",
        SERVER_LANG: "PHP",
        NODE: "https://searchinfileserver.onrender.com",
        PHP: "https://ryry.go.yj.fr",
      },
      DEV: {
        // SERVER_LANG: "NODE",
        SERVER_LANG: "PHP",
        NODE: "http://localhost:3000",
        PHP: "http://localhost/SEARCHINFILE_PHP",
      },
    };
  },
  mutations: {
    setFileContent(state, payload) {
      state.fileContent = payload;
    },
    setFiles(state, payload) {
      state.files = payload;
    },
    setIsAdmin(state, payload) {
      state.isAdmin = payload;
    },
    setPassword(state, payload) {
      state.password = payload;
    },
  },
  actions: {
    async initFiles({ commit, state }) {
      let uri = "";
      if (state.PROD_MODE) {
        if (state.PROD.SERVER_LANG == "NODE") {
          uri = state.PROD.NODE;
        } else if (state.PROD.SERVER_LANG == "PHP") {
          uri = state.PROD.PHP + "/src/files.module/file.controller.php";
        }
      } else {
        //local
        if (state.DEV.SERVER_LANG == "NODE") {
          uri = state.DEV.NODE;
        } else if (state.DEV.SERVER_LANG == "PHP") {
          uri = state.DEV.PHP + "/src/files.module/file.controller.php";
        }
      }

      const res = await axios.get(uri);

      commit("setFiles", res.data);
      return res.data;
    },
    async search({ commit, state }, key) {
      let uri = "";
      if (state.PROD_MODE) {
        if (state.PROD.SERVER_LANG == "NODE") {
          uri = state.PROD.NODE;
        } else if (state.PROD.SERVER_LANG == "PHP") {
          uri =
            state.PROD.PHP +
            "/src/files.module/file.controller.php?search=" +
            key;
        }
      } else {
        //local
        if (state.DEV.SERVER_LANG == "NODE") {
          uri = state.DEV.NODE;
        } else if (state.DEV.SERVER_LANG == "PHP") {
          uri =
            state.DEV.PHP +
            "/src/files.module/file.controller.php?search=" +
            key;
        }
      }
      const res = await axios.get(uri);
      commit("setFiles", res.data);
      return res.data;
    },
    async uploadFile({ dispatch }, file) {
      let uri = "";
      if (store.state.PROD_MODE) {
        if (store.state.PROD.SERVER_LANG == "NODE") {
          uri = store.state.PROD.NODE;
        } else if (store.state.PROD.SERVER_LANG == "PHP") {
          uri = store.state.PROD.PHP + "/src/files.module/file.controller.php";
        }
      } else {
        //local
        if (store.state.DEV.SERVER_LANG == "NODE") {
          uri = store.state.DEV.NODE;
        } else if (store.state.DEV.SERVER_LANG == "PHP") {
          uri = store.state.DEV.PHP + "/src/files.module/file.controller.php";
        }
      }
      let formData = new FormData();
      formData.append("files", file);
      const res = await axios.post(uri, formData);
      dispatch("initFiles"); //refresh
      return res.data;
    },
    async checkAdmin({ commit, state }, password) {
      let uri = "";
      if (state.PROD_MODE) {
        if (state.PROD.SERVER_LANG == "NODE") {
          uri = state.PROD.NODE;
        } else if (state.PROD.SERVER_LANG == "PHP") {
          uri =
            state.PROD.PHP +
            "/src/admin.module/admin.controller.php?password=" +
            password;
        }
      } else {
        //local
        if (state.DEV.SERVER_LANG == "NODE") {
          uri = state.DEV.NODE;
        } else if (state.DEV.SERVER_LANG == "PHP") {
          uri =
            state.DEV.PHP +
            "/src/admin.module/admin.controller.php?password=" +
            password;
        }
      }
      const res = await axios.get(uri);
      if (res.data.isAdmin) {
        commit("setIsAdmin", true);
        commit("setPassword", password);
      }
      return res.data.isAdmin;
    },
    async deleteFile({ dispatch, state }, fileName) {
      let uri = "";
      if (state.PROD_MODE) {
        if (state.PROD.SERVER_LANG == "NODE") {
          uri = state.PROD.NODE;
        } else if (state.PROD.SERVER_LANG == "PHP") {
          uri =
            state.PROD.PHP +
            "/src/files.module/file.controller.php?delete=" +
            fileName +
            "&&password=" +
            state.password;
        }
      } else {
        //local
        if (state.DEV.SERVER_LANG == "NODE") {
          uri = state.DEV.NODE;
        } else if (state.DEV.SERVER_LANG == "PHP") {
          uri =
            state.DEV.PHP +
            "/src/files.module/file.controller.php?delete=" +
            fileName +
            "&&password=" +
            state.password;
        }
      }
      const res = await axios.get(uri);
      console.log(res);
      dispatch("initFiles"); //refresh
    },
  },
});
export default store;
