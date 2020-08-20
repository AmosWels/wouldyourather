import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card'
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {saveQuestionAction} from '../../actions/index';
import {SuccessAlert} from '../commons/alert';

const useStyles = makeStyles({
  root: {
    // minWidth: 275,
    maxWidth: 500,
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export const NewPoll= (props)=> {
  const classes = useStyles();
  const [values, setValues] = React.useState({optionOne: '', optionTwo: ''})
  const history = useHistory();

  const handleClose = () => {
    history.push('/dashboard')
  };

  const handleInputChange = e => {
    const {name, value} = e.target
    setValues({...values, [name]: value})
}

  const handleSubmit = e => {
    e.preventDefault();
    const { authUser, saveQuestionAction } = props;
    const {optionOne, optionTwo} = values
    new Promise((res, rej) => {
      saveQuestionAction(optionOne, optionTwo, authUser);
      setTimeout(() => res('success'), 1000);
    }).then(() => {
      setValues({
        optionOne:'',
        optionTwo:''
      });
      SuccessAlert()
      handleClose()
      history.push('/dashboard')
    });
  };

  return (
    <div>
      {/* <Button variant="contained"  onClick={handleClickOpen} >
            New Poll
        </Button> */}
      <Card aria-labelledby="form-dialog-title" className={classes.paper}>
        <DialogTitle id="form-dialog-title">New Poll</DialogTitle>
        <DialogContent className={classes.root}>
          <DialogContentText>
            To Create a new poll,please enter two options from which a friend will have to choose their own
           prefered choice. Ensure that they are distinct
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Option One"
            type="text"
            name="optionOne"
            value={values.optionOne}
            onChange={handleInputChange}
            fullWidth
          /><br />
            <Typography variant="button" display="block" gutterBottom>
                OR
            </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Option Two"
            type="text"
            name="optionTwo"
            onChange={handleInputChange}
            value={values.optionTwo}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Card>
    </div>
  );
}

function mapStateToProps({ authUser }) {
  return {
    authUser
  };
}
export default connect(
  mapStateToProps,
  { saveQuestionAction }
)(NewPoll);