import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { IsAuthenticated } from 'src/core/auth/auth.decorator';
import { ResponseInterceptor } from 'src/core/interceptor/response.interceptor';
import { FileDto } from '../file/dto/file.dto';
import { CompanyService } from './company.service';
import { CompanyDto } from './dto/company.dto';
import { CreateEditCompanyDto } from './dto/create-edit-company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  @ApiOkResponse({
    description: 'Get all companies',
    type: CompanyDto,
    isArray: true,
  })
  @UseInterceptors(
    new ResponseInterceptor(CompanyDto, {
      logo: FileDto,
    }),
  )
  async getCompanies() {
    return this.companyService.getCompanies();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Get a company by id',
    type: CompanyDto,
  })
  @UseInterceptors(
    new ResponseInterceptor(CompanyDto, {
      logo: FileDto,
    }),
  )
  async getCompanyById(@Param('id') id: string) {
    return this.companyService.getCompanyById(id);
  }

  @Post()
  @ApiOkResponse({
    description: 'Create a new company',
    type: CompanyDto,
  })
  @UseInterceptors(
    new ResponseInterceptor(CompanyDto, {
      logo: FileDto,
    }),
  )
  @IsAuthenticated()
  async createCompany(@Body() company: CreateEditCompanyDto) {
    return this.companyService.createCompany(company);
  }

  @Put(':id')
  @IsAuthenticated()
  @ApiOkResponse({
    description: 'Update a company',
    type: CompanyDto,
  })
  @UseInterceptors(
    new ResponseInterceptor(CompanyDto, {
      logo: FileDto,
    }),
  )
  async updateCompany(
    @Param('id') id: string,
    @Body() body: CreateEditCompanyDto,
  ) {
    return this.companyService.updateCompany(id, body);
  }

  @Delete(':id')
  @IsAuthenticated()
  @ApiOkResponse({
    description: 'Delete a company',
    type: CompanyDto,
  })
  @IsAuthenticated()
  async deleteCompany(@Param('id') id: string) {
    return this.companyService.deleteCompany(id);
  }
}
