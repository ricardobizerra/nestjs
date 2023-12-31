import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { ZodValidationPipe } from '@/pipes/zod-validation.pipe';
import { PrismaService } from '@/prisma/prisma.service';
import { z } from 'zod';

const pageQueryParamSchema = z.string().optional().default('1').transform(Number).pipe(
	z.number().min(1)
);

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema);

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class ReadQuestionController {
	constructor(
        private prisma: PrismaService
	) {}

    @Get()
	async readQuestion(
		@Query('page', queryValidationPipe) page: PageQueryParamSchema
	) {
		const takesPerPage = 1;

		const questions = await this.prisma.question.findMany({
			take: takesPerPage,
			skip: (page - 1) * takesPerPage,
			orderBy: {
				createdAt: 'desc'
			}
		});

		return {
			questions
		};
	}
}