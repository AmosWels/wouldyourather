// shared.js
import { getData, saveQuestion } from '../utils/calls';
import { addQuestion, addAnswerToUser, addAnswerToQuestion, addQuestionToUser, getUsers, getQuestions } from './actionCreators';

// const AUTHED_ID = 'sarah_edoc';

export function handleFetch() {
  return dispatch => {
    return getData().then(({ users, questions }) => {
      dispatch(getQuestions(questions));
      dispatch(getUsers(users));
    });
  };
}

export function saveQuestionAction(optionOneText, optionTwoText, author) {
  return dispatch => {
    return saveQuestion({ optionOneText, optionTwoText, author }).then(
      question => {
        dispatch(addQuestion(question));
        dispatch(addQuestionToUser(question));
      }
    );
  };
}

export function saveQuestionAnswerAction(authUser, qid, answer) {
  return dispatch => {
    dispatch(addAnswerToUser(authUser, qid, answer));
    dispatch(addAnswerToQuestion(authUser, qid, answer));
    // return saveQuestionAnswer(authUser, qid, answer)
  };
}
