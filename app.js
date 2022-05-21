// Здесь важно отметить, что, чтобы на стороне сервера multer
//  мог подхватить загруженный файл, у формы атрибут enctype должен иметь значение multipart/form-data.

// const express = require("express");
// const multer  = require("multer");
  
// const app = express();
 
// const upload = multer({dest:"uploads"});
// app.use(express.static(__dirname));
 
// app.post("/upload", upload.single("fileData"), (req, res, next)=> {
   
//     let fileData = req.file;
 
//     console.log(fileData);
//     if(!fileData)
//         res.send("Ошибка при загрузке файла");
//     else
//         res.send("Файл загружен");
// });
// app.listen(3000);
//! Настройка параметров сохранения файла diskStorage()

// const express = require("express");
// const multer  = require("multer");
  
// const app = express();
 
// const storageConfig = multer.diskStorage({
//     destination: (req, file, cb) =>{
//         cb(null, "uploads");
//     },
//     filename: (req, file, cb) =>{
//         cb(null, file.originalname);
//     }
// });
 
// app.use(express.static(__dirname));
 
// app.use(multer({storage:storageConfig}).single("fileData"));
// app.post("/upload", function (req, res, next) {
   
//     let fileData = req.file;
//     if(!fileData)
//         res.send("Ошибка при загрузке файла");
//     else
//         res.send("Файл загружен");
// });
// app.listen(3000, ()=>{console.log("Server started");});

// ! Фильтрация файлов
const express = require("express");
const multer  = require("multer");
  
const app = express();
 
const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "uploads");
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});
// определение фильтра

const fileFilter = (req, file, cb) => {
  
    if(file.mimetype === "image/png" || 
    file.mimetype === "image/jpg"|| 
    file.mimetype === "image/jpeg"){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
 }
 
app.use(express.static(__dirname));
// И чтобы применить данный фильтр, его необходимо передать в объект multer параметру fileFilter:
app.use(multer({storage:storageConfig, fileFilter: fileFilter}).single("fileData"));
app.post("/upload", function (req, res, next) {
   
    let fileData = req.file;
 
    console.log(fileData);
    if(!fileData)
        res.send("Ошибка при загрузке файла");
    else
        res.send("Файл загружен");
});
app.listen(3000, ()=>{console.log("Server started");});