CREATE TABLE IF NOT EXISTS t_shift_assignments (
  id SERIAL PRIMARY KEY,
  employee_id INT NOT NULL REFERENCES m_employees(id),
  office_id INT NOT NULL REFERENCES m_offices(id),
  work_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  break_minutes INT DEFAULT 0,
  remarks TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  UNIQUE(employee_id, work_date)
);
