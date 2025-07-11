import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CTASection = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <section className="py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <h2 className="display-6 fw-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="lead text-muted mb-4">
              Join our community of problem solvers and take your coding skills to the next level.
            </p>
            {isAuthenticated ? (
              <Link to="/problems" className="btn btn-primary btn-lg px-5">
                Get Started Now
              </Link>
            ) : (
              <Link to="/register" className="btn btn-primary btn-lg px-5">
                Get Started Now
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection; 