import database from "../../middleware/firebase/database";

export default {

    register: async ({state, commit}) => {
        const user = {};
        Object.assign(user, state.user)
        user.uid = await database.userRegister(user)
        commit('setUser', user)
    },

    loginWithGoogle: async ({state, commit}) => {
        const user = await database.userLoginWithGoogle()
        commit('setUser', user)
    },

    loginWithEmailPassword: async ({state, commit}) => {
        const user = {};
        Object.assign(user, state.user)
        user.uid = await database.userLogin(user)
        commit('setUser', user)
    },

    logout: () => {
      database.logOutUser()
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
        const favorites = await database.readFavorites({entity: `users/${window.user.uid}/favorite`});
        commit('setFavorites', favorites)
    },

    addRecipeToUser: async ({state, commit}, recipeId) => {
        const recipeDbKey = await database.addRecipeToUser(recipeId)
        commit('setRecipeToUser', {[recipeId]: recipeDbKey});
    },

    removeRecipeFromUser: async ({state, commit}, recipeObj) => {
        await database.removeRecipeFromUser(recipeObj.dbKey)
        commit('setRemoveRecipeToUser', recipeObj.recipeId);
    },

    getUserRecipes: async ({commit}) => {
        const userRecipes = await database.readUserRecipes(`users/${window.user.uid}/favorite`);
        commit('setUserRecipes', userRecipes)
        return userRecipes;
    }
}
