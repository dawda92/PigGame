  // // Spinner-1 Loading the DOM
  document.querySelector('.container table').style.display = 'none';
  document.querySelector('.container').classList.add('spinner-1');

  // Timeout for Spinner-1 & content to be shown on DOM Load
  setTimeout(() => {
    document.querySelector('.container table').style.display = 'table';
    document.querySelector('.container').classList.remove('spinner-1');
  }, 3000);


// Main table
function mainTable() {
  // Make http call
  getDataResults(1)
    .then(result => {
                let mainTable = `
                   <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Year of birth</th>
                        <th scope="col">Children</th>
                        <th scope="col">Profession</th>
                      </tr>
                     </thead>          
                 `;
            let id = '';
            let ids = '';
            for (let i = 0; i < result.mainUser.length; i++) {
              // console.log(result.mainUser[i]);
              id += result.mainUser[i].Id;
              mainTable += `
              <tr>
              <td> ${result.mainUser[i].Name}</td>
              <td> ${result.mainUser[i].YearOfBirth}</td>
              <td class="tdClick"> ${result.mainUser[i].NumChildren}</td>
              <td> ${result.mainUser[i].Profession}</td>
              </tr>
              `
              document.getElementById("tableone").innerHTML = mainTable;
            }
            mainTable += `</table>`
            return mainTable;
    });
}



function subTable() {
  // Spinner loading when the subtable appears
  document.querySelector('.container').classList.add('spinner-2');
  // Timeout for the spinner and content to be shown
  setTimeout(() => {
    document.querySelector('.container').classList.remove('spinner-2');
    getDataResults(1)
      .then(result => {
  
              let subTable = `
              <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Year of birth</th>
                    <th scope="col">Mother</th>
                  </tr>
                </thead>          
            `;
        let id = '';
        for (let i = 0; i < result.subUser.length; i++) {
        console.log(result.subUser[i]);
        id += result.subUser[i].Id;
        subTable += `
        <tr>
        <td> ${result.subUser[i].Name}</td>
        <td> ${result.subUser[i].YearOfBirth}</td>
        <td> ${result.subUser[i].Mother}</td>
        </tr>
        `
        document.getElementById("tabletwo").innerHTML = subTable;
        }
        subTable += `</table>`
        return subTable;
      })
  }, 3000)
};

// Event listener to show the sub table
document.getElementById('tableone').addEventListener('click', (e) => {
  if(e.target.classList.contains('tdClick')) {
    subTable();
    document.getElementById('tabletwo').style.visibility = "visible";
      }
    });

// Event listener to hide the sub table
document.getElementById('tabletwo').addEventListener('click', (e) => {
  if(e.target.parentElement.parentElement.parentElement.classList.contains('table')) {
      document.getElementById('tabletwo').style.visibility = "hidden";
    }
});

// max-width viewport function
function viewPort(element) {
  if(element.matches) {
    subTable();
  }
}

let element = window.matchMedia("(max-width: 900px)")
// Call listener function at run time
viewPort(element);
// Attach listener function on state changes
element.addListener(viewPort);


// Function Calls
mainTable();