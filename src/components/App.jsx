import React,{useRef} from 'react';
import {CssBaseline} from '@mui/material';
import {Route,Routes} from 'react-router-dom';
import {Actors,MovieInformation,Movies,NavBar,Profile} from './index'
import useStyles from './styles'
import useAlan from './Alan';
function App() {
  const alanBtnContainer  = useRef();
  const classes= useStyles();
  useAlan();
  return (
    <div className={classes.root}>
    <CssBaseline/>
    <NavBar/>
      <main className={classes.content}>
        <div className={classes.toolbar}/>
        <Routes>
          <Route path='/' element={<Movies/>}/>
          <Route  path='/movie/:id' element={<MovieInformation/>}/>
          <Route path='/actors/:id' element={<Actors/>}/>
          <Route path='/profile/:id' element={<Profile/>}/>
        </Routes>
      </main>
      <div ref={alanBtnContainer}/>
    </div>
  )
}

export default App