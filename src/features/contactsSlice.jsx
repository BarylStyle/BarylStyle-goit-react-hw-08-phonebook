import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://connections-api.goit.global'; // Zmieniona na nowy backend

export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.auth.token;
  const response = await axios.get(`${API_URL}/contacts`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
});

export const addContact = createAsyncThunk('contacts/addContact', async (contact, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.auth.token;
  const response = await axios.post(`${API_URL}/contacts`, contact, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
});

export const removeContact = createAsyncThunk('contacts/removeContact', async (id, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.auth.token;
  await axios.delete(`${API_URL}/contacts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return id;
});

const initialState = {
  contacts: [],
  filter: '',
  status: 'idle',
  error: null
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
      })
      .addCase(removeContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
      });
  }
});

export const { setFilter } = contactsSlice.actions;

export default contactsSlice.reducer;
