import React, { useEffect} from 'react'
import { Button } from '@material-ui/core'
import HomePageImg from '../img/HomePageImg.svg'


export default function HomePage() {
    useEffect(() => {
        document.getElementById('navMargin').setAttribute('style', `margin: ${document.querySelector('nav').offsetHeight }`)
        return () => {
            //cleanup
        }
    }, [])
    return (
        <div>
        <div id='homePageDivPurple' className='homePageDivPurple'>
            <br></br>
            <br></br>
            <h1 className='homepage-text'>CONNECT!</h1>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div id='homePageDivWhite' className='homePageDivWhite'>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <h2 className='homepage-text-medium'>Take learning to the <br/> next level.</h2>
            <br /><br /><br /><br /><br />
            <h3 className='homepage-text-small'>CONNECT! helps you learn fast <br /> and together.</h3>
            <br /><br /><br /><br /><br />
            <Button style={{zIndex:'2'}} id='button-start' variant="contained" color="primary" size='large' onClick={()=>{window.location = '/play'}}>Start Learning ➞</Button>
            <br></br><br></br><br></br><br></br>
            <img className='imgDiv' id='home-page-img' alt='home-page-img' src={HomePageImg}/>
            </div>
        </div>
        <div className="newdiv2">
            <h1>About</h1>
            <div>
                <p>CONNECT!’s goal is to make class learning easier and more fun for students and teachers from all around the world.</p>
                <p>For us, learning is the key to forging a better future and it is our prioritie to make learning more accesible and more engaging for everywhere.</p>
            </div>
            <div id='aboutContainer'>
                <div className='about-card'>
                    <h3>Card 1</h3>
                </div>
                <div className='about-card'>
                    <h3>Card 2</h3>
                </div>
                <div className='about-card'>
                    <h3>Card 3</h3>
                </div>
            </div>
        </div>
        </div>
    )
}
