## Calculator

This calculator is based on Microsoft's calc.exe. Brackets are not
implemented. Single argument functions apply directly to the current input
value, however, the API for single argument functions is currently broken,
since the there is no "Access-Control-Allow-Origin" header present on the
requested resource.

You must run the calculator from a web server for it to work. This is due to
HTML imports.

I used https://github.com/droptable/javascript-shunting-yard and modified it
a bit to use a web service to calculate the result. It's super slow to use,
but it's meant to be a demonstration of my ability to use web services.

One known bug exists with this calculator, and that is when values are
calculated in e notation, the shunting yard algorithm gets confused.


The MIT License (MIT)

Copyright (c) 2015 Ben Hutchins

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
