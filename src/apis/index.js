import axios from "axios";

const BASE_URL = 'https://aircall-backend.onrender.com';
export async function retrieveCalls() {
    try {
        const result = await axios.get(`${BASE_URL}/activities`);
        return result;
    } catch (error) {
        return { error: true }
    }
}

export async function retrieveCall(id) {
    try {
        const result = await axios.get(`${BASE_URL}/activities/${id}`);
        return result;
    } catch (error) {
        return { error: true }
    }
}
export async function archiveAllCalls(id,payload) {
    try {
        const result = await axios.patch(`${BASE_URL}/activities${id}`, payload);
        return result;
    } catch (error) {
        return { error: true }
    }
}

export async function archiveCall(id,payload) {
    try {
        const result = await axios.patch(`${BASE_URL}/activities/${id}`,payload);
        return result;
    } catch (error) {
        return { error: true }
    }
}

export async function resetCalls() {
    try {
        const result = await axios.patch(`${BASE_URL}/reset`);
        return result;
    } catch (error) {
        return { error: true }
    }
}