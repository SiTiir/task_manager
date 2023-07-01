<template>
    <BasePage title="Tasks Page" :loading="loading">
        <template v-slot:topRight>
            <BaseButton label="add" @clicked="$router.push('/taskform')"/>
        </template>
        <template v-slot:secondLine>
            <BaseList :items="tasksToDisplay" />
        </template>
        <template v-slot:thirdLine>
        </template>
    </BasePage>
</template>
<script>
import db from '../utils/db.js'
import { formatDate } from '../utils/dateFunctions'
import BaseList from '../components/BaseList.vue'
import BasePage from '../components/BasePage.vue'
import BaseButton from '../components/BaseButton.vue'

export default {
    name: 'TasksPage',
    data() {
        return {
            tasks: [],
            loading: true
        }
    },
    created() {
        db.get('js4tasks').then(data => {
            this.tasks = data
            this.loading = false
        })
    },
    components: {BaseList, BasePage, BaseButton},
    computed: {
        tasksToDisplay() {
            return this.tasks.map(task => {
                return {
                    id: task.id,
                    link: "/task/" + task.id,
                    header: task.task,
                    subtitle: task.project + ' ' + formatDate(task.date)
                    
                }
            })
        }
    }
}

</script>