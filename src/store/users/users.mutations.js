export default {// רק למיוטיישן מותר לבצע שינוי לסטייט

    setUser: ((state, user) => {
        state.user = user
    }),

    setFavorites: ((state, favorites) => {
       state.favorites = favorites
    }),

    setRecipeToUser: ((state, recipe) => {
        state.favorite.push(recipe)
    }),

    setRemoveRecipeToUser: ((state, recipe) => {
        const index = state.favorites.findIndex(r => r.id === recipe)
        state.favorite.splice(index, 1);
    }),

    // setUserId: ((state, id) => {
    //     state.userId = id.data.uid
    // })
}
