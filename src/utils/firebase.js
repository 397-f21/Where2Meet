import {initializeApp} from "firebase/app";
import {useState, useEffect} from "react";
import {getDatabase, ref, onValue, set} from "firebase/database";
// Set the configuration for your app
// TODO: Replace with your app's config object
const firebaseConfig = {
    apiKey: "AIzaSyBodwMivQSufOltlrtfqaLDcCHAOGIwyKk",
    authDomain: "where2meet-a59fc.firebaseapp.com",
    databaseURL: "https://where2meet-a59fc-default-rtdb.firebaseio.com",
    projectId: "where2meet-a59fc",
    storageBucket: "where2meet-a59fc.appspot.com",
    messagingSenderId: "405082124371",
    appId: "1:405082124371:web:911aa7855fcf70a9f216a6",
    measurementId: "G-W1B8G49V78"
};


// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
const database = getDatabase(firebaseApp);

export const setRealtimeDb = (path, content) => {
    set(ref(database, path), content)
}
// export const signInWithGoogle = () => {
//     signInWithPopup(getAuth(firebaseApp), new GoogleAuthProvider());
// };
// export const useUserState = () => {
//     const [user, setUser] = useState();
//
//     useEffect(() => {
//         onIdTokenChanged(getAuth(firebaseApp), setUser);
//     }, []);
//
//     return [user];
// };

// const firebaseSignOut = () => signOut(getAuth(firebaseApp));

// export {firebaseSignOut as signOut};

// append a content to the array at path
// export const pushRealtimeDb = (path, content, setPhotos) => {
//     onValue(ref(database, path), (snapshot) => {
//         let data = snapshot.val();
//         console.log(data);
//
//         if (!data) {
//             data = [];
//         }
//         data.push(content);
//         setRealtimeDb(path, data);
//         setPhotos(data);
//     }, {onlyOnce: true});
//
//
// }
// export const UpdatePhotos = (paths, photos, setPhotos) => {
//     console.log("UpdatePhoto called")
//
//     if (paths.length === 0) {
//         setPhotos([]);
//         return;
//     }
//
//     var results = [];
//
//     paths.map(path =>
//         getDownloadURL(ref(storage, path)).then((url) => {
//             console.log("UpdatedPhotoURL:", url)
//             results.push(url)
//         })
//     )
//     setPhotos(results);
//     return 0;
// }


export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const dbRef = ref(database, path);
        console.log(database);
        const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
        if (devMode) {
            // console.log(`loading ${path}`);
        }
        return onValue(dbRef, (snapshot) => {
            const val = snapshot.val();
            if (devMode) {
                // console.log(val);
            }
            setData(transform ? transform(val) : val);
            setLoading(false);
            setError(null);
        }, (error) => {
            setData(null);
            setLoading(false);
            setError(error);
        });
    }, [path, transform]);

    return [data, loading, error];
};