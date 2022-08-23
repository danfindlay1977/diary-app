import {useState, useCallback} from "react"

const useHttp =  () => {
const [isError, setError] = useState(null)
const [isLoading, setLoading] = useState(false)
const sendRequest =  useCallback(async (requestConfig, applyData) => {
    setError(null)
    setLoading(false)
    try{ 
        const response = await fetch(requestConfig.url, {
            method: requestConfig.method ? requestConfig.method : "GET",
            headers: requestConfig.headers ? requestConfig.headers : {},
            body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
        })
        if(!response.ok) {
            throw new Error("something went wrong")
        }
        const data = await response.json()
        applyData(data)
    }
    catch(error) {
        setError(error.message || "something went wrong")
    }
    setLoading(false)

}, [])
    return {
        isError,
        isLoading,
        sendRequest
    }
}
export default useHttp