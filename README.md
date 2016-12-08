# Cordova2Unity

Cordova plugin that handles integrating a Unity project into a Cordova app. This should handle all
the work for doing the integration process once you've exported your Unity project into the correct
location.

This is based off [shawticus/cordova2unity][shawticus/cordova2unity], but has been expanded drastically to
automate the integration process as much as possible.

## Building Android

From the Unity editor, build your android app as a "Google Android Project" and have it output to
`plugins/cordova2unity/unity/android`. Rename the main directory to "Unity" so that you have a
directory at `plugins/cordova2unity/unity/android/Unity`. Then run `cordova build android` for
your Cordova project. That's it! \~\~*magic*\~\~

## Building iOS

> Coming (not so) soon!

## Launching Unity from Cordova

> Coming soon!

## Returning to Cordova from Unity

> Coming (not so) soon!

[shawticus/cordova2unity]: https://github.com/shawticus/cordova2unity
