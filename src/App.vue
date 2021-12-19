<template>
  <div class="app-container">
    <Typer/>
    <Footer/>
  </div>
</template>

<script>
import Typer from './components/Typer.vue'
import Footer from './components/Footer.vue'
export default {
  name: 'App',
  components: {
    Typer,
    Footer
  }
}
</script>
