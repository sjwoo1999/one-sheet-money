import { Controller, Get, Post, Body } from "@nestjs/common";
import { z } from "zod";
import { ReportsService } from "./reports.service";

const WeeklyGenerateDto = z.object({ week_start: z.string() });
type WeeklyGenerateDto = z.infer<typeof WeeklyGenerateDto>;

@Controller("reports")
export class ReportsController {
  constructor(private svc: ReportsService) {}

  @Post("/weekly:generate")
  async generateWeekly(@Body() body: WeeklyGenerateDto) {
    WeeklyGenerateDto.parse(body);
    return this.svc.generateWeekly(body);
  }

  @Get("/weekly")
  async getWeekly() {
    return this.svc.getWeekly();
  }
}
