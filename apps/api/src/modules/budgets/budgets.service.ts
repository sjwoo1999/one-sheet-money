import { Injectable } from "@nestjs/common";

@Injectable()
export class BudgetsService {
  async create(_body: unknown){ return { ok:true }; }
  async list(){ return { items: [] }; }
}
