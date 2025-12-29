"use client";
import { gql } from "@apollo/client";
import { useQuery, ApolloProvider } from "@apollo/client/react";
import { useMutation } from "@apollo/client/react";

import { client } from "../../lib/apollo-client"
import LoadingOverlay from "../components/LoadingOverlay";
import { useState } from "react";



const GET_CLUBS = gql`
  query {
    allClubs {
      cid
      name
      purpose
      state
      logo
      tagline
    }
  }
`;

const ADD_CLUB = gql`
  mutation AddClub(
    $name: String!, 
    $purpose: String!, 
    $state: EnumStates!, 
    $logo: String!, 
    $tagline: String!
  ) {
    addClub(
      name: $name, 
      purpose: $purpose, 
      state: $state, 
      logo: $logo, 
      tagline: $tagline
    ) {
      cid
      name
      purpose
      state
      logo
      tagline
    }
  }
`;


function ClubsGrid() {
  const { loading, error, data } = useQuery(GET_CLUBS);

  // if (loading) return <p className="text-center mt-10">Loading Clubs...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">Error: {error.message}</p>;

  return (
    <>
      {loading && <LoadingOverlay />}
      <div className="container pb-5">
        <div className="row g-4 justify-content-center mt-2">
          {data?.allClubs.map((club) => (
            <div key={club.cid} className="col-12 col-md-6 col-lg-4">
              {/* Card: Soft borders, light background, and elegant hover */}
              <div className="card h-100 border-0 shadow-sm rounded-4 text-center py-4 px-3 bg-white hover-lift">

                <div className="d-flex align-items-center justify-content-start mb-3">
                  <div className={`rounded-circle me-2 bg-${club.state == "active" ? "success" : "secondary"}`} style={{ width: '13px', height: '13px' }}></div>

                </div>
                <div className="card-body d-flex flex-column">
                  <div className="mb-3">
                    {/* Visual Placeholder: Circle with initials */}
                    <div className="bg-soft-primary text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                      style={{ width: '60px', height: '60px', fontSize: '1.2rem', fontWeight: '500' }}>
                      {club.name.charAt(0)}
                    </div>
                  </div>

                  <h2 className="card-title h5 fw-semibold text-dark mb-3">
                    {club.name}
                  </h2>

                  <p className="small text-muted mb-4 flex-grow-1">
                    {/* Official student-led community for {club.name} at IIIT. */}
                    {club.purpose}
                  </p>

                  <div className="mt-auto">
                    <a
                      href={`https://clubs.iiit.ac.in/clubs/${club.cid}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-primary px-4 py-2 rounded-pill fw-medium transition-all"
                    >
                      Explore Club
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}



function Form() {

  const [name, setName] = useState("")
  const [purpose, setPurpose] = useState("")
  const [tagline, setTagline] = useState("")
  const [state, setState] = useState("active")

  const [addClub, { loading, error }] = useMutation(ADD_CLUB, {
    // This tells Apollo to re-run GET_CLUBS so the new club appears in the grid
    refetchQueries: [{ query: GET_CLUBS }],
    onCompleted: () => {
      // Clear the form fields after success
      setName("");
      setPurpose("");
      setTagline("")
      // alert("Club added successfully!");
    },
  });


  const sub = async (e) => {
    e.preventDefault();
    if (!name || !purpose) {
      alert("Please fill in both fields");
      return;
    }
    try {
      await addClub({
        variables: {
          name: name,
          purpose: purpose,
          state: state,
          logo: "",
          tagline: tagline
        },
      });
    } catch (err) {
      console.error("Error submitting form:", err);
    }

  }
  return (
    <>
      <div className="container p-4 border-0 rounded-4 bg-white shadow-lg">

        <form onSubmit={sub} >

          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name of Club</label>
            <input type="name" onChange={(e) => { setName(e.target.value) }} className="form-control" id="exampleFormControlInput1" value={name} placeholder="Name" />
          </div>
          <div className="mb-3">
            <label htmlFor="purpose" className="form-label">Tagline</label>
            <textarea className="form-control" onChange={(e) => { setTagline(e.target.value) }} id="exampleFormControlTextarea1" value={tagline} rows="1"></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="purpose" className="form-label">Purpose Of Club</label>
            <textarea className="form-control" onChange={(e) => { setPurpose(e.target.value) }} id="exampleFormControlTextarea1" value={purpose} rows="3"></textarea>
          </div>
          <div className="dropdown mb-3">
            <label className="form-label d-block text-muted">State of Club</label>
            <button
              className="btn btn-outline-secondary dropdown-toggle w-100 text-start d-flex justify-content-between align-items-center border-light-subtle shadow-sm"
              type="button"
              data-bs-toggle="dropdown"
            >
              {state === "active" ? "Active" : "Not Active"}
            </button>
            <ul className="dropdown-menu w-100 shadow-sm border-light-subtle">
              <li>
                <button className="dropdown-item py-2" type="button" onClick={() => setState("active")}>
                  <span className="rounded-circle bg-success d-inline-block me-2" style={{ width: '8px', height: '8px' }}></span>
                  Active
                </button>
              </li>
              <li>
                <button className="dropdown-item py-2" type="button" onClick={() => setState("deleted")}>
                  <span className="rounded-circle bg-danger d-inline-block me-2" style={{ width: '8px', height: '8px' }}></span>
                  Not Active
                </button>
              </li>
            </ul>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </>
  )
}

export default function Page() {
  return (
    <ApolloProvider client={client}>
      <main className="min-h-screen bg-gray-50 p-4">
        <h1 className="text-4xl font-extrabold text-center my-10">IIIT Clubs</h1>
        <ClubsGrid />
        <h2 className="mt-5 mb-3 display-6 fw-bold text-dark row justify-content-center">Add a club now !</h2>
        <Form />
      </main>
    </ApolloProvider>
  );
}