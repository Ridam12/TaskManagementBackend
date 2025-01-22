const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
};

exports.getTaskById = async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task Not Found' });
    res.json(task);
};

exports.createTask = async (req, res) => {
    const { title, description, status } = req.body;
    const task = new Task({ title, description, status });
    await task.save();
    res.json(task);
};

exports.updateTask = async (req, res) => {
    const { title, description, status } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ error: 'Task Not Found' });

    task.title = title;
    task.description = description;
    task.status = status;
    await task.save();

    res.json(task);
};

exports.deleteTask = async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) return res.status(404).json({ error: 'Task Not Found' });
    res.json({ message: 'Task Deleted' });
};
