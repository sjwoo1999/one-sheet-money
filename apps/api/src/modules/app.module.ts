import { Module } from "@nestjs/common";
import { ExpensesModule } from "./expenses/expenses.module";
import { BudgetsModule } from "./budgets/budgets.module";
import { ReportsModule } from "./reports/reports.module";
import { ShareModule } from "./share/share.module";

@Module({ imports: [ExpensesModule, BudgetsModule, ReportsModule, ShareModule] })
export class AppModule {}
