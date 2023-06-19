import {API} from "../api/Api";
import axios from 'axios';
const getCampaignsApi = async (campaigns_id) =>{
    const cookie = document.cookie
    const response = await fetch(API['getCampaigns']+`${campaigns_id}/`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
             Cookie: cookie
        },
        credentials: 'include',
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}



const uploadCSVApi = async (file, tableName, onUploadSuccess, onUploadError) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('table_name', tableName); // Include this line to append the tableName

    try {
        const response = await axios.post(API['uploadCSVData'], formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        // Call the success callback with the response data
        onUploadSuccess(response.data);

    } catch (error) {
        // Call the error callback with the error message
        onUploadError(error.message);
    }
};

export {getCampaignsApi,uploadCSVApi}
