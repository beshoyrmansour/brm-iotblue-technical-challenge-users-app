import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserPost } from "../../Types/User";

interface UsersState {
    users: Array<User>;
    userPosts: Array<UserPost>;
    SelectedUser: User | null;
    isLoading: boolean;
}

const initialState: UsersState = {
    users: [],
    userPosts: [],
    SelectedUser: null,
    isLoading: true,
}

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        /**
         * 
         */
        setIsLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        setUsersList(state, action: PayloadAction<Array<User>>) {
            /**
             * I know this is New so DON'T WORRY 👇
             * the state is still immutable 🥳
             * Redux toolkit is using Immer to track the changes 🤷‍♂️
             */
            state.isLoading = false;
            state.users = action.payload;
            state.SelectedUser = null;
        },
        setMoreUsersList(state, action: PayloadAction<Array<User>>) {
            state.isLoading = false;
            state.users = [...state.users, ...action.payload];
            state.SelectedUser = null;
        },

        setUserDetails(state, action: PayloadAction<User>) {
            state.isLoading = false;
            state.SelectedUser = action.payload;
        },

        setUserPostsList(state, action: PayloadAction<Array<UserPost>>) {
            state.isLoading = false;
            state.userPosts = action.payload;
        },
        setMoreUserPostsList(state, action: PayloadAction<Array<UserPost>>) {
            state.isLoading = false;
            state.userPosts = [...state.userPosts, ...action.payload];
        }
    }
})

export const { setUsersList, setUserPostsList, setUserDetails, setIsLoading, setMoreUsersList, setMoreUserPostsList } = userSlice.actions;

export default userSlice.reducer;