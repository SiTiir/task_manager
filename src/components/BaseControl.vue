<template>
    <div class="form-control">
        <label :for="control">{{ settings.label }}</label>
        <select
            v-if="settings.type==='select'" 
            :id="control"
            v-model="value"
            @change="onChange"
        >
            <option v-for="option in settings.options" :value="option.value">{{ option.label }}</option>

        </select>
        <input
            v-else
            :type="settings.type"
            :id="control"
            v-model="value"
            @change="onChange"
        />
    </div>
</template>

<script>
export default {
    name: 'BaseControl',
    data() {
        return {
            value: ''
        }
    },
    created () {
        this.value = this.settings.initialValue || this.settings.initialValue === 0 ? this.settings.initialValue : ''
    },
    props: {
        settings: Object,
        control: String
    },
    methods: {
        onChange () {
            this.$emit('changed', {value: this.value, control:this.control})
        }
    }
}

</script>

<style scoped>
.form-control {
display: flex;
flex-direction: column;
width: 40%;
min-width: 300px;
}

input, select {
    font-size: 1.2rem;
    padding: 0.4em 0.8em;


}

</style>