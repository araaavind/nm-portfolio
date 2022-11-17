import './styles.css';
import './loading.css';
import $ from 'jquery';
import GSAP from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Experience from './experience/experience';

const experience = new Experience($('.experience-canvas')[0]);
GSAP.registerPlugin(ScrollToPlugin);

const scrollPoints = {
  'Home': $('.home')[0].getBoundingClientRect().top,
  'About': $('.about')[0].getBoundingClientRect().top,
  'Work': $('.work')[0].getBoundingClientRect().top,
  'Skills': $('.skills')[0].getBoundingClientRect().top,
  'Contact': $('.contact')[0].getBoundingClientRect().top
};

function menuItemClick(e) {
  const body = document.body, html = document.documentElement;
  const height = Math.max(body.scrollHeight, body.offsetHeight,
    html.clientHeight, html.scrollHeight, html.offsetHeight);
  const navbarHeight = $('.navbar')[0].getBoundingClientRect().height;
  GSAP.to(window, { duration: .02, scrollTo: scrollPoints[e.textContent] - navbarHeight });

  if ($('.navbar .menu')[0].hasClass('active')) {
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