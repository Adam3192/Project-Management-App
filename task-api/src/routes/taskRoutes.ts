import { Router } from 'express';
import { addTask, editTask, deleteTask, getAllTasks, getOneTask } from '../controllers/taskController';

const router = Router();

router.get('/', getAllTasks);
router.get('/:id', getOneTask);
router.post('/', addTask);
router.put('/:id', editTask);
router.delete('/:id', deleteTask);

export default router;
