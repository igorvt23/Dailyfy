<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* Aqui ficam APENAS os estilos globais que afetam o site todo */

@font-face {
  font-family: 'JetBrains Mono';
  src: url('./assets/fonts/JetBrainsMono-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'JetBrains Mono';
  src: url('./assets/fonts/JetBrainsMono-Bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
}

body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'JetBrains Mono', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* A cor da fonte global pode ficar aqui, se quiser manter */
  color: #333; 
}
</style>