export default {// רק למיוטיישן מותר לבצע שינוי לסטייט

    setRecipes: ((state, recipes) => {
        state.recipes = recipes
    }),

    setEditedRecipeId: ((state, id) => {
        state.editedRecipeId = id
    }),

    setEditedRecipe: ((state, recipe) => {
        state.editedRecipe = recipe
    }),

    resetEditedRecipeId: ((state) => {
        state.editedRecipeId = ''
    }),

    resetEditedRecipe: ((state) => {
        for (const key in state.editedRecipe) {
            state.editedRecipe[key] = ''
        }
        delete state.editedRecipe.id;
    }),

    editRecipe: ((state, recipe) => {
        const index = state.recipes.findIndex(p => p.id === recipe.id)
        state.recipes.splice(index, 1, recipe)
    }),

    deleteRecipe: ((state, recipeId) => {
        const index = state.recipes.findIndex(p => p.id === recipeId)
        state.recipes.splice(index, 1);
    }),

    insertRecipe: ((state, recipe) => {
        state.recipes.push(recipe)
    }),

    setSelectedRecipe: ((state, id) => {
        state.selectedRecipe = id ? state.recipes.find(r => r.id === id) : undefined
    }),

    openDialog: ((state) => {
        state.isClicked = !state.isClicked;
    }),

    setByIngredients: ((state, ingredientsHm) => {
        state.ingredientsHm = ingredientsHm
    }),
}
