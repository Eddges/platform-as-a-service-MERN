const initialState = {
    user : 'Shekhar',
    userToken : '',
    tasks : ["Pet a cat", "Kill spiderman", "Destroy robots", "Resurrect Jesus"]
}

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REMOVE_TASK' : 
            const newTasks = state.tasks.filter((iterator, index) => {
                return index!==action.index
            }) 
            console.log(newTasks)
            return {
                ...state,
                tasks : newTasks
            }

        case 'ASSIGN_TOKEN' : 
            console.log(action.token)
            return{
                ...state,
                userToken : action.token
            }
    }
    return state
}

export default Reducer