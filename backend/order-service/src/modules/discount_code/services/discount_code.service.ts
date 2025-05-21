import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiscountCode, DiscountType } from '../entities/discount_code.entity';
import { RpcException } from '@nestjs/microservices';
import { CreateDiscountCodeRequest } from '../dto/create-discount_code-request.dto';
import { UpdateDiscountCodeRequest } from '../dto/update-discount_code-request.dto';

@Injectable()
export class DiscountCodesService {
  private readonly logger = new Logger(DiscountCodesService.name);

  constructor(
    @InjectRepository(DiscountCode)
    private readonly discountCodeRepository: Repository<DiscountCode>,
  ) {}

  // Lấy tất cả các mã giảm giá
  async findAll(): Promise<DiscountCode[]> {
    return await this.discountCodeRepository.find();
  }

  // Lấy 1 mã giảm giá theo ID
  async findOneById(id: number): Promise<DiscountCode> {
    const discountCode = await this.discountCodeRepository.findOneBy({ id });
    if (!discountCode) {
      throw new RpcException(
        new NotFoundException(`Không tìm thấy mã giảm giá với ID ${id}`),
      );
    }
    return discountCode;
  }

  async findOneByCode(code: string): Promise<DiscountCode> {
    const discountCode = await this.discountCodeRepository.findOne({
      where: { code: code.trim().toUpperCase() },
    });
    if (!discountCode) {
      throw new RpcException(
        new NotFoundException(`Không tìm thấy mã giảm giá với code ${code}`),
      );
    }
    return discountCode;
  }

  // Tạo mới mã giảm giá
  async createDiscountCode(
    dto: CreateDiscountCodeRequest,
  ): Promise<DiscountCode> {
    // Kiểm tra rằng một mã giảm giá cần được cung cấp và không được trống
    if (!dto.code || dto.code.trim() === '') {
      throw new RpcException(
        new BadRequestException(
          'Mã giảm giá là bắt buộc và không được để trống',
        ),
      );
    }

    // Kiểm tra xem mã giảm giá đã tồn tại hay chưa
    const existingCode = await this.discountCodeRepository.findOneBy({
      code: dto.code.trim(),
    });
    if (existingCode) {
      throw new RpcException(
        new BadRequestException(`Mã giảm giá ${dto.code} đã tồn tại`),
      );
    }

    // Kiểm tra giá trị giảm giá dựa trên loại giảm giá
    if (dto.discountType === DiscountType.FIXED) {
      if (typeof dto.discountValue !== 'number' || dto.discountValue <= 0) {
        throw new RpcException(
          new BadRequestException(
            'Với giảm giá FIXED, giá trị giảm giá phải là một số dương',
          ),
        );
      }
    } else if (dto.discountType === DiscountType.PERCENTAGE) {
      if (
        typeof dto.discountValue !== 'number' ||
        dto.discountValue < 0 ||
        dto.discountValue > 100
      ) {
        throw new RpcException(
          new BadRequestException(
            'Với giảm giá PERCENTAGE, giá trị giảm giá phải nằm trong khoảng từ 0 đến 100',
          ),
        );
      }
    } else if (dto.discountType === DiscountType.NONE) {
      dto.discountValue = 0;
    }

    // Kiểm tra ngày hiệu lực
    if (!dto.validFrom || !dto.validUntil) {
      throw new RpcException(
        new BadRequestException(
          'Cần cung cấp cả ngày bắt đầu và ngày kết thúc hiệu lực',
        ),
      );
    }
    if (new Date(dto.validFrom) > new Date(dto.validUntil)) {
      throw new RpcException(
        new BadRequestException(
          'Ngày bắt đầu không được sau ngày kết thúc hiệu lực',
        ),
      );
    }

    // Tạo đối tượng mã giảm giá mới
    const newDiscountCode = this.discountCodeRepository.create({
      code: dto.code.trim(),
      discountType: dto.discountType,
      discountValue: dto.discountValue,
      validFrom: dto.validFrom,
      validUntil: dto.validUntil,
      usageLimit: dto.usageLimit ?? 1,
      usageCount: 0,
    });
    return await this.discountCodeRepository.save(newDiscountCode);
  }

  // Cập nhật thông tin mã giảm giá
  async updateDiscountCode(
    id: number,
    dto: UpdateDiscountCodeRequest,
  ): Promise<DiscountCode> {
    const discountCode = await this.discountCodeRepository.findOneBy({ id });
    if (!discountCode) {
      throw new RpcException(
        new NotFoundException(`Không tìm thấy mã giảm giá với ID ${id}`),
      );
    }

    if (dto.code) {
      dto.code = dto.code.trim();
    }

    if (dto.discountType) {
      if (dto.discountType === DiscountType.FIXED) {
        if (typeof dto.discountValue !== 'number' || dto.discountValue <= 0) {
          throw new RpcException(
            new BadRequestException(
              'Với giảm giá FIXED, giá trị giảm giá phải là một số dương',
            ),
          );
        }
      } else if (dto.discountType === DiscountType.PERCENTAGE) {
        if (
          typeof dto.discountValue !== 'number' ||
          dto.discountValue < 0 ||
          dto.discountValue > 100
        ) {
          throw new RpcException(
            new BadRequestException(
              'Với giảm giá PERCENTAGE, giá trị giảm giá phải nằm trong khoảng từ 0 đến 100',
            ),
          );
        }
      } else if (dto.discountType === DiscountType.NONE) {
        dto.discountValue = 0;
      }
    }

    if (dto.validFrom && dto.validUntil) {
      if (new Date(dto.validFrom) > new Date(dto.validUntil)) {
        throw new RpcException(
          new BadRequestException(
            'Ngày bắt đầu không được sau ngày kết thúc hiệu lực',
          ),
        );
      }
    }

    const updatedDiscountCode = this.discountCodeRepository.merge(
      discountCode,
      dto,
    );
    return await this.discountCodeRepository.save(updatedDiscountCode);
  }

  // Xóa mã giảm giá theo ID
  async deleteDiscountCode(id: number): Promise<{ message: string }> {
    const discountCode = await this.discountCodeRepository.findOneBy({ id });
    if (!discountCode) {
      throw new RpcException(
        new NotFoundException(`Không tìm thấy mã giảm giá với ID ${id}`),
      );
    }
    await this.discountCodeRepository.remove(discountCode);
    return { message: `Xóa mã giảm giá với ID ${id} thành công` };
  }
}
