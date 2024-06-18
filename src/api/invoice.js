import axiosInstance, { endpoints } from 'src/utils/axios';
import { _mock } from 'src/_mock';

// ----------------------------------------------------------------------

export async function GetPatientHistoryData() {
  const URL = endpoints.patient.list;
  const AccidentURL = endpoints.patient.accident;
  let resultData = { patients: [], isError: false };
  await axiosInstance.get(URL).then((res) => {
    try {
      const patinets = res.data?.map((_, index) => ({
        id: _._id.$oid,
        patient_name: _.patient_name,
        doctor_name: _.doctor_name,
        collaborator_name: _.collaborator_name,
        facility: _.facility,
        visit_date: _.visit_date === 'Unknown' ? 'Unknown' : _.visit_date.$date,
        activity: _.activity,
        activity_summarized: _.activity_summarized,
        signer: _.signer,
        signed_date: _.signed_date === 'Unknown' ? 'Unknown' : _.signed_date.$date,
        summary: _.summary,
        file_name: _.file_name,
        page_number: _.page_number,
        status: 'all',
        icon: _.icon,
      }));
      resultData.patients = patinets;
      resultData.isError = false;
    } catch (err) {
      resultData.isError = true;
    }
  });
  await axiosInstance
    .get(AccidentURL)
    .then((res) => {
      try {
        if (res.data.status !== 'Failed') {
          const patient = {
            id: '1',
            patient_name: '',
            doctor_name: '',
            collaborator_name: '',
            facility: '',
            visit_date: res.data?.accident_date?.$date,
            activity: '',
            activity_summarized: 'Accident',
            signer: '',
            signed_date: res.data.signed_date === 'Unknown' ? 'Unknown' : res.data.signed_date.$date,
            summary: res.data.summary,
            file_name: res.data.file_name,
            page_number: res.data.page_number,
            status: 'all',
          };
          resultData.patients.unshift(patient);
        }
      } catch (err) {
        console.log(err);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return resultData;
}
export async function UpdatePatientHistoryData(data) {
  const URL = endpoints.patient.update;
  let resultData = { patients: [], isError: false };
  await axiosInstance.post(URL, { history: data }).then((res) => {
    try {
      console.log(res.data);
      resultData.patients = res.data;
      resultData.isError = false;
    } catch (err) {
      resultData.isError = true;
    }
  });

  return resultData;
}


export async function GetPatientHistoryById(id) {
  let resultData = { patient: {}, isError: false };
  await axiosInstance.get(endpoints.patient.history + '/' + id).then((res) => {
    try {
      let data = res.data;
      resultData.patient = {
        id: data._id.$oid,
        patient_name: data.patient_name,
        doctor_name: data.doctor_name,
        collaborator_name: data.collaborator_name,
        facility: data.facility,
        visit_date: data.visit_date === 'Unknown' ? 'Unknown' : data.visit_date.$date,
        activity: data.activity,
        signer: data.signer,
        signed_date: data.signed_date === 'Unknown' ? 'Unknown' : data.signed_date.$date,
        summary: data.summary,
        activity_summarized: data.activity_summarized,
        file_name: data.file_name,
        page_number: _.page_number,
        status: 'all',
      };
      resultData.isError = false;
    } catch (err) {
      resultData.isError = true;
    }
  });

  return resultData;
}

export async function GetPatientsList() {
  let resultData = { patients: [], isError: false };
  await axiosInstance.get(endpoints.patient.patients).then((res) => {
    try {
      resultData.patients = res.data;
      resultData.isError = false;
    } catch (err) {
      resultData.isError = true;
    }
  });

  resultData.isError = false;
  return resultData;
}

export async function GetPatientsHistoryByName(patient_name) {
  let resultData = { patients: [], isError: false };
  await axiosInstance.get(endpoints.patient.patientsHistory + '/' + patient_name).then((res) => {
    try {
      const patinets = res.data?.map((_, index) => ({
        id: _._id.$oid,
        patient_name: _.patient_name,
        doctor_name: _.doctor_name,
        collaborator_name: _.collaborator_name,
        facility: _.facility,
        visit_date: _.visit_date === 'Unknown' ? 'Unknown' : _.visit_date.$date,
        activity: _.activity,
        signer: _.signer,
        signed_date: _.signed_date === 'Unknown' ? 'Unknown' : _.signed_date.$date,
        summary: _.summary,
        file_name: _.file_name,
        page_number: _.page_number,
        status: 'all',
      }));
      resultData.patients = patinets;
      resultData.isError = false;
    } catch (err) {
      resultData.isError = true;
    }
  });

  return resultData;
}

export async function DeleteSummaryByIds(ids) {
  let resultData = { isError: false };
  await axiosInstance.post(endpoints.patient.deleteIds, { ids: ids }).then((res) => {
    try {
      resultData.isError = res.data.status == 'Success' ? false : true;
    } catch (err) {
      resultData.isError = true;
    }
  });
  return resultData;
}

export async function DeleteFilesByIds(ids) {
  let resultData = { isError: false };
  await axiosInstance.post(endpoints.files.deleteIds, { ids: ids }).then((res) => {
    try {
      resultData.isError = res.data.status == 'Success' ? false : true;
    } catch (err) {
      resultData.isError = true;
    }
  });
  return resultData;
}
