import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme)=>({
    moviesContainer:{
            display:'flex',
            flexWrap:'wrap',
            justifyContent:'space-between',
            overflow:'auto',
            [theme.breakpoints.down('sm')]:{
                justifyContent:'center',
            }
        }
}))