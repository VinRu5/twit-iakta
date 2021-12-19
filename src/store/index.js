import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const generateHeaders = (token) => {
  return { headers: { Authorization: `Bearer ${token}` } }
}

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('tokenJWT') || '',
    users: [],
    followedUsers: [],
    posts: [],
    postDetails: [],
  },


  getters: {
    isAuthenticated: state => !!state.token,
    getUsers: state => state.users,
    getFollowedUsers: state => state.followedUsers,
    getPosts: state => state.posts,
    getPostDetails: state => state.postDetails,
  },

  mutations: {
    setToken: (state, data) => {
      state.token = data.token
    },

    setUsers: (state, data) => {
      state.users = data.users
    },

    setFollowedUsers: (state, data) => {
      state.followedUsers = data.followedUsers
    },

    setPosts: (state, data) => {
      const posts = data.posts;
      const newData = posts.map(post => {
        return {...post, viewComment: false}
      });
      console.log('mut', newData)
      state.posts = newData
    },

    setPostDetails: (state, data) => {
      state.postDetails = data.postDetails
    },
  },

  actions: {
    login: (context, payload) => { //servizio per effettuare il login
      console.log('context', context, 'payload', payload)

      //chiamo l'api passando i dati di login
      return axios.post('http://staging.iakta.net:8000/api/login', payload)
        .then(res => {
          console.log(res.data);
          console.log('login store then')

          //mi salvo nella variabile apiToken il token di accesso
          const apiToken = res.data.token;

          //salvo nel local Storage il token
          localStorage.setItem('tokenJWT', apiToken);

          //salvo il token all'interno dello store dell'applicazione
          context.commit('setToken', { token: apiToken })
          console.log('apiToken', apiToken)

          return res

        })
        .catch(e => {
          console.error(e);

          //cancello il token dalla memoria se ottengo errore nel login
          localStorage.removeItem('tokenJWT')

          return e

        })

    },

    register: (context, payload) => { //servizio di registrazione utente
      console.log('register', payload);

      return axios.post('http://staging.iakta.net:8000/api/register', payload)
        .then(res => {
          console.log(res.data);

          //TODO: se la registrazione va a buon fine eseguire login per ricevere token
        })
        .catch(e => {
          console.error(e);
        })
    },

    logout: (context) => { //servizio per il logout

      const params = null;

      return axios.post('http://staging.iakta.net:8000/api/logout', params, generateHeaders(context.state.token))
      .then((res) => {
        console.log(res.data)

        localStorage.removeItem('tokenJWT')

        context.commit('setToken', { token: '' })

      })
      .catch(e => {
        console.log(e)
      })

    },

    getApiUsers: (context) => { //servizio per ricevere tutti gli utenti registrati

      //chiatmata api per richiedere gli utenti dell'app
      axios.get('http://staging.iakta.net:8000/api/listUsers', generateHeaders(context.state.token))
        .then(res => {
          //se esistono vengono settati in users
          context.commit('setUsers', { users: res.data })
        })
        .catch(e => {
          console.log(e);
          //se da errore viene rimosso il token
          localStorage.removeItem('tokenJWT')
        });
    },

    getApiFollowedUsers: (context) => {
      
      //chiamata api per prendere gli utenti che si stanno seguendo
      axios.get('http://staging.iakta.net:8000/api/followedUsers', generateHeaders(context.state.token))
        .then(res => {
          //se esiste setto followedUsers
          context.commit('setFollowedUsers', { followedUsers: res.data })
        })
        .catch(err => {
          console.log(err);
          //se da errore viene rimosso il token
          localStorage.removeItem('tokenJWT')
        })

    },

    addFollowUser: (context, payload) => {

      //effettuo chiamata api per aggiungere l'utente ai seguiti
      return axios.post('http://staging.iakta.net:8000/api/followUser', { id: payload.id }, generateHeaders(context.state.token))
        .then(res => {
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })

    },

    removeFollowUser: (context, payload) => {


      const params = {
        headers: {
          Authorization: `Bearer ${context.state.token}`
        },
        data: {
          id: payload.id
        }
      };
      console.log('delete',params)

      //effettuo chiamata api per rimuovere l'utente ai seguiti
      return axios.delete('http://staging.iakta.net:8000/api/unFollowUser', params)
        .then(res => {
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })

    },

    postMessage: (context, payload) => {

      //effettuo la chiamata api er postare il messaggio
      return axios.post('http://staging.iakta.net:8000/api/postMessage', { message: payload.text }, generateHeaders(context.state.token))
        .then(res => {
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },

    getApiPosts: (context) => {

      //prendo tutti i post pubbicati
      axios.get('http://staging.iakta.net:8000/api/posts', generateHeaders(context.state.token))
        .then(res => {
          console.log(res.data)
          context.commit('setPosts', { posts: res.data })
        })
        .catch(err => {
          console.log(err)
        })
    },

    getApiPostDetails: (context, payload) => {

      //prendo i dettagli di un post specifico
      axios.get(`http://staging.iakta.net:8000/api/postDetail/${payload.id}`, generateHeaders(context.state.token))
        .then(res => {
          console.log(res.data)
          context.commit('setPostDetails', { postDetails: res.data })
        })
        .catch(err => {
          console.log(err)
        })
    },

    addComment: (context, payload) => {

      //aggiungo un commento
      return axios.post('http://staging.iakta.net:8000/api/addcomment', { postId: payload.postId, comment: payload.comment }, generateHeaders(context.state.token))
        .then(res => {
          console.log(res.data)
          return res
        })
        .catch(err => {
          console.log(err)
          return err
        })
    },

    removeComment: (context, payload) => {
      const params = {
        headers: {
          Authorization: `Bearer ${context.state.token}`
        },
        data: {
          postId: payload.postId,
          commentId: payload.commentId
        }
      };
  
      //effettuo chiamata api per rimuovere il commento
      return axios.delete('http://staging.iakta.net:8000/api/deleteComment', params)
        .then(res => {
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },


})
