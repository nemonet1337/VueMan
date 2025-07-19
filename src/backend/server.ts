import Fastify from 'fastify';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import positionsRoutes from './routes/positions.routes';
import officeRoutes from './routes/offices.routes';
import userRoutes from './routes/users.routes';
import userRolesRoutes from './routes/userRoles.routes';
import roleRoutes from './routes/roles.routes';
import departmentsRoutes from './routes/departments.routes';
import attendanceRecordsRoutes from './routes/attendance_records.routes';
import attendanceSummariesRoutes from './routes/attendance_summaries.routes';
import dbPlugin from './plugins/db';
import jwtPlugin from './utils/jwt';
import employeeRoutes from './routes/employees.routes';
import workPatternRoutes from './routes/work_patterns.routes';

dotenv.config();

const server = Fastify();

server.decorateRequest('user', null);

server.register(dbPlugin);
server.register(jwtPlugin);

// すべてのルートを登録
server.register(authRoutes);
server.register(positionsRoutes);
server.register(officeRoutes);
server.register(userRoutes);
server.register(roleRoutes);
server.register(departmentsRoutes);
server.register(employeeRoutes); // 従業員マスタ
server.register(userRoutes);     // ユーザーマスタ
server.register(workPatternRoutes);
server.register(userRolesRoutes); // ユーザーロール
server.register(attendanceRecordsRoutes);
server.register(attendanceSummariesRoutes);

const start = async () => {
  try {
    const port = parseInt(process.env.PORT || '3000', 10);
    await server.listen({ port, host: '0.0.0.0' });
    console.log(`Server running on port ${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
