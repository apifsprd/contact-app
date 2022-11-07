const fs = require('node:fs');
const chalk = require('chalk')
const validator = require('validator')

const dirPath = './data'
if(!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

const dataPath = './data/contacts.json';
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath, '[]', 'utf-8')
}

const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file) //membuah JSON kosong
    return contacts
}


const simpan = (name, email, phone) =>{
    const contact = {name, email, phone}
    const contacts = loadContact()

    // Cek duplikat data
    const duplikat = contacts.find((contact) => contact.name === name)
    if (duplikat) {
        console.log(chalk.red.inverse.bold('Nama telah terdaftar, coba masukan nama lain!'))
        return false
    }

    // email validator
    if(email){
        if(!validator.isEmail(email)){
            console.log(chalk.red.inverse.bold('Email tidak valid!'))
            return false
        }
    }

    // phone validator
    if(!validator.isMobilePhone(phone, 'id-ID')){
        console.log(chalk.red.inverse.bold('Nomor tidak valid!'))
        return false
    }

    contacts.push(contact); //push data string kedalam JSON
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))
    console.log(chalk.green.inverse.bold('Data telah diinput!, Terimakasih'))
}

// LIST
const list = () => {
    const contacts = loadContact()
    console.log(chalk.cyan.inverse.bold('Daftar Kontak : '))
    contacts.forEach((contact, i) => {
        console.log(`${i+1}. ${contact.name} - ${contact.phone}`)
    })
}

// DETAIL
const detail = (nama) => {
    const contacts = loadContact()
    const contact = contacts.find((contact) => contact.name.toLowerCase() === nama.toLowerCase())

    if(!contact){
        console.log(chalk.red.inverse.bold('Data kontak tidak ditemukan!'))
        return false
    }

    console.log(chalk.cyan.inverse.bold(contact.name))
    console.log(contact.phone)
    if(contact.email) {
        console.log(contact.email)
    }
}

// DELETE
const deleteContact = (nama) => {
    const contacts = loadContact()
    const arrContact = contacts.filter((contact) => contact.name.toLowerCase() !== nama.toLowerCase())

    if(contacts.length === arrContact.length){
        console.log(chalk.red.inverse.bold(`Data kontak ${nama} tidak ditemukan!`))
        return false
    }

    fs.writeFileSync('data/contacts.json', JSON.stringify(arrContact))
    console.log(chalk.green.inverse.bold(`Data kontak ${nama} berhasil dihapus!`))    
}

module.exports = {simpan, list, detail, deleteContact}