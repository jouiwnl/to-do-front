<template>
    <div class="modal fade" id="modalCard" aria-labelledby="modalCardLabel" aria-hidden="true">
        <form>
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalCardLabel">Adicionando evento</h5>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="oqueFaremos">O que faremos?</label>
                            <input v-model="card.name" type="text" class="form-control">
                            <small id="oqueFaremosHelp" class="form-text text-muted">Filmes/Séries/jogos</small>
                        </div> 
                        <div class="form-group">
                            <label for="descricao">Descrição</label>
                            <input v-model="card.description" type="text" class="form-control">
                            <small id="descricaoHelp" class="form-text text-muted">Horários/Datas</small>
                        </div>
                        <div class="form-group">
                            <label for="descricao">Link do conteúdo</label>
                            <input v-model="card.link" type="text" class="form-control">
                            <small id="descricaoHelp" class="form-text text-muted">Link do vídeo/filme</small>
                        </div>

                        <div class="buttons-whatsapp" >
                            <div class="button-joao">
                                <button id="buttonJoao" :class="{ 'disabled': card.name && card.description && card.link ? false : true }" :disabled="!(card.name && card.description && card.link)" type="button" class="btn btn-success">
                                    <div class="button-content">
                                        <i style="font-size:30px;" class="fa fa-whatsapp" aria-hidden="true"></i>
                                        <span v-on:click="enviaMensagem(card, $event)" id="joao" class="text-inside-button">Enviar para joão</span >
                                    </div>
                                </button>
                            </div>
                            
                            <div class="button-laura">
                                <button id="buttonLaura" :class="{ 'disabled': card.name && card.description && card.link ? false : true }" :disabled="!(card.name && card.description && card.link)" type="button" class="btn btn-success">
                                    <div class="button-content">
                                        <i style="font-size:30px;" class="fa fa-whatsapp" aria-hidden="true"></i>
                                        <span id="laura" v-on:click="enviaMensagem(card, $event)" class="text-inside-button">Enviar para laura</span >
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" v-on:click="salvar(card)" class="btn btn-primary" :class="{ 'disabled': card.name ? false : true }" :disabled="!card.name" data-dismiss="modal">Salvar</button>
                        <button type="button" v-on:click="excluir(card)" v-if="card.id" class="btn btn-secondary" data-dismiss="modal">Excluir</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import CardService from './services/CardService.js';
import { eventBus } from '../main.js'

export default {
    name: "ModalCard",
    props: ["column", "card"],  
    data() {
        return {
            card: this.card
        }
    },
    methods: {
        salvar(card) {
            this.card = { name: card.name, description: card.description, link: card.link, lane_id: this.column.id };

            if (card.id) {
                return CardService.editar(this.card, card.id).then(() => {
                    eventBus.$emit('saveRegister', this.card)
                });
            }
            
            return CardService.cadastrar(this.card).then(() => {
                window.location.reload();
                eventBus.$emit('saveRegister', this.card)
            });
        },

        excluir(card) {
            return CardService.deletar(card.id).then(() => {
                window.location.reload();
                alert('Card deletado')
            });
        },

        enviaMensagem(card, evento) {
            var message = `Faremos/Veremos: ${card.name}, Quando: ${card.description}, Link: ${card.link}`; //card.name + card.description + card.link;
            if(evento.target.innerHTML.toLowerCase().match("joão")) {
                const telefone = '5548991758280';
                const apiUrl = `https://api.whatsapp.com/send?phone=${telefone}&text=${message}`;

                window.open(apiUrl, '_blank');
            }
            
            if(evento.target.innerHTML.toLowerCase().match("laura")) {
                const telefone = '5567984370160';
                const apiUrl = `https://api.whatsapp.com/send?phone=${telefone}&text=${message}`;

                window.open(apiUrl, '_blank');
            }
        }

    }
}
</script>

<style scoped>

    .button-content {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .text-inside-button {
        padding: 6px;
    }

    .buttons-whatsapp {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

</style>