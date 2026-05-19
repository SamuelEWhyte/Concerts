-- Concerts and costs tables with RLS

create table public.concerts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  artist text not null,
  venue text not null,
  concert_date date not null,
  fun_rating smallint not null check (fun_rating between 1 and 5),
  notes text,
  created_at timestamptz not null default now()
);

create table public.concert_costs (
  id uuid primary key default gen_random_uuid(),
  concert_id uuid not null references public.concerts (id) on delete cascade,
  category text not null check (category in ('ticket', 'travel', 'food', 'merch', 'other')),
  amount numeric(10, 2) not null check (amount >= 0),
  description text,
  created_at timestamptz not null default now()
);

create index concerts_user_id_idx on public.concerts (user_id);
create index concerts_concert_date_idx on public.concerts (concert_date);
create index concert_costs_concert_id_idx on public.concert_costs (concert_id);

alter table public.concerts enable row level security;
alter table public.concert_costs enable row level security;

create policy "Users can view own concerts"
  on public.concerts for select
  using (auth.uid() = user_id);

create policy "Users can insert own concerts"
  on public.concerts for insert
  with check (auth.uid() = user_id);

create policy "Users can view costs for own concerts"
  on public.concert_costs for select
  using (
    exists (
      select 1 from public.concerts
      where concerts.id = concert_costs.concert_id
        and concerts.user_id = auth.uid()
    )
  );

create policy "Users can insert costs for own concerts"
  on public.concert_costs for insert
  with check (
    exists (
      select 1 from public.concerts
      where concerts.id = concert_costs.concert_id
        and concerts.user_id = auth.uid()
    )
  );
