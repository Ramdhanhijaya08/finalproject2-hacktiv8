import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    user:[],
    token:'',
    loading:false,
    error:'',
};

const loginUsers = createAsyncThunk('user/loginUsers',() => {
    axios.get(`https://fakestoreapi.com/users`)
    .then((response) => response.data.map((user)=>user.id));
})


const authSlice = createSlice ({
    name: 'user',
	initialState,
	reducers: {

        addToken:(state,action)=> {
            state.token = localStorage.getItem("token")
        },
        addUser: (state, action)=> {
            state.user = localStorage.getItem("user")
        },
        logout: (state, action)=> {
            state.token = null;
            localStorage.clear();
        },

    },
	extraReducers: {
		[loginUsers.pending]: (state, action) => {
			state.loading = true;
            state.users = action.payload;
		},
		[loginUsers.fulfilled]: (state, action) =>{
			state.loading = false;
            state.token = token;
            state.users = action.payload.name;
			state.error = '';

            localStorage.setItem('user',user)
            localStorage.setItem('token',token)
		},
		[loginUsers.rejected]: (state, action) => {
			state.loading = true;
            state.users = [];
            state.error = action.error.massage;
		},
    },
 });


export const {addToken,addUser,logout} = authSlice.actions;

export const selectUser = state => state.login.users;
export default authSlice.reducer;
 