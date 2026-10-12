-- One row per vendor checkout attempt. Tables count against a show while
-- status = 'paid', or while status = 'pending' and the checkout hold hasn't expired.
CREATE TABLE registrations (
  id                    TEXT PRIMARY KEY,
  show_date             TEXT NOT NULL,          -- YYYY-MM-DD
  name                  TEXT NOT NULL,
  business              TEXT,
  email                 TEXT NOT NULL,
  phone                 TEXT NOT NULL,
  sells                 TEXT NOT NULL,          -- tcg | sports | both | other
  sells_other           TEXT,
  tables                INTEGER NOT NULL CHECK (tables BETWEEN 1 AND 4),
  amount_cents          INTEGER NOT NULL,
  status                TEXT NOT NULL CHECK (status IN ('pending', 'paid', 'expired', 'cancelled')),
  stripe_session_id     TEXT UNIQUE,
  stripe_payment_intent TEXT,
  receipt_number        TEXT UNIQUE,
  created_at            TEXT NOT NULL,
  expires_at            TEXT NOT NULL,
  paid_at               TEXT
);

CREATE INDEX registrations_show_status ON registrations (show_date, status, expires_at);
