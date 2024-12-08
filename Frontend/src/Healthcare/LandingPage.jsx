

import { Link, useNavigate } from 'react-router-dom';
import './styles.css'

function LandingPage() {
  const navigate = useNavigate();
  return (
    <div>
      <header className="appointment">
      <nav className="section__container nav__container">
        <div className="nav__logo">Health<span>Haven</span> Healthcare</div>
        {/* <img src="./harar.png" alt="" /> */}
        <ul className="nav__links">
          <li className="link"><a href="#home">Home</a></li>
          <li className="link"><a href="#about">About Us</a></li>
          <li className="link"><a href="#service">Services</a></li>
          <li className="link"><a href="#blog">Blog</a></li>
          <li className="link">
            <button className="btn_home combined-btn">
              <span className="signup" onClick={() => navigate('/register')}>Sign Up</span>
              <span className="separator"> | </span>
              <span className="login" onClick={() => navigate('/login')}>Login</span>
            </button>
          </li>
        </ul>
        <div className="menu-icon" onClick={toggleMenu}>
          <i className="ri-menu-3-line"></i>
        </div>
      </nav>

        <header className="header">
          <div className="content">
            <h1><span>Get Quick</span><br />Medical Services</h1>
            <p>
              In today&apos;s fast-paced world, access to prompt and efficient medical
              services is of paramount importance. When faced with a medical
              emergency or seeking immediate medical attention, the ability to
              receive quick medical services can significantly impact the outcome
              of a situation.
            </p>
            <button className="btn">Get Services</button>
          </div>
          <div className="image">
            <span className="image__bg"></span>
            <img src=".//header-bg.png" alt="header" />
            <div className="image__content image__content__1">
              <span><i className="ri-user-3-line"></i></span>
              <div className="details">
                <h4>1520+</h4>
                <p>Active Clients</p>
              </div>
            </div>
            <div className="image__content image__content__2">
              <ul>
                <li>
                  <span><i className="ri-check-line"></i></span>
                  Get 20% off on every 1st month
                </li>
                <li>
                  <span><i className="ri-check-line"></i></span>
                  Expert Doctors
                </li>
              </ul>
            </div>
          </div>
        </header>

        <div className="section__container header__container" id="home">
          <div className="header__content">
            <h1>Book Your Appointment Today</h1>
            <p>
              Schedule an appointment with our experienced healthcare professionals. 
              Your health is our priority, and we make it easy for you to book at a time that works for you.
              Get the care you need with our convenient and efficient booking system.
            </p>
            <button className="btn">Book Appointment</button>
          </div>
          <div className="header__form">
            <form>
              <h4>Book Now</h4>
              <input type="text" placeholder="First Name" />
              <input type="text" placeholder="Last Name" />
              <input type="text" placeholder="Address" />
              <input type="text" placeholder="Phone No." />
              <button className="btn form__btn">Book Appointment</button>
            </form>
          </div>
        </div>
      </header>

      <section className="section__container service__container" id="service">
        <div className="service__header">
          <div className="service__header__content">
            <h2 className="section__header">Our Special Service</h2>
            <p>
              Beyond simply providing medical care, our commitment lies in
              delivering unparalleled service tailored to your unique needs.
            </p>
          </div>
          <button className="service__btn">Ask A Service</button>
        </div>
        <div className="service__grid">
          <div className="service__card">
            <span><i className="ri-microscope-line"></i></span>
            <h4>Laboratory Test</h4>
            <p>
              Accurate Diagnostics, Swift Results: Experience top-notch Laboratory
              Testing at our facility.
            </p>
            <a href="#">Learn More</a>
          </div>
          <div className="service__card">
            <span><i className="ri-mental-health-line"></i></span>
            <h4>Health Check</h4>
            <p>
              Our thorough assessments and expert evaluations help you stay
              proactive about your health.
            </p>
            <a href="#">Learn More</a>
          </div>
          <div className="service__card">
            <span><i className="ri-hospital-line"></i></span>
            <h4>General Dentistry</h4>
            <p>
              Experience comprehensive oral care with Dentistry. Trust us to keep
              your smile healthy and bright.
            </p>
            <a href="#">Learn More</a>
          </div>
        </div>
      </section>

      <section className="section__container about__container" id="about">
        <div className="about__content">
          <h2 className="section__header">About Us</h2>
          <p>
            Welcome to our healthcare website, your one-stop destination for
            reliable and comprehensive health care information. We are committed
            to promoting wellness and providing valuable resources to empower you
            on your health journey.
          </p>
          <p>
            Explore our extensive collection of expertly written articles and
            guides covering a wide range of health topics. From understanding
            common medical conditions to tips for maintaining a healthy lifestyle,
            our content is designed to educate, inspire, and support you in making
            informed choices for your health.
          </p>
          <p>
            Discover practical health tips and lifestyle advice to optimize your
            physical and mental well-being. We believe that small changes can lead
            to significant improvements in your quality of life, and we&apos;re here to
            guide you on your path to a healthier and happier you.
          </p>
        </div>
        <div className="about__image">
          <img src="/about.jpg" alt="about" />
        </div>
      </section>

      <section className="section__container why__container" id="blog">
        <div className="why__image">
          <img src="/choose-us.jpg" alt="why choose us" />
        </div>
        <div className="why__content">
          <h2 className="section__header">Why Choose Us</h2>
          <p>
            With a steadfast commitment to your well-being, our team of highly
            trained healthcare professionals ensures that you receive nothing
            short of exceptional patient experiences.
          </p>
          <div className="why__grid">
            <span><i className="ri-hand-heart-line"></i></span>
            <div>
              <h4>Intensive Care</h4>
              <p>
                Our Intensive Care Unit is equipped with advanced technology and
                staffed by a team of professionals.
              </p>
            </div>
            <span><i className="ri-truck-line"></i></span>
            <div>
              <h4>Free Ambulance Car</h4>
              <p>
                A compassionate initiative to prioritize your health and
                well-being without any financial burden.
              </p>
            </div>
            <span><i className="ri-hospital-line"></i></span>
            <div>
              <h4>Medical and Surgical</h4>
              <p>
                Our Medical and Surgical services offer advanced healthcare
                solutions to address medical needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section__container doctors__container" id="pages">
        <div className="doctors__header">
          <div className="doctors__header__content">
            <h2 className="section__header">Our Special Doctors</h2>
            <p>
              We take pride in our exceptional team of doctors, each a specialist
              in their respective fields.
            </p>
          </div>
          <div className="doctors__nav">
            <span><i className="ri-arrow-left-line"></i></span>
            <span><i className="ri-arrow-right-line"></i></span>
          </div>
        </div>
        <div className="doctors__grid">
          <div className="doctors__card">
            <div className="doctors__card__image">
              <img src="/doctor-1.jpg" alt="doctor" />
              <div className="doctors__socials">
                <span><i className="ri-instagram-line"></i></span>
                <span><i className="ri-facebook-fill"></i></span>
                <span><i className="ri-heart-fill"></i></span>
                <span><i className="ri-mail-line"></i></span>
              </div>
            </div>
            <div className="doctors__card__content">
              <h4>Dr. Maria</h4>
              <h5 className='cons'>Consultation: $5</h5>
              <p>Cardiologist</p>
            </div>
          </div>
          <div className="doctors__card">
            <div className="doctors__card__image">
              <img src="/doctor-2.jpg" alt="doctor" />
              <div className="doctors__socials">
                <span><i className="ri-instagram-line"></i></span>
                <span><i className="ri-facebook-fill"></i></span>
                <span><i className="ri-heart-fill"></i></span>
                <span><i className="ri-mail-line"></i></span>
              </div>
            </div>
            <div className="doctors__card__content">
              <h4>Dr. Alex</h4>
              <h5  className='cons'>Consultation: $5</h5>
              <p>Pediatrician</p>
            </div>
          </div>
          <div className="doctors__card">
            <div className="doctors__card__image">
              <img src="/doctor-3.jpg" alt="doctor" />
              <div className="doctors__socials">
                <span><i className="ri-instagram-line"></i></span>
                <span><i className="ri-facebook-fill"></i></span>
                <span><i className="ri-heart-fill"></i></span>
                <span><i className="ri-mail-line"></i></span>
              </div>
            </div>
            <div className="doctors__card__content">
              <h4>Dr. John</h4>
              <h5  className='cons'>Consultation: $5</h5>
              <p>Dermatologist</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
  <div className="section__container footer__container">
    <div className="footer__col">
      <h3>Health<span>Care</span></h3>
      <p>
        We are honored to be a part of your healthcare journey and committed
        to delivering compassionate, personalized, and top-notch care every
        step of the way.
      </p>
      <p>
        Trust us with your health, and let us work together to achieve the
        best possible outcomes for you and your loved ones.
      </p>
    </div>
    <div className="footer__col">
      <h4>About Us</h4>
      <p><a href="#home">Home</a></p>
      <p><a href="#about">About Us</a></p>
      <p><a href="#work">Work With Us</a></p>
      <p><a href="#blog">Our Blog</a></p>
      <p><Link to={"/Harar_terms&conditions"} target='_blank'>Terms & Conditions</Link></p>
    </div>
    <div className="footer__col">
      <h4>Services</h4>
      <p><a href="#search-terms">Search Terms</a></p>
      <p><a href="#advance-search">Advance Search</a></p>
      <p><Link to={"/Harar_privacy_policy"}  target='_blank'>Privacy Policy</Link></p>
      <p><a href="#suppliers">Suppliers</a></p>
      <p><a href="#stores">Our Stores</a></p>
    </div>
    <div className="footer__col">
      <h4>Contact Us</h4>
      <p>
        <i className="ri-map-pin-2-fill"></i> 0340,Kerugoya, Kirinyaga
      </p>
      <p><i className="ri-mail-fill"></i> support@Healthhaven.com</p>
      <p><i className="ri-phone-fill"></i> (+254) 3456 789</p>
    </div>
  </div>
  <div className="footer__bar">
    <div className="footer__bar__content">
      <p>Copyright © 2024 HealthHaven HealthCare. All rights reserved.</p>
      <div className="footer__socials">
        <span><i className="ri-instagram-line"></i></span>
        <span><i className="ri-facebook-fill"></i></span>
        <span><i className="ri-heart-fill"></i></span>
        <span><i className="ri-twitter-fill"></i></span>
      </div>
    </div>
  </div>
</footer>

    </div>
  );
}

// Function to handle the menu toggle
function toggleMenu() {
  const navLinks = document.querySelector('.nav__links');
  navLinks.classList.toggle('show');
}

export default LandingPage;
