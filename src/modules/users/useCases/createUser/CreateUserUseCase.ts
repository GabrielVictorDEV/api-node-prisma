import { User } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { CreateUserDTO } from "../../dtos/createUserDTO";
import { AppError } from "../../../../errors/AppError";

export class CreateUserUseCase {
    async execute({name, email}: CreateUserDTO): Promise<User> {
        // Verifica se o usuário já existe;
        const userAlreadyExists = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (userAlreadyExists){
            throw new AppError("User already exist!")
        }

        // Cria Usuario; 
        const user = await prisma.user.create({
            data: {
                name, 
                email
            }
        })

        return user;
    }
}