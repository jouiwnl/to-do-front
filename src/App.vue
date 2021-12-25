<template>
  <div id="app" class="wrapper">
    <Header />
    <div class="board">
      <div class="column-wrapper">
        <h2 class="text-center">A fazer</h2>
        <Container 
        group-name="jobs" 
        @drag-start="handleDragStart('toDo', $event)" 
        @drop="handleDrop('toDo', $event)" 
        :get-child-payload="getChildPayload"
        :drop-placeholder="{ className: 'placeholder' }">
          <Draggable v-for="card in cards.toDo" :key="card.id">
            <Card>
              {{card.text}}
            </Card>
          </Draggable>
        </Container>
      </div>
      <div class="column-wrapper">
        <h2 class="text-center">Fazendo</h2>
        <Container 
        group-name="jobs" 
        @drag-start="handleDragStart('doing', $event)" 
        @drop="handleDrop('doing', $event)" 
        :get-child-payload="getChildPayload"
        :drop-placeholder="{ className: 'placeholder' }">
          <Draggable v-for="card in cards.doing" :key="card.id">
            <Card>
              {{card.text}}
            </Card>
          </Draggable>
        </Container>
      </div>
      <div class="column-wrapper">
        <h2 class="text-center">Feito</h2>
        <Container 
        group-name="jobs" 
        @drag-start="handleDragStart('did', $event)" 
        @drop="handleDrop('did', $event)" 
        :get-child-payload="getChildPayload"
        :drop-placeholder="{ className: 'placeholder' }">
          <Draggable v-for="card in cards.did" :key="card.id">
            <Card>
              {{card.text}}
            </Card>
          </Draggable>
        </Container>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Card from './components/Card.vue'
import initialCards from './initialCards'
import { Container, Draggable } from 'vue-smooth-dnd'
import 'bootstrap/dist/css/bootstrap.css'

export default {
  name: 'App',
  components: {
    Header,
    Card,
    Container, 
    Draggable
  },
  data: () => ({
    cards: {
      toDo: initialCards.toDo,
      doing: initialCards.doing,
      did: initialCards.did
    },
    draggingCard: {
      lane: "",
      index: -1,
      cardData: {}
    }
  }),
  methods: {
    handleDragStart(lane, result) {
      const { payload, isSource } = result;
      if (isSource) {
        this.draggingCard = {
          lane,
          index: payload.index,
          cardData: {
            ...this.cards[lane][payload.index]
          }
        }
      }
    },
    handleDrop(lane, result) {
      const { removedIndex, addedIndex } = result; 

      if (lane === this.draggingCard.lane && removedIndex === addedIndex) {
        return;
      }

      if(removedIndex !== null) {
        this.cards[lane].splice(removedIndex, 1)[0]
      }

      if (addedIndex !== null) {
        this.cards[lane].splice(addedIndex, 0, this.draggingCard.cardData)
      }
    },
    getChildPayload(index) {
      return {
        index, 
      }
    }
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
    width: 23rem;
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
</style>
