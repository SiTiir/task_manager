<template>
    
    <BasePage title="Person Form" :loading="loading">
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
    name: 'PersonForm',
    components: { BasePage, BaseForm },
    data () {
        return {
            loading: true,
            settings: {
                first: {
                    type: 'text',
                    label: 'first name',
                    initialValue: '' 
                },
                last: {
                    type: 'text',
                    label: 'last name',
                    initialValue: ''
                },
                positionid: {
                    type: 'select',
                    label: 'position',
                    initialValue: '',
                    options: []
                }
            }
        }
    },
    created () {
        const promises = [
            db.get('js4positions').then ((data) => {
                this.settings.positionid.options = data.map(item => {
                    return {
                        label: item.position,
                        value: item.id
                    }
                })
            })
        ]
        if (this.mode === 'edit') {
            promises.push(
                db.get('js4persons/' + this.$route.params.id).then((data) => {
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
                db.post('js4persons', data).then (() => {
                    this.$router.push('/persons')
                })
            } else {
                db.put('js4persons', Object.assign({id:this.$route.params.id}, data)).then(() => {
                    this.$router.push('/person/' + this.$route.params.id)
                })
            }
        }
    }
    
}


</script>