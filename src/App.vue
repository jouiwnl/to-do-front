<template>
  <div id="app" class="wrapper">
    <Header />
    <div class="board" v-dragscroll>
      <div class="column-wrapper" v-for="column in columns" :key="column.id">
        <div class="column-header">
          <h5 id="columnTitle" class="text-center">{{column.name}}</h5>
          <i id="deleteColumn" class="fa fa-ellipsis-h"></i>
        </div>
        <div v-for="card in column.cards" :key="card.id" v-on:click="enviaInfoCard(card)" data-toggle="modal" data-target="#modalCard">
          <Card :name="card.name" />
        </div>
        <div class="plus-card text-center" v-on:click="enviaInfoColuna(column)" data-toggle="modal" data-target="#modalCard">
          <i class="fa fa-plus"></i><small> Adicionar um cartão</small>
        </div>
        <ModalCard :column="infoColuna" :card="infoCard"/>
      </div>
      <AddLane />
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Card from './components/Card.vue'
import ModalCard from './components/ModalCard.vue'
import AddLane from './components/AddLane.vue'
import LanesService from './components/services/LanesService.js'
import 'font-awesome/css/font-awesome.css'
import { dragscroll } from 'vue-dragscroll';

export default {
  name: 'App',
  components: {
    Header,
    Card,
    ModalCard,
    AddLane
  },
  data() {
    return {
      columns: [],
      activeScroll: true,
      infoColuna: {},
      infoCard: {}
    }
  },
  mounted() {
    LanesService.listar().then(res => {
      this.columns = res.data; 
    })
  },
  methods: {
    deleteColumn(id) {
      LanesService.deletar(id).then(() => {
        window.location.reload()
        alert('Registro excluído com sucesso!')
      })
    },

    enviaInfoColuna(coluna) {
      this.activeScroll = false;
      this.infoColuna = coluna;
      this.infoCard = {};
    },

    enviaInfoCard(card){
      this.activeScroll = false;
      this.infoCard = card;
    }
  },
  directives: {
    dragscroll
  }
}
</script>

<style scoped>
  .wrapper {
    height: 100vh;
    background-color: var(--color-green-light);
    background-image: url(../assets/background.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
  }

  .board {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    overflow: auto;
    height: 100vh;
  }

  .column-wrapper {
    background: var(--color-grey);
    width: 18rem;
    border-radius: 0.2rem;
    box-shadow: 0 0.1rem 0.2rem 0 rgba(33, 33, 33, 0.1);
    margin: 0.8rem;
    padding: 0.6rem;
    min-width: 18rem;
  }
  
  .column-header {
    display: flex;
    justify-content: space-between;
  }

  .placeholder {
    background: rgba(33, 33, 33, 0.08);
    border-radius: 0.8rem;
    transform: scaleY(0.85);
    transform-origin: 0% 0%;
  }

  .plus-card {
    transition: all ease 0.3s;
    border-radius: 5px;
    cursor: pointer;
  }

  .plus-card:hover {
    transition: all ease 0.5s;
    background-color: rgb(194, 194, 194);
  }

  #columnTitle {
    font-weight: 550;
  }
</style>
