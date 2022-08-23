 export const getEntries = (token) =>   async (dispatch) => {
      const getData = async () => {
        try{
            const response = await fetch("/api/entry/fetch", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `bearer ${token}`
                },
            });
            if(!response){
                throw new Error("something went wrong")
            } 
            const data = await response.json() 
            return data.entries
        }
        catch(e){
            console.log(e)
        }
      }
    try{
        const entriesData = await getData()
        dispatch({type: "LOAD_ITEMS", payload: entriesData})

    }
    catch(e) {
        console.log(e)
        // add an error dispatch
    }
    
    
}

export const addEntry = (data, token) => async (dispatch) => {
    const sendData = async () => {
        try{
            const response = await fetch("/api/entry/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `bearer ${token}`
                },
                body: JSON.stringify(data)
            })
            if(!response){
                throw new Error("something went wrong")
            } 
            const resData = await response.json()
             if(!resData.entry) {
                return 
            } 
            return resData.entry
        }
        catch(e) {
            console.log(e)
        }

    }
    try{
        const entry = await sendData()
        console.log(entry)
        if(!entry) {
            throw new Error("something went wrong")
        }
        else{
            dispatch({type:"ADD_ENTRY", payload: entry})
        }
        
        
    }
    catch(e) {
        console.log(e)
    }
}

export const deleteEntry = (id, token) => async (dispatch) => {
    const sendData = async () => {
        const response = await fetch(`/api/entry/delete/${id}`, {
            method:"DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${token}`
            },
        })
        return  await response.json()
    }
    try{
        await sendData()
        dispatch({type:"DELETE_ENTRY", payload:id})
    }
    catch(e) {
        console.log(e)
    }
}

export const searchEntries = (searchTerms, token) => async (dispatch) => {
    const sendData = async () => {
        const response = await fetch(`/api/entry/search${searchTerms}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${token}`
            }, 
        })
        return await response.json()
    }
    try{
       const entries = await sendData()
        dispatch({type: "SET_SEARCH_ITEMS", payload: entries})

    }
    catch(e) {
        console.log("in catch")
        console.log(e)
    }
}

// update entry
export const updateEntry = (data, token, id) => async (dispatch) => {
    const sendData = async () => { 
        const response = await fetch(`/api/entry/update/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${token}`
            }, 
            body: JSON.stringify(data)
            
        })
        return await response.json()
    }

    try{
        const entry = await sendData()
        dispatch({type:"UPDATE_ENTRY", payload:entry })
    }
    catch(e) {
        console.log(e)
    }
}