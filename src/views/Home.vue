<template>
  <div class="home">

    <div class="text-h3 text-deep-orange-12 text-deep-orange-14 text-center headLine">GET SWEETY</div>

    <div class="home-text text-caption text-center text-grey"> The Get sweety app is here to help you find the most
      suitable recipe<br>
      for ingredients you currently have in the kitchen and save you a headache.<br>
      Ed go ahead, go and make yourself something sweet and delicious!
    </div>

    <div class="home-btn">
      <q-btn class="glossy" @click="$router.push('/milky')" rounded color="deep-orange" label="MILKY"/>
      <br> <br>

      <q-btn class="glossy" @click="$router.push('/parve')" rounded color="deep-orange" label="PARVE"/>
    </div>
  </div>
</template>

<script>
import carousel from "../components/carousel";

export default {
  name: 'Home',
  props: ['item'],
  components: {
    carousel
  },
  data() {
    return {}
  },
}
</script>
<style scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex-wrap: wrap;
  align-items: center;
  margin: 40px;
}

.home-btn {

}

.headLine {
  font-family: 'Prata', serif;
}

.home-text {
  font-family: 'Poiret One', cursive;
  text-align: center;
  margin: 30px;
}


</style>
