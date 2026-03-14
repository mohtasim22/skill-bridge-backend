import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import jwt from "jsonwebtoken";

const createUserIntoDB = async (payload: any) => {
    const hashPassword = await bcrypt.hash(payload.password, 8);
    const result = await prisma.user.create({
        data: { ...payload, password: hashPassword }
    })
    const { password, ...newResult } = result;
    return newResult;
}

const loginUserIntoDB = async (payload: any) => {
    const user = await prisma.user.findUnique({
        where: {
            email: payload.email
        }
    })
    if (!user) {
        throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(payload.password, user.password);

    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }

    const userData = {
        id: user.id,
        name: user.name,
        role: user.role,
        status: user.status,
        email: user.email,
    };

    const token = jwt.sign(userData, process.env.JWT_SECRET as string, { expiresIn: "7d" });

    return { token, user: userData };
}

const updateUserIntoDB = async (payload: {name?: string}, userId: string) => {
    const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }
    const result = await prisma.user.update({
        where: {
            id: userId
        },
        data: payload,
    });
    const { password, ...newResult } = result;
    return newResult;
}
export const AuthService = {
    createUserIntoDB,
    loginUserIntoDB,
    updateUserIntoDB
}