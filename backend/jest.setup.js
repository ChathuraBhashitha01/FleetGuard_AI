// process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret-key-for-jest';

jest.mock('./src/services/email.service', () => ({
  sendPasswordReset: jest.fn().mockResolvedValue(undefined),
}));
