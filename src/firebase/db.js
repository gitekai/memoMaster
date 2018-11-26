import { db } from "./firebase";

const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email
  });

const doCreateMayorSystem = (userID, mayorSystem) =>
  db.ref(`mayorSystems/${userID}`).set({ ...mayorSystem });

const onceGetMajorSystem = userID => {
  if (!userID) {
    console.log(
      "this.context not fucking working applying user by myself !!!!"
    );
    userID = "KBvoo76quhawWtzHfSm98h6dTI12";
  }
  return db.ref(`mayorSystems/${userID}`).once("value");
};

const doCreateNumberGameResults = ({
  userID,
  memorizationTimeInSec,
  recallTimeInSec,
  digitsTotal,
  correctNums
}) => {
  const ref = db.ref(`numberGame/results/${userID}/${digitsTotal}/${correctNums}`); 
  const newCHildRef = ref.push(); 
  newCHildRef.set({
    memorizationTimeInSec,
    recallTimeInSec,
  });
};

const onceGetUsers = () => db.ref("users").once("value");

export {
  doCreateUser,
  onceGetUsers,
  onceGetMajorSystem,
  doCreateMayorSystem,
  doCreateNumberGameResults
};
