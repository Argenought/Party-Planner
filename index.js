// === Constants ===
const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2601-ftb-et-web-ft";
const RESOURCE = "/events";
const API = BASE + COHORT + RESOURCE;

// === State ===
let events = [];
let selectedEvent;

// Events layout [id, name, decription, date, location]

//  is this needed?
// try {} catch (e) {
//   console.error(e);
// }

// === State Updates ===
async function getEvents() {
  const response = await fetch(API);
  const result = await response.json();
  events = result.data;
  return events;
  // render();
}

async function getEvent(id) {
  const response = await fetch(API`/{${id}`);
  const result = await response.json();
  selectedEvent = result.data;
  render();
}

// === Components ===
function EventListItem(event) {
  const li = document.createElement("li");
  li.innerHTML = `<a href="#selected">${event.name}</a>`;

  li.addEventListener("click", () => getEvent(event.id));

  return li;
}

function EventList() {
  const ul = document.createElement(`ul`);
  ul.classList.add("lineup");

  const events = events.map(EventListItem);
  ul.replaceChildren(...events);

  return ul;
}

function EventDetails() {
  if (!selectedEvent) {
    const p = document.createElement("p");
    p.textContent = "Please select an event to learn more.";
    return p;
  }

  const event = document.createElement("section");
  event.classList.add("event");
  event.innerHTML = `
    <h3>${selectedEvent.name} #${selectedEvent.id}</h3>
    <time>${selectedEvent.time}</time>
    <location>${selectedEvent.location}</location>
    <p>${selectedEvent.description}</p>
  `;
  return event;
}
// === Render ===

function render() {
  const app = document.querySelector("app");
  app.innerHTML = `
    <h1>Party Planner</h1>
    <main>
      <h2>Upcoming Parties</h2>
    </main>
  `;
  app.querySelector("EventList").replaceWith(EventList());
  app.querySelector("EventDetails").replaceWith(EventDetails());
}

async function init() {
  await getEvents();
  render();
}

init();
