import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'

// Create a new store instance.
const store = createStore({
    state: {
        characters:[],
        statusSelect:["Alive","unknown","Dead"],
        genderSelect:["Male","Female"],
        speciesSelect:["Human","Alien","Humanoid"],
        info:[],
        currentQuery:"",
        filterStatus: "",
        filterGender:"",
        filterSpecie:"",
        isNext:false,
        isPrev:false,
    },

    mutations: {
        setCharacters(state, characters){
            state.characters = characters
        },
        setInfo(state, info){
            state.info = info;
        },
        setQuery(state, query){
          state.currentQuery = 'name=' + query;
        },
        setApi(state, api){
            state.api = api;
        },
        setFilterStatus(state,status){
            state.filterStatus = status;
        },
        setFilterGender(state,gender){
            state.filterGender = gender;
        },
        setFilterSpecie(state,specie){
            state.filterSpecie = specie;
        },
        setNext(state){
            state.isNext = true;
        },
        setPrev(state){
            state.isPrev = true;
        },
},
    getters: {

    },
    actions:{
          fetchCharacters({state,commit}){
              let currentStatus;let currentGender;let currentSpecie
              let query = state.currentQuery;
              currentStatus = state.filterStatus ? "&status=" + state.filterStatus : "";
              currentGender = state.filterGender ? "&gender=" + state.filterGender : "";
              currentSpecie = state.filterSpecie ? "&species="+ state.filterStatus : "";
              let filters = currentStatus + currentGender + currentSpecie;
              let api ="https://rickandmortyapi.com/api/character/?"
              api = api + query + filters;
              if(state.isNext){
                  api =state.info.next
                  state.isNext =false
              }
              if(state.isPrev){
                  api = state.info.prev
                  state.isPrev =false
              }
              fetch(api)
                 .then((data) => data.json())
                 .then((data) => {
                     commit('setCharacters',data.results);
                     commit('setInfo',data.info);
                 });
        }
    }
})

createApp(App).use(store).mount('#app')

