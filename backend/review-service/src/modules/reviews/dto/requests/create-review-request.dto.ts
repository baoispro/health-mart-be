// dto/requests/create-review-request.dto.ts
export class CreateReviewRequest {
  productId: number;
  userId: number;
  rating: number;
  comment?: string;
  isHidden?: boolean = false;
}
