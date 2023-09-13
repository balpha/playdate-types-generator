This is the generator I use to create https://github.com/balpha/playdate-types.

As such, it's not meant as a general-use tool -- it's just a one-off application
made to work on my machine (which is a linux box).

`yarn copy` copies the compiled code into the clipboard, which I then paste into
the browser console on https://sdk.play.date/.

That, in turn, copies the generated Lua annotations into the clipboard, which I
then paste into `__types.lua`.
