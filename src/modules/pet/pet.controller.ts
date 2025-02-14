import { Body, Controller, Get, Param, Post, Put, Delete} from "@nestjs/common";
import { PetService } from "./pet.service";
import { CreateEditPetDto } from "./dto/create-edit-pet.dto";

@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}


  @Get()
  async getPets() {
    return this.petService.getPets();
  }

  @Get(':id')
  async getPetById(@Param('id') id: string) {
    return this.petService.getPetById(id);
  }

  @Post()
  async createPet(@Body() pet: CreateEditPetDto) {
    return this.petService.createPet(pet);
  }

  @Put(':id')
  async updatePet(@Param('id') id: string, @Body() pet: CreateEditPetDto) {
    return this.petService.updatePet(id, pet);
  }

  @Delete(':id')
  async deletePet(@Param('id') id: string) {
    return this.petService.deletePet(id);
  }
}
