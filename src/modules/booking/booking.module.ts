import { Module } from "@nestjs/common";
import { BookingController } from "./booking.controller";
import { BookingService } from "./booking.service";
import { PrismaService } from "src/core/database/prisma.service";
import { TimeSlotModule } from "../time-slot/time-slot.module";
import { UserModule } from "../user/user.module";
import { RoomModule } from "../room/room.module";

@Module({
    controllers: [BookingController],
    providers: [BookingService, PrismaService],
    imports: [TimeSlotModule, UserModule, RoomModule]
})
export class BookingModule { }