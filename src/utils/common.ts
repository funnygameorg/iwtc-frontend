export const getKeyByValue = (obj: any, value: string) => {
    if (Object.keys(obj)) return true;
    return false;
};

export const getEncodedArray = (myArray) => {
    const encodedArray = myArray.map((element) => {
        return encodeURIComponent(element);
    });
    console.log('encodedArray', encodedArray);
    return encodedArray;
};
