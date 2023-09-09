import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ZodSchema, ZodError } from 'zod';

export class ZodValidationPipe implements PipeTransform{
	constructor(private schema: ZodSchema) {}

	transform(value: unknown) {
		try {
			this.schema.parse(value);
		} catch (error) {
			if (error instanceof ZodError) throw new BadRequestException({
				errors: error.errors.map((error) => error.message),
				message: 'Validation failed',
				statusCode: 400,
			});

			throw new BadRequestException('Validation failed');
		}
        
		return value;
	}
}