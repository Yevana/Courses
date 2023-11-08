import React from 'react'
import { Link, NavLink } from 'react-router-dom'

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-light shadow-sm mb-3">
            <div className="container">
                <Link className="navbar-brand" to="/">Courses</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to="/" activeClassName="active">Course</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink className="nav-link" aria-current="page" to="/student" activeClassName="active">Student Dashboard</NavLink>
                        </li>
                    </ul>                    
                </div>
            </div>
        </nav>
    )
}

export default Navbar