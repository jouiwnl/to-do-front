<template>
  <header class="header">
      <div class="header-title">
          <h1>Lista de afazeres</h1>
      </div>      
  </header>
</template>

<script>



export default {
    name: 'Header'
}
</script>

<style scoped>
    .header {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 40px;
        background-color: rgba(255, 255, 255, 0);
    }

    .header-title h1 {
        padding-top: 5px;
        padding-left: 10px;
        color: white;
        font-weight: bold;
        font-size: 25px;
    }
</style>