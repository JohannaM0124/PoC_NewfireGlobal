// make short methods, no related page
const utils = {
  /**
   * Random number Generation to create a new random email
   * @returns random number between 1000 - 10000
   */
  randomNumber: () => {
    return Math.floor(Math.random() * (10000 - 1000 + 1) + 1000)
  },

  concatenateUniqueStringWith: (string) => {
    let nextdate = new Date().toISOString().slice(2, 19)
    return string + nextdate.replace(/[^0-9]/g, '')
  },

  concatenateUniqueMailStringWith: (string) => {
    return cy.utils.concatenateUniqueStringWith(string) + '@mail.com'
  },
}

module.exports = { utils }
