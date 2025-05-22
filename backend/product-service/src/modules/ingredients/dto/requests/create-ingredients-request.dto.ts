export class IngredientItemDto {
  name: string;
  concentration: string;
}

export class CreateIngredientRequest {
  product_id: number;
  ingredients: IngredientItemDto[];
}