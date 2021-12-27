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
                    </div>
                    <div class="modal-footer">
                        <button type="button" v-on:click="salvar(card)" class="btn btn-primary" :class="{ 'disabled': card.name ? false : true }" :disabled="!card.name" data-dismiss="modal">Salvar</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                        <button type="button" v-on:click="excluir(card)" v-if="card.id" class="btn btn-danger" data-dismiss="modal">Excluir</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import CardService from './services/CardService.js'

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
            this.card = { name: card.name, description: card.description, lane_id: this.column.id };

            if (card.id) {
                return CardService.editar(this.card, card.id).then(() => {
                    window.location.reload();
                    console.log(this.card);
                });
            }
            
            return CardService.cadastrar(this.card).then(() => {
                window.location.reload();
                console.log(this.card);
            });
        },

        excluir(card) {
            return CardService.deletar(card.id).then(() => {
                window.location.reload();
                alert('Card deletado')
            });
        }
    }
}
</script>

<style scoped>

</style>