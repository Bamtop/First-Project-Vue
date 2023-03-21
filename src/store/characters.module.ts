import {Commit, Dispatch, Module, Store} from "vuex";
import { State } from "vue";
import { ComponentCustomProperties } from "vue";


declare module '@vue/runtime-core' {
    interface State {
        characters:String,
        info:String,
        query:URL,
        name:String,
    }
    interface ComponentCustomProperties {
        $store: Store<State>|Store<Commit>|Store<Dispatch>
    }
}
// @ts-ignore
export const charactersModule:Module<any, any>= {
    namespaced: true,
    state: () => ({
        characters:[],
        info:[],
        isNext:false,
        isPrev:false,
    }),
    mutations: {
        setCharacters(state:any, characters:any){
            state.characters = characters
        },
        setNext(state:any){
            state.isNext = true;
        },
        setPrev(state:any){
            state.isPrev = true;
        },
        setInfo(state:any, info:any){
            state.info = info;
        },


    },
    actions: {
        fetchCharacters({rootState,commit,state}){
            let currentStatus;let currentGender;let currentSpecie;let query
            query = rootState.filters.currentQuery ? "name=" + rootState.filters.currentQuery  : "";
            currentStatus = rootState.filters.filterStatus ? "&status=" + rootState.filters.filterStatus   : "";
            currentGender = rootState.filters.filterGender  ? "&gender=" + rootState.filters.filterGender : "";
            currentSpecie = rootState.filters.filterSpecie ? "&species="+ rootState.filters.filterSpecie : "";
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

    },
    getters:{
        getCharacters(state){
            return state.characters
        }
    }
}