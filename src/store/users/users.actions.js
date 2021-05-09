import database from "../../middleware/firebase/database"; //  לאקשן מותר לצאת החוצה ולבצע פעולות מול הפייר בייס וכדומה

export default {
    insertLogin: async ({state, commit}) => {
        debugger
        const user = {};
        user.id = window.user.id

        Object.assign(user, state.user)
        user.id = await database.create({entity:`users'/${window.user.uid}/recipe`, user})
        commit('setUser', user)
    },
}