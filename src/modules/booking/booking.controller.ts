import { NextFunction, Request, Response } from "express";
import { BookingService } from "./booking.service";
import { create } from "node:domain";

const createBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await BookingService.createBookingIntoDB(
      req.body,
      req.user?.id,
    );

    res.status(201).json({
      status: "success",
      message: "Booking created successfully",
      booking: result,
    });
  } catch (error: any) {
    next(error);
    // console.error("Full error:", error);
  }
};

export const BookingController = {
  // Add controller methods here
  createBooking,
};