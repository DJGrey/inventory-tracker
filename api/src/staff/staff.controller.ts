import { Controller, Get } from '@nestjs/common';
import { ReadAllStaffDto } from './model/dto/read_staff.dto';
import { StaffService } from './staff.service';

@Controller('staff')
export class StaffController {
  constructor(private staffService: StaffService) {}

  @Get()
  async findAll(): Promise<ReadAllStaffDto> {
    return {
      staff: await this.staffService.getAllStaff(),
    };
  }
}
