"use client"

import React from 'react'
import Link from 'next/link'
import { useSearch } from '../context/SearchContext'
function Navb() {
    const {search, setSearch} = useSearch()
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top ">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">SLC</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" href="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="/clubs">Clubs</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="/event">Events</Link>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" value = {search} onChange = {(e)=>{setSearch(e.target.value)}} placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" onClick={(e)=>{e.preventDefault()}}>Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navb
