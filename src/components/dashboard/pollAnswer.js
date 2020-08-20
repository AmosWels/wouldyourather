import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import DialogActions from '@material-ui/core/DialogActions';
import Divider from '@material-ui/core/Divider';
import Radio from '@material-ui/core/Radio';
import { connect } from 'react-redux';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import { useHistory, Redirect} from 'react-router-dom';
import {saveQuestionAnswerAction} from '../../actions/index';
import {ErrorAlert, SuccessAlert} from '../commons/alert'
import InvalidUrl from '../commons/broken'

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
});
export const PollAnswer = (props) => {
    const classes = useStyles();
    const [value, setValue] = React.useState('');
    const [optionOneVotes, setoptionOneVotes] = React.useState('');
    const [optionTwoVotes, setoptionTwoVotes] = React.useState('');
    const [optionOne, setoptionOne] = React.useState('');
    const [optionTwo, setoptionTwo] = React.useState('');
    const [votesTotal, setvotesTotal] = React.useState('');
    const [author, setAuthor] = React.useState('');
    const { match, questions, authUser, saveQuestionAnswerAction, users } = props
    const history = useHistory();
    // console.log('optionOne', optionOne, 'optionTwo', optionTwo)
    
    const { question_id, button } = match.params;
    React.useEffect(() => {
      const checkId =()=>{
        if (question_id && question_id !== undefined){
        let question = questions[question_id];
        console.log('question,,mmm', question)
          if(question === undefined || question === ''){
            console.log('error place')
            return <Redirect to="/questions/invalid" />;
          } else {
          const optionOneVotes = questions[question_id].optionOne.votes.length;
          const optionOne = questions[question_id].optionOne.text;
          const optionTwo = questions[question_id].optionTwo.text;
          const optionTwoVotes = questions[question_id].optionTwo.votes.length;
          const votesTotal = optionOneVotes + optionTwoVotes;
          const author = users[question.author].name;
          setAuthor(author)
          setoptionOneVotes(optionOneVotes)
          setoptionTwoVotes(optionTwoVotes)
          setvotesTotal(votesTotal)
          setoptionOne(optionOne)
          setoptionTwo(optionTwo)
        }
      }
    }
    checkId()
    });

    const handleExpandClick = () => {
      history.push('/dashboard')
    };

    const handleChange = (event) => {
      setValue(event.target.value);
    };

    const BorderLinearProgress = withStyles((theme) => ({
      root: {
        height: 10,
        borderRadius: 5,
      },
      // option: {
      //   ...theme.typography.button,
      //   backgroundColor: theme.palette.background.default,
      //   padding: theme.spacing(1),
      // },
      colorPrimary: {
        backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
      },
      bar: {
        borderRadius: 5,
        backgroundColor: '#1a90ff',
      },
    }))(LinearProgress);

    const handleSubmitQuestionAnswer = e => {
        e.preventDefault();
        if (value !== '') {
          saveQuestionAnswerAction(authUser, question_id, value);
          SuccessAlert();
          history.push('/dashboard')
        } else {
          ErrorAlert();
        }
      };
    
    const action = (
      <Button color="secondary" size="small">
        Asks that would you Rather ?
      </Button>
    );

    return (
    <>
      {questions[question_id] === undefined? <InvalidUrl /> : 
        button === "true" ?
        <Card timeout="auto" className={classes.paper}>
          <CardContent className={classes.root}>
            <FormControl component="fieldset">
          <FormLabel component="legend">Options</FormLabel>
          <RadioGroup aria-label="gender" name="choice" value={value} checked={value} onChange={handleChange}>
            <FormControlLabel value="optionOne" control={<Radio />} label={optionOne} />
            <FormControlLabel value="optionTwo" control={<Radio />} label={optionTwo} />
          </RadioGroup>
        </FormControl>
        </CardContent>
        <DialogActions>
        <Button variant="outlined" color="primary" onClick={handleExpandClick}>Cancel</Button>
        <Button variant="outlined" color="primary" onClick={handleSubmitQuestionAnswer}>Submit</Button>
      </DialogActions>
      </Card> :
     <Card timeout="auto" className={classes.paper}>
        <CardContent className={classes.root}>
        <SnackbarContent message={author} action={action}/><br/>
        <Typography className={classes.option} variant="caption" display="block" gutterBottom>
        Option One details 
        </Typography><br/>
            <Typography>1. {questions[question_id].optionOne.text}</Typography><br/>
            <Chip
              label={`${optionOneVotes} out of ${votesTotal} votes`}
              clickable
              color="primary"
              variant="outlined"
            /><br/><br/>
            <Chip
              label={`Percentage : ${((optionOneVotes / votesTotal) * 100)} %`}
              clickable
              color="primary"
              variant="outlined"
            /><br/><br/>
              <br />
      <BorderLinearProgress variant="determinate" value={(optionOneVotes / votesTotal)* 100} />
            <br/>
        <Divider /><br/><br/>
        <Typography className={classes.option} variant="caption" display="block" gutterBottom>
        Option Two details 
        </Typography><br/>
            <Typography>2. {questions[question_id].optionTwo.text}</Typography><br/>
            <Chip
              label={`${optionTwoVotes} out of ${votesTotal} votes`}
              clickable
              color="primary"
              variant="outlined"
            /><br/><br/>
            <Chip
              label={`Percentage : ${((optionTwoVotes / votesTotal) * 100)} %`}
              clickable
              color="primary"
              variant="outlined"
            /><br/><br/><BorderLinearProgress variant="determinate" value={(optionTwoVotes / votesTotal)* 100} />
        </CardContent>
        <DialogActions>
        <Button variant="outlined" color="primary" onClick={handleExpandClick}>Done</Button>
      </DialogActions>
      </Card>
       }
    </>
    );
    };

function mapStateToProps({ authUser, questions, users }, { match }) {
    return {
        authUser,
        questions,
        match,
        users
    };
    }

export default connect(
    mapStateToProps,
    { saveQuestionAnswerAction }
    )(PollAnswer);
