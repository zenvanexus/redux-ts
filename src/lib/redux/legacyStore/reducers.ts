import { Draft, produce } from "immer";
import { AppState } from "./state.types";
import { Action, AnyAction, UnknownAction } from "redux";
import { actionTypes } from "./action.types";

export const initialState: AppState = {
  page: {
    path: "",
    title: "",
    isBeta: false,
  },
};

export const reducer = produce(
  (
    state: Draft<AppState> = initialState,
    action: UnknownAction | Action | AnyAction,
  ) => {
    switch (action.type) {
      case actionTypes.UPDATE_PAGE:
        return produce(state, (draft) => {
          draft.page = {
            ...draft.page,
          };
        });
      default:
        return state;
    }
  },
  initialState,
);
