// EMG - This file will export an invokation of applyMiddleware
import thunk from 'redux-thunk'
import logger from './logger'
import { applyMiddleware } from 'redux'

export default applyMiddleware(
    thunk,
    logger,
)
