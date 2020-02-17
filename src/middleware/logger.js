// EMG - logger will show us any time an action is dispatched, as well as what the new state is
// going to be after it is dispatched
const logger = (store) => (next) => (action) => {
    console.group(action.type)
        console.log('The action is: ', action)
        // EMG - next is going to be dispatch, which will update the state
        const returnValue = next(action)
        console.log('The new state is: ', store.getState())
    console.groupEnd()
    return returnValue
}

export default logger