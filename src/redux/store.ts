import { configureStore } from "@reduxjs/toolkit"
import sidebarReducer from "./features/sidebarSlice"

import apiReducer, { gamesApi } from "./features/apiSlice"

export const store = configureStore({
	reducer: {
		gamesApi: apiReducer,
		sidebar: sidebarReducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(gamesApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
