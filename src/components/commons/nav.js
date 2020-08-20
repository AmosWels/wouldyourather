import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToApp from '@material-ui/icons/ExitToApp';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { removeAuthedUser } from '../../actions/actionCreators';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(2),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export const MenuAppBar = props=> {
  const classes = useStyles();

  const history = useHistory();
  const handleSignout = (event) => {
    props.removeAuthedUser(null);
    history.push('/')
  };

  const handleClickOpen = () => {
    // setOpen(true);
    history.push('/add')
  };

  const { authedUser } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={()=>history.push('/dashboard')}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
          <Typography variant="h6" className={classes.title}>
            Welcome,  {authedUser && authedUser[0].name}
          </Typography>
            <div className={classes.root}>
            {/* <NewPoll /> */}
            <Button variant="contained" className={classes.menuButton} onClick={()=>history.push('/dashboard')} >
                DashBoard
            </Button>
            <Button variant="contained" className={classes.menuButton} onClick={handleClickOpen} >
                New Poll
            </Button>
            <Button variant="contained"  className={classes.menuButton} onClick={()=>history.push('/leaderboard')} >
                LeaderBoard
            </Button>
            </div>
            <div>
            <Button variant="contained"  onClick={handleSignout} >
                SignOut <ExitToApp />
            </Button>
            </div>
          
        </Toolbar>
      </AppBar>
    </div>
  );
}

function mapStateToProps({ authUser, users }) {
    const authedUser = Object.values(users).filter(user => authUser === user.id);
    return {
      authUser,
      authedUser,
      users
    };
  }
export default connect(
    mapStateToProps,{removeAuthedUser}
  )(MenuAppBar);