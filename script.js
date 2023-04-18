
const currentYear = new Date().getFullYear();

function showEventDateDialog(dayOfMonth,weekOfMonth,eventTitle) {

    const dialog = document.getElementById("eventDateDialog");

    const datesList = document.getElementById("datesList");

    datesList.innerHTML = "";

    const eventTitleElement = document.getElementById("eventTitle");
    eventTitleElement.innerHTML = currentYear + " Event dates for: "+eventTitle;

    const dates = getDatesForThisGroup(dayOfMonth, weekOfMonth, eventTitle, currentYear);

    // Add new list items for each date
    dates.forEach(date => {
        const li = document.createElement("li");
        li.textContent = date+"\n";
        datesList.appendChild(li);
    });

    dialog.showModal();
}

function closeDialog(el) {
    el.parentElement.close();
}

function getDatesForThisGroup(dayOfMonth, weekOfMonth, eventTitle, year) {

    const dates = [];
    const now = new Date();

    for (let month = 0; month < 12; month++) {
      const date = new Date(year, month, 1);
      const dayOfWeek = date.getDay();
      let daysToAdd = dayOfMonth - dayOfWeek;
      if (daysToAdd < 0) {
        daysToAdd += 7;
      }
      daysToAdd += 7 * (weekOfMonth - 1);
      date.setDate(daysToAdd + 1);
      dates.push(date.toLocaleDateString());
    }
    return dates;

}

function copyToClipboard() {
    let eventTitle = document.getElementById("eventTitle").innerHTML;
    eventTitle = eventTitle.replace("<br>","\n");

    const datesList = document.getElementById("datesList");

    const datesText = eventTitle + "\n" + datesList.textContent;

    const dialog = document.getElementById("eventDatesCopied");
    navigator.clipboard.writeText(datesText).then(() => {
        console.log("Dates copied to clipboard:", datesText);
    }).catch(err => {
        console.error("Failed to copy dates to clipboard:", err);
    });

    dialog.showModal();
    
    setTimeout(function() {
        dialog.close();
      }, 1000);
}

const dates = getDatesForThisGroup();