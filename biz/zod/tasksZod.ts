import { z } from "zod";

export const getTasksByUserIdZod = z.object({
	user_id: z.string(),
});

export const getTasksByUserIdReturnZod = z.object({
	id: z.number(),
	title: z.string(),
	description: z.string(),
	status: z.string(),
	dueDate: z.date(),
}).array();

export const getTaskByIdZod = z.object({
	// convert string to number
	id: z.string(),
}).refine((data) => {
	if (isNaN(Number(data.id))) return false;
	return true;
}, { message: 'id must be a number' });

export const getTaskByIdReturnZod = z.object({
	id: z.number(),
	title: z.string(),
	description: z.string(),
	status: z.string(),
	dueDate: z.date(),
});

export const postTaskZod = z.object({
	title: z.string(),
	description: z.string(),
	user_id: z.string(),
	dueDate: z.string().transform((val) => new Date(val)),
});

export const postTaskReturnZod = z.object({
	id: z.number(),
	title: z.string(),
	description: z.string(),
	user_id: z.string(),
	status: z.string(),
	dueDate: z.string(),
});

export const patchTaskZod = z.object({
	id: z.string(),
	title: z.string().optional(),
	description: z.string().optional(),
	status: z.string().optional(),
	dueDate: z.date().optional(),
})
.refine((data) => {
	if (isNaN(Number(data.id))) return false;
	return true;
}, { message: 'id must be a number' })
.refine((data) => {
	if (data.status && (data.status !== 'pending' && data.status !== 'InProgress' && data.status !== 'Completed')) return false;
	return true;
}, { message: 'status must be one of pending, InProgress, Completed' });

export const patchTaskReturnZod = z.object({
	id: z.number(),
	title: z.string(),
	description: z.string(),
	status: z.string(),
	dueDate: z.date(),
});

export const deleteTaskZod = z.object({
	id: z.string(),
})
.refine((data) => {
	if (isNaN(Number(data.id))) return false;
	return true;
}, { message: 'id must be a number' });

export const deleteTaskReturnZod = z.object({
	id: z.number(),
	title: z.string(),
	description: z.string(),
	status: z.string(),
	dueDate: z.date(),
});