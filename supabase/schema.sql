-- Create a table for public profiles
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  website text,
  phone text,
  whatsapp text,
  is_verified boolean default false,
  role text check (role in ('owner', 'renter', 'admin')) default 'renter',

  constraint username_length check (char_length(username) >= 3)
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check ((select auth.uid()) = id);

create policy "Users can update own profile." on profiles
  for update using ((select auth.uid()) = id);

-- Create a table for properties
create table properties (
  id uuid default gen_random_uuid() primary key,
  owner_id uuid references profiles(id) on delete cascade not null,
  title text not null,
  description text,
  price numeric not null,
  type text check (type in ('rent', 'sell')) not null,
  location text not null,
  bedrooms integer,
  bathrooms integer,
  area numeric,
  parking integer,
  property_type text,
  year_built integer,
  available_from date,
  furnished text,
  images text[],
  amenities jsonb,
  id_document text,
  ownership_document text,
  emirate text,
  community text,
  status text default 'pending' check (status in ('pending', 'published', 'rejected')),
  is_published boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up RLS for properties
alter table properties enable row level security;

create policy "Properties are viewable by everyone." on properties
  for select using (true);

create policy "Owners can insert their own properties." on properties
  for insert with check ((select auth.uid()) = owner_id);

create policy "Owners can update their own properties." on properties
  for update using ((select auth.uid()) = owner_id);

create policy "Owners can delete their own properties." on properties
  for delete using ((select auth.uid()) = owner_id);

-- Admin policies for profiles
create policy "Admins can view all profiles." on profiles
  for select using (
    (select role from profiles where id = auth.uid()) = 'admin'
  );

create policy "Admins can update any profile." on profiles
  for update using (
    (select role from profiles where id = auth.uid()) = 'admin'
  );

-- Admin policies for properties
create policy "Admins can view all properties." on properties
  for select using (
    (select role from profiles where id = auth.uid()) = 'admin'
  );

create policy "Admins can update any property." on properties
  for update using (
    (select role from profiles where id = auth.uid()) = 'admin'
  );

create policy "Admins can delete any property." on properties
  for delete using (
    (select role from profiles where id = auth.uid()) = 'admin'
  );

-- Set up Storage for Property Images
insert into storage.buckets (id, name)
values ('property-images', 'property-images');

create policy "Property images are publicly accessible." on storage.objects
  for select using (bucket_id = 'property-images');

create policy "Owners can upload property images." on storage.objects
  for insert with check (
    bucket_id = 'property-images' and
    (select auth.uid()) = (storage.foldername(name))[1]::uuid
  );

-- Set up Storage for Avatars
insert into storage.buckets (id, name)
values ('avatars', 'avatars');

create policy "Avatars are publicly accessible." on storage.objects
  for select using (bucket_id = 'avatars');

create policy "Users can upload avatars." on storage.objects
  for insert with check (
    bucket_id = 'avatars' and
    (select auth.uid()) = (storage.foldername(name))[1]::uuid
  );

-- Set up Storage for Property Documents
insert into storage.buckets (id, name)
values ('property-documents', 'property-documents')
on conflict do nothing;

create policy "Property documents are accessible by owner." on storage.objects
  for select using (
    bucket_id = 'property-documents' and
    (select auth.uid()) = (storage.foldername(name))[1]::uuid
  );

create policy "Owners can upload property documents." on storage.objects
  for insert with check (
    bucket_id = 'property-documents' and
    (select auth.uid()) = (storage.foldername(name))[1]::uuid
  );
