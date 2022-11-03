import { RequestHandler } from "express";
import { ITask, Task } from "../models/task";

export const getAllTasks: RequestHandler = async (req, res, next) => {
 let taskList = await Task.find();
 res.status(200).json(taskList);
}

export const getOneTask: RequestHandler = async (req, res, next) => {

}

export const addTask: RequestHandler = async (req, res, next) => {
 const newTask: ITask = new Task({
     title: req.body.title,
     completed: req.body.completed
 });

 try {
     await newTask.save();
     res.status(201).json(newTask);
 }
 catch (err) {
  res.status(500).send(err);
  console.log(`an error occurred ${err}`)
 }
}

export const editTask: RequestHandler = async (req, res, next) => {

 let itemId = req.params.id;
 
 const updatedTask: ITask = new Task({
     _id: itemId,
     title: req.body.title,
     completed: req.body.completed
 });

 await Task.findByIdAndUpdate(itemId, { $set: updatedTask })

 res.status(200).json(updatedTask);
}

export const deleteTask: RequestHandler = async (req, res, next) => {

 let itemId = req.params.id;
 let deletedTask = await Task.findByIdAndDelete(itemId);
 res.status(200).json(deletedTask);
}
