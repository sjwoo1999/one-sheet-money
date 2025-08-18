import { Controller, Get, Post, Body } from "@nestjs/common";
import { z } from "zod";
import { BudgetsService } from "./budgets.service";

const BudgetDto = z.object({
  month: z.string(),
  category: z.string().min(1),
  limit: z.number().int().nonnegative()
});
type BudgetDto = z.infer<typeof BudgetDto>;

@Controller("budgets")
export class BudgetsController {
  constructor(private svc: BudgetsService) {}

  @Post()
  async create(@Body() body: BudgetDto) {
    BudgetDto.parse(body);
    return this.svc.create(body);
  }

  @Get()
  async list() {
    return this.svc.list();
  }
}
