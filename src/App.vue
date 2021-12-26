<template>
  <div id="app" class="wrapper">
    <Header />
    <div class="board">
      <div class="column-wrapper" v-for="column in columns" :key="column.id">
        <h5 class="text-center">{{column.name}}</h5>
        <div v-for="card in column.cards" :key="card.id">
          <Card :description="card.description" :name="card.name" />
        </div>
        <div class="plus-card text-center" data-toggle="modal" data-target="#modalCard">
          <i class="fa fa-plus"></i>
        </div>
      </div>
    </div>

    <ModalCard />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Card from './components/Card.vue'
import ModalCard from './components/ModalCard.vue'
import LanesService from './components/services/LanesService.js'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'

export default {
  name: 'App',
  components: {
    Header,
    Card,
    ModalCard
  },
  data() {
    return {
      columns: []
    }
  },
  mounted() {
    LanesService.listar().then(res => {
      this.columns = res.data; 
    })
  }
}
</script>

<style>
  .wrapper {
    height: 100vh;
    background-color: var(--color-green-light);
  }

  .board {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .column-wrapper {
    background: var(--color-grey);
    width: 18rem;
    border-radius: 0.8rem;
    box-shadow: 0 0.1rem 0.2rem 0 rgba(33, 33, 33, 0.1);
    margin: 0.8rem;
    padding: 0.6rem;
  }

  .placeholder {
    background: rgba(33, 33, 33, 0.08);
    border-radius: 0.8rem;
    transform: scaleY(0.85);
    transform-origin: 0% 0%;
  }

  .plus-card {
    transition: all ease 0.3s;
    border-radius: 16px;
    cursor: pointer;
  }

  .plus-card:hover {
    transition: all ease 0.5s;
    background-color: grey;
  }
</style>
