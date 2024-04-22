const { client } = require('../dbConnection')

class Cat {
    constructor(catCardList) {
        this.catCardList = catCardList
        this.catCollection = client.db('SIT725_proj4').collection('Cats')
    }

    static async create() {
        const catCardList = await client.db('SIT725_proj4').collection('Cats').find({}, { 
            projection: { _id: 0  } 
        }).toArray();
        return new Cat(catCardList);
    }

    async getDatabaseCats() {
        this.catCardList = await this.catCollection.find({}, { projection: { _id: 0 } }).toArray();
    }
    
    async saveCatsToDatabase(newCat) {
        let status = await this.catCollection.insertOne(newCat)
        return status.acknowledged
    }

    async deleteCatFromDatabase(cat) {
        await this.catCollection.deleteOne(cat);
    }

}

module.exports = { Cat }