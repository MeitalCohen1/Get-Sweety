<template>
  <q-dialog v-model="isClicked">
    <q-card style="width: 300px" class=" card q-px-sm q-pb-md">
      <q-card-section>
        <div dir="rtl" class="text-h6 icon">
          <q-item-section avatar>
            <q-icon name="checklist_rtl"/>
          </q-item-section>
          מרכיבים
        </div>
      </q-card-section>

      <q-item-label dir="rtl" header>בחר/י את המרכיבים שנמצאים ברשותך:</q-item-label>
      <q-item dir="rtl" dense
              v-for="opt in options" :key="opt.label" @click="opt.check = !opt.check">
        <q-item-section>
          <q-checkbox
              v-model="opt.check"
              :options="options"
              color="deep-orange-4"
              type="checkbox"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>
            {{ opt.label }}
          </q-item-label>
        </q-item-section>

      </q-item>

      <q-btn @click="search()" push color="deep-orange-4" round icon="search"/>
    </q-card>
  </q-dialog>
</template>

<script>
import {mapActions, mapMutations, mapState, mapGetters} from "vuex";

export default {
  name: "Ingredients",
  data() {
    return {
      ingredientsList: [],
      options: [
        {
          label: 'חלב',
          value: 'op1',
          check: false
        },
        {
          label: 'שמרים',
          value: 'op2',
          check: false
        },
        {
          label: 'קקאו',
          value: 'op3',
          check: false

        },
        {
          label: 'פודינג וניל',
          value: 'op4',
          check: false

        },
        {
          label: 'שוקולד',
          value: 'op5',
          check: false

        },
        {
          label: 'סוכר וניל',
          value: 'op6',
          check: false

        },
        {
          label: 'סוכר',
          value: 'op7',
          check: false

        },
        {
          label: 'שמן',
          value: 'op8',
          check: false

        },
        {
          label: 'קמח',
          value: 'op9',
          check: false

        },
        {
          label: 'ביצים',
          value: 'op10',
          check: false

        }
      ]
    }
  },
  computed: mapState('recipes', ['isClicked']),

  methods: {
    ...mapMutations('recipes', ['openDialog']),
    ...mapActions('recipes', ['setSelectedByIngredients']),
    ...mapGetters('recipes', ['filterByIngredients']),

    async search() {
      const ingredientsList = await this.setSelectedByIngredients(this.options)
      const allOfRecipes = this.filterByIngredients()(ingredientsList)
      this.$emit('searchIsClicked', allOfRecipes)
      this.openDialog()
    },
  },
}
</script>

<style scoped>
.ingredients {
  display: flex;
  flex-direction: column;
}

.icon {
  display: flex;
  flex-direction: row;
}

.card {
  font-family: 'Bellefair', serif;
}
</style>