import firebase from "firebase/app";

const firebaseProject = "Estacionamiento";

const firebaseConfig = {
  apiKey: "<YOUR_WEB_API_KEY>",
  authDomain: `${firebaseProject}.firebaseapp.com`,
  databaseURL: `https://${firebaseProject}.firebaseio.com`,
  projectId: `${firebaseProject}`,
};

export default firebase;
