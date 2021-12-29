<template>
  <header class="header">
        <div class="header-title">
            <h1>Lista de afazeres</h1>
        </div> 
        <div class="spinner-wrapper">
            <div class="reload-title" v-if="!showSpinner" v-on:click="handleClick()" @dataLoad="handleClick()">
                <h5>Reload</h5>
            </div>
            <div id="spinner" v-on:click="handleClick()" class="spinner-border text-light" v-if="showSpinner" role="status">
                <span class="sr-only"></span>
            </div>
        </div>
  </header>
</template>

<script>
import { eventBus } from '../main.js';

export default {
    name: 'Header',
    data() {
        return {
            showSpinner: false
        }
    },
    methods: {
        handleClick() {
            this.showSpinner = !this.showSpinner;
            eventBus.$emit('reload', {});
        }
    }
}
</script>

<style scoped>
    .header {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 40px;
        background-color: rgba(255, 255, 255, 0);
    }

    .header-title h1 {
        padding-top: 5px;
        padding-left: 10px;
        color: white;
        font-weight: bold;
        font-size: 25px;
    }

    .spinner-wrapper h5 {
        color: white;
        font-weight: bold;
        cursor: pointer;
    }

    .spinner-wrapper h5:hover {
        opacity: 0.8;
        transition: all ease 0.3s;
    }

    .spinner-wrapper {
        padding: 7px;
    }
</style>