import React ,{useState,useEffect} from 'react'
import {Box,CircularProgress,useMediaQuery,Typography, Grid} from '@mui/material';
import {useSelector} from 'react-redux'
import {useGetMoviesQuery} from '../../services/TMDB'
import MovieList from '../MovieList/MovieList';
import {selectGenreOrCategory} from '../../fetures/currentGenreOrCategory'
import {PaginationRounded} from '../Pagination/Pageination'
import useSyles from './styles'
import FeaturedMovie from '../FeaturedMovie/FeaturedMovie';

function Movies() {
  const [page,setPage]=useState();
  const {genreIdOrCategoryName,searchQuery} = useSelector((state)=> state.currentGenreOrCategory)
  const {data,error,isFetching} =useGetMoviesQuery({genreIdOrCategoryName,page,searchQuery});
  const classes = useSyles();
  const lg = useMediaQuery((theme) => theme.breakpoints.only('lg'));
  const numberOfMovies = lg ? 17 : 19;
  console.log(data)
  if(isFetching){
    return(
      <Box display="flex" justifyContent='center'>
        <CircularProgress size="4rem"/>
      </Box>
    )
  }
  if(!data.results.length){
    return(
      <Box display="flex" alignItems='center' mt="20px">
        <Typography variant='h4'>
          No movies that match that name
          <br/>
          Please search for something else
        </Typography>
      </Box>
    )
  }
  if(error) return 'an error has occured'
  return (
    <div>
    <FeaturedMovie movie={data.results[0]}/>
    <MovieList movies={data} numberOfMovies={numberOfMovies}  excludeFirst/>
    <Grid className={classes.pages}>
        <PaginationRounded page={page} setPage={setPage} totelPages={data.total_pages}/>
    </Grid>

    </div>
  )
}

export default Movies