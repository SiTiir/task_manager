<template>
    <BasePage title="Welcome" :loading="loading">
        <template v-slot:secondLine>
            <ul>
                <li>Total projects:{{ projects.length }}</li>
                <li>Total tasks:{{ tasks.length }}</li>
                <li>Total uncompleted tasks:{{ uncompletedTasks.length }}</li>
                <li>Uncompleted after deadline:{{ overDeadline }}</li>
            </ul>
        </template>
        <template v-slot:thirdLine>
        </template>
    </BasePage>
</template>

<script>
import BasePage from '../components/BasePage.vue';
import db from '../utils/db';
import {isPast} from '../utils/dateFunctions.js'
export default {

    name: 'HomePage',
    data() {
        return {
            loading:true,
            projects: [],
            tasks: []
        }
    },
    created() {
        Promise.all([
            db.get("js4projects").then(data => { this.projects = data }),
            db.get("js4tasks").then(data => { this.tasks = data })
        ]).then (() => {
            this.loading = false
        })
    },
    computed:{
        uncompletedTasks(){
            return this.tasks.filter((task)=> !task.completed)
        },
        overDeadline(){
            return this.uncompletedTasks.filter((task)=> isPast(task.date)).length
        }
    },
    components:{
        BasePage
    }
}
</script>