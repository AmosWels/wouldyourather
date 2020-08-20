import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Divider } from "@material-ui/core";
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
    margin: theme.spacing(1),
    flexGrow: 1
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

export const Leaderboard = props => {
  const classes = useStyles();
  const [leaderData, setLeaderBoard] = React.useState("");
  const { users } = props;

  React.useEffect(() => {
      const leadershipRanks = () => {
        const leaderboardData = Object.values(users)
          .map(user => ({
            id: user.id,
            name: user.name,
            answerCount: Object.values(user.answers).length,
            questionCount: user.questions.length,
            total: Object.values(user.answers).length + user.questions.length
          }))
          .sort((a, b) => a.total - b.total)
          .reverse()
          .slice(0, 3);
        setLeaderBoard(leaderboardData);
      };
    leadershipRanks();
  }, [users]);


  return (
    <div>
    <Grid container spacing={3}>
      {leaderData !== "" &&
        leaderData.map((user, idx) => (
        <Grid item xs={4} key={user.id}>
          <Card className={classes.root} key={user.id}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}></Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={user.name}
              subheader="Details"
            />
            <CardContent>
              
                  <Paper className={classes.paper}>
                    <Typography variant="subtitle1" gutterBottom>
                      Total Score
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {user.questionCount + user.answerCount}
                      <br/>
                    </Typography>
                      <Divider /><br/>
                  
                    <Typography variant="subtitle1" gutterBottom>
                      Number of Answered Questions
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {user.answerCount}
                      <br />
                    </Typography>
                    <Divider /><br/>

                    <Typography variant="subtitle1" gutterBottom>
                      Number of Created Questions
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {user.questionCount}
                      <br />
                    </Typography>
                    <Divider /><br/>
                    </Paper>
            </CardContent>
          </Card>
            </Grid>
        ))}
        </Grid>
    </div>
  );
};
function mapStateToProps({ users }) {
    return {
        users
    };
  }
  
export default connect(mapStateToProps)(Leaderboard);;
