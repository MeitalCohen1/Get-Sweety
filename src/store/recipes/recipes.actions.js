import database from "../../middleware/firebase/database"; //  לאקשן מותר לצאת החוצה ולבצע פעולות מול הפייר בייס וכדומה

export default {
    getRecipes: async ({commit}) => {
        const recipes = await database.read({entity: 'recipes'});
        const ingredientsHm = {}
        for (const recipe of recipes) {
            if (!recipe.ingredients) continue
            for (const ingredient of recipe.ingredients) {
                if (!ingredientsHm[ingredient.name]) {
                    ingredientsHm[ingredient.name] = []
                }
                ingredientsHm[ingredient.name].push(recipe)
            }
        }
        commit('setRecipes', recipes)
        commit('setByIngredients', ingredientsHm)
    },

    deleteRecipe: async ({state, commit}, params) => {// params= {entity, id}
        await database.remove(params);
        // const recipeId = state.editedRecipeId;
        // commit('resetEditedRecipeId')
        commit('deleteRecipe', params.id)
    },

    updateRecipe: async ({state, commit}) => {
        const recipe = {}
        Object.assign(recipe, state.editedRecipe)
        recipe.id = state.editedRecipeId;
        await database.update({entity: 'recipes', id: recipe.editedRecipeId, recipe})
        commit('resetEditedRecipe')
        commit('resetEditedRecipeId')
        commit('editRecipe', recipe)
    },

    insertRecipe: async ({state, commit}) => {
        const recipe = {}
        Object.assign(recipe, state.editedRecipe)
        recipe.id = (await database.create({entity: 'recipes', recipe})).key
        commit('resetEditedRecipe')
        commit('insertRecipe', recipe)

    },

    setEditRecipeById: async ({state, commit}) => {
        let recipe = {}
        if (state.recipes.length && state.recipes.find(recipe => recipe.id === state.editedRecipeId)) {
            recipe = state.recipes.find(recipe => recipe.id === state.editedRecipeId);
        } else {
            recipe = await database.getById({entity: 'recipes', id: state.editedRecipeId})
        }
        commit('setEditedRecipe', recipe);
    },

    getImageUrl: ({state, commit}, file) => {
        return database.addImage({entity: 'recipes', file: file})
    },

    // deleteImg() {
    //     const self = this
    //     const storage = firebaseInstance.firebase.storage();
    //     const storageRef = storage.ref(`recipes/`);
    //     storageRef.child(`/${this.file[0].name}`).delete().then(() => {
    //         console.log('image delete')
    //         self.localNewRecipe.image = null
    //     }).catch((error) => {
    //     });
    // },

    googleLogin: ({state, commit}) => {
        return database.googleProvider()
    },

    providerEmailPassword: ({state, commit}) => {
        return database.loginWithEmailPassword()
    },

    setSelectedByIngredients: ({state, commit}, options) => { // רכיבים שסומנו
        const ingredientsList = []
        for (const opt of options) {
            if (opt.check === true) {
                ingredientsList.push(opt.label)
            }
        }
        return ingredientsList;
    },
}
