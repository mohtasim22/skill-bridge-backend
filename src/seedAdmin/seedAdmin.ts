import { prisma } from "../lib/prisma";
import { UserRole } from "../middlewares/auth";
import bcrypt from "bcryptjs";

const seedAdmin = async () => {
    console.log("***** Admin Seeding Started....");

    const hashedPassword = await bcrypt.hash("12345", 8);

    const adminData = {
        name: "Admin",
        email: "admin@gmail.com",
        role: UserRole.admin,
        password: hashedPassword,
    };
    
    try {
        console.log("Checking if admin already exists...");

        const isExists = await prisma.user.findUnique({
            where: {
                email: adminData.email,
            },
        });

        if (isExists) {
            console.log("Admin already exists!");
            return;
        }
        console.log("Admin does not exist. Creating admin...");

        const admin = await prisma.user.create({
            data: adminData,
        });

        console.log("Admin created successfully!");

    } catch (error) {
        console.log(error);
    } finally {
        await prisma.$disconnect()
    }
};

seedAdmin();