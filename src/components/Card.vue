<template>
    <div class="card">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'Card'
}
</script>

<style scoped>
    .card {
        background: var(--color-white);
        padding: 1.4rem;
        border-radius: 0.4rem;
        box-shadow: 0 1px rgba(9, 30, 60, 0.25);
        margin-bottom: 0.8rem;
        font-size: 1.6rem;
        cursor: pointer;
    }
</style>