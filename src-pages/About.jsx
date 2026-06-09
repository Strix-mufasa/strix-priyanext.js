"use client"
import React from 'react'
import '@/app/style/about.css'
import Nav from '../components/Navbar'
import Footer from '../components/Footer'
const Circleblur = "/assets/img/sr-img.webp"
import BtnNormsall from '../components/normSmall-btn'
const Raj = "/assets/img/raj.webp"
const Ashim = "/assets/img/ashim.webp"
const FamilyBg = "/assets/img/Family.webp"
const Teambg = "/assets/img/teambg.webp"
const Teambur = "/assets/img/teamblur.png"
const Team1 = "/assets/img/team1.png"
const Team2 = "/assets/img/team2.png"
const Team3 = "/assets/img/team3.png"
const Team4 = "/assets/img/team4.png"
const Team5 = "/assets/img/team5.png"
const Team6 = "/assets/img/team6.png"
const positionbg1 = "/assets/img/positionbg1.webp"
const positionbg2 = "/assets/img/positionbg2.webp"
const Dp = "/assets/img/dp.png"
const Collab1 = "/assets/img/collab-icon1.png"
const Collab2 = "/assets/img/collab-icon2.png"
const Collab3 = "/assets/img/collab-icon3.png"
const Collab4 = "/assets/img/collab-icon4.png"
import ButtonB from '../components/ButtonB'
const Etbg1 = "/assets/img/etbg1.webp"
const Etbg2 = "/assets/img/etbg2.webp"
const Etbg3 = "/assets/img/etbg3.webp"
const Etbg4 = "/assets/img/etbg4.webp"
const Etbg5 = "/assets/img/etbg5.webp"
const Etbtn = "/assets/img/etarr.svg"
const Ethcard1 = "/assets/img/etcard1.webp"
const Ethcard2 = "/assets/img/etcard2.webp"
const ValBg1 = "/assets/img/valuebg1.webp"
const ValBg2 = "/assets/img/valuebg2.webp"
const ValBg3 = "/assets/img/valuebg3.webp"
import SlideInFramerAuto from '../animations/SlideInFramer'
import SplitTextOnLoad from '../animations/SplitTextOnLoad'
// import ScrollAnimation from '../animations/scrollReveal'
import SlideInFramerOnLoad from '../animations/SlideInFramerOnLoad'
const Ab1 = "/assets/img/ab1.webp"
const Ab2 = "/assets/img/ab2.webp"
const Ab3 = "/assets/img/ab3.webp"
const Ab4 = "/assets/img/ab4.webp"
const Ab5 = "/assets/img/ab5.webp"
const Ab6 = "/assets/img/ab6.webp"
const Ab7 = "/assets/img/ab7.webp"
const Ab8 = "/assets/img/ab8.webp"
const Linkedin = "/assets/img/linkedin.svg"
const Mail = "/assets/img/mail.svg"
import SEO from '../components/SEO'
const Insta = "/assets/img/insta.svg"
const Blur1 = "/assets/img/blurship1.png"
const Blur2 = "/assets/img/blurship2.png"
import DotGrid from "../animations/DotGrid";
import RotateCardsScroll from '../animations/RotateCardsScroll'
import ScrollSlideAnimations from '../animations/slideins'
import Stagger from '../animations/stagger'
const Aster = "/assets/img/aster.png"
const Mansi = "/assets/img/mansi.png"



const About = () => {
  return (
    <div>
      <SEO
        title="Creative Studio Built on Design & Innovation"
        description="Learn how Strix combines strategic design thinking with scalable technology to help brands worldwide build stronger digital identities and impactful products."
        canonical="https://www.strixproduction.com/about"
      />
      <Nav />
      {/* <SlideInFramerAuto /> */}
      {/* <SplitTextOnLoad /> */}
      {/* <SlideInFramerOnLoad /> */}
      {/* <ScrollAnimation /> */}
      {/* <RotateCardsScroll /> */}
      {/* <ScrollSlideAnimations /> */}
      {/* <Stagger /> */}
      <DotGrid

        dotSize={2}

        gap={24}

        activeColor="#ffffff"

      />


      <div className="about-hero">
        <div className="slidein sh-top uiux-hero">
          <img src={Circleblur} alt="" />
          <h1 className='slideinLoad we-craft'>We craft impact. <br />Not noise.</h1>
        </div>
        <p className='about-hero-p slideinLoad'>At Strix Productions, we design, develop, and deliver world-class visuals and experience that help ambitious brands move faster, scale bigger, and stand out globally.</p>
        <BtnNormsall text='Know more' />
      </div>



      {/* ==========Family=============== */}

      <div className="family">
        <p className='scrollReveal family-p'>Strix  is not just a Production, it’s family</p>
        <div className="family-cards">
          <div className="family-card">
            <img src={FamilyBg} alt="" />
            <div className="fam-detail">
              <img src={Aster} alt="" />
              <h3>Aster</h3>
              <p>Development Head</p>
              <div className="ab-icongrid">
                <a href=""><img src={Linkedin} alt="Linkedin" /></a>
                <a href=""><img src={Mail} alt="Mail" /></a>
                <a href=""><img src={Insta} alt="Instagram" /></a>
              </div>
            </div>
          </div>

          <div className="family-card">
            <img src={FamilyBg} alt="" />
            <div className="fam-detail">
              <img className='raj' src={Ab2} alt="" />
              <h3>Rajnandan </h3>
              <p>Founder & Creative Director</p>
              <div className="ab-icongrid">
                <a href=""><img src={Linkedin} alt="Linkedin" /></a>
                <a href=""><img src={Mail} alt="Mail" /></a>
                <a href=""><img src={Insta} alt="Instagram" /></a>
              </div>
            </div>
          </div>


          <div className="family-card">
            <img src={FamilyBg} alt="" />
            <div className="fam-detail">
              <img src={Mansi} alt="" />
              <h3>Mansi</h3>
              <p>Creative Head</p>
              <div className="ab-icongrid">
                <a href=""><img src={Linkedin} alt="Linkedin" /></a>
                <a href=""><img src={Mail} alt="Mail" /></a>
                <a href=""><img src={Insta} alt="Instagram" /></a>
              </div>
            </div>
          </div>

        </div>
        <p className='fam-p'>Visionary mind steering Strix Production toward global impact!</p>
      </div>



      {/* ==============Our teams=============== */}
      <div className="team">
        <p className='scrollReveal team-h1'>Our Teams</p>
        <div className="team-cards">


          <div className="team-card p-sec2-card1">
            <div className="family-card team-fm-card">
              <img src={Teambg} alt="" />
              <div className="fam-detail team-fm-detail">
                <img className='team-id1 fam-detail-img' src={Ab3} alt="" />
                <h3>Ashmin</h3>
                <p>Production Head</p>
              </div>
            </div>
            <p className='team-card-p'>Architects of seamless, scalable digital experiences.</p>
            <BtnNormsall text='Hire Team' />
          </div>


          <div className="team-card p-sec2-card2">
            <div className="family-card team-fm-card">
              <img src={Teambg} alt="" />
              <div className="fam-detail team-fm-detail">
                <img className='team-id2 fam-detail-img' src={Ab4} alt="" />
                <h3>UX/UI</h3>
                <p>Experience Wizards</p>
              </div>
            </div>
            <p className='team-card-p'>Designers who turn complexity into intuitive beauty.</p>
            <BtnNormsall text='Hire Team' />
          </div>



          <div className="team-card p-sec2-card1">
            <div className="family-card team-fm-card">
              <img src={Teambg} alt="" />
              <div className="fam-detail team-fm-detail">
                <img className='team-id3 fam-detail-img' src={Ab5} alt="" />
                <h3>Graphic Designers</h3>
                <p>Visual Alchemists</p>
              </div>
            </div>
            <p className='team-card-p'>Masters of visuals that stick and stories that sell.</p>
            <BtnNormsall text='Hire Team' />
          </div>




          <div className="team-card p-sec2-card2">
            <div className="family-card team-fm-card">
              <img src={Teambg} alt="" />
              <div className="fam-detail team-fm-detail">
                <img className='team-id4 fam-detail-img' src={Ab6} alt="" />
                <h3>Video Editors</h3>
                <p>Frame Magicians</p>
              </div>
            </div>
            <p className='team-card-p'>Cutting, crafting, and creating stories in motion.</p>
            <BtnNormsall text='Hire Team' />
          </div>


          <div className="team-card p-sec2-card1">
            <div className="family-card team-fm-card">
              <img src={Teambg} alt="" />
              <div className="fam-detail team-fm-detail">
                <img className='team-id5 fam-detail-img' src={Ab7} alt="" />
                <h3>Sales</h3>
                <p>Growth Hackers</p>
              </div>
            </div>
            <p className='team-card-p'>Strategies, opportunities, growth in action.</p>
            <BtnNormsall text='Hire Team' />
          </div>


          <div className="team-card p-sec2-card2XZ">
            <div className="family-card team-fm-card">
              <img src={Teambg} alt="" />
              <div className="fam-detail team-fm-detail">
                <img className='team-id6 fam-detail-img ' src={Ab8} alt="" />
                <h3>3d & Animations</h3>
                <p>Reality Benders</p>
              </div>
            </div>
            <p className='team-card-p'>World-builders bringing imagination to life in motion.</p>
            <BtnNormsall text='Hire Team' />
          </div>
          <img className='tblur' src={Teambur} alt="" />
        </div>
        <p className='team-p'>At Strix Productions, we design, develop, and deliver world-class visuals and experience that help ambitious brands move faster, scale bigger, and stand out globally.</p>
      </div>


      {/* ==============Position=============== */}
      <div className="positions">
        <img className='abblur1' src={Blur1} alt="" />
        <img className='abblur2' src={Blur2} alt="" />


        <p className='scrollReveal positions-p'>Rising positions and recognitions</p>
        <div className="po-top">
          <div className="po-top-left slideInLeft desktop-po">
            <img className='bg-out' src={positionbg1} alt="" />
            <div className="oval-blur"></div>
            <div className="po-top-left-de">
              <h3 className='hover-text'>2 + <br /> years</h3>
              <p>Building global presence</p>
            </div>
          </div>

          <div className="po-top-right slideInRight">
            <img src={positionbg2} alt="" />
            <div className="po-top-right-de">
              <h3 className='hover-text' >10+ successfully developed startups </h3>
              <p className='no-forec'>I'm glad I decided to work with you. It's really great how easy your websites are to update and manage.</p>
              <div>
                <img src={Dp} alt="" />
                <p>Abhishek Verma</p>
              </div>
            </div>
          </div>

        </div>
        <div className="po-bottom">
          <div className="po-top-left mobile-po slideInTopLeft">
            <img src={positionbg1} alt="" />
            <div className="po-top-left-de">
              <h3 className='hover-text'>2 + <br /> years</h3>
              <p>Building global presence</p>
            </div>
          </div>

          <div className="po-top-left slideInBottomLeft">
            <img src={positionbg1} alt="" />
            <div className="po-top-left-de">
              <h3 className='hover-text'>220 + <br /> Projects</h3>
              <p>Delivered Successfully</p>
            </div>
          </div>

          <div className="po-top-left scrollReveal">
            <img src={positionbg1} alt="" />
            <div className="po-top-left-de">
              <h3 className='hover-text'>10 + <br /> Team of</h3>
              <p>Storytellers and makers</p>
            </div>
          </div>

          <div className="po-top-left slideInBottomRight">
            <img src={positionbg1} alt="" />
            <div className="po-top-left-de">
              <h3 className='hover-text'>15 + <br /> Services</h3>
              <p>One creative hub</p>
            </div>
          </div>
        </div>
      </div>


      {/* ==============DNA=============== */}
      <div className="dna">
        <p className='dna-h1 slideInTopLeft'>What is imprinted in our DNA ?</p>
        <div className="dna-left slideInTopLeft">
          <h2>Mission</h2>
          <p>We partner with funded startups, technology SMEs, and Fortune 500 companies to deliver high-impact design, development, and production solutions that fuel growth.</p>
        </div>
        <div className="dna-right slideInBottomRight">
          <h2>Vision</h2>
          <p>We, at Strix, aim to become the go-to creative powerhouse for brands seeking premium, innovative, and scalable results.</p>
        </div>
      </div>



      {/* =============collab=================== */}

      <div className="collab">
        <p className="scrollReveal collab-h1" >
          Collaborative Design, Guaranteed Quality
        </p>
        <div className="collab-cards">

          <div className="collab-card stagger1">
            <img src={Collab1} alt="" />
            <p>Progress updates &<br /> tracked hours</p>
          </div>

          <div className="collab-card stagger2">
            <img src={Collab2} alt="" />
            <p>Progress updates &<br /> tracked hours</p>
          </div>

          <div className="collab-card stagger3">
            <img src={Collab3} alt="" />
            <p>Progress updates &<br /> tracked hours</p>
          </div>

          <div className="collab-card stagger4">
            <img src={Collab4} alt="" />
            <p>Progress updates &<br /> tracked hours</p>
          </div>
        </div>

        <ButtonB text='Book Appointment' />
      </div>



      {/* ===================expert==================== */}

      <div className="expert">
        <h2 className="scrollReveal" >Design Expertise Across Industries</h2>
        <div className='expert-top'>
          <div className="et-top-card">
            <img src={Etbg1} alt="" />
            <div className="et-top-card-con">
              <h3 className='saas'>SaaS</h3>
              <div className="et-flex">
                <div className='et-btn'>
                  <img className='ontop' src={Ethcard1} alt="" />
                  <img className='onbottom' src={Ethcard2} alt="" />
                  <p>CRM & HR Tech</p>
                </div>

                <div className='et-btn'>
                  <img className='ontop' src={Ethcard1} alt="" />
                  <img className='onbottom' src={Ethcard2} alt="" />
                  <p>Data Dashboards</p>
                </div>

                <div className='et-btn'>
                  <img className='ontop' src={Ethcard1} alt="" />
                  <img className='onbottom' src={Ethcard2} alt="" />
                  <p>Product Design</p>
                </div>

                <div className='et-btn'>
                  <img className='ontop' src={Ethcard1} alt="" />
                  <img className='onbottom' src={Ethcard2} alt="" />
                  <p>Brand Systems</p>
                </div>
              </div>
              <div className="et-center">
                <div className='et-btn'>
                  <img className='ontop' src={Ethcard1} alt="" />
                  <img className='onbottom' src={Ethcard2} alt="" />
                  <p>MVP Development</p>
                </div>
              </div>
              <img className='etarr' src={Etbtn} alt="" />
            </div>
          </div>


          <div className="et-top-card">
            <img src={Etbg2} alt="" />
            <div className="et-top-card-con">
              <h3 className='saas'>Fintech</h3>
              <div className="et-flex">
                <div className='et-btn'>
                  <img className='ontop' src={Ethcard2} alt="" />
                  <img className='onbottom' src={Ethcard1} alt="" />
                  <p>App Design</p>
                </div>

                <div className='et-btn'>
                  <img className='ontop' src={Ethcard2} alt="" />
                  <img className='onbottom' src={Ethcard1} alt="" />
                  <p>Trading Platforms</p>
                </div>

                <div className='et-btn'>
                  <img className='ontop' src={Ethcard2} alt="" />
                  <img className='onbottom' src={Ethcard1} alt="" />
                  <p>Corporate Identity</p>
                </div>

                <div className='et-btn'>
                  <img className='ontop' src={Ethcard2} alt="" />
                  <img className='onbottom' src={Ethcard1} alt="" />
                  <p>Digital Payments</p>
                </div>
              </div>
              <div className="et-center et-d">
                <div className='et-btn'>
                  <img className='ontop' src={Ethcard2} alt="" />
                  <img className='onbottom' src={Ethcard1} alt="" />
                  <p>Secure Web Portals</p>
                </div>
              </div>
              <img className='etarr' src={Etbtn} alt="" />
            </div>
          </div>




          <div className="et-top-card et-destop">
            <img src={Etbg3} alt="" />
            <div className="et-top-card-con">
              <h3 className='saas'>E-commerce</h3>
              <div className="et-flex">
                <div className='et-btn'>
                  <img className='ontop' src={Ethcard1} alt="" />
                  <img className='onbottom' src={Ethcard2} alt="" />
                  <p>Online stores</p>
                </div>

                <div className='et-btn'>
                  <img className='ontop' src={Ethcard1} alt="" />
                  <img className='onbottom' src={Ethcard2} alt="" />
                  <p>B2B/B2C</p>
                </div>

                <div className='et-btn'>
                  <img className='ontop' src={Ethcard1} alt="" />
                  <img className='onbottom' src={Ethcard2} alt="" />
                  <p>Product Promos</p>
                </div>

                <div className='et-btn'>
                  <img className='ontop' src={Ethcard1} alt="" />
                  <img className='onbottom' src={Ethcard2} alt="" />
                  <p>3D Commercials</p>
                </div>
              </div>
              <div className="et-center">
                <div className='et-btn'>
                  <img className='ontop' src={Ethcard1} alt="" />
                  <img className='onbottom' src={Ethcard2} alt="" />
                  <p>product configurators</p>
                </div>
              </div>
              <img className='etarr' src={Etbtn} alt="" />
            </div>
          </div>



        </div>

        <div className="expert-bottom">

          <div className="et-top-card et-mobile">
            <img src={Etbg3} alt="" />
            <div className="et-top-card-con">
              <h3 className='saas'>E-commerce</h3>
              <div className="et-flex">
                <div className='et-btn'>
                  <img src={Ethcard1} alt="" />
                  <p>Online stores</p>
                </div>

                <div className='et-btn'>
                  <img src={Ethcard1} alt="" />
                  <p>B2B/B2C</p>
                </div>

                <div className='et-btn'>
                  <img src={Ethcard1} alt="" />
                  <p>Product Promos</p>
                </div>

                <div className='et-btn'>
                  <img src={Ethcard1} alt="" />
                  <p>3D Commercials</p>
                </div>
              </div>
              <div className="et-center">
                <div className='et-btn'>
                  <img src={Ethcard1} alt="" />
                  <p>product configurators</p>
                </div>
              </div>
              <img className='etarr' src={Etbtn} alt="" />
            </div>
          </div>


          <div className="et-top-card">
            <img src={Etbg5} alt="" />
            <div className="et-top-card-con">
              <h3 className='saas'>Startups</h3>
              <div className="et-flex">
                <div className='et-btn'>
                  <img src={Ethcard1} alt="" />
                  <p>MVP design</p>
                </div>

                <div className='et-btn'>
                  <img src={Ethcard1} alt="" />
                  <p>platform UX</p>
                </div>

                <div className='et-btn'>
                  <img src={Ethcard1} alt="" />
                  <p>mobile apps</p>
                </div>

                <div className='et-btn'>
                  <img src={Ethcard1} alt="" />
                  <p>dashboards</p>
                </div>
              </div>
              <div className="et-center">
                <div className='et-btn'>
                  <img src={Ethcard1} alt="" />
                  <p>developer tools</p>
                </div>
              </div>
              <img className='etarr' src={Etbtn} alt="" />
            </div>
          </div>



          <div className="et-top-card">
            <img src={Etbg4} alt="" />
            <div className="et-top-card-con">
              <h3 className='saas'>Agencies</h3>
              <div className="et-flex">
                <div className='et-btn'>
                  <img src={Ethcard1} alt="" />
                  <p>Portfolio  site</p>
                </div>

                <div className='et-btn'>
                  <img src={Ethcard1} alt="" />
                  <p>Brand Identity</p>
                </div>

                <div className='et-btn'>
                  <img src={Ethcard1} alt="" />
                  <p>Client Portals</p>
                </div>

                <div className='et-btn'>
                  <img src={Ethcard1} alt="" />
                  <p>Creative Assets</p>
                </div>
              </div>
              <div className="et-center">
                <div className='et-btn'>
                  <img src={Ethcard1} alt="" />
                  <p>Promotional Content</p>
                </div>
              </div>
              <img className='etarr' src={Etbtn} alt="" />
            </div>
          </div>


        </div>

        <p className="et-pp scrollReveal">
          Our product designers bring deep, cross-industry experience—crafting tailored design solutions that not only look great but also drive real business value. No matter the niche, we know how to make your digital product stand out and succeed.
        </p>
      </div>



      {/* ======================Value==================== */}

      <div className="value">
        <h2 className="scrollReveal">Our Values</h2>
        <div className="value-cards">
          <div className="value-card slideInLeft">
            <img className='vci' src={ValBg1} alt="" />
            <div className="value-card-de">
              <h2 className='hover-text'>Growth</h2>
              <p>Evolving every day</p>
            </div>
          </div>

          <div className="value-card scrollReveal">
            <img className='vci vcim' src={ValBg2} alt="" />
            <div className="value-card-de">
              <h2 className='hover-text'>People</h2>
              <p>Driven by humans</p>
            </div>
          </div>

          <div className="value-card slideInRight">
            <img className='vci' src={ValBg3} alt="" />
            <div className="value-card-de">
              <h2 className='hover-text'>Awareness</h2>
              <p>Mindful by design</p>
            </div>
          </div>
        </div>
        <p className='value-p scrollReveal'>We grow with purpose, put people first, and create with awareness at every step</p>
      </div>

      <div className="create">
        <h2 className="scrollReveal">Let’s create amazing digital <br />
          experiences together</h2>

        <p className="scrollReveal">Strix is a global remote team with a global footprint. <br />Don`t hesitate to reach out to us with your projects, ideas, and questions.</p>
        <div className="btnb-con">
          <ButtonB text='Book Appointment' />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default About



























