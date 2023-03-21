<template>
  <TransitionGroup name="fade">
    <div class="card" v-for="character in characters" v-bind:key="character.id">
      <div class="card-flip">
        <div class="card-flip-front">
          <img
              class="image-card"
              v-bind:src="character.image"
              v-bind:alt="character.name"
          />
          <div class="image-name">
            <span class="name">{{ character.name }}</span>
          </div>
        </div>
        <div class="card-flip-back">
          <article class="container">
            <h4>
              <b>{{ character.name }}</b>
            </h4>
            <p v-bind:class="character.status">
              Status: {{ character.status }}
            </p>
            <p class="card_species">Specie: {{ character.species }}</p>
          </article>
        </div>
      </div>
    </div>
  </TransitionGroup>
</template>

<script lang="ts">
import { mapState } from "vuex";
import {defineComponent} from "vue";

 export default defineComponent({
  name: "CustomCard",

  computed: {
    characters() {
      return this.$store.getters["characters/getCharacters"];
    },
  },
}
);
</script>

<style>
.card {
  display: flex;
  flex-flow: column;
  padding: 1rem;
  border-radius: 2.5rem;
  background: transparent;
  height: 300px;
  width: 300px;
}

.card-flip {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  text-align: center;
}

.card:hover .card-flip {
  cursor: pointer;
  transform: rotateY(180deg);
}

.image-name {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100% - 100px);
  background: #04aa6d;
  border-radius: 2.5rem;
}
.image-card {
  border-radius: 2.5rem;
}

.card-flip-front,
.card-flip-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 2.5rem;
}

.card-flip-back {
  border: #2580ef ridge 0.4rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  background: palegoldenrod;
  transform: rotateY(180deg);
}

.Alive {
  background-color: #04aa6d;
  border: #04aa6d solid;
  border-radius: 10px;
}
.Dead {
  background-color: red;
  border: red solid;
  border-radius: 10px;
}
.unknown {
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