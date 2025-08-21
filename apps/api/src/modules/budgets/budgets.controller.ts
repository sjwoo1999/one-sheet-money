import { Controller, Get, Post, Body, UsePipes } from "@nestjs/common";
import { z } from "zod";
import { BudgetsService } from "./budgets.service";
import { ZodValidationPipe } from "../../common/zod-validation.pipe";

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
  @UsePipes(new ZodValidationPipe(BudgetDto))
  async create(@Body() body: BudgetDto) {
    return this.svc.create(body);
  }

  @Get()
  async list() {
    return this.svc.list();
  }
}
