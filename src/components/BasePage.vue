<template>
    <div class="container">
        <div class="first-line">
            <h1> {{ title }} </h1>
            <div class="top-right">
                <slot name="topRight"></slot>
            </div>
        </div>
        <template v-if="!loading">
            <div class="second-line">
                <slot name="secondLine"></slot>
            </div>
            <div class="third-line">
                <slot name="thirdLine"></slot>
            </div>
        </template>
        <BaseLoading v-else/>
    </div>
</template>


<script>
    import BaseLoading from './BaseLoading.vue';
    export default {
        name: 'BasePage',
        props: {
            title: String,
            loading: Boolean
        },
        components: {BaseLoading}
    }
</script>


<style scoped>
.container {
    display: flex;
    flex-direction: column;
    font-family: Roboto_Light;
    margin: 20px;
    padding: 10px;
}

.first-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.second-line {
    background-color: none;
    box-shadow: 5px 5px 10px rgb(242, 245, 245);
    display: flex;
    border-radius: 10px;
    padding: 5px;
}

.third-line {
    display: flex;
    justify-content: flex-end;

}

h1 {
    display: flex;
    justify-content: center;
    width: 40%;

}

</style>