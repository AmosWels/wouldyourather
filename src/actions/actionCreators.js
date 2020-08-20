export const SET_USER = 'SET_USER';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const GET_USERS = 'GET_USERS';
export const ADD_ANSWER_TO_QUESTION = 'ADD_ANSWER_TO_QUESTION';
export const ADD_QUESTION_TO_USER = 'ADD_QUESTION_TO_USER';
export const RECEIVE_TWEETS = 'RECEIVE_TWEETS';
export const REMOVE_AUTHED_USER = 'REMOVE_AUTHED_USER';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_ANSWER_TO_USER = 'ADD_ANSWER_TO_USER';

export function addAnswerToQuestion(authUser, qid, answer) {
  return {
    type: ADD_ANSWER_TO_QUESTION,
    authUser,
    qid,
    answer
  };
}

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  };
}

export function addQuestionToUser({ id, author }) {
  return {
    type: ADD_QUESTION_TO_USER,
    id,
    author
  };
}

export function addAnswerToUser(authUser, qid, answer) {
  return {
    type: ADD_ANSWER_TO_USER,
    authUser,
    qid,
    answer
  };
}

export function receiveTweets(tweets) {
  return {
    type: RECEIVE_TWEETS,
    tweets
  };
}

export function setUser(id) {
  return {
    type: SET_USER,
    id
  };
}

export function removeAuthedUser(id) {
  return {
    type: REMOVE_AUTHED_USER,
    id
  };
}

export function getQuestions(questions) {
  return {
    type: GET_QUESTIONS,
    questions
  };
}

export function getUsers(users) {
  return {
    type: GET_USERS,
    users
  };
}
