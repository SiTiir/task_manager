<template>
    <BasePage title="Task Form" :loading="loading">
    <template v-slot:secondLine>
    <BaseForm :settings="settings" @submited="onSubmited"/>
    </template>
    </BasePage>
</template>


<script>

import BasePage from '../components/BasePage.vue';
import BaseForm from '../components/BaseForm.vue';
import db from '../utils/db';

export default { 
    name: 'TaskForm',
    components: { BasePage, BaseForm },
    created () {
        const promises = [
            db.get('js4projects').then ((data) => {
                this.settings.projectid.options = data.map(item => {
                    return {
                        label: item.project,
                        value: item.id
                    }
                })
            })
        ]
        if (this.mode === 'edit') {
            promises.push(
                db.get('js4tasks/' + this.$route.params.id).then((data) => {
                    this.controls.forEach(control => {
                        this.settings[control].initialValue = data[control]
                    })
                })
            )
        }
        Promise.all(promises).then(() => {
            this.loading = false
        }) 
        
    },
    data () {
        return {
            loading: true,
            settings: {
                task: {
                    type: 'text',
                    label: 'task name',
                    initialValue: ''
                },
                date: {
                    type: 'date',
                    label: 'date',
                    initialValue: ''
                },
                projectid: {
                    type: 'select',
                    label: 'projectid',
                    initialValue: '',
                    options: [

                    ]
                },
                priority: {
                    type: 'select',
                    label: 'priority',
                    initialValue: '',
                    options: [
                        {label: '', value: ''},
                        {label: 'low', value: 1},
                        {label: 'medium', value: 2},
                        {label: 'high', value: 3}
                    ]
                },
                completed: {
                    type: 'select',
                    label: 'completed',
                    initialValue: '',
                    options: [
                        {label: '', value: ''},
                        {label: 'yes', value: 1},
                        {label: 'no', value: 0}
                ]
                }
            }
        }
    },
    computed: {
        mode() {
            return this.$route.params.id ? 'edit' : 'add'
        },
        controls() {
            return Object.keys(this.settings)
        }
    },
    methods: {
        onSubmited(data) {
            
            if (this.mode === 'add') {
                db.post('js4tasks', data).then (() => {
                    this.$router.push('/tasks')
                })
            } else {
                db.put('js4tasks', Object.assign({id:this.$route.params.id}, data)).then(() => {
                    this.$router.push('/task/' + this.$route.params.id)
                })
            }
        }
    }
    
}

</script>

<style scoped>
 


</style>


