const connection = require('../entity/connection');

class StudentService {
    connect;

    constructor() {
        connection.connectingToMySQL();
        this.connect = connection.getConnection();
    }

    findAll = () => {
        return new Promise((resolve, reject) => {
            this.connect.query(`SELECT s.idStuden, s.name_Student, c.name_Class, s.comment
                                FROM studen s JOIN class c ON s.idClass = c.idClass;`, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    }
    findById = (id) =>{
        return new Promise((resolve, reject) => {
            this.connect.query(`select s.*, c.name_Class from
                studen s join class c on c.idClass = s.idClass where s.idStuden = ${id};`, (err, product)=>{
                if(err) {
                    reject(err);
                } else {
                    resolve(product[0]);
                }
            })
        })
    }
    addStudent = (addStudent) =>{
        return new Promise((resolve, reject) => {
            this.connect.query(`INSERT INTO studen (name_Student, idClass, theoretical_Points, comment, practice_Points, description)
                                VALUES ('${addStudent.name_Student}', ${addStudent.idClass}, ${addStudent.theoretical_Point}, '${addStudent.comment}', ${addStudent.pratical_Point}, '${addStudent.description}');`, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    }
    editStudent = (editStudent,id) => {
        return new Promise((resolve, reject) => {
            this.connect.query(`UPDATE studen SET name_Student = '${editStudent.name_Student}', theoretical_Points = '${editStudent.theoretical_Point}', comment = '${editStudent.comment}' , practice_Points = '${editStudent.pratical_Point}', description = '${editStudent.description}' WHERE (idStuden = '${id}');`, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    }
    deleteStudent = (id) => {
        return new Promise((resolve, reject) => {
            this.connect.query(`DELETE FROM studen WHERE idStuden = '${id}';`, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    }
}
module.exports = new StudentService();


