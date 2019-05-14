jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore resources/cert/pgfeventos.keystore platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk alias_name

~/Library/Android/sdk/build-tools/26.0.2/zipalign -v 4 platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk platforms/android/app/build/outputs/apk/release/PGFEventos.apk