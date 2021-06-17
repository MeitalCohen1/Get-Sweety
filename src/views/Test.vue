<template>
  <div class=" main q-pa-md">

    <!--  <div style="display: flex; justify-content: center; flex-direction: column; align-items: center">-->
<!--    <h3 v-bind:class="{model}">-->
<!--      TEST PAGE!!!!!!!!!!!!!!S-->
<!--    </h3>-->
    <!--  <q-btn v-model="model" icon="favorite" color="red" v-if="model" @click="model = !model"/>-->
    <!--  <q-btn v-model="model" icon="favorite" color="orange" v-if="!model" @click="model = !model"/>-->
    <!--  </div>-->

    <!--  <div>-->
    <!--    <Child :age="age"/>-->
    <!--    <h3>I AM Futher AND I AM {{age}} YEARS OLD</h3>-->
    <!--    <Brother @updateAge="setAge"/>-->

<!--    <div class="card-container">-->
<!--      <div class="upper-container">-->
<!--        <div class="image-container">-->
<!--          <img src="../assets/picHome2.jpg">-->
<!--        </div>-->
<!--      </div>-->

<!--      <div class="lower-container">-->
<!--        <div>-->
<!--          <h3>meital</h3>-->
<!--          <h4>full stack</h4>-->
<!--        </div>-->
<!--        <div>-->
<!--          <p>i'm developer</p>-->
<!--        </div>-->
<!--        <div>-->
<!--          <a href="#" class="btn">View profile</a>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->



  </div>
</template>

<script>
import Brother from "@/components/test/Brother";
import Child from "@/components/test/Child";

export default {
  name: "Test",
  props: ["card", 'recipeId', 'recipes'],
  components: {Brother, Child},
  data() {
    return {
      model: false,
      age: 0
    }
  },
  methods: {
    setAge(age) {
      this.age = age;
    }
  }
}
</script>

<style scoped>
/*h3 {*/
/*  transition: 0.5s ;*/
/*}*/

/*.model {*/
/*  transition: 0.5s;*/
/*  font-size: 100px;*/
/*}*/
/*.main {*/
/*  height: 150px;*/
/*  width: 400px;*/
/*  background: #e37946;*/
/*}*/

.card-container {

}
.upper-container {
  height: 150px;
  /*width: 400px;*/
  background-color: rgba(190, 140, 100, 0.2);
}

.image-container {
  background: white;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  padding: 5px;
  transform: translate(130px, 100px);
}

.image-container img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}

.lower-container {
  height: 280px;
  background: #fff;
  text-align: right;
}
.lower-container h3, h4{
  box-sizing: border-box;
  line-height: .6;
  font-weight: lighter;
}
.lower-container  h4{
  color: #027BE3;
  opacity: .6;
  font-weight: bold;
}

.lower-container p{
  font-size: 16px;
  color: gray;
  margin-bottom: 30px;
}
.lower-container .btn{
  padding: 12px 20px;
  background: #21BA45;
  border: none;
  color: white;
  border-radius: 30px;
  font-size: 12px;
  text-decoration: none;
  font-weight: bold;
  transition: all .3s ease-in;
}
.lower-container .btn:hover {
  background: transparent;
  color: #C10015;
  border: 2px solid #26A69A;
}


</style>
