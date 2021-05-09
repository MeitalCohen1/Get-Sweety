import state from './recipes.state';
import mutations from './recipes.mutations';
import actions from './recipes.actions';
import getters from './recipes.getters';

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}