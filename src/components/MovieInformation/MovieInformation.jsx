import React,{useState,useEffect,useContext} from 'react';
import { Modal, Typography, Button, ButtonGroup, Grid, Box, CircularProgress, Rating } from '@mui/material';
import { Movie as MovieIcon , Theaters,PlusOne,Favorite,FavoriteBorderOutlined,Remove,ArrowBack, Language } from '@mui/icons-material';
import { Link,useParams } from 'react-router-dom';
import VideocamOffTwoToneIcon from '@mui/icons-material/VideocamOffTwoTone';
import { useDispatch,useSelector } from 'react-redux';
import axios from 'axios';
import { indigo} from '@mui/material/colors';
import {selectGenreOrCategory} from '../../fetures/currentGenreOrCategory';
import { useGetListQuery, useGetMovieQuery ,useGetRecommendationsQuery} from '../../services/TMDB';
import useStyles from './styles';
import genreIcons from '../../assets/genres';
import MovieList from '../MovieList/MovieList';
import { useTheme } from '@emotion/react';
function MovieInformation() {
  const { user } = useSelector((state) => state.user);
  
  const { id } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();

  const theme = useTheme();
  const { data, error, isFetching } = useGetMovieQuery(id);
  const { data: favoriteMovies } = useGetListQuery({ listName: 'favorite/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 });
  const { data: watchlistMovies } = useGetListQuery({ listName: 'watchlist/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 });
  const { data: recommendations } = useGetRecommendationsQuery({ list: '/recommendations', movie_id: id });

  const [open, setOpen] = useState(false);
  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);

  useEffect(() => {
    setIsMovieFavorited(!!favoriteMovies?.results?.find((movie) => movie?.id === data?.id));
  }, [favoriteMovies, data]);
  useEffect(() => {
    setIsMovieWatchlisted(!!watchlistMovies?.results?.find((movie) => movie?.id === data?.id));
  }, [watchlistMovies, data]);

  const addToFavorites = async () => {
    await axios.post(`https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`, {
      media_type: 'movie',
      media_id: id,
      favorite: !isMovieFavorited,
    });

    setIsMovieFavorited((prev) => !prev);
  };

  const addToWatchList = async () => {
    await axios.post(`https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`, {
      media_type: 'movie',
      media_id: id,
      watchlist: !isMovieWatchlisted,
    });

    setIsMovieWatchlisted((prev) => !prev);
  };
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
          <Link to='/'>Something has gone wrong -Go Back</Link>
      </Box>
    )
  }


  return (
     <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} lg={4} align="center">
          <img
          className={classes.poster}
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt={data?.title}
          onError={event => {
          event.target.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png"
          event.onerror = null
        }}
          />
      </Grid>
      <Grid item container direction='column' lg={7} >
         <Typography variant='h3' align='center' gutterBottom marginTop={'30px'}>
              {data?.title} ({data.release_date.split('-')[0]})
         </Typography>
         <Typography variant='h5' align='center' gutterBottom>
              {data?.tagline} 
         </Typography>
         <Grid item className={classes.containerSpaceAround}>
            <Box display='flex' align='center'>
              <Rating readOnly value={data.vote_average /2}/>
              <Typography variant='subtitle1' gutterBottom style={{marginLeft:'10px'}}>
                {data?.vote_average.toFixed(1)} /10
              </Typography>
            </Box>
            <Typography variant='h6' align='center' gutterBottom>
              {data?.runtime} min / {data?.spoken_languages[0].english_name}
            </Typography>
         </Grid>
         <Grid item className={classes.genresContainer}>
            {data?.genres?.map((genre)=>(
              <Link key={genre.name} className={classes.links} to='/' onClick={()=> dispatch(selectGenreOrCategory(genre.id))}>
              <img src={genreIcons[genre.name.toLowerCase()]} className={classes.genreImage} height={30}/>
              <Typography color='textPrimary' variant='subtitle1'>
                      {genre?.name}
              </Typography>
              </Link>
            ))}
         </Grid>
         <Typography variant='h5' gutterBottom style={{marginTop:'10px'}}>
              Overview
         </Typography>
         <Typography style={{marginBottomm:'2rem'}}>
              {data?.overview}
         </Typography>
         <Typography variant='h5' gutterBottom >
          Top Cast
         </Typography>
         <Grid item container spacing={2} direction="row"  justifyContent="center" className={classes.cast}>
          {data && data?.credits.cast.map((character,i) => (
            character.profile_path &&  (<Grid key={i} item xs={4} md={2} component={Link} to={`/actors/${character.id}`} style={{textDecoration:'none'}}>
              <img className={classes.castImage} src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`} alt={character.name}/>
              <Typography color='textPrimary' variant='subtitle1' >{character?.name}</Typography>
              <Typography color={indigo[500]} variant='caption' >{character.character.split('/')[0]}</Typography>
            </Grid>)
            )).slice(0,6)}
         </Grid>
         <Grid item container style={{marginTop:'2rem'}}>
            <div className={classes.buttonContainer}>
               <Grid item   xs={12} sm={6}  className={classes.buttonContainer}>
                <ButtonGroup size='small'  >
                    <Button variant='contained' target='_blank' rel='nooopener moreferrer'href={data?.homepage} endIcon={<Language/>}>
                      Website
                    </Button>
                    <Button color='yelloww' variant="contained" target='_blank' rel='nooopener moreferrer'href={`https://www.imdb.com/title/${data?.imdb_id}`} endIcon={<MovieIcon/>}>
                      IMDb
                    </Button>
                    <Button color='redd' variant="contained" onClick={()=>setOpen(true)} href="#" endIcon={<Theaters/>}>
                      Trailer
                    </Button>
                </ButtonGroup>
                </Grid>
                <Grid item xs={12} sm={6} className={classes.buttonContainer}>
                <ButtonGroup  size='small'>
                    <Button color='soraty' variant={isMovieFavorited ? 'contained' : 'outlined'} onClick={addToFavorites} endIcon={isMovieFavorited ? <FavoriteBorderOutlined/> :<Favorite/>}>
                      {isMovieFavorited ? 'Un Favorite' : 'Favorite'}
                    </Button>
                    <Button color={theme.palette.mode === 'light' ? 'black' : 'white'} variant={isMovieWatchlisted ? 'contained' : 'outlined'} onClick={addToWatchList} endIcon={isMovieWatchlisted ? <Remove/> :<PlusOne/>}>
                        WatchList
                    </Button>
                </ButtonGroup>
                </Grid>
           
            </div>
         </Grid>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" gutterBottom align="center">
          You might also like
        </Typography>
        {recommendations
          ? <MovieList movies={recommendations} numberOfMovies={12} />
          : <Box>Sorry, nothing was found.</Box>}
      </Box>
          
      <Modal
        closeAfterTransition
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
      >
      
      <Box >
        { data?.videos?.results?.length > 0 ? (
          <iframe
            autoPlay
            className={classes.videos}
            frameBorder="0"
            title="Trailer"
            src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
            allow="autoplay"
          />
        ):(<Box className={classes.boxx}><VideocamOffTwoToneIcon fontSize='medium' color='warning'/><Typography align='center'>Video Not Found</Typography></Box>)}
      </Box>
      </Modal>
      
    </Grid>

  )

}

export default MovieInformation