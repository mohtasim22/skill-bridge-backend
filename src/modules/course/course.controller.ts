import { NextFunction, Request, Response } from "express";
import { courseService } from "./course.service";

const createCourse = async( req: Request, res: Response, next: NextFunction)=>{
    try{
        const result = await courseService.createCourse(req.body, req.user?.id);
        res.status(201).json(result)
    } catch (e){
        next(e);
        // console.error("Full error:", error);
    }
} 
const getAllCourses = async( req: Request, res: Response, next: NextFunction)=>{
    try{
        const result = await courseService.getAllCourses(req.user?.id,);
        res.status(201).json(result)
    } catch (e){
        next(e);
    }
}
const deleteCourse = async( req: Request, res: Response, next: NextFunction)=>{
    try{
        const result = await courseService.deleteCourse(req.params?.id as string, req.user?.id as string);
        res.status(201).json(result)
    } catch (e){
        next(e);
    }
}
const updateCourse = async( req: Request, res: Response, next: NextFunction)=>{
    try{
        const result = await courseService.updateCourse(req.params?.id as string, req.body, req.user?.id as string);
        res.status(201).json(result)
    } catch (e){
        next(e);
    }
} 


export const CourseController ={
    createCourse,
    getAllCourses,
    updateCourse,
    deleteCourse
}