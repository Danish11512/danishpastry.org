/**
 * Composition root: builds every dependency and wires the app together.
 * To change behavior, swap a dependency here — don't touch the modules.
 */
import { EVENT } from "./config.js";
import { InviteView } from "./ui/InviteView.js";
import { Confetti } from "./ui/Confetti.js";
import { RsvpStore } from "./rsvp/RsvpStore.js";
import { RsvpController } from "./rsvp/RsvpController.js";
import { IcsCalendarProvider } from "./calendar/IcsCalendarProvider.js";
import { GoogleCalendarProvider } from "./calendar/GoogleCalendarProvider.js";

const event = {
  ...EVENT,
  startDate: new Date(EVENT.start),
  endDate: new Date(EVENT.end),
};

const invitee = new URLSearchParams(location.search).get("to") || EVENT.inviteeName;

new InviteView(event, invitee).render();

new RsvpController({
  event,
  store: new RsvpStore(),
  providers: [new IcsCalendarProvider(), new GoogleCalendarProvider()],
  confetti: new Confetti(document.getElementById("confetti")),
}).init();
