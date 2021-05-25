import axios from 'axios';
import { throttle } from 'lodash-es';

function redirectToLogin(url) {
  window.location.replace(url);
}

export default {
  namespaced: true,

  state: {
    authError: false,
  },

  mutations: {
    authError(state, value) {
      state.authError = value;
    },
  },

  actions: {
    async authoriseWithLogin({ commit, rootState, rootGetters }, { email, password, remember }) {
      try {
        commit('authError', '');
        const { data } = await axios.post(rootGetters.urls.apiLoginUrl, {
          challenge: rootState.challenge,
          connection: 'password',
          email,
          password,
          remember: (remember === '1'),
        }, {
          headers: { 'If-Unmodified-Since': (new Date()).toUTCString() },
        });
        const throttled = throttle(redirectToLogin(data.url), 100);
        throttled();
      } catch (error) {
        if (error.response) {
          commit('authError', error.response.data.error_message);
        }
      }
    },

    async autoLogin({ commit, rootState, rootGetters }, { previousLogin }) {
      try {
        commit('authError', '');
        const { data } = await axios.post(rootGetters.urls.apiLoginUrl, {
          challenge: rootState.challenge,
          previousLogin,
        });
        const throttled = throttle(redirectToLogin(data.url), 100);
        throttled();
      } catch (error) {
        if (error.response) {
          commit('authError', error.response.data.error_message);
        }
      }
    },

    clearAuthError({ commit }) {
      commit('authError', '');
    },
  },
};
