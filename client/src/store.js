import { configureStore, createSlice } from '@reduxjs/toolkit';

// 세션 저장소에서 상태 복원
const savedValue = sessionStorage.getItem('permissonValue');

let permisson = createSlice({
  name: 'permissonAccess',
  initialState: { value: savedValue === 'true' ? true : false }, // 기본값 설정
  reducers: {
    access: state => {
      state.value = !state.value;
      console.log('상태 변경:', state.value); // 디버깅 로그 추가
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