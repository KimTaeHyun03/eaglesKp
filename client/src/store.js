import { configureStore, createSlice } from '@reduxjs/toolkit';

// 세션 저장소에서 상태 복원
const savedValue = sessionStorage.getItem('permissonValue');

let permisson = createSlice({
  name: 'permissonAccess',
  initialState: { value: savedValue === 'true' }, // 세션 저장소 값 복원
  reducers: {
    access: state => {
      state.value = !state.value;
      sessionStorage.setItem('permissonValue', state.value); // 상태 변경 시 세션 저장소에 저장
    }
  }
});

// 함수 export
export let { access } = permisson.actions;

// state export
export default configureStore({
  reducer: {
    permissonAccess: permisson.reducer
  }
});
