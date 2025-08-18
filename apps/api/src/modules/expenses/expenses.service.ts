import { Injectable } from "@nestjs/common";

@Injectable()
export class ExpensesService {
  async create(body: any){ /* TODO: insert into Postgres */ return { ok:true }; }
  async list(filters: any){ return { items: [], total: 0 }; }
}
