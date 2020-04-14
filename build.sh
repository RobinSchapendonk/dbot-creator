if [[ "$TRAVIS_OS_NAME" = "windows" ]];
then
    npm run build-win
elif [[ "$TRAVIS_OS_NAME" = "osx" ]];
then
    npm run build-mac
else [[ "$TRAVIS_OS_NAME" = "linux" ]];
    npm run build-linux
fi