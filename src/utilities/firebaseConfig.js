// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
    getFirestore,
    query,
    orderBy,
    onSnapshot,
    collection,
    getDoc, 
    getDocs, 
    addDoc,
    updateDoc,
    doc, 
    serverTimestamp, 
    arrayUnion
} from "firebase/firestore";

import { 
  FirestoreProvider, 
  useFirestoreDocData, 
  useFirestore, 
  useFirebaseApp,
  useFirestoreCollectionData
} from 'reactfire';

import moment from 'moment';

import { getAuth, signInAnonymously} from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyDfTzRPDoOfnPONfOc-CGCbLPKglbFepEM",
  authDomain: "test-priva.firebaseapp.com",
  projectId: "test-priva",
  storageBucket: "test-priva.appspot.com",
  messagingSenderId: "423210991948",
  appId: "1:423210991948:web:f36916601d86e36dbfcfe9",
  measurementId: "G-RZX0KW5QTJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export const authenticateAnonymously = () => {
    return signInAnonymously(getAuth(app));
};

export const addData = (data) => {
	const trolleyCollection = collection(db, 'trolley');
	if (data.notes === undefined) {
		data.notes = '';
	}

	const start = moment(new Date());
    const ended = moment(data.datePicker);
    const diffMinutes  = start.diff(ended, 'minutes') // 1
    	console.log('dataaddd', data)
	const dataSent = {
		...data,
		earnedTime: diffMinutes,
		endedPick: new Date(),
	}

	return addDoc(trolleyCollection, dataSent)
} 
