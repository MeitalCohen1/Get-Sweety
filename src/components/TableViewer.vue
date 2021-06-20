<template>
  <q-page dir="rtl">
    <div class="q-pa-md">

      <q-table
          class="table"
          :title="tableName"
          :data="recipes"
          :columns="columns"
          row-key="name"
          binary-state-sort
          flat
          bordered
      >
        <template v-slot:body="props">
          <q-tr :props="props">

            <q-td key="name" :props="props" @click="goToItem(props.row.id)"> {{ props.row.name }}</q-td>

            <q-td key="type" :props="props">{{ props.row.type }}</q-td>

            <q-td key="ingredients" :props="props">
              <q-item v-for="Ingredient in props.row.ingredients" :key="Ingredient.name" v-ripple>
                <q-item-section>
                  <q-item-label>{{ Ingredient.name }} {{ Ingredient.amount }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-td>
            <q-td key="preparation" :props="props">{{ props.row.preparation }}

<!--              <q-popup-edit v-model="props.row.preparation" title="Edit the preparation">-->
<!--                <q-input v-model="props.row.preparation" dense autofocus counter/>-->
<!--              </q-popup-edit>-->
            </q-td>
            <q-td key="difficulty" :props="props">
              <div class="text-center">
                <q-rating
                    v-model="props.row.difficulty"
                    size="2.5em"
                    color="grey"
                    :color-selected="ratingColors"
                    disable
                />
              </div>
            </q-td>
            <q-td key="id" :props="props">
              <q-btn @click="remove(props.row.id)">
                delete
              </q-btn>
            </q-td>
          </q-tr>
        </template>
      </q-table>

    </div>
  </q-page>
</template>


<script>
import {mapState, mapActions} from 'vuex';
// import firebaseDatabase from '../middleware/firebase/database';

export default {
  name: "TableViewer",
  props: ['tableName', 'item'],
  data() {
    return {
      columns: [
        {
          name: 'name',
          required: true,
          label: 'שם המתכון',
          align: 'left',
          field: row => row.name,
          sortable: true
        },
        {name: 'type', align: 'center', label: 'חלבי/פרווה', field: 'type',},
        {name: 'ingredients', label: 'מרכיבים', field: 'ingredients', align: 'center'},
        {name: 'preparation', label: 'אופן הכנה', field: 'preparation'},
        {name: 'difficulty', label: 'רמת קושי', align: 'center', field: 'difficulty'},
        {name: 'id', label: 'פעולות', field: 'id', align: 'center'}
      ],
      ratingColors: ['orange-3', 'orange-5', 'orange', 'orange-9', 'orange-10'],
    }
  },
  computed: mapState('recipes', ['editedRecipeId', 'recipes']),
  methods: {
    ...mapActions('recipes', ['deleteRecipe', 'getRecipes']),
    goToItem(id) {
      this.$router.push(`/item/${id}`)
    },
    remove(id) {
      this.deleteRecipe({entity: 'recipes', id})
    },

  },
  created() {
    this.getRecipes()

    // firebaseDatabase.getRef({entity: this.tableName})
    //     .on('child_changed', (snapshot) => {
    //       this.getRecipes()
    // });
  },

  // watch: { // ווטצ' מאזין האם בוצע שינוי או לא בוצע שינוי?
  //   recipes() {
  //     for (const key in this.recipes) {
  //       const item = this.recipes[key];
  //       item.id = key
  //       this.data.push(item)
  //     }
  //   }
  // }
}
</script>

<style>

.table {
  background-color: rgb(240, 230, 223);
}

.q-table--no-wrap th, .q-table--no-wrap td {
  white-space: inherit;
  text-align: left;
}



</style>
