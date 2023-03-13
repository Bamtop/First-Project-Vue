<template>
 <CustomHeader>
    <SearchInput v-on:search-input="setQuery"  ></SearchInput>
 </CustomHeader>

  <main>
    <section class="aside">
      <div class="filters">
        <!--
        <div class="filtersDisplayed">
        <span class="filter-letter"><h2>Filters Displayed</h2></span>
        <span class="filter-letter"><h3>Status</h3></span>
        <CustomFilter
          :filters="filtersStatus"
          v-on:box-checked="setStatus"
        ></CustomFilter>
        <span class="filter-letter"><h3>Gender</h3></span>
        <CustomFilter
          :filters="filtersGender"
          v-on:box-checked="setGender"
        ></CustomFilter>
        <span class="filter-letter"><h3>Species</h3></span>
        <CustomFilter
          :filters="filtersSpecie"
          v-on:box-checked="setSpecies"
        ></CustomFilter>
        </div>
        -->
        <div class="queryFilters">
        <span class="filter-letter"><h2>Filters Querys</h2></span>
        <CustomSelect :filters="statusSelect" nameSelect="Status" v-on:filter-selected="addFilterStatus" ></CustomSelect>
        <CustomSelect :filters="genderSelect" nameSelect="Gender" v-on:filter-selected="addFilterGender" ></CustomSelect>
        <CustomSelect :filters="speciesSelect" nameSelect="Species" v-on:filter-selected="addFilterSpecies" ></CustomSelect>
        </div>
      </div>
    </section>
    <characters-grid>
      <CustomCard></CustomCard>
    </characters-grid>
    <div class="separator">

    </div>
    <custom-button @input-next="setNext" @input-prev="setPrev" ></custom-button>
  </main>
</template>
<script>
import SearchInput from "@/components/SearchInput.vue";
import CustomFilter from "@/components/CustomFilter.vue";
import CustomCard from "@/components/CustomCard.vue";
import CustomSelect from "@/components/CustomSelect.vue";
import CharactersGrid from "@/components/CharactersGrid.vue";
import CustomHeader from "@/components/CustomHeader.vue";
import CustomButton from "@/components/CustomButton.vue";
import {mapState} from "vuex";

export default {
  components: {CustomButton, CustomHeader, CharactersGrid, CustomSelect, CustomCard, CustomFilter, SearchInput },

  data() {
    return {
      filterStatus: [],
      filterGender:[],
      filterSpecie:[],
      currentQuery: "",
      isNext:false,
      isPrev:false,
    };
  },

  methods: {
    setNext(){
      this.isNext = true;
      this.search();
      this.isNext = false;
    },
    setPrev(){
      this.isPrev = true;
      this.search();
      this.isPrev = false;
    },

    setQuery(event){
      this.currentQuery = 'name='+event;
    },
    addFilterStatus(event){
      this.filterStatus ="&status="+event;
    },
    addFilterGender(event){
      this.filterGender = "&gender="+event;
    },
    addFilterSpecies(event){
      this.filterSpecie = "&species="+event;
    },
    search() {
      let currentStatus;
      let currentGender
      let currentSpecie
      let query = this.currentQuery;
      currentStatus = this.filterStatus;
      currentGender = this.filterGender;
      currentSpecie = this.filterSpecie;
      let filters = currentStatus + currentGender+currentSpecie;
      let api ="https://rickandmortyapi.com/api/character/?"
      api = api + query + filters;
      if(this.isNext){
        api =this.$store.state.info.next
      }
      if(this.isPrev){
        api = this.$store.state.info.prev
      }
      fetch(api)
        .then((data) => data.json())
        .then((data) => {
          this.$store.commit('setCharacters',data.results);
          this.$store.commit('setInfo',data.info);

        });
    },
  },
  watch:{
    currentQuery(){
      this.search();
    },
    filterStatus(){
      this.search()
    },
    filterGender(){
      this.search()
    },
    filterSpecie(){
      this.search()
    }
  },
  computed: {
    ...mapState(['statusSelect','genderSelect','speciesSelect','characters']),


  },
};
</script>
<style>
main {
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 14rem auto;
  grid-column-gap: 0.4rem;
  margin-bottom: 1rem;
}
span.filter-letter {
  font-family: Impact;
  color: #04AA6D;
  text-shadow: 0.1em 0.1em 0.2em black;
  font-size: 100%;
}
.queryFilters{
  display: flex;
  flex-direction: column;
}

@media only screen and (max-width: 500px) {
  main {
    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: auto;
    grid-column-gap: 0.4rem;
    margin-bottom: 1rem;
  }
  .aside{
    display: flex;
    justify-content: center;
  }
}

</style>
