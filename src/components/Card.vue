<template>
    <div class="card">
        <strong>Nome: </strong><p>{{name}}</p>
        <strong>Descrição: </strong><p>{{description}}</p>
    </div>
</template>

<script>
export default {
    name: 'Card',
    props: ["name", "description"]
}
</script>

<style scoped>
    .card {
        background: var(--color-white);
        padding: 1.4rem;
        border-radius: 0.4rem;
        box-shadow: 0 1px rgba(9, 30, 60, 0.25);
        margin-bottom: 0.8rem;
    }
</style>    