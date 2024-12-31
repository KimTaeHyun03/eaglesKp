
import { configureStore, createSlice } from '@reduxjs/toolkit'

	  let permisson = createSlice({
	  	  name :'permissonAccess',
	  	  initialState:{value:false},
	  	  reducers:{
	  	    access: (state)=>{
	  	      state.value= !state.value;
	  	    }
	  	  }
	    
	  });
	  
//함수 export
//형식
//export let {함수이름} = 슬라이스명.actions;
export let {access} = permisson.actions;

//state export
export default configureStore({
	  
	  reducer: {
	  	  //형식
	  	  //작명:만든슬라이스의 이름.reducer,
	  	  permissonAccess:permisson.reducer,
	  }
	  
	  
}) 
