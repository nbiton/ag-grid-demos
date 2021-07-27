export const persistToQueryParam = (paramName, value) => {
    const stateString = encodeURIComponent(value);
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + `?${paramName}=${stateString}`;
    window.history.pushState({path:newUrl},'',newUrl);
};