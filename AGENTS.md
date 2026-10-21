# danishpastry.org

Static invite page (Partiful-style) hosted on GitHub Pages at danishpastry.org.

## Update the event

Edit `js/config.js` — title, host, start/end (local ISO time), location,
detail rows (optional `href` makes a link), `sections` accordions,
theme ("ember" | "blush" | "midnight").
Invitee name: set `inviteeName` there, or pass `?to=Name` in the URL.

## Deploy

Push to `main` — GitHub Pages auto-deploys from the repo root. No build step.

## Local preview

ES modules don't work over file:// — run `python3 -m http.server` and open
http://localhost:8000.

## Structure

```
index.html               structure only
css/style.css            all styles (theme via CSS vars)
js/config.js             EVENT config (edit me)
js/app.js                composition root (wires dependencies)
js/utils/dates.js        shared date helpers
js/ui/themes.js          palette registry (add themes here)
js/ui/Background.js      ambient animated canvas backdrop
js/ui/Poster.js          SVG poster art (animated)
js/ui/icons.js           detail-row icon registry
js/ui/InviteView.js      renders event details
js/ui/GuestList.js       guests avatar row
js/ui/ShareButton.js     copy-link button
js/ui/Confetti.js        confetti service
js/rsvp/rsvpOptions.js   RSVP option registry (extend here)
js/rsvp/RsvpStore.js     localStorage persistence
js/rsvp/RsvpController.js RSVP flow orchestration
js/calendar/CalendarProvider.js        provider interface
js/calendar/IcsCalendarProvider.js     .ics download
js/calendar/GoogleCalendarProvider.js  Google Calendar link
```

Design: RSVP options and calendar providers are registries — add a new
option/provider in one place and it works without touching controller code.
