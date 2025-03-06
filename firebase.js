const db = firebase.firestore();

function relatar() {
  db.collection('Player').add({
    Nick: "GAB",
    Plataform: "desktop",
    Score: 5455,
    Horario: firebase.firestore.FieldValue.serverTimestamp() // Pega o horário no ServerSide ao invés do ClientSide
  })
    
  .then(() => {
    console.log('Pedido adicionado')
  })

  .catch(e => {
    console.log('Pedido não adicionado', e.message)
  })
}

