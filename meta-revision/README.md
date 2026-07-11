# React Revision for Levelled News

A private, local-first revision website organised around the Meta React course. It includes searchable explanations, expandable examples, self-check questions, saved progress and a practical Levelled News connection for every concept.

## Run locally

```bash
npm install
npm run dev
```

Open the local address shown by Vite.

## Privacy

The site has no login, analytics or backend. Revision progress is stored only in the current browser using `localStorage`. If you deploy it, protect the deployment using the host's access controls.

## Edit or add notes

All revision content lives in `src/courseData.js`. Add concepts to the relevant module using the existing object shape. The navigation, search, progress count and cards update automatically.

## Production build

```bash
npm run build
```

The static output is created in `dist/`.

## Publish with GitHub Pages

The project includes a GitHub Actions workflow that builds and publishes the
website whenever a change is pushed to the `main` branch. The Vite configuration
uses relative asset paths, so you do not need to hard-code the repository name.

1. Create a new GitHub repository, for example `react-revision`.
2. Upload or push the contents of this folder to the root of the repository.
3. Open the repository's **Settings → Pages**.
4. Under **Build and deployment**, choose **GitHub Actions** as the source.
5. Open the **Actions** tab and wait for the deployment to finish.
6. Return to **Settings → Pages** and select **Visit site**.

Future pushes to `main` will rebuild and update the website automatically. You
can also start a deployment manually from the Actions tab.

> **Visibility warning:** GitHub Pages websites are normally public, even when
> the source repository is private. Do not add API keys, passwords, student
> information or other sensitive material to this project.
