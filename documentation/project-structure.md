# Project structure

Here you will find informations about the main principles followed in this architecture.

## Introduction

I chose to use a module driven architecture to regroup specific components used only in specific parts of the app in the same area. All the project is built around this mindset to better separate everything.

Like this I can have a clearer view of what is in the global scope of the project or what is used only in a specific scope. It also allows to have smaller `components/` and `hooks/` folders that are only meant for globally used components and hooks.

## Project architecture

```
.github/ <-- TODO
.husky/ <-- TODO
documentation/
public/
src/
├─ assets/
├─ components/
├─ fonts/
├─ hooks/
├─ layouts/
├─ modules/
├─ pages/
├─ types/
├─ App.scss
├─ App.tsx
├─ index.scss
├─ main.tsx
├─ Router.tsx

```

## Table of Contents

1. [Assets](#the-assets-directory)
2. [Components](#the-root-components-directory)
3. [Hooks](#the-hooks-directory)
4. [Modules](#the-modules-directory)

## The `assets/` directory

As other projects, this folder is meant to receive images, icons, or any assets the app could need. Just like `components/` or `hooks/` directories, it's only for globally scoped assets that are used in multiple part of the app.

Any other asset that is only used in a specific scope must be placed on its module's `assets/` folder. (cf: [modules section](#the-module-directory))

Every type of asset needs to be placed in its dedicated folder type.

### Example:

```
assets/
├─ icons/
│  ├─ my-icon.svg
├─ images/
│  ├─ my-image.png
...
```

## The root `components/` directory

This is where you'll find every components that are global to the app. It's mainly meant to contain the components like Buttons, Inputs or everything that can be used in multiple part of the application.

As soon as a component is imported in at-least two parts of the project (or will be) it must be placed in the root `components/` folder.

If a component is only scoped to one module, place it into its module's `component/` directory. (cf: [modules section](#the-module-directory))

## The `hooks/` directory

Hooks are pieces of typescript code that can be used in react components. They allow you to externalize and segment logic for a more readable codebase.

Just like root `components/` or `assets/` this root `hooks/` folder is here to contain global hooks that are used multiple times in the project.

Following ReactJs standards a hook must be named with the `use` keyword, ex: `useMyHook.ts` and export a `useMyHook` method.

If a specific module needs a specific and scoped hook, place it inside its own `hook/` directory. (cf: [modules section](#the-module-directory))

## The `modules/` directory

This folder contains the main parts of the app. Every module can be defined as a feature with its own components, hooks or assets. A module can use in another module as long as it helps the project readability.

### Structure example:

```
HomeModule/
├─ assets/
├─ components/
├─ hooks/
├─ HomeModule.tsx
├─ index.ts
```
