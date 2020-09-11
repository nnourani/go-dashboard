<template>
  <div id="app">
    <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
    <router-view/>
  </div>
</template>

<script>
export default {
    name: 'app',
    computed: {
        alert () {
            return this.$store.state.alert
        }
    },
    watch:{
        $route (to, from){
          console.log(to, from)
            // clear alert on location change
            this.$store.dispatch('alert/clear');
        }
    } 
};
</script>

<style lang="scss">
@import "~@/assets/scss/style";

.c-main {
  padding-top: .5rem;
}
.container-fluid {
  padding-right: 10px !important;
  padding-left: 10px !important;
}
.card {
  margin-bottom: .5rem !important;
}
</style>
