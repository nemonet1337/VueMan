CREATE TABLE m_offices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    address TEXT,
    open_time TIME,
    close_time TIME
);