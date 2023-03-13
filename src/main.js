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
    },

    mutations: {
        setCharacters(state, characters){
            state.characters = characters
        },
        setInfo(state, info){
            state.info = info;
        }
},
    getters: {

    }

})

createApp(App).use(store).mount('#app')

