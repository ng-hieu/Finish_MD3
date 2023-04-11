const http = require("http");
const router = require('./controller/router');
const handleError = require('./controller/handel/errorNotFound')
const server = http.createServer((req, res) => {
    let url = req.url
    let arrPath = url.split('/')
    let path = '';
    let id = -1
    if (arrPath.length > 2) {
        path = arrPath[1];
        id = arrPath[2];
    } else {
        path = arrPath[1]
    }
    let chosenHandle;
    if (router[path]) {
        chosenHandle = router[path]
    } else {
        chosenHandle = handleError.errorNotFound;
    }
    chosenHandle(req, res, id);
})
server.listen(8020, 'localhost', ()=>{
    console.log('8020 dang chay');
})