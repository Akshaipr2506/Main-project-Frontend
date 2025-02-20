import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"

// user register api
export const userRequestApi= async(reqBody)=>{
    return await commonApi("POST",`${serverUrl}/userregister`,reqBody,"")
}

//user login
export const userLoginApi= async(reqBody)=>{
    return await commonApi("POST",`${serverUrl}/userlogin`,reqBody,"")
}

//service register
export const serviceRegisterApi = async(reqBody)=>{
    return await commonApi("POST",`${serverUrl}/service-register`,reqBody,"")
}

//service login
export const serviceLoginApi = async(reqBody)=>{
    return await commonApi("POST",`${serverUrl}/servicelogin`,reqBody,"")
}

//add reg details
export const addRegDetailsApi = async(reqBody,reqHeader)=>{
    return await commonApi("POST",`${serverUrl}/regDetails`,reqBody,reqHeader) 
}

//edit service details
export const editServiceApi=async(id,reqBody,reqHeader)=>{
    return await commonApi('PUT',`${serverUrl}/update-servicer/${id}`,reqBody,reqHeader)
}

//get all servicer
export const getServicersApi=async(searchKey,reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/getallservicer?search=${searchKey}`,"",reqHeader)
}

//send request
export const reqApi =async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/request`,reqBody,"")
}

//get servicer requests
export const getServiceRequestApi=async(reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/service-requests`,"",reqHeader)
}

//get user req
export const getUserRequestApi=async(id)=>{
    return await commonApi('GET',`${serverUrl}/user-requests/${id}`,"",)
}

export const handlestatusapi =async(id,reqBody)=>{
    return await commonApi('PUT',`${serverUrl}/updatestatus/${id}`,reqBody)
}

//getusers to admin
export const getAdminUserApi=async()=>{
    return await commonApi('GET',`${serverUrl}/getadminusers`,"")
}

//get admin servicers
export const getAdminServicerApi=async()=>{
    return await commonApi('GET',`${serverUrl}/getadminservicers`,"")
}

//approval api
export const servicerApprovalApi=async(id,reqBody)=>{
    return await commonApi("PUT",`${serverUrl}/user-approval/${id}`,reqBody)
}

//send feedback
export const sendFeedbackApi =async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/feeds`,reqBody,"")
}

//get feedbacks
export const getFeedApi=async(reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/get-feeds`,"",reqHeader)
}

//admin login
export const adminLoginApi= async(reqBody)=>{
    return await commonApi("POST",`${serverUrl}/loginadmin`,reqBody,"")
}
export const getFeedBackApi=async(id,reqHeader)=>{
    return await commonApi("GET",`${serverUrl}/getfeedbacks/${id}`,'',reqHeader)
}