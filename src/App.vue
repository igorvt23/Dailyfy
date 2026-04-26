<template>
  <TheHeader/>
  <CalendarView/>
</template>

<script>
import TheHeader from './components/TheHeader.vue'
import CalendarView from './components/CalendarView.vue'

export default {
  name: 'App',
  components: {
    TheHeader,
    CalendarView,
  },
  methods: {
    showOrHideModal(){

    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
