const yargs = require('yargs')
const contact = require('./contact')
const { argv } = require('yargs')

yargs.command({
    command: 'add',
    describe: 'Menambah contact baru',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string'
        },
        email: {
            describe: 'email',
            demandOption: true,
            type: 'string'
        },
        phone: {
            describe: 'Nomor Handphone',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        contact.simpan(argv.nama, argv.email, argv.phone)
    }
}).demandCommand()

// Show
yargs.command({
    command: 'list',
    describe: 'menampilkan semua nama dan no hp contact',
    handler() {
        contact.list()
    }
})

// Detail
yargs.command({
    command: 'detail',
    describe: 'menampilkan detail kontak by name',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        contact.detail(argv.nama)
    }
})

// Hapus by name
yargs.command({
    command: 'delete',
    describe: 'delete data by name',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        contact.deleteContact(argv.nama)
    }
})

yargs.parse()