const fs = require("fs");
const path = require('path')

module.exports = {
    uploadImage: (img) => {
        const originalFilePath = img.path; // 图片原始路径
        const originalFilename = img.originalFilename; // 图片原始名称
        const timeNow = Date.now();
        const type = img.type.split('/')[1];
        const newName = timeNow + "." + type;
        const newPath = path.join(__dirname, '../', '/public/images/upload/' + newName);

        if (originalFilename) {
            fs.readFile(originalFilePath, function (error, data) {
                if(error) {
                    return console.log(err);
                }
                fs.writeFile(newPath, data, function (error) {
                    if (error) {
                        return console.log(err);
                    }
                })
            })
            
            return newName;
        }
    }

}