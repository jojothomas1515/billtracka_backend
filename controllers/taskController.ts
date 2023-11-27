import { Request, Response } from 'express';
import Task from '../models/taskModel.js';
import { NotFound } from '../error/errors.js';

export const createTask = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { user } = req;

  const { taskTitle, taskDescription, startDate, endDate, completed } =
    req.body;

  const task = await Task.create({
    taskTitle,
    taskDescription,
    startDate,
    endDate,
    completed,
    userId: user.id,
  });

  return res.status(201).json({
    status: 'success',
    data: task,
  });
};

export const getTasks = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { user } = req;

  const tasks = await Task.findAll({
    where: {
      userId: user.id,
    },
  });

  return res.status(200).json({
    status: 'success',
    data: tasks,
  });
};

export const getTask = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { user } = req;

  const { taskId } = req.params;

  const task = await Task.findOne({
    where: {
      userId: user.id,
      id: taskId,
    },
  });

  if (!task) {
    throw new NotFound('Task not found');
  }

  return res.status(200).json({
    status: 'success',
    data: task,
  });
};

export const updateTask = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { user } = req;

  const { taskId } = req.params;

  const { taskTitle, taskDescription, startDate, endDate, completed } =
    req.body;

  const task = await Task.findOne({
    where: {
      userId: user.id,
      id: taskId,
    },
  });

  if (!task) {
    throw new NotFound('Task not found');
  }

  task.taskTitle = taskTitle;
  task.taskDescription = taskDescription;
  task.startDate = startDate;
  task.endDate = endDate;
  task.completed = completed;

  await task.save();

  return res.status(200).json({
    status: 'success',
    data: task,
  });
};

export const deleteTask = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { user } = req;

  const { taskId } = req.params;

  const task = await Task.findOne({
    where: {
      userId: user.id,
      id: taskId,
    },
  });

  if (!task) {
    throw new NotFound('Task not found');
  }

  await task.destroy();

  return res.status(200).json({
    status: 'success',
    message: 'Task deleted successfully',
  });
};

export const getTaskById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  const task = await Task.findByPk(id);

  if (!task) {
    throw new NotFound('Task Not Found');
  }

  return res.json({
    task,
  });
};
