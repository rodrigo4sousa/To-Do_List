// UserDataMapper.js
// Maps between User domain model and User data model (Mongoose)

const User = require('../../Domain/User/User');
const UserId = require('../../Domain/User/ValueObjects/UserId');
const UserEmail = require('../../Domain/User/ValueObjects/UserEmail');

const UserDataMapper = {
    /**
     * Converts a data model (Mongoose doc or plain object) to a User domain entity
     * @param {Object} data
     * @returns {User}
     */
    toDomain(data) {
        if (!data) return null;
        return new User({
            id: new UserId(data._id),
            email: new UserEmail(data.email)
        });
    },

    /**
     * Converts a User domain entity to a plain object for the data model
     * @param {User} user
     * @returns {Object}
     */
    toDataModel(user) {
        return {
            _id: user.id.value || user.id,
            email: user.email.value || user.email
        };
    }
};

module.exports = UserDataMapper;
