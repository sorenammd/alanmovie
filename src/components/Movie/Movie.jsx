import React from 'react'
import { Typography,Grid,Grow, Tooltip,Rating} from '@mui/material'
import { Link } from 'react-router-dom'
import useSyles from './styles'
const Movie = ({movie,i}) => {
    const classes = useSyles();

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.movie}>
        <Grow in key={i} timeout={(i+1)*250}>
        <Link className={classes.links} to={`/movie/${movie.id}`}>
            {
            <img alt={movie.title} className={classes.image} 
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`: 'https://www.fillmurray.com/200/300'}
            onError={event => {
          event.target.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png"
          event.onerror = null
        }}
            />
            }
            <Typography className={classes.title} variant='h5'>
            {movie.title}
        </Typography>
        <Tooltip disableTouchListener title={`${movie.vote_average} / 10`}>
            <div>
            <Rating readOnly value={movie.vote_average / 2} precision={0.1}/>
            </div>

        </Tooltip>
        </Link>
      
        </Grow>
    
    </Grid>
  )
}

export default Movie