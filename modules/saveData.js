const fs = require('fs');
const path = require('path');

const saveData = (sourcePath, destinationFolder, overwrite) => {
    let dataJSON = '';

    fs.readFile(sourcePath, (err, data) => {
        let destinationPath = path.join(sourcePath.replace(path.basename(sourcePath), ''), destinationFolder);

        dataJSON = JSON.parse(data.toString());
        createFolder(destinationPath);
        createFile(dataJSON, destinationPath, overwrite);
    });

    const createFolder = (destinationPath) => {
        console.log(destinationPath)
        if (!fs.existsSync(destinationPath)) {
            fs.mkdirSync(destinationPath, { recursive: true }, (err) => {
                if (err) {
                    console.error(err);
                }
            });
            console.log('utworzono katalog');
        } else {
            console.error('katalog istnieje');
        }
    }

    const createFile = (data, destinationPath, overwrite) => {
        data.forEach((record, index) => {
            let fileContent = '';
            let fileName = '';

            fileName = `${record.id}-${record.name.split(" ")[0]}-${record.name.split(" ")[1]}.txt`;

            fileContent += `Name: ${record.name.split(" ")[0]}`
            fileContent += `\r\n`;
            fileContent += `Surname: ${record.name.split(" ")[1]}`
            fileContent += `\r\n`;
            fileContent += `Street: ${record.address.street}`
            fileContent += `\r\n`;
            fileContent += `Zip Code: ${record.address.zipcode}`
            fileContent += `\r\n`;
            fileContent += `City: ${record.address.city}`
            fileContent += `\r\n`;
            fileContent += `Phone: ${record.phone}`

            if (!fs.existsSync(path.join(destinationPath, fileName)) || ((fs.existsSync(path.join(destinationPath, fileName)) && overwrite))) {
                fs.writeFile(path.join(destinationPath, fileName), fileContent, (err) => {
                    if (err) console.error(err);
                    console.log('utworzono plik');
                });
            } else {
                console.log(`Plik: ${fileName} już istnieje.`)
            } 
        })
    }
}

module.exports = saveData;