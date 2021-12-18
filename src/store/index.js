import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('tokenJWT') || '',
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
          console.log('login store then')

          //mi salvo nella variabile apiToken il token di accesso
          const apiToken = res.data.token;

          //salvo nel local Storage il token
          localStorage.setItem('tokenJWT', apiToken);

          //salvo il token all'interno dello store dell'applicazione
          context.commit('setToken', { token: apiToken })

          return res

        })
        .catch(e => {
          console.error(e);

          localStorage.removeItem('tokenJWT')

          return e

        })

    },

    register: (context, payload) => {
      console.log('register', payload);

      axios.post('http://staging.iakta.net:8000/api/register', payload)
        .then(res => {
          console.log(res.data);

          //TODO: se la registrazione va a buon fine eseguire login per ricevere token
        })
        .catch(e => {
          console.error(e);
        })
    },

    logout: (context) => {

      const headers = { 'Authorization': `Bearer ${context.state.token}` }

      axios.post('http://staging.iakta.net:8000/api/logout', headers)
      .then((res) => {
        console.log(res.data)

        localStorage.removeItem('tokenJWT')

        context.commit('setToken', { token: '' })

      })
      .catch(e => {
        console.log(e)
      })

    },

    getUsers: (context, payload) => {

      console.log('token store', context.state.token)

      const headers = { 'Authorization': `Bearer ${context.state.token}` }
      console.log(headers, context, payload)

      axios.get('http://staging.iakta.net:8000/api/listUsers', {
        'headers': headers
      })
        .then(res => {
          console.log(res)
        })
        .catch(e => {
          console.log(e);
        });
    }
  },

  modules: {
  }
})
