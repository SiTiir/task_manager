<!-- 

// projects data
// tasks data
// same styling for each 

-->

<template>
    <ul>
        <li v-for="item in items" @click="$router.push(item.link)">
            <div class="left">
                <div class="header">{{ item.header }}</div>
                    <div class="subtitle">{{ item.subtitle }}</div>
                </div>
            <div class="right">
                <div class="rightContent"> 
                {{ item.rightContent }}
                </div>
            </div>
        </li>
    </ul>
</template>

<script>

export default {
    name: 'BaseList',
    props: {

        items: Array
    }

}

</script>

<style >
li {
  padding: 12px;
  font-family: Roboto_light;
  /* border: 1px solid black; */
  margin: 5px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}

li :hover {
background-color: #9acece;
width: 100%;
}

.header {
    font-weight: bold;
    font-size: 18px;
}

.right {
    display: flex;
    align-items: center;
   
}
</style>