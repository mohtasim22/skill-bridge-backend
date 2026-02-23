import { Booking } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createBookingIntoDB = async (
  payload: Omit<Booking, "id" | "createdAt" | "updatedAt">,
  userId: string,
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }

  const slot = await prisma.courseSlot.findUnique({
    where: {
      id: payload.course_slot_id,
    },
  });

  if (!slot) {
    throw new Error("Course Slot not found");
  }

  const result = await prisma.booking.create({
    data: {
      ...payload,
      tutor_id: slot.tutor_id,
      student_id: user.id,
    },
  });
  return result;
};

export const BookingService = {
  // Add service methods here
  createBookingIntoDB,
};