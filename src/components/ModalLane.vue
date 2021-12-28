<template>
    <!-- Modal -->
    <div class="modal fade" id="modalLane" tabindex="-1" aria-labelledby="modalLaneLabel" aria-hidden="true">
        <form>
            <div class="modal-dialog vertical-align-center">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalLaneLabel">Adicionando coluna</h5>
                    </div>
                    <div class="modal-body">
                        
                        <div class="form-group">
                            <label for="nameColumn">Nome da coluna</label>
                            <input v-model="column.name" type="text" class="form-control">
                            <small id="nameColumnHelp" class="form-text text-muted">Nome da colunas que receberá as tarefas</small>
                        </div>           
                    </div>
                    <div class="modal-footer">
                        <button type="button" v-on:click="salvar(column)" class="btn btn-primary" data-dismiss="modal">Salvar</button>
                        <button type="button" v-on:click="excluir(column)" v-if="column.id" class="btn btn-secondary" data-dismiss="modal">Excluir</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
    
</template>

<script>
import { eventBus } from '../main.js';
import LanesService from './services/LanesService.js'

export default {
    name: "ModalLane",
    props: ["column"],
    data() {
        return {
            column: {}
        }
    },
    methods: {
        salvar(column) {
            this.column = column;

            if (column.id) {
                return LanesService.editar(this.column).then(() => {
                    eventBus.$emit('saveRegister', column);
                    this.column = {}
                });    
            }
            
            return LanesService.cadastrar(this.column).then((res) => {
                eventBus.$emit('saveRegister', column);
            });
        },
        excluir(column) {
            LanesService.deletar(column.id).then((res) => {
                eventBus.$emit('saveRegister', column);
            });
        }
    }
}
</script>

<style scoped>

</style>