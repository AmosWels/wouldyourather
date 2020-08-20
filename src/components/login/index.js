import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {Footer} from '../commons/footer';
import {setUser} from '../../actions/actionCreators';
import { ErrorAlert } from '../commons/alert'

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    formControl: {
        margin: theme.spacing(1),
        width: '100%',
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
    },
  }));

export const Login = props => {
      const classes = useStyles();
      const [user, setUserId] = React.useState('');

      const handleChange = (event) => {
        setUserId(event.target.value);
      };

      const handleSubmit = e => {
        e.preventDefault();
        if(user !== ''){
        const { setUser } = props;
        new Promise((res, rej) => {
          setTimeout(() => res(), 500);
        }).then(() => setUser(user))
        // .then(()=> history.push('/dashboard'));
        } else {
            ErrorAlert();
        }
      };

    //   console.log('this.state', user, 'props', props)
      const getUsers = () => {
        let users = props.users.length > 0 ? props.users : []
        
        return users.map(user => (
            <MenuItem key ={user.id} value={user.id}>{user.name}</MenuItem>
        ));
      };

    return ( 
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                {/* <LockOutlinedIcon /> */}
              </Avatar>
              <Typography component="h1" variant="h5">
                Welcome to would you rather Game <br/> <center>Sign in</center>
              </Typography>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Select A friend of your choice</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={user}
                onChange={handleChange}
                >
                {getUsers()}
                </Select>
                <FormHelperText>Select User of your choice</FormHelperText>
            </FormControl>
              <form className={classes.form} noValidate>
              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={handleSubmit}
                >
                  Sign In
                </Button>
              </form>
            </div>
            <Box mt={8}>
              <Footer />
            </Box>
          </Container>
        );
}

function mapStateToProps({ users }) {
    return {
      users: Object.values(users)
    };
}

export default connect(mapStateToProps,{setUser})(Login);
