<template>
    <div class="modal fade" id="modalCard" aria-labelledby="modalCardLabel" aria-hidden="true">
        <form>
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header" style="display: flex; justify-content: center; align-items: center;">
                        <div :class="defineClass(this.card)" />
                        <h5 class="modal-title pull-left" id="modalCardLabel">{{card.id ? 'Editando' : 'Adicionando'}} evento</h5>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="oqueFaremos">O que faremos?</label>
                            <input v-model="card.name" type="text" class="form-control">
                            <small id="oqueFaremosHelp" class="form-text text-muted">Filmes/Séries/jogos</small>
                        </div> 

                        <div class="row">
                            <div class="col-sm">
                                <div class="form-group">
                                    <label for="descricao">Descrição</label>
                                    <textarea v-model="card.description" class="form-control" aria-label="With textarea"></textarea>
                                    <small id="descricaoHelp" class="form-text text-muted">Observações e descrições</small>
                                </div>
                            </div>

                            <div class="col-sm">
                                <div class="form-group">
                                    <label for="data">Data</label>
                                    <input v-model="card.dtevento" type="datetime-local" class="form-control" aria-label="With textarea"/>
                                    <small id="dataHelp" class="form-text text-muted">Horários/Datas</small>
                                </div>
                            </div>
                        </div>
                        
                        <div class="row">
                            <div class="col-9" :class="{ 'col-12' : !card.id }">
                                <div class="form-group">
                                    <label for="descricao">Link do conteúdo</label>
                                    <input v-model="card.link" type="text" class="form-control">
                                    <small id="descricaoHelp" class="form-text text-muted">Link do vídeo/filme</small>
                                </div>
                            </div>
                            <div class="col-3" v-if="card.id">
                                <div class="select-status" style="margin-bottom: 18px; text-align: center;">
                                    <label for="select">Status</label>
                                    <select class="custom-select" v-model="card.status">
                                        <option value="0">Não iniciado</option>
                                        <option value="1">Fazendo</option>
                                        <option value="2">Feito</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="buttons-whatsapp pull-left" >
                            <div class="button-joao" style="margin-bottom: 15px;">
                                <button id="buttonJoao" v-on:click="enviaMensagem(card, $event)" :class="{ 'disabled': card.name && card.description && card.link ? false : true }" :disabled="!(card.name && card.description && card.link)" type="button" class="btn btn-success">
                                    <div class="button-content">
                                        <i style="font-size:30px;" class="fa fa-whatsapp" aria-hidden="true"></i>
                                        <span id="joao" class="text-inside-button">Enviar para joão</span >
                                    </div>
                                </button>
                            </div>
                            
                            <div class="button-laura">
                                <button id="buttonLaura" v-on:click="enviaMensagem(card, $event)" :class="{ 'disabled': card.name && card.description && card.link ? false : true }" :disabled="!(card.name && card.description && card.link)" type="button" class="btn btn-success">
                                    <div class="button-content">
                                        <i style="font-size:30px;" class="fa fa-whatsapp" aria-hidden="true"></i>
                                        <span id="laura" class="text-inside-button">Enviar para laura</span >
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
            this.card = { name: card.name, description: card.description, link: card.link, status: card.status, lane_id: this.column.id, dtevento: card.dtevento };

            if (card.id) {
                return CardService.editar(this.card, card.id).then(() => {
                    eventBus.$emit('saveRegister', this.card)
                });
            }
            
            return CardService.cadastrar(this.card).then(() => {
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
            const dtEventoFormatada = this.$options.filters.formatDate(card.dtevento);
            var message = `Faremos/Veremos: ${card.name}, Quando: ${dtEventoFormatada}, Link: ${card.link}, Observações: ${card.description}`; //card.name + card.description + card.link;
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
        },

        defineClass(card) {
            if (card.status == '0') {
                return 'status-notification-dontdid';
            }

            if (card.status == '1') {
                return 'status-notification-ongoing';
            }

            if (card.status == '2') {
                return 'status-notification-terminated';
            }

            return '';
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
        padding: 2px;
    }

    .buttons-whatsapp {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
    }

</style>