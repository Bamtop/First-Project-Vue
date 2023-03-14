<template>
  <TransitionGroup name="fade">
  <div class="card" v-for="character in characters" v-bind:key="character.id">
    <img class="image-card" v-bind:src="character.image" v-bind:alt="character.name">
    <article class="container">
      <h4><b>{{character.name}}</b></h4>
      <p v-bind:class="character.status">Status:  {{character.status}}</p>
      <p class="card_species">Specie:  {{character.species}}</p>
    </article>
  </div>
  </TransitionGroup>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "CustomCard",

  computed:{
    characters(){
      return this.$store.state.characters;
    }
  }
}
</script>

<style >

.card {
  display: grid;
  padding: 1rem;
  border-radius: 2.5rem;
  background: transparent;
  transition: 1s;
  grid-template-areas: "img" "article";
  aspect-ratio: 16/9;
}
.card:hover{
  transform:rotateY(360deg) rotateX(360deg) scale(1.1);
  background: palegoldenrod;
  border: #2580ef ridge 0.4rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}
.card:hover .container{
  display: block;
  opacity: 1;
}
.image-card {
  grid-area: img;
  width: 100%;
  border-radius: 2.5rem;
}
.container {
  grid-area: article;
  display: none;
  opacity: 0;
  transition: opacity 0.9s ease-in-out;
}
.Alive{
  background-color: #04AA6D;
  border: #04AA6D solid;
  border-radius: 10px;
}
.Dead{
  background-color: red;
  border: red solid;
  border-radius: 10px;
}
.unknown{
  background-color: gray;
  border: gray solid;
  border-radius: 10px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>