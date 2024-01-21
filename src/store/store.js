import { createStore } from "vuex";
import axios from "axios";
const store = createStore({
  state() {
    return {
      fileContent: "",
      ENV: "dev",
    };
  },
  mutations: {
    setFileContent(payload) {
      this.state.fileContent = payload;
    },
  },
  actions: {
    async getFileContent() {
      let uri = "";
      if (this.state.ENV == "production") {
        ("https://searchinfileserver.onrender.com/file");
      } else {
        ("http://localhost:3000/file");
      }
      let res = await axios.get(uri);
      console.log(res);
      this.commit("setFileContent", res.data);
      return res.data;
    },
  },
});
export default store;
