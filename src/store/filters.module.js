export const filtersModule = {
    namespaced : true,
    state: () => ({
        statusSelect:["Alive","unknown","Dead"],
        genderSelect:["Male","Female"],
        speciesSelect:["Human","Alien","Humanoid"],
        currentQuery:"",
        filterStatus: "",
        filterGender:"",
        filterSpecie:"",
    }),
    mutations: {
        setQuery(state, query){
            state.currentQuery = query;
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

    },
}