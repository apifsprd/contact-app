const fs = require('node:fs');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const dirPath = './data'
if(!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

const dataPath = './data/contacts.json';
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath, '[]', 'utf-8')
}

const question = (question) => {
    return new Promise ((resolve, reject) => {
        rl.question(question, (answer) => {
            resolve(answer)
        })
    })
}

const simpan = (name, email, phone) =>{
    const contact = {name, email, phone}
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file) //membuah JSON kosong

    // Cek duplikat data
    const duplikat = contacts.find((contact) => contact.name === name)
    if (duplikat) {
        console.log('Nama telah terdaftar, coba masukan nama lain!')
        return false
    }

    contacts.push(contact); //push data string kedalam JSON
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))
    console.log('Data telah diinput!, Terimakasih')
    rl.close();
}

module.exports = {question, simpan}