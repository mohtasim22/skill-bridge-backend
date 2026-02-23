import { prisma } from "../../lib/prisma";

const createCourse = async (payload: any, userID: string) => {

    const userData = await prisma.user.findUnique({
        where: {
            id: userID
        }
    })
    if (!userData) {
        throw new Error("Unauthorized!");
    }
    //  find tutor profile of this user
    const tutorProfile = await prisma.tutorProfile.findUnique({
        where: {
            user_id: userID,
        },
    });

    if (!tutorProfile) {
        throw new Error("Tutor profile not found");
    }
    console.log(payload,tutorProfile.id);

    const result = await prisma.course.create({
        data: {
            ...payload,
            tutor_id: tutorProfile.id
        }
    })
    return result;
}

const getAllCourses = async (userID: string) => {

    const userData = await prisma.user.findUnique({
        where: {
            id: userID
        }
    })
    if (!userData) {
        throw new Error("Unauthorized!");
    }

    const result = await prisma.course.findMany()
    return result;
}
const updateCourse = async (courseID: string, payload: Partial<{
    title: string;
    description: string;
}>, userID: string) => {
    const tutorProfile = await prisma.tutorProfile.findUnique({
        where: { user_id: userID },
    });

    if (!tutorProfile) {
        throw new Error("Tutor profile not found");
    }

    const course = await prisma.course.findUnique({
        where: { id: courseID },
    });

    if (!course) {
        throw new Error("Course not found");
    }

    if (course.tutor_id !== tutorProfile.id) {
        throw new Error("Unauthorized! You can only update your own courses");
    }

    const result = await prisma.course.update({
        where: {
            id: courseID
        },
        data: payload
    })
    return result;
}

const deleteCourse = async (courseID: string, userID: string) => {
    const tutorProfile = await prisma.tutorProfile.findUnique({
        where: { user_id: userID },
    });

    if (!tutorProfile) {
        throw new Error("Tutor profile not found");
    }

    const course = await prisma.course.findUnique({
        where: { id: courseID },
    });

    if (!course) {
        throw new Error("Course not found");
    }

    if (course.tutor_id !== tutorProfile.id) {
        throw new Error("Unauthorized! You can only delete your own courses");
    }
    const result = await prisma.course.delete({
        where: {        
            id: courseID
        }
    })

    return result;
}

export const courseService = {
    createCourse,
    getAllCourses,
    updateCourse,
    deleteCourse
}