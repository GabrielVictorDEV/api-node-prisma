import { Movie } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { AppError } from "../../../../errors/AppError";
import { createMovieDTO } from "../../dtos/createMovieDTO";

export class CreateMovieUseCase {
    async execute({title, duration, release_date}: createMovieDTO): Promise<Movie> {
        // Verifica se o filme já existe;
        const movieAlreadyExists = await prisma.movie.findUnique({
            where: {
                title,
            }
        })

        if (movieAlreadyExists){
            throw new AppError("Movie already exist!")
        }

        // Cria Filme; 
        const movie = await prisma.movie.create({
            data: {
                title, 
                duration,
                release_date
            }
        })

        return movie;
    }
}