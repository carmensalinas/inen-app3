import { FirebaseApp, initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';

const firebaseConfig = {...environment.firebaseConfig};

let appFirebase:FirebaseApp;
export const getFirebaseApp = ()=>{
    if(!appFirebase) appFirebase = initializeApp(firebaseConfig);
    return appFirebase
}