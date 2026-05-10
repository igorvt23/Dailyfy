<template>
  <div class="app-container">
    <TheHeader/>
    <CalendarView/>
    <QuestionAlertModal v-if="showCadastroDiario"/>
    <!-- SIDE TAB WHERE IT WILL SHOW THE BALLS FOR EACH TOPIC WITH THE NUMBER OF QUESTIONS -->
   </div>
</template>

<script>
import TheHeader from './components/TheHeader.vue'
import CalendarView from './components/CalendarView.vue'
import QuestionAlertModal from './components/QuestionAlertModal.vue'
import { backgroundColor, fontColor } from './config/styles.js';

export default {
  name: 'App',
  data(){
    return {
      showCadastroDiario: false,
      backgroundColor: backgroundColor,
      fontColor: fontColor,
    }
  },
  components: {
    TheHeader,
    CalendarView,
    QuestionAlertModal,
  },
  methods: {
    showOrHideModal(){

    }
  },
}
</script>

<style>

/* Registrando a versão normal da fonte */
@font-face {
  font-family: 'JetBrains Mono';
  src: url('./assets/fonts/JetBrainsMono-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
}

/* Registrando a versão negrito (bold) da fonte */
@font-face {
  font-family: 'JetBrains Mono';
  src: url('./assets/fonts/JetBrainsMono-Bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
}

.app-container{
  background-color: v-bind(backgroundColor);
  min-height: 100vh; /* Garante que pegue 100% da altura da tela */
  width: 100vw;
  padding: 15px;
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
  color: v-bind(fontColor);
}
</style>
