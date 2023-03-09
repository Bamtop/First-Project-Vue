<template>
  <div class="icon-container">
    <img ref="icon" class="icon" src="src/assets/search-icon.png" alt="I am Jerry">
  </div>
  <div class="search-input-control">
    <input id="search" type="text" required="" v-on:input="searchInput" v-on:blur="stopSpin" >
    <label class="search-label">
      <span style="transition-delay:0ms">S</span><span style="transition-delay:50ms">e</span><span style="transition-delay:100ms">a</span><span style="transition-delay:150ms">r</span><span style="transition-delay:200ms">c</span><span style="transition-delay:250ms">h</span><span style="transition-delay:300ms">.</span><span style="transition-delay:350ms">.</span><span style="transition-delay:400ms">.</span>
    </label>
  </div>

</template>

<script>
export default {
  name: "SearchInput",
  methods: {
    searchInput(event) {
      this.$emit('search-input',event.target.value);
      this.setSpin(event);
          },
    setSpin(event){
      const icon = this.$refs.icon;
      icon.classList.add("spin");

    },
    stopSpin(event){
      const icon = this.$refs.icon;
      icon.classList.remove("spin")
    }


  },

}
</script>

<style>
.search-input-control {
  align-items: center;
  position: relative;
  margin: 2rem 3rem 2rem;
  max-width: 100%;
}

.search-input-control input {
  background-color: white;

  border: 0;
  border-bottom: 0.1rem black solid;
  display: block;
  max-width: 100%;
  padding: 3px 15px;
  font-size: 18px;
  color: black;
}

.search-input-control input:focus,
.search-input-control input:valid {
  outline: 0;
  border-bottom-color: #046501;
}

.search-input-control label {
  position: absolute;
  top: 3px;
  left: 5px;
  pointer-events: none;
  color:black;
}

.search-input-control label span {
  display: inline-block;
  font-size: 18px;
  min-width: 5px;
  color: black;
  transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.search-input-control input:focus + label span,
.search-input-control input:valid + label span {
  color:#046501 ;
  transform: translateY(-50px);
}

.icon-container{
  display: flex;
  justify-content: center;
}

.spin {
  animation-name: spin;
  animation-duration: 4s;
  animation-timing-function: linear;
  animation-iteration-count: 5;
}

@keyframes spin {
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(360deg);
  }
}
</style>