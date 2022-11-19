import {
  FETCH_DOCTOR_REQUEST,
  FETCH_DOCTOR_SUCCEESS,
  FETCH_DOCTOR_ERROR,
  UPDATE_FILTER_REQUEST
} from "./types";

const initialState =  {
  loading: false,
  data: [],
  selectedData: [],
  uniqueSpecialization: [],
  uniqueHospital: [],
  filter: {
    keyword: "",
    limit: 10,
    page: 1,
    hospital: [],
    specialization: []
  },
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DOCTOR_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_DOCTOR_SUCCEESS: {
      const { payload } = action;
      return {
        ...state,
        loading: false,
        data: payload.data,
        selectedData: payload.selectedData,
        uniqueSpecialization: payload.specialization,
        uniqueHospital: payload.hospital,
      }
    }
    case FETCH_DOCTOR_ERROR:
      return {
        ...state
      }
    case UPDATE_FILTER_REQUEST:
      return {
        ...state
      }
    default:
      return state;
  }
}

export default reducer;