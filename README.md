# TOMAS-React
[![GitPod - Code Now](https://img.shields.io/badge/Gitpod-code%20now-blue.svg?longCache=true)](https://gitpod.io#https://github.com/zqh0421/TOMAS-React)

The React version of TOMAS Client.

## Updates
### TODOs for Jul 12
- [ ] able to delete atom chat item in chat history.
- [x] When new chat item is added to chat history and chat list is not scrolled to bottom, pop up new message notification.
- [ ] Use swr to save the chat history state.
- [ ] Make it available for different screen size.
- [ ] Add hover btn for user to directly scroll to the newest message
- [ ] Add whisper-1 stt
- [ ] Text Size & Style config
- [ ] Use Langchain to format style simplified HTML
- [ ] Display styled simplified HTML
  - [ ] JSDom -> remove i attribute
  - [ ] Ask purpose
  - [ ] make HTML prettier based on its purpose
  - [ ] remove redundant \n, \t, ..., then save as string.


## Current Tech Stack
- React
- TailwindCSS
- DaisyUI
- ESlint
- TypeScript
- Vite
- pnpm

## Getting Started
### Dev environment: Local machine
On your local machine you can prepare your dev environment as follows. From CLI in root of the project run:
### Install pnpm (optional)
Run this command if you don't have pnpm in your coding environment.
```bash
npm install -g pnpm
```

### Initialize the project
```bash
pnpm install
pnpm run dev
```

### Dev environment: GitPod (Optional)
Use a fresh dev environment in [Gitpod](https://www.gitpod.io) by pressing the **code now** badge above.
> Note: The behavior when you start the project in GitPod is configured in `.gitpod.yml` file.

### How to sumbit your changes
```bash
git add .
git push
git commit -m "messages"
```
~~After you syncronize the changes, the GitHub workflows will be automatially executed. Check their status in `Actions`.~~