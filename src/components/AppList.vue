<template>
  <div>
    <div class="board">
      <div class="column-wrapper" v-for="column in columns" :key="column.id">
        <div class="column-header">
          <h5 id="columnTitle" class="text-center">{{column.name}}</h5>
          <i id="infoColumn" v-on:click="enviaInfoColuna(column)" class="fa fa-info-circle" aria-hidden="true" data-toggle="modal" data-target="#modalLane"></i>
        </div>
        <div class="column-body" 
          @dragover="setDropZone(column, $event)" 
          @dragleave="undoDropZone()" 
          style="min-height: 30px;">
          
          <div v-for="card in column.cards" 
          @dragend="dragEnd($event)" 
          @dragstart="setDragCard(card, $event)" 
          draggable="true" 
          :key="card.id" 
          v-on:click="enviaInfoCard(card)" 
          data-toggle="modal" 
          data-target="#modalCard">
            <Card :name="card.name"/>
          </div>
        </div>
        <div class="plus-card text-center" v-on:click="enviaInfoColuna(column)" data-toggle="modal" data-target="#modalCard">
          <i class="fa fa-plus"></i><small> Adicionar um cartão</small>
        </div>
        <ModalCard :column="infoColuna" :card="infoCard"/>
        <ModalLane :column="infoColuna"/>
      </div>
      <AddLane />
    </div>
  </div>
</template>

<script>
import Card from './Card.vue'
import ModalCard from './ModalCard.vue'
import AddLane from './AddLane.vue'
import ModalLane from './ModalLane.vue'
import LanesService from './services/LanesService.js'
import 'font-awesome/css/font-awesome.css'
import { dragscroll } from 'vue-dragscroll';
import { eventBus } from '../main.js';
import CardService from './services/CardService'

export default {
    name: 'AppList',
    components: {
        Card,
        ModalCard,
        AddLane,
        ModalLane
    },
	created() {
    this.loadData();
  },
  data() {
    return {
      columns: [],
      activeScroll: true,
      infoColuna: {},
      infoCard: {},
      isInDropzone: false,
      dragCard: {},
      dropZone: {}
    }
  },
  mounted() {
    eventBus.$on('reload', () => {
      this.loadData();
      window.location.reload()
    });

    eventBus.$on('saveRegister', () => {
      this.loadData();
      window.location.reload()
    });
  },
  methods: {
    deleteColumn(id) {
      LanesService.deletar(id).then(() => {
        window.location.reload()
        alert('Registro excluído com sucesso!')
      })
    },
    loadData() {
      LanesService.listar().then(res => {
        this.columns = res.data;
      });
    },

    applyDrag(card, dropZone) {
      if (card.lane_id == dropZone.id) {
        return;
      }
      var cardParaEnviar = { id: card.id, description: card.description, link: card.link, name: card.name, lane_id: dropZone.id  };
      return CardService.editar(cardParaEnviar, card.id).then(res => {
        eventBus.$emit('saveRegister', res.data);
      });
    },
    enviaInfoColuna(coluna) {
      this.activeScroll = false;
      this.infoColuna = coluna;
      this.infoCard = {};
    },

    enviaInfoCard(card){
      this.activeScroll = false;
      this.infoCard = card;
    },

    setDropZone(coluna, evento){
      evento.path.map(ev => {
        if(ev.className == "column-body") {
          const dropZone = ev;
          var cardBeingDragged = document.querySelector('.is-dragging');
          dropZone.appendChild(cardBeingDragged);
        }
      });

      this.isInDropzone = true;
      this.dropZone = coluna;
    },

    undoDropZone() {
      this.isInDropzone = false;
    },
    
    setDragCard(card,evento) {
      const dragCard = evento.target;
      dragCard.classList.add('is-dragging');
      this.dragCard = card;
    },

    dragEnd(evento){
      const dragCard = evento.target;
      dragCard.classList.remove('is-dragging');
      this.applyDrag(this.dragCard, this.dropZone);
    }
  },
  directives: {
    dragscroll
  },
}
</script>

<style scoped>
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

  #infoColumn {
    cursor: pointer;
  }

  #infoColumn:hover {
    opacity: 0.8;
    transition: all ease 0.3s;
  }

  .placeholder-lane {
    opacity: 0.7;
  }

  .is-dragging {
    opacity: 0.5;
    cursor: move;
  }
</style>