export default {
    filterByType: state => X =>
        state.recipes.filter(recipe => recipe.type === X),


    filterByIngredients: state => X => { // X = ingredientsList
        const searchRecipesByIngredients = [];
        for (const ingredient of X) {
            searchRecipesByIngredients.push(...state.ingredientsHm[ingredient])
        }

        const arr = [];
        const map = {}
        let length = X.length

        for (const recipe of searchRecipesByIngredients) {
            if (!map[recipe.id]) {
                map[recipe.id] = 0
            }
            map[recipe.id]++
            if (map[recipe.id] === length) {
                arr.push(recipe)
            }
        }
        return arr
    }
}


//  פתרון דופליקייט עם לולאות
// let recipes = state.recipes
// for (let i = 0; i < X.length; i++) {
//     let value = X[i]
//     recipes = recipes.filter( r => {
//         return r.ingredients.contains( i => i.name === value)
//         for (const ingredient of r.ingredients) {
//             if (ingredient.name === value ) return true
//         }
//         return false
//     })
// }
// return recipes