<template>
  <div class="container footer-container">
    <div class="row text-center">
        <p class="col-12 mt-5">
            <font-awesome-icon
                class="icon"
                size="lg"
                :icon="['fab', 'github']"
                @click="goTo('github')"  />
        </p>
    </div>
    <div class="row">
        <p class="col-12 mx-auto text-center mt-2 mb-5">Licensed by @Marcus Vilhelmsson, Creative Commons <a rel="license" href="http://creativecommons.org/licenses/by-nd/4.0/"><img alt="Creative Commons-licens" style="border-width:0" src="https://i.creativecommons.org/l/by-nd/4.0/80x15.png" /></a> </p>
        
    </div>
  </div>
</template>

<script>
import information from '../mixins/information'
export default {
  name: 'Footer',
  components: {},
  mixins: [information],
  methods: {
        goTo: function(link){
          const information = this.getContactInformation()
          switch(link){
            case 'github':
                window.open(information.githubLink)
                break;
          }
      }
  }
}
</script>
