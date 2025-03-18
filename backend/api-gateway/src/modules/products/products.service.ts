import { Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';
import { CreateProductRequest } from './dto/requests/create-product-request.dto';
import { UpdateProductRequest } from './dto/requests/update-product-request.dto';
import { catchError, throwError } from 'rxjs';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class ProductsService {
    private productClient: ClientProxy;

    constructor(private readonly clientProxyFactory: ClientProxyFactoryService) {
        this.productClient = this.clientProxyFactory.createClient('productService');
    }

    getAllProducts() {
        return this.productClient.send({ cmd: 'get_all_products' }, {})
            .pipe(catchError(error => throwError(() => new RpcException(error.response))));
    }

    getProductById(id: number) {
        return this.productClient.send({ cmd: 'get_product_by_id' }, id)
            .pipe(catchError(error => throwError(() => new RpcException(error.response))));
    }

    createProduct(createProductRequest: CreateProductRequest) {
        const payload = instanceToPlain(createProductRequest); // Chuyển về object
        return this.productClient.send({ cmd: 'create_product' }, payload)
            .pipe(catchError(error => throwError(() => new RpcException(error.response))));
    }

    updateProduct(id: number, updateProductRequest: UpdateProductRequest) {
        const plainPayload = instanceToPlain(updateProductRequest);
        return this.productClient.send({ cmd: 'update_product' }, { id, updateProductRequest })
            .pipe(catchError(error => throwError(() => new RpcException(error.response))));
    }

    deleteProduct(id: number) {
        return this.productClient.send({ cmd: 'delete_product' }, id)
            .pipe(catchError(error => throwError(() => new RpcException(error.response))));
    }
}
