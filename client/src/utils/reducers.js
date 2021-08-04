import { useReducer } from "react";
import {
    UPDATE_BABYSITTER_PHOTO
  } from "./actions";


export const reducer = (state, action) => {
    switch (action.type) {
        case UPDATE_BABYSITTER_PHOTO:
            return {
                ...state,
                itemPreview: {...action.itemPreview}
            };
            
        default:
            return state;
    }
};
      
export function useBabysitterReducer(initialState) {
    return useReducer(reducer, initialState)
};