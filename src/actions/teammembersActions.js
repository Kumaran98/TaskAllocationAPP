import axios from 'axios';

// Action Types
export const FETCH_TEAM_MEMBERS_REQUEST = 'FETCH_TEAM_MEMBERS_REQUEST';
export const FETCH_TEAM_MEMBERS_SUCCESS = 'FETCH_TEAM_MEMBERS_SUCCESS';
export const FETCH_TEAM_MEMBERS_FAILURE = 'FETCH_TEAM_MEMBERS_FAILURE';

export const CREATE_TEAM_MEMBER_REQUEST = 'CREATE_TEAM_MEMBER_REQUEST';
export const CREATE_TEAM_MEMBER_SUCCESS = 'CREATE_TEAM_MEMBER_SUCCESS';
export const CREATE_TEAM_MEMBER_FAILURE = 'CREATE_TEAM_MEMBER_FAILURE';

export const DELETE_TEAM_MEMBER_REQUEST = 'DELETE_TEAM_MEMBER_REQUEST';
export const DELETE_TEAM_MEMBER_SUCCESS = 'DELETE_TEAM_MEMBER_SUCCESS';
export const DELETE_TEAM_MEMBER_FAILURE = 'DELETE_TEAM_MEMBER_FAILURE';

export const UPDATE_TEAM_MEMBER_REQUEST = 'UPDATE_TEAM_MEMBER_REQUEST';
export const UPDATE_TEAM_MEMBER_SUCCESS = 'UPDATE_TEAM_MEMBER_SUCCESS';
export const UPDATE_TEAM_MEMBER_FAILURE = 'UPDATE_TEAM_MEMBER_FAILURE';

// Action Creators

// Fetch team members action creators
export const fetchTeamMembersRequest = () => ({
  type: FETCH_TEAM_MEMBERS_REQUEST,
});

export const fetchTeamMembersSuccess = teamMembers => ({
  type: FETCH_TEAM_MEMBERS_SUCCESS,
  payload: teamMembers,
});

export const fetchTeamMembersFailure = error => ({
  type: FETCH_TEAM_MEMBERS_FAILURE,
  payload: error,
});

// Asynchronous action to fetch team members from the backend
export const fetchTeamMembers = () => {
  return dispatch => {
    dispatch(fetchTeamMembersRequest());
    axios.get('/api/team-members')
      .then(response => {
        const teamMembers = response.data;
        dispatch(fetchTeamMembersSuccess(teamMembers));
      })
      .catch(error => {
        const errorMessage = error.message;
        dispatch(fetchTeamMembersFailure(errorMessage));
      });
  };
};

// Create team member action creators
export const createTeamMemberRequest = () => ({
  type: CREATE_TEAM_MEMBER_REQUEST,
});

export const createTeamMemberSuccess = teamMember => ({
  type: CREATE_TEAM_MEMBER_SUCCESS,
  payload: teamMember,
});

export const createTeamMemberFailure = error => ({
  type: CREATE_TEAM_MEMBER_FAILURE,
  payload: error,
});

// Asynchronous action to create a team member
export const createTeamMember = teamMemberData => {
  return dispatch => {
    dispatch(createTeamMemberRequest());
    axios.post('/api/v1/team-members', teamMemberData)
      .then(response => {
        const newTeamMember = response.data;
        dispatch(createTeamMemberSuccess(newTeamMember));
      })
      .catch(error => {
        const errorMessage = error.message;
        dispatch(createTeamMemberFailure(errorMessage));
      });
  };
};

// Delete team member action creators
export const deleteTeamMemberRequest = () => ({
  type: DELETE_TEAM_MEMBER_REQUEST,
});

export const deleteTeamMemberSuccess = teamMemberId => ({
  type: DELETE_TEAM_MEMBER_SUCCESS,
  payload: teamMemberId,
});

export const deleteTeamMemberFailure = error => ({
  type: DELETE_TEAM_MEMBER_FAILURE,
  payload: error,
});

// Asynchronous action to delete a team member
export const deleteTeamMember = teamMemberId => {
  return dispatch => {
    dispatch(deleteTeamMemberRequest());
    axios.delete(`/api/team-members/${teamMemberId}`)
      .then(() => {
        dispatch(deleteTeamMemberSuccess(teamMemberId));
      })
      .catch(error => {
        const errorMessage = error.message;
        dispatch(deleteTeamMemberFailure(errorMessage));
      });
  };
};

// Update team member action creators
export const updateTeamMemberRequest = () => ({
  type: UPDATE_TEAM_MEMBER_REQUEST,
});

export const updateTeamMemberSuccess = teamMember => ({
  type: UPDATE_TEAM_MEMBER_SUCCESS,
  payload: teamMember,
});

export const updateTeamMemberFailure = error => ({
  type: UPDATE_TEAM_MEMBER_FAILURE,
  payload: error,
});

// Asynchronous action to update a team member
export const updateTeamMember = (teamMemberId, teamMemberData) => {
  return dispatch => {
    dispatch(updateTeamMemberRequest());
    axios.put(`/api/team-members/${teamMemberId}`, teamMemberData)
      .then(response => {
        const updatedTeamMember = response.data;
        dispatch(updateTeamMemberSuccess(updatedTeamMember));
      })
      .catch(error => {
        const errorMessage = error.message;
        dispatch(updateTeamMemberFailure(errorMessage));
      });
  };
};
