<template>

  <div class="buttons-prev-next">
    <button v-if='info.prev !== null' @click="inputPrevButton" class="prev-button">
      <img class="prev-image" src="src/assets/prev-icon.png" alt="prev-button">
      <span><b>Prev Page</b></span>
    </button>

    <button v-if='info.next !== null'  @click="inputNexButton"  class="next-button">
      <img class="next-image" src="src/assets/next-icon.png" alt="next-button" >
      <span><b>Next Page</b></span>
    </button>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {

  methods:{
    inputNexButton(){
      this.$store.commit("characters/setNext")
      this.$store.dispatch('characters/fetchCharacters')
    },
    inputPrevButton(){
      this.$store.commit("characters/setPrev")
      this.$store.dispatch('characters/fetchCharacters')
    }
  },
  computed:{
    ...mapState("characters",['info']),

  }
}
</script>

<style scoped>
div.buttons-prev-next {
  display: flex;
  justify-content: center;
  padding: 1rem;
  gap: 2rem;
}

button.prev-button {
  background-color: darkkhaki;
  width: 50px;
  height: 50px;
  box-shadow: 0px 0px 10px #fdea0c;
}

button.prev-button span {
  font-size: 5px;
}

button.next-button span {
  font-size: 5px;
}

button.next-button {
  background-color: darkkhaki;
  width: 50px;
  height: 50px;
  box-shadow: 0px 0px 10px #fdea0c;
}

img.prev-image {
  max-width: 100%;
  height: auto;
  display: block;
  margin: auto;
}

img.next-image {
  max-width: 100%;
  height: auto;
  display: block;
  margin: auto;
}

</style>