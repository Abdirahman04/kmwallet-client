const urlTemp = "http://127.0.0.1:9090/kmwallet/"

function optionObj(methodString: string, bodyObj: Object): RequestInit {
    return {
        method: methodString,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyObj)
    }
}

export function getData(path: string) {
    let url = urlTemp + path;
    
    return fetch(url);
}

export function postData(path: string, body: Object) {
    const url = urlTemp + path;

    const options: RequestInit = optionObj("POST", body);

    return fetch(url, options)
}

export function putData(path: string, body: Object) {
    const url = urlTemp + path;

    const options: RequestInit = optionObj("PUT", body);

    return fetch(url, options)
}

export function deleteData(path: string) {
    const url = urlTemp + path;

    return fetch(url);
}