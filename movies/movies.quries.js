import client from '../client'

export default  {
    Query:{ 
        movies: ()=>client.movie.findMany(),  // 전체 Select 
        movie:(_,{id})=>client.movie.findUnique({where:{id}}),
    }
}