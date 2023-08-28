import { createStore } from 'vuex';

export default createStore({
  state: {
    bettingOpen: true
  },
  mutations: {
    openBetting(state) {
        state.isBettingOpen = true;
    },
    closeBetting(state) {
        state.isBettingOpen = false;
    }
  },
  actions: {},
  getters: {
    isBettingOpen(state) {
      return state.bettingOpen;
    }
  }
});
