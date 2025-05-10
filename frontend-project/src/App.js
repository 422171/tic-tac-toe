import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TicTacToe from './components/TicTacToe';

const App = () => {
    const [user, setUser] = useState(null);

    return (
        <Router>
            <div className="container">
                {!user ? (
                    <div>
                        <nav>
                            <ul>
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>
                                <li>
                                    <Link to="/register">Register</Link>
                                </li>
                            </ul>
                        </nav>
                        <Switch>
                            <Route path="/login">
                                <Login setUser={setUser} />
                            </Route>
                            <Route path="/register">
                                <Register />
                            </Route>
                            <Route path="/">
                                <div>
                                    <h2>Welcome to Tic Tac Toe</h2>
                                    <p>Please login or register to continue.</p>
                                </div>
                            </Route>
                        </Switch>
                    </div>
                ) : (
                    <TicTacToe user={user} />
                )}
            </div>
        </Router>
    );
};

export default App;
