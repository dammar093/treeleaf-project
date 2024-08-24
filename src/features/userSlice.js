import { createSlice } from "@reduxjs/toolkit";

const initialState ={
  users:[
    {
      id:1,
      name:"John Doe",
      email:"johndoe@gmail.com",
      phone:"23872384",
      dob:"2000-05-06",
      city:"Mahendranagar",
      district:"Kanchanpur",
      province:"Sudupaschim",
      country:"Nepal",
      profile:"https://cdn-icons-png.flaticon.com/128/4140/4140037.png"
    },
    {
      id:2,
      name:"Ramesh",
      email:"johndoe@gmail.com",
      phone:"23872384",
      dob:"2000-05-06",
      city:"Mahendranagar",
      district:"Kanchanpur",
      province:"Sudupaschim",
      country:"Nepal",
      profile:"https://cdn-icons-png.flaticon.com/128/4140/4140037.png"
    },
    {
      id:3,
      name:"Harish",
      email:"johndoe@gmail.com",
      phone:"23872384",
      dob:"2000-05-06",
      city:"Mahendranagar",
      district:"Kanchanpur",
      province:"Sudupaschim",
      country:"Nepal",
      profile:"https://cdn-icons-png.flaticon.com/128/4140/4140037.png"
    },
    {
      id:4,
      name:"Dyams",
      email:"johndoe@gmail.com",
      phone:"23872384",
      dob:"2000-05-06",
      city:"Mahendranagar",
      district:"Kanchanpur",
      province:"Sudupaschim",
      country:"Nepal",
      profile:"https://cdn-icons-png.flaticon.com/128/4140/4140037.png"
    },
    {
      id:5,
      name:"Bire",
      email:"johndoe@gmail.com",
      phone:"23872384",
      dob:"2000-05-06",
      city:"Mahendranagar",
      district:"Kanchanpur",
      province:"Sudupaschim",
      country:"Nepal",
      profile:"https://cdn-icons-png.flaticon.com/128/4140/4140037.png"
    },
    {
      id:6,
      name:"Deepak",
      email:"johndoe@gmail.com",
      phone:"23872384",
      dob:"2000-05-06",
      city:"Mahendranagar",
      district:"Kanchanpur",
      province:"Sudupaschim",
      country:"Nepal",
      profile:"https://cdn-icons-png.flaticon.com/128/4140/4140037.png"
    },
    {
      id:7,
      name:"Ajay",
      email:"dyams@gmail.com",
      phone:"23872384",
      dob:"2000-05-06",
      city:"Mahendranagar",
      district:"Kanchanpur",
      province:"Sudupaschim",
      country:"Nepal",
      profile:"https://cdn-icons-png.flaticon.com/128/4140/4140037.png"
    },
    {
      id:8,
      name:"Rahul",
      email:"johndoe@gmail.com",
      phone:"23872384",
      dob:"2000-05-06",
      city:"Mahendranagar",
      district:"Kanchanpur",
      province:"Sudupaschim",
      country:"Nepal",
      profile:"https://cdn-icons-png.flaticon.com/128/4140/4140037.png"
    }
  ],
  filterUsers:[],
  total:null
}

const userSlice = createSlice({
  name:"users",
  initialState,
  reducers:{
    addUser:(state,action)=>{
      state.users= [...state.users,action.payload]
    },
    removeUser:(state,action)=>{
      state.users = state.users.filter(user=>user.id !== action.payload)
    },
    editUser:(state,action)=>{
      const index = state.users.findIndex(item=>item.id === action.payload.id)
      state.users[index] = action.payload
    },
    searchedUsers:(state,action)=>{
    let searchTerm = action.payload.toLowerCase();
    state.filterUsers = state.users.filter(
        user => user.name.toLowerCase().includes(searchTerm) || user.email.toLowerCase().includes(searchTerm)
    );

      state.total = state.filterUsers.length
    },
    setUserByPage:(state,action)=>{
    console.log(action.payload);
      if(state.users){
        // initalize the show row in the table at a time
        const pageSize = 5;
        // calculate the start index
        const skip = (action.payload - 1) * pageSize; 
        // calculat end index
        const length = state.users.length > skip + pageSize ? skip + pageSize : state.users.length;
        // make a new array 
        let newArr = []
        for(let i = skip; i < length ;i++){
          // push the value on new array
          newArr.push(state.users[i])
        }
        // intialize new array to filterd state
        state.filterUsers = newArr
      }
    }
  }
})

export const {addUser,removeUser,editUser,searchedUsers,setUserByPage} = userSlice.actions
export default userSlice.reducer