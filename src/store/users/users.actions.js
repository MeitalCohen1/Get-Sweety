import database from "../../middleware/firebase/database"; //  לאקשן מותר לצאת החוצה ולבצע פעולות מול הפייר בייס וכדומה

export default {
    insertLogin: async ({state, commit}) => {
        const user = {};
        user.id = window.user.id

        Object.assign(user, state.user)
        user.id = await database.create({entity: `users'/${window.user.uid}/recipe`, user})
        commit('setUser', user)
    },

    getUser: async ({commit}) => {
        const user = await database.getUser({entity: 'user'});
        commit('setUser', user)
    },


    async getUserById({commit}, id) {
        const user = await database.getUserById(id);
        commit('setUser', user)
        return user;
    },

    getFavorites: async ({commit}) => {
        const favorites = await database.readFavorites({entity: `users/${window.user.uid}/data/favorite`});
        commit('setFavorites', favorites)
    },

    addRecipeToUser: async ({state, commit}, recipeId) => {
        const recipeDbKey = await database.addRecipeToUser(recipeId)
        commit('setRecipeToUser', {[recipeId]:recipeDbKey});
    },

    removeRecipeFromUser: async ({state, commit}, recipeObj) => {
        await database.removeRecipeFromUser(recipeObj.dbKey)
        commit('setRemoveRecipeToUser', recipeObj.recipeId);
    },

    getUserRecipes: async ({commit}) => {
       const userRecipes = await database.readUserRecipes( `users/${window.user.uid}/data/favorite`);
        commit('setUserRecipes', userRecipes)
        return userRecipes;
    }
}
