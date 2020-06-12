window.onload = function () {
  /*
    Reset nav menu when resizing the window
  */
  (() => {
    const nav = document.querySelector('.main-nav');
    window.addEventListener('resize', _.debounce(function () {
      nav.classList.remove('-open');
    }, 50));
  })();
  /*
    Scroll to section
  */


  (() => {
    document.querySelectorAll('.nav-link').forEach(link => {
      // Get position of the target section
      const position = document.querySelector(link.getAttribute('href')).offsetTop;
      link.addEventListener('click', function (e) {
        e.preventDefault(); // Close the menu

        document.querySelector('.main-nav').classList.remove('-open');
        document.documentElement.style.overflow = 'auto'; // Scroll to the requested position

        window.scrollTo(0, position);
      });
    });
  })();
  /*
    Open/Close mobile navigation bar
    Add a -open class to the main nav element when clicking the menu icon
  */


  (() => {
    document.querySelector('.menu .icon').addEventListener('click', function () {
      const root = document.documentElement;
      const mainNav = document.querySelector('.main-nav');
      const open = '-open'; // Toggle the -open class

      if (mainNav.classList.contains(open)) {
        mainNav.classList.remove(open);
        root.style.overflow = 'auto';
      } else {
        mainNav.classList.add(open);
        root.style.overflow = 'hidden';
      }
    });
  })();
  /*
    Navigation bar active item
     Highlight the active item in the nav bar according to the position of the page
  */


  (() => {
    document.querySelectorAll('.nav-link').forEach(link => {
      const root = document.documentElement;
      const targetSection = document.querySelector(link.getAttribute('href'));
      const sectionBoundaries = {
        start: targetSection.offsetTop,
        end: targetSection.offsetTop + targetSection.offsetHeight
      };
      window.addEventListener('scroll', _.debounce(function () {
        // Check if the nav is on top of the section
        // The nav is always at the top of the window so we use the root element instead
        if (root.scrollTop > sectionBoundaries.start && root.scrollTop < sectionBoundaries.end) {
          link.classList.add('-active');
        } else {
          link.classList.remove('-active');
        }
      }, 25));
    });
  })();
  /*
    Navigation bar background colors
     The navigation bar colors are updated depending on the section that's underneath.
    First we get a list of sections with their positions and the class that should be
    added to the nav bar when it's in that range. Then we check on every scroll what
    the new position is and we update the classes depending on that.
     Although the functionality itself of this block is similar to the previous one we have
    them separated because their meaning is different.
  */


  (() => {
    // List of sections and their positions
    const sections = [// Companies section
    (() => {
      const section = document.querySelector('.companies-section');
      return {
        class: '-dark',
        start: section.offsetTop,
        end: section.offsetTop + section.offsetHeight
      };
    })(), // Principles section
    (() => {
      const section = document.querySelector('.principles-section');
      return {
        class: '-medium',
        start: section.offsetTop,
        end: section.offsetTop + section.offsetHeight
      };
    })()]; // For every section we add an event listener on scroll to update
    // the class of the nav bar. We also use underscore.debounce to
    // limit the amount of functions calls

    sections.forEach(section => {
      const root = document.documentElement;
      const navBar = document.querySelector('.main-nav');
      window.addEventListener('scroll', _.debounce(function () {
        // Check if the nav is on top of the section
        // The nav is always at the top of the window so we use the root element
        if (root.scrollTop > section.start && root.scrollTop < section.end) {
          navBar.classList.add(section.class);
        } else {
          navBar.classList.remove(section.class);
        }
      }, 5));
    });
  })();
  /*
    Companies section
  */


  (() => {
    const companiesList = document.querySelectorAll('.companies-list li');
    companiesList.forEach(company => {
      // Duplicate the company description inside the company list item
      // This is used in mobile devices since the description is shown
      // right below the item unlike in the desktop version
      const mobileDescription = document.querySelector(`.company-description.${company.dataset.target}`).cloneNode(true); // It's hidden by default, will be visible on small devices via CSS

      mobileDescription.style.display = 'none'; // Make it distinguishable from the description shown in large devices

      mobileDescription.classList.add('-mobile');
      mobileDescription.classList.remove('-desktop'); // Insert the element before the end of the company list item

      company.insertAdjacentElement('beforeend', mobileDescription); // Show the appropriate description

      company.addEventListener('click', function () {
        const target = document.querySelector(`.company-description.-desktop.${this.dataset.target}`);
        document.querySelector('.companies-illustration').style.opacity = 0; // Remove previous description and current item if they exist

        const previouslySelectedDescription = document.querySelector('.company-description.-visible');
        const previouslySelectedItem = document.querySelector('.companies-list .-active'); // Remove previously selected items

        if (previouslySelectedDescription && previouslySelectedItem) {
          previouslySelectedDescription.classList.remove('-visible');
          previouslySelectedItem.classList.remove('-active');
        } // Mark the current item as active


        this.classList.add('-active'); // Show the selected description

        target.classList.add('-visible');
      });
    });
  })();
};