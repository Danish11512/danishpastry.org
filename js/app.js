/**
 * Composition root: builds every dependency and wires the app together.
 * To change behavior, swap a dependency here — don't touch the modules.
 */
import { EVENT } from "./config.js";
import { applyTheme } from "./ui/themes.js";
import { Background } from "./ui/Background.js";
import { Poster } from "./ui/Poster.js";
import { InviteView } from "./ui/InviteView.js";
import { GuestList } from "./ui/GuestList.js";
import { ShareButton } from "./ui/ShareButton.js";
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

const invitee =
  new URLSearchParams(location.search).get("to") || EVENT.inviteeName;

const theme = applyTheme(EVENT.theme);

new Background().start();
new Poster(document.getElementById("poster")).render({
  title: event.title,
  host: event.host,
  palette: theme.poster,
  image: event.posterImage,
});
new InviteView(event, invitee).render();
const guestList = new GuestList({ host: event.host, invitee });
guestList.render();
new ShareButton(document.getElementById("share-btn"));

new RsvpController({
  event,
  store: new RsvpStore(),
  providers: [new IcsCalendarProvider(), new GoogleCalendarProvider()],
  confetti: new Confetti(document.getElementById("confetti")),
  guestList,
}).init();
