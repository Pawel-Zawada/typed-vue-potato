<template>
    <div>
        <h1>{{text}}</h1>
        <button @click="save">hallo</button>
    </div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            text: 'hallo'
        }
    },
    methods: {
        save() {
            alert("saved");
        }
    }
}
</script>
