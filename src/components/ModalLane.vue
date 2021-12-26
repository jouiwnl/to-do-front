<template>
    <!-- Modal -->
    <div class="modal fade" id="modalLane" tabindex="-1" aria-labelledby="modalLaneLabel" aria-hidden="true">
        <form>
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalLaneLabel">Adicionando coluna</h5>
                        <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        
                        <div class="form-group">
                            <label for="nameColumn">Nome da coluna</label>
                            <input type="text" class="form-control">
                            <small id="nameColumnHelp" class="form-text text-muted">Nome da colunas que receberá as tarefas</small>
                        </div>           
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">Salvar</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
    
</template>

<script>
export default {
    name: "ModalLane"
}
</script>

<style scoped>

</style>