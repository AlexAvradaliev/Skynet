export const host = 'http://localhost:8000';

export const routes = {
  LOGIN: '/api/v1/auth/login',
  REGISTER: '/api/v1/auth/register',
  SEND_OTP: '/api/v1/auth/sendOTP',
  VERIFY: '/api/v1/auth/verify',
  FORGOT_PASSWORD: '/api/v1/auth/forgot-password',
  RESET_PASSWORD: '/api/v1/auth/reset-password',
  TOKENS: '/api/v1/auth/tokens',
  AUTH_USER: '/api/v1/auth/user',
  LOGOUT: '/api/v1/auth/logout',
  GOOGLE: '/api/v1/login/google',
  FACEBOOK: '/api/v1/login/facebook',
  LINKEDIN: '/api/v1/login/linkedin'
};
