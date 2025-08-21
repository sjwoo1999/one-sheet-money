import { Controller, Post, Body, UsePipes } from "@nestjs/common";
import { z } from "zod";
import { ShareService } from "./share.service";
import { ZodValidationPipe } from "../../common/zod-validation.pipe";

const ShareWeeklyDto = z.object({ report_id: z.string().uuid() });
type ShareWeeklyDto = z.infer<typeof ShareWeeklyDto>;

@Controller("share")
export class ShareController {
  constructor(private svc: ShareService) {}

  @Post("/weekly")
  @UsePipes(new ZodValidationPipe(ShareWeeklyDto))
  async shareWeekly(@Body() body: ShareWeeklyDto) {
    return this.svc.shareWeekly(body);
  }
}
