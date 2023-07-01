<template>
    <h1>Home Page</h1>
    <BaseList :items="
    [
        {
        header:'header1',
        subtitle:'subtitle1',
        rightContent:'rightone1'
        },
        {
        header:'header2',
        subtitle:'subtitle2',
        rightContent:'rightone2'
        },  
    ]
    
    "/>
</template>

<script>
import BaseList from '../components/BaseList.vue';
export default {

    name: 'HomePage',
    components:{
        BaseList
    }
}
</script>
