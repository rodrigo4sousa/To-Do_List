const UserRepositoryInterface = require('../../Domain/Repositories/UserRepository');
const UserDataModel = require('../Database/Models/UserDataModel');
const UserDataMapper = require('../../InterfaceAdapters/NodeAPI/Mappers/UserDataMapper');

class UserRepository extends UserRepositoryInterface {
    async findById(userId) {
        const model = await UserDataModel.findById(userId);
        return UserDataMapper.toDomain(model);
    }

    async save(user) {
        const data = UserDataMapper.toDataModel(user);
        await UserDataModel.findByIdAndUpdate(data._id, data, { upsert: true });
        return user;
    }
}

module.exports = UserRepository;
