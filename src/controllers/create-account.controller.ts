import { Body, ConflictException, Controller, HttpCode, Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('/accounts')
export class CreateAccountController {
	constructor(private prisma: PrismaService) {}

    @Post()
    @HttpCode(201)
	async create(
        @Body() body: any
	) {
		const { name, email, password } = body;

		const userWithSameEmail = await this.prisma.user.findUnique({
			where: {
				email
			}
		});

		if (userWithSameEmail) {
			throw new ConflictException('Email already exists');
		}
        
		await this.prisma.user.create({
			data: {
				name,
				email,
				password
			}
		});
	}
}