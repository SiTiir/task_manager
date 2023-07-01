<template>
<BasePage title="Persons Page" :loading="loading">
        <template v-slot:topRight>
            <BaseButton label="add" @clicked="$router.push('/personform')"/>
        </template>
        <template v-slot:secondLine>
            <BaseList :items="personsToDisplay" />
        </template>
        <template v-slot:thirdLine>
        </template>
    </BasePage>
</template>
<script>

import db from '../utils/db.js'
import BaseList from '../components/BaseList.vue'
import BasePage from '../components/BasePage.vue'
import BaseButton from '../components/BaseButton.vue'

export default {
    name: 'PersonsPage',
    data () {
      return {
        persons: []
      }
    },
    created () {
      db.get('js4persons').then(data => {
        this.persons = data
      })
    },
    components: { BaseList, BasePage, BaseButton },
    computed: {
        personsToDisplay() {
            return this.persons.map(person => {
                return {
                    id: person.id,
                    link: "/person/" + person.id,
                    header: person.first + ' ' + person.last,
                    subtitle: person.position
                }
            })
        }
    }
}

</script>