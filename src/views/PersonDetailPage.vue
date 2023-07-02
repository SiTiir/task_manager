<template>
    <BaseModal
    title="!! Alert !!"
    :show="showDelete"
    okButtonLabel="OK"
    cancelButtonLabel="Cancel"
    :okButtonDisplay="!hasTasks"
    @ok-button-clicked="deleteRecord"
    @cancel-button-clicked="showDelete=false"
    @close-me="showDelete=false"
    >
    <template v-slot:body>
      <div v-if="!hasTasks">
        <span>Do you really want to delete a person </span>
        <b>{{ person.first + ' ' + person.last }}</b>
        <span> ?</span>
      </div>
      <div v-else>
        <span>You are not allowed to delete a person with assigned tasks!</span>
      </div>
    </template>
  </BaseModal>
  <BaseModal
    title="Add Task"
    :show="showAddTask"
    @ok-button-clicked="addTaskToDb"
    @close-me="showAddTask = false"
    @cancel-button-clicked="showAddTask = false"
  >
    <template v-slot:body>
      <BaseControl
        :settings="{
          type: 'select',
          label: 'Choose task',
          options: allTasksOptions,
        }"
        @changed="onChanged"
      />
    </template>
  </BaseModal>
    <BasePage title="person detail" :loading="loading">
        <template v-slot:topRight>
            <BaseButton label="Edit" @clicked="$router.push('/personform/' + $route.params.id)"/>
        </template>
        <template v-slot:secondLine>
            <h2>{{ person.first + ' ' + person.last }}</h2>
          <div>Tasks: {{ tasks.length }}</div>
            <ul v-if="tasks.length > 0">
                <li class="inner-list" v-for="task in tasks" :key="task.id">
                 <div> {{ task.task }} </div>
                    <div @clicked="deleteTask(task.id)">X</div>
                </li>
            </ul>
        </template>
        <template v-slot:thirdLine>
            <BaseButton label="Delete Person" @clicked="showDelete=true"/>
            <BaseButton label="Add Task" @clicked="addTask" />
            
        </template>
    </BasePage>
</template>

<script>
    import db from '../utils/db';
    import BaseModal from '../components/BaseModal.vue';
    import BasePage from '../components/BasePage.vue';
    import BaseButton from '../components/BaseButton.vue';
    import BaseControl from '../components/BaseControl.vue'

    export default{
        name: 'PersonDetailPage',
        data(){
            return {
                person:{},
                loading:true,
                showDelete: false, 
                tasks:[],
                showAddTask: false,
                allTasks: [],
                taskToAdd: '',
            }
        },
        created (){
            db.get('js4persons/' + this.$route.params.id).then(record => {
                this.person = record
                this.loading = false
            })
            db.get('js4personstasks?personid=' + this.$route.params.id).then((tasks) => {
                this.tasks=tasks

            })
        },
        methods: {
            deleteRecord(){
                db.delete('js4persons', {id:this.person.id}).then(() => {
                    this.$router.push('/persons')
                })
            },
            addTask() {
                db.get('js4tasks').then(data => {
                    this.allTasks = data
                    this.taskToAdd = ''
                    this.showAddTask = true
                    })
                },
            addTaskToDb() {
                if (this.taskToAdd) {
                    db.post('js4personstasks', {
                        taskid: this.taskToAdd ,
                        personid: this.person.id
                    }).then(() => {
                        db.get('js4personstasks?taskid=' + this.$route.params.id).then((tasks) => {
                            this.tasks = tasks
                            this.showAddTask = false
                        })
                    })
                }
            },
            onChanged(payload) {
                this.taskToAdd = payload.value
            },
            deleteTask(id) {
                db.delete('js4personstasks', (id)).then(() => 
                db.get('js4personstasks?personid=' + this.$route.params.id).then((tasks) => {
                this.tasks=tasks

            }) )
            }
        },
        computed:{
            hasTasks(){
                return !!this.tasks.length
            },
            totalTasks() {
                return this.task.length
            },
            completedTasks() {
                return this.tasks.filter((task) => task.comploeted).length
            },
            allTasksOptions() {
                return this.allTasks
                    .filter((task) => {
                        return !this.tasks.some((item) => item.taskid === task.id);
                            })
                    .map((task) => {
                            return {
                                value: task.id,
                                label: task.task
                            }
                        })
                 },
        },
        components: {BasePage, BaseButton, BaseModal, BaseControl}
    }
</script>

<style>

.inner-list{
    display: flex;
    justify-content: space-between;
    padding: 10px;
    gap: 1rem;

}

.inner-list div:last-child {
    cursor: pointer;
}
</style>