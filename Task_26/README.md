# React Card Component

A reusable `Card` component that renders data passed as props, displayed in a grid with a gradient border.

## Files

- `src/App.jsx` – `Card` component and the array of card data
- `src/App.css` – grid layout and gradient border styling

## Props

| Prop          | Description               |
| ------------- | ------------------------- |
| `image`       | Image URL                 |
| `title`       | Card heading              |
| `description` | Short text under the title |

## Usage

```jsx
<Card image="https://picsum.photos/seed/card1/300/300" title="Card 1" description="This is card 1 description" />
```

## Run

Copy `App.jsx` and `App.css` into the `src/` folder of a Create React App project (`index.js` should import `App`), then:

```bash
npm install
npm start
```

Open http://localhost:3000.

## Notes

- The gradient border uses two backgrounds (`padding-box` black, `border-box` gradient) over a transparent border.
- Images come from picsum.photos, so an internet connection is needed.
