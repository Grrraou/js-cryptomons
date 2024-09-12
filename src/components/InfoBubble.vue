<template>
  <div>
    <!-- Info Bubble -->
    <div class="info-bubble" @click="toggleOverlay">
      <span class="info-icon">?</span>
    </div>

    <!-- Overlay -->
    <div v-if="isOverlayVisible" class="overlay">
      <div class="overlay-content">
        <span class="close-btn" @click="hideOverlay">&times;</span>
        
        <!-- Conditionally render content based on prop page -->
        <div v-if="page === 'mines'">
          <div class="game-description">
            <h2>Welcome to the Mines!</h2>
            <p>
                Ready to click your way to virtual riches in a completely futile but oh-so-satisfying way? 
                Here, you'll find yourself mining crypto that doesn't exist, all with the power of your 
                index finger (or thumb, we don't judge).
            </p>
            <p>
                Want more? Of course you do. Unlock new, more lucrative mines through the 
                <span class="highlight">‘Goals’ page</span>, where your pointless efforts are rewarded 
                with even bigger numbers.
            </p>
            <p>
                And if the idea of doing all that manual labor yourself seems a bit much, no worries! 
                <span class="highlight">Drag and drop</span> your hard-working heroes into the mines to 
                watch them tirelessly dig away—so you can pretend you’re being productive while doing 
                absolutely nothing.
            </p>
            <p>
                Just sit back, let them handle it, and bask in the illusion of progress!
            </p>
          </div>
        </div>

        <div v-if="page === 'staking'">
          <div class="game-description">
            <h2>Welcome to staking</h2>
            <p>
                So, you’ve got tokens you can’t use? Perfect! Now you can <span class="highlight">stake</span> them 
                and watch the numbers go up… slowly. The more you stake, the more you “earn” with zero effort. 
                But here’s the catch: once they’re in, they’re gone. Forever. Hope you weren’t too attached.
            </p>
            <p>
                The best part? You don’t even have to lift a finger to make those sweet percentages roll in—because 
                let’s face it, that’s the dream, right? All passive, no stress. Except for that tiny detail where 
                you can never withdraw.
            </p>
            <p>
                Want to stake even more? You can unlock brand new staking pools via the 
                <span class="highlight">‘goals’ page</span>, where your blind faith in numbers rewards you with 
                more ways to trap your tokens. 
            </p>
            <p>
                So kick back, watch those decimals climb, and enjoy the endless thrill of profits you can never touch!
            </p>
          </div>
        </div>

        <div v-if="page === 'vault'">
          <div class="game-description">
            <h2>Welcome to the vault</h2>
            <p>
                Here’s where you can gaze upon your collection of imaginary wealth. In the 
                <span class="highlight">vault</span>, you can see all your precious tokens, each with its 
                own totally fake price. Don’t worry about the numbers—they’ll go up, down, and sideways, 
                but they’ll never mean a thing.
            </p>
            <p>
                Want to feel rich? Just glance at the prices for a quick dopamine hit. Feeling poor? 
                No problem, those numbers will bounce back… or not. Either way, it’s all an illusion!
            </p>
            <p>
                So, sit back and admire the virtual fortune you’ve amassed, because in the vault, 
                it’s all about appearances. And hey, nobody needs to know it's worth nothing.
            </p>
          </div>
        </div>

        <div v-if="page === 'battle'">
          <div class="game-description">
            <h2>Welcome to the battlefields</h2>
            <p>
                Ready to smash some ugly faces? In the <span class="highlight">battlefields</span>, 
                you’ll face off against horrible monsters disguised as avatars of real exchanges. 
                Just click their ugly mugs until they drop their hidden treasures—because who doesn’t 
                love looting fake riches from virtual villains?
            </p>
            <p>
                The more battlefields you conquer, the more you’ll rake in. It’s a never-ending fight 
                for loot that’s worth absolutely nothing, but hey, it feels good to win, right?
            </p>
            <p>
                Too busy to click yourself? Drag and drop your trusty heroes into the fray and let them 
                farm monsters for you while you sit back and enjoy the show. No effort, all reward—if 
                only real life was this easy.
            </p>
            <p>
                So grab your mouse, or your heroes, and dive into the chaos. It’s time to battle, click, 
                and loot your way to a fortune that doesn’t exist!
            </p>
          </div>
        </div>

        <div v-if="page === 'inventory'">
          <div class="game-description">
            <h2>Welcome to your inventory</h2>
            <p>
                Got gear? In the <span class="highlight">inventory</span>, you can equip all sorts of 
                shiny equipment and tools to boost your efficiency in the mines and beyond. Whether 
                it's making your fake fortune grow faster or unlocking new tricks, your inventory has 
                everything you need to be the master of imaginary wealth.
            </p>
            <p>
                Feeling fancy? Consume various items for temporary boosts or even to manipulate the market. 
                Because who wouldn’t want to bend the rules of a fake economy?
            </p>
            <p>
                And if you’ve got items collecting dust? Just sell off your useless gear and free up 
                some space for more exciting, completely pointless things.
            </p>
            <p>
                So go ahead, explore your stash of treasures, and gear up to boost your way to 
                greatness—because in the inventory, it's all about having the right tools for the job!
            </p>
          </div>
        </div>

        <div v-if="page === 'swap'">
          <div class="game-description">
            <h2>Welcome to the swap page</h2>
            <p>
                Looking to swap some tokens? You've come to the right place! Here, you can exchange 
                whatever token for whatever other token, and watch the market react in real-time. The 
                more you sell, the lower the price goes. The more you buy, the price goes up—except for 
                the <span class="highlight">cryptodollar</span>. That one’s stable because, well, it’s 
                magic. Don’t ask too many questions.
            </p>
            <p>
                Just remember, every swap comes with a sneaky little fee that’ll nibble away at your 
                crypto—because nothing in life (or in fake markets) is free. But who’s counting when 
                it’s all just made-up numbers?
            </p>
            <p>
                So dive into the chaotic world of token swapping, where prices are fickle, and your 
                crypto slowly slips away with every click. But hey, at least the cryptodollar's got 
                your back!
            </p>
          </div>
        </div>

        <div v-if="page === 'goals'">
          <div class="game-description">
            <h2>Welcome to the goals page</h2>
            <p>
                Ready to unlock even more pointless features? In the <span class="highlight">goals</span> 
                page, you’ll find a whole range of upgrades waiting for you—new mines, new staking pools, 
                battlefields, heroes, and more! All it takes is paying the price, because in this world, 
                progress is only a click away (literally).
            </p>
            <p>
                The more you unlock, the more absurdly complex your fake empire becomes. But don’t worry, 
                it’s all worth it!
            </p>
            <p>
                So what are you waiting for? Start unlocking and watch as your fake crypto empire grows 
                one goal at a time. Because in the end, it's all about having more things to click!
            </p>
          </div>
        </div>

        <div v-if="page === 'achievements'">
          <div class="game-description">
            <h2>Welcome to the achievements page</h2>
            <p>
                Congratulations, overachiever! In the <span class="highlight">achievements</span> page, 
                you’ll unlock milestones for doing just about anything—whether it's clicking, swapping, 
                mining, or fighting your way through this fake crypto world. Every achievement comes 
                with a reward, because who doesn’t love shiny prizes?
            </p>
            <p>
                Sometimes you'll score a useful item, sometimes an extra slot for your heroes, and 
                sometimes… well, who knows what you’ll get? But one thing’s for sure: you’ll want them all.
            </p>
            <p>
                So keep clicking, keep grinding, and keep unlocking, because the more achievements you 
                rack up, the closer you get to becoming the ultimate master of imaginary riches!
            </p>
          </div>
        </div>

        <div v-if="page === 'stats'">
          <div class="game-description">
            <h2>Welcome to the stats page</h2>
            <p>
                Curious about how deep you've gone into the rabbit hole? The <span class="highlight">stats</span> 
                page is where you can track all the weird, wonderful, and completely pointless details 
                about your actions. How many clicks? How many tokens mined? How many monsters smashed?
            </p>
            <p>
                If you’ve ever wanted a breakdown of your fake accomplishments, this is the place to be. 
                Watch the numbers climb, reflect on your (questionable) life choices, and maybe even 
                discover some stats you didn’t know existed!
            </p>
            <p>
                So take a deep breath, dive into the data, and marvel at just how efficient you’ve become 
                at conquering the meaningless world of Cryptomons.
            </p>
          </div>
        </div>

        <div v-if="page === 'settings'">
          <div class="game-description">
            <h2>Welcome to the settings page</h2>
            <p>
                Yeah, it’s exactly what you think—<span class="highlight">settings</span>. Not much to see here, 
                but if you need to tweak a few things, this is the place. Whether you’re adjusting sound, 
                changing display options, or doing whatever else people do in settings, we’ve got you covered.
            </p>
            <p>
                So go ahead, make yourself at home and fine-tune the experience just the way you like it. 
                Or don’t. We’re not judging.
            </p>
          </div>
        </div>

        <!-- Add more sections if needed -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    page: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isOverlayVisible: false,
    };
  },
  methods: {
    toggleOverlay() {
      this.isOverlayVisible = !this.isOverlayVisible;
    },
    hideOverlay() {
      this.isOverlayVisible = false;
    },
  },
};
</script>

  

<style scoped>
  .info-bubble {
    position: relative;
    display: inline-block;
    width: 20px;
    height: 20px;
    background-color: #17a2b8;
    border-radius: 50%;
    text-align: center;
    line-height: 20px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    margin-left: 15px;
    margin-bottom: 10px;
  }
  
  .info-icon {
    color: white;
  }
  
  .overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8); /* Dark background with opacity */
    z-index: 1000;
  }
  
  .overlay-content {
    position: relative;
    background-color: white;
    padding: 20px;
    width: 60%;
    border-radius: 10px;
    text-align: left;
    font-size: 1.2em;
  }
  
  .close-btn {
    position: absolute;
    top: 10px;
    right: 20px;
    font-size: 28px;
    font-weight: bold;
    color: black;
    cursor: pointer;
  }
  
  .close-btn:hover {
    color: red;
  }

  /* TEXT */
  .game-description {
    font-family: Arial, sans-serif;
    color: #333;
    line-height: 1.6;
    margin: 20px;
    max-height: 80vh;
    overflow-y: auto;
    text-transform: none;
}

.game-description h2 {
    color: #2c3e50;
    font-size: 22px;
    margin-bottom: 10px;
}

.game-description p {
    margin: 10px 0;
    font-size: 16px;
}

.highlight {
    font-weight: bold;
    color: #e74c3c;
}



</style>
  