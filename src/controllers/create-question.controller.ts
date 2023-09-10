import { Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class QuestionController {
	constructor(
        private prisma: PrismaService
	) {}

    @Post()
	async createQuestion(
        
	) {
		return 'oi';
	}
}