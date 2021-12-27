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
                            <input v-model="lane.name" type="text" class="form-control">
                            <small id="nameColumnHelp" class="form-text text-muted">Nome da colunas que receberá as tarefas</small>
                        </div>           
                    </div>
                    <div class="modal-footer">
                        <button type="button" v-on:click="adicionarLane(lane)" class="btn btn-primary" data-dismiss="modal">Salvar</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
    
</template>

<script>
import LanesService from './services/LanesService.js'

export default {
    name: "ModalLane",
    data() {
        return {
            lane: {}
        }
    },
    methods: {
        adicionarLane(lane) {
            this.lane = lane;
            LanesService.cadastrar(this.lane).then((res) => {
                LanesService.listar().then(() => {
                    window.location.reload();
                    console.log('listados');
                });
            });
        }
    }
}
</script>

<style scoped>

</style>