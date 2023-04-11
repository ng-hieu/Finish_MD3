const studentService = require('../../service/studentService')
const classService = require('../../service/classSevice')
const qs = require('qs');
const fs = require('fs')
let idOfUrl = 0;
class studentControler {
    getHtmlStudent = (student, indexHtml) => {
        let studentHtml = ''
        student.map(value => {
            studentHtml += `
                <tr>
                    <td scope="col">${value.idStuden}</td>
                    <td scope="col"><a href="/infor/${value.idStuden}">${value.name_Student}</a></td>
                    <td scope="col">${value.name_Class}</td>
                    <td scope="col">${value.comment}</td>
                    <td scope="col">
                        <a href="/edit/${value.idStuden}">Sửa</a>
                        <a href="/deleteCheck/${value.idStuden}">Xóa</a>
                    </td>
                </tr>`
        })
        indexHtml = indexHtml.replace('{studenList}', studentHtml);
        return indexHtml;
    }
    showStudentHtml = async (req, res) => {
        fs.readFile('./view/index.html', 'utf-8', async (err, indexHtml) => {
            let student = await studentService.findAll();
            indexHtml = this.getHtmlStudent(student, indexHtml);
            res.write(indexHtml);
            res.end()
        })
    }
    addStudent = async (req, res) => {
        if (req.method === 'GET') {
            fs.readFile('./view/student/add.html', 'utf-8', async (err, indexHtml) => {
                let classes = await classService.findAll();
                let htmlClass = '';
                classes.map(item => {
                    htmlClass += `<option value="${item.idClass}">${item.name_Class}</option>`
                })
                indexHtml = indexHtml.replace('{class}', htmlClass)
                res.write(indexHtml);
                res.end();
            })
        } else if (req.method === 'POST') {
            let data = ''
            req.on('data', chunk => {
                data += chunk;
            })
            req.on('end', async () => {
                let addStudent = qs.parse(data);
                await studentService.addStudent(addStudent);
                res.writeHead(301, {'location': '/home'})
                res.end();
            })
        }
    }
    editStudent = async (req, res, id) => {
        console.log('Checkkkk')
        console.log(id)
        if (req.method === 'GET') {
            fs.readFile('./view/student/edit.html', "utf-8", async (err, editHtml) => {
                let student = await studentService.findById(id);
                let classes = await classService.findAll();
                editHtml = editHtml.replace('{name_Student}', student.name_Student);
                editHtml = editHtml.replace('{theoretical_Point}', student.theoretical_Points);
                editHtml = editHtml.replace('{pratical_Point}', student.practice_Points);
                editHtml = editHtml.replace('{comment}', student.comment);
                editHtml = editHtml.replace('{description}', student.description);
                let htmlClass = '';
                classes.map(item => {
                    htmlClass += `<option value="${item.idClass}">${item.name_Class}</option>`
                })
                editHtml = editHtml.replace('{class}', htmlClass)
                res.write(editHtml);
                res.end();
            })
        } else {
            let data = '';
            req.on('data', chunk=>{
                data+=chunk;
            })
            req.on('end', async ()=>{
                let editStudent = qs.parse(data);
                await studentService.editStudent(editStudent, id);
                res.writeHead(301, {'location': '/home'})
                res.end();
            })
        }
    }
    deleteCheck = async (req, res) => {
        let url = req.url;
        let arrUrl = url.split('/')
        console.log(arrUrl)
        idOfUrl = arrUrl[2];
        fs.readFile('./view/student/delete.html', 'utf-8', async (err, indexHtml) => {
            res.write(indexHtml);
            res.end();
        })
    }
    delete = async (req, res) => {
        console.log(idOfUrl)
        await studentService.deleteStudent(idOfUrl);
        res.writeHead(301, {'location': '/home'})
        res.end();
    }
    infor = async (req, res, id) => {
        console.log(id)
        fs.readFile('./view/student/infor.html', "utf-8", async (err, editHtml) => {
            let student = await studentService.findById(id);
            let classes = await classService.findAll();
            editHtml = editHtml.replace('{name_Student}', student.name_Student);
            editHtml = editHtml.replace('{theoretical_Point}', student.theoretical_Points);
            editHtml = editHtml.replace('{pratical_Point}', student.practice_Points);
            editHtml = editHtml.replace('{comment}', student.comment);
            editHtml = editHtml.replace('{description}', student.description);
            let htmlClass = '';
            classes.map(item => {
                htmlClass += `<option value="${item.idClass}">${item.name_Class}</option>`
            })
            editHtml = editHtml.replace('{class}', htmlClass)
            res.write(editHtml);
            res.end();
        })
    }
}

module.exports = new studentControler();