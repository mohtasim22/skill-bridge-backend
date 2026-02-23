import { prisma } from "../../lib/prisma";


const createTutorIntoDB = async (payload: any, userId: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!user) {
        throw new Error("User not found");
    }
    const result = await prisma.tutorProfile.create({
        data: { ...payload, user_id: user.id },
    });
    return result;
};

const getTutorByUserId = async (tutorId: string) => {
    
    const result = await prisma.tutorProfile.findUnique({
        where: {
            id: tutorId,
        },
    });
    return result;
};

const updateTutor = async (payload: Partial<{
    display_name: string;
    bio: string;
    qualification: string;
  }>, userId: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!user) {
        throw new Error("User not found");
    }
    const result = await prisma.tutorProfile.update({
        where: {
            user_id: user.id,
        },
        data: { ...payload},
    });
    return result;
};

const deleteTutor = async (tutorId: string, userId: string) => {
    const user = await prisma.user.findUnique({
        where: {    
            id: userId,
        },
    }); 
    if (!user) {
        throw new Error("User not found");
    }   
    const tutorProfile = await prisma.tutorProfile.findUnique({
        where: { id: tutorId },
    });
    if (!tutorProfile) {
        throw new Error("Tutor profile not found");
    }
    if (tutorProfile.user_id !== user.id) {
        throw new Error("Unauthorized! You can only delete your own tutor profile");
    }
    const result = await prisma.tutorProfile.delete({
        where: { id: tutorId },
    });
    return result;
};


export const tutorService = {
    createTutorIntoDB,
    updateTutor,
    getTutorByUserId,
    deleteTutor
}