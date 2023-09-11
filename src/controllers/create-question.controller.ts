import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserPayload } from 'src/auth/jwt.strategy';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { PrismaService } from 'src/prisma/prisma.service';
import { z } from 'zod';

const createQuestionBodySchema = z.object({
	title: z.string(),
	content: z.string()
});

const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema);

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class QuestionController {
	constructor(
        private prisma: PrismaService
	) {}

	private convertToSlug(title: string): string {
		const normalizedString = title
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '');
      
		const slug = normalizedString
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/(^-|-$)+/g, '');
      
		return slug;
	}

    @Post()
	async createQuestion(
        @Body(bodyValidationPipe) body: CreateQuestionBodySchema,
        @CurrentUser() user: UserPayload 
	) {
		const {
			title,
			content
		} = body;

		const userId = user.sub;

		const slugTitle = this.convertToSlug(title);
		const slugDate = Date.now();

		const slug = `${slugDate}-${userId}-${slugTitle}`;

		await this.prisma.question.create({
			data: {
				authorId: userId,
				title,
				content,
				slug,
			}
		});

		return {
			question_slug: slug
		};
	}
}