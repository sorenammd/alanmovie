import React from 'react';
import {Grid, useMediaQuery} from '@mui/material';
import useSyles from './styles'
import { Movie } from '..';
function MovieList({movies,numberOfMovies,excludeFirst}) {
  const isMobile = useMediaQuery("(max-width:736px)");
    const classes = useSyles();
    const startFrom =excludeFirst?1:0;
  return (
    <Grid container className={classes.moviesContainer} direction={isMobile ? 'column':'row'} >
        {movies.results.slice(startFrom,numberOfMovies).map((movie,i)=>(
            <Movie key={i} movie={movie} i={i}/>
        ))}
    </Grid>
  )
}

export default MovieList