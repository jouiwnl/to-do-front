<template>
  <div id="column-body" class="column-body"
        style="min-height: 30px;"
        >
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'ColumnBody',
    props: ["columnId"]
}
</script>

<style>

</style>