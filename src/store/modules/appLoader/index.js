/* eslint no-shadow: ["error", { "allow": ["state"] }] */
/* eslint linebreak-style: ["error", "windows"] */

// initial state
const state = {
  isLoading: false,
};

// getters
const getters = {
  isLoading: (state) => state.isLoading,
};

// actions
const actions = {
  /**
   * Function to set status of loading icon
   * @date 2020-06-20
   * @param {any} {commit}
   * @param {any} payload
   * @returns {any}
   */
  setLoading({ commit }, payload) {
    commit('setLoading', {
      status: payload.status,
    });
  },
};

// mutations
const mutations = {
  setLoading(state, status) {
    state.isLoading = status;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
