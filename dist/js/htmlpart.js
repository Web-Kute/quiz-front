export const htmlQuiz = ` 
    <a href="choose.html" class="material-symbols-outlined btn-undo">undo</a><section id="quiz">
      <progress title="You cannot interact with this cursor" class="update run" role="progressbar" id="progress-bar"
        value="0" max="100" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" tabindex="0"
        aria-label="Content loading…"></progress>
      <!-- Swiper -->
      <div class="swiper swiper-quiz">
        <div id="container" class="swiper-wrapper"></div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </div>
      <p class="score">Score : <span>0</span></p>
      <aside>
        <div class="timer">3 : 00</div>
        <div class="countdown-container" data-duration="180" data-transition="linear" data-color="#28af60"
          data-size="80" data-position="up"></div>
      </aside>
    </section>
    <section class="modal hidden">
      <div class="flex"> <button class="btn-close">⨉</button></div>
      <div>        
        <h3 class="notation"></h3>
        <h3 class="comment-notation"></h3>
      </div>
    </section>
    <div class="overlay hidden"></div>`;