const bcrypt = require('bcrypt')

module.exports = function hashPassword(schema, options) {
    schema.pre('save', async function (next) {
        if (!this.isModified('password')) return next()

        try {
            const saltRounds = (options && options.saltRounds) || 10
            this.password = await bcrypt.hash(this.password, saltRounds)
            next()
        } catch (error) {
            next(err)
        }
    })
}