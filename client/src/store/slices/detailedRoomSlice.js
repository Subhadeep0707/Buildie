import { createSlice } from "@reduxjs/toolkit";

const createEmptyRoom = (roomNumber = 1) => ({
  name: `Room ${roomNumber}`,
  length: "",
  width: "",
  height: 3,
  wallThickness: 0.23,
  doors: [], 
  windows: [], 
  plasterSides: 2,
});

const detailedRoomSlice = createSlice({
  name: "detailedRooms",
  initialState: {
    rooms: [createEmptyRoom(1)],
  },
  reducers: {
    addDetailedRoom: (state) => {
      state.rooms.push(createEmptyRoom(state.rooms.length + 1));
    },
    removeDetailedRoom: (state, action) => {
      state.rooms = state.rooms.filter((_, i) => i !== action.payload);
    },
    updateDetailedRoom: (state, action) => {
      const { index, updatedRoom } = action.payload;
      if (state.rooms[index]) {
        state.rooms[index] = updatedRoom;
      }
    },
    setDetailedRooms: (state, action) => {
      state.rooms = action.payload;
    },
    resetDetailedRooms: (state) => {
      state.rooms = [createEmptyRoom(1)];
    },
  },
});

export const {
  addDetailedRoom,
  removeDetailedRoom,
  updateDetailedRoom,
  setDetailedRooms,
  resetDetailedRooms,
} = detailedRoomSlice.actions;

export default detailedRoomSlice.reducer;
