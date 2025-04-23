import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entities/category.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CategoryService } from '../interfaces/categories.service.interface';
import { CreateCategoryRequest } from '../dto/requests/create-category-request.dto';
import { UpdateCategoryRequest } from '../dto/requests/update-category-request.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class CategoriesService implements CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryRequest: CreateCategoryRequest): Promise<Category> {
    const { parent_id, slug, ...data } = createCategoryRequest;
  
    // ✅ Kiểm tra slug đã tồn tại chưa
    const existing = await this.categoryRepository.findOne({ where: { slug } });
    if (existing) {
      throw new RpcException(new NotFoundException(`Slug '${slug}' đã tồn tại`));
    }
  
    let parent: Category = null;
    if (parent_id) {
      parent = await this.categoryRepository.findOne({ where: { category_id: parent_id } });
      if (!parent) {
        throw new RpcException(new NotFoundException(`Parent category ${parent_id} không tồn tại`));
      }
    }
  
    const newCategory = this.categoryRepository.create({ ...data, slug, parent });
    return await this.categoryRepository.save(newCategory);
  }
  

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find({ relations: ['parent', 'children'] });
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { category_id: id },
      relations: ['parent', 'children'],
    });
    if (!category) {
      throw new RpcException(new NotFoundException(`Category ${id} không tìm thấy`));
    }
    return category;
  }

  async update(id: number, updateCategoryRequest: UpdateCategoryRequest): Promise<Category> {
    const category = await this.findOne(id);
  
    const { parent_id, slug, ...rest } = updateCategoryRequest;
  
    // ✅ Nếu có slug mới và khác slug hiện tại → kiểm tra trùng
    if (slug && slug !== category.slug) {
      const existing = await this.categoryRepository.findOne({ where: { slug } });
      if (existing && existing.category_id !== id) {
        throw new RpcException(new NotFoundException(`Slug '${slug}' đã tồn tại`));
      }
      category.slug = slug; // gán slug mới nếu hợp lệ
    }
  
    if (parent_id) {
      const parent = await this.categoryRepository.findOne({
        where: { category_id: parent_id },
      });
      if (!parent) {
        throw new RpcException(new NotFoundException(`Parent category không tồn tại`));
      }
      category.parent = parent;
    }
  
    Object.assign(category, rest);
  
    await this.categoryRepository.save(category);
  
    return this.findOne(id); // return lại với các quan hệ
  }
  

  async remove(id: number): Promise<DeleteResult> {
    await this.findOne(id);
    return await this.categoryRepository.delete({ category_id: id });
  }
}
