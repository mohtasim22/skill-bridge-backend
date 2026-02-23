import { Review } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createReviewIntoDB = async (payload: Omit<Review, "id" | "createdAt" | "updatedAt">, userId: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!user) {
        throw new Error("User not found");
    }

    const booking = await prisma.booking.findUnique({
        where: {
            id: payload.booking_id,
        },
    });
    if (!booking) {
        throw new Error("Booking not found");
    }

    const result = await prisma.review.create({
        data: { ...payload, 
            student_id: user.id,
            tutor_id: booking.tutor_id,
        },
    });
    return result;
};

const getAllReviews = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!user) {
        throw new Error("User not found");
    }

    const result = await prisma.review.findMany({
        where: {
            student_id: user.id,
        },
    });
    return result;
}

const updateReview = async (reviewId: string, payload: Partial<{
    rating: number;
    comment: string;
}>, userId: string) => {

    const review = await prisma.review.findUnique({
        where: { id: reviewId },
    });

    if (!review) {
        throw new Error("Review not found");
    }

    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });

    if (review.student_id !== user?.id) {
        throw new Error("Unauthorized! You can only update your own reviews");
    }

    const result = await prisma.review.update({
        where: {
            id: reviewId
        },
        data: payload,
    });
    return result;
};

const deleteReview = async (reviewId: string, userId: string) => {

    const review = await prisma.review.findUnique({
        where: { id: reviewId },
    });

    if (!review) {
        throw new Error("Review not found");
    }

    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!user) {
        throw new Error("User not found");
    }

    if (review.student_id !== user.id) {
        throw new Error("Unauthorized! You can only delete your own reviews");
    }

    const result = await prisma.review.delete({
        where: {
            id: reviewId
        }
    });
    return result;
};

export const reviewService = {
    createReviewIntoDB,
    getAllReviews,
    updateReview,
    deleteReview
}