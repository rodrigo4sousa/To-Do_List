class CreateTaskDto {
  constructor({ title }) {
    if (!title) {
      throw new Error('title is required');
    }

    this.title = title;
    Object.freeze(this);
  }
}

module.exports = CreateTaskDto;
