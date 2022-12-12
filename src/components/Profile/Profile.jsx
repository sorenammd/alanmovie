import React ,{useEffect} from 'react'
import {useSelector} from 'react-redux';
import {userSelector} from '../../fetures/auth';
import {Typography, Button,Box} from '@mui/material';
import {AddBox, ExitToApp} from '@mui/icons-material';
import { useGetListQuery } from '../../services/TMDB';
import RatedCards from '../RatedCards/RatedCards';
 function Profile() {
  const { user } = useSelector((state) => state.user);
  console.log('user:',user.id)
  const { data: favoriteMovies, refetch: refetchFavorites } = useGetListQuery({ listName: 'favorite/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 });
  const { data: watchlistMovies, refetch: refetchWatchlisted } = useGetListQuery({ listName: 'watchlist/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 });

  useEffect(() => {
    refetchFavorites();
    refetchWatchlisted();
  }, []);
  const logout=()=>{
    localStorage.clear();
    window.location.href='/';
  }
  return (
    <Box>
    <Box display ="flex" justifyContent ="space-between">
      <Typography variant='h4' gutterBottom>My Profile</Typography>
    <Button color='inherit' onClick={logout}>
      Logout &nbsp; <ExitToApp/>
    </Button>
    </Box>
       {!favoriteMovies?.results?.length && !watchlistMovies?.results?.length 
       ?<Typography variant='h5'>Add Favorit or watchlist some movies to them here!</Typography>
       :<Box>
       <RatedCards title='Favorite Movies' data={favoriteMovies}/>
       <RatedCards title='watchlist' data={watchlistMovies}/>
       </Box>}
    </Box>
  )
}

export default Profile