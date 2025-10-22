import express, { Response } from 'express';
import { z } from 'zod';
import { PrismaClient, Priority, Status } from '@prisma/client';
import { AuthRequest, authMiddleware } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();


// Apply auth middleware to all routes
router.use(authMiddleware);

// Validation schemas
const createDeadlineSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title is too long'),
  description: z.string().max(1000, 'Description is too long').optional(),
  due_date: z.string().min(1, 'Due date is required'),
  priority: z.enum(['high', 'medium', 'low']).default('medium'),
  status: z.enum(['pending', 'completed']).optional(),
});

const updateDeadlineSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional().nullable(),
  due_date: z.string().min(1).optional(),
  priority: z.enum(['high', 'medium', 'low']).optional(),
  status: z.enum(['pending', 'completed']).optional(),
});

// Get all deadlines for the authenticated user
router.get('/', async (req: AuthRequest, res: Response, next) => {
  try {
    const deadlines = await prisma.deadline.findMany({
      where: { userId: req.userId },
      orderBy: [{ status: 'asc' }, { dueDate: 'asc' }],
    });

    // Transform to match frontend format
    const formattedDeadlines = deadlines.map((deadline) => ({
      id: deadline.id,
      title: deadline.title,
      description: deadline.description,
      due_date: deadline.dueDate.toISOString(),
      priority: deadline.priority,
      status: deadline.status,
      user_id: deadline.userId,
      created_at: deadline.createdAt.toISOString(),
      updated_at: deadline.updatedAt.toISOString(),
    }));

    res.json(formattedDeadlines);
  } catch (error) {
    next(error);
  }
});

// Get a single deadline
router.get('/:id', async (req: AuthRequest, res: Response, next) => {
  try {
    const { id } = req.params;

    const deadline = await prisma.deadline.findFirst({
      where: {
        id,
        userId: req.userId, // Ensure user can only access their own deadlines
      },
    });

    if (!deadline) {
      res.status(404).json({ error: 'Deadline not found' });
      return;
    }

    res.json({
      id: deadline.id,
      title: deadline.title,
      description: deadline.description,
      due_date: deadline.dueDate.toISOString(),
      priority: deadline.priority,
      status: deadline.status,
      user_id: deadline.userId,
      created_at: deadline.createdAt.toISOString(),
      updated_at: deadline.updatedAt.toISOString(),
    });
  } catch (error) {
    next(error);
  }
});

// Create a new deadline
router.post('/', async (req: AuthRequest, res: Response, next) => {
  try {
    const data = createDeadlineSchema.parse(req.body);

    const deadline = await prisma.deadline.create({
      data: {
        title: data.title,
        description: data.description || null,
        dueDate: new Date(data.due_date),
        priority: data.priority as Priority,
        status: (data.status as Status) || 'pending',
        userId: req.userId!,
      },
    });

    res.status(201).json({
      id: deadline.id,
      title: deadline.title,
      description: deadline.description,
      due_date: deadline.dueDate.toISOString(),
      priority: deadline.priority,
      status: deadline.status,
      user_id: deadline.userId,
      created_at: deadline.createdAt.toISOString(),
      updated_at: deadline.updatedAt.toISOString(),
    });
  } catch (error) {
    next(error);
  }
});

// Update a deadline
router.put('/:id', async (req: AuthRequest, res: Response, next) => {
  try {
    const { id } = req.params;
    const data = updateDeadlineSchema.parse(req.body);

    // Check if deadline exists and belongs to user
    const existingDeadline = await prisma.deadline.findFirst({
      where: {
        id,
        userId: req.userId,
      },
    });

    if (!existingDeadline) {
      res.status(404).json({ error: 'Deadline not found' });
      return;
    }

    const updateData: any = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.due_date !== undefined) updateData.dueDate = new Date(data.due_date);
    if (data.priority !== undefined) updateData.priority = data.priority;
    if (data.status !== undefined) updateData.status = data.status;

    const deadline = await prisma.deadline.update({
      where: { id },
      data: updateData,
    });

    res.json({
      id: deadline.id,
      title: deadline.title,
      description: deadline.description,
      due_date: deadline.dueDate.toISOString(),
      priority: deadline.priority,
      status: deadline.status,
      user_id: deadline.userId,
      created_at: deadline.createdAt.toISOString(),
      updated_at: deadline.updatedAt.toISOString(),
    });
  } catch (error) {
    next(error);
  }
});

// Delete a deadline
router.delete('/:id', async (req: AuthRequest, res: Response, next) => {
  try {
    const { id } = req.params;

    // Check if deadline exists and belongs to user
    const existingDeadline = await prisma.deadline.findFirst({
      where: {
        id,
        userId: req.userId,
      },
    });

    if (!existingDeadline) {
      res.status(404).json({ error: 'Deadline not found' });
      return;
    }

    await prisma.deadline.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;

