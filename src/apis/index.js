import axios from "axios";

const BASE_URL = 'https://aircall-backend.onrender.com';

/**
 * Retrieve all calls
 * @returns  Promise<AxiosResponse<any, any> | { error: boolean;}>
 */
export async function retrieveCalls() {
    try {
        const result = await axios.get(`${BASE_URL}/activities`);
        return result;
    } catch (error) {
        return { error: true }
    }
}

/**
 * Retrieve call by id
 * @param {string} id 
 * @returns  Promise<AxiosResponse<any, any> | { error: boolean;}>
 */
export async function retrieveCall(id) {
    try {
        const result = await axios.get(`${BASE_URL}/activities/${id}`);
        return result;
    } catch (error) {
        return { error: true }
    }
}
/**
 * Archive All calls
 * @returns Promise<{  data: (AxiosResponse<any, any> | { error: boolean; })[];
    error?: undefined; } | {
    error: boolean;
    data?: undefined;}>
 */
export async function archiveAllCalls() {
    //Since no single resource is provided for archive all, I looped through all unarchived calls and archived each 
    try {
        const resultCalls = await retrieveCalls();


        if (resultCalls.status === 200 && Array.isArray(resultCalls.data) && resultCalls.data.length > 0) {
        
            const archiveRequest = []
   
            for (let i = 0; i < resultCalls.data.length; i++) {

                const call = resultCalls.data[i];

                try {
                    //only archive calls that are unarchived
                    if (!call.is_archived) {
                        archiveRequest.push(archiveCall(call.id, { is_archived: true }));
                    }
                } catch (error) {
                    //not expected, but if one fails, allow loop to continue
                }

            }
   
            const allResults = await Promise.all(archiveRequest);
    
            return {data:allResults}

        }


        return { error: true }

    } catch (error) {

        return { error: true };

    }
}

/**
 * Archive call by id
 * @param {*} id 
 * @param {*} payload 
 * @returns 
 */

export async function archiveCall(id, payload) {
    try {

        const result = await axios.patch(`${BASE_URL}/activities/${id}`, payload);
        return result;

    } catch (error) {
        return { error: true }
    }
}

/**
 * Reset al call
 * @returns  Promise<AxiosResponse<any, any> | { error: boolean;}>
 */
export async function resetCalls() {
    try {

        const result = await axios.patch(`${BASE_URL}/reset`);
        return result;

    } catch (error) {

        return { error: true }

    }
}