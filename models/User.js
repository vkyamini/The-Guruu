const { Schema, model } = require('mongoose')
// const offerSchema = require('./Offer')

// const skillsSchema = new Schema({
//     skillsId:{
//         type: Schema.Types.ObjectId,
//         default: () => new Types.ObjectId()
//     },
//     knownskills:{
//         type: String,
//             required: true,
//             minlength: 1,
//             maxLength: 280
//     }
// },
// {
//     toJSON: {
//         virtuals: true,
//         getters: true
//     },
//     id: false
// })

// const unknownskillsSchema = new Schema({
//     unknownskillsId:{
//         type: Schema.Types.ObjectId,
//         default: () => new Types.ObjectId()
//     },
//     unknownskills:{
//         type: String,
//             required: true,
//             minlength: 1,
//             maxLength: 280
//     }

// },
// {
//     toJSON: {
//         virtuals: true,
//         getters: true
//     },
//     id: false
// })

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+\@.+\..+/]
        },
        password:{
            type: String,
            required: true,
        },
        github: {
            type: String,
            required: true,
            max_length: 50,
          },
       linkedin: {
            type: String,
            required: true,
            max_length: 50,
          },

        // skillsknown: [skillsSchema],
        // skillsUnknown: [unknownskillsSchema],
        // offers: [offerSchema]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
)

// UserSchema.virtual('skillsknown').get(function() {
//     return this.skillsknown.length
// });
// UserSchema.virtual('skillsUnknown').get(function() {
//     return this.skillsUnknown.length
// });


const User = model('User', UserSchema)

module.exports = User