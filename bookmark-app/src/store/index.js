import { createStore } from 'vuex'

export default createStore({
  state: {
    dataEdit:{}
  },
  mutations: {
  SETDATA: (state) => {
      state.dataEdit = true;
    },
  },
  actions: {
     setData: async (context, payload) => {
      context.commit('SETDATA',payload)
     }
  },
  modules: {
  }
})
