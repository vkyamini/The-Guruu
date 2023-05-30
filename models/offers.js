const { Schema, model } = require('mongoose')

const offerSchema = new Schema(
    {
      Text: {
            type: String,
            required: true,
            minlength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
           
        },
        username: {
            type: String,
            required: true
        },
      
    },
    {
        toJSON: {
            virtuals: true,
            getters: true 
        },
        id: false
    }
)



const Offer = model('Offer', offerSchema)

module.exports = Offer