// src/modules/reviews/dto/requests/update-review-request.dto.ts
export class UpdateReviewRequest {
  rating?: number;
  comment?: string;
  isHidden?: boolean;
}
