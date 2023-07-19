import { Body, Controller, Get, HttpStatus, Post, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { IResponseToClient } from "src/configs/response-to-client.config";
import { OrderService } from "src/modules/order/order.service";
import { CreateOrderDto } from "src/modules/order/dto/create-order.dto";
import { OrderMessageSuccess } from "src/modules/order/order.const";
import { Public } from "src/modules/authentication/auth.const";
import { ListOrderDto } from "src/modules/order/dto/list-order.dto";

@Controller("order")
@ApiBearerAuth()
@ApiTags("Order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @Public()
  @ApiOperation({
    summary: "Api to create limit order",
  })
  public async createOrder(
    @Body() createOrderDto: CreateOrderDto
  ): Promise<IResponseToClient> {
    const data = await this.orderService.createOrder(createOrderDto);
    return {
      message: OrderMessageSuccess.OrderCreated,
      data,
      statusCode: HttpStatus.CREATED,
    };
  }

  @Get()
  @Public()
  @ApiOperation({
    summary: "Api to list order",
  })
  public async listOrder(
    @Query() listOrderDto: ListOrderDto
  ): Promise<IResponseToClient> {
    const data = await this.orderService.listOrder(listOrderDto);
    return {
      message: OrderMessageSuccess.ListOrderSuccess,
      data,
      statusCode: HttpStatus.OK,
    };
  }
}
