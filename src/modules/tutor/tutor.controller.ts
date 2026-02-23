import { NextFunction, Request, Response } from "express";
import { tutorService } from "./tutor.service";

const createTutor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.user?.id)
        const result = await tutorService.createTutorIntoDB(req.body,req.user?.id);

        res.status(201).json({
            status: "success",
            message: "Tutor registered successfully",
            user: result
        })
    } catch (e) {
        
        next(e);
    }
}
const getTutor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.user?.id)
        const result = await tutorService.getTutorByUserId(req.params?.id as string);

        res.status(201).json({
            status: "success",
            message: "Tutor retrieved successfully",
            user: result
        })
    } catch (e) {
        next(e);
    }
}
const updateTutor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.user?.id)
        const result = await tutorService.updateTutor(req.body,req.user?.id);

        res.status(201).json({
            status: "success",
            message: "Tutor updated successfully",
            user: result
        })
    } catch (e) {
        next(e);
    }
}

const deleteTutor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await tutorService.deleteTutor(req.params?.id as string, req.user?.id as string);        
        res.status(201).json({
            status: "success",
            message: "Tutor deleted successfully",
            user: result
        })
    } catch (e) {
        next(e);
    }
}

export const tutorController = {
    createTutor,
    updateTutor,
    getTutor,
    deleteTutor
}