import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {saveQuestionAnswerAction} from '../../actions/index'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: theme.spacing(1),
    flexGrow: 1,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export const UserTile=(props)=> {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const { questions, users, question, question_id, buttonShow } = props
  const history = useHistory();

  const handleAnswerClick = () => {
    setExpanded(!expanded);
    history.push(`/questions/${question_id}/${buttonShow}`)
  };

  return (
    <>
    <Card className={classes.root} >
      <CardHeader
        avatar={
          <Avatar aria-label="recipe"  className={classes.avatar}>
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" >
            <MoreVertIcon /> 
          </IconButton>
        }
        title={users[question.author].name}
        subheader="Asks ......"
      />
      <CardContent >
      <Typography variant="subtitle1"  gutterBottom>
        Would you Rather?
      </Typography>
        <Typography variant="body2" color="textSecondary">
        {questions[question_id].optionOne.text} <br />
        </Typography>
        <Typography variant="button" display="block" gutterBottom>
        OR ...
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {questions[question_id].optionTwo.text} <br />
        </Typography>
      </CardContent>
      <CardActions disableSpacing >
      { buttonShow === true ? 
        <Button color="primary" fullWidth onClick={handleAnswerClick}>Click to Answer</Button> :
        <Button color="primary" fullWidth onClick={handleAnswerClick}>Click to View</Button>
         }
      </CardActions>
    </Card>
    </>
  );
}

function mapStateToProps({ authUser }, { match }) {
  return {
    authUser
  };
}

export default connect(
  mapStateToProps,
  { saveQuestionAnswerAction }
)(UserTile);