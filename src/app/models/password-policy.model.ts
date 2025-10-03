
export interface PasswordPolicyModel{
  requireUppercase: number;
  requireLowercase: number;
  requireDigit: number;
  requireSpecialChar: number;
  passwordExpiryDays: number;
  passwordHistoryCount: number;
}