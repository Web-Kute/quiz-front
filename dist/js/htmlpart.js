export const htmlQuiz = ` 
    <section id="slider-container">
      <progress title="You cannot interact with this cursor" class="update run" role="progressbar" id="progress-bar"
        value="0" max="100" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" tabindex="0"
        aria-label="Nombre de slides vues"></progress>
      <!-- Swiper -->
      <div class="swiper swiper-quiz">
        <div id="container" class="swiper-wrapper"></div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </div>
      <p class="score">Score : <span>0</span></p>
      <aside>
        <div class="timer">2 : 00</div>
        <div class="countdown-container" data-duration="120" data-transition="linear" data-color="#28af60"
          data-size="90" data-position="up"></div>
      </aside>
    </section>`;

export const navButtons = `<section id="choose-container">
      <nav id="choose-nav">
        <div class="choose-quiz" data-endpoint="data/html.json" data-title="HTML5">
          <button class="btn btn-choose">HTML5
            <svg class="skills__icon svg" aria-hidden="true" focusable="false">
              <use x="0" xlink:href="#html5"></use>
            </svg>
          </button>
        </div>
        <div data-endpoint="data/css.json" data-title="CSS3" class="choose-quiz">
          <button class="btn btn-choose">CSS3
            <svg class="skills__icon svg" aria-hidden="true" focusable="false">
              <use x="0" xlink:href="#css3"></use>
            </svg>
          </button>
        </div>
        <div data-endpoint="data/javascript.json" data-title="JavaScript" class="choose-quiz">
          <button class="btn btn-choose">JavaScript
            <svg class="skills__icon svg" aria-hidden="true" focusable="false">
              <use x="0" xlink:href="#js"></use>
            </svg>
          </button>
        </div>
      </nav>
    </section>`;