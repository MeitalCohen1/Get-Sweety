export default {

    setLocalUser: ((state, user) => {
        state.user = user
    }),

    setUser: ((state, user) => {
        state.user = user
    }),

    setUserRegister: ((state, user) => {
        state.user = user
    }),

    setFavorites: ((state, favorites) => {
        state.favorites = favorites
    }),

    setRecipeToUser: ((state, recipeObj) => {
        let favorites = state.favorites
        Object.assign(favorites,recipeObj)
        state.favorites = favorites
    }),

    setRemoveRecipeToUser: ((state, recipeId) => {
        let localFavorites = state.favorites
        for (const recipe in localFavorites) {
            if (recipe === recipeId) {
                delete localFavorites[recipe]
            }
        }
        state.favorites = localFavorites
    }),

    setUserRecipes: ((state, userRecipes) => {
        state.userRecipes = userRecipes
    }),
}
