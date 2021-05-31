import firebaseInstance from '../';
import database from 'firebase/database';
import storage from 'firebase/storage';


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
                return res.val()
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

// >>> GET THIS CURRENT LOGGED IN USER ID <<<< //
function getUserById(id) {
    return firebaseInstance.firebase.database().ref(`users/${window.user.uid}`).get()
        .then(res => {
            return res.val();
        })
}

function addRecipeToUser(recipe) {
    return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/data/favorite`).push(recipe)
        .then(r => console.log('sucess!!!'))
        .catch(e => console.log(e.message));
}

function removeRecipeFromUser(recipe) {
    return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/data/favorite/${recipe}`).remove()
        .then(r => console.log('sucess!!!'))
        .catch(e => console.log(e.message));
}

function readFavorites() {
   return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/data/favorite`).once('value')
        .then(res => {
            const arr = [];
            const map = res.val();
            for (const key in map) {
                const item = map[key];
                item.id = key
                arr.push(item)
            }
            return arr;
        })
}

//
// function googleProvider() {
//     var provider = new firebaseInstance.firebase.auth.GoogleAuthProvider();
//     firebaseInstance.firebase.auth()
//         .signInWithPopup(provider)
//         .then((result) => {
//             /** @type {firebase.auth.OAuthCredential} */
//             var credential = result.credential;
//
//             // This gives you a Google Access Token. You can use it to access the Google API.
//             var token = credential.accessToken;
//             // The signed-in user info.
//             var user = result.user;
//             const newUser = user.providerData[0]
//             window.user = result.user;
//             setUser({user: newUser})
//             localStorage.setItem('user', JSON.stringify(newUser))
//
//             debugger
//             return newUser
//         }).catch((error) => {
//         // Handle Errors here.
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         // The email of the user's account used.
//         var email = error.email;
//         // The firebase.auth.AuthCredential type that was used.
//         var credential = error.credential;
//     });
// }
//
//

export default {
    read,
    create,
    remove,
    update,
    getRef,
    setUser,
    getById,
    addImage,
    getUserById,
    getUser,
    addRecipeToUser,
    removeRecipeFromUser,
    readFavorites,
}
