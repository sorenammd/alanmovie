import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme)=>({
    containerSpaceAround:{
        display:'flex',
        justifyContent:'space-around',
        margin:'10px 0 !important',
    
        [theme.breakpoints.down('sm')]:{
            flexDirection:'column',
            flexWrap:'wrap'
        },
    },
    poster:{
        borderRadius:'20px',
        boxShadow: "6px 25px 31px -10px rgba(15,14,14,0.62)",
        width:"80%",
       
        [theme.breakpoints.down('md')]:{
            margin:'0 auto',
            width:'100%',
            height:'100%'
        },
        [theme.breakpoints.down('sm')]:{
            margin:'0 auto',
            width:'100%',
            height:'100%',
            marginBottom:'30px'
        },

    },
    genresContainer:{
        margin:'10px 0 !important',
        display:'flex',
        justifyContent:'space-around',
        flexWrap:'wrap'
    },
    genreImage:{
        filter:theme.palette.mode === 'dark'&& 'invert(1)',
        marginRight:'10px'
    },
    links:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        textDecoration:'none',
        [theme.breakpoints.down('sm')]:{
            padding:'0.5rem 1rem'
        }
    },

    castImage:{
        display:'block',

        width:'100%',
        maxWidth:'6em',
        height:'8em',
        odjectFit:'cover',
        borderRadius:'10px'
    },
    buttonContainer:{
        display:'flex',
        justifyContent:'space-between',
        width:'100%',
        [theme.breakpoints.down('sm')]:{
            flexDirection:'column'
        }
    },
    modal:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',

    },
    videos:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width:'720px',
        height:'450px',
        [theme.breakpoints.down('sm')]:{
           width:'90%',
           height:'90%'
        }
    },
    videosBox:{
        width:'60%',
        height:'80%'
    },
    boxx:{
        display:'flex',
        flexDirection:'center',
        alignItems:'center',
        width:'200px',
        height:'50px',
        backgroundColor:'white',
        borderRadius:'10px',
        paddingLeft:'20px'
    }
}))