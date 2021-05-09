<!--<template>-->
<!--  <div class="q-pa-md">-->

<!--    <q-carousel-->
<!--        v-model="slide"-->
<!--        transition-prev="slide-right"-->
<!--        transition-next="slide-left"-->
<!--        swipeable-->
<!--        animated-->
<!--        control-color="primary"-->
<!--        padding-->
<!--        arrows-->
<!--        height="500px"-->
<!--        style="width: 500px "-->
<!--        class="bg-deep-orange-1 shadow-10 rounded-borders"-->
<!--    >-->
<!--      <q-carousel-slide v-for="(card,index) of cards" :name="index" class="column no-wrap">-->
<!--        <CardViewer :card="card" :tableName="'tableRecipes'"/>-->
<!--      </q-carousel-slide>-->
<!--    </q-carousel>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import CardViewer from "@/components/CardViewer";-->
<!--import localStorageDriver from "@/middleware/local-storage";-->

<!--export default {-->
<!--  props: ['tableName', 'isReload'],-->
<!--  name: "carousel",-->
<!--  components: {-->
<!--    CardViewer,-->
<!--  },-->

<!--  data() {-->
<!--    return {-->
<!--      slide: 0,-->
<!--      cards: []-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    read() {-->
<!--      let recipes = localStorageDriver.select(this.tableName); // אני רוצה בעת הטעינה של ה-COMP לעשות שליפה מהלוקאל סטוראז' ובעצם להביא את הנתונים-->
<!--      this.cards = recipes-->

<!--    },-->
<!--  },-->
<!--  created() {-->
<!--    this.read()-->
<!--  },-->
<!--  watch: { // ווטצ' מאזין האם בוצע שינוי או לא בוצע שינוי?-->
<!--    isReload() {-->
<!--      this.read();-->
<!--    }-->
<!--  }-->
<!--}-->

<!--</script>-->

<!--<style scoped>-->

<!--</style>-->