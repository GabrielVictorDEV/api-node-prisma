import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { CreateMovieRentDTO } from "../../dtos/CreateMovieRentDTO";

export class CreateMovieRentUseCase{
    async execute ({movieId, userId}: CreateMovieRentDTO): Promise<void>{
        //filme existe?
        const movieExist = await prisma.movie.findUnique({
            where:{
                id:movieId
            }
        });
        
        if (!movieExist){
            throw new AppError("Movie does exist!")
        };

        //filme está alugado?
        const movieAlreadyRented = await prisma.movieRent.findFirst({
            where:{
                movieId
            }
        });

        if (movieAlreadyRented){
            throw new AppError("Movie already rented!")
        };

        //usuario existe?
        const userExist = await prisma.user.findUnique({
            where:{
                id:userId
            }
        });

        if (!userExist){
            throw new AppError("User does not exist!")
        };
        
        //criar locação. 
        prisma.movieRent.create({
            data:{
                movieId,
                userId
           } 
        })
    }
}