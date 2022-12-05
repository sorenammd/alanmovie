import React from 'react';
import {CssBaseline} from '@mui/material';
import {Route,Routes} from 'react-router-dom';
import {Actors,MovieInformation,Movies,NavBar,Profile} from './index'
import useStyles from './styles'
function App() {
  const classes= useStyles();
  return (
    <div className={classes.root}>
    <CssBaseline/>
    <NavBar/>
      <main className={classes.content}>
        <div className={classes.toolbar}/>
        <Routes>
          <Route path='/' element={<Movies/>}>
           
          </Route>
          <Route path='/movies/:id' element={<MovieInformation/>}>
            
          </Route>
          <Route path='/actors/:id' element={<Actors/>}>
           
           </Route>
           <Route path='/profile/:id' element={<Profile/>}>
             
           </Route>
        </Routes>
      </main>
    </div>
  )
}

export default App