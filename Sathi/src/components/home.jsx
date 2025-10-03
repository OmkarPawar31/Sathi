import React, { useState, useEffect } from 'react';
import { Heart, Users, Calendar, Brain, Shield, Star, Menu, X, Phone, Mail, MapPin } from 'lucide-react';

export default function Homepage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const customStyles = `
    :root {
      --sathi-primary: #2563eb;
      --sathi-secondary: #7c3aed;
      --sathi-success: #10b981;
      --sathi-warning: #f59e0b;
      --sathi-danger: #ef4444;
      --gradient-primary: linear-gradient(135deg, #2563eb, #7c3aed);
      --gradient-light: linear-gradient(135deg, #ebf8ff, #faf5ff);
      --shadow-soft: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      --shadow-medium: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      --shadow-large: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: var(--gradient-light);
      overflow-x: hidden;
    }

    .navbar {
      background: rgba(255, 255, 255, 0.95) !important;
      backdrop-filter: blur(20px);
      box-shadow: var(--shadow-soft);
      transition: all 0.3s ease;
    }

    .navbar.scrolled {
      background: rgba(255, 255, 255, 0.98) !important;
      box-shadow: var(--shadow-medium);
    }

    .btn-primary {
      background: var(--gradient-primary);
      border: none;
      border-radius: 0.75rem;
      padding: 0.75rem 2rem;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-large);
      background: linear-gradient(135deg, #1d4ed8, #6d28d9);
    }

    .btn-outline-primary {
      border: 2px solid var(--sathi-primary);
      color: var(--sathi-primary);
      border-radius: 0.75rem;
      padding: 0.75rem 2rem;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .btn-outline-primary:hover {
      background: var(--sathi-primary);
      border-color: var(--sathi-primary);
      transform: translateY(-2px);
    }

    .card {
      border: none;
      border-radius: 1.5rem;
      box-shadow: var(--shadow-soft);
      transition: all 0.3s ease;
      background: rgba(255,255,255,0.95);
      backdrop-filter: blur(10px);
    }

    .card:hover {
      transform: translateY(-8px);
      box-shadow: var(--shadow-large);
    }

    .text-gradient-primary {
      background: var(--gradient-primary);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: 700;
    }

    .hero-section {
      min-height: 100vh;
      display: flex;
      align-items: center;
      position: relative;
      overflow: hidden;
      padding-top: 120px;
    }

    .hero-section::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(ellipse at center, rgba(37, 99, 235, 0.1) 0%, transparent 70%);
      animation: float 20s ease-in-out infinite;
      z-index: -1;
    }

    .hero-visual {
      position: relative;
      height: 400px;
    }

    .hero-card-main {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 350px;
      height: 350px;
      background: var(--gradient-primary);
      border-radius: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      text-align: center;
      box-shadow: var(--shadow-large);
      animation: float-gentle 6s ease-in-out infinite;
    }

    .floating-element {
      position: absolute;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      box-shadow: var(--shadow-medium);
    }

    .floating-star {
      top: 20px;
      right: 40px;
      width: 70px;
      height: 70px;
      background: var(--sathi-warning);
      animation: bounce 2s infinite;
    }

    .floating-shield {
      bottom: 40px;
      left: 20px;
      width: 60px;
      height: 60px;
      background: var(--sathi-success);
      animation: pulse 2s infinite;
    }

    .service-icon {
      width: 4rem;
      height: 4rem;
      border-radius: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.5rem;
      font-size: 1.75rem;
      color: white;
      transition: all 0.3s ease;
    }

    .card:hover .service-icon {
      transform: scale(1.1);
    }

    .feature-icon {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 1rem;
      margin-top: 0.25rem;
      color: white;
      font-size: 1.25rem;
    }

    .contact-method {
      display: flex;
      align-items: center;
      margin-bottom: 2rem;
      padding: 1.5rem;
      background: #f9fafb;
      border-radius: 1rem;
      transition: all 0.3s ease;
    }

    .contact-method:hover {
      background: #f3f4f6;
      transform: translateX(10px);
    }

    .contact-method-icon {
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 1rem;
      color: white;
      font-size: 1.5rem;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(180deg); }
    }

    @keyframes float-gentle {
      0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
      50% { transform: translate(-50%, -50%) translateY(-10px); }
    }

    @keyframes bounce {
      0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
      40%, 43% { transform: translateY(-10px); }
      70% { transform: translateY(-5px); }
      90% { transform: translateY(-2px); }
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }

    @media (max-width: 768px) {
      .hero-section { padding-top: 100px; }
      .hero-card-main { width: 280px; height: 280px; }
      .floating-star { top: 10px; right: 10px; width: 50px; height: 50px; }
      .floating-shield { bottom: 10px; left: 10px; width: 40px; height: 40px; }
    }
  `;

  return (
    <>
      {/* Bootstrap CSS */}
      <link 
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" 
        rel="stylesheet"
      />
      
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />

      <div>
        {/* Header */}
        <nav className={`navbar navbar-expand-lg fixed-top ${scrolled ? 'scrolled' : ''}`}>
          <div className="container">
            <a className="navbar-brand d-flex align-items-center" href="#home">
              <div style={{
                width: '40px',
                height: '40px',
                background: 'var(--gradient-primary)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '12px',
                color: 'white'
              }}>
                <Heart size={20} />
              </div>
              <span className="text-gradient-primary">Sathi</span>
            </a>

            <button
              className="navbar-toggler"
              type="button"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
              <ul className="navbar-nav ms-auto me-3">
                <li className="nav-item">
                  <a className="nav-link" href="#home">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#services">Services</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#about">About</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#contact">Contact</a>
                </li>
              </ul>
              <div className="d-flex gap-2">
                <button className="btn btn-outline-primary">Sign In</button>
                <button className="btn btn-primary">Get Started</button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="home" className="hero-section">
          <div className="container">
            <div className="row align-items-center g-5">
              <div className="col-lg-6">
                <h1 className="display-3 fw-bold text-dark mb-4">
                  Your Mental Health
                  <span className="d-block text-gradient-primary">Companion</span>
                </h1>
                <p className="fs-5 text-muted mb-4 lh-base">
                  Sathi is here to support you on your mental health journey. Connect with qualified professionals, 
                  access therapy services, and take control of your wellbeing with our comprehensive platform.
                </p>
                
                <div className="d-flex flex-column flex-sm-row gap-3 mb-5">
                  <button className="btn btn-primary btn-lg">Start Your Journey</button>
                  <button className="btn btn-outline-primary btn-lg">Learn More</button>
                </div>

                <div className="row text-center g-4">
                  <div className="col-4">
                    <div className="fs-2 fw-bold" style={{color: 'var(--sathi-primary)'}}>500+</div>
                    <div className="text-muted small">Qualified Therapists</div>
                  </div>
                  <div className="col-4">
                    <div className="fs-2 fw-bold" style={{color: 'var(--sathi-secondary)'}}>10k+</div>
                    <div className="text-muted small">Lives Supported</div>
                  </div>
                  <div className="col-4">
                    <div className="fs-2 fw-bold" style={{color: 'var(--sathi-success)'}}>24/7</div>
                    <div className="text-muted small">Support Available</div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="hero-visual">
                  <div className="hero-card-main">
                    <div>
                      <Heart size={80} style={{marginBottom: '1rem', animation: 'pulse 2s infinite'}} />
                      <h3 className="fs-3 fw-bold">Your Sathi</h3>
                      <p className="mb-0" style={{color: '#DBEAFE'}}>Always here for you</p>
                    </div>
                  </div>
                  
                  <div className="floating-element floating-star">
                    <Star size={28} />
                  </div>
                  <div className="floating-element floating-shield">
                    <Shield size={24} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-5 bg-white">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="display-4 fw-bold text-dark">Our Services</h2>
              <p className="fs-5 text-muted">Comprehensive mental health support tailored to your unique needs</p>
            </div>

            <div className="row g-4">
              <div className="col-lg-3 col-md-6">
                <div className="card h-100" style={{background: 'linear-gradient(135deg, #ebf8ff, #dbeafe)'}}>
                  <div className="card-body text-center p-4">
                    <div className="service-icon mx-auto" style={{background: 'var(--sathi-primary)'}}>
                      <Calendar size={28} />
                    </div>
                    <h5 className="card-title fw-bold">Easy Booking</h5>
                    <p className="card-text text-muted">Schedule consultations with qualified therapists at your convenience</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="card h-100" style={{background: 'linear-gradient(135deg, #faf5ff, #e9d5ff)'}}>
                  <div className="card-body text-center p-4">
                    <div className="service-icon mx-auto" style={{background: 'var(--sathi-secondary)'}}>
                      <Users size={28} />
                    </div>
                    <h5 className="card-title fw-bold">Expert Therapists</h5>
                    <p className="card-text text-muted">Connect with licensed professionals specialized in various therapeutic approaches</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="card h-100" style={{background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)'}}>
                  <div className="card-body text-center p-4">
                    <div className="service-icon mx-auto" style={{background: 'var(--sathi-success)'}}>
                      <Brain size={28} />
                    </div>
                    <h5 className="card-title fw-bold">Multiple Approaches</h5>
                    <p className="card-text text-muted">Access various therapeutic methods including CBT, DBT, and mindfulness practices</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="card h-100" style={{background: 'linear-gradient(135deg, #fff7ed, #fed7aa)'}}>
                  <div className="card-body text-center p-4">
                    <div className="service-icon mx-auto" style={{background: 'var(--sathi-warning)'}}>
                      <Shield size={28} />
                    </div>
                    <h5 className="card-title fw-bold">Safe & Secure</h5>
                    <p className="card-text text-muted">Your privacy and data security are our top priorities with end-to-end encryption</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-5" style={{background: 'var(--gradient-light)'}}>
          <div className="container">
            <div className="row align-items-center g-5">
              <div className="col-lg-6">
                <h2 className="display-4 fw-bold text-dark mb-4">About Sathi</h2>
                <p className="fs-5 text-muted mb-4 lh-base">
                  The name "Sathi" means "companion" in Hindi and Nepali, embodying our core mission to be your 
                  trusted companion throughout your mental health journey.
                </p>

                <div className="mb-4">
                  <div className="d-flex align-items-start mb-4">
                    <div className="feature-icon" style={{background: 'var(--sathi-primary)'}}>
                      <Heart size={20} />
                    </div>
                    <div>
                      <h5 className="fw-bold text-dark mb-2">Bridging the Gap</h5>
                      <p className="text-muted mb-0">We connect individuals seeking mental health support with qualified professionals, making therapy accessible and approachable.</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-start mb-4">
                    <div className="feature-icon" style={{background: 'var(--sathi-secondary)'}}>
                      <Users size={20} />
                    </div>
                    <div>
                      <h5 className="fw-bold text-dark mb-2">Comprehensive Support</h5>
                      <p className="text-muted mb-0">From depression and anxiety to general wellness, we provide support for various mental health challenges.</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-start">
                    <div className="feature-icon" style={{background: 'var(--sathi-success)'}}>
                      <Brain size={20} />
                    </div>
                    <div>
                      <h5 className="fw-bold text-dark mb-2">User-Friendly Platform</h5>
                      <p className="text-muted mb-0">Our intuitive interface makes mental health management simple and stress-free.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="card text-center p-4">
                  <div className="card-body">
                    <div style={{
                      width: '4rem',
                      height: '4rem',
                      background: 'var(--gradient-primary)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1.5rem',
                      color: 'white'
                    }}>
                      <Heart size={32} />
                    </div>
                    <h3 className="fs-3 fw-bold text-dark">Our Mission</h3>
                    <p className="text-muted mb-4 lh-base">
                      To make mental health support accessible, comfortable, and effective for everyone. 
                      We believe that everyone deserves a caring companion on their journey to mental wellness.
                    </p>
                    
                    <div className="row g-3">
                      <div className="col-6">
                        <div className="p-3 rounded-3" style={{background: '#ebf8ff'}}>
                          <div className="fs-2 fw-bold" style={{color: 'var(--sathi-primary)'}}>24/7</div>
                          <div className="small text-muted">Available</div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="p-3 rounded-3" style={{background: '#faf5ff'}}>
                          <div className="fs-2 fw-bold" style={{color: 'var(--sathi-secondary)'}}>100%</div>
                          <div className="small text-muted">Confidential</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-5 bg-white">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="display-4 fw-bold text-dark">Get in Touch</h2>
              <p className="fs-5 text-muted">Ready to start your mental health journey? We're here to help you take the first step.</p>
            </div>

            <div className="row g-5">
              <div className="col-lg-6">
                <div className="contact-method">
                  <div className="contact-method-icon" style={{background: 'var(--sathi-primary)'}}>
                    <Phone size={24} />
                  </div>
                  <div>
                    <h5 className="fw-bold text-dark mb-1">Phone Support</h5>
                    <p className="text-muted mb-0">+91 98765 43210</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="contact-method-icon" style={{background: 'var(--sathi-secondary)'}}>
                    <Mail size={24} />
                  </div>
                  <div>
                    <h5 className="fw-bold text-dark mb-1">Email Us</h5>
                    <p className="text-muted mb-0">support@sathi.com</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="contact-method-icon" style={{background: 'var(--sathi-success)'}}>
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h5 className="fw-bold text-dark mb-1">Visit Us</h5>
                    <p className="text-muted mb-0">Pimpri, Maharashtra, India</p>
                  </div>
                </div>

                <div className="p-4 rounded-3 mt-4" style={{background: 'var(--gradient-light)'}}>
                  <h5 className="fw-bold text-dark mb-2">Crisis Support</h5>
                  <p className="text-muted mb-3">
                    If you're experiencing a mental health crisis, please reach out immediately:
                  </p>
                  <button className="btn btn-danger">Emergency Support</button>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="p-4 rounded-3" style={{background: '#f9fafb'}}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-medium text-dark">First Name</label>
                      <input type="text" className="form-control border-2 rounded-3" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-medium text-dark">Last Name</label>
                      <input type="text" className="form-control border-2 rounded-3" />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-medium text-dark">Email</label>
                      <input type="email" className="form-control border-2 rounded-3" />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-medium text-dark">Message</label>
                      <textarea rows="4" className="form-control border-2 rounded-3"></textarea>
                    </div>
                    <div className="col-12">
                      <button 
                        onClick={() => alert('Thank you for your message! We will get back to you soon.')} 
                        className="btn btn-primary w-100"
                      >
                        Send Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-dark text-white py-5">
          <div className="container">
            <div className="row g-4">
              <div className="col-lg-3 col-md-6">
                <div className="d-flex align-items-center mb-3">
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: 'var(--gradient-primary)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '12px',
                    color: 'white'
                  }}>
                    <Heart size={20} />
                  </div>
                  <h3 className="fs-3 fw-bold mb-0">Sathi</h3>
                </div>
                <p className="text-muted">
                  Your trusted companion for mental health support and wellbeing.
                </p>
              </div>

              <div className="col-lg-3 col-md-6">
                <h5 className="fw-bold mb-3">Services</h5>
                <div className="d-flex flex-column gap-2">
                  <span className="text-muted">Therapy Sessions</span>
                  <span className="text-muted">Mental Health Consultation</span>
                  <span className="text-muted">Crisis Support</span>
                  <span className="text-muted">Wellness Programs</span>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <h5 className="fw-bold mb-3">Support</h5>
                <div className="d-flex flex-column gap-2">
                  <span className="text-muted">Help Center</span>
                  <span className="text-muted">Contact Us</span>
                  <span className="text-muted">Privacy Policy</span>
                  <span className="text-muted">Terms of Service</span>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <h5 className="fw-bold mb-3">Connect</h5>
                <div className="d-flex flex-column gap-2">
                  <span className="text-muted">support@sathi.com</span>
                  <span className="text-muted">+91 98765 43210</span>
                  <span className="text-muted">Pimpri, Maharashtra</span>
                </div>
              </div>
            </div>

            <div className="border-top border-secondary mt-5 pt-4 text-center">
              <p className="text-muted mb-0">&copy; 2025 Sathi Mental Health Platform. Made with ❤️ for mental wellness.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}