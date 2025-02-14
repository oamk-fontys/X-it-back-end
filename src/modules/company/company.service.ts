import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/core/database/prisma.service";
import { CreateEditCompanyDto } from "./dto/create-edit-company.dto";

@Injectable()
export class CompanyService {

  constructor(private readonly prisma: PrismaService) { }

  public async getCompanies() {
    return await this.prisma.company.findMany();
  }

  public async getCompanyById(id: string) {
    const company = await this.prisma.company.findUnique({
      where: { id },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    return company;
  }

  public async createCompany(body: CreateEditCompanyDto) {
    if (body.ownerId) {
      const owner = await this.prisma.user.findUnique({
        where: { id: body.ownerId },
      });

      if (!owner) {
        throw new NotFoundException('Owner not found');
      }
    }
    const newCompany = await this.prisma.company.create({
      data: {
        ...body
      },
    });

    return newCompany;
  }

  public async updateCompany(id: string, body: CreateEditCompanyDto) {
    if (body.ownerId) {
      const owner = await this.prisma.user.findUnique({
        where: { id: body.ownerId },
      });

      if (!owner) {
        throw new NotFoundException('Owner not found');
      }
    }
    const companyToUpdate = await this.prisma.company.findUnique({
      where: { id },
    });

    if (!companyToUpdate) {
      throw new NotFoundException('Company not found');
    }

    return await this.prisma.company.update({
      where: { id },
      data: {
        ...body
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
