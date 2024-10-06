// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const errorFormatter = (error: any) => {
    try {
        const formattedMessage = error.response.data.message
            .replace(/'/g, '"') 
            .replace(/([a-zA-Z0-9_]+):/g, '"$1":'); 
        
        const errorResponse = JSON.parse(formattedMessage); 
        
        return errorResponse 
    } catch (err) {
        console.error('Error parsing the response', err);
    }
}