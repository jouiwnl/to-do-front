<template>
    <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true" style="margin-bottom: 6px;">
        <div class="toast-header">
            <div id="card-status" :class="defineClass(this.card)" />
            <strong class="mr-auto">{{name}}</strong>
        </div>
        <div class="toast-body" v-if="description">
            {{description}}
        </div>
        <small style="margin-left: 5px;" class="text-muted" v-if="!description">Não há uma descrição nesse card.</small>
    </div>
</template>

<script>

export default {
    name: 'Card',
    props: ["name", "description", "card"],
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