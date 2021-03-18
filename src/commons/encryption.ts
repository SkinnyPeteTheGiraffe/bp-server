import * as bcrypt from 'bcrypt'

const saltRounds = Number(process.env.SALT_ROUNDS || 10)

export const encrypt = (password) => new Promise<string>(((resolve, reject) => {
    // noinspection JSIgnoredPromiseFromCall
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            reject(err)
        }
        resolve(hash)
    })
}))

export const compare = (raw, hash) => new Promise<boolean>(((resolve, reject) => {
    // noinspection JSIgnoredPromiseFromCall
    bcrypt.compare(raw, hash, function(err, result) {
        if (err) {
            reject(err)
        }
        resolve(result)
    });
}))
