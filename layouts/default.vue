<template>
  <div>
    <Navigation/>
    <div class="content">
      <Nuxt />
    </div>
  </div>
  
</template>
<script>
  import Navigation from "../components/navigation";
  export default{
    component:{
      Navigation
    }
  }
</script>

<style>
  *{
    box-sizing: border-box;
    color:whitesmoke;
  }
  body{
    background-color: #cccccc;
    color: whitesmoke;
    font-family: Arial, Helvetica, sans-serif;
    padding-top: 0;
  }
  .content{
    padding: 1rem;
  }
  table, input,button,select,option{
    background: #a3a3a3;
  }

  
</style>