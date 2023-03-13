<template>
  <section class="grid">
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: "CharactersGrid",
};
</script>

<style>
.grid {
  background: darkkhaki;
  padding: 1.5rem;
  border: black solid 0.1rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-column-gap: 1rem;
  grid-row-gap: 0.8rem;
}
@media only screen and (max-width: 700px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }
}
@media only screen and (max-width: 500px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
