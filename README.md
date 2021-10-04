# RGBlent Client

## Demo Version

There is a demo version of this app available on the branch `vc_demoday` (same story with the backend repo). It is the result of me hacking together the last bits of my app just in time to present it. Code-wise it's not terrible but it's both below my personal standards and too big to commit all at once. Here's a summary of the changes between `main` (as of commit [`cc2486f`](https://github.com/enbeec/rgblent-client/commit/cc2486f07398c52317c300b891ce0eb700b9543d)) and the `vc_demoday` branch:

- [x] updates to `public` directory
  - [x] new favicons and icons
  - [x] changes to `index.html`
- [x] `utils/fetch.js`
  - [x] got rid of `noAuthFetch` *there is a compatibility version that wrapps `authFetch` for now*
  - [x] `authFetch` has a `noAuth` boolean option now
- [x] ~`src/components/ColorProvider.js`~ => `src/components/color/ColorProvider.js`
  - [x] updated for new dual-purpose `authFetch`
  - [x] ~holds palette query now~ **NO!** I properly split palette and color code
- [x] `src/components/AuthForm.js`
  - [x] disappears when logged in
  - [x] no more logout button
- [x] `src/components/NameWindow.js`
  - [x] only displays when logged in
  - [x] contains logout button 
  - [x] contains user name
  - [x] contains the form for creating favorites
    - [x] an input
    - [x] a mini swatch
    - [x] cancel/submit buttons
- [ ] added the Sidebar to `src/RGBlent.js`
  - [x] imported new component `NameWindow`
  - [ ] imported new component `UserProfile`
  - [ ] imported new component `OtherUsers`
  - [ ] set up to overflow with a scroll bar
- [x] totally reworked `src/components/AuthProvider.js`
  - [x] logout button now lives in `NameWindow`
  - [x] ~no more `react-query`~ got `react-query` working :+1:
  - [x] home of state and lifecycle for favorites
- [ ] `src/component/reusable/UserColorCard.js`
  - [ ] takes a user and displays their favorite colors
- [ ] `src/components/reusable/PaletteCard.js`
  - [ ] takes an array of colors and a name and displays them
- [ ] `src/components/reusable/Profile.js`
  - [ ] takes in a user profile and renders a `PaletteCard` and `UserColorCard`
- [ ] `src/components/OtherUsers.js`
  - [ ] fetches all users
  - [ ] maps them to an accordion group containing `UserColorCard` and `PaletteCard`s per user
  - [ ] the current user is not displayed
- [x] `src/components/Picker.js`
  - [x] added ability to initiate favoriting a color (finishes up in `NameWindow`)
- [ ] `src/components/UserProfile.js`
  - [ ] gets the profile from the `AuthContext` and renders a `Profile` component
- [x] ~`src/components/reusable/Swatch.js`~ => `src/components/color/Swatch.js`
  - [x] pass the `noHover` property to get rid of the hovering hamburger button
  - [x] new hamburger menu items can be added by providing an array of props that will then be rendered as `DropdownItem`s


My plan is to re-create these changes (choosing to rewrite things where necessary) as a new set of commits over the next couple of days.

## User Stories

a. GIVEN no authorization token, a user can view the default colors and all saved palettes.

b. GIVEN no authorization token, a user can click "Register" and create a user account. If successful, they will be logged in.

c. GIVEN no authorization token, a user can click "Login" and provide a password. If successful, they will be logged in.

d. GIVEN a valid authorization token, a user will see their palettes at the top of the sidebar.

e. A user will see other users (with palettes) in the middle of the sidebar.

f. WHEN a user clicks a color swatch, that color will be selected and displayed in the color detail component.

g. GIVEN no named palette loaded, WHEN an authenticated user selects "save" button, create that palette and load it.

h. GIVEN a named palette is loaded, WHEN an authenticated user selects the "save" button, update and reload that palette.

i. WHEN a user selects the "blend" icon on any given color, blend it with the loaded color and load the resulting color.

j. WHEN a user selects the "favorite" icon on any given color, it is added to their favorites.
