<template>
    <BasePage title="Project Form" :loading="loading">
    <template v-slot:secondLine>
    <BaseForm :settings="settings" @submited="onSubmited"/>
    </template>
    </BasePage>
</template>

<script>
//import BaseButton from '../components/BaseButton.vue';

import BasePage from '../components/BasePage.vue';
import BaseForm from '../components/BaseForm.vue';
import db from '../utils/db';

export default { 
    name: 'ProjectForm',
    components: { BasePage, BaseForm },
    data () {
        return {
            loading: true,
            settings: {
                project: {
                    type: 'text',
                    label: 'project name',
                    initialValue: ''
                }
            }
        }
    },
    computed: {
        mode() {
            return this.$route.params.id ? 'edit' : 'add'
        }
    },
    created () {
        if (this.mode === 'add') {
            this.loading = false
        } else {
            db.get('js4projects/' + this.$route.params.id).then(data => {
                this.settings.project.initialValue = data.project
                this.loading = false
            })
        }
    },
    methods: {
        onSubmited(data) {
            if (this.mode === 'add') {
                db.post('js4projects', data).then(() => {
                    this.$router.push('/projects')
                })
            } else {
                db.put('js4projects', Object.assign({id:this.$route.params.id}, data)).then(() => {
                    this.$router.push('/project/' + this.$route.params.id)
                })
            }
        }
    }
}

</script>

<style scoped>


</style>