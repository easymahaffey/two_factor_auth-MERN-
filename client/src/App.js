import React from "react"
import { Route, Routes } from 'react-router-dom'
import PublicRoute from './components/auth/PublicRoute'
import PrivateRoute from './components/app/PrivateRoute'
import InitialLanding from './components/auth/InitialLanding'
import Landing from './components/app/Landing'
import Navbar from './components/nav/Navbar'

const App = () => {
    return (
        <React.Fragment>
            <Navbar />
            <Routes>
                <Route element={<PublicRoute />}>
                    <Route path="/" element={<InitialLanding />} />
                </Route>
                <Route element={<PrivateRoute />}>
                    <Route path="/landing" element={<Landing />} />
                </Route>
            </Routes>
        </React.Fragment>
    )
}

export default App