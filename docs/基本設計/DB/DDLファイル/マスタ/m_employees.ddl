CREATE TABLE m_employees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES m_users(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    office_id UUID REFERENCES m_offices(id),
    position_id UUID REFERENCES m_positions(id),
    work_pattern_id UUID REFERENCES m_work_patterns(id),
    status TEXT NOT NULL DEFAULT 'active',
    hired_at DATE DEFAULT CURRENT_DATE
);