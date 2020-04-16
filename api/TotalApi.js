import firebase from "firebase"

export function addTotal(total,addComplete){
    firebase.firestore()
    .collection('Recette')
    .add({
        total: total,
        createdAt:firebase.firestore.fieldValue.serverTimestamp 
    }).then((data) => addComplete(data))
    .catch ((err) => console.log(err))
}

export function getTotals (totalsRetrieved){
    var Archives = []
    
    var snapshot = await firebase.firestore()
    .collection('Recette')
    .orderBy("createdAt")
    .get()
    snapshot.forEach((doc) => {
        Archives.push(doc.data())
    })
}