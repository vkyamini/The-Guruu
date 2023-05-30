const { Schema, model } = require('mongoose')

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
        skillsKnown:[{ }],

        skillsUnknown:[{ }],

        offers: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Offer'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
)

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length
});
// UserSchema.virtual('skillsknown').get(function() {
//     return this.skillsknown.length
// });
// UserSchema.virtual('skillsunknown').get(function() {
//     return this.skillsunknown.length
// });

const User = model('User', UserSchema)

module.exports = User