import { Module } from "@nestjs/common";
import { BookingController } from "./booking.controller";
import { BookingService } from "./booking.service";
import { PrismaService } from "src/core/database/prisma.service";
import { UserService } from "../user/user.service";
import { RoomService } from "../room/room.service";
import { TimeSlotService } from "../time-slot/time-slot.service";

@Module({
    controllers: [BookingController],
    providers: [BookingService, UserService, RoomService, PrismaService, TimeSlotService],
})
export class BookingModule { }