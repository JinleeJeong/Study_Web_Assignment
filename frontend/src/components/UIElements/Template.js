import React, {Component, Fragment} from 'react';
import movie from '../../images/movie.mp4';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import { AppContext } from '../../contexts/appContext';
import { Link } from 'react-router-dom';
import SearchInput, { /*createFilter*/ } from 'react-search-input';
// import CardMedia from '@material-ui/core/CardMedia';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Toolbar from '@material-ui/core/Toolbar';
// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
// import CameraIcon from '@material-ui/icons/PhotoCamera';
// import AppBar from '@material-ui/core/AppBar';
// const KEYS_TO_FILTERS = ['title']


const styles = theme => (
    
  {
      default : {
        color : '#90CAF9',
      },
      appBar: {
        position: 'relative',
      },
      icon: {
        marginRight: theme.spacing.unit * 2,
      },
      heroUnit: {
        backgroundColor: theme.palette.background.paper,
      },
      heroContent: {
        maxWidth: 600,
        margin: '0 auto',
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
      },
      heroButtons: {
        marginTop: theme.spacing.unit * 4,
      },
      layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
          width: 1100,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      },
      cardGrid: {
        padding: `${theme.spacing.unit * 8}px 0`,
      },
      card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
      cardMedia: {
        paddingTop: '56.25%',
      },
      cardContent: {
        flexGrow: 1,
      },
      footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing.unit * 6,
      },
    
    });
class Template extends Component {
    static contextType = AppContext;
    
    constructor(props) {
      super(props);
      
      this.state = {
        users: [],
        contents: [],
        searchTerm: '',
        value: 0
      }
      
      this.searchUpdated = this.searchUpdated.bind(this);
      this.buttonClicked = this.buttonClicked.bind(this);
    }
  
    buttonClicked(e) {
      this.setState({value: this.state.value+1});
    }
    shouldComponentUpdate(nextProps, nextState) {
      return this.state.value === nextState.value || this.state.searchTerm === nextState.searchTerm;
    }
    
    async componentDidMount() {  
      this.context.actions.checkAuth();
  
      this.context.actions.getCurrentPosition();
    
      this.setState({
        contents: await this.context.actions.getContentsR1(),
        
      });
      console.log(this.state.contents)
    };
  
    searchUpdated (term) {
      // if(term === ''){
      //   this.setState({searchTerm : 'ForExample'})
      // }
      // else {
      //   this.setState({searchTerm : term})
      // }
      this.setState({
        searchTerm: term
      });
    };
    
    
    render() {
      // const filter = this.state.contents.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
      const { lat, lng } = this.context.state;
      const { classes } = this.props;      
      
      return (
        <Fragment>
          
          <div className={classes.heroUnit} style={{textAlign:"center"}}>
            <div className={classes.heroContent} style={{maxWidth:"1000px"}}>
                  <video loop autoPlay={true} style={{width:"100%"}}>
                      <source type="video/mp4" data-reactid=".0.1.0.0.0" src={movie} />
                  </video>
              <div className={classes.heroButtons}>
                <Grid container spacing={16} justify="center">
                  <Grid item>
                    <Link to={`/write?lat=${lat}&lng=${lng}`}><Button variant="contained" color="primary" style={{ fontSize: "1.5vh", backgroundColor : "#cc66ff", color : "white"}}>스터디 시작하기</Button></Link>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>


          <div className={classNames(classes.layout, classes.cardGrid)}>
              <TextField
                onChange={this.searchUpdated}
                style={{marginBottom:"3vh", width:"20vh"}}
                id="outlined-search"
                placeholder="Search Category"
                type="search"
                className={classes.textField}
                margin="normal"
                variant="outlined"
              />
              <Link to={`/category/`+this.state.searchTerm+`/`}>
                 <span 
                    style={{position:"relative", right:"2vh", top:"2.7vh", color : "black"}}
                    className="glyphicon glyphicon-search" aria-hidden="true" ></span>
              </Link>
            <Grid container spacing={40}>
              {this.state.contents.map((board, index) => (
                <Grid item key={index} sm={6} md={4} lg={3}>
                  <Card className={classes.card}>
                  <div key={index}></div>
                    <Button style={{ width: "100%", height: "20vh"}}className="" onClick={()=>{
                                  let path = `detail/`+board.id;
                                  this.props.history.push(path);

                                }}><div><img src ={`http://localhost:8080/`+board.imageUrl} alt ="Testing" width ="70%" height="auto"/></div></Button>
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                      <div style ={{marginBottom: "3vh"}}>{board.title}</div>
                      </Typography>
                      <Typography>
                      {board.category}
                      </Typography> 
                    </CardContent>
                    <CardActions>
                    
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
      </Fragment>
      );
  }
};
Template.propTypes = {
      classes: PropTypes.object.isRequired,
    };
export default withStyles(styles)(Template);
  