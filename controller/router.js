const studentControler = require ('../controller/handel/studentController')
const router = {
    'home': studentControler.showStudentHtml,
    'add': studentControler.addStudent,
    'edit': studentControler.editStudent,
    'deleteCheck': studentControler.deleteCheck,
    'delete': studentControler.delete,
    'infor': studentControler.infor,
}
module.exports = router;