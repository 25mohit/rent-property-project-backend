function generateRandomString() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    let randomString = '';
    
    // Helper function to pick a random character from a given pool
    function getRandomChar(pool) {
      const randomIndex = Math.floor(Math.random() * pool.length);
      return pool[randomIndex];
    }
    
    // Generate 3 random letters
    for (let i = 0; i < 3; i++) {
      randomString += getRandomChar(letters);
    }
    
    // Generate 2 random numbers
    for (let i = 0; i < 2; i++) {
      randomString += getRandomChar(numbers);
    }
    
    // Add '#'
    randomString += '#';
    
    // Shuffle the string
    randomString = shuffleString(randomString);
    
    return randomString;
  }
  
  // Function to shuffle the string
  function shuffleString(str) {
    const arr = str.split('');
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
  }

  module.exports = {
    generateRandomString
  }
  