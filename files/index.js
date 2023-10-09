
// read the file
const fs = require("fs");
fs.readFile("./test.txt", "utf-8", (err, result) => {
  if (err) {
    console.log("error");
  } else {
    console.log(result);
  }
});

// write the file 
// fs.writeFile('./test.txt', 'working in asynchronous file', (err) => {});


// update the file 
fs.appendFile("./test.txt", "data to append", (err) => {
  if (err) throw err;
  // console.log('The "data to append" was appended to file!');
});



// delete the file
fs.unlink("./message.txt", (deleteErr) => {
  if (deleteErr) {
    console.error("Error deleting the file:", deleteErr);
  } else {
    console.log("File deleted successfully.");
  }
});
