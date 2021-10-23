// Refers to the existing action buttons to create a shuffle button
function getShuffleButton(referenceLi) {
  const li = referenceLi.cloneNode(true);
  var button = li.querySelector("button");
  button.querySelector('span').innerHTML = "Shuffle";

  return li;
}

// Append the shuffle button within the existing actions on the board
// like 'Recently Updated', 'My issues'
function appendShuffleButton() {
  const actions = document.querySelector('.ghx-backlog-search-container').parentNode.lastChild;
  const actionsList = actions.querySelector('ul');
  const shuffleLi = getShuffleButton(actionsList.querySelector('li'));
  actionsList.appendChild(shuffleLi);

  return shuffleLi.querySelector('button');
}

// Since the board is client rendered it can take a while even after
// DOMContentLoaded event for the board dom elements to be available to query
// The function polls for when the board is ready. Cancels execution if not ready in 7 seconds
const isBoardReady = (cb) => {
  const isReady = () => !!document.querySelector('.ghx-backlog-search-container');
  if (isReady()) {
    cb();
    return;
  }

  let count = 0;
  let poll;
  poll = setInterval(() => {
    // Stop after 7 tries
    if (count === 7) {
      clearInterval(poll);
      return;
    }

    if (isReady()) {
      cb();
      clearInterval(poll);
      return;
    }

    count++;
  }, 1000)
};

isBoardReady(() => {
  const shuffleButton = appendShuffleButton();
  shuffleButton.addEventListener("click", () => {
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
      headerWrapper.replaceChild(getMemberHeader(firstShuffledMember).cloneNode(true), getMemberHeader(headerWrapper));
      mark(firstShuffledMember);
    }
    shuffleJiraMembers();
  });
});
