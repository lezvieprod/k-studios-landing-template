// Load page
let PageLoaded = function() {
  const page = document.documentElement;
  page.classList.remove('overflow-hidden')
  page.setAttribute("data-loaded","loaded");
  $('.preloader').fadeOut(200);
}
window.onload = function() {
  setTimeout(PageLoaded, 410);
}



$( document ).ready(function() {
  
  //simple parallax init
  let image = document.getElementsByClassName('thumbnail');
  new simpleParallax(image, {
    delay: 0,
    orientation: 'down',
    scale: 1.3,
    overflow: true,
  });


  var wow = new WOW(
    {
      boxClass:     'wow',      // animated element css class (default is wow)
      animateClass: 'animated', // animation css class (default is animated)
      offset:       0,          // distance to the element when triggering the animation (default is 0)
      mobile:       false,       // trigger animations on mobile devices (default is true)
      live:         true,       // act on asynchronously loaded content (default is true)
      scrollContainer: null // optional scroll container selector, otherwise use window
    }
  );
  wow.init();

  // navbar fix color
  const navbarToggler = document.querySelector('.navbar-toggler');
  const pageHeader = document.querySelector('.sticky-navbar');
  const navbarToggleMenu = document.querySelector('.navbar-collapse');
  navbarToggler.addEventListener('click', function() {
    setTimeout(function() {
      if(navbarToggleMenu.classList.contains('show')) {
        pageHeader.classList.add('sticky-navbar--collapsed');
      } else {
        pageHeader.classList.remove('sticky-navbar--collapsed');
      }
    }, 400);
  })

  // smooth scrool to anchor
  const toAnchor = document.querySelectorAll('a[href^="#"]');
  toAnchor.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
  });
  
  // smooth scrool to top
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.scroll-up').fadeIn();
    } else {
      $('.scroll-up').fadeOut();
    }
  });

  // change stickyNavbar if isnt top of page or preview
  function isTopOfPage() {
    const stickyNavbar = document.querySelector('.sticky-navbar');
    const stickyNavBarHeight = stickyNavbar.offsetHeight;
    const windowScroll = document.documentElement.scrollTop;
    const pageContentPos = document.getElementById('pageContent').offsetTop - stickyNavBarHeight;
    const pageContentHeight = document.getElementById('pageContent').offsetHeight;
    
    if(windowScroll <= pageContentPos) { 
      window.addEventListener('scroll', changeStickyBar);
    }
    else if(windowScroll  > pageContentPos && windowScroll < (pageContentPos + pageContentHeight)) {
      stickyNavbar.classList.add('bg-black');
      window.addEventListener('scroll', changeStickyBar);
    } else {
      window.addEventListener('scroll', changeStickyBar);
    }
  }

  // change stickyNavbar if isnt top of page or preview
  function changeStickyBar() {
      const stickyNavbar = document.querySelector('.sticky-navbar');
      const stickyNavBarHeight = stickyNavbar.offsetHeight;
      const windowScroll = document.documentElement.scrollTop;
      const pageContentPos = document.getElementById('pageContent').offsetTop - stickyNavBarHeight;
      const pageContentHeight = document.getElementById('pageContent').offsetHeight;
      if(windowScroll  > pageContentPos && windowScroll < (pageContentPos + pageContentHeight) ) {    
        stickyNavbar.classList.add('bg-black');
      } else {  
        stickyNavbar.classList.remove('bg-black');
      }
  }

  isTopOfPage();

  // make labels active then focus input
  const inputs = document.querySelectorAll('input:not(:last-child)');
  const textareas = document.querySelectorAll('textarea');
  const labels = document.querySelectorAll('label');

  inputs.forEach(item => {
    item.addEventListener('change', function() {
      if(item && item.value) {
        this.labels.forEach(item => {
          item.classList.add('active_label');
        });
      } else {
        this.labels.forEach(item => {
          item.classList.remove('active_label');
        });
      }
    })
  });

  textareas.forEach(item => {
    item.addEventListener('change', function() {
      if(item && item.value) {
        this.labels.forEach(item => {
          item.classList.add('active_label');
        })
      } else {
        this.labels.forEach(item => {
          item.classList.remove('active_label');
        })
      }
    })
  });

  // clear inputs and textarea for firefox... after reload page
  function clearForms() {
    inputs.forEach(item => {
      item.value = ""
    });
    textareas.forEach(item => {
      item.value = ""
    })
  }
  clearForms()
 

});
