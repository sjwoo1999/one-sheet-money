import { Controller, Post, Body } from "@nestjs/common";
import { z } from "zod";
import { ShareService } from "./share.service";

const ShareWeeklyDto = z.object({ report_id: z.string().uuid() });
type ShareWeeklyDto = z.infer<typeof ShareWeeklyDto>;

@Controller("share")
export class ShareController {
  constructor(private svc: ShareService) {}

  @Post("/weekly")
  async shareWeekly(@Body() body: ShareWeeklyDto) {
    ShareWeeklyDto.parse(body);
    return this.svc.shareWeekly(body);
  }
}
