CREATE TABLE m_user_roles (
    user_id UUID NOT NULL REFERENCES m_users(id) ON DELETE CASCADE,
    role_id UUID NOT NULL REFERENCES m_roles(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);