<template>
  <div>

    <div class="q-pa-md">
      <div class="q-gutter-y-md column" style="max-width: 300px">
        <q-input color="orange" v-model="searchInput" @click="search" label="Search">
          <template v-slot:prepend>
            <q-icon name="search"/>
          </template>
        </q-input>
      </div>
    </div>

      <div class="q-pa-md " style="max-width: 350px">
        <q-list bordered>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar rounded>
                <img src="../assets/milk.webp"
                     style="height: 80px; max-width: 60px"

                />
              </q-avatar>
            </q-item-section>
            <q-item-section>Milk</q-item-section>
          </q-item>

        </q-list>
      </div>

      <div class="row wrap">
        <CardViewer v-for="card of milkyData" :card="card" :tableName="'tableRecipes'"/>
      </div>
    </div>
</template>

<script>
import localStorageDriver from "../middleware/local-storage";
import CardViewer from "../components/CardViewer";

export default {
  name: "Milky",
  components: {CardViewer},
  data: () => ({
    searchInput: '',
    milkyData: [],
    tableName: 'tableRecipes'
  }),
  methods: {
    read() {
      var data = localStorageDriver.select(this.tableName);
      for (var recipe of data) {
        if (recipe.type == 'Milky') {
          this.milkyData.push(recipe)
          // console.log(this.milkyData)
        }
      }
    },
    search: function (recipe) {
      for (var key in recipe) {
        // debugger
        var tempSearch = this.milkyData.ingredients.includes(this.searchInput)
        if (tempSearch) {
          // debugger
          return recipe;
        }
      }
      return false;
    }
  },
  created() {
    this.read()
  }
}

</script>

<style scoped>

</style>