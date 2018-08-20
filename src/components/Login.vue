<template>
  <div>
    {{aa}}
  </div>
</template>
<style>

</style>

<script>
    export default{
      name:"Login",
      data(){
        return{
          aa:this.$store.state.count
        }
      }
    }
</script>
