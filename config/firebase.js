import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCbPPz_SKAdLk8e0FZcTyXNXDL9gF1gfIc",
    authDomain: "react-native-course-5ec03.firebaseapp.com",
    databaseURL: "https://react-native-course-5ec03-default-rtdb.firebaseio.com",
    projectId: "react-native-course-5ec03",
    storageBucket: "react-native-course-5ec03.firebasestorage.app",
    messagingSenderId: "40521362673",
    appId: "1:40521362673:web:5f3d13638e078b18df8d50"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth }; 