const scewedRandomness = (data) => {
    // Check sum of probabilities 
    let sum = 0
    data.forEach(x => { sum = sum + x.prob })

    // Update probabilities out of 1
    data.map(x => {x.prob = x.prob / sum})
    
    // Set collective probabilities
    let collProbs = [...data]
    collProbs.forEach((x, i) => {
      let p = x.prob
      if (i > 0) { p = p + collProbs[i - 1] }
      collProbs[i] = p
    })

    // Pick a random float between 0 and 1
    let r = Math.random()

    // Find what value r corresponds to in the data object
    let index = 0
    for (let i = 0; i < collProbs.length; i++) {
      if (r <= collProbs[i]) {
        index = i
        break
      }
      index = NaN
    }

    // Find the corresponding value and store it
    let selected = data[index]

    // If the value is unique, remove it from reference
    if (selected.unique === true) {
      data.splice(index, 1);
    }

    // Return the randomly-picked value
    return selected.name
}

export default scewedRandomness
