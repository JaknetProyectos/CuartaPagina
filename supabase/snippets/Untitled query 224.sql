-- Habilitar la extensión para uuid_generate_v4() si no está activa
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- COTIZACIONES VIVATRIP
CREATE TABLE public.cotizaciones_vivatrip (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  nombre text NOT NULL,
  price double precision,
  email text NOT NULL,
  telefono text NOT NULL,
  personas text NOT NULL,
  experiencia_slug text,
  detalles text,
  estado text DEFAULT 'pendiente'::text,
  experiencia_title text,
  folio text,
  CONSTRAINT cotizaciones_vivatrip_pkey PRIMARY KEY (id)
);

-- COTIZACIONES WONDERMX (Se eliminó columna duplicada experiencia_title)
CREATE TABLE public.cotizaciones_wondermx (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  nombre text NOT NULL,
  price double precision,
  email text NOT NULL,
  telefono text NOT NULL,
  personas text NOT NULL,
  experiencia_slug text NOT NULL,
  detalles text,
  estado text DEFAULT 'pendiente'::text,
  experience_title text,
  folio text,
  CONSTRAINT cotizaciones_wondermx_pkey PRIMARY KEY (id)
);

-- DESTINATIONS VIVATRIP
CREATE TABLE public.destinations_vivatrip (
  id text NOT NULL,
  slug text UNIQUE,
  name text,
  short_description text,
  description text,
  hero_image text,
  card_image text,
  highlights text[], -- Corregido: ARRAY -> text[]
  bg_color text,
  CONSTRAINT destinations_vivatrip_pkey PRIMARY KEY (id)
);

-- DESTINATIONS WONDERMX
CREATE TABLE public.destinations_wondermx (
  id text NOT NULL,
  slug text UNIQUE,
  name text,
  short_description text,
  description text,
  hero_image text,
  card_image text,
  highlights text[], -- Corregido: ARRAY -> text[]
  bg_color text,
  CONSTRAINT destinations_wondermx_pkey PRIMARY KEY (id)
);

-- EXPERIENCES VIVATRIP
CREATE TABLE public.experiences_vivatrip (
  id text NOT NULL,
  destination_slug text,
  destination_name text,
  title text,
  description text,
  duration text,
  price numeric,
  price_formatted text,
  image text,
  category text,
  rating numeric,
  review_count integer,
  images text[], -- Corregido: ARRAY -> text[]
  CONSTRAINT experiences_vivatrip_pkey PRIMARY KEY (id)
);

-- EXPERIENCES WONDERMX
CREATE TABLE public.experiences_wondermx (
  id text NOT NULL,
  destination_slug text,
  destination_name text,
  title text,
  description text,
  duration text,
  price numeric,
  price_formatted text,
  image text,
  category text,
  rating numeric,
  review_count integer,
  images text[], -- Corregido: ARRAY -> text[]
  caracteristicas_servicio text[], -- Corregido: ARRAY -> text[]
  itinerario text,
  incluido text[], -- Corregido: ARRAY -> text[]
  no_incluido text[], -- Corregido: ARRAY -> text[]
  accesibilidad text[], -- Corregido: ARRAY -> text[]
  reservaciones_antelacion text,
  CONSTRAINT experiences_wondermx_pkey PRIMARY KEY (id)
);

-- RESERVATIONS VIVATRIP
CREATE TABLE public.reservations_vivatrip (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  activity_title text NOT NULL,
  destination_name text NOT NULL,
  fecha date NOT NULL,
  personas integer NOT NULL,
  nombre text NOT NULL,
  email text NOT NULL,
  telefono text NOT NULL,
  price text NOT NULL,
  comentarios text,
  status text DEFAULT 'pending'::text CHECK (status = ANY (ARRAY['pending'::text, 'confirmed'::text, 'completed'::text, 'cancelled'::text])),
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT reservations_vivatrip_pkey PRIMARY KEY (id)
);

-- RESERVATIONS WONDERMX
CREATE TABLE public.reservations_wondermx (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  activity_title text NOT NULL,
  destination_name text NOT NULL,
  fecha date NOT NULL,
  personas integer NOT NULL,
  nombre text NOT NULL,
  email text NOT NULL,
  telefono text NOT NULL,
  price text NOT NULL,
  comentarios text,
  status text DEFAULT 'pending'::text CHECK (status = ANY (ARRAY['pending'::text, 'confirmed'::text, 'completed'::text, 'cancelled'::text])),
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT reservations_wondermx_pkey PRIMARY KEY (id)
);