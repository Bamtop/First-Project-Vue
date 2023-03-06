<template>
  <div class="card" v-for="character in characters">
    <img class="image-card" v-bind:src="character.image" v-bind:alt="character.name">
    <article class="container">
      <h4><b>{{character.name}}</b></h4>
      <p class="card_status alive dead">Status:  {{character.status}}</p>
      <p class="card_species">Specie:  {{character.species}}</p>
    </article>
  </div>
</template>

<script>
export default {
  name: "CustomCard",
  props:{
    characters:{
      type: Array
    }
  }
}
</script>

<style >
.card {
  display: grid;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 1rem;
  border-radius: 2.5rem;
  background: palegoldenrod;
  border: #04AA6D ridge 0.4rem;
  transition: 0.5s;
  grid-template-areas: "img" "article";
}
img.image-card {
  grid-area: img;
  width: 100%;
  border-radius: 2.5rem;
}

.container {
  grid-area: article;
}
.alive{
  background-color: #04AA6D;
}
.dead{
  background-color: red;
}
</style>