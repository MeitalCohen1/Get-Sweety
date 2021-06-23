import firebaseInstance from '../';

function getRef(options) {
    return firebaseInstance.firebase.database().ref(`${options.entity}`)
}

function read(options) {
    let ref = ''
    if (options.id) {
        ref = firebaseInstance.firebase.database().ref(`${options.entity}/${options.id}`)
    } else {
        ref = firebaseInstance.firebase.database().ref(`${options.entity}`)
    }
    return ref.once('value')
        .then(res => {
            if (options.id) {
                return res.val();
            } else {
                const arr = [];
                const map = res.val();
                for (const key in map) {
                    const item = map[key];
                    item.id = key
                    arr.push(item)
                }
                return arr;
            }
        })
}

function getUser(options) {
    return firebaseInstance.firebase.database().ref(`${options.entity}`).once("value")
        .then(res => {
            return res.val();
        })
}

function userRegister(payload) {
    return firebaseInstance.firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then((data) => {
            firebaseInstance.firebase.database().ref('users').child(data.user.uid).set({
                uid: data.user.uid,
                displayName: payload.displayName,
                email: payload.email,
            })
            return data.user.uid
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
}

function userLoginWithGoogle() {
    var provider = new firebaseInstance.firebase.auth.GoogleAuthProvider();
    return firebaseInstance.firebase.auth().signInWithPopup(provider)
        .then((result) => {
            debugger
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;
            var token = credential.accessToken;
            var user = result.user;
            const newUser = {};
            newUser.displayName = user.displayName
            newUser.email = user.email
            newUser.uid = user.uid
            newUser.photoURL = user.photoURL
            // firebaseInstance.firebase.database().ref('users').child(user.uid).set(newUser);
            return newUser;
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = error.credential;
        });
}

function userLogin(payload) {
    return firebaseInstance.firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then((data) => {
            // firebaseInstance.firebase.database().ref('users').child(data.user.uid).set({
            //     uid: data.user.uid,
            //     email: payload.email,
            // })
            return data.user.uid
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
}

function logOutUser() {
    firebaseInstance.firebase.auth().signOut().then(() => {
    }).catch((error) => {
    });
}

function getById(options) {
    return firebaseInstance.firebase.database().ref(`${options.entity}/${options.id}`).once('value')
        .then(res => {
            return res.val();
        })
}

function setUser(options) {
    return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/data`).set(options.user);
}

function create(options) {
    return firebaseInstance.firebase.database().ref(`${options.entity}`).push(options.recipe);
}

function remove(options) {
    return firebaseInstance.firebase.database().ref(`${options.entity}/${options.id}`).remove();
}

function update(options) {
    return firebaseInstance.firebase.database().ref(`${options.entity}/${options.recipe.id}`).update(options.recipe);
}

function addImage(options) {
    const storage = firebaseInstance.firebase.storage();
    const storageRef = storage.ref(options.entity);
    const imageRef = storageRef.child(`/${options.file[0].name}`)
    imageRef.put(options.file[0])
        .then(snapshot => {
            snapshot.ref.getDownloadURL().then(url => {
                return url;
            })
            console.log('Image Uploaded Successfully!');
        });
}

function getUserById(id) {
    return firebaseInstance.firebase.database().ref(`users/${window.user.uid}`).get()
        .then(res => {
            return res.val();
        })
}

function addRecipeToUser(recipeId) {
    return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/favorite`).push(recipeId)
        .then(r => {
            console.log('Added to favorites successfully')
            return r.getKey()
        })
        .catch(e => console.log(e.message));
}

function removeRecipeFromUser(recipeId) {
    return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/favorite/${recipeId}`).remove()
        .then(r => console.log('Removed from favorites successfully'))
        .catch(e => console.log(e.message));
}

function readFavorites() {
    return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/favorite`).once('value')
        .then(res => {
            if (!res.val()) {
                return {};
            } else {
                let favorites = {}
                for (const favorite in res.val()) {
                    favorites[res.val()[favorite]] = favorite
                }
                return favorites
            }
        })
}

async function readUserRecipes(ref) {
    let favoritesRecipesId = {};
    let favoriteRecipes = {};
    const favoritesIds = (await firebaseInstance.firebase.database().ref(ref).once('value')).val();
    if (!favoritesIds)
        return favoritesRecipesId;
    else {
        for (const key in favoritesIds) {
            favoritesRecipesId[favoritesIds[key]] = key
        }
        for (const favoritesKey in favoritesRecipesId) {
            const favoriteRecipe = (await firebaseInstance.firebase.database().ref(`recipes/${favoritesKey}`).once('value')).val();
            favoriteRecipes[favoritesKey] = favoriteRecipe;
        }
    }
    return favoriteRecipes;
}

export default {
    read,
    create,
    remove,
    update,
    getRef,
    setUser,
    userRegister,
    userLoginWithGoogle,
    userLogin,
    logOutUser,
    getById,
    addImage,
    getUserById,
    getUser,
    addRecipeToUser,
    removeRecipeFromUser,
    readFavorites,
    readUserRecipes,
}
