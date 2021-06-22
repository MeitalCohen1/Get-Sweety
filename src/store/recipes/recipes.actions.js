import database from "../../middleware/firebase/database";

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

    deleteRecipe: async ({state, commit}, params) => {
        await database.remove(params);
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

    setSelectedByIngredients: ({state, commit}, options) => {
        const ingredientsList = []
        for (const opt of options) {
            if (opt.check === true) {
                ingredientsList.push(opt.label)
            }
        }
        return ingredientsList;
    },
}
