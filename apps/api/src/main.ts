import "dotenv/config";
import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app.module";
import express from "express";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: "*" });
  app.use(express.json({ limit: "1mb" }));
  const port = Number(process.env.PORT || 4000);
  await app.listen(port);
  console.log(`API on :${port}`);
}
bootstrap();
