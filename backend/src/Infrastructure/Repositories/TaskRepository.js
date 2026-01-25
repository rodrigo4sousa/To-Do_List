const TaskRepositoryInterface = require('../../Domain/Task/TaskRepositoryInterface');
const Task = require('../../Domain/Task/Task');


class TaskRepository extends TaskRepositoryInterface {
	
    async save(task) {
			const data = TaskDataMapper.toDataModel(task);
			await TaskDataModel.findByIdAndUpdate(data._id, data, { upsert: true, new: true });
			return task;
	}

	async findAll() {
			const models = await TaskDataModel.find();
			return models.map(TaskDataMapper.toDomain);
	}

	async complete(id) {
		const task = tasks.get(id);
		if (!task) return null;
		Object.assign(task, updates);
		tasks.set(id, task);
		return task;
	}

	async delete(id) {
			await TaskDataModel.findByIdAndDelete(id);
			return true;
		}

		async findById(id) {
			const model = await TaskDataModel.findById(id);
			return TaskDataMapper.toDomain(model);
		}

		async update(id, task) {
			const data = TaskDataMapper.toExistingDataModel
				? TaskDataMapper.toExistingDataModel(id, task)
				: TaskDataMapper.toDataModel(task);
			const updated = await TaskDataModel.findByIdAndUpdate(id, data, { new: true });
			return TaskDataMapper.toDomain(updated);
	}
}

module.exports = TaskRepository;
