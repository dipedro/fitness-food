SELECT 'CREATE DATABASE fitness-food' 
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'fitness-food')\gexec

\c fitness-food

CREATE TYPE product_status AS ENUM ('draft', 'trash', 'published');

CREATE TABLE IF NOT EXISTS public.products (
	id SERIAL PRIMARY KEY,
	code BIGINT NOT NULL,
    status product_status NOT NULL,
    imported_t TIMESTAMP WITH TIME ZONE NOT NULL,
    url TEXT,
    creator VARCHAR(100),
    created_t BIGINT,
    last_modified_t BIGINT,
    product_name VARCHAR(255),
    quantity VARCHAR(100),
    brands VARCHAR(255),
    categories TEXT,
    labels TEXT,
    cities TEXT,
    purchase_places VARCHAR(255),
    stores VARCHAR(255),
    ingredients_text TEXT,
    traces TEXT,
    serving_size VARCHAR(100),
    serving_quantity DECIMAL(10, 2),
    nutriscore_score INT,
    nutriscore_grade VARCHAR(10),
    main_category VARCHAR(100),
    image_url TEXT
);

CREATE UNIQUE INDEX idx_products_code_unique ON products (code);

CREATE TABLE IF NOT EXISTS public.products_preloads (
    id SERIAL PRIMARY KEY,
    product_data JSONB NOT NULL
);