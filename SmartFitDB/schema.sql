CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  profile_picture TEXT
);

CREATE TABLE IF NOT EXISTS wardrobe_items (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100),
  category VARCHAR(50),
  color VARCHAR(30),
  image_url TEXT
);

CREATE TABLE IF NOT EXISTS wishlist_items (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100),
  store_url TEXT,
  image_url TEXT
);

CREATE TABLE IF NOT EXISTS outfits (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  points INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS outfit_items (
  outfit_id INT REFERENCES outfits(id) ON DELETE CASCADE,
  wardrobe_item_id INT REFERENCES wardrobe_items(id) ON DELETE CASCADE,
  PRIMARY KEY (outfit_id, wardrobe_item_id)
);
