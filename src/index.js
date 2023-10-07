const experss = require('express')
const app = experss();
const PORT = 3000;


app.listen(PORT, ()=>{
    console.log( `server started at ${PORT}`);
})