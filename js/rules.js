const rules = {
    init: function () {
      // Selects both button seerules and button cross
      const rulesBtnAndCross = document.querySelectorAll(
        ".seerules, .rules__cross"
      );
      for (btn of rulesBtnAndCross) {
        btn.addEventListener("click", () => {
          rules.displayRules();
          rules.darkenOthers();
        });
      }
    },
  
    /* Displays rules */
    displayRules: function () {
      const rulesElmnt = document.querySelector(".rules");
      rulesElmnt.classList.toggle("hidden");
    },
  
    /* Darkens others elements when rules is open */
    darkenOthers: function () {
      const everything = document.querySelectorAll("body > * :not(.rules *)");
      for (el of everything) {
        el.classList.toggle("shaded");
      }
    },
  };