# standalone-audio-recorder
Web application made using Node.js as the server and Vue.js as the client. The project is a very basic and minimal implementation of what is needed to record and store audios. The project is not responsive and the layout breaks with vertical / smaller screens.

The server uses a CSV file with `id` and `text` as the columns, with `id` being the file name with which the audio file will be stored in `/src/data` directory and `text` being the display text for speaker to read and record. The CSV file must be present in `/src/assets` under the name `audio_record.csv`.

![Standalone Audio Recorder](standalone-audio-recorder-layout.png?raw=True "Standalone Audio Recorder Layout")

## Project setup
```
yarn install
```

### Starts the server
```
node server.js
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

## Packages
The application depends on the following packages.
1. axios ^0.19.2
2. body-parser ^1.19.0
3. cors ^2.8.5
4. csvtojson ^2.0.10
5. express ^4.17.1
6. process ^0.11.10
7. vue ^2.6.11
8. [vue-audio-recorder ^3.0.1](https://github.com/grishkovelli/vue-audio-recorder)
