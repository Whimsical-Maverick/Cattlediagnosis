import bcrypt from "bcrypt"
const saltround = 5

export const Hashpass = (password) => {
    const salt = bcrypt.genSaltSync(saltround)
    return bcrypt.hashSync(password, salt)
}

export const Compare = (pass, haspass) => {
    return bcrypt.compareSync(pass, haspass)
}