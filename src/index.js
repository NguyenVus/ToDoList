import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
// import Caculates from './View/Caculates';
import reportWebVitals from './reportWebVitals';
import ToDoList from "./View/ToDoList";
// import CaculateBMI from "./View/CaculateBMI";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/*<App />*/}
    {/*  <Caculates />*/}
      <ToDoList/>
      {/*<CaculateBMI/>*/}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
