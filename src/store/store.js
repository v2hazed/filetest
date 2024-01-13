import { createStore } from "vuex";
import axios from "axios";
const store = createStore({
  state() {
    return {
      fileContent: "",
    };
  },
  mutations: {
    setFileContent(payload) {
      this.state.fileContent = payload;
    },
  },
  actions: {
    async getFileContent() {
      let res = await axios.get("https://searchinfileserver.onrender.com/file");
      this.commit("setFileContent", res.data);
      return res.data;
    },
  },
});
export default store;
