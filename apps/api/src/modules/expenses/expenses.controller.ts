
import { Controller, Get, Post, Query, Body, UsePipes } from "@nestjs/common";
import { z } from "zod";
import { ExpensesService } from "./expenses.service";
import { ZodValidationPipe } from "../../common/zod-validation.pipe";

const ExpenseDto = z.object({
  amount: z.number().int().positive(),
  category: z.string().min(1),
  note: z.string().optional(),
  ts: z.string().optional()
});
type ExpenseDto = z.infer<typeof ExpenseDto>;

@Controller("expenses")
export class ExpensesController {
  constructor(private svc: ExpensesService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(ExpenseDto))
  async create(@Body() body: ExpenseDto) {
    return this.svc.create(body);
  }

  @Get()
  async list(@Query("from") from?: string, @Query("to") to?: string, @Query("category") category?: string) {
    return this.svc.list({ from, to, category });
  }
}
