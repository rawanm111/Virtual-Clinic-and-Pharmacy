export const baseUrl = 'http://localhost:3000';

export const postRequest = async(url, body) => {
    const response = await fetch(`${baseUrl}${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    const data = response.json();

    if(!response.ok) {
        let message;
        if(data?.message) {
            message = data.message;
        }
        else {
            message = data;
        }
        return {error:true, message};
    }
    return data;
};

export const getRequest = async(url) => {
    const response = await fetch(`${baseUrl}${url}`);
    const data = response.json();

    if(!response.ok) {
        let message="an error occured";
        if(data?.message) {
            message = data.message;
        }
        else {
            message = data;
        }
        return {error:true, message};
    }
    return data;
};

