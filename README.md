# mandelbrot-set-explorer
Mandelbrot set visualisation.

# Usage
Start application with the command:

`npm run start`

# Mandelbrot set background
For each number in complex plane `c` calculate output of the following recursive function:

`z(t+1) = z(t)^2 + c; where z(t0) = 0` 

and observe, whether output converges or diverges. For each number remember number of iterations needed to diverge.

Assign colors to certain number of iterations, and draw resulting picture.   
