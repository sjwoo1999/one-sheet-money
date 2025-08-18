import { Injectable } from "@nestjs/common";

@Injectable()
export class ReportsService {
  async generateWeekly(_body: any){ return { ok:true }; }
  async getWeekly(){ return { items: [] }; }
}
