
-- 勤怠打刻レコードテーブル
CREATE TABLE t_attendance_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID NOT NULL REFERENCES m_employees(id),
    office_id UUID NOT NULL REFERENCES m_offices(id),
    type VARCHAR(20) NOT NULL, -- clock_in, clock_out, break_start, break_end
    timestamp TIMESTAMP NOT NULL,
    gps_lat DECIMAL(9,6),
    gps_lng DECIMAL(9,6),
    ip_address INET,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 勤怠集計キャッシュテーブル（日次・月次）
CREATE TABLE t_attendance_summaries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID NOT NULL REFERENCES m_employees(id),
    office_id UUID NOT NULL REFERENCES m_offices(id),
    summary_type VARCHAR(10) NOT NULL, -- daily, monthly
    target_date DATE NOT NULL,
    work_minutes INTEGER NOT NULL,
    break_minutes INTEGER NOT NULL,
    late_flag BOOLEAN DEFAULT FALSE,
    early_leave_flag BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- シフト割当テーブル
CREATE TABLE t_shift_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID NOT NULL REFERENCES m_employees(id),
    office_id UUID NOT NULL REFERENCES m_offices(id),
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ログイン履歴テーブル（監査ログ）
CREATE TABLE t_login_histories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES m_users(id),
    login_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address INET,
    user_agent TEXT
);

-- APIアクセスログテーブル
CREATE TABLE t_api_access_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES m_users(id),
    endpoint TEXT NOT NULL,
    method VARCHAR(10) NOT NULL,
    status_code INTEGER NOT NULL,
    request_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    response_time_ms INTEGER,
    ip_address INET,
    user_agent TEXT
);
