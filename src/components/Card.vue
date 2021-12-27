<template>
    <div class="card">
        <span>{{name}}</span> 
    </div>
</template>

<script>
export default {
    name: 'Card',
    props: ["name"]
}
</script>

<style scoped>
    .card {
        background: var(--color-white);
        padding: 0.6rem;
        border-radius: 0.4rem;
        box-shadow: 0 1px rgba(9, 30, 60, 0.25);
        margin-bottom: 0.8rem;
        cursor: pointer;
    }

    .card:hover {
        background-color: rgb(241, 241, 241);
    }
</style>    