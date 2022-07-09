'use strict';
const skipBtn = document.querySelector('.introButton');
const storyIntro = document.querySelector('.storyIntro');
const game = document.querySelector('.app');
    
    skipBtn.addEventListener('click', function(){
        storyIntro.style.display = 'none';
        game.style.display = 'block';
    })  