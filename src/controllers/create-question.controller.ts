import { Controller, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserPayload } from 'src/auth/jwt.strategy';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class QuestionController {
	constructor(
        private prisma: PrismaService
	) {}

    @Post()
	async createQuestion(
        @CurrentUser() user: UserPayload 
	) {
		return user;
	}
}