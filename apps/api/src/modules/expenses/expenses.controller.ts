
import { Controller, Get, Post, Query, Body } from "@nestjs/common";
import { z } from "zod";
import { ExpensesService } from "./expenses.service";

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
  async create(@Body() body: ExpenseDto) {
    ExpenseDto.parse(body);
    return this.svc.create(body);
  }

  @Get()
  async list(@Query("from") from?: string, @Query("to") to?: string, @Query("category") category?: string) {
    return this.svc.list({ from, to, category });
  }
}
