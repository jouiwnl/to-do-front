<template>
    <div class="modal fade" id="modalCard" tabindex="-1" aria-labelledby="modalCardLabel" aria-hidden="true">
        <form>
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalCardLabel">Adicionando evento</h5>
                        <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        
                        <div class="form-group">
                            <label for="exampleInputEmail1">O que faremos?</label>
                            <input type="text" class="form-control">
                            <small id="oqueFaremosHelp" class="form-text text-muted">Filmes/Séries/jogos</small>
                        </div> 
                        <div class="form-group">
                            <label for="exampleInputEmail1">Descrição</label>
                            <input type="text" class="form-control">
                            <small id="descricaoHelp" class="form-text text-muted">Horários/Datas</small>
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
    name: "ModalCard"
}
</script>

<style scoped>

</style>