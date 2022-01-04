<template>
  <div>
    <div class="board" :key="componentKey" v-if="!this.showLoading">
			<div class="entire-column-wrapper">
				<div class="column-wrapper" v-for="column in columns" :key="column.id">
          <div class="son-column-wrapper">
            <div class="column-header">
              <h5 id="columnTitle" class="text-center">{{column.name}}</h5>
              <i id="infoColumn" v-on:click="enviaInfoColuna(column)" class="fa fa-info-circle" aria-hidden="true" data-toggle="modal" data-target="#modalLane"></i>
            </div>
            <ColumnBody v-bind:columnId="column.id">
              <div id="card-full" v-for="card in column.cards" 
                  :key="card.id" 
                  v-on:click="enviaInfoCard(card);"
                  @mouseup="setDragCard(card, column, $event);"
                  data-toggle="modal" 
                  data-target="#modalCard">
                <Card v-bind:card="card" draggable="true" />
              </div>
            </ColumnBody>
            <div class="plus-card text-center" v-on:click="enviaInfoColuna(column)" data-toggle="modal" data-target="#modalCard">
              <i class="fa fa-plus"></i><small> Adicionar um cartão</small>
            </div>
          </div>
				</div>
        <div class="addColumn">
            <div v-on:click="() => { this.infoColuna = {} }" class="addColumnButton" data-toggle="modal" data-target="#modalLane">
                + Adicionar mais uma coluna
            </div>
        </div>
        <ModalCard :column="infoColuna" :card="infoCard"/>
        <ModalLane :column="infoColuna"/>
			</div>	
    </div>
		<Spinner v-if="this.showLoading"/>
  </div>
</template>

<script>
import Card from './Card.vue'
import ModalCard from './ModalCard.vue'
import ModalLane from './ModalLane.vue'
import Spinner from './Spinner.vue'
import ColumnBody from './ColumnBody.vue'
import LanesService from './services/LanesService.js'
import { dragscroll } from 'vue-dragscroll';
import { eventBus } from '../main.js';
import CardService from './services/CardService'
import 'font-awesome/css/font-awesome.css'
import 'jquery-ui-dist/jquery-ui.js';

export default {
	name: 'AppList',
	components: {
			Card,
			ModalCard,
			ModalLane,
			Spinner,
			ColumnBody
	},
	created() {
		this.loadData();
  },
  data() {
 		eventBus.$on('reload', () => {
      this.loadData();
    });

    eventBus.$on('saveRegister', () => {
      this.loadData();
    });

    return {
      columns: [],
			showLoading: false,
			cardBeingDragged: {},
      infoColuna: {},
      infoCard: {},
      dragCard: {},
      dropZone: {},
			componentKey: 0,
    }
  },
  methods: {
    loadData() {
			this.showLoading = true;
      LanesService.listar().then((res) => {
        this.columns = res.data;
				this.componentKey += 1;
				eventBus.$emit('recordSaved', this.columns);
				this.showLoading = false;
      }).then(() => {
				$(this.init())
			})
    },

    applyDrag(card, dropZoneId) {
      if (card.lane_id === dropZoneId) {
        return;
      }

      var cardParaEnviar = { id: card.id, description: card.description, link: card.link, name: card.name, lane_id: dropZoneId  };
      return CardService.editar(cardParaEnviar, card.id).then(res => {
        
        eventBus.$emit('saveRegister', res.data);
      });
    },
    enviaInfoColuna(coluna) {
      this.infoColuna = coluna;
      this.infoCard = {};
    },

    enviaInfoCard(card){
      this.infoCard = card;
    },
    
    setDragCard(card) {
      this.dragCard = card;
    },

		init() {
			$( '.column-body' ).sortable({
				connectWith: '.column-body',
				stack: '.column-body',
				update: (evento, ui) => {
          console.log(ui);
					const id = $(evento.target).closest().prevObject.context.__vue__.columnId;
          this.applyDrag(this.dragCard, id)
				}
			});
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

	.entire-column-wrapper {
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
    cursor: grab;
  }

  .addColumn {
        margin: 0.8rem;
        cursor: pointer;
        min-width: 15rem;
    }

    .addColumn:hover {
        background-color: rgba(245, 245, 245, 0.61);
        transition: all ease 0.2s;
        border-radius: 0.3rem;
    }

    .addColumnButton {
        background-color: rgba(236, 236, 236, 0.61);
        padding: 0.7rem;
        border-radius: 0.3rem;
        transition: all ease 0.2s;
    }
</style>