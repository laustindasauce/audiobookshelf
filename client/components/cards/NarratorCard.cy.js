import NarratorCard from './NarratorCard.vue'

describe('<NarratorCard />', () => {
  const narrator = {
    name: 'John Doe',
    numBooks: 5
  }
  const propsData = {
    narrator,
    width: 200,
    height: 150,
    sizeMultiplier: 1.2
  }
  const mocks = {
    $store: {
      getters: {
        'user/getUserCanUpdate': true
      },
      state: {
        libraries: {
          currentLibraryId: 'library-123'
        }
      }
    },
    $encode: (value) => value
  }

  it('renders the component', () => {
    let mountOptions = { propsData, mocks }
    // see: https://on.cypress.io/mounting-vue
    cy.mount(NarratorCard, mountOptions)
  })

  it('renders the narrator name correctly', () => {
    let mountOptions = { propsData, mocks }
    cy.mount(NarratorCard, mountOptions)

    cy.get('&name').should('have.text', 'John Doe')
  })

  it('renders the number of books correctly', () => {
    let mountOptions = { propsData, mocks }
    cy.mount(NarratorCard, mountOptions)

    cy.get('&numBooks').should('have.text', '5 Books')
  })

  it('renders 1 book correctly', () => {
    let propsData = { narrator: { name: 'John Doe', numBooks: 1 }, width: 200, height: 150, sizeMultiplier: 1.2 }
    let mountOptions = { propsData, mocks }
    cy.mount(NarratorCard, mountOptions)

    cy.get('&numBooks').should('have.text', '1 Book')

  })

  it('renders the default name and num-books when narrator is not provided', () => {
    let propsData = { width: 200, height: 150, sizeMultiplier: 1.2 }
    let mountOptions = { propsData, mocks }
    cy.mount(NarratorCard, mountOptions)
    cy.get('&name').should('have.text', '')
    cy.get('&numBooks').should('have.text', '0 Books')
  })

  it('has the correct width and height', () => {
    let mountOptions = { propsData, mocks }
    cy.mount(NarratorCard, mountOptions)
    cy.get('&card').should('have.css', 'width', '200px')
    cy.get('&card').should('have.css', 'height', '150px')
  })

  it('has the correct width and height when not provided', () => {
    let propsData = { narrator, sizeMultiplier: 1.2 }
    let mountOptions = { propsData, mocks }
    cy.mount(NarratorCard, mountOptions)
    cy.get('&card').should('have.css', 'width', '150px')
    cy.get('&card').should('have.css', 'height', '100px')
  })

  it ('has the correct font sizes', () => {
    let mountOptions = { propsData, mocks }
    cy.mount(NarratorCard, mountOptions)
    cy.get('&name').should('have.css', 'font-size', '14.4px') // 0.75 * 1.2 * 16
    cy.get('&numBooks').should('have.css', 'font-size', '12.48px') // 0.65 * 1.2 * 16
  })
})