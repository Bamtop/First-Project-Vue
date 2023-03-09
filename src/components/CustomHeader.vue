<template>
  <header class="header">
    <div class="logo-container">
    <img class="logo-header" src="src/assets/navbar-logo.png" alt="rick y morty logo"/>
    </div>
   <div class="search-container">

    <slot></slot>

   </div>
  </header>
</template>

<script>
export default {
  name: "CustomHeader",

}
</script>

<style >
.header {
  display: flex;
  justify-content: space-between;
  background-color: #04AA6D;
  border: #025939 solid;
  margin-bottom: 1rem;
  height: auto;
}
.logo-container{
  max-width: 100%;
  width: auto;
  overflow: hidden;
}
img.logo-header {
  max-width: 50%;
  transition: 0.5s;
  padding-left: 1rem;
}
img.logo-header:hover {
  transform: scale(1.15);
}

.search-container{

}
</style>