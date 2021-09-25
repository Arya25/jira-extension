// TODO: remove set timeout
setTimeout(() => {
  alert('yo');
  const newCardDiv = document.querySelector("#ghx-quick-filters");
  var shuffleButton = document.createElement("button");
  console.log('here', newCardDiv, shuffleButton);

  shuffleButton.id = "shuffle-btn";
  shuffleButton.textContent = "SHUFFLE";
  newCardDiv.append(shuffleButton);

  let shuffleBtnEl = document.getElementById("shuffle-btn");

  shuffleBtnEl.addEventListener("click", () => {
    function shuffleJiraMembers() {
      const printMember = el => el.outerText.split(' ')[0];
      const printMembers = (arr) => arr.map(printMember);
      const getMembers = parent => Array.from(parent.querySelectorAll('.ghx-swimlane'));
      const getMemberHeader = member => member.querySelector('.ghx-swimlane-header');

      // https://bost.ocks.org/mike/shuffle/
      const shuffle = (members) => {
        let m = members.length - 1;
        let parent;

        // While there remain elements to shuffle…
        while (m > 0) {
          // Pick a remaining element…
          const i = Math.floor(Math.random() * m);
          console.log(i, m, 'lalaji')

          // And swap it with the current element.
          const temp = document.createElement('temp');

          parent = members[m].parentNode;
          console.log(printMembers(Array.from(parent.querySelectorAll('.ghx-swimlane'))));
          console.log(`picked ${printMember(members[i])}, replaced with: ${printMember(members[m])}`);
          // a -> temp
          parent.replaceChild(temp, members[m]);
          // b -> a
          parent.replaceChild(members[m], members[i]);
          // temp -> b
          parent.replaceChild(members[i], temp);
          m--;
        }

        return getMembers(parent);
      };

      const firstMember = (className = 'ghx-first') => ({
        unmark: (member) => member.classList.remove(className),
        mark: (member) => member.classList.add(className),
      });
      const { mark, unmark } = firstMember();

      const pool = document.querySelector('#ghx-pool');
      const members = getMembers(pool);
      unmark(members[0]);

      const shuffledMembers = shuffle(members);
      const firstShuffledMember = shuffledMembers[0];

      const headerWrapper = pool.querySelector('#ghx-swimlane-header-stalker');
      headerWrapper.replaceChild(getMemberHeader(firstShuffledMember).cloneNode(), getMemberHeader(headerWrapper));
      mark(firstShuffledMember);
    }
    shuffleJiraMembers();
  });
}, 5000);
