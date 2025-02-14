import { Body, Controller, Get, Param, Post, Put, Delete } from "@nestjs/common";
import { CompanyService } from "./company.service";
import { CreateEditCompanyDto } from "./dto/create-edit-company.dto";

@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) { }


    @Get()
    async getCompanies() {
        return this.companyService.getCompanies();
    }

    @Get(':id')
    async getCompanyById(@Param('id') id: string) {
        return this.companyService.getCompanyById(id);
    }

    @Post()
    async createCompany(@Body() company: CreateEditCompanyDto) {
        return this.companyService.createCompany(company);
    }

    @Put(':id')
    async updateCompany(@Param('id') id: string, @Body() company: CreateEditCompanyDto) {
        return this.companyService.updateCompany(id, company);
    }

    @Delete(':id')
    async deleteCompany(@Param('id') id: string) {
        return this.companyService.deleteCompany(id);
    }
}
