import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type ProfileState = {
    avatar: string,
}


const initialState:ProfileState = {
    avatar: '',
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        changeAvatar: (state, action: PayloadAction<string>) => {
            state.avatar = action.payload
        }
    }
})

export default profileSlice.reducer
export const {changeAvatar} = profileSlice.actions