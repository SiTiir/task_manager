<template>
    <nav>
        <ul>
            <li v-for="item in links">
                <router-link :to="item.path">{{ item.label }}</router-link>
            </li>

        </ul>
    </nav>
</template>

<script>

export default {

    name: 'NavBar',
    data() {
        return {

            links: [

                { label: 'Home', path: '/' },
                { label: 'Projects', path: '/projects' },
                { label: 'Tasks', path: '/tasks' },
                { label: 'Persons', path: '/persons' }
            ]
        }
    }

}
</script>

<style scoped> li {
     list-style: none;
     font-weight: bold;
     text-decoration: none;
 }

 ul {

     flex-direction: row;
     display: flex;
     justify-content: space-around;
     background-color: rgb(154, 206, 206);
     font-size: 1.5em;
     font-family: Roboto_Light;
     padding: 10px;


 }

 li a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
    padding: 0.3em 0.7em;
    border: 1px solid #ccecec;
    border-radius: 0.5em;
 }

 li a:hover {
     background-color: #ccecec;
 }
</style>