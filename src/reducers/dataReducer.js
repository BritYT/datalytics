
export default function dataReducer(state=[], action) {
    switch (action.type) {
        case 'UPDATE_DASHBOARD':
            return {...state, user: action.payload};
        case 'UPDATE_CHANNEL_STATS':
            return {...state, channelStats: action.payload.subscriberCount}
        case 'GOT_ALL_VIDEO_DATA':
            return {...state, videos: action.payload}   
        case 'UPDATE_WATCH_PERCENTAGE':
            return {...state, averageWatchPercentage: action.payload } 
        default:
            return state
    } 
}