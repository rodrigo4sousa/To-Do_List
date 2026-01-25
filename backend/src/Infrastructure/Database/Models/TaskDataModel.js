const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
    {
        _id: {
            type: String, // UUID
             required: true
        },
        title: {
             type: String,
            required: true,
            trim: true
        },
        completed: {
             type: Boolean,
             default: false
        },
        userId: {
             type: String,
             required: true,
             index: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Task', TaskSchema);