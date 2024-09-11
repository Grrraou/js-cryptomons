<template>
    <div class="home-page game-container">
      <h1 class="page-title">Cryptomons clicker</h1>
      <div class="game-presentation">
        <h1>The Game That Feels Like Real Crypto, Without Losing a Dime!</h1>

        <p>Bored of losing your hard-earned cash in the wild west of cryptocurrency? 
          <strong>GOOD!</strong> Now you can experience all the <em>thrills</em> of mining, staking, swapping, and battling in exchanges—
          without the sleepless nights and bank account drain! Welcome to 
          <span class="game-title">Cryptomons Clicker</span>, where everything is fake but the addictive rush is oh-so-real.
        </p>

        <p>
          In this <strong>totally harmless</strong> game inspired by the crypto economy, you’ll be mining tokens 
          (<em>that don’t exist</em>), staking them for profits (<em>that will never pay out</em>), and swapping them on exchanges 
          (<em>that won’t crash</em>). But why stop there? Join the battlefields—which are really just shady exchanges disguised 
          as combat arenas—where you'll fight against other players, all scrambling to manipulate the 
          <span class="highlight">market</span> in your favor.
        </p>

        <p>
          So, sit back, relax, and click your way to <span class="highlight">fake fortune</span>, because here, the only thing at risk...
          is your time. Who needs real gains when you can click for <em>imaginary ones</em>?
        </p>
      </div>

    </div>
</template>
  
<script>
  export default {
    name: 'HomePage',
  };
  </script>
  
  <style scoped>
  .page-title {
    position: relative;
    font-size: 28px;
    font-weight: bold;
    color: #444;
    text-align: center;
    top: 0;
    margin-bottom: 20px;
    text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.6);
    background-color: transparent;
    padding: 0;
    border-radius: 0;
    letter-spacing: 1px;
    text-transform: uppercase;
    border-bottom: 2px solid #ffa500;
  }

  .home-page {
    padding-left: 220px;
    margin-top: 50px;
  }

  .game-presentation {
  font-family: Arial, sans-serif;
  background-color: #f0f8ff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #17a2b8;
  font-size: 2.5em;
  text-align: center;
  margin-bottom: 20px;
}

p {
  font-size: 1.2em;
  line-height: 1.6;
  margin-bottom: 15px;
  color: #333;
}

.game-title {
  color: #ff6347;
  font-weight: bold;
}

.highlight {
  color: #ffa500;
  font-weight: bold;
}

strong {
  color: #ff4500;
}

em {
  color: #808080;
}

.game-presentation p:last-child {
  margin-bottom: 0;
  text-align: center;
  font-style: italic;
}
</style>
  