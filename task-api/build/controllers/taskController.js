"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.editTask = exports.addTask = exports.getOneTask = exports.getAllTasks = void 0;
const task_1 = require("../models/task");
const getAllTasks = async (req, res, next) => {
    let taskList = await task_1.Task.find();
    res.status(200).json(taskList);
};
exports.getAllTasks = getAllTasks;
const getOneTask = async (req, res, next) => {
};
exports.getOneTask = getOneTask;
const addTask = async (req, res, next) => {
    const newTask = new task_1.Task({
        title: req.body.title,
        completed: req.body.completed
    });
    try {
        await newTask.save();
        res.status(201).json(newTask);
    }
    catch (err) {
        res.status(500).send(err);
        console.log(`an error occurred ${err}`);
    }
};
exports.addTask = addTask;
const editTask = async (req, res, next) => {
    let itemId = req.params.id;
    const updatedTask = new task_1.Task({
        _id: itemId,
        title: req.body.title,
        completed: req.body.completed
    });
    await task_1.Task.findByIdAndUpdate(itemId, { $set: updatedTask });
    res.status(200).json(updatedTask);
};
exports.editTask = editTask;
const deleteTask = async (req, res, next) => {
    let itemId = req.params.id;
    let deletedTask = await task_1.Task.findByIdAndDelete(itemId);
    res.status(200).json(deletedTask);
};
exports.deleteTask = deleteTask;
