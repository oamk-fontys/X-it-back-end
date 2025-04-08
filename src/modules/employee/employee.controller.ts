import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ResponseInterceptor } from 'src/core/interceptor/response.interceptor';
import { MinimalUserDto } from '../user/dto/minimal-user.dto';
import { AddEmployeeDto } from './dto/add-employee.dto';
import { EmployeeService } from './employee.service';

@Controller('employee/:companyId')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  @UseInterceptors(new ResponseInterceptor(MinimalUserDto))
  async getEmployees(@Param('companyId') companyId: string) {
    return this.employeeService.getEmployees(companyId);
  }

  @Post()
  @UseInterceptors(new ResponseInterceptor(MinimalUserDto))
  async createEmployee(
    @Param('companyId') companyId: string,
    @Body() body: AddEmployeeDto,
  ) {
    return this.employeeService.createEmployee(companyId, body);
  }

  @Delete(':id')
  @UseInterceptors(new ResponseInterceptor(MinimalUserDto))
  async deleteEmployee(
    @Param('companyId') companyId: string,
    @Param('id') id: string,
  ) {
    return this.employeeService.deleteEmployee(companyId, id);
  }
}
