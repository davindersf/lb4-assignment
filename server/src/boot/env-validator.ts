import {z} from 'zod';

const stringNumberSchema = z.string().transform((val, ctx) => {
  const parsed = parseFloat(val);
  if (isNaN(parsed)) {
    throw new Error(`${ctx.path}: Invalid number`);
  }
  return parsed;
});

const envSchema = z.object({
  DB_HOST: z.string(),
  DB_PORT: stringNumberSchema,
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_DATABASE: z.string(),
});

export async function runEnvValidator() {
  const envVars = process.env;
  try {
    await envSchema.parseAsync(envVars);
  } catch (error) {
    console.error('Environment variables validation failed');
    if (error instanceof z.ZodError) {
      throw new Error(JSON.stringify(error.format(), null, 2));
    }
    throw error;
  }
}
