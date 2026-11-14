# David Chinemerem Arinze — Student Portfolio

COS 106 Term Project: Responsive Student Portfolio and Academic Management Website.

## Pages
| Page | File | What it shows |
|---|---|---|
| Home | `index.html` | Name, photo, welcome message, navigation, brief bio |
| About Me | `about.html` | Education (table), career aspirations, skills, hobbies, audio |
| Projects | `projects.html` | Three projects with images, descriptions and links |
| Academic Planner | `planner.html` | Add / complete / delete / filter tasks (JavaScript) |
| Contact | `contact.html` | Form with JavaScript validation |

## Folder structure
```
index.html  about.html  projects.html  planner.html  contact.html
css/style.css        external stylesheet
js/main.js           menu, active link, scroll animations
js/planner.js        task manager (arrays, functions, DOM, localStorage)
js/contact.js        form validation
images/              photo + project images
media/               piano audio clip
```

## Requirements checklist
- **HTML:** semantic elements (header, nav, main, section, article, aside, figure, footer), forms, a table, images, hyperlinks, lists, audio
- **CSS:** external stylesheet, Flexbox + CSS Grid, responsive media queries, styled navigation with mobile menu, animations and transitions, consistent colour scheme
- **JavaScript:** event handling, DOM manipulation, form validation, dynamic content, arrays and functions, interactive task manager

## How to host on GitHub Pages
1. Create a free account at github.com and click **New repository**. Name it something like `portfolio` and make it **Public**.
2. Click **uploading an existing file**. Drag in **everything inside this folder**, keeping the `css`, `js`, `images` and `media` folders. Click **Commit changes**.
3. Go to **Settings → Pages**. Under *Branch*, choose `main` and `/ (root)`, then **Save**.
4. Wait a minute and refresh. Your live link appears at the top, e.g. `https://yourusername.github.io/portfolio/`.
5. Submit both links: the live site link and the repository link.

## Before submitting
- Replace the placeholder email and phone on `contact.html` with your real details.
- To use your own song, save it as `media/piano-melody.mp3` (or change the file name in `about.html`).
