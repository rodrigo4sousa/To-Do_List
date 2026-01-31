const TaskRepositoryInterface = require('../../Domain/Task/TaskRepositoryInterface');
const Task = require('../../Domain/Task/Task');
const TaskDataMapper = require('../Database/Mappers/TaskDataMapper');
const TaskDataModel = require('../Database/Models/TaskDataModel');


class TaskRepository extends TaskRepositoryInterface {
	
    async save(task) {
		const data = TaskDataMapper.toDataModel(task);
		await TaskDataModel.findByIdAndUpdate(data._id, data, { upsert: true, new: true });
		return task;
	}

	async findByUserId(userId) {
		const models = await TaskDataModel.find({ userId });
		return models.map(model => TaskDataMapper.toDomain(model));
	}

	async update(task) {
		const data = TaskDataMapper.toExistingDataModel(task);
		const updated = await TaskDataModel.findByIdAndUpdate(
			task.id.id,
			data,
			{ new: true }
		);
		return updated ? TaskDataMapper.toDomain(updated) : null;
	}

	async findById(id) {
		const model = await TaskDataModel.findById(id);
		return TaskDataMapper.toDomain(model);
	}


	async delete(id) {
		const result = await TaskDataModel.findByIdAndDelete(id);
		return !!result;
	}
}

module.exports = TaskRepository;