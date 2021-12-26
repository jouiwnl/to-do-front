<template>
  <header class="header">
      <div class="header-title">
          <h1>Laura e joão</h1>
      </div>
      <div class="plus-lane">
          <i class="fa fa-plus" data-toggle="modal" data-target="#modalLane"></i>
      </div>
      <ModalLane />
  </header>
</template>

<script>

import ModalLane from './ModalLane.vue'

export default {
    name: 'Header',
    components: {
        ModalLane
    }
}
</script>

<style scoped>
    .header {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 40px;
        background-color: var(--color-green);
    }

    .header-title h1 {
        padding-top: 5px;
        padding-left: 10px;
        color: white;
        font-weight: bold;
        font-size: 25px;
    }

    .plus-lane {
        font-size: 2rem;
        margin-right: 15px;
        color: rgb(238, 238, 238);
        cursor: pointer;
    }
</style>