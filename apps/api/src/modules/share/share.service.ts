import { Injectable } from "@nestjs/common";

@Injectable()
export class ShareService {
  async shareWeekly(_body: unknown){ return { ok:true, url: "https://example.com/share/weekly/abc" }; }
}
