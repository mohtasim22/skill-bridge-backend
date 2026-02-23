

import { NextFunction, Request, Response } from "express";
import { slotService } from "./slot.service";

const createSlot = async( req: Request, res: Response, next: NextFunction)=>{
    try{
        const result = await slotService.createSlotIntoDB(req.body, req.user?.id);
        res.status(201).json({
            status: "success",
            message: "Slot created successfully",
            slot: result
        })
    } catch (e){
        next(e);
        // console.error("Full error:", error);
    }
} 
const getAllSlots = async( req: Request, res: Response, next: NextFunction)=>{
    try{
        const result = await slotService.getAllSlots(req.user?.id);
        res.status(201).json({
            status: "success",
            message: "Slots retrieved successfully",
            slots: result
        })
    } catch (e){
        next(e);
        // console.error("Full error:", error);
    }
} 

const updateSlot = async( req: Request, res: Response, next: NextFunction)=>{
    try{
        console.log("PAYLOAD:", req.body);
        const result = await slotService.updateSlot(req.params?.id as string, req.body, req.user?.id as string);    
        res.status(201).json({
            status: "success",
            message: "Slot updated successfully",
            slot: result
        })
    } catch (e){
        next(e);
        // console.error("Full error:", e);
    }
}

const deleteSlot = async( req: Request, res: Response, next: NextFunction)=>{
    try{
        const result = await slotService.deleteSlot(req.params?.id as string, req.user?.id as string);
        res.status(201).json({
            status: "success",
            message: "Slot deleted successfully",
            slot: result
        })
    } catch (e){
        next(e);
        // console.error("Full error:", e);
    }
}

export const slotController = {
    createSlot,
    getAllSlots,
    updateSlot,
    deleteSlot    
}