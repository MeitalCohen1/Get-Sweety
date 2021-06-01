export default {// רק למיוטיישן מותר לבצע שינוי לסטייט

    setUser: ((state, user) => {
        state.user = user
    }),

    setFavorites: ((state, favorites) => {
        // state.favorites.push(favorites)
        state.favorites = favorites
    }),

    setRecipeToUser: ((state, recipeObj) => {
        let favorites = state.favorites
        Object.assign(favorites,recipeObj)
        state.favorites = favorites
    }),

    // resetFavorite: ((state) => {
    // state.favorite = ''
    // }),

    setRemoveRecipeToUser: ((state, recipeId) => {
        // delete state.favorites[recipe]
        let localFavorites = state.favorites
        for (const recipe in localFavorites) {
            if (localFavorites[recipe] === recipeId) {
                delete localFavorites[recipe]
            }
        }
        state.favorites = localFavorites
    }),

    // setUserId: ((state, id) => {
    //     state.userId = id.data.uid
    // })
}
