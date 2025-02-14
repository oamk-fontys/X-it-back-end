import { Module } from "@nestjs/common";
import { PetController } from "./pet.controller";
import { PetService } from "./pet.service";
import { PrismaService } from "src/core/database/prisma.service";

@Module({
  controllers: [PetController],
  providers: [PetService, PrismaService],
})
export class PetModule {}