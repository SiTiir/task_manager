<template>
    <button @click="onClick"> {{ label }}</button>
</template>

<script>
    export default {
        name: 'BaseButton',
        props: {
            label: String
        },
        methods: {
            onClick(){
                this.$emit('clicked')
            }
        }
    }
</script>

<style scoped>
    button {
        cursor: pointer;
        font-size: 1.2rem;
        border-radius: 15px;
        background-color: #ccecec;
        border: 1px solid #9acece;
        padding: 0.4em 0.7em;
        margin: 5px;
    }

    button:hover {
        background-color: #9acece;
    }
</style>