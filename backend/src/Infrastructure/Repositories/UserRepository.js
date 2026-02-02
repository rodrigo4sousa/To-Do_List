const UserDataModel = require('../Database/Models/UserDataModel');
const UserDataMapper = require('../Database/Mappers/UserDataMapper');

class UserRepository {
    async findById(userId) {
        const model = await UserDataModel.findById(userId);
        return UserDataMapper.toDomain(model);
    }

    async findByEmail(email) {
        const model = await UserDataModel.findOne({ email: email.toLowerCase() });
        return UserDataMapper.toDomain(model);
    }

    async save(user) {
        const data = UserDataMapper.toDataModel(user);
        await UserDataModel.create(data);
        return user;
    }
}

module.exports = UserRepository;
