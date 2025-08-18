
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz default now()
);

create table if not exists expenses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  amount int not null check (amount > 0),
  category text not null,
  note text,
  ts timestamptz not null default now()
);
create index if not exists idx_expenses_user_ts on expenses(user_id, ts);

create table if not exists budgets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  month date not null,
  category text not null,
  limit int not null check (limit >= 0)
);
create index if not exists idx_budgets_user_month_cat on budgets(user_id, month, category);

create table if not exists weekly_reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  week_start date not null,
  total int not null default 0,
  top_categories jsonb not null default '[]',
  overspend boolean not null default false,
  advice text,
  image_url text
);

create table if not exists recent_categories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  category text not null,
  last_used timestamptz not null default now()
);

-- RLS (owner only)
alter table expenses enable row level security;
alter table budgets enable row level security;
alter table weekly_reports enable row level security;
alter table recent_categories enable row level security;

create policy expenses_owner on expenses for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy budgets_owner on budgets for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy weekly_reports_owner on weekly_reports for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy recent_categories_owner on recent_categories for all using (user_id = auth.uid()) with check (user_id = auth.uid());
