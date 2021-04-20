<template>
  <q-page class="table">
    <div class="q-pa-md">
<!--      קלאס שקשור לעיצוב-->

      <q-table
          :title="tableName"
          :data="data"
          :columns="columns"
          row-key="name"
          binary-state-sort
          flat
          bordered

      >
        <template v-slot:body="props">
          <q-tr :props="props">

            <q-td key="name" :props="props" @click="goToItem(props.row.id)"> {{props.row.name}} </q-td>

            <q-td key="type" :props="props">{{ props.row.type }}</q-td>

            <q-td key="ingredients" :props="props">
              <q-item v-for="Ingredient in props.row.ingredients" :key="Ingredient.name" v-ripple>
                <q-item-section>
                    <q-item-label>{{Ingredient.name}}  {{Ingredient.amount}}</q-item-label>
                </q-item-section>
              </q-item>
            </q-td>
            <q-td key="preparation" :props="props">{{ props.row.preparation }}
              <q-popup-edit v-model="props.row.preparation" title="Edit the preparation">
                <q-input v-model="props.row.preparation" dense autofocus counter />
              </q-popup-edit>
            </q-td>
            <q-td key="difficulty" :props="props">
                <div class="q-gutter-y-md column">
                  <q-rating
                      v-model="props.row.difficulty"
                      size="3.0em"
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
import localStorageDriver from '../middleware/local-storage'; // פה טענו את הלוקאל סטוראז' ועכשיו נוכל להשתמש בפונ' שלו

export default {
  name: "TableViewer",
  props: ['tableName', 'item', 'isReload'], // פה הטענו את הפרופס מCOMP HOME
  data() { // כל מה שנכנס בדאטה הקוד שלי יכול לעשות את המושג ביינדינג כלומר הHTML יכול לטעון
    return {
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Recipe name',
          align: 'left',
          field: row => row.name,
          // format: val => `${val}`,
          sortable: true
        },
        {
          name: 'type', align: 'center', label: 'Type', field: 'type',
        },
        {name: 'ingredients', label: 'Ingredients', field: 'ingredients', align: 'center'},
        {name: 'preparation', label: 'preparation', field: 'preparation'},
        {name: 'difficulty', label: 'Difficulty', align: 'center',field: 'difficulty'},
        {name: 'id', label: 'Actions', field: 'id', align: 'center'}
      ],
      data: [],
      ratingColors: [ 'orange-3', 'orange-5', 'orange', 'orange-9', 'orange-10'],
    }
  },
  methods: {
    read() {
      this.data = localStorageDriver.select(this.tableName); // אני רוצה בעת הטעינה של ה-COMP לעשות שליפה מהלוקאל סטוראז' ובעצם להביא את הנתונים
    },
    remove(id) {
      localStorageDriver.remove(this.tableName, id);
      this.read()
    },
    goToItem(id) {
      this.$router.push(`/item/${id}`) // לך ל-ITEM.ID
    },

  },
  created() {
    this.read()
  },
  watch: { // ווטצ' מאזין האם בוצע שינוי או לא בוצע שינוי?
    isReload() {
      this.read();
    }
  }
}
</script>

<style lang="sass">

</style>