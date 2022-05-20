import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import { setCurrentUserAction } from './redux/actions/authActions';
import AppRouter from './router/AppRouter';
import { auth } from "./utils/firebaseUtil";


function App() {
 const dispatch=useDispatch();

useEffect(()=>{
  const unsubscribe=auth.onAuthStateChanged((user)=>{
    dispatch(setCurrentUserAction(user));
  });
  return unsubscribe;
},[dispatch]);
 

  return (
    <div className="App">
      <AppRouter/>
    
    </div>
  );
}

export default App;
