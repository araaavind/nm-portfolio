import './styles.css';
import './loading.css';
import $ from 'jquery';
import GSAP from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Experience from './experience/experience';

const experience = new Experience($('.experience-canvas')[0]);
GSAP.registerPlugin(ScrollToPlugin);

let scrollProgress;
experience.sizes.on('switchdevice', () => setScrollProgress(experience.sizes.device));
setScrollProgress(experience.sizes.device);

function setScrollProgress(device) {
  scrollProgress = device == 'desktop' ? {
    'Home': 0,
    'About': .17,
    'Work': .368,
    'Skills': .59,
    'Contact': .788
  } : {
    'Home': 0,
    'About': .2,
    'Work': .385,
    'Skills': .575,
    'Contact': .74
  };
}

function menuItemClick(e) {
  GSAP.to(window, { duration: .02, scrollTo: scrollProgress[e.textContent] * $('main')[0].scrollHeight });

  if ($('.navbar .menu').hasClass('active')) {
    $('.navbar .menu').toggleClass('active');
    $('.navbar .menu-btn i').toggleClass('active');
    $('body').toggleClass('menu-open');
  }
}

window.menuItemClick = menuItemClick;

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    $('.navbar').addClass('sticky');
  } else {
    $('.navbar').removeClass('sticky');
  }

  if (window.scrollY > 500) {
    $('.scroll-up-btn').addClass('show');
  } else {
    $('.scroll-up-btn').removeClass('show');
  }
});

$('.scroll-up-btn').on('click', () => {
  $('html').scrollTop(0);
});

$('main').on('touchstart', () => {
  if ($('.menu').hasClass('active')) {
    $('.menu').toggleClass('active');
    $('.navbar .menu-btn i').toggleClass('active');
  }
});