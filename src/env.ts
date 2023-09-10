import { z } from 'zod';

export const envSchema = z.object({
	POSTGRES_USER: z.coerce.string(),
	POSTGRES_PASSWORD: z.coerce.string(),
	POSTGRES_DB: z.coerce.string(),
	PGDATA: z.coerce.string(),
	DATABASE_URL: z.string().url(),
	PORT: z.coerce.number().optional().default(3333)
});

export type Env = z.infer<typeof envSchema>;