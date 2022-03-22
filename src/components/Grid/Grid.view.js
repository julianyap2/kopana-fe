import React, { useEffect ,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import gridData from './Grid.data';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  

  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 1000,
    height: 1000,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

const TitlebarGridList = () =>  {
  const [foto,setFoto] = useState([])
  const classes = useStyles();

  async function getData(){
    try {
      const response = await axios.get('http://localhost:3000/api/v1/galeri');
      console.log(response);
      setFoto(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(()=>{
    getData()
  },[])
  return (
    <div className={classes.root}>
      <GridList cellHeight={300}  spacing={30} className={classes.gridList}>
        <GridListTile key="Subheader" cols={4} style={{ height: 'auto' }}>
          <ListSubheader component="div"></ListSubheader>
        </GridListTile>
        {foto.data &&foto.data.map((tile) => (
          <GridListTile key={tile.img}>
            <img src={'http://localhost:3000/'+tile.imageUrl} alt={tile.title} />
            {console.log(tile.imageUrl)}
            <GridListTileBar
              title={tile.title}
              actionIcon={
                <IconButton aria-label={`info about ${tile.title}`} className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

export default TitlebarGridList