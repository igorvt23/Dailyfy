<template>
  <div class="app-container">
    <TheHeader/>
    <CalendarView/>
    <QuestionAlertModal v-if="showCadastroDiario"/>
    </div>
</template>

<script>
import TheHeader from '../components/TheHeader.vue'
import CalendarView from '../components/CalendarView.vue'
import QuestionAlertModal from '../components/QuestionAlertModal.vue'
import { backgroundColor, fontColor } from '../config/styles.js';

export default {
  name: 'MainView',
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

<style scoped>
    /* O scoped ensures specific styles leak onto other screens */
    .app-container {
    background-color: v-bind(backgroundColor);
    min-height: 100vh;
    width: 100vw;
    padding: 15px;
    }
</style>