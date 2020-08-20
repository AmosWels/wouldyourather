import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom';
// import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
import UserTile from './userTile';
import Leaderboard from './leaderboard';

export const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} component="span">
          <Typography component="span">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any,
  value: PropTypes.any,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  cards: {
    flexGrow: 1,
    padding: theme.spacing(1)
},
paper: {
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
},
}));

export const VerticalTabs = (props) => {
  const classes = useStyles();
  const {userQuestionData} = props
  const {questions, users, answered, unanswered} = userQuestionData
  // console.log('amswered', answered)
  // console.log('unanswered', unanswered )
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const history = useHistory();
  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Unanswered" {...a11yProps(0)} />
        <Tab label="Answered" {...a11yProps(1)} />
        <Tab label="LeaderBoard" {...a11yProps(2)} onClick={()=>history.push('/leaderboard')}/>
      </Tabs>
      <TabPanel value={value} index={0} >
      <Grid container className={classes.cards} component="span">
        {unanswered.map(question => (
        <Grid item key={question.id} component="span">
            <UserTile
              key={question.id}
              question={question}
              question_id={question.id}
              unanswered={true}
              questions={questions}
              users={users}
              buttonShow={true}
            />
          </Grid>
          ))}
    </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Grid container className={classes.cards} component="span">
        {answered.map(question => (
        <Grid item key={question.id} component="span">
            <UserTile
              key={question.id}
              question={question}
              question_id={question.id}
              answered={true}
              questions={questions}
              users={users}
              buttonShow={false}
            />
          </Grid>
          ))}
    </Grid>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Leaderboard users={users} />
      </TabPanel>
    </div>
  );
}


export default VerticalTabs;