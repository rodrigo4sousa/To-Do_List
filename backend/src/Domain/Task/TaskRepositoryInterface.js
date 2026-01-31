class TaskRepositoryInterface {
    
    async save(task) {
        throw new Error('Method not implemented.');
    }

    
    async findAll() {
        throw new Error('Method not implemented.');
    }

    
    async complete(id) {
        throw new Error('Method not implemented.');
    }

    
    async delete(id) {
        throw new Error('Method not implemented.');
    }
}

module.exports = TaskRepositoryInterface;
