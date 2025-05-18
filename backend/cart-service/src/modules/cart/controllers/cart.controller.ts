import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CartService } from '../services/cart.service';
import { CartItemDto } from '../dto/cart-item.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post(':userId/sync')
  syncCart(@Param('userId') userId: string, @Body() items: CartItemDto[]) {
    return this.cartService.overwriteCart(userId, items);
  }

  @Post(':userId')
  addToCart(@Param('userId') userId: string, @Body() item: CartItemDto) {
    return this.cartService.addItemToCart(userId, item);
  }

  @Get(':userId')
  getCart(@Param('userId') userId: string) {
    return this.cartService.getCart(userId);
  }

  @Delete(':userId/:productId')
  removeFromCart(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
  ) {
    return this.cartService.removeItemFromCart(userId, productId);
  }
}
