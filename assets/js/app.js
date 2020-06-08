window.onload = function() {
  /*
    Mobile navigation bar
    Add a -open class to the main nav element when clicking the menu icon
  */
  (() => {
    document.querySelector('.menu .icon').addEventListener('click', function() {
      const mainNav = document.querySelector('.main-nav')

      // Toggle the -open class
      if (mainNav.classList.contains('-open')) {
        mainNav.classList.remove('-open')
      } else {
        mainNav.classList.add('-open')
      }
    })
  })();

  /*
    Navigation bar colors

    The navigation bar colors are updated depending on the section that's underneath.
    First we get a list of sections with their positions and the class that should be
    added to the nav bar when it's in that range. Then we check on every scroll what
    the new position is and we update the classes depending on that.
  */
  (() => {

    // List of sections and their positions
    const sections = [
      // Companies section
      (() => {
        const section = document.querySelector('.companies-section')

        return {
          class: '-dark',
          start: section.offsetTop,
          end: section.offsetTop + section.offsetHeight
        }
      })(),

      // Principles section
      (() => {
        const section = document.querySelector('.principles-section')

        return {
          class: '-medium',
          start: section.offsetTop,
          end: section.offsetTop + section.offsetHeight
        }
      })()
    ]

    // For every section we add an event listener on scroll to update
    // the class of the nav bar. We also use underscore.debounce to
    // limit the amount of functions calls each 200ms.
    sections.forEach(section => {
      const body = document.querySelector('body')
      const navBar = document.querySelector('.main-nav')

      window.addEventListener('scroll', _.debounce(function() {
        // Check if the nav is on top of the section
        // The nav is always at the top so we use the body element
        if (body.scrollTop > section.start && body.scrollTop < section.end) {
          navBar.classList.add(section.class)
        } else {
          navBar.classList.remove(section.class)
        }
      }), 200)
    })
  })();

  /*
    Companies section
  */
  (() => {
    const companiesList = document.querySelectorAll('.companies-list li')

    companiesList.forEach(company => {
      // Duplicate the company description inside the company list item
      // This is used in mobile devices since the description is shown
      // right below the item unlike in the desktop version
      const duplicatedNode = document.querySelector(`.company-description.${company.dataset.target}`).cloneNode(true)
      duplicatedNode.style.display = 'none'
      company.insertAdjacentElement('beforeend', duplicatedNode)

      // Show the appropriate description

      company.addEventListener('click', function () {
        const target = document.querySelectorAll(`.company-description.${this.dataset.target}`)[1] // Select the second matching element since the first one is for the mobile version, see code above
        document.querySelector('.companies-illustration').style.opacity = 0

        // Remove previous description and current item if they exist
        const previouslySelectedDescription = document.querySelector('.company-description.-visible')
        const previouslySelectedItem = document.querySelector('.companies-list .-active')

        if (previouslySelectedDescription && previouslySelectedItem) {
          previouslySelectedDescription.classList.remove('-visible')
          previouslySelectedItem.classList.remove('-active')
        }

        // Mark the current item as active
        this.classList.add('-active')

        // Show the selected description
        target.classList.add('-visible')
      })
    })
  })();
}
