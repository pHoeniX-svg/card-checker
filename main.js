// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


// Add your functions below: Solution

//find out if a credit card number is valid or not using the Luhn algorithm
function validateCred(creditCard) {
  const leaveOutLastNum = creditCard.slice(0, -1)
  const reversedArray = leaveOutLastNum.reverse()
  const multiplyOddDigits = reversedArray.map((num, i) => i % 2 === 0 ? num * 2 : num)
  const subtractNine = multiplyOddDigits.map(el => el > 9 ? el - 9 : el)
  const addAllNums = subtractNine.reduce((accum, curVal) => accum + curVal)
  const addTotal = creditCard[creditCard.length - 1] + addAllNums
  const sumModTen = addTotal % 10
  if (sumModTen === 0) {
    //console.log('This card is valid')
    return true
  } else {
    //console.log('This card is not valid')
    return false
  }
}

//collate all the invalid credit card numbers
const findInvalidCards = (creditCard) => {
  let invalidCards = []
  creditCard.forEach(el => {
    if (validateCred(el) === false) {
      invalidCards.push(el)
    }
  })
  return invalidCards 
  //console.log(invalidCards)
}

//list companies that have mailed out invalid credit cards
const idInvalidCardCompanies = (invalidNums) => {
  let cardCompanies = []
  const invalidCards = findInvalidCards(invalidNums)

  invalidCards.forEach(card => {
    switch (card[0]) {
      case 3:
        !(cardCompanies.includes('Amex')) ? cardCompanies.push('Amex') : null;
        break;
      case 4:
        !(cardCompanies.includes('Visa')) ? cardCompanies.push('Visa') : null;
        break;
      case 5:
        !(cardCompanies.includes('Mastercard') )? cardCompanies.push('Mastercard') : null;
        break;
      case 6:
        !(cardCompanies.includes('Discover')) ? cardCompanies.push('Discover') : null;
        break;
      default: console.log(`This card's company is unknown. Try again!`)
        break;
    }
  })
  console.log(cardCompanies)
}

idInvalidCardCompanies(findInvalidCards(batch))

//code update: tests credit cards and convert them into sub-arrays of numbers
const cards = [4916177275871854, 4148206768491100, 4929965883748101092, 5539246177528955, 2221007302901966, 5531477155375568, 348092474223334,  79810943426689, 374000229157803, 6011782907236167, 6011525722211422, 6011128017172357107, 3535973667220657, 3534740200935484, 3540951775555835402, 5543507738862520, 5576981450350545, 5562807952147004, 0597479453150, 30183779654670, 36091336953556, 36188045430015, 36337869275804, 6762034807042704, 5038667018865791, 6761016688961996, 4913202852601293, 4844040264269067, 4913255577888975, 6399990492348717, 6398157661736152, 6389104337846750]

//convert numbers to strings then splits each string
const splitString = cards.map(el => el.toString().split(''))

let newCreditCards = []
splitString.forEach(el => {
  newCreditCards.push(el.map(u => parseInt(u)))
}, newCreditCards)

idInvalidCardCompanies(findInvalidCards(newCreditCards))