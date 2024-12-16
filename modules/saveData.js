const fs = require('fs');
const path = require('path');

const saveData = (sourcePath, destinationPath, overwrite) => {
    let dataJSON = '';
    let outputDirectory = destinationPath;
    console.log(outputDirectory);


    fs.readFile(sourcePath, (err, data) => {
        dataJSON = JSON.parse(data.toString());
        createFolder();
        // console.log(JSON.stringify(dataJSON));
        createFile(dataJSON);
    });

    const createFolder = () => {
        if (!fs.existsSync(outputDirectory)) {
            fs.mkdirSync(outputDirectory, { recursive: true }, (err) => {
                if (err) {
                    console.error(err);
                }
            });
            console.log('utworzono katalog');
        } else {
            console.error('katalog istnieje');
        }
    }

    const createFile = (data) => {
        data.forEach((record, index) => {
            let fileContent = '';
            fileContent += `Name: ${record.name.split(" ")[0]}` 
            // fileContent += `\n`;
            fileContent += `Surname: ${record.name.split(" ")[1]}`

            fs.writeFile(path.join(destinationPath, `${record.id}-${record.name.split(" ")[0]}-${record.name.split(" ")[1]}.txt`), JSON.stringify(fileContent), (err) => {
                if (err) console.error(err);
                console.log('utworzono plik');
            });
        })
    }
}

module.exports = saveData;