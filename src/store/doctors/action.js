import {
  FETCH_DOCTOR_REQUEST,
  FETCH_DOCTOR_SUCCEESS,
  FETCH_DOCTOR_ERROR,
  UPDATE_FILTER_REQUEST
} from "./types";

export function fetchDoctorRequest() {
  return {
    type: FETCH_DOCTOR_REQUEST
  }
};

export function fetchDoctorSuccess(data) {
  return {
    type: FETCH_DOCTOR_SUCCEESS,
    payload: data
  }
};

export function fetchDoctorError(error) {
  return {
    type: FETCH_DOCTOR_ERROR,
    payload: { error }
  }
};

export function updateFilterRequest(params) {
  return {
    type: UPDATE_FILTER_REQUEST,
    payload: params
  }
};