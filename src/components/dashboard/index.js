import React from 'react';
import { connect } from 'react-redux';
import VerticalTabs, {TabPanel} from './tabs';

export const Dashboard = (props) => {
    const {userQuestionData} = props
    return (
        <div>
            <TabPanel />
            <VerticalTabs userQuestionData={userQuestionData} />
        </div>
        );
    };

function mapStateToProps({ authUser, users, questions }) {
    const answeredIds = Object.keys(users[authUser].answers);
    const unanswered = Object.values(questions)
        .filter(question => !answeredIds.includes(question.id))
        .sort((a, b) => b.timestamp - a.timestamp);
    const answered = Object.values(questions)
        .filter(question => answeredIds.includes(question.id))
        .sort((a, b) => b.timestamp - a.timestamp);
    
    return {
        userQuestionData: {
        answered,
        unanswered,
        questions,
        users
        }
    };
}

export default connect(mapStateToProps)(Dashboard);
