<template>
  <div class="container footer-container">
    <div class="row">
        <p class="col-6 mx-auto text-center">Test</p>
        <p class="col-6"><font-awesome-icon
                        size="lg"
                        :icon="['fab', 'github']"
                        @click="goTo('github')"  /></p>
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
