import admin from '../node_modules/firebase-admin/lib/index.js'

class ContenedorFirebase{
    constructor(firebase_server, collection){
        this.collection = collection;
        this.nextid=0;
        this.db = "";
        this.query = "";
        this.firebase_server = firebase_server;
    }

    async init(){
        admin.initializeApp({
          credential: admin.credential.cert(this.firebase_server)          
        });
        
        this.db = admin.firestore();
        this.query = this.db.collection(this.collection);
    }

    async erase_all(){
        try {
            await this.deleteCollection(this.db, this.collection, 100);
            return true;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async insert(data){
        try {
            data.id = this.nextid;
            data.timestamp = Date.now();
            let doc = this.query.doc(`${this.nextid}`);
            await doc.create(data);
            this.nextid = this.nextid + 1;
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }

    }

    async getAll(){
        try {
            const queryAll = await this.query.get();
            let docs = queryAll.docs;
            const response = docs.map((doc)=>({
                contenido: doc.data()
            }));
            return (response);

        } catch (error) {
            console.log(error);
            return null;
        }
    }


    async get(id){
        try {
            const doc = this.query.doc(`${id}`);
            const contenido = await doc.get();
            const response = contenido.data();
            return response;
        } catch (error) {
            console.log(error);
            return null;
        }
    }


    async update(id, data){
        try {
            const doc = this.query.doc(`${id}`);
            await doc.update(data)
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }     
    }


    async remove(id){
        try {
            const doc = this.query.doc(`${id}`);
            await doc.delete();
            return true;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async deleteCollection(db, collectionPath, batchSize) {
        const collectionRef = db.collection(collectionPath);
        const query = collectionRef.orderBy('__name__').limit(batchSize);
      
        return new Promise((resolve, reject) => {
          this.deleteQueryBatch(db, query, resolve).catch(reject);
        });
      }
      

    async deleteQueryBatch(db, query, resolve) {
        const snapshot = await query.get();
      
        const batchSize = snapshot.size;
        if (batchSize === 0) {
          // When there are no documents left, we are done
          resolve();
          return;
        }
      
        // Delete documents in a batch
        const batch = db.batch();
        snapshot.docs.forEach((doc) => {
          batch.delete(doc.ref);
        });
        await batch.commit();
      
        // Recurse on the next process tick, to avoid
        // exploding the stack.
        process.nextTick(() => {
          this.deleteQueryBatch(db, query, resolve);
        });
      }

     
    
}

export default ContenedorFirebase;