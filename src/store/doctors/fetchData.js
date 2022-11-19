import {
  fetchDoctorRequest,
  fetchDoctorSuccess,
  fetchDoctorError,
  updateFilterRequest
} from "./action";

export function getDoctorList(params) {
  return dispatch => {
    dispatch(fetchDoctorRequest());
    fetch("https://run.mocky.io/v3/c9a2b598-9c93-4999-bd04-0194839ef2dc")
      .then(response => {
        return response.json();
      })
      .then(responseData => {
        const { keyword, page, limit, hospital, specialization } = params;
        let { data } = responseData;
        let tempHospital = [];
        data.forEach(({ hospital }) => {
          hospital.forEach(el => tempHospital.push(el.name))
        });
        const getHospital = tempHospital.filter((v, i, a) => a.indexOf(v) === i).map(name => ({ value: name }));
        const getSpecialization = [...new Set(data.map(item => item.specialization.name))].map(name => ({ value: name }));
        
        if (keyword) { // Filter Keyword
          const regex = new RegExp(`${keyword.toLowerCase()}`);
          data = data.filter(x => regex.test(x.name.toLowerCase()));
        };

        if (specialization.length !== 0) { // Filter specialization
          data = data.filter(x => specialization.includes(x.specialization.name));
        };

        if (hospital.length !== 0) { // Filter hospital
          let temp = [];
          data.forEach(el => {
            el.hospital.forEach(x => hospital.includes(x.name) ? temp.push(el) : null)
          });
          data = temp;
        };

        const selectedData = data.slice((page - 1) * limit, page * limit);
        const doctorData = { 
          data, 
          selectedData, 
          specialization: getSpecialization, 
          hospital: getHospital
        };
        dispatch(fetchDoctorSuccess(doctorData));
      })
      .catch(error => {
        dispatch(fetchDoctorError(error))
      })
  }
}