"use client"

import React from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
     
      <section className="position-relative py-5 overflow-hidden" 
               style={{ 
                 background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                 minHeight: '80vh',
                 display: 'flex',
                 alignItems: 'center'
               }}>
        
  
        <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden" style={{ zIndex: 0 }}>
          <div className="position-absolute rounded-circle" 
               style={{ top: '-10%', right: '-5%', width: '400px', height: '400px', background: 'rgba(56, 189, 248, 0.15)', filter: 'blur(80px)' }}></div>
          <div className="position-absolute rounded-circle" 
               style={{ bottom: '10%', left: '-5%', width: '300px', height: '300px', background: 'rgba(99, 102, 241, 0.15)', filter: 'blur(80px)' }}></div>
        </div>

        <div className="container position-relative" style={{ zIndex: 1 }}>
          <div className="row align-items-center">
            <div className="col-lg-7 text-white animate__animated animate__fadeInLeft">
              <h1 className="display-1 fw-bolder mb-4 lh-sm">
                Unlock Your <br />
                <span className="text-info">Campus Life.</span>
              </h1>
              <p className="fs-4 text-light opacity-75 mb-5 pe-lg-5">
                The central hub for all IIIT clubs and events. Connect with mentors, 
                join technical societies, and never miss a workshop again.
              </p>
              <div className="d-flex gap-3">
                <button 
                  onClick={() => router.push('/clubs')}
                  className="btn btn-info btn-lg px-4 py-3 rounded-4 fw-bold shadow-sm hover-lift"
                >
                  Find a Club
                </button>
                <button 
                  onClick={() => router.push('/event')}
                  className="btn btn-outline-light btn-lg px-4 py-3 rounded-4 fw-bold hover-lift"
                >
                  Upcoming Events
                </button>
              </div>
            </div>
            
            <div className="col-lg-5 d-none d-lg-block">
    
               <div className="card border-0 shadow-lg p-4 bg-white bg-opacity-10 backdrop-blur rounded-5 border border-white border-opacity-20 text-white">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <span className="badge bg-danger rounded-pill px-3 py-2 animate-pulse">LIVE NOW</span>
                    <small className="text-info fw-bold uppercase">Tech-Fest 2025</small>
                  </div>
                  <h4 className="mb-3">Web3 Workshop by CryptoClub</h4>
                  <p className="text-light opacity-50 small">Room 201, Vindhya Block • Starts in 15 mins</p>
                  <button className="btn btn-light btn-sm w-100 rounded-3 mt-2 fw-bold">Join Waitlist</button>
               </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container" style={{ marginTop: '-60px', position: 'relative', zIndex: 2 }}>
        <div className="card border-0 shadow-lg rounded-5 p-4 bg-white">
          <div className="row g-4 text-center">
            <div className="col-md-4">
              <div className="p-3">
                <h2 className="fw-bold text-dark mb-1">45+</h2>
                <p className="text-muted mb-0 small fw-bold">REGISTERED CLUBS</p>
              </div>
            </div>
            <div className="col-md-4 border-start border-end">
              <div className="p-3">
                <h2 className="fw-bold text-dark mb-1">20+</h2>
                <p className="text-muted mb-0 small fw-bold">EVENTS CONDUCTED</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3">
                <h2 className="fw-bold text-dark mb-1">150+</h2>
                <p className="text-muted mb-0 small fw-bold">WORKSHOPS COMPLETED</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    
      <section className="py-5 mt-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold display-5">Why join us?</h2>
            <div className="bg-info mx-auto" style={{ width: '60px', height: '4px', borderRadius: '2px' }}></div>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="h-100 p-5 bg-white rounded-5 shadow-sm border-bottom border-4 border-info">
                <div className="fs-1 mb-3">🚀</div>
                <h4 className="fw-bold">Skill Growth</h4>
                <p className="text-muted">Master industry-relevant skills through hands-on club projects and workshops.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="h-100 p-5 bg-white rounded-5 shadow-sm border-bottom border-4 border-primary">
                <div className="fs-1 mb-3">🤝</div>
                <h4 className="fw-bold">Networking</h4>
                <p className="text-muted">Connect with seniors, alumni, and peers who share your professional interests.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="h-100 p-5 bg-white rounded-5 shadow-sm border-bottom border-4 border-warning">
                <div className="fs-1 mb-3">🏆</div>
                <h4 className="fw-bold">Recognition</h4>
                <p className="text-muted">Earn certificates and lead teams in national level hackathons and competitions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}