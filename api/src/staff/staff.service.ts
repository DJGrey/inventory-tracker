import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReadStaffDto } from './model/dto/readStaff.dto';
import { StaffEntity } from './model/entity/staff.entity';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(StaffEntity)
    private readonly staffRepository: Repository<StaffEntity>,
  ) {}

  async getAllStaff(): Promise<ReadStaffDto[]> {
    const staffMembers = await this.staffRepository.find();
    return staffMembers.map((staff) => {
      return {
        id: staff.id,
        name: staff.name,
        role: staff.role,
      };
    });
  }
}
