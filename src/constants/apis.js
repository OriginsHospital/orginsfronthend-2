import { API_ROUTES } from './constants'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'

export const getLoggedUserInfo = async token => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Access-Control-Allow-Origin', '*')
  myHeaders.append('Access-Control-Allow-Credentials', true)

  const response = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + API_ROUTES.LOGGED_USER_INFO,
    {
      method: 'GET',
      headers: myHeaders,
      credentials: 'include',
    },
  )

  return response.json()
}

export const getNewAccessToken = async token => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Access-Control-Allow-Origin', '*')
  myHeaders.append('Access-Control-Allow-Credentials', true)

  const response = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + API_ROUTES.GET_NEW_ACCESS_TOKEN,
    {
      method: 'GET',
      headers: myHeaders,
      credentials: 'include',
    },
  )

  return response.json()
}

export const getUsersList = async (token, isvalidusers) => {
  // console.log(token, isvalidusers)
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  // myHeaders.append("Access-Control-Allow-Origin", "*");
  myHeaders.append('Access-Control-Allow-Credential', 'true')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.USERS_LIST}?page=${1}`,
    {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        isVerified: isvalidusers,
      }),
      redirect: 'follow',
      credentials: 'include',
    },
  )
  const data = await response.json()
  // if (data.status !== 200) {
  //     handleLogout()
  // }
  // console.log(data);
  // .then(response => response.json())
  // .then(res => {
  //     console.log(res.data.users)
  //     //  setRows(res.data.users)
  //     return res.data.users
  // })
  // .catch(error => {
  //     console.error(error);
  // });
  return data
}

export const getValidUsersList = async token => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Access-Control-Allow-Credential', 'true')

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_VALID_USERS}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  const data = await response.json()
  return data
}

export const getRoles = async () => {
  // const myHeaders = new Headers();
  // myHeaders.append("Content-Type", "application/json");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_ROLES}`,
    {
      method: 'GET',
      // headers: myHeaders,
      redirect: 'follow',
      // credentials: 'include'
    },
  )
  const data = await response.json()
  // console.log(data);

  return data
}
export const getModules = async () => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`)

  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_MODULES}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  const data = await response.json()
  // console.log("modules list", data);
  return data
}
export const getRoleDetails = async roleid => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_ROLE_DETAIL}/${roleid}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  const data = await response.json()
  // console.log("role details", data);
  return data
}

// export const validateUser = async (payload) => {
//     console.log('validating', Permissions)
//     const myHeaders = new Headers();
//     myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
//     myHeaders.append("Content-Type", "application/json");
//     const raw = JSON.stringify(payload);

//     const requestOptions = {
//         method: "PUT",
//         headers: myHeaders,
//         body: raw,
//         redirect: "follow",
//         credentials: 'include'
//     };

//     fetch("https://13.234.149.138:3000/users/updateUserDetails", requestOptions)
//         .then((response) => response.json())
//         .then((result) => console.log(result))
//         .catch((error) => console.error(error));

// }
export const getUserDetails = async userid => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_USER_DETAILS}/${userid}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  const data = await response.json()
  console.log('user details', data)
  return data
}

export const validateUser = async (row, Permissions) => {
  console.log('validating', Permissions)
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`)
  myHeaders.append('Content-Type', 'application/json')
  const raw = JSON.stringify({
    id: row?.id,
    isAdminVerified: 1,
    roleDetails: row?.roleDetails,
    //   isBlocked: 0,
    // roleDetails: row.roleDetails,
    branchDetails: row?.branchDetails,
    moduleList: Permissions,
  })

  const requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
    credentials: 'include',
  }
  // console.log(raw)
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.VALIDATE_USER}`,
    requestOptions,
  )
  // .then((response) => response.json())
  // .then((result) => console.log(result))
  // .catch((error) => console.error(error));
  const data = await response.json()
  // console.log(data)
  return data
}

export const logout = async token => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.LOGOUT}`,
    {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )

  return response.json()
}
export const closeVisit = async (token, appointmentId) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.CLOSE_VISIT}/${appointmentId}`,
    {
      method: 'PUT',
      headers: myHeaders,
      credentials: 'include',
    }
  )
  return response.json()
}

export const getAllPatients = async (token, searchValue) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_PATIENTS}?searchQuery=${searchValue}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )

  return response.json()
}

export const getPatientTreatmentCycles = async (token, searchValue) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_PATIENT_TREATMENTCYCLES}?searchQuery=${searchValue}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )

  return response.json()
}

export const getDonarInformation = async token => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_DONAR_INFORMATION}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )

  return response.json()
}

export const getDonarDataByVisit = async (token, visitId) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_DONAR_DATA_BY_VISIT}/${visitId}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )

  return response.json()
}

export const saveDonarRecord = async (token, payload) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)

  const body = new FormData()
  Object.keys(payload).forEach(key => {
    if (payload[key]) {
      body.append(key, payload[key])
    }
  })

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: body,
    redirect: 'follow',
    credentials: 'include',
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.SAVE_DONAR_RECORD}`,
    requestOptions,
  )
  return response.json()
}

export const updateDonarRecord = async (token, payload) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)

  const body = new FormData()
  Object.keys(payload).forEach(key => {
    if (payload[key]) {
      body.append(key, payload[key])
    }
  })

  const requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: body,
    redirect: 'follow',
    credentials: 'include',
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.EDIT_DONAR_RECORD}`,
    requestOptions,
  )
  return response.json()
}

export const deleteDonorFile = async (token, payload) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.DELET_DONOR_FILE}`,
    {
      method: 'DELETE',
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

export const getDropdowns = async token => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_DROPDOWNS}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

export const getPatientByAadharOrMobile = async (token, searchValue) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_PATIENTS_BY_AADHAAR_OR_MOBILE}/${searchValue}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

export const getCities = async function(token, stateId) {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_CITIES}${stateId}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}
export const createPatientRecord = async (
  token,
  payload,
  file,
  // uploadedDocuments,
) => {
  const formData = new FormData()
  const { aadhaarCard, marriageCertificate, affidavit, ...rest } = payload

  Object.keys(rest).forEach(key => {
    if (typeof payload[key] === 'object') {
      formData.append(key, JSON.stringify(payload[key]))
    } else {
      formData.append(key, payload[key])
    }
  })

  if (file) formData.append('file', file)
  if (typeof aadhaarCard === 'object') {
    formData.append('aadhaarCard', aadhaarCard)
    // console.log(aadhaarCard)
  }
  if (typeof marriageCertificate === 'object') {
    formData.append('marriageCertificate', marriageCertificate)
  }
  if (typeof affidavit === 'object') {
    formData.append('affidavit', affidavit)
  }

  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formData,
    redirect: 'follow',
    credentials: 'include',
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.CREATE_PATIENT_RECORD}`,
    requestOptions,
  )

  return response.json()
}

export const editPatientRecord = async (
  token,
  payload,
  file,
  // uploadedDocuments,
) => {
  const formData = new FormData()
  const { aadhaarCard, marriageCertificate, affidavit, ...rest } = payload
  Object.keys(rest).forEach(key => {
    // console.log(key, payload[key])
    if (typeof payload[key] === 'object') {
      formData.append(key, JSON.stringify(payload[key]))
    } else {
      formData.append(key, payload[key])
    }
  })
  // console.log(typeof file)
  if (file && typeof file == 'object') formData.append('file', file)
  if (aadhaarCard && typeof aadhaarCard === 'object') {
    formData.append('aadhaarCard', aadhaarCard)
    // console.log(aadhaarCard)
  }
  if (marriageCertificate && typeof marriageCertificate === 'object') {
    formData.append('marriageCertificate', marriageCertificate)
  }
  if (affidavit && typeof affidavit === 'object') {
    formData.append('affidavit', affidavit)
  }
  // console.log(formData, file, uploadedDocuments)
  // if (uploadedDocuments?.length > 0) {
  //   uploadedDocuments.forEach(eachDoc =>
  //     typeof file == 'object' ? formData.append('uploadedDocuments', eachDoc) : eachDoc
  //   )
  // }
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)

  const requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: formData,
    redirect: 'follow',
    credentials: 'include',
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.EDIT_PATIENT_RECORD}`,
    requestOptions,
  )

  return response.json()
}
export const getPackageData = async (token, visitId) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_PACKAGE_DATA}/${visitId}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}
//create package
export const createPackage = async (token, payload) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.CREATE_PACKAGE}`,
    {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}
//edit package
export const editPackage = async (token, payload) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.EDIT_PACKAGE}`,
    {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}
export const editGuardianRecord = async (token, payload) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.EDIT_GUARDIAN_RECORD}`,
    {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}
export const createGuardianRecord = async (token, payload) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.CREATE_GUARDIAN_RECORD}`,
    {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}
export const getVisitsByPatientId = async (token, patientId) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_VISIT_BY_PATIENTID}/${patientId}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

export const createVisit = async (token, payload) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.CREATE_VISIT}`,
    {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}
export const getVisitInfoById = async (token, visitId) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_VISIT_INFO}/${visitId}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

export const getDoctorsList = async token => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_DOCTORS_LIST}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

export const saveBlockedTimeSlots = async (token, payload) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.SAVE_BLOCKED_TIME_SLOTS}`,
    {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

export const getBlockedTimeSlots = async (token, payload) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_BLOCKED_TIME_SLOTS}`,
    {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

export const saveDoctorAvailability = async (token, payload) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.SAVE_DOCTOR_AVAILABILITY}`,
    {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

export const getDoctorsForAvailability = async token => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_DOCTORS_FOR_AVAILABILITY}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

export const createConsultationOrTreatment = async (token, payload) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.CREATE_CONSULTATION_OR_TREATMENT}`,
    {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}
// /api/getTreatmentTypes
export const getTreatmentTypes = async token => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_TREATMENT_TYPES}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}
// GET_APPOINTMENTS_REASONS_LIST
export const getAllAppointmentsReasons = async (token, type, id) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_APPOINTMENTS_REASONS_LIST}?type=${type}&id=${id}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

export const getAppointmentReasonsByPatientType = async (
  token,
  patientTypeId,
) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_APPOINTMENT_REASONS_BY_PATIENT_TYPE}?patientTypeId=${patientTypeId}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

export const bookConsultationAppointment = async (token, payload) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.BOOK_CONSULTATION_APPOINTMENT}`,
    {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}
export const bookReviewCallConsultationAppointment = async (token, payload) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.BOOK_REVIEW_CALL_CONSULTATION_APPOINTMENT}`,
    {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

export const bookTreatmentAppointment = async (token, payload) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.BOOK_TREATMENT_APPOINTMENT}`,
    {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}
export const getDoctorsForAvailabilityConsultation = async (token, date) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  let raw = JSON.stringify({ date: date })
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_CONSULTATION_DOCTORS_FOR_AVAILABILITY}`,
    {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

export const getDoctorsForAvailabilityTreatment = async (token, date) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  let raw = JSON.stringify({ date: date })
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_TREATMENT_DOCTORS_FOR_AVAILABILITY}`,
    {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

export const getAvailableConsultationSlots = async (token, payload) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_CONSULTATION_AVAILABLE_SLOTS}`,
    {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

export const getAvailableTreatmentSlots = async (token, payload) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_TREATMENT_AVAILABLE_SLOTS}`,
    {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}
export const getAppointmentsById = async (token, type, id) => {
  // console.log(`getAppointmentsById`, token, type, id)
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_APPOINTMENTS_BY_ID}/${id}?type=${type}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

export const editAppointment = async (token, payload) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.EDIT_APPOINTMENT}`,
    {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

export const getAllAppointmentsByDate = async (token, date, branchId) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_ALL_APPOINTMENTS_BY_DATE}/${date}?branchId=${branchId}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  // console.log('response####', response)
  return response.json()
}

export const changeAppointmentStatus = async (token, payload) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.CHANGE_APPOINTMENT_STAGE}`,
    {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

export const getAppointmentsForDoctor = async (token, date) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_APPOINTMENTS_BY_DATE}/${date}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

export const getTreatmentStatus = async (token, visitId, treatmentType) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_TREATMENT_STATUS}?visitId=${visitId}&treatmentType=${treatmentType}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

export const getTreatmentTemplate = async (token, treatmentStartDate) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_DEFAULT_TREATMENT_SHEET}/${treatmentStartDate}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}
export const updateTreatmentStatus = async (token, payload) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.UPDATE_TREATMENT_STATUS}`,
    {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}
export const updateTreatmentSheetByTreatmentCycleId = async (
  token,
  payload,
) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.UPDATE_TREATMENT_SHEET_BY_TREATMENT_CYCLE_ID}`,
    {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

export const getTreatmentSheetByTreatmentCycleId = async (
  token,
  treatmentCycleId,
) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_TREATMENT_SHEET_BY_TREATMENT_CYCLE_ID}/${treatmentCycleId}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

export const getPatientInformationForDoctor = async (
  token,
  patientId,
  appointmentId,
  type,
) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_PATIENT_INFORMATION_FOR_DOCTOR}/${patientId}?appointmentId=${appointmentId}&type=${type}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

export const getAppointmentsHistory = async (token, type, id, date) => {
  // type: Consultation | Treatment
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_APPOINTMENTS_HISTORY}?type=${type}&id=${id}&date=${date}`,

    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

export const getLineBills = async (token, type, id) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_LINE_BILLS}?createType=${type}&appointmentId=${id}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

export const saveLineBills = async (token, payload) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.SAVE_LINE_BILLS}`,
    {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}
export const getLineBillsAndNotesForAppointment = async (
  token,
  type,
  appointmentId,
) => {
  // type: Consultation | Treatment
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_LINEBILLS_AND_NOTES_FOR_APPOINTMENT}?createType=${type}&appointmentId=${appointmentId}`,

    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

export const saveLineBillsAndNotes = async (token, payload) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.SAVE_LINEBILLS_AND_NOTES_FOR_APPOINTMENT}`,
    {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

export const getBillTypeValuesByBillTypeId = (token, billTypeId, branchId) => {
  // type: Consultation | Treatment
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')

  return fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_BILLTYPE_VALUES}/${billTypeId}?branchId=${branchId}`,

    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
}
export const getAllLabTestsByDate = async (token, date, category, branchId) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_LABTESTS_BY_DATE}/${date}?labCategoryType=${category}&branchId=${branchId}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}
export const getAllLabTests = async (token, fromDate, toDate, branchId) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_ALL_LAB_TESTS}?fromDate=${fromDate}&&toDate=${toDate}&&branchId=${branchId}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

export const getLabTestsTemplate = async (
  token,
  labTestId,
  appointmentId,
  type,
  isSpouse,
) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_LABTEST_TEMPLATE}?id=${labTestId}&&appointmentId=${appointmentId}&&type=${type}&isSpouse=${isSpouse}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

export const saveLabTestResult = async (token, payload) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.SAVE_LABTEST_RESULT}`,
    {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}
export const saveOutsourcingLabTestResult = async (token, formData) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  // myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.SAVE_OUTSOURCING_LABTEST_RESULT}`,
    {
      method: 'POST',
      headers: myHeaders,
      body: formData,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

export const deleteOutsourcingLabTestResult = async (
  token,
  labTestResultId,
) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  // myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.DELETE_OUTSOURCING_LABTEST_RESULT}/${labTestResultId}`,
    {
      method: 'PUT',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

export const getSavedLabTestResult = async (
  token,
  type,
  appointmentId,
  labTestId,
  isSpouse,
) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_SAVED_LABTEST_RESULT}?type=${type}&appointmentId=${appointmentId}&labTestId=${labTestId}&isSpouse=${isSpouse}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

export const getLabTestsFields = async (token, labtestId) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_LABTESTS_FIELDS}/${labtestId}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

export const saveLabTestFieldValue = async (token, payload) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.SAVE_LABTEST_FIELD_VALUES}`,
    {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}
export const getSavedLabTestValues = async (
  token,
  type,
  appointmentId,
  labTestId,
) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_SAVED_LABTEST_VALUES}?type=${type}&appointmentId=${appointmentId}&labTestId=${labTestId}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

export const getProfileDetails = async token => {
  // call api
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_PROFILE_DETAILS}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

export const updateUserProfile = async (token, payload) => {
  // call api
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.UPDATE_USER_PROFILE}`,
    {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

export const getTaxCategories = async (token, payload) => {
  // call api
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_TAX_CATEGORIES}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

export const createPharmacyMasterData = async (token, payload, url) => {
  // call api
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`,
    {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}
export const editPharmacyMasterData = async (token, payload, url) => {
  // call api
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`,
    {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
      body: JSON.stringify(payload),
      credentials: 'include',
    },
  )
  return response.json()
}

export const getPharmacyMasterData = async (token, url) => {
  // call api
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

export const getPharmacyDetailsByDate = async (token, date, branch) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_PHARMACYITEMS_BY_DATE}?date=${date}&&branch=${branch}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

export const savePharmacyItems = async (token, payload) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.SAVE_PHARMACYITEMS}`,
    {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

export const getReportsByDate = async (token, fromDate, toDate, branch) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_REPORT_BY_DATE}/?fromDate=${fromDate}&&toDate=${toDate}&&branchId=${branch}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}
export const getItemSuggestionGRN = async (token, searchValue) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_ITEM_SUGESSIONS}${searchValue}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

export const saveGrnDetails = async (token, payload) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.SAVE_GRN_DETAILS}`,
    {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

export const getAllGrnData = async token => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_ALL_GRN_DATA}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}
export const getGrnDataById = async (token, id) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_GRN_BY_ID}/${id}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

export const getGRNReturnedHistory = async token => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.RETURN_GRN_HISTORY_LIST}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}
export const saveGrnReturn = async (token, payload) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.RETURN_GRN_ITEMS}`,
    {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

export const getOrderId = async (token, payload) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_ORDER_ID}`,
    {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

export const savePaymentBreakup = async (token, payload) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_PAYMENT_BREAKUP}`,
    {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

export const sendTransactionId = async (token, payload) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `
    ${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.SEND_TRANSACTION_DETAILS}`,
    {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}
export const getStockExpiryReport = async token => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_STOCK_EXPIRY_REPORT}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}
export const getPrescribedPurchaseReport = async token => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_PRESCRIBED_PURCHASE_REPORT}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}
export const getGrnVendorPaymentsReport = async token => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_GRN_VENDOR_PAYMENTS_REPORT}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

export const download_lab_reports = async (token, payload) => {
  //POST CALL
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.DOWNLOAD_LAB_REPORTS}`,
    {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

export const Generate_Invoice = async (token, payload) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GENERATE_INVOICE}`,
    {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

export const SaleReturnInfo = async (token, orderId) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.SALE_RETURN}/${orderId}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}
export const getPurchaseReturnInfo = async (token, orderId) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_PURCHASE_RETURN}/${orderId}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}
export const returnPurchasedItems = async (token, payload) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.RETURN_PURCHASED_ITEMS}`,
    {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}
export const getFormFReportByDateRange = async (token, fromDate, toDate) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_FORMF_REPORT_BY_DATE_RANGE}?fromDate=${fromDate}&&toDate=${toDate}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

export const getDailyReportSummary = async (token, { date, branchId }) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_DAILY_REPORT_SUMMARY}`,
    {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        date,
        branchId: Number(branchId) || branchId,
      }),
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

export const SalesReportDashboard = async (
  token,
  fromDate,
  toDate,
  branchId,
  paymentMode // optional: 'CASH'|'UPI' or undefined for all
) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.SALES_REPORT_DASHBOARD}`
  )
  url.searchParams.append('fromDate', fromDate)
  url.searchParams.append('toDate', toDate)
  url.searchParams.append('branchId', branchId)
  if (paymentMode) url.searchParams.append('paymentMode', paymentMode)

  const response = await fetch(url.toString(),
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}
export const ReturnItems = async (token, payload) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.RETURN_PHARMACY_ITEMS}`,
    {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}
export const getScanByDate = async (token, date, branchId) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_SCAN_BY_DATE}${date}?branchId=${branchId}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}
export const getSavedScanResults = async (
  token,
  type,
  appointmentId,
  scanId,
) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_SCAN_RRESULT}?appointmentId=${appointmentId}&scanId=${scanId}&type=${type}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}
export const getScanTemplate = async (token, scanId, appointmentId, type) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_SCAN_TEMPLATE}/${scanId}?type=${type}&appointmentId=${appointmentId}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}
export const SaveScanResult = async (token, payload) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.SAVE_SCAN_RESULT}`,
    {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}
export const getFormFTemplate = async token => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_FORMF}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
} //SAVE_GRN_PAYMENTS

export const saveGrnPayments = async (token, payload) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.SAVE_GRN_PAYMENTS}`,
    {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}
//GRN_SALES_REPORT

export const grnSalesReport = async token => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GRN_SALES_REPORT}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

//GRN_STOCK_REPORT

export const grnStockReport = async (token, branchId) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GRN_STOCK_REPORT}?branchId=${branchId}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

// GET_OT_LIST

export const getOtList = async (token, fromDate, toDate) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const queryParams = toDate
    ? `fromDate=${fromDate}&toDate=${toDate}`
    : `fromDate=${fromDate}`
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_OT_LIST}?${queryParams}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

export const getInjectionSheetList = async (token, fromDate, toDate) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const queryParams = toDate
    ? `fromDate=${fromDate}&toDate=${toDate}`
    : `fromDate=${fromDate}`
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_INJECTION_LIST}?${queryParams}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

export const getPersonSuggestion = async (token, payload) => {
  console.log(payload)
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_PERSONS_SUGGESTIONS}`,
    {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
      body: JSON.stringify(payload),
      credentials: 'include',
    },
  )
  return response.json()
}
export const getInjectionSuggestionList = async (token, itemName) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.GET_INJECTION_SUGGESTION_LIST}?itemName=${itemName}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    },
  )
  return response.json()
}

export const addNewOT = async (token, payload) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Content-Type', 'application/json')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.ADD_NEW_OT}`,
    {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
      body: JSON.stringify(payload),
      credentials: 'include',
    },
  )
  return response.json()
}