import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { IsAuthenticated } from 'src/core/auth/auth.decorator';
import { RequestWithUser } from 'src/core/auth/auth.guard';
import { ResponseInterceptor } from 'src/core/interceptor/response.interceptor';
import { MinimalUserDto } from '../user/dto/minimal-user.dto';
import { AddEmployeeDto } from './dto/add-employee.dto';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  @UseInterceptors(new ResponseInterceptor(MinimalUserDto))
  @IsAuthenticated([Role.COMPANY])
  async getEmployees(@Req() req: RequestWithUser) {
    return this.employeeService.getEmployees(req.user.companyId);
  }

  @Post()
  @UseInterceptors(new ResponseInterceptor(MinimalUserDto))
  @IsAuthenticated([Role.COMPANY])
  async createEmployee(
    @Body() body: AddEmployeeDto,
    @Req() req: RequestWithUser,
  ) {
    return this.employeeService.createEmployee(req.user.companyId, body);
  }

  @Delete(':id')
  @UseInterceptors(new ResponseInterceptor(MinimalUserDto))
  @IsAuthenticated([Role.COMPANY])
  async deleteEmployee(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.employeeService.deleteEmployee(req.user.companyId, id);
  }
}
