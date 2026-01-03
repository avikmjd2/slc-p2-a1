"use client"
import { gql } from '@apollo/client'
import { useQuery, ApolloProvider } from "@apollo/client/react";
import React from 'react'
import LoadingOverlay from '../components/LoadingOverlay';
import { client } from "../../lib/apollo-client"
import { useState } from 'react';
import { useSearch } from '../context/SearchContext';
import { useEffect } from 'react';

const GET_EVENTS = gql`
query{
allEvents{

  eid
  name
  clubid
  time
  location
  mode
  description

  }
}`;

function EventsGrid() {
  const { loading, error, data } = useQuery(GET_EVENTS);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchVia, setSearchVia] = useState("Events");
  let filteredEvents = null
  const { search } = useSearch();

  if (searchVia === "Clubs") {
    filteredEvents = data?.allEvents.filter((event) => {
      return event.clubid.toLowerCase().includes(search.toLowerCase());
    }) || [];

  }
  else {
    filteredEvents = data?.allEvents.filter((event) => {
      return event.name.toLowerCase().includes(search.toLowerCase());
    }) || [];
  }
  const cardsPerPage = 6;
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredEvents?.slice(indexOfFirstCard, indexOfLastCard);
  // const totalPages = Math.ceil((data?.allEvents.length || 0) / cardsPerPage);
  const totalPages = Math.ceil(((filteredEvents).length || 0) / cardsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);
  if (error) return <p className="text-red-500 text-center mt-10">Error: {error.message}</p>;


  // console.log("GraphQL Data:", data);
  return (
    <>
      {loading && <LoadingOverlay />}
      <div className="container pb-5">
        <div className="row g-4 justify-content-center mt-2">


          {(search !== "") && <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Filter Via: {searchVia}
            </button>
            <ul class="dropdown-menu">
              <li><a className="dropdown-item" onClick={(e)=>{setSearchVia("Events")}}>Events</a></li>
              <li><a className="dropdown-item" onClick={(e)=>{setSearchVia("Clubs")}}>Clubs</a></li>
            </ul>
          </div>}


          {(currentCards.length === 0) && <h2 className="container mt-5 d-flex align-items-center justify-content-center">No Content Found</h2>}
          {currentCards.map((event) => (



            <div key={event.eid} className="col-12 col-md-6 col-lg-4">

              <div className="card h-100 border-0 shadow-sm rounded-4 text-center py-4 px-3 bg-white hover-lift">

                <div className="card-body d-flex flex-column">
                  <div className="mb-3">
                    {/* Visual Placeholder: Circle with initials */}
                    <div className="bg-soft-primary text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                      style={{ width: '60px', height: '60px', fontSize: '1.2rem', fontWeight: '500' }}>
                      {event.name.charAt(0)}
                    </div>
                  </div>

                  <h2 className="card-title h5 fw-semibold text-dark mb-3">
                    {event.name}
                  </h2>

                  <p className="small text-muted mb-2 flex-grow-1">
                    {/* Official student-led community for {club.name} at IIIT. */}
                    {event.description}
                  </p>
                  <p className="small text-muted mb-2 flex-grow-1">
                    Mode - {event.mode}
                  </p>
                  <p className="small text-muted mb-2 flex-grow-1">
                    Organized By - {event.clubid}
                  </p>
                  <p className="small text-muted mb-2 flex-grow-1">
                    Location - {event.location}
                  </p>

                  <div className="mt-auto">
                    <a
                      href={`https://clubs.iiit.ac.in/events/${event.eid}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-primary px-4 py-2 rounded-pill fw-medium transition-all"
                    >
                      Explore Event
                    </a>
                  </div>
                </div>
              </div>

            </div>



          ))}

          <nav aria-label="Page navigation" className="mt-5">
            <ul className="pagination justify-content-center">

              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link rounded-pill me-2 border-0 shadow-sm" onClick={() => setCurrentPage(currentPage - 1)}>
                  &laquo;
                </button>
              </li>


              {[...Array(totalPages)].map((_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button
                    className="page-link mx-1 rounded-circle border-0 shadow-sm"
                    style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}

              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link rounded-pill ms-2 border-0 shadow-sm" onClick={() => setCurrentPage(currentPage + 1)}>
                  &raquo;
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )

}

function Page() {
  return (
    <ApolloProvider client={client}>

      <div>
        <h1 className="text-4xl font-extrabold text-center my-10 mt-3">Events</h1>
        <EventsGrid />
      </div>
    </ApolloProvider>
  )
}

export default Page
