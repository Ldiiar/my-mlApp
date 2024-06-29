import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    avatar: '',
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        changeAvatar: (state, action) => {
            state.avatar = action.payload
        }
    }
})

export default profileSlice.reducer
export const {changeAvatar} = profileSlice.actions