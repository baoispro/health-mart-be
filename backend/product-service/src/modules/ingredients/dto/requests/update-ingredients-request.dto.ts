export class UpdateIngredientItemDto {
  name?: string;
  concentration?: string;
}

export class UpdateIngredientRequest {
  product_id: number;
  ingredients: UpdateIngredientItemDto[];
}