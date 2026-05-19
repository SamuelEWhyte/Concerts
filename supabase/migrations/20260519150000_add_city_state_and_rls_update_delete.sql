-- City/state for map and state badges; optional duration for Night Owl badge
alter table public.concerts
  add column if not exists city text,
  add column if not exists state text,
  add column if not exists duration_hours numeric(4, 1) check (duration_hours is null or duration_hours >= 0);

create index if not exists concerts_state_idx on public.concerts (state);

create policy "Users can update own concerts"
  on public.concerts for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own concerts"
  on public.concerts for delete
  using (auth.uid() = user_id);

create policy "Users can update costs for own concerts"
  on public.concert_costs for update
  using (
    exists (
      select 1 from public.concerts
      where concerts.id = concert_costs.concert_id
        and concerts.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.concerts
      where concerts.id = concert_costs.concert_id
        and concerts.user_id = auth.uid()
    )
  );

create policy "Users can delete costs for own concerts"
  on public.concert_costs for delete
  using (
    exists (
      select 1 from public.concerts
      where concerts.id = concert_costs.concert_id
        and concerts.user_id = auth.uid()
    )
  );
