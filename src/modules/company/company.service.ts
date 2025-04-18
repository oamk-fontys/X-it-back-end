import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { CreateEditCompanyDto } from './dto/create-edit-company.dto';

@Injectable()
export class CompanyService {
  constructor(private readonly prisma: PrismaService) {}

  public async getCompanies() {
    return await this.prisma.company.findMany({
      include: {
        logo: true,
      },
    });
  }

  public async getCompanyById(id: string) {
    const company = await this.prisma.company.findUnique({
      where: { id },
      include: {
        logo: true,
      },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    return company;
  }

  public async createCompany(body: CreateEditCompanyDto) {
    const newCompany = await this.prisma.company.create({
      data: {
        ...body,
      },
      include: {
        logo: true,
      },
    });

    return newCompany;
  }

  public async updateCompany(id: string, body: Partial<CreateEditCompanyDto>) {
    const companyToUpdate = await this.prisma.company.findUnique({
      where: { id },
    });

    if (!companyToUpdate) {
      throw new NotFoundException('Company not found');
    }

    return await this.prisma.company.update({
      where: { id },
      data: {
        ...body,
      },
      include: {
        logo: true,
      },
    });
  }

  public async deleteCompany(id: string) {
    const companyToDelete = await this.prisma.company.findUnique({
      where: { id },
    });

    if (!companyToDelete) {
      throw new NotFoundException('Company not found');
    }

    return await this.prisma.company.delete({
      where: { id },
    });
  }
}
