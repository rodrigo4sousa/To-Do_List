const User = require('../../../Domain/User/User');
const UserId = require('../../../Domain/User/ValueObjects/UserId');
const UserEmail = require('../../../Domain/User/ValueObjects/UserEmail');

const UserDataMapper = {
   
    toDomain(data) {
        if (!data) return null;
        return new User({
            id: new UserId(data._id),
            email: new UserEmail(data.email)
        });
    },

   
    toDataModel(user) {
        return {
            _id: user.id.value,
            email: user.email.value
        };
    }
};

module.exports = UserDataMapper;
