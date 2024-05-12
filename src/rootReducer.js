// rootReducer.js
import { combineReducers } from 'redux';
import taskReducer from './taskReducer';
import teamMembersReducer from './teamMembersReducer';

const rootReducer = combineReducers({
  tasks: taskReducer,
  teamMembers: teamMembersReducer
});

export default rootReducer;
