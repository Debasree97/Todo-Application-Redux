import { COLORCHANGED, STATUSCHANGED } from "./actionTypes";

import intialState from "./initialState";

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case COLORCHANGED: {
      const { color, changeType } = action.payload;

      switch (changeType) {
        case "added":
          return {
            ...state,
            colors: [...state.colors,color],
          };

        case "removed": {
          return {
            ...state,
            colors: state.colors.filter(
              (existingColor) => existingColor !== color
            ),
          };
        }

        default:
          return state;
      }
    }

    case STATUSCHANGED: {
      return {
        ...state,
        status: action.payload,
      };
    }

    default:
      return state;
  }
};

export default reducer;
