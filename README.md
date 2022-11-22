# image-processing-api

## Overview

- This is a simple project that creates an API that resizes images using Sharp and runs all tests using Jasmine

## Features

- Resize any JPG image in the images folder by entering the desired width and height

- Automatically respond with an image if its width and height have already been created before instead of processing.

## For local downloads

1. Download and install Node JS
2. Using the terminal or CMD, install the dependencies using `npm install`

## Steps

1. run tests using `npm run test`.

2. run `npm run start` which builds the project then runs it

3. Choosing your browser, open the localhost through [http://localhost:3000/api](http://localhost:3000/api)

4. Pick one of the images from `images` folder and add the desired width and height

## Example

[http://localhost:3000/api?filename=santamonica&width=450&height=200](http://localhost:3000/api?filename=santamonica&width=450&height=200) will resize the santamonica image to a width of 450px and a height of 200px.

## Notes

for any modifications needed, run `npm run format` and `npm run lint` for fixing any potential errors/better code and formatting.
