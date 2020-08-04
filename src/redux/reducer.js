const initialState = {
    user : 'Shekhar',
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
    }
    return state
}

export default Reducer