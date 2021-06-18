import database from "../../middleware/firebase/database";
// import firebaseInstance from '../../middleware/firebase';


export default {
    // insertLogin: async ({state, commit}) => {
    //     const user = {};
    //     user.id = window.user.providerData[0]
    //
    //     Object.assign(user, state.user)
    //     user.id = await database.setUser({entity: `users'/${window.user.uid}/recipe`, user})
    //     commit('setUser', user)
    // },


    register: async ({state, commit}) => {
        const user = {};
        // user.id = window.user.providerData[0]
        Object.assign(user, state.user)
        user.uid = await database.userRegister(user)
        commit('setUser', user)
        // const user = await database.userRegister(payload)
        //    commit('setUserRegister', user)
    },

    loginWithGoogle: async ({state, commit}) => {
        // const user = {};
        const user = await database.userLoginWithGoogle()
        // Object.assign(user, newUser)
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
