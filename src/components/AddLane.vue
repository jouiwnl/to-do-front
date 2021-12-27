<template>
  <div class="addColumn">
      <div class="addColumnButton" data-toggle="modal" data-target="#modalLane">
          + Adicionar mais uma coluna
      </div>
      <ModalLane />
  </div>
</template>

<script>

import ModalLane from './ModalLane.vue'

export default {
    name: 'AddLane',
    components: {
        ModalLane
    }
}
</script>

<style scoped>
    .addColumn {
        margin: 0.8rem;
        cursor: pointer;
        min-width: 15rem;
    }

    .addColumn:hover {
        background-color: rgba(245, 245, 245, 0.61);
        transition: all ease 0.2s;
    }

    .addColumnButton {
        background-color: rgba(236, 236, 236, 0.61);
        padding: 0.7rem;
        border-radius: 0.3rem;
        transition: all ease 0.2s;
    }
</style>