import express, { Application } from "express"
import { courseRouter } from "./modules/course/course.router";
import { AuthRoutes } from "./modules/auth/auth.router";
import { tutorRouter } from "./modules/tutor/tutor.router";
import { courseSlotRouter } from "./modules/courseSlot/slot.router";
import { reviewRouter } from "./modules/review/review.router";
import { bookingRouter } from "./modules/booking/booking.router";
import { notFound } from "./middlewares/notFound";
import { errorHandler } from "./middlewares/globalErrorHandler";
import { adminRouter } from "./modules/admin/admin.router";
const app: Application = express();

app.use(express.json());

app.use('/api/v1/auth', AuthRoutes);
app.use('/api/v1/tutors', tutorRouter);
app.use('/api/v1/courses', courseRouter);
app.use('/api/v1/slots', courseSlotRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);
app.use('/api/v1/admin', adminRouter);
    
app.get("/", (req, res) =>{
    res.send("Server is running successfully");
})

app.use(notFound);
app.use(errorHandler);

export default app;