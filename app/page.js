'use client'
import styles from "./page.module.css"
import Image from 'next/image';
import React, { useRef } from 'react';


export default function Home() {
    const servicesRef = useRef(null);
    const aboutRef = useRef(null);
    const doctorRef = useRef(null);
    const scrollToSection = (ref) => {
        ref.current.scrollIntoView({ behavior: 'smooth' ,top:100});
    }
  return (
    <main >
      <nav className={styles.sideNav}>
        <Image className = {styles.logo} src="/glowup.png"  width={400} height={80}/>
        <ul>
          <li>
              <a onClick={() => scrollToSection(aboutRef)}>About</a>
          </li>
          <li>
              <a onClick={() => scrollToSection(servicesRef)}>Survices</a>
          </li>
          <li>
              <a href="./bookAppointment">Book An Appointment</a>
          </li>
          <li>
              <a onClick={() => scrollToSection(doctorRef)}>Doctors</a>
          </li>
          <li>
              <a>Contact Us</a>
          </li>
          
        </ul>
      </nav>
      <div className={styles.welcomeDiv}>
        <h1>Welcome To <Image className = {styles.imagewelcome} src="/glowup.png"  width={400} height={80}/></h1>
        <p>Your Skin Matters</p>
        <div>
          <button> <a href="./login">Login</a></button>
          <button><a href="./signup">Sign Up</a></button>
        </div>
      </div>
      <div className={styles.about} ref={aboutRef}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}> Welcome To Our Clinic</h2>
          <span className={styles.line} >______________</span>
          <p >With a focus on both medical and cosmetic dermatology, 
              we offer a comprehensive range of services.
              From diagnosing and treating skin conditions such as acne, eczema, and psoriasis, 
              to providing advanced anti-aging treatments and skin rejuvenation procedures, 
              we are here to address all your skin concerns.</p>
        </div>
      </div>
      
        <div className={styles.services}  ref={servicesRef}>
                <div className={styles.serviceTitleContainer}>
                    <h2 className={styles.servicesTitle}>Our Services</h2>
                    <span >______________</span>
                </div>
                <div className={styles.totalServices}>
                    
                    <div className={styles.eachService}>
                        <img src="/MEDICAL-DERMATOLOGY.jpg" className={styles.serviceImg} ></img>
                        <h3 className={styles.serviceName}>Medical Dermatology</h3>
                        <p className={styles.serviceDescription}>We diagnose and treat a range of skin conditions such as acne, eczema, psoriasis, rosacea, dermatitis, skin infections, and more.</p>
                        <button className={styles.bookBtn}>Book</button>
                    </div>

                    <div className={styles.eachService}>
                        <img src='/botoxt.webp' className={styles.serviceImg} ></img>
                        <h3 className={styles.serviceName}> Laser hair removal </h3>
                        <p className={styles.serviceDescription}> Safe and effective hair removal using laser technology to target hair follicles, providing long-lasting results.</p>
                        <button className={styles.bookBtn}>Book</button>
                    </div>
                    
                    <div className={styles.eachService}>
                        <img src='/botoxt.webp' className={styles.serviceImg} ></img>
                        <h3 className={styles.serviceName}>Botox and Dermal Fillers</h3>
                        <p className={styles.serviceDescription}>Minimally invasive procedures to reduce wrinkles, fine lines, and restore volume to areas of the face, such as lips and cheeks.</p>
                        <button className={styles.bookBtn}>Book</button>
                    </div>

                    <div className={styles.eachService}>
                        <img src="/treatment.png" className={styles.serviceImg} ></img>
                        <h3 className={styles.serviceName}>Facial Treatments</h3>
                        <p className={styles.serviceDescription}>Customized facials and skin treatments tailored to address specific concerns, such as hydration, brightening, or anti-aging.</p>
                        <button className={styles.bookBtn}>Book</button>
                    </div>

                    <div className={styles.eachService}>
                        <img src="/hair.jpg" className={styles.serviceImg} ></img>
                        <h3 className={styles.serviceName}>Hair and Nail Disorders</h3>
                        <p className={styles.serviceDescription}>We diagnose and treat various hair and nail conditions, including hair loss (alopecia), scalp infections, nail infections, and nail disorders.</p>
                        <button className={styles.bookBtn}>Book</button>
                    </div>

                    <div className={styles.eachService}>
                        <img src="/surgical.webp" className={styles.serviceImg} ></img>
                        <h3 className={styles.serviceName}>Dermatologic Surgery</h3>
                        <p className={styles.serviceDescription}>Our skilled dermatologic surgeons perform various surgical procedures, including mole removal, skin biopsies, skin cancer excisions.</p>
                        <button className={styles.bookBtn}>Book</button>
                    </div>
                </div>
        </div>
        <div className={styles.doctors} ref={doctorRef} >
            <div className={styles.doctorTitleContainer}>
                <h2 className={styles.doctorTitle}>Doctors</h2>
                <span>______________</span>
            </div>
            <div className={styles.totalDoctors}>
                <div className={styles.eachDoctor}>
                    <img src="/sofia.jpg" className={styles.doctorImg}></img>
                    <h3 className={styles.doctorName}>Dr. Sofia</h3>
                    <h4 className={styles.doctorSpec}>Ph.D. in Experimental Dermatology</h4>
                </div>
                <div className={styles.eachDoctor}>
                    <img src="/smith.jpg" className={styles.doctorImg}></img>
                    <h3 className={styles.doctorName}>Dr. Kris Adam</h3>
                    <h4 className={styles.doctorSpec}>Ph.D. in Cutaneous Biology and Regenerative Medicine</h4>
                </div>
                <div className={styles.eachDoctor}>
                    <img src="/alex.jpg" className={styles.doctorImg}></img>
                    <h3 className={styles.doctorName}>Dr. Alexandra Reynolds</h3>
                    <h4 className={styles.doctorSpec}>Ph.D. in Skin Pharmacology</h4>
                </div>
                <div className={styles.eachDoctor}>
                    <img src="/sofia.jpg" className={styles.doctorImg}></img>
                    <h3 className={styles.doctorName}>Dr. Lisa Martin</h3>
                    <h4 className={styles.doctorSpec}>Ph.D. in Experimental Dermatology</h4>
                </div>
                <div className={styles.eachDoctor}>
                    <img src="/sofia.jpg" className={styles.doctorImg}></img>
                    <h3 className={styles.doctorName}>Dr. Jared Daniel</h3>
                    <h4 className={styles.doctorSpec}>Ph.D. in Dermatological Sciences</h4>
                </div>
                <div className={styles.eachDoctor}>
                    <img src="/sofia.jpg" className={styles.doctorImg}></img>
                    <h3 className={styles.doctorName}>Dr. Emma steeve</h3>
                    <h4 className={styles.doctorSpec}>Ph.D. in Dermatoepidemiology</h4>
                </div>
            </div>

        </div>
        
    </main>
  );
}
