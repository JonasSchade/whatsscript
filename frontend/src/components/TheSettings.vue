<template>
    <div id="main-section">
       <div id="side-nav">
        <ul>
            <li>Name</li>
            <li>Status</li>
        </ul>
       </div>
    </div>
</template>

<style>
    .main-section{
        flex:   1 0 auto;  
    }

    .side-nav{
        position: absolute;
        width: 195 px;
    }
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Settings extends Vue {}
</script> 

