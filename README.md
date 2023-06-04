## start project

Run following commands to start project:

1. npm install
2. npm start

## features:

1. User will not be able to access post login pages without login.

2. I have added fake authentication page here with just login button on it.

3. `isLoggedIn` key will be stored in localstorage on login click.

4. Menu will be visible only for post login pages

5. If menu are expanded, and user closes drawer then expanded menus will collapse

6. User will be redirected to login page after logout.

7. All pages are lazy loaded

## breadcrumb

1. Breadcrumnb is added in layout page. So it will be available on all post login pages.

2. Last item in breadcrumb will be disabled as it is current page.

3. You will be able to navigate to other pages by clicking on active links of breadcrumb

## localization

1. `i18next` library is used for localization

2. you can find setup in i18next.js file

3. localization is initialized in `src/components/application.tsx` file

4. 2 translation files `en.json` and `ja.json` are in `src/locales` folder

5. To see language translation, use dropdown at top right corner of page

## changes in menu list

1. `preLoginPage` key is added in json. left side menu and header will not be available for routes which has this key.

2. `icon` key was string. Now its a function which returns icon

3. starting / is removed from `path` key as nested routes does not allow / at begining in react-router

## References

1. `Mini variant drawer` from https://mui.com/material-ui/react-drawer/ is used with some modifications.

2. Refer https://react.i18next.com/legacy-v9/step-by-step-guide for translation
