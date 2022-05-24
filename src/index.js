import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserProfile from './components/UserProfile/UserProfile';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import CreateChat from './components/CreateChat/CreateChat';

const root = ReactDOM.createRoot(document.getElementById('root'));

// basic routing setup. This will render components or "pages" based on what the address bar says.
// this is where the app starts. There are many ways you can handle routing dynamically.
// right now, we are just keeping it super simple.
root.render(
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<App />}> </Route>
            <Route exact path="/profile" element={<UserProfile />}> </Route>
            <Route exact path="/chat/create" element={<CreateChat />}> </Route>
        </Routes>
    </BrowserRouter>,

  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
