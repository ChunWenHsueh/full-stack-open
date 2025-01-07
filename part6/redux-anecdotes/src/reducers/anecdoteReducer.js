import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    vote(state, action) {
      return state.map((anecdote) =>
        anecdote.id !== action.payload
          ? anecdote
          : {
              ...anecdote,
              votes: anecdote.votes + 1,
            }
      );
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
    update(state, action) {
      const id = action.payload.id;
      state = state.map((anecdote) =>
        anecdote.id !== id ? anecdote : action.payload
      );
      return state;
    },
  },
});

export const { vote, appendAnecdote, setAnecdotes, update } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const voteAnecdote = (anecdote) => {
  const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
  return async (dispatch) => {
    const anecdote = await anecdoteService.update(updatedAnecdote);
    dispatch(update(anecdote));
  };
};

export default anecdoteSlice.reducer;
