const connection = require('../entity/connection');

class classService{
    connect;
    constructor() {
        connection.connectingToMySQL();
        this.connect = connection.getConnection();
    }
    findAll=()=>{
        return new Promise((resolve, reject) => {
            this.connect.query(`SELECT * FROM finish_md3.class;`, (err, value)=>{
                if(err){
                    reject(err);
                } else {
                    resolve(value);
                }
            })
        })
    }
}
module.exports = new classService();