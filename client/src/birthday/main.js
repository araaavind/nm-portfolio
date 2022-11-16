import './styles.css'
import GSAP from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Experience from './experience/experience';

const experience = new Experience(document.querySelector('.experience-canvas'));
GSAP.registerPlugin(ScrollToPlugin);

const scrollPoints = {
  'Home': document.querySelector('.home').getBoundingClientRect().top,
  'About': document.querySelector('.about').getBoundingClientRect().top,
  'Work': document.querySelector('.work').getBoundingClientRect().top,
  'Skills': document.querySelector('.skills').getBoundingClientRect().top,
  'Contact': document.querySelector('.contact').getBoundingClientRect().top
};

function menuItemClick(e) {
  const body = document.body, html = document.documentElement;
  const height = Math.max(body.scrollHeight, body.offsetHeight,
    html.clientHeight, html.scrollHeight, html.offsetHeight);
  const navbarHeight = document.querySelector('.navbar').getBoundingClientRect().height;
  GSAP.to(window, { duration: .02, scrollTo: scrollPoints[e.textContent] - navbarHeight });

  if (document.querySelector('.navbar .menu').classList.contains('active')) {
    document.querySelector('.navbar .menu').classList.toggle('active');
    document.querySelector('.navbar .menu-btn i').classList.toggle('active');
    document.querySelector('body').classList.toggle('menu-open');
  }
}

window.menuItemClick = menuItemClick;