<template>
    <form @submit="onSubmit">
        <BaseControl 
            v-for="control in controls" 
            :settings="settings[control]" 
            :control="control"
            @changed="onChanged">
        </BaseControl>
        <BaseButton label="submit"></BaseButton>
    </form>
</template>

<script>
import BaseButton from './BaseButton.vue';
import BaseControl from './BaseControl.vue';

export default {
    name: 'BaseForm',
    props: {
        settings: Object
    },
    data() {
        return {
            formData: {}
        }
    },
    created() {
        this.controls.forEach((control) => {
            this.formData[control] = {
                value: this.settings[control].initialValue
            }
        })
    },
    components: { BaseButton, BaseControl },
    computed: {
        controls() {
            return Object.keys(this.settings)
        }
    },
    methods: {
        onSubmit(event) {
            event.preventDefault()
            const data = {}
            this.controls.forEach((control) => {
                data[control]=this.formData[control].value
            })
            this.$emit('submited', data)
        },
        onChanged(payload) {
            this.formData[payload.control].value = payload.value
        }
    }
}

</script>

<style scoped>


</style>