import { NextFunction, Request, Response } from "express"
import { stat } from "node:fs";
import { AuthService } from "./auth.service";


const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await AuthService.createUserIntoDB(req.body);
        res.status(201).json({
            status: "success",
            message: "User registered successfully",
            user: result
        })
    } catch (e) {
        next(e);
    }
}

const loginUser = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const result = await AuthService.loginUserIntoDB(req.body);

        res.cookie("token", result.token, {
            secure: false,
            httpOnly: true,
            sameSite: "strict",
        });
        res.status(201).json({
            status: "success",
            message: "User logged in successfully",
            user: result
        })
    } catch (e) {
        next(e);
    }
}

export const AuthController = {
    createUser,
    loginUser
}