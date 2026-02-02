const User = require('../../../Domain/User/User');
const UserId = require('../../../Domain/User/ValueObjects/UserId');
const UserEmail = require('../../../Domain/User/ValueObjects/UserEmail');

const UserDataMapper = {
    toDomain(data) {
        if (!data) return null;
        return new User({
            id: new UserId(data._id),
            email: new UserEmail(data.email),
            password: data.password,
            name: data.name
        });
    },

    
    toDataModel(user) {
        return {
            _id: user.id.value,
            email: user.email.value,
            password: user.password,
            name: user.name
        };
    },

    
    toResponse(user) {
        return {
            id: user.id.value,
            email: user.email.value,
            name: user.name
        };
    }
};

module.exports = UserDataMapper;
