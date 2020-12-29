# emoney-transfer-app

App repo for the emoney-transfer-poc

## Config

In order for the app to run, you need to have a `.env` at the project's root with the envs variables needed:

```bash
FIREBASE_API_KEY=<your-api-key>
FIREBASE_AUTH_DOMAIN=<your-project-id>.firebaseapp.com
FIREBASE_DATABASE_URL=https://<your-project-id>.firebaseio.com
FIREBASE_PROJECT_ID=<your-project-id>
```

You also need `expo` installed globally:

`npm i --g expo-cli`

## Deployment

- **Starting**

  - `expo start`

- **Building**

  - `expo build`

## More Info

- [Expo docs](https://docs.expo.io/get-started/installation/)
