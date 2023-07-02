<template>
  <BaseModal
    title="!!! Alert !!!"
    :show="showDelete"
    okButtonLabel="OK"
    cancelButtonLabel="Cancel"
    :okButtonDisplay="!hasPerson"
    @ok-button-clicked="deleteRecord"
    @cancel-button-clicked="showDelete = false"
    @close-me="showDelete = false"
  >
    <template v-slot:body>
      <div v-if="!hasPerson">
        <span>Do you really want to delete task </span>
        <b>{{ task.task }}</b>
        <span> ?</span>
      </div>
      <div v-else>
        <span>You are not allowed to delete an assigned task!</span>
      </div>
    </template>
  </BaseModal>
  <BaseModal
    title="Add Person"
    :show="showAddPerson"
    @ok-button-clicked="addPersonToDb"
    @close-me="showAddPerson = false"
    @cancel-button-clicked="showAddPerson = false"
  >
    <template v-slot:body>
      <BaseControl
        :settings="{
          type: 'select',
          label: 'Choose person',
          options: allPersonsOptions,
        }"
        @changed="onChanged"
      />
    </template>
  </BaseModal>
  <BasePage title="Task Detail" :loading="loading">
    <template v-slot:topRight>
      <BaseButton
        label="Edit"
        @clicked="$router.push('/taskform/' + $route.params.id)"
      />
    </template>
    <template v-slot:secondLine>
      <h2>{{ task.task }}</h2>
      <ul>
        <li>Project: {{ task.project }}</li>
        <li>Priority: {{ taskToDisplay.priority }}</li>
        <li>Completed: {{ taskToDisplay.completed }}</li>
        <li>Date: {{ taskToDisplay.date }}</li>
        <li>
          <div>Persons: {{ persons.length }}</div>
          <ul v-if="persons.length > 0">
            <li v-for="person in persons" class="inner-list">
              <div>{{ person.first + " " + person.last + ", " + person.position }}</div>
              <div @clicked="deletePerson(person.id)">X</div>
            </li>
          </ul>
        </li>
      </ul>
    </template>
    <template v-slot:thirdLine>
      <BaseButton label="Delete task" @clicked="showDelete = true" />
      <BaseButton :label="completedTaskLabel" @clicked="markCompleted" />
      <BaseButton label="Add Person" @clicked="addPerson" />
    </template>
  </BasePage>
</template>

<script>
import db from "../utils/db";
import BasePage from "../components/BasePage.vue";
import BaseButton from "../components/BaseButton.vue";
import { formatDate } from "../utils/dateFunctions";
import BaseModal from "../components/BaseModal.vue";
import BaseControl from "../components/BaseControl.vue";

export default {
  name: "TaskDetailPage",
  data() {
    return {
      task: {},
      loading: true,
      persons: [],
      showDelete: false,
      showAddPerson: false,
      allPersons: [],
      personToAdd: "",
    };
  },
  created() {
    this.fetchRecord();
    db.get("js4personstasks?taskid=" + this.$route.params.id).then(
      (persons) => {
        this.persons = persons;
      }
    );
  },
  computed: {
    completedTaskLabel() {
      return this.task.completed ? "Mark uncompleted" : "Mark completed";
    },
    taskToDisplay() {
      const priorities = {
        1: "low",
        2: "medium",
        3: "high",
      };
      return {
        completed: this.task.completed ? "yes" : "no",
        date: formatDate(this.task.date),
        priority: priorities["" + this.task.priority],
      };
    },
    hasPerson() {
      return !!this.persons.length;
    },
    allPersonsOptions() {
      return this.allPersons
        .filter((person) => {
          return !this.persons.some((item) => item.personid === person.id);
        })
        .map((person) => {
          return {
            value: person.id,
            label: person.first + " " + person.last + ", " + person.position,
          };
        });
    },
  },
  methods: {
    deleteRecord() {
      db.delete("js4tasks", { id: this.task.id }).then(() => {
        this.$router.push("/tasks");
      });
    },
    markCompleted() {
      const newValue = this.task.completed ? 0 : 1;
        db.put("js4tasks", {
          id: this.task.id,
          completed: newValue,
        }).then(() => {
          this.fetchRecord();
        });
      },
    fetchRecord() {
      return db.get("js4tasks/" + this.$route.params.id).then((record) => {
        this.task = record;
        this.loading = false;
      });
    },
    addPerson() {
      db.get("js4persons").then((data) => {
        this.allPersons = data;
        this.personToAdd = "";
        this.showAddPerson = true;
      });
    },
    addPersonToDb() {
      if (this.personToAdd) {
        db.post("js4personstasks", {
          taskid: this.task.id,
          personid: this.personToAdd,
        }).then(() => {
          db.get("js4personstasks?taskid=" + this.$route.params.id).then(
            (persons) => {
              this.persons = persons;
              this.showAddPerson = false;
            }
          );
        });
      }
    },
    onChanged(payload) {
      this.personToAdd = payload.value;
    },
    deletePerson(id){
      db.delete('js4personstasks', (id)).then(() => 
                db.get('js4personstasks?taskid=' + this.$route.params.id).then((persons) => {
                this.persons=persons

            }) )
    }
  },
  components: { BasePage, BaseButton, BaseModal, BaseControl },
};
</script>

<style></style>
