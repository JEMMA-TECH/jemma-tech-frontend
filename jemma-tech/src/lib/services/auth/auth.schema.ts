import {z} from 'zod';

const commonPasswords = ["password", "123456", "qwerty", "letmein"];;

export const AuthSchema = z.object({
    email: z.string().email('Enter a valid email'),
    password:z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .max(20, 'Password must be at most 20 characters long')
    .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        'Password must include uppercase, lowercase, number and special character'
    )
    .refine(pwd => !/^\d+$/.test(pwd), {
      message: "Password cannot be entirely numeric"
    })
    .refine(pwd => !commonPasswords.includes(pwd.toLowerCase()), {
      message: "Password is too common"
    }),
    confirm_password: z.string()
}).refine(data => data.password === data.confirm_password, {
  message: "Passwords do not match", 
  path: ["confirm_password"]
});

export const ForgotPasswordSchema = z.object({
    email: z.string().email('Enter a valid email')
}).refine(data => data.email !== '', {
  message: "Email is required"
});
