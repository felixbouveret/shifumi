<h1 align="center">Shifumi App</h1>
<p align="center"> 
<img src="public/favicon.png" alt="Git View Logo" height="32" />
<br>
A simple shifumi app. Try beat the computer random's choice.
<br>
Using ReactJs, ViteJs and Typescript
<br>
<img src="https://cdn.worldvectorlogo.com/logos/react-2.svg" width="32" height="32" /> <img src="https://cdn.worldvectorlogo.com/logos/typescript.svg" height="32" width="32" />
</p>

## 📖 Table of content

1. [Getting Started](#⚒️-getting-started)
2. [Git guidelines](#💀-git-guidelines)
3. [Release guidelines](#🚀-release-guidelines)
4. [Architecture](./documentation/project-structure.md)

## ⚒️ Getting Started

### Installation

`yarn`

### Start development server

`yarn dev`

### Build for production

`yarn build`

### Build preview

`yarn preview`

## 💀 Git guidelines

> ⚠️ One branch for each **feature, fix, or other**

### 🎁 Branches and commits

#### 🚂 Naming branches prefix

fix- / feat- / etc.

Example : `fix-branch-name` `feat-feature-name`

---

#### 🚃 Naming for commits inside a branch

Any understandable name describing the commit

Example : `Add color` `Fix component margins`

---

### 🛫 Pull requests

#### 📝 Naming

Using Angular commit message convention [see here](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit-message-header)

`<type>(<scope>): <short summary>`

Pull requests formatted according to the Angular convention will automatically create a release note listing features, fixes or updates.

---

#### 🚚 Method

**Squash commits** and **delete merged branch**

Allow to keep a clean git history and avoid merge conflicts.

---

#### 🧑‍✈️ Pipelines (ToDo)

Unit tests / e2e tests

---

### 🔬 Development branch

It contains only PR commits formatted with the **Angular commit convention**. This means you can quickly revert features, fixes or other modifications.

## 🚀 Release guidelines

> ⚠️ Every new pull request pushed on the `main` branch will trigger a new release.

1. Create a pull request with the new version number in the title. From `dev` to `main`.
2. When all tests are passed, **without commit squash**, merge the pull request on `main`
3. Semantic release will automatically create a new release and update the `package.json` version number. The release note will be generated automatically and added to the release.
4. Update `dev` branch with the new `main` branch.
