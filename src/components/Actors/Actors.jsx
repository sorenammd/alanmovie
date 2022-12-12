import React from 'react'
import { Box,Button,CircularProgress,Grid,Typography } from '@material-ui/core'
import {useNavigate ,useParams} from 'react-router-dom'
import { useGetActorsDetailsQuery ,useGetMoviesActorQuery} from '../../services/TMDB';
import { ArrowBack } from '@mui/icons-material';
import useStyles from './styles'
import {MovieList} from '..'
function Actors() {
  const {id} = useParams();
  const {data,isFetching,error}= useGetActorsDetailsQuery(id);
  const navigate = useNavigate();
  const classes =useStyles();
  const page=1;
  const{data:movies}=useGetMoviesActorQuery({id,page});
  if(isFetching){
    return(
      <Box display='flex' justifyContent='center' alignItems="center">
          <CircularProgress siz='8rem'/>
      </Box>
    )
  }
  if(error){
    return(
      <Box display='flex' justifyContent='center' alignItems="center">
          <Button startIcon={<ArrowBack/>} onClick={()=>navigate(-1)} color='primary' >
              Go Back
          </Button>
      </Box>
    )
  }
  return (
   <>
    <Grid container spacing={3}>
      <Grid item lg={5} xl={4}>
        <img
        className={classes.image}
        src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
        onError={event => {
          event.target.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png"
          event.onerror = null
        }}
        alt={data.name}
        />
      </Grid>
      <Grid item lg={7} xl={8} style={{display:'flex',justifyContent:'center',flexDirection:'column'}}>
          <Typography variant='h2' gutterBottom >
            {data?.name}
          </Typography>
          <Typography variant='h5' gutterBottom >
            Born:{new Date(data?.birthday).toDateString()}
          </Typography>
          <Typography variant="body1" align="justify" paragraph>{data?.biography || 'Sorry, no biography yet...'}</Typography>
          <Box marginTop='2rem' display='flex' justifyContent='space-around'>
            <Button color='default' variant='contained'  target='_blank' href={`https://www.imdb.com/name/${data?.imdb_id}`}>
              IMDb
            </Button>
            <Button startIcon={<ArrowBack/>} onClick={()=>navigate(-1)} color='primary' >
              Go Back
          </Button>
          </Box>
      </Grid>
    </Grid>
    <Box margin='2rem 0'>
      <Typography vaiant='h2' gutterBottom align='center'>
        Movies
      </Typography>
        {movies && <MovieList movies={movies} numberOfMovies={12}/> }
     </Box>
   </>
  )
}

export default Actors