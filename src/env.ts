import { z } from 'zod';

export const envSchema = z.object({
	POSTGRES_USER: z.coerce.string(),
	POSTGRES_PASSWORD: z.coerce.string(),
	POSTGRES_DB: z.coerce.string(),
	PGDATA: z.coerce.string(),
	DATABASE_URL: z.string().url(),
	PORT: z.coerce.number().optional().default(3333),
	JWT_PRIVATE_KEY: z.string(),
	JWT_PUBLIC_KEY: z.string(),
});

export type Env = z.infer<typeof envSchema>;