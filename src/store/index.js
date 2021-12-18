import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('tokenJWT'),
  },


  getters: {
    isAuthenticated: state => !!state.token,
  },

  mutations: {
    setToken: (state, data) => {
      state.token = data.token
    }
  },

  actions: {
    login: (context, payload) => {
      console.log('context', context, 'payload', payload)

      //chiamo l'api passando i dati di login
      axios.post('http://staging.iakta.net:8000/api/login', payload)
        .then(res => {
          console.log(res.data);

          //mi salvo nella variabile apiToken il token di accesso
          const apiToken = res.data.token;

          //salvo nel local Storage il token
          localStorage.setItem('tokenJWT', apiToken);

          //salvo il token all'interno dello store dell'applicazione
          context.commit('setToken', { token: apiToken })

        })
        .catch(e => {
          console.error(e);

        })

    },

    register: (context, payload) => {
      console.log('register', payload);

      axios.post('http://staging.iakta.net:8000/api/register', payload)
        .then(res => {
          console.log(res.data);

        })
        .catch(e => {
          console.error(e);
        })
    }
  },

  modules: {
  }
})
