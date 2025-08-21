import { Controller, Get, Post, Body, UsePipes, Query } from "@nestjs/common";
import { z } from "zod";
import { ReportsService } from "./reports.service";
import { ZodValidationPipe } from "../../common/zod-validation.pipe";

const WeeklyGenerateDto = z.object({ week_start: z.string() });
type WeeklyGenerateDto = z.infer<typeof WeeklyGenerateDto>;

@Controller("reports")
export class ReportsController {
  constructor(private svc: ReportsService) {}

  @Post("/weekly:generate")
  @UsePipes(new ZodValidationPipe(WeeklyGenerateDto))
  async generateWeekly(@Body() body: WeeklyGenerateDto) {
    return this.svc.generateWeekly(body);
  }

  @Get("/weekly")
  async getWeekly(@Query("from") from?: string, @Query("to") to?: string) {
    return this.svc.getWeekly({ from, to });
  }
}
