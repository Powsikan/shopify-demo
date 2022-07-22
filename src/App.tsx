import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import AuthorizationForm from "./components/AuthorizationForm";
import DashboardPage from "./components/DashboardPage";
import { ApolloProvider } from '@apollo/client';
import {client} from "./ApolloClient/client";
import Chart from "./components/Chart"


function App() {
    return (
        <ApolloProvider client={client}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AuthorizationForm/>}/>
                <Route path="dashboard" element={<DashboardPage/>}/>
                {/* <Route path="chart" element={<Chart/>}/> */}
            </Routes>
        </BrowserRouter>
        </ApolloProvider>
    );
}

export default App;
