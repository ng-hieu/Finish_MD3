const fs = require('fs');
class errorNotFound{
    errorNotFound=(req, res)=>{
        fs.readFile('./view/error/error.html', 'utf-8', (err, value)=>{
            res.write(value)
            res.end();
        })
    }
}
module.exports = new errorNotFound();