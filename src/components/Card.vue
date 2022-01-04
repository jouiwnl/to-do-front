<template>
    <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true" style="margin-bottom: 6px;">
        <div class="toast-header">
            <div id="card-status" :class="defineClass(this.card)" />
            <strong class="mr-auto">{{card.name}}</strong>
        </div>
        <div class="toast-body" v-if="card.dtevento">
            {{card.dtevento | formatDate}}
        </div>
        <small style="margin-left: 5px;" class="text-muted" v-if="!card.dtevento">Não foi definida uma data para esse evento.</small>
    </div>
</template>

<script>

export default {
    name: 'Card',
    props: ["card"],
    methods: {
        defineClass(card) {
            if (card.status == '0') {
                return 'status-notification-dontdid';
            }

            if (card.status == '1') {
                return 'status-notification-ongoing';
            }

            return 'status-notification-terminated';
        }
    }
}
</script>

<style scoped>
    
</style>    