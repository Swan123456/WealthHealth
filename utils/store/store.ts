import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "redux"
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist"
// import storage from 'redux-persist/lib/storage'
import createWebStorage from "redux-persist/lib/storage/createWebStorage"
import employeesSlice from "../store/employees/EmployeesSlice"

const createNoopStorage = () => {
	return {
		getItem(_key: any) {
			return Promise.resolve(null)
		},
		setItem(_key: any, value: any) {
			return Promise.resolve(value)
		},
		removeItem(_key: any) {
			return Promise.resolve()
		},
	}
}
const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage()

const persistConfig = {
	key: "root",
	version: 1,
	storage,
}

const rootReducer = combineReducers({
	employees: employeesSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
