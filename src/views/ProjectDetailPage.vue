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
        <span>Do you really want to delete a project </span>
        <b>{{ project.project }}</b>
        <span> ?</span>
      </div>
      <div v-else>
        <span>You are not allowed to delete a project with assigned tasks!</span>
      </div>
    </template>
  </BaseModal>
    
    <BasePage title="project detail" :loading="loading">
        <template v-slot:topRight>
            <BaseButton label="edit" @clicked="$router.push('/projectform/' + $route.params.id)"/>
        </template>
        <template v-slot:secondLine>
            <h2>{{project.project}}</h2>
            <BaseList :items="tasksToDisplay" v-if="tasks.length" />
            <p v-else>No tasks to display</p>
        </template>
        <template v-slot:thirdLine>
            <BaseButton label="add task" @clicked="onAddClicked"/>
            <BaseButton 
                label="delete project" 
                @clicked="showDelete= true"
            />
        </template>
    </BasePage>
</template>

<script>
import db from '../utils/db';
import BaseList from '../components/BaseList.vue';
import BasePage from '../components/BasePage.vue';
import BaseButton from '../components/BaseButton.vue';
import BaseModal from '../components/BaseModal.vue';

    export default{
        name: 'ProjectDetailPage',
        data(){
            return {
                project:{},
                tasks:[],
                loading: true,
                showDelete: false
            }
        },
        created (){
            const promises = [
            db.get('js4projects/' + this.$route.params.id),
            db.get('js4tasks?projectid=' + this.$route.params.id)
            ]
            Promise.all(promises).then((results) => {
                this.project=results[0]
                this.tasks= results[1]
                this.loading=false
            })
        },
        components: {BaseList, BasePage, BaseButton, BaseModal},
        methods: {
            deleteRecord() {
                db.delete('js4projects', {id:this.project.id}).then(() => {
                    this.$router.push('/projects')
                })
            },
            onAddClicked() {
                this.$router.push('/taskformproject/' + this.project.id)
            }
        },
        computed: {
            tasksToDisplay() {
              
                return this.tasks.map(task => {
                    return {
                        header: task.task,
                        subtitle: 'date',
                        link: "/task/" + task.id,
                    }
                })
             },
             hasTasks() {
                return !!this.tasks.length
             }
        }
    }
</script>

<style>

</style>