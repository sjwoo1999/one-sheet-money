import { Injectable } from "@nestjs/common";

@Injectable()
export class BudgetsService {
  async create(body: any){ return { ok:true }; }
  async list(){ return { items: [] }; }
}
