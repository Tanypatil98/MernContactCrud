const firebase = require('firebase-admin');

const resolvers = {
  Query: {
    hello(_, { name }) {
      return `Hello ${name || 'World'}`;
    },
    async getContacts() {
      const db = firebase.firestore();
      const todos = await db.collection('contact').get();
      let tempArray = [];
      todos.docs.map(doc => {
        let temp = {};
        temp.id = doc.id;
        temp.name = doc.data().name;
        temp.email = doc.data().email;
        temp.phone = doc.data().phone;
        tempArray.push(temp);
      });
      return tempArray;
    },
    async getContact(_, { id }) {
      const db = firebase.firestore();
      const todos = await db.collection('contact').doc(id).get();
      let temp = {};
      temp.id = id;
      temp.name = todos.data().name;
      temp.email = todos.data().email;
      temp.phone = todos.data().phone;
      return [temp];
    },
  },
  Mutation: {
    async addContact(_, { input }) {
      const db = firebase.firestore();
      const ref = db.collection('contact').doc();
      await ref.set(input);
      return ref.id;
    },
    async updateContact(_, { id, input }) {
      const db = firebase.firestore();
      const ref = db.collection('contact').doc(id);
      await ref.update(input);
      return ref.id;
    },
    async deleteContact(_, { id }) {
      const db = firebase.firestore();
      const ref = db.collection('contact').doc(id);
      await ref.delete();
      return ref.id;
    },
  }
};

module.exports = resolvers;